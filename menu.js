fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const menus = document.getElementsByClassName('menu');
        Array.from(menus).forEach(menu => {
            data.navigation.forEach(item => {
                const li = document.createElement('li');
                li.className = 'nav-item';
                li.innerHTML = `<a class="nav-link text-secondary" href="${item.href}">${item.text}</a>`;
                menu.appendChild(li);
            });
        });
        
        const contact = document.getElementById('contact');
        data.contacts.forEach(item => {
            const li = document.createElement('li');
            li.className = 'nav-item';
            li.innerHTML = `<a class="nav-link text-secondary fa-brands fa-${item.platform}" href="${item.url}" target="_blank" rel="noopener"></a>`;
            contact.appendChild(li);
        });
    })
    .catch(error => console.error('Error loading menu:', error));
