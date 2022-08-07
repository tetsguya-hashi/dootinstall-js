(() => {
  'use strict';
  const boxes = document.getElementsByClassName('box');
  const btn = document.getElementById('btn');
  const contents = [
    'coin.png',
    'empty.png',
    'cobra.png'
  ]
  function init() {
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].addEventListener('click', function () {
        if (this.className.indexOf('shake') === -1) {
          return;
        }
        let contentsCopy = [...contents];
        btn.classList.remove('inactive');
        for (let j = 0; j < boxes.length; j++) {
          boxes[j].classList.add('disabled');
          boxes[j].classList.remove('shake');
          boxes[j].src = 'img/' + contentsCopy.splice(Math.floor(Math.random() * contentsCopy.length), 1)[0];
        }
        this.className = 'box';
      });
    }
  }

  init();
})();