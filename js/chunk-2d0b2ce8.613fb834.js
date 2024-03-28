(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-2d0b2ce8"],{

/***/ "264b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3c28eb14-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/FrameworkConfiguration.vue?vue&type=template&id=ddfca498
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('modal-template', {
    attrs: {
      "active": true,
      "size": "small",
      "content": "deleteConfiguration",
      "type": "primary"
    },
    on: {
      "close": function close($event) {
        return _vm.$store.commit('app/closeModal');
      }
    }
  }, [_c('template', {
    slot: "modal-header"
  }, [_vm._v(" Framework Configuration ")]), _c('template', {
    slot: "modal-body"
  }, [_c('div', {
    staticClass: "p-4"
  }, [_c('configuration-list', {
    attrs: {
      "view": "modal"
    }
  })], 1)]), _c('template', {
    slot: "modal-foot"
  }, [_c('div', {
    staticClass: "buttons is-spaced"
  }, [_c('button', {
    staticClass: "button is-primary",
    on: {
      "click": function click($event) {
        return _vm.$store.commit('app/closeModal');
      }
    }
  }, [_vm._v(" Done ")])])])], 2);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/modalContent/FrameworkConfiguration.vue?vue&type=template&id=ddfca498

// EXTERNAL MODULE: ./src/components/modalContent/ModalTemplate.vue + 4 modules
var ModalTemplate = __webpack_require__("af07");

// EXTERNAL MODULE: ./src/components/configuration/ConfigurationList.vue + 9 modules
var ConfigurationList = __webpack_require__("2c3a");

// EXTERNAL MODULE: ./src/mixins/cassUtil.js
var cassUtil = __webpack_require__("6d79");

// EXTERNAL MODULE: ./src/mixins/common.js
var common = __webpack_require__("872c");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/FrameworkConfiguration.vue?vue&type=script&lang=js




/* harmony default export */ var FrameworkConfigurationvue_type_script_lang_js = ({
  mixins: [cassUtil["a" /* cassUtil */], common["a" /* default */]],
  name: 'FrameworkConfiguration',
  components: {
    ModalTemplate: ModalTemplate["a" /* default */],
    ConfigurationList: ConfigurationList["a" /* default */]
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
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  methods: {},
  updated: function updated() {},
  mounted: function mounted() {}
});
// CONCATENATED MODULE: ./src/components/modalContent/FrameworkConfiguration.vue?vue&type=script&lang=js
 /* harmony default export */ var modalContent_FrameworkConfigurationvue_type_script_lang_js = (FrameworkConfigurationvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/modalContent/FrameworkConfiguration.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  modalContent_FrameworkConfigurationvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FrameworkConfiguration = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=chunk-2d0b2ce8.613fb834.js.map