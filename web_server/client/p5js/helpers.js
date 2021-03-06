var leftmostX = 490.04;
var rightmostX = 517.32;
var topmostY = 433.96;
var bottommostY = 394.88;

canvasToWorld = function(x, y) {
	if (Session.get('calibrationPoints')) {
		var canvasLeftX = Session.get('calibrationPoints').left.x;
		var canvasRightX = Session.get('calibrationPoints').right.x;
		var xProportion = (x - canvasLeftX) / (canvasRightX - canvasLeftX);
		var xCoord = leftmostX + (rightmostX - leftmostX) * xProportion;
		var xResult = Number((xCoord).toFixed(5));

		var canvasTopY = Session.get('calibrationPoints').top.y;
		var canvasBottomY = Session.get('calibrationPoints').bottom.y;
		var yProportion = (y - canvasTopY) / (canvasBottomY - canvasTopY);
		var yCoord = bottommostY + (topmostY - bottommostY) * (1 - yProportion);
		var yResult = Number((yCoord).toFixed(5));

		return {x: xResult, y: yResult};
	} else {
		return {x: -1, y: -1};
	}
}
worldToCanvas = function(x, y) {
	return {x: -1, y: -1};
}

displayInstructions = function(s, count) {
  var instructions;
  if (Session.get('mouseSelect') == 'left') {
    Session.set('runtimeStatus', "Please select the left\nmost boundary");
  } else if (Session.get('mouseSelect') == 'right') {
    Session.set('runtimeStatus', "Please select the right\nmost boundary");
  } else if (Session.get('mouseSelect') == 'top') {
    Session.set('runtimeStatus', "Please select the top\nmost boundary");
  } else if (Session.get('mouseSelect') == 'bottom') {
    Session.set('runtimeStatus', "Please select the bottom\nmost boundary");
  }
}

drawCalibrationLines = function(s) {
  var calibrationCount = 0;
  if (calibrationPoints.left.x >= 0) {
    drawVerticalLine(s, calibrationPoints.left.x);
    calibrationCount += 1;
  }
  if (calibrationPoints.right.x >= 0) {
    drawVerticalLine(s, calibrationPoints.right.x);
    calibrationCount += 1;
  }
  if (calibrationPoints.top.x >= 0) {
    drawHorizontalLine(s, calibrationPoints.top.y);
    calibrationCount += 1;
  }
  if (calibrationPoints.bottom.x >= 0) {
    drawHorizontalLine(s, calibrationPoints.bottom.y);
    calibrationCount += 1;
  }
  //displayInstructions(s, calibrationCount);
  return calibrationCount;
}

drawHorizontalLine = function(s, y) {
  s.strokeWeight(5);
  s.stroke('#ff7361');
  var xStart = 0;
  var xEnd = s.windowWidth;

  if (calibrationPoints.left.x >= 0) {
    xStart = calibrationPoints.left.x;
  }

  if (calibrationPoints.right.x >= 0) {
    xEnd = calibrationPoints.right.x;
  }
  s.line(xStart, y, xEnd, y);
  
  s.noStroke();
  s.strokeWeight(1);
}

drawVerticalLine = function(s, x) {
  s.strokeWeight(5);
  s.stroke('#ff7361');
  var yStart = 0;
  var yEnd = s.windowHeight;

  if (calibrationPoints.top.y >= 0) {
    yStart = calibrationPoints.top.y;
  }

  if (calibrationPoints.bottom.y >= 0) {
    yEnd = calibrationPoints.bottom.y;
  }
  s.line(x, yStart, x, yEnd);

  s.noStroke();
  s.strokeWeight(1);
}

drawRobotSetPoint = function(s, x, y) {
  //s.ellipse(x, y, 10, 10);
  s.push();
  s.fill('#ff7361');
  s.translate(x, y);
  s.rotate(s.radians(45));
  s.rect(0,0,6,40);
  s.rotate(s.radians(90));
  s.rect(0,0,6,40);
  s.pop();
}

drawRobotInitPos = function(s, x, y, th) {
  var th = -1 * th;
  s.rectMode(s.CENTER);
  s.push();
  s.fill('#ff7361');
  s.translate(x,y);
  s.rotate(s.radians(th));
  s.rect(0,0,4,35);
  s.rotate(s.radians(30));
  s.rect(-9, -3, 4, 20);
  s.rotate(s.radians(-60));
  s.rect(9, -3, 4, 20);
  s.pop();
}

drawRobot = function(s, x, y, th) {
  s.push();
  s.fill('#ff7361');
  s.translate(x, y);
  s.rotate(s.radians(-1 * th));
  s.rect(0,5,20,15);
  s.arc(0,0,20, 25, s.PI, 0);
  s.fill('#000');
  s.rect(-12, 4, 4, 10);
  s.rect(12, 4, 4, 10);
  s.pop();
}

