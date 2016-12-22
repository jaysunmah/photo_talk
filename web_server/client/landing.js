function makeid(len) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < len; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

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
	  var lobbyID = makeid(10);
	  Meteor.call('makeLobby', lobbyID, username);

	  var cb = function() {
		Router.go('/lobby/' + lobbyID);
	  };
	  $('#landingContents').transition({
		animation: 'fade right',
		duration: 750,
		onHide: cb
	  });
	}
  },
  'click #joinLobby' (event) {
	var username = $('#username').val();
    var lobbyID = $('#lobbyInput').val();
    if (username == '') {
	  $('#username').transition('bounce', '1000ms');
	  $('#usernameContainer').addClass('error');
	} else if (lobbyID == '') {
      $('#lobbyInputContainer').addClass('error');
	  $('#lobbyInput').transition('bounce', '1000ms');
    } else {
      var cb = function(err, response) {
        if (response) {
          Router.go('/lobby/' + lobbyID);
        } else {
          $('#lobbyInputContainer').addClass('error');
	      $('#lobbyInput').transition('bounce', '1000ms');
        }
      }
      Meteor.call('joinLobby', lobbyID, username, cb);
    }
  }
});

Template.landing.helpers({
  joiningGame: function() {
    return Session.get('joiningGame');
  },
});

Template.landing.onRendered(function() {
	$('#landingContents').transition({
		animation: 'fade left',
		duration: 750,
	});
});
