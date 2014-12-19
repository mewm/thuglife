
var World = (function(elementFactory, actionFactory, elementSeeder, Vector2, PIXI, w) {
	
	//DEBUG
	var _DEBUG = {
		fps: {
			show: true,
			lastTick: null,
			value: 0
		},
		msg: ''
	}
	
	World.debugger = null;

	function World()
	{
		this.stage = new PIXI.Stage(0x66FF99);
		this.renderer = new PIXI.WebGLRenderer(500, 500);//autoDetectRenderer(400, 300);
//			this.renderer = new PIXI.WebGLRenderer($(w).width()- 10, $(w).height() - 20);//autoDetectRenderer(400, 300);

		document.body.appendChild(this.renderer.view);
		
		this.elements = [];
		elementSeeder.seedAll.call(this);

		this.animate();
		if (_DEBUG.fps.show) {
			this.fps = new PIXI.Text(_DEBUG.fps.value, {
				font: "bold 10px Arial",
				fill: "white",
				stroke: "black",
				strokeThickness: 2
			});
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
			if (_DEBUG.fps.show) {
				if (!_DEBUG.fps.lastRender) {
					_DEBUG.fps.lastRender = Date.now();
					_DEBUG.fps.value = 0;
				}

				var delta = (new Date().getTime() - _DEBUG.fps.lastRender) / 1000;
				_DEBUG.fps.lastRender = Date.now();
				_DEBUG.fps.value = Math.round(1 / delta);

				self.fps.setText("fps: " + _DEBUG.fps.value);
				World.debugger.set("fps: " + _DEBUG.fps.value);
			}

			requestAnimFrame(animate);
		}
		requestAnimFrame(animate);
	};

	

	World.prototype.addElement = function(element, container)
	{
		container.addChild(element.sprite);
		this.elements.push(element);
	};

	World.prototype.removeElement = function(element)
	{
		// Remove element from all players.
		for (var i = 0; i < this.elements.length; i++) {
			var worldElement = this.elements[i];

			if (worldElement.type == "bunny") {
				if (worldElement.isAlreadyInRange(element)) {
					worldElement.removeElementInRange(element);
				}
				if (worldElement.isAlreadyCollidingWith(element)) {
					worldElement.removeCollidedElement(element);
				}
			}
		}

		// Remove elements sprite from spriteBatch.
		var search = element.sprite.parent.children.indexOf(element.sprite);
		if (search !== -1) {
			element.sprite.parent.removeChild(element.sprite);
			element.sprite = null;
		}

		// Remove element from world.
		var search = this.elements.indexOf(element);
		if (search !== -1) {
			this.elements.splice(search, 1);
		}

	};


	World.prototype.removeDeadElements = function()
	{
		for (var i = 0; i < this.elements.length; i++) {
			var element = this.elements[i];
			if (!element.isAlive && element.sprite) {
				this.removeElement(element);
			}
		}
	}
	
	World.prototype.turn = function()
	{
		this.removeDeadElements();
		for (var i = 0; i < this.elements.length; i++) {
			var element = this.elements[i];
			element.detectElementsInRange(this.elements);
			element.detectCollisions(this.elements);
			element.act();
			element.drainEnergy();
		}
	}	
	
	return World;
	
})(elementFactory, actionFactory, elementSeeder, Vector2, PIXI, window);
