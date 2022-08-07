(() => {
  'use strict';
  const next = document.getElementById('next');
  const prev = document.getElementById('prev');
  const ul = document.querySelector('ul');
  const slides = ul.children;
  const dots = [];
  let currentIndex = 0;

  function updateButtons() {
    prev.classList = '';
    next.classList = '';
    if (currentIndex === 0) {
      prev.classList = 'hidden';
    } else if (currentIndex === slides.length - 1) {
      next.classList = 'hidden';
    } else {
      prev.classList = '';
      next.classList = '';
    }
  }
  function moveSlides() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    ul.style.transform = `translateX(${-1 * slideWidth * currentIndex}px)`;
  }
  function setupDots() {
    for (let i = 0; i < slides.length; i++) {
      const button = document.createElement('button')
      button.addEventListener('click', () => {
        currentIndex = i;
        updateDots();
        updateButtons();
        moveSlides();
      });
      dots.push(button);
      const nav = document.querySelector('nav');
      nav.appendChild(button);
    }
    dots[0].classList.add('current');
  }
  function updateDots() {
    dots.forEach(dot => {
      dot.classList.remove('current');
    });
    dots[currentIndex].classList.add('current');
  }

  setupDots();
  updateButtons();
  next.addEventListener('click', () => {
    currentIndex++;
    updateButtons();
    updateDots();
    moveSlides();
  });
  prev.addEventListener('click', () => {
    currentIndex--;
    updateButtons();
    updateDots();
    moveSlides();
  });

  window.addEventListener('resize', () => {
    moveSlides();
  });
})();

