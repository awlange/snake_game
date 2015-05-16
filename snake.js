/*
 * Snake game, take 2
 */

var SnakeGame = SnakeGame || {};

SnakeGame.game = new Phaser.Game(400, 300, Phaser.AUTO, '');

// Game states
SnakeGame.game.state.add('Menu', SnakeGame.Menu);
SnakeGame.game.state.add('Play', SnakeGame.Play);
SnakeGame.game.state.add('GameOver', SnakeGame.GameOver);

// Start the game at the menu
SnakeGame.game.state.start('Menu');