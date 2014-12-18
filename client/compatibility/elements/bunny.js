Bunny.prototype = Object.create(BaseElement.prototype);

function Bunny(id, x, y, sprite) {
	BaseElement.apply(this, arguments);
	this.speed = 1;
	this.codeName = 'bunny';
}

Bunny.prototype.act = function()
{
	// Fire current action in actionQueue.
	if(this.actionQueue.length > 0) {
		var action = this.actionQueue[0];
		// If we are hungry.
		if(this.energy <= 90 && !this.target) {
			if(this.elementsInRange.length > 0) {
				var closestElement = this.getClosestElementOfTypeInRange("shroom");
				this.target = closestElement;
				if(this.target == undefined) {	// THis shit needs to be fixed.
					if(action.type == 'walk') {
						this.walkTo(action);
					}
				} else {
					this.actionQueue[0] = actionFactory.createWalk.call(this, closestElement.position);
					this.speed = 2;
				}
			} else {
				if(action.type == 'walk') {
					this.walkTo(action);
				}
			}
		} else {
			if(action.type == 'walk') {
				this.walkTo(action);
			}
		}

	} else {
		this.walkRandom();
	}

	// If we have something in focus and we're colliding with it, kill it and reset energy.
	if(this.target) {
		if(this.isCollidingWith(this.target)) {
			this.target.kill();
			this.target = null;
			this.energy = 100;
			this.speed = 1;
		}		
	}


	console.log(this.energy);

};
