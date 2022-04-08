class Search {
        
    constructor(recipes) {
        // * Récupération des recettes (recipes.recipes permet d'afficher un tableau direct)
        this.recipes = recipes.recipes
        // * Mise en place des Set qui sotckeront les données affichées
        this.filterIngredients = new Set()
        this.filterAppliances = new Set()
        this.filterUstensils = new Set()
        // * Mise en place du stockage des tags affichés
        this.tagsIngredients = []
        this.tagsAppliances = []
        this.tagsUstensils = []
        
        this.searchInput = ""

        // * Variables boutons filtres
        this.ingredientsInput = document.getElementById("filter_ingredients")
        this.appliancesInput = document.getElementById("filter_appliances")
        this.ustensilsInput = document.getElementById("filter_ustensils")
    }

    // *** Méthode principale qui affiche les recettes *** \\
    display(inputValue=null) {
        
        if(inputValue != null) {
            this.searchInput = inputValue
        }
        
        // * Reset l'affichage des différentes zones
        const recipesZone = document.getElementById("recipesZone")
        recipesZone.innerHTML = ""
        const ingredientsList = document.getElementById("ingredientsList")
        ingredientsList.innerHTML = ""
        const appliancesList = document.getElementById("appliancesList")
        appliancesList.innerHTML = ""
        const ustensilsList = document.getElementById("ustensilsList")
        ustensilsList.innerHTML = ""

        // * Reset des SET
        this.filterIngredients.clear()
        this.filterAppliances.clear()
        this.filterUstensils.clear()

        // * Tableau stockage première recherche input
        let searchedArray = []

        // * Si l'inputValue > 3 lettres ou si tags alors ça envoie les recettes correspondantes dans un tableau
        if(this.searchInput.length >= 3) {
            this.recipes.forEach((recipe) => {
                if(recipe.name.toLowerCase().includes(this.searchInput) || 
                recipe.description.toLowerCase().includes(this.searchInput) ||
                recipe.ingredients.forEach((ingredient) => {
                    ingredient.ingredient.toLowerCase().includes(this.searchInput)
                }) || (this.recipeHasIngredients(recipe, true)) && this.recipeHasAppliances(recipe, true) && this.recipeHasUstensils(recipe, true)) 
                {
                    this.displayRecipe(recipe)
                    searchedArray.push(recipe)
                    return searchedArray
                }
            })
        } else {
            console.log("hello")
            this.recipes.forEach((recipe) => {
                this.displayRecipe(recipe)
                searchedArray = this.recipes
                return searchedArray
                //console.log(searchedArray)
            })
        }
        console.log(searchedArray)
        
        // * Si tag(s) alors je push dans un tableau taggedArray et j'affiche les recettes finales
        if(this.tagsIngredients.length > 0 || this.tagsAppliances.length > 0 || this.tagsUstensils.length > 0) {
            let taggedArray = []

            searchedArray.forEach((recipe) => {
                if(this.recipeHasIngredients(recipe) && this.recipeHasAppliances(recipe) && this.recipeHasUstensils(recipe)) {
                    taggedArray.push(recipe)
                }
                //console.log(taggedArray)
            })
            console.log(taggedArray)
            recipesZone.innerHTML = ""

            taggedArray.forEach((recipe) => {
                this.displayRecipe(recipe)
            })
        }

        // * Affiche message "pas de recette disponible"
        if(recipesZone.innerHTML == "") {
            const noRecipesDiv = document.createElement("div")
            noRecipesDiv.textContent = "Il n'y a pas de recette correspondant à votre recherche."
            noRecipesDiv.id = "noRecipes"
            recipesZone.appendChild(noRecipesDiv)
        }
        
        // * J'appelle la fonction qui va compléter les filtres
        this.displayFilters(this.filterIngredients, this.filterAppliances, this.filterUstensils);
        
        // > Event listener input du filtre ingrédients
        this.ingredientsInput.addEventListener("input", (e) => {
            const value = e.target.value
            let newIngredientsSet = new Set();
            this.filterIngredients.forEach((ingredient) => {
                if(ingredient.toLowerCase().includes(value.toLowerCase())) {
                    newIngredientsSet.add(ingredient);
                }
            })                        
            this.displayFilters(newIngredientsSet, this.filterAppliances, this.filterUstensils)          
        })
        // > Event listener input du filtre appareils
        this.appliancesInput.addEventListener("input", (e) => {
            const value = e.target.value
            let newAppliancesSet = new Set();
            this.filterAppliances.forEach((appliance) => {
                if(appliance.toLowerCase().includes(value.toLowerCase())) {
                    newAppliancesSet.add(appliance);
                }
            })                        
            this.displayFilters(this.filterIngredients, newAppliancesSet, this.filterUstensils)          
        })
        // > Event listener input du filtre ustensils
        this.ustensilsInput.addEventListener("input", (e) => {
            const value = e.target.value
            let newUstensilsSet = new Set();
            this.filterUstensils.forEach((ustensil) => {
                if(ustensil.toLowerCase().includes(value.toLowerCase())) {
                    newUstensilsSet.add(ustensil);
                }
            })                        
            this.displayFilters(this.filterIngredients, this.filterAppliances, newUstensilsSet)          
        })


        
    }

    recipeHasIngredients(recipe, strict=false) {
        let result = 0;
        
        if(strict && this.tagsIngredients <= 0){
            return false
        }

        this.tagsIngredients.forEach((ingredientTag) => {
            recipe.ingredients.forEach((ingredient) => {
                if(ingredient.ingredient.toLowerCase() == ingredientTag.toLowerCase()) {
                    result++;
                }
            })
        })
        return (result >= this.tagsIngredients.length)
    }

    // *** Méthodes qui vérifient si les tags sont contenus dans les recettes *** \\
    recipeHasAppliances(recipe, strict=false) {
        let result = 0;
        
        if(strict && this.tagsAppliances <= 0){
            return false
        }

        this.tagsAppliances.forEach((applianceTag) => {
            if(recipe.appliance.toLowerCase() == applianceTag.toLowerCase()) {
                result++;
            }
        })
        return (result >= this.tagsAppliances.length)
    }

    recipeHasUstensils(recipe, strict=false) {
        let result = 0;

        if(strict && this.tagsUstensils <= 0){
            return false
        }
        
        this.tagsUstensils.forEach((ustensilTag) => {
            recipe.ustensils.forEach((ustensil) => {
                if(ustensil.toLowerCase() == ustensilTag.toLowerCase()) {
                    result++;
                }
            })
        })
        return (result >= this.tagsUstensils.length)
    }

    // *** Méthode qui va afficher la recette si elle respecte les conditions *** \\
    displayRecipe(recipe) {
        const recipesZone = document.getElementById("recipesZone")
        
        // * ... j'affiche la recette via la classe Recipe
        const recipeDOM = new Recipe(recipe);
        const recipeCard = recipeDOM.getRecipeCard();
        recipesZone.appendChild(recipeCard);
        // * ... j'ajoute chaque ingrédient de la recette dans le SET filterIngredients
        recipe.ingredients.forEach((ingredient) => {
            this.filterIngredients.add(ingredient.ingredient[0].toUpperCase() + ingredient.ingredient.substring(1).toLowerCase());
        })
        this.filterIngredientsArray = Array.from(this.filterIngredients)
        
        // * ... j'ajoute chaque appareil de la recette dans le SET filterAppliance
        this.filterAppliances.add(recipe.appliance);
        // * ... j'ajoute chaque ustensil de la recette dans le SET filterUstensils
        recipe.ustensils.forEach((ustensil) => {
            this.filterUstensils.add(ustensil)
        })
    }

    // *** Méthode qui va compléter chaque filtre *** \\
    displayFilters(set1, set2, set3) {

        const ingredientsList = document.getElementById("ingredientsList")
        ingredientsList.innerHTML = ""
        const appliancesList = document.getElementById("appliancesList")
        appliancesList.innerHTML = ""
        const ustensilsList = document.getElementById("ustensilsList")
        ustensilsList.innerHTML = ""

        // * J'affiche chaque ingrédient du SET via la classe Ingredient
        //const ingredientsList = document.getElementById("ingredientsList")
        set1.forEach((ingredient) => {
            const ingredientDOM = new Ingredient(ingredient)
            ingredientsList.appendChild(ingredientDOM.getIngDOM())
        })
        // * J'affiche chaque appareil du SET via la classe Appliance
        //const appliancesList = document.getElementById("appliancesList")
        set2.forEach((appliance) => {
            const applianceDOM = new Appliance(appliance)
            appliancesList.appendChild(applianceDOM.getApplianceDOM())
        })
        // * J'affiche chaque ustensil du SET via la classe Ustensil
        //const ustensilsList = document.getElementById("ustensilsList")
        set3.forEach((ustensil) => {
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
                        this.tagsAppliances.push(e.target.textContent)
                        this.filterAppliances.delete(keyword.textContent)
                    break
                    case "ustensilsLi":
                        this.tagsUstensils.push(e.target.textContent)
                        this.filterUstensils.delete(keyword.textContent)
                    break
                }
                console.log(this.tagsUstensils)
                this.displayTags()
                this.display(this.searchInput)
                
            })
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
                    this.filterIngredients.add(tag)
                    this.display(this.searchInput)
                }
            })

        })
        
        this.tagsAppliances.forEach((tag) => {
            
            const tagDOM = new Tag(tag,"appliance");
            const tagCard = tagDOM.getTagCard();
            tagsList.appendChild(tagCard);

            const closeTag = tagCard.querySelector("i");
            closeTag.addEventListener("click", e => {
                if(e.target.parentNode.className == "appliance") {
                    const index = this.tagsIngredients.indexOf(tag)
                    this.tagsAppliances.splice(index, 1)
                    e.target.parentNode.remove(tag)
                    this.filterAppliances.add(tag)
                    this.display(this.searchInput)
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
                    this.filterUstensils.add(tag)
                    this.display(this.searchInput)
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
        //             this.tagsAppliances.splice(index, 1)
        //         } else if(e.target.parentNode.className == "ustensil") {
        //             const index = tagClose.indexOf(e.target.parentNode)
        //             this.tagsUstensils.splice(index, 1)
        //         }
                
        //         e.target.parentNode.remove()
        //     })
        // })
    }

    // *** PREMIER ESSAI RECHERCHE INPUT *** \\
    // searchInput() {
    //     const searchIcon = document.querySelector(".fa-search")
        
    //     searchIcon.addEventListener("click", (e) => {
            
    //         const searchInput = document.getElementById("searchZone_Input").value.toLowerCase()
                        
    //         if(searchInput.length >= 3) {
    //             this.recipes.forEach((recipe) => {
                    
    //                 if(recipe.name.toLowerCase().includes(searchInput) || 
    //                 recipe.description.toLowerCase().includes(searchInput) ||
    //                 recipe.ingredients.forEach((ingredient) => {
    //                     ingredient.ingredient.toLowerCase().includes(searchInput)
    //                 })) {
    //                     this.updatedRecipes.push(recipe)
    //                 }
                    
    //             })
                
    //             this.displayUpdatedRecipes()
    //         } else {
    //             this.display()
    //         }
    //     })
    // }

    // displayUpdatedRecipes() {
    //     // * Reset l'affichage des différentes zones
    //     const recipesZone = document.getElementById("recipesZone")
    //     recipesZone.innerHTML = ""
    //     const ingredientsList = document.getElementById("ingredientsList")
    //     ingredientsList.innerHTML = ""
    //     const appliancesList = document.getElementById("appliancesList")
    //     appliancesList.innerHTML = ""
    //     const ustensilsList = document.getElementById("ustensilsList")
    //     ustensilsList.innerHTML = ""

    //     // * Reset des SET
    //     this.filterIngredients.clear()
    //     this.filterAppliances.clear()
    //     this.filterUstensils.clear()

    //     // * Pour chaque recette du tableau des recettes mis à jour...
    //     this.updatedRecipes.forEach((recipe) => {
    //         // * ... j'affiche la recette via la classe Recipe
    //         const recipeDOM = new Recipe(recipe);
    //         const recipeCard = recipeDOM.getRecipeCard();
    //         recipesZone.appendChild(recipeCard);
    //         // * ... j'ajoute chaque ingrédient de la recette dans le SET filterIngredients
    //         recipe.ingredients.forEach((ingredient) => {
    //             this.filterIngredients.add(ingredient.ingredient[0].toUpperCase() + ingredient.ingredient.substring(1).toLowerCase());
    //         })
    //         // * ... j'ajoute chaque appareil de la recette dans le SET filterAppliances
    //         this.filterAppliances.add(recipe.appliance);
    //         // * ... j'ajoute chaque ustensil de la recette dans le SET filterUstensils
    //         recipe.ustensils.forEach((ustensil) => {
    //             this.filterUstensils.add(ustensil)
    //         })
    //     })

    //     // * J'appelle la fonction qui va compléter les filtres
    //     this.displayFilters();
        
    //     this.searchInput();
    // }
    

    
}