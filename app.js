if (Meteor.isServer) {
	Meteor.startup(function () {
		console.log('starting up');
	});
}

if (Meteor.isClient) {
	Meteor.startup(function () {
	});
}
