class Tag {
    constructor(tagContent, type) {
        this.tag = tagContent
        this.type = type
    }

    getTagCard() {
        
        const li = document.createElement("li")
        li.className = this.type

        const span = document.createElement("span")
        span.textContent = this.tag

        const i = document.createElement("i")
        i.className = "fa-regular fa-circle-xmark"
        i.id = "close_" + this.tag
        
        li.appendChild(span)
        li.appendChild(i)
        // li.innerHTML += '<i class="fa-regular fa-circle-xmark"></i>'

        return li
    }
}