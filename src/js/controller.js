import '../sass/app.scss';

import * as Model from './model.js';

import detailedRecipeView from './view/detailedRecipeView.js';
import SearchView from './view/searchView.js';

import IntroView from './view/introView.js';

import BookmarkView from './view/bookmarkView.js';

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

const controlServings = function(servings) {
    Model.loadServings(servings);
    detailedRecipeView.render(Model.state.recipe);
}

const controlAddBookmark = function() {
    if(Model.state.recipe.bookmarked){
        Model.loadRemoveBookmark(Model.state.recipe.id);
        console.log(Model.state.bookmarks)
        BookmarkView.removeBookmarkFromUI(Model.state.bookmarks);
    }else{
        Model.loadAddBookmark(Model.state.recipe)
        BookmarkView.addBookmarkToUI(Model.state.recipe, Model.state.search.query);
    }
    detailedRecipeView.render(Model.state.recipe);
}

const controlShowBookmark = function() {
    const ariaExpanded = BookmarkView.getAttribute();
    ariaExpanded === 'true' ? BookmarkView.setAttribute(false) : BookmarkView.setAttribute(true);
    BookmarkView.showBookmarks();
}

const controlClosingBookmarks = function() {
    controlShowBookmark();
}

const controlBackBtn = function(e) {
    history.back();
}

const init = function() {
    detailedRecipeView.eventHandlerRecipe(controlRecipe);
    detailedRecipeView.eventHandlerAddBookmark(controlAddBookmark)
    detailedRecipeView.eventHandlerServings(controlServings);
    SearchView.eventHandlerRecipes(controlSearchResults);
    SearchView.eventHandlerBack(controlBackBtn);
    BookmarkView.eventHandlerShowBookmarks(controlShowBookmark);
    BookmarkView.eventHandlerBookmarks(controlClosingBookmarks)
}

init();

