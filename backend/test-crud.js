const BASE_URL = 'http://localhost:3001/api';

async function runTests() {
    console.log('--- Starting CRUD Tests ---');

    try {
        // 1. Create User
        const uniqueEmail = `test_${Date.now()}@example.com`;
        console.log(`\n[1] Testing: Create User with ${uniqueEmail}`);
        const userRes = await fetch(`${BASE_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: uniqueEmail,
                password: 'password123',
                nombre_completo: 'Test User'
            })
        });
        const userData = await userRes.json();
        console.log('Response:', userData);
        const userId = userData.id;

        // 1.5 Create Player Profile (Required for Club FK)
        console.log('\n[1.5] Testing: Create Player Profile');
        const playerRes = await fetch(`${BASE_URL}/players`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_jugador: userId,
                estatura: 175,
                peso: 70,
                pierna_habil: 'Derecha'
            })
        });
        console.log('Response:', await playerRes.json());

        // 2. Read Users
        console.log('\n[2] Testing: Read Users');
        const usersRes = await fetch(`${BASE_URL}/users`);
        const allUsers = await usersRes.json();
        console.log('Users Count:', allUsers.data.length);

        // 3. Update User
        console.log('\n[3] Testing: Update User');
        const updateRes = await fetch(`${BASE_URL}/users/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre_completo: 'Updated Test User',
                foto_perfil: 'avatar.png'
            })
        });
        console.log('Response:', await updateRes.json());

        // 4. Create Club
        console.log('\n[4] Testing: Create Club');
        const clubRes = await fetch(`${BASE_URL}/clubs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre_club: 'Test Club',
                id_capitan: userId
            })
        });
        const clubData = await clubRes.json();
        console.log('Response:', clubData);
        const clubId = clubData.id;

        // 5. Read Clubs
        console.log('\n[5] Testing: Read Clubs');
        const clubsRes = await fetch(`${BASE_URL}/clubs`);
        console.log('Clubs count:', (await clubsRes.json()).data.length);

        // 6. Delete Club
        console.log('\n[6] Testing: Delete Club');
        const delClubRes = await fetch(`${BASE_URL}/clubs/${clubId}`, { method: 'DELETE' });
        console.log('Response:', await delClubRes.json());

        // 7. Delete User
        console.log('\n[7] Testing: Delete User');
        const delUserRes = await fetch(`${BASE_URL}/users/${userId}`, { method: 'DELETE' });
        console.log('Response:', await delUserRes.json());

        console.log('\n--- All Tests Completed Successfully ---');
        process.exit(0);

    } catch (error) {
        console.error('\n!!! Test failed with error:', error);
        process.exit(1);
    }
}

// Small delay to ensure server has started if running in parallel
setTimeout(runTests, 2000);
