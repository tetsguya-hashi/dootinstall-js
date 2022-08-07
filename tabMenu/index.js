(() => {
  'use strict';
  const menu = document.querySelectorAll('.menu a');
  const content = document.getElementsByClassName('content');

  for (let i = 0; i < menu.length; i++) {
    menu[i].addEventListener('click', function () {
      for (let i = 0; i < menu.length; i++) {
        menu[i].classList.remove('active');
        content[i].classList.remove('active');
      }
      this.classList.add(('active'))
      content[i].classList.add('active')
    })

  }
})();