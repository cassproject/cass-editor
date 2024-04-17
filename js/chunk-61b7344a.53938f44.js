(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-61b7344a","chunk-2d0dab46","chunk-25a2af2a","chunk-25a2af2a","chunk-2d0dab46"],{

/***/ "2c3a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__("a4d3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.description.js
var es_symbol_description = __webpack_require__("e01a");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"862f505e-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/configuration/ConfigurationList.vue?vue&type=template&id=6dcf7dea



var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "table-container"
  }, [_c('table', {
    staticClass: "table is-fullwidth"
  }, [_c('thead', [_c('tr', [_vm._m(0), _vm.view !== 'modal' ? _c('th', [_c('abbr', {
    attrs: {
      "title": "Description"
    }
  }, [_vm._v("description")])]) : _vm._e(), _vm.view !== 'modal' ? _c('th', [_c('abbr', {
    attrs: {
      "title": "Instance Default"
    }
  }, [_vm._v("instance default")])]) : _vm._e(), _vm.view !== 'modal' ? _c('th', [_c('abbr', {
    attrs: {
      "title": "Browser Default"
    }
  }), _vm._v("browser default ")]) : _c('th', [_c('abbr', {
    attrs: {
      "title": "Framework Default"
    }
  }, [_vm._v("framework default")])]), _vm.view !== 'modal' ? _c('th', [_c('abbr', {
    attrs: {
      "title": ""
    }
  }), _vm._v("view/manage/delete ")]) : _vm._e()])]), _c('tbody', _vm._l(_vm.configList, function (config) {
    return _c('configuration-list-item', {
      key: config,
      attrs: {
        "id": config.id,
        "view": _vm.view,
        "name": config.name,
        "isDefault": config.isDefault,
        "description": config.description,
        "isOwned": config.isOwned,
        "defaultBrowserConfigId": _vm.localDefaultBrowserConfigId,
        "defaultFrameworkConfigId": _vm.frameworkConfigId
      },
      on: {
        "set-browser-default": _vm.setConfigAsBrowserDefault,
        "remove-browser-default-config": _vm.removeConfigAsBrowserDefault,
        "set-framework-default": _vm.setConfigAsFrameworkDefault,
        "show-details": _vm.showConfigDetails,
        "show-delete": _vm.showDeleteConfirm
      }
    });
  }), 1), _c('br')])]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('th', [_c('abbr', {
    attrs: {
      "title": "Name"
    }
  }, [_vm._v("name")])]);
}];

// CONCATENATED MODULE: ./src/components/configuration/ConfigurationList.vue?vue&type=template&id=6dcf7dea

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
var regeneratorRuntime = __webpack_require__("c7eb");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.search.js
var es_string_search = __webpack_require__("841c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("fb6a");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"862f505e-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/configuration/ConfigurationListItem.vue?vue&type=template&id=bb9ea86c&scoped=true





var ConfigurationListItemvue_type_template_id_bb9ea86c_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('tr', [_c('th', [_c('b', [_vm._v(_vm._s(_vm.name))])]), _vm.view !== 'modal' ? _c('td', [_vm._v(" " + _vm._s(_vm.description) + " ")]) : _vm._e(), _vm.view !== 'modal' ? _c('td', [_vm.isDefault ? _c('span', {
    staticClass: "icon has-text-primary"
  }, [_c('i', {
    staticClass: "fa fa-check"
  })]) : _vm._e()]) : _vm._e(), _vm.view !== 'modal' ? _c('td', [_c('div', {
    staticClass: "field"
  }, [_c('div', {
    staticClass: "control is-size-3"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.isBrowserDefault,
      expression: "isBrowserDefault"
    }],
    staticClass: "switch is-outlined",
    attrs: {
      "id": _vm.id + 'browserDefaultSwitch',
      "type": "checkbox",
      "name": _vm.id + 'browserDefaultSwitch'
    },
    domProps: {
      "checked": Array.isArray(_vm.isBrowserDefault) ? _vm._i(_vm.isBrowserDefault, null) > -1 : _vm.isBrowserDefault
    },
    on: {
      "change": function change($event) {
        var $$a = _vm.isBrowserDefault,
          $$el = $event.target,
          $$c = $$el.checked ? true : false;
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.isBrowserDefault = $$a.concat([$$v]));
          } else {
            $$i > -1 && (_vm.isBrowserDefault = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.isBrowserDefault = $$c;
        }
      }
    }
  }), _c('label', {
    attrs: {
      "for": _vm.id + 'browserDefaultSwitch'
    }
  })])])]) : _c('td', [_c('div', {
    staticClass: "button is-outlined is-primary is-small",
    attrs: {
      "disabled": _vm.defaultFrameworkConfigId !== null && _vm.defaultFrameworkConfigId !== undefined && _vm.defaultFrameworkConfigId.equals(_vm.id)
    },
    on: {
      "click": function click($event) {
        return _vm.$emit('set-framework-default', _vm.id);
      }
    }
  }, [_vm._v(" set as framework default ")])]), _vm.view !== 'modal' ? _c('td', [_vm.isOwned ? _c('div', {
    staticClass: "button is-outlined is-small is-primary",
    attrs: {
      "title": "Manage configuration"
    },
    on: {
      "click": function click($event) {
        return _vm.$emit('show-details', _vm.id);
      }
    }
  }, [_vm._m(0)]) : _vm._e(), _vm.isOwned && !_vm.isDefault ? _c('div', {
    staticClass: "button is-outlined is-small is-danger delete-btn",
    attrs: {
      "title": "Delete configuration"
    },
    on: {
      "click": function click($event) {
        return _vm.$emit('show-delete', _vm.id);
      }
    }
  }, [_vm._m(1)]) : _vm._e(), !_vm.isOwned ? _c('div', {
    staticClass: "button is-outlined is-small is-primary",
    attrs: {
      "title": "View configuration"
    },
    on: {
      "click": function click($event) {
        return _vm.$emit('show-details', _vm.id);
      }
    }
  }, [_vm._m(2)]) : _vm._e()]) : _vm._e()]);
};
var ConfigurationListItemvue_type_template_id_bb9ea86c_scoped_true_staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fas fa-cog"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fas fa-trash"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fas fa-eye"
  })]);
}];

// CONCATENATED MODULE: ./src/components/configuration/ConfigurationListItem.vue?vue&type=template&id=bb9ea86c&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/configuration/ConfigurationListItem.vue?vue&type=script&lang=js
/* harmony default export */ var ConfigurationListItemvue_type_script_lang_js = ({
  name: 'ConfigurationListItem',
  props: {
    id: {
      type: String,
      default: ''
    },
    view: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    isOwned: {
      type: Boolean,
      default: false
    },
    isDefault: {
      type: Boolean,
      default: false
    },
    defaultBrowserConfigId: {
      type: String,
      default: ''
    },
    defaultFrameworkConfigId: {
      type: String,
      default: ''
    }
  },
  computed: {
    isBrowserDefault: {
      get: function get() {
        if (this.defaultBrowserConfigId === this.id) {
          return true;
        } else {
          return false;
        }
      },
      set: function set(val) {
        appLog("val", val);
        if (val) {
          this.$emit('set-browser-default', this.id);
        } else {
          this.$emit('remove-browser-default-config');
        }
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/configuration/ConfigurationListItem.vue?vue&type=script&lang=js
 /* harmony default export */ var configuration_ConfigurationListItemvue_type_script_lang_js = (ConfigurationListItemvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/configuration/ConfigurationListItem.vue?vue&type=style&index=0&id=bb9ea86c&prod&lang=scss&scoped=true
var ConfigurationListItemvue_type_style_index_0_id_bb9ea86c_prod_lang_scss_scoped_true = __webpack_require__("b2df");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/configuration/ConfigurationListItem.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  configuration_ConfigurationListItemvue_type_script_lang_js,
  ConfigurationListItemvue_type_template_id_bb9ea86c_scoped_true_render,
  ConfigurationListItemvue_type_template_id_bb9ea86c_scoped_true_staticRenderFns,
  false,
  null,
  "bb9ea86c",
  null
  
)

/* harmony default export */ var ConfigurationListItem = (component.exports);
// EXTERNAL MODULE: ./src/mixins/cassUtil.js
var cassUtil = __webpack_require__("6d79");

// EXTERNAL MODULE: ./src/mixins/configuration.js
var configuration = __webpack_require__("a861");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/configuration/ConfigurationList.vue?vue&type=script&lang=js











/* harmony default export */ var ConfigurationListvue_type_script_lang_js = ({
  name: 'ConfigurationList',
  components: {
    ConfigurationListItem: ConfigurationListItem
  },
  props: {
    view: {
      type: String,
      defau: 'page'
    }
  },
  computed: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["b" /* mapGetters */])({
    CONFIG_SEARCH_SIZE: 'configuration/CONFIG_SEARCH_SIZE',
    DEFAULT_CONFIGURATION_TYPE: 'configuration/DEFAULT_CONFIGURATION_TYPE',
    DEFAULT_CONFIGURATION_CONTEXT: 'configuration/DEFAULT_CONFIGURATION_CONTEXT',
    LANG_STRING_TYPE: 'configuration/LANG_STRING_TYPE',
    DEFAULT_HEADING: 'configuration/DEFAULT_HEADING'
  })), {}, {
    defaultBrowserConfigName: {
      get: function get() {
        return this.$store.getters['configuration/defaultBrowserConfigName'];
      },
      set: function set(val) {
        this.$store.commit('configuration/setDefaultBrowserConfigName', val);
      }
    },
    showConfirmDeleteConfigModal: {
      get: function get() {
        return this.$store.getters['configuration/showConfirmDeleteConfigModal'];
      },
      set: function set(val) {
        this.$store.commit('configuration/setShowConfirmDeleteConfigModal', val);
      }
    },
    showBrowserConfigSetModal: {
      get: function get() {
        return this.$store.getters['configuration/showBrowserConfigSetModal'];
      },
      set: function set(val) {
        this.$store.commit('configuration/setShowBrowserConfigSetModal', val);
      }
    },
    showMustBeLoggedInModal: {
      get: function get() {
        return this.$store.getters['configuration/showMustBeLoggedInModal'];
      },
      set: function set(val) {
        this.$store.commit('configuration/setShowMustBeLoggedInModal', val);
      }
    },
    configToDelete: {
      get: function get() {
        return this.$store.getters['configuration/configToDelete'];
      },
      set: function set(val) {
        this.$store.commit('configuration/setConfigToDelete', val);
      }
    },
    configViewMode: function configViewMode() {
      return this.$store.getters['configuration/configView'];
    },
    localDefaultBrowserConfigId: function localDefaultBrowserConfigId() {
      return this.$store.getters['configuration/localDefaultBrowserConfig'];
    }
  }),
  data: function data() {
    return {
      configBusy: false,
      configList: [],
      complexConfigObject: {},
      defaultConfigId: null,
      frameworkConfigId: '',
      enforceHeadings: false
    };
  },
  mixins: [cassUtil["a" /* cassUtil */], configuration["a" /* configuration */]],
  methods: {
    showDeleteConfirm: function showDeleteConfirm(configId) {
      this.setConfigToDelete(configId);
      this.showConfirmDeleteConfigModal = true;
    },
    setConfigToDelete: function setConfigToDelete(configId) {
      this.$store.commit('configuration/setConfigToDelete', this.getConfigById(configId));
    },
    setConfigAsFrameworkDefault: function setConfigAsFrameworkDefault(configId) {
      var _this = this;
      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee2() {
        var me, f, previousConfig;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              me = _this;
              f = _this.$store.getters['editor/framework'];
              previousConfig = f.configuration;
              f.configuration = configId;
              if (previousConfig) {
                _context2.next = 8;
                break;
              }
              _context2.next = 7;
              return _this.setOwnersAndReaders(f);
            case 7:
              f = _context2.sent;
            case 8:
              if (f) {
                _this.frameworkConfigId = configId;
                window.repo.saveTo(f, /*#__PURE__*/Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee() {
                  return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        _context.t0 = me.$store;
                        _context.next = 3;
                        return EcRepository.get(f.shortId());
                      case 3:
                        _context.t1 = _context.sent;
                        _context.t0.commit.call(_context.t0, 'editor/framework', _context.t1);
                      case 5:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                })), function () {});
              }
            case 9:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))();
    },
    setOwnersAndReaders: function setOwnersAndReaders(framework) {
      var _this2 = this;
      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee4() {
        var userIdentity, config, owners, readers, i, compsAndRelations, _i3;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              userIdentity = null;
              if (EcIdentityManager.default.ids.length > 0) {
                userIdentity = EcIdentityManager.default.ids[0].ppk.toPk();
              }
              _context4.next = 4;
              return EcRepository.get(framework.configuration);
            case 4:
              config = _context4.sent;
              owners = config.defaultObjectOwners;
              readers = config.defaultObjectReaders;
              if (!(owners.length > 0 || readers.length > 0)) {
                _context4.next = 14;
                break;
              }
              if (!userIdentity) {
                _context4.next = 12;
                break;
              }
              framework.addOwner(userIdentity);
              _context4.next = 14;
              break;
            case 12:
              _this2.$store.commit('configuration/setShowMustBeLoggedInModal', true);
              return _context4.abrupt("return", false);
            case 14:
              for (i = 0; i < owners.length; i++) {
                framework.addOwner(EcPk.fromPem(owners[i]));
              }
              compsAndRelations = [];
              if (!new EcConceptScheme().isA(framework.getFullType())) {
                _context4.next = 22;
                break;
              }
              _context4.next = 19;
              return EcConcept.search(window.repo, 'skos:inScheme\\:"' + framework.shortId() + '"', null, null, {
                size: 10000
              });
            case 19:
              compsAndRelations = _context4.sent.map(function (x) {
                return x.shortId();
              });
              _context4.next = 24;
              break;
            case 22:
              compsAndRelations = framework.competency ? framework.competency : [];
              if (framework.relation) {
                compsAndRelations = compsAndRelations.concat(framework.relation);
              }
            case 24:
              new EcAsyncHelper().each(compsAndRelations, function (id, done) {
                EcRepository.get(id, /*#__PURE__*/function () {
                  var _ref2 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee3(obj) {
                    var _i, _i2;
                    return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee3$(_context3) {
                      while (1) switch (_context3.prev = _context3.next) {
                        case 0:
                          if (owners.length > 0 || readers.length > 0) {
                            if (userIdentity) {
                              obj.addOwner(userIdentity);
                            }
                          }
                          for (_i = 0; _i < owners.length; _i++) {
                            obj.addOwner(EcPk.fromPem(owners[_i]));
                          }
                          if (!(readers.length > 0)) {
                            _context3.next = 7;
                            break;
                          }
                          for (_i2 = 0; _i2 < readers.length; _i2++) {
                            obj.addReader(EcPk.fromPem(readers[_i2]));
                          }
                          _context3.next = 6;
                          return EcEncryptedValue.toEncryptedValue(obj);
                        case 6:
                          obj = _context3.sent;
                        case 7:
                          window.repo.saveTo(obj, done, done);
                        case 8:
                        case "end":
                          return _context3.stop();
                      }
                    }, _callee3);
                  }));
                  return function (_x) {
                    return _ref2.apply(this, arguments);
                  };
                }(), done);
              }, function (competencyIds) {});
              if (!(readers.length > 0)) {
                _context4.next = 30;
                break;
              }
              for (_i3 = 0; _i3 < readers.length; _i3++) {
                framework.addReader(EcPk.fromPem(readers[_i3]));
              }
              _context4.next = 29;
              return EcEncryptedValue.toEncryptedValue(framework);
            case 29:
              framework = _context4.sent;
            case 30:
              return _context4.abrupt("return", framework);
            case 31:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }))();
    }
  }
});
// CONCATENATED MODULE: ./src/components/configuration/ConfigurationList.vue?vue&type=script&lang=js
 /* harmony default export */ var configuration_ConfigurationListvue_type_script_lang_js = (ConfigurationListvue_type_script_lang_js); 
// CONCATENATED MODULE: ./src/components/configuration/ConfigurationList.vue





/* normalize component */

var ConfigurationList_component = Object(componentNormalizer["a" /* default */])(
  configuration_ConfigurationListvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ConfigurationList = __webpack_exports__["a"] = (ConfigurationList_component.exports);

/***/ }),

/***/ "62af":
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

/***/ "a861":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return configuration; });
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("b0c0");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_sort_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("4e82");
/* harmony import */ var core_js_modules_es_array_sort_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_sort_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("a4d3");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("e01a");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("14d9");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("498a");
/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("b64b");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("caad");
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("2532");
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("d3b7");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("159b");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("2909");
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("b85c");
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("5530");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("2f62");


























