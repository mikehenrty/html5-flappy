(function(exports) {
  'use strict';

  function Obstacle(stage, delay) {
    this.stage = stage;
    this.actor = document.createElement('div');
    this.actor.classList.add('pipe');
    this.stage.appendChild(this.actor);

    this.width = this.actor.style.width;
    this.generateRandomHeight();

    this.speed = 0.4;
    this.duration = ~~((Game.width + this.width) / this.speed);
    this.actor.style.transitionDuration = this.duration + 'ms';

    setTimeout(this.start.bind(this), delay);
  }

  Obstacle.prototype.generateRandomHeight = function() {
    var lowerLimit = Game.height / 4;
    this.height = utils.getRandomInt(lowerLimit, lowerLimit + (Game.height / 2));
    this.actor.style.top = (Game.height - this.height) + 'px';
  };

  Obstacle.prototype.start = function() {
    this.actor.style.transform = 'translateX(0)';
    this.actor.addEventListener('transitionend', this.reset.bind(this));
  };

  Obstacle.prototype.reset = function reset() {
    this.actor.style.transitionDuration = '0ms';
    this.generateRandomHeight();
    this.actor.style.transform = 'translateX(820px)';
    setTimeout(function() {
      this.actor.style.transitionDuration = this.duration + 'ms';
      this.actor.style.transform = 'translateX(0)';
    }.bind(this), 1000);
  };


  Obstacle.prototype.update = function(delta, deltaAll) {
    return;
    if (!this.first) {
      this.first = true;
      this.actor.style.transform = 'translateX(-120px)';
    }
    return;

    this.lastX = this.x;
    this.x = Math.floor(this.x + delta * this.speed);
    if (this.x > Game.width) {
      this.offscreen = true;
      return;
    }
    this.offscreen = false;

    if (this.x + this.width < 0) {
      this.height = this.generateRandomHeight();
      this.x = Game.width + this.width;
      this.y = Game.height - this.height;
    }
  };

  Obstacle.prototype.draw = function() {
    return;
    if (this.offscreen) {
      return;
    }
    //this.ctx.clearRect(this.lastX, this.y, this.width, this.height);
    //this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  };

  exports.Obstacle = Obstacle;
})(this);

