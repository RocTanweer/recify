class detailedRecipeView {
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

    eventHandlerAddBookmark(handler) {
        this.#parentElement.addEventListener('click', (e) => {
            const bookmarkBtn = e.target.closest('.bookmarkBtn');
            if(!bookmarkBtn) return
            handler();
        })
    }

    eventHandlerServings(handler) {
        this.#parentElement.addEventListener('click', (e) => {
            const updateServingsBtn = e.target.closest('.updateServings');
            if(!updateServingsBtn) return
            const {servings} = updateServingsBtn.dataset;
            if (+servings > 0) handler(+servings);
        })
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
                    <img src="${this.#data.image}" alt="${this.#data.title}" loading="lazy">
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
                            <button class="increaseServings updateServings" data-servings="${this.#data.servings + 1}">
                                <i class="fas fa-plus"></i>
                            </button>

                            <button class="decreaseServings updateServings" data-servings="${this.#data.servings - 1}">
                                <i class="fas fa-minus"></i>
                            </button>
                        </li>
                    </ul>

                    <div class="main__imageContainer-sideDetail">
                        <button class="bookmarkBtn"><i class="fa${this.#data.bookmarked === true ? 's' : 'r'} fa-bookmark"></i></button>
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

export default new detailedRecipeView()