(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-43880ac8","chunk-25a2af2a","chunk-25a2af2a"],{

/***/ "26bb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"fb7199d4-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/DeleteConceptConfirm.vue?vue&type=template&id=3785b73b
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
  }, [_vm._v(" Confirm Delete Concept ")]), _c('template', {
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
  }, [_vm._v(" Delete Concept ")]), _c('button', {
    staticClass: "is-dark button",
    on: {
      "click": function click($event) {
        return _vm.closeModal();
      }
    }
  }, [_vm._v(" Cancel ")])])], 2);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/modalContent/DeleteConceptConfirm.vue?vue&type=template&id=3785b73b

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regenerator.js + 1 modules
var regenerator = __webpack_require__("c14f");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("fb6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__("a434");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.json.stringify.js
var es_json_stringify = __webpack_require__("e9c4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: ./src/components/modalContent/ModalTemplate.vue + 4 modules
var ModalTemplate = __webpack_require__("af07");

// EXTERNAL MODULE: ./src/mixins/common.js
var common = __webpack_require__("872c");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/DeleteConceptConfirm.vue?vue&type=script&lang=js









/* harmony default export */ var DeleteConceptConfirmvue_type_script_lang_js = ({
  name: 'DeleteConceptConfirm',
  components: {
    ModalTemplate: ModalTemplate["a" /* default */]
  },
  mixins: [common["a" /* default */]],
  computed: {
    obj: function obj() {
      return this.$store.getters['editor/itemToDelete'];
    },
    framework: function framework() {
      return this.$store.getters['editor/framework'];
    }
  },
  data: function data() {
    return {
      editsToUndo: []
    };
  },
  methods: {
    deleteItem: function deleteItem() {
      this.deleteObject(this.obj);
      this.closeModal();
    },
    closeModal: function closeModal() {
      this.$store.commit('app/closeModal');
      this.$store.commit('editor/setItemToDelete', {});
    },
    deleteObject: function deleteObject(thing) {
      appLog("deleting " + thing.id);
      this.deleteConceptInner(thing);
      this.framework["schema:dateModified"] = new Date().toISOString();
      this.$store.commit('editor/selectedCompetency', null);
    },
    deleteConceptInner: function () {
      var _deleteConceptInner = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee(c) {
        var me, i, concept, initialValue, _concept, framework, _t, _t2, _t3;
        return Object(regenerator["a" /* default */])().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              me = this;
              if (!(c["skos:broader"] != null)) {
                _context.n = 9;
                break;
              }
              i = 0;
            case 1:
              if (!(i < c["skos:broader"].length)) {
                _context.n = 9;
                break;
              }
              _context.p = 2;
              _context.n = 3;
              return EcConcept.get(c["skos:broader"][i]);
            case 3:
              concept = _context.v;
              initialValue = concept["skos:narrower"].slice();
              EcArray.setRemove(concept["skos:narrower"], c.shortId());
              concept["schema:dateModified"] = new Date().toISOString();
              me.editsToUndo.push({
                operation: "update",
                id: concept.shortId(),
                fieldChanged: ["skos:narrower"],
                initialValue: [initialValue]
              });
              if (!(me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[concept.id] !== true)) {
                _context.n = 5;
                break;
              }
              _context.n = 4;
              return EcEncryptedValue.toEncryptedValue(concept);
            case 4:
              concept = _context.v;
            case 5:
              _context.n = 6;
              return repo.saveTo(concept);
            case 6:
              me.$store.commit('editor/framework', me.framework);
              _context.n = 8;
              break;
            case 7:
              _context.p = 7;
              _t = _context.v;
              appError(_t);
            case 8:
              i++;
              _context.n = 1;
              break;
            case 9:
              if (!(c["skos:narrower"] != null)) {
                _context.n = 15;
                break;
              }
              i = 0;
            case 10:
              if (!(i < c["skos:narrower"].length)) {
                _context.n = 15;
                break;
              }
              _context.p = 11;
              _context.n = 12;
              return EcConcept.get(c["skos:narrower"][i]);
            case 12:
              _concept = _context.v;
              me.deleteConceptInner(_concept);
              _context.n = 14;
              break;
            case 13:
              _context.p = 13;
              _t2 = _context.v;
              appError(_t2);
            case 14:
              i++;
              _context.n = 10;
              break;
            case 15:
              if (!(c["skos:topConceptOf"] != null)) {
                _context.n = 21;
                break;
              }
              _context.p = 16;
              initialValue = this.framework["skos:hasTopConcept"].slice();
              EcArray.setRemove(this.framework["skos:hasTopConcept"], c.shortId());
              me.editsToUndo.push({
                operation: "update",
                id: this.framework.shortId(),
                fieldChanged: ["skos:hasTopConcept"],
                initialValue: [initialValue]
              });
              framework = this.framework;
              framework["schema:dateModified"] = new Date().toISOString();
              if (!(this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true)) {
                _context.n = 18;
                break;
              }
              _context.n = 17;
              return EcEncryptedValue.toEncryptedValue(framework);
            case 17:
              framework = _context.v;
            case 18:
              _context.n = 19;
              return repo.saveTo(framework);
            case 19:
              me.$store.commit('editor/framework', me.framework);
              _context.n = 21;
              break;
            case 20:
              _context.p = 20;
              _t3 = _context.v;
              appError(_t3);
            case 21:
              this.spitEvent("conceptDeleted", c.shortId(), "editFrameworkPage");
              me.editsToUndo.push({
                operation: "delete",
                obj: c
              });
              repo.deleteRegistered(c, function () {
                me.$store.commit('editor/framework', me.framework);
                me.$store.commit('editor/addEditsToUndo', JSON.parse(JSON.stringify(me.editsToUndo)));
                me.editsToUndo.splice(0, me.editsToUndo.length);
              }, appError);
            case 22:
              return _context.a(2);
          }
        }, _callee, this, [[16, 20], [11, 13], [2, 7]]);
      }));
      function deleteConceptInner(_x) {
        return _deleteConceptInner.apply(this, arguments);
      }
      return deleteConceptInner;
    }()
  }
});
// CONCATENATED MODULE: ./src/components/modalContent/DeleteConceptConfirm.vue?vue&type=script&lang=js
 /* harmony default export */ var modalContent_DeleteConceptConfirmvue_type_script_lang_js = (DeleteConceptConfirmvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/modalContent/DeleteConceptConfirm.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  modalContent_DeleteConceptConfirmvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var DeleteConceptConfirm = __webpack_exports__["default"] = (component.exports);

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

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"fb7199d4-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/ModalTemplate.vue?vue&type=template&id=1c4e04a7
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
//# sourceMappingURL=chunk-43880ac8.f3675c12.js.map