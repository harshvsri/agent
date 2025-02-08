const spinnerFrames = ["◐", "◓", "◑", "◒"];
let frameIndex = 0;
let spinnerInterval: Timer | number | null = null;

// Start the spinner animation
export function startSpinner(info: string) {
    if (spinnerInterval !== null) {
        clearInterval(spinnerInterval);
    };
    frameIndex = 0;
    spinnerInterval = setInterval(() => {
        process.stdout.write(
            `\r${spinnerFrames[frameIndex++ % spinnerFrames.length]} ${info}`,
        );
    }, 100);
}

// Stop the spinner animation
export function stopSpinner() {
    if (spinnerInterval !== null) {
        clearInterval(spinnerInterval);
        spinnerInterval = null;

        // Clears out the terminal completely.
        process.stdout.write("\r\x1b[K");
    }
}
