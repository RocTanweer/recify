import '../sass/app.scss';

const controlRecipe = async function() {
    try {
        // Getting recipe id from the url
        const id = location.hash.slice(1);
        if(!id) return;  // stop the function execution if no id is found
        // Storing the resolved value of this promise in res
        const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
        // converting that value into json format
        const data = await res.json();
        // Even 400 is a resolved Promise but we need to throw error when that happens to make it a rejected one
        if (!res.ok) throw new Error(`${data.message} (${res.status})`)  // will be catched in catch block
        let {recipe} = data.data;  // modifying the data format into camelCase
        recipe = {
            cookingTime : recipe.cooking_time,
            id : recipe.id,
            image : recipe.image_url,
            ingredients : recipe.ingredients,
            publisher : recipe.publisher,
            servings : recipe.servings,
            source : recipe.source_url,
            title : recipe.title
        }   
        console.log(recipe)

    }
    catch(err) {
        console.error(err)
    }
}

const events = ['hashchange', 'load'];

events.forEach(ev => window.addEventListener(ev, controlRecipe));