(() => {
  'use strict';
  const pairs = 4;
  const stage = document.getElementById('stage');
  const score = document.getElementById('score');
  const startBtn = document.getElementById('startBtn');
  let cards = [];
  let flipCount = 0;
  let firstCard = null;
  let secondCard = null;
  let isRunning = false;
  let correctCount = 0;
  let timeoutId;


  function init() {
    let i;
    let card;
    for (i = 0; i < pairs; i++) {
      cards.push(createCard(i));
      cards.push(createCard(i));
      // stage.appendChild(createCard(i));
      // stage.appendChild(createCard(i));
    }
    while (cards.length) {
      card = cards.splice(Math.floor(Math.random() * cards.length), 1)[0];
      stage.appendChild(card);
    }
  }
  function createCard(num) {
    let container;
    let card;
    let inner;
    inner = `<div class="card-front">${num}</div> <div class="card-back">?</div>`;
    card = document.createElement('div');
    card.innerHTML = inner;
    card.className = 'card';
    card.addEventListener('click', function () {
      flipCard(this);
      if (isRunning === true) {
        return
      }
      isRunning = true;
      scoreTime();
      document.getElementById('restart').className = '';
    });
    container = document.createElement('div');
    container.className = 'card-container';
    container.appendChild(card);
    return container;
  }

  function flipCard(card) {
    if (firstCard !== null && secondCard !== null) {
      return;
    }
    if (card.className.indexOf('open') !== -1) {
      return;
    }
    card.className = 'card open';
    flipCount++;
    if (flipCount % 2 === 1) {
      firstCard = card;
    } else {
      secondCard = card;
      secondCard.addEventListener('transitionend', check);
    }
  }
  function check() {
    if (firstCard.children[0].textContent !== secondCard.children[0].textContent) {
      firstCard.className = 'card';
      secondCard.className = 'card';
    } else {
      correctCount++;
      if (correctCount === pairs) {
        clearInterval(timeoutId);
      }
    }
    secondCard.removeEventListener('tansitionend', check);
    firstCard = null;
    secondCard = null;
  }
  function scoreTime() {
    const now = Date.now();
    timeoutId = setInterval(function () {
      let startTime = Date.now();
      let time = startTime - now;
      time = (time / 1000).toFixed(2);
      score.innerHTML = time;
    }, 10);

  }
  init();

})();
