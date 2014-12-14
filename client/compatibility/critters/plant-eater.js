function PlantEater() {
	this.maxEnergy = 20;
	this.energy = 20;
	
}
PlantEater.prototype.act = function(context) {
	var space = context.find(" ");
	if (this.energy > 60 && space)
		return {type: "reproduce", direction: space};
	var plant = context.find("*");
	if (plant)
		return {type: "eat", direction: plant};
	if (space)
		return {type: "move", direction: space};
};

PlantEater.prototype.getMood = function()
{
	if(this.energy / this.maxEnergy < 0.5) {
		return 'bad';
	}
	return 'good';
}