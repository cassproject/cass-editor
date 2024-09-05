(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-719eeaef","chunk-2d0dab46","chunk-25a2af2a","chunk-25a2af2a","chunk-2d0dab46"],{

/***/ "62af":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "6d79":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cassUtil; });
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("caad");
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("14d9");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("d3b7");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("ac1f");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("25f0");
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("2532");
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("841c");
/* harmony import */ var core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_6__);
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
      var adminKeys = window.repo.adminKeys;
      var userIds = EcIdentityManager.default.ids;
      if (!Array.isArray(adminKeys)) return false;
      if (!Array.isArray(userIds)) return false;
      var _iterator5 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(userIds),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var userId = _step5.value;
          var userKey = userId.ppk.toPk().toPem();
          var _iterator6 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(adminKeys),
            _step6;
          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var adminKey = _step6.value;
              if (userKey === adminKey) {
                return true;
              }
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      return false;
    },
    generateProbablePersonFingerprintFromShortId: function generateProbablePersonFingerprintFromShortId(personShortId) {
      return personShortId.substring(personShortId.lastIndexOf("/") + 1);
    },
    isPersonIdAnObjectOwner: function isPersonIdAnObjectOwner(personShortId, obj) {
      if (!obj.owner || obj.owner.length === 0) return false;
      var personFingerprint = this.generateProbablePersonFingerprintFromShortId(personShortId);
      var _iterator7 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(obj.owner),
        _step7;
      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var ownerPkPem = _step7.value;
          var ownerFingerprint = EcPk.fromPem(ownerPkPem).fingerprint();
          if (ownerFingerprint.equals(personFingerprint)) return true;
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
      return false;
    },
    isPersonIdAnObjectReader: function isPersonIdAnObjectReader(personShortId, obj) {
      if (!obj.reader || obj.reader.length === 0) return false;
      var personFingerprint = this.generateProbablePersonFingerprintFromShortId(personShortId);
      var _iterator8 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(obj.reader),
        _step8;
      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var readerPkPem = _step8.value;
          var readerFingerprint = EcPk.fromPem(readerPkPem).fingerprint();
          if (readerFingerprint.equals(personFingerprint)) return true;
        }
        // return obj.hasReader(EcPk.fromPem(pkPem));
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
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
      var _iterator9 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(ecrlda),
        _step9;
      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var ecrld = _step9.value;
          var eca = new EcAlignment();
          eca.copyFrom(ecrld);
          ecaa.push(eca);
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
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

/***/ "af07":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"01d4e028-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/ModalTemplate.vue?vue&type=template&id=1c4e04a7
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

