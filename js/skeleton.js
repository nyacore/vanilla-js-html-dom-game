import Enemy from "./enemy.js";
import enemyDeathObserver from "./Observers/enemyDeathObserver.js";
import attackObserver from './Observers/attackObserver.js';

export default class Skeleton extends Enemy {
	constructor(x, y, el, following, healthbar, observers) {
		super(x, y, el, following, healthbar, observers);
		this.animations = {
			// idling: 'playerIdle 0.6s steps(4) infinite',
			// blocking: 'playerBlock 0.5s steps(1) infinite',
			moving: 'skeletonMove .5s steps(4) infinite',
			attacking: 'skeletonAttack .5s steps(4) infinite'
		};

		this.hp = 60;
		this.maxHP = 60;

		this.damage = 5;
	}

	clone(enemies) {
		const newSkeletonElement = document.createElement('div');
		newSkeletonElement.className = 'skeleton';
		document.querySelector('.objects-holder').appendChild(newSkeletonElement);
		const newHealthbarElement = document.createElement('div');
		newHealthbarElement.className = 'healthbar';
		document.querySelector('.objects-holder').appendChild(newHealthbarElement);
		return new Skeleton(this.x, this.y, newSkeletonElement, this.following, newHealthbarElement, this.observers);
	}
}