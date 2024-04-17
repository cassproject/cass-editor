(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["concepts","chunk-4f51c21e","chunk-2d21ecda"],{

/***/ "00fd":
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__("9e69d");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ "1310":
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ "1443":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Comments_vue_vue_type_style_index_0_id_4ed1e043_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("72d6");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Comments_vue_vue_type_style_index_0_id_4ed1e043_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Comments_vue_vue_type_style_index_0_id_4ed1e043_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "1a8c":
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ "29f3":
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ "2b3e":
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__("585a");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ "3109":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FilterAndSort_vue_vue_type_style_index_0_id_e134a7f8_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d261");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FilterAndSort_vue_vue_type_style_index_0_id_e134a7f8_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FilterAndSort_vue_vue_type_style_index_0_id_e134a7f8_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "3486":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RightAside_vue_vue_type_style_index_0_id_10c69596_prod_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fb6a7");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RightAside_vue_vue_type_style_index_0_id_10c69596_prod_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RightAside_vue_vue_type_style_index_0_id_10c69596_prod_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "3558":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ListItemInfo_vue_vue_type_style_index_0_id_3aebcc9e_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("bf12");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ListItemInfo_vue_vue_type_style_index_0_id_3aebcc9e_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ListItemInfo_vue_vue_type_style_index_0_id_3aebcc9e_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "3729":
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__("9e69d"),
    getRawTag = __webpack_require__("00fd"),
    objectToString = __webpack_require__("29f3");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ "3c5b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("14d9");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("c7eb");
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("1da1");




/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    deleteObject: function () {
      var _deleteObject = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])().mark(function _callee(obj) {
        var me, children;
        return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              appLog("deleting " + obj.id);
              me = this;
              _context.next = 4;
              return this.$store.dispatch('editor/getDirectoryChildren', obj);
            case 4:
              children = _context.sent;
              window.repo.multiget(children, function (success) {
                new EcAsyncHelper().each(success, function (obj, done) {
                  if (obj.type === 'Framework') {
                    me.deleteFramework(obj);
                  } else if (obj.type === 'CreativeWork') {
                    me.repo.deleteRegistered(obj, appLog, appError);
                  } else if (obj.type === "Directory") {
                    me.deleteObject(obj);
                  }
                  done();
                }, function (objs) {
                  me.repo.deleteRegistered(obj, function () {
                    me.$store.dispatch('app/refreshDirectories');
                  }, appError);
                  if (obj.shortId() === me.directory.shortId()) {
                    me.$router.push({
                      name: "frameworks"
                    });
                  }
                });
              }, appError);
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function deleteObject(_x) {
        return _deleteObject.apply(this, arguments);
      }
      return deleteObject;
    }(),
    deleteFramework: function deleteFramework(framework) {
      var me = this;
      this.repo.deleteRegistered(framework, function (success) {
        me.spitEvent("frameworkDeleted", framework.shortId(), "directoryPage");
        // Delete the framework, delete all non-used stuff.
        if (framework.competency != null) {
          for (var i = 0; i < framework.competency.length; i++) {
            me.conditionalDelete(framework.competency[i]);
          }
        }
        if (framework.relation != null) {
          for (var i = 0; i < framework.relation.length; i++) {
            me.conditionalDelete(framework.relation[i]);
          }
        }
        if (framework.level != null) {
          for (var i = 0; i < framework.level.length; i++) {
            me.conditionalDelete(framework.level[i]);
          }
        }
      }, appLog);
    },
    onDoneEditingNode: function onDoneEditingNode() {
      var me = this;
      if (this.$store.getters['app/rightAsideObject']) {
        EcRepository.get(this.$store.getters['app/rightAsideObject'].shortId(), function (success) {
          me.$store.commit('app/rightAsideObject', success);
        }, appError);
      }
      this.$store.commit('app/editDirectory', false);
    }
  },
  computed: {
    editDirectory: function editDirectory() {
      return this.$store.getters['app/editDirectory'];
    },
    canEditDirectory: function canEditDirectory() {
      if (!this.directory) {
        return false;
      }
      if (this.queryParams && this.queryParams.view === 'true') {
        return false;
      } else if (!this.canEditAny(this.directory)) {
        return false;
      }
      return true;
    },
    directory: function directory() {
      return this.$store.getters['app/rightAsideObject'];
    },
    directoryProfile: function directoryProfile() {
      return {
        "http://schema.org/name": {
          "@id": "http://schema.org/name",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Directory"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The name of the directory."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Name"
          }],
          "isRequired": "true"
        },
        "http://schema.org/description": {
          "@id": "http://schema.org/description",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Directory"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The description of the directory."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Description"
          }]
        },
        "@id": {
          "@id": "https://schema.cassproject.org/0.4/Framework/id",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The URL of the framework."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Framework URL"
          }],
          "readOnly": "true",
          "max": 1,
          "heading": "Keys"
        },
        "primaryProperties": ["http://schema.org/name", "http://schema.org/description"],
        "secondaryProperties": ["@id"],
        "tertiaryProperties": []
      };
    },
    changedObject: function changedObject() {
      return this.$store.getters['editor/changedObject'];
    }
  },
  watch: {
    changedObject: function changedObject() {
      if (this.changedObject && this.directory && this.changedObject === this.directory.shortId()) {
        var me = this;
        EcRepository.get(this.directory.shortId(), function (dir) {
          if (me.$store.getters['app/selectedDirectory'] && me.$store.getters['app/selectedDirectory'].shortId() === dir.shortId()) {
            me.$store.commit('app/selectDirectory', dir);
          } else {
            me.$store.commit('app/refreshSearch', true);
          }
          if (me.showRightAside && dir.shortId() === me.$store.getters['app/rightAsideObject'].shortId()) {
            me.$store.commit('app/rightAsideObject', dir);
          }
          me.$store.dispatch('app/refreshDirectories');
        }, appError);
        this.$store.commit('editor/changedObject', null);
      }
    }
  }
});

/***/ }),

/***/ "408c":
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__("2b3e");

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),

/***/ "4cef":
/***/ (function(module, exports) {

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

module.exports = trimmedEndIndex;


/***/ }),

/***/ "4e7b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"862f505e-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/AddNewDropdown.vue?vue&type=template&id=82083636
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    directives: [{
      name: "click-outside",
      rawName: "v-click-outside",
      value: _vm.closeCreateDropdown,
      expression: "closeCreateDropdown"
    }],
    staticClass: "dropdown",
    class: [_vm.active ? 'is-active' : '', 'is-' + _vm.align]
  }, [_c('div', {
    staticClass: "dropdown-trigger"
  }, [_c('button', {
    staticClass: "button is-hidden-touch",
    class: 'is-' + _vm.color,
    attrs: {
      "aria-haspopup": "true",
      "aria-controls": "directory-add-dropdown"
    },
    on: {
      "click": function click($event) {
        return _vm.$emit('toggle');
      }
    }
  }, [_vm._m(0), _c('span', [_vm._v("New")]), _vm._m(1)]), _c('button', {
    staticClass: "button is-hidden-desktop is-outlined",
    class: 'is-' + _vm.color,
    attrs: {
      "aria-haspopup": "true",
      "aria-controls": "directory-add-dropdown"
    },
    on: {
      "click": function click($event) {
        return _vm.$emit('toggle');
      }
    }
  }, [_vm._m(2), _vm._m(3)])]), _c('div', {
    staticClass: "dropdown-menu",
    attrs: {
      "id": "directory-add-dropdown",
      "role": "menu"
    }
  }, [_c('div', {
    staticClass: "dropdown-content"
  }, [_vm.frameworkEnabled ? _c('a', {
    staticClass: "dropdown-item",
    attrs: {
      "href": "#"
    },
    on: {
      "click": function click($event) {
        return _vm.$emit('framework');
      }
    }
  }, [_vm._v(" Framework ")]) : _vm._e(), _vm.collectionEnabled ? _c('a', {
    staticClass: "dropdown-item",
    on: {
      "click": function click($event) {
        return _vm.$emit('collection');
      }
    }
  }, [_vm._v(" Collection ")]) : _vm._e(), _vm.subdirectoryEnabled ? _c('a', {
    staticClass: "dropdown-item",
    on: {
      "click": function click($event) {
        return _vm.$emit('subdirectory');
      }
    }
  }, [_vm._v(" Sub directory ")]) : _vm._e(), _vm.directoryEnabled ? _c('a', {
    staticClass: "dropdown-item",
    on: {
      "click": function click($event) {
        return _vm.$emit('directory');
      }
    }
  }, [_vm._v(" Directory ")]) : _vm._e(), _vm.conceptEnabled && _vm.queryParams.ceasnDataFields === 'true' ? _c('a', {
    staticClass: "dropdown-item",
    on: {
      "click": function click($event) {
        return _vm.$emit('concept');
      }
    }
  }, [_vm._v(" Concept Scheme ")]) : _vm._e(), _vm.conceptEnabled && _vm.queryParams.ceasnDataFields === 'true' ? _c('a', {
    staticClass: "dropdown-item",
    on: {
      "click": function click($event) {
        return _vm.$emit('progression');
      }
    }
  }, [_vm._v(" Progression Model ")]) : _vm.conceptEnabled ? _c('a', {
    staticClass: "dropdown-item",
    on: {
      "click": function click($event) {
        return _vm.$emit('concept');
      }
    }
  }, [_vm._v(" Taxonomy ")]) : _vm._e(), _vm.resourceEnabled ? _c('a', {
    staticClass: "dropdown-item",
    attrs: {
      "href": "#"
    },
    on: {
      "click": function click($event) {
        return _vm.$emit('resource');
      }
    }
  }, [_vm._v(" Resource ")]) : _vm._e()])])]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-plus"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fas fa-angle-down",
    attrs: {
      "aria-hidden": "true"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-plus"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fas fa-angle-down",
    attrs: {
      "aria-hidden": "true"
    }
  })]);
}];

// CONCATENATED MODULE: ./src/components/AddNewDropdown.vue?vue&type=template&id=82083636

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/AddNewDropdown.vue?vue&type=script&lang=js


