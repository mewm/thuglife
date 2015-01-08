var actionFactory = {
	createWalk: function(newVector)
	{
		return new Move(newVector, this);
	},
	createRandomWalk: function() 
	{
		// I guess we could just use Move(newVector, this) here as well, but I'll just make a new func in case they differ in the future.
		return new MoveRandom(this);
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
