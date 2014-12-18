var actionFactory = {
	createWalk: function(newVector)
	{
		return new Move(newVector, this.position);
	}
};
