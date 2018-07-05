var PATH_TO_BUZZER = "";

function Timer() {
    var time;
    var timerId;
    var MAX = 3600;
    var MIN = 0;
    var defaultTime = 60;
    var timerDiv = document.querySelector(".timer__counter");
    var timerStart = document.querySelector(".timer__start");
    var plus5min = document.querySelector(".timer__5mins .top-trangle");
    var minus5min = document.querySelector(".timer__5mins .bottom-trangle");

    this.init = function () {
        setDefaultTime();
        timerStart.addEventListener('click', startHandler);
    }

    function getMinutes() {
        var minutes = Math.floor(time / 60); //check if there is one seond more then should be at start
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
            timerStart.innerText = "Start";
            clearInterval(timerId);
        }
        else {
            timerStart.innerText = "Pause";
            startTimer();
        }
    }

    function startTimer() {
        timerId = setInterval(function () {

            --time;
            updateCounter();

            if (time == MIN) {startHandler(); }


        }, 1000);
    }

    function updateTime(seconds) {
        if (time + seconds > MAX) {
            time = 3600;
        }
        else if (time + seconds < MIN) {
            time = MIN;
        }
        else {
            time = time + seconds;
        }
    }
    function plus5mins() {
        updateTime(300);
    }
    function minus10mins() {
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
}


var newTimer = new Timer();

newTimer.init();