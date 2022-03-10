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
        // * Recettes mises à jour après recherche
        this.updatedRecipes = []
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
        
        this.searchInput();
        
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
        
        this.pushTags();
        
        
        
    }

    pushTags() {
        const keywords = document.querySelectorAll(".filtersList li")
        
        keywords.forEach((keyword) => {
            
            // * J'écoute le click
            keyword.addEventListener("click", (e) => {
                // e.preventDefault()
                // e.stopPropagation()

                // * Reset affichage
                const tagsList = document.getElementById("tagsList")
                tagsList.innerHTML = ""
                
                // * Envoie le tag clické dans le tableau this.tag et ajoute le code icone X
                this.tags.push(keyword)
                //keyword.innerHTML += '<i class="fa-regular fa-circle-xmark"></i>'
                
                // * Si mon tableau this.tags contient au moins un élément avec on les affiche
                if(this.tags.length > -1) {
                    this.displayTags()
                }

                // * Retire le tag de sa liste de filtre concernée
                switch(keyword.className) {
                    case "ingredientsLi":
                        this.filterIngredients.delete(keyword.textContent)
                    break
                    case "appliancesLi":
                        this.filterAppliance.delete(keyword.textContent)
                    break
                    case "ustensilsLi":
                        this.filterUstensils.delete(keyword.textContent)
                    break
                }
            })

            // keyword.removeEventListener("click", (e) => {
            //     e.preventDefault()
            //     e.stopPropagation()
                
            //     // * Envoie le tag clické dans le tableau this.tag et ajoute le code icone X
            //     this.tags.push(keyword)
            //     //keyword.innerHTML += '<i class="fa-regular fa-circle-xmark"></i>'
               
            //     this.displayTags()
            // })
        })

    }

    displayTags() {
        // * Cible dans mon DOM la liste où seront insérés les tags
        const tagsList = document.getElementById("tagsList")
        
        // * Pour chaque tag du tableau
        this.tags.forEach((tag) => {
            const tagDOM = new Tag(tag);
            const tagCard = tagDOM.getTagCard();
            tagsList.appendChild(tagCard);

                        
            let index = this.tags.indexOf(tag)

            const tagClose = document.querySelector(".fa-circle-xmark")
            
            tagClose.addEventListener("click", (e) => {
                console.log(tag)
                tagsList.remove(tag)
                
                this.tags.splice(index, 1)
            })
        })
    
    }

    searchInput() {
        const searchIcon = document.querySelector(".fa-search")
        
        searchIcon.addEventListener("click", (e) => {
            
            const searchInput = document.getElementById("searchZone_Input").value.toLowerCase()
                        
            if(searchInput.length >= 3) {
                this.recipes.forEach((recipe) => {
                    
                    if(recipe.name.toLowerCase().includes(searchInput) || 
                    recipe.description.toLowerCase().includes(searchInput) ||
                    recipe.ingredients.forEach((ingredient) => {
                        ingredient.ingredient.toLowerCase().includes(searchInput)
                    })) {
                        this.updatedRecipes.push(recipe)
                    }
                    
                })
                console.log(this.updatedRecipes)
                this.displayUpdatedRecipes()
            } else {
                this.display()
            }
        })
    }

    displayUpdatedRecipes() {
        // * Resert de l'affichage des différentes zones
        const recipesZone = document.getElementById("recipesZone")
        recipesZone.innerHTML = ""
        const ingredientsList = document.getElementById("ingredientsList")
        ingredientsList.innerHTML = ""
        const applianceList = document.getElementById("applianceList")
        applianceList.innerHTML = ""
        const ustensilsList = document.getElementById("ustensilsList")
        ustensilsList.innerHTML = ""

        // * Reset des SET
        this.filterIngredients.clear()
        this.filterAppliance.clear()
        this.filterUstensils.clear()

        // * Pour chaque recette du tableau des recettes mis à jour...
        this.updatedRecipes.forEach((recipe) => {
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
        })

        // * J'appelle la fonction qui va compléter les filtres
        this.displayFilters();
        
        this.searchInput();
    }
    

    
}