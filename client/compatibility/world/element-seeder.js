var elementSeeder = (function()
{
	return {
		seedAll: function()
		{
			var shroomBatch = new PIXI.SpriteBatch();
			this.stage.addChild(shroomBatch);
			var shroomsNo = 15;
			for (var i = 0; i < shroomsNo; i++) {
				// Create a new critter in the center of the map with some random offset.
				var element = elementFactory.createShroom(Math.random() * 500, Math.random() * 500);
				
				this.addElement(element, shroomBatch);
			}

			var bunnyBatch = new PIXI.DisplayObjectContainer();
			this.stage.addChild(bunnyBatch);



			var bunnies = 1;
			for (var i = 0; i < bunnies; i++) {
				// Create a new critter in the center of the map with some random offset.
				var element = elementFactory.createBunny(Math.random() * 500, Math.random() * 500);

				var graphics = new PIXI.Graphics();
				graphics.alpha = 0.05;
				graphics.beginFill(0x000000);
				graphics.drawCircle(0,0,200);
				graphics.endFill();
				bunnyBatch.addChild(graphics);

				element.graphics = graphics;

				this.addElement(element, bunnyBatch);
			}
		}
	};
})();