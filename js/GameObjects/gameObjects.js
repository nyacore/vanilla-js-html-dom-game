import { globals } from '../game.js';

export default class gameObject {
	constructor(x, y, velX, velY) {
		this.x = x;
		this.y = y;

		this.observers = [];

		this.velX = velX;
		this.velY = velY;
	}

	notify(sender, event) {
		this.observers.forEach(o => o.onNotify(sender, event));
	}

	/**
	 * 
	 * @param { import('../camera').default } camera 
	 */
	update(camera, enemies) {
		this.x = this.x + this.velX;
		this.y = this.y + this.velY;

		if (this.x >= globals.MAP_WIDTH || this.y >= globals.MAP_HEIGHT) {
			this.notify(this, 'GAMEOBJECT_DIED');
		}


		// МАГИЯ НЕ ТРОГАТЬ
		const offset1 = this.x - 20;
		const offset2 = this.x + 120;



		enemies.forEach(e => {
			if (e.x >= offset1 && e.x <= offset2 && e.y >= this.y - 100 && e.y <= this.y + 100) {
				e.hp -= this.damage;
			}
		});

		this.el.style.left = `${this.x - camera.x}px`;
		this.el.style.top = `${this.y}px`;
	}
}