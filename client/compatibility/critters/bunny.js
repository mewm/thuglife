Bunny.prototype = Object.create(BaseCritter.prototype);

function Bunny(id, x, y, canvas) {
	BaseCritter.apply(this, arguments);
	this.speed = 10;
	this.queueAction(actionFactory.createWalk(new Vector2(100,100), new Vector2(0,0)));
}

Bunny.prototype.act = function()
{
	// Execute active actionQueue or random walk.
	
	if(this.actionQueue.length > 0) {
		var action = this.actionQueue[0];
		if(action.type == 'walk') {
			this.walkTo(action);
		}

	} else {
		//Walk random
		this.walkRandom();
	}
};



