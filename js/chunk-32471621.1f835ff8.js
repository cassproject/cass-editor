(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-32471621","chunk-dc2b4b7e","chunk-25a2af2a","chunk-25a2af2a","chunk-74a95bb3"],{

/***/ "62af":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "6ffa4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("14d9");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("fb6a");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_1__);
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

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"0b02fd0e-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/ModalTemplate.vue?vue&type=template&id=1c4e04a7
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

/***/ "c4df":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"0b02fd0e-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/DeleteFrameworkConfirm.vue?vue&type=template&id=7f6b82f2

var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('modal-template', {
    attrs: {
      "type": "danger",
      "size": "small",
      "active": true
    },
    on: {
      "close": _vm.closeModal
    }
  }, [_c('template', {
    slot: "modal-header"
  }, [_vm._v(" Confirm Delete " + _vm._s(_vm.obj.subType === 'Collection' ? "Collection" : "Framework") + " ")]), _c('template', {
    slot: "modal-body"
  }, [_c('section', [_c('b', [_vm._v(" Warning! This action is not reversable. ")])]), _c('p', {
    staticClass: "help is-danger"
  }, [_vm._v(" This action will delete " + _vm._s(_vm.name) + " and all of its contents. ")])]), _c('template', {
    slot: "modal-foot"
  }, [_c('button', {
    staticClass: "is-danger is-outlined button",
    on: {
      "click": function click($event) {
        return _vm.deleteItem();
      }
    }
  }, [_vm._v(" Delete " + _vm._s(_vm.obj.subType === 'Collection' ? "Collection" : "Framework") + " ")]), _c('button', {
    staticClass: "is-dark button",
    on: {
      "click": function click($event) {
        return _vm.closeModal();
      }
    }
  }, [_vm._v(" Cancel ")])])], 2);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/modalContent/DeleteFrameworkConfirm.vue?vue&type=template&id=7f6b82f2

// EXTERNAL MODULE: ./src/components/modalContent/ModalTemplate.vue + 4 modules
var ModalTemplate = __webpack_require__("af07");

// EXTERNAL MODULE: ./src/mixins/competencyEdits.js
var competencyEdits = __webpack_require__("6ffa4");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/DeleteFrameworkConfirm.vue?vue&type=script&lang=js


/* harmony default export */ var DeleteFrameworkConfirmvue_type_script_lang_js = ({
  name: 'DeleteFrameworkConfirm',
  mixins: [competencyEdits["a" /* default */]],
  components: {
    ModalTemplate: ModalTemplate["a" /* default */]
  },
  data: function data() {
    return {};
  },
  computed: {
    obj: function obj() {
      return this.$store.getters['editor/itemToDelete'];
    },
    name: function name() {
      return this.obj.getName();
    }
  },
  mounted: function mounted() {},
  methods: {
    deleteItem: function deleteItem() {
      this.deleteObject(this.obj);
      this.closeModal();
      this.$store.commit('editor/setItemToDelete', {});
    },
    closeModal: function closeModal() {
      this.$store.commit('app/closeModal');
      this.$store.commit('editor/setItemToDelete', {});
    }
  }
});
// CONCATENATED MODULE: ./src/components/modalContent/DeleteFrameworkConfirm.vue?vue&type=script&lang=js
 /* harmony default export */ var modalContent_DeleteFrameworkConfirmvue_type_script_lang_js = (DeleteFrameworkConfirmvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/modalContent/DeleteFrameworkConfirm.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  modalContent_DeleteFrameworkConfirmvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var DeleteFrameworkConfirm = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=chunk-32471621.1f835ff8.js.map