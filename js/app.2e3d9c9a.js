/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded CSS chunks
/******/ 	var installedCssChunks = {
/******/ 		"app": 0
/******/ 	}
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "js/" + ({"about":"about","concepts":"concepts","organizations":"organizations","directory":"directory","crosswalk":"crosswalk","import":"import","organization":"organization","framework":"framework","conceptScheme":"conceptScheme","progressionModel":"progressionModel","configurationEditor":"configurationEditor","forbidden":"forbidden","internalError":"internalError","login":"login","pluginContainer":"pluginContainer","pluginManager":"pluginManager","sidenav":"sidenav","timeline":"timeline","topbar":"topbar","userGroupEditor":"userGroupEditor","welcome":"welcome"}[chunkId]||chunkId) + "." + {"about":"013ae778","chunk-08264f73":"8e3ac4a5","chunk-0e513d16":"1cc72cbe","chunk-22f5d1ea":"3185ec93","chunk-28a7ff35":"9ac65742","chunk-2d0a4fe9":"1fa405c1","chunk-2d0d5fe2":"191600db","chunk-576b8942":"ba75d35a","chunk-2d22bdc1":"7ea191cc","concepts":"49841e68","organizations":"ff552884","directory":"fdf3d67f","chunk-6a6fd63e":"7f7cf366","chunk-19b164da":"7b4e5d29","chunk-3f910c44":"d4abb6e7","chunk-e84f6006":"9abc41c6","crosswalk":"7a6516c6","import":"e3ab2fed","organization":"92846198","chunk-2d21ecda":"9a480e8e","framework":"2c5f6b96","conceptScheme":"426cf355","progressionModel":"135cd867","chunk-32471621":"3cb9e277","chunk-36a8ba44":"69631933","chunk-3c39b703":"3e0d39e7","chunk-43880ac8":"57eeba13","chunk-4a268576":"0f19b162","chunk-51c654a1":"4e74eb42","chunk-61b7344a":"461e64e6","chunk-2d0b2ce8":"49ec4659","configurationEditor":"c850c367","chunk-661fb5db":"07ac184f","chunk-693a040c":"f85c38b4","chunk-6e63f303":"872adbb0","chunk-719eeaef":"594f7507","chunk-789a5742":"73918bdc","chunk-af56af32":"e001274c","chunk-b37cb348":"74aee27a","chunk-b787821e":"dde9bfc9","chunk-db457718":"7a7efa5c","chunk-de13755a":"acb6f29f","forbidden":"3f0987b4","internalError":"7603a7da","login":"55177823","pluginContainer":"061ba918","pluginManager":"31fec04c","sidenav":"4844e257","timeline":"f6a33c72","topbar":"866f7347","userGroupEditor":"8eb0f2eb","welcome":"53b6a0e0","chunk-2d0cbec1":"e01bbf6e","chunk-4cac7b5b":"babfa88e","chunk-25a2af2a":"e0f4385b","chunk-693fd7e6":"5820bb73","chunk-dc2b4b7e":"a22193ec","chunk-4f51c21e":"6bff8c4a","chunk-74a95bb3":"107bd2ec","chunk-4a5f46a6":"cb0fd2a0","chunk-4cf587c0":"7b632abd","chunk-2d7adc52":"838bd86c","chunk-6b291276":"5758562b","chunk-9935ee3a":"95e7ab39","chunk-2d0ddf90":"190c0f6e","chunk-2d0dab46":"a84b6e47","chunk-c5459254":"ee1fdd3a","chunk-121818ce":"e40a562b","chunk-4f8e6938":"a6cb92ab","chunk-9dddac98":"8a20b325","chunk-2d0daac9":"e114d731","chunk-2d21eb37":"7a7a45ea"}[chunkId] + ".js"
/******/ 	}
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// mini-css-extract-plugin CSS loading
/******/ 		var cssChunks = {"chunk-08264f73":1,"chunk-0e513d16":1,"chunk-22f5d1ea":1,"chunk-28a7ff35":1,"chunk-576b8942":1,"concepts":1,"organizations":1,"directory":1,"chunk-6a6fd63e":1,"chunk-19b164da":1,"chunk-3f910c44":1,"chunk-e84f6006":1,"crosswalk":1,"import":1,"organization":1,"framework":1,"conceptScheme":1,"progressionModel":1,"chunk-32471621":1,"chunk-36a8ba44":1,"chunk-3c39b703":1,"chunk-43880ac8":1,"chunk-4a268576":1,"chunk-51c654a1":1,"chunk-61b7344a":1,"configurationEditor":1,"chunk-661fb5db":1,"chunk-693a040c":1,"chunk-6e63f303":1,"chunk-719eeaef":1,"chunk-789a5742":1,"chunk-af56af32":1,"chunk-b37cb348":1,"chunk-b787821e":1,"chunk-db457718":1,"chunk-de13755a":1,"forbidden":1,"internalError":1,"login":1,"pluginContainer":1,"pluginManager":1,"sidenav":1,"timeline":1,"userGroupEditor":1,"chunk-4cac7b5b":1,"chunk-25a2af2a":1,"chunk-693fd7e6":1,"chunk-dc2b4b7e":1,"chunk-4f51c21e":1,"chunk-4cf587c0":1,"chunk-2d7adc52":1,"chunk-9935ee3a":1,"chunk-c5459254":1,"chunk-121818ce":1,"chunk-4f8e6938":1,"chunk-9dddac98":1};
/******/ 		if(installedCssChunks[chunkId]) promises.push(installedCssChunks[chunkId]);
/******/ 		else if(installedCssChunks[chunkId] !== 0 && cssChunks[chunkId]) {
/******/ 			promises.push(installedCssChunks[chunkId] = new Promise(function(resolve, reject) {
/******/ 				var href = "css/" + ({"about":"about","concepts":"concepts","organizations":"organizations","directory":"directory","crosswalk":"crosswalk","import":"import","organization":"organization","framework":"framework","conceptScheme":"conceptScheme","progressionModel":"progressionModel","configurationEditor":"configurationEditor","forbidden":"forbidden","internalError":"internalError","login":"login","pluginContainer":"pluginContainer","pluginManager":"pluginManager","sidenav":"sidenav","timeline":"timeline","topbar":"topbar","userGroupEditor":"userGroupEditor","welcome":"welcome"}[chunkId]||chunkId) + "." + {"about":"31d6cfe0","chunk-08264f73":"60471a70","chunk-0e513d16":"6fe35a3d","chunk-22f5d1ea":"60471a70","chunk-28a7ff35":"60471a70","chunk-2d0a4fe9":"31d6cfe0","chunk-2d0d5fe2":"31d6cfe0","chunk-576b8942":"cebd8586","chunk-2d22bdc1":"31d6cfe0","concepts":"223c9419","organizations":"1d9c1cec","directory":"70098fbc","chunk-6a6fd63e":"d8e69eab","chunk-19b164da":"2c043d12","chunk-3f910c44":"d652b43a","chunk-e84f6006":"bb359785","crosswalk":"b12a891a","import":"91080966","organization":"2f85a467","chunk-2d21ecda":"31d6cfe0","framework":"68516d6d","conceptScheme":"75a8af1c","progressionModel":"75a8af1c","chunk-32471621":"60471a70","chunk-36a8ba44":"60471a70","chunk-3c39b703":"60471a70","chunk-43880ac8":"60471a70","chunk-4a268576":"60471a70","chunk-51c654a1":"daa4e784","chunk-61b7344a":"d0a47e88","chunk-2d0b2ce8":"31d6cfe0","configurationEditor":"aa42073b","chunk-661fb5db":"60471a70","chunk-693a040c":"60471a70","chunk-6e63f303":"60471a70","chunk-719eeaef":"369d5d3a","chunk-789a5742":"60471a70","chunk-af56af32":"60471a70","chunk-b37cb348":"73ccae3d","chunk-b787821e":"60471a70","chunk-db457718":"60471a70","chunk-de13755a":"73ccae3d","forbidden":"1b0a0109","internalError":"7f0e233f","login":"be292f08","pluginContainer":"ae42be31","pluginManager":"7dbcc073","sidenav":"e0b4a456","timeline":"5ae6be9f","topbar":"31d6cfe0","userGroupEditor":"83fefc67","welcome":"31d6cfe0","chunk-2d0cbec1":"31d6cfe0","chunk-4cac7b5b":"a2bf2d06","chunk-25a2af2a":"60471a70","chunk-693fd7e6":"09db533f","chunk-dc2b4b7e":"60471a70","chunk-4f51c21e":"a478a2a2","chunk-74a95bb3":"31d6cfe0","chunk-4a5f46a6":"31d6cfe0","chunk-4cf587c0":"c8484769","chunk-2d7adc52":"cc85466d","chunk-6b291276":"31d6cfe0","chunk-9935ee3a":"4b09ece7","chunk-2d0ddf90":"31d6cfe0","chunk-2d0dab46":"31d6cfe0","chunk-c5459254":"6bbc8dd3","chunk-121818ce":"67586f64","chunk-4f8e6938":"c8484769","chunk-9dddac98":"c8484769","chunk-2d0daac9":"31d6cfe0","chunk-2d21eb37":"31d6cfe0"}[chunkId] + ".css";
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var existingLinkTags = document.getElementsByTagName("link");
/******/ 				for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 					var tag = existingLinkTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 					if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return resolve();
/******/ 				}
/******/ 				var existingStyleTags = document.getElementsByTagName("style");
/******/ 				for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 					var tag = existingStyleTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href");
/******/ 					if(dataHref === href || dataHref === fullhref) return resolve();
/******/ 				}
/******/ 				var linkTag = document.createElement("link");
/******/ 				linkTag.rel = "stylesheet";
/******/ 				linkTag.type = "text/css";
/******/ 				linkTag.onload = resolve;
/******/ 				linkTag.onerror = function(event) {
/******/ 					var request = event && event.target && event.target.src || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + request + ")");
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.request = request;
/******/ 					delete installedCssChunks[chunkId]
/******/ 					linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				};
/******/ 				linkTag.href = fullhref;
/******/
/******/ 				var head = document.getElementsByTagName("head")[0];
/******/ 				head.appendChild(linkTag);
/******/ 			}).then(function() {
/******/ 				installedCssChunks[chunkId] = 0;
/******/ 			}));
/******/ 		}
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([1,"chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("56d7");


/***/ }),

/***/ 10:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 11:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 12:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 13:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 14:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "3392":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"18a0cdb9-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modals/DynamicModal.vue?vue&type=template&id=704681ec
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_c(_vm.dynamicModal, {
    tag: "Component",
    attrs: {
      "title": _vm.title,
      "view": "modal",
      "content": _vm.dynamicModalContent
    },
    on: {
      "create-directory": function createDirectory($event) {
        return _vm.$emit('create-directory', $event);
      },
      "create-another-directory": function createAnotherDirectory($event) {
        return _vm.$emit('create-another-directory', $event);
      },
      "close": function close($event) {
        return _vm.$emit('app/closeModal');
      },
      "cancel": function cancel($event) {
        return _vm.$emit('app/closeModal');
      }
    }
  })], 1);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/modals/DynamicModal.vue?vue&type=template&id=704681ec

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__("3ca3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modals/DynamicModal.vue?vue&type=script&lang=js



/* harmony default export */ var DynamicModalvue_type_script_lang_js = ({
  name: 'DynamicModal',
  props: {
    type: {
      default: 'info',
      type: String
    },
    color: {
      default: 'white',
      type: String
    }
  },
  components: {
    'Share': function Share() {
      return __webpack_require__.e(/* import() */ "chunk-719eeaef").then(__webpack_require__.bind(null, "c24a"));
    },
    'MultiEdit': function MultiEdit() {
      return Promise.all(/* import() */[__webpack_require__.e("chunk-2d0a4fe9"), __webpack_require__.e("chunk-6a6fd63e"), __webpack_require__.e("chunk-2d0d5fe2"), __webpack_require__.e("chunk-576b8942"), __webpack_require__.e("chunk-3f910c44")]).then(__webpack_require__.bind(null, "71a9"));
    },
    'SearchModal': function SearchModal() {
      return Promise.all(/* import() */[__webpack_require__.e("chunk-2d0a4fe9"), __webpack_require__.e("chunk-6a6fd63e"), __webpack_require__.e("chunk-2d0d5fe2"), __webpack_require__.e("chunk-576b8942"), __webpack_require__.e("chunk-19b164da")]).then(__webpack_require__.bind(null, "fbde"));
    },
    'AddComment': function AddComment() {
      return __webpack_require__.e(/* import() */ "chunk-de13755a").then(__webpack_require__.bind(null, "8a30"));
    },
    'DeleteCommentConfirm': function DeleteCommentConfirm() {
      return __webpack_require__.e(/* import() */ "chunk-08264f73").then(__webpack_require__.bind(null, "4d6a"));
    },
    'DeleteDirectoryConfirm': function DeleteDirectoryConfirm() {
      return __webpack_require__.e(/* import() */ "chunk-b37cb348").then(__webpack_require__.bind(null, "5f07"));
    },
    'SupportedImportDetails': function SupportedImportDetails() {
      return __webpack_require__.e(/* import() */ "chunk-0e513d16").then(__webpack_require__.bind(null, "aaa3"));
    },
    'Single': function Single() {
      return Promise.all(/* import() */[__webpack_require__.e("chunk-2d0a4fe9"), __webpack_require__.e("chunk-6a6fd63e"), __webpack_require__.e("chunk-2d0d5fe2"), __webpack_require__.e("chunk-576b8942"), __webpack_require__.e("chunk-e84f6006")]).then(__webpack_require__.bind(null, "9765"));
    },
    'AddDirectory': function AddDirectory() {
      return __webpack_require__.e(/* import() */ "chunk-22f5d1ea").then(__webpack_require__.bind(null, "76c6"));
    },
    'DeleteConfigurationConfirm': function DeleteConfigurationConfirm() {
      return __webpack_require__.e(/* import() */ "chunk-6e63f303").then(__webpack_require__.bind(null, "b123"));
    },
    'FrameworkConfiguration': function FrameworkConfiguration() {
      return Promise.all(/* import() */[__webpack_require__.e("chunk-61b7344a"), __webpack_require__.e("chunk-2d0b2ce8")]).then(__webpack_require__.bind(null, "264b"));
    },
    'DeleteCompetencyConfirm': function DeleteCompetencyConfirm() {
      return __webpack_require__.e(/* import() */ "chunk-28a7ff35").then(__webpack_require__.bind(null, "b5c7"));
    },
    'DeleteFrameworkConfirm': function DeleteFrameworkConfirm() {
      return __webpack_require__.e(/* import() */ "chunk-32471621").then(__webpack_require__.bind(null, "c4df"));
    },
    'DeleteLevelConfirm': function DeleteLevelConfirm() {
      return __webpack_require__.e(/* import() */ "chunk-af56af32").then(__webpack_require__.bind(null, "9d8f"));
    },
    'DeleteConceptConfirm': function DeleteConceptConfirm() {
      return __webpack_require__.e(/* import() */ "chunk-43880ac8").then(__webpack_require__.bind(null, "26bb"));
    },
    'DeleteConceptSchemeConfirm': function DeleteConceptSchemeConfirm() {
      return __webpack_require__.e(/* import() */ "chunk-789a5742").then(__webpack_require__.bind(null, "a6a6"));
    },
    'RemoveCompetencyConfirm': function RemoveCompetencyConfirm() {
      return __webpack_require__.e(/* import() */ "chunk-db457718").then(__webpack_require__.bind(null, "2d77"));
    },
    'ExportOptionsModal': function ExportOptionsModal() {
      return __webpack_require__.e(/* import() */ "chunk-661fb5db").then(__webpack_require__.bind(null, "03d5"));
    },
    'RequiredPropertyModal': function RequiredPropertyModal() {
      return __webpack_require__.e(/* import() */ "chunk-36a8ba44").then(__webpack_require__.bind(null, "1948"));
    },
    'DuplicateImport': function DuplicateImport() {
      return __webpack_require__.e(/* import() */ "chunk-4a268576").then(__webpack_require__.bind(null, "1a52"));
    },
    'ImportError': function ImportError() {
      return __webpack_require__.e(/* import() */ "chunk-693a040c").then(__webpack_require__.bind(null, "ef89"));
    },
    'ShareAssertions': function ShareAssertions() {
      return __webpack_require__.e(/* import() */ "chunk-51c654a1").then(__webpack_require__.bind(null, "4d343"));
    },
    'LogoutSuccess': function LogoutSuccess() {
      return __webpack_require__.e(/* import() */ "chunk-3c39b703").then(__webpack_require__.bind(null, "0dd5"));
    },
    'MessageOfTheDay': function MessageOfTheDay() {
      return __webpack_require__.e(/* import() */ "chunk-b787821e").then(__webpack_require__.bind(null, "1d06"));
    }
  },
  data: function data() {
    return {};
  },
  computed: {
    showModal: function showModal() {
      return this.$store.getters['app/showModal'];
    },
    dynamicModalContent: function dynamicModalContent() {
      if (this.showModal) {
        return this.$store.getters['app/dynamicModalContent'];
      } else {
        return {};
      }
    },
    dynamicModal: function dynamicModal() {
      if (this.dynamicModalContent) {
        return this.dynamicModalContent.component;
      } else {
        return '';
      }
    },
    title: function title() {
      if (this.dynamicModalContent && this.dynamicModalContent.title) {
        return this.dynamicModalContent.title;
      } else {
        return '';
      }
    }
  },
  watch: {}
});
// CONCATENATED MODULE: ./src/components/modals/DynamicModal.vue?vue&type=script&lang=js
 /* harmony default export */ var modals_DynamicModalvue_type_script_lang_js = (DynamicModalvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/modals/DynamicModal.vue?vue&type=style&index=0&id=704681ec&prod&lang=scss
var DynamicModalvue_type_style_index_0_id_704681ec_prod_lang_scss = __webpack_require__("532b");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/modals/DynamicModal.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  modals_DynamicModalvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var DynamicModal = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "3dfd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"18a0cdb9-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=414a336e
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    class: _vm.editorClass,
    attrs: {
      "id": "app"
    }
  }, [_vm.bannerMessage ? _c('div', {
    staticClass: "banner",
    style: _vm.bannerStyle
  }, [_c('span', [_vm._v(_vm._s(_vm.bannerMessage))])]) : _vm._e(), _c('DynamicModal', {
    on: {
      "create-directory": _vm.saveDirectory,
      "create-another-directory": _vm.saveDirectoryAndAddAnother
    }
  }), _c('router-view', {
    class: [{
      'clear-side-bar': _vm.showSideNav
    }, {
      'clear-narrow-side-bar': !_vm.showSideNav
    }, {
      'clear-right-aside': _vm.showRightAside
    }],
    on: {
      "create-new-framework": _vm.createNewFramework,
      "create-new-concept-scheme": _vm.createNewConceptScheme,
      "create-new-progression-model": _vm.createNewProgressionModel,
      "create-new-collection": _vm.createNewCollection
    }
  }), _c('router-view', {
    attrs: {
      "showSideNav": _vm.showSideNav,
      "name": "sidebar"
    },
    on: {
      "create-new-framework": _vm.createNewFramework,
      "create-new-concept-scheme": _vm.createNewConceptScheme,
      "create-new-progression-model": _vm.createNewProgressionModel,
      "create-new-collection": _vm.createNewCollection
    }
  }), _c('vue-progress-bar'), _vm.bannerMessage ? _c('div', {
    staticClass: "banner banner-bot",
    style: _vm.bannerStyle
  }, [_c('span', [_vm._v(_vm._s(_vm.bannerMessage))])]) : _vm._e()], 1);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/App.vue?vue&type=template&id=414a336e

// EXTERNAL MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=script&lang=js
var Appvue_type_script_lang_js = __webpack_require__("8533");

// CONCATENATED MODULE: ./src/App.vue?vue&type=script&lang=js
 /* harmony default export */ var src_Appvue_type_script_lang_js = (Appvue_type_script_lang_js["a" /* default */]); 
// EXTERNAL MODULE: ./src/App.vue?vue&type=style&index=0&id=414a336e&prod&lang=scss
var Appvue_type_style_index_0_id_414a336e_prod_lang_scss = __webpack_require__("5701");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/App.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_Appvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var App = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "41cb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d3b7");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("3ca3");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("ddb0");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("2b0e");
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("8c4f");








