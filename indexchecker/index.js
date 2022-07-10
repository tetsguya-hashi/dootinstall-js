(() => {
  'use strict'
  const comment = document.getElementById('comment');
  const label = document.getElementById('label');

  let LIMIT = 30;
  let WARNING = 10;
  label.innerHTML = LIMIT;


  comment.addEventListener('keyup', function () {
    let remaining = LIMIT - this.value.length;
    // if (remaining < WARNING) {
    //   label.style.color = 'red';
    // } else {
    //   label.style.color = '#000';
    // }
    label.style.color = remaining < WARNING ? 'red' : '';
    label.innerHTML = remaining;

  });


})();