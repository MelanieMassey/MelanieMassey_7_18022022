class Combobox {
    constructor(comboboxContent, comboboxValue) {
        this.comboboxContent = comboboxContent
        this.comboboxValue = comboboxValue
        this.comboboxName = comboboxValue[0].toUpperCase() + comboboxValue.substring(1)
        
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