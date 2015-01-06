function Harvest(element)
{
	this.type = 'harvest';
	this.element = element;	
}

Harvest.prototype.perform = function()
{
	var closestFood = this.element.getClosestElementOfTypeInRange('shroom');

	if(closestFood) {
		var move = actionFactory.createWalk.call(this.element, closestFood.position);
		this.element.overrideCurrentAction(move);
	
		var eat = actionFactory.createEat.call(this.element, closestFood);
		this.element.queueAction(eat);
	} else {
		this.element.walkRandom(true);
	}
}

Harvest.prototype.description = function() 
{
	return 'Harvesting!';
}
