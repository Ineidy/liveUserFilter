document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('.input__search'); // Cambiado a querySelector
    const personasContainer = document.querySelector('.personas'); // Cambiado a querySelector

    async function fetchData() {
        try {
            const res = await fetch('https://6674179975872d0e0a950e53.mockapi.io/user');
            const data = await res.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    }

    function displayUsers(users) {
        personasContainer.innerHTML = '';
        users.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.classList.add('users');

            userDiv.innerHTML = `
                <div class="foto">
                    <img src="${user.avatar}" class="fotopersona">
                </div>
                <div class="info">
                    <div class="nombre">
                        <h5>${user.name_full}</h5> 
                    </div>
                    <div class="ciudad">
                        <span>${user.description}</span> 
                    </div>
                </div>
            `;
            personasContainer.appendChild(userDiv);
        });
    }

    async function init() {
        const users = await fetchData();
        displayUsers(users);

        input.addEventListener('input', () => {
            const query = input.value.toLowerCase();
            const filteredUsers = users.filter(user =>
                user.name_full.toLowerCase().includes(query) || user.description.toLowerCase().includes(query)
            );
            displayUsers(filteredUsers);
        });
    }

    init(); // Llamada a la función init para inicializar la aplicación
});
