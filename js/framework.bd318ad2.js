(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["framework","chunk-6b291276","chunk-74a95bb3"],{

/***/ "0094":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var FREEZING = __webpack_require__("bb2f");
var global = __webpack_require__("da84");
var uncurryThis = __webpack_require__("e330");
var defineBuiltIns = __webpack_require__("6964");
var InternalMetadataModule = __webpack_require__("f183");
var collection = __webpack_require__("6d61");
var collectionWeak = __webpack_require__("acac");
var isObject = __webpack_require__("861d");
var enforceInternalState = __webpack_require__("69f3").enforce;
var fails = __webpack_require__("d039");
var NATIVE_WEAK_MAP = __webpack_require__("cdce");

var $Object = Object;
// eslint-disable-next-line es/no-array-isarray -- safe
var isArray = Array.isArray;
// eslint-disable-next-line es/no-object-isextensible -- safe
var isExtensible = $Object.isExtensible;
// eslint-disable-next-line es/no-object-isfrozen -- safe
var isFrozen = $Object.isFrozen;
// eslint-disable-next-line es/no-object-issealed -- safe
var isSealed = $Object.isSealed;
// eslint-disable-next-line es/no-object-freeze -- safe
var freeze = $Object.freeze;
// eslint-disable-next-line es/no-object-seal -- safe
var seal = $Object.seal;

var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
var InternalWeakMap;

var wrapper = function (init) {
  return function WeakMap() {
    return init(this, arguments.length ? arguments[0] : undefined);
  };
};

// `WeakMap` constructor
// https://tc39.es/ecma262/#sec-weakmap-constructor
var $WeakMap = collection('WeakMap', wrapper, collectionWeak);
var WeakMapPrototype = $WeakMap.prototype;
var nativeSet = uncurryThis(WeakMapPrototype.set);

// Chakra Edge bug: adding frozen arrays to WeakMap unfreeze them
var hasMSEdgeFreezingBug = function () {
  return FREEZING && fails(function () {
    var frozenArray = freeze([]);
    nativeSet(new $WeakMap(), frozenArray, 1);
    return !isFrozen(frozenArray);
  });
};

// IE11 WeakMap frozen keys fix
// We can't use feature detection because it crash some old IE builds
// https://github.com/zloirock/core-js/issues/485
if (NATIVE_WEAK_MAP) if (IS_IE11) {
  InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
  InternalMetadataModule.enable();
  var nativeDelete = uncurryThis(WeakMapPrototype['delete']);
  var nativeHas = uncurryThis(WeakMapPrototype.has);
  var nativeGet = uncurryThis(WeakMapPrototype.get);
  defineBuiltIns(WeakMapPrototype, {
    'delete': function (key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceInternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeDelete(this, key) || state.frozen['delete'](key);
      } return nativeDelete(this, key);
    },
    has: function has(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceInternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas(this, key) || state.frozen.has(key);
      } return nativeHas(this, key);
    },
    get: function get(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceInternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas(this, key) ? nativeGet(this, key) : state.frozen.get(key);
      } return nativeGet(this, key);
    },
    set: function set(key, value) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceInternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        nativeHas(this, key) ? nativeSet(this, key, value) : state.frozen.set(key, value);
      } else nativeSet(this, key, value);
      return this;
    }
  });
// Chakra Edge frozen keys fix
} else if (hasMSEdgeFreezingBug()) {
  defineBuiltIns(WeakMapPrototype, {
    set: function set(key, value) {
      var arrayIntegrityLevel;
      if (isArray(key)) {
        if (isFrozen(key)) arrayIntegrityLevel = freeze;
        else if (isSealed(key)) arrayIntegrityLevel = seal;
      }
      nativeSet(this, key, value);
      if (arrayIntegrityLevel) arrayIntegrityLevel(key);
      return this;
    }
  });
}


/***/ }),

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

/***/ "10d1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove this module from `core-js@4` since it's replaced to module below
__webpack_require__("0094");


/***/ }),

/***/ "1102":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c7eb");
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("1da1");


/* harmony default export */ __webpack_exports__["a"] = ({
  computed: {
    t3CompetencyProfile: function t3CompetencyProfile() {
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
            "@value": "ID"
          }],
          "readOnly": "true"
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
            "@value": "An alphanumeric notation or ID code as defined by the promulgating body to identify this resource."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Code"
          }]
        },
        "http://schema.org/name": {
          "@id": "http://schema.org/name",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Name of the competency."
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
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Description of the competency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Description"
          }]
        },
        "http://purl.org/dc/terms/type": {
          "@id": "http://purl.org/dc/terms/type",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The textual label identifying the category of the competency as designated by the promulgating body."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Type"
          }]
        },
        "https://schema.cassproject.org/0.4/Competency/scope": {
          "@id": "https://schema.cassproject.org/0.4/Competency/scope",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Scope in which the competency may be applied. e.g. Underwater."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Scope"
          }]
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
          "noTextEditing": "true",
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A term drawn from a controlled vocabulary used by the promulgating agency to refine and differentiate individual resources contextually."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Context"
          }]
        },
        "https://schema.cassproject.org/0.4/Level": {
          "@id": "https://schema.cassproject.org/0.4/Level",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Level"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "When an individual's performance in a competency can be measured, a level specifies milestones that an individual can reach, creating fine-grained distinction between the proficient and the adept."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Rubric Cell"
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
          profile: {
            "http://schema.org/name": {
              "@id": "http://schema.org/name",
              "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
              "http://schema.org/domainIncludes": [{
                "@id": "https://schema.cassproject.org/0.4/Level"
              }],
              "http://schema.org/rangeIncludes": [{
                "@id": "http://schema.org/Text"
              }],
              "http://www.w3.org/2000/01/rdf-schema#comment": [{
                "@language": "en",
                "@value": "The title that one who holds this performance level may assume. e.g. \"Fast\""
              }],
              "http://www.w3.org/2000/01/rdf-schema#label": [{
                "@language": "en",
                "@value": "Rubric Column Header"
              }]
            },
            "https://schema.cassproject.org/0.4/competency": {
              "@id": "https://schema.cassproject.org/0.4/competency",
              "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
              "http://schema.org/domainIncludes": [{
                "@id": "https://schema.cassproject.org/0.4/Level"
              }],
              "http://schema.org/rangeIncludes": [{
                "@id": "http://schema.org/URL"
              }],
              "http://www.w3.org/2000/01/rdf-schema#comment": [{
                "@language": "en",
                "@value": "Specifies the URL of the competency the level relates to."
              }],
              "http://www.w3.org/2000/01/rdf-schema#label": [{
                "@language": "en",
                "@value": "Rubric Row Header"
              }]
            },
            "alwaysProperties": ["http://schema.org/name", "https://schema.cassproject.org/0.4/competency"]
          }
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
          }()
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
          }()
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
          }()
        },
        "isSimilarTo": {
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Is Similar To"
          }],
          "valuesIndexed": function valuesIndexed() {
            return me.relations["isSimilarTo"];
          },
          "noTextEditing": "true",
          "add": function () {
            var _add4 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().mark(function _callee7(selectedCompetency, values) {
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().wrap(function _callee7$(_context7) {
                while (1) switch (_context7.prev = _context7.next) {
                  case 0:
                    _context7.next = 2;
                    return me.addRelationsToFramework(selectedCompetency, "isSimilarTo", values);
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
                    return me.removeRelationFromFramework(source, "isSimilarTo", target);
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
          }()
        },
        "isPartiallySameAs": {
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Is Partially Same As"
          }],
          "valuesIndexed": function valuesIndexed() {
            return me.relations["isPartiallySameAs"];
          },
          "noTextEditing": "true",
          "add": function () {
            var _add5 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().mark(function _callee9(selectedCompetency, values) {
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().wrap(function _callee9$(_context9) {
                while (1) switch (_context9.prev = _context9.next) {
                  case 0:
                    _context9.next = 2;
                    return me.addRelationsToFramework(selectedCompetency, "isPartiallySameAs", values);
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
                    return me.removeRelationFromFramework(source, "isPartiallySameAs", target);
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
          }()
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
          }()
        },
        "enables": {
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Enables"
          }],
          "valuesIndexed": function valuesIndexed() {
            return me.relations["enables"];
          },
          "noTextEditing": "true",
          "add": function () {
            var _add7 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().mark(function _callee13(selectedCompetency, values) {
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().wrap(function _callee13$(_context13) {
                while (1) switch (_context13.prev = _context13.next) {
                  case 0:
                    _context13.next = 2;
                    return me.addRelationsToFramework(selectedCompetency, "enables", values);
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
                    return me.removeRelationFromFramework(source, "enables", target);
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
          }()
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
            var _add8 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().mark(function _callee15(selectedCompetency, values) {
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().wrap(function _callee15$(_context15) {
                while (1) switch (_context15.prev = _context15.next) {
                  case 0:
                    _context15.next = 2;
                    return me.addRelationsToFramework(selectedCompetency, "isEnabledBy", values);
                  case 2:
                  case "end":
                    return _context15.stop();
                }
              }, _callee15);
            }));
            function add(_x29, _x30) {
              return _add8.apply(this, arguments);
            }
            return add;
          }(),
          "save": function save() {},
          "remove": function () {
            var _remove8 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().mark(function _callee16(source, target) {
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().wrap(function _callee16$(_context16) {
                while (1) switch (_context16.prev = _context16.next) {
                  case 0:
                    _context16.next = 2;
                    return me.removeRelationFromFramework(source, "isEnabledBy", target);
                  case 2:
                  case "end":
                    return _context16.stop();
                }
              }, _callee16);
            }));
            function remove(_x31, _x32) {
              return _remove8.apply(this, arguments);
            }
            return remove;
          }()
        },
        "primaryProperties": ["https://purl.org/ctdlasn/terms/codedNotation", "http://schema.org/name", "http://schema.org/description"],
        "secondaryProperties": ["@id", "http://purl.org/dc/terms/type", "https://schema.cassproject.org/0.4/Competency/scope", "https://purl.org/ctdlasn/terms/conceptTerm", "https://schema.cassproject.org/0.4/Level", "narrows", "broadens", "isEquivalentTo", "isSimilarTo", "isPartiallySameAs", "isRelatedTo", "enables", "isEnabledBy"],
        "tertiaryProperties": []
      };
    },
    t3FrameworkProfile: function t3FrameworkProfile() {
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
            "@value": "ID"
          }],
          "readOnly": "true"
        },
        "http://schema.org/name": {
          "@id": "http://schema.org/name",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Name of the competency framework."
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
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Description of the framework."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Description"
          }]
        },
        "https://schema.cassproject.org/0.4/level": {
          "@id": "https://schema.cassproject.org/0.4/level",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The title that one who holds this performance level may assume. e.g. \"Fast\""
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Available Levels"
          }]
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
            "@value": "The entity responsible for making this competency framework available."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Publisher"
          }]
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
            "@value": "A URI to the original competency framework which this competency framework is based on or derived from."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Extracted From"
          }]
        },
        "http://schema.org/dateCreated": {
          "@id": "http://schema.org/dateCreated",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2001/XMLSchema#date"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Date of creation of this resource."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Extraction Date"
          }]
        },
        "primaryProperties": ["http://schema.org/name", "http://schema.org/description"],
        "secondaryProperties": ["@id", "https://schema.cassproject.org/0.4/level", "http://schema.org/publisher", "http://purl.org/dc/elements/1.1/source", "http://schema.org/dateCreated"],
        "tertiaryProperties": []
      };
    }
  }
});

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

