var PATH_TO_BUZZER = "buzzer.mp3";

function Timer() {
    var time;
    var timerId;
    var MAX = 3600;
    var MIN = 0;
    var defaultTime = 60;
    var timerDiv = document.querySelector(".timer__counter");
    var timerStart = document.querySelector(".timer__start");
    var plus5minsArrow = document.querySelector(".timer__5mins .triangle-top");
    var minus5minsArrow = document.querySelector(".timer__5mins .triangle-bottom");
    var plus1minArrow = document.querySelector(".timer__1min .triangle-top");
    var minus1minArrow = document.querySelector(".timer__1min .triangle-bottom");
    var plus10secsArrow = document.querySelector(".timer__10secs .triangle-top");
    var minus10secsArrow = document.querySelector(".timer__10secs .triangle-bottom");
    var audioId = document.querySelector(".timer__buzzer");

    this.init = function () {
        setDefaultTime();
        timerStart.addEventListener('click', startHandler);
        plus5minsArrow.addEventListener('click', plus5mins);
        minus5minsArrow.addEventListener('click', minus5mins);
        plus1minArrow.addEventListener('click', plus1min);
        minus1minArrow.addEventListener('click', minus1min);
        plus10secsArrow.addEventListener('click', plus10secs);
        minus10secsArrow.addEventListener('click', minus10secs);
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
            clearInterval(timerId);
            if (time == MIN) {
                soundBuzzer();
                timerStart.removeEventListener('click', startHandler); //should this be done for every listener??
                setTimeout(function () {
                    timerStart.innerText = "Start";
                    timerStart.addEventListener('click', startHandler);
                }, 3000);
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
        }
    }

    function startTimer() {
        timerId = setInterval(function () {


            --time;
            updateCounter();

            if (time <= MIN) { startHandler(); }


        }, 1000);
    }

    function updateTime(seconds) {
        if (time + seconds >= MAX) {
            time = 3600;
        }
        else if (time + seconds <= MIN) {
            time = MIN;
            startHandler();
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