/* harmony default export */ var AddNewDropdownvue_type_script_lang_js = ({
  name: 'AddNewDropdown',
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    align: {
      type: String,
      default: 'right'
    },
    active: {
      type: Boolean,
      default: false
    },
    frameworkEnabled: {
      type: Boolean,
      default: false
    },
    resourceEnabled: {
      type: Boolean,
      default: false
    },
    conceptEnabled: {
      type: Boolean,
      default: false
    },
    directoryEnabled: {
      type: Boolean,
      default: false
    },
    subdirectoryEnabled: {
      type: Boolean,
      default: false
    },
    collectionEnabled: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      createResource: false,
      createFramework: false,
      createDirectory: false,
      createSubdirectory: false
    };
  },
  computed: Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["c" /* mapState */])({
    queryParams: function queryParams(state) {
      return state.editor.queryParams;
    }
  })),
  methods: {
    closeCreateDropdown: function closeCreateDropdown() {
      this.$emit('close');
    }
  }
});
// CONCATENATED MODULE: ./src/components/AddNewDropdown.vue?vue&type=script&lang=js
 /* harmony default export */ var components_AddNewDropdownvue_type_script_lang_js = (AddNewDropdownvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/AddNewDropdown.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_AddNewDropdownvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var AddNewDropdown = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "585a":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "63df":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MainLayout_vue_vue_type_style_index_0_id_7780b418_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fc26");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MainLayout_vue_vue_type_style_index_0_id_7780b418_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MainLayout_vue_vue_type_style_index_0_id_7780b418_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "6675":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"862f505e-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/framework/Comment.vue?vue&type=template&id=9343bfcc
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('ul', {
    staticClass: "comment-list-item"
  }, [_c('li', {
    staticClass: "comment-list__user",
    attrs: {
      "title": _vm.comment.creatorEmail
    }
  }, [_vm._v(" " + _vm._s(_vm.comment.creatorName) + " ")]), _c('li', {
    staticClass: "comment-list__email"
  }, [_vm._v(" " + _vm._s(_vm.comment.creatorEmail) + " ")]), _c('li', {
    staticClass: "comment-list__timestamp"
  }, [_vm._v(" " + _vm._s(_vm.toPrettyDateString(_vm.comment.dateCreated)) + " ")]), _c('li', {
    directives: [{
      name: "click-outside",
      rawName: "v-click-outside",
      value: _vm.closeCommentListDropDown,
      expression: "closeCommentListDropDown"
    }],
    staticClass: "comment-list__message-container"
  }, [_vm.comment.canModify ? _c('div', {
    staticClass: "dropdown",
    class: {
      'is-active': _vm.commentListDropDownActive
    }
  }, [_c('div', {
    staticClass: "dropdown-trigger"
  }, [_c('button', {
    staticClass: "button is-text has-text-dark",
    attrs: {
      "aria-haspopup": "true",
      "aria-controls": "dropdown-menu"
    },
    on: {
      "click": function click($event) {
        _vm.commentListDropDownActive = !_vm.commentListDropDownActive;
      }
    }
  }, [_vm._m(0)])]), _c('div', {
    staticClass: "dropdown-menu",
    attrs: {
      "id": "dropdown-menu",
      "role": "menu"
    }
  }, [_c('div', {
    staticClass: "dropdown-content"
  }, [_c('a', {
    staticClass: "dropdown-item",
    attrs: {
      "href": "#"
    },
    on: {
      "click": _vm.handleClickEdit
    }
  }, [_vm._v(" edit ")]), _c('a', {
    staticClass: "dropdown-item",
    on: {
      "click": _vm.handleClickDelete
    }
  }, [_vm._v(" delete ")])])])]) : _vm._e(), _c('div', {
    staticClass: "comment-list__message-container__message",
    class: {
      'show-more': _vm.showMore
    }
  }, [_vm._v(" " + _vm._s(_vm.comment.commentText) + " ")]), _vm.comment.commentText.length > 90 ? _c('div', {
    staticClass: "buttons is-right"
  }, [_vm.showMore ? _c('div', {
    staticClass: "button is-text has-text-primary",
    on: {
      "click": function click($event) {
        _vm.showMore = false;
      }
    }
  }, [_vm._v(" show less ")]) : _c('div', {
    staticClass: "button is-text has-text-primary",
    on: {
      "click": function click($event) {
        _vm.showMore = true;
      }
    }
  }, [_vm._v(" show more ")])]) : _vm._e()]), _vm.comment.lastEditDate ? _c('li', {
    staticClass: "comment-list__message_edit"
  }, [_vm._v(" *Edited: " + _vm._s(_vm.toPrettyDateString(_vm.comment.lastEditDate)) + " ")]) : _vm._e(), _vm._m(1), _vm.comment.replies.length > 0 ? _c('li', _vm._l(_vm.comment.replies, function (reply) {
    return _c('comment', {
      key: reply.commentId,
      attrs: {
        "comment": reply,
        "canReply": false
      }
    });
  }), 1) : _vm._e()]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon has-text-primary"
  }, [_c('i', {
    staticClass: "fas fa-ellipsis-v"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('li', {
    staticClass: "comment-list__reply_hr"
  }, [_c('hr')]);
}];

// CONCATENATED MODULE: ./src/components/framework/Comment.vue?vue&type=template&id=9343bfcc

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
var createForOfIteratorHelper = __webpack_require__("b85c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__("3ca3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./src/mixins/common.js
var common = __webpack_require__("872c");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/framework/Comment.vue?vue&type=script&lang=js






/* harmony default export */ var Commentvue_type_script_lang_js = ({
  name: 'Comment',
  mixins: [common["a" /* default */]],
  components: {
    comment: function comment() {
      return Promise.resolve(/* import() */).then(__webpack_require__.bind(null, "6675"));
    }
  },
  props: {
    comment: {
      type: Object
    },
    canReply: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      showMore: false,
      commentListDropDownActive: false
    };
  },
  methods: {
    closeCommentListDropDown: function closeCommentListDropDown() {
      this.commentListDropDownActive = false;
    },
    handleClickReply: function handleClickReply() {
      this.$store.commit('editor/setAddCommentAboutId', this.comment.aboutId);
      this.$store.commit('editor/setAddCommentType', 'reply');
      this.$store.commit('editor/setCommentToReply', this.comment.comment);
      this.$store.commit('app/showModal', {
        component: 'AddComment'
      });
    },
    handleClickEdit: function handleClickEdit() {
      this.commentListDropDownActive = false;
      this.$store.commit('editor/setAddCommentAboutId', this.comment.aboutId);
      this.$store.commit('editor/setAddCommentType', 'edit');
      this.$store.commit('editor/setCommentToEdit', this.comment.comment);
      this.$store.commit('app/showModal', {
        component: 'AddComment'
      });
    },
    handleClickEditReply: function handleClickEditReply(replyIdx) {
      this.$store.commit('editor/setAddCommentAboutId', this.comment.aboutId);
      this.$store.commit('editor/setAddCommentType', 'edit');
      this.$store.commit('editor/setCommentToEdit', this.comment.replies[replyIdx].comment);
      this.$store.commit('app/showModal', {
        component: 'AddComment'
      });
    },
    handleClickDelete: function handleClickDelete() {
      var ctd = [];
      ctd.push(this.comment.comment);
      if (this.comment.replies && this.comment.replies.length > 0) {
        var _iterator = Object(createForOfIteratorHelper["a" /* default */])(this.comment.replies),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var r = _step.value;
            ctd.push(r.comment);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      this.$store.commit('editor/setCommentsToDelete', ctd);
      this.$store.commit('app/showModal', {
        component: 'DeleteCommentConfirm'
      });
    },
    handleClickDeleteReply: function handleClickDeleteReply(replyIdx) {
      var ctd = [];
      ctd.push(this.comment.replies[replyIdx].comment);
      this.$store.commit('editor/setCommentsToDelete', ctd);
      this.$store.commit('app/showModal', {
        component: 'DeleteCommentConfirm'
      });
    }
  },
  computed: {
    commentId: function commentId() {
      return this.comment.commentId;
    }
  }
});
// CONCATENATED MODULE: ./src/components/framework/Comment.vue?vue&type=script&lang=js
 /* harmony default export */ var framework_Commentvue_type_script_lang_js = (Commentvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/framework/Comment.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  framework_Commentvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Comment = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "6791":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"862f505e-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/framework/Frameworks.vue?vue&type=template&id=0e067ad0
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('main-layout', {
    class: _vm.showRightAside ? 'right-side-open' : '',
    attrs: {
      "rightActive": _vm.showRightAside
    },
    scopedSlots: _vm._u([{
      key: "top",
      fn: function fn() {
        return [_vm.editDirectory && _vm.canEditDirectory ? _c('thing-editing', {
          attrs: {
            "obj": _vm.$store.getters['app/rightAsideObject'],
            "repo": _vm.repo,
            "parentNotEditable": _vm.queryParams.view === 'true',
            "profile": _vm.directoryProfile
          },
          on: {
            "done-editing-node-event": function doneEditingNodeEvent($event) {
              return _vm.onDoneEditingNode();
            }
          }
        }) : _vm._e(), _c('div', {
          staticClass: "columns is-mobile is-spaced is-vcentered",
          staticStyle: {
            "width": "100%"
          }
        }, [_c('div', {
          staticClass: "column"
        }, [_c('SearchBar', {
          attrs: {
            "filterSet": "all",
            "ownedByMe": _vm.initialOwnedByMe,
            "setFocus": _vm.setFocus,
            "searchType": _vm.type === 'ConceptScheme' ? 'concept scheme' : 'framework'
          }
        })], 1), _c('div', {
          staticClass: "column is-1"
        }), _c('div', {
          staticClass: "column is-narrow"
        }, [_vm.conceptMode ? _c('div', {
          staticClass: "buttons is-right concept-buttons"
        }, [_c('add-new-dropdown', {
          attrs: {
            "conceptEnabled": true,
            "active": _vm.createDropDownActive
          },
          on: {
            "concept": function concept($event) {
              return _vm.$emit('create-new-concept-scheme');
            },
            "progression": function progression($event) {
              return _vm.$emit('create-new-progression-model');
            },
            "close": function close($event) {
              _vm.createDropDownActive = false;
            },
            "toggle": function toggle($event) {
              _vm.createDropDownActive = !_vm.createDropDownActive;
            }
          }
        }), _c('router-link', {
          staticClass: "button is-hidden-touch is-outlined is-primary",
          attrs: {
            "to": {
              path: '/import',
              query: _vm.queryParams
            }
          },
          nativeOn: {
            "click": function click($event) {
              _vm.$store.commit('editor/conceptMode', true);
              _vm.$store.commit('editor/progressionMode', false);
              _vm.$store.dispatch('app/clearImport');
            }
          }
        }, [_c('span', {
          staticClass: "icon"
        }, [_c('i', {
          staticClass: "fa fa-upload"
        })]), _c('span', [_vm._v("import " + _vm._s(_vm.conceptSchemeStringForButton))])]), _c('router-link', {
          staticClass: "button is-hidden-desktop is-outlined is-primary",
          attrs: {
            "to": {
              path: '/import',
              query: _vm.queryParams
            }
          },
          nativeOn: {
            "click": function click($event) {
              _vm.$store.commit('editor/conceptMode', true);
              _vm.$store.commit('editor/progressionMode', false);
              _vm.$store.dispatch('app/clearImport');
            }
          }
        }, [_c('span', {
          staticClass: "icon"
        }, [_c('i', {
          staticClass: "fa fa-upload"
        })])]), _c('a', {
          staticClass: "button is-hidden-touch is-primary is-outlined",
          attrs: {
            "href": "docs/authoring/taxonomies/",
            "target": "_blank",
            "title": "Go to documentation on framework library"
          }
        }, [_c('span', {
          staticClass: "icon"
        }, [_c('i', {
          staticClass: "far fa-question-circle"
        })]), _c('span', {
          staticClass: "is-hidden-touch"
        }, [_vm._v(" Help ")])]), _c('a', {
          staticClass: "button is-primary is-hidden-desktop is-outlined",
          attrs: {
            "href": "docs/authoring/taxonomies/",
            "target": "_blank",
            "title": "Go to documentation on framework library"
          }
        }, [_c('span', {
          staticClass: "icon"
        }, [_c('i', {
          staticClass: "far fa-question-circle"
        })])])], 1) : _vm._e(), _vm.progressionMode ? _c('div', {
          staticClass: "buttons is-right concept-buttons"
        }, [_c('add-new-dropdown', {
          attrs: {
            "conceptEnabled": true,
            "active": _vm.createDropDownActive
          },
          on: {
            "concept": function concept($event) {
              return _vm.$emit('create-new-concept-scheme');
            },
            "progression": function progression($event) {
              return _vm.$emit('create-new-progression-model');
            },
            "close": function close($event) {
              _vm.createDropDownActive = false;
            },
            "toggle": function toggle($event) {
              _vm.createDropDownActive = !_vm.createDropDownActive;
            }
          }
        }), _c('router-link', {
          staticClass: "button is-hidden-touch is-outlined is-primary",
          attrs: {
            "to": {
              path: '/import',
              query: _vm.queryParams
            }
          },
          nativeOn: {
            "click": function click($event) {
              _vm.$store.commit('editor/conceptMode', false);
              _vm.$store.commit('editor/progressionMode', true);
              _vm.$store.dispatch('app/clearImport');
            }
          }
        }, [_c('span', {
          staticClass: "icon"
        }, [_c('i', {
          staticClass: "fa fa-upload"
        })]), _c('span', [_vm._v("import Progression Model")])]), _c('router-link', {
          staticClass: "button is-hidden-desktop is-outlined is-primary",
          attrs: {
            "to": {
              path: '/import',
              query: _vm.queryParams
            }
          },
          nativeOn: {
            "click": function click($event) {
              _vm.$store.commit('editor/conceptMode', false);
              _vm.$store.commit('editor/progressionMode', true);
              _vm.$store.dispatch('app/clearImport');
            }
          }
        }, [_c('span', {
          staticClass: "icon"
        }, [_c('i', {
          staticClass: "fa fa-upload"
        })])]), _c('a', {
          staticClass: "button is-hidden-touch is-primary is-outlined",
          attrs: {
            "href": "docs/authoring/taxonomies/",
            "target": "_blank",
            "title": "Go to documentation on framework library"
          }
        }, [_c('span', {
          staticClass: "icon"
        }, [_c('i', {
          staticClass: "far fa-question-circle"
        })]), _c('span', {
          staticClass: "is-hidden-touch"
        }, [_vm._v(" Help ")])]), _c('a', {
          staticClass: "button is-primary is-hidden-desktop is-outlined",
          attrs: {
            "href": "docs/authoring/taxonomies/",
            "target": "_blank",
            "title": "Go to documentation on framework library"
          }
        }, [_c('span', {
          staticClass: "icon"
        }, [_c('i', {
          staticClass: "far fa-question-circle"
        })])])], 1) : _vm._e(), !_vm.conceptMode && !_vm.progressionMode ? _c('div', {
          staticClass: "buttons is-right frameworks-buttons"
        }, [_c('add-new-dropdown', {
          attrs: {
            "frameworkEnabled": true,
            "collectionEnabled": _vm.queryParams.ceasnDataFields === 'true',
            "directoryEnabled": true,
            "active": _vm.createDropDownActive
          },
          on: {
            "framework": function framework($event) {
              return _vm.$emit('create-new-framework');
            },
            "collection": function collection($event) {
              return _vm.$emit('create-new-collection');
            },
            "directory": function directory($event) {
              return _vm.$store.commit('app/showModal', {
                component: 'AddDirectory'
              });
            },
            "close": function close($event) {
              _vm.createDropDownActive = false;
            },
            "toggle": function toggle($event) {
              _vm.createDropDownActive = !_vm.createDropDownActive;
            }
          }
        }), _c('router-link', {
          staticClass: "button is-outlined is-hidden-desktop is-primary",
          attrs: {
            "to": {
              path: '/import',
              query: _vm.queryParams
            }
          },
          nativeOn: {
            "click": function click($event) {
              _vm.$store.commit('editor/conceptMode', false);
              _vm.$store.commit('editor/progressionMode', false);
              _vm.$store.dispatch('app/clearImport');
            }
          }
        }, [_c('span', {
          staticClass: "icon"
        }, [_c('i', {
          staticClass: "fa fa-upload"
        })])]), _c('router-link', {
          staticClass: "button is-outlined is-hidden-touch is-primary",
          attrs: {
            "to": {
              path: '/import',
              query: _vm.queryParams
            }
          },
          nativeOn: {
            "click": function click($event) {
              _vm.$store.commit('editor/conceptMode', false);
              _vm.$store.commit('editor/progressionMode', false);
              _vm.$store.dispatch('app/clearImport');
            }
          }
        }, [_c('span', {
          staticClass: "icon"
        }, [_c('i', {
          staticClass: "fa fa-upload"
        })]), _c('span', [_vm._v("import")])]), _c('router-link', {
          staticClass: "button is-hidden-touch is-outlined is-primary",
          attrs: {
            "to": {
              path: '/crosswalk',
              query: _vm.queryParams
            }
          }
        }, [_c('span', {
          staticClass: "icon"
        }, [_c('i', {
          staticClass: "fa fa-network-wired"
        })]), _c('span', [_vm._v(" Crosswalk ")])]), _c('router-link', {
          staticClass: "button is-hidden-desktop is-outlined is-primary",
          attrs: {
            "to": {
              path: '/crosswalk',
              query: _vm.queryParams
            }
          }
        }, [_c('span', {
          staticClass: "icon"
        }, [_c('i', {
          staticClass: "fa fa-network-wired"
        })])]), _c('a', {
          staticClass: "button is-hidden-touch is-primary is-outlined",
          attrs: {
            "href": "docs/authoring/competency-and-framework-management/",
            "target": "_blank",
            "title": "Go to documentation on framework library"
          }
        }, [_c('span', {
          staticClass: "icon"
        }, [_c('i', {
          staticClass: "far fa-question-circle"
        })]), _c('span', {
          staticClass: "is-hidden-touch"
        }, [_vm._v(" Help ")])]), _c('a', {
          staticClass: "button is-primary is-hidden-desktop is-outlined",
          attrs: {
            "href": "docs/authoring/competency-and-framework-management/",
            "target": "_blank",
            "title": "Go to documentation on framework library"
          }
        }, [_c('span', {
          staticClass: "icon"
        }, [_c('i', {
          staticClass: "far fa-question-circle"
        })])])], 1) : _vm._e()])])];
      },
      proxy: true
    }, {
      key: "secondary-top",
      fn: function fn() {
        return [_c('div', {
          staticStyle: {
            "width": "100%"
          }
        }, [_c('h2', {
          staticClass: "has-text-dark is-size-5 text-align-left pl-0 ml-0"
        }, [_vm._v(" Available Items ")])])];
      },
      proxy: true
    }, {
      key: "body",
      fn: function fn() {
        return [_c('div', {
          staticClass: "framework-list-page",
          attrs: {
            "id": "frameworks"
          }
        }, [_c('div', {
          staticClass: "container is-fluid"
        }, [_c('List', {
          attrs: {
            "type": _vm.type,
            "repo": _vm.repo,
            "click": _vm.frameworkClick,
            "searchOptions": _vm.searchOptions,
            "paramObj": _vm.paramObj,
            "view": "frameworks",
            "disallowEdits": true
          },
          on: {
            "dblclick": _vm.openItem,
            "search-updated": _vm.refocusSearch
          },
          scopedSlots: _vm._u([{
            key: "frameworkTags",
            fn: function fn(slotProps) {
              return [_c('span', {
                staticClass: "framework-details has-text-weight-light family-primary is-size-7"
              }, [!_vm.conceptMode && !_vm.progressionMode && slotProps.item.type === 'Framework' ? _c('span', {
                staticClass: "framework-details__item"
              }, [_c('span', {
                staticClass: "has-text-weight-medium"
              }, [_vm._v(" Items: ")]), _c('span', {
                staticClass: "has-text-weight-light"
              }, [_vm._v(" " + _vm._s(slotProps.item.competency ? slotProps.item.competency.length : 0) + " ")])]) : _vm._e(), slotProps.item.Published ? _c('span', {
                staticClass: "framework-details__item",
                attrs: {
                  "title": slotProps.item.Published
                }
              }, [_c('span', {
                staticClass: "has-text-weight-medium"
              }, [_vm._v(" Published: ")]), _c('span', {
                staticClass: "has-text-weight-light"
              }, [_vm._v("   " + _vm._s(slotProps.item.Published) + " ")])]) : _vm._e(), slotProps.item.Approved ? _c('span', {
                staticClass: "framework-details__item",
                attrs: {
                  "title": slotProps.item.Approved
                }
              }, [_c('span', {
                staticClass: "has-texte-weight-medium"
              }, [_vm._v(" Approved: ")]), _c('span', {
                staticClass: "has-text-weight-light"
              }, [_vm._v("   " + _vm._s(slotProps.item.Approved) + " ")])]) : _vm._e(), slotProps.item['schema:dateCreated'] ? _c('span', {
                staticClass: "framework-details__item",
                attrs: {
                  "title": new Date(slotProps.item['schema:dateCreated'])
                }
              }, [_c('span', {
                staticClass: "has-text-weight-medium"
              }, [_vm._v(" Created " + _vm._s(_vm.isCeasn ? "(in CaSS)" : "") + ": ")]), _c('span', {
                staticClass: "has-text-weight-light"
              }, [_vm._v("   " + _vm._s(_vm.$moment(new Date(slotProps.item['schema:dateCreated'])).format("MMM D YYYY")) + " ")])]) : _vm._e(), slotProps.item.getTimestamp() ? _c('span', {
                staticClass: "framework-details__item",
                attrs: {
                  "title": new Date(slotProps.item.getTimestamp())
                }
              }, [_c('span', {
                staticClass: "has-text-weight-medium"
              }, [_vm._v(" Last modified " + _vm._s(_vm.isCeasn ? "(in CaSS)" : "") + ": ")]), _c('span', {
                staticClass: "has-text-weight-light"
              }, [_vm._v("   " + _vm._s(_vm.$moment(slotProps.item.getTimestamp()).format("MMM D YYYY")) + " ")])]) : slotProps.item['schema:dateModified'] ? _c('span', {
                staticClass: "framework-details__item",
                attrs: {
                  "title": new Date(slotProps.item['schema:dateModified'])
                }
              }, [_c('span', {
                staticClass: "has-text-weight-medium"
              }, [_vm._v(" Last modified " + _vm._s(_vm.isCeasn ? "(in CaSS)" : "") + ": ")]), _c('span', {
                staticClass: "has-text-weight-light"
              }, [_vm._v(" " + _vm._s(_vm.$moment(new Date(slotProps.item['schema:dateModified'])).format("MMM D YYYY")) + " ")])]) : _vm._e(), slotProps.item['ceasn:publisherName'] && _vm.getName(slotProps.item['ceasn:publisherName']) ? _c('span', {
                staticClass: "framework-details__item"
              }, [_c('span', {
                staticClass: "has-text-weight-medium"
              }, [_vm._v(" Publisher: ")]), _c('span', {
                staticClass: "has-text-weight-light"
              }, [_vm._v(" " + _vm._s(_vm.getName(slotProps.item['ceasn:publisherName'])) + " ")])]) : slotProps.item['schema:publisher'] && _vm.getName(slotProps.item['schema:publisher']) ? _c('span', {
                staticClass: "framework-details__item"
              }, [_c('span', {
                staticClass: "has-text-weight-medium"
              }, [_vm._v(" Publisher: ")]), _c('span', [_vm._v(" " + _vm._s(_vm.getName(slotProps.item['schema:publisher'])) + " ")])]) : slotProps.item['schema:creator'] && _vm.getName(slotProps.item['schema:creator']) ? _c('span', {}, [_c('span', {
                staticClass: "has-text-weight-medium"
              }, [_vm._v(" Creator ")]), _c('span', [_vm._v(" " + _vm._s(_vm.getName(slotProps.item['schema:creator'])) + " ")])]) : _vm._e(), _vm.canEditAny(slotProps.item) && _vm.queryParams.view !== 'true' ? _c('span', {
                staticClass: "framework-details__item"
              }, [_c('span', {
                staticClass: "has-text-weight-medium"
              }, [_vm._v(" Editable ")])]) : _vm._e()])];
            }
          }])
        })], 1)])];
      },
      proxy: true
    }, {
      key: "right",
      fn: function fn() {
        return [_vm.showRightAside ? _c('RightAside', {
          attrs: {
            "title": "Filter \\& sort"
          }
        }) : _vm._e()];
      },
      proxy: true
    }])
  });
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/views/framework/Frameworks.vue?vue&type=template&id=0e067ad0

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("159b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__("3ca3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.search.js
var es_string_search = __webpack_require__("841c");

// EXTERNAL MODULE: ./src/layouts/MainLayout.vue + 4 modules
var MainLayout = __webpack_require__("713b");

// EXTERNAL MODULE: ./node_modules/lodash/debounce.js
var debounce = __webpack_require__("b047");
var debounce_default = /*#__PURE__*/__webpack_require__.n(debounce);

// EXTERNAL MODULE: ./src/lode/components/List.vue + 4 modules
var List = __webpack_require__("713e");

// EXTERNAL MODULE: ./src/components/framework/RightAside.vue + 28 modules
var RightAside = __webpack_require__("dd98");

// EXTERNAL MODULE: ./src/mixins/common.js
var common = __webpack_require__("872c");

// EXTERNAL MODULE: ./src/mixins/editDirectory.js
var editDirectory = __webpack_require__("3c5b");

// EXTERNAL MODULE: ./src/components/framework/SearchBar.vue + 4 modules
var SearchBar = __webpack_require__("6b9e");

// EXTERNAL MODULE: ./src/components/AddNewDropdown.vue + 4 modules
var AddNewDropdown = __webpack_require__("4e7b");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/framework/Frameworks.vue?vue&type=script&lang=js

















/* harmony default export */ var Frameworksvue_type_script_lang_js = ({
  name: "Frameworks",
  mixins: [common["a" /* default */], editDirectory["a" /* default */]],
  data: function data() {
    return {
      createDropDownActive: false,
      repo: window.repo,
      numIdentities: EcIdentityManager.default.ids.length,
      parentObjectClass: 'frameworks-sticky',
      sortBy: null,
      defaultConfig: "",
      setFocus: false
    };
  },
  created: function created() {
    this.sortBy = this.conceptMode === true || this.progressionMode === true ? "dcterms:title.keyword" : "name.keyword";
    this.$store.commit("editor/t3Profile", false);
    this.$store.commit('editor/framework', null);
    this.spitEvent('viewChanged');
    this.setDefaultConfig();
  },
  computed: {
    isCeasn: function isCeasn() {
      if (this.queryParams["ceasnDataFields"] && this.queryParams["ceasnDataFields"] === 'true') {
        return true;
      } else {
        return false;
      }
    },
    conceptSchemeString: function conceptSchemeString() {
      if (this.isCeasn) {
        return 'Concept Schemes';
      } else {
        return "Taxonomies";
      }
    },
    conceptSchemeStringForButton: function conceptSchemeStringForButton() {
      if (this.isCeasn) {
        return 'Concept Scheme';
      } else {
        return "Taxonomy";
      }
    },
    showRightAside: function showRightAside() {
      return this.$store.getters['app/showRightAside'];
    },
    frameworkSearchTerm: function frameworkSearchTerm() {
      return this.$store.getters['app/searchTerm'];
    },
    queryParams: function queryParams() {
      return this.$store.getters['editor/queryParams'];
    },
    type: function type() {
      return this.conceptMode ? "ConceptScheme" : this.progressionMode ? "ConceptScheme" : "Framework";
    },
    currentUser: function currentUser() {
      if (EcIdentityManager.default.ids.length > 0) {
        return EcIdentityManager.default.ids;
      } else {
        return undefined;
      }
    },
    searchOptions: function searchOptions() {
      var _this = this;
      var search = "";
      if (this.isCeasn && this.type === "Framework") {
        if (this.collectionMode) {
          search += " AND (subType:\"Collection\")";
        } else {
          search += " AND NOT (subType:\"Collection\")";
        }
      }
      if (this.progressionMode) {
        search += " AND (subType:\"Progression\")";
      } else {
        // TODO: Should Progression Models be included as ConceptSchemes if ceasnDataFields = false?
        search += " AND NOT (subType:\"Progression\")";
      }
      if (this.queryParams && this.queryParams.filter != null) {
        search += " AND (" + this.queryParams.filter + ")";
      }
      if (this.filterByOwnedByMe && !this.conceptMode && !this.progressionMode || (this.conceptMode || this.progressionMode) && this.queryParams && this.queryParams.conceptShow === "mine") {
        if (this.currentUser) {
          search += " AND (";
          this.currentUser.forEach(function (user, i) {
            if (i !== 0) {
              search += " OR ";
            }
            search += "\\*owner:\"" + user.ppk.toPk().toPem() + "\"";
            search += " OR \\*owner:\"" + _this.addNewlinesToId(user.ppk.toPk().toPem()) + "\"";
          });
          search += ")";
        }
      }
      if (this.filterByNotOwnedByMe && EcIdentityManager.default.ids.length > 0) {
        search += " AND NOT (";
        for (var i = 0; i < EcIdentityManager.default.ids.length; i++) {
          if (i !== 0) {
            search += " OR ";
          }
          var id = EcIdentityManager.default.ids[i];
          search += "\\*owner:\"" + id.ppk.toPk().toPem() + "\"";
          search += " OR \\*owner:\"" + this.addNewlinesToId(id.ppk.toPk().toPem()) + "\"";
        }
        search += ")";
      }
      if (this.filterByConfigMatchDefault && this.defaultConfig) {
        search += " AND (configuration:\"";
        search += this.defaultConfig;
        search += "\")";
      }
      return search;
    },
    paramObj: function paramObj() {
      var obj = {};
      obj.size = 20;
      var order = this.sortBy === "name.keyword" || this.sortBy === "dcterms:title.keyword" ? "asc" : "desc";
      var type = this.sortBy === "name.keyword" || this.sortBy === "dcterms:title.keyword" ? "text" : "date";
      obj.sort = '[ { "' + this.sortBy + '": {"order" : "' + order + '" , "unmapped_type" : "' + type + '",  "missing" : "_last"}} ]';
      if (this.filterByOwnedByMe && !this.conceptMode && !this.progressionMode || (this.conceptMode || this.progressionMode) && this.queryParams.conceptShow === "mine") {
        obj.ownership = 'me';
      }
      return obj;
    },
    sortResults: function sortResults() {
      return this.$store.getters['app/sortResults'];
    },
    quickFilters: function quickFilters() {
      return this.$store.getters['app/quickFilters'];
    },
    filterByOwnedByMe: function filterByOwnedByMe() {
      return this.$store.getters['app/filterByOwnedByMe'];
    },
    filterByNotOwnedByMe: function filterByNotOwnedByMe() {
      return this.$store.getters['app/filterByNotOwnedByMe'];
    },
    filterByConfigMatchDefault: function filterByConfigMatchDefault() {
      return this.$store.getters['app/filterByConfigMatchDefault'];
    },
    conceptMode: function conceptMode() {
      return this.$store.getters['editor/conceptMode'];
    },
    progressionMode: function progressionMode() {
      return this.$store.getters['editor/progressionMode'];
    },
    collectionMode: function collectionMode() {
      return this.$store.getters['editor/collectionMode'];
    },
    initialOwnedByMe: function initialOwnedByMe() {
      return this.$store.getters['featuresEnabled/ownedByMe'];
    }
  },
  components: {
    List: List["a" /* default */],
    RightAside: RightAside["default"],
    AddNewDropdown: AddNewDropdown["a" /* default */],
    SearchBar: SearchBar["a" /* default */],
    MainLayout: MainLayout["a" /* default */],
    ThingEditing: function ThingEditing() {
      return Promise.all(/* import() */[__webpack_require__.e("chunk-6a6fd63e"), __webpack_require__.e("chunk-4a371510"), __webpack_require__.e("chunk-4cac7b5b"), __webpack_require__.e("chunk-dc2b4b7e")]).then(__webpack_require__.bind(null, "8051"));
    }
  },
  methods: {
    refocusSearch: function refocusSearch() {
      this.setFocus = !this.setFocus;
    },
    openItem: function openItem(object) {
      var me = this;
      if (object.type === "Directory") {
        this.$store.commit('app/selectDirectory', object);
        if (this.$route.name !== "directory") {
          this.$router.push({
            name: "directory"
          });
        }
        this.$store.commit('app/closeRightAside');
      } else if (object.type === "Competency") {
        EcFramework.search(this.repo, "competency:\"" + object.shortId() + "\"", function (success) {
          if (success && success[0]) {
            me.openItem(success[0]);
          }
        }, appError, null);
      } else if (object.type === "Concept") {
        this.findConceptTrail(object);
      } else if (this.conceptMode) {
        EcConceptScheme.get(object.id, function (success) {
          me.$store.commit('editor/framework', success);
          me.$store.commit('editor/clearFrameworkCommentData');
          me.$store.commit('app/setCanViewComments', me.canViewCommentsCurrentFramework());
          me.$store.commit('app/setCanAddComments', me.canAddCommentsCurrentFramework());
          me.$router.push({
            name: "conceptScheme",
            params: {
              frameworkId: object.id
            }
          });
        }, appError);
      } else if (this.progressionMode) {
        EcConceptScheme.get(object.id, function (success) {
          me.$store.commit('editor/framework', success);
          me.$store.commit('editor/clearFrameworkCommentData');
          me.$store.commit('app/setCanViewComments', me.canViewCommentsCurrentFramework());
          me.$store.commit('app/setCanAddComments', me.canAddCommentsCurrentFramework());
          me.$router.push({
            name: "progressionModel",
            params: {
              frameworkId: object.id
            }
          });
        }, appError);
      } else {
        EcFramework.get(object.id, function (success) {
          me.$store.commit('editor/framework', success);
          me.$store.commit('editor/clearFrameworkCommentData');
          me.$store.commit('app/setCanViewComments', me.canViewCommentsCurrentFramework());
          me.$store.commit('app/setCanAddComments', me.canAddCommentsCurrentFramework());
          me.$router.push({
            name: "framework",
            params: {
              frameworkId: object.id
            }
          });
        }, appError);
      }
    },
    findConceptTrail: function findConceptTrail(concept) {
      var me = this;
      if (concept["skos:topConceptOf"]) {
        EcConceptScheme.get(concept["skos:topConceptOf"], function (scheme) {
          me.openItem(scheme);
        }, appError);
      } else if (concept["skos:broader"]) {
        if (!EcArray.isArray(concept["skos:broader"])) {
          concept["skos:broader"] = [concept["skos:broader"]];
        }
        EcConcept.get(concept["skos:broader"][0], function (parent) {
          me.findConceptTrail(parent);
        }, appError);
      }
    },
    frameworkClick: function frameworkClick(framework) {
      this.$store.commit('app/rightAsideObject', framework);
      this.$store.commit('app/showRightAside', 'ListItemInfo');
    },
    getName: function getName(field) {
      var name = EcArray.isArray(field) ? field : [field];
      if (schema.Thing.getDisplayStringFrom(name).toLowerCase().indexOf("http") !== -1) {
        return this.resolveNameFromUrl(schema.Thing.getDisplayStringFrom(name));
      } else {
        return schema.Thing.getDisplayStringFrom(name);
      }
    },
    addNewlinesToId: function addNewlinesToId(pem) {
      // Begin public key line
      pem = pem.substring(0, 26) + "\n" + pem.substring(26);
      var length = pem.length;
      var start = 27;
      while (start + 64 < length) {
        pem = pem.substring(0, start + 64) + "\n" + pem.substring(start + 64);
        start += 65;
        length++;
      }
      // End public key line
      pem = pem.substring(0, length - 24) + "\n" + pem.substring(length - 24);
      return pem;
    },
    setDefaultConfig: function setDefaultConfig() {
      var me = this;
      if (localStorage.getItem("cassAuthoringToolDefaultBrowserConfigId")) {
        this.defaultConfig = localStorage.getItem("cassAuthoringToolDefaultBrowserConfigId");
      } else {
        this.repo.searchWithParams("@type:Configuration", {
          'size': 10000
        }, function (c) {
          if (c.isDefault === "true" || c.isDefault === true) {
            me.defaultConfig = c.shortId();
          }
        }, function () {}, function () {});
      }
    },
    scrollFunction: function scrollFunction(e) {
      var documentObject = document.getElementsByClassName('frameworks-sticky');
      var scrollValue = e.target.scrollTop;
      if (scrollValue !== 0) {
        this.parentObjectClass = 'frameworks-sticky scrolled';
      } else {
        this.parentObjectClass = 'frameworks-sticky';
      }
    }
  },
  mounted: function mounted() {
    // Keep sorting/filtering in sync with the store on back button
    if (this.sortResults.id === "lastEdited") {
      this.sortBy = "schema:dateModified";
    } else if (this.sortResults.id === "dateCreated") {
      this.sortBy = "schema:dateCreated";
    } else {
      this.sortBy = this.conceptMode === true || this.progressionMode === true ? "dcterms:title.keyword" : "name.keyword";
    }
    var documentBody = document.getElementById('frameworks');
    documentBody.addEventListener('scroll', debounce_default()(this.scrollFunction, 100, {
      'leading': true
    }));
  },
  watch: {
    sortResults: function sortResults() {
      if (this.sortResults.id === "lastEdited") {
        this.sortBy = "schema:dateModified";
      } else if (this.sortResults.id === "dateCreated") {
        this.sortBy = "schema:dateCreated";
      } else {
        this.sortBy = this.conceptMode === true || this.progressionMode === true ? "dcterms:title.keyword" : "name.keyword";
      }
    },
    conceptMode: function conceptMode() {
      this.sortBy = this.conceptMode === true || this.progressionMode === true ? "dcterms:title.keyword" : "name.keyword";
    },
    progressionMode: function progressionMode() {
      this.sortBy = this.conceptMode === true || this.progressionMode === true ? "dcterms:title.keyword" : "name.keyword";
    }
  }
});
// CONCATENATED MODULE: ./src/views/framework/Frameworks.vue?vue&type=script&lang=js
 /* harmony default export */ var framework_Frameworksvue_type_script_lang_js = (Frameworksvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/views/framework/Frameworks.vue?vue&type=style&index=0&id=0e067ad0&prod&lang=scss
var Frameworksvue_type_style_index_0_id_0e067ad0_prod_lang_scss = __webpack_require__("68d7");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/views/framework/Frameworks.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  framework_Frameworksvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Frameworks = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "68d7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Frameworks_vue_vue_type_style_index_0_id_0e067ad0_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("739d");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Frameworks_vue_vue_type_style_index_0_id_0e067ad0_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Frameworks_vue_vue_type_style_index_0_id_0e067ad0_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "713b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"862f505e-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/layouts/MainLayout.vue?vue&type=template&id=7780b418
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "cass--main-layout",
    class: !_vm.simple ? 'has-secondary' : ''
  }, [_c('div', {
    staticClass: "cass--main-layout--primary-top",
    class: _vm.simpleClass
  }, [_vm._t("top")], 2), !_vm.simple ? _c('div', {
    staticClass: "cass--main-layout--secondary-top"
  }, [_vm._t("secondary-top")], 2) : _vm._e(), _c('div', {
    staticClass: "cass--main-layout--body",
    class: _vm.topBarClass
  }, [_vm._t("body")], 2), _vm.rightActive ? _c('div', {
    staticClass: "cass--main-layout--right",
    class: _vm.topBarClass
  }, [_vm._t("right")], 2) : _vm._e()]);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/layouts/MainLayout.vue?vue&type=template&id=7780b418

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/layouts/MainLayout.vue?vue&type=script&lang=js
/* harmony default export */ var MainLayoutvue_type_script_lang_js = ({
  name: 'MainLayout',
  data: function data() {
    return {};
  },
  props: {
    rightActive: {
      type: Boolean,
      default: false
    },
    simple: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    simpleClass: function simpleClass() {
      return {
        'is-simple-top-bar': this.simple
      };
    },
    topBarClass: function topBarClass() {
      return {
        'has-simple-top-bar': this.simple,
        'has-secondary-top-bar': !this.simple,
        'regular-top-bar': !this.simple
      };
    }
  }
});
// CONCATENATED MODULE: ./src/layouts/MainLayout.vue?vue&type=script&lang=js
 /* harmony default export */ var layouts_MainLayoutvue_type_script_lang_js = (MainLayoutvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/layouts/MainLayout.vue?vue&type=style&index=0&id=7780b418&prod&lang=scss
var MainLayoutvue_type_style_index_0_id_7780b418_prod_lang_scss = __webpack_require__("63df");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/layouts/MainLayout.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  layouts_MainLayoutvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var MainLayout = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "72d6":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "739d":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "8b6f":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "8d74":
/***/ (function(module, exports, __webpack_require__) {

var trimmedEndIndex = __webpack_require__("4cef");

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

module.exports = baseTrim;


/***/ }),

/***/ "8eaf":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Versions_vue_vue_type_style_index_0_id_7a9ef4e8_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8b6f");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Versions_vue_vue_type_style_index_0_id_7a9ef4e8_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Versions_vue_vue_type_style_index_0_id_7a9ef4e8_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "9e69d":
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__("2b3e");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ "b047":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("1a8c"),
    now = __webpack_require__("408c"),
    toNumber = __webpack_require__("b4b0");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),

/***/ "b4b0":
/***/ (function(module, exports, __webpack_require__) {

var baseTrim = __webpack_require__("8d74"),
    isObject = __webpack_require__("1a8c"),
    isSymbol = __webpack_require__("ffd6");

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),

/***/ "bf12":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "d261":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "d6b4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c7eb");
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("1da1");


/* harmony default export */ __webpack_exports__["a"] = ({
  computed: {
    tlaFrameworkProfile: function tlaFrameworkProfile() {
      var me = this;
      return {
        "@id": {
          "@id": "https://schema.cassproject.org/0.4/Framework/id",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The URL of the framework."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Framework URL"
          }],
          "readOnly": "true",
          "max": 1,
          "heading": "Keys"
        },
        "http://schema.org/name": {
          "@id": "http://schema.org/name",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The name of the framework. One name per language."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Framework Name"
          }],
          "heading": "General",
          "isRequired": "true",
          "onePerLanguage": "true"
        },
        "http://schema.org/description": {
          "@id": "http://schema.org/description",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The description of the framework. One description per language"
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Description"
          }],
          "heading": "General",
          "onePerLanguage": "true"
        },
        "http://schema.org/creator": {
          "@id": "http://schema.org/creator",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The primary entity responsible for making this competency or competency framework. For example: \n                            https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/. One entity per line."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Creator"
          }],
          "heading": "General"
        },
        "https://purl.org/ctdlasn/terms/publisherName": {
          "@id": "https://purl.org/ctdlasn/terms/publisherName",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Name of the agent responsible for making this entity available."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Publisher Name"
          }],
          "heading": "General"
        },
        "http://schema.org/publisher": {
          "@id": "http://schema.org/publisher",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The entity responsible for making this competency framework available. For example: https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Publisher"
          }],
          "heading": "General"
        },
        "http://schema.org/inLanguage": {
          "@id": "http://schema.org/inLanguage",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The primary language used in or by this competency framework or competency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "In Language"
          }],
          "heading": "General"
        },
        "http://schema.org/keywords": {
          "@id": "http://schema.org/keywords",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A word or phrase used by the promulgating agency to refine and differentiate individual frameworks contextually. One concept per line."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Keywords"
          }],
          "heading": "Tagging"
        },
        "https://purl.org/ctdlasn/terms/conceptTerm": {
          "@id": "https://purl.org/ctdlasn/terms/conceptTerm",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A term drawn from a controlled vocabulary used by the promulgating agency to refine and differentiate individual resources contextually."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Concept Terms"
          }],
          "noTextEditing": "true",
          "heading": "Tagging"
        },
        "https://purl.org/ctdlasn/terms/derivedFrom": {
          "@id": "https://purl.org/ctdlasn/terms/derivedFrom",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A third party version of the entity being referenced that has been modified in meaning through editing, extension, or refinement.\n                            For example: https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Derived From"
          }],
          "max": 1,
          "heading": "Relations"
        },
        "https://purl.org/ctdlasn/terms/isVersionOf": {
          "@id": "https://purl.org/ctdlasn/terms/isVersionOf",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A related competency framework of which this competency framework is a version, edition, or adaptation."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Version Of"
          }],
          "max": 1,
          "heading": "Relations"
        },
        "http://purl.org/dc/elements/1.1/source": {
          "@id": "http://purl.org/dc/elements/1.1/source",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A URI to the original competency framework which this competency framework is based on or derived from.\n                            For example: https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Source"
          }],
          "heading": "Relations"
        },
        "https://purl.org/ctdlasn/terms/educationLevelType": {
          "@id": "https://purl.org/ctdlasn/terms/educationLevelType",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A general statement describing the education or training context.\n                                Alternatively, a more specific statement of the location of the audience in terms of its progression through an education or training context."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Education Level Type"
          }],
          "noTextEditing": "true",
          "heading": "Context"
        },
        "http://schema.org/validFrom": {
          "@id": "http://schema.org/validFrom",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2001/XMLSchema#dateTime"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Beginning date of validity of this competency framework."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Valid From"
          }],
          "max": 1,
          "heading": "Context"
        },
        "http://schema.org/validThrough": {
          "@id": "http://schema.org/validThrough",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2001/XMLSchema#dateTime"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "End date of validity of this competency framework."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Valid Until"
          }],
          "max": 1,
          "heading": "Context"
        },
        "https://purl.org/ctdlasn/terms/publicationStatusType": {
          "@id": "https://purl.org/ctdlasn/terms/publicationStatusType",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Publication status of the source competency framework. The original framework may be drafted, published, or depreciated outside of this system."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Publication Status"
          }],
          "options": [{
            display: "Draft",
            val: "https://credreg.net/ctdlasn/vocabs/publicationStatus/Draft"
          }, {
            display: "Published",
            val: "https://credreg.net/ctdlasn/vocabs/publicationStatus/Published"
          }, {
            display: "Deprecated",
            val: "https://credreg.net/ctdlasn/vocabs/publicationStatus/Deprecated"
          }],
          "max": 1,
          "heading": "Context"
        },
        "http://schema.org/identifier": {
          "@id": "http://schema.org/identifier",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "An alternative URI by which this competency or competency framework is identified. For example, https://sandbox.credentialengineregistry.org/."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Identifier"
          }],
          "heading": "Context"
        },
        "http://schema.org/copyrightYear": {
          "@id": "http://schema.org/copyrightYear",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://purl.org/dc/terms/date"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Date of a statement of copyright for this resource."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Date Copyrighted"
          }],
          "max": 1,
          "heading": "Rights"
        },
        "http://schema.org/license": {
          "@id": "http://schema.org/license",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A legal document giving official permission to do something with this competency framework. For example, https://sandbox.credentialengineregistry.org/"
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "License"
          }],
          "max": 1,
          "heading": "Rights"
        },
        "http://purl.org/dc/elements/1.1/rights": {
          "@id": "http://purl.org/dc/elements/1.1/rights",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Information about rights held in and over this competency framework."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Rights"
          }],
          "max": 1,
          "heading": "Rights"
        },
        "http://schema.org/copyrightHolder": {
          "@id": "http://schema.org/copyrightHolder",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The agent owning or managing rights over this competency framework. For example, https://credentialengineregistry.org/"
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Rights Holder"
          }],
          "max": 1,
          "heading": "Rights"
        },
        "headings": ["Keys", "General", "Tagging", "Relations", "Context", "Rights"],
        "primaryProperties": ["@id", "http://schema.org/name", "http://schema.org/description"],
        "secondaryProperties": ["http://schema.org/creator", "https://purl.org/ctdlasn/terms/publisherName", "http://schema.org/publisher", "http://schema.org/inLanguage", "http://schema.org/keywords", "https://purl.org/ctdlasn/terms/conceptTerm", "https://purl.org/ctdlasn/terms/derivedFrom", "https://purl.org/ctdlasn/terms/isVersionOf", "http://purl.org/dc/elements/1.1/source", "https://purl.org/ctdlasn/terms/educationLevelType"],
        "tertiaryProperties": ["http://schema.org/validFrom", "http://schema.org/validThrough", "https://purl.org/ctdlasn/terms/publicationStatusType", "http://schema.org/identifier", "http://schema.org/copyrightYear", "http://schema.org/license", "http://purl.org/dc/elements/1.1/rights", "http://schema.org/copyrightHolder"]
      };
    },
    tlaCompetencyProfile: function tlaCompetencyProfile() {
      var me = this;
      return {
        "@id": {
          "@id": "https://schema.cassproject.org/0.4/Competency/id",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The URL of the competency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "URL"
          }],
          "readOnly": "true",
          "max": 1,
          "heading": "Keys"
        },
        "http://schema.org/name": {
          "@id": "http://schema.org/name",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The name of the competency. One name per language."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Name"
          }],
          "heading": "General",
          "isRequired": "true",
          "onePerLanguage": "true"
        },
        "http://schema.org/description": {
          "@id": "http://schema.org/description",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The description of the competency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Description"
          }],
          "heading": "General"
        },
        "https://schema.cassproject.org/0.4/scope": {
          "@id": "https://schema.cassproject.org/0.4/scope",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The scope of the competency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Scope"
          }],
          "heading": "General"
        },
        "https://schema.cassproject.org/0.4/Level": {
          "@id": "https://schema.cassproject.org/0.4/Level",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "When an individual's performance in a competency can be measured, a level specifies milestones that an individual can reach, creating fine-grained distinction between the proficient and the adept."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Level"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Level"
          }],
          "valuesIndexed": function valuesIndexed() {
            return me.levels;
          },
          "noTextEditing": "true",
          "add": function add(selectedCompetency) {
            me.addLevel(selectedCompetency);
          },
          "remove": function remove(competency, levelId) {
            me.removeLevelFromFramework(levelId);
          },
          "save": function save() {
            me.saveFramework();
          },
          "heading": "General"
        },
        "http://purl.org/dc/terms/type": {
          "@id": "http://purl.org/dc/terms/type",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The textual label identifying the category of the competency as designated by the promulgating body. One label per line. One label per language."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Type"
          }],
          "onePerLanguage": "true",
          "heading": "General"
        },
        "https://purl.org/ctdlasn/terms/educationLevelType": {
          "@id": "https://purl.org/ctdlasn/terms/educationLevelType",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A general statement describing the education or training context. Alternatively, a more specific statement of the location of the audience in terms of its progression \n                                through an education or training context."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Education Level"
          }],
          "noTextEditing": "true",
          "heading": "General"
        },
        "https://purl.org/ctdlasn/terms/listID": {
          "@id": "https://purl.org/ctdlasn/terms/listID",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "An alphanumeric string indicating this competency's position in a list of competencies at the same level in some arbitrary hierarchy."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "List ID"
          }],
          "max": 1,
          "heading": "General"
        },
        "https://purl.org/ctdlasn/terms/codedNotation": {
          "@id": "https://purl.org/ctdlasn/terms/codedNotation",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "An alphanumeric notation or ID code identifying this competency in common use among end-users."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Coded Notation"
          }],
          "max": 1,
          "heading": "Context"
        },
        "https://purl.org/ctdlasn/terms/derivedFrom": {
          "@id": "https://purl.org/ctdlasn/terms/derivedFrom",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The URI of a competency from which this competency has been derived. For example: https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/.  One entity per line."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Derived From"
          }],
          "max": 1,
          "heading": "Context"
        },
        "http://schema.org/identifier": {
          "@id": "http://schema.org/identifier",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "An alternative URI by which this competency framework or competency is identified. For example, https://sandbox.credentialengineregistry.org/. One URI per line."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Identifier"
          }],
          "heading": "Context"
        },
        "http://schema.org/keywords": {
          "@id": "http://schema.org/keywords",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A word or phrase used by the promulgating agency to refine and differentiate individual competencies contextually. One concept per line."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Keywords"
          }],
          "heading": "Tagging"
        },
        "https://purl.org/ctdlasn/terms/conceptTerm": {
          "@id": "https://purl.org/ctdlasn/terms/conceptTerm",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A term drawn from a controlled vocabulary used by the promulgating agency to refine and differentiate individual resources contextually."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Concept Terms"
          }],
          "noTextEditing": "true",
          "heading": "Tagging"
        },
        "https://purl.org/ctdlasn/terms/complexityLevel": {
          "@id": "https://purl.org/ctdlasn/terms/complexityLevel",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The expected performance level of a learner or professional as defined by a competency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Complexity Level"
          }],
          "noTextEditing": "true",
          "heading": "Scales"
        },
        "https://purl.org/ctdlasn/terms/weight": {
          "@id": "https://purl.org/ctdlasn/terms/weight",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "An asserted measurement of the weight, degree, percent, or strength of a recommendation, requirement, or comparison."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Weight"
          }],
          "max": 1,
          "heading": "Scales"
        },
        "narrows": {
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A sub-competency relationship which has relevance to this competency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Narrows"
          }],
          "valuesIndexed": function valuesIndexed() {
            return me.relations["narrows"];
          },
          "noTextEditing": "true",
          "add": function () {
            var _add = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().mark(function _callee(selectedCompetency, values) {
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return me.addRelationsToFramework(selectedCompetency, "narrows", values);
                  case 2:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            function add(_x, _x2) {
              return _add.apply(this, arguments);
            }
            return add;
          }(),
          "save": function save() {},
          "remove": function () {
            var _remove = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().mark(function _callee2(source, target) {
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return me.removeRelationFromFramework(source, "narrows", target);
                  case 2:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            function remove(_x3, _x4) {
              return _remove.apply(this, arguments);
            }
            return remove;
          }(),
          "heading": "Relations"
        },
        "broadens": {
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Covers other relevant competencies not found in this competency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Broadens"
          }],
          "valuesIndexed": function valuesIndexed() {
            return me.relations["broadens"];
          },
          "noTextEditing": "true",
          "add": function () {
            var _add2 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().mark(function _callee3(selectedCompetency, values) {
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return me.addRelationsToFramework(selectedCompetency, "broadens", values);
                  case 2:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3);
            }));
            function add(_x5, _x6) {
              return _add2.apply(this, arguments);
            }
            return add;
          }(),
          "save": function save() {},
          "remove": function () {
            var _remove2 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().mark(function _callee4(source, target) {
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().wrap(function _callee4$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return me.removeRelationFromFramework(source, "broadens", target);
                  case 2:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4);
            }));
            function remove(_x7, _x8) {
              return _remove2.apply(this, arguments);
            }
            return remove;
          }(),
          "heading": "Relations"
        },
        "isEquivalentTo": {
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Represents same capability in all aspects to another competency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Equivalent To"
          }],
          "valuesIndexed": function valuesIndexed() {
            return me.relations["isEquivalentTo"];
          },
          "noTextEditing": "true",
          "add": function () {
            var _add3 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().mark(function _callee5(selectedCompetency, values) {
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().wrap(function _callee5$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.next = 2;
                    return me.addRelationsToFramework(selectedCompetency, "isEquivalentTo", values);
                  case 2:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5);
            }));
            function add(_x9, _x10) {
              return _add3.apply(this, arguments);
            }
            return add;
          }(),
          "save": function save() {},
          "remove": function () {
            var _remove3 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().mark(function _callee6(source, target) {
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().wrap(function _callee6$(_context6) {
                while (1) switch (_context6.prev = _context6.next) {
                  case 0:
                    _context6.next = 2;
                    return me.removeRelationFromFramework(source, "isEquivalentTo", target);
                  case 2:
                  case "end":
                    return _context6.stop();
                }
              }, _callee6);
            }));
            function remove(_x11, _x12) {
              return _remove3.apply(this, arguments);
            }
            return remove;
          }(),
          "heading": "Relations"
        },
        "requires": {
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Another competency is prerequisite for this."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Requires"
          }],
          "valuesIndexed": function valuesIndexed() {
            return me.relations["requires"];
          },
          "noTextEditing": "true",
          "add": function () {
            var _add4 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().mark(function _callee7(selectedCompetency, values) {
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().wrap(function _callee7$(_context7) {
                while (1) switch (_context7.prev = _context7.next) {
                  case 0:
                    _context7.next = 2;
                    return me.addRelationsToFramework(selectedCompetency, "requires", values);
                  case 2:
                  case "end":
                    return _context7.stop();
                }
              }, _callee7);
            }));
            function add(_x13, _x14) {
              return _add4.apply(this, arguments);
            }
            return add;
          }(),
          "save": function save() {},
          "remove": function () {
            var _remove4 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().mark(function _callee8(source, target) {
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().wrap(function _callee8$(_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    _context8.next = 2;
                    return me.removeRelationFromFramework(source, "requires", target);
                  case 2:
                  case "end":
                    return _context8.stop();
                }
              }, _callee8);
            }));
            function remove(_x15, _x16) {
              return _remove4.apply(this, arguments);
            }
            return remove;
          }(),
          "heading": "Relations"
        },
        "isEnabledBy": {
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A recommended option that speeds up acquisition of this competency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Is Enabled By"
          }],
          "valuesIndexed": function valuesIndexed() {
            return me.relations["isEnabledBy"];
          },
          "noTextEditing": "true",
          "add": function () {
            var _add5 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().mark(function _callee9(selectedCompetency, values) {
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().wrap(function _callee9$(_context9) {
                while (1) switch (_context9.prev = _context9.next) {
                  case 0:
                    _context9.next = 2;
                    return me.addRelationsToFramework(selectedCompetency, "isEnabledBy", values);
                  case 2:
                  case "end":
                    return _context9.stop();
                }
              }, _callee9);
            }));
            function add(_x17, _x18) {
              return _add5.apply(this, arguments);
            }
            return add;
          }(),
          "save": function save() {},
          "remove": function () {
            var _remove5 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().mark(function _callee10(source, target) {
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().wrap(function _callee10$(_context10) {
                while (1) switch (_context10.prev = _context10.next) {
                  case 0:
                    _context10.next = 2;
                    return me.removeRelationFromFramework(source, "isEnabledBy", target);
                  case 2:
                  case "end":
                    return _context10.stop();
                }
              }, _callee10);
            }));
            function remove(_x19, _x20) {
              return _remove5.apply(this, arguments);
            }
            return remove;
          }(),
          "heading": "Relations"
        },
        "isRelatedTo": {
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "This competency has some degree of overlap with another."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Is Related To"
          }],
          "valuesIndexed": function valuesIndexed() {
            return me.relations["isRelatedTo"];
          },
          "noTextEditing": "true",
          "add": function () {
            var _add6 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().mark(function _callee11(selectedCompetency, values) {
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().wrap(function _callee11$(_context11) {
                while (1) switch (_context11.prev = _context11.next) {
                  case 0:
                    _context11.next = 2;
                    return me.addRelationsToFramework(selectedCompetency, "isRelatedTo", values);
                  case 2:
                  case "end":
                    return _context11.stop();
                }
              }, _callee11);
            }));
            function add(_x21, _x22) {
              return _add6.apply(this, arguments);
            }
            return add;
          }(),
          "save": function save() {},
          "remove": function () {
            var _remove6 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().mark(function _callee12(source, target) {
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().wrap(function _callee12$(_context12) {
                while (1) switch (_context12.prev = _context12.next) {
                  case 0:
                    _context12.next = 2;
                    return me.removeRelationFromFramework(source, "isRelatedTo", target);
                  case 2:
                  case "end":
                    return _context12.stop();
                }
              }, _callee12);
            }));
            function remove(_x23, _x24) {
              return _remove6.apply(this, arguments);
            }
            return remove;
          }(),
          "heading": "Relations"
        },
        "desires": {
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Recommended, assumed, or expected competency not essential to acquisition of this competency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Desires"
          }],
          "valuesIndexed": function valuesIndexed() {
            return me.relations["desires"];
          },
          "noTextEditing": "true",
          "add": function () {
            var _add7 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().mark(function _callee13(selectedCompetency, values) {
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().wrap(function _callee13$(_context13) {
                while (1) switch (_context13.prev = _context13.next) {
                  case 0:
                    _context13.next = 2;
                    return me.addRelationsToFramework(selectedCompetency, "desires", values);
                  case 2:
                  case "end":
                    return _context13.stop();
                }
              }, _callee13);
            }));
            function add(_x25, _x26) {
              return _add7.apply(this, arguments);
            }
            return add;
          }(),
          "save": function save() {},
          "remove": function () {
            var _remove7 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().mark(function _callee14(source, target) {
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().wrap(function _callee14$(_context14) {
                while (1) switch (_context14.prev = _context14.next) {
                  case 0:
                    _context14.next = 2;
                    return me.removeRelationFromFramework(source, "desires", target);
                  case 2:
                  case "end":
                    return _context14.stop();
                }
              }, _callee14);
            }));
            function remove(_x27, _x28) {
              return _remove7.apply(this, arguments);
            }
            return remove;
          }(),
          "heading": "Relations"
        },
        "headings": ["Keys", "General", "Context", "Tagging", "Scales", "Relations"],
        "primaryProperties": ["@id", "http://schema.org/name", "http://schema.org/description"],
        "secondaryProperties": ["https://schema.cassproject.org/0.4/scope", "https://schema.cassproject.org/0.4/Level", "http://purl.org/dc/terms/type", "https://purl.org/ctdlasn/terms/educationLevelType", "https://purl.org/ctdlasn/terms/listID", "https://purl.org/ctdlasn/terms/codedNotation", "https://purl.org/ctdlasn/terms/derivedFrom", "http://schema.org/identifier", "http://schema.org/keywords", "https://purl.org/ctdlasn/terms/conceptTerm", "https://purl.org/ctdlasn/terms/complexityLevel", "https://purl.org/ctdlasn/terms/weight"],
        "tertiaryProperties": ["narrows", "broadens", "isEquivalentTo", "requires", "isEnabledBy", "isRelatedTo", "desires"]
      };
    }
  }
});

