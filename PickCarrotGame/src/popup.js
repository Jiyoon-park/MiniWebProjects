'use strict';

export default class PopUp {
    constructor() {
        this.popUp = document.querySelector('.pop-up');
        this.popUpText = this.popUp.querySelector('.pop-up__message');
        this.popUpreDo = this.popUp.querySelector('.pop-up__redo');

        this.popUpreDo.addEventListener('click', ()=> {
            this.onClick && this.onClick();
            this.hide();
        })
    }
    setClickListener(onClick) {
        this.onClick = onClick;
    }

    hide() {
        this.popUp.classList.add('pop-up--hide');
    }

    showWithText(text) {
        this.popUp.classList.remove('pop-up--hide');
        this.popUpText.innerText = text;
    }

}