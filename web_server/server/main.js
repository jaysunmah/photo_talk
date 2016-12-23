import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  Meteor.publish("games", function (lobbyID) {
  	console.log(lobbyID);
    return Meteor.Games.find({lobbyID: lobbyID});
  });
});

Meteor.methods({
    'makeLobby': function(lobbyID, host) {
		Meteor.Games.insert({
			lobbyID: lobbyID,
			host: host,
			players: [host + " (host)"],
			started_game: false,
			finished_game: false,
		});
    },
	'joinLobby': function(lobbyID, player) {
		this.unblock();
		var lobby = Meteor.Games.findOne({lobbyID: lobbyID});
		if (lobby) {
			var currentPlayers = lobby.players;
			currentPlayers.push(player);
			Meteor.Games.update({lobbyID: lobbyID}, {$set: {players: currentPlayers}});
			return true;
		}
		return false;
	},
	'startGame': function(timeRounds, lobbyID) {
		this.unblock();
		var lobby = Meteor.Games.findOne({lobbyID: lobbyID});
		if (lobby) {
			var placeholders = [];
			for (var i = 0; i < lobby.players.length; i++) {
				placeholders.push(i);
			}
			var updates = {
				timePerRound: timeRounds,
				round: 0,
				placeholders: placeholders,
				started_game: true
			}
			Meteor.Games.update({lobbyID: lobbyID}, {$set: updates});
			return true;
		}
		return false;
	},
});

