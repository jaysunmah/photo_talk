Template.landing.events({
  'click #joinGame' (event) {
    Session.set('joiningGame', true);
  },
  'click #createGame' (event) {
	var username = $('#username').val();
	if (username == '') {
	  $('#username').transition('bounce', '1000ms');
	  $('#usernameContainer').addClass('error');
	} else {

	}
  },
});

Template.landing.helpers({
  joiningGame: function() {
    return Session.get('joiningGame');
  },
});
