
var debugInfo = new ReactiveVar('debugInfo');

Template.World.rendered = function()
{
	World.debugger = debugInfo;
	var world = new World();
	
};



Template.World.helpers({
	debug: function() {
		return debugInfo.get();	
	}
});