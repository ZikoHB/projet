import Mobile from './mobile.js';
import shootImage from "../images/tir.png"

// This class is for the laser that is shot

export default class Shoot extends Mobile{
	constructor(x, y){
        super(x, y, shootImage, 8, 0);
	}

	// This method check if there is a colllision betwen 2 object moving

	isColliding(mobile){
		const rect1 = {x : this.x, y : this.y, width : this.image.width, height : this.image.height};
		const rect2 = {x : mobile.x, y : mobile.y, width : mobile.image.width, height : mobile.image.height};
		if (rect1.x < rect2.x + rect2.width &&
			rect1.x + rect1.width > rect2.x &&
			rect1.y < rect2.y + rect2.height &&
			rect1.height + rect1.y > rect2.y && mobile.falling === false) {
			return true;
		 }
		 return false;
	}

	// This method check if a saucer is collinding with a mobile

	checkForCollisions(saucers){
		let saucerToReturn = null
		saucers.forEach(saucer => {
			if(this.isColliding(saucer)){
				console.log("returning saucer");
				saucerToReturn = saucer;
			}
		});
		return saucerToReturn;
	}
}
