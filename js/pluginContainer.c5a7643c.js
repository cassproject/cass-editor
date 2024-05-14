(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pluginContainer"],{

/***/ "bd3b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"fffa3e18-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/plugins/PluginContainer.vue?vue&type=template&id=0738a6fc
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    class: [{
      'modal-card': _vm.view === 'dynamic-modal'
    }, {
      'section': _vm.view !== 'dynamic-modal'
    }]
  }, [_c('section', {
    class: [{
      'container': _vm.view !== 'dynamic-modal'
    }, {
      'modal-card-body': _vm.view === 'dynamic-modal'
    }]
  }, [_c('div', {
    staticClass: "section"
  }, [[_c('h3', {
    staticClass: "title"
  }, [_c('i', {
    staticClass: "fa fa-plug"
  }), _vm._v(" " + _vm._s(_vm.pluginName) + " ")])]], 2), _c('div', {
    staticClass: "modal",
    class: [{
      'is-active': _vm.pluginBusy
    }]
  }, [_c('div', {
    staticClass: "modal-background"
  }), _vm._m(0)]), _c('div', {
    class: [{
      'is-active': !_vm.pluginBusy
    }]
  }, [_c('iframe', {
    attrs: {
      "id": "pluginFrame",
      "src": _vm.iFrameSource
    },
    on: {
      "load": _vm.handlePluginFrameLoaded
    }
  })])])]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "modal-content has-text-centered"
  }, [_c('span', {
    staticClass: "icon is-large has-text-center has-text-link"
  }, [_c('i', {
    staticClass: "fas fa-2x fa-spinner is-info fa-pulse"
  })])]);
}];

// CONCATENATED MODULE: ./src/views/plugins/PluginContainer.vue?vue&type=template&id=0738a6fc

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
var createForOfIteratorHelper = __webpack_require__("b85c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.starts-with.js
var es_string_starts_with = __webpack_require__("2ca0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.json.stringify.js
var es_json_stringify = __webpack_require__("e9c4");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/plugins/PluginContainer.vue?vue&type=script&lang=js




/* harmony default export */ var PluginContainervue_type_script_lang_js = ({
  props: {
    view: {
      default: '',
      type: String
    }
  },
  name: 'PluginContainer',
  components: {},
  data: function data() {
    return {
      WAITING_MESSAGE: "waiting",
      INIT_IDENTITY_ACTION: "initIdentity",
      pluginName: '',
      iFrameSource: '',
      pluginBusy: true
    };
  },
  methods: {
    getQueryParameterValue: function getQueryParameterValue(queryParamValue) {
      if (queryParamValue.equalsIgnoreCase(':origin')) return window.location.origin;else return null;
    },
    getQueryStringForParameter: function getQueryStringForParameter(queryParam) {
      if (queryParam.name && queryParam.value) {
        var realValue = null;
        if (queryParam.value.startsWith(':')) realValue = this.getQueryParameterValue(queryParam.value);else realValue = queryParam.value;
        if (realValue) return queryParam.name + '=' + realValue;else return null;
      } else return null;
    },
    buildQueryParameterString: function buildQueryParameterString(launchQueryParameters) {
      var queryString = '';
      if (launchQueryParameters && launchQueryParameters.length > 0) {
        var cnt = 0;
        var _iterator = Object(createForOfIteratorHelper["a" /* default */])(launchQueryParameters),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var qp = _step.value;
            var queryStringPart = this.getQueryStringForParameter(qp);
            if (queryStringPart) {
              if (queryString.equals('')) queryString += '?';
              if (cnt > 0) queryString += '&';
              queryString += queryStringPart;
            }
            cnt++;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      return queryString;
    },
    setIFrameSource: function setIFrameSource() {
      if (this.pluginToLaunch) {
        this.pluginBusy = true;
        this.pluginName = this.pluginToLaunch.launchName;
        this.iFrameSource = this.pluginToLaunch.launchUrl + this.buildQueryParameterString(this.pluginToLaunch.queryParams);
      } else {
        appLog('Cannot determine launch plugin');
      }
    },
    sendIdentityToPlugin: function sendIdentityToPlugin(origin) {
      appLog('Sending "' + this.INIT_IDENTITY_ACTION + '" message to plugin');
      var messageObj = {
        action: this.INIT_IDENTITY_ACTION,
        serverParm: window.repo.selectedServer,
        nameParm: EcIdentityManager.default.ids[0].displayName,
        pemParm: EcIdentityManager.default.ids[0].ppk.toPem()
      };
      document.getElementsByTagName('iframe')[0].contentWindow.postMessage(JSON.stringify(messageObj), origin);
    },
    handlePluginFrameMessage: function handlePluginFrameMessage(msg) {
      if (msg && msg.data && msg.data.message) {
        if (msg.data.message.equals(this.WAITING_MESSAGE)) this.sendIdentityToPlugin(msg.origin);
      }
    },
    handlePluginFrameLoaded: function handlePluginFrameLoaded() {
      this.pluginBusy = false;
      window.addEventListener('message', this.handlePluginFrameMessage);
    }
  },
  computed: {
    pluginToLaunch: function pluginToLaunch() {
      return this.$store.getters['app/pluginToLaunch'];
    },
    pluginToLaunchLastUpdate: function pluginToLaunchLastUpdate() {
      return this.$store.getters['app/pluginToLaunchLastUpdate'];
    }
  },
  watch: {
    pluginToLaunchLastUpdate: function pluginToLaunchLastUpdate() {
      // TODO handle clear event listener...reestablish (plugin crosstalk???)
      this.setIFrameSource();
    }
  },
  mounted: function mounted() {
    this.setIFrameSource();
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('message', this.handlePluginFrameMessage);
  }
});
// CONCATENATED MODULE: ./src/views/plugins/PluginContainer.vue?vue&type=script&lang=js
 /* harmony default export */ var plugins_PluginContainervue_type_script_lang_js = (PluginContainervue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/views/plugins/PluginContainer.vue?vue&type=style&index=0&id=0738a6fc&prod&lang=scss
var PluginContainervue_type_style_index_0_id_0738a6fc_prod_lang_scss = __webpack_require__("cc84");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/views/plugins/PluginContainer.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  plugins_PluginContainervue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var PluginContainer = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "c43d":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "cc84":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PluginContainer_vue_vue_type_style_index_0_id_0738a6fc_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c43d");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PluginContainer_vue_vue_type_style_index_0_id_0738a6fc_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PluginContainer_vue_vue_type_style_index_0_id_0738a6fc_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ })

}]);
//# sourceMappingURL=pluginContainer.c5a7643c.js.map