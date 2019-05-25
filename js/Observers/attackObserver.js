import { globals } from '../game.js';

export default class attackObserver {
	constructor(player, enemies) {
		this.enemies = enemies;
		this.player = player;
	}

	onNotify(sender, event) {
		if (event == 'ATTACK_FINISHED') {


			// МАГИЯ НЕ ТРОГАТЬ
			const playerCenter = sender.x + globals.PLAYER_WIDTH / 2;
			const offset1 = playerCenter - 200;
			const offset2 = playerCenter - 20;

			this.enemies.forEach(e => {
				if (e.x >= offset1 && e.x <= offset2) {
					e.hp -= sender.damage;
				}
			});
		} else if (event == 'ENEMY_ATTACK_FINISHED') {
			const offset1 = sender.x - 20;
			const offset2 = sender.x + 170;

			const playerCenter = sender.x + globals.PLAYER_WIDTH / 2;


			if (playerCenter >= offset1 && playerCenter <= offset2) {
				if (this.player.state.name != 'blocking') {
					this.player.hp -= sender.damage;
					console.log(this.player.hp);
				}
			}
		}
	}
}