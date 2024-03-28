(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["conceptScheme"],{

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

/***/ "31ee":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ConceptScheme_vue_vue_type_style_index_0_id_50f861ae_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("778f");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ConceptScheme_vue_vue_type_style_index_0_id_50f861ae_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ConceptScheme_vue_vue_type_style_index_0_id_50f861ae_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
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

/***/ "585a":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "5889":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3c28eb14-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/conceptScheme/ConceptScheme.vue?vue&type=template&id=50f861ae
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    attrs: {
      "id": "concept"
    }
  }, [_vm.showRightAside ? _c('RightAside') : _vm._e(), _c('div', {
    staticClass: "framework-content"
  }, [_c('FrameworkEditorToolbar', {
    attrs: {
      "properties": _vm.properties
    },
    on: {
      "change-properties": _vm.changeProperties,
      "show-export-modal": _vm.onOpenExportModal
    }
  }), _c('div', {
    staticClass: "framework-wrapper"
  }, [_c('draggable', _vm._b({
    attrs: {
      "tag": "ul",
      "id": "framework_drag",
      "disabled": _vm.canEdit !== true,
      "group": {
        name: 'test'
      },
      "handle": ".handle"
    },
    model: {
      value: _vm.frameworkDrag,
      callback: function callback($$v) {
        _vm.frameworkDrag = $$v;
      },
      expression: "frameworkDrag"
    }
  }, 'draggable', _vm.dragOptions, false), [_c(_vm.dynamicThingComponent, {
    tag: "Component",
    class: _vm.dynamicThingComponent === 'Thing' ? _vm.parentObjectClass : '',
    attrs: {
      "id": 'scroll-' + _vm.framework.shortId().split('/').pop(),
      "obj": _vm.framework,
      "repo": _vm.repo,
      "view": "concept",
      "newFramework": _vm.newFramework,
      "parentNotEditable": _vm.queryParams.view === 'true',
      "profile": _vm.conceptSchemeProfile,
      "properties": _vm.properties
    },
    on: {
      "edit-node-event": function editNodeEvent($event) {
        return _vm.onEditNode();
      },
      "done-editing-node-event": function doneEditingNodeEvent($event) {
        return _vm.onDoneEditingNode();
      }
    }
  }, [_c('div', {
    staticClass: "lode__framework__info-bar"
  }, [_vm.timestamp ? _c('span', {
    staticClass: "tag is-medium-grey has-text-dark",
    attrs: {
      "title": new Date(_vm.timestamp)
    }
  }, [_vm._v(" Last modified " + _vm._s(_vm.isCeasn ? "(in CaSS)" : "") + " " + _vm._s(_vm.lastModified) + " ")]) : _vm._e(), _vm.framework['schema:dateCreated'] ? _c('span', {
    staticClass: "tag is-medium-grey has-text-dark",
    attrs: {
      "title": new Date(_vm.framework['schema:dateCreated'])
    }
  }, [_vm._v(" Created " + _vm._s(_vm.isCeasn ? "(in CaSS)" : "") + " " + _vm._s(_vm.$moment(_vm.framework['schema:dateCreated']).format("MMM D YYYY")) + " ")]) : _vm._e(), _vm.framework['Approved'] ? _c('span', {
    staticClass: "tag is-medium-grey has-text-dark",
    attrs: {
      "title": _vm.framework['Approved']
    }
  }, [_vm._v(" Approved ")]) : _vm._e(), _vm.framework['Published'] ? _c('span', {
    staticClass: "tag is-medium-grey has-text-dark",
    attrs: {
      "title": _vm.framework['Published']
    }
  }, [_vm._v(" Published ")]) : _vm._e()])])], 1), _c('ConceptHierarchy', {
    attrs: {
      "container": _vm.framework,
      "containerType": "ConceptScheme",
      "containerTypeGet": "EcConceptScheme",
      "viewOnly": _vm.queryParams.view === 'true',
      "repo": _vm.repo,
      "view": "concept",
      "highlightList": _vm.highlightCompetency,
      "profile": _vm.conceptProfile,
      "properties": _vm.properties,
      "doneDragging": _vm.doneDragging
    },
    on: {
      "edit-multiple-event": _vm.onEditMultiple,
      "search-things": function searchThings($event) {
        return _vm.handleSearch($event);
      },
      "select-button-click": _vm.onSelectButtonClick,
      "selected-array": _vm.selectedArrayEvent
    }
  })], 1)], 1), _vm.scrolled ? _c('div', {
    staticClass: "extra-space-for-scroll"
  }) : _vm._e()], 1);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/views/conceptScheme/ConceptScheme.vue?vue&type=template&id=50f861ae

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
var regeneratorRuntime = __webpack_require__("c7eb");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__("3ca3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__("a434");

// EXTERNAL MODULE: ./node_modules/lodash/debounce.js
var debounce = __webpack_require__("b047");
var debounce_default = /*#__PURE__*/__webpack_require__.n(debounce);

// EXTERNAL MODULE: ./src/mixins/common.js
var common = __webpack_require__("872c");

// EXTERNAL MODULE: ./src/mixins/ctdlasnProfile.js
var ctdlasnProfile = __webpack_require__("f188");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/conceptScheme/ConceptScheme.vue?vue&type=script&lang=js










/* harmony default export */ var ConceptSchemevue_type_script_lang_js = ({
  name: "ConceptScheme",
  mixins: [common["a" /* default */], ctdlasnProfile["a" /* default */]],
  data: function data() {
    return {
      scrolled: false,
      parentObjectClass: 'parent-object',
      showVersionHistory: false,
      showEditMultiple: false,
      showClipboardSuccessModal: false,
      repo: window.repo,
      highlightCompetency: null,
      editingFramework: false,
      properties: "primary",
      config: null,
      selectedArray: [],
      editsToUndo: [],
      dragOptions: {
        scroll: true,
        swapThreshold: 0.75,
        disabled: false,
        emptyInsertThreshold: 36,
        animation: 0,
        ghostClass: 'ghost-drag',
        chosenClass: 'chosen-drag',
        dragClass: 'drag',
        scrollSensitivity: 30,
        scrollSpeed: 5,
        forceFallback: true
      },
      frameworkDrag: [],
      doneDragging: false
    };
  },
  computed: {
    defaultFrameworkConfiguration: function defaultFrameworkConfiguration() {
      return this.$store.getters['editor/framework'] ? this.$store.getters['editor/framework'].configuration : null;
    },
    isCeasn: function isCeasn() {
      if (this.queryParams["ceasnDataFields"] && this.queryParams["ceasnDataFields"] === 'true') {
        return true;
      } else {
        return false;
      }
    },
    newFramework: function newFramework() {
      return this.$store.getters['editor/newFramework'] === this.framework.shortId();
    },
    showRightAside: function showRightAside() {
      return this.$store.getters['app/showRightAside'];
    },
    dynamicThingComponent: function dynamicThingComponent() {
      if (this.editingFramework || this.$store.getters['editor/newFramework'] === this.framework.shortId()) {
        return 'ThingEditing';
      } else {
        return 'Thing';
      }
    },
    framework: function framework() {
      return this.$store.getters['editor/framework'];
    },
    queryParams: function queryParams() {
      return this.$store.getters['editor/queryParams'];
    },
    timestamp: function timestamp() {
      if (this.framework.getTimestamp()) {
        return this.framework.getTimestamp();
      } else if (this.framework["schema:dateModified"]) {
        return this.framework["schema:dateModified"];
      } else {
        return null;
      }
    },
    lastModified: function lastModified() {
      if (this.framework == null) return "Unknown.";
      if (this.timestamp) {
        return this.$moment(this.timestamp).format("MMM D YYYY");
      } else {
        return null;
      }
    },
    shortId: function shortId() {
      if (this.framework) {
        return this.framework.shortId();
      } else {
        return null;
      }
    },
    loggedIn: function loggedIn() {
      if (EcIdentityManager.default.ids && EcIdentityManager.default.ids.length > 0) {
        return true;
      }
      return false;
    },
    conceptSchemeProfile: function conceptSchemeProfile() {
      if (this.queryParams.ceasnDataFields === "true") {
        return this.ctdlAsnConceptSchemeProfile;
      }
      if (this.config && this.config.taxonomyConfig) {
        return this.config.taxonomyConfig;
      }
      return {
        "http://purl.org/dc/terms/title": {
          "@id": "http://purl.org/dc/terms/title",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/ConceptScheme"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The name or title of this resource."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Title"
          }],
          "heading": "General",
          "onePerLanguage": "true",
          "isRequired": "true"
        },
        "http://purl.org/dc/terms/description": {
          "@id": "http://purl.org/dc/terms/description",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/ConceptScheme"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A short description of this resource. One definition per language"
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Description"
          }],
          "heading": "General",
          "onePerLanguage": "true"
        },
        "@id": {
          "@id": "https://schema.cassproject.org/0.4/ConceptScheme/id",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/ConceptScheme"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The URL of the concept scheme. If imported from another source, the URL of the concept scheme from which this one originates."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Canonical URL"
          }],
          "readOnly": "true",
          "max": 1,
          "heading": "Keys"
        },
        "http://purl.org/dc/terms/creator": {
          "@id": "http://purl.org/dc/terms/creator",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "An entity primarily responsible for making this resource. For example, https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/. One entity per line."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Creator"
          }],
          "heading": "General"
        },
        "http://purl.org/dc/terms/publisher": {
          "@id": "http://purl.org/dc/terms/publisher",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "An agent responsible for making this entity available. For example, https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Publisher"
          }],
          "max": 1,
          "heading": "General"
        },
        "https://purl.org/ctdlasn/terms/publisherName": {
          "@id": "https://purl.org/ctdlasn/terms/publisherName",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Name of an agent responsible for making this resource available. One name per line."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Publisher Name"
          }],
          "max": 1,
          "heading": "General"
        },
        "http://purl.org/dc/terms/language": {
          "@id": "http://purl.org/dc/terms/language",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The primary language used in or by this resource. One language per line."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Language"
          }],
          "heading": "General"
        },
        "http://purl.org/dc/elements/1.1/source": {
          "@id": "http://purl.org/dc/elements/1.1/source",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A URI to the original resource which this resource is based on or derived from. For example: https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Source"
          }],
          "heading": "General",
          "max": 1
        },
        "headings": ["General", "Keys"],
        "primaryProperties": ["http://purl.org/dc/terms/title", "http://purl.org/dc/terms/description"],
        "secondaryProperties": ["@id", "http://purl.org/dc/terms/creator", "http://purl.org/dc/terms/publisher", "https://purl.org/ctdlasn/terms/publisherName", "http://purl.org/dc/terms/language", "http://purl.org/dc/elements/1.1/source"],
        "tertiaryProperties": []
      };
    },
    conceptProfile: function conceptProfile() {
      if (this.queryParams.ceasnDataFields === "true") {
        return this.ctdlAsnConceptProfile;
      }
      if (this.config && this.config.taxonConfig) {
        return this.config.taxonConfig;
      }
      return {
        "http://www.w3.org/2004/02/skos/core#prefLabel": {
          "@id": "http://www.w3.org/2004/02/skos/core#prefLabel",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "http://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Preferred language-tagged label representing this concept. One label per language."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Preferred Label"
          }],
          "heading": "General",
          "onePerLanguage": "true",
          "isRequired": "true"
        },
        "http://www.w3.org/2004/02/skos/core#definition": {
          "@id": "http://www.w3.org/2004/02/skos/core#definition",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "http://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Supplies a complete explanation of the intended meaning of a concept. One definition per language."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Definition"
          }],
          "heading": "General",
          "onePerLanguage": "true"
        },
        "@id": {
          "@id": "https://schema.cassproject.org/0.4/Concept/id",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Concept"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The URL of the concept. If imported from another source, the URL of the concept from which this one originates."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Canonical URL"
          }],
          "readOnly": "true",
          "max": 1,
          "heading": "Keys"
        },
        "http://www.w3.org/2004/02/skos/core#notation": {
          "@id": "http://www.w3.org/2004/02/skos/core#notation",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "http://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Alphanumeric notation or ID code as defined by the promulgating body to identify this resource."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Notation"
          }],
          "heading": "General"
        },
        "http://www.w3.org/2004/02/skos/core#altLabel": {
          "@id": "http://www.w3.org/2004/02/skos/core#altLabel",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "http://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Non-preferred label for the concept used to relate a concept synonym to the preferred label."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Alternative Label"
          }],
          "heading": "Other Labels"
        },
        "http://www.w3.org/2004/02/skos/core#hiddenLabel": {
          "@id": "http://www.w3.org/2004/02/skos/core#hiddenLabel",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "http://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Label not intended for public presentation but to assist applications in disambiguating searcher intent - e.g., hidden labels can be used for common misspelling or a colloquial expression."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Hidden Label"
          }],
          "heading": "Other Labels"
        },
        "http://www.w3.org/2004/02/skos/core#note": {
          "@id": "http://www.w3.org/2004/02/skos/core#note",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "http://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Annotations to the concept for purposes of general documentation."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Note"
          }],
          "heading": "Documentation"
        },
        "http://www.w3.org/2004/02/skos/core#broader": {
          "@id": "http://www.w3.org/2004/02/skos/core#broader",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "http://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Concept that is broader in some way than this concept."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Broader"
          }],
          "heading": "Connections"
        },
        "http://www.w3.org/2004/02/skos/core#narrower": {
          "@id": "http://www.w3.org/2004/02/skos/core#narrower",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "http://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Concept that is narrower in some way than this concept."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Narrower"
          }],
          "heading": "Connections"
        },
        "http://www.w3.org/2004/02/skos/core#broadMatch": {
          "@id": "http://www.w3.org/2004/02/skos/core#broadMatch",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "http://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Assertion indicates that the referenced concept is broader in some way than this concept."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Broad Match"
          }],
          "heading": "Connections"
        },
        "http://www.w3.org/2004/02/skos/core#closeMatch": {
          "@id": "http://www.w3.org/2004/02/skos/core#closeMatch",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "http://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Assertion indicates that two concepts are sufficiently similar that they can be used interchangeably."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Close Match"
          }],
          "heading": "Connections"
        },
        "http://www.w3.org/2004/02/skos/core#exactMatch": {
          "@id": "http://www.w3.org/2004/02/skos/core#exactMatch",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "http://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Indicates semantic similarity denoting an even higher degree of closeness than Close Match."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Exact Match"
          }],
          "heading": "Connections"
        },
        "http://www.w3.org/2004/02/skos/core#narrowMatch": {
          "@id": "http://www.w3.org/2004/02/skos/core#narrowMatch",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "http://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Assertion indicates that the referenced concept is narrower in some way than this concept."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Narrow Match"
          }],
          "heading": "Connections"
        },
        "http://www.w3.org/2004/02/skos/core#related": {
          "@id": "http://www.w3.org/2004/02/skos/core#related",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "http://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "URL of an associatively related concept."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Related"
          }],
          "heading": "Connections"
        },
        "headings": ["General", "Other Labels", "Documentation", "Connections", "Keys"],
        "primaryProperties": ["http://www.w3.org/2004/02/skos/core#prefLabel", "http://www.w3.org/2004/02/skos/core#definition", "http://www.w3.org/2004/02/skos/core#notation"],
        "secondaryProperties": ["@id", "http://www.w3.org/2004/02/skos/core#altLabel", "http://www.w3.org/2004/02/skos/core#hiddenLabel", "http://www.w3.org/2004/02/skos/core#note", "http://www.w3.org/2004/02/skos/core#broader", "http://www.w3.org/2004/02/skos/core#narrower"],
        "tertiaryProperties": ["http://www.w3.org/2004/02/skos/core#broadMatch", "http://www.w3.org/2004/02/skos/core#closeMatch", "http://www.w3.org/2004/02/skos/core#exactMatch", "http://www.w3.org/2004/02/skos/core#narrowMatch", "http://www.w3.org/2004/02/skos/core#related"]
      };
    },
    canEdit: function canEdit() {
      if (this.queryParams.view === 'true') {
        return false;
      }
      return this.canEditAny(this.framework);
    }
  },
  components: {
    Thing: function Thing() {
      return __webpack_require__.e(/* import() */ "chunk-2d0a4fe9").then(__webpack_require__.bind(null, "098b"));
    },
    ThingEditing: function ThingEditing() {
      return Promise.all(/* import() */[__webpack_require__.e("chunk-2d0a4fe9"), __webpack_require__.e("chunk-6a6fd63e"), __webpack_require__.e("chunk-2d0d5fe2"), __webpack_require__.e("chunk-576b8942"), __webpack_require__.e("chunk-7857b89e")]).then(__webpack_require__.bind(null, "8051"));
    },
    FrameworkEditorToolbar: function FrameworkEditorToolbar() {
      return __webpack_require__.e(/* import() */ "chunk-c5459254").then(__webpack_require__.bind(null, "e672"));
    },
    RightAside: function RightAside() {
      return Promise.all(/* import() */[__webpack_require__.e("chunk-4f51c21e"), __webpack_require__.e("chunk-2d21ecda"), __webpack_require__.e("chunk-2d0dab46")]).then(__webpack_require__.bind(null, "dd98"));
    },
    ConceptHierarchy: function ConceptHierarchy() {
      return __webpack_require__.e(/* import() */ "chunk-4f8e6938").then(__webpack_require__.bind(null, "25d8"));
    },
    draggable: function draggable() {
      return __webpack_require__.e(/* import() */ "chunk-4a5f46a6").then(__webpack_require__.t.bind(null, "b76a", 7));
    }
  },
  created: function created() {
    if (this.framework !== null) {
      this.getConfiguration();
      this.refreshPage();
      this.spitEvent('viewChanged');
    }
  },
  mounted: function mounted() {
    if (!this.framework) {
      this.$router.push({
        name: "frameworks"
      });
    }
    var documentBody = document.getElementById('concept');
    documentBody.addEventListener('scroll', debounce_default()(this.scrollFunction, 20, {
      'immediate': true
    }));
    if (this.queryParams.ceasnDataFields === 'true') {
      this.getConceptCtids();
      this.getConceptRegistryUrls();
    }
  },
  beforeDestroy: function beforeDestroy() {},
  watch: {
    config: function config() {
      this.$store.commit('editor/configuration', this.config);
    },
    defaultFrameworkConfiguration: function defaultFrameworkConfiguration() {
      this.getConfiguration();
    },
    shortId: function shortId() {
      this.refreshPage();
    },
    frameworkDrag: function frameworkDrag() {
      if (this.frameworkDrag.length > 0) {
        var id = EcRemoteLinkedData.trimVersionFromUrl(this.frameworkDrag[0].obj.id);
        this.moveToTopLevel(id);
        this.frameworkDrag = [];
        this.doneDragging = true;
      }
    }
  },
  methods: {
    getConfiguration: function () {
      var _getConfiguration = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee() {
        var me, c;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              me = this;
              if (!this.framework.configuration) {
                _context.next = 8;
                break;
              }
              _context.next = 4;
              return EcRepository.get(this.framework.configuration);
            case 4:
              c = _context.sent;
              appLog("c is: ", c);
              if (c) {
                appLog("c is: ", c);
                this.config = c;
                this.configSetOnFramework = true;
              }
              appLog("c is: ", c);
            case 8:
              if (!(!this.config && localStorage.getItem("cassAuthoringToolDefaultBrowserConfigId"))) {
                _context.next = 13;
                break;
              }
              _context.next = 11;
              return EcRepository.get(localStorage.getItem("cassAuthoringToolDefaultBrowserConfigId"));
            case 11:
              c = _context.sent;
              if (c) {
                this.config = c;
              }
            case 13:
              if (!this.config) {
                this.repo.searchWithParams("@type:Configuration", {
                  'size': 10000
                }, function (c) {
                  if (c.isDefault === "true" || c.isDefault === true) {
                    me.config = c;
                  }
                }, function () {}, function () {});
              }
            case 14:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function getConfiguration() {
        return _getConfiguration.apply(this, arguments);
      }
      return getConfiguration;
    }(),
    scrollFunction: function scrollFunction(e) {
      var documentObject = document.getElementsByClassName('parent-object');
      var scrollValue = e.target.scrollTop;
      if (scrollValue > 0) {
        this.parentObjectClass = 'parent-object scrolled';
        this.scrolled = true;
      } else {
        this.parentObjectClass = 'parent-object';
        this.scrolled = false;
      }
    },
    handleSearch: function handleSearch(e) {
      this.$store.commit('app/showModal', e);
    },
    onCancelEditMultiple: function onCancelEditMultiple() {
      this.showEditMultiple = false;
    },
    onEditMultiple: function onEditMultiple() {
      this.showEditMultiple = true;
      var payload = {
        profile: this.conceptProfile,
        selectedCompetencies: this.selectedArray,
        component: 'MultiEdit'
      };
      this.$store.commit('app/showModal', payload);
    },
    onEditNode: function onEditNode() {
      this.editingFramework = true;
    },
    onDoneEditingNode: function () {
      var _onDoneEditingNode = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee2() {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.t0 = this.$store;
              _context2.next = 3;
              return EcRepository.get(this.framework.shortId());
            case 3:
              _context2.t1 = _context2.sent;
              _context2.t0.commit.call(_context2.t0, 'editor/framework', _context2.t1);
              this.$store.commit('editor/newFramework', null);
              this.editingFramework = false;
            case 7:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function onDoneEditingNode() {
        return _onDoneEditingNode.apply(this, arguments);
      }
      return onDoneEditingNode;
    }(),
    selectedArrayEvent: function selectedArrayEvent(ary) {
      this.selectedArray = ary;
    },
    refreshPage: function refreshPage() {
      if (!this.framework) {
        appLog("no framework to refresh");
        return;
      }
      this.setDefaultLanguage();
      this.highlightCompetency = [];
      if (this.queryParams.highlightCompetency) {
        if (!EcArray.isArray(highlightCompetency)) {
          this.highlightCompetency = [this.queryParams.highlightCompetency];
        } else {
          this.highlightCompetency = this.queryParams.highlightCompetency;
        }
      }
    },
    getDisplayStringFrom: function getDisplayStringFrom(n) {
      if (n != null && EcArray.isArray(n)) {
        if (n.length > 0) {
          n = n[0];
        }
      }
      if (n != null && EcObject.isObject(n) && n["@value"]) {
        return n["@value"];
      }
      return n;
    },
    onOpenExportModal: function onOpenExportModal() {
      this.$store.commit('editor/setItemToExport', this.framework);
      this.$store.commit('app/showModal', {
        component: 'ExportOptionsModal',
        title: 'Export Concept Scheme'
      });
    },
    changeProperties: function changeProperties(type) {
      this.properties = type;
    },
    onSelectButtonClick: function onSelectButtonClick(ids) {
      this.selectButton(ids);
    },
    moveToTopLevel: function () {
      var _moveToTopLevel = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee3(id) {
        var me, concept, parent, fromIndex;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              me = this;
              _context3.next = 3;
              return EcConcept.get(id);
            case 3:
              concept = _context3.sent;
              if (!concept["skos:broader"]) {
                _context3.next = 13;
                break;
              }
              if (!EcArray.isArray(concept["skos:broader"])) {
                concept["skos:broader"] = [concept["skos:broader"]];
              }
              _context3.next = 8;
              return EcConcept.get(concept["skos:broader"][0]);
            case 8:
              parent = _context3.sent;
              fromIndex = parent["skos:narrower"].indexOf(id);
              parent["skos:narrower"].splice(fromIndex, 1);
              repo.saveTo(parent, function () {}, function () {});
              delete concept["skos:broader"];
            case 13:
              this.framework["skos:hasTopConcept"].push(id);
              concept["skos:topConceptOf"] = this.framework.shortId();
              repo.saveTo(concept, function () {
                repo.saveTo(me.framework, function () {
                  me.refreshPage();
                }, function () {});
              }, function () {});
            case 16:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function moveToTopLevel(_x) {
        return _moveToTopLevel.apply(this, arguments);
      }
      return moveToTopLevel;
    }()
  }
});
// CONCATENATED MODULE: ./src/views/conceptScheme/ConceptScheme.vue?vue&type=script&lang=js
 /* harmony default export */ var conceptScheme_ConceptSchemevue_type_script_lang_js = (ConceptSchemevue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/views/conceptScheme/ConceptScheme.vue?vue&type=style&index=0&id=50f861ae&prod&lang=scss
var ConceptSchemevue_type_style_index_0_id_50f861ae_prod_lang_scss = __webpack_require__("31ee");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/views/conceptScheme/ConceptScheme.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  conceptScheme_ConceptSchemevue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ConceptScheme = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "778f":
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
//# sourceMappingURL=conceptScheme.c5a8c987.js.map