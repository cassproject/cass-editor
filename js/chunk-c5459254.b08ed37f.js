(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-c5459254","chunk-2d0dab46","chunk-2d0dab46"],{

/***/ "4f29":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditorToolbar_vue_vue_type_style_index_0_id_18485fad_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6ff3");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditorToolbar_vue_vue_type_style_index_0_id_18485fad_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditorToolbar_vue_vue_type_style_index_0_id_18485fad_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


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
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("c14f");
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
        var _ref = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"])(/*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])().m(function _callee(ecoa) {
          var _iterator, _step, o, groupPpkSet, _iterator2, _step2, gPpk, _t, _t2, _t3;
          return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])().w(function (_context) {
            while (1) switch (_context.p = _context.n) {
              case 0:
                _iterator = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(ecoa);
                _context.p = 1;
                _iterator.s();
              case 2:
                if ((_step = _iterator.n()).done) {
                  _context.n = 14;
                  break;
                }
                o = _step.value;
                _context.p = 3;
                _context.n = 4;
                return o.getOrgKeys();
              case 4:
                groupPpkSet = _context.v;
                _iterator2 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(groupPpkSet);
                _context.p = 5;
                _iterator2.s();
              case 6:
                if ((_step2 = _iterator2.n()).done) {
                  _context.n = 8;
                  break;
                }
                gPpk = _step2.value;
                if (!(gPpk && gPpk.toPk().toPem().equals(ecPkPem))) {
                  _context.n = 7;
                  break;
                }
                successCallback(o);
                return _context.a(2);
              case 7:
                _context.n = 6;
                break;
              case 8:
                _context.n = 10;
                break;
              case 9:
                _context.p = 9;
                _t = _context.v;
                _iterator2.e(_t);
              case 10:
                _context.p = 10;
                _iterator2.f();
                return _context.f(10);
              case 11:
                _context.n = 13;
                break;
              case 12:
                _context.p = 12;
                _t2 = _context.v;
                // TODO Problem with EcOrganization update and creating encrypted value when only a reader...
                // Anticipated workaround....login as group owner and save it.
                // console.error("TODO...fix this...needs FRITZ input!!!!: " + e.toString());
                failureCallback(_t2.toString());
              case 13:
                _context.n = 2;
                break;
              case 14:
                _context.n = 16;
                break;
              case 15:
                _context.p = 15;
                _t3 = _context.v;
                _iterator.e(_t3);
              case 16:
                _context.p = 16;
                _iterator.f();
                return _context.f(16);
              case 17:
                successCallback(null);
              case 18:
                return _context.a(2);
            }
          }, _callee, null, [[5, 9, 10, 11], [3, 12], [1, 15, 16, 17]]);
        }));
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }(), function (err) {
        failureCallback(err);
      }, paramObj);
    },
    getOrganizationEcPk: function getOrganizationEcPk(orgObj) {
      return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"])(/*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])().m(function _callee2() {
        var _t4;
        return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              _context2.n = 1;
              return orgObj.getCurrentOrgKey();
            case 1:
              return _context2.a(2, _context2.v.toPk());
            case 2:
              _context2.p = 2;
              _t4 = _context2.v;
              return _context2.a(2, null);
          }
        }, _callee2, null, [[0, 2]]);
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

