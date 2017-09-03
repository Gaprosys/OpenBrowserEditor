function cutTextOut(content, startCut, endCut) {
  let resultContent = content.substring(0, startCut);
  resultContent += content.substring(endCut, content.length);
  return resultContent;
}
