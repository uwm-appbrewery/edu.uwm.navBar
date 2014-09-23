/**
 * Nav bar widget
 *
 * @class Widgets.edu.uwm.navBar
 */

/**
 * @member Widgets.edu.uwm.navBar
 * @property {Object}	CONFIG
 * @property {String}	CONFIG.image	The image to show in the nav bar (optional)
 * @property {String}	CONFIG.text	The text to show in the nav bar (optional)
 * @property {Boolean}	CONFIG.search	Whether or not to show a search bar in the nav bar (optional)
 */
var CONFIG = arguments[0] || {};
var HANDLERS = ['search'];
var handlers = {};
var theme;
var deviceVersion = parseInt(Titanium.Platform.version.split(".")[0], 10);


/**
 * handler function to interact with originating contoller
 * @param {MIXED} _args handler functions
 */
exports.setHandlers = function(_args) {
	_.each(HANDLERS, function(_h) {
				if (_args[_h]) {
						handlers[_h] = _args[_h];
				}
		});
};

/**
* callback function to handle search
* @param {STRING} query the search query
*/
function handleSearch (query) {
	// pass serach query back to orginating controller
	handlers.search(query);
}


if(CONFIG.image) {
	var image = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, CONFIG.image);

	if(image.exists()) {
		image = image.nativePath;

		$.title = Ti.UI.createImageView({
			image: image,
			height: "26dp",
			width: Ti.UI.SIZE, // this is problamatic on wide images
			top: (OS_IOS && deviceVersion >= 7) ? "30dp" : "10dp",
			bottom: "10dp",
			preventDefaultImage: true
		});
	}
} else if(CONFIG.search) {
	// add search bar
	$.title = Alloy.createWidget('edu.uwm.navBar', 'search', {
		callback: handleSearch,
		hint: (CONFIG.searchHint) ? CONFIG.searchHint : "search"
	}).getView();

} else {
	$.title = Ti.UI.createLabel({
		top: (OS_IOS && deviceVersion >= 7) ? "20dp" : "0dp",
		left: "58dp",
		right: "58dp",
		height: "46dp",
		font: {
			fontSize: "18dp",
			fontFamily: "HelveticaNeue-Medium"
		},
		color: theme == "white" ? "#FFF" : "#000",
		textAlign: "center",
		text: CONFIG.text ? CONFIG.text : ""
	});
}

/**
 * Sets the background color
 * @param {Object} _color The hex color code (e.g. "#FFF")
 */
$.setBackgroundColor = function(_color) {
	$.Wrapper.backgroundColor = _color;

	// Checks the brightness of the background color, sets color of icons/text
	if(hexToHsb(_color).b < 65) {
		theme = "white";
	} else {
		theme = "black"
	}
};

/**
 * Sets the title
 * @param {Object} _text The title text
 */
$.setTitle = function(_text) {
	$.title.text = _text;
};


$.blurTitle = function() {
	$.title.blurSearch();
};

/**
 * Shows the left button
 * @param {Object} _params
 * @param {Function} _params.callback The function to run on left button press
 * @param {String} _params.image The image to show for the left button
 */
$.showLeft = function(_params) {
	if(_params && typeof _params.callback !== "undefined") {
		$.left.visible = true;
		$.leftImage.image = _params.image;

		$.left.addEventListener("click", _params.callback);
	}
};

/**
 * Shows the right button
 * @param {Object} _params
 * @param {Function} _params.callback The function to run on right button press
 * @param {String} _params.image The image to show for the right button
 */
$.showRight = function(_params) {
	if(_params && typeof _params.callback !== "undefined") {
		$.right.visible = true;
		$.rightImage.image = _params.image;

		$.right.addEventListener("click", _params.callback);
	}
};

/**
 * Shows the back button
 * @param {Function} _callback The function to run on back button press
 */
$.showBack = function(_callback) {
	if(_callback && typeof _callback !== "undefined") {
		$.backImage.image = theme == "white" ? WPATH("/images/white/back.png") : WPATH("/images/black/back.png");
		$.backImage.setAccessibilityLabel("Back");
    $.back.visible = true;

		$.back.addEventListener("click", _callback);
	}
};

