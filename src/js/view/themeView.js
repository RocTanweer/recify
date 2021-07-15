import GlobalView from "./gobalView.js";

class ThemeView extends GlobalView {
    _themeToggleBtn = document.querySelector('.header__wrapper-cta-theme');
    _themeToggleIcon = document.querySelector('.header__wrapper-cta-theme .far')
    _mainLogo = document.querySelectorAll('.header__wrapper-logo img');
    _body = document.querySelector('body');

    eventHandlerTheme(handler) {
        this._themeToggleBtn.addEventListener('click',handler);
    }

    getThemeLS() {
        const theme = localStorage.getItem('recify.theme') || '';
        this._body.setAttribute('class', theme);
        
    }

    setThemeLS() {
        this._body.classList.contains('dark') ? this._body.className = '' : this._body.className = 'dark';
        localStorage.setItem('recify.theme', this._body.className);
    }
}

export default new ThemeView();