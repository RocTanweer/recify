import '../sass/app.scss';

import * as Model from './model.js';

import RecipeView from './view/recipeView.js';
import SearchView from './view/searchView.js';

const controlRecipe = async function () {
    try {
        // Getting recipe id from the url
        const id = location.hash.slice(1);
        if (!id) return;  // stop the function execution if no id is found
        // making Ajax call and storing data in state object
        // showing loading spinner
        RecipeView.renderSpinner();
        await Model.loadRecipe(id); 
        // rendering markup using that data
        RecipeView.render(Model.state.recipe);
    }
    catch (err) {
        console.error(err)
        SearchView.renderError();
    }
}

const controlSearchResults = async function() {
   try{
       const query = SearchView.getQuery();
       if (!query) return;
       RecipeView.renderSpinner();
       await Model.loadSearchResults(query);
       SearchView.render(Model.state.search.recipes);
       if (Model.state.search.recipes.length === 0) throw new Error(`Invalid Input`)
   }
   catch(err) {
       console.error(err)
       SearchView.renderError();
   }
}

const init = function() {
    RecipeView.eventHandlerRecipe(controlRecipe);
    SearchView.eventHandlerRecipes(controlSearchResults);
}

init();

