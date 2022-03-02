class Search {
    // constructor(recipes) {
    //     this.recipes = recipes
    // }
   
    display() {
        // Récupération des données recettes et les rendres exploitables
        async function getRecipes() {
            const result = await fetch ("data/recipes.json")
            const recipes = await result.json()
            return recipes
        }

        // Fonction qui va afficher les recettes sur la page index.html
        async function displayRecipes(recipes) {  
            //console.log(recipes)
            // --Je vais chercher la section de ma page correspondante
            const recipesZone = document.getElementById("recipesZone")
            
            recipes.forEach((recipe) => {
                const recipeTemplate = new Recipes(recipe);
                const recipeCard = recipeTemplate.getRecipeCard();
                recipesZone.appendChild(recipeCard);     
            });
        }

        async function dislplayFilters(recipes) {
            // /!\ Pour le moment ce sont les recettes du json et non les affichées
            const displayedRecipes = recipes.recipes

            /*-----Récupération des ingrédients des recettes affichées-----*/
            const ingredientButton = document.getElementById("ingredients_button")
            const ul = document.createElement("ul")
            ul.id = "ingredientsList"
            ingredientButton.appendChild(ul)
            
            const filterIngredients = new Set()

            displayedRecipes.forEach((recipe) => {
                const recipeIngredients = recipe.ingredients

                recipeIngredients.forEach((ingredient) => {
                    // Reformatage avec 1ere lettre en majuscule puis minuscules
                    // code de reference : string[0].toUpperCase() + string.substring(1)
                    filterIngredients.add(ingredient.ingredient[0].toUpperCase() + ingredient.ingredient.substring(1).toLowerCase())
                })
            })
            console.log(filterIngredients)

            filterIngredients.forEach((ingredient) => {
                const li = document.createElement("li")
                li.textContent = ingredient
                ul.appendChild(li)
            })

            /*-----Event listener clique du filtre ingrédient-----*/
            const ingredientsDown = document.getElementById("ingredientsDown");
            const ingredientsUp = document.getElementById("ingredientsUp");
            const ingredientsList = document.getElementById("ingredientsList");
            
            function displayIngDown() {
                ingredientButton.style.width = "700px";
                ingredientsList.style.display = "grid";
                ingredientsDown.style.display = "none";
                ingredientsUp.style.display = "block";
            }
            ingredientsDown.addEventListener("click", displayIngDown);

            function displayIngUp() {
                ingredientButton.style.width = "170px";
                ingredientsList.style.display = "none";
                ingredientsDown.style.display = "block";
                ingredientsUp.style.display = "none";
            }
            ingredientsUp.addEventListener("click", displayIngUp);
        }

        // Fonction qui va initialiser la récupération des données
        async function init() {
            const recipes = await getRecipes();
            displayRecipes(recipes.recipes);
            dislplayFilters(recipes);
        }

        init();
    }

    

    
}