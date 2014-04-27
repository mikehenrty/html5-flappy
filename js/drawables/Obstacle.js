(function(exports) {
  'use strict';

  function Obstacle(ctx, image, width, height, x, y) {
    Drawable.call(this, ctx, image, width, height, x, y);

    this.height = this.generateRandomHeight();
    this.width = 190;

    this.x = Game.width + this.width;
    this.y = Game.height - this.height;

    this.speed = -0.6;
  }

  Obstacle.prototype = Object.create(Drawable);

  Obstacle.prototype.generateRandomHeight = function() {
    var lowerLimit = Game.height / 4;
    return utils.getRandomInt(lowerLimit, lowerLimit + (Game.height / 2));
  };

  Obstacle.prototype.update = function(delta, deltaAll) {
    this.lastX = this.x;
    this.x = Math.floor(this.x + delta * this.speed);
    if (this.x + this.width < 0) {
      this.height = this.generateRandomHeight();
      this.x = Game.width + this.width;
      this.y = Game.height - this.height;
    }
  };

  Obstacle.prototype.draw = function() {
    this.ctx.clearRect(this.lastX, this.y, this.width, this.height);
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  };

  exports.Obstacle = Obstacle;
})(this);

