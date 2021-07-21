import GlobalView from "./gobalView.js";

class BookmarkView extends GlobalView{
    _bookmarkBtn = document.querySelector('.top__wrapper-bookmarks-btn');
    _bookmarkItems = document.querySelector('.top__wrapper-bookmarks-items');
    _curData;
    _query;

    eventHandlerShowBookmarks(handler) {
        this._bookmarkBtn.addEventListener('click', handler);
    }

    getAttribute() {
        return this._bookmarkBtn.getAttribute('aria-expanded');
    }

    setAttribute(attr) {
        return this._bookmarkBtn.setAttribute('aria-expanded', attr);
    }

    showBookmarks() {
        this._bookmarkItems.classList.toggle('show');
    }

    eventHandlerBookmarks(handler) {
        this._bookmarkItems.addEventListener('click', (e) => {
            const bookmarkItem = e.target.closest('.bookmarkItem');
            if(!bookmarkItem) return;
            handler()
        })
    }

    _clearBookmarkContainer() {
        const arrOfBookmarks = Array.from(this._bookmarkItems.querySelectorAll('.bookmarkItem'));
        const message = this._bookmarkItems.querySelector('.bookmark-message');
        arrOfBookmarks.length > 0 ? message.classList.add('hide') : message.classList.remove('hide')
    }

    addBookmarkToUI(data, query) {
        this._curData = data;
        this._query = query;
        const markup = this._createBookmarkForUI();
        this._bookmarkItems.insertAdjacentHTML('afterbegin', markup);
        this._clearBookmarkContainer();
    }

    removeBookmarkFromUI(bookmarks) {
        const bookmarkItems = this._bookmarkItems.querySelectorAll('.bookmarkItem');
        bookmarkItems.forEach(bookmark => {
            const id = bookmark.getAttribute('id');
            const found = bookmarks.some(item => item.id === id);
            if(!found) this._bookmarkItems.removeChild(bookmark)
        })
        this._clearBookmarkContainer();
    }

    _createBookmarkForUI() {
        return `
            <li class="bookmarkItem" id="${this._curData.id}">
                <div class="bookmarkItem-image">
                    <img src="${this._curData.image}" alt="${this._curData.title}">
                </div>

                <div class="bookmarkItem-content">
                    <a class="bookmarkItem-link" href="#/${this._query}/${this._curData.id}">
                        ${this._curData.title}
                    </a>

                    <p class="bookmarkItem-publisher">
                        ${this._curData.publisher}
                    </p>
                </div>
            </li>
        `
    }

}

export default new BookmarkView()