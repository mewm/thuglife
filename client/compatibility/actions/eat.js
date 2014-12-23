function Eat(edibleElement, element)
{
	this.type = 'eat';
	this.element = element;	
	this.edibleElement = edibleElement;
}


Eat.prototype.perform = function()
{
	if(this.element.isCollidingWith(this.edibleElement)) {
		this.element.addEnergy(this.edibleElement.energyReplenishment);
		this.edibleElement.kill();
	}
	
	this.element.removeCompletedAction();	
	
}

Eat.prototype.description = function() {
	return 'Eaiting ' + this.edibleElement.type;
}
