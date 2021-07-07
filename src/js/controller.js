import '../sass/app.scss';

import * as Model from './model.js';

import detailedRecipeView from './view/detailedRecipeView.js';
import SearchView from './view/searchView.js';

import IntroView from './view/introView.js';

const searchResults = async function(query) {
    detailedRecipeView.renderSpinner();
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
            detailedRecipeView.renderSpinner();
            await Model.loadRecipe(id);
            // rendering markup using that data
            detailedRecipeView.render(Model.state.recipe);
            SearchView.addBackBtn()
        }
        if(query === Model.state.search.query) {
            SearchView.addForm();
            await searchResults(query)
        }
        if(query === "") {
            detailedRecipeView.renderSpinner();
            SearchView.addForm();
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

const controlAddBookmark = function() {
    if(Model.state.recipe.bookmarked){
        Model.loadRemoveBookmark(Model.state.recipe.id)
    }else{
        Model.loadAddBookmark(Model.state.recipe)
    }
    detailedRecipeView.render(Model.state.recipe);
}

const controlBackBtn = function(e) {
    history.back();
}

const init = function() {
    detailedRecipeView.eventHandlerRecipe(controlRecipe);
    detailedRecipeView.eventHandlerAddBookmark(controlAddBookmark)
    SearchView.eventHandlerRecipes(controlSearchResults);
    SearchView.eventHandlerBack(controlBackBtn);
}

init();

