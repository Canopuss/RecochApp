document.addEventListener('DOMContentLoaded', () => {
    const statsForm = document.getElementById('stats-form');
    const saveMsg = document.getElementById('save-msg');

    if (!statsForm) return;

    const savedStats = JSON.parse(localStorage.getItem('player_stats') || '{}');
    if (savedStats) {
        Object.keys(savedStats).forEach(key => {
            const input = document.getElementById(key);
            if (input) input.value = savedStats[key];
        });
    }

    statsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const stats = {
            pac: parseInt(document.getElementById('pac').value),
            sho: parseInt(document.getElementById('sho').value),
            pas: parseInt(document.getElementById('pas').value),
            dri: parseInt(document.getElementById('dri').value),
            def: parseInt(document.getElementById('def').value),
            phy: parseInt(document.getElementById('phy').value)
        };

        const rating = Math.round(Object.values(stats).reduce((a, b) => a + b) / 6);
        stats.rating = rating;

        localStorage.setItem('player_stats', JSON.stringify(stats));
        if (saveMsg) saveMsg.textContent = '¡Estadísticas actualizadas correctamente!';
        
        setTimeout(() => {
            if (saveMsg) saveMsg.textContent = '';
        }, 3000);
    });
});
