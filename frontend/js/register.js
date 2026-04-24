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
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        errorMsg.textContent = '';

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

                console.log('Usuario registrado y perfil creado:', data);
                
                // Guardamos en LocalStorage solo para la sesión actual del frontend
                localStorage.setItem('user_email', email);
                localStorage.setItem('user_name', fullname);
                localStorage.setItem('user_id', userId);

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
