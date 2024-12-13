
document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const query = searchInput.value.trim().toLowerCase();
        if (query) {
            window.location.href = `overzicht.html?search=${encodeURIComponent(query)}`;
        } else {
            alert("Voer een zoekterm in.");
        }
    });

    initTrendingSection();
});

function initTrendingSection() {
    const trendingSection = document.querySelector("main section.text-center");
    if (!trendingSection) return;

    const recipeTitle = "Crispy kipburger";
    const recipeImage = "Foto's/crispy_kipburger.webp";
    const recipeLink = "trending.html";

    trendingSection.innerHTML = `
        <h1><em>Hey!</em></h1>
        <h2><strong>Trending recept</strong></h2>
        <h3>${recipeTitle}</h3>
        <a href="${recipeLink}"><img src="${recipeImage}" alt="${recipeTitle}" class="img-fluid rounded"></a>
    `;
}



const apiKey = '3e384d7ea58a4c1bba4787531681006a';


async function fetchRecipe(tag, containerId) {
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&tags=${tag}&number=1`);
        const data = await response.json();
        const recipe = data.recipes[0];

        const recipeHTML = `
            <div class="card">
                <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
                <div class="card-body">
                    <h5 class="card-title">${recipe.title}</h5>
                    <p class="card-text">${recipe.instructions ? recipe.instructions : 'Geen bereidingsinstructies beschikbaar'}</p>
                    <a href="https://spoonacular.com/recipes/${recipe.title.replace(/\s+/g, '-').toLowerCase()}-${recipe.id}" target="_blank" class="btn btn-primary">Bekijk het recept</a>
                </div>
            </div>
        `;
        document.getElementById(containerId).innerHTML = recipeHTML;
    } catch (error) {
        console.error('Error fetching recipe:', error);
        document.getElementById(containerId).innerHTML = `<p>Er is een probleem met het laden van het recept. Probeer het later opnieuw.</p>`;
    }
}


window.onload = () => {

    const page = window.location.pathname.split('/').pop();
    
    if (page === 'drank.html') {
        fetchRecipe('drink', 'recipe-section');
    } else if (page === 'dessert.html') {
        fetchRecipe('dessert', 'recipe-section');
    } else if (page === 'salades.html') {
        fetchRecipe('salad', 'recipe-section');
    } else if (page === 'quickfix.html') {
        fetchRecipe('quick', 'recipe-section');
    } else if (page === 'ontbijtenlunch.html') {
        fetchRecipe('breakfast,lunch', 'recipe-section');
    } else if (page === 'hoofdgerechten.html') {
        fetchRecipe('main course', 'recipe-section');
    }
};