/***/ }),

/***/ "dd98":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"862f505e-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/framework/RightAside.vue?vue&type=template&id=10c69596&scoped=true
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('aside', {
    staticClass: "has-background-light",
    attrs: {
      "id": "right-side-bar"
    }
  }, [_c('div', {
    staticClass: "cass--right-aside--top-bar"
  }, [_c('button', {
    staticClass: "delete has-text-white",
    attrs: {
      "aria-label": "close"
    },
    on: {
      "click": function click($event) {
        return _vm.$store.commit('app/closeRightAside');
      }
    }
  }, [_vm._m(0)]), _c('div', {
    staticClass: "cass--right-aside--title"
  }, [_vm.rightAsideContent === 'FilterAndSort' ? _c('span', [_vm._v(" Filter & sort ")]) : _vm.rightAsideContent === 'ListItemInfo' ? _c('span', [_vm._v(" Information ")]) : _vm.rightAsideContent === 'Comments' ? _c('span', [_vm._v(" Comments ")]) : _vm._e()])]), _vm._t("right-aside-content", function () {
    return [_c(_vm.rightAsideContent, {
      tag: "Component",
      on: {
        "editResourceDetails": function editResourceDetails($event) {
          return _vm.$emit('editResource', $event);
        }
      }
    })];
  })], 2);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-times"
  })]);
}];

