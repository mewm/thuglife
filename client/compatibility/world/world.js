var World = (function(elementFactory, actionFactory, elementSeeder, Vector2, PIXI, w)
{
	World.fps = {
		show: true,
		lastTick: null,
		value: 0,
		sprite: {}
	};
		
	//This log can be added with a message and time object to be shown under the world map
	World.debugLog = [];
	World.log = function(messageObject) 
	{
		World.debugLog.push(messageObject);	
	};

	//World dimensions. Is used for various
	World.width = window.innerWidth - 50;
	World.height = window.innerHeight - 100;

	/**
	 * This method will be invoked every world tick
	 */
	World.animateCallback = function()
	{
	};

	/**
	 * Setup da world
	 *
	 * @constructor
	 */
	function World()
	{
		this.canvasNode = document.getElementById('canvas');
		this.elements = [];
		this.paused = false;
		this.renderStageToDom();
		
		elementSeeder.seedAll.call(this);

		//Add FPS to stage
		if (World.fps.show) {
			World.fps.sprite = new PIXI.Text(World.fps.value, {
				font: "bold 10px Arial",
				fill: "white",
				stroke: "black",
				strokeThickness: 2
			});
			this.stage.addChild(World.fps.sprite);
		}

		this.animate();
	}

	/**
	 * Initates stage and renderer and adds it to the dom 
	 */
	World.prototype.renderStageToDom = function()
	{
		this.stage = new PIXI.Stage(0x179E24);
		this.renderer = new PIXI.WebGLRenderer(World.width, World.height);//autoDetectRenderer(400, 300);
		this.canvasNode.appendChild(this.renderer.view);
		var world = this;
		$(window).resize(function() {
			world.width = window.innerWidth - 50;
			world.height = window.innerHeight - 100;
			world.renderer.resize(world.width, world.height);
		});
	};

	/**
	 * Starts the animation and continously renders the stage.
	 */
	World.prototype.animate = function()
	{
		var animate = function()
		{
			if (!this.paused) {
				this.turn();
				this.renderer.render(this.stage);
				this.calculateFps();
				World.animateCallback();
			}
		}.bind(this);

		setInterval(animate, 100 / 10);
	};

	/**
	 * Adds an element to the world
	 * 
	 * @param BaseElement
	 */
	World.prototype.addElement = function(element)
	{
		this.stage.addChild(element.sprite);
		this.elements.push(element);
	};

	/**
	 * Removes an element from the world completely.
	 * Also traverses all collissions and in-range elements for the element to remove it/
	 * 
	 * @param BaseElement
	 */
	World.prototype.removeElement = function(element)
	{
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

	/**
	 * Traverses through all elements and removes the dead ones
	 */
	World.prototype.removeDeadElements = function()
	{
		for (var i = 0; i < this.elements.length; i++) {
			var element = this.elements[i];
			if (!element.isAlive && element.sprite) {
				this.removeElement(element);
			}
		}
	}

	/**
	 * This method gets invoked each "tick" the turn has.
	 * Everything that should be (re)computed each turn should go in here.
	 */
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

	/**
	 * Calculate and update current FPS
	 */
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