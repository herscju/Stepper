import RandomNumberGenerator from "./RandomNumberGenerator.js"
import StrokeStepper from "./StrokeStepper.js"
import AdvancedAnalyzer from "./AdvancedAnalyzer.js"
import Analyzer from "./Analyzer.js";

let intervalId = null;
let isRunning = false;

const listNode = document.getElementById("ticks");
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');

const counterGenerator = new RandomNumberGenerator();
counterGenerator.setMinMax(3, 20);

const stepperGenerator = new RandomNumberGenerator();
stepperGenerator.setMinMax(2, 6);

const stepper = new StrokeStepper(stepperGenerator.random(), stepperGenerator.random());

const channels = [
    { "name": "CH1: CLK (Clock)", "color": Analyzer.SIGNAL_COLOR, "data": [] },
    { "name": "CH2: DATA", "color": Analyzer.DATA_COLOR, "data": [] },
    { "name": "CH3: ENABLE", "color": Analyzer.ENABLE_COLOR, "data": [] }
];

const analyzer = new AdvancedAnalyzer();
analyzer.setCanvasId('analyzerCanvas').setChannels(channels).addEventHandler();

let tempo = 0;

let counter = 0;
let loopNbr = 0;
function startLoop() {
    if (isRunning) {
        return;  // Doppelten Start verhindern
    }

    isRunning = true;

    // Führt die Funktion alle 'x' ms aus
    intervalId = window.setInterval(() => {
        const state = stepper.tick();
        updateInfo(state, counter++);

        // CH1: Konstanter schneller Takt
        tempo = (!tempo) ? 1 : 0;
        channels[0].data.push({ "state": (tempo), "duration": 10 });

        // CH2: Reale Datenbits
        channels[1].data.push({ "state": (state & 1), "duration": 10 });

        // CH3: ???
        channels[2].data.push({ "state": 0, "duration": 10 });

        loopNbr++;
        if (loopNbr >= counterGenerator.random()) {
            stepper.update(stepperGenerator.random(), stepperGenerator.random());
            loopNbr = 0;
        }

        analyzer.drawLogicTimeline();

    }, 1000);
}

function stopLoop() {
    isRunning = false;
    clearInterval(intervalId);
    intervalId = null;
}

function updateInfo(state, i) {

    const number = i.toString().padStart(4, '0')
    const text = `Takt ${number}: ${state ? "🟢 AN" : "🔴 AUS"}`;
    console.log(text);
    updateList(listNode, text);
}

function updateList(listNode, i) {
    const itemNode = document.createElement("li");
    itemNode.innerText = i;
    listNode.appendChild(itemNode);
}

startBtn.addEventListener('click', () => startLoop());
stopBtn.addEventListener('click', () => stopLoop());
