document.addEventListener('DOMContentLoaded', () => {
    const forgotForm = document.getElementById('forgot-form');
    const statusMsg = document.getElementById('status-msg');

    if (!forgotForm) return;

    forgotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('recovery-email').value;
        const btn = forgotForm.querySelector('.login-btn');

        btn.textContent = 'Enviando...';
        btn.disabled = true;

        setTimeout(() => {
            if (statusMsg) {
                statusMsg.style.color = '#39ff14';
                statusMsg.textContent = `Se ha enviado un enlace a ${email}. Revisa tu bandeja de entrada.`;
            }
            btn.textContent = 'Enviado';
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        }, 1500);
    });
});
