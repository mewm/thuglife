function BaseCritter(id, startX, startY, element) {
	this.id = id || null;
	this.speed = 1;
	this.element = element;
	this.element.position = new Vector2(startX, startY);
	this.actionQueue = [];

	this.focus = null;
	this.hasCollision = true;
	this.proximityDetector = {
		enabled: true,
		radius: 100
	};

	this.element.anchor.x = 0.5;
	this.element.anchor.y = 0.5;
}

BaseCritter.prototype.walkRandom = function()
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

BaseCritter.prototype.setPosition = function(position) {
	this.element.position = position;
}

BaseCritter.prototype.getPosition = function() {
	return this.element.position;
}

BaseCritter.prototype.queueAction = function(action) {
	this.actionQueue.push(action);
}

BaseCritter.prototype.removeCompletedAction = function() {
	this.actionQueue.splice(0, 1);
}

BaseCritter.prototype.walkTo = function(action)
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
