var actionFactory = {
	createWalk: function(newVector)
	{
		return new Move(newVector, this);
	},
	createHarvest: function()
	{
		return new Harvest(this);
	},
	createEat: function(edibleElement)
	{
		return new Eat(edibleElement, this);
	}
};
