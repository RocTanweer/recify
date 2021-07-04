class SearchView {
    #parentElement = document.querySelector('.main__wrapper');
    #form = document.querySelector('.top__wrapper-form');
    #data;
    #query;

    eventHandlerRecipes(handler) {
        this.#form.addEventListener('submit', function(e) {
            e.preventDefault();
            handler();
        })
    }
    
    getQuery() {
        const inputField = this.#form.querySelector('.input');
        const query = inputField.value;
        inputField.value = '';
        inputField.blur();
        return query
    }

    clear() {
        this.#parentElement.innerHTML = '';
    }

    render(data, query) {
        this.#data = data;
        this.#query = query;
        const markup = this.#generateMarkup();
        this.clear()
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderError() {
        this.clear();
        const markup = `
           <div class="message">
                <h2 class="message__heading">Whoops!</h2>
                <p class="message__content">${ this.#data === undefined ? " There seem to be a problem with your network connection" : this.#data?.length === 0 ? "We could not find any recipe for your query" : "There seem to be a problem with your network connection"}</p>
                ${this.#data?.length === 0 ? "" : `<button class="message__tryAgain">
                                                        Try Again
                                                    </button>`}
            </div>
        `
        this.#parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    #generateMarkup() {
        return `
            ${this.#data.map(rec => this.#generateArticleMarkup(rec)).join('')}
            
        `
    }

    #generateArticleMarkup(rec) {
        return `
            <article class="main__article">
                <div class="main__article-wrapper">
                    <div class="main__article-image">
                        <img src="${rec.image}" alt="pizza-image" loading="lazy">
                    </div>

                    <h2 class="main__article-title">
                        <a href="#${this.#query}/${rec.id}" class="main__article-link">
                            ${rec.title}
                        </a>
                    </h2>

                    <div class="main__article-details">
                        <span class="main__article-source">${rec.publisher}</span>
                    </div>
                </div>
            </article>
        `
    }
}

export default new SearchView();