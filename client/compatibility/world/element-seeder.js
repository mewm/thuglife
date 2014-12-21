var elementSeeder = (function()
{
	return {
		seedAll: function()
		{
			var shroomBatch = new PIXI.SpriteBatch();
			this.stage.addChild(shroomBatch);
			var shroomsNo = 500;
			for (var i = 0; i < shroomsNo; i++) {
				// Create a new critter in the center of the map with some random offset.
				var element = elementFactory.createShroom(Math.random() * World.width, Math.random() * World.height);
				
				this.addElement(element, shroomBatch);
			}

			var bunnyBatch = new PIXI.DisplayObjectContainer();
			this.stage.addChild(bunnyBatch);

			var bunnies = 3;
			for (var i = 0; i < bunnies; i++) {
				// Create a new critter in the center of the map with some random offset.
				var element = elementFactory.createBunny(Math.random() * World.width, Math.random() * World.height);

				var graphics = new PIXI.Graphics();

				// Proximity Radius.
				graphics.beginFill(0x000000, 0.25);
				graphics.drawCircle(0,0,200);
				graphics.endFill();

				// Collision Box.
				graphics.beginFill(0xFF0000, 0.5);
				// Need AssetLoader to get the width and height of the spirte here for some reason. element.sprite.width/height will return 1 here.
				graphics.drawRect(-(26/2), -(47/2), 26, 47);
				graphics.endFill();
				
				//Name tag
				var name = new PIXI.Text(element.name, {
					font: "bold 12px Arial",
					fill: "white",
					stroke: "black",
					strokeThickness: 1,
					align: "center"
				});
				
				name.x = -15;
				name.y = 20;
				
				bunnyBatch.addChild(graphics);
				graphics.addChild(name);

				element.graphics = graphics;

				this.addElement(element, bunnyBatch);
			}
		}
	};
})();