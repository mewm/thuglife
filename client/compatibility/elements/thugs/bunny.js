Bunny.prototype = Object.create(ThugElement.prototype);

function Bunny(id, x, y, sprite) {
	ThugElement.apply(this, arguments);
	this.speed = 1;
	this.codeName = 'bunny';
}

Bunny.constructor = Bunny;

Bunny.prototype.act = function()
{
	// Fire current action in actionQueue.
	if(this.actionQueue.length > 0) {
		var action = this.actionQueue[0];

//		// If we are hungry.
//		if(this.energy <= 90 && !this.target) {
//			if(this.elementsInRange.length > 0) {
//				// Look for the closest element.
//				var closestElement = this.getClosestElementOfTypeInRange("shroom");
//				this.target = closestElement;
//				if(this.target == undefined) {	// This shit needs to be fixed.
//					if(action.type == 'walk') {
//						this.overrideCurrentAction(actionFactory.createWalk.call(this, new Vector2(Math.random() * 500, Math.random() * 500)));
//					}
//				} else {
//					this.overrideCurrentAction(actionFactory.createWalk.call(this, closestElement.position));
//					this.speed = 2;
//				}
//			} else {
//				if(action.type == 'walk') {
//					this.walkTo(action);
//				}
//			}
//		} else {
			if(action.type == 'walk') {
				this.walkTo(action);
			}
//		}

	} else {
		this.walkRandom();
//		this.speed = 1;
	}
	
	console.log(this.collidedElements.length);
	//this.walkRandom();
//
//	// If we have something in focus and we're colliding with it, die it and reset energy.
//	if(this.target) {
//		if(this.isAlreadyCollidingWith(this.target)) {
//			this.target.die();
//			this.target = null;
//			this.energy = 100;
//			this.speed = 1;
//		}
//	}

	// Take some energy and die that fucker if it gets to 0.
	this.energy -= 0.075
	if(this.energy <= 0) {
		this.die();
	}

};