vue__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].use(vue_router__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]);
/* harmony default export */ __webpack_exports__["a"] = (new vue_router__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]({
  base: "",
  scrollBehavior: function scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash,
        offset: {
          x: 0,
          y: -100
        }
      };
    }
  },
  routes: [{
    path: '/',
    name: 'welcome',
    components: {
      default: function _default() {
        return __webpack_require__.e(/* import() | welcome */ "welcome").then(__webpack_require__.bind(null, "eec55"));
      },
      sidebar: function sidebar() {
        return __webpack_require__.e(/* import() | sidenav */ "sidenav").then(__webpack_require__.bind(null, "99b8"));
      },
      topbar: function topbar() {
        return __webpack_require__.e(/* import() | topbar */ "topbar").then(__webpack_require__.bind(null, "ddc0"));
      }
    },
    alias: '/cass-editor/'
  }, {
    path: '/frameworks',
    name: 'frameworks',
    components: {
      default: function _default() {
        return Promise.all(/* import() | frameworks */[__webpack_require__.e("chunk-2d0a4fe9"), __webpack_require__.e("chunk-2d0d5fe2"), __webpack_require__.e("chunk-576b8942"), __webpack_require__.e("chunk-2d22bdc1"), __webpack_require__.e("concepts")]).then(__webpack_require__.bind(null, "6791"));
      },
      sidebar: function sidebar() {
        return __webpack_require__.e(/* import() | sidenav */ "sidenav").then(__webpack_require__.bind(null, "99b8"));
      },
      topbar: function topbar() {
        return __webpack_require__.e(/* import() | topbar */ "topbar").then(__webpack_require__.bind(null, "ddc0"));
      }
    }
  }, {
    path: '/collections',
    name: 'collections',
    components: {
      default: function _default() {
        return Promise.all(/* import() | frameworks */[__webpack_require__.e("chunk-2d0a4fe9"), __webpack_require__.e("chunk-2d0d5fe2"), __webpack_require__.e("chunk-576b8942"), __webpack_require__.e("chunk-2d22bdc1"), __webpack_require__.e("concepts")]).then(__webpack_require__.bind(null, "6791"));
      },
      sidebar: function sidebar() {
        return __webpack_require__.e(/* import() | sidenav */ "sidenav").then(__webpack_require__.bind(null, "99b8"));
      },
      topbar: function topbar() {
        return __webpack_require__.e(/* import() | topbar */ "topbar").then(__webpack_require__.bind(null, "ddc0"));
      }
    }
  }, {
    path: '/concepts',
    name: 'concepts',
    components: {
      default: function _default() {
        return Promise.all(/* import() | concepts */[__webpack_require__.e("chunk-2d0a4fe9"), __webpack_require__.e("chunk-2d0d5fe2"), __webpack_require__.e("chunk-576b8942"), __webpack_require__.e("chunk-2d22bdc1"), __webpack_require__.e("concepts")]).then(__webpack_require__.bind(null, "6791"));
      },
      sidebar: function sidebar() {
        return __webpack_require__.e(/* import() | sidenav */ "sidenav").then(__webpack_require__.bind(null, "99b8"));
      },
      topbar: function topbar() {
        return __webpack_require__.e(/* import() | topbar */ "topbar").then(__webpack_require__.bind(null, "ddc0"));
      }
    }
  }, {
    path: '/progressionLevels',
    name: 'progressionLevels',
    components: {
      default: function _default() {
        return Promise.all(/* import() | progressionLevels */[__webpack_require__.e("chunk-2d0a4fe9"), __webpack_require__.e("chunk-2d0d5fe2"), __webpack_require__.e("chunk-576b8942"), __webpack_require__.e("chunk-2d22bdc1"), __webpack_require__.e("concepts")]).then(__webpack_require__.bind(null, "6791"));
      },
      sidebar: function sidebar() {
        return __webpack_require__.e(/* import() | sidenav */ "sidenav").then(__webpack_require__.bind(null, "99b8"));
      },
      topbar: function topbar() {
        return __webpack_require__.e(/* import() | topbar */ "topbar").then(__webpack_require__.bind(null, "ddc0"));
      }
    }
  }, {
    path: '/login',
    name: 'login',
    component: function component() {
      return __webpack_require__.e(/* import() | login */ "login").then(__webpack_require__.bind(null, "ede4"));
    }
  }, {
    path: '/legacyLogin',
    name: 'legacyLogin',
    component: function component() {
      return __webpack_require__.e(/* import() | login */ "login").then(__webpack_require__.bind(null, "d492"));
    }
  }, {
    path: '/createAccount',
    name: 'createAccount',
    component: function component() {
      return __webpack_require__.e(/* import() | login */ "login").then(__webpack_require__.bind(null, "50b5"));
    }
  }, {
    path: '/configuration',
    name: 'configuration',
    components: {
      default: function _default() {
        return Promise.all(/* import() | configurationEditor */[__webpack_require__.e("chunk-61b7344a"), __webpack_require__.e("configurationEditor")]).then(__webpack_require__.bind(null, "7bcc"));
      },
      sidebar: function sidebar() {
        return __webpack_require__.e(/* import() | sidenav */ "sidenav").then(__webpack_require__.bind(null, "99b8"));
      },
      topbar: function topbar() {
        return __webpack_require__.e(/* import() | topbar */ "topbar").then(__webpack_require__.bind(null, "ddc0"));
      }
    }
  }, {
    path: '/users',
    name: 'users',
    components: {
      default: function _default() {
        return __webpack_require__.e(/* import() | userGroupEditor */ "userGroupEditor").then(__webpack_require__.bind(null, "4a5b"));
      },
      sidebar: function sidebar() {
        return __webpack_require__.e(/* import() | sidenav */ "sidenav").then(__webpack_require__.bind(null, "99b8"));
      },
      topbar: function topbar() {
        return __webpack_require__.e(/* import() | topbar */ "topbar").then(__webpack_require__.bind(null, "ddc0"));
      }
    }
  },
  // {
  //     path: '/users-and-groups',
  //     name: 'users-and-groups',
  //     components: {
  //         default: () => import('./views/usersGroups/UsersAndGroups.vue'),
  //         sidebar: () => import('./components/SideNav.vue'),
  //         topbar: () => import('./components/Topbar.vue')
  //     }
  // },
  {
    path: '/pluginManager',
    name: 'pluginManager',
    components: {
      default: function _default() {
        return __webpack_require__.e(/* import() | pluginManager */ "pluginManager").then(__webpack_require__.bind(null, "55c5"));
      },
      sidebar: function sidebar() {
        return __webpack_require__.e(/* import() | sidenav */ "sidenav").then(__webpack_require__.bind(null, "99b8"));
      },
      topbar: function topbar() {
        return __webpack_require__.e(/* import() | topbar */ "topbar").then(__webpack_require__.bind(null, "ddc0"));
      }
    }
  }, {
    path: '/crosswalk',
    name: 'crosswalk',
    components: {
      default: function _default() {
        return Promise.all(/* import() | crosswalk */[__webpack_require__.e("chunk-2d0a4fe9"), __webpack_require__.e("chunk-6a6fd63e"), __webpack_require__.e("chunk-2d0d5fe2"), __webpack_require__.e("chunk-576b8942"), __webpack_require__.e("crosswalk")]).then(__webpack_require__.bind(null, "1cfb"));
      },
      sidebar: function sidebar() {
        return __webpack_require__.e(/* import() | sidenav */ "sidenav").then(__webpack_require__.bind(null, "99b8"));
      },
      topbar: function topbar() {
        return __webpack_require__.e(/* import() | topbar */ "topbar").then(__webpack_require__.bind(null, "ddc0"));
      }
    }
  }, {
    path: '/timeline',
    name: 'timeline',
    components: {
      default: function _default() {
        return __webpack_require__.e(/* import() | timeline */ "timeline").then(__webpack_require__.bind(null, "3dd3"));
      },
      sidebar: function sidebar() {
        return __webpack_require__.e(/* import() | sidenav */ "sidenav").then(__webpack_require__.bind(null, "99b8"));
      },
      topbar: function topbar() {
        return __webpack_require__.e(/* import() | topbar */ "topbar").then(__webpack_require__.bind(null, "ddc0"));
      }
    }
  }, {
    path: '/about',
    name: 'about',
    components: {
      default: function _default() {
        return __webpack_require__.e(/* import() | about */ "about").then(__webpack_require__.bind(null, "f820"));
      },
      sidebar: function sidebar() {
        return __webpack_require__.e(/* import() | sidenav */ "sidenav").then(__webpack_require__.bind(null, "99b8"));
      },
      topbar: function topbar() {
        return __webpack_require__.e(/* import() | topbar */ "topbar").then(__webpack_require__.bind(null, "ddc0"));
      }
    }
  }, {
    path: '/framework',
    name: 'framework',
    components: {
      default: function _default() {
        return Promise.all(/* import() | framework */[__webpack_require__.e("chunk-2d22bdc1"), __webpack_require__.e("chunk-2d21ecda"), __webpack_require__.e("framework")]).then(__webpack_require__.bind(null, "2f26"));
      },
      sidebar: function sidebar() {
        return __webpack_require__.e(/* import() | sidenav */ "sidenav").then(__webpack_require__.bind(null, "99b8"));
      },
      topbar: function topbar() {
        return __webpack_require__.e(/* import() | topbar */ "topbar").then(__webpack_require__.bind(null, "ddc0"));
      }
    }
  }, {
    path: '/import',
    name: 'import',
    components: {
      default: function _default() {
        return Promise.all(/* import() | import */[__webpack_require__.e("chunk-2d0a4fe9"), __webpack_require__.e("chunk-6a6fd63e"), __webpack_require__.e("chunk-2d0d5fe2"), __webpack_require__.e("chunk-576b8942"), __webpack_require__.e("import")]).then(__webpack_require__.bind(null, "47e0"));
      },
      sidebar: function sidebar() {
        return __webpack_require__.e(/* import() | sidenav */ "sidenav").then(__webpack_require__.bind(null, "99b8"));
      },
      topbar: function topbar() {
        return __webpack_require__.e(/* import() | topbar */ "topbar").then(__webpack_require__.bind(null, "ddc0"));
      }
    }
  }, {
    path: '/organizations',
    name: 'organizations',
    components: {
      default: function _default() {
        return Promise.all(/* import() | organizations */[__webpack_require__.e("chunk-2d0a4fe9"), __webpack_require__.e("chunk-2d0d5fe2"), __webpack_require__.e("organizations")]).then(__webpack_require__.bind(null, "4f42"));
      },
      sidebar: function sidebar() {
        return __webpack_require__.e(/* import() | sidenav */ "sidenav").then(__webpack_require__.bind(null, "99b8"));
      },
      topbar: function topbar() {
        return __webpack_require__.e(/* import() | topbar */ "topbar").then(__webpack_require__.bind(null, "ddc0"));
      }
    }
  }, {
    path: '/organization',
    name: 'organization',
    components: {
      default: function _default() {
        return Promise.all(/* import() | organization */[__webpack_require__.e("chunk-2d0a4fe9"), __webpack_require__.e("organization")]).then(__webpack_require__.bind(null, "5186"));
      },
      sidebar: function sidebar() {
        return __webpack_require__.e(/* import() | sidenav */ "sidenav").then(__webpack_require__.bind(null, "99b8"));
      },
      topbar: function topbar() {
        return __webpack_require__.e(/* import() | topbar */ "topbar").then(__webpack_require__.bind(null, "ddc0"));
      }
    }
  }, {
    path: '/pluginContainer',
    name: 'pluginContainer',
    components: {
      default: function _default() {
        return __webpack_require__.e(/* import() | pluginContainer */ "pluginContainer").then(__webpack_require__.bind(null, "bd3b"));
      },
      sidebar: function sidebar() {
        return __webpack_require__.e(/* import() | sidenav */ "sidenav").then(__webpack_require__.bind(null, "99b8"));
      },
      topbar: function topbar() {
        return __webpack_require__.e(/* import() | topbar */ "topbar").then(__webpack_require__.bind(null, "ddc0"));
      }
    }
  }, {
    path: '/conceptScheme',
    name: 'conceptScheme',
    components: {
      default: function _default() {
        return Promise.all(/* import() | conceptScheme */[__webpack_require__.e("chunk-2d22bdc1"), __webpack_require__.e("conceptScheme")]).then(__webpack_require__.bind(null, "5889"));
      },
      sidebar: function sidebar() {
        return __webpack_require__.e(/* import() | sidenav */ "sidenav").then(__webpack_require__.bind(null, "99b8"));
      },
      topbar: function topbar() {
        return __webpack_require__.e(/* import() | topbar */ "topbar").then(__webpack_require__.bind(null, "ddc0"));
      }
    }
  }, {
    path: '/progressionModel',
    name: 'progressionModel',
    components: {
      default: function _default() {
        return Promise.all(/* import() | progressionModel */[__webpack_require__.e("chunk-2d22bdc1"), __webpack_require__.e("progressionModel")]).then(__webpack_require__.bind(null, "e3ce"));
      },
      sidebar: function sidebar() {
        return __webpack_require__.e(/* import() | sidenav */ "sidenav").then(__webpack_require__.bind(null, "99b8"));
      },
      topbar: function topbar() {
        return __webpack_require__.e(/* import() | topbar */ "topbar").then(__webpack_require__.bind(null, "ddc0"));
      }
    }
  }, {
    path: '/403',
    name: 'Forbidden',
    component: function component() {
      return __webpack_require__.e(/* import() | forbidden */ "forbidden").then(__webpack_require__.bind(null, "dc82"));
    }
  }, {
    path: '/500',
    name: 'InternalError',
    component: function component() {
      return __webpack_require__.e(/* import() | internalError */ "internalError").then(__webpack_require__.bind(null, "7f18"));
    }
  }, {
    path: '/directory',
    name: 'directory',
    components: {
      default: function _default() {
        return Promise.all(/* import() | directory */[__webpack_require__.e("chunk-2d0a4fe9"), __webpack_require__.e("chunk-576b8942"), __webpack_require__.e("directory")]).then(__webpack_require__.bind(null, "1e7a"));
      },
      sidebar: function sidebar() {
        return __webpack_require__.e(/* import() | sidenav */ "sidenav").then(__webpack_require__.bind(null, "99b8"));
      },
      topbar: function topbar() {
        return __webpack_require__.e(/* import() | topbar */ "topbar").then(__webpack_require__.bind(null, "ddc0"));
      }
    }
  }]
}));

/***/ }),

/***/ "4360":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__("2b0e");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// EXTERNAL MODULE: ./src/store/modules/lode.js
var lode = __webpack_require__("8596");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__("a434");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.search.js
var es_string_search = __webpack_require__("841c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.starts-with.js
var es_string_starts_with = __webpack_require__("2ca0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.sort.js
var es_array_sort = __webpack_require__("4e82");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
var regeneratorRuntime = __webpack_require__("c7eb");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__("2909");

// CONCATENATED MODULE: ./src/store/modules/editor.js























vue_runtime_esm["a" /* default */].use(vuex_esm["a" /* default */]);
var editor_state = {
  framework: null,
  organization: null,
  selectedCompetency: null,
  queryParams: {},
  defaultLanguage: null,
  webSocketBackoff: 100,
  selectCompetencyRelation: null,
  selectingCompetencies: false,
  private: false,
  newCompetency: null,
  newFramework: null,
  t3Profile: false,
  changedObject: null,
  configuration: null,
  commonPathIframe: '',
  iframeCompetencyPathInterframework: '',
  iframeConceptPath: '',
  addCommentAboutId: '',
  addCommentType: '',
  commentToEdit: {},
  commentToReply: {},
  frameworkCommentDataLoaded: false,
  frameworkCommentList: [],
  frameworkCommentPersonMap: {},
  commentsToDelete: [],
  commentScrollTo: {},
  editsToUndo: [],
  lastEditToUndo: null,
  recomputeHierarchy: false,
  recomputePrecedence: false,
  recomputePrecedenceAfterReorder: false,
  selectedCompetenciesAsProperties: null,
  refreshLevels: false,
  refreshAlignments: false,
  refreshProperties: false,
  conceptMode: false,
  collectionMode: false,
  progressionMode: false,
  cutId: null,
  copyId: null,
  paste: false,
  cutOrCopyContainerId: null,
  nodeInFocus: null,
  relations: {},
  setPropertyLevel: null,
  addAnother: false,
  itemToDelete: {},
  itemToRemove: {},
  itemToExport: {},
  manageAssertions: false,
  assertions: [],
  badgePk: null,
  me: null,
  subject: null,
  people: [],
  firstSearchProcessing: true,
  searchingAssertions: false
};
var mutations = {
  framework: function framework(state, f) {
    state.framework = f;
  },
  organization: function organization(state, f) {
    state.organization = f;
  },
  selectedCompetency: function selectedCompetency(state, comp) {
    state.selectedCompetency = comp;
  },
  queryParams: function queryParams(state, params) {
    state.queryParams = params;
  },
  defaultLanguage: function defaultLanguage(state, lang) {
    state.defaultLanguage = lang;
  },
  webSocketBackoffIncrease: function webSocketBackoffIncrease(state) {
    state.webSocketBackoff *= 2;
  },
  private: function _private(state, bool) {
    state.private = bool;
  },
  selectCompetencyRelation: function selectCompetencyRelation(state, r) {
    state.selectCompetencyRelation = r;
  },
  selectingCompetencies: function selectingCompetencies(state, bool) {
    state.selectingCompetencies = bool;
  },
  newCompetency: function newCompetency(state, id) {
    state.newCompetency = id;
  },
  newFramework: function newFramework(state, id) {
    state.newFramework = id;
  },
  t3Profile: function t3Profile(state, bool) {
    state.t3Profile = bool;
  },
  changedObject: function changedObject(state, id) {
    state.changedObject = id;
  },
  configuration: function configuration(state, config) {
    state.configuration = config;
  },
  commonPathIframe: function commonPathIframe(state, val) {
    state.commonPathIframe = val;
  },
  iframeCompetencyPathInterframework: function iframeCompetencyPathInterframework(state, val) {
    state.iframeCompetencyPathInterframework = val;
  },
  iframeConceptPath: function iframeConceptPath(state, val) {
    state.iframeConceptPath = val;
  },
  setAddCommentAboutId: function setAddCommentAboutId(state, val) {
    state.addCommentAboutId = val;
  },
  setAddCommentType: function setAddCommentType(state, val) {
    state.addCommentType = val;
  },
  setCommentToEdit: function setCommentToEdit(state, val) {
    state.commentToEdit = val;
  },
  setCommentToReply: function setCommentToReply(state, val) {
    state.commentToReply = val;
  },
  setCommentsToDelete: function setCommentsToDelete(state, val) {
    state.commentsToDelete = val;
  },
  clearFrameworkCommentData: function clearFrameworkCommentData(state) {
    state.frameworkCommentDataLoaded = false;
    state.frameworkCommentList = [];
    state.frameworkCommentPersonMap = {};
  },
  setFrameworkCommentDataLoaded: function setFrameworkCommentDataLoaded(state, val) {
    state.frameworkCommentDataLoaded = val;
  },
  setFrameworkCommentList: function setFrameworkCommentList(state, val) {
    state.frameworkCommentList = val;
  },
  setFrameworkCommentPersonMap: function setFrameworkCommentPersonMap(state, val) {
    state.frameworkCommentPersonMap = val;
  },
  setCommentScrollTo: function setCommentScrollTo(state, val) {
    state.commentScrollTo = val;
  },
  addEditsToUndo: function addEditsToUndo(state, edits) {
    state.editsToUndo.push(edits);
  },
  setLastEditToUndo: function setLastEditToUndo(state, edit) {
    state.lastEditToUndo = edit;
  },
  recomputeHierarchy: function recomputeHierarchy(state, boolean) {
    state.recomputeHierarchy = boolean;
  },
  recomputePrecedence: function recomputePrecedence(state, boolean) {
    state.recomputePrecedence = boolean;
  },
  recomputePrecedenceAfterReorder: function recomputePrecedenceAfterReorder(state, boolean) {
    state.recomputePrecedenceAfterReorder = boolean;
  },
  selectedCompetenciesAsProperties: function selectedCompetenciesAsProperties(state, comps) {
    state.selectedCompetenciesAsProperties = comps;
  },
  refreshLevels: function refreshLevels(state, boolean) {
    state.refreshLevels = boolean;
  },
  refreshAlignments: function refreshAlignments(state, boolean) {
    state.refreshAlignments = boolean;
  },
  refreshProperties: function refreshProperties(state, boolean) {
    state.refreshProperties = boolean;
  },
  conceptMode: function conceptMode(state, boolean) {
    if (boolean) {
      state.conceptMode = true;
      state.progressionMode = false;
    } else {
      state.conceptMode = false;
    }
  },
  collectionMode: function collectionMode(state, boolean) {
    state.collectionMode = boolean;
  },
  progressionMode: function progressionMode(state, boolean) {
    if (boolean) {
      state.progressionMode = true;
      state.conceptMode = false;
    } else {
      state.progressionMode = false;
    }
  },
  cutId: function cutId(state, id) {
    state.cutId = id;
  },
  copyId: function copyId(state, id) {
    state.copyId = id;
  },
  paste: function paste(state, id) {
    state.paste = id;
  },
  cutOrCopyContainerId: function cutOrCopyContainerId(state, id) {
    state.cutOrCopyContainerId = id;
  },
  nodeInFocus: function nodeInFocus(state, id) {
    state.nodeInFocus = id;
  },
  relations: function relations(state, obj) {
    state.relations = obj;
  },
  setPropertyLevel: function setPropertyLevel(state, level) {
    state.setPropertyLevel = level;
  },
  addAnother: function addAnother(state, bool) {
    state.addAnother = bool;
  },
  setItemToDelete: function setItemToDelete(state, val) {
    state.itemToDelete = val;
  },
  setItemToRemove: function setItemToRemove(state, val) {
    state.itemToRemove = val;
  },
  setItemToExport: function setItemToExport(state, val) {
    state.itemToExport = val;
  },
  setManageAssertions: function setManageAssertions(state, val) {
    state.manageAssertions = val;
  },
  setAssertions: function setAssertions(state, val) {
    state.assertions = val;
  },
  removeAssertion: function removeAssertion(state, val) {
    EcArray.setRemove(state.assertions, val);
  },
  removeAssertionAtIndex: function removeAssertionAtIndex(state, val) {
    state.assertions.splice(val, 1);
  },
  addAssertion: function addAssertion(state, val) {
    EcArray.setAdd(state.assertions, val);
  },
  setBadgePk: function setBadgePk(state, val) {
    state.badgePk = val;
  },
  setMe: function setMe(state, val) {
    state.me = val;
  },
  setSubject: function setSubject(state, val) {
    state.subject = val;
  },
  setPeople: function setPeople(state, val) {
    state.people = val;
  },
  setFirstSearchProcessing: function setFirstSearchProcessing(state, val) {
    state.firstSearchProcessing = val;
  },
  setSearchingAssertions: function setSearchingAssertions(state, val) {
    state.searchingAssertions = val;
  }
};
var actions = {
  getDirectoryChildren: function getDirectoryChildren(instance, directory) {
    var children = [];
    if (directory.frameworks) {
      children.push.apply(children, Object(toConsumableArray["a" /* default */])(directory.frameworks));
    }
    if (directory.resources) {
      children.push.apply(children, Object(toConsumableArray["a" /* default */])(directory.resources));
    }
    if (directory.directories) {
      children.push.apply(children, Object(toConsumableArray["a" /* default */])(directory.directories));
    }
    return children;
  },
  lastEditToUndo: function lastEditToUndo(context) {
    context.commit('setLastEditToUndo', context.state.editsToUndo.pop());
    return context.state.lastEditToUndo;
  },
  getThing: function getThing(instance, payload) {
    return new Promise(function (resolve, reject) {
      var url = EcRemote.urlAppend(payload.server, payload.service);
      url = EcRemote.upgradeHttpToHttps(url);
      fetch(url, {
        headers: payload.headers
      }).then(function (resp) {
        if (payload.success) {
          payload.success(resp.data);
        }
        resolve(resp.data);
      }).catch(function (err) {
        if (payload.failure) {
          payload.failure(err);
        }
        reject(err);
      });
    });
  },
  searchForAssertions: function searchForAssertions(instance) {
    return new Promise(function (resolve, reject) {
      instance.state.searchingAssertions = true;
      var assertions = [];
      var doSearch = /*#__PURE__*/function () {
        var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee2(start, count) {
          return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", new Promise(function (resolve, reject) {
                  EcAssertion.search(window.repo, "\"" + instance.state.me + "\"", /*#__PURE__*/function () {
                    var _ref2 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee(results) {
                      return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
                        while (1) switch (_context.prev = _context.next) {
                          case 0:
                            assertions.push.apply(assertions, Object(toConsumableArray["a" /* default */])(results));
                            start += count;
                            if (!(results.length > 0)) {
                              _context.next = 5;
                              break;
                            }
                            _context.next = 5;
                            return doSearch(start, count);
                          case 5:
                            resolve();
                          case 6:
                          case "end":
                            return _context.stop();
                        }
                      }, _callee);
                    }));
                    return function (_x3) {
                      return _ref2.apply(this, arguments);
                    };
                  }(), reject, {
                    size: count,
                    start: start
                  });
                }));
              case 1:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }));
        return function doSearch(_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }();
      doSearch(0, 5000).then(function () {
        var eah = new EcAsyncHelper();
        eah.each(assertions, function (assertion, callback) {
          if (assertion.assertionDateDecrypted != null) {
            callback();
          } else {
            assertion.getAssertionDateAsync(function (date) {
              assertion.assertionDateDecrypted = date;
              callback();
            }, callback);
          }
        }, function (assertions) {
          instance.state.assertions = assertions;
          instance.state.searchingAssertions = false;
          resolve();
        });
      }).catch(appError);
    });
  },
  computeBecause: function computeBecause(instance, evidences) {
    return new Promise(function (resolve, reject) {
      var explanations = [];
      new EcAsyncHelper().each(evidences, function (e, callback) {
        var evidenceString = "";
        var eoriginal = e;
        if (e.startsWith != null && e.startsWith("{")) {
          e = JSON.parse(e);
        }
        if (EcObject.isObject(e)) {
          if (e.verb != null) {
            if (e.verb.display != null) {
              if (e.verb.display.en != null) {
                evidenceString += e.verb.display.en + " ";
              }
            }
          }
          if (e.object != null) {
            if (e.object.definition != null) {
              if (e.object.definition.type === "http://adlnet.gov/expapi/activities/assessment") {
                evidenceString += "\"" + e.object.definition.name.en + "\" quiz with a ";
                if (e.result != null) {
                  if (e.result.success != null) {
                    evidenceString += e.result.success ? " passing " : " not passing ";
                    evidenceString += Math.round(e.result.score.scaled * 100.0) + "%";
                  }
                }
              }
            }
          }
          if (e.object != null) {
            if (e.object.definition != null) {
              if (e.object.definition.interactionType != null) {
                evidenceString += "\"" + e.object.definition.name.en + "\" ";
                if (e.result != null) {
                  if (e.result.success != null) {
                    evidenceString += e.result.success ? " correctly" : " incorrectly";
                  }
                }
              }
            }
          }
          if (evidenceString !== "") {
            explanations.push({
              text: evidenceString,
              original: eoriginal
            });
          }
          callback();
        } else if (e.startsWith != null && e.startsWith("http")) {
          var failureFunc = function failureFunc() {
            explanations.push({
              text: "did this",
              url: e,
              original: eoriginal
            });
          };
          EcRepository.get(e, function (success) {
            try {
              if (success.isAny(new ChooseAction().getTypes())) {
                EcRepository.get(success.object, function (creativeWork) {
                  explanations.push({
                    text: "viewed " + creativeWork.name,
                    url: creativeWork.url,
                    original: eoriginal
                  });
                  callback();
                }, callback);
              } else {
                failureFunc();
                callback();
              }
            } catch (e) {
              failureFunc();
              callback();
            }
          }, function (failure) {
            failureFunc();
            callback();
          });
        } else {
          explanations.push({
            text: "\"" + e + "\"",
            original: eoriginal
          });
          callback();
        }
      }, function (evidences) {
        resolve(explanations);
      });
    });
  }
};
var getters = {
  framework: function framework(state) {
    return state.framework;
  },
  organization: function organization(state) {
    return state.organization;
  },
  selectedCompetency: function selectedCompetency(state) {
    return state.selectedCompetency;
  },
  queryParams: function queryParams(state) {
    return state.queryParams;
  },
  defaultLanguage: function defaultLanguage(state) {
    return state.defaultLanguage;
  },
  webSocketBackoff: function webSocketBackoff(state) {
    return state.webSocketBackoff;
  },
  selectCompetencyRelation: function selectCompetencyRelation(state) {
    return state.selectCompetencyRelation;
  },
  selectingCompetencies: function selectingCompetencies(state) {
    return state.selectingCompetencies;
  },
  private: function _private(state) {
    return state.private;
  },
  newCompetency: function newCompetency(state) {
    return state.newCompetency;
  },
  newFramework: function newFramework(state) {
    return state.newFramework;
  },
  t3Profile: function t3Profile(state) {
    return state.t3Profile;
  },
  changedObject: function changedObject(state) {
    return state.changedObject;
  },
  configuration: function configuration(state) {
    return state.configuration;
  },
  addCommentAboutId: function addCommentAboutId(state) {
    return state.addCommentAboutId;
  },
  addCommentType: function addCommentType(state) {
    return state.addCommentType;
  },
  commentToEdit: function commentToEdit(state) {
    return state.commentToEdit;
  },
  commentToReply: function commentToReply(state) {
    return state.commentToReply;
  },
  commentsToDelete: function commentsToDelete(state) {
    return state.commentsToDelete;
  },
  frameworkCommentDataLoaded: function frameworkCommentDataLoaded(state) {
    return state.frameworkCommentDataLoaded;
  },
  frameworkCommentList: function frameworkCommentList(state) {
    return state.frameworkCommentList;
  },
  frameworkCommentPersonMap: function frameworkCommentPersonMap(state) {
    return state.frameworkCommentPersonMap;
  },
  commentScrollTo: function commentScrollTo(state) {
    return state.commentScrollTo;
  },
  recomputeHierarchy: function recomputeHierarchy(state) {
    return state.recomputeHierarchy;
  },
  recomputePrecedence: function recomputePrecedence(state) {
    return state.recomputePrecedence;
  },
  recomputePrecedenceAfterReorder: function recomputePrecedenceAfterReorder(state) {
    return state.recomputePrecedenceAfterReorder;
  },
  selectedCompetenciesAsProperties: function selectedCompetenciesAsProperties(state) {
    return state.selectedCompetenciesAsProperties;
  },
  refreshLevels: function refreshLevels(state) {
    return state.refreshLevels;
  },
  refreshAlignments: function refreshAlignments(state) {
    return state.refreshAlignments;
  },
  refreshProperties: function refreshProperties(state) {
    return state.refreshProperties;
  },
  conceptMode: function conceptMode(state) {
    return state.conceptMode;
  },
  collectionMode: function collectionMode(state) {
    return state.collectionMode;
  },
  progressionMode: function progressionMode(state) {
    return state.progressionMode;
  },
  cutId: function cutId(state) {
    return state.cutId;
  },
  copyId: function copyId(state) {
    return state.copyId;
  },
  paste: function paste(state) {
    return state.paste;
  },
  cutOrCopyContainerId: function cutOrCopyContainerId(state) {
    return state.cutOrCopyContainerId;
  },
  nodeInFocus: function nodeInFocus(state) {
    return state.nodeInFocus;
  },
  relations: function relations(state) {
    return state.relations;
  },
  setPropertyLevel: function setPropertyLevel(state) {
    return state.setPropertyLevel;
  },
  addAnother: function addAnother(state) {
    return state.addAnother;
  },
  itemToDelete: function itemToDelete(state) {
    return state.itemToDelete;
  },
  itemToRemove: function itemToRemove(state) {
    return state.itemToRemove;
  },
  itemToExport: function itemToExport(state) {
    return state.itemToExport;
  },
  manageAssertions: function manageAssertions(state) {
    return state.manageAssertions;
  },
  assertions: function assertions(state) {
    return state.assertions.sort(function (a, b) {
      return b.assertionDateDecrypted - a.assertionDateDecrypted;
    });
  },
  badgePk: function badgePk(state) {
    return state.badgePk;
  },
  getMe: function getMe(state) {
    return state.me;
  },
  getSubject: function getSubject(state) {
    return state.subject;
  },
  people: function people(state) {
    return state.people;
  },
  firstSearchProcessing: function firstSearchProcessing(state) {
    return state.firstSearchProcessing;
  },
  searchingAssertions: function searchingAssertions(state) {
    return state.searchingAssertions;
  }
};
/* harmony default export */ var editor = ({
  namespaced: true,
  state: editor_state,
  mutations: mutations,
  actions: actions,
  getters: getters
});
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find-index.js
var es_array_find_index = __webpack_require__("c740");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find.js
var es_array_find = __webpack_require__("7db0");

// CONCATENATED MODULE: ./src/store/modules/app.js














// This store is used to control app state for behavior
// such as displaying certain modals
// and transitions

