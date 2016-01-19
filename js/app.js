// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite     = 'images/enemy-bug.png';
    this.x          = x;
    this.y          = y;
    this.speed      = speed;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //return dt;

    this.x += this.speed * dt;

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(sprite, x, y){

    this.sprite = sprite;
    this.x = x;
    this.y = y;  
};

Player.prototype.update = function(){

    if(this.y == '-36'){
        this.x = initPlayerx;
        this.y = initPlayery;
        console.log("hero has reached the water!");
    }
    
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Player.prototype.handleInput = function(key){
   
    switch(key){

        case "left":
            if(this.x != 4){

                this.x-=101;

            }
        break;

        case "right":
            if(this.x != 804){

                this.x+=101;
                
            }
        break;

        case "up":
            if(this.y != '-50'){
                this.y-=83;
            }
        break;

        case "down":
            if(this.y != 545){
                this.y+=83;
            }
        break;     
       
    }
    console.log("x:" + this.x + " / y:" + this.y);
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


var initPlayerx = 404;
var initPlayery = 545;

var player = new Player('images/char-cat-girl.png', initPlayerx, initPlayery);

var enemy1 = new Enemy(2, 47, 60);
//var enemy2 = new Enemy(100, 140, 60);
//var enemy3 = new Enemy(-20, 220, 60);
//var enemy4 = new Enemy(300, 380, 60);

var allEnemies = [enemy1/*, enemy2, enemy3, enemy4*/];


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
