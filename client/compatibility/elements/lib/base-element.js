function BaseElement(id, startX, startY, sprite) {
	this.id = id || null;
	this.speed = 1;
	this.sprite = sprite;
	this.sprite.position = new Vector2(startX, startY);
	this.position = this.sprite.position;
	this.actionQueue = [];

	this.target = null;
	this.targetBy = null;
	this.hasCollision = true;
	this.proximityDetector = {
		enabled: true,
		radius: 100
	};

	this.sprite.anchor.x = 0.5;
	this.sprite.anchor.y = 0.5;
	
	this.energy = 100;

	this.memoryLimit = 25;
	this.elementsInRange = [];
	this.collidedElements= [];
	
	this.isAlive = true;
}

BaseElement.prototype.walkRandom = function()
{
	var r1 = Math.random() * 500;
	var r2 = Math.random() * 500;

	var moveAction = {
		type: 'walk',
		originalPosition: {
			x: 0,
			y: 0
		},
		newPosition: {
			x: r1,
			y: r2
		}
	};
	this.queueAction(moveAction);
}

BaseElement.prototype.setPosition = function(position) {
	position.x = Math.round(position.x);
	position.y = Math.round(position.y);
	this.sprite.position = position;
	this.position = position;
}

BaseElement.prototype.getPosition = function() {
	return this.position;
}

BaseElement.prototype.queueAction = function(action) {
	this.actionQueue.push(action);
}

BaseElement.prototype.removeCompletedAction = function() {
	this.actionQueue.splice(this.actionQueue.length-1, 1);
}

BaseElement.prototype.hasDetected = function(element) {
	if(this.elementsInRange.indexOf(element) == -1) {
		return false;
	}
	return true;
}

BaseElement.prototype.addCollidedElement = function(element) {
	this.collidedElements.push(element);
}

BaseElement.prototype.removeCollidedElement = function(element) {
	this.collidedElements.splice(this.elementsInRange.indexOf(element), 1);
}

BaseElement.prototype.isCollidingWith = function(element) {
	if(this.collidedElements.indexOf(element) == -1) {
		return false;
	}
	return true;
}

BaseElement.prototype.addElementInRange = function(element) {
	this.elementsInRange.push(element);
}

BaseElement.prototype.removeElementInRange = function(element) {
	this.elementsInRange.splice(this.elementsInRange.indexOf(element), 1);
}

BaseElement.prototype.getClosestElementOfTypeInRange = function(type) {
	var closestElement;
	var closestElementDistance;

	// Loop through all elements in range.
	for(var i = 0; i < this.elementsInRange.length; i++) {
		var worldElement = this.elementsInRange[i];
		// If the element is a shroom.
		if(worldElement.codeName == type && worldElement.position != undefined) {
			// Distance to target element.
			var distance = this.position.distanceTo(worldElement);
			// If we dont have a closest element or the new measured distance is lower than the last then set this element as new closestElement.
			if(!closestElement || distance < closestElementDistance) {
				closestElement = worldElement;
				closestElementDistance = distance;
			}
		}
	}

	return closestElement;
}

BaseElement.prototype.kill = function() {
	this.isAlive = false;
};

BaseElement.prototype.walkTo = function(action)
{
	var endPosition = new Vector2(action.newPosition.x, action.newPosition.y);

	// Reached destination. Remove action.
	if(Math.floor(this.getPosition().distanceTo(endPosition)) <= 1) {
		this.removeCompletedAction();
		return true;
	}

	var angle = this.getPosition().findAngleBetween(endPosition);
	var newPosition = new Vector2(this.getPosition().x + Math.sin(angle) * this.speed, this.getPosition().y + Math.cos(angle) * this.speed);

	return this.setPosition(newPosition);
}