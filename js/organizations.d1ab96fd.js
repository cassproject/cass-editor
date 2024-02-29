(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["organizations","chunk-2d0dab46","chunk-2d0dab46"],{

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

/***/ "0b0e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Breadcrumbs_vue_vue_type_style_index_0_id_1f527954_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("58dc3");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Breadcrumbs_vue_vue_type_style_index_0_id_1f527954_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Breadcrumbs_vue_vue_type_style_index_0_id_1f527954_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


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

/***/ "30d6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1abfecd1-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/lode/components/Breadcrumbs.vue?vue&type=template&id=1f527954
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('nav', {
    staticClass: "breadcrumb is-small is-black",
    attrs: {
      "aria-label": "breadcrumbs"
    }
  }, _vm._l(_vm.breadCrumbInfo, function (framework) {
    return _c('ul', {
      key: framework.id
    }, [_vm._l(_vm.directoryBreadCrumbInfo[framework.id], function (each) {
      return _c('li', {
        key: each
      }, [_c('a', {
        attrs: {
          "title": each.title
        }
      }, [_vm._v(" " + _vm._s(each.shortName))])]);
    }), _c('li', [_c('a', {
      staticClass: "has-text-dark",
      attrs: {
        "title": framework.title
      }
    }, [_vm._v(" " + _vm._s(framework.shortName) + " ")])]), _vm._l(_vm.parentBreadCrumbInfo[framework.id], function (each) {
      return _c('li', {
        key: each
      }, [_c('a', {
        staticClass: "has-text-dark",
        attrs: {
          "title": each.title
        }
      }, [_vm._v(" " + _vm._s(each.shortName))])]);
    }), _vm._l(_vm.parentConcepts, function (each) {
      return _c('li', {
        key: each
      }, [_c('a', {
        staticClass: "has-text-dark"
      }, [_vm._v(" " + _vm._s(_vm.getName(each)))])]);
    })], 2);
  }), 0);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/lode/components/Breadcrumbs.vue?vue&type=template&id=1f527954

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
var regeneratorRuntime = __webpack_require__("c7eb");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.search.js
var es_string_search = __webpack_require__("841c");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/lode/components/Breadcrumbs.vue?vue&type=script&lang=js






/* harmony default export */ var Breadcrumbsvue_type_script_lang_js = ({
  name: 'Breadcrumbs',
  props: {
    competency: Object
  },
  data: function data() {
    return {
      repo: window.repo,
      frameworks: [],
      parentCompetencies: {},
      parentConcepts: [],
      frameworkGraph: new EcFrameworkGraph(),
      directoryTrail: {}
    };
  },
  computed: {
    parentBreadCrumbInfo: function parentBreadCrumbInfo() {
      if (this.parentCompetencies === {}) {
        return;
      }
      var info = this.parentCompetencies;
      var newInfo = {};
      for (var property in info) {
        var item = info[property];
        newInfo[property] = [];
        for (var i = 0; i < item.length; i++) {
          if (item[i]) {
            newInfo[property][i] = {};
            var name = '';
            var shortName = '';
            var title = '';
            if (item[i] === '...') {
              name = item[i];
              title = "This framework contains more than 500 competencies";
              shortName = item[i];
            } else if (i < item.length - 1) {
              name = "...";
              title = this.getName(item[i]);
              shortName = "...";
            } else {
              name = this.getName(item[i]);
              if (name.length > 29) {
                shortName = name.substr(0, 29);
              } else {
                shortName = name;
              }
              title = name;
            }
            var crumb = {
              name: name,
              shortName: shortName,
              title: title
            };
            newInfo[property][i] = crumb;
          }
        }
      }
      return newInfo;
    },
    directoryBreadCrumbInfo: function directoryBreadCrumbInfo() {
      if (this.directoryTrail === {}) {
        return;
      }
      var info = this.directoryTrail;
      var newInfo = {};
      for (var property in info) {
        var item = info[property];
        newInfo[property] = [];
        for (var i = 0; i < item.length; i++) {
          if (item[i]) {
            newInfo[property][i] = {};
            var name = '';
            var shortName = '';
            var title = '';
            if (i !== 0 && i < item.length - 1) {
              name = "...";
              title = this.getName(item[i]);
              shortName = "...";
            } else {
              name = this.getName(item[i]);
              if (name.length > 29) {
                shortName = name.substr(0, 29);
              } else {
                shortName = name;
              }
              title = name;
            }
            var crumb = {
              name: name,
              shortName: shortName,
              title: title
            };
            newInfo[property][i] = crumb;
          }
        }
      }
      return newInfo;
    },
    breadCrumbInfo: function breadCrumbInfo() {
      var info = [];
      var me = this;
      for (var i = 0; i < me.frameworks.length; i++) {
        info.push({});
        var name = me.getName(me.frameworks[i]);
        var title = void 0;
        if (name !== '...') {
          title = name;
        }
        info[i].name = name;
        if (name.length > 29) {
          info[i].shortName = name.substr(0, 29) + '...';
        } else {
          info[i].shortName = name;
        }
        info[i].title = title;
        info[i].id = me.frameworks[i].id;
      }
      return info;
    }
  },
  created: function created() {
    if (this.competency.type === "Competency") {
      this.searchFrameworks();
    } else if (this.competency.type === "Directory") {
      this.findDirectoryTrail(this.competency);
    } else if (this.competency.type === "Framework") {
      this.findFrameworkTrail(this.competency);
    } else {
      this.findConceptTrail(this.competency);
    }
  },
  methods: {
    searchFrameworks: function searchFrameworks() {
      var me = this;
      EcFramework.search(this.repo, "competency:\"" + this.competency.shortId() + "\"", function (success) {
        for (var i = 0; i < success.length; i++) {
          me.frameworks.push(success[i]);
          if (success[i].directory) {
            me.findFrameworkTrailForCompetency(success[i]);
          }
        }
        me.computeParentCompetencies();
      }, function (failure) {
        appError(failure);
        me.frameworks = [];
      }, null);
    },
    computeParentCompetencies: function computeParentCompetencies() {
      var _this = this;
      var me = this;
      var _loop = function _loop() {
        var frameworkId = _this.frameworks[i].id;
        _this.$set(_this.parentCompetencies, frameworkId, []);
        if (_this.frameworks[i].competency && _this.frameworks[i].competency.length > 500) {
          me.parentCompetencies[frameworkId].push("...");
        } else {
          _this.frameworkGraph.addFramework(_this.frameworks[i], _this.repo, function (success) {
            var parents = [];
            me.getParents(me.competency.id, parents, function () {
              for (var j = 0; j < parents.length; j++) {
                me.parentCompetencies[frameworkId].push(parents[j]);
              }
            });
          }, function (failure) {
            appError(failure);
          });
        }
      };
      for (var i = 0; i < this.frameworks.length; i++) {
        _loop();
      }
    },
    getParents: function getParents(competencyId, parents, callback) {
      var foundAParent = false;
      var me = this;
      for (var i = 0; i < me.frameworkGraph.edges.length; i++) {
        if (me.frameworkGraph.edges[i].source.id === competencyId && me.frameworkGraph.edges[i].edge.relationType === "narrows") {
          var parentId = me.frameworkGraph.edges[i].destination.id;
          parents.unshift(me.frameworkGraph.competencyMap[parentId]);
          foundAParent = true;
          this.getParents(parentId, parents, callback);
          break;
        }
      }
      if (!foundAParent) {
        callback();
      }
    },
    findConceptTrail: function () {
      var _findConceptTrail = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee(concept) {
        var scheme, parent;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!concept["skos:topConceptOf"]) {
                _context.next = 7;
                break;
              }
              _context.next = 3;
              return EcConceptScheme.get(concept["skos:topConceptOf"]);
            case 3:
              scheme = _context.sent;
              if (scheme) {
                this.frameworks.push(scheme);
              }
              _context.next = 19;
              break;
            case 7:
              if (!concept["skos:broader"]) {
                _context.next = 19;
                break;
              }
              if (!EcArray.isArray(concept["skos:broader"])) {
                _context.next = 14;
                break;
              }
              _context.next = 11;
              return EcConcept.get(concept["skos:broader"][0]);
            case 11:
              parent = _context.sent;
              _context.next = 17;
              break;
            case 14:
              _context.next = 16;
              return EcConcept.get(concept["skos:broader"]);
            case 16:
              parent = _context.sent;
            case 17:
              this.parentConcepts.unshift(parent);
              this.findConceptTrail(parent);
            case 19:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function findConceptTrail(_x) {
        return _findConceptTrail.apply(this, arguments);
      }
      return findConceptTrail;
    }(),
    findDirectoryTrail: function findDirectoryTrail(directory) {
      var me = this;
      if (directory.parentDirectory) {
        EcDirectory.get(directory.parentDirectory, function (parent) {
          if (parent && !parent.parentDirectory) {
            me.frameworks.push(parent);
          } else if (parent) {
            me.parentConcepts.unshift(parent);
            me.findDirectoryTrail(parent);
          }
        }, appError);
      }
    },
    findFrameworkTrail: function findFrameworkTrail(framework) {
      var me = this;
      if (framework.directory) {
        EcDirectory.get(framework.directory, function (parent) {
          if (parent && !parent.parentDirectory) {
            me.frameworks.push(parent);
          } else if (parent) {
            me.parentConcepts.unshift(parent);
            me.findDirectoryTrail(parent);
          }
        }, appError);
      }
    },
    findFrameworkTrailForCompetency: function findFrameworkTrailForCompetency(framework) {
      var me = this;
      if (framework.directory) {
        EcDirectory.get(framework.directory, function (parent) {
          if (parent) {
            me.directoryTrail[framework.id] = [];
            me.directoryTrail[framework.id].push(parent);
            if (parent.parentDirectory) {
              me.findDirectoryTrailForCompetency(parent, framework.id);
            }
          }
        }, appError);
      }
    },
    findDirectoryTrailForCompetency: function findDirectoryTrailForCompetency(directory, frameworkId) {
      var me = this;
      if (directory.parentDirectory) {
        EcDirectory.get(directory.parentDirectory, function (parent) {
          if (parent) {
            me.directoryTrail[frameworkId].unshift(parent);
            if (parent.parentDirectory) {
              me.findDirectoryTrailForCompetency(parent, frameworkId);
            }
          }
        }, appError);
      }
    },
    getName: function getName(object) {
      if (object === "...") {
        return object;
      }
      if (this.competency.type === "Competency" || this.competency.type === "Level" || this.competency.type === "Framework") {
        return object.getName();
      }
      if (this.competency.type === "Directory") {
        return schema.Thing.getDisplayStringFrom(object.name);
      }
      if (object["skos:prefLabel"]) {
        return schema.Thing.getDisplayStringFrom(object["skos:prefLabel"]);
      } else if (object["dcterms:title"]) {
        return schema.Thing.getDisplayStringFrom(object["dcterms:title"]);
      }
    }
  }
});
// CONCATENATED MODULE: ./src/lode/components/Breadcrumbs.vue?vue&type=script&lang=js
 /* harmony default export */ var components_Breadcrumbsvue_type_script_lang_js = (Breadcrumbsvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/lode/components/Breadcrumbs.vue?vue&type=style&index=0&id=1f527954&prod&lang=scss
var Breadcrumbsvue_type_style_index_0_id_1f527954_prod_lang_scss = __webpack_require__("0b0e");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/lode/components/Breadcrumbs.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_Breadcrumbsvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Breadcrumbs = __webpack_exports__["a"] = (component.exports);

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

/***/ "3947":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

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

/***/ "4f42":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1abfecd1-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/organization/Organizations.vue?vue&type=template&id=4d8e40e1&scoped=true
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "organizations"
  }, [_c('div', [_vm.$store.getters['editor/conceptMode'] || _vm.$store.getters['editor/progressionMode'] ? _c('span', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.sortBy,
      expression: "sortBy"
    }],
    attrs: {
      "type": "radio",
      "value": "dcterms:title.keyword",
      "id": "dcterms:title.keyword"
    },
    domProps: {
      "checked": _vm._q(_vm.sortBy, "dcterms:title.keyword")
    },
    on: {
      "change": function change($event) {
        _vm.sortBy = "dcterms:title.keyword";
      }
    }
  }), _c('label', {
    attrs: {
      "for": "dcterms:title.keyword"
    }
  }, [_vm._v("Sort alphabetically")])]) : _c('span', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.sortBy,
      expression: "sortBy"
    }],
    attrs: {
      "type": "radio",
      "value": "name.keyword",
      "id": "name.keyword"
    },
    domProps: {
      "checked": _vm._q(_vm.sortBy, "name.keyword")
    },
    on: {
      "change": function change($event) {
        _vm.sortBy = "name.keyword";
      }
    }
  }), _c('label', {
    attrs: {
      "for": "name.keyword"
    }
  }, [_vm._v("Sort alphabetically")])]), _c('span', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.sortBy,
      expression: "sortBy"
    }],
    attrs: {
      "type": "radio",
      "value": "schema:dateModified",
      "id": "schema:dateModified"
    },
    domProps: {
      "checked": _vm._q(_vm.sortBy, "schema:dateModified")
    },
    on: {
      "change": function change($event) {
        _vm.sortBy = "schema:dateModified";
      }
    }
  }), _c('label', {
    attrs: {
      "for": "schema:dateModified"
    }
  }, [_vm._v("Sort by last modified")])])]), _c('List', {
    attrs: {
      "type": "Organization",
      "repo": _vm.repo,
      "click": _vm.organizationClick,
      "searchOptions": _vm.searchOptions,
      "paramObj": _vm.paramObj
    },
    scopedSlots: _vm._u([{
      key: "organizationTags",
      fn: function fn(slotProps) {
        return [slotProps.item['schema:dateCreated'] ? _c('span', {
          attrs: {
            "title": new Date(slotProps.item['schema:dateCreated'])
          }
        }, [_vm._v(" Created " + _vm._s(_vm.$moment(slotProps.item['schema:dateCreated']).fromNow()) + " ")]) : _vm._e(), slotProps.item.getTimestamp() ? _c('span', {
          attrs: {
            "title": new Date(slotProps.item.getTimestamp())
          }
        }, [_vm._v(" Last modified " + _vm._s(_vm.$moment(slotProps.item.getTimestamp()).fromNow()) + " ")]) : slotProps.item['schema:dateModified'] ? _c('span', {
          attrs: {
            "title": new Date(slotProps.item['schema:dateModified'])
          }
        }, [_vm._v(" Last modified " + _vm._s(_vm.$moment(slotProps.item['schema:dateModified']).fromNow()) + " ")]) : _vm._e()];
      }
    }])
  })], 1);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/views/organization/Organizations.vue?vue&type=template&id=4d8e40e1&scoped=true

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./src/lode/components/List.vue + 4 modules
var List = __webpack_require__("713e");