// CONCATENATED MODULE: ./src/components/framework/RightAside.vue?vue&type=template&id=10c69596&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"862f505e-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/framework/Comments.vue?vue&type=template&id=4ed1e043
var Commentsvue_type_template_id_4ed1e043_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "has-background-lightest",
    attrs: {
      "id": "right-side-bar__comments"
    }
  }, [_vm.isCommentsBusy ? _c('div', {
    staticClass: "has-text-centered"
  }, [_vm._m(0)]) : _vm._e(), !_vm.isCommentsBusy ? _c('div', [_vm.commentWrapperList.length <= 0 ? _c('div', {
    staticClass: "has-text-centered"
  }, [_vm._m(1)]) : _vm._e(), _vm.commentWrapperList.length > 0 ? _vm._l(_vm.commentWrapperList, function (commentWrapper, index) {
    return _c('div', {
      key: index,
      staticClass: "comment-list"
    }, [_c('h4', {
      staticClass: "comment-list__about",
      on: {
        "click": function click($event) {
          return _vm.setUpScroll(commentWrapper);
        }
      }
    }, [_vm._v(" " + _vm._s(commentWrapper.aboutName) + " ")]), _c('Comment', {
      key: commentWrapper.commentId,
      attrs: {
        "comment": commentWrapper,
        "canReply": _vm.canReplyToComments
      }
    }), _c('div', {
      staticClass: "buttons is-right"
    }, [_c('div', {
      staticClass: "button is-small is-outlined is-primary",
      attrs: {
        "title": "reply"
      },
      on: {
        "click": function click($event) {
          return _vm.handleClickReply(commentWrapper);
        }
      }
    }, [_vm._m(2, true), _c('span', [_vm._v("reply")])])])], 1);
  }) : _vm._e()], 2) : _vm._e()]);
};
var Commentsvue_type_template_id_4ed1e043_staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon is-large has-text-center has-text-link"
  }, [_c('i', {
    staticClass: "fas fa-2x fa-spinner is-info fa-pulse"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "has-text-center"
  }, [_c('p', [_c('i', {
    staticClass: "fa fa-exclamation-circle"
  }), _vm._v(" No comments available")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-reply"
  })]);
}];

