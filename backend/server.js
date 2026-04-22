const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Logger middleware to help debugging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Root Route
app.get('/', (req, res) => {
    res.send('<h1>RecochApp API is running!</h1><p>Use /api/users or /api/clubs to interact with the data.</p>');
});

// --- User Routes (CRUD) ---

// Create User (Register)
app.post('/api/users', (req, res) => {
    const { email, password, nombre_completo } = req.body;
    const sql = 'INSERT INTO Usuario (email, password, nombre_completo) VALUES (?, ?, ?)';
    db.run(sql, [email, password, nombre_completo], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, message: 'User registered successfully' });
    });
});

// Login User
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM Usuario WHERE email = ? AND password = ?';
    db.get(sql, [email, password], (err, row) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (!row) {
            return res.status(401).json({ error: 'Email o contraseña incorrectos' });
        }
        res.json({ 
            message: 'Login successful', 
            user: { id: row.id_usuario, email: row.email, nombre: row.nombre_completo } 
        });
    });
});

// Read All Users
app.get('/api/users', (req, res) => {
    const sql = 'SELECT id_usuario, email, nombre_completo FROM Usuario';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ data: rows });
    });
});

// Read Single User
app.get('/api/users/:id', (req, res) => {
    const sql = 'SELECT id_usuario, email, nombre_completo FROM Usuario WHERE id_usuario = ?';
    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ data: row });
    });
});

// Update User
app.put('/api/users/:id', (req, res) => {
    const { nombre_completo, foto_perfil } = req.body;
    const sql = 'UPDATE Usuario SET nombre_completo = ?, foto_perfil = ? WHERE id_usuario = ?';
    db.run(sql, [nombre_completo, foto_perfil, req.params.id], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: 'User updated successfully', updated: this.changes });
    });
});

// Delete User
app.delete('/api/users/:id', (req, res) => {
    const sql = 'DELETE FROM Usuario WHERE id_usuario = ?';
    db.run(sql, req.params.id, function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: 'User deleted successfully', deleted: this.changes });
    });
});

// --- Player Routes (Jugador) ---

// Create Player (Link to User)
app.post('/api/players', (req, res) => {
    const { id_jugador, estatura, peso, pierna_habil } = req.body;
    const sql = 'INSERT INTO Jugador (id_jugador, estatura, peso, pierna_habil) VALUES (?, ?, ?, ?)';
    db.run(sql, [id_jugador, estatura, peso, pierna_habil], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ message: 'Player profile created' });
    });
});

// --- Club Routes (CRUD) ---

// Create Club
app.post('/api/clubs', (req, res) => {
    const { nombre_club, id_capitan } = req.body;
    // Note: We need a check if capitan exists in Jugador table or just Usuario for now.
    // For simplicity of testing CRUD, we insert directly.
    const sql = 'INSERT INTO Club (nombre_club, id_capitan) VALUES (?, ?)';
    db.run(sql, [nombre_club, id_capitan], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, message: 'Club created successfully' });
    });
});

// Read All Clubs
app.get('/api/clubs', (req, res) => {
    const sql = 'SELECT * FROM Club';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ data: rows });
    });
});

// Update Club
app.put('/api/clubs/:id', (req, res) => {
    const { nombre_club } = req.body;
    const sql = 'UPDATE Club SET nombre_club = ? WHERE id_club = ?';
    db.run(sql, [nombre_club, req.params.id], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: 'Club updated successfully', updated: this.changes });
    });
});

// Delete Club
app.delete('/api/clubs/:id', (req, res) => {
    const sql = 'DELETE FROM Club WHERE id_club = ?';
    db.run(sql, req.params.id, function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: 'Club deleted successfully', deleted: this.changes });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