/***/ "bc52":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "c24a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.search.js
var es_string_search = __webpack_require__("841c");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"01d4e028-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/Share.vue?vue&type=template&id=6b3a5f13






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
  }, [_vm._v("Share " + _vm._s(_vm.objectType))]), _c('br'), _c('span', {
    staticClass: "subtitle has-text-white has-text-weight-medium"
  }, [_vm._v(" Sharing settings for " + _vm._s(_vm.frameworkName) + " " + _vm._s(_vm.objectType) + " ")])]), _vm.isProcessing ? _c('template', {
    slot: "modal-body"
  }, [_c('h2', {
    staticClass: "header has-text-centered"
  }, [_vm._v(" Processing request... ")]), _c('div', {
    staticClass: "section has-background-white has-text-centered"
  }, [_c('span', {
    staticClass: "icon is-large"
  }, [_c('i', {
    staticClass: "fa fa-spinner fa-2x fa-pulse"
  })])])]) : _vm.confirmMakePrivate ? _c('template', {
    slot: "modal-body"
  }, [_c('h2', {
    staticClass: "header is-size-3"
  }, [_vm._v(" Confirm make private ")]), _c('p', [_vm._v(" Making this " + _vm._s(_vm.objectType) + " private means only those users/groups in your access list will have the ability to read, write, or edit this " + _vm._s(_vm.objectType) + ". ")])]) : _vm.confirmMakePublic ? _c('template', {
    slot: "modal-body"
  }, [_c('h2', {
    staticClass: "header is-size-3"
  }, [_vm._v(" Confirm make public ")]), _c('p', [_vm._v(" Making this " + _vm._s(_vm.objectType) + " public means anyone with a link can access and read this " + _vm._s(_vm.objectType) + ". Only those with admin access will be able to edit or delete the " + _vm._s(_vm.objectType) + ". ")])]) : !_vm.confirmMakePublic && !_vm.confirmMakePrivate ? _c('template', {
    slot: "modal-body"
  }, [_vm.shareEnabled || _vm.shareLink ? _c('div', {
    staticClass: "columns box is-mobile is-multiline"
  }, [_c('div', {
    staticClass: "column is-12"
  }, [_c('h3', {
    staticClass: "has-text-weight-bold"
  }, [_vm._v(" Shareable link ")])]), _c('div', {
    staticClass: "column"
  }, [_c('p', {
    staticClass: "share-url has-text-weight-light"
  }, [_vm._v(" " + _vm._s(_vm.shareableFrameworkInEditor) + " ")])]), _c('div', {
    staticClass: "column is-narrow"
  }, [_c('div', {
    directives: [{
      name: "clipboard",
      rawName: "v-clipboard",
      value: _vm.shareableFrameworkInEditor,
      expression: "shareableFrameworkInEditor"
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
    staticClass: "button is-outlined is-large is-primary",
    attrs: {
      "title": "Copy URL to the clipboard."
    }
  }, [_vm.clipStatus === 'ready' ? _c('i', {
    staticClass: "fa fa-copy"
  }) : _vm._e(), _vm.clipStatus === 'success' ? _c('i', {
    staticClass: "fa fa-check"
  }) : _vm._e(), _vm.clipStatus === 'error' ? _c('i', {
    staticClass: "fa fa-times"
  }) : _vm._e()])])]) : _vm._e(), _vm.canEditFramework && _vm.userManagementEnabled ? _c('div', {
    staticClass: "columns is-multiline is-mobile"
  }, [_vm.ownerCount === 0 ? _c('div', [_vm._v(" To add users or groups or to make your " + _vm._s(_vm.objectType) + " private, first add yourself as an owner. "), _c('button', {
    on: {
      "click": _vm.makeCurrentUserAnOwner
    }
  }, [_vm._v(" Make me an owner ")])]) : _c('div', {
    staticClass: "column is-12"
  }, [_c('div', {
    staticClass: "columns is-vcentered is-mobile"
  }, [_c('div', {
    staticClass: "column"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v("Add users or groups")])]), _vm.loggedIn ? _c('div', {
    staticClass: "column is-narrow"
  }, [_c('div', {
    staticClass: "buttons has-addons is-pulled-right"
  }, [_c('button', {
    staticClass: "button is-small is-link",
    class: {
      'is-outlined': _vm.privateFramework
    },
    on: {
      "click": _vm.handlePublicClick
    }
  }, [_vm._v(" Public ")]), _c('button', {
    staticClass: "button is-small is-link",
    class: {
      'is-outlined': !_vm.privateFramework
    },
    on: {
      "click": _vm.handlePrivateClick
    }
  }, [_vm._v(" Private ")])])]) : _vm._e()]), _c('div', {
    staticClass: "field is-grouped"
  }, [_c('div', {
    staticClass: "control is-expanded share auto-complete__control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.search,
      expression: "search"
    }],
    staticClass: "input share is-fullwidth",
    attrs: {
      "type": "search",
      "placeholder": "search"
    },
    domProps: {
      "value": _vm.search
    },
    on: {
      "blur": _vm.closeAutoComplete,
      "input": [function ($event) {
        if ($event.target.composing) return;
        _vm.search = $event.target.value;
      }, _vm.filterResults]
    }
  }), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.isOpenAutocomplete,
      expression: "isOpenAutocomplete"
    }],
    staticClass: "auto"
  }, [_c('ul', _vm._l(_vm.filtered, function (result, i) {
    return _c('li', {
      key: i,
      on: {
        "mousedown": function mousedown($event) {
          return _vm.selectUserOrGroup(result);
        }
      }
    }, [_vm._v(" " + _vm._s(result.name + " (" + result.email + ")") + " ")]);
  }), 0)])]), _c('div', {
    staticClass: "control"
  }, [_c('div', {
    staticClass: "select is-dark"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.selectViewOrAdmin,
      expression: "selectViewOrAdmin"
    }],
    on: {
      "change": function change($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.selectViewOrAdmin = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
      }
    }
  }, _vm._l(_vm.viewOptions, function (option, index) {
    return _c('option', {
      key: index,
      attrs: {
        "disabled": option.disabled,
        "title": option.title
      },
      domProps: {
        "value": option.value
      }
    }, [_vm._v(" " + _vm._s(option.label) + " ")]);
  }), 0)])]), _c('div', {
    staticClass: "control is-narrow"
  }, [_c('div', {
    staticClass: "button is-outlined is-primary",
    on: {
      "click": _vm.saveSettings
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-save"
  })]), _c('span', [_vm._v("Add Selection")])])])])]), _vm.canEditFramework ? _c('div', {
    staticClass: "column is-12"
  }, [_vm.groups.length > 0 ? _c('div', {
    staticClass: "table-container"
  }, [_c('table', {
    staticClass: "table is-fullwidth"
  }, [_c('thead', [_c('tr', [_c('th', [_c('abbr', {
    attrs: {
      "title": "Username"
    }
  }, [_vm._v("Group Name")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "Access"
    }
  }, [_vm._v("View")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "Delete"
    }
  }, [_vm._v("Delete")])])])]), _c('tbody', _vm._l(_vm.groups, function (group) {
    return _c('tr', {
      key: group
    }, [_c('td', [_vm._v(" " + _vm._s(group.header))]), _c('td', [_c('div', {
      staticClass: "select is-small is-primary"
    }, [_c('select', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: group.view,
        expression: "group.view"
      }],
      on: {
        "change": [function ($event) {
          var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
            return o.selected;
          }).map(function (o) {
            var val = "_value" in o ? o._value : o.value;
            return val;
          });
          _vm.$set(group, "view", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
        }, function ($event) {
          group.changed = true;
          _vm.saveSettings();
        }]
      }
    }, _vm._l(_vm.viewOptions, function (option) {
      return _c('option', {
        key: option,
        domProps: {
          "value": option.value
        }
      }, [_vm._v(" " + _vm._s(option.label) + " ")]);
    }), 0)])]), _c('td', [_c('div', {
      staticClass: "button is-text is-small has-text-danger",
      attrs: {
        "disabled": group.currentUser && _vm.numGroupsAsOwner === 1 && group.view == 'admin' && _vm.cantRemoveCurrentUserAsOwner && !_vm.userIsOwner
      },
      on: {
        "click": function click($event) {
          return _vm.removeOwnerOrReader(group, 'group');
        }
      }
    }, [_c('div', {
      staticClass: "icon"
    }, [_c('i', {
      staticClass: "fa fa-trash"
    })])])])]);
  }), 0)])]) : _vm._e()]) : _vm._e(), _vm.canEditFramework ? _c('div', {
    staticClass: "column is-12"
  }, [_vm.users.length > 0 ? _c('div', {
    staticClass: "table-container"
  }, [_c('table', {
    staticClass: "table is-fullwidth"
  }, [_c('thead', [_c('tr', [_c('th', [_c('abbr', {
    attrs: {
      "title": "User name"
    }
  }, [_vm._v("User Name")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "User email"
    }
  }, [_vm._v("User Email")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "Access"
    }
  }, [_vm._v("View")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "Delete"
    }
  }, [_vm._v("Delete")])])])]), _c('tbody', _vm._l(_vm.users, function (user) {
    return _c('tr', {
      key: user
    }, [_c('td', [_vm._v(" " + _vm._s(user.header))]), _c('td', [_vm._v(" " + _vm._s(user.email))]), _c('td', [_c('div', {
      staticClass: "select is-primary is-small"
    }, [_c('select', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: user.view,
        expression: "user.view"
      }],
      on: {
        "change": [function ($event) {
          var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
            return o.selected;
          }).map(function (o) {
            var val = "_value" in o ? o._value : o.value;
            return val;
          });
          _vm.$set(user, "view", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
        }, function ($event) {
          user.changed = true;
          _vm.saveSettings();
        }]
      }
    }, _vm._l(_vm.viewOptions, function (option) {
      return _c('option', {
        key: option,
        domProps: {
          "value": option.value
        }
      }, [_vm._v(" " + _vm._s(option.label) + " ")]);
    }), 0)])]), _c('td', [_c('div', {
      staticClass: "button is-text is-small has-text-danger",
      attrs: {
        "disabled": _vm.cantRemoveCurrentUserAsOwner && user.currentUser && !_vm.numGroupsAsOwner
      },
      on: {
        "click": function click($event) {
          return _vm.removeOwnerOrReader(user, 'user');
        }
      }
    }, [_c('div', {
      staticClass: "icon"
    }, [_c('i', {
      staticClass: "fa fa-trash"
    })])])])]);
  }), 0)])]) : _vm._e()]) : _vm._e()]) : _vm._e()]) : _vm._e(), _c('template', {
    slot: "modal-foot"
  }, [!_vm.confirmMakePrivate && !_vm.confirmMakePublic ? _c('div', {
    staticClass: "buttons is-spaced"
  }, [_c('button', {
    staticClass: "button is-primary is-outlined",
    attrs: {
      "disabled": _vm.isProcessing
    },
    on: {
      "click": function click($event) {
        return _vm.$store.commit('app/closeModal');
      }
    }
  }, [_vm._v(" Done ")])]) : _vm._e(), _vm.confirmMakePrivate ? _c('div', {
    staticClass: "buttons is-centered"
  }, [_c('div', {
    staticClass: "button is-dark is-outlined",
    attrs: {
      "disabled": _vm.isProcessing
    },
    on: {
      "click": function click($event) {
        _vm.confirmMakePrivate = false;
      }
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-times"
  })]), _c('span', [_vm._v("cancel")])]), _c('div', {
    staticClass: "button is-primary is-outlined",
    attrs: {
      "disabled": _vm.isProcessing
    },
    on: {
      "click": _vm.makePrivate
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-check"
  })]), _c('span', [_vm._v("confirm make private")])])]) : _vm._e(), _vm.confirmMakePublic ? _c('div', {
    staticClass: "buttons is-centered"
  }, [_c('div', {
    staticClass: "button is-dark is-outlined",
    attrs: {
      "disabled": _vm.isProcessing
    },
    on: {
      "click": function click($event) {
        _vm.confirmMakePublic = false;
      }
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-times"
  })]), _c('span', [_vm._v("cancel")])]), _c('div', {
    staticClass: "button is-primary is-outlined",
    attrs: {
      "disabled": _vm.isProcessing
    },
    on: {
      "click": _vm.makePublic
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-check"
  })]), _c('span', [_vm._v("confirm make public")])])]) : _vm._e()])], 2);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/modalContent/Share.vue?vue&type=template&id=6b3a5f13

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
var regeneratorRuntime = __webpack_require__("c7eb");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__("a434");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__("5319");

// EXTERNAL MODULE: ./src/mixins/cassUtil.js
var cassUtil = __webpack_require__("6d79");

// EXTERNAL MODULE: ./src/components/modalContent/ModalTemplate.vue + 4 modules
var ModalTemplate = __webpack_require__("af07");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/Share.vue?vue&type=script&lang=js












