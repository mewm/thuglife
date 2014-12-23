Template.World.created = function()
{
	this.debugLog = new ReactiveVar([]);
	this.reactiveElements = new ReactiveVar([]);

};

Template.World.rendered = function()
{
	this.world = new World();
	this.reactiveElements.set(this.world.elements);
	this.debugLog.set(World.debugLog);
	World.animateCallback = function()
	{
		this.reactiveElements.set(this.world.elements);
		this.debugLog.set(World.debugLog);
	}.bind(this);
	
	
};

Template.World.events({
	'click button[name="pause"]': function(event, template) {
		console.log("Simulation paused");
		template.world.paused = true;
	},
	'click button[name="play"]': function(event, template) {
		console.log("Simulation resumed");
		template.world.paused = false;
	}
});

Template.World.helpers({
	debugLog: function() {
		return Template.instance().debugLog.get();	
	},
	
	fps: function()
	{ 
		return Template.instance().fps.get();
	},
	thugs: function()
	{
		return Template.instance().reactiveElements.get();
	}
});


Template.ThugDisplay.helpers({
	round: function (amount) {
		return Math.round(amount);
	},
	reverse: function(list)
	{
		return list.reverse()
	}
});
