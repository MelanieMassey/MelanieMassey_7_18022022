// Récupération des données recettes et les rendres exploitables
async function getRecipes() {
    const result = await fetch ("data/recipes.json")
    const recipes = await result.json()
    return recipes
}

// Fonction qui va afficher les recettes sur la page index.html
async function displayRecipes(recipes) {
    console.log(recipes);
    // Je vais chercher la section de ma page correspondante
    const recipesZone = document.getElementById("recipesZone")
    

    recipes.forEach((recipe) => {
        const recipeTemplate = new Recipes(recipe);
        const recipeCard = recipeTemplate.getRecipeCard();
        recipesZone.appendChild(recipeCard);
        

        // Test Récupération des ingrédients
        const ingredients = recipe.ingredients;
        console.log(ingredients);
        const ingredientsZone = document.getElementById("recipeIngredients")
        
        /*---------------------------TEST#1 avec classe-------------------------*/
        // ingredients.forEach((ingredient) => {
        //     const ingredientsTemplate = new Recipes(ingredient);
        //     const ingredientsCard = ingredientsTemplate.getIngredientsCard();
        //     console.log(ingredientsTemplate)
        //     ingredientsZone.appendChild(ingredientsCard);
        // });

        /*---------------------------TEST#2 -------------------------*/
        ingredients.forEach((ingredient) => {
            const p = document.createElement("p");
            p.textContent = ingredient.ingredient + ": " + ingredient.quantity + ingredient.unit;
            ingredientsZone.appendChild(p);
            //console.log(ingredient.ingredient);
        });
    });
}

// Fonction qui va initialiser la récupération des données
async function init() {
    const recipes = await getRecipes();
    displayRecipes(recipes.recipes);
}
init();
