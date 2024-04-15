const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results');

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();

    if (!searchTerm) {
        alert('Please enter a GitHub username');
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/search/users?q=${searchTerm}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            throw new Error('Error in fetch');
        }

        const data = await response.json();
        displayResults(data.items);
    } catch (error) {
        console.error(error);
        alert('An error occurred while searching');
    }
});

function displayResults(users) {
    resultsContainer.innerHTML = '';
    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('user');
        userDiv.innerHTML = `
            <a href="${user.html_url}" target="_blank">
                <img src="${user.avatar_url}" alt="${user.login}">
            </a>
            <h3><a href="${user.html_url}" target="_blank">${user.login}</a></h3>
        `;
        resultsContainer.appendChild(userDiv);
    });
}