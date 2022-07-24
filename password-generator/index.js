(() => {
  'use strict';

  const slider = document.getElementById('slider');
  const label = document.getElementById('label');
  const btn = document.getElementById('btn');
  const inputText = document.getElementById('inputText');
  const numbers = document.getElementById('numbers');
  const symbols = document.getElementById('symbols');


  function getPassword() {
    const seed_letters = 'abcdefghijklmnopqrstuvwxyz'
    const seed_numbers = '1234567890'
    const seed_Symbols = '!#$%&)(><?@'
    let seed = ''
    let len = slider.value;
    let pwd = '';

    seed = seed_letters + seed_letters.toUpperCase();
    if (numbers.checked && symbols.checked) {
      seed += seed_numbers + seed_Symbols;
    } else if (numbers.checked) {
      seed += seed_numbers;
    } else if (symbols.checked) {
      seed += seed_Symbols;
    }

    for (let i = 0; i < len; i++) {

      pwd += seed[Math.floor(Math.random() * seed.length)];
    }



    inputText.value = pwd
  }

  slider.addEventListener('change', function (e) {
    label.textContent = this.value;

  });

  btn.addEventListener('click', function () {
    getPassword();
    inputText.select();
  });

  getPassword();
})();