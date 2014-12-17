function World()
{
	this.stage = new PIXI.Stage(0x66FF99);
	this.renderer = new PIXI.WebGLRenderer(500, 500);//autoDetectRenderer(400, 300);
	this.elements = [];
	this.elementFactory = elementFactory;
	document.body.appendChild(this.renderer.view);
	this.seedElements();
	this.animate();

}

World.prototype.animate = function()
{
	var self = this;
	var animate = function()
	{
		self.turn();
		self.renderer.render(self.stage);

		requestAnimFrame(animate);
	}
	requestAnimFrame(animate);
};

World.prototype.seedElements = function()
{
	var shrooms = 100;
	for (var i = 0; i < shrooms; i++) {
		// Create a new critter in the center of the map with some random offset.
		var element = this.elementFactory.createShroom(Math.random() * 500, Math.random() * 500);
		this.addElement(element);
	}
	
	
	var bunnies = 3;
	for (var i = 0; i < bunnies; i++) {
		// Create a new critter in the center of the map with some random offset.
		var element = this.elementFactory.createBunny(Math.random() * 500, Math.random() * 500);
		this.addElement(element);
	}

};

World.prototype.addElement = function(element)
{
	this.stage.addChild(element.sprite);
	this.elements.push(element);
};

World.prototype.removeElement = function(element)
{
	var search = this.stage.children.indexOf(element.sprite); 
	if(search !== -1) {
		this.stage.removeChild(this.stage.children[search]);
	}
};


World.prototype.registerCollidesWithElement = function(element)
{
	for (var i in this.elements) {
		var worldElement = this.elements[i];
		if (worldElement != element && worldElement.hasCollision) {

		
			// Just to make the statement below look a little less fucked.
			var selfPosition = {
				left: element.position.x,
				top: element.position.y,
				right: element.position.x + 26,
				bottom: element.position.y + 37
			};
			var worldElementPosition = {
				left: worldElement.position.x,
				top: worldElement.position.y,
				right: worldElement.position.x + 26,
				bottom: worldElement.position.y + 37
			};

			// True if there is a collision.
			if (!(worldElementPosition.left > selfPosition.right || worldElementPosition.right < selfPosition.left || worldElementPosition.top > selfPosition.bottom || worldElementPosition.bottom < selfPosition.top)) {
				if (!element.isCollidingWith(worldElement)) {
					element.addCollidedElement(worldElement);
				} 
			} else if(element.isCollidingWith(worldElement)) {
				element.removeCollidedElement(worldElement);
			}
		}
	}
}

World.prototype.registerElementsInRange = function(element)
{
	for (var i in this.elements) {
		var worldElement = this.elements[i];
		if (worldElement != element) {
			if (element.position.distanceTo(worldElement.position) <= element.proximityDetector.radius && !element.hasDetected(worldElement)) {
				element.addElementInRange(worldElement);
			} else if (element.position.distanceTo(worldElement.position) > element.proximityDetector.radius && element.hasDetected(worldElement)) {
				element.removeElementInRange(worldElement);
			}
		}
	}
}

World.prototype.removeDeadElements = function()
{
	for (var i in this.elements) {
		var element = this.elements[i];
		if(!element.isAlive) {
			this.removeElement(element);
		}
	}
}
World.prototype.turn = function()
{
	for (var ix in this.elements) {
		var element = this.elements[ix];
		
		this.removeDeadElements();
		// Handle box collisions.
		if (element.hasCollision) {
			this.registerCollidesWithElement(element);
		}

		// Handle detection collisions.
		if (element.proximityDetector.enabled) {
			this.registerElementsInRange(element);
		}

		element.act(ix);

	}
}