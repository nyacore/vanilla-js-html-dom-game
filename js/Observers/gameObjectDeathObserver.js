export default class gameObjectDeathObserver {
	/**
	 * 
	 * @param { Array } gameObjects 
	 */
	constructor(gameObjects) {
		this.gameObjects = gameObjects;
	}

	/**
	 * 
	 * @param { import('../GameObjects/gameObjects.js').default } sender
	 * @param { String } event 
	 */
	onNotify(sender, event) {
		if (event == 'GAMEOBJECT_DIED') {
			const index = this.gameObjects.indexOf(sender);
			document.querySelector('main').removeChild(sender.el);
			this.gameObjects.splice(index, 1);
		}
	}
}