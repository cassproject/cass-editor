(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-19b164da","chunk-6b291276","chunk-dc2b4b7e","chunk-25a2af2a","chunk-25a2af2a","chunk-74a95bb3"],{

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

/***/ "064b":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

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

/***/ "3dcd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"8dba96d0-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/framework/Search.vue?vue&type=template&id=6d7f2a0c
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "columns is-multiline"
  }, [!_vm.selectedFramework ? _c('div', {
    staticClass: "column is-12"
  }, [_c('SearchBar', {
    attrs: {
      "filterSet": "basic",
      "ownedByMe": _vm.initialOwnedByMe,
      "allowShowFrameworks": _vm.allowShowFrameworks,
      "searchType": _vm.searchType
    }
  })], 1) : _vm._e(), !_vm.selectedFramework ? _c('div', {
    staticClass: "column is-12"
  }, [_vm.$store.state.lode.competencySearchModalOpen ? _c('List', {
    attrs: {
      "type": _vm.searchTypeToPassToList,
      "view": "search",
      "parent": _vm.parent,
      "repo": _vm.repo,
      "click": _vm.select,
      "searchOptions": _vm.searchOptions,
      "paramObj": _vm.paramObj,
      "disallowEdits": true,
      "selectingCompetency": true,
      "selected": _vm.selectedIds,
      "displayFirst": _vm.displayFirst,
      "idsNotPermittedInSearch": _vm.idsNotPermittedInSearch
    }
  }) : _vm._e()], 1) : _vm._e(), _vm.selectedFramework && !_vm.hierarchyLoaded ? _c('div', [_vm._m(0)]) : _vm._e(), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.hierarchyLoaded,
      expression: "hierarchyLoaded"
    }]
  }, [_vm.selectedFramework ? _c('Thing', {
    attrs: {
      "parent": _vm.parent,
      "obj": _vm.selectedFramework,
      "repo": _vm.repo,
      "view": _vm.view,
      "expandInModal": true
    }
  }) : _vm._e(), _vm.selectedFramework ? _c('Hierarchy', {
    attrs: {
      "parent": _vm.parent,
      "container": _vm.selectedFramework,
      "view": "competencySearch",
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
      "viewOnly": true,
      "repo": _vm.repo,
      "highlightList": null,
      "properties": "primary"
    },
    on: {
      "done-loading-nodes": function doneLoadingNodes($event) {
        _vm.hierarchyLoaded = true;
      },
      "selected-array": _vm.selectedArrayEvent
    }
  }) : _vm._e()], 1)]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon is-large"
  }, [_c('i', {
    staticClass: "fa fa-spinner fa-2x fa-pulse"
  })]);
}];

