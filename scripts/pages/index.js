// *** Récupération des données recettes et les rendres exploitables *** \\
async function getRecipes() {
    const result = await fetch ("data/recipes.json")
    const recipes = await result.json()
    return recipes
}

// *** Event listeners input de recherche *** \\
function getInputValue() {
    
    const input = document.getElementById("searchZone_Input");
    let inputValue = "";
    console.log(inputValue);
    input.addEventListener("change", () => {
        inputValue = input.value.toLowerCase();
        return inputValue;
    })
    
}


// *** Affichage des recettes via la méthode display() de la class Search *** \\
// * J'appelle la fonction getRecipes, quand elle est appelée alors je fais la suite
getRecipes().then((recipes) => {
    const input = document.getElementById("searchZone_Input");
    let inputValue = "";
    
    const display = new Search(recipes);
    display.display(inputValue);

    input.addEventListener("change", () => {
        inputValue = input.value.toLowerCase();
        const display = new Search(recipes);
        display.display(inputValue);
    })
});



// *** Event listeners des filtres *** \\
// > Event listener click du filtre ingrédient
const ingredientsButton = document.getElementById("ingredients_button");
const ingredientsDown = document.getElementById("ingredientsDown");
const ingredientsUp = document.getElementById("ingredientsUp");
const ingredientsList = document.getElementById("ingredientsList");

function displayIngDown() {
    ingredientsButton.style.width = "700px";
    ingredientsList.style.display = "grid";
    ingredientsDown.style.display = "none";
    ingredientsUp.style.display = "block";
    displayAppUp();
    displayUstUp();
}
ingredientsButton.addEventListener("click", displayIngDown);

function displayIngUp() {
    ingredientsButton.style.width = "170px";
    ingredientsList.style.display = "none";
    ingredientsDown.style.display = "block";
    ingredientsUp.style.display = "none";
}
ingredientsUp.addEventListener("click", displayIngUp);

// > Event listener click du filtre appareils
const applianceButton = document.getElementById("appliances_button");
const applianceDown = document.getElementById("appliancesDown");
const applianceUp = document.getElementById("appliancesUp");
const applianceList = document.getElementById("appliancesList")

function displayAppDown() {
    applianceButton.style.width = "400px";
    applianceList.style.display = "grid";
    applianceDown.style.display = "none";
    applianceUp.style.display = "block";
    displayIngUp();
    displayUstUp();
}
applianceButton.addEventListener("click", displayAppDown);

function displayAppUp() {
    applianceButton.style.width = "170px";
    applianceList.style.display = "none";
    applianceDown.style.display = "block";
    applianceUp.style.display = "none";
}
applianceUp.addEventListener("click", displayAppUp);

// > Event listener click du filtre ustensils
const ustensilsButton = document.getElementById("ustensils_button");
const ustensilsDown = document.getElementById("ustensilsDown");
const ustensilsUp = document.getElementById("ustensilsUp");
const ustensilsList = document.getElementById("ustensilsList");

function displayUstDown() {
    ustensilsButton.style.width = "500px";
    ustensilsList.style.display = "grid";
    ustensilsDown.style.display = "none";
    ustensilsUp.style.display = "block";
    displayIngUp();
    displayAppUp();
}
ustensilsButton.addEventListener("click", displayUstDown);

function displayUstUp() {
    ustensilsButton.style.width = "170px";
    ustensilsList.style.display = "none";
    ustensilsDown.style.display = "block";
    ustensilsUp.style.display = "none";
}
ustensilsUp.addEventListener("click", displayUstUp);
