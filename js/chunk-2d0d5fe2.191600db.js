(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-2d0d5fe2"],{

/***/ "713e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"18a0cdb9-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/lode/components/List.vue?vue&type=template&id=31db8bf5
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "cass--list--container",
    class: _vm.parent
  }, [_vm.firstSearchProcessing ? _c('div', {
    staticClass: "section has-text-centered"
  }, [_vm._m(0)]) : _vm._e(), [_c('div', {
    staticClass: "container is-desktop"
  }, [_c('ul', {
    staticClass: "cass--list"
  }, [!_vm.firstSearchProcessing && (!_vm.results || _vm.results.length === 0) ? _c('li', {
    staticClass: "cass--list--item no-results"
  }, [_vm._v("No results found")]) : _vm._e(), _vm._l(_vm.results, function (item) {
    return _c('li', {
      key: item.id,
      staticClass: "cass--list--item",
      class: [{
        'source-framework': _vm.crosswalkAlignmentSource && item.id === _vm.crosswalkAlignmentSource.id
      }, _vm.rightAsideObjectId && _vm.rightAsideObjectId === item.shortId() ? 'cass--list--item--selected' : ''],
      on: {
        "click": function click($event) {
          return _vm.click(item);
        }
      }
    }, [_c('div', {
      staticClass: "cass--list-item--icon"
    }, [_c('div', {
      staticClass: "cass--list-item--icon-wrap has-background-dark"
    }, [_c('span', {
      staticClass: "icon"
    }, [item.type === 'Directory' ? _c('i', {
      staticClass: "fa fa-folder",
      attrs: {
        "title": "Directory"
      }
    }) : item.type === 'Framework' ? _c('i', {
      staticClass: "fa fa-file-alt",
      attrs: {
        "title": "Framework"
      }
    }) : item.type === 'Competency' ? _c('i', {
      staticClass: "fa fa-list-alt",
      attrs: {
        "title": "Competency"
      }
    }) : item.type === 'ConceptScheme' ? _c('i', {
      staticClass: "fa fa-book",
      attrs: {
        "title": "Concept Scheme"
      }
    }) : _vm._e()])])]), _c('div', {
      staticClass: "cass--list-item--content"
    }, [_vm.selectingCompetency || item.parentDirectory ? _c('Breadcrumbs', {
      attrs: {
        "competency": item
      }
    }) : _vm._e(), _c('Thing', {
      staticClass: "cass--list--thing",
      attrs: {
        "parent": _vm.parent,
        "obj": item,
        "view": _vm.view,
        "profile": _vm.profile,
        "parentNotEditable": _vm.disallowEdits
      },
      nativeOn: {
        "dblclick": function dblclick($event) {
          return _vm.$emit('dblclick', item);
        }
      },
      scopedSlots: _vm._u([{
        key: "frameworkTags",
        fn: function fn() {
          return [_vm._t("frameworkTags", null, {
            "item": item
          })];
        },
        proxy: true
      }], null, true)
    })], 1), _c('div', {
      staticClass: "cass--list-item--hover"
    }, [_vm.selectingCompetency && _vm.isClicked(item.shortId()) && _vm.view === 'search' ? _c('span', {
      staticClass: "search-selection__icon"
    }, [_vm._m(1, true)]) : _vm.view === 'search' && _vm.view !== 'crosswalk' ? _c('span', {
      staticClass: "search-selection__add-icon"
    }, [_vm._m(2, true)]) : _vm._e(), _vm.view !== 'search' ? _c('div', {
      staticClass: "icon has-text-primary arrow-icon"
    }, [_c('i', {
      staticClass: "fa fa-arrow-right"
    })]) : _vm._e()])]);
  }), _vm._l(_vm.subResults, function (item) {
    return _c('li', {
      key: item.id,
      staticClass: "cass--list--item",
      class: _vm.rightAsideObjectId && _vm.rightAsideObjectId === item.shortId() ? 'cass-list-item--selected' : '',
      on: {
        "click": function click($event) {
          return _vm.subObjectClick(item);
        }
      }
    }, [_c('div', {
      staticClass: "cass--list-item--icon"
    }, [_c('div', {
      staticClass: "cass--list-item--icon-wrap has-background-dark"
    }, [_c('span', {
      staticClass: "icon"
    }, [item.type === 'Directory' ? _c('i', {
      staticClass: "fa fa-folder",
      attrs: {
        "title": "Directory"
      }
    }) : item.type === 'Framework' ? _c('i', {
      staticClass: "fa fa-file-alt",
      attrs: {
        "title": "Framework"
      }
    }) : item.type === 'Competency' ? _c('i', {
      staticClass: "fa fa-list-alt",
      attrs: {
        "title": "Competency"
      }
    }) : item.type === 'Concept' ? _c('i', {
      staticClass: "fa fa-book",
      attrs: {
        "title": "Concept Scheme"
      }
    }) : _vm._e()])])]), _c('div', {
      staticClass: "cass--list-item--content"
    }, [_c('Breadcrumbs', {
      ref: item.id,
      refInFor: true,
      attrs: {
        "competency": item
      }
    }), _c('Thing', {
      staticClass: "list-thing",
      attrs: {
        "obj": item,
        "view": _vm.view,
        "profile": _vm.profile,
        "parentNotEditable": _vm.disallowEdits
      },
      nativeOn: {
        "dblclick": function dblclick($event) {
          return _vm.$emit('dblclick', item);
        }
      }
    })], 1), _c('div', {
      staticClass: "cass--list-item--hover"
    }, [_vm.view !== 'search' ? _c('div', {
      staticClass: "icon has-text-primary arrow-icon"
    }, [_c('i', {
      staticClass: "fa fa-arrow-right"
    })]) : _vm._e()])]);
  })], 2), _vm.results.length > 0 ? _c('infinite-loading', {
    attrs: {
      "spinner": "circles",
      "distance": 10
    },
    on: {
      "infinite": _vm.loadMore
    }
  }, [_c('div', {
    attrs: {
      "slot": "no-more"
    },
    slot: "no-more"
  }, [_vm._v(" All results loaded ")]), _c('div', {
    attrs: {
      "slot": "no-results"
    },
    slot: "no-results"
  }, [_vm._v(" All results loaded ")])]) : _vm._e()], 1)]], 2);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon is-large"
  }, [_c('i', {
    staticClass: "fa fa-spinner fa-2x fa-pulse"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "icon is-primary is-small"
  }, [_c('i', {
    staticClass: "fa fa-check has-text-primary",
    attrs: {
      "aria-hidden": "true"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "icon is-primary is-small"
  }, [_c('i', {
    staticClass: "fa fa-plus has-text-primary",
    attrs: {
      "aria-hidden": "true"
    }
  })]);
}];

// CONCATENATED MODULE: ./src/lode/components/List.vue?vue&type=template&id=31db8bf5

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
var createForOfIteratorHelper = __webpack_require__("b85c");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
var regeneratorRuntime = __webpack_require__("c7eb");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.search.js
var es_string_search = __webpack_require__("841c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.sort.js
var es_array_sort = __webpack_require__("4e82");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__("a434");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__("5319");

// EXTERNAL MODULE: ./src/lode/components/Thing.vue + 4 modules
var Thing = __webpack_require__("098b");

// EXTERNAL MODULE: ./src/mixins/common.js
var common = __webpack_require__("872c");

// EXTERNAL MODULE: ./src/lode/components/Breadcrumbs.vue + 4 modules
var Breadcrumbs = __webpack_require__("30d6");

// EXTERNAL MODULE: ./src/mixins/cassUtil.js
var cassUtil = __webpack_require__("6d79");

// EXTERNAL MODULE: ./node_modules/lodash/debounce.js
var debounce = __webpack_require__("b047");
var debounce_default = /*#__PURE__*/__webpack_require__.n(debounce);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/lode/components/List.vue?vue&type=script&lang=js


















/* harmony default export */ var Listvue_type_script_lang_js = ({
  name: 'List',
  props: {
    parent: {
      type: String,
      default: ''
    },
    type: String,
    repo: Object,
    profile: Object,
    click: Function,
    searchOptions: String,
    paramObj: Object,
    disallowEdits: Boolean,
    selectingCompetency: Boolean,
    selected: Array,
    displayFirst: Array,
    view: {
      type: String,
      default: ''
    },
    filterToEditable: {
      type: Boolean,
      default: false
    },
    idsNotPermittedInSearch: {
      type: Array,
      default: null
    }
  },
  components: {
    Thing: Thing["default"],
    Breadcrumbs: Breadcrumbs["a" /* default */]
  },
  mixins: [common["a" /* default */], cassUtil["a" /* cassUtil */]],
  created: function created() {
    var _this = this;
    this.$nextTick(function () {
      return _this.searchRepo();
    });
  },
  data: function data() {
    return {
      results: [],
      start: 0,
      subResults: [],
      subStart: 0,
      searchFrameworks: true,
      searchCompetencies: true,
      searchDirectories: false,
      searchingForCompetencies: false,
      searchingForDirectories: false,
      applySearchToOwner: false,
      // To avoid duplicates
      resultIds: [],
      nonDirectoryResults: false
    };
  },
  watch: {
    results: function results() {
      this.$emit('search-updated');
    },
    text: function text(newValue, oldValue) {},
    paramObj: function paramObj() {
      this.searchRepo();
    },
    searchOptions: function searchOptions() {
      this.searchRepo();
    },
    searchTerm: function searchTerm(val) {
      this.searchRepo();
    },
    applySearchTo: function applySearchTo() {
      this.applySearchToOwner = false;
      // Set which objects to search
      if (this.view === 'crosswalk') {
        this.searchFrameworks = true;
        this.searchCompetencies = false;
        this.searchDirectories = false;
      } else if (this.applySearchTo && this.applySearchTo.length > 0) {
        this.searchFrameworks = false;
        this.searchCompetencies = false;
        this.searchDirectories = false;
        for (var i = 0; i < this.applySearchTo.length; i++) {
          if (this.applySearchTo[i].id === "frameworkName" || this.applySearchTo[i].id === "frameworkDescription") {
            this.searchFrameworks = true;
          } else if (this.applySearchTo[i].id === "competencyName" || this.applySearchTo[i].id === "competencyDescription" || this.applySearchTo[i].id === "competencyLabel") {
            this.searchCompetencies = true;
          } else if (this.applySearchTo[i].id === "ownerName") {
            this.searchFrameworks = true;
            this.searchCompetencies = true;
            this.applySearchToOwner = true;
          } else if (this.applySearchTo[i].id === "directoryName" || this.applySearchTo[i].id === "directoryDescription") {
            this.searchDirectories = true;
          } else {
            // Any other property comes from framework config
            this.searchFrameworks = true;
          }
        }
      } else {
        this.searchFrameworks = true;
        this.searchCompetencies = true;
        if (this.type === "Framework") {
          this.searchDirectories = true;
        } else {
          this.searchDirectories = false;
        }
      }
      this.searchRepo();
    },
    type: function type() {
      this.searchRepo();
    },
    refreshSearch: function refreshSearch() {
      if (this.refreshSearch) {
        this.searchRepo();
        this.$store.commit('app/refreshSearch', false);
      }
    },
    timeOffset: function timeOffset() {
      this.searchRepo();
    },
    numIdentities: function numIdentities() {
      this.searchRepo();
    }
  },
  computed: {
    crosswalkAlignmentSource: function crosswalkAlignmentSource() {
      return this.$store.getters['crosswalk/frameworkSource'];
    },
    searchTerm: function searchTerm(val) {
      return this.$store.getters['app/searchTerm'];
    },
    refreshSearch: function refreshSearch(val) {
      return this.$store.getters['app/refreshSearch'];
    },
    applySearchTo: function applySearchTo() {
      var options = this.$store.getters['app/applySearchTo'];
      if (!options) return null;
      var filterValues = options.filter(function (item) {
        return item.checked === true;
      });
      if (filterValues.length <= 0) return null;
      return filterValues;
    },
    rightAsideObjectId: function rightAsideObjectId() {
      if (this.$store.getters['app/rightAsideObject']) {
        return this.$store.getters['app/rightAsideObject'].shortId();
      }
      return null;
    },
    timeOffset: function timeOffset() {
      return this.repo.timeOffset;
    },
    numIdentities: function numIdentities() {
      var _EcIdentityManager$de;
      return (_EcIdentityManager$de = EcIdentityManager.default.ids) === null || _EcIdentityManager$de === void 0 ? void 0 : _EcIdentityManager$de.length;
    },
    firstSearchProcessing: function firstSearchProcessing() {
      return this.$store.getters['editor/firstSearchProcessing'];
    }
  },
  methods: {
    subObjectClick: function subObjectClick(item) {
      // Access framework from breadcrumbs instead of re-searching
      var frameworks = this.$refs[item.id][0].frameworks;
      if (frameworks.length > 0) {
        this.click(frameworks[0]);
      } else {
        var modalObject = {
          component: 'Single',
          uri: item.id,
          type: item.type,
          objectType: item.type,
          parentName: null,
          canEdit: false
        };
        this.$store.commit('app/showModal', modalObject);
      }
    },
    buildSearch: function buildSearch(type, callback) {
      var _this2 = this;
      var search = "";
      // Used to only add OR to query if there's already a term
      var termAdded = false;
      if (!this.applySearchTo || this.searchTerm === "") {
        search = "((@type:" + type + " OR (EncryptedValue AND \\*encryptedType:" + type + "))" + (this.searchTerm != null && this.searchTerm !== "" ? " AND " + this.searchTerm : "") + ")" + (this.searchOptions == null || this.searchOptions === "" ? "" : this.searchOptions);
      } else {
        search = "((@type:" + type + " OR (EncryptedValue AND \\*encryptedType:" + type + "))" + " AND (";
        var _loop = function _loop() {
          if (type === "Framework" && _this2.applySearchTo[i].id === "frameworkName" || type === "Competency" && _this2.applySearchTo[i].id === "competencyName" || type === "Directory" && _this2.applySearchTo[i].id === "directoryName") {
            if (termAdded) {
              search += " OR ";
            }
            search += "name:" + _this2.searchTerm;
            termAdded = true;
          } else if (type === "Framework" && _this2.applySearchTo[i].id === "frameworkDescription" || type === "Competency" && _this2.applySearchTo[i].id === "competencyDescription" || type === "Directory" && _this2.applySearchTo[i].id === "directoryDescription") {
            if (termAdded) {
              search += " OR ";
            }
            search += "description:" + _this2.searchTerm;
            termAdded = true;
          } else if (_this2.applySearchTo[i].id === "ownerName") {
            var paramObj = {};
            paramObj.size = 10;
            var me = _this2;
            EcPerson.search(window.repo, 'name:' + _this2.searchTerm, function (success) {
              if (termAdded && success.length > 0) {
                search += " OR ";
              }
              appLog(success);
              for (var i = 0; i < success.length; i++) {
                search += "\\*owner:\"" + me.getPersonEcPk(success[i]).toPem() + "\"";
                if (i < success.length - 1) {
                  search += " OR ";
                }
              }
              EcOrganization.search(window.repo, 'name:' + me.searchTerm, /*#__PURE__*/function () {
                var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee(success) {
                  var i;
                  return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        appLog(success);
                        i = 0;
                      case 2:
                        if (!(i < success.length)) {
                          _context.next = 14;
                          break;
                        }
                        _context.t0 = search;
                        _context.next = 6;
                        return me.getOrganizationEcPk(success[i]);
                      case 6:
                        _context.t1 = _context.sent.toPem();
                        _context.t2 = "\\*owner:\"" + _context.t1;
                        search = _context.t0 += _context.t2 + "\"";
                        termAdded = true;
                        if (i < success.length - 1) {
                          search += " OR ";
                        }
                      case 11:
                        i++;
                        _context.next = 2;
                        break;
                      case 14:
                        search += "))" + (me.searchOptions == null ? "" : me.searchOptions);
                        if (search.indexOf("AND ())") !== -1) {
                          search = null;
                        }
                        callback(search);
                      case 17:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                }));
                return function (_x) {
                  return _ref.apply(this, arguments);
                };
              }(), function (failure) {
                appError(failure);
                callback(null);
              }, paramObj);
            }, function (failure) {
              appError(failure);
              callback(null);
            }, paramObj);
          } else if (type === "Framework") {
            if (termAdded) {
              search += " OR ";
            }
            // Other framework property from config
            search += _this2.applySearchTo[i].id + ":" + _this2.searchTerm;
            termAdded = true;
          } else if (type === "Competency" && _this2.applySearchTo[i].id === "competencyLabel") {
            if (termAdded) {
              search += " OR ";
            }
            search += "ceasn\\:competencyLabel:" + _this2.searchTerm;
            termAdded = true;
          }
        };
        for (var i = 0; i < this.applySearchTo.length; i++) {
          _loop();
        }
        if (!this.applySearchToOwner) {
          search += "))" + (this.searchOptions == null ? "" : this.searchOptions);
        }
      }
      if (!this.applySearchToOwner) {
        callback(search);
      }
    },
    searchForDirectories: function searchForDirectories($state) {
      var me = this;
      this.searchingForDirectories = true;
      me.buildSearch("Directory", function (search) {
        var paramObj = null;
        if (me.paramObj) {
          paramObj = Object.assign({}, me.paramObj);
          if (me.searchTerm != null && me.searchTerm !== "") {
            delete paramObj.sort;
          }
        }
        if (!me.firstSearchProcessing) {
          me.start += me.paramObj.size;
        }
        paramObj.start = me.start;
        var directories = [];
        me.repo.searchWithParams(search, paramObj, null, /*#__PURE__*/function () {
          var _ref2 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee2(results) {
            var _iterator, _step, result, type, obj;
            return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  _iterator = Object(createForOfIteratorHelper["a" /* default */])(results);
                  _context2.prev = 1;
                  _iterator.s();
                case 3:
                  if ((_step = _iterator.n()).done) {
                    _context2.next = 22;
                    break;
                  }
                  result = _step.value;
                  if (!(!me.filterToEditable || me.filterToEditable && me.canEditAny(result))) {
                    _context2.next = 20;
                    break;
                  }
                  if (EcArray.has(me.resultIds, result.id)) {
                    _context2.next = 20;
                    break;
                  }
                  me.resultIds.push(result.id);
                  if (!(!me.idsNotPermittedInSearch || me.idsNotPermittedInSearch.length === 0 || !EcArray.has(me.idsNotPermittedInSearch, result.shortId()))) {
                    _context2.next = 20;
                    break;
                  }
                  if (!(!result.parentDirectory || me.searchTerm !== "")) {
                    _context2.next = 20;
                    break;
                  }
                  if (!result.isAny(new EcEncryptedValue().getTypes())) {
                    _context2.next = 19;
                    break;
                  }
                  // Decrypt and add to results list
                  type = "Ec" + result.encryptedType;
                  obj = new window[type]();
                  _context2.t0 = obj;
                  _context2.next = 16;
                  return EcEncryptedValue.fromEncryptedValue(result);
                case 16:
                  _context2.t1 = _context2.sent;
                  _context2.t0.copyFrom.call(_context2.t0, _context2.t1);
                  result = obj;
                case 19:
                  directories.push(result);
                case 20:
                  _context2.next = 3;
                  break;
                case 22:
                  _context2.next = 27;
                  break;
                case 24:
                  _context2.prev = 24;
                  _context2.t2 = _context2["catch"](1);
                  _iterator.e(_context2.t2);
                case 27:
                  _context2.prev = 27;
                  _iterator.f();
                  return _context2.finish(27);
                case 30:
                  me.$store.commit('editor/setFirstSearchProcessing', false);
                  if (directories && directories.length > 0) {
                    me.results = me.results.concat(directories);
                    if ($state) {
                      $state.loaded();
                    }
                  } else if (results.length === 0) {
                    me.searchingForDirectories = false;
                    me.start = 0;
                    me.loadMore($state);
                  } else if (results.length > 0 && $state) {
                    // $state references are for vue-infinite-loading component
                    me.loadMore($state);
                  } else if ($state) {
                    $state.complete();
                  }
                case 32:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, null, [[1, 24, 27, 30]]);
          }));
          return function (_x2) {
            return _ref2.apply(this, arguments);
          };
        }(), function (err) {
          appError(err);
          me.$store.commit('editor/setFirstSearchProcessing', false);
          if ($state) {
            $state.complete();
          }
        });
      });
    },
    searchRepo: debounce_default()(function () {
      var me = this;
      this.start = 0;
      this.subStart = 0;
      me.$store.commit('editor/setFirstSearchProcessing', true);
      this.results.splice(0, this.results.length);
      this.subResults.splice(0, this.subResults.length);
      this.resultIds.splice(0, this.resultIds.length);
      this.searchingForCompetencies = false;
      this.nonDirectoryResults = false;
      if (!this.applySearchTo) {
        if (this.view === 'frameworks' && this.type === "Framework") {
          this.searchDirectories = true;
        } else {
          this.searchDirectories = false;
        }
      }
      if (this.searchTerm === "" && this.displayFirst && this.displayFirst.length > 0) {
        for (var i = 0; i < 20; i++) {
          if (this.displayFirst[0]) {
            this.results.push(this.displayFirst[0]);
            this.resultIds.push(this.displayFirst[0].id);
            this.displayFirst.shift();
            this.nonDirectoryResults = true;
          }
        }
      }
      if (this.searchDirectories === true) {
        this.searchForDirectories();
      } else if (this.searchFrameworks && (this.searchTerm !== "" || !this.displayFirst || this.displayFirst.length === 0)) {
        me.buildSearch(this.type, function (search) {
          var paramObj = null;
          if (me.paramObj) {
            paramObj = Object.assign({}, me.paramObj);
            if (me.searchTerm != null && me.searchTerm !== "") {
              delete paramObj.sort;
            }
          }
          me.repo.searchWithParams(search, paramObj, function (result) {}, /*#__PURE__*/function () {
            var _ref3 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee3(results) {
              var _iterator2, _step2, result, type, obj;
              return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    _iterator2 = Object(createForOfIteratorHelper["a" /* default */])(results);
                    _context3.prev = 1;
                    _iterator2.s();
                  case 3:
                    if ((_step2 = _iterator2.n()).done) {
                      _context3.next = 21;
                      break;
                    }
                    result = _step2.value;
                    if (!(!me.filterToEditable || me.filterToEditable && me.canEditAny(result))) {
                      _context3.next = 19;
                      break;
                    }
                    if (EcArray.has(me.resultIds, result.id)) {
                      _context3.next = 19;
                      break;
                    }
                    me.resultIds.push(result.id);
                    if (!(!me.idsNotPermittedInSearch || me.idsNotPermittedInSearch.length === 0 || !EcArray.has(me.idsNotPermittedInSearch, result.shortId()))) {
                      _context3.next = 19;
                      break;
                    }
                    if (!result.isAny(new EcEncryptedValue().getTypes())) {
                      _context3.next = 18;
                      break;
                    }
                    // Decrypt and add to results list
                    type = "Ec" + result.encryptedType;
                    obj = new window[type]();
                    _context3.t0 = obj;
                    _context3.next = 15;
                    return EcEncryptedValue.fromEncryptedValue(result);
                  case 15:
                    _context3.t1 = _context3.sent;
                    _context3.t0.copyFrom.call(_context3.t0, _context3.t1);
                    result = obj;
                  case 18:
                    if (result.name !== '' || result['dcterms:title'] !== '') {
                      me.results.push(result);
                      me.nonDirectoryResults = true;
                    }
                  case 19:
                    _context3.next = 3;
                    break;
                  case 21:
                    _context3.next = 26;
                    break;
                  case 23:
                    _context3.prev = 23;
                    _context3.t2 = _context3["catch"](1);
                    _iterator2.e(_context3.t2);
                  case 26:
                    _context3.prev = 26;
                    _iterator2.f();
                    return _context3.finish(26);
                  case 29:
                    me.$store.commit('editor/setFirstSearchProcessing', false);
                    if (results.length < 10 && (me.type === "Framework" || me.type === "ConceptScheme")) {
                      if (me.searchCompetencies) {
                        me.searchForSubObjects();
                      }
                    }
                  case 31:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3, null, [[1, 23, 26, 29]]);
            }));
            return function (_x3) {
              return _ref3.apply(this, arguments);
            };
          }(), function (err) {
            appError(err);
            me.$store.commit('editor/setFirstSearchProcessing', false);
          });
        });
      } else {
        me.$store.commit('editor/setFirstSearchProcessing', false);
      }
      if (!this.searchFrameworks && !this.searchDirectories && (this.searchTerm !== "" || !this.displayFirst || this.displayFirst.length === 0)) {
        // Only competency fields were selected
        return this.searchForSubObjects();
      }
    }, 1000),
    loadMore: function loadMore($state) {
      this.$emit('search-updated');
      if (this.searchTerm === "" && this.displayFirst && this.displayFirst.length > 0) {
        for (var i = 0; i < 20; i++) {
          if (this.displayFirst[i]) {
            this.results.push(this.displayFirst[i]);
            this.resultIds.push(this.displayFirst[i].id);
            this.displayFirst.shift();
          }
        }
      }
      if (this.searchingForDirectories) {
        this.searchForDirectories($state);
      } else if (this.paramObj && (this.searchTerm !== "" || !this.displayFirst || this.displayFirst.length === 0)) {
        var me = this;
        var localParamObj = Object.assign({}, this.paramObj);
        if (me.searchTerm != null && me.searchTerm !== "") {
          delete localParamObj.sort;
        }
        if (me.nonDirectoryResults) {
          this.start += this.paramObj.size;
        }
        localParamObj.start = this.start;
        // If we've started loading competencies and reach scroll point, load more
        var type;
        if (this.searchingForCompetencies) {
          if (this.type === "ConceptScheme") {
            type = "Concept";
          } else {
            type = "Competency";
          }
        } else {
          type = this.type;
        }
        this.buildSearch(type, function (search) {
          me.repo.searchWithParams(search, localParamObj, function (result) {}, /*#__PURE__*/function () {
            var _ref4 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee4(results) {
              var _iterator3, _step3, result, objType, obj, _obj;
              return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee4$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    _iterator3 = Object(createForOfIteratorHelper["a" /* default */])(results);
                    _context4.prev = 1;
                    _iterator3.s();
                  case 3:
                    if ((_step3 = _iterator3.n()).done) {
                      _context4.next = 37;
                      break;
                    }
                    result = _step3.value;
                    if (!(!me.filterToEditable || me.filterToEditable && me.canEditAny(result))) {
                      _context4.next = 35;
                      break;
                    }
                    if (!me.searchingForCompetencies) {
                      _context4.next = 22;
                      break;
                    }
                    if (EcArray.has(me.resultIds, result.id)) {
                      _context4.next = 20;
                      break;
                    }
                    me.resultIds.push(result.id);
                    if (!(!me.idsNotPermittedInSearch || me.idsNotPermittedInSearch.length === 0 || !EcArray.has(me.idsNotPermittedInSearch, result.shortId()))) {
                      _context4.next = 20;
                      break;
                    }
                    if (!result.isAny(new EcEncryptedValue().getTypes())) {
                      _context4.next = 19;
                      break;
                    }
                    // Decrypt and add to results list
                    objType = "Ec" + result.encryptedType;
                    obj = new window[objType]();
                    _context4.t0 = obj;
                    _context4.next = 16;
                    return EcEncryptedValue.fromEncryptedValue(result);
                  case 16:
                    _context4.t1 = _context4.sent;
                    _context4.t0.copyFrom.call(_context4.t0, _context4.t1);
                    result = obj;
                  case 19:
                    me.subResults.push(result);
                  case 20:
                    _context4.next = 35;
                    break;
                  case 22:
                    if (EcArray.has(me.resultIds, result.id)) {
                      _context4.next = 35;
                      break;
                    }
                    me.resultIds.push(result.id);
                    if (!(!me.idsNotPermittedInSearch || me.idsNotPermittedInSearch.length === 0 || !EcArray.has(me.idsNotPermittedInSearch, result.shortId()))) {
                      _context4.next = 35;
                      break;
                    }
                    if (!result.isAny(new EcEncryptedValue().getTypes())) {
                      _context4.next = 34;
                      break;
                    }
                    // Decrypt and add to results list
                    objType = "Ec" + result.encryptedType;
                    _obj = new window[objType]();
                    _context4.t2 = _obj;
                    _context4.next = 31;
                    return EcEncryptedValue.fromEncryptedValue(result);
                  case 31:
                    _context4.t3 = _context4.sent;
                    _context4.t2.copyFrom.call(_context4.t2, _context4.t3);
                    result = _obj;
                  case 34:
                    me.results.push(result);
                  case 35:
                    _context4.next = 3;
                    break;
                  case 37:
                    _context4.next = 42;
                    break;
                  case 39:
                    _context4.prev = 39;
                    _context4.t4 = _context4["catch"](1);
                    _iterator3.e(_context4.t4);
                  case 42:
                    _context4.prev = 42;
                    _iterator3.f();
                    return _context4.finish(42);
                  case 45:
                    if (results.length === 0 && (me.type === "Framework" || me.type === "ConceptScheme")) {
                      if (me.searchCompetencies) {
                        me.searchForSubObjects($state);
                      } else if ($state) {
                        $state.complete();
                      }
                    } else if (results.length > 0) {
                      me.nonDirectoryResults = true;
                      // $state references are for vue-infinite-loading component
                      if ($state) {
                        $state.loaded();
                      }
                    } else if ($state) {
                      $state.complete();
                    }
                  case 46:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4, null, [[1, 39, 42, 45]]);
            }));
            return function (_x4) {
              return _ref4.apply(this, arguments);
            };
          }(), function (err) {
            appError(err);
            $state.complete();
          });
        });
      } else {
        $state.loaded();
      }
    },
    searchForSubObjects: function searchForSubObjects($state) {
      var me = this;
      this.searchingForCompetencies = true;
      var subLocalParamObj = Object.assign({}, me.paramObj);
      if (me.searchTerm != null && me.searchTerm !== "") {
        delete subLocalParamObj.sort;
      }
      subLocalParamObj.start = me.subStart;
      if (subLocalParamObj.sort && subLocalParamObj.sort.indexOf("dcterms:title") !== -1) {
        subLocalParamObj.sort = subLocalParamObj.sort.replace('dcterms:title', 'skos:prefLabel');
      }
      var type = me.type === "Framework" ? "Competency" : "Concept";
      me.buildSearch(type, function (subSearch) {
        me.repo.searchWithParams(subSearch, subLocalParamObj, function (subResult) {}, /*#__PURE__*/function () {
          var _ref5 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee5(subResults) {
            var _iterator4, _step4, subResult, objType, obj;
            return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee5$(_context5) {
              while (1) switch (_context5.prev = _context5.next) {
                case 0:
                  _iterator4 = Object(createForOfIteratorHelper["a" /* default */])(subResults);
                  _context5.prev = 1;
                  _iterator4.s();
                case 3:
                  if ((_step4 = _iterator4.n()).done) {
                    _context5.next = 22;
                    break;
                  }
                  subResult = _step4.value;
                  if (!(!me.filterToEditable || me.filterToEditable && me.canEditAny(subResult))) {
                    _context5.next = 20;
                    break;
                  }
                  if (EcArray.has(me.resultIds, subResult.id)) {
                    _context5.next = 20;
                    break;
                  }
                  me.resultIds.push(subResult.id);
                  if (!(!me.idsNotPermittedInSearch || me.idsNotPermittedInSearch.length === 0 || !EcArray.has(me.idsNotPermittedInSearch, subResult.shortId()))) {
                    _context5.next = 20;
                    break;
                  }
                  if (!subResult.isAny(new EcEncryptedValue().getTypes())) {
                    _context5.next = 18;
                    break;
                  }
                  // Decrypt and add to results list
                  objType = "Ec" + subResult.encryptedType;
                  obj = new window[objType]();
                  _context5.t0 = obj;
                  _context5.next = 15;
                  return EcEncryptedValue.fromEncryptedValue(subResult);
                case 15:
                  _context5.t1 = _context5.sent;
                  _context5.t0.copyFrom.call(_context5.t0, _context5.t1);
                  subResult = obj;
                case 18:
                  me.subResults.push(subResult);
                  me.nonDirectoryResults = true;
                case 20:
                  _context5.next = 3;
                  break;
                case 22:
                  _context5.next = 27;
                  break;
                case 24:
                  _context5.prev = 24;
                  _context5.t2 = _context5["catch"](1);
                  _iterator4.e(_context5.t2);
                case 27:
                  _context5.prev = 27;
                  _iterator4.f();
                  return _context5.finish(27);
                case 30:
                  if (subResults.length > 0 && $state) {
                    $state.loaded();
                  } else if ($state) {
                    $state.complete();
                  }
                  me.subStart += me.paramObj.size;
                case 32:
                case "end":
                  return _context5.stop();
              }
            }, _callee5, null, [[1, 24, 27, 30]]);
          }));
          return function (_x5) {
            return _ref5.apply(this, arguments);
          };
        }(), function (err) {
          appError(err);
          if ($state) {
            $state.complete();
          }
        });
      });
    },
    isClicked: function isClicked(id) {
      if (EcArray.has(this.selected, id)) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted: function mounted() {
    if (this.view === 'crosswalk') {
      this.searchFrameworks = true;
      this.searchCompetencies = false;
      this.searchDirectories = false;
    }
  }
});
// CONCATENATED MODULE: ./src/lode/components/List.vue?vue&type=script&lang=js
 /* harmony default export */ var components_Listvue_type_script_lang_js = (Listvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/lode/components/List.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_Listvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var List = __webpack_exports__["a"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=chunk-2d0d5fe2.191600db.js.map