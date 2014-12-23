var elementSeeder = (function()
{
	return {
		seedAll: function()
		{
			var shroomsNo = 2;
			for (var i = 0; i < shroomsNo; i++) {
				// Create a new critter in the center of the map with some random offset.
				var element = elementFactory.createShroom(Math.random() * World.width, Math.random() * World.height);
				this.addElement(element);
			}

			var bunnies = 1;
			for (var i = 0; i < bunnies; i++) {
				// Create a new critter in the center of the map with some random offset.
				var element = elementFactory.createBunny(Math.random() * World.width, Math.random() * World.height);
				this.addElement(element);
			}

			var mfs = 0;
			for (var i = 0; i < mfs; i++) {
				var element = elementFactory.createMotherfucker(Math.random() * World.width, Math.random() * World.height);
				this.addElement(element);
			}
		}
	};
})();