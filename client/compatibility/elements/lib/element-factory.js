var elementFactory = {
	textures: {
		bunny: PIXI.Texture.fromImage("bunny.png"),
		shroom: PIXI.Texture.fromImage("shroom.png")
	},
	createBunny: function(x, y)
	{
		var element = new PIXI.Sprite(this.textures.bunny)
		return new Bunny(1, x, y, element);
	},
	createShroom: function(x, y)
	{
		var element = new PIXI.Sprite(this.textures.shroom);
		return new Shroom(2, x, y, element);
	}
};