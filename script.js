/* global NoSleep */

function setClocks(seconds) {
	let timers = document.querySelectorAll(".timer");
	for (let [idx, timer] of timers.entries()) {
		let thisSecond = Math.floor(seconds / 4 * (idx + 1));
		timer.textContent = thisSecond;
	}
}

document.addEventListener("DOMContentLoaded", () => {

	// PREVENT SCREEN SLEEPING UP TO 30 MINUTES
	let noSleep = new NoSleep();
	noSleep.enable();
	setTimeout(() => {
		noSleep.disable();
	}, (30 * 60 * 1000));

	// CHANGES TO SECONDS
	let secondsSelect = document.querySelector(".seconds");
	let maxSeconds = secondsSelect.value;
	setClocks(maxSeconds);

	secondsSelect.addEventListener("change", () => {
		maxSeconds = secondsSelect.value;
		setClocks(maxSeconds);
	});


	// TIMER COUNTDOWN MECHANISM
	setInterval(() => {
		//Loop through all timers
		let timers = document.querySelectorAll(".timer");
		for (let timer of timers) {
			
			// Determine the next time
			let curTime = parseInt(timer.textContent, 10);
			let nextTime = curTime - 1;

			if (nextTime < 1) {
				nextTime = maxSeconds;
			}

			// Set the new time
			timer.textContent = nextTime;

			// Flash clock that has reset
			if (nextTime === maxSeconds) {
				timer.parentElement.classList.add("flash");
			}
			else {
				timer.parentElement.classList.remove("flash");
			}
		}

	}, 1000);
});