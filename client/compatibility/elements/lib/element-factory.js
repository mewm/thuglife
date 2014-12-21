var elementFactory = {
	chance: new Chance(),
	textures: {
		bunny: PIXI.Texture.fromImage("bunny.png"),
		shroom: PIXI.Texture.fromImage("shroom.png")
	},
	createBunny: function(x, y)
	{
		var element = new PIXI.Sprite(this.textures.bunny);
		var bunny = new Bunny(1, x, y, element);
		bunny.name = this.chance.first();
		return bunny;
	},
	createShroom: function(x, y)
	{
		var element = new PIXI.Sprite(this.textures.shroom);
		var shroom = new Shroom(2, x, y, element);
		return shroom;
	}
};