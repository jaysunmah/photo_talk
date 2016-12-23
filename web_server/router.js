Router.configure({
	layoutTemplate: 'main'
});

Router.route('/', function() {
  this.render('landing');
});

Router.route('/lobby/:lobbyID', function() {
  this.render('lobby', {
  	data: {
	  lobbyID: this.params.lobbyID
	}
  });
});

Router.route('/sandbox', function() {
  this.render('drawingPhase');
});

