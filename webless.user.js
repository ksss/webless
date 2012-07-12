// ==UserScript==
// @name        webless
// @namespace   https://github.com/ksss/webless
// @description scroll like less
// @include     http://*
// @include     https://*
// @author      ksss
// @version     0.2
// ==/UserScript==
// lessっぽくブラウジングしたいscript

(function () {

var on = true;
var keyString = function (e) {
	var ret = '';
	var code = e.which || e.keyCode;
	var charCode = String.fromCharCode(code);

	if (e.ctrlKey) ret += 'C-';

	if (/\w/.test(charCode)) {
		ret += charCode[e.shiftKey ? 'toUpperCase' : 'toLowerCase']();
	} else {
		ret += {
			27: 'ESC',
			219: '['
		}[code]
	}
	return ret;
};

document.body.addEventListener('keydown', function (e) {
	var fn = {
		'ESC': function () {
			on = !on;
			return;
		},
		'C-[': function () {
			fn['ESC']();
		},
	};
	var fn2 = {
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
		'C-f': function () {
			document.body.scrollTop += window.innerHeight;
		},
		'C-b': function () {
			document.body.scrollTop -= window.innerHeight;
		}
	};
	var key = keyString(e);
	var handler = fn[key];

	if (handler) {
		handler();
	} else if (on) {
		handler = fn2[key];
		handler && handler();
	}
});

})();
