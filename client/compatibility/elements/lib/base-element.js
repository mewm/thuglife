function BaseElement(id, startX, startY, sprite) {
	this.id = id || null;
	this.speed = 1;
	this.sprite = sprite;
	this.sprite.position = new Vector2(startX, startY);
	this.position = this.sprite.position;
	this.actionQueue = [];

	this.focus = null;
	this.hasCollision = false;
	this.proximityDetector = {
		enabled: false,
		radius: 100
	};

	this.sprite.anchor.x = 0.5;
	this.sprite.anchor.y = 0.5;
	
	
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
	this.actionQueue.splice(0, 1);
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
