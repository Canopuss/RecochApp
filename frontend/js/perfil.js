document.addEventListener('DOMContentLoaded', async () => {
    const userId = localStorage.getItem('user_id');
    const userEmail = localStorage.getItem('user_email');
    const userName = localStorage.getItem('user_name');

    if (!userId) {
        window.location.href = 'index.html';
        return;
    }

    const form = document.getElementById('perfil-form');
    const loading = document.getElementById('loading-perfil');
    const posicionesContainer = document.getElementById('posiciones-container');
    const clubSelect = document.getElementById('perfil-club');

    const urlParams = new URLSearchParams(window.location.search);
    const targetApodo = urlParams.get('apodo');
    const isExternalView = targetApodo && targetApodo !== localStorage.getItem('user_apodo');

    if (isExternalView) {
        document.querySelector('.danger-zone').style.display = 'none';
        form.querySelector('button[type="submit"]').style.display = 'none';
        clubSelect.disabled = true;
        document.getElementById('perfil-pierna').disabled = true;
        document.getElementById('perfil-edad').disabled = true;
    }

    // Cargar opciones primero
    try {
        const opcionesRes = await fetch('http://localhost:3001/api/jugadores/opciones');
        const opcionesData = await opcionesRes.json();

        opcionesData.posiciones.forEach(pos => {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = `
                <input type="checkbox" id="pos_${pos}" value="${pos}" class="chip-checkbox pos-checkbox">
                <label for="pos_${pos}" class="chip-label">${pos}</label>
            `;
            posicionesContainer.appendChild(wrapper);
        });

        // Limitar checkboxes a 3
        const posCheckboxes = document.querySelectorAll('.pos-checkbox');
        posCheckboxes.forEach(cb => {
            cb.addEventListener('change', () => {
                const checkedCount = document.querySelectorAll('.pos-checkbox:checked').length;
                if (checkedCount > 3) {
                    cb.checked = false;
                    alert('Puedes seleccionar máximo 3 posiciones.');
                }
            });
            if (isExternalView) {
                cb.disabled = true;
            }
        });
    } catch (e) {
        console.error("Error cargando opciones", e);
    }

    // Cargar clubes en los que está el usuario
    const userToFetch = isExternalView ? targetApodo : localStorage.getItem('user_apodo');
    try {
        const clubesRes = await fetch(`http://localhost:3001/api/clubes/usuario/${userToFetch}`);
        if (clubesRes.ok) {
            const clubesData = await clubesRes.json();
            clubesData.forEach(club => {
                const opt = document.createElement('option');
                opt.value = club.name;
                opt.textContent = club.name;
                clubSelect.appendChild(opt);
            });
        }
    } catch (e) {
        console.error("Error cargando clubes", e);
    }

    // Cargar perfil del usuario
    let perfilExiste = false;
    let perfilActual = null;
    try {
        const urlFetch = isExternalView 
            ? `http://localhost:3001/api/jugadores/apodo/${targetApodo}`
            : `http://localhost:3001/api/jugadores/perfil/${userId}`;

        const perfilRes = await fetch(urlFetch);
        if (perfilRes.ok) {
            perfilExiste = true;
            perfilActual = await perfilRes.json();
            
            document.getElementById('display-name').textContent = perfilActual.nombreCompleto || userName;
            document.getElementById('display-email').textContent = isExternalView ? `@${perfilActual.apodo}` : (perfilActual.email || userEmail);
            
            clubSelect.value = perfilActual.clubNombre || '';
            document.getElementById('perfil-pierna').value = perfilActual.piernaHabil || 'Derecha';
            document.getElementById('perfil-edad').value = perfilActual.edad || '';
            
            if (perfilActual.fotoPerfil) {
                document.getElementById('preview-foto').src = perfilActual.fotoPerfil;
            }

            if (perfilActual.posiciones) {
                perfilActual.posiciones.forEach(pos => {
                    const cb = document.getElementById(`pos_${pos}`);
                    if (cb) cb.checked = true;
                });
            }
        } else {
            if (isExternalView) {
                alert('Perfil no encontrado');
                window.location.href = 'dashboard.html';
                return;
            }
            document.getElementById('display-name').textContent = userName;
            document.getElementById('display-email').textContent = userEmail;
        }
    } catch (e) {
        console.error("Error cargando perfil", e);
    }

    loading.style.display = 'none';
    form.style.display = 'block';

    // Guardar cambios
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const selectedPos = Array.from(document.querySelectorAll('.pos-checkbox:checked')).map(cb => cb.value);
        
        const payload = {
            usuarioId: userId,
            nombreCompleto: document.getElementById('display-name').textContent,
            email: isExternalView ? document.getElementById('display-email').textContent : userEmail,
            apodo: localStorage.getItem('user_apodo'),
            posiciones: selectedPos,
            clubNombre: clubSelect.value,
            piernaHabil: document.getElementById('perfil-pierna').value,
            edad: parseInt(document.getElementById('perfil-edad').value)
        };

        const method = perfilExiste ? 'PUT' : 'POST';
        const url = perfilExiste 
            ? `http://localhost:3001/api/jugadores/perfil/${userId}`
            : `http://localhost:3001/api/jugadores/perfil`;

        try {
            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                alert('¡Perfil actualizado con éxito!');
                perfilExiste = true;
            } else {
                const err = await res.json();
                alert('Error al guardar: ' + (err.error || 'Desconocido'));
            }
        } catch (error) {
            console.error('Error al guardar', error);
        }
    });

    // Flujo de eliminación de cuenta
    const btnEliminar = document.getElementById('btn-eliminar-cuenta');
    const modal1 = document.getElementById('modal-1');
    const modal2 = document.getElementById('modal-2');
    const btnModal1Confirm = document.getElementById('btn-modal-1-confirm');
    const btnModal2Confirm = document.getElementById('btn-modal-2-confirm');
    const deleteConfirmInput = document.getElementById('delete-confirm-input');

    btnEliminar.addEventListener('click', () => {
        modal1.style.display = 'flex';
    });

    btnModal1Confirm.addEventListener('click', () => {
        modal1.style.display = 'none';
        modal2.style.display = 'flex';
    });

    deleteConfirmInput.addEventListener('input', (e) => {
        if (e.target.value === 'ELIMINAR') {
            btnModal2Confirm.disabled = false;
        } else {
            btnModal2Confirm.disabled = true;
        }
    });

    btnModal2Confirm.addEventListener('click', async () => {
        btnModal2Confirm.textContent = 'Eliminando...';
        btnModal2Confirm.disabled = true;

        try {
            const res = await fetch(`http://localhost:3001/api/jugadores/${userId}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                localStorage.clear();
                window.location.href = 'index.html';
            } else {
                alert('Error al eliminar la cuenta');
                btnModal2Confirm.textContent = 'Eliminar Cuenta';
                btnModal2Confirm.disabled = false;
            }
        } catch (error) {
            console.error('Error', error);
            btnModal2Confirm.textContent = 'Eliminar Cuenta';
            btnModal2Confirm.disabled = false;
        }
    });
});
