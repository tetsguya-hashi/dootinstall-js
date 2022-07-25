(() => {
  'use strict';
  const mainImage = document.getElementById('main');
  const play = document.getElementById('play');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const thumbnails = document.querySelector('.thumbnails');

  const imagesCreate = () => {
    let image = [];
    for (let i = 0; i <= 7; i++) {
      image.push(`img/pic0${i}.png`)
    }
    return image;
  }
  let images = imagesCreate();
  let currentIndex = 0;

  mainImage.src = images[currentIndex];

  images.forEach((image, index) => {
    const img = document.createElement('img');
    img.src = image;
    const li = document.createElement('li');
    if (index === currentIndex) {
      li.classList.add('current');
    }
    li.addEventListener('click', function () {
      const thumbnailsList = document.querySelectorAll('.thumbnails li');
      thumbnailsList[currentIndex].classList.remove('current');
      currentIndex = index;
      mainImage.src = image;
      thumbnailsList[currentIndex].classList.add('current');
    })
    li.appendChild(img);
    thumbnails.appendChild(li);
  });

  next.addEventListener('click', () => {
    let target = currentIndex + 1;
    if (target === images.length) {
      target = 0;
    }
    document.querySelectorAll('.thumbnails li')[target].click();
  });
  let target = 0;
  prev.addEventListener('click', () => {
    target = target <= 0 ? target = images.length - 1 : currentIndex - 1;
    document.querySelectorAll('.thumbnails li')[target].click();
  });

  let clearIntervalSlide;
  let isPlaying = false;
  function playSlideshow() {
    clearIntervalSlide = setInterval(() => {
      next.click();
      // playSlideshow();
    }, 1000)
  }
  play.addEventListener('click', () => {
    if (isPlaying === false) {
      playSlideshow();
      play.textContent = 'Pouse';
      isPlaying = true;
    } else {
      isPlaying = false;
      play.textContent = 'Play';
      clearInterval(clearIntervalSlide);
    }
  })

})();