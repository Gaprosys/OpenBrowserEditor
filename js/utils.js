/*

  Name:     file.js
  Created:  20-08-2017 13-45
  Owner:    Gaprosys

*/

function cutTextOut(content, startCut, endCut) {
  let resultContent = content.substring(0, startCut);
  resultContent += content.substring(endCut, content.length);
  return resultContent;
}