// CONCATENATED MODULE: ./src/components/framework/Comments.vue?vue&type=template&id=4ed1e043

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
var regeneratorRuntime = __webpack_require__("c7eb");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
var createForOfIteratorHelper = __webpack_require__("b85c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__("caad");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.sort.js
var es_array_sort = __webpack_require__("4e82");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.search.js
var es_string_search = __webpack_require__("841c");

// EXTERNAL MODULE: ./src/components/framework/Comment.vue + 4 modules
var Comment = __webpack_require__("6675");

// EXTERNAL MODULE: ./src/mixins/common.js
var common = __webpack_require__("872c");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/framework/Comments.vue?vue&type=script&lang=js











/* harmony default export */ var Commentsvue_type_script_lang_js = ({
  name: 'Comments',
  mixins: [common["a" /* default */]],
  data: function data() {
    return {
      COMMENT_SEARCH_SIZE: 10000,
      isCommentsBusy: false,
      localFrameworkCommentList: [],
      commentAboutMap: {},
      commentWrapperList: [],
      commentWrapperMap: {},
      canReplyToComments: false
    };
  },
  components: {
    Comment: Comment["default"]
  },
  methods: {
    setUpScroll: function setUpScroll(comment) {
      var scrollObj = {
        ts: Date.now(),
        scrollId: '#scroll-' + comment.aboutId.split('/').pop()
      };
      this.$store.commit('editor/setCommentScrollTo', scrollObj);
    },
    handleClickReply: function handleClickReply(comment) {
      this.$store.commit('editor/setAddCommentAboutId', comment.aboutId);
      this.$store.commit('editor/setAddCommentType', 'reply');
      this.$store.commit('editor/setCommentToReply', comment.comment);
      this.$store.commit('app/showModal', {
        component: 'AddComment'
      });
    },
    determineCanModifyComment: function determineCanModifyComment(comment) {
      if (this.loggedOnPerson.shortId().equals(comment.creator)) return true;else return false;
    },
    buildCommentWrapper: function buildCommentWrapper(comment, aboutName, isTopLevel) {
      var commentWrapper = {};
      var commentCreatorPerson = this.frameworkCommentPersonMap[comment.creator];
      commentWrapper.comment = comment;
      commentWrapper.creator = commentCreatorPerson;
      commentWrapper.aboutId = comment.about;
      commentWrapper.aboutName = aboutName;
      commentWrapper.commentId = comment.shortId();
      commentWrapper.creatorName = commentCreatorPerson.name;
      commentWrapper.creatorEmail = commentCreatorPerson.email;
      commentWrapper.dateCreated = comment.dateCreated - 0;
      if (comment.lastEditDate) commentWrapper.lastEditDate = comment.lastEditDate - 0;
      commentWrapper.commentText = comment.text;
      commentWrapper.isTopLevel = isTopLevel;
      commentWrapper.canModify = this.determineCanModifyComment(comment);
      commentWrapper.replies = [];
      return commentWrapper;
    },
    buildFrameworkCommentWrappers: function buildFrameworkCommentWrappers() {
      var fwkComments = this.commentAboutMap[this.currentFramework.shortId()];
      if (fwkComments && fwkComments.length > 0) {
        var _iterator = Object(createForOfIteratorHelper["a" /* default */])(fwkComments),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var fc = _step.value;
            var cw = this.buildCommentWrapper(fc, this.currentFramework.getName(), true);
            this.commentWrapperList.push(cw);
            this.commentWrapperMap[fc.shortId()] = cw;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    },
    getCompetencyName: function getCompetencyName(compId) {
      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee() {
        var comp;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return EcRepository.get(compId);
            case 2:
              comp = _context.sent;
              if (!comp) {
                _context.next = 7;
                break;
              }
              return _context.abrupt("return", comp.getName());
            case 7:
              return _context.abrupt("return", 'Unknown Competency');
            case 8:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    buildCompetencyCommentWrappers: function () {
      var _buildCompetencyCommentWrappers = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee2() {
        var _iterator2, _step2, fwkCompId, compComments, compName, _iterator3, _step3, cc, cw;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (!this.currentFramework.competency) {
                _context2.next = 23;
                break;
              }
              _iterator2 = Object(createForOfIteratorHelper["a" /* default */])(this.currentFramework.competency);
              _context2.prev = 2;
              _iterator2.s();
            case 4:
              if ((_step2 = _iterator2.n()).done) {
                _context2.next = 15;
                break;
              }
              fwkCompId = _step2.value;
              compComments = this.commentAboutMap[fwkCompId];
              if (!(compComments && compComments.length > 0)) {
                _context2.next = 13;
                break;
              }
              _context2.next = 10;
              return this.getCompetencyName(fwkCompId);
            case 10:
              compName = _context2.sent;
              _iterator3 = Object(createForOfIteratorHelper["a" /* default */])(compComments);
              try {
                for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                  cc = _step3.value;
                  cw = this.buildCommentWrapper(cc, compName, true);
                  this.commentWrapperList.push(cw);
                  this.commentWrapperMap[cc.shortId()] = cw;
                }
              } catch (err) {
                _iterator3.e(err);
              } finally {
                _iterator3.f();
              }
            case 13:
              _context2.next = 4;
              break;
            case 15:
              _context2.next = 20;
              break;
            case 17:
              _context2.prev = 17;
              _context2.t0 = _context2["catch"](2);
              _iterator2.e(_context2.t0);
            case 20:
              _context2.prev = 20;
              _iterator2.f();
              return _context2.finish(20);
            case 23:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[2, 17, 20, 23]]);
      }));
      function buildCompetencyCommentWrappers() {
        return _buildCompetencyCommentWrappers.apply(this, arguments);
      }
      return buildCompetencyCommentWrappers;
    }(),
    addRepliesToParentWrapper: function addRepliesToParentWrapper(replyList) {
      var _iterator4 = Object(createForOfIteratorHelper["a" /* default */])(replyList),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var replyId = _step4.value;
          var reply = this.commentWrapperMap[replyId];
          var replyAboutId = reply.aboutId;
          var parent = this.commentWrapperMap[replyAboutId];
          if (parent) parent.replies.push(reply);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    },
    buildReplyCommentWrappers: function buildReplyCommentWrappers() {
      var replyList = [];
      var _iterator5 = Object(createForOfIteratorHelper["a" /* default */])(this.frameworkCommentList),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var c = _step5.value;
          var commentId = c.shortId();
          var commentReplies = this.commentAboutMap[commentId];
          if (commentReplies && commentReplies.length > 0) {
            var _iterator6 = Object(createForOfIteratorHelper["a" /* default */])(commentReplies),
              _step6;
            try {
              for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                var cr = _step6.value;
                var cw = this.buildCommentWrapper(cr, 'reply', false);
                this.commentWrapperMap[cr.shortId()] = cw;
                replyList.push(cr.shortId());
              }
            } catch (err) {
              _iterator6.e(err);
            } finally {
              _iterator6.f();
            }
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      this.addRepliesToParentWrapper(replyList);
    },
    buildCommentDisplayStructures: function () {
      var _buildCommentDisplayStructures = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee3() {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              this.buildFrameworkCommentWrappers();
              _context3.next = 3;
              return this.buildCompetencyCommentWrappers();
            case 3:
              this.buildReplyCommentWrappers();
            case 4:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function buildCommentDisplayStructures() {
        return _buildCommentDisplayStructures.apply(this, arguments);
      }
      return buildCommentDisplayStructures;
    }(),
    buildCommentAboutMap: function buildCommentAboutMap() {
      var _iterator7 = Object(createForOfIteratorHelper["a" /* default */])(this.frameworkCommentList),
        _step7;
      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var c = _step7.value;
          var ca = c.about;
          if (!this.commentAboutMap[ca]) this.commentAboutMap[ca] = [];
          this.commentAboutMap[ca].push(c);
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
    },
    parseComments: function parseComments() {
      if (!this.currentFramework) this.clearAllFrameworkCommentData();else {
        this.isCommentsBusy = true;
        this.commentAboutMap = {};
        this.commentWrapperList = [];
        this.commentWrapperMap = {};
        this.buildCommentAboutMap();
        this.buildCommentDisplayStructures();
        this.isCommentsBusy = false;
      }
    },
    buildFrameworkCommentPersonMapSuccess: function buildFrameworkCommentPersonMapSuccess(ecPersonList) {
      var commentPersonMap = {};
      var _iterator8 = Object(createForOfIteratorHelper["a" /* default */])(ecPersonList),
        _step8;
      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var p = _step8.value;
          commentPersonMap[p.shortId()] = p;
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
      this.$store.commit('editor/setFrameworkCommentDataLoaded', true);
      this.$store.commit('editor/setFrameworkCommentPersonMap', commentPersonMap);
      this.$store.commit('editor/setFrameworkCommentList', this.localFrameworkCommentList); // this SHOULD trigger parseComments
    },
    buildFrameworkCommentPersonMapFailure: function buildFrameworkCommentPersonMapFailure(msg) {
      appLog('buildFrameworkCommentPersonMapFailure: ' + msg);
      this.isCommentsBusy = false;
    },
    buildCommentCreatorList: function buildCommentCreatorList() {
      var commentCreators = [];
      var _iterator9 = Object(createForOfIteratorHelper["a" /* default */])(this.localFrameworkCommentList),
        _step9;
      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var c = _step9.value;
          if (!commentCreators.includes(c.creator)) commentCreators.push(c.creator);
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }
      return commentCreators;
    },
    buildFrameworkCommentPersonMap: function buildFrameworkCommentPersonMap() {
      var commentCreators = this.buildCommentCreatorList();
      if (commentCreators.length > 0) {
        window.repo.multiget(commentCreators, this.buildFrameworkCommentPersonMapSuccess, this.buildFrameworkCommentPersonMapFailure);
      } else this.buildFrameworkCommentPersonMapSuccess([]);
    },
    sortLocalFrameworkCommentList: function sortLocalFrameworkCommentList() {
      this.localFrameworkCommentList.sort(function (c1, c2) {
        if (c1.dateCreated - 0 > c2.dateCreated - 0) return 1;else if (c2.dateCreated - 0 > c1.dateCreated - 0) return -1;else return 0;
      });
    },
    buildFrameworkCommentListSuccess: function buildFrameworkCommentListSuccess(ecCommentList) {
      this.localFrameworkCommentList = ecCommentList;
      this.sortLocalFrameworkCommentList();
      this.buildFrameworkCommentPersonMap();
    },
    buildFrameworkCommentListFailure: function buildFrameworkCommentListFailure(msg) {
      appLog('buildFrameworkCommentListFailure: ' + msg);
      this.isCommentsBusy = false;
    },
    clearAllFrameworkCommentData: function clearAllFrameworkCommentData() {
      this.isCommentsBusy = false;
      this.localFrameworkCommentList = [];
      this.commentAboutMap = {};
      this.commentWrapperList = [];
      this.commentWrapperMap = {};
      this.canReplyToComments = false;
    },
    buildFrameworkCommentList: function buildFrameworkCommentList() {
      if (!this.currentFramework) this.clearAllFrameworkCommentData();else {
        var paramObj = {};
        paramObj.size = this.COMMENT_SEARCH_SIZE;
        EcComment.search(window.repo, 'isBasedOn:"' + this.currentFramework.shortId() + '"', this.buildFrameworkCommentListSuccess, this.buildFrameworkCommentListFailure, null);
      }
    },
    buildCommentDataSet: function buildCommentDataSet() {
      if (!this.frameworkCommentList || this.frameworkCommentList.length <= 0) {
        this.isCommentsBusy = true;
        this.buildFrameworkCommentList();
      } else this.parseComments();
    }
  },
  computed: {
    loggedOnPerson: function loggedOnPerson() {
      return this.$store.getters['user/loggedOnPerson'];
    },
    currentFramework: function currentFramework() {
      return this.$store.getters['editor/framework'];
    },
    currentFrameworkCompetencies: function currentFrameworkCompetencies() {
      return this.$store.getters['editor/framework'].competency;
    },
    frameworkCommentList: function frameworkCommentList() {
      return this.$store.getters['editor/frameworkCommentList'];
    },
    frameworkCommentPersonMap: function frameworkCommentPersonMap() {
      return this.$store.getters['editor/frameworkCommentPersonMap'];
    }
  },
  watch: {
    currentFrameworkCompetencies: function currentFrameworkCompetencies() {
      this.parseComments();
    },
    frameworkCommentList: function frameworkCommentList() {
      this.parseComments();
    }
  },
  mounted: function mounted() {
    this.buildCommentDataSet();
    this.canReplyToComments = this.canAddCommentsCurrentFramework();
  }
});
// CONCATENATED MODULE: ./src/components/framework/Comments.vue?vue&type=script&lang=js
 /* harmony default export */ var framework_Commentsvue_type_script_lang_js = (Commentsvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/framework/Comments.vue?vue&type=style&index=0&id=4ed1e043&prod&lang=scss
var Commentsvue_type_style_index_0_id_4ed1e043_prod_lang_scss = __webpack_require__("1443");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/framework/Comments.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  framework_Commentsvue_type_script_lang_js,
  Commentsvue_type_template_id_4ed1e043_render,
  Commentsvue_type_template_id_4ed1e043_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Comments = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"862f505e-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/framework/Versions.vue?vue&type=template&id=7a9ef4e8
var Versionsvue_type_template_id_7a9ef4e8_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('aside', {
    staticClass: "menu has-background-light",
    attrs: {
      "id": "comments-side-bar"
    }
  }, [_c('p', {
    staticClass: "subtitle is-size-4"
  }, [_c('span', {
    staticClass: "icon",
    on: {
      "click": function click($event) {
        return _vm.$store.commit('app/closeRightAside');
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-caret-right"
  })]), _vm._v(" Version History ")])]);
};
var Versionsvue_type_template_id_7a9ef4e8_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/framework/Versions.vue?vue&type=template&id=7a9ef4e8

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/framework/Versions.vue?vue&type=script&lang=js
/* harmony default export */ var Versionsvue_type_script_lang_js = ({
  name: 'Versions',
  data: function data() {
    return {
      isCommenter: true,
      isAdmin: false,
      isViewer: true
    };
  },
  components: {}
});
// CONCATENATED MODULE: ./src/components/framework/Versions.vue?vue&type=script&lang=js
 /* harmony default export */ var framework_Versionsvue_type_script_lang_js = (Versionsvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/framework/Versions.vue?vue&type=style&index=0&id=7a9ef4e8&prod&lang=scss
var Versionsvue_type_style_index_0_id_7a9ef4e8_prod_lang_scss = __webpack_require__("8eaf");

// CONCATENATED MODULE: ./src/components/framework/Versions.vue






/* normalize component */

var Versions_component = Object(componentNormalizer["a" /* default */])(
  framework_Versionsvue_type_script_lang_js,
  Versionsvue_type_template_id_7a9ef4e8_render,
  Versionsvue_type_template_id_7a9ef4e8_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Versions = (Versions_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"862f505e-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/framework/ListItemInfo.vue?vue&type=template&id=3aebcc9e

var ListItemInfovue_type_template_id_3aebcc9e_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "has-background-lightest",
    attrs: {
      "id": "cass__right-aside"
    }
  }, [_c('div', {
    staticClass: "cass__right-aside--header"
  }, [_c('div', {
    staticClass: "right-aside-bar__title"
  }, [_c('span', {
    staticClass: "help"
  }, [_vm._v(_vm._s(_vm.objectTypeForDisplay))]), _c('div', {
    staticClass: "right-aside-bar--title-text is-size-4 is-family-secondary",
    attrs: {
      "title": _vm.objectName
    }
  }, [_vm._v(" " + _vm._s(_vm.objectName) + " ")]), _vm.objectShortId !== _vm.selectedDirectoryId ? _c('div', {
    staticClass: "buttons pt-2"
  }, [_c('div', {
    staticClass: "button is-small is-rounded is-primary",
    on: {
      "click": _vm.openObject
    }
  }, [_c('span', [_vm._v("Open " + _vm._s(_vm.objectTypeForDisplay))]), _vm._m(0)])]) : _vm._e()])]), _c('div', {
    staticClass: "cass__right-aside--body"
  }, [_c('div', {
    staticClass: "cass__right-side--details"
  }, [_c('div', {
    staticClass: "cass__right-side--details-wrapper"
  }, [_vm.objectType === 'Directory' || _vm.objectType === 'Framework' || _vm.objectType === 'ConceptScheme' ? [_c('button', {
    staticClass: "cass__right-side--accordion details",
    on: {
      "click": function click($event) {
        return _vm.clickAccordion('details');
      }
    }
  }, [_vm._v(" Details " + _vm._s(_vm.isCeasn ? "(in CaSS)" : "") + " "), _c('span', {
    staticClass: "icon is-pulled-right"
  }, [_vm.accordion === 'details' ? _c('i', {
    staticClass: "fa fa-minus"
  }) : _c('i', {
    staticClass: "fa fa-plus"
  })])]), _c('div', {
    staticClass: "cass__right-side--accordion-panel details",
    class: _vm.accordion === 'details' ? 'active' : ''
  }, [_vm._m(1), _c('div', {
    staticClass: "cass__right-aside--half-item"
  }, [_vm._v(" " + _vm._s(_vm.lastModified) + " ")]), _vm.object.directory && _vm.object.directory !== _vm.selectedDirectoryId ? [_vm._m(2), _c('div', {
    staticClass: "cass__right-aside--half-item"
  }, [_vm._v(" " + _vm._s(_vm.getName(_vm.object.directory)) + " "), _c('span', {
    staticClass: "button is-primary is-outlined is-small",
    on: {
      "click": _vm.goToParentDirectory
    }
  }, [_vm._v(" Open ")])])] : _vm.object.parentDirectory && _vm.object.parentDirectory !== _vm.selectedDirectoryId ? [_vm._m(3), _c('div', {
    staticClass: "cass__right-aside--half-item"
  }, [_vm._v(" " + _vm._s(_vm.getName(_vm.object.parentDirectory)) + " "), _c('span', {
    staticClass: "inline-link is-small",
    attrs: {
      "title": "Navigate to parent directory"
    },
    on: {
      "click": _vm.goToParentDirectory
    }
  }, [_c('span', [_vm._v("Go to parent")]), _vm._m(4)])])] : _vm._e(), _vm._m(5), _c('div', {
    staticClass: "cass__right-aside--half-item"
  }, [_vm._v(" " + _vm._s(_vm.dateCreated) + " ")]), _vm.objectType === 'Directory' ? _c('div', {
    staticClass: "cass__right-aside--half-item"
  }, [_c('b', [_vm._v("Subdirectories:")])]) : _vm._e(), _vm.objectType === 'Directory' ? _c('div', {
    staticClass: "cass__right-aside--half-item"
  }, [_vm._v(" " + _vm._s(_vm.numSubdirectories) + " ")]) : _vm._e(), _vm.objectType === 'Directory' ? [_vm._m(6), _c('div', {
    staticClass: "cass__right-aside--half-item"
  }, [_vm._v(" " + _vm._s(_vm.numObjects) + " ")])] : _vm.objectType === 'Framework' ? [_vm._m(7), _c('div', {
    staticClass: "cass__right-aside--half-item"
  }, [_vm._v(" " + _vm._s(_vm.object.competency ? _vm.object.competency.length : 0) + " ")])] : _vm._e(), _vm.object.Published ? [_vm._m(8), _c('div', {
    staticClass: "cass__right-aside--half-item"
  }, [_vm._v(" " + _vm._s(_vm.object.Published) + " ")])] : _vm._e(), _vm.object.Approved ? [_vm._m(9), _c('div', {
    staticClass: "cass__right-aside--half-item"
  }, [_vm._v(" " + _vm._s(_vm.object.Approved) + " ")])] : _vm._e(), _vm.publisherName ? [_vm._m(10), _c('div', {
    staticClass: "cass__right-aside--half-item"
  }, [_vm._v(" " + _vm._s(_vm.publisherName) + " ")])] : _vm._e(), _vm.creatorName ? [_vm._m(11), _c('div', {
    staticClass: "cass__right-aside--half-item"
  }, [_vm._v(" " + _vm._s(_vm.creatorName) + " ")])] : _vm._e(), [_vm._m(12), _c('div', {
    staticClass: "cass__right-aside--half-item"
  }, [_c('span', {
    directives: [{
      name: "clipboard",
      rawName: "v-clipboard",
      value: function value() {
        return _vm.shareLink;
      },
      expression: "() => shareLink"
    }, {
      name: "clipboard",
      rawName: "v-clipboard:success",
      value: _vm.successfulClip,
      expression: "successfulClip",
      arg: "success"
    }, {
      name: "clipboard",
      rawName: "v-clipboard:error",
      value: _vm.errorClip,
      expression: "errorClip",
      arg: "error"
    }],
    staticClass: "inline-link",
    attrs: {
      "title": "Copy URL to the clipboard."
    }
  }, [_c('span', {
    attrs: {
      "title": _vm.shareLink
    }
  }, [_vm._v("copy link")]), _c('span', {
    staticClass: "icon"
  }, [_vm.clipStatus === 'success' ? _c('i', {
    staticClass: "fa fa-check"
  }) : _vm.clipStatus === 'error' ? _c('i', {
    staticClass: "fa fa-times"
  }) : _c('i', {
    staticClass: "fa fa-link",
    attrs: {
      "name": "copyURL"
    }
  })])])])]], 2)] : _vm._e(), _vm.objectType === 'CreativeWork' || _vm.canEditObject && _vm.objectType === 'Directory' ? [_c('button', {
    staticClass: "cass__right-side--accordion details",
    on: {
      "click": function click($event) {
        return _vm.clickAccordion('properties');
      }
    }
  }, [_vm._v(" Properties "), _c('span', {
    staticClass: "icon is-pulled-right"
  }, [_vm.accordion === 'properties' ? _c('i', {
    staticClass: "fa fa-minus"
  }) : _c('i', {
    staticClass: "fa fa-plus"
  })])]), _c('div', {
    staticClass: "cass__right-side--accordion-panel",
    class: _vm.accordion === 'properties' ? 'active' : ''
  }, [_vm.objectType === 'CreativeWork' ? [_c('div', {
    staticClass: "cass__right-aside--property"
  }, [_c('div', {
    staticClass: "cass__right-aside--property-text"
  }, [_c('span', [_vm._v(" " + _vm._s(_vm.object.url) + " ")])]), _c('div', {
    staticClass: "cass__right-aside--property-label"
  }, [_vm._v(" Url ")])]), _c('div', {
    staticClass: "cass__right-aside--property"
  }, [_c('div', {
    staticClass: "cass__right-aside--property-text"
  }, [_c('span', [_vm._v(" " + _vm._s(_vm.objectName) + " ")])]), _c('div', {
    staticClass: "cass__right-aside--property-label"
  }, [_vm._v(" Name ")])]), _c('div', {
    staticClass: "cass__right-aside--property flex-end"
  }, [_c('div', {
    staticClass: "button is-pulled-right is-primary is-outlined",
    on: {
      "click": function click($event) {
        return _vm.$emit('editResourceDetails', _vm.object);
      }
    }
  }, [_c('span', [_vm._v("Edit")]), _vm._m(13)])])] : _vm._e(), _vm.objectType === 'Directory' ? [_c('div', {
    staticClass: "cass__right-aside--property"
  }, [_c('div', {
    staticClass: "cass__right-aside--property-text"
  }, [_c('span', [_vm._v(" " + _vm._s(_vm.objectName) + " ")])]), _c('div', {
    staticClass: "cass__right-aside--property-label"
  }, [_vm._v(" Directory Name ")]), _vm.canEditObject && _vm.objectType === 'Directory' ? _c('div', {
    staticClass: "cass__right-aside--property flex-end"
  }, [_c('div', {
    staticClass: "button is-pulled-right is-primary is-outlined",
    on: {
      "click": _vm.editDirectory
    }
  }, [_c('span', [_vm._v("Edit")]), _vm._m(14)])]) : _vm._e()])] : _vm._e(), _vm.errorEditing ? _c('span', [_vm._v(" " + _vm._s(_vm.errorEditing) + " ")]) : _vm._e()], 2)] : _vm._e(), _vm.loggedInPerson && _vm.loggedInPerson.name && _vm.canEditObject && !(_vm.objectType === 'CreativeWork' && !_vm.$store.state.featuresEnabled.userManagementEnabled) ? [_c('button', {
    staticClass: "cass__right-side--accordion",
    class: _vm.accordion === 'users' ? 'active' : '',
    on: {
      "click": function click($event) {
        return _vm.clickAccordion('users');
      }
    }
  }, [_vm._v(" Users "), _c('span', {
    staticClass: "icon is-pulled-right"
  }, [_vm.accordion === 'users' ? _c('i', {
    staticClass: "fa fa-minus"
  }) : _c('i', {
    staticClass: "fa fa-plus"
  })])]), _c('div', {
    staticClass: "cass__right-side--accordion-panel users",
    class: _vm.accordion === 'users' ? 'active' : ''
  }, [_c('div', {
    staticClass: "cass__right-aside--whole-item pt-2"
  }, [_c('div', {
    staticClass: "buttons is-centered"
  }, [_c('div', {
    staticClass: "button is-primary is-rounded",
    on: {
      "click": _vm.manageUsers
    }
  }, [_c('span', [_vm._v("Manage Permissions / Share Framework")]), _vm._m(15)])])])])] : _vm._e(), _vm.objectType === 'Directory' ? [_c('button', {
    staticClass: "cass__right-side--accordion",
    class: _vm.accordion === 'description' ? 'active' : '',
    on: {
      "click": function click($event) {
        return _vm.clickAccordion('description');
      }
    }
  }, [_vm._v(" Description "), _c('span', {
    staticClass: "icon is-pulled-right"
  }, [_vm.accordion === 'description' ? _c('i', {
    staticClass: "fa fa-minus"
  }) : _c('i', {
    staticClass: "fa fa-plus"
  })])]), _c('div', {
    staticClass: "cass__right-side--accordion-panel",
    class: _vm.accordion === 'description' ? 'active' : ''
  }, [_vm.objectDescription ? _c('div', {
    staticClass: "p-2"
  }, [_vm._v(" " + _vm._s(_vm.objectDescription) + " ")]) : _c('div', {
    staticClass: "p-2"
  }, [_vm._v(" No description ")])])] : _vm._e(), [_c('button', {
    staticClass: "cass__right-side--accordion",
    class: _vm.accordion === 'copy' ? 'active' : '',
    on: {
      "click": function click($event) {
        return _vm.clickAccordion('copy');
      }
    }
  }, [_vm._v(" Copy " + _vm._s(_vm.objectTypeForDisplay) + " "), _c('span', {
    staticClass: "icon is-pulled-right"
  }, [_vm.accordion === 'copy' ? _c('i', {
    staticClass: "fa fa-minus"
  }) : _c('i', {
    staticClass: "fa fa-plus"
  })])]), _c('div', {
    staticClass: "cass__right-side--accordion-panel",
    class: _vm.accordion === 'copy' ? 'active' : ''
  }, [_vm.copyDirectoryOptions.length < 1 ? _c('p', {
    staticClass: "mx-2"
  }, [_c('em', [_vm._v("Please create a new directory to copy this " + _vm._s(_vm.objectTypeForDisplay) + " into.")])]) : _vm._e(), _vm._l(_vm.copyDirectoryOptions, function (directory) {
    return _c('li', {
      key: directory,
      staticClass: "cass--list-item-info--search-result--li"
    }, [_c('span', {
      staticClass: "cass--list-item-info--search-results--li-text"
    }, [_vm._v(" " + _vm._s(directory.name) + " ")]), _c('span', {
      staticClass: "button is-primary is-outlined is-small is-pulled-right",
      class: {
        'is-loading': _vm.processingCopyOrMove
      },
      attrs: {
        "disabled": _vm.processingCopyOrMove
      },
      on: {
        "click": function click($event) {
          return _vm.copyOrMove(directory, 'copy');
        }
      }
    }, [_vm._v(" copy here ")])]);
  })], 2)], _vm.canEditObject ? [_c('button', {
    staticClass: "cass__right-side--accordion",
    class: _vm.accordion === 'move' ? 'active' : '',
    on: {
      "click": function click($event) {
        return _vm.clickAccordion('move');
      }
    }
  }, [_vm._v(" Move " + _vm._s(_vm.objectTypeForDisplay) + " "), _c('span', {
    staticClass: "icon is-pulled-right"
  }, [_vm.accordion === 'move' ? _c('i', {
    staticClass: "fa fa-minus"
  }) : _c('i', {
    staticClass: "fa fa-plus"
  })])]), _c('div', {
    staticClass: "cass__right-side--accordion-panel",
    class: _vm.accordion === 'move' ? 'active' : ''
  }, [_vm._l(_vm.moveDirectoryOptions, function (directory) {
    return _c('li', {
      key: directory,
      staticClass: "cass--list-item-info--search-result--li"
    }, [_c('span', {
      staticClass: "cass--list-item-info--search-results--li-text"
    }, [_vm._v(" " + _vm._s(directory.name) + " ")]), _c('span', {
      staticClass: "button is-primary is-v-centered is-outlined is-small is-pulled-right",
      class: {
        'is-loading': _vm.processingCopyOrMove
      },
      on: {
        "click": function click($event) {
          return _vm.copyOrMove(directory, 'move');
        }
      }
    }, [_vm._v(" move here ")])]);
  }), _vm.object.directory || _vm.object.parentDirectory ? _c('li', {
    staticClass: "cass--list-item-info--search-result--li"
  }, [_c('span', {
    staticClass: "cass--list-item-info--search-results--li-text has-text-danger"
  }, [_vm._v(" Remove from directory ")]), _c('span', {
    staticClass: "button is-danger is-outlined is-small is-pulled-right",
    class: {
      'is-loading': _vm.processingRemove
    },
    on: {
      "click": _vm.removeFromDirectory
    }
  }, [_vm._v(" remove ")])]) : _vm._e()], 2)] : _vm._e(), _vm.canEditObject && _vm.objectType === 'Directory' ? [_c('div', {}, [_c('div', {
    staticClass: "buttons is-pulled-right p-2",
    on: {
      "click": _vm.deleteDirectory
    }
  }, [_c('div', {
    staticClass: "button is-danger is-outlined"
  }, [_vm._v(" delete directory ")])])])] : _vm._e()], 2)])])]);
};
var ListItemInfovue_type_template_id_3aebcc9e_staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-folder-open"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "cass__right-aside--half-item"
  }, [_c('b', [_vm._v("Last Modified:")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "cass__right-aside--half-item"
  }, [_c('b', [_vm._v("Directory:")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "cass__right-aside--half-item"
  }, [_c('b', [_vm._v("Parent Directory:")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-folder-open"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "cass__right-aside--half-item"
  }, [_c('b', [_vm._v(" Date Created: ")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "cass__right-aside--half-item"
  }, [_c('b', [_vm._v("Objects:")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "cass__right-aside--half-item"
  }, [_c('b', [_vm._v("Item Count:")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "cass__right-aside--half-item"
  }, [_c('b', [_vm._v("Published Date:")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "cass__right-aside--half-item"
  }, [_c('b', [_vm._v("Approved Date:")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "cass__right-aside--half-item"
  }, [_c('b', [_vm._v("Publisher:")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "cass__right-aside--half-item"
  }, [_c('b', [_vm._v("Creator:")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "cass__right-aside--half-item"
  }, [_c('span', [_c('b', [_vm._v("Share:")])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-edit"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-edit"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fas fa-users"
  })]);
}];

// CONCATENATED MODULE: ./src/components/framework/ListItemInfo.vue?vue&type=template&id=3aebcc9e

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__("2909");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__("a4d3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.description.js
var es_symbol_description = __webpack_require__("e01a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.iterator.js
var es_symbol_iterator = __webpack_require__("d28b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__("3ca3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js







function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
var unsupportedIterableToArray = __webpack_require__("06c5");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.error.cause.js
var es_error_cause = __webpack_require__("d9e2");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js




function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || Object(unsupportedIterableToArray["a" /* default */])(arr, i) || _nonIterableRest();
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.entries.js
var es_object_entries = __webpack_require__("4fad");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.set.js
var es_set = __webpack_require__("6062");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__("5319");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/framework/ListItemInfo.vue?vue&type=script&lang=js





















/* harmony default export */ var ListItemInfovue_type_script_lang_js = ({
  name: 'ListItemInfo',
  mixins: [common["a" /* default */]],
  components: {},
  data: function data() {
    return {
      accordion: 'details',
      numSubdirectories: "unknown",
      numObjects: "unknown",
      copyingToDirectory: false,
      movingToDirectory: false,
      repo: window.repo,
      frameworksToProcess: 0,
      clipStatus: 'ready',
      ineligibleDirectoriesForMove: [],
      errorEditing: null,
      processingCopyOrMove: false,
      processingRemove: false
    };
  },
  methods: {
    deleteDirectory: function deleteDirectory() {
      this.$store.commit('app/showModal', {
        component: 'DeleteDirectoryConfirm'
      });
    },
    clickAccordion: function clickAccordion(item) {
      if (this.accordion === item) {
        this.accordion = '';
      } else {
        this.accordion = item;
      }
    },
    successfulClip: function successfulClip(_ref) {
      var _this = this;
      var value = _ref.value,
        event = _ref.event;
      appLog('success', value);
      this.clipStatus = 'success';
      setTimeout(function () {
        _this.clipStatus = 'ready';
      }, 1000);
    },
    errorClip: function errorClip(_ref2) {
      var _this2 = this;
      var value = _ref2.value,
        event = _ref2.event;
      appLog('error', value);
      this.clipStatus = 'error';
      setTimeout(function () {
        _this2.clipStatus = 'ready';
      }, 1000);
    },
    setNumSubdirectoriesAndObjects: function setNumSubdirectoriesAndObjects() {
      if (this.objectType === "Directory") {
        if (this.object.directories) {
          this.numSubdirectories = this.object.directories.length;
        } else {
          this.numSubdirectories = 0;
        }
        var objects = 0;
        if (this.object.frameworks) {
          objects += this.object.frameworks.length;
        }
        if (this.object.resources) {
          objects += this.object.resources.length;
        }
        this.numObjects = objects;
      }
    },
    openObject: function openObject() {
      var me = this;
      if (this.objectType === "Directory") {
        this.$store.commit('app/selectDirectory', this.object);
        if (this.$route.name !== "directory") {
          this.$router.push({
            name: "directory"
          });
        }
        this.$store.commit('app/closeRightAside');
      } else if (this.object.type === "CreativeWork") {
        window.open(this.object.url, '_blank');
      } else if (this.$store.getters['editor/conceptMode']) {
        this.$store.commit('app/selectDirectory', null);
        EcConceptScheme.get(this.object.id, function (success) {
          me.$store.commit('editor/framework', success);
          me.$store.commit('editor/clearFrameworkCommentData');
          me.$store.commit('app/setCanViewComments', me.canViewCommentsCurrentFramework());
          me.$store.commit('app/setCanAddComments', me.canAddCommentsCurrentFramework());
          me.$router.push({
            name: "conceptScheme",
            params: {
              frameworkId: me.object.id
            }
          });
        }, appError);
      } else if (this.$store.getters['editor/progressionMode']) {
        this.$store.commit('app/selectDirectory', null);
        EcConceptScheme.get(this.object.id, function (success) {
          me.$store.commit('editor/framework', success);
          me.$store.commit('editor/clearFrameworkCommentData');
          me.$store.commit('app/setCanViewComments', me.canViewCommentsCurrentFramework());
          me.$store.commit('app/setCanAddComments', me.canAddCommentsCurrentFramework());
          me.$router.push({
            name: "progressionModel",
            params: {
              frameworkId: me.object.id
            }
          });
        }, appError);
      } else if (this.objectType === "ConceptScheme") {
        this.$store.commit('app/selectDirectory', null);
        this.$store.commit('editor/conceptMode', true);
        EcConceptScheme.get(this.object.id, function (success) {
          me.$store.commit('editor/framework', success);
          me.$store.commit('editor/clearFrameworkCommentData');
          me.$store.commit('app/setCanViewComments', me.canViewCommentsCurrentFramework());
          me.$store.commit('app/setCanAddComments', me.canAddCommentsCurrentFramework());
          me.$router.push({
            name: "conceptScheme",
            params: {
              frameworkId: me.object.id
            }
          });
        }, appError);
      } else {
        this.$store.commit('app/selectDirectory', null);
        EcFramework.get(this.object.id, function (success) {
          me.$store.commit('editor/framework', success);
          me.$store.commit('editor/clearFrameworkCommentData');
          me.$store.commit('app/setCanViewComments', me.canViewCommentsCurrentFramework());
          me.$store.commit('app/setCanAddComments', me.canAddCommentsCurrentFramework());
          me.$router.push({
            name: "framework",
            params: {
              frameworkId: me.object.id
            }
          });
        }, appError);
      }
    },
    getName: function getName(field) {
      var name = EcArray.isArray(field) ? field : [field];
      if (schema.Thing.getDisplayStringFrom(name).toLowerCase().indexOf("http") !== -1) {
        return this.resolveNameFromUrl(schema.Thing.getDisplayStringFrom(name));
      } else {
        return schema.Thing.getDisplayStringFrom(name);
      }
    },
    goToParentDirectory: function goToParentDirectory() {
      var me = this;
      var directoryId = this.object.directory ? this.object.directory : this.object.parentDirectory;
      EcDirectory.get(directoryId, function (result) {
        me.$store.commit('app/selectDirectory', result);
        if (me.$route.name !== "directory") {
          me.$router.push({
            name: "directory"
          });
        }
        me.$store.commit('app/closeRightAside');
      }, appError);
    },
    copyOrMove: function () {
      var _copyOrMove2 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee(directory, _copyOrMove) {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (_copyOrMove === 'copy') {
                this.copyingToDirectory = true;
              } else {
                this.movingToDirectory = true;
              }
              this.frameworksToProcess = 0;
              this.processingCopyOrMove = true;
              this.$Progress.start();
              if (this.copyingToDirectory) {
                this.$emit('beginCopy');
              } else if (this.movingToDirectory) {
                this.$emit('beginMove');
              }
              // To do: add confirmation step once we have this in the right spot
              if (!(this.copyingToDirectory && this.objectType === 'Framework')) {
                _context.next = 9;
                break;
              }
              this.copyFrameworkToDirectory(directory, this.object);
              _context.next = 37;
              break;
            case 9:
              if (!(this.copyingToDirectory && this.objectType === 'CreativeWork')) {
                _context.next = 13;
                break;
              }
              this.copyResourceToDirectory(directory, this.object);
              _context.next = 37;
              break;
            case 13:
              if (!(this.copyingToDirectory && this.objectType === 'Directory')) {
                _context.next = 17;
                break;
              }
              this.copySubdirectoryToDirectory(directory, this.object);
              _context.next = 37;
              break;
            case 17:
              if (!(this.copyingToDirectory && this.objectType === 'ConceptScheme')) {
                _context.next = 22;
                break;
              }
              _context.next = 20;
              return this.copyTaxonomyToDirectory(directory, this.object);
            case 20:
              _context.next = 37;
              break;
            case 22:
              if (!(this.movingToDirectory && this.objectType === 'Framework')) {
                _context.next = 26;
                break;
              }
              this.moveFrameworkToDirectory(directory, this.object);
              _context.next = 37;
              break;
            case 26:
              if (!(this.movingToDirectory && this.objectType === 'CreativeWork')) {
                _context.next = 30;
                break;
              }
              this.moveResourceToDirectory(directory, this.object);
              _context.next = 37;
              break;
            case 30:
              if (!(this.movingToDirectory && this.objectType === 'Directory')) {
                _context.next = 34;
                break;
              }
              this.moveSubdirectoryToDirectory(directory, this.object);
              _context.next = 37;
              break;
            case 34:
              if (!(this.movingToDirectory && this.objectType === 'ConceptScheme')) {
                _context.next = 37;
                break;
              }
              _context.next = 37;
              return this.moveTaxonomyToDirectory(directory, this.object);
            case 37:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function copyOrMove(_x, _x2) {
        return _copyOrMove2.apply(this, arguments);
      }
      return copyOrMove;
    }(),
    removeFromDirectory: function () {
      var _removeFromDirectory = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee2() {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              this.$Progress.start();
              if (!(this.objectType === 'Framework')) {
                _context2.next = 6;
                break;
              }
              _context2.next = 4;
              return this.removeFrameworkFromDirectory(this.object);
            case 4:
              _context2.next = 19;
              break;
            case 6:
              if (!(this.objectType === 'CreativeWork')) {
                _context2.next = 11;
                break;
              }
              _context2.next = 9;
              return this.removeResourceFromDirectory(this.object);
            case 9:
              _context2.next = 19;
              break;
            case 11:
              if (!(this.objectType === 'Directory')) {
                _context2.next = 16;
                break;
              }
              _context2.next = 14;
              return this.removeSubdirectoryFromDirectory(this.object);
            case 14:
              _context2.next = 19;
              break;
            case 16:
              if (!(this.objectType === 'ConceptScheme')) {
                _context2.next = 19;
                break;
              }
              _context2.next = 19;
              return this.removeTaxonomyFromDirectory(this.object);
            case 19:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function removeFromDirectory() {
        return _removeFromDirectory.apply(this, arguments);
      }
      return removeFromDirectory;
    }(),
    multiput: function () {
      var _multiput = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee3(toSave, shouldRefresh) {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              this.frameworksToProcess--;
              if (!(this.frameworksToProcess <= 0)) {
                _context3.next = 13;
                break;
              }
              _context3.prev = 2;
              _context3.next = 5;
              return this.repo.multiput(toSave);
            case 5:
              if (this.movingToDirectory) {
                // Remove the moved item from the right panel
                this.$store.commit('app/rightAsideObject', null);
                this.$store.commit('app/closeRightAside');
              }
              if (shouldRefresh) {
                // If removing or moving, need to refresh search results
                this.$store.commit('app/refreshSearch', true);
              }
            case 7:
              _context3.prev = 7;
              this.processingCopyOrMove = false;
              this.$Progress.finish();
              this.copyingToDirectory = false;
              this.movingToDirectory = false;
              return _context3.finish(7);
            case 13:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[2,, 7, 13]]);
      }));
      function multiput(_x3, _x4) {
        return _multiput.apply(this, arguments);
      }
      return multiput;
    }(),
    getCopyTaxonomyName: function getCopyTaxonomyName(t) {
      var name = t['dcterms:title'];
      if (!EcArray.isArray(name)) {
        name = [name];
      }
      for (var each in name) {
        if (name[each]["@value"]) {
          name[each]["@value"] = "Copy of " + name[each]["@value"];
        } else {
          name[each] = "Copy of " + name[each];
        }
      }
      if (name.length === 1) {
        name = name[0];
      }
      return name;
    },
    getCopyFrameworkName: function getCopyFrameworkName(f) {
      var name = f.name;
      if (!EcArray.isArray(name)) {
        name = [name];
      }
      for (var each in name) {
        if (name[each]["@value"]) {
          name[each]["@value"] = "Copy of " + name[each]["@value"];
        } else {
          name[each] = "Copy of " + name[each];
        }
      }
      if (name.length === 1) {
        name = name[0];
      }
      return name;
    },
    copyTaxonomyToDirectory: function () {
      var _copyTaxonomyToDirectory = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee4(directory, taxonomy, toSaveFromSubdirectory) {
        var toSave, t, name, idMap, taxons, newTaxons, _iterator, _step, taxon, newTaxon, _iterator2, _step2, obj, _i, _Object$entries, _Object$entries$_i, key, value;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              toSave = [];
              if (toSaveFromSubdirectory) {
                toSave = toSaveFromSubdirectory;
              }
              t = new EcConceptScheme();
              t.copyFrom(taxonomy);
              if (this.queryParams.newObjectEndpoint != null) {
                t.generateShortId(this.queryParams.newObjectEndpoint);
              } else {
                t.generateId(this.repo.selectedServer);
              }
              t.directory = directory.shortId();
              t["schema:dateCreated"] = new Date().toISOString();
              t["schema:dateModified"] = new Date().toISOString();
              delete t.owner;
              delete t.reader;
              if (directory.owner) {
                t.owner = directory.owner;
              }
              if (directory.reader) {
                t.reader = directory.reader;
              }
              if (EcIdentityManager.default.ids.length > 0) {
                t.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
              }
              name = this.getCopyTaxonomyName(t);
              t.name = name;
              t['ceasn:derivedFrom'] = taxonomy.id;
              // Original framework was encrypted, make sure the copy is too
              if (EcEncryptedValue.encryptOnSaveMap && EcEncryptedValue.encryptOnSaveMap[taxonomy.shortId()]) {
                EcEncryptedValue.encryptOnSaveMap[t.shortId()] = true;
              }
              // Add this framework as a child of the directory
              if (!directory.taxonomies) {
                directory.taxonomies = [];
              }
              EcArray.setAdd(directory.taxonomies, t.shortId());
              toSave.push(directory);
              idMap = {};
              idMap[taxonomy.shortId()] = t.shortId();
              _context4.next = 24;
              return EcConcept.search(this.repo, 'skos\\:inScheme:"' + taxonomy.shortId() + '"', null, null, {
                size: 10000
              });
            case 24:
              taxons = _context4.sent;
              // First pass, create new taxons with new IDs
              newTaxons = [];
              _iterator = Object(createForOfIteratorHelper["a" /* default */])(taxons);
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  taxon = _step.value;
                  newTaxon = new EcConcept().copyFrom(taxon);
                  if (this.queryParams.newObjectEndpoint != null) {
                    newTaxon.generateShortId(this.queryParams.newObjectEndpoint);
                  } else {
                    newTaxon.generateId(this.repo.selectedServer);
                  }
                  idMap[taxon.shortId()] = newTaxon.shortId();
                  newTaxon["schema:dateCreated"] = new Date().toISOString();
                  newTaxon["schema:dateModified"] = new Date().toISOString();
                  delete newTaxon.owner;
                  delete newTaxon.reader;
                  if (t.owner) {
                    newTaxon.owner = t.owner;
                  }
                  if (t.reader) {
                    newTaxon.reader = t.reader;
                  }
                  if (EcIdentityManager.default.ids.length > 0) {
                    newTaxon.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
                  }
                  newTaxon['ceasn:derivedFrom'] = taxon.id;
                  // If the original competency was encrypted, make sure the copy is too
                  if (EcEncryptedValue.encryptOnSaveMap && EcEncryptedValue.encryptOnSaveMap[taxon.shortId()]) {
                    EcEncryptedValue.encryptOnSaveMap[newTaxon.shortId()] = true;
                  }
                  newTaxons.push(newTaxon);
                }
                // Second pass, change properties inside new taxons to reflect new IDs
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
              _iterator2 = Object(createForOfIteratorHelper["a" /* default */])([t].concat(newTaxons));
              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  obj = _step2.value;
                  for (_i = 0, _Object$entries = Object.entries(obj); _i < _Object$entries.length; _i++) {
                    _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];
                    if (Array.isArray(value)) {
                      obj[key] = value.map(function (x) {
                        if (idMap[x]) {
                          return idMap[x];
                        }
                        return x;
                      });
                    } else if (idMap[value]) {
                      obj[key] = idMap[value];
                    }
                  }
                  toSave.push(obj);
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
              _context4.next = 32;
              return this.multiput(toSave);
            case 32:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function copyTaxonomyToDirectory(_x5, _x6, _x7) {
        return _copyTaxonomyToDirectory.apply(this, arguments);
      }
      return copyTaxonomyToDirectory;
    }(),
    copyFrameworkToDirectory: function copyFrameworkToDirectory(directory, framework, toSaveFromSubdirectory) {
      var toSave = [];
      if (toSaveFromSubdirectory) {
        toSave = toSaveFromSubdirectory;
      }
      var f = new EcFramework();
      f.copyFrom(framework);
      if (f.competency && Array.isArray(f.competency)) {
        f.competency = Object(toConsumableArray["a" /* default */])(new Set(f.competency));
      }
      if (f.relation && Array.isArray(f.relation)) {
        f.relation = Object(toConsumableArray["a" /* default */])(new Set(f.relation));
      }
      if (this.queryParams.newObjectEndpoint != null) {
        f.generateShortId(this.queryParams.newObjectEndpoint);
      } else {
        f.generateId(this.repo.selectedServer);
      }
      f.directory = directory.shortId();
      f["schema:dateCreated"] = new Date().toISOString();
      f["schema:dateModified"] = new Date().toISOString();
      delete f.owner;
      delete f.reader;
      if (directory.owner) {
        f.owner = directory.owner;
      }
      if (directory.reader) {
        f.reader = directory.reader;
      }
      if (EcIdentityManager.default.ids.length > 0) {
        f.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
      }
      var name = this.getCopyFrameworkName(f);
      f.name = name;
      f['ceasn:derivedFrom'] = framework.id;
      // Original framework was encrypted, make sure the copy is too
      if (EcEncryptedValue.encryptOnSaveMap && EcEncryptedValue.encryptOnSaveMap[framework.shortId()]) {
        EcEncryptedValue.encryptOnSaveMap[f.shortId()] = true;
      }
      // Add this framework as a child of the directory
      if (!directory.frameworks) {
        directory.frameworks = [];
      }
      EcArray.setAdd(directory.frameworks, f.shortId());
      toSave.push(directory);
      var competencyMap = {};
      // to do: replace all the competency (etc) URLs in framework object and THEN push framework obj
      if (framework.competency && framework.competency.length > 0) {
        this.copyCompetenciesToDirectory(f, toSave, competencyMap);
      } else if (framework.level && framework.level.length > 0) {
        this.copyLevelsToDirectory(f, toSave, competencyMap);
      } else if (framework.relation && framework.relation.length > 0) {
        this.copyRelationsToDirectory(f, toSave, competencyMap);
      } else {
        toSave.push(f);
        this.multiput(toSave);
      }
    },
    copyCompetenciesToDirectory: function copyCompetenciesToDirectory(framework, toSave, competencyMap) {
      var me = this;
      new EcAsyncHelper().each(framework.competency, function (competencyId, done) {
        EcCompetency.get(competencyId, function (competency) {
          var c = new EcCompetency();
          c.copyFrom(competency);
          if (me.queryParams.newObjectEndpoint != null) {
            c.generateShortId(me.queryParams.newObjectEndpoint);
          } else {
            c.generateId(me.repo.selectedServer);
          }
          competencyMap[competency.shortId()] = c.shortId();
          var index = framework.competency.indexOf(competencyId);
          if (index !== -1) {
            framework.competency[index] = c.shortId();
          }
          c["schema:dateCreated"] = new Date().toISOString();
          c["schema:dateModified"] = new Date().toISOString();
          delete c.owner;
          delete c.reader;
          if (framework.owner) {
            c.owner = framework.owner;
          }
          if (framework.reader) {
            c.reader = framework.reader;
          }
          if (EcIdentityManager.default.ids.length > 0) {
            c.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
          }
          c['ceasn:derivedFrom'] = competency.id;
          // If the original competency was encrypted, make sure the copy is too
          if (EcEncryptedValue.encryptOnSaveMap && EcEncryptedValue.encryptOnSaveMap[competency.shortId()]) {
            EcEncryptedValue.encryptOnSaveMap[c.shortId()] = true;
          }
          toSave.push(c);
          done();
        }, done);
      }, function (competencyIds) {
        if (framework.level && framework.level.length > 0) {
          me.copyLevelsToDirectory(framework, toSave, competencyMap);
        } else if (framework.relation && framework.relation.length > 0) {
          me.copyRelationsToDirectory(framework, toSave, competencyMap);
        } else {
          toSave.push(framework);
          me.multiput(toSave);
        }
      });
    },
    copyLevelsToDirectory: function copyLevelsToDirectory(framework, toSave, competencyMap) {
      var me = this;
      new EcAsyncHelper().each(framework.level, function (levelId, done) {
        EcLevel.get(levelId, function (level) {
          var c = new EcLevel();
          c.copyFrom(level);
          if (me.queryParams.newObjectEndpoint != null) {
            c.generateShortId(me.queryParams.newObjectEndpoint);
          } else {
            c.generateId(me.repo.selectedServer);
          }
          // If original level was encrypted, encrypt the copy too
          if (EcEncryptedValue.encryptOnSaveMap && EcEncryptedValue.encryptOnSaveMap[level.shortId()]) {
            EcEncryptedValue.encryptOnSaveMap[c.shortId()] = true;
          }
          var index = framework.level.indexOf(levelId);
          if (index !== -1) {
            framework.level[index] = c.shortId();
          }
          if (c.competency) {
            if (!EcArray.isArray(c.competency)) {
              c.competency = [c.competency];
            }
            for (var each in c.competency) {
              c.competency[each] = competencyMap[c.competency[each]];
            }
          }
          c["schema:dateCreated"] = new Date().toISOString();
          c["schema:dateModified"] = new Date().toISOString();
          delete c.owner;
          delete c.reader;
          if (framework.owner) {
            c.owner = framework.owner;
          }
          if (framework.reader) {
            c.reader = framework.reader;
          }
          if (EcIdentityManager.default.ids.length > 0) {
            c.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
          }
          c['ceasn:derivedFrom'] = level.id;
          toSave.push(c);
          done();
        }, done);
      }, function (competencyIds) {
        if (framework.relation && framework.relation.length > 0) {
          me.copyRelationsToDirectory(framework, toSave, competencyMap);
        } else {
          toSave.push(framework);
          me.multiput(toSave);
        }
      });
    },
    copyRelationsToDirectory: function copyRelationsToDirectory(framework, toSave, competencyMap) {
      var me = this;
      new EcAsyncHelper().each(framework.relation, function (relationId, done) {
        EcAlignment.get(relationId, function (relation) {
          var c = new EcAlignment();
          c.copyFrom(relation);
          if (me.queryParams.newObjectEndpoint != null) {
            c.generateShortId(me.queryParams.newObjectEndpoint);
          } else {
            c.generateId(me.repo.selectedServer);
          }
          // If original relation was encrypted, make sure copy is too
          if (EcEncryptedValue.encryptOnSaveMap && EcEncryptedValue.encryptOnSaveMap[relation.shortId()]) {
            EcEncryptedValue.encryptOnSaveMap[c.shortId()] = true;
          }
          var index = framework.relation.indexOf(relationId);
          if (index !== -1) {
            framework.relation[index] = c.shortId();
          }
          if (relation.source && competencyMap[relation.source]) {
            c.source = competencyMap[relation.source];
          }
          if (relation.target && competencyMap[relation.target]) {
            c.target = competencyMap[relation.target];
          }
          c["schema:dateCreated"] = new Date().toISOString();
          c["schema:dateModified"] = new Date().toISOString();
          delete c.owner;
          delete c.reader;
          if (framework.owner) {
            c.owner = framework.owner;
          }
          if (framework.reader) {
            c.reader = framework.reader;
          }
          if (EcIdentityManager.default.ids.length > 0) {
            c.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
          }
          c['ceasn:derivedFrom'] = relation.id;
          toSave.push(c);
          done();
        }, done);
      }, function (competencyIds) {
        toSave.push(framework);
        me.multiput(toSave);
      });
    },
    copyResourceToDirectory: function copyResourceToDirectory(directory, resource, toSaveFromSubdirectory) {
      var me = this;
      var c = new schema.CreativeWork();
      if (this.queryParams.newObjectEndpoint != null) {
        c.generateShortId(this.queryParams.newObjectEndpoint);
      } else {
        c.generateId(this.repo.selectedServer);
      }
      c.name = "Copy of " + resource.name;
      c.url = resource.url;
      c.directory = directory.shortId();
      if (directory.owner) {
        c.owner = directory.owner;
      }
      if (directory.reader) {
        c.reader = directory.reader;
      }
      if (EcIdentityManager.default.ids.length > 0) {
        c.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
      }

      // If original resource is encrypted, make sure copy is too
      if (EcEncryptedValue.encryptOnSaveMap && EcEncryptedValue.encryptOnSaveMap[resource.shortId()]) {
        EcEncryptedValue.encryptOnSaveMap[c.shortId()] = true;
      }
      // Add resource as a child of the directory
      if (!directory.resources) {
        directory.resources = [];
      }
      EcArray.setAdd(directory.resources, c.shortId());
      var toSave = [c, directory];
      if (toSaveFromSubdirectory) {
        toSave = toSave.concat(toSaveFromSubdirectory);
      }
      me.multiput(toSave);
    },
    copySubdirectoryToDirectory: function () {
      var _copySubdirectoryToDirectory = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee5(directory, oldSubdirectory, passedInToSave) {
        var _toSave;
        var toSave, subdirectory, children, validChildren, _iterator3, _step3, _child, _obj, done, _i2, _validChildren, obj;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              toSave = [];
              if (passedInToSave) {
                toSave = passedInToSave;
              }
              subdirectory = new EcDirectory();
              subdirectory.copyFrom(oldSubdirectory);
              if (this.queryParams.newObjectEndpoint != null) {
                subdirectory.generateShortId(this.queryParams.newObjectEndpoint);
              } else {
                subdirectory.generateId(this.repo.selectedServer);
              }
              subdirectory.parentDirectory = directory.shortId();
              subdirectory["schema:dateCreated"] = new Date().toISOString();
              subdirectory["schema:dateModified"] = new Date().toISOString();
              delete subdirectory.owner;
              delete subdirectory.reader;
              if (directory.owner) {
                subdirectory.owner = directory.owner;
              }
              if (directory.reader) {
                subdirectory.reader = directory.reader;
              }
              if (EcIdentityManager.default.ids.length > 0) {
                subdirectory.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
              }
              subdirectory['ceasn:derivedFrom'] = oldSubdirectory.id;
              subdirectory.name = "Copy of " + subdirectory.name;
              // If original directory was encrypted, make sure the copy is too
              if (EcEncryptedValue.encryptOnSaveMap && EcEncryptedValue.encryptOnSaveMap[oldSubdirectory.shortId()]) {
                EcEncryptedValue.encryptOnSaveMap[subdirectory.shortId()] = true;
              }
              // Add this directory as a child of the parent
              if (!directory.directories) {
                directory.directories = [];
              }
              EcArray.setAdd(directory.directories, subdirectory.shortId());
              _context5.next = 20;
              return this.$store.dispatch('editor/getDirectoryChildren', oldSubdirectory);
            case 20:
              children = _context5.sent;
              // Remove children that do not resolve from the copy
              validChildren = [];
              _iterator3 = Object(createForOfIteratorHelper["a" /* default */])(children);
              _context5.prev = 23;
              _iterator3.s();
            case 25:
              if ((_step3 = _iterator3.n()).done) {
                _context5.next = 45;
                break;
              }
              _child = _step3.value;
              _context5.prev = 27;
              _context5.next = 30;
              return EcRepository.get(_child);
            case 30:
              _obj = _context5.sent;
              if (!(_obj.type === 'EncryptedValue')) {
                _context5.next = 35;
                break;
              }
              _context5.next = 34;
              return EcEncryptedValue.fromEncryptedValue(_obj);
            case 34:
              _obj = _context5.sent;
            case 35:
              validChildren.push(_obj);
              _context5.next = 43;
              break;
            case 38:
              _context5.prev = 38;
              _context5.t0 = _context5["catch"](27);
              EcArray.setRemove(subdirectory.directories || [], _child);
              EcArray.setRemove(subdirectory.frameworks || [], _child);
              EcArray.setRemove(subdirectory.resources || [], _child);
            case 43:
              _context5.next = 25;
              break;
            case 45:
              _context5.next = 50;
              break;
            case 47:
              _context5.prev = 47;
              _context5.t1 = _context5["catch"](23);
              _iterator3.e(_context5.t1);
            case 50:
              _context5.prev = 50;
              _iterator3.f();
              return _context5.finish(50);
            case 53:
              (_toSave = toSave).push.apply(_toSave, [directory, subdirectory]);
              done = [];
              _i2 = 0, _validChildren = validChildren;
            case 56:
              if (!(_i2 < _validChildren.length)) {
                _context5.next = 84;
                break;
              }
              obj = _validChildren[_i2];
              _context5.prev = 58;
              if (!(obj.type === 'Framework')) {
                _context5.next = 64;
                break;
              }
              _context5.next = 62;
              return this.copyFrameworkToDirectory(subdirectory, obj, toSave);
            case 62:
              _context5.next = 75;
              break;
            case 64:
              if (!(obj.type === 'CreativeWork')) {
                _context5.next = 69;
                break;
              }
              _context5.next = 67;
              return this.copyResourceToDirectory(subdirectory, obj, toSave);
            case 67:
              _context5.next = 75;
              break;
            case 69:
              if (!(obj.type === 'ConceptScheme')) {
                _context5.next = 74;
                break;
              }
              _context5.next = 72;
              return this.copyTaxonomyToDirectory(subdirectory, obj, toSave);
            case 72:
              _context5.next = 75;
              break;
            case 74:
              if (obj.type === 'Directory') {
                this.frameworksToProcess--;
                this.copySubdirectoryToDirectory(subdirectory, obj, toSave);
              }
            case 75:
              done.push(child);
              _context5.next = 81;
              break;
            case 78:
              _context5.prev = 78;
              _context5.t2 = _context5["catch"](58);
              appError(_context5.t2);
            case 81:
              _i2++;
              _context5.next = 56;
              break;
            case 84:
              if (!(done.length === 0)) {
                _context5.next = 87;
                break;
              }
              _context5.next = 87;
              return this.multiput(toSave, true);
            case 87:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this, [[23, 47, 50, 53], [27, 38], [58, 78]]);
      }));
      function copySubdirectoryToDirectory(_x8, _x9, _x10) {
        return _copySubdirectoryToDirectory.apply(this, arguments);
      }
      return copySubdirectoryToDirectory;
    }(),
    moveTaxonomyToDirectory: function () {
      var _moveTaxonomyToDirectory = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee6(directory, taxonomy, toSaveFromSubdirectory) {
        var _toSave3, _toSave2, _iterator4, _step4, each, taxons, _iterator5, _step5, taxon, _iterator6, _step6, _each;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _toSave2 = [];
              if (toSaveFromSubdirectory) {
                _toSave2 = toSaveFromSubdirectory;
              }

              // If the taxonomy was already in a directory, remove it first
              if (!taxonomy.directory) {
                _context6.next = 6;
                break;
              }
              _context6.next = 6;
              return this.removeTaxonomyFromDirectory(taxonomy);
            case 6:
              if (directory.owner) {
                _iterator4 = Object(createForOfIteratorHelper["a" /* default */])(directory.owner);
                try {
                  for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                    each = _step4.value;
                    taxonomy.addOwner(EcPk.fromPem(each));
                  }
                } catch (err) {
                  _iterator4.e(err);
                } finally {
                  _iterator4.f();
                }
              }
              taxonomy.reader = directory.reader;
              taxonomy.directory = directory.shortId();
              taxonomy["schema:dateModified"] = new Date().toISOString();
              // Add this taxonomy as a child of the directory
              if (!directory.taxonomies) {
                directory.taxonomies = [];
              }
              _context6.next = 13;
              return EcConcept.search(this.repo, 'skos\\:inScheme:"' + taxonomy.shortId() + '"', null, null, {
                size: 10000
              });
            case 13:
              taxons = _context6.sent;
              _iterator5 = Object(createForOfIteratorHelper["a" /* default */])(taxons);
              try {
                for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                  taxon = _step5.value;
                  if (directory.owner) {
                    _iterator6 = Object(createForOfIteratorHelper["a" /* default */])(directory.owner);
                    try {
                      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                        _each = _step6.value;
                        taxon.addOwner(EcPk.fromPem(_each));
                      }
                    } catch (err) {
                      _iterator6.e(err);
                    } finally {
                      _iterator6.f();
                    }
                  }
                  taxon.reader = directory.reader;
                  taxon["schema:dateModified"] = new Date().toISOString();
                  _toSave2.push(taxon);
                }
              } catch (err) {
                _iterator5.e(err);
              } finally {
                _iterator5.f();
              }
              EcArray.setAdd(directory.taxonomies, taxonomy.shortId());
              (_toSave3 = _toSave2).push.apply(_toSave3, [taxonomy, directory]);
              _context6.next = 20;
              return this.multiput(_toSave2, true);
            case 20:
              _context6.next = 25;
              break;
            case 22:
              _context6.prev = 22;
              _context6.t0 = _context6["catch"](0);
              appError(_context6.t0);
            case 25:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this, [[0, 22]]);
      }));
      function moveTaxonomyToDirectory(_x11, _x12, _x13) {
        return _moveTaxonomyToDirectory.apply(this, arguments);
      }
      return moveTaxonomyToDirectory;
    }(),
    moveFrameworkToDirectory: function () {
      var _moveFrameworkToDirectory = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee7(directory, framework, toSaveFromSubdirectory) {
        var _toSave5, _toSave4, _iterator7, _step7, each, subobjects;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _toSave4 = [];
              if (toSaveFromSubdirectory) {
                _toSave4 = toSaveFromSubdirectory;
              }
              if (framework.competency && Array.isArray(framework.competency)) {
                framework.competency = Object(toConsumableArray["a" /* default */])(new Set(framework.competency));
              }
              if (framework.relation && Array.isArray(framework.relation)) {
                framework.relation = Object(toConsumableArray["a" /* default */])(new Set(framework.relation));
              }

              // If the framework was already in a directory, remove it first
              if (!framework.directory) {
                _context7.next = 8;
                break;
              }
              _context7.next = 8;
              return this.removeFrameworkFromDirectory(framework);
            case 8:
              if (directory.owner) {
                _iterator7 = Object(createForOfIteratorHelper["a" /* default */])(directory.owner);
                try {
                  for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                    each = _step7.value;
                    framework.addOwner(EcPk.fromPem(each));
                  }
                } catch (err) {
                  _iterator7.e(err);
                } finally {
                  _iterator7.f();
                }
              }
              framework.reader = directory.reader;
              framework.directory = directory.shortId();
              framework["schema:dateModified"] = new Date().toISOString();
              // Add this framework as a child of the directory
              if (!directory.frameworks) {
                directory.frameworks = [];
              }
              EcArray.setAdd(directory.frameworks, framework.shortId());
              (_toSave5 = _toSave4).push.apply(_toSave5, [framework, directory]);
              subobjects = [];
              if (framework.competency && framework.competency.length > 0) {
                subobjects = framework.competency;
              }
              if (framework.level && framework.level.length > 0) {
                subobjects = subobjects.concat(framework.level);
              }
              if (framework.relation && framework.relation.length > 0) {
                subobjects = subobjects.concat(framework.relation);
              }
              if (!(subobjects.length > 0)) {
                _context7.next = 24;
                break;
              }
              _context7.next = 22;
              return this.moveSubobjectsToDirectory(subobjects, directory, _toSave4);
            case 22:
              _context7.next = 26;
              break;
            case 24:
              _context7.next = 26;
              return this.multiput(_toSave4, true);
            case 26:
              _context7.next = 31;
              break;
            case 28:
              _context7.prev = 28;
              _context7.t0 = _context7["catch"](0);
              appError(_context7.t0);
            case 31:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this, [[0, 28]]);
      }));
      function moveFrameworkToDirectory(_x14, _x15, _x16) {
        return _moveFrameworkToDirectory.apply(this, arguments);
      }
      return moveFrameworkToDirectory;
    }(),
    moveSubobjectsToDirectory: function () {
      var _moveSubobjectsToDirectory = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee8(subobjects, directory, toSave) {
        var me;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              me = this;
              return _context8.abrupt("return", new Promise(function (resolve, reject) {
                new EcAsyncHelper().each(subobjects, function (id, done) {
                  EcRepository.get(id, function (obj) {
                    if (directory.owner) {
                      var _iterator8 = Object(createForOfIteratorHelper["a" /* default */])(directory.owner),
                        _step8;
                      try {
                        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                          var each = _step8.value;
                          obj.addOwner(EcPk.fromPem(each));
                        }
                      } catch (err) {
                        _iterator8.e(err);
                      } finally {
                        _iterator8.f();
                      }
                    }
                    obj.reader = directory.reader;
                    obj["schema:dateModified"] = new Date().toISOString();
                    toSave.push(obj);
                    done();
                  }, done);
                }, function (ids) {
                  me.multiput(toSave, true).then(resolve).catch(reject);
                });
              }));
            case 2:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function moveSubobjectsToDirectory(_x17, _x18, _x19) {
        return _moveSubobjectsToDirectory.apply(this, arguments);
      }
      return moveSubobjectsToDirectory;
    }(),
    moveResourceToDirectory: function () {
      var _moveResourceToDirectory = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee9(directory, resource, toSaveFromSubdirectory) {
        var me, _iterator9, _step9, each, toSave;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              me = this; // If the resource was already in a directory, remove it first
              if (!resource.directory) {
                _context9.next = 4;
                break;
              }
              _context9.next = 4;
              return this.removeResourceFromDirectory(resource);
            case 4:
              if (directory.owner) {
                _iterator9 = Object(createForOfIteratorHelper["a" /* default */])(directory.owner);
                try {
                  for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
                    each = _step9.value;
                    resource.addOwner(EcPk.fromPem(each));
                  }
                } catch (err) {
                  _iterator9.e(err);
                } finally {
                  _iterator9.f();
                }
              }
              resource.reader = directory.reader;
              resource.directory = directory.shortId();
              // Add this resource as a child of the directory
              if (!directory.resources) {
                directory.resources = [];
              }
              EcArray.setAdd(directory.resources, resource.shortId());
              toSave = [directory, resource];
              if (toSaveFromSubdirectory) {
                toSave = toSave.concat(toSaveFromSubdirectory);
              }
              me.multiput(toSave, true);
            case 12:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this);
      }));
      function moveResourceToDirectory(_x20, _x21, _x22) {
        return _moveResourceToDirectory.apply(this, arguments);
      }
      return moveResourceToDirectory;
    }(),
    moveSubdirectoryToDirectory: function () {
      var _moveSubdirectoryToDirectory = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee11(directory, subdirectory, passedInToSave) {
        var _toSave6;
        var me, toSave, _iterator10, _step10, each, children, success;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              me = this;
              toSave = [];
              if (passedInToSave) {
                toSave = passedInToSave;
              }
              // If the subdirectory is already in a directory, remove it first
              if (!subdirectory.parentDirectory) {
                _context11.next = 6;
                break;
              }
              _context11.next = 6;
              return this.removeSubdirectoryFromDirectory(subdirectory);
            case 6:
              subdirectory.parentDirectory = directory.shortId();
              subdirectory["schema:dateModified"] = new Date().toISOString();
              if (directory.owner) {
                _iterator10 = Object(createForOfIteratorHelper["a" /* default */])(directory.owner);
                try {
                  for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
                    each = _step10.value;
                    subdirectory.addOwner(EcPk.fromPem(each));
                  }
                } catch (err) {
                  _iterator10.e(err);
                } finally {
                  _iterator10.f();
                }
              }
              subdirectory.reader = directory.reader;
              // Add this directory as a child of the directory
              if (!directory.directories) {
                directory.directories = [];
              }
              EcArray.setAdd(directory.directories, subdirectory.shortId());
              (_toSave6 = toSave).push.apply(_toSave6, [subdirectory, directory]);
              _context11.next = 15;
              return this.$store.dispatch('editor/getDirectoryChildren', subdirectory);
            case 15:
              children = _context11.sent;
              _context11.next = 18;
              return window.repo.multiget(children);
            case 18:
              success = _context11.sent;
              this.frameworksToProcess += success.length;
              return _context11.abrupt("return", new Promise(function (resolve, reject) {
                new EcAsyncHelper().each(success, /*#__PURE__*/function () {
                  var _ref3 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee10(obj, done) {
                    return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee10$(_context10) {
                      while (1) switch (_context10.prev = _context10.next) {
                        case 0:
                          if (!(obj.type === 'EncryptedValue')) {
                            _context10.next = 4;
                            break;
                          }
                          _context10.next = 3;
                          return EcEncryptedValue.fromEncryptedValue(obj);
                        case 3:
                          obj = _context10.sent;
                        case 4:
                          if (!(obj.type === 'Framework')) {
                            _context10.next = 9;
                            break;
                          }
                          _context10.next = 7;
                          return me.moveFrameworkToDirectory(subdirectory, obj, toSave);
                        case 7:
                          _context10.next = 24;
                          break;
                        case 9:
                          if (!(obj.type === 'CreativeWork')) {
                            _context10.next = 14;
                            break;
                          }
                          _context10.next = 12;
                          return me.moveResourceToDirectory(subdirectory, obj, toSave);
                        case 12:
                          _context10.next = 24;
                          break;
                        case 14:
                          if (!(obj.type === 'ConceptScheme')) {
                            _context10.next = 19;
                            break;
                          }
                          _context10.next = 17;
                          return me.moveTaxonomyToDirectory(subdirectory, obj, toSave);
                        case 17:
                          _context10.next = 24;
                          break;
                        case 19:
                          if (!(obj.type === "Directory")) {
                            _context10.next = 24;
                            break;
                          }
                          _context10.next = 22;
                          return me.frameworksToProcess--;
                        case 22:
                          _context10.next = 24;
                          return me.moveSubdirectoryToDirectory(subdirectory, obj, toSave);
                        case 24:
                          done();
                        case 25:
                        case "end":
                          return _context10.stop();
                      }
                    }, _callee10);
                  }));
                  return function (_x26, _x27) {
                    return _ref3.apply(this, arguments);
                  };
                }(), function (ids) {
                  if (ids.length === 0) {
                    me.multiput(toSave, true).then(resolve).catch(reject);
                  } else {
                    resolve();
                  }
                });
              }));
            case 21:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this);
      }));
      function moveSubdirectoryToDirectory(_x23, _x24, _x25) {
        return _moveSubdirectoryToDirectory.apply(this, arguments);
      }
      return moveSubdirectoryToDirectory;
    }(),
    removeTaxonomyFromDirectory: function () {
      var _removeTaxonomyFromDirectory = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee12(taxonomy) {
        var me, _toSave7, directory, _iterator11, _step11, each, _iterator12, _step12, _each2;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              this.processingRemove = true;
              _context12.prev = 1;
              me = this;
              _toSave7 = [];
              this.$Progress.start();
              _context12.next = 7;
              return EcDirectory.get(taxonomy.directory);
            case 7:
              directory = _context12.sent;
              if (directory.owner) {
                _iterator11 = Object(createForOfIteratorHelper["a" /* default */])(directory.owner);
                try {
                  for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
                    each = _step11.value;
                    taxonomy.removeOwner(EcPk.fromPem(each));
                  }
                } catch (err) {
                  _iterator11.e(err);
                } finally {
                  _iterator11.f();
                }
                taxonomy.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
              }
              if (directory.reader) {
                _iterator12 = Object(createForOfIteratorHelper["a" /* default */])(directory.reader);
                try {
                  for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
                    _each2 = _step12.value;
                    taxonomy.removeReader(EcPk.fromPem(_each2));
                  }
                } catch (err) {
                  _iterator12.e(err);
                } finally {
                  _iterator12.f();
                }
              }
              delete taxonomy.directory;
              taxonomy["schema:dateModified"] = new Date().toISOString();
              // remove this framework from the list of children
              if (directory.taxonomies) {
                EcArray.setRemove(directory.taxonomies, taxonomy.shortId());
              }
              _toSave7.push.apply(_toSave7, [taxonomy, directory]);
              _context12.next = 16;
              return me.multiput(_toSave7, true);
            case 16:
              _context12.prev = 16;
              this.processingRemove = false;
              return _context12.finish(16);
            case 19:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this, [[1,, 16, 19]]);
      }));
      function removeTaxonomyFromDirectory(_x28) {
        return _removeTaxonomyFromDirectory.apply(this, arguments);
      }
      return removeTaxonomyFromDirectory;
    }(),
    removeFrameworkFromDirectory: function () {
      var _removeFrameworkFromDirectory = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee13(framework) {
        var me, _toSave8, directory, _iterator13, _step13, each, _iterator14, _step14, _each3, subobjects;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              this.processingRemove = true;
              _context13.prev = 1;
              me = this;
              _toSave8 = [];
              this.$Progress.start();
              _context13.next = 7;
              return EcDirectory.get(framework.directory);
            case 7:
              directory = _context13.sent;
              if (directory.owner) {
                _iterator13 = Object(createForOfIteratorHelper["a" /* default */])(directory.owner);
                try {
                  for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
                    each = _step13.value;
                    framework.removeOwner(EcPk.fromPem(each));
                  }
                } catch (err) {
                  _iterator13.e(err);
                } finally {
                  _iterator13.f();
                }
                framework.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
              }
              if (directory.reader) {
                _iterator14 = Object(createForOfIteratorHelper["a" /* default */])(directory.reader);
                try {
                  for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
                    _each3 = _step14.value;
                    framework.removeReader(EcPk.fromPem(_each3));
                  }
                } catch (err) {
                  _iterator14.e(err);
                } finally {
                  _iterator14.f();
                }
              }
              delete framework.directory;
              framework["schema:dateModified"] = new Date().toISOString();
              // remove this framework from the list of children
              if (directory.frameworks) {
                EcArray.setRemove(directory.frameworks, framework.shortId());
              }
              _toSave8.push.apply(_toSave8, [framework, directory]);
              subobjects = [];
              if (framework.competency && framework.competency.length > 0) {
                subobjects = framework.competency;
              }
              if (framework.level && framework.level.length > 0) {
                subobjects = subobjects.concat(framework.level);
              }
              if (framework.relation && framework.relation.length > 0) {
                subobjects = subobjects.concat(framework.relation);
              }
              if (!(subobjects.length > 0)) {
                _context13.next = 23;
                break;
              }
              _context13.next = 21;
              return me.removeSubobjectsFromDirectory(subobjects, directory, _toSave8);
            case 21:
              _context13.next = 25;
              break;
            case 23:
              _context13.next = 25;
              return me.multiput(_toSave8, true);
            case 25:
              _context13.prev = 25;
              this.processingRemove = false;
              return _context13.finish(25);
            case 28:
            case "end":
              return _context13.stop();
          }
        }, _callee13, this, [[1,, 25, 28]]);
      }));
      function removeFrameworkFromDirectory(_x29) {
        return _removeFrameworkFromDirectory.apply(this, arguments);
      }
      return removeFrameworkFromDirectory;
    }(),
    removeSubobjectsFromDirectory: function () {
      var _removeSubobjectsFromDirectory = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee15(subobjects, directory, toSave) {
        var me;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              me = this;
              return _context15.abrupt("return", new Promise(function (resolve, reject) {
                new EcAsyncHelper().each(subobjects, function (id, done) {
                  EcRepository.get(id, /*#__PURE__*/function () {
                    var _ref4 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee14(obj) {
                      var _iterator15, _step15, each, _iterator16, _step16, _each4;
                      return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee14$(_context14) {
                        while (1) switch (_context14.prev = _context14.next) {
                          case 0:
                            if (directory.owner) {
                              _iterator15 = Object(createForOfIteratorHelper["a" /* default */])(directory.owner);
                              try {
                                for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
                                  each = _step15.value;
                                  obj.removeOwner(EcPk.fromPem(each));
                                }
                              } catch (err) {
                                _iterator15.e(err);
                              } finally {
                                _iterator15.f();
                              }
                              obj.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
                            }
                            if (directory.reader) {
                              _iterator16 = Object(createForOfIteratorHelper["a" /* default */])(directory.reader);
                              try {
                                for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
                                  _each4 = _step16.value;
                                  obj.removeReader(EcPk.fromPem(_each4));
                                }
                              } catch (err) {
                                _iterator16.e(err);
                              } finally {
                                _iterator16.f();
                              }
                            }
                            obj["schema:dateModified"] = new Date().toISOString();
                            toSave.push(obj);
                            done();
                          case 5:
                          case "end":
                            return _context14.stop();
                        }
                      }, _callee14);
                    }));
                    return function (_x33) {
                      return _ref4.apply(this, arguments);
                    };
                  }(), done);
                }, function (ids) {
                  me.multiput(toSave, true).then(resolve).catch(reject);
                });
              }));
            case 2:
            case "end":
              return _context15.stop();
          }
        }, _callee15, this);
      }));
      function removeSubobjectsFromDirectory(_x30, _x31, _x32) {
        return _removeSubobjectsFromDirectory.apply(this, arguments);
      }
      return removeSubobjectsFromDirectory;
    }(),
    removeResourceFromDirectory: function () {
      var _removeResourceFromDirectory = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee16(object) {
        var directory, _iterator17, _step17, each, _iterator18, _step18, _each5;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee16$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return EcDirectory.get(object.directory);
            case 2:
              directory = _context16.sent;
              if (directory.owner) {
                _iterator17 = Object(createForOfIteratorHelper["a" /* default */])(directory.owner);
                try {
                  for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
                    each = _step17.value;
                    object.removeOwner(EcPk.fromPem(each));
                  }
                } catch (err) {
                  _iterator17.e(err);
                } finally {
                  _iterator17.f();
                }
                object.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
              }
              if (directory.reader) {
                _iterator18 = Object(createForOfIteratorHelper["a" /* default */])(directory.reader);
                try {
                  for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
                    _each5 = _step18.value;
                    object.removeReader(EcPk.fromPem(_each5));
                  }
                } catch (err) {
                  _iterator18.e(err);
                } finally {
                  _iterator18.f();
                }
              }
              delete object.directory;
              // Remove this resource from the list of children
              if (directory.resources) {
                EcArray.setRemove(directory.resources, object.shortId());
              }
              toSave = [object, directory];
              _context16.next = 10;
              return this.multiput(toSave, true);
            case 10:
            case "end":
              return _context16.stop();
          }
        }, _callee16, this);
      }));
      function removeResourceFromDirectory(_x34) {
        return _removeResourceFromDirectory.apply(this, arguments);
      }
      return removeResourceFromDirectory;
    }(),
    removeSubdirectoryFromDirectory: function () {
      var _removeSubdirectoryFromDirectory = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee18(subdirectory) {
        var me, toSave, directory, _iterator19, _step19, each, _iterator20, _step20, _each6, children, success;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee18$(_context18) {
          while (1) switch (_context18.prev = _context18.next) {
            case 0:
              me = this;
              toSave = [];
              _context18.next = 4;
              return EcDirectory.get(subdirectory.parentDirectory);
            case 4:
              directory = _context18.sent;
              if (directory.owner) {
                _iterator19 = Object(createForOfIteratorHelper["a" /* default */])(directory.owner);
                try {
                  for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
                    each = _step19.value;
                    subdirectory.removeOwner(EcPk.fromPem(each));
                  }
                } catch (err) {
                  _iterator19.e(err);
                } finally {
                  _iterator19.f();
                }
                subdirectory.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
              }
              if (directory.reader) {
                _iterator20 = Object(createForOfIteratorHelper["a" /* default */])(directory.reader);
                try {
                  for (_iterator20.s(); !(_step20 = _iterator20.n()).done;) {
                    _each6 = _step20.value;
                    subdirectory.removeReader(EcPk.fromPem(_each6));
                  }
                } catch (err) {
                  _iterator20.e(err);
                } finally {
                  _iterator20.f();
                }
              }
              delete subdirectory.parentDirectory;
              subdirectory["schema:dateModified"] = new Date().toISOString();
              // Remove this directory from the list of children
              if (directory.directories) {
                EcArray.setRemove(directory.directories, subdirectory.shortId());
              }
              toSave.push.apply(toSave, [subdirectory, directory]);
              _context18.next = 13;
              return me.$store.dispatch('editor/getDirectoryChildren', subdirectory);
            case 13:
              children = _context18.sent;
              _context18.next = 16;
              return window.repo.multiget(children);
            case 16:
              success = _context18.sent;
              this.frameworksToProcess = success.length;
              return _context18.abrupt("return", new Promise(function (resolve, reject) {
                new EcAsyncHelper().each(success, /*#__PURE__*/function () {
                  var _ref5 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee17(obj, done) {
                    var subobjects;
                    return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee17$(_context17) {
                      while (1) switch (_context17.prev = _context17.next) {
                        case 0:
                          subobjects = [];
                          subobjects.push(obj.shortId());
                          if (obj.competency && obj.competency.length > 0) {
                            subobjects = subobjects.concat(obj.competency);
                          }
                          if (obj.level && obj.level.length > 0) {
                            subobjects = subobjects.concat(obj.level);
                          }
                          if (obj.relation && obj.relation.length > 0) {
                            subobjects = subobjects.concat(obj.relation);
                          }
                          if (!(subobjects.length > 0)) {
                            _context17.next = 8;
                            break;
                          }
                          _context17.next = 8;
                          return me.removeSubobjectsFromDirectory(subobjects, directory, toSave);
                        case 8:
                          done();
                        case 9:
                        case "end":
                          return _context17.stop();
                      }
                    }, _callee17);
                  }));
                  return function (_x36, _x37) {
                    return _ref5.apply(this, arguments);
                  };
                }(), function (ids) {
                  if (ids.length === 0) {
                    me.multiput(toSave, true).then(resolve).catch(reject);
                  } else {
                    resolve();
                  }
                });
              }));
            case 19:
            case "end":
              return _context18.stop();
          }
        }, _callee18, this);
      }));
      function removeSubdirectoryFromDirectory(_x35) {
        return _removeSubdirectoryFromDirectory.apply(this, arguments);
      }
      return removeSubdirectoryFromDirectory;
    }(),
    // Make sure user can't move directory into its child/grandchild/etc
    setIneligibleDirectoriesForMove: function () {
      var _setIneligibleDirectoriesForMove = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee19(obj) {
        var _iterator21, _step21, _child2, childObj;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee19$(_context19) {
          while (1) switch (_context19.prev = _context19.next) {
            case 0:
              if (!obj.directories) {
                _context19.next = 22;
                break;
              }
              _iterator21 = Object(createForOfIteratorHelper["a" /* default */])(obj.directories);
              _context19.prev = 2;
              _iterator21.s();
            case 4:
              if ((_step21 = _iterator21.n()).done) {
                _context19.next = 14;
                break;
              }
              _child2 = _step21.value;
              _context19.next = 8;
              return EcRepository.get(_child2);
            case 8:
              childObj = _context19.sent;
              this.ineligibleDirectoriesForMove.push(childObj.shortId());
              _context19.next = 12;
              return this.setIneligibleDirectoriesForMove(childObj);
            case 12:
              _context19.next = 4;
              break;
            case 14:
              _context19.next = 19;
              break;
            case 16:
              _context19.prev = 16;
              _context19.t0 = _context19["catch"](2);
              _iterator21.e(_context19.t0);
            case 19:
              _context19.prev = 19;
              _iterator21.f();
              return _context19.finish(19);
            case 22:
            case "end":
              return _context19.stop();
          }
        }, _callee19, this, [[2, 16, 19, 22]]);
      }));
      function setIneligibleDirectoriesForMove(_x38) {
        return _setIneligibleDirectoriesForMove.apply(this, arguments);
      }
      return setIneligibleDirectoriesForMove;
    }(),
    manageUsers: function manageUsers() {
      this.$store.commit('app/objForShareModal', this.object);
      this.$store.commit('app/showModal', {
        component: 'Share'
      });
    },
    editDirectory: function editDirectory() {
      this.$store.commit('app/editDirectory', true);
    }
  },
  mounted: function () {
    var _mounted = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee20() {
      var type, obj;
      return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee20$(_context20) {
        while (1) switch (_context20.prev = _context20.next) {
          case 0:
            this.setNumSubdirectoriesAndObjects();
            if (!this.object.encryptedType) {
              _context20.next = 10;
              break;
            }
            type = "Ec" + this.object.encryptedType;
            obj = new window[type]();
            _context20.t0 = obj;
            _context20.next = 7;
            return EcEncryptedValue.fromEncryptedValue(this.object);
          case 7:
            _context20.t1 = _context20.sent;
            _context20.t0.copyFrom.call(_context20.t0, _context20.t1);
            this.$store.commit('app/rightAsideObject', obj);
          case 10:
            if (this.object.type === "Directory") {
              this.setIneligibleDirectoriesForMove(this.object);
            }
          case 11:
          case "end":
            return _context20.stop();
        }
      }, _callee20, this);
    }));
    function mounted() {
      return _mounted.apply(this, arguments);
    }
    return mounted;
  }(),
  computed: {
    isCeasn: function isCeasn() {
      if (this.queryParams["ceasnDataFields"] && this.queryParams["ceasnDataFields"] === 'true') {
        return true;
      } else {
        return false;
      }
    },
    objectName: function objectName() {
      var name = this.object.name;
      if (!name && this.object["dcterms:title"]) {
        name = this.object["dcterms:title"];
      } else if (!name && this.object["skos:prefLabel"]) {
        name = this.object["skos:prefLabel"];
      }
      return schema.Thing.getDisplayStringFrom(name);
    },
    objectDescription: function objectDescription() {
      var description = this.object.description;
      if (!description && this.object["dcterms:description"]) {
        description = this.object["dcterms:description"];
      } else if (!description && this.object["skos:definition"]) {
        description = this.object["skos:definition"];
      }
      return schema.Thing.getDisplayStringFrom(description);
    },
    objectShortId: function objectShortId() {
      return this.object.shortId();
    },
    object: function object() {
      return this.$store.getters['app/rightAsideObject'];
    },
    objectType: function objectType() {
      return this.object.type;
    },
    objectTypeForDisplay: function objectTypeForDisplay() {
      if (this.objectType === 'CreativeWork') {
        return "Resource";
      }
      if (this.objectType === "ConceptScheme" && this.object.subType === "Progression") {
        return "Progression";
      }
      if (this.objectType === "ConceptScheme") {
        if (this.queryParams.ceasnDataFields === 'true') {
          return "Concept Scheme";
        } else {
          return "Taxonomy";
        }
      }
      if (this.objectType === "Framework" && this.object.subType === "Collection") {
        return "Collection";
      }
      return this.objectType;
    },
    lastModified: function lastModified() {
      if (this.object.getTimestamp()) {
        return this.$moment(new Date(this.object.getTimestamp())).format("MMM D YYYY");
      }
      if (this.object["schema:dateModified"]) {
        return this.$moment(new Date(this.object['schema:dateModified'])).format("MMM D YYYY");
      }
      return "unknown";
    },
    dateCreated: function dateCreated() {
      if (this.object["schema:dateCreated"]) {
        return this.$moment(new Date(this.object['schema:dateCreated'])).format("MMM D YYYY");
      }
      return "unknown";
    },
    publisherName: function publisherName() {
      if (this.object['ceasn:publisherName']) {
        if (this.getName(this.object['ceasn:publisherName'])) {
          return this.getName(this.object['ceasn:publisherName']);
        }
      }
      if (this.object['schema:publisher']) {
        if (this.getName(this.object['schema:publisher'])) {
          return this.getName(this.object['schema:publisher']);
        }
      }
      return null;
    },
    creatorName: function creatorName() {
      if (this.object['schema:creator']) {
        if (this.getName(this.object['schema:creator'])) {
          return this.getName(this.object['schema:creator']);
        }
      }
      return null;
    },
    shareLink: function shareLink() {
      var link = window.location.href;
      link = link.replace('/frameworks', '').replace('/directory', '');
      if (this.objectType === "Directory") {
        if (link.contains('?')) {
          return link + "&directoryId=" + this.objectShortId;
        } else {
          return link + "?directoryId=" + this.objectShortId;
        }
      } else if (this.$store.getters['editor/conceptMode'] === true || this.$store.getters['editor/progressionMode'] === true) {
        if (link.contains('?')) {
          return link + "&concepts=true&frameworkId=" + this.objectShortId;
        } else {
          return link + "?concepts=true&frameworkId=" + this.objectShortId;
        }
      }
      if (link.contains('?')) {
        return link + "&frameworkId=" + this.objectShortId;
      } else {
        return link + "?frameworkId=" + this.objectShortId;
      }
    },
    copyDirectoryOptions: function copyDirectoryOptions() {
      var me = this;
      return this.$store.getters['app/directoryList'].filter(function (directory) {
        return directory.shortId() !== me.object.shortId() && (me.object.parentDirectory ? directory.shortId() !== me.object.parentDirectory : true) && (me.object.directory ? directory.shortId() !== me.object.directory : true);
      });
    },
    moveDirectoryOptions: function moveDirectoryOptions() {
      var me = this;
      if (this.objectType === "Directory") {
        return this.$store.getters['app/directoryList'].filter(function (directory) {
          return directory.shortId() !== me.object.shortId() && (me.object.parentDirectory ? directory.shortId() !== me.object.parentDirectory : true) && (me.object.directory ? directory.shortId() !== me.object.directory : true) && !EcArray.has(me.ineligibleDirectoriesForMove, directory.shortId());
        });
      } else {
        return this.$store.getters['app/directoryList'].filter(function (directory) {
          return directory.shortId() !== me.object.shortId() && (me.object.parentDirectory ? directory.shortId() !== me.object.parentDirectory : true) && (me.object.directory ? directory.shortId() !== me.object.directory : true);
        });
      }
    },
    canEditObject: function canEditObject() {
      return this.canEditAny(this.object);
    },
    queryParams: function queryParams() {
      return this.$store.getters['editor/queryParams'];
    },
    loggedInPerson: function loggedInPerson() {
      return this.$store.getters['user/loggedOnPerson'];
    },
    selectedDirectoryId: function selectedDirectoryId() {
      if (this.$store.getters['app/selectedDirectory']) {
        return this.$store.getters['app/selectedDirectory'].shortId();
      }
      return null;
    }
  },
  watch: {
    objectShortId: function objectShortId() {
      this.copyingToDirectory = false;
      this.movingToDirectory = false;
      this.ineligibleDirectoriesForMove = [];
      this.setNumSubdirectoriesAndObjects();
      if (this.object.type === "Directory") {
        this.setIneligibleDirectoriesForMove(this.object);
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/framework/ListItemInfo.vue?vue&type=script&lang=js
 /* harmony default export */ var framework_ListItemInfovue_type_script_lang_js = (ListItemInfovue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/framework/ListItemInfo.vue?vue&type=style&index=0&id=3aebcc9e&prod&lang=scss
var ListItemInfovue_type_style_index_0_id_3aebcc9e_prod_lang_scss = __webpack_require__("3558");

// CONCATENATED MODULE: ./src/components/framework/ListItemInfo.vue






/* normalize component */

var ListItemInfo_component = Object(componentNormalizer["a" /* default */])(
  framework_ListItemInfovue_type_script_lang_js,
  ListItemInfovue_type_template_id_3aebcc9e_render,
  ListItemInfovue_type_template_id_3aebcc9e_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ListItemInfo = (ListItemInfo_component.exports);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("fb6a");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"862f505e-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/frameworks/FilterAndSort.vue?vue&type=template&id=e134a7f8


var FilterAndSortvue_type_template_id_e134a7f8_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "cass--right-aside--content"
  }, [_c('div', {
    staticClass: "section"
  }, [_c('h3', {
    staticClass: "title is-size-4"
  }, [_vm._v(" Filter and Sort ")]), _c('div', {
    staticClass: "filter-sort-section"
  }, [_c('h3', {
    staticClass: "filter-sort-header"
  }, [_vm._v(" Sort by ")]), _vm._l(_vm.sortResults, function (option) {
    return _c('div', {
      key: option,
      staticClass: "field"
    }, [option.enabled ? [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.sortBy,
        expression: "sortBy"
      }],
      staticClass: "is-checkradio",
      attrs: {
        "disabled": _vm.isFirstSearchProcessing,
        "id": option.id,
        "type": "radio",
        "name": "sortResults"
      },
      domProps: {
        "value": {
          id: option.id,
          label: option.label
        },
        "checked": _vm._q(_vm.sortBy, {
          id: option.id,
          label: option.label
        })
      },
      on: {
        "change": function change($event) {
          _vm.sortBy = {
            id: option.id,
            label: option.label
          };
        }
      }
    }), _c('label', {
      staticClass: "label",
      attrs: {
        "for": option.id
      }
    }, [_vm._v(_vm._s(option.label))])] : _vm._e()], 2);
  })], 2), _vm.showQuickFilterHeading && !(_vm.$store.getters['editor/conceptMode'] && !_vm.loggedIn) && !(_vm.$store.getters['editor/progressionMode'] && !_vm.loggedIn) ? _c('div', {
    staticClass: "filter-sort-section"
  }, [_c('h3', {
    staticClass: "filter-sort-header"
  }, [_vm._v(" Quick Filters ")]), _vm._l(_vm.quickFilters, function (option) {
    return _c('div', {
      key: option,
      staticClass: "field"
    }, [option.enabled ? [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: option.checked,
        expression: "option.checked"
      }],
      staticClass: "is-checkradio",
      attrs: {
        "disabled": _vm.isFirstSearchProcessing,
        "id": option.id,
        "type": "checkbox",
        "name": option.id
      },
      domProps: {
        "checked": Array.isArray(option.checked) ? _vm._i(option.checked, null) > -1 : option.checked
      },
      on: {
        "change": function change($event) {
          var $$a = option.checked,
            $$el = $event.target,
            $$c = $$el.checked ? true : false;
          if (Array.isArray($$a)) {
            var $$v = null,
              $$i = _vm._i($$a, $$v);
            if ($$el.checked) {
              $$i < 0 && _vm.$set(option, "checked", $$a.concat([$$v]));
            } else {
              $$i > -1 && _vm.$set(option, "checked", $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
            }
          } else {
            _vm.$set(option, "checked", $$c);
          }
        }
      }
    }), _c('label', {
      staticClass: "label",
      attrs: {
        "for": option.id
      }
    }, [_vm._v(_vm._s(option.label))])] : _vm._e()], 2);
  })], 2) : _vm._e(), !_vm.$store.getters['editor/conceptMode'] && !_vm.$store.getters['editor/progressionMode'] ? _c('div', {
    staticClass: "filter-sort-section"
  }, [_c('h3', {
    staticClass: "filter-sort-header"
  }, [_vm._v(" Apply search term to ")]), _vm._l(_vm.applySearchTo, function (option) {
    return _c('div', {
      key: option,
      staticClass: "field"
    }, [option.enabled ? [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: option.checked,
        expression: "option.checked"
      }],
      staticClass: "is-checkradio",
      attrs: {
        "disabled": _vm.isFirstSearchProcessing,
        "id": option.id,
        "type": "checkbox",
        "name": option.id
      },
      domProps: {
        "checked": Array.isArray(option.checked) ? _vm._i(option.checked, null) > -1 : option.checked
      },
      on: {
        "change": function change($event) {
          var $$a = option.checked,
            $$el = $event.target,
            $$c = $$el.checked ? true : false;
          if (Array.isArray($$a)) {
            var $$v = null,
              $$i = _vm._i($$a, $$v);
            if ($$el.checked) {
              $$i < 0 && _vm.$set(option, "checked", $$a.concat([$$v]));
            } else {
              $$i > -1 && _vm.$set(option, "checked", $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
            }
          } else {
            _vm.$set(option, "checked", $$c);
          }
        }
      }
    }), _c('label', {
      staticClass: "label",
      attrs: {
        "for": option.id
      }
    }, [_vm._v(_vm._s(option.label))])] : _vm._e()], 2);
  })], 2) : _vm._e()])]);
};
var FilterAndSortvue_type_template_id_e134a7f8_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/frameworks/FilterAndSort.vue?vue&type=template&id=e134a7f8

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.trim.js
var es_string_trim = __webpack_require__("498a");

