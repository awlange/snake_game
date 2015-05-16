// The Menu state

var SnakeGame = SnakeGame || {};

SnakeGame.Menu = function(game) {
	var enterKey;
};

SnakeGame.Menu.prototype = {

	create: function() {
		this.game.stage.backgroundColor = '#2d2d2d';

		var title = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Snake Game');
		title.fontSize = 32;
		title.anchor.set(0.5, 0.5);
		title.align = 'center';
		title.fill = '#fefefe';

		var press = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 40, 'press Enter to start');
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