Template.World.created = function()
{
	this.debugger = new ReactiveVar('debugInfo');
	this.reactiveElements = new ReactiveVar([]);
	World.debugger = this.debugger;

};

Template.World.rendered = function()
{
	
	this.world = new World();
	this.reactiveElements.set(this.world.elements);
	World.animateCallback = function(elements)
	{
		this.reactiveElements.set(elements);
	}.bind(this);
	
	
};

Template.World.helpers({
	fps: function()
	{
		return Template.instance().debugger.get();
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
