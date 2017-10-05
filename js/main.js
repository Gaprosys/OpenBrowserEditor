/*

  Name:     main.js
  Created:  20-08-2017 13-31
  Owner:    Gaprosys

*/

var editorID;
var flags = {displayCursor: true};
var configuration = {intervalCursor: 350};
var keyboard_pressed = {isStrg: false, isShift: false, isAlt: false, isAltGraph: false};
var cursorThreadStorage;

function init() {
  cursorThreadStorage = setInterval(cursorThread, configuration.intervalCursor);
}

function cursorThread() {
  if(flags.displayCursor == false) return;
  if(document.getElementById("cursor") === null) return;

  var cursorStyle = document.getElementById("cursor").style;
	if(cursorStyle.visibility == "hidden")
		cursorStyle.visibility = "visible";
	else
		cursorStyle.visibility = "hidden";
}
