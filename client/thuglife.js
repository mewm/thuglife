var critterFactory = {
	createBunny: function(x, y)
	{
		var texture = PIXI.Texture.fromImage("bunny.png");
		var element = new PIXI.Sprite(texture)
		element.anchor.x = 0.5;
		element.anchor.y = 0.5;
		var critter = new Critter(x, y, element);


		/*critter.addAction({
			act: function() {
				critter.walkLeft(1);
			}
		});

		critter.addAction({
			act: function() {
				critter.walkRight(1);
			}
		});

		critter.addAction({
			act: function() {
				critter.walkUp(1);
			}
		});

		critter.addAction({
			act: function() {
				critter.walkDown(1);
			}
		});*/

		critter.addAction({
			act: function() {
				critter.walkTo(250, 250);
			}
		});

	
		return {
			element: element,
			critter: critter
		}
	}
};
 
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
	var seeds = 2;
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
		var self = this.critters[ix];

		// Execute active actions or random walk.
		if(self.actions.length > 0) {
			var action = self.actions[0];
			action.act();
		} else {
			console.log("Planned actions ended for Critter[" + ix + "] - Starting new random walk.");

			var r1 = Math.random() * 500;
			var r2 = Math.random() * 500;

			self.addAction({
				act: function() {
					self.walkTo(r1, r2);
				}
			});
		}

		// Handle box collisions.
		if(self.hasCollision) {
			for(var i in this.critters) {
				var critter = this.critters[i];
				if(critter != self && critter.hasCollision) {

					// Just to make the statement below look a little less fucked.
					var selfPosition = { left: self.position.x, top: self.position.y, right: self.position.x+26, bottom: self.position.y+37 };
					var critterPosition = { left: critter.position.x, top: critter.position.y, right: critter.position.x+26, bottom: critter.position.y+37 };

					// True if there is a collision.
					/*console.log( "Collision: " +  
						!( 
							critterPosition.left > selfPosition.right || 
							critterPosition.right < selfPosition.left || 
							critterPosition.top > selfPosition.bottom || 
							critterPosition.bottom < selfPosition.top 
						)
					)*/
				} 
			}
		}

		// Handle detection collisions.
		if(self.proximityDetector.enabled) {
			for(var i in this.critters) {
				var critter = this.critters[i];
				if(critter != self && !self.focus && critter.proximityDetector.enabled) {
					if(self.position.distanceTo(critter.position) <= self.proximityDetector.radius) {
						self.focus = critter;
						console.log("Critter[" + ix + "] is focused on: Critter[" + i +"]" );
					}
				}
			}
		}
	}
}

 
function Critter(x, y, element) {
	this.element = element;
	this.position = new Vector2(x, y);
	this.element.position = new Vector2(x, y);
	this.startPosition = null;

	this.speed = 1;
	this.stepLength = 25;

	this.actions = [];
	this.focus = null;

	this.hasCollision = true;
	this.proximityDetector = {
		enabled: true,
		radius: 100
	};
}

Critter.prototype.walkTo = function(x, y) {
	var endPosition = new Vector2(x, y);

	// Reached destination. Remove action.
	if(Math.round(this.position.distanceTo(endPosition)) <= 0) {
		this.removeCompletedAction();
		return false;
	}
	
	var angle = this.position.findAngleBetween(endPosition);
	var newPosition = new Vector2(this.position.x + Math.sin(angle) * this.speed, this.position.y + Math.cos(angle) * this.speed);

	return this.setPosition(newPosition);
}

Critter.prototype.step = function(direction, steps) {

	if(!this.startPosition) {
		this.startPosition = { x: this.position.x, y: this.position.y }
	}

	var endPosition;
	switch(direction) {
		case "Left": 
			endPosition = new Vector2(this.startPosition.x - (steps*this.stepLength), this.startPosition.y);
			break;
		case "Right":
			endPosition = new Vector2(this.startPosition.x + (steps*this.stepLength), this.startPosition.y);
			break;
		case "Up":
			endPosition = new Vector2(this.startPosition.x, this.startPosition.y - (steps*this.stepLength));
			break;
		case "Down":
			endPosition = new Vector2(this.startPosition.x, this.startPosition.y + (steps*this.stepLength));
			break;
		default: 
			break;
	}

	if(Math.round(this.position.distanceTo(endPosition)) <= 0) {
		this.removeCompletedAction();
		this.startPosition = null;
		return false;
	}

	var angle = this.position.findAngleBetween(endPosition);
	var newPosition = new Vector2(this.position.x + Math.sin(angle) * this.speed, this.position.y + Math.cos(angle) * this.speed);

	return this.setPosition(newPosition);
}

Critter.prototype.walkLeft = function(steps) {
	this.step("Left", steps);
}

Critter.prototype.walkRight = function(steps) {
	this.step("Right", steps);
}

Critter.prototype.walkUp = function(steps) {
	this.step("Up", steps);
}

Critter.prototype.walkDown = function(steps) {
	this.step("Down", steps);
}

Critter.prototype.setPosition = function(v) {
	this.position = v;
	this.element.position = v;
}

Critter.prototype.addAction = function(action) {
	this.actions.push(action);
}

Critter.prototype.removeCompletedAction = function() {
	this.actions.splice(0, 1);
}
 



Template.World.rendered = function()
{
	var world = new World();
};
