/*

  Name:     mouse.js
  Created:  20-08-2017 13-31
  Owner:    Gaprosys

*/

addEventListener("mousedown", mouseclick);

function mouseclick(evt) {
  console.log(evt);
  let elem = evt.target;
  if(elem.tagName == "SPAN") {
    generateCurrentState();
    currentState.spanElement.innerHTML = currentState.textBevorCursor + currentState.textBehindCursor;
    elem.innerHTML += "<div id=\"cursor\"></div>";
    generateCurrentState();
    positionateCursor(currentState.textBevorCursor);
  }
}
