(function(exports) {
  'use strict';

  function Bird(ctx, image, width, height, x, y) {
    Drawable.call(this, ctx, image, width, height, x, y);

    this.velocity = 0;
    this.terminalVelocity = 0.7;
    this.terminalFlap = 1.7;
    this.flapPower = 1.7;
    this.gravity = .006;

    window.addEventListener('mousedown', this.flap.bind(this));
  }

  Bird.prototype = Object.create(Drawable.prototype);

  Bird.prototype.flap = function() {
    this.velocity -= this.flapPower;
    if (this.velocity < -this.terminalFlap) {
      this.velocity = -this.terminalFlap;
    }
  };

  Bird.prototype.update = function(delta) {
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
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  };

  exports.Bird = Bird;
})(this);