/***/ "255d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Framework_vue_vue_type_style_index_0_id_66ce4521_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("79db");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Framework_vue_vue_type_style_index_0_id_66ce4521_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Framework_vue_vue_type_style_index_0_id_66ce4521_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


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

/***/ "2f26":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3c28eb14-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/framework/Framework.vue?vue&type=template&id=66ce4521
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    ref: "framework",
    attrs: {
      "id": "framework"
    }
  }, [_c('main-layout', {
    attrs: {
      "rightActive": _vm.showRightAside,
      "simple": true
    }
  }, [_c('template', {
    slot: "top"
  }, [_c('FrameworkEditorToolbar', {
    attrs: {
      "properties": _vm.properties
    },
    on: {
      "show-export-modal": _vm.onOpenExportModal,
      "change-properties": _vm.changeProperties
    }
  })], 1), _c('template', {
    slot: "body"
  }, [_c('div', {
    staticClass: "framework-content",
    attrs: {
      "id": "framework-content"
    }
  }, [_c('div', {
    staticClass: "framework-body columns is-multiline is-gapless is-paddingless is-marginless"
  }, [_c('div', {
    staticClass: "column is-12"
  }, [_c('div', {
    staticClass: "container is-paddingless"
  }, [_c('draggable', _vm._b({
    attrs: {
      "tag": "div",
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
    class: [_vm.dynamicThingComponent === 'Thing' ? _vm.parentObjectClass : ''],
    attrs: {
      "id": 'scroll-' + _vm.framework.shortId().split('/').pop(),
      "obj": _vm.framework,
      "repo": _vm.repo,
      "newFramework": _vm.newFramework,
      "parentNotEditable": _vm.queryParams.view === 'true',
      "profile": _vm.frameworkProfile,
      "properties": _vm.properties
    },
    on: {
      "remove-object": _vm.removeObject,
      "edit-node-event": function editNodeEvent($event) {
        return _vm.onEditNode();
      },
      "done-editing-node-event": function doneEditingNodeEvent($event) {
        return _vm.onDoneEditingNode();
      }
    },
    scopedSlots: _vm._u([{
      key: "frameworkDetails",
      fn: function fn() {
        return [_c('div', {
          staticClass: "lode__framework__info-bar"
        }, [_vm.framework.competency && _vm.framework.competency.length == 1 ? _c('span', {
          staticClass: "tag is-medium-grey has-text-dark"
        }, [_vm._v(" " + _vm._s(_vm.framework.competency.length) + " item ")]) : _vm.framework.competency && _vm.framework.competency.length > 1 ? _c('span', {
          staticClass: "tag is-medium-grey has-text-dark"
        }, [_vm._v(" " + _vm._s(_vm.framework.competency.length) + " items ")]) : _vm._e(), _vm.timestamp ? _c('span', {
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
        }, [_vm._v("Published")]) : _vm._e()])];
      },
      proxy: true
    }])
  })], 1), !_vm.hierarchyIsdoneLoading ? _c('div', {
    staticClass: "section"
  }, [_c('ul', {
    staticClass: "processing-list"
  }, [_c('li'), _c('li'), _c('ul', [_c('li'), _c('li'), _c('li'), _c('ul', [_c('li'), _c('li'), _c('li'), _c('ul', [_c('li'), _c('li')])])]), _c('li'), _c('li'), _c('ul', [_c('li'), _c('li')])])]) : _vm._e(), _c('Hierarchy', {
    class: {
      'is-hidden': !_vm.hierarchyIsdoneLoading
    },
    attrs: {
      "container": _vm.framework,
      "scrolled": _vm.scrolled,
      "containerType": "Framework",
      "containerTypeGet": "EcFramework",
      "containerNodeProperty": "competency",
      "containerEdgeProperty": "relation",
      "nodeType": "EcCompetency",
      "edgeType": "EcAlignment",
      "edgeRelationProperty": "relationType",
      "edgeRelationLiteral": "narrows",
      "edgeSourceProperty": "source",
      "edgeTargetProperty": "target",
      "viewOnly": _vm.queryParams.view === 'true',
      "repo": _vm.repo,
      "highlightList": _vm.highlightCompetency,
      "profile": _vm.competencyProfile,
      "newFramework": _vm.newFramework,
      "canEditAssertions": true,
      "properties": _vm.properties
    },
    on: {
      "edit-multiple-event": _vm.onEditMultiple,
      "remove-object": _vm.removeObject,
      "search-things": function searchThings($event) {
        return _vm.handleSearch($event);
      },
      "select-button-click": _vm.onSelectButtonClick,
      "selected-array": _vm.selectedArrayEvent,
      "done-loading-nodes": _vm.preloadRelations
    }
  })], 1)])])])]), _c('template', {
    slot: "right"
  }, [_vm.showRightAside ? _c('RightAside') : _vm._e()], 1), _vm.scrolled ? _c('div', {
    staticClass: "extra-space-for-scroll"
  }) : _vm._e()], 2)], 1);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/views/framework/Framework.vue?vue&type=template&id=66ce4521

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

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.json.stringify.js
var es_json_stringify = __webpack_require__("e9c4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__("a434");

// EXTERNAL MODULE: ./src/layouts/MainLayout.vue + 4 modules
var MainLayout = __webpack_require__("713b");

// EXTERNAL MODULE: ./src/mixins/common.js
var common = __webpack_require__("872c");

// EXTERNAL MODULE: ./src/mixins/getLevelsAndRelations.js + 11 modules
var getLevelsAndRelations = __webpack_require__("b1ab3");

// EXTERNAL MODULE: ./src/mixins/competencyEdits.js
var competencyEdits = __webpack_require__("6ffa4");

// EXTERNAL MODULE: ./src/mixins/ctdlasnProfile.js
var ctdlasnProfile = __webpack_require__("f188");

// EXTERNAL MODULE: ./src/mixins/t3Profile.js
var t3Profile = __webpack_require__("1102");

// EXTERNAL MODULE: ./src/mixins/tlaProfile.js
var tlaProfile = __webpack_require__("d6b4");

// EXTERNAL MODULE: ./node_modules/lodash/debounce.js
var debounce = __webpack_require__("b047");
var debounce_default = /*#__PURE__*/__webpack_require__.n(debounce);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/framework/Framework.vue?vue&type=script&lang=js


















/* harmony default export */ var Frameworkvue_type_script_lang_js = ({
  name: "Framework",
  props: {
    profileOverride: Object
  },
  components: {
    MainLayout: MainLayout["a" /* default */],
    FrameworkButtons: function FrameworkButtons() {
      return __webpack_require__.e(/* import() */ "chunk-2d0ddf90").then(__webpack_require__.bind(null, "8453"));
    },
    Hierarchy: function Hierarchy() {
      return Promise.all(/* import() */[__webpack_require__.e("chunk-6a6fd63e"), __webpack_require__.e("chunk-25a2af2a")]).then(__webpack_require__.bind(null, "9418"));
    },
    Thing: function Thing() {
      return __webpack_require__.e(/* import() */ "chunk-2d0a4fe9").then(__webpack_require__.bind(null, "098b"));
    },
    ThingEditing: function ThingEditing() {
      return Promise.all(/* import() */[__webpack_require__.e("chunk-2d0a4fe9"), __webpack_require__.e("chunk-6a6fd63e"), __webpack_require__.e("chunk-2d0d5fe2"), __webpack_require__.e("chunk-576b8942"), __webpack_require__.e("chunk-777ee162")]).then(__webpack_require__.bind(null, "8051"));
    },
    FrameworkEditorToolbar: function FrameworkEditorToolbar() {
      return __webpack_require__.e(/* import() */ "chunk-c5459254").then(__webpack_require__.bind(null, "e672"));
    },
    RightAside: function RightAside() {
      return Promise.all(/* import() */[__webpack_require__.e("chunk-4f51c21e"), __webpack_require__.e("chunk-2d0dab46")]).then(__webpack_require__.bind(null, "dd98"));
    },
    draggable: function draggable() {
      return __webpack_require__.e(/* import() */ "chunk-4a5f46a6").then(__webpack_require__.t.bind(null, "b76a", 7));
    }
  },
  mixins: [common["a" /* default */], competencyEdits["a" /* default */], ctdlasnProfile["a" /* default */], t3Profile["a" /* default */], tlaProfile["a" /* default */], getLevelsAndRelations["a" /* default */]],
  data: function data() {
    return {
      ulListClass: '',
      scrolled: false,
      hierarchyIsdoneLoading: false,
      parentObjectClass: 'parent-object',
      showVersionHistory: false,
      showEditMultiple: false,
      showClipboardSuccessModal: false,
      showComments: false,
      repo: window.repo,
      highlightCompetency: null,
      editingFramework: false,
      properties: "primary",
      config: null,
      selectedArray: [],
      configSetOnFramework: false,
      gotInitialLevelsRelationsAndAlignments: false,
      dragOptions: {
        scroll: true,
        delay: 0,
        swapThreshold: 0.25,
        emptyInsertThreshold: 4,
        invertedSwapThreshold: 0.25,
        invertSwap: true,
        disabled: false,
        animation: 0,
        ghostClass: 'ghost-drag',
        chosenClass: 'chosen-drag',
        dragClass: 'drag',
        scrollSensitivity: 30,
        scrollSpeed: 5,
        forceFallback: true
      },
      frameworkDrag: [],
      configHasAlignments: false,
      configHasLevels: false
    };
  },
  computed: {
    newFramework: function newFramework() {
      return this.$store.getters['editor/newFramework'] === this.framework.shortId();
    },
    queryParams: function queryParams() {
      return this.$store.getters['editor/queryParams'];
    },
    isCeasn: function isCeasn() {
      if (this.queryParams["ceasnDataFields"] && this.queryParams["ceasnDataFields"] === 'true') {
        return true;
      } else {
        return false;
      }
    },
    showRightAside: function showRightAside() {
      return this.$store.getters['app/showRightAside'];
    },
    dynamicThingComponent: function dynamicThingComponent() {
      if (this.editingFramework || this.framework && this.$store.getters['editor/newFramework'] === this.framework.shortId()) {
        return 'ThingEditing';
      } else {
        return 'Thing';
      }
    },
    framework: function framework() {
      return this.$store.getters['editor/framework'];
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
    commentScrollTo: function commentScrollTo() {
      return this.$store.getters['editor/commentScrollTo'];
    },
    frameworkProfile: function frameworkProfile() {
      if (this.$store.state.editor.t3Profile === true) {
        return this.t3FrameworkProfile;
      }
      if (this.isCeasn && this.framework.subType === 'Collection') {
        return this.ctdlAsnCollectionProfile;
      }
      if (this.isCeasn && (this.config && !this.configSetOnFramework || !this.config)) {
        return this.ctdlAsnFrameworkProfile;
      }
      if (this.queryParams.tlaProfile === "true" && (this.config && !this.configSetOnFramework || !this.config)) {
        return this.tlaFrameworkProfile;
      }
      if (this.config) {
        return this.config.frameworkConfig;
      }
      return {
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
        "https://schema.cassproject.org/0.4/classification": {
          "@id": "https://schema.cassproject.org/0.4/classification",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The classification of the framework."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Classification"
          }],
          "heading": "General"
        },
        "https://schema.cassproject.org/0.4/markings": {
          "@id": "https://schema.cassproject.org/0.4/markings",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The markings of the framework."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Markings"
          }],
          "heading": "General"
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
        "headings": ["General", "Keys"],
        "primaryProperties": ["http://schema.org/name", "http://schema.org/description", "https://schema.cassproject.org/0.4/classification", "https://schema.cassproject.org/0.4/markings"],
        "secondaryProperties": ["@id"],
        "tertiaryProperties": []
      };
    },
    competencyProfile: function competencyProfile() {
      var _this = this;
      if (this.$store.state.editor.t3Profile === true) {
        return this.t3CompetencyProfile;
      }
      if (this.isCeasn && (this.config && !this.configSetOnFramework || !this.config)) {
        return this.ctdlAsnCompetencyProfile;
      }
      if (this.queryParams.tlaProfile === "true" && (this.config && !this.configSetOnFramework || !this.config)) {
        return this.tlaCompetencyProfile;
      }
      if (this.config) {
        var profile = JSON.parse(JSON.stringify(this.config.competencyConfig));
        var compKeys = EcObject.keys(profile);
        for (var i = 0; i < compKeys.length; i++) {
          var _key = compKeys[i];
          if (profile[_key] && profile[_key]["http://schema.org/rangeIncludes"] && profile[_key]["http://schema.org/rangeIncludes"][0]["@id"] === "https://schema.cassproject.org/0.4/Competency") {
            profile[_key]["isDirectLink"] = 'true';
          }
        }
        if (this.config.levelsConfig) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.configHasLevels = true;
          var me = this;
          var key = EcObject.keys(this.config.levelsConfig);
          key = key[0];
          profile.secondaryProperties.push(key);
          profile[key] = JSON.parse(JSON.stringify(this.config.levelsConfig[key]));
          profile[key]["http://schema.org/rangeIncludes"] = [{
            "@id": "https://schema.cassproject.org/0.4/Level"
          }];
          profile[key]["valuesIndexed"] = function () {
            return me.levels;
          };
          if (!profile[key]["options"]) {
            profile[key]["noTextEditing"] = 'true';
            profile[key]["add"] = function (selectedCompetency, levelId) {
              me.addLevel(selectedCompetency, levelId);
            };
            profile[key]["save"] = function () {
              me.saveFramework();
            };
            profile[key]["remove"] = function (competency, levelId) {
              me.removeLevelFromFramework(levelId);
            };
          } else {
            profile[key]["add"] = "checkedOptions";
            profile[key]["save"] = function (selectedCompetency, checkedOptions, allOptions) {
              me.saveCheckedLevels(selectedCompetency, checkedOptions, allOptions);
            };
          }
        }
        var relationshipsHeading = null;
        if (this.config.relationshipConfig) {
          var keys = EcObject.keys(this.config.relationshipConfig);
          var relationshipsPriority;
          if (profile["relationshipsPriority"] && profile["relationshipsPriority"].length > 0) {
            relationshipsPriority = profile["relationshipsPriority"] + "Properties";
          } else {
            relationshipsPriority = "secondaryProperties";
          }
          if (profile["relationshipsHeading"] && profile["relationshipsHeading"].length > 0) {
            if (profile["headings"] && !EcArray.has(profile["headings"], profile["relationshipsHeading"])) {
              profile["headings"].push(profile["relationshipsHeading"]);
            }
            relationshipsHeading = profile["relationshipsHeading"];
          }
          var _loop = function _loop() {
              var key = keys[i];
              me = _this;
              profile[relationshipsPriority].push(key);
              profile[key] = JSON.parse(JSON.stringify(_this.config.relationshipConfig[key]));
              profile[key]["http://schema.org/rangeIncludes"] = [{
                "@id": "https://schema.cassproject.org/0.4/Competency"
              }];
              profile[key]["valuesIndexed"] = function () {
                return me.relations[key];
              };
              profile[key]["noTextEditing"] = 'true';
              profile[key]["remove"] = /*#__PURE__*/function () {
                var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee(source, target) {
                  return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return me.removeRelationFromFramework(source, key, target);
                      case 2:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                }));
                return function (_x, _x2) {
                  return _ref.apply(this, arguments);
                };
              }();
              profile[key]["add"] = /*#__PURE__*/function () {
                var _ref2 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee2(selectedCompetency, values) {
                  return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee2$(_context2) {
                    while (1) switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return me.addRelationsToFramework(selectedCompetency, key, values);
                      case 2:
                      case "end":
                        return _context2.stop();
                    }
                  }, _callee2);
                }));
                return function (_x3, _x4) {
                  return _ref2.apply(this, arguments);
                };
              }();
              profile[key]["save"] = function () {};
              if (relationshipsHeading) {
                profile[key]["heading"] = relationshipsHeading;
              }
            },
            me;
          for (var i = 0; i < keys.length; i++) {
            _loop();
          }
        }
        if (this.config.alignConfig) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.configHasAlignments = true;
          var keys = EcObject.keys(this.config.alignConfig);
          var _loop2 = function _loop2() {
            var key = _this.config.alignConfig[_i] + " (resource)";
            var me = _this;
            profile["tertiaryProperties"].push(key);
            profile[key] = {};
            profile[key]["@id"] = key;
            profile[key]["@type"] = ["http://www.w3.org/2000/01/rdf-schema#Property"];
            profile[key]["http://schema.org/rangeIncludes"] = [{
              "@id": "http://schema.org/URL"
            }];
            profile[key]["http://www.w3.org/2000/01/rdf-schema#label"] = [{
              "@language": "en",
              "@value": key
            }];
            profile[key]["http://www.w3.org/2000/01/rdf-schema#comment"] = [{
              "@language": "en",
              "@value": key
            }];
            profile[key]["valuesIndexed"] = function () {
              return me.alignments[key];
            };
            profile[key]["remove"] = function (competency, id) {
              return me.removeResourceAlignment(id);
            };
            profile[key]["add"] = function (selectedCompetencyId, values) {
              return me.addResourceAlignments(selectedCompetencyId, key, values);
            };
            profile[key]["save"] = function () {};
            profile[key]["update"] = function (value) {
              return me.updateResourceAlignments(key, value);
            };
            if (relationshipsHeading) {
              profile[key]["heading"] = relationshipsHeading;
            }
            profile[key]["resource"] = true;
          };
          for (var _i = 0; _i < this.config.alignConfig.length; _i++) {
            _loop2();
          }
        }
        return profile;
      }
      if (this.profileOverride) {
        return this.profileOverride;
      } else {
        var me = this;
        return {
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
          "https://schema.cassproject.org/0.4/classification": {
            "@id": "https://schema.cassproject.org/0.4/classification",
            "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
            "http://schema.org/domainIncludes": [{
              "@id": "https://schema.cassproject.org/0.4/Competency"
            }],
            "http://schema.org/rangeIncludes": [{
              "@id": "http://schema.org/Text"
            }],
            "http://www.w3.org/2000/01/rdf-schema#comment": [{
              "@language": "en",
              "@value": "The classification of the competency."
            }],
            "http://www.w3.org/2000/01/rdf-schema#label": [{
              "@language": "en",
              "@value": "Classification"
            }],
            "heading": "General"
          },
          "https://schema.cassproject.org/0.4/markings": {
            "@id": "https://schema.cassproject.org/0.4/markings",
            "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
            "http://schema.org/domainIncludes": [{
              "@id": "https://schema.cassproject.org/0.4/Competency"
            }],
            "http://schema.org/rangeIncludes": [{
              "@id": "http://schema.org/Text"
            }],
            "http://www.w3.org/2000/01/rdf-schema#comment": [{
              "@language": "en",
              "@value": "The markings of the competency."
            }],
            "http://www.w3.org/2000/01/rdf-schema#label": [{
              "@language": "en",
              "@value": "Markings"
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
            "heading": "Connections"
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
              var _add = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee3(selectedCompetency, values) {
                return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee3$(_context3) {
                  while (1) switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return me.addRelationsToFramework(selectedCompetency, "narrows", values);
                    case 2:
                    case "end":
                      return _context3.stop();
                  }
                }, _callee3);
              }));
              function add(_x5, _x6) {
                return _add.apply(this, arguments);
              }
              return add;
            }(),
            "save": function save() {},
            "remove": function () {
              var _remove = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee4(source, target) {
                return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee4$(_context4) {
                  while (1) switch (_context4.prev = _context4.next) {
                    case 0:
                      _context4.next = 2;
                      return me.removeRelationFromFramework(source, "narrows", target);
                    case 2:
                    case "end":
                      return _context4.stop();
                  }
                }, _callee4);
              }));
              function remove(_x7, _x8) {
                return _remove.apply(this, arguments);
              }
              return remove;
            }(),
            "heading": "Connections"
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
              var _add2 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee5(selectedCompetency, values) {
                return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee5$(_context5) {
                  while (1) switch (_context5.prev = _context5.next) {
                    case 0:
                      _context5.next = 2;
                      return me.addRelationsToFramework(selectedCompetency, "broadens", values);
                    case 2:
                    case "end":
                      return _context5.stop();
                  }
                }, _callee5);
              }));
              function add(_x9, _x10) {
                return _add2.apply(this, arguments);
              }
              return add;
            }(),
            "save": function save() {},
            "remove": function () {
              var _remove2 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee6(source, target) {
                return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee6$(_context6) {
                  while (1) switch (_context6.prev = _context6.next) {
                    case 0:
                      _context6.next = 2;
                      return me.removeRelationFromFramework(source, "broadens", target);
                    case 2:
                    case "end":
                      return _context6.stop();
                  }
                }, _callee6);
              }));
              function remove(_x11, _x12) {
                return _remove2.apply(this, arguments);
              }
              return remove;
            }(),
            "heading": "Connections"
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
              var _add3 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee7(selectedCompetency, values) {
                return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee7$(_context7) {
                  while (1) switch (_context7.prev = _context7.next) {
                    case 0:
                      _context7.next = 2;
                      return me.addRelationsToFramework(selectedCompetency, "isEquivalentTo", values);
                    case 2:
                    case "end":
                      return _context7.stop();
                  }
                }, _callee7);
              }));
              function add(_x13, _x14) {
                return _add3.apply(this, arguments);
              }
              return add;
            }(),
            "save": function save() {},
            "remove": function () {
              var _remove3 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee8(source, target) {
                return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee8$(_context8) {
                  while (1) switch (_context8.prev = _context8.next) {
                    case 0:
                      _context8.next = 2;
                      return me.removeRelationFromFramework(source, "isEquivalentTo", target);
                    case 2:
                    case "end":
                      return _context8.stop();
                  }
                }, _callee8);
              }));
              function remove(_x15, _x16) {
                return _remove3.apply(this, arguments);
              }
              return remove;
            }(),
            "heading": "Connections"
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
              var _add4 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee9(selectedCompetency, values) {
                return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee9$(_context9) {
                  while (1) switch (_context9.prev = _context9.next) {
                    case 0:
                      _context9.next = 2;
                      return me.addRelationsToFramework(selectedCompetency, "requires", values);
                    case 2:
                    case "end":
                      return _context9.stop();
                  }
                }, _callee9);
              }));
              function add(_x17, _x18) {
                return _add4.apply(this, arguments);
              }
              return add;
            }(),
            "save": function save() {},
            "remove": function () {
              var _remove4 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee10(source, target) {
                return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee10$(_context10) {
                  while (1) switch (_context10.prev = _context10.next) {
                    case 0:
                      _context10.next = 2;
                      return me.removeRelationFromFramework(source, "requires", target);
                    case 2:
                    case "end":
                      return _context10.stop();
                  }
                }, _callee10);
              }));
              function remove(_x19, _x20) {
                return _remove4.apply(this, arguments);
              }
              return remove;
            }(),
            "heading": "Connections"
          },
          "isRequiredBy": {
            "http://schema.org/rangeIncludes": [{
              "@id": "https://schema.cassproject.org/0.4/Competency"
            }],
            "http://www.w3.org/2000/01/rdf-schema#comment": [{
              "@language": "en",
              "@value": "This is a prerequisite for another competency."
            }],
            "http://www.w3.org/2000/01/rdf-schema#label": [{
              "@language": "en",
              "@value": "Is Required By"
            }],
            "valuesIndexed": function valuesIndexed() {
              return me.relations["isRequiredBy"];
            },
            "noTextEditing": "true",
            "add": function () {
              var _add5 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee11(selectedCompetency, values) {
                return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee11$(_context11) {
                  while (1) switch (_context11.prev = _context11.next) {
                    case 0:
                      _context11.next = 2;
                      return me.addRelationsToFramework(selectedCompetency, "isRequiredBy", values);
                    case 2:
                    case "end":
                      return _context11.stop();
                  }
                }, _callee11);
              }));
              function add(_x21, _x22) {
                return _add5.apply(this, arguments);
              }
              return add;
            }(),
            "save": function save() {},
            "remove": function () {
              var _remove5 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee12(source, target) {
                return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee12$(_context12) {
                  while (1) switch (_context12.prev = _context12.next) {
                    case 0:
                      _context12.next = 2;
                      return me.removeRelationFromFramework(source, "isRequiredBy", target);
                    case 2:
                    case "end":
                      return _context12.stop();
                  }
                }, _callee12);
              }));
              function remove(_x23, _x24) {
                return _remove5.apply(this, arguments);
              }
              return remove;
            }(),
            "heading": "Connections"
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
              var _add6 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee13(selectedCompetency, values) {
                return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee13$(_context13) {
                  while (1) switch (_context13.prev = _context13.next) {
                    case 0:
                      _context13.next = 2;
                      return me.addRelationsToFramework(selectedCompetency, "isEnabledBy", values);
                    case 2:
                    case "end":
                      return _context13.stop();
                  }
                }, _callee13);
              }));
              function add(_x25, _x26) {
                return _add6.apply(this, arguments);
              }
              return add;
            }(),
            "save": function save() {},
            "remove": function () {
              var _remove6 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee14(source, target) {
                return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee14$(_context14) {
                  while (1) switch (_context14.prev = _context14.next) {
                    case 0:
                      _context14.next = 2;
                      return me.removeRelationFromFramework(source, "isEnabledBy", target);
                    case 2:
                    case "end":
                      return _context14.stop();
                  }
                }, _callee14);
              }));
              function remove(_x27, _x28) {
                return _remove6.apply(this, arguments);
              }
              return remove;
            }(),
            "heading": "Connections"
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
              var _add7 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee15(selectedCompetency, values) {
                return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee15$(_context15) {
                  while (1) switch (_context15.prev = _context15.next) {
                    case 0:
                      _context15.next = 2;
                      return me.addRelationsToFramework(selectedCompetency, "isRelatedTo", values);
                    case 2:
                    case "end":
                      return _context15.stop();
                  }
                }, _callee15);
              }));
              function add(_x29, _x30) {
                return _add7.apply(this, arguments);
              }
              return add;
            }(),
            "save": function save() {},
            "remove": function () {
              var _remove7 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee16(source, target) {
                return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee16$(_context16) {
                  while (1) switch (_context16.prev = _context16.next) {
                    case 0:
                      _context16.next = 2;
                      return me.removeRelationFromFramework(source, "isRelatedTo", target);
                    case 2:
                    case "end":
                      return _context16.stop();
                  }
                }, _callee16);
              }));
              function remove(_x31, _x32) {
                return _remove7.apply(this, arguments);
              }
              return remove;
            }(),
            "heading": "Connections"
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
              var _add8 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee17(selectedCompetency, values) {
                return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee17$(_context17) {
                  while (1) switch (_context17.prev = _context17.next) {
                    case 0:
                      _context17.next = 2;
                      return me.addRelationsToFramework(selectedCompetency, "desires", values);
                    case 2:
                    case "end":
                      return _context17.stop();
                  }
                }, _callee17);
              }));
              function add(_x33, _x34) {
                return _add8.apply(this, arguments);
              }
              return add;
            }(),
            "save": function save() {},
            "remove": function () {
              var _remove8 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee18(source, target) {
                return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee18$(_context18) {
                  while (1) switch (_context18.prev = _context18.next) {
                    case 0:
                      _context18.next = 2;
                      return me.removeRelationFromFramework(source, "desires", target);
                    case 2:
                    case "end":
                      return _context18.stop();
                  }
                }, _callee18);
              }));
              function remove(_x35, _x36) {
                return _remove8.apply(this, arguments);
              }
              return remove;
            }(),
            "heading": "Connections"
          },
          "isDesiredBy": {
            "http://schema.org/rangeIncludes": [{
              "@id": "https://schema.cassproject.org/0.4/Competency"
            }],
            "http://www.w3.org/2000/01/rdf-schema#comment": [{
              "@language": "en",
              "@value": "This is recommended, assumed, or expected but not essential to acquisition of another competency."
            }],
            "http://www.w3.org/2000/01/rdf-schema#label": [{
              "@language": "en",
              "@value": "Is Desired By"
            }],
            "valuesIndexed": function valuesIndexed() {
              return me.relations["isDesiredBy"];
            },
            "noTextEditing": "true",
            "add": function () {
              var _add9 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee19(selectedCompetency, values) {
                return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee19$(_context19) {
                  while (1) switch (_context19.prev = _context19.next) {
                    case 0:
                      _context19.next = 2;
                      return me.addRelationsToFramework(selectedCompetency, "isDesiredBy", values);
                    case 2:
                    case "end":
                      return _context19.stop();
                  }
                }, _callee19);
              }));
              function add(_x37, _x38) {
                return _add9.apply(this, arguments);
              }
              return add;
            }(),
            "save": function save() {},
            "remove": function () {
              var _remove9 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee20(source, target) {
                return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee20$(_context20) {
                  while (1) switch (_context20.prev = _context20.next) {
                    case 0:
                      _context20.next = 2;
                      return me.removeRelationFromFramework(source, "isDesiredBy", target);
                    case 2:
                    case "end":
                      return _context20.stop();
                  }
                }, _callee20);
              }));
              function remove(_x39, _x40) {
                return _remove9.apply(this, arguments);
              }
              return remove;
            }(),
            "heading": "Connections"
          },
          "headings": ["General", "Connections", "Keys"],
          "primaryProperties": ["http://schema.org/name", "http://schema.org/description", "https://schema.cassproject.org/0.4/classification", "https://schema.cassproject.org/0.4/markings"],
          "secondaryProperties": ["@id", "https://schema.cassproject.org/0.4/scope", "https://schema.cassproject.org/0.4/Level"],
          "tertiaryProperties": ["narrows", "broadens", "isEquivalentTo", "requires", "isEnabledBy", "isRelatedTo", "desires", "isDesiredBy", "isRequiredBy"]
        };
      }
    },
    defaultFrameworkConfiguration: function defaultFrameworkConfiguration() {
      return this.$store.getters['editor/framework'] ? this.$store.getters['editor/framework'].configuration : null;
    },
    canEdit: function canEdit() {
      if (this.queryParams.view === 'true') {
        return false;
      }
      if (this.framework != null) {
        return this.canEditAny(this.framework);
      }
      return false;
    }
  },
  created: function created() {
    // Set configuration create() happens before mount, make sure framework exists in case
    // the page was being refreshed and no longer exists.
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
    this.$store.commit('app/objForShareModal', this.object);
    var documentBody = document.getElementsByClassName('cass--main-layout--body')[0];
    documentBody.addEventListener('scroll', debounce_default()(this.scrollFunction, 20, {
      'immediate': true
    }));
    if (!this.framework.competency || this.framework.competency.length === 0) {
      this.hierarchyIsdoneLoading = true;
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.queryParams && this.queryParams.private !== 'true') {
      this.$store.commit('editor/private', false);
    }
  },
  watch: {
    shortId: function shortId() {
      this.refreshPage();
    },
    config: function config() {
      this.$store.commit('editor/configuration', this.config);
    },
    commentScrollTo: function commentScrollTo() {
      this.$scrollTo(this.commentScrollTo.scrollId);
    },
    defaultFrameworkConfiguration: function defaultFrameworkConfiguration() {
      this.getConfiguration();
    },
    frameworkDrag: function frameworkDrag() {
      if (this.frameworkDrag.length > 0) {
        var id = EcRemoteLinkedData.trimVersionFromUrl(this.frameworkDrag[0].obj.id);
        this.moveToTopLevel(id);
        this.frameworkDrag = [];
      }
    },
    configHasLevels: function configHasLevels() {
      if (this.hierarchyIsdoneLoading) {
        this.gotInitialLevelsRelationsAndAlignments = false;
        this.preloadRelations();
      }
    }
  },
  methods: {
    handleDoneLoading: function handleDoneLoading() {
      appLog("done loading");
      this.hierarchyIsdoneLoading = true;
    },
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
    getConfiguration: function () {
      var _getConfiguration = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee21() {
        var me, c;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee21$(_context21) {
          while (1) switch (_context21.prev = _context21.next) {
            case 0:
              me = this;
              if (!this.framework.configuration) {
                _context21.next = 8;
                break;
              }
              _context21.next = 4;
              return EcRepository.get(this.framework.configuration);
            case 4:
              c = _context21.sent;
              appLog("c is: ", c);
              if (c) {
                appLog("c is: ", c);
                this.config = c;
                this.configSetOnFramework = true;
              }
              appLog("c is: ", c);
            case 8:
              if (!(!this.config && localStorage.getItem("cassAuthoringToolDefaultBrowserConfigId"))) {
                _context21.next = 13;
                break;
              }
              _context21.next = 11;
              return EcRepository.get(localStorage.getItem("cassAuthoringToolDefaultBrowserConfigId"));
            case 11:
              c = _context21.sent;
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
              return _context21.stop();
          }
        }, _callee21, this);
      }));
      function getConfiguration() {
        return _getConfiguration.apply(this, arguments);
      }
      return getConfiguration;
    }(),
    onCancelEditMultiple: function onCancelEditMultiple() {
      this.showEditMultiple = false;
    },
    onEditMultiple: function onEditMultiple() {
      this.showEditMultiple = true;
      var payload = {
        profile: this.competencyProfile,
        selectedCompetencies: this.selectedArray,
        component: 'MultiEdit'
      };
      this.$store.commit('app/showModal', payload);
    },
    onEditNode: function onEditNode() {
      this.editingFramework = true;
    },
    onDoneEditingNode: function onDoneEditingNode() {
      this.$store.commit('editor/newFramework', null);
      this.editingFramework = false;
    },
    onOpenComments: function onOpenComments() {
      this.showComments = true;
    },
    onCloseComments: function onCloseComments() {
      this.showComments = false;
    },
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
        if (!EcArray.isArray(this.queryParams.highlightCompetency)) {
          this.highlightCompetency = [this.queryParams.highlightCompetency];
        } else {
          this.highlightCompetency = this.queryParams.highlightCompetency;
        }
      }
    },
    changeProperties: function changeProperties(type) {
      this.properties = type;
    },
    onSelectButtonClick: function onSelectButtonClick(ids) {
      this.selectButton(ids);
    },
    onOpenExportModal: function onOpenExportModal() {
      this.$store.commit('editor/setItemToExport', this.framework);
      this.$store.commit('app/showModal', {
        title: 'Export Framework',
        component: 'ExportOptionsModal'
      });
    },
    // Speed up load of secondary properties
    preloadRelations: function preloadRelations() {
      this.handleDoneLoading();
      if (!this.gotInitialLevelsRelationsAndAlignments) {
        if (this.configHasLevels) {
          this.updateLevels();
        }
        this.updateRelations();
        if (this.configHasAlignments) {
          this.updateAlignments();
        }
        this.gotInitialLevelsRelationsAndAlignments = true;
      }
    },
    addResourceAlignments: function addResourceAlignments(selectedCompetencyId, alignmentType, values) {
      var _this2 = this;
      var me = this;
      alignmentType = alignmentType.substring(0, alignmentType.indexOf(' '));
      var _loop3 = function _loop3() {
        var c = new schema.CreativeWork();
        c.generateId(_this2.repo.selectedServer);
        c.name = values[i]["name"];
        c.url = values[i]["@value"];
        c.educationalAlignment = new schema.AlignmentObject();
        c.educationalAlignment.targetUrl = selectedCompetencyId;
        c.educationalAlignment.alignmentType = alignmentType;
        if (EcIdentityManager.default.ids.length > 0) {
          c.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
        }
        _this2.repo.saveTo(c, function () {
          var edits = [{
            operation: "addNew",
            id: c.shortId()
          }];
          me.$store.commit('editor/addEditsToUndo', edits);
          me.$store.commit('editor/refreshAlignments', true);
        }, appError);
      };
      for (var i = 0; i < values.length; i++) {
        _loop3();
      }
    },
    updateResourceAlignments: function () {
      var _updateResourceAlignments = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee22(alignmentType, value) {
        var me, c, initialName, initialUrl;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee22$(_context22) {
          while (1) switch (_context22.prev = _context22.next) {
            case 0:
              me = this;
              if (!(value["name"] && value["@value"])) {
                _context22.next = 10;
                break;
              }
              _context22.next = 4;
              return EcRepository.get(value["@id"]);
            case 4:
              c = _context22.sent;
              initialName = c.name;
              initialUrl = c.url;
              c.name = value["name"];
              c.url = value["@value"];
              this.repo.saveTo(c, function () {
                var edits = [{
                  operation: "update",
                  id: c.shortId(),
                  fieldChanged: ["name", "url"],
                  initialValue: [initialName, initialUrl],
                  changedValue: [c.name, c.url]
                }];
                me.$store.commit('editor/addEditsToUndo', edits);
                me.$store.commit('editor/refreshAlignments', true);
              }, appError);
            case 10:
            case "end":
              return _context22.stop();
          }
        }, _callee22, this);
      }));
      function updateResourceAlignments(_x41, _x42) {
        return _updateResourceAlignments.apply(this, arguments);
      }
      return updateResourceAlignments;
    }(),
    removeResourceAlignment: function () {
      var _removeResourceAlignment = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee23(resourceId) {
        var c, me;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee23$(_context23) {
          while (1) switch (_context23.prev = _context23.next) {
            case 0:
              _context23.next = 2;
              return EcRepository.get(resourceId);
            case 2:
              c = _context23.sent;
              me = this;
              this.repo.deleteRegistered(c, function () {
                me.$store.commit('editor/addEditsToUndo', [{
                  operation: "delete",
                  obj: c
                }]);
                me.$store.commit('editor/refreshAlignments', true);
              }, appError);
            case 5:
            case "end":
              return _context23.stop();
          }
        }, _callee23, this);
      }));
      function removeResourceAlignment(_x43) {
        return _removeResourceAlignment.apply(this, arguments);
      }
      return removeResourceAlignment;
    }(),
    moveToTopLevel: function () {
      var _moveToTopLevel = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee24(id) {
        var me, i, a;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee24$(_context24) {
          while (1) switch (_context24.prev = _context24.next) {
            case 0:
              me = this;
              i = 0;
            case 2:
              if (!(i < this.framework.relation.length)) {
                _context24.next = 21;
                break;
              }
              _context24.next = 5;
              return EcAlignment.get(this.framework.relation[i]);
            case 5:
              a = _context24.sent;
              if (!(a == null)) {
                _context24.next = 8;
                break;
              }
              return _context24.abrupt("continue", 18);
            case 8:
              if (!(a.relationType === "narrows")) {
                _context24.next = 17;
                break;
              }
              if (!(a.target == null)) {
                _context24.next = 11;
                break;
              }
              return _context24.abrupt("continue", 18);
            case 11:
              if (!(a.source == null)) {
                _context24.next = 13;
                break;
              }
              return _context24.abrupt("continue", 18);
            case 13:
              if (!(a.source !== id)) {
                _context24.next = 15;
                break;
              }
              return _context24.abrupt("continue", 18);
            case 15:
              appLog("Identified edge to remove: ", JSON.parse(a.toJson()));
              this.framework.relation.splice(i--, 1);
            case 17:
              repo.saveTo(this.framework, function () {
                me.once = true;
              }, function () {});
            case 18:
              i++;
              _context24.next = 2;
              break;
            case 21:
            case "end":
              return _context24.stop();
          }
        }, _callee24, this);
      }));
      function moveToTopLevel(_x44) {
        return _moveToTopLevel.apply(this, arguments);
      }
      return moveToTopLevel;
    }()
  }
});
// CONCATENATED MODULE: ./src/views/framework/Framework.vue?vue&type=script&lang=js
 /* harmony default export */ var framework_Frameworkvue_type_script_lang_js = (Frameworkvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/views/framework/Framework.vue?vue&type=style&index=0&id=66ce4521&prod&lang=scss
var Frameworkvue_type_style_index_0_id_66ce4521_prod_lang_scss = __webpack_require__("255d");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/views/framework/Framework.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  framework_Frameworkvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Framework = __webpack_exports__["default"] = (component.exports);

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

/***/ "63df":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MainLayout_vue_vue_type_style_index_0_id_7780b418_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fc26");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MainLayout_vue_vue_type_style_index_0_id_7780b418_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MainLayout_vue_vue_type_style_index_0_id_7780b418_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "6ffa4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fb6a");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("14d9");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("c7eb");
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("1da1");
/* harmony import */ var _mixins_common_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("872c");







/* harmony default export */ __webpack_exports__["a"] = ({
  mixins: [_mixins_common_js__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]],
  methods: {
    removeObject: function removeObject(thing) {
      // Remove from container but don't delete
      appLog("removing " + thing.id);
      var me = this;
      var thisFramework = this.$store.getters['editor/framework'];
      var initialCompetencies = thisFramework.competency ? thisFramework.competency.slice() : null;
      var initialRelations = thisFramework.relation ? thisFramework.relation.slice() : null;
      var initialLevels = thisFramework.level ? thisFramework.level.slice() : null;
      thisFramework["schema:dateModified"] = new Date().toISOString();
      thisFramework.removeCompetency(thing.shortId(), /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().mark(function _callee() {
        var framework;
        return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              framework = me.framework;
              me.$store.commit('editor/addEditsToUndo', [{
                operation: "update",
                id: framework.shortId(),
                fieldChanged: ["competency", "relation", "level"],
                initialValue: [initialCompetencies, initialRelations, initialLevels]
              }]);
              if (!(me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[f.id] !== true)) {
                _context.next = 6;
                break;
              }
              _context.next = 5;
              return EcEncryptedValue.toEncryptedValue(framework);
            case 5:
              framework = _context.sent;
            case 6:
              window.repo.saveTo(framework, function () {
                me.$store.commit('editor/framework', thisFramework);
              }, appError);
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee);
      })), appLog);
    },
    deleteObject: function deleteObject(thing) {
      appLog("deleting " + thing.id);
      var me = this;
      var framework = this.$store.getters['editor/framework'];
      if (thing.shortId() === framework.shortId()) {
        // delete framework
        window.repo.deleteRegistered(framework, function (success) {
          me.spitEvent("frameworkDeleted", framework.shortId(), "editFrameworkSection");
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
          me.$store.commit('editor/framework', null);
          if (me.importType) {
            // Calling function from import page
            me.$store.commit('app/importFramework', null);
          } else {
            me.$router.push({
              name: "frameworks"
            });
          }
        }, appLog);
      } else {
        // Delete competency and relations
        var initialCompetencies = framework.competency ? framework.competency.slice() : null;
        var initialRelations = framework.relation ? framework.relation.slice() : null;
        var initialLevels = framework.level ? framework.level.slice() : null;
        this.$store.commit('editor/selectedCompetency', thing);
        framework["schema:dateModified"] = new Date().toISOString();
        framework.removeCompetency(thing.shortId(), /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().mark(function _callee2() {
          var frameworkToSave;
          return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                framework.removeLevel(thing.shortId());
                me.$store.commit('editor/addEditsToUndo', [{
                  operation: "delete",
                  obj: thing
                }, {
                  operation: "update",
                  id: framework.shortId(),
                  fieldChanged: ["competency", "relation", "level"],
                  initialValue: [initialCompetencies, initialRelations, initialLevels],
                  changedValue: [framework.competency, framework.relation, framework.level]
                }]);
                me.conditionalDelete(thing.shortId());
                me.spitEvent("competencyDeleted", thing.shortId(), "editFrameworkSection");
                me.$store.commit('editor/selectedCompetency', null);
                frameworkToSave = framework;
                if (!(me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true)) {
                  _context2.next = 10;
                  break;
                }
                _context2.next = 9;
                return EcEncryptedValue.toEncryptedValue(framework);
              case 9:
                frameworkToSave = _context2.sent;
              case 10:
                window.repo.saveTo(frameworkToSave, function () {
                  me.$store.commit('editor/framework', framework);
                }, appError);
              case 11:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        })), appLog);
      }
    }
  }
});

