(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["crosswalk","chunk-2d22bdc1","chunk-2d21ecda","chunk-6b291276","chunk-dc2b4b7e","chunk-25a2af2a","chunk-25a2af2a","chunk-74a95bb3"],{

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

/***/ "1cfb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__("a4d3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.description.js
var es_symbol_description = __webpack_require__("e01a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("fb6a");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"18a0cdb9-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/framework/Crosswalk.vue?vue&type=template&id=55ef896c





var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_c('div', {
    staticClass: "modal",
    class: [{
      'is-active': _vm.crosswalkSaveBusy
    }]
  }, [_c('div', {
    staticClass: "modal-background"
  }), _vm._m(0)]), _c('main-layout', {
    attrs: {
      "rightActive": _vm.showRightAside,
      "simple": true
    }
  }, [_c('template', {
    slot: "top"
  }, [_c('div', {
    staticClass: "crosswalk-topbar"
  }, [_c('div', {
    staticClass: "columns is-spaced is-vcentered is-multiline is-mobile",
    staticStyle: {
      "width": "100%"
    }
  }, [_c('div', {
    staticClass: "column"
  }, [_c('h2', {
    staticClass: "has-text-dark has-text-weight-bold is-size-5 text-align-left"
  }, [_vm._v(" Crosswalk ")])]), _c('div', {
    staticClass: "column"
  }, [_c('span', {
    staticClass: "tags"
  }, [_vm.alignmentsToSave.length > 0 ? _c('span', {
    staticClass: "is-size-6 is-dark tag"
  }, [_vm._v(" adding " + _vm._s(_vm.alignmentsToSave.length) + " ")]) : _vm._e(), _vm.alignmentsToDelete.length > 0 ? _c('span', {
    staticClass: "tag is-size-6 is-dark"
  }, [_vm._v(" removing " + _vm._s(_vm.alignmentsToDelete.length) + " ")]) : _vm._e()])]), _c('div', {
    staticClass: "column"
  }, [_c('div', {
    staticClass: "buttons is-right"
  }, [_c('a', {
    staticClass: "button is-primary is-outlined",
    attrs: {
      "href": "docs/authoring/crosswalk-tool/",
      "target": "_blank",
      "title": "Go to documentation on crosswalking"
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "far fa-question-circle"
  })]), _c('span', [_vm._v(" Help ")])])])])])])]), _c('template', {
    slot: "body"
  }, [_c('div', {
    staticClass: "crosswalk",
    attrs: {
      "id": "crosswalk"
    }
  }, [_c('div', {
    staticClass: "crosswalk-column is-gapless is-paddiingless is-marginless is-multiline"
  }, [_c('div', {
    staticClass: "has-background-light crosswalk-top-section"
  }, [_c('div', {
    staticClass: "crosswalk__steps"
  }, _vm._l(_vm.steps, function (item, index) {
    return _c('div', {
      key: index,
      staticClass: "step-item",
      class: [{
        'complete': item.complete
      }, {
        'current': index === _vm.step
      }]
    }, [_c('div', {
      staticClass: "step-marker",
      class: [{
        'has-background-primary': index === _vm.step
      }, {
        'has-background-success': _vm.step > index
      }, {
        'has-background-medium': _vm.step < index
      }]
    }, [item.name === 'from' ? _c('span', {
      staticClass: "has-text-white"
    }, [_vm._v(" A ")]) : _vm._e(), item.name === 'to' ? _c('span', {
      staticClass: "has-text-white"
    }, [_vm._v(" B ")]) : _vm._e(), item.name === 'align' ? _c('i', {
      staticClass: "fa fa-network-wired"
    }) : _vm._e(), item.name === 'review' ? _c('i', {
      staticClass: "fa fa-check"
    }) : _vm._e()]), _c('p', {
      staticClass: "step-details is-hidden-touch"
    }, [_c('span', {
      class: [{
        'has-text-primary has-text-weight-bold': index === _vm.step
      }, {
        'has-text-success': _vm.step > index
      }, {
        'has-text-medium': _vm.step < index
      }]
    }, [_vm._v(" " + _vm._s(item.description) + " ")]), item.complete ? _c('span', {
      staticClass: "icon has-text-success"
    }, [_c('i', {
      staticClass: "fa fa-check"
    })]) : _vm._e()])]);
  }), 0), _vm.step === 2 ? _c('div', {
    staticClass: "crosswalk__buttons"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('h2', {
    staticClass: "title is-size-1"
  }, [_vm.workingAlignmentsChanged ? _c('span', {
    staticClass: "button is-pulled-right is-outlined is-primary",
    on: {
      "click": _vm.applyWorkingAlignmentChanges
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-plus"
  })]), _c('span', [_vm._v(" apply alignments ")])]) : _vm._e(), (_vm.alignmentsToSave.length > 0 || _vm.alignmentsToDelete.length > 0) && _vm.sourceState === 'ready' ? _c('span', {
    staticClass: "button is-pulled-right is-outlined is-primary",
    on: {
      "click": _vm.goToSummaryAndSave
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-arrow-right"
  })]), _c('span', [_vm._v(" save & review ")])]) : _vm._e()])])]) : _vm._e(), _vm.step < 2 ? _c('div', {
    staticClass: "crosswalk__search column is-8 is-offset-1"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('SearchBar', {
    attrs: {
      "view": "crosswalk",
      "filterSet": "basic",
      "ownedByMe": true,
      "searchType": "framework"
    }
  })], 1)]) : _vm._e()]), _c('transition', {
    attrs: {
      "name": "slide-fade"
    }
  }, [_vm.step === 0 ? _c('div', {
    staticClass: "column is-12 crosswalk__list"
  }, [_c('div', {
    staticClass: "container mt-4"
  }, [_c('List', {
    attrs: {
      "type": _vm.type,
      "repo": _vm.repo,
      "view": _vm.view,
      "click": _vm.frameworkClickSource,
      "searchOptions": _vm.searchOptions,
      "paramObj": _vm.paramObj,
      "disallowEdits": true,
      "filterToEditable": true
    }
  })], 1)]) : _vm._e()]), _vm.step === 1 ? _c('transition', {
    attrs: {
      "name": "slide-fade"
    }
  }, [_c('div', {
    staticClass: "column is-12 crosswalk__list"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('List', {
    attrs: {
      "type": _vm.type,
      "repo": _vm.repo,
      "view": _vm.view,
      "click": _vm.frameworkClickTarget,
      "searchOptions": _vm.searchOptions,
      "paramObj": _vm.paramObj,
      "disallowEdits": true
    }
  })], 1)])]) : _vm._e(), _c('transition', {
    attrs: {
      "name": "slide-fade"
    }
  }, [_vm.step === 2 ? _c('div', {
    staticClass: "column is-12 crosswalk__double-hierarchy"
  }, [_c('div', {
    staticClass: "columns is-mobile crosswalk__double-heirarchy__column"
  }, [!_vm.crosswalkSourceLoaded ? _c('div', {
    staticClass: "column is-6 has-text-centered"
  }, [_c('span', {
    staticClass: "icon is-large"
  }, [_c('i', {
    staticClass: "fa fa-spinner fa-2x fa-pulse"
  })])]) : _vm._e(), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.crosswalkSourceLoaded,
      expression: "crosswalkSourceLoaded"
    }],
    staticClass: "column is-6 source"
  }, [_c('Thing', {
    attrs: {
      "obj": _vm.frameworkSource,
      "repo": _vm.repo,
      "view": _vm.view
    }
  }), _c('Hierarchy', {
    attrs: {
      "container": _vm.frameworkSource,
      "view": "crosswalk",
      "subview": "crosswalkSource",
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
      "queryParams": _vm.queryParams,
      "highlightList": null,
      "properties": "primary"
    },
    on: {
      "search-things": function searchThings($event) {
        return _vm.handleSearch($event);
      },
      "done-loading-nodes": _vm.prepareToLoadCrosswalkTarget
    }
  })], 1), !_vm.loadCrosswalkTarget ? _c('div', {
    staticClass: "column is-6 has-text-centered"
  }, [_c('span', {
    staticClass: "icon is-large"
  }, [_c('i', {
    staticClass: "fa fa-spinner fa-2x fa-pulse"
  })])]) : _vm._e(), _vm.loadCrosswalkTarget ? _c('div', {
    staticClass: "column is-6 target"
  }, [_c('Thing', {
    attrs: {
      "obj": _vm.frameworkTarget,
      "repo": _vm.repo,
      "view": _vm.view
    }
  }), _c('Hierarchy', {
    attrs: {
      "container": _vm.frameworkTarget,
      "view": "crosswalk",
      "subview": "crosswalkTarget",
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
      "queryParams": _vm.queryParams,
      "highlightList": null,
      "properties": "primary"
    },
    on: {
      "search-things": function searchThings($event) {
        return _vm.handleSearch($event);
      }
    }
  })], 1) : _vm._e()])]) : _vm._e()]), _vm.step === 3 ? _c('transition', {
    attrs: {
      "name": "slide-fade"
    }
  }, [_c('div', {
    staticClass: "is-12 crosswalk__summary"
  }, [!_vm.alignmentsSaved ? _c('div', {
    staticClass: "box mt-6",
    staticStyle: {
      "max-width": "600px",
      "display": "block",
      "margin": "auto"
    }
  }, [_c('div', {
    staticClass: "section"
  }, [_c('h4', {
    staticClass: "title is-size-2 has-text-centered"
  }, [_vm._v(" Crosswalk Alignment Summary ")]), _vm.alignmentsToSave.length > 0 ? _c('p', {
    staticClass: "has-text-centered"
  }, [_vm._v(" " + _vm._s(_vm.alignmentsToSave.length) + " alignment"), _vm.alignmentsToSave.length > 1 ? _c('span', [_vm._v("s")]) : _vm._e(), _vm._v(" ready to add ")]) : _vm._e(), _vm.alignmentsToDelete.length > 0 ? _c('p', {
    staticClass: "has-text-centered"
  }, [_vm._v(" " + _vm._s(_vm.alignmentsToDelete.length) + " alignment"), _vm.alignmentsToDelete.length > 1 ? _c('span', [_vm._v("s")]) : _vm._e(), _vm._v(" ready to remove ")]) : _vm._e()]), _c('div', {
    staticClass: "section"
  }, [_c('h4', {
    staticClass: "title is-size-2 has-text-centered"
  }, [_vm._v(" Choose which framework to apply alignments ")]), _vm.canSaveToSourceFramework ? _c('div', {
    staticClass: "field has-text-centered"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.saveToSourceFramework,
      expression: "saveToSourceFramework"
    }],
    staticClass: "is-checkradio",
    attrs: {
      "title": "You do not have permission to save to this framework",
      "disabled": !_vm.canSaveToSourceFramework,
      "id": "saveToSourceFramework",
      "type": "checkbox",
      "name": "saveToSourceFramework"
    },
    domProps: {
      "checked": Array.isArray(_vm.saveToSourceFramework) ? _vm._i(_vm.saveToSourceFramework, null) > -1 : _vm.saveToSourceFramework
    },
    on: {
      "change": function change($event) {
        var $$a = _vm.saveToSourceFramework,
          $$el = $event.target,
          $$c = $$el.checked ? true : false;
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.saveToSourceFramework = $$a.concat([$$v]));
          } else {
            $$i > -1 && (_vm.saveToSourceFramework = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.saveToSourceFramework = $$c;
        }
      }
    }
  }), _c('label', {
    staticClass: "label",
    attrs: {
      "for": "saveToSourceFramework"
    }
  }, [_vm._v(_vm._s(_vm.frameworkSource.getName()))])]) : _vm._e(), _vm.canSaveToTargetFramework ? _c('div', {
    staticClass: "field has-text-centered"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.saveToTargetFramework,
      expression: "saveToTargetFramework"
    }],
    staticClass: "is-checkradio",
    attrs: {
      "title": "You do not have permission to save to this framework",
      "disabled": !_vm.canSaveToTargetFramework,
      "id": "saveToTargetFramework",
      "type": "checkbox",
      "name": "saveToTargetFramework"
    },
    domProps: {
      "checked": Array.isArray(_vm.saveToTargetFramework) ? _vm._i(_vm.saveToTargetFramework, null) > -1 : _vm.saveToTargetFramework
    },
    on: {
      "change": function change($event) {
        var $$a = _vm.saveToTargetFramework,
          $$el = $event.target,
          $$c = $$el.checked ? true : false;
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.saveToTargetFramework = $$a.concat([$$v]));
          } else {
            $$i > -1 && (_vm.saveToTargetFramework = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.saveToTargetFramework = $$c;
        }
      }
    }
  }), _c('label', {
    staticClass: "label",
    attrs: {
      "for": "saveToTargetFramework"
    }
  }, [_vm._v(_vm._s(_vm.frameworkTarget.getName()))])]) : _vm._e()]), _vm.saveToSourceFramework || _vm.saveToTargetFramework ? _c('div', {
    staticClass: "buttons is-spaced",
    staticStyle: {
      "margin-top": "3rem"
    }
  }, [_c('div', {
    staticClass: "button is-outlined is-dark",
    on: {
      "click": _vm.returnToCrosswalkEditing
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-arrow-left"
  })]), _c('span', [_vm._v(" continue editing ")])]), _c('div', {
    staticClass: "button is-outlined is-primary",
    on: {
      "click": _vm.saveAlignments
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-save"
  })]), _c('span', [_vm._v(" save alignments ")])])]) : _vm._e()]) : _vm._e()])]) : _vm._e()], 1)])])], 2)], 1);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "modal-content has-text-centered"
  }, [_c('span', {
    staticClass: "icon is-large has-text-center has-text-link"
  }, [_c('i', {
    staticClass: "fas fa-2x fa-spinner is-info fa-pulse"
  })])]);
}];

