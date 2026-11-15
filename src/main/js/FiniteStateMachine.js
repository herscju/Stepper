/**
 * https://dev.to/alanlovesw3/creating-a-fsm-finite-state-machine-in-js-ep8
 */
export default class FiniteStateMachine {

    states = {};
    inputState = null;
    currentState = null;
    currentInput = "";

    options = {};

    /**
     * Constructor
     * 
     * @param {} options 
     */
    constructor(options = {}) {
        this.options = options;

        this.states = this.options.states || {
            "STATE_A": {
                "0": "STATE_B",
                "1": "STATE_A",
            },

            "STATE_B": {
                "0": "STATE_A",
                "1": "STATE_B",
                "accepts": true,
            },
        };

        this.inputState = this.options.inputState ? this.options.inputState : "STATE_A";
        this.currentState = this.inputState;
        this.currentInput = "";
    }

    /**
     * 
     * @returns 
     */
    isAccepting() {
        return !!this.states[this.currentState]?.accepts;
    }

    /**
     * 
     * @param {*} input 
     */
    transition(input) {
        try {
            this.currentInput = `${input}`;
            this.currentState = this.states[this.currentState][input]
        }
        catch (e) {
            throw new Error(`Invalid input ${this.currentInput}: or state does not exist: ${this.currentState}`);
        }
    }

    /**
     * 
     */
    reset() {
        this.currentState = this.inputState;
    }

    /**
     * 
     * @returns 
     */
    state() {
        return this.currentState;
    }

}
