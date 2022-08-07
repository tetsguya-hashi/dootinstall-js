(() => {
  'use strict';

  const open = document.getElementById('open');
  const close = document.getElementById('close');
  const overlay = document.querySelector('.overlay');
  const li = document.querySelectorAll('li');
  console.log(li);
  open.addEventListener('click', () => {
    overlay.classList.add('show');
    li.forEach(li => {
      li.classList.add('show');
    })
    open.classList.add('hide')
  });

  close.addEventListener('click', () => {
    overlay.classList.remove('show');
    open.classList.remove('hide')
    li.forEach(li => {
      li.classList.remove('show');
    })

  });
})();
