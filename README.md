Nav Bar Widget
-------------------
A custom NavBar widget for Titanium Alloy.

Example Usage
-------------

	<Require type="widget" src="edu.uwm.navnBar" id="NavBar" image="/images/logo.png" />


	$.NavBar.setBackgroundColor("#35ABFF");

	$.NavBar.showBack(
		function(_event) {
			closeWindow();
		}
	);

	$.NavBar.showRight({
		image: "/images/myRightButton.png",
		callback: function() {
			doSomething();
		}
	});

Options
-------
Parameter  | Type      | Default |
-----------|-----------|---------|
image      | `String`  | null    |
text       | `String`  | null    |
search     | `Boolean` | null    |
searchHint | `String`  | null    |

Methods
-------
Function           | Parameters   | Description
-------------------|--------------|------------
setBackgroundColor | `String`     | Background color
setTitle           | `String`     | Title bar text
blurTitle          | `Function`   | Click callback
showLeft           | `Object`     | `callback`: Click callback, `image`: Image to add
showRight          | `Object`     | `callback`: Click callback, `image`: Image to add
showBack           | `Function`   | Click callback
showNext           | `Function`   | Click callback
showLeftMenu       | `Function`   | Click callback
showSettings       | `Function`   | Click callback
showAction         | `Function`   | Click callback

Changelog
---------
* 0.2
	* Added search bar
* 0.1
	* Initial commit; forked from [ChariTi](https://github.com/mcongrove/com.mcongrove.NavigationBar)

License
-------

Copyright 2014 Board of Regents of University of Wisconsin System

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
=======
edu.uwm.navBar
==============

An Alloy Navbar with optional searchbar