// CONCATENATED MODULE: ./src/components/framework/Search.vue?vue&type=template&id=6d7f2a0c

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
var regeneratorRuntime = __webpack_require__("c7eb");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__("caad");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__("2532");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("159b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__("a434");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: ./src/lode/components/List.vue + 4 modules
var List = __webpack_require__("713e");

// EXTERNAL MODULE: ./src/lode/components/Hierarchy.vue + 4 modules
var Hierarchy = __webpack_require__("9418");

// EXTERNAL MODULE: ./src/lode/components/Thing.vue + 4 modules
var Thing = __webpack_require__("098b");

// EXTERNAL MODULE: ./src/mixins/common.js
var common = __webpack_require__("872c");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// EXTERNAL MODULE: ./src/components/framework/SearchBar.vue + 4 modules
var SearchBar = __webpack_require__("6b9e");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/framework/Search.vue?vue&type=script&lang=js


















/* harmony default export */ var Searchvue_type_script_lang_js = ({
  name: 'CompetencySearch',
  props: {
    parent: {
      type: String,
      default: ''
    },
    isActive: Boolean,
    view: {
      type: String,
      default: 'modal'
    },
    idsNotPermittedInSearch: {
      type: Array,
      default: null
    },
    allowShowFrameworks: {
      type: Boolean,
      default: false
    },
    clearFramework: {
      type: Boolean,
      default: false
    },
    typesPermittedInSearch: {
      type: Array,
      default: null
    }
  },
  components: {
    List: List["a" /* default */],
    SearchBar: SearchBar["a" /* default */],
    Hierarchy: Hierarchy["default"],
    Thing: Thing["default"]
  },
  mixins: [common["a" /* default */]],
  data: function data() {
    return {
      repo: window.repo,
      selectedIds: [],
      displayFirst: [],
      sortBy: null,
      selectedFramework: null,
      hierarchyLoaded: false
    };
  },
  created: function created() {
    this.sortBy = this.$store.getters['editor/conceptMode'] === true || this.$store.getters['editor/progressionMode'] === true || this.searchType === "Concept" ? "skos:prefLabel.keyword" : "name.keyword";
    this.$store.commit('app/searchTerm', "");
  },
  beforeDestroy: function beforeDestroy() {
    this.$store.commit('app/searchTerm', "");
  },
  computed: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["c" /* mapState */])({
    selectedCompetency: function selectedCompetency(state) {
      return state.editor.selectedCompetency;
    },
    framework: function framework(state) {
      return state.editor.framework;
    },
    queryParams: function queryParams(state) {
      return state.editor.queryParams;
    },
    addingProperty: function addingProperty(state) {
      return state.lode.addingProperty;
    }
  })), {}, {
    nameOfSelectedCompetency: function nameOfSelectedCompetency() {
      if (this.selectedCompetency && this.selectedCompetency.name) {
        return this.selectedCompetency.getName();
      } else if (this.selectedCompetency) {
        return schema.Thing.getDisplayStringFrom(this.selectedCompetency["skos:prefLabel"]);
      } else {
        return '';
      }
    },
    copyOrLink: function copyOrLink() {
      return this.$store.state.lode.copyOrLink;
    },
    frameworkName: function frameworkName() {
      if (this.framework) {
        return this.framework.getName();
      } else {
        return '';
      }
    },
    searchOptions: function searchOptions() {
      var _this = this;
      var search = "";
      if (this.queryParams && this.queryParams.filter != null) {
        search += " AND (" + this.queryParams.filter + ")";
      }
      /* var searchTerm = this.$store.getters['app/searchTerm'];
      if (!searchTerm || searchTerm.length === 0) {
          if (this.$store.getters['editor/conceptMode'] !== true) {
              search += " AND (name NOT \"\")";
          }
      }*/
      if (this.searchType === 'DirectLink') {
        search += " AND @type:Competency";
        if (this.typesPermittedInSearch && this.typesPermittedInSearch.length > 0) {
          search += " AND ((dcterms\\:type:" + this.typesPermittedInSearch[0] + ")";
          for (var i = 1; i < this.typesPermittedInSearch.length; i++) {
            search += " OR (dcterms\\:type:" + this.typesPermittedInSearch[i] + ")";
          }
          search += ")";
        }
      }
      if (this.$store.getters['editor/progressionMode'] === true) {
        // If searching for precedes or precededBy in a progression, restrict results to the progression model
        if (this.addingProperty.includes('precede') !== -1) {
          search += " AND (ceasn\\:inProgressionModel:\"" + this.selectedCompetency["ceasn:inProgressionModel"] + "\")";
        }
      }
      if (this.showMine && this.$store.getters['editor/conceptMode'] !== true && this.$store.getters['editor/progressionMode'] !== true || this.queryParams && (this.$store.getters['editor/conceptMode'] === true || this.$store.getters['editor/progressionMode'] === true) && this.queryParams.conceptShow === "mine") {
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
      return search;
    },
    currentUser: function currentUser() {
      if (EcIdentityManager.default.ids.length > 0) {
        return EcIdentityManager.default.ids;
      } else {
        return undefined;
      }
    },
    initialOwnedByMe: function initialOwnedByMe() {
      return this.$store.getters["featuresEnabled/ownedByMe"];
    },
    paramObj: function paramObj() {
      var obj = {};
      obj.size = 20;
      var searchTerm = this.$store.getters['app/searchTerm'];
      if (!searchTerm || searchTerm.length === 0) {
        var order = this.sortBy === "name.keyword" || this.sortBy === "skos:prefLabel.keyword" ? "asc" : "desc";
        var type = this.sortBy === "name.keyword" || this.sortBy === "skos:prefLabel.keyword" ? "text" : "date";
        obj.sort = '[ { "' + this.sortBy + '": {"order" : "' + order + '" , "unmapped_type" : "' + type + '",  "missing" : "_last"}} ]';
      } else {
        delete obj.sort;
      }
      if (this.showMine && this.$store.getters['editor/conceptMode'] !== true && this.$store.getters['editor/progressionMode'] !== true || (this.$store.getters['editor/conceptMode'] === true || this.$store.getters['editor/progressionMode'] === true) && this.queryParams.conceptShow === "mine") {
        obj.ownership = 'me';
      }
      return obj;
    },
    searchType: function searchType() {
      return this.$store.state.lode.searchType;
    },
    sortResults: function sortResults() {
      return this.$store.getters['app/sortResults'];
    },
    showMine: function showMine() {
      return this.$store.getters['app/filterByOwnedByMe'];
    },
    searchFrameworksInCompetencySearch: function searchFrameworksInCompetencySearch() {
      return this.$store.getters['app/searchFrameworksInCompetencySearch'];
    },
    searchTypeToPassToList: function searchTypeToPassToList() {
      if (this.searchType === "Competency" && this.searchFrameworksInCompetencySearch) {
        return "Framework";
      } else if (this.searchType === "DirectLink") {
        return "Competency";
      } else {
        return this.searchType;
      }
    }
  }),
  mounted: function () {
    var _mounted = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee() {
      var i, comp;
      return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            this.displayFirst.splice(0, this.displayFirst.length);
            this.$store.commit('app/searchTerm', "");
            if (!(!this.copyOrLink && this.searchType === "Competency" && this.framework.competency)) {
              _context.next = 14;
              break;
            }
            i = 0;
          case 4:
            if (!(i < this.framework.competency.length)) {
              _context.next = 14;
              break;
            }
            if (!(this.framework.competency[i] !== this.selectedCompetency.shortId())) {
              _context.next = 11;
              break;
            }
            if (!(!this.idsNotPermittedInSearch || this.idsNotPermittedInSearch.length === 0 || !EcArray.has(this.idsNotPermittedInSearch, this.framework.competency[i]))) {
              _context.next = 11;
              break;
            }
            _context.next = 9;
            return EcRepository.get(this.framework.competency[i]);
          case 9:
            comp = _context.sent;
            if (comp) {
              this.displayFirst.push(comp);
            }
          case 11:
            i++;
            _context.next = 4;
            break;
          case 14:
            if (!(this.searchType === "Level" && this.framework.level)) {
              _context.next = 24;
              break;
            }
            i = 0;
          case 16:
            if (!(i < this.framework.level.length)) {
              _context.next = 24;
              break;
            }
            _context.next = 19;
            return EcRepository.get(this.framework.level[i]);
          case 19:
            comp = _context.sent;
            if (comp) {
              this.displayFirst.push(comp);
            }
          case 21:
            i++;
            _context.next = 16;
            break;
          case 24:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }));
    function mounted() {
      return _mounted.apply(this, arguments);
    }
    return mounted;
  }(),
  methods: {
    resetModal: function resetModal() {
      this.$store.commit('app/closeModal');
      this.selectedIds = [];
    },
    selectedArrayEvent: function () {
      var _selectedArrayEvent = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee2(ary) {
        var i, relation;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              this.selectedIds = ary;
              if (!this.copyOrLink || this.searchType === "Level") {
                this.$store.commit('editor/selectedCompetenciesAsProperties', this.selectedIds);
              }
              if (!(this.queryParams.selectRelations === "true" && this.framework.relation)) {
                _context2.next = 12;
                break;
              }
              i = 0;
            case 4:
              if (!(i < this.framework.relation.length)) {
                _context2.next = 12;
                break;
              }
              _context2.next = 7;
              return EcAlignment.get(this.framework.relation[i]);
            case 7:
              relation = _context2.sent;
              if (EcArray.has(selectedArray, relation.target)) {
                if (this.queryParams.selectVerbose === "true") {
                  ary.push(JSON.parse(rld.toJson()));
                } else {
                  ary.push(relation.shortId());
                }
              }
            case 9:
              i++;
              _context2.next = 4;
              break;
            case 12:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function selectedArrayEvent(_x) {
        return _selectedArrayEvent.apply(this, arguments);
      }
      return selectedArrayEvent;
    }(),
    select: function select(competency) {
      if (competency.type === "Framework") {
        return this.selectFramework(competency);
      }
      if (!EcArray.has(this.selectedIds, competency.shortId())) {
        this.selectedIds.push(competency.shortId());
      } else {
        EcArray.setRemove(this.selectedIds, competency.shortId());
      }
      if (!this.copyOrLink || this.searchType === "Level" || this.searchType === "DirectLink") {
        this.$store.commit('editor/selectedCompetenciesAsProperties', this.selectedIds);
      }
    },
    selectFramework: function selectFramework(framework) {
      this.selectedFramework = framework;
      this.$emit('selectFramework', framework);
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
    }
  },
  watch: {
    sortResults: function sortResults() {
      if (this.sortResults.id === "lastEdited") {
        this.sortBy = "schema:dateModified";
        this.displayFirst.splice(0, this.displayFirst.length);
      } else {
        this.sortBy = this.$store.getters['editor/conceptMode'] === true || this.$store.getters['editor/progressionMode'] === true || this.searchType === "Concept" ? "skos:prefLabel.keyword" : "name.keyword";
        this.displayFirst.splice(0, this.displayFirst.length);
      }
    },
    showMine: function showMine() {
      if (this.showMine) {
        this.displayFirst.splice(0, this.displayFirst.length);
      }
    },
    selectedIds: function selectedIds(newVal) {
      if (this.parent === 'search-modal') {
        this.$emit('setSelectedIds', newVal);
      }
    },
    clearFramework: function clearFramework() {
      if (this.clearFramework) {
        this.selectFramework(null);
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/framework/Search.vue?vue&type=script&lang=js
 /* harmony default export */ var framework_Searchvue_type_script_lang_js = (Searchvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/framework/Search.vue?vue&type=style&index=0&id=6d7f2a0c&prod&lang=scss
var Searchvue_type_style_index_0_id_6d7f2a0c_prod_lang_scss = __webpack_require__("6c1a3");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/framework/Search.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  framework_Searchvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Search = __webpack_exports__["a"] = (component.exports);

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

/***/ "62af":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "6c1a3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Search_vue_vue_type_style_index_0_id_6d7f2a0c_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("90e9");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Search_vue_vue_type_style_index_0_id_6d7f2a0c_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Search_vue_vue_type_style_index_0_id_6d7f2a0c_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
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

/***/ "90e9":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

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

/***/ "a559":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchModal_vue_vue_type_style_index_0_id_03a42ddd_prod_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("064b");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchModal_vue_vue_type_style_index_0_id_03a42ddd_prod_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchModal_vue_vue_type_style_index_0_id_03a42ddd_prod_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "af07":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"8dba96d0-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/ModalTemplate.vue?vue&type=template&id=1c4e04a7
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

/***/ "fbde":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"8dba96d0-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/SearchModal.vue?vue&type=template&id=03a42ddd&scoped=true
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('modal-template', {
    attrs: {
      "content": "search",
      "active": true
    },
    on: {
      "close": _vm.closeModal
    }
  }, [_c('template', {
    slot: "modal-header"
  }, [_c('p', {
    staticClass: "modal-card-title"
  }, [_c('span', {
    staticClass: "title has-text-white"
  }, [_vm._v("Search for " + _vm._s(_vm.searchType))]), _c('br'), _vm.copyOrLink ? _c('span', {
    staticClass: "subtitle has-text-white"
  }, [_c('b', [_vm._v("Editing framework:")]), _vm._v(" " + _vm._s(_vm.frameworkName) + " ")]) : _vm._e()])]), _c('template', {
    slot: "modal-body"
  }, [_vm.selectedIds && _vm.selectedIds.length || _vm.selectedFramework ? _c('button', {
    staticClass: "button is-dark is-outlined is-small is-pulled-right",
    on: {
      "click": _vm.clickClearFramework
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-times"
  })]), _c('span', [_vm._v(" Clear selection ")])]) : _vm._e(), _c('search', {
    ref: "search",
    attrs: {
      "parent": "search-modal",
      "allowShowFrameworks": true,
      "clearFramework": _vm.clearFramework,
      "idsNotPermittedInSearch": _vm.idsNotPermittedInSearch
    },
    on: {
      "setSelectedIds": function setSelectedIds($event) {
        _vm.selectedIds = $event;
      },
      "selectFramework": _vm.selectFramework
    }
  })], 1), _c('template', {
    slot: "modal-foot"
  }, [_c('div', {
    staticClass: "buttons"
  }, [_c('button', {
    staticClass: "button is-outlined is-dark",
    on: {
      "click": _vm.closeModal
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-times"
  })]), _c('span', [_vm._v("cancel")])]), _vm.copyOrLink ? _c('button', {
    staticClass: "button is-outlined is-primary",
    attrs: {
      "disabled": !_vm.selectedIds || _vm.selectedIds.length === 0
    },
    on: {
      "click": _vm.copyCompetencies
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-copy"
  })]), _c('span', [_vm._v(" Copy " + _vm._s(_vm.searchType) + " ")])]) : _vm._e(), _vm.copyOrLink && _vm.linkEnabled ? _c('button', {
    staticClass: "button is-outlined is-primary",
    attrs: {
      "disabled": !_vm.selectedIds || _vm.selectedIds.length === 0
    },
    on: {
      "click": _vm.appendCompetencies
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-link"
  })]), _c('span', [_vm._v(" Link " + _vm._s(_vm.searchType) + " ")])]) : _vm._e()])])], 2);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/modalContent/SearchModal.vue?vue&type=template&id=03a42ddd&scoped=true

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
var regeneratorRuntime = __webpack_require__("c7eb");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__("a434");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("fb6a");

