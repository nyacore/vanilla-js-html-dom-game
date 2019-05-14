import Entity from "./entity.js";
import FollowPlayer from "./Behaviors/followplayer.js";

export default class Enemy extends Entity {
	constructor(x, y, el, following, healthbar, observers) {
		super(x, y, el);

		this.observers = observers;

		this.speed = Math.max(2, Math.random() * 4);
		this.scale = -1;
		this.offset = 0;
		this.attackRange = 30;

		this.following = following;

		this.healthbar = healthbar;
		this.healthbar.style.display = 'block';

		this.behaviors.push(
			new FollowPlayer(this, this.following),
		);
	}
}