/**
 * Base metronome, with no timing.
 * More like a "click on command" class.
 */
export default class BaseMetronome {

    static START = 1;
    static TICK = 2;
    static STOP = 3;

    tempo = 0;
    counter = 0;
    playing = false;

    onTick = 10;
    offTick = 5;
    totalTicks = 0;

    /**
     * 
     */
    constructor(tempo = 60, counter = 0) {
        this.tempo = tempo;
        this.counter = counter
        this.playing = false;
    }

    /**
     * 
     */
    init() {
        // Nothing to do here

        return this;
    }

    /**
     * 
     */
    click(instance, callback) {

        if (instance && callback) {
            //console.log("Run callback function with instance '" + instance + "'.");
            switch (instance) {
                case BaseMetronome.START:
                    callback(instance, this.counter++);
                    break;

                case BaseMetronome.TICK:
                    console.log("Tick " + Date.now());

                case BaseMetronome.STOP:
                    callback(instance, this.counter);
                    break;
            }
        } else {
            console.error("No callback function available!");
        }

        return this;
    }

    /**
     * 
     * @param {*} time 
     * @returns 
     */
    clickAtTime(time) {
        console.log("Method 'clickAtTime': time = '" + time + "'");

        return this;
    }

    /**
     * 
     * @param {*} callback 
     * @returns 
     */
    start(instance, callback) {
        this.playing = true;

        return this.init();
    }

    /**
     * 
     * @param {*} callback 
     * @returns 
     */
    stop(instance, callback) {
        this.playing = false;

        return this;
    }

    /**
     * 
     * @param {*} onTick 
     * @param {*} offTick 
     */
    update(onTick, offTick) {
        this.onTick = onTick; // m Takte
        this.offTick = offTick; // n Takte
        this.totalTicks = this.onTick + this.offTick;

        // Sicherheitsnetz: Falls der aktuelle Takt durch die Änderung 
        // außerhalb des neuen Gesamtzyklus liegt, setzen wir ihn zurück.
        if (this.currentTick >= this.totalTicks) {
            this.currentTick = 0;
        }
    }
}