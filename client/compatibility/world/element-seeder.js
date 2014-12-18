var elementSeeder = (function()
{
	return {
		seedAll: function()
		{
			var shroomBatch = new PIXI.SpriteBatch();
			this.stage.addChild(shroomBatch);
			var shroomsNo = 100;
			for (var i = 0; i < shroomsNo; i++) {
				// Create a new critter in the center of the map with some random offset.
				var element = elementFactory.createShroom(Math.random() * 500, Math.random() * 500);
				this.addElement(element, shroomBatch);
			}

			var bunnyBatch = new PIXI.SpriteBatch();
			this.stage.addChild(bunnyBatch);

			var bunnies = 1;
			for (var i = 0; i < bunnies; i++) {
				// Create a new critter in the center of the map with some random offset.
				var element = elementFactory.createBunny(Math.random() * 500, Math.random() * 500);
				this.addElement(element, bunnyBatch);
			}

		}
	};
})();