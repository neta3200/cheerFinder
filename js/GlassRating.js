class GlassRating extends HTMLElement {
    get value () {
        return this.getAttribute('value') || 0;
    }

    set value (val) {
        this.setAttribute('value', val);
        this.highlight(this.value - 1);
    }

    get number () {
        return this.getAttribute('number') || 5;
    }

    set number (val) {
        this.setAttribute('number', val);

        this.glasses = [];

        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }

        for (let i = 0; i < this.number; i++) {
            let s = document.createElement('div');
            s.className = 'glass';
            this.appendChild(s);
            this.glasses.push(s);
        }

        this.value = this.value;
    }

    highlight (index) {
        this.glasses.forEach((glass, i) => {
            glass.classList.toggle('full', i <= index);
        });
    }

    constructor () {
        super();

        this.number = this.number;

        this.addEventListener('mousemove', e => {
            let box = this.getBoundingClientRect(),
                glassIndex = Math.floor((e.pageX - box.left) / box.width * this.glasses.length);

            this.highlight(glassIndex);
        });

        this.addEventListener('mouseout', () => {
            this.value = this.value;
        });

        this.addEventListener('click', e => {
            let box = this.getBoundingClientRect(),
                glassIndex = Math.floor((e.pageX - box.left) / box.width * this.glasses.length);

            this.value = glassIndex + 1;

            let rateEvent = new Event('rate');
            this.dispatchEvent(rateEvent);
        });
    }
}

customElements.define('x-glass-rating', GlassRating);
