import Fireball from '../GameObjects/fireball.js';
import Sword from '../GameObjects/sword.js';

import gameObjectDeathObserver from './gameObjectDeathObserver.js';

export default class fireballObserver {
	/**
	 * 
	 * @param { Array } gameObjects 
	 */
	constructor(gameObjects) {
		this.gameObjects = gameObjects;
	}

	/**
	 * 
	 * @param { import('../player').default } sender 
	 * @param { String } event 
	 */
	onNotify(sender, event) {
		if (event == 'FIREBALL_LAUNCHED') {
			sender.mp -= 20;
			this.gameObjects.push(new Fireball(sender.x + 40 * sender.direction, sender.y - 50, 10 * sender.direction, 0, [new gameObjectDeathObserver(this.gameObjects)]));
		} else if (event == 'SWORDSTORM_LAUNCHED') {
			sender.mp -= 50;
			// Spawn 4 swords
			for (let i = 0; i < 4; i++) {
				this.gameObjects.push(new Sword(
					sender.x + this.getRandomInt(100, 500),
					sender.y - this.getRandomInt(500, 1000),
					0,
					10,
					[new gameObjectDeathObserver(this.gameObjects)],
				));
			}
		}
	}

	getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}
}