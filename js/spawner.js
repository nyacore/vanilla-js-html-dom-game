export default class Spawner {
	/**
	 * 
	 * @param { import('./enemy').default } prototype 
	 */
	constructor(monsterPrototype) {
		this.monsterPrototype = monsterPrototype;
	}

	spawnMonster(enemies) {
		return this.monsterPrototype.clone(enemies);
	}
}