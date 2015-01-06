Predator.prototype = Object.create(ThugElement.prototype);

function Predator(id, x, y, sprite)
{
	ThugElement.apply(this, arguments);
	this.speed = 1;
	this.type = 'bunny';
	this.display = true;
}

Predator.constructor = Predator;

Predator.prototype.performActions = function()
{
	if (this.actionQueue.length > 0) {
		var action = this.actionQueue[0];
		action.perform();
		return true;
	}
	return false;
}

Predator.prototype.act = function()
{	
	// Fire current action in actionQueue.
	if(this.performActions()){
		return true;
	}
	
	// Take some energy and die that fucker if it gets to 0.
	if(this.energy < 95) {
		this.goLookForFood();
	} else {
		this.walkRandom();
	}
}

Predator.prototype.goLookForFood = function()
{
	var action = actionFactory.createHarvest.call(this);
	this.queueAction(action);
};