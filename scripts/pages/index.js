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
    // input.addEventListener("focusout", () => {
    //     input.value = "Rechercher une recette";
    // })
});



// *** Event listeners des filtres *** \\
// > Event listener click du filtre ingrédient
const ingredientsButton = document.getElementById("ingredients_button");
const ingredientsInput = document.getElementById("filter_ingredients");
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
ingredientsInput.addEventListener("click", displayIngDown);
ingredientsDown.addEventListener("click", displayIngDown);

function displayIngUp() {
    ingredientsButton.style.width = "170px";
    ingredientsList.style.display = "none";
    ingredientsDown.style.display = "block";
    ingredientsUp.style.display = "none";
}
//ingredientsInput.addEventListener("focusout", displayIngUp);
ingredientsUp.addEventListener("click", displayIngUp);

// > Event listener click du filtre appareils
const appliancesButton = document.getElementById("appliances_button");
const appliancesInput = document.getElementById("filter_appliances");
const appliancesDown = document.getElementById("appliancesDown");
const appliancesUp = document.getElementById("appliancesUp");
const appliancesList = document.getElementById("appliancesList")

function displayAppDown() {
    appliancesButton.style.width = "400px";
    appliancesList.style.display = "grid";
    appliancesDown.style.display = "none";
    appliancesUp.style.display = "block";
    displayIngUp();
    displayUstUp();
}
appliancesInput.addEventListener("click", displayAppDown);
appliancesDown.addEventListener("click", displayAppDown);

function displayAppUp() {
    appliancesButton.style.width = "170px";
    appliancesList.style.display = "none";
    appliancesDown.style.display = "block";
    appliancesUp.style.display = "none";
}
//appliancesInput.addEventListener("focusout", displayAppUp);
appliancesUp.addEventListener("click", displayAppUp);

// > Event listener click du filtre ustensils
const ustensilsButton = document.getElementById("ustensils_button");
const ustensilsInput = document.getElementById("filter_ustensils");
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
ustensilsInput.addEventListener("click", displayUstDown);
ustensilsDown.addEventListener("click", displayUstDown);

function displayUstUp() {
    ustensilsButton.style.width = "170px";
    ustensilsList.style.display = "none";
    ustensilsDown.style.display = "block";
    ustensilsUp.style.display = "none";
}
//ustensilsInput.addEventListener("focusout", displayUstUp);
ustensilsUp.addEventListener("click", displayUstUp);
