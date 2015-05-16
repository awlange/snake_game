// Game Over screen

var SnakeGame = SnakeGame || {};

SnakeGame.GameOver = function(game) {
	var enterKey;
};

SnakeGame.GameOver.prototype = {

	create: function() {
		var title = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 40, 'Game Over');
		title.fontSize = 36;
		title.anchor.set(0.5, 0.5);
		title.align = 'center';
		title.fill = '#fefefe';

		var score = SnakeGame.game.state.states.Play.score;
		var press = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Score: ' + score);
		press.fontSize = 24;
		press.anchor.set(0.5, 0.5);
		press.align = 'center';
		press.fill = '#fefefe';

		var press = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 40, 'press Enter to play again');
		press.fontSize = 12;
		press.anchor.set(0.5, 0.5);
		press.align = 'center';
		press.fill = '#fefefe';

		this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
	},

	update: function() {
		if (this.enterKey.isDown) {
			this.state.start('Play');
			//console.log('play');
		}
	}
};