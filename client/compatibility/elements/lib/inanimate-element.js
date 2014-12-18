InanimateElement.prototype = Object.create(BaseElement.prototype);

function InanimateElement(id, startX, startY, sprite)
{
	BaseElement.apply(this, arguments);
	
	//Element base stats/state
	this.speed = 0;
	this.energy = 100;
	this.isAlive = true;

	//Features
	this.canCollideWithOthers = false;
	this.canBeCollidedWith = true;
	this.proximityDetector = {
		enabled: false,
		radius: 300
	};

}

InanimateElement.constructor = InanimateElement;
