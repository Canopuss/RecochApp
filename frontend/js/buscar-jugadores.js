document.addEventListener('DOMContentLoaded', async () => {
    const positionSelect = document.getElementById('search-position');
    const zoneSelect = document.getElementById('search-zone');
    const searchForm = document.getElementById('player-search-form');
    const resultsContainer = document.getElementById('results-container');
    const resultsGrid = document.getElementById('results-grid');
    const emptyState = document.getElementById('empty-state');
    const loadingSpinner = document.getElementById('loading-spinner');
    const resultsTitle = document.getElementById('results-title');

    // Cargar opciones dinámicamente
    try {
        const response = await fetch('http://localhost:3001/api/jugadores/opciones');
        const data = await response.json();
        
        data.posiciones.forEach(pos => {
            const option = document.createElement('option');
            option.value = pos;
            option.textContent = pos;
            positionSelect.appendChild(option);
        });

        data.ubicaciones.forEach(ubicacion => {
            const option = document.createElement('option');
            option.value = ubicacion;
            option.textContent = ubicacion;
            zoneSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error cargando opciones:', error);
    }

    // Manejar búsqueda
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById('search-name').value;
        const posicion = document.getElementById('search-position').value;
        const club = document.getElementById('search-club').value;
        const ubicacion = document.getElementById('search-zone').value;

        let queryParams = new URLSearchParams();
        if (nombre) queryParams.append('nombre', nombre);
        if (posicion && posicion !== 'Cualquiera') queryParams.append('posiciones', posicion);
        if (club) queryParams.append('club', club);
        if (ubicacion && ubicacion !== 'Cualquiera') queryParams.append('ubicacion', ubicacion);

        resultsContainer.style.display = 'none';
        emptyState.style.display = 'none';
        loadingSpinner.style.display = 'block';

        try {
            const response = await fetch(`http://localhost:3001/api/jugadores/buscar?${queryParams.toString()}`);
            const data = await response.json();

            loadingSpinner.style.display = 'none';

            if (data.length > 0) {
                resultsTitle.textContent = `Resultados (${data.length} jugadores)`;
                resultsGrid.innerHTML = data.map(jugador => `
                    <div class="player-result-card" style="background: var(--input-bg); padding: 20px; border-radius: 12px; border: 1px solid var(--glass-border); text-align: center; transition: all 0.3s ease;">
                        <img src="${jugador.fotoPerfil || 'assets/default-avatar.png'}" onerror="this.src='https://via.placeholder.com/80x80?text=Crack'" alt="Avatar" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; margin-bottom: 10px; border: 2px solid var(--primary-green);">
                        <h4 style="font-size: 1.1rem; margin-bottom: 5px;">${jugador.nombreCompleto}</h4>
                        
                        <div style="margin-bottom: 10px;">
                            ${(jugador.posiciones || []).map(p => `<span class="badge-posicion" style="background: var(--primary-green); color: #000; padding: 2px 8px; border-radius: 10px; font-size: 0.7rem; font-weight: bold; margin: 0 2px;">${p}</span>`).join('')}
                        </div>
                        
                        <p style="color: var(--text-dim); font-size: 0.85rem; margin-bottom: 5px;"><i class="fas fa-map-marker-alt"></i> ${jugador.ubicacion || 'Sin zona'}</p>
                        <p style="color: var(--text-dim); font-size: 0.85rem; margin-bottom: 15px;"><i class="fas fa-shield-halved"></i> ${jugador.clubNombre || 'Sin club'}</p>
                        
                        <a href="perfil.html?id=${jugador.usuarioId}" class="login-btn" style="display: block; text-decoration: none; padding: 8px; font-size: 0.9rem;">Ver Perfil</a>
                    </div>
                `).join('');
                resultsContainer.style.display = 'block';
            } else {
                emptyState.style.display = 'block';
            }
        } catch (error) {
            console.error('Error buscando jugadores:', error);
            loadingSpinner.style.display = 'none';
            alert('Error al realizar la búsqueda.');
        }
    });
});
