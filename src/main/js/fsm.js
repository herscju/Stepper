import BaseMetronome from "./vendor/BaseMetronome.js"
import WorkerMetronome from "./vendor/WorkerMetronome.js"
import FiniteStateMachine from "./FiniteStateMachine.js"
import RandomNumberGenerator from "./vendor/RandomNumberGenerator.js"

const options = {
    "inputState": "OFF",
    "states": {
        "OFF": { "toggle": "ON" },
        "ON": { "toggle": "OFF", "accepts": true } // Optional: Treat "ON" as a valid end state
    }
}

let fsm = new FiniteStateMachine(options);
console.log("0 >>>" + fsm.state());
fsm.transition("toggle");
console.log("1 >>>" + fsm.state());
fsm.transition("toggle");
console.log("2 >>>" + fsm.state());
fsm.transition("toggle");
console.log("3 >>>" + fsm.state());
fsm.transition("toggle");
console.log("4 >>>" + fsm.state());


let metronome = new WorkerMetronome(60, 0, fsm, "toggle", "./../main/js/worker/MetronomeWorker.js");
metronome.update(2, 6);

const startBtn = document.getElementById('start');
startBtn.addEventListener('click', (evnt) => {

    evnt.preventDefault();

    metronome.start(BaseMetronome.START, (instance, counter) => {
        const text = `Instance ${instance} - Takt ${counter}: ${fsm.state() === "ON" ? "🟢 AN" : "🔴 AUS"}`;
        console.log(text);

        if (counter === 9) {
            metronome.tempo(960);
        }
    });
});

const stopBtn = document.getElementById('stop');
stopBtn.addEventListener('click', (evnt) => {

    evnt.preventDefault();

    metronome.stop(BaseMetronome.STOP, (instance, counter) => {
        const text = `Instance ${instance} - Takt ${counter}: ${fsm.state() === "ON" ? "🟢 AN" : "🔴 AUS"}`;
        console.log(text);
    });
});
