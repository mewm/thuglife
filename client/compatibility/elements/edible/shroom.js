Shroom.prototype = Object.create(BaseElement.prototype);

function Shroom(id, x, y, sprite) {
	BaseElement.apply(this, arguments);
	this.speed = 1;
	this.codeName = 'shroom';

	// It's a god damn plant!
	this.hasCollision = false;
	this.proximityDetector.enabled = false;
	
}

Shroom.prototype.act = function()
{
	// I'm a shroom, so I got nothing to do except be a shroom!
	// Lick me.. Im magic!
};



