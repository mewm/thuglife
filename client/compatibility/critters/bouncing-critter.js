function BouncingCritter()
{
	this.direction = randomElement(directionNames);
};

BouncingCritter.prototype.act = function(view)
{
	if (view.look(this.direction) != " ") {
		this.direction = view.find(" ") || "s";
	}
	return {type: "move", direction: this.direction};
};

