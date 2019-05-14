import Fireball from '../GameObjects/fireball.js';

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

		}
	}
}