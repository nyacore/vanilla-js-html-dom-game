import Sword from './sword.js';
import gameObject from './gameObjects.js';

export default class SwordStorm extends gameObject {
	constructor(x, y, velX, velY, observers) {
		super(x, y, velX, velY);

		this.swords = [];
		for (let i = 0; i < 4; i++) {
			this.swords[i] = 
		}

		const fireballElement = document.createElement('div');
		fireballElement.className = 'fireball';
		this.el = document.querySelector('main').appendChild(fireballElement);

		this.manaCost = 20;
		this.damage = 20;
		this.observers = observers;
	}
}