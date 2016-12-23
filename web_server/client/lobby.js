Template.lobby.onRendered(function() {
  	Session.set('lobbyID', this.data.lobbyID);
	$('#lobbyContainer').transition({
		animation: 'fade left',
		duration: 750
	});
	Meteor.subscribe('games', this.data.lobbyID);
	$('.ui.dropdown').dropdown();
});

Template.lobby.events({
  'click #startGame' (event) {
	var cb = function() {
	  console.log('success!');
	};

    $('#lobbyContainer').transition({
	  animation: 'fade right',
	  duration: 750,
	  onHide: cb
	});

	Meteor.call('startGame', $('#timeRounds').text(), Session.get('lobbyID'));
  },
});

Template.lobby.helpers({
	lobbyID: function() {
		return Session.get('lobbyID');
	},
    gameData: function() {
        return Meteor.Games.findOne({});
    }
});
