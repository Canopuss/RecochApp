document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const errorMsg = document.getElementById('error-msg');

    if (!registerForm) return;

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const fullname = document.getElementById('fullname').value;
        const age = document.getElementById('age').value;
        const gender = document.getElementById('gender').value;
        const email = document.getElementById('email').value;
        const confirmEmail = document.getElementById('confirm-email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        errorMsg.textContent = '';

        if (email !== confirmEmail) {
            errorMsg.textContent = 'Los correos electrónicos no coinciden.';
            return;
        }

        if (password !== confirmPassword) {
            errorMsg.textContent = 'Las contraseñas no coinciden.';
            return;
        }

        const btn = registerForm.querySelector('.login-btn');
        const originalText = btn.textContent;
        btn.textContent = 'Creando Perfil...';
        btn.disabled = true;

        // Backend Integration
        async function registerUser() {
            try {
                // 1. Create User
                const response = await fetch('http://localhost:3001/api/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        nombre_completo: fullname
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Error al registrar el usuario');
                }

                const userId = data.id_usuario ?? data.id;

                // El backend actual no expone /api/players todavia.
                // Evitamos bloquear el registro por ese endpoint pendiente.
                if (!userId) {
                    throw new Error('No se pudo obtener el ID del usuario creado');
                }

                console.log('Usuario registrado:', data);
                
                // Guardamos en LocalStorage
                localStorage.setItem('user_email', email);
                localStorage.setItem('user_name', fullname);
                localStorage.setItem('user_id', userId);

                const apodoEl = document.getElementById('apodo');
                const apodo = apodoEl ? apodoEl.value : '';
                localStorage.setItem('user_apodo', apodo);

                // 2. Crear Perfil MongoDB
                const perfilRes = await fetch('http://localhost:3001/api/jugadores/perfil', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        usuarioId: userId,
                        nombreCompleto: fullname,
                        email: email,
                        apodo: apodo,
                        edad: parseInt(age),
                        sexo: gender
                    })
                });

                if (!perfilRes.ok) {
                    const perfilData = await perfilRes.json();
                    // Rollback user creation
                    await fetch(`http://localhost:3001/api/users/${userId}`, { method: 'DELETE' });
                    throw new Error(perfilData.error || 'Este apodo ya fue tomado');
                }

                window.location.href = 'dashboard.html';

            } catch (err) {
                console.error('Error:', err);
                errorMsg.textContent = err.message;
                btn.textContent = originalText;
                btn.disabled = false;
            }
        }

        registerUser();
    });

});
