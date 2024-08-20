// Function to fetch recipes from Spoonacular API
async function fetchRecipesFromSpoonacular(ingredientList) {
     const apiKey = '4a154b96d81d49faa2793dbda0e8b728'; // Replace 'YOUR_API_KEY' with your actual Spoonacular API key
    const ingredientQuery = ingredientList.join(',');
    const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientQuery}&apiKey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching recipes from Spoonacular:', error);
        return [];
    }
}

// Function to generate recipe cards
async function generateRecipeCards(ingredientList) {
    const recipeListDiv = document.getElementById('recipe-list');
    recipeListDiv.innerHTML = ''; // Clear previous results
    
    try {
        const recipes = await fetchRecipesFromSpoonacular(ingredientList);
        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');
            recipeCard.innerHTML = `
                <h3>${recipe.title}</h3>
                <p><strong>Missing Ingredients:</strong> ${recipe.missedIngredients.map(ingredient => ingredient.original).join(', ')}</p>
                <p><strong>Used Ingredients:</strong> ${recipe.usedIngredients.map(ingredient => ingredient.original).join(', ')}</p>
                <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            `;
            recipeListDiv.appendChild(recipeCard);
        });
    } catch (error) {
        console.error('Error generating recipe cards:', error);
    }
}

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    const ingredientsInput = document.getElementById('ingredients').value;
    const ingredientList = ingredientsInput.split(',').map(ingredient => ingredient.trim());
    generateRecipeCards(ingredientList);
}

// Add event listener to the form submission
const form = document.getElementById('ingredient-form');
form.addEventListener('submit', handleFormSubmit);
