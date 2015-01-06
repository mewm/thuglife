var elementFactory = {
	chance: new Chance(),

	textures: {
		bunny: PIXI.Texture.fromImage("bunny.png"),
		predator: PIXI.Texture.fromImage("bunny-ultra-thug.png"),
		shroom: PIXI.Texture.fromImage("shroom.png")
	},

	createBunny: function(x, y)
	{
		var spritecontainer = new PIXI.DisplayObjectContainer();
		var sprite = new PIXI.Sprite(this.textures.bunny);
		sprite.anchor.x = 0.5;
		sprite.anchor.y = 0.5;
		var bunny = new Bunny(1, x, y, spritecontainer);
		bunny.name = this.chance.first();
		bunny.thugsprite = sprite;		
		var graphics = new PIXI.Graphics();

		// Proximity Radius.
		graphics.beginFill(0x000000, 0.25);
		graphics.drawCircle(0,0,200);
		graphics.endFill();

		// Collision Box.
		graphics.beginFill(0xFF0000, 0.5);
		graphics.drawRect(-(sprite.width/2), -(sprite.height/2), sprite.width, sprite.height);
		graphics.endFill();

		// Name tag
		var name = new PIXI.Text(bunny.name, {
			font: "bold 12px Arial",
			fill: "white",
			stroke: "black",
			strokeThickness: 1,
			align: "center"
		});
		name.x = -15;
		name.y = 20;
		spritecontainer.addChild(graphics);
		spritecontainer.addChild(name);
		spritecontainer.addChild(sprite);

		return bunny;
	},

	createPredator: function(x, y)
	{
		var spritecontainer = new PIXI.DisplayObjectContainer();
		var sprite = new PIXI.Sprite(this.textures.predator);
		sprite.anchor.x = 0.5;
		sprite.anchor.y = 0.5;
		var predator = new Predator(1, x, y, spritecontainer);
		predator.name = this.chance.first();
		predator.thugsprite = sprite;	

		var graphics = new PIXI.Graphics();

		// Proximity Radius.
		graphics.beginFill(0x000000, 0.25);
		graphics.drawCircle(0,0,200);
		graphics.endFill();

		// Collision Box.
		graphics.beginFill(0xFF0000, 0.5);
		// Need AssetLoader to get the width and height of the spirte here for some reason. element.sprite.width/height will return 1 here.
		graphics.drawRect(-(sprite.width/2), -(sprite.height/2), sprite.width, sprite.width);
		graphics.endFill();

		//Name tag
		var name = new PIXI.Text(predator.name, {
			font: "bold 12px Arial",
			fill: "white",
			stroke: "black",
			strokeThickness: 1,
			align: "center"
		});
		name.x = -15;
		name.y = 20;
		spritecontainer.addChild(graphics);
		spritecontainer.addChild(name);
		spritecontainer.addChild(sprite);

		return predator;
	},

	createShroom: function(x, y)
	{
		var sprite = new PIXI.Sprite(this.textures.shroom);
		var shroom = new Shroom(2, x, y, sprite);
		shroom.thugsprite = sprite;
		return shroom;
	}
};