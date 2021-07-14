import GlobalView from "./gobalView.js";

class ThemeView extends GlobalView {
    _themeToggleBtn = document.querySelector('.header__wrapper-cta-theme');
    _themeToggleIcon = document.querySelector('.header__wrapper-cta-theme .far')
    _mainLogo = document.querySelectorAll('.header__wrapper-logo img');
    _body = document.querySelector('body');

    eventHandlerTheme(handler) {
        this._themeToggleBtn.addEventListener('click',handler);
    }

    toggleTheme() {
        this._body.classList.toggle('dark');
    }

    toggleThemeIcon() {
        if(this._themeToggleIcon.classList.contains('fa-moon')) {
            this._themeToggleIcon.classList.remove('fa-moon')
            this._themeToggleIcon.classList.add('fa-sun')
        }else{
            this._themeToggleIcon.classList.add('fa-moon')
            this._themeToggleIcon.classList.remove('fa-sun')
        }
    }

    toggleThemeLogo() {
        this._mainLogo.forEach(logo => {
            logo.classList.toggle('hide');
        })
    }
}

export default new ThemeView();