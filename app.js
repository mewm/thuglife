if (Meteor.isServer) {
	Meteor.startup(function () {
		console.log('starting up');
	});
}

if (Meteor.isClient) {
	Meteor.startup(function () {
		Tracker.autorun(function () {
			var text = Session.get('foo');
			console.log('Foo', text);
		});
	});
}
