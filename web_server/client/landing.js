Template.landing.events({
  'change #headingInput' (event) {
    Session.set('initializedHeading', true);
  },
});

Template.landing.helpers({
  runtimeStatus: function() {
    return Session.get('runtimeStatus') || 'Welcome to Turtlebot!';
  },
});
