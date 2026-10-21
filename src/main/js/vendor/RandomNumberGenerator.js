/**
 * Generates random number between min and max values. Default values are min=1 and max=10.
 */
export default class RandomNumberGenerator{

    min = 1;
    max = 10;

    /**
     * Default constructor
     */
    constructor() {
        // Nothing to do here
    }

    /**
     * Set max value.
     * 
     * @param {*} max 
     * @returns 
     */
    setMax(max) {
        return this.setMinMax(1, max);
    }

    /**
     * Set min and max values.
     * 
     * @param {*} min 
     * @param {*} max 
     * @returns 
     */
    setMinMax(min, max) {
        this.min = (min || min === 0 && min <= max) ? min : this.min;
        this.max = (max || max === 0 && max > min) ? max : this.max;

        return this;
    }

    /**
     * See 'https://stackoverflow.com/a/73925748' and 'https://stackoverflow.com/a/57954429'
     */
    random() {
        return this.min + (this.max - this.min + 1) * crypto.getRandomValues(new Uint32Array(1))[0] / 2**32 | 0;
    }
}
