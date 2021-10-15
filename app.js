const song = document.querySelector(".song");
document.getElementsByClassName("song").loop = true;
song.loop = true;
const play = document.querySelector(".play");
const replay = document.querySelector(".replay");
const outline = document.querySelector(".moving-outline circle");
const timeDisplay = document.querySelector(".time-display");
const outlineLength = outline.getTotalLength();
const timeSelect = document.querySelectorAll(".time-select button");
let runCount = 0;
let Duration = 600;

outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;
if (Math.floor(Duration % 60) == 0) {
    timeDisplay.textContent = `${Math.floor(Duration / 60)}:00`;
} else {
    timeDisplay.textContent = `${Math.floor(Duration / 60)}:${Math.floor(
        Duration % 60)}`;
}



play.addEventListener("click", function () {
    if (song.paused) {
        play.src = "./svg/pause.svg";
        song.play();
    } else {
        play.src = "./svg/play.svg";
        song.pause();
    }
});

replay.addEventListener("click", function () {
    song.currentTime = 0;
});


timeSelect.forEach(option => {
    option.addEventListener("click", function () {
        Duration = this.getAttribute("data-time");
        timeDisplay.textContent = `${Math.floor(Duration / 60)}:${Math.floor(
            Duration % 60
        )}`;
    });
});



song.ontimeupdate = function () {
    let currentTime = song.currentTime;
    if (currentTime == 0) {
        runCount++;
    }
    let elapsed = Duration - currentTime - (600 * runCount);
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);
    if (seconds == 0) {
        timeDisplay.textContent = `${minutes}:00`;
    }
    else if (seconds < 10) {
        timeDisplay.textContent = `${minutes}:0${seconds}`;
    }
    else {
        timeDisplay.textContent = `${minutes}:${seconds}`;
    }

    let progress = outlineLength - ((currentTime + 600 * runCount) / Duration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    if (currentTime + 600 * runCount >= Duration) {
        song.pause();
        runCount = 0;
        timeDisplay.textContent = `0:00`;
        play.src = "./svg/play.svg";
    }
};