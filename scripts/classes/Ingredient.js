class Ingredient {
    constructor(ingredientName) {
        this.ingredientName = ingredientName
    }

    getIngDOM() {
        const ingredientsLi = document.createElement("li")
        ingredientsLi.textContent = this.ingredientName
        
        return ingredientsLi
    }
}