(function(exports) {
  'use strict';

  var ANIMATION_FRAMES = 5;
  var ANIMATION_SPEED = 0.004; // frames per milli

  var BIRD_WIDTH = 32;
  var BIRD_HEIGHT = 32;
  var SHEET_WIDTH = 160;
  var SHEET_HEIGHT = 32;

  function Bird(stage) {
    Animation.call(this, stage, BIRD_WIDTH, BIRD_HEIGHT,
      SHEET_WIDTH, SHEET_HEIGHT, ANIMATION_FRAMES, ANIMATION_SPEED);

    this.x = 40;
    this.y = 0;
    this.actor.style.top = -this.height + 'px';
    this.actor.style.left = this.x + 'px';
    this.actor.classList.add('bird', 'small');
    this.stage.appendChild(this.actor);

    this.velocity = 0;
    this.terminalVelocity = 0.7;
    this.terminalFlap = 1.0;
    this.flapPower = 1.7;
    this.gravity = .003;

    //if ('ontouchstart' in window) {
    //  window.addEventListener('touchstart', this.flap.bind(this));
    //} else {
    //  window.addEventListener('mousedown', this.flap.bind(this));
    //}

    //setInterval(function() {
    //  this.flap();
    //}.bind(this), 700);
  }

  Bird.prototype = Object.create(Animation.prototype);

  Bird.prototype.flap = function() {
    this.velocity -= this.flapPower;
    if (this.velocity < -this.terminalFlap) {
      this.velocity = -this.terminalFlap;
    }
  };

  Bird.prototype.update = function(delta, deltaAll) {
    Animation.prototype.update.call(this, delta, deltaAll);
    this.velocity += this.gravity * delta;
    if (this.velocity > this.terminalVelocity) {
      this.velocity = this.terminalVelocity;
    }

    this.y = ~~(this.y + (this.velocity * delta));
    if (this.y > Game.height + this.height) {
      this.y = Game.height + this.height;
    } else if (this.y < 0) {
       this.velocity = ~~(this.velocity / 2);
       this.y = 0;
    }

    this.actor.style.transform =
      'translateY(' + this.y + 'px) ' +
      'rotate(' + this.velocity * 90 + 'deg)';
  };

  exports.Bird = Bird;
})(this);
