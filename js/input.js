/*

  Name:     input.js
  Created:  20-08-2017 13-31
  Owner:    Gaprosys

*/

let linePos = 0;
let lastLinePos = -1;

let currentState = {
  spanElement:              undefined,
  lineContent:              "",
  editorContent:            "",
  indexOfCursor:            0,
  indexOfCursorInEditor:    0,
  indexOfEndCursor:         0,
  indexOfEndCursorInEditor: 0,
  textBevorCursor:          "",
  textBehindCursor:         ""

};

function modifiyText(key) {
  generateCurrentState();

  lastLinePos = linePos;
  linePos = -1;

  switch(key.charAt(0)) {
    case '^':
      if(key.length != 1) {
				key = key.substring(1, key.length);
        processSpecialKey(key);
      } else {
        currentState.textBevorCursor += "^";
      }
    break;
    default:
      currentState.textBevorCursor += key;
    break;
  }
  writeLine();
}

function processSpecialKey(specialKey) {
  switch(specialKey) {

    case "AAAA": // Arrow Left
      if(currentState.textBevorCursor != "") {
        if(currentState.textBevorCursor.length == 1) {
          currentState.textBehindCursor = currentState.textBevorCursor + currentState.textBehindCursor;
          currentState.textBevorCursor = "";
        } else if(currentState.textBevorCursor.length > 1) {
          if(currentState.textBevorCursor.substring(currentState.textBevorCursor.length-1, currentState.textBevorCursor.length) != ";") {
            currentState.textBehindCursor = currentState.textBevorCursor.substring(currentState.textBevorCursor.length-1, currentState.textBevorCursor.length) + currentState.textBehindCursor;
            currentState.textBevorCursor = currentState.textBevorCursor.substring(0, currentState.textBevorCursor.length-1);
          } else {
            let lastIndexOfAnd = currentState.textBevorCursor.lastIndexOf("&", currentState.textBevorCursor.length-1);
            let searchArea = currentState.textBevorCursor.substring(lastIndexOfAnd, currentState.textBevorCursor.length-1);
            if(searchArea.search(";") > 0) {
              currentState.textBehindCursor = currentState.textBevorCursor.substring(currentState.textBevorCursor.length-1, currentState.textBevorCursor.length) + currentState.textBehindCursor;
              currentState.textBevorCursor = currentState.textBevorCursor.substring(0, currentState.textBevorCursor.length-1);
            } else {
              currentState.textBehindCursor = currentState.textBevorCursor.substring(lastIndexOfAnd, currentState.textBevorCursor.length) + currentState.textBehindCursor;
              currentState.textBevorCursor = currentState.textBevorCursor.substring(0, lastIndexOfAnd);
            }
          }
        }
      }
    break;

    case "AAAB": // Arrow Up
      let indexOfLineCurrent = currentState.editorContent.lastIndexOf("<span", currentState.indexOfCursorInEditor) - 7;
      let indexOfLineAbove = currentState.editorContent.lastIndexOf("<span", (indexOfLineCurrent)) + 6;
			if(indexOfLineCurrent > 0) {
      	let contentOfAboveLine = currentState.editorContent.substring(0, indexOfLineCurrent);
      	contentOfAboveLine = contentOfAboveLine.substring(indexOfLineAbove, contentOfAboveLine.length);
				currentState.spanElement.innerHTML = currentState.textBevorCursor + currentState.textBehindCursor;
     		currentState.editorContent = cutTextOut(currentState.editorContent, currentState.indexOfCursorInEditor, currentState.indexOfEndCursorInEditor);

        let indexOfLineEndAbove = indexOfLineCurrent;
      	let newEditorContent = currentState.editorContent.substring(0, indexOfLineEndAbove);
      	newEditorContent += "<div id=\"cursor\"></div>";
      	newEditorContent += currentState.editorContent.substring(indexOfLineEndAbove, currentState.editorContent.length);

      	document.getElementById("editor").innerHTML = newEditorContent;
      	generateCurrentState();
		}
    break;

    case "AAAC": // Arrow Right
      if(currentState.textBehindCursor != "") {
        if(currentState.textBehindCursor.substring(0, 1) != "&") {
          currentState.textBevorCursor += currentState.textBehindCursor.substring(0, 1);
          currentState.textBehindCursor = currentState.textBehindCursor.substring(1, currentState.textBehindCursor.length);
        } else {
          let indexOfSemi = currentState.textBehindCursor.indexOf(";", 1);
          currentState.textBevorCursor += currentState.textBehindCursor.substring(0, indexOfSemi+1);
          currentState.textBehindCursor = currentState.textBehindCursor.substring(indexOfSemi+1, currentState.textBehindCursor.length);
        }
      }
    break;

    case "AAAD": // Arrow Down
    let indexOfLineBelow = currentState.editorContent.indexOf("<span", currentState.indexOfCursorInEditor);
		if(indexOfLineBelow != -1) {
			indexOfLineBelow += 6;
    	let contentOfBelowLine = currentState.editorContent.substring(0, (currentState.editorContent.indexOf("</span", indexOfLineBelow)));
    	contentOfBelowLine = contentOfBelowLine.substring(indexOfLineBelow, contentOfBelowLine.length);
    	//currentState.spanElement.innerHTML = currentState.textBevorCursor + currentState.textBehindCursor;
    	currentState.editorContent = cutTextOut(currentState.editorContent, currentState.indexOfCursorInEditor, currentState.indexOfEndCursorInEditor);

    	let cursorPos = (indexOfLineBelow - (currentState.indexOfEndCursorInEditor - currentState.indexOfCursorInEditor)) + contentOfBelowLine.length;
    	let newEditorContent = currentState.editorContent.substring(0, cursorPos);
    	newEditorContent += "<div id=\"cursor\"></div>";
    	newEditorContent += currentState.editorContent.substring(cursorPos, currentState.editorContent.length);

    	document.getElementById("editor").innerHTML = newEditorContent;
    	generateCurrentState();
		}
    break;

    case "AAAH":
      let contentBevorCursor = currentState.textBevorCursor;
      if(contentBevorCursor.length == "") {
        let lastIndexOfSpan = currentState.editorContent.lastIndexOf("</span>", currentState.indexOfCursorInEditor);
        if(lastIndexOfSpan != -1) {
          let newEditorContent = currentState.editorContent.substring(0, lastIndexOfSpan) + currentState.editorContent.substring(currentState.indexOfCursorInEditor, currentState.editorContent.length);
          document.getElementById("editor").innerHTML = newEditorContent;
          generateCurrentState();
        }
      } else {
        if(contentBevorCursor.substring((contentBevorCursor.length-1), contentBevorCursor.length) == ";") {
          var lastIndexOfAnd = contentBevorCursor.lastIndexOf("&", (contentBevorCursor.length-1));
          let searchArea = contentBevorCursor.substring(lastIndexOfAnd, (contentBevorCursor.length-1));
          if(searchArea.search(";") > 0) {
            contentBevorCursor = contentBevorCursor.substring(0, (contentBevorCursor.length-1));
          } else {
            contentBevorCursor = contentBevorCursor.substring(0, lastIndexOfAnd);
          }
        } else {
          contentBevorCursor = contentBevorCursor.substring(0, (contentBevorCursor.length-1));
        }
        currentState.textBevorCursor = contentBevorCursor;
      }
    break;

		case "AAAG":
			//currentState.textBevorCursor += window.clipboardData.getData('Text');
		break;

    case "AABH":
      currentState.textBehindCursor = currentState.textBehindCursor.substring(1, currentState.textBehindCursor.length);
    break;

		case "AAAI":
			currentState.textBevorCursor += "&#9;"
		break;

		case "AAAK":
			currentState.textBevorCursor += currentState.textBehindCursor;
			currentState.textBehindCursor = "";
		break;

		case "AAAL":
			currentState.textBehindCursor = currentState.textBevorCursor + currentState.textBehindCursor;
			currentState.textBevorCursor = "";
		break;

    case "AAAM":
      let indexOfCurrentSpan = currentState.editorContent.indexOf("</span>", currentState.indexOfCursorInEditor);
      let indexOfCurrentSpanEnd = (indexOfCurrentSpan - (currentState.indexOfEndCursor - currentState.indexOfCursor)) - currentState.textBehindCursor.length + 7;
      currentState.spanElement.innerHTML = currentState.textBevorCursor;
      currentState.textBevorCursor = "";
      currentState.editorContent = document.getElementById("editor").innerHTML;
      let contentBevorSpanEnd = currentState.editorContent.substring(0, indexOfCurrentSpanEnd);
      let contentBehindSpanEnd = currentState.editorContent.substring(indexOfCurrentSpanEnd, currentState.editorContent.length);
      document.getElementById("editor").innerHTML = contentBevorSpanEnd + "<span>" + currentState.textBevorCursor + "<div id=\"cursor\"></div>" + currentState.textBehindCursor + "</span>" + contentBehindSpanEnd;
      currentState.spanElement = document.getElementById("cursor").parentNode;
      document.getElementById("cursor").style.left = "3px";
    break;
  }
}

