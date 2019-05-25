import gameObject from "./gameObjects.js";

export default class Sword extends gameObject {
	constructor(x, y, velX, velY, observers) {
		super(x, y, velX, velY);

		this.observers = observers;
		this.damage = 15;

		const swordElement = document.createElement('div');
		swordElement.className = 'sword';
		this.el = document.querySelector('.objects-holder').appendChild(swordElement);
	}
}