/**
 * Shows the next button
 * @param {Function} _callback The function to run on next button press
 */
$.showNext = function(_callback) {
	if(_callback && typeof _callback !== "undefined") {
		$.nextImage.image = theme == "white" ? WPATH("/images/white/next.png") : WPATH("/images/black/next.png");
		$.nextImage.setAccessibilityLabel("Next");
    $.next.visible = true;

		$.next.addEventListener("click", _callback);
	}
};

/**
 * Shows the menu button
 * @param {Function} _callback The function to run on action button press
 */
$.showMenu = function(_callback) {
	if(_callback && typeof _callback !== "undefined") {
		$.showLeft({
			image: theme == "white" ? WPATH("/images/white/menu.png") : WPATH("/images/black/menu.png"),
			callback: _callback
		});
    $.leftImage.setAccessibilityLabel("Toggle Menu");
	}
};

/**
 * Shows the settings button
 * @param {Function} _callback The function to run on action button press
 */
$.showSettings = function(_callback) {
	if(_callback && typeof _callback !== "undefined") {
		$.showRight({
			image: theme == "white" ? WPATH("/images/white/settings.png") : WPATH("/images/black/settings.png"),
			callback: _callback
		});

    $.rightImage.setAccessibilityLabel("Settings");
	}
};

/**
 * Shows the action button
 * @param {Function} _callback The function to run on action button press
 */
$.showAction = function(_callback) {
	if(_callback && typeof _callback !== "undefined") {
		$.showRight({
			image: theme == "white" ? WPATH("/images/white/action.png") : WPATH("/images/black/action.png"),
			callback: _callback
		});
    // not clear possibly add property for this?
    $.rightImage.setAccessibilityLabel("Action");
	}
};





/**
 * Converts a hex color value to HSB
 * @param {String} _hex The hex color to convert
 */
function hexToHsb(_hex) {
	var result;

	if(_hex.length < 6) {
		result = /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(_hex);
	} else {
		result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(_hex);
	}

	var hsb = {
		h: 0,
		s: 0,
		b: 0
	};

	if(!result) {
		return hsb;
	}

	if(result[1].length == 1) {
		result[1] = result[1] + result[1];
		result[2] = result[2] + result[2];
		result[3] = result[3] + result[3];
	}

	var rgb = {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	};

	rgb.r /= 255;
	rgb.g /= 255;
	rgb.b /= 255;

	var minVal = Math.min(rgb.r, rgb.g, rgb.b),
		maxVal = Math.max(rgb.r, rgb.g, rgb.b),
		delta = maxVal - minVal,
		del_r, del_g, del_b;

	hsb.b = maxVal;

	if(delta !== 0) {
		hsb.s = delta / maxVal;

		del_r = (((maxVal - rgb.r) / 6) + (delta / 2)) / delta;
		del_g = (((maxVal - rgb.g) / 6) + (delta / 2)) / delta;
		del_b = (((maxVal - rgb.b) / 6) + (delta / 2)) / delta;

		if(rgb.r === maxVal) {
			hsb.h = del_b - del_g;
		} else if(rgb.g === maxVal) {
			hsb.h = (1 / 3) + del_r - del_b;
		} else if(rgb.b === maxVal) {
			hsb.h = (2 / 3) + del_g - del_r;
		}

		if(hsb.h < 0) {
			hsb.h += 1;
		}

		if(hsb.h > 1) {
			hsb.h -= 1;
		}
	}

	hsb.h = Math.round(hsb.h * 360);
	hsb.s = Math.round(hsb.s * 100);
	hsb.b = Math.round(hsb.b * 100);

	return hsb;
}

if($.title) {
	$.Wrapper.add($.title);
}

// Move the UI down if iOS7+
if(OS_IOS && deviceVersion >= 7) {
	$.Wrapper.height = "67dp";
	$.overlay.top = "20dp";
}
