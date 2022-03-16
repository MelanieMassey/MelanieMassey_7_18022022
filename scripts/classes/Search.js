class Search {
    constructor(recipes) {
        // * Récupération des recettes (recipes.recipes permet d'afficher un tableau direct)
        this.recipes = recipes.recipes
        // * Mise en place des Set qui sotckeront les données affichées
        this.filterIngredients = new Set()
        this.filterAppliance = new Set()
        this.filterUstensils = new Set()
        // * Mise en place du stockage des tags affichés
        this.tagsIngredients = []
        this.tagsAppliance = []
        this.tagsUstensils = []
        // * Recettes mises à jour après recherche
        this.updatedRecipes = []
    }

    // *** Méthode principale qui affiche les recettes *** \\
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

    // *** Méthode qui va compléter chaque filtre *** \\
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

    // *** Méthode qui ajoute les tags au tableau this.tags ***\\
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
            
                // * Retire le tag de sa liste de filtre concernée
                switch(keyword.className) {
                    case "ingredientsLi":
                        this.tagsIngredients.push(e.target.textContent)
                        this.filterIngredients.delete(keyword.textContent)
                    break
                    case "appliancesLi":
                        this.tagsAppliance.push(e.target.textContent)
                        this.filterAppliance.delete(keyword.textContent)
                    break
                    case "ustensilsLi":
                        this.tagsUstensils.push(e.target.textContent)
                        this.filterUstensils.delete(keyword.textContent)
                    break
                }
                
                // * Si mon tableau this.tags contient au moins un élément on les affiche
                // console.log(this.tags)
                // console.log(this.tags.length)
                // if(this.tags.length > 0) {
                //     this.displayTags()
                // }

                this.displayTags()
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

    // *** Méthode qui affiche les tags *** \\
    displayTags() {
        
        
        // * Cible dans mon DOM la liste où seront insérés les tags
        const tagsList = document.getElementById("tagsList")

        // * Pour chaque tag du tableau
        this.tagsIngredients.forEach((tag) => {
            
            const tagDOM = new Tag(tag,"ingredient");
            const tagCard = tagDOM.getTagCard();
            tagsList.appendChild(tagCard);

            const closeTag = tagCard.querySelector("i");
            closeTag.addEventListener("click", e => {
                if(e.target.parentNode.className == "ingredient") {
                    const index = this.tagsIngredients.indexOf(tag)
                    this.tagsIngredients.splice(index, 1)
                    e.target.parentNode.remove(tag)
                }
            })
        })
        
        this.tagsAppliance.forEach((tag) => {
            
            const tagDOM = new Tag(tag,"appliance");
            const tagCard = tagDOM.getTagCard();
            tagsList.appendChild(tagCard);

            const closeTag = tagCard.querySelector("i");
            closeTag.addEventListener("click", e => {
                if(e.target.parentNode.className == "appliance") {
                    const index = this.tagsIngredients.indexOf(tag)
                    this.tagsAppliance.splice(index, 1)
                    e.target.parentNode.remove(tag)
                }
            })
        })

        this.tagsUstensils.forEach((tag) => {
            
            const tagDOM = new Tag(tag,"ustensil");
            const tagCard = tagDOM.getTagCard();
            tagsList.appendChild(tagCard);

            const closeTag = tagCard.querySelector("i");
            closeTag.addEventListener("click", e => {
                if(e.target.parentNode.className == "ustensil") {
                    const index = this.tagsIngredients.indexOf(tag)
                    this.tagsUstensils.splice(index, 1)
                    e.target.parentNode.remove(tag)
                }
            })
        })

        // *** PREMIER ESSAI FERMETURE TAGS *** \\
        // ~~~ Me met addEventListener not a function ~~~ \\
        
        // const tagClose = document.querySelectorAll("tagsList i")
        // console.log(tagClose)
        
        // tagClose.forEarch((tag) => {
        //     tag.addEventListener("click", (e) => {
        //         //console.log("hello")
        //         if(e.target.parentNode.className == "ingredient") {
        //             const index = tagClose.indexOf(e.target.parentNode)
        //             this.tagsIngredients.splice(index, 1)
        //         } else if(e.target.parentNode.className == "appliance") {
        //             const index = tagClose.indexOf(e.target.parentNode)
        //             this.tagsAppliance.splice(index, 1)
        //         } else if(e.target.parentNode.className == "ustensil") {
        //             const index = tagClose.indexOf(e.target.parentNode)
        //             this.tagsUstensils.splice(index, 1)
        //         }
                
        //         e.target.parentNode.remove()
        //     })
        // })
    }

    // *** Méthode de recherche à l'input dès 3 lettres renseignées *** \\
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
                
                this.displayUpdatedRecipes()
            } else {
                this.display()
            }
        })
    }

    displayUpdatedRecipes() {
        // * Reset l'affichage des différentes zones
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