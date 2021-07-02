class SearchView {
    #parentElement = document.querySelector('.main__wrapper');
    #form = document.querySelector('.top__wrapper-form');
    #data;

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

    render(data) {
        this.#data = data;
        const markup = this.#generateMarkup();
        this.clear()
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
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
                        <img src="${rec.image}" alt="pizza-image">
                    </div>

                    <h2 class="main__article-title">
                        <a href="#${rec.id}" class="main__article-link">
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