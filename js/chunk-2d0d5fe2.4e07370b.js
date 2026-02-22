(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-2d0d5fe2"],{

/***/ "713e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"0d8cf898-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/lode/components/List.vue?vue&type=template&id=08328868
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

// CONCATENATED MODULE: ./src/lode/components/List.vue?vue&type=template&id=08328868

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
var createForOfIteratorHelper = __webpack_require__("b85c");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regenerator.js + 1 modules
var regenerator = __webpack_require__("c14f");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.sort.js
var es_array_sort = __webpack_require__("4e82");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__("a434");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.iterator.constructor.js
var es_iterator_constructor = __webpack_require__("e9f5");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.iterator.filter.js
var es_iterator_filter = __webpack_require__("910d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__("5319");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.search.js
var es_string_search = __webpack_require__("841c");

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
        search = "((@type:" + type + " OR (EncryptedValue AND \\*encryptedType:" + type + "))" + (this.searchTerm != null && this.searchTerm !== "" ? " AND " + this.searchTerm + '*' : "") + ")" + (this.searchOptions == null || this.searchOptions === "" ? "" : this.searchOptions);
      } else {
        search = "((@type:" + type + " OR (EncryptedValue AND \\*encryptedType:" + type + "))" + " AND (";
        var _loop = function _loop() {
          if (type === "Framework" && _this2.applySearchTo[i].id === "frameworkName" || type === "Competency" && _this2.applySearchTo[i].id === "competencyName" || type === "Directory" && _this2.applySearchTo[i].id === "directoryName") {
            if (termAdded) {
              search += " OR ";
            }
            search += "name:" + _this2.searchTerm + '*';
            termAdded = true;
          } else if (type === "Framework" && _this2.applySearchTo[i].id === "frameworkDescription" || type === "Competency" && _this2.applySearchTo[i].id === "competencyDescription" || type === "Directory" && _this2.applySearchTo[i].id === "directoryDescription") {
            if (termAdded) {
              search += " OR ";
            }
            search += "description:" + _this2.searchTerm + '*';
            termAdded = true;
          } else if (_this2.applySearchTo[i].id === "ownerName") {
            var paramObj = {};
            paramObj.size = 10;
            var me = _this2;
            EcPerson.search(window.repo, 'name:' + _this2.searchTerm + '*', function (success) {
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
              EcOrganization.search(window.repo, 'name:' + me.searchTerm + '*', /*#__PURE__*/function () {
                var _ref = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee(success) {
                  var i, _t, _t2, _t3;
                  return Object(regenerator["a" /* default */])().w(function (_context) {
                    while (1) switch (_context.n) {
                      case 0:
                        appLog(success);
                        i = 0;
                      case 1:
                        if (!(i < success.length)) {
                          _context.n = 4;
                          break;
                        }
                        _t = search;
                        _context.n = 2;
                        return me.getOrganizationEcPk(success[i]);
                      case 2:
                        _t2 = _context.v.toPem();
                        _t3 = "\\*owner:\"" + _t2;
                        search = _t += _t3 + "\"";
                        termAdded = true;
                        if (i < success.length - 1) {
                          search += " OR ";
                        }
                      case 3:
                        i++;
                        _context.n = 1;
                        break;
                      case 4:
                        search += "))" + (me.searchOptions == null ? "" : me.searchOptions);
                        if (search.indexOf("AND ())") !== -1) {
                          search = null;
                        }
                        callback(search);
                      case 5:
                        return _context.a(2);
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
            search += _this2.applySearchTo[i].id + ":" + _this2.searchTerm + '*';
            termAdded = true;
          } else if (type === "Competency" && _this2.applySearchTo[i].id === "competencyLabel") {
            if (termAdded) {
              search += " OR ";
            }
            search += "ceasn\\:competencyLabel:" + _this2.searchTerm + '*';
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
          var _ref2 = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee2(results) {
            var _iterator, _step, result, type, obj, _t4, _t5;
            return Object(regenerator["a" /* default */])().w(function (_context2) {
              while (1) switch (_context2.p = _context2.n) {
                case 0:
                  _iterator = Object(createForOfIteratorHelper["a" /* default */])(results);
                  _context2.p = 1;
                  _iterator.s();
                case 2:
                  if ((_step = _iterator.n()).done) {
                    _context2.n = 6;
                    break;
                  }
                  result = _step.value;
                  if (!(!me.filterToEditable || me.filterToEditable && me.canEditAny(result))) {
                    _context2.n = 5;
                    break;
                  }
                  if (EcArray.has(me.resultIds, result.id)) {
                    _context2.n = 5;
                    break;
                  }
                  me.resultIds.push(result.id);
                  if (!(!me.idsNotPermittedInSearch || me.idsNotPermittedInSearch.length === 0 || !EcArray.has(me.idsNotPermittedInSearch, result.shortId()))) {
                    _context2.n = 5;
                    break;
                  }
                  if (!(!result.parentDirectory || me.searchTerm !== "")) {
                    _context2.n = 5;
                    break;
                  }
                  if (!result.isAny(new EcEncryptedValue().getTypes())) {
                    _context2.n = 4;
                    break;
                  }
                  // Decrypt and add to results list
                  type = "Ec" + result.encryptedType;
                  obj = new window[type]();
                  _t4 = obj;
                  _context2.n = 3;
                  return EcEncryptedValue.fromEncryptedValue(result);
                case 3:
                  _t4.copyFrom.call(_t4, _context2.v);
                  result = obj;
                case 4:
                  directories.push(result);
                case 5:
                  _context2.n = 2;
                  break;
                case 6:
                  _context2.n = 8;
                  break;
                case 7:
                  _context2.p = 7;
                  _t5 = _context2.v;
                  _iterator.e(_t5);
                case 8:
                  _context2.p = 8;
                  _iterator.f();
                  return _context2.f(8);
                case 9:
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
                case 10:
                  return _context2.a(2);
              }
            }, _callee2, null, [[1, 7, 8, 9]]);
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
            var _ref3 = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee3(results) {
              var _iterator2, _step2, result, type, obj, _t6, _t7;
              return Object(regenerator["a" /* default */])().w(function (_context3) {
                while (1) switch (_context3.p = _context3.n) {
                  case 0:
                    _iterator2 = Object(createForOfIteratorHelper["a" /* default */])(results);
                    _context3.p = 1;
                    _iterator2.s();
                  case 2:
                    if ((_step2 = _iterator2.n()).done) {
                      _context3.n = 6;
                      break;
                    }
                    result = _step2.value;
                    if (!(!me.filterToEditable || me.filterToEditable && me.canEditAny(result))) {
                      _context3.n = 5;
                      break;
                    }
                    if (EcArray.has(me.resultIds, result.id)) {
                      _context3.n = 5;
                      break;
                    }
                    me.resultIds.push(result.id);
                    if (!(!me.idsNotPermittedInSearch || me.idsNotPermittedInSearch.length === 0 || !EcArray.has(me.idsNotPermittedInSearch, result.shortId()))) {
                      _context3.n = 5;
                      break;
                    }
                    if (!result.isAny(new EcEncryptedValue().getTypes())) {
                      _context3.n = 4;
                      break;
                    }
                    // Decrypt and add to results list
                    type = "Ec" + result.encryptedType;
                    obj = new window[type]();
                    _t6 = obj;
                    _context3.n = 3;
                    return EcEncryptedValue.fromEncryptedValue(result);
                  case 3:
                    _t6.copyFrom.call(_t6, _context3.v);
                    result = obj;
                  case 4:
                    if (result.name !== '' || result['dcterms:title'] !== '') {
                      me.results.push(result);
                      me.nonDirectoryResults = true;
                    }
                  case 5:
                    _context3.n = 2;
                    break;
                  case 6:
                    _context3.n = 8;
                    break;
                  case 7:
                    _context3.p = 7;
                    _t7 = _context3.v;
                    _iterator2.e(_t7);
                  case 8:
                    _context3.p = 8;
                    _iterator2.f();
                    return _context3.f(8);
                  case 9:
                    me.$store.commit('editor/setFirstSearchProcessing', false);
                    if (results.length < 10 && (me.type === "Framework" || me.type === "ConceptScheme")) {
                      if (me.searchCompetencies) {
                        me.searchForSubObjects();
                      }
                    }
                  case 10:
                    return _context3.a(2);
                }
              }, _callee3, null, [[1, 7, 8, 9]]);
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
            var _ref4 = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee4(results) {
              var _iterator3, _step3, result, objType, obj, _obj, _t8, _t9, _t0;
              return Object(regenerator["a" /* default */])().w(function (_context4) {
                while (1) switch (_context4.p = _context4.n) {
                  case 0:
                    _iterator3 = Object(createForOfIteratorHelper["a" /* default */])(results);
                    _context4.p = 1;
                    _iterator3.s();
                  case 2:
                    if ((_step3 = _iterator3.n()).done) {
                      _context4.n = 10;
                      break;
                    }
                    result = _step3.value;
                    if (!(!me.filterToEditable || me.filterToEditable && me.canEditAny(result))) {
                      _context4.n = 9;
                      break;
                    }
                    if (!me.searchingForCompetencies) {
                      _context4.n = 6;
                      break;
                    }
                    if (EcArray.has(me.resultIds, result.id)) {
                      _context4.n = 5;
                      break;
                    }
                    me.resultIds.push(result.id);
                    if (!(!me.idsNotPermittedInSearch || me.idsNotPermittedInSearch.length === 0 || !EcArray.has(me.idsNotPermittedInSearch, result.shortId()))) {
                      _context4.n = 5;
                      break;
                    }
                    if (!result.isAny(new EcEncryptedValue().getTypes())) {
                      _context4.n = 4;
                      break;
                    }
                    // Decrypt and add to results list
                    objType = "Ec" + result.encryptedType;
                    obj = new window[objType]();
                    _t8 = obj;
                    _context4.n = 3;
                    return EcEncryptedValue.fromEncryptedValue(result);
                  case 3:
                    _t8.copyFrom.call(_t8, _context4.v);
                    result = obj;
                  case 4:
                    me.subResults.push(result);
                  case 5:
                    _context4.n = 9;
                    break;
                  case 6:
                    if (EcArray.has(me.resultIds, result.id)) {
                      _context4.n = 9;
                      break;
                    }
                    me.resultIds.push(result.id);
                    if (!(!me.idsNotPermittedInSearch || me.idsNotPermittedInSearch.length === 0 || !EcArray.has(me.idsNotPermittedInSearch, result.shortId()))) {
                      _context4.n = 9;
                      break;
                    }
                    if (!result.isAny(new EcEncryptedValue().getTypes())) {
                      _context4.n = 8;
                      break;
                    }
                    // Decrypt and add to results list
                    objType = "Ec" + result.encryptedType;
                    _obj = new window[objType]();
                    _t9 = _obj;
                    _context4.n = 7;
                    return EcEncryptedValue.fromEncryptedValue(result);
                  case 7:
                    _t9.copyFrom.call(_t9, _context4.v);
                    result = _obj;
                  case 8:
                    me.results.push(result);
                  case 9:
                    _context4.n = 2;
                    break;
                  case 10:
                    _context4.n = 12;
                    break;
                  case 11:
                    _context4.p = 11;
                    _t0 = _context4.v;
                    _iterator3.e(_t0);
                  case 12:
                    _context4.p = 12;
                    _iterator3.f();
                    return _context4.f(12);
                  case 13:
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
                  case 14:
                    return _context4.a(2);
                }
              }, _callee4, null, [[1, 11, 12, 13]]);
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
          var _ref5 = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee5(subResults) {
            var _iterator4, _step4, subResult, objType, obj, _t1, _t10;
            return Object(regenerator["a" /* default */])().w(function (_context5) {
              while (1) switch (_context5.p = _context5.n) {
                case 0:
                  _iterator4 = Object(createForOfIteratorHelper["a" /* default */])(subResults);
                  _context5.p = 1;
                  _iterator4.s();
                case 2:
                  if ((_step4 = _iterator4.n()).done) {
                    _context5.n = 6;
                    break;
                  }
                  subResult = _step4.value;
                  if (!(!me.filterToEditable || me.filterToEditable && me.canEditAny(subResult))) {
                    _context5.n = 5;
                    break;
                  }
                  if (EcArray.has(me.resultIds, subResult.id)) {
                    _context5.n = 5;
                    break;
                  }
                  me.resultIds.push(subResult.id);
                  if (!(!me.idsNotPermittedInSearch || me.idsNotPermittedInSearch.length === 0 || !EcArray.has(me.idsNotPermittedInSearch, subResult.shortId()))) {
                    _context5.n = 5;
                    break;
                  }
                  if (!subResult.isAny(new EcEncryptedValue().getTypes())) {
                    _context5.n = 4;
                    break;
                  }
                  // Decrypt and add to results list
                  objType = "Ec" + subResult.encryptedType;
                  obj = new window[objType]();
                  _t1 = obj;
                  _context5.n = 3;
                  return EcEncryptedValue.fromEncryptedValue(subResult);
                case 3:
                  _t1.copyFrom.call(_t1, _context5.v);
                  subResult = obj;
                case 4:
                  me.subResults.push(subResult);
                  me.nonDirectoryResults = true;
                case 5:
                  _context5.n = 2;
                  break;
                case 6:
                  _context5.n = 8;
                  break;
                case 7:
                  _context5.p = 7;
                  _t10 = _context5.v;
                  _iterator4.e(_t10);
                case 8:
                  _context5.p = 8;
                  _iterator4.f();
                  return _context5.f(8);
                case 9:
                  if (subResults.length > 0 && $state) {
                    $state.loaded();
                  } else if ($state) {
                    $state.complete();
                  }
                  me.subStart += me.paramObj.size;
                case 10:
                  return _context5.a(2);
              }
            }, _callee5, null, [[1, 7, 8, 9]]);
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
//# sourceMappingURL=chunk-2d0d5fe2.4e07370b.js.map