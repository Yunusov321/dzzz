const API_URL = 'https://randomuser.me/api/?results=100';
        let users = [];

        async function fetchUsers() {
            document.querySelector('.loader').style.display = 'block';
            const response = await fetch(API_URL);
            const data = await response.json();
            users = data.results;
            document.querySelector('.loader').style.display = 'none';
            displayUsers(users);
        }

        function displayUsers(users) {
            const userList = document.querySelector('.user-list');
            userList.innerHTML = '';
            users.forEach(user => {
                userList.innerHTML += `
                    <div class="user">
                        <img src="${user.picture.medium}" alt="User">
                        <p>${user.name.first} ${user.name.last}, ${user.dob.age} лет</p>
                    </div>`;
            });
        }

        function sortByName() {
            users.sort((a, b) => a.name.first.localeCompare(b.name.first));
            displayUsers(users);
        }

        function sortByAge() {
            users.sort((a, b) => a.dob.age - b.dob.age);
            displayUsers(users);
        }

        document.getElementById('filter').addEventListener('input', (e) => {
            const search = e.target.value.toLowerCase();
            const filteredUsers = users.filter(user => 
                user.name.first.toLowerCase().includes(search) ||
                user.name.last.toLowerCase().includes(search)
            );
            displayUsers(filteredUsers);
        });

        fetchUsers();