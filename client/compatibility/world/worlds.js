var directions = {
	"n": new Vector(0, -1),
	"ne": new Vector(1, -1),
	"e": new Vector(1, 0),
	"se": new Vector(1, 1),
	"s": new Vector(0, 1),
	"sw": new Vector(-1, 1),
	"w": new Vector(-1, 0),
	"nw": new Vector(-1, -1)
};

function World(map, legend)
{
	var grid = new Grid(map[0].length, map.length);
	this.grid = grid;
	this.legend = legend;

	map.forEach(function(line, y)
	{
		for (var x = 0; x < line.length; x++) {
			grid.set(new Vector(x, y),
				elementFromChar(legend, line[x]));
		}
	});
}

World.prototype.turn = function() {
	var acted = [];
	this.grid.forEach(function(critter, vector) {
		if (critter.act && acted.indexOf(critter) == -1) {
			acted.push(critter);
			this.letAct(critter, vector);
		}
	}, this);
};

World.prototype.letAct = function(critter, vector) {
	var action = critter.act(new View(this, vector));
	
	if (action && action.type == "move") {
		var dest = this.checkDestination(action, vector);
		if (dest && this.grid.get(dest) == null) {
			this.grid.set(vector, null);
			this.grid.set(dest, critter);
		}
	}
};

World.prototype.checkDestination = function(action, vector) {
	if (directions.hasOwnProperty(action.direction)) {
		var dest = vector.plus(directions[action.direction]);
		if (this.grid.isInside(dest))
			return dest;
	}
};


World.prototype.toString = function()
{
	var output = "";
	for (var y = 0; y < this.grid.height; y++) {
		for (var x = 0; x < this.grid.width; x++) {
			var element = this.grid.get(new Vector(x, y));
			var mood = null;
			if(element && element.getMood) {
				mood = element.getMood();
			}
			output += charFromElement(element, mood);
		}
		output += "\n";
	}
	return output;
};




function LifelikeWorld(map, legend) {
	World.call(this, map, legend);
}
LifelikeWorld.prototype = Object.create(World.prototype);



LifelikeWorld.prototype.letAct = function(critter, vector) {
	var action = critter.act(new View(this, vector));
	var handled = action &&
		action.type in actionTypes &&
		actionTypes[action.type].call(this, critter,
			vector, action);
	if (!handled) {
		critter.energy -= 0.2;
		if (critter.energy <= 0)
			this.grid.set(vector, null);
	}
};



function randomElement(array)
{
	return array[Math.floor(Math.random() * array.length)];
}

var directionNames = "n ne e se s sw w nw".split(" ");


function dirPlus(dir, n) {
	var index = directionNames.indexOf(dir);
	return directionNames[(index + n + 8) % 8];
}


function elementFromChar(legend, ch)
{
	if (ch == " ") {
		return null;
	}
	var element = new legend[ch]();
	element.originChar = ch;
	return element;
}


function charFromElement(element, moodClass)
{
	if (element == null) {
		return " ";
	} else {
		if(moodClass) {
			return '<span class="mood-' + moodClass + '">' + element.originChar + '</span>';
		}
		return element.originChar;
	}
}
