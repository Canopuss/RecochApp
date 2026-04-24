const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'recochapp.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        initializeDatabase();
    }
});

function initializeDatabase() {
    db.serialize(() => {
        // Enable foreign key support
        db.run('PRAGMA foreign_keys = ON');

        // 1. Tabla de Usuarios
        db.run(`CREATE TABLE IF NOT EXISTS Usuario (
            id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            nombre_completo TEXT,
            foto_perfil TEXT
        )`);

        // 2. Tabla de Jugadores
        db.run(`CREATE TABLE IF NOT EXISTS Jugador (
            id_jugador INTEGER PRIMARY KEY,
            estatura REAL,
            peso REAL,
            pierna_habil TEXT CHECK(pierna_habil IN ('Derecha', 'Izquierda', 'Ambidiestro')),
            valor_mercado REAL DEFAULT 0.00,
            id_fifa_referencia INTEGER,
            FOREIGN KEY (id_jugador) REFERENCES Usuario(id_usuario) ON DELETE CASCADE
        )`);

        // 3. Tabla de Clubes
        db.run(`CREATE TABLE IF NOT EXISTS Club (
            id_club INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre_club TEXT NOT NULL,
            codigo_invitacion TEXT UNIQUE,
            id_capitan INTEGER,
            FOREIGN KEY (id_capitan) REFERENCES Jugador(id_jugador)
        )`);

        // 4. Tabla de Partidos
        db.run(`CREATE TABLE IF NOT EXISTS Partido (
            id_partido INTEGER PRIMARY KEY AUTOINCREMENT,
            id_club INTEGER,
            fecha TEXT,
            lugar TEXT,
            estado TEXT DEFAULT 'Abierto' CHECK(estado IN ('Abierto', 'Cerrado')),
            id_mvp INTEGER,
            FOREIGN KEY (id_club) REFERENCES Club(id_club),
            FOREIGN KEY (id_mvp) REFERENCES Jugador(id_jugador)
        )`);

        // 5. Tabla de Estadísticas
        db.run(`CREATE TABLE IF NOT EXISTS Estadistica (
            id_stat INTEGER PRIMARY KEY AUTOINCREMENT,
            id_jugador INTEGER,
            id_partido INTEGER,
            goles INTEGER DEFAULT 0,
            asistencias INTEGER DEFAULT 0,
            faltas INTEGER DEFAULT 0,
            pases_clave INTEGER DEFAULT 0,
            recuperaciones INTEGER DEFAULT 0,
            paradas INTEGER DEFAULT 0,
            FOREIGN KEY (id_jugador) REFERENCES Jugador(id_jugador),
            FOREIGN KEY (id_partido) REFERENCES Partido(id_partido)
        )`);

        // 6. Tabla de Membresía
        db.run(`CREATE TABLE IF NOT EXISTS Membresia (
            id_jugador INTEGER,
            id_club INTEGER,
            rol_en_club TEXT DEFAULT 'Jugador' CHECK(rol_en_club IN ('Capitán', 'Jugador')),
            PRIMARY KEY (id_jugador, id_club),
            FOREIGN KEY (id_jugador) REFERENCES Jugador(id_jugador),
            FOREIGN KEY (id_club) REFERENCES Club(id_club)
        )`);

        console.log('Database tables initialized successfully.');
    });
}

module.exports = db;
