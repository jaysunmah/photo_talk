Router.configure({
	layoutTemplate: 'main'
});

Router.route('/', function() {
  this.render('landing');
});


