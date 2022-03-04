class Appliance {
    constructor(applianceName) {
        this.applianceName = applianceName
    }

    getApplianceDOM() {
        const applianceLi = document.createElement("li")
        applianceLi.textContent = this.applianceName
        
        return applianceLi
    }
}