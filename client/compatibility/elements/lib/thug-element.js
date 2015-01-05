ThugElement.prototype = Object.create(BaseElement.prototype);

function ThugElement(id, startX, startY, sprite)
{
	BaseElement.apply(this, arguments);

	//Element base stats/state
	this.speed = 1;
	this.energy = 100;
	this.isAlive = true;
	
	//Thugs needs to be up to par with dead elements!
	//This is so it quickly can remove 
	$.subscribe('element/dead', function(element) {
		console.log((this.name || this.type) + ': Roger that. Element is dead');
		
	}.bind(this));
	
}

ThugElement.constructor = ThugElement;

