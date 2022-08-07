(() => {
  'use strict';
  const words = [
    'red',
    'blue',
    'green',
    'yellow'
  ]
  const target = document.getElementById('target');
  const result = document.getElementById('result');
  const time = document.getElementById('time');
  let i = 0;
  let word;
  let startTime = 0;
  let finishTime;
  let wordsCopy = [...words]
  let set;
  function setWord() {
    word = wordsCopy.splice([Math.floor(Math.random() * wordsCopy.length)], 1)[0];
    target.textContent = word;
    i = 0;
  }
  document.addEventListener('click', () => {
    if (startTime !== 0) {
      return;
    }
    setWord();
    startTime = Date.now();
    set = setInterval(() => {
      let nowTime = Date.now();
      let timeText = ((nowTime - startTime) / 1000).toFixed(2);
      time.textContent = timeText;
    }, 10);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== word[i]) {
      return;
    }
    i++;
    target.textContent = '_'.repeat(i) + word.substring(i);

    if (i === word.length) {
      if (wordsCopy.length === 0) {
        finishTime = Date.now();
        let scoreTime = ((finishTime - startTime) / 1000).toFixed(2);
        result.textContent =
          `'finish!!!' score: ${scoreTime} seconds replay?? click here!!`;
        clearInterval(set);
        time.textContent = '';
        return;
      }
      setWord();
      console.log(words);
      console.log(wordsCopy);
    }
  });
  function reset() {
    startTime = 0;
    finishTime = 0;
    wordsCopy = [...words]
    result.textContent = '';
    setWord();
  }
  result.addEventListener('click', () => {
    reset();
  })
})();