var app_state = {
  sideNavEnabled: true,
  showSideNav: true,
  showRightAside: false,
  rightAsideContent: '',
  rightAsideObject: null,
  canViewComments: false,
  canAddComments: false,
  pluginLastUpdate: null,
  pluginToLaunch: null,
  pluginToLaunchLastUpdate: 0,
  framework: {
    showToolBar: true,
    commentsEnabled: true,
    versionsEnabled: true,
    draggingEnabled: false,
    isDragging: false,
    draggable: {}
  },
  configuration: {
    contentSection: ''
  },
  frameworks: {
    searchTerm: '',
    quickFilters: [],
    applySearchTo: [],
    sortResults: [],
    refreshSearch: false,
    searchFrameworksInCompetencySearch: false
  },
  modal: {
    framework: '',
    showModal: false,
    dynamicModalContent: {},
    objForShareModal: null
  },
  directories: {
    directoryList: [],
    selectedDirectory: null,
    searchingInDirectory: true,
    editDirectory: false
  },
  import: {
    files: [],
    transition: 'upload',
    // upload, process, detail, preview, light
    status: '',
    // success, failure, edit
    type: 'file',
    // pdf, server, text
    fileType: '',
    firstImport: Boolean,
    errors: [],
    // erorrs from the code or from the api
    feedback: '',
    // additional information
    duplicates: [],
    skip: [],
    framework: null,
    serverUrl: '',
    url: '',
    frameworkName: '',
    frameworkDescription: '',
    importCsv: {
      nameColumn: {},
      descriptionColumn: {},
      scopeColumn: {},
      idColumn: {},
      sourceColumn: {},
      relationColumn: {},
      targetColumn: {}
    },
    importText: '',
    csvColumns: [],
    csvRelationColumns: [],
    csvRelationFile: null,
    importModalParams: null
  },
  allowCancel: false,
  banner: {
    message: '',
    color: '',
    background: ''
  },
  motd: {
    message: '',
    title: ''
  },
  curatedPlugins: [{
    "id": "vlrcTestPlugin3",
    "url": "https://raw.githubusercontent.com/cassproject/cass-vlrc/master/"
  }]
};
var app_mutations = {
  showSideNav: function showSideNav() {
    app_state.showSideNav = true;
    app_state.showRightAside = false;
  },
  closeSideNav: function closeSideNav() {
    app_state.showSideNav = false;
  },
  showRightAside: function showRightAside(state, payload) {
    state.showRightAside = true;
    state.rightAsideContent = payload;
    // state.showSideNav = false;
  },
  closeRightAside: function closeRightAside(state) {
    state.showRightAside = false;
    state.rightAsideContent = '';
    state.rightAsideObject = null;
  },
  rightAsideObject: function () {
    var _rightAsideObject = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee(state, payload) {
      var type, obj;
      return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!payload.encryptedType) {
              _context.next = 11;
              break;
            }
            type = "Ec" + payload.encryptedType;
            obj = new window[type]();
            _context.t0 = obj;
            _context.next = 6;
            return EcEncryptedValue.fromEncryptedValue(payload);
          case 6:
            _context.t1 = _context.sent;
            _context.t0.copyFrom.call(_context.t0, _context.t1);
            state.rightAsideObject = obj;
            _context.next = 12;
            break;
          case 11:
            state.rightAsideObject = payload;
          case 12:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function rightAsideObject(_x, _x2) {
      return _rightAsideObject.apply(this, arguments);
    }
    return rightAsideObject;
  }(),
  showModal: function showModal(state, payload) {
    state.modal.showModal = true;
    state.modal.dynamicModalContent = payload;
  },
  closeModal: function closeModal(state) {
    state.modal.showModal = false;
    state.modal.dynamicModalContent = {};
  },
  objForShareModal: function objForShareModal(state, payload) {
    state.modal.objForShareModal = payload;
  },
  draggingEnabled: function draggingEnabled(state, value) {
    state.framework.draggingEnabled = value;
  },
  isDragging: function isDragging(state, value) {
    state.framework.isDragging = value;
  },
  draggable: function draggable(state, value) {
    state.framework.draggable = value;
  },
  importFiles: function importFiles(state, value) {
    state.import.files = value;
  },
  setCanViewComments: function setCanViewComments(state, value) {
    state.canViewComments = value;
  },
  setCanAddComments: function setCanAddComments(state, value) {
    state.canAddComments = value;
  },
  clearImportFiles: function clearImportFiles(state) {
    state.import.files = [];
  },
  pluginLastUpdate: function pluginLastUpdate(state, value) {
    state.pluginLastUpdate = value;
  },
  pluginToLaunch: function pluginToLaunch(state, value) {
    state.pluginToLaunch = value;
  },
  pluginToLaunchLastUpdate: function pluginToLaunchLastUpdate(state, value) {
    state.pluginToLaunchLastUpdate = value;
  },
  resetImport: function resetImport(state) {
    state.import = {
      files: [],
      transition: 'upload',
      // upload, process, detail, preview, light
      status: '',
      // success, failure, edit
      type: 'file',
      // pdf, server, text
      fileType: '',
      firstImport: Boolean,
      errors: [],
      // erorrs from the code or from the api
      feedback: '',
      // additional information
      duplicates: [],
      skip: [],
      framework: null,
      serverUrl: '',
      url: '',
      frameworkName: '',
      frameworkDescription: '',
      importCsv: {
        nameColumn: {},
        descriptionCcolumn: {},
        scopeColumn: {},
        idColumn: {},
        sourceColumn: {},
        relationColumn: {},
        targetColumn: {}
      },
      importText: '',
      csvColumns: [],
      csvRelationColumns: [],
      csvRelationFile: null,
      importModalParams: null
    };
  },
  importTransition: function importTransition(state, value) {
    state.import.transition = value;
  },
  importFileType: function importFileType(state, value) {
    state.import.fileType = value;
  },
  importType: function importType(state, value) {
    state.import.type = value;
  },
  firstImport: function firstImport(state, val) {
    state.import.firstImport = val;
  },
  addImportError: function addImportError(state, val) {
    state.import.errors.push(val);
  },
  clearImportErrors: function clearImportErrors(state) {
    state.import.errors = [];
  },
  importStatus: function importStatus(state, val) {
    state.import.status = val;
  },
  importAllowCancel: function importAllowCancel(state, val) {
    state.allowCancel = val;
  },
  importFeedback: function importFeedback(state, val) {
    state.import.feedback = val;
  },
  importDuplicates: function importDuplicates(state, val) {
    state.import.duplicates = val;
  },
  importSkip: function importSkip(state, val) {
    state.import.skip = val;
  },
  importFramework: function importFramework(state, val) {
    state.import.framework = val;
  },
  importFrameworkName: function importFrameworkName(state, val) {
    state.import.frameworkName = val;
  },
  importFrameworkNameColumn: function importFrameworkNameColumn(state, val) {
    state.import.frameworkNameColumn = val;
  },
  importFrameworkScopeColumn: function importFrameworkScopeColumn(state, val) {
    state.import.frameworkScopeColumn = val;
  },
  importFrameworkIdColumn: function importFrameworkIdColumn(state, val) {
    state.import.frameworkIdColumn = val;
  },
  importFrameworkDescription: function importFrameworkDescription(state, val) {
    state.import.frameworkDescription = val;
  },
  importText: function importText(state, val) {
    state.import.importText = val;
  },
  importServerUrl: function importServerUrl(state, val) {
    state.import.serverUrl = val;
  },
  importUrl: function importUrl(state, val) {
    state.import.url = val;
  },
  importNameColumn: function importNameColumn(state, val) {
    state.import.importCsv.nameColumn = val;
  },
  importDescriptionColumn: function importDescriptionColumn(state, val) {
    state.import.importCsv.descriptionColumn = val;
  },
  importScopeColumn: function importScopeColumn(state, val) {
    state.import.importCsv.scopeColumn = val;
  },
  importSourceColumn: function importSourceColumn(state, val) {
    state.import.importCsv.sourceColumn = val;
  },
  importTargetColumn: function importTargetColumn(state, val) {
    state.import.importCsv.targetColumn = val;
  },
  importRelationColumn: function importRelationColumn(state, val) {
    state.import.importCsv.relationColumn = val;
  },
  importIdColumn: function importIdColumn(state, val) {
    state.import.importCsv.idColumn = val;
  },
  csvColumns: function csvColumns(state, val) {
    state.import.csvColumns = val;
  },
  csvRelationColumns: function csvRelationColumns(state, val) {
    state.import.csvRelationColumns = val;
  },
  csvRelationFile: function csvRelationFile(state, val) {
    state.import.csvRelationFile = val;
  },
  importModalParams: function importModalParams(state, val) {
    state.import.importModalParams = val;
  },
  searchTerm: function searchTerm(state, value) {
    state.frameworks.searchTerm = value;
  },
  applySearchTo: function applySearchTo(state, value) {
    state.frameworks.applySearchTo = value;
  },
  refreshSearch: function refreshSearch(state, value) {
    state.frameworks.refreshSearch = value;
  },
  sortResults: function sortResults(state, value) {
    state.frameworks.sortResults = value;
  },
  quickFilters: function quickFilters(state, value) {
    state.frameworks.quickFilters = value;
  },
  singleQuickFilter: function singleQuickFilter(state, value) {
    var i = state.frameworks.quickFilters.findIndex(function (filter) {
      return filter.id === value.id;
    });
    if (i >= 0) {
      state.frameworks.quickFilters[i].checked = value.checked;
    } else {
      state.frameworks.quickFilters.push(value);
    }
  },
  clearSearchFilters: function clearSearchFilters(state) {
    var quickFilters = state.frameworks.quickFilters;
    var sortResults = state.frameworks.sortResults;
    var applySearchTo = state.frameworks.applySearchTo;
    for (var i = 0; i < quickFilters.length; i++) {
      quickFilters[i].checked = false;
    }
    for (var _i = 0; _i < sortResults.length; _i++) {
      sortResults[_i].checked = false;
    }
    for (var _i2 = 0; _i2 < applySearchTo.length; _i2++) {
      applySearchTo[_i2].checked = false;
    }
    state.frameworks.quickFilters = quickFilters;
    state.frameworks.sortResults = sortResults;
    state.frameworks.applySearchTo = applySearchTo;
  },
  selectDirectory: function selectDirectory(state, value) {
    state.directories.selectedDirectory = value;
  },
  directoryList: function directoryList(state, list) {
    state.directories.directoryList = list;
  },
  searchingInDirectory: function searchingInDirectory(state, bool) {
    state.directories.searchingInDirectory = bool;
  },
  editDirectory: function editDirectory(state, bool) {
    state.directories.editDirectory = bool;
  },
  searchFrameworksInCompetencySearch: function searchFrameworksInCompetencySearch(state, bool) {
    state.frameworks.searchFrameworksInCompetencySearch = bool;
  },
  setBanner: function setBanner(state, payload) {
    if (payload.message) {
      state.banner.message = payload.message;
    }
    if (payload.color) {
      state.banner.color = payload.color;
    }
    if (payload.background) {
      state.banner.background = payload.background;
    }
  },
  setMotd: function setMotd(state, payload) {
    if (payload.message) {
      state.motd.message = payload.message;
    }
    if (payload.title) {
      state.motd.title = payload.title;
    }
  },
  setCuratedPlugins: function setCuratedPlugins(state, payload) {
    state.curatedPlugins = payload;
  }
};
var app_actions = {
  clearImport: function clearImport(_ref) {
    var commit = _ref.commit;
    commit('importFramework', null);
    commit('clearImportFiles');
    commit('clearImportErrors');
    commit('importTransition', 'upload');
    commit('importStatus', '');
    commit('importAllowCancel', false);
    commit('importFeedback', '');
    commit('importFileType', '');
    commit('importDuplicates', []);
    commit('importSkip', []);
  },
  refreshDirectories: function refreshDirectories(_ref2) {
    var commit = _ref2.commit;
    var directories = [];
    var directoryIds = [];
    var paramObj = {
      size: 10000
    };
    EcDirectory.search(window.repo, "", function (dirs) {
      for (var i = 0; i < dirs.length; i++) {
        if (dirs[i].canEditAny(EcIdentityManager.default.getMyPks()) && !EcArray.has(directoryIds, dirs[i].id)) {
          directories.push(dirs[i]);
          directoryIds.push(dirs[i].id);
        }
      }
      commit('directoryList', directories);
    }, appError, paramObj);
  }
};
var app_getters = {
  canViewComments: function canViewComments(state) {
    return state.canViewComments;
  },
  canAddComments: function canAddComments(state) {
    return state.canAddComments;
  },
  sideNavEnabled: function sideNavEnabled(state) {
    return state.sideNavEnabled;
  },
  showSideNav: function showSideNav(state) {
    return state.showSideNav;
  },
  showRightAside: function showRightAside(state) {
    return state.showRightAside;
  },
  rightAsideContent: function rightAsideContent(state) {
    return state.rightAsideContent;
  },
  rightAsideObject: function rightAsideObject(state) {
    return state.rightAsideObject;
  },
  framework: function framework(state) {
    return state.framework;
  },
  showModal: function showModal(state) {
    return state.modal.showModal;
  },
  dynamicModalContent: function dynamicModalContent(state) {
    return state.modal.dynamicModalContent;
  },
  objForShareModal: function objForShareModal(state) {
    return state.modal.objForShareModal;
  },
  draggingEnabled: function draggingEnabled(state) {
    return state.modal.draggingEnabled;
  },
  isDragging: function isDragging(state) {
    return state.modal.isDragging;
  },
  draggable: function draggable(state) {
    return state.framework.draggable;
  },
  importFiles: function importFiles(state) {
    return state.import.files;
  },
  importTransition: function importTransition(state) {
    return state.import.transition;
  },
  importFileType: function importFileType(state) {
    return state.import.fileType;
  },
  importType: function importType(state) {
    return state.import.type;
  },
  firstImport: function firstImport(state) {
    return state.import.firstImport;
  },
  importErrors: function importErrors(state) {
    return state.import.errors;
  },
  importStatus: function importStatus(state) {
    return state.import.status;
  },
  importAllowCancel: function importAllowCancel(state) {
    return state.allowCancel;
  },
  importFeedback: function importFeedback(state) {
    return state.import.feedback;
  },
  importDuplicates: function importDuplicates(state) {
    return state.import.duplicates;
  },
  importSkip: function importSkip(state) {
    return state.import.skip;
  },
  importFramework: function importFramework(state) {
    return state.import.framework;
  },
  importFrameworkName: function importFrameworkName(state) {
    return state.import.frameworkName;
  },
  importFrameworkNameColumn: function importFrameworkNameColumn(state) {
    return state.import.frameworkNameColumn;
  },
  importFrameworkScopeColumn: function importFrameworkScopeColumn(state) {
    return state.import.frameworkScopeColumn;
  },
  importFrameworkIdColumn: function importFrameworkIdColumn(state) {
    return state.import.frameworkIdColumn;
  },
  importFrameworkDescription: function importFrameworkDescription(state) {
    return state.import.frameworkDescription;
  },
  importText: function importText(state) {
    return state.import.importText;
  },
  importServerUrl: function importServerUrl(state) {
    return state.import.serverUrl;
  },
  importUrl: function importUrl(state) {
    return state.import.url;
  },
  importNameColumn: function importNameColumn(state) {
    return state.import.importCsv.nameColumn;
  },
  importDescriptionColumn: function importDescriptionColumn(state) {
    return state.import.importCsv.descriptionColumn;
  },
  importScopeColumn: function importScopeColumn(state) {
    return state.import.importCsv.scopeColumn;
  },
  importIdColumn: function importIdColumn(state) {
    return state.import.importCsv.idColumn;
  },
  importSourceColumn: function importSourceColumn(state) {
    return state.import.importCsv.sourceColumn;
  },
  importRelationColumn: function importRelationColumn(state) {
    return state.import.importCsv.relationColumn;
  },
  importTargetColumn: function importTargetColumn(state) {
    return state.import.importCsv.targetColumn;
  },
  importModalParams: function importModalParams(state) {
    return state.import.importModalParams;
  },
  searchTerm: function searchTerm(state) {
    return state.frameworks.searchTerm;
  },
  sortResults: function sortResults(state) {
    return state.frameworks.sortResults;
  },
  quickFilters: function quickFilters(state) {
    return state.frameworks.quickFilters;
  },
  filterByOwnedByMe: function filterByOwnedByMe(state) {
    var filter = state.frameworks.quickFilters.find(function (filter) {
      return filter.id === "ownedByMe";
    });
    if (!filter) {
      return false;
    }
    if (Array.isArray(filter) && filter.length > 0) {
      return filter[0].checked;
    } else {
      return filter.checked;
    }
  },
  filterByNotOwnedByMe: function filterByNotOwnedByMe(state) {
    var filter = state.frameworks.quickFilters.find(function (filter) {
      return filter.id === "notOwnedByMe";
    });
    if (!filter) {
      return false;
    }
    if (Array.isArray(filter) && filter.length > 0) {
      return filter[0].checked;
    } else {
      return filter.checked;
    }
  },
  filterByConfigMatchDefault: function filterByConfigMatchDefault(state) {
    var filter = state.frameworks.quickFilters.find(function (filter) {
      return filter.id === "configMatchDefault";
    });
    if (!filter) {
      return false;
    }
    if (Array.isArray(filter) && filter.length > 0) {
      return filter[0].checked;
    } else {
      return filter.checked;
    }
  },
  applySearchTo: function applySearchTo(state) {
    return state.frameworks.applySearchTo;
  },
  refreshSearch: function refreshSearch(state) {
    return state.frameworks.refreshSearch;
  },
  csvColumns: function csvColumns(state) {
    return state.import.csvColumns;
  },
  csvRelationColumns: function csvRelationColumns(state) {
    return state.import.csvRelationColumns;
  },
  csvRelationFile: function csvRelationFile(state) {
    return state.import.csvRelationFile;
  },
  pluginLastUpdate: function pluginLastUpdate(state) {
    return state.pluginLastUpdate;
  },
  pluginToLaunch: function pluginToLaunch(state) {
    return state.pluginToLaunch;
  },
  pluginToLaunchLastUpdate: function pluginToLaunchLastUpdate(state) {
    return state.pluginToLaunchLastUpdate;
  },
  selectedDirectory: function selectedDirectory(state) {
    return state.directories.selectedDirectory;
  },
  directoryList: function directoryList(state) {
    return state.directories.directoryList;
  },
  searchingInDirectory: function searchingInDirectory(state) {
    return state.directories.searchingInDirectory;
  },
  editDirectory: function editDirectory(state) {
    return state.directories.editDirectory;
  },
  searchFrameworksInCompetencySearch: function searchFrameworksInCompetencySearch(state) {
    return state.frameworks.searchFrameworksInCompetencySearch;
  },
  bannerMessage: function bannerMessage(state) {
    return state.banner.message;
  },
  bannerColor: function bannerColor(state) {
    return state.banner.color;
  },
  bannerBackground: function bannerBackground(state) {
    return state.banner.background;
  },
  motdTitle: function motdTitle(state) {
    return state.motd.title;
  },
  motdMessage: function motdMessage(state) {
    return state.motd.message;
  },
  curatedPlugins: function curatedPlugins(state) {
    return state.curatedPlugins;
  }
};
/* harmony default export */ var app = ({
  namespaced: true,
  state: app_state,
  mutations: app_mutations,
  actions: app_actions,
  getters: app_getters
});
// CONCATENATED MODULE: ./src/store/modules/user.js


vue_runtime_esm["a" /* default */].use(vuex_esm["a" /* default */]);
var user_state = {
  loggedOnPerson: {},
  repoInit: {
    ssoLogin: null,
    ssoLogout: null,
    ssoPublicKey: null
  },
  lastLogin: null
};
var user_mutations = {
  loggedOnPerson: function loggedOnPerson(state, personObj) {
    state.loggedOnPerson = personObj;
    if (window.EcIdentityManager.default.ids.length > 0) {
      state.lastLogin = window.EcIdentityManager.default.ids[0].lastLogin;
    } else {
      state.lastLogin = null;
    }
  },
  repositorySsoOptions: function repositorySsoOptions(state, repoInit) {
    state.repoInit.ssoLogin = repoInit.ssoLogin;
    state.repoInit.ssoLogout = repoInit.ssoLogout;
    state.repoInit.ssoPublicKey = repoInit.ssoPublicKey;
  }
};
var user_actions = {};
var user_getters = {
  loggedOnPerson: function loggedOnPerson(state) {
    return state.loggedOnPerson;
  },
  repositorySsoOptions: function repositorySsoOptions(state) {
    return state.repoInit;
  },
  lastLogin: function lastLogin(state) {
    return state.lastLogin;
  }
};
/* harmony default export */ var user = ({
  namespaced: true,
  state: user_state,
  mutations: user_mutations,
  actions: user_actions,
  getters: user_getters
});
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__("caad");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__("2532");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
var createForOfIteratorHelper = __webpack_require__("b85c");

// CONCATENATED MODULE: ./src/store/modules/crosswalk.js















