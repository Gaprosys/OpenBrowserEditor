/*

	Name:     input.js
	Created:  20-08-2017 13-31
	Rewriten: 21-10-2017 23-45
	Owner:    Gaprosys

*/

let currentState = {
	lineNode:											undefined,
	lineIndex:										0,
	contentBevorCursor:						"",
	contentBehindCursor:					""
};

function modifiyText(key) {
  generateCurrentState();

  switch(key.charAt(0)) {
    case '^':
      if(key.length != 1) {
				key = key.substring(1, key.length);
        processSpecialKey(key);
      } else {
        currentState.contentBevorCursor += "^";
      }
    break;
    default:
      currentState.contentBevorCursor += key;
    break;
  }
  writeLine();
}

function processSpecialKey(specialKey) {
  switch(specialKey) {

    case "AAAA": // Arrow Left
			if(currentState.contentBevorCursor.length > 0) {
				if(currentState.contentBevorCursor.length == 1) {
					currentState.contentBehindCursor = currentState.contentBevorCursor + currentState.contentBehindCursor;
					currentState.contentBevorCursor = "";
				} else {
					if(currentState.contentBevorCursor.substring(currentState.contentBevorCursor.length - 1, currentState.contentBevorCursor.length) != ";") {
						currentState.contentBehindCursor = currentState.contentBevorCursor.substring(currentState.contentBevorCursor.length - 1, currentState.contentBevorCursor.length) + currentState.contentBehindCursor;
						currentState.contentBevorCursor = currentState.contentBevorCursor.substring(0, currentState.contentBevorCursor.length - 1);
					} else {
						let lastIndexOfAnd = currentState.contentBevorCursor.lastIndexOf("&", currentState.contentBevorCursor.length - 1);
						let searchArea = currentState.contentBevorCursor.substring(lastIndexOfAnd, currentState.contentBevorCursor.length - 1);
						if(searchArea.search(";") > 0) {
							currentState.contentBehindCursor = currentState.contentBevorCursor.substring(currentState.contentBevorCursor.length - 1, currentState.contentBevorCursor.length) + currentState.contentBehindCursor;
							currentState.contentBevorCursor = currentState.contentBevorCursor.substring(0, currentState.contentBevorCursor.length - 1);
						} else {
							currentState.contentBehindCursor = currentState.contentBevorCursor.substring(lastIndexOfAnd, currentState.contentBevorCursor.length) + currentState.contentBehindCursor;
							currentState.contentBevorCursor = currentState.contentBevorCursor.substring(0, lastIndexOfAnd);
						}
					}
				}
			} else {
				if(currentState.lineIndex !=  0) {
					currentState.lineIndex -= 1;
					getLinesArray()[ currentState.lineIndex ].innerHTML += "<div id=\"cursor\"></div>";
					currentState.lineNode.innerHTML = currentState.contentBevorCursor + currentState.contentBehindCursor;
					generateCurrentState();
				}
			}
    break;

    case "AAAB": // Arrow Up
			if(currentState.lineIndex > 0) {
				currentState.lineIndex -= 1;
				let contentFromAboveLine = getLinesArray()[ currentState.lineIndex ].innerHTML;
				if(calculateTextWidth(contentFromAboveLine, currentState.lineNode.style.font, currentState.lineNode.style.fontSize) <= calculateTextWidth(currentState.contentBevorCursor, currentState.lineNode.style.font, currentState.lineNode.style.fontSize)) {
					getLinesArray()[ currentState.lineIndex ].innerHTML += "<div id=\"cursor\"></div>";
				} else {
					let newCursorPos = calculateNewCursorPos(contentFromAboveLine, getLinesArray()[ currentState.lineIndex ].style.font, getLinesArray()[ currentState.lineIndex ].style.fontSize, currentState.contentBevorCursor.length);
					getLinesArray()[ currentState.lineIndex ].innerHTML = contentFromAboveLine.substring(0, newCursorPos) + "<div id=\"cursor\"></div>" + contentFromAboveLine.substring(newCursorPos, contentFromAboveLine.length);
				}
				currentState.lineNode.innerHTML = currentState.contentBevorCursor + currentState.contentBehindCursor;
			} else {
				currentState.lineNode.innerHTML = "<div id=\"cursor\"></div>" + currentState.contentBevorCursor + currentState.contentBehindCursor;
			}
			generateCurrentState();
    break;

    case "AAAC": // Arrow Right
			if(currentState.contentBehindCursor.length > 0) {
				if(currentState.contentBehindCursor.substring(0, 1) != "&") {
					currentState.contentBevorCursor += currentState.contentBehindCursor.substring(0, 1);
					currentState.contentBehindCursor = currentState.contentBehindCursor.substring(1, currentState.contentBehindCursor.length);
				} else {
					let indexOfSemicolon = currentState.contentBehindCursor.indexOf(";", 1);
					currentState.contentBevorCursor += currentState.contentBehindCursor.substring(0, indexOfSemicolon + 1);
					currentState.contentBehindCursor = currentState.contentBehindCursor.substring(indexOfSemicolon + 1, currentState.contentBehindCursor.length);
				}
			} else {
				if(currentState.lineIndex < (getLinesArray().length - 1)) {
					currentState.lineIndex += 1;
					getLinesArray()[ currentState.lineIndex ].innerHTML = "<div id=\"cursor\"></div>" + getLinesArray()[ currentState.lineIndex ].innerHTML;
					currentState.lineNode.innerHTML = currentState.contentBevorCursor + currentState.contentBehindCursor;
				} else {
					if(currentState.lineIndex != (getLinesArray().length - 1)) {
						currentState.lineNode.innerHTML = "<div id=\"cursor\"></div>" + currentState.contentBevorCursor + currentState.contentBehindCursor;
					}
				}
				generateCurrentState();
			}
    break;

    case "AAAD": // Arrow Down
			if(currentState.lineIndex < (getLinesArray().length - 1)) {
				currentState.lineIndex += 1;
				let contentFromUpperLine = getLinesArray()[ currentState.lineIndex ].innerHTML;
				if(calculateTextWidth(contentFromUpperLine, currentState.lineNode.style.font, currentState.lineNode.style.fontSize) <= calculateTextWidth(currentState.contentBevorCursor, currentState.lineNode.style.font, currentState.lineNode.style.fontSize)) {
					getLinesArray()[ currentState.lineIndex ].innerHTML += "<div id=\"cursor\"></div>";
				} else {
					let newCursorPos = calculateNewCursorPos(contentFromUpperLine, getLinesArray()[ currentState.lineIndex ].style.font, getLinesArray()[ currentState.lineIndex ].style.fontSize, currentState.contentBevorCursor.length);
					getLinesArray()[ currentState.lineIndex ].innerHTML = contentFromUpperLine.substring(0, newCursorPos) + "<div id=\"cursor\"></div>" + contentFromUpperLine.substring(newCursorPos, contentFromUpperLine.length);
				}
				currentState.lineNode.innerHTML = currentState.contentBevorCursor + currentState.contentBehindCursor;
			} else {
				currentState.lineNode.innerHTML = currentState.contentBevorCursor + currentState.contentBehindCursor + "<div id=\"cursor\"></div>";
			}
			generateCurrentState();
    break;

    case "AAAH":
			var selection = window.getSelection();
			console.log(selection);
			if(selection.anchorNode == null) {
				if(currentState.contentBevorCursor.length == 0) {
					currentState.lineIndex -= 1;
					if(currentState.lineIndex != -1) {
						getLinesArray()[ currentState.lineIndex ].innerHTML += "<div id=\"cursor\"></div>" + currentState.contentBehindCursor;
						getEditorNode().removeChild(currentState.lineNode);
						generateCurrentState();
					} else {
						currentState.lineIndex += 1;
					}
				} else {
					currentState.contentBevorCursor = currentState.contentBevorCursor.substring(0, (currentState.contentBevorCursor.length - 1));
				}
			} else {
				if(selection.anchorNode.parentNode.id == "editor") {
					//No Idea how to realise
				}
			}
    break;

		case "AAAG":
			//currentState.textBevorCursor += window.clipboardData.getData('Text');
		break;

    case "AABH":
			if(currentState.contentBehindCursor.length == 0) {
				currentState.lineIndex += 1;
				if(currentState.lineIndex < getLinesArray().length) {
					currentState.lineNode.innerHTML = currentState.contentBevorCursor + "<div id=\"cursor\"></div>" + getLinesArray()[ currentState.lineIndex ].innerHTML;
					getEditorNode().removeChild(getLinesArray()[ currentState.lineIndex ]);
					generateCurrentState();
				} else {
					currentState.lineIndex -= 1;
				}
			} else {
					currentState.contentBehindCursor = currentState.contentBehindCursor.substring(1, currentState.contentBehindCursor.length);
			}
    break;

		case "AAAI":
			currentState.contentBevorCursor += "&#9;";
		break;

		case "AAAK":
			currentState.contentBevorCursor += currentState.contentBehindCursor;
			currentState.contentBehindCursor = "";
		break;

		case "AAAL":
			currentState.contentBehindCursor = currentState.contentBevorCursor + currentState.contentBehindCursor;
			currentState.contentBevorCursor = "";
		break;

    case "AAAM":
			let new_line_node = document.createElement("span");
			if(currentState.contentBehindCursor.length == 0) {
				new_line_node.innerHTML = "<div id=\"cursor\"></div>";
				currentState.lineNode.innerHTML = currentState.contentBevorCursor + currentState.contentBehindCursor;
			} else {
				new_line_node.innerHTML = "<div id=\"cursor\"></div>" + currentState.contentBehindCursor;
				currentState.lineNode.innerHTML = currentState.contentBevorCursor;
			}
			if(currentState.lineIndex == (getLinesArray().length - 1)) {
				getEditorNode().appendChild(new_line_node);
			} else {
				currentState.lineIndex += 1;
				getEditorNode().insertBefore(new_line_node, getLinesArray()[ currentState.lineIndex ]);
			}
			generateCurrentState();
    break;
  }
}

