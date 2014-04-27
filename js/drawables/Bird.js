(function(exports) {
  'use strict';

  var ANIMATION_FRAMES = 14;
  var ANIMATION_SPEED = 0.02; // frames per milli

  var BIRD_WIDTH = 183;
  var BIRD_HEIGHT = 168;
  var SHEET_WIDTH = 918;
  var SHEET_HEIGHT = 506;

  function Bird(ctx, image, x, y) {
    SpriteSheet.call(this, ctx, image, BIRD_WIDTH, BIRD_HEIGHT, x, y,
      SHEET_WIDTH, SHEET_HEIGHT, ANIMATION_FRAMES, ANIMATION_SPEED);

    this.velocity = 0;
    this.terminalVelocity = 0.7;
    this.terminalFlap = 1.7;
    this.flapPower = 1.7;
    this.gravity = .004;

    window.addEventListener('mousedown', this.flap.bind(this));
  }

  Bird.prototype = Object.create(Drawable.prototype);

  Bird.prototype.flap = function() {
    this.velocity -= this.flapPower;
    if (this.velocity < -this.terminalFlap) {
      this.velocity = -this.terminalFlap;
    }
  };

  Bird.prototype.update = function(delta, deltaAll) {
    SpriteSheet.prototype.update.call(this, delta, deltaAll);
    this.oldY = this.y;
    this.velocity += this.gravity * delta;
    if (this.velocity > this.terminalVelocity) {
      this.velocity = this.terminalVelocity;
    }

    this.y = Math.floor(this.y + (this.velocity * delta));
    if (this.y > (Game.height - this.height)) {
      this.y = Game.height - this.height;
    } else if (this.y < 0) {
       this.y = 0;
    }
  };

  Bird.prototype.draw = function() {
    this.ctx.clearRect(this.x, this.oldY, this.width, this.height);
    SpriteSheet.prototype.draw.call(this);
  };

  exports.Bird = Bird;
})(this);

