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

        setTimeout(() => {
            if (email && password.length >= 4) {
                console.log('Login exitoso (simulado)');
                localStorage.setItem('user_email', email);
                window.location.href = 'dashboard.html';
            } else {
                errorMsg.textContent = 'Credenciales no válidas. Intenta de nuevo.';
                btn.textContent = originalText;
                btn.disabled = false;
            }
        }, 1500);
    });
});
