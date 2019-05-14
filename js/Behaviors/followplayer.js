import Behavior from './behavior.js';

import { globals } from '../game.js';

export default class FollowPlayer extends Behavior {
	constructor(entity, following) {
		super(entity);

		this.following = following;

		this.attackTimer = false;
	}

	dist(a, b) {
		return Math.abs(a - b);
	}

	update() {
		// МАГИЯ НЕ ТРОГАТЬ
		const playerCenter = this.following.x + globals.PLAYER_WIDTH / 2;
		const offset1 = playerCenter - 200;
		const offset2 = playerCenter - 20;

		if (this.entity.x >= offset1 && this.entity.x <= offset2) {
			this.entity.enterState({ name: 'attacking' });
			if (!this.attackTimer) {
				this.attackTimer = setTimeout(() => {
					clearInterval(this.attackTimer);
					this.entity.notify(this.entity, 'ENEMY_ATTACK_FINISHED');
					this.attackTimer = false;
					this.entity.changeState({ name: 'moving' });
				}, 500);
			}
		} else if (this.entity.x < this.following.x) {
			this.entity.enterState({ name: 'moving' });
			this.entity.direction = 1;
		} else if (this.entity.x > this.following.x) {
			this.entity.enterState({ name: 'moving' });
			this.entity.direction = -1;
		}
	}
}