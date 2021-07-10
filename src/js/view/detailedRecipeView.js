import GlobalView from "./gobalView.js";   
const fracty = require('fracty');

class DetailedRecipeView extends GlobalView{
    _parentElement = document.querySelector('.main__wrapper');
    _data;

    render(data) {
        this._data = data;
        const markup = this._generateMarkup();
        this.clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    eventHandlerRecipe(handler) {
        const events = ['hashchange', 'load'];
        events.forEach(env => window.addEventListener(env, handler))
    }

    eventHandlerAddBookmark(handler) {
        this._parentElement.addEventListener('click', (e) => {
            const bookmarkBtn = e.target.closest('.bookmarkBtn');
            if(!bookmarkBtn) return
            handler();
        })
    }

    eventHandlerServings(handler) {
        this._parentElement.addEventListener('click', (e) => {
            const updateServingsBtn = e.target.closest('.updateServings');
            if(!updateServingsBtn) return
            const {servings} = updateServingsBtn.dataset;
            if (+servings > 0) handler(+servings);
        })
    }

    _generateMarkup() {
        return `
            <div class="main__imageContainer">
                <h1 class="main__imageContainer-heading">
                    ${this._data.title}
                </h1>

                <div class="main__imageContainer-image">
                    <img src="${this._data.image}" alt="${this._data.title}" loading="lazy">
                </div>

                <div class="main__imageContainer-bottom">
                    <ul class="main__imageContainer-sideDetails">
                        <li class="main__imageContainer-sideDetail">
                            <i class="fas fa-clock"></i>
                            <time datetime="PT0H${this._data.cookingTime}M" class="time">${this._data.cookingTime} min</time>
                        </li>

                        <li class="main__imageContainer-sideDetail">
                            <i class="fas fa-user-friends"></i>
                            <span class="servings">${this._data.servings} servings</span>
                        </li>

                        <li class="main__imageContainer-sideDetail">
                            <button class="increaseServings updateServings" data-servings="${this._data.servings + 1}">
                                <i class="fas fa-plus"></i>
                            </button>

                            <button class="decreaseServings updateServings" data-servings="${this._data.servings - 1}">
                                <i class="fas fa-minus"></i>
                            </button>
                        </li>
                    </ul>

                    <div class="main__imageContainer-sideDetail">
                        <button class="bookmarkBtn"><i class="fa${this._data.bookmarked === true ? 's' : 'r'} fa-bookmark"></i></button>
                    </div>
                </div>
            </div>

            <div class="main__content">
                <h2 class="main__content-heading">
                    Ingredients
                </h2>

                <ul class="main__content-ingredient">
                    ${this._data.ingredients.map(this._generateIngMarkup).join('')}
                </ul>

                <a href="${this._data.source}" class="main__content-moreInfo" target="_blank">
                    More Info
                </a>
            </div>
        `
    }

    _generateIngMarkup(ing) {
        return `
            <li class="item">
                ${!ing.quantity ? '' : fracty(ing.quantity)} ${ing.unit} ${ing.description}
            </li>
        `
    }
}

export default new DetailedRecipeView()