import introImage from '../../images/introIllustration.svg';

class IntroView {
    #parentElement = document.querySelector('.main__wrapper');

    render() {
        const markup = this.#generateMarkup();
        this.clean();
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    clean() {
        this.#parentElement.innerHTML = "";
    }

    #generateMarkup() {
        return `
            <div class="intro__image">
                <img src="${introImage}" alt="Woman-cooking-illustration">
            </div>

            <div class="intro__content">
                <h2 class="intro__content-heading">Hungry?</h2>
                <p class="intro__content-text">Grab yourself a new recipe..!</p>
            </div>
        `
    }
}

export default new IntroView()