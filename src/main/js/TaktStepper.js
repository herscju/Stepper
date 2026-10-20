/**
 * 
 */
export default class TaktStepper {

    onTick = 0;
    offTick = 0;
    totalTicks = 0;
    currentTick = 0;
    numberOfTicks = 0;

    /**
     * 
     * @param onTick 
     * @param offTick 
     */
    constructor(onTick, offTick) {
        this.update(onTick, offTick);
        this.currentTick = 0;
        this.numberOfTicks = 0;
    }

    /**
     * 
     * @returns 
     */
    getNumberOfTicks() {
        return this.numberOfTicks;
    }

    /**
     * Ermöglicht das Ändern von m und n zur Laufzeit
     * @param newOn 
     * @param newOff 
     */
    update(newOn, newOff) {
        this.onTick = newOn;     // m Takte
        this.offTick = newOff;   // n Takte
        this.totalTicks = newOn + newOff;

        // Sicherheitsnetz: Falls der aktuelle Takt durch die Änderung 
        // außerhalb des neuen Gesamtzyklus liegt, setzen wir ihn zurück.
        if (this.currentTick >= this.totalTicks) {
            this.currentTick = 0;
        }
    }


    /**
     * Diese Methode wird bei jedem Takt aufgerufen
     */
    tick() {
        // Bestimmt, ob der aktuelle Takt im "An"-Bereich liegt
        const isOn = this.currentTick < this.onTick;

        // Takt hochzählen und beim Erreichen des Gesamtzyklus zurücksetzen
        this.currentTick = (this.currentTick + 1) % this.totalTicks;

        // Anzahl ticks hochzählen
        this.numberOfTicks++;

        return isOn;
    }

    /**
     * Setzt den Stepper wieder auf den Startzustand zurück
     */
    reset() {
        this.currentTick = 0;

        return false;
    }
}