// EXTERNAL MODULE: ./src/components/modalContent/ModalTemplate.vue + 4 modules
var ModalTemplate = __webpack_require__("af07");

// EXTERNAL MODULE: ./src/components/framework/Search.vue + 4 modules
var Search = __webpack_require__("3dcd");

// EXTERNAL MODULE: ./src/mixins/common.js
var common = __webpack_require__("872c");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/SearchModal.vue?vue&type=script&lang=js











/* harmony default export */ var SearchModalvue_type_script_lang_js = ({
  name: 'SearchModal',
  data: function data() {
    return {
      selectedIds: [],
      clearFramework: false,
      selectedFramework: null,
      repo: window.repo,
      itemsSaving: 0
    };
  },
  components: {
    ModalTemplate: ModalTemplate["a" /* default */],
    Search: Search["a" /* default */]
  },
  mixins: [common["a" /* default */]],
  computed: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["c" /* mapState */])({
    selectedCompetency: function selectedCompetency(state) {
      return state.editor.selectedCompetency;
    },
    framework: function framework(state) {
      return state.editor.framework;
    },
    queryParams: function queryParams(state) {
      return state.editor.queryParams;
    },
    includeRelations: function includeRelations(state) {
      return state.lode.includeRelations;
    }
  })), {}, {
    copyOrLink: function copyOrLink() {
      return this.$store.state.lode.copyOrLink;
    },
    searchType: function searchType() {
      return this.$store.state.lode.searchType;
    },
    frameworkName: function frameworkName() {
      if (this.framework && this.framework.context) {
        return this.framework.getName();
      } else {
        return '';
      }
    },
    searchFrameworksInCompetencySearch: function searchFrameworksInCompetencySearch() {
      return this.$store.getters['app/searchFrameworksInCompetencySearch'];
    },
    idsNotPermittedInSearch: function idsNotPermittedInSearch() {
      if (this.copyOrLink) {
        var ary = [this.framework.shortId()];
        if (this.framework.competency && this.framework.competency.length > 0) {
          ary = ary.concat(this.framework.competency);
        }
        return ary;
      }
      return null;
    },
    linkEnabled: function linkEnabled() {
      // For CE frameworks, don't permit linking
      if (this.framework.subType !== 'Collection' && this.queryParams.ceasnDataFields === "true") {
        return false;
      }
      return true;
    }
  }),
  methods: {
    closeModal: function closeModal() {
      this.$store.commit('app/closeModal');
    },
    clickClearFramework: function clickClearFramework() {
      var _this = this;
      this.selectedIds.splice(0, this.selectedIds.length);
      this.clearFramework = true;
      this.$nextTick(function () {
        _this.clearFramework = false;
      });
    },
    selectFramework: function selectFramework(val) {
      this.selectedFramework = val;
    },
    addRelations: function () {
      var _addRelations = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee() {
        var i, relation;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!(this.searchFrameworksInCompetencySearch && this.selectedFramework.relation)) {
                _context.next = 10;
                break;
              }
              i = 0;
            case 2:
              if (!(i < this.selectedFramework.relation.length)) {
                _context.next = 10;
                break;
              }
              _context.next = 5;
              return EcAlignment.get(this.selectedFramework.relation[i]);
            case 5:
              relation = _context.sent;
              if (EcArray.has(this.selectedIds, relation.target) && EcArray.has(this.selectedIds, relation.source)) {
                this.selectedIds.push(relation.shortId());
              }
            case 7:
              i++;
              _context.next = 2;
              break;
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function addRelations() {
        return _addRelations.apply(this, arguments);
      }
      return addRelations;
    }(),
    copyCompetencies: function () {
      var _copyCompetencies = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee2() {
        var results, copyDict, framework, initialCompetencies, initialRelations, initialLevels, addedNew, me, i, thing, unencrypted, c, j, owner, reader, level, parent, child, r, selectedCompetency;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              results = this.selectedIds;
              if (!this.includeRelations) {
                _context2.next = 4;
                break;
              }
              _context2.next = 4;
              return this.addRelations();
            case 4:
              copyDict = {};
              framework = this.$store.state.editor.framework;
              initialCompetencies = this.framework.competency ? this.framework.competency.slice() : null;
              initialRelations = this.framework.relation ? this.framework.relation.slice() : null;
              initialLevels = this.framework.level ? this.framework.level.slice() : null;
              addedNew = [];
              me = this;
              i = 0;
            case 12:
              if (!(i < results.length)) {
                _context2.next = 64;
                break;
              }
              _context2.next = 15;
              return EcRepository.get(results[i]);
            case 15:
              thing = _context2.sent;
              if (!(thing != null && thing.isAny(new EcEncryptedValue().getTypes()))) {
                _context2.next = 24;
                break;
              }
              unencrypted = new window["Ec" + thing.encryptedType]();
              _context2.t0 = unencrypted;
              _context2.next = 21;
              return EcEncryptedValue.fromEncryptedValue(thing);
            case 21:
              _context2.t1 = _context2.sent;
              _context2.t0.copyFrom.call(_context2.t0, _context2.t1);
              thing = unencrypted;
            case 24:
              if (!(thing != null && thing.isAny(new EcCompetency().getTypes()))) {
                _context2.next = 45;
                break;
              }
              c = new EcCompetency();
              c.copyFrom(thing);
              if (this.queryParams.newObjectEndpoint != null) {
                c.generateShortId(this.queryParams.newObjectEndpoint);
              } else {
                c.generateId(this.repo.selectedServer);
              }
              addedNew.push(c.shortId());
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
              copyDict[thing.shortId()] = c;
              if (!(this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[c.id] !== true)) {
                _context2.next = 41;
                break;
              }
              _context2.next = 40;
              return EcEncryptedValue.toEncryptedValue(c);
            case 40:
              c = _context2.sent;
            case 41:
              this.itemsSaving++;
              (function (c) {
                Task.asyncImmediate(function (callback) {
                  me.repo.saveTo(c, function () {
                    framework.addCompetency(c.shortId());
                    me.$store.commit('editor/framework', framework);
                    me.afterCopy(initialCompetencies, initialRelations, initialLevels, addedNew);
                    callback();
                  }, function (error) {
                    appError(error);
                    me.afterCopy(initialCompetencies, initialRelations, initialLevels, addedNew);
                    callback();
                  });
                });
              })(c);
              _context2.next = 61;
              break;
            case 45:
              if (!(thing != null && thing.isAny(new EcLevel().getTypes()))) {
                _context2.next = 61;
                break;
              }
              level = new EcLevel();
              level.copyFrom(thing);
              if (this.queryParams.newObjectEndpoint != null) {
                level.generateShortId(this.queryParams.newObjectEndpoint);
              } else {
                level.generateId(this.repo.selectedServer);
              }
              addedNew.push(level.shortId());
              level["schema:dateCreated"] = new Date().toISOString();
              level.competency = this.$store.state.editor.selectedCompetency.shortId();
              delete level.owner;
              level['ceasn:derivedFrom'] = thing.id;
              copyDict[thing.shortId()] = level;
              if (!(this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[level.id] !== true)) {
                _context2.next = 59;
                break;
              }
              _context2.next = 58;
              return EcEncryptedValue.toEncryptedValue(level);
            case 58:
              level = _context2.sent;
            case 59:
              this.itemsSaving++;
              (function (level) {
                Task.asyncImmediate(function (callback) {
                  me.repo.saveTo(level, function () {
                    framework.addLevel(level.shortId());
                    me.$store.commit('editor/framework', framework);
                    me.afterCopy(initialCompetencies, initialRelations, initialLevels, addedNew);
                    callback();
                  }, function (error) {
                    appError(error);
                    me.afterCopy(initialCompetencies, initialRelations, initialLevels, addedNew);
                    callback();
                  });
                });
              })(level);
            case 61:
              i++;
              _context2.next = 12;
              break;
            case 64:
              i = 0;
            case 65:
              if (!(i < results.length)) {
                _context2.next = 95;
                break;
              }
              _context2.next = 68;
              return EcRepository.get(results[i]);
            case 68:
              thing = _context2.sent;
              if (!(thing != null && thing.isAny(new EcAlignment().getTypes()))) {
                _context2.next = 92;
                break;
              }
              parent = copyDict[thing.target];
              child = copyDict[thing.source];
              if (!(typeof parent !== 'undefined' && typeof child !== 'undefined')) {
                _context2.next = 92;
                break;
              }
              r = new EcAlignment();
              r.copyFrom(thing);
              if (this.queryParams.newObjectEndpoint != null) {
                r.generateShortId(this.queryParams.newObjectEndpoint);
              } else {
                r.generateId(this.repo.selectedServer);
              }
              addedNew.push(r.shortId());
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
                _context2.next = 92;
                break;
              }
              framework["schema:dateModified"] = new Date().toISOString();
              if (!(this.$store.state.editor.private === true)) {
                _context2.next = 90;
                break;
              }
              _context2.next = 89;
              return EcEncryptedValue.toEncryptedValue(r);
            case 89:
              r = _context2.sent;
            case 90:
              this.itemsSaving++;
              (function (r) {
                Task.asyncImmediate(function (callback) {
                  me.repo.saveTo(r, function () {
                    framework.addRelation(r.id);
                    me.$store.commit('editor/framework', framework);
                    me.afterCopy(initialCompetencies, initialRelations, initialLevels, addedNew);
                    callback();
                  }, function (error) {
                    appError(error);
                    me.afterCopy(initialCompetencies, initialRelations, initialLevels, addedNew);
                    callback();
                  });
                });
              })(r);
            case 92:
              i++;
              _context2.next = 65;
              break;
            case 95:
              selectedCompetency = this.$store.state.editor.selectedCompetency;
              i = 0;
            case 97:
              if (!(i < results.length)) {
                _context2.next = 126;
                break;
              }
              _context2.next = 100;
              return EcRepository.get(results[i]);
            case 100:
              thing = _context2.sent;
              if (!(thing != null && thing.isAny(new EcCompetency().getTypes()))) {
                _context2.next = 123;
                break;
              }
              if (!(selectedCompetency != null)) {
                _context2.next = 123;
                break;
              }
              r = new EcAlignment();
              if (this.queryParams.newObjectEndpoint != null) {
                r.generateShortId(this.queryParams.newObjectEndpoint);
              } else {
                r.generateId(this.repo.selectedServer);
              }
              addedNew.push(r.shortId());
              r["schema:dateCreated"] = new Date().toISOString();
              child = copyDict[thing.shortId()];
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
                _context2.next = 123;
                break;
              }
              this.itemsSaving++;
              framework.addRelation(r.id);
              framework["schema:dateModified"] = new Date().toISOString();
              if (!(this.$store.state.editor.private === true)) {
                _context2.next = 122;
                break;
              }
              _context2.next = 121;
              return EcEncryptedValue.toEncryptedValue(r);
            case 121:
              r = _context2.sent;
            case 122:
              (function (r) {
                Task.asyncImmediate(function (callback) {
                  me.repo.saveTo(r, function () {
                    me.afterCopy(initialCompetencies, initialRelations, initialLevels, addedNew);
                    callback();
                  }, function (error) {
                    appError(error);
                    me.afterCopy(initialCompetencies, initialRelations, initialLevels, addedNew);
                    callback();
                  });
                });
              })(r);
            case 123:
              i++;
              _context2.next = 97;
              break;
            case 126:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function copyCompetencies() {
        return _copyCompetencies.apply(this, arguments);
      }
      return copyCompetencies;
    }(),
    afterCopy: function () {
      var _afterCopy = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee3(initialCompetencies, initialRelations, initialLevels, addedNew) {
        var framework, changes, i;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              this.itemsSaving--;
              // loading(this.itemsSaving + " objects left to copy.");
              if (!(this.itemsSaving === 0)) {
                _context3.next = 13;
                break;
              }
              framework = this.$store.state.editor.framework;
              changes = [];
              for (i = 0; i < addedNew.length; i++) {
                changes.push({
                  operation: "addNew",
                  id: addedNew[i]
                });
              }
              changes.push({
                operation: "update",
                id: framework.shortId(),
                fieldChanged: ["competency", "relation", "level"],
                initialValue: [initialCompetencies, initialRelations, initialLevels],
                changedValue: [framework.competency, framework.relation, framework.level]
              });
              this.$store.commit('editor/addEditsToUndo', changes);
              if (!(this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true)) {
                _context3.next = 11;
                break;
              }
              _context3.next = 10;
              return EcEncryptedValue.toEncryptedValue(framework);
            case 10:
              framework = _context3.sent;
            case 11:
              this.repo.saveTo(framework, function () {}, appError);
              this.closeModal();
            case 13:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function afterCopy(_x, _x2, _x3, _x4) {
        return _afterCopy.apply(this, arguments);
      }
      return afterCopy;
    }(),
    appendCompetencies: function () {
      var _appendCompetencies = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee5() {
        var results, selectedCompetency, framework, initialCompetencies, initialRelations, initialLevels, initialLevelCompetency, afterLevelCompetency, addedNew, me, i, thing, unencrypted, thingId, r, j, owner, reader, changes;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              results = this.selectedIds;
              if (!this.includeRelations) {
                _context5.next = 4;
                break;
              }
              _context5.next = 4;
              return this.addRelations();
            case 4:
              selectedCompetency = this.$store.state.editor.selectedCompetency;
              framework = this.$store.state.editor.framework;
              initialCompetencies = this.framework.competency ? this.framework.competency.slice() : null;
              initialRelations = this.framework.relation ? this.framework.relation.slice() : null;
              initialLevels = this.framework.level ? this.framework.level.slice() : null;
              initialLevelCompetency = [];
              afterLevelCompetency = [];
              addedNew = [];
              me = this;
              i = 0;
            case 14:
              if (!(i < results.length)) {
                _context5.next = 30;
                break;
              }
              _context5.next = 17;
              return EcRepository.get(results[i]);
            case 17:
              thing = _context5.sent;
              if (!(thing != null && thing.isAny(new EcEncryptedValue().getTypes()))) {
                _context5.next = 26;
                break;
              }
              unencrypted = new window["Ec" + thing.encryptedType]();
              _context5.t0 = unencrypted;
              _context5.next = 23;
              return EcEncryptedValue.fromEncryptedValue(thing);
            case 23:
              _context5.t1 = _context5.sent;
              _context5.t0.copyFrom.call(_context5.t0, _context5.t1);
              thing = unencrypted;
            case 26:
              if (thing.isAny(new EcCompetency().getTypes())) {
                framework.addCompetency(thing.shortId());
              } else if (thing.isAny(new EcLevel().getTypes())) {
                framework.addLevel(thing.shortId());
                if (!EcArray.isArray(thing.competency)) {
                  thing.competency = [thing.competency];
                }
                thingId = thing.shortId();
                initialLevelCompetency.push({
                  id: thingId,
                  competency: thing.competency.splice()
                });
                thing.competency.push(selectedCompetency.shortId());
                afterLevelCompetency.push({
                  id: thingId,
                  competency: thing.competency
                });
                this.repo.saveTo(thing, function () {}, appError);
              }
            case 27:
              i++;
              _context5.next = 14;
              break;
            case 30:
              i = 0;
            case 31:
              if (!(i < results.length)) {
                _context5.next = 39;
                break;
              }
              _context5.next = 34;
              return EcRepository.get(results[i]);
            case 34:
              thing = _context5.sent;
              if (thing.isAny(new EcAlignment().getTypes())) {
                if (EcArray.has(framework.competency, thing.source)) {
                  if (EcArray.has(framework.competency, thing.target)) {
                    framework.addRelation(thing.shortId());
                  }
                }
              }
            case 36:
              i++;
              _context5.next = 31;
              break;
            case 39:
              i = 0;
            case 40:
              if (!(i < results.length)) {
                _context5.next = 66;
                break;
              }
              _context5.next = 43;
              return EcRepository.get(results[i]);
            case 43:
              thing = _context5.sent;
              if (!thing.isAny(new EcCompetency().getTypes())) {
                _context5.next = 63;
                break;
              }
              if (!(selectedCompetency != null)) {
                _context5.next = 63;
                break;
              }
              r = new EcAlignment();
              if (this.queryParams.newObjectEndpoint != null) {
                r.generateShortId(this.queryParams.newObjectEndpoint);
              } else {
                r.generateId(this.repo.selectedServer);
              }
              addedNew.push(r.shortId());
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
                _context5.next = 63;
                break;
              }
              framework.addRelation(r.id);
              if (!(this.$store.state.editor.private === true)) {
                _context5.next = 62;
                break;
              }
              _context5.next = 61;
              return EcEncryptedValue.toEncryptedValue(r);
            case 61:
              r = _context5.sent;
            case 62:
              this.repo.saveTo(r, function () {}, appError);
            case 63:
              i++;
              _context5.next = 40;
              break;
            case 66:
              changes = [];
              for (i = 0; i < addedNew.length; i++) {
                changes.push({
                  operation: "addNew",
                  id: addedNew[i]
                });
              }
              if (initialLevelCompetency.length > 0) {
                for (i = 0; i < initialLevelCompetency.length; i++) {
                  changes.push({
                    operation: "update",
                    id: initialLevelCompetency[i].id,
                    fieldChanged: ["competency"],
                    initialValue: [initialLevelCompetency[i].competency],
                    changedValue: [afterLevelCompetency[i].competency]
                  });
                }
              }
              changes.push({
                operation: "update",
                id: framework.shortId(),
                fieldChanged: ["competency", "relation", "level"],
                initialValue: [initialCompetencies, initialRelations, initialLevels],
                changedValue: [framework.competency, framework.relation, framework.level]
              });
              this.$store.commit('editor/addEditsToUndo', changes);
              if (!(this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true)) {
                _context5.next = 75;
                break;
              }
              _context5.next = 74;
              return EcEncryptedValue.toEncryptedValue(framework);
            case 74:
              framework = _context5.sent;
            case 75:
              this.repo.saveTo(framework, /*#__PURE__*/Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee4() {
                return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee4$(_context4) {
                  while (1) switch (_context4.prev = _context4.next) {
                    case 0:
                      _context4.t0 = me.$store;
                      _context4.next = 3;
                      return EcFramework.get(framework.id);
                    case 3:
                      _context4.t1 = _context4.sent;
                      _context4.t0.commit.call(_context4.t0, 'editor/framework', _context4.t1);
                      me.closeModal();
                    case 6:
                    case "end":
                      return _context4.stop();
                  }
                }, _callee4);
              })), appError);
            case 76:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function appendCompetencies() {
        return _appendCompetencies.apply(this, arguments);
      }
      return appendCompetencies;
    }()
  }
});
// CONCATENATED MODULE: ./src/components/modalContent/SearchModal.vue?vue&type=script&lang=js
 /* harmony default export */ var modalContent_SearchModalvue_type_script_lang_js = (SearchModalvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/modalContent/SearchModal.vue?vue&type=style&index=0&id=03a42ddd&prod&scoped=true&lang=scss
var SearchModalvue_type_style_index_0_id_03a42ddd_prod_scoped_true_lang_scss = __webpack_require__("a559");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/modalContent/SearchModal.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  modalContent_SearchModalvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  "03a42ddd",
  null
  
)

/* harmony default export */ var SearchModal = __webpack_exports__["default"] = (component.exports);

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
//# sourceMappingURL=chunk-19b164da.bf42269e.js.map