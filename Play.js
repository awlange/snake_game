// Game play

var SnakeGame = SnakeGame || {};

SnakeGame.Play = function(game) {
	var enterKey;
	var cursors;
	var box_height;
	var box_width;
	var grid_height;
	var grid_width;
	var apple;
	var snake;
	var lastUpdate;
	var updateSpeed;
	var dx;
	var dy;
	var vx;
	var vy;
	var growSnake;
	var score;
	var gridPointsLeft;
};

SnakeGame.Play.prototype = {

	preload: function() {
		this.game.load.image('box_white', 'box_white.png');
		this.game.load.image('box_red', 'box_red.png');
	},

	create: function() {
		this.box_width = 10;
		this.box_height = 10;
		this.updateSpeed = 80;
		this.score = 0;  // apples eaten

		// debugging
		this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

		// Add some controls to play the game with
	    this.cursors = this.game.input.keyboard.createCursorKeys();

	    // Compute grid size
	    this.grid_width = this.game.world.width / this.box_width;
	    this.grid_height = this.game.world.height / this.box_height;

	    // Create the snake
	    this.snake = [];
	    for (var i = 0; i < 4; i++) {
	    	this.snake.push(this.game.add.sprite((3+i) * this.box_width, 3 * this.box_height, 'box_white'));
	    }
	    // Initial velocity
	    this.vx = this.box_width;
	    this.vy = 0;
	    this.growSnake = false;

	    // Add an apple
	    this.apple = this.game.add.sprite(0, 0, 'box_red');
	    this.moveAppleRandom();

	    // Rate control
	    this.lastUpdate = this.getTimeStamp();
	},

	update: function() {
		// Debugging
		if (this.enterKey.isDown) {
			this.gameOver();
		}

		// Always capture cursor input if possible, but not necessarily move.
		this.getSnakeMoveDirection();

		// Step controlled frame rate trick
	    if((this.getTimeStamp() - this.lastUpdate) < this.updateSpeed) {
		    // Do not update yet
		    return;
		}
		// Update now
		this.lastUpdate = this.getTimeStamp();

		this.moveSnake();
		if (this.isSnakeOutOfBounds() || this.isSnakeHeadOverlappingSnake()) {
			this.gameOver();
		}
		this.checkAppleEaten();
	},

	moveAppleRandom: function() {
		// Move randomly until we don't have any collisions. May get slow when not many spots left.
		// Alternative is to maintain a list of open grid spaces and select randomly from it. TODO
		do {
			this.apple.x = this.game.rnd.integerInRange(0, this.grid_width-1) * this.box_width;
			this.apple.y = this.game.rnd.integerInRange(0, this.grid_height-1) * this.box_height;
		} while (this.isAppleOverlappingSnake());
	},

	checkAppleEaten: function() {
		if (this.isAppleOverlappingSnake()) {
			this.moveAppleRandom();
			this.growSnake = true;
			this.score += 1;
		}
	},

	isAppleOverlappingSnake: function() {
		for (var i = 0; i < this.snake.length; i++) {
			if (this.isOverlapping(this.apple, this.snake[i])) {
				return true;
			}
		}
		return false;
	},

	isSnakeHeadOverlappingSnake: function() {
		// Compare head to all other segments of the snake
		var head = this.getSnakeHead();
		for (var i = 0; i < this.snake.length-1; i++) {
			if (this.isOverlapping(head, this.snake[i])) {
				return true;
			}
		}
		return false;
	},

	isOverlapping: function(obj1, obj2) {
		return obj1.x === obj2.x && obj1.y === obj2.y;
	},

	getSnakeHead: function() {
		return this.snake[this.snake.length - 1];
	},

	getSnakeMoveDirection: function() {
 		// Only allow one directional movement
 		this.dy = 0;
 		this.dx = 0;
		if (this.cursors.up.isDown) {
			this.dy = -this.box_height;
		}
		else if (this.cursors.down.isDown) {
			this.dy = this.box_height;
		}
		else if (this.cursors.right.isDown) {
			this.dx = this.box_width;
		}
		else if (this.cursors.left.isDown) {
			this.dx = -this.box_width;
		}

		// Update velocity if cursor was pushed in a legal direction (no backwards motion)
		if (this.dy != 0 && this.dy != -this.vy) {
			this.vy = this.dy;
			this.vx = 0;
		}
		if (this.dx != 0 && this.dx != -this.vx) {
			this.vx = this.dx;
			this.vy = 0;
		}
	},

 	moveSnake: function() {
		// Add new head at moved to position per the velocity
		var head = this.getSnakeHead();
		this.snake.push(this.game.add.sprite(head.x + this.vx, head.y + this.vy, 'box_white'));

		// Remove tail
		// But, if apple was just eaten, do not so that the snake increases in size.
		if (!this.growSnake) {
			var tail = this.snake.shift();
			tail.destroy();
		}
		this.growSnake = false;
	},

	isSnakeOutOfBounds: function() {
		// Only checking head should be sufficient
		var head = this.getSnakeHead();
		return !(head.x >= 0 && head.x < this.game.world.width && head.y >= 0 && head.y < this.game.world.height);
	},

	gameOver: function() {
		this.state.start('GameOver');
	},

	getTimeStamp: function() {
		return new Date().getTime();
	}
};