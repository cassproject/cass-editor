(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-b37cb348","chunk-2d0dab46","chunk-25a2af2a","chunk-25a2af2a","chunk-2d0dab46"],{

/***/ "5f07":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"fffa3e18-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/DeleteDirectoryConfirm.vue?vue&type=template&id=7d1adc20

var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('modal-template', {
    attrs: {
      "active": true,
      "type": "danger"
    },
    on: {
      "close": _vm.closeModal
    }
  }, [_c('template', {
    slot: "modal-header"
  }, [_c('span', {
    staticClass: "title has-text-white"
  }, [_vm._v(" Are you sure? ")])]), _c('template', {
    slot: "modal-body"
  }, [_c('h3', {
    staticClass: "title is-size-4"
  }, [_c('span', {}, [_vm._v("Delete the following directory")])]), _c('p', {
    staticClass: "py-2"
  }, [_vm._v(" " + _vm._s(_vm.directory.name) + " ")]), _c('p', [_vm._v(" You are about to delete the above directory. "), _c('b', [_vm._v("This action is not reversable.")]), _vm._v(" Deleting this directory will delete all of its contents and make it unavailable to others who might be using it. ")]), _c('div', {
    staticClass: "py-2"
  }, [_c('div', {
    staticClass: "field"
  }, [_c('div', {
    staticClass: "label"
  }, [_c('label', [_vm._v("Type the name of the directory to enable this action.")])]), _c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.typedInName,
      expression: "typedInName"
    }],
    staticClass: "input",
    domProps: {
      "value": _vm.typedInName
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.typedInName = $event.target.value;
      }
    }
  })])])])]), _c('template', {
    slot: "modal-foot"
  }, [_c('div', {
    staticClass: "buttons is-spaced"
  }, [_c('button', {
    staticClass: "button is-dark is-outlined",
    on: {
      "click": _vm.closeModal
    }
  }, [_vm._v(" Cancel ")]), _c('button', {
    staticClass: "button is-outlined is-danger",
    attrs: {
      "disabled": _vm.deleteDirectoryDisabled
    },
    on: {
      "click": function click($event) {
        return _vm.deleteDirectory(_vm.directory);
      }
    }
  }, [_vm._v(" Delete Directory ")])])])], 2);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/modalContent/DeleteDirectoryConfirm.vue?vue&type=template&id=7d1adc20

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
var regeneratorRuntime = __webpack_require__("c7eb");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.trim.js
var es_string_trim = __webpack_require__("498a");

// EXTERNAL MODULE: ./src/components/modalContent/ModalTemplate.vue + 4 modules
var ModalTemplate = __webpack_require__("af07");

// EXTERNAL MODULE: ./src/mixins/cassUtil.js
var cassUtil = __webpack_require__("6d79");

// EXTERNAL MODULE: ./src/mixins/common.js
var common = __webpack_require__("872c");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/DeleteDirectoryConfirm.vue?vue&type=script&lang=js








