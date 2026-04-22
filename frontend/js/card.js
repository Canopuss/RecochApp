document.addEventListener('DOMContentLoaded', () => {
    const cardName = document.getElementById('card-name');
    const playerPreview = document.getElementById('player-preview');
    const photoUpload = document.getElementById('photo-upload');
    
    if (!cardName) return;

    const elRating = document.getElementById('card-rating');
    const elPac = document.getElementById('stat-pac');
    const elSho = document.getElementById('stat-sho');
    const elPas = document.getElementById('stat-pas');
    const elDri = document.getElementById('stat-dri');
    const elDef = document.getElementById('stat-def');
    const elPhy = document.getElementById('stat-phy');

    const userName = localStorage.getItem('user_name') || 'TU NOMBRE';
    const savedStats = JSON.parse(localStorage.getItem('player_stats') || '{}');

    cardName.textContent = userName;

    if (savedStats.rating && elRating) {
        elRating.textContent = savedStats.rating;
        if (elPac) elPac.textContent = savedStats.pac || 75;
        if (elSho) elSho.textContent = savedStats.sho || 75;
        if (elPas) elPas.textContent = savedStats.pas || 75;
        if (elDri) elDri.textContent = savedStats.dri || 75;
        if (elDef) elDef.textContent = savedStats.def || 75;
        if (elPhy) elPhy.textContent = savedStats.phy || 75;
    }

    const savedPhoto = localStorage.getItem('player_photo');
    if (savedPhoto && playerPreview) {
        playerPreview.src = savedPhoto;
    }

    if (photoUpload) {
        photoUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const base64Photo = event.target.result;
                    if (playerPreview) playerPreview.src = base64Photo;
                    localStorage.setItem('player_photo', base64Photo);
                };
                reader.readAsDataURL(file);
            }
        });
    }
});
