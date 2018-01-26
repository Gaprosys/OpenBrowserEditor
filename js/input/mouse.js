/*

  Name:     mouse.js
  Created:  20-08-2017 13-31
  Owner:    Gaprosys

*/

addEventListener("mousedown", mouseclick);



function mouseclick(evt) {
  let elem = evt.target;
  if(elem.tagName == "SPAN") {
    generateCurrentState();
    currentState.lineNode.innerHTML = currentState.contentBevorCursor + currentState.contentBehindCursor;
		if(evt.clientX >= calculateTextWidth(elem.innerHTML, elem.style.font, elem.style.fontSize)) {
    	elem.innerHTML += "<div id=\"cursor\"></div>";
		} else {
			let cursorPos = calculateCursorPos(elem.innerHTML, elem.style.font, elem.style.fontSize, evt.clientX);
			elem.innerHTML = elem.innerHTML.substring(0, cursorPos) + "<div id=\"cursor\"></div>" + elem.innerHTML.substring(cursorPos, elem.innerHTML.length);
		}
    generateCurrentState();
		document.getElementById("cursor").style.top = currentState.lineNode.style.top;
	  document.getElementById("cursor").style.left = calculateTextWidth(currentState.contentBevorCursor, currentState.lineNode.style.font, currentState.lineNode.style.fontSize);// + 11;
  }
}

function calculateCursorPos(content, font, fontSize, currentClickLeft) {
	let newCursorPos = parseInt(content.length / 2);
	let newCursorLeft = calculateTextWidth(content.substring(0, newCursorPos), font, fontSize);
	let searchRadius = newCursorPos + 0;
	let lastSearchRadius = searchRadius + 0;
	let searchRunning = true;
	while(searchRunning) {
		if(currentClickLeft <= (newCursorLeft + 2) && currentClickLeft >= (newCursorLeft - 2)) {
			searchRunning = false;
		} else {
			searchRadius /= 2;
			searchRadius = parseInt(searchRadius);
			if(searchRadius == lastSearchRadius) {
				searchRunning = false;
				continue;
			}
			lastSearchRadius = searchRadius;
			if(currentClickLeft < newCursorLeft) {
				newCursorPos -= searchRadius;
			} else {
				newCursorPos += searchRadius;
			}
			newCursorLeft = parseInt(calculateTextWidth(content.substring(0, newCursorPos), font, fontSize));
		}
	}
	return newCursorPos;
}

function getSelectedText() {
	let content;
    if (window.getSelection) {
        content = window.getSelection();
    } else if (document.getSelection) {
        content = document.getSelection();
    } else if (document.selection) {
        content = document.selection.createRange().text;
    }
    return content;  
}