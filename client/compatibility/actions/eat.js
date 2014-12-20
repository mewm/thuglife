function Eat(edibleElement, element)
{
	this.type = 'eat';
	this.element = element;	
	this.edibleElement = edibleElement;
}


Eat.prototype.perform = function()
{
	if(this.element.isAlreadyCollidingWith(this.edibleElement)) {
		this.element.addEnergy(this.edibleElement.energyReplenishment);
		this.edibleElement.kill();
	}
	
	this.element.removeCompletedAction();	
	this.element.walkRandom(true);	
	
}
