var sketch1 = function (s) {
    s.preload = function() {
    }

    s.setup = function () {
      s.createCanvas($('#sketch1').width(), 1000);
    };

    s.draw = function () {
	  s.fill(0);
	  s.rect(50,50,100,100);
    }

    s.mouseClicked = function() {
    }
};

/*
 *Template.drawingPhase.onRendered(function() {
 *    new p5(sketch1, "sketch1");
 *})
 */
