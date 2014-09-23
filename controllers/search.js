var CONFIG = arguments[0] || {};

// set the search hintText
$.q.hintText = CONFIG.hint;
$.searchButton.image = CONFIG.theme == "white" ? WPATH("/images/white/next.png") : WPATH("/images/black/next.png");
/**
 * search event handler
 * @param {OBJECT} e  The event object
 */
function doSearch(e) {
  if(CONFIG.callback) {
    console.log($.q.value);
    CONFIG.callback($.q.value);
  }
};

$.blurSearch = function() {
  $.q.blur();
}
