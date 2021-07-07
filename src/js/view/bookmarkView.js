class BookmarkView {
    #bookmarkBtn = document.querySelector('.top__wrapper-bookmarks-btn');
    #bookmarkItems = document.querySelector('.top__wrapper-bookmarks-items');
    #bookmarkItem;
    #curData;
    #query;

    eventHandlerShowBookmarks(handler) {
        this.#bookmarkBtn.addEventListener('click', handler);
    }

    getAttribute() {
        return this.#bookmarkBtn.getAttribute('aria-expanded');
    }

    setAttribute(attr) {
        return this.#bookmarkBtn.setAttribute('aria-expanded', attr);
    }

    showBookmarks() {
        this.#bookmarkItems.classList.toggle('show');
    }


    addBookmarkToUI(data, query){
        this.#curData = data;
        this.#query = query;
        const markup = this.#createBookmarkForUI();
        this.#bookmarkItems.insertAdjacentHTML('afterbegin', markup);
    }

    removeBookmarkFromUI(bookmarks) {
        this.#bookmarkItem = document.querySelectorAll('.bookmarkItem');
        const found = bookmarks.some((item) => item.id === recipe.id);
        this.#bookmarkItem.forEach((recipe) => {
                if (!found) {
                        this.#bookmarkItems.removeChild(recipe)
                    }
                })
    }

    #createBookmarkForUI() {
        return `
            <li class="bookmarkItem">
                <div class="bookmarkItem-image">
                    <img src="${this.#curData.image}" alt="${this.#curData.title}">
                </div>

                <div class="bookmarkItem-content">
                    <a class="bookmarkItem-link" href="#/${this.#query}/${this.#curData.id}">
                        ${this.#curData.title}
                    </a>

                    <p class="bookmarkItem-publisher">
                        ${this.#curData.publisher}
                    </p>
                </div>
            </li>
        `
    }

}

export default new BookmarkView()