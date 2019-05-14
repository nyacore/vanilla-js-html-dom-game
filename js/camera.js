export default class Camera {
	constructor(x, el) {
		this.x = x;
		this.el = el;
	}

	update() {
		this.el.style.backgroundPosition = `${-this.x}px`;
	}
}