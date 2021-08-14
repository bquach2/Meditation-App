const song = document.querySelector(".song");
const play = document.querySelector(".play");
const replay = document.querySelector(".replay");
const outline = document.querySelector(".moving-outline circle");
const video = document.querySelector(".vid video");
const timeDisplay = document.querySelector(".time-display");
const outlineLength = outline.getTotalLength();
const timeSelect = document.querySelectorAll(".time-select button");
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
        video.play();

    } else {
        play.src = "./svg/play.svg";
        song.pause();
        video.pause();

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
    let elapsed = Duration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);
    if (seconds == 0) {
        timeDisplay.textContent = `${minutes}:00`;
    }
    else {
        timeDisplay.textContent = `${minutes}:${seconds}`;
    }

    let progress = outlineLength - (currentTime / Duration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    if (currentTime >= Duration) {
        song.pause();
        song.currentTime = 0;
        play.src = "./svg/play.svg";
        video.pause();
    }
};