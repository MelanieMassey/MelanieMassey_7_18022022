class Search {
    constructor(recipes) {
        // * Récupération des recettes (recipes.recipes permet d'afficher un tableau direct)
        this.recipes = recipes.recipes
        // * Mise en place des Set qui sotckeront les données affichées
        this.filterIngredients = new Set()
        this.filterAppliance = new Set()
        this.filterUstensils = new Set()
        // * Mise en place du stockage des tags affichés
        this.tags = []
    }

    // *** Fonction principale qui affiche les recettes *** \\
    display() {
        const recipesZone = document.getElementById("recipesZone")

        // * Pour chaque recette...
        this.recipes.forEach((recipe) => {
            // * ... j'affiche la recette via la classe Recipe
            const recipeDOM = new Recipe(recipe);
            const recipeCard = recipeDOM.getRecipeCard();
            recipesZone.appendChild(recipeCard);
            // * ... j'ajoute chaque ingrédient de la recette dans le SET filterIngredients
            recipe.ingredients.forEach((ingredient) => {
                this.filterIngredients.add(ingredient.ingredient[0].toUpperCase() + ingredient.ingredient.substring(1).toLowerCase());
            })
            // * ... j'ajoute chaque appareil de la recette dans le SET filterAppliance
            this.filterAppliance.add(recipe.appliance);
            // * ... j'ajoute chaque ustensil de la recette dans le SET filterUstensils
            recipe.ustensils.forEach((ustensil) => {
                this.filterUstensils.add(ustensil)
            })
        });
        // * J'appelle la fonction qui va compléter les filtres
        this.displayFilters();
    }

    // *** Fonction qui va compléter chaque filtre *** \\
    displayFilters() {
        // * J'affiche chaque ingrédient du SET via la classe Ingredient
        const ingredientsList = document.getElementById("ingredientsList")
        this.filterIngredients.forEach((ingredient) => {
            const ingredientDOM = new Ingredient(ingredient)
            ingredientsList.appendChild(ingredientDOM.getIngDOM())
        })
        // * J'affiche chaque appareil du SET via la classe Appliance
        const applianceList = document.getElementById("applianceList")
        this.filterAppliance.forEach((appliance) => {
            const applianceDOM = new Appliance(appliance)
            applianceList.appendChild(applianceDOM.getApplianceDOM())
        })
        // * J'affiche chaque ustensil du SET via la classe Ustensil
        const ustensilsList = document.getElementById("ustensilsList")
        this.filterUstensils.forEach((ustensil) => {
            const ustensilDOM = new Ustensil(ustensil)
            ustensilsList.appendChild(ustensilDOM.getUstensilDOM())
        })   
    }

    
    

    
}