/***/ "6ff3":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "e672":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"415155bd-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/framework/EditorToolbar.vue?vue&type=template&id=18485fad
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    attrs: {
      "id": "framework-editor-toolbar"
    }
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "columns is-mobile"
  }, [_c('div', {
    staticClass: "column is-narrow"
  }, [_c('div', {
    staticClass: "buttons"
  }, [_c('div', {
    staticClass: "button is-text has-text-dark",
    class: _vm.activeView === 'primary' ? 'has-text-primary' : 'has-text-dark',
    attrs: {
      "title": "View only primary properties"
    },
    on: {
      "click": function click($event) {
        return _vm.changeProperties('primary');
      }
    }
  }, [_vm._m(0), _c('span', {
    staticClass: "is-hidden-touch"
  }, [_vm._v(_vm._s(_vm.ceasnDataFields ? "Low Detail" : "Primary"))]), _c('span', {
    staticClass: "is-hidden-desktop"
  }, [_vm._v("1st")])]), _c('div', {
    staticClass: "button is-text",
    class: _vm.activeView === 'secondary' ? 'has-text-primary' : 'has-text-dark',
    attrs: {
      "title": "View primary and secondary properties"
    },
    on: {
      "click": function click($event) {
        return _vm.changeProperties('secondary');
      }
    }
  }, [_vm.activeView === 'primary' ? _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fas fa-square"
  })]) : _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fas fa-check-square"
  })]), _c('span', {
    staticClass: "is-hidden-touch"
  }, [_vm._v(_vm._s(_vm.ceasnDataFields ? "Moderate Detail" : "Secondary"))]), _c('span', {
    staticClass: "is-hidden-desktop"
  }, [_vm._v("2nd")])]), _c('div', {
    staticClass: "button is-text",
    class: _vm.activeView === 'tertiary' ? 'has-text-primary' : 'has-text-dark',
    attrs: {
      "title": "View all properties"
    },
    on: {
      "click": function click($event) {
        return _vm.changeProperties('tertiary');
      }
    }
  }, [_vm.activeView === 'tertiary' ? _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fas fa-check-square"
  })]) : _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fas fa-square"
  })]), _c('span', {
    staticClass: "is-hidden-touch"
  }, [_vm._v(_vm._s(_vm.ceasnDataFields ? "High Detail" : "Tertiary"))]), _c('span', {
    staticClass: "is-hidden-desktop"
  }, [_vm._v("3rd")])])])]), _vm._m(1), _vm.showAddComments || _vm.showViewComments ? _c('div', {
    staticClass: "column is-narrow"
  }, [_c('div', {
    staticClass: "buttons"
  }, [_vm.showViewComments ? _c('div', {
    staticClass: "button is-text has-text-dark",
    attrs: {
      "title": "View all comments"
    },
    on: {
      "click": function click($event) {
        return _vm.$store.commit('app/showRightAside', 'Comments');
      }
    }
  }, [_vm._m(2)]) : _vm._e()])]) : _vm._e(), _vm.showAddComments || _vm.showViewComments ? _c('div', {
    staticClass: "column is-narrow"
  }, [_c('div', {
    staticClass: "vl"
  })]) : _vm._e(), _vm.canEditFramework ? _c('div', {
    staticClass: "column is-narrow"
  }, [_c('div', {
    staticClass: "buttons"
  }, [_c('div', {
    staticClass: "button is-text has-text-dark",
    attrs: {
      "title": "Undo recent change"
    },
    on: {
      "click": _vm.onClickUndo
    }
  }, [_vm._m(3)])])]) : _vm._e(), _vm.canEditFramework ? _c('div', {
    staticClass: "column is-narrow"
  }, [_c('div', {
    staticClass: "vl"
  })]) : _vm._e(), _vm.canExport ? _c('div', {
    staticClass: "column is-narrow"
  }, [_c('div', {
    staticClass: "button is-text has-text-dark",
    class: {
      'is-disabled': !_vm.canExport
    },
    attrs: {
      "title": "Export framework"
    },
    on: {
      "click": function click($event) {
        return _vm.handleExportClick();
      }
    }
  }, [_vm._m(4)])]) : _c('div', {
    staticClass: "column is-narrow"
  }, [_c('div', {
    staticClass: "button is-text has-text-dark",
    class: {
      'is-disabled': !_vm.canExport
    },
    attrs: {
      "title": "Export unavailable",
      "disabled": "true"
    }
  }, [_vm._m(5)])]), _vm.showUserManagementIcon ? _c('div', {
    staticClass: "column is-narrow"
  }, [_vm.loggedIn ? _c('div', {
    staticClass: "button is-text has-text-dark",
    attrs: {
      "title": "Manage users"
    },
    on: {
      "click": function click($event) {
        _vm.showManageUsersModal();
        _vm.showShareDropdown = false;
      }
    }
  }, [_vm._m(6)]) : _vm.shareEnabled || _vm.shareLink ? _c('div', {
    staticClass: "button is-text has-text-dark",
    attrs: {
      "title": "Get shareable link"
    },
    on: {
      "click": function click($event) {
        _vm.showManageUsersModal();
        _vm.showShareDropdown = false;
      }
    }
  }, [_vm._m(7)]) : _vm._e()]) : _vm._e(), !_vm.showUserManagementIcon ? _c('div', {
    staticClass: "column is-narrow"
  }, [_vm.shareEnabled || _vm.shareLink ? _c('div', {
    staticClass: "button is-text has-text-dark",
    attrs: {
      "title": "Get shareable link"
    },
    on: {
      "click": function click($event) {
        _vm.showManageUsersModal();
        _vm.showShareDropdown = false;
      }
    }
  }, [_vm._m(8)]) : _vm._e()]) : _vm._e(), _vm.configurationsEnabled && _vm.canEditFramework ? _c('div', {
    staticClass: "column is-narrow"
  }, [_c('div', {
    staticClass: "vl test"
  })]) : _vm._e(), _vm.configurationsEnabled ? _c('div', {
    staticClass: "column is-narrow"
  }, [_vm.canEditFramework && !_vm.progressionMode ? _c('div', {
    staticClass: "button is-text has-text-dark is-pulled-right not-lowercase",
    attrs: {
      "title": "Framework configuration"
    },
    on: {
      "click": function click($event) {
        _vm.showManageConfigurationModal();
        _vm.showShareDropdown = false;
      }
    }
  }, [_vm._m(9), _c('span', {
    staticClass: "is-hidden-touch"
  }, [_vm._v(_vm._s(_vm.getConfigurationName || "No Configuration"))])]) : _vm._e()]) : _vm._e(), _vm.directoryId ? _c('div', {
    staticClass: "column is-narrow"
  }, [_c('div', {
    staticClass: "vl"
  })]) : _vm._e(), _vm.directoryId ? _c('div', {
    staticClass: "column is-narrow",
    on: {
      "click": _vm.goToDirectory
    }
  }, [_c('div', {
    staticClass: "button is-text has-text-dark"
  }, [_vm._v(" Go to directory ")])]) : _vm._e(), _vm.canManageAssertions ? _c('div', {
    staticClass: "column is-narrow"
  }, [_c('div', {
    staticClass: "vl"
  })]) : _vm._e(), _vm.canManageAssertions ? _c('div', {
    staticClass: "column is-narrow",
    attrs: {
      "id": "manageAssertionsButton"
    },
    on: {
      "click": _vm.manageAssertions
    }
  }, [_c('div', {
    staticClass: "button is-text has-text-dark",
    class: {
      'is-loading': _vm.$store.getters['editor/searchingAssertions']
    }
  }, [_vm.managingAssertions ? [_vm._v(" Stop Managing Assertions ")] : [_vm._v(" Manage Assertions ")]], 2)]) : _vm._e(), _vm.ceasnDataFields || _vm.ceasnDataFields === false ? _c('div', {
    staticClass: "column is-narrow"
  }, [_c('div', {
    staticClass: "vl"
  })]) : _vm._e(), _vm.ceasnDataFields || _vm.ceasnDataFields === false ? _c('div', {
    staticClass: "column"
  }, [_vm._m(10)]) : _vm._e()])])]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fas fa-check-square"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "column is-narrow"
  }, [_c('div', {
    staticClass: "vl"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fas fa-comments"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fas fa-undo-alt"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fas fa-file-export"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fas fa-file-export"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fas fa-users"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fas fa-share"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fas fa-share"
  })]);
}, function () {
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
  return _c('div', {
    staticClass: "buttons is-pulled-right"
  }, [_c('a', {
    staticClass: "button is-primary is-outlined",
    attrs: {
      "href": "docs/authoring/competency-and-framework-management/#creating-a-new-competency-framework",
      "target": "_blank",
      "title": "Go to documentation on creating a new competency framework"
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "far fa-question-circle"
  })]), _c('span', [_vm._v(" Help ")])])]);
}];

