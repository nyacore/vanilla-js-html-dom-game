import { globals } from './game.js';

export default class Entity {
	constructor(x, y, el) {
		/**
		 * @type { Number } this.x
		 */
		this.x = x;
		this.y = y;
		this.el = el;

		this.healthbar = null;

		this.el.style.display = 'block';

		this.behaviors = [];
		this.observers = [];

		this.direction = 1; // 1 for right, -1 for left

		this.states = [
			{
				name: 'moving',
				to: ['attacking', 'idling', 'blocking']
			},
			{
				name: 'idling',
				to: ['attacking', 'moving', 'blocking']
			},
			{
				name: 'attacking',
				to: []
			},
			{
				name: 'blocking',
				to: ['idling', 'moving', 'attacking']
			}
		];

		this.debugging = false;

		this.state = this.states[0];
	}

	addObserver(observer) {
		this.observers.push(observer);
	}

	changeState(state) {
		this.state = this.states.find((e) => {
			return e.name == state.name;
		});
	}

	notify(sender, event) {
		this.observers.forEach(o => o.onNotify(sender, event));
	}

	enterState(state) {
		const stateToEnter = this.state.to.find(e => e == state.name);

		if (stateToEnter) {
			this.changeState({ name: state.name });
		}
	}

	update(camera) {
		this.behaviors.forEach(b => b.update());

		if (this.hp <= 0) {
			this.notify(this, 'ENEMY_DEAD');
		}

		switch (this.state.name) {
			case 'idling':
				this.el.style.animation = this.animations.idling;
				break;
			case 'moving':
				this.el.style.animation = this.animations.moving;
				this.el.style.transform = `scale(${this.scale * this.direction}, ${Math.abs(this.scale)})`;
				this.x += this.speed * this.direction;
				if (this.x < 0) { this.x = 0; }
				if (this.x > globals.MAP_WIDTH - globals.PLAYER_WIDTH / 2) { this.x = globals.MAP_WIDTH - globals.PLAYER_WIDTH / 2; }
				break;
			case 'attacking':
				this.el.style.animation = this.animations.attacking;
				break;
			case 'blocking':
				this.el.style.animation = this.animations.blocking;
				break;
		}

		if (this.healthbar) {
			this.healthbar.style.left = this.x - camera.x + 'px';
			this.healthbar.style.top = this.y - 50 + 'px';
			this.healthbar.style.width = 100 * this.hp / this.maxHP + 'px';
		}

		this.el.style.left = this.x - camera.x + 'px';
		this.el.style.top = this.y + 'px';

		if (this.debugging) {
			this.el.style.border = '1px solid black';
		}
	}
}