export default class Behavior {
	/**
	 * @typedef { import('../entity').default } Entity
	 * @param { Entity } entity 
	 */
	constructor(entity) {
		/**
		 * @type { Entity } this.entity
		 */
		this.entity = entity;
	}
}