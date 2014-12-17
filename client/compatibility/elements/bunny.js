Bunny.prototype = Object.create(BaseElement.prototype);

function Bunny(id, x, y, canvas) {
	BaseElement.apply(this, arguments);
	this.speed = 1;
	this.codeName = 'bunny';
	this.queueAction(actionFactory.createWalk(new Vector2(100,100), new Vector2(0,0)));
}

Bunny.prototype.act = function()
{
	// Execute active actionQueue or random walk.
	if(this.collidedElements.length > 0) {
		for(var i = 0; i < this.collidedElements.length; i++) {
			var collidedElement = this.collidedElements[i];
			if(collidedElement.codeName == 'shroom') {
				collidedElement.kill();
			}
		}
	}
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



