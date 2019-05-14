import Enemy from "./enemy.js";
import enemyDeathObserver from "./Observers/enemyDeathObserver.js";
import attackObserver from "./Observers/attackObserver.js";

export default class Wolf extends Enemy {
	constructor(x, y, el, following, healthbar, observers) {
		super(x, y, el, following, healthbar, observers);
		this.animations = {
			// idling: 'playerIdle 0.6s steps(4) infinite',
			// blocking: 'playerBlock 0.5s steps(1) infinite',
			moving: 'wolfMove .3s steps(3) infinite',
			attacking: 'wolfAttack .5s steps(6) infinite'
		};

		this.hp = 30;
		this.maxHP = 30;

		this.damage = 3;
	}

	clone(enemies) {
		const newWolfElement = document.createElement('div');
		newWolfElement.className = 'wolf';
		document.querySelector('main').appendChild(newWolfElement);
		const newHealthbarElement = document.createElement('div');
		newHealthbarElement.className = 'healthbar';
		document.querySelector('main').appendChild(newHealthbarElement);
		return new Wolf(this.x, this.y, newWolfElement, this.following, newHealthbarElement, this.observers);
	}
}