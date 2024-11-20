// Countdown Timer
function countdownStart() {
    const countdownElement = document.querySelector(".countdown");

    setInterval(() => {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const second = now.getSeconds();

        if (hour >= 6 && hour < 23) {
            const hoursLeft = 22 - hour;
            const minutesLeft = 59 - minute;
            const secondsLeft = 59 - second;

            countdownElement.innerHTML = formatTime(hoursLeft, minutesLeft, secondsLeft);
        } else {
            countdownElement.innerHTML = "Sleep Time";
        }
    }, 1000); // Update every second
}

// Update Slider Value
function trackTimerSlider() {
    const slider = document.querySelector("#mm");
    const display = document.querySelector(".minutes");

    slider.addEventListener("input", function () {
        display.innerHTML = this.value;
    });
}

// Start Timer
function startTimer() {
    const startButton = document.querySelector(".start-timer");
    const slider = document.querySelector("#mm");
    const display = document.querySelector(".minutes");
    const alertBox = document.querySelector(".alert");
    const alertCloseButton = document.querySelector(".btn-close");

    let activeTimerInterval = null;
    let alarmSound = new Audio("https://pub-f6308f0827f74ce4b354072b6280fb67.r2.dev/lifetick/1.mp3");

    alertCloseButton.addEventListener("click", function () {
        alertBox.classList.remove("show");
        if (alarmSound) {
            alarmSound.pause();
            alarmSound.currentTime = 0;
        }
    });

    startButton.addEventListener("click", function () {
        if (!activeTimerInterval) {
            // Start the timer
            this.innerHTML = "Stop Timer";
            this.classList.add("active");

            const now = new Date();
            const targetTime = new Date(
                now.getTime() + parseInt(slider.value) * 60 * 1000
            );

            if (slider.value > 0) {
                display.innerHTML = `${slider.value - 1}:59`;
            }

            activeTimerInterval = setInterval(() => {
                const remainingTime = targetTime - new Date();

                if (remainingTime <= 0) {
                    // Timer complete
                    alertBox.classList.add("show");

                    if (alarmSound) {
                        alarmSound.play();
                        alarmSound.loop = true;
                    }

                    clearInterval(activeTimerInterval);
                    activeTimerInterval = null;
                    resetTimerUI(this, slider, display);
                    return;
                }

                // Update display
                const minutes = Math.floor(remainingTime / 60000);
                const seconds = Math.floor((remainingTime % 60000) / 1000);
                slider.value = minutes;
                console.log(minutes);

                display.innerHTML = `${minutes}:${seconds.toString().padStart(2, "0")}`;
            }, 1000);
        } else {
            // Stop the timer
            clearInterval(activeTimerInterval);
            activeTimerInterval = null;
            resetTimerUI(this, slider, display);
        }
    });
}

// Reset Timer UI
function resetTimerUI(button, slider, display) {
    button.innerHTML = "Start Timer";
    slider.value = 1;
    display.innerHTML = "1";
    button.classList.remove("active");
}

// Format Time Helper Function
function formatTime(hours, minutes, seconds) {
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// Initialize All Functions
countdownStart();
trackTimerSlider();
startTimer();