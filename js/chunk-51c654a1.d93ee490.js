(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-51c654a1","chunk-25a2af2a","chunk-25a2af2a"],{

/***/ "1519":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "4099":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareAssertions_vue_vue_type_style_index_0_id_9b03f000_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1519");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareAssertions_vue_vue_type_style_index_0_id_9b03f000_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareAssertions_vue_vue_type_style_index_0_id_9b03f000_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "4d343":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"11cfccab-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/ShareAssertions.vue?vue&type=template&id=9b03f000

var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('modal-template', {
    attrs: {
      "active": true,
      "type": "primary"
    },
    on: {
      "close": function close($event) {
        _vm.closeModal;
        _vm.$emit('close');
      }
    }
  }, [_c('template', {
    slot: "modal-header"
  }, [_c('span', {
    staticClass: "title has-text-white"
  }, [_vm._v("Share Assertions")])]), _vm.isProcessing ? _c('template', {
    slot: "modal-body"
  }, [_c('h2', {
    staticClass: "header has-text-centered"
  }, [_vm._v(" Processing request... ")]), _c('div', {
    staticClass: "section has-background-white has-text-centered"
  }, [_c('span', {
    staticClass: "icon is-large"
  }, [_c('i', {
    staticClass: "fa fa-spinner fa-2x fa-pulse"
  })])])]) : _vm.isDone ? _c('template', {
    slot: "modal-body"
  }, [_c('div', {
    staticClass: "section has-background-white has-text-centered"
  }, [_c('p', [_c('strong', [_vm._v("Success!")])])])]) : _c('template', {
    slot: "modal-body"
  }, [_c('div', {
    staticClass: "assertion-share-container"
  }, [_c('div', {
    staticClass: "assertion-share-block"
  }, [_c('h4', {
    staticClass: "header is-size-3"
  }, [_vm._v(" Share assertions about: ")]), _c('div', {
    staticClass: "field"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.subjectFilter,
      expression: "subjectFilter"
    }],
    staticClass: "input",
    attrs: {
      "data-id": "share-assertions-subject-search",
      "type": "text",
      "placeholder": "search for person..."
    },
    domProps: {
      "value": _vm.subjectFilter
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.subjectFilter = $event.target.value;
      }
    }
  })]), _vm.filteredAvailableSubjects.length === 0 && _vm.subjectFilter === '' ? _c('div', [_c('i', {
    staticClass: "fa fa-info-circle"
  }), _vm._v(" No users found ")]) : _vm._e(), _vm.filteredAvailableSubjects.length > 0 ? _c('div', [_c('div', {
    staticClass: "table-container"
  }, [_c('table', {
    staticClass: "table is-hoverable is-fullwidth"
  }, [_c('thead', [_c('tr', [_c('th', {
    attrs: {
      "title": "Select"
    }
  }, [_c('input', {
    attrs: {
      "data-id": "share-assertions-select-all-subjects",
      "type": "checkbox"
    },
    on: {
      "change": _vm.selectAllSubjects
    }
  })]), _c('th', {
    attrs: {
      "title": "Add as member"
    }
  }, [_c('i', {
    staticClass: "fa fa-user"
  })]), _c('th', {
    attrs: {
      "title": "Add as manager"
    }
  }, [_c('i', {
    staticClass: "fa fa-user-shield"
  })])])]), _c('tbody', _vm._l(_vm.filteredAvailableSubjects, function (prs, index) {
    return _c('tr', {
      key: index,
      staticStyle: {
        "cursor": "pointer"
      },
      attrs: {
        "data-id": "share-assertions-subject-option"
      },
      on: {
        "click": function click($event) {
          return _vm.setSubject(prs.owner[0]);
        }
      }
    }, [_c('td', [_c('input', {
      attrs: {
        "type": "checkbox"
      },
      domProps: {
        "checked": _vm.shareSubjects[prs.owner[0]]
      },
      on: {
        "click": function click($event) {
          $event.stopPropagation();
          return _vm.setSubject(prs.owner[0]);
        }
      }
    })]), _c('td', [_vm._v(" " + _vm._s(prs.getName()) + " ")]), _c('td', [_vm._v(" " + _vm._s(prs.email) + " ")])]);
  }), 0)])])]) : _vm._e()]), _c('div', {
    staticClass: "assertion-share-icon"
  }), _c('div', {
    staticClass: "assertion-share-block"
  }, [_c('h4', {
    staticClass: "header is-size-3"
  }, [_vm._v(" Send to: ")]), _c('div', {
    staticClass: "field"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.targetFilter,
      expression: "targetFilter"
    }],
    staticClass: "input",
    attrs: {
      "data-id": "share-assertions-target-search",
      "type": "text",
      "placeholder": "search for person..."
    },
    domProps: {
      "value": _vm.targetFilter
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.targetFilter = $event.target.value;
      }
    }
  })]), _vm.filteredAvailableTargets.length === 0 && _vm.targetFilter === '' ? _c('div', [_c('i', {
    staticClass: "fa fa-info-circle"
  }), _vm._v(" No users found ")]) : _vm._e(), _vm.filteredAvailableTargets.length > 0 ? _c('div', [_c('div', {
    staticClass: "table-container"
  }, [_c('table', {
    staticClass: "table is-hoverable is-fullwidth"
  }, [_c('thead', [_c('tr', [_c('th', {
    attrs: {
      "title": "Select"
    }
  }, [_c('input', {
    attrs: {
      "data-id": "share-assertions-select-all-targets",
      "type": "checkbox"
    },
    on: {
      "change": _vm.selectAllTargets
    }
  })]), _c('th', {
    attrs: {
      "title": "Add as member"
    }
  }, [_c('i', {
    staticClass: "fa fa-user"
  })]), _c('th', {
    attrs: {
      "title": "Add as manager"
    }
  }, [_c('i', {
    staticClass: "fa fa-user-shield"
  })])])]), _c('tbody', _vm._l(_vm.filteredAvailableTargets, function (prs, index) {
    return _c('tr', {
      key: index,
      staticStyle: {
        "cursor": "pointer"
      },
      attrs: {
        "data-id": "share-assertions-target-option"
      },
      on: {
        "click": function click($event) {
          return _vm.setTarget(prs.owner[0]);
        }
      }
    }, [_c('td', [_c('input', {
      attrs: {
        "type": "checkbox"
      },
      domProps: {
        "checked": _vm.shareTargets[prs.owner[0]]
      },
      on: {
        "click": function click($event) {
          $event.stopPropagation();
          return _vm.setTarget(prs.owner[0]);
        }
      }
    })]), _c('td', [_vm._v(" " + _vm._s(prs.getName()) + " ")]), _c('td', [_vm._v(" " + _vm._s(prs.email) + " ")])]);
  }), 0)])])]) : _vm._e()])]), _c('div', {
    staticClass: "assertion-share-count-container"
  }, [_c('div', {
    staticClass: "assertion-share-count"
  }, [_c('strong', [_vm._v(_vm._s(Object.keys(_vm.shareSubjects).length) + " selected")])]), _c('div', {
    staticClass: "assertion-share-count"
  }, [_c('strong', [_vm._v(_vm._s(Object.keys(_vm.shareTargets).length) + " selected")])])])]), _c('template', {
    slot: "modal-foot"
  }, [_c('div', {
    staticClass: "buttons is-spaced"
  }, [_c('button', {
    staticClass: "button is-secondary is-outlined",
    attrs: {
      "disabled": _vm.isProcessing
    },
    on: {
      "click": function click($event) {
        return _vm.$store.commit('app/closeModal');
      }
    }
  }, [_c('span', [_vm._v("Cancel")]), _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-times-circle"
  })])]), _vm.isDone ? _c('button', {
    staticClass: "button is-primary is-outlined",
    attrs: {
      "data-id": "share-more-assertions-button"
    },
    on: {
      "click": function click($event) {
        _vm.isDone = false;
      }
    }
  }, [_vm._v(" Share More ")]) : _c('button', {
    staticClass: "button is-primary is-outlined",
    attrs: {
      "data-id": "share-assertions-button",
      "disabled": _vm.isProcessing || _vm.notSelected
    },
    on: {
      "click": _vm.shareAssertions
    }
  }, [_c('span', [_vm._v("Share")]), _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-share"
  })])])])])], 2);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/modalContent/ShareAssertions.vue?vue&type=template&id=9b03f000

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__("2909");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
var createForOfIteratorHelper = __webpack_require__("b85c");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
var regeneratorRuntime = __webpack_require__("c7eb");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__("caad");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__("2532");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.search.js
var es_string_search = __webpack_require__("841c");

