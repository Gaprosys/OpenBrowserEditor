/*

  Name:     main.js
  Created:  20-08-2017 13-31
  Owner:    Gaprosys

*/

var lineTagName="span";
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

  var cursorStyle = document.getElementById("cursor").style;
	if(cursorStyle.visibility == "hidden")
		cursorStyle.visibility = "visible";
	else
		cursorStyle.visibility = "hidden";
}

function assembleUI(id) {
  editorID = id;
  var editorArea = document.getElementById(id);
  var inputDIV = document.createElement("div");
  var textWidthDIV = document.createElement("div");
  var lineSpan = document.createElement(lineTagName);
  var cursorDIV = document.createElement("div");
  var lineBR = document.createElement("br");

  // Configure the elements of the EditorUI

  inputDIV.id = "editor";
  textWidthDIV.id = "textWidth";
  cursorDIV.id = "cursor";
  
  //Assemble the Editor UI
  lineSpan.appendChild(cursorDIV);

  inputDIV.appendChild(lineSpan);
  inputDIV.appendChild(lineBR);

  //Register Editor UI

  editorArea.appendChild(inputDIV);
  editorArea.appendChild(textWidthDIV);

  //Give Style

  let inputDIVElement = document.getElementById("editor");
  inputDIVElement.style.border = "2px solid black";
  inputDIVElement.style.height = "99%";
  inputDIVElement.style.width = "99%";
  inputDIVElement.style.marginLeft = "auto";
  inputDIVElement.style.marginRight = "auto";
  inputDIVElement.style.padding = "3px";
  inputDIVElement.style.overflow = "scroll";

  let textWidthDIVElement = document.getElementById("textWidth");
  textWidthDIVElement.style.whiteSpace = "pre";
  textWidthDIVElement.style.position = "absolute";
  textWidthDIVElement.style.top = "-200%";

  let cursorDIVElement = document.getElementById("cursor");
  cursorDIVElement.style.position = "absolute";
  cursorDIVElement.style.top = "1px";
  cursorDIVElement.style.left = "3px";
  cursorDIVElement.style.height = "17px";
  cursorDIVElement.style.width = "1px";
  cursorDIVElement.style.backgroundColor = "black";

  editorArea.style.overflow = "hidden";
}
