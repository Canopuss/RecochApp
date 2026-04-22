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

    const loadClubs = () => {
        const clubs = JSON.parse(localStorage.getItem('clubes') || '[]');
        if (clubs.length > 0) {
            emptyState.style.display = 'none';
            clubsListContainer.style.display = 'block';
            
            clubsList.innerHTML = clubs.map(club => {
                const logoHtml = club.logo 
                    ? `<img src="${club.logo}" alt="Escudo" style="width: 50px; height: 50px; border-radius: 5px; object-fit: cover;">`
                    : `<div style="width: 50px; height: 50px; background: rgba(57, 255, 20, 0.1); border-radius: 5px; display: flex; align-items: center; justify-content: center;"><i class="fas fa-shield-halved" style="font-size: 1.5rem; color: var(--primary-green);"></i></div>`;
                
                return `
                <div style="background: var(--input-bg); padding: 20px; border-radius: 12px; border: 1px solid var(--glass-border); text-align: center;">
                    <div style="display: flex; justify-content: center; margin-bottom: 15px;">
                        ${logoHtml}
                    </div>
                    <h4 style="font-size: 1.2rem; margin-bottom: 5px;">${club.name}</h4>
                    <p style="color: var(--text-dim); font-size: 0.85rem;"><i class="fas fa-users"></i> ${club.members.length} Miembros</p>
                </div>
                `;
            }).join('');
        } else {
            emptyState.style.display = 'block';
            clubsListContainer.style.display = 'none';
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
    newClubForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('club-name').value;
        const membersInput = document.getElementById('club-members').value;
        
        let membersArray = [];
        if (membersInput.trim() !== '') {
            membersArray = membersInput.split(',').map(m => m.trim()).filter(m => m !== '');
        }
        
        // Auto-add the current user
        const currentUserEmail = localStorage.getItem('user_email') || 'yo@ejemplo.com';
        if (!membersArray.includes(currentUserEmail)) {
            membersArray.push(currentUserEmail);
        }

        const newClub = {
            id: Date.now(),
            name: name,
            logo: base64Logo,
            members: membersArray,
            joinRequests: []
        };

        const clubs = JSON.parse(localStorage.getItem('clubes') || '[]');
        
        // Prevent duplicate names
        if (clubs.some(c => c.name.toLowerCase() === name.toLowerCase())) {
            alert('Ya existe un club con ese nombre. Por favor, elige otro.');
            return;
        }

        clubs.push(newClub);
        localStorage.setItem('clubes', JSON.stringify(clubs));
        
        alert(`¡Club "${name}" fundado con éxito!`);
        
        createFormDiv.style.display = 'none';
        newClubForm.reset();
        logoPreviewContainer.style.display = 'none';
        base64Logo = '';
        loadClubs();
    });

    // Join club logic
    searchClubForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchName = document.getElementById('search-club-name').value;
        
        const clubs = JSON.parse(localStorage.getItem('clubes') || '[]');
        const clubIndex = clubs.findIndex(c => c.name.toLowerCase() === searchName.toLowerCase());

        if (clubIndex !== -1) {
            const currentUserEmail = localStorage.getItem('user_email') || 'yo@ejemplo.com';
            
            if (clubs[clubIndex].members.includes(currentUserEmail)) {
                alert(`Ya eres miembro del club "${clubs[clubIndex].name}".`);
            } else if (clubs[clubIndex].joinRequests && clubs[clubIndex].joinRequests.includes(currentUserEmail)) {
                alert(`Ya has enviado una solicitud al club "${clubs[clubIndex].name}" antes propón esperar.`);
            } else {
                if (!clubs[clubIndex].joinRequests) clubs[clubIndex].joinRequests = [];
                clubs[clubIndex].joinRequests.push(currentUserEmail);
                localStorage.setItem('clubes', JSON.stringify(clubs));
                alert(`¡Solicitud enviada a "${clubs[clubIndex].name}" correctamente!`);
            }
        } else {
            alert(`No se encontró ningún club con el nombre "${searchName}". Verifica que esté escrito exactamente igual.`);
        }
        
        joinFormDiv.style.display = 'none';
        searchClubForm.reset();
    });
});