vue_runtime_esm["a" /* default */].use(vuex_esm["a" /* default */]);
var crosswalk_state = {
  step: 0,
  frameworkSource: null,
  frameworkSourceRelationships: null,
  frameworkTarget: null,
  frameworkTargetRelationships: null,
  relevantExistingAlignmentsMap: null,
  relevantExistingAlignmentsMapLastUpdate: null,
  alignedCompetenciesList: [],
  workingAlignmentsMap: {
    source: '',
    targets: [],
    initialTargets: [],
    removedTargets: [],
    changed: false,
    type: ''
  },
  alignmentsToSave: [],
  alignmentsToDelete: [],
  sourceState: 'ready',
  targetState: 'ready',
  targetNodesToHighlight: [],
  enabledRelationshipTypes: [],
  enabledRelationshipTypesLastUpdate: null
};
var crosswalk_mutations = {
  enabledRelationshipTypesLastUpdate: function enabledRelationshipTypesLastUpdate(state, f) {
    state.enabledRelationshipTypesLastUpdate = f;
  },
  enabledRelationshipTypes: function enabledRelationshipTypes(state, f) {
    state.enabledRelationshipTypes = f;
  },
  targetNodesToHighlight: function targetNodesToHighlight(state, f) {
    state.targetNodesToHighlight = f;
  },
  frameworkSource: function frameworkSource(state, f) {
    state.frameworkSource = f;
  },
  frameworkTarget: function frameworkTarget(state, f) {
    state.frameworkTarget = f;
  },
  frameworkSourceRelationships: function frameworkSourceRelationships(state, f) {
    state.frameworkSourceRelationships = f;
  },
  frameworkTargetRelationships: function frameworkTargetRelationships(state, f) {
    state.frameworkTargetRelationships = f;
  },
  relevantExistingAlignmentsMap: function relevantExistingAlignmentsMap(state, f) {
    state.relevantExistingAlignmentsMap = f;
  },
  relevantExistingAlignmentsMapLastUpdate: function relevantExistingAlignmentsMapLastUpdate(state, f) {
    state.relevantExistingAlignmentsMapLastUpdate = f;
  },
  alignedCompetenciesList: function alignedCompetenciesList(state, f) {
    state.alignedCompetenciesList = f;
  },
  step: function step(state, val) {
    state.step = val;
  },
  workingAlignmentsSource: function workingAlignmentsSource(state, c) {
    state.workingAlignmentsMap.source = c;
  },
  workingAlignmentsTargets: function workingAlignmentsTargets(state, c) {
    state.workingAlignmentsMap.targets = c;
  },
  workingAlignmentsType: function workingAlignmentsType(state, a) {
    state.workingAlignmentsMap.type = a;
  },
  sourceState: function sourceState(state, s) {
    state.sourceState = s;
  },
  targetState: function targetState(state, t) {
    state.targetState = t;
  },
  alignmentsToSave: function alignmentsToSave(state, t) {
    state.alignmentsToSave = t;
  },
  populateAlignedCompetenciesList: function populateAlignedCompetenciesList(state) {
    if (state.relevantExistingAlignmentsMap) {
      var alignedCompetencies = [];
      var sourceComps = Object.keys(state.relevantExistingAlignmentsMap);
      for (var _i = 0, _sourceComps = sourceComps; _i < _sourceComps.length; _i++) {
        var sc = _sourceComps[_i];
        alignedCompetencies.push(sc);
        var alignTypes = Object.keys(state.relevantExistingAlignmentsMap[sc]);
        for (var _i2 = 0, _alignTypes = alignTypes; _i2 < _alignTypes.length; _i2++) {
          var scAt = _alignTypes[_i2];
          var targetIds = Object.keys(state.relevantExistingAlignmentsMap[sc][scAt]);
          for (var _i3 = 0, _targetIds = targetIds; _i3 < _targetIds.length; _i3++) {
            var ti = _targetIds[_i3];
            alignedCompetencies.push(ti);
          }
        }
      }
      state.alignedCompetenciesList = alignedCompetencies;
    }
  },
  populateWorkingAlignmentMap: function populateWorkingAlignmentMap(state) {
    if (state.relevantExistingAlignmentsMap[state.workingAlignmentsMap.source] && state.relevantExistingAlignmentsMap[state.workingAlignmentsMap.source][state.workingAlignmentsMap.type]) {
      var sourceTypeAlignMap = state.relevantExistingAlignmentsMap[state.workingAlignmentsMap.source][state.workingAlignmentsMap.type];
      var targetIds = Object.keys(sourceTypeAlignMap);
      for (var _i4 = 0, _targetIds2 = targetIds; _i4 < _targetIds2.length; _i4++) {
        var ti = _targetIds2[_i4];
        state.workingAlignmentsMap.targets.push(ti);
        state.workingAlignmentsMap.initialTargets.push(ti);
      }
    }
    state.workingAlignmentsMap.changed = false;
  },
  resetFrameworkSourceRelationships: function resetFrameworkSourceRelationships(state) {
    state.frameworkSourceRelationships = null;
    state.relevantExistingAlignmentsMap = null;
  },
  resetFrameworkTargetRelationships: function resetFrameworkTargetRelationships(state) {
    state.frameworkTargetRelationships = null;
    state.relevantExistingAlignmentsMap = null;
  },
  resetCrosswalkFrameworks: function resetCrosswalkFrameworks(state) {
    state.frameworkSource = null;
    state.frameworkTarget = null;
    state.frameworkSourceRelationships = null;
    state.frameworkTargetRelationships = null;
    state.relevantExistingAlignmentsMap = null;
  },
  resetCrosswalkAlignmentsAndState: function resetCrosswalkAlignmentsAndState(state) {
    state.workingAlignmentsMap.source = '';
    state.workingAlignmentsMap.targets = [];
    state.workingAlignmentsMap.initialTargets = [];
    state.workingAlignmentsMap.removedTargets = [];
    state.workingAlignmentsMap.changed = false;
    state.workingAlignmentsMap.type = '';
    state.sourceState = 'ready';
    state.targetState = 'ready';
    state.alignmentsToSave = [];
    state.alignmentsToDelete = [];
  },
  resetCrosswalk: function resetCrosswalk(state) {
    state.step = 0;
    state.workingAlignmentsMap.source = '';
    state.workingAlignmentsMap.targets = [];
    state.workingAlignmentsMap.initialTargets = [];
    state.workingAlignmentsMap.removedTargets = [];
    state.workingAlignmentsMap.changed = false;
    state.workingAlignmentsMap.type = '';
    state.sourceState = 'ready';
    state.targetState = 'ready';
    state.alignmentsToSave = [];
    state.alignmentsToDelete = [];
  },
  resetWorkingAlignmentsMap: function resetWorkingAlignmentsMap(state) {
    state.sourceState = 'ready';
    state.targetState = 'ready';
    state.workingAlignmentsMap = {
      source: '',
      targets: [],
      initialTargets: [],
      removedTargets: [],
      changed: false,
      type: ''
    };
  },
  addWorkingAlignmentsTarget: function addWorkingAlignmentsTarget(state, id) {
    var remTargets = state.workingAlignmentsMap.removedTargets;
    var filteredRemovedTargets = remTargets.filter(function (remTargets) {
      return remTargets !== id;
    });
    state.workingAlignmentsMap.removedTargets = filteredRemovedTargets;
    state.workingAlignmentsMap.targets.push(id);
    if (state.workingAlignmentsMap.removedTargets.length > 0) state.workingAlignmentsMap.changed = true;else {
      var shouldSetToChanged = false;
      var _iterator = Object(createForOfIteratorHelper["a" /* default */])(state.workingAlignmentsMap.targets),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var t = _step.value;
          if (!state.workingAlignmentsMap.initialTargets.includes(t)) {
            shouldSetToChanged = true;
            break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (shouldSetToChanged) state.workingAlignmentsMap.changed = true;else state.workingAlignmentsMap.changed = false;
    }
  },
  removeWorkingAlignmentsTarget: function removeWorkingAlignmentsTarget(state, id) {
    var targets = state.workingAlignmentsMap.targets;
    var filtered = targets.filter(function (target) {
      return target !== id;
    });
    state.workingAlignmentsMap.targets = filtered;
    if (state.workingAlignmentsMap.initialTargets.includes(id)) state.workingAlignmentsMap.removedTargets.push(id);
    if (state.workingAlignmentsMap.removedTargets.length > 0) state.workingAlignmentsMap.changed = true;else {
      var shouldSetToChanged = false;
      var _iterator2 = Object(createForOfIteratorHelper["a" /* default */])(state.workingAlignmentsMap.targets),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var t = _step2.value;
          if (!state.workingAlignmentsMap.initialTargets.includes(t)) {
            shouldSetToChanged = true;
            break;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      if (shouldSetToChanged) state.workingAlignmentsMap.changed = true;else state.workingAlignmentsMap.changed = false;
    }
  },
  removeAlignmentFromRelevantAlignmentsMap: function removeAlignmentFromRelevantAlignmentsMap(state, alignProps) {
    if (state.relevantExistingAlignmentsMap[alignProps.source]) {
      if (state.relevantExistingAlignmentsMap[alignProps.source][alignProps.type]) {
        if (state.relevantExistingAlignmentsMap[alignProps.source][alignProps.type][alignProps.target]) {
          var ream = state.relevantExistingAlignmentsMap;
          delete ream[alignProps.source][alignProps.type][alignProps.target];
          state.relevantExistingAlignmentsMap = ream;
        }
      }
    }
  },
  addAlignmentToRelevantAlignmentsMap: function addAlignmentToRelevantAlignmentsMap(state, ecaObj) {
    var ream = state.relevantExistingAlignmentsMap;
    if (!ream[ecaObj.source]) ream[ecaObj.source] = {};
    if (!ream[ecaObj.source][ecaObj.relationType]) ream[ecaObj.source][ecaObj.relationType] = {};
    if (!ream[ecaObj.source][ecaObj.relationType][ecaObj.target]) ream[ecaObj.source][ecaObj.relationType][ecaObj.target] = ecaObj;
    state.relevantExistingAlignmentsMap = ream;
  },
  removeAlignmentFromAlignmentsToSave: function removeAlignmentFromAlignmentsToSave(state, alignProps) {
    var newAts = [];
    var _iterator3 = Object(createForOfIteratorHelper["a" /* default */])(state.alignmentsToSave),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var a = _step3.value;
        if (!(a.source === alignProps.source && a.target === alignProps.target && a.relationType === alignProps.type)) {
          newAts.push(a);
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    state.alignmentsToSave = newAts;
  },
  removeAlignmentFromAlignmentsToDelete: function removeAlignmentFromAlignmentsToDelete(state, alignProps) {
    var newAtd = [];
    var _iterator4 = Object(createForOfIteratorHelper["a" /* default */])(state.alignmentsToDelete),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var a = _step4.value;
        if (!(a.source === alignProps.source && a.target === alignProps.target && a.relationType === alignProps.type)) {
          newAtd.push(a);
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    state.alignmentsToDelete = newAtd;
  },
  appendAlignmentsToDelete: function appendAlignmentsToDelete(state, alignment) {
    state.alignmentsToDelete.push(alignment);
  },
  appendAlignmentsToSave: function appendAlignmentsToSave(state, alignment) {
    state.alignmentsToSave.push(alignment);
  }
};
var crosswalk_actions = {};
var crosswalk_getters = {
  enabledRelationshipTypesLastUpdate: function enabledRelationshipTypesLastUpdate(state) {
    return state.enabledRelationshipTypesLastUpdate;
  },
  enabledRelationshipTypes: function enabledRelationshipTypes(state) {
    return state.enabledRelationshipTypes;
  },
  frameworkSource: function frameworkSource(state) {
    return state.frameworkSource;
  },
  frameworkTarget: function frameworkTarget(state) {
    return state.frameworkTarget;
  },
  frameworkSourceRelationships: function frameworkSourceRelationships(state) {
    return state.frameworkSourceRelationships;
  },
  frameworkTargetRelationships: function frameworkTargetRelationships(state) {
    return state.frameworkTargetRelationships;
  },
  relevantExistingAlignmentsMap: function relevantExistingAlignmentsMap(state) {
    return state.relevantExistingAlignmentsMap;
  },
  relevantExistingAlignmentsMapLastUpdate: function relevantExistingAlignmentsMapLastUpdate(state) {
    return state.relevantExistingAlignmentsMapLastUpdate;
  },
  workingAlignmentsSource: function workingAlignmentsSource(state) {
    return state.workingAlignmentsMap.source;
  },
  workingAlignmentsTargets: function workingAlignmentsTargets(state) {
    return state.workingAlignmentsMap.targets;
  },
  workingAlignmentsType: function workingAlignmentsType(state, a) {
    return state.workingAlignmentsMap.type;
  },
  sourceState: function sourceState(state) {
    return state.sourceState;
  },
  targetState: function targetState(state) {
    return state.targetState;
  },
  alignmentsToSave: function alignmentsToSave(state) {
    return state.alignmentsToSave;
  },
  alignmentsToDelete: function alignmentsToDelete(state) {
    return state.alignmentsToDelete;
  },
  alignedCompetenciesList: function alignedCompetenciesList(state) {
    return state.alignedCompetenciesList;
  }
};
/* harmony default export */ var crosswalk = ({
  namespaced: true,
  state: crosswalk_state,
  mutations: crosswalk_mutations,
  actions: crosswalk_actions,
  getters: crosswalk_getters
});
// CONCATENATED MODULE: ./src/store/modules/environment.js


vue_runtime_esm["a" /* default */].use(vuex_esm["a" /* default */]);
var environment_state = {
  cassApiLocation: ''
};
var environment_mutations = {
  cassApiLocation: function cassApiLocation(state, f) {
    state.cassApiLocation = f;
  }
};
var environment_actions = {};
var environment_getters = {
  cassApiLocation: function cassApiLocation(state) {
    return state.cassApiLocation;
  }
};
/* harmony default export */ var environment = ({
  namespaced: true,
  state: environment_state,
  mutations: environment_mutations,
  actions: environment_actions,
  getters: environment_getters
});
// CONCATENATED MODULE: ./src/store/modules/configuration.js
var configuration_state = {
  CONFIG_SEARCH_SIZE: 10000,
  DEFAULT_CONFIGURATION_TYPE: 'Configuration',
  DEFAULT_CONFIGURATION_CONTEXT: 'https://schema.cassproject.org/0.4/',
  LANG_STRING_RANGE: 'http://www.w3.org/2000/01/rdf-schema#langString',
  DEFAULT_HEADING: "General",
  LEVEL_SEARCH_SIZE: 10000,
  PERSON_SEARCH_SIZE: 10000,
  DEFAULT_CUSTOM_PROPERTY_CONTEXT: 'https://schema.cassproject.org/0.4/',
  DEFAULT_CUSTOM_PROPERTY_RANGE: 'http://schema.org/Text',
  defaultBrowserConfig: '',
  defaultBrowserConfigName: '',
  localDefaultBrowserConfig: '',
  configBusy: false,
  configList: [],
  configView: 'list',
  currentConfig: {},
  showConfirmDeleteConfigModal: false,
  showMustBeLoggedInModal: false,
  showBrowserConfigSetModal: false,
  configToDelete: {},
  availableConcepts: []
};
var configuration_mutations = {
  setConfigToDelete: function setConfigToDelete(state, val) {
    state.configToDelete = val;
  },
  setShowMustBeLoggedInModal: function setShowMustBeLoggedInModal(state, val) {
    state.showMustBeLoggedInModal = val;
  },
  setShowBrowserConfigSetModal: function setShowBrowserConfigSetModal(state, val) {
    state.showBrowserConfigSetModal = val;
  },
  setShowConfirmDeleteConfigModal: function setShowConfirmDeleteConfigModal(state, val) {
    state.showConfirmDeleteConfigModal = val;
  },
  setCurrentConfig: function setCurrentConfig(state, val) {
    state.currentConfig = val;
  },
  setConfigView: function setConfigView(state, val) {
    state.configView = val;
  },
  setConfigList: function setConfigList(state, val) {
    state.setConfigList = val;
  },
  setConfigBusy: function setConfigBusy(state, val) {
    state.configBusy = val;
  },
  setDefaultBrowserConfig: function setDefaultBrowserConfig(state, val) {
    state.defaultBrowserConfig = val;
  },
  setDefaultBrowserConfigName: function setDefaultBrowserConfigName(state, val) {
    state.defaultBrowserConfigName = val;
  },
  setLocalDefaultBrowserConfig: function setLocalDefaultBrowserConfig(state, val) {
    state.localDefaultBrowserConfig = val;
  },
  setAvailableConcepts: function setAvailableConcepts(state, val) {
    state.availableConcepts = val;
  },
  setAvailableTypes: function setAvailableTypes(state, val) {
    state.availableTypes = val;
  }
};
var configuration_actions = {};
var configuration_getters = {
  configToDelete: function configToDelete(state) {
    return state.configToDelete;
  },
  showConfirmDeleteConfigModal: function showConfirmDeleteConfigModal(state) {
    return state.showConfirmDeleteConfigModal;
  },
  showMustBeLoggedInModal: function showMustBeLoggedInModal(state) {
    return state.showMustBeLoggedInModal;
  },
  showBrowserConfigSetModal: function showBrowserConfigSetModal(state) {
    return state.showBrowserConfigSetModal;
  },
  LEVEL_SEARCH_SIZE: function LEVEL_SEARCH_SIZE(state) {
    return state.LEVEL_SEARCH_SIZE;
  },
  GROUP_SEARCH_SIZE: function GROUP_SEARCH_SIZE(state) {
    return state.GROUP_SEARCH_SIZE;
  },
  PERSON_SEARCH_SIZE: function PERSON_SEARCH_SIZE(state) {
    return state.PERSON_SEARCH_SIZE;
  },
  DEFAULT_CUSTOM_PROPERTY_CONTEXT: function DEFAULT_CUSTOM_PROPERTY_CONTEXT(state) {
    return state.DEFAULT_CUSTOM_PROPERTY_CONTEXT;
  },
  DEFAULT_CUSTOM_PROPERTY_RANGE: function DEFAULT_CUSTOM_PROPERTY_RANGE(state) {
    return state.DEFAULT_CUSTOM_PROPERTY_RANGE;
  },
  DEFAULT_CONFIGURATION_TYPE: function DEFAULT_CONFIGURATION_TYPE(state) {
    return state.DEFAULT_CONFIGURATION_TYPE;
  },
  DEFAULT_CONFIGURATION_CONTEXT: function DEFAULT_CONFIGURATION_CONTEXT(state) {
    return state.DEFAULT_CONFIGURATION_CONTEXT;
  },
  LANG_STRING_RANGE: function LANG_STRING_RANGE(state) {
    return state.LANG_STRING_RANGE;
  },
  DEFAULT_HEADING: function DEFAULT_HEADING(state) {
    return state.DEFAULT_HEADING;
  },
  CONFIG_SEARCH_SIZE: function CONFIG_SEARCH_SIZE(state) {
    return state.CONFIG_SEARCH_SIZE;
  },
  currentConfig: function currentConfig(state) {
    return state.currentConfig;
  },
  configView: function configView(state) {
    return state.configView;
  },
  configList: function configList(state) {
    return state.configList;
  },
  defaultBrowserConfig: function defaultBrowserConfig(state) {
    return state.defaultBrowserConfig;
  },
  defaultBrowserConfigName: function defaultBrowserConfigName(state) {
    return state.defaultBrowserConfigName;
  },
  localDefaultBrowserConfig: function localDefaultBrowserConfig(state) {
    return state.localDefaultBrowserConfig;
  },
  configBusy: function configBusy(state) {
    return state.configBusy;
  },
  availableConcepts: function availableConcepts(state) {
    return state.availableConcepts;
  },
  availableTypes: function availableTypes(state) {
    return state.availableTypes;
  }
};
/* harmony default export */ var configuration = ({
  namespaced: true,
  state: configuration_state,
  mutations: configuration_mutations,
  actions: configuration_actions,
  getters: configuration_getters
});
// CONCATENATED MODULE: ./src/store/modules/featuresEnabled.js


vue_runtime_esm["a" /* default */].use(vuex_esm["a" /* default */]);
var featuresEnabled_state = {
  crosswalkEnabled: true,
  userManagementEnabled: true,
  configurationsEnabled: true,
  searchByOwnerNameEnabled: true,
  pluginsEnabled: true,
  loginEnabled: true,
  legacyLoginEnabled: true,
  apiLoginEnabled: false,
  shareEnabled: true,
  shareLink: false,
  ownedByMe: false
};
var featuresEnabled_mutations = {
  crosswalkEnabled: function crosswalkEnabled(state, bool) {
    state.crosswalkEnabled = bool;
  },
  userManagementEnabled: function userManagementEnabled(state, bool) {
    state.userManagementEnabled = bool;
  },
  configurationsEnabled: function configurationsEnabled(state, bool) {
    state.configurationsEnabled = bool;
  },
  searchByOwnerNameEnabled: function searchByOwnerNameEnabled(state, bool) {
    state.searchByOwnerNameEnabled = bool;
  },
  pluginsEnabled: function pluginsEnabled(state, bool) {
    state.pluginsEnabled = bool;
  },
  loginEnabled: function loginEnabled(state, bool) {
    state.loginEnabled = bool;
  },
  apiLoginEnabled: function apiLoginEnabled(state, bool) {
    state.apiLoginEnabled = bool;
  },
  legacyLoginEnabled: function legacyLoginEnabled(state, bool) {
    state.legacyLoginEnabled = bool;
  },
  shareEnabled: function shareEnabled(state, bool) {
    state.shareEnabled = bool;
  },
  shareLink: function shareLink(state, bool) {
    state.shareLink = bool;
  },
  ownedByMe: function ownedByMe(state, bool) {
    state.ownedByMe = bool;
  }
};
var featuresEnabled_actions = {};
var featuresEnabled_getters = {
  legacyLoginEnabled: function legacyLoginEnabled(state) {
    return state.legacyLoginEnabled;
  },
  apiLoginEnabled: function apiLoginEnabled(state) {
    return state.apiLoginEnabled;
  },
  ownedByMe: function ownedByMe(state) {
    return state.ownedByMe;
  }
};
/* harmony default export */ var featuresEnabled = ({
  namespaced: true,
  state: featuresEnabled_state,
  mutations: featuresEnabled_mutations,
  actions: featuresEnabled_actions,
  getters: featuresEnabled_getters
});
// CONCATENATED MODULE: ./src/store/index.js










vue_runtime_esm["a" /* default */].use(vuex_esm["a" /* default */]);
/* harmony default export */ var store = __webpack_exports__["a"] = (new vuex_esm["a" /* default */].Store({
  modules: {
    lode: lode["a" /* default */],
    editor: editor,
    app: app,
    user: user,
    crosswalk: crosswalk,
    environment: environment,
    featuresEnabled: featuresEnabled,
    configuration: configuration
  }
}));

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "532b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DynamicModal_vue_vue_type_style_index_0_id_704681ec_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("66ff");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DynamicModal_vue_vue_type_style_index_0_id_704681ec_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DynamicModal_vue_vue_type_style_index_0_id_704681ec_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "560b":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "56d7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e260");
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_home_runner_work_cass_editor_cass_editor_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("e6cf");
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_home_runner_work_cass_editor_cass_editor_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("cca6");
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_home_runner_work_cass_editor_cass_editor_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("a79d");
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_home_runner_work_cass_editor_cass_editor_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("d3b7");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_values_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("07ac");
/* harmony import */ var core_js_modules_es_object_values_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_values_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("ac1f");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("841c");
/* harmony import */ var core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("14d9");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("5319");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("c7eb");
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("1da1");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("2b0e");
/* harmony import */ var vue_progressbar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("26b9");
/* harmony import */ var vue_progressbar__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(vue_progressbar__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("3dfd");
/* harmony import */ var _scss_theme_scss__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("560b");
/* harmony import */ var _scss_theme_scss__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_scss_theme_scss__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _scss_styles_scss__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("b3be");
/* harmony import */ var _scss_styles_scss__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_scss_styles_scss__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("41cb");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("2f62");
/* harmony import */ var v_clipboard__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("4ae6");
/* harmony import */ var v_clipboard__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(v_clipboard__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _store_index_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__("4360");
/* harmony import */ var vue_infinite_loading__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__("e166");
/* harmony import */ var vue_infinite_loading__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(vue_infinite_loading__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var vue_resource__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__("28dd");
/* harmony import */ var vue_observe_visibility__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__("85fe");
/* harmony import */ var vue_async_computed__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__("3003");



































var VueScrollTo = __webpack_require__("f13c");
var _global = global,
  originalFetch = _global.fetch;
var PENDING_REQUESTS = 0;
var MAX_REQUESTS_COUNT = 10;
var INTERVAL_MS = 10;
global.fetch = /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"])().mark(function _callee() {
  var _len,
    args,
    _key,
    resource,
    config,
    response,
    _args = arguments;
  return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"])().wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        for (_len = _args.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = _args[_key];
        }
        resource = args[0], config = args[1]; // request interceptor here
        if (!(PENDING_REQUESTS >= MAX_REQUESTS_COUNT)) {
          _context.next = 6;
          break;
        }
        return _context.abrupt("return", new Promise(function (resolve) {
          setTimeout(function () {
            var _global2;
            resolve((_global2 = global).fetch.apply(_global2, args));
          }, INTERVAL_MS);
        }));
      case 6:
        PENDING_REQUESTS++;
        _context.prev = 7;
        if (config != null && config.headers != null && Object.values(config.headers).length === 0) {
          delete config.headers;
        }
        _context.next = 11;
        return originalFetch(resource, config);
      case 11:
        response = _context.sent;
        return _context.abrupt("return", response);
      case 13:
        _context.prev = 13;
        PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1);
        return _context.finish(13);
      case 16:
      case "end":
        return _context.stop();
    }
  }, _callee, null, [[7,, 13, 16]]);
}));
__webpack_require__("b904");
global.UUID = __webpack_require__("37a07");
var options = {
  color: '#68C8DB',
  failedColor: '#D74C44',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
};
vue__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"].use(vue_progressbar__WEBPACK_IMPORTED_MODULE_13___default.a, options);
vue__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"].use(__webpack_require__("2ead"));
vue__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"].use(vuex__WEBPACK_IMPORTED_MODULE_18__[/* default */ "a"]);
vue__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"].use(v_clipboard__WEBPACK_IMPORTED_MODULE_19___default.a);
vue__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"].use(VueScrollTo, {
  container: "#framework",
  duration: 500,
  easing: "ease",
  offset: -150,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
});
vue__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"].use(vue_infinite_loading__WEBPACK_IMPORTED_MODULE_21___default.a);
vue__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"].use(vue_resource__WEBPACK_IMPORTED_MODULE_22__[/* default */ "a"]);
vue__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"].use(vue_observe_visibility__WEBPACK_IMPORTED_MODULE_23__[/* default */ "a"]);
vue__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"].use(vue_async_computed__WEBPACK_IMPORTED_MODULE_24__[/* default */ "a"]);

// directive for clicking outside elements and performing an action
// add v-click-outside="method" to parent element to do something
vue__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"].directive('click-outside', {
  bind: function bind(element, binding, vnode) {
    element.clickOutsideEvent = function (event) {
      if (!(element === event.target || element.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', element.clickOutsideEvent);
  },
  unbind: function unbind(element) {
    document.body.removeEventListener('click', element.clickOutsideEvent);
  }
});
EcRepository.caching = true;
vue__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"].config.productionTip = false;
// Vue.config.silent = true;
vue__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"].config.warnHandler = function (msg, vm, trace) {
  if (msg === 'Invalid prop: type check failed for prop "clickToLoad". Expected Boolean, got String with value "true".') return;
  if (msg === 'Avoid using non-primitive value as key, use string/number value instead.') return;
  if (msg === "Duplicate keys detected: '[object Object]'. This may cause an update error.") return;
  appError("[Vue warn]: " + msg + trace);
  // `trace` is the component hierarchy trace
};
global.appLog = function (x) {
  /* eslint-disable no-console */
  if (false) {}
  /* eslint-enable no-console */
};
global.appError = function (x) {
  /* eslint-disable no-console */
  if (false) {}
  /* eslint-enable no-console */
};
var queryParams = function queryParams() {
  if (window.document.location.search == null) {
    return {};
  }
  var hashSplit = window.document.location.search.split("?");
  if (hashSplit.length > 1) {
    var o = {};
    var paramString = hashSplit[1];
    var parts = paramString.split("&");
    for (var i = 0; i < parts.length; i++) {
      if (o[parts[i].split("=")[0]]) {
        // Allow multiple values
        o[parts[i].split("=")[0]] = [o[parts[i].split("=")[0]]];
        o[parts[i].split("=")[0]].push(decodeURIComponent(parts[i].replace(parts[i].split("=")[0] + "=", "")));
      } else {
        o[parts[i].split("=")[0]] = decodeURIComponent(parts[i].replace(parts[i].split("=")[0] + "=", ""));
      }
    }
    return o;
  }
  return {};
};
window.queryParams = queryParams();
window.app = new vue__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"]({
  router: _router__WEBPACK_IMPORTED_MODULE_17__[/* default */ "a"],
  store: _store_index_js__WEBPACK_IMPORTED_MODULE_20__[/* default */ "a"],
  render: function render(h) {
    return h(_App_vue__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"]);
  }
}).$mount('#app');
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "5701":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_414a336e_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9e35");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_414a336e_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_414a336e_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ 6:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "66ff":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "8533":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5530");
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("b85c");
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("c7eb");
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("1da1");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("b64b");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("e9c4");
/* harmony import */ var core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_string_ends_with_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("8a79");
/* harmony import */ var core_js_modules_es_string_ends_with_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_ends_with_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_string_starts_with_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("2ca0");
/* harmony import */ var core_js_modules_es_string_starts_with_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_starts_with_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("14d9");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("b0c0");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("ac1f");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("841c");
/* harmony import */ var core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("5319");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_web_self_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("c73d");
/* harmony import */ var core_js_modules_web_self_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_self_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("2f62");
/* harmony import */ var _mixins_common_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("872c");
/* harmony import */ var _components_modals_DynamicModal_vue__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("3392");
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("9224");
var _package_json__WEBPACK_IMPORTED_MODULE_17___namespace = /*#__PURE__*/__webpack_require__.t("9224", 1);


















