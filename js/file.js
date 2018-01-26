/*

  Name:     file.js
  Created:  20-08-2017 13-00
  Owner:    Gaprosys

*/

var fileName = "new.txt";

function readFile(evt) {
	let fileInput = document.getElementById("upload_file");
	let file = fileInput.files[0];

	/*
	if(!(file.type.match(/text.* /))) {  		// If File is not in text format
		alert("File not supported!");			// Then give message "File is not supported"
		return;									// and end function;
	}
	*/

	fileName = file.name;
	document.getElementById("fileName").innerHTML = file.name;

	let reader = new FileReader();
	reader.onload = function(e) {
		writeFileContentInEditor(reader.result);
	}
	reader.readAsText(file);
}

function download(text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', fileName);
	pom.setAttribute('target', '_blank');

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}

function writeFileContentInEditor(content) {
	content = content.replace(/\r/g, "");
	content = content.split("\n");
	document.getElementById("editor").innerHTML = "";
	let lineIndex = 0;
	let node = document.createElement("SPAN");
	node.innerHTML = "<div id=\"cursor\"></div>" + htmlEntities(content[lineIndex]);
	document.getElementById("editor").appendChild(node);
	lineIndex++;
	while(lineIndex < content.length) {
		node = document.createElement("SPAN");
		node.innerHTML = htmlEntities(content[lineIndex]);
		document.getElementById("editor").appendChild(node);
		lineIndex++;
	}
}

function writeEditorContentInFile() {
	generateCurrentState();
	let fileContent = "";
	let rawContent = getLinesArray();
	let cnt = 0;
	while(cnt < rawContent.length) {
		if(cnt == currentState.lineIndex) {
			fileContent += currentState.contentBevorCursor + currentState.contentBehindCursor;
		} else {
			fileContent += rawContent[cnt].innerHTML;
		}
		fileContent += "\r\n";							// Windows New Line
		//fileContent += "\n";								// *nix New Line
		cnt++;
	}

	fileContent = fileContent.substring(0, fileContent.length - 2);
	download(fileContent);

}

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/*
function openFile(path) {
  let returnValue = ["", ""];
  let connection = assembleHttpRequestObject();
  if(connection != null) {
    connection.open("GET", "file:///" + path, false);
    connection.onreadystatechange = function() {
      if(connection.readyState == 4) { console.log(connection.responseText); returnValue = ["DONE", connection.responseText]; }
    }
    connection.send();
  } else {
    returnValue = ["No Connection established", ""];
  }

  return returnValue;
}

function assembleHttpRequestObject() {
  let conn = false;
	if(typeof XMLHttpRequest != 'undefined') {
		conn = new XMLHttpRequest();
	}

	if(!conn) {
		try {
			conn = new ActiveXObject("Msxml2.XMLHTTP");
		} catch(e) {
			try {
				conn = new ActiveXObject("Microsoft.XMLHTTP");
			} catch(e) {
				conn = null;
			}
		}
	}
  return conn;
}
*/
