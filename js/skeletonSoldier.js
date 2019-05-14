import Enemy from "./enemy.js";
import enemyDeathObserver from "./Observers/enemyDeathObserver.js";
import attackObserver from './Observers/attackObserver.js';

export default class SkeletonSoldier extends Enemy {
	constructor(x, y, el, following, healthbar, observers) {
		super(x, y, el, following, healthbar, observers);
		this.animations = {
			// idling: 'playerIdle 0.6s steps(4) infinite',
			// blocking: 'playerBlock 0.5s steps(1) infinite',
			moving: 'skeletonSoldierMove .5s steps(4) infinite',
			attacking: 'skeletonSoldierAttack .5s steps(4) infinite'
		};

		this.hp = 60;
		this.maxHP = 60;

		this.damage = 7;
	}

	clone(enemies) {
		const newSkeletonSoldierElement = document.createElement('div');
		newSkeletonSoldierElement.className = 'skeleton-soldier';
		document.querySelector('main').appendChild(newSkeletonSoldierElement);
		const newHealthbarElement = document.createElement('div');
		newHealthbarElement.className = 'healthbar';
		document.querySelector('main').appendChild(newHealthbarElement);
		return new SkeletonSoldier(this.x, this.y, newSkeletonSoldierElement, this.following, newHealthbarElement, this.observers);
	}
}