// ==UserScript==
// @name        webless
// @namespace   https://github.com/ksss/webless
// @description scroll like less
// @include     http://*
// @include     https://*
// @author      ksss
// @version     0.5
// ==/UserScript==
// lessっぽくブラウジングしたいscript

(function () {

function keyString (e) {
	var key_string = '';
	var code = e.which || e.keyCode;
	var string = String.fromCharCode(code);

	if (e.ctrlKey) key_string += 'Ctrl-';

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
var toggle = {
	'ESC': function () {
		on = !on;
	},
	'Ctrl-[': function () {
		toggle['ESC']();
	},
};
var config = {
	'Ctrl-j': function () {
		document.body.scrollTop += 30;
	},
	'Ctrl-k': function () {
		document.body.scrollTop -= 30;
	},
	'Ctrl-g': function () {
		document.body.scrollTop = 0;
	},
	'Ctrl-G': function () {
		document.body.scrollTop = document.body.scrollHeight;
	},
	'Ctrl-d': function () {
		document.body.scrollTop += window.innerHeight / 2;
	},
	'Ctrl-u': function () {
		document.body.scrollTop -= window.innerHeight / 2;
	},
	'Ctrl-f': function () {
		document.body.scrollTop += window.innerHeight;
	},
	'Ctrl-b': function () {
		document.body.scrollTop -= window.innerHeight;
	}
};
document.body.addEventListener('keydown', function (e) {
	var count = 0;
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
