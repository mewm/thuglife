Shroom.prototype = Object.create(BaseElement.prototype);

function Shroom(id, x, y, canvas) {
	BaseElement.apply(this, arguments);
	this.speed = 0;
	this.codeName = 'shroom';
}

Shroom.prototype.act = function()
{
	//play to cool
};



