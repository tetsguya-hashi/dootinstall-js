(() => {
  'use strict';
  const higher = document.getElementById('higher');
  const lower = document.getElementById('lower');
  const dealer_card = document.getElementById('dealer_card');
  const player_card = document.getElementById('player_card');
  const wrapper = document.getElementById('wrapper');
  const result = document.getElementById('result');
  let dealerValue;
  let playerValue;

  function getRondom() {
    return Math.floor(Math.random() * 13 + 1);
  }

  function init() {
    dealerValue = getRondom();
    dealer_card.textContent = dealerValue;
    playerValue = getRondom();
    player_card.textContent = playerValue;
    wrapper.removeEventListener('transitionend', init)
  }
  init();

  function check(guess) {
    let str;
    wrapper.classList.add('active');
    if (dealerValue === playerValue) {
      str = 'Drow';
    } else {
      str = 'You' + getResultStr(guess);
    }
    result.textContent = str;
  }

  function getResultStr(guess) {
    if (playerValue > dealerValue && guess === 'higher'
      || playerValue < dealerValue && guess === 'lower') {
      return 'win!';
    } else {
      return 'lose';
    }
  }

  higher.addEventListener('click', () => {
    check('higher');
  })
  lower.addEventListener('click', () => {
    check('lower');
  })
  result.addEventListener('click', () => {
    wrapper.classList.remove('active')
    result.innerHTML = 'result';
    wrapper.addEventListener('transitionend', init)
  });

})();