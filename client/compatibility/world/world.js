function World()
{
	this.stage = new PIXI.Stage(0x66FF99);
	this.renderer = new PIXI.WebGLRenderer(500, 500);//autoDetectRenderer(400, 300);
	this.critters = [];
	this.critterFactory = critterFactory;
	document.body.appendChild(this.renderer.view);
	this.seedCritters();
	this.animate();
	
}


World.prototype.animate = function()
{
	var self = this;
	var animate = function ()
	{
		self.turn();
		self.renderer.render(self.stage);

		requestAnimFrame(animate);
	}
	requestAnimFrame( animate );
};

World.prototype.seedCritters = function()
{
	var seeds = 3;
	for(var i = 0; i < seeds; i++) {
		// Create a new critter in the center of the map with some random offset.
		var critter = this.critterFactory.createBunny(Math.random() * 500, Math.random() * 500);
		this.addCritter(critter);
	}
};


World.prototype.addCritter = function(critter)
{
	this.stage.addChild(critter.element);
	this.critters.push(critter.critter);
};

World.prototype.turn = function()
{
	for(var ix in this.critters) {
		var thisCritter = this.critters[ix];

		// Handle box collisions.
		if(thisCritter.hasCollision) {
			for(var i in this.critters) {
				var critter = this.critters[i];
				if(critter != thisCritter && critter.hasCollision) {

					// Just to make the statement below look a little less fucked.
					var selfPosition = { left: thisCritter.position.x, top: thisCritter.position.y, right: thisCritter.position.x+26, bottom: thisCritter.position.y+37 };
					var critterPosition = { left: critter.position.x, top: critter.position.y, right: critter.position.x+26, bottom: critter.position.y+37 };

					// True if there is a collision.
					if( !(critterPosition.left > selfPosition.right || critterPosition.right < selfPosition.left || critterPosition.top > selfPosition.bottom || critterPosition.bottom < selfPosition.top) ) {

					}
				} 
			}
		}

		// Handle detection collisions.
		if(thisCritter.proximityDetector.enabled) {
			for(var i in this.critters) {
				var critter = this.critters[i];
				if(critter != thisCritter) {
					if(thisCritter.position.distanceTo(critter.position) <= thisCritter.proximityDetector.radius && !thisCritter.hasDetected(critter)) {
						thisCritter.addElementInRange(critter);
						console.log("Added element[" + i + "] to element[" + ix + "]");
					} else if (thisCritter.position.distanceTo(critter.position) > thisCritter.proximityDetector.radius && thisCritter.hasDetected(critter)) {
						thisCritter.removeElementInRange(critter);
						console.log("Removed element[" + i + "] to element[" + ix + "]");
					}
				}
			}
		}

		thisCritter.act(ix);

	}
}