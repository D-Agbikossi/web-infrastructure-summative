// Store the JWT token in localStorage for session persistence
let token = localStorage.getItem('token');

// Fetch and display articles from the backend
const fetchArticles = () => {
    fetch('/api/articles')
        .then(response => response.json())
        .then(articles => {
            const articlesDiv = document.getElementById('articles');
            articlesDiv.innerHTML = ''; // Clear existing articles

            articles.forEach(article => {
                const articleElement = document.createElement('article');
                articleElement.innerHTML = ` 
                    <h3>${article.title}</h3> 
                    <p><strong>By:</strong> ${article.author}</p> 
                    <p>${article.content}</p> 
                    <p><a href="${article.reference}" target="_blank">Read more</a></p> 
                `;
                articlesDiv.appendChild(articleElement);
            });
        })
        .catch(error => {
            console.error('Error fetching articles:', error);
        });
};

// Handle user login
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        if (response.ok) {
            const data = await response.json();
            token = data.token;
            localStorage.setItem('token', token); // Save token for session persistence
            alert('Login successful!');
        } else {
            alert('Login failed. Please check your credentials.');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login.');
    }
});

// Handle user signup
document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        if (response.ok) {
            alert('Signup successful! You can now log in.');
        } else {
            alert('Signup failed. Please use a different username.');
        }
    } catch (error) {
        console.error('Error during signup:', error);
        alert('An error occurred during signup.');
    }
});

// Handle new article submission
document.getElementById('article-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('article-title').value;
    const content = document.getElementById('article-content').value;
    const reference = document.getElementById('article-reference').value;

    try {
        const response = await fetch('/api/articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Send JWT token for authentication
            },
            body: JSON.stringify({ title, content, reference }),
        });

        if (response.ok) {
            alert('Article submitted successfully!');
            fetchArticles(); // Refresh the articles list
        } else {
            alert('Failed to submit the article. Please check your login status.');
        }
    } catch (error) {
        console.error('Error submitting article:', error);
        alert('An error occurred while submitting the article.');
    }
});

// Fetch and display articles on page load
fetchArticles();
