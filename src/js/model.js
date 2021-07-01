export const state = {
    recipe:  {},
}

export const loadRecipe = async function(id) {
   try {
       // Storing the resolved value of this promise in res
       const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
       // converting that value into json format
       const data = await res.json();
       // Even 400 is a resolved Promise but we need to throw error when that happens to make it a rejected one
       if (!res.ok) throw new Error(`${data.message} (${res.status})`)  // will be catched in catch block
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