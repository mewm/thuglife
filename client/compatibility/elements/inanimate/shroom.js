Shroom.prototype = Object.create(InanimateElement.prototype);

function Shroom(id, x, y, sprite) {
	InanimateElement.apply(this, arguments);
	this.type = 'shroom';
	this.energyDrainPerTick = 0;
	this.energyReplenishment = 50;
}

Shroom.constructor = Shroom;

Shroom.prototype.act = function()
{
	// I'm a shroom, so I got nothing to do except be a shroom!
	// Lick me.. Im magic!
};



