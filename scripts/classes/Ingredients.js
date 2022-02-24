class Ingredients {
    constructor(data) {
        this.ingredient = data.ingredient
        this.quantity = data.quantity
        this.unit = data.unit
    }

    getIngredientsCard() {
        const p = document.createElement("p")
        p.textContent = this.ingredient + ": " + this.quantity + this.unit
    }
}