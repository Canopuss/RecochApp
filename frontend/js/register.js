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

                console.log('Usuario registrado:', data);
                
                // Guardamos en LocalStorage
                localStorage.setItem('user_email', email);
                localStorage.setItem('user_name', fullname);
                localStorage.setItem('user_id', userId);

                const selectedPos = Array.from(document.querySelectorAll('.pos-checkbox:checked')).map(cb => cb.value);
                const zona = document.getElementById('zona').value;
                const pierna = document.getElementById('pierna').value;

                // 2. Crear Perfil MongoDB
                await fetch('http://localhost:3001/api/jugadores/perfil', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        usuarioId: userId,
                        nombreCompleto: fullname,
                        email: email,
                        posiciones: selectedPos,
                        ubicacion: zona,
                        piernaHabil: pierna,
                        edad: parseInt(age),
                        sexo: gender
                    })
                });

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

    // Cargar opciones
    const loadOpciones = async () => {
        try {
            const res = await fetch('http://localhost:3001/api/jugadores/opciones');
            const data = await res.json();
            
            const zonaSelect = document.getElementById('zona');
            data.ubicaciones.forEach(ub => {
                const opt = document.createElement('option');
                opt.value = ub;
                opt.textContent = ub;
                zonaSelect.appendChild(opt);
            });

            const posContainer = document.getElementById('posiciones-container');
            
            // Opción Sin Preferencia
            const sinPrefWrapper = document.createElement('div');
            sinPrefWrapper.innerHTML = `
                <input type="checkbox" id="pos_Cualquiera" value="Cualquiera" class="chip-checkbox pos-checkbox">
                <label for="pos_Cualquiera" class="chip-label">No tengo preferencia</label>
            `;
            posContainer.appendChild(sinPrefWrapper);

            data.posiciones.forEach(pos => {
                const wrapper = document.createElement('div');
                wrapper.innerHTML = `
                    <input type="checkbox" id="pos_${pos}" value="${pos}" class="chip-checkbox pos-checkbox">
                    <label for="pos_${pos}" class="chip-label">${pos}</label>
                `;
                posContainer.appendChild(wrapper);
            });

            // Limitar a 3
            document.querySelectorAll('.pos-checkbox').forEach(cb => {
                cb.addEventListener('change', () => {
                    const count = document.querySelectorAll('.pos-checkbox:checked').length;
                    if (count > 3) {
                        cb.checked = false;
                        alert('Máximo 3 posiciones.');
                    }
                });
            });

        } catch (e) {
            console.error(e);
        }
    };
    loadOpciones();
});
