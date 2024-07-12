(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-4a268576","chunk-25a2af2a","chunk-25a2af2a"],{

/***/ "1a52":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"11cfccab-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/DuplicateImport.vue?vue&type=template&id=31db2cf0



var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('modal-template', {
    attrs: {
      "active": true
    },
    on: {
      "close": _vm.closeImportModal
    }
  }, [_c('template', {
    slot: "modal-header"
  }, [_vm._v(" " + _vm._s(_vm.importModalParams.title) + " ")]), _c('template', {
    slot: "modal-body"
  }, [_c('section', [_vm._v(" " + _vm._s(_vm.importModalParams.text) + " "), _vm.importModalParams.options ? _c('section', {
    staticClass: "modal-card-body has-text-dark"
  }, [_c('div', {
    staticClass: "field"
  }, [_c('div', {
    staticClass: "control"
  }, [_c('div', {
    staticClass: "select is-primary is-fullwidth"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.selectedOption,
      expression: "selectedOption"
    }],
    on: {
      "change": function change($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.selectedOption = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
      }
    }
  }, [_c('option', {
    attrs: {
      "selected": "",
      "disabled": "",
      "value": ""
    }
  }, [_vm._v(" Select an option ")]), _vm._l(_vm.importModalParams.options, function (option, index) {
    return _c('option', {
      key: index,
      domProps: {
        "value": option
      }
    }, [_vm._v(" " + _vm._s(option) + " ")]);
  })], 2)])])]), _vm.selectedOption === 'Save import as a new framework' ? _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.newName,
      expression: "newName"
    }],
    staticClass: "input",
    attrs: {
      "placeholder": "Enter a new name"
    },
    domProps: {
      "value": _vm.newName
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.newName = $event.target.value;
      }
    }
  }) : _vm._e(), _vm.invalidName ? _c('div', [_vm._v(" The name you chose is already in the system. Please try a different name. ")]) : _vm._e()]) : _vm._e()])]), _c('template', {
    slot: "modal-foot"
  }, [_c('button', {
    staticClass: "is-danger is-outlined button",
    attrs: {
      "disabled": _vm.confirmDisabledModal
    },
    on: {
      "click": _vm.clickConfirmFromImportModal
    }
  }, [_vm._v(" Confirm ")]), _c('button', {
    staticClass: "is-dark button",
    on: {
      "click": _vm.closeImportModal
    }
  }, [_vm._v(" Cancel ")])])], 2);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/modalContent/DuplicateImport.vue?vue&type=template&id=31db2cf0

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.search.js
var es_string_search = __webpack_require__("841c");

// EXTERNAL MODULE: ./src/components/modalContent/ModalTemplate.vue + 4 modules
var ModalTemplate = __webpack_require__("af07");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/DuplicateImport.vue?vue&type=script&lang=js



/* harmony default export */ var DuplicateImportvue_type_script_lang_js = ({
  name: 'DuplicateImport',
  components: {
    ModalTemplate: ModalTemplate["a" /* default */]
  },
  data: function data() {
    return {
      newName: '',
      invalidName: false,
      selectedOption: ''
    };
  },
  computed: {
    confirmDisabledModal: function confirmDisabledModal() {
      if (this.importModalParams.type === 'duplicate') {
        if (this.importModalParams.options.length > 0 && this.selectedOption === "") {
          return true;
        } else {
          if (this.selectedOption === 'Save import as a new framework' && this.newName === '') {
            return true;
          } else {
            return false;
          }
        }
      }
      return false;
    },
    importModalParams: {
      get: function get() {
        return this.$store.getters['app/importModalParams'];
      },
      set: function set(val) {
        this.$store.commit('app/importModalParams', val);
      }
    }
  },
  methods: {
    clickConfirmFromImportModal: function clickConfirmFromImportModal() {
      var me = this;
      if (this.newName) {
        if (this.newName === this.importModalParams.currentName) {
          this.invalidName = true;
        } else {
          var uuid = new UUID(3, "nil", this.newName).format();
          var f = new EcFramework();
          if (me.queryParams && me.queryParams.newObjectEndpoint) {
            f.id = me.queryParams.newObjectEndpoint + uuid;
          } else {
            f.assignId(window.repo.selectedServer, uuid);
          }
          window.repo.search("(@id:\"" + f.shortId() + "\") AND (@type:Framework)", function () {}, function (frameworks) {
            if (frameworks.length > 0) {
              me.invalidName = true;
            } else {
              me.importModalParams.onConfirm(me.newName);
              me.resetImportModal();
            }
          }, function (error) {
            appError(error);
            me.resetImportModal();
          });
        }
      } else if (this.importModalParams.options && this.importModalParams.type !== "duplicate") {
        this.importModalParams.onConfirm(this.selectedOption);
        this.resetImportModal();
      } else {
        this.importModalParams.onConfirm();
        this.resetImportModal();
      }
    },
    resetImportModal: function resetImportModal() {
      this.importModalParams = null;
      this.$store.commit('app/closeModal');
    },
    closeImportModal: function closeImportModal() {
      if (!this.importModalParams.onConfirm) {
        return this.resetImportModal();
      }
      this.importModalParams.onCancel();
      this.importModalParams = null;
      this.$store.commit('app/closeModal');
    }
  }
});
// CONCATENATED MODULE: ./src/components/modalContent/DuplicateImport.vue?vue&type=script&lang=js
 /* harmony default export */ var modalContent_DuplicateImportvue_type_script_lang_js = (DuplicateImportvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/modalContent/DuplicateImport.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  modalContent_DuplicateImportvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var DuplicateImport = __webpack_exports__["default"] = (component.exports);

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
//# sourceMappingURL=chunk-4a268576.13e047c0.js.map