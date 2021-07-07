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

    console.log(state.recipe)
    console.log(state.bookmarks)
}

export const loadRemoveBookmark = function(id) {
    if (id === state.recipe.id) state.recipe.bookmarked = false;

    const index = state.bookmarks.findIndex((recipe) => recipe.id === id);
    state.bookmarks.splice(index, 1)

    console.log(state.recipe)
    console.log(state.bookmarks)
}
