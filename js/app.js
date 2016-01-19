// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite     = 'images/enemy-bug.png';
    this.x          = x;
    this.y          = y;

    this.initX      = x;
    this.initY      = y;  

    this.speed      = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //return dt;

    if( this.x >= 909){
        this.enemyReset();
    }
    
    this.x += this.speed * dt;
   
    

   // }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.enemyReset = function(){
    
        this.x = this.initX;

}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(sprite, x, y){

    this.sprite     = sprite;

    this.x          = x;
    this.y          = y; 

    this.initPlayX  = x;
    this.initPlayY  = y;  
};

Player.prototype.update = function(){

    if (this.x < 0) {

        this.x = 0;

    } else if (this.x > 808){

        this.x = 808;

    }  else if (this.y < -40 ){

        this.y = -40;

    } else if (this.y > 545){

        this.y = 545;

    } else if( this.y <= 0 && this.x <= 808){

        console.log("Hero has reached the water!");
        this.playerReset();

    } else if (this.collide()) {

        this.playerReset();
    }
}


Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key){
   
   //switch and case for key stroke movement
    switch(key){

        case "left":

                this.x-=101;
        break;

        case "right":
                this.x+=101;
        break;

        case "up":
                this.y-=83;
        break;

        case "down":
                this.y+=83;
        break;     
       
    }
    console.log("x:" + this.x + " / y:" + this.y);
};

//Collision functtion
Player.prototype.collide = function (){

    for(var i=0; i < allEnemies.length; i++){

        if (this.x < allEnemies[i].x + 50 &&
            this.x + 50 > allEnemies[i].x &&
            this.y < allEnemies[i].y + 50 &&
            this.y + 50 > allEnemies[i].y){

            this.playerReset();
            console.log("Hero has collided with bug!");

        }
    }
}
Player.prototype.blocked = function(){
    
    for(var i=0; i < allObstacles.length; i++){

        if(this.x == allObstacles[i].x && this.y == allObstacles[i].y){
            
            this.playerReset();
            console.log("hero collided with Obstacle");
        }

    }

}

//Reset player to initial starting point
Player.prototype.playerReset = function(){

    this.x = this.initPlayX;
    this.y = this.initPlayY;

}

//Create obstacle object
var Obstacle = function(x, y){

    this.obj = 'images/rock.png';
    this.x = x;
    this.y = y;

}
//render obstacle
Obstacle.prototype.render = function(){
    ctx.drawImage(Resources.get(this.obj), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Create New Player
var player = new Player('images/char-cat-girl.png', 404, 545);

// Create a few enemies
var enemy1 = new Enemy(2, 47, 80);
var enemy2 = new Enemy(-50, 140, 100);
var enemy3 = new Enemy(-100, 220, 60);
var enemy4 = new Enemy(-20, 380, 120);

// Build array for enemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4];

// Create a few obstacles
var obstacle1 = new Obstacle(0, 296);
var obstacle2 = new Obstacle(202, 296);
var obstacle3 = new Obstacle(404, 296);
var obstacle4 = new Obstacle(606, 296);
var obstacle5 = new Obstacle(808, 296);

// Build array for obstacles
var allObstacles = [obstacle1, obstacle2, obstacle3, obstacle4, obstacle5];

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