// EXTERNAL MODULE: ./src/mixins/common.js
var common = __webpack_require__("872c");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/organization/Organizations.vue?vue&type=script&lang=js





/* harmony default export */ var Organizationsvue_type_script_lang_js = ({
  name: "Organizations",
  mixins: [common["a" /* default */]],
  data: function data() {
    return {
      repo: window.repo,
      sortBy: "name.keyword"
    };
  },
  computed: {
    queryParams: function queryParams() {
      return this.$store.getters['editor/queryParams'];
    },
    searchOptions: function searchOptions() {
      var search = "";
      if (this.queryParams && this.queryParams.filter != null) {
        search += " AND (" + this.queryParams.filter + ")";
      }
      if (this.queryParams && this.queryParams.show === "mine") {
        search += " AND (";
        for (var i = 0; i < EcIdentityManager.default.ids.length; i++) {
          if (i !== 0) {
            search += " OR ";
          }
          var id = EcIdentityManager.default.ids[i];
          search += "\\*owner:\"" + id.ppk.toPk().toPem() + "\"";
          search += " OR \\*owner:\"" + addNewlinesToId(id.ppk.toPk().toPem()) + "\"";
        }
        search += ")";
      }
      return search;
    },
    paramObj: function paramObj() {
      var obj = {};
      obj.size = 20;
      var order = this.sortBy === "name.keyword" ? "asc" : "desc";
      var type = this.sortBy === "name.keyword" || this.sortBy === "dcterms:title.keyword" ? "text" : "date";
      obj.sort = '[ { "' + this.sortBy + '": {"order" : "' + order + '" , "unmapped_type" : "' + type + '",  "missing" : "_last"}} ]';
      if (this.filterByOwnedByMe) {
        obj.ownership = 'me';
      }
      return obj;
    },
    filterByOwnedByMe: function filterByOwnedByMe() {
      return this.$store.getters['app/filterByOwnedByMe'];
    }
  },
  components: {
    List: List["a" /* default */]
  },
  methods: {
    organizationClick: function organizationClick(organization) {
      var me = this;
      EcOrganization.get(organization.id, function (success) {
        me.$store.commit('editor/organization', success);
        me.$router.push({
          name: "organization",
          params: {
            organizationId: organization.id
          }
        });
      }, appError);
    },
    getName: function getName(field) {
      var name = EcArray.isArray(field) ? field : [field];
      if (schema.Thing.getDisplayStringFrom(name).toLowerCase().indexOf("http") !== -1) {
        return this.resolveNameFromUrl(schema.Thing.getDisplayStringFrom(name));
      } else {
        return schema.Thing.getDisplayStringFrom(name);
      }
    }
  }
});
// CONCATENATED MODULE: ./src/views/organization/Organizations.vue?vue&type=script&lang=js
 /* harmony default export */ var organization_Organizationsvue_type_script_lang_js = (Organizationsvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/views/organization/Organizations.vue?vue&type=style&index=0&id=4d8e40e1&prod&lang=scss&scoped=true
var Organizationsvue_type_style_index_0_id_4d8e40e1_prod_lang_scss_scoped_true = __webpack_require__("8d2f");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/views/organization/Organizations.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  organization_Organizationsvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  "4d8e40e1",
  null
  
)

