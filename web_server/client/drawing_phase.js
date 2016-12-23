var signaturePad;

Template.drawingPhase.onRendered(function() {
	var wrapper = document.getElementById("signature-pad"),
		clearButton = wrapper.querySelector("[data-action=clear]"),
		saveButton = wrapper.querySelector("[data-action=save]"),
		canvas = wrapper.querySelector("canvas");

	// Adjust canvas coordinate space taking into account pixel ratio,
	// to make it look crisp on mobile devices.
	// This also causes canvas to be cleared.
	function resizeCanvas() {
		// When zoomed out to less than 100%, for some very strange reason,
		// some browsers report devicePixelRatio as less than 1
		// and only part of the canvas is cleared then.
		var ratio =  Math.max(window.devicePixelRatio || 1, 1);
		canvas.width = canvas.offsetWidth * ratio;
		canvas.height = canvas.offsetHeight * ratio;
		canvas.getContext("2d").scale(ratio, ratio);
	}

	window.onresize = resizeCanvas;
	resizeCanvas();

	signaturePad = new SignaturePad(canvas);

});

Template.drawingPhase.events({
  'click #clearCanvas' (event) {
	signaturePad.clear();
  },
  'click #saveCanvas' (event) {
	if (signaturePad.isEmpty()) {
	  alert("Please provide signature first.");
	} else {
	  $('#wei').attr('src', signaturePad.toDataURL());
	}
  },
  'click #eraseCanvas' (event) {
    if (Session.get('eraseCanvas')) {
	  signaturePad.penColor = "black";
	  signaturePad.minWidth = 0.5;
	  signaturePad.maxWidth = 2.5;
	  Session.set('eraseCanvas', false);
	} else {
 	  signaturePad.penColor = "white";
	  signaturePad.minWidth = 10.0;
	  signaturePad.maxWidth = 10.0;
	  Session.set('eraseCanvas', true);
	}
  }

});


Template.drawingPhase.helpers({
    erase: function() {
	  if (Session.get('eraseCanvas')) {
		return 'red';
	  }
	  return '';
    }
});