// CONCATENATED MODULE: ./src/views/framework/Crosswalk.vue?vue&type=template&id=55ef896c

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
var regeneratorRuntime = __webpack_require__("c7eb");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
var createForOfIteratorHelper = __webpack_require__("b85c");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.trim.js
var es_string_trim = __webpack_require__("498a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__("caad");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__("2532");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// EXTERNAL MODULE: ./src/layouts/MainLayout.vue + 4 modules
var MainLayout = __webpack_require__("713b");

// EXTERNAL MODULE: ./src/lode/components/List.vue + 4 modules
var List = __webpack_require__("713e");

// EXTERNAL MODULE: ./src/lode/components/Hierarchy.vue + 4 modules
var Hierarchy = __webpack_require__("9418");

// EXTERNAL MODULE: ./src/lode/components/Thing.vue + 4 modules
var Thing = __webpack_require__("098b");

// EXTERNAL MODULE: ./src/components/framework/SearchBar.vue + 4 modules
var SearchBar = __webpack_require__("6b9e");

// EXTERNAL MODULE: ./src/mixins/common.js
var common = __webpack_require__("872c");

// EXTERNAL MODULE: ./src/mixins/cassUtil.js
var cassUtil = __webpack_require__("6d79");

// EXTERNAL MODULE: ./src/mixins/t3Profile.js
var t3Profile = __webpack_require__("1102");

// EXTERNAL MODULE: ./src/mixins/tlaProfile.js
var tlaProfile = __webpack_require__("d6b4");

// EXTERNAL MODULE: ./src/mixins/ctdlasnProfile.js
var ctdlasnProfile = __webpack_require__("f188");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/framework/Crosswalk.vue?vue&type=script&lang=js





















/* harmony default export */ var Crosswalkvue_type_script_lang_js = ({
  name: 'FrameworkCrosswalk',
  data: function data() {
    return {
      view: 'crosswalk',
      loadCrosswalkTarget: false,
      crosswalkSourceLoaded: false,
      canSaveToSourceFramework: false,
      saveToSourceFramework: false,
      canSaveToTargetFramework: false,
      saveToTargetFramework: false,
      alignmentsSaved: false,
      crosswalkSaveBusy: false,
      numAlignmentsToDelete: 0,
      numAlignmentsDeleted: 0,
      sourceFrameworkSaving: null,
      targetFrameworkSaving: null,
      repo: window.repo,
      steps: [{
        name: 'from',
        description: 'select source',
        complete: false
      }, {
        name: 'to',
        description: 'select target',
        complete: false
      }, {
        name: 'align',
        description: 'align frameworks',
        complete: false
      }, {
        name: 'review',
        description: 'save & review',
        complete: false
      }],
      sortBy: "name.keyword",
      showMine: false
    };
  },
  mixins: [common["a" /* default */], cassUtil["a" /* cassUtil */], t3Profile["a" /* default */], tlaProfile["a" /* default */], ctdlasnProfile["a" /* default */]],
  props: {
    queryParams: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  components: {
    List: List["a" /* default */],
    SearchBar: SearchBar["a" /* default */],
    Hierarchy: Hierarchy["default"],
    Thing: Thing["default"],
    MainLayout: MainLayout["a" /* default */]
  },
  mounted: function mounted() {
    this.$store.commit('crosswalk/resetCrosswalk');
    this.$store.commit('crosswalk/resetCrosswalkFrameworks');
    this.$store.commit('app/searchTerm', "");
  },
  beforeDestroy: function beforeDestroy() {
    this.$store.commit('crosswalk/resetCrosswalk');
    this.$store.commit('crosswalk/resetCrosswalkFrameworks');
    this.$store.commit('app/clearSearchFilters');
    this.$store.commit('app/searchTerm', "");
  },
  watch: {
    step: function step(val) {
      appLog("step, ", val);
      appLog("steps, ", this.steps);
      if (val === 0) {
        this.steps[0].complete = false;
        this.steps[1].complete = false;
        this.steps[2].complete = false;
        this.steps[3].complete = false;
        this.$store.commit('crosswalk/resetFrameworkSourceRelationships');
        this.$store.commit('crosswalk/resetCrosswalkAlignmentsAndState');
      } else if (val === 1) {
        this.steps[0].complete = true;
        this.steps[1].complete = false;
        this.steps[2].complete = false;
        this.steps[3].complete = false;
        this.$store.commit('crosswalk/resetFrameworkTargetRelationships');
        this.$store.commit('crosswalk/resetCrosswalkAlignmentsAndState');
      } else if (val === 2) {
        this.steps[0].complete = true;
        this.steps[1].complete = true;
        this.steps[2].complete = false;
        this.steps[3].complete = false;
      } else if (val === 3) {
        this.steps[0].complete = true;
        this.steps[1].complete = true;
        this.steps[2].complete = true;
        this.steps[3].complete = false;
      } else if (val === 4) {
        this.steps[0].complete = true;
        this.steps[1].complete = true;
        this.steps[2].complete = true;
        this.steps[3].complete = true;
      }
    },
    sortResults: function sortResults() {
      if (this.sortResults.id === "lastEdited") {
        this.sortBy = "schema:dateModified";
      } else {
        this.sortBy = "name.keyword";
      }
    },
    filteredQuickFilters: function filteredQuickFilters() {
      this.showMine = false;
      for (var i = 0; i < this.filteredQuickFilters.length; i++) {
        if (this.filteredQuickFilters[i].id === "ownedByMe") {
          this.showMine = true;
        }
      }
    },
    alignmentsSaved: function alignmentsSaved() {
      if (this.alignmentsSaved) {
        if (this.saveToSourceFramework && !this.saveToTargetFramework) {
          var id = this.sourceFrameworkSaving.shortId();
          this.$store.commit('editor/framework', this.sourceFrameworkSaving);
          this.$store.commit('editor/setPropertyLevel', "tertiary");
          this.$router.push({
            name: 'framework',
            params: {
              frameworkId: id
            }
          });
        } else {
          // If saving to both frameworks, go to list sorted by last modified
          this.$store.commit('app/sortResults', {
            id: 'lastEdited',
            label: 'last modified'
          });
          this.$router.push({
            name: "frameworks"
          });
        }
      }
    }
  },
  computed: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({
    queryParamsComputed: function queryParamsComputed() {
      return this.$store.getters['editor/queryParams'];
    },
    type: function type() {
      return "Framework";
    },
    paramObj: function paramObj() {
      var obj = {};
      obj.size = 20;
      var order = this.sortBy === "name.keyword" || this.sortBy === "dcterms:title.keyword" ? "asc" : "desc";
      var type = this.sortBy === "name.keyword" || this.sortBy === "dcterms:title.keyword" ? "text" : "date";
      obj.sort = '[ { "' + this.sortBy + '": {"order" : "' + order + '" , "unmapped_type" : "' + type + '",  "missing" : "_last"}} ]';
      if (this.filterByOwnedByMe) {
        obj.ownership = 'me';
      }
      return obj;
    },
    filterByOwnedByMe: function filterByOwnedByMe() {
      return this.$store.getters['app/filterByOwnedByMe'];
    },
    searchOptions: function searchOptions() {
      var search = "";
      if (this.queryParams && this.queryParams.filter != null) {
        search += " AND (" + this.queryParams.filter + ")";
      }
      if (this.showMine || this.queryParams && this.queryParams.show === "mine") {
        if (EcIdentityManager.default.ids.length > 0) {
          search += " AND (";
          for (var i = 0; i < EcIdentityManager.default.ids.length; i++) {
            if (i !== 0) {
              search += " OR ";
            }
            var id = EcIdentityManager.default.ids[i];
            search += "\\*owner:\"" + id.ppk.toPk().toPem() + "\"";
          }
          search += ")";
        }
      }
      return search;
    },
    filteredQuickFilters: function filteredQuickFilters() {
      if (this.quickFilters) {
        var filterValues = this.quickFilters.filter(function (item) {
          return item.checked === true;
        });
        appLog('filtered value', filterValues);
        return filterValues;
      } else {
        return [];
      }
    }
  }, Object(vuex_esm["c" /* mapState */])({
    step: function step(state) {
      return state.crosswalk.step;
    },
    frameworkSearchTerm: function frameworkSearchTerm(state) {
      return state.app.frameworkSearchTerm;
    },
    showRightAside: function showRightAside(state) {
      return state.app.showRightAside;
    },
    frameworkSource: function frameworkSource(state) {
      return state.crosswalk.frameworkSource;
    },
    frameworkTarget: function frameworkTarget(state) {
      return state.crosswalk.frameworkTarget;
    },
    frameworkSourceRelationships: function frameworkSourceRelationships(state) {
      return state.crosswalk.frameworkSourceRelationships;
    },
    frameworkTargetRelationships: function frameworkTargetRelationships(state) {
      return state.crosswalk.frameworkTargetRelationships;
    },
    relevantExistingAlignmentsMap: function relevantExistingAlignmentsMap(state) {
      return state.crosswalk.relevantExistingAlignmentsMap;
    },
    workingAlignmentsSource: function workingAlignmentsSource(state) {
      return state.crosswalk.workingAlignmentsMap.source;
    },
    workingAlignmentsTargets: function workingAlignmentsTargets(state) {
      return state.crosswalk.workingAlignmentsMap.targets;
    },
    workingAlignmentsInitialTargets: function workingAlignmentsInitialTargets(state) {
      return state.crosswalk.workingAlignmentsMap.initialTargets;
    },
    workingAlignmentsRemovedTargets: function workingAlignmentsRemovedTargets(state) {
      return state.crosswalk.workingAlignmentsMap.removedTargets;
    },
    workingAlignmentsChanged: function workingAlignmentsChanged(state) {
      return state.crosswalk.workingAlignmentsMap.changed;
    },
    workingAlignmentsType: function workingAlignmentsType(state) {
      return state.crosswalk.workingAlignmentsMap.type;
    },
    workingAlignmentsMap: function workingAlignmentsMap(state) {
      return state.crosswalk.workingAlignmentsMap;
    },
    alignmentsToSave: function alignmentsToSave(state) {
      return state.crosswalk.alignmentsToSave;
    },
    alignmentsToDelete: function alignmentsToDelete(state) {
      return state.crosswalk.alignmentsToDelete;
    },
    targetState: function targetState(state) {
      return state.crosswalk.targetState;
    },
    sourceState: function sourceState(state) {
      return state.crosswalk.sourceState;
    },
    targetNodesToHighlight: function targetNodesToHighlight(state) {
      return state.crosswalk.targetNodesToHighlight;
    },
    enabledRelationshipTypes: function enabledRelationshipTypes(state) {
      return state.crosswalk.enabledRelationshipTypes;
    }
  })), Object(vuex_esm["b" /* mapGetters */])({
    sortResults: 'app/sortResults',
    quickFilters: 'app/quickFilters'
  })),
  methods: {
    determineAbilityToSaveToFrameworks: function determineAbilityToSaveToFrameworks() {
      if (this.isObjectOwnerless(this.frameworkSource) || this.doesAnyIdentityOwnObject(this.frameworkSource)) {
        this.canSaveToSourceFramework = true;
        this.saveToSourceFramework = true;
      } else {
        this.canSaveToSourceFramework = false;
        this.saveToSourceFramework = false;
      }
      if (this.isObjectOwnerless(this.frameworkTarget) || this.doesAnyIdentityOwnObject(this.frameworkTarget)) {
        this.canSaveToTargetFramework = true;
        this.saveToTargetFramework = true;
      } else {
        this.canSaveToTargetFramework = false;
        this.saveToTargetFramework = false;
      }
    },
    goToSummaryAndSave: function goToSummaryAndSave() {
      this.alignmentsSaved = false;
      this.crosswalkSaveBusy = false;
      this.determineAbilityToSaveToFrameworks();
      this.$store.commit('crosswalk/step', 3);
    },
    returnToCrosswalkEditing: function returnToCrosswalkEditing() {
      this.$store.commit('crosswalk/step', 2);
    },
    addRelationshipsToFrameworks: function addRelationshipsToFrameworks() {
      var ats = this.alignmentsToSave;
      var _iterator = Object(createForOfIteratorHelper["a" /* default */])(ats),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var ata = _step.value;
          if (this.saveToSourceFramework) this.sourceFrameworkSaving.addRelation(ata.shortId());
          if (this.saveToTargetFramework) this.targetFrameworkSaving.addRelation(ata.shortId());
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    },
    removeRelationshipsFromFrameworks: function removeRelationshipsFromFrameworks() {
      var atd = this.alignmentsToDelete;
      var _iterator2 = Object(createForOfIteratorHelper["a" /* default */])(atd),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var atr = _step2.value;
          if (atr.id && atr.shortId()) {
            this.sourceFrameworkSaving.removeRelation(atr.shortId());
            this.targetFrameworkSaving.removeRelation(atr.shortId());
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    },
    generateRelationId: function generateRelationId(relType, sourceId, targetId) {
      return 'crswlk' + '-' + Date.now() + '---' + this.genPartialIdPiece(sourceId) + '-' + relType + '-' + this.genPartialIdPiece(targetId);
    },
    addIdsAndOwnersToNewRelationships: function addIdsAndOwnersToNewRelationships() {
      var ats = this.alignmentsToSave;
      var _iterator3 = Object(createForOfIteratorHelper["a" /* default */])(ats),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var ata = _step3.value;
          ata.assignId(window.repo.selectedServer, this.generateRelationId(ata.relationType, ata.source, ata.target));
          appLog("New crosswalk alignment: " + ata.shortId());
          this.addAllIdentityPksAsOwners(ata);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      this.$store.commit('crosswalk/alignmentsToSave', ats);
    },
    handleSaveTargetFrameworkSuccess: function handleSaveTargetFrameworkSuccess() {
      this.alignmentsSaved = true;
      this.crosswalkSaveBusy = false;
    },
    handleSaveTargetFrameworkFailed: function handleSaveTargetFrameworkFailed() {
      appLog("Failed to save target framework for crosswalk: " + msg);
      this.crosswalkSaveBusy = false;
    },
    saveTargetFramework: function saveTargetFramework() {
      if (this.isObjectOwnerless(this.targetFrameworkSaving) || this.doesAnyIdentityOwnObject(this.targetFrameworkSaving)) {
        appLog("Saving target framework for crosswalk...");
        this.targetFrameworkSaving["schema:dateModified"] = new Date().toISOString();
        this.targetFrameworkSaving.save(this.handleSaveTargetFrameworkSuccess, this.handleSaveTargetFrameworkFailed, this.repo);
      } else {
        this.alignmentsSaved = true;
        this.crosswalkSaveBusy = false;
      }
    },
    handleSaveSourceFrameworkFailed: function handleSaveSourceFrameworkFailed(msg) {
      appLog("Failed to save source framework for crosswalk: " + msg);
      this.crosswalkSaveBusy = false;
    },
    saveSourceFrameworkAndGo: function saveSourceFrameworkAndGo() {
      if (this.isObjectOwnerless(this.sourceFrameworkSaving) || this.doesAnyIdentityOwnObject(this.sourceFrameworkSaving)) {
        appLog("Saving source framework for crosswalk...");
        this.sourceFrameworkSaving["schema:dateModified"] = new Date().toISOString();
        this.sourceFrameworkSaving.save(this.saveTargetFramework, this.handleSaveSourceFrameworkFailed, this.repo);
      } else this.saveTargetFramework();
    },
    saveFrameworks: function saveFrameworks() {
      appLog("Saving frameworks for crosswalk...");
      this.saveSourceFrameworkAndGo();
    },
    checkDeleteAlignments: function checkDeleteAlignments() {
      this.numAlignmentsDeleted += 1;
      if (this.numAlignmentsDeleted >= this.numAlignmentsToDelete) this.saveFrameworks();else this.deleteAlignmentToRemove(this.numAlignmentsDeleted);
    },
    handleDeleteAlignmentFailed: function handleDeleteAlignmentFailed(msg) {
      appLog("Failed to remove crosswalk alignment: " + msg);
      this.checkDeleteAlignments();
    },
    deleteAlignmentToRemove: function deleteAlignmentToRemove(atrIdx) {
      appLog("Deleting crosswalk alignment to remove: " + atrIdx);
      var atr = this.alignmentsToDelete[atrIdx];
      this.repo.deleteRegistered(atr, this.checkDeleteAlignments, this.handleDeleteAlignmentFailed);
    },
    deleteAlignmentsToRemoveAndGo: function deleteAlignmentsToRemoveAndGo() {
      if (this.alignmentsToDelete.length > 0) {
        appLog("Deleting crosswalk alignments to remove...");
        this.deleteAlignmentToRemove(0);
      } else this.saveFrameworks();
    },
    handleSaveAlignmentsToAddSuccess: function handleSaveAlignmentsToAddSuccess() {
      appLog("New crosswalk alignments added");
      this.deleteAlignmentsToRemoveAndGo();
    },
    handleSaveAlignmentsToAddFailed: function handleSaveAlignmentsToAddFailed(msg) {
      appLog("Failed to add crosswalk alignments: " + msg);
      this.crosswalkSaveBusy = false;
    },
    saveAlignmentsToAddAndGo: function saveAlignmentsToAddAndGo() {
      var ats = this.alignmentsToSave;
      if (ats.length > 0) {
        appLog("Saving crosswalk alignments to add...");
        this.repo.multiput(ats, this.handleSaveAlignmentsToAddSuccess, this.handleSaveAlignmentsToAddFailed);
      } else this.deleteAlignmentsToRemoveAndGo();
    },
    saveAlignments: function saveAlignments() {
      if (this.saveToSourceFramework || this.saveToTargetFramework) {
        this.crosswalkSaveBusy = true;
        this.numAlignmentsToDelete = this.alignmentsToDelete.length;
        this.numAlignmentsDeleted = 0;
        this.sourceFrameworkSaving = this.frameworkSource;
        this.targetFrameworkSaving = this.frameworkTarget;
        this.addIdsAndOwnersToNewRelationships();
        this.addRelationshipsToFrameworks();
        this.removeRelationshipsFromFrameworks();
        this.saveAlignmentsToAddAndGo();
      } else {
        this.alignmentsSaved = true;
      }
    },
    prepareToLoadCrosswalkTarget: function prepareToLoadCrosswalkTarget() {
      var _this = this;
      this.crosswalkSourceLoaded = true;
      setTimeout(function () {
        _this.loadCrosswalkTarget = true;
      }, 2000);
    },
    getEcAlignmentObjectFromRelevantAlignmentsMap: function getEcAlignmentObjectFromRelevantAlignmentsMap(source, target, type) {
      var ret = null;
      if (this.relevantExistingAlignmentsMap[source]) {
        if (this.relevantExistingAlignmentsMap[source][type]) {
          if (this.relevantExistingAlignmentsMap[source][type][target]) {
            ret = this.relevantExistingAlignmentsMap[source][type][target];
          }
        }
      }
      return ret;
    },
    applyRemovedWorkingAlignmentChanges: function applyRemovedWorkingAlignmentChanges() {
      var _iterator4 = Object(createForOfIteratorHelper["a" /* default */])(this.workingAlignmentsRemovedTargets),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var wart = _step4.value;
          var ecaObj = this.getEcAlignmentObjectFromRelevantAlignmentsMap(this.workingAlignmentsSource, wart, this.workingAlignmentsType);
          if (ecaObj && ecaObj.id && ecaObj.id.trim() !== '') this.$store.commit('crosswalk/appendAlignmentsToDelete', ecaObj);
          var alignProps = {};
          alignProps.source = this.workingAlignmentsSource;
          alignProps.target = wart;
          alignProps.type = this.workingAlignmentsType;
          this.$store.commit('crosswalk/removeAlignmentFromRelevantAlignmentsMap', alignProps);
          this.$store.commit('crosswalk/removeAlignmentFromAlignmentsToSave', alignProps);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    },
    getAndRemoveEcAlignmentObjectFromAlignmentsToDelete: function getAndRemoveEcAlignmentObjectFromAlignmentsToDelete(alignProps) {
      var ret = null;
      var _iterator5 = Object(createForOfIteratorHelper["a" /* default */])(this.alignmentsToDelete),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var a = _step5.value;
          if (a.source === alignProps.source && a.target === alignProps.target && a.relationType === alignProps.type) {
            ret = a;
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      if (ret) this.$store.commit('crosswalk/removeAlignmentFromAlignmentsToDelete', alignProps);
      return ret;
    },
    genPartialIdPiece: function genPartialIdPiece(compId) {
      if (compId.lastIndexOf("/") <= -1) return compId;
      return compId.substr(compId.lastIndexOf("/") + 1);
    },
    generateAlignmentObjectFromAlignProps: function generateAlignmentObjectFromAlignProps(alignProps) {
      var eca = new EcAlignment();
      this.addAllIdentityPksAsOwners(eca);
      // leave the id blank for now
      // eca.assignId(window.repo.selectedServer, this.generateRelationId(alignProps.type, alignProps.source, alignProps.target));
      eca.target = alignProps.target;
      eca.source = alignProps.source;
      eca.relationType = alignProps.type;
      return eca;
    },
    applyAddedWorkingAlignmentChanges: function applyAddedWorkingAlignmentChanges() {
      var _this2 = this;
      var newTargets = this.workingAlignmentsTargets.filter(function (x) {
        return !_this2.workingAlignmentsInitialTargets.includes(x);
      });
      var _iterator6 = Object(createForOfIteratorHelper["a" /* default */])(newTargets),
        _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var nt = _step6.value;
          var alignProps = {};
          alignProps.source = this.workingAlignmentsSource;
          alignProps.target = nt;
          alignProps.type = this.workingAlignmentsType;
          var ecaObj = this.getAndRemoveEcAlignmentObjectFromAlignmentsToDelete(alignProps);
          if (!ecaObj) ecaObj = this.generateAlignmentObjectFromAlignProps(alignProps);
          if (!ecaObj.id || ecaObj.id.trim() === '') this.$store.commit('crosswalk/appendAlignmentsToSave', ecaObj);
          this.$store.commit('crosswalk/addAlignmentToRelevantAlignmentsMap', ecaObj);
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
    },
    applyWorkingAlignmentChanges: function applyWorkingAlignmentChanges() {
      if (this.workingAlignmentsChanged) {
        this.applyRemovedWorkingAlignmentChanges();
        this.applyAddedWorkingAlignmentChanges();
        this.$store.commit('crosswalk/relevantExistingAlignmentsMapLastUpdate', Date.now());
        this.$store.commit('crosswalk/populateAlignedCompetenciesList');
      }
      this.$store.commit('crosswalk/sourceState', 'ready');
      this.$store.commit('crosswalk/resetWorkingAlignmentsMap');
    },
    addRelationshipListToRelevantAlignments: function addRelationshipListToRelevantAlignments(relArray, processedRelationshipIds, relAlignmentMap) {
      var _iterator7 = Object(createForOfIteratorHelper["a" /* default */])(relArray),
        _step7;
      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var r = _step7.value;
          if (!processedRelationshipIds.includes(r.shortId)) {
            processedRelationshipIds.push(r.shortId());
            if (this.frameworkSource.competency && this.frameworkSource.competency.includes(r.source) && this.frameworkTarget.competency && this.frameworkTarget.competency.includes(r.target)) {
              if (!relAlignmentMap[r.source]) relAlignmentMap[r.source] = {};
              if (!relAlignmentMap[r.source][r.relationType]) relAlignmentMap[r.source][r.relationType] = {};
              if (!relAlignmentMap[r.source][r.relationType][r.target]) relAlignmentMap[r.source][r.relationType][r.target] = r;
            }
          }
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
    },
    buildRelevantAlignmentsMap: function buildRelevantAlignmentsMap() {
      var processedRelationshipIds = [];
      var relAlignmentMap = {};
      if (this.frameworkSourceRelationships && this.frameworkTargetRelationships) {
        this.addRelationshipListToRelevantAlignments(this.frameworkSourceRelationships, processedRelationshipIds, relAlignmentMap);
        this.addRelationshipListToRelevantAlignments(this.frameworkTargetRelationships, processedRelationshipIds, relAlignmentMap);
      }
      this.$store.commit('crosswalk/relevantExistingAlignmentsMap', relAlignmentMap);
      this.$store.commit('crosswalk/populateAlignedCompetenciesList');
    },
    handleBuildFrameworkTargetRelationshipsSuccess: function handleBuildFrameworkTargetRelationshipsSuccess(ecrlda) {
      appLog("Building framework target relationship list...");
      this.$store.commit('crosswalk/frameworkTargetRelationships', this.buildEcAlignmentsFromRemoteLinkedData(ecrlda));
      this.buildRelevantAlignmentsMap();
      this.$store.commit('crosswalk/step', 2);
    },
    buildFrameworkTargetRelationships: function buildFrameworkTargetRelationships() {
      var repo = window.repo;
      if (this.frameworkTarget.relation && this.frameworkTarget.relation.length > 0) {
        var me = this;
        repo.multiget(this.frameworkTarget.relation, me.handleBuildFrameworkTargetRelationshipsSuccess, function (msg) {
          appError("buildFrameworkTargetRelationships failed: " + msg);
        });
      } else this.handleBuildFrameworkTargetRelationshipsSuccess([]);
    },
    handleBuildFrameworkSourceRelationshipsSuccess: function handleBuildFrameworkSourceRelationshipsSuccess(ecrlda) {
      appLog("Building framework source relationship list...");
      this.$store.commit('crosswalk/frameworkSourceRelationships', this.buildEcAlignmentsFromRemoteLinkedData(ecrlda));
      this.buildRelevantAlignmentsMap();
      if (this.frameworkTarget) this.$store.commit('crosswalk/step', 2);else this.$store.commit('crosswalk/step', 1);
    },
    buildFrameworkSourceRelationships: function buildFrameworkSourceRelationships() {
      var repo = window.repo;
      if (this.frameworkSource.relation && this.frameworkSource.relation.length > 0) {
        var me = this;
        repo.multiget(this.frameworkSource.relation, me.handleBuildFrameworkSourceRelationshipsSuccess, function (msg) {
          appError("buildFrameworkSourceRelationships failed: " + msg);
        });
      } else this.handleBuildFrameworkSourceRelationshipsSuccess([]);
    },
    getLabelForRelationship: function getLabelForRelationship(relObject, defaultLabel) {
      try {
        if (relObject && relObject["http://www.w3.org/2000/01/rdf-schema#label"] && relObject["http://www.w3.org/2000/01/rdf-schema#label"][0] && relObject["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"]) {
          return relObject["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
        } else return defaultLabel;
      } catch (e) {
        return defaultLabel;
      }
    },
    getFallbackEnabledRelationshipTypes: function getFallbackEnabledRelationshipTypes() {
      appLog("Returning fallback relationship types for crosswalk");
      var fallbackRelTypes = [];
      fallbackRelTypes.push({
        relationship: 'narrows',
        label: 'narrows'
      });
      fallbackRelTypes.push({
        relationship: 'broadens',
        label: 'broadens'
      });
      fallbackRelTypes.push({
        relationship: 'isEquivalentTo',
        label: 'is equivalent to'
      });
      fallbackRelTypes.push({
        relationship: 'desires',
        label: 'desires'
      });
      fallbackRelTypes.push({
        relationship: 'requires',
        label: 'requires'
      });
      fallbackRelTypes.push({
        relationship: 'isRelatedTo',
        label: 'is related to'
      });
      return fallbackRelTypes;
    },
    getEnabledRelationshipTypesFromObject: function getEnabledRelationshipTypesFromObject(relationshipContainerObj) {
      try {
        if (relationshipContainerObj) {
          appLog("Determining relationship types for crosswalk");
          var enabledRelTypes = [];
          if (relationshipContainerObj.isEnabledBy) enabledRelTypes.push({
            relationship: 'isEnabledBy',
            label: this.getLabelForRelationship(relationshipContainerObj.isEnabledBy, 'is enabled by')
          });
          if (relationshipContainerObj.requires) enabledRelTypes.push({
            relationship: 'requires',
            label: this.getLabelForRelationship(relationshipContainerObj.requires, 'requires')
          });
          if (relationshipContainerObj.desires) enabledRelTypes.push({
            relationship: 'desires',
            label: this.getLabelForRelationship(relationshipContainerObj.desires, 'desires')
          });
          if (relationshipContainerObj.narrows) enabledRelTypes.push({
            relationship: 'narrows',
            label: this.getLabelForRelationship(relationshipContainerObj.narrows, 'narrows')
          });
          if (relationshipContainerObj.isRelatedTo) enabledRelTypes.push({
            relationship: 'isRelatedTo',
            label: this.getLabelForRelationship(relationshipContainerObj.isRelatedTo, 'is related to')
          });
          if (relationshipContainerObj.isEquivalentTo) enabledRelTypes.push({
            relationship: 'isEquivalentTo',
            label: this.getLabelForRelationship(relationshipContainerObj.isEquivalentTo, 'is equivalent to')
          });
          if (relationshipContainerObj.broadens) enabledRelTypes.push({
            relationship: 'broadens',
            label: this.getLabelForRelationship(relationshipContainerObj.broadens, 'broadens')
          });
          if (relationshipContainerObj.majorRelated) enabledRelTypes.push({
            relationship: 'majorRelated',
            label: this.getLabelForRelationship(relationshipContainerObj.majorRelated, 'is majorly related to')
          });
          if (relationshipContainerObj.minorRelated) enabledRelTypes.push({
            relationship: 'minorRelated',
            label: this.getLabelForRelationship(relationshipContainerObj.minorRelated, 'is minorly related to')
          });
          if (relationshipContainerObj.isSimilarTo) enabledRelTypes.push({
            relationship: 'isSimilarTo',
            label: this.getLabelForRelationship(relationshipContainerObj.isSimilarTo, 'is similar to')
          });
          if (relationshipContainerObj.isPartiallySameAs) enabledRelTypes.push({
            relationship: 'isPartiallySameAs',
            label: this.getLabelForRelationship(relationshipContainerObj.isPartiallySameAs, 'is partially the same as')
          });
          if (relationshipContainerObj.enables) enabledRelTypes.push({
            relationship: 'enables',
            label: this.getLabelForRelationship(relationshipContainerObj.enables, 'enables')
          });
          if (relationshipContainerObj.hasChild) enabledRelTypes.push({
            relationship: 'hasChild',
            label: this.getLabelForRelationship(relationshipContainerObj.hasChild, 'has child')
          });
          if (relationshipContainerObj.isChildOf) enabledRelTypes.push({
            relationship: 'isChildOf',
            label: this.getLabelForRelationship(relationshipContainerObj.isChildOf, 'is child of')
          });
          return enabledRelTypes;
        } else return this.getFallbackEnabledRelationshipTypes();
      } catch (e) {
        return this.getFallbackEnabledRelationshipTypes();
      }
    },
    setEnabledRelationshipTypesFromT3ProfileConfig: function setEnabledRelationshipTypesFromT3ProfileConfig() {
      appLog('Using T3 configuration for enabled relationship types');
      var ert = this.getEnabledRelationshipTypesFromObject(this.t3CompetencyProfile);
      this.$store.commit('crosswalk/enabledRelationshipTypes', ert);
      this.$store.commit('crosswalk/enabledRelationshipTypesLastUpdate', Date.now());
    },
    setEnabledRelationshipTypesFromCeasnProfileConfig: function setEnabledRelationshipTypesFromCeasnProfileConfig() {
      appLog('Using CEASN configuration for enabled relationship types');
      var ert = this.getEnabledRelationshipTypesFromObject(this.ctdlAsnCompetencyProfile);
      this.$store.commit('crosswalk/enabledRelationshipTypes', ert);
      this.$store.commit('crosswalk/enabledRelationshipTypesLastUpdate', Date.now());
    },
    setEnabledRelationshipTypesFromTlaProfileConfig: function setEnabledRelationshipTypesFromTlaProfileConfig() {
      appLog('Using TLA configuration for enabled relationship types');
      var ert = this.getEnabledRelationshipTypesFromObject(this.tlaCompetencyProfile);
      this.$store.commit('crosswalk/enabledRelationshipTypes', ert);
      this.$store.commit('crosswalk/enabledRelationshipTypesLastUpdate', Date.now());
    },
    setEnabledRelationshipListFromCatConfigObj: function setEnabledRelationshipListFromCatConfigObj(configObj) {
      if (!configObj || !configObj.relationshipConfig) {
        var ert = this.getFallbackEnabledRelationshipTypes();
        this.$store.commit('crosswalk/enabledRelationshipTypes', ert);
        this.$store.commit('crosswalk/enabledRelationshipTypesLastUpdate', Date.now());
      } else {
        var _ert = this.getEnabledRelationshipTypesFromObject(configObj.relationshipConfig);
        this.$store.commit('crosswalk/enabledRelationshipTypes', _ert);
        this.$store.commit('crosswalk/enabledRelationshipTypesLastUpdate', Date.now());
      }
    },
    setEnabledRelationshipTypesFromOtherConfig: function () {
      var _setEnabledRelationshipTypesFromOtherConfig = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee() {
        var c, _c, me, ca, found, _iterator8, _step8, _c2;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!this.frameworkSource.configuration) {
                _context.next = 8;
                break;
              }
              appLog('Using framework configuration for enabled relationship types...');
              _context.next = 4;
              return EcRepository.get(this.frameworkSource.configuration);
            case 4:
              c = _context.sent;
              this.setEnabledRelationshipListFromCatConfigObj(c);
              _context.next = 48;
              break;
            case 8:
              if (!(this.getDefaultBrowserConfigId() && !this.getDefaultBrowserConfigId().trim().equals(''))) {
                _context.next = 16;
                break;
              }
              appLog('Using browser configuration for enabled relationship types...');
              _context.next = 12;
              return EcRepository.get(this.getDefaultBrowserConfigId());
            case 12:
              _c = _context.sent;
              this.setEnabledRelationshipListFromCatConfigObj(_c);
              _context.next = 48;
              break;
            case 16:
              me = this;
              _context.prev = 17;
              _context.next = 20;
              return window.repo.searchWithParams("@type:Configuration", {
                'size': 10000
              }, null);
            case 20:
              ca = _context.sent;
              found = false;
              _iterator8 = Object(createForOfIteratorHelper["a" /* default */])(ca);
              _context.prev = 23;
              _iterator8.s();
            case 25:
              if ((_step8 = _iterator8.n()).done) {
                _context.next = 34;
                break;
              }
              _c2 = _step8.value;
              if (!(_c2.isDefault === "true" || _c2.isDefault === true)) {
                _context.next = 32;
                break;
              }
              appLog('Using instance default configuration for enabled relationship types');
              me.setEnabledRelationshipListFromCatConfigObj(_c2);
              found = true;
              return _context.abrupt("break", 34);
            case 32:
              _context.next = 25;
              break;
            case 34:
              _context.next = 39;
              break;
            case 36:
              _context.prev = 36;
              _context.t0 = _context["catch"](23);
              _iterator8.e(_context.t0);
            case 39:
              _context.prev = 39;
              _iterator8.f();
              return _context.finish(39);
            case 42:
              if (!found) me.setEnabledRelationshipListFromCatConfigObj(null);
              _context.next = 48;
              break;
            case 45:
              _context.prev = 45;
              _context.t1 = _context["catch"](17);
              me.setEnabledRelationshipListFromCatConfigObj(null);
            case 48:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[17, 45], [23, 36, 39, 42]]);
      }));
      function setEnabledRelationshipTypesFromOtherConfig() {
        return _setEnabledRelationshipTypesFromOtherConfig.apply(this, arguments);
      }
      return setEnabledRelationshipTypesFromOtherConfig;
    }(),
    determineEnabledRelationshipTypesFromSourceConfiguration: function () {
      var _determineEnabledRelationshipTypesFromSourceConfiguration = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee2() {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (!(this.$store.state.editor.t3Profile === true)) {
                _context2.next = 4;
                break;
              }
              this.setEnabledRelationshipTypesFromT3ProfileConfig();
              _context2.next = 14;
              break;
            case 4:
              if (!(this.queryParamsComputed.ceasnDataFields === "true")) {
                _context2.next = 8;
                break;
              }
              this.setEnabledRelationshipTypesFromCeasnProfileConfig();
              _context2.next = 14;
              break;
            case 8:
              if (!(this.queryParamsComputed.tlaProfile === "true")) {
                _context2.next = 12;
                break;
              }
              this.setEnabledRelationshipTypesFromTlaProfileConfig();
              _context2.next = 14;
              break;
            case 12:
              _context2.next = 14;
              return this.setEnabledRelationshipTypesFromOtherConfig();
            case 14:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function determineEnabledRelationshipTypesFromSourceConfiguration() {
        return _determineEnabledRelationshipTypesFromSourceConfiguration.apply(this, arguments);
      }
      return determineEnabledRelationshipTypesFromSourceConfiguration;
    }(),
    frameworkClickSource: function () {
      var _frameworkClickSource = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee4(framework) {
        var me;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              me = this;
              this.$store.commit('crosswalk/resetFrameworkSourceRelationships');
              /* Should we exclude framework A from framework B options */
              EcFramework.get(framework.id, /*#__PURE__*/function () {
                var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee3(success) {
                  return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee3$(_context3) {
                    while (1) switch (_context3.prev = _context3.next) {
                      case 0:
                        me.$store.commit('crosswalk/frameworkSource', success);
                        _context3.next = 3;
                        return me.determineEnabledRelationshipTypesFromSourceConfiguration();
                      case 3:
                        me.buildFrameworkSourceRelationships();
                      case 4:
                      case "end":
                        return _context3.stop();
                    }
                  }, _callee3);
                }));
                return function (_x2) {
                  return _ref.apply(this, arguments);
                };
              }(), appError);
              this.$store.commit('app/searchTerm', '');
            case 4:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function frameworkClickSource(_x) {
        return _frameworkClickSource.apply(this, arguments);
      }
      return frameworkClickSource;
    }(),
    frameworkClickTarget: function frameworkClickTarget(framework) {
      var me = this;
      this.$store.commit('crosswalk/resetFrameworkTargetRelationships');
      /* Should we exclude framework A from framework B options */
      EcFramework.get(framework.id, function (success) {
        me.$store.commit('crosswalk/frameworkTarget', success);
        me.buildFrameworkTargetRelationships();
      }, appError);
      this.$store.commit('app/searchTerm', '');
    }
  }
});
// CONCATENATED MODULE: ./src/views/framework/Crosswalk.vue?vue&type=script&lang=js
 /* harmony default export */ var framework_Crosswalkvue_type_script_lang_js = (Crosswalkvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/views/framework/Crosswalk.vue?vue&type=style&index=0&id=55ef896c&prod&lang=scss
var Crosswalkvue_type_style_index_0_id_55ef896c_prod_lang_scss = __webpack_require__("e1a4");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/views/framework/Crosswalk.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  framework_Crosswalkvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Crosswalk = __webpack_exports__["default"] = (component.exports);

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

/***/ "495e":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

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

/***/ "62af":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

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

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"18a0cdb9-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/layouts/MainLayout.vue?vue&type=template&id=7780b418
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

/***/ "8d7e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalTemplate_vue_vue_type_style_index_0_id_1c4e04a7_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("62af");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalTemplate_vue_vue_type_style_index_0_id_1c4e04a7_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalTemplate_vue_vue_type_style_index_0_id_1c4e04a7_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "984b":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "9e69d":
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__("2b3e");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ "af07":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"18a0cdb9-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/ModalTemplate.vue?vue&type=template&id=1c4e04a7
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "modal cass-editor___modal",
    class: [{
      'is-active': _vm.active
    }, 'is-' + _vm.size, 'cass-editor__modal--' + _vm.content],
    attrs: {
      "id": "cass-modal"
    }
  }, [_c('div', {
    staticClass: "modal-background"
  }), _c('div', {
    staticClass: "modal-card",
    class: 'cass-editor__modal-card--' + _vm.size
  }, [_c('header', {
    staticClass: "modal-card-head is-size-4 has-text-weight-bold",
    class: ['has-background-' + _vm.type, 'has-text-' + _vm.fontColor]
  }, [_c('p', {
    staticClass: "modal-card-title"
  }, [_vm._t("modal-header")], 2), _vm.canClose ? _c('button', {
    staticClass: "delete",
    attrs: {
      "aria-label": "close"
    },
    on: {
      "click": function click($event) {
        _vm.$store.commit('app/closeModal');
        _vm.$emit('close');
      }
    }
  }) : _vm._e()]), _c('div', {
    staticClass: "modal-card-body has-text-dark"
  }, [_vm._t("modal-body")], 2), _c('footer', {
    staticClass: "modal-card-foot has-background-white"
  }, [_vm._t("modal-foot")], 2)])]);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/modalContent/ModalTemplate.vue?vue&type=template&id=1c4e04a7