function getLinesArray() {
  return Array.from(getEditorNode().children);
}

function getEditorNode() {
	return document.getElementById("editor");
}

function clearEditorArea() {
	document.getElementById("editor").innerHTML = "<span><div id=\"cursor\"></div></span>";
}

function generateCurrentState() {
  currentState.lineNode = document.getElementById("cursor").parentNode;
  currentState.lineIndex = getLinesArray().indexOf(currentState.lineNode);
  let lineContent = currentState.lineNode.innerHTML;
  let cursor_index = lineContent.indexOf("<div id=\"cursor\"");
  let cursor_end_index = lineContent.indexOf("</div>", cursor_index) + 6;
  let line_length = lineContent.length;
  currentState.contentBevorCursor = lineContent.substring(0, cursor_index);
  currentState.contentBehindCursor = lineContent.substring(cursor_end_index, line_length);
}

function writeLine() {
  getLinesArray()[currentState.lineIndex].innerHTML = assembleLine();
  document.getElementById("cursor").style.top = currentState.lineNode.style.top;
  document.getElementById("cursor").style.left = calculateTextWidth(currentState.contentBevorCursor, currentState.lineNode.style.font, currentState.lineNode.style.fontSize);// + 11;
}

function assembleLine() {
	let lineContent = "";
	if(currentState.contentBevorCursor.length != 0) {
		lineContent += currentState.contentBevorCursor;
	}
	lineContent += "<div id=\"cursor\"></div>";
	if(currentState.contentBehindCursor.length != 0) {
		lineContent += currentState.contentBehindCursor;
	}
	return lineContent;
}

