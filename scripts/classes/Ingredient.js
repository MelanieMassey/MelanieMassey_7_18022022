class Ingredient {
    constructor(ingredientName) {
        this.ingredientName = ingredientName
    }

    getIngDOM() {
        const ingredientLi = document.createElement("li")
        ingredientLi.textContent = this.ingredientName
        ingredientLi.className = "ingredientsLi"
        
        return ingredientLi
    }
}