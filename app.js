var game = {};

game.X = 0; // x coordinate
game.Y = 0; // x coordinate
game.cols = 8;
game.rows = 6;

game.CELL_WIDTH = 101; // cell width
game.CELL_HEIGHT = 83; // cell height
game.CELL_OFFSET = 20; // player position cell offset

game.WIDTH = game.CELL_WIDTH * game.cols; // game canvas width
game.HEIGHT = game.CELL_HEIGHT * game.rows + 90; // game canvas height
game.TRACK_WIDTH = game.CELL_WIDTH * game.cols; // enemy track length
game.TRACK_OFFSET = -game.CELL_WIDTH; // enemy track start    
    
// Enemies our player must avoid
var Enemy = function(options) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    
    var options = options || {};
    
    this.sprite = 'images/enemy-bug.png';
    
    // enemy rect
    this.rect = {
      x: options.startX || game.TRACK_OFFSET,
      y: options.startY || game.CELL_HEIGHT - game.CELL_OFFSET,
      width: game.CELL_WIDTH,
      height: game.CELL_HEIGHT
    };
    
    // enemy speed
    this.speed = options.speed || 50;
    
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    // if the game is over stop enemy at last x position
    // else move enemy from track start to track end infinitely
    
    ctx.clearRect(0,0,ctx.canvas.clientWidth,ctx.canvas.clientHeight);
    
    this.rect.x = this.rect.x > game.TRACK_WIDTH ? 
                  game.TRACK_OFFSET : 
                  this.rect.x + this.speed * dt;
    
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.rect.x, this.rect.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-boy.png';
  
  // player rect
  this.rect = {
    x: game.CELL_WIDTH * 4, // initial x position
    y: game.CELL_HEIGHT * 5 - game.CELL_OFFSET, // bottom row, initial y position
    width: game.CELL_WIDTH,
    height: game.CELL_HEIGHT
  };
  
  // player initial location
  this.initLocation = {
    x: game.CELL_WIDTH * 4,
    y: game.CELL_HEIGHT * 5 - game.CELL_OFFSET
  };
  
  // location setter
  this.setLocation = function(newLocation) {
    this.rect.x = newLocation.x;
    this.rect.y = newLocation.y;
  };
  
};

Player.prototype.update = function(dt) {
  
  ctx.clearRect(0,0,ctx.canvas.clientWidth,ctx.canvas.clientHeight);
  
  var that = this;
  
  var inTheWater = (this.rect.y === -game.CELL_OFFSET);
  
  if (inTheWater) {
    restartGame();
  }
  
  function restartGame() {
    
    ctx.clearRect(0,0,ctx.canvas.clientWidth,ctx.canvas.clientHeight);
    
    that.rect.x = that.initLocation.x;
    that.rect.y = that.initLocation.y;
  }
  
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.rect.x, this.rect.y);;
};

Player.prototype.handleInput = function(key) {
  
  ctx.clearRect(0,0,ctx.canvas.clientWidth,ctx.canvas.clientHeight);
  
  switch (key) {
  case 'down':
    this.rect.y = this.rect.y === this.initLocation.y ? 
                  this.initLocation.y : 
                  this.rect.y + game.CELL_HEIGHT;
    break;
  case 'up':
    this.rect.y = this.rect.y === -game.CELL_OFFSET ?
                  -game.CELL_OFFSET :
                  this.rect.y - game.CELL_HEIGHT;
    break;
  case 'left':
    this.rect.x = this.rect.x === game.X ?
                  game.X :
                  this.rect.x - game.CELL_WIDTH;
    break;
  case 'right':
    this.rect.x = this.rect.x === game.WIDTH - game.CELL_WIDTH ?
                  game.WIDTH - game.CELL_WIDTH :
                  this.rect.x + game.CELL_WIDTH;
    break;
  default:
    break;
  }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(
  {
    startX: game.TRACK_OFFSET,
    startY: game.CELL_HEIGHT - game.CELL_OFFSET,
    speed: 50
  }
);
var enemy2 = new Enemy(
  {
    startX: game.TRACK_OFFSET*5,
    startY: game.CELL_HEIGHT*2 - game.CELL_OFFSET,
    speed: 70
  }
);
var enemy3 = new Enemy(
  {
    startX: game.TRACK_OFFSET*4,
    startY: game.CELL_HEIGHT*3 - game.CELL_OFFSET,
    speed: 90
  }
);
var enemy4 = new Enemy(
  {
    startX: game.TRACK_OFFSET*2,
    startY: game.CELL_HEIGHT*4 - game.CELL_OFFSET,
    speed: 60
  }
);
var player = new Player();
var allEnemies = [enemy1, enemy2, enemy3, enemy4];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});