function generateCurrentState() {
  currentState.spanElement = document.getElementById("cursor").parentNode;
  currentState.lineContent = currentState.spanElement.innerHTML;
  currentState.editorContent = document.getElementById("editor").innerHTML;
  currentState.indexOfCursor = currentState.lineContent.indexOf("<div id=\"cursor\"");
  currentState.indexOfCursorInEditor = currentState.editorContent.indexOf("<div id=\"cursor\"");
  currentState.indexOfEndCursor = (currentState.lineContent.indexOf("</div>", currentState.indexOfCursor) + 6);
  currentState.indexOfEndCursorInEditor = (currentState.editorContent.indexOf("</div>", currentState.indexOfCursorInEditor) + 6);
  currentState.textBevorCursor = currentState.lineContent.substring(0, currentState.indexOfCursor);
  currentState.textBehindCursor = currentState.lineContent.substring(currentState.indexOfEndCursor, currentState.lineContent.length);
}

function writeLine() {
  if(currentState.textBevorCursor.length != 0) {
    currentState.spanElement.innerHTML = currentState.textBevorCursor + "<div id=\"cursor\"></div>" + currentState.textBehindCursor;
    positionateCursor(currentState.textBevorCursor);
    document.getElementById("cursor").style.top -= 0;// 13;
    document.getElementById("editor").scrollLeft = parseInt(document.getElementById("cursor").style.left);
    document.getElementById("editor").scrollTop = currentState.spanElement.offsetTop - document.getElementById("editor").offsetHeight;
  } else {
    if(currentState.textBehindCursor.length != 0) {
      currentState.spanElement.innerHTML = "<div id=\"cursor\"></div>" + currentState.textBehindCursor;
      positionateCursor("");
      document.getElementById("editor").scrollTop = currentState.spanElement.offsetTop - document.getElementById("editor").offsetHeight;
      document.getElementById("editor").scrollLeft = parseInt(document.getElementById("cursor").style.left);
    } else {
      currentState.spanElement.innerHTML = "<div id=\"cursor\"></div>" + currentState.textBehindCursor;
      positionateCursor("");
      document.getElementById("cursor").style.top -= 0;//13;
      document.getElementById("cursor").style.left = calculateTextWidth("", currentState.spanElement.style.font, currentState.spanElement.style.fontSize);
      document.getElementById("editor").scrollTop = (currentState.spanElement.offsetTop - 13) - document.getElementById("editor").offsetHeight;
      document.getElementById("editor").scrollLeft = parseInt(document.getElementById("cursor").style.left);
    }
  }
}

function positionateCursor(content) {
  document.getElementById("cursor").style.top = currentState.spanElement.style.top;
  document.getElementById("cursor").style.left = calculateTextWidth(content, currentState.spanElement.style.font, currentState.spanElement.style.fontSize);// + 11;
}

function calculateTextWidth(text, font, fontSize) {
	var textWidth = document.getElementById("textWidth");
	var width;
	textWidth.innerHTML = text;
	textWidth.style.font = font;
	textWidth.style.fontSize = fontSize;

	width = textWidth.offsetWidth;

	textWidth.innerHTML = "";

	return width;
}
