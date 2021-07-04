import '../sass/app.scss';

import * as Model from './model.js';

import RecipeView from './view/recipeView.js';
import SearchView from './view/searchView.js';

import IntroView from './view/introView.js';

const searchResults = async function(query) {
    RecipeView.renderSpinner();
    await Model.loadSearchResults(query);
    SearchView.render(Model.state.search.recipes, Model.state.search.query);
    if (Model.state.search.recipes.length === 0) throw new Error(`Invalid Input`)
}

const controlRecipe = async function () {
    try {
        // Getting recipe id from the url
        const query = location.hash.slice(2);
        const id = query.split('/')[1];
        if(id) {
            // making Ajax call and storing data in state object
            // showing loading spinner
            RecipeView.renderSpinner();
            await Model.loadRecipe(id);
            // rendering markup using that data
            RecipeView.render(Model.state.recipe);
        }
        if(query === Model.state.search.query) {
            await searchResults(query)
        }
        if(query === "") {
            RecipeView.renderSpinner();
            IntroView.render();
        }
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
       await searchResults(query);
       history.pushState({query : Model.state.search.query}, "", `#/${Model.state.search.query}`)
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

