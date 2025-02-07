const spinnerFrames = ["◐", "◓", "◑", "◒"];
let frameIndex = 0;
let spinnerInterval: Timer | number | null = null;

// Start the spinner animation
export function startSpinner() {
    if (spinnerInterval !== null) {
        clearInterval(spinnerInterval);
    }
    spinnerInterval = setInterval(() => {
        process.stdout.write(
            new TextEncoder().encode(`\r${spinnerFrames[frameIndex++ % spinnerFrames.length]} Thinking...`),
        );
    }, 100);
}

// Stop the spinner animation
export function stopSpinner() {
    if (spinnerInterval !== null) {
        clearInterval(spinnerInterval);
        spinnerInterval = null;
        process.stdout.write(new TextEncoder().encode("\r"));
    }
}