var configuration = {
  name: 'configuration',
  computed: Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])(Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])({}, Object(vuex__WEBPACK_IMPORTED_MODULE_14__[/* mapGetters */ "b"])({
    CONFIG_SEARCH_SIZE: 'configuration/CONFIG_SEARCH_SIZE',
    DEFAULT_CONFIGURATION_TYPE: 'configuration/DEFAULT_CONFIGURATION_TYPE',
    DEFAULT_CONFIGURATION_CONTEXT: 'configuration/DEFAULT_CONFIGURATION_CONTEXT',
    LANG_STRING_RANGE: 'configuration/LANG_STRING_RANGE',
    DEFAULT_HEADING: 'configuration/DEFAULT_HEADING'
  })), {}, {
    currentConfig: {
      get: function get() {
        return this.$store.getters['configuration/currentConfig'];
      },
      set: function set(val) {
        this.$store.commit('configuration/setCurrentConfig', val);
      }
    }
  }),
  methods: {
    closeModal: function closeModal() {
      this.$store.commit('app/closeModal');
    },
    showListView: function showListView() {
      this.$store.commit('configuration/setConfigView', "list");
    },
    showDetailView: function showDetailView() {
      this.$store.commit('configuration/setConfigView', "detail");
    },
    showConfigDetails: function showConfigDetails(configId) {
      this.setCurrentConfig(configId);
      this.showDetailView();
    },
    generateCustomPropertyContextAndNameFromId: function generateCustomPropertyContextAndNameFromId(customPropId) {
      var retObj = {};
      retObj.context = customPropId.substr(0, customPropId.lastIndexOf("/") + 1);
      retObj.name = customPropId.substr(customPropId.lastIndexOf("/") + 1);
      return retObj;
    },
    getConfigById: function getConfigById(configId) {
      var _iterator = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"])(this.configList),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var c = _step.value;
          if (c.id.equals(configId)) {
            return c;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return null;
    },
    setCurrentConfig: function setCurrentConfig(configId) {
      var currentConfig = this.getConfigById(configId);
      this.$store.commit('configuration/setCurrentConfig', currentConfig);
    },
    sortConfigList: function sortConfigList() {
      this.configList.sort(function (c1, c2) {
        if (c1.isOwned !== c2.isOwned) {
          if (c2.isOwned) return 1;else return -1;
        } else {
          if (c1.name > c2.name) return 1;else if (c2.name > c1.name) return -1;else return 0;
        }
      });
    },
    isCustomPropertyKey: function isCustomPropertyKey(propertyParent, propertyKey) {
      if (propertyKey.equals('headings')) return false;else if (propertyKey.equals('primaryProperties')) return false;else if (propertyKey.equals('secondaryProperties')) return false;else if (propertyKey.equals('tertiaryProperties')) return false;else if (propertyKey.equals('@id')) return false;else if (propertyKey.equals('http://schema.org/name')) return false;else if (propertyKey.equals('http://schema.org/description')) return false;else if (propertyKey.equals('https://schema.cassproject.org/0.4/classification')) return false;else if (propertyKey.equals('https://schema.cassproject.org/0.4/markings')) return false;else if (propertyParent.equalsIgnoreCase('taxonomy') && propertyKey.equals('http://purl.org/dc/terms/title')) return false;else if (propertyParent.equalsIgnoreCase('taxonomy') && propertyKey.equals('http://purl.org/dc/terms/description')) return false;else if (propertyParent.equalsIgnoreCase('taxonomy') && propertyKey.equals('http://purl.org/dc/terms/creator')) return false;else if (propertyParent.equalsIgnoreCase('taxonomy') && propertyKey.equals('http://purl.org/dc/terms/publisher')) return false;else if (propertyParent.equalsIgnoreCase('taxonomy') && propertyKey.equals('https://purl.org/ctdlasn/terms/publisherName')) return false;else if (propertyParent.equalsIgnoreCase('taxonomy') && propertyKey.equals('http://purl.org/dc/terms/language')) return false;else if (propertyParent.equalsIgnoreCase('taxonomy') && propertyKey.equals('http://purl.org/dc/elements/1.1/source')) return false;else if (propertyParent.equalsIgnoreCase('taxon') && propertyKey.equals('http://www.w3.org/2004/02/skos/core#prefLabel')) return false;else if (propertyParent.equalsIgnoreCase('taxon') && propertyKey.equals('http://www.w3.org/2004/02/skos/core#definition')) return false;else if (propertyParent.equalsIgnoreCase('taxon') && propertyKey.equals('http://www.w3.org/2004/02/skos/core#notation')) return false;else if (propertyParent.equalsIgnoreCase('taxon') && propertyKey.equals('http://www.w3.org/2004/02/skos/core#altLabel')) return false;else if (propertyParent.equalsIgnoreCase('taxon') && propertyKey.equals('http://www.w3.org/2004/02/skos/core#hiddenLabel')) return false;else if (propertyParent.equalsIgnoreCase('taxon') && propertyKey.equals('http://www.w3.org/2004/02/skos/core#note')) return false;else if (propertyParent.equalsIgnoreCase('taxon') && propertyKey.equals('http://www.w3.org/2004/02/skos/core#broader')) return false;else if (propertyParent.equalsIgnoreCase('taxon') && propertyKey.equals('http://www.w3.org/2004/02/skos/core#narrower')) return false;else if (propertyParent.equalsIgnoreCase('taxon') && propertyKey.equals('http://www.w3.org/2004/02/skos/core#broadMatch')) return false;else if (propertyParent.equalsIgnoreCase('taxon') && propertyKey.equals('http://www.w3.org/2004/02/skos/core#closeMatch')) return false;else if (propertyParent.equalsIgnoreCase('taxon') && propertyKey.equals('http://www.w3.org/2004/02/skos/core#exactMatch')) return false;else if (propertyParent.equalsIgnoreCase('taxon') && propertyKey.equals('http://www.w3.org/2004/02/skos/core#narrowMatch')) return false;else if (propertyParent.equalsIgnoreCase('taxon') && propertyKey.equals('http://www.w3.org/2004/02/skos/core#related')) return false;else if (propertyParent.equalsIgnoreCase('competency') && propertyKey.equals('http://purl.org/dc/terms/type')) return false;else if (propertyParent.equalsIgnoreCase('competency') && propertyKey.equals('relationshipsHeading')) return false;else if (propertyParent.equalsIgnoreCase('competency') && propertyKey.equals('relationshipsPriority')) return false;else return true;
    },
    generateSimpleCustomPropertyObject: function generateSimpleCustomPropertyObject(ccpo) {
      var scpo = {};
      var contextNameObj = this.generateCustomPropertyContextAndNameFromId(ccpo["@id"]);
      scpo.context = contextNameObj.context;
      scpo.propertyName = contextNameObj.name;
      scpo.range = ccpo["http://schema.org/rangeIncludes"][0]["@id"];
      scpo.description = ccpo["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
      scpo.label = ccpo["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
      scpo.priority = ccpo["priority"];
      if (ccpo["isDirectLink"]) {
        scpo.isDirectLink = ccpo["isDirectLink"];
      }
      if (ccpo["heading"]) scpo.heading = ccpo["heading"];else scpo.heading = "";
      if (ccpo["max"] && (ccpo["max"] === 1 || ccpo["max"] === '1')) scpo.allowMultiple = false;else scpo.allowMultiples = true;
      if (ccpo["onePerLanguage"] && (ccpo["onePerLanguage"] === 'true' || ccpo["max"] === true)) scpo.onePerLanguage = true;else scpo.onePerLanguage = false;
      scpo.required = this.getBooleanValue(ccpo["isRequired"]);
      scpo.permittedValues = [];
      scpo.permittedTypes = [];
      scpo.permittedConcepts = [];
      if (scpo.range.equalsIgnoreCase('https://schema.cassproject.org/0.4/Competency')) {
        if (ccpo.options && ccpo.options.length > 0) {
          var _iterator2 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"])(ccpo.options),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var pv = _step2.value;
              var pvo = {};
              pvo.display = pv.display;
              pvo.value = pv.val;
              scpo.permittedTypes.push(pvo);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      } else if (scpo.range.equalsIgnoreCase('https://schema.cassproject.org/0.4/skos/Concept')) {
        if (ccpo.options && ccpo.options.length > 0) {
          var _iterator3 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"])(ccpo.options),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var _pv = _step3.value;
              var _pvo = {};
              _pvo.display = _pv.display;
              _pvo.value = _pv.val;
              scpo.permittedConcepts.push(_pvo);
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }
      } else if (ccpo.options && ccpo.options.length > 0) {
        var _iterator4 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"])(ccpo.options),
          _step4;
        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var _pv2 = _step4.value;
            var _pvo2 = {};
            _pvo2.display = _pv2.display;
            _pvo2.value = _pv2.val;
            scpo.permittedValues.push(_pvo2);
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      }
      return scpo;
    },
    buildSimpleConfigObjectFrameworkData: function buildSimpleConfigObjectFrameworkData(simpleConfigObj, complexConfigObj) {
      var cfo = complexConfigObj["frameworkConfig"];
      simpleConfigObj.fwkIdLabel = cfo["@id"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
      simpleConfigObj.fwkIdDescription = cfo["@id"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
      simpleConfigObj.fwkIdPriorty = cfo["@id"]["priority"];
      var idHeading = cfo["@id"]["heading"];
      if (idHeading) simpleConfigObj.fwkIdHeading = idHeading.trim();else simpleConfigObj.fwkIdHeading = "";
      simpleConfigObj.fwkNameLabel = cfo["http://schema.org/name"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
      simpleConfigObj.fwkNameDescription = cfo["http://schema.org/name"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
      var nameHeading = cfo["http://schema.org/name"]["heading"];
      if (nameHeading) simpleConfigObj.fwkNameHeading = nameHeading.trim();else simpleConfigObj.fwkNameHeading = "";
      simpleConfigObj.fwkDescLabel = cfo["http://schema.org/description"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
      simpleConfigObj.fwkDescDescription = cfo["http://schema.org/description"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
      simpleConfigObj.fwkDescPriority = cfo["http://schema.org/description"]["priority"];
      simpleConfigObj.fwkDescRequired = this.getBooleanValue(cfo["http://schema.org/description"]["isRequired"]);
      var descHeading = cfo["http://schema.org/description"]["heading"];
      if (descHeading) simpleConfigObj.fwkDescHeading = descHeading.trim();else simpleConfigObj.fwkDescHeading = "";
      if (cfo["https://schema.cassproject.org/0.4/classification"] != null) {
        simpleConfigObj.fwkClassLabel = cfo["https://schema.cassproject.org/0.4/classification"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
        simpleConfigObj.fwkClassDescription = cfo["https://schema.cassproject.org/0.4/classification"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
        simpleConfigObj.fwkClassPriority = cfo["https://schema.cassproject.org/0.4/classification"]["priority"];
        simpleConfigObj.fwkClassRequired = this.getBooleanValue(cfo["https://schema.cassproject.org/0.4/classification"]["isRequired"]);
        var classHeading = cfo["https://schema.cassproject.org/0.4/classification"]["heading"];
        if (classHeading) simpleConfigObj.fwkClassHeading = classHeading.trim();else simpleConfigObj.fwkClassHeading = "";
      }
      if (cfo["https://schema.cassproject.org/0.4/markings"] != null) {
        simpleConfigObj.fwkMarkingsLabel = cfo["https://schema.cassproject.org/0.4/markings"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
        simpleConfigObj.fwkMarkingsDescription = cfo["https://schema.cassproject.org/0.4/markings"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
        simpleConfigObj.fwkMarkingsPriority = cfo["https://schema.cassproject.org/0.4/markings"]["priority"];
        simpleConfigObj.fwkMarkingsRequired = this.getBooleanValue(cfo["https://schema.cassproject.org/0.4/markings"]["isRequired"]);
        var markingsHeading = cfo["https://schema.cassproject.org/0.4/markings"]["heading"];
        if (markingsHeading) simpleConfigObj.fwkMarkingsHeading = markingsHeading.trim();else simpleConfigObj.fwkMarkingsHeading = "";
      }
      simpleConfigObj.fwkCustomProperties = [];
      var propertyKeys = Object.keys(cfo);
      for (var _i = 0, _propertyKeys = propertyKeys; _i < _propertyKeys.length; _i++) {
        var pk = _propertyKeys[_i];
        if (this.isCustomPropertyKey('framework', pk)) {
          simpleConfigObj.fwkCustomProperties.push(this.generateSimpleCustomPropertyObject(cfo[pk]));
        }
      }
    },
    buildSimpleConfigObjectTaxonomyData: function buildSimpleConfigObjectTaxonomyData(simpleConfigObj, complexConfigObj) {
      var cfo = complexConfigObj["taxonomyConfig"];
      if (!cfo) {
        this.currentConfig = this.generateNewConfigObject();
        var obj = {};
        this.addTaxonomyConfigToObject(obj);
        cfo = obj.taxonomyConfig;
      }
      simpleConfigObj.taxonomyIdLabel = cfo["@id"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
      simpleConfigObj.taxonomyIdDescription = cfo["@id"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
      simpleConfigObj.taxonomyIdPriorty = cfo["@id"]["priority"];
      var idHeading = cfo["@id"]["heading"];
      if (idHeading) simpleConfigObj.taxonomyIdHeading = idHeading.trim();else simpleConfigObj.taxonomyIdHeading = "";
      simpleConfigObj.taxonomyNameLabel = cfo["http://purl.org/dc/terms/title"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
      simpleConfigObj.taxonomyNameDescription = cfo["http://purl.org/dc/terms/title"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
      var nameHeading = cfo["http://purl.org/dc/terms/title"]["heading"];
      if (nameHeading) simpleConfigObj.taxonomyNameHeading = nameHeading.trim();else simpleConfigObj.taxonomyNameHeading = "";
      simpleConfigObj.taxonomyDescLabel = cfo["http://purl.org/dc/terms/description"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
      simpleConfigObj.taxonomyDescDescription = cfo["http://purl.org/dc/terms/description"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
      simpleConfigObj.taxonomyDescPriority = cfo["http://purl.org/dc/terms/description"]["priority"];
      simpleConfigObj.taxonomyDescRequired = this.getBooleanValue(cfo["http://purl.org/dc/terms/description"]["isRequired"]);
      var descHeading = cfo["http://purl.org/dc/terms/description"]["heading"];
      if (descHeading) simpleConfigObj.taxonomyDescHeading = descHeading.trim();else simpleConfigObj.taxonomyDescHeading = "";
      simpleConfigObj.taxonomyCreatorLabel = cfo["http://purl.org/dc/terms/creator"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
      simpleConfigObj.taxonomyCreatorDescription = cfo["http://purl.org/dc/terms/creator"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
      simpleConfigObj.taxonomyCreatorPriority = cfo["http://purl.org/dc/terms/creator"]["priority"];
      simpleConfigObj.taxonomyCreatorRequired = this.getBooleanValue(cfo["http://purl.org/dc/terms/creator"]["isRequired"]);
      var creatorHeading = cfo["http://purl.org/dc/terms/creator"]["heading"];
      if (creatorHeading) simpleConfigObj.taxonomyCreatorHeading = creatorHeading.trim();else simpleConfigObj.taxonomyCreatorHeading = "";
      simpleConfigObj.taxonomyPublisherLabel = cfo["http://purl.org/dc/terms/publisher"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
      simpleConfigObj.taxonomyPublisherDescription = cfo["http://purl.org/dc/terms/publisher"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
      simpleConfigObj.taxonomyPublisherPriority = cfo["http://purl.org/dc/terms/publisher"]["priority"];
      simpleConfigObj.taxonomyPublisherRequired = this.getBooleanValue(cfo["http://purl.org/dc/terms/publisher"]["isRequired"]);
      var publisherHeading = cfo["http://purl.org/dc/terms/publisher"]["heading"];
      if (publisherHeading) simpleConfigObj.taxonomyPublisherHeading = publisherHeading.trim();else simpleConfigObj.taxonomyPublisherHeading = "";
      simpleConfigObj.taxonomyPubNameLabel = cfo["https://purl.org/ctdlasn/terms/publisherName"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
      simpleConfigObj.taxonomyPubNameDescription = cfo["https://purl.org/ctdlasn/terms/publisherName"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
      simpleConfigObj.taxonomyPubNamePriority = cfo["https://purl.org/ctdlasn/terms/publisherName"]["priority"];
      simpleConfigObj.taxonomyPubNameRequired = this.getBooleanValue(cfo["https://purl.org/ctdlasn/terms/publisherName"]["isRequired"]);
      var pubNameHeading = cfo["https://purl.org/ctdlasn/terms/publisherName"]["heading"];
      if (pubNameHeading) simpleConfigObj.taxonomyPubNameHeading = pubNameHeading.trim();else simpleConfigObj.taxonomyPubNameHeading = "";
      simpleConfigObj.taxonomyLangLabel = cfo["http://purl.org/dc/terms/language"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
      simpleConfigObj.taxonomyLangDescription = cfo["http://purl.org/dc/terms/language"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
      simpleConfigObj.taxonomyLangPriority = cfo["http://purl.org/dc/terms/language"]["priority"];
      simpleConfigObj.taxonomyLangRequired = this.getBooleanValue(cfo["http://purl.org/dc/terms/language"]["isRequired"]);
      var langHeading = cfo["http://purl.org/dc/terms/language"]["heading"];
      if (langHeading) simpleConfigObj.taxonomyLangHeading = langHeading.trim();else simpleConfigObj.taxonomyLangHeading = "";
      simpleConfigObj.taxonomySourceLabel = cfo["http://purl.org/dc/elements/1.1/source"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
      simpleConfigObj.taxonomySourceDescription = cfo["http://purl.org/dc/elements/1.1/source"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
      simpleConfigObj.taxonomySourcePriority = cfo["http://purl.org/dc/elements/1.1/source"]["priority"];
      simpleConfigObj.taxonomySourceRequired = this.getBooleanValue(cfo["http://purl.org/dc/elements/1.1/source"]["isRequired"]);
      var sourceHeading = cfo["http://purl.org/dc/elements/1.1/source"]["heading"];
      if (sourceHeading) simpleConfigObj.taxonomySourceHeading = sourceHeading.trim();else simpleConfigObj.taxonomySourceHeading = "";
      simpleConfigObj.taxonomyCustomProperties = [];
      var propertyKeys = Object.keys(cfo);
      for (var _i2 = 0, _propertyKeys2 = propertyKeys; _i2 < _propertyKeys2.length; _i2++) {
        var pk = _propertyKeys2[_i2];
        if (this.isCustomPropertyKey('taxonomy', pk)) {
          simpleConfigObj.taxonomyCustomProperties.push(this.generateSimpleCustomPropertyObject(cfo[pk]));
        }
      }
    },
    buildSimpleConfigObjectTaxonData: function buildSimpleConfigObjectTaxonData(simpleConfigObj, complexConfigObj) {
      var cfo = complexConfigObj["taxonConfig"];
      if (!cfo) {
        this.currentConfig = this.generateNewConfigObject();
        var obj = {};
        this.addTaxonConfigToObject(obj);
        cfo = obj.taxonConfig;
      }
      simpleConfigObj.taxonIdLabel = cfo["@id"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
      simpleConfigObj.taxonIdDescription = cfo["@id"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
      simpleConfigObj.taxonIdPriorty = cfo["@id"]["priority"];
      var idHeading = cfo["@id"]["heading"];
      if (idHeading) simpleConfigObj.taxonIdHeading = idHeading.trim();else simpleConfigObj.taxonIdHeading = "";
      simpleConfigObj.taxonNameLabel = cfo["http://www.w3.org/2004/02/skos/core#prefLabel"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
      simpleConfigObj.taxonNameDescription = cfo["http://www.w3.org/2004/02/skos/core#prefLabel"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
      var nameHeading = cfo["http://www.w3.org/2004/02/skos/core#prefLabel"]["heading"];
      if (nameHeading) simpleConfigObj.taxonNameHeading = nameHeading.trim();else simpleConfigObj.taxonoNameHeading = "";
      simpleConfigObj.taxonDescLabel = cfo["http://www.w3.org/2004/02/skos/core#definition"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
      simpleConfigObj.taxonDescDescription = cfo["http://www.w3.org/2004/02/skos/core#definition"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
      simpleConfigObj.taxonDescPriority = cfo["http://www.w3.org/2004/02/skos/core#definition"]["priority"];
      simpleConfigObj.taxonDescRequired = this.getBooleanValue(cfo["http://www.w3.org/2004/02/skos/core#definition"]["isRequired"]);
      var descHeading = cfo["http://www.w3.org/2004/02/skos/core#definition"]["heading"];
      if (descHeading) simpleConfigObj.taxonDescHeading = descHeading.trim();else simpleConfigObj.taxonDescHeading = "";
      simpleConfigObj.taxonNotationLabel = cfo["http://www.w3.org/2004/02/skos/core#notation"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
      simpleConfigObj.taxonNotationDescription = cfo["http://www.w3.org/2004/02/skos/core#notation"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
      simpleConfigObj.taxonNotationPriority = cfo["http://www.w3.org/2004/02/skos/core#notation"]["priority"];
      simpleConfigObj.taxonNotationRequired = this.getBooleanValue(cfo["http://www.w3.org/2004/02/skos/core#notation"]["isRequired"]);
      var notationHeading = cfo["http://www.w3.org/2004/02/skos/core#notation"]["heading"];
      if (notationHeading) simpleConfigObj.taxonNotationHeading = notationHeading.trim();else simpleConfigObj.taxonNotationHeading = "";
      simpleConfigObj.taxonAltLabelLabel = cfo["http://www.w3.org/2004/02/skos/core#altLabel"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
      simpleConfigObj.taxonAltLabelDescription = cfo["http://www.w3.org/2004/02/skos/core#altLabel"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
      simpleConfigObj.taxonAltLabelPriority = cfo["http://www.w3.org/2004/02/skos/core#altLabel"]["priority"];
      simpleConfigObj.taxonAltLabelRequired = this.getBooleanValue(cfo["http://www.w3.org/2004/02/skos/core#altLabel"]["isRequired"]);
      var altLabelHeading = cfo["http://www.w3.org/2004/02/skos/core#altLabel"]["heading"];
      if (altLabelHeading) simpleConfigObj.taxonAltLabelHeading = altLabelHeading.trim();else simpleConfigObj.taxonAltLabelHeading = "";
      simpleConfigObj.taxonHiddenLabelLabel = cfo["http://www.w3.org/2004/02/skos/core#hiddenLabel"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
      simpleConfigObj.taxonHiddenLabelDescription = cfo["http://www.w3.org/2004/02/skos/core#hiddenLabel"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
      simpleConfigObj.taxonHiddenLabelPriority = cfo["http://www.w3.org/2004/02/skos/core#hiddenLabel"]["priority"];
      simpleConfigObj.taxonHiddenLabelRequired = this.getBooleanValue(cfo["http://www.w3.org/2004/02/skos/core#hiddenLabel"]["isRequired"]);
      var hiddenLabelHeading = cfo["http://www.w3.org/2004/02/skos/core#hiddenLabel"]["heading"];
      if (hiddenLabelHeading) simpleConfigObj.taxonHiddenLabelHeading = hiddenLabelHeading.trim();else simpleConfigObj.taxonHiddenLabelHeading = "";
      simpleConfigObj.taxonNoteLabel = cfo["http://www.w3.org/2004/02/skos/core#note"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
      simpleConfigObj.taxonNoteDescription = cfo["http://www.w3.org/2004/02/skos/core#note"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
      simpleConfigObj.taxonNotePriority = cfo["http://www.w3.org/2004/02/skos/core#note"]["priority"];
      simpleConfigObj.taxonNoteRequired = this.getBooleanValue(cfo["http://www.w3.org/2004/02/skos/core#note"]["isRequired"]);
      var noteHeading = cfo["http://www.w3.org/2004/02/skos/core#note"]["heading"];
      if (noteHeading) simpleConfigObj.taxonNoteHeading = noteHeading.trim();else simpleConfigObj.taxonNoteHeading = "";
      simpleConfigObj.taxonBroaderLabel = cfo["http://www.w3.org/2004/02/skos/core#broader"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
      simpleConfigObj.taxonBroaderDescription = cfo["http://www.w3.org/2004/02/skos/core#broader"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
      simpleConfigObj.taxonBroaderPriority = cfo["http://www.w3.org/2004/02/skos/core#broader"]["priority"];
      simpleConfigObj.taxonBroaderRequired = this.getBooleanValue(cfo["http://www.w3.org/2004/02/skos/core#broader"]["isRequired"]);
      var broaderHeading = cfo["http://www.w3.org/2004/02/skos/core#broader"]["heading"];
      if (broaderHeading) simpleConfigObj.taxonBroaderHeading = broaderHeading.trim();else simpleConfigObj.taxonBroaderHeading = "";
      simpleConfigObj.taxonNarrowerLabel = cfo["http://www.w3.org/2004/02/skos/core#narrower"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
      simpleConfigObj.taxonNarrowerDescription = cfo["http://www.w3.org/2004/02/skos/core#narrower"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
      simpleConfigObj.taxonNarrowerPriority = cfo["http://www.w3.org/2004/02/skos/core#narrower"]["priority"];
      simpleConfigObj.taxonNarrowerRequired = this.getBooleanValue(cfo["http://www.w3.org/2004/02/skos/core#narrower"]["isRequired"]);
      var narrowerHeading = cfo["http://www.w3.org/2004/02/skos/core#narrower"]["heading"];
      if (narrowerHeading) simpleConfigObj.taxonNarrowerHeading = narrowerHeading.trim();else simpleConfigObj.taxonNarrowerHeading = "";
      simpleConfigObj.taxonBroadMatchLabel = cfo["http://www.w3.org/2004/02/skos/core#broadMatch"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
      simpleConfigObj.taxonBroadMatchDescription = cfo["http://www.w3.org/2004/02/skos/core#broadMatch"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
      simpleConfigObj.taxonBroadMatchPriority = cfo["http://www.w3.org/2004/02/skos/core#broadMatch"]["priority"];
      simpleConfigObj.taxonBroadMatchRequired = this.getBooleanValue(cfo["http://www.w3.org/2004/02/skos/core#broadMatch"]["isRequired"]);
      var broadMatchHeading = cfo["http://www.w3.org/2004/02/skos/core#broadMatch"]["heading"];
      if (broadMatchHeading) simpleConfigObj.taxonBroadMatchHeading = broadMatchHeading.trim();else simpleConfigObj.taxonBroadMatchHeading = "";
      simpleConfigObj.taxonCloseMatchLabel = cfo["http://www.w3.org/2004/02/skos/core#closeMatch"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
      simpleConfigObj.taxonCloseMatchDescription = cfo["http://www.w3.org/2004/02/skos/core#closeMatch"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
      simpleConfigObj.taxonCloseMatchPriority = cfo["http://www.w3.org/2004/02/skos/core#closeMatch"]["priority"];
      simpleConfigObj.taxonCloseMatchRequired = this.getBooleanValue(cfo["http://www.w3.org/2004/02/skos/core#closeMatch"]["isRequired"]);
      var closeMatchHeading = cfo["http://www.w3.org/2004/02/skos/core#closeMatch"]["heading"];
      if (closeMatchHeading) simpleConfigObj.taxonCloseMatchHeading = closeMatchHeading.trim();else simpleConfigObj.taxonCloseMatchHeading = "";
      simpleConfigObj.taxonExactMatchLabel = cfo["http://www.w3.org/2004/02/skos/core#exactMatch"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
      simpleConfigObj.taxonExactMatchDescription = cfo["http://www.w3.org/2004/02/skos/core#exactMatch"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
      simpleConfigObj.taxonExactMatchPriority = cfo["http://www.w3.org/2004/02/skos/core#exactMatch"]["priority"];
      simpleConfigObj.taxonExactMatchRequired = this.getBooleanValue(cfo["http://www.w3.org/2004/02/skos/core#exactMatch"]["isRequired"]);
      var exactMatchHeading = cfo["http://www.w3.org/2004/02/skos/core#exactMatch"]["heading"];
      if (exactMatchHeading) simpleConfigObj.taxonExactMatchHeading = exactMatchHeading.trim();else simpleConfigObj.taxonExactMatchHeading = "";
      simpleConfigObj.taxonNarrowMatchLabel = cfo["http://www.w3.org/2004/02/skos/core#narrowMatch"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
      simpleConfigObj.taxonNarrowMatchDescription = cfo["http://www.w3.org/2004/02/skos/core#narrowMatch"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
      simpleConfigObj.taxonNarrowMatchPriority = cfo["http://www.w3.org/2004/02/skos/core#narrowMatch"]["priority"];
      simpleConfigObj.taxonNarrowMatchRequired = this.getBooleanValue(cfo["http://www.w3.org/2004/02/skos/core#narrowMatch"]["isRequired"]);
      var narrowMatchHeading = cfo["http://www.w3.org/2004/02/skos/core#narrowMatch"]["heading"];
      if (narrowMatchHeading) simpleConfigObj.taxonNarrowMatchHeading = narrowMatchHeading.trim();else simpleConfigObj.taxonNarrowMatchHeading = "";
      simpleConfigObj.taxonRelatedLabel = cfo["http://www.w3.org/2004/02/skos/core#related"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
      simpleConfigObj.taxonRelatedDescription = cfo["http://www.w3.org/2004/02/skos/core#related"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
      simpleConfigObj.taxonRelatedPriority = cfo["http://www.w3.org/2004/02/skos/core#related"]["priority"];
      simpleConfigObj.taxonRelatedRequired = this.getBooleanValue(cfo["http://www.w3.org/2004/02/skos/core#related"]["isRequired"]);
      var relatedHeading = cfo["http://www.w3.org/2004/02/skos/core#related"]["heading"];
      if (relatedHeading) simpleConfigObj.taxonRelatedHeading = relatedHeading.trim();else simpleConfigObj.taxonRelatedHeading = "";
      simpleConfigObj.taxonCustomProperties = [];
      var propertyKeys = Object.keys(cfo);
      for (var _i3 = 0, _propertyKeys3 = propertyKeys; _i3 < _propertyKeys3.length; _i3++) {
        var pk = _propertyKeys3[_i3];
        if (this.isCustomPropertyKey('taxon', pk)) {
          simpleConfigObj.taxonCustomProperties.push(this.generateSimpleCustomPropertyObject(cfo[pk]));
        }
      }
    },
    buildSimpleConfigObjectCompetencyData: function buildSimpleConfigObjectCompetencyData(simpleConfigObj, complexConfigObj) {
      var cco = complexConfigObj["competencyConfig"];
      var relHeading = cco["relationshipsHeading"];
      if (relHeading) simpleConfigObj.relationshipsHeading = relHeading.trim();else simpleConfigObj.relationshipsHeading = "";
      var relPriority = cco["relationshipsPriority"];
      if (relPriority) simpleConfigObj.relationshipsPriority = relPriority;else simpleConfigObj.relationshipsPriority = "tertiary";
      simpleConfigObj.compIdLabel = cco["@id"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
      simpleConfigObj.compIdDescription = cco["@id"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
      simpleConfigObj.compIdPriorty = cco["@id"]["priority"];
      var idHeading = cco["@id"]["heading"];
      if (idHeading) simpleConfigObj.compIdHeading = idHeading.trim();else simpleConfigObj.compIdHeading = "";
      simpleConfigObj.compNameLabel = cco["http://schema.org/name"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
      simpleConfigObj.compNameDescription = cco["http://schema.org/name"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
      var nameHeading = cco["http://schema.org/name"]["heading"];
      if (nameHeading) simpleConfigObj.compNameHeading = nameHeading.trim();else simpleConfigObj.compNameHeading = "";
      simpleConfigObj.compDescLabel = cco["http://schema.org/description"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
      simpleConfigObj.compDescDescription = cco["http://schema.org/description"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
      simpleConfigObj.compDescPriority = cco["http://schema.org/description"]["priority"];
      simpleConfigObj.compDescRequired = this.getBooleanValue(cco["http://schema.org/description"]["isRequired"]);
      var descHeading = cco["http://schema.org/description"]["heading"];
      if (descHeading) simpleConfigObj.compDescHeading = descHeading.trim();else simpleConfigObj.compDescHeading = "";
      var ccto = cco["http://purl.org/dc/terms/type"];
      simpleConfigObj.compTypeLabel = ccto["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
      simpleConfigObj.compTypeDescription = ccto["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
      simpleConfigObj.compTypePriority = ccto["priority"];
      if (ccto["heading"]) simpleConfigObj.compTypeHeading = ccto["heading"];else simpleConfigObj.compTypeHeading = "";
      simpleConfigObj.compTypeRequired = this.getBooleanValue(ccto["isRequired"]);
      simpleConfigObj.compEnforceTypes = false;
      simpleConfigObj.compEnforcedTypes = [];
      if (ccto.options && ccto.options.length > 0) {
        simpleConfigObj.compEnforceTypes = true;
        var _iterator5 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"])(ccto.options),
          _step5;
        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var et = _step5.value;
            var eto = {};
            eto.display = et.display;
            eto.value = et.val;
            simpleConfigObj.compEnforcedTypes.push(eto);
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      }
      if (cco["https://schema.cassproject.org/0.4/classification"] != null) {
        simpleConfigObj.compClassLabel = cco["https://schema.cassproject.org/0.4/classification"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
        simpleConfigObj.compClassDescription = cco["https://schema.cassproject.org/0.4/classification"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
        simpleConfigObj.compClassPriority = cco["https://schema.cassproject.org/0.4/classification"]["priority"];
        simpleConfigObj.compClassRequired = this.getBooleanValue(cco["https://schema.cassproject.org/0.4/classification"]["isRequired"]);
        var classHeading = cco["https://schema.cassproject.org/0.4/classification"]["heading"];
        if (classHeading) simpleConfigObj.compClassHeading = classHeading.trim();else simpleConfigObj.compClassHeading = "";
      }
      if (cco["https://schema.cassproject.org/0.4/markings"] != null) {
        simpleConfigObj.compMarkingsLabel = cco["https://schema.cassproject.org/0.4/markings"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
        simpleConfigObj.compMarkingsDescription = cco["https://schema.cassproject.org/0.4/markings"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
        simpleConfigObj.compMarkingsPriority = cco["https://schema.cassproject.org/0.4/markings"]["priority"];
        simpleConfigObj.compMarkingsRequired = this.getBooleanValue(cco["https://schema.cassproject.org/0.4/markings"]["isRequired"]);
        var markingsHeading = cco["https://schema.cassproject.org/0.4/markings"]["heading"];
        if (markingsHeading) simpleConfigObj.compMarkingsHeading = markingsHeading.trim();else simpleConfigObj.compMarkingsHeading = "";
      }
      simpleConfigObj.compCustomProperties = [];
      var propertyKeys = Object.keys(cco);
      for (var _i4 = 0, _propertyKeys4 = propertyKeys; _i4 < _propertyKeys4.length; _i4++) {
        var pk = _propertyKeys4[_i4];
        if (this.isCustomPropertyKey('competency', pk)) {
          simpleConfigObj.compCustomProperties.push(this.generateSimpleCustomPropertyObject(cco[pk]));
        }
      }
    },
    buildSimpleConfigObjectLevelData: function buildSimpleConfigObjectLevelData(simpleConfigObj, complexConfigObj) {
      simpleConfigObj.compAllowLevels = false;
      simpleConfigObj.levelLabel = '';
      simpleConfigObj.levelDescription = '';
      simpleConfigObj.enforceLevelValues = false;
      simpleConfigObj.enforcedLevelValues = [];
      simpleConfigObj.levelPriority = 'secondary';
      simpleConfigObj.levelHeading = '';
      if (complexConfigObj["levelsConfig"] && complexConfigObj["levelsConfig"]["https://schema.cassproject.org/0.4/Level"]) {
        var lo = complexConfigObj["levelsConfig"]["https://schema.cassproject.org/0.4/Level"];
        simpleConfigObj.compAllowLevels = true;
        if (lo["priority"]) simpleConfigObj.levelPriority = lo["priority"];else simpleConfigObj.levelPriority = "secondary";
        if (lo["heading"]) simpleConfigObj.levelHeading = lo["heading"];else simpleConfigObj.levelHeading = "";
        simpleConfigObj.levelLabel = lo["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
        simpleConfigObj.levelDescription = lo["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
        if (complexConfigObj["levelsConfig"]["https://schema.cassproject.org/0.4/Level"]["options"]) {
          var complexLevelsEnforced = complexConfigObj["levelsConfig"]["https://schema.cassproject.org/0.4/Level"]["options"];
          if (complexLevelsEnforced.length > 0) {
            simpleConfigObj.enforceLevelValues = true;
            var _iterator6 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"])(complexLevelsEnforced),
              _step6;
            try {
              for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                var cLvl = _step6.value;
                simpleConfigObj.enforcedLevelValues.push(cLvl["val"]);
              }
            } catch (err) {
              _iterator6.e(err);
            } finally {
              _iterator6.f();
            }
          }
        }
      }
    },
    buildSimpleRelationshipConfigObject: function buildSimpleRelationshipConfigObject(simpleConfigObj, complexRelationshipObj, relationshipName, defaultLabel) {
      simpleConfigObj.relationships[relationshipName] = {};
      if (complexRelationshipObj[relationshipName]) {
        simpleConfigObj.relationships[relationshipName].label = complexRelationshipObj[relationshipName]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
        simpleConfigObj.relationships[relationshipName].enabled = true;
      } else {
        simpleConfigObj.relationships[relationshipName].label = defaultLabel;
        simpleConfigObj.relationships[relationshipName].enabled = false;
      }
    },
    buildSimpleConfigObjectRelationshipData: function buildSimpleConfigObjectRelationshipData(simpleConfigObj, complexConfigObj) {
      var cro = complexConfigObj["relationshipConfig"];
      simpleConfigObj.relationships = {};
      this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "isEnabledBy", "is enabled by");
      this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "requires", "requires");
      this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "desires", "desires");
      this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "narrows", "narrows");
      this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "isRelatedTo", "is related to");
      this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "isEquivalentTo", "is equivalent to");
      this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "broadens", "broadens");
      this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "majorRelated", "is majorly related to");
      this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "minorRelated", "is minorly related to");
      this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "isSimilarTo", "is similar to");
      this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "isPartiallySameAs", "is partially the same as");
      this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "enables", "enables");
      this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "hasChild", "has child");
      this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "isChildOf", "is child of");
    },
    buildSimpleConfigObjectAlignmentData: function buildSimpleConfigObjectAlignmentData(simpleConfigObj, complexConfigObj) {
      var caa = complexConfigObj["alignConfig"];
      simpleConfigObj.alignments = {};
      simpleConfigObj.alignments.teaches = caa.includes("teaches");
      simpleConfigObj.alignments.assesses = caa.includes("assesses");
      simpleConfigObj.alignments.requires = caa.includes("requires");
      simpleConfigObj.alignments.desires = caa.includes("desires");
    },
    buildSimpleConfigDefaultPermissionData: function buildSimpleConfigDefaultPermissionData(simpleConfigObj, complexConfigObj) {
      if (complexConfigObj["defaultObjectOwners"]) {
        simpleConfigObj.defaultOwners = complexConfigObj["defaultObjectOwners"];
      } else simpleConfigObj.defaultOwners = [];
      if (complexConfigObj["defaultObjectReaders"]) {
        simpleConfigObj.defaultReaders = complexConfigObj["defaultObjectReaders"];
      } else simpleConfigObj.defaultReaders = [];
      if (complexConfigObj["defaultCommenters"]) {
        simpleConfigObj.defaultCommenters = complexConfigObj["defaultCommenters"];
      } else simpleConfigObj.defaultCommenters = [];
    },
    generateSimpleConfigObject: function generateSimpleConfigObject(cco) {
      var simpleConfigObj = {};
      simpleConfigObj.id = cco.shortId();
      if (this.isObjectOwnerless(cco) || this.doesAnyIdentityOwnObject(cco)) simpleConfigObj.isOwned = true;else simpleConfigObj.isOwned = false;
      simpleConfigObj.isNew = false;
      simpleConfigObj.name = cco.getName();
      simpleConfigObj.description = cco.getDescription();
      simpleConfigObj.isDefault = this.getBooleanValue(cco.isDefault);
      if (simpleConfigObj.isDefault) this.defaultConfigId = simpleConfigObj.id;
      this.buildSimpleConfigObjectFrameworkData(simpleConfigObj, cco);
      this.buildSimpleConfigObjectTaxonomyData(simpleConfigObj, cco);
      this.buildSimpleConfigObjectTaxonData(simpleConfigObj, cco);
      this.buildSimpleConfigObjectCompetencyData(simpleConfigObj, cco);
      this.buildSimpleConfigObjectLevelData(simpleConfigObj, cco);
      this.buildSimpleConfigObjectRelationshipData(simpleConfigObj, cco);
      this.buildSimpleConfigObjectAlignmentData(simpleConfigObj, cco);
      this.buildSimpleConfigDefaultPermissionData(simpleConfigObj, cco);
      return simpleConfigObj;
    },
    generateCustomPropertyAvailableConcepts: function generateCustomPropertyAvailableConcepts() {
      var _this = this;
      repo.searchWithParams('@type:ConceptScheme', {
        size: 10000
      }, null, null, null, null).then(function (results) {
        var concepts = [];
        for (var concept = 0; concept < results.length; concept++) {
          concepts.push({
            display: EcRemoteLinkedData.getDisplayStringFrom(results[concept]["dcterms:title"]),
            value: results[concept].id
          });
        }
        _this.$store.commit('configuration/setAvailableConcepts', concepts);
      }).catch(function (err) {
        appLog("failed to retrieve concepts: " + err);
      });
    },
    generateCustomPropertyAvailableTypes: function generateCustomPropertyAvailableTypes() {
      var types = [];
      this.configList.forEach(function (config) {
        if (config.compEnforceTypes) {
          types.push.apply(types, Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"])(config.compEnforcedTypes));
        }
      });
      this.$store.commit('configuration/setAvailableTypes', types);
    },
    searchRepositoryForConfigsSuccess: function searchRepositoryForConfigsSuccess(ecRemoteLda) {
      appLog("Config search success: ");
      appLog(ecRemoteLda);
      this.configList = [];
      var _iterator7 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"])(ecRemoteLda),
        _step7;
      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var ecrld = _step7.value;
          var t = new schema.Thing();
          t.copyFrom(ecrld);
          this.configList.push(this.generateSimpleConfigObject(t));
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
      this.sortConfigList();
      this.generateCustomPropertyAvailableConcepts();
      this.generateCustomPropertyAvailableTypes();
      this.configBusy = false;
    },
    searchRepositoryForConfigsFailure: function searchRepositoryForConfigsFailure(msg) {
      appLog("Config search failure: " + msg);
      this.configBusy = false;
    },
    buildConfigListFromRepository: function buildConfigListFromRepository() {
      var paramObj = {};
      paramObj.size = this.buildConfigListFromRepository_SIZE;
      window.repo.searchWithParams("@type:Configuration", paramObj, null, this.searchRepositoryForConfigsSuccess, this.searchRepositoryForConfigsFailure);
    },
    buildConfigList: function buildConfigList() {
      this.configBusy = true;
      this.complexConfigObject = {};
      this.buildConfigListFromRepository();
    },
    setConfigAsBrowserDefault: function setConfigAsBrowserDefault(configId) {
      var bdc = this.getConfigById(configId);
      this.setDefaultBrowserConfigId(configId);
      this.defaultBrowserConfigName = bdc.name;
      this.$store.commit('configuration/setLocalDefaultBrowserConfig', configId);
      this.$store.commit('configuration/setShowBrowserConfigSetModal', true);
    },
    removeConfigAsBrowserDefault: function removeConfigAsBrowserDefault(configId) {
      this.removeDefaultBrowserConfig();
      this.$store.commit('configuration/setDefaultBrowserConfigName', '');
      this.$store.commit('configuration/setLocalDefaultBrowserConfig', '');
      this.$store.commit('configuration/setShowBrowserConfigSetModal', false);
    },
    generateNewConfigObject: function generateNewConfigObject() {
      var newConfigObj = {};
      newConfigObj.id = "newConfigId";
      newConfigObj.isOwned = true;
      newConfigObj.isNew = true;
      newConfigObj.name = "New Configuration";
      newConfigObj.description = "New configuration";
      newConfigObj.isDefault = false;
      newConfigObj.fwkIdLabel = "Framework ID";
      newConfigObj.fwkIdDescription = "ID of the framework";
      newConfigObj.fwkIdPriorty = "primary";
      newConfigObj.fwkIdHeading = "";
      newConfigObj.fwkNameLabel = "Framework Name";
      newConfigObj.fwkNameDescription = "Name of the framework";
      newConfigObj.fwkNameHeading = "";
      newConfigObj.fwkDescLabel = "Framework Description";
      newConfigObj.fwkDescDescription = "Description of the framework";
      newConfigObj.fwkDescPriority = "primary";
      newConfigObj.fwkDescRequired = true;
      newConfigObj.fwkDescHeading = "";
      newConfigObj.fwkClassLabel = "Classification";
      newConfigObj.fwkClassDescription = "Classification of the framework";
      newConfigObj.fwkClassPriority = "primary";
      newConfigObj.fwkClassRequired = false;
      newConfigObj.fwkClassHeading = "";
      newConfigObj.fwkMarkingsLabel = "Markings";
      newConfigObj.fwkMarkingsDescription = "Markings of the framework";
      newConfigObj.fwkMarkingsPriority = "primary";
      newConfigObj.fwkMarkingsRequired = false;
      newConfigObj.fwkMarkingsHeading = "";
      newConfigObj.compAllowLevels = true;
      newConfigObj.levelLabel = 'Level';
      newConfigObj.levelDescription = 'Level of the competency';
      newConfigObj.enforceLevelValues = false;
      newConfigObj.enforcedLevelValues = [];
      newConfigObj.levelPriority = 'secondary';
      newConfigObj.levelHeading = "";
      newConfigObj.compIdLabel = "Competency ID";
      newConfigObj.compIdDescription = "ID of the competency";
      newConfigObj.compIdPriorty = "primary";
      newConfigObj.compIdHeading = "";
      newConfigObj.compNameLabel = "Competency Name";
      newConfigObj.compNameDescription = "Name of the competency";
      newConfigObj.compNameHeading = "";
      newConfigObj.compDescLabel = "Competency Description";
      newConfigObj.compDescDescription = "Description of the competency";
      newConfigObj.compDescPriority = "primary";
      newConfigObj.compDescRequired = false;
      newConfigObj.compDescHeading = "";
      newConfigObj.compTypeLabel = "Competency Type";
      newConfigObj.compTypeDescription = "Type of the competency";
      newConfigObj.compTypePriority = "secondary";
      newConfigObj.compTypeRequired = false;
      newConfigObj.compTypeHeading = "";
      newConfigObj.compClassLabel = "Classification";
      newConfigObj.compClassDescription = "Classification of the competency";
      newConfigObj.compClassPriority = "primary";
      newConfigObj.compClassRequired = false;
      newConfigObj.compClassHeading = "";
      newConfigObj.compMarkingsLabel = "Markings";
      newConfigObj.compMarkingsDescription = "Markings of the competency";
      newConfigObj.compMarkingsPriority = "primary";
      newConfigObj.compMarkingsRequired = false;
      newConfigObj.compMarkingsHeading = "";
      newConfigObj.compEnforceTypes = false;
      newConfigObj.compEnforcedTypes = [];
      newConfigObj.fwkCustomProperties = [];
      newConfigObj.compCustomProperties = [];
      newConfigObj.relationshipsHeading = '';
      newConfigObj.relationshipsPriority = "tertiary";
      newConfigObj.relationships = {};
      newConfigObj.relationships.isEnabledBy = {};
      newConfigObj.relationships.isEnabledBy.label = 'is enabled by';
      newConfigObj.relationships.isEnabledBy.enabled = true;
      newConfigObj.relationships.requires = {};
      newConfigObj.relationships.requires.label = 'requires';
      newConfigObj.relationships.requires.enabled = true;
      newConfigObj.relationships.desires = {};
      newConfigObj.relationships.desires.label = 'desires';
      newConfigObj.relationships.desires.enabled = true;
      newConfigObj.relationships.narrows = {};
      newConfigObj.relationships.narrows.label = 'narrows';
      newConfigObj.relationships.narrows.enabled = true;
      newConfigObj.relationships.isRelatedTo = {};
      newConfigObj.relationships.isRelatedTo.label = 'is related to';
      newConfigObj.relationships.isRelatedTo.enabled = true;
      newConfigObj.relationships.isEquivalentTo = {};
      newConfigObj.relationships.isEquivalentTo.label = 'is equivalent to';
      newConfigObj.relationships.isEquivalentTo.enabled = true;
      newConfigObj.relationships.broadens = {};
      newConfigObj.relationships.broadens.label = 'broadens';
      newConfigObj.relationships.broadens.enabled = false;
      newConfigObj.relationships.majorRelated = {};
      newConfigObj.relationships.majorRelated.label = 'is majorly related to';
      newConfigObj.relationships.majorRelated.enabled = false;
      newConfigObj.relationships.minorRelated = {};
      newConfigObj.relationships.minorRelated.label = 'is minorly related to';
      newConfigObj.relationships.minorRelated.enabled = false;
      newConfigObj.relationships.isSimilarTo = {};
      newConfigObj.relationships.isSimilarTo.label = 'is similar to';
      newConfigObj.relationships.isSimilarTo.enabled = false;
      newConfigObj.relationships.isPartiallySameAs = {};
      newConfigObj.relationships.isPartiallySameAs.label = 'is partially the same as';
      newConfigObj.relationships.isPartiallySameAs.enabled = false;
      newConfigObj.relationships.enables = {};
      newConfigObj.relationships.enables.label = 'enables';
      newConfigObj.relationships.enables.enabled = false;
      newConfigObj.relationships.hasChild = {};
      newConfigObj.relationships.hasChild.label = 'has child';
      newConfigObj.relationships.hasChild.enabled = false;
      newConfigObj.relationships.isChildOf = {};
      newConfigObj.relationships.isChildOf.label = 'is child of';
      newConfigObj.relationships.isChildOf.enabled = false;
      newConfigObj.alignments = {};
      newConfigObj.alignments.teaches = true;
      newConfigObj.alignments.assesses = true;
      newConfigObj.alignments.requires = true;
      newConfigObj.alignments.desires = true;
      newConfigObj.defaultOwners = [];
      newConfigObj.defaultReaders = [];
      newConfigObj.defaultCommenters = [];
      newConfigObj.taxonomyIdLabel = "Canonical URL";
      newConfigObj.taxonomyIdDescription = "The URL of the concept scheme. If imported from another source, the URL of the concept scheme from which this one originates.";
      newConfigObj.taxonomyIdPriorty = "primary";
      newConfigObj.taxonomyIdHeading = "Keys";
      newConfigObj.taxonomyNameLabel = "Title";
      newConfigObj.taxonomyNameDescription = "The name or title of this resource.";
      newConfigObj.taxonomyNameHeading = "General";
      newConfigObj.taxonomyNamePriority = "primary";
      newConfigObj.taxonomyDescLabel = "Description";
      newConfigObj.taxonomyDescDescription = "A short description of this resource. One definition per language";
      newConfigObj.taxonomyDescPriority = "primary";
      newConfigObj.taxonomyDescRequired = false;
      newConfigObj.taxonomyDescHeading = "General";
      newConfigObj.taxonomyCreatorLabel = "Creator";
      newConfigObj.taxonomyCreatorDescription = "An entity primarily responsible for making this resource. For example, https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/. One entity per line.";
      newConfigObj.taxonomyCreatorHeading = "General";
      newConfigObj.taxonomyCreatorPriority = "secondary";
      newConfigObj.taxonomyPublisherLabel = "Publisher";
      newConfigObj.taxonomyPublisherDescription = "An agent responsible for making this entity available. For example, https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/.";
      newConfigObj.taxonomyPublisherHeading = "General";
      newConfigObj.taxonomyPublisherPriority = "secondary";
      newConfigObj.taxonomyPubNameLabel = "Publisher Name";
      newConfigObj.taxonomyPubNameDescription = "Name of an agent responsible for making this resource available. One name per line.";
      newConfigObj.taxonomyPubNameHeading = "General";
      newConfigObj.taxonomyPubNamePriority = "secondary";
      newConfigObj.taxonomyLangLabel = "Language";
      newConfigObj.taxonomyLangDescription = "The primary language used in or by this resource. One language per line.";
      newConfigObj.taxonomyLangHeading = "General";
      newConfigObj.taxonomyLangPriority = "secondary";
      newConfigObj.taxonomySourceLabel = "Source";
      newConfigObj.taxonomySourceDescription = "A URI to the original resource which this resource is based on or derived from. For example: https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/.";
      newConfigObj.taxonomySourceHeading = "General";
      newConfigObj.taxonomySourcePriority = "secondary";
      newConfigObj.taxonomyCustomProperties = [];
      newConfigObj.taxonIdLabel = "Canonical URL";
      newConfigObj.taxonIdDescription = "The URL of the concept. If imported from another source, the URL of the concept from which this one originates.";
      newConfigObj.taxonIdPriorty = "primary";
      newConfigObj.taxonIdHeading = "Keys";
      newConfigObj.taxonNameLabel = "Preferred Label";
      newConfigObj.taxonNameDescription = "Preferred language-tagged label representing this concept. One label per language.";
      newConfigObj.taxonNameHeading = "General";
      newConfigObj.taxonomyNamePriority = "primary";
      newConfigObj.taxonDescLabel = "Definition";
      newConfigObj.taxonDescDescription = "Supplies a complete explanation of the intended meaning of a concept. One definition per language.";
      newConfigObj.taxonDescPriority = "primary";
      newConfigObj.taxonDescHeading = "General";
      newConfigObj.taxonNotationLabel = "Notation";
      newConfigObj.taxonNotationDescription = "Alphanumeric notation or ID code as defined by the promulgating body to identify this resource.";
      newConfigObj.taxonNotationHeading = "General";
      newConfigObj.taxonNotationPriority = "secondary";
      newConfigObj.taxonAltLabelLabel = "Alternative Label";
      newConfigObj.taxonAltLabelDescription = "Non-preferred label for the concept used to relate a concept synonym to the preferred label.";
      newConfigObj.taxonAltLabelHeading = "Other Labels";
      newConfigObj.taxonAltLabelPriority = "secondary";
      newConfigObj.taxonHiddenLabelLabel = "Hidden Label";
      newConfigObj.taxonHiddenLabelDescription = "Label not intended for public presentation but to assist applications in disambiguating searcher intent - e.g., hidden labels can be used for common misspelling or a colloquial expression.";
      newConfigObj.taxonHiddenLabelHeading = "Other Labels";
      newConfigObj.taxonHiddenLabelPriority = "tertiary";
      newConfigObj.taxonNoteLabel = "Note";
      newConfigObj.taxonNoteDescription = "Annotations to the concept for purposes of general documentation.";
      newConfigObj.taxonNoteHeading = "Documentation";
      newConfigObj.taxonNotePriority = "secondary";
      newConfigObj.taxonBroaderLabel = "Broader";
      newConfigObj.taxonBroaderDescription = "Concept that is broader in some way than this concept.";
      newConfigObj.taxonBroaderHeading = "Connections";
      newConfigObj.taxonBroaderPriority = "tertiary";
      newConfigObj.taxonNarrowerLabel = "Narrower";
      newConfigObj.taxonNarrowerDescription = "Concept that is narrower in some way than this concept.";
      newConfigObj.taxonNarrowerHeading = "Connections";
      newConfigObj.taxonNarrowerPriority = "tertiary";
      newConfigObj.taxonBroadMatchLabel = "Broad Match";
      newConfigObj.taxonBroadMatchDescription = "Assertion indicates that the referenced concept is broader in some way than this concept.";
      newConfigObj.taxonBroadMatchHeading = "Connections";
      newConfigObj.taxonBroadMatchPriority = "tertiary";
      newConfigObj.taxonCloseMatchLabel = "Close Match";
      newConfigObj.taxonCloseMatchDescription = "Assertion indicates that two concepts are sufficiently similar that they can be used interchangeably.";
      newConfigObj.taxonCloseMatchHeading = "Connections";
      newConfigObj.taxonCloseMatchPriority = "tertiary";
      newConfigObj.taxonExactMatchLabel = "Exact Match";
      newConfigObj.taxonExactMatchDescription = "Indicates semantic similarity denoting an even higher degree of closeness than Close Match.";
      newConfigObj.taxonExactMatchHeading = "Connections";
      newConfigObj.taxonExactMatchPriority = "tertiary";
      newConfigObj.taxonNarrowMatchLabel = "Narrow Match";
      newConfigObj.taxonNarrowMatchDescription = "Assertion indicates that the referenced concept is narrower in some way than this concept.";
      newConfigObj.taxonNarrowMatchHeading = "Connections";
      newConfigObj.taxonNarrowMatchPriority = "tertiary";
      newConfigObj.taxonRelatedLabel = "Related";
      newConfigObj.taxonRelatedDescription = "URL of an associatively related concept.";
      newConfigObj.taxonRelatedHeading = "Connections";
      newConfigObj.taxonRelatedPriority = "tertiary";
      newConfigObj.taxonCustomProperties = [];
      return newConfigObj;
    },
    addCustomPropertiesToPriorityArray: function addCustomPropertiesToPriorityArray(customProperties, priorityArray, priority) {
      if (customProperties != null) {
        var _iterator8 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"])(customProperties),
          _step8;
        try {
          for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
            var prop = _step8.value;
            if (prop.priority.equalsIgnoreCase(priority)) {
              priorityArray.push(this.generateCustomPropertyNameId(prop));
            }
          }
        } catch (err) {
          _iterator8.e(err);
        } finally {
          _iterator8.f();
        }
      }
    },
    addCustomPropertiesToHeadingsObj: function addCustomPropertiesToHeadingsObj(customProperties, headingsObj) {
      if (customProperties != null) {
        var _iterator9 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"])(customProperties),
          _step9;
        try {
          for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
            var prop = _step9.value;
            if (prop.heading && !prop.heading.trim().equals('')) {
              headingsObj[prop.heading.trim()] = 'x';
            }
          }
        } catch (err) {
          _iterator9.e(err);
        } finally {
          _iterator9.f();
        }
      }
    },
    generatePropertyConfigObject: function generatePropertyConfigObject(id, domain, range, description, label, priority, required, readOnly, noTextEditing, isDirectLink, permittedValues, permittedConcepts, permittedTypes, heading, allowMultiples, onePerLanguage) {
      var propObj = {};
      propObj["@id"] = id;
      propObj["@type"] = "http://www.w3.org/2000/01/rdf-schema#Property";
      propObj["http://schema.org/domainIncludes"] = [];
      var domainObj = {};
      domainObj["@id"] = domain.trim();
      propObj["http://schema.org/domainIncludes"].push(domainObj);
      propObj["http://schema.org/rangeIncludes"] = [];
      var rangeObj = {};
      rangeObj["@id"] = range.trim();
      propObj["http://schema.org/rangeIncludes"].push(rangeObj);
      propObj["http://www.w3.org/2000/01/rdf-schema#comment"] = [];
      var commentObj = {};
      commentObj["@language"] = "en";
      commentObj["@value"] = description.trim();
      propObj["http://www.w3.org/2000/01/rdf-schema#comment"].push(commentObj);
      propObj["http://www.w3.org/2000/01/rdf-schema#label"] = [];
      var labelObj = {};
      labelObj["@language"] = "en";
      labelObj["@value"] = label.trim();
      propObj["http://www.w3.org/2000/01/rdf-schema#label"].push(labelObj);
      propObj.priority = priority;
      propObj.isRequired = required;
      propObj.readOnly = readOnly;
      propObj.noTextEditing = noTextEditing;
      propObj.isDirectLink = isDirectLink;
      if (!allowMultiples) propObj.max = 1;
      if (range.equalsIgnoreCase(this.LANG_STRING_RANGE)) propObj.onePerLanguage = onePerLanguage;
      if (permittedValues && permittedValues.length > 0) {
        propObj.options = [];
        var _iterator10 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"])(permittedValues),
          _step10;
        try {
          for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
            var pv = _step10.value;
            var option = {};
            option.display = pv.display.trim();
            option.val = pv.value.trim();
            propObj.options.push(option);
          }
        } catch (err) {
          _iterator10.e(err);
        } finally {
          _iterator10.f();
        }
      } else if (permittedConcepts && permittedConcepts.length > 0) {
        propObj.options = [];
        var _iterator11 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"])(permittedConcepts),
          _step11;
        try {
          for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
            var _pv3 = _step11.value;
            var _option = {};
            _option.display = _pv3.display.trim();
            _option.val = _pv3.value.trim();
            propObj.options.push(_option);
          }
        } catch (err) {
          _iterator11.e(err);
        } finally {
          _iterator11.f();
        }
      } else if (permittedTypes && permittedTypes.length > 0) {
        propObj.options = [];
        var _iterator12 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"])(permittedTypes),
          _step12;
        try {
          for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
            var _pv4 = _step12.value;
            var _option2 = {};
            _option2.display = _pv4.display.trim();
            _option2.val = _pv4.value.trim();
            propObj.options.push(_option2);
          }
        } catch (err) {
          _iterator12.e(err);
        } finally {
          _iterator12.f();
        }
      }
      if (heading && !heading.trim().equals('')) propObj.heading = heading.trim();else if (this.enforceHeadings) propObj.heading = this.DEFAULT_HEADING;
      return propObj;
    },
    buildCustomPropertiesConfigObjects: function buildCustomPropertiesConfigObjects(parentConf, domain, customProperties) {
      if (customProperties != null) {
        var _iterator13 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"])(customProperties),
          _step13;
        try {
          for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
            var prop = _step13.value;
            var id = this.generateCustomPropertyNameId(prop);
            parentConf[id] = this.generatePropertyConfigObject(id, domain, prop.range, prop.description, prop.label, prop.priority, prop.required, false, prop.noTextEditing, prop.isDirectLink, prop.permittedValues, prop.permittedConcepts, prop.permittedTypes, prop.heading, prop.allowMultiples, prop.onePerLanguage);
          }
        } catch (err) {
          _iterator13.e(err);
        } finally {
          _iterator13.f();
        }
      }
    },
    buildTaxonomyConfigPriorityArrays: function buildTaxonomyConfigPriorityArrays(taxonomyConf) {
      taxonomyConf.primaryProperties = [];
      taxonomyConf.primaryProperties.push("http://purl.org/dc/terms/title");
      if (this.currentConfig.taxonomyIdPriorty.equalsIgnoreCase("primary")) taxonomyConf.primaryProperties.push("@id");
      if (this.currentConfig.taxonomyDescPriority.equalsIgnoreCase("primary")) taxonomyConf.primaryProperties.push("http://purl.org/dc/terms/description");
      if (this.currentConfig.taxonomyCreatorPriority.equalsIgnoreCase("primary")) taxonomyConf.primaryProperties.push("http://purl.org/dc/terms/creator");
      if (this.currentConfig.taxonomyPublisherPriority.equalsIgnoreCase("primary")) taxonomyConf.primaryProperties.push("http://purl.org/dc/terms/publisher");
      if (this.currentConfig.taxonomyPubNamePriority.equalsIgnoreCase("primary")) taxonomyConf.primaryProperties.push("https://purl.org/ctdlasn/terms/publisherName");
      if (this.currentConfig.taxonomyLangPriority.equalsIgnoreCase("primary")) taxonomyConf.primaryProperties.push("http://purl.org/dc/terms/language");
      if (this.currentConfig.taxonomySourcePriority.equalsIgnoreCase("primary")) taxonomyConf.primaryProperties.push("http://purl.org/dc/elements/1.1/source");
      this.addCustomPropertiesToPriorityArray(this.currentConfig.taxonomyCustomProperties, taxonomyConf.primaryProperties, "primary");
      taxonomyConf.secondaryProperties = [];
      if (this.currentConfig.taxonomyIdPriorty.equalsIgnoreCase("secondary")) taxonomyConf.secondaryProperties.push("@id");
      if (this.currentConfig.taxonomyDescPriority.equalsIgnoreCase("secondary")) taxonomyConf.secondaryProperties.push("http://purl.org/dc/terms/description");
      if (this.currentConfig.taxonomyIdPriorty.equalsIgnoreCase("secondary")) taxonomyConf.secondaryProperties.push("@id");
      if (this.currentConfig.taxonomyDescPriority.equalsIgnoreCase("secondary")) taxonomyConf.secondaryProperties.push("http://purl.org/dc/terms/description");
      if (this.currentConfig.taxonomyCreatorPriority.equalsIgnoreCase("secondary")) taxonomyConf.secondaryProperties.push("http://purl.org/dc/terms/creator");
      if (this.currentConfig.taxonomyPublisherPriority.equalsIgnoreCase("secondary")) taxonomyConf.secondaryProperties.push("http://purl.org/dc/terms/publisher");
      if (this.currentConfig.taxonomyPubNamePriority.equalsIgnoreCase("secondary")) taxonomyConf.secondaryProperties.push("https://purl.org/ctdlasn/terms/publisherName");
      if (this.currentConfig.taxonomyLangPriority.equalsIgnoreCase("secondary")) taxonomyConf.secondaryProperties.push("http://purl.org/dc/terms/language");
      if (this.currentConfig.taxonomySourcePriority.equalsIgnoreCase("secondary")) taxonomyConf.secondaryProperties.push("http://purl.org/dc/elements/1.1/source");
      this.addCustomPropertiesToPriorityArray(this.currentConfig.taxonomyCustomProperties, taxonomyConf.secondaryProperties, "secondary");
      taxonomyConf.tertiaryProperties = [];
      if (this.currentConfig.taxonomyIdPriorty.equalsIgnoreCase("tertiary")) taxonomyConf.tertiaryProperties.push("@id");
      if (this.currentConfig.taxonomyDescPriority.equalsIgnoreCase("tertiary")) taxonomyConf.tertiaryProperties.push("http://purl.org/dc/terms/description");
      if (this.currentConfig.taxonomyIdPriorty.equalsIgnoreCase("tertiary")) taxonomyConf.tertiaryProperties.push("@id");
      if (this.currentConfig.taxonomyDescPriority.equalsIgnoreCase("tertiary")) taxonomyConf.tertiaryProperties.push("http://purl.org/dc/terms/description");
      if (this.currentConfig.taxonomyCreatorPriority.equalsIgnoreCase("tertiary")) taxonomyConf.tertiaryProperties.push("http://purl.org/dc/terms/creator");
      if (this.currentConfig.taxonomyPublisherPriority.equalsIgnoreCase("tertiary")) taxonomyConf.tertiaryProperties.push("http://purl.org/dc/terms/publisher");
      if (this.currentConfig.taxonomyPubNamePriority.equalsIgnoreCase("tertiary")) taxonomyConf.tertiaryProperties.push("https://purl.org/ctdlasn/terms/publisherName");
      if (this.currentConfig.taxonomyLangPriority.equalsIgnoreCase("tertiary")) taxonomyConf.tertiaryProperties.push("http://purl.org/dc/terms/language");
      if (this.currentConfig.taxonomySourcePriority.equalsIgnoreCase("tertiary")) taxonomyConf.tertiaryProperties.push("http://purl.org/dc/elements/1.1/source");
      this.addCustomPropertiesToPriorityArray(this.currentConfig.taxonomyCustomProperties, taxonomyConf.tertiaryProperties, "tertiary");
    },
    buildTaxonomyIdConfigObject: function buildTaxonomyIdConfigObject(taxonomyConf) {
      taxonomyConf["@id"] = this.generatePropertyConfigObject("https://schema.cassproject.org/0.4/ConceptScheme/id", "https://schema.cassproject.org/0.4/ConceptScheme", "http://schema.org/URL", this.currentConfig.taxonomyIdDescription, this.currentConfig.taxonomyIdLabel, this.currentConfig.taxonomyIdPriorty, true, true, true, false, null, null, null, this.currentConfig.taxonomyIdHeading, false, true);
    },
    buildTaxonomyNameConfigObject: function buildTaxonomyNameConfigObject(taxonomyConf) {
      taxonomyConf["http://purl.org/dc/terms/title"] = this.generatePropertyConfigObject("http://purl.org/dc/terms/title", "https://schema.cassproject.org/0.4/ConceptScheme", "http://www.w3.org/2000/01/rdf-schema#langString", this.currentConfig.taxonomyNameDescription, this.currentConfig.taxonomyNameLabel, "primary", true, false, false, false, null, null, null, this.currentConfig.taxonomyNameHeading, false, true);
    },
    buildTaxonomyDescConfigObject: function buildTaxonomyDescConfigObject(taxonomyConf) {
      taxonomyConf["http://purl.org/dc/terms/description"] = this.generatePropertyConfigObject("http://purl.org/dc/terms/description", "https://schema.cassproject.org/0.4/ConceptScheme", "http://www.w3.org/2000/01/rdf-schema#langString", this.currentConfig.taxonomyDescDescription, this.currentConfig.taxonomyDescLabel, this.currentConfig.taxonomyDescPriority, this.currentConfig.taxonomyDescRequired, false, false, false, null, null, null, this.currentConfig.taxonomyDescHeading, false, true);
    },
    buildTaxonomyCreatorConfigObject: function buildTaxonomyCreatorConfigObject(taxonomyConf) {
      taxonomyConf["http://purl.org/dc/terms/creator"] = this.generatePropertyConfigObject("http://purl.org/dc/terms/creator", "http://schema.cassproject.org/0.4/skos/ConceptScheme", "http://schema.org/URL", this.currentConfig.taxonomyCreatorDescription, this.currentConfig.taxonomyCreatorLabel, this.currentConfig.taxonomyCreatorPriority, this.currentConfig.taxonomyCreatorRequired, false, false, false, null, null, null, this.currentConfig.taxonomyCreatorHeading, false, true);
    },
    buildTaxonomyPublisherConfigObject: function buildTaxonomyPublisherConfigObject(taxonomyConf) {
      taxonomyConf["http://purl.org/dc/terms/publisher"] = this.generatePropertyConfigObject("http://purl.org/dc/terms/publisher", "http://schema.cassproject.org/0.4/skos/ConceptScheme", "http://schema.org/URL", this.currentConfig.taxonomyPublisherDescription, this.currentConfig.taxonomyPublisherLabel, this.currentConfig.taxonomyPublisherPriority, this.currentConfig.taxonomyPublisherRequired, false, false, false, null, null, null, this.currentConfig.taxonomyPublisherHeading, false, true);
    },
    buildTaxonomyPubNameConfigObject: function buildTaxonomyPubNameConfigObject(taxonomyConf) {
      taxonomyConf["https://purl.org/ctdlasn/terms/publisherName"] = this.generatePropertyConfigObject("https://purl.org/ctdlasn/terms/publisherName", "http://schema.cassproject.org/0.4/skos/ConceptScheme", "http://schema.org/Text", this.currentConfig.taxonomyPubNameDescription, this.currentConfig.taxonomyPubNameLabel, this.currentConfig.taxonomyPubNamePriority, this.currentConfig.taxonomyPubNameRequired, false, false, false, null, null, null, this.currentConfig.taxonomyPubNameHeading, false, true);
    },
    buildTaxonomyLangConfigObject: function buildTaxonomyLangConfigObject(taxonomyConf) {
      taxonomyConf["http://purl.org/dc/terms/language"] = this.generatePropertyConfigObject("http://purl.org/dc/terms/language", "http://schema.cassproject.org/0.4/skos/ConceptScheme", "http://schema.org/Text", this.currentConfig.taxonomyLangDescription, this.currentConfig.taxonomyLangLabel, this.currentConfig.taxonomyLangPriority, this.currentConfig.taxonomyLangRequired, false, false, false, null, null, null, this.currentConfig.taxonomyLangHeading, false, true);
    },
    buildTaxonomySourceConfigObject: function buildTaxonomySourceConfigObject(taxonomyConf) {
      taxonomyConf["http://purl.org/dc/elements/1.1/source"] = this.generatePropertyConfigObject("http://purl.org/dc/elements/1.1/source", "http://schema.cassproject.org/0.4/skos/ConceptScheme", "http://schema.org/URL", this.currentConfig.taxonomySourceDescription, this.currentConfig.taxonomySourceLabel, this.currentConfig.taxonomySourcePriority, this.currentConfig.taxonomySourceRequired, false, false, false, null, null, null, this.currentConfig.taxonomySourceHeading, false, true);
    },
    buildFrameworkConfigPriorityArrays: function buildFrameworkConfigPriorityArrays(fwkConf) {
      fwkConf.primaryProperties = [];
      fwkConf.primaryProperties.push("http://schema.org/name");
      if (this.currentConfig.fwkIdPriorty.equalsIgnoreCase("primary")) fwkConf.primaryProperties.push("@id");
      if (this.currentConfig.fwkDescPriority.equalsIgnoreCase("primary")) fwkConf.primaryProperties.push("http://schema.org/description");
      if (this.currentConfig.fwkClassPriority.equalsIgnoreCase("primary")) fwkConf.primaryProperties.push("https://schema.cassproject.org/0.4/classification");
      if (this.currentConfig.fwkMarkingsPriority.equalsIgnoreCase("primary")) fwkConf.primaryProperties.push("https://schema.cassproject.org/0.4/markings");
      this.addCustomPropertiesToPriorityArray(this.currentConfig.fwkCustomProperties, fwkConf.primaryProperties, "primary");
      fwkConf.secondaryProperties = [];
      if (this.currentConfig.fwkIdPriorty.equalsIgnoreCase("secondary")) fwkConf.secondaryProperties.push("@id");
      if (this.currentConfig.fwkDescPriority.equalsIgnoreCase("secondary")) fwkConf.secondaryProperties.push("http://schema.org/description");
      if (this.currentConfig.fwkClassPriority.equalsIgnoreCase("secondary")) fwkConf.secondaryProperties.push("https://schema.cassproject.org/0.4/classification");
      if (this.currentConfig.fwkMarkingsPriority.equalsIgnoreCase("secondary")) fwkConf.secondaryProperties.push("https://schema.cassproject.org/0.4/markings");
      this.addCustomPropertiesToPriorityArray(this.currentConfig.fwkCustomProperties, fwkConf.secondaryProperties, "secondary");
      fwkConf.tertiaryProperties = [];
      if (this.currentConfig.fwkIdPriorty.equalsIgnoreCase("tertiary")) fwkConf.tertiaryProperties.push("@id");
      if (this.currentConfig.fwkDescPriority.equalsIgnoreCase("tertiary")) fwkConf.tertiaryProperties.push("http://schema.org/description");
      if (this.currentConfig.fwkClassPriority.equalsIgnoreCase("tertiary")) fwkConf.tertiaryProperties.push("https://schema.cassproject.org/0.4/classification");
      if (this.currentConfig.fwkMarkingsPriority.equalsIgnoreCase("tertiary")) fwkConf.tertiaryProperties.push("https://schema.cassproject.org/0.4/markings");
      this.addCustomPropertiesToPriorityArray(this.currentConfig.fwkCustomProperties, fwkConf.tertiaryProperties, "tertiary");
    },
    buildFrameworkIdConfigObject: function buildFrameworkIdConfigObject(fwkConf) {
      fwkConf["@id"] = this.generatePropertyConfigObject("https://schema.cassproject.org/0.4/Framework/id", "http://schema.cassproject.org/0.3/Framework", "http://schema.org/URL", this.currentConfig.fwkIdDescription, this.currentConfig.fwkIdLabel, this.currentConfig.fwkIdPriorty, true, true, true, false, null, null, null, this.currentConfig.fwkIdHeading, false, true);
    },
    buildFrameworkNameConfigObject: function buildFrameworkNameConfigObject(fwkConf) {
      fwkConf["http://schema.org/name"] = this.generatePropertyConfigObject("http://schema.org/name", "http://schema.cassproject.org/0.3/Framework", "http://www.w3.org/2000/01/rdf-schema#langString", this.currentConfig.fwkNameDescription, this.currentConfig.fwkNameLabel, "primary", true, false, false, false, null, null, null, this.currentConfig.fwkNameHeading, false, true);
    },
    buildFrameworkDescConfigObject: function buildFrameworkDescConfigObject(fwkConf) {
      fwkConf["http://schema.org/description"] = this.generatePropertyConfigObject("http://schema.org/description", "http://schema.cassproject.org/0.3/Framework", "http://www.w3.org/2000/01/rdf-schema#langString", this.currentConfig.fwkDescDescription, this.currentConfig.fwkDescLabel, this.currentConfig.fwkDescPriority, this.currentConfig.fwkDescRequired, false, false, false, null, null, null, this.currentConfig.fwkDescHeading, false, true);
    },
    buildFrameworkClassificationConfigObject: function buildFrameworkClassificationConfigObject(fwkConf) {
      fwkConf["https://schema.cassproject.org/0.4/classification"] = this.generatePropertyConfigObject("https://schema.cassproject.org/0.4/classification", "http://schema.cassproject.org/0.3/Framework", "http://schema.org/Text", this.currentConfig.fwkClassDescription, this.currentConfig.fwkClassLabel, this.currentConfig.fwkClassPriority, this.currentConfig.fwkClassRequired, false, false, false, null, null, null, this.currentConfig.fwkClassHeading, false, true);
    },
    buildFrameworkMarkingsConfigObject: function buildFrameworkMarkingsConfigObject(fwkConf) {
      fwkConf["https://schema.cassproject.org/0.4/markings"] = this.generatePropertyConfigObject("https://schema.cassproject.org/0.4/markings", "http://schema.cassproject.org/0.3/Framework", "http://schema.org/Text", this.currentConfig.fwkMarkingsDescription, this.currentConfig.fwkMarkingsLabel, this.currentConfig.fwkMarkingsPriority, this.currentConfig.fwkMarkingsRequired, false, false, false, null, null, null, this.currentConfig.fwkMarkingsHeading, false, true);
    },
    getFrameworkConfigHeadings: function getFrameworkConfigHeadings() {
      var allHeadings = [];
      if (this.currentConfig.fwkIdHeading && !this.currentConfig.fwkIdHeading.trim().equals('')) allHeadings[this.currentConfig.fwkIdHeading.trim()] = 'x';
      if (this.currentConfig.fwkNameHeading && !this.currentConfig.fwkNameHeading.trim().equals('')) allHeadings[this.currentConfig.fwkNameHeading.trim()] = 'x';
      if (this.currentConfig.fwkDescHeading && !this.currentConfig.fwkDescHeading.trim().equals('')) allHeadings[this.currentConfig.fwkDescHeading.trim()] = 'x';
      if (this.currentConfig.fwkClassHeading && !this.currentConfig.fwkClassHeading.trim().equals('')) allHeadings[this.currentConfig.fwkClassHeading.trim()] = 'x';
      if (this.currentConfig.fwkMarkingsHeading && !this.currentConfig.fwkMarkingsHeading.trim().equals('')) allHeadings[this.currentConfig.fwkMarkingsHeading.trim()] = 'x';
      this.addCustomPropertiesToHeadingsObj(this.currentConfig.fwkCustomProperties, allHeadings);
      return allHeadings;
    },
    getTaxonomyConfigHeadings: function getTaxonomyConfigHeadings() {
      var allHeadings = [];
      if (this.currentConfig.taxonomyIdHeading && !this.currentConfig.taxonomyIdHeading.trim().equals('')) allHeadings[this.currentConfig.taxonomyIdHeading.trim()] = 'x';
      if (this.currentConfig.taxonomyNameHeading && !this.currentConfig.taxonomyNameHeading.trim().equals('')) allHeadings[this.currentConfig.taxonomyNameHeading.trim()] = 'x';
      if (this.currentConfig.taxonomyDescHeading && !this.currentConfig.taxonomyDescHeading.trim().equals('')) allHeadings[this.currentConfig.taxonomyDescHeading.trim()] = 'x';
      if (this.currentConfig.taxonomyCreatorHeading && !this.currentConfig.taxonomyCreatorHeading.trim().equals('')) allHeadings[this.currentConfig.taxonomyCreatorHeading.trim()] = 'x';
      if (this.currentConfig.taxonomyPublisherHeading && !this.currentConfig.taxonomyPublisherHeading.trim().equals('')) allHeadings[this.currentConfig.taxonomyPublisherHeading.trim()] = 'x';
      if (this.currentConfig.taxonomyPubNameHeading && !this.currentConfig.taxonomyPubNameHeading.trim().equals('')) allHeadings[this.currentConfig.taxonomyPubNameHeading.trim()] = 'x';
      if (this.currentConfig.taxonomyLangHeading && !this.currentConfig.taxonomyLangHeading.trim().equals('')) allHeadings[this.currentConfig.taxonomyLangHeading.trim()] = 'x';
      if (this.currentConfig.taxonomySourceHeading && !this.currentConfig.taxonomySourceHeading.trim().equals('')) allHeadings[this.currentConfig.taxonomySourceHeading.trim()] = 'x';
      this.addCustomPropertiesToHeadingsObj(this.currentConfig.taxonomyCustomProperties, allHeadings);
      return allHeadings;
    },
    getTaxonConfigHeadings: function getTaxonConfigHeadings() {
      var allHeadings = [];
      if (this.currentConfig.taxonIdHeading && !this.currentConfig.taxonIdHeading.trim().equals('')) allHeadings[this.currentConfig.taxonIdHeading.trim()] = 'x';
      if (this.currentConfig.taxonNameHeading && !this.currentConfig.taxonNameHeading.trim().equals('')) allHeadings[this.currentConfig.taxonNameHeading.trim()] = 'x';
      if (this.currentConfig.taxonDescHeading && !this.currentConfig.taxonDescHeading.trim().equals('')) allHeadings[this.currentConfig.taxonDescHeading.trim()] = 'x';
      if (this.currentConfig.taxonNotationHeading && !this.currentConfig.taxonNotationHeading.trim().equals('')) allHeadings[this.currentConfig.taxonNotationHeading.trim()] = 'x';
      if (this.currentConfig.taxonAltLabelHeading && !this.currentConfig.taxonAltLabelHeading.trim().equals('')) allHeadings[this.currentConfig.taxonAltLabelHeading.trim()] = 'x';
      if (this.currentConfig.taxonHiddenLabelHeading && !this.currentConfig.taxonHiddenLabelHeading.trim().equals('')) allHeadings[this.currentConfig.taxonHiddenLabelHeading.trim()] = 'x';
      if (this.currentConfig.taxonNoteHeading && !this.currentConfig.taxonNoteHeading.trim().equals('')) allHeadings[this.currentConfig.taxonNoteHeading.trim()] = 'x';
      if (this.currentConfig.taxonBroaderHeading && !this.currentConfig.taxonBroaderHeading.trim().equals('')) allHeadings[this.currentConfig.taxonBroaderHeading.trim()] = 'x';
      if (this.currentConfig.taxonNarrowerHeading && !this.currentConfig.taxonNarrowerHeading.trim().equals('')) allHeadings[this.currentConfig.taxonNarrowerHeading.trim()] = 'x';
      if (this.currentConfig.taxonBroadMatchHeading && !this.currentConfig.taxonBroadMatchHeading.trim().equals('')) allHeadings[this.currentConfig.taxonBroadMatchHeading.trim()] = 'x';
      if (this.currentConfig.taxonCloseMatchHeading && !this.currentConfig.taxonCloseMatchHeading.trim().equals('')) allHeadings[this.currentConfig.taxonCloseMatchHeading.trim()] = 'x';
      if (this.currentConfig.taxonExactMatchHeading && !this.currentConfig.taxonExactMatchHeading.trim().equals('')) allHeadings[this.currentConfig.taxonExactMatchHeading.trim()] = 'x';
      if (this.currentConfig.taxonNarrowMatchHeading && !this.currentConfig.taxonNarrowMatchHeading.trim().equals('')) allHeadings[this.currentConfig.taxonNarrowMatchHeading.trim()] = 'x';
      if (this.currentConfig.taxonRelatedHeading && !this.currentConfig.taxonRelatedHeading.trim().equals('')) allHeadings[this.currentConfig.taxonRelatedHeading.trim()] = 'x';
      this.addCustomPropertiesToHeadingsObj(this.currentConfig.taxonCustomProperties, allHeadings);
      return allHeadings;
    },
    buildFrameworkConfigHeadingsArray: function buildFrameworkConfigHeadingsArray(fwkConf) {
      var fwkConfigHeadings = this.getFrameworkConfigHeadings();
      fwkConf.headings = Object.keys(fwkConfigHeadings);
      if (this.enforceHeadings && !fwkConf.headings.includes(this.DEFAULT_HEADING)) fwkConf.headings.push(this.DEFAULT_HEADING);
    },
    buildTaxonomyConfigHeadingsArray: function buildTaxonomyConfigHeadingsArray(taxonomyConf) {
      var taxonomyConfigHeadings = this.getTaxonomyConfigHeadings();
      taxonomyConf.headings = Object.keys(taxonomyConfigHeadings);
      if (this.enforceHeadings && !taxonomyConf.headings.includes(this.DEFAULT_HEADING)) taxonomyConf.headings.push(this.DEFAULT_HEADING);
    },
    buildTaxonConfigHeadingsArray: function buildTaxonConfigHeadingsArray(taxonConf) {
      var taxonConfigHeadings = this.getTaxonConfigHeadings();
      taxonConf.headings = Object.keys(taxonConfigHeadings);
      if (this.enforceHeadings && !taxonConf.headings.includes(this.DEFAULT_HEADING)) taxonConf.headings.push(this.DEFAULT_HEADING);
    },
    addFrameworkConfigToObject: function addFrameworkConfigToObject(cco) {
      var fwkConf = {};
      this.buildFrameworkConfigPriorityArrays(fwkConf);
      this.buildFrameworkConfigHeadingsArray(fwkConf);
      this.buildFrameworkIdConfigObject(fwkConf);
      this.buildFrameworkNameConfigObject(fwkConf);
      this.buildFrameworkDescConfigObject(fwkConf);
      this.buildFrameworkClassificationConfigObject(fwkConf);
      this.buildFrameworkMarkingsConfigObject(fwkConf);
      this.buildCustomPropertiesConfigObjects(fwkConf, "http://schema.cassproject.org/0.3/Framework", this.currentConfig.fwkCustomProperties);
      cco.frameworkConfig = fwkConf;
    },
    addTaxonomyConfigToObject: function addTaxonomyConfigToObject(cco) {
      var taxonomyConf = {};
      this.buildTaxonomyConfigPriorityArrays(taxonomyConf);
      this.buildTaxonomyConfigHeadingsArray(taxonomyConf);
      this.buildTaxonomyIdConfigObject(taxonomyConf);
      this.buildTaxonomyNameConfigObject(taxonomyConf);
      this.buildTaxonomyDescConfigObject(taxonomyConf);
      this.buildTaxonomyCreatorConfigObject(taxonomyConf);
      this.buildTaxonomyPublisherConfigObject(taxonomyConf);
      this.buildTaxonomyPubNameConfigObject(taxonomyConf);
      this.buildTaxonomyLangConfigObject(taxonomyConf);
      this.buildTaxonomySourceConfigObject(taxonomyConf);
      this.buildCustomPropertiesConfigObjects(taxonomyConf, "http://schema.cassproject.org/0.4/skos", this.currentConfig.taxonomyCustomProperties);
      cco.taxonomyConfig = taxonomyConf;
    },
    buildTaxonConfigPriorityArrays: function buildTaxonConfigPriorityArrays(taxonConf) {
      taxonConf.primaryProperties = [];
      taxonConf.primaryProperties.push("http://www.w3.org/2004/02/skos/core#prefLabel");
      if (this.currentConfig.taxonIdPriorty.equalsIgnoreCase("primary")) taxonConf.primaryProperties.push("@id");
      if (this.currentConfig.taxonDescPriority.equalsIgnoreCase("primary")) taxonConf.primaryProperties.push("http://www.w3.org/2004/02/skos/core#definition");
      if (this.currentConfig.taxonNotationPriority.equalsIgnoreCase("primary")) taxonConf.primaryProperties.push("http://www.w3.org/2004/02/skos/core#notation");
      if (this.currentConfig.taxonAltLabelPriority.equalsIgnoreCase("primary")) taxonConf.primaryProperties.push("http://www.w3.org/2004/02/skos/core#altLabel");
      if (this.currentConfig.taxonHiddenLabelPriority.equalsIgnoreCase("primary")) taxonConf.primaryProperties.push("http://www.w3.org/2004/02/skos/core#hiddenLabel");
      if (this.currentConfig.taxonNotePriority.equalsIgnoreCase("primary")) taxonConf.primaryProperties.push("http://www.w3.org/2004/02/skos/core#note");
      if (this.currentConfig.taxonBroaderPriority.equalsIgnoreCase("primary")) taxonConf.primaryProperties.push("http://www.w3.org/2004/02/skos/core#broader");
      if (this.currentConfig.taxonNarrowerPriority.equalsIgnoreCase("primary")) taxonConf.primaryProperties.push("http://www.w3.org/2004/02/skos/core#narrower");
      if (this.currentConfig.taxonBroadMatchPriority.equalsIgnoreCase("primary")) taxonConf.primaryProperties.push("http://www.w3.org/2004/02/skos/core#broadMatch");
      if (this.currentConfig.taxonCloseMatchPriority.equalsIgnoreCase("primary")) taxonConf.primaryProperties.push("http://www.w3.org/2004/02/skos/core#closeMatch");
      if (this.currentConfig.taxonExactMatchPriority.equalsIgnoreCase("primary")) taxonConf.primaryProperties.push("http://www.w3.org/2004/02/skos/core#exactMatch");
      if (this.currentConfig.taxonNarrowMatchPriority.equalsIgnoreCase("primary")) taxonConf.primaryProperties.push("http://www.w3.org/2004/02/skos/core#narrowMatch");
      if (this.currentConfig.taxonRelatedPriority.equalsIgnoreCase("primary")) taxonConf.primaryProperties.push("http://www.w3.org/2004/02/skos/core#related");
      this.addCustomPropertiesToPriorityArray(this.currentConfig.taxonCustomProperties, taxonConf.primaryProperties, "primary");
      taxonConf.secondaryProperties = [];
      if (this.currentConfig.taxonIdPriorty.equalsIgnoreCase("secondary")) taxonConf.secondaryProperties.push("@id");
      if (this.currentConfig.taxonDescPriority.equalsIgnoreCase("secondary")) taxonConf.secondaryProperties.push("http://www.w3.org/2004/02/skos/core#definition");
      if (this.currentConfig.taxonNotationPriority.equalsIgnoreCase("secondary")) taxonConf.secondaryProperties.push("http://www.w3.org/2004/02/skos/core#notation");
      if (this.currentConfig.taxonAltLabelPriority.equalsIgnoreCase("secondary")) taxonConf.secondaryProperties.push("http://www.w3.org/2004/02/skos/core#altLabel");
      if (this.currentConfig.taxonHiddenLabelPriority.equalsIgnoreCase("secondary")) taxonConf.secondaryProperties.push("http://www.w3.org/2004/02/skos/core#hiddenLabel");
      if (this.currentConfig.taxonNotePriority.equalsIgnoreCase("secondary")) taxonConf.secondaryProperties.push("http://www.w3.org/2004/02/skos/core#note");
      if (this.currentConfig.taxonBroaderPriority.equalsIgnoreCase("secondary")) taxonConf.secondaryProperties.push("http://www.w3.org/2004/02/skos/core#broader");
      if (this.currentConfig.taxonNarrowerPriority.equalsIgnoreCase("secondary")) taxonConf.secondaryProperties.push("http://www.w3.org/2004/02/skos/core#narrower");
      if (this.currentConfig.taxonBroadMatchPriority.equalsIgnoreCase("secondary")) taxonConf.secondaryProperties.push("http://www.w3.org/2004/02/skos/core#broadMatch");
      if (this.currentConfig.taxonCloseMatchPriority.equalsIgnoreCase("secondary")) taxonConf.secondaryProperties.push("http://www.w3.org/2004/02/skos/core#closeMatch");
      if (this.currentConfig.taxonExactMatchPriority.equalsIgnoreCase("secondary")) taxonConf.secondaryProperties.push("http://www.w3.org/2004/02/skos/core#exactMatch");
      if (this.currentConfig.taxonNarrowMatchPriority.equalsIgnoreCase("secondary")) taxonConf.secondaryProperties.push("http://www.w3.org/2004/02/skos/core#narrowMatch");
      if (this.currentConfig.taxonRelatedPriority.equalsIgnoreCase("secondary")) taxonConf.secondaryProperties.push("http://www.w3.org/2004/02/skos/core#related");
      this.addCustomPropertiesToPriorityArray(this.currentConfig.taxonCustomProperties, taxonConf.secondaryProperties, "secondary");
      taxonConf.tertiaryProperties = [];
      if (this.currentConfig.taxonIdPriorty.equalsIgnoreCase("tertiary")) taxonConf.tertiaryProperties.push("@id");
      if (this.currentConfig.taxonDescPriority.equalsIgnoreCase("tertiary")) taxonConf.tertiaryProperties.push("http://www.w3.org/2004/02/skos/core#definition");
      if (this.currentConfig.taxonNotationPriority.equalsIgnoreCase("tertiary")) taxonConf.tertiaryProperties.push("http://www.w3.org/2004/02/skos/core#notation");
      if (this.currentConfig.taxonAltLabelPriority.equalsIgnoreCase("tertiary")) taxonConf.tertiaryProperties.push("http://www.w3.org/2004/02/skos/core#altLabel");
      if (this.currentConfig.taxonHiddenLabelPriority.equalsIgnoreCase("tertiary")) taxonConf.tertiaryProperties.push("http://www.w3.org/2004/02/skos/core#hiddenLabel");
      if (this.currentConfig.taxonNotePriority.equalsIgnoreCase("tertiary")) taxonConf.tertiaryProperties.push("http://www.w3.org/2004/02/skos/core#note");
      if (this.currentConfig.taxonBroaderPriority.equalsIgnoreCase("tertiary")) taxonConf.tertiaryProperties.push("http://www.w3.org/2004/02/skos/core#broader");
      if (this.currentConfig.taxonNarrowerPriority.equalsIgnoreCase("tertiary")) taxonConf.tertiaryProperties.push("http://www.w3.org/2004/02/skos/core#narrower");
      if (this.currentConfig.taxonBroadMatchPriority.equalsIgnoreCase("tertiary")) taxonConf.tertiaryProperties.push("http://www.w3.org/2004/02/skos/core#broadMatch");
      if (this.currentConfig.taxonCloseMatchPriority.equalsIgnoreCase("tertiary")) taxonConf.tertiaryProperties.push("http://www.w3.org/2004/02/skos/core#closeMatch");
      if (this.currentConfig.taxonExactMatchPriority.equalsIgnoreCase("tertiary")) taxonConf.tertiaryProperties.push("http://www.w3.org/2004/02/skos/core#exactMatch");
      if (this.currentConfig.taxonNarrowMatchPriority.equalsIgnoreCase("tertiary")) taxonConf.tertiaryProperties.push("http://www.w3.org/2004/02/skos/core#narrowMatch");
      if (this.currentConfig.taxonRelatedPriority.equalsIgnoreCase("tertiary")) taxonConf.tertiaryProperties.push("http://www.w3.org/2004/02/skos/core#related");
      this.addCustomPropertiesToPriorityArray(this.currentConfig.taxonCustomProperties, taxonConf.tertiaryProperties, "tertiary");
    },
    buildTaxonIdConfigObject: function buildTaxonIdConfigObject(taxonConf) {
      taxonConf["@id"] = this.generatePropertyConfigObject("https://schema.cassproject.org/0.4/Concept/id", "https://schema.cassproject.org/0.4/Concept", "http://schema.org/URL", this.currentConfig.taxonIdDescription, this.currentConfig.taxonIdLabel, this.currentConfig.taxonIdPriorty, true, true, true, false, null, null, null, this.currentConfig.taxonIdHeading, false, true);
    },
    buildTaxonNameConfigObject: function buildTaxonNameConfigObject(taxonConf) {
      taxonConf["http://www.w3.org/2004/02/skos/core#prefLabel"] = this.generatePropertyConfigObject("http://www.w3.org/2004/02/skos/core#prefLabel", "http://schema.cassproject.org/0.4/skos/Concept", "http://www.w3.org/2000/01/rdf-schema#langString", this.currentConfig.taxonNameDescription, this.currentConfig.taxonNameLabel, "primary", true, false, false, false, null, null, null, this.currentConfig.taxonNameHeading, false, true);
    },
    buildTaxonDescConfigObject: function buildTaxonDescConfigObject(taxonConf) {
      taxonConf["http://www.w3.org/2004/02/skos/core#definition"] = this.generatePropertyConfigObject("http://www.w3.org/2004/02/skos/core#definition", "http://schema.cassproject.org/0.4/skos/Concept", "http://www.w3.org/2000/01/rdf-schema#langString", this.currentConfig.taxonDescDescription, this.currentConfig.taxonDescLabel, this.currentConfig.taxonDescPriority, this.currentConfig.taxonDescRequired, false, false, false, null, null, null, this.currentConfig.taxonDescHeading, false, true);
    },
    buildTaxonNotationConfigObject: function buildTaxonNotationConfigObject(taxonConf) {
      taxonConf["http://www.w3.org/2004/02/skos/core#notation"] = this.generatePropertyConfigObject("http://www.w3.org/2004/02/skos/core#notation", "http://schema.cassproject.org/0.4/skos/Concept", "http://schema.org/Text", this.currentConfig.taxonNotationDescription, this.currentConfig.taxonNotationLabel, this.currentConfig.taxonNotationPriority, this.currentConfig.taxonNotationRequired, false, false, false, null, null, null, this.currentConfig.taxonNotationHeading, false, true);
    },
    buildTaxonAltLabelConfigObject: function buildTaxonAltLabelConfigObject(taxonConf) {
      taxonConf["http://www.w3.org/2004/02/skos/core#altLabel"] = this.generatePropertyConfigObject("http://www.w3.org/2004/02/skos/core#altLabel", "http://schema.cassproject.org/0.4/skos/Concept", "http://www.w3.org/2000/01/rdf-schema#langString", this.currentConfig.taxonAltLabelDescription, this.currentConfig.taxonAltLabelLabel, this.currentConfig.taxonAltLabelPriority, this.currentConfig.taxonAltLabelRequired, false, false, false, null, null, null, this.currentConfig.taxonAltLabelHeading, false, true);
    },
    buildTaxonHiddenLabelConfigObject: function buildTaxonHiddenLabelConfigObject(taxonConf) {
      taxonConf["http://www.w3.org/2004/02/skos/core#hiddenLabel"] = this.generatePropertyConfigObject("http://www.w3.org/2004/02/skos/core#hiddenLabel", "http://schema.cassproject.org/0.4/skos/Concept", "http://www.w3.org/2000/01/rdf-schema#langString", this.currentConfig.taxonHiddenLabelDescription, this.currentConfig.taxonHiddenLabelLabel, this.currentConfig.taxonHiddenLabelPriority, this.currentConfig.taxonHiddenLabelRequired, false, false, false, null, null, null, this.currentConfig.taxonHiddenLabelHeading, false, true);
    },
    buildTaxonNoteConfigObject: function buildTaxonNoteConfigObject(taxonConf) {
      taxonConf["http://www.w3.org/2004/02/skos/core#note"] = this.generatePropertyConfigObject("http://www.w3.org/2004/02/skos/core#note", "http://schema.cassproject.org/0.4/skos/Concept", "http://www.w3.org/2000/01/rdf-schema#langString", this.currentConfig.taxonNoteDescription, this.currentConfig.taxonNoteLabel, this.currentConfig.taxonNotePriority, this.currentConfig.taxonNoteRequired, false, false, false, null, null, null, this.currentConfig.taxonNoteHeading, false, true);
    },
    buildTaxonBroaderConfigObject: function buildTaxonBroaderConfigObject(taxonConf) {
      taxonConf["http://www.w3.org/2004/02/skos/core#broader"] = this.generatePropertyConfigObject("http://www.w3.org/2004/02/skos/core#broader", "http://schema.cassproject.org/0.4/skos/Concept", "https://schema.cassproject.org/0.4/skos/Concept", this.currentConfig.taxonBroaderDescription, this.currentConfig.taxonBroaderLabel, this.currentConfig.taxonBroaderPriority, this.currentConfig.taxonBroaderRequired, false, false, false, null, null, null, this.currentConfig.taxonBroaderHeading, false, true);
    },
    buildTaxonNarrowerConfigObject: function buildTaxonNarrowerConfigObject(taxonConf) {
      taxonConf["http://www.w3.org/2004/02/skos/core#narrower"] = this.generatePropertyConfigObject("http://www.w3.org/2004/02/skos/core#narrower", "http://schema.cassproject.org/0.4/skos/Concept", "https://schema.cassproject.org/0.4/skos/Concept", this.currentConfig.taxonNarrowerDescription, this.currentConfig.taxonNarrowerLabel, this.currentConfig.taxonNarrowerPriority, this.currentConfig.taxonNarrowerRequired, false, false, false, null, null, null, this.currentConfig.taxonNarrowerHeading, false, true);
    },
    buildTaxonBroadMatchConfigObject: function buildTaxonBroadMatchConfigObject(taxonConf) {
      taxonConf["http://www.w3.org/2004/02/skos/core#broadMatch"] = this.generatePropertyConfigObject("http://www.w3.org/2004/02/skos/core#broadMatch", "http://schema.cassproject.org/0.4/skos/Concept", "https://schema.cassproject.org/0.4/skos/Concept", this.currentConfig.taxonBroadMatchDescription, this.currentConfig.taxonBroadMatchLabel, this.currentConfig.taxonBroadMatchPriority, this.currentConfig.taxonBroadMatchRequired, false, false, false, null, null, null, this.currentConfig.taxonBroadMatchHeading, false, true);
    },
    buildTaxonCloseMatchConfigObject: function buildTaxonCloseMatchConfigObject(taxonConf) {
      taxonConf["http://www.w3.org/2004/02/skos/core#closeMatch"] = this.generatePropertyConfigObject("http://www.w3.org/2004/02/skos/core#closeMatch", "http://schema.cassproject.org/0.4/skos/Concept", "https://schema.cassproject.org/0.4/skos/Concept", this.currentConfig.taxonCloseMatchDescription, this.currentConfig.taxonCloseMatchLabel, this.currentConfig.taxonCloseMatchPriority, this.currentConfig.taxonCloseMatchRequired, false, false, false, null, null, null, this.currentConfig.taxonCloseMatchHeading, false, true);
    },
    buildTaxonExactMatchConfigObject: function buildTaxonExactMatchConfigObject(taxonConf) {
      taxonConf["http://www.w3.org/2004/02/skos/core#exactMatch"] = this.generatePropertyConfigObject("http://www.w3.org/2004/02/skos/core#exactMatch", "http://schema.cassproject.org/0.4/skos/Concept", "https://schema.cassproject.org/0.4/skos/Concept", this.currentConfig.taxonExactMatchDescription, this.currentConfig.taxonExactMatchLabel, this.currentConfig.taxonExactMatchPriority, this.currentConfig.taxonExactMatchRequired, false, false, false, null, null, null, this.currentConfig.taxonExactMatchHeading, false, true);
    },
    buildTaxonNarrowMatchConfigObject: function buildTaxonNarrowMatchConfigObject(taxonConf) {
      taxonConf["http://www.w3.org/2004/02/skos/core#narrowMatch"] = this.generatePropertyConfigObject("http://www.w3.org/2004/02/skos/core#narrowMatch", "http://schema.cassproject.org/0.4/skos/Concept", "https://schema.cassproject.org/0.4/skos/Concept", this.currentConfig.taxonNarrowMatchDescription, this.currentConfig.taxonNarrowMatchLabel, this.currentConfig.taxonNarrowMatchPriority, this.currentConfig.taxonNarrowMatchRequired, false, false, false, null, null, null, this.currentConfig.taxonNarrowMatchHeading, false, true);
    },
    buildTaxonRelatedConfigObject: function buildTaxonRelatedConfigObject(taxonConf) {
      taxonConf["http://www.w3.org/2004/02/skos/core#related"] = this.generatePropertyConfigObject("http://www.w3.org/2004/02/skos/core#related", "http://schema.cassproject.org/0.4/skos/Concept", "https://schema.cassproject.org/0.4/skos/Concept", this.currentConfig.taxonRelatedDescription, this.currentConfig.taxonRelatedLabel, this.currentConfig.taxonRelatedPriority, this.currentConfig.taxonRelatedRequired, false, false, false, null, null, null, this.currentConfig.taxonRelatedHeading, false, true);
    },
    addTaxonConfigToObject: function addTaxonConfigToObject(cco) {
      var taxonConf = {};
      this.buildTaxonConfigPriorityArrays(taxonConf);
      this.buildTaxonConfigHeadingsArray(taxonConf);
      this.buildTaxonIdConfigObject(taxonConf);
      this.buildTaxonNameConfigObject(taxonConf);
      this.buildTaxonDescConfigObject(taxonConf);
      this.buildTaxonNotationConfigObject(taxonConf);
      this.buildTaxonAltLabelConfigObject(taxonConf);
      this.buildTaxonHiddenLabelConfigObject(taxonConf);
      this.buildTaxonNoteConfigObject(taxonConf);
      this.buildTaxonBroaderConfigObject(taxonConf);
      this.buildTaxonNarrowerConfigObject(taxonConf);
      this.buildTaxonBroadMatchConfigObject(taxonConf);
      this.buildTaxonCloseMatchConfigObject(taxonConf);
      this.buildTaxonExactMatchConfigObject(taxonConf);
      this.buildTaxonNarrowMatchConfigObject(taxonConf);
      this.buildTaxonRelatedConfigObject(taxonConf);
      this.buildCustomPropertiesConfigObjects(taxonConf, "http://schema.cassproject.org/0.4/skos", this.currentConfig.taxonCustomProperties);
      cco.taxonConfig = taxonConf;
    },
    buildCompetencyConfigPriorityArrays: function buildCompetencyConfigPriorityArrays(compConf) {
      compConf.primaryProperties = [];
      compConf.primaryProperties.push("http://schema.org/name");
      if (this.currentConfig.compIdPriorty.equalsIgnoreCase("primary")) compConf.primaryProperties.push("@id");
      if (this.currentConfig.compDescPriority.equalsIgnoreCase("primary")) compConf.primaryProperties.push("http://schema.org/description");
      if (this.currentConfig.compTypePriority.equalsIgnoreCase("primary")) compConf.primaryProperties.push("http://purl.org/dc/terms/type");
      if (this.currentConfig.compClassPriority.equalsIgnoreCase("primary")) compConf.primaryProperties.push("https://schema.cassproject.org/0.4/classification");
      if (this.currentConfig.compMarkingsPriority.equalsIgnoreCase("primary")) compConf.primaryProperties.push("https://schema.cassproject.org/0.4/markings");
      if (this.currentConfig.compAllowLevels && this.currentConfig.levelPriority.equalsIgnoreCase("primary")) compConf.primaryProperties.push("https://schema.cassproject.org/0.4/Level");
      this.addCustomPropertiesToPriorityArray(this.currentConfig.compCustomProperties, compConf.primaryProperties, "primary");
      compConf.secondaryProperties = [];
      if (this.currentConfig.compIdPriorty.equalsIgnoreCase("secondary")) compConf.secondaryProperties.push("@id");
      if (this.currentConfig.compDescPriority.equalsIgnoreCase("secondary")) compConf.secondaryProperties.push("http://schema.org/description");
      if (this.currentConfig.compTypePriority.equalsIgnoreCase("secondary")) compConf.secondaryProperties.push("http://purl.org/dc/terms/type");
      if (this.currentConfig.compClassPriority.equalsIgnoreCase("secondary")) compConf.secondaryProperties.push("https://schema.cassproject.org/0.4/classification");
      if (this.currentConfig.compMarkingsPriority.equalsIgnoreCase("secondary")) compConf.secondaryProperties.push("https://schema.cassproject.org/0.4/markings");
      if (this.currentConfig.compAllowLevels && this.currentConfig.levelPriority.equalsIgnoreCase("secondary")) compConf.secondaryProperties.push("https://schema.cassproject.org/0.4/Level");
      this.addCustomPropertiesToPriorityArray(this.currentConfig.compCustomProperties, compConf.secondaryProperties, "secondary");
      compConf.tertiaryProperties = [];
      if (this.currentConfig.compIdPriorty.equalsIgnoreCase("tertiary")) compConf.tertiaryProperties.push("@id");
      if (this.currentConfig.compDescPriority.equalsIgnoreCase("tertiary")) compConf.tertiaryProperties.push("http://schema.org/description");
      if (this.currentConfig.compTypePriority.equalsIgnoreCase("tertiary")) compConf.tertiaryProperties.push("http://purl.org/dc/terms/type");
      if (this.currentConfig.compClassPriority.equalsIgnoreCase("tertiary")) compConf.tertiaryProperties.push("https://schema.cassproject.org/0.4/classification");
      if (this.currentConfig.compMarkingsPriority.equalsIgnoreCase("tertiary")) compConf.tertiaryProperties.push("https://schema.cassproject.org/0.4/markings");
      if (this.currentConfig.compAllowLevels && this.currentConfig.levelPriority.equalsIgnoreCase("tertiary")) compConf.tertiaryProperties.push("https://schema.cassproject.org/0.4/Level");
      this.addCustomPropertiesToPriorityArray(this.currentConfig.compCustomProperties, compConf.tertiaryProperties, "tertiary");
    },
    buildCompetencyIdConfigObject: function buildCompetencyIdConfigObject(compConf) {
      compConf["@id"] = this.generatePropertyConfigObject("https://schema.cassproject.org/0.4/Competency/id", "http://schema.cassproject.org/0.3/Competency", "http://schema.org/URL", this.currentConfig.compIdDescription, this.currentConfig.compIdLabel, this.currentConfig.compIdPriorty, true, true, true, false, null, null, null, this.currentConfig.compIdHeading, false, true);
    },
    buildCompetencyNameConfigObject: function buildCompetencyNameConfigObject(compConf) {
      compConf["http://schema.org/name"] = this.generatePropertyConfigObject("http://schema.org/name", "http://schema.cassproject.org/0.3/Competency", "http://www.w3.org/2000/01/rdf-schema#langString", this.currentConfig.compNameDescription, this.currentConfig.compNameLabel, "primary", true, false, false, false, null, null, null, this.currentConfig.compNameHeading, false, true);
    },
    buildCompetencyDescConfigObject: function buildCompetencyDescConfigObject(compConf) {
      compConf["http://schema.org/description"] = this.generatePropertyConfigObject("http://schema.org/description", "http://schema.cassproject.org/0.3/Competency", "http://www.w3.org/2000/01/rdf-schema#langString", this.currentConfig.compDescDescription, this.currentConfig.compDescLabel, this.currentConfig.compDescPriority, this.currentConfig.compDescRequired, false, false, false, null, null, null, this.currentConfig.compDescHeading, false, true);
    },
    buildCompetencyTypeConfigObject: function buildCompetencyTypeConfigObject(compConf) {
      if (!this.currentConfig.compEnforceTypes) this.currentConfig.compEnforcedTypes = [];
      var compTypeRequired = this.currentConfig.compTypeRequired;
      // commenting this out for now CA-381
      // if (this.currentConfig.compEnforcedTypes && this.currentConfig.compEnforcedTypes.length > 0) compTypeRequired = true;
      compConf["http://purl.org/dc/terms/type"] = this.generatePropertyConfigObject("https://purl.org/ctdlasn/terms/competencyCategory", "http://schema.cassproject.org/0.3/Competency", "http://www.w3.org/2000/01/rdf-schema#langString", this.currentConfig.compTypeDescription, this.currentConfig.compTypeLabel, this.currentConfig.compTypePriority, compTypeRequired, false, false, false, this.currentConfig.compEnforcedTypes, null, null, this.currentConfig.compTypeHeading, false, true);
    },
    buildCompetencyClassificationConfigObject: function buildCompetencyClassificationConfigObject(compConf) {
      compConf["https://schema.cassproject.org/0.4/classification"] = this.generatePropertyConfigObject("https://schema.cassproject.org/0.4/classification", "http://schema.cassproject.org/0.3/Framework", "http://schema.org/Text", this.currentConfig.compClassDescription, this.currentConfig.compClassLabel, this.currentConfig.compClassPriority, this.currentConfig.compClassRequired, false, false, false, null, null, null, this.currentConfig.compClassHeading, false, true);
    },
    buildCompetencyMarkingsConfigObject: function buildCompetencyMarkingsConfigObject(compConf) {
      compConf["https://schema.cassproject.org/0.4/markings"] = this.generatePropertyConfigObject("https://schema.cassproject.org/0.4/markings", "http://schema.cassproject.org/0.3/Framework", "http://schema.org/Text", this.currentConfig.compMarkingsDescription, this.currentConfig.compMarkingsLabel, this.currentConfig.compMarkingsPriority, this.currentConfig.compMarkingsRequired, false, false, false, null, null, null, this.currentConfig.compMarkingsHeading, false, true);
    },
    getCompetencyConfigHeadings: function getCompetencyConfigHeadings() {
      var allHeadings = [];
      if (this.currentConfig.compIdHeading && !this.currentConfig.compIdHeading.trim().equals('')) allHeadings[this.currentConfig.compIdHeading.trim()] = 'x';
      if (this.currentConfig.compNameHeading && !this.currentConfig.compNameHeading.trim().equals('')) allHeadings[this.currentConfig.compNameHeading.trim()] = 'x';
      if (this.currentConfig.compDescHeading && !this.currentConfig.compDescHeading.trim().equals('')) allHeadings[this.currentConfig.compDescHeading.trim()] = 'x';
      if (this.currentConfig.compTypeHeading && !this.currentConfig.compTypeHeading.trim().equals('')) allHeadings[this.currentConfig.compTypeHeading.trim()] = 'x';
      if (this.currentConfig.levelHeading && !this.currentConfig.levelHeading.trim().equals('')) allHeadings[this.currentConfig.levelHeading.trim()] = 'x';
      this.addCustomPropertiesToHeadingsObj(this.currentConfig.compCustomProperties, allHeadings);
      return allHeadings;
    },
    buildCompetencyConfigHeadingsArray: function buildCompetencyConfigHeadingsArray(compConf) {
      var compHeadings = this.getCompetencyConfigHeadings();
      compConf.headings = Object.keys(compHeadings);
      if (this.enforceHeadings && !compConf.headings.includes(this.DEFAULT_HEADING)) compConf.headings.push(this.DEFAULT_HEADING);
    },
    buildRelationshipsPriorityAndHeading: function buildRelationshipsPriorityAndHeading(compConf) {
      if (this.currentConfig.relationshipsHeading && !this.currentConfig.relationshipsHeading.trim().equals('')) {
        compConf.relationshipsHeading = this.currentConfig.relationshipsHeading;
      } else if (this.enforceHeadings) {
        compConf.relationshipsHeading = this.DEFAULT_HEADING;
      } else {
        compConf.relationshipsHeading = "";
      }
      compConf.relationshipsPriority = this.currentConfig.relationshipsPriority;
    },
    addCompetencyConfigToObject: function addCompetencyConfigToObject(cco) {
      var compConf = {};
      this.buildCompetencyConfigPriorityArrays(compConf);
      this.buildCompetencyConfigHeadingsArray(compConf);
      this.buildRelationshipsPriorityAndHeading(compConf);
      this.buildCompetencyIdConfigObject(compConf);
      this.buildCompetencyNameConfigObject(compConf);
      this.buildCompetencyDescConfigObject(compConf);
      this.buildCompetencyClassificationConfigObject(compConf);
      this.buildCompetencyMarkingsConfigObject(compConf);
      this.buildCompetencyTypeConfigObject(compConf);
      this.buildCustomPropertiesConfigObjects(compConf, "http://schema.cassproject.org/0.3/Competency", this.currentConfig.compCustomProperties);
      cco.competencyConfig = compConf;
    },
    generateRelationshipConfigObject: function generateRelationshipConfigObject(relObj) {
      var relConfigObj = {};
      relConfigObj["http://www.w3.org/2000/01/rdf-schema#comment"] = [];
      var commentObj = {};
      commentObj["@language"] = "en";
      commentObj["@value"] = relObj.label.trim();
      relConfigObj["http://www.w3.org/2000/01/rdf-schema#comment"].push(commentObj);
      relConfigObj["http://www.w3.org/2000/01/rdf-schema#label"] = [];
      var labelObj = {};
      labelObj["@language"] = "en";
      labelObj["@value"] = relObj.label.trim();
      relConfigObj["http://www.w3.org/2000/01/rdf-schema#label"].push(labelObj);
      return relConfigObj;
    },
    addRelationsConfigToObject: function addRelationsConfigToObject(cco) {
      var relConf = {};
      var configRelationships = Object.keys(this.currentConfig.relationships);
      for (var _i5 = 0, _configRelationships = configRelationships; _i5 < _configRelationships.length; _i5++) {
        var cr = _configRelationships[_i5];
        var relObj = this.currentConfig.relationships[cr];
        if (relObj.enabled) relConf[cr] = this.generateRelationshipConfigObject(relObj);
      }
      cco.relationshipConfig = relConf;
    },
    generateLevelsConfigObject: function generateLevelsConfigObject(levConf) {
      levConf["https://schema.cassproject.org/0.4/Level"] = {};
      levConf["https://schema.cassproject.org/0.4/Level"]["priority"] = this.currentConfig.levelPriority;
      if (this.currentConfig.levelHeading && !this.currentConfig.levelHeading.trim().equals('')) {
        levConf["https://schema.cassproject.org/0.4/Level"]["heading"] = this.currentConfig.levelHeading.trim();
      } else if (this.enforceHeadings) {
        levConf["https://schema.cassproject.org/0.4/Level"]["heading"] = this.DEFAULT_HEADING;
      }
      levConf["https://schema.cassproject.org/0.4/Level"]["http://www.w3.org/2000/01/rdf-schema#comment"] = [];
      var commentObj = {};
      commentObj["@language"] = "en";
      commentObj["@value"] = this.currentConfig.levelLabel.trim();
      levConf["https://schema.cassproject.org/0.4/Level"]["http://www.w3.org/2000/01/rdf-schema#comment"].push(commentObj);
      levConf["https://schema.cassproject.org/0.4/Level"]["http://www.w3.org/2000/01/rdf-schema#label"] = [];
      var labelObj = {};
      labelObj["@language"] = "en";
      labelObj["@value"] = this.currentConfig.levelDescription.trim();
      levConf["https://schema.cassproject.org/0.4/Level"]["http://www.w3.org/2000/01/rdf-schema#label"].push(labelObj);
      if (this.currentConfig.enforceLevelValues && this.currentConfig.enforcedLevelValues && this.currentConfig.enforcedLevelValues.length > 0) {
        var optionsArray = [];
        var _iterator14 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"])(this.currentConfig.enforcedLevelValues),
          _step14;
        try {
          for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
            var lvlId = _step14.value;
            var lvlOptionObj = {};
            lvlOptionObj["val"] = lvlId;
            optionsArray.push(lvlOptionObj);
          }
        } catch (err) {
          _iterator14.e(err);
        } finally {
          _iterator14.f();
        }
        levConf["https://schema.cassproject.org/0.4/Level"]["options"] = optionsArray;
      }
    },
    addLevelsConfigToObject: function addLevelsConfigToObject(cco) {
      if (this.currentConfig.compAllowLevels) {
        var levConf = {};
        this.generateLevelsConfigObject(levConf);
        cco.levelsConfig = levConf;
      }
    },
    addAlignmentConfigToObject: function addAlignmentConfigToObject(cco) {
      var algConfig = [];
      var configAligns = Object.keys(this.currentConfig.alignments);
      for (var _i6 = 0, _configAligns = configAligns; _i6 < _configAligns.length; _i6++) {
        var al = _configAligns[_i6];
        if (this.currentConfig.alignments[al]) algConfig.push(al);
      }
      cco.alignConfig = algConfig;
    },
    addDefaultPermissionConfigToObject: function addDefaultPermissionConfigToObject(cco) {
      cco.defaultObjectOwners = this.currentConfig.defaultOwners;
      cco.defaultObjectReaders = this.currentConfig.defaultReaders;
      cco.defaultCommenters = this.currentConfig.defaultCommenters;
    }
  },
  updated: function updated() {
    this.$store.commit('configuration/setLocalDefaultBrowserConfig', this.getDefaultBrowserConfigId());
  },
  mounted: function mounted() {
    this.buildConfigList();
    this.$store.commit('configuration/setLocalDefaultBrowserConfig', this.getDefaultBrowserConfigId());
    if (this.$store.getters['editor/framework'] && this.$store.getters['editor/framework'].configuration) {
      this.frameworkConfigId = this.$store.getters['editor/framework'].configuration;
    }
  }
};

/***/ }),

/***/ "af07":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"862f505e-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/ModalTemplate.vue?vue&type=template&id=1c4e04a7
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

/***/ "b2df":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ConfigurationListItem_vue_vue_type_style_index_0_id_bb9ea86c_prod_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d140");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ConfigurationListItem_vue_vue_type_style_index_0_id_bb9ea86c_prod_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ConfigurationListItem_vue_vue_type_style_index_0_id_bb9ea86c_prod_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "d140":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);
//# sourceMappingURL=chunk-61b7344a.53938f44.js.map