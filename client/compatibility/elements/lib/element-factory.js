var elementFactory = {
	createBunny: function(x, y)
	{
		var texture = PIXI.Texture.fromImage("bunny.png");
		var element = new PIXI.Sprite(texture)
		return new Bunny(1, x, y, element);
	},
	createShroom: function(x, y)
	{
		var texture = PIXI.Texture.fromImage("shroom.png");
		var element = new PIXI.Sprite(texture)
		return new Shroom(2, x, y, element);
	}
};