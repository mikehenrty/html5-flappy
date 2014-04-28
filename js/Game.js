(function(exports) {
  'use strict';

  var SCREEN_WIDTH = 700;
  var SCREEN_HEIGHT = 400;

  var images = {
    'background': '/img/congruent_pentagon.png',
    'bird': '/img/birdie.png',
    'pipe': '/img/pipe.png'
  };

  function Game() {
    this.running = false;
    this.height = SCREEN_HEIGHT;
    this.width = SCREEN_WIDTH;
    document.addEventListener('DOMContentLoaded', this.init.bind(this));
  }

  /**
   * Initialize game state
   */
  Game.prototype.init = function() {
    this.stage = document.getElementById('container');
    this.foregroundCtx = document.getElementById('foreground').getContext('2d');
    this.birdCtx = document.getElementById('bird').getContext('2d');

    this.imageLoader = new ImageLoader(images);
    this.imageLoader.loadAll(this.startGame.bind(this));

//    this.bg = new Background(this.stage);

    //this.bg = new Background(this.backgroundCtx,
    //  this.imageLoader.get('background'),
    //  SCREEN_WIDTH, SCREEN_HEIGHT, 0, 0);

    this.bird = new Bird(this.birdCtx,
      this.imageLoader.get('bird'), 40, 200);

    var distanceBetweenPipes = 220;
    this.pipes = [];
    //  new Obstacle(this.foregroundCtx, this.imageLoader.get('pipe'),
    //    this.width + distanceBetweenPipes * 0),
    //  new Obstacle(this.foregroundCtx, this.imageLoader.get('pipe'),
    //    this.width + distanceBetweenPipes * 1),
    //  new Obstacle(this.foregroundCtx, this.imageLoader.get('pipe'),
    //    this.width + distanceBetweenPipes * 2),
    //  new Obstacle(this.foregroundCtx, this.imageLoader.get('pipe'),
    //    this.width + distanceBetweenPipes * 3),
    //  new Obstacle(this.foregroundCtx, this.imageLoader.get('pipe'),
    //    this.width + distanceBetweenPipes * 4),
    //];
    new Obstacle(this.stage, 0);
    new Obstacle(this.stage, 700);
    new Obstacle(this.stage, 1400);
    new Obstacle(this.stage, 2100);

    new Cloud(this.stage, 'large');
    new Cloud(this.stage, 'small');
    new Cloud(this.stage, 'large');
    new Cloud(this.stage, 'med');
    new Cloud(this.stage, 'small');

    this.drawables = [
      //this.bg
      this.bird
    ].concat(this.pipes);

    // set up collision detection
    this.collider = new Collider(this.bird);
    this.pipes.forEach(function(pipe) {
      this.collider.addObject(pipe);
    }.bind(this));

    // fps tracker
    this.FPS = new FPS(document.getElementById('fps'));
  };

  /**
   * update game state
   */
  Game.prototype.update = function(delta, deltaAll) {
    for (var i = 0; i < this.drawables.length; i++) {
      this.drawables[i].update(delta, deltaAll);
    }
    this.collider.update(delta, deltaAll);
  };

  /**
   * render game objects
   */
  Game.prototype.draw = function() {
    for (var i = 0; i < this.drawables.length; i++) {
      this.drawables[i].draw();
    }
  };

  Game.prototype.startGame = function() {
    this.running = true;
    this.startTime = this.lastNow = Date.now();
    (function loop() {
      var now = Date.now();
      var delta = now - this.lastNow;
      this.update(delta, now - this.startTime);
      this.draw();
      this.lastNow = now;
      if (this.running) {
        requestAnimationFrame(loop.bind(this));
      }
      this.FPS.update(delta);
    }.bind(this))();
  };

  Game.prototype.endGame = function() {
    //document.body.style.background = utils.getRandomColor();
  };

  // Singleton
  exports.Game = new Game();
}(this));