function calculateNewCursorPos2(content, font, fontSize, currentCursorPos) {
	let newCursorPos = content.length / 2;
	let newCursorLeft = calculateTextWidth(content.substring(0, newCursorPos), font, fontSize);
	let currentCursorLeft = calculateTextWidth(currentState.contentBevorCursor, currentState.lineNode.style.font, currentState.lineNode.style.fontSize);
	let searchRadius = newCursorPos + 0;
	let lastSearchRadius = searchRadius + 0;
	let searchRunning = true;
	while(searchRunning) {
		if(currentCursorLeft <= (newCursorLeft + 1) && currentCursorLeft >= (newCursorLeft - 1)) {
			searchRunning = false;
		} else {
			searchRadius /= 2;
			if(searchRadius == lastSearchRadius) {
				searchRunning = false;
				continue;
			}
			lastSearchRadius = searchRadius + 0;
			if(currentCursorLeft < newCursorLeft) {
				newCursorPos -= searchRadius;
			} else {
				newCursorPos += searchRadius;
			}
			newCursorLeft = parseInt(calculateTextWidth(content.substring(0, newCursorPos), font, fontSize));
		}
	}
	return newCursorPos;
}

function calculateNewCursorPos(content, font, fontSize, currentCursorPos) {
	let newCursorPos = 1;
	let newCursorPX = calculateTextWidth(content.substring(0, 1), font, fontSize);
	let currentCursorPX = calculateTextWidth(currentState.contentBevorCursor, currentState.lineNode.style.font, currentState.lineNode.style.fontSize);
	let oldPosition = newCursorPX;
	while(newCursorPX < currentCursorPX) {
		if(newCursorPos < content.length) {
			oldPosition = newCursorPX;
			newCursorPos += 1;
			newCursorPX = calculateTextWidth(content.substring(0, newCursorPos), font, fontSize);
		} else {
			break;
		}
	}

	if(newCursorPos != content.length) {
		let diffBev2CurPos = currentCursorPX - oldPosition;
		let diffCur2AftPos = newCursorPX - currentCursorPX;
		if(diffBev2CurPos < diffCur2AftPos) {
			newCursorPos -= 1;
		}
	}

	return newCursorPos;
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
