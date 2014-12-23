function BaseElement(id, startX, startY, sprite)
{
	this.id = id || null;

	//Sprite
	this.sprite = sprite;
	this.sprite.position = new Vector2(startX, startY);
	this.position = this.sprite.position;

	//Element base stats/state
	this.name = null;
	this.display = false;
	this.speed = 1;
	this.maxEnergy = 100;
	this.energy = 100;
	this.isAlive = true;
	this.energyDrainPerTick = 0.1;

	//Collections
	this.elementsInRange = [];
	this.collidedElements = [];

	//Features
	this.canCollideWithOthers = true;
	this.canBeCollidedWith = false;
	this.proximityDetector = {
		enabled: true,
		radius: 200
	};

	this.actionQueue = [];
	this.actionLog = [];
	
};

BaseElement.prototype.drainEnergy = function()
{
	this.removeEnergy(this.energyDrainPerTick);
	if (this.getEnergy() <= 0) {
		this.kill();
	}
}

BaseElement.prototype.kill = function()
{
	this.isAlive = false;
};

BaseElement.prototype.queueAction = function(action)
{
	this.actionQueue.push(action);
	this.actionLog.unshift(action);
}

BaseElement.prototype.queueActionFirst = function(action)
{
	this.actionQueue.unshift(action);
}


BaseElement.prototype.overrideCurrentAction = function(action)
{
	this.actionLog.unshift(action);
	this.actionQueue[0] = action;
}

BaseElement.prototype.removeCompletedAction = function()
{
	var completedAction = this.actionQueue.splice(0, 1);
}

BaseElement.prototype.getPosition = function()
{
	return this.position;
}

BaseElement.prototype.setPosition = function(position)
{
	position.x = position.x;
	position.y = position.y;
	this.sprite.position = position;
	this.position = position;
}

BaseElement.prototype.detectCollisions = function(worldElements)
{
	this.collidedElements = [];
	for (var i = 0; i < worldElements.length; i++) {
		var worldElement = worldElements[i];
		if (worldElement != this) {

			// True if there is a collision.
			if (this.isCollidingWith(worldElement)) {
				this.addCollidedElement(worldElement);
			}
		}
	}
};

BaseElement.prototype.isCollidingWith = function(element)
{
	// Just to make the statement below look a little less fucked.
	var selfPos = {
		left: this.position.x - (this.sprite.width/2),
		top: this.position.y - (this.sprite.height/2),
		right: this.position.x + (this.sprite.width/2),
		bottom: this.position.y + (this.sprite.height/2)
	};
	var elementPos = {
		left: element.position.x - (element.sprite.width/2),
		top: element.position.y - (element.sprite.height/2),
		right: element.position.x + (element.sprite.width/2),
		bottom: element.position.y + (element.sprite.height/2)
	};
	
	return !(elementPos.left > selfPos.right || elementPos.right < selfPos.left || elementPos.top > selfPos.bottom || elementPos.bottom < selfPos.top);
}

BaseElement.prototype.addCollidedElement = function(element)
{
	this.collidedElements.push(element);
}


BaseElement.prototype.detectElementsInRange = function(worldElements)
{
	this.elementsInRange = [];
	for (var i = 0; i < worldElements.length; i++) {
		var worldElement = worldElements[i];
		if (worldElement != this) {
			if (this.isInRange(worldElement)) {
				this.addElementInRange(worldElement);
			}
		}
	}
}


BaseElement.prototype.isInRange = function(worldElement)
{
	return this.position.distanceTo(worldElement.position) <= this.proximityDetector.radius;
}

BaseElement.prototype.addElementInRange = function(element)
{
	this.elementsInRange.push(element);
}


BaseElement.prototype.getClosestElementOfTypeInRange = function(type)
{
	var closestElement = null;
	var closestElementDistance = null;

	// Loop through all elements in range.
	for (var i = 0; i < this.elementsInRange.length; i++) {
		var worldElement = this.elementsInRange[i];
		// If the element is a shroom.
		if (worldElement.type == type) {
			// Distance to target element.
			var distance = this.position.distanceTo(worldElement.position);

			// If we dont have a closest element or the new measured distance is lower than the last then set this element as new closestElement.
			if (distance < closestElementDistance || closestElementDistance === null) {
				closestElement = worldElement;
				closestElementDistance = distance;
			}
		}
	}
	
	if(!closestElement) {
		return null;
	}
	return closestElement;
}

BaseElement.prototype.addEnergy = function(energy) {
	if(this.energy + energy <= this.maxEnergy) {
		this.energy += energy;
	} else {
		this.energy = this.maxEnergy;
	}
}

BaseElement.prototype.removeEnergy = function(energy) {
	if(this.energy - energy <= 0) {
		this.kill();
	} else {
		this.energy -= energy;
	}
}

BaseElement.prototype.setEnergy = function(energy) {
	if(energy > this.maxEnergy) {
		return false;
	} else {
		this.energy = energy;
	}
}

BaseElement.prototype.getEnergy = function() {
	return this.energy;
}