import gameObject from './gameObjects.js';

export default class Fireball extends gameObject {
	constructor(x, y, velX, velY, observers) {
		super(x, y, velX, velY);

		const fireballElement = document.createElement('div');
		fireballElement.className = 'fireball';
		this.el = document.querySelector('.objects-holder').appendChild(fireballElement);

		this.manaCost = 20;
		this.damage = 20;
		this.observers = observers;
	}
}