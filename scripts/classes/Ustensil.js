class Ustensil {
    constructor(ustensilName) {
        this.ustensilName = ustensilName
    }

    getUstensilDOM() {
        const ustensilLi = document.createElement("li")
        ustensilLi.textContent = this.ustensilName
        
        return ustensilLi
    }
}