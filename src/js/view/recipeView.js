class RecipeView {
    #parentElement = document.querySelector('.main__wrapper');
    #data;

    render(data) {
        this.#data = data;
        const markup = this.#generateMarkup();
        this.clear();
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    clear() {
        this.#parentElement.innerHTML = '';
    } 

    eventHandlerRecipe(handler) {
        const events = ['hashchange', 'load'];
        events.forEach(env => window.addEventListener(env, handler))
    }

    renderError() {
        this.clear();
        const markup = `
           <div class="message">
                <h2 class="message__heading">Whoops!</h2>
                <p class="message__content">There seem to be a problem with your network connection</p>
                <button class="message__tryAgain">
                     Try Again
                </button>
            </div>
        `
        this.#parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    renderSpinner() {
        this.clear();
        const markup = `<div id="spinner"></div>`;
        this.#parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    #generateMarkup() {
        return `
            <div class="main__imageContainer">
                <h1 class="main__imageContainer-heading">
                    ${this.#data.title}
                </h1>

                <div class="main__imageContainer-image">
                    <img src="${this.#data.image}" alt="dish-image">
                </div>

                <div class="main__imageContainer-bottom">
                    <ul class="main__imageContainer-sideDetails">
                        <li class="main__imageContainer-sideDetail">
                            <i class="fas fa-clock"></i>
                            <time datetime="PT0H${this.#data.cookingTime}M" class="time">${this.#data.cookingTime} min</time>
                        </li>

                        <li class="main__imageContainer-sideDetail">
                            <i class="fas fa-user-friends"></i>
                            <span class="servings">${this.#data.servings} servings</span>
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
                    ${this.#data.ingredients.map(this.#generateIngMarkup).join('')}
                </ul>

                <a href="${this.#data.source}" class="main__content-moreInfo" target="_blank">
                    More Info
                </a>
            </div>
        `
    }

    #generateIngMarkup(ing) {
        return `
            <li class="item">
                ${!ing.quantity ? '' : ing.quantity} ${ing.unit} ${ing.description}
            </li>
        `
    }
}

export default new RecipeView()