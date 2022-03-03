// Récupération des données recettes et les rendres exploitables
async function getRecipes() {
    const result = await fetch ("data/recipes.json")
    const recipes = await result.json()
    return recipes
}

// Affichage des recettes via la méthode display() de la class Search
const display = new Search;
const displayRecipes = display.display();