// EXTERNAL MODULE: ./src/components/modalContent/ModalTemplate.vue + 4 modules
var ModalTemplate = __webpack_require__("af07");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/ShareAssertions.vue?vue&type=script&lang=js














/* harmony default export */ var ShareAssertionsvue_type_script_lang_js = ({
  name: 'ShareAssertionsModal',
  props: {
    isActive: Boolean
  },
  components: {
    ModalTemplate: ModalTemplate["a" /* default */]
  },
  data: function data() {
    return {
      isProcessing: false,
      shareSubjects: {},
      shareTargets: {},
      availablePersons: [],
      subjectFilter: '',
      targetFilter: '',
      isDone: false
    };
  },
  computed: {
    filteredAvailableSubjects: function filteredAvailableSubjects() {
      var _this = this;
      return this.availablePersons.filter(function (person) {
        return person.getName() && person.getName().toLowerCase().indexOf(_this.subjectFilter.toLowerCase()) > -1 || person.email && person.email.toLowerCase().indexOf(_this.subjectFilter.toLowerCase()) > -1;
      });
    },
    filteredAvailableTargets: function filteredAvailableTargets() {
      var _this2 = this;
      var myKey = EcIdentityManager.default.ids[0].ppk.toPk().toPem();
      return this.availablePersons.filter(function (person) {
        if (myKey === person.owner[0]) {
          return false;
        }
        return person.getName() && person.getName().toLowerCase().indexOf(_this2.targetFilter.toLowerCase()) > -1 || person.email && person.email.toLowerCase().indexOf(_this2.targetFilter.toLowerCase()) > -1;
      });
    },
    notSelected: function notSelected() {
      return Object.keys(this.shareSubjects).length === 0 || Object.keys(this.shareTargets).length === 0;
    }
  },
  mounted: function () {
    var _mounted = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee() {
      var _this3 = this;
      return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            EcPerson.search(window.repo, '*', null, null, {
              size: 10000
            }).then(function (people) {
              _this3.availablePersons = people;
            });
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function mounted() {
      return _mounted.apply(this, arguments);
    }
    return mounted;
  }(),
  methods: {
    selectAllSubjects: function selectAllSubjects(evt) {
      var checked = evt.target.checked;
      if (checked) {
        var _iterator = Object(createForOfIteratorHelper["a" /* default */])(this.filteredAvailableSubjects),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var prs = _step.value;
            this.$set(this.shareSubjects, prs.owner[0], 1);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } else {
        this.shareSubjects = {};
      }
    },
    selectAllTargets: function selectAllTargets(evt) {
      var checked = evt.target.checked;
      if (checked) {
        var _iterator2 = Object(createForOfIteratorHelper["a" /* default */])(this.filteredAvailableTargets),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var prs = _step2.value;
            this.$set(this.shareTargets, prs.owner[0], 1);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      } else {
        this.shareTargets = {};
      }
    },
    setSubject: function setSubject(subject) {
      if (this.shareSubjects[subject]) {
        this.$delete(this.shareSubjects, subject);
      } else {
        this.$set(this.shareSubjects, subject, 1);
      }
    },
    setTarget: function setTarget(target) {
      if (this.shareTargets[target]) {
        this.$delete(this.shareTargets, target);
      } else {
        this.$set(this.shareTargets, target, 1);
      }
    },
    shareAssertions: function shareAssertions() {
      var _this5 = this;
      this.isProcessing = true;
      var searchQuery = '';
      var subjects = Object.keys(this.shareSubjects);
      for (var i = 0; i < subjects.length; i++) {
        searchQuery += "\\*reader:\"".concat(subjects[i], "\"");
        if (i !== subjects.length - 1) {
          searchQuery += ' OR ';
        }
      }
      var doSearch = /*#__PURE__*/function () {
        var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee3(start, count) {
          var _this4 = this;
          return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", new Promise(function (resolve, reject) {
                  EcAssertion.search(window.repo, "\\*owner:\"".concat(_this4.$store.getters['editor/getMe'], "\" AND (").concat(searchQuery, ")"), /*#__PURE__*/function () {
                    var _ref2 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee2(results) {
                      var _assertions;
                      return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee2$(_context2) {
                        while (1) switch (_context2.prev = _context2.next) {
                          case 0:
                            (_assertions = assertions).push.apply(_assertions, Object(toConsumableArray["a" /* default */])(results));
                            start += count;
                            if (!(results.length > 0)) {
                              _context2.next = 5;
                              break;
                            }
                            _context2.next = 5;
                            return doSearch(start, count);
                          case 5:
                            resolve();
                          case 6:
                          case "end":
                            return _context2.stop();
                        }
                      }, _callee2);
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
                return _context3.stop();
            }
          }, _callee3);
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
          var eah = new EcAsyncHelper();
          eah.each(assertions, function (assertion, after) {
            assertion.getSubjectAsync(function (subject) {
              if (subjects.includes(subject.toPem())) {
                assertion.getAgentAsync( /*#__PURE__*/function () {
                  var _ref3 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee4(agent) {
                    var _i, _Object$keys, target;
                    return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee4$(_context4) {
                      while (1) switch (_context4.prev = _context4.next) {
                        case 0:
                          if (!(_this5.$store.getters['editor/getMe'] === agent.toPem())) {
                            _context4.next = 14;
                            break;
                          }
                          _i = 0, _Object$keys = Object.keys(_this5.shareTargets);
                        case 2:
                          if (!(_i < _Object$keys.length)) {
                            _context4.next = 9;
                            break;
                          }
                          target = _Object$keys[_i];
                          _context4.next = 6;
                          return assertion.addReader(EcPk.fromPem(target));
                        case 6:
                          _i++;
                          _context4.next = 2;
                          break;
                        case 9:
                          _context4.next = 11;
                          return EcRepository.save(assertion);
                        case 11:
                          after();
                          _context4.next = 15;
                          break;
                        case 14:
                          after();
                        case 15:
                        case "end":
                          return _context4.stop();
                      }
                    }, _callee4);
                  }));
                  return function (_x4) {
                    return _ref3.apply(this, arguments);
                  };
                }(), appError);
              } else {
                after();
              }
            }, appError);
          }, function () {
            _this5.isProcessing = false;
            _this5.isDone = true;
          });
        });
      }).catch(appError);
    }
  },
  watch: {}
});
// CONCATENATED MODULE: ./src/components/modalContent/ShareAssertions.vue?vue&type=script&lang=js
 /* harmony default export */ var modalContent_ShareAssertionsvue_type_script_lang_js = (ShareAssertionsvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/modalContent/ShareAssertions.vue?vue&type=style&index=0&id=9b03f000&prod&lang=scss
var ShareAssertionsvue_type_style_index_0_id_9b03f000_prod_lang_scss = __webpack_require__("4099");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/modalContent/ShareAssertions.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  modalContent_ShareAssertionsvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ShareAssertions = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "62af":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

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

/***/ "af07":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"11cfccab-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/ModalTemplate.vue?vue&type=template&id=1c4e04a7
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

/***/ })

}]);
//# sourceMappingURL=chunk-51c654a1.d93ee490.js.map