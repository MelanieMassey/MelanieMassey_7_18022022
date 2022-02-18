// Récupération des données recettes et les rendres exploitables
async function getRecipes() {
    const result = await fetch ("data/recipes.json")
    const recipes = await result.json()
    return recipes
}

// Fonction qui va afficher les recettes sur la page index.html
async function displayRecipes(recipes) {
    // Je vais chercher la section de ma page correspondante
    const recipesZone = document.getElementById("recipesZone")

    recipes.forEach((recipe) => {
        const recipeTemplate = new Recipes(recipe);
        const recipeCard = recipeTemplate.getRecipeCard();
        recipesZone.appendChild(recipeCard);
    });
}

// Fonction qui va initialiser la récupération des données
async function init() {
    const recipes = await getRecipes();
    displayRecipes(recipes.recipes);
    console.log(recipes);
}
init()
