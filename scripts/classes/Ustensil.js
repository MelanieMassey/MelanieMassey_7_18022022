class Ustensil {
    constructor(ustensilName) {
        this.ustensilName = ustensilName
    }

    getUstensilDOM() {
        const ustensilLi = document.createElement("li")
        ustensilLi.textContent = this.ustensilName[0].toUpperCase() + this.ustensilName.substring(1).toLowerCase()
        ustensilLi.className = "ustensilsLi"
        
        return ustensilLi
    }
}