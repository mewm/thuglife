//DEBUG
var _DEBUG = {
	fps: {
		show: true,
		lastTick: null,
		value: 0
	}
}

function World()
{
	this.stage = new PIXI.Stage(0x66FF99);
	this.renderer = new PIXI.WebGLRenderer(500, 500);//autoDetectRenderer(400, 300);
	this.elements = [];
	this.elementFactory = elementFactory;
	document.body.appendChild(this.renderer.view);
	this.seedElements();
	this.animate();


	if(_DEBUG.fps.show) {
		this.fps = new PIXI.Text(_DEBUG.fps.value, {font: "bold 10px Arial", fill: "white", stroke: "black", strokeThickness: 2});
		this.stage.addChild(this.fps);
	}

}

World.prototype.animate = function()
{
	var self = this;
	var animate = function()
	{
		self.turn();
		self.renderer.render(self.stage);

		// Calculate FPS
		if(_DEBUG.fps.show) {
			if(!_DEBUG.fps.lastRender) 
			{
				_DEBUG.fps.lastRender = Date.now();
				_DEBUG.fps.value = 0;	
			}

			var delta = (new Date().getTime() - _DEBUG.fps.lastRender)/1000;
			_DEBUG.fps.lastRender = Date.now();
			_DEBUG.fps.value = Math.round(1/delta);

			self.fps.setText("fps: " + _DEBUG.fps.value);
		}

		requestAnimFrame(animate);
	}
	requestAnimFrame(animate);
};

World.prototype.seedElements = function()
{
	var shroomBatch = new PIXI.SpriteBatch();
	this.stage.addChild(shroomBatch);
	var shroomsNo = 100;
	for (var i = 0; i < shroomsNo; i++) {
		// Create a new critter in the center of the map with some random offset.
		var element = this.elementFactory.createShroom(Math.random() * 500, Math.random() * 500);
		this.addElement(element, shroomBatch);
	}

	var bunnyBatch = new PIXI.SpriteBatch();
	this.stage.addChild(bunnyBatch);
	
	var bunnies = 25;
	for (var i = 0; i < bunnies; i++) {
		// Create a new critter in the center of the map with some random offset.
		var element = this.elementFactory.createBunny(Math.random() * 500, Math.random() * 500);
		this.addElement(element, bunnyBatch);
	}

};

World.prototype.addElement = function(element, container)
{
	container.addChild(element.sprite);
	this.elements.push(element);
};

World.prototype.removeElement = function(element)
{

	// Remove element from all players.
	for(var i = 0; i < this.elements.length; i++) {
		var worldElement = this.elements[i];
		if(worldElement.codeName == "bunny") {
			if(worldElement.hasDetected(element)) {
				worldElement.removeElementInRange(element);
			}
			if(worldElement.isCollidingWith(element)) {
				worldElement.removeCollidedElement(element);	
			}
		}
	}

	// Remove elements sprite from spriteBatch.
	var search = element.sprite.parent.children.indexOf(element.sprite); 
	if(search !== -1) {
		element.sprite.parent.removeChild(element.sprite);
		element.sprite = null;
	}

	// Remove element from world.
	var search = this.elements.indexOf(element); 
	if(search !== -1) {
		this.elements.splice(search, 1);
	}

};


World.prototype.registerElementsCollidingWith = function(element)
{
	for (var i = 0; i < this.elements.length; i++) {
		var worldElement = this.elements[i];
		if (worldElement != element) {

		
			// Just to make the statement below look a little less fucked.
			var selfPosition = {
				left: element.position.x,
				top: element.position.y,
				right: element.position.x + element.sprite.width,
				bottom: element.position.y + element.sprite.height
			};
			var worldElementPosition = {
				left: worldElement.position.x,
				top: worldElement.position.y,
				right: worldElement.position.x + element.sprite.width,
				bottom: worldElement.position.y + element.sprite.height
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
	for (var i = 0; i < this.elements.length; i++) {
		var worldElement = this.elements[i];
		if (worldElement != element) {
			if (element.position.distanceTo(worldElement.position) <= element.proximityDetector.radius && !element.hasDetected(worldElement) && element.elementsInRange.length < element.memoryLimit) {
				element.addElementInRange(worldElement);
			} else if (element.position.distanceTo(worldElement.position) > element.proximityDetector.radius && element.hasDetected(worldElement)) { 
				element.removeElementInRange(worldElement);
			}
		}
	}
}

World.prototype.removeDeadElements = function()
{
	for(var i = 0; i < this.elements.length; i++) {
		var element = this.elements[i];
		if(!element.isAlive && element.sprite) {
			this.removeElement(element);
		}
	}
}
World.prototype.turn = function()
{
	for (var i in this.elements) {
		if(this.elements.hasOwnProperty(i)) {
			var element = this.elements[i];

			this.removeDeadElements();

			// Handle box collisions.
			if (element.hasCollision) {
				this.registerElementsCollidingWith(element);
			}

			// Handle detection collisions.
			if (element.proximityDetector.enabled) {
				this.registerElementsInRange(element);
			}

			// Fire action
			element.act();

		}
	}

	
}