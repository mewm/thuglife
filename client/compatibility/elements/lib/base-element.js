function BaseElement(id, startX, startY, sprite)
{
	this.id = id || null;

	this.target = null;
	this.targetBy = null;

	//Sprite
	this.sprite = sprite;
	this.sprite.position = new Vector2(startX, startY);
	this.sprite.anchor.x = 0.5;
	this.sprite.anchor.y = 0.5;
	this.position = this.sprite.position;

	//Element base stats/state
	this.speed = 1;
	this.energy = 100;
	this.isAlive = true;

	//Collections
	this.elementsInRange = [];
	this.collidedElements = [];

	//Features
	this.canCollideWithOthers = true;
	this.canBeCollidedWith = false;
	this.proximityDetector = {
		enabled: true,
		radius: 300
	};

	this.actionQueue = [];
}


BaseElement.prototype.die = function()
{
	this.isAlive = false;
};

BaseElement.prototype.kill = function(targetElement)
{
	targetElement.die();
}


BaseElement.prototype.queueAction = function(action)
{
	this.actionQueue.push(action);
}

BaseElement.prototype.overrideCurrentAction = function(action)
{
	this.actionQueue[0] = action;
}

BaseElement.prototype.removeCompletedAction = function()
{
	this.actionQueue.splice(this.actionQueue.length - 1, 1);
}

BaseElement.prototype.getPosition = function()
{
	return this.position;
}

BaseElement.prototype.setPosition = function(position)
{
	position.x = Math.round(position.x);
	position.y = Math.round(position.y);
	this.sprite.position = position;
	this.position = position;
}



BaseElement.prototype.detectCollisions = function(worldElements)
{
	for (var i = 0; i < worldElements.length; i++) {
		var worldElement = worldElements[i];
		if (worldElement != this) {

			// True if there is a collision.
			if (this.isCollidingWith(worldElement)) {
				if (!this.isAlreadyCollidingWith(worldElement)) {
					this.addCollidedElement(worldElement);
				}
			} else {
				if (this.isAlreadyCollidingWith(worldElement)) {
					this.removeCollidedElement(worldElement);
				}
			}
		}
	}
};

BaseElement.prototype.isAlreadyCollidingWith = function(element)
{
	if (this.collidedElements.indexOf(element) != -1) {
		return true;
	}
}

BaseElement.prototype.isCollidingWith = function(element)
{
	// Just to make the statement below look a little less fucked.
	var selfPos = {
		left: this.position.x,
		top: this.position.y,
		right: this.position.x + this.sprite.width,
		bottom: this.position.y + this.sprite.height
	};
	var elementPos = {
		left: element.position.x,
		top: element.position.y,
		right: element.position.x + element.sprite.width,
		bottom: element.position.y + element.sprite.height
	};
	

	return !(elementPos.left > selfPos.right || elementPos.right < selfPos.left || elementPos.top > selfPos.bottom || elementPos.bottom < selfPos.top);
}

BaseElement.prototype.addCollidedElement = function(element)
{
	this.collidedElements.push(element);
}

BaseElement.prototype.removeCollidedElement = function(element)
{
	this.collidedElements.splice(this.elementsInRange.indexOf(element), 1);
}



//
//BaseElement.prototype.detectElementsInRage = function()
//{
//
//	//Loop through each other element in the world and detect collisions
//
//};
//
//BaseElement.prototype.isAlreadyInRange = function(element)
//{
//	if (this.elementsInRange.indexOf(element) == -1) {
//		return false;
//	}
//	return true;
//}
//
//BaseElement.prototype.addElementInRange = function(element)
//{
//	this.elementsInRange.push(element);
//}
//
//BaseElement.prototype.removeElementInRange = function(element)
//{
//	this.elementsInRange.splice(this.elementsInRange.indexOf(element), 1);
//}
//
//BaseElement.prototype.getClosestElementOfTypeInRange = function(type)
//{
//	var closestElement;
//	var closestElementDistance = 0;
//
//	// Loop through all elements in range.
//	for (var i = 0; i < this.elementsInRange.length; i++) {
//		var worldElement = this.elementsInRange[i];
//		// If the element is a shroom.
//		if (worldElement.codeName == type) {
//			// Distance to target element.
//			var distance = this.position.distanceTo(worldElement.position);
//			// If we dont have a closest element or the new measured distance is lower than the last then set this element as new closestElement.
//			if (!closestElement || distance < closestElementDistance) {
//				closestElement = worldElement;
//				closestElementDistance = distance;
//			}
//		}
//	}
//
//	return closestElement;
//}
