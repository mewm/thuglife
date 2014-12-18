function Move(newPosition, element)
{
	this.newPosition = newPosition;
	this.element = element;
}

Move.prototype.perform = function()
{
	// Reached destination. Remove action.
	if (Math.floor(this.element.getPosition().distanceTo(this.newPosition)) <= 1) {
		this.element.removeCompletedAction();
		return true;
	}

	var angle = this.element.getPosition().findAngleBetween(this.newPosition);
	var newPosition = new Vector2(this.element.getPosition().x + Math.sin(angle) * this.element.speed, this.element.getPosition().y + Math.cos(angle) * this.element.speed);
	
	return this.element.setPosition(newPosition);
}