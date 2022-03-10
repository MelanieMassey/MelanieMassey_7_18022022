class Tag {
    constructor(tagElement) {
        this.tag = tagElement // = l'élément li du tag sélectionné
    }

    getTagCard() {
        const li = this.tag

        li.innerHTML += '<i class="fa-regular fa-circle-xmark"></i>'
        
        return li
    }
}