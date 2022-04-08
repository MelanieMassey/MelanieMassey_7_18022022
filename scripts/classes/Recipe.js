export class Recipe {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.servings = data.servings
        this.ingredients = data.ingredients
        this.time = data.time
        this.description = data.description
        this.appliance = data.appliance
        this.ustensils = []
    }

    getRecipeCard() {
        const article = document.createElement("article")

        const imgRecipe = document.createElement("img")
        imgRecipe.setAttribute("src", `assets/img.png`)
        
        const divRecipeHeader = document.createElement("div")
        divRecipeHeader.className = "recipeHeader"
        const divRecipeTimer = document.createElement("div")
        divRecipeTimer.className = "recipeTimer"
        
        const h2Recipe = document.createElement("h2")
        h2Recipe.textContent = this.name
        divRecipeHeader.appendChild(h2Recipe)
        divRecipeHeader.appendChild(divRecipeTimer)

        const clockRecipe = document.createElement("i")
        clockRecipe.className = "fa-regular fa-clock"
        const timeRecipe = document.createElement("p")
        timeRecipe.textContent = this.time
        divRecipeTimer.appendChild(clockRecipe)
        divRecipeTimer.appendChild(timeRecipe)

        const divRecipeContent = document.createElement("div")
        divRecipeContent.className = "recipeContent"

        const divIngredients = document.createElement("div") 
        divIngredients.className = "recipeIngredients"
        this.getIngredientsCard(divIngredients)

        const pDescription = document.createElement("p")
        pDescription.className = "recipeDescription"
        pDescription.textContent = this.description
        divRecipeContent.appendChild(divIngredients)
        divRecipeContent.appendChild(pDescription)

        article.appendChild(imgRecipe)
        article.appendChild(divRecipeHeader)
        article.appendChild(divRecipeContent)

        return article
    }

    getIngredientsCard(divIngredients) {
        this.ingredients.forEach((ingredient) => {
            const p = document.createElement("p");
            p.className = "displayedIngredients";

            // Condition pour afficher ou non les quantités et unités
            if(ingredient.quantity == undefined) {
                p.textContent = ingredient.ingredient
            } else if(ingredient.unit == undefined) {
                p.textContent = ingredient.ingredient + ": " + ingredient.quantity
            } else if(ingredient.unit == "grammes") {
                p.textContent = ingredient.ingredient + ": " + ingredient.quantity + "g"
            } else {
                p.textContent = ingredient.ingredient + ": " + ingredient.quantity + ingredient.unit;
            }
            
            divIngredients.appendChild(p);
        })
    }

    hasIngredients(tagList, strict=false) {
        console.log("entré dans hasIngredients")
        let result = 0;
        
        if(strict && tagList <= 0){
            return false
        }
    
        tagList.forEach((tag) => {
            this.ingredients.forEach((ingredient) => {
                if(ingredient.ingredient.toLowerCase() == tag.toLowerCase()) {
                    result++;
                }
            })
        })
        return (result >= tagList.length)
    }
}

export function hasIngredients(tagList, strict=false) {
    console.log("entré dans hasIngredients")
    let result = 0;
    
    if(strict && tagList <= 0){
        return false
    }

    tagList.forEach((tag) => {
        this.ingredients.forEach((ingredient) => {
            if(ingredient.ingredient.toLowerCase() == tag.toLowerCase()) {
                result++;
            }
        })
    })
    return (result >= tagList.length)
}