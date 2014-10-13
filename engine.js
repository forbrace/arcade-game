var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        patterns = {},
        lastTime;

    canvas.width = game.WIDTH;
    canvas.height = game.HEIGHT;

    doc.body.appendChild(canvas);

    function main() {
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        update(dt);
        render();

        lastTime = now;
        win.requestAnimationFrame(main);
    };

    function init() {

        reset();
        lastTime = Date.now();
        main();
    }

    function update(dt) {
        updateEntities(dt);
        checkCollisions();
    }
    
    function checkCollisions() {
      for (var i = 0, l = allEnemies.length; i < l; i++) {

        if (collided(player, allEnemies[i])) {
          player.setLocation(player.initLocation);
        }
        
        function collided(player, enemy) {
          // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
          var playerRect = {
            x:      player.rect.x,
            y:      player.rect.y,
            width:  player.rect.width,
            height: player.rect.height
          };
          var enemyRect  = {
            x:      enemy.rect.x,
            y:      enemy.rect.y,
            width:  enemy.rect.width,
            height: enemy.rect.height
          }
          if (playerRect.x < enemyRect.x + enemyRect.width &&
              playerRect.x + playerRect.width > enemyRect.x &&
              playerRect.y < enemyRect.y + enemyRect.height &&
              playerRect.height + playerRect.y > enemyRect.y) {
              // collision detected!
              return true;
          }
          
        }
        
      }
    }

    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update(dt);
    }

    function render() {
        var rowImages = [
                'images/water-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/grass-block.png',
                'images/grass-block.png'
            ],
            numRows = game.rows,
            numCols = game.cols,
            row, col;

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * game.CELL_WIDTH, row * game.CELL_HEIGHT);
            }
        }

        renderEntities();
    }

    function renderEntities() {
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        player.render();
    }

    function reset() {
        // noop
    }

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png'
    ]);
    Resources.onReady(init);

    global.ctx = ctx;
})(this);
