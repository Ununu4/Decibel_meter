This repository contains code for a simple web application that measures sound levels using the microphone of the user's device. The application provides real-time feedback on the sound level and visualizes it using color-coded indicators.
How it Works

    Start and Stop Buttons: Users can start and stop the sound level measurements by clicking the "Start" and "Stop" buttons, respectively.

    Microphone Access: Upon clicking the "Start" button, the application requests access to the user's microphone using the navigator.mediaDevices.getUserMedia() method.

    Audio Context Setup: Once access is granted, an AudioContext is created, which represents an audio-processing graph built from audio modules linked together.

    Analyzing Audio Data: An AnalyserNode is created within the AudioContext to analyze the audio data from the microphone stream. This node provides frequency and time-domain analysis of the audio data.

    Interval for Continuous Measurement: A timer interval is set using setInterval() to periodically sample the audio data from the AnalyserNode.

    Calculating Decibel (dB) Values: Within each interval, the root mean square (RMS) of the audio data is calculated to determine the dB value, representing the sound level.

    Visual Feedback: The dB value is displayed on the UI in real-time, and the visualization is updated accordingly with color-coded indicators representing different sound levels (green for low, yellow for moderate, orange for high, and red for very high).

    Data Storage: The dB values are stored in an array (localDbValues) for potential further analysis or data logging.

    Stop Functionality: Clicking the "Stop" button clears the interval timer, effectively halting the continuous sound level measurements.

Usage

To use the sound level meter:

    Open the web application in a browser that supports microphone access.
    Click the "Start" button to begin measuring sound levels.
    Observe the real-time dB values and visual feedback.
    Click the "Stop" button to end the measurement session.

Dependencies

This web application relies on:

    Web browser with support for navigator.mediaDevices.getUserMedia().
    JavaScript with ECMAScript 6 features.
    HTML5 for the user interface.

Credits

This project was inspired by the need for a simple, browser-based sound level meter and was developed by Ununu.
