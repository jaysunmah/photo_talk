Template.lobby.onRendered(function() {
  	Session.set('lobbyID', this.data.lobbyID);
	$('#lobbyContainer').transition({
		animation: 'fade left',
		duration: 750
	});
	Meteor.subscribe('games', this.data.lobbyID);
});

Template.lobby.helpers({
	lobbyID: function() {
		return Session.get('lobbyID');
	},
    gameData: function() {
        return Meteor.Games.findOne({});
    }
});
