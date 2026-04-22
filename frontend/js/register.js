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

        setTimeout(() => {
            const userData = { fullname, age, gender, email };
            console.log('Usuario registrado:', userData);
            localStorage.setItem('user_email', email);
            localStorage.setItem('user_name', fullname);
            window.location.href = 'dashboard.html';
        }, 1500);
    });
});
