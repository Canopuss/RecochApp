document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMsg = document.getElementById('error-msg');

    if (!loginForm) return;

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        errorMsg.textContent = '';
        console.log('Intentando iniciar sesión con:', email);

        const btn = loginForm.querySelector('.login-btn');
        const originalText = btn.textContent;
        btn.textContent = 'Verificando...';
        btn.disabled = true;

        async function loginUser() {
            try {
                const response = await fetch('http://localhost:3001/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error('Respuesta invalida del backend. Verifica que Spring Boot este ejecutandose en http://localhost:3001');
                }

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Error al iniciar sesión');
                }

                console.log('Login exitoso:', data);
                localStorage.setItem('user_email', data.user.email);
                localStorage.setItem('user_name', data.user.nombre_completo || data.user.nombre || '');
                localStorage.setItem('user_id', String(data.user.id_usuario ?? data.user.id ?? ''));
                
                window.location.href = 'dashboard.html';

            } catch (err) {
                console.error('Error:', err);
                errorMsg.textContent = err.message;
                btn.textContent = originalText;
                btn.disabled = false;
            }
        }

        loginUser();
    });
});
