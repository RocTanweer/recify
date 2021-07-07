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
