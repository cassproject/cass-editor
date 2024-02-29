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

/***/ "6ff3":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "e672":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1abfecd1-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/framework/EditorToolbar.vue?vue&type=template&id=18485fad
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

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
var regeneratorRuntime = __webpack_require__("c7eb");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.starts-with.js
var es_string_starts_with = __webpack_require__("2ca0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__("5319");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.search.js
var es_string_search = __webpack_require__("841c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

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
      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee() {
        var me, obj;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              // Delete
              me = _this2;
              _context.next = 3;
              return EcRepository.get(id);
            case 3:
              obj = _context.sent;
              _this2.repo.deleteRegistered(obj, function () {
                me.editsFinishedCounter++;
              }, function (failure) {
                appLog(failure);
                me.editsFinishedCounter++;
                me.$Progress.fail();
              });
            case 5:
            case "end":
              return _context.stop();
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
      var _expand = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee2(o, after) {
        var toExpand, expanded;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              toExpand = JSON.parse(o.toJson());
              if (toExpand["@context"] != null && toExpand["@context"].startsWith("http://")) {
                toExpand["@context"] = toExpand["@context"].replace("http://", "https://");
              }
              if (toExpand["@context"] != null && toExpand["@context"].indexOf("skos") !== -1) {
                toExpand["@context"] = "https://schema.cassproject.org/0.4/skos/";
              }
              _context2.prev = 3;
              _context2.next = 6;
              return jsonld.expand(toExpand);
            case 6:
              expanded = _context2.sent;
              after(expanded[0]);
              _context2.next = 13;
              break;
            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](3);
              after(null);
            case 13:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[3, 10]]);
      }));
      function expand(_x, _x2) {
        return _expand.apply(this, arguments);
      }
      return expand;
    }(),
    saveExpanded: function () {
      var _saveExpanded = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee3(expandedCompetency) {
        var me, context, compacted, rld;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              me = this;
              context = "https://schema.cassproject.org/0.4";
              if (expandedCompetency["@type"][0].toLowerCase().indexOf("concept") !== -1) {
                context = "https://schema.cassproject.org/0.4/skos";
              }
              _context3.prev = 3;
              _context3.next = 6;
              return jsonld.compact(expandedCompetency, this.$store.state.lode.rawSchemata[context]);
            case 6:
              compacted = _context3.sent;
              if (!compacted) {
                _context3.next = 19;
                break;
              }
              rld = new EcRemoteLinkedData();
              rld.copyFrom(compacted);
              rld.context = context;
              delete rld["@context"];
              rld = me.turnFieldsBackIntoArrays(rld);
              rld["schema:dateModified"] = new Date().toISOString();
              if (!(me.$store.state.editor && me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[rld.id] !== true)) {
                _context3.next = 18;
                break;
              }
              _context3.next = 17;
              return EcEncryptedValue.toEncryptedValue(rld);
            case 17:
              rld = _context3.sent;
            case 18:
              me.repo.saveTo(rld, function () {
                me.editsFinishedCounter++;
              }, function (error) {
                appError(error);
                me.editsFinishedCounter++;
              });
            case 19:
              _context3.next = 24;
              break;
            case 21:
              _context3.prev = 21;
              _context3.t0 = _context3["catch"](3);
              appError(_context3.t0);
            case 24:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[3, 21]]);
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
      var _manageAssertions = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee4() {
        var _this3 = this;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
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
            case "end":
              return _context4.stop();
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
      var _getConfigurationName = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee5() {
        var config, _config, ca, _iterator, _step, c;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              if (!this.$store.getters['editor/framework'].configuration) {
                _context5.next = 11;
                break;
              }
              _context5.next = 3;
              return EcRepository.get(this.$store.getters['editor/framework'].configuration);
            case 3:
              config = _context5.sent;
              if (!config) {
                _context5.next = 8;
                break;
              }
              return _context5.abrupt("return", config.name);
            case 8:
              return _context5.abrupt("return", "No configuration");
            case 9:
              _context5.next = 43;
              break;
            case 11:
              if (!localStorage.getItem("cassAuthoringToolDefaultBrowserConfigId")) {
                _context5.next = 22;
                break;
              }
              _context5.next = 14;
              return EcRepository.get(localStorage.getItem("cassAuthoringToolDefaultBrowserConfigId"));
            case 14:
              _config = _context5.sent;
              if (!_config) {
                _context5.next = 19;
                break;
              }
              return _context5.abrupt("return", _config.name);
            case 19:
              return _context5.abrupt("return", "No configuration");
            case 20:
              _context5.next = 43;
              break;
            case 22:
              _context5.next = 24;
              return window.repo.searchWithParams("@type:Configuration", {
                'size': 10000
              }, null);
            case 24:
              ca = _context5.sent;
              _iterator = Object(createForOfIteratorHelper["a" /* default */])(ca);
              _context5.prev = 26;
              _iterator.s();
            case 28:
              if ((_step = _iterator.n()).done) {
                _context5.next = 34;
                break;
              }
              c = _step.value;
              if (!(c.isDefault === true || c.isDefault === "true")) {
                _context5.next = 32;
                break;
              }
              return _context5.abrupt("return", c.name);
            case 32:
              _context5.next = 28;
              break;
            case 34:
              _context5.next = 39;
              break;
            case 36:
              _context5.prev = 36;
              _context5.t0 = _context5["catch"](26);
              _iterator.e(_context5.t0);
            case 39:
              _context5.prev = 39;
              _iterator.f();
              return _context5.finish(39);
            case 42:
              return _context5.abrupt("return", "No Configuration");
            case 43:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this, [[26, 36, 39, 42]]);
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
      var _editsFinishedCounter = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee6() {
        var framework, obj;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              if (!(this.editsFinishedCounter && this.editsFinishedCounter === this.totalEditsCounter)) {
                _context6.next = 10;
                break;
              }
              this.editsFinishedCounter = 0;
              this.totalEditsCounter = 0;
              // If changes were made to the framework, make sure they get into the store.
              framework = this.$store.getters['editor/framework'];
              _context6.next = 6;
              return EcRepository.get(framework.shortId());
            case 6:
              obj = _context6.sent;
              this.$store.commit('editor/framework', obj);
              this.$store.commit('editor/recomputeHierarchy', true);
              this.$store.commit('editor/refreshAlignments', true);
            case 10:
            case "end":
              return _context6.stop();
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
//# sourceMappingURL=chunk-c5459254.d0447e22.js.map