Shroom.prototype = Object.create(BaseElement.prototype);

function Shroom(id, x, y, sprite) {
	BaseElement.apply(this, arguments);
	this.speed = 1;
	this.codeName = 'shroom';
	
}

Shroom.prototype.act = function()
{

	if(this.actionQueue.length > 0) {
		var action = this.actionQueue[0];
		if(action.type == 'walk') {
			this.walkTo(action);
		}
	}
	
	this.walkRandom();
};



