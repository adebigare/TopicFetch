var req;
var queryUrl;
var doc;

///////////////////////Get Document Keywords/////////////////////////
function document_keywords(){
	var keywords = '';
	// console.log(keywords);
	var metas = document.getElementsByTagName('meta');
	// alert(metas);
	if (metas) {
  	for (var x=0,y=metas.length; x<y; x++) {
    	if (metas[x].name.toLowerCase() == "keywords") { 
        keywords += metas[x].content; 
      }
  	}
	}
	return keywords != '' ? keywords : false;
} 

///////////////////////////Sends request to server/////////////////// 
function main() {
  req = new XMLHttpRequest();
  req.onload = handleResponse();
  // req.onerror = handleError;
  req.open('GET', buildQueryString(), true);
  req.send();
}

///////////////////////////Build Query String////////////////////////
function buildQueryString () {
  var k = document_keywords();
  var filters = '&count=5&title_only=1';
    // Feed URL.
  var feedUrl = 'http://api.feedzilla.com',
    searchPath = '/v1/articles/search.json?q=';

  // Build the Keyword array
  var keyString = k.split(',');
  // console.log(keyString);
  keyString = keyString.slice(0,2);
  keyString = keyString.map(function (d) {return d.replace(/^[ \t]+/gi,'');});
  keyString = keyString.map(function (d) {return d.replace(/ +/gi,'%20');});
  //console.log(keyString);

  // build the query string
  keyString = keyString.join('+');

  queryUrl = feedUrl + searchPath + keyString + filters;   //queryString;
  return queryUrl;
}

//////////////////////////Handle Parse Failed/////////////////////
function handleFeedParsingFailed(error) {
  var feed = $('feed');
  //$('noStories').style.display = 'none';
  feed.className = 'error';
  feed.innerText = error;
}

//////////////////////////Parse Feed Response/////////////////////
function handleResponse() {
  req.onreadystatechange = function () {
    if (req.readyState==4 && req.status==200) {
      doc = JSON.parse(req.responseText);
    }
  }
  //buildPreview(doc);
}



///////////Send Response to Background.js///////////////////////

chrome.runtime.onMessage.addListener(

	function(request,sender,sendResponse){		
    main();
  	sendResponse({links:doc});
    return true;

});
