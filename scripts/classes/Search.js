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
            console.log(displayedRecipes)

            /*-----Récupération des ingrédients/appareils/ustensils des recettes affichées-----*/
            //~~Construction du DOM
            const ingredientButton = document.getElementById("ingredients_button")
            const ingredientsUl = document.createElement("ul")
            ingredientsUl.id = "ingredientsList"
            ingredientButton.appendChild(ingredientsUl)

            const applianceButton = document.getElementById("appliance_button")
            const applianceUl = document.createElement("ul")
            applianceUl.id = "applianceList"
            applianceButton.appendChild(applianceUl)

            const ustensilsButton = document.getElementById("ustensils_button")
            const ustensilsUl = document.createElement("ul")
            ustensilsUl.id = "ustensilsList"
            ustensilsButton.appendChild(ustensilsUl)

            
            //~~Mise en place des Set
            const filterIngredients = new Set()
            const filterAppliance = new Set()
            const filterUstensils = new Set()

            
            displayedRecipes.forEach((recipe) => {
                // Ajout des ingrédients au Set filterIngredients
                const recipeIngredients = recipe.ingredients
                recipeIngredients.forEach((ingredient) => {
                    // Reformatage avec 1ere lettre en majuscule puis minuscules
                    // code de reference : string[0].toUpperCase() + string.substring(1)
                    filterIngredients.add(ingredient.ingredient[0].toUpperCase() + ingredient.ingredient.substring(1).toLowerCase())
                })

                // Ajout des appareils au Set filterAppliance
                const recipeAppliance = recipe.appliance
                filterAppliance.add(recipeAppliance)

                // Ajout des ustensils au Set filterUstensils
                const recipeUstensils = recipe.ustensils
                recipeUstensils.forEach((ustensil) => {
                    filterUstensils.add(ustensil)
                })
                
            })

            //~~ Construction DOM des listes de chaque filtre
            filterIngredients.forEach((ingredient) => {
                const ingredientsLi = document.createElement("li")
                ingredientsLi.textContent = ingredient
                ingredientsUl.appendChild(ingredientsLi)
            })
            filterAppliance.forEach((appliance) => {
                const applianceLi = document.createElement("li")
                applianceLi.textContent = appliance
                applianceUl.appendChild(applianceLi)
            })
            filterUstensils.forEach((ustensil) => {
                const ustensilLi = document.createElement("li")
                ustensilLi.textContent = ustensil
                ustensilsUl.appendChild(ustensilLi)
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

            /*-----Event listener click du filtre appareils-----*/
            const applianceDown = document.getElementById("applianceDown");
            const applianceUp = document.getElementById("applianceUp");
            const applianceList = document.getElementById("applianceList")

            function displayAppDown() {
                applianceButton.style.width = "500px";
                applianceList.style.display = "grid";
                applianceDown.style.display = "none";
                applianceUp.style.display = "block";
            }
            applianceDown.addEventListener("click", displayAppDown);

            function displayAppUp() {
                applianceButton.style.width = "170px";
                applianceList.style.display = "none";
                applianceDown.style.display = "block";
                applianceUp.style.display = "none";
            }
            applianceUp.addEventListener("click", displayAppUp);

            /*-----Event listener click du filtre ustensils-----*/
            const ustensilsDown = document.getElementById("ustensilsDown");
            const ustensilsUp = document.getElementById("ustensilsUp");
            const ustensilsList = document.getElementById("ustensilsList");

            function displayUstDown() {
                ustensilsButton.style.width = "500px";
                ustensilsList.style.display = "grid";
                ustensilsDown.style.display = "none";
                ustensilsUp.style.display = "block";
            }
            ustensilsDown.addEventListener("click", displayUstDown);

            function displayUstUp() {
                ustensilsButton.style.width = "170px";
                ustensilsList.style.display = "none";
                ustensilsDown.style.display = "block";
                ustensilsUp.style.display = "none";
            }
            ustensilsUp.addEventListener("click", displayUstUp);
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