(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-789a5742","chunk-25a2af2a","chunk-25a2af2a"],{

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

/***/ "a6a6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1efc2bba-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/DeleteConceptSchemeConfirm.vue?vue&type=template&id=f2270ef2
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
  }, [_vm._v(" Confirm Delete " + _vm._s(_vm.type) + " ")]), _c('template', {
    slot: "modal-body"
  }, [_c('section', [_c('b', [_vm._v(" Warning! This action is permanent. ")])])]), _c('template', {
    slot: "modal-foot"
  }, [_c('button', {
    staticClass: "is-danger is-outlined button",
    on: {
      "click": function click($event) {
        return _vm.deleteItem();
      }
    }
  }, [_vm._v(" Delete " + _vm._s(_vm.type) + " ")]), _c('button', {
    staticClass: "is-dark button",
    on: {
      "click": function click($event) {
        return _vm.closeModal();
      }
    }
  }, [_vm._v(" Cancel ")])])], 2);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/modalContent/DeleteConceptSchemeConfirm.vue?vue&type=template&id=f2270ef2

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.search.js
var es_string_search = __webpack_require__("841c");

// EXTERNAL MODULE: ./src/components/modalContent/ModalTemplate.vue + 4 modules
var ModalTemplate = __webpack_require__("af07");

// EXTERNAL MODULE: ./src/mixins/common.js
var common = __webpack_require__("872c");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/DeleteConceptSchemeConfirm.vue?vue&type=script&lang=js





/* harmony default export */ var DeleteConceptSchemeConfirmvue_type_script_lang_js = ({
  name: 'DeleteConceptSchemeConfirm',
  components: {
    ModalTemplate: ModalTemplate["a" /* default */]
  },
  mixins: [common["a" /* default */]],
  data: function data() {
    return {
      repo: window.repo
    };
  },
  computed: {
    obj: function obj() {
      return this.$store.getters['editor/itemToDelete'];
    },
    type: function type() {
      if (this.$store.getters['queryParams/ceasnDataFields'] === 'true') {
        return "Concept Scheme";
      }
      return 'Taxonomy';
    }
  },
  methods: {
    deleteItem: function deleteItem() {
      this.deleteObject(this.obj);
      this.closeModal();
      this.$store.commit('editor/setItemToDelete', {});
    },
    closeModal: function closeModal() {
      this.$store.commit('app/closeModal');
      this.$store.commit('editor/setItemToDelete', {});
    },
    deleteObject: function deleteObject(thing) {
      appLog("deleting " + thing.id);
      var me = this;
      // delete scheme
      var framework = this.obj;
      this.repo.deleteRegistered(framework, function (success) {
        me.spitEvent("frameworkDeleted", framework.shortId(), "editFrameworkSection");
        // Delete the framework, delete all non-used stuff.
        EcConcept.search(me.repo, "(skos\\:inScheme:\"" + framework.shortId() + "\") OR (ceasn\\:inProgressionModel:\"" + framework.shortId() + "\")", function (concepts) {
          for (var i = 0; i < concepts.length; i++) {
            me.repo.deleteRegistered(concepts[i], appLog, appError);
          }
        }, appError);
        me.$store.commit('editor/framework', null);
        me.$router.push({
          name: "concepts"
        });
      }, appLog);
    }
  }
});
// CONCATENATED MODULE: ./src/components/modalContent/DeleteConceptSchemeConfirm.vue?vue&type=script&lang=js
 /* harmony default export */ var modalContent_DeleteConceptSchemeConfirmvue_type_script_lang_js = (DeleteConceptSchemeConfirmvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/modalContent/DeleteConceptSchemeConfirm.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  modalContent_DeleteConceptSchemeConfirmvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var DeleteConceptSchemeConfirm = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "af07":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1efc2bba-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/ModalTemplate.vue?vue&type=template&id=1c4e04a7
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
//# sourceMappingURL=chunk-789a5742.1234bdea.js.map