import {API_URL} from './config.js';
import {getJSON} from './helpers.js'

export const state = {
    recipe:  {},
    search : {
        query : undefined,
        numOfRecipes : 0,
        recipes : []
    },
    bookmarks : [],
}

export const loadRecipe = async function(id) {
   try {
        const data = await getJSON(`${API_URL}${id}`);    
        let { recipe } = data.data;  // modifying the data format into camelCase
        recipe = {
           cookingTime: recipe.cooking_time,
           id: recipe.id,
           image: recipe.image_url,
           ingredients: recipe.ingredients,
           publisher: recipe.publisher,
           servings: recipe.servings,
           source: recipe.source_url,
           title: recipe.title
       }

       const found = state.bookmarks.some((item) => item.id === recipe.id);
       found ? recipe.bookmarked = true : recipe.bookmarked = false;

       state.recipe = recipe;
   }
   catch(err) {
       console.error(err)
   }
}

export const loadSearchResults = async function(query) {
    try{
        const data = await getJSON(`${API_URL}?search=${query}`);
        state.search.query = query;
        state.search.numOfRecipes = data.results;
        let {recipes} = data.data;

        recipes = recipes.map(recipe => {
            return {
                publisher : recipe.publisher,
                image : recipe.image_url,
                title : recipe.title,
                id : recipe.id
            }
        })

        state.search.recipes = recipes;
    }
    catch(err) {
        throw err
    }
}

export const loadAddBookmark = function(recipe) {
    if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;

    state.bookmarks.push(state.recipe);
}

export const loadRemoveBookmark = function(id) {
    if (id === state.recipe.id) state.recipe.bookmarked = false;

    const index = state.bookmarks.findIndex((recipe) => recipe.id === id);
    state.bookmarks.splice(index, 1)
}

export const loadServings = function(newServings) {
    const servings = state.recipe.servings;

    state.recipe.ingredients = state.recipe.ingredients.map(ing => {
        return {
            quantity: (ing.quantity / servings) * newServings,
            unit : ing.unit,
            description : ing.description
        }
    })

    state.recipe.servings = newServings;
}