/* harmony default export */ __webpack_exports__["a"] = ({
  mixins: [_mixins_common_js__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"]],
  name: "App",
  components: {
    DynamicModal: _components_modals_DynamicModal_vue__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"]
  },
  data: function data() {
    return {
      navBarActive: false,
      repo: window.repo,
      itemsSaving: 0,
      showNav: true,
      GROUP_SEARCH_SIZE: 10000,
      linkedPerson: null,
      addAnotherDirectory: false,
      appVersion: _package_json__WEBPACK_IMPORTED_MODULE_17__[/* version */ "a"]
    };
  },
  $router: function $router(to, from) {
    if (to.path !== from.path) {
      this.navBarActive = false;
    }
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('message', this.cappend);
    window.removeEventListener("message", this.messageListener);
  },
  methods: {
    initializeApp: function initializeApp() {
      var _this = this;
      if (this.appVersion) {
        document.title = "CaSS Editor " + this.appVersion;
      }
      var server = window.origin + "/api/";
      if (window.location.origin === "https://cassproject.github.io") {
        server = "https://dev.cassproject.org/api/";
      } else if (Object({"NODE_ENV":"production","BASE_URL":""}).VUE_APP_SELECTEDSERVER) {
        server = Object({"NODE_ENV":"production","BASE_URL":""}).VUE_APP_SELECTEDSERVER;
      }
      var cassApiLocation = "https://dev.rest.api.cassproject.org/";
      this.$store.commit('environment/cassApiLocation', cassApiLocation);
      var me = this;
      if (this.$route.query) {
        var queryParams = JSON.parse(JSON.stringify(this.$route.query));
        for (var key in window.queryParams) {
          queryParams[key] = window.queryParams[key];
        }
        this.$store.commit('editor/queryParams', queryParams);
        if (this.queryParams.server) {
          if (this.queryParams.server.endsWith && this.queryParams.server.endsWith("/") === false) {
            this.queryParams.server += "/";
          }
          server = this.queryParams.server;
        }
        if (this.queryParams.concepts === 'true') {
          this.$store.commit('editor/conceptMode', true);
          this.$store.commit('editor/progressionMode', false);
        }
        if (this.queryParams.ceasnDataFields === 'true') {
          this.$store.commit('featuresEnabled/configurationsEnabled', false);
          this.$store.commit('featuresEnabled/userManagementEnabled', false);
          this.$store.commit('featuresEnabled/searchByOwnerNameEnabled', false);
          this.$store.commit('featuresEnabled/loginEnabled', false);
          this.$store.commit('featuresEnabled/pluginsEnabled', false);
        }
        if (this.queryParams.user === "wait") {
          this.$store.commit('featuresEnabled/shareEnabled', false);
          this.$store.commit('featuresEnabled/shareLink', true);
        }
        // Add support for show=mine. This param was already being used by CE, but was no longer functioning as expected.
        //  OwnedByMe offers the expected functionality. Including show=mine for compatibility with existing clients.
        if (this.queryParams.ownedByMe === "true" || this.queryParams.show === "mine") {
          this.$store.commit('featuresEnabled/ownedByMe', true);
        }
      }
      var r = new EcRepository();
      r.selectedServer = server;
      r.init(server, function () {
        appLog("Repository initialized");
        if (EcIdentityManager.default.ids.length === 0) {
          EcIdentityManager.default.readContacts();
          EcIdentityManager.default.readIdentities();
        }
        if (EcIdentityManager.default.ids && EcIdentityManager.default.ids.length > 0) {
          me.findLinkedPersonForIdentity();
        }
        if (EcRepository.defaultPlugins && EcRepository.defaultPlugins.length > 0) {
          var plugins = [];
          for (var each in EcRepository.defaultPlugins) {
            var url = EcRepository.defaultPlugins[each];
            if (url.startsWith('/')) {
              url = window.location.origin + url;
            }
            plugins.push({
              "id": each,
              "url": url
            });
          }
          me.$store.commit('app/setCuratedPlugins', plugins);
        }
      }, appError, /*#__PURE__*/function () {
        var _ref = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().mark(function _callee(loginInfo) {
          var pers, _i, ppk, ident, per;
          return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                r.fetchServerAdminKeys(function () {}, appError);
                _this.$store.commit('user/repositorySsoOptions', loginInfo);
                if (loginInfo.ssoPublicKey != null && loginInfo.ssoLogin == null && loginInfo.ssoViaP1 == null) {
                  _this.$store.commit('featuresEnabled/loginEnabled', false);
                  _this.$store.commit('featuresEnabled/userManagementEnabled', false);
                }
                if (loginInfo.ssoLogin != null) {
                  _this.$store.commit('featuresEnabled/apiLoginEnabled', true);
                }
                if (loginInfo.banner) {
                  _this.$store.commit('app/setBanner', loginInfo.banner);
                }
                if (loginInfo.motd) {
                  _this.$store.commit('app/setMotd', loginInfo.motd);
                  if (loginInfo.motd.message) {
                    _this.$store.commit('app/showModal', {
                      component: 'MessageOfTheDay'
                    });
                  }
                }
                if (loginInfo.corsOrigins) {
                  global.corsOrigins = loginInfo.corsOrigins;
                }
                if (!(window.EcIdentityManager.default.ids.length > 0)) {
                  _context.next = 18;
                  break;
                }
                _context.prev = 8;
                _context.next = 11;
                return window.EcPerson.getByPk(r, window.EcIdentityManager.default.ids[0].ppk.toPk());
              case 11:
                pers = _context.sent;
                if (pers != null) {
                  window.EcIdentityManager.default.ids[0].displayName = pers.getName();
                }
                _context.next = 18;
                break;
              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](8);
                window.EcIdentityManager.default.ids[0].displayName = "Unknown Person";
              case 18:
                if (!(loginInfo.ssoAdditionalPublicKeys != null)) {
                  _context.next = 38;
                  break;
                }
                _i = 0;
              case 20:
                if (!(_i < loginInfo.ssoAdditionalPublicKeys.length)) {
                  _context.next = 38;
                  break;
                }
                ppk = window.EcPpkFacade.fromPem(loginInfo.ssoAdditionalPublicKeys[_i]);
                ident = new window.EcIdentity();
                _context.prev = 23;
                _context.next = 26;
                return window.EcPerson.getByPk(r, ppk.toPk());
              case 26:
                per = _context.sent;
                if (per != null) {
                  ident.displayName = per.getName();
                }
                _context.next = 33;
                break;
              case 30:
                _context.prev = 30;
                _context.t1 = _context["catch"](23);
                ident.displayName = "Unknown Person";
              case 33:
                ident.ppk = ppk;
                window.EcIdentityManager.default.addIdentity(ident);
              case 35:
                _i++;
                _context.next = 20;
                break;
              case 38:
                _this.$store.dispatch('app/refreshDirectories');
              case 39:
              case "end":
                return _context.stop();
            }
          }, _callee, null, [[8, 15], [23, 30]]);
        }));
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
      window.repo = r;
      this.repo = r;
      try {
        window.addEventListener('message', this.cappend, false);
      } catch (e) {
        appError(e);
      }
      this.openWebSocket(r);
      if (window.addEventListener) {
        window.addEventListener("message", this.messageListener, false);
      } else {
        window.attachEvent("onmessage", this.messageListener);
      }
      this.loadIdentity(function () {
        if (me.queryParams) {
          if (me.queryParams.frameworkId) {
            if (me.$store.getters['editor/conceptMode'] === true) {
              EcConceptScheme.get(me.queryParams.frameworkId, function (success) {
                me.$store.commit('editor/framework', success);
                me.$store.commit('editor/clearFrameworkCommentData');
                me.$store.commit('app/setCanViewComments', me.canViewCommentsCurrentFramework());
                me.$store.commit('app/setCanAddComments', me.canAddCommentsCurrentFramework());
                me.$router.push({
                  name: "conceptScheme",
                  params: {
                    frameworkId: me.queryParams.frameworkId
                  }
                });
              }, appError);
            } else if (me.$store.getters['editor/progressionMode'] === true) {
              EcConceptScheme.get(me.queryParams.frameworkId, function (success) {
                me.$store.commit('editor/framework', success);
                me.$store.commit('editor/clearFrameworkCommentData');
                me.$store.commit('app/setCanViewComments', me.canViewCommentsCurrentFramework());
                me.$store.commit('app/setCanAddComments', me.canAddCommentsCurrentFramework());
                me.$router.push({
                  name: "progressionModel",
                  params: {
                    frameworkId: me.queryParams.frameworkId
                  }
                });
              }, appError);
            } else {
              EcFramework.get(me.queryParams.frameworkId, function (success) {
                me.$store.commit('editor/framework', success);
                me.$store.commit('editor/clearFrameworkCommentData');
                me.$store.commit('app/setCanViewComments', me.canViewCommentsCurrentFramework());
                me.$store.commit('app/setCanAddComments', me.canAddCommentsCurrentFramework());
                me.$router.push({
                  name: "framework",
                  params: {
                    frameworkId: me.queryParams.frameworkId
                  }
                });
              }, appError);
            }
          }
          if (me.queryParams.directoryId) {
            EcDirectory.get(me.queryParams.directoryId, function (success) {
              me.$store.commit('app/selectDirectory', success);
              me.$router.push({
                name: "directory"
              });
            }, appError);
          }
          if (me.queryParams.action === "import") {
            me.$router.push({
              name: "import"
            });
          }
          if (me.queryParams.action === "add") {
            me.createNew();
          }
          if ((me.queryParams.ceasnDataFields === "true" || me.queryParams.frameworksPage === "true") && !me.queryParams.action && !me.queryParams.frameworkId) {
            if (me.queryParams.collections === "true") {
              me.$store.commit('editor/collectionMode', true);
              me.$router.push({
                name: "collections"
              });
            } else if (me.$store.getters['editor/conceptMode'] === true) {
              me.$router.push({
                name: "concepts"
              });
            } else if (me.$store.getters['editor/progressionMode'] === true) {
              me.$router.push({
                name: "progressionLevels"
              });
            } else if (me.$route.name !== 'frameworks' && me.$route.name !== 'concepts' && me.$route.name !== 'progressionLevels') {
              me.$router.push({
                name: "frameworks"
              });
            }
          }
        }
      });
      if (parent !== window) {
        var oHead = document.getElementsByTagName("head")[0];
        var arrStyleSheets = parent.document.getElementsByTagName("*");
        for (var i = 0; i < arrStyleSheets.length; i++) {
          if (arrStyleSheets[i].tagName.toLowerCase() === "link" || arrStyleSheets[i].tagName.toLowerCase() === "style") {
            if (arrStyleSheets[i].attributes.inherit != null) {
              oHead.appendChild(arrStyleSheets[i].cloneNode(true));
            }
          }
        }
        try {
          this.importParentStyles();
          // eslint-disable-next-line no-empty
        } catch (e) {}
      }
      if (this.queryParams.css != null) {
        var ss = document.createElement("link");
        ss.type = "text/css";
        ss.rel = "stylesheet";
        ss.href = this.queryParams.css;
        document.getElementsByTagName("head")[0].appendChild(ss);
      }
      // Preload schema so large frameworks are faster
      var types = ["https://schema.cassproject.org/0.4", "https://schema.cassproject.org/0.4/Directory", "https://schema.cassproject.org/0.4/", "https://schema.cassproject.org/0.4/Directory/", "https://schema.cassproject.org/0.4/skos/ConceptScheme/", "https://schema.cassproject.org/0.4/skos/", "https://schema.cassproject.org/0.4/Framework/", "https://schema.cassproject.org/0.4/skos/ConceptScheme", "https://schema.cassproject.org/0.4/skos/Concept", "https://schema.cassproject.org/0.4/skos", "https://schema.cassproject.org/0.4/Framework", "https://schema.cassproject.org/0.4/Competency", "https://schema.cassproject.org/0.4/skos/Concept/", "https://schema.cassproject.org/0.4/Competency/"];
      var _loop = function _loop() {
        var type = _types[_i2];
        if (_this.$store.state.lode.schemata[type] === undefined && type.indexOf("EncryptedValue") === -1) {
          var index = type.indexOf('schema.cassproject.org');
          var url = type;
          if (index !== -1) {
            url = url.substring(index);
            url = window.location.origin + window.location.pathname + url + "/index.json-ld";
          }
          EcRemote.getExpectingObject("", url, /*#__PURE__*/function () {
            var _ref2 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().mark(function _callee2(context) {
              var expanded;
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    me.$store.commit('lode/rawSchemata', {
                      id: type,
                      obj: context
                    });
                    _context2.prev = 1;
                    _context2.next = 4;
                    return jsonld.expand(context);
                  case 4:
                    expanded = _context2.sent;
                    _context2.next = 10;
                    break;
                  case 7:
                    _context2.prev = 7;
                    _context2.t0 = _context2["catch"](1);
                    appError(_context2.t0);
                  case 10:
                    me.$store.dispatch('lode/schemata', {
                      id: type,
                      obj: expanded
                    });
                  case 11:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2, null, [[1, 7]]);
            }));
            return function (_x2) {
              return _ref2.apply(this, arguments);
            };
          }(), function () {});
        }
      };
      for (var _i2 = 0, _types = types; _i2 < _types.length; _i2++) {
        _loop();
      }
      EcRemote.getExpectingString(window.repo.selectedServer, "badge/pk", function (badgePk) {
        _this.$store.commit('editor/setBadgePk', EcPk.fromPem(badgePk));
      }, appError);
      setTimeout(function () {
        // If crypto workers haven't loaded forgeAsync.js at repo init, need to try again to load the identity.
        if (_this.linkedPerson == null && EcIdentityManager.default.ids && EcIdentityManager.default.ids.length > 0) {
          me.findLinkedPersonForIdentity();
        }
      }, 1000);
    },
    onSidebarEvent: function onSidebarEvent() {
      this.showSideNav = !this.showSideNav;
    },
    findLinkedPersonForIdentity: function findLinkedPersonForIdentity() {
      appLog("Finding linked person for identity...");
      window.EcPerson.getByPk(window.repo, window.EcIdentityManager.default.ids[0].ppk.toPk(), this.findLinkedPersonPersonSearchSuccess, this.findLinkedPersonPersonSearchFailure);
    },
    findLinkedPersonPersonSearchSuccess: function findLinkedPersonPersonSearchSuccess(ecRemoteLda) {
      if (!EcArray.isArray(ecRemoteLda)) {
        ecRemoteLda = [ecRemoteLda];
      }
      appLog("Linked person person search success: ");
      appLog(ecRemoteLda);
      var matchingPersonRecordFound = false;
      var _iterator = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(ecRemoteLda),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var ecrld = _step.value;
          var ep = new EcPerson();
          ep.copyFrom(ecrld);
          if (ep.getGuid().equals(EcIdentityManager.default.ids[0].ppk.toPk().fingerprint())) {
            matchingPersonRecordFound = true;
            this.$store.commit('user/loggedOnPerson', ep);
            this.linkedPerson = ep;
            appLog('Matching person record found: ');
            appLog(ep);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (matchingPersonRecordFound) this.addGroupIdentities();
    },
    findLinkedPersonPersonSearchFailure: function findLinkedPersonPersonSearchFailure(msg) {
      appLog('Linked person person search failure: ' + msg);
    },
    searchRepositoryForGroupsSuccess: function searchRepositoryForGroupsSuccess(ecoa) {
      var linkedPersonShortId = this.linkedPerson.shortId();
      if (ecoa && ecoa.length > 0) {
        var _iterator2 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(ecoa),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var eco = _step2.value;
            if (eco.employee && eco.employee.length > 0) {
              var _iterator3 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(eco.employee),
                _step3;
              try {
                for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                  var e = _step3.value;
                  if (e.equals(linkedPersonShortId)) {
                    this.addGroupIdentity(eco);
                    break;
                  }
                }
              } catch (err) {
                _iterator3.e(err);
              } finally {
                _iterator3.f();
              }
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        if (this.$route.name === 'frameworks' || this.$route.name === 'concepts' || this.$route.name === 'progressionLevels') {
          this.$store.dispatch('app/refreshDirectories');
          this.$store.commit('app/refreshSearch', true);
        }
      }
    },
    searchRepositoryForGroupsFailure: function searchRepositoryForGroupsFailure(msg) {
      appLog("Group search failure: " + msg);
    },
    addGroupIdentities: function addGroupIdentities() {
      appLog("Finding assigned groups...");
      var paramObj = {};
      paramObj.size = this.GROUP_SEARCH_SIZE;
      EcOrganization.search(window.repo, '', this.searchRepositoryForGroupsSuccess, this.searchRepositoryForGroupsFailure, paramObj);
    },
    addGroupIdentity: function () {
      var _addGroupIdentity = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().mark(function _callee3(group) {
        var groupPpkSet, i, gPpk, grpIdent;
        return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return group.getOrgKeys();
            case 3:
              groupPpkSet = _context3.sent;
              appLog("Adding group identities: " + "(" + group.shortId() + ") - " + group.getName() + " - (" + groupPpkSet.length + ") keys");
              for (i = 0; i < groupPpkSet.length; i++) {
                gPpk = groupPpkSet[i];
                grpIdent = new EcIdentity();
                grpIdent.displayName = group.getName() + " - key[" + i + "]";
                grpIdent.ppk = gPpk;
                EcIdentityManager.default.addIdentityQuietly(grpIdent);
              }
              _context3.next = 10;
              break;
            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](0);
            case 10:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 8]]);
      }));
      function addGroupIdentity(_x3) {
        return _addGroupIdentity.apply(this, arguments);
      }
      return addGroupIdentity;
    }(),
    saveDirectory: function saveDirectory(e) {
      var me = this;
      var dir = new EcDirectory();
      dir.name = e;
      // dir.description = "Test Description";
      dir.generateId(window.repo.selectedServer);
      if (EcIdentityManager.default.ids.length > 0) {
        dir.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
      }
      dir["schema:dateCreated"] = new Date().toISOString();
      dir["schema:dateModified"] = new Date().toISOString();
      // To do: Add other owners and readers
      dir.save(function (success) {
        appLog("Directory saved: " + dir.id);
        me.$store.commit('app/closeModal');
        me.$store.dispatch('app/refreshDirectories');
        if (me.addAnotherDirectory) {
          me.addAnotherDirectory = false;
          me.$nextTick(function () {
            me.$store.commit('app/showModal', {
              component: 'AddDirectory'
            });
          });
        } else {
          me.selectDirectory(dir);
        }
      }, appError, window.repo);
    },
    saveDirectoryAndAddAnother: function saveDirectoryAndAddAnother(e) {
      this.addAnotherDirectory = true;
      this.saveDirectory(e);
    },
    selectDirectory: function selectDirectory(directory) {
      this.$store.commit('app/selectDirectory', directory);
      this.$store.commit('app/rightAsideObject', directory);
      if (this.$router.currentRoute.name !== "directory") {
        this.$router.push({
          name: "directory"
        });
      }
    },
    cappend: function cappend(event) {
      if (event.data.message === "selected") {
        var selectedIds = [];
        for (var i = 0; i < event.data.selected.length; i++) {
          if (event.data.selected[i]["ceasn:exactAlignment"]) {
            selectedIds.push(event.data.selected[i]["ceasn:exactAlignment"]);
          } else if (event.data.selected[i]["@id"]) {
            selectedIds.push(event.data.selected[i]["@id"]);
          } else {
            selectedIds.push(event.data.selected[i]);
          }
        }
        appLog("I got " + event.data.selected.length + " selected items from the iframe");
        appLog(event.data.selected);
      } else if (event.data.message === "back") {
        this.$router.push({
          name: "framework",
          params: {
            frameworkId: this.$store.state.editor.framework.id
          }
        });
      } else if (event.data.message === "highlightedCompetencies") {
        if (!event.data.competencies) {
          return;
        }
        this.queryParams.highlightCompetency = event.data.competencies;
      } else if (event.data.message === "select") {
        if (this.$route.name === 'framework' && this.queryParams.select) {
          this.select();
        }
      }
    },
    openWebSocket: function openWebSocket(r) {
      var connection;
      var me = this;
      // Instead of /ws/custom, will be /ws in next release.
      if (this.queryParams.webSocketOverride == null || this.queryParams.webSocketOverride === undefined) {
        connection = new WebSocket(r.selectedServer.replace(/http/, "ws").replace(/api\//, "ws/custom"));
      } else {
        connection = new WebSocket(this.queryParams.webSocketOverride);
      }
      connection.onopen = function () {
        appLog("WebSocket open.");
      };
      connection.onerror = function (error) {
        appLog(error);
      };

      // Re-establish connection on close.
      connection.onclose = function (evt) {
        appLog(evt);
        me.$store.commit('editor/webSocketBackoffIncrease');
        setTimeout(function () {
          me.openWebSocket(r);
        }, me.$store.state.editor.webSocketBackoff);
      };
      connection.changedObject = /*#__PURE__*/function () {
        var _ref3 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().mark(function _callee4(wut) {
          var a, framework, f, com;
          return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                me.$store.commit('editor/changedObject', wut.shortId());
                // Add new assertions as they come in
                if (!(wut.type === 'Assertion')) {
                  _context4.next = 9;
                  break;
                }
                _context4.next = 4;
                return EcAssertion.get(wut.shortId());
              case 4:
                a = _context4.sent;
                _context4.next = 7;
                return a.getAssertionDate();
              case 7:
                a.assertionDateDecrypted = _context4.sent;
                me.$store.commit('editor/addAssertion', a);
              case 9:
                if (!(me.$route.name !== 'framework' && me.$route.name !== 'conceptScheme' && me.$route.name !== 'progressionModel')) {
                  _context4.next = 11;
                  break;
                }
                return _context4.abrupt("return");
              case 11:
                framework = me.$store.state.editor.framework;
                if (!(new ConceptScheme().isA(wut.getFullType()) || wut["encryptedType"] === "ConceptScheme")) {
                  _context4.next = 27;
                  break;
                }
                if (!(framework != null)) {
                  _context4.next = 27;
                  break;
                }
                if (!(framework.shortId() === wut.shortId())) {
                  _context4.next = 27;
                  break;
                }
                f = new ConceptScheme();
                if (!(wut["encryptedType"] === "ConceptScheme")) {
                  _context4.next = 24;
                  break;
                }
                _context4.t0 = f;
                _context4.next = 20;
                return EcEncryptedValue.fromEncryptedValue(wut);
              case 20:
                _context4.t1 = _context4.sent;
                _context4.t0.copyFrom.call(_context4.t0, _context4.t1);
                _context4.next = 25;
                break;
              case 24:
                f.copyFrom(wut);
              case 25:
                me.$store.commit('editor/framework', f);
                me.spitEvent("frameworkChanged", f.shortId());
              case 27:
                if (!(new EcFramework().isA(wut.getFullType()) || wut["encryptedType"] === "Framework")) {
                  _context4.next = 42;
                  break;
                }
                if (!(framework != null)) {
                  _context4.next = 42;
                  break;
                }
                if (!(framework.shortId() === wut.shortId())) {
                  _context4.next = 42;
                  break;
                }
                f = new EcFramework();
                if (!(wut["encryptedType"] === "Framework")) {
                  _context4.next = 39;
                  break;
                }
                _context4.t2 = f;
                _context4.next = 35;
                return EcEncryptedValue.fromEncryptedValue(wut);
              case 35:
                _context4.t3 = _context4.sent;
                _context4.t2.copyFrom.call(_context4.t2, _context4.t3);
                _context4.next = 40;
                break;
              case 39:
                f.copyFrom(wut);
              case 40:
                me.$store.commit('editor/framework', f);
                me.spitEvent("frameworkChanged", f.shortId());
              case 42:
                if (!(new Concept().isA(wut.getFullType()) || wut["encryptedType"] === "Concept")) {
                  _context4.next = 58;
                  break;
                }
                if (!(framework != null)) {
                  _context4.next = 58;
                  break;
                }
                if (!(me.$store.state.editor.selectedCompetency != null)) {
                  _context4.next = 58;
                  break;
                }
                if (!(me.$store.state.editor.selectedCompetency.shortId() === wut.shortId())) {
                  _context4.next = 57;
                  break;
                }
                com = new EcConcept();
                if (!(wut["encryptedType"] === "Concept")) {
                  _context4.next = 55;
                  break;
                }
                _context4.t4 = com;
                _context4.next = 51;
                return EcEncryptedValue.fromEncryptedValue(wut);
              case 51:
                _context4.t5 = _context4.sent;
                _context4.t4.copyFrom.call(_context4.t4, _context4.t5);
                _context4.next = 56;
                break;
              case 55:
                com.copyFrom(wut);
              case 56:
                me.$store.commit('editor/selectedCompetency', com);
              case 57:
                me.spitEvent("competencyChanged", me.$store.state.editor.selectedCompetency.shortId());
              case 58:
                if (!(new EcCompetency().isA(wut.getFullType()) || wut["encryptedType"] === "Competency")) {
                  _context4.next = 74;
                  break;
                }
                if (!(framework != null)) {
                  _context4.next = 74;
                  break;
                }
                if (!(me.$store.state.editor.selectedCompetency != null)) {
                  _context4.next = 74;
                  break;
                }
                if (!(me.$store.state.editor.selectedCompetency.shortId() === wut.shortId())) {
                  _context4.next = 73;
                  break;
                }
                com = new EcCompetency();
                if (!(wut["encryptedType"] === "Competency")) {
                  _context4.next = 71;
                  break;
                }
                _context4.t6 = com;
                _context4.next = 67;
                return EcEncryptedValue.fromEncryptedValue(wut);
              case 67:
                _context4.t7 = _context4.sent;
                _context4.t6.copyFrom.call(_context4.t6, _context4.t7);
                _context4.next = 72;
                break;
              case 71:
                com.copyFrom(wut);
              case 72:
                me.$store.commit('editor/selectedCompetency', com);
              case 73:
                me.spitEvent("competencyChanged", me.$store.state.editor.selectedCompetency.shortId());
              case 74:
                if (!(new EcLevel().isA(wut.getFullType()) || wut["encryptedType"] === "Level")) {
                  _context4.next = 90;
                  break;
                }
                if (!(framework != null)) {
                  _context4.next = 90;
                  break;
                }
                if (!(me.$store.state.editor.selectedCompetency != null)) {
                  _context4.next = 90;
                  break;
                }
                if (!(me.$store.state.editor.selectedCompetency.shortId() === wut.shortId())) {
                  _context4.next = 89;
                  break;
                }
                com = new EcLevel();
                if (!(wut["encryptedType"] === "Level")) {
                  _context4.next = 87;
                  break;
                }
                _context4.t8 = com;
                _context4.next = 83;
                return EcEncryptedValue.fromEncryptedValue(wut);
              case 83:
                _context4.t9 = _context4.sent;
                _context4.t8.copyFrom.call(_context4.t8, _context4.t9);
                _context4.next = 88;
                break;
              case 87:
                com.copyFrom(wut);
              case 88:
                me.$store.commit('editor/selectedCompetency', com);
              case 89:
                me.spitEvent("competencyChanged", me.$store.state.editor.selectedCompetency.shortId());
              case 90:
              case "end":
                return _context4.stop();
            }
          }, _callee4);
        }));
        return function (_x4) {
          return _ref3.apply(this, arguments);
        };
      }();
      connection.onmessage = function (e) {
        var resp = e.data;
        appLog('Server: ' + resp);
        if (!EcArray.isArray(resp) && resp.startsWith("[")) {
          resp = JSON.parse(resp);
        }
        if (EcArray.isArray(resp)) {
          for (var i = 0; i < resp.length; i++) {
            delete EcRepository.cache[resp[i]];
            delete EcRepository.cache[EcRemoteLinkedData.trimVersionFromUrl(resp[i])];
            delete EcRepository.cache[EcRemoteLinkedData.veryShortId(repo.selectedServer, EcCrypto.md5(resp[i]))];
          }
          if (me.$store.state.editor.framework == null) return;
          me.repo.precache(resp, function () {
            for (var i = 0; i < resp.length; i++) {
              EcRepository.get(resp[i], connection.changedObject, appError);
            }
          });
        } else {
          delete EcRepository.cache[resp];
          delete EcRepository.cache[EcRemoteLinkedData.trimVersionFromUrl(resp)];
          delete EcRepository.cache[EcRemoteLinkedData.veryShortId(repo.selectedServer, EcCrypto.md5(resp))];
          EcRepository.get(resp, connection.changedObject, appError);
        }
      };
    },
    createNewFramework: function () {
      var _createNewFramework = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().mark(function _callee5(optionalDirectory) {
        var me, framework, saveFramework;
        return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              me = this;
              this.$store.commit('editor/t3Profile', false);
              this.setDefaultLanguage();
              framework = new EcFramework();
              if (this.queryParams.newObjectEndpoint != null) {
                framework.generateShortId(this.queryParams.newObjectEndpoint);
              } else {
                framework.generateId(this.repo.selectedServer);
              }
              framework["schema:dateCreated"] = new Date().toISOString();
              framework["schema:dateModified"] = new Date().toISOString();
              if (optionalDirectory) {
                framework.directory = optionalDirectory.shortId();
                if (optionalDirectory.owner) {
                  framework.owner = optionalDirectory.owner;
                }
                if (optionalDirectory.reader) {
                  framework.reader = optionalDirectory.reader;
                }
              }
              if (EcIdentityManager.default.ids.length > 0) {
                framework.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
              }
              framework.name = {
                "@language": this.$store.state.editor.defaultLanguage,
                "@value": "New Framework"
              };
              this.$store.commit('editor/newFramework', framework.shortId());
              if (this.queryParams.ceasnDataFields === "true") {
                framework["schema:inLanguage"] = [this.$store.state.editor.defaultLanguage];
              }
              saveFramework = framework;
              if (!(this.queryParams.private === "true")) {
                _context5.next = 17;
                break;
              }
              _context5.next = 16;
              return EcEncryptedValue.toEncryptedValue(framework);
            case 16:
              saveFramework = _context5.sent;
            case 17:
              this.repo.saveTo(saveFramework, function () {
                me.$store.commit('editor/framework', framework);
                if (me.$route.name !== 'framework') {
                  me.$router.push({
                    name: "framework"
                  });
                }
              }, appError);
            case 18:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function createNewFramework(_x5) {
        return _createNewFramework.apply(this, arguments);
      }
      return createNewFramework;
    }(),
    createNewCollection: function () {
      var _createNewCollection = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().mark(function _callee6() {
        var me, framework, saveFramework;
        return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              me = this;
              this.$store.commit('editor/t3Profile', false);
              this.setDefaultLanguage();
              framework = new EcFramework();
              if (this.queryParams.newObjectEndpoint != null) {
                framework.generateShortId(this.queryParams.newObjectEndpoint);
              } else {
                framework.generateId(this.repo.selectedServer);
              }
              framework["schema:dateCreated"] = new Date().toISOString();
              framework["schema:dateModified"] = new Date().toISOString();
              if (EcIdentityManager.default.ids.length > 0) {
                framework.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
              }
              framework.name = {
                "@language": this.$store.state.editor.defaultLanguage,
                "@value": "New Collection"
              };
              this.$store.commit('editor/newFramework', framework.shortId());
              if (this.queryParams.ceasnDataFields === "true") {
                framework["schema:inLanguage"] = [this.$store.state.editor.defaultLanguage];
              }
              framework.subType = "Collection";
              saveFramework = framework;
              if (!(this.queryParams.private === "true")) {
                _context6.next = 17;
                break;
              }
              _context6.next = 16;
              return EcEncryptedValue.toEncryptedValue(framework);
            case 16:
              saveFramework = _context6.sent;
            case 17:
              this.repo.saveTo(saveFramework, function () {
                me.$store.commit('editor/framework', framework);
                if (me.$route.name !== 'framework') {
                  me.$router.push({
                    name: "framework"
                  });
                }
              }, appError);
            case 18:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function createNewCollection() {
        return _createNewCollection.apply(this, arguments);
      }
      return createNewCollection;
    }(),
    createNewConceptScheme: function () {
      var _createNewConceptScheme = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().mark(function _callee7() {
        var me, framework, name, saveFramework;
        return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              me = this;
              this.setDefaultLanguage();
              framework = new EcConceptScheme();
              if (this.queryParams.newObjectEndpoint != null) {
                framework.generateShortId(this.queryParams.newObjectEndpoint);
              } else {
                framework.generateId(this.repo.selectedServer);
              }
              if (EcIdentityManager.default.ids.length > 0) {
                framework.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
              }
              name = "New Taxonomy";
              if (this.queryParams.ceasnDataFields === 'true') {
                name = "New Concept Scheme";
              }
              framework["dcterms:title"] = {
                "@language": this.$store.state.editor.defaultLanguage,
                "@value": name
              };
              if (this.queryParams.ceasnDataFields === "true") {
                framework["dcterms:language"] = [this.$store.state.editor.defaultLanguage];
              }
              framework["schema:dateCreated"] = new Date().toISOString();
              framework["schema:dateModified"] = new Date().toISOString();
              this.$store.commit('editor/newFramework', framework.shortId());
              saveFramework = framework;
              if (!(this.queryParams.private === "true")) {
                _context7.next = 17;
                break;
              }
              _context7.next = 16;
              return EcEncryptedValue.toEncryptedValue(framework);
            case 16:
              saveFramework = _context7.sent;
            case 17:
              this.repo.saveTo(saveFramework, function () {
                me.$store.commit('editor/framework', framework);
                if (me.$route.name !== 'conceptScheme') {
                  me.$router.push({
                    name: "conceptScheme"
                  });
                }
              }, appError);
            case 18:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function createNewConceptScheme() {
        return _createNewConceptScheme.apply(this, arguments);
      }
      return createNewConceptScheme;
    }(),
    createNewProgressionModel: function () {
      var _createNewProgressionModel = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().mark(function _callee8() {
        var me, framework, name, saveFramework;
        return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              me = this;
              this.setDefaultLanguage();
              framework = new EcConceptScheme();
              if (this.queryParams.newObjectEndpoint != null) {
                framework.generateShortId(this.queryParams.newObjectEndpoint);
              } else {
                framework.generateId(this.repo.selectedServer);
              }
              if (EcIdentityManager.default.ids.length > 0) {
                framework.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
              }
              name = "New Progression Model";
              framework["dcterms:title"] = {
                "@language": this.$store.state.editor.defaultLanguage,
                "@value": name
              };
              if (this.queryParams.ceasnDataFields === "true") {
                framework["schema:inLanguage"] = [this.$store.state.editor.defaultLanguage];
              }
              framework["schema:dateCreated"] = new Date().toISOString();
              framework["schema:dateModified"] = new Date().toISOString();
              this.$store.commit('editor/newFramework', framework.shortId());
              saveFramework = framework;
              if (!(this.queryParams.private === "true")) {
                _context8.next = 16;
                break;
              }
              _context8.next = 15;
              return EcEncryptedValue.toEncryptedValue(framework);
            case 15:
              saveFramework = _context8.sent;
            case 16:
              framework.subType = "Progression";
              this.repo.saveTo(saveFramework, function () {
                me.$store.commit('editor/framework', framework);
                if (me.$route.name !== 'progressionModel') {
                  me.$router.push({
                    name: "progressionModel"
                  });
                }
              }, appError);
            case 18:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function createNewProgressionModel() {
        return _createNewProgressionModel.apply(this, arguments);
      }
      return createNewProgressionModel;
    }(),
    createNew: function createNew() {
      this.setDefaultLanguage();
      var me = this;
      if (me.$store.getters['editor/conceptMode'] === true) {
        this.createNewConceptScheme();
      } else if (me.$store.getters['editor/progressionMode'] === true) {
        this.createNewProgressionModel();
      } else {
        this.createNewFramework();
      }
    },
    loadIdentity: function loadIdentity(callback) {
      var identity;
      if (this.queryParams.user === "self") {
        EcIdentityManager.default.readIdentities();
        EcIdentityManager.default.readContacts();
        if (EcIdentityManager.default.ids.length === 0) {
          EcPpk.generateKeyAsync(function (p1) {
            identity = new EcIdentity();
            identity.ppk = p1;
            identity.displayName = "You";
            EcIdentityManager.default.onIdentityChanged = EcIdentityManager.default.saveIdentities;
            EcIdentityManager.default.addIdentity(identity);
            callback();
          });
        } else {
          callback();
        }
      } else if (this.queryParams.user === "wait" && this.inIframe()) {
        var me = this;
        var fun = function fun(evt) {
          var data = evt.data;
          if (data != null && data !== "" && !EcObject.isObject(data)) {
            data = JSON.parse(data);
          }
          if (data.action === "identity") {
            identity = new EcIdentity();
            identity.ppk = EcPpk.fromPem(data.identity);
            identity.displayName = data.name ? data.name : "You";
            EcIdentityManager.default.addIdentity(identity);
            callback();
            var message = {
              action: "response",
              message: "identityOk"
            };
            appLog(message);
            parent.postMessage(message, me.queryParams.origin);
          }
        };
        if (window.addEventListener) {
          window.addEventListener("message", fun, false);
        } else {
          window.attachEvent("onmessage", fun);
        }
        var message = {
          message: "waiting"
        };
        appLog(message);
        parent.postMessage(message, this.queryParams.origin);
      } else {
        callback();
      }
    },
    messageListener: function () {
      var _messageListener = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().mark(function _callee9(evt) {
        var data, me, message, d, key, v, link, fid, guid, framework, selectedCompetency;
        return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              data = evt.data;
              me = this;
              if (data != null && data !== "" && !EcObject.isObject(data)) {
                try {
                  data = JSON.parse(data);
                  // eslint-disable-next-line no-empty
                } catch (e) {}
              }
              if (!(data != null && data !== "")) {
                _context9.next = 32;
                break;
              }
              if (!(data.action === "template")) {
                _context9.next = 15;
                break;
              }
              if (data.framework != null) {
                EcFramework.template = this.removeNewlines(data.framework);
              }
              if (data.competency != null) {
                EcCompetency.template = this.removeNewlines(data.competency);
              }
              if (data.conceptScheme != null) {
                EcConceptScheme.template = this.removeNewlines(data.conceptScheme);
              }
              if (data.concept != null) {
                EcConcept.template = this.removeNewlines(data.concept);
              }
              if (data.directory != null) {
                EcDirectory.template = this.removeNewlines(data.directory);
              }
              message = {
                action: "response",
                message: "templateOk"
              };
              appLog(message);
              parent.postMessage(message, this.queryParams.origin);
              _context9.next = 32;
              break;
            case 15:
              if (!(data.action === "set")) {
                _context9.next = 31;
                break;
              }
              if (!(data.id != null)) {
                _context9.next = 20;
                break;
              }
              _context9.next = 19;
              return EcRepository.get(data.id);
            case 19:
              d = _context9.sent;
            case 20:
              delete data.id;
              delete data.action;
              for (key in data) {
                d[key] = data[key];
              }
              d["schema:dateModified"] = new Date().toISOString();
              if (!(me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[d.id] !== true)) {
                _context9.next = 28;
                break;
              }
              _context9.next = 27;
              return EcEncryptedValue.toEncryptedValue(d);
            case 27:
              d = _context9.sent;
            case 28:
              repo.saveTo(d, function (success) {
                var message = {
                  action: "response",
                  message: "setOk"
                };
                appLog(message);
                parent.postMessage(message, me.queryParams.origin);
              }, function (failure) {
                var message = {
                  action: "response",
                  message: "setFail"
                };
                appLog(message);
                parent.postMessage(message, me.queryParams.origin);
              });
              _context9.next = 32;
              break;
            case 31:
              if (data.action === "export") {
                v = data.schema;
                framework = this.$store.state.editor.framework;
                if (this.$store.state.editor.selectedCompetency != null) {
                  selectedCompetency = this.$store.state.editor.selectedCompetency;
                  if (EcRepository.shouldTryUrl(selectedCompetency.id) === false && selectedCompetency.id.indexOf(this.repo.selectedServer) === -1) {
                    link = this.repo.selectedServer + "data/" + EcCrypto.md5(selectedCompetency.shortId());
                    fid = this.repo.selectedServer + "data/" + EcCrypto.md5(framework.shortId());
                    guid = EcCrypto.md5(selectedCompetency.shortId());
                  } else {
                    link = selectedCompetency.id;
                    fid = framework.id;
                    guid = selectedCompetency.getGuid();
                  }
                } else {
                  if (EcRepository.shouldTryUrl(framework.id) === false && framework.id.indexOf(this.repo.selectedServer) === -1) {
                    link = this.repo.selectedServer + "data/" + EcCrypto.md5(framework.shortId());
                    fid = this.repo.selectedServer + "data/" + EcCrypto.md5(framework.shortId());
                    guid = EcCrypto.md5(framework.shortId());
                  } else {
                    link = framework.id;
                    fid = framework.id;
                    guid = framework.getGuid();
                  }
                }
                if (v === "asn") {
                  this.get(fid.replace("/data/", "/asn/"), null, null, function (success) {
                    var data = JSON.parse(success);
                    parent.postMessage({
                      action: "response",
                      message: "export",
                      schema: "asn",
                      format: "rdf+xml",
                      data: data
                    }, me.queryParams.origin);
                  });
                } else if (v === "cass") {
                  this.get(link, null, null, function (success) {
                    var data = JSON.parse(success);
                    parent.postMessage({
                      action: "response",
                      message: "export",
                      schema: "cass",
                      format: "application/ld+json",
                      data: data
                    }, me.queryParams.origin);
                  });
                } else if (v === "cassn4") {
                  this.get(link, null, {
                    "Accept": "text/n4"
                  }, function (success) {
                    var data = JSON.parse(success);
                    parent.postMessage({
                      action: "response",
                      message: "export",
                      schema: "cass",
                      format: "text/n4",
                      data: data
                    }, me.queryParams.origin);
                  }, function (failure) {
                    appLog(failure);
                  });
                } else if (v === "cassrdfxml") {
                  this.get(link, null, {
                    "Accept": "application/rdf+xml"
                  }, function (success) {
                    var data = JSON.parse(success);
                    parent.postMessage({
                      action: "response",
                      message: "export",
                      schema: "cass",
                      format: "application/rdf+xml",
                      data: data
                    }, me.queryParams.origin);
                  }, function (failure) {
                    appLog(failure);
                  });
                } else if (v === "cassturtle") {
                  this.get(link, null, {
                    "Accept": "text/turtle"
                  }, function (success) {
                    var data = JSON.parse(success);
                    parent.postMessage({
                      action: "response",
                      message: "export",
                      schema: "cass",
                      format: "text/turtle",
                      data: data
                    }, me.queryParams.origin);
                  }, function (failure) {
                    appLog(failure);
                  });
                } else if (v === "ceasn" || v === "ctdlasn") {
                  this.get(fid.replace("/data/", "/ceasn/"), null, null, function (success) {
                    var data = JSON.parse(success);
                    parent.postMessage({
                      action: "response",
                      message: "export",
                      schema: v,
                      format: "application/ld+json",
                      data: data
                    }, me.queryParams.origin);
                  });
                } else if (v === "case") {
                  if (selectedCompetency == null) {
                    this.get(this.repo.selectedServer + "ims/case/v1p0/CFDocuments/" + guid, null, null, function (success) {
                      var data = JSON.parse(success);
                      parent.postMessage({
                        action: "response",
                        message: "export",
                        schema: "case",
                        format: "application/json",
                        data: data
                      }, me.queryParams.origin);
                    }, function (failure) {
                      appLog(failure);
                    });
                  } else {
                    this.get(this.repo.selectedServer + "ims/case/v1p0/CFItems/" + guid, null, null, function (success) {
                      var data = JSON.parse(success);
                      parent.postMessage({
                        action: "response",
                        message: "export",
                        schema: "case",
                        format: "application/json",
                        data: data
                      }, me.queryParams.origin);
                    }, function (failure) {
                      appLog(failure);
                    });
                  }
                }
              }
            case 32:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this);
      }));
      function messageListener(_x6) {
        return _messageListener.apply(this, arguments);
      }
      return messageListener;
    }(),
    // Removes newlines from public key in owner and reader fields
    removeNewlines: function removeNewlines(entity) {
      if (entity["owner"] != null) {
        for (var i = 0; i < entity["owner"].length; i++) {
          var owner = entity["owner"][i];
          entity["owner"][i] = EcPk.fromPem(owner).toPem();
        }
      }
      if (entity["reader"] != null) {
        for (var i = 0; i < entity["reader"].length; i++) {
          var owner = entity["reader"][i];
          entity["reader"][i] = EcPk.fromPem(owner).toPem();
        }
      }
      if (entity["@owner"] != null) {
        for (var i = 0; i < entity["@owner"].length; i++) {
          var owner = entity["@owner"][i];
          entity["@owner"][i] = EcPk.fromPem(owner).toPem();
        }
      }
      if (entity["@reader"] != null) {
        for (var i = 0; i < entity["@reader"].length; i++) {
          var owner = entity["@reader"][i];
          entity["@reader"][i] = EcPk.fromPem(owner).toPem();
        }
      }
      return entity;
    },
    attachUrlProperties: function () {
      var _attachUrlProperties = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().mark(function _callee10(results) {
        var resource, i, thing;
        return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              resource = this.$store.state.editor.framework;
              if (this.$store.state.editor.selectedCompetency != null) {
                resource = this.$store.state.editor.selectedCompetency;
              }
              i = 0;
            case 3:
              if (!(i < results.length)) {
                _context10.next = 11;
                break;
              }
              _context10.next = 6;
              return EcRepository.get(results[i]);
            case 6:
              thing = _context10.sent;
              if (thing.isAny(new EcConcept().getTypes())) {
                if (!EcArray.isArray(resource[this.$store.state.editor.selectCompetencyRelation])) {
                  resource[this.$store.state.editor.selectCompetencyRelation] = [];
                }
                EcArray.setAdd(resource[this.$store.state.editor.selectCompetencyRelation], thing.shortId());
              }
            case 8:
              i++;
              _context10.next = 3;
              break;
            case 11:
              resource["schema:dateModified"] = new Date().toISOString();
              if (!(this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[resource.id] !== true)) {
                _context10.next = 16;
                break;
              }
              _context10.next = 15;
              return EcEncryptedValue.toEncryptedValue(resource);
            case 15:
              resource = _context10.sent;
            case 16:
              this.repo.saveTo(resource, function () {}, appError);
            case 17:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this);
      }));
      function attachUrlProperties(_x7) {
        return _attachUrlProperties.apply(this, arguments);
      }
      return attachUrlProperties;
    }(),
    copyOrLink: function copyOrLink(choice, selectedIds) {
      if (choice === "Copy") {
        this.copyCompetencies(selectedIds);
      } else {
        this.appendCompetencies(selectedIds, true);
      }
    },
    copyCompetencies: function () {
      var _copyCompetencies = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().mark(function _callee11(results) {
        var copyDict, framework, me, i, thing, c, j, owner, reader, level, parent, child, r, selectedCompetency;
        return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              copyDict = {};
              framework = this.$store.state.editor.framework;
              me = this;
              i = 0;
            case 4:
              if (!(i < results.length)) {
                _context11.next = 46;
                break;
              }
              _context11.next = 7;
              return EcRepository.get(results[i]);
            case 7:
              thing = _context11.sent;
              if (!(thing != null && thing.isAny(new EcCompetency().getTypes()))) {
                _context11.next = 28;
                break;
              }
              c = new EcCompetency();
              c.copyFrom(thing);
              if (this.queryParams.newObjectEndpoint != null) {
                c.generateShortId(this.queryParams.newObjectEndpoint);
              } else {
                c.generateId(this.repo.selectedServer);
              }
              c["schema:dateCreated"] = new Date().toISOString();
              c["schema:dateModified"] = new Date().toISOString();
              delete c.owner;
              if (EcIdentityManager.default.ids.length > 0) {
                c.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
              }
              if (framework.owner && framework.owner.length > 0) {
                for (j = 0; j < framework.owner.length; j++) {
                  owner = framework.owner[j];
                  c.addOwner(EcPk.fromPem(owner));
                }
              }
              if (framework.reader && framework.reader.length > 0) {
                for (j = 0; j < framework.reader.length; j++) {
                  reader = framework.reader[j];
                  c.addReader(EcPk.fromPem(reader));
                }
              }
              c['ceasn:derivedFrom'] = thing.id;
              copyDict[c['ceasn:derivedFrom']] = c;
              if (!(this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[c.id] !== true)) {
                _context11.next = 24;
                break;
              }
              _context11.next = 23;
              return EcEncryptedValue.toEncryptedValue(c);
            case 23:
              c = _context11.sent;
            case 24:
              this.itemsSaving++;
              (function (c) {
                Task.asyncImmediate(function (callback) {
                  me.repo.saveTo(c, function () {
                    framework.addCompetency(c.id);
                    me.$store.commit('editor/framework', framework);
                    me.afterCopy();
                    callback();
                  }, function (error) {
                    appError(error);
                    me.afterCopy();
                    callback();
                  });
                });
              })(c);
              _context11.next = 43;
              break;
            case 28:
              if (!(thing != null && thing.isAny(new EcLevel().getTypes()))) {
                _context11.next = 43;
                break;
              }
              level = new EcLevel();
              level.copyFrom(thing);
              if (this.queryParams.newObjectEndpoint != null) {
                level.generateShortId(this.queryParams.newObjectEndpoint);
              } else {
                level.generateId(this.repo.selectedServer);
              }
              level["schema:dateCreated"] = new Date().toISOString();
              level.competency = this.$store.state.editor.selectedCompetency.shortId();
              delete level.owner;
              level['ceasn:derivedFrom'] = thing.id;
              copyDict[level['ceasn:derivedFrom']] = level;
              if (!(this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[level.id] !== true)) {
                _context11.next = 41;
                break;
              }
              _context11.next = 40;
              return EcEncryptedValue.toEncryptedValue(level);
            case 40:
              level = _context11.sent;
            case 41:
              this.itemsSaving++;
              (function (level) {
                Task.asyncImmediate(function (callback) {
                  me.repo.saveTo(level, function () {
                    framework.addLevel(level.id);
                    me.$store.commit('editor/framework', framework);
                    me.afterCopy();
                    callback();
                  }, function (error) {
                    appError(error);
                    me.afterCopy();
                    callback();
                  });
                });
              })(level);
            case 43:
              i++;
              _context11.next = 4;
              break;
            case 46:
              i = 0;
            case 47:
              if (!(i < results.length)) {
                _context11.next = 77;
                break;
              }
              _context11.next = 50;
              return EcRepository.get(results[i]);
            case 50:
              thing = _context11.sent;
              if (!(thing != null && thing.isAny(new EcAlignment().getTypes()))) {
                _context11.next = 74;
                break;
              }
              parent = copyDict[thing.target];
              child = copyDict[thing.source];
              if (!(typeof parent !== 'undefined' && typeof child !== 'undefined')) {
                _context11.next = 74;
                break;
              }
              r = new EcAlignment();
              r.copyFrom(thing);
              if (this.queryParams.newObjectEndpoint != null) {
                r.generateShortId(this.queryParams.newObjectEndpoint);
              } else {
                r.generateId(this.repo.selectedServer);
              }
              r["schema:dateCreated"] = new Date().toISOString();
              r.target = parent.shortId();
              r.source = child.shortId();
              r.relationType = thing.relationType;
              if (EcIdentityManager.default.ids.length > 0) {
                r.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
              }
              if (framework.owner && framework.owner.length > 0) {
                for (j = 0; j < framework.owner.length; j++) {
                  owner = framework.owner[j];
                  r.addOwner(EcPk.fromPem(owner));
                }
              }
              if (framework.reader && framework.reader.length > 0) {
                for (j = 0; j < framework.reader.length; j++) {
                  reader = framework.reader[j];
                  r.addReader(EcPk.fromPem(reader));
                }
              }
              if (!(r.source !== r.target)) {
                _context11.next = 74;
                break;
              }
              framework["schema:dateModified"] = new Date().toISOString();
              EcArray.setRemove(results, thing.source);
              if (!(this.$store.state.editor.private === true)) {
                _context11.next = 72;
                break;
              }
              _context11.next = 71;
              return EcEncryptedValue.toEncryptedValue(r);
            case 71:
              r = _context11.sent;
            case 72:
              this.itemsSaving++;
              (function (r) {
                Task.asyncImmediate(function (callback) {
                  me.repo.saveTo(r, function () {
                    framework.addRelation(r.id);
                    me.$store.commit('editor/framework', framework);
                    me.afterCopy();
                    callback();
                  }, function (error) {
                    appError(error);
                    me.afterCopy();
                    callback();
                  });
                });
              })(r);
            case 74:
              i++;
              _context11.next = 47;
              break;
            case 77:
              selectedCompetency = this.$store.state.editor.selectedCompetency;
              i = 0;
            case 79:
              if (!(i < results.length)) {
                _context11.next = 107;
                break;
              }
              _context11.next = 82;
              return EcRepository.get(results[i]);
            case 82:
              thing = _context11.sent;
              if (!(thing != null && thing.isAny(new EcCompetency().getTypes()))) {
                _context11.next = 104;
                break;
              }
              if (!(selectedCompetency != null)) {
                _context11.next = 104;
                break;
              }
              r = new EcAlignment();
              if (this.queryParams.newObjectEndpoint != null) {
                r.generateShortId(this.queryParams.newObjectEndpoint);
              } else {
                r.generateId(this.repo.selectedServer);
              }
              r["schema:dateCreated"] = new Date().toISOString();
              child = copyDict[thing.id];
              r.target = selectedCompetency.shortId();
              r.source = child.shortId();
              r.relationType = Relation.NARROWS;
              if (EcIdentityManager.default.ids.length > 0) {
                r.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
              }
              if (framework.owner && framework.owner.length > 0) {
                for (j = 0; j < framework.owner.length; j++) {
                  owner = framework.owner[j];
                  r.addOwner(EcPk.fromPem(owner));
                }
              }
              if (framework.reader && framework.reader.length > 0) {
                for (j = 0; j < framework.reader.length; j++) {
                  reader = framework.reader[j];
                  r.addReader(EcPk.fromPem(reader));
                }
              }
              if (!(r.source !== r.target)) {
                _context11.next = 104;
                break;
              }
              this.itemsSaving++;
              framework.addRelation(r.id);
              framework["schema:dateModified"] = new Date().toISOString();
              if (!(this.$store.state.editor.private === true)) {
                _context11.next = 103;
                break;
              }
              _context11.next = 102;
              return EcEncryptedValue.toEncryptedValue(r);
            case 102:
              r = _context11.sent;
            case 103:
              (function (r) {
                Task.asyncImmediate(function (callback) {
                  me.repo.saveTo(r, function () {
                    me.afterCopy();
                    callback();
                  }, function (error) {
                    appError(error);
                    me.afterCopy();
                    callback();
                  });
                });
              })(r);
            case 104:
              i++;
              _context11.next = 79;
              break;
            case 107:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this);
      }));
      function copyCompetencies(_x8) {
        return _copyCompetencies.apply(this, arguments);
      }
      return copyCompetencies;
    }(),
    afterCopy: function () {
      var _afterCopy = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().mark(function _callee12() {
        var framework;
        return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              this.itemsSaving--;
              // loading(this.itemsSaving + " objects left to copy.");
              if (!(this.itemsSaving === 0)) {
                _context12.next = 8;
                break;
              }
              framework = this.$store.state.editor.framework;
              if (!(this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true)) {
                _context12.next = 7;
                break;
              }
              _context12.next = 6;
              return EcEncryptedValue.toEncryptedValue(framework);
            case 6:
              framework = _context12.sent;
            case 7:
              this.repo.saveTo(framework, function () {}, appError);
            case 8:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this);
      }));
      function afterCopy() {
        return _afterCopy.apply(this, arguments);
      }
      return afterCopy;
    }(),
    appendCompetencies: function () {
      var _appendCompetencies = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().mark(function _callee14(results, newLink) {
        var selectedCompetency, framework, me, i, thing, r, j, owner, reader;
        return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              selectedCompetency = this.$store.state.editor.selectedCompetency;
              framework = this.$store.state.editor.framework;
              me = this;
              i = 0;
            case 4:
              if (!(i < results.length)) {
                _context14.next = 12;
                break;
              }
              _context14.next = 7;
              return EcRepository.get(results[i]);
            case 7:
              thing = _context14.sent;
              if (thing.isAny(new EcCompetency().getTypes())) {
                framework.addCompetency(thing.shortId());
              } else if (thing.isAny(new EcLevel().getTypes())) {
                framework.addLevel(thing.shortId());
                if (!EcArray.isArray(thing.competency)) {
                  thing.competency = [thing.competency];
                }
                thing.competency.push(selectedCompetency.shortId());
                this.repo.saveTo(thing, function () {}, appError);
              }
            case 9:
              i++;
              _context14.next = 4;
              break;
            case 12:
              i = 0;
            case 13:
              if (!(i < results.length)) {
                _context14.next = 21;
                break;
              }
              _context14.next = 16;
              return EcRepository.get(results[i]);
            case 16:
              thing = _context14.sent;
              if (thing.isAny(new EcAlignment().getTypes())) {
                if (EcArray.has(framework.competency, thing.source)) {
                  if (EcArray.has(framework.competency, thing.target)) {
                    framework.addRelation(thing.shortId());
                    EcArray.setRemove(results, thing.source);
                  }
                }
              }
            case 18:
              i++;
              _context14.next = 13;
              break;
            case 21:
              i = 0;
            case 22:
              if (!(i < results.length)) {
                _context14.next = 47;
                break;
              }
              _context14.next = 25;
              return EcRepository.get(results[i]);
            case 25:
              thing = _context14.sent;
              if (!thing.isAny(new EcCompetency().getTypes())) {
                _context14.next = 44;
                break;
              }
              if (!(selectedCompetency != null)) {
                _context14.next = 44;
                break;
              }
              r = new EcAlignment();
              if (this.queryParams.newObjectEndpoint != null) {
                r.generateShortId(this.queryParams.newObjectEndpoint);
              } else {
                r.generateId(this.repo.selectedServer);
              }
              r["schema:dateCreated"] = new Date().toISOString();
              r.target = selectedCompetency.shortId();
              r.source = thing.shortId();
              r.relationType = Relation.NARROWS;
              if (EcIdentityManager.default.ids.length > 0) {
                r.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
              }
              if (framework.owner && framework.owner.length > 0) {
                for (j = 0; j < framework.owner.length; j++) {
                  owner = framework.owner[j];
                  r.addOwner(EcPk.fromPem(owner));
                }
              }
              if (framework.reader && framework.reader.length > 0) {
                for (j = 0; j < framework.reader.length; j++) {
                  reader = framework.reader[j];
                  r.addReader(EcPk.fromPem(reader));
                }
              }
              if (!(r.source !== r.target)) {
                _context14.next = 44;
                break;
              }
              framework.addRelation(r.id);
              if (!(this.$store.state.editor.private === true)) {
                _context14.next = 43;
                break;
              }
              _context14.next = 42;
              return EcEncryptedValue.toEncryptedValue(r);
            case 42:
              r = _context14.sent;
            case 43:
              this.repo.saveTo(r, function () {}, appError);
            case 44:
              i++;
              _context14.next = 22;
              break;
            case 47:
              if (!(this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true)) {
                _context14.next = 51;
                break;
              }
              _context14.next = 50;
              return EcEncryptedValue.toEncryptedValue(framework);
            case 50:
              framework = _context14.sent;
            case 51:
              this.repo.saveTo(framework, /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().mark(function _callee13() {
                return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().wrap(function _callee13$(_context13) {
                  while (1) switch (_context13.prev = _context13.next) {
                    case 0:
                      _context13.t0 = me.$store;
                      _context13.next = 3;
                      return EcFramework.get(framework.id);
                    case 3:
                      _context13.t1 = _context13.sent;
                      _context13.t0.commit.call(_context13.t0, 'editor/framework', _context13.t1);
                    case 5:
                    case "end":
                      return _context13.stop();
                  }
                }, _callee13);
              })), appError);
            case 52:
            case "end":
              return _context14.stop();
          }
        }, _callee14, this);
      }));
      function appendCompetencies(_x9, _x10) {
        return _appendCompetencies.apply(this, arguments);
      }
      return appendCompetencies;
    }(),
    importParentStyles: function importParentStyles() {
      var parentStyleSheets = parent.document.styleSheets;
      var cssString = "";
      for (var i = 0, count = parentStyleSheets.length; i < count; ++i) {
        if (parentStyleSheets[i].cssRules) {
          if (parentStyleSheets[i].ownerNode.attributes.inherit != null) {
            var cssRules = parentStyleSheets[i].cssRules;
            for (var j = 0, countJ = cssRules.length; j < countJ; ++j) {
              cssString += cssRules[j].cssText;
            }
          } // else
          // cssString += parentStyleSheets[i].cssText; // IE8 and earlier
        }
      }
      var style = document.createElement("style");
      style.type = "text/css";
      try {
        style.innerHTML = cssString;
      } catch (ex) {
        // style.styleSheet.cssText = cssString; // IE8 and earlier
      }
      document.getElementsByTagName("head")[0].appendChild(style);
    },
    inIframe: function inIframe() {
      try {
        return window.self !== window.top;
      } catch (e) {
        return true;
      }
    }
  },
  computed: Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
    bannerMessage: function bannerMessage() {
      return this.$store.getters['app/bannerMessage'];
    },
    bannerStyle: function bannerStyle() {
      return {
        'color': this.$store.getters['app/bannerColor'],
        'background-color': this.$store.getters['app/bannerBackground']
      };
    },
    editorClass: function editorClass() {
      return {
        'ceasn-editor': this.queryParams.ceasnDataFields === 'true',
        'has-banner': this.$store.getters['app/bannerMessage']
      };
    },
    showRightAside: function showRightAside() {
      return this.$store.getters['app/showRightAside'];
    },
    showSideNav: function showSideNav() {
      return this.$store.getters['app/showSideNav'];
    },
    currentRoute: function currentRoute() {
      return this.$route.path;
    },
    isLoggedIn: function isLoggedIn() {
      if (!this.loggedInPerson || this.loggedInPerson && !this.loggedInPerson.name) {
        return false;
      } else {
        return true;
      }
    },
    currentPathIsLogin: function currentPathIsLogin() {
      if (this.$route.name === 'login') return true;else return false;
    }
  }, Object(vuex__WEBPACK_IMPORTED_MODULE_14__[/* mapState */ "c"])({
    loggedInPerson: function loggedInPerson(state) {
      return state.user.loggedOnPerson;
    },
    queryParams: function queryParams(state) {
      return state.editor.queryParams;
    }
  })),
  mounted: function mounted() {},
  watch: {
    currentRoute: function currentRoute(val) {
      // appLog("logged in", this.loggedInPerson);
      if (!this.isLoggedIn && val === '/users') {
        this.$router.push({
          path: '/'
        });
      }
    },
    '$route': function $route(to, from) {
      this.$store.commit('app/closeRightAside');
      // this.$store.commit('app/closeSideNav');
      this.$store.commit('app/closeModal');
      var navigationTo = to;
      if (navigationTo) {
        this.navBarActive = false;
      }
      // First load, can't access this.$route.query before this
      if (!from.name) {
        this.initializeApp();
      }
      if (to.name === 'concepts') {
        this.$store.commit('editor/conceptMode', true);
        this.$store.commit('editor/progressionMode', false);
      }
      if (to.name === 'progressionLevels') {
        this.$store.commit('editor/progressionMode', true);
        this.$store.commit('editor/conceptMode', false);
      }
      if (to.name === 'frameworks') {
        this.$store.commit('editor/conceptMode', false);
        this.$store.commit('editor/progressionMode', false);
      }
    },
    loggedInPerson: function loggedInPerson() {
      this.$store.commit('editor/setMe', EcIdentityManager.default.ids[0].ppk.toPk().toPem());
      this.$store.commit('editor/setSubject', EcIdentityManager.default.ids[0].ppk.toPk().toPem());
      this.$store.commit('editor/setManageAssertions', false); // Turn off managing assertions when logging in / switching users
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "8596":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d3b7");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("159b");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("14d9");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_string_ends_with_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("8a79");
/* harmony import */ var core_js_modules_es_string_ends_with_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_ends_with_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("fb6a");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_string_starts_with_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("2ca0");
/* harmony import */ var core_js_modules_es_string_starts_with_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_starts_with_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("b64b");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("c7eb");
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("1da1");
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("b85c");

















global.jsonld = __webpack_require__("46bd");
var state = {
  schemata: {},
  isSavingProperty: false,
  isSavingThing: false,
  isAddingProperty: false,
  addingProperty: '',
  addingValues: [],
  addingRange: [],
  addingChecked: [],
  removeAddingValueAtIndex: null,
  schemataLookup: {},
  rawSchemata: {},
  schemaFallback: {},
  objectModel: {},
  competencySearchModalOpen: false,
  copyOrLink: false,
  numPropertyComponentsVisible: {},
  searchType: null,
  includeRelations: true
};
var actions = {
  schemata: function schemata(_ref, schema) {
    var state = _ref.state,
      commit = _ref.commit;
    commit('setSchemata', schema);
    if (EcArray.isArray(schema.obj)) {
      commit('setEmptySchemataLookup', schema);
      for (var i = 0; i < schema.obj.length; i++) {
        var scheme = schema.obj[i];
        commit('setSchemataLookup', {
          'index': i,
          'schema': schema
        });
        if (scheme["http://schema.org/domainIncludes"] != null) {
          var _iterator = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"])(scheme["http://schema.org/domainIncludes"]),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var domainType = _step.value;
              if (state.objectModel[domainType["@id"]] == null) {
                commit('setObjectModel', {
                  'type': domainType,
                  'val': {}
                });
              }
              var om = state.objectModel[domainType["@id"]];
              om[scheme["@id"]] = scheme;
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      }
    }
  },
  schemaFallback: function schemaFallback(_ref2, schema) {
    var state = _ref2.state;
    for (var i = 0; i < schema.length; i++) {
      var scheme = schema[i];
      state.schemaFallback[scheme["@id"]] = schema[i];
      if (scheme["http://schema.org/domainIncludes"] != null) {
        var _iterator2 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"])(scheme["http://schema.org/domainIncludes"]),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var domainType = _step2.value;
            if (state.objectModel[domainType["@id"]] == null) {
              state.objectModel[domainType["@id"]] = {};
            }
            var om = state.objectModel[domainType["@id"]];
            om[scheme["@id"]] = scheme;
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    }
  }
};
var mutations = {
  setIsSavingProperty: function setIsSavingProperty(state, value) {
    state.isSavingProperty = value;
  },
  setIsSavingThing: function setIsSavingThing(state, value) {
    state.isSavingThing = value;
  },
  setIsAddingProperty: function setIsAddingProperty(state, value) {
    state.isAddingProperty = value;
  },
  setAddingProperty: function setAddingProperty(state, value) {
    state.addingProperty = value;
  },
  setAddingValues: function setAddingValues(state, values) {
    var newValues = [];
    if (Array.isArray(values)) {
      values.forEach(function (value) {
        if (value) {
          var newValue = trimUrl(value);
          if (newValue) newValues.push(newValue);
        }
      });
    } else {
      if (values) {
        var newValue = trimUrl(values);
        if (newValue) newValues.push(newValue);
      }
    }
    state.addingValues = newValues;
  },
  addToAddingValues: function addToAddingValues(state, value) {
    var newValue = trimUrl(value);
    if (!state.addingValues) {
      state.addingValues = [];
    }
    if (newValue) {
      state.addingValues.push(newValue);
    }
  },
  setAddingRange: function setAddingRange(state, value) {
    state.addingRange = value;
  },
  setAddingChecked: function setAddingChecked(state, value) {
    state.addingChecked = value;
  },
  removeAddingValueAtIndex: function removeAddingValueAtIndex(state, value) {
    state.removeAddingValueAtIndex = value;
  },
  setSchemata: function setSchemata(state, schema) {
    state.schemata[schema.id] = schema.obj;
  },
  setSchemataLookup: function setSchemataLookup(state, payload) {
    var i = payload.index;
    var schema = payload.schema;
    state.schemataLookup[schema.id][schema.obj[i]["@id"]] = schema.obj[i];
  },
  setEmptySchemataLookup: function setEmptySchemataLookup(state, schema) {
    state.schemataLookup[schema.id] = {};
  },
  setObjectModel: function setObjectModel(state, payload) {
    var domainType = payload.type;
    var val = payload.val;
    state.objectModel[domainType["@id"]] = val;
  },
  rawSchemata: function rawSchemata(state, schema) {
    state.rawSchemata[schema.id] = schema.obj;
  },
  competencySearchModalOpen: function competencySearchModalOpen(state, bool) {
    state.competencySearchModalOpen = bool;
  },
  copyOrLink: function copyOrLink(state, bool) {
    state.copyOrLink = bool;
  },
  incrementNumPropertyComponents: function incrementNumPropertyComponents(state, thingId) {
    if (!state.numPropertyComponentsVisible[thingId]) {
      state.numPropertyComponentsVisible[thingId] = 0;
    }
    state.numPropertyComponentsVisible[thingId]++;
  },
  decrementNumPropertyComponents: function decrementNumPropertyComponents(state, thingId) {
    state.numPropertyComponentsVisible[thingId]--;
    if (state.numPropertyComponentsVisible[thingId] === 0) {
      delete state.numPropertyComponentsVisible[thingId];
    }
  },
  searchType: function searchType(state, type) {
    state.searchType = type;
  },
  includeRelations: function includeRelations(state, bool) {
    state.includeRelations = bool;
  }
};
var getters = {
  isSavingProperty: function isSavingProperty(state) {
    return state.isSavingProperty;
  },
  isSavingThing: function isSavingThing(state) {
    return state.isSavingThing;
  },
  isAddingProperty: function isAddingProperty(state) {
    return state.isAddingProperty;
  },
  addingProperty: function addingProperty(state) {
    return state.addingProperty;
  },
  addingValues: function addingValues(state) {
    return state.addingValues;
  },
  addingRange: function addingRange(state) {
    return state.addingRange;
  },
  addingChecked: function addingChecked(state) {
    return state.addingChecked;
  },
  removeAddingValueAtIndex: function removeAddingValueAtIndex(state) {
    return state.removeAddingValueAtIndex;
  },
  includeRelations: function includeRelations(state) {
    return state.includeRelations;
  }
};
function trimUrl(url) {
  if (!url) {
    return undefined;
  }
  if (url === "" || url["@value"] && url["@value"] === "") {
    return undefined;
  }
  var trimmed = url;
  if (trimmed["@value"] && typeof trimmed["@value"] === "string" && trimmed["@value"].endsWith("/")) {
    trimmed["@value"] = trimmed["@value"].slice(0, trimmed["@value"].length - 1);
  }
  if (trimmed["@value"] && typeof trimmed["@value"] === "string" && trimmed["@value"].startsWith("/")) {
    trimmed["@value"] = trimmed["@value"].slice(1);
  }
  if (trimmed && typeof trimmed === "string" && trimmed.endsWith("/")) {
    trimmed = trimmed.slice(0, trimmed.length - 1);
  }
  if (trimmed && typeof trimmed === "string" && trimmed.startsWith("/")) {
    trimmed = trimmed.slice(1);
  }
  return trimmed;
}
jsonld.documentLoader = /*#__PURE__*/function () {
  var _ref3 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])().mark(function _callee(url) {
    var context, xmlhttp, originalUrl, index, ending;
    return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(url in state.rawSchemata)) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", {
            contextUrl: null,
            // this is for a context via a link header
            document: state.rawSchemata[url],
            // this is the actual document that was loaded
            documentUrl: url // this is the actual context URL after redirects
          });
        case 4:
          xmlhttp = new XMLHttpRequest();
          xmlhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
              context = JSON.parse(this.responseText);
              state.rawSchemata[originalUrl] = context;
            }
          };
          originalUrl = url;
          index = url.indexOf('schema.cassproject.org');
          ending = "";
          if (url.substring(url.lastIndexOf('/')).indexOf('2') === -1) {
            ending = "/index.json-ld";
          }
          if (index !== -1) {
            url = url.substring(index);
            url = window.location.origin + window.location.pathname + url + ending;
          }
          xmlhttp.open("GET", url, false);
          xmlhttp.setRequestHeader("Accept", "application/json");
          xmlhttp.send();
          return _context.abrupt("return", {
            contextUrl: null,
            // this is for a context via a link header
            document: context,
            // this is the actual document that was loaded
            documentUrl: originalUrl // this is the actual context URL after redirects
          });
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x) {
    return _ref3.apply(this, arguments);
  };
}();
/* harmony default export */ __webpack_exports__["a"] = ({
  namespaced: true,
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "872c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("b64b");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_starts_with_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("2ca0");
/* harmony import */ var core_js_modules_es_string_starts_with_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_starts_with_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("d3b7");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("ddb0");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("e9c4");
/* harmony import */ var core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("b0c0");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("ac1f");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("841c");
/* harmony import */ var core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("5319");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("14d9");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("fb6a");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("caad");
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("2532");
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("c7eb");
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("1da1");
/* harmony import */ var dateformat__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("b9b9");





























/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      conceptCtids: null,
      conceptRegistryUrls: null
    };
  },
  computed: {
    ctids: function ctids() {
      var framework = this.framework;
      if (!framework) {
        framework = this.$store.getters['editor/framework'];
      }
      if (!framework || !framework.id) {
        return null;
      }
      if (this.$store.getters['editor/queryParams'] && this.$store.getters['editor/queryParams'].ceasnDataFields !== "true") {
        return null;
      }
      var obj = {};
      obj[framework.shortId()] = [{
        "@value": this.getCTID(framework.shortId())
      }];
      if (framework.competency) {
        for (var i = 0; i < framework.competency.length; i++) {
          obj[framework.competency[i]] = [{
            "@value": this.getCTID(framework.competency[i])
          }];
        }
      }
      return obj;
    },
    registryURLs: function registryURLs() {
      var framework = this.framework;
      if (!framework) {
        framework = this.$store.getters['editor/framework'];
      }
      if (!framework || !framework.id) {
        return null;
      }
      if (this.$store.getters['editor/queryParams'] && this.$store.getters['editor/queryParams'].ceasnDataFields !== "true") {
        return null;
      }
      var obj = {};
      obj[framework.shortId()] = [{
        "@id": this.ceasnRegistryUriTransform(framework.shortId())
      }];
      if (framework.competency) {
        for (var i = 0; i < framework.competency.length; i++) {
          obj[framework.competency[i]] = [{
            "@id": this.ceasnRegistryUriTransform(framework.competency[i])
          }];
        }
      }
      return obj;
    }
  },
  methods: {
    canEditAny: function canEditAny(item) {
      if (this.isAdmin()) return true;
      if (item.canEditAny == null) return true;
      return item.canEditAny(EcIdentityManager.default.getMyPks());
    },
    isAdmin: function isAdmin() {
      if (EcIdentityManager.default.ids.length > 0 && window.repo.adminKeys != null && window.repo.adminKeys.length > 0) {
        if (window.repo.adminKeys[0] === EcIdentityManager.default.ids[0].ppk.toPk().toPem()) {
          return true;
        }
      }
      return false;
    },
    getConceptCtids: function () {
      var _getConceptCtids = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])().mark(function _callee2() {
        var framework, me, obj, subCtids;
        return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              this.conceptCtids = null;
              framework = this.framework;
              if (!framework) {
                framework = this.$store.getters['editor/framework'];
              }
              if (!(!framework || !framework.id)) {
                _context2.next = 5;
                break;
              }
              return _context2.abrupt("return");
            case 5:
              me = this;
              if (!(this.queryParams.ceasnDataFields !== "true")) {
                _context2.next = 8;
                break;
              }
              return _context2.abrupt("return");
            case 8:
              obj = {};
              obj[framework.shortId()] = [{
                "@value": this.getCTID(framework.shortId())
              }];
              subCtids = /*#__PURE__*/function () {
                var _ref = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])().mark(function _callee(ary) {
                  var i, concept;
                  return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])().wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        i = 0;
                      case 1:
                        if (!(i < ary.length)) {
                          _context.next = 12;
                          break;
                        }
                        obj[ary[i]] = [{
                          "@value": me.getCTID(ary[i])
                        }];
                        _context.next = 5;
                        return EcConcept.get(ary[i]);
                      case 5:
                        concept = _context.sent;
                        if (!concept["skos:narrower"]) {
                          _context.next = 9;
                          break;
                        }
                        _context.next = 9;
                        return subCtids(concept["skos:narrower"]);
                      case 9:
                        i++;
                        _context.next = 1;
                        break;
                      case 12:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                }));
                return function subCtids(_x) {
                  return _ref.apply(this, arguments);
                };
              }();
              if (!framework["skos:hasTopConcept"]) {
                _context2.next = 14;
                break;
              }
              _context2.next = 14;
              return subCtids(framework["skos:hasTopConcept"]);
            case 14:
              this.conceptCtids = obj;
            case 15:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function getConceptCtids() {
        return _getConceptCtids.apply(this, arguments);
      }
      return getConceptCtids;
    }(),
    getConceptRegistryUrls: function () {
      var _getConceptRegistryUrls = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])().mark(function _callee4() {
        var framework, me, obj, subURLs;
        return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              this.conceptRegistryUrls = null;
              framework = this.framework;
              if (!framework) {
                framework = this.$store.getters['editor/framework'];
              }
              if (!(!framework || !framework.id)) {
                _context4.next = 5;
                break;
              }
              return _context4.abrupt("return");
            case 5:
              me = this;
              if (!(this.queryParams.ceasnDataFields !== "true")) {
                _context4.next = 8;
                break;
              }
              return _context4.abrupt("return");
            case 8:
              obj = {};
              obj[framework.shortId()] = [{
                "@id": this.ceasnRegistryUriTransform(framework.shortId())
              }];
              subURLs = /*#__PURE__*/function () {
                var _ref2 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])().mark(function _callee3(ary) {
                  var i, concept;
                  return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])().wrap(function _callee3$(_context3) {
                    while (1) switch (_context3.prev = _context3.next) {
                      case 0:
                        i = 0;
                      case 1:
                        if (!(i < ary.length)) {
                          _context3.next = 12;
                          break;
                        }
                        obj[ary[i]] = [{
                          "@value": me.ceasnRegistryUriTransform(ary[i])
                        }];
                        _context3.next = 5;
                        return EcConcept.get(ary[i]);
                      case 5:
                        concept = _context3.sent;
                        if (!concept["skos:narrower"]) {
                          _context3.next = 9;
                          break;
                        }
                        _context3.next = 9;
                        return subURLs(concept["skos:narrower"]);
                      case 9:
                        i++;
                        _context3.next = 1;
                        break;
                      case 12:
                      case "end":
                        return _context3.stop();
                    }
                  }, _callee3);
                }));
                return function subURLs(_x2) {
                  return _ref2.apply(this, arguments);
                };
              }();
              if (!framework["skos:hasTopConcept"]) {
                _context4.next = 14;
                break;
              }
              _context4.next = 14;
              return subURLs(framework["skos:hasTopConcept"]);
            case 14:
              this.conceptRegistryUrls = obj;
            case 15:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function getConceptRegistryUrls() {
        return _getConceptRegistryUrls.apply(this, arguments);
      }
      return getConceptRegistryUrls;
    }(),
    spitEvent: function spitEvent(message, id, page) {
      var framework = this.framework ? this.framework : this.$store.state.editor.framework;
      var selectedCompetency = this.$store.state.editor.selectedCompetency;
      var frameworkName = null;
      if (framework) {
        if (framework["dcterms:title"]) {
          frameworkName = schema.Thing.getDisplayStringFrom(framework["dcterms:title"]);
        } else {
          frameworkName = framework.getName();
        }
      }
      var compName = null;
      if (selectedCompetency) {
        if (selectedCompetency["skos:prefLabel"]) {
          compName = schema.Thing.getDisplayStringFrom(selectedCompetency["skos:prefLabel"]);
        } else {
          compName = selectedCompetency.getName();
        }
      }
      var evt = {
        message: message,
        changed: id,
        selectedFramework: framework == null ? null : framework.shortId(),
        selectedCompetency: selectedCompetency == null ? null : selectedCompetency.shortId(),
        selectedFrameworkObject: framework == null ? null : JSON.parse(framework.toJson()),
        selectedCompetencyObject: selectedCompetency == null ? null : JSON.parse(selectedCompetency.toJson()),
        selectedFrameworkName: frameworkName,
        selectedCompetencyName: compName,
        visiblePage: page
      };
      if (this.queryParams && this.queryParams.ceasnDataFields === "true") {
        if (framework != null) {
          if (framework.getGuid != null) {
            if (framework.getGuid().startsWith("ce-")) {
              evt.selectedFrameworkCtid = framework == null ? null : framework.getGuid();
            } else if (framework.getGuid().matches("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$")) {
              evt.selectedFrameworkCtid = framework == null ? null : "ce-" + framework.getGuid();
            } else {
              evt.selectedFrameworkCtid = "ce-" + new UUID(3, "nil", framework.shortId()).format();
            }
          }
        }
        if (selectedCompetency != null) {
          if (selectedCompetency.getGuid != null) {
            if (selectedCompetency.getGuid().startsWith("ce-")) {
              evt.selectedCompetencyCtid = selectedCompetency == null ? null : selectedCompetency.getGuid();
            } else if (selectedCompetency.getGuid().matches("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$")) {
              evt.selectedCompetencyCtid = selectedCompetency == null ? null : "ce-" + selectedCompetency.getGuid();
            } else {
              evt.selectedCompetencyCtid = "ce-" + new UUID(3, "nil", this.framework.shortId() + selectedCompetency.shortId()).format();
            }
          }
        }
      }
      appLog(evt);
      if (parent != null) {
        if (this.queryParams && this.queryParams.origin != null && this.queryParams.origin !== '') {
          parent.postMessage(evt, this.queryParams.origin);
        }
      }
    },
    setDefaultLanguage: function setDefaultLanguage() {
      var defaultLanguage;
      if (this.framework && this.framework["ceasn:inLanguage"]) {
        defaultLanguage = EcArray.isArray(this.framework["ceasn:inLanguage"]) ? this.framework["ceasn:inLanguage"][0] : this.framework["ceasn:inLanguage"];
      } else if (this.framework && this.framework["schema:inLanguage"]) {
        defaultLanguage = EcArray.isArray(this.framework["schema:inLanguage"]) ? this.framework["schema:inLanguage"][0] : this.framework["schema:inLanguage"];
      } else if (this.framework && this.framework["dcterms:language"]) {
        defaultLanguage = EcArray.isArray(this.framework["dcterms:language"]) ? this.framework["dcterms:language"][0] : this.framework["dcterms:language"];
      } else if (navigator.language || navigator.userLanguage) {
        defaultLanguage = navigator.language || navigator.userLanguage;
      } else {
        defaultLanguage = "en";
      }
      this.$store.commit('editor/defaultLanguage', defaultLanguage);
    },
    get: function get(server, service, headers, success, failure) {
      var url = EcRemote.urlAppend(server, service);
      url = EcRemote.upgradeHttpToHttps(url);
      var xhr = null;
      if (typeof httpStatus === "undefined") {
        xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        if (headers != null) {
          var keys = EcObject.keys(headers);
          for (var i = 0; i < keys.length; i++) {
            xhr.setRequestHeader(keys[i], headers[keys[i]]);
          }
        }
        var xhrx = xhr;
        xhr.onreadystatechange = function () {
          if (xhrx.readyState === 4 && xhrx.status === 200) {
            if (success != null) {
              success(xhrx.responseText);
            } else if (xhrx.readyState === 4) {
              if (failure != null) {
                failure(xhrx.status + " " + xhrx.responseText);
              }
            }
          }
        };
        xhr.onload = function () {
          if (xhr.status !== 200) {
            failure(xhr.status);
          }
        };
        xhr.onerror = function () {
          failure("Failed while sending request.");
        };
      }
      if (xhr != null) {
        xhr["timeout"] = EcRemote.timeout;
      }
      if (typeof httpStatus !== "undefined") {
        if (success != null) {
          success(JSON.stringify(httpGet(url)));
        }
      } else {
        xhr.send();
      }
    },
    resolveNameFromUrl: function resolveNameFromUrl(url) {
      this.get(url, null, null, function (data) {
        var name = null;
        if (data) {
          if (data[0] === "<") {
            return;
          }
          data = JSON.parse(data);
          if (data['ceterms:name']) {
            name = data['ceterms:name'];
          } else if (data['ceasn:competencyText']) {
            name = data['ceasn:competencyText'];
          } else if (data['name']) {
            name = data['name'];
          } else if (data['schema:name']) {
            name = data['schema:name'];
          } else if (data['title']) {
            name = data['title'];
          } else if (data['skos:prefLabel']) {
            name = data['skos:prefLabel'];
          } else if (data['title']) {
            name = data['title'];
          } else if (data['@graph'] && data['@graph'][0]) {
            if (data['@graph'][0]['ceterms:name']) {
              name = data['@graph'][0]['ceterms:name'];
            } else if (data['@graph'][0]['name']) {
              name = data['@graph'][0]['name'];
            } else if (data['@graph'][0]['schema:name']) {
              name = data['@graph'][0]['schema:name'];
            } else if (data['@graph'][0]['title']) {
              name = data['@graph'][0]['title'];
            } else if (data['@graph'][0]['skos:prefLabel']) {
              name = data['@graph'][0]['skos:prefLabel'];
            }
          }
          // If it's a langstring
          name = schema.Thing.getDisplayStringFrom(name);
          // If still object, display value
          if (EcObject.isObject(name)) {
            var langs = Object.keys(name);
            name = name[langs[0]];
          }
        }
        return name;
      }, function (error) {
        appLog(error);
      });
    },
    conditionalDelete: function conditionalDelete(id, depth) {
      var me = this;
      (function (id, depth) {
        Task.asyncImmediate(function (callback) {
          if (depth === undefined || depth == null) depth = 0;
          if (id == null || id === undefined) {
            appLog("ID is undefined.");
          }
          if (depth < 5) {
            EcFramework.search(window.repo, "\"" + id + "\"", /*#__PURE__*/function () {
              var _ref3 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])().mark(function _callee5(results) {
                var obj;
                return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])().wrap(function _callee5$(_context5) {
                  while (1) switch (_context5.prev = _context5.next) {
                    case 0:
                      if (!(results.length <= 0)) {
                        _context5.next = 8;
                        break;
                      }
                      appLog("No references found for " + id + "... deleting.");
                      _context5.next = 4;
                      return EcRepository.get(id);
                    case 4:
                      obj = _context5.sent;
                      window.repo.deleteRegistered(obj, function (success) {
                        if (obj.type === "Level") {
                          me.$store.commit('editor/refreshLevels', true);
                        }
                        callback();
                      }, function (failure) {
                        appLog(failure);
                        callback();
                      });
                      _context5.next = 11;
                      break;
                    case 8:
                      appLog(results.length + " references found for " + id + "... Not deleting. Will see again in another second.");
                      callback();
                      setTimeout(function () {
                        me.conditionalDelete(id, depth + 1);
                      }, 1000);
                    case 11:
                    case "end":
                      return _context5.stop();
                  }
                }, _callee5);
              }));
              return function (_x3) {
                return _ref3.apply(this, arguments);
              };
            }(), appError, {});
          } else {
            callback();
          }
        });
      })(id, depth);
    },
    selectButton: function () {
      var _selectButton = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])().mark(function _callee6(selectedArray) {
        var ary, i, link, success, relation, currentFramework, _success, message;
        return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              ary = [];
              if (!selectedArray) {
                selectedArray = this.selectedArray;
              }
              i = 0;
            case 3:
              if (!(i < selectedArray.length)) {
                _context6.next = 36;
                break;
              }
              if (!(this.queryParams.selectVerbose === "true" && this.$store.getters['editor/conceptMode'] !== true && this.$store.getters['editor/progressionMode'] !== true)) {
                _context6.next = 22;
                break;
              }
              if (!(this.queryParams.selectExport === "ctdlasn")) {
                _context6.next = 13;
                break;
              }
              if (EcRepository.shouldTryUrl(selectedArray[i]) === false && selectedArray[i].indexOf(window.repo.selectedServer) === -1) {
                link = window.repo.selectedServer + "ceasn/" + EcCrypto.md5(selectedArray[i]);
              } else {
                link = selectedArray[i].replace("/data/", "/ceasn/");
              }
              _context6.next = 9;
              return EcRemote.getExpectingObject(link);
            case 9:
              success = _context6.sent;
              if (success) {
                ary.push(success);
              }
              _context6.next = 20;
              break;
            case 13:
              _context6.t0 = ary;
              _context6.t1 = JSON;
              _context6.next = 17;
              return EcCompetency.get(selectedArray[i]);
            case 17:
              _context6.t2 = _context6.sent.toJson();
              _context6.t3 = _context6.t1.parse.call(_context6.t1, _context6.t2);
              _context6.t0.push.call(_context6.t0, _context6.t3);
            case 20:
              _context6.next = 33;
              break;
            case 22:
              if (!(this.queryParams.selectVerbose === "true")) {
                _context6.next = 32;
                break;
              }
              _context6.t4 = ary;
              _context6.t5 = JSON;
              _context6.next = 27;
              return EcConcept.get(selectedArray[i]);
            case 27:
              _context6.t6 = _context6.sent.toJson();
              _context6.t7 = _context6.t5.parse.call(_context6.t5, _context6.t6);
              _context6.t4.push.call(_context6.t4, _context6.t7);
              _context6.next = 33;
              break;
            case 32:
              ary.push(selectedArray[i]);
            case 33:
              i++;
              _context6.next = 3;
              break;
            case 36:
              if (!(this.queryParams.selectRelations === "true" && this.framework.relation)) {
                _context6.next = 46;
                break;
              }
              i = 0;
            case 38:
              if (!(i < this.framework.relation.length)) {
                _context6.next = 46;
                break;
              }
              _context6.next = 41;
              return EcAlignment.get(this.framework.relation[i]);
            case 41:
              relation = _context6.sent;
              if (EcArray.has(selectedArray, relation.target)) {
                if (this.queryParams.selectVerbose === "true") {
                  ary.push(JSON.parse(relation.toJson()));
                } else {
                  ary.push(relation.shortId());
                }
              }
            case 43:
              i++;
              _context6.next = 38;
              break;
            case 46:
              currentFramework = this.framework;
              if (!(this.queryParams.selectExport === "ctdlasn" && this.$store.getters['editor/conceptMode'] !== true && this.$store.getters['editor/progressionMode'] !== true)) {
                _context6.next = 54;
                break;
              }
              if (!(this.framework != null)) {
                _context6.next = 54;
                break;
              }
              if (EcRepository.shouldTryUrl(this.framework.id) === false && this.framework.id.indexOf(window.repo.selectedServer) === -1) {
                link = window.repo.selectedServer + "ceasn/" + EcCrypto.md5(this.framework.shortId());
              } else {
                link = this.framework.id.replace("/data/", "/ceasn/");
              }
              _context6.next = 52;
              return EcRemote.getExpectingObject(link);
            case 52:
              _success = _context6.sent;
              if (_success) {
                // success = JSON.parse(success);
                if (_success["@graph"]) {
                  currentFramework = _success["@graph"][0];
                }
              }
            case 54:
              message = {
                message: "selected",
                selected: ary,
                type: this.$store.getters['editor/conceptMode'] === true || this.$store.getters['editor/progressionMode'] === true ? 'Concept' : 'Competency',
                selectedFramework: currentFramework
              };
              message = JSON.parse(JSON.stringify(message));
              appLog(message);
              parent.postMessage(message, this.queryParams.origin);
            case 58:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function selectButton(_x4) {
        return _selectButton.apply(this, arguments);
      }
      return selectButton;
    }(),
    addLevel: function () {
      var _addLevel = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])().mark(function _callee8(selectedCompetency, optionalLevelUrlOrName) {
        var c, me, framework, initialLevels;
        return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              me = this;
              framework = this.framework ? this.framework : this.$store.getters['editor/framework'];
              initialLevels = framework.level ? framework.level.slice() : null;
              if (!(!optionalLevelUrlOrName || !optionalLevelUrlOrName.includes('http'))) {
                _context8.next = 11;
                break;
              }
              c = new EcLevel();
              if (this.queryParams.newObjectEndpoint != null) {
                c.generateShortId(this.queryParams.newObjectEndpoint);
              } else {
                c.generateId(window.repo.selectedServer);
              }
              c["schema:dateCreated"] = new Date().toISOString();
              c.name = optionalLevelUrlOrName && optionalLevelUrlOrName !== "" ? optionalLevelUrlOrName : "New Level";
              c.competency = selectedCompetency;
              _context8.next = 17;
              break;
            case 11:
              optionalLevelUrlOrName = optionalLevelUrlOrName[0];
              _context8.next = 14;
              return EcRepository.get(optionalLevelUrlOrName);
            case 14:
              c = _context8.sent;
              if (!c.competency) {
                c.competency = [];
              } else if (!EcArray.isArray(c.competency)) {
                c.competency = [c.competency];
              }
              c.competency.push(selectedCompetency);
            case 17:
              framework["schema:dateModified"] = new Date().toISOString();
              window.repo.saveTo(c, /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])().mark(function _callee7() {
                var edits;
                return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])().wrap(function _callee7$(_context7) {
                  while (1) switch (_context7.prev = _context7.next) {
                    case 0:
                      framework.addLevel(c.shortId());
                      edits = [];
                      if (!optionalLevelUrlOrName || !optionalLevelUrlOrName.includes('http')) {
                        edits.push({
                          operation: "addNew",
                          id: c.shortId()
                        });
                      }
                      edits.push({
                        operation: "update",
                        id: framework.shortId(),
                        fieldChanged: ["level"],
                        initialValue: [initialLevels],
                        changedValue: [framework.level]
                      });
                      me.$store.commit('editor/addEditsToUndo', edits);
                      me.$store.commit('editor/framework', framework);
                      if (!(me.$store.state.editor.private === true)) {
                        _context7.next = 11;
                        break;
                      }
                      if (!(EcEncryptedValue.encryptOnSaveMap[framework.id] !== true)) {
                        _context7.next = 11;
                        break;
                      }
                      _context7.next = 10;
                      return EcEncryptedValue.toEncryptedValue(framework);
                    case 10:
                      framework = _context7.sent;
                    case 11:
                      window.repo.saveTo(framework, function () {
                        me.$store.commit('lode/setIsAddingProperty', false);
                        me.$store.commit('editor/refreshLevels', true);
                      }, appError);
                    case 12:
                    case "end":
                      return _context7.stop();
                  }
                }, _callee7);
              })), appError);
            case 19:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function addLevel(_x5, _x6) {
        return _addLevel.apply(this, arguments);
      }
      return addLevel;
    }(),
    saveCheckedLevels: function () {
      var _saveCheckedLevels = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])().mark(function _callee9(selectedCompetency, checkedOptions, allOptions) {
        var competencyId, initialLevels, frameworkChanged, edits, me, i, level, initialComp, levelChanged, each, _levelChanged, _each;
        return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              competencyId = [];
              if (EcArray.isArray(selectedCompetency)) {
                competencyId = selectedCompetency;
              } else {
                competencyId.push(EcRemoteLinkedData.trimVersionFromUrl(selectedCompetency["@id"]));
              }
              initialLevels = this.framework.level ? this.framework.level.slice() : null;
              frameworkChanged = false;
              edits = [];
              me = this;
              i = 0;
            case 7:
              if (!(i < allOptions.length)) {
                _context9.next = 32;
                break;
              }
              if (!this.framework.level) {
                this.framework.level = [];
              }
              // If selected
              if (!(checkedOptions.indexOf(allOptions[i].val) !== -1)) {
                _context9.next = 21;
                break;
              }
              _context9.next = 12;
              return EcLevel.get(allOptions[i].val);
            case 12:
              level = _context9.sent;
              initialComp = JSON.parse(JSON.stringify(level.competency));
              if (!EcArray.isArray(level.competency)) {
                level.competency = level.competency == null ? [] : [level.competency];
              }
              levelChanged = false;
              for (each in competencyId) {
                if (level.competency.indexOf(competencyId[each]) === -1) {
                  level.competency.push(competencyId[each]);
                  levelChanged = true;
                }
              }
              if (levelChanged) {
                edits.push({
                  operation: "update",
                  id: level.shortId(),
                  fieldChanged: ["competency"],
                  initialValue: [initialComp],
                  changedValue: [level.competency]
                });
                window.repo.saveTo(level, function () {
                  me.$store.commit('editor/refreshLevels', true);
                }, appError);
              }
              if (this.framework.level.indexOf(level.shortId()) === -1) {
                this.framework.addLevel(level.shortId());
                frameworkChanged = true;
              }
              _context9.next = 29;
              break;
            case 21:
              _context9.next = 23;
              return EcLevel.get(allOptions[i].val);
            case 23:
              level = _context9.sent;
              initialComp = JSON.parse(JSON.stringify(level.competency));
              _levelChanged = false;
              for (_each in competencyId) {
                if (level.competency && level.competency.indexOf(competencyId[_each]) !== -1) {
                  EcArray.setRemove(level.competency, competencyId[_each]);
                  _levelChanged = true;
                }
              }
              if (_levelChanged) {
                edits.push({
                  operation: "update",
                  id: level.shortId(),
                  fieldChanged: ["competency"],
                  initialValue: [initialComp],
                  changedValue: [level.competency]
                });
                window.repo.saveTo(level, function () {
                  me.$store.commit('editor/refreshLevels', true);
                }, appError);
              }
              // If level doesn't have any competencies attached, remove it from the framework.
              if ((!level.competency || level.competency && level.competency.length === 0) && this.framework.level.indexOf(level.shortId()) !== -1) {
                EcArray.setRemove(this.framework.level, level.shortId());
                frameworkChanged = true;
              }
            case 29:
              i++;
              _context9.next = 7;
              break;
            case 32:
              if (frameworkChanged) {
                edits.push({
                  operation: "update",
                  id: this.framework.shortId(),
                  fieldChanged: ["level"],
                  initialValue: [initialLevels],
                  changedValue: [this.framework.level]
                });
                this.saveFramework();
              }
              this.$store.commit('editor/addEditsToUndo', edits);
              this.$store.commit('lode/setAddingChecked', []);
              this.$store.commit('lode/setIsAddingProperty', false);
            case 36:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this);
      }));
      function saveCheckedLevels(_x7, _x8, _x9) {
        return _saveCheckedLevels.apply(this, arguments);
      }
      return saveCheckedLevels;
    }(),
    saveFramework: function () {
      var _saveFramework = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])().mark(function _callee10() {
        var framework;
        return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              this.framework["schema:dateModified"] = new Date().toISOString();
              framework = this.framework;
              this.$store.commit('editor/framework', framework);
              if (!(this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true)) {
                _context10.next = 7;
                break;
              }
              _context10.next = 6;
              return EcEncryptedValue.toEncryptedValue(framework);
            case 6:
              framework = _context10.sent;
            case 7:
              window.repo.saveTo(framework, function () {}, appError);
            case 8:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this);
      }));
      function saveFramework() {
        return _saveFramework.apply(this, arguments);
      }
      return saveFramework;
    }(),
    removeLevelFromFramework: function () {
      var _removeLevelFromFramework = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])().mark(function _callee11(levelId) {
        var initialLevels, level;
        return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              initialLevels = this.framework.level ? this.framework.level.slice() : null;
              this.framework.removeLevel(levelId);
              _context11.next = 4;
              return EcRepository.get(levelId);
            case 4:
              level = _context11.sent;
              this.$store.commit('editor/addEditsToUndo', [{
                operation: "delete",
                obj: level
              }, {
                operation: "update",
                id: this.framework.shortId(),
                fieldChanged: [this.framework.level],
                initialValue: [initialLevels],
                changedValue: [this.framework.level]
              }]);
              this.conditionalDelete(levelId);
              this.saveFramework();
              this.$store.commit('editor/refreshLevels', true);
            case 9:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this);
      }));
      function removeLevelFromFramework(_x10) {
        return _removeLevelFromFramework.apply(this, arguments);
      }
      return removeLevelFromFramework;
    }(),
    addRelationsToFramework: function () {
      var _addRelationsToFramework = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])().mark(function _callee12(selectedCompetency, property, values) {
        return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              if (!(values.length > 0)) {
                _context12.next = 6;
                break;
              }
              _context12.next = 3;
              return EcRepository.get(selectedCompetency);
            case 3:
              selectedCompetency = _context12.sent;
              _context12.next = 6;
              return this.addAlignments(values, selectedCompetency, property);
            case 6:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this);
      }));
      function addRelationsToFramework(_x11, _x12, _x13) {
        return _addRelationsToFramework.apply(this, arguments);
      }
      return addRelationsToFramework;
    }(),
    addAlignments: function () {
      var _addAlignments = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])().mark(function _callee14(targets, thing, relationType, allowSave) {
        var _this = this;
        var urlProperties;
        return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])().wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              if (!(this.$store.getters['editor/queryParams'].concepts === "true" || this.$store.getters['editor/conceptMode'] === true || this.$store.getters['editor/progressionMode'] === true)) {
                _context14.next = 2;
                break;
              }
              return _context14.abrupt("return", this.addConceptAlignments(targets, thing, relationType));
            case 2:
              urlProperties = ["ceasn:knowledgeEmbodied", "ceasn:skillEmbodied", "ceasn:taskEmbodied", "ceasn:abilityEmbodied", "ceasn:comprisedOf", "ceasn:derivedFrom", "ceasn:inferredCompetency", "ceasn:isVersionOf", "ceasn:alignTo", "ceasn:alignFrom"];
              if (!urlProperties.includes(relationType)) {
                _context14.next = 5;
                break;
              }
              return _context14.abrupt("return", this.addRelationAsCompetencyField(targets, thing, relationType, allowSave));
            case 5:
              return _context14.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref5 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])().mark(function _callee13(resolve, reject) {
                  var framework, edits, initialRelations, i, r, dosedo, j, owner, reader, isNew, idx;
                  return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])().wrap(function _callee13$(_context13) {
                    while (1) switch (_context13.prev = _context13.next) {
                      case 0:
                        framework = _this.$store.state.editor.framework;
                        edits = [];
                        initialRelations = framework.relation ? framework.relation.slice() : null;
                        i = 0;
                      case 4:
                        if (!(i < targets.length)) {
                          _context13.next = 28;
                          break;
                        }
                        r = new EcAlignment();
                        if (_this.$store.getters['editor/queryParams'].newObjectEndpoint != null) {
                          r.generateShortId(_this.$store.getters['editor/queryParams'].newObjectEndpoint);
                        } else {
                          r.generateId(window.repo.selectedServer);
                        }
                        edits.push({
                          operation: "addNew",
                          id: r.shortId()
                        });
                        r["schema:dateCreated"] = new Date().toISOString();
                        r.target = EcRemoteLinkedData.trimVersionFromUrl(targets[i]);
                        if (thing.id) {
                          r.source = thing.shortId();
                        } else {
                          r.source = EcRemoteLinkedData.trimVersionFromUrl(thing["@id"]);
                        }
                        if (!(r.target === r.source)) {
                          _context13.next = 13;
                          break;
                        }
                        return _context13.abrupt("return");
                      case 13:
                        r.relationType = relationType;
                        if (r.relationType === "broadens") {
                          dosedo = r.target;
                          r.target = r.source;
                          r.source = dosedo;
                          r.relationType = "narrows";
                        }
                        if (EcIdentityManager.default.ids.length > 0) {
                          r.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
                        }
                        if (framework.owner && framework.owner.length > 0) {
                          for (j = 0; j < framework.owner.length; j++) {
                            owner = framework.owner[j];
                            r.addOwner(EcPk.fromPem(owner));
                          }
                        }
                        if (framework.reader && framework.reader.length > 0) {
                          for (j = 0; j < framework.reader.length; j++) {
                            reader = framework.reader[j];
                            r.addReader(EcPk.fromPem(reader));
                          }
                        }
                        if (!(_this.$store.state.editor.private === true)) {
                          _context13.next = 22;
                          break;
                        }
                        _context13.next = 21;
                        return EcEncryptedValue.toEncryptedValue(r);
                      case 21:
                        r = _context13.sent;
                      case 22:
                        _context13.next = 24;
                        return new Promise(function (res, rej) {
                          window.repo.saveTo(r, res, rej);
                        });
                      case 24:
                        if (thing.type === 'Concept') {
                          if (framework.relation == null) {
                            framework.relation = [];
                          }
                          isNew = true;
                          idx = 0;
                          while (isNew && idx < framework.relation.length) {
                            if (EcRemoteLinkedData.trimVersionFromUrl(framework.relation[idx]).equals(r.id)) {
                              isNew = false;
                            }
                            idx++;
                          }
                          if (isNew) {
                            framework.relation.push(r.id);
                          }
                        } else {
                          framework.addRelation(r.id);
                        }
                      case 25:
                        i++;
                        _context13.next = 4;
                        break;
                      case 28:
                        edits.push({
                          operation: "update",
                          id: framework.shortId(),
                          fieldChanged: ["relation"],
                          initialValue: [initialRelations],
                          changedValue: [framework.relation]
                        });
                        _this.$store.commit('editor/addEditsToUndo', edits);
                        _this.$store.commit('editor/framework', framework);
                        if (!(_this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true)) {
                          _context13.next = 35;
                          break;
                        }
                        _context13.next = 34;
                        return EcEncryptedValue.toEncryptedValue(framework);
                      case 34:
                        framework = _context13.sent;
                      case 35:
                        window.repo.saveTo(framework, resolve, reject);
                      case 36:
                      case "end":
                        return _context13.stop();
                    }
                  }, _callee13);
                }));
                return function (_x18, _x19) {
                  return _ref5.apply(this, arguments);
                };
              }()));
            case 6:
            case "end":
              return _context14.stop();
          }
        }, _callee14, this);
      }));
      function addAlignments(_x14, _x15, _x16, _x17) {
        return _addAlignments.apply(this, arguments);
      }
      return addAlignments;
    }(),
    addRelationAsCompetencyField: function () {
      var _addRelationAsCompetencyField = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])().mark(function _callee16(targets, thing, relationType, allowSave) {
        var _this2 = this;
        return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])().wrap(function _callee16$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              return _context16.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref6 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])().mark(function _callee15(resolve, reject) {
                  var initialValue, i;
                  return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])().wrap(function _callee15$(_context15) {
                    while (1) switch (_context15.prev = _context15.next) {
                      case 0:
                        initialValue = thing[relationType] ? thing[relationType].slice() : null;
                        for (i = 0; i < targets.length; i++) {
                          if (thing[relationType] == null) {
                            thing[relationType] = [];
                          }
                          thing[relationType].push(targets[i]);
                        }
                        _this2.$store.commit('editor/addEditsToUndo', [{
                          operation: "update",
                          id: thing.shortId(),
                          fieldChanged: [relationType],
                          initialValue: [initialValue],
                          changedValue: [thing[relationType]]
                        }]);
                        thing["schema:dateModified"] = new Date().toISOString();
                        if (!(_this2.$store.state.editor.private === true)) {
                          _context15.next = 9;
                          break;
                        }
                        if (!(EcEncryptedValue.encryptOnSaveMap[thing.id] !== true)) {
                          _context15.next = 9;
                          break;
                        }
                        _context15.next = 8;
                        return EcEncryptedValue.toEncryptedValue(thing);
                      case 8:
                        thing = _context15.sent;
                      case 9:
                        window.repo.saveTo(thing, resolve, reject);
                      case 10:
                      case "end":
                        return _context15.stop();
                    }
                  }, _callee15);
                }));
                return function (_x24, _x25) {
                  return _ref6.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context16.stop();
          }
        }, _callee16);
      }));
      function addRelationAsCompetencyField(_x20, _x21, _x22, _x23) {
        return _addRelationAsCompetencyField.apply(this, arguments);
      }
      return addRelationAsCompetencyField;
    }(),
    removeRelationFromFramework: function () {
      var _removeRelationFromFramework = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])().mark(function _callee18(source, property, target) {
        var _this3 = this;
        return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])().wrap(function _callee18$(_context18) {
          while (1) switch (_context18.prev = _context18.next) {
            case 0:
              return _context18.abrupt("return", new Promise(function (resolve, reject) {
                var me = _this3;
                var initialRelations = _this3.framework.relation ? _this3.framework.relation.slice() : null;
                var edits = [];
                new EcAsyncHelper().each(_this3.framework.relation, function (relation, callback) {
                  EcAlignment.get(relation, function (r) {
                    if (property === "broadens") {
                      if (r.target === source && r.source === target && r.relationType === "narrows") {
                        me.framework.removeRelation(r.shortId());
                        edits.push({
                          operation: "delete",
                          obj: r
                        });
                        me.conditionalDelete(r.shortId());
                        callback();
                      } else {
                        callback();
                      }
                    } else if (r.source === source && r.target === target && r.relationType === property) {
                      me.framework.removeRelation(r.shortId());
                      edits.push({
                        operation: "delete",
                        obj: r
                      });
                      me.conditionalDelete(r.shortId());
                      callback();
                    } else {
                      callback();
                    }
                  }, callback);
                }, /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])().mark(function _callee17() {
                  var framework;
                  return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])().wrap(function _callee17$(_context17) {
                    while (1) switch (_context17.prev = _context17.next) {
                      case 0:
                        framework = me.framework;
                        edits.push({
                          operation: "update",
                          id: framework.shortId(),
                          fieldChanged: ["relation"],
                          initialValue: [initialRelations],
                          changedValue: [framework.relation]
                        });
                        me.$store.commit('editor/framework', framework);
                        me.$store.commit('editor/addEditsToUndo', edits);
                        if (!(me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true)) {
                          _context17.next = 8;
                          break;
                        }
                        _context17.next = 7;
                        return EcEncryptedValue.toEncryptedValue(framework);
                      case 7:
                        framework = _context17.sent;
                      case 8:
                        window.repo.saveTo(framework, resolve, reject);
                      case 9:
                      case "end":
                        return _context17.stop();
                    }
                  }, _callee17);
                })));
              }));
            case 1:
            case "end":
              return _context18.stop();
          }
        }, _callee18);
      }));
      function removeRelationFromFramework(_x26, _x27, _x28) {
        return _removeRelationFromFramework.apply(this, arguments);
      }
      return removeRelationFromFramework;
    }(),
    ceasnRegistryUriTransform: function ceasnRegistryUriTransform(uri) {
      var endpoint = null;
      if (this.$store.getters['editor/queryParams'] && this.$store.getters['editor/queryParams'].newObjectEndpoint) {
        endpoint = this.queryParams.newObjectEndpoint;
      }
      if (endpoint == null) {
        return uri;
      }
      if (uri.startsWith(endpoint)) {
        return uri;
      }
      var ctid = this.getCTID(uri);
      if (endpoint.indexOf("ce-") !== -1) {
        ctid = ctid.substring(3);
      }
      return endpoint + ctid;
    },
    getCTID: function getCTID(uri) {
      var uuid = null;
      var parts = EcRemoteLinkedData.trimVersionFromUrl(uri).split("/");
      uuid = parts[parts.length - 1];
      uri = EcRemoteLinkedData.trimVersionFromUrl(uri);
      if (!uuid.matches("^(ce-)?[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$")) {
        uuid = new UUID(3, "nil", uri).format();
      }
      if (uuid.indexOf("ce-") === -1) {
        uuid = "ce-" + uuid;
      }
      return uuid;
    },
    canViewCommentsCurrentFramework: function canViewCommentsCurrentFramework() {
      // TODO expand on this
      var lop = this.$store.state.user.loggedOnPerson;
      if (lop && lop.id && lop.id !== '') return true;else return false;
    },
    canAddCommentsCurrentFramework: function canAddCommentsCurrentFramework() {
      // TODO expand on this
      var lop = this.$store.state.user.loggedOnPerson;
      if (lop && lop.id && lop.id !== '') return true;else return false;
    },
    toPrettyDateString: function toPrettyDateString(dateInMilliseconds) {
      try {
        var d = new Date(dateInMilliseconds);
        return Object(dateformat__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"])(d, "mm/dd/yy, h:MM:ss TT");
      } catch (err) {
        return 'unknown';
      }
    }
  }
});

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "9224":
/***/ (function(module) {

module.exports = JSON.parse("{\"a\":\"1.5.56\"}");

/***/ }),

/***/ "9e35":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "b3be":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=app.2e3d9c9a.js.map