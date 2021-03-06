import '../sass/app.scss';

import * as Model from './model.js';

import DetailedRecipeView from './view/detailedRecipeView.js';
import SearchView from './view/searchView.js';

import IntroView from './view/introView.js';

import BookmarkView from './view/bookmarkView.js';

import ThemeView from './view/themeView.js';
import themeView from './view/themeView.js';

const searchResults = async function(query) {
    SearchView.renderSpinner();
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
            DetailedRecipeView.renderSpinner();
            await Model.loadRecipe(id);
            // rendering markup using that data
            DetailedRecipeView.render(Model.state.recipe);
            SearchView.addBackBtn()
        }
        if(query === Model.state.search.query) {
            SearchView.addForm();
            await searchResults(query)
        }
        if(query === "") {
            IntroView.renderSpinner();
            SearchView.addForm();
            IntroView.render();
        }
    }
    catch (err) {
        console.error(err)
        DetailedRecipeView.renderError();
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
       SearchView.renderError();
   }
}

const controlServings = function(servings) {
    Model.loadServings(servings);
    DetailedRecipeView.render(Model.state.recipe);
}

const controlAddBookmark = function() {
    if(Model.state.recipe.bookmarked){
        Model.loadRemoveBookmark(Model.state.recipe.id);
        BookmarkView.removeBookmarkFromUI(Model.state.bookmarks);
    }else{
        Model.loadAddBookmark(Model.state.recipe)
        BookmarkView.addBookmarkToUI(Model.state.recipe, Model.state.search.query);
    }
    DetailedRecipeView.render(Model.state.recipe);
}

const controlShowBookmark = function() {
    const ariaExpanded = BookmarkView.getAttribute();
    ariaExpanded === 'true' ? BookmarkView.setAttribute(false) : BookmarkView.setAttribute(true);
    BookmarkView.showBookmarks();
}

const controlFetchBookmarksLS = function() {
    Model.state.bookmarks.forEach((bookmark) => {
        BookmarkView.addBookmarkToUI(bookmark, 'bookmarks');
    })
}

const controlClosingBookmarks = function() {
    controlShowBookmark();
}

const controlBackBtn = function() {
    history.back();
}

const controlToTop = function() {
    DetailedRecipeView.scrollTo();
}

const controlTheme = function(e) {
    themeView.setThemeLS();
}

const init = function() {
    DetailedRecipeView.eventHandlerRecipe(controlRecipe);
    DetailedRecipeView.eventHandlerAddBookmark(controlAddBookmark)
    DetailedRecipeView.eventHandlerServings(controlServings);
    DetailedRecipeView.eventHandlerToTop(controlToTop);
    SearchView.eventHandlerRecipes(controlSearchResults);
    SearchView.eventHandlerBack(controlBackBtn);
    BookmarkView.eventHandlerShowBookmarks(controlShowBookmark);
    BookmarkView.eventHandlerBookmarks(controlClosingBookmarks);
    ThemeView.eventHandlerTheme(controlTheme);
    controlFetchBookmarksLS();
    DetailedRecipeView.targetObserver();
    ThemeView.getThemeLS();
}

init();

