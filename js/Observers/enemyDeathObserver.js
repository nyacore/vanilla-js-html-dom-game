export default class enemyDeathObserver {
	/**
	 * 
	 * @param { Array } enemies 
	 */
	constructor(enemies, scoreObj) {
		this.enemies = enemies;
		this.scoreObj = scoreObj;
	}

	onNotify(sender, event) {
		if (event == 'ENEMY_DEAD') {
			this.scoreObj.score += 10;
			const index = this.enemies.indexOf(sender);
			document.querySelector('main').removeChild(sender.el);
			document.querySelector('main').removeChild(sender.healthbar);
			this.enemies.splice(index, 1);
		}
	}
}