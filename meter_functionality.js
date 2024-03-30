let localDbValues = [];     // Array to store dB values for each loop within the refresh_rate
let refresh_rate = 100;     // Decreased refresh rate for faster updates
let interval;               // Interval for updating dB readings

// Function to start the dB readings
function startDbReadings() {
    // Request microphone access
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then((stream) => {
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();

        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 256;

        source.connect(analyser);

        // Start interval for updating dB readings
        interval = setInterval(() => {
            const data = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(data);
            let rms = 0;

            for (let i = 0; i < data.length; i++) {
                if (data[i] > 120) data[i] = 120; // Cap values to avoid extreme spikes
                rms += data[i] * data[i];
            }
            rms = Math.sqrt(rms / data.length);

            // Calculate dB value
            let value = rms;

            // Add dB value to local array
            localDbValues.push(value);

            // Display the latest dB value
            const db = document.getElementById("db");
            db.innerText = Math.round(value);

            // Update visualization colors
            changeColor(value);
        }, refresh_rate);
    })
    .catch((err) => {
        console.error('Error accessing microphone', err);
    });
}

// Function to stop the dB readings
function stopDbReadings() {
    clearInterval(interval);
}

// Event listeners for start and stop buttons
document.getElementById("startButton").addEventListener("click", startDbReadings);
document.getElementById("stopButton").addEventListener("click", stopDbReadings);

// Function to change visualization colors according to the dB value
function changeColor(decibels) {
    let color;
    if (decibels < 50) { color = 'green' }
    else if (decibels >= 50 && decibels < 70) { color = 'yellow' }
    else if (decibels >= 70 && decibels < 90) { color = 'orange' }
    else { color = 'red' }

    document.getElementById("visuals").style.width = decibels * 2 / 10 + "rem";
    document.getElementById("visuals").style.background = (decibels >= 70) ? 'red' : 'black';
    document.getElementById("db").style.color = color;
}