/***/ }),

/***/ "713b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3c28eb14-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/layouts/MainLayout.vue?vue&type=template&id=7780b418
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

/***/ "79db":
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

/***/ "acac":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__("e330");
var defineBuiltIns = __webpack_require__("6964");
var getWeakData = __webpack_require__("f183").getWeakData;
var anInstance = __webpack_require__("19aa");
var anObject = __webpack_require__("825a");
var isNullOrUndefined = __webpack_require__("7234");
var isObject = __webpack_require__("861d");
var iterate = __webpack_require__("2266");
var ArrayIterationModule = __webpack_require__("b727");
var hasOwn = __webpack_require__("1a2d");
var InternalStateModule = __webpack_require__("69f3");

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;
var find = ArrayIterationModule.find;
var findIndex = ArrayIterationModule.findIndex;
var splice = uncurryThis([].splice);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (state) {
  return state.frozen || (state.frozen = new UncaughtFrozenStore());
};

var UncaughtFrozenStore = function () {
  this.entries = [];
};

var findUncaughtFrozen = function (store, key) {
  return find(store.entries, function (it) {
    return it[0] === key;
  });
};

UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.entries.push([key, value]);
  },
  'delete': function (key) {
    var index = findIndex(this.entries, function (it) {
      return it[0] === key;
    });
    if (~index) splice(this.entries, index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var Constructor = wrapper(function (that, iterable) {
      anInstance(that, Prototype);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        id: id++,
        frozen: undefined
      });
      if (!isNullOrUndefined(iterable)) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
    });

    var Prototype = Constructor.prototype;

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var data = getWeakData(anObject(key), true);
      if (data === true) uncaughtFrozenStore(state).set(key, value);
      else data[state.id] = value;
      return that;
    };

    defineBuiltIns(Prototype, {
      // `{ WeakMap, WeakSet }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-weakmap.prototype.delete
      // https://tc39.es/ecma262/#sec-weakset.prototype.delete
      'delete': function (key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state)['delete'](key);
        return data && hasOwn(data, state.id) && delete data[state.id];
      },
      // `{ WeakMap, WeakSet }.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-weakmap.prototype.has
      // https://tc39.es/ecma262/#sec-weakset.prototype.has
      has: function has(key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state).has(key);
        return data && hasOwn(data, state.id);
      }
    });

    defineBuiltIns(Prototype, IS_MAP ? {
      // `WeakMap.prototype.get(key)` method
      // https://tc39.es/ecma262/#sec-weakmap.prototype.get
      get: function get(key) {
        var state = getInternalState(this);
        if (isObject(key)) {
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state).get(key);
          return data ? data[state.id] : undefined;
        }
      },
      // `WeakMap.prototype.set(key, value)` method
      // https://tc39.es/ecma262/#sec-weakmap.prototype.set
      set: function set(key, value) {
        return define(this, key, value);
      }
    } : {
      // `WeakSet.prototype.add(value)` method
      // https://tc39.es/ecma262/#sec-weakset.prototype.add
      add: function add(value) {
        return define(this, value, true);
      }
    });

    return Constructor;
  }
};


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

