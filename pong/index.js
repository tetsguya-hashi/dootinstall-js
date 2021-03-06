'use strict';
(() => {
  class Ball {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext('2d');
      this.x = 30;
      this.y = 30;
      this.r = 10;
      this.vx = 2;
      this.vy = 3;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x - this.r < 0 || this.x + this.r > this.canvas.width) {
        this.vx *= -1;
      }
      if (this.y - this.r < 0 || this.y + this.r > this.canvas.height) {
        this.vy *= -1;
      }
    }
    draw() {
      this.ctx.beginPath();
      this.ctx.fillStyle = '#fdfdfd';
      this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      this.ctx.fill();
    }
  }
  class Game {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext('2d');
      this.ball = new Ball(this.canvas);
      this.loop();
    }
    loop() {
      this.update();
      this.draw();

      requestAnimationFrame(() => { this.loop(); });
    }
    update() {
      this.ball.update();
    }

    draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ball.draw();
    }
  }
  const canvas = document.querySelector('canvas');
  if (typeof canvas.getContext === 'undefined') {
    return;
  }
  new Game(canvas);
})();