// EXTERNAL MODULE: ./src/scss/modal-template.scss
var modal_template = __webpack_require__("984b");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/ModalTemplate.vue?vue&type=script&lang=js

/* harmony default export */ var ModalTemplatevue_type_script_lang_js = ({
  name: 'ModalTemplate',
  props: {
    canClose: {
      type: Boolean,
      default: true
    },
    active: {
      type: Boolean,
      default: false
    },
    type: {
      default: 'primary',
      type: String
    },
    fontColor: {
      type: String,
      default: 'white'
    },
    size: {
      type: String,
      default: 'medium'
    },
    content: {
      defualt: 'default',
      type: String
    }
  },
  data: function data() {
    return {};
  },
  computed: {}
});
// CONCATENATED MODULE: ./src/components/modalContent/ModalTemplate.vue?vue&type=script&lang=js
 /* harmony default export */ var modalContent_ModalTemplatevue_type_script_lang_js = (ModalTemplatevue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/modalContent/ModalTemplate.vue?vue&type=style&index=0&id=1c4e04a7&prod&lang=scss
var ModalTemplatevue_type_style_index_0_id_1c4e04a7_prod_lang_scss = __webpack_require__("8d7e");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/modalContent/ModalTemplate.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  modalContent_ModalTemplatevue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ModalTemplate = __webpack_exports__["a"] = (component.exports);

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

/***/ "e1a4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Crosswalk_vue_vue_type_style_index_0_id_55ef896c_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("495e");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Crosswalk_vue_vue_type_style_index_0_id_55ef896c_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Crosswalk_vue_vue_type_style_index_0_id_55ef896c_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "f188":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c7eb");
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("1da1");


