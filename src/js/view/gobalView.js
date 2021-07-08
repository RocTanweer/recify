export default class GlobalView {

    update(data) {
        this._data = data;
        const markup = this._generateMarkup();
        const currentElements = Array.from(this._parentElement.querySelectorAll('*'));
        const newDOM = document.createRange().createContextualFragment(markup);
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        console.log(currentElements)
        console.log(newElements)
    }

    clear() {
        this._parentElement.innerHTML = '';
    }

    renderSpinner() {
        this.clear();
        const markup = `<div id="spinner"></div>`;
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    renderError() {
        this.clear();
        const markup = `
           <div class="message">
                <h2 class="message__heading">Whoops!</h2>
                <p class="message__content">${this._data === undefined ? " There seem to be a problem with your network connection" : this._data?.length === 0 ? "We could not find any recipe for your query" : "There seem to be a problem with your network connection"}</p>
                ${this._data?.length === 0 ? "" : `<button class="message__tryAgain">
                                                        Try Again
                                                    </button>`}
            </div>
        `
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }
}