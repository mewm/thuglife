ThugElement.prototype = Object.create(BaseElement.prototype);

function ThugElement(id, startX, startY, sprite)
{
	BaseElement.apply(this, arguments);

	//Element base stats/state
	this.speed = 1;
	this.energy = 100;
	this.isAlive = true;


}

ThugElement.constructor = ThugElement;

ThugElement.prototype.walkTo = function(action)
{
	var endPosition = new Vector2(action.newPosition.x, action.newPosition.y);

	// Reached destination. Remove action.
	if (Math.floor(this.getPosition().distanceTo(endPosition)) <= 1) {
		this.removeCompletedAction();
		return true;
	}

	var angle = this.getPosition().findAngleBetween(endPosition);
	var newPosition = new Vector2(this.getPosition().x + Math.sin(angle) * this.speed, this.getPosition().y + Math.cos(angle) * this.speed);

	return this.setPosition(newPosition);
}

ThugElement.prototype.walkRandom = function()
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
