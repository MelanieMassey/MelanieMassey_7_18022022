class Ingredients {
    constructor(data) {
        this.ingredient = data.ingredient
    }

    getIngredientToFilter() {
        const li = document.createElement("li")
        li.textContent = this.ingredient
    }
}