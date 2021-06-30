import '../sass/app.scss';

const mainWrapper = document.querySelector('.main__wrapper');

// Demo Data
// const obj = {
//     "status": "success",
//     "data": {
//         "recipe": {
//             "publisher": "My Baking Addiction",
//             "ingredients": [{ "quantity": 1, "unit": "", "description": "tbsp. canola or olive oil" }, { "quantity": 0.5, "unit": "cup", "description": "chopped sweet onion" }, { "quantity": 3, "unit": "cups", "description": "diced fresh red yellow and green bell peppers" }, { "quantity": 1, "unit": "", "description": "tube refrigerated pizza dough" }, { "quantity": 0.5, "unit": "cup", "description": "salsa" }, { "quantity": 2, "unit": "cups", "description": "sargento chefstyle shredded pepper jack cheese" }, { "quantity": null, "unit": "", "description": "Chopped cilantro or dried oregano" }],
//             "source_url": "http://www.mybakingaddiction.com/spicy-chicken-and-pepper-jack-pizza-recipe/",
//             "image_url": "http://forkify-api.herokuapp.com/images/FlatBread21of1a180.jpg",
//             "title": "Spicy Chicken and Pepper Jack Pizza",
//             "servings": 4,
//             "cooking_time": 45,
//             "id": "5ed6604591c37cdc054bc886"
//         }
//     }
// }



const controlRecipe = async function () {
    try {
        // Getting recipe id from the url
        const id = location.hash.slice(1);
        if (!id) return;  // stop the function execution if no id is found
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

        const markup = `
            <div class="main__imageContainer">
                <h1 class="main__imageContainer-heading">
                    ${recipe.title}
                </h1>

                <div class="main__imageContainer-image">
                    <img src="${recipe.image}" alt="dish-image">
                </div>

                <div class="main__imageContainer-bottom">
                    <ul class="main__imageContainer-sideDetails">
                        <li class="main__imageContainer-sideDetail">
                            <i class="fas fa-clock"></i>
                            <time datetime="PT0H${recipe.cookingTime}M" class="time">${recipe.cookingTime} min</time>
                        </li>

                        <li class="main__imageContainer-sideDetail">
                            <i class="fas fa-user-friends"></i>
                            <span class="servings">${recipe.servings} servings</span>
                        </li>

                        <li class="main__imageContainer-sideDetail">
                            <button class="increaseServings">
                                <i class="fas fa-plus"></i>
                            </button>

                            <button class="decreaseServings">
                                <i class="fas fa-minus"></i>
                            </button>
                        </li>
                    </ul>

                    <div class="main__imageContainer-sideDetail">
                        <button class="bookmarkBtn"><i class="far fa-bookmark"></i></button>
                    </div>
                </div>
            </div>

            <div class="main__content">
                <h2 class="main__content-heading">
                    Ingredients
                </h2>

                <ul class="main__content-ingredient">
                    ${recipe.ingredients.map(ing => {
                        return `
                            <li class="item">
                                ${!ing.quantity ? '' : ing.quantity} ${ing.unit} ${ing.description}
                            </li>
                        `
                    }).join('')}
                </ul>

                <a href="${recipe.source}" class="main__content-moreInfo" target="_blank">
                    More Info
                </a>
            </div>
        `
        mainWrapper.innerHTML = '';

        mainWrapper.insertAdjacentHTML('afterbegin', markup);
    }
    catch (err) {
        console.error(err)
    }
}

const events = ['hashchange', 'load'];

events.forEach(ev => window.addEventListener(ev, controlRecipe));

// loading spinner
// https://codepen.io/_fbrz/pen/ljuJn