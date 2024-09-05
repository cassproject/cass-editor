(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["timeline"],{

/***/ "3dd3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"01d4e028-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/framework/Timeline.vue?vue&type=template&id=3cfce492
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_c('main-layout', {
    attrs: {
      "simple": true
    }
  }, [_c('template', {
    slot: "top"
  }, [_c('div', {
    staticClass: "assertion-timeline-topbar"
  }, [_c('div', {
    staticClass: "columns is-spaced is-vcentered",
    staticStyle: {
      "width": "100%"
    }
  }, [_c('div', {
    staticClass: "column"
  }, [_c('h2', {
    staticClass: "has-text-dark has-text-weight-bold is-size-5 text-align-left"
  }, [_vm._v(" Assertion Timeline ")])])])])]), _c('template', {
    slot: "body"
  }, [_c('AssertionTimeline')], 1)], 2)], 1);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/views/framework/Timeline.vue?vue&type=template&id=3cfce492

// EXTERNAL MODULE: ./src/layouts/MainLayout.vue + 4 modules
var MainLayout = __webpack_require__("713b");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"01d4e028-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/lode/components/AssertionTimeline.vue?vue&type=template&id=371793ba
var AssertionTimelinevue_type_template_id_371793ba_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_vm.assertions && !_vm.loading ? _c('div', {
    staticClass: "timeline"
  }, [_vm._l(_vm.assertions, function (item) {
    return _c('TimelineElement', {
      key: item.id,
      attrs: {
        "uri": item.id
      }
    });
  }), _vm.assertions.length === 0 ? _c('span', {
    attrs: {
      "id": "noAssertionsMessage"
    }
  }, [_vm._v(" None. ")]) : _vm._e()], 2) : _c('div', {
    attrs: {
      "id": "loadingAssertionTimeline"
    }
  }, [_c('progress', {
    staticClass: "progress is-large is-primary",
    attrs: {
      "max": "100"
    }
  })])]);
};
var AssertionTimelinevue_type_template_id_371793ba_staticRenderFns = [];

// CONCATENATED MODULE: ./src/lode/components/AssertionTimeline.vue?vue&type=template&id=371793ba

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__("3ca3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/lode/components/AssertionTimeline.vue?vue&type=script&lang=js



/* harmony default export */ var AssertionTimelinevue_type_script_lang_js = ({
  name: 'AssertionTimeline',
  components: {
    TimelineElement: function TimelineElement() {
      return __webpack_require__.e(/* import() */ "chunk-2d0daac9").then(__webpack_require__.bind(null, "6d38"));
    }
  },
  props: {},
  data: function data() {
    return {
      searched: false
    };
  },
  computed: {
    assertions: function assertions() {
      return this.$store.getters['editor/assertions'];
    },
    loading: function loading() {
      return this.$store.getters['editor/searchingAssertions'];
    }
  },
  watch: {},
  methods: {}
});
// CONCATENATED MODULE: ./src/lode/components/AssertionTimeline.vue?vue&type=script&lang=js
 /* harmony default export */ var components_AssertionTimelinevue_type_script_lang_js = (AssertionTimelinevue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/lode/components/AssertionTimeline.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_AssertionTimelinevue_type_script_lang_js,
  AssertionTimelinevue_type_template_id_371793ba_render,
  AssertionTimelinevue_type_template_id_371793ba_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var AssertionTimeline = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/framework/Timeline.vue?vue&type=script&lang=js


/* harmony default export */ var Timelinevue_type_script_lang_js = ({
  name: 'Timeline',
  data: function data() {
    return {};
  },
  mixins: [],
  props: {
    queryParams: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  components: {
    MainLayout: MainLayout["a" /* default */],
    AssertionTimeline: AssertionTimeline
  },
  computed: {
    me: function me() {
      return this.$store.getters['editor/getMe'];
    }
  },
  watch: {
    me: function me() {
      this.$store.dispatch('editor/searchForAssertions');
    }
  },
  created: function created() {
    this.$store.commit('editor/setSearchingAssertions', true);
    this.$store.commit('app/searchTerm', "");
    this.$store.dispatch('editor/searchForAssertions');
  },
  beforeDestroy: function beforeDestroy() {
    this.$store.commit('app/clearSearchFilters');
    this.$store.commit('app/searchTerm', "");
  },
  methods: {}
});
// CONCATENATED MODULE: ./src/views/framework/Timeline.vue?vue&type=script&lang=js
 /* harmony default export */ var framework_Timelinevue_type_script_lang_js = (Timelinevue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/views/framework/Timeline.vue?vue&type=style&index=0&id=3cfce492&prod&lang=scss
var Timelinevue_type_style_index_0_id_3cfce492_prod_lang_scss = __webpack_require__("7188");

// CONCATENATED MODULE: ./src/views/framework/Timeline.vue






/* normalize component */

var Timeline_component = Object(componentNormalizer["a" /* default */])(
  framework_Timelinevue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Timeline = __webpack_exports__["default"] = (Timeline_component.exports);

/***/ }),

/***/ "635b":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "63df":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MainLayout_vue_vue_type_style_index_0_id_7780b418_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fc26");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MainLayout_vue_vue_type_style_index_0_id_7780b418_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MainLayout_vue_vue_type_style_index_0_id_7780b418_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "713b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"01d4e028-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/layouts/MainLayout.vue?vue&type=template&id=7780b418
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "cass--main-layout",
    class: !_vm.simple ? 'has-secondary' : ''
  }, [_c('div', {
    staticClass: "cass--main-layout--primary-top",
    class: _vm.simpleClass
  }, [_vm._t("top")], 2), !_vm.simple ? _c('div', {
    staticClass: "cass--main-layout--secondary-top"
  }, [_vm._t("secondary-top")], 2) : _vm._e(), _c('div', {
    staticClass: "cass--main-layout--body",
    class: _vm.topBarClass
  }, [_vm._t("body")], 2), _vm.rightActive ? _c('div', {
    staticClass: "cass--main-layout--right",
    class: _vm.topBarClass
  }, [_vm._t("right")], 2) : _vm._e()]);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/layouts/MainLayout.vue?vue&type=template&id=7780b418

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/layouts/MainLayout.vue?vue&type=script&lang=js
/* harmony default export */ var MainLayoutvue_type_script_lang_js = ({
  name: 'MainLayout',
  data: function data() {
    return {};
  },
  props: {
    rightActive: {
      type: Boolean,
      default: false
    },
    simple: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    simpleClass: function simpleClass() {
      return {
        'is-simple-top-bar': this.simple
      };
    },
    topBarClass: function topBarClass() {
      return {
        'has-simple-top-bar': this.simple,
        'has-secondary-top-bar': !this.simple,
        'regular-top-bar': !this.simple
      };
    }
  }
});
// CONCATENATED MODULE: ./src/layouts/MainLayout.vue?vue&type=script&lang=js
 /* harmony default export */ var layouts_MainLayoutvue_type_script_lang_js = (MainLayoutvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/layouts/MainLayout.vue?vue&type=style&index=0&id=7780b418&prod&lang=scss
var MainLayoutvue_type_style_index_0_id_7780b418_prod_lang_scss = __webpack_require__("63df");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/layouts/MainLayout.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  layouts_MainLayoutvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var MainLayout = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "7188":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Timeline_vue_vue_type_style_index_0_id_3cfce492_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("635b");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Timeline_vue_vue_type_style_index_0_id_3cfce492_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Timeline_vue_vue_type_style_index_0_id_3cfce492_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "fc26":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);
//# sourceMappingURL=timeline.12809844.js.map