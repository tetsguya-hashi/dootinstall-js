(() => {
  'use strict';
  const timer = document.getElementById('timer');
  const min = document.getElementById('min');
  const sec = document.getElementById('sec');
  const reset = document.getElementById('reset');
  const start = document.getElementById('start');

  let startTime;
  let timeLeft;
  let timeCountDown = 0;
  let timerId;
  let isRunning = false;

  const updateTimer = (t) => {
    let d = new Date(t);
    let m = d.getMinutes();
    let s = d.getSeconds();
    let ms = d.getMilliseconds();
    let timerString = `${m}:${s}.${ms}`;
    m = ('0' + m).slice(-2);
    s = ('0' + s).slice(-2);
    ms = ('00' + ms).slice(-3);
    timer.textContent = timerString;
    document.title = timerString;
  }
  const countDown = () => {
    timerId = setTimeout(() => {
      let elapsedTime = Date.now() - startTime;
      timeLeft = timeCountDown - elapsedTime;
      if (timeLeft < 0) {
        isRunning = false;
        start.innerHTML = 'start';
        clearTimeout(timerId);
        timeLeft = 0;
        timeCountDown = 0;
        updateTimer(timeLeft);
        return;
      }
      updateTimer(timeLeft);
      countDown();
    }, 10);
  }
  start.addEventListener('click', function () {
    if (isRunning === false) {
      startTime = Date.now();
      countDown();
      start.innerHTML = 'stop';
      isRunning = true;
    } else {
      start.innerHTML = 'start';
      isRunning = false;
      timeCountDown = timeLeft;
      clearTimeout(timerId);
    }
  });
  min.addEventListener('click', function () {
    if (isRunning === false) {
      timeCountDown += 60 * 1000;
      updateTimer(timeCountDown);
    }
    // if (timeCountDown >= 60 * 60 * 1000) {
    //   timeCountDown = 0;
    // }
  });
  sec.addEventListener('click', function () {
    if (isRunning === false) {
      timeCountDown += 1000;
      updateTimer(timeCountDown);
    }
    // if (timeCountDown >= 60 * 60 * 1000) {
    //   timeCountDown = 0;
    // }
  });
  reset.addEventListener('click', function () {
    timeCountDown = 0;
    updateTimer(timeCountDown);
  });
})();