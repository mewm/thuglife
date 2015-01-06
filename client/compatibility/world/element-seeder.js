var elementSeeder = (function()
{
	return {
		seedAll: function()
		{
			var shroomsNo = 25;
			for (var i = 0; i < shroomsNo; i++) {
				// Create a new critter in the center of the map with some random offset.
				var element = elementFactory.createShroom(Math.random() * World.width, Math.random() * World.height);
				this.addElement(element);
			}

			var bunnies = 5;
			for (var i = 0; i < bunnies; i++) {
				// Create a new critter in the center of the map with some random offset.
				var element = elementFactory.createBunny(Math.random() * World.width, Math.random() * World.height);
				this.addElement(element);
			}

			var predators = 5;
			for (var i = 0; i < predators; i++) {
				var element = elementFactory.createPredator(Math.random() * World.width, Math.random() * World.height);
				this.addElement(element);
			}
		}
	};
})();