let interval = 1;
let timeoutId = 0;

self.postMessage({ "message": "Worker ready!", "ready": true });
self.onmessage = (evnt) => {
    if (evnt.data.interval) {
        interval = evnt.data.interval;
        self.console.log("MetronomeWorker:  Current interval '" + interval + "'.");

    } else if (evnt.data === "start") {
        timeoutId = self.setInterval(() => {
            self.postMessage("tick");
        }, interval);
        self.console.log("MetronomeWorker:  Run function 'self.setInterval' (ID: " + timeoutId + "). Current interval '" + interval + "'.");
        
    } else if (evnt.data === "stop") {
        self.clearInterval(timeoutId);
        self.console.log("MetronomeWorker:  Run function 'self.clearInterval' (ID: " + timeoutId + ").");

    } else if (evnt.data === "tick") {
        // Nothing to do here
    }
}