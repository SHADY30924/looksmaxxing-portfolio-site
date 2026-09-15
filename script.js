console.log("JavaScript is running!");

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle'); 
    if (menuToggle) {
        menuToggle.addEventListener('click', openNav);
    }
    fetchArticles();
});

function openNav() {
    document.getElementById("sideNav").style.width = "250px";
    document.addEventListener('click', closeNavOnClickOutside);
}

function closeNav() {
    document.getElementById("sideNav").style.width = "0";
    document.removeEventListener('click', closeNavOnClickOutside);
}

function closeNavOnClickOutside(event) {
    const sideNav = document.getElementById("sideNav");
    if (!sideNav.contains(event.target) && event.target !== document.querySelector('.menu-toggle')) {
        closeNav();
    }
}

async function fetchArticles() {
    console.log("Fetching articles...");
    try {
        const response = await fetch('http://127.0.0.1:5000/articles');
        const articles = await response.json();

        const articlesContainer = document.getElementById('articles-container');
        articlesContainer.innerHTML = ''; 

        articles.forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.content}</p>
                <small>Created at: ${article.created_at}</small>
                <button onclick="deleteArticle(${article.id})">Delete</button>
                <button onclick="showUpdateForm(${article.id}, '${article.title}', '${article.content}')">Edit</button>
            `;
            articlesContainer.appendChild(articleElement);
        });
    } catch (error) {
        console.error("Error fetching articles:", error);
    }
}