/* harmony default export */ var DeleteDirectoryConfirmvue_type_script_lang_js = ({
  mixins: [cassUtil["a" /* cassUtil */], common["a" /* default */]],
  name: 'DeleteDirectory',
  components: {
    ModalTemplate: ModalTemplate["a" /* default */]
  },
  data: function data() {
    return {
      typedInName: '',
      loggedInPersonEcPk: {},
      commentToSave: {},
      commentIsBusy: false,
      numDirectories: 1,
      repo: window.repo
    };
  },
  methods: {
    deleteDirectory: function () {
      var _deleteDirectory = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee2(obj) {
        var me, children;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              appLog("deleting " + obj.id);
              me = this;
              _context2.next = 4;
              return this.$store.dispatch('editor/getDirectoryChildren', obj);
            case 4:
              children = _context2.sent;
              window.repo.multiget(children, function (success) {
                new EcAsyncHelper().each(success, /*#__PURE__*/function () {
                  var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee(obj, done) {
                    return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
                      while (1) switch (_context.prev = _context.next) {
                        case 0:
                          if (obj.type === 'Framework') {
                            me.deleteFramework(obj, done);
                          } else if (obj.type === 'CreativeWork') {
                            me.repo.deleteRegistered(obj, appLog, appError);
                            done();
                          } else if (obj.type === "Directory") {
                            me.numDirectories++;
                            me.deleteDirectory(obj);
                            done();
                          }
                        case 1:
                        case "end":
                          return _context.stop();
                      }
                    }, _callee);
                  }));
                  return function (_x2, _x3) {
                    return _ref.apply(this, arguments);
                  };
                }(), function (objs) {
                  me.repo.deleteRegistered(obj, function (success) {
                    appLog(success);
                    me.numDirectories--;
                    if (me.numDirectories === 0) {
                      me.$store.dispatch('app/refreshDirectories');
                      me.$store.commit('app/refreshSearch', true);
                      if (me.$route.name !== "frameworks") {
                        me.$router.push({
                          name: "frameworks"
                        });
                      }
                      me.$store.commit('app/rightAsideObject', null);
                      me.$store.commit('app/closeRightAside');
                      me.$store.commit('app/refreshSearch', true);
                      me.$store.commit('app/closeModal');
                    }
                  }, function (error) {
                    appError(error);
                    me.numDirectories--;
                    if (me.numDirectories === 0) {
                      if (me.$route.name !== "frameworks") {
                        me.$router.push({
                          name: "frameworks"
                        });
                      }
                      me.$store.commit('app/rightAsideObject', null);
                      me.$store.commit('app/closeRightAside');
                      me.$store.commit('app/refreshSearch', true);
                      me.$store.commit('app/closeModal');
                    }
                  });
                });
              }, appError);
            case 6:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function deleteDirectory(_x) {
        return _deleteDirectory.apply(this, arguments);
      }
      return deleteDirectory;
    }(),
    deleteFramework: function deleteFramework(framework, callback) {
      var me = this;
      this.repo.deleteRegistered(framework, function (success) {
        me.spitEvent("frameworkDeleted", framework.shortId(), "directoryPage");
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
        callback();
      }, appLog);
    },
    closeModal: function closeModal() {
      this.$store.commit('app/closeModal');
    }
  },
  computed: {
    loggedInPerson: function loggedInPerson() {
      return this.$store.state.user.loggedOnPerson;
    },
    directory: function directory() {
      return this.$store.getters['app/rightAsideObject'];
    },
    deleteDirectoryDisabled: function deleteDirectoryDisabled() {
      return this.typedInName.trim() !== this.directory.name.trim();
    }
  },
  mounted: function mounted() {}
});
// CONCATENATED MODULE: ./src/components/modalContent/DeleteDirectoryConfirm.vue?vue&type=script&lang=js
 /* harmony default export */ var modalContent_DeleteDirectoryConfirmvue_type_script_lang_js = (DeleteDirectoryConfirmvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/modalContent/DeleteDirectoryConfirm.vue?vue&type=style&index=0&id=7d1adc20&prod&lang=scss
var DeleteDirectoryConfirmvue_type_style_index_0_id_7d1adc20_prod_lang_scss = __webpack_require__("8669");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/modalContent/DeleteDirectoryConfirm.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  modalContent_DeleteDirectoryConfirmvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var DeleteDirectoryConfirm = __webpack_exports__["default"] = (component.exports);

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

/***/ "8669":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DeleteDirectoryConfirm_vue_vue_type_style_index_0_id_7d1adc20_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("950e");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DeleteDirectoryConfirm_vue_vue_type_style_index_0_id_7d1adc20_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DeleteDirectoryConfirm_vue_vue_type_style_index_0_id_7d1adc20_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "8d7e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalTemplate_vue_vue_type_style_index_0_id_1c4e04a7_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("62af");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalTemplate_vue_vue_type_style_index_0_id_1c4e04a7_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalTemplate_vue_vue_type_style_index_0_id_1c4e04a7_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "950e":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "984b":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "af07":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"fffa3e18-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/ModalTemplate.vue?vue&type=template&id=1c4e04a7
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
//# sourceMappingURL=chunk-b37cb348.d9c86334.js.map