/* harmony default export */ var Organizations = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "585a":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "58dc3":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "6d79":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cassUtil; });
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ac1f");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("841c");
/* harmony import */ var core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("d3b7");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("25f0");
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("caad");
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("2532");
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("14d9");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("c7eb");
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("b85c");
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("1da1");

















var cassUtil = {
  name: 'cassUtil',
  data: function data() {
    return {};
  },
  methods: {
    getOrganizationByEcPk: function getOrganizationByEcPk(ecPk, successCallback, failureCallback) {
      var ecPkPem = ecPk.toPem();
      var paramObj = {};
      paramObj.size = 10000;
      EcOrganization.search(window.repo, '', /*#__PURE__*/function () {
        var _ref = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])().mark(function _callee(ecoa) {
          var _iterator, _step, o, groupPpkSet, _iterator2, _step2, gPpk;
          return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _iterator = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(ecoa);
                _context.prev = 1;
                _iterator.s();
              case 3:
                if ((_step = _iterator.n()).done) {
                  _context.next = 34;
                  break;
                }
                o = _step.value;
                _context.prev = 5;
                _context.next = 8;
                return o.getOrgKeys();
              case 8:
                groupPpkSet = _context.sent;
                _iterator2 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(groupPpkSet);
                _context.prev = 10;
                _iterator2.s();
              case 12:
                if ((_step2 = _iterator2.n()).done) {
                  _context.next = 19;
                  break;
                }
                gPpk = _step2.value;
                if (!(gPpk && gPpk.toPk().toPem().equals(ecPkPem))) {
                  _context.next = 17;
                  break;
                }
                successCallback(o);
                return _context.abrupt("return");
              case 17:
                _context.next = 12;
                break;
              case 19:
                _context.next = 24;
                break;
              case 21:
                _context.prev = 21;
                _context.t0 = _context["catch"](10);
                _iterator2.e(_context.t0);
              case 24:
                _context.prev = 24;
                _iterator2.f();
                return _context.finish(24);
              case 27:
                _context.next = 32;
                break;
              case 29:
                _context.prev = 29;
                _context.t1 = _context["catch"](5);
                // TODO Problem with EcOrganization update and creating encrypted value when only a reader...
                // Anticipated workaround....login as group owner and save it.
                // console.error("TODO...fix this...needs FRITZ input!!!!: " + e.toString());
                failureCallback(_context.t1.toString());
              case 32:
                _context.next = 3;
                break;
              case 34:
                _context.next = 39;
                break;
              case 36:
                _context.prev = 36;
                _context.t2 = _context["catch"](1);
                _iterator.e(_context.t2);
              case 39:
                _context.prev = 39;
                _iterator.f();
                return _context.finish(39);
              case 42:
                successCallback(null);
              case 43:
              case "end":
                return _context.stop();
            }
          }, _callee, null, [[1, 36, 39, 42], [5, 29], [10, 21, 24, 27]]);
        }));
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }(), function (err) {
        failureCallback(err);
      }, paramObj);
    },
    getOrganizationEcPk: function getOrganizationEcPk(orgObj) {
      return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])().mark(function _callee2() {
        return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return orgObj.getCurrentOrgKey();
            case 3:
              return _context2.abrupt("return", _context2.sent.toPk());
            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", null);
            case 9:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 6]]);
      }))();
    },
    getPersonEcPk: function getPersonEcPk(personObj) {
      var personFingerprint = this.generateProbablePersonFingerprintFromShortId(personObj.shortId());
      if (personObj.owner) {
        var _iterator3 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(personObj.owner),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var pkPem = _step3.value;
            var ecPk = EcPk.fromPem(pkPem);
            if (personFingerprint.equals(ecPk.fingerprint())) return ecPk;
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
      return null;
    },
    addAllOwnersFromObjectToObject: function addAllOwnersFromObjectToObject(fromObj, toObj) {
      if (fromObj && fromObj.owner) {
        var _iterator4 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(fromObj.owner),
          _step4;
        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var pkPem = _step4.value;
            var ecPk = EcPk.fromPem(pkPem);
            toObj.addOwner(ecPk);
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      }
    },
    setDefaultBrowserConfigId: function setDefaultBrowserConfigId(configId) {
      localStorage.setItem("cassAuthoringToolDefaultBrowserConfigId", configId);
    },
    removeDefaultBrowserConfig: function removeDefaultBrowserConfig() {
      localStorage.removeItem("cassAuthoringToolDefaultBrowserConfigId");
    },
    getDefaultBrowserConfigId: function getDefaultBrowserConfigId() {
      return localStorage.getItem("cassAuthoringToolDefaultBrowserConfigId");
    },
    getBooleanValue: function getBooleanValue(val) {
      if (typeof val === 'boolean') return val;else if (typeof val === 'string') {
        if (val.equalsIgnoreCase('true')) return true;else return false;
      } else return false;
    },
    addAllIdentityPksAsOwners: function addAllIdentityPksAsOwners(obj) {
      // let isEcrld = (obj instanceOf EcRemoteLinkedData);
      if (EcIdentityManager && EcIdentityManager.default.ids && EcIdentityManager.default.ids.length > 0) {
        for (var i = 0; i < EcIdentityManager.default.ids.length; i++) {
          obj.addOwner(EcIdentityManager.default.ids[i].ppk.toPk());
        }
      }
    },
    isObjectOwnerless: function isObjectOwnerless(obj) {
      if (!obj.owner || obj.owner.length === 0) return true;else return false;
    },
    doesAnyIdentityOwnObject: function doesAnyIdentityOwnObject(obj) {
      if (this.isAdmin()) return true;
      if (obj.canEditAny == null) return true;
      return obj.canEditAny(EcIdentityManager.default.getMyPks());
    },
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
    generateProbablePersonFingerprintFromShortId: function generateProbablePersonFingerprintFromShortId(personShortId) {
      return personShortId.substring(personShortId.lastIndexOf("/") + 1);
    },
    isPersonIdAnObjectOwner: function isPersonIdAnObjectOwner(personShortId, obj) {
      if (!obj.owner || obj.owner.length === 0) return false;
      var personFingerprint = this.generateProbablePersonFingerprintFromShortId(personShortId);
      var _iterator5 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(obj.owner),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var ownerPkPem = _step5.value;
          var ownerFingerprint = EcPk.fromPem(ownerPkPem).fingerprint();
          if (ownerFingerprint.equals(personFingerprint)) return true;
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      return false;
    },
    isPersonIdAnObjectReader: function isPersonIdAnObjectReader(personShortId, obj) {
      if (!obj.reader || obj.reader.length === 0) return false;
      var personFingerprint = this.generateProbablePersonFingerprintFromShortId(personShortId);
      var _iterator6 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(obj.reader),
        _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var readerPkPem = _step6.value;
          var readerFingerprint = EcPk.fromPem(readerPkPem).fingerprint();
          if (readerFingerprint.equals(personFingerprint)) return true;
        }
        // return obj.hasReader(EcPk.fromPem(pkPem));
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
      return false;
    },
    areAnyIdentitiesThisPerson: function areAnyIdentitiesThisPerson(personObj) {
      var personFingerprint = personObj.getFingerprint();
      if (EcIdentityManager && EcIdentityManager.default.ids && EcIdentityManager.default.ids.length > 0) {
        for (var i = 0; i < EcIdentityManager.default.ids.length; i++) {
          if (EcIdentityManager.default.ids[i].ppk.toPk().fingerprint().equals(personFingerprint)) return true;
        }
      }
      return false;
    },
    isPersonalIdentityAnObjectOwner: function isPersonalIdentityAnObjectOwner(obj) {
      if (this.isAdmin()) return true;
      if (!obj.owner || obj.owner.length === 0) return false;
      var personalIdentPkPem = this.getPersonalIdentityPk().toPem();
      return obj.owner.includes(personalIdentPkPem);
    },
    getPersonalIdentityPk: function getPersonalIdentityPk() {
      // assuming that the first identity is the user's personal identity
      if (EcIdentityManager && EcIdentityManager.default.ids && EcIdentityManager.default.ids.length > 0) {
        return EcIdentityManager.default.ids[0].ppk.toPk();
      } else return null;
    },
    buildEcAlignmentsFromRemoteLinkedData: function buildEcAlignmentsFromRemoteLinkedData(ecrlda) {
      var ecaa = [];
      var _iterator7 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(ecrlda),
        _step7;
      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var ecrld = _step7.value;
          var eca = new EcAlignment();
          eca.copyFrom(ecrld);
          ecaa.push(eca);
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
      return ecaa;
    }
  },
  computed: {
    amLoggedIn: function amLoggedIn() {
      if (EcIdentityManager && EcIdentityManager.default.ids && EcIdentityManager.default.ids.length > 0) return true;else return false;
    }
  }
};

/***/ }),

/***/ "8d2f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Organizations_vue_vue_type_style_index_0_id_4d8e40e1_prod_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("3947");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Organizations_vue_vue_type_style_index_0_id_4d8e40e1_prod_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Organizations_vue_vue_type_style_index_0_id_4d8e40e1_prod_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


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
//# sourceMappingURL=organizations.d1ab96fd.js.map