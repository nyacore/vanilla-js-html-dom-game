import Behavior from './behavior.js';

/**
 * @extends Behavior
 */
export default class KeyboardControl extends Behavior {
	/**
	 * @typedef { import('../entity').default } Entity
	 * @param { Entity } entity - Entity which is bound to behavior
	 */
	constructor(entity) {
		super(entity);
		// 39 - RIGHT_ARROW
		// 40 - DOWN_ARROW
		// 37 - LEFT ARROW
		// 38 - UP ARROW

		// 49 - 1
		// 50 - 2
		// 51 - 3
		// 52 - 4
		this.keyState = [];

		this.attackTimer = false;

		this.isFireballReady = true;
		this.fireballTimer;

		this.isSwordStormReady = true;
		this.swordStormTimer;

		window.addEventListener('keydown', (event) => {
			this.keyState[event.which] = true;
		});

		window.addEventListener('keyup', (event) => {
			this.keyState[event.which] = false;
		});
	}

	update() {
		if (this.keyState[52]) {
			if (this.isSwordStormReady) {
				this.entity.notify(this.entity, 'SWORDSTORM_LAUNCHED');
				this.isSwordStormReady = false;
				let timeLeft = 15;

				this.swordStormTimer = setInterval(() => {
					document.querySelector('.swordstorm-cd').innerHTML = timeLeft--;

				}, 1000);

				setTimeout(() => {
					clearInterval(this.swordStormTimer);
					this.isSwordStormReady = true;
					document.querySelector('.swordstorm-cd').innerHTML = 'Ready';
				}, 15000);
			}
		}

		if (this.keyState[51]) {
			if (this.isFireballReady) {
				this.entity.notify(this.entity, 'FIREBALL_LAUNCHED');
				this.isFireballReady = false;
				let timeLeft = 4;


				this.fireballTimer = setInterval(() => {
					document.querySelector('.fireball-cd').innerHTML = timeLeft--;
				}, 1000);

				setTimeout(() => {
					clearInterval(this.fireballTimer);
					this.isFireballReady = true;
					document.querySelector('.fireball-cd').innerHTML = 'Ready';
				}, 5000);
			}
		}

		if (this.keyState[49]) {
			this.entity.enterState({ name: 'attacking' });
			if (!this.attackTimer) {
				this.attackTimer = setTimeout(() => {
					this.entity.changeState({ name: 'idling' });
					this.entity.notify(this.entity, 'ATTACK_FINISHED');
					clearInterval(this.attackTimer);
					this.attackTimer = false;
				}, 700);
			}
		} else if (this.keyState[50]) {
			this.entity.enterState({ name: 'blocking' });
		} else if (this.keyState[39]) {
			this.entity.direction = 1;
			this.entity.enterState({ name: 'moving' });
		} else if (this.keyState[37]) {
			this.entity.direction = -1;
			this.entity.enterState({ name: 'moving' });
		} else {
			this.entity.enterState({ name: 'idling' });
		}
	}
}