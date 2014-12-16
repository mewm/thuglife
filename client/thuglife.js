var critterFactory = {
	createBunny: function(x, y)
	{
		var texture = PIXI.Texture.fromImage("bunny.png");
		var element = new PIXI.Sprite(texture)
		var critter = new Critter(x, y, element);
		
		return {
			element: element,
			critter: critter
		}
	}
};
 
 
function World()
{
	this.stage = new PIXI.Stage(0x66FF99);
	this.renderer = new PIXI.WebGLRenderer(400, 300);//autoDetectRenderer(400, 300);
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
	var seeds = 1;
	for(var i = 0; i < seeds; i++) {
		var critter = this.critterFactory.createBunny(0, 0);
		this.addCritter(critter);
	}
};
 
World.prototype.addCritter = function(critter)
{
	this.stage.addChild(critter.element);
	this.critters.push(critter);
};
 
World.prototype.turn = function()
{
	for(var ix in this.critters) {
		var critter = this.critters[ix];
		critter.critter.move();
	}
}


 
 
 var SPEED_WEIGHT = 1;
function Critter(x, y, stage) {
	this.stage = stage;
	this.position = { x: x, y: y };
	this.speed = 1; //1 speed == 1 step == 1x
}

Critter.prototype.move = function() {

	if(Math.round(this.position.x) != 100 && Math.round(this.position.y) != 380) {
		this.walkTo(100,380);
	}

};

Critter.prototype.moveLeft = function(steps) {
	var currentX = this.position.x;
	var currentY = this.position.y;

	var x = currentX - steps;
	this.moveTo(x, currentY);
};
 
Critter.prototype.walkTo = function(x, y) {
	var currentX = this.position.x;
	var currentY = this.position.y;

	if(getDistanceBetweenTwoPoints(currentX, currentY, x, y) <= 0) {
		return false;
	}
	
	var angle = getAngleBetweenTwoPoints(currentX, currentY, x, y);
	var newX = currentX + Math.cos(angle) * this.speed;
	var newY = currentY + Math.sin(angle) * this.speed;

	return this.setPosition(newX, newY);
}
 
 


Critter.prototype.setPosition = function(x, y) {
	this.position = { x: x, y: y };
	this.stage.position = { x: x, y: y };
}
 
Template.World.rendered = function()
{
	var world = new World();
};






function getAngleBetweenTwoPoints(x1, y1, x2, y2) {
    return Math.atan2(x2-x1, y2-y1);
}

function getDistanceBetweenTwoPoints(x1, y1, x2, y2) {
	return Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) )
}