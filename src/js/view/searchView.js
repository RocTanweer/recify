import GlobalView from "./gobalView.js";

class SearchView extends GlobalView{
    _parentElement = document.querySelector('.main__wrapper');
    _form = document.querySelector('.top__wrapper-form');
    _backBtn = document.querySelector('.top__backBtn');
    _data;
    _query;

    eventHandlerRecipes(handler) {
        this._form.addEventListener('submit', function(e) {
            e.preventDefault();
            handler();
        })
    }

    eventHandlerBack(handler) {
        this._backBtn.addEventListener('click', handler);
    }
    
    getQuery() {
        const inputField = this._form.querySelector('.input');
        const query = inputField.value;
        inputField.value = '';
        inputField.blur();
        return query
    }

    addForm() {
        this._form.style.display = 'inherit';
        this._backBtn.style.display = 'none';
    }

    addBackBtn() {
        this._form.style.display = 'none';
        this._backBtn.style.display = 'inherit';
    }

    render(data, query) {
        this._data = data;
        this._query = query;
        const markup = this._generateMarkup();
        this.clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    _generateMarkup() {
        return `
            ${this._data.map(rec => this._generateArticleMarkup(rec)).join('')}
            
        `
    }

    _generateArticleMarkup(rec) {
        return `
            <article class="main__article">
                <div class="main__article-wrapper">
                    <div class="main__article-image">
                        <img src="${rec.image}" alt="${rec.title}" loading="lazy">
                    </div>

                    <h2 class="main__article-title">
                        <a href="#/${this._query}/${rec.id}" class="main__article-link">
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