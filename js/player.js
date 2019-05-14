// import globals from './game';
import Entity from './entity.js';
import KeyboardControl from './Behaviors/keyboardcontrol.js';
import CameraMovement from './Behaviors/cameramovement.js';

/**
 * @extends Entity
 */
export default class Player extends Entity {
	constructor(x, y, el, camera) {
		super(x, y, el);
		this.speed = 5;
		this.scale = 3;
		this.offset = 30;

		this.hp = 100;
		this.maxHP = 100;
		this.mp = 100;
		this.maxMP = 100;

		this.damage = 15;

		this.animations = {
			idling: 'playerIdle 0.4s steps(4) infinite',
			blocking: 'playerBlock 0.4s steps(1) infinite',
			moving: 'playerMove 0.5s steps(6) infinite',
			attacking: 'playerAttack 0.7s steps(5) infinite'
		};

		this.behaviors.push(
			new KeyboardControl(this),
			new CameraMovement(this, camera),
		);
	}
}