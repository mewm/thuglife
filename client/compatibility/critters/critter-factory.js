var critterFactory = {
	createBunny: function(x, y)
	{
		var texture = PIXI.Texture.fromImage("bunny.png");
		var element = new PIXI.Sprite(texture)
		
		var critter = new Bunny(1, x, y, element);
		return {
			element: element,
			critter: critter
		}
	}
};