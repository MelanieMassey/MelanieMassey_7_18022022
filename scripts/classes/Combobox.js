class Combobox {
    constructor(comboboxContent, comboboxValue) {
        this.comboboxContent = comboboxContent
        this.comboboxValue = comboboxValue
        this.comboboxName = comboboxValue[0].toUpperCase() + comboboxValue.substring(1)
        this.comboboxId = comboboxValue + "_button"
        
    }

    getComboboxCard(){
        const comboboxButton = document.createElement("div")
        comboboxButton.className = "filterButtons"
        comboboxButton.id = this.comboboxValue + "_button"

        const comboboxInput = document.createElement("input")
        comboboxInput.setAttribute("type", "text")
        comboboxInput.setAttribute("value", this.comboboxName)
        comboboxInput.setAttribute("onfocus", "this.value=''")
        comboboxInput.className = "filters"
        comboboxInput.id = "filter_" + this.comboboxValue
        comboboxButton.appendChild(comboboxInput)

        const iconUp = document.createElement("i")
        iconUp.classList.add("fas", "fa-chevron-up")
        iconUp.id = this.comboboxValue + "Up"
        iconUp.setAttribute("aria-hidden", "true")
        comboboxButton.appendChild(iconUp)

        const iconDown = document.createElement("i")
        iconDown.classList.add("fas", "fa-chevron-down")
        iconDown.id = this.comboboxValue + "Down"
        iconDown.setAttribute("aria-hidden", "true")
        comboboxButton.appendChild(iconDown)

        const comboboxList = document.createElement("ul")
        comboboxList.className = "filtersList"
        comboboxList.id = this.comboboxValue + "List"
        comboboxButton.appendChild(comboboxList)
        this.getComboboxContentCard(comboboxList)

        iconDown.addEventListener("click", () => {
            comboboxButton.style.width = "700px";
            comboboxList.style.display = "grid";
            iconDown.style.display = "none";
            iconUp.style.display = "block";
            
        })

        iconUp.addEventListener("click", () => {
            comboboxButton.style.width = "170px";
            comboboxList.style.display = "none";
            iconDown.style.display = "block";
            iconUp.style.display = "none";
        })

        

        return comboboxButton

    }

    getComboboxContentCard(comboboxList) {
        this.comboboxContent.forEach((keyword) => {
            const keywordLi = document.createElement("li")
            keywordLi.textContent = keyword
            keywordLi.className = this.comboboxValue + "Li"
        
            comboboxList.appendChild(keywordLi)
        })

        
    }

    
}