/* harmony default export */ __webpack_exports__["a"] = ({
  computed: {
    ctdlAsnFrameworkProfile: function ctdlAsnFrameworkProfile() {
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
            "@value": "The URL of the framework. If imported from another source, the URL of the framework from which this one originates."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Canonical URL"
          }],
          "readOnly": "true",
          "max": 1,
          "heading": "Keys"
        },
        "registryURL": {
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The Credential Registry URL of the framework."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Credential Registry URL"
          }],
          "readOnly": "true",
          "valuesIndexed": function valuesIndexed() {
            return me.registryURLs;
          },
          "max": 1,
          "heading": "Keys"
        },
        "ctid": {
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The CTID of the framework."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "CTID"
          }],
          "readOnly": "true",
          "valuesIndexed": function valuesIndexed() {
            return me.ctids;
          },
          "max": 1,
          "heading": "Keys"
        },
        "http://schema.org/name": {
          "@id": "https://purl.org/ctdlasn/terms/name",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The name or title of this competency framework. One name or title per language."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Name"
          }],
          "isRequired": "true",
          "onePerLanguage": "true",
          "heading": "General"
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
            "@value": "A short description of this framework. One description per language."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Description"
          }],
          "onePerLanguage": "true",
          "isRequired": "true",
          "heading": "General"
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
          "isRequired": "true",
          "heading": "General"
        },
        "http://schema.org/author": {
          "@id": "http://schema.org/author",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A person or organization chiefly responsible for the intellectual or artistic content of this competency framework or competency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Author"
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
          "isRequired": "true",
          "heading": "General"
        },
        "http://schema.org/keywords": {
          "@id": "https://purl.org/ctdlasn/terms/conceptKeyword",
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
            "@value": "Concept Keyword"
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
            "@value": "Concept Term"
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
          "heading": "Connections"
        },
        "https://purl.org/ctdlasn/terms/alignFrom": {
          "@id": "https://purl.org/ctdlasn/terms/alignFrom",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A competency framework from which this competency framework is aligned."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Align From"
          }],
          "max": 1,
          "heading": "Connections"
        },
        "https://purl.org/ctdlasn/terms/alignTo": {
          "@id": "https://purl.org/ctdlasn/terms/alignTo",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A competency framework to which this competency framework is aligned."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Align To"
          }],
          "max": 1,
          "heading": "Connections"
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
            "@value": "Source Framework"
          }],
          "heading": "Connections"
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
          "@id": "https://purl.org/ctdlasn/terms/validFrom",
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
            "@value": "Date Valid From"
          }],
          "max": 1,
          "heading": "Context"
        },
        "http://schema.org/validThrough": {
          "@id": "https://purl.org/ctdlasn/terms/validThrough",
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
            "@value": "Date Valid Until"
          }],
          "max": 1,
          "heading": "Context"
        },
        "https://purl.org/ctdlasn/terms/dateCreated": {
          "@id": "https://purl.org/ctdlasn/terms/dateCreated",
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
            "@value": "Date Created"
          }],
          "max": 1,
          "heading": "Context"
        },
        "https://purl.org/ctdlasn/terms/dateModified": {
          "@id": "https://purl.org/ctdlasn/terms/dateModified",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2001/XMLSchema#date"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The date on which this resource was most recently modified in some way."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Date Modified"
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
          "heading": "Rights",
          "max": 1
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
        "https://schema.cassproject.org/0.4/socList": {
          "@id": "https://schema.cassproject.org/0.4/socList",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Type of occupation; select from an existing enumeration of such types. See https://www.bls.gov/soc/."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Occupation Type"
          }],
          "heading": "General"
        },
        "https://schema.cassproject.org/0.4/naicsList": {
          "@id": "https://schema.cassproject.org/0.4/naicsList",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Type of industry; select from an existing enumeration of such types such as the SIC, NAICS, and ISIC classifications. See https://www.naics.com/search/."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Industry Type"
          }],
          "heading": "General"
        },
        "https://schema.cassproject.org/0.4/cipList": {
          "@id": "https://schema.cassproject.org/0.4/cipList",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Type of instructional program; select from an existing enumeration of such types. See https://nces.ed.gov/ipeds/cipcode."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Instructional Program Type"
          }],
          "heading": "Tagging"
        },
        "https://purl.org/ctdlasn/terms/localSubject": {
          "@id": "https://purl.org/ctdlasn/terms/localSubject",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The text string denoting the subject of the competency framework or competency as designated by the promulgating agency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Local Subject"
          }],
          "heading": "Tagging"
        },
        "http://purl.org/ASN/schema/core/hasProgressionModel": {
          "@id": "http://purl.org/ASN/schema/core/hasProgressionModel",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Reference to a progression model used."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Has Progression Model"
          }],
          "max": 1,
          "heading": "Connections"
        },
        "headings": ["General", "Tagging", "Connections", "Context", "Rights", "Keys"],
        "primaryProperties": ["http://schema.org/name", "http://schema.org/description"],
        "secondaryProperties": ["http://schema.org/creator", "https://purl.org/ctdlasn/terms/publisherName", "http://schema.org/publisher", "http://schema.org/inLanguage", "http://schema.org/keywords", "https://purl.org/ctdlasn/terms/conceptTerm", "https://purl.org/ctdlasn/terms/derivedFrom", "https://purl.org/ctdlasn/terms/alignFrom", "https://purl.org/ctdlasn/terms/alignTo", "http://purl.org/dc/elements/1.1/source", "https://purl.org/ctdlasn/terms/educationLevelType", "https://schema.cassproject.org/0.4/socList", "https://schema.cassproject.org/0.4/naicsList", "http://purl.org/ASN/schema/core/hasProgressionModel"],
        "tertiaryProperties": ["@id", "registryURL", "ctid", "https://purl.org/ctdlasn/terms/dateCreated", "https://purl.org/ctdlasn/terms/dateModified", "http://schema.org/validFrom", "http://schema.org/validThrough", "https://purl.org/ctdlasn/terms/publicationStatusType", "http://schema.org/identifier", "http://schema.org/copyrightYear", "http://schema.org/license", "http://purl.org/dc/elements/1.1/rights", "http://schema.org/copyrightHolder", "http://schema.org/author", "https://purl.org/ctdlasn/terms/localSubject", "https://schema.cassproject.org/0.4/cipList"]
      };
    },
    ctdlAsnCollectionProfile: function ctdlAsnCollectionProfile() {
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
            "@value": "The URL of the collection. If imported from another source, the URL of the collection from which this one originates."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Canonical URL"
          }],
          "readOnly": "true",
          "max": 1,
          "heading": "Keys"
        },
        "registryURL": {
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The Credential Registry URL of the collection."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Credential Registry URL"
          }],
          "readOnly": "true",
          "valuesIndexed": function valuesIndexed() {
            return me.registryURLs;
          },
          "max": 1,
          "heading": "Keys"
        },
        "ctid": {
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The CTID of the collection."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "CTID"
          }],
          "readOnly": "true",
          "valuesIndexed": function valuesIndexed() {
            return me.ctids;
          },
          "max": 1,
          "heading": "Keys"
        },
        "http://schema.org/name": {
          "@id": "https://purl.org/ctdl/terms/name",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The name or title of this competency collection. One name or title per language."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Name"
          }],
          "isRequired": "true",
          "onePerLanguage": "true",
          "heading": "General"
        },
        "http://schema.org/description": {
          "@id": "https://purl.org/ctdl/terms/description",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A short description of this collection. One description per language."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Description"
          }],
          "onePerLanguage": "true",
          "isRequired": "true",
          "heading": "General"
        },
        "https://purl.org/ctdl/terms/ownedBy": {
          "@id": "https://purl.org/ctdl/terms/ownedBy",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Organization or person with an enforceable claim or legal title to the resource."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Owned By"
          }],
          "heading": "General",
          "isRequired": "true"
        },
        "http://schema.org/license": {
          "@id": "https://purl.org/ctdlasn/terms/license",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A legal document giving official permission to do something with this resource."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "License"
          }],
          "max": 1,
          "heading": "General"
        },
        "https://purl.org/ctdl/terms/classification": {
          "@id": "https://purl.org/ctdl/terms/classification",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Category or classification of this resource."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Classification"
          }],
          "noTextEditing": "true",
          "heading": "General"
        },
        "https://purl.org/ctdl/terms/codedNotation": {
          "@id": "https://purl.org/ctdl/terms/codedNotation",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Set of alpha-numeric symbols as defined by the body responsible for this resource that uniquely identifies this resource and supports its discovery and use."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Coded Notation"
          }],
          "max": 1,
          "heading": "General"
        },
        "https://purl.org/ctdl/terms/dateEffective": {
          "@id": "https://purl.org/ctdl/terms/dateEffective",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2001/XMLSchema#date"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Effective date of the content of a credential, assessment or learning opportunity."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Date Effective"
          }],
          "max": 1,
          "heading": "General"
        },
        "https://purl.org/ctdl/terms/expirationDate": {
          "@id": "https://purl.org/ctdl/terms/expirationDate",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2001/XMLSchema#date"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Date beyond which the resource is no longer offered or available."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Expiration Date"
          }],
          "max": 1,
          "heading": "General"
        },
        "https://purl.org/ctdl/terms/collectionType": {
          "@id": "https://purl.org/ctdl/terms/collectionType",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Type of collection, list, array, or other grouping of resources; select from an existing enumeration of such types. Concept scheme: Collection Category."
          }],
          "options": [{
            display: "ETPL",
            val: "ETPL"
          }, {
            display: "GIBill",
            val: "GIBill"
          }, {
            display: "IndustryRecognized",
            val: "IndustryRecognized"
          }, {
            display: "Perkins",
            val: "Perkins"
          }, {
            display: "PromiseScholarship",
            val: "PromiseScholarship"
          }, {
            display: "Quality",
            val: "Quality"
          }, {
            display: "StateApprovedPostsecondary",
            val: "StateApprovedPostsecondary"
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Collection Type"
          }],
          "heading": "General"
        },
        "https://schema.cassproject.org/0.4/socList": {
          "@id": "https://schema.cassproject.org/0.4/socList",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Type of occupation; select from an existing enumeration of such types. See https://www.bls.gov/soc/."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Occupation Type"
          }],
          "heading": "Tagging"
        },
        "https://schema.cassproject.org/0.4/naicsList": {
          "@id": "https://schema.cassproject.org/0.4/naicsList",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Type of industry; select from an existing enumeration of such types such as the SIC, NAICS, and ISIC classifications. See https://www.naics.com/search/."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Industry Type"
          }],
          "heading": "Tagging"
        },
        "https://schema.cassproject.org/0.4/cipList": {
          "@id": "https://schema.cassproject.org/0.4/cipList",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Type of instructional program; select from an existing enumeration of such types. See https://nces.ed.gov/ipeds/cipcode."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Instructional Program Type"
          }],
          "heading": "Tagging"
        },
        "http://schema.org/inLanguage": {
          "@id": "https://purl.org/ctdl/terms/inLanguage",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The primary language or languages of the entity, even if it makes use of other languages; e.g., a course offered in English to teach Spanish would have an inLanguage of English, while a credential in Quebec could have an inLanguage of both French and English."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "In Language"
          }],
          "heading": "General"
        },
        "http://schema.org/keywords": {
          "@id": "https://purl.org/ctdl/terms/keyword",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Keyword or key phrase describing relevant aspects of an entity."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Keyword"
          }],
          "heading": "Tagging"
        },
        "https://purl.org/ctdl/terms/subject": {
          "@id": "https://purl.org/ctdl/terms/subject",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Words or brief phrases describing the topicality of the entity; select subject terms from an existing enumeration of such terms."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Subject"
          }],
          "heading": "Tagging"
        },
        "https://purl.org/ctdl/terms/subjectWebpage": {
          "@id": "https://purl.org/ctdl/terms/subjectWebpage",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Webpage that describes this entity."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Subject Webpage"
          }],
          "max": 1,
          "heading": "General"
        },
        "https://purl.org/ctdl/terms/membershipCondition": {
          "@id": "https://purl.org/ctdl/terms/membershipCondition",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Conditions and requirements to be included as a member."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Membership Condition"
          }],
          "heading": "General"
        },
        "headings": ["General", "Tagging", "Keys"],
        "primaryProperties": ["http://schema.org/name", "http://schema.org/description", "http://schema.org/license", "https://purl.org/ctdl/terms/codedNotation", "https://purl.org/ctdl/terms/dateEffective", "https://purl.org/ctdl/terms/expirationDate", "http://schema.org/inLanguage", "https://purl.org/ctdl/terms/subjectWebpage"],
        "secondaryProperties": ["https://purl.org/ctdl/terms/classification", "https://purl.org/ctdl/terms/collectionType", "https://purl.org/ctdl/terms/membershipCondition", "https://schema.cassproject.org/0.4/socList", "https://schema.cassproject.org/0.4/naicsList", "https://schema.cassproject.org/0.4/cipList", "http://schema.org/keywords", "https://purl.org/ctdl/terms/ownedBy", "https://purl.org/ctdl/terms/subject"],
        "tertiaryProperties": ["@id", "registryURL", "ctid"]
      };
    },
    ctdlAsnCompetencyProfile: function ctdlAsnCompetencyProfile() {
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
            "@value": "The URL of the competency. If imported from another source, the URL of the competency from which this one originates."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Canonical URL"
          }],
          "readOnly": "true",
          "max": 1,
          "heading": "Keys"
        },
        "registryURL": {
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
            "@value": "The Credential Registry URL of the competency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Credential Registry URL"
          }],
          "readOnly": "true",
          "valuesIndexed": function valuesIndexed() {
            return me.registryURLs;
          },
          "max": 1,
          "heading": "Keys"
        },
        "ctid": {
          "@id": "https://schema.cassproject.org/0.4/Competency/id",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The CTID of the competency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "CTID"
          }],
          "readOnly": "true",
          "valuesIndexed": function valuesIndexed() {
            return me.ctids;
          },
          "max": 1,
          "heading": "Keys"
        },
        "https://purl.org/ctdlasn/terms/competencyLabel": {
          "@id": "https://purl.org/ctdlasn/terms/competencyLabel",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Short identifying phrase or name applied to a competency by the creator of the competency framework."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Competency Label"
          }],
          "onePerLanguage": "true",
          "heading": "General"
        },
        "http://schema.org/name": {
          "@id": "https://purl.org/ctdlasn/terms/competencyText",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The text of the competency. One per language."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Competency Text"
          }],
          "isRequired": "true",
          "onePerLanguage": "true",
          "heading": "General"
        },
        "http://schema.org/description": {
          "@id": "https://purl.org/ctdlasn/terms/comment",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Supplemental text provided by the promulgating body that clarifies the nature, scope or use of this competency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Comment"
          }],
          "heading": "General"
        },
        "http://purl.org/dc/terms/type": {
          "@id": "https://purl.org/ctdlasn/terms/competencyCategory",
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
            "@value": "Competency Category"
          }],
          "onePerLanguage": "true",
          "heading": "General"
        },
        "https://purl.org/ctdlasn/terms/dateCreated": {
          "@id": "https://purl.org/ctdlasn/terms/dateCreated",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
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
            "@value": "Date Created"
          }],
          "max": 1,
          "heading": "Context"
        },
        "https://purl.org/ctdlasn/terms/dateModified": {
          "@id": "https://purl.org/ctdlasn/terms/dateModified",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2001/XMLSchema#date"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The date on which this resource was most recently modified in some way."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Date Modified"
          }],
          "max": 1,
          "heading": "Context"
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
        "https://purl.org/ctdlasn/terms/publicationStatusType": {
          "@id": "https://purl.org/ctdlasn/terms/publicationStatusType",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Publication status of the source competency. The original competency may be drafted, published, or depreciated outside of this system."
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
        "https://purl.org/ctdlasn/terms/altCodedNotation": {
          "@id": "https://purl.org/ctdlasn/terms/altCodedNotation",
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
            "@value": "Alternative Coded Notation"
          }],
          "heading": "Context"
        },
        "https://purl.org/ctdlasn/terms/comprisedOf": {
          "@id": "https://purl.org/ctdlasn/terms/comprisedOf",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "This competency includes, comprehends or encompasses, in whole or in part, the meaning, nature or importance of the referenced competency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Comprised Of"
          }],
          "heading": "Connections"
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
            "@value": "A third party version of the entity being referenced that has been modified in meaning through editing, extension, or refinement.\n                            For example: https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Derived From"
          }],
          "heading": "Connections"
        },
        "https://purl.org/ctdlasn/terms/alignFrom": {
          "@id": "https://purl.org/ctdlasn/terms/alignFrom",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A competency from which this competency is aligned."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Align From"
          }],
          "max": 1,
          "heading": "Connections"
        },
        "https://purl.org/ctdlasn/terms/alignTo": {
          "@id": "https://purl.org/ctdlasn/terms/alignTo",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A competency to which this competency is aligned."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Align To"
          }],
          "max": 1,
          "heading": "Connections"
        },
        "http://schema.org/identifier": {
          "@id": "https://purl.org/ctdlasn/terms/identifier",
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
        "http://schema.org/inLanguage": {
          "@id": "http://schema.org/inLanguage",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
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
          "isRequired": "true",
          "heading": "General"
        },
        "http://schema.org/author": {
          "@id": "http://schema.org/author",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A person or organization chiefly responsible for the intellectual or artistic content of this competency framework or competency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Author"
          }],
          "heading": "General"
        },
        "http://schema.org/keywords": {
          "@id": "https://purl.org/ctdlasn/terms/conceptKeyword",
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
            "@value": "Concept Keyword"
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
            "@value": "Concept Term"
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
        "https://purl.org/ctdlasn/terms/isVersionOf": {
          "@id": "https://purl.org/ctdlasn/terms/isVersionOf",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A related competency of which this competency is a version, edition, or adaptation."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Is Version Of"
          }],
          "max": 1,
          "heading": "Connections"
        },
        "narrows": {
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Covers all of the relevant concepts in the referenced competency as well as relevant concepts not found in the referenced competency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Broad Alignment"
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
          "heading": "Connections"
        },
        "broadens": {
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Covers all of the relevant concepts in this competency as well as relevant concepts not found in this competency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Narrow Alignment"
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
          "heading": "Connections"
        },
        "isEquivalentTo": {
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Relevant concepts in this competency and the referenced competency are coextensive."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Exact Alignment"
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
          "heading": "Connections"
        },
        "majorRelated": {
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Major overlap of relevant concepts between this competency and the referenced competency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Major Alignment"
          }],
          "valuesIndexed": function valuesIndexed() {
            return me.relations["majorRelated"];
          },
          "noTextEditing": "true",
          "add": function () {
            var _add4 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().mark(function _callee7(selectedCompetency, values) {
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().wrap(function _callee7$(_context7) {
                while (1) switch (_context7.prev = _context7.next) {
                  case 0:
                    _context7.next = 2;
                    return me.addRelationsToFramework(selectedCompetency, "majorRelated", values);
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
                    return me.removeRelationFromFramework(source, "majorRelated", target);
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
          "heading": "Connections"
        },
        "minorRelated": {
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Minor overlap of relevant concepts between this competency and the referenced competency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Minor Alignment"
          }],
          "valuesIndexed": function valuesIndexed() {
            return me.relations["minorRelated"];
          },
          "noTextEditing": "true",
          "add": function () {
            var _add5 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().mark(function _callee9(selectedCompetency, values) {
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().wrap(function _callee9$(_context9) {
                while (1) switch (_context9.prev = _context9.next) {
                  case 0:
                    _context9.next = 2;
                    return me.addRelationsToFramework(selectedCompetency, "minorRelated", values);
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
                    return me.removeRelationFromFramework(source, "minorRelated", target);
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
          "heading": "Connections"
        },
        "requires": {
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "This competency is a prerequisite to the referenced competency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Prerequisite Alignment"
          }],
          "valuesIndexed": function valuesIndexed() {
            return me.relations["requires"];
          },
          "noTextEditing": "true",
          "add": function () {
            var _add6 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().mark(function _callee11(selectedCompetency, values) {
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().wrap(function _callee11$(_context11) {
                while (1) switch (_context11.prev = _context11.next) {
                  case 0:
                    _context11.next = 2;
                    return me.addRelationsToFramework(selectedCompetency, "requires", values);
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
                    return me.removeRelationFromFramework(source, "requires", target);
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
          "heading": "Connections"
        },
        "https://purl.org/ctdlasn/terms/abilityEmbodied": {
          "@id": "https://purl.org/ctdlasn/terms/abilityEmbodied",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Enduring attributes of the individual that influence performance are embodied either directly or indirectly in this competency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Ability Embodied"
          }],
          "heading": "Connections"
        },
        "https://purl.org/ctdlasn/terms/knowledgeEmbodied": {
          "@id": "https://purl.org/ctdlasn/terms/knowledgeEmbodied",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Body of information embodied either directly or indirectly in this competency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Knowledge Embodied"
          }],
          "heading": "Connections"
        },
        "https://purl.org/ctdlasn/terms/skillEmbodied": {
          "@id": "https://purl.org/ctdlasn/terms/skillEmbodied",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Cognitive, affective, and psychomotor skills directly or indirectly embodied in this competency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Skill Embodied"
          }],
          "heading": "Connections"
        },
        "https://purl.org/ctdlasn/terms/taskEmbodied": {
          "@id": "https://purl.org/ctdlasn/terms/taskEmbodied",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Specifically defined piece of work embodied either directly or indirectly in this competency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Task Embodied"
          }],
          "heading": "Connections"
        },
        "https://schema.cassproject.org/0.4/socList": {
          "@id": "https://schema.cassproject.org/0.4/socList",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Type of occupation; select from an existing enumeration of such types. See https://www.bls.gov/soc/."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Occupation Type"
          }],
          "heading": "General"
        },
        "https://schema.cassproject.org/0.4/naicsList": {
          "@id": "https://schema.cassproject.org/0.4/naicsList",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Type of industry; select from an existing enumeration of such types such as the SIC, NAICS, and ISIC classifications. See https://www.naics.com/search/."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Industry Type"
          }],
          "heading": "General"
        },
        "https://schema.cassproject.org/0.4/cipList": {
          "@id": "https://schema.cassproject.org/0.4/cipList",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Type of instructional program; select from an existing enumeration of such types. See https://nces.ed.gov/ipeds/cipcode."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Instructional Program Type"
          }],
          "heading": "General"
        },
        "https://purl.org/ctdlasn/terms/localSubject": {
          "@id": "https://purl.org/ctdlasn/terms/localSubject",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The text string denoting the subject of the competency framework or competency as designated by the promulgating agency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Local Subject"
          }],
          "heading": "Tagging"
        },
        "https://purl.org/ctdlasn/terms/crossSubjectReference": {
          "@id": "https://purl.org/ctdlasn/terms/crossSubjectReference",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A relationship between this competency and a competency in a separate competency framework."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Cross Subject Reference"
          }],
          "heading": "Context"
        },
        "https://purl.org/ctdl/terms/environmentalHazardType": {
          "@id": "https://purl.org/ctdl/terms/environmentalHazardType",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Type of condition in the physical work performance environment that entails risk exposures requiring mitigating processes; select from an existing enumeration of such types."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Environmental Hazard Type"
          }],
          "heading": "Context"
        },
        "https://purl.org/ctdl/terms/performanceLevelType": {
          "@id": "https://purl.org/ctdl/terms/performanceLevelType",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Type of required or expected human performance level; select from an existing enumeration of such types."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Performance Level Type"
          }],
          "heading": "Context"
        },
        "https://purl.org/ctdl/terms/physicalCapabilityType": {
          "@id": "https://purl.org/ctdl/terms/physicalCapabilityType",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Type of physical activity required or expected in performance; select from an existing enumeration of such types."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Physical Capability Type"
          }],
          "heading": "Context"
        },
        "https://purl.org/ctdl/terms/sensoryCapabilityType": {
          "@id": "https://purl.org/ctdl/terms/sensoryCapabilityType",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Type of required or expected sensory capability; select from an existing enumeration of such types."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Sensory Capability Type"
          }],
          "heading": "Context"
        },
        "https://purl.org/ctdlasn/terms/substantiatingResource": {
          "@id": "https://purl.org/ctdlasn/terms/substantiatingResource",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Aspects of the referenced resource provide some justification that the resource being described is useful."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Substantiating Resource"
          }],
          "heading": "Context"
        },
        "https://purl.org/ctdlasn/terms/substantiatingCompetencyFramework": {
          "@id": "https://purl.org/ctdlasn/terms/substantiatingCompetencyFramework",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Aspects of the referenced Competency Framework provide some justification that the resource being described is useful."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Substantiating Competency Framework"
          }],
          "heading": "Context"
        },
        "https://purl.org/ctdlasn/terms/substantiatingCredential": {
          "@id": "https://purl.org/ctdlasn/terms/substantiatingCredential",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Aspects of the referenced Credential provide some justification that the resource being described is useful."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Substantiating Credential"
          }],
          "heading": "Context"
        },
        "https://purl.org/ctdlasn/terms/substantiatingJob": {
          "@id": "https://purl.org/ctdlasn/terms/substantiatingJob",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Aspects of the referenced Job provide some justification that the resource being described is useful."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Substantiating Job"
          }],
          "heading": "Context"
        },
        "https://purl.org/ctdlasn/terms/substantiatingOccupation": {
          "@id": "https://purl.org/ctdlasn/terms/substantiatingOccupation",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Aspects of the referenced Occupation provide some justification that the resource being described is useful."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Substantiating Occupation"
          }],
          "heading": "Context"
        },
        "https://purl.org/ctdlasn/terms/substantiatingOrganization": {
          "@id": "https://purl.org/ctdlasn/terms/substantiatingOrganization",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Aspects of the referenced Organization provide some justification that the resource being described is useful."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Substantiating Organization"
          }],
          "heading": "Context"
        },
        "https://purl.org/ctdlasn/terms/substantiatingTask": {
          "@id": "https://purl.org/ctdlasn/terms/substantiatingTask",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Aspects of the referenced Task provide some justification that the resource being described is useful."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Substantiating Task"
          }],
          "heading": "Context"
        },
        "https://purl.org/ctdlasn/terms/substantiatingWorkRole": {
          "@id": "https://purl.org/ctdlasn/terms/substantiatingResource",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Aspects of the referenced Work Role provide some justification that the resource being described is useful."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Substantiating Work Role"
          }],
          "heading": "Context"
        },
        "https://purl.org/ctdlasn/terms/sourceDocumentation": {
          "@id": "https://purl.org/ctdlasn/terms/sourceDocumentation",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Human-readable information resource other than a competency framework from which this competency was generated or derived by humans or machines."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Source Documentation"
          }],
          "heading": "Connections"
        },
        "https://purl.org/ctdlasn/terms/inferredCompetency": {
          "@id": "https://purl.org/ctdlasn/terms/inferredCompetency",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Competency deduced or arrive at by reasoning on the competency being described."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Inferred Competency"
          }],
          "heading": "Connections",
          "isDirectLink": 'true'
        },
        "https://purl.org/ctdl/terms/hasWorkforceDemand": {
          "@id": "https://purl.org/ctdl/terms/hasWorkforceDemand",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Indicates the level of demand for a resource via a demand level action."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Has Workforce Demand"
          }],
          "heading": "Connections"
        },
        "https://purl.org/ctdl/terms/hasTask": {
          "@id": "https://purl.org/ctdl/terms/hasTask",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Task related to this resource."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Has Task"
          }],
          "heading": "Context"
        },
        "http://schema.org/creator": {
          "@id": "http://schema.org/creator",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
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
        "http://purl.org/ASN/schema/core/hasProgressionLevel": {
          "@id": "http://purl.org/ASN/schema/core/hasProgressionLevel",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Reference to a specific point in a progression model."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Has Progression Level"
          }],
          "heading": "Connections"
        },
        "headings": ["General", "Context", "Tagging", "Scales", "Connections", "Keys"],
        "primaryProperties": ["https://purl.org/ctdlasn/terms/competencyLabel", "http://schema.org/name", "http://schema.org/description", "http://purl.org/dc/terms/type", "https://purl.org/ctdlasn/terms/listID", "https://purl.org/ctdlasn/terms/codedNotation", "https://purl.org/ctdlasn/terms/altCodedNotation"],
        "secondaryProperties": ["https://purl.org/ctdlasn/terms/abilityEmbodied", "https://purl.org/ctdlasn/terms/knowledgeEmbodied", "https://purl.org/ctdlasn/terms/skillEmbodied", "https://purl.org/ctdlasn/terms/taskEmbodied", "http://schema.org/inLanguage", "http://schema.org/keywords", "https://purl.org/ctdlasn/terms/conceptTerm", "https://purl.org/ctdlasn/terms/complexityLevel", "https://purl.org/ctdlasn/terms/weight", "https://schema.cassproject.org/0.4/socList", "https://schema.cassproject.org/0.4/naicsList", "https://purl.org/ctdlasn/terms/localSubject", "https://purl.org/ctdlasn/terms/crossSubjectReference", "https://schema.cassproject.org/0.4/cipList"],
        "tertiaryProperties": ["@id", "registryURL", "ctid", "narrows", "broadens", "isEquivalentTo", "majorRelated", "minorRelated", "requires", "https://purl.org/ctdlasn/terms/isVersionOf", "https://purl.org/ctdlasn/terms/comprisedOf", "https://purl.org/ctdlasn/terms/dateCreated", "https://purl.org/ctdlasn/terms/dateModified", "https://purl.org/ctdlasn/terms/educationLevelType", "https://purl.org/ctdlasn/terms/publicationStatusType", "https://purl.org/ctdlasn/terms/derivedFrom", "https://purl.org/ctdlasn/terms/alignFrom", "https://purl.org/ctdlasn/terms/alignTo", "http://schema.org/identifier", "https://purl.org/ctdl/terms/environmentalHazardType", "https://purl.org/ctdl/terms/performanceLevelType", "https://purl.org/ctdl/terms/physicalCapabilityType", "https://purl.org/ctdl/terms/sensoryCapabilityType", "https://purl.org/ctdlasn/terms/substantiatingResource", "https://purl.org/ctdlasn/terms/substantiatingCompetencyFramework", "https://purl.org/ctdlasn/terms/substantiatingCredential", "https://purl.org/ctdlasn/terms/substantiatingJob", "https://purl.org/ctdlasn/terms/substantiatingOccupation", "https://purl.org/ctdlasn/terms/substantiatingOrganization", "https://purl.org/ctdlasn/terms/substantiatingTask", "https://purl.org/ctdlasn/terms/substantiatingWorkRole", "https://purl.org/ctdlasn/terms/sourceDocumentation", "https://purl.org/ctdlasn/terms/inferredCompetency", "https://purl.org/ctdl/terms/hasWorkforceDemand", "https://purl.org/ctdl/terms/hasTask", "http://schema.org/creator", "http://schema.org/author", "http://purl.org/ASN/schema/core/hasProgressionLevel"]
      };
    },
    ctdlAsnConceptSchemeProfile: function ctdlAsnConceptSchemeProfile() {
      var me = this;
      return {
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
        "registryURL": {
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/ConceptScheme"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The Credential Registry URL of the concept scheme."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Credential Registry URL"
          }],
          "readOnly": "true",
          "valuesIndexed": function valuesIndexed() {
            return me.registryURLs;
          },
          "max": 1,
          "heading": "Keys"
        },
        "ctid": {
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/ConceptScheme"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The CTID of the concept scheme."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "CTID"
          }],
          "readOnly": "true",
          "valuesIndexed": function valuesIndexed() {
            return me.ctids;
          },
          "max": 1,
          "heading": "Keys"
        },
        "http://purl.org/dc/terms/title": {
          "@id": "https://purl.org/ctdlasn/terms/name",
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
            "@value": "Name"
          }],
          "heading": "General",
          "onePerLanguage": "true",
          "isRequired": "true"
        },
        "http://purl.org/dc/terms/description": {
          "@id": "https://purl.org/ctdlasn/terms/description",
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
          "isRequired": "true",
          "onePerLanguage": "true"
        },
        "https://purl.org/ctdlasn/terms/dateCreated": {
          "@id": "https://purl.org/ctdlasn/terms/dateCreated",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/ConceptScheme"
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
            "@value": "Date Created"
          }],
          "max": 1,
          "heading": "Context"
        },
        "https://purl.org/ctdlasn/terms/dateModified": {
          "@id": "https://purl.org/ctdlasn/terms/dateModified",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/ConceptScheme"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2001/XMLSchema#date"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The date on which this resource was most recently modified in some way."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Date Modified"
          }],
          "max": 1,
          "heading": "Context"
        },
        "http://purl.org/dc/terms/creator": {
          "@id": "https://purl.org/ctdlasn/terms/creator",
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
          "@id": "https://purl.org/ctdlasn/terms/publisher",
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
          "heading": "General"
        },
        "http://purl.org/dc/terms/language": {
          "@id": "https://purl.org/ctdlasn/terms/inLanguage",
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
          "isRequired": "true",
          "heading": "General"
        },
        "http://purl.org/dc/elements/1.1/source": {
          "@id": "https://purl.org/ctdlasn/terms/source",
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
          "heading": "General"
        },
        "https://purl.org/ctdlasn/terms/conceptKeyword": {
          "@id": "https://purl.org/ctdlasn/terms/conceptKeyword",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A word or phrase used by the promulgating agency to refine and differentiate individual resources contextually."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Concept Keyword"
          }],
          "heading": "Tagging"
        },
        "https://purl.org/ctdlasn/terms/conceptTerm": {
          "@id": "https://purl.org/ctdlasn/terms/conceptTerm",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
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
            "@value": "Concept Term"
          }],
          "noTextEditing": "true",
          "heading": "Tagging"
        },
        "https://purl.org/ctdlasn/terms/publicationStatusType": {
          "@id": "https://purl.org/ctdlasn/terms/publicationStatusType",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The publication status of this resource."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Publication Status"
          }],
          "heading": "Context",
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
          "isRequired": "true",
          "max": 1
        },
        "http://purl.org/dc/terms/dateCopyrighted": {
          "@id": "https://purl.org/ctdlasn/terms/dateCopyrighted",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
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
          "heading": "Rights",
          "max": 1
        },
        "http://purl.org/dc/terms/license": {
          "@id": "https://purl.org/ctdlasn/terms/license",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A legal document giving official permission to do something with this resource. For example, https://sandbox.credentialengineregistry.org/"
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "License"
          }],
          "heading": "Rights",
          "max": 1
        },
        "http://purl.org/dc/terms/rights": {
          "@id": "https://purl.org/ctdlasn/terms/rights",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Information about rights held in and over this resource."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Rights"
          }],
          "heading": "Rights",
          "max": 1
        },
        "http://purl.org/dc/terms/rightsHolder": {
          "@id": "http://purl.org/dc/terms/rightsHolder",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "An agent owning or managing rights over this resource. For example, https://credentialengineregistry.org/."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Rights Holder"
          }],
          "heading": "Rights"
        },
        "headings": ["General", "Tagging", "Context", "Rights", "Keys"],
        "primaryProperties": ["http://purl.org/dc/terms/title", "http://purl.org/dc/terms/description", "https://purl.org/ctdlasn/terms/conceptKeyword", "https://purl.org/ctdlasn/terms/conceptTerm", "https://purl.org/ctdlasn/terms/publisherName"],
        "secondaryProperties": ["http://purl.org/dc/terms/creator", "http://purl.org/dc/terms/publisher", "http://purl.org/dc/terms/language", "http://purl.org/dc/elements/1.1/source"],
        "tertiaryProperties": ["@id", "registryURL", "ctid", "https://purl.org/ctdlasn/terms/publicationStatusType", "http://purl.org/dc/terms/dateCopyrighted", "https://purl.org/ctdlasn/terms/dateCreated", "https://purl.org/ctdlasn/terms/dateModified", "http://purl.org/dc/terms/license", "http://purl.org/dc/terms/rights", "http://purl.org/dc/terms/rightsHolder"]
      };
    },
    ctdlAsnConceptProfile: function ctdlAsnConceptProfile() {
      var me = this;
      return {
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
        "registryURL": {
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Concept"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The Credential Registry URL of the concept."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Credential Registry URL"
          }],
          "readOnly": "true",
          "valuesIndexed": function valuesIndexed() {
            return me.conceptRegistryUrls;
          },
          "max": 1,
          "heading": "Keys"
        },
        "ctid": {
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Concept"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The CTID of the concept."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "CTID"
          }],
          "readOnly": "true",
          "valuesIndexed": function valuesIndexed() {
            return me.conceptCtids;
          },
          "max": 1,
          "heading": "Keys"
        },
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
          "max": 1,
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
        "http://www.w3.org/2004/02/skos/core#changeNote": {
          "@id": "http://www.w3.org/2004/02/skos/core#changeNote",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "http://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Text describing a significant change to the concept."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Change Note"
          }],
          "heading": "Documentation"
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
          "noTextEditing": "true",
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
          "noTextEditing": "true",
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
          "noTextEditing": "true",
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
          "noTextEditing": "true",
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
          "noTextEditing": "true",
          "heading": "Connections"
        },
        "headings": ["General", "Other Labels", "Documentation", "Connections", "Keys"],
        "primaryProperties": ["http://www.w3.org/2004/02/skos/core#prefLabel", "http://www.w3.org/2004/02/skos/core#definition", "http://www.w3.org/2004/02/skos/core#notation", "http://www.w3.org/2004/02/skos/core#altLabel"],
        "secondaryProperties": ["http://www.w3.org/2004/02/skos/core#broadMatch", "http://www.w3.org/2004/02/skos/core#closeMatch", "http://www.w3.org/2004/02/skos/core#exactMatch", "http://www.w3.org/2004/02/skos/core#narrowMatch", "http://www.w3.org/2004/02/skos/core#related"],
        "tertiaryProperties": ["@id", "registryURL", "ctid", "http://www.w3.org/2004/02/skos/core#hiddenLabel", "http://www.w3.org/2004/02/skos/core#note", "http://www.w3.org/2004/02/skos/core#changeNote"]
      };
    },
    ctdlAsnProgressionModelProfile: function ctdlAsnProgressionModelProfile() {
      var me = this;
      return {
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
            "@value": "The URL of the progression model. If imported from another source, the URL of the progression model from which this one originates."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Canonical URL"
          }],
          "readOnly": "true",
          "max": 1,
          "heading": "Keys"
        },
        "registryURL": {
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/ConceptScheme"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The Credential Registry URL of the progression model."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Credential Registry URL"
          }],
          "readOnly": "true",
          "valuesIndexed": function valuesIndexed() {
            return me.registryURLs;
          },
          "max": 1,
          "heading": "Keys"
        },
        "ctid": {
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/ConceptScheme"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The CTID of the progression model."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "CTID"
          }],
          "readOnly": "true",
          "valuesIndexed": function valuesIndexed() {
            return me.ctids;
          },
          "max": 1,
          "heading": "Keys"
        },
        "https://purl.org/ctdlasn/terms/dateCreated": {
          "@id": "https://purl.org/ctdlasn/terms/dateCreated",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/ConceptScheme"
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
            "@value": "Date Created"
          }],
          "max": 1,
          "heading": "Context"
        },
        "https://purl.org/ctdlasn/terms/dateModified": {
          "@id": "https://purl.org/ctdlasn/terms/dateModified",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/ConceptScheme"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2001/XMLSchema#date"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The date on which this resource was most recently modified in some way."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Date Modified"
          }],
          "max": 1,
          "heading": "Context"
        },
        "http://purl.org/dc/terms/title": {
          "@id": "https://purl.org/ctdlasn/terms/name",
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
            "@value": "Name"
          }],
          "heading": "General",
          "onePerLanguage": "true",
          "isRequired": "true"
        },
        "http://purl.org/dc/terms/description": {
          "@id": "https://purl.org/ctdlasn/terms/description",
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
          "isRequired": "true",
          "onePerLanguage": "true"
        },
        "http://purl.org/dc/terms/creator": {
          "@id": "https://purl.org/ctdlasn/terms/creator",
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
          "@id": "https://purl.org/ctdlasn/terms/publisher",
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
          "heading": "General"
        },
        "http://purl.org/dc/terms/language": {
          "@id": "https://purl.org/ctdlasn/terms/inLanguage",
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
          "isRequired": "true",
          "heading": "General"
        },
        "http://purl.org/dc/elements/1.1/source": {
          "@id": "https://purl.org/ctdlasn/terms/source",
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
          "heading": "General"
        },
        "https://purl.org/ctdlasn/terms/conceptKeyword": {
          "@id": "https://purl.org/ctdlasn/terms/conceptKeyword",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A word or phrase used by the promulgating agency to refine and differentiate individual resources contextually."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Concept Keyword"
          }],
          "heading": "Tagging"
        },
        "https://purl.org/ctdlasn/terms/conceptTerm": {
          "@id": "https://purl.org/ctdlasn/terms/conceptTerm",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
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
            "@value": "Concept Term"
          }],
          "noTextEditing": "true",
          "heading": "Tagging"
        },
        "https://purl.org/ctdlasn/terms/publicationStatusType": {
          "@id": "https://purl.org/ctdlasn/terms/publicationStatusType",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The publication status of this resource."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Publication Status"
          }],
          "heading": "Context",
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
          "isRequired": "true",
          "max": 1
        },
        "http://purl.org/dc/terms/dateCopyrighted": {
          "@id": "https://purl.org/ctdlasn/terms/dateCopyrighted",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
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
          "heading": "Rights",
          "max": 1
        },
        "http://purl.org/dc/terms/license": {
          "@id": "https://purl.org/ctdlasn/terms/license",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A legal document giving official permission to do something with this resource. For example, https://sandbox.credentialengineregistry.org/"
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "License"
          }],
          "heading": "Rights",
          "max": 1
        },
        "http://purl.org/dc/terms/rights": {
          "@id": "https://purl.org/ctdlasn/terms/rights",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Information about rights held in and over this resource."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Rights"
          }],
          "heading": "Rights",
          "max": 1
        },
        "http://purl.org/dc/terms/rightsHolder": {
          "@id": "http://purl.org/dc/terms/rightsHolder",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "An agent owning or managing rights over this resource. For example, https://credentialengineregistry.org/."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Rights Holder"
          }],
          "heading": "Rights"
        },
        "headings": ["General", "Tagging", "Context", "Rights", "Keys"],
        "primaryProperties": ["http://purl.org/dc/terms/title", "http://purl.org/dc/terms/description", "https://purl.org/ctdlasn/terms/conceptKeyword", "https://purl.org/ctdlasn/terms/conceptTerm", "https://purl.org/ctdlasn/terms/publisherName"],
        "secondaryProperties": ["http://purl.org/dc/terms/creator", "http://purl.org/dc/terms/publisher", "http://purl.org/dc/terms/language", "http://purl.org/dc/elements/1.1/source"],
        "tertiaryProperties": ["@id", "registryURL", "ctid", "https://purl.org/ctdlasn/terms/publicationStatusType", "https://purl.org/ctdlasn/terms/dateCreated", "https://purl.org/ctdlasn/terms/dateModified", "http://purl.org/dc/terms/dateCopyrighted", "http://purl.org/dc/terms/license", "http://purl.org/dc/terms/rights", "http://purl.org/dc/terms/rightsHolder"]
      };
    },
    ctdlAsnProgressionLevelProfile: function ctdlAsnProgressionLevelProfile() {
      var me = this;
      return {
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
            "@value": "The URL of the progression level. If imported from another source, the URL of the progression level from which this one originates."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Canonical URL"
          }],
          "readOnly": "true",
          "max": 1,
          "heading": "Keys"
        },
        "registryURL": {
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Concept"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The Credential Registry URL of the progression level."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Credential Registry URL"
          }],
          "readOnly": "true",
          "valuesIndexed": function valuesIndexed() {
            return me.conceptRegistryUrls;
          },
          "max": 1,
          "heading": "Keys"
        },
        "ctid": {
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Concept"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The CTID of the progression level."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "CTID"
          }],
          "readOnly": "true",
          "valuesIndexed": function valuesIndexed() {
            return me.conceptCtids;
          },
          "max": 1,
          "heading": "Keys"
        },
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
            "@value": "Preferred language-tagged label representing this progression level. One label per language."
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
            "@value": "Supplies a complete explanation of the intended meaning of a progression level. One definition per language."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Definition"
          }],
          "heading": "General",
          "onePerLanguage": "true"
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
          "max": 1,
          "heading": "General"
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
            "@value": "Annotations to the progression level for purposes of general documentation."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Note"
          }],
          "heading": "Documentation"
        },
        "https://purl.org/ctdlasn/terms/inProgressionModel": {
          "@id": "https://purl.org/ctdlasn/terms/inProgressionModel",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "http://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/skos/ConceptScheme"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Progression Model to which this Progression Level belongs."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "In Progression Model"
          }],
          "heading": "General",
          "max": 1
        },
        "https://purl.org/ctdl/terms/precededBy": {
          "@id": "https://purl.org/ctdl/terms/precededBy",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "http://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Resource that logically comes before this resource."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Preceded By"
          }],
          "heading": "General",
          "max": 1
        },
        "https://purl.org/ctdl/terms/precedes": {
          "@id": "https://purl.org/ctdl/terms/precedes",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "http://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Resource that logically comes after this resource."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Precedes"
          }],
          "heading": "General",
          "max": 1
        },
        "headings": ["General", "Other Labels", "Documentation", "Connections", "Keys"],
        "primaryProperties": ["http://www.w3.org/2004/02/skos/core#prefLabel", "http://www.w3.org/2004/02/skos/core#definition", "http://www.w3.org/2004/02/skos/core#notation"],
        "secondaryProperties": ["https://purl.org/ctdlasn/terms/inProgressionModel"],
        "tertiaryProperties": ["@id", "registryURL", "ctid", "http://www.w3.org/2004/02/skos/core#note", "https://purl.org/ctdl/terms/precededBy", "https://purl.org/ctdl/terms/precedes"]
      };
    }
  }
});

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
//# sourceMappingURL=crosswalk.7a6516c6.js.map