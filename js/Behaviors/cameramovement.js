import { globals } from '../game.js';
import Behavior from './behavior.js';

export default class CameraMovement extends Behavior {
	constructor(entity, camera) {
		super(entity);
		this.camera = camera;
	}

	update() {
		this.camera.x = Math.min(Math.max(0, this.entity.x - globals.SCREEN_WIDTH / 2), globals.MAP_WIDTH - globals.SCREEN_WIDTH);
		this.camera.update();
	}
}