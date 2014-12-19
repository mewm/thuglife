Bunny.prototype = Object.create(ThugElement.prototype);

function Bunny(id, x, y, sprite)
{
	ThugElement.apply(this, arguments);
	this.speed = 1;
	this.type = 'bunny';
}

Bunny.constructor = Bunny;



Bunny.prototype.performActions = function()
{
	if (this.actionQueue.length > 0) {
		var action = this.actionQueue[0];
		action.perform();
		return true;
	}
	return false;
}

Bunny.prototype.act = function()
{
	console.log(this.elementsInRange.length);
	// Fire current action in actionQueue.
	if(this.performActions()){
		return true;
	}
	
	// Take some energy and die that fucker if it gets to 0.
//	if(this.energy < 50) {
		this.goLookForFood();
//	}
	
}



Bunny.prototype.goLookForFood = function()
{
	var action = actionFactory.createHarvest.call(this);
	this.queueAction(action);
};

Bunny.prototype.walkRandom = function(overrideCurrentAction)
{
	var r1 = Math.random() * 500;
	var r2 = Math.random() * 500;
	var moveAction = actionFactory.createWalk.call(this, new Vector2(r1,r2));
	
	if(overrideCurrentAction) {
		return this.overrideCurrentAction(moveAction);
	}
	
	return this.queueAction(moveAction);
}


