/*

  Name:     file.js
  Created:  20-08-2017 13-00
  Owner:    Gaprosys

*/


function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}

function openFile(path) {
  let returnValue = {"", ""};
  let connection = assembleHttpRequestObject();
  if(connection != null) {
    connection.open("GET", "file://" + path);
    connection.onreadystatechange = function() {
      if(connection.readyState == 4) { returnValue = {"DONE", connection.responseText}; }
    }
    connection.send(null);
  } else {
    returnValue = {"No Connection established", ""};
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