// EXTERNAL MODULE: ./src/mixins/ctdlasnProfile.js
var ctdlasnProfile = __webpack_require__("f188");

// EXTERNAL MODULE: ./src/mixins/tlaProfile.js
var tlaProfile = __webpack_require__("d6b4");

// EXTERNAL MODULE: ./src/mixins/cassUtil.js
var cassUtil = __webpack_require__("6d79");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/frameworks/FilterAndSort.vue?vue&type=script&lang=js













/* harmony default export */ var FilterAndSortvue_type_script_lang_js = ({
  name: 'FilterAndSort',
  data: function data() {
    return {
      sortResults: [{
        id: 'alphabetical',
        label: 'alphabetical',
        enabled: true
      }, {
        id: 'dateCreated',
        label: 'created date',
        enabled: true
      }, {
        id: 'lastEdited',
        label: 'last modified',
        enabled: true
      }],
      quickFilters: [{
        id: 'configMatchDefault',
        checked: false,
        label: 'Configuration matches default',
        enabled: true
      }, {
        id: 'ownedByMe',
        checked: false,
        label: 'Owned by me',
        enabled: true
      }, {
        id: 'notOwnedByMe',
        checked: false,
        label: 'Not owned by me',
        enabled: true
      }],
      frameworkPropertiesApplySearchTo: [],
      competencyPropertiesApplySearchTo: [],
      otherPropertiesApplySearchTo: [],
      showQuickFilterHeading: true,
      frameworkConfig: null,
      configPropertiesToIgnore: ["@id", "headings", "primaryProperties", "secondaryProperties", "tertiaryProperties", "ctid"],
      searchTermsFromRawSchemata: {}
    };
  },
  mixins: [ctdlasnProfile["a" /* default */], tlaProfile["a" /* default */], cassUtil["a" /* cassUtil */]],
  computed: {
    sortBy: {
      get: function get() {
        return this.$store.getters['app/sortResults'];
      },
      set: function set(val) {
        this.$store.commit('app/sortResults', val);
      }
    },
    loggedIn: function loggedIn() {
      return EcIdentityManager.default.ids && EcIdentityManager.default.ids.length;
    },
    searchByOwnerNameEnabled: function searchByOwnerNameEnabled() {
      return this.$store.state.featuresEnabled.searchByOwnerNameEnabled;
    },
    initialOwnedByMe: function initialOwnedByMe() {
      return this.$store.state.featuresEnabled.ownedByMe;
    },
    configurationsEnabled: function configurationsEnabled() {
      return this.$store.state.featuresEnabled.configurationsEnabled;
    },
    queryParams: function queryParams() {
      return this.$store.getters['editor/queryParams'];
    },
    applySearchTo: function applySearchTo() {
      return this.frameworkPropertiesApplySearchTo.concat(this.competencyPropertiesApplySearchTo).concat(this.otherPropertiesApplySearchTo);
    },
    conceptMode: function conceptMode() {
      return this.$store.getters['editor/conceptMode'];
    },
    progressionMode: function progressionMode() {
      return this.$store.getters['editor/progressionMode'];
    },
    isFirstSearchProcessing: function isFirstSearchProcessing() {
      return this.$store.getters['editor/firstSearchProcessing'];
    }
  },
  mounted: function mounted() {
    if (!this.conceptMode && !this.progressionMode) {
      this.setSearchTermsFromRawSchemata();
      this.getFrameworkConfig();
      this.setOtherPropertiesApplySearchTo();
      this.setCompetencyPropertiesApplySearchTo();
    }
    if (!this.loggedIn) {
      for (var i = 0; i < this.quickFilters.length; i++) {
        if (this.quickFilters[i].id !== "configMatchDefault") {
          this.quickFilters[i].enabled = false;
        }
      }
    }
    if (this.loggedIn && this.initialOwnedByMe) {
      for (var i = 0; i < this.quickFilters.length; i++) {
        if (this.quickFilters[i].id === "ownedByMe") {
          this.quickFilters[i].checked = true;
        }
      }
    }
    if (this.conceptMode || this.progressionMode || !this.configurationsEnabled) {
      for (var i = 0; i < this.quickFilters.length; i++) {
        if (this.quickFilters[i].id === "configMatchDefault") {
          this.quickFilters[i].enabled = false;
        }
      }
    }
    var showFilters = false;
    for (var i = 0; i < this.quickFilters.length; i++) {
      if (this.quickFilters[i].enabled === true) {
        showFilters = true;
      }
    }
    this.showQuickFilterHeading = showFilters;
  },
  watch: {
    applySearchTo: {
      handler: function handler() {
        this.$store.commit('app/applySearchTo', this.applySearchTo);
      },
      deep: true
    },
    quickFilters: {
      handler: function handler() {
        appLog('watched');
        this.$store.commit('app/quickFilters', this.quickFilters);
      },
      deep: true
    },
    frameworkConfig: function frameworkConfig() {
      if (this.frameworkConfig) {
        this.setFrameworkPropertiesApplySearchTo();
      }
    }
  },
  methods: {
    getFrameworkConfig: function () {
      var _getFrameworkConfig = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee() {
        var c, me;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!(this.queryParams.ceasnDataFields === "true")) {
                _context.next = 4;
                break;
              }
              this.frameworkConfig = this.ctdlAsnFrameworkProfile;
              _context.next = 17;
              break;
            case 4:
              if (!(this.queryParams.tlaProfile === "true")) {
                _context.next = 8;
                break;
              }
              this.frameworkConfig = this.tlaFrameworkProfile;
              _context.next = 17;
              break;
            case 8:
              if (!(this.getDefaultBrowserConfigId() && !this.getDefaultBrowserConfigId().trim().equals(''))) {
                _context.next = 15;
                break;
              }
              _context.next = 11;
              return EcRepository.get(this.getDefaultBrowserConfigId());
            case 11:
              c = _context.sent;
              this.frameworkConfig = c.frameworkConfig;
              _context.next = 17;
              break;
            case 15:
              me = this;
              window.repo.searchWithParams("@type:Configuration", {
                'size': 10000
              }, null, function (ca) {
                var found = false;
                var _iterator = Object(createForOfIteratorHelper["a" /* default */])(ca),
                  _step;
                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    var _c = _step.value;
                    if (_c.isDefault === "true" || _c.isDefault === true) {
                      me.frameworkConfig = _c.frameworkConfig;
                      found = true;
                      break;
                    }
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
                if (!found) {
                  me.setDefaultFrameworkSearchTerms();
                }
              }, function () {
                me.setDefaultFrameworkSearchTerms();
              });
            case 17:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function getFrameworkConfig() {
        return _getFrameworkConfig.apply(this, arguments);
      }
      return getFrameworkConfig;
    }(),
    setFrameworkPropertiesApplySearchTo: function setFrameworkPropertiesApplySearchTo() {
      var keys = EcObject.keys(this.frameworkConfig);
      var properties = [];
      var _iterator2 = Object(createForOfIteratorHelper["a" /* default */])(keys),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var prop = _step2.value;
          if (EcArray.has(this.configPropertiesToIgnore, prop)) {
            continue;
          }
          if (this.frameworkConfig[prop]["http://schema.org/rangeIncludes"][0]["@id"] !== "http://www.w3.org/2000/01/rdf-schema#langString" && this.frameworkConfig[prop]["http://schema.org/rangeIncludes"][0]["@id"] !== "http://schema.org/Text") {
            continue;
          }
          var label = this.frameworkConfig[prop]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
          var id = "";
          if (prop === "http://schema.org/name") {
            id = "frameworkName";
          } else if (prop === "http://schema.org/description") {
            id = "frameworkDescription";
          } else {
            id = this.getSearchTermForProperty(prop);
          }
          properties.push({
            id: id,
            checked: false,
            label: label,
            enabled: true
          });
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      this.frameworkPropertiesApplySearchTo = properties;
    },
    setSearchTermsFromRawSchemata: function setSearchTermsFromRawSchemata() {
      // Used to figure out prefixes to use when searching from the full property URL in the configuration
      var context = this.$store.state.lode.rawSchemata["https://schema.cassproject.org/0.4"]["@context"];
      var keys = EcObject.keys(context);
      var _iterator3 = Object(createForOfIteratorHelper["a" /* default */])(keys),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var key = _step3.value;
          if (EcObject.isObject(context[key])) {
            continue;
          }
          this.searchTermsFromRawSchemata[context[key]] = key;
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    },
    getSearchTermForProperty: function getSearchTermForProperty(prop) {
      var keys = EcObject.keys(this.searchTermsFromRawSchemata);
      var shortProp;
      var _iterator4 = Object(createForOfIteratorHelper["a" /* default */])(keys),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var key = _step4.value;
          if (prop.indexOf(key) !== -1) {
            if (key === "https://schema.cassproject.org/0.4/") {
              shortProp = prop.replace(key, "");
            } else {
              shortProp = prop.replace(key, this.searchTermsFromRawSchemata[key] + "\\:");
            }
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      return shortProp;
    },
    setDefaultFrameworkSearchTerms: function setDefaultFrameworkSearchTerms() {
      this.frameworkPropertiesApplySearchTo = [{
        id: 'frameworkName',
        checked: false,
        label: 'Framework name',
        enabled: true
      }, {
        id: 'frameworkDescription',
        checked: false,
        label: 'Framework description',
        enabled: true
      }];
    },
    setOtherPropertiesApplySearchTo: function setOtherPropertiesApplySearchTo() {
      this.otherPropertiesApplySearchTo = [{
        id: 'directoryName',
        checked: false,
        label: 'Directory name',
        enabled: true
      }, {
        id: 'directoryDescription',
        checked: false,
        label: 'Directory description',
        enabled: true
      }];
      if (this.searchByOwnerNameEnabled) {
        this.otherPropertiesApplySearchTo.push({
          id: 'ownerName',
          checked: false,
          label: 'Owner name',
          enabled: true
        });
      }
    },
    setCompetencyPropertiesApplySearchTo: function setCompetencyPropertiesApplySearchTo() {
      if (this.queryParams.ceasnDataFields === 'true') {
        this.competencyPropertiesApplySearchTo = [{
          id: 'competencyLabel',
          checked: false,
          label: 'Competency label',
          enabled: true
        }, {
          id: 'competencyName',
          checked: false,
          label: 'Competency text',
          enabled: true
        }, {
          id: 'competencyDescription',
          checked: false,
          label: 'Competency comment',
          enabled: true
        }];
      } else {
        this.competencyPropertiesApplySearchTo = [{
          id: 'competencyName',
          checked: false,
          label: 'Competency name',
          enabled: true
        }, {
          id: 'competencyDescription',
          checked: false,
          label: 'Competency description',
          enabled: true
        }];
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/frameworks/FilterAndSort.vue?vue&type=script&lang=js
 /* harmony default export */ var frameworks_FilterAndSortvue_type_script_lang_js = (FilterAndSortvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/frameworks/FilterAndSort.vue?vue&type=style&index=0&id=e134a7f8&prod&lang=scss
var FilterAndSortvue_type_style_index_0_id_e134a7f8_prod_lang_scss = __webpack_require__("3109");

// CONCATENATED MODULE: ./src/components/frameworks/FilterAndSort.vue






/* normalize component */

var FilterAndSort_component = Object(componentNormalizer["a" /* default */])(
  frameworks_FilterAndSortvue_type_script_lang_js,
  FilterAndSortvue_type_template_id_e134a7f8_render,
  FilterAndSortvue_type_template_id_e134a7f8_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FilterAndSort = (FilterAndSort_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/framework/RightAside.vue?vue&type=script&lang=js




/* harmony default export */ var RightAsidevue_type_script_lang_js = ({
  name: 'RightAside',
  props: {},
  data: function data() {
    return {
      isCommenter: true,
      isAdmin: false,
      isViewer: true
    };
  },
  components: {
    Comments: Comments,
    Versions: Versions,
    FilterAndSort: FilterAndSort,
    ListItemInfo: ListItemInfo
  },
  computed: {
    showRightAside: function showRightAside() {
      return this.$store.getters['app/showRightAside'];
    },
    rightAsideContent: function rightAsideContent() {
      return this.$store.getters['app/rightAsideContent'];
    }
  }
});
// CONCATENATED MODULE: ./src/components/framework/RightAside.vue?vue&type=script&lang=js
 /* harmony default export */ var framework_RightAsidevue_type_script_lang_js = (RightAsidevue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/framework/RightAside.vue?vue&type=style&index=0&id=10c69596&prod&lang=scss&scoped=true
var RightAsidevue_type_style_index_0_id_10c69596_prod_lang_scss_scoped_true = __webpack_require__("3486");

// CONCATENATED MODULE: ./src/components/framework/RightAside.vue






/* normalize component */

var RightAside_component = Object(componentNormalizer["a" /* default */])(
  framework_RightAsidevue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  "10c69596",
  null
  
)

/* harmony default export */ var RightAside = __webpack_exports__["default"] = (RightAside_component.exports);

/***/ }),

/***/ "fb6a7":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "fc26":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "ffd6":
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__("3729"),
    isObjectLike = __webpack_require__("1310");

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ })

}]);
//# sourceMappingURL=concepts.d0096258.js.map