// CONCATENATED MODULE: ./src/components/framework/EditorToolbar.vue?vue&type=template&id=18485fad

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
var createForOfIteratorHelper = __webpack_require__("b85c");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regenerator.js + 1 modules
var regenerator = __webpack_require__("c14f");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.iterator.constructor.js
var es_iterator_constructor = __webpack_require__("e9f5");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.iterator.map.js
var es_iterator_map = __webpack_require__("ab43");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__("5319");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.search.js
var es_string_search = __webpack_require__("841c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.starts-with.js
var es_string_starts_with = __webpack_require__("2ca0");

// EXTERNAL MODULE: ./src/mixins/common.js
var common = __webpack_require__("872c");

// EXTERNAL MODULE: ./src/mixins/cassUtil.js
var cassUtil = __webpack_require__("6d79");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/framework/EditorToolbar.vue?vue&type=script&lang=js
















/* harmony default export */ var EditorToolbarvue_type_script_lang_js = ({
  name: 'EditorToolbar',
  mixins: [common["a" /* default */], cassUtil["a" /* cassUtil */]],
  props: {
    properties: {
      type: String,
      default: 'primary'
    }
  },
  data: function data() {
    return {
      showPropertyViewDropDown: false,
      showShareDropdown: false,
      activeView: "primary",
      repo: window.repo,
      editsFinishedCounter: 0,
      totalEditsCounter: 0,
      privateFramework: false
    };
  },
  methods: {
    closeViewDropDown: function closeViewDropDown() {
      if (this.showPropertyViewDropDown) {
        this.showPropertyViewDropDown = false;
      }
    },
    closeShareDropDown: function closeShareDropDown() {
      if (this.showShareDropdown) {
        this.showShareDropdown = false;
      }
    },
    handleExportClick: function handleExportClick() {
      if (this.canExport) {
        this.$emit('show-export-modal');
        this.showShareDropdown = false;
      }
    },
    handleClickAddComment: function handleClickAddComment() {
      this.$store.commit('editor/setAddCommentAboutId', this.$store.getters['editor/framework'].shortId());
      this.$store.commit('editor/setAddCommentType', 'new');
      this.$store.commit('app/showModal', {
        component: 'AddComment'
      });
    },
    showExportModal: function showExportModal() {
      this.$store.commit('app/showModal', 'Export');
    },
    showManageUsersModal: function showManageUsersModal() {
      this.$store.commit('app/showModal', {
        component: 'Share'
      });
    },
    showManageConfigurationModal: function showManageConfigurationModal() {
      this.$store.commit('app/showModal', {
        component: 'FrameworkConfiguration'
      });
    },
    changeProperties: function changeProperties(type) {
      var properties = this.properties;
      var newType = type;
      /* If clicking something that is selected, reduce
         to lower level view, essentially unclicking */
      if (newType === 'secondary' && properties === 'secondary') {
        newType = 'primary';
      } else if (newType === 'tertiary' && properties === 'tertiary') {
        newType = 'secondary';
      }
      this.$emit('change-properties', newType);
      this.showPropertyViewDropDown = false;
      this.activeView = newType;
    },
    onClickUndo: function onClickUndo() {
      var _this = this;
      this.$Progress.start();
      this.$store.dispatch('editor/lastEditToUndo').then(function (editToUndo) {
        if (editToUndo) {
          if (!EcArray.isArray(editToUndo)) {
            editToUndo = [editToUndo];
          }
          _this.totalEditsCounter += editToUndo.length;
          for (var i = 0; i < editToUndo.length; i++) {
            var editType = editToUndo[i].operation;
            if (editType === "addNew") {
              _this.undoAdd(editToUndo[i].id);
            } else if (editType === "delete") {
              _this.undoDelete(editToUndo[i].obj);
            } else if (editType === "update") {
              _this.undoUpdate(editToUndo[i]);
            }
          }
        }
        _this.$store.commit('editor/setLastEditToUndo', null);
      });
    },
    undoAdd: function undoAdd(id) {
      var _this2 = this;
      return Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee() {
        var me, obj;
        return Object(regenerator["a" /* default */])().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              // Delete
              me = _this2;
              _context.n = 1;
              return EcRepository.get(id);
            case 1:
              obj = _context.v;
              _this2.repo.deleteRegistered(obj, function () {
                me.editsFinishedCounter++;
              }, function (failure) {
                appLog(failure);
                me.editsFinishedCounter++;
                me.$Progress.fail();
              });
            case 2:
              return _context.a(2);
          }
        }, _callee);
      }))();
    },
    undoDelete: function undoDelete(obj) {
      // Re-add
      var toSave = obj;
      var me = this;
      if (obj.type === "Concept") {
        toSave = new EcConcept();
        toSave.copyFrom(obj);
      }
      this.repo.saveTo(toSave, function () {
        me.editsFinishedCounter++;
        me.$Progress.finish();
      }, function (failure) {
        appLog(failure);
        me.editsFinishedCounter++;
        me.$Progress.fail();
      });
    },
    undoUpdate: function undoUpdate(update) {
      // Revert to initial value
      var me = this;
      EcRepository.get(update.id, function (success) {
        if (update.expandedProperty) {
          return me.undoUpdateWithExpandedProperty(update, success);
        }
        for (var i = 0; i < update.fieldChanged.length; i++) {
          success[update.fieldChanged[i]] = update.initialValue[i];
        }
        me.repo.saveTo(success, function () {
          me.editsFinishedCounter++;
          me.$Progress.finish();
        }, function () {
          me.editsFinishedCounter++;
          me.$Progress.fail();
        });
        me.$store.commit('editor/changedObject', success.shortId());
      }, function (error) {
        appError(error);
        me.editsFinishedCounter++;
        me.$Progress.fail();
      });
    },
    undoUpdateWithExpandedProperty: function undoUpdateWithExpandedProperty(update, updatedObject) {
      var me = this;
      this.expand(updatedObject, function (expanded) {
        for (var i = 0; i < update.fieldChanged.length; i++) {
          expanded[update.fieldChanged[i]] = update.initialValue[i];
          if (expanded[update.fieldChanged[i]].length === 0) {
            delete expanded[update.fieldChanged[i]];
          }
          me.saveExpanded(expanded);
        }
      });
    },
    expand: function () {
      var _expand = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee2(o, after) {
        var toExpand, expanded, _t;
        return Object(regenerator["a" /* default */])().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              toExpand = JSON.parse(o.toJson());
              if (toExpand["@context"] != null && toExpand["@context"].startsWith("http://")) {
                toExpand["@context"] = toExpand["@context"].replace("http://", "https://");
              }
              if (toExpand["@context"] != null && toExpand["@context"].indexOf("skos") !== -1) {
                toExpand["@context"] = "https://schema.cassproject.org/0.4/skos/";
              }
              _context2.p = 1;
              _context2.n = 2;
              return jsonld.expand(toExpand);
            case 2:
              expanded = _context2.v;
              after(expanded[0]);
              _context2.n = 4;
              break;
            case 3:
              _context2.p = 3;
              _t = _context2.v;
              after(null);
            case 4:
              return _context2.a(2);
          }
        }, _callee2, null, [[1, 3]]);
      }));
      function expand(_x, _x2) {
        return _expand.apply(this, arguments);
      }
      return expand;
    }(),
    saveExpanded: function () {
      var _saveExpanded = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee3(expandedCompetency) {
        var me, context, compacted, rld, _t2;
        return Object(regenerator["a" /* default */])().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              me = this;
              context = "https://schema.cassproject.org/0.4";
              if (expandedCompetency["@type"][0].toLowerCase().indexOf("concept") !== -1) {
                context = "https://schema.cassproject.org/0.4/skos";
              }
              _context3.p = 1;
              _context3.n = 2;
              return jsonld.compact(expandedCompetency, this.$store.state.lode.rawSchemata[context]);
            case 2:
              compacted = _context3.v;
              if (!compacted) {
                _context3.n = 5;
                break;
              }
              rld = new EcRemoteLinkedData();
              rld.copyFrom(compacted);
              rld.context = context;
              delete rld["@context"];
              rld = me.turnFieldsBackIntoArrays(rld);
              rld["schema:dateModified"] = new Date().toISOString();
              if (!(me.$store.state.editor && me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[rld.id] !== true)) {
                _context3.n = 4;
                break;
              }
              _context3.n = 3;
              return EcEncryptedValue.toEncryptedValue(rld);
            case 3:
              rld = _context3.v;
            case 4:
              me.repo.saveTo(rld, function () {
                me.editsFinishedCounter++;
              }, function (error) {
                appError(error);
                me.editsFinishedCounter++;
              });
            case 5:
              _context3.n = 7;
              break;
            case 6:
              _context3.p = 6;
              _t2 = _context3.v;
              appError(_t2);
            case 7:
              return _context3.a(2);
          }
        }, _callee3, this, [[1, 6]]);
      }));
      function saveExpanded(_x3) {
        return _saveExpanded.apply(this, arguments);
      }
      return saveExpanded;
    }(),
    // Compact operation removes arrays when length is 1, but some fields need to be arrays in the data that's saved
    turnFieldsBackIntoArrays: function turnFieldsBackIntoArrays(rld) {
      var fields = ["owner", "reader", "signature", "signatureSha256", "competency", "level", "relation", "skos:hasTopConcept", "skos:narrower", "skos:broader", "skos:broadMatch", "skos:closeMatch", "skos:exactMatch", "skos:narrowMatch", "skos:related"];
      for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        if (rld[field] && !EcArray.isArray(rld[field])) {
          rld[field] = [rld[field]];
        }
      }
      return rld;
    },
    goToDirectory: function goToDirectory() {
      var me = this;
      EcDirectory.get(this.directoryId, function (success) {
        me.$store.commit('app/selectDirectory', success);
        me.$router.push({
          name: "directory"
        });
      }, appError);
    },
    checkIsPrivate: function checkIsPrivate() {
      var obj = this.framework;
      delete EcRepository.cache[obj.shortId()];
      var me = this;
      EcRepository.get(obj.shortId(), function (success) {
        if (success.type === "EncryptedValue") {
          me.privateFramework = true;
        } else {
          me.privateFramework = false;
        }
      }, function (failure) {
        appError(failure);
      });
    },
    manageAssertions: function () {
      var _manageAssertions = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee4() {
        var _this3 = this;
        return Object(regenerator["a" /* default */])().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              if (this.managingAssertions) {
                this.$store.commit('editor/setManageAssertions', false);
              } else {
                EcPerson.search(window.repo, '*').then(function (people) {
                  _this3.$store.commit('editor/setPeople', people.map(function (x) {
                    return {
                      name: x.name,
                      key: x.owner[0]
                    };
                  }));
                });
                this.$store.dispatch('editor/searchForAssertions').then(function () {
                  _this3.$store.commit('editor/setManageAssertions', true);
                }).catch(function () {
                  // TODO: Handle assertion search error
                });
              }
            case 1:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function manageAssertions() {
        return _manageAssertions.apply(this, arguments);
      }
      return manageAssertions;
    }()
  },
  asyncComputed: {
    getConfigurationName: function () {
      var _getConfigurationName = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee5() {
        var config, _config, ca, _iterator, _step, c, _t3;
        return Object(regenerator["a" /* default */])().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              if (!this.$store.getters['editor/framework'].configuration) {
                _context5.n = 4;
                break;
              }
              _context5.n = 1;
              return EcRepository.get(this.$store.getters['editor/framework'].configuration);
            case 1:
              config = _context5.v;
              if (!config) {
                _context5.n = 2;
                break;
              }
              return _context5.a(2, config.name);
            case 2:
              return _context5.a(2, "No configuration");
            case 3:
              _context5.n = 17;
              break;
            case 4:
              if (!localStorage.getItem("cassAuthoringToolDefaultBrowserConfigId")) {
                _context5.n = 8;
                break;
              }
              _context5.n = 5;
              return EcRepository.get(localStorage.getItem("cassAuthoringToolDefaultBrowserConfigId"));
            case 5:
              _config = _context5.v;
              if (!_config) {
                _context5.n = 6;
                break;
              }
              return _context5.a(2, _config.name);
            case 6:
              return _context5.a(2, "No configuration");
            case 7:
              _context5.n = 17;
              break;
            case 8:
              _context5.n = 9;
              return window.repo.searchWithParams("@type:Configuration", {
                'size': 10000
              }, null);
            case 9:
              ca = _context5.v;
              _iterator = Object(createForOfIteratorHelper["a" /* default */])(ca);
              _context5.p = 10;
              _iterator.s();
            case 11:
              if ((_step = _iterator.n()).done) {
                _context5.n = 13;
                break;
              }
              c = _step.value;
              if (!(c.isDefault === true || c.isDefault === "true")) {
                _context5.n = 12;
                break;
              }
              return _context5.a(2, c.name);
            case 12:
              _context5.n = 11;
              break;
            case 13:
              _context5.n = 15;
              break;
            case 14:
              _context5.p = 14;
              _t3 = _context5.v;
              _iterator.e(_t3);
            case 15:
              _context5.p = 15;
              _iterator.f();
              return _context5.f(15);
            case 16:
              return _context5.a(2, "No Configuration");
            case 17:
              return _context5.a(2);
          }
        }, _callee5, this, [[10, 14, 15, 16]]);
      }));
      function getConfigurationName() {
        return _getConfigurationName.apply(this, arguments);
      }
      return getConfigurationName;
    }()
  },
  computed: {
    showAddComments: function showAddComments() {
      if (this.$store.getters['editor/conceptMode'] === true) {
        return false;
      }
      if (this.$store.getters['editor/progressionMode'] === true) {
        return false;
      }
      return this.$store.state.app.canAddComments;
    },
    showViewComments: function showViewComments() {
      if (this.$store.getters['editor/conceptMode'] === true) {
        return false;
      }
      if (this.$store.getters['editor/progressionMode'] === true) {
        return false;
      }
      return this.$store.state.app.canViewComments;
    },
    framework: function framework() {
      return this.$store.state.editor.framework;
    },
    queryParams: function queryParams() {
      return this.$store.getters['editor/queryParams'];
    },
    ceasnDataFields: function ceasnDataFields() {
      return this.queryParams.ceasnDataFields === 'true';
    },
    canEditFramework: function canEditFramework() {
      if (this.queryParams && this.queryParams.view === 'true') {
        return false;
      } else if (!this.canEditAny(this.framework)) {
        return false;
      }
      return true;
    },
    loggedIn: function loggedIn() {
      if (EcIdentityManager.default.ids && EcIdentityManager.default.ids.length > 0) {
        return true;
      }
      return false;
    },
    loggedInPerson: function loggedInPerson() {
      return this.$store.getters['user/loggedOnPerson'];
    },
    configuration: function configuration() {
      return this.$store.getters['editor/framework'].configuration;
    },
    conceptMode: function conceptMode() {
      return this.$store.getters['editor/conceptMode'];
    },
    progressionMode: function progressionMode() {
      return this.$store.getters['editor/progressionMode'];
    },
    canExport: function canExport() {
      if (this.$store.state.editor.private) {
        return false;
      } else if (this.framework.reader && this.framework.reader.length > 0) {
        return false;
      } else if (this.privateFramework) {
        return false;
      } else {
        return true;
      }
    },
    configurationsEnabled: function configurationsEnabled() {
      return this.$store.state.featuresEnabled.configurationsEnabled;
    },
    shareEnabled: function shareEnabled() {
      return this.$store.state.featuresEnabled.shareEnabled;
    },
    shareLink: function shareLink() {
      return this.$store.state.featuresEnabled.shareLink;
    },
    userManagementEnabled: function userManagementEnabled() {
      return this.$store.state.featuresEnabled.userManagementEnabled;
    },
    showUserManagementIcon: function showUserManagementIcon() {
      if (!this.shareEnabled && !this.canEditFramework) {
        return false;
      }
      if (!this.shareEnabled && !this.userManagementEnabled) {
        return false;
      }
      return true;
    },
    directoryId: function directoryId() {
      return this.framework.directory;
    },
    canManageAssertions: function canManageAssertions() {
      if (this.queryParams.disableAssertions !== 'true' && this.loggedInPerson && this.loggedInPerson.name && !this.conceptMode && !this.progressionMode) {
        return true;
      }
      return false;
    },
    managingAssertions: function managingAssertions() {
      return this.$store.getters['editor/manageAssertions'];
    }
  },
  watch: {
    editsFinishedCounter: function () {
      var _editsFinishedCounter = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee6() {
        var framework, obj;
        return Object(regenerator["a" /* default */])().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              if (!(this.editsFinishedCounter && this.editsFinishedCounter === this.totalEditsCounter)) {
                _context6.n = 2;
                break;
              }
              this.editsFinishedCounter = 0;
              this.totalEditsCounter = 0;
              // If changes were made to the framework, make sure they get into the store.
              framework = this.$store.getters['editor/framework'];
              _context6.n = 1;
              return EcRepository.get(framework.shortId());
            case 1:
              obj = _context6.v;
              this.$store.commit('editor/framework', obj);
              this.$store.commit('editor/recomputeHierarchy', true);
              this.$store.commit('editor/refreshAlignments', true);
            case 2:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function editsFinishedCounter() {
        return _editsFinishedCounter.apply(this, arguments);
      }
      return editsFinishedCounter;
    }()
  },
  mounted: function mounted() {
    if (this.$store.getters['editor/setPropertyLevel']) {
      this.changeProperties(this.$store.getters['editor/setPropertyLevel']);
      this.$store.commit('editor/setPropertyLevel', null);
    }
    this.checkIsPrivate();
  }
});
// CONCATENATED MODULE: ./src/components/framework/EditorToolbar.vue?vue&type=script&lang=js
 /* harmony default export */ var framework_EditorToolbarvue_type_script_lang_js = (EditorToolbarvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/framework/EditorToolbar.vue?vue&type=style&index=0&id=18485fad&prod&lang=scss
var EditorToolbarvue_type_style_index_0_id_18485fad_prod_lang_scss = __webpack_require__("4f29");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/framework/EditorToolbar.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  framework_EditorToolbarvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var EditorToolbar = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=chunk-c5459254.b08ed37f.js.map