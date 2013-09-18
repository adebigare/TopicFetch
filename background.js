var doc;

//////////////////////Send Message to Content-Script.js/////////
function fetchLinks() {
		chrome.tabs.executeScript(null, {
				file: "jquery.min.js"
		});
		chrome.tabs.executeScript(null, {
				file: "Content-Script.js"
		});
		chrome.tabs.query({
				active: true,
				currentWindow: true
		}, function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {greeting: "fetch"}, function (response) {
						doc = response.links;
						popUpUI();
				});
		});
}

//////////////////////Build popup/////////////////////////////

function popUpUI() {
	for (i=0; i<doc.articles.length; i++ ) {
		var div = document.createElement('div');
		div.id = 'article';
		document.body.appendChild(div);

		var element = document.getElementById('article');

		var title = document.createElement('a');
		title.setAttribute('target','_blank');
		title.id = 'title';
		title.href = doc.articles[i].url;
		title.innerHTML = doc.articles[i].title;
		element.appendChild(title);

		var author = document.createElement('p');
		var authorNode = document.createTextNode('By: ' + doc.articles[i].source);
		author.id = 'author';
		author.appendChild(authorNode);
		element.appendChild(author);

		var publishDate = document.createElement('p');
		var publishDateNode = document.createTextNode(doc.articles[i].publish_date);
		publishDate.id = 'date';
		publishDate.appendChild(publishDateNode);
		element.appendChild(publishDate);
	}
}
		//////////////////////End Build Popup/////////////////////////

		////////////////Iframe/////////////////////////////

		/////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function () {
		fetchLinks();
});