// ==UserScript==
// @name        webless
// @namespace   https://github.com/ksss/webless
// @description scroll like less
// @include     http://*
// @include     https://*
// @author      ksss
// @version     0.4
// ==/UserScript==
// lessっぽくブラウジングしたいscript

(function () {

function keyString (e) {
	var key_string = '';
	var code = e.which || e.keyCode;
	var string = String.fromCharCode(code);

	if (e.ctrlKey) key_string += 'C-';

	if (/\w/.test(string)) {
		key_string += string[e.shiftKey ? 'toUpperCase' : 'toLowerCase']();
	} else {
		key_string += {
			27: 'ESC',
			219: '[',
			221: ']',
			222: '"',
		}[code]
	}
	return key_string;
};

var on = true;
document.body.addEventListener('keydown', function (e) {
	var count = 0;
	var toggle = {
		'ESC': function () {
			on = !on;
		},
		'C-[': function () {
			toggle['ESC']();
		},
	};
	var config = {
		'j': function () {
			document.body.scrollTop += 30;
		},
		'k': function () {
			document.body.scrollTop -= 30;
		},
		'g': function () {
			document.body.scrollTop = 0;
		},
		'G': function () {
			document.body.scrollTop = document.body.scrollHeight;
		},
		'd': function () {
			document.body.scrollTop += window.innerHeight / 2;
		},
		'u': function () {
			document.body.scrollTop -= window.innerHeight / 2;
		},
		'f': function () {
			document.body.scrollTop += window.innerHeight;
		},
		'b': function () {
			document.body.scrollTop -= window.innerHeight;
		}
	};
	var key = keyString(e);
	var handler = toggle[key];

	if (handler) {
		handler();
	} else if (on) {
		handler = config[key];
		handler && handler();
	}
}, false);

})();
