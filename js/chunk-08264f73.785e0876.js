(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-08264f73","chunk-25a2af2a","chunk-25a2af2a"],{

/***/ "4d6a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1efc2bba-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/DeleteCommentConfirm.vue?vue&type=template&id=0d967bd4
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('modal-template', {
    attrs: {
      "type": "danger",
      "active": true
    },
    on: {
      "close": _vm.closeModal
    }
  }, [_c('template', {
    slot: "modal-header"
  }, [_c('span', {
    staticClass: "title has-text-white"
  }, [_vm._v(" " + _vm._s(_vm.commentDeleteConfirmTitle) + " ")])]), _c('template', {
    slot: "modal-body"
  }, [_vm.commentsToDelete.length <= 1 ? _c('p', [_vm._v(" Are you sure you wish to delete this comment? ")]) : _vm._e(), _vm.commentsToDelete.length > 1 ? _c('p', [_vm._v(" Are you sure you wish to delete this entire thread? ")]) : _vm._e()]), _c('template', {
    slot: "modal-foot"
  }, [_c('div', {
    staticClass: "buttons is-spaced"
  }, [_c('button', {
    staticClass: "button is-dark is-outlined",
    on: {
      "click": _vm.closeModal
    }
  }, [_vm._v(" Cancel ")]), _c('button', {
    staticClass: "button is-outlined is-primary",
    on: {
      "click": _vm.confirmDelete
    }
  }, [_vm._v(" Confirm ")])])])], 2);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/modalContent/DeleteCommentConfirm.vue?vue&type=template&id=0d967bd4

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
var createForOfIteratorHelper = __webpack_require__("b85c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__("caad");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__("2532");

// EXTERNAL MODULE: ./src/components/modalContent/ModalTemplate.vue + 4 modules
var ModalTemplate = __webpack_require__("af07");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/DeleteCommentConfirm.vue?vue&type=script&lang=js





/* harmony default export */ var DeleteCommentConfirmvue_type_script_lang_js = ({
  name: 'DeleteCommentConfirm',
  props: {
    active: {
      type: Boolean,
      defaut: false
    }
  },
  data: function data() {
    return {};
  },
  components: {
    ModalTemplate: ModalTemplate["a" /* default */]
  },
  methods: {
    closeModal: function closeModal() {
      this.$store.commit('editor/setCommentsToDelete', []);
      this.$store.commit('app/closeModal');
    },
    generateCommentsToDeleteIds: function generateCommentsToDeleteIds() {
      var ctdIds = [];
      var _iterator = Object(createForOfIteratorHelper["a" /* default */])(this.commentsToDelete),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var ctd = _step.value;
          ctdIds.push(ctd.shortId());
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return ctdIds;
    },
    removeCommentsFromStoreFrameworkCommentList: function removeCommentsFromStoreFrameworkCommentList() {
      var ctdIds = this.generateCommentsToDeleteIds();
      var fcl = this.$store.getters['editor/frameworkCommentList'];
      var nfcl = [];
      var _iterator2 = Object(createForOfIteratorHelper["a" /* default */])(fcl),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var fc = _step2.value;
          if (!ctdIds.includes(fc.shortId())) nfcl.push(fc);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      this.$store.commit('editor/setFrameworkCommentList', nfcl);
    },
    deleteCommentSuccess: function deleteCommentSuccess() {
      appLog('Comment delete succeeded');
    },
    deleteCommentFailure: function deleteCommentFailure(msg) {
      appLog('Comment delete failed: ' + msg);
    },
    confirmDelete: function confirmDelete() {
      var repo = window.repo;
      var _iterator3 = Object(createForOfIteratorHelper["a" /* default */])(this.commentsToDelete),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var ctd = _step3.value;
          repo.deleteRegistered(ctd, this.deleteCommentSuccess, this.deleteCommentFailure);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      this.removeCommentsFromStoreFrameworkCommentList();
      this.closeModal();
    }
  },
  computed: {
    commentDeleteConfirmTitle: function commentDeleteConfirmTitle() {
      if (this.commentsToDelete.length > 1) return 'Delete comment thread?';else return 'Delete comment?';
    },
    commentsToDelete: function commentsToDelete() {
      return this.$store.getters['editor/commentsToDelete'];
    }
  },
  mounted: function mounted() {}
});
// CONCATENATED MODULE: ./src/components/modalContent/DeleteCommentConfirm.vue?vue&type=script&lang=js
 /* harmony default export */ var modalContent_DeleteCommentConfirmvue_type_script_lang_js = (DeleteCommentConfirmvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/modalContent/DeleteCommentConfirm.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  modalContent_DeleteCommentConfirmvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var DeleteCommentConfirm = __webpack_exports__["default"] = (component.exports);

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
//# sourceMappingURL=chunk-08264f73.785e0876.js.map