/**
 * Reports the height.
 */
function reportHeight() {
  var msg = JSON.stringify({type:"size", size:document.body.offsetHeight});
  parent.postMessage(msg, "*");
}

/**
 * Initialize the iframe body.
 */
function frameLoaded() {
  var links = document.getElementsByTagName("A");
  for (var i = 0, link; link = links[i]; i++) {
    var x = link.className;
    if (x != "item_title" && x != "open_box") {
      link.addEventListener("click", showStory);
    }
  }
  window.addEventListener("message", messageHandler);
}

/**
 * Redirects to Google news site according to clicked URL.
 * @param {Object} event Onclick event.
 */
function showStory(event) {
  var href = event.currentTarget.href;
  parent.postMessage(JSON.stringify({type:"show", url:href}), "*");
  event.preventDefault();
}

/**
 * Handles message.
 * @param {Object} event Onmessage event.
 */
function messageHandler(event) {
  reportHeight();
}


