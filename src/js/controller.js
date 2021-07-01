import '../sass/app.scss';

import * as Model from './model.js';

import RecipeView from './view/recipeView.js';

const controlRecipe = async function () {
    try {
        // Getting recipe id from the url
        const id = location.hash.slice(1);
        if (!id) return;  // stop the function execution if no id is found
        // making Ajax call and storing data in state object
        await Model.loadRecipe(id); 
        // rendering markup using that data
        RecipeView.render(Model.state.recipe);
    }
    catch (err) {
        console.error(err)
    }
}

const events = ['hashchange', 'load'];

events.forEach(ev => window.addEventListener(ev, controlRecipe));