class BookmarkView {
    #bookmarkBtn = document.querySelector('.top__wrapper-bookmarks-btn');
    #bookmarkItems = document.querySelector('.top__wrapper-bookmarks-items');
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

    eventHandlerBookmarks(handler) {
        this.#bookmarkItems.addEventListener('click', (e) => {
            const bookmarkItem = e.target.closest('.bookmarkItem');
            if(!bookmarkItem) return;
            handler()
        })
    }

    #clearBookmarkContainer() {
        const arrOfBookmarks = Array.from(this.#bookmarkItems.querySelectorAll('.bookmarkItem'));
        const message = this.#bookmarkItems.querySelector('.bookmark-message');
        arrOfBookmarks.length > 0 ? message.classList.add('hide') : message.classList.remove('hide')
    }

    addBookmarkToUI(data, query) {
        this.#curData = data;
        this.#query = query;
        const markup = this.#createBookmarkForUI();
        this.#bookmarkItems.insertAdjacentHTML('afterbegin', markup);
        this.#clearBookmarkContainer();
    }

    removeBookmarkFromUI(bookmarks) {
        const bookmarkItems = this.#bookmarkItems.querySelectorAll('.bookmarkItem');
        bookmarkItems.forEach(bookmark => {
            const id = bookmark.getAttribute('id');
            const found = bookmarks.some(item => item.id === id);
            if(!found) this.#bookmarkItems.removeChild(bookmark)
        })
        this.#clearBookmarkContainer();
    }

    #createBookmarkForUI() {
        return `
            <li class="bookmarkItem" id="${this.#curData.id}">
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