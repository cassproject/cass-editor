(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["organization"],{

/***/ "21a6":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(a,b){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}})(this,function(){"use strict";function b(a,b){return"undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(a,b,c){var d=new XMLHttpRequest;d.open("GET",a),d.responseType="blob",d.onload=function(){g(d.response,b,c)},d.onerror=function(){console.error("could not download file")},d.send()}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send()}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,a=f.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),g=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i)})}}:function(b,d,e,g){if(g=g||open("","_blank"),g&&(g.document.title=g.document.body.innerText="downloading..."),"string"==typeof b)return c(b,d,e);var h="application/octet-stream"===b.type,i=/constructor/i.test(f.HTMLElement)||f.safari,j=/CriOS\/[\d]+/.test(navigator.userAgent);if((j||h&&i||a)&&"undefined"!=typeof FileReader){var k=new FileReader;k.onloadend=function(){var a=k.result;a=j?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),g?g.location.href=a:location=a,g=null},k.readAsDataURL(b)}else{var l=f.URL||f.webkitURL,m=l.createObjectURL(b);g?g.location=m:location.href=m,g=null,setTimeout(function(){l.revokeObjectURL(m)},4E4)}});f.saveAs=g.saveAs=g, true&&(module.exports=g)});

//# sourceMappingURL=FileSaver.min.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "30b7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Organization_vue_vue_type_style_index_0_id_cd8c3944_prod_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c0d3");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Organization_vue_vue_type_style_index_0_id_cd8c3944_prod_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Organization_vue_vue_type_style_index_0_id_cd8c3944_prod_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "5186":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"18a0cdb9-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/organization/Organization.vue?vue&type=template&id=cd8c3944&scoped=true
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "organization"
  }, [_c('Thing', {
    attrs: {
      "obj": _vm.organization,
      "repo": _vm.repo,
      "clickToLoad": false,
      "profile": _vm.profile
    }
  }), _vm.timestamp ? _c('span', {
    staticClass: "info-tag",
    attrs: {
      "title": new Date(_vm.timestamp)
    }
  }, [_vm._v("Last modified " + _vm._s(_vm.lastModified))]) : _vm._e(), _vm.organization['schema:dateCreated'] ? _c('span', {
    staticClass: "info-tag",
    attrs: {
      "title": new Date(_vm.organization['schema:dateCreated'])
    }
  }, [_vm._v("Created " + _vm._s(_vm.$moment(_vm.organization['schema:dateCreated']).fromNow()))]) : _vm._e(), _vm.organization['Approved'] ? _c('span', {
    staticClass: "info-tag",
    attrs: {
      "title": _vm.organization['Approved']
    }
  }, [_vm._v("Approved")]) : _vm._e(), _vm.organization['Published'] ? _c('span', {
    staticClass: "info-tag",
    attrs: {
      "title": _vm.organization['Published']
    }
  }, [_vm._v("Published")]) : _vm._e(), _c('hr')], 1);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/views/organization/Organization.vue?vue&type=template&id=cd8c3944&scoped=true

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./src/lode/components/Thing.vue + 4 modules
var Thing = __webpack_require__("098b");

// EXTERNAL MODULE: ./node_modules/file-saver/dist/FileSaver.min.js
var FileSaver_min = __webpack_require__("21a6");
var FileSaver_min_default = /*#__PURE__*/__webpack_require__.n(FileSaver_min);

// EXTERNAL MODULE: ./src/mixins/common.js
var common = __webpack_require__("872c");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/organization/Organization.vue?vue&type=script&lang=js




/* harmony default export */ var Organizationvue_type_script_lang_js = ({
  name: "Organization",
  props: {
    exportType: String
  },
  mixins: [common["a" /* default */]],
  data: function data() {
    return {
      repo: window.repo,
      organization: null
    };
  },
  computed: {
    timestamp: function timestamp() {
      if (this.organization.getTimestamp && this.organization.getTimestamp()) {
        return this.organization.getTimestamp();
      } else if (this.organization["schema:dateModified"]) {
        return this.organization["schema:dateModified"];
      } else {
        return null;
      }
    },
    lastModified: function lastModified() {
      if (this.organization == null) return "Unknown.";
      if (this.timestamp) {
        return this.$moment(this.timestamp).fromNow();
      } else {
        return null;
      }
    },
    profile: function profile() {
      var me = this;
      return {
        "http://schema.org/name": Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, this.$store.state.lode.schemataLookup["http://schema.org/Organization"]["http://schema.org/name"]), {}, {
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Name of the organization."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Organization Name"
          }]
        }),
        "http://schema.org/employee": Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({
          profile: {
            "http://schema.org/name": {
              "@id": "http://schema.org/name",
              "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
              "http://schema.org/domainIncludes": [{
                "@id": "http://schema.org/Person"
              }],
              "http://schema.org/rangeIncludes": [{
                "@id": "http://schema.org/Text"
              }],
              "http://www.w3.org/2000/01/rdf-schema#comment": [{
                "@language": "en",
                "@value": "Name of the person."
              }],
              "http://www.w3.org/2000/01/rdf-schema#label": [{
                "@language": "en",
                "@value": "Person Name"
              }]
            }
          }
        }, this.$store.state.lode.schemataLookup["http://schema.org/Organization"]["http://schema.org/employee"]), {}, {
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Employees"
          }]
        }),
        "http://schema.org/subOrganization": Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({
          profile: function profile() {
            return me.profile;
          }
        }, this.$store.state.lode.schemataLookup["http://schema.org/Organization"]["http://schema.org/subOrganization"]), {}, {
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Department"
          }]
        })
      };
    }
  },
  components: {
    Thing: Thing["default"]
  },
  created: function created() {
    this.organization = this.$store.state.editor.organization;
    if (EcRepository.shouldTryUrl(this.organization.id) === false && this.organization.id.indexOf(this.repo.selectedServer) === -1) {
      this.exportGuid = EcCrypto.md5(this.organization.id);
    } else {
      this.exportGuid = this.organization.getGuid();
    }
    this.exportLink = this.repo.selectedServer + "data/" + this.exportGuid;
  },
  watch: {},
  methods: {
    download: function download(fileName, data) {
      var blob = new Blob([data], {
        type: "text/plain;charset=utf-8"
      });
      FileSaver_min_default()(blob, fileName);
    }
  }
});
// CONCATENATED MODULE: ./src/views/organization/Organization.vue?vue&type=script&lang=js
 /* harmony default export */ var organization_Organizationvue_type_script_lang_js = (Organizationvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/views/organization/Organization.vue?vue&type=style&index=0&id=cd8c3944&prod&lang=scss&scoped=true
var Organizationvue_type_style_index_0_id_cd8c3944_prod_lang_scss_scoped_true = __webpack_require__("30b7");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/views/organization/Organization.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  organization_Organizationvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  "cd8c3944",
  null
  
)

/* harmony default export */ var Organization = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "c0d3":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);
//# sourceMappingURL=organization.92846198.js.map