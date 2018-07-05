var PATH_TO_BUZZER = "buzzer.mp3";

function Timer() {
    var time;
    var timerId;
    var MAX = 3600;
    var MIN = 0;
    var defaultTime = 60;
    var isRunning = false;
    var timerDiv = document.querySelector(".timer__counter");
    var timerStart = document.querySelector(".timer__start");
    var plus5minsArrow = document.querySelector(".timer__5mins .triangle-top");
    var minus5minsArrow = document.querySelector(".timer__5mins .triangle-bottom");
    var plus1minArrow = document.querySelector(".timer__1min .triangle-top");
    var minus1minArrow = document.querySelector(".timer__1min .triangle-bottom");
    var plus10secsArrow = document.querySelector(".timer__10secs .triangle-top");
    var minus10secsArrow = document.querySelector(".timer__10secs .triangle-bottom");
    var timerReset = document.querySelector(".timer__reset");

    this.init = function () {
        setDefaultTime();
        timerStart.addEventListener('click', startHandler);
        timerReset.addEventListener('click', resetHandler);
        plus5minsArrow.addEventListener('click', plus5mins);
        minus5minsArrow.addEventListener('click', minus5mins);
        plus1minArrow.addEventListener('click', plus1min);
        minus1minArrow.addEventListener('click', minus1min);
        plus10secsArrow.addEventListener('click', plus10secs);
        minus10secsArrow.addEventListener('click', minus10secs);
    }

    function getMinutes() {
        var minutes = Math.floor(time / 60);
        return ("0" + minutes).slice(-2);
    }

    function getSeconds() {
        var seconds = time % 60;
        return ("0" + seconds).slice(-2);
    }

    function updateCounter() {
        timerDiv.innerHTML = "" + getMinutes() + ":" + getSeconds() + "";
    }

    function setDefaultTime() {
        time = defaultTime;
        updateCounter();
    }

    function startHandler() {
        if (timerStart.innerText == "Pause") {
            clearInterval(timerId);
            isRunning = false;
            if (time == MIN) {
                timeRunout();
            }
            else {
                timerStart.innerText = "Start";
            }

        }
        else {
            timerStart.innerText = "Pause";
            if (time == MIN) {
                setDefaultTime();
                updateCounter();
            }
            startTimer();
            isRunning = true;
        }
    }

    function timeRunout() {
        soundBuzzer();
        timerStart.removeEventListener('click', startHandler);
        setTimeout(function () {
            timerStart.innerText = "Start";
            timerStart.addEventListener('click', startHandler);
        }, 3000);
    }

    function startTimer() {
        timerId = setInterval(function () {

            --time;
            updateCounter();

            if (time <= MIN) { startHandler(); }


        }, 1000);
    }
    function resetHandler() {
        setDefaultTime();
        clearInterval(timerId);
        isRunning = false;
    }

    function updateTime(seconds) {
        if (time + seconds >= MAX) {
            time = 3600;
        }
        else if (time + seconds <= MIN) {
            time = MIN;
            if (isRunning) {
                clearInterval(timerId);
                isRunning = false;
                timeRunout();
            }
        }
        else {
            time = time + seconds;
        }
        updateCounter();
    }
    function plus5mins() {
        updateTime(300);
    }
    function minus5mins() {
        updateTime(-300);
    }
    function plus1min() {
        updateTime(60);
    }
    function minus1min() {
        updateTime(-60);
    }
    function plus10secs() {
        updateTime(10);
    }
    function minus10secs() {
        updateTime(-10);
    }

    function soundBuzzer() {
        var audio = new Audio(PATH_TO_BUZZER);
        audio.play();
    }
}


var newTimer = new Timer();

newTimer.init();