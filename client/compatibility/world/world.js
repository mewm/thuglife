var World = (function(elementFactory, actionFactory, elementSeeder, Vector2, PIXI, w)
{
	World.fps = {
		show: true,
		lastTick: null,
		value: 0,
		sprite: {}
	},
	World.width = 800;
	World.height = 600;
	World.log = [];

	World.animateCallback = function()
	{
	};

	function World()
	{
		this.stage = new PIXI.Stage(0x66FF99);
		this.renderer = new PIXI.WebGLRenderer(World.width, World.height);//autoDetectRenderer(400, 300);
		document.getElementById('canvas').appendChild(this.renderer.view);

		this.elements = [];
		elementSeeder.seedAll.call(this);
		this.animate();

		if (World.fps.show) {
			World.fps.sprite = new PIXI.Text(World.fps.value, {
				font: "bold 10px Arial",
				fill: "white",
				stroke: "black",
				strokeThickness: 2
			});
			this.stage.addChild(World.fps.sprite);
		}

		this.paused = false;
	}

	World.prototype.animate = function()
	{
		var self = this;
		var animate = function()
		{
			if (!self.paused) {
				self.turn();
				self.renderer.render(self.stage);
				self.calculateFps();
				World.animateCallback(self.elements);
			}
		}

		setInterval(animate, 100 / 10);
	};

	World.prototype.addElement = function(element)
	{
		this.stage.addChild(element.sprite);
		this.elements.push(element);
	};

	World.prototype.removeElement = function(element)
	{
		// Remove element from all players.
		for (var i = 0; i < this.elements.length; i++) {
			var worldElement = this.elements[i];

			if (worldElement.isAlreadyInRange(element)) {
				worldElement.removeElementInRange(element);
			}
			if (worldElement.isAlreadyCollidingWith(element)) {
				worldElement.removeCollidedElement(element);
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

			if (element.proximityDetector.enabled) {
				element.detectElementsInRange(this.elements);
			}
			if (element.canCollideWithOthers) {
				element.detectCollisions(this.elements);
			}

			element.act();
			element.drainEnergy();
		}
	}

	World.prototype.calculateFps = function()
	{
		if (World.fps.show) {
			if (!World.fps.lastRender) {
				World.fps.lastRender = Date.now();
				World.fps.value = 0;
			}
			var delta = (new Date().getTime() - World.fps.lastRender) / 1000;
			World.fps.lastRender = Date.now();
			World.fps.value = Math.round(1 / delta);
			World.fps.sprite.setText("fps: " + World.fps.value);
		}
	}

	return World;

})(elementFactory, actionFactory, elementSeeder, Vector2, PIXI, window);