/***/ "b1ab3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__("3ca3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
var regeneratorRuntime = __webpack_require__("c7eb");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
var createForOfIteratorHelper = __webpack_require__("b85c");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.error.cause.js
var es_error_cause = __webpack_require__("d9e2");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/checkPrivateRedeclaration.js

function _checkPrivateRedeclaration(obj, privateCollection) {
  if (privateCollection.has(obj)) {
    throw new TypeError("Cannot initialize the same private elements twice on an object");
  }
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/classPrivateFieldInitSpec.js

function _classPrivateFieldInitSpec(obj, privateMap, value) {
  _checkPrivateRedeclaration(obj, privateMap);
  privateMap.set(obj, value);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/classApplyDescriptorSet.js

function _classApplyDescriptorSet(receiver, descriptor, value) {
  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }
    descriptor.value = value;
  }
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/classExtractFieldDescriptor.js

function _classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to " + action + " private field on non-instance");
  }
  return privateMap.get(receiver);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/classPrivateFieldSet.js


function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
  _classApplyDescriptorSet(receiver, descriptor, value);
  return value;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/classApplyDescriptorGet.js
function _classApplyDescriptorGet(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }
  return descriptor.value;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/classPrivateFieldGet.js


function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
  return _classApplyDescriptorGet(receiver, descriptor);
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js + 1 modules
var toPropertyKey = __webpack_require__("a38e");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, Object(toPropertyKey["a" /* default */])(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__("ade3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.weak-map.js
var es_weak_map = __webpack_require__("10d1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.iterator.js
var es_symbol_iterator = __webpack_require__("d28b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__("a4d3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.description.js
var es_symbol_description = __webpack_require__("e01a");

// CONCATENATED MODULE: ./node_modules/yocto-queue/index.js







var _Symbol$iterator;







/*
How it works:
`this.#head` is an instance of `Node` which keeps track of its current value and nests another instance of `Node` that keeps the value that comes after it. When a value is provided to `.enqueue()`, the code needs to iterate through `this.#head`, going deeper and deeper to find the last value. However, iterating through every single item is slow. This problem is solved by saving a reference to the last value as `this.#tail` so that it can reference it to add a new value.
*/
var yocto_queue_Node = /*#__PURE__*/_createClass(function Node(value) {
  _classCallCheck(this, Node);
  Object(defineProperty["a" /* default */])(this, "value", void 0);
  Object(defineProperty["a" /* default */])(this, "next", void 0);
  this.value = value;
});
var _head = /*#__PURE__*/new WeakMap();
var _tail = /*#__PURE__*/new WeakMap();
var _size = /*#__PURE__*/new WeakMap();
_Symbol$iterator = Symbol.iterator;
var yocto_queue_Queue = /*#__PURE__*/function () {
  function Queue() {
    _classCallCheck(this, Queue);
    _classPrivateFieldInitSpec(this, _head, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _tail, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _size, {
      writable: true,
      value: void 0
    });
    this.clear();
  }
  _createClass(Queue, [{
    key: "enqueue",
    value: function enqueue(value) {
      var _this$size, _this$size2;
      var node = new yocto_queue_Node(value);
      if (_classPrivateFieldGet(this, _head)) {
        _classPrivateFieldGet(this, _tail).next = node;
        _classPrivateFieldSet(this, _tail, node);
      } else {
        _classPrivateFieldSet(this, _head, node);
        _classPrivateFieldSet(this, _tail, node);
      }
      _classPrivateFieldSet(this, _size, (_this$size = _classPrivateFieldGet(this, _size), _this$size2 = _this$size++, _this$size)), _this$size2;
    }
  }, {
    key: "dequeue",
    value: function dequeue() {
      var _this$size3, _this$size4;
      var current = _classPrivateFieldGet(this, _head);
      if (!current) {
        return;
      }
      _classPrivateFieldSet(this, _head, _classPrivateFieldGet(this, _head).next);
      _classPrivateFieldSet(this, _size, (_this$size3 = _classPrivateFieldGet(this, _size), _this$size4 = _this$size3--, _this$size3)), _this$size4;
      return current.value;
    }
  }, {
    key: "clear",
    value: function clear() {
      _classPrivateFieldSet(this, _head, undefined);
      _classPrivateFieldSet(this, _tail, undefined);
      _classPrivateFieldSet(this, _size, 0);
    }
  }, {
    key: "size",
    get: function get() {
      return _classPrivateFieldGet(this, _size);
    }
  }, {
    key: _Symbol$iterator,
    value: /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function value() {
      var current;
      return Object(regeneratorRuntime["a" /* default */])().wrap(function value$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            current = _classPrivateFieldGet(this, _head);
          case 1:
            if (!current) {
              _context.next = 7;
              break;
            }
            _context.next = 4;
            return current.value;
          case 4:
            current = current.next;
            _context.next = 1;
            break;
          case 7:
          case "end":
            return _context.stop();
        }
      }, value, this);
    })
  }]);
  return Queue;
}();

// CONCATENATED MODULE: ./node_modules/p-limit/index.js


function pLimit(concurrency) {
	if (!((Number.isInteger(concurrency) || concurrency === Number.POSITIVE_INFINITY) && concurrency > 0)) {
		throw new TypeError('Expected `concurrency` to be a number from 1 and up');
	}

	const queue = new yocto_queue_Queue();
	let activeCount = 0;

	const next = () => {
		activeCount--;

		if (queue.size > 0) {
			queue.dequeue()();
		}
	};

	const run = async (fn, resolve, args) => {
		activeCount++;

		const result = (async () => fn(...args))();

		resolve(result);

		try {
			await result;
		} catch {}

		next();
	};

	const enqueue = (fn, resolve, args) => {
		queue.enqueue(run.bind(undefined, fn, resolve, args));

		(async () => {
			// This function needs to wait until the next microtask before comparing
			// `activeCount` to `concurrency`, because `activeCount` is updated asynchronously
			// when the run function is dequeued and called. The comparison in the if-statement
			// needs to happen asynchronously as well to get an up-to-date value for `activeCount`.
			await Promise.resolve();

			if (activeCount < concurrency && queue.size > 0) {
				queue.dequeue()();
			}
		})();
	};

	const generator = (fn, ...args) => new Promise(resolve => {
		enqueue(fn, resolve, args);
	});

	Object.defineProperties(generator, {
		activeCount: {
			get: () => activeCount,
		},
		pendingCount: {
			get: () => queue.size,
		},
		clearQueue: {
			value: () => {
				queue.clear();
			},
		},
	});

	return generator;
}

// CONCATENATED MODULE: ./src/mixins/getLevelsAndRelations.js














var limit = pLimit(50);
/* harmony default export */ var getLevelsAndRelations = __webpack_exports__["a"] = ({
  data: function data() {
    return {
      levels: null,
      relations: {},
      alignments: {}
    };
  },
  watch: {
    refreshLevels: function refreshLevels() {
      if (this.refreshLevels) {
        this.updateLevels();
      }
    },
    relationArray: function relationArray() {
      this.updateRelations();
    },
    refreshAlignments: function refreshAlignments() {
      if (this.refreshAlignments) {
        this.updateAlignments();
      }
    }
  },
  computed: {
    refreshLevels: function refreshLevels() {
      return this.$store.getters['editor/refreshLevels'];
    },
    relationArray: function relationArray() {
      if (this.framework) {
        return this.framework.relation;
      } else if (this.importFramework) {
        return this.importFramework.relation;
      }
    },
    refreshAlignments: function refreshAlignments() {
      return this.$store.getters['editor/refreshAlignments'];
    }
  },
  methods: {
    updateLevels: function updateLevels() {
      var me = this;
      // Make reactive when the same level is applied to multiple competencies in the same framework
      if (this.$store.getters['editor/refreshLevels'] === true) {
        this.$store.commit('editor/refreshLevels', false);
      }
      var levels = {};
      if (!this.framework) {
        return;
      }
      if (!this.framework.level) {
        this.levels = null;
        return;
      }
      new EcAsyncHelper().each(this.framework.level, function (levelId, done) {
        EcLevel.get(levelId, function (level) {
          var comp = level.competency;
          if (!EcArray.isArray(comp)) {
            comp = [comp];
          }
          for (var j = 0; j < comp.length; j++) {
            if (!EcArray.isArray(levels[comp[j]])) {
              levels[comp[j]] = [];
            }
            levels[comp[j]].push({
              "@id": level.shortId()
            });
          }
          done();
        }, done);
      }, function (levelIds) {
        me.levels = levels;
      });
    },
    updateRelations: function updateRelations() {
      var _this$framework, _this$importFramework;
      if (!((_this$framework = this.framework) !== null && _this$framework !== void 0 && _this$framework.relation) && !((_this$importFramework = this.importFramework) !== null && _this$importFramework !== void 0 && _this$importFramework.relation)) {
        this.relations = {};
        this.$store.commit('editor/relations', {});
        return;
      }
      var me = this;
      var relations = [];
      new EcAsyncHelper().each(this.framework ? this.framework.relation : this.importFramework.relation, function (relationId, done) {
        EcAlignment.get(relationId, function (a) {
          if (a && a.source && a.target) {
            var relation = {};
            var relationType = a.relationType;
            var reciprocalRelation = null;
            if (me.queryParams.ceasnDataFields === "true" && relationType === "narrows") {
              var framework = me.framework;
              if (!framework) {
                framework = me.importFramework;
              }
              if (framework.competency.indexOf(a.target) !== -1 && framework.competency.indexOf(a.source) !== -1) {
                relationType = "isChildOf";
                reciprocalRelation = "hasChild";
              }
            }
            if (relationType === "narrows") {
              reciprocalRelation = "broadens";
            } else if (relationType === "broadens") {
              reciprocalRelation = "narrows";
            } else if (relationType === "isEquivalentTo") {
              reciprocalRelation = "isEquivalentTo";
            } else if (relationType === "requires") {
              reciprocalRelation = "isRequiredBy";
            } else if (relationType === "desires") {
              reciprocalRelation = "isDesiredBy";
            } else if (relationType === "isRelatedTo") {
              reciprocalRelation = "isRelatedTo";
            }
            relation.type = relationType;
            relation.source = a.source;
            relation.target = {
              "@id": a.target
            };
            relations.push(relation);
            if (reciprocalRelation) {
              var reciprocal = {};
              reciprocal.type = reciprocalRelation;
              reciprocal.source = a.target;
              reciprocal.target = {
                "@id": a.source
              };
              relations.push(reciprocal);
            }
          }
          done();
        }, done);
      }, function (relationIds) {
        var relationObject = {};
        for (var i = 0; i < relations.length; i++) {
          var each = relations[i];
          if (!relationObject[each.type]) {
            relationObject[each.type] = {};
          }
          if (!relationObject[each.type][each.source]) {
            relationObject[each.type][each.source] = [];
          }
          relationObject[each.type][each.source].push(each.target);
        }
        me.relations = relationObject;
        me.$store.commit('editor/relations', me.relations);
      });
    },
    updateAlignments: function () {
      var _updateAlignments = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee() {
        var me, alignments, promises, _iterator, _step, _loop;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              me = this;
              if (this.$store.getters['editor/refreshAlignments'] === true) {
                this.$store.commit('editor/refreshAlignments', false);
              }
              if (this.framework) {
                _context2.next = 4;
                break;
              }
              return _context2.abrupt("return");
            case 4:
              if (this.framework.competency) {
                _context2.next = 6;
                break;
              }
              return _context2.abrupt("return");
            case 6:
              alignments = {};
              promises = [];
              _iterator = Object(createForOfIteratorHelper["a" /* default */])(this.framework.competency);
              _context2.prev = 9;
              _loop = /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _loop() {
                var compId;
                return Object(regeneratorRuntime["a" /* default */])().wrap(function _loop$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      compId = _step.value;
                      promises.push(limit(function () {
                        return new Promise(function (resolve) {
                          var search = "@type:CreativeWork AND educationalAlignment.targetUrl:\"" + compId + "\"";
                          me.repo.searchWithParams(search, {
                            size: 25
                          }).then(function (resources) {
                            for (var i = 0; i < resources.length; i++) {
                              var resourceType = resources[i].educationalAlignment.alignmentType + " (resource)";
                              if (!alignments[resourceType]) {
                                alignments[resourceType] = {};
                              }
                              if (!alignments[resourceType][compId]) {
                                alignments[resourceType][compId] = [];
                              }
                              alignments[resourceType][compId].push({
                                "@id": resources[i].shortId(),
                                "name": resources[i].name,
                                "@value": resources[i].url
                              });
                            }
                            resolve();
                          });
                        });
                      }));
                    case 2:
                    case "end":
                      return _context.stop();
                  }
                }, _loop);
              });
              _iterator.s();
            case 12:
              if ((_step = _iterator.n()).done) {
                _context2.next = 16;
                break;
              }
              return _context2.delegateYield(_loop(), "t0", 14);
            case 14:
              _context2.next = 12;
              break;
            case 16:
              _context2.next = 21;
              break;
            case 18:
              _context2.prev = 18;
              _context2.t1 = _context2["catch"](9);
              _iterator.e(_context2.t1);
            case 21:
              _context2.prev = 21;
              _iterator.f();
              return _context2.finish(21);
            case 24:
              _context2.next = 26;
              return Promise.all(promises);
            case 26:
              me.alignments = alignments;
            case 27:
            case "end":
              return _context2.stop();
          }
        }, _callee, this, [[9, 18, 21, 24]]);
      }));
      function updateAlignments() {
        return _updateAlignments.apply(this, arguments);
      }
      return updateAlignments;
    }()
  }
});

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
//# sourceMappingURL=framework.bd318ad2.js.map