document.addEventListener('DOMContentLoaded', () => {
    const showCreateBtn = document.getElementById('show-create-club-btn');
    const showJoinBtn = document.getElementById('show-join-club-btn');
    
    const createFormDiv = document.getElementById('create-club-form');
    const joinFormDiv = document.getElementById('join-club-form');
    
    const cancelCreateBtn = document.getElementById('cancel-create-club');
    const cancelJoinBtn = document.getElementById('cancel-join-club');
    
    const newClubForm = document.getElementById('new-club-form');
    const searchClubForm = document.getElementById('search-club-form');

    const clubsListContainer = document.getElementById('clubs-list-container');
    const clubsList = document.getElementById('clubs-list');
    const emptyState = document.getElementById('empty-state');

    const API_URL = 'http://localhost:3001/api/clubes';

    // Logo upload preview logic
    const logoUpload = document.getElementById('club-logo-upload');
    const logoPreviewContainer = document.getElementById('logo-preview-container');
    const logoPreview = document.getElementById('logo-preview');
    let base64Logo = '';

    if (logoUpload) {
        logoUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    base64Logo = event.target.result;
                    logoPreview.src = base64Logo;
                    logoPreviewContainer.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    const currentUserApodo = localStorage.getItem('user_apodo');
    if (!currentUserApodo) {
        window.location.href = 'login.html';
        return;
    }

    const loadClubs = async () => {
        try {
            const response = await fetch(`${API_URL}/usuario/${currentUserApodo}`);
            const clubs = await response.json();
            
            if (clubs && clubs.length > 0) {
                emptyState.style.display = 'none';
                clubsListContainer.style.display = 'block';
                
                clubsList.innerHTML = clubs.map(club => {
                    const logoHtml = club.logo 
                        ? `<img src="${club.logo}" alt="Escudo" style="width: 50px; height: 50px; border-radius: 5px; object-fit: cover;">`
                        : `<div style="width: 50px; height: 50px; background: rgba(57, 255, 20, 0.1); border-radius: 5px; display: flex; align-items: center; justify-content: center;"><i class="fas fa-shield-halved" style="font-size: 1.5rem; color: var(--primary-green);"></i></div>`;
                    
                    const isPending = club.invitados && club.invitados[currentUserApodo] === 'PENDING';
                    
                    if (isPending) {
                        return `
                        <div style="background: var(--input-bg); padding: 20px; border-radius: 12px; border: 1px solid #ffaa00; text-align: center; position: relative;">
                            <span style="position: absolute; top: -10px; right: 10px; background: #ffaa00; color: #000; font-size: 0.7rem; padding: 3px 8px; border-radius: 10px; font-weight: bold;">Invitación</span>
                            <div style="display: flex; justify-content: center; margin-bottom: 15px;">
                                ${logoHtml}
                            </div>
                            <h4 style="font-size: 1.2rem; margin-bottom: 5px;">${club.name}</h4>
                            <p style="color: var(--text-dim); font-size: 0.85rem; margin-bottom: 15px;"><i class="fas fa-crown"></i> ${club.admin}</p>
                            <div style="display: flex; justify-content: center; gap: 15px;">
                                <button onclick="respondClubInvite('${club.id}', 'ACCEPTED')" style="background: rgba(57, 255, 20, 0.2); border: 1px solid var(--primary-green); color: var(--primary-green); padding: 8px 15px; border-radius: 20px; cursor: pointer; transition: 0.3s;"><i class="fas fa-check"></i> Aceptar</button>
                                <button onclick="respondClubInvite('${club.id}', 'REJECTED')" style="background: rgba(255, 76, 76, 0.2); border: 1px solid #ff4c4c; color: #ff4c4c; padding: 8px 15px; border-radius: 20px; cursor: pointer; transition: 0.3s;"><i class="fas fa-times"></i> Rechazar</button>
                            </div>
                        </div>
                        `;
                    } else {
                        return `
                        <div style="background: var(--input-bg); padding: 20px; border-radius: 12px; border: 1px solid var(--glass-border); text-align: center; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'" onclick="window.location.href='club-detalles.html?id=${club.id}'">
                            <div style="display: flex; justify-content: center; margin-bottom: 15px;">
                                ${logoHtml}
                            </div>
                            <h4 style="font-size: 1.2rem; margin-bottom: 5px;">${club.name}</h4>
                            <p style="color: var(--text-dim); font-size: 0.85rem;"><i class="fas fa-users"></i> ${club.members ? club.members.length : 0} Miembros</p>
                        </div>
                        `;
                    }
                }).join('');
            } else {
                emptyState.style.display = 'block';
                clubsListContainer.style.display = 'none';
            }
        } catch (error) {
            console.error('Error loading clubs:', error);
            emptyState.style.display = 'block';
            clubsListContainer.style.display = 'none';
        }
    };

    window.respondClubInvite = async (clubId, status) => {
        try {
            const response = await fetch(`${API_URL}/${clubId}/respuesta`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ apodo: currentUserApodo, respuesta: status })
            });
            
            if (response.ok) {
                loadClubs();
            } else {
                const data = await response.json();
                alert(data.error || 'Error al responder a la invitación.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión.');
        }
    };

    loadClubs();

    // Toggle logic
    showCreateBtn.addEventListener('click', () => {
        joinFormDiv.style.display = 'none';
        createFormDiv.style.display = 'block';
    });

    showJoinBtn.addEventListener('click', () => {
        createFormDiv.style.display = 'none';
        joinFormDiv.style.display = 'block';
    });

    cancelCreateBtn.addEventListener('click', () => {
        createFormDiv.style.display = 'none';
        newClubForm.reset();
        logoPreviewContainer.style.display = 'none';
        base64Logo = '';
    });

    cancelJoinBtn.addEventListener('click', () => {
        joinFormDiv.style.display = 'none';
        searchClubForm.reset();
    });

    // Create club logic
    newClubForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('club-name').value;
        const membersInput = document.getElementById('club-members').value;
        
        let membersArray = [currentUserApodo];
        let invitedApodos = [];
        
        if (membersInput.trim() !== '') {
            invitedApodos = membersInput.split(',').map(m => m.trim()).filter(m => m !== '' && m !== currentUserApodo);
        }

        const newClub = {
            name: name,
            logo: base64Logo,
            members: membersArray,
            admin: currentUserApodo,
            invitedApodos: invitedApodos // This will be read by the backend
        };

        try {
            // First check if exists
            const resAll = await fetch(API_URL);
            const allClubs = await resAll.json();
            if (allClubs.some(c => c.name.toLowerCase() === name.toLowerCase())) {
                alert('Ya existe un club con ese nombre. Por favor, elige otro.');
                return;
            }

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newClub)
            });

            if (response.ok) {
                alert(`¡Club "${name}" fundado con éxito!`);
                createFormDiv.style.display = 'none';
                newClubForm.reset();
                logoPreviewContainer.style.display = 'none';
                base64Logo = '';
                loadClubs();
            } else {
                alert('Error al crear el club en el servidor.');
            }
        } catch (error) {
            console.error('Error saving club:', error);
            alert('Error de conexión con el servidor.');
        }
    });

    // Join club logic
    searchClubForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const searchName = document.getElementById('search-club-name').value;
        
        try {
            const resAll = await fetch(API_URL);
            const clubs = await resAll.json();
            const clubIndex = clubs.findIndex(c => c.name.toLowerCase() === searchName.toLowerCase());

            if (clubIndex !== -1) {
                const club = clubs[clubIndex];
                const currentUserEmail = localStorage.getItem('user_email') || 'yo@ejemplo.com';
                
                if (club.members.includes(currentUserEmail)) {
                    alert(`Ya eres miembro del club "${club.name}".`);
                } else {
                    alert(`Nota: Las solicitudes no están completamente migradas a Mongo. Pídele al admin que te agregue con tu correo.`);
                }
            } else {
                alert(`No se encontró ningún club con el nombre "${searchName}". Verifica que esté escrito exactamente igual.`);
            }
        } catch (error) {
            console.error('Error joining club:', error);
        }
        
        joinFormDiv.style.display = 'none';
        searchClubForm.reset();
    });
});
