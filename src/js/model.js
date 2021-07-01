import {API_URL} from './config.js';
import {getJSON} from './helpers.js'

export const state = {
    recipe:  {},
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