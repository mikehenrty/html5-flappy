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
    this.overlay = document.getElementById('overlay');


    this.imageLoader = new ImageLoader(images);
    this.imageLoader.loadAll(this.startGame.bind(this));

    this.bird = new Bird(this.stage);

    var tapEvent = 'ontouchstart' in window ? 'touchstart' : 'mousedown';
    this.overlay.addEventListener(tapEvent, function(evt) {
      this.bird.flap();
      evt.stopPropagation();
      evt.preventDefault();
    }.bind(this), true);


    var distanceBetweenPipes = 220;
    this.pipes = [];

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
    // this.collider = new Collider(this.bird);
    this.pipes.forEach(function(pipe) {
      //this.collider.addObject(pipe);
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
    //this.collider.update(delta, deltaAll);
  };

  /**
   * render game objects
   */
  Game.prototype.draw = function() {
    for (var i = 0; i < this.drawables.length; i++) {
      //this.drawables[i].draw();
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
