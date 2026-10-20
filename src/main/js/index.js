import RandomNumberGenerator from "./RandomNumberGenerator.js"
import TaktStepper from "./TaktStepper.js"


// Ein Stepper, der 3 Takte AN und 2 Takte AUS ist (m=3, n=2)
const stepper = new TaktStepper(3, 2);

// Simulation von 10 Takten (z.B. in einer Schleife oder per setInterval)
for (let i = 1; i <= 10; i++) {
    const state = stepper.tick();
    console.log(`Takt ${i}: ${state ? "🟢 AN" : "🔴 AUS"}`);
}

const ticks = stepper.getNumberOfTicks();
stepper.update(4, 2); 

for (let i = ticks; i <= ticks + 20; i++) {
    const state = stepper.tick();
    console.log(`Takt ${i}: ${state ? "🟢 AN" : "🔴 AUS"}`);
}
