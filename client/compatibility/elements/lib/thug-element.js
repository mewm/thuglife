ThugElement.prototype = Object.create(BaseElement.prototype);

function ThugElement(id, startX, startY, sprite)
{
	BaseElement.apply(this, arguments);

	//Element base stats/state
	this.speed = 1;
	this.energy = 100;
	this.isAlive = true;


}

ThugElement.constructor = ThugElement;

ThugElement.prototype.walkTo = function(endPosition)
{
	
}