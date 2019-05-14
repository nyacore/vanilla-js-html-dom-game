/**
 * Basic JavaScript side-scroller game
 * Author: Kalistratov Maxim
 * Date: 05.2019
 *
 * TODO:
 * - Welcome screen 
 * - Endgame condition
 * - Final screen
 * - SwordStorm skill
 */

import Player from './player.js';
import Camera from './camera.js';

import attackObserver from './Observers/attackObserver.js';
import enemyDeathObserver from './Observers/enemyDeathObserver.js';
import fireballObserver from './Observers/fireballObserver.js';

import Spawner from './spawner.js';

import Wolf from './wolf.js';
import Skeleton from './skeleton.js';
import SkeletonSoldier from './skeletonSoldier.js';

/**
 * Setting up some global constants and exporting it so 
 * any file may export it and use
 */

export const globals = {
	SCREEN_WIDTH: 1024,
	SCREEN_HEIGHT: 768,

	MAP_WIDTH: 1536,

	PLAYER_WIDTH: 150,
	PLAYER_HEIGHT: 111,

	WOLF_WIDTH: 120,
	WOLF_HEIGHT: 59,

	FPS: 60,
};

/**
 * Get UI elements from DOM
 */
const playerNameBar = document.querySelector('.player-name');
const hpBar = document.querySelector('.hp');
const mpBar = document.querySelector('.mp');
const gameScoreBar = document.querySelector('.score');
let scoreObj = { score: 0 };
/**
 * Timer for update function
 */
let gameTimer;
/**
 * Timer for enemy spawner
 */
let spawnTimer;
/**
 * Timer to count time passed since the start of the game
 */
let gameCounterTimer;
let timePassed = 0;
const timerBarElement = document.querySelector('.game-timer');
/**
 * Timer for player HP and MP regeneration
 */
let regenerationTimer;

/**
 * Observer which receives notification each time player attacks
 */
let attackingObserver;

/**
 * Observer which creates fireballs
 */
let fireballPlayerObserver;

/**
 * Player handler
 * @type { Player }
 */
let player;

/**
 * Camera handler
 * @type { Camera }
 */
let camera;

/**
 * An array for game objects.
 * @type { Array }
 */
let gameObjects = [];

/**
 * An array for enemies
 * @type { Array }
 */
let enemies = [];

let wolfPrototype;
let skeletonPrototype;
let skeletonSoldierPrototype;

let wolfSpawner;
let skeletonSpawner;
let skeletonSoldierSpawner;

/**
 * Function for game objects setup, such as player, enemies and main game loops
 */
const setup = () => {

	camera = new Camera(0,
		document.querySelector('main'));

	player = new Player(0,
		globals.SCREEN_HEIGHT - globals.PLAYER_WIDTH - 20,
		document.querySelector('.player'),
		camera); // Spawn player handler at the left side of the screen
	// Height is hardcoded bc the player path is strictly horizontal and player's y coordinate never changes

	wolfPrototype = new Wolf(
		globals.MAP_WIDTH - 150,
		globals.SCREEN_HEIGHT - globals.PLAYER_WIDTH,
		document.querySelector('.wolf'),
		player,
		document.querySelector('.healthbar'),
		[
			new enemyDeathObserver(enemies, scoreObj),
			new attackObserver(player, enemies),
		]);

	skeletonPrototype = new Skeleton(
		globals.MAP_WIDTH - 150,
		globals.SCREEN_HEIGHT - 5 / 4 * globals.PLAYER_WIDTH,
		document.querySelector('.skeleton'),
		player,
		document.querySelector('.healthbar'),
		[
			new enemyDeathObserver(enemies, scoreObj),
			new attackObserver(player, enemies),
		]);

	skeletonSoldierPrototype = new SkeletonSoldier(
		globals.MAP_WIDTH - 150,
		globals.SCREEN_HEIGHT - 5 / 4 * globals.PLAYER_WIDTH,
		document.querySelector('.skeleton-soldier'),
		player,
		document.querySelector('.healthbar'),
		[
			new enemyDeathObserver(enemies, scoreObj),
			new attackObserver(player, enemies),
		]);

	wolfSpawner = new Spawner(wolfPrototype);
	skeletonSpawner = new Spawner(skeletonPrototype);
	skeletonSoldierSpawner = new Spawner(skeletonSoldierPrototype);

	/**
 	 * Function which randomly spawns monsters
 	 */
	const spawnMonster = () => {
		const chance = Math.floor(Math.random() * 3);
		switch (chance) {
			case 0:
				enemies.push(wolfSpawner.spawnMonster(enemies));
				break;
			case 1:
				enemies.push(skeletonSpawner.spawnMonster(enemies));
				break;
			case 2:
				enemies.push(skeletonSoldierSpawner.spawnMonster(enemies));
		}
	}

	attackingObserver = new attackObserver(player, enemies);
	fireballPlayerObserver = new fireballObserver(gameObjects);

	player.addObserver(attackingObserver);
	player.addObserver(fireballPlayerObserver);

	gameTimer = setInterval(update, 1000 / globals.FPS);
	spawnTimer = setInterval(spawnMonster, 5000);
	gameCounterTimer = setInterval(() => {
		timePassed++;
		let hours = Math.floor(timePassed / 3600);
		let minutes = Math.floor(timePassed % 3600 / 60);
		let seconds = timePassed % 3600 % 60;

		timerBarElement.innerHTML =
			(hours < 10 ? `0${hours}` : `${hours}`) + ':' +
			(minutes < 10 ? `0${minutes}` : `${minutes}`) + ':' +
			(seconds < 10 ? `0${seconds}` : `${seconds}`);
	}, 1000);
	regenerationTimer = setInterval(() => {
		player.hp = Math.min(100, player.hp + 5);
		player.mp = Math.min(100, player.mp + 5);
	}, 1000);


	spawnMonster();
}

/**
 * Function for updating each game object
 */
const update = () => {
	player.update(camera);

	enemies.forEach(e => e.update(camera));
	gameObjects.forEach(o => o.update(camera, enemies));

	hpBar.style.width = 100 * player.hp / player.maxHP + 'px';
	mpBar.style.width = 100 * player.mp / player.maxMP + 'px';
	gameScoreBar.innerHTML = scoreObj.score;
}

/**
 * Game entry point
 */
setup();