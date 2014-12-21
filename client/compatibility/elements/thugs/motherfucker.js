Motherfucker.prototype = Object.create(ThugElement.prototype);

function Motherfucker(id, x, y, sprite)
{
	ThugElement.apply(this, arguments);
	this.speed = 1;
	this.type = 'bunny';
	this.display = true;
}

Motherfucker.constructor = Motherfucker;

Motherfucker.prototype.performActions = function()
{
	if (this.actionQueue.length > 0) {
		var action = this.actionQueue[0];
		action.perform();
		return true;
	}
	return false;
}

Motherfucker.prototype.act = function()
{	
	// Fire current action in actionQueue.
	if(this.performActions()){
		return true;
	}
	
	// Take some energy and die that fucker if it gets to 0.
//	if(this.energy < 95) {
		this.goLookForFood();
//	} else {
//		this.walkRandom();
//	}
	
}

Motherfucker.prototype.goLookForFood = function()
{
	var action = actionFactory.createHarvest.call(this);
	this.queueAction(action);
};

Motherfucker.prototype.walkRandom = function(overrideCurrentAction)
{
	var r1 = Math.random() * World.width;
	var r2 = Math.random() * World.height;
	var moveAction = actionFactory.createWalk.call(this, new Vector2(r1,r2));
	
	if(overrideCurrentAction) {
		return this.overrideCurrentAction(moveAction);
	}
	
	return this.queueAction(moveAction);
}


