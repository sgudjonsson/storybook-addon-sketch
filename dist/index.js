(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _manager = __webpack_require__(8);

Object.defineProperty(exports, 'register', {
  enumerable: true,
  get: function get() {
    return _manager.register;
  }
});
// addons, panels and events get unique names using a prefix
var ADDON_ID = exports.ADDON_ID = 'sgudjonsson/sketch';
var PANEL_ID = exports.PANEL_ID = ADDON_ID + '/panel';
var EVENT_ID = exports.EVENT_ID = ADDON_ID + '/event';

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyFunction = __webpack_require__(3);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = register;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _addons = __webpack_require__(9);

var _addons2 = _interopRequireDefault(_addons);

var _ = __webpack_require__(6);

var _Sketch = __webpack_require__(10);

var _Sketch2 = _interopRequireDefault(_Sketch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Addon registration function
 * 
 * @export
 * @param {Object} Collection of components
 */
function register(scope) {
  _addons2.default.register(_.ADDON_ID, function (api) {
    var channel = _addons2.default.getChannel();
    var a = _addons2.default.addPanel(_.PANEL_ID, {
      title: 'Sketch',
      render: function render() {
        return _react2.default.createElement(_Sketch2.default, { scope: scope, api: api, channel: channel });
      }
    });
  });
}

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("@storybook/addons");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['width: 100%;'], ['width: 100%;']),
    _templateObject2 = _taggedTemplateLiteral(['\n  display: flex;\n  flex-direction: column;\n  flex-wrap: nowrap;\n  justify-content: flex-start;\n  align-content: stretch;\n  align-items: stretch;\n'], ['\n  display: flex;\n  flex-direction: column;\n  flex-wrap: nowrap;\n  justify-content: flex-start;\n  align-content: stretch;\n  align-items: stretch;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  order: 0;\n  flex: 0 1 auto;\n  align-self: auto;\n'], ['\n  order: 0;\n  flex: 0 1 auto;\n  align-self: auto;\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  font-family: \'Source Code Pro\', monospace;\n  font-size: ', ';\n  max-height: scroll;\n  ', ';\n'], ['\n  font-family: \'Source Code Pro\', monospace;\n  font-size: ', ';\n  max-height: scroll;\n  ', ';\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n  position: relative;\n  padding: 0.5rem;\n  background: white;\n  color: black;\n  height: auto;\n  overflow: hidden;\n  ', ';\n'], ['\n  position: relative;\n  padding: 0.5rem;\n  background: white;\n  color: black;\n  height: auto;\n  overflow: hidden;\n  ', ';\n']),
    _templateObject6 = _taggedTemplateLiteral(['\n  font-family: \'Source Code Pro\', monospace;\n  font-size: ', ';\n\n  display: block;\n  padding: ', ';\n  background: #ff5555;\n  color: #f8f8f2;\n'], ['\n  font-family: \'Source Code Pro\', monospace;\n  font-size: ', ';\n\n  display: block;\n  padding: ', ';\n  background: #ff5555;\n  color: #f8f8f2;\n']);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactLive = __webpack_require__(11);

var _styledComponents = __webpack_require__(16);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _polished = __webpack_require__(26);

var polished = _interopRequireWildcard(_polished);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var initialCode = '<div>\n  <strong>Hello World!</strong>\n</div>\n';

var StyledProvider = (0, _styledComponents2.default)(_reactLive.LiveProvider)(_templateObject);

var StyledWrapper = _styledComponents2.default.div(_templateObject2);

var row = (0, _styledComponents.css)(_templateObject3);

var StyledEditor = (0, _styledComponents2.default)(_reactLive.LiveEditor)(_templateObject4, polished.rem(14), row);

var StyledPreview = (0, _styledComponents2.default)(_reactLive.LivePreview)(_templateObject5, row);

var StyledError = (0, _styledComponents2.default)(_reactLive.LiveError)(_templateObject6, polished.rem(14), polished.rem(8));

var Sketch = function (_React$Component) {
  _inherits(Sketch, _React$Component);

  function Sketch(props) {
    _classCallCheck(this, Sketch);

    var _this = _possibleConstructorReturn(this, (Sketch.__proto__ || Object.getPrototypeOf(Sketch)).call(this, props));

    _this.state = {
      code: _this.props.code || initialCode
    };

    _this.handleOnChange = _this.handleOnChange.bind(_this);
    return _this;
  }

  _createClass(Sketch, [{
    key: 'handleOnChange',
    value: function handleOnChange(code) {
      // do something clever with the new code
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        StyledProvider,
        { scope: this.props.scope, code: this.state.code },
        _react2.default.createElement(
          StyledWrapper,
          null,
          _react2.default.createElement(StyledEditor, { onChange: this.handleOnChange }),
          _react2.default.createElement(StyledError, null),
          _react2.default.createElement(StyledPreview, null)
        )
      );
    }
  }]);

  return Sketch;
}(_react2.default.Component);

exports.default = Sketch;

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global, Buffer) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Editor", function() { return Editor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LiveProvider", function() { return LiveProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LiveEditor", function() { return LiveEditor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LiveError", function() { return LiveError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LivePreview", function() { return LivePreview; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withLive", function() { return withLive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateElement", function() { return generateElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderElementAsync", function() { return renderElementAsync; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


var cn = function cn() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.filter(Boolean).join(' ');
};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var prismCore = createCommonjsModule(function (module) {
	var _self = typeof window !== 'undefined' ? window // if in browser
	: typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self // if in worker
	: {};

	/**
  * Prism: Lightweight, robust, elegant syntax highlighting
  * MIT license http://www.opensource.org/licenses/mit-license.php/
  * @author Lea Verou http://lea.verou.me
  */

	var Prism = function () {

		// Private helper vars
		var lang = /\blang(?:uage)?-(\w+)\b/i;
		var uniqueId = 0;

		var _ = _self.Prism = {
			util: {
				encode: function encode(tokens) {
					if (tokens instanceof Token) {
						return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
					} else if (_.util.type(tokens) === 'Array') {
						return tokens.map(_.util.encode);
					} else {
						return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
					}
				},

				type: function type(o) {
					return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
				},

				objId: function objId(obj) {
					if (!obj['__id']) {
						Object.defineProperty(obj, '__id', { value: ++uniqueId });
					}
					return obj['__id'];
				},

				// Deep clone a language definition (e.g. to extend it)
				clone: function clone(o) {
					var type = _.util.type(o);

					switch (type) {
						case 'Object':
							var clone = {};

							for (var key in o) {
								if (o.hasOwnProperty(key)) {
									clone[key] = _.util.clone(o[key]);
								}
							}

							return clone;

						case 'Array':
							// Check for existence for IE8
							return o.map && o.map(function (v) {
								return _.util.clone(v);
							});
					}

					return o;
				}
			},

			languages: {
				extend: function extend(id, redef) {
					var lang = _.util.clone(_.languages[id]);

					for (var key in redef) {
						lang[key] = redef[key];
					}

					return lang;
				},

				/**
     * Insert a token before another token in a language literal
     * As this needs to recreate the object (we cannot actually insert before keys in object literals),
     * we cannot just provide an object, we need anobject and a key.
     * @param inside The key (or language id) of the parent
     * @param before The key to insert before. If not provided, the function appends instead.
     * @param insert Object with the key/value pairs to insert
     * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
     */
				insertBefore: function insertBefore(inside, before, insert, root) {
					root = root || _.languages;
					var grammar = root[inside];

					if (arguments.length == 2) {
						insert = arguments[1];

						for (var newToken in insert) {
							if (insert.hasOwnProperty(newToken)) {
								grammar[newToken] = insert[newToken];
							}
						}

						return grammar;
					}

					var ret = {};

					for (var token in grammar) {

						if (grammar.hasOwnProperty(token)) {

							if (token == before) {

								for (var newToken in insert) {

									if (insert.hasOwnProperty(newToken)) {
										ret[newToken] = insert[newToken];
									}
								}
							}

							ret[token] = grammar[token];
						}
					}

					// Update references in other language definitions
					_.languages.DFS(_.languages, function (key, value) {
						if (value === root[inside] && key != inside) {
							this[key] = ret;
						}
					});

					return root[inside] = ret;
				},

				// Traverse a language definition with Depth First Search
				DFS: function DFS(o, callback, type, visited) {
					visited = visited || {};
					for (var i in o) {
						if (o.hasOwnProperty(i)) {
							callback.call(o, i, o[i], type || i);

							if (_.util.type(o[i]) === 'Object' && !visited[_.util.objId(o[i])]) {
								visited[_.util.objId(o[i])] = true;
								_.languages.DFS(o[i], callback, null, visited);
							} else if (_.util.type(o[i]) === 'Array' && !visited[_.util.objId(o[i])]) {
								visited[_.util.objId(o[i])] = true;
								_.languages.DFS(o[i], callback, i, visited);
							}
						}
					}
				}
			},
			plugins: {},

			highlightAll: function highlightAll(async, callback) {
				var env = {
					callback: callback,
					selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
				};

				_.hooks.run("before-highlightall", env);

				var elements = env.elements || document.querySelectorAll(env.selector);

				for (var i = 0, element; element = elements[i++];) {
					_.highlightElement(element, async === true, env.callback);
				}
			},

			highlightElement: function highlightElement(element, async, callback) {
				// Find language
				var language,
				    grammar,
				    parent = element;

				while (parent && !lang.test(parent.className)) {
					parent = parent.parentNode;
				}

				if (parent) {
					language = (parent.className.match(lang) || [, ''])[1].toLowerCase();
					grammar = _.languages[language];
				}

				// Set language on the element, if not present
				element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;

				// Set language on the parent, for styling
				parent = element.parentNode;

				if (/pre/i.test(parent.nodeName)) {
					parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
				}

				var code = element.textContent;

				var env = {
					element: element,
					language: language,
					grammar: grammar,
					code: code
				};

				_.hooks.run('before-sanity-check', env);

				if (!env.code || !env.grammar) {
					if (env.code) {
						env.element.textContent = env.code;
					}
					_.hooks.run('complete', env);
					return;
				}

				_.hooks.run('before-highlight', env);

				if (async && _self.Worker) {
					var worker = new Worker(_.filename);

					worker.onmessage = function (evt) {
						env.highlightedCode = evt.data;

						_.hooks.run('before-insert', env);

						env.element.innerHTML = env.highlightedCode;

						callback && callback.call(env.element);
						_.hooks.run('after-highlight', env);
						_.hooks.run('complete', env);
					};

					worker.postMessage(JSON.stringify({
						language: env.language,
						code: env.code,
						immediateClose: true
					}));
				} else {
					env.highlightedCode = _.highlight(env.code, env.grammar, env.language);

					_.hooks.run('before-insert', env);

					env.element.innerHTML = env.highlightedCode;

					callback && callback.call(element);

					_.hooks.run('after-highlight', env);
					_.hooks.run('complete', env);
				}
			},

			highlight: function highlight(text, grammar, language) {
				var tokens = _.tokenize(text, grammar);
				return Token.stringify(_.util.encode(tokens), language);
			},

			tokenize: function tokenize(text, grammar, language) {
				var Token = _.Token;

				var strarr = [text];

				var rest = grammar.rest;

				if (rest) {
					for (var token in rest) {
						grammar[token] = rest[token];
					}

					delete grammar.rest;
				}

				tokenloop: for (var token in grammar) {
					if (!grammar.hasOwnProperty(token) || !grammar[token]) {
						continue;
					}

					var patterns = grammar[token];
					patterns = _.util.type(patterns) === "Array" ? patterns : [patterns];

					for (var j = 0; j < patterns.length; ++j) {
						var pattern = patterns[j],
						    inside = pattern.inside,
						    lookbehind = !!pattern.lookbehind,
						    greedy = !!pattern.greedy,
						    lookbehindLength = 0,
						    alias = pattern.alias;

						if (greedy && !pattern.pattern.global) {
							// Without the global flag, lastIndex won't work
							var flags = pattern.pattern.toString().match(/[imuy]*$/)[0];
							pattern.pattern = RegExp(pattern.pattern.source, flags + "g");
						}

						pattern = pattern.pattern || pattern;

						// Don’t cache length as it changes during the loop
						for (var i = 0, pos = 0; i < strarr.length; pos += strarr[i].length, ++i) {

							var str = strarr[i];

							if (strarr.length > text.length) {
								// Something went terribly wrong, ABORT, ABORT!
								break tokenloop;
							}

							if (str instanceof Token) {
								continue;
							}

							pattern.lastIndex = 0;

							var match = pattern.exec(str),
							    delNum = 1;

							// Greedy patterns can override/remove up to two previously matched tokens
							if (!match && greedy && i != strarr.length - 1) {
								pattern.lastIndex = pos;
								match = pattern.exec(text);
								if (!match) {
									break;
								}

								var from = match.index + (lookbehind ? match[1].length : 0),
								    to = match.index + match[0].length,
								    k = i,
								    p = pos;

								for (var len = strarr.length; k < len && p < to; ++k) {
									p += strarr[k].length;
									// Move the index i to the element in strarr that is closest to from
									if (from >= p) {
										++i;
										pos = p;
									}
								}

								/*
         * If strarr[i] is a Token, then the match starts inside another Token, which is invalid
         * If strarr[k - 1] is greedy we are in conflict with another greedy pattern
         */
								if (strarr[i] instanceof Token || strarr[k - 1].greedy) {
									continue;
								}

								// Number of tokens to delete and replace with the new match
								delNum = k - i;
								str = text.slice(pos, p);
								match.index -= pos;
							}

							if (!match) {
								continue;
							}

							if (lookbehind) {
								lookbehindLength = match[1].length;
							}

							var from = match.index + lookbehindLength,
							    match = match[0].slice(lookbehindLength),
							    to = from + match.length,
							    before = str.slice(0, from),
							    after = str.slice(to);

							var args = [i, delNum];

							if (before) {
								args.push(before);
							}

							var wrapped = new Token(token, inside ? _.tokenize(match, inside) : match, alias, match, greedy);

							args.push(wrapped);

							if (after) {
								args.push(after);
							}

							Array.prototype.splice.apply(strarr, args);
						}
					}
				}

				return strarr;
			},

			hooks: {
				all: {},

				add: function add(name, callback) {
					var hooks = _.hooks.all;

					hooks[name] = hooks[name] || [];

					hooks[name].push(callback);
				},

				run: function run(name, env) {
					var callbacks = _.hooks.all[name];

					if (!callbacks || !callbacks.length) {
						return;
					}

					for (var i = 0, callback; callback = callbacks[i++];) {
						callback(env);
					}
				}
			}
		};

		var Token = _.Token = function (type, content, alias, matchedStr, greedy) {
			this.type = type;
			this.content = content;
			this.alias = alias;
			// Copy of the full string this token was created from
			this.length = (matchedStr || "").length | 0;
			this.greedy = !!greedy;
		};

		Token.stringify = function (o, language, parent) {
			if (typeof o == 'string') {
				return o;
			}

			if (_.util.type(o) === 'Array') {
				return o.map(function (element) {
					return Token.stringify(element, language, o);
				}).join('');
			}

			var env = {
				type: o.type,
				content: Token.stringify(o.content, language, parent),
				tag: 'span',
				classes: ['token', o.type],
				attributes: {},
				language: language,
				parent: parent
			};

			if (env.type == 'comment') {
				env.attributes['spellcheck'] = 'true';
			}

			if (o.alias) {
				var aliases = _.util.type(o.alias) === 'Array' ? o.alias : [o.alias];
				Array.prototype.push.apply(env.classes, aliases);
			}

			_.hooks.run('wrap', env);

			var attributes = Object.keys(env.attributes).map(function (name) {
				return name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
			}).join(' ');

			return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + (attributes ? ' ' + attributes : '') + '>' + env.content + '</' + env.tag + '>';
		};

		if (!_self.document) {
			if (!_self.addEventListener) {
				// in Node.js
				return _self.Prism;
			}
			// In worker
			_self.addEventListener('message', function (evt) {
				var message = JSON.parse(evt.data),
				    lang = message.language,
				    code = message.code,
				    immediateClose = message.immediateClose;

				_self.postMessage(_.highlight(code, _.languages[lang], lang));
				if (immediateClose) {
					_self.close();
				}
			}, false);

			return _self.Prism;
		}

		//Get current script and highlight
		var script = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();

		if (script) {
			_.filename = script.src;

			if (document.addEventListener && !script.hasAttribute('data-manual')) {
				if (document.readyState !== "loading") {
					if (window.requestAnimationFrame) {
						window.requestAnimationFrame(_.highlightAll);
					} else {
						window.setTimeout(_.highlightAll, 16);
					}
				} else {
					document.addEventListener('DOMContentLoaded', _.highlightAll);
				}
			}
		}

		return _self.Prism;
	}();

	if ('object' !== 'undefined' && module.exports) {
		module.exports = Prism;
	}

	// hack for components to work correctly in node.js
	if (typeof commonjsGlobal !== 'undefined') {
		commonjsGlobal.Prism = Prism;
	}
});

var prismCore_1 = prismCore.highlight;
var prismCore_2 = prismCore.languages;

Prism.languages.clike = {
	'comment': [{
		pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
		lookbehind: true
	}, {
		pattern: /(^|[^\\:])\/\/.*/,
		lookbehind: true
	}],
	'string': {
		pattern: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'class-name': {
		pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
		lookbehind: true,
		inside: {
			punctuation: /(\.|\\)/
		}
	},
	'keyword': /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
	'boolean': /\b(true|false)\b/,
	'function': /[a-z0-9_]+(?=\()/i,
	'number': /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
	'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
	'punctuation': /[{}[\];(),.:]/
};

Prism.languages.javascript = Prism.languages.extend('clike', {
	'keyword': /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
	'number': /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
	// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
	'function': /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i,
	'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*\*?|\/|~|\^|%|\.{3}/
});

Prism.languages.insertBefore('javascript', 'keyword', {
	'regex': {
		pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
		lookbehind: true,
		greedy: true
	}
});

Prism.languages.insertBefore('javascript', 'string', {
	'template-string': {
		pattern: /`(?:\\\\|\\?[^\\])*?`/,
		greedy: true,
		inside: {
			'interpolation': {
				pattern: /\$\{[^}]+\}/,
				inside: {
					'interpolation-punctuation': {
						pattern: /^\$\{|\}$/,
						alias: 'punctuation'
					},
					rest: Prism.languages.javascript
				}
			},
			'string': /[\s\S]+/
		}
	}
});

if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'script': {
			pattern: /(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,
			lookbehind: true,
			inside: Prism.languages.javascript,
			alias: 'language-javascript'
		}
	});
}

Prism.languages.js = Prism.languages.javascript;

Prism.languages.markup = {
	'comment': /<!--[\w\W]*?-->/,
	'prolog': /<\?[\w\W]+?\?>/,
	'doctype': /<!DOCTYPE[\w\W]+?>/i,
	'cdata': /<!\[CDATA\[[\w\W]*?]]>/i,
	'tag': {
		pattern: /<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,
		inside: {
			'tag': {
				pattern: /^<\/?[^\s>\/]+/i,
				inside: {
					'punctuation': /^<\/?/,
					'namespace': /^[^\s>\/:]+:/
				}
			},
			'attr-value': {
				pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,
				inside: {
					'punctuation': /[=>"']/
				}
			},
			'punctuation': /\/?>/,
			'attr-name': {
				pattern: /[^\s>\/]+/,
				inside: {
					'namespace': /^[^\s>\/:]+:/
				}
			}

		}
	},
	'entity': /&#?[\da-z]{1,8};/i
};

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function (env) {

	if (env.type === 'entity') {
		env.attributes['title'] = env.content.replace(/&amp;/, '&');
	}
});

Prism.languages.xml = Prism.languages.markup;
Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;

(function (Prism) {

	var javascript = Prism.util.clone(Prism.languages.javascript);

	Prism.languages.jsx = Prism.languages.extend('markup', javascript);
	Prism.languages.jsx.tag.pattern = /<\/?[\w\.:-]+\s*(?:\s+[\w\.:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+|(\{[\w\W]*?\})))?\s*)*\/?>/i;

	Prism.languages.jsx.tag.inside['attr-value'].pattern = /=[^\{](?:('|")[\w\W]*?(\1)|[^\s>]+)/i;

	var jsxExpression = Prism.util.clone(Prism.languages.jsx);

	delete jsxExpression.punctuation;

	jsxExpression = Prism.languages.insertBefore('jsx', 'operator', {
		'punctuation': /=(?={)|[{}[\];(),.:]/
	}, { jsx: jsxExpression });

	Prism.languages.insertBefore('inside', 'attr-value', {
		'script': {
			// Allow for one level of nesting
			pattern: /=(\{(?:\{[^}]*\}|[^}])+\})/i,
			inside: jsxExpression,
			'alias': 'language-javascript'
		}
	}, Prism.languages.jsx.tag);
})(Prism);

var prism = function prism(code) {
  return prismCore_1(code, prismCore_2.jsx);
};

var indentRegex = /^\s+/;

var getIndent = function getIndent(plain, cursorPos) {
  var startSlice = plain.slice(0, cursorPos);
  var lastNewline = startSlice.lastIndexOf('\n') + 1;
  var lineSlice = startSlice.slice(lastNewline);
  var matches = lineSlice.match(indentRegex);
  if (matches === null) {
    return '';
  }

  return matches[0] || '';
};

var normalizeCode = function normalizeCode(code) {
  return code.replace(/^((  )+)/mg, function (_, p1) {
    return '\t'.repeat(p1.length / 2);
  });
};

var normalizeHtml = function normalizeHtml(html) {
  return html.replace('\n', '<br>');
};

var index = createCommonjsModule(function (module) {
  'use strict';

  var cache;

  /**
   * Convert HTML entities to HTML characters.
   *
   * @param  {String} `str` String with HTML entities to un-escape.
   * @return {String}
   */

  var unescape = module.exports = function (str) {
    if (str == null) return '';

    var re = cache || (cache = new RegExp('(' + Object.keys(chars).join('|') + ')', 'g'));
    return String(str).replace(re, function (match) {
      return chars[match];
    });
  };

  var chars = unescape.chars = {
    '&apos;': '\'',
    '&#39;': '\'',
    '&amp;': '&',
    '&gt;': '>',
    '&lt;': '<',
    '&quot;': '"'
  };
});

var htmlToPlain = function htmlToPlain(html) {
  return index(html.replace(/<br>/gm, '\n').replace(/<\/?[^>]*>/gm, ''));
};

/**
 * Expose `xor`
 */

var index$2 = xor$1;

/**
 * XOR utility
 *
 * T T F
 * T F T
 * F T T
 * F F F
 *
 * @param {Boolean} a
 * @param {Boolean} b
 * @return {Boolean}
 */

function xor$1(a, b) {
  return !a != !b;
}

/**
 * Global Names
 */

var globals = /\b(Array|Date|Object|Math|JSON)\b/g;

/**
 * Return immediate identifiers parsed from `str`.
 *
 * @param {String} str
 * @param {String|Function} map function or prefix
 * @return {Array}
 * @api public
 */

var index$4 = function index(str, fn) {
  var p = unique(props$1(str));
  if (fn && 'string' == typeof fn) fn = prefixed(fn);
  if (fn) return map(str, p, fn);
  return p;
};

/**
 * Return immediate identifiers in `str`.
 *
 * @param {String} str
 * @return {Array}
 * @api private
 */

function props$1(str) {
  return str.replace(/\.\w+|\w+ *\(|"[^"]*"|'[^']*'|\/([^/]+)\//g, '').replace(globals, '').match(/[a-zA-Z_]\w*/g) || [];
}

/**
 * Return `str` with `props` mapped with `fn`.
 *
 * @param {String} str
 * @param {Array} props
 * @param {Function} fn
 * @return {String}
 * @api private
 */

function map(str, props, fn) {
  var re = /\.\w+|\w+ *\(|"[^"]*"|'[^']*'|\/([^/]+)\/|[a-zA-Z_]\w*/g;
  return str.replace(re, function (_) {
    if ('(' == _[_.length - 1]) return fn(_);
    if (!~props.indexOf(_)) return _;
    return fn(_);
  });
}

/**
 * Return unique array.
 *
 * @param {Array} arr
 * @return {Array}
 * @api private
 */

function unique(arr) {
  var ret = [];

  for (var i = 0; i < arr.length; i++) {
    if (~ret.indexOf(arr[i])) continue;
    ret.push(arr[i]);
  }

  return ret;
}

/**
 * Map with prefix `str`.
 */

function prefixed(str) {
  return function (_) {
    return str + _;
  };
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};









var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/**
 * Module Dependencies
 */

var xor;
var props;

try {
  xor = index$2;
} catch (e) {
  xor = index$2;
}

try {
  props = index$4;
} catch (e) {
  props = index$4;
}

/**
 * Export `Iterator`
 */

var index$1 = Iterator;

/**
 * Initialize `Iterator`
 *
 * @param {Node} node
 * @param {Node} root
 * @return {Iterator} self
 * @api public
 */

function Iterator(node, root) {
  if (!(this instanceof Iterator)) return new Iterator(node, root);
  this.node = this.start = this.peeked = node;
  this.root = root;
  this.closingTag = false;
  this._revisit = true;
  this._selects = [];
  this._rejects = [];

  if (node && this.higher(node)) {
    throw new Error('root must be a parent or ancestor to node');
  }
}

/**
 * Reset the Iterator
 *
 * @param {Node} node (optional)
 * @return {Iterator} self
 * @api public
 */

Iterator.prototype.reset = function (node) {
  this.node = node || this.start;
  return this;
};

/**
 * Revisit element nodes. Defaults to `true`
 */

Iterator.prototype.revisit = function (revisit) {
  this._revisit = undefined == revisit ? true : revisit;
  return this;
};

/**
 * Jump to the opening tag
 */

Iterator.prototype.opening = function () {
  if (1 == this.node.nodeType) this.closingTag = false;
  return this;
};

/**
 * Jump to the closing tag
 */

Iterator.prototype.atOpening = function () {
  return !this.closingTag;
};

/**
 * Jump to the closing tag
 */

Iterator.prototype.closing = function () {
  if (1 == this.node.nodeType) this.closingTag = true;
  return this;
};

/**
 * Jump to the closing tag
 */

Iterator.prototype.atClosing = function () {
  return this.closingTag;
};

/**
 * Next node
 *
 * @param {Number} type
 * @return {Node|null}
 * @api public
 */

Iterator.prototype.next = traverse('nextSibling', 'firstChild');

/**
 * Previous node
 *
 * @param {Number} type
 * @return {Node|null}
 * @api public
 */

Iterator.prototype.previous = Iterator.prototype.prev = traverse('previousSibling', 'lastChild');

/**
 * Make traverse function
 *
 * @param {String} dir
 * @param {String} child
 * @return {Function}
 * @api private
 */

function traverse(dir, child) {
  var next = dir == 'nextSibling';
  return function walk(expr, n, peek) {
    expr = this.compile(expr);
    n = n && n > 0 ? n : 1;
    var node = this.node;
    var closing = this.closingTag;
    var revisit = this._revisit;

    while (node) {
      if (xor(next, closing) && node[child]) {
        // element with children: <em>...</em>
        node = node[child];
        closing = !next;
      } else if (1 == node.nodeType && !node[child] && xor(next, closing)) {
        // empty element tag: <em></em>
        closing = next;
        if (!revisit) continue;
      } else if (node[dir]) {
        // element has a neighbor: ...<em></em>...
        node = node[dir];
        closing = !next;
      } else {
        // done with current layer, move up.
        node = node.parentNode;
        closing = next;
        if (!revisit) continue;
      }

      if (!node || this.higher(node, this.root)) break;

      if (expr(node) && this.selects(node, peek) && this.rejects(node, peek)) {
        if (--n) continue;
        if (!peek) this.node = node;
        this.closingTag = closing;
        return node;
      }
    }

    return null;
  };
}

/**
 * Select nodes that cause `expr(node)`
 * to be truthy
 *
 * @param {Number|String|Function} expr
 * @return {Iterator} self
 * @api public
 */

Iterator.prototype.select = function (expr) {
  expr = this.compile(expr);
  this._selects.push(expr);
  return this;
};

/**
 * Run through the selects ORing each
 *
 * @param {Node} node
 * @param {Boolean} peek
 * @return {Boolean}
 * @api private
 */

Iterator.prototype.selects = function (node, peek) {
  var exprs = this._selects;
  var len = exprs.length;
  if (!len) return true;

  for (var i = 0; i < len; i++) {
    if (exprs[i].call(this, node, peek)) return true;
  }

  return false;
};

/**
 * Select nodes that cause `expr(node)`
 * to be falsy
 *
 * @param {Number|String|Function} expr
 * @return {Iterator} self
 * @api public
 */

Iterator.prototype.reject = function (expr) {
  expr = this.compile(expr);
  this._rejects.push(expr);
  return this;
};

/**
 * Run through the reject expressions ANDing each
 *
 * @param {Node} node
 * @param {Boolean} peek
 * @return {Boolean}
 * @api private
 */

Iterator.prototype.rejects = function (node, peek) {
  var exprs = this._rejects;
  var len = exprs.length;
  if (!len) return true;

  for (var i = 0; i < len; i++) {
    if (exprs[i].call(this, node, peek)) return false;
  }

  return true;
};

/**
 * Check if node is higher
 * than root.
 *
 * @param {Node} node
 * @param {Node} root
 * @return {Boolean}
 * @api private
 */

Iterator.prototype.higher = function (node) {
  var root = this.root;
  if (!root) return false;
  node = node.parentNode;
  while (node && node != root) {
    node = node.parentNode;
  }return node != root;
};

/**
 * Compile an expression
 *
 * @param {String|Function|Number} expr
 * @return {Function}
 */

Iterator.prototype.compile = function (expr) {
  switch (typeof expr === 'undefined' ? 'undefined' : _typeof(expr)) {
    case 'number':
      return function (node) {
        return expr == node.nodeType;
      };
    case 'string':
      return new Function('node', 'return ' + props(expr, 'node.'));
    case 'function':
      return expr;
    default:
      return function () {
        return true;
      };
  }
};

/**
 * Peek in either direction
 * `n` nodes. Peek backwards
 * using negative numbers.
 *
 * @param {Number} n (optional)
 * @return {Node|null}
 * @api public
 */

Iterator.prototype.peak = Iterator.prototype.peek = function (expr, n) {
  if (arguments.length == 1) n = expr, expr = true;
  n = undefined == n ? 1 : n;
  if (!n) return this.node;else if (n > 0) return this.next(expr, n, true);else return this.prev(expr, Math.abs(n), true);
};

/**
 * Add a plugin
 *
 * @param {Function} fn
 * @return {Iterator}
 * @api public
 */

Iterator.prototype.use = function (fn) {
  fn(this);
  return this;
};

function position(el, pos) {
  var selection = window.getSelection();

  if (1 == arguments.length) {
    if (!selection.rangeCount) return;
    var indexes = {};
    var range = selection.getRangeAt(0);
    var clone = range.cloneRange();
    clone.selectNodeContents(el);
    clone.setEnd(range.endContainer, range.endOffset);
    indexes.end = clone.toString().length;
    clone.setStart(range.startContainer, range.startOffset);
    indexes.start = indexes.end - clone.toString().length;
    indexes.atStart = clone.startOffset === 0;
    indexes.commonAncestorContainer = clone.commonAncestorContainer;
    indexes.endContainer = clone.endContainer;
    indexes.startContainer = clone.startContainer;
    return indexes;
  }

  var setSelection = pos.end && pos.end !== pos.start;
  var length = 0;
  var range = document.createRange();
  var it = index$1(el).select(Node.TEXT_NODE).revisit(false);
  var next;
  var startindex;
  var start = pos.start > el.textContent.length ? el.textContent.length : pos.start;
  var end = pos.end > el.textContent.length ? el.textContent.length : pos.end;
  var atStart = pos.atStart;

  while (next = it.next()) {
    var olen = length;
    length += next.textContent.length;

    // Set start point of selection
    var atLength = atStart ? length > start : length >= start;
    if (!startindex && atLength) {
      startindex = true;
      range.setStart(next, start - olen);
      if (!setSelection) {
        range.collapse(true);
        makeSelection(el, range);
        break;
      }
    }

    // Set end point of selection
    if (setSelection && length >= end) {
      range.setEnd(next, end - olen);
      makeSelection(el, range);
      break;
    }
  }
}

function makeSelection(el, range) {
  var selection = window.getSelection();
  el.focus();
  selection.removeAllRanges();
  selection.addRange(range);
}

var Editor = function (_Component) {
  inherits(Editor, _Component);

  function Editor() {
    var _temp, _this, _ret;

    classCallCheck(this, Editor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.undoStack = [], _this.undoOffset = 0, _this.undoTimestamp = 0, _this.state = {
      html: ''
    }, _this.onRef = function (node) {
      _this.ref = node;
    }, _this.getPlain = function () {
      if (_this._innerHTML === _this.ref.innerHTML) {
        return _this._plain;
      }

      var plain = htmlToPlain(normalizeHtml(_this.ref.innerHTML));

      _this._plain = plain;
      _this._innerHTML = _this.ref.innerHTML;

      return _this._plain;
    }, _this.recordChange = function (plain, selection) {
      if (plain === _this.undoStack[_this.undoStack.length - 1]) {
        return;
      }

      if (_this.undoOffset > 0) {
        _this.undoStack = _this.undoStack.slice(0, -_this.undoOffset);
        _this.undoOffset = 0;
      }

      var timestamp = Date.now();
      var record = { plain: plain, selection: selection };

      // Overwrite last record if threshold is not crossed
      if (timestamp - _this.undoTimestamp < 3000) {
        _this.undoStack[_this.undoStack.length - 1] = record;
      } else {
        _this.undoStack.push(record);

        if (_this.undoStack.length > 50) {
          _this.undoStack.shift();
        }
      }

      _this.undoTimestamp = timestamp;
    }, _this.updateContent = function (plain) {
      _this.setState({ html: prism(plain) });

      if (_this.props.onChange) {
        _this.props.onChange(plain);
      }
    }, _this.restoreStackState = function (offset) {
      var _this$undoStack = _this.undoStack[_this.undoStack.length - 1 - offset],
          plain = _this$undoStack.plain,
          selection = _this$undoStack.selection;


      _this.selection = selection;
      _this.undoOffset = offset;
      _this.updateContent(plain);
    }, _this.undo = function () {
      var offset = _this.undoOffset + 1;
      if (offset >= _this.undoStack.length) {
        return;
      }

      _this.restoreStackState(offset);
    }, _this.redo = function () {
      var offset = _this.undoOffset - 1;
      if (offset < 0) {
        return;
      }

      _this.restoreStackState(offset);
    }, _this.onKeyDown = function (evt) {
      if (_this.props.onKeyDown) {
        _this.props.onKeyDown(evt);
      }
      if (evt.keyCode === 9 && !_this.props.ignoreTabKey) {
        // Tab Key
        document.execCommand('insertHTML', false, '&#009');
        evt.preventDefault();
      } else if (evt.keyCode === 13) {
        // Enter Key
        var _selectionRange = position(_this.ref),
            cursorPos = _selectionRange.start;

        var indentation = getIndent(_this.getPlain(), cursorPos);

        document.execCommand('insertHTML', false, '\n' + indentation);
        evt.preventDefault();
      } else if (
      // Undo / Redo
      evt.keyCode === 90 && evt.metaKey !== evt.ctrlKey && !evt.altKey) {
        if (evt.shiftKey) {
          _this.redo();
        } else {
          _this.undo();
        }

        evt.preventDefault();
      }
    }, _this.onKeyUp = function (evt) {
      if (_this.props.onKeyUp) {
        _this.props.onKeyUp(evt);
      }
      if (evt.keyCode === 91 || // left cmd
      evt.keyCode === 93 || // right cmd
      evt.ctrlKey || evt.metaKey) {
        return;
      }

      // Enter key
      if (evt.keyCode === 13) {
        _this.undoTimestamp = 0;
      }

      _this.selection = position(_this.ref);

      if (evt.keyCode !== 37 && // left
      evt.keyCode !== 38 && // up
      evt.keyCode !== 39 && // right
      evt.keyCode !== 40 // down
      ) {
          var plain = _this.getPlain();

          _this.recordChange(plain, _this.selection);
          _this.updateContent(plain);
        } else {
        _this.undoTimestamp = 0;
      }
    }, _this.onClick = function (evt) {
      if (_this.props.onClick) {
        _this.props.onClick(evt);
      }
      _this.undoTimestamp = 0; // Reset timestamp
      _this.selection = position(_this.ref);
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  Editor.prototype.componentWillMount = function componentWillMount() {
    var html = prism(normalizeCode(this.props.code));
    this.setState({ html: html });
  };

  Editor.prototype.componentDidMount = function componentDidMount() {
    this.recordChange(this.getPlain());
    this.undoTimestamp = 0; // Reset timestamp
  };

  Editor.prototype.componentWillReceiveProps = function componentWillReceiveProps(_ref) {
    var code = _ref.code;

    if (code !== this.props.code) {
      var html = prism(normalizeCode(code));
      this.setState({ html: html });
    }
  };

  Editor.prototype.componentDidUpdate = function componentDidUpdate() {
    var selection = this.selection;

    if (selection) {
      position(this.ref, selection);
    }
  };

  Editor.prototype.render = function render() {
    var _props = this.props,
        contentEditable = _props.contentEditable,
        className = _props.className,
        style = _props.style,
        rest = objectWithoutProperties(_props, ['contentEditable', 'className', 'style']);
    var html = this.state.html;

    delete rest.code;

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('pre', _extends({}, rest, {
      ref: this.onRef,
      className: cn('prism-code', className),
      style: style,
      spellCheck: 'false',
      contentEditable: contentEditable,
      onKeyDown: contentEditable && this.onKeyDown,
      onKeyUp: contentEditable && this.onKeyUp,
      onClick: contentEditable && this.onClick,
      dangerouslySetInnerHTML: { __html: html }
    }));
  };

  return Editor;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

Editor.defaultProps = {
  contentEditable: true
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

var emptyFunction_1 = emptyFunction;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

{
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

var invariant_1 = invariant;

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction_1;

{
  (function () {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  })();
}

var warning_1 = warning;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret;

{
  var invariant$1 = invariant_1;
  var warning$1 = warning_1;
  var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant$1(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
        } catch (ex) {
          error = ex;
        }
        warning$1(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error === 'undefined' ? 'undefined' : _typeof(error));
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning$1(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

var checkPropTypes_1 = checkPropTypes;

var factoryWithTypeCheckers = function factoryWithTypeCheckers(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret_1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant_1(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
        } else if ("development" !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (!manualPropTypeCallCache[cacheKey] &&
          // Avoid spamming the console because they are often not actionable except for lib authors
          manualPropTypeWarningCount < 3) {
            warning_1(false, 'You are manually calling a React.PropTypes validation ' + 'function for the `%s` prop on `%s`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.', propFullName, componentName);
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction_1.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      warning_1(false, 'Invalid argument supplied to oneOf, expected an instance of array.');
      return emptyFunction_1.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      warning_1(false, 'Invalid argument supplied to oneOfType, expected an instance of array.');
      return emptyFunction_1.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue)) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes_1;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var index$6 = createCommonjsModule(function (module) {
  /**
   * Copyright 2013-present, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   */

  {
    var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;

    var isValidElement = function isValidElement(object) {
      return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    };

    // By explicitly using `prop-types` you are opting into new development behavior.
    // http://fb.me/prop-types-in-prod
    var throwOnDirectAccess = true;
    module.exports = factoryWithTypeCheckers(isValidElement, throwOnDirectAccess);
  }
});

var buble_deps = createCommonjsModule(function (module, exports) {
  (function (global, factory) {
    factory(exports);
  })(commonjsGlobal, function (exports) {
    'use strict';

    var __commonjs_global = typeof window !== 'undefined' ? window : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : this;
    function __commonjs(fn, module) {
      return module = { exports: {} }, fn(module, module.exports, __commonjs_global), module.exports;
    }

    var acorn = __commonjs(function (module, exports, global) {
      (function (global, factory) {
        (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports) :  false ? undefined(['exports'], factory) : factory(global.acorn = global.acorn || {});
      })(__commonjs_global, function (exports) {
        'use strict';

        // Reserved word lists for various dialects of the language

        var reservedWords = {
          3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
          5: "class enum extends super const export import",
          6: "enum",
          7: "enum",
          strict: "implements interface let package private protected public static yield",
          strictBind: "eval arguments"
        };

        // And the keywords

        var ecma5AndLessKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this";

        var keywords = {
          5: ecma5AndLessKeywords,
          6: ecma5AndLessKeywords + " const class extends export import super"
        };

        // ## Character categories

        // Big ugly regular expressions that match characters in the
        // whitespace, identifier, and identifier-start categories. These
        // are only applied when a character is found to actually have a
        // code point above 128.
        // Generated by `bin/generate-identifier-regex.js`.

        var nonASCIIidentifierStartChars = '\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC';
        var nonASCIIidentifierChars = '\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D4-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0D01-\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFB-\u1DFF\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA900-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F';

        var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
        var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

        nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;

        // These are a run-length and offset encoded representation of the
        // >0xffff code points that are a valid part of identifiers. The
        // offset starts at 0x10000, and each pair of numbers represents an
        // offset to the next range, and then a size of the range. They were
        // generated by bin/generate-identifier-regex.js
        var astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 17, 26, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 157, 310, 10, 21, 11, 7, 153, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 26, 45, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 785, 52, 76, 44, 33, 24, 27, 35, 42, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 54, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 86, 25, 391, 63, 32, 0, 449, 56, 264, 8, 2, 36, 18, 0, 50, 29, 881, 921, 103, 110, 18, 195, 2749, 1070, 4050, 582, 8634, 568, 8, 30, 114, 29, 19, 47, 17, 3, 32, 20, 6, 18, 881, 68, 12, 0, 67, 12, 65, 0, 32, 6124, 20, 754, 9486, 1, 3071, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 4149, 196, 60, 67, 1213, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42710, 42, 4148, 12, 221, 3, 5761, 10591, 541];
        var astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 1306, 2, 54, 14, 32, 9, 16, 3, 46, 10, 54, 9, 7, 2, 37, 13, 2, 9, 52, 0, 13, 2, 49, 13, 10, 2, 4, 9, 83, 11, 7, 0, 161, 11, 6, 9, 7, 3, 57, 0, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 87, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 423, 9, 838, 7, 2, 7, 17, 9, 57, 21, 2, 13, 19882, 9, 135, 4, 60, 6, 26, 9, 1016, 45, 17, 3, 19723, 1, 5319, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 2214, 6, 110, 6, 6, 9, 792487, 239];

        // This has a complexity linear to the value of the code. The
        // assumption is that looking up astral identifier characters is
        // rare.
        function isInAstralSet(code, set$$1) {
          var pos = 0x10000;
          for (var i = 0; i < set$$1.length; i += 2) {
            pos += set$$1[i];
            if (pos > code) return false;
            pos += set$$1[i + 1];
            if (pos >= code) return true;
          }
        }

        // Test whether a given character code starts an identifier.

        function isIdentifierStart(code, astral) {
          if (code < 65) return code === 36;
          if (code < 91) return true;
          if (code < 97) return code === 95;
          if (code < 123) return true;
          if (code <= 0xffff) return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
          if (astral === false) return false;
          return isInAstralSet(code, astralIdentifierStartCodes);
        }

        // Test whether a given character is part of an identifier.

        function isIdentifierChar(code, astral) {
          if (code < 48) return code === 36;
          if (code < 58) return true;
          if (code < 65) return false;
          if (code < 91) return true;
          if (code < 97) return code === 95;
          if (code < 123) return true;
          if (code <= 0xffff) return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
          if (astral === false) return false;
          return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes);
        }

        // ## Token types

        // The assignment of fine-grained, information-carrying type objects
        // allows the tokenizer to store the information it has about a
        // token in a way that is very cheap for the parser to look up.

        // All token type variables start with an underscore, to make them
        // easy to recognize.

        // The `beforeExpr` property is used to disambiguate between regular
        // expressions and divisions. It is set on all token types that can
        // be followed by an expression (thus, a slash after them would be a
        // regular expression).
        //
        // The `startsExpr` property is used to check if the token ends a
        // `yield` expression. It is set on all token types that either can
        // directly start an expression (like a quotation mark) or can
        // continue an expression (like the body of a string).
        //
        // `isLoop` marks a keyword as starting a loop, which is important
        // to know when parsing a label, in order to allow or disallow
        // continue jumps to that label.

        var TokenType = function TokenType(label, conf) {
          if (conf === void 0) conf = {};

          this.label = label;
          this.keyword = conf.keyword;
          this.beforeExpr = !!conf.beforeExpr;
          this.startsExpr = !!conf.startsExpr;
          this.isLoop = !!conf.isLoop;
          this.isAssign = !!conf.isAssign;
          this.prefix = !!conf.prefix;
          this.postfix = !!conf.postfix;
          this.binop = conf.binop || null;
          this.updateContext = null;
        };

        function binop(name, prec) {
          return new TokenType(name, { beforeExpr: true, binop: prec });
        }
        var beforeExpr = { beforeExpr: true };
        var startsExpr = { startsExpr: true };
        // Map keyword names to token types.

        var keywordTypes = {};

        // Succinct definitions of keyword token types
        function kw(name, options) {
          if (options === void 0) options = {};

          options.keyword = name;
          return keywordTypes[name] = new TokenType(name, options);
        }

        var tt = {
          num: new TokenType("num", startsExpr),
          regexp: new TokenType("regexp", startsExpr),
          string: new TokenType("string", startsExpr),
          name: new TokenType("name", startsExpr),
          eof: new TokenType("eof"),

          // Punctuation token types.
          bracketL: new TokenType("[", { beforeExpr: true, startsExpr: true }),
          bracketR: new TokenType("]"),
          braceL: new TokenType("{", { beforeExpr: true, startsExpr: true }),
          braceR: new TokenType("}"),
          parenL: new TokenType("(", { beforeExpr: true, startsExpr: true }),
          parenR: new TokenType(")"),
          comma: new TokenType(",", beforeExpr),
          semi: new TokenType(";", beforeExpr),
          colon: new TokenType(":", beforeExpr),
          dot: new TokenType("."),
          question: new TokenType("?", beforeExpr),
          arrow: new TokenType("=>", beforeExpr),
          template: new TokenType("template"),
          ellipsis: new TokenType("...", beforeExpr),
          backQuote: new TokenType("`", startsExpr),
          dollarBraceL: new TokenType("${", { beforeExpr: true, startsExpr: true }),

          // Operators. These carry several kinds of properties to help the
          // parser use them properly (the presence of these properties is
          // what categorizes them as operators).
          //
          // `binop`, when present, specifies that this operator is a binary
          // operator, and will refer to its precedence.
          //
          // `prefix` and `postfix` mark the operator as a prefix or postfix
          // unary operator.
          //
          // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
          // binary operators with a very low precedence, that should result
          // in AssignmentExpression nodes.

          eq: new TokenType("=", { beforeExpr: true, isAssign: true }),
          assign: new TokenType("_=", { beforeExpr: true, isAssign: true }),
          incDec: new TokenType("++/--", { prefix: true, postfix: true, startsExpr: true }),
          prefix: new TokenType("prefix", { beforeExpr: true, prefix: true, startsExpr: true }),
          logicalOR: binop("||", 1),
          logicalAND: binop("&&", 2),
          bitwiseOR: binop("|", 3),
          bitwiseXOR: binop("^", 4),
          bitwiseAND: binop("&", 5),
          equality: binop("==/!=", 6),
          relational: binop("</>", 7),
          bitShift: binop("<</>>", 8),
          plusMin: new TokenType("+/-", { beforeExpr: true, binop: 9, prefix: true, startsExpr: true }),
          modulo: binop("%", 10),
          star: binop("*", 10),
          slash: binop("/", 10),
          starstar: new TokenType("**", { beforeExpr: true }),

          // Keyword token types.
          _break: kw("break"),
          _case: kw("case", beforeExpr),
          _catch: kw("catch"),
          _continue: kw("continue"),
          _debugger: kw("debugger"),
          _default: kw("default", beforeExpr),
          _do: kw("do", { isLoop: true, beforeExpr: true }),
          _else: kw("else", beforeExpr),
          _finally: kw("finally"),
          _for: kw("for", { isLoop: true }),
          _function: kw("function", startsExpr),
          _if: kw("if"),
          _return: kw("return", beforeExpr),
          _switch: kw("switch"),
          _throw: kw("throw", beforeExpr),
          _try: kw("try"),
          _var: kw("var"),
          _const: kw("const"),
          _while: kw("while", { isLoop: true }),
          _with: kw("with"),
          _new: kw("new", { beforeExpr: true, startsExpr: true }),
          _this: kw("this", startsExpr),
          _super: kw("super", startsExpr),
          _class: kw("class"),
          _extends: kw("extends", beforeExpr),
          _export: kw("export"),
          _import: kw("import"),
          _null: kw("null", startsExpr),
          _true: kw("true", startsExpr),
          _false: kw("false", startsExpr),
          _in: kw("in", { beforeExpr: true, binop: 7 }),
          _instanceof: kw("instanceof", { beforeExpr: true, binop: 7 }),
          _typeof: kw("typeof", { beforeExpr: true, prefix: true, startsExpr: true }),
          _void: kw("void", { beforeExpr: true, prefix: true, startsExpr: true }),
          _delete: kw("delete", { beforeExpr: true, prefix: true, startsExpr: true })
        };

        // Matches a whole line break (where CRLF is considered a single
        // line break). Used to count lines.

        var lineBreak = /\r\n?|\n|\u2028|\u2029/;
        var lineBreakG = new RegExp(lineBreak.source, "g");

        function isNewLine(code) {
          return code === 10 || code === 13 || code === 0x2028 || code == 0x2029;
        }

        var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;

        var skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;

        function isArray(obj) {
          return Object.prototype.toString.call(obj) === "[object Array]";
        }

        // Checks if an object has a property.

        function has(obj, propName) {
          return Object.prototype.hasOwnProperty.call(obj, propName);
        }

        // These are used when `options.locations` is on, for the
        // `startLoc` and `endLoc` properties.

        var Position = function Position(line, col) {
          this.line = line;
          this.column = col;
        };

        Position.prototype.offset = function offset(n) {
          return new Position(this.line, this.column + n);
        };

        var SourceLocation = function SourceLocation(p, start, end) {
          this.start = start;
          this.end = end;
          if (p.sourceFile !== null) this.source = p.sourceFile;
        };

        // The `getLineInfo` function is mostly useful when the
        // `locations` option is off (for performance reasons) and you
        // want to find the line/column position for a given character
        // offset. `input` should be the code string that the offset refers
        // into.

        function getLineInfo(input, offset) {
          for (var line = 1, cur = 0;;) {
            lineBreakG.lastIndex = cur;
            var match = lineBreakG.exec(input);
            if (match && match.index < offset) {
              ++line;
              cur = match.index + match[0].length;
            } else {
              return new Position(line, offset - cur);
            }
          }
        }

        // A second optional argument can be given to further configure
        // the parser process. These options are recognized:

        var defaultOptions = {
          // `ecmaVersion` indicates the ECMAScript version to parse. Must
          // be either 3, or 5, or 6. This influences support for strict
          // mode, the set of reserved words, support for getters and
          // setters and other features. The default is 6.
          ecmaVersion: 6,
          // Source type ("script" or "module") for different semantics
          sourceType: "script",
          // `onInsertedSemicolon` can be a callback that will be called
          // when a semicolon is automatically inserted. It will be passed
          // th position of the comma as an offset, and if `locations` is
          // enabled, it is given the location as a `{line, column}` object
          // as second argument.
          onInsertedSemicolon: null,
          // `onTrailingComma` is similar to `onInsertedSemicolon`, but for
          // trailing commas.
          onTrailingComma: null,
          // By default, reserved words are only enforced if ecmaVersion >= 5.
          // Set `allowReserved` to a boolean value to explicitly turn this on
          // an off. When this option has the value "never", reserved words
          // and keywords can also not be used as property names.
          allowReserved: null,
          // When enabled, a return at the top level is not considered an
          // error.
          allowReturnOutsideFunction: false,
          // When enabled, import/export statements are not constrained to
          // appearing at the top of the program.
          allowImportExportEverywhere: false,
          // When enabled, hashbang directive in the beginning of file
          // is allowed and treated as a line comment.
          allowHashBang: false,
          // When `locations` is on, `loc` properties holding objects with
          // `start` and `end` properties in `{line, column}` form (with
          // line being 1-based and column 0-based) will be attached to the
          // nodes.
          locations: false,
          // A function can be passed as `onToken` option, which will
          // cause Acorn to call that function with object in the same
          // format as tokens returned from `tokenizer().getToken()`. Note
          // that you are not allowed to call the parser from the
          // callback—that will corrupt its internal state.
          onToken: null,
          // A function can be passed as `onComment` option, which will
          // cause Acorn to call that function with `(block, text, start,
          // end)` parameters whenever a comment is skipped. `block` is a
          // boolean indicating whether this is a block (`/* */`) comment,
          // `text` is the content of the comment, and `start` and `end` are
          // character offsets that denote the start and end of the comment.
          // When the `locations` option is on, two more parameters are
          // passed, the full `{line, column}` locations of the start and
          // end of the comments. Note that you are not allowed to call the
          // parser from the callback—that will corrupt its internal state.
          onComment: null,
          // Nodes have their start and end characters offsets recorded in
          // `start` and `end` properties (directly on the node, rather than
          // the `loc` object, which holds line/column data. To also add a
          // [semi-standardized][range] `range` property holding a `[start,
          // end]` array with the same numbers, set the `ranges` option to
          // `true`.
          //
          // [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678
          ranges: false,
          // It is possible to parse multiple files into a single AST by
          // passing the tree produced by parsing the first file as
          // `program` option in subsequent parses. This will add the
          // toplevel forms of the parsed file to the `Program` (top) node
          // of an existing parse tree.
          program: null,
          // When `locations` is on, you can pass this to record the source
          // file in every node's `loc` object.
          sourceFile: null,
          // This value, if given, is stored in every node, whether
          // `locations` is on or off.
          directSourceFile: null,
          // When enabled, parenthesized expressions are represented by
          // (non-standard) ParenthesizedExpression nodes
          preserveParens: false,
          plugins: {}
        };

        // Interpret and default an options object

        function getOptions(opts) {
          var options = {};
          for (var opt in defaultOptions) {
            options[opt] = opts && has(opts, opt) ? opts[opt] : defaultOptions[opt];
          }if (options.allowReserved == null) options.allowReserved = options.ecmaVersion < 5;

          if (isArray(options.onToken)) {
            var tokens = options.onToken;
            options.onToken = function (token) {
              return tokens.push(token);
            };
          }
          if (isArray(options.onComment)) options.onComment = pushComment(options, options.onComment);

          return options;
        }

        function pushComment(options, array) {
          return function (block, text, start, end, startLoc, endLoc) {
            var comment = {
              type: block ? 'Block' : 'Line',
              value: text,
              start: start,
              end: end
            };
            if (options.locations) comment.loc = new SourceLocation(this, startLoc, endLoc);
            if (options.ranges) comment.range = [start, end];
            array.push(comment);
          };
        }

        // Registered plugins
        var plugins = {};

        function keywordRegexp(words) {
          return new RegExp("^(" + words.replace(/ /g, "|") + ")$");
        }

        var Parser = function Parser(options, input, startPos) {
          this.options = options = getOptions(options);
          this.sourceFile = options.sourceFile;
          this.keywords = keywordRegexp(keywords[options.ecmaVersion >= 6 ? 6 : 5]);
          var reserved = options.allowReserved ? "" : reservedWords[options.ecmaVersion] + (options.sourceType == "module" ? " await" : "");
          this.reservedWords = keywordRegexp(reserved);
          var reservedStrict = (reserved ? reserved + " " : "") + reservedWords.strict;
          this.reservedWordsStrict = keywordRegexp(reservedStrict);
          this.reservedWordsStrictBind = keywordRegexp(reservedStrict + " " + reservedWords.strictBind);
          this.input = String(input);

          // Used to signal to callers of `readWord1` whether the word
          // contained any escape sequences. This is needed because words with
          // escape sequences must not be interpreted as keywords.
          this.containsEsc = false;

          // Load plugins
          this.loadPlugins(options.plugins);

          // Set up token state

          // The current position of the tokenizer in the input.
          if (startPos) {
            this.pos = startPos;
            this.lineStart = Math.max(0, this.input.lastIndexOf("\n", startPos));
            this.curLine = this.input.slice(0, this.lineStart).split(lineBreak).length;
          } else {
            this.pos = this.lineStart = 0;
            this.curLine = 1;
          }

          // Properties of the current token:
          // Its type
          this.type = tt.eof;
          // For tokens that include more information than their type, the value
          this.value = null;
          // Its start and end offset
          this.start = this.end = this.pos;
          // And, if locations are used, the {line, column} object
          // corresponding to those offsets
          this.startLoc = this.endLoc = this.curPosition();

          // Position information for the previous token
          this.lastTokEndLoc = this.lastTokStartLoc = null;
          this.lastTokStart = this.lastTokEnd = this.pos;

          // The context stack is used to superficially track syntactic
          // context to predict whether a regular expression is allowed in a
          // given position.
          this.context = this.initialContext();
          this.exprAllowed = true;

          // Figure out if it's a module code.
          this.strict = this.inModule = options.sourceType === "module";

          // Used to signify the start of a potential arrow function
          this.potentialArrowAt = -1;

          // Flags to track whether we are in a function, a generator.
          this.inFunction = this.inGenerator = false;
          // Labels in scope.
          this.labels = [];

          // If enabled, skip leading hashbang line.
          if (this.pos === 0 && options.allowHashBang && this.input.slice(0, 2) === '#!') this.skipLineComment(2);
        };

        // DEPRECATED Kept for backwards compatibility until 3.0 in case a plugin uses them
        Parser.prototype.isKeyword = function isKeyword(word) {
          return this.keywords.test(word);
        };
        Parser.prototype.isReservedWord = function isReservedWord(word) {
          return this.reservedWords.test(word);
        };

        Parser.prototype.extend = function extend(name, f) {
          this[name] = f(this[name]);
        };

        Parser.prototype.loadPlugins = function loadPlugins(pluginConfigs) {
          var this$1 = this;

          for (var name in pluginConfigs) {
            var plugin = plugins[name];
            if (!plugin) throw new Error("Plugin '" + name + "' not found");
            plugin(this$1, pluginConfigs[name]);
          }
        };

        Parser.prototype.parse = function parse() {
          var node = this.options.program || this.startNode();
          this.nextToken();
          return this.parseTopLevel(node);
        };

        var pp = Parser.prototype;

        // ## Parser utilities

        // Test whether a statement node is the string literal `"use strict"`.

        pp.isUseStrict = function (stmt) {
          return this.options.ecmaVersion >= 5 && stmt.type === "ExpressionStatement" && stmt.expression.type === "Literal" && stmt.expression.raw.slice(1, -1) === "use strict";
        };

        // Predicate that tests whether the next token is of the given
        // type, and if yes, consumes it as a side effect.

        pp.eat = function (type) {
          if (this.type === type) {
            this.next();
            return true;
          } else {
            return false;
          }
        };

        // Tests whether parsed token is a contextual keyword.

        pp.isContextual = function (name) {
          return this.type === tt.name && this.value === name;
        };

        // Consumes contextual keyword if possible.

        pp.eatContextual = function (name) {
          return this.value === name && this.eat(tt.name);
        };

        // Asserts that following token is given contextual keyword.

        pp.expectContextual = function (name) {
          if (!this.eatContextual(name)) this.unexpected();
        };

        // Test whether a semicolon can be inserted at the current position.

        pp.canInsertSemicolon = function () {
          return this.type === tt.eof || this.type === tt.braceR || lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
        };

        pp.insertSemicolon = function () {
          if (this.canInsertSemicolon()) {
            if (this.options.onInsertedSemicolon) this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc);
            return true;
          }
        };

        // Consume a semicolon, or, failing that, see if we are allowed to
        // pretend that there is a semicolon at this position.

        pp.semicolon = function () {
          if (!this.eat(tt.semi) && !this.insertSemicolon()) this.unexpected();
        };

        pp.afterTrailingComma = function (tokType) {
          if (this.type == tokType) {
            if (this.options.onTrailingComma) this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc);
            this.next();
            return true;
          }
        };

        // Expect a token of a given type. If found, consume it, otherwise,
        // raise an unexpected token error.

        pp.expect = function (type) {
          this.eat(type) || this.unexpected();
        };

        // Raise an unexpected token error.

        pp.unexpected = function (pos) {
          this.raise(pos != null ? pos : this.start, "Unexpected token");
        };

        var DestructuringErrors = function DestructuringErrors() {
          this.shorthandAssign = 0;
          this.trailingComma = 0;
        };

        pp.checkPatternErrors = function (refDestructuringErrors, andThrow) {
          var trailing = refDestructuringErrors && refDestructuringErrors.trailingComma;
          if (!andThrow) return !!trailing;
          if (trailing) this.raise(trailing, "Comma is not permitted after the rest element");
        };

        pp.checkExpressionErrors = function (refDestructuringErrors, andThrow) {
          var pos = refDestructuringErrors && refDestructuringErrors.shorthandAssign;
          if (!andThrow) return !!pos;
          if (pos) this.raise(pos, "Shorthand property assignments are valid only in destructuring patterns");
        };

        var pp$1 = Parser.prototype;

        // ### Statement parsing

        // Parse a program. Initializes the parser, reads any number of
        // statements, and wraps them in a Program node.  Optionally takes a
        // `program` argument.  If present, the statements will be appended
        // to its body instead of creating a new node.

        pp$1.parseTopLevel = function (node) {
          var this$1 = this;

          var first = true;
          if (!node.body) node.body = [];
          while (this.type !== tt.eof) {
            var stmt = this$1.parseStatement(true, true);
            node.body.push(stmt);
            if (first) {
              if (this$1.isUseStrict(stmt)) this$1.setStrict(true);
              first = false;
            }
          }
          this.next();
          if (this.options.ecmaVersion >= 6) {
            node.sourceType = this.options.sourceType;
          }
          return this.finishNode(node, "Program");
        };

        var loopLabel = { kind: "loop" };
        var switchLabel = { kind: "switch" };
        pp$1.isLet = function () {
          if (this.type !== tt.name || this.options.ecmaVersion < 6 || this.value != "let") return false;
          skipWhiteSpace.lastIndex = this.pos;
          var skip = skipWhiteSpace.exec(this.input);
          var next = this.pos + skip[0].length,
              nextCh = this.input.charCodeAt(next);
          if (nextCh === 91 || nextCh == 123) return true; // '{' and '['
          if (isIdentifierStart(nextCh, true)) {
            for (var pos = next + 1; isIdentifierChar(this.input.charCodeAt(pos), true); ++pos) {}
            var ident = this.input.slice(next, pos);
            if (!this.isKeyword(ident)) return true;
          }
          return false;
        };

        // Parse a single statement.
        //
        // If expecting a statement and finding a slash operator, parse a
        // regular expression literal. This is to handle cases like
        // `if (foo) /blah/.exec(foo)`, where looking at the previous token
        // does not help.

        pp$1.parseStatement = function (declaration, topLevel) {
          var starttype = this.type,
              node = this.startNode(),
              kind;

          if (this.isLet()) {
            starttype = tt._var;
            kind = "let";
          }

          // Most types of statements are recognized by the keyword they
          // start with. Many are trivial to parse, some require a bit of
          // complexity.

          switch (starttype) {
            case tt._break:case tt._continue:
              return this.parseBreakContinueStatement(node, starttype.keyword);
            case tt._debugger:
              return this.parseDebuggerStatement(node);
            case tt._do:
              return this.parseDoStatement(node);
            case tt._for:
              return this.parseForStatement(node);
            case tt._function:
              if (!declaration && this.options.ecmaVersion >= 6) this.unexpected();
              return this.parseFunctionStatement(node);
            case tt._class:
              if (!declaration) this.unexpected();
              return this.parseClass(node, true);
            case tt._if:
              return this.parseIfStatement(node);
            case tt._return:
              return this.parseReturnStatement(node);
            case tt._switch:
              return this.parseSwitchStatement(node);
            case tt._throw:
              return this.parseThrowStatement(node);
            case tt._try:
              return this.parseTryStatement(node);
            case tt._const:case tt._var:
              kind = kind || this.value;
              if (!declaration && kind != "var") this.unexpected();
              return this.parseVarStatement(node, kind);
            case tt._while:
              return this.parseWhileStatement(node);
            case tt._with:
              return this.parseWithStatement(node);
            case tt.braceL:
              return this.parseBlock();
            case tt.semi:
              return this.parseEmptyStatement(node);
            case tt._export:
            case tt._import:
              if (!this.options.allowImportExportEverywhere) {
                if (!topLevel) this.raise(this.start, "'import' and 'export' may only appear at the top level");
                if (!this.inModule) this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'");
              }
              return starttype === tt._import ? this.parseImport(node) : this.parseExport(node);

            // If the statement does not start with a statement keyword or a
            // brace, it's an ExpressionStatement or LabeledStatement. We
            // simply start parsing an expression, and afterwards, if the
            // next token is a colon and the expression was a simple
            // Identifier node, we switch to interpreting it as a label.
            default:
              var maybeName = this.value,
                  expr = this.parseExpression();
              if (starttype === tt.name && expr.type === "Identifier" && this.eat(tt.colon)) return this.parseLabeledStatement(node, maybeName, expr);else return this.parseExpressionStatement(node, expr);
          }
        };

        pp$1.parseBreakContinueStatement = function (node, keyword) {
          var this$1 = this;

          var isBreak = keyword == "break";
          this.next();
          if (this.eat(tt.semi) || this.insertSemicolon()) node.label = null;else if (this.type !== tt.name) this.unexpected();else {
            node.label = this.parseIdent();
            this.semicolon();
          }

          // Verify that there is an actual destination to break or
          // continue to.
          for (var i = 0; i < this.labels.length; ++i) {
            var lab = this$1.labels[i];
            if (node.label == null || lab.name === node.label.name) {
              if (lab.kind != null && (isBreak || lab.kind === "loop")) break;
              if (node.label && isBreak) break;
            }
          }
          if (i === this.labels.length) this.raise(node.start, "Unsyntactic " + keyword);
          return this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement");
        };

        pp$1.parseDebuggerStatement = function (node) {
          this.next();
          this.semicolon();
          return this.finishNode(node, "DebuggerStatement");
        };

        pp$1.parseDoStatement = function (node) {
          this.next();
          this.labels.push(loopLabel);
          node.body = this.parseStatement(false);
          this.labels.pop();
          this.expect(tt._while);
          node.test = this.parseParenExpression();
          if (this.options.ecmaVersion >= 6) this.eat(tt.semi);else this.semicolon();
          return this.finishNode(node, "DoWhileStatement");
        };

        // Disambiguating between a `for` and a `for`/`in` or `for`/`of`
        // loop is non-trivial. Basically, we have to parse the init `var`
        // statement or expression, disallowing the `in` operator (see
        // the second parameter to `parseExpression`), and then check
        // whether the next token is `in` or `of`. When there is no init
        // part (semicolon immediately after the opening parenthesis), it
        // is a regular `for` loop.

        pp$1.parseForStatement = function (node) {
          this.next();
          this.labels.push(loopLabel);
          this.expect(tt.parenL);
          if (this.type === tt.semi) return this.parseFor(node, null);
          var isLet = this.isLet();
          if (this.type === tt._var || this.type === tt._const || isLet) {
            var init$1 = this.startNode(),
                kind = isLet ? "let" : this.value;
            this.next();
            this.parseVar(init$1, true, kind);
            this.finishNode(init$1, "VariableDeclaration");
            if ((this.type === tt._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && init$1.declarations.length === 1 && !(kind !== "var" && init$1.declarations[0].init)) return this.parseForIn(node, init$1);
            return this.parseFor(node, init$1);
          }
          var refDestructuringErrors = new DestructuringErrors();
          var init = this.parseExpression(true, refDestructuringErrors);
          if (this.type === tt._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) {
            this.checkPatternErrors(refDestructuringErrors, true);
            this.toAssignable(init);
            this.checkLVal(init);
            return this.parseForIn(node, init);
          } else {
            this.checkExpressionErrors(refDestructuringErrors, true);
          }
          return this.parseFor(node, init);
        };

        pp$1.parseFunctionStatement = function (node) {
          this.next();
          return this.parseFunction(node, true);
        };

        pp$1.parseIfStatement = function (node) {
          this.next();
          node.test = this.parseParenExpression();
          node.consequent = this.parseStatement(false);
          node.alternate = this.eat(tt._else) ? this.parseStatement(false) : null;
          return this.finishNode(node, "IfStatement");
        };

        pp$1.parseReturnStatement = function (node) {
          if (!this.inFunction && !this.options.allowReturnOutsideFunction) this.raise(this.start, "'return' outside of function");
          this.next();

          // In `return` (and `break`/`continue`), the keywords with
          // optional arguments, we eagerly look for a semicolon or the
          // possibility to insert one.

          if (this.eat(tt.semi) || this.insertSemicolon()) node.argument = null;else {
            node.argument = this.parseExpression();this.semicolon();
          }
          return this.finishNode(node, "ReturnStatement");
        };

        pp$1.parseSwitchStatement = function (node) {
          var this$1 = this;

          this.next();
          node.discriminant = this.parseParenExpression();
          node.cases = [];
          this.expect(tt.braceL);
          this.labels.push(switchLabel);

          // Statements under must be grouped (by label) in SwitchCase
          // nodes. `cur` is used to keep the node that we are currently
          // adding statements to.

          for (var cur, sawDefault = false; this.type != tt.braceR;) {
            if (this$1.type === tt._case || this$1.type === tt._default) {
              var isCase = this$1.type === tt._case;
              if (cur) this$1.finishNode(cur, "SwitchCase");
              node.cases.push(cur = this$1.startNode());
              cur.consequent = [];
              this$1.next();
              if (isCase) {
                cur.test = this$1.parseExpression();
              } else {
                if (sawDefault) this$1.raiseRecoverable(this$1.lastTokStart, "Multiple default clauses");
                sawDefault = true;
                cur.test = null;
              }
              this$1.expect(tt.colon);
            } else {
              if (!cur) this$1.unexpected();
              cur.consequent.push(this$1.parseStatement(true));
            }
          }
          if (cur) this.finishNode(cur, "SwitchCase");
          this.next(); // Closing brace
          this.labels.pop();
          return this.finishNode(node, "SwitchStatement");
        };

        pp$1.parseThrowStatement = function (node) {
          this.next();
          if (lineBreak.test(this.input.slice(this.lastTokEnd, this.start))) this.raise(this.lastTokEnd, "Illegal newline after throw");
          node.argument = this.parseExpression();
          this.semicolon();
          return this.finishNode(node, "ThrowStatement");
        };

        // Reused empty array added for node fields that are always empty.

        var empty = [];

        pp$1.parseTryStatement = function (node) {
          this.next();
          node.block = this.parseBlock();
          node.handler = null;
          if (this.type === tt._catch) {
            var clause = this.startNode();
            this.next();
            this.expect(tt.parenL);
            clause.param = this.parseBindingAtom();
            this.checkLVal(clause.param, true);
            this.expect(tt.parenR);
            clause.body = this.parseBlock();
            node.handler = this.finishNode(clause, "CatchClause");
          }
          node.finalizer = this.eat(tt._finally) ? this.parseBlock() : null;
          if (!node.handler && !node.finalizer) this.raise(node.start, "Missing catch or finally clause");
          return this.finishNode(node, "TryStatement");
        };

        pp$1.parseVarStatement = function (node, kind) {
          this.next();
          this.parseVar(node, false, kind);
          this.semicolon();
          return this.finishNode(node, "VariableDeclaration");
        };

        pp$1.parseWhileStatement = function (node) {
          this.next();
          node.test = this.parseParenExpression();
          this.labels.push(loopLabel);
          node.body = this.parseStatement(false);
          this.labels.pop();
          return this.finishNode(node, "WhileStatement");
        };

        pp$1.parseWithStatement = function (node) {
          if (this.strict) this.raise(this.start, "'with' in strict mode");
          this.next();
          node.object = this.parseParenExpression();
          node.body = this.parseStatement(false);
          return this.finishNode(node, "WithStatement");
        };

        pp$1.parseEmptyStatement = function (node) {
          this.next();
          return this.finishNode(node, "EmptyStatement");
        };

        pp$1.parseLabeledStatement = function (node, maybeName, expr) {
          var this$1 = this;

          for (var i = 0; i < this.labels.length; ++i) {
            if (this$1.labels[i].name === maybeName) this$1.raise(expr.start, "Label '" + maybeName + "' is already declared");
          }var kind = this.type.isLoop ? "loop" : this.type === tt._switch ? "switch" : null;
          for (var i$1 = this.labels.length - 1; i$1 >= 0; i$1--) {
            var label = this$1.labels[i$1];
            if (label.statementStart == node.start) {
              label.statementStart = this$1.start;
              label.kind = kind;
            } else break;
          }
          this.labels.push({ name: maybeName, kind: kind, statementStart: this.start });
          node.body = this.parseStatement(true);
          this.labels.pop();
          node.label = expr;
          return this.finishNode(node, "LabeledStatement");
        };

        pp$1.parseExpressionStatement = function (node, expr) {
          node.expression = expr;
          this.semicolon();
          return this.finishNode(node, "ExpressionStatement");
        };

        // Parse a semicolon-enclosed block of statements, handling `"use
        // strict"` declarations when `allowStrict` is true (used for
        // function bodies).

        pp$1.parseBlock = function (allowStrict) {
          var this$1 = this;

          var node = this.startNode(),
              first = true,
              oldStrict;
          node.body = [];
          this.expect(tt.braceL);
          while (!this.eat(tt.braceR)) {
            var stmt = this$1.parseStatement(true);
            node.body.push(stmt);
            if (first && allowStrict && this$1.isUseStrict(stmt)) {
              oldStrict = this$1.strict;
              this$1.setStrict(this$1.strict = true);
            }
            first = false;
          }
          if (oldStrict === false) this.setStrict(false);
          return this.finishNode(node, "BlockStatement");
        };

        // Parse a regular `for` loop. The disambiguation code in
        // `parseStatement` will already have parsed the init statement or
        // expression.

        pp$1.parseFor = function (node, init) {
          node.init = init;
          this.expect(tt.semi);
          node.test = this.type === tt.semi ? null : this.parseExpression();
          this.expect(tt.semi);
          node.update = this.type === tt.parenR ? null : this.parseExpression();
          this.expect(tt.parenR);
          node.body = this.parseStatement(false);
          this.labels.pop();
          return this.finishNode(node, "ForStatement");
        };

        // Parse a `for`/`in` and `for`/`of` loop, which are almost
        // same from parser's perspective.

        pp$1.parseForIn = function (node, init) {
          var type = this.type === tt._in ? "ForInStatement" : "ForOfStatement";
          this.next();
          node.left = init;
          node.right = this.parseExpression();
          this.expect(tt.parenR);
          node.body = this.parseStatement(false);
          this.labels.pop();
          return this.finishNode(node, type);
        };

        // Parse a list of variable declarations.

        pp$1.parseVar = function (node, isFor, kind) {
          var this$1 = this;

          node.declarations = [];
          node.kind = kind;
          for (;;) {
            var decl = this$1.startNode();
            this$1.parseVarId(decl);
            if (this$1.eat(tt.eq)) {
              decl.init = this$1.parseMaybeAssign(isFor);
            } else if (kind === "const" && !(this$1.type === tt._in || this$1.options.ecmaVersion >= 6 && this$1.isContextual("of"))) {
              this$1.unexpected();
            } else if (decl.id.type != "Identifier" && !(isFor && (this$1.type === tt._in || this$1.isContextual("of")))) {
              this$1.raise(this$1.lastTokEnd, "Complex binding patterns require an initialization value");
            } else {
              decl.init = null;
            }
            node.declarations.push(this$1.finishNode(decl, "VariableDeclarator"));
            if (!this$1.eat(tt.comma)) break;
          }
          return node;
        };

        pp$1.parseVarId = function (decl) {
          decl.id = this.parseBindingAtom();
          this.checkLVal(decl.id, true);
        };

        // Parse a function declaration or literal (depending on the
        // `isStatement` parameter).

        pp$1.parseFunction = function (node, isStatement, allowExpressionBody) {
          this.initFunction(node);
          if (this.options.ecmaVersion >= 6) node.generator = this.eat(tt.star);
          var oldInGen = this.inGenerator;
          this.inGenerator = node.generator;
          if (isStatement || this.type === tt.name) node.id = this.parseIdent();
          this.parseFunctionParams(node);
          this.parseFunctionBody(node, allowExpressionBody);
          this.inGenerator = oldInGen;
          return this.finishNode(node, isStatement ? "FunctionDeclaration" : "FunctionExpression");
        };

        pp$1.parseFunctionParams = function (node) {
          this.expect(tt.parenL);
          node.params = this.parseBindingList(tt.parenR, false, false, true);
        };

        // Parse a class declaration or literal (depending on the
        // `isStatement` parameter).

        pp$1.parseClass = function (node, isStatement) {
          var this$1 = this;

          this.next();
          this.parseClassId(node, isStatement);
          this.parseClassSuper(node);
          var classBody = this.startNode();
          var hadConstructor = false;
          classBody.body = [];
          this.expect(tt.braceL);
          while (!this.eat(tt.braceR)) {
            if (this$1.eat(tt.semi)) continue;
            var method = this$1.startNode();
            var isGenerator = this$1.eat(tt.star);
            var isMaybeStatic = this$1.type === tt.name && this$1.value === "static";
            this$1.parsePropertyName(method);
            method.static = isMaybeStatic && this$1.type !== tt.parenL;
            if (method.static) {
              if (isGenerator) this$1.unexpected();
              isGenerator = this$1.eat(tt.star);
              this$1.parsePropertyName(method);
            }
            method.kind = "method";
            var isGetSet = false;
            if (!method.computed) {
              var key = method.key;
              if (!isGenerator && key.type === "Identifier" && this$1.type !== tt.parenL && (key.name === "get" || key.name === "set")) {
                isGetSet = true;
                method.kind = key.name;
                key = this$1.parsePropertyName(method);
              }
              if (!method.static && (key.type === "Identifier" && key.name === "constructor" || key.type === "Literal" && key.value === "constructor")) {
                if (hadConstructor) this$1.raise(key.start, "Duplicate constructor in the same class");
                if (isGetSet) this$1.raise(key.start, "Constructor can't have get/set modifier");
                if (isGenerator) this$1.raise(key.start, "Constructor can't be a generator");
                method.kind = "constructor";
                hadConstructor = true;
              }
            }
            this$1.parseClassMethod(classBody, method, isGenerator);
            if (isGetSet) {
              var paramCount = method.kind === "get" ? 0 : 1;
              if (method.value.params.length !== paramCount) {
                var start = method.value.start;
                if (method.kind === "get") this$1.raiseRecoverable(start, "getter should have no params");else this$1.raiseRecoverable(start, "setter should have exactly one param");
              }
              if (method.kind === "set" && method.value.params[0].type === "RestElement") this$1.raise(method.value.params[0].start, "Setter cannot use rest params");
            }
          }
          node.body = this.finishNode(classBody, "ClassBody");
          return this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression");
        };

        pp$1.parseClassMethod = function (classBody, method, isGenerator) {
          method.value = this.parseMethod(isGenerator);
          classBody.body.push(this.finishNode(method, "MethodDefinition"));
        };

        pp$1.parseClassId = function (node, isStatement) {
          node.id = this.type === tt.name ? this.parseIdent() : isStatement ? this.unexpected() : null;
        };

        pp$1.parseClassSuper = function (node) {
          node.superClass = this.eat(tt._extends) ? this.parseExprSubscripts() : null;
        };

        // Parses module export declaration.

        pp$1.parseExport = function (node) {
          var this$1 = this;

          this.next();
          // export * from '...'
          if (this.eat(tt.star)) {
            this.expectContextual("from");
            node.source = this.type === tt.string ? this.parseExprAtom() : this.unexpected();
            this.semicolon();
            return this.finishNode(node, "ExportAllDeclaration");
          }
          if (this.eat(tt._default)) {
            // export default ...
            var parens = this.type == tt.parenL;
            var expr = this.parseMaybeAssign();
            var needsSemi = true;
            if (!parens && (expr.type == "FunctionExpression" || expr.type == "ClassExpression")) {
              needsSemi = false;
              if (expr.id) {
                expr.type = expr.type == "FunctionExpression" ? "FunctionDeclaration" : "ClassDeclaration";
              }
            }
            node.declaration = expr;
            if (needsSemi) this.semicolon();
            return this.finishNode(node, "ExportDefaultDeclaration");
          }
          // export var|const|let|function|class ...
          if (this.shouldParseExportStatement()) {
            node.declaration = this.parseStatement(true);
            node.specifiers = [];
            node.source = null;
          } else {
            // export { x, y as z } [from '...']
            node.declaration = null;
            node.specifiers = this.parseExportSpecifiers();
            if (this.eatContextual("from")) {
              node.source = this.type === tt.string ? this.parseExprAtom() : this.unexpected();
            } else {
              // check for keywords used as local names
              for (var i = 0; i < node.specifiers.length; i++) {
                if (this$1.keywords.test(node.specifiers[i].local.name) || this$1.reservedWords.test(node.specifiers[i].local.name)) {
                  this$1.unexpected(node.specifiers[i].local.start);
                }
              }

              node.source = null;
            }
            this.semicolon();
          }
          return this.finishNode(node, "ExportNamedDeclaration");
        };

        pp$1.shouldParseExportStatement = function () {
          return this.type.keyword || this.isLet();
        };

        // Parses a comma-separated list of module exports.

        pp$1.parseExportSpecifiers = function () {
          var this$1 = this;

          var nodes = [],
              first = true;
          // export { x, y as z } [from '...']
          this.expect(tt.braceL);
          while (!this.eat(tt.braceR)) {
            if (!first) {
              this$1.expect(tt.comma);
              if (this$1.afterTrailingComma(tt.braceR)) break;
            } else first = false;

            var node = this$1.startNode();
            node.local = this$1.parseIdent(this$1.type === tt._default);
            node.exported = this$1.eatContextual("as") ? this$1.parseIdent(true) : node.local;
            nodes.push(this$1.finishNode(node, "ExportSpecifier"));
          }
          return nodes;
        };

        // Parses import declaration.

        pp$1.parseImport = function (node) {
          this.next();
          // import '...'
          if (this.type === tt.string) {
            node.specifiers = empty;
            node.source = this.parseExprAtom();
          } else {
            node.specifiers = this.parseImportSpecifiers();
            this.expectContextual("from");
            node.source = this.type === tt.string ? this.parseExprAtom() : this.unexpected();
          }
          this.semicolon();
          return this.finishNode(node, "ImportDeclaration");
        };

        // Parses a comma-separated list of module imports.

        pp$1.parseImportSpecifiers = function () {
          var this$1 = this;

          var nodes = [],
              first = true;
          if (this.type === tt.name) {
            // import defaultObj, { x, y as z } from '...'
            var node = this.startNode();
            node.local = this.parseIdent();
            this.checkLVal(node.local, true);
            nodes.push(this.finishNode(node, "ImportDefaultSpecifier"));
            if (!this.eat(tt.comma)) return nodes;
          }
          if (this.type === tt.star) {
            var node$1 = this.startNode();
            this.next();
            this.expectContextual("as");
            node$1.local = this.parseIdent();
            this.checkLVal(node$1.local, true);
            nodes.push(this.finishNode(node$1, "ImportNamespaceSpecifier"));
            return nodes;
          }
          this.expect(tt.braceL);
          while (!this.eat(tt.braceR)) {
            if (!first) {
              this$1.expect(tt.comma);
              if (this$1.afterTrailingComma(tt.braceR)) break;
            } else first = false;

            var node$2 = this$1.startNode();
            node$2.imported = this$1.parseIdent(true);
            if (this$1.eatContextual("as")) {
              node$2.local = this$1.parseIdent();
            } else {
              node$2.local = node$2.imported;
              if (this$1.isKeyword(node$2.local.name)) this$1.unexpected(node$2.local.start);
              if (this$1.reservedWordsStrict.test(node$2.local.name)) this$1.raise(node$2.local.start, "The keyword '" + node$2.local.name + "' is reserved");
            }
            this$1.checkLVal(node$2.local, true);
            nodes.push(this$1.finishNode(node$2, "ImportSpecifier"));
          }
          return nodes;
        };

        var pp$2 = Parser.prototype;

        // Convert existing expression atom to assignable pattern
        // if possible.

        pp$2.toAssignable = function (node, isBinding) {
          var this$1 = this;

          if (this.options.ecmaVersion >= 6 && node) {
            switch (node.type) {
              case "Identifier":
              case "ObjectPattern":
              case "ArrayPattern":
                break;

              case "ObjectExpression":
                node.type = "ObjectPattern";
                for (var i = 0; i < node.properties.length; i++) {
                  var prop = node.properties[i];
                  if (prop.kind !== "init") this$1.raise(prop.key.start, "Object pattern can't contain getter or setter");
                  this$1.toAssignable(prop.value, isBinding);
                }
                break;

              case "ArrayExpression":
                node.type = "ArrayPattern";
                this.toAssignableList(node.elements, isBinding);
                break;

              case "AssignmentExpression":
                if (node.operator === "=") {
                  node.type = "AssignmentPattern";
                  delete node.operator;
                  // falls through to AssignmentPattern
                } else {
                  this.raise(node.left.end, "Only '=' operator can be used for specifying default value.");
                  break;
                }

              case "AssignmentPattern":
                if (node.right.type === "YieldExpression") this.raise(node.right.start, "Yield expression cannot be a default value");
                break;

              case "ParenthesizedExpression":
                node.expression = this.toAssignable(node.expression, isBinding);
                break;

              case "MemberExpression":
                if (!isBinding) break;

              default:
                this.raise(node.start, "Assigning to rvalue");
            }
          }
          return node;
        };

        // Convert list of expression atoms to binding list.

        pp$2.toAssignableList = function (exprList, isBinding) {
          var this$1 = this;

          var end = exprList.length;
          if (end) {
            var last = exprList[end - 1];
            if (last && last.type == "RestElement") {
              --end;
            } else if (last && last.type == "SpreadElement") {
              last.type = "RestElement";
              var arg = last.argument;
              this.toAssignable(arg, isBinding);
              if (arg.type !== "Identifier" && arg.type !== "MemberExpression" && arg.type !== "ArrayPattern") this.unexpected(arg.start);
              --end;
            }

            if (isBinding && last && last.type === "RestElement" && last.argument.type !== "Identifier") this.unexpected(last.argument.start);
          }
          for (var i = 0; i < end; i++) {
            var elt = exprList[i];
            if (elt) this$1.toAssignable(elt, isBinding);
          }
          return exprList;
        };

        // Parses spread element.

        pp$2.parseSpread = function (refDestructuringErrors) {
          var node = this.startNode();
          this.next();
          node.argument = this.parseMaybeAssign(false, refDestructuringErrors);
          return this.finishNode(node, "SpreadElement");
        };

        pp$2.parseRest = function (allowNonIdent) {
          var node = this.startNode();
          this.next();

          // RestElement inside of a function parameter must be an identifier
          if (allowNonIdent) node.argument = this.type === tt.name ? this.parseIdent() : this.unexpected();else node.argument = this.type === tt.name || this.type === tt.bracketL ? this.parseBindingAtom() : this.unexpected();

          return this.finishNode(node, "RestElement");
        };

        // Parses lvalue (assignable) atom.

        pp$2.parseBindingAtom = function () {
          if (this.options.ecmaVersion < 6) return this.parseIdent();
          switch (this.type) {
            case tt.name:
              return this.parseIdent();

            case tt.bracketL:
              var node = this.startNode();
              this.next();
              node.elements = this.parseBindingList(tt.bracketR, true, true);
              return this.finishNode(node, "ArrayPattern");

            case tt.braceL:
              return this.parseObj(true);

            default:
              this.unexpected();
          }
        };

        pp$2.parseBindingList = function (close, allowEmpty, allowTrailingComma, allowNonIdent) {
          var this$1 = this;

          var elts = [],
              first = true;
          while (!this.eat(close)) {
            if (first) first = false;else this$1.expect(tt.comma);
            if (allowEmpty && this$1.type === tt.comma) {
              elts.push(null);
            } else if (allowTrailingComma && this$1.afterTrailingComma(close)) {
              break;
            } else if (this$1.type === tt.ellipsis) {
              var rest = this$1.parseRest(allowNonIdent);
              this$1.parseBindingListItem(rest);
              elts.push(rest);
              if (this$1.type === tt.comma) this$1.raise(this$1.start, "Comma is not permitted after the rest element");
              this$1.expect(close);
              break;
            } else {
              var elem = this$1.parseMaybeDefault(this$1.start, this$1.startLoc);
              this$1.parseBindingListItem(elem);
              elts.push(elem);
            }
          }
          return elts;
        };

        pp$2.parseBindingListItem = function (param) {
          return param;
        };

        // Parses assignment pattern around given atom if possible.

        pp$2.parseMaybeDefault = function (startPos, startLoc, left) {
          left = left || this.parseBindingAtom();
          if (this.options.ecmaVersion < 6 || !this.eat(tt.eq)) return left;
          var node = this.startNodeAt(startPos, startLoc);
          node.left = left;
          node.right = this.parseMaybeAssign();
          return this.finishNode(node, "AssignmentPattern");
        };

        // Verify that a node is an lval — something that can be assigned
        // to.

        pp$2.checkLVal = function (expr, isBinding, checkClashes) {
          var this$1 = this;

          switch (expr.type) {
            case "Identifier":
              if (this.strict && this.reservedWordsStrictBind.test(expr.name)) this.raiseRecoverable(expr.start, (isBinding ? "Binding " : "Assigning to ") + expr.name + " in strict mode");
              if (checkClashes) {
                if (has(checkClashes, expr.name)) this.raiseRecoverable(expr.start, "Argument name clash");
                checkClashes[expr.name] = true;
              }
              break;

            case "MemberExpression":
              if (isBinding) this.raiseRecoverable(expr.start, (isBinding ? "Binding" : "Assigning to") + " member expression");
              break;

            case "ObjectPattern":
              for (var i = 0; i < expr.properties.length; i++) {
                this$1.checkLVal(expr.properties[i].value, isBinding, checkClashes);
              }break;

            case "ArrayPattern":
              for (var i$1 = 0; i$1 < expr.elements.length; i$1++) {
                var elem = expr.elements[i$1];
                if (elem) this$1.checkLVal(elem, isBinding, checkClashes);
              }
              break;

            case "AssignmentPattern":
              this.checkLVal(expr.left, isBinding, checkClashes);
              break;

            case "RestElement":
              this.checkLVal(expr.argument, isBinding, checkClashes);
              break;

            case "ParenthesizedExpression":
              this.checkLVal(expr.expression, isBinding, checkClashes);
              break;

            default:
              this.raise(expr.start, (isBinding ? "Binding" : "Assigning to") + " rvalue");
          }
        };

        var pp$3 = Parser.prototype;

        // Check if property name clashes with already added.
        // Object/class getters and setters are not allowed to clash —
        // either with each other or with an init property — and in
        // strict mode, init properties are also not allowed to be repeated.

        pp$3.checkPropClash = function (prop, propHash) {
          if (this.options.ecmaVersion >= 6 && (prop.computed || prop.method || prop.shorthand)) return;
          var key = prop.key;
          var name;
          switch (key.type) {
            case "Identifier":
              name = key.name;break;
            case "Literal":
              name = String(key.value);break;
            default:
              return;
          }
          var kind = prop.kind;
          if (this.options.ecmaVersion >= 6) {
            if (name === "__proto__" && kind === "init") {
              if (propHash.proto) this.raiseRecoverable(key.start, "Redefinition of __proto__ property");
              propHash.proto = true;
            }
            return;
          }
          name = "$" + name;
          var other = propHash[name];
          if (other) {
            var isGetSet = kind !== "init";
            if ((this.strict || isGetSet) && other[kind] || !(isGetSet ^ other.init)) this.raiseRecoverable(key.start, "Redefinition of property");
          } else {
            other = propHash[name] = {
              init: false,
              get: false,
              set: false
            };
          }
          other[kind] = true;
        };

        // ### Expression parsing

        // These nest, from the most general expression type at the top to
        // 'atomic', nondivisible expression types at the bottom. Most of
        // the functions will simply let the function(s) below them parse,
        // and, *if* the syntactic construct they handle is present, wrap
        // the AST node that the inner parser gave them in another node.

        // Parse a full expression. The optional arguments are used to
        // forbid the `in` operator (in for loops initalization expressions)
        // and provide reference for storing '=' operator inside shorthand
        // property assignment in contexts where both object expression
        // and object pattern might appear (so it's possible to raise
        // delayed syntax error at correct position).

        pp$3.parseExpression = function (noIn, refDestructuringErrors) {
          var this$1 = this;

          var startPos = this.start,
              startLoc = this.startLoc;
          var expr = this.parseMaybeAssign(noIn, refDestructuringErrors);
          if (this.type === tt.comma) {
            var node = this.startNodeAt(startPos, startLoc);
            node.expressions = [expr];
            while (this.eat(tt.comma)) {
              node.expressions.push(this$1.parseMaybeAssign(noIn, refDestructuringErrors));
            }return this.finishNode(node, "SequenceExpression");
          }
          return expr;
        };

        // Parse an assignment expression. This includes applications of
        // operators like `+=`.

        pp$3.parseMaybeAssign = function (noIn, refDestructuringErrors, afterLeftParse) {
          if (this.inGenerator && this.isContextual("yield")) return this.parseYield();

          var ownDestructuringErrors = false;
          if (!refDestructuringErrors) {
            refDestructuringErrors = new DestructuringErrors();
            ownDestructuringErrors = true;
          }
          var startPos = this.start,
              startLoc = this.startLoc;
          if (this.type == tt.parenL || this.type == tt.name) this.potentialArrowAt = this.start;
          var left = this.parseMaybeConditional(noIn, refDestructuringErrors);
          if (afterLeftParse) left = afterLeftParse.call(this, left, startPos, startLoc);
          if (this.type.isAssign) {
            this.checkPatternErrors(refDestructuringErrors, true);
            if (!ownDestructuringErrors) DestructuringErrors.call(refDestructuringErrors);
            var node = this.startNodeAt(startPos, startLoc);
            node.operator = this.value;
            node.left = this.type === tt.eq ? this.toAssignable(left) : left;
            refDestructuringErrors.shorthandAssign = 0; // reset because shorthand default was used correctly
            this.checkLVal(left);
            this.next();
            node.right = this.parseMaybeAssign(noIn);
            return this.finishNode(node, "AssignmentExpression");
          } else {
            if (ownDestructuringErrors) this.checkExpressionErrors(refDestructuringErrors, true);
          }
          return left;
        };

        // Parse a ternary conditional (`?:`) operator.

        pp$3.parseMaybeConditional = function (noIn, refDestructuringErrors) {
          var startPos = this.start,
              startLoc = this.startLoc;
          var expr = this.parseExprOps(noIn, refDestructuringErrors);
          if (this.checkExpressionErrors(refDestructuringErrors)) return expr;
          if (this.eat(tt.question)) {
            var node = this.startNodeAt(startPos, startLoc);
            node.test = expr;
            node.consequent = this.parseMaybeAssign();
            this.expect(tt.colon);
            node.alternate = this.parseMaybeAssign(noIn);
            return this.finishNode(node, "ConditionalExpression");
          }
          return expr;
        };

        // Start the precedence parser.

        pp$3.parseExprOps = function (noIn, refDestructuringErrors) {
          var startPos = this.start,
              startLoc = this.startLoc;
          var expr = this.parseMaybeUnary(refDestructuringErrors, false);
          if (this.checkExpressionErrors(refDestructuringErrors)) return expr;
          return this.parseExprOp(expr, startPos, startLoc, -1, noIn);
        };

        // Parse binary operators with the operator precedence parsing
        // algorithm. `left` is the left-hand side of the operator.
        // `minPrec` provides context that allows the function to stop and
        // defer further parser to one of its callers when it encounters an
        // operator that has a lower precedence than the set it is parsing.

        pp$3.parseExprOp = function (left, leftStartPos, leftStartLoc, minPrec, noIn) {
          var prec = this.type.binop;
          if (prec != null && (!noIn || this.type !== tt._in)) {
            if (prec > minPrec) {
              var logical = this.type === tt.logicalOR || this.type === tt.logicalAND;
              var op = this.value;
              this.next();
              var startPos = this.start,
                  startLoc = this.startLoc;
              var right = this.parseExprOp(this.parseMaybeUnary(null, false), startPos, startLoc, prec, noIn);
              var node = this.buildBinary(leftStartPos, leftStartLoc, left, right, op, logical);
              return this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec, noIn);
            }
          }
          return left;
        };

        pp$3.buildBinary = function (startPos, startLoc, left, right, op, logical) {
          var node = this.startNodeAt(startPos, startLoc);
          node.left = left;
          node.operator = op;
          node.right = right;
          return this.finishNode(node, logical ? "LogicalExpression" : "BinaryExpression");
        };

        // Parse unary operators, both prefix and postfix.

        pp$3.parseMaybeUnary = function (refDestructuringErrors, sawUnary) {
          var this$1 = this;

          var startPos = this.start,
              startLoc = this.startLoc,
              expr;
          if (this.type.prefix) {
            var node = this.startNode(),
                update = this.type === tt.incDec;
            node.operator = this.value;
            node.prefix = true;
            this.next();
            node.argument = this.parseMaybeUnary(null, true);
            this.checkExpressionErrors(refDestructuringErrors, true);
            if (update) this.checkLVal(node.argument);else if (this.strict && node.operator === "delete" && node.argument.type === "Identifier") this.raiseRecoverable(node.start, "Deleting local variable in strict mode");else sawUnary = true;
            expr = this.finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
          } else {
            expr = this.parseExprSubscripts(refDestructuringErrors);
            if (this.checkExpressionErrors(refDestructuringErrors)) return expr;
            while (this.type.postfix && !this.canInsertSemicolon()) {
              var node$1 = this$1.startNodeAt(startPos, startLoc);
              node$1.operator = this$1.value;
              node$1.prefix = false;
              node$1.argument = expr;
              this$1.checkLVal(expr);
              this$1.next();
              expr = this$1.finishNode(node$1, "UpdateExpression");
            }
          }

          if (!sawUnary && this.eat(tt.starstar)) return this.buildBinary(startPos, startLoc, expr, this.parseMaybeUnary(null, false), "**", false);else return expr;
        };

        // Parse call, dot, and `[]`-subscript expressions.

        pp$3.parseExprSubscripts = function (refDestructuringErrors) {
          var startPos = this.start,
              startLoc = this.startLoc;
          var expr = this.parseExprAtom(refDestructuringErrors);
          var skipArrowSubscripts = expr.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")";
          if (this.checkExpressionErrors(refDestructuringErrors) || skipArrowSubscripts) return expr;
          return this.parseSubscripts(expr, startPos, startLoc);
        };

        pp$3.parseSubscripts = function (base, startPos, startLoc, noCalls) {
          var this$1 = this;

          for (;;) {
            if (this$1.eat(tt.dot)) {
              var node = this$1.startNodeAt(startPos, startLoc);
              node.object = base;
              node.property = this$1.parseIdent(true);
              node.computed = false;
              base = this$1.finishNode(node, "MemberExpression");
            } else if (this$1.eat(tt.bracketL)) {
              var node$1 = this$1.startNodeAt(startPos, startLoc);
              node$1.object = base;
              node$1.property = this$1.parseExpression();
              node$1.computed = true;
              this$1.expect(tt.bracketR);
              base = this$1.finishNode(node$1, "MemberExpression");
            } else if (!noCalls && this$1.eat(tt.parenL)) {
              var node$2 = this$1.startNodeAt(startPos, startLoc);
              node$2.callee = base;
              node$2.arguments = this$1.parseExprList(tt.parenR, false);
              base = this$1.finishNode(node$2, "CallExpression");
            } else if (this$1.type === tt.backQuote) {
              var node$3 = this$1.startNodeAt(startPos, startLoc);
              node$3.tag = base;
              node$3.quasi = this$1.parseTemplate();
              base = this$1.finishNode(node$3, "TaggedTemplateExpression");
            } else {
              return base;
            }
          }
        };

        // Parse an atomic expression — either a single token that is an
        // expression, an expression started by a keyword like `function` or
        // `new`, or an expression wrapped in punctuation like `()`, `[]`,
        // or `{}`.

        pp$3.parseExprAtom = function (refDestructuringErrors) {
          var node,
              canBeArrow = this.potentialArrowAt == this.start;
          switch (this.type) {
            case tt._super:
              if (!this.inFunction) this.raise(this.start, "'super' outside of function or class");

            case tt._this:
              var type = this.type === tt._this ? "ThisExpression" : "Super";
              node = this.startNode();
              this.next();
              return this.finishNode(node, type);

            case tt.name:
              var startPos = this.start,
                  startLoc = this.startLoc;
              var id = this.parseIdent(this.type !== tt.name);
              if (canBeArrow && !this.canInsertSemicolon() && this.eat(tt.arrow)) return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id]);
              return id;

            case tt.regexp:
              var value = this.value;
              node = this.parseLiteral(value.value);
              node.regex = { pattern: value.pattern, flags: value.flags };
              return node;

            case tt.num:case tt.string:
              return this.parseLiteral(this.value);

            case tt._null:case tt._true:case tt._false:
              node = this.startNode();
              node.value = this.type === tt._null ? null : this.type === tt._true;
              node.raw = this.type.keyword;
              this.next();
              return this.finishNode(node, "Literal");

            case tt.parenL:
              return this.parseParenAndDistinguishExpression(canBeArrow);

            case tt.bracketL:
              node = this.startNode();
              this.next();
              node.elements = this.parseExprList(tt.bracketR, true, true, refDestructuringErrors);
              return this.finishNode(node, "ArrayExpression");

            case tt.braceL:
              return this.parseObj(false, refDestructuringErrors);

            case tt._function:
              node = this.startNode();
              this.next();
              return this.parseFunction(node, false);

            case tt._class:
              return this.parseClass(this.startNode(), false);

            case tt._new:
              return this.parseNew();

            case tt.backQuote:
              return this.parseTemplate();

            default:
              this.unexpected();
          }
        };

        pp$3.parseLiteral = function (value) {
          var node = this.startNode();
          node.value = value;
          node.raw = this.input.slice(this.start, this.end);
          this.next();
          return this.finishNode(node, "Literal");
        };

        pp$3.parseParenExpression = function () {
          this.expect(tt.parenL);
          var val = this.parseExpression();
          this.expect(tt.parenR);
          return val;
        };

        pp$3.parseParenAndDistinguishExpression = function (canBeArrow) {
          var this$1 = this;

          var startPos = this.start,
              startLoc = this.startLoc,
              val;
          if (this.options.ecmaVersion >= 6) {
            this.next();

            var innerStartPos = this.start,
                innerStartLoc = this.startLoc;
            var exprList = [],
                first = true;
            var refDestructuringErrors = new DestructuringErrors(),
                spreadStart,
                innerParenStart;
            while (this.type !== tt.parenR) {
              first ? first = false : this$1.expect(tt.comma);
              if (this$1.type === tt.ellipsis) {
                spreadStart = this$1.start;
                exprList.push(this$1.parseParenItem(this$1.parseRest()));
                break;
              } else {
                if (this$1.type === tt.parenL && !innerParenStart) {
                  innerParenStart = this$1.start;
                }
                exprList.push(this$1.parseMaybeAssign(false, refDestructuringErrors, this$1.parseParenItem));
              }
            }
            var innerEndPos = this.start,
                innerEndLoc = this.startLoc;
            this.expect(tt.parenR);

            if (canBeArrow && !this.canInsertSemicolon() && this.eat(tt.arrow)) {
              this.checkPatternErrors(refDestructuringErrors, true);
              if (innerParenStart) this.unexpected(innerParenStart);
              return this.parseParenArrowList(startPos, startLoc, exprList);
            }

            if (!exprList.length) this.unexpected(this.lastTokStart);
            if (spreadStart) this.unexpected(spreadStart);
            this.checkExpressionErrors(refDestructuringErrors, true);

            if (exprList.length > 1) {
              val = this.startNodeAt(innerStartPos, innerStartLoc);
              val.expressions = exprList;
              this.finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc);
            } else {
              val = exprList[0];
            }
          } else {
            val = this.parseParenExpression();
          }

          if (this.options.preserveParens) {
            var par = this.startNodeAt(startPos, startLoc);
            par.expression = val;
            return this.finishNode(par, "ParenthesizedExpression");
          } else {
            return val;
          }
        };

        pp$3.parseParenItem = function (item) {
          return item;
        };

        pp$3.parseParenArrowList = function (startPos, startLoc, exprList) {
          return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList);
        };

        // New's precedence is slightly tricky. It must allow its argument to
        // be a `[]` or dot subscript expression, but not a call — at least,
        // not without wrapping it in parentheses. Thus, it uses the noCalls
        // argument to parseSubscripts to prevent it from consuming the
        // argument list.

        var empty$1 = [];

        pp$3.parseNew = function () {
          var node = this.startNode();
          var meta = this.parseIdent(true);
          if (this.options.ecmaVersion >= 6 && this.eat(tt.dot)) {
            node.meta = meta;
            node.property = this.parseIdent(true);
            if (node.property.name !== "target") this.raiseRecoverable(node.property.start, "The only valid meta property for new is new.target");
            if (!this.inFunction) this.raiseRecoverable(node.start, "new.target can only be used in functions");
            return this.finishNode(node, "MetaProperty");
          }
          var startPos = this.start,
              startLoc = this.startLoc;
          node.callee = this.parseSubscripts(this.parseExprAtom(), startPos, startLoc, true);
          if (this.eat(tt.parenL)) node.arguments = this.parseExprList(tt.parenR, false);else node.arguments = empty$1;
          return this.finishNode(node, "NewExpression");
        };

        // Parse template expression.

        pp$3.parseTemplateElement = function () {
          var elem = this.startNode();
          elem.value = {
            raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, '\n'),
            cooked: this.value
          };
          this.next();
          elem.tail = this.type === tt.backQuote;
          return this.finishNode(elem, "TemplateElement");
        };

        pp$3.parseTemplate = function () {
          var this$1 = this;

          var node = this.startNode();
          this.next();
          node.expressions = [];
          var curElt = this.parseTemplateElement();
          node.quasis = [curElt];
          while (!curElt.tail) {
            this$1.expect(tt.dollarBraceL);
            node.expressions.push(this$1.parseExpression());
            this$1.expect(tt.braceR);
            node.quasis.push(curElt = this$1.parseTemplateElement());
          }
          this.next();
          return this.finishNode(node, "TemplateLiteral");
        };

        // Parse an object literal or binding pattern.

        pp$3.parseObj = function (isPattern, refDestructuringErrors) {
          var this$1 = this;

          var node = this.startNode(),
              first = true,
              propHash = {};
          node.properties = [];
          this.next();
          while (!this.eat(tt.braceR)) {
            if (!first) {
              this$1.expect(tt.comma);
              if (this$1.afterTrailingComma(tt.braceR)) break;
            } else first = false;

            var prop = this$1.startNode(),
                isGenerator,
                startPos,
                startLoc;
            if (this$1.options.ecmaVersion >= 6) {
              prop.method = false;
              prop.shorthand = false;
              if (isPattern || refDestructuringErrors) {
                startPos = this$1.start;
                startLoc = this$1.startLoc;
              }
              if (!isPattern) isGenerator = this$1.eat(tt.star);
            }
            this$1.parsePropertyName(prop);
            this$1.parsePropertyValue(prop, isPattern, isGenerator, startPos, startLoc, refDestructuringErrors);
            this$1.checkPropClash(prop, propHash);
            node.properties.push(this$1.finishNode(prop, "Property"));
          }
          return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression");
        };

        pp$3.parsePropertyValue = function (prop, isPattern, isGenerator, startPos, startLoc, refDestructuringErrors) {
          if (this.eat(tt.colon)) {
            prop.value = isPattern ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(false, refDestructuringErrors);
            prop.kind = "init";
          } else if (this.options.ecmaVersion >= 6 && this.type === tt.parenL) {
            if (isPattern) this.unexpected();
            prop.kind = "init";
            prop.method = true;
            prop.value = this.parseMethod(isGenerator);
          } else if (this.options.ecmaVersion >= 5 && !prop.computed && prop.key.type === "Identifier" && (prop.key.name === "get" || prop.key.name === "set") && this.type != tt.comma && this.type != tt.braceR) {
            if (isGenerator || isPattern) this.unexpected();
            prop.kind = prop.key.name;
            this.parsePropertyName(prop);
            prop.value = this.parseMethod(false);
            var paramCount = prop.kind === "get" ? 0 : 1;
            if (prop.value.params.length !== paramCount) {
              var start = prop.value.start;
              if (prop.kind === "get") this.raiseRecoverable(start, "getter should have no params");else this.raiseRecoverable(start, "setter should have exactly one param");
            }
            if (prop.kind === "set" && prop.value.params[0].type === "RestElement") this.raiseRecoverable(prop.value.params[0].start, "Setter cannot use rest params");
          } else if (this.options.ecmaVersion >= 6 && !prop.computed && prop.key.type === "Identifier") {
            if (this.keywords.test(prop.key.name) || (this.strict ? this.reservedWordsStrictBind : this.reservedWords).test(prop.key.name) || this.inGenerator && prop.key.name == "yield") this.raiseRecoverable(prop.key.start, "'" + prop.key.name + "' can not be used as shorthand property");
            prop.kind = "init";
            if (isPattern) {
              prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key);
            } else if (this.type === tt.eq && refDestructuringErrors) {
              if (!refDestructuringErrors.shorthandAssign) refDestructuringErrors.shorthandAssign = this.start;
              prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key);
            } else {
              prop.value = prop.key;
            }
            prop.shorthand = true;
          } else this.unexpected();
        };

        pp$3.parsePropertyName = function (prop) {
          if (this.options.ecmaVersion >= 6) {
            if (this.eat(tt.bracketL)) {
              prop.computed = true;
              prop.key = this.parseMaybeAssign();
              this.expect(tt.bracketR);
              return prop.key;
            } else {
              prop.computed = false;
            }
          }
          return prop.key = this.type === tt.num || this.type === tt.string ? this.parseExprAtom() : this.parseIdent(true);
        };

        // Initialize empty function node.

        pp$3.initFunction = function (node) {
          node.id = null;
          if (this.options.ecmaVersion >= 6) {
            node.generator = false;
            node.expression = false;
          }
        };

        // Parse object or class method.

        pp$3.parseMethod = function (isGenerator) {
          var node = this.startNode(),
              oldInGen = this.inGenerator;
          this.inGenerator = isGenerator;
          this.initFunction(node);
          this.expect(tt.parenL);
          node.params = this.parseBindingList(tt.parenR, false, false);
          if (this.options.ecmaVersion >= 6) node.generator = isGenerator;
          this.parseFunctionBody(node, false);
          this.inGenerator = oldInGen;
          return this.finishNode(node, "FunctionExpression");
        };

        // Parse arrow function expression with given parameters.

        pp$3.parseArrowExpression = function (node, params) {
          var oldInGen = this.inGenerator;
          this.inGenerator = false;
          this.initFunction(node);
          node.params = this.toAssignableList(params, true);
          this.parseFunctionBody(node, true);
          this.inGenerator = oldInGen;
          return this.finishNode(node, "ArrowFunctionExpression");
        };

        // Parse function body and check parameters.

        pp$3.parseFunctionBody = function (node, isArrowFunction) {
          var isExpression = isArrowFunction && this.type !== tt.braceL;

          if (isExpression) {
            node.body = this.parseMaybeAssign();
            node.expression = true;
          } else {
            // Start a new scope with regard to labels and the `inFunction`
            // flag (restore them to their old value afterwards).
            var oldInFunc = this.inFunction,
                oldLabels = this.labels;
            this.inFunction = true;this.labels = [];
            node.body = this.parseBlock(true);
            node.expression = false;
            this.inFunction = oldInFunc;this.labels = oldLabels;
          }

          // If this is a strict mode function, verify that argument names
          // are not repeated, and it does not try to bind the words `eval`
          // or `arguments`.
          var useStrict = !isExpression && node.body.body.length && this.isUseStrict(node.body.body[0]) ? node.body.body[0] : null;
          if (this.strict || useStrict) {
            var oldStrict = this.strict;
            this.strict = true;
            if (node.id) this.checkLVal(node.id, true);
            this.checkParams(node, useStrict);
            this.strict = oldStrict;
          } else if (isArrowFunction) {
            this.checkParams(node, useStrict);
          }
        };

        // Checks function params for various disallowed patterns such as using "eval"
        // or "arguments" and duplicate parameters.

        pp$3.checkParams = function (node, useStrict) {
          var this$1 = this;

          var nameHash = {};
          for (var i = 0; i < node.params.length; i++) {
            if (useStrict && this$1.options.ecmaVersion >= 7 && node.params[i].type !== "Identifier") this$1.raiseRecoverable(useStrict.start, "Illegal 'use strict' directive in function with non-simple parameter list");
            this$1.checkLVal(node.params[i], true, nameHash);
          }
        };

        // Parses a comma-separated list of expressions, and returns them as
        // an array. `close` is the token type that ends the list, and
        // `allowEmpty` can be turned on to allow subsequent commas with
        // nothing in between them to be parsed as `null` (which is needed
        // for array literals).

        pp$3.parseExprList = function (close, allowTrailingComma, allowEmpty, refDestructuringErrors) {
          var this$1 = this;

          var elts = [],
              first = true;
          while (!this.eat(close)) {
            if (!first) {
              this$1.expect(tt.comma);
              if (allowTrailingComma && this$1.afterTrailingComma(close)) break;
            } else first = false;

            var elt;
            if (allowEmpty && this$1.type === tt.comma) elt = null;else if (this$1.type === tt.ellipsis) {
              elt = this$1.parseSpread(refDestructuringErrors);
              if (this$1.type === tt.comma && refDestructuringErrors && !refDestructuringErrors.trailingComma) {
                refDestructuringErrors.trailingComma = this$1.lastTokStart;
              }
            } else elt = this$1.parseMaybeAssign(false, refDestructuringErrors);
            elts.push(elt);
          }
          return elts;
        };

        // Parse the next token as an identifier. If `liberal` is true (used
        // when parsing properties), it will also convert keywords into
        // identifiers.

        pp$3.parseIdent = function (liberal) {
          var node = this.startNode();
          if (liberal && this.options.allowReserved == "never") liberal = false;
          if (this.type === tt.name) {
            if (!liberal && (this.strict ? this.reservedWordsStrict : this.reservedWords).test(this.value) && (this.options.ecmaVersion >= 6 || this.input.slice(this.start, this.end).indexOf("\\") == -1)) this.raiseRecoverable(this.start, "The keyword '" + this.value + "' is reserved");
            if (!liberal && this.inGenerator && this.value === "yield") this.raiseRecoverable(this.start, "Can not use 'yield' as identifier inside a generator");
            node.name = this.value;
          } else if (liberal && this.type.keyword) {
            node.name = this.type.keyword;
          } else {
            this.unexpected();
          }
          this.next();
          return this.finishNode(node, "Identifier");
        };

        // Parses yield expression inside generator.

        pp$3.parseYield = function () {
          var node = this.startNode();
          this.next();
          if (this.type == tt.semi || this.canInsertSemicolon() || this.type != tt.star && !this.type.startsExpr) {
            node.delegate = false;
            node.argument = null;
          } else {
            node.delegate = this.eat(tt.star);
            node.argument = this.parseMaybeAssign();
          }
          return this.finishNode(node, "YieldExpression");
        };

        var pp$4 = Parser.prototype;

        // This function is used to raise exceptions on parse errors. It
        // takes an offset integer (into the current `input`) to indicate
        // the location of the error, attaches the position to the end
        // of the error message, and then raises a `SyntaxError` with that
        // message.

        pp$4.raise = function (pos, message) {
          var loc = getLineInfo(this.input, pos);
          message += " (" + loc.line + ":" + loc.column + ")";
          var err = new SyntaxError(message);
          err.pos = pos;err.loc = loc;err.raisedAt = this.pos;
          throw err;
        };

        pp$4.raiseRecoverable = pp$4.raise;

        pp$4.curPosition = function () {
          if (this.options.locations) {
            return new Position(this.curLine, this.pos - this.lineStart);
          }
        };

        var Node = function Node(parser, pos, loc) {
          this.type = "";
          this.start = pos;
          this.end = 0;
          if (parser.options.locations) this.loc = new SourceLocation(parser, loc);
          if (parser.options.directSourceFile) this.sourceFile = parser.options.directSourceFile;
          if (parser.options.ranges) this.range = [pos, 0];
        };

        // Start an AST node, attaching a start offset.

        var pp$5 = Parser.prototype;

        pp$5.startNode = function () {
          return new Node(this, this.start, this.startLoc);
        };

        pp$5.startNodeAt = function (pos, loc) {
          return new Node(this, pos, loc);
        };

        // Finish an AST node, adding `type` and `end` properties.

        function finishNodeAt(node, type, pos, loc) {
          node.type = type;
          node.end = pos;
          if (this.options.locations) node.loc.end = loc;
          if (this.options.ranges) node.range[1] = pos;
          return node;
        }

        pp$5.finishNode = function (node, type) {
          return finishNodeAt.call(this, node, type, this.lastTokEnd, this.lastTokEndLoc);
        };

        // Finish node at given position

        pp$5.finishNodeAt = function (node, type, pos, loc) {
          return finishNodeAt.call(this, node, type, pos, loc);
        };

        var TokContext = function TokContext(token, isExpr, preserveSpace, override) {
          this.token = token;
          this.isExpr = !!isExpr;
          this.preserveSpace = !!preserveSpace;
          this.override = override;
        };

        var types = {
          b_stat: new TokContext("{", false),
          b_expr: new TokContext("{", true),
          b_tmpl: new TokContext("${", true),
          p_stat: new TokContext("(", false),
          p_expr: new TokContext("(", true),
          q_tmpl: new TokContext("`", true, true, function (p) {
            return p.readTmplToken();
          }),
          f_expr: new TokContext("function", true)
        };

        var pp$6 = Parser.prototype;

        pp$6.initialContext = function () {
          return [types.b_stat];
        };

        pp$6.braceIsBlock = function (prevType) {
          if (prevType === tt.colon) {
            var parent = this.curContext();
            if (parent === types.b_stat || parent === types.b_expr) return !parent.isExpr;
          }
          if (prevType === tt._return) return lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
          if (prevType === tt._else || prevType === tt.semi || prevType === tt.eof || prevType === tt.parenR) return true;
          if (prevType == tt.braceL) return this.curContext() === types.b_stat;
          return !this.exprAllowed;
        };

        pp$6.updateContext = function (prevType) {
          var update,
              type = this.type;
          if (type.keyword && prevType == tt.dot) this.exprAllowed = false;else if (update = type.updateContext) update.call(this, prevType);else this.exprAllowed = type.beforeExpr;
        };

        // Token-specific context update code

        tt.parenR.updateContext = tt.braceR.updateContext = function () {
          if (this.context.length == 1) {
            this.exprAllowed = true;
            return;
          }
          var out = this.context.pop();
          if (out === types.b_stat && this.curContext() === types.f_expr) {
            this.context.pop();
            this.exprAllowed = false;
          } else if (out === types.b_tmpl) {
            this.exprAllowed = true;
          } else {
            this.exprAllowed = !out.isExpr;
          }
        };

        tt.braceL.updateContext = function (prevType) {
          this.context.push(this.braceIsBlock(prevType) ? types.b_stat : types.b_expr);
          this.exprAllowed = true;
        };

        tt.dollarBraceL.updateContext = function () {
          this.context.push(types.b_tmpl);
          this.exprAllowed = true;
        };

        tt.parenL.updateContext = function (prevType) {
          var statementParens = prevType === tt._if || prevType === tt._for || prevType === tt._with || prevType === tt._while;
          this.context.push(statementParens ? types.p_stat : types.p_expr);
          this.exprAllowed = true;
        };

        tt.incDec.updateContext = function () {
          // tokExprAllowed stays unchanged
        };

        tt._function.updateContext = function (prevType) {
          if (prevType.beforeExpr && prevType !== tt.semi && prevType !== tt._else && !((prevType === tt.colon || prevType === tt.braceL) && this.curContext() === types.b_stat)) this.context.push(types.f_expr);
          this.exprAllowed = false;
        };

        tt.backQuote.updateContext = function () {
          if (this.curContext() === types.q_tmpl) this.context.pop();else this.context.push(types.q_tmpl);
          this.exprAllowed = false;
        };

        // Object type used to represent tokens. Note that normally, tokens
        // simply exist as properties on the parser object. This is only
        // used for the onToken callback and the external tokenizer.

        var Token = function Token(p) {
          this.type = p.type;
          this.value = p.value;
          this.start = p.start;
          this.end = p.end;
          if (p.options.locations) this.loc = new SourceLocation(p, p.startLoc, p.endLoc);
          if (p.options.ranges) this.range = [p.start, p.end];
        };

        // ## Tokenizer

        var pp$7 = Parser.prototype;

        // Are we running under Rhino?
        var isRhino = (typeof Packages === 'undefined' ? 'undefined' : _typeof(Packages)) == "object" && Object.prototype.toString.call(Packages) == "[object JavaPackage]";

        // Move to the next token

        pp$7.next = function () {
          if (this.options.onToken) this.options.onToken(new Token(this));

          this.lastTokEnd = this.end;
          this.lastTokStart = this.start;
          this.lastTokEndLoc = this.endLoc;
          this.lastTokStartLoc = this.startLoc;
          this.nextToken();
        };

        pp$7.getToken = function () {
          this.next();
          return new Token(this);
        };

        // If we're in an ES6 environment, make parsers iterable
        if (typeof Symbol !== "undefined") pp$7[Symbol.iterator] = function () {
          var self = this;
          return { next: function next() {
              var token = self.getToken();
              return {
                done: token.type === tt.eof,
                value: token
              };
            } };
        };

        // Toggle strict mode. Re-reads the next number or string to please
        // pedantic tests (`"use strict"; 010;` should fail).

        pp$7.setStrict = function (strict) {
          var this$1 = this;

          this.strict = strict;
          if (this.type !== tt.num && this.type !== tt.string) return;
          this.pos = this.start;
          if (this.options.locations) {
            while (this.pos < this.lineStart) {
              this$1.lineStart = this$1.input.lastIndexOf("\n", this$1.lineStart - 2) + 1;
              --this$1.curLine;
            }
          }
          this.nextToken();
        };

        pp$7.curContext = function () {
          return this.context[this.context.length - 1];
        };

        // Read a single token, updating the parser object's token-related
        // properties.

        pp$7.nextToken = function () {
          var curContext = this.curContext();
          if (!curContext || !curContext.preserveSpace) this.skipSpace();

          this.start = this.pos;
          if (this.options.locations) this.startLoc = this.curPosition();
          if (this.pos >= this.input.length) return this.finishToken(tt.eof);

          if (curContext.override) return curContext.override(this);else this.readToken(this.fullCharCodeAtPos());
        };

        pp$7.readToken = function (code) {
          // Identifier or keyword. '\uXXXX' sequences are allowed in
          // identifiers, so '\' also dispatches to that.
          if (isIdentifierStart(code, this.options.ecmaVersion >= 6) || code === 92 /* '\' */) return this.readWord();

          return this.getTokenFromCode(code);
        };

        pp$7.fullCharCodeAtPos = function () {
          var code = this.input.charCodeAt(this.pos);
          if (code <= 0xd7ff || code >= 0xe000) return code;
          var next = this.input.charCodeAt(this.pos + 1);
          return (code << 10) + next - 0x35fdc00;
        };

        pp$7.skipBlockComment = function () {
          var this$1 = this;

          var startLoc = this.options.onComment && this.curPosition();
          var start = this.pos,
              end = this.input.indexOf("*/", this.pos += 2);
          if (end === -1) this.raise(this.pos - 2, "Unterminated comment");
          this.pos = end + 2;
          if (this.options.locations) {
            lineBreakG.lastIndex = start;
            var match;
            while ((match = lineBreakG.exec(this.input)) && match.index < this.pos) {
              ++this$1.curLine;
              this$1.lineStart = match.index + match[0].length;
            }
          }
          if (this.options.onComment) this.options.onComment(true, this.input.slice(start + 2, end), start, this.pos, startLoc, this.curPosition());
        };

        pp$7.skipLineComment = function (startSkip) {
          var this$1 = this;

          var start = this.pos;
          var startLoc = this.options.onComment && this.curPosition();
          var ch = this.input.charCodeAt(this.pos += startSkip);
          while (this.pos < this.input.length && ch !== 10 && ch !== 13 && ch !== 8232 && ch !== 8233) {
            ++this$1.pos;
            ch = this$1.input.charCodeAt(this$1.pos);
          }
          if (this.options.onComment) this.options.onComment(false, this.input.slice(start + startSkip, this.pos), start, this.pos, startLoc, this.curPosition());
        };

        // Called at the start of the parse and after every token. Skips
        // whitespace and comments, and.

        pp$7.skipSpace = function () {
          var this$1 = this;

          loop: while (this.pos < this.input.length) {
            var ch = this$1.input.charCodeAt(this$1.pos);
            switch (ch) {
              case 32:case 160:
                // ' '
                ++this$1.pos;
                break;
              case 13:
                if (this$1.input.charCodeAt(this$1.pos + 1) === 10) {
                  ++this$1.pos;
                }
              case 10:case 8232:case 8233:
                ++this$1.pos;
                if (this$1.options.locations) {
                  ++this$1.curLine;
                  this$1.lineStart = this$1.pos;
                }
                break;
              case 47:
                // '/'
                switch (this$1.input.charCodeAt(this$1.pos + 1)) {
                  case 42:
                    // '*'
                    this$1.skipBlockComment();
                    break;
                  case 47:
                    this$1.skipLineComment(2);
                    break;
                  default:
                    break loop;
                }
                break;
              default:
                if (ch > 8 && ch < 14 || ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch))) {
                  ++this$1.pos;
                } else {
                  break loop;
                }
            }
          }
        };

        // Called at the end of every token. Sets `end`, `val`, and
        // maintains `context` and `exprAllowed`, and skips the space after
        // the token, so that the next one's `start` will point at the
        // right position.

        pp$7.finishToken = function (type, val) {
          this.end = this.pos;
          if (this.options.locations) this.endLoc = this.curPosition();
          var prevType = this.type;
          this.type = type;
          this.value = val;

          this.updateContext(prevType);
        };

        // ### Token reading

        // This is the function that is called to fetch the next token. It
        // is somewhat obscure, because it works in character codes rather
        // than characters, and because operator parsing has been inlined
        // into it.
        //
        // All in the name of speed.
        //
        pp$7.readToken_dot = function () {
          var next = this.input.charCodeAt(this.pos + 1);
          if (next >= 48 && next <= 57) return this.readNumber(true);
          var next2 = this.input.charCodeAt(this.pos + 2);
          if (this.options.ecmaVersion >= 6 && next === 46 && next2 === 46) {
            // 46 = dot '.'
            this.pos += 3;
            return this.finishToken(tt.ellipsis);
          } else {
            ++this.pos;
            return this.finishToken(tt.dot);
          }
        };

        pp$7.readToken_slash = function () {
          // '/'
          var next = this.input.charCodeAt(this.pos + 1);
          if (this.exprAllowed) {
            ++this.pos;return this.readRegexp();
          }
          if (next === 61) return this.finishOp(tt.assign, 2);
          return this.finishOp(tt.slash, 1);
        };

        pp$7.readToken_mult_modulo_exp = function (code) {
          // '%*'
          var next = this.input.charCodeAt(this.pos + 1);
          var size = 1;
          var tokentype = code === 42 ? tt.star : tt.modulo;

          // exponentiation operator ** and **=
          if (this.options.ecmaVersion >= 7 && next === 42) {
            ++size;
            tokentype = tt.starstar;
            next = this.input.charCodeAt(this.pos + 2);
          }

          if (next === 61) return this.finishOp(tt.assign, size + 1);
          return this.finishOp(tokentype, size);
        };

        pp$7.readToken_pipe_amp = function (code) {
          // '|&'
          var next = this.input.charCodeAt(this.pos + 1);
          if (next === code) return this.finishOp(code === 124 ? tt.logicalOR : tt.logicalAND, 2);
          if (next === 61) return this.finishOp(tt.assign, 2);
          return this.finishOp(code === 124 ? tt.bitwiseOR : tt.bitwiseAND, 1);
        };

        pp$7.readToken_caret = function () {
          // '^'
          var next = this.input.charCodeAt(this.pos + 1);
          if (next === 61) return this.finishOp(tt.assign, 2);
          return this.finishOp(tt.bitwiseXOR, 1);
        };

        pp$7.readToken_plus_min = function (code) {
          // '+-'
          var next = this.input.charCodeAt(this.pos + 1);
          if (next === code) {
            if (next == 45 && this.input.charCodeAt(this.pos + 2) == 62 && lineBreak.test(this.input.slice(this.lastTokEnd, this.pos))) {
              // A `-->` line comment
              this.skipLineComment(3);
              this.skipSpace();
              return this.nextToken();
            }
            return this.finishOp(tt.incDec, 2);
          }
          if (next === 61) return this.finishOp(tt.assign, 2);
          return this.finishOp(tt.plusMin, 1);
        };

        pp$7.readToken_lt_gt = function (code) {
          // '<>'
          var next = this.input.charCodeAt(this.pos + 1);
          var size = 1;
          if (next === code) {
            size = code === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2;
            if (this.input.charCodeAt(this.pos + size) === 61) return this.finishOp(tt.assign, size + 1);
            return this.finishOp(tt.bitShift, size);
          }
          if (next == 33 && code == 60 && this.input.charCodeAt(this.pos + 2) == 45 && this.input.charCodeAt(this.pos + 3) == 45) {
            if (this.inModule) this.unexpected();
            // `<!--`, an XML-style comment that should be interpreted as a line comment
            this.skipLineComment(4);
            this.skipSpace();
            return this.nextToken();
          }
          if (next === 61) size = 2;
          return this.finishOp(tt.relational, size);
        };

        pp$7.readToken_eq_excl = function (code) {
          // '=!'
          var next = this.input.charCodeAt(this.pos + 1);
          if (next === 61) return this.finishOp(tt.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2);
          if (code === 61 && next === 62 && this.options.ecmaVersion >= 6) {
            // '=>'
            this.pos += 2;
            return this.finishToken(tt.arrow);
          }
          return this.finishOp(code === 61 ? tt.eq : tt.prefix, 1);
        };

        pp$7.getTokenFromCode = function (code) {
          switch (code) {
            // The interpretation of a dot depends on whether it is followed
            // by a digit or another two dots.
            case 46:
              // '.'
              return this.readToken_dot();

            // Punctuation tokens.
            case 40:
              ++this.pos;return this.finishToken(tt.parenL);
            case 41:
              ++this.pos;return this.finishToken(tt.parenR);
            case 59:
              ++this.pos;return this.finishToken(tt.semi);
            case 44:
              ++this.pos;return this.finishToken(tt.comma);
            case 91:
              ++this.pos;return this.finishToken(tt.bracketL);
            case 93:
              ++this.pos;return this.finishToken(tt.bracketR);
            case 123:
              ++this.pos;return this.finishToken(tt.braceL);
            case 125:
              ++this.pos;return this.finishToken(tt.braceR);
            case 58:
              ++this.pos;return this.finishToken(tt.colon);
            case 63:
              ++this.pos;return this.finishToken(tt.question);

            case 96:
              // '`'
              if (this.options.ecmaVersion < 6) break;
              ++this.pos;
              return this.finishToken(tt.backQuote);

            case 48:
              // '0'
              var next = this.input.charCodeAt(this.pos + 1);
              if (next === 120 || next === 88) return this.readRadixNumber(16); // '0x', '0X' - hex number
              if (this.options.ecmaVersion >= 6) {
                if (next === 111 || next === 79) return this.readRadixNumber(8); // '0o', '0O' - octal number
                if (next === 98 || next === 66) return this.readRadixNumber(2); // '0b', '0B' - binary number
              }
            // Anything else beginning with a digit is an integer, octal
            // number, or float.
            case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
              // 1-9
              return this.readNumber(false);

            // Quotes produce strings.
            case 34:case 39:
              // '"', "'"
              return this.readString(code);

            // Operators are parsed inline in tiny state machines. '=' (61) is
            // often referred to. `finishOp` simply skips the amount of
            // characters it is given as second argument, and returns a token
            // of the type given by its first argument.

            case 47:
              // '/'
              return this.readToken_slash();

            case 37:case 42:
              // '%*'
              return this.readToken_mult_modulo_exp(code);

            case 124:case 38:
              // '|&'
              return this.readToken_pipe_amp(code);

            case 94:
              // '^'
              return this.readToken_caret();

            case 43:case 45:
              // '+-'
              return this.readToken_plus_min(code);

            case 60:case 62:
              // '<>'
              return this.readToken_lt_gt(code);

            case 61:case 33:
              // '=!'
              return this.readToken_eq_excl(code);

            case 126:
              // '~'
              return this.finishOp(tt.prefix, 1);
          }

          this.raise(this.pos, "Unexpected character '" + codePointToString(code) + "'");
        };

        pp$7.finishOp = function (type, size) {
          var str = this.input.slice(this.pos, this.pos + size);
          this.pos += size;
          return this.finishToken(type, str);
        };

        // Parse a regular expression. Some context-awareness is necessary,
        // since a '/' inside a '[]' set does not end the expression.

        function tryCreateRegexp(src, flags, throwErrorAt, parser) {
          try {
            return new RegExp(src, flags);
          } catch (e) {
            if (throwErrorAt !== undefined) {
              if (e instanceof SyntaxError) parser.raise(throwErrorAt, "Error parsing regular expression: " + e.message);
              throw e;
            }
          }
        }

        var regexpUnicodeSupport = !!tryCreateRegexp('\uFFFF', "u");

        pp$7.readRegexp = function () {
          var this$1 = this;

          var escaped,
              inClass,
              start = this.pos;
          for (;;) {
            if (this$1.pos >= this$1.input.length) this$1.raise(start, "Unterminated regular expression");
            var ch = this$1.input.charAt(this$1.pos);
            if (lineBreak.test(ch)) this$1.raise(start, "Unterminated regular expression");
            if (!escaped) {
              if (ch === "[") inClass = true;else if (ch === "]" && inClass) inClass = false;else if (ch === "/" && !inClass) break;
              escaped = ch === "\\";
            } else escaped = false;
            ++this$1.pos;
          }
          var content = this.input.slice(start, this.pos);
          ++this.pos;
          // Need to use `readWord1` because '\uXXXX' sequences are allowed
          // here (don't ask).
          var mods = this.readWord1();
          var tmp = content,
              tmpFlags = "";
          if (mods) {
            var validFlags = /^[gim]*$/;
            if (this.options.ecmaVersion >= 6) validFlags = /^[gimuy]*$/;
            if (!validFlags.test(mods)) this.raise(start, "Invalid regular expression flag");
            if (mods.indexOf("u") >= 0) {
              if (regexpUnicodeSupport) {
                tmpFlags = "u";
              } else {
                // Replace each astral symbol and every Unicode escape sequence that
                // possibly represents an astral symbol or a paired surrogate with a
                // single ASCII symbol to avoid throwing on regular expressions that
                // are only valid in combination with the `/u` flag.
                // Note: replacing with the ASCII symbol `x` might cause false
                // negatives in unlikely scenarios. For example, `[\u{61}-b]` is a
                // perfectly valid pattern that is equivalent to `[a-b]`, but it would
                // be replaced by `[x-b]` which throws an error.
                tmp = tmp.replace(/\\u\{([0-9a-fA-F]+)\}/g, function (_match, code, offset) {
                  code = Number("0x" + code);
                  if (code > 0x10FFFF) this$1.raise(start + offset + 3, "Code point out of bounds");
                  return "x";
                });
                tmp = tmp.replace(/\\u([a-fA-F0-9]{4})|[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "x");
                tmpFlags = tmpFlags.replace("u", "");
              }
            }
          }
          // Detect invalid regular expressions.
          var value = null;
          // Rhino's regular expression parser is flaky and throws uncatchable exceptions,
          // so don't do detection if we are running under Rhino
          if (!isRhino) {
            tryCreateRegexp(tmp, tmpFlags, start, this);
            // Get a regular expression object for this pattern-flag pair, or `null` in
            // case the current environment doesn't support the flags it uses.
            value = tryCreateRegexp(content, mods);
          }
          return this.finishToken(tt.regexp, { pattern: content, flags: mods, value: value });
        };

        // Read an integer in the given radix. Return null if zero digits
        // were read, the integer value otherwise. When `len` is given, this
        // will return `null` unless the integer has exactly `len` digits.

        pp$7.readInt = function (radix, len) {
          var this$1 = this;

          var start = this.pos,
              total = 0;
          for (var i = 0, e = len == null ? Infinity : len; i < e; ++i) {
            var code = this$1.input.charCodeAt(this$1.pos),
                val;
            if (code >= 97) val = code - 97 + 10; // a
            else if (code >= 65) val = code - 65 + 10; // A
              else if (code >= 48 && code <= 57) val = code - 48; // 0-9
                else val = Infinity;
            if (val >= radix) break;
            ++this$1.pos;
            total = total * radix + val;
          }
          if (this.pos === start || len != null && this.pos - start !== len) return null;

          return total;
        };

        pp$7.readRadixNumber = function (radix) {
          this.pos += 2; // 0x
          var val = this.readInt(radix);
          if (val == null) this.raise(this.start + 2, "Expected number in radix " + radix);
          if (isIdentifierStart(this.fullCharCodeAtPos())) this.raise(this.pos, "Identifier directly after number");
          return this.finishToken(tt.num, val);
        };

        // Read an integer, octal integer, or floating-point number.

        pp$7.readNumber = function (startsWithDot) {
          var start = this.pos,
              isFloat = false,
              octal = this.input.charCodeAt(this.pos) === 48;
          if (!startsWithDot && this.readInt(10) === null) this.raise(start, "Invalid number");
          var next = this.input.charCodeAt(this.pos);
          if (next === 46) {
            // '.'
            ++this.pos;
            this.readInt(10);
            isFloat = true;
            next = this.input.charCodeAt(this.pos);
          }
          if (next === 69 || next === 101) {
            // 'eE'
            next = this.input.charCodeAt(++this.pos);
            if (next === 43 || next === 45) ++this.pos; // '+-'
            if (this.readInt(10) === null) this.raise(start, "Invalid number");
            isFloat = true;
          }
          if (isIdentifierStart(this.fullCharCodeAtPos())) this.raise(this.pos, "Identifier directly after number");

          var str = this.input.slice(start, this.pos),
              val;
          if (isFloat) val = parseFloat(str);else if (!octal || str.length === 1) val = parseInt(str, 10);else if (/[89]/.test(str) || this.strict) this.raise(start, "Invalid number");else val = parseInt(str, 8);
          return this.finishToken(tt.num, val);
        };

        // Read a string value, interpreting backslash-escapes.

        pp$7.readCodePoint = function () {
          var ch = this.input.charCodeAt(this.pos),
              code;

          if (ch === 123) {
            if (this.options.ecmaVersion < 6) this.unexpected();
            var codePos = ++this.pos;
            code = this.readHexChar(this.input.indexOf('}', this.pos) - this.pos);
            ++this.pos;
            if (code > 0x10FFFF) this.raise(codePos, "Code point out of bounds");
          } else {
            code = this.readHexChar(4);
          }
          return code;
        };

        function codePointToString(code) {
          // UTF-16 Decoding
          if (code <= 0xFFFF) return String.fromCharCode(code);
          code -= 0x10000;
          return String.fromCharCode((code >> 10) + 0xD800, (code & 1023) + 0xDC00);
        }

        pp$7.readString = function (quote) {
          var this$1 = this;

          var out = "",
              chunkStart = ++this.pos;
          for (;;) {
            if (this$1.pos >= this$1.input.length) this$1.raise(this$1.start, "Unterminated string constant");
            var ch = this$1.input.charCodeAt(this$1.pos);
            if (ch === quote) break;
            if (ch === 92) {
              // '\'
              out += this$1.input.slice(chunkStart, this$1.pos);
              out += this$1.readEscapedChar(false);
              chunkStart = this$1.pos;
            } else {
              if (isNewLine(ch)) this$1.raise(this$1.start, "Unterminated string constant");
              ++this$1.pos;
            }
          }
          out += this.input.slice(chunkStart, this.pos++);
          return this.finishToken(tt.string, out);
        };

        // Reads template string tokens.

        pp$7.readTmplToken = function () {
          var this$1 = this;

          var out = "",
              chunkStart = this.pos;
          for (;;) {
            if (this$1.pos >= this$1.input.length) this$1.raise(this$1.start, "Unterminated template");
            var ch = this$1.input.charCodeAt(this$1.pos);
            if (ch === 96 || ch === 36 && this$1.input.charCodeAt(this$1.pos + 1) === 123) {
              // '`', '${'
              if (this$1.pos === this$1.start && this$1.type === tt.template) {
                if (ch === 36) {
                  this$1.pos += 2;
                  return this$1.finishToken(tt.dollarBraceL);
                } else {
                  ++this$1.pos;
                  return this$1.finishToken(tt.backQuote);
                }
              }
              out += this$1.input.slice(chunkStart, this$1.pos);
              return this$1.finishToken(tt.template, out);
            }
            if (ch === 92) {
              // '\'
              out += this$1.input.slice(chunkStart, this$1.pos);
              out += this$1.readEscapedChar(true);
              chunkStart = this$1.pos;
            } else if (isNewLine(ch)) {
              out += this$1.input.slice(chunkStart, this$1.pos);
              ++this$1.pos;
              switch (ch) {
                case 13:
                  if (this$1.input.charCodeAt(this$1.pos) === 10) ++this$1.pos;
                case 10:
                  out += "\n";
                  break;
                default:
                  out += String.fromCharCode(ch);
                  break;
              }
              if (this$1.options.locations) {
                ++this$1.curLine;
                this$1.lineStart = this$1.pos;
              }
              chunkStart = this$1.pos;
            } else {
              ++this$1.pos;
            }
          }
        };

        // Used to read escaped characters

        pp$7.readEscapedChar = function (inTemplate) {
          var ch = this.input.charCodeAt(++this.pos);
          ++this.pos;
          switch (ch) {
            case 110:
              return "\n"; // 'n' -> '\n'
            case 114:
              return "\r"; // 'r' -> '\r'
            case 120:
              return String.fromCharCode(this.readHexChar(2)); // 'x'
            case 117:
              return codePointToString(this.readCodePoint()); // 'u'
            case 116:
              return "\t"; // 't' -> '\t'
            case 98:
              return "\b"; // 'b' -> '\b'
            case 118:
              return '\x0B'; // 'v' -> '\u000b'
            case 102:
              return "\f"; // 'f' -> '\f'
            case 13:
              if (this.input.charCodeAt(this.pos) === 10) ++this.pos; // '\r\n'
            case 10:
              // ' \n'
              if (this.options.locations) {
                this.lineStart = this.pos;++this.curLine;
              }
              return "";
            default:
              if (ch >= 48 && ch <= 55) {
                var octalStr = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0];
                var octal = parseInt(octalStr, 8);
                if (octal > 255) {
                  octalStr = octalStr.slice(0, -1);
                  octal = parseInt(octalStr, 8);
                }
                if (octalStr !== "0" && (this.strict || inTemplate)) {
                  this.raise(this.pos - 2, "Octal literal in strict mode");
                }
                this.pos += octalStr.length - 1;
                return String.fromCharCode(octal);
              }
              return String.fromCharCode(ch);
          }
        };

        // Used to read character escape sequences ('\x', '\u', '\U').

        pp$7.readHexChar = function (len) {
          var codePos = this.pos;
          var n = this.readInt(16, len);
          if (n === null) this.raise(codePos, "Bad character escape sequence");
          return n;
        };

        // Read an identifier, and return it as a string. Sets `this.containsEsc`
        // to whether the word contained a '\u' escape.
        //
        // Incrementally adds only escaped chars, adding other chunks as-is
        // as a micro-optimization.

        pp$7.readWord1 = function () {
          var this$1 = this;

          this.containsEsc = false;
          var word = "",
              first = true,
              chunkStart = this.pos;
          var astral = this.options.ecmaVersion >= 6;
          while (this.pos < this.input.length) {
            var ch = this$1.fullCharCodeAtPos();
            if (isIdentifierChar(ch, astral)) {
              this$1.pos += ch <= 0xffff ? 1 : 2;
            } else if (ch === 92) {
              // "\"
              this$1.containsEsc = true;
              word += this$1.input.slice(chunkStart, this$1.pos);
              var escStart = this$1.pos;
              if (this$1.input.charCodeAt(++this$1.pos) != 117) // "u"
                this$1.raise(this$1.pos, 'Expecting Unicode escape sequence \\uXXXX');
              ++this$1.pos;
              var esc = this$1.readCodePoint();
              if (!(first ? isIdentifierStart : isIdentifierChar)(esc, astral)) this$1.raise(escStart, "Invalid Unicode escape");
              word += codePointToString(esc);
              chunkStart = this$1.pos;
            } else {
              break;
            }
            first = false;
          }
          return word + this.input.slice(chunkStart, this.pos);
        };

        // Read an identifier or keyword token. Will check for reserved
        // words when necessary.

        pp$7.readWord = function () {
          var word = this.readWord1();
          var type = tt.name;
          if ((this.options.ecmaVersion >= 6 || !this.containsEsc) && this.keywords.test(word)) type = keywordTypes[word];
          return this.finishToken(type, word);
        };

        var version = "3.3.0";

        // The main exported interface (under `self.acorn` when in the
        // browser) is a `parse` function that takes a code string and
        // returns an abstract syntax tree as specified by [Mozilla parser
        // API][api].
        //
        // [api]: https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API

        function parse(input, options) {
          return new Parser(options, input).parse();
        }

        // This function tries to parse a single expression at a given
        // offset in a string. Useful for parsing mixed-language formats
        // that embed JavaScript expressions.

        function parseExpressionAt(input, pos, options) {
          var p = new Parser(options, input, pos);
          p.nextToken();
          return p.parseExpression();
        }

        // Acorn is organized as a tokenizer and a recursive-descent parser.
        // The `tokenizer` export provides an interface to the tokenizer.

        function tokenizer(input, options) {
          return new Parser(options, input);
        }

        exports.version = version;
        exports.parse = parse;
        exports.parseExpressionAt = parseExpressionAt;
        exports.tokenizer = tokenizer;
        exports.Parser = Parser;
        exports.plugins = plugins;
        exports.defaultOptions = defaultOptions;
        exports.Position = Position;
        exports.SourceLocation = SourceLocation;
        exports.getLineInfo = getLineInfo;
        exports.Node = Node;
        exports.TokenType = TokenType;
        exports.tokTypes = tt;
        exports.TokContext = TokContext;
        exports.tokContexts = types;
        exports.isIdentifierChar = isIdentifierChar;
        exports.isIdentifierStart = isIdentifierStart;
        exports.Token = Token;
        exports.isNewLine = isNewLine;
        exports.lineBreak = lineBreak;
        exports.lineBreakG = lineBreakG;

        Object.defineProperty(exports, '__esModule', { value: true });
      });
    });

    var acorn$1 = acorn && (typeof acorn === 'undefined' ? 'undefined' : _typeof(acorn)) === 'object' && 'default' in acorn ? acorn['default'] : acorn;

    var xhtml = __commonjs(function (module) {
      module.exports = {
        quot: '"',
        amp: '&',
        apos: '\'',
        lt: '<',
        gt: '>',
        nbsp: '\xA0',
        iexcl: '\xA1',
        cent: '\xA2',
        pound: '\xA3',
        curren: '\xA4',
        yen: '\xA5',
        brvbar: '\xA6',
        sect: '\xA7',
        uml: '\xA8',
        copy: '\xA9',
        ordf: '\xAA',
        laquo: '\xAB',
        not: '\xAC',
        shy: '\xAD',
        reg: '\xAE',
        macr: '\xAF',
        deg: '\xB0',
        plusmn: '\xB1',
        sup2: '\xB2',
        sup3: '\xB3',
        acute: '\xB4',
        micro: '\xB5',
        para: '\xB6',
        middot: '\xB7',
        cedil: '\xB8',
        sup1: '\xB9',
        ordm: '\xBA',
        raquo: '\xBB',
        frac14: '\xBC',
        frac12: '\xBD',
        frac34: '\xBE',
        iquest: '\xBF',
        Agrave: '\xC0',
        Aacute: '\xC1',
        Acirc: '\xC2',
        Atilde: '\xC3',
        Auml: '\xC4',
        Aring: '\xC5',
        AElig: '\xC6',
        Ccedil: '\xC7',
        Egrave: '\xC8',
        Eacute: '\xC9',
        Ecirc: '\xCA',
        Euml: '\xCB',
        Igrave: '\xCC',
        Iacute: '\xCD',
        Icirc: '\xCE',
        Iuml: '\xCF',
        ETH: '\xD0',
        Ntilde: '\xD1',
        Ograve: '\xD2',
        Oacute: '\xD3',
        Ocirc: '\xD4',
        Otilde: '\xD5',
        Ouml: '\xD6',
        times: '\xD7',
        Oslash: '\xD8',
        Ugrave: '\xD9',
        Uacute: '\xDA',
        Ucirc: '\xDB',
        Uuml: '\xDC',
        Yacute: '\xDD',
        THORN: '\xDE',
        szlig: '\xDF',
        agrave: '\xE0',
        aacute: '\xE1',
        acirc: '\xE2',
        atilde: '\xE3',
        auml: '\xE4',
        aring: '\xE5',
        aelig: '\xE6',
        ccedil: '\xE7',
        egrave: '\xE8',
        eacute: '\xE9',
        ecirc: '\xEA',
        euml: '\xEB',
        igrave: '\xEC',
        iacute: '\xED',
        icirc: '\xEE',
        iuml: '\xEF',
        eth: '\xF0',
        ntilde: '\xF1',
        ograve: '\xF2',
        oacute: '\xF3',
        ocirc: '\xF4',
        otilde: '\xF5',
        ouml: '\xF6',
        divide: '\xF7',
        oslash: '\xF8',
        ugrave: '\xF9',
        uacute: '\xFA',
        ucirc: '\xFB',
        uuml: '\xFC',
        yacute: '\xFD',
        thorn: '\xFE',
        yuml: '\xFF',
        OElig: '\u0152',
        oelig: '\u0153',
        Scaron: '\u0160',
        scaron: '\u0161',
        Yuml: '\u0178',
        fnof: '\u0192',
        circ: '\u02C6',
        tilde: '\u02DC',
        Alpha: '\u0391',
        Beta: '\u0392',
        Gamma: '\u0393',
        Delta: '\u0394',
        Epsilon: '\u0395',
        Zeta: '\u0396',
        Eta: '\u0397',
        Theta: '\u0398',
        Iota: '\u0399',
        Kappa: '\u039A',
        Lambda: '\u039B',
        Mu: '\u039C',
        Nu: '\u039D',
        Xi: '\u039E',
        Omicron: '\u039F',
        Pi: '\u03A0',
        Rho: '\u03A1',
        Sigma: '\u03A3',
        Tau: '\u03A4',
        Upsilon: '\u03A5',
        Phi: '\u03A6',
        Chi: '\u03A7',
        Psi: '\u03A8',
        Omega: '\u03A9',
        alpha: '\u03B1',
        beta: '\u03B2',
        gamma: '\u03B3',
        delta: '\u03B4',
        epsilon: '\u03B5',
        zeta: '\u03B6',
        eta: '\u03B7',
        theta: '\u03B8',
        iota: '\u03B9',
        kappa: '\u03BA',
        lambda: '\u03BB',
        mu: '\u03BC',
        nu: '\u03BD',
        xi: '\u03BE',
        omicron: '\u03BF',
        pi: '\u03C0',
        rho: '\u03C1',
        sigmaf: '\u03C2',
        sigma: '\u03C3',
        tau: '\u03C4',
        upsilon: '\u03C5',
        phi: '\u03C6',
        chi: '\u03C7',
        psi: '\u03C8',
        omega: '\u03C9',
        thetasym: '\u03D1',
        upsih: '\u03D2',
        piv: '\u03D6',
        ensp: '\u2002',
        emsp: '\u2003',
        thinsp: '\u2009',
        zwnj: '\u200C',
        zwj: '\u200D',
        lrm: '\u200E',
        rlm: '\u200F',
        ndash: '\u2013',
        mdash: '\u2014',
        lsquo: '\u2018',
        rsquo: '\u2019',
        sbquo: '\u201A',
        ldquo: '\u201C',
        rdquo: '\u201D',
        bdquo: '\u201E',
        dagger: '\u2020',
        Dagger: '\u2021',
        bull: '\u2022',
        hellip: '\u2026',
        permil: '\u2030',
        prime: '\u2032',
        Prime: '\u2033',
        lsaquo: '\u2039',
        rsaquo: '\u203A',
        oline: '\u203E',
        frasl: '\u2044',
        euro: '\u20AC',
        image: '\u2111',
        weierp: '\u2118',
        real: '\u211C',
        trade: '\u2122',
        alefsym: '\u2135',
        larr: '\u2190',
        uarr: '\u2191',
        rarr: '\u2192',
        darr: '\u2193',
        harr: '\u2194',
        crarr: '\u21B5',
        lArr: '\u21D0',
        uArr: '\u21D1',
        rArr: '\u21D2',
        dArr: '\u21D3',
        hArr: '\u21D4',
        forall: '\u2200',
        part: '\u2202',
        exist: '\u2203',
        empty: '\u2205',
        nabla: '\u2207',
        isin: '\u2208',
        notin: '\u2209',
        ni: '\u220B',
        prod: '\u220F',
        sum: '\u2211',
        minus: '\u2212',
        lowast: '\u2217',
        radic: '\u221A',
        prop: '\u221D',
        infin: '\u221E',
        ang: '\u2220',
        and: '\u2227',
        or: '\u2228',
        cap: '\u2229',
        cup: '\u222A',
        'int': '\u222B',
        there4: '\u2234',
        sim: '\u223C',
        cong: '\u2245',
        asymp: '\u2248',
        ne: '\u2260',
        equiv: '\u2261',
        le: '\u2264',
        ge: '\u2265',
        sub: '\u2282',
        sup: '\u2283',
        nsub: '\u2284',
        sube: '\u2286',
        supe: '\u2287',
        oplus: '\u2295',
        otimes: '\u2297',
        perp: '\u22A5',
        sdot: '\u22C5',
        lceil: '\u2308',
        rceil: '\u2309',
        lfloor: '\u230A',
        rfloor: '\u230B',
        lang: '\u2329',
        rang: '\u232A',
        loz: '\u25CA',
        spades: '\u2660',
        clubs: '\u2663',
        hearts: '\u2665',
        diams: '\u2666'
      };
    });

    var require$$0 = xhtml && (typeof xhtml === 'undefined' ? 'undefined' : _typeof(xhtml)) === 'object' && 'default' in xhtml ? xhtml['default'] : xhtml;

    var inject = __commonjs(function (module) {
      'use strict';

      var XHTMLEntities = require$$0;

      var hexNumber = /^[\da-fA-F]+$/;
      var decimalNumber = /^\d+$/;

      module.exports = function (acorn) {
        var tt = acorn.tokTypes;
        var tc = acorn.tokContexts;

        tc.j_oTag = new acorn.TokContext('<tag', false);
        tc.j_cTag = new acorn.TokContext('</tag', false);
        tc.j_expr = new acorn.TokContext('<tag>...</tag>', true, true);

        tt.jsxName = new acorn.TokenType('jsxName');
        tt.jsxText = new acorn.TokenType('jsxText', { beforeExpr: true });
        tt.jsxTagStart = new acorn.TokenType('jsxTagStart');
        tt.jsxTagEnd = new acorn.TokenType('jsxTagEnd');

        tt.jsxTagStart.updateContext = function () {
          this.context.push(tc.j_expr); // treat as beginning of JSX expression
          this.context.push(tc.j_oTag); // start opening tag context
          this.exprAllowed = false;
        };
        tt.jsxTagEnd.updateContext = function (prevType) {
          var out = this.context.pop();
          if (out === tc.j_oTag && prevType === tt.slash || out === tc.j_cTag) {
            this.context.pop();
            this.exprAllowed = this.curContext() === tc.j_expr;
          } else {
            this.exprAllowed = true;
          }
        };

        var pp = acorn.Parser.prototype;

        // Reads inline JSX contents token.

        pp.jsx_readToken = function () {
          var out = '',
              chunkStart = this.pos;
          for (;;) {
            if (this.pos >= this.input.length) this.raise(this.start, 'Unterminated JSX contents');
            var ch = this.input.charCodeAt(this.pos);

            switch (ch) {
              case 60: // '<'
              case 123:
                // '{'
                if (this.pos === this.start) {
                  if (ch === 60 && this.exprAllowed) {
                    ++this.pos;
                    return this.finishToken(tt.jsxTagStart);
                  }
                  return this.getTokenFromCode(ch);
                }
                out += this.input.slice(chunkStart, this.pos);
                return this.finishToken(tt.jsxText, out);

              case 38:
                // '&'
                out += this.input.slice(chunkStart, this.pos);
                out += this.jsx_readEntity();
                chunkStart = this.pos;
                break;

              default:
                if (acorn.isNewLine(ch)) {
                  out += this.input.slice(chunkStart, this.pos);
                  out += this.jsx_readNewLine(true);
                  chunkStart = this.pos;
                } else {
                  ++this.pos;
                }
            }
          }
        };

        pp.jsx_readNewLine = function (normalizeCRLF) {
          var ch = this.input.charCodeAt(this.pos);
          var out;
          ++this.pos;
          if (ch === 13 && this.input.charCodeAt(this.pos) === 10) {
            ++this.pos;
            out = normalizeCRLF ? '\n' : '\r\n';
          } else {
            out = String.fromCharCode(ch);
          }
          if (this.options.locations) {
            ++this.curLine;
            this.lineStart = this.pos;
          }

          return out;
        };

        pp.jsx_readString = function (quote) {
          var out = '',
              chunkStart = ++this.pos;
          for (;;) {
            if (this.pos >= this.input.length) this.raise(this.start, 'Unterminated string constant');
            var ch = this.input.charCodeAt(this.pos);
            if (ch === quote) break;
            if (ch === 38) {
              // '&'
              out += this.input.slice(chunkStart, this.pos);
              out += this.jsx_readEntity();
              chunkStart = this.pos;
            } else if (acorn.isNewLine(ch)) {
              out += this.input.slice(chunkStart, this.pos);
              out += this.jsx_readNewLine(false);
              chunkStart = this.pos;
            } else {
              ++this.pos;
            }
          }
          out += this.input.slice(chunkStart, this.pos++);
          return this.finishToken(tt.string, out);
        };

        pp.jsx_readEntity = function () {
          var str = '',
              count = 0,
              entity;
          var ch = this.input[this.pos];
          if (ch !== '&') this.raise(this.pos, 'Entity must start with an ampersand');
          var startPos = ++this.pos;
          while (this.pos < this.input.length && count++ < 10) {
            ch = this.input[this.pos++];
            if (ch === ';') {
              if (str[0] === '#') {
                if (str[1] === 'x') {
                  str = str.substr(2);
                  if (hexNumber.test(str)) entity = String.fromCharCode(parseInt(str, 16));
                } else {
                  str = str.substr(1);
                  if (decimalNumber.test(str)) entity = String.fromCharCode(parseInt(str, 10));
                }
              } else {
                entity = XHTMLEntities[str];
              }
              break;
            }
            str += ch;
          }
          if (!entity) {
            this.pos = startPos;
            return '&';
          }
          return entity;
        };

        // Read a JSX identifier (valid tag or attribute name).
        //
        // Optimized version since JSX identifiers can't contain
        // escape characters and so can be read as single slice.
        // Also assumes that first character was already checked
        // by isIdentifierStart in readToken.

        pp.jsx_readWord = function () {
          var ch,
              start = this.pos;
          do {
            ch = this.input.charCodeAt(++this.pos);
          } while (acorn.isIdentifierChar(ch) || ch === 45); // '-'
          return this.finishToken(tt.jsxName, this.input.slice(start, this.pos));
        };

        // Transforms JSX element name to string.

        function getQualifiedJSXName(object) {
          if (object.type === 'JSXIdentifier') return object.name;

          if (object.type === 'JSXNamespacedName') return object.namespace.name + ':' + object.name.name;

          if (object.type === 'JSXMemberExpression') return getQualifiedJSXName(object.object) + '.' + getQualifiedJSXName(object.property);
        }

        // Parse next token as JSX identifier

        pp.jsx_parseIdentifier = function () {
          var node = this.startNode();
          if (this.type === tt.jsxName) node.name = this.value;else if (this.type.keyword) node.name = this.type.keyword;else this.unexpected();
          this.next();
          return this.finishNode(node, 'JSXIdentifier');
        };

        // Parse namespaced identifier.

        pp.jsx_parseNamespacedName = function () {
          var startPos = this.start,
              startLoc = this.startLoc;
          var name = this.jsx_parseIdentifier();
          if (!this.options.plugins.jsx.allowNamespaces || !this.eat(tt.colon)) return name;
          var node = this.startNodeAt(startPos, startLoc);
          node.namespace = name;
          node.name = this.jsx_parseIdentifier();
          return this.finishNode(node, 'JSXNamespacedName');
        };

        // Parses element name in any form - namespaced, member
        // or single identifier.

        pp.jsx_parseElementName = function () {
          var startPos = this.start,
              startLoc = this.startLoc;
          var node = this.jsx_parseNamespacedName();
          if (this.type === tt.dot && node.type === 'JSXNamespacedName' && !this.options.plugins.jsx.allowNamespacedObjects) {
            this.unexpected();
          }
          while (this.eat(tt.dot)) {
            var newNode = this.startNodeAt(startPos, startLoc);
            newNode.object = node;
            newNode.property = this.jsx_parseIdentifier();
            node = this.finishNode(newNode, 'JSXMemberExpression');
          }
          return node;
        };

        // Parses any type of JSX attribute value.

        pp.jsx_parseAttributeValue = function () {
          switch (this.type) {
            case tt.braceL:
              var node = this.jsx_parseExpressionContainer();
              if (node.expression.type === 'JSXEmptyExpression') this.raise(node.start, 'JSX attributes must only be assigned a non-empty expression');
              return node;

            case tt.jsxTagStart:
            case tt.string:
              return this.parseExprAtom();

            default:
              this.raise(this.start, 'JSX value should be either an expression or a quoted JSX text');
          }
        };

        // JSXEmptyExpression is unique type since it doesn't actually parse anything,
        // and so it should start at the end of last read token (left brace) and finish
        // at the beginning of the next one (right brace).

        pp.jsx_parseEmptyExpression = function () {
          var node = this.startNodeAt(this.lastTokEnd, this.lastTokEndLoc);
          return this.finishNodeAt(node, 'JSXEmptyExpression', this.start, this.startLoc);
        };

        // Parses JSX expression enclosed into curly brackets.


        pp.jsx_parseExpressionContainer = function () {
          var node = this.startNode();
          this.next();
          node.expression = this.type === tt.braceR ? this.jsx_parseEmptyExpression() : this.parseExpression();
          this.expect(tt.braceR);
          return this.finishNode(node, 'JSXExpressionContainer');
        };

        // Parses following JSX attribute name-value pair.

        pp.jsx_parseAttribute = function () {
          var node = this.startNode();
          if (this.eat(tt.braceL)) {
            this.expect(tt.ellipsis);
            node.argument = this.parseMaybeAssign();
            this.expect(tt.braceR);
            return this.finishNode(node, 'JSXSpreadAttribute');
          }
          node.name = this.jsx_parseNamespacedName();
          node.value = this.eat(tt.eq) ? this.jsx_parseAttributeValue() : null;
          return this.finishNode(node, 'JSXAttribute');
        };

        // Parses JSX opening tag starting after '<'.

        pp.jsx_parseOpeningElementAt = function (startPos, startLoc) {
          var node = this.startNodeAt(startPos, startLoc);
          node.attributes = [];
          node.name = this.jsx_parseElementName();
          while (this.type !== tt.slash && this.type !== tt.jsxTagEnd) {
            node.attributes.push(this.jsx_parseAttribute());
          }node.selfClosing = this.eat(tt.slash);
          this.expect(tt.jsxTagEnd);
          return this.finishNode(node, 'JSXOpeningElement');
        };

        // Parses JSX closing tag starting after '</'.

        pp.jsx_parseClosingElementAt = function (startPos, startLoc) {
          var node = this.startNodeAt(startPos, startLoc);
          node.name = this.jsx_parseElementName();
          this.expect(tt.jsxTagEnd);
          return this.finishNode(node, 'JSXClosingElement');
        };

        // Parses entire JSX element, including it's opening tag
        // (starting after '<'), attributes, contents and closing tag.

        pp.jsx_parseElementAt = function (startPos, startLoc) {
          var node = this.startNodeAt(startPos, startLoc);
          var children = [];
          var openingElement = this.jsx_parseOpeningElementAt(startPos, startLoc);
          var closingElement = null;

          if (!openingElement.selfClosing) {
            contents: for (;;) {
              switch (this.type) {
                case tt.jsxTagStart:
                  startPos = this.start;startLoc = this.startLoc;
                  this.next();
                  if (this.eat(tt.slash)) {
                    closingElement = this.jsx_parseClosingElementAt(startPos, startLoc);
                    break contents;
                  }
                  children.push(this.jsx_parseElementAt(startPos, startLoc));
                  break;

                case tt.jsxText:
                  children.push(this.parseExprAtom());
                  break;

                case tt.braceL:
                  children.push(this.jsx_parseExpressionContainer());
                  break;

                default:
                  this.unexpected();
              }
            }
            if (getQualifiedJSXName(closingElement.name) !== getQualifiedJSXName(openingElement.name)) {
              this.raise(closingElement.start, 'Expected corresponding JSX closing tag for <' + getQualifiedJSXName(openingElement.name) + '>');
            }
          }

          node.openingElement = openingElement;
          node.closingElement = closingElement;
          node.children = children;
          if (this.type === tt.relational && this.value === "<") {
            this.raise(this.start, "Adjacent JSX elements must be wrapped in an enclosing tag");
          }
          return this.finishNode(node, 'JSXElement');
        };

        // Parses entire JSX element from current position.

        pp.jsx_parseElement = function () {
          var startPos = this.start,
              startLoc = this.startLoc;
          this.next();
          return this.jsx_parseElementAt(startPos, startLoc);
        };

        acorn.plugins.jsx = function (instance, opts) {
          if (!opts) {
            return;
          }

          if ((typeof opts === 'undefined' ? 'undefined' : _typeof(opts)) !== 'object') {
            opts = {};
          }

          instance.options.plugins.jsx = {
            allowNamespaces: opts.allowNamespaces !== false,
            allowNamespacedObjects: !!opts.allowNamespacedObjects
          };

          instance.extend('parseExprAtom', function (inner) {
            return function (refShortHandDefaultPos) {
              if (this.type === tt.jsxText) return this.parseLiteral(this.value);else if (this.type === tt.jsxTagStart) return this.jsx_parseElement();else return inner.call(this, refShortHandDefaultPos);
            };
          });

          instance.extend('readToken', function (inner) {
            return function (code) {
              var context = this.curContext();

              if (context === tc.j_expr) return this.jsx_readToken();

              if (context === tc.j_oTag || context === tc.j_cTag) {
                if (acorn.isIdentifierStart(code)) return this.jsx_readWord();

                if (code == 62) {
                  ++this.pos;
                  return this.finishToken(tt.jsxTagEnd);
                }

                if ((code === 34 || code === 39) && context == tc.j_oTag) return this.jsx_readString(code);
              }

              if (code === 60 && this.exprAllowed) {
                ++this.pos;
                return this.finishToken(tt.jsxTagStart);
              }
              return inner.call(this, code);
            };
          });

          instance.extend('updateContext', function (inner) {
            return function (prevType) {
              if (this.type == tt.braceL) {
                var curContext = this.curContext();
                if (curContext == tc.j_oTag) this.context.push(tc.b_expr);else if (curContext == tc.j_expr) this.context.push(tc.b_tmpl);else inner.call(this, prevType);
                this.exprAllowed = true;
              } else if (this.type === tt.slash && prevType === tt.jsxTagStart) {
                this.context.length -= 2; // do not consider JSX expr -> JSX open tag -> ... anymore
                this.context.push(tc.j_cTag); // reconsider as closing tag context
                this.exprAllowed = false;
              } else {
                return inner.call(this, prevType);
              }
            };
          });
        };

        return acorn;
      };
    });

    var acornJsx = inject && (typeof inject === 'undefined' ? 'undefined' : _typeof(inject)) === 'object' && 'default' in inject ? inject['default'] : inject;

    var inject$1 = __commonjs(function (module) {
      'use strict';

      module.exports = function (acorn) {
        var tt = acorn.tokTypes;
        var pp = acorn.Parser.prototype;

        // this is the same parseObj that acorn has with...
        function parseObj(isPattern, refDestructuringErrors) {
          var this$1 = this;

          var node = this.startNode(),
              first = true,
              propHash = {};
          node.properties = [];
          this.next();
          while (!this$1.eat(tt.braceR)) {
            if (!first) {
              this$1.expect(tt.comma);
              if (this$1.afterTrailingComma(tt.braceR)) break;
            } else first = false;

            var prop = this$1.startNode(),
                isGenerator,
                startPos,
                startLoc;
            if (this$1.options.ecmaVersion >= 6) {
              // ...the spread logic borrowed from babylon :)
              if (this$1.type === tt.ellipsis) {
                prop = this$1.parseSpread();
                prop.type = isPattern ? "RestProperty" : "SpreadProperty";
                node.properties.push(prop);
                continue;
              }

              prop.method = false;
              prop.shorthand = false;
              if (isPattern || refDestructuringErrors) {
                startPos = this$1.start;
                startLoc = this$1.startLoc;
              }
              if (!isPattern) isGenerator = this$1.eat(tt.star);
            }
            this$1.parsePropertyName(prop);
            this$1.parsePropertyValue(prop, isPattern, isGenerator, startPos, startLoc, refDestructuringErrors);
            this$1.checkPropClash(prop, propHash);
            node.properties.push(this$1.finishNode(prop, "Property"));
          }
          return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression");
        }

        acorn.plugins.objectSpread = function objectSpreadPlugin(instance) {
          pp.parseObj = parseObj;
        };

        return acorn;
      };
    });

    var acornObjectSpread = inject$1 && (typeof inject$1 === 'undefined' ? 'undefined' : _typeof(inject$1)) === 'object' && 'default' in inject$1 ? inject$1['default'] : inject$1;

    var charToInteger = {};
    var integerToChar = {};

    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.split('').forEach(function (char, i) {
      charToInteger[char] = i;
      integerToChar[i] = char;
    });

    function encode(value) {
      var result, i;

      if (typeof value === 'number') {
        result = encodeInteger(value);
      } else {
        result = '';
        for (i = 0; i < value.length; i += 1) {
          result += encodeInteger(value[i]);
        }
      }

      return result;
    }

    function encodeInteger(num) {
      var result = '',
          clamped;

      if (num < 0) {
        num = -num << 1 | 1;
      } else {
        num <<= 1;
      }

      do {
        clamped = num & 31;
        num >>= 5;

        if (num > 0) {
          clamped |= 32;
        }

        result += integerToChar[clamped];
      } while (num > 0);

      return result;
    }

    function Chunk(start, end, content) {
      this.start = start;
      this.end = end;
      this.original = content;

      this.intro = '';
      this.outro = '';

      this.content = content;
      this.storeName = false;
      this.edited = false;

      // we make these non-enumerable, for sanity while debugging
      Object.defineProperties(this, {
        previous: { writable: true, value: null },
        next: { writable: true, value: null }
      });
    }

    Chunk.prototype = {
      append: function append(content) {
        this.outro += content;
      },

      clone: function clone() {
        var chunk = new Chunk(this.start, this.end, this.original);

        chunk.intro = this.intro;
        chunk.outro = this.outro;
        chunk.content = this.content;
        chunk.storeName = this.storeName;
        chunk.edited = this.edited;

        return chunk;
      },

      contains: function contains(index) {
        return this.start < index && index < this.end;
      },

      eachNext: function eachNext(fn) {
        var chunk = this;
        while (chunk) {
          fn(chunk);
          chunk = chunk.next;
        }
      },

      eachPrevious: function eachPrevious(fn) {
        var chunk = this;
        while (chunk) {
          fn(chunk);
          chunk = chunk.previous;
        }
      },

      edit: function edit(content, storeName) {
        this.content = content;
        this.storeName = storeName;

        this.edited = true;

        return this;
      },

      prepend: function prepend(content) {
        this.intro = content + this.intro;
      },

      split: function split(index) {
        var sliceIndex = index - this.start;

        var originalBefore = this.original.slice(0, sliceIndex);
        var originalAfter = this.original.slice(sliceIndex);

        this.original = originalBefore;

        var newChunk = new Chunk(index, this.end, originalAfter);
        newChunk.outro = this.outro;
        this.outro = '';

        this.end = index;

        if (this.edited) {
          // TODO is this block necessary?...
          newChunk.edit('', false);
          this.content = '';
        } else {
          this.content = originalBefore;
        }

        newChunk.next = this.next;
        if (newChunk.next) newChunk.next.previous = newChunk;
        newChunk.previous = this;
        this.next = newChunk;

        return newChunk;
      },

      toString: function toString() {
        return this.intro + this.content + this.outro;
      },

      trimEnd: function trimEnd(rx) {
        this.outro = this.outro.replace(rx, '');
        if (this.outro.length) return true;

        var trimmed = this.content.replace(rx, '');

        if (trimmed.length) {
          if (trimmed !== this.content) {
            this.split(this.start + trimmed.length).edit('', false);
          }

          return true;
        } else {
          this.edit('', false);

          this.intro = this.intro.replace(rx, '');
          if (this.intro.length) return true;
        }
      },

      trimStart: function trimStart(rx) {
        this.intro = this.intro.replace(rx, '');
        if (this.intro.length) return true;

        var trimmed = this.content.replace(rx, '');

        if (trimmed.length) {
          if (trimmed !== this.content) {
            this.split(this.end - trimmed.length);
            this.edit('', false);
          }

          return true;
        } else {
          this.edit('', false);

          this.outro = this.outro.replace(rx, '');
          if (this.outro.length) return true;
        }
      }
    };

    var _btoa;

    if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
      _btoa = window.btoa;
    } else if (typeof Buffer === 'function') {
      _btoa = function _btoa(str) {
        return new Buffer(str).toString('base64');
      };
    } else {
      _btoa = function _btoa() {
        throw new Error('Unsupported environment: `window.btoa` or `Buffer` should be supported.');
      };
    }

    var btoa = _btoa;

    function SourceMap(properties) {
      this.version = 3;

      this.file = properties.file;
      this.sources = properties.sources;
      this.sourcesContent = properties.sourcesContent;
      this.names = properties.names;
      this.mappings = properties.mappings;
    }

    SourceMap.prototype = {
      toString: function toString() {
        return JSON.stringify(this);
      },

      toUrl: function toUrl() {
        return 'data:application/json;charset=utf-8;base64,' + btoa(this.toString());
      }
    };

    function guessIndent(code) {
      var lines = code.split('\n');

      var tabbed = lines.filter(function (line) {
        return (/^\t+/.test(line)
        );
      });
      var spaced = lines.filter(function (line) {
        return (/^ {2,}/.test(line)
        );
      });

      if (tabbed.length === 0 && spaced.length === 0) {
        return null;
      }

      // More lines tabbed than spaced? Assume tabs, and
      // default to tabs in the case of a tie (or nothing
      // to go on)
      if (tabbed.length >= spaced.length) {
        return '\t';
      }

      // Otherwise, we need to guess the multiple
      var min = spaced.reduce(function (previous, current) {
        var numSpaces = /^ +/.exec(current)[0].length;
        return Math.min(numSpaces, previous);
      }, Infinity);

      return new Array(min + 1).join(' ');
    }

    function getLocator(source) {
      var originalLines = source.split('\n');

      var start = 0;
      var lineRanges = originalLines.map(function (line, i) {
        var end = start + line.length + 1;
        var range = { start: start, end: end, line: i };

        start = end;
        return range;
      });

      var i = 0;

      function rangeContains(range, index) {
        return range.start <= index && index < range.end;
      }

      function getLocation(range, index) {
        return { line: range.line, column: index - range.start };
      }

      return function locate(index) {
        var range = lineRanges[i];

        var d = index >= range.end ? 1 : -1;

        while (range) {
          if (rangeContains(range, index)) return getLocation(range, index);

          i += d;
          range = lineRanges[i];
        }
      };
    }

    function encodeMappings(original, intro, chunk, hires, sourcemapLocations, sourceIndex, offsets, names) {
      var rawLines = [];

      var generatedCodeLine = intro.split('\n').length - 1;
      var rawSegments = rawLines[generatedCodeLine] = [];

      var generatedCodeColumn = 0;

      var locate = getLocator(original);

      function addEdit(content, original, loc, nameIndex, i) {
        if (i || content.length) {
          rawSegments.push({
            generatedCodeLine: generatedCodeLine,
            generatedCodeColumn: generatedCodeColumn,
            sourceCodeLine: loc.line,
            sourceCodeColumn: loc.column,
            sourceCodeName: nameIndex,
            sourceIndex: sourceIndex
          });
        }

        var lines = content.split('\n');
        var lastLine = lines.pop();

        if (lines.length) {
          generatedCodeLine += lines.length;
          rawLines[generatedCodeLine] = rawSegments = [];
          generatedCodeColumn = lastLine.length;
        } else {
          generatedCodeColumn += lastLine.length;
        }

        lines = original.split('\n');
        lastLine = lines.pop();

        if (lines.length) {
          loc.line += lines.length;
          loc.column = lastLine.length;
        } else {
          loc.column += lastLine.length;
        }
      }

      function addUneditedChunk(chunk, loc) {
        var originalCharIndex = chunk.start;
        var first = true;

        while (originalCharIndex < chunk.end) {
          if (hires || first || sourcemapLocations[originalCharIndex]) {
            rawSegments.push({
              generatedCodeLine: generatedCodeLine,
              generatedCodeColumn: generatedCodeColumn,
              sourceCodeLine: loc.line,
              sourceCodeColumn: loc.column,
              sourceCodeName: -1,
              sourceIndex: sourceIndex
            });
          }

          if (original[originalCharIndex] === '\n') {
            loc.line += 1;
            loc.column = 0;
            generatedCodeLine += 1;
            rawLines[generatedCodeLine] = rawSegments = [];
            generatedCodeColumn = 0;
          } else {
            loc.column += 1;
            generatedCodeColumn += 1;
          }

          originalCharIndex += 1;
          first = false;
        }
      }

      while (chunk) {
        var loc = locate(chunk.start);

        if (chunk.intro.length) {
          addEdit(chunk.intro, '', loc, -1, !!chunk.previous);
        }

        if (chunk.edited) {
          addEdit(chunk.content, chunk.original, loc, chunk.storeName ? names.indexOf(chunk.original) : -1, !!chunk.previous);
        } else {
          addUneditedChunk(chunk, loc);
        }

        if (chunk.outro.length) {
          addEdit(chunk.outro, '', loc, -1, !!chunk.previous);
        }

        var nextChunk = chunk.next;
        chunk = nextChunk;
      }

      offsets.sourceIndex = offsets.sourceIndex || 0;
      offsets.sourceCodeLine = offsets.sourceCodeLine || 0;
      offsets.sourceCodeColumn = offsets.sourceCodeColumn || 0;
      offsets.sourceCodeName = offsets.sourceCodeName || 0;

      var encoded = rawLines.map(function (segments) {
        var generatedCodeColumn = 0;

        return segments.map(function (segment) {
          var arr = [segment.generatedCodeColumn - generatedCodeColumn, segment.sourceIndex - offsets.sourceIndex, segment.sourceCodeLine - offsets.sourceCodeLine, segment.sourceCodeColumn - offsets.sourceCodeColumn];

          generatedCodeColumn = segment.generatedCodeColumn;
          offsets.sourceIndex = segment.sourceIndex;
          offsets.sourceCodeLine = segment.sourceCodeLine;
          offsets.sourceCodeColumn = segment.sourceCodeColumn;

          if (~segment.sourceCodeName) {
            arr.push(segment.sourceCodeName - offsets.sourceCodeName);
            offsets.sourceCodeName = segment.sourceCodeName;
          }

          return encode(arr);
        }).join(',');
      }).join(';');

      return encoded;
    }

    function getRelativePath(from, to) {
      var fromParts = from.split(/[\/\\]/);
      var toParts = to.split(/[\/\\]/);

      fromParts.pop(); // get dirname

      while (fromParts[0] === toParts[0]) {
        fromParts.shift();
        toParts.shift();
      }

      if (fromParts.length) {
        var i = fromParts.length;
        while (i--) {
          fromParts[i] = '..';
        }
      }

      return fromParts.concat(toParts).join('/');
    }

    var toString = Object.prototype.toString;

    function isObject(thing) {
      return toString.call(thing) === '[object Object]';
    }

    function MagicString(string, options) {
      if (options === void 0) options = {};

      var chunk = new Chunk(0, string.length, string);

      Object.defineProperties(this, {
        original: { writable: true, value: string },
        outro: { writable: true, value: '' },
        intro: { writable: true, value: '' },
        firstChunk: { writable: true, value: chunk },
        lastChunk: { writable: true, value: chunk },
        lastSearchedChunk: { writable: true, value: chunk },
        byStart: { writable: true, value: {} },
        byEnd: { writable: true, value: {} },
        filename: { writable: true, value: options.filename },
        indentExclusionRanges: { writable: true, value: options.indentExclusionRanges },
        sourcemapLocations: { writable: true, value: {} },
        storedNames: { writable: true, value: {} },
        indentStr: { writable: true, value: guessIndent(string) }
      });

      this.byStart[0] = chunk;
      this.byEnd[string.length] = chunk;
    }

    MagicString.prototype = {
      addSourcemapLocation: function addSourcemapLocation(char) {
        this.sourcemapLocations[char] = true;
      },

      append: function append(content) {
        if (typeof content !== 'string') throw new TypeError('outro content must be a string');

        this.outro += content;
        return this;
      },

      clone: function clone() {
        var cloned = new MagicString(this.original, { filename: this.filename });

        var originalChunk = this.firstChunk;
        var clonedChunk = cloned.firstChunk = cloned.lastSearchedChunk = originalChunk.clone();

        while (originalChunk) {
          cloned.byStart[clonedChunk.start] = clonedChunk;
          cloned.byEnd[clonedChunk.end] = clonedChunk;

          var nextOriginalChunk = originalChunk.next;
          var nextClonedChunk = nextOriginalChunk && nextOriginalChunk.clone();

          if (nextClonedChunk) {
            clonedChunk.next = nextClonedChunk;
            nextClonedChunk.previous = clonedChunk;

            clonedChunk = nextClonedChunk;
          }

          originalChunk = nextOriginalChunk;
        }

        cloned.lastChunk = clonedChunk;

        if (this.indentExclusionRanges) {
          cloned.indentExclusionRanges = typeof this.indentExclusionRanges[0] === 'number' ? [this.indentExclusionRanges[0], this.indentExclusionRanges[1]] : this.indentExclusionRanges.map(function (range) {
            return [range.start, range.end];
          });
        }

        Object.keys(this.sourcemapLocations).forEach(function (loc) {
          cloned.sourcemapLocations[loc] = true;
        });

        return cloned;
      },

      generateMap: function generateMap(options) {
        options = options || {};

        var names = Object.keys(this.storedNames);

        var map = new SourceMap({
          file: options.file ? options.file.split(/[\/\\]/).pop() : null,
          sources: [options.source ? getRelativePath(options.file || '', options.source) : null],
          sourcesContent: options.includeContent ? [this.original] : [null],
          names: names,
          mappings: this.getMappings(options.hires, 0, {}, names)
        });
        return map;
      },

      getIndentString: function getIndentString() {
        return this.indentStr === null ? '\t' : this.indentStr;
      },

      getMappings: function getMappings(hires, sourceIndex, offsets, names) {
        return encodeMappings(this.original, this.intro, this.firstChunk, hires, this.sourcemapLocations, sourceIndex, offsets, names);
      },

      indent: function indent(indentStr, options) {
        var this$1 = this;

        var pattern = /^[^\r\n]/gm;

        if (isObject(indentStr)) {
          options = indentStr;
          indentStr = undefined;
        }

        indentStr = indentStr !== undefined ? indentStr : this.indentStr || '\t';

        if (indentStr === '') return this; // noop

        options = options || {};

        // Process exclusion ranges
        var isExcluded = {};

        if (options.exclude) {
          var exclusions = typeof options.exclude[0] === 'number' ? [options.exclude] : options.exclude;
          exclusions.forEach(function (exclusion) {
            for (var i = exclusion[0]; i < exclusion[1]; i += 1) {
              isExcluded[i] = true;
            }
          });
        }

        var shouldIndentNextCharacter = options.indentStart !== false;
        var replacer = function replacer(match) {
          if (shouldIndentNextCharacter) return "" + indentStr + match;
          shouldIndentNextCharacter = true;
          return match;
        };

        this.intro = this.intro.replace(pattern, replacer);

        var charIndex = 0;

        var chunk = this.firstChunk;

        while (chunk) {
          var end = chunk.end;

          if (chunk.edited) {
            if (!isExcluded[charIndex]) {
              chunk.content = chunk.content.replace(pattern, replacer);

              if (chunk.content.length) {
                shouldIndentNextCharacter = chunk.content[chunk.content.length - 1] === '\n';
              }
            }
          } else {
            charIndex = chunk.start;

            while (charIndex < end) {
              if (!isExcluded[charIndex]) {
                var char = this$1.original[charIndex];

                if (char === '\n') {
                  shouldIndentNextCharacter = true;
                } else if (char !== '\r' && shouldIndentNextCharacter) {
                  shouldIndentNextCharacter = false;

                  if (charIndex === chunk.start) {
                    chunk.prepend(indentStr);
                  } else {
                    var rhs = chunk.split(charIndex);
                    rhs.prepend(indentStr);

                    this$1.byStart[charIndex] = rhs;
                    this$1.byEnd[charIndex] = chunk;

                    chunk = rhs;
                  }
                }
              }

              charIndex += 1;
            }
          }

          charIndex = chunk.end;
          chunk = chunk.next;
        }

        this.outro = this.outro.replace(pattern, replacer);

        return this;
      },

      insert: function insert() {
        throw new Error('magicString.insert(...) is deprecated. Use insertRight(...) or insertLeft(...)');
      },

      insertLeft: function insertLeft(index, content) {
        if (typeof content !== 'string') throw new TypeError('inserted content must be a string');

        this._split(index);

        var chunk = this.byEnd[index];

        if (chunk) {
          chunk.append(content);
        } else {
          this.intro += content;
        }

        return this;
      },

      insertRight: function insertRight(index, content) {
        if (typeof content !== 'string') throw new TypeError('inserted content must be a string');

        this._split(index);

        var chunk = this.byStart[index];

        if (chunk) {
          chunk.prepend(content);
        } else {
          this.outro += content;
        }

        return this;
      },

      move: function move(start, end, index) {
        if (index >= start && index <= end) throw new Error('Cannot move a selection inside itself');

        this._split(start);
        this._split(end);
        this._split(index);

        var first = this.byStart[start];
        var last = this.byEnd[end];

        var oldLeft = first.previous;
        var oldRight = last.next;

        var newRight = this.byStart[index];
        if (!newRight && last === this.lastChunk) return this;
        var newLeft = newRight ? newRight.previous : this.lastChunk;

        if (oldLeft) oldLeft.next = oldRight;
        if (oldRight) oldRight.previous = oldLeft;

        if (newLeft) newLeft.next = first;
        if (newRight) newRight.previous = last;

        if (!first.previous) this.firstChunk = last.next;
        if (!last.next) {
          this.lastChunk = first.previous;
          this.lastChunk.next = null;
        }

        first.previous = newLeft;
        last.next = newRight;

        if (!newLeft) this.firstChunk = first;
        if (!newRight) this.lastChunk = last;

        return this;
      },

      overwrite: function overwrite(start, end, content, storeName) {
        var this$1 = this;

        if (typeof content !== 'string') throw new TypeError('replacement content must be a string');

        while (start < 0) {
          start += this$1.original.length;
        }while (end < 0) {
          end += this$1.original.length;
        }if (end > this.original.length) throw new Error('end is out of bounds');
        if (start === end) throw new Error('Cannot overwrite a zero-length range – use insertLeft or insertRight instead');

        this._split(start);
        this._split(end);

        if (storeName) {
          var original = this.original.slice(start, end);
          this.storedNames[original] = true;
        }

        var first = this.byStart[start];
        var last = this.byEnd[end];

        if (first) {
          first.edit(content, storeName);

          if (first !== last) {
            first.outro = '';

            var chunk = first.next;
            while (chunk !== last) {
              chunk.edit('', false);
              chunk.intro = chunk.outro = '';
              chunk = chunk.next;
            }

            chunk.edit('', false);
            chunk.intro = '';
          }
        } else {
          // must be inserting at the end
          var newChunk = new Chunk(start, end, '').edit(content, storeName);

          // TODO last chunk in the array may not be the last chunk, if it's moved...
          last.next = newChunk;
          newChunk.previous = last;
        }

        return this;
      },

      prepend: function prepend(content) {
        if (typeof content !== 'string') throw new TypeError('outro content must be a string');

        this.intro = content + this.intro;
        return this;
      },

      remove: function remove(start, end) {
        var this$1 = this;

        while (start < 0) {
          start += this$1.original.length;
        }while (end < 0) {
          end += this$1.original.length;
        }if (start === end) return this;

        if (start < 0 || end > this.original.length) throw new Error('Character is out of bounds');
        if (start > end) throw new Error('end must be greater than start');

        return this.overwrite(start, end, '', false);
      },

      slice: function slice(start, end) {
        var this$1 = this;
        if (start === void 0) start = 0;
        if (end === void 0) end = this.original.length;

        while (start < 0) {
          start += this$1.original.length;
        }while (end < 0) {
          end += this$1.original.length;
        }var result = '';

        // find start chunk
        var chunk = this.firstChunk;
        while (chunk && (chunk.start > start || chunk.end <= start)) {

          // found end chunk before start
          if (chunk.start < end && chunk.end >= end) {
            return result;
          }

          chunk = chunk.next;
        }

        if (chunk && chunk.edited && chunk.start !== start) throw new Error("Cannot use replaced character " + start + " as slice start anchor.");

        var startChunk = chunk;
        while (chunk) {
          if (chunk.intro && (startChunk !== chunk || chunk.start === start)) {
            result += chunk.intro;
          }

          var containsEnd = chunk.start < end && chunk.end >= end;
          if (containsEnd && chunk.edited && chunk.end !== end) throw new Error("Cannot use replaced character " + end + " as slice end anchor.");

          var sliceStart = startChunk === chunk ? start - chunk.start : 0;
          var sliceEnd = containsEnd ? chunk.content.length + end - chunk.end : chunk.content.length;

          result += chunk.content.slice(sliceStart, sliceEnd);

          if (chunk.outro && (!containsEnd || chunk.end === end)) {
            result += chunk.outro;
          }

          if (containsEnd) {
            break;
          }

          chunk = chunk.next;
        }

        return result;
      },

      // TODO deprecate this? not really very useful
      snip: function snip(start, end) {
        var clone = this.clone();
        clone.remove(0, start);
        clone.remove(end, clone.original.length);

        return clone;
      },

      _split: function _split(index) {
        var this$1 = this;

        if (this.byStart[index] || this.byEnd[index]) return;

        var chunk = this.lastSearchedChunk;
        var searchForward = index > chunk.end;

        while (true) {
          if (chunk.contains(index)) return this$1._splitChunk(chunk, index);

          chunk = searchForward ? this$1.byStart[chunk.end] : this$1.byEnd[chunk.start];
        }
      },

      _splitChunk: function _splitChunk(chunk, index) {
        if (chunk.edited && chunk.content.length) {
          // zero-length edited chunks are a special case (overlapping replacements)
          var loc = getLocator(this.original)(index);
          throw new Error("Cannot split a chunk that has already been edited (" + loc.line + ":" + loc.column + " – \"" + chunk.original + "\")");
        }

        var newChunk = chunk.split(index);

        this.byEnd[index] = chunk;
        this.byStart[index] = newChunk;
        this.byEnd[newChunk.end] = newChunk;

        if (chunk === this.lastChunk) this.lastChunk = newChunk;

        this.lastSearchedChunk = chunk;
        return true;
      },

      toString: function toString() {
        var str = this.intro;

        var chunk = this.firstChunk;
        while (chunk) {
          str += chunk.toString();
          chunk = chunk.next;
        }

        return str + this.outro;
      },

      trimLines: function trimLines() {
        return this.trim('[\\r\\n]');
      },

      trim: function trim(charType) {
        return this.trimStart(charType).trimEnd(charType);
      },

      trimEnd: function trimEnd(charType) {
        var this$1 = this;

        var rx = new RegExp((charType || '\\s') + '+$');

        this.outro = this.outro.replace(rx, '');
        if (this.outro.length) return this;

        var chunk = this.lastChunk;

        do {
          var end = chunk.end;
          var aborted = chunk.trimEnd(rx);

          // if chunk was trimmed, we have a new lastChunk
          if (chunk.end !== end) {
            this$1.lastChunk = chunk.next;

            this$1.byEnd[chunk.end] = chunk;
            this$1.byStart[chunk.next.start] = chunk.next;
          }

          if (aborted) return this$1;
          chunk = chunk.previous;
        } while (chunk);

        return this;
      },

      trimStart: function trimStart(charType) {
        var this$1 = this;

        var rx = new RegExp('^' + (charType || '\\s') + '+');

        this.intro = this.intro.replace(rx, '');
        if (this.intro.length) return this;

        var chunk = this.firstChunk;

        do {
          var end = chunk.end;
          var aborted = chunk.trimStart(rx);

          if (chunk.end !== end) {
            // special case...
            if (chunk === this$1.lastChunk) this$1.lastChunk = chunk.next;

            this$1.byEnd[chunk.end] = chunk;
            this$1.byStart[chunk.next.start] = chunk.next;
          }

          if (aborted) return this$1;
          chunk = chunk.next;
        } while (chunk);

        return this;
      }
    };

    var hasOwnProp = Object.prototype.hasOwnProperty;

    function Bundle(options) {
      if (options === void 0) options = {};

      this.intro = options.intro || '';
      this.separator = options.separator !== undefined ? options.separator : '\n';

      this.sources = [];

      this.uniqueSources = [];
      this.uniqueSourceIndexByFilename = {};
    }

    Bundle.prototype = {
      addSource: function addSource(source) {
        if (source instanceof MagicString) {
          return this.addSource({
            content: source,
            filename: source.filename,
            separator: this.separator
          });
        }

        if (!isObject(source) || !source.content) {
          throw new Error('bundle.addSource() takes an object with a `content` property, which should be an instance of MagicString, and an optional `filename`');
        }

        ['filename', 'indentExclusionRanges', 'separator'].forEach(function (option) {
          if (!hasOwnProp.call(source, option)) source[option] = source.content[option];
        });

        if (source.separator === undefined) {
          // TODO there's a bunch of this sort of thing, needs cleaning up
          source.separator = this.separator;
        }

        if (source.filename) {
          if (!hasOwnProp.call(this.uniqueSourceIndexByFilename, source.filename)) {
            this.uniqueSourceIndexByFilename[source.filename] = this.uniqueSources.length;
            this.uniqueSources.push({ filename: source.filename, content: source.content.original });
          } else {
            var uniqueSource = this.uniqueSources[this.uniqueSourceIndexByFilename[source.filename]];
            if (source.content.original !== uniqueSource.content) {
              throw new Error("Illegal source: same filename (" + source.filename + "), different contents");
            }
          }
        }

        this.sources.push(source);
        return this;
      },

      append: function append(str, options) {
        this.addSource({
          content: new MagicString(str),
          separator: options && options.separator || ''
        });

        return this;
      },

      clone: function clone() {
        var bundle = new Bundle({
          intro: this.intro,
          separator: this.separator
        });

        this.sources.forEach(function (source) {
          bundle.addSource({
            filename: source.filename,
            content: source.content.clone(),
            separator: source.separator
          });
        });

        return bundle;
      },

      generateMap: function generateMap(options) {
        var this$1 = this;

        var offsets = {};

        var names = [];
        this.sources.forEach(function (source) {
          Object.keys(source.content.storedNames).forEach(function (name) {
            if (!~names.indexOf(name)) names.push(name);
          });
        });

        var encoded = getSemis(this.intro) + this.sources.map(function (source, i) {
          var prefix = i > 0 ? getSemis(source.separator) || ',' : '';
          var mappings;

          // we don't bother encoding sources without a filename
          if (!source.filename) {
            mappings = getSemis(source.content.toString());
          } else {
            var sourceIndex = this$1.uniqueSourceIndexByFilename[source.filename];
            mappings = source.content.getMappings(options.hires, sourceIndex, offsets, names);
          }

          return prefix + mappings;
        }).join('');

        return new SourceMap({
          file: options.file ? options.file.split(/[\/\\]/).pop() : null,
          sources: this.uniqueSources.map(function (source) {
            return options.file ? getRelativePath(options.file, source.filename) : source.filename;
          }),
          sourcesContent: this.uniqueSources.map(function (source) {
            return options.includeContent ? source.content : null;
          }),
          names: names,
          mappings: encoded
        });
      },

      getIndentString: function getIndentString() {
        var indentStringCounts = {};

        this.sources.forEach(function (source) {
          var indentStr = source.content.indentStr;

          if (indentStr === null) return;

          if (!indentStringCounts[indentStr]) indentStringCounts[indentStr] = 0;
          indentStringCounts[indentStr] += 1;
        });

        return Object.keys(indentStringCounts).sort(function (a, b) {
          return indentStringCounts[a] - indentStringCounts[b];
        })[0] || '\t';
      },

      indent: function indent(indentStr) {
        var this$1 = this;

        if (!arguments.length) {
          indentStr = this.getIndentString();
        }

        if (indentStr === '') return this; // noop

        var trailingNewline = !this.intro || this.intro.slice(-1) === '\n';

        this.sources.forEach(function (source, i) {
          var separator = source.separator !== undefined ? source.separator : this$1.separator;
          var indentStart = trailingNewline || i > 0 && /\r?\n$/.test(separator);

          source.content.indent(indentStr, {
            exclude: source.indentExclusionRanges,
            indentStart: indentStart //: trailingNewline || /\r?\n$/.test( separator )  //true///\r?\n/.test( separator )
          });

          // TODO this is a very slow way to determine this
          trailingNewline = source.content.toString().slice(0, -1) === '\n';
        });

        if (this.intro) {
          this.intro = indentStr + this.intro.replace(/^[^\n]/gm, function (match, index) {
            return index > 0 ? indentStr + match : match;
          });
        }

        return this;
      },

      prepend: function prepend(str) {
        this.intro = str + this.intro;
        return this;
      },

      toString: function toString() {
        var this$1 = this;

        var body = this.sources.map(function (source, i) {
          var separator = source.separator !== undefined ? source.separator : this$1.separator;
          var str = (i > 0 ? separator : '') + source.content.toString();

          return str;
        }).join('');

        return this.intro + body;
      },

      trimLines: function trimLines() {
        return this.trim('[\\r\\n]');
      },

      trim: function trim(charType) {
        return this.trimStart(charType).trimEnd(charType);
      },

      trimStart: function trimStart(charType) {
        var this$1 = this;

        var rx = new RegExp('^' + (charType || '\\s') + '+');
        this.intro = this.intro.replace(rx, '');

        if (!this.intro) {
          var source;
          var i = 0;

          do {
            source = this$1.sources[i];

            if (!source) {
              break;
            }

            source.content.trimStart(charType);
            i += 1;
          } while (source.content.toString() === ''); // TODO faster way to determine non-empty source?
        }

        return this;
      },

      trimEnd: function trimEnd(charType) {
        var this$1 = this;

        var rx = new RegExp((charType || '\\s') + '+$');

        var source;
        var i = this.sources.length - 1;

        do {
          source = this$1.sources[i];

          if (!source) {
            this$1.intro = this$1.intro.replace(rx, '');
            break;
          }

          source.content.trimEnd(charType);
          i -= 1;
        } while (source.content.toString() === ''); // TODO faster way to determine non-empty source?

        return this;
      }
    };

    function getSemis(str) {
      return new Array(str.split('\n').length).join(';');
    }

    MagicString.Bundle = Bundle;

    var keys = {
      Program: ['body'],
      Literal: []
    };

    // used for debugging, without the noise created by
    // circular references
    function toJSON(node) {
      var obj = {};

      Object.keys(node).forEach(function (key) {
        if (key === 'parent' || key === 'program' || key === 'keys' || key === '__wrapped') return;

        if (Array.isArray(node[key])) {
          obj[key] = node[key].map(toJSON);
        } else if (node[key] && node[key].toJSON) {
          obj[key] = node[key].toJSON();
        } else {
          obj[key] = node[key];
        }
      });

      return obj;
    }

    var Node = function Node(raw, parent) {
      raw.parent = parent;
      raw.program = parent.program || parent;
      raw.depth = parent.depth + 1;
      raw.keys = keys[raw.type];
      raw.indentation = undefined;

      for (var i = 0, list = keys[raw.type]; i < list.length; i += 1) {
        var key = list[i];

        wrap(raw[key], raw);
      }

      raw.program.magicString.addSourcemapLocation(raw.start);
      raw.program.magicString.addSourcemapLocation(raw.end);
    };

    Node.prototype.ancestor = function ancestor(level) {
      var node = this;
      while (level--) {
        node = node.parent;
        if (!node) return null;
      }

      return node;
    };

    Node.prototype.contains = function contains(node) {
      var this$1 = this;

      while (node) {
        if (node === this$1) return true;
        node = node.parent;
      }

      return false;
    };

    Node.prototype.findLexicalBoundary = function findLexicalBoundary() {
      return this.parent.findLexicalBoundary();
    };

    Node.prototype.findNearest = function findNearest(type) {
      if (typeof type === 'string') type = new RegExp("^" + type + "$");
      if (type.test(this.type)) return this;
      return this.parent.findNearest(type);
    };

    Node.prototype.unparenthesizedParent = function unparenthesizedParent() {
      var node = this.parent;
      while (node && node.type === 'ParenthesizedExpression') {
        node = node.parent;
      }
      return node;
    };

    Node.prototype.unparenthesize = function unparenthesize() {
      var node = this;
      while (node.type === 'ParenthesizedExpression') {
        node = node.expression;
      }
      return node;
    };

    Node.prototype.findScope = function findScope(functionScope) {
      return this.parent.findScope(functionScope);
    };

    Node.prototype.getIndentation = function getIndentation() {
      return this.parent.getIndentation();
    };

    Node.prototype.initialise = function initialise(transforms) {
      for (var i = 0, list = this.keys; i < list.length; i += 1) {
        var key = list[i];

        var value = this[key];

        if (Array.isArray(value)) {
          value.forEach(function (node) {
            return node && node.initialise(transforms);
          });
        } else if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
          value.initialise(transforms);
        }
      }
    };

    Node.prototype.toJSON = function toJSON$1() {
      return toJSON(this);
    };

    Node.prototype.toString = function toString() {
      return this.program.magicString.original.slice(this.start, this.end);
    };

    Node.prototype.transpile = function transpile(code, transforms) {
      for (var i = 0, list = this.keys; i < list.length; i += 1) {
        var key = list[i];

        var value = this[key];

        if (Array.isArray(value)) {
          value.forEach(function (node) {
            return node && node.transpile(code, transforms);
          });
        } else if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
          value.transpile(code, transforms);
        }
      }
    };

    function isArguments(node) {
      return node.type === 'Identifier' && node.name === 'arguments';
    }

    function spread(code, elements, start, argumentsArrayAlias, isNew) {
      var i = elements.length;
      var firstSpreadIndex = -1;

      while (i--) {
        var element$1 = elements[i];
        if (element$1 && element$1.type === 'SpreadElement') {
          if (isArguments(element$1.argument)) {
            code.overwrite(element$1.argument.start, element$1.argument.end, argumentsArrayAlias);
          }

          firstSpreadIndex = i;
        }
      }

      if (firstSpreadIndex === -1) return false; // false indicates no spread elements

      if (isNew) {
        for (i = 0; i < elements.length; i += 1) {
          var element$2 = elements[i];
          if (element$2.type === 'SpreadElement') {
            code.remove(element$2.start, element$2.argument.start);
          } else {
            code.insertRight(element$2.start, '[');
            code.insertRight(element$2.end, ']');
          }
        }

        return true; // true indicates some spread elements
      }

      var element = elements[firstSpreadIndex];
      var previousElement = elements[firstSpreadIndex - 1];

      if (!previousElement) {
        code.remove(start, element.start);
        code.overwrite(element.end, elements[1].start, '.concat( ');
      } else {
        code.overwrite(previousElement.end, element.start, ' ].concat( ');
      }

      for (i = firstSpreadIndex; i < elements.length; i += 1) {
        element = elements[i];

        if (element) {
          if (element.type === 'SpreadElement') {
            code.remove(element.start, element.argument.start);
          } else {
            code.insertLeft(element.start, '[');
            code.insertLeft(element.end, ']');
          }
        }
      }

      return true; // true indicates some spread elements
    }

    var ArrayExpression = function (Node) {
      function ArrayExpression() {
        Node.apply(this, arguments);
      }

      if (Node) ArrayExpression.__proto__ = Node;
      ArrayExpression.prototype = Object.create(Node && Node.prototype);
      ArrayExpression.prototype.constructor = ArrayExpression;

      ArrayExpression.prototype.initialise = function initialise(transforms) {
        var this$1 = this;

        if (transforms.spreadRest && this.elements.length) {
          var lexicalBoundary = this.findLexicalBoundary();

          var i = this.elements.length;
          while (i--) {
            var element = this$1.elements[i];
            if (element && element.type === 'SpreadElement' && isArguments(element.argument)) {
              this$1.argumentsArrayAlias = lexicalBoundary.getArgumentsArrayAlias();
            }
          }
        }

        Node.prototype.initialise.call(this, transforms);
      };

      ArrayExpression.prototype.transpile = function transpile(code, transforms) {
        if (transforms.spreadRest) {
          // erase trailing comma after last array element if not an array hole
          if (this.elements.length) {
            var lastElement = this.elements[this.elements.length - 1];
            if (lastElement && /\s*,/.test(code.original.slice(lastElement.end, this.end))) {
              code.overwrite(lastElement.end, this.end - 1, ' ');
            }
          }

          if (this.elements.length === 1) {
            var element = this.elements[0];

            if (element && element.type === 'SpreadElement') {
              // special case – [ ...arguments ]
              if (isArguments(element.argument)) {
                code.overwrite(this.start, this.end, "[].concat( " + this.argumentsArrayAlias + " )"); // TODO if this is the only use of argsArray, don't bother concating
              } else {
                code.overwrite(this.start, element.argument.start, '[].concat( ');
                code.overwrite(element.end, this.end, ' )');
              }
            }
          } else {
            var hasSpreadElements = spread(code, this.elements, this.start, this.argumentsArrayAlias);

            if (hasSpreadElements) {
              code.overwrite(this.end - 1, this.end, ')');
            }
          }
        }

        Node.prototype.transpile.call(this, code, transforms);
      };

      return ArrayExpression;
    }(Node);

    var ArrowFunctionExpression = function (Node) {
      function ArrowFunctionExpression() {
        Node.apply(this, arguments);
      }

      if (Node) ArrowFunctionExpression.__proto__ = Node;
      ArrowFunctionExpression.prototype = Object.create(Node && Node.prototype);
      ArrowFunctionExpression.prototype.constructor = ArrowFunctionExpression;

      ArrowFunctionExpression.prototype.initialise = function initialise(transforms) {
        this.body.createScope();
        Node.prototype.initialise.call(this, transforms);
      };

      ArrowFunctionExpression.prototype.transpile = function transpile(code, transforms) {
        if (transforms.arrow) {
          // remove arrow
          var charIndex = this.body.start;
          while (code.original[charIndex] !== '=') {
            charIndex -= 1;
          }
          code.remove(charIndex, this.body.start);

          // wrap naked parameter
          if (this.params.length === 1 && this.start === this.params[0].start) {
            code.insertRight(this.params[0].start, '(');
            code.insertLeft(this.params[0].end, ')');
          }

          // add function
          if (this.parent && this.parent.type === 'ExpressionStatement') {
            // standalone expression statement
            code.insertRight(this.start, '(function');
            code.insertRight(this.end, ')');
          } else {
            code.insertRight(this.start, 'function ');
          }
        }

        Node.prototype.transpile.call(this, code, transforms);
      };

      return ArrowFunctionExpression;
    }(Node);

    function locate(source, index) {
      var lines = source.split('\n');
      var len = lines.length;

      var lineStart = 0;
      var i;

      for (i = 0; i < len; i += 1) {
        var line = lines[i];
        var lineEnd = lineStart + line.length + 1; // +1 for newline

        if (lineEnd > index) {
          return { line: i + 1, column: index - lineStart, char: i };
        }

        lineStart = lineEnd;
      }

      throw new Error('Could not determine location of character');
    }

    function pad(num, len) {
      var result = String(num);
      return result + repeat(' ', len - result.length);
    }

    function repeat(str, times) {
      var result = '';
      while (times--) {
        result += str;
      }return result;
    }

    function getSnippet(source, loc, length) {
      if (length === void 0) length = 1;

      var first = Math.max(loc.line - 5, 0);
      var last = loc.line;

      var numDigits = String(last).length;

      var lines = source.split('\n').slice(first, last);

      var lastLine = lines[lines.length - 1];
      var offset = lastLine.slice(0, loc.column).replace(/\t/g, '  ').length;

      var snippet = lines.map(function (line, i) {
        return pad(i + first + 1, numDigits) + " : " + line.replace(/\t/g, '  ');
      }).join('\n');

      snippet += '\n' + repeat(' ', numDigits + 3 + offset) + repeat('^', length);

      return snippet;
    }

    var CompileError = function (Error) {
      function CompileError(node, message) {
        Error.call(this);

        var source = node.program.magicString.original;
        var loc = locate(source, node.start);

        this.name = 'CompileError';
        this.message = message + " (" + loc.line + ":" + loc.column + ")";

        this.stack = new Error().stack.replace(new RegExp(".+new " + this.name + ".+\\n", 'm'), '');

        this.loc = loc;
        this.snippet = getSnippet(source, loc, node.end - node.start);
      }

      if (Error) CompileError.__proto__ = Error;
      CompileError.prototype = Object.create(Error && Error.prototype);
      CompileError.prototype.constructor = CompileError;

      CompileError.prototype.toString = function toString() {
        return this.name + ": " + this.message + "\n" + this.snippet;
      };

      return CompileError;
    }(Error);

    var AssignmentExpression = function (Node) {
      function AssignmentExpression() {
        Node.apply(this, arguments);
      }

      if (Node) AssignmentExpression.__proto__ = Node;
      AssignmentExpression.prototype = Object.create(Node && Node.prototype);
      AssignmentExpression.prototype.constructor = AssignmentExpression;

      AssignmentExpression.prototype.initialise = function initialise(transforms) {
        if (this.left.type === 'Identifier') {
          var declaration = this.findScope(false).findDeclaration(this.left.name);
          if (declaration && declaration.kind === 'const') {
            throw new CompileError(this.left, this.left.name + " is read-only");
          }

          // special case – https://gitlab.com/Rich-Harris/buble/issues/11
          var statement = declaration && declaration.node.ancestor(3);
          if (statement && statement.type === 'ForStatement' && statement.body.contains(this)) {
            statement.reassigned[this.left.name] = true;
          }
        }

        Node.prototype.initialise.call(this, transforms);
      };

      AssignmentExpression.prototype.transpile = function transpile(code, transforms) {
        if (this.operator === '**=' && transforms.exponentiation) {
          this.transpileExponentiation(code, transforms);
        } else if (/Pattern/.test(this.left.type) && transforms.destructuring) {
          this.transpileDestructuring(code, transforms);
        }

        Node.prototype.transpile.call(this, code, transforms);
      };

      AssignmentExpression.prototype.transpileDestructuring = function transpileDestructuring(code) {
        var scope = this.findScope(true);
        var assign = scope.createIdentifier('assign');
        var temporaries = [assign];

        var start = this.start;

        // We need to pick out some elements from the original code,
        // interleaved with generated code. These helpers are used to
        // easily do that while keeping the order of the output
        // predictable.
        var text = '';
        function use(node) {
          code.insertRight(node.start, text);
          code.move(node.start, node.end, start);
          text = '';
        }
        function write(string) {
          text += string;
        }

        write("(" + assign + " = ");
        use(this.right);

        // Walk `pattern`, generating code that assigns the value in
        // `ref` to it. When `mayDuplicate` is false, the function
        // must take care to only output `ref` once.
        function destructure(pattern, ref, mayDuplicate) {
          if (pattern.type === 'Identifier' || pattern.type === 'MemberExpression') {
            write(', ');
            use(pattern);
            write(" = " + ref);
          } else if (pattern.type === 'AssignmentPattern') {
            if (pattern.left.type === 'Identifier') {
              var target = pattern.left.name;
              var source = ref;
              if (!mayDuplicate) {
                write(", " + target + " = " + ref);
                source = target;
              }
              write(", " + target + " = " + source + " === void 0 ? ");
              use(pattern.right);
              write(" : " + source);
            } else {
              var target$1 = scope.createIdentifier('temp');
              var source$1 = ref;
              temporaries.push(target$1);
              if (!mayDuplicate) {
                write(", " + target$1 + " = " + ref);
                source$1 = target$1;
              }
              write(", " + target$1 + " = " + source$1 + " === void 0 ? ");
              use(pattern.right);
              write(" : " + source$1);
              destructure(pattern.left, target$1, true);
            }
          } else if (pattern.type === 'ArrayPattern') {
            var elements = pattern.elements;
            if (elements.length === 1) {
              destructure(elements[0], ref + "[0]", false);
            } else {
              if (!mayDuplicate) {
                var temp = scope.createIdentifier('array');
                temporaries.push(temp);
                write(", " + temp + " = " + ref);
                ref = temp;
              }
              elements.forEach(function (element, i) {
                if (element) {
                  if (element.type === 'RestElement') {
                    destructure(element.argument, ref + ".slice(" + i + ")", false);
                  } else {
                    destructure(element, ref + "[" + i + "]", false);
                  }
                }
              });
            }
          } else if (pattern.type === 'ObjectPattern') {
            var props = pattern.properties;
            if (props.length == 1) {
              var prop = props[0];
              var value = prop.computed || prop.key.type !== 'Identifier' ? ref + "[" + code.slice(prop.key.start, prop.key.end) + "]" : ref + "." + prop.key.name;
              destructure(prop.value, value, false);
            } else {
              if (!mayDuplicate) {
                var temp$1 = scope.createIdentifier('obj');
                temporaries.push(temp$1);
                write(", " + temp$1 + " = " + ref);
                ref = temp$1;
              }
              props.forEach(function (prop) {
                var value = prop.computed || prop.key.type !== 'Identifier' ? ref + "[" + code.slice(prop.key.start, prop.key.end) + "]" : ref + "." + prop.key.name;
                destructure(prop.value, value, false);
              });
            }
          } else {
            throw new Error("Unexpected node type in destructuring assignment (" + pattern.type + ")");
          }
        }
        destructure(this.left, assign, true);

        if (this.unparenthesizedParent().type === 'ExpressionStatement') {
          // no rvalue needed for expression statement
          code.insertRight(start, text + ")");
        } else {
          // destructuring is part of an expression - need an rvalue
          code.insertRight(start, text + ", " + assign + ")");
        }

        code.remove(start, this.right.start);

        var statement = this.findNearest(/(?:Statement|Declaration)$/);
        code.insertLeft(statement.start, "var " + temporaries.join(', ') + ";\n" + statement.getIndentation());
      };

      AssignmentExpression.prototype.transpileExponentiation = function transpileExponentiation(code) {
        var scope = this.findScope(false);
        var getAlias = function getAlias(name) {
          var declaration = scope.findDeclaration(name);
          return declaration ? declaration.name : name;
        };

        // first, the easy part – `**=` -> `=`
        var charIndex = this.left.end;
        while (code.original[charIndex] !== '*') {
          charIndex += 1;
        }code.remove(charIndex, charIndex + 2);

        // how we do the next part depends on a number of factors – whether
        // this is a top-level statement, and whether we're updating a
        // simple or complex reference
        var base;

        var left = this.left.unparenthesize();

        if (left.type === 'Identifier') {
          base = getAlias(left.name);
        } else if (left.type === 'MemberExpression') {
          var object;
          var needsObjectVar = false;
          var property;
          var needsPropertyVar = false;

          var statement = this.findNearest(/(?:Statement|Declaration)$/);
          var i0 = statement.getIndentation();

          if (left.property.type === 'Identifier') {
            property = left.computed ? getAlias(left.property.name) : left.property.name;
          } else {
            property = scope.createIdentifier('property');
            needsPropertyVar = true;
          }

          if (left.object.type === 'Identifier') {
            object = getAlias(left.object.name);
          } else {
            object = scope.createIdentifier('object');
            needsObjectVar = true;
          }

          if (left.start === statement.start) {
            if (needsObjectVar && needsPropertyVar) {
              code.insertRight(statement.start, "var " + object + " = ");
              code.overwrite(left.object.end, left.property.start, ";\n" + i0 + "var " + property + " = ");
              code.overwrite(left.property.end, left.end, ";\n" + i0 + object + "[" + property + "]");
            } else if (needsObjectVar) {
              code.insertRight(statement.start, "var " + object + " = ");
              code.insertLeft(left.object.end, ";\n" + i0);
              code.insertLeft(left.object.end, object);
            } else if (needsPropertyVar) {
              code.insertRight(left.property.start, "var " + property + " = ");
              code.insertLeft(left.property.end, ";\n" + i0);
              code.move(left.property.start, left.property.end, this.start);

              code.insertLeft(left.object.end, "[" + property + "]");
              code.remove(left.object.end, left.property.start);
              code.remove(left.property.end, left.end);
            }
          } else {
            var declarators = [];
            if (needsObjectVar) declarators.push(object);
            if (needsPropertyVar) declarators.push(property);

            if (declarators.length) {
              code.insertRight(statement.start, "var " + declarators.join(', ') + ";\n" + i0);
            }

            if (needsObjectVar && needsPropertyVar) {
              code.insertRight(left.start, "( " + object + " = ");
              code.overwrite(left.object.end, left.property.start, ", " + property + " = ");
              code.overwrite(left.property.end, left.end, ", " + object + "[" + property + "]");
            } else if (needsObjectVar) {
              code.insertRight(left.start, "( " + object + " = ");
              code.insertLeft(left.object.end, ", " + object);
            } else if (needsPropertyVar) {
              code.insertRight(left.property.start, "( " + property + " = ");
              code.insertLeft(left.property.end, ", ");
              code.move(left.property.start, left.property.end, left.start);

              code.overwrite(left.object.end, left.property.start, "[" + property + "]");
              code.remove(left.property.end, left.end);
            }

            if (needsPropertyVar) {
              code.insertLeft(this.end, " )");
            }
          }

          base = object + (left.computed || needsPropertyVar ? "[" + property + "]" : "." + property);
        }

        code.insertRight(this.right.start, "Math.pow( " + base + ", ");
        code.insertLeft(this.right.end, " )");
      };

      return AssignmentExpression;
    }(Node);

    var BinaryExpression = function (Node) {
      function BinaryExpression() {
        Node.apply(this, arguments);
      }

      if (Node) BinaryExpression.__proto__ = Node;
      BinaryExpression.prototype = Object.create(Node && Node.prototype);
      BinaryExpression.prototype.constructor = BinaryExpression;

      BinaryExpression.prototype.transpile = function transpile(code, transforms) {
        if (this.operator === '**' && transforms.exponentiation) {
          code.insertRight(this.start, "Math.pow( ");
          code.overwrite(this.left.end, this.right.start, ", ");
          code.insertLeft(this.end, " )");
        }
        Node.prototype.transpile.call(this, code, transforms);
      };

      return BinaryExpression;
    }(Node);

    var loopStatement = /(?:For(?:In|Of)?|While)Statement/;

    var BreakStatement = function (Node) {
      function BreakStatement() {
        Node.apply(this, arguments);
      }

      if (Node) BreakStatement.__proto__ = Node;
      BreakStatement.prototype = Object.create(Node && Node.prototype);
      BreakStatement.prototype.constructor = BreakStatement;

      BreakStatement.prototype.initialise = function initialise() {
        var loop = this.findNearest(loopStatement);
        var switchCase = this.findNearest('SwitchCase');

        if (loop && (!switchCase || loop.depth > switchCase.depth)) {
          loop.canBreak = true;
          this.loop = loop;
        }
      };

      BreakStatement.prototype.transpile = function transpile(code) {
        if (this.loop && this.loop.shouldRewriteAsFunction) {
          if (this.label) throw new CompileError(this, 'Labels are not currently supported in a loop with locally-scoped variables');
          code.overwrite(this.start, this.start + 5, "return 'break'");
        }
      };

      return BreakStatement;
    }(Node);

    var CallExpression = function (Node) {
      function CallExpression() {
        Node.apply(this, arguments);
      }

      if (Node) CallExpression.__proto__ = Node;
      CallExpression.prototype = Object.create(Node && Node.prototype);
      CallExpression.prototype.constructor = CallExpression;

      CallExpression.prototype.initialise = function initialise(transforms) {
        var this$1 = this;

        if (transforms.spreadRest && this.arguments.length > 1) {
          var lexicalBoundary = this.findLexicalBoundary();

          var i = this.arguments.length;
          while (i--) {
            var arg = this$1.arguments[i];
            if (arg.type === 'SpreadElement' && isArguments(arg.argument)) {
              this$1.argumentsArrayAlias = lexicalBoundary.getArgumentsArrayAlias();
            }
          }
        }

        Node.prototype.initialise.call(this, transforms);
      };

      CallExpression.prototype.transpile = function transpile(code, transforms) {
        if (transforms.spreadRest && this.arguments.length) {
          var hasSpreadElements = false;
          var context;

          var firstArgument = this.arguments[0];

          if (this.arguments.length === 1) {
            if (firstArgument.type === 'SpreadElement') {
              code.remove(firstArgument.start, firstArgument.argument.start);
              hasSpreadElements = true;
            }
          } else {
            hasSpreadElements = spread(code, this.arguments, firstArgument.start, this.argumentsArrayAlias);
          }

          if (hasSpreadElements) {

            // we need to handle super() and super.method() differently
            // due to its instance
            var _super = null;
            if (this.callee.type === 'Super') {
              _super = this.callee;
            } else if (this.callee.type === 'MemberExpression' && this.callee.object.type === 'Super') {
              _super = this.callee.object;
            }

            if (!_super && this.callee.type === 'MemberExpression') {
              if (this.callee.object.type === 'Identifier') {
                context = this.callee.object.name;
              } else {
                context = this.findScope(true).createIdentifier('ref');
                var callExpression = this.callee.object;
                var enclosure = callExpression.findNearest(/Function/);
                var block = enclosure ? enclosure.body.body : callExpression.findNearest(/^Program$/).body;
                var lastStatementInBlock = block[block.length - 1];
                var i0 = lastStatementInBlock.getIndentation();
                code.insertRight(callExpression.start, "(" + context + " = ");
                code.insertLeft(callExpression.end, ")");
                code.insertLeft(lastStatementInBlock.end, "\n" + i0 + "var " + context + ";");
              }
            } else {
              context = 'void 0';
            }

            code.insertLeft(this.callee.end, '.apply');

            if (_super) {
              _super.noCall = true; // bit hacky...

              if (this.arguments.length > 1) {
                if (firstArgument.type !== 'SpreadElement') {
                  code.insertRight(firstArgument.start, "[ ");
                }

                code.insertLeft(this.arguments[this.arguments.length - 1].end, ' )');
              }
            } else if (this.arguments.length === 1) {
              code.insertRight(firstArgument.start, context + ", ");
            } else {
              if (firstArgument.type === 'SpreadElement') {
                code.insertLeft(firstArgument.start, context + ", ");
              } else {
                code.insertLeft(firstArgument.start, context + ", [ ");
              }

              code.insertLeft(this.arguments[this.arguments.length - 1].end, ' )');
            }
          }
        }

        Node.prototype.transpile.call(this, code, transforms);
      };

      return CallExpression;
    }(Node);

    function findIndex(array, fn) {
      for (var i = 0; i < array.length; i += 1) {
        if (fn(array[i], i)) return i;
      }

      return -1;
    }

    var reserved = Object.create(null);
    'do if in for let new try var case else enum eval null this true void with await break catch class const false super throw while yield delete export import public return static switch typeof default extends finally package private continue debugger function arguments interface protected implements instanceof'.split(' ').forEach(function (word) {
      return reserved[word] = true;
    });

    // TODO this code is pretty wild, tidy it up
    var ClassBody = function (Node) {
      function ClassBody() {
        Node.apply(this, arguments);
      }

      if (Node) ClassBody.__proto__ = Node;
      ClassBody.prototype = Object.create(Node && Node.prototype);
      ClassBody.prototype.constructor = ClassBody;

      ClassBody.prototype.transpile = function transpile(code, transforms, inFunctionExpression, superName) {
        var this$1 = this;

        if (transforms.classes) {
          var name = this.parent.name;

          var indentStr = code.getIndentString();
          var i0 = this.getIndentation() + (inFunctionExpression ? indentStr : '');
          var i1 = i0 + indentStr;

          var constructorIndex = findIndex(this.body, function (node) {
            return node.kind === 'constructor';
          });
          var constructor = this.body[constructorIndex];

          var introBlock = '';
          var outroBlock = '';

          if (this.body.length) {
            code.remove(this.start, this.body[0].start);
            code.remove(this.body[this.body.length - 1].end, this.end);
          } else {
            code.remove(this.start, this.end);
          }

          if (constructor) {
            constructor.value.body.isConstructorBody = true;

            var previousMethod = this.body[constructorIndex - 1];
            var nextMethod = this.body[constructorIndex + 1];

            // ensure constructor is first
            if (constructorIndex > 0) {
              code.remove(previousMethod.end, constructor.start);
              code.move(constructor.start, nextMethod ? nextMethod.start : this.end - 1, this.body[0].start);
            }

            if (!inFunctionExpression) code.insertLeft(constructor.end, ';');
          }

          var namedFunctions = this.program.options.namedFunctionExpressions !== false;
          var namedConstructor = namedFunctions || this.parent.superClass || this.parent.type !== 'ClassDeclaration';
          if (this.parent.superClass) {
            var inheritanceBlock = "if ( " + superName + " ) " + name + ".__proto__ = " + superName + ";\n" + i0 + name + ".prototype = Object.create( " + superName + " && " + superName + ".prototype );\n" + i0 + name + ".prototype.constructor = " + name + ";";

            if (constructor) {
              introBlock += "\n\n" + i0 + inheritanceBlock;
            } else {
              var fn = "function " + name + " () {" + (superName ? "\n" + i1 + superName + ".apply(this, arguments);\n" + i0 + "}" : "}") + (inFunctionExpression ? '' : ';') + (this.body.length ? "\n\n" + i0 : '');

              inheritanceBlock = fn + inheritanceBlock;
              introBlock += inheritanceBlock + "\n\n" + i0;
            }
          } else if (!constructor) {
            var fn$1 = 'function ' + (namedConstructor ? name + ' ' : '') + '() {}';
            if (this.parent.type === 'ClassDeclaration') fn$1 += ';';
            if (this.body.length) fn$1 += "\n\n" + i0;

            introBlock += fn$1;
          }

          var scope = this.findScope(false);

          var prototypeGettersAndSetters = [];
          var staticGettersAndSetters = [];
          var prototypeAccessors;
          var staticAccessors;

          this.body.forEach(function (method, i) {
            if (method.kind === 'constructor') {
              var constructorName = namedConstructor ? ' ' + name : '';
              code.overwrite(method.key.start, method.key.end, "function" + constructorName);
              return;
            }

            if (method.static) {
              var len = code.original[method.start + 6] == ' ' ? 7 : 6;
              code.remove(method.start, method.start + len);
            }

            var isAccessor = method.kind !== 'method';
            var lhs;

            var methodName = method.key.name;
            if (reserved[methodName] || method.value.body.scope.references[methodName]) {
              methodName = scope.createIdentifier(methodName);
            }

            // when method name is a string or a number let's pretend it's a computed method

            var fake_computed = false;
            if (!method.computed && method.key.type === 'Literal') {
              fake_computed = true;
              method.computed = true;
            }

            if (isAccessor) {
              if (method.computed) {
                throw new Error('Computed accessor properties are not currently supported');
              }

              code.remove(method.start, method.key.start);

              if (method.static) {
                if (!~staticGettersAndSetters.indexOf(method.key.name)) staticGettersAndSetters.push(method.key.name);
                if (!staticAccessors) staticAccessors = scope.createIdentifier('staticAccessors');

                lhs = "" + staticAccessors;
              } else {
                if (!~prototypeGettersAndSetters.indexOf(method.key.name)) prototypeGettersAndSetters.push(method.key.name);
                if (!prototypeAccessors) prototypeAccessors = scope.createIdentifier('prototypeAccessors');

                lhs = "" + prototypeAccessors;
              }
            } else {
              lhs = method.static ? "" + name : name + ".prototype";
            }

            if (!method.computed) lhs += '.';

            var insertNewlines = constructorIndex > 0 && i === constructorIndex + 1 || i === 0 && constructorIndex === this$1.body.length - 1;

            if (insertNewlines) lhs = "\n\n" + i0 + lhs;

            var c = method.key.end;
            if (method.computed) {
              if (fake_computed) {
                code.insertRight(method.key.start, '[');
                code.insertLeft(method.key.end, ']');
              } else {
                while (code.original[c] !== ']') {
                  c += 1;
                }c += 1;
              }
            }

            code.insertRight(method.start, lhs);

            var funcName = method.computed || isAccessor || !namedFunctions ? '' : methodName + " ";
            var rhs = (isAccessor ? "." + method.kind : '') + " = function" + (method.value.generator ? '* ' : ' ') + funcName;
            code.remove(c, method.value.start);
            code.insertRight(method.value.start, rhs);
            code.insertLeft(method.end, ';');

            if (method.value.generator) code.remove(method.start, method.key.start);
          });

          if (prototypeGettersAndSetters.length || staticGettersAndSetters.length) {
            var intro = [];
            var outro = [];

            if (prototypeGettersAndSetters.length) {
              intro.push("var " + prototypeAccessors + " = { " + prototypeGettersAndSetters.map(function (name) {
                return name + ": {}";
              }).join(',') + " };");
              outro.push("Object.defineProperties( " + name + ".prototype, " + prototypeAccessors + " );");
            }

            if (staticGettersAndSetters.length) {
              intro.push("var " + staticAccessors + " = { " + staticGettersAndSetters.map(function (name) {
                return name + ": {}";
              }).join(',') + " };");
              outro.push("Object.defineProperties( " + name + ", " + staticAccessors + " );");
            }

            if (constructor) introBlock += "\n\n" + i0;
            introBlock += intro.join("\n" + i0);
            if (!constructor) introBlock += "\n\n" + i0;

            outroBlock += "\n\n" + i0 + outro.join("\n" + i0);
          }

          if (constructor) {
            code.insertLeft(constructor.end, introBlock);
          } else {
            code.insertRight(this.start, introBlock);
          }

          code.insertLeft(this.end, outroBlock);
        }

        Node.prototype.transpile.call(this, code, transforms);
      };

      return ClassBody;
    }(Node);

    // TODO this function is slightly flawed – it works on the original string,
    // not its current edited state.
    // That's not a problem for the way that it's currently used, but it could
    // be in future...
    function deindent(node, code) {
      var start = node.start;
      var end = node.end;

      var indentStr = code.getIndentString();
      var indentStrLen = indentStr.length;
      var indentStart = start - indentStrLen;

      if (!node.program.indentExclusions[indentStart] && code.original.slice(indentStart, start) === indentStr) {
        code.remove(indentStart, start);
      }

      var pattern = new RegExp(indentStr + '\\S', 'g');
      var slice = code.original.slice(start, end);
      var match;

      while (match = pattern.exec(slice)) {
        var removeStart = start + match.index;
        if (!node.program.indentExclusions[removeStart]) {
          code.remove(removeStart, removeStart + indentStrLen);
        }
      }
    }

    var ClassDeclaration = function (Node) {
      function ClassDeclaration() {
        Node.apply(this, arguments);
      }

      if (Node) ClassDeclaration.__proto__ = Node;
      ClassDeclaration.prototype = Object.create(Node && Node.prototype);
      ClassDeclaration.prototype.constructor = ClassDeclaration;

      ClassDeclaration.prototype.initialise = function initialise(transforms) {
        this.name = this.id.name;
        this.findScope(true).addDeclaration(this.id, 'class');

        Node.prototype.initialise.call(this, transforms);
      };

      ClassDeclaration.prototype.transpile = function transpile(code, transforms) {
        if (transforms.classes) {
          if (!this.superClass) deindent(this.body, code);

          var superName = this.superClass && (this.superClass.name || 'superclass');

          var i0 = this.getIndentation();
          var i1 = i0 + code.getIndentString();

          // if this is an export default statement, we have to move the export to
          // after the declaration, because `export default var Foo = ...` is illegal
          var syntheticDefaultExport = this.parent.type === 'ExportDefaultDeclaration' ? "\n\n" + i0 + "export default " + this.id.name + ";" : '';

          if (syntheticDefaultExport) code.remove(this.parent.start, this.start);

          code.overwrite(this.start, this.id.start, 'var ');

          if (this.superClass) {
            if (this.superClass.end === this.body.start) {
              code.remove(this.id.end, this.superClass.start);
              code.insertLeft(this.id.end, " = (function (" + superName + ") {\n" + i1);
            } else {
              code.overwrite(this.id.end, this.superClass.start, ' = ');
              code.overwrite(this.superClass.end, this.body.start, "(function (" + superName + ") {\n" + i1);
            }
          } else {
            if (this.id.end === this.body.start) {
              code.insertLeft(this.id.end, ' = ');
            } else {
              code.overwrite(this.id.end, this.body.start, ' = ');
            }
          }

          this.body.transpile(code, transforms, !!this.superClass, superName);

          if (this.superClass) {
            code.insertLeft(this.end, "\n\n" + i1 + "return " + this.name + ";\n" + i0 + "}(");
            code.move(this.superClass.start, this.superClass.end, this.end);
            code.insertRight(this.end, "));" + syntheticDefaultExport);
          } else if (syntheticDefaultExport) {
            code.insertRight(this.end, syntheticDefaultExport);
          }
        } else {
          this.body.transpile(code, transforms, false, null);
        }
      };

      return ClassDeclaration;
    }(Node);

    var ClassExpression = function (Node) {
      function ClassExpression() {
        Node.apply(this, arguments);
      }

      if (Node) ClassExpression.__proto__ = Node;
      ClassExpression.prototype = Object.create(Node && Node.prototype);
      ClassExpression.prototype.constructor = ClassExpression;

      ClassExpression.prototype.initialise = function initialise(transforms) {
        this.name = this.id ? this.id.name : this.parent.type === 'VariableDeclarator' ? this.parent.id.name : this.parent.type === 'AssignmentExpression' ? this.parent.left.name : this.findScope(true).createIdentifier('anonymous');

        Node.prototype.initialise.call(this, transforms);
      };

      ClassExpression.prototype.transpile = function transpile(code, transforms) {
        if (transforms.classes) {
          var superName = this.superClass && (this.superClass.name || 'superclass');

          var i0 = this.getIndentation();
          var i1 = i0 + code.getIndentString();

          if (this.superClass) {
            code.remove(this.start, this.superClass.start);
            code.remove(this.superClass.end, this.body.start);
            code.insertLeft(this.start, "(function (" + superName + ") {\n" + i1);
          } else {
            code.overwrite(this.start, this.body.start, "(function () {\n" + i1);
          }

          this.body.transpile(code, transforms, true, superName);

          var outro = "\n\n" + i1 + "return " + this.name + ";\n" + i0 + "}(";

          if (this.superClass) {
            code.insertLeft(this.end, outro);
            code.move(this.superClass.start, this.superClass.end, this.end);
            code.insertRight(this.end, '))');
          } else {
            code.insertLeft(this.end, "\n\n" + i1 + "return " + this.name + ";\n" + i0 + "}())");
          }
        } else {
          this.body.transpile(code, transforms, false);
        }
      };

      return ClassExpression;
    }(Node);

    var ContinueStatement = function (Node) {
      function ContinueStatement() {
        Node.apply(this, arguments);
      }

      if (Node) ContinueStatement.__proto__ = Node;
      ContinueStatement.prototype = Object.create(Node && Node.prototype);
      ContinueStatement.prototype.constructor = ContinueStatement;

      ContinueStatement.prototype.transpile = function transpile(code) {
        var loop = this.findNearest(loopStatement);
        if (loop.shouldRewriteAsFunction) {
          if (this.label) throw new CompileError(this, 'Labels are not currently supported in a loop with locally-scoped variables');
          code.overwrite(this.start, this.start + 8, 'return');
        }
      };

      return ContinueStatement;
    }(Node);

    var ExportDefaultDeclaration = function (Node) {
      function ExportDefaultDeclaration() {
        Node.apply(this, arguments);
      }

      if (Node) ExportDefaultDeclaration.__proto__ = Node;
      ExportDefaultDeclaration.prototype = Object.create(Node && Node.prototype);
      ExportDefaultDeclaration.prototype.constructor = ExportDefaultDeclaration;

      ExportDefaultDeclaration.prototype.initialise = function initialise(transforms) {
        if (transforms.moduleExport) throw new CompileError(this, 'export is not supported');
        Node.prototype.initialise.call(this, transforms);
      };

      return ExportDefaultDeclaration;
    }(Node);

    var ExportNamedDeclaration = function (Node) {
      function ExportNamedDeclaration() {
        Node.apply(this, arguments);
      }

      if (Node) ExportNamedDeclaration.__proto__ = Node;
      ExportNamedDeclaration.prototype = Object.create(Node && Node.prototype);
      ExportNamedDeclaration.prototype.constructor = ExportNamedDeclaration;

      ExportNamedDeclaration.prototype.initialise = function initialise(transforms) {
        if (transforms.moduleExport) throw new CompileError(this, 'export is not supported');
        Node.prototype.initialise.call(this, transforms);
      };

      return ExportNamedDeclaration;
    }(Node);

    var LoopStatement = function (Node) {
      function LoopStatement() {
        Node.apply(this, arguments);
      }

      if (Node) LoopStatement.__proto__ = Node;
      LoopStatement.prototype = Object.create(Node && Node.prototype);
      LoopStatement.prototype.constructor = LoopStatement;

      LoopStatement.prototype.findScope = function findScope(functionScope) {
        return functionScope || !this.createdScope ? this.parent.findScope(functionScope) : this.body.scope;
      };

      LoopStatement.prototype.initialise = function initialise(transforms) {
        var this$1 = this;

        this.body.createScope();
        this.createdScope = true;

        // this is populated as and when reassignments occur
        this.reassigned = Object.create(null);
        this.aliases = Object.create(null);

        Node.prototype.initialise.call(this, transforms);

        if (transforms.letConst) {
          // see if any block-scoped declarations are referenced
          // inside function expressions
          var names = Object.keys(this.body.scope.declarations);

          var i = names.length;
          while (i--) {
            var name = names[i];
            var declaration = this$1.body.scope.declarations[name];

            var j = declaration.instances.length;
            while (j--) {
              var instance = declaration.instances[j];
              var nearestFunctionExpression = instance.findNearest(/Function/);

              if (nearestFunctionExpression && nearestFunctionExpression.depth > this$1.depth) {
                this$1.shouldRewriteAsFunction = true;
                break;
              }
            }

            if (this$1.shouldRewriteAsFunction) break;
          }
        }
      };

      LoopStatement.prototype.transpile = function transpile(code, transforms) {
        var needsBlock = this.type != 'ForOfStatement' && (this.body.type !== 'BlockStatement' || this.body.type === 'BlockStatement' && this.body.synthetic);

        if (this.shouldRewriteAsFunction) {
          var i0 = this.getIndentation();
          var i1 = i0 + code.getIndentString();

          var argString = this.args ? " " + this.args.join(', ') + " " : '';
          var paramString = this.params ? " " + this.params.join(', ') + " " : '';

          var functionScope = this.findScope(true);
          var loop = functionScope.createIdentifier('loop');

          var before = "var " + loop + " = function (" + paramString + ") " + (this.body.synthetic ? "{\n" + i0 + code.getIndentString() : '');
          var after = (this.body.synthetic ? "\n" + i0 + "}" : '') + ";\n\n" + i0;

          code.insertRight(this.body.start, before);
          code.insertLeft(this.body.end, after);
          code.move(this.start, this.body.start, this.body.end);

          if (this.canBreak || this.canReturn) {
            var returned = functionScope.createIdentifier('returned');

            var insert = "{\n" + i1 + "var " + returned + " = " + loop + "(" + argString + ");\n";
            if (this.canBreak) insert += "\n" + i1 + "if ( " + returned + " === 'break' ) break;";
            if (this.canReturn) insert += "\n" + i1 + "if ( " + returned + " ) return " + returned + ".v;";
            insert += "\n" + i0 + "}";

            code.insertRight(this.body.end, insert);
          } else {
            var callExpression = loop + "(" + argString + ");";

            if (this.type === 'DoWhileStatement') {
              code.overwrite(this.start, this.body.start, "do {\n" + i1 + callExpression + "\n" + i0 + "}");
            } else {
              code.insertRight(this.body.end, callExpression);
            }
          }
        } else if (needsBlock) {
          code.insertLeft(this.body.start, '{ ');
          code.insertRight(this.body.end, ' }');
        }

        Node.prototype.transpile.call(this, code, transforms);
      };

      return LoopStatement;
    }(Node);

    function extractNames(node) {
      var names = [];
      extractors[node.type](names, node);
      return names;
    }

    var extractors = {
      Identifier: function Identifier(names, node) {
        names.push(node);
      },

      ObjectPattern: function ObjectPattern(names, node) {
        for (var i = 0, list = node.properties; i < list.length; i += 1) {
          var prop = list[i];

          extractors[prop.value.type](names, prop.value);
        }
      },

      ArrayPattern: function ArrayPattern(names, node) {
        for (var i = 0, list = node.elements; i < list.length; i += 1) {
          var element = list[i];

          if (element) extractors[element.type](names, element);
        }
      },

      RestElement: function RestElement(names, node) {
        extractors[node.argument.type](names, node.argument);
      },

      AssignmentPattern: function AssignmentPattern(names, node) {
        extractors[node.left.type](names, node.left);
      }
    };

    var ForStatement = function (LoopStatement) {
      function ForStatement() {
        LoopStatement.apply(this, arguments);
      }

      if (LoopStatement) ForStatement.__proto__ = LoopStatement;
      ForStatement.prototype = Object.create(LoopStatement && LoopStatement.prototype);
      ForStatement.prototype.constructor = ForStatement;

      ForStatement.prototype.findScope = function findScope(functionScope) {
        return functionScope || !this.createdScope ? this.parent.findScope(functionScope) : this.body.scope;
      };

      ForStatement.prototype.transpile = function transpile(code, transforms) {
        var this$1 = this;

        var i1 = this.getIndentation() + code.getIndentString();

        if (this.shouldRewriteAsFunction) {
          // which variables are declared in the init statement?
          var names = this.init.type === 'VariableDeclaration' ? [].concat.apply([], this.init.declarations.map(function (declarator) {
            return extractNames(declarator.id);
          })) : [];

          var aliases = this.aliases;

          this.args = names.map(function (name) {
            return name in this$1.aliases ? this$1.aliases[name].outer : name;
          });
          this.params = names.map(function (name) {
            return name in this$1.aliases ? this$1.aliases[name].inner : name;
          });

          var updates = Object.keys(this.reassigned).map(function (name) {
            return aliases[name].outer + " = " + aliases[name].inner + ";";
          });

          if (updates.length) {
            if (this.body.synthetic) {
              code.insertLeft(this.body.body[0].end, "; " + updates.join(" "));
            } else {
              var lastStatement = this.body.body[this.body.body.length - 1];
              code.insertLeft(lastStatement.end, "\n\n" + i1 + updates.join("\n" + i1));
            }
          }
        }

        LoopStatement.prototype.transpile.call(this, code, transforms);
      };

      return ForStatement;
    }(LoopStatement);

    var ForInStatement = function (LoopStatement) {
      function ForInStatement() {
        LoopStatement.apply(this, arguments);
      }

      if (LoopStatement) ForInStatement.__proto__ = LoopStatement;
      ForInStatement.prototype = Object.create(LoopStatement && LoopStatement.prototype);
      ForInStatement.prototype.constructor = ForInStatement;

      ForInStatement.prototype.findScope = function findScope(functionScope) {
        return functionScope || !this.createdScope ? this.parent.findScope(functionScope) : this.body.scope;
      };

      ForInStatement.prototype.transpile = function transpile(code, transforms) {
        var this$1 = this;

        if (this.shouldRewriteAsFunction) {
          // which variables are declared in the init statement?
          var names = this.left.type === 'VariableDeclaration' ? [].concat.apply([], this.left.declarations.map(function (declarator) {
            return extractNames(declarator.id);
          })) : [];

          this.args = names.map(function (name) {
            return name in this$1.aliases ? this$1.aliases[name].outer : name;
          });
          this.params = names.map(function (name) {
            return name in this$1.aliases ? this$1.aliases[name].inner : name;
          });
        }

        LoopStatement.prototype.transpile.call(this, code, transforms);
      };

      return ForInStatement;
    }(LoopStatement);

    var handlers = {
      Identifier: destructureIdentifier,
      AssignmentPattern: destructureAssignmentPattern,
      ArrayPattern: destructureArrayPattern,
      ObjectPattern: destructureObjectPattern
    };

    function destructure(code, scope, node, ref, inline, statementGenerators) {
      handlers[node.type](code, scope, node, ref, inline, statementGenerators);
    }

    function destructureIdentifier(code, scope, node, ref, inline, statementGenerators) {
      statementGenerators.push(function (start, prefix, suffix) {
        code.insertRight(node.start, inline ? prefix : prefix + "var ");
        code.insertLeft(node.end, " = " + ref + suffix);
        code.move(node.start, node.end, start);
      });
    }

    function destructureAssignmentPattern(code, scope, node, ref, inline, statementGenerators) {
      var isIdentifier = node.left.type === 'Identifier';
      var name = isIdentifier ? node.left.name : ref;

      if (!inline) {
        statementGenerators.push(function (start, prefix, suffix) {
          code.insertRight(node.left.end, prefix + "if ( " + name + " === void 0 ) " + name);
          code.move(node.left.end, node.right.end, start);
          code.insertLeft(node.right.end, suffix);
        });
      }

      if (!isIdentifier) {
        destructure(code, scope, node.left, ref, inline, statementGenerators);
      }
    }

    function destructureArrayPattern(code, scope, node, ref, inline, statementGenerators) {
      var c = node.start;

      node.elements.forEach(function (element, i) {
        if (!element) return;

        if (element.type === 'RestElement') {
          handleProperty(code, scope, c, element.argument, ref + ".slice(" + i + ")", inline, statementGenerators);
        } else {
          handleProperty(code, scope, c, element, ref + "[" + i + "]", inline, statementGenerators);
        }
        c = element.end;
      });

      code.remove(c, node.end);
    }

    function destructureObjectPattern(code, scope, node, ref, inline, statementGenerators) {
      var c = node.start;

      node.properties.forEach(function (prop) {
        var value = prop.computed || prop.key.type !== 'Identifier' ? ref + "[" + code.slice(prop.key.start, prop.key.end) + "]" : ref + "." + prop.key.name;
        handleProperty(code, scope, c, prop.value, value, inline, statementGenerators);
        c = prop.end;
      });

      code.remove(c, node.end);
    }

    function handleProperty(code, scope, c, node, value, inline, statementGenerators) {
      switch (node.type) {
        case 'Identifier':
          {
            code.remove(c, node.start);
            destructureIdentifier(code, scope, node, value, inline, statementGenerators);
            break;
          }

        case 'AssignmentPattern':
          {
            var name;

            var isIdentifier = node.left.type === 'Identifier';

            if (isIdentifier) {
              name = node.left.name;
              var declaration = scope.findDeclaration(name);
              if (declaration) name = declaration.name;
            } else {
              name = scope.createIdentifier(value);
            }

            statementGenerators.push(function (start, prefix, suffix) {
              if (inline) {
                code.insertRight(node.right.start, name + " = " + value + " === undefined ? ");
                code.insertLeft(node.right.end, " : " + value);
              } else {
                code.insertRight(node.right.start, prefix + "var " + name + " = " + value + "; if ( " + name + " === void 0 ) " + name + " = ");
                code.insertLeft(node.right.end, suffix);
              }

              code.move(node.right.start, node.right.end, start);
            });

            if (isIdentifier) {
              code.remove(c, node.right.start);
            } else {
              code.remove(c, node.left.start);
              code.remove(node.left.end, node.right.start);
              handleProperty(code, scope, c, node.left, name, inline, statementGenerators);
            }

            break;
          }

        case 'ObjectPattern':
          {
            code.remove(c, c = node.start);

            if (node.properties.length > 1) {
              var ref = scope.createIdentifier(value);

              statementGenerators.push(function (start, prefix, suffix) {
                // this feels a tiny bit hacky, but we can't do a
                // straightforward insertLeft and keep correct order...
                code.insertRight(node.start, prefix + "var " + ref + " = ");
                code.overwrite(node.start, c = node.start + 1, value);
                code.insertLeft(c, suffix);

                code.move(node.start, c, start);
              });

              node.properties.forEach(function (prop) {
                var value = prop.computed || prop.key.type !== 'Identifier' ? ref + "[" + code.slice(prop.key.start, prop.key.end) + "]" : ref + "." + prop.key.name;
                handleProperty(code, scope, c, prop.value, value, inline, statementGenerators);
                c = prop.end;
              });
            } else {
              var prop = node.properties[0];
              var value_suffix = prop.computed || prop.key.type !== 'Identifier' ? "[" + code.slice(prop.key.start, prop.key.end) + "]" : "." + prop.key.name;
              handleProperty(code, scope, c, prop.value, "" + value + value_suffix, inline, statementGenerators);
              c = prop.end;
            }

            code.remove(c, node.end);
            break;
          }

        case 'ArrayPattern':
          {
            code.remove(c, c = node.start);

            if (node.elements.filter(Boolean).length > 1) {
              var ref$1 = scope.createIdentifier(value);

              statementGenerators.push(function (start, prefix, suffix) {
                code.insertRight(node.start, prefix + "var " + ref$1 + " = ");
                code.overwrite(node.start, c = node.start + 1, value);
                code.insertLeft(c, suffix);

                code.move(node.start, c, start);
              });

              node.elements.forEach(function (element, i) {
                if (!element) return;

                if (element.type === 'RestElement') {
                  handleProperty(code, scope, c, element.argument, ref$1 + ".slice(" + i + ")", inline, statementGenerators);
                } else {
                  handleProperty(code, scope, c, element, ref$1 + "[" + i + "]", inline, statementGenerators);
                }
                c = element.end;
              });
            } else {
              var index = findIndex(node.elements, Boolean);
              var element = node.elements[index];
              if (element.type === 'RestElement') {
                handleProperty(code, scope, c, element.argument, value + ".slice(" + index + ")", inline, statementGenerators);
              } else {
                handleProperty(code, scope, c, element, value + "[" + index + "]", inline, statementGenerators);
              }
              c = element.end;
            }

            code.remove(c, node.end);
            break;
          }

        default:
          {
            throw new Error("Unexpected node type in destructuring (" + node.type + ")");
          }
      }
    }

    var ForOfStatement = function (LoopStatement) {
      function ForOfStatement() {
        LoopStatement.apply(this, arguments);
      }

      if (LoopStatement) ForOfStatement.__proto__ = LoopStatement;
      ForOfStatement.prototype = Object.create(LoopStatement && LoopStatement.prototype);
      ForOfStatement.prototype.constructor = ForOfStatement;

      ForOfStatement.prototype.initialise = function initialise(transforms) {
        if (transforms.forOf && !transforms.dangerousForOf) throw new CompileError(this, 'for...of statements are not supported. Use `transforms: { forOf: false }` to skip transformation and disable this error, or `transforms: { dangerousForOf: true }` if you know what you\'re doing');
        LoopStatement.prototype.initialise.call(this, transforms);
      };

      ForOfStatement.prototype.transpile = function transpile(code, transforms) {
        if (!transforms.dangerousForOf) {
          LoopStatement.prototype.transpile.call(this, code, transforms);
          return;
        }

        // edge case (#80)
        if (!this.body.body[0]) {
          if (this.left.type === 'VariableDeclaration' && this.left.kind === 'var') {
            code.remove(this.start, this.left.start);
            code.insertLeft(this.left.end, ';');
            code.remove(this.left.end, this.end);
          } else {
            code.remove(this.start, this.end);
          }

          return;
        }

        var scope = this.findScope(true);
        var i0 = this.getIndentation();
        var i1 = i0 + code.getIndentString();

        var key = scope.createIdentifier('i');
        var list = scope.createIdentifier('list');

        if (this.body.synthetic) {
          code.insertRight(this.left.start, "{\n" + i1);
          code.insertLeft(this.body.body[0].end, "\n" + i0 + "}");
        }

        var bodyStart = this.body.body[0].start;

        code.remove(this.left.end, this.right.start);
        code.move(this.left.start, this.left.end, bodyStart);

        code.insertRight(this.right.start, "var " + key + " = 0, " + list + " = ");
        code.insertLeft(this.right.end, "; " + key + " < " + list + ".length; " + key + " += 1");

        // destructuring. TODO non declaration destructuring
        var declarator = this.left.type === 'VariableDeclaration' && this.left.declarations[0];
        if (declarator && declarator.id.type !== 'Identifier') {
          var statementGenerators = [];
          var ref = scope.createIdentifier('ref');
          destructure(code, scope, declarator.id, ref, false, statementGenerators);

          var suffix = ";\n" + i1;
          statementGenerators.forEach(function (fn, i) {
            if (i === statementGenerators.length - 1) {
              suffix = ";\n\n" + i1;
            }

            fn(bodyStart, '', suffix);
          });

          code.insertLeft(this.left.start + this.left.kind.length + 1, ref);
          code.insertLeft(this.left.end, " = " + list + "[" + key + "];\n" + i1);
        } else {
          code.insertLeft(this.left.end, " = " + list + "[" + key + "];\n\n" + i1);
        }

        LoopStatement.prototype.transpile.call(this, code, transforms);
      };

      return ForOfStatement;
    }(LoopStatement);

    var FunctionDeclaration = function (Node) {
      function FunctionDeclaration() {
        Node.apply(this, arguments);
      }

      if (Node) FunctionDeclaration.__proto__ = Node;
      FunctionDeclaration.prototype = Object.create(Node && Node.prototype);
      FunctionDeclaration.prototype.constructor = FunctionDeclaration;

      FunctionDeclaration.prototype.initialise = function initialise(transforms) {
        if (this.generator && transforms.generator) {
          throw new CompileError(this, 'Generators are not supported');
        }

        this.body.createScope();

        this.findScope(true).addDeclaration(this.id, 'function');
        Node.prototype.initialise.call(this, transforms);
      };

      return FunctionDeclaration;
    }(Node);

    var FunctionExpression = function (Node) {
      function FunctionExpression() {
        Node.apply(this, arguments);
      }

      if (Node) FunctionExpression.__proto__ = Node;
      FunctionExpression.prototype = Object.create(Node && Node.prototype);
      FunctionExpression.prototype.constructor = FunctionExpression;

      FunctionExpression.prototype.initialise = function initialise(transforms) {
        if (this.generator && transforms.generator) {
          throw new CompileError(this, 'Generators are not supported');
        }

        this.body.createScope();

        if (this.id) {
          // function expression IDs belong to the child scope...
          this.body.scope.addDeclaration(this.id, 'function');
        }

        Node.prototype.initialise.call(this, transforms);

        var parent = this.parent;
        var methodName;

        if (transforms.conciseMethodProperty && parent.type === 'Property' && parent.kind === 'init' && parent.method && parent.key.type === 'Identifier') {
          // object literal concise method
          methodName = parent.key.name;
        } else if (transforms.classes && parent.type === 'MethodDefinition' && parent.kind === 'method' && parent.key.type === 'Identifier') {
          // method definition in a class
          methodName = parent.key.name;
        } else if (this.id && this.id.type === 'Identifier') {
          // naked function expression
          methodName = this.id.alias || this.id.name;
        }

        if (methodName) {
          for (var i = 0, list = this.params; i < list.length; i += 1) {
            var param = list[i];

            if (param.type === 'Identifier' && methodName === param.name) {
              // workaround for Safari 9/WebKit bug:
              // https://gitlab.com/Rich-Harris/buble/issues/154
              // change parameter name when same as method name

              var scope = this.body.scope;
              var declaration = scope.declarations[methodName];

              var alias = scope.createIdentifier(methodName);
              param.alias = alias;

              for (var i$1 = 0, list$1 = declaration.instances; i$1 < list$1.length; i$1 += 1) {
                var identifier = list$1[i$1];

                identifier.alias = alias;
              }

              break;
            }
          }
        }
      };

      return FunctionExpression;
    }(Node);

    function isReference(node, parent) {
      if (node.type === 'MemberExpression') {
        return !node.computed && isReference(node.object, node);
      }

      if (node.type === 'Identifier') {
        // the only time we could have an identifier node without a parent is
        // if it's the entire body of a function without a block statement –
        // i.e. an arrow function expression like `a => a`
        if (!parent) return true;

        if (/(Function|Class)Expression/.test(parent.type)) return false;

        if (parent.type === 'VariableDeclarator') return node === parent.init;

        // TODO is this right?
        if (parent.type === 'MemberExpression' || parent.type === 'MethodDefinition') {
          return parent.computed || node === parent.object;
        }

        if (parent.type === 'ArrayPattern') return false;

        // disregard the `bar` in `{ bar: foo }`, but keep it in `{ [bar]: foo }`
        if (parent.type === 'Property') {
          if (parent.parent.type === 'ObjectPattern') return false;
          return parent.computed || node === parent.value;
        }

        // disregard the `bar` in `class Foo { bar () {...} }`
        if (parent.type === 'MethodDefinition') return false;

        // disregard the `bar` in `export { foo as bar }`
        if (parent.type === 'ExportSpecifier' && node !== parent.local) return false;

        return true;
      }
    }

    var Identifier = function (Node) {
      function Identifier() {
        Node.apply(this, arguments);
      }

      if (Node) Identifier.__proto__ = Node;
      Identifier.prototype = Object.create(Node && Node.prototype);
      Identifier.prototype.constructor = Identifier;

      Identifier.prototype.findScope = function findScope(functionScope) {
        if (this.parent.params && ~this.parent.params.indexOf(this)) {
          return this.parent.body.scope;
        }

        if (this.parent.type === 'FunctionExpression' && this === this.parent.id) {
          return this.parent.body.scope;
        }

        return this.parent.findScope(functionScope);
      };

      Identifier.prototype.initialise = function initialise(transforms) {
        if (transforms.arrow && isReference(this, this.parent)) {
          if (this.name === 'arguments' && !this.findScope(false).contains(this.name)) {
            var lexicalBoundary = this.findLexicalBoundary();
            var arrowFunction = this.findNearest('ArrowFunctionExpression');
            var loop = this.findNearest(loopStatement);

            if (arrowFunction && arrowFunction.depth > lexicalBoundary.depth) {
              this.alias = lexicalBoundary.getArgumentsAlias();
            }

            if (loop && loop.body.contains(this) && loop.depth > lexicalBoundary.depth) {
              this.alias = lexicalBoundary.getArgumentsAlias();
            }
          }

          this.findScope(false).addReference(this);
        }
      };

      Identifier.prototype.transpile = function transpile(code) {
        if (this.alias) {
          code.overwrite(this.start, this.end, this.alias, true);
        }
      };

      return Identifier;
    }(Node);

    var IfStatement = function (Node) {
      function IfStatement() {
        Node.apply(this, arguments);
      }

      if (Node) IfStatement.__proto__ = Node;
      IfStatement.prototype = Object.create(Node && Node.prototype);
      IfStatement.prototype.constructor = IfStatement;

      IfStatement.prototype.initialise = function initialise(transforms) {
        Node.prototype.initialise.call(this, transforms);
      };

      IfStatement.prototype.transpile = function transpile(code, transforms) {
        if (this.consequent.type !== 'BlockStatement' || this.consequent.type === 'BlockStatement' && this.consequent.synthetic) {
          code.insertLeft(this.consequent.start, '{ ');
          code.insertRight(this.consequent.end, ' }');
        }

        if (this.alternate && this.alternate.type !== 'IfStatement' && (this.alternate.type !== 'BlockStatement' || this.alternate.type === 'BlockStatement' && this.alternate.synthetic)) {
          code.insertLeft(this.alternate.start, '{ ');
          code.insertRight(this.alternate.end, ' }');
        }

        Node.prototype.transpile.call(this, code, transforms);
      };

      return IfStatement;
    }(Node);

    var ImportDeclaration = function (Node) {
      function ImportDeclaration() {
        Node.apply(this, arguments);
      }

      if (Node) ImportDeclaration.__proto__ = Node;
      ImportDeclaration.prototype = Object.create(Node && Node.prototype);
      ImportDeclaration.prototype.constructor = ImportDeclaration;

      ImportDeclaration.prototype.initialise = function initialise(transforms) {
        if (transforms.moduleImport) throw new CompileError(this, 'import is not supported');
        Node.prototype.initialise.call(this, transforms);
      };

      return ImportDeclaration;
    }(Node);

    var ImportDefaultSpecifier = function (Node) {
      function ImportDefaultSpecifier() {
        Node.apply(this, arguments);
      }

      if (Node) ImportDefaultSpecifier.__proto__ = Node;
      ImportDefaultSpecifier.prototype = Object.create(Node && Node.prototype);
      ImportDefaultSpecifier.prototype.constructor = ImportDefaultSpecifier;

      ImportDefaultSpecifier.prototype.initialise = function initialise(transforms) {
        this.findScope(true).addDeclaration(this.local, 'import');
        Node.prototype.initialise.call(this, transforms);
      };

      return ImportDefaultSpecifier;
    }(Node);

    var ImportSpecifier = function (Node) {
      function ImportSpecifier() {
        Node.apply(this, arguments);
      }

      if (Node) ImportSpecifier.__proto__ = Node;
      ImportSpecifier.prototype = Object.create(Node && Node.prototype);
      ImportSpecifier.prototype.constructor = ImportSpecifier;

      ImportSpecifier.prototype.initialise = function initialise(transforms) {
        this.findScope(true).addDeclaration(this.local, 'import');
        Node.prototype.initialise.call(this, transforms);
      };

      return ImportSpecifier;
    }(Node);

    var IS_DATA_ATTRIBUTE = /-/;

    var JSXAttribute = function (Node) {
      function JSXAttribute() {
        Node.apply(this, arguments);
      }

      if (Node) JSXAttribute.__proto__ = Node;
      JSXAttribute.prototype = Object.create(Node && Node.prototype);
      JSXAttribute.prototype.constructor = JSXAttribute;

      JSXAttribute.prototype.transpile = function transpile(code, transforms) {
        if (this.value) {
          code.overwrite(this.name.end, this.value.start, ': ');
        } else {
          // tag without value
          code.overwrite(this.name.start, this.name.end, this.name.name + ": true");
        }

        if (IS_DATA_ATTRIBUTE.test(this.name.name)) {
          code.overwrite(this.name.start, this.name.end, "'" + this.name.name + "'");
        }

        Node.prototype.transpile.call(this, code, transforms);
      };

      return JSXAttribute;
    }(Node);

    function containsNewLine(node) {
      return node.type === 'Literal' && !/\S/.test(node.value) && /\n/.test(node.value);
    }

    var JSXClosingElement = function (Node) {
      function JSXClosingElement() {
        Node.apply(this, arguments);
      }

      if (Node) JSXClosingElement.__proto__ = Node;
      JSXClosingElement.prototype = Object.create(Node && Node.prototype);
      JSXClosingElement.prototype.constructor = JSXClosingElement;

      JSXClosingElement.prototype.transpile = function transpile(code) {
        var spaceBeforeParen = true;

        var lastChild = this.parent.children[this.parent.children.length - 1];

        // omit space before closing paren if
        //   a) this is on a separate line, or
        //   b) there are no children but there are attributes
        if (lastChild && containsNewLine(lastChild) || this.parent.openingElement.attributes.length) {
          spaceBeforeParen = false;
        }

        code.overwrite(this.start, this.end, spaceBeforeParen ? ' )' : ')');
      };

      return JSXClosingElement;
    }(Node);

    function normalise(str, removeTrailingWhitespace) {
      if (removeTrailingWhitespace && /\n/.test(str)) {
        str = str.replace(/\s+$/, '');
      }

      str = str.replace(/^\n\r?\s+/, '') // remove leading newline + space
      .replace(/\s*\n\r?\s*/gm, ' '); // replace newlines with spaces

      // TODO prefer single quotes?
      return JSON.stringify(str);
    }

    var JSXElement = function (Node) {
      function JSXElement() {
        Node.apply(this, arguments);
      }

      if (Node) JSXElement.__proto__ = Node;
      JSXElement.prototype = Object.create(Node && Node.prototype);
      JSXElement.prototype.constructor = JSXElement;

      JSXElement.prototype.transpile = function transpile(code, transforms) {
        Node.prototype.transpile.call(this, code, transforms);

        var children = this.children.filter(function (child) {
          if (child.type !== 'Literal') return true;

          // remove whitespace-only literals, unless on a single line
          return (/\S/.test(child.value) || !/\n/.test(child.value)
          );
        });

        if (children.length) {
          var c = this.openingElement.end;

          var i;
          for (i = 0; i < children.length; i += 1) {
            var child = children[i];

            if (child.type === 'JSXExpressionContainer' && child.expression.type === 'JSXEmptyExpression') {
              // empty block is a no op
            } else {
              var tail = code.original[c] === '\n' && child.type !== 'Literal' ? '' : ' ';
              code.insertLeft(c, "," + tail);
            }

            if (child.type === 'Literal') {
              var str = normalise(child.value, i === children.length - 1);
              code.overwrite(child.start, child.end, str);
            }

            c = child.end;
          }
        }
      };

      return JSXElement;
    }(Node);

    var JSXExpressionContainer = function (Node) {
      function JSXExpressionContainer() {
        Node.apply(this, arguments);
      }

      if (Node) JSXExpressionContainer.__proto__ = Node;
      JSXExpressionContainer.prototype = Object.create(Node && Node.prototype);
      JSXExpressionContainer.prototype.constructor = JSXExpressionContainer;

      JSXExpressionContainer.prototype.transpile = function transpile(code, transforms) {
        code.remove(this.start, this.expression.start);
        code.remove(this.expression.end, this.end);

        Node.prototype.transpile.call(this, code, transforms);
      };

      return JSXExpressionContainer;
    }(Node);

    var JSXOpeningElement = function (Node) {
      function JSXOpeningElement() {
        Node.apply(this, arguments);
      }

      if (Node) JSXOpeningElement.__proto__ = Node;
      JSXOpeningElement.prototype = Object.create(Node && Node.prototype);
      JSXOpeningElement.prototype.constructor = JSXOpeningElement;

      JSXOpeningElement.prototype.transpile = function transpile(code, transforms) {
        var this$1 = this;

        code.overwrite(this.start, this.name.start, this.program.jsx + "( ");

        var html = this.name.type === 'JSXIdentifier' && this.name.name[0] === this.name.name[0].toLowerCase();
        if (html) code.insertRight(this.name.start, "'");

        var len = this.attributes.length;
        var c = this.name.end;

        if (len) {
          var i;

          var hasSpread = false;
          for (i = 0; i < len; i += 1) {
            if (this$1.attributes[i].type === 'JSXSpreadAttribute') {
              hasSpread = true;
              break;
            }
          }

          c = this.attributes[0].end;

          for (i = 0; i < len; i += 1) {
            var attr = this$1.attributes[i];

            if (i > 0) {
              code.overwrite(c, attr.start, ', ');
            }

            if (hasSpread && attr.type !== 'JSXSpreadAttribute') {
              var lastAttr = this$1.attributes[i - 1];
              var nextAttr = this$1.attributes[i + 1];

              if (!lastAttr || lastAttr.type === 'JSXSpreadAttribute') {
                code.insertRight(attr.start, '{ ');
              }

              if (!nextAttr || nextAttr.type === 'JSXSpreadAttribute') {
                code.insertLeft(attr.end, ' }');
              }
            }

            c = attr.end;
          }

          var after;
          var before;
          if (hasSpread) {
            if (len === 1) {
              before = html ? "'," : ',';
            } else {
              if (!this.program.options.objectAssign) {
                throw new CompileError(this, 'Mixed JSX attributes ending in spread requires specified objectAssign option with \'Object.assign\' or polyfill helper.');
              }
              before = html ? "', " + this.program.options.objectAssign + "({}," : ", " + this.program.options.objectAssign + "({},";
              after = ')';
            }
          } else {
            before = html ? "', {" : ', {';
            after = ' }';
          }

          code.insertRight(this.name.end, before);

          if (after) {
            code.insertLeft(this.attributes[len - 1].end, after);
          }
        } else {
          code.insertLeft(this.name.end, html ? "', null" : ", null");
          c = this.name.end;
        }

        Node.prototype.transpile.call(this, code, transforms);

        if (this.selfClosing) {
          code.overwrite(c, this.end, this.attributes.length ? ")" : " )");
        } else {
          code.remove(c, this.end);
        }
      };

      return JSXOpeningElement;
    }(Node);

    var JSXSpreadAttribute = function (Node) {
      function JSXSpreadAttribute() {
        Node.apply(this, arguments);
      }

      if (Node) JSXSpreadAttribute.__proto__ = Node;
      JSXSpreadAttribute.prototype = Object.create(Node && Node.prototype);
      JSXSpreadAttribute.prototype.constructor = JSXSpreadAttribute;

      JSXSpreadAttribute.prototype.transpile = function transpile(code, transforms) {
        code.remove(this.start, this.argument.start);
        code.remove(this.argument.end, this.end);

        Node.prototype.transpile.call(this, code, transforms);
      };

      return JSXSpreadAttribute;
    }(Node);

    var regenerate = __commonjs(function (module, exports, global) {
      /*! https://mths.be/regenerate v1.3.1 by @mathias | MIT license */
      (function (root) {

        // Detect free variables `exports`.
        var freeExports = (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) == 'object' && exports;

        // Detect free variable `module`.
        var freeModule = (typeof module === 'undefined' ? 'undefined' : _typeof(module)) == 'object' && module && module.exports == freeExports && module;

        // Detect free variable `global`, from Node.js/io.js or Browserified code,
        // and use it as `root`.
        var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global;
        if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
          root = freeGlobal;
        }

        /*--------------------------------------------------------------------------*/

        var ERRORS = {
          'rangeOrder': 'A range\u2019s `stop` value must be greater than or equal ' + 'to the `start` value.',
          'codePointRange': 'Invalid code point value. Code points range from ' + 'U+000000 to U+10FFFF.'
        };

        // https://mathiasbynens.be/notes/javascript-encoding#surrogate-pairs
        var HIGH_SURROGATE_MIN = 0xD800;
        var HIGH_SURROGATE_MAX = 0xDBFF;
        var LOW_SURROGATE_MIN = 0xDC00;
        var LOW_SURROGATE_MAX = 0xDFFF;

        // In Regenerate output, `\0` is never preceded by `\` because we sort by
        // code point value, so let’s keep this regular expression simple.
        var regexNull = /\\x00([^0123456789]|$)/g;

        var object = {};
        var hasOwnProperty = object.hasOwnProperty;
        var extend = function extend(destination, source) {
          var key;
          for (key in source) {
            if (hasOwnProperty.call(source, key)) {
              destination[key] = source[key];
            }
          }
          return destination;
        };

        var forEach = function forEach(array, callback) {
          var index = -1;
          var length = array.length;
          while (++index < length) {
            callback(array[index], index);
          }
        };

        var toString = object.toString;
        var isArray = function isArray(value) {
          return toString.call(value) == '[object Array]';
        };
        var isNumber = function isNumber(value) {
          return typeof value == 'number' || toString.call(value) == '[object Number]';
        };

        // This assumes that `number` is a positive integer that `toString()`s nicely
        // (which is the case for all code point values).
        var zeroes = '0000';
        var pad = function pad(number, totalCharacters) {
          var string = String(number);
          return string.length < totalCharacters ? (zeroes + string).slice(-totalCharacters) : string;
        };

        var hex = function hex(number) {
          return Number(number).toString(16).toUpperCase();
        };

        var slice = [].slice;

        /*--------------------------------------------------------------------------*/

        var dataFromCodePoints = function dataFromCodePoints(codePoints) {
          var index = -1;
          var length = codePoints.length;
          var max = length - 1;
          var result = [];
          var isStart = true;
          var tmp;
          var previous = 0;
          while (++index < length) {
            tmp = codePoints[index];
            if (isStart) {
              result.push(tmp);
              previous = tmp;
              isStart = false;
            } else {
              if (tmp == previous + 1) {
                if (index != max) {
                  previous = tmp;
                  continue;
                } else {
                  isStart = true;
                  result.push(tmp + 1);
                }
              } else {
                // End the previous range and start a new one.
                result.push(previous + 1, tmp);
                previous = tmp;
              }
            }
          }
          if (!isStart) {
            result.push(tmp + 1);
          }
          return result;
        };

        var dataRemove = function dataRemove(data, codePoint) {
          // Iterate over the data per `(start, end)` pair.
          var index = 0;
          var start;
          var end;
          var length = data.length;
          while (index < length) {
            start = data[index];
            end = data[index + 1];
            if (codePoint >= start && codePoint < end) {
              // Modify this pair.
              if (codePoint == start) {
                if (end == start + 1) {
                  // Just remove `start` and `end`.
                  data.splice(index, 2);
                  return data;
                } else {
                  // Just replace `start` with a new value.
                  data[index] = codePoint + 1;
                  return data;
                }
              } else if (codePoint == end - 1) {
                // Just replace `end` with a new value.
                data[index + 1] = codePoint;
                return data;
              } else {
                // Replace `[start, end]` with `[startA, endA, startB, endB]`.
                data.splice(index, 2, start, codePoint, codePoint + 1, end);
                return data;
              }
            }
            index += 2;
          }
          return data;
        };

        var dataRemoveRange = function dataRemoveRange(data, rangeStart, rangeEnd) {
          if (rangeEnd < rangeStart) {
            throw Error(ERRORS.rangeOrder);
          }
          // Iterate over the data per `(start, end)` pair.
          var index = 0;
          var start;
          var end;
          while (index < data.length) {
            start = data[index];
            end = data[index + 1] - 1; // Note: the `- 1` makes `end` inclusive.

            // Exit as soon as no more matching pairs can be found.
            if (start > rangeEnd) {
              return data;
            }

            // Check if this range pair is equal to, or forms a subset of, the range
            // to be removed.
            // E.g. we have `[0, 11, 40, 51]` and want to remove 0-10 → `[40, 51]`.
            // E.g. we have `[40, 51]` and want to remove 0-100 → `[]`.
            if (rangeStart <= start && rangeEnd >= end) {
              // Remove this pair.
              data.splice(index, 2);
              continue;
            }

            // Check if both `rangeStart` and `rangeEnd` are within the bounds of
            // this pair.
            // E.g. we have `[0, 11]` and want to remove 4-6 → `[0, 4, 7, 11]`.
            if (rangeStart >= start && rangeEnd < end) {
              if (rangeStart == start) {
                // Replace `[start, end]` with `[startB, endB]`.
                data[index] = rangeEnd + 1;
                data[index + 1] = end + 1;
                return data;
              }
              // Replace `[start, end]` with `[startA, endA, startB, endB]`.
              data.splice(index, 2, start, rangeStart, rangeEnd + 1, end + 1);
              return data;
            }

            // Check if only `rangeStart` is within the bounds of this pair.
            // E.g. we have `[0, 11]` and want to remove 4-20 → `[0, 4]`.
            if (rangeStart >= start && rangeStart <= end) {
              // Replace `end` with `rangeStart`.
              data[index + 1] = rangeStart;
              // Note: we cannot `return` just yet, in case any following pairs still
              // contain matching code points.
              // E.g. we have `[0, 11, 14, 31]` and want to remove 4-20
              // → `[0, 4, 21, 31]`.
            }

            // Check if only `rangeEnd` is within the bounds of this pair.
            // E.g. we have `[14, 31]` and want to remove 4-20 → `[21, 31]`.
            else if (rangeEnd >= start && rangeEnd <= end) {
                // Just replace `start`.
                data[index] = rangeEnd + 1;
                return data;
              }

            index += 2;
          }
          return data;
        };

        var dataAdd = function dataAdd(data, codePoint) {
          // Iterate over the data per `(start, end)` pair.
          var index = 0;
          var start;
          var end;
          var lastIndex = null;
          var length = data.length;
          if (codePoint < 0x0 || codePoint > 0x10FFFF) {
            throw RangeError(ERRORS.codePointRange);
          }
          while (index < length) {
            start = data[index];
            end = data[index + 1];

            // Check if the code point is already in the set.
            if (codePoint >= start && codePoint < end) {
              return data;
            }

            if (codePoint == start - 1) {
              // Just replace `start` with a new value.
              data[index] = codePoint;
              return data;
            }

            // At this point, if `start` is `greater` than `codePoint`, insert a new
            // `[start, end]` pair before the current pair, or after the current pair
            // if there is a known `lastIndex`.
            if (start > codePoint) {
              data.splice(lastIndex != null ? lastIndex + 2 : 0, 0, codePoint, codePoint + 1);
              return data;
            }

            if (codePoint == end) {
              // Check if adding this code point causes two separate ranges to become
              // a single range, e.g. `dataAdd([0, 4, 5, 10], 4)` → `[0, 10]`.
              if (codePoint + 1 == data[index + 2]) {
                data.splice(index, 4, start, data[index + 3]);
                return data;
              }
              // Else, just replace `end` with a new value.
              data[index + 1] = codePoint + 1;
              return data;
            }
            lastIndex = index;
            index += 2;
          }
          // The loop has finished; add the new pair to the end of the data set.
          data.push(codePoint, codePoint + 1);
          return data;
        };

        var dataAddData = function dataAddData(dataA, dataB) {
          // Iterate over the data per `(start, end)` pair.
          var index = 0;
          var start;
          var end;
          var data = dataA.slice();
          var length = dataB.length;
          while (index < length) {
            start = dataB[index];
            end = dataB[index + 1] - 1;
            if (start == end) {
              data = dataAdd(data, start);
            } else {
              data = dataAddRange(data, start, end);
            }
            index += 2;
          }
          return data;
        };

        var dataRemoveData = function dataRemoveData(dataA, dataB) {
          // Iterate over the data per `(start, end)` pair.
          var index = 0;
          var start;
          var end;
          var data = dataA.slice();
          var length = dataB.length;
          while (index < length) {
            start = dataB[index];
            end = dataB[index + 1] - 1;
            if (start == end) {
              data = dataRemove(data, start);
            } else {
              data = dataRemoveRange(data, start, end);
            }
            index += 2;
          }
          return data;
        };

        var dataAddRange = function dataAddRange(data, rangeStart, rangeEnd) {
          if (rangeEnd < rangeStart) {
            throw Error(ERRORS.rangeOrder);
          }
          if (rangeStart < 0x0 || rangeStart > 0x10FFFF || rangeEnd < 0x0 || rangeEnd > 0x10FFFF) {
            throw RangeError(ERRORS.codePointRange);
          }
          // Iterate over the data per `(start, end)` pair.
          var index = 0;
          var start;
          var end;
          var added = false;
          var length = data.length;
          while (index < length) {
            start = data[index];
            end = data[index + 1];

            if (added) {
              // The range has already been added to the set; at this point, we just
              // need to get rid of the following ranges in case they overlap.

              // Check if this range can be combined with the previous range.
              if (start == rangeEnd + 1) {
                data.splice(index - 1, 2);
                return data;
              }

              // Exit as soon as no more possibly overlapping pairs can be found.
              if (start > rangeEnd) {
                return data;
              }

              // E.g. `[0, 11, 12, 16]` and we’ve added 5-15, so we now have
              // `[0, 16, 12, 16]`. Remove the `12,16` part, as it lies within the
              // `0,16` range that was previously added.
              if (start >= rangeStart && start <= rangeEnd) {
                // `start` lies within the range that was previously added.

                if (end > rangeStart && end - 1 <= rangeEnd) {
                  // `end` lies within the range that was previously added as well,
                  // so remove this pair.
                  data.splice(index, 2);
                  index -= 2;
                  // Note: we cannot `return` just yet, as there may still be other
                  // overlapping pairs.
                } else {
                  // `start` lies within the range that was previously added, but
                  // `end` doesn’t. E.g. `[0, 11, 12, 31]` and we’ve added 5-15, so
                  // now we have `[0, 16, 12, 31]`. This must be written as `[0, 31]`.
                  // Remove the previously added `end` and the current `start`.
                  data.splice(index - 1, 2);
                  index -= 2;
                }

                // Note: we cannot return yet.
              }
            } else if (start == rangeEnd + 1) {
              data[index] = rangeStart;
              return data;
            }

            // Check if a new pair must be inserted *before* the current one.
            else if (start > rangeEnd) {
                data.splice(index, 0, rangeStart, rangeEnd + 1);
                return data;
              } else if (rangeStart >= start && rangeStart < end && rangeEnd + 1 <= end) {
                // The new range lies entirely within an existing range pair. No action
                // needed.
                return data;
              } else if (
              // E.g. `[0, 11]` and you add 5-15 → `[0, 16]`.
              rangeStart >= start && rangeStart < end ||
              // E.g. `[0, 3]` and you add 3-6 → `[0, 7]`.
              end == rangeStart) {
                // Replace `end` with the new value.
                data[index + 1] = rangeEnd + 1;
                // Make sure the next range pair doesn’t overlap, e.g. `[0, 11, 12, 14]`
                // and you add 5-15 → `[0, 16]`, i.e. remove the `12,14` part.
                added = true;
                // Note: we cannot `return` just yet.
              } else if (rangeStart <= start && rangeEnd + 1 >= end) {
                // The new range is a superset of the old range.
                data[index] = rangeStart;
                data[index + 1] = rangeEnd + 1;
                added = true;
              }

            index += 2;
          }
          // The loop has finished without doing anything; add the new pair to the end
          // of the data set.
          if (!added) {
            data.push(rangeStart, rangeEnd + 1);
          }
          return data;
        };

        var dataContains = function dataContains(data, codePoint) {
          var index = 0;
          var length = data.length;
          // Exit early if `codePoint` is not within `data`’s overall range.
          var start = data[index];
          var end = data[length - 1];
          if (length >= 2) {
            if (codePoint < start || codePoint > end) {
              return false;
            }
          }
          // Iterate over the data per `(start, end)` pair.
          while (index < length) {
            start = data[index];
            end = data[index + 1];
            if (codePoint >= start && codePoint < end) {
              return true;
            }
            index += 2;
          }
          return false;
        };

        var dataIntersection = function dataIntersection(data, codePoints) {
          var index = 0;
          var length = codePoints.length;
          var codePoint;
          var result = [];
          while (index < length) {
            codePoint = codePoints[index];
            if (dataContains(data, codePoint)) {
              result.push(codePoint);
            }
            ++index;
          }
          return dataFromCodePoints(result);
        };

        var dataIsEmpty = function dataIsEmpty(data) {
          return !data.length;
        };

        var dataIsSingleton = function dataIsSingleton(data) {
          // Check if the set only represents a single code point.
          return data.length == 2 && data[0] + 1 == data[1];
        };

        var dataToArray = function dataToArray(data) {
          // Iterate over the data per `(start, end)` pair.
          var index = 0;
          var start;
          var end;
          var result = [];
          var length = data.length;
          while (index < length) {
            start = data[index];
            end = data[index + 1];
            while (start < end) {
              result.push(start);
              ++start;
            }
            index += 2;
          }
          return result;
        };

        /*--------------------------------------------------------------------------*/

        // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        var floor = Math.floor;
        var highSurrogate = function highSurrogate(codePoint) {
          return parseInt(floor((codePoint - 0x10000) / 0x400) + HIGH_SURROGATE_MIN, 10);
        };

        var lowSurrogate = function lowSurrogate(codePoint) {
          return parseInt((codePoint - 0x10000) % 0x400 + LOW_SURROGATE_MIN, 10);
        };

        var stringFromCharCode = String.fromCharCode;
        var codePointToString = function codePointToString(codePoint) {
          var string;
          // https://mathiasbynens.be/notes/javascript-escapes#single
          // Note: the `\b` escape sequence for U+0008 BACKSPACE in strings has a
          // different meaning in regular expressions (word boundary), so it cannot
          // be used here.
          if (codePoint == 0x09) {
            string = '\\t';
          }
          // Note: IE < 9 treats `'\v'` as `'v'`, so avoid using it.
          // else if (codePoint == 0x0B) {
          // 	string = '\\v';
          // }
          else if (codePoint == 0x0A) {
              string = '\\n';
            } else if (codePoint == 0x0C) {
              string = '\\f';
            } else if (codePoint == 0x0D) {
              string = '\\r';
            } else if (codePoint == 0x5C) {
              string = '\\\\';
            } else if (codePoint == 0x24 || codePoint >= 0x28 && codePoint <= 0x2B || codePoint == 0x2D || codePoint == 0x2E || codePoint == 0x3F || codePoint >= 0x5B && codePoint <= 0x5E || codePoint >= 0x7B && codePoint <= 0x7D) {
              // The code point maps to an unsafe printable ASCII character;
              // backslash-escape it. Here’s the list of those symbols:
              //
              //     $()*+-.?[\]^{|}
              //
              // See #7 for more info.
              string = '\\' + stringFromCharCode(codePoint);
            } else if (codePoint >= 0x20 && codePoint <= 0x7E) {
              // The code point maps to one of these printable ASCII symbols
              // (including the space character):
              //
              //      !"#%&',/0123456789:;<=>@ABCDEFGHIJKLMNO
              //     PQRSTUVWXYZ_`abcdefghijklmnopqrstuvwxyz~
              //
              // These can safely be used directly.
              string = stringFromCharCode(codePoint);
            } else if (codePoint <= 0xFF) {
              // https://mathiasbynens.be/notes/javascript-escapes#hexadecimal
              string = '\\x' + pad(hex(codePoint), 2);
            } else {
              // `codePoint <= 0xFFFF` holds true.
              // https://mathiasbynens.be/notes/javascript-escapes#unicode
              string = '\\u' + pad(hex(codePoint), 4);
            }

          // There’s no need to account for astral symbols / surrogate pairs here,
          // since `codePointToString` is private and only used for BMP code points.
          // But if that’s what you need, just add an `else` block with this code:
          //
          //     string = '\\u' + pad(hex(highSurrogate(codePoint)), 4)
          //     	+ '\\u' + pad(hex(lowSurrogate(codePoint)), 4);

          return string;
        };

        var codePointToStringUnicode = function codePointToStringUnicode(codePoint) {
          if (codePoint <= 0xFFFF) {
            return codePointToString(codePoint);
          }
          return '\\u{' + codePoint.toString(16).toUpperCase() + '}';
        };

        var symbolToCodePoint = function symbolToCodePoint(symbol) {
          var length = symbol.length;
          var first = symbol.charCodeAt(0);
          var second;
          if (first >= HIGH_SURROGATE_MIN && first <= HIGH_SURROGATE_MAX && length > 1 // There is a next code unit.
          ) {
              // `first` is a high surrogate, and there is a next character. Assume
              // it’s a low surrogate (else it’s invalid usage of Regenerate anyway).
              second = symbol.charCodeAt(1);
              // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
              return (first - HIGH_SURROGATE_MIN) * 0x400 + second - LOW_SURROGATE_MIN + 0x10000;
            }
          return first;
        };

        var createBMPCharacterClasses = function createBMPCharacterClasses(data) {
          // Iterate over the data per `(start, end)` pair.
          var result = '';
          var index = 0;
          var start;
          var end;
          var length = data.length;
          if (dataIsSingleton(data)) {
            return codePointToString(data[0]);
          }
          while (index < length) {
            start = data[index];
            end = data[index + 1] - 1; // Note: the `- 1` makes `end` inclusive.
            if (start == end) {
              result += codePointToString(start);
            } else if (start + 1 == end) {
              result += codePointToString(start) + codePointToString(end);
            } else {
              result += codePointToString(start) + '-' + codePointToString(end);
            }
            index += 2;
          }
          return '[' + result + ']';
        };

        var createUnicodeCharacterClasses = function createUnicodeCharacterClasses(data) {
          // Iterate over the data per `(start, end)` pair.
          var result = '';
          var index = 0;
          var start;
          var end;
          var length = data.length;
          if (dataIsSingleton(data)) {
            return codePointToStringUnicode(data[0]);
          }
          while (index < length) {
            start = data[index];
            end = data[index + 1] - 1; // Note: the `- 1` makes `end` inclusive.
            if (start == end) {
              result += codePointToStringUnicode(start);
            } else if (start + 1 == end) {
              result += codePointToStringUnicode(start) + codePointToStringUnicode(end);
            } else {
              result += codePointToStringUnicode(start) + '-' + codePointToStringUnicode(end);
            }
            index += 2;
          }
          return '[' + result + ']';
        };

        var splitAtBMP = function splitAtBMP(data) {
          // Iterate over the data per `(start, end)` pair.
          var loneHighSurrogates = [];
          var loneLowSurrogates = [];
          var bmp = [];
          var astral = [];
          var index = 0;
          var start;
          var end;
          var length = data.length;
          while (index < length) {
            start = data[index];
            end = data[index + 1] - 1; // Note: the `- 1` makes `end` inclusive.

            if (start < HIGH_SURROGATE_MIN) {

              // The range starts and ends before the high surrogate range.
              // E.g. (0, 0x10).
              if (end < HIGH_SURROGATE_MIN) {
                bmp.push(start, end + 1);
              }

              // The range starts before the high surrogate range and ends within it.
              // E.g. (0, 0xD855).
              if (end >= HIGH_SURROGATE_MIN && end <= HIGH_SURROGATE_MAX) {
                bmp.push(start, HIGH_SURROGATE_MIN);
                loneHighSurrogates.push(HIGH_SURROGATE_MIN, end + 1);
              }

              // The range starts before the high surrogate range and ends in the low
              // surrogate range. E.g. (0, 0xDCFF).
              if (end >= LOW_SURROGATE_MIN && end <= LOW_SURROGATE_MAX) {
                bmp.push(start, HIGH_SURROGATE_MIN);
                loneHighSurrogates.push(HIGH_SURROGATE_MIN, HIGH_SURROGATE_MAX + 1);
                loneLowSurrogates.push(LOW_SURROGATE_MIN, end + 1);
              }

              // The range starts before the high surrogate range and ends after the
              // low surrogate range. E.g. (0, 0x10FFFF).
              if (end > LOW_SURROGATE_MAX) {
                bmp.push(start, HIGH_SURROGATE_MIN);
                loneHighSurrogates.push(HIGH_SURROGATE_MIN, HIGH_SURROGATE_MAX + 1);
                loneLowSurrogates.push(LOW_SURROGATE_MIN, LOW_SURROGATE_MAX + 1);
                if (end <= 0xFFFF) {
                  bmp.push(LOW_SURROGATE_MAX + 1, end + 1);
                } else {
                  bmp.push(LOW_SURROGATE_MAX + 1, 0xFFFF + 1);
                  astral.push(0xFFFF + 1, end + 1);
                }
              }
            } else if (start >= HIGH_SURROGATE_MIN && start <= HIGH_SURROGATE_MAX) {

              // The range starts and ends in the high surrogate range.
              // E.g. (0xD855, 0xD866).
              if (end >= HIGH_SURROGATE_MIN && end <= HIGH_SURROGATE_MAX) {
                loneHighSurrogates.push(start, end + 1);
              }

              // The range starts in the high surrogate range and ends in the low
              // surrogate range. E.g. (0xD855, 0xDCFF).
              if (end >= LOW_SURROGATE_MIN && end <= LOW_SURROGATE_MAX) {
                loneHighSurrogates.push(start, HIGH_SURROGATE_MAX + 1);
                loneLowSurrogates.push(LOW_SURROGATE_MIN, end + 1);
              }

              // The range starts in the high surrogate range and ends after the low
              // surrogate range. E.g. (0xD855, 0x10FFFF).
              if (end > LOW_SURROGATE_MAX) {
                loneHighSurrogates.push(start, HIGH_SURROGATE_MAX + 1);
                loneLowSurrogates.push(LOW_SURROGATE_MIN, LOW_SURROGATE_MAX + 1);
                if (end <= 0xFFFF) {
                  bmp.push(LOW_SURROGATE_MAX + 1, end + 1);
                } else {
                  bmp.push(LOW_SURROGATE_MAX + 1, 0xFFFF + 1);
                  astral.push(0xFFFF + 1, end + 1);
                }
              }
            } else if (start >= LOW_SURROGATE_MIN && start <= LOW_SURROGATE_MAX) {

              // The range starts and ends in the low surrogate range.
              // E.g. (0xDCFF, 0xDDFF).
              if (end >= LOW_SURROGATE_MIN && end <= LOW_SURROGATE_MAX) {
                loneLowSurrogates.push(start, end + 1);
              }

              // The range starts in the low surrogate range and ends after the low
              // surrogate range. E.g. (0xDCFF, 0x10FFFF).
              if (end > LOW_SURROGATE_MAX) {
                loneLowSurrogates.push(start, LOW_SURROGATE_MAX + 1);
                if (end <= 0xFFFF) {
                  bmp.push(LOW_SURROGATE_MAX + 1, end + 1);
                } else {
                  bmp.push(LOW_SURROGATE_MAX + 1, 0xFFFF + 1);
                  astral.push(0xFFFF + 1, end + 1);
                }
              }
            } else if (start > LOW_SURROGATE_MAX && start <= 0xFFFF) {

              // The range starts and ends after the low surrogate range.
              // E.g. (0xFFAA, 0x10FFFF).
              if (end <= 0xFFFF) {
                bmp.push(start, end + 1);
              } else {
                bmp.push(start, 0xFFFF + 1);
                astral.push(0xFFFF + 1, end + 1);
              }
            } else {

              // The range starts and ends in the astral range.
              astral.push(start, end + 1);
            }

            index += 2;
          }
          return {
            'loneHighSurrogates': loneHighSurrogates,
            'loneLowSurrogates': loneLowSurrogates,
            'bmp': bmp,
            'astral': astral
          };
        };

        var optimizeSurrogateMappings = function optimizeSurrogateMappings(surrogateMappings) {
          var result = [];
          var tmpLow = [];
          var addLow = false;
          var mapping;
          var nextMapping;
          var highSurrogates;
          var lowSurrogates;
          var nextHighSurrogates;
          var nextLowSurrogates;
          var index = -1;
          var length = surrogateMappings.length;
          while (++index < length) {
            mapping = surrogateMappings[index];
            nextMapping = surrogateMappings[index + 1];
            if (!nextMapping) {
              result.push(mapping);
              continue;
            }
            highSurrogates = mapping[0];
            lowSurrogates = mapping[1];
            nextHighSurrogates = nextMapping[0];
            nextLowSurrogates = nextMapping[1];

            // Check for identical high surrogate ranges.
            tmpLow = lowSurrogates;
            while (nextHighSurrogates && highSurrogates[0] == nextHighSurrogates[0] && highSurrogates[1] == nextHighSurrogates[1]) {
              // Merge with the next item.
              if (dataIsSingleton(nextLowSurrogates)) {
                tmpLow = dataAdd(tmpLow, nextLowSurrogates[0]);
              } else {
                tmpLow = dataAddRange(tmpLow, nextLowSurrogates[0], nextLowSurrogates[1] - 1);
              }
              ++index;
              mapping = surrogateMappings[index];
              highSurrogates = mapping[0];
              lowSurrogates = mapping[1];
              nextMapping = surrogateMappings[index + 1];
              nextHighSurrogates = nextMapping && nextMapping[0];
              nextLowSurrogates = nextMapping && nextMapping[1];
              addLow = true;
            }
            result.push([highSurrogates, addLow ? tmpLow : lowSurrogates]);
            addLow = false;
          }
          return optimizeByLowSurrogates(result);
        };

        var optimizeByLowSurrogates = function optimizeByLowSurrogates(surrogateMappings) {
          if (surrogateMappings.length == 1) {
            return surrogateMappings;
          }
          var index = -1;
          var innerIndex = -1;
          while (++index < surrogateMappings.length) {
            var mapping = surrogateMappings[index];
            var lowSurrogates = mapping[1];
            var lowSurrogateStart = lowSurrogates[0];
            var lowSurrogateEnd = lowSurrogates[1];
            innerIndex = index; // Note: the loop starts at the next index.
            while (++innerIndex < surrogateMappings.length) {
              var otherMapping = surrogateMappings[innerIndex];
              var otherLowSurrogates = otherMapping[1];
              var otherLowSurrogateStart = otherLowSurrogates[0];
              var otherLowSurrogateEnd = otherLowSurrogates[1];
              if (lowSurrogateStart == otherLowSurrogateStart && lowSurrogateEnd == otherLowSurrogateEnd) {
                // Add the code points in the other item to this one.
                if (dataIsSingleton(otherMapping[0])) {
                  mapping[0] = dataAdd(mapping[0], otherMapping[0][0]);
                } else {
                  mapping[0] = dataAddRange(mapping[0], otherMapping[0][0], otherMapping[0][1] - 1);
                }
                // Remove the other, now redundant, item.
                surrogateMappings.splice(innerIndex, 1);
                --innerIndex;
              }
            }
          }
          return surrogateMappings;
        };

        var surrogateSet = function surrogateSet(data) {
          // Exit early if `data` is an empty set.
          if (!data.length) {
            return [];
          }

          // Iterate over the data per `(start, end)` pair.
          var index = 0;
          var start;
          var end;
          var startHigh;
          var startLow;
          var prevStartHigh = 0;
          var prevEndHigh = 0;
          var tmpLow = [];
          var endHigh;
          var endLow;
          var surrogateMappings = [];
          var length = data.length;
          var dataHigh = [];
          while (index < length) {
            start = data[index];
            end = data[index + 1] - 1;

            startHigh = highSurrogate(start);
            startLow = lowSurrogate(start);
            endHigh = highSurrogate(end);
            endLow = lowSurrogate(end);

            var startsWithLowestLowSurrogate = startLow == LOW_SURROGATE_MIN;
            var endsWithHighestLowSurrogate = endLow == LOW_SURROGATE_MAX;
            var complete = false;

            // Append the previous high-surrogate-to-low-surrogate mappings.
            // Step 1: `(startHigh, startLow)` to `(startHigh, LOW_SURROGATE_MAX)`.
            if (startHigh == endHigh || startsWithLowestLowSurrogate && endsWithHighestLowSurrogate) {
              surrogateMappings.push([[startHigh, endHigh + 1], [startLow, endLow + 1]]);
              complete = true;
            } else {
              surrogateMappings.push([[startHigh, startHigh + 1], [startLow, LOW_SURROGATE_MAX + 1]]);
            }

            // Step 2: `(startHigh + 1, LOW_SURROGATE_MIN)` to
            // `(endHigh - 1, LOW_SURROGATE_MAX)`.
            if (!complete && startHigh + 1 < endHigh) {
              if (endsWithHighestLowSurrogate) {
                // Combine step 2 and step 3.
                surrogateMappings.push([[startHigh + 1, endHigh + 1], [LOW_SURROGATE_MIN, endLow + 1]]);
                complete = true;
              } else {
                surrogateMappings.push([[startHigh + 1, endHigh], [LOW_SURROGATE_MIN, LOW_SURROGATE_MAX + 1]]);
              }
            }

            // Step 3. `(endHigh, LOW_SURROGATE_MIN)` to `(endHigh, endLow)`.
            if (!complete) {
              surrogateMappings.push([[endHigh, endHigh + 1], [LOW_SURROGATE_MIN, endLow + 1]]);
            }

            prevStartHigh = startHigh;
            prevEndHigh = endHigh;

            index += 2;
          }

          // The format of `surrogateMappings` is as follows:
          //
          //     [ surrogateMapping1, surrogateMapping2 ]
          //
          // i.e.:
          //
          //     [
          //       [ highSurrogates1, lowSurrogates1 ],
          //       [ highSurrogates2, lowSurrogates2 ]
          //     ]
          return optimizeSurrogateMappings(surrogateMappings);
        };

        var createSurrogateCharacterClasses = function createSurrogateCharacterClasses(surrogateMappings) {
          var result = [];
          forEach(surrogateMappings, function (surrogateMapping) {
            var highSurrogates = surrogateMapping[0];
            var lowSurrogates = surrogateMapping[1];
            result.push(createBMPCharacterClasses(highSurrogates) + createBMPCharacterClasses(lowSurrogates));
          });
          return result.join('|');
        };

        var createCharacterClassesFromData = function createCharacterClassesFromData(data, bmpOnly, hasUnicodeFlag) {
          if (hasUnicodeFlag) {
            return createUnicodeCharacterClasses(data);
          }
          var result = [];

          var parts = splitAtBMP(data);
          var loneHighSurrogates = parts.loneHighSurrogates;
          var loneLowSurrogates = parts.loneLowSurrogates;
          var bmp = parts.bmp;
          var astral = parts.astral;
          var hasAstral = !dataIsEmpty(parts.astral);
          var hasLoneHighSurrogates = !dataIsEmpty(loneHighSurrogates);
          var hasLoneLowSurrogates = !dataIsEmpty(loneLowSurrogates);

          var surrogateMappings = surrogateSet(astral);

          if (bmpOnly) {
            bmp = dataAddData(bmp, loneHighSurrogates);
            hasLoneHighSurrogates = false;
            bmp = dataAddData(bmp, loneLowSurrogates);
            hasLoneLowSurrogates = false;
          }

          if (!dataIsEmpty(bmp)) {
            // The data set contains BMP code points that are not high surrogates
            // needed for astral code points in the set.
            result.push(createBMPCharacterClasses(bmp));
          }
          if (surrogateMappings.length) {
            // The data set contains astral code points; append character classes
            // based on their surrogate pairs.
            result.push(createSurrogateCharacterClasses(surrogateMappings));
          }
          // https://gist.github.com/mathiasbynens/bbe7f870208abcfec860
          if (hasLoneHighSurrogates) {
            result.push(createBMPCharacterClasses(loneHighSurrogates) +
            // Make sure the high surrogates aren’t part of a surrogate pair.
            '(?![\\uDC00-\\uDFFF])');
          }
          if (hasLoneLowSurrogates) {
            result.push(
            // It is not possible to accurately assert the low surrogates aren’t
            // part of a surrogate pair, since JavaScript regular expressions do
            // not support lookbehind.
            '(?:[^\\uD800-\\uDBFF]|^)' + createBMPCharacterClasses(loneLowSurrogates));
          }
          return result.join('|');
        };

        /*--------------------------------------------------------------------------*/

        // `regenerate` can be used as a constructor (and new methods can be added to
        // its prototype) but also as a regular function, the latter of which is the
        // documented and most common usage. For that reason, it’s not capitalized.
        var regenerate = function regenerate(value) {
          if (arguments.length > 1) {
            value = slice.call(arguments);
          }
          if (this instanceof regenerate) {
            this.data = [];
            return value ? this.add(value) : this;
          }
          return new regenerate().add(value);
        };

        regenerate.version = '1.3.1';

        var proto = regenerate.prototype;
        extend(proto, {
          'add': function add(value) {
            var $this = this;
            if (value == null) {
              return $this;
            }
            if (value instanceof regenerate) {
              // Allow passing other Regenerate instances.
              $this.data = dataAddData($this.data, value.data);
              return $this;
            }
            if (arguments.length > 1) {
              value = slice.call(arguments);
            }
            if (isArray(value)) {
              forEach(value, function (item) {
                $this.add(item);
              });
              return $this;
            }
            $this.data = dataAdd($this.data, isNumber(value) ? value : symbolToCodePoint(value));
            return $this;
          },
          'remove': function remove(value) {
            var $this = this;
            if (value == null) {
              return $this;
            }
            if (value instanceof regenerate) {
              // Allow passing other Regenerate instances.
              $this.data = dataRemoveData($this.data, value.data);
              return $this;
            }
            if (arguments.length > 1) {
              value = slice.call(arguments);
            }
            if (isArray(value)) {
              forEach(value, function (item) {
                $this.remove(item);
              });
              return $this;
            }
            $this.data = dataRemove($this.data, isNumber(value) ? value : symbolToCodePoint(value));
            return $this;
          },
          'addRange': function addRange(start, end) {
            var $this = this;
            $this.data = dataAddRange($this.data, isNumber(start) ? start : symbolToCodePoint(start), isNumber(end) ? end : symbolToCodePoint(end));
            return $this;
          },
          'removeRange': function removeRange(start, end) {
            var $this = this;
            var startCodePoint = isNumber(start) ? start : symbolToCodePoint(start);
            var endCodePoint = isNumber(end) ? end : symbolToCodePoint(end);
            $this.data = dataRemoveRange($this.data, startCodePoint, endCodePoint);
            return $this;
          },
          'intersection': function intersection(argument) {
            var $this = this;
            // Allow passing other Regenerate instances.
            // TODO: Optimize this by writing and using `dataIntersectionData()`.
            var array = argument instanceof regenerate ? dataToArray(argument.data) : argument;
            $this.data = dataIntersection($this.data, array);
            return $this;
          },
          'contains': function contains(codePoint) {
            return dataContains(this.data, isNumber(codePoint) ? codePoint : symbolToCodePoint(codePoint));
          },
          'clone': function clone() {
            var set$$1 = new regenerate();
            set$$1.data = this.data.slice(0);
            return set$$1;
          },
          'toString': function toString(options) {
            var result = createCharacterClassesFromData(this.data, options ? options.bmpOnly : false, options ? options.hasUnicodeFlag : false);
            if (!result) {
              // For an empty set, return something that can be inserted `/here/` to
              // form a valid regular expression. Avoid `(?:)` since that matches the
              // empty string.
              return '[]';
            }
            // Use `\0` instead of `\x00` where possible.
            return result.replace(regexNull, '\\0$1');
          },
          'toRegExp': function toRegExp(flags) {
            var pattern = this.toString(flags && flags.indexOf('u') != -1 ? { 'hasUnicodeFlag': true } : null);
            return RegExp(pattern, flags || '');
          },
          'valueOf': function valueOf() {
            // Note: `valueOf` is aliased as `toArray`.
            return dataToArray(this.data);
          }
        });

        proto.toArray = proto.valueOf;

        // Some AMD build optimizers, like r.js, check for specific condition patterns
        // like the following:
        if (false) {
          undefined(function () {
            return regenerate;
          });
        } else if (freeExports && !freeExports.nodeType) {
          if (freeModule) {
            // in Node.js, io.js, or RingoJS v0.8.0+
            freeModule.exports = regenerate;
          } else {
            // in Narwhal or RingoJS v0.7.0-
            freeExports.regenerate = regenerate;
          }
        } else {
          // in Rhino or a web browser
          root.regenerate = regenerate;
        }
      })(__commonjs_global);
    });

    var require$$0$2 = regenerate && (typeof regenerate === 'undefined' ? 'undefined' : _typeof(regenerate)) === 'object' && 'default' in regenerate ? regenerate['default'] : regenerate;

    var characterClassEscapeSets = __commonjs(function (module, exports) {
      // Generated by `/scripts/character-class-escape-sets.js`. Do not edit.
      var regenerate = require$$0$2;

      exports.REGULAR = {
        'd': regenerate().addRange(0x30, 0x39),
        'D': regenerate().addRange(0x0, 0x2F).addRange(0x3A, 0xFFFF),
        's': regenerate(0x20, 0xA0, 0x1680, 0x202F, 0x205F, 0x3000, 0xFEFF).addRange(0x9, 0xD).addRange(0x2000, 0x200A).addRange(0x2028, 0x2029),
        'S': regenerate().addRange(0x0, 0x8).addRange(0xE, 0x1F).addRange(0x21, 0x9F).addRange(0xA1, 0x167F).addRange(0x1681, 0x1FFF).addRange(0x200B, 0x2027).addRange(0x202A, 0x202E).addRange(0x2030, 0x205E).addRange(0x2060, 0x2FFF).addRange(0x3001, 0xFEFE).addRange(0xFF00, 0xFFFF),
        'w': regenerate(0x5F).addRange(0x30, 0x39).addRange(0x41, 0x5A).addRange(0x61, 0x7A),
        'W': regenerate(0x60).addRange(0x0, 0x2F).addRange(0x3A, 0x40).addRange(0x5B, 0x5E).addRange(0x7B, 0xFFFF)
      };

      exports.UNICODE = {
        'd': regenerate().addRange(0x30, 0x39),
        'D': regenerate().addRange(0x0, 0x2F).addRange(0x3A, 0x10FFFF),
        's': regenerate(0x20, 0xA0, 0x1680, 0x202F, 0x205F, 0x3000, 0xFEFF).addRange(0x9, 0xD).addRange(0x2000, 0x200A).addRange(0x2028, 0x2029),
        'S': regenerate().addRange(0x0, 0x8).addRange(0xE, 0x1F).addRange(0x21, 0x9F).addRange(0xA1, 0x167F).addRange(0x1681, 0x1FFF).addRange(0x200B, 0x2027).addRange(0x202A, 0x202E).addRange(0x2030, 0x205E).addRange(0x2060, 0x2FFF).addRange(0x3001, 0xFEFE).addRange(0xFF00, 0x10FFFF),
        'w': regenerate(0x5F).addRange(0x30, 0x39).addRange(0x41, 0x5A).addRange(0x61, 0x7A),
        'W': regenerate(0x60).addRange(0x0, 0x2F).addRange(0x3A, 0x40).addRange(0x5B, 0x5E).addRange(0x7B, 0x10FFFF)
      };

      exports.UNICODE_IGNORE_CASE = {
        'd': regenerate().addRange(0x30, 0x39),
        'D': regenerate().addRange(0x0, 0x2F).addRange(0x3A, 0x10FFFF),
        's': regenerate(0x20, 0xA0, 0x1680, 0x202F, 0x205F, 0x3000, 0xFEFF).addRange(0x9, 0xD).addRange(0x2000, 0x200A).addRange(0x2028, 0x2029),
        'S': regenerate().addRange(0x0, 0x8).addRange(0xE, 0x1F).addRange(0x21, 0x9F).addRange(0xA1, 0x167F).addRange(0x1681, 0x1FFF).addRange(0x200B, 0x2027).addRange(0x202A, 0x202E).addRange(0x2030, 0x205E).addRange(0x2060, 0x2FFF).addRange(0x3001, 0xFEFE).addRange(0xFF00, 0x10FFFF),
        'w': regenerate(0x5F, 0x17F, 0x212A).addRange(0x30, 0x39).addRange(0x41, 0x5A).addRange(0x61, 0x7A),
        'W': regenerate(0x4B, 0x53, 0x60).addRange(0x0, 0x2F).addRange(0x3A, 0x40).addRange(0x5B, 0x5E).addRange(0x7B, 0x10FFFF)
      };
    });

    var require$$0$1 = characterClassEscapeSets && (typeof characterClassEscapeSets === 'undefined' ? 'undefined' : _typeof(characterClassEscapeSets)) === 'object' && 'default' in characterClassEscapeSets ? characterClassEscapeSets['default'] : characterClassEscapeSets;

    var require$$1 = {
      "75": 8490,
      "83": 383,
      "107": 8490,
      "115": 383,
      "181": 924,
      "197": 8491,
      "383": 83,
      "452": 453,
      "453": 452,
      "455": 456,
      "456": 455,
      "458": 459,
      "459": 458,
      "497": 498,
      "498": 497,
      "837": 8126,
      "914": 976,
      "917": 1013,
      "920": 1012,
      "921": 8126,
      "922": 1008,
      "924": 181,
      "928": 982,
      "929": 1009,
      "931": 962,
      "934": 981,
      "937": 8486,
      "962": 931,
      "976": 914,
      "977": 1012,
      "981": 934,
      "982": 928,
      "1008": 922,
      "1009": 929,
      "1012": [920, 977],
      "1013": 917,
      "7776": 7835,
      "7835": 7776,
      "8126": [837, 921],
      "8486": 937,
      "8490": 75,
      "8491": 197,
      "66560": 66600,
      "66561": 66601,
      "66562": 66602,
      "66563": 66603,
      "66564": 66604,
      "66565": 66605,
      "66566": 66606,
      "66567": 66607,
      "66568": 66608,
      "66569": 66609,
      "66570": 66610,
      "66571": 66611,
      "66572": 66612,
      "66573": 66613,
      "66574": 66614,
      "66575": 66615,
      "66576": 66616,
      "66577": 66617,
      "66578": 66618,
      "66579": 66619,
      "66580": 66620,
      "66581": 66621,
      "66582": 66622,
      "66583": 66623,
      "66584": 66624,
      "66585": 66625,
      "66586": 66626,
      "66587": 66627,
      "66588": 66628,
      "66589": 66629,
      "66590": 66630,
      "66591": 66631,
      "66592": 66632,
      "66593": 66633,
      "66594": 66634,
      "66595": 66635,
      "66596": 66636,
      "66597": 66637,
      "66598": 66638,
      "66599": 66639,
      "66600": 66560,
      "66601": 66561,
      "66602": 66562,
      "66603": 66563,
      "66604": 66564,
      "66605": 66565,
      "66606": 66566,
      "66607": 66567,
      "66608": 66568,
      "66609": 66569,
      "66610": 66570,
      "66611": 66571,
      "66612": 66572,
      "66613": 66573,
      "66614": 66574,
      "66615": 66575,
      "66616": 66576,
      "66617": 66577,
      "66618": 66578,
      "66619": 66579,
      "66620": 66580,
      "66621": 66581,
      "66622": 66582,
      "66623": 66583,
      "66624": 66584,
      "66625": 66585,
      "66626": 66586,
      "66627": 66587,
      "66628": 66588,
      "66629": 66589,
      "66630": 66590,
      "66631": 66591,
      "66632": 66592,
      "66633": 66593,
      "66634": 66594,
      "66635": 66595,
      "66636": 66596,
      "66637": 66597,
      "66638": 66598,
      "66639": 66599,
      "68736": 68800,
      "68737": 68801,
      "68738": 68802,
      "68739": 68803,
      "68740": 68804,
      "68741": 68805,
      "68742": 68806,
      "68743": 68807,
      "68744": 68808,
      "68745": 68809,
      "68746": 68810,
      "68747": 68811,
      "68748": 68812,
      "68749": 68813,
      "68750": 68814,
      "68751": 68815,
      "68752": 68816,
      "68753": 68817,
      "68754": 68818,
      "68755": 68819,
      "68756": 68820,
      "68757": 68821,
      "68758": 68822,
      "68759": 68823,
      "68760": 68824,
      "68761": 68825,
      "68762": 68826,
      "68763": 68827,
      "68764": 68828,
      "68765": 68829,
      "68766": 68830,
      "68767": 68831,
      "68768": 68832,
      "68769": 68833,
      "68770": 68834,
      "68771": 68835,
      "68772": 68836,
      "68773": 68837,
      "68774": 68838,
      "68775": 68839,
      "68776": 68840,
      "68777": 68841,
      "68778": 68842,
      "68779": 68843,
      "68780": 68844,
      "68781": 68845,
      "68782": 68846,
      "68783": 68847,
      "68784": 68848,
      "68785": 68849,
      "68786": 68850,
      "68800": 68736,
      "68801": 68737,
      "68802": 68738,
      "68803": 68739,
      "68804": 68740,
      "68805": 68741,
      "68806": 68742,
      "68807": 68743,
      "68808": 68744,
      "68809": 68745,
      "68810": 68746,
      "68811": 68747,
      "68812": 68748,
      "68813": 68749,
      "68814": 68750,
      "68815": 68751,
      "68816": 68752,
      "68817": 68753,
      "68818": 68754,
      "68819": 68755,
      "68820": 68756,
      "68821": 68757,
      "68822": 68758,
      "68823": 68759,
      "68824": 68760,
      "68825": 68761,
      "68826": 68762,
      "68827": 68763,
      "68828": 68764,
      "68829": 68765,
      "68830": 68766,
      "68831": 68767,
      "68832": 68768,
      "68833": 68769,
      "68834": 68770,
      "68835": 68771,
      "68836": 68772,
      "68837": 68773,
      "68838": 68774,
      "68839": 68775,
      "68840": 68776,
      "68841": 68777,
      "68842": 68778,
      "68843": 68779,
      "68844": 68780,
      "68845": 68781,
      "68846": 68782,
      "68847": 68783,
      "68848": 68784,
      "68849": 68785,
      "68850": 68786,
      "71840": 71872,
      "71841": 71873,
      "71842": 71874,
      "71843": 71875,
      "71844": 71876,
      "71845": 71877,
      "71846": 71878,
      "71847": 71879,
      "71848": 71880,
      "71849": 71881,
      "71850": 71882,
      "71851": 71883,
      "71852": 71884,
      "71853": 71885,
      "71854": 71886,
      "71855": 71887,
      "71856": 71888,
      "71857": 71889,
      "71858": 71890,
      "71859": 71891,
      "71860": 71892,
      "71861": 71893,
      "71862": 71894,
      "71863": 71895,
      "71864": 71896,
      "71865": 71897,
      "71866": 71898,
      "71867": 71899,
      "71868": 71900,
      "71869": 71901,
      "71870": 71902,
      "71871": 71903,
      "71872": 71840,
      "71873": 71841,
      "71874": 71842,
      "71875": 71843,
      "71876": 71844,
      "71877": 71845,
      "71878": 71846,
      "71879": 71847,
      "71880": 71848,
      "71881": 71849,
      "71882": 71850,
      "71883": 71851,
      "71884": 71852,
      "71885": 71853,
      "71886": 71854,
      "71887": 71855,
      "71888": 71856,
      "71889": 71857,
      "71890": 71858,
      "71891": 71859,
      "71892": 71860,
      "71893": 71861,
      "71894": 71862,
      "71895": 71863,
      "71896": 71864,
      "71897": 71865,
      "71898": 71866,
      "71899": 71867,
      "71900": 71868,
      "71901": 71869,
      "71902": 71870,
      "71903": 71871
    };

    var parser = __commonjs(function (module) {
      // regjsparser
      //
      // ==================================================================
      //
      // See ECMA-262 Standard: 15.10.1
      //
      // NOTE: The ECMA-262 standard uses the term "Assertion" for /^/. Here the
      //   term "Anchor" is used.
      //
      // Pattern ::
      //      Disjunction
      //
      // Disjunction ::
      //      Alternative
      //      Alternative | Disjunction
      //
      // Alternative ::
      //      [empty]
      //      Alternative Term
      //
      // Term ::
      //      Anchor
      //      Atom
      //      Atom Quantifier
      //
      // Anchor ::
      //      ^
      //      $
      //      \ b
      //      \ B
      //      ( ? = Disjunction )
      //      ( ? ! Disjunction )
      //
      // Quantifier ::
      //      QuantifierPrefix
      //      QuantifierPrefix ?
      //
      // QuantifierPrefix ::
      //      *
      //      +
      //      ?
      //      { DecimalDigits }
      //      { DecimalDigits , }
      //      { DecimalDigits , DecimalDigits }
      //
      // Atom ::
      //      PatternCharacter
      //      .
      //      \ AtomEscape
      //      CharacterClass
      //      ( Disjunction )
      //      ( ? : Disjunction )
      //
      // PatternCharacter ::
      //      SourceCharacter but not any of: ^ $ \ . * + ? ( ) [ ] { } |
      //
      // AtomEscape ::
      //      DecimalEscape
      //      CharacterEscape
      //      CharacterClassEscape
      //
      // CharacterEscape[U] ::
      //      ControlEscape
      //      c ControlLetter
      //      HexEscapeSequence
      //      RegExpUnicodeEscapeSequence[?U] (ES6)
      //      IdentityEscape[?U]
      //
      // ControlEscape ::
      //      one of f n r t v
      // ControlLetter ::
      //      one of
      //          a b c d e f g h i j k l m n o p q r s t u v w x y z
      //          A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
      //
      // IdentityEscape ::
      //      SourceCharacter but not IdentifierPart
      //      <ZWJ>
      //      <ZWNJ>
      //
      // DecimalEscape ::
      //      DecimalIntegerLiteral [lookahead ∉ DecimalDigit]
      //
      // CharacterClassEscape ::
      //      one of d D s S w W
      //
      // CharacterClass ::
      //      [ [lookahead ∉ {^}] ClassRanges ]
      //      [ ^ ClassRanges ]
      //
      // ClassRanges ::
      //      [empty]
      //      NonemptyClassRanges
      //
      // NonemptyClassRanges ::
      //      ClassAtom
      //      ClassAtom NonemptyClassRangesNoDash
      //      ClassAtom - ClassAtom ClassRanges
      //
      // NonemptyClassRangesNoDash ::
      //      ClassAtom
      //      ClassAtomNoDash NonemptyClassRangesNoDash
      //      ClassAtomNoDash - ClassAtom ClassRanges
      //
      // ClassAtom ::
      //      -
      //      ClassAtomNoDash
      //
      // ClassAtomNoDash ::
      //      SourceCharacter but not one of \ or ] or -
      //      \ ClassEscape
      //
      // ClassEscape ::
      //      DecimalEscape
      //      b
      //      CharacterEscape
      //      CharacterClassEscape

      (function () {

        function parse(str, flags) {
          function addRaw(node) {
            node.raw = str.substring(node.range[0], node.range[1]);
            return node;
          }

          function updateRawStart(node, start) {
            node.range[0] = start;
            return addRaw(node);
          }

          function createAnchor(kind, rawLength) {
            return addRaw({
              type: 'anchor',
              kind: kind,
              range: [pos - rawLength, pos]
            });
          }

          function createValue(kind, codePoint, from, to) {
            return addRaw({
              type: 'value',
              kind: kind,
              codePoint: codePoint,
              range: [from, to]
            });
          }

          function createEscaped(kind, codePoint, value, fromOffset) {
            fromOffset = fromOffset || 0;
            return createValue(kind, codePoint, pos - (value.length + fromOffset), pos);
          }

          function createCharacter(matches) {
            var _char = matches[0];
            var first = _char.charCodeAt(0);
            if (hasUnicodeFlag) {
              var second;
              if (_char.length === 1 && first >= 0xD800 && first <= 0xDBFF) {
                second = lookahead().charCodeAt(0);
                if (second >= 0xDC00 && second <= 0xDFFF) {
                  // Unicode surrogate pair
                  pos++;
                  return createValue('symbol', (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000, pos - 2, pos);
                }
              }
            }
            return createValue('symbol', first, pos - 1, pos);
          }

          function createDisjunction(alternatives, from, to) {
            return addRaw({
              type: 'disjunction',
              body: alternatives,
              range: [from, to]
            });
          }

          function createDot() {
            return addRaw({
              type: 'dot',
              range: [pos - 1, pos]
            });
          }

          function createCharacterClassEscape(value) {
            return addRaw({
              type: 'characterClassEscape',
              value: value,
              range: [pos - 2, pos]
            });
          }

          function createReference(matchIndex) {
            return addRaw({
              type: 'reference',
              matchIndex: parseInt(matchIndex, 10),
              range: [pos - 1 - matchIndex.length, pos]
            });
          }

          function createGroup(behavior, disjunction, from, to) {
            return addRaw({
              type: 'group',
              behavior: behavior,
              body: disjunction,
              range: [from, to]
            });
          }

          function createQuantifier(min, max, from, to) {
            if (to == null) {
              from = pos - 1;
              to = pos;
            }

            return addRaw({
              type: 'quantifier',
              min: min,
              max: max,
              greedy: true,
              body: null, // set later on
              range: [from, to]
            });
          }

          function createAlternative(terms, from, to) {
            return addRaw({
              type: 'alternative',
              body: terms,
              range: [from, to]
            });
          }

          function createCharacterClass(classRanges, negative, from, to) {
            return addRaw({
              type: 'characterClass',
              body: classRanges,
              negative: negative,
              range: [from, to]
            });
          }

          function createClassRange(min, max, from, to) {
            // See 15.10.2.15:
            if (min.codePoint > max.codePoint) {
              bail('invalid range in character class', min.raw + '-' + max.raw, from, to);
            }

            return addRaw({
              type: 'characterClassRange',
              min: min,
              max: max,
              range: [from, to]
            });
          }

          function flattenBody(body) {
            if (body.type === 'alternative') {
              return body.body;
            } else {
              return [body];
            }
          }

          function incr(amount) {
            amount = amount || 1;
            var res = str.substring(pos, pos + amount);
            pos += amount || 1;
            return res;
          }

          function skip(value) {
            if (!match(value)) {
              bail('character', value);
            }
          }

          function match(value) {
            if (str.indexOf(value, pos) === pos) {
              return incr(value.length);
            }
          }

          function lookahead() {
            return str[pos];
          }

          function current(value) {
            return str.indexOf(value, pos) === pos;
          }

          function next(value) {
            return str[pos + 1] === value;
          }

          function matchReg(regExp) {
            var subStr = str.substring(pos);
            var res = subStr.match(regExp);
            if (res) {
              res.range = [];
              res.range[0] = pos;
              incr(res[0].length);
              res.range[1] = pos;
            }
            return res;
          }

          function parseDisjunction() {
            // Disjunction ::
            //      Alternative
            //      Alternative | Disjunction
            var res = [],
                from = pos;
            res.push(parseAlternative());

            while (match('|')) {
              res.push(parseAlternative());
            }

            if (res.length === 1) {
              return res[0];
            }

            return createDisjunction(res, from, pos);
          }

          function parseAlternative() {
            var res = [],
                from = pos;
            var term;

            // Alternative ::
            //      [empty]
            //      Alternative Term
            while (term = parseTerm()) {
              res.push(term);
            }

            if (res.length === 1) {
              return res[0];
            }

            return createAlternative(res, from, pos);
          }

          function parseTerm() {
            // Term ::
            //      Anchor
            //      Atom
            //      Atom Quantifier

            if (pos >= str.length || current('|') || current(')')) {
              return null; /* Means: The term is empty */
            }

            var anchor = parseAnchor();

            if (anchor) {
              return anchor;
            }

            var atom = parseAtom();
            if (!atom) {
              bail('Expected atom');
            }
            var quantifier = parseQuantifier() || false;
            if (quantifier) {
              quantifier.body = flattenBody(atom);
              // The quantifier contains the atom. Therefore, the beginning of the
              // quantifier range is given by the beginning of the atom.
              updateRawStart(quantifier, atom.range[0]);
              return quantifier;
            }
            return atom;
          }

          function parseGroup(matchA, typeA, matchB, typeB) {
            var type = null,
                from = pos;

            if (match(matchA)) {
              type = typeA;
            } else if (match(matchB)) {
              type = typeB;
            } else {
              return false;
            }

            var body = parseDisjunction();
            if (!body) {
              bail('Expected disjunction');
            }
            skip(')');
            var group = createGroup(type, flattenBody(body), from, pos);

            if (type == 'normal') {
              // Keep track of the number of closed groups. This is required for
              // parseDecimalEscape(). In case the string is parsed a second time the
              // value already holds the total count and no incrementation is required.
              if (firstIteration) {
                closedCaptureCounter++;
              }
            }
            return group;
          }

          function parseAnchor() {
            // Anchor ::
            //      ^
            //      $
            //      \ b
            //      \ B
            //      ( ? = Disjunction )
            //      ( ? ! Disjunction )
            var res,
                from = pos;

            if (match('^')) {
              return createAnchor('start', 1 /* rawLength */);
            } else if (match('$')) {
              return createAnchor('end', 1 /* rawLength */);
            } else if (match('\\b')) {
              return createAnchor('boundary', 2 /* rawLength */);
            } else if (match('\\B')) {
              return createAnchor('not-boundary', 2 /* rawLength */);
            } else {
              return parseGroup('(?=', 'lookahead', '(?!', 'negativeLookahead');
            }
          }

          function parseQuantifier() {
            // Quantifier ::
            //      QuantifierPrefix
            //      QuantifierPrefix ?
            //
            // QuantifierPrefix ::
            //      *
            //      +
            //      ?
            //      { DecimalDigits }
            //      { DecimalDigits , }
            //      { DecimalDigits , DecimalDigits }

            var res,
                from = pos;
            var quantifier;
            var min, max;

            if (match('*')) {
              quantifier = createQuantifier(0);
            } else if (match('+')) {
              quantifier = createQuantifier(1);
            } else if (match('?')) {
              quantifier = createQuantifier(0, 1);
            } else if (res = matchReg(/^\{([0-9]+)\}/)) {
              min = parseInt(res[1], 10);
              quantifier = createQuantifier(min, min, res.range[0], res.range[1]);
            } else if (res = matchReg(/^\{([0-9]+),\}/)) {
              min = parseInt(res[1], 10);
              quantifier = createQuantifier(min, undefined, res.range[0], res.range[1]);
            } else if (res = matchReg(/^\{([0-9]+),([0-9]+)\}/)) {
              min = parseInt(res[1], 10);
              max = parseInt(res[2], 10);
              if (min > max) {
                bail('numbers out of order in {} quantifier', '', from, pos);
              }
              quantifier = createQuantifier(min, max, res.range[0], res.range[1]);
            }

            if (quantifier) {
              if (match('?')) {
                quantifier.greedy = false;
                quantifier.range[1] += 1;
              }
            }

            return quantifier;
          }

          function parseAtom() {
            // Atom ::
            //      PatternCharacter
            //      .
            //      \ AtomEscape
            //      CharacterClass
            //      ( Disjunction )
            //      ( ? : Disjunction )

            var res;

            // jviereck: allow ']', '}' here as well to be compatible with browser's
            //   implementations: ']'.match(/]/);
            // if (res = matchReg(/^[^^$\\.*+?()[\]{}|]/)) {
            if (res = matchReg(/^[^^$\\.*+?(){[|]/)) {
              //      PatternCharacter
              return createCharacter(res);
            } else if (match('.')) {
              //      .
              return createDot();
            } else if (match('\\')) {
              //      \ AtomEscape
              res = parseAtomEscape();
              if (!res) {
                bail('atomEscape');
              }
              return res;
            } else if (res = parseCharacterClass()) {
              return res;
            } else {
              //      ( Disjunction )
              //      ( ? : Disjunction )
              return parseGroup('(?:', 'ignore', '(', 'normal');
            }
          }

          function parseUnicodeSurrogatePairEscape(firstEscape) {
            if (hasUnicodeFlag) {
              var first, second;
              if (firstEscape.kind == 'unicodeEscape' && (first = firstEscape.codePoint) >= 0xD800 && first <= 0xDBFF && current('\\') && next('u')) {
                var prevPos = pos;
                pos++;
                var secondEscape = parseClassEscape();
                if (secondEscape.kind == 'unicodeEscape' && (second = secondEscape.codePoint) >= 0xDC00 && second <= 0xDFFF) {
                  // Unicode surrogate pair
                  firstEscape.range[1] = secondEscape.range[1];
                  firstEscape.codePoint = (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
                  firstEscape.type = 'value';
                  firstEscape.kind = 'unicodeCodePointEscape';
                  addRaw(firstEscape);
                } else {
                  pos = prevPos;
                }
              }
            }
            return firstEscape;
          }

          function parseClassEscape() {
            return parseAtomEscape(true);
          }

          function parseAtomEscape(insideCharacterClass) {
            // AtomEscape ::
            //      DecimalEscape
            //      CharacterEscape
            //      CharacterClassEscape

            var res,
                from = pos;

            res = parseDecimalEscape();
            if (res) {
              return res;
            }

            // For ClassEscape
            if (insideCharacterClass) {
              if (match('b')) {
                // 15.10.2.19
                // The production ClassEscape :: b evaluates by returning the
                // CharSet containing the one character <BS> (Unicode value 0008).
                return createEscaped('singleEscape', 0x0008, '\\b');
              } else if (match('B')) {
                bail('\\B not possible inside of CharacterClass', '', from);
              }
            }

            res = parseCharacterEscape();

            return res;
          }

          function parseDecimalEscape() {
            // DecimalEscape ::
            //      DecimalIntegerLiteral [lookahead ∉ DecimalDigit]
            //      CharacterClassEscape :: one of d D s S w W

            var res, match;

            if (res = matchReg(/^(?!0)\d+/)) {
              match = res[0];
              var refIdx = parseInt(res[0], 10);
              if (refIdx <= closedCaptureCounter) {
                // If the number is smaller than the normal-groups found so
                // far, then it is a reference...
                return createReference(res[0]);
              } else {
                // ... otherwise it needs to be interpreted as a octal (if the
                // number is in an octal format). If it is NOT octal format,
                // then the slash is ignored and the number is matched later
                // as normal characters.

                // Recall the negative decision to decide if the input must be parsed
                // a second time with the total normal-groups.
                backrefDenied.push(refIdx);

                // Reset the position again, as maybe only parts of the previous
                // matched numbers are actual octal numbers. E.g. in '019' only
                // the '01' should be matched.
                incr(-res[0].length);
                if (res = matchReg(/^[0-7]{1,3}/)) {
                  return createEscaped('octal', parseInt(res[0], 8), res[0], 1);
                } else {
                  // If we end up here, we have a case like /\91/. Then the
                  // first slash is to be ignored and the 9 & 1 to be treated
                  // like ordinary characters. Create a character for the
                  // first number only here - other number-characters
                  // (if available) will be matched later.
                  res = createCharacter(matchReg(/^[89]/));
                  return updateRawStart(res, res.range[0] - 1);
                }
              }
            }
            // Only allow octal numbers in the following. All matched numbers start
            // with a zero (if the do not, the previous if-branch is executed).
            // If the number is not octal format and starts with zero (e.g. `091`)
            // then only the zeros `0` is treated here and the `91` are ordinary
            // characters.
            // Example:
            //   /\091/.exec('\091')[0].length === 3
            else if (res = matchReg(/^[0-7]{1,3}/)) {
                match = res[0];
                if (/^0{1,3}$/.test(match)) {
                  // If they are all zeros, then only take the first one.
                  return createEscaped('null', 0x0000, '0', match.length + 1);
                } else {
                  return createEscaped('octal', parseInt(match, 8), match, 1);
                }
              } else if (res = matchReg(/^[dDsSwW]/)) {
                return createCharacterClassEscape(res[0]);
              }
            return false;
          }

          function parseCharacterEscape() {
            // CharacterEscape ::
            //      ControlEscape
            //      c ControlLetter
            //      HexEscapeSequence
            //      UnicodeEscapeSequence
            //      IdentityEscape

            var res;
            if (res = matchReg(/^[fnrtv]/)) {
              // ControlEscape
              var codePoint = 0;
              switch (res[0]) {
                case 't':
                  codePoint = 0x009;break;
                case 'n':
                  codePoint = 0x00A;break;
                case 'v':
                  codePoint = 0x00B;break;
                case 'f':
                  codePoint = 0x00C;break;
                case 'r':
                  codePoint = 0x00D;break;
              }
              return createEscaped('singleEscape', codePoint, '\\' + res[0]);
            } else if (res = matchReg(/^c([a-zA-Z])/)) {
              // c ControlLetter
              return createEscaped('controlLetter', res[1].charCodeAt(0) % 32, res[1], 2);
            } else if (res = matchReg(/^x([0-9a-fA-F]{2})/)) {
              // HexEscapeSequence
              return createEscaped('hexadecimalEscape', parseInt(res[1], 16), res[1], 2);
            } else if (res = matchReg(/^u([0-9a-fA-F]{4})/)) {
              // UnicodeEscapeSequence
              return parseUnicodeSurrogatePairEscape(createEscaped('unicodeEscape', parseInt(res[1], 16), res[1], 2));
            } else if (hasUnicodeFlag && (res = matchReg(/^u\{([0-9a-fA-F]+)\}/))) {
              // RegExpUnicodeEscapeSequence (ES6 Unicode code point escape)
              return createEscaped('unicodeCodePointEscape', parseInt(res[1], 16), res[1], 4);
            } else {
              // IdentityEscape
              return parseIdentityEscape();
            }
          }

          // Taken from the Esprima parser.
          function isIdentifierPart(ch) {
            // Generated by `tools/generate-identifier-regex.js`.
            var NonAsciiIdentifierPart = new RegExp('[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B2\u08E4-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA69D\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2D\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]');

            return ch === 36 || ch === 95 || // $ (dollar) and _ (underscore)
            ch >= 65 && ch <= 90 || // A..Z
            ch >= 97 && ch <= 122 || // a..z
            ch >= 48 && ch <= 57 || // 0..9
            ch === 92 || // \ (backslash)
            ch >= 0x80 && NonAsciiIdentifierPart.test(String.fromCharCode(ch));
          }

          function parseIdentityEscape() {
            // IdentityEscape ::
            //      SourceCharacter but not IdentifierPart
            //      <ZWJ>
            //      <ZWNJ>

            var ZWJ = '\u200C';
            var ZWNJ = '\u200D';

            var tmp;

            if (!isIdentifierPart(lookahead())) {
              tmp = incr();
              return createEscaped('identifier', tmp.charCodeAt(0), tmp, 1);
            }

            if (match(ZWJ)) {
              // <ZWJ>
              return createEscaped('identifier', 0x200C, ZWJ);
            } else if (match(ZWNJ)) {
              // <ZWNJ>
              return createEscaped('identifier', 0x200D, ZWNJ);
            }

            return null;
          }

          function parseCharacterClass() {
            // CharacterClass ::
            //      [ [lookahead ∉ {^}] ClassRanges ]
            //      [ ^ ClassRanges ]

            var res,
                from = pos;
            if (res = matchReg(/^\[\^/)) {
              res = parseClassRanges();
              skip(']');
              return createCharacterClass(res, true, from, pos);
            } else if (match('[')) {
              res = parseClassRanges();
              skip(']');
              return createCharacterClass(res, false, from, pos);
            }

            return null;
          }

          function parseClassRanges() {
            // ClassRanges ::
            //      [empty]
            //      NonemptyClassRanges

            var res;
            if (current(']')) {
              // Empty array means nothing insinde of the ClassRange.
              return [];
            } else {
              res = parseNonemptyClassRanges();
              if (!res) {
                bail('nonEmptyClassRanges');
              }
              return res;
            }
          }

          function parseHelperClassRanges(atom) {
            var from, to, res;
            if (current('-') && !next(']')) {
              // ClassAtom - ClassAtom ClassRanges
              skip('-');

              res = parseClassAtom();
              if (!res) {
                bail('classAtom');
              }
              to = pos;
              var classRanges = parseClassRanges();
              if (!classRanges) {
                bail('classRanges');
              }
              from = atom.range[0];
              if (classRanges.type === 'empty') {
                return [createClassRange(atom, res, from, to)];
              }
              return [createClassRange(atom, res, from, to)].concat(classRanges);
            }

            res = parseNonemptyClassRangesNoDash();
            if (!res) {
              bail('nonEmptyClassRangesNoDash');
            }

            return [atom].concat(res);
          }

          function parseNonemptyClassRanges() {
            // NonemptyClassRanges ::
            //      ClassAtom
            //      ClassAtom NonemptyClassRangesNoDash
            //      ClassAtom - ClassAtom ClassRanges

            var atom = parseClassAtom();
            if (!atom) {
              bail('classAtom');
            }

            if (current(']')) {
              // ClassAtom
              return [atom];
            }

            // ClassAtom NonemptyClassRangesNoDash
            // ClassAtom - ClassAtom ClassRanges
            return parseHelperClassRanges(atom);
          }

          function parseNonemptyClassRangesNoDash() {
            // NonemptyClassRangesNoDash ::
            //      ClassAtom
            //      ClassAtomNoDash NonemptyClassRangesNoDash
            //      ClassAtomNoDash - ClassAtom ClassRanges

            var res = parseClassAtom();
            if (!res) {
              bail('classAtom');
            }
            if (current(']')) {
              //      ClassAtom
              return res;
            }

            // ClassAtomNoDash NonemptyClassRangesNoDash
            // ClassAtomNoDash - ClassAtom ClassRanges
            return parseHelperClassRanges(res);
          }

          function parseClassAtom() {
            // ClassAtom ::
            //      -
            //      ClassAtomNoDash
            if (match('-')) {
              return createCharacter('-');
            } else {
              return parseClassAtomNoDash();
            }
          }

          function parseClassAtomNoDash() {
            // ClassAtomNoDash ::
            //      SourceCharacter but not one of \ or ] or -
            //      \ ClassEscape

            var res;
            if (res = matchReg(/^[^\\\]-]/)) {
              return createCharacter(res[0]);
            } else if (match('\\')) {
              res = parseClassEscape();
              if (!res) {
                bail('classEscape');
              }

              return parseUnicodeSurrogatePairEscape(res);
            }
          }

          function bail(message, details, from, to) {
            from = from == null ? pos : from;
            to = to == null ? from : to;

            var contextStart = Math.max(0, from - 10);
            var contextEnd = Math.min(to + 10, str.length);

            // Output a bit of context and a line pointing to where our error is.
            //
            // We are assuming that there are no actual newlines in the content as this is a regular expression.
            var context = '    ' + str.substring(contextStart, contextEnd);
            var pointer = '    ' + new Array(from - contextStart + 1).join(' ') + '^';

            throw SyntaxError(message + ' at position ' + from + (details ? ': ' + details : '') + '\n' + context + '\n' + pointer);
          }

          var backrefDenied = [];
          var closedCaptureCounter = 0;
          var firstIteration = true;
          var hasUnicodeFlag = (flags || "").indexOf("u") !== -1;
          var pos = 0;

          // Convert the input to a string and treat the empty string special.
          str = String(str);
          if (str === '') {
            str = '(?:)';
          }

          var result = parseDisjunction();

          if (result.range[1] !== str.length) {
            bail('Could not parse entire input - got stuck', '', result.range[1]);
          }

          // The spec requires to interpret the `\2` in `/\2()()/` as backreference.
          // As the parser collects the number of capture groups as the string is
          // parsed it is impossible to make these decisions at the point when the
          // `\2` is handled. In case the local decision turns out to be wrong after
          // the parsing has finished, the input string is parsed a second time with
          // the total number of capture groups set.
          //
          // SEE: https://github.com/jviereck/regjsparser/issues/70
          for (var i = 0; i < backrefDenied.length; i++) {
            if (backrefDenied[i] <= closedCaptureCounter) {
              // Parse the input a second time.
              pos = 0;
              firstIteration = false;
              return parseDisjunction();
            }
          }

          return result;
        }

        var regjsparser = {
          parse: parse
        };

        if (typeof module !== 'undefined' && module.exports) {
          module.exports = regjsparser;
        } else {
          window.regjsparser = regjsparser;
        }
      })();
    });

    var require$$3 = parser && (typeof parser === 'undefined' ? 'undefined' : _typeof(parser)) === 'object' && 'default' in parser ? parser['default'] : parser;

    var regjsgen = __commonjs(function (module, exports, global) {
      /*!
       * RegJSGen
       * Copyright 2014 Benjamin Tan <https://d10.github.io/>
       * Available under MIT license <http://d10.mit-license.org/>
       */
      (function () {
        'use strict';

        /** Used to determine if values are of the language type `Object` */

        var objectTypes = {
          'function': true,
          'object': true
        };

        /** Used as a reference to the global object */
        var root = objectTypes[typeof window === 'undefined' ? 'undefined' : _typeof(window)] && window || this;

        /** Backup possible global object */
        var oldRoot = root;

        /** Detect free variable `exports` */
        var freeExports = objectTypes[typeof exports === 'undefined' ? 'undefined' : _typeof(exports)] && exports;

        /** Detect free variable `module` */
        var freeModule = objectTypes[typeof module === 'undefined' ? 'undefined' : _typeof(module)] && module && !module.nodeType && module;

        /** Detect free variable `global` from Node.js or Browserified code and use it as `root` */
        var freeGlobal = freeExports && freeModule && (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global;
        if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
          root = freeGlobal;
        }

        /*--------------------------------------------------------------------------*/

        /*! Based on https://mths.be/fromcodepoint v0.2.0 by @mathias */

        var stringFromCharCode = String.fromCharCode;
        var floor = Math.floor;
        function fromCodePoint() {
          var MAX_SIZE = 0x4000;
          var codeUnits = [];
          var highSurrogate;
          var lowSurrogate;
          var index = -1;
          var length = arguments.length;
          if (!length) {
            return '';
          }
          var result = '';
          while (++index < length) {
            var codePoint = Number(arguments[index]);
            if (!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
            codePoint < 0 || // not a valid Unicode code point
            codePoint > 0x10FFFF || // not a valid Unicode code point
            floor(codePoint) != codePoint // not an integer
            ) {
                throw RangeError('Invalid code point: ' + codePoint);
              }
            if (codePoint <= 0xFFFF) {
              // BMP code point
              codeUnits.push(codePoint);
            } else {
              // Astral code point; split in surrogate halves
              // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
              codePoint -= 0x10000;
              highSurrogate = (codePoint >> 10) + 0xD800;
              lowSurrogate = codePoint % 0x400 + 0xDC00;
              codeUnits.push(highSurrogate, lowSurrogate);
            }
            if (index + 1 == length || codeUnits.length > MAX_SIZE) {
              result += stringFromCharCode.apply(null, codeUnits);
              codeUnits.length = 0;
            }
          }
          return result;
        }

        function assertType(type, expected) {
          if (expected.indexOf('|') == -1) {
            if (type == expected) {
              return;
            }

            throw Error('Invalid node type: ' + type);
          }

          expected = assertType.hasOwnProperty(expected) ? assertType[expected] : assertType[expected] = RegExp('^(?:' + expected + ')$');

          if (expected.test(type)) {
            return;
          }

          throw Error('Invalid node type: ' + type);
        }

        /*--------------------------------------------------------------------------*/

        function generate(node) {
          var type = node.type;

          if (generate.hasOwnProperty(type) && typeof generate[type] == 'function') {
            return generate[type](node);
          }

          throw Error('Invalid node type: ' + type);
        }

        /*--------------------------------------------------------------------------*/

        function generateAlternative(node) {
          assertType(node.type, 'alternative');

          var terms = node.body,
              length = terms ? terms.length : 0;

          if (length == 1) {
            return generateTerm(terms[0]);
          } else {
            var i = -1,
                result = '';

            while (++i < length) {
              result += generateTerm(terms[i]);
            }

            return result;
          }
        }

        function generateAnchor(node) {
          assertType(node.type, 'anchor');

          switch (node.kind) {
            case 'start':
              return '^';
            case 'end':
              return '$';
            case 'boundary':
              return '\\b';
            case 'not-boundary':
              return '\\B';
            default:
              throw Error('Invalid assertion');
          }
        }

        function generateAtom(node) {
          assertType(node.type, 'anchor|characterClass|characterClassEscape|dot|group|reference|value');

          return generate(node);
        }

        function generateCharacterClass(node) {
          assertType(node.type, 'characterClass');

          var classRanges = node.body,
              length = classRanges ? classRanges.length : 0;

          var i = -1,
              result = '[';

          if (node.negative) {
            result += '^';
          }

          while (++i < length) {
            result += generateClassAtom(classRanges[i]);
          }

          result += ']';

          return result;
        }

        function generateCharacterClassEscape(node) {
          assertType(node.type, 'characterClassEscape');

          return '\\' + node.value;
        }

        function generateCharacterClassRange(node) {
          assertType(node.type, 'characterClassRange');

          var min = node.min,
              max = node.max;

          if (min.type == 'characterClassRange' || max.type == 'characterClassRange') {
            throw Error('Invalid character class range');
          }

          return generateClassAtom(min) + '-' + generateClassAtom(max);
        }

        function generateClassAtom(node) {
          assertType(node.type, 'anchor|characterClassEscape|characterClassRange|dot|value');

          return generate(node);
        }

        function generateDisjunction(node) {
          assertType(node.type, 'disjunction');

          var body = node.body,
              length = body ? body.length : 0;

          if (length == 0) {
            throw Error('No body');
          } else if (length == 1) {
            return generate(body[0]);
          } else {
            var i = -1,
                result = '';

            while (++i < length) {
              if (i != 0) {
                result += '|';
              }
              result += generate(body[i]);
            }

            return result;
          }
        }

        function generateDot(node) {
          assertType(node.type, 'dot');

          return '.';
        }

        function generateGroup(node) {
          assertType(node.type, 'group');

          var result = '(';

          switch (node.behavior) {
            case 'normal':
              break;
            case 'ignore':
              result += '?:';
              break;
            case 'lookahead':
              result += '?=';
              break;
            case 'negativeLookahead':
              result += '?!';
              break;
            default:
              throw Error('Invalid behaviour: ' + node.behaviour);
          }

          var body = node.body,
              length = body ? body.length : 0;

          if (length == 1) {
            result += generate(body[0]);
          } else {
            var i = -1;

            while (++i < length) {
              result += generate(body[i]);
            }
          }

          result += ')';

          return result;
        }

        function generateQuantifier(node) {
          assertType(node.type, 'quantifier');

          var quantifier = '',
              min = node.min,
              max = node.max;

          switch (max) {
            case undefined:
            case null:
              switch (min) {
                case 0:
                  quantifier = '*';
                  break;
                case 1:
                  quantifier = '+';
                  break;
                default:
                  quantifier = '{' + min + ',}';
                  break;
              }
              break;
            default:
              if (min == max) {
                quantifier = '{' + min + '}';
              } else if (min == 0 && max == 1) {
                quantifier = '?';
              } else {
                quantifier = '{' + min + ',' + max + '}';
              }
              break;
          }

          if (!node.greedy) {
            quantifier += '?';
          }

          return generateAtom(node.body[0]) + quantifier;
        }

        function generateReference(node) {
          assertType(node.type, 'reference');

          return '\\' + node.matchIndex;
        }

        function generateTerm(node) {
          assertType(node.type, 'anchor|characterClass|characterClassEscape|empty|group|quantifier|reference|value');

          return generate(node);
        }

        function generateValue(node) {
          assertType(node.type, 'value');

          var kind = node.kind,
              codePoint = node.codePoint;

          switch (kind) {
            case 'controlLetter':
              return '\\c' + fromCodePoint(codePoint + 64);
            case 'hexadecimalEscape':
              return '\\x' + ('00' + codePoint.toString(16).toUpperCase()).slice(-2);
            case 'identifier':
              return '\\' + fromCodePoint(codePoint);
            case 'null':
              return '\\' + codePoint;
            case 'octal':
              return '\\' + codePoint.toString(8);
            case 'singleEscape':
              switch (codePoint) {
                case 0x0008:
                  return '\\b';
                case 0x009:
                  return '\\t';
                case 0x00A:
                  return '\\n';
                case 0x00B:
                  return '\\v';
                case 0x00C:
                  return '\\f';
                case 0x00D:
                  return '\\r';
                default:
                  throw Error('Invalid codepoint: ' + codePoint);
              }
            case 'symbol':
              return fromCodePoint(codePoint);
            case 'unicodeEscape':
              return '\\u' + ('0000' + codePoint.toString(16).toUpperCase()).slice(-4);
            case 'unicodeCodePointEscape':
              return '\\u{' + codePoint.toString(16).toUpperCase() + '}';
            default:
              throw Error('Unsupported node kind: ' + kind);
          }
        }

        /*--------------------------------------------------------------------------*/

        generate.alternative = generateAlternative;
        generate.anchor = generateAnchor;
        generate.characterClass = generateCharacterClass;
        generate.characterClassEscape = generateCharacterClassEscape;
        generate.characterClassRange = generateCharacterClassRange;
        generate.disjunction = generateDisjunction;
        generate.dot = generateDot;
        generate.group = generateGroup;
        generate.quantifier = generateQuantifier;
        generate.reference = generateReference;
        generate.value = generateValue;

        /*--------------------------------------------------------------------------*/

        // export regjsgen
        // some AMD build optimizers, like r.js, check for condition patterns like the following:
        if (false) {
          // define as an anonymous module so, through path mapping, it can be aliased
          undefined(function () {
            return {
              'generate': generate
            };
          });
        }
        // check for `exports` after `define` in case a build optimizer adds an `exports` object
        else if (freeExports && freeModule) {
            // in Narwhal, Node.js, Rhino -require, or RingoJS
            freeExports.generate = generate;
          }
          // in a browser or Rhino
          else {
              root.regjsgen = {
                'generate': generate
              };
            }
      }).call(__commonjs_global);
    });

    var require$$4 = regjsgen && (typeof regjsgen === 'undefined' ? 'undefined' : _typeof(regjsgen)) === 'object' && 'default' in regjsgen ? regjsgen['default'] : regjsgen;

    var rewritePattern = __commonjs(function (module) {
      var generate = require$$4.generate;
      var parse = require$$3.parse;
      var regenerate = require$$0$2;
      var iuMappings = require$$1;
      var ESCAPE_SETS = require$$0$1;

      function getCharacterClassEscapeSet(character) {
        if (unicode) {
          if (ignoreCase) {
            return ESCAPE_SETS.UNICODE_IGNORE_CASE[character];
          }
          return ESCAPE_SETS.UNICODE[character];
        }
        return ESCAPE_SETS.REGULAR[character];
      }

      var object = {};
      var hasOwnProperty = object.hasOwnProperty;
      function has(object, property) {
        return hasOwnProperty.call(object, property);
      }

      // Prepare a Regenerate set containing all code points, used for negative
      // character classes (if any).
      var UNICODE_SET = regenerate().addRange(0x0, 0x10FFFF);
      // Without the `u` flag, the range stops at 0xFFFF.
      // https://mths.be/es6#sec-pattern-semantics
      var BMP_SET = regenerate().addRange(0x0, 0xFFFF);

      // Prepare a Regenerate set containing all code points that are supposed to be
      // matched by `/./u`. https://mths.be/es6#sec-atom
      var DOT_SET_UNICODE = UNICODE_SET.clone() // all Unicode code points
      .remove(
      // minus `LineTerminator`s (https://mths.be/es6#sec-line-terminators):
      0x000A, // Line Feed <LF>
      0x000D, // Carriage Return <CR>
      0x2028, // Line Separator <LS>
      0x2029 // Paragraph Separator <PS>
      );
      // Prepare a Regenerate set containing all code points that are supposed to be
      // matched by `/./` (only BMP code points).
      var DOT_SET = DOT_SET_UNICODE.clone().intersection(BMP_SET);

      // Add a range of code points + any case-folded code points in that range to a
      // set.
      regenerate.prototype.iuAddRange = function (min, max) {
        var $this = this;
        do {
          var folded = caseFold(min);
          if (folded) {
            $this.add(folded);
          }
        } while (++min <= max);
        return $this;
      };

      function assign(target, source) {
        for (var key in source) {
          // Note: `hasOwnProperty` is not needed here.
          target[key] = source[key];
        }
      }

      function update(item, pattern) {
        // TODO: Test if memoizing `pattern` here is worth the effort.
        if (!pattern) {
          return;
        }
        var tree = parse(pattern, '');
        switch (tree.type) {
          case 'characterClass':
          case 'group':
          case 'value':
            // No wrapping needed.
            break;
          default:
            // Wrap the pattern in a non-capturing group.
            tree = wrap(tree, pattern);
        }
        assign(item, tree);
      }

      function wrap(tree, pattern) {
        // Wrap the pattern in a non-capturing group.
        return {
          'type': 'group',
          'behavior': 'ignore',
          'body': [tree],
          'raw': '(?:' + pattern + ')'
        };
      }

      function caseFold(codePoint) {
        return has(iuMappings, codePoint) ? iuMappings[codePoint] : false;
      }

      var ignoreCase = false;
      var unicode = false;
      function processCharacterClass(characterClassItem) {
        var set$$1 = regenerate();
        var body = characterClassItem.body.forEach(function (item) {
          switch (item.type) {
            case 'value':
              set$$1.add(item.codePoint);
              if (ignoreCase && unicode) {
                var folded = caseFold(item.codePoint);
                if (folded) {
                  set$$1.add(folded);
                }
              }
              break;
            case 'characterClassRange':
              var min = item.min.codePoint;
              var max = item.max.codePoint;
              set$$1.addRange(min, max);
              if (ignoreCase && unicode) {
                set$$1.iuAddRange(min, max);
              }
              break;
            case 'characterClassEscape':
              set$$1.add(getCharacterClassEscapeSet(item.value));
              break;
            // The `default` clause is only here as a safeguard; it should never be
            // reached. Code coverage tools should ignore it.
            /* istanbul ignore next */
            default:
              throw Error('Unknown term type: ' + item.type);
          }
        });
        if (characterClassItem.negative) {
          set$$1 = (unicode ? UNICODE_SET : BMP_SET).clone().remove(set$$1);
        }
        update(characterClassItem, set$$1.toString());
        return characterClassItem;
      }

      function processTerm(item) {
        switch (item.type) {
          case 'dot':
            update(item, (unicode ? DOT_SET_UNICODE : DOT_SET).toString());
            break;
          case 'characterClass':
            item = processCharacterClass(item);
            break;
          case 'characterClassEscape':
            update(item, getCharacterClassEscapeSet(item.value).toString());
            break;
          case 'alternative':
          case 'disjunction':
          case 'group':
          case 'quantifier':
            item.body = item.body.map(processTerm);
            break;
          case 'value':
            var codePoint = item.codePoint;
            var set$$1 = regenerate(codePoint);
            if (ignoreCase && unicode) {
              var folded = caseFold(codePoint);
              if (folded) {
                set$$1.add(folded);
              }
            }
            update(item, set$$1.toString());
            break;
          case 'anchor':
          case 'empty':
          case 'group':
          case 'reference':
            // Nothing to do here.
            break;
          // The `default` clause is only here as a safeguard; it should never be
          // reached. Code coverage tools should ignore it.
          /* istanbul ignore next */
          default:
            throw Error('Unknown term type: ' + item.type);
        }
        return item;
      }

      module.exports = function (pattern, flags) {
        var tree = parse(pattern, flags);
        ignoreCase = flags ? flags.indexOf('i') > -1 : false;
        unicode = flags ? flags.indexOf('u') > -1 : false;
        assign(tree, processTerm(tree));
        return generate(tree);
      };
    });

    var rewritePattern$1 = rewritePattern && (typeof rewritePattern === 'undefined' ? 'undefined' : _typeof(rewritePattern)) === 'object' && 'default' in rewritePattern ? rewritePattern['default'] : rewritePattern;

    var Literal = function (Node) {
      function Literal() {
        Node.apply(this, arguments);
      }

      if (Node) Literal.__proto__ = Node;
      Literal.prototype = Object.create(Node && Node.prototype);
      Literal.prototype.constructor = Literal;

      Literal.prototype.initialise = function initialise() {
        if (typeof this.value === 'string') {
          this.program.indentExclusionElements.push(this);
        }
      };

      Literal.prototype.transpile = function transpile(code, transforms) {
        if (transforms.numericLiteral) {
          var leading = this.raw.slice(0, 2);
          if (leading === '0b' || leading === '0o') {
            code.overwrite(this.start, this.end, String(this.value), true);
          }
        }

        if (this.regex) {
          var ref = this.regex;
          var pattern = ref.pattern;
          var flags = ref.flags;

          if (transforms.stickyRegExp && /y/.test(flags)) throw new CompileError(this, 'Regular expression sticky flag is not supported');
          if (transforms.unicodeRegExp && /u/.test(flags)) {
            code.overwrite(this.start, this.end, "/" + rewritePattern$1(pattern, flags) + "/" + flags.replace('u', ''));
          }
        }
      };

      return Literal;
    }(Node);

    var MemberExpression = function (Node) {
      function MemberExpression() {
        Node.apply(this, arguments);
      }

      if (Node) MemberExpression.__proto__ = Node;
      MemberExpression.prototype = Object.create(Node && Node.prototype);
      MemberExpression.prototype.constructor = MemberExpression;

      MemberExpression.prototype.transpile = function transpile(code, transforms) {
        if (transforms.reservedProperties && reserved[this.property.name]) {
          code.overwrite(this.object.end, this.property.start, "['");
          code.insertLeft(this.property.end, "']");
        }

        Node.prototype.transpile.call(this, code, transforms);
      };

      return MemberExpression;
    }(Node);

    var NewExpression = function (Node) {
      function NewExpression() {
        Node.apply(this, arguments);
      }

      if (Node) NewExpression.__proto__ = Node;
      NewExpression.prototype = Object.create(Node && Node.prototype);
      NewExpression.prototype.constructor = NewExpression;

      NewExpression.prototype.initialise = function initialise(transforms) {
        var this$1 = this;

        if (transforms.spreadRest && this.arguments.length) {
          var lexicalBoundary = this.findLexicalBoundary();

          var i = this.arguments.length;
          while (i--) {
            var arg = this$1.arguments[i];
            if (arg.type === 'SpreadElement' && isArguments(arg.argument)) {
              this$1.argumentsArrayAlias = lexicalBoundary.getArgumentsArrayAlias();
              break;
            }
          }
        }

        Node.prototype.initialise.call(this, transforms);
      };

      NewExpression.prototype.transpile = function transpile(code, transforms) {
        if (transforms.spreadRest && this.arguments.length) {
          var firstArgument = this.arguments[0];
          var isNew = true;
          var hasSpreadElements = spread(code, this.arguments, firstArgument.start, this.argumentsArrayAlias, isNew);

          if (hasSpreadElements) {
            code.insertRight(this.start + 'new'.length, ' (Function.prototype.bind.apply(');
            code.overwrite(this.callee.end, firstArgument.start, ', [ null ].concat( ');
            code.insertLeft(this.end, ' ))');
          }
        }

        Node.prototype.transpile.call(this, code, transforms);
      };

      return NewExpression;
    }(Node);

    var ObjectExpression = function (Node) {
      function ObjectExpression() {
        Node.apply(this, arguments);
      }

      if (Node) ObjectExpression.__proto__ = Node;
      ObjectExpression.prototype = Object.create(Node && Node.prototype);
      ObjectExpression.prototype.constructor = ObjectExpression;

      ObjectExpression.prototype.transpile = function transpile(code, transforms) {
        var this$1 = this;

        Node.prototype.transpile.call(this, code, transforms);

        var firstPropertyStart = this.start + 1;
        var regularPropertyCount = 0;
        var spreadPropertyCount = 0;
        var computedPropertyCount = 0;

        for (var i$2 = 0, list = this.properties; i$2 < list.length; i$2 += 1) {
          var prop = list[i$2];

          if (prop.type === 'SpreadProperty') {
            spreadPropertyCount += 1;
          } else if (prop.computed) {
            computedPropertyCount += 1;
          } else if (prop.type === 'Property') {
            regularPropertyCount += 1;
          }
        }

        if (spreadPropertyCount) {
          if (!this.program.options.objectAssign) {
            throw new CompileError(this, 'Object spread operator requires specified objectAssign option with \'Object.assign\' or polyfill helper.');
          }
          // enclose run of non-spread properties in curlies
          var i = this.properties.length;
          if (regularPropertyCount) {
            while (i--) {
              var prop$1 = this$1.properties[i];

              if (prop$1.type === 'Property' && !prop$1.computed) {
                var lastProp = this$1.properties[i - 1];
                var nextProp = this$1.properties[i + 1];

                if (!lastProp || lastProp.type !== 'Property' || lastProp.computed) {
                  code.insertRight(prop$1.start, '{');
                }

                if (!nextProp || nextProp.type !== 'Property' || nextProp.computed) {
                  code.insertLeft(prop$1.end, '}');
                }
              }
            }
          }

          // wrap the whole thing in Object.assign
          firstPropertyStart = this.properties[0].start;
          code.overwrite(this.start, firstPropertyStart, this.program.options.objectAssign + "({}, ");
          code.overwrite(this.properties[this.properties.length - 1].end, this.end, ')');
        }

        if (computedPropertyCount && transforms.computedProperty) {
          var i0 = this.getIndentation();

          var isSimpleAssignment;
          var name;

          if (this.parent.type === 'VariableDeclarator' && this.parent.parent.declarations.length === 1) {
            isSimpleAssignment = true;
            name = this.parent.id.alias || this.parent.id.name; // TODO is this right?
          } else if (this.parent.type === 'AssignmentExpression' && this.parent.parent.type === 'ExpressionStatement' && this.parent.left.type === 'Identifier') {
            isSimpleAssignment = true;
            name = this.parent.left.alias || this.parent.left.name; // TODO is this right?
          } else if (this.parent.type === 'AssignmentPattern' && this.parent.left.type === 'Identifier') {
            isSimpleAssignment = true;
            name = this.parent.left.alias || this.parent.left.name; // TODO is this right?
          }

          // handle block scoping
          var declaration = this.findScope(false).findDeclaration(name);
          if (declaration) name = declaration.name;

          var start = firstPropertyStart;
          var end = this.end;

          if (isSimpleAssignment) {
            // ???
          } else {
            name = this.findScope(true).createIdentifier('obj');

            var statement = this.findNearest(/(?:Statement|Declaration)$/);
            code.insertLeft(statement.end, "\n" + i0 + "var " + name + ";");

            code.insertRight(this.start, "( " + name + " = ");
          }

          var len = this.properties.length;
          var lastComputedProp;
          var sawNonComputedProperty = false;

          for (var i$1 = 0; i$1 < len; i$1 += 1) {
            var prop$2 = this$1.properties[i$1];

            if (prop$2.computed) {
              lastComputedProp = prop$2;
              var moveStart = i$1 > 0 ? this$1.properties[i$1 - 1].end : start;

              var propId = isSimpleAssignment ? ";\n" + i0 + name : ", " + name;

              if (moveStart < prop$2.start) {
                code.overwrite(moveStart, prop$2.start, propId);
              } else {
                code.insertRight(prop$2.start, propId);
              }

              var c = prop$2.key.end;
              while (code.original[c] !== ']') {
                c += 1;
              }c += 1;

              if (prop$2.value.start > c) code.remove(c, prop$2.value.start);
              code.insertLeft(c, ' = ');
              code.move(moveStart, prop$2.end, end);

              if (i$1 < len - 1 && !sawNonComputedProperty) {
                // remove trailing comma
                c = prop$2.end;
                while (code.original[c] !== ',') {
                  c += 1;
                }code.remove(prop$2.end, c + 1);
              }

              if (prop$2.method && transforms.conciseMethodProperty) {
                code.insertRight(prop$2.value.start, 'function ');
              }
            } else {
              sawNonComputedProperty = true;
            }
          }

          // special case
          if (computedPropertyCount === len) {
            code.remove(this.properties[len - 1].end, this.end - 1);
          }

          if (!isSimpleAssignment) {
            code.insertLeft(lastComputedProp.end, ", " + name + " )");
          }
        }
      };

      return ObjectExpression;
    }(Node);

    var Property = function (Node) {
      function Property() {
        Node.apply(this, arguments);
      }

      if (Node) Property.__proto__ = Node;
      Property.prototype = Object.create(Node && Node.prototype);
      Property.prototype.constructor = Property;

      Property.prototype.transpile = function transpile(code, transforms) {
        if (transforms.conciseMethodProperty && !this.computed && this.parent.type !== 'ObjectPattern') {
          if (this.shorthand) {
            code.insertRight(this.start, this.key.name + ": ");
          } else if (this.method) {
            var name = '';
            if (this.program.options.namedFunctionExpressions !== false) {
              if (this.key.type === 'Literal' && typeof this.key.value === 'number') {
                name = "";
              } else if (this.key.type === 'Identifier') {
                if (reserved[this.key.name] || !/^[a-z_$][a-z0-9_$]*$/i.test(this.key.name) || this.value.body.scope.references[this.key.name]) {
                  name = this.findScope(true).createIdentifier(this.key.name);
                } else {
                  name = this.key.name;
                }
              } else {
                name = this.findScope(true).createIdentifier(this.key.value);
              }
              name = ' ' + name;
            }

            if (this.value.generator) code.remove(this.start, this.key.start);
            code.insertLeft(this.key.end, ": function" + (this.value.generator ? '*' : '') + name);
          }
        }

        if (transforms.reservedProperties && reserved[this.key.name]) {
          code.insertRight(this.key.start, "'");
          code.insertLeft(this.key.end, "'");
        }

        Node.prototype.transpile.call(this, code, transforms);
      };

      return Property;
    }(Node);

    var ReturnStatement = function (Node) {
      function ReturnStatement() {
        Node.apply(this, arguments);
      }

      if (Node) ReturnStatement.__proto__ = Node;
      ReturnStatement.prototype = Object.create(Node && Node.prototype);
      ReturnStatement.prototype.constructor = ReturnStatement;

      ReturnStatement.prototype.initialise = function initialise(transforms) {
        this.loop = this.findNearest(loopStatement);
        this.nearestFunction = this.findNearest(/Function/);

        if (this.loop && (!this.nearestFunction || this.loop.depth > this.nearestFunction.depth)) {
          this.loop.canReturn = true;
          this.shouldWrap = true;
        }

        if (this.argument) this.argument.initialise(transforms);
      };

      ReturnStatement.prototype.transpile = function transpile(code, transforms) {
        var shouldWrap = this.shouldWrap && this.loop && this.loop.shouldRewriteAsFunction;

        if (this.argument) {
          if (shouldWrap) code.insertRight(this.argument.start, "{ v: ");
          this.argument.transpile(code, transforms);
          if (shouldWrap) code.insertLeft(this.argument.end, " }");
        } else if (shouldWrap) {
          code.insertLeft(this.start + 6, ' {}');
        }
      };

      return ReturnStatement;
    }(Node);

    var SpreadProperty = function (Node) {
      function SpreadProperty() {
        Node.apply(this, arguments);
      }

      if (Node) SpreadProperty.__proto__ = Node;
      SpreadProperty.prototype = Object.create(Node && Node.prototype);
      SpreadProperty.prototype.constructor = SpreadProperty;

      SpreadProperty.prototype.transpile = function transpile(code, transforms) {
        code.remove(this.start, this.argument.start);
        code.remove(this.argument.end, this.end);

        Node.prototype.transpile.call(this, code, transforms);
      };

      return SpreadProperty;
    }(Node);

    var Super = function (Node) {
      function Super() {
        Node.apply(this, arguments);
      }

      if (Node) Super.__proto__ = Node;
      Super.prototype = Object.create(Node && Node.prototype);
      Super.prototype.constructor = Super;

      Super.prototype.initialise = function initialise(transforms) {
        if (transforms.classes) {
          this.method = this.findNearest('MethodDefinition');
          if (!this.method) throw new CompileError(this, 'use of super outside class method');

          var parentClass = this.findNearest('ClassBody').parent;
          this.superClassName = parentClass.superClass && (parentClass.superClass.name || 'superclass');

          if (!this.superClassName) throw new CompileError(this, 'super used in base class');

          this.isCalled = this.parent.type === 'CallExpression' && this === this.parent.callee;

          if (this.method.kind !== 'constructor' && this.isCalled) {
            throw new CompileError(this, 'super() not allowed outside class constructor');
          }

          this.isMember = this.parent.type === 'MemberExpression';

          if (!this.isCalled && !this.isMember) {
            throw new CompileError(this, 'Unexpected use of `super` (expected `super(...)` or `super.*`)');
          }
        }

        if (transforms.arrow) {
          var lexicalBoundary = this.findLexicalBoundary();
          var arrowFunction = this.findNearest('ArrowFunctionExpression');
          var loop = this.findNearest(loopStatement);

          if (arrowFunction && arrowFunction.depth > lexicalBoundary.depth) {
            this.thisAlias = lexicalBoundary.getThisAlias();
          }

          if (loop && loop.body.contains(this) && loop.depth > lexicalBoundary.depth) {
            this.thisAlias = lexicalBoundary.getThisAlias();
          }
        }
      };

      Super.prototype.transpile = function transpile(code, transforms) {
        if (transforms.classes) {
          var expression = this.isCalled || this.method.static ? this.superClassName : this.superClassName + ".prototype";

          code.overwrite(this.start, this.end, expression, true);

          var callExpression = this.isCalled ? this.parent : this.parent.parent;

          if (callExpression && callExpression.type === 'CallExpression') {
            if (!this.noCall) {
              // special case – `super( ...args )`
              code.insertLeft(callExpression.callee.end, '.call');
            }

            var thisAlias = this.thisAlias || 'this';

            if (callExpression.arguments.length) {
              code.insertLeft(callExpression.arguments[0].start, thisAlias + ", ");
            } else {
              code.insertLeft(callExpression.end - 1, "" + thisAlias);
            }
          }
        }
      };

      return Super;
    }(Node);

    var TaggedTemplateExpression = function (Node) {
      function TaggedTemplateExpression() {
        Node.apply(this, arguments);
      }

      if (Node) TaggedTemplateExpression.__proto__ = Node;
      TaggedTemplateExpression.prototype = Object.create(Node && Node.prototype);
      TaggedTemplateExpression.prototype.constructor = TaggedTemplateExpression;

      TaggedTemplateExpression.prototype.initialise = function initialise(transforms) {
        if (transforms.templateString && !transforms.dangerousTaggedTemplateString) {
          throw new CompileError(this, 'Tagged template strings are not supported. Use `transforms: { templateString: false }` to skip transformation and disable this error, or `transforms: { dangerousTaggedTemplateString: true }` if you know what you\'re doing');
        }

        Node.prototype.initialise.call(this, transforms);
      };

      TaggedTemplateExpression.prototype.transpile = function transpile(code, transforms) {
        if (transforms.templateString && transforms.dangerousTaggedTemplateString) {
          var ordered = this.quasi.expressions.concat(this.quasi.quasis).sort(function (a, b) {
            return a.start - b.start;
          });

          // insert strings at start
          var templateStrings = this.quasi.quasis.map(function (quasi) {
            return JSON.stringify(quasi.value.cooked);
          });
          code.overwrite(this.tag.end, ordered[0].start, "([" + templateStrings.join(', ') + "]");

          var lastIndex = ordered[0].start;
          ordered.forEach(function (node) {
            if (node.type === 'TemplateElement') {
              code.remove(lastIndex, node.end);
            } else {
              code.overwrite(lastIndex, node.start, ', ');
            }

            lastIndex = node.end;
          });

          code.overwrite(lastIndex, this.end, ')');
        }

        Node.prototype.transpile.call(this, code, transforms);
      };

      return TaggedTemplateExpression;
    }(Node);

    var TemplateElement = function (Node) {
      function TemplateElement() {
        Node.apply(this, arguments);
      }

      if (Node) TemplateElement.__proto__ = Node;
      TemplateElement.prototype = Object.create(Node && Node.prototype);
      TemplateElement.prototype.constructor = TemplateElement;

      TemplateElement.prototype.initialise = function initialise() {
        this.program.indentExclusionElements.push(this);
      };

      return TemplateElement;
    }(Node);

    var TemplateLiteral = function (Node) {
      function TemplateLiteral() {
        Node.apply(this, arguments);
      }

      if (Node) TemplateLiteral.__proto__ = Node;
      TemplateLiteral.prototype = Object.create(Node && Node.prototype);
      TemplateLiteral.prototype.constructor = TemplateLiteral;

      TemplateLiteral.prototype.transpile = function transpile(code, transforms) {
        if (transforms.templateString && this.parent.type !== 'TaggedTemplateExpression') {
          var ordered = this.expressions.concat(this.quasis).sort(function (a, b) {
            return a.start - b.start || a.end - b.end;
          }).filter(function (node, i) {
            // include all expressions
            if (node.type !== 'TemplateElement') return true;

            // include all non-empty strings
            if (node.value.raw) return true;

            // exclude all empty strings not at the head
            return !i;
          });

          // special case – we may be able to skip the first element,
          // if it's the empty string, but only if the second and
          // third elements aren't both expressions (since they maybe
          // be numeric, and `1 + 2 + '3' === '33'`)
          if (ordered.length >= 3) {
            var first = ordered[0];
            var third = ordered[2];
            if (first.type === 'TemplateElement' && first.value.raw === '' && third.type === 'TemplateElement') {
              ordered.shift();
            }
          }

          var parenthesise = (this.quasis.length !== 1 || this.expressions.length !== 0) && this.parent.type !== 'AssignmentExpression' && this.parent.type !== 'AssignmentPattern' && this.parent.type !== 'VariableDeclarator' && (this.parent.type !== 'BinaryExpression' || this.parent.operator !== '+');

          if (parenthesise) code.insertRight(this.start, '(');

          var lastIndex = this.start;

          ordered.forEach(function (node, i) {
            if (node.type === 'TemplateElement') {
              var replacement = '';
              if (i) replacement += ' + ';
              replacement += JSON.stringify(node.value.cooked);

              code.overwrite(lastIndex, node.end, replacement);
            } else {
              var parenthesise = node.type !== 'Identifier'; // TODO other cases where it's safe

              var replacement$1 = '';
              if (i) replacement$1 += ' + ';
              if (parenthesise) replacement$1 += '(';

              code.overwrite(lastIndex, node.start, replacement$1);

              if (parenthesise) code.insertLeft(node.end, ')');
            }

            lastIndex = node.end;
          });

          var close = '';
          if (parenthesise) close += ')';

          code.overwrite(lastIndex, this.end, close);
        }

        Node.prototype.transpile.call(this, code, transforms);
      };

      return TemplateLiteral;
    }(Node);

    var ThisExpression = function (Node) {
      function ThisExpression() {
        Node.apply(this, arguments);
      }

      if (Node) ThisExpression.__proto__ = Node;
      ThisExpression.prototype = Object.create(Node && Node.prototype);
      ThisExpression.prototype.constructor = ThisExpression;

      ThisExpression.prototype.initialise = function initialise(transforms) {
        if (transforms.arrow) {
          var lexicalBoundary = this.findLexicalBoundary();
          var arrowFunction = this.findNearest('ArrowFunctionExpression');
          var loop = this.findNearest(loopStatement);

          if (arrowFunction && arrowFunction.depth > lexicalBoundary.depth || loop && loop.body.contains(this) && loop.depth > lexicalBoundary.depth || loop && loop.right && loop.right.contains(this)) {
            this.alias = lexicalBoundary.getThisAlias();
          }
        }
      };

      ThisExpression.prototype.transpile = function transpile(code) {
        if (this.alias) {
          code.overwrite(this.start, this.end, this.alias, true);
        }
      };

      return ThisExpression;
    }(Node);

    var UpdateExpression = function (Node) {
      function UpdateExpression() {
        Node.apply(this, arguments);
      }

      if (Node) UpdateExpression.__proto__ = Node;
      UpdateExpression.prototype = Object.create(Node && Node.prototype);
      UpdateExpression.prototype.constructor = UpdateExpression;

      UpdateExpression.prototype.initialise = function initialise(transforms) {
        if (this.argument.type === 'Identifier') {
          var declaration = this.findScope(false).findDeclaration(this.argument.name);
          if (declaration && declaration.kind === 'const') {
            throw new CompileError(this, this.argument.name + " is read-only");
          }

          // special case – https://gitlab.com/Rich-Harris/buble/issues/150
          var statement = declaration && declaration.node.ancestor(3);
          if (statement && statement.type === 'ForStatement' && statement.body.contains(this)) {
            statement.reassigned[this.argument.name] = true;
          }
        }

        Node.prototype.initialise.call(this, transforms);
      };

      return UpdateExpression;
    }(Node);

    var VariableDeclaration = function (Node) {
      function VariableDeclaration() {
        Node.apply(this, arguments);
      }

      if (Node) VariableDeclaration.__proto__ = Node;
      VariableDeclaration.prototype = Object.create(Node && Node.prototype);
      VariableDeclaration.prototype.constructor = VariableDeclaration;

      VariableDeclaration.prototype.initialise = function initialise(transforms) {
        this.scope = this.findScope(this.kind === 'var');
        this.declarations.forEach(function (declarator) {
          return declarator.initialise(transforms);
        });
      };

      VariableDeclaration.prototype.transpile = function transpile(code, transforms) {
        var this$1 = this;

        var i0 = this.getIndentation();
        var kind = this.kind;

        if (transforms.letConst && kind !== 'var') {
          kind = 'var';
          code.overwrite(this.start, this.start + this.kind.length, kind, true);
        }

        if (transforms.destructuring && this.parent.type !== 'ForOfStatement') {
          var c = this.start;
          var lastDeclaratorIsPattern;

          this.declarations.forEach(function (declarator, i) {
            if (declarator.id.type === 'Identifier') {
              if (i > 0 && this$1.declarations[i - 1].id.type !== 'Identifier') {
                code.overwrite(c, declarator.id.start, "var ");
              }
            } else {
              var inline = loopStatement.test(this$1.parent.type);

              if (i === 0) {
                code.remove(c, declarator.id.start);
              } else {
                code.overwrite(c, declarator.id.start, ";\n" + i0);
              }

              var simple = declarator.init.type === 'Identifier' && !declarator.init.rewritten;

              var name = simple ? declarator.init.name : declarator.findScope(true).createIdentifier('ref');

              var c$1 = declarator.start;

              var statementGenerators = [];

              if (simple) {
                code.remove(declarator.id.end, declarator.end);
              } else {
                statementGenerators.push(function (start, prefix, suffix) {
                  code.insertRight(declarator.id.end, "var " + name);
                  code.insertLeft(declarator.init.end, "" + suffix);
                  code.move(declarator.id.end, declarator.end, start);
                });
              }

              destructure(code, declarator.findScope(false), declarator.id, name, inline, statementGenerators);

              var prefix = inline ? 'var ' : '';
              var suffix = inline ? ", " : ";\n" + i0;
              statementGenerators.forEach(function (fn, j) {
                if (i === this$1.declarations.length - 1 && j === statementGenerators.length - 1) {
                  suffix = inline ? '' : ';';
                }

                fn(declarator.start, j === 0 ? prefix : '', suffix);
              });
            }

            declarator.transpile(code, transforms);

            c = declarator.end;
            lastDeclaratorIsPattern = declarator.id.type !== 'Identifier';
          });

          if (lastDeclaratorIsPattern) {
            code.remove(c, this.end);
          }
        } else {
          this.declarations.forEach(function (declarator) {
            declarator.transpile(code, transforms);
          });
        }
      };

      return VariableDeclaration;
    }(Node);

    var VariableDeclarator = function (Node) {
      function VariableDeclarator() {
        Node.apply(this, arguments);
      }

      if (Node) VariableDeclarator.__proto__ = Node;
      VariableDeclarator.prototype = Object.create(Node && Node.prototype);
      VariableDeclarator.prototype.constructor = VariableDeclarator;

      VariableDeclarator.prototype.initialise = function initialise(transforms) {
        var kind = this.parent.kind;
        if (kind === 'let' && this.parent.parent.type === 'ForStatement') {
          kind = 'for.let'; // special case...
        }

        this.parent.scope.addDeclaration(this.id, kind);
        Node.prototype.initialise.call(this, transforms);
      };

      VariableDeclarator.prototype.transpile = function transpile(code, transforms) {
        if (!this.init && transforms.letConst && this.parent.kind !== 'var') {
          var inLoop = this.findNearest(/Function|^For(In|Of)?Statement|^(?:Do)?WhileStatement/);
          if (inLoop && !/Function/.test(inLoop.type) && !this.isLeftDeclaratorOfLoop()) {
            code.insertLeft(this.id.end, ' = (void 0)');
          }
        }

        if (this.id) this.id.transpile(code, transforms);
        if (this.init) this.init.transpile(code, transforms);
      };

      VariableDeclarator.prototype.isLeftDeclaratorOfLoop = function isLeftDeclaratorOfLoop() {
        return this.parent && this.parent.type === 'VariableDeclaration' && this.parent.parent && (this.parent.parent.type === 'ForInStatement' || this.parent.parent.type === 'ForOfStatement') && this.parent.parent.left && this.parent.parent.left.declarations[0] === this;
      };

      return VariableDeclarator;
    }(Node);

    var types = {
      ArrayExpression: ArrayExpression,
      ArrowFunctionExpression: ArrowFunctionExpression,
      AssignmentExpression: AssignmentExpression,
      BinaryExpression: BinaryExpression,
      BreakStatement: BreakStatement,
      CallExpression: CallExpression,
      ClassBody: ClassBody,
      ClassDeclaration: ClassDeclaration,
      ClassExpression: ClassExpression,
      ContinueStatement: ContinueStatement,
      DoWhileStatement: LoopStatement,
      ExportNamedDeclaration: ExportNamedDeclaration,
      ExportDefaultDeclaration: ExportDefaultDeclaration,
      ForStatement: ForStatement,
      ForInStatement: ForInStatement,
      ForOfStatement: ForOfStatement,
      FunctionDeclaration: FunctionDeclaration,
      FunctionExpression: FunctionExpression,
      Identifier: Identifier,
      IfStatement: IfStatement,
      ImportDeclaration: ImportDeclaration,
      ImportDefaultSpecifier: ImportDefaultSpecifier,
      ImportSpecifier: ImportSpecifier,
      JSXAttribute: JSXAttribute,
      JSXClosingElement: JSXClosingElement,
      JSXElement: JSXElement,
      JSXExpressionContainer: JSXExpressionContainer,
      JSXOpeningElement: JSXOpeningElement,
      JSXSpreadAttribute: JSXSpreadAttribute,
      Literal: Literal,
      MemberExpression: MemberExpression,
      NewExpression: NewExpression,
      ObjectExpression: ObjectExpression,
      Property: Property,
      ReturnStatement: ReturnStatement,
      SpreadProperty: SpreadProperty,
      Super: Super,
      TaggedTemplateExpression: TaggedTemplateExpression,
      TemplateElement: TemplateElement,
      TemplateLiteral: TemplateLiteral,
      ThisExpression: ThisExpression,
      UpdateExpression: UpdateExpression,
      VariableDeclaration: VariableDeclaration,
      VariableDeclarator: VariableDeclarator,
      WhileStatement: LoopStatement
    };

    var statementsWithBlocks = {
      IfStatement: 'consequent',
      ForStatement: 'body',
      ForInStatement: 'body',
      ForOfStatement: 'body',
      WhileStatement: 'body',
      DoWhileStatement: 'body',
      ArrowFunctionExpression: 'body'
    };

    function wrap(raw, parent) {
      if (!raw) return;

      if ('length' in raw) {
        var i = raw.length;
        while (i--) {
          wrap(raw[i], parent);
        }return;
      }

      // with e.g. shorthand properties, key and value are
      // the same node. We don't want to wrap an object twice
      if (raw.__wrapped) return;
      raw.__wrapped = true;

      if (!keys[raw.type]) {
        keys[raw.type] = Object.keys(raw).filter(function (key) {
          return _typeof(raw[key]) === 'object';
        });
      }

      // special case – body-less if/for/while statements. TODO others?
      var bodyType = statementsWithBlocks[raw.type];
      if (bodyType && raw[bodyType].type !== 'BlockStatement') {
        var expression = raw[bodyType];

        // create a synthetic block statement, otherwise all hell
        // breaks loose when it comes to block scoping
        raw[bodyType] = {
          start: expression.start,
          end: expression.end,
          type: 'BlockStatement',
          body: [expression],
          synthetic: true
        };
      }

      new Node(raw, parent);

      var type = (raw.type === 'BlockStatement' ? BlockStatement : types[raw.type]) || Node;
      raw.__proto__ = type.prototype;
    }

    var letConst = /^(?:let|const)$/;

    function Scope(options) {
      options = options || {};

      this.parent = options.parent;
      this.isBlockScope = !!options.block;

      var scope = this;
      while (scope.isBlockScope) {
        scope = scope.parent;
      }this.functionScope = scope;

      this.identifiers = [];
      this.declarations = Object.create(null);
      this.references = Object.create(null);
      this.blockScopedDeclarations = this.isBlockScope ? null : Object.create(null);
      this.aliases = this.isBlockScope ? null : Object.create(null);
    }

    Scope.prototype = {
      addDeclaration: function addDeclaration(node, kind) {
        for (var i = 0, list = extractNames(node); i < list.length; i += 1) {
          var identifier = list[i];

          var name = identifier.name;
          var existingDeclaration = this.declarations[name];
          if (existingDeclaration && (letConst.test(kind) || letConst.test(existingDeclaration.kind))) {
            // TODO warn about double var declarations?
            throw new CompileError(identifier, name + " is already declared");
          }

          var declaration = { name: name, node: identifier, kind: kind, instances: [] };
          this.declarations[name] = declaration;

          if (this.isBlockScope) {
            if (!this.functionScope.blockScopedDeclarations[name]) this.functionScope.blockScopedDeclarations[name] = [];
            this.functionScope.blockScopedDeclarations[name].push(declaration);
          }
        }
      },

      addReference: function addReference(identifier) {
        if (this.consolidated) {
          this.consolidateReference(identifier);
        } else {
          this.identifiers.push(identifier);
        }
      },

      consolidate: function consolidate() {
        var this$1 = this;

        for (var i = 0; i < this$1.identifiers.length; i += 1) {
          // we might push to the array during consolidation, so don't cache length
          var identifier = this$1.identifiers[i];
          this$1.consolidateReference(identifier);
        }

        this.consolidated = true; // TODO understand why this is necessary... seems bad
      },

      consolidateReference: function consolidateReference(identifier) {
        var declaration = this.declarations[identifier.name];
        if (declaration) {
          declaration.instances.push(identifier);
        } else {
          this.references[identifier.name] = true;
          if (this.parent) this.parent.addReference(identifier);
        }
      },

      contains: function contains(name) {
        return this.declarations[name] || (this.parent ? this.parent.contains(name) : false);
      },

      createIdentifier: function createIdentifier(base) {
        var this$1 = this;

        if (typeof base === 'number') base = base.toString();

        base = base.replace(/\s/g, '').replace(/\[([^\]]+)\]/g, '_$1').replace(/[^a-zA-Z0-9_$]/g, '_').replace(/_{2,}/, '_');

        var name = base;
        var counter = 1;

        while (this$1.declarations[name] || this$1.references[name] || this$1.aliases[name] || name in reserved) {
          name = base + "$" + counter++;
        }

        this.aliases[name] = true;
        return name;
      },

      findDeclaration: function findDeclaration(name) {
        return this.declarations[name] || this.parent && this.parent.findDeclaration(name);
      }
    };

    function isUseStrict(node) {
      if (!node) return false;
      if (node.type !== 'ExpressionStatement') return false;
      if (node.expression.type !== 'Literal') return false;
      return node.expression.value === 'use strict';
    }

    var BlockStatement = function (Node) {
      function BlockStatement() {
        Node.apply(this, arguments);
      }

      if (Node) BlockStatement.__proto__ = Node;
      BlockStatement.prototype = Object.create(Node && Node.prototype);
      BlockStatement.prototype.constructor = BlockStatement;

      BlockStatement.prototype.createScope = function createScope() {
        var this$1 = this;

        this.parentIsFunction = /Function/.test(this.parent.type);
        this.isFunctionBlock = this.parentIsFunction || this.parent.type === 'Root';
        this.scope = new Scope({
          block: !this.isFunctionBlock,
          parent: this.parent.findScope(false)
        });

        if (this.parentIsFunction) {
          this.parent.params.forEach(function (node) {
            this$1.scope.addDeclaration(node, 'param');
          });
        }
      };

      BlockStatement.prototype.initialise = function initialise(transforms) {
        this.thisAlias = null;
        this.argumentsAlias = null;
        this.defaultParameters = [];

        // normally the scope gets created here, during initialisation,
        // but in some cases (e.g. `for` statements), we need to create
        // the scope early, as it pertains to both the init block and
        // the body of the statement
        if (!this.scope) this.createScope();

        this.body.forEach(function (node) {
          return node.initialise(transforms);
        });

        this.scope.consolidate();
      };

      BlockStatement.prototype.findLexicalBoundary = function findLexicalBoundary() {
        if (this.type === 'Program') return this;
        if (/^Function/.test(this.parent.type)) return this;

        return this.parent.findLexicalBoundary();
      };

      BlockStatement.prototype.findScope = function findScope(functionScope) {
        if (functionScope && !this.isFunctionBlock) return this.parent.findScope(functionScope);
        return this.scope;
      };

      BlockStatement.prototype.getArgumentsAlias = function getArgumentsAlias() {
        if (!this.argumentsAlias) {
          this.argumentsAlias = this.scope.createIdentifier('arguments');
        }

        return this.argumentsAlias;
      };

      BlockStatement.prototype.getArgumentsArrayAlias = function getArgumentsArrayAlias() {
        if (!this.argumentsArrayAlias) {
          this.argumentsArrayAlias = this.scope.createIdentifier('argsArray');
        }

        return this.argumentsArrayAlias;
      };

      BlockStatement.prototype.getThisAlias = function getThisAlias() {
        if (!this.thisAlias) {
          this.thisAlias = this.scope.createIdentifier('this');
        }

        return this.thisAlias;
      };

      BlockStatement.prototype.getIndentation = function getIndentation() {
        var this$1 = this;

        if (this.indentation === undefined) {
          var source = this.program.magicString.original;

          var useOuter = this.synthetic || !this.body.length;
          var c = useOuter ? this.start : this.body[0].start;

          while (c && source[c] !== '\n') {
            c -= 1;
          }this.indentation = '';

          while (true) {
            // eslint-disable-line no-constant-condition
            c += 1;
            var char = source[c];

            if (char !== ' ' && char !== '\t') break;

            this$1.indentation += char;
          }

          var indentString = this.program.magicString.getIndentString();

          // account for dedented class constructors
          var parent = this.parent;
          while (parent) {
            if (parent.kind === 'constructor' && !parent.parent.parent.superClass) {
              this$1.indentation = this$1.indentation.replace(indentString, '');
            }

            parent = parent.parent;
          }

          if (useOuter) this.indentation += indentString;
        }

        return this.indentation;
      };

      BlockStatement.prototype.transpile = function transpile(code, transforms) {
        var this$1 = this;

        var indentation = this.getIndentation();

        var introStatementGenerators = [];

        if (this.argumentsAlias) {
          introStatementGenerators.push(function (start, prefix, suffix) {
            var assignment = prefix + "var " + this$1.argumentsAlias + " = arguments" + suffix;
            code.insertLeft(start, assignment);
          });
        }

        if (this.thisAlias) {
          introStatementGenerators.push(function (start, prefix, suffix) {
            var assignment = prefix + "var " + this$1.thisAlias + " = this" + suffix;
            code.insertLeft(start, assignment);
          });
        }

        if (this.argumentsArrayAlias) {
          introStatementGenerators.push(function (start, prefix, suffix) {
            var i = this$1.scope.createIdentifier('i');
            var assignment = prefix + "var " + i + " = arguments.length, " + this$1.argumentsArrayAlias + " = Array(" + i + ");\n" + indentation + "while ( " + i + "-- ) " + this$1.argumentsArrayAlias + "[" + i + "] = arguments[" + i + "]" + suffix;
            code.insertLeft(start, assignment);
          });
        }

        if (/Function/.test(this.parent.type)) {
          this.transpileParameters(code, transforms, indentation, introStatementGenerators);
        }

        if (transforms.letConst && this.isFunctionBlock) {
          this.transpileBlockScopedIdentifiers(code);
        }

        Node.prototype.transpile.call(this, code, transforms);

        if (this.synthetic) {
          if (this.parent.type === 'ArrowFunctionExpression') {
            var expr = this.body[0];

            if (introStatementGenerators.length) {
              code.insertLeft(this.start, "{").insertRight(this.end, this.parent.getIndentation() + "}");

              code.insertRight(expr.start, "\n" + indentation + "return ");
              code.insertLeft(expr.end, ";\n");
            } else if (transforms.arrow) {
              code.insertLeft(expr.start, "{ return ");
              code.insertLeft(expr.end, "; }");
            }
          } else if (introStatementGenerators.length) {
            code.insertLeft(this.start, "{").insertRight(this.end, "}");
          }
        }

        var start;
        if (isUseStrict(this.body[0])) {
          start = this.body[0].end;
        } else if (this.synthetic || this.parent.type === 'Root') {
          start = this.start;
        } else {
          start = this.start + 1;
        }

        var prefix = "\n" + indentation;
        var suffix = ';';
        introStatementGenerators.forEach(function (fn, i) {
          if (i === introStatementGenerators.length - 1) suffix = ";\n";
          fn(start, prefix, suffix);
        });
      };

      BlockStatement.prototype.transpileParameters = function transpileParameters(code, transforms, indentation, introStatementGenerators) {
        var this$1 = this;

        var params = this.parent.params;

        params.forEach(function (param) {
          if (param.type === 'AssignmentPattern' && param.left.type === 'Identifier') {
            if (transforms.defaultParameter) {
              introStatementGenerators.push(function (start, prefix, suffix) {
                var lhs = prefix + "if ( " + param.left.name + " === void 0 ) " + param.left.name;

                code.insertRight(param.left.end, lhs).move(param.left.end, param.right.end, start).insertLeft(param.right.end, suffix);
              });
            }
          } else if (param.type === 'RestElement') {
            if (transforms.spreadRest) {
              introStatementGenerators.push(function (start, prefix, suffix) {
                var penultimateParam = params[params.length - 2];

                if (penultimateParam) {
                  code.remove(penultimateParam ? penultimateParam.end : param.start, param.end);
                } else {
                  var start$1 = param.start,
                      end = param.end; // TODO https://gitlab.com/Rich-Harris/buble/issues/8

                  while (/\s/.test(code.original[start$1 - 1])) {
                    start$1 -= 1;
                  }while (/\s/.test(code.original[end])) {
                    end += 1;
                  }code.remove(start$1, end);
                }

                var name = param.argument.name;
                var len = this$1.scope.createIdentifier('len');
                var count = params.length - 1;

                if (count) {
                  code.insertLeft(start, prefix + "var " + name + " = [], " + len + " = arguments.length - " + count + ";\n" + indentation + "while ( " + len + "-- > 0 ) " + name + "[ " + len + " ] = arguments[ " + len + " + " + count + " ]" + suffix);
                } else {
                  code.insertLeft(start, prefix + "var " + name + " = [], " + len + " = arguments.length;\n" + indentation + "while ( " + len + "-- ) " + name + "[ " + len + " ] = arguments[ " + len + " ]" + suffix);
                }
              });
            }
          } else if (param.type !== 'Identifier') {
            if (transforms.parameterDestructuring) {
              var ref = this$1.scope.createIdentifier('ref');
              destructure(code, this$1.scope, param, ref, false, introStatementGenerators);
              code.insertLeft(param.start, ref);
            }
          }
        });
      };

      BlockStatement.prototype.transpileBlockScopedIdentifiers = function transpileBlockScopedIdentifiers(code) {
        var this$1 = this;

        Object.keys(this.scope.blockScopedDeclarations).forEach(function (name) {
          var declarations = this$1.scope.blockScopedDeclarations[name];

          for (var i = 0, list = declarations; i < list.length; i += 1) {
            var declaration = list[i];

            var cont = false; // TODO implement proper continue...

            if (declaration.kind === 'for.let') {
              // special case
              var forStatement = declaration.node.findNearest('ForStatement');

              if (forStatement.shouldRewriteAsFunction) {
                var outerAlias = this$1.scope.createIdentifier(name);
                var innerAlias = forStatement.reassigned[name] ? this$1.scope.createIdentifier(name) : name;

                declaration.name = outerAlias;
                code.overwrite(declaration.node.start, declaration.node.end, outerAlias, true);

                forStatement.aliases[name] = {
                  outer: outerAlias,
                  inner: innerAlias
                };

                for (var i$1 = 0, list$1 = declaration.instances; i$1 < list$1.length; i$1 += 1) {
                  var identifier = list$1[i$1];

                  var alias = forStatement.body.contains(identifier) ? innerAlias : outerAlias;

                  if (name !== alias) {
                    code.overwrite(identifier.start, identifier.end, alias, true);
                  }
                }

                cont = true;
              }
            }

            if (!cont) {
              var alias$1 = this$1.scope.createIdentifier(name);

              if (name !== alias$1) {
                declaration.name = alias$1;
                code.overwrite(declaration.node.start, declaration.node.end, alias$1, true);

                for (var i$2 = 0, list$2 = declaration.instances; i$2 < list$2.length; i$2 += 1) {
                  var identifier$1 = list$2[i$2];

                  identifier$1.rewritten = true;
                  code.overwrite(identifier$1.start, identifier$1.end, alias$1, true);
                }
              }
            }
          }
        });
      };

      return BlockStatement;
    }(Node);

    function Program(source, ast, transforms, options) {
      var this$1 = this;

      this.type = 'Root';

      // options
      this.jsx = options.jsx || 'React.createElement';
      this.options = options;

      this.source = source;
      this.magicString = new MagicString(source);

      this.ast = ast;
      this.depth = 0;

      wrap(this.body = ast, this);
      this.body.__proto__ = BlockStatement.prototype;

      this.indentExclusionElements = [];
      this.body.initialise(transforms);

      this.indentExclusions = Object.create(null);
      for (var i$1 = 0, list = this.indentExclusionElements; i$1 < list.length; i$1 += 1) {
        var node = list[i$1];

        for (var i = node.start; i < node.end; i += 1) {
          this$1.indentExclusions[i] = true;
        }
      }

      this.body.transpile(this.magicString, transforms);
    }

    Program.prototype = {
      export: function export$1(options) {
        if (options === void 0) options = {};

        return {
          code: this.magicString.toString(),
          map: this.magicString.generateMap({
            file: options.file,
            source: options.source,
            includeContent: options.includeContent !== false
          })
        };
      },

      findNearest: function findNearest() {
        return null;
      },

      findScope: function findScope() {
        return null;
      }
    };

    var matrix = {
      chrome: {
        48: 1333689725,
        49: 1342078975,
        50: 1610514431,
        51: 1610514431,
        52: 2147385343
      },
      firefox: {
        43: 1207307741,
        44: 1207307741,
        45: 1207307741,
        46: 1476267485,
        47: 1476296671,
        48: 1476296671
      },
      safari: {
        8: 1073741824,
        9: 1328940894
      },
      ie: {
        8: 0,
        9: 1073741824,
        10: 1073741824,
        11: 1073770592
      },
      edge: {
        12: 1591620701,
        13: 1608400479
      },
      node: {
        '0.10': 1075052608,
        '0.12': 1091830852,
        4: 1327398527,
        5: 1327398527,
        6: 1610514431
      }
    };

    var features = ['arrow', 'classes', 'collections', 'computedProperty', 'conciseMethodProperty', 'constLoop', 'constRedef', 'defaultParameter', 'destructuring', 'extendNatives', 'forOf', 'generator', 'letConst', 'letLoop', 'letLoopScope', 'moduleExport', 'moduleImport', 'numericLiteral', 'objectProto', 'objectSuper', 'oldOctalLiteral', 'parameterDestructuring', 'spreadRest', 'stickyRegExp', 'symbol', 'templateString', 'unicodeEscape', 'unicodeIdentifier', 'unicodeRegExp',

    // ES2016
    'exponentiation',

    // additional transforms, not from
    // https://featuretests.io
    'reservedProperties'];

    var version = "0.15.2";

    var ref = [acornObjectSpread, acornJsx].reduce(function (final, plugin) {
      return plugin(final);
    }, acorn$1);
    var parse = ref.parse;

    var dangerousTransforms = ['dangerousTaggedTemplateString', 'dangerousForOf'];

    function target(target) {
      var targets = Object.keys(target);
      var bitmask = targets.length ? 2147483647 : 1073741824;

      Object.keys(target).forEach(function (environment) {
        var versions = matrix[environment];
        if (!versions) throw new Error("Unknown environment '" + environment + "'. Please raise an issue at https://gitlab.com/Rich-Harris/buble/issues");

        var targetVersion = target[environment];
        if (!(targetVersion in versions)) throw new Error("Support data exists for the following versions of " + environment + ": " + Object.keys(versions).join(', ') + ". Please raise an issue at https://gitlab.com/Rich-Harris/buble/issues");
        var support = versions[targetVersion];

        bitmask &= support;
      });

      var transforms = Object.create(null);
      features.forEach(function (name, i) {
        transforms[name] = !(bitmask & 1 << i);
      });

      dangerousTransforms.forEach(function (name) {
        transforms[name] = false;
      });

      return transforms;
    }

    function transform(source, options) {
      if (options === void 0) options = {};

      var ast;

      try {
        ast = parse(source, {
          ecmaVersion: 7,
          preserveParens: true,
          sourceType: 'module',
          plugins: {
            jsx: true,
            objectSpread: true
          }
        });
      } catch (err) {
        err.snippet = getSnippet(source, err.loc);
        err.toString = function () {
          return err.name + ": " + err.message + "\n" + err.snippet;
        };
        throw err;
      }

      var transforms = target(options.target || {});
      Object.keys(options.transforms || {}).forEach(function (name) {
        if (name === 'modules') {
          if (!('moduleImport' in options.transforms)) transforms.moduleImport = options.transforms.modules;
          if (!('moduleExport' in options.transforms)) transforms.moduleExport = options.transforms.modules;
          return;
        }

        if (!(name in transforms)) throw new Error("Unknown transform '" + name + "'");
        transforms[name] = options.transforms[name];
      });

      return new Program(source, ast, transforms, options).export(options);
    }

    exports.target = target;
    exports.transform = transform;
    exports.VERSION = version;

    Object.defineProperty(exports, '__esModule', { value: true });
  });
  
});

var buble_deps_1 = buble_deps.transform;

var _global = createCommonjsModule(function (module) {
  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
  if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
  var core = module.exports = { version: '2.4.0' };
  if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});

var _isObject = function _isObject(it) {
  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function _anObject(it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function _fails(exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

var document$1 = _global.document;
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function _domCreate(it) {
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function _toPrimitive(it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) {/* empty */}
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
  f: f
};

var _propertyDesc = function _propertyDesc(bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function _has(it, key) {
  return hasOwnProperty.call(it, key);
};

var id = 0;
var px = Math.random();
var _uid = function _uid(key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var _redefine = createCommonjsModule(function (module) {
  var SRC = _uid('src'),
      TO_STRING = 'toString',
      $toString = Function[TO_STRING],
      TPL = ('' + $toString).split(TO_STRING);

  _core.inspectSource = function (it) {
    return $toString.call(it);
  };

  (module.exports = function (O, key, val, safe) {
    var isFunction = typeof val == 'function';
    if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
    if (O[key] === val) return;
    if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
    if (O === _global) {
      O[key] = val;
    } else {
      if (!safe) {
        delete O[key];
        _hide(O, key, val);
      } else {
        if (O[key]) O[key] = val;else _hide(O, key, val);
      }
    }
    // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, TO_STRING, function toString() {
    return typeof this == 'function' && this[SRC] || $toString.call(this);
  });
});

var _aFunction = function _aFunction(it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function _ctx(fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1:
      return function (a) {
        return fn.call(that, a);
      };
    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };
    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }
  return function () /* ...args */{
    return fn.apply(that, arguments);
  };
};

var PROTOTYPE = 'prototype';

var $export = function $export(type, name, source) {
  var IS_FORCED = type & $export.F,
      IS_GLOBAL = type & $export.G,
      IS_STATIC = type & $export.S,
      IS_PROTO = type & $export.P,
      IS_BIND = type & $export.B,
      target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE],
      exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {}),
      expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {}),
      key,
      own,
      out,
      exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // extend global
    if (target) _redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) _hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
_global.core = _core;
// type bitmap
$export.F = 1; // forced
$export.G = 2; // global
$export.S = 4; // static
$export.P = 8; // proto
$export.B = 16; // bind
$export.W = 32; // wrap
$export.U = 64; // safe
$export.R = 128; // real proto method for `library` 
var _export = $export;

var toString = {}.toString;

var _cof = function _cof(it) {
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function _defined(it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// to indexed object, toObject with fallback for non-array-like ES3 strings

var _toIobject = function _toIobject(it) {
  return _iobject(_defined(it));
};

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function _toInteger(it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength
var min = Math.min;
var _toLength = function _toLength(it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;
var _toIndex = function _toIndex(index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes

var _arrayIncludes = function _arrayIncludes(IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this),
        length = _toLength(O.length),
        index = _toIndex(fromIndex, length),
        value;
    // Array#includes uses SameValueZero equality algorithm
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      if (value != value) return true;
      // Array#toIndex ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if (IS_INCLUDES || index in O) {
        if (O[index] === el) return IS_INCLUDES || index || 0;
      }
    }return !IS_INCLUDES && -1;
  };
};

var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});
var _shared = function _shared(key) {
  return store[key] || (store[key] = {});
};

var shared = _shared('keys');
var _sharedKey = function _sharedKey(key) {
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO = _sharedKey('IE_PROTO');

var _objectKeysInternal = function _objectKeysInternal(object, names) {
  var O = _toIobject(object),
      i = 0,
      result = [],
      key;
  for (key in O) {
    if (key != IE_PROTO) _has(O, key) && result.push(key);
  } // Don't enum bug & hidden keys
  while (names.length > i) {
    if (_has(O, key = names[i++])) {
      ~arrayIndexOf(result, key) || result.push(key);
    }
  }return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)


var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

var f$1 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$1
};

var f$2 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$2
};

// 7.1.13 ToObject(argument)

var _toObject = function _toObject(it) {
  return Object(_defined(it));
};

// 19.1.2.1 Object.assign(target, source, ...)
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || _fails(function () {
  var A = {},
      B = {},
      S = Symbol(),
      K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) {
    B[k] = k;
  });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) {
  // eslint-disable-line no-unused-vars
  var T = _toObject(target),
      aLen = arguments.length,
      index = 1,
      getSymbols = _objectGops.f,
      isEnum = _objectPie.f;
  while (aLen > index) {
    var S = _iobject(arguments[index++]),
        keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S),
        length = keys.length,
        j = 0,
        key;
    while (length > j) {
      if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
    }
  }return T;
} : $assign;

// 19.1.3.1 Object.assign(target, source)


_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

var assign = _core.Object.assign;

var _poly = { assign: assign };

var opts = {
  objectAssign: '_poly.assign',
  transforms: {
    dangerousForOf: true,
    dangerousTaggedTemplateString: true
  }
};

var transform$$1 = (function (code) {
  return buble_deps_1(code, opts).code;
});

var errorBoundary = function errorBoundary(element, errorCallback) {
  var isEvalFunc = typeof element === 'function';

  if (isEvalFunc && __WEBPACK_IMPORTED_MODULE_0_react__["Component"].isPrototypeOf(element)) {
    var originalRender = element.prototype.render;
    element.prototype.render = function render() {
      try {
        return originalRender.apply(this, arguments);
      } catch (err) {
        setTimeout(function () {
          errorCallback(err);
        });

        return null;
      }
    };
  } else if (isEvalFunc) {
    return function wrappedPFC() {
      try {
        return element();
      } catch (err) {
        setTimeout(function () {
          errorCallback(err);
        });

        return null;
      }
    };
  }

  return element;
};

var evalCode = function evalCode(code, scope) {
  var scopeKeys = Object.keys(scope);
  var scopeValues = scopeKeys.map(function (key) {
    return scope[key];
  });
  var res = new (Function.prototype.bind.apply(Function, [null].concat(['_poly', 'React'], scopeKeys, [code])))();
  return res.apply(undefined, [_poly, __WEBPACK_IMPORTED_MODULE_0_react___default.a].concat(scopeValues));
};

var generateElement = function generateElement(_ref, errorCallback) {
  var _ref$code = _ref.code,
      code = _ref$code === undefined ? '' : _ref$code,
      _ref$scope = _ref.scope,
      scope = _ref$scope === undefined ? {} : _ref$scope;

  // NOTE: Workaround for classes, since buble doesn't allow `return` without a function
  var transformed = transform$$1(code).trim().replace(/^var \w+ =/, '').replace(/;$/, '');

  return errorBoundary(evalCode('return (' + transformed + ')', scope), errorCallback);
};

var renderElementAsync = function renderElementAsync(_ref2, resultCallback, errorCallback) {
  var _ref2$code = _ref2.code,
      code = _ref2$code === undefined ? '' : _ref2$code,
      _ref2$scope = _ref2.scope,
      scope = _ref2$scope === undefined ? {} : _ref2$scope;

  var render = function render(element) {
    resultCallback(errorBoundary(element, errorCallback));
  };

  if (!/render\s*\(/.test(code)) {
    return errorCallback(new SyntaxError('No-Inline evaluations must call `render`.'));
  }

  evalCode(transform$$1(code), _extends({}, scope, { render: render }));
};

var css = "\n.prism-code {\n  display: block;\n  white-space: pre;\n\n  background-color: #1D1F21;\n  color: #C5C8C6;\n\n  padding: 0.5rem;\n  margin: 0;\n\n  box-sizing: border-box;\n  vertical-align: baseline;\n  outline: none;\n  text-shadow: none;\n  -webkit-hyphens: none;\n  -ms-hyphens: none;\n  hyphens: none;\n  word-wrap: normal;\n  word-break: normal;\n  text-align: left;\n  word-spacing: normal;\n  -moz-tab-size: 2;\n  -o-tab-size: 2;\n  tab-size: 2;\n}\n\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n  color: hsl(30, 20%, 50%);\n}\n\n.token.punctuation {\n  opacity: .7;\n}\n\n.namespace {\n  opacity: .7;\n}\n\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol {\n  color: hsl(350, 40%, 70%);\n}\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n  color: hsl(75, 70%, 60%);\n}\n\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string,\n.token.variable {\n  color: hsl(40, 90%, 60%);\n}\n\n.token.atrule,\n.token.attr-value,\n.token.keyword {\n  color: hsl(350, 40%, 70%);\n}\n\n.token.regex,\n.token.important {\n  color: #e90;\n}\n\n.token.important,\n.token.bold {\n  font-weight: bold;\n}\n.token.italic {\n  font-style: italic;\n}\n\n.token.entity {\n  cursor: help;\n}\n\n.token.deleted {\n  color: red;\n}\n";

var prismStyling = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('style', { dangerouslySetInnerHTML: { __html: css } });

var Style = (function () {
  return prismStyling;
});

var LiveContextTypes = {
  live: index$6.shape({
    code: index$6.string,
    error: index$6.string,

    onError: index$6.func,
    onChange: index$6.func,

    element: index$6.oneOfType([index$6.string, index$6.number, index$6.element, index$6.func])
  })
};

var LiveProvider = function (_Component) {
  inherits(LiveProvider, _Component);

  function LiveProvider() {
    var _temp, _this, _ret;

    classCallCheck(this, LiveProvider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.onChange = function (code) {
      var _this$props = _this.props,
          scope = _this$props.scope,
          transformCode = _this$props.transformCode,
          noInline = _this$props.noInline;

      _this.transpile({ code: code, scope: scope, transformCode: transformCode, noInline: noInline });
    }, _this.onError = function (error) {
      _this.setState({ error: error.toString() });
    }, _this.transpile = function (_ref) {
      var code = _ref.code,
          scope = _ref.scope,
          transformCode = _ref.transformCode,
          _ref$noInline = _ref.noInline,
          noInline = _ref$noInline === undefined ? false : _ref$noInline;

      // Transpilation arguments
      var input = {
        code: transformCode ? transformCode(code) : code,
        scope: scope
      };
      var errorCallback = function errorCallback(err) {
        return _this.setState({ element: undefined, error: err.toString() });
      };
      var renderElement = function renderElement(element) {
        return _this.setState(_extends({}, state, { element: element }));
      };

      // State reset object
      var state = { unsafeWrapperError: undefined, error: undefined };

      try {
        if (noInline) {
          _this.setState(_extends({}, state, { element: null })); // Reset output for async (no inline) evaluation
          renderElementAsync(input, renderElement, errorCallback);
        } else {
          renderElement(generateElement(input, errorCallback));
        }
      } catch (error) {
        _this.setState(_extends({}, state, { error: error.toString() }));
      }
    }, _this.getChildContext = function () {
      return {
        live: _extends({}, _this.state, {
          code: _this.props.code,
          onError: _this.onError,
          onChange: _this.onChange
        })
      };
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  LiveProvider.prototype.componentWillMount = function componentWillMount() {
    var _props = this.props,
        code = _props.code,
        scope = _props.scope,
        transformCode = _props.transformCode,
        noInline = _props.noInline;


    this.transpile({ code: code, scope: scope, transformCode: transformCode, noInline: noInline });
  };

  LiveProvider.prototype.componentWillReceiveProps = function componentWillReceiveProps(_ref2) {
    var code = _ref2.code,
        scope = _ref2.scope,
        noInline = _ref2.noInline,
        transformCode = _ref2.transformCode;

    if (code !== this.props.code || scope !== this.props.scope || noInline !== this.props.noInline || transformCode !== this.props.transformCode) {
      this.transpile({ code: code, scope: scope, transformCode: transformCode, noInline: noInline });
    }
  };

  LiveProvider.prototype.render = function render() {
    var _props2 = this.props,
        children = _props2.children,
        className = _props2.className,
        code = _props2.code,
        mountStylesheet = _props2.mountStylesheet,
        noInline = _props2.noInline,
        transformCode = _props2.transformCode,
        rest = objectWithoutProperties(_props2, ['children', 'className', 'code', 'mountStylesheet', 'noInline', 'transformCode']);


    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      _extends({
        className: cn('react-live', className)
      }, rest),
      mountStylesheet && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Style, null),
      children
    );
  };

  return LiveProvider;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

LiveProvider.childContextTypes = LiveContextTypes;
LiveProvider.defaultProps = {
  code: '',
  mountStylesheet: true,
  noInline: false
};
LiveProvider.propTypes = {
  className: index$6.string,
  code: index$6.string,
  scope: index$6.object,
  mountStylesheet: index$6.bool,
  noInline: index$6.bool,
  transformCode: index$6.func
};

var LiveEditor = function LiveEditor(props, _ref) {
  var live = _ref.live;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Editor, _extends({}, props, {
    code: live.code,
    onChange: function onChange(code) {
      live.onChange(code);

      if (typeof props.onChange === 'function') {
        props.onChange(code);
      }
    }
  }));
};

LiveEditor.contextTypes = LiveContextTypes;
LiveEditor.propTypes = { onChange: index$6.func };

var LiveError = function LiveError(_ref, _ref2) {
  var live = _ref2.live;
  var className = _ref.className,
      rest = objectWithoutProperties(_ref, ['className']);
  return live.error ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    _extends({}, rest, {
      className: cn('react-live-error', className)
    }),
    live.error
  ) : null;
};

LiveError.contextTypes = LiveContextTypes;

var LivePreview = function LivePreview(_ref, _ref2) {
  var element = _ref2.live.element;
  var className = _ref.className,
      rest = objectWithoutProperties(_ref, ['className']);
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    _extends({}, rest, {
      className: cn('react-live-preview', className)
    }),
    typeof element === 'function' ? Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(element) : element
  );
};

LivePreview.contextTypes = LiveContextTypes;

var withLive = function withLive(WrappedComponent) {
  var WithLive = function (_Component) {
    inherits(WithLive, _Component);

    function WithLive() {
      classCallCheck(this, WithLive);
      return possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    WithLive.prototype.render = function render() {
      var live = this.context.live;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(WrappedComponent, { live: live });
    };

    return WithLive;
  }(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

  WithLive.contextTypes = LiveContextTypes;


  return WithLive;
};



/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(2), __webpack_require__(12).Buffer))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(13)
var ieee754 = __webpack_require__(14)
var isArray = __webpack_require__(15)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 14 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 15 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global, process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "css", function() { return css; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keyframes", function() { return keyframes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "injectGlobal", function() { return injectGlobal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeProvider", function() { return ThemeProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withTheme", function() { return wrapWithTheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServerStyleSheet", function() { return ServerStyleSheet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyleSheetManager", function() { return StyleSheetManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_is_plain_object__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_is_plain_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_is_plain_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_stylis__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_stylis___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_stylis__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_is_function__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_is_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_is_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_hoist_non_react_statics__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_hoist_non_react_statics___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_hoist_non_react_statics__);







/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */

var _uppercasePattern = /([A-Z])/g;

/**
 * Hyphenates a camelcased string, for example:
 *
 *   > hyphenate('backgroundColor')
 *   < "background-color"
 *
 * For CSS style names, use `hyphenateStyleName` instead which works properly
 * with all vendor prefixes, including `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenate$2(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

var hyphenate_1 = hyphenate$2;

var hyphenate = hyphenate_1;

var msPattern = /^ms-/;

/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenateStyleName(string) {
  return hyphenate(string).replace(msPattern, '-ms-');
}

var hyphenateStyleName_1 = hyphenateStyleName;

//      
var objToCss = function objToCss(obj, prevKey) {
  var css = Object.keys(obj).map(function (key) {
    if (__WEBPACK_IMPORTED_MODULE_0_is_plain_object___default()(obj[key])) return objToCss(obj[key], key);
    return hyphenateStyleName_1(key) + ': ' + obj[key] + ';';
  }).join(' ');
  return prevKey ? prevKey + ' {\n  ' + css + '\n}' : css;
};

var flatten = function flatten(chunks, executionContext) {
  return chunks.reduce(function (ruleSet, chunk) {
    /* Remove falsey values */
    if (chunk === undefined || chunk === null || chunk === false || chunk === '') return ruleSet;
    /* Flatten ruleSet */
    if (Array.isArray(chunk)) return [].concat(ruleSet, flatten(chunk, executionContext));

    /* Handle other components */
    // $FlowFixMe not sure how to make this pass
    if (chunk.hasOwnProperty('styledComponentId')) return [].concat(ruleSet, ['.' + chunk.styledComponentId]);

    /* Either execute or defer the function */
    if (typeof chunk === 'function') {
      return executionContext ? ruleSet.concat.apply(ruleSet, flatten([chunk(executionContext)], executionContext)) : ruleSet.concat(chunk);
    }

    /* Handle objects */
    // $FlowFixMe have to add %checks somehow to isPlainObject
    return ruleSet.concat(__WEBPACK_IMPORTED_MODULE_0_is_plain_object___default()(chunk) ? objToCss(chunk) : chunk.toString());
  }, []);
};

//      
var stylis = new __WEBPACK_IMPORTED_MODULE_1_stylis___default.a({
  global: false,
  cascade: true,
  keyframe: false,
  prefix: true,
  compress: false,
  semicolon: true
});

var stringifyRules = function stringifyRules(rules, selector, prefix) {
  var flatCSS = rules.join('').replace(/^\s*\/\/.*$/gm, ''); // replace JS comments

  var cssStr = selector && prefix ? prefix + ' ' + selector + ' { ' + flatCSS + ' }' : flatCSS;

  return stylis(prefix || !selector ? '' : selector, cssStr);
};

//      
var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
var charsLength = chars.length;

/* Some high number, usually 9-digit base-10. Map it to base-😎 */
var generateAlphabeticName = function generateAlphabeticName(code) {
  var name = '';
  var x = void 0;

  for (x = code; x > charsLength; x = Math.floor(x / charsLength)) {
    name = chars[x % charsLength] + name;
  }

  return chars[x % charsLength] + name;
};

//      


var interleave = (function (strings, interpolations) {
  return interpolations.reduce(function (array, interp, i) {
    return array.concat(interp, strings[i + 1]);
  }, [strings[0]]);
});

//      
var css = (function (strings) {
  for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    interpolations[_key - 1] = arguments[_key];
  }

  return flatten(interleave(strings, interpolations));
});

//      
var SC_COMPONENT_ID = /^[^\S\n]*?\/\* sc-component-id:\s+(\S+)\s+\*\//mg;

var extractCompsFromCSS = (function (maybeCSS) {
  var css = '' + (maybeCSS || ''); // Definitely a string, and a clone
  var existingComponents = [];
  css.replace(SC_COMPONENT_ID, function (match, componentId, matchIndex) {
    existingComponents.push({ componentId: componentId, matchIndex: matchIndex });
    return match;
  });
  return existingComponents.map(function (_ref, i) {
    var componentId = _ref.componentId,
        matchIndex = _ref.matchIndex;

    var nextComp = existingComponents[i + 1];
    var cssFromDOM = nextComp ? css.slice(matchIndex, nextComp.matchIndex) : css.slice(matchIndex);
    return { componentId: componentId, cssFromDOM: cssFromDOM };
  });
});

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

//      
/* eslint-disable no-underscore-dangle */
/*
 * Browser Style Sheet with Rehydration
 *
 * <style data-styled-components="x y z"
 *        data-styled-components-is-local="true">
 *   /· sc-component-id: a ·/
 *   .sc-a { ... }
 *   .x { ... }
 *   /· sc-component-id: b ·/
 *   .sc-b { ... }
 *   .y { ... }
 *   .z { ... }
 * </style>
 *
 * Note: replace · with * in the above snippet.
 * */
var COMPONENTS_PER_TAG = 40;

var BrowserTag = function () {
  function BrowserTag(el, isLocal) {
    var existingSource = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    classCallCheck(this, BrowserTag);

    this.el = el;
    this.isLocal = isLocal;
    this.ready = false;

    var extractedComps = extractCompsFromCSS(existingSource);

    this.size = extractedComps.length;
    this.components = extractedComps.reduce(function (acc, obj) {
      acc[obj.componentId] = obj; // eslint-disable-line no-param-reassign
      return acc;
    }, {});
  }

  BrowserTag.prototype.isFull = function isFull() {
    return this.size >= COMPONENTS_PER_TAG;
  };

  BrowserTag.prototype.addComponent = function addComponent(componentId) {
    if (!this.ready) this.replaceElement();
    if (this.components[componentId]) throw new Error('Trying to add Component \'' + componentId + '\' twice!');

    var comp = { componentId: componentId, textNode: document.createTextNode('') };
    this.el.appendChild(comp.textNode);

    this.size += 1;
    this.components[componentId] = comp;
  };

  BrowserTag.prototype.inject = function inject(componentId, css, name) {
    if (!this.ready) this.replaceElement();
    var comp = this.components[componentId];

    if (!comp) throw new Error('Must add a new component before you can inject css into it');
    if (comp.textNode.data === '') comp.textNode.appendData('\n/* sc-component-id: ' + componentId + ' */\n');

    comp.textNode.appendData(css);
    if (name) {
      var existingNames = this.el.getAttribute(SC_ATTR);
      this.el.setAttribute(SC_ATTR, existingNames ? existingNames + ' ' + name : name);

      if (typeof window !== 'undefined' && window.__webpack_nonce__) {
        this.el.setAttribute('nonce', window.__webpack_nonce__);
      }
    }
  };

  BrowserTag.prototype.toHTML = function toHTML() {
    return this.el.outerHTML;
  };

  BrowserTag.prototype.toReactElement = function toReactElement() {
    throw new Error('BrowserTag doesn\'t implement toReactElement!');
  };

  BrowserTag.prototype.clone = function clone() {
    throw new Error('BrowserTag cannot be cloned!');
  };

  /* Because we care about source order, before we can inject anything we need to
   * create a text node for each component and replace the existing CSS. */


  BrowserTag.prototype.replaceElement = function replaceElement() {
    var _this = this;

    this.ready = true;
    // We have nothing to inject. Use the current el.
    if (this.size === 0) return;

    // Build up our replacement style tag
    var newEl = this.el.cloneNode();
    newEl.appendChild(document.createTextNode('\n'));

    Object.keys(this.components).forEach(function (key) {
      var comp = _this.components[key];

      // eslint-disable-next-line no-param-reassign
      comp.textNode = document.createTextNode(comp.cssFromDOM);
      newEl.appendChild(comp.textNode);
    });

    if (!this.el.parentNode) throw new Error("Trying to replace an element that wasn't mounted!");

    // The ol' switcheroo
    this.el.parentNode.replaceChild(newEl, this.el);
    this.el = newEl;
  };

  return BrowserTag;
}();

/* Factory function to separate DOM operations from logical ones*/


var BrowserStyleSheet = {
  create: function create() {
    var tags = [];
    var names = {};

    /* Construct existing state from DOM */
    var nodes = document.querySelectorAll('[' + SC_ATTR + ']');
    var nodesLength = nodes.length;

    for (var i = 0; i < nodesLength; i += 1) {
      var el = nodes[i];

      tags.push(new BrowserTag(el, el.getAttribute(LOCAL_ATTR) === 'true', el.innerHTML));

      var attr = el.getAttribute(SC_ATTR);
      if (attr) {
        attr.trim().split(/\s+/).forEach(function (name) {
          names[name] = true;
        });
      }
    }

    /* Factory for making more tags */
    var tagConstructor = function tagConstructor(isLocal) {
      var el = document.createElement('style');
      el.type = 'text/css';
      el.setAttribute(SC_ATTR, '');
      el.setAttribute(LOCAL_ATTR, isLocal ? 'true' : 'false');
      if (!document.head) throw new Error('Missing document <head>');
      document.head.appendChild(el);
      return new BrowserTag(el, isLocal);
    };

    return new StyleSheet(tagConstructor, tags, names);
  }
};

//      
var SC_ATTR = 'data-styled-components';
var LOCAL_ATTR = 'data-styled-components-is-local';
var CONTEXT_KEY = '__styled-components-stylesheet__';

var instance = null;
// eslint-disable-next-line no-use-before-define
var clones = [];

var StyleSheet = function () {
  function StyleSheet(tagConstructor) {
    var tags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var names = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, StyleSheet);
    this.hashes = {};
    this.deferredInjections = {};

    this.tagConstructor = tagConstructor;
    this.tags = tags;
    this.names = names;
    this.constructComponentTagMap();
  }

  StyleSheet.prototype.constructComponentTagMap = function constructComponentTagMap() {
    var _this = this;

    this.componentTags = {};

    this.tags.forEach(function (tag) {
      Object.keys(tag.components).forEach(function (componentId) {
        _this.componentTags[componentId] = tag;
      });
    });
  };

  /* Best level of caching—get the name from the hash straight away. */


  StyleSheet.prototype.getName = function getName(hash) {
    return this.hashes[hash.toString()];
  };

  /* Second level of caching—if the name is already in the dom, don't
   * inject anything and record the hash for getName next time. */


  StyleSheet.prototype.alreadyInjected = function alreadyInjected(hash, name) {
    if (!this.names[name]) return false;

    this.hashes[hash.toString()] = name;
    return true;
  };

  /* Third type of caching—don't inject components' componentId twice. */


  StyleSheet.prototype.hasInjectedComponent = function hasInjectedComponent(componentId) {
    return !!this.componentTags[componentId];
  };

  StyleSheet.prototype.deferredInject = function deferredInject(componentId, isLocal, css) {
    if (this === instance) {
      clones.forEach(function (clone) {
        clone.deferredInject(componentId, isLocal, css);
      });
    }

    this.getOrCreateTag(componentId, isLocal);
    this.deferredInjections[componentId] = css;
  };

  StyleSheet.prototype.inject = function inject(componentId, isLocal, css, hash, name) {
    if (this === instance) {
      clones.forEach(function (clone) {
        clone.inject(componentId, isLocal, css);
      });
    }

    var tag = this.getOrCreateTag(componentId, isLocal);

    var deferredInjection = this.deferredInjections[componentId];
    if (deferredInjection) {
      tag.inject(componentId, deferredInjection);
      delete this.deferredInjections[componentId];
    }

    tag.inject(componentId, css, name);

    if (hash && name) {
      this.hashes[hash.toString()] = name;
    }
  };

  StyleSheet.prototype.toHTML = function toHTML() {
    return this.tags.map(function (tag) {
      return tag.toHTML();
    }).join('');
  };

  StyleSheet.prototype.toReactElements = function toReactElements() {
    return this.tags.map(function (tag, i) {
      return tag.toReactElement('sc-' + i);
    });
  };

  StyleSheet.prototype.getOrCreateTag = function getOrCreateTag(componentId, isLocal) {
    var existingTag = this.componentTags[componentId];
    if (existingTag) {
      return existingTag;
    }

    var lastTag = this.tags[this.tags.length - 1];
    var componentTag = !lastTag || lastTag.isFull() || lastTag.isLocal !== isLocal ? this.createNewTag(isLocal) : lastTag;
    this.componentTags[componentId] = componentTag;
    componentTag.addComponent(componentId);
    return componentTag;
  };

  StyleSheet.prototype.createNewTag = function createNewTag(isLocal) {
    var newTag = this.tagConstructor(isLocal);
    this.tags.push(newTag);
    return newTag;
  };

  StyleSheet.reset = function reset(isServer) {
    instance = StyleSheet.create(isServer);
  };

  /* We can make isServer totally implicit once Jest 20 drops and we
   * can change environment on a per-test basis. */


  StyleSheet.create = function create() {
    var isServer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : typeof document === 'undefined';

    return (isServer ? ServerStyleSheet : BrowserStyleSheet).create();
  };

  StyleSheet.clone = function clone(oldSheet) {
    var newSheet = new StyleSheet(oldSheet.tagConstructor, oldSheet.tags.map(function (tag) {
      return tag.clone();
    }), _extends({}, oldSheet.names));

    newSheet.hashes = _extends({}, oldSheet.hashes);
    newSheet.deferredInjections = _extends({}, oldSheet.deferredInjections);
    clones.push(newSheet);

    return newSheet;
  };

  createClass(StyleSheet, null, [{
    key: 'instance',
    get: function get$$1() {
      return instance || (instance = StyleSheet.create());
    }
  }]);
  return StyleSheet;
}();

var _StyleSheetManager$ch;

//      
var StyleSheetManager = function (_Component) {
  inherits(StyleSheetManager, _Component);

  function StyleSheetManager() {
    classCallCheck(this, StyleSheetManager);
    return possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  StyleSheetManager.prototype.getChildContext = function getChildContext() {
    var _ref;

    return _ref = {}, _ref[CONTEXT_KEY] = this.props.sheet, _ref;
  };

  StyleSheetManager.prototype.render = function render() {
    /* eslint-disable react/prop-types */
    // Flow v0.43.1 will report an error accessing the `children` property,
    // but v0.47.0 will not. It is necessary to use a type cast instead of
    // a "fixme" comment to satisfy both Flow versions.
    return __WEBPACK_IMPORTED_MODULE_2_react___default.a.Children.only(this.props.children);
  };

  return StyleSheetManager;
}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]);

StyleSheetManager.childContextTypes = (_StyleSheetManager$ch = {}, _StyleSheetManager$ch[CONTEXT_KEY] = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.instanceOf(StyleSheet).isRequired, _StyleSheetManager$ch);

StyleSheetManager.propTypes = {
  sheet: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.instanceOf(StyleSheet).isRequired
};

//      
/* eslint-disable no-underscore-dangle */
var ServerTag = function () {
  function ServerTag(isLocal) {
    classCallCheck(this, ServerTag);

    this.isLocal = isLocal;
    this.components = {};
    this.size = 0;
    this.names = [];
  }

  ServerTag.prototype.isFull = function isFull() {
    return false;
  };

  ServerTag.prototype.addComponent = function addComponent(componentId) {
    if (this.components[componentId]) throw new Error('Trying to add Component \'' + componentId + '\' twice!');
    this.components[componentId] = { componentId: componentId, css: '' };
    this.size += 1;
  };

  ServerTag.prototype.concatenateCSS = function concatenateCSS() {
    var _this = this;

    return Object.keys(this.components).reduce(function (styles, k) {
      return styles + _this.components[k].css;
    }, '');
  };

  ServerTag.prototype.inject = function inject(componentId, css, name) {
    var comp = this.components[componentId];

    if (!comp) throw new Error('Must add a new component before you can inject css into it');
    if (comp.css === '') comp.css = '/* sc-component-id: ' + componentId + ' */\n';

    comp.css += css.replace(/\n*$/, '\n');

    if (name) this.names.push(name);
  };

  ServerTag.prototype.toHTML = function toHTML() {
    var attrs = ['type="text/css"', SC_ATTR + '="' + this.names.join(' ') + '"', LOCAL_ATTR + '="' + (this.isLocal ? 'true' : 'false') + '"'];

    if (typeof global !== 'undefined' && global.__webpack_nonce__) {
      attrs.push('nonce="' + global.__webpack_nonce__ + '"');
    }

    return '<style ' + attrs.join(' ') + '>' + this.concatenateCSS() + '</style>';
  };

  ServerTag.prototype.toReactElement = function toReactElement(key) {
    var _attrs;

    var attrs = (_attrs = {}, _attrs[SC_ATTR] = this.names.join(' '), _attrs[LOCAL_ATTR] = this.isLocal.toString(), _attrs);

    if (typeof global !== 'undefined' && global.__webpack_nonce__) {
      attrs.nonce = global.__webpack_nonce__;
    }

    return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('style', _extends({
      key: key, type: 'text/css' }, attrs, {
      dangerouslySetInnerHTML: { __html: this.concatenateCSS() }
    }));
  };

  ServerTag.prototype.clone = function clone() {
    var _this2 = this;

    var copy = new ServerTag(this.isLocal);
    copy.names = [].concat(this.names);
    copy.size = this.size;
    copy.components = Object.keys(this.components).reduce(function (acc, key) {
      acc[key] = _extends({}, _this2.components[key]); // eslint-disable-line no-param-reassign
      return acc;
    }, {});

    return copy;
  };

  return ServerTag;
}();

var ServerStyleSheet = function () {
  function ServerStyleSheet() {
    classCallCheck(this, ServerStyleSheet);

    this.instance = StyleSheet.clone(StyleSheet.instance);
  }

  ServerStyleSheet.prototype.collectStyles = function collectStyles(children) {
    if (this.closed) throw new Error("Can't collect styles once you've called getStyleTags!");
    return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
      StyleSheetManager,
      { sheet: this.instance },
      children
    );
  };

  ServerStyleSheet.prototype.getStyleTags = function getStyleTags() {
    if (!this.closed) {
      clones.splice(clones.indexOf(this.instance), 1);
      this.closed = true;
    }

    return this.instance.toHTML();
  };

  ServerStyleSheet.prototype.getStyleElement = function getStyleElement() {
    if (!this.closed) {
      clones.splice(clones.indexOf(this.instance), 1);
      this.closed = true;
    }

    return this.instance.toReactElements();
  };

  ServerStyleSheet.create = function create() {
    return new StyleSheet(function (isLocal) {
      return new ServerTag(isLocal);
    });
  };

  return ServerStyleSheet;
}();

//      

var LIMIT = 200;

var createWarnTooManyClasses = (function (displayName) {
  var generatedClasses = {};
  var warningSeen = false;

  return function (className) {
    if (!warningSeen) {
      generatedClasses[className] = true;
      if (Object.keys(generatedClasses).length >= LIMIT) {
        // Unable to find latestRule in test environment.
        /* eslint-disable no-console, prefer-template */
        console.warn('Over ' + LIMIT + ' classes were generated for component ' + displayName + '. ' + 'Consider using style property for frequently changed styles.\n' + 'Example:\n' + '  const StyledComp = styled.div`width: 100%;`\n' + '  <StyledComp style={{ background: background }} />');
        warningSeen = true;
        generatedClasses = {};
      }
    }
  };
});

//      
/* Trying to avoid the unknown-prop errors on styled components
 by filtering by React's attribute whitelist.
 */

/* Logic copied from ReactDOMUnknownPropertyHook */
var reactProps = {
  children: true,
  dangerouslySetInnerHTML: true,
  key: true,
  ref: true,
  autoFocus: true,
  defaultValue: true,
  valueLink: true,
  defaultChecked: true,
  checkedLink: true,
  innerHTML: true,
  suppressContentEditableWarning: true,
  onFocusIn: true,
  onFocusOut: true,
  className: true,

  /* List copied from https://facebook.github.io/react/docs/events.html */
  onCopy: true,
  onCut: true,
  onPaste: true,
  onCompositionEnd: true,
  onCompositionStart: true,
  onCompositionUpdate: true,
  onKeyDown: true,
  onKeyPress: true,
  onKeyUp: true,
  onFocus: true,
  onBlur: true,
  onChange: true,
  onInput: true,
  onSubmit: true,
  onClick: true,
  onContextMenu: true,
  onDoubleClick: true,
  onDrag: true,
  onDragEnd: true,
  onDragEnter: true,
  onDragExit: true,
  onDragLeave: true,
  onDragOver: true,
  onDragStart: true,
  onDrop: true,
  onMouseDown: true,
  onMouseEnter: true,
  onMouseLeave: true,
  onMouseMove: true,
  onMouseOut: true,
  onMouseOver: true,
  onMouseUp: true,
  onSelect: true,
  onTouchCancel: true,
  onTouchEnd: true,
  onTouchMove: true,
  onTouchStart: true,
  onScroll: true,
  onWheel: true,
  onAbort: true,
  onCanPlay: true,
  onCanPlayThrough: true,
  onDurationChange: true,
  onEmptied: true,
  onEncrypted: true,
  onEnded: true,
  onError: true,
  onLoadedData: true,
  onLoadedMetadata: true,
  onLoadStart: true,
  onPause: true,
  onPlay: true,
  onPlaying: true,
  onProgress: true,
  onRateChange: true,
  onSeeked: true,
  onSeeking: true,
  onStalled: true,
  onSuspend: true,
  onTimeUpdate: true,
  onVolumeChange: true,
  onWaiting: true,
  onLoad: true,
  onAnimationStart: true,
  onAnimationEnd: true,
  onAnimationIteration: true,
  onTransitionEnd: true,

  onCopyCapture: true,
  onCutCapture: true,
  onPasteCapture: true,
  onCompositionEndCapture: true,
  onCompositionStartCapture: true,
  onCompositionUpdateCapture: true,
  onKeyDownCapture: true,
  onKeyPressCapture: true,
  onKeyUpCapture: true,
  onFocusCapture: true,
  onBlurCapture: true,
  onChangeCapture: true,
  onInputCapture: true,
  onSubmitCapture: true,
  onClickCapture: true,
  onContextMenuCapture: true,
  onDoubleClickCapture: true,
  onDragCapture: true,
  onDragEndCapture: true,
  onDragEnterCapture: true,
  onDragExitCapture: true,
  onDragLeaveCapture: true,
  onDragOverCapture: true,
  onDragStartCapture: true,
  onDropCapture: true,
  onMouseDownCapture: true,
  onMouseEnterCapture: true,
  onMouseLeaveCapture: true,
  onMouseMoveCapture: true,
  onMouseOutCapture: true,
  onMouseOverCapture: true,
  onMouseUpCapture: true,
  onSelectCapture: true,
  onTouchCancelCapture: true,
  onTouchEndCapture: true,
  onTouchMoveCapture: true,
  onTouchStartCapture: true,
  onScrollCapture: true,
  onWheelCapture: true,
  onAbortCapture: true,
  onCanPlayCapture: true,
  onCanPlayThroughCapture: true,
  onDurationChangeCapture: true,
  onEmptiedCapture: true,
  onEncryptedCapture: true,
  onEndedCapture: true,
  onErrorCapture: true,
  onLoadedDataCapture: true,
  onLoadedMetadataCapture: true,
  onLoadStartCapture: true,
  onPauseCapture: true,
  onPlayCapture: true,
  onPlayingCapture: true,
  onProgressCapture: true,
  onRateChangeCapture: true,
  onSeekedCapture: true,
  onSeekingCapture: true,
  onStalledCapture: true,
  onSuspendCapture: true,
  onTimeUpdateCapture: true,
  onVolumeChangeCapture: true,
  onWaitingCapture: true,
  onLoadCapture: true,
  onAnimationStartCapture: true,
  onAnimationEndCapture: true,
  onAnimationIterationCapture: true,
  onTransitionEndCapture: true
};

/* From HTMLDOMPropertyConfig */
var htmlProps = {
  /**
   * Standard Properties
   */
  accept: true,
  acceptCharset: true,
  accessKey: true,
  action: true,
  allowFullScreen: true,
  allowTransparency: true,
  alt: true,
  // specifies target context for links with `preload` type
  as: true,
  async: true,
  autoComplete: true,
  // autoFocus is polyfilled/normalized by AutoFocusUtils
  // autoFocus: true,
  autoPlay: true,
  capture: true,
  cellPadding: true,
  cellSpacing: true,
  charSet: true,
  challenge: true,
  checked: true,
  cite: true,
  classID: true,
  className: true,
  cols: true,
  colSpan: true,
  content: true,
  contentEditable: true,
  contextMenu: true,
  controls: true,
  coords: true,
  crossOrigin: true,
  data: true, // For `<object />` acts as `src`.
  dateTime: true,
  default: true,
  defer: true,
  dir: true,
  disabled: true,
  download: true,
  draggable: true,
  encType: true,
  form: true,
  formAction: true,
  formEncType: true,
  formMethod: true,
  formNoValidate: true,
  formTarget: true,
  frameBorder: true,
  headers: true,
  height: true,
  hidden: true,
  high: true,
  href: true,
  hrefLang: true,
  htmlFor: true,
  httpEquiv: true,
  icon: true,
  id: true,
  inputMode: true,
  integrity: true,
  is: true,
  keyParams: true,
  keyType: true,
  kind: true,
  label: true,
  lang: true,
  list: true,
  loop: true,
  low: true,
  manifest: true,
  marginHeight: true,
  marginWidth: true,
  max: true,
  maxLength: true,
  media: true,
  mediaGroup: true,
  method: true,
  min: true,
  minLength: true,
  // Caution; `option.selected` is not updated if `select.multiple` is
  // disabled with `removeAttribute`.
  multiple: true,
  muted: true,
  name: true,
  nonce: true,
  noValidate: true,
  open: true,
  optimum: true,
  pattern: true,
  placeholder: true,
  playsInline: true,
  poster: true,
  preload: true,
  profile: true,
  radioGroup: true,
  readOnly: true,
  referrerPolicy: true,
  rel: true,
  required: true,
  reversed: true,
  role: true,
  rows: true,
  rowSpan: true,
  sandbox: true,
  scope: true,
  scoped: true,
  scrolling: true,
  seamless: true,
  selected: true,
  shape: true,
  size: true,
  sizes: true,
  span: true,
  spellCheck: true,
  src: true,
  srcDoc: true,
  srcLang: true,
  srcSet: true,
  start: true,
  step: true,
  style: true,
  summary: true,
  tabIndex: true,
  target: true,
  title: true,
  // Setting .type throws on non-<input> tags
  type: true,
  useMap: true,
  value: true,
  width: true,
  wmode: true,
  wrap: true,

  /**
   * RDFa Properties
   */
  about: true,
  datatype: true,
  inlist: true,
  prefix: true,
  // property is also supported for OpenGraph in meta tags.
  property: true,
  resource: true,
  typeof: true,
  vocab: true,

  /**
   * Non-standard Properties
   */
  // autoCapitalize and autoCorrect are supported in Mobile Safari for
  // keyboard hints.
  autoCapitalize: true,
  autoCorrect: true,
  // autoSave allows WebKit/Blink to persist values of input fields on page reloads
  autoSave: true,
  // color is for Safari mask-icon link
  color: true,
  // itemProp, itemScope, itemType are for
  // Microdata support. See http://schema.org/docs/gs.html
  itemProp: true,
  itemScope: true,
  itemType: true,
  // itemID and itemRef are for Microdata support as well but
  // only specified in the WHATWG spec document. See
  // https://html.spec.whatwg.org/multipage/microdata.html#microdata-dom-api
  itemID: true,
  itemRef: true,
  // results show looking glass icon and recent searches on input
  // search fields in WebKit/Blink
  results: true,
  // IE-only attribute that specifies security restrictions on an iframe
  // as an alternative to the sandbox attribute on IE<10
  security: true,
  // IE-only attribute that controls focus behavior
  unselectable: 0
};

var svgProps = {
  accentHeight: true,
  accumulate: true,
  additive: true,
  alignmentBaseline: true,
  allowReorder: true,
  alphabetic: true,
  amplitude: true,
  arabicForm: true,
  ascent: true,
  attributeName: true,
  attributeType: true,
  autoReverse: true,
  azimuth: true,
  baseFrequency: true,
  baseProfile: true,
  baselineShift: true,
  bbox: true,
  begin: true,
  bias: true,
  by: true,
  calcMode: true,
  capHeight: true,
  clip: true,
  clipPath: true,
  clipRule: true,
  clipPathUnits: true,
  colorInterpolation: true,
  colorInterpolationFilters: true,
  colorProfile: true,
  colorRendering: true,
  contentScriptType: true,
  contentStyleType: true,
  cursor: true,
  cx: true,
  cy: true,
  d: true,
  decelerate: true,
  descent: true,
  diffuseConstant: true,
  direction: true,
  display: true,
  divisor: true,
  dominantBaseline: true,
  dur: true,
  dx: true,
  dy: true,
  edgeMode: true,
  elevation: true,
  enableBackground: true,
  end: true,
  exponent: true,
  externalResourcesRequired: true,
  fill: true,
  fillOpacity: true,
  fillRule: true,
  filter: true,
  filterRes: true,
  filterUnits: true,
  floodColor: true,
  floodOpacity: true,
  focusable: true,
  fontFamily: true,
  fontSize: true,
  fontSizeAdjust: true,
  fontStretch: true,
  fontStyle: true,
  fontVariant: true,
  fontWeight: true,
  format: true,
  from: true,
  fx: true,
  fy: true,
  g1: true,
  g2: true,
  glyphName: true,
  glyphOrientationHorizontal: true,
  glyphOrientationVertical: true,
  glyphRef: true,
  gradientTransform: true,
  gradientUnits: true,
  hanging: true,
  horizAdvX: true,
  horizOriginX: true,
  ideographic: true,
  imageRendering: true,
  in: true,
  in2: true,
  intercept: true,
  k: true,
  k1: true,
  k2: true,
  k3: true,
  k4: true,
  kernelMatrix: true,
  kernelUnitLength: true,
  kerning: true,
  keyPoints: true,
  keySplines: true,
  keyTimes: true,
  lengthAdjust: true,
  letterSpacing: true,
  lightingColor: true,
  limitingConeAngle: true,
  local: true,
  markerEnd: true,
  markerMid: true,
  markerStart: true,
  markerHeight: true,
  markerUnits: true,
  markerWidth: true,
  mask: true,
  maskContentUnits: true,
  maskUnits: true,
  mathematical: true,
  mode: true,
  numOctaves: true,
  offset: true,
  opacity: true,
  operator: true,
  order: true,
  orient: true,
  orientation: true,
  origin: true,
  overflow: true,
  overlinePosition: true,
  overlineThickness: true,
  paintOrder: true,
  panose1: true,
  pathLength: true,
  patternContentUnits: true,
  patternTransform: true,
  patternUnits: true,
  pointerEvents: true,
  points: true,
  pointsAtX: true,
  pointsAtY: true,
  pointsAtZ: true,
  preserveAlpha: true,
  preserveAspectRatio: true,
  primitiveUnits: true,
  r: true,
  radius: true,
  refX: true,
  refY: true,
  renderingIntent: true,
  repeatCount: true,
  repeatDur: true,
  requiredExtensions: true,
  requiredFeatures: true,
  restart: true,
  result: true,
  rotate: true,
  rx: true,
  ry: true,
  scale: true,
  seed: true,
  shapeRendering: true,
  slope: true,
  spacing: true,
  specularConstant: true,
  specularExponent: true,
  speed: true,
  spreadMethod: true,
  startOffset: true,
  stdDeviation: true,
  stemh: true,
  stemv: true,
  stitchTiles: true,
  stopColor: true,
  stopOpacity: true,
  strikethroughPosition: true,
  strikethroughThickness: true,
  string: true,
  stroke: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeLinecap: true,
  strokeLinejoin: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true,
  surfaceScale: true,
  systemLanguage: true,
  tableValues: true,
  targetX: true,
  targetY: true,
  textAnchor: true,
  textDecoration: true,
  textRendering: true,
  textLength: true,
  to: true,
  transform: true,
  u1: true,
  u2: true,
  underlinePosition: true,
  underlineThickness: true,
  unicode: true,
  unicodeBidi: true,
  unicodeRange: true,
  unitsPerEm: true,
  vAlphabetic: true,
  vHanging: true,
  vIdeographic: true,
  vMathematical: true,
  values: true,
  vectorEffect: true,
  version: true,
  vertAdvY: true,
  vertOriginX: true,
  vertOriginY: true,
  viewBox: true,
  viewTarget: true,
  visibility: true,
  widths: true,
  wordSpacing: true,
  writingMode: true,
  x: true,
  xHeight: true,
  x1: true,
  x2: true,
  xChannelSelector: true,
  xlinkActuate: true,
  xlinkArcrole: true,
  xlinkHref: true,
  xlinkRole: true,
  xlinkShow: true,
  xlinkTitle: true,
  xlinkType: true,
  xmlBase: true,
  xmlns: true,
  xmlnsXlink: true,
  xmlLang: true,
  xmlSpace: true,
  y: true,
  y1: true,
  y2: true,
  yChannelSelector: true,
  z: true,
  zoomAndPan: true
};

/* From DOMProperty */
var ATTRIBUTE_NAME_START_CHAR = ':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + '\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040';
var isCustomAttribute = RegExp.prototype.test.bind(new RegExp('^(data|aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$'));

var hasOwnProperty = {}.hasOwnProperty;
var validAttr = (function (name) {
  return hasOwnProperty.call(htmlProps, name) || hasOwnProperty.call(svgProps, name) || isCustomAttribute(name.toLowerCase()) || hasOwnProperty.call(reactProps, name);
});

//      


function isTag(target) /* : %checks */{
  return typeof target === 'string';
}

//      


function isStyledComponent(target) /* : %checks */{
  return typeof target === 'function' && typeof target.styledComponentId === 'string';
}

//      

/* eslint-disable no-undef */
function getComponentName(target) {
  return target.displayName || target.name || 'Component';
}

//      
/**
 * Creates a broadcast that can be listened to, i.e. simple event emitter
 *
 * @see https://github.com/ReactTraining/react-broadcast
 */

var createBroadcast = function createBroadcast(initialValue) {
  var listeners = [];
  var currentValue = initialValue;

  return {
    publish: function publish(value) {
      currentValue = value;
      listeners.forEach(function (listener) {
        return listener(currentValue);
      });
    },
    subscribe: function subscribe(listener) {
      listeners.push(listener);

      // Publish to this subscriber once immediately.
      listener(currentValue);

      return function () {
        listeners = listeners.filter(function (item) {
          return item !== listener;
        });
      };
    }
  };
};

var _ThemeProvider$childC;
var _ThemeProvider$contex;

//      
/* globals React$Element */
// NOTE: DO NOT CHANGE, changing this is a semver major change!
var CHANNEL = '__styled-components__';

/**
 * Provide a theme to an entire react component tree via context and event listeners (have to do
 * both context and event emitter as pure components block context updates)
 */

var ThemeProvider = function (_Component) {
  inherits(ThemeProvider, _Component);

  function ThemeProvider() {
    classCallCheck(this, ThemeProvider);

    var _this = possibleConstructorReturn(this, _Component.call(this));

    _this.getTheme = _this.getTheme.bind(_this);
    return _this;
  }

  ThemeProvider.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    // If there is a ThemeProvider wrapper anywhere around this theme provider, merge this theme
    // with the outer theme
    if (this.context[CHANNEL]) {
      var subscribe = this.context[CHANNEL];
      this.unsubscribeToOuter = subscribe(function (theme) {
        _this2.outerTheme = theme;
      });
    }
    this.broadcast = createBroadcast(this.getTheme());
  };

  ThemeProvider.prototype.getChildContext = function getChildContext() {
    var _babelHelpers$extends;

    return _extends({}, this.context, (_babelHelpers$extends = {}, _babelHelpers$extends[CHANNEL] = this.broadcast.subscribe, _babelHelpers$extends));
  };

  ThemeProvider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.props.theme !== nextProps.theme) this.broadcast.publish(this.getTheme(nextProps.theme));
  };

  ThemeProvider.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.context[CHANNEL]) {
      this.unsubscribeToOuter();
    }
  };

  // Get the theme from the props, supporting both (outerTheme) => {} as well as object notation


  ThemeProvider.prototype.getTheme = function getTheme(passedTheme) {
    var theme = passedTheme || this.props.theme;
    if (__WEBPACK_IMPORTED_MODULE_4_is_function___default()(theme)) {
      var mergedTheme = theme(this.outerTheme);
      if (!__WEBPACK_IMPORTED_MODULE_0_is_plain_object___default()(mergedTheme)) {
        throw new Error('[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!');
      }
      return mergedTheme;
    }
    if (!__WEBPACK_IMPORTED_MODULE_0_is_plain_object___default()(theme)) {
      throw new Error('[ThemeProvider] Please make your theme prop a plain object');
    }
    return _extends({}, this.outerTheme, theme);
  };

  ThemeProvider.prototype.render = function render() {
    if (!this.props.children) {
      return null;
    }
    return __WEBPACK_IMPORTED_MODULE_2_react___default.a.Children.only(this.props.children);
  };

  return ThemeProvider;
}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]);

ThemeProvider.childContextTypes = (_ThemeProvider$childC = {}, _ThemeProvider$childC[CHANNEL] = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func.isRequired, _ThemeProvider$childC);
ThemeProvider.contextTypes = (_ThemeProvider$contex = {}, _ThemeProvider$contex[CHANNEL] = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func, _ThemeProvider$contex);

var _AbstractStyledCompon;

//      
var AbstractStyledComponent = function (_Component) {
  inherits(AbstractStyledComponent, _Component);

  function AbstractStyledComponent() {
    classCallCheck(this, AbstractStyledComponent);
    return possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  return AbstractStyledComponent;
}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]);

AbstractStyledComponent.contextTypes = (_AbstractStyledCompon = {}, _AbstractStyledCompon[CHANNEL] = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func, _AbstractStyledCompon[CONTEXT_KEY] = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.instanceOf(StyleSheet), _AbstractStyledCompon);

//      

var escapeRegex = /[[\].#*$><+~=|^:(),"'`]/g;
var multiDashRegex = /--+/g;

var _StyledComponent = (function (ComponentStyle, constructWithOptions) {
  /* We depend on components having unique IDs */
  var identifiers = {};
  var generateId = function generateId(_displayName, parentComponentId) {
    var displayName = typeof _displayName !== 'string' ? 'sc' : _displayName.replace(escapeRegex, '-') // Replace all possible CSS selectors
    .replace(multiDashRegex, '-'); // Replace multiple -- with single -

    var nr = (identifiers[displayName] || 0) + 1;
    identifiers[displayName] = nr;

    var hash = ComponentStyle.generateName(displayName + nr);
    var componentId = displayName + '-' + hash;
    return parentComponentId !== undefined ? parentComponentId + '-' + componentId : componentId;
  };

  var BaseStyledComponent = function (_AbstractStyledCompon) {
    inherits(BaseStyledComponent, _AbstractStyledCompon);

    function BaseStyledComponent() {
      var _temp, _this, _ret;

      classCallCheck(this, BaseStyledComponent);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = possibleConstructorReturn(this, _AbstractStyledCompon.call.apply(_AbstractStyledCompon, [this].concat(args))), _this), _this.attrs = {}, _this.state = {
        theme: null,
        generatedClassName: ''
      }, _temp), possibleConstructorReturn(_this, _ret);
    }

    BaseStyledComponent.prototype.buildExecutionContext = function buildExecutionContext(theme, props) {
      var attrs = this.constructor.attrs;

      var context = _extends({}, props, { theme: theme });
      if (attrs === undefined) {
        return context;
      }

      this.attrs = Object.keys(attrs).reduce(function (acc, key) {
        var attr = attrs[key];
        // eslint-disable-next-line no-param-reassign
        acc[key] = typeof attr === 'function' ? attr(context) : attr;
        return acc;
      }, {});

      return _extends({}, context, this.attrs);
    };

    BaseStyledComponent.prototype.generateAndInjectStyles = function generateAndInjectStyles(theme, props) {
      var _constructor = this.constructor,
          componentStyle = _constructor.componentStyle,
          warnTooManyClasses = _constructor.warnTooManyClasses;

      var executionContext = this.buildExecutionContext(theme, props);
      var styleSheet = this.context[CONTEXT_KEY] || StyleSheet.instance;
      var className = componentStyle.generateAndInjectStyles(executionContext, styleSheet);

      if (warnTooManyClasses !== undefined) warnTooManyClasses(className);

      return className;
    };

    BaseStyledComponent.prototype.componentWillMount = function componentWillMount() {
      var _this2 = this;

      // If there is a theme in the context, subscribe to the event emitter. This
      // is necessary due to pure components blocking context updates, this circumvents
      // that by updating when an event is emitted
      if (this.context[CHANNEL]) {
        var subscribe = this.context[CHANNEL];
        this.unsubscribe = subscribe(function (nextTheme) {
          // This will be called once immediately

          // Props should take precedence over ThemeProvider, which should take precedence over
          // defaultProps, but React automatically puts defaultProps on props.
          var defaultProps = _this2.constructor.defaultProps;

          var isDefaultTheme = defaultProps && _this2.props.theme === defaultProps.theme;
          var theme = _this2.props.theme && !isDefaultTheme ? _this2.props.theme : nextTheme;
          var generatedClassName = _this2.generateAndInjectStyles(theme, _this2.props);
          _this2.setState({ theme: theme, generatedClassName: generatedClassName });
        });
      } else {
        var theme = this.props.theme || {};
        var generatedClassName = this.generateAndInjectStyles(theme, this.props);
        this.setState({ theme: theme, generatedClassName: generatedClassName });
      }
    };

    BaseStyledComponent.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      this.setState(function (oldState) {
        // Props should take precedence over ThemeProvider, which should take precedence over
        // defaultProps, but React automatically puts defaultProps on props.
        var defaultProps = _this3.constructor.defaultProps;

        var isDefaultTheme = defaultProps && nextProps.theme === defaultProps.theme;
        var theme = nextProps.theme && !isDefaultTheme ? nextProps.theme : oldState.theme;
        var generatedClassName = _this3.generateAndInjectStyles(theme, nextProps);

        return { theme: theme, generatedClassName: generatedClassName };
      });
    };

    BaseStyledComponent.prototype.componentWillUnmount = function componentWillUnmount() {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
    };

    BaseStyledComponent.prototype.render = function render() {
      var _this4 = this;

      var innerRef = this.props.innerRef;
      var generatedClassName = this.state.generatedClassName;
      var _constructor2 = this.constructor,
          styledComponentId = _constructor2.styledComponentId,
          target = _constructor2.target;


      var isTargetTag = isTag(target);

      var className = [this.props.className, styledComponentId, this.attrs.className, generatedClassName].filter(Boolean).join(' ');

      var baseProps = _extends({}, this.attrs, {
        className: className
      });

      if (isStyledComponent(target)) {
        baseProps.innerRef = innerRef;
      } else {
        baseProps.ref = innerRef;
      }

      var propsForElement = Object.keys(this.props).reduce(function (acc, propName) {
        // Don't pass through non HTML tags through to HTML elements
        // always omit innerRef
        if (propName !== 'innerRef' && propName !== 'className' && (!isTargetTag || validAttr(propName))) {
          // eslint-disable-next-line no-param-reassign
          acc[propName] = _this4.props[propName];
        }

        return acc;
      }, baseProps);

      return Object(__WEBPACK_IMPORTED_MODULE_2_react__["createElement"])(target, propsForElement);
    };

    return BaseStyledComponent;
  }(AbstractStyledComponent);

  var createStyledComponent = function createStyledComponent(target, options, rules) {
    var _StyledComponent$cont;

    var _options$displayName = options.displayName,
        displayName = _options$displayName === undefined ? isTag(target) ? 'styled.' + target : 'Styled(' + getComponentName(target) + ')' : _options$displayName,
        _options$componentId = options.componentId,
        componentId = _options$componentId === undefined ? generateId(options.displayName, options.parentComponentId) : _options$componentId,
        _options$ParentCompon = options.ParentComponent,
        ParentComponent = _options$ParentCompon === undefined ? BaseStyledComponent : _options$ParentCompon,
        extendingRules = options.rules,
        attrs = options.attrs;


    var styledComponentId = options.displayName && options.componentId ? options.displayName + '-' + options.componentId : componentId;

    var warnTooManyClasses = void 0;
    if (typeof process !== 'undefined' && "development" !== 'production') {
      warnTooManyClasses = createWarnTooManyClasses(displayName);
    }

    var componentStyle = new ComponentStyle(extendingRules === undefined ? rules : extendingRules.concat(rules), styledComponentId);

    var StyledComponent = function (_ParentComponent) {
      inherits(StyledComponent, _ParentComponent);

      function StyledComponent() {
        classCallCheck(this, StyledComponent);
        return possibleConstructorReturn(this, _ParentComponent.apply(this, arguments));
      }

      StyledComponent.withComponent = function withComponent(tag) {
        var previousComponentId = options.componentId,
            optionsToCopy = objectWithoutProperties(options, ['componentId']);


        var newComponentId = previousComponentId && previousComponentId + '-' + (isTag(tag) ? tag : getComponentName(tag));

        var newOptions = _extends({}, optionsToCopy, {
          componentId: newComponentId,
          ParentComponent: StyledComponent
        });

        return createStyledComponent(tag, newOptions, rules);
      };

      createClass(StyledComponent, null, [{
        key: 'extend',
        get: function get$$1() {
          var rulesFromOptions = options.rules,
              parentComponentId = options.componentId,
              optionsToCopy = objectWithoutProperties(options, ['rules', 'componentId']);


          var newRules = rulesFromOptions === undefined ? rules : rulesFromOptions.concat(rules);

          var newOptions = _extends({}, optionsToCopy, {
            rules: newRules,
            parentComponentId: parentComponentId,
            ParentComponent: StyledComponent
          });

          return constructWithOptions(createStyledComponent, target, newOptions);
        }
      }]);
      return StyledComponent;
    }(ParentComponent);

    StyledComponent.contextTypes = (_StyledComponent$cont = {}, _StyledComponent$cont[CHANNEL] = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func, _StyledComponent$cont[CONTEXT_KEY] = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.instanceOf(StyleSheet), _StyledComponent$cont);
    StyledComponent.displayName = displayName;
    StyledComponent.styledComponentId = styledComponentId;
    StyledComponent.attrs = attrs;
    StyledComponent.componentStyle = componentStyle;
    StyledComponent.warnTooManyClasses = warnTooManyClasses;
    StyledComponent.target = target;


    return StyledComponent;
  };

  return createStyledComponent;
});

// murmurhash2 via https://gist.github.com/raycmorgan/588423

function doHash(str, seed) {
  var m = 0x5bd1e995;
  var r = 24;
  var h = seed ^ str.length;
  var length = str.length;
  var currentIndex = 0;

  while (length >= 4) {
    var k = UInt32(str, currentIndex);

    k = Umul32(k, m);
    k ^= k >>> r;
    k = Umul32(k, m);

    h = Umul32(h, m);
    h ^= k;

    currentIndex += 4;
    length -= 4;
  }

  switch (length) {
    case 3:
      h ^= UInt16(str, currentIndex);
      h ^= str.charCodeAt(currentIndex + 2) << 16;
      h = Umul32(h, m);
      break;

    case 2:
      h ^= UInt16(str, currentIndex);
      h = Umul32(h, m);
      break;

    case 1:
      h ^= str.charCodeAt(currentIndex);
      h = Umul32(h, m);
      break;
  }

  h ^= h >>> 13;
  h = Umul32(h, m);
  h ^= h >>> 15;

  return h >>> 0;
}

function UInt32(str, pos) {
  return str.charCodeAt(pos++) + (str.charCodeAt(pos++) << 8) + (str.charCodeAt(pos++) << 16) + (str.charCodeAt(pos) << 24);
}

function UInt16(str, pos) {
  return str.charCodeAt(pos++) + (str.charCodeAt(pos++) << 8);
}

function Umul32(n, m) {
  n = n | 0;
  m = m | 0;
  var nlo = n & 0xffff;
  var nhi = n >>> 16;
  var res = nlo * m + ((nhi * m & 0xffff) << 16) | 0;
  return res;
}

//      
/*
 ComponentStyle is all the CSS-specific stuff, not
 the React-specific stuff.
 */
var _ComponentStyle = (function (nameGenerator, flatten, stringifyRules) {
  var ComponentStyle = function () {
    function ComponentStyle(rules, componentId) {
      classCallCheck(this, ComponentStyle);

      this.rules = rules;
      this.componentId = componentId;
      if (!StyleSheet.instance.hasInjectedComponent(this.componentId)) {
        var placeholder = '.' + componentId + ' {}';
        StyleSheet.instance.deferredInject(componentId, true, placeholder);
      }
    }

    /*
     * Flattens a rule set into valid CSS
     * Hashes it, wraps the whole chunk in a .hash1234 {}
     * Returns the hash to be injected on render()
     * */


    ComponentStyle.prototype.generateAndInjectStyles = function generateAndInjectStyles(executionContext, styleSheet) {
      var flatCSS = flatten(this.rules, executionContext);
      var hash = doHash(this.componentId + flatCSS.join(''));

      var existingName = styleSheet.getName(hash);
      if (existingName) return existingName;

      var name = nameGenerator(hash);
      if (styleSheet.alreadyInjected(hash, name)) return name;

      var css = '\n' + stringifyRules(flatCSS, '.' + name);
      styleSheet.inject(this.componentId, true, css, hash, name);
      return name;
    };

    ComponentStyle.generateName = function generateName(str) {
      return nameGenerator(doHash(str));
    };

    return ComponentStyle;
  }();

  return ComponentStyle;
});

//      
// Thanks to ReactDOMFactories for this handy list!

var domElements = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr',

// SVG
'circle', 'clipPath', 'defs', 'ellipse', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];

//      

var _styled = (function (styledComponent, constructWithOptions) {
  var styled = function styled(tag) {
    return constructWithOptions(styledComponent, tag);
  };

  // Shorthands for all valid HTML Elements
  domElements.forEach(function (domElement) {
    styled[domElement] = styled(domElement);
  });

  return styled;
});

//      
var replaceWhitespace = function replaceWhitespace(str) {
  return str.replace(/\s|\\n/g, '');
};

var _keyframes = (function (nameGenerator, stringifyRules, css) {
  return function (strings) {
    for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      interpolations[_key - 1] = arguments[_key];
    }

    var rules = css.apply(undefined, [strings].concat(interpolations));
    var hash = doHash(replaceWhitespace(JSON.stringify(rules)));

    var existingName = StyleSheet.instance.getName(hash);
    if (existingName) return existingName;

    var name = nameGenerator(hash);
    if (StyleSheet.instance.alreadyInjected(hash, name)) return name;

    var generatedCSS = stringifyRules(rules, name, '@keyframes');
    StyleSheet.instance.inject('sc-keyframes-' + name, true, generatedCSS, hash, name);
    return name;
  };
});

//      
var _injectGlobal = (function (stringifyRules, css) {
  var injectGlobal = function injectGlobal(strings) {
    for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      interpolations[_key - 1] = arguments[_key];
    }

    var rules = css.apply(undefined, [strings].concat(interpolations));
    var hash = doHash(JSON.stringify(rules));

    var componentId = 'sc-global-' + hash;
    if (StyleSheet.instance.hasInjectedComponent(componentId)) return;

    StyleSheet.instance.inject(componentId, false, stringifyRules(rules));
  };

  return injectGlobal;
});

//      


var _constructWithOptions = (function (css) {
  var constructWithOptions = function constructWithOptions(componentConstructor, tag) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (typeof tag !== 'string' && typeof tag !== 'function') {
      // $FlowInvalidInputTest
      throw new Error('Cannot create styled-component for component: ' + tag);
    }

    /* This is callable directly as a template function */
    var templateFunction = function templateFunction(strings) {
      for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        interpolations[_key - 1] = arguments[_key];
      }

      return componentConstructor(tag, options, css.apply(undefined, [strings].concat(interpolations)));
    };

    /* If config methods are called, wrap up a new template function and merge options */
    templateFunction.withConfig = function (config) {
      return constructWithOptions(componentConstructor, tag, _extends({}, options, config));
    };
    templateFunction.attrs = function (attrs) {
      return constructWithOptions(componentConstructor, tag, _extends({}, options, {
        attrs: _extends({}, options.attrs || {}, attrs) }));
    };

    return templateFunction;
  };

  return constructWithOptions;
});

//      
/* globals ReactClass */

var wrapWithTheme = function wrapWithTheme(Component$$1) {
  var _WithTheme$contextTyp;

  var componentName = Component$$1.displayName || Component$$1.name || 'Component';

  var isStyledComponent$$1 = isStyledComponent(Component$$1);

  var WithTheme = function (_React$Component) {
    inherits(WithTheme, _React$Component);

    function WithTheme() {
      var _temp, _this, _ret;

      classCallCheck(this, WithTheme);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {}, _temp), possibleConstructorReturn(_this, _ret);
    }

    // NOTE: This is so that isStyledComponent passes for the innerRef unwrapping


    WithTheme.prototype.componentWillMount = function componentWillMount() {
      var _this2 = this;

      if (!this.context[CHANNEL]) {
        throw new Error('[withTheme] Please use ThemeProvider to be able to use withTheme');
      }

      var subscribe = this.context[CHANNEL];
      this.unsubscribe = subscribe(function (theme) {
        _this2.setState({ theme: theme });
      });
    };

    WithTheme.prototype.componentWillUnmount = function componentWillUnmount() {
      if (typeof this.unsubscribe === 'function') this.unsubscribe();
    };

    WithTheme.prototype.render = function render() {
      // eslint-disable-next-line react/prop-types
      var innerRef = this.props.innerRef;
      var theme = this.state.theme;


      return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(Component$$1, _extends({
        theme: theme
      }, this.props, {
        innerRef: isStyledComponent$$1 ? innerRef : undefined,
        ref: isStyledComponent$$1 ? undefined : innerRef
      }));
    };

    return WithTheme;
  }(__WEBPACK_IMPORTED_MODULE_2_react___default.a.Component);

  WithTheme.displayName = 'WithTheme(' + componentName + ')';
  WithTheme.styledComponentId = 'withTheme';
  WithTheme.contextTypes = (_WithTheme$contextTyp = {}, _WithTheme$contextTyp[CHANNEL] = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func, _WithTheme$contextTyp);


  return __WEBPACK_IMPORTED_MODULE_5_hoist_non_react_statics___default()(WithTheme, Component$$1);
};

//      

/* Import singletons */
/* Import singleton constructors */
/* Import components */
/* Import Higher Order Components */
/* Instantiate singletons */
var ComponentStyle = _ComponentStyle(generateAlphabeticName, flatten, stringifyRules);
var constructWithOptions = _constructWithOptions(css);
var StyledComponent = _StyledComponent(ComponentStyle, constructWithOptions);

/* Instantiate exported singletons */
var keyframes = _keyframes(generateAlphabeticName, stringifyRules, css);
var injectGlobal = _injectGlobal(stringifyRules, css);
var styled = _styled(StyledComponent, constructWithOptions);

/* harmony default export */ __webpack_exports__["default"] = (styled);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(2), __webpack_require__(0)))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var isObject = __webpack_require__(18);

function isObjectObject(o) {
  return isObject(o) === true
    && Object.prototype.toString.call(o) === '[object Object]';
}

module.exports = function isPlainObject(o) {
  var ctor,prot;

  if (isObjectObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (typeof ctor !== 'function') return false;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObjectObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



module.exports = function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/*
 *          __        ___
 *    _____/ /___  __/ (_)____
 *   / ___/ __/ / / / / / ___/
 *  (__  ) /_/ /_/ / / (__  )
 * /____/\__/\__, /_/_/____/
 *          /____/
 *
 * light - weight css preprocessor @licence MIT
 */
/* eslint-disable */
(function (factory) {
	 true ? (module['exports'] = factory(null)) :
		typeof define === 'function' && define['amd'] ? define(factory(null)) :
			(window['stylis'] = factory(null))
}(/** @param {*=} options */function factory (options) {

	'use strict'

	/**
	 * Notes
	 *
	 * The ['<method name>'] pattern is used to support closure compiler
	 * the jsdoc signatures are also used to the same effect
	 *
	 * ---- 
	 *
	 * int + int + int === n4 [faster]
	 *
	 * vs
	 *
	 * int === n1 && int === n2 && int === n3
	 *
	 * ----
	 *
	 * switch (int) { case ints...} [faster]
	 *
	 * vs
	 *
	 * if (int == 1 && int === 2 ...)
	 *
	 * ----
	 *
	 * The (first*n1 + second*n2 + third*n3) format used in the property parser
	 * is a simple way to hash the sequence of characters
	 * taking into account the index they occur in
	 * since any number of 3 character sequences could produce duplicates.
	 *
	 * On the other hand sequences that are directly tied to the index of the character
	 * resolve a far more accurate measure, it's also faster
	 * to evaluate one condition in a switch statement
	 * than three in an if statement regardless of the added math.
	 *
	 * This allows the vendor prefixer to be both small and fast.
	 */

	var nullptn = /^\0+/g /* matches leading null characters */
	var formatptn = /[\0\r\f]/g /* matches new line, null and formfeed characters */
	var colonptn = /: */g /* splits animation rules */
	var cursorptn = /zoo|gra/ /* assert cursor varient */
	var transformptn = /([,: ])(transform)/g /* vendor prefix transform, older webkit */
	var animationptn = /,+\s*(?![^(]*[)])/g /* splits multiple shorthand notation animations */
	var propertiesptn = / +\s*(?![^(]*[)])/g /* animation properties */
	var elementptn = / *[\0] */g /* selector elements */
	var selectorptn = /,\r+?/g /* splits selectors */
	var andptn = /([\t\r\n ])*\f?&/g /* match & */
	var escapeptn = /:global\(((?:[^\(\)\[\]]*|\[.*\]|\([^\(\)]*\))*)\)/g /* matches :global(.*) */
	var invalidptn = /\W+/g /* removes invalid characters from keyframes */
	var keyframeptn = /@(k\w+)\s*(\S*)\s*/ /* matches @keyframes $1 */
	var plcholdrptn = /::(place)/g /* match ::placeholder varient */
	var readonlyptn = /:(read-only)/g /* match :read-only varient */
	var beforeptn = /\s+(?=[{\];=:>])/g /* matches \s before ] ; = : */
	var afterptn = /([[}=:>])\s+/g /* matches \s after characters [ } = : */
	var tailptn = /(\{[^{]+?);(?=\})/g /* matches tail semi-colons ;} */
	var whiteptn = /\s{2,}/g /* matches repeating whitespace */
	var pseudoptn = /([^\(])(:+) */g /* pseudo element */
	var writingptn = /[svh]\w+-[tblr]{2}/ /* match writing mode property values */
	var gradientptn = /([\w-]+t\()/g /* match *gradient property */
	var supportsptn = /\(\s*([^]*?)\s*\)/g /* match supports (groups) */
	var propertyptn = /([^]*?);/g /* match properties leading semicolon */
	var selfptn = /-self|flex-/g /* match flex- and -self in align-self: flex-*; */

	/* vendors */
	var webkit = '-webkit-'
	var moz = '-moz-'
	var ms = '-ms-'

	/* character codes */
	var SEMICOLON = 59 /* ; */
	var CLOSEBRACES = 125 /* } */
	var OPENBRACES = 123 /* { */
	var OPENPARENTHESES = 40 /* ( */
	var CLOSEPARENTHESES = 41 /* ) */
	var OPENBRACKET = 91 /* [ */
	var CLOSEBRACKET = 93 /* ] */
	var NEWLINE = 10 /* \n */
	var CARRIAGE = 13 /* \r */
	var TAB = 9 /* \t */
	var AT = 64 /* @ */
	var SPACE = 32 /*   */
	var AND = 38 /* & */
	var DASH = 45 /* - */
	var UNDERSCORE = 95 /* _ */
	var STAR = 42 /* * */
	var COMMA = 44 /* , */
	var COLON = 58 /* : */
	var SINGLEQUOTE = 39 /* ' */
	var DOUBLEQUOTE = 34 /* " */
	var FOWARDSLASH = 47 /* / */
	var GREATERTHAN = 62 /* > */
	var PLUS = 43 /* + */
	var TILDE = 126 /* ~ */
	var NULL = 0 /* \0 */
	var FORMFEED = 12 /* \f */
	var VERTICALTAB = 11 /* \v */

	/* special identifiers */
	var KEYFRAME = 107 /* k */
	var MEDIA = 109 /* m */
	var SUPPORTS = 115 /* s */
	var PLACEHOLDER = 112 /* p */
	var READONLY = 111 /* o */
	var IMPORT = 169 /* <at>i */
	var CHARSET = 163 /* <at>c */
	var DOCUMENT = 100 /* <at>d */

	var column = 1 /* current column */
	var line = 1 /* current line numebr */
	var pattern = 0 /* :pattern */

	var cascade = 1 /* #id h1 h2 vs h1#id h2#id  */
	var vendor = 1 /* vendor prefix */
	var escape = 1 /* escape :global() pattern */
	var compress = 0 /* compress output */
	var semicolon = 0 /* no/semicolon option */
	var preserve = 0 /* preserve empty selectors */

	/* empty reference */
	var array = []

	/* plugins */
	var plugins = []
	var plugged = 0

	/* plugin context */
	var POSTS = -2
	var PREPS = -1
	var UNKWN = 0
	var PROPS = 1
	var BLCKS = 2
	var ATRUL = 3

	/* plugin newline context */
	var unkwn = 0

	/* keyframe animation */
	var keyed = 1
	var key = ''

	/* selector namespace */
	var nscopealt = ''
	var nscope = ''

	/**
	 * Compile
	 *
	 * @param {Array<string>} parent
	 * @param {Array<string>} current
	 * @param {string} body
	 * @param {number} id
	 * @return {string}
	 */
	function compile (parent, current, body, id) {
		var bracket = 0 /* brackets [] */
		var comment = 0 /* comments /* // or /* */
		var parentheses = 0 /* functions () */
		var quote = 0 /* quotes '', "" */

		var first = 0 /* first character code */
		var second = 0 /* second character code */
		var code = 0 /* current character code */
		var tail = 0 /* previous character code */
		var trail = 0 /* character before previous code */
		var peak = 0 /* previous non-whitespace code */
		
		var counter = 0 /* count sequence termination */
		var context = 0 /* track current context */
		var atrule = 0 /* track @at-rule context */
		var pseudo = 0 /* track pseudo token index */
		var caret = 0 /* current character index */
		var format = 0 /* control character formating context */
		var insert = 0 /* auto semicolon insertion */
		var invert = 0 /* inverted selector pattern */
		var length = 0 /* generic length address */
		var eof = body.length /* end of file(length) */
		var eol = eof - 1 /* end of file(characters) */

		var char = '' /* current character */
		var chars = '' /* current buffer of characters */
		var child = '' /* next buffer of characters */
		var out = '' /* compiled body */
		var children = '' /* compiled children */
		var flat = '' /* compiled leafs */
		var selector /* generic selector address */
		var result /* generic address */

		// ...build body
		while (caret < eof) {
			code = body.charCodeAt(caret)

			if (comment + quote + parentheses + bracket === 0) {
				// eof varient
				if (caret === eol) {
					if (format > 0) {
						chars = chars.replace(formatptn, '')
					}

					if (chars.trim().length > 0) {
						switch (code) {
							case SPACE:
							case TAB:
							case SEMICOLON:
							case CARRIAGE:
							case NEWLINE: {
								break
							}
							default: {
								chars += body.charAt(caret)
							}
						}

						code = SEMICOLON
					}
				}

				// auto semicolon insertion
				if (insert === 1) {
					switch (code) {
						// false flags
						case OPENBRACES:
						case COMMA: {
							insert = 0
							break
						}
						// ignore
						case TAB:
						case CARRIAGE:
						case NEWLINE:
						case SPACE: {
							break
						}
						// valid
						default: {
							caret--
							code = SEMICOLON
						}
					}
				}

				// token varient
				switch (code) {
					case OPENBRACES: {
						chars = chars.trim()
						first = chars.charCodeAt(0)
						counter = 1
						length = ++caret

						while (caret < eof) {
							code = body.charCodeAt(caret)

							switch (code) {
								case OPENBRACES: {
									counter++
									break
								}
								case CLOSEBRACES: {
									counter--
									break
								}
							}

							if (counter === 0) {
								break
							}

							caret++
						}

						child = body.substring(length, caret)

						if (first === NULL) {
							first = (chars = chars.replace(nullptn, '').trim()).charCodeAt(0)
						}

						switch (first) {
							// @at-rule
							case AT: {
								if (format > 0) {
									chars = chars.replace(formatptn, '')
								}

								second = chars.charCodeAt(1)

								switch (second) {
									case DOCUMENT:
									case MEDIA:
									case SUPPORTS: {
										selector = current
										break
									}
									default: {
										selector = array
									}
								}

								child = compile(current, selector, child, second)
								length = child.length

								// preserve empty @at-rule
								if (preserve > 0 && length === 0) {
									length = chars.length
								}

								// execute plugins, @at-rule context
								if (plugged > 0) {
									selector = select(array, chars, invert)
									result = proxy(ATRUL, child, selector, current, line, column, length, second)
									chars = selector.join('')

									if (result !== void 0) {
										if ((length = (child = result.trim()).length) === 0) {
											second = 0
											child = ''
										}
									}
								}

								if (length > 0) {
									switch (second) {
										case SUPPORTS: {
											chars = chars.replace(supportsptn, supports)
										}
										case DOCUMENT:
										case MEDIA: {
											child = chars + '{' + child + '}'
											break
										}
										case KEYFRAME: {
											chars = chars.replace(keyframeptn, '$1 $2' + (keyed > 0 ? key : ''))
											child = chars + '{' + child + '}'
											child = '@' + (vendor > 0 ? webkit + child + '@' + child : child)
											break
										}
										default: {
											child = chars + child
										}
									}
								} else {
									child = ''
								}

								break
							}
							// selector
							default: {
								child = compile(current, select(current, chars, invert), child, id)
							}
						}

						children += child

						// reset
						context = 0
						insert = 0
						pseudo = 0
						format = 0
						invert = 0
						atrule = 0
						chars = ''
						child = ''
						code = body.charCodeAt(++caret)
						break
					}
					case CLOSEBRACES:
					case SEMICOLON: {
						chars = (format > 0 ? chars.replace(formatptn, '') : chars).trim()

						if ((length = chars.length) > 1) {
							// monkey-patch missing colon
							if (pseudo === 0) {
								first = chars.charCodeAt(0)

								// first character is a letter or dash, buffer has a space character
								if ((first === DASH || first > 96 && first < 123)) {
									length = (chars = chars.replace(' ', ':')).length
								}
							}

							// execute plugins, property context
							if (plugged > 0) {
								if ((result = proxy(PROPS, chars, current, parent, line, column, out.length, id)) !== void 0) {
									if ((length = (chars = result.trim()).length) === 0) {
										chars = '\0\0'
									}
								}
							}

							first = chars.charCodeAt(0)
							second = chars.charCodeAt(1)

							switch (first + second) {
								case NULL: {
									break
								}
								case IMPORT:
								case CHARSET: {
									flat += chars + body.charAt(caret)
									break
								}
								default: {
									if (chars.charCodeAt(length-1) === COLON)
										break

									out += property(chars, first, second, chars.charCodeAt(2))
								}
							}
						}

						// reset
						context = 0
						insert = 0
						pseudo = 0
						format = 0
						invert = 0
						chars = ''
						code = body.charCodeAt(++caret)
						break
					}
				}
			}

			// parse characters
			switch (code) {
				case CARRIAGE:
				case NEWLINE: {
					// auto insert semicolon
					if (comment + quote + parentheses + bracket + semicolon === 0) {
						// valid non-whitespace characters that
						// may precede a newline
						switch (peak) {
							case CLOSEPARENTHESES:
							case SINGLEQUOTE:
							case DOUBLEQUOTE:
							case AT:
							case TILDE:
							case GREATERTHAN:
							case STAR:
							case PLUS:
							case FOWARDSLASH:
							case DASH:
							case COLON:
							case COMMA:
							case SEMICOLON:
							case OPENBRACES:
							case CLOSEBRACES: {
								break
							}
							default: {
								// current buffer has a colon
								if (pseudo > 0) {
									insert = 1
								}
							}
						}
					}

					// terminate line comment
					if (comment === FOWARDSLASH) {
						comment = 0
					}

					// execute plugins, newline context
					if (plugged * unkwn > 0) {
						proxy(UNKWN, chars, current, parent, line, column, out.length, id)
					}

					// next line, reset column position
					column = 1
					line++
					break
				}
				case SEMICOLON:
				case CLOSEBRACES: {
					if (comment + quote + parentheses + bracket === 0) {
						column++
						break
					}
				}
				default: {
					// increment column position
					column++

					// current character
					char = body.charAt(caret)
						
					// remove comments, escape functions, strings, attributes and prepare selectors
					switch (code) {
						case TAB:
						case SPACE: {
							if (quote + bracket === 0) {
								switch (tail) {
									case COMMA:
									case COLON:
									case TAB:
									case SPACE: {
										char = ''
										break
									}
									default: {
										if (code !== SPACE) {
											char = ' '
										}
									}
								}
							}
							break
						}
						// escape breaking control characters
						case NULL: {
							char = '\\0'
							break
						}
						case FORMFEED: {
							char = '\\f'
							break
						}
						case VERTICALTAB: {
							char = '\\v'
							break
						}
						// &
						case AND: {
							// inverted selector pattern i.e html &
							if (quote + comment + bracket === 0 && cascade > 0) {
								invert = 1
								format = 1
								char = '\f' + char
							}
							break
						}
						// ::p<l>aceholder, l
						// :read-on<l>y, l
						case 108: {
							if (quote + comment + bracket + pattern === 0 && pseudo > 0) {
								switch (caret - pseudo) {
									// ::placeholder
									case 2: {
										if (tail === PLACEHOLDER && body.charCodeAt(caret-3) === COLON) {
											pattern = tail
										}
									}
									// :read-only
									case 8: {
										if (trail === READONLY) {
											pattern = trail
										}
									}
								}
							}
							break
						}
						// :<pattern>
						case COLON: {
							if (quote + comment + bracket === 0) {
								pseudo = caret
							}
							break
						}
						// selectors
						case COMMA: {
							if (comment + parentheses + quote + bracket === 0) {
								format = 1
								char += '\r'
							}
							break
						}
						// quotes
						case DOUBLEQUOTE: {
							if (comment === 0) {
								quote = quote === code ? 0 : (quote === 0 ? code : quote)
								// " last character, add synthetic padding
								if (caret === eol) {
									eol++
									eof++
								}
							}
							break
						}
						case SINGLEQUOTE: {
							if (comment === 0) {
								quote = quote === code ? 0 : (quote === 0 ? code : quote)
								// ' last character, add synthetic padding
								if (caret === eol) {
									eol++
									eof++
								}
							}
							break
						}
						// attributes
						case OPENBRACKET: {
							if (quote + comment + parentheses === 0) {
								bracket++
							}
							break
						}
						case CLOSEBRACKET: {
							if (quote + comment + parentheses === 0) {
								bracket--
							}
							break
						}
						// functions
						case CLOSEPARENTHESES: {
							if (quote + comment + bracket === 0) {
								// ) last character, add synthetic padding
								if (caret === eol) {
									eol++
									eof++
								}

								parentheses--
							}
							break
						}
						case OPENPARENTHESES: {
							if (quote + comment + bracket === 0) {
								if (context === 0) {
									switch (tail*2 + trail*3) {
										// :matches
										case 533: {
											break
										}
										// :global, :not, :nth-child etc...
										default: {
											counter = 0
											context = 1
										}
									}
								}

								parentheses++
							}
							break
						}
						case AT: {
							if (comment + parentheses + quote + bracket + pseudo + atrule === 0) {
								atrule = 1
							}
							break
						}
						// block/line comments
						case STAR:
						case FOWARDSLASH: {
							if (quote + bracket + parentheses > 0) {
								break
							}

							switch (comment) {
								// initialize line/block comment context
								case 0: {
									switch (code*2 + body.charCodeAt(caret+1)*3) {
										// //
										case 235: {
											comment = FOWARDSLASH
											break
										}
										// /*
										case 220: {
											comment = STAR
											break
										}
									}
									break
								}
								// end block comment context
								case STAR: {
									if (code === FOWARDSLASH && tail === STAR) {
										char = ''
										comment = 0
									}
								}
							}
						}
					}

					// ignore comment blocks
					if (comment === 0) {
						// aggressive isolation mode, divide each individual selector
						// including selectors in :not function but excluding selectors in :global function
						if (cascade + quote + bracket + atrule === 0 && id !== KEYFRAME && code !== SEMICOLON) {
							switch (code) {
								case COMMA:
								case TILDE:
								case GREATERTHAN:
								case PLUS:
								case CLOSEPARENTHESES:
								case OPENPARENTHESES: {
									if (context === 0) {
										// outside of an isolated context i.e nth-child(<...>)
										switch (tail) {
											case TAB:
											case SPACE:
											case NEWLINE:
											case CARRIAGE: {
												char = char + '\0'
												break
											}
											default: {
												char = '\0' + char + (code === COMMA ? '' : '\0')
											}
										}
										format = 1
									} else {
										// within an isolated context, sleep untill it's terminated
										switch (code) {
											case OPENPARENTHESES: {
												context = ++counter
												break
											}
											case CLOSEPARENTHESES: {
												if ((context = --counter) === 0) {
													format = 1
													char += '\0'
												}
												break
											}
										}
									}
									break
								}
								case SPACE: {
									switch (tail) {
										case NULL:
										case OPENBRACES:
										case CLOSEBRACES:
										case SEMICOLON:
										case COMMA:
										case FORMFEED:
										case TAB:
										case SPACE:
										case NEWLINE:
										case CARRIAGE: {
											break
										}
										default: {
											// ignore in isolated contexts
											if (context === 0) {
												format = 1
												char += '\0'
											}
										}
									}
								}
							}
						}

						// concat buffer of characters
						chars += char

						// previous non-whitespace character code
						if (code !== SPACE) {
							peak = code
						}
					}
				}
			}

			// tail character codes
			trail = tail
			tail = code

			// visit every character
			caret++
		}

		length = out.length

		// preserve empty selector
 		if (preserve > 0) {
 			if (length === 0 && children.length === 0 && (current[0].length === 0) === false) {
 				if (id !== MEDIA || (current.length === 1 && (cascade > 0 ? nscopealt : nscope) === current[0])) {
					length = current.join(',').length + 2 					
 				}
 			}
		}

		if (length > 0) {
			// cascade isolation mode?
			selector = cascade === 0 && id !== KEYFRAME ? isolate(current) : current

			// execute plugins, block context
			if (plugged > 0) {
				result = proxy(BLCKS, out, selector, parent, line, column, length, id)

				if (result !== void 0 && (out = result).length === 0) {
					return flat + out + children
				}
			}

			out = selector.join(',') + '{' + out + '}'

			if (vendor*pattern > 0) {
				switch (pattern) {
					// ::read-only
					case READONLY: {
						out = out.replace(readonlyptn, ':'+moz+'$1')+out
						break
					}
					// ::placeholder
					case PLACEHOLDER: {
						out = (
							out.replace(plcholdrptn, '::' + webkit + 'input-$1') +
							out.replace(plcholdrptn, '::' + moz + '$1') +
							out.replace(plcholdrptn, ':' + ms + 'input-$1') + out
						)
						break
					}
				}
				pattern = 0
			}
		}

		return flat + out + children
	}

	/**
	 * Select
	 *
	 * @param {Array<string>} parent
	 * @param {string} current
	 * @param {number} invert
	 * @return {Array<string>}
	 */
	function select (parent, current, invert) {
		var selectors = current.trim().split(selectorptn)
		var out = selectors

		var length = selectors.length
		var l = parent.length

		switch (l) {
			// 0-1 parent selectors
			case 0:
			case 1: {
				for (var i = 0, selector = l === 0 ? '' : parent[0] + ' '; i < length; ++i) {
					out[i] = scope(selector, out[i], invert, l).trim()
				}
				break
			}
			// >2 parent selectors, nested
			default: {
				for (var i = 0, j = 0, out = []; i < length; ++i) {
					for (var k = 0; k < l; ++k) {
						out[j++] = scope(parent[k] + ' ', selectors[i], invert, l).trim()
					}
				}
			}
		}

		return out
	}

	/**
	 * Scope
	 *
	 * @param {string} parent
	 * @param {string} current
	 * @param {number} invert
	 * @param {number} level
	 * @return {string}
	 */
	function scope (parent, current, invert, level) {
		var selector = current
		var code = selector.charCodeAt(0)

		// trim leading whitespace
		if (code < 33) {
			code = (selector = selector.trim()).charCodeAt(0)
		}

		switch (code) {
			// &
			case AND: {
				switch (cascade + level) {
					case 0:
					case 1: {
						if (parent.trim().length === 0) {
							break
						}
					}
					default: {
						return selector.replace(andptn, '$1'+parent.trim())
					}
				}
				break
			}
			// :
			case COLON: {
				switch (selector.charCodeAt(1)) {
					// g in :global
					case 103: {
						if (escape > 0 && cascade > 0) {
							return selector.replace(escapeptn, '$1').replace(andptn, '$1'+nscope)
						}
						break
					}
					default: {
						// :hover
						return parent.trim() + selector
					}
				}
			}
			default: {
				// html &
				if (invert*cascade > 0 && selector.indexOf('\f') > 0) {
					return selector.replace(andptn, (parent.charCodeAt(0) === COLON ? '' : '$1')+parent.trim())
				}
			}
		}

		return parent + selector
	}

	/**
	 * Property
	 *
	 * @param {string} input
	 * @param {number} first
	 * @param {number} second
	 * @param {number} third
	 * @return {string}
	 */
	function property (input, first, second, third) {
		var index = 0
		var out = input + ';'
		var hash = (first*2) + (second*3) + (third*4)
		var cache

		// animation: a, n, i characters
		if (hash === 944) {
			out = animation(out)
		} else if (vendor > 0) {
			// vendor prefix
			switch (hash) {
				// mask
				case 969: {
					out = webkit + out.replace(gradientptn, webkit+'$1') + out
					break
				}
				// filter
				case 951: {
					out = webkit + out + out
					break
				}
				// color/column, c, o, l
				case 963: {
					// column
					if (out.charCodeAt(5) === 110) {
						out = webkit + out + out
					}
					break
				}
				// appearance: a, p, p
				case 978: {
					out = webkit + out + moz + out + out
					break
				}
				// hyphens: h, y, p
				// user-select: u, s, e
				case 1019:
				case 983: {
					out = webkit + out + moz + out + ms + out + out
					break
				}
				// background/backface-visibility, b, a, c
				case 883: {
					// backface-visibility, -
					if (out.charCodeAt(8) === DASH) {
						out = webkit + out + out
					}
					break
				}
				// flex: f, l, e
				case 932: {
					out = webkit + out + ms + out + out
					break
				}
				// order: o, r, d
				case 964: {
					out = webkit + out + ms + 'flex' + '-' + out + out
					break
				}
				// justify-content, j, u, s
				case 1023: {
					cache = out.substring(out.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify')
					out = webkit + 'box-pack' + cache + webkit + out + ms + 'flex-pack' + cache + out
					break
				}
				// position: sticky
				case 1017: {
					if (out.indexOf('sticky', 9) === -1) {
						break
					}
				}
				// display(flex/inline-flex/inline-box): d, i, s
				case 975: {
					index = (out = input).length-10
					cache = (out.charCodeAt(index) === 33 ? out.substring(0, index) : out).substring(input.indexOf(':', 7) + 1).trim()

					switch (hash = cache.charCodeAt(0) + (cache.charCodeAt(7)|0)) {
						// inline-
						case 203: {
							// inline-box
							if (cache.charCodeAt(8) < 111) {
								break
							}
						}
						// inline-box/sticky
						case 115: {
							out = out.replace(cache, webkit+cache)+';'+out
							break
						}
						// inline-flex
						// flex
						case 207:
						case 102: {
							out = (
								out.replace(cache, webkit+(hash > 102 ? 'inline-' : '')+'box')+';'+
								out.replace(cache, webkit+cache)+';'+
								out.replace(cache, ms+cache+'box')+';'+
								out
							)
						}
					}
					
					out += ';'
					break
				}
				// align-items, align-center, align-self: a, l, i, -
				case 938: {
					if (out.charCodeAt(5) === DASH) {
						switch (out.charCodeAt(6)) {
							// align-items, i
							case 105: {
								cache = out.replace('-items', '')
								out = webkit + out + webkit + 'box-' + cache + ms + 'flex-' + cache + out
								break
							}
							// align-self, s
							case 115: {
								out = webkit + out + ms + 'flex-item-' + out.replace(selfptn, '') + out
								break
							}
							// align-content
							default: {
								out = webkit + out + ms + 'flex-line-pack' + out.replace('align-content', '') + out
							}
						}
					}
					break
				}
				// cursor, c, u, r
				case 1005: {
					if (cursorptn.test(out)) {
						out = out.replace(colonptn, ':' + webkit) + out.replace(colonptn, ':' + moz) + out
					}
					break
				}
				// width: min-content / width: max-content
				case 953: {
					if ((index = out.indexOf('-content', 9)) > 0) {
						// width: min-content / width: max-content
						cache = out.substring(index - 3)
						out = 'width:' + webkit + cache + 'width:' + moz + cache + 'width:' + cache
					}
					break
				}
				// text-size-adjust: t, e, x
				case 1015: {
					if (input.charCodeAt(9) !== DASH) {
						break
					}
				}
				// transform, transition: t, r, a
				case 962: {
					out = webkit + out + (out.charCodeAt(5) === 102 ? ms + out : '') + out

					// transitions
					if (second + third === 211 && out.charCodeAt(13) === 105 && out.indexOf('transform', 10) > 0) {
						out = out.substring(0, out.indexOf(';', 27) + 1).replace(transformptn, '$1' + webkit + '$2') + out
					}

					break
				}
				// writing-mode, w, r, i
				case 1000: {
					cache = out.substring(13).trim()
					index = cache.indexOf('-')+1

					switch (cache.charCodeAt(0)+cache.charCodeAt(index)) {
						// vertical-lr
						case 226: {
							cache = out.replace(writingptn, 'tb')
							break
						}
						// vertical-rl
						case 232: {
							cache = out.replace(writingptn, 'tb-rl')
							break
						}
						// horizontal-tb
						case 220: {
							cache = out.replace(writingptn, 'lr')
							break
						}
						default: {
							return out
						}
					}

					out = webkit + out + ms + cache + out
					break
				}
			}
		}

		return out
	}

	/**
	 * @param {string} match
	 * @param {string} group
	 * @return {string}
	 */
	function supports (match, group) {
		var out = property(group, group.charCodeAt(0), group.charCodeAt(1), group.charCodeAt(2))

		return out !== group+';' ? out.replace(propertyptn, 'or($1)').substring(2) : '('+group+')'
	}

	/**
	 * Animation
	 *
	 * @param {string} input
	 * @return {string}
	 */
	function animation (input) {
		var length = input.length
		var index = input.indexOf(':', 9) + 1
		var declare = input.substring(0, index).trim()
		var body = input.substring(index, length-1).trim()
		var out = ''

		// shorthand
		if (input.charCodeAt(9) !== DASH) {
			// split in case of multiple animations
			var list = body.split(animationptn)

			for (var i = 0, index = 0, length = list.length; i < length; index = 0, ++i) {
				var value = list[i]
				var items = value.split(propertiesptn)

				while (value = items[index]) {
					var peak = value.charCodeAt(0)

					if (keyed === 1 && (
						// letters
						(peak > AT && peak < 90) || (peak > 96 && peak < 123) || peak === UNDERSCORE ||
						// dash but not in sequence i.e --
						(peak === DASH && value.charCodeAt(1) !== DASH)
					)) {
						// not a number/function
						switch (isNaN(parseFloat(value)) + (value.indexOf('(') !== -1)) {
							case 1: {
								switch (value) {
									// not a valid reserved keyword
									case 'infinite': case 'alternate': case 'backwards': case 'running':
									case 'normal': case 'forwards': case 'both': case 'none': case 'linear':
									case 'ease': case 'ease-in': case 'ease-out': case 'ease-in-out':
									case 'paused': case 'reverse': case 'alternate-reverse': case 'inherit':
									case 'initial': case 'unset': case 'step-start': case 'step-end': {
										break
									}
									default: {
										value += key
									}
								}
							}
						}
					}

					items[index++] = value
				}

				out += (i === 0 ? '' : ',') + items.join(' ')
			}
		} else {
			// animation-name, n
			out += input.charCodeAt(10) === 110 ? body + (keyed === 1 ? key : '') : body
		}

		out = declare + out + ';'

		return vendor > 0 ? webkit + out + out : out
	}

	/**
	 * Isolate
	 *
	 * @param {Array<string>} current
	 */
	function isolate (current) {
		for (var i = 0, length = current.length, selector = Array(length), padding, element; i < length; ++i) {
			// split individual elements in a selector i.e h1 h2 === [h1, h2]
			var elements = current[i].split(elementptn)
			var out = ''

			for (var j = 0, size = 0, tail = 0, code = 0, l = elements.length; j < l; ++j) {
				// empty element
				if ((size = (element = elements[j]).length) === 0 && l > 1) {
					continue
				}

				tail = out.charCodeAt(out.length-1)
				code = element.charCodeAt(0)
				padding = ''

				if (j !== 0) {
					// determine if we need padding
					switch (tail) {
						case STAR:
						case TILDE:
						case GREATERTHAN:
						case PLUS:
						case SPACE:
						case OPENPARENTHESES:  {
							break
						}
						default: {
							padding = ' '
						}
					}
				}

				switch (code) {
					case AND: {
						element = padding + nscopealt
					}
					case TILDE:
					case GREATERTHAN:
					case PLUS:
					case SPACE:
					case CLOSEPARENTHESES:
					case OPENPARENTHESES: {
						break
					}
					case OPENBRACKET: {
						element = padding + element + nscopealt
						break
					}
					case COLON: {
						switch (element.charCodeAt(1)*2 + element.charCodeAt(2)*3) {
							// :global
							case 530: {
								if (escape > 0) {
									element = padding + element.substring(8, size - 1)
									break
								}
							}
							// :hover, :nth-child(), ...
							default: {
								if (j < 1 || elements[j-1].length < 1) {
									element = padding + nscopealt + element
								}
							}
						}
						break
					}
					case COMMA: {
						padding = ''
					}
					default: {
						if (size > 1 && element.indexOf(':') > 0) {
							element = padding + element.replace(pseudoptn, '$1' + nscopealt + '$2')
						} else {
							element = padding + element + nscopealt
						}
					}
				}

				out += element
			}

			selector[i] = out.replace(formatptn, '').trim()
		}

		return selector
	}

	/**
	 * Proxy
	 *
	 * @param {number} context
	 * @param {string} content
	 * @param {Array<string>} selectors
	 * @param {Array<string>} parents
	 * @param {number} line
	 * @param {number} column
	 * @param {number} length
	 * @param {number} id
	 * @return {(string|void|*)}
	 */
	function proxy (context, content, selectors, parents, line, column, length, id) {
		for (var i = 0, out = content, next; i < plugged; ++i) {
			switch (next = plugins[i].call(stylis, context, out, selectors, parents, line, column, length, id)) {
				case void 0:
				case false:
				case true:
				case null: {
					break
				}
				default: {
					out = next
				}
			}
		}

		switch (out) {
			case void 0:
			case false:
			case true:
			case null:
			case content: {
				break
			}
			default: {
				return out
			}
		}
	}

	/**
	 * Minify
	 *
	 * @param {(string|*)} output
	 * @return {string}
	 */
	function minify (output) {
		return output
			.replace(formatptn, '')
			.replace(beforeptn, '')
			.replace(afterptn, '$1')
			.replace(tailptn, '$1')
			.replace(whiteptn, ' ')
	}

	/**
	 * Use
	 *
	 * @param {(Array<function(...?)>|function(...?)|number|void)?} plugin
	 */
	function use (plugin) {
		switch (plugin) {
			case void 0:
			case null: {
				plugged = plugins.length = 0
				break
			}
			default: {
				switch (plugin.constructor) {
					case Array: {
						for (var i = 0, length = plugin.length; i < length; ++i) {
							use(plugin[i])
						}
						break
					}
					case Function: {
						plugins[plugged++] = plugin
						break
					}
					case Boolean: {
						unkwn = !!plugin|0
					}
				}
			}
 		}

 		return use
	}

	/**
	 * Set
	 *
	 * @param {*} options
	 */
	function set (options) {
		for (var name in options) {
			var value = options[name]
			switch (name) {
				case 'keyframe': keyed = value|0; break
				case 'global': escape = value|0; break
				case 'cascade': cascade = value|0; break
				case 'compress': compress = value|0; break
				case 'prefix': vendor = value|0; break
				case 'semicolon': semicolon = value|0; break
				case 'preserve': preserve = value|0; break
			}
		}

		return set
	}

	/**
	 * Stylis
	 *
	 * @param {string} selector
	 * @param {string} input
	 * @return {*}
	 */
	function stylis (selector, input) {
		if (this !== void 0 && this.constructor === stylis) {
			return factory(selector)
		}

		// setup
		var ns = selector
		var code = ns.charCodeAt(0)

		// trim leading whitespace
		if (code < 33) {
			code = (ns = ns.trim()).charCodeAt(0)
		}

		// keyframe/animation namespace
		if (keyed > 0) {
			key = ns.replace(invalidptn, code === OPENBRACKET ? '' : '-')
		}

		// reset, used to assert if a plugin is moneky-patching the return value
		code = 1

		// cascade/isolate
		if (cascade === 1) {
			nscope = ns
		} else {
			nscopealt = ns
		}

		var selectors = [nscope]
		var result

		// execute plugins, pre-process context
		if (plugged > 0) {
			result = proxy(PREPS, input, selectors, selectors, line, column, 0, 0)

			if (result !== void 0 && typeof result === 'string') {
				input = result
			}
		}

		// build
		var output = compile(array, selectors, input, 0)

		// execute plugins, post-process context
		if (plugged > 0) {
			result = proxy(POSTS, output, selectors, selectors, line, column, output.length, 0)
	
			// bypass minification
			if (result !== void 0 && typeof(output = result) !== 'string') {
				code = 0
			}
		}

		// reset
		key = ''
		nscope = ''
		nscopealt = ''
		pattern = 0
		line = 1
		column = 1

		return compress*code === 0 ? output : minify(output)
	}

	stylis['use'] = use
	stylis['set'] = set

	if (options !== void 0) {
		set(options)
	}

	return stylis
}));


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(21)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(23)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(3);
var invariant = __webpack_require__(4);
var warning = __webpack_require__(7);

var ReactPropTypesSecret = __webpack_require__(5);
var checkPropTypes = __webpack_require__(22);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplid to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(4);
  var warning = __webpack_require__(7);
  var ReactPropTypesSecret = __webpack_require__(5);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(3);
var invariant = __webpack_require__(4);
var ReactPropTypesSecret = __webpack_require__(5);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = isFunction

var toString = Object.prototype.toString

function isFunction (fn) {
  var string = toString.call(fn)
  return string === '[object Function]' ||
    (typeof fn === 'function' && string !== '[object RegExp]') ||
    (typeof window !== 'undefined' &&
     // IE8 and below
     (fn === window.setTimeout ||
      fn === window.alert ||
      fn === window.confirm ||
      fn === window.prompt))
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */


var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    arguments: true,
    arity: true
};

var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';

module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
        var keys = Object.getOwnPropertyNames(sourceComponent);

        /* istanbul ignore else */
        if (isGetOwnPropertySymbolsAvailable) {
            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
                try {
                    targetComponent[keys[i]] = sourceComponent[keys[i]];
                } catch (error) {

                }
            }
        }
    }

    return targetComponent;
};


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adjustHue", function() { return curriedAdjustHue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "animation", function() { return animation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "backgroundImages", function() { return backgroundImages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "backgrounds", function() { return backgrounds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "borderColor", function() { return borderColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "borderRadius", function() { return borderRadius; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "borderStyle", function() { return borderStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "borderWidth", function() { return borderWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buttons", function() { return buttons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearFix", function() { return clearFix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "complement", function() { return complement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "darken", function() { return curriedDarken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "desaturate", function() { return curriedDesaturate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "directionalProperty", function() { return directionalProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ellipsis", function() { return ellipsis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "em", function() { return em; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fontFace", function() { return fontFace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLuminance", function() { return getLuminance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "grayscale", function() { return grayscale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invert", function() { return invert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hideText", function() { return hideText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hiDPI", function() { return hiDPI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hsl", function() { return hsl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hsla", function() { return hsla; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lighten", function() { return curriedLighten; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "margin", function() { return margin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mix", function() { return curriedMix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modularScale", function() { return modularScale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "opacify", function() { return curriedOpacify; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "padding", function() { return padding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseToHsl", function() { return parseToHsl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseToRgb", function() { return parseToRgb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "placeholder", function() { return placeholder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "position", function() { return position; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "radialGradient", function() { return radialGradient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readableColor", function() { return curriedReadableColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rem", function() { return rem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "retinaImage", function() { return retinaImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgb", function() { return rgb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgba", function() { return rgba; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saturate", function() { return curriedSaturate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selection", function() { return selection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setHue", function() { return curriedSetHue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLightness", function() { return curriedSetLightness; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSaturation", function() { return curriedSetSaturation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shade", function() { return curriedShade; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "size", function() { return size; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stripUnit", function() { return stripUnit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "textInputs", function() { return textInputs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timingFunctions", function() { return timingFunctions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tint", function() { return curriedTint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toColorString", function() { return toColorString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transitions", function() { return transitions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transparentize", function() { return curriedTransparentize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "triangle", function() { return triangle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wordWrap", function() { return wordWrap; });
//      

// @private
function capitalizeString(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//      
var positionMap = ['Top', 'Right', 'Bottom', 'Left'];

function generateProperty(property, position) {
  if (!property) return position.toLowerCase();
  var splitProperty = property.split('-');
  if (splitProperty.length > 1) {
    splitProperty.splice(1, 0, position);
    return splitProperty.reduce(function (acc, val) {
      return '' + acc + capitalizeString(val);
    });
  }
  var joinedProperty = property.replace(/([a-z])([A-Z])/g, '$1' + position + '$2');
  return property === joinedProperty ? '' + property + position : joinedProperty;
}

function generateStyles(property, valuesWithDefaults) {
  var styles = {};
  for (var i = 0; i < valuesWithDefaults.length; i += 1) {
    if (valuesWithDefaults[i]) {
      styles[generateProperty(property, positionMap[i])] = valuesWithDefaults[i];
    }
  }
  return styles;
}

/**
 * A helper that enables shorthand for direction based properties. It accepts a property (hyphenated or camelCased) and up to four values that map to top, right, bottom, and left, respectively. You can optionally pass an empty string to get only the directional values as properties. You can also optionally pass a null argument for a directional value to ignore it.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...directionalProperty('padding', '12px', '24px', '36px', '48px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${directionalProperty('padding', '12px', '24px', '36px', '48px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'paddingTop': '12px',
 *   'paddingRight': '24px',
 *   'paddingBottom': '36px',
 *   'paddingLeft': '48px'
 * }
 */

function directionalProperty(property) {
  for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }

  //  prettier-ignore
  var firstValue = values[0],
      _values$ = values[1],
      secondValue = _values$ === undefined ? firstValue : _values$,
      _values$2 = values[2],
      thirdValue = _values$2 === undefined ? firstValue : _values$2,
      _values$3 = values[3],
      fourthValue = _values$3 === undefined ? secondValue : _values$3;

  var valuesWithDefaults = [firstValue, secondValue, thirdValue, fourthValue];
  return generateStyles(property, valuesWithDefaults);
}

//      

/**
 * Check if a string ends with something
 * @private
 */
var endsWith = function (string, suffix) {
  return string.substr(-suffix.length) === suffix;
};

//      

/**
 * Strip the unit from a given CSS value, returning just the number. (or the original value if an invalid string was passed)
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   '--dimension': stripUnit('100px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   --dimension: ${stripUnit('100px')}
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   '--dimension': 100
 * }
 */

function stripUnit(value) {
  var unitlessValue = parseFloat(value);
  if (isNaN(unitlessValue)) return value;
  return unitlessValue;
}

//      

/**
 * Factory function that creates pixel-to-x converters
 * @private
 */
var pxtoFactory$1 = function pxtoFactory$1(to) {
  return function (pxval) {
    var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '16px';

    var newPxval = pxval;
    var newBase = base;
    if (typeof pxval === 'string') {
      if (!endsWith(pxval, 'px')) {
        throw new Error('Expected a string ending in "px" or a number passed as the first argument to ' + to + '(), got "' + pxval + '" instead.');
      }
      newPxval = stripUnit(pxval);
    }

    if (typeof base === 'string') {
      if (!endsWith(base, 'px')) {
        throw new Error('Expected a string ending in "px" or a number passed as the second argument to ' + to + '(), got "' + base + '" instead.');
      }
      newBase = stripUnit(base);
    }

    if (typeof newPxval === 'string') {
      throw new Error('Passed invalid pixel value ("' + pxval + '") to ' + to + '(), please pass a value like "12px" or 12.');
    }

    if (typeof newBase === 'string') {
      throw new Error('Passed invalid base value ("' + base + '") to ' + to + '(), please pass a value like "12px" or 12.');
    }

    return '' + newPxval / newBase + to;
  };
};

//      
/**
 * Convert pixel value to ems. The default base value is 16px, but can be changed by passing a
 * second argument to the function.
 * @function
 * @param {string|number} pxval
 * @param {string|number} [base='16px']
 * @example
 * // Styles as object usage
 * const styles = {
 *   'height': em('16px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   height: ${em('16px')}
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   'height': '1em'
 * }
 */

// Don’t inline this variable into export because Rollup will remove the /*#__PURE__*/ comment
var em = /* #__PURE__*/pxtoFactory$1('em'); // eslint-disable-line spaced-comment

//      

var ratioNames = {
  minorSecond: 1.067,
  majorSecond: 1.125,
  minorThird: 1.2,
  majorThird: 1.25,
  perfectFourth: 1.333,
  augFourth: 1.414,
  perfectFifth: 1.5,
  minorSixth: 1.6,
  goldenSection: 1.618,
  majorSixth: 1.667,
  minorSeventh: 1.778,
  majorSeventh: 1.875,
  octave: 2,
  majorTenth: 2.5,
  majorEleventh: 2.667,
  majorTwelfth: 3,
  doubleOctave: 4
};

/** */

/**
 * Establish consistent measurements and spacial relationships throughout your projects by incrementing up or down a defined scale. We provide a list of commonly used scales as pre-defined variables, see below.
 * @example
 * // Styles as object usage
 * const styles = {
 *    // Increment two steps up the default scale
 *   'fontSize': modularScale(2)
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *    // Increment two steps up the default scale
 *   fontSize: ${modularScale(2)}
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   'fontSize': '1.77689em'
 * }
 */
function modularScale(steps) {
  var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '1em';
  var ratio = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'perfectFourth';

  if (typeof steps !== 'number') {
    throw new Error('Please provide a number of steps to the modularScale helper.');
  }
  if (typeof ratio === 'string' && !ratioNames[ratio]) {
    throw new Error('Please pass a number or one of the predefined scales to the modularScale helper as the ratio.');
  }

  var realBase = typeof base === 'string' ? stripUnit(base) : base;
  var realRatio = typeof ratio === 'string' ? ratioNames[ratio] : ratio;

  if (typeof realBase === 'string') {
    throw new Error('Invalid value passed as base to modularScale, expected number or em string but got "' + base + '"');
  }

  return realBase * Math.pow(realRatio, steps) + 'em';
}

//      

/**
 * Convert pixel value to rems. The default base value is 16px, but can be changed by passing a
 * second argument to the function.
 * @function
 * @param {string|number} pxval
 * @param {string|number} [base='16px']
 * @example
 * // Styles as object usage
 * const styles = {
 *   'height': rem('16px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   height: ${rem('16px')}
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   'height': '1rem'
 * }
 */

// Don’t inline this variable into export because Rollup will remove the /*#__PURE__*/ comment
var rem = /*#__PURE__*/pxtoFactory$1('rem'); // eslint-disable-line spaced-comment

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};



















var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();



var taggedTemplateLiteral = function (strings, raw) {
  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
};

//      

/**
 * CSS to contain a float (credit to CSSMojo).
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *    ...clearFix(),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${clearFix()}
 * `
 *
 * // CSS as JS Output
 *
 * '&::after': {
 *   'clear': 'both',
 *   'content': '""',
 *   'display': 'table'
 * }
 */

function clearFix() {
  var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '&';

  var pseudoSelector = parent + '::after';
  return defineProperty({}, pseudoSelector, {
    clear: 'both',
    content: '""',
    display: 'table'
  });
}

//      

/**
 * CSS to represent truncated text with an ellipsis.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...ellipsis('250px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${ellipsis('250px')}
 * `
 *
 * // CSS as JS Output
 *
 * div: {
 *   'display': 'inline-block',
 *   'maxWidth': '250px',
 *   'overflow': 'hidden',
 *   'textOverflow': 'ellipsis',
 *   'whiteSpace': 'nowrap',
 *   'wordWrap': 'normal'
 * }
 */

function ellipsis() {
  var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '100%';

  return {
    display: 'inline-block',
    maxWidth: width,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    wordWrap: 'normal'
  };
}

//      

/** */

function generateFileReferences(fontFilePath, fileFormats) {
  var fileFontReferences = fileFormats.map(function (format) {
    return 'url("' + fontFilePath + '.' + format + '")';
  });
  return fileFontReferences.join(', ');
}

function generateLocalReferences(localFonts) {
  var localFontReferences = localFonts.map(function (font) {
    return 'local("' + font + '")';
  });
  return localFontReferences.join(', ');
}

function generateSources(fontFilePath, localFonts, fileFormats) {
  var fontReferences = [];
  if (localFonts) fontReferences.push(generateLocalReferences(localFonts));
  if (fontFilePath) {
    fontReferences.push(generateFileReferences(fontFilePath, fileFormats));
  }
  return fontReferences.join(', ');
}

/**
 * CSS for a @font-face declaration.
 *
 * @example
 * // Styles as object basic usage
 * const styles = {
 *    ...fontFace({
 *      'fontFamily': 'Sans-Pro'
 *      'fontFilePath': 'path/to/file'
 *    })
 * }
 *
 * // styled-components basic usage
 * injectGlobal`${
 *   fontFace({
 *     'fontFamily': 'Sans-Pro'
 *     'fontFilePath': 'path/to/file'
 *   }
 * )}`
 *
 * // CSS as JS Output
 *
 * '@font-face': {
 *   'fontFamily': 'Sans-Pro',
 *   'src': 'url("path/to/file.eot"), url("path/to/file.woff2"), url("path/to/file.woff"), url("path/to/file.ttf"), url("path/to/file.svg")',
 * }
 */

function fontFace(_ref) {
  var fontFamily = _ref.fontFamily,
      fontFilePath = _ref.fontFilePath,
      fontStretch = _ref.fontStretch,
      fontStyle = _ref.fontStyle,
      fontVariant = _ref.fontVariant,
      fontWeight = _ref.fontWeight,
      _ref$fileFormats = _ref.fileFormats,
      fileFormats = _ref$fileFormats === undefined ? ['eot', 'woff2', 'woff', 'ttf', 'svg'] : _ref$fileFormats,
      localFonts = _ref.localFonts,
      unicodeRange = _ref.unicodeRange;

  // Error Handling
  if (!fontFamily) throw new Error('fontFace expects a name of a font-family.');
  if (!fontFilePath && !localFonts) {
    throw new Error('fontFace expects either the path to the font file(s) or a name of a local copy.');
  }
  if (localFonts && !Array.isArray(localFonts)) {
    throw new Error('fontFace expects localFonts to be an array.');
  }
  if (!Array.isArray(fileFormats)) {
    throw new Error('fontFace expects fileFormats to be an array.');
  }

  var fontFaceDeclaration = {
    '@font-face': {
      fontFamily: fontFamily,
      src: generateSources(fontFilePath, localFonts, fileFormats),
      unicodeRange: unicodeRange,
      fontStretch: fontStretch,
      fontStyle: fontStyle,
      fontVariant: fontVariant,
      fontWeight: fontWeight
    }
  };

  // Removes undefined fields for cleaner css object.
  return JSON.parse(JSON.stringify(fontFaceDeclaration));
}

//      

/**
 * CSS to hide text to show a background image in a SEO-friendly way.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   'backgroundImage': 'url(logo.png)',
 *   ...hideText(),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   backgroundImage: url(logo.png);
 *   ${hideText()};
 * `
 *
 * // CSS as JS Output
 *
 * 'div': {
 *   'backgroundImage': 'url(logo.png)',
 *   'textIndent': '101%',
 *   'overflow': 'hidden',
 *   'whiteSpace': 'nowrap',
 * }
 */

function hideText() {
  return {
    textIndent: '101%',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  };
}

//      

/**
 * Generates a media query to target HiDPI devices.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *  [hiDPI(1.5)]: {
 *    width: 200px;
 *  }
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${hiDPI(1.5)} {
 *     width: 200px;
 *   }
 * `
 *
 * // CSS as JS Output
 *
 * '@media only screen and (-webkit-min-device-pixel-ratio: 1.5),
 *  only screen and (min--moz-device-pixel-ratio: 1.5),
 *  only screen and (-o-min-device-pixel-ratio: 1.5/1),
 *  only screen and (min-resolution: 144dpi),
 *  only screen and (min-resolution: 1.5dppx)': {
 *   'width': '200px',
 * }
 */

function hiDPI() {
  var ratio = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1.3;

  return "\n    @media only screen and (-webkit-min-device-pixel-ratio: " + ratio + "),\n    only screen and (min--moz-device-pixel-ratio: " + ratio + "),\n    only screen and (-o-min-device-pixel-ratio: " + ratio + "/1),\n    only screen and (min-resolution: " + Math.round(ratio * 96) + "dpi),\n    only screen and (min-resolution: " + ratio + "dppx)\n  ";
}

var _opinionatedRules;
var _unopinionatedRules;

//      
var opinionatedRules = (_opinionatedRules = {
  html: {
    fontFamily: 'sans-serif'
  },

  body: {
    margin: '0'
  }

}, defineProperty(_opinionatedRules, 'a:active,\n  a:hover', {
  outlineWidth: '0'
}), defineProperty(_opinionatedRules, 'button,\n  input,\n  optgroup,\n  select,\n  textarea', {
  fontFamily: 'sans-serif',
  fontSize: '100%',
  lineHeight: '1.15'
}), _opinionatedRules);

var unopinionatedRules = (_unopinionatedRules = {
  html: {
    lineHeight: '1.15',
    textSizeAdjust: '100%'
  }

}, defineProperty(_unopinionatedRules, 'article,\n  aside,\n  footer,\n  header,\n  nav,\n  section', {
  display: 'block'
}), defineProperty(_unopinionatedRules, 'h1', {
  fontSize: '2em',
  margin: '0.67em 0'
}), defineProperty(_unopinionatedRules, 'figcaption,\n  figure,\n  main', {
  display: 'block'
}), defineProperty(_unopinionatedRules, 'figure', {
  margin: '1em 40px'
}), defineProperty(_unopinionatedRules, 'hr', {
  boxSizing: 'content-box',
  height: '0',
  overflow: 'visible'
}), defineProperty(_unopinionatedRules, 'pre', {
  fontFamily: 'monospace, monospace',
  fontSize: '1em'
}), defineProperty(_unopinionatedRules, 'a', {
  'background-color': 'transparent',
  '-webkit-text-decoration-skip': 'objects'
}), defineProperty(_unopinionatedRules, 'abbr[title]', defineProperty({
  borderBottom: 'none',
  textDecoration: 'underline'
}, 'textDecoration', 'underline dotted')), defineProperty(_unopinionatedRules, 'b,\n  strong', {
  fontWeight: 'inherit'
}), defineProperty(_unopinionatedRules, 'code,\n  kbd,\n  samp', {
  fontFamily: 'monospace, monospace',
  fontSize: '1em'
}), defineProperty(_unopinionatedRules, 'dfn', {
  fontStyle: 'italic'
}), defineProperty(_unopinionatedRules, 'mark', {
  backgroundColor: '#ff0',
  color: '#000'
}), defineProperty(_unopinionatedRules, 'small', {
  fontSize: '80%'
}), defineProperty(_unopinionatedRules, 'sub,\n  sup', {
  fontSize: '75%',
  lineHeight: '0',
  position: 'relative',
  verticalAlign: 'baseline'
}), defineProperty(_unopinionatedRules, 'sub', {
  bottom: '-0.25em'
}), defineProperty(_unopinionatedRules, 'sup', {
  top: '-0.5em'
}), defineProperty(_unopinionatedRules, 'audio,\n  video', {
  display: 'inline-block'
}), defineProperty(_unopinionatedRules, 'audio:not([controls])', {
  display: 'none',
  height: '0'
}), defineProperty(_unopinionatedRules, 'img', {
  borderStyle: 'none'
}), defineProperty(_unopinionatedRules, 'svg:not(:root)', {
  overflow: 'hidden'
}), defineProperty(_unopinionatedRules, 'button,\n  input,\n  optgroup,\n  select,\n  textarea', {
  margin: '0'
}), defineProperty(_unopinionatedRules, 'button,\n  input', {
  overflow: 'visible'
}), defineProperty(_unopinionatedRules, 'button,\n  select', {
  textTransform: 'none'
}), defineProperty(_unopinionatedRules, 'button,\n  html [type="button"],\n  [type="reset"],\n  [type="submit"]', {
  '-webkit-appearance': 'button'
}), defineProperty(_unopinionatedRules, 'button::-moz-focus-inner,\n  [type="button"]::-moz-focus-inner,\n  [type="reset"]::-moz-focus-inner,\n  [type="submit"]::-moz-focus-inner', {
  borderStyle: 'none',
  padding: '0'
}), defineProperty(_unopinionatedRules, 'button:-moz-focusring,\n  [type="button"]:-moz-focusring,\n  [type="reset"]:-moz-focusring,\n  [type="submit"]:-moz-focusring', {
  outline: '1px dotted ButtonText'
}), defineProperty(_unopinionatedRules, 'fieldset', {
  border: '1px solid #c0c0c0',
  margin: '0 2px',
  padding: '0.35em 0.625em 0.75em'
}), defineProperty(_unopinionatedRules, 'legend', {
  boxSizing: 'border-box',
  color: 'inherit',
  display: 'table',
  maxWidth: '100%',
  padding: '0',
  whiteSpace: 'normal'
}), defineProperty(_unopinionatedRules, 'progress', {
  display: 'inline-block',
  verticalAlign: 'baseline'
}), defineProperty(_unopinionatedRules, 'textarea', {
  overflow: 'auto'
}), defineProperty(_unopinionatedRules, '[type="checkbox"],\n  [type="radio"]', {
  boxSizing: 'border-box',
  padding: '0'
}), defineProperty(_unopinionatedRules, '[type="number"]::-webkit-inner-spin-button,\n  [type="number"]::-webkit-outer-spin-button', {
  height: 'auto'
}), defineProperty(_unopinionatedRules, '[type="search"]', {
  '-webkit-appearance': 'textfield',
  outlineOffset: '-2px'
}), defineProperty(_unopinionatedRules, '[type="search"]::-webkit-search-cancel-button,\n  [type="search"]::-webkit-search-decoration', {
  '-webkit-appearance': 'none'
}), defineProperty(_unopinionatedRules, '::-webkit-file-upload-button', {
  '-webkit-appearance': 'button',
  font: 'inherit'
}), defineProperty(_unopinionatedRules, 'details,\n  menu', {
  display: 'block'
}), defineProperty(_unopinionatedRules, 'summary', {
  display: 'list-item'
}), defineProperty(_unopinionatedRules, 'canvas', {
  display: 'inline-block'
}), defineProperty(_unopinionatedRules, 'template', {
  display: 'none'
}), defineProperty(_unopinionatedRules, '[hidden]', {
  display: 'none'
}), _unopinionatedRules);

function mergeRules(baseRules, additionalRules) {
  var mergedRules = _extends({}, baseRules);
  Object.keys(additionalRules).forEach(function (key) {
    if (mergedRules[key]) {
      mergedRules[key] = _extends({}, mergedRules[key], additionalRules[key]);
    } else {
      mergedRules[key] = _extends({}, additionalRules[key]);
    }
  });
  return mergedRules;
}

/**
 * CSS to normalize abnormalities across browsers (normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css)
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *    ...normalize(),
 * }
 *
 * // styled-components usage
 * injectGlobal`${normalize()}`
 *
 * // CSS as JS Output
 *
 * html {
 *   fontFamily: 'sans-serif',
 *   lineHeight: 1.15,
 *   textSizeAdjust: 100%,
 * } ...
 */
function normalize(excludeOpinionated) {
  if (excludeOpinionated) return unopinionatedRules;
  return mergeRules(unopinionatedRules, opinionatedRules);
}

//      

/**
 * CSS to style the selection psuedo-element.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...placeholder({'color': 'blue'})
 * }
 *
 * // styled-components usage
 * const div = styled.input`
 *    ${placeholder({'color': 'blue'})}
 * `
 *
 * // CSS as JS Output
 *
 * 'input': {
 *   '&:-moz-placeholder': {
 *     'color': 'blue',
 *   },
 *   '&:-ms-input-placeholder': {
 *     'color': 'blue',
 *   },
 *   '&::-moz-placeholder': {
 *     'color': 'blue',
 *   },
 *   '&::-webkit-input-placeholder': {
 *     'color': 'blue',
 *   },
 * },
 */

function placeholder(styles) {
  var _ref;

  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '&';

  return _ref = {}, defineProperty(_ref, parent + '::-webkit-input-placeholder', _extends({}, styles)), defineProperty(_ref, parent + ':-moz-placeholder', _extends({}, styles)), defineProperty(_ref, parent + '::-moz-placeholder', _extends({}, styles)), defineProperty(_ref, parent + ':-ms-input-placeholder', _extends({}, styles)), _ref;
}

var _templateObject = taggedTemplateLiteral(['radial-gradient(', '', '', '', ')'], ['radial-gradient(', '', '', '', ')']);

//      

/** */

function parseFallback(colorStops) {
  return colorStops[0].split(' ')[0];
}

function constructGradientValue(literals) {
  var template = '';
  for (var i = 0; i < literals.length; i += 1) {
    template += literals[i];
    // Adds leading coma if properties preceed color-stops
    if (i === 3 && (arguments.length <= i + 1 ? undefined : arguments[i + 1]) && ((arguments.length <= 1 ? undefined : arguments[1]) || (arguments.length <= 2 ? undefined : arguments[2]) || (arguments.length <= 3 ? undefined : arguments[3]))) {
      template = template.slice(0, -1);
      template += ', ' + (arguments.length <= i + 1 ? undefined : arguments[i + 1]);
      // No trailing space if color-stops is the only param provided
    } else if (i === 3 && (arguments.length <= i + 1 ? undefined : arguments[i + 1]) && !(arguments.length <= 1 ? undefined : arguments[1]) && !(arguments.length <= 2 ? undefined : arguments[2]) && !(arguments.length <= 3 ? undefined : arguments[3])) {
      template += '' + (arguments.length <= i + 1 ? undefined : arguments[i + 1]);
      // Only adds substitution if it is defined
    } else if (arguments.length <= i + 1 ? undefined : arguments[i + 1]) {
      template += (arguments.length <= i + 1 ? undefined : arguments[i + 1]) + ' ';
    }
  }
  return template.trim();
}

/**
 * CSS for declaring a radial gradient, including a fallback background-color. The fallback is either the first color-stop or an explicitly passed fallback color.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...radialGradient({
 *     colorStops: ['#00FFFF 0%', 'rgba(0, 0, 255, 0) 50%', '#0000FF 95%'],
 *     extent: 'farthest-corner at 45px 45px',
 *     position: 'center',
 *     shape: 'ellipse',
 *   })
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${radialGradient({
 *     colorStops: ['#00FFFF 0%', 'rgba(0, 0, 255, 0) 50%', '#0000FF 95%'],
 *     extent: 'farthest-corner at 45px 45px',
 *     position: 'center',
 *     shape: 'ellipse',
 *   })}
 *`
 *
 * // CSS as JS Output
 *
 * div: {
 *   'backgroundColor': '#00FFFF',
 *   'backgroundImage': 'radial-gradient(center ellipse farthest-corner at 45px 45px, #00FFFF 0%, rgba(0, 0, 255, 0) 50%, #0000FF 95%)',
 * }
 */

function radialGradient(_ref) {
  var colorStops = _ref.colorStops,
      extent = _ref.extent,
      fallback = _ref.fallback,
      position = _ref.position,
      shape = _ref.shape;

  if (!colorStops || colorStops.length < 2) {
    throw new Error('radialGradient requries at least 2 color-stops to properly render.');
  }
  return {
    backgroundColor: fallback || parseFallback(colorStops),
    backgroundImage: constructGradientValue(_templateObject, position, shape, extent, colorStops.join(', '))
  };
}

//      

/**
 * A helper to generate a retina background image and non-retina
 * background image. The retina background image will output to a HiDPI media query. The mixin uses
 * a _2x.png filename suffix by default.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *  ...retinaImage('my-img')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${retinaImage('my-img')}
 * `
 *
 * // CSS as JS Output
 * div {
 *   backgroundImage: 'url(my-img.png)',
 *   '@media only screen and (-webkit-min-device-pixel-ratio: 1.3),
 *    only screen and (min--moz-device-pixel-ratio: 1.3),
 *    only screen and (-o-min-device-pixel-ratio: 1.3/1),
 *    only screen and (min-resolution: 144dpi),
 *    only screen and (min-resolution: 1.5dppx)': {
 *     backgroundImage: 'url(my-img_2x.png)',
 *   }
 * }
 */
function retinaImage(filename, backgroundSize) {
  var extension = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'png';
  var retinaFilename = arguments[3];
  var retinaSuffix = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '_2x';

  if (!filename) {
    throw new Error('Please supply a filename to retinaImage() as the first argument.');
  }
  // Replace the dot at the beginning of the passed extension if one exists
  var ext = extension.replace(/^\./, '');
  var rFilename = retinaFilename ? retinaFilename + '.' + ext : '' + filename + retinaSuffix + '.' + ext;

  return defineProperty({
    backgroundImage: 'url(' + filename + '.' + ext + ')'
  }, hiDPI(), {
    backgroundImage: 'url(' + rFilename + ')',
    backgroundSize: backgroundSize
  });
}

//      

/**
 * CSS to style the selection psuedo-element.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...selection({
 *     'backgroundColor': 'blue'
 *   }, 'section')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${selection({'backgroundColor': 'blue'}, 'section')}
 * `
 *
 * // CSS as JS Output
 *
 * 'div': {
 *   'section::-moz-selection': {
 *     'backgroundColor':'blue',
 *   },
 *   'section::selection': {
 *     'backgroundColor': 'blue',
 *   }
 * }
 */

function selection(styles) {
  var _ref;

  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  return _ref = {}, defineProperty(_ref, parent + '::-moz-selection', _extends({}, styles)), defineProperty(_ref, parent + '::selection', _extends({}, styles)), _ref;
}

//      

/* eslint-disable key-spacing */
var functionsMap = {
  easeInBack: 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
  easeInCirc: 'cubic-bezier(0.600,  0.040, 0.980, 0.335)',
  easeInCubic: 'cubic-bezier(0.550,  0.055, 0.675, 0.190)',
  easeInExpo: 'cubic-bezier(0.950,  0.050, 0.795, 0.035)',
  easeInQuad: 'cubic-bezier(0.550,  0.085, 0.680, 0.530)',
  easeInQuart: 'cubic-bezier(0.895,  0.030, 0.685, 0.220)',
  easeInQuint: 'cubic-bezier(0.755,  0.050, 0.855, 0.060)',
  easeInSine: 'cubic-bezier(0.470,  0.000, 0.745, 0.715)',

  easeOutBack: 'cubic-bezier(0.175,  0.885, 0.320, 1.275)',
  easeOutCubic: 'cubic-bezier(0.215,  0.610, 0.355, 1.000)',
  easeOutCirc: 'cubic-bezier(0.075,  0.820, 0.165, 1.000)',
  easeOutExpo: 'cubic-bezier(0.190,  1.000, 0.220, 1.000)',
  easeOutQuad: 'cubic-bezier(0.250,  0.460, 0.450, 0.940)',
  easeOutQuart: 'cubic-bezier(0.165,  0.840, 0.440, 1.000)',
  easeOutQuint: 'cubic-bezier(0.230,  1.000, 0.320, 1.000)',
  easeOutSine: 'cubic-bezier(0.390,  0.575, 0.565, 1.000)',

  easeInOutBack: 'cubic-bezier(0.680, -0.550, 0.265, 1.550)',
  easeInOutCirc: 'cubic-bezier(0.785,  0.135, 0.150, 0.860)',
  easeInOutCubic: 'cubic-bezier(0.645,  0.045, 0.355, 1.000)',
  easeInOutExpo: 'cubic-bezier(1.000,  0.000, 0.000, 1.000)',
  easeInOutQuad: 'cubic-bezier(0.455,  0.030, 0.515, 0.955)',
  easeInOutQuart: 'cubic-bezier(0.770,  0.000, 0.175, 1.000)',
  easeInOutQuint: 'cubic-bezier(0.860,  0.000, 0.070, 1.000)',
  easeInOutSine: 'cubic-bezier(0.445,  0.050, 0.550, 0.950)'
};
/* eslint-enable key-spacing */

/** */

/**
 * String to represent common easing functions as demonstrated here: (github.com/jaukia/easie).
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   'transitionTimingFunction': timingFunctions('easeInQuad')
 * }
 *
 * // styled-components usage
 *  const div = styled.div`
 *   transitionTimingFunction: ${timingFunctions('easeInQuad')};
 * `
 *
 * // CSS as JS Output
 *
 * 'div': {
 *   'transitionTimingFunction': 'cubic-bezier(0.550,  0.085, 0.680, 0.530)',
 * }
 */

function timingFunctions(timingFunction) {
  return functionsMap[timingFunction];
}

//      

/** */

var getBorderWidth = function getBorderWidth(pointingDirection, height, width) {
  switch (pointingDirection) {
    case 'top':
      return '0 ' + width / 2 + 'px ' + height + 'px ' + width / 2 + 'px';
    case 'left':
      return height / 2 + 'px ' + width + 'px ' + height / 2 + 'px 0';
    case 'bottom':
      return height + 'px ' + width / 2 + 'px 0 ' + width / 2 + 'px';
    case 'right':
      return height / 2 + 'px 0 ' + height / 2 + 'px ' + width + 'px';

    default:
      throw new Error("Passed invalid argument to triangle, please pass correct poitingDirection e.g. 'right'.");
  }
};

// needed for border-color
var reverseDirection = {
  left: 'Right',
  right: 'Left',
  top: 'Bottom',
  bottom: 'Top'
};

/**
 * CSS to represent triangle with any pointing direction with an optional background color. Accepts number or px values for height and width.
 *
 * @example
 * // Styles as object usage
 *
 * const styles = {
 *   ...triangle({ pointingDirection: 'right', width: '100px', height: '100px', foregroundColor: 'red' })
 * }
 *
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${triangle({ pointingDirection: 'right', width: '100px', height: '100px', foregroundColor: 'red' })}
 *
 *
 * // CSS as JS Output
 *
 * div: {
 *  'borderColor': 'transparent',
 *  'borderLeftColor': 'red !important',
 *  'borderStyle': 'solid',
 *  'borderWidth': '50px 0 50px 100px',
 *  'height': '0',
 *  'width': '0',
 * }
 */

function triangle(_ref) {
  var pointingDirection = _ref.pointingDirection,
      height = _ref.height,
      width = _ref.width,
      foregroundColor = _ref.foregroundColor,
      _ref$backgroundColor = _ref.backgroundColor,
      backgroundColor = _ref$backgroundColor === undefined ? 'transparent' : _ref$backgroundColor;

  var unitlessHeight = parseFloat(height);
  var unitlessWidth = parseFloat(width);
  if (isNaN(unitlessHeight) || isNaN(unitlessWidth)) {
    throw new Error('Passed an invalid value to `height` or `width`. Please provide a pixel based unit');
  }

  return defineProperty({
    borderColor: backgroundColor,
    width: '0',
    height: '0',
    borderWidth: getBorderWidth(pointingDirection, unitlessHeight, unitlessWidth),
    borderStyle: 'solid'
  }, 'border' + reverseDirection[pointingDirection] + 'Color', foregroundColor + ' !important');
}

//      

/**
 * Provides an easy way to change the `wordWrap` property.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...wordWrap('break-word')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${wordWrap('break-word')}
 * `
 *
 * // CSS as JS Output
 *
 * const styles = {
 *   overflowWrap: 'break-word',
 *   wordWrap: 'break-word',
 *   wordBreak: 'break-all',
 * }
 */

function wordWrap() {
  var wrap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'break-word';

  var wordBreak = wrap === 'break-word' ? 'break-all' : wrap;
  return {
    overflowWrap: wrap,
    wordWrap: wrap,
    wordBreak: wordBreak
  };
}

//      


function colorToInt(color) {
  return Math.round(color * 255);
}

function convertToInt(red, green, blue) {
  return colorToInt(red) + "," + colorToInt(green) + "," + colorToInt(blue);
}

function hslToRgb(hue, saturation, lightness) {
  var convert = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : convertToInt;

  if (saturation === 0) {
    // achromatic
    return convert(lightness, lightness, lightness);
  }

  // formular from https://en.wikipedia.org/wiki/HSL_and_HSV
  var huePrime = hue % 360 / 60;
  var chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  var secondComponent = chroma * (1 - Math.abs(huePrime % 2 - 1));

  var red = 0;
  var green = 0;
  var blue = 0;

  if (huePrime >= 0 && huePrime < 1) {
    red = chroma;
    green = secondComponent;
  } else if (huePrime >= 1 && huePrime < 2) {
    red = secondComponent;
    green = chroma;
  } else if (huePrime >= 2 && huePrime < 3) {
    green = chroma;
    blue = secondComponent;
  } else if (huePrime >= 3 && huePrime < 4) {
    green = secondComponent;
    blue = chroma;
  } else if (huePrime >= 4 && huePrime < 5) {
    red = secondComponent;
    blue = chroma;
  } else if (huePrime >= 5 && huePrime < 6) {
    red = chroma;
    blue = secondComponent;
  }

  var lightnessModification = lightness - chroma / 2;
  var finalRed = red + lightnessModification;
  var finalGreen = green + lightnessModification;
  var finalBlue = blue + lightnessModification;
  return convert(finalRed, finalGreen, finalBlue);
}

//      
var namedColorMap = {
  aliceblue: 'f0f8ff',
  antiquewhite: 'faebd7',
  aqua: '00ffff',
  aquamarine: '7fffd4',
  azure: 'f0ffff',
  beige: 'f5f5dc',
  bisque: 'ffe4c4',
  black: '000',
  blanchedalmond: 'ffebcd',
  blue: '0000ff',
  blueviolet: '8a2be2',
  brown: 'a52a2a',
  burlywood: 'deb887',
  cadetblue: '5f9ea0',
  chartreuse: '7fff00',
  chocolate: 'd2691e',
  coral: 'ff7f50',
  cornflowerblue: '6495ed',
  cornsilk: 'fff8dc',
  crimson: 'dc143c',
  cyan: '00ffff',
  darkblue: '00008b',
  darkcyan: '008b8b',
  darkgoldenrod: 'b8860b',
  darkgray: 'a9a9a9',
  darkgreen: '006400',
  darkgrey: 'a9a9a9',
  darkkhaki: 'bdb76b',
  darkmagenta: '8b008b',
  darkolivegreen: '556b2f',
  darkorange: 'ff8c00',
  darkorchid: '9932cc',
  darkred: '8b0000',
  darksalmon: 'e9967a',
  darkseagreen: '8fbc8f',
  darkslateblue: '483d8b',
  darkslategray: '2f4f4f',
  darkslategrey: '2f4f4f',
  darkturquoise: '00ced1',
  darkviolet: '9400d3',
  deeppink: 'ff1493',
  deepskyblue: '00bfff',
  dimgray: '696969',
  dimgrey: '696969',
  dodgerblue: '1e90ff',
  firebrick: 'b22222',
  floralwhite: 'fffaf0',
  forestgreen: '228b22',
  fuchsia: 'ff00ff',
  gainsboro: 'dcdcdc',
  ghostwhite: 'f8f8ff',
  gold: 'ffd700',
  goldenrod: 'daa520',
  gray: '808080',
  green: '008000',
  greenyellow: 'adff2f',
  grey: '808080',
  honeydew: 'f0fff0',
  hotpink: 'ff69b4',
  indianred: 'cd5c5c',
  indigo: '4b0082',
  ivory: 'fffff0',
  khaki: 'f0e68c',
  lavender: 'e6e6fa',
  lavenderblush: 'fff0f5',
  lawngreen: '7cfc00',
  lemonchiffon: 'fffacd',
  lightblue: 'add8e6',
  lightcoral: 'f08080',
  lightcyan: 'e0ffff',
  lightgoldenrodyellow: 'fafad2',
  lightgray: 'd3d3d3',
  lightgreen: '90ee90',
  lightgrey: 'd3d3d3',
  lightpink: 'ffb6c1',
  lightsalmon: 'ffa07a',
  lightseagreen: '20b2aa',
  lightskyblue: '87cefa',
  lightslategray: '789',
  lightslategrey: '789',
  lightsteelblue: 'b0c4de',
  lightyellow: 'ffffe0',
  lime: '0f0',
  limegreen: '32cd32',
  linen: 'faf0e6',
  magenta: 'f0f',
  maroon: '800000',
  mediumaquamarine: '66cdaa',
  mediumblue: '0000cd',
  mediumorchid: 'ba55d3',
  mediumpurple: '9370db',
  mediumseagreen: '3cb371',
  mediumslateblue: '7b68ee',
  mediumspringgreen: '00fa9a',
  mediumturquoise: '48d1cc',
  mediumvioletred: 'c71585',
  midnightblue: '191970',
  mintcream: 'f5fffa',
  mistyrose: 'ffe4e1',
  moccasin: 'ffe4b5',
  navajowhite: 'ffdead',
  navy: '000080',
  oldlace: 'fdf5e6',
  olive: '808000',
  olivedrab: '6b8e23',
  orange: 'ffa500',
  orangered: 'ff4500',
  orchid: 'da70d6',
  palegoldenrod: 'eee8aa',
  palegreen: '98fb98',
  paleturquoise: 'afeeee',
  palevioletred: 'db7093',
  papayawhip: 'ffefd5',
  peachpuff: 'ffdab9',
  peru: 'cd853f',
  pink: 'ffc0cb',
  plum: 'dda0dd',
  powderblue: 'b0e0e6',
  purple: '800080',
  rebeccapurple: '639',
  red: 'f00',
  rosybrown: 'bc8f8f',
  royalblue: '4169e1',
  saddlebrown: '8b4513',
  salmon: 'fa8072',
  sandybrown: 'f4a460',
  seagreen: '2e8b57',
  seashell: 'fff5ee',
  sienna: 'a0522d',
  silver: 'c0c0c0',
  skyblue: '87ceeb',
  slateblue: '6a5acd',
  slategray: '708090',
  slategrey: '708090',
  snow: 'fffafa',
  springgreen: '00ff7f',
  steelblue: '4682b4',
  tan: 'd2b48c',
  teal: '008080',
  thistle: 'd8bfd8',
  tomato: 'ff6347',
  turquoise: '40e0d0',
  violet: 'ee82ee',
  wheat: 'f5deb3',
  white: 'fff',
  whitesmoke: 'f5f5f5',
  yellow: 'ff0',
  yellowgreen: '9acd32'
};

/**
 * Checks if a string is a CSS named color and returns its equivalent hex value, otherwise returns the original color.
 * @private
 */
function nameToHex(color) {
  if (typeof color !== 'string') return color;
  var normalizedColorName = color.toLowerCase();
  return namedColorMap[normalizedColorName] ? '#' + namedColorMap[normalizedColorName] : color;
}

//      
var hexRegex = /^#[a-fA-F0-9]{6}$/;
var reducedHexRegex = /^#[a-fA-F0-9]{3}$/;
var rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
var rgbaRegex = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([-+]?[0-9]*[.]?[0-9]+)\s*\)$/;
var hslRegex = /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;
var hslaRegex = /^hsla\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*([-+]?[0-9]*[.]?[0-9]+)\s*\)$/;

/**
 * Returns an RgbColor or RgbaColor object. This utility function is only useful
 * if want to extract a color component. With the color util `toColorString` you
 * can convert a RgbColor or RgbaColor object back to a string.
 *
 * @example
 * // Assigns `{ red: 255, green: 0, blue: 0 }` to color1
 * const color1 = 'rgb(255, 0, 0)';
 * // Assigns `{ red: 92, green: 102, blue: 112, alpha: 0.75 }` to color2
 * const color2 = 'hsla(210, 10%, 40%, 0.75)';
 */
function parseToRgb(color) {
  if (typeof color !== 'string') {
    throw new Error('Passed an incorrect argument to a color function, please pass a string representation of a color.');
  }
  var normalizedColor = nameToHex(color);
  if (normalizedColor.match(hexRegex)) {
    return {
      red: parseInt('' + normalizedColor[1] + normalizedColor[2], 16),
      green: parseInt('' + normalizedColor[3] + normalizedColor[4], 16),
      blue: parseInt('' + normalizedColor[5] + normalizedColor[6], 16)
    };
  }
  if (normalizedColor.match(reducedHexRegex)) {
    return {
      red: parseInt('' + normalizedColor[1] + normalizedColor[1], 16),
      green: parseInt('' + normalizedColor[2] + normalizedColor[2], 16),
      blue: parseInt('' + normalizedColor[3] + normalizedColor[3], 16)
    };
  }
  var rgbMatched = rgbRegex.exec(normalizedColor);
  if (rgbMatched) {
    return {
      red: parseInt('' + rgbMatched[1], 10),
      green: parseInt('' + rgbMatched[2], 10),
      blue: parseInt('' + rgbMatched[3], 10)
    };
  }
  var rgbaMatched = rgbaRegex.exec(normalizedColor);
  if (rgbaMatched) {
    return {
      red: parseInt('' + rgbaMatched[1], 10),
      green: parseInt('' + rgbaMatched[2], 10),
      blue: parseInt('' + rgbaMatched[3], 10),
      alpha: parseFloat('' + rgbaMatched[4])
    };
  }
  var hslMatched = hslRegex.exec(normalizedColor);
  if (hslMatched) {
    var hue = parseInt('' + hslMatched[1], 10);
    var saturation = parseInt('' + hslMatched[2], 10) / 100;
    var lightness = parseInt('' + hslMatched[3], 10) / 100;
    var rgbColorString = 'rgb(' + hslToRgb(hue, saturation, lightness) + ')';
    var hslRgbMatched = rgbRegex.exec(rgbColorString);
    return {
      red: parseInt('' + hslRgbMatched[1], 10),
      green: parseInt('' + hslRgbMatched[2], 10),
      blue: parseInt('' + hslRgbMatched[3], 10)
    };
  }
  var hslaMatched = hslaRegex.exec(normalizedColor);
  if (hslaMatched) {
    var _hue = parseInt('' + hslaMatched[1], 10);
    var _saturation = parseInt('' + hslaMatched[2], 10) / 100;
    var _lightness = parseInt('' + hslaMatched[3], 10) / 100;
    var _rgbColorString = 'rgb(' + hslToRgb(_hue, _saturation, _lightness) + ')';
    var _hslRgbMatched = rgbRegex.exec(_rgbColorString);
    return {
      red: parseInt('' + _hslRgbMatched[1], 10),
      green: parseInt('' + _hslRgbMatched[2], 10),
      blue: parseInt('' + _hslRgbMatched[3], 10),
      alpha: parseFloat('' + hslaMatched[4])
    };
  }
  throw new Error("Couldn't parse the color string. Please provide the color as a string in hex, rgb, rgba, hsl or hsla notation.");
}

//      


function rgbToHsl(color) {
  // make sure rgb are contained in a set of [0, 255]
  var red = color.red / 255;
  var green = color.green / 255;
  var blue = color.blue / 255;

  var max = Math.max(red, green, blue);
  var min = Math.min(red, green, blue);
  var lightness = (max + min) / 2;

  if (max === min) {
    // achromatic
    if (color.alpha !== undefined) {
      return { hue: 0, saturation: 0, lightness: lightness, alpha: color.alpha };
    } else {
      return { hue: 0, saturation: 0, lightness: lightness };
    }
  }

  var hue = void 0;
  var delta = max - min;
  var saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  switch (max) {
    case red:
      hue = (green - blue) / delta + (green < blue ? 6 : 0);
      break;
    case green:
      hue = (blue - red) / delta + 2;
      break;
    default:
      // blue case
      hue = (red - green) / delta + 4;
      break;
  }

  hue *= 60;
  if (color.alpha !== undefined) {
    return { hue: hue, saturation: saturation, lightness: lightness, alpha: color.alpha };
  }
  return { hue: hue, saturation: saturation, lightness: lightness };
}

//      

/**
 * Returns an HslColor or HslaColor object. This utility function is only useful
 * if want to extract a color component. With the color util `toColorString` you
 * can convert a HslColor or HslaColor object back to a string.
 *
 * @example
 * // Assigns `{ red: 255, green: 0, blue: 0 }` to color1
 * const color1 = 'rgb(255, 0, 0)';
 * // Assigns `{ red: 92, green: 102, blue: 112, alpha: 0.75 }` to color2
 * const color2 = 'hsla(210, 10%, 40%, 0.75)';
 */
function parseToHsl(color) {
  // Note: At a later stage we can optimize this function as right now a hsl
  // color would be parsed converted to rgb values and converted back to hsl.
  return rgbToHsl(parseToRgb(color));
}

//      

/**
 * Reduces hex values if possible e.g. #ff8866 to #f86
 * @private
 */
var reduceHexValue = function reduceHexValue(value) {
  if (value.length === 7 && value[1] === value[2] && value[3] === value[4] && value[5] === value[6]) {
    return "#" + value[1] + value[3] + value[5];
  }
  return value;
};

//      
function numberToHex(value) {
  var hex = value.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

//      

/**
 * Returns a string value for the color. The returned result is the smallest possible hex notation.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: rgb(255, 205, 100),
 *   background: rgb({ red: 255, green: 205, blue: 100 }),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${rgb(255, 205, 100)};
 *   background: ${rgb({ red: 255, green: 205, blue: 100 })};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#ffcd64";
 *   background: "#ffcd64";
 * }
 */
function rgb(value, green, blue) {
  if (typeof value === 'number' && typeof green === 'number' && typeof blue === 'number') {
    return reduceHexValue('#' + numberToHex(value) + numberToHex(green) + numberToHex(blue));
  } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && green === undefined && blue === undefined) {
    return reduceHexValue('#' + numberToHex(value.red) + numberToHex(value.green) + numberToHex(value.blue));
  }

  throw new Error('Passed invalid arguments to rgb, please pass multiple numbers e.g. rgb(255, 205, 100) or an object e.g. rgb({ red: 255, green: 205, blue: 100 }).');
}

//      

/**
 * Returns a string value for the color. The returned result is the smallest possible rgba or hex notation.
 *
 * Can also be used to fade a color by passing a hex value or named CSS color along with an alpha value.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: rgba(255, 205, 100, 0.7),
 *   background: rgba({ red: 255, green: 205, blue: 100, alpha: 0.7 }),
 *   background: rgba(255, 205, 100, 1),
 *   background: rgba('#ffffff', 0.4),
 *   background: rgba('black', 0.7),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${rgba(255, 205, 100, 0.7)};
 *   background: ${rgba({ red: 255, green: 205, blue: 100, alpha: 0.7 })};
 *   background: ${rgba(255, 205, 100, 1)};
 *   background: ${rgba('#ffffff', 0.4)};
 *   background: ${rgba('black', 0.7)};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "rgba(255,205,100,0.7)";
 *   background: "rgba(255,205,100,0.7)";
 *   background: "#ffcd64";
 *   background: "rgba(255,255,255,0.4)";
 *   background: "rgba(0,0,0,0.7)";
 * }
 */
function rgba(firstValue, secondValue, thirdValue, fourthValue) {
  if (typeof firstValue === 'string' && typeof secondValue === 'number') {
    var rgbValue = parseToRgb(firstValue);
    return 'rgba(' + rgbValue.red + ',' + rgbValue.green + ',' + rgbValue.blue + ',' + secondValue + ')';
  } else if (typeof firstValue === 'number' && typeof secondValue === 'number' && typeof thirdValue === 'number' && typeof fourthValue === 'number') {
    return fourthValue >= 1 ? rgb(firstValue, secondValue, thirdValue) : 'rgba(' + firstValue + ',' + secondValue + ',' + thirdValue + ',' + fourthValue + ')';
  } else if ((typeof firstValue === 'undefined' ? 'undefined' : _typeof(firstValue)) === 'object' && secondValue === undefined && thirdValue === undefined && fourthValue === undefined) {
    return firstValue.alpha >= 1 ? rgb(firstValue.red, firstValue.green, firstValue.blue) : 'rgba(' + firstValue.red + ',' + firstValue.green + ',' + firstValue.blue + ',' + firstValue.alpha + ')';
  }

  throw new Error('Passed invalid arguments to rgba, please pass multiple numbers e.g. rgb(255, 205, 100, 0.75) or an object e.g. rgb({ red: 255, green: 205, blue: 100, alpha: 0.75 }).');
}

//      
function colorToHex(color) {
  return numberToHex(Math.round(color * 255));
}

function convertToHex(red, green, blue) {
  return reduceHexValue('#' + colorToHex(red) + colorToHex(green) + colorToHex(blue));
}

function hslToHex(hue, saturation, lightness) {
  return hslToRgb(hue, saturation, lightness, convertToHex);
}

//      

/**
 * Returns a string value for the color. The returned result is the smallest possible hex notation.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: hsl(359, 0.75, 0.4),
 *   background: hsl({ hue: 360, saturation: 0.75, lightness: 0.4 }),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${hsl(359, 0.75, 0.4)};
 *   background: ${hsl({ hue: 360, saturation: 0.75, lightness: 0.4 })};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#b3191c";
 *   background: "#b3191c";
 * }
 */
function hsl(value, saturation, lightness) {
  if (typeof value === 'number' && typeof saturation === 'number' && typeof lightness === 'number') {
    return hslToHex(value, saturation, lightness);
  } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && saturation === undefined && lightness === undefined) {
    return hslToHex(value.hue, value.saturation, value.lightness);
  }

  throw new Error('Passed invalid arguments to hsl, please pass multiple numbers e.g. hsl(360, 0.75, 0.4) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75 }).');
}

//      

/**
 * Returns a string value for the color. The returned result is the smallest possible rgba or hex notation.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: hsla(359, 0.75, 0.4, 0.7),
 *   background: hsla({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0,7 }),
 *   background: hsla(359, 0.75, 0.4, 1),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${hsla(359, 0.75, 0.4, 0.7)};
 *   background: ${hsla({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0,7 })};
 *   background: ${hsla(359, 0.75, 0.4, 1)};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "rgba(179,25,28,0.7)";
 *   background: "rgba(179,25,28,0.7)";
 *   background: "#b3191c";
 * }
 */
function hsla(value, saturation, lightness, alpha) {
  if (typeof value === 'number' && typeof saturation === 'number' && typeof lightness === 'number' && typeof alpha === 'number') {
    return alpha >= 1 ? hslToHex(value, saturation, lightness) : 'rgba(' + hslToRgb(value, saturation, lightness) + ',' + alpha + ')';
  } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && saturation === undefined && lightness === undefined && alpha === undefined) {
    return value.alpha >= 1 ? hslToHex(value.hue, value.saturation, value.lightness) : 'rgba(' + hslToRgb(value.hue, value.saturation, value.lightness) + ',' + value.alpha + ')';
  }

  throw new Error('Passed invalid arguments to hsla, please pass multiple numbers e.g. hsl(360, 0.75, 0.4, 0.7) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75, alpha: 0.7 }).');
}

//      
var isRgb = function isRgb(color) {
  return typeof color.red === 'number' && typeof color.green === 'number' && typeof color.blue === 'number' && (typeof color.alpha !== 'number' || typeof color.alpha === 'undefined');
};

var isRgba = function isRgba(color) {
  return typeof color.red === 'number' && typeof color.green === 'number' && typeof color.blue === 'number' && typeof color.alpha === 'number';
};

var isHsl = function isHsl(color) {
  return typeof color.hue === 'number' && typeof color.saturation === 'number' && typeof color.lightness === 'number' && (typeof color.alpha !== 'number' || typeof color.alpha === 'undefined');
};

var isHsla = function isHsla(color) {
  return typeof color.hue === 'number' && typeof color.saturation === 'number' && typeof color.lightness === 'number' && typeof color.alpha === 'number';
};

var errMsg = 'Passed invalid argument to toColorString, please pass a RgbColor, RgbaColor, HslColor or HslaColor object.';

/**
 * Converts a RgbColor, RgbaColor, HslColor or HslaColor object to a color string.
 * This util is useful in case you only know on runtime which color object is
 * used. Otherwise we recommend to rely on `rgb`, `rgba`, `hsl` or `hsla`.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: toColorString({ red: 255, green: 205, blue: 100 }),
 *   background: toColorString({ red: 255, green: 205, blue: 100, alpha: 0.72 }),
 *   background: toColorString({ hue: 240, saturation: 1, lightness: 0.5 }),
 *   background: toColorString({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0.72 }),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${toColorString({ red: 255, green: 205, blue: 100 })};
 *   background: ${toColorString({ red: 255, green: 205, blue: 100, alpha: 0.72 })};
 *   background: ${toColorString({ hue: 240, saturation: 1, lightness: 0.5 })};
 *   background: ${toColorString({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0.72 })};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#ffcd64";
 *   background: "rgba(255,205,100,0.72)";
 *   background: "#00f";
 *   background: "rgba(179,25,25,0.72)";
 * }
 */

function toColorString(color) {
  if ((typeof color === 'undefined' ? 'undefined' : _typeof(color)) !== 'object') throw new Error(errMsg);
  if (isRgba(color)) return rgba(color);
  if (isRgb(color)) return rgb(color);
  if (isHsla(color)) return hsla(color);
  if (isHsl(color)) return hsl(color);

  throw new Error(errMsg);
}

//      

// Type definitions taken from https://github.com/gcanti/flow-static-land/blob/master/src/Fun.js


// eslint-disable-next-line no-unused-vars


// eslint-disable-next-line no-unused-vars

// eslint-disable-next-line no-redeclare


function curried(f, length, acc) {
  return function fn() {
    // eslint-disable-next-line prefer-rest-params
    var combined = acc.concat(Array.prototype.slice.call(arguments));
    return combined.length >= length ? f.apply(this, combined) : curried(f, length, combined);
  };
}

// eslint-disable-next-line no-redeclare
function curry(f) {
  // eslint-disable-line no-redeclare
  return curried(f, f.length, []);
}

//      

/**
 * Changes the hue of the color. Hue is a number between 0 to 360. The first
 * argument for adjustHue is the amount of degrees the color is rotated along
 * the color wheel.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: adjustHue(180, '#448'),
 *   background: adjustHue(180, 'rgba(101,100,205,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${adjustHue(180, '#448')};
 *   background: ${adjustHue(180, 'rgba(101,100,205,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#888844";
 *   background: "rgba(136,136,68,0.7)";
 * }
 */
function adjustHue(degree, color) {
  var hslColor = parseToHsl(color);
  return toColorString(_extends({}, hslColor, {
    hue: (hslColor.hue + degree) % 360
  }));
}

// Don’t inline this variable into export because Rollup will remove the /*#__PURE__*/ comment
var curriedAdjustHue = /*#__PURE__*/curry(adjustHue); // eslint-disable-line spaced-comment

//      

/**
 * Returns the complement of the provided color. This is identical to adjustHue(180, <color>).
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: complement('#448'),
 *   background: complement('rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${complement('#448')};
 *   background: ${complement('rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#884";
 *   background: "rgba(153,153,153,0.7)";
 * }
 */
function complement(color) {
  var hslColor = parseToHsl(color);
  return toColorString(_extends({}, hslColor, {
    hue: (hslColor.hue + 180) % 360
  }));
}

//      

function guard(lowerBoundary, upperBoundary, value) {
  return Math.max(lowerBoundary, Math.min(upperBoundary, value));
}

//      

/**
 * Returns a string value for the darkened color.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: darken(0.2, '#FFCD64'),
 *   background: darken(0.2, 'rgba(255,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${darken(0.2, '#FFCD64')};
 *   background: ${darken(0.2, 'rgba(255,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#ffbd31";
 *   background: "rgba(255,189,49,0.7)";
 * }
 */
function darken(amount, color) {
  var hslColor = parseToHsl(color);
  return toColorString(_extends({}, hslColor, {
    lightness: guard(0, 1, hslColor.lightness - amount)
  }));
}

// Don’t inline this variable into export because Rollup will remove the /*#__PURE__*/ comment
var curriedDarken = /*#__PURE__*/curry(darken); // eslint-disable-line spaced-comment

//      

/**
 * Decreases the intensity of a color. Its range is between 0 to 1. The first
 * argument of the desaturate function is the amount by how much the color
 * intensity should be decreased.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: desaturate(0.2, '#CCCD64'),
 *   background: desaturate(0.2, 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${desaturate(0.2, '#CCCD64')};
 *   background: ${desaturate(0.2, 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#b8b979";
 *   background: "rgba(184,185,121,0.7)";
 * }
 */
function desaturate(amount, color) {
  var hslColor = parseToHsl(color);
  return toColorString(_extends({}, hslColor, {
    saturation: guard(0, 1, hslColor.saturation - amount)
  }));
}

// Don’t inline this variable into export because Rollup will remove the /*#__PURE__*/ comment
var curriedDesaturate = /*#__PURE__*/curry(desaturate); // eslint-disable-line spaced-comment

//      
/**
 * Returns a number (float) representing the luminance of a color.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: getLuminance('#CCCD64') >= getLuminance('#0000ff') ? '#CCCD64' : '#0000ff',
 *   background: getLuminance('rgba(58, 133, 255, 1)') >= getLuminance('rgba(255, 57, 149, 1)') ?
 *                             'rgba(58, 133, 255, 1)' :
 *                             'rgba(255, 57, 149, 1)',
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${getLuminance('#CCCD64') >= getLuminance('#0000ff') ? '#CCCD64' : '#0000ff'};
 *   background: ${getLuminance('rgba(58, 133, 255, 1)') >= getLuminance('rgba(255, 57, 149, 1)') ?
 *                             'rgba(58, 133, 255, 1)' :
 *                             'rgba(255, 57, 149, 1)'};
 *
 * // CSS in JS Output
 *
 * div {
 *   background: "#CCCD64";
 *   background: "rgba(58, 133, 255, 1)";
 * }
 */
function getLuminance(color) {
  var rgbColor = parseToRgb(color);

  var _Object$keys$map = Object.keys(rgbColor).map(function (key) {
    var channel = rgbColor[key] / 255;
    return channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
  }),
      _Object$keys$map2 = slicedToArray(_Object$keys$map, 3),
      r = _Object$keys$map2[0],
      g = _Object$keys$map2[1],
      b = _Object$keys$map2[2];

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

//      

/**
 * Converts the color to a grayscale, by reducing its saturation to 0.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: grayscale('#CCCD64'),
 *   background: grayscale('rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${grayscale('#CCCD64')};
 *   background: ${grayscale('rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#999";
 *   background: "rgba(153,153,153,0.7)";
 * }
 */
function grayscale(color) {
  return toColorString(_extends({}, parseToHsl(color), {
    saturation: 0
  }));
}

//      

/**
 * Inverts the red, green and blue values of a color.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: invert('#CCCD64'),
 *   background: invert('rgba(101,100,205,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${invert('#CCCD64')};
 *   background: ${invert('rgba(101,100,205,0.7)')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#33329b";
 *   background: "rgba(154,155,50,0.7)";
 * }
 */
function invert(color) {
  // parse color string to rgb
  var value = parseToRgb(color);
  return toColorString(_extends({}, value, {
    red: 255 - value.red,
    green: 255 - value.green,
    blue: 255 - value.blue
  }));
}

//      

/**
 * Returns a string value for the lightened color.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: lighten(0.2, '#CCCD64'),
 *   background: lighten(0.2, 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${lighten(0.2, '#FFCD64')};
 *   background: ${lighten(0.2, 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#e5e6b1";
 *   background: "rgba(229,230,177,0.7)";
 * }
 */
function lighten(amount, color) {
  var hslColor = parseToHsl(color);
  return toColorString(_extends({}, hslColor, {
    lightness: guard(0, 1, hslColor.lightness + amount)
  }));
}

// Don’t inline this variable into export because Rollup will remove the /*#__PURE__*/ comment
var curriedLighten = /*#__PURE__*/curry(lighten); // eslint-disable-line spaced-comment

//      

/**
 * Mixes two colors together by calculating the average of each of the RGB components.
 *
 * By default the weight is 0.5 meaning that half of the first color and half the second
 * color should be used. Optionally the weight can be modified by providing a number
 * as the first argument. 0.25 means that a quarter of the first color and three quarters
 * of the second color should be used.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: mix(0.5, '#f00', '#00f')
 *   background: mix(0.25, '#f00', '#00f')
 *   background: mix(0.5, 'rgba(255, 0, 0, 0.5)', '#00f')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${mix(0.5, '#f00', '#00f')};
 *   background: ${mix(0.25, '#f00', '#00f')};
 *   background: ${mix(0.5, 'rgba(255, 0, 0, 0.5)', '#00f')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#7f007f";
 *   background: "#3f00bf";
 *   background: "rgba(63, 0, 191, 0.75)";
 * }
 */
function mix() {
  var weight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.5;
  var color = arguments[1];
  var otherColor = arguments[2];

  var parsedColor1 = parseToRgb(color);
  var color1 = _extends({}, parsedColor1, {
    alpha: typeof parsedColor1.alpha === 'number' ? parsedColor1.alpha : 1
  });

  var parsedColor2 = parseToRgb(otherColor);
  var color2 = _extends({}, parsedColor2, {
    alpha: typeof parsedColor2.alpha === 'number' ? parsedColor2.alpha : 1
  });

  // The formular is copied from the original Sass implementation:
  // http://sass-lang.com/documentation/Sass/Script/Functions.html#mix-instance_method
  var alphaDelta = color1.alpha - color2.alpha;
  var x = weight * 2 - 1;
  var y = x * alphaDelta === -1 ? x : x + alphaDelta;
  var z = 1 + x * alphaDelta;
  var weight1 = (y / z + 1) / 2.0;
  var weight2 = 1 - weight1;

  var mixedColor = {
    red: Math.floor(color1.red * weight1 + color2.red * weight2),
    green: Math.floor(color1.green * weight1 + color2.green * weight2),
    blue: Math.floor(color1.blue * weight1 + color2.blue * weight2),
    alpha: color1.alpha + (color2.alpha - color1.alpha) * (weight / 1.0)
  };

  return rgba(mixedColor);
}

// Don’t inline this variable into export because Rollup will remove the /*#__PURE__*/ comment
var curriedMix = /*#__PURE__*/curry(mix); // eslint-disable-line spaced-comment

//      
/**
 * Increases the opacity of a color. Its range for the amount is between 0 to 1.
 *
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: opacify(0.1, 'rgba(255, 255, 255, 0.9)');
 *   background: opacify(0.2, 'hsla(0, 0%, 100%, 0.5)'),
 *   background: opacify(0.5, 'rgba(255, 0, 0, 0.2)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${opacify(0.1, 'rgba(255, 255, 255, 0.9)')};
 *   background: ${opacify(0.2, 'hsla(0, 0%, 100%, 0.5)')},
 *   background: ${opacify(0.5, 'rgba(255, 0, 0, 0.2)')},
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#fff";
 *   background: "rgba(255,255,255,0.7)";
 *   background: "rgba(255,0,0,0.7)";
 * }
 */
function opacify(amount, color) {
  var parsedColor = parseToRgb(color);
  var alpha = typeof parsedColor.alpha === 'number' ? parsedColor.alpha : 1;
  var colorWithAlpha = _extends({}, parsedColor, {
    alpha: guard(0, 1, (alpha * 100 + amount * 100) / 100)
  });
  return rgba(colorWithAlpha);
}

// Don’t inline this variable into export because Rollup will remove the /*#__PURE__*/ comment
var curriedOpacify = /*#__PURE__*/curry(opacify); // eslint-disable-line spaced-comment

//      
/**
 * Selects black or white for best contrast depending on the luminosity of the given color.
 * Follows W3C specs for readability at https://www.w3.org/TR/WCAG20-TECHS/G18.html
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   color: readableColor('#000'),
 *   color: readableColor('papayawhip'),
 *   color: readableColor('rgb(255,0,0)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   color: ${readableColor('#000')};
 *   color: ${readableColor('papayawhip')};
 *   color: ${readableColor('rgb(255,0,0)')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   color: "#fff";
 *   color: "#fff";
 *   color: "#000";
 * }
 */

function readableColor(color) {
  return getLuminance(color) > 0.179 ? '#000' : '#fff';
}

// Don’t inline this variable into export because Rollup will remove the /*#__PURE__*/ comment
var curriedReadableColor = /*#__PURE__*/curry(readableColor); // eslint-disable-line spaced-comment

//      

/**
 * Increases the intensity of a color. Its range is between 0 to 1. The first
 * argument of the saturate function is the amount by how much the color
 * intensity should be increased.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: saturate(0.2, '#CCCD64'),
 *   background: saturate(0.2, 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${saturate(0.2, '#FFCD64')};
 *   background: ${saturate(0.2, 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#e0e250";
 *   background: "rgba(224,226,80,0.7)";
 * }
 */
function saturate(amount, color) {
  var hslColor = parseToHsl(color);
  return toColorString(_extends({}, hslColor, {
    saturation: guard(0, 1, hslColor.saturation + amount)
  }));
}

// Don’t inline this variable into export because Rollup will remove the /*#__PURE__*/ comment
var curriedSaturate = /*#__PURE__*/curry(saturate); // eslint-disable-line spaced-comment

//      

/**
 * Sets the hue of a color to the provided value. The hue range can be
 * from 0 and 359.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: setHue(42, '#CCCD64'),
 *   background: setHue(244, 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${setHue(42, '#CCCD64')};
 *   background: ${setHue(244, 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#cdae64";
 *   background: "rgba(107,100,205,0.7)";
 * }
 */
function setHue(hue, color) {
  return toColorString(_extends({}, parseToHsl(color), {
    hue: hue
  }));
}

// Don’t inline this variable into export because Rollup will remove the /*#__PURE__*/ comment
var curriedSetHue = /*#__PURE__*/curry(setHue); // eslint-disable-line spaced-comment

//      

/**
 * Sets the lightness of a color to the provided value. The lightness range can be
 * from 0 and 1.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: setLightness(0.2, '#CCCD64'),
 *   background: setLightness(0.75, 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${setLightness(0.2, '#CCCD64')};
 *   background: ${setLightness(0.75, 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#4d4d19";
 *   background: "rgba(223,224,159,0.7)";
 * }
 */
function setLightness(lightness, color) {
  return toColorString(_extends({}, parseToHsl(color), {
    lightness: lightness
  }));
}

// Don’t inline this variable into export because Rollup will remove the /*#__PURE__*/ comment
var curriedSetLightness = /*#__PURE__*/curry(setLightness); // eslint-disable-line spaced-comment

//      

/**
 * Sets the saturation of a color to the provided value. The lightness range can be
 * from 0 and 1.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: setSaturation(0.2, '#CCCD64'),
 *   background: setSaturation(0.75, 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${setSaturation(0.2, '#CCCD64')};
 *   background: ${setSaturation(0.75, 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#adad84";
 *   background: "rgba(228,229,76,0.7)";
 * }
 */
function setSaturation(saturation, color) {
  return toColorString(_extends({}, parseToHsl(color), {
    saturation: saturation
  }));
}

// Don’t inline this variable into export because Rollup will remove the /*#__PURE__*/ comment
var curriedSetSaturation = /*#__PURE__*/curry(setSaturation); // eslint-disable-line spaced-comment

//      

/**
 * Shades a color by mixing it with black. `shade` can produce
 * hue shifts, where as `darken` manipulates the luminance channel and therefore
 * doesn't produce hue shifts.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: shade(0.25, '#00f')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${shade(0.25, '#00f')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#00003f";
 * }
 */

function shade(percentage, color) {
  if (typeof percentage !== 'number' || percentage > 1 || percentage < -1) {
    throw new Error('Passed an incorrect argument to shade, please pass a percentage less than or equal to 1 and larger than or equal to -1.');
  }
  if (typeof color !== 'string') {
    throw new Error('Passed an incorrect argument to a color function, please pass a string representation of a color.');
  }
  return curriedMix(percentage, color, 'rgb(0, 0, 0)');
}

// Don’t inline this variable into export because Rollup will remove the /*#__PURE__*/ comment
var curriedShade = /*#__PURE__*/curry(shade); // eslint-disable-line spaced-comment

//      

/**
 * Tints a color by mixing it with white. `tint` can produce
 * hue shifts, where as `lighten` manipulates the luminance channel and therefore
 * doesn't produce hue shifts.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: tint(0.25, '#00f')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${tint(0.25, '#00f')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#bfbfff";
 * }
 */

function tint(percentage, color) {
  if (typeof percentage !== 'number' || percentage > 1 || percentage < -1) {
    throw new Error('Passed an incorrect argument to tint, please pass a percentage less than or equal to 1 and larger than or equal to -1.');
  }
  if (typeof color !== 'string') {
    throw new Error('Passed an incorrect argument to a color function, please pass a string representation of a color.');
  }
  return curriedMix(percentage, color, 'rgb(255, 255, 255)');
}

// Don’t inline this variable into export because Rollup will remove the /*#__PURE__*/ comment
var curriedTint = /*#__PURE__*/curry(tint); // eslint-disable-line spaced-comment

//      
/**
 * Decreases the opacity of a color. Its range for the amount is between 0 to 1.
 *
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: transparentize(0.1, '#fff');
 *   background: transparentize(0.2, 'hsl(0, 0%, 100%)'),
 *   background: transparentize(0.5, 'rgba(255, 0, 0, 0.8)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${transparentize(0.1, '#fff')};
 *   background: ${transparentize(0.2, 'hsl(0, 0%, 100%)')},
 *   background: ${transparentize(0.5, 'rgba(255, 0, 0, 0.8)')},
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "rgba(255,255,255,0.9)";
 *   background: "rgba(255,255,255,0.8)";
 *   background: "rgba(255,0,0,0.3)";
 * }
 */
function transparentize(amount, color) {
  var parsedColor = parseToRgb(color);
  var alpha = typeof parsedColor.alpha === 'number' ? parsedColor.alpha : 1;
  var colorWithAlpha = _extends({}, parsedColor, {
    alpha: guard(0, 1, (alpha * 100 - amount * 100) / 100)
  });
  return rgba(colorWithAlpha);
}

// Don’t inline this variable into export because Rollup will remove the /*#__PURE__*/ comment
var curriedTransparentize = /*#__PURE__*/curry(transparentize); // eslint-disable-line spaced-comment

//      

/** */

/**
 * Shorthand for easily setting the animation property. Allows either multiple arrays with animations
 * or a single animation spread over the arguments.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...animation(['rotate', '1s', 'ease-in-out'], ['colorchange', '2s'])
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${animation(['rotate', '1s', 'ease-in-out'], ['colorchange', '2s'])}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'animation': 'rotate 1s ease-in-out, colorchange 2s'
 * }
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...animation('rotate', '1s', 'ease-in-out')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${animation('rotate', '1s', 'ease-in-out')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'animation': 'rotate 1s ease-in-out'
 * }
 */
function animation() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  // Allow single or multiple animations passed
  var multiMode = Array.isArray(args[0]);
  if (!multiMode && args.length > 8) {
    throw new Error('The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation');
  }
  var code = args.map(function (arg) {
    if (multiMode && !Array.isArray(arg) || !multiMode && Array.isArray(arg)) {
      throw new Error("To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])\nTo pass a single animation please supply them in simple values, e.g. animation('rotate', '2s')");
    }
    if (Array.isArray(arg) && arg.length > 8) {
      throw new Error('The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation');
    }

    return Array.isArray(arg) ? arg.join(' ') : arg;
  }).join(', ');

  return {
    animation: code
  };
}

//      

/**
 * Shorthand that accepts any number of backgroundImage values as parameters for creating a single background statement.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...backgroundImages('url("/image/background.jpg")', 'linear-gradient(red, green)')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${backgroundImages('url("/image/background.jpg")', 'linear-gradient(red, green)')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'backgroundImage': 'url("/image/background.jpg"), linear-gradient(red, green)'
 * }
 */

function backgroundImages() {
  for (var _len = arguments.length, properties = Array(_len), _key = 0; _key < _len; _key++) {
    properties[_key] = arguments[_key];
  }

  return {
    backgroundImage: properties.join(', ')
  };
}

//      

/**
 * Shorthand that accepts any number of background values as parameters for creating a single background statement.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...backgrounds('url("/image/background.jpg")', 'linear-gradient(red, green)', 'center no-repeat')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${backgrounds('url("/image/background.jpg")', 'linear-gradient(red, green)', 'center no-repeat')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'background': 'url("/image/background.jpg"), linear-gradient(red, green), center no-repeat'
 * }
 */
function backgrounds() {
  for (var _len = arguments.length, properties = Array(_len), _key = 0; _key < _len; _key++) {
    properties[_key] = arguments[_key];
  }

  return {
    background: properties.join(', ')
  };
}

//      
/**
 * Shorthand that accepts up to four values, including null to skip a value, and maps them to their respective directions.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...borderColor('red', 'green', 'blue', 'yellow')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${borderColor('red', 'green', 'blue', 'yellow')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'borderTopColor': 'red',
 *   'borderRightColor': 'green',
 *   'borderBottomColor': 'blue',
 *   'borderLeftColor': 'yellow'
 * }
 */

function borderColor() {
  for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  return directionalProperty.apply(undefined, ['borderColor'].concat(values));
}

//      
/**
 * Shorthand that accepts a value for side and a value for radius and applies the radius value to both corners of the side.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...borderRadius('top', '5px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${borderRadius('top', '5px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'borderTopRightRadius': '5px',
 *   'borderTopLeftRadius': '5px',
 * }
 */

function borderRadius(side, radius) {
  var uppercaseSide = capitalizeString(side);
  if (!radius || typeof radius !== 'string') {
    throw new Error('borderRadius expects a radius value as a string as the second argument.');
  }
  if (uppercaseSide === 'Top' || uppercaseSide === 'Bottom') {
    var _ref;

    return _ref = {}, defineProperty(_ref, 'border' + uppercaseSide + 'RightRadius', radius), defineProperty(_ref, 'border' + uppercaseSide + 'LeftRadius', radius), _ref;
  }

  if (uppercaseSide === 'Left' || uppercaseSide === 'Right') {
    var _ref2;

    return _ref2 = {}, defineProperty(_ref2, 'borderTop' + uppercaseSide + 'Radius', radius), defineProperty(_ref2, 'borderBottom' + uppercaseSide + 'Radius', radius), _ref2;
  }

  throw new Error('borderRadius expects one of "top", "bottom", "left" or "right" as the first argument.');
}

//      
/**
 * Shorthand that accepts up to four values, including null to skip a value, and maps them to their respective directions.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...borderStyle('solid', 'dashed', 'dotted', 'double')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${borderStyle('solid', 'dashed', 'dotted', 'double')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'borderTopStyle': 'solid',
 *   'borderRightStyle': 'dashed',
 *   'borderBottomStyle': 'dotted',
 *   'borderLeftStyle': 'double'
 * }
 */

function borderStyle() {
  for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  return directionalProperty.apply(undefined, ['borderStyle'].concat(values));
}

//      
/**
 * Shorthand that accepts up to four values, including null to skip a value, and maps them to their respective directions.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...borderWidth('12px', '24px', '36px', '48px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${borderWidth('12px', '24px', '36px', '48px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'borderTopWidth': '12px',
 *   'borderRightWidth': '24px',
 *   'borderBottomWidth': '36px',
 *   'borderLeftWidth': '48px'
 * }
 */
function borderWidth() {
  for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  return directionalProperty.apply(undefined, ['borderWidth'].concat(values));
}

//      


function generateSelectors(template, state) {
  var stateSuffix = state ? ':' + state : '';
  return template(stateSuffix);
}

/**
 * Function helper that adds an array of states to a template of selectors. Used in textInputs and buttons.
 * @private
 */
function statefulSelectors(states, template, stateMap) {
  if (!template) throw new Error('You must provide a template to this method.');
  if (states.length === 0) return generateSelectors(template, null);
  var selectors = [];
  for (var i = 0; i < states.length; i += 1) {
    if (stateMap && stateMap.indexOf(states[i]) < 0) {
      throw new Error('You passed an unsupported selector state to this method.');
    }
    selectors.push(generateSelectors(template, states[i]));
  }
  selectors = selectors.join(',');
  return selectors;
}

//      
var stateMap = [undefined, null, 'active', 'focus', 'hover'];

function template(state) {
  return 'button' + state + ',\n  input[type="button"]' + state + ',\n  input[type="reset"]' + state + ',\n  input[type="submit"]' + state;
}

/**
 * Populates selectors that target all buttons. You can pass optional states to append to the selectors.
 * @example
 * // Styles as object usage
 * const styles = {
 *   [buttons('active')]: {
 *     'border': 'none'
 *   }
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   > ${buttons('active')} {
 *     border: none;
 *   }
 * `
 *
 * // CSS in JS Output
 *
 *  'button:active,
 *  'input[type="button"]:active,
 *  'input[type=\"reset\"]:active,
 *  'input[type=\"submit\"]:active: {
 *   'border': 'none'
 * }
 */

function buttons() {
  for (var _len = arguments.length, states = Array(_len), _key = 0; _key < _len; _key++) {
    states[_key] = arguments[_key];
  }

  return statefulSelectors(states, template, stateMap);
}

//      
/**
 * Shorthand that accepts up to four values, including null to skip a value, and maps them to their respective directions.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...margin('12px', '24px', '36px', '48px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${margin('12px', '24px', '36px', '48px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'marginTop': '12px',
 *   'marginRight': '24px',
 *   'marginBottom': '36px',
 *   'marginLeft': '48px'
 * }
 */

function margin() {
  for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  return directionalProperty.apply(undefined, ['margin'].concat(values));
}

//      
/**
 * Shorthand that accepts up to four values, including null to skip a value, and maps them to their respective directions.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...padding('12px', '24px', '36px', '48px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${padding('12px', '24px', '36px', '48px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'paddingTop': '12px',
 *   'paddingRight': '24px',
 *   'paddingBottom': '36px',
 *   'paddingLeft': '48px'
 * }
 */

function padding() {
  for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  return directionalProperty.apply(undefined, ['padding'].concat(values));
}

//      
var positionMap$1 = ['absolute', 'fixed', 'relative', 'static', 'sticky'];

/**
 * Shorthand accepts up to five values, including null to skip a value, and maps them to their respective directions. The first value can optionally be a position keyword.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...position('12px', '24px', '36px', '48px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${position('12px', '24px', '36px', '48px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'top': '12px',
 *   'right': '24px',
 *   'bottom': '36px',
 *   'left': '48px'
 * }
 *
 * // Styles as object usage
 * const styles = {
 *   ...position('absolute', '12px', '24px', '36px', '48px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${position('absolute', '12px', '24px', '36px', '48px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'position': 'absolute',
 *   'top': '12px',
 *   'right': '24px',
 *   'bottom': '36px',
 *   'left': '48px'
 * }
 */

function position(positionKeyword) {
  for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }

  if (positionMap$1.indexOf(positionKeyword) >= 0) {
    return _extends({
      position: positionKeyword
    }, directionalProperty.apply(undefined, [''].concat(values)));
  } else {
    var firstValue = positionKeyword; // in this case position is actually the first value
    return directionalProperty.apply(undefined, ['', firstValue].concat(values));
  }
}

//      

/**
 * Shorthand to set the height and width properties in a single statement.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...size('300px', '250px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${size('300px', '250px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'height': '300px',
 *   'width': '250px',
 * }
 */

function size(height) {
  var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : height;

  return {
    height: height,
    width: width
  };
}

//      
var stateMap$1 = [undefined, null, 'active', 'focus', 'hover'];

function template$1(state) {
  return 'input[type="color"]' + state + ',\n    input[type="date"]' + state + ',\n    input[type="datetime"]' + state + ',\n    input[type="datetime-local"]' + state + ',\n    input[type="email"]' + state + ',\n    input[type="month"]' + state + ',\n    input[type="number"]' + state + ',\n    input[type="password"]' + state + ',\n    input[type="search"]' + state + ',\n    input[type="tel"]' + state + ',\n    input[type="text"]' + state + ',\n    input[type="time"]' + state + ',\n    input[type="url"]' + state + ',\n    input[type="week"]' + state + ',\n    input:not([type])' + state + ',\n    textarea' + state;
}

/**
 * Populates selectors that target all text inputs. You can pass optional states to append to the selectors.
 * @example
 * // Styles as object usage
 * const styles = {
 *   [textInputs('active')]: {
 *     'border': 'none'
 *   }
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   > ${textInputs('active')} {
 *     border: none;
 *   }
 * `
 *
 * // CSS in JS Output
 *
 *  'input[type="color"]:active,
 *  input[type="date"]:active,
 *  input[type="datetime"]:active,
 *  input[type="datetime-local"]:active,
 *  input[type="email"]:active,
 *  input[type="month"]:active,
 *  input[type="number"]:active,
 *  input[type="password"]:active,
 *  input[type="search"]:active,
 *  input[type="tel"]:active,
 *  input[type="text"]:active,
 *  input[type="time"]:active,
 *  input[type="url"]:active,
 *  input[type="week"]:active,
 *  input:not([type]):active,
 *  textarea:active': {
 *   'border': 'none'
 * }
 */

function textInputs() {
  for (var _len = arguments.length, states = Array(_len), _key = 0; _key < _len; _key++) {
    states[_key] = arguments[_key];
  }

  return statefulSelectors(states, template$1, stateMap$1);
}

//      

/**
 * Shorthand that accepts any number of transition values as parameters for creating a single transition statement.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...transitions('opacity 1.0s ease-in 0s', 'width 2.0s ease-in 2s')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${transitions('opacity 1.0s ease-in 0s', 'width 2.0s ease-in 2s')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'transition': 'opacity 1.0s ease-in 0s, width 2.0s ease-in 2s'
 * }
 */

function transitions() {
  for (var _len = arguments.length, properties = Array(_len), _key = 0; _key < _len; _key++) {
    properties[_key] = arguments[_key];
  }

  return {
    transition: properties.join(', ')
  };
}

//      
// Helpers
// Mixins
// Color
// Shorthands




/***/ })
/******/ ])));