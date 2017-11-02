// Sets screen boundaries for the player and the enemies
var boundaries = {
    bottom: this.y = 375,
    top: this.y = 55,
    left: this.x = 0,
    right: this.x = 400,
    enemyRight: this.x = 500
};


// Enemies our player must avoid
var Enemy = function(y) {
    // Starting x position for the bugs
    this.x = -100;
    // The y posisiton is determined when the bugs are instantianted on line 86
    this.y = y;
    // The image of the bugs
    this.sprite = 'images/enemy-bug.png';
    // The speed of the bugs
    this.speed = Math.floor(Math.random() * (300 - 100)) + 100;
};

// Update the enemy's position
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;
    // Makes the bugs go back to the left side of the screen when they reach the right side
    if (this.x >= boundaries.enemyRight) {
        this.x = -10;
    };
    // Handles the enemy/player collision
    if (this.x > player.x - 50 && this.x < player.x + 50 && this.y > player.y - 50 && this.y < player.y + 50) {
        console.log(this.y)
        player.x = 200;
        player.y = 375;
    };
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player classes
var Player = function() {
    // Starting position of the player
    this.x = 200;
    this.y = 375;
    // Image of the player
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    // Updates the players posotion
    this.xNow = this.x;
    this.yNow = this.y;

};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handles the key presses and moves the player left, right, up, or down
// Does not allow the player to cross the boundaries
Player.prototype.handleInput = function(key) {
    if (key === 'left' && this.x != boundaries.left) {
        this.x = this.x - 100;
    } else if (key === 'right' && this.x != boundaries.right) {
        this.x = this.x + 100;
    } else if (key === 'up' && this.y != boundaries.top) {
        this.y = this.y - 80;
    }
    //Displays a message and reset the player when it reaches the other end of the board 
    else if (key === 'up' && this.y === boundaries.top) {
        this.x = 200;
        this.y = 375;
        alert("You did it!");
    } else if (key === 'down' && this.y != boundaries.bottom) {
        this.y = this.y + 80;
    }
}

// Place all enemy objects in an array called allEnemies

var allEnemies = [new Enemy(50), new Enemy(130), new Enemy(210), ];

// Place the player object in a variable called player

var player = new Player();


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