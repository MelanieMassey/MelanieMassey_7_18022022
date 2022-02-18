class Recipes {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.servings = data.servings
        this.ingredients = []
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
        const divRecipeTimer = document.createElement("div")
        
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

        const divIngredients = document.createElement("div")
        const pDescription = document.createElement("p")
        pDescription.textContent = this.description
        divRecipeContent.appendChild(divIngredients)
        divRecipeContent.appendChild(pDescription)

        article.appendChild(imgRecipe)
        article.appendChild(divRecipeHeader)
        article.appendChild(divRecipeContent)

        return article
    }
}