/* harmony default export */ var Sharevue_type_script_lang_js = ({
  name: 'ShareModal',
  props: {
    isActive: Boolean
  },
  components: {
    ModalTemplate: ModalTemplate["a" /* default */]
  },
  mixins: [cassUtil["a" /* cassUtil */]],
  data: function data() {
    return {
      isProcessing: false,
      confirmMakePrivate: false,
      confirmMakePublic: false,
      clipStatus: 'ready',
      viewOptions: [{
        label: 'Edit/Share',
        value: 'admin',
        disabled: false,
        title: null
      }, {
        label: 'View',
        value: 'view',
        disabled: true,
        title: 'Make the ' + (this.$store.getters['editor/conceptMode'] ? 'concept scheme' : this.$store.getters['editor/progressionMode'] ? 'progression model' : 'framework') + ' private to add users/groups with view access'
      }],
      groups: [],
      users: [],
      search: "",
      filtered: [],
      possibleGroupsAndUsers: [],
      isOpenAutocomplete: false,
      userOrGroupToAdd: null,
      selectViewOrAdmin: "admin",
      removeReader: [],
      removeOwner: [],
      addReader: [],
      privateFramework: false,
      addOwner: [],
      repo: window.repo,
      conceptsProcessed: 0,
      conceptsToProcess: 0,
      cantRemoveCurrentUserAsOwner: false,
      ownerCount: 0,
      decryptingConcepts: false,
      toSave: [],
      frameworksToProcess: 0,
      numGroupsAsOwner: 0,
      userIsOwner: false
    };
  },
  computed: {
    loggedIn: function loggedIn() {
      if (EcIdentityManager.default.ids && EcIdentityManager.default.ids.length > 0) {
        return true;
      }
      return false;
    },
    shareableFrameworkInEditor: function shareableFrameworkInEditor() {
      var link = window.location.href;
      link = link.replace('/frameworks', '').replace('/directory', '');
      if (this.directory) {
        return link + "?directoryId=" + this.directory.shortId();
      } else if (this.$store.getters['editor/conceptMode'] === true || this.$store.getters['editor/progressionMode'] === true) {
        return link + "?concepts=true&frameworkId=" + this.frameworkId;
      }
      return link + "?frameworkId=" + this.frameworkId;
    },
    framework: function framework() {
      if (this.objFromListItemInfo && (this.objFromListItemInfo.type === "Framework" || this.objFromListItemInfo.type === "ConceptScheme")) {
        return this.objFromListItemInfo;
      }
      return this.$store.state.editor.framework;
    },
    frameworkId: function frameworkId() {
      if (this.framework) {
        return this.framework.shortId();
      }
      return null;
    },
    directory: function directory() {
      if (this.objFromListItemInfo && this.objFromListItemInfo.type === "Directory") {
        return this.objFromListItemInfo;
      } else if (this.objFromListItemInfo || this.$route.name === "framework" || this.$route.name === "conceptScheme") {
        return null;
      }
      return this.$store.getters['app/selectedDirectory'];
    },
    resource: function resource() {
      if (this.objFromListItemInfo && this.objFromListItemInfo.type === "CreativeWork") {
        return this.objFromListItemInfo;
      }
      return null;
    },
    frameworkName: function frameworkName() {
      if (this.directory) {
        return this.directory.name;
      }
      if (this.resource) {
        return this.resource.name;
      }
      if (this.framework.name) {
        return schema.Thing.getDisplayStringFrom(this.framework.name);
      } else {
        return schema.Thing.getDisplayStringFrom(this.framework["dcterms:title"]);
      }
    },
    queryParams: function queryParams() {
      return this.$store.getters['editor/queryParams'];
    },
    canEditFramework: function canEditFramework() {
      if (!this.loggedIn) {
        return false;
      }
      if (this.queryParams && this.queryParams.view === 'true') {
        return false;
      } else if (this.framework && !this.canEditAny(this.framework)) {
        return false;
      } else if (this.directory && !this.canEditAny(this.directory)) {
        return false;
      } else if (this.resource && !this.canEditAny(this.resource)) {
        return false;
      }
      return true;
    },
    loggedOnPerson: function loggedOnPerson() {
      return this.$store.getters['user/loggedOnPerson'];
    },
    objectType: function objectType() {
      if (this.resource) {
        return 'resource';
      }
      if (this.directory) {
        return 'directory';
      }
      return this.$store.getters['editor/conceptMode'] ? 'concept scheme' : this.$store.getters['editor/progressionMode'] ? 'progression model' : 'framework';
    },
    shareEnabled: function shareEnabled() {
      if (this.resource) {
        return false;
      }
      return this.$store.state.featuresEnabled.shareEnabled;
    },
    shareLink: function shareLink() {
      if (this.resource) {
        return false;
      }
      return this.$store.state.featuresEnabled.shareLink;
    },
    userManagementEnabled: function userManagementEnabled() {
      return this.$store.state.featuresEnabled.userManagementEnabled;
    },
    objFromListItemInfo: function objFromListItemInfo() {
      return this.$store.getters['app/objForShareModal'];
    }
  },
  mounted: function () {
    var _mounted = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee() {
      var type, obj;
      return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!(this.objFromListItemInfo && this.objFromListItemInfo.encryptedType)) {
              _context.next = 9;
              break;
            }
            type = "Ec" + this.object.encryptedType;
            obj = new window[type]();
            _context.t0 = obj;
            _context.next = 6;
            return EcEncryptedValue.fromEncryptedValue(this.object);
          case 6:
            _context.t1 = _context.sent;
            _context.t0.copyFrom.call(_context.t0, _context.t1);
            this.$store.commit('app/objForShareModal', obj);
          case 9:
            this.getCurrentOwnersAndReaders(true);
            this.checkIsPrivate();
          case 11:
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
    handlePrivateClick: function handlePrivateClick() {
      if (!this.privateFramework) {
        this.confirmMakePrivate = true;
      }
    },
    handlePublicClick: function handlePublicClick() {
      if (this.privateFramework) {
        this.confirmMakePublic = true;
      }
    },
    checkIsPrivate: function checkIsPrivate() {
      var obj = this.directory ? this.directory : this.resource ? this.resource : this.framework;
      delete EcRepository.cache[obj.shortId()];
      var me = this;
      EcRepository.get(obj.shortId(), function (success) {
        if (success.type === "EncryptedValue") {
          me.privateFramework = true;
          me.viewOptions[1].disabled = false;
          me.viewOptions[1].title = null;
          me.cantRemoveCurrentUserAsOwner = true;
        } else {
          me.privateFramework = false;
          me.viewOptions[1].disabled = true;
          me.viewOptions[1].title = 'Make the ' + me.objectType + ' private to add users/groups with view access';
          if (me.ownerCount < 2) {
            me.cantRemoveCurrentUserAsOwner = false;
          }
        }
      }, function (failure) {
        appError(failure);
      });
    },
    closeAutoComplete: function closeAutoComplete() {
      this.isOpenAutocomplete = false;
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
    getEachOwner: function getEachOwner(ownerPem) {
      var pk = EcPk.fromPem(ownerPem);
      var me = this;
      EcPerson.getByPk(window.repo, pk, function (success) {
        appLog(success);
        if (success) {
          var currentUser = false;
          if (me.loggedOnPerson.shortId() === success.shortId()) {
            currentUser = true;
            me.userIsOwner = true;
          }
          var user = {
            header: success.name,
            email: success.email,
            view: "admin",
            id: success.shortId(),
            changed: false,
            pk: pk,
            currentUser: currentUser
          };
          // don't add user if already in array
          if (me.users.filter(function (each) {
            return each.id === user.id;
          }).length === 0) {
            me.users.push(user);
            me.ownerCount++;
          }
        }
      }, function (failure) {
        // If it's not a Person, check organizations
        me.getOrganizationByEcPk(pk, function (success) {
          appLog(success);
          if (success) {
            var ownerFingerprint = pk.fingerprint();
            var currentUser = false;
            for (var each in EcIdentityManager.default.ids) {
              var idFingerprint = EcIdentityManager.default.ids[each].ppk.toPk().fingerprint();
              if (ownerFingerprint.equals(idFingerprint)) {
                currentUser = true;
                me.numGroupsAsOwner++;
              }
            }
            var org = {
              header: success.name,
              view: "admin",
              id: success.shortId(),
              changed: false,
              pk: pk,
              currentUser: currentUser
            };
            if (me.groups.filter(function (each) {
              return each.id === org.id;
            }).length === 0) {
              me.groups.push(org);
              me.ownerCount++;
            }
          }
        }, function (error) {
          appError(error);
        });
      });
    },
    getEachReader: function getEachReader(readerPem) {
      var me = this;
      var pk = EcPk.fromPem(readerPem);
      EcPerson.getByPk(window.repo, pk, function (success) {
        appLog(success);
        if (success) {
          var user = {
            header: success.name,
            email: success.email,
            view: "view",
            id: success.shortId(),
            changed: false,
            pk: pk
          };
          if (me.users.filter(function (each) {
            return each.id === user.id;
          }).length === 0) {
            me.users.push(user);
          }
        }
      }, function (failure) {
        // If it's not a Person, check organizations
        me.getOrganizationByEcPk(pk, function (success) {
          appLog(success);
          if (success) {
            var org = {
              header: success.name,
              view: "view",
              id: success.shortId(),
              changed: false,
              pk: pk
            };
            if (me.groups.filter(function (each) {
              return each.id === org.id;
            }).length === 0) {
              me.groups.push(org);
            }
          }
        }, function (error) {
          appError(error);
        });
      });
    },
    getCurrentOwnersAndReaders: function getCurrentOwnersAndReaders(getPossibleAfter) {
      var _this3 = this;
      var me = this;
      me.numGroupsAsOwner = 0;
      me.userIsOwner = false;
      var obj = this.directory ? this.directory : this.resource ? this.resource : this.framework;
      if (me.isAdmin()) {
        me.ownerCount++;
        me.userIsOwner = true;
      }
      if (obj.owner) {
        for (var i = 0; i < obj.owner.length; i++) {
          this.getEachOwner(obj.owner[i]);
        }
      }
      if (obj.reader) {
        this.cantRemoveCurrentUserAsOwner = true;
        for (var i = 0; i < obj.reader.length; i++) {
          this.getEachReader(obj.reader[i]);
        }
      }
      if (getPossibleAfter) {
        // May not need timeout after 'Cannot add a Reader if you don't know the secret' issue is resolved
        setTimeout(function () {
          _this3.getPossibleOwnersAndReaders();
        }, 4000);
      }
    },
    getPossibleOwnersAndReaders: function getPossibleOwnersAndReaders() {
      var paramObj = {};
      paramObj.size = 10000;
      var me = this;
      EcPerson.search(window.repo, '', function (success) {
        appLog(success);
        for (var i = 0; i < success.length; i++) {
          var person = {
            id: success[i].shortId(),
            name: success[i].name,
            email: success[i].email,
            pk: me.getPersonEcPk(success[i])
          };
          me.possibleGroupsAndUsers.push(person);
        }
      }, function (failure) {
        appError(failure);
      }, paramObj);
      EcOrganization.search(window.repo, '', /*#__PURE__*/function () {
        var _ref3 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee2(success) {
          var i, pk, org;
          return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                appLog(success);
                i = 0;
              case 2:
                if (!(i < success.length)) {
                  _context2.next = 10;
                  break;
                }
                _context2.next = 5;
                return me.getOrganizationEcPk(success[i]);
              case 5:
                pk = _context2.sent;
                if (pk) {
                  org = {
                    id: success[i].shortId(),
                    name: success[i].name,
                    pk: pk
                  };
                  me.possibleGroupsAndUsers.push(org);
                }
              case 7:
                i++;
                _context2.next = 2;
                break;
              case 10:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }));
        return function (_x) {
          return _ref3.apply(this, arguments);
        };
      }(), function (failure) {
        appError(failure);
      }, paramObj);
    },
    filterResults: function filterResults() {
      var _this4 = this;
      this.isOpenAutocomplete = true;
      this.filtered = this.possibleGroupsAndUsers.filter(function (item) {
        return item.name.toLowerCase().indexOf(_this4.search.toLowerCase()) !== -1;
      });
    },
    selectUserOrGroup: function selectUserOrGroup(nameAndId) {
      this.userOrGroupToAdd = nameAndId;
      this.search = nameAndId.name;
      this.isOpenAutocomplete = false;
    },
    saveSettings: function saveSettings() {
      this.populateAddAndRemoveArrays();
      this.addAndRemoveFromAllObjects();
    },
    populateAddAndRemoveArrays: function populateAddAndRemoveArrays() {
      this.isProcessing = true;
      for (var i = 0; i < this.users.length; i++) {
        if (this.users[i].changed) {
          if (this.users[i].view === "view") {
            this.removeOwner.push(this.users[i].pk);
            this.addReader.push(this.users[i].pk);
          } else if (this.users[i].view === "admin") {
            this.removeReader.push(this.users[i].pk);
            this.addOwner.push(this.users[i].pk);
          }
        }
      }
      for (var _i = 0; _i < this.groups.length; _i++) {
        if (this.groups[_i].changed) {
          if (this.groups[_i].view === "view") {
            this.removeOwner.push(this.groups[_i].pk);
            this.addReader.push(this.groups[_i].pk);
          } else if (this.groups[_i].view === "admin") {
            this.removeReader.push(this.groups[_i].pk);
            this.addOwner.push(this.groups[_i].pk);
          }
        }
      }
      if (this.userOrGroupToAdd) {
        if (this.selectViewOrAdmin === "view") {
          this.addReader.push(this.userOrGroupToAdd.pk);
        } else if (this.selectViewOrAdmin === "admin") {
          this.addOwner.push(this.userOrGroupToAdd.pk);
        }
      }
      // Make sure current user is added as an owner if a reader is being added, otherwise framework could become uneditable
      if (this.addReader.length > 0) {
        this.addOwner.push(EcIdentityManager.default.ids[0].ppk.toPk());
      }
    },
    multiput: function multiput(toSave, callback) {
      var me = this;
      this.frameworksToProcess--;
      if (this.frameworksToProcess <= 0) {
        this.repo.multiput(toSave, function (success) {
          me.resetVariables();
          me.confirmMakePublic = false;
          if (!me.confirmMakePrivate) {
            me.getCurrentOwnersAndReaders();
          }
          me.confirmMakePrivate = false;
          if (callback) {
            callback();
          }
        }, appError);
      }
    },
    addAndRemoveFromAllObjects: function addAndRemoveFromAllObjects() {
      if (this.resource) {
        return this.addAndRemoveFromResource(this.resource);
      }
      if (this.directory) {
        return this.addAndRemoveFromAllDirectoryObjects(this.directory);
      }
      if (this.$store.getters['editor/conceptMode'] === true || this.$store.getters['editor/progressionMode'] === true) {
        return this.addAndRemoveFromAllConceptObjects();
      }
      return this.addAndRemoveFromAllFrameworkObjects(this.framework);
    },
    addAndRemoveFromAllDirectoryObjects: function () {
      var _addAndRemoveFromAllDirectoryObjects = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee4(directory) {
        var me, i, _i2, _i3, _i4, children;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              me = this;
              for (i = 0; i < me.removeReader.length; i++) {
                directory.removeReader(me.removeReader[i]);
              }
              for (_i2 = 0; _i2 < me.removeOwner.length; _i2++) {
                directory.removeOwner(me.removeOwner[_i2]);
              }
              for (_i3 = 0; _i3 < me.addReader.length; _i3++) {
                directory.addReader(me.addReader[_i3]);
              }
              for (_i4 = 0; _i4 < me.addOwner.length; _i4++) {
                directory.addOwner(me.addOwner[_i4]);
              }
              me.toSave.push(directory);
              _context4.next = 8;
              return this.$store.dispatch('editor/getDirectoryChildren', directory);
            case 8:
              children = _context4.sent;
              window.repo.multiget(children, function (success) {
                me.frameworksToProcess += success.length;
                new EcAsyncHelper().each(success, /*#__PURE__*/function () {
                  var _ref4 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee3(obj, done) {
                    return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee3$(_context3) {
                      while (1) switch (_context3.prev = _context3.next) {
                        case 0:
                          if (obj.type === 'Framework' || obj.encryptedType === "Framework") {
                            me.addAndRemoveFromAllFrameworkObjects(obj);
                          } else if (obj.type === 'CreativeWork' || obj.encryptedType === "CreativeWork") {
                            me.addAndRemoveFromResource(obj);
                          } else if (obj.type === 'Directory' || obj.encryptedType === "Directory") {
                            me.frameworksToProcess--;
                            me.addAndRemoveFromAllDirectoryObjects(obj);
                          }
                          done();
                        case 2:
                        case "end":
                          return _context3.stop();
                      }
                    }, _callee3);
                  }));
                  return function (_x3, _x4) {
                    return _ref4.apply(this, arguments);
                  };
                }(), function (ids) {
                  if (ids.length === 0) {
                    me.multiput(me.toSave);
                  }
                });
              }, appError);
            case 10:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function addAndRemoveFromAllDirectoryObjects(_x2) {
        return _addAndRemoveFromAllDirectoryObjects.apply(this, arguments);
      }
      return addAndRemoveFromAllDirectoryObjects;
    }(),
    addAndRemoveFromResource: function addAndRemoveFromResource(resource) {
      for (var i = 0; i < this.removeReader.length; i++) {
        resource.removeReader(this.removeReader[i]);
      }
      for (var _i5 = 0; _i5 < this.removeOwner.length; _i5++) {
        resource.removeOwner(this.removeOwner[_i5]);
      }
      for (var _i6 = 0; _i6 < this.addReader.length; _i6++) {
        resource.addReader(this.addReader[_i6]);
      }
      for (var _i7 = 0; _i7 < this.addOwner.length; _i7++) {
        resource.addOwner(this.addOwner[_i7]);
      }
      this.toSave.push(resource);
      this.multiput(this.toSave);
    },
    addAndRemoveFromAllFrameworkObjects: function addAndRemoveFromAllFrameworkObjects(framework, passedInToSave) {
      var me = this;
      if (framework.competency && framework.competency.length > 0) {
        new EcAsyncHelper().each(framework.competency, function (competencyId, done) {
          EcCompetency.get(competencyId, function (c) {
            for (var i = 0; i < me.removeReader.length; i++) {
              c.removeReader(me.removeReader[i]);
            }
            for (var _i8 = 0; _i8 < me.removeOwner.length; _i8++) {
              c.removeOwner(me.removeOwner[_i8]);
            }
            for (var _i9 = 0; _i9 < me.addReader.length; _i9++) {
              c.addReader(me.addReader[_i9]);
            }
            for (var _i10 = 0; _i10 < me.addOwner.length; _i10++) {
              c.addOwner(me.addOwner[_i10]);
            }
            me.toSave.push(c);
            done();
          }, done);
        }, function (competencyIds) {
          if (framework.relation && framework.relation.length > 0) {
            new EcAsyncHelper().each(framework.relation, function (relationId, done) {
              EcAlignment.get(relationId, function (r) {
                for (var i = 0; i < me.removeReader.length; i++) {
                  r.removeReader(me.removeReader[i]);
                }
                for (var _i11 = 0; _i11 < me.removeOwner.length; _i11++) {
                  r.removeOwner(me.removeOwner[_i11]);
                }
                for (var _i12 = 0; _i12 < me.addReader.length; _i12++) {
                  r.addReader(me.addReader[_i12]);
                }
                for (var _i13 = 0; _i13 < me.addOwner.length; _i13++) {
                  r.addOwner(me.addOwner[_i13]);
                }
                me.toSave.push(r);
                done();
              }, done);
            }, function (relationIds) {
              me.addAndRemoveFromFrameworkObject(framework);
            });
          } else {
            me.addAndRemoveFromFrameworkObject(framework);
          }
        });
      } else {
        me.addAndRemoveFromFrameworkObject(framework);
      }
    },
    addAndRemoveFromFrameworkObject: function addAndRemoveFromFrameworkObject(f) {
      var me = this;
      for (var i = 0; i < me.removeReader.length; i++) {
        f.removeReader(me.removeReader[i]);
      }
      for (var _i14 = 0; _i14 < me.removeOwner.length; _i14++) {
        f.removeOwner(me.removeOwner[_i14]);
      }
      for (var _i15 = 0; _i15 < me.addReader.length; _i15++) {
        f.addReader(me.addReader[_i15]);
      }
      for (var _i16 = 0; _i16 < me.addOwner.length; _i16++) {
        f.addOwner(me.addOwner[_i16]);
      }
      me.toSave.push(f);
      me.multiput(me.toSave, function () {
        if (me.framework) {
          me.$store.commit('editor/framework', f);
        }
      }, function () {});
    },
    addAndRemoveFromAllConceptObjects: function addAndRemoveFromAllConceptObjects() {
      if (this.framework["skos:hasTopConcept"]) {
        this.addAndRemoveFromConceptArray(this.framework["skos:hasTopConcept"]);
      }
    },
    addAndRemoveFromConceptArray: function addAndRemoveFromConceptArray(concepts) {
      this.conceptsToProcess += concepts.length;
      var me = this;
      new EcAsyncHelper().each(concepts, function (conceptId, done) {
        EcConcept.get(conceptId, function (c) {
          for (var i = 0; i < me.removeReader.length; i++) {
            c.removeReader(me.removeReader[i]);
          }
          for (var _i17 = 0; _i17 < me.removeOwner.length; _i17++) {
            c.removeOwner(me.removeOwner[_i17]);
          }
          for (var _i18 = 0; _i18 < me.addReader.length; _i18++) {
            c.addReader(me.addReader[_i18]);
          }
          for (var _i19 = 0; _i19 < me.addOwner.length; _i19++) {
            c.addOwner(me.addOwner[_i19]);
          }
          if (c["skos:narrower"]) {
            me.addAndRemoveFromConceptArray(c["skos:narrower"]);
          }
          me.conceptsProcessed++;
          me.toSave.push(c);
          done();
        }, done);
      }, function () {});
    },
    removeOwnerOrReader: function removeOwnerOrReader(userOrGroup, type) {
      if (type === 'user') {
        if (this.cantRemoveCurrentUserAsOwner && userOrGroup.currentUser && !this.numGroupsAsOwner) {
          return;
        }
      } else if (type === 'group') {
        if (userOrGroup.currentUser && this.numGroupsAsOwner === 1 && userOrGroup.view === 'admin' && this.cantRemoveCurrentUserAsOwner && !this.userIsOwner) {
          return;
        }
      }
      if (userOrGroup.view === "view") {
        this.removeReader.push(userOrGroup.pk);
      } else if (userOrGroup.view === "admin") {
        this.removeOwner.push(userOrGroup.pk);
      }
      this.saveSettings();
    },
    resetVariables: function resetVariables() {
      var me = this;
      me.users.splice(0, me.users.length);
      me.groups.splice(0, me.groups.length);
      me.removeOwner.splice(0, me.removeOwner.length);
      me.removeReader.splice(0, me.removeReader.length);
      me.addOwner.splice(0, me.addOwner.length);
      me.addReader.splice(0, me.addReader.length);
      me.userOrGroupToAdd = null;
      me.search = "";
      me.conceptsProcessed = 0;
      me.conceptsToProcess = 0;
      me.isProcessing = false;
      if (!me.privateFramework) {
        me.cantRemoveCurrentUserAsOwner = false;
      }
      me.ownerCount = 0;
      me.selectViewOrAdmin = 'admin';
      me.toSave.splice(0, me.toSave.length);
      me.decryptingConcepts = false;
    },
    makePrivate: function makePrivate() {
      this.isProcessing = true;
      var framework = this.framework;
      this.$store.commit('editor/private', true);
      if (this.resource) {
        return this.handleMakePrivateResource(this.resource);
      }
      if (this.directory) {
        return this.handleMakePrivateDirectory(this.directory);
      }
      if (this.$store.getters['editor/conceptMode'] === true || this.$store.getters['editor/progressionMode'] === true) {
        this.handleMakePrivateConceptScheme();
      } else {
        this.handleMakePrivateFramework(framework);
      }
    },
    handleMakePrivateDirectory: function handleMakePrivateDirectory(directory) {
      var me = this;
      if (this.canEditAny(this.directory)) {
        if (!directory.owner) {
          directory.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
        }
        if (this.directory.shortId() === directory.shortId()) {
          // Make sure new owner gets into store
          this.$store.commit('app/selectDirectory', directory);
        }
        directory["schema:dateModified"] = new Date().toISOString();
        EcEncryptedValue.toEncryptedValue(directory, false, /*#__PURE__*/function () {
          var _ref5 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee5(edirectory) {
            var children;
            return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee5$(_context5) {
              while (1) switch (_context5.prev = _context5.next) {
                case 0:
                  me.toSave.push(edirectory);
                  _context5.next = 3;
                  return me.$store.dispatch('editor/getDirectoryChildren', edirectory);
                case 3:
                  children = _context5.sent;
                  window.repo.multiget(children, function (success) {
                    me.frameworksToProcess += success.length;
                    new EcAsyncHelper().each(success, function (obj, done) {
                      if (obj.type === 'Framework') {
                        me.handleMakePrivateFramework(obj);
                      } else if (obj.type === 'CreativeWork') {
                        me.handleMakePrivateResource(obj);
                      } else if (obj.type === 'Directory') {
                        me.frameworksToProcess--;
                        me.handleMakePrivateDirectory(obj);
                      } else {
                        me.frameworksToProcess--;
                      }
                      done();
                    }, function (ids) {
                      if (ids.length === 0) {
                        me.multiput(me.toSave);
                      }
                    });
                  }, appError);
                case 5:
                case "end":
                  return _context5.stop();
              }
            }, _callee5);
          }));
          return function (_x5) {
            return _ref5.apply(this, arguments);
          };
        }(), appError);
      }
    },
    handleMakePrivateResource: function handleMakePrivateResource(resource) {
      var me = this;
      if (this.canEditAny(resource)) {
        if (!resource.owner) {
          resource.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
        }
        if (this.resource) {
          this.$store.commit('app/objForShareModal', resource);
        }
        resource["schema:dateModified"] = new Date().toISOString();
        EcEncryptedValue.toEncryptedValue(resource, false, function (eresource) {
          me.toSave.push(eresource);
          me.multiput(me.toSave);
        }, appError);
      }
    },
    handleMakePrivateFramework: function handleMakePrivateFramework(framework) {
      var me = this;
      if (framework.competency && framework.competency.length > 0) {
        new EcAsyncHelper().each(framework.competency, function (competencyId, done) {
          EcCompetency.get(competencyId, function (c) {
            if (me.canEditAny(c)) {
              if (!c.owner) {
                c.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
              }
              c["schema:dateModified"] = new Date().toISOString();
              EcEncryptedValue.toEncryptedValue(c, false, function (ec) {
                me.toSave.push(ec);
                done();
              }, done);
            } else {
              done();
            }
          }, done);
        }, function (competencyIds) {
          if (framework.relation && framework.relation.length > 0) {
            new EcAsyncHelper().each(framework.relation, function (relationId, done) {
              EcAlignment.get(relationId, function (r) {
                if (!r.owner) {
                  r.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
                }
                EcEncryptedValue.toEncryptedValue(r, false, function (er) {
                  me.toSave.push(er);
                  done();
                }, done);
              }, done);
            }, function (relationIds) {
              me.encryptFramework(framework);
            });
          } else {
            me.encryptFramework(framework);
          }
        });
      } else {
        me.encryptFramework(framework);
      }
    },
    makePublic: function makePublic() {
      this.isProcessing = true;
      var framework = this.framework;
      this.$store.commit('editor/private', false);
      if (this.resource) {
        return this.handleMakePublicResource(this.resource);
      }
      if (this.directory) {
        return this.handleMakePublicDirectory(this.directory);
      }
      if (this.$store.getters['editor/conceptMode'] === true || this.$store.getters['editor/progressionMode'] === true) {
        this.handleMakePublicConceptScheme();
      } else {
        this.handleMakePublicFramework(framework);
      }
    },
    handleMakePublicDirectory: function () {
      var _handleMakePublicDirectory = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee6(directory) {
        var me, d, children;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              me = this;
              d = new EcDirectory();
              _context6.t0 = d;
              _context6.next = 5;
              return EcEncryptedValue.fromEncryptedValue(directory);
            case 5:
              _context6.t1 = _context6.sent;
              _context6.t0.copyFrom.call(_context6.t0, _context6.t1);
              d["schema:dateModified"] = new Date().toISOString();
              delete d.reader;
              EcEncryptedValue.encryptOnSave(d.id, false);
              me.toSave.push(d);
              if (this.directory.shortId() === d.shortId()) {
                this.$store.commit('app/selectDirectory', d);
              }
              _context6.next = 14;
              return this.$store.dispatch('editor/getDirectoryChildren', directory);
            case 14:
              children = _context6.sent;
              window.repo.multiget(children, function (success) {
                me.frameworksToProcess += success.length;
                new EcAsyncHelper().each(success, function (obj, done) {
                  if (obj.type === 'Framework' || obj.encryptedType === 'Framework') {
                    me.handleMakePublicFramework(obj);
                  } else if (obj.type === 'CreativeWork' || obj.encryptedType === 'CreativeWork') {
                    me.handleMakePublicResource(obj);
                  } else if (obj.type === 'Directory' || obj.encryptedType === 'Directory') {
                    me.frameworksToProcess--;
                    me.handleMakePublicDirectory(obj);
                  }
                  done();
                }, function (ids) {
                  if (ids.length === 0) {
                    me.multiput(me.toSave);
                  }
                });
              }, appError);
            case 16:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function handleMakePublicDirectory(_x6) {
        return _handleMakePublicDirectory.apply(this, arguments);
      }
      return handleMakePublicDirectory;
    }(),
    handleMakePublicResource: function () {
      var _handleMakePublicResource = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee7(resource) {
        var cw;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              cw = new schema.CreativeWork();
              _context7.t0 = cw;
              _context7.next = 4;
              return EcEncryptedValue.fromEncryptedValue(resource);
            case 4:
              _context7.t1 = _context7.sent;
              _context7.t0.copyFrom.call(_context7.t0, _context7.t1);
              cw["schema:dateModified"] = new Date().toISOString();
              delete cw.reader;
              EcEncryptedValue.encryptOnSave(cw.id, false);
              this.toSave.push(cw);
              if (this.resource) {
                this.$store.commit('app/objForShareModal', cw);
              }
              this.multiput(this.toSave);
            case 12:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function handleMakePublicResource(_x7) {
        return _handleMakePublicResource.apply(this, arguments);
      }
      return handleMakePublicResource;
    }(),
    handleMakePublicFramework: function () {
      var _handleMakePublicFramework = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee10(framework) {
        var me, f;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              me = this;
              f = new EcFramework();
              _context10.t0 = f;
              _context10.next = 5;
              return EcEncryptedValue.fromEncryptedValue(framework);
            case 5:
              _context10.t1 = _context10.sent;
              _context10.t0.copyFrom.call(_context10.t0, _context10.t1);
              f["schema:dateModified"] = new Date().toISOString();
              delete f.reader;
              EcEncryptedValue.encryptOnSave(f.id, false);
              me.toSave.push(f);
              if (this.framework) {
                me.$store.commit('editor/framework', f);
              }
              framework = f;
              if (framework.competency && framework.competency.length > 0) {
                new EcAsyncHelper().each(framework.competency, function (competencyId, done) {
                  EcRepository.get(competencyId, /*#__PURE__*/function () {
                    var _ref6 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee8(c) {
                      var d;
                      return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee8$(_context8) {
                        while (1) switch (_context8.prev = _context8.next) {
                          case 0:
                            if (!me.canEditAny(c)) {
                              _context8.next = 14;
                              break;
                            }
                            d = new EcCompetency();
                            _context8.t0 = d;
                            _context8.next = 5;
                            return EcEncryptedValue.fromEncryptedValue(c);
                          case 5:
                            _context8.t1 = _context8.sent;
                            _context8.t0.copyFrom.call(_context8.t0, _context8.t1);
                            d["schema:dateModified"] = new Date().toISOString();
                            delete d.reader;
                            EcEncryptedValue.encryptOnSave(d.id, false);
                            me.toSave.push(d);
                            done();
                            _context8.next = 15;
                            break;
                          case 14:
                            done();
                          case 15:
                          case "end":
                            return _context8.stop();
                        }
                      }, _callee8);
                    }));
                    return function (_x9) {
                      return _ref6.apply(this, arguments);
                    };
                  }(), done);
                }, function (competencyIds) {
                  if (framework.relation && framework.relation.length > 0) {
                    new EcAsyncHelper().each(framework.relation, function (relationId, done) {
                      EcRepository.get(relationId, /*#__PURE__*/function () {
                        var _ref7 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee9(r) {
                          var d;
                          return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee9$(_context9) {
                            while (1) switch (_context9.prev = _context9.next) {
                              case 0:
                                d = new EcAlignment();
                                _context9.t0 = d;
                                _context9.next = 4;
                                return EcEncryptedValue.fromEncryptedValue(r);
                              case 4:
                                _context9.t1 = _context9.sent;
                                _context9.t0.copyFrom.call(_context9.t0, _context9.t1);
                                delete d.reader;
                                EcEncryptedValue.encryptOnSave(d.id, false);
                                me.toSave.push(d);
                                done();
                              case 10:
                              case "end":
                                return _context9.stop();
                            }
                          }, _callee9);
                        }));
                        return function (_x10) {
                          return _ref7.apply(this, arguments);
                        };
                      }(), done);
                    }, function (relationIds) {
                      me.finishedMakingPublic();
                    });
                  } else {
                    me.finishedMakingPublic();
                  }
                });
              } else {
                me.finishedMakingPublic();
              }
            case 14:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this);
      }));
      function handleMakePublicFramework(_x8) {
        return _handleMakePublicFramework.apply(this, arguments);
      }
      return handleMakePublicFramework;
    }(),
    finishedMakingPublic: function finishedMakingPublic() {
      var me = this;
      this.multiput(this.toSave, function () {
        if (me.framework) {
          me.confirmMakePublic = false;
          me.isProcessing = false;
          me.resetVariables();
          me.getCurrentOwnersAndReaders();
        }
      });
    },
    encryptFramework: function encryptFramework(framework) {
      var me = this;
      var f = new EcFramework();
      f.copyFrom(framework);
      if (!f.owner) {
        f.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
      }
      if (this.framework) {
        // Make sure new owner gets into store
        this.$store.commit('editor/framework', f);
      }
      f["schema:dateModified"] = new Date().toISOString();
      EcEncryptedValue.toEncryptedValue(f, false, function (ef) {
        me.toSave.push(ef);
        me.multiput(me.toSave, function () {
          if (me.framework) {
            me.confirmMakePrivate = false;
            me.cantRemoveCurrentUserAsOwner = true;
            me.isProcessing = false;
            me.toSave.splice(0, me.toSave.length);
          }
        });
      }, appError);
    },
    handleMakePrivateConceptScheme: function () {
      var _handleMakePrivateConceptScheme = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee11() {
        var me, framework, cs, name;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              me = this;
              framework = this.framework;
              cs = new EcConceptScheme();
              cs.copyFrom(framework);
              if (!cs.owner) {
                cs.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
              }
              this.$store.commit('editor/framework', cs);
              name = cs["dcterms:title"];
              cs["schema:dateModified"] = new Date().toISOString();
              _context11.next = 10;
              return EcEncryptedValue.toEncryptedValue(cs);
            case 10:
              cs = _context11.sent;
              cs["dcterms:title"] = name;
              this.toSave.push(cs);
              if (framework["skos:hasTopConcept"]) {
                this.encryptConcepts(framework);
              } else {
                this.repo.multiput(this.toSave, function () {
                  me.confirmMakePrivate = false;
                  me.isProcessing = false;
                  me.toSave.splice(0, me.toSave.length);
                }, appError);
              }
            case 14:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this);
      }));
      function handleMakePrivateConceptScheme() {
        return _handleMakePrivateConceptScheme.apply(this, arguments);
      }
      return handleMakePrivateConceptScheme;
    }(),
    handleMakePublicConceptScheme: function () {
      var _handleMakePublicConceptScheme = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee12() {
        var me, framework, cs;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              me = this;
              framework = this.framework;
              cs = new EcConceptScheme();
              _context12.t0 = cs;
              _context12.next = 6;
              return EcEncryptedValue.fromEncryptedValue(framework);
            case 6:
              _context12.t1 = _context12.sent;
              _context12.t0.copyFrom.call(_context12.t0, _context12.t1);
              delete cs.reader;
              EcEncryptedValue.encryptOnSave(cs.id, false);
              cs["schema:dateModified"] = new Date().toISOString();
              me.decryptingConcepts = true;
              me.toSave.push(cs);
              me.$store.commit('editor/framework', cs);
              if (cs["skos:hasTopConcept"]) {
                me.decryptConcepts(cs);
              } else {
                me.finishedMakingPublic();
              }
            case 15:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this);
      }));
      function handleMakePublicConceptScheme() {
        return _handleMakePublicConceptScheme.apply(this, arguments);
      }
      return handleMakePublicConceptScheme;
    }(),
    encryptConcepts: function encryptConcepts(c) {
      var me = this;
      var concepts = c["skos:hasTopConcept"] ? c["skos:hasTopConcept"] : c["skos:narrower"];
      new EcAsyncHelper().each(concepts, function (conceptId, done) {
        EcRepository.get(conceptId, /*#__PURE__*/function () {
          var _ref8 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee13(concept) {
            return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee13$(_context13) {
              while (1) switch (_context13.prev = _context13.next) {
                case 0:
                  if (!concept.owner) {
                    concept.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
                  }
                  concept["schema:dateModified"] = new Date().toISOString();
                  if (concept["skos:narrower"] && concept["skos:narrower"].length > 0) {
                    me.encryptConcepts(concept);
                  }
                  if (!(EcEncryptedValue.encryptOnSaveMap[concept.id] !== true)) {
                    _context13.next = 7;
                    break;
                  }
                  _context13.next = 6;
                  return EcEncryptedValue.toEncryptedValue(concept);
                case 6:
                  concept = _context13.sent;
                case 7:
                  me.toSave.push(concept);
                  done();
                case 9:
                case "end":
                  return _context13.stop();
              }
            }, _callee13);
          }));
          return function (_x11) {
            return _ref8.apply(this, arguments);
          };
        }(), done);
      }, function (conceptIds) {
        me.repo.multiput(me.toSave, function () {
          me.confirmMakePrivate = false;
          me.isProcessing = false;
          me.toSave.splice(0, me.toSave.length);
        }, appError);
      });
    },
    decryptConcepts: function decryptConcepts(c) {
      var me = this;
      var concepts = c["skos:hasTopConcept"] ? c["skos:hasTopConcept"] : c["skos:narrower"];
      me.conceptsToProcess += concepts.length;
      new EcAsyncHelper().each(concepts, function (conceptId, done) {
        EcRepository.get(conceptId, /*#__PURE__*/function () {
          var _ref9 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee14(concept) {
            var c;
            return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee14$(_context14) {
              while (1) switch (_context14.prev = _context14.next) {
                case 0:
                  c = new EcConcept();
                  _context14.t0 = c;
                  _context14.next = 4;
                  return EcEncryptedValue.fromEncryptedValue(concept);
                case 4:
                  _context14.t1 = _context14.sent;
                  _context14.t0.copyFrom.call(_context14.t0, _context14.t1);
                  delete c.reader;
                  EcEncryptedValue.encryptOnSave(c.id, false);
                  if (c["skos:narrower"]) {
                    me.decryptConcepts(c);
                  }
                  c["schema:dateModified"] = new Date().toISOString();
                  me.conceptsProcessed++;
                  me.toSave.push(c);
                  done();
                case 13:
                case "end":
                  return _context14.stop();
              }
            }, _callee14);
          }));
          return function (_x12) {
            return _ref9.apply(this, arguments);
          };
        }(), done);
      }, function (conceptIds) {});
    },
    makeCurrentUserAnOwner: function makeCurrentUserAnOwner() {
      this.isProcessing = true;
      if (this.resource) {
        return this.makeCurrentUserResourceOwner(this.resource);
      }
      if (this.directory) {
        return this.makeCurrentUserDirectoryOwner(this.directory);
      }
      if (this.$store.getters['editor/conceptMode'] === true || this.$store.getters['editor/progressionMode'] === true) {
        return this.makeCurrentUserAnOwnerForConceptObjects();
      }
      this.makeCurrentUserFrameworkAndSubObjectOwner(this.framework);
    },
    makeCurrentUserDirectoryOwner: function () {
      var _makeCurrentUserDirectoryOwner = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee15(directory) {
        var me, children;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              me = this;
              directory.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
              me.toSave.push(directory);
              if (this.directory.shortId() === directory.shortId()) {
                this.$store.commit('app/selectDirectory', directory);
              }
              _context15.next = 6;
              return this.$store.dispatch('editor/getDirectoryChildren', directory);
            case 6:
              children = _context15.sent;
              window.repo.multiget(children, function (success) {
                me.frameworksToProcess += success.length;
                new EcAsyncHelper().each(success, function (obj, done) {
                  if (obj.type === 'Framework' || obj.encryptedType === "Framework") {
                    me.makeCurrentUserFrameworkAndSubObjectOwner(obj);
                  } else if (obj.type === 'CreativeWork' || obj.encryptedType === "CreativeWork") {
                    me.makeCurrentUserResourceOwner(obj);
                  } else if (obj.type === 'Directory' || obj.encryptedType === "Directory") {
                    me.frameworksToProcess--;
                    me.makeCurrentUserDirectoryOwner(obj);
                  }
                  done();
                }, function (ids) {
                  if (ids.length === 0) {
                    me.multiput(me.toSave);
                  }
                });
              }, appError);
            case 8:
            case "end":
              return _context15.stop();
          }
        }, _callee15, this);
      }));
      function makeCurrentUserDirectoryOwner(_x13) {
        return _makeCurrentUserDirectoryOwner.apply(this, arguments);
      }
      return makeCurrentUserDirectoryOwner;
    }(),
    makeCurrentUserResourceOwner: function makeCurrentUserResourceOwner(resource) {
      resource.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
      this.toSave.push(resource);
      this.multiput(this.toSave);
    },
    makeCurrentUserFrameworkAndSubObjectOwner: function makeCurrentUserFrameworkAndSubObjectOwner(framework) {
      var me = this;
      if (framework.competency && framework.competency.length > 0) {
        new EcAsyncHelper().each(framework.competency, function (competencyId, done) {
          EcCompetency.get(competencyId, function (c) {
            c.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
            me.toSave.push(c);
            done();
          }, done);
        }, function (competencyIds) {
          if (framework.relation && framework.relation.length > 0) {
            new EcAsyncHelper().each(framework.relation, function (relationId, done) {
              EcAlignment.get(relationId, function (r) {
                r.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
                me.toSave.push(r);
                done();
              }, done);
            }, function (relationIds) {
              me.makeCurrentUserFrameworkOwner(framework);
            });
          } else {
            me.makeCurrentUserFrameworkOwner(framework);
          }
        });
      } else {
        me.makeCurrentUserFrameworkOwner(framework);
      }
    },
    makeCurrentUserFrameworkOwner: function makeCurrentUserFrameworkOwner(framework) {
      var f = framework;
      var me = this;
      f.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
      me.toSave.push(f);
      me.multiput(me.toSave, function () {
        if (me.framework) {
          me.$store.commit('editor/framework', f);
        }
      }, function () {});
    },
    makeCurrentUserAnOwnerForConceptObjects: function makeCurrentUserAnOwnerForConceptObjects() {
      if (this.framework["skos:hasTopConcept"]) {
        this.makeCurrentUserAnOwnerForConcepts(this.framework["skos:hasTopConcept"]);
      }
    },
    makeCurrentUserAnOwnerForConcepts: function makeCurrentUserAnOwnerForConcepts(concepts) {
      this.conceptsToProcess += concepts.length;
      var me = this;
      new EcAsyncHelper().each(concepts, function (conceptId, done) {
        EcConcept.get(conceptId, function (c) {
          c.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
          if (c["skos:narrower"]) {
            me.makeCurrentUserAnOwnerForConcepts(c["skos:narrower"]);
          }
          me.conceptsProcessed++;
          me.toSave.push(c);
          done();
        }, done);
      }, function () {});
    }
  },
  watch: {
    conceptsProcessed: function conceptsProcessed() {
      if (this.conceptsToProcess && this.conceptsProcessed === this.conceptsToProcess) {
        if (this.decryptingConcepts === true) {
          this.finishedMakingPublic();
        } else {
          if (this.ownerCount > 0) {
            this.addAndRemoveFromFrameworkObject(this.framework);
          } else {
            this.makeCurrentUserFrameworkOwner(this.framework);
          }
        }
      }
    },
    confirmMakePublic: function confirmMakePublic() {
      this.checkIsPrivate();
    },
    confirmMakePrivate: function confirmMakePrivate() {
      this.checkIsPrivate();
      this.resetVariables();
      this.getCurrentOwnersAndReaders();
    },
    ownerCount: function ownerCount() {
      if (this.ownerCount > 1) {
        this.cantRemoveCurrentUserAsOwner = true;
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/modalContent/Share.vue?vue&type=script&lang=js
 /* harmony default export */ var modalContent_Sharevue_type_script_lang_js = (Sharevue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/modalContent/Share.vue?vue&type=style&index=0&id=6b3a5f13&prod&lang=scss
var Sharevue_type_style_index_0_id_6b3a5f13_prod_lang_scss = __webpack_require__("d7c43");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/modalContent/Share.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  modalContent_Sharevue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Share = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "d7c43":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Share_vue_vue_type_style_index_0_id_6b3a5f13_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("bc52");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Share_vue_vue_type_style_index_0_id_6b3a5f13_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Share_vue_vue_type_style_index_0_id_6b3a5f13_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ })

}]);
//# sourceMappingURL=chunk-719eeaef.29cf1888.js.map