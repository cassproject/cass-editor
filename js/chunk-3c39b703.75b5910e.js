(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-3c39b703","chunk-25a2af2a","chunk-25a2af2a"],{

/***/ "0dd5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"50b602ed-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/LogoutSuccess.vue?vue&type=template&id=7ad0ead3
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('modal-template', {
    attrs: {
      "active": true,
      "type": "primary"
    },
    on: {
      "close": function close($event) {
        return _vm.$emit('close');
      }
    }
  }, [_c('template', {
    slot: "modal-header"
  }, [_c('span', {
    staticClass: "title has-text-white"
  }, [_vm._v("Logged Out")])]), _c('template', {
    slot: "modal-body"
  }, [_c('div', {
    staticClass: "section has-background-white has-text-centered"
  }, [_c('p', [_c('strong', [_vm._v("You have been logged out.")])])])]), _c('template', {
    slot: "modal-foot"
  }, [_c('div', {
    staticClass: "buttons is-spaced"
  }, [_c('button', {
    staticClass: "button is-secondary is-outlined",
    on: {
      "click": function click($event) {
        return _vm.$store.commit('app/closeModal');
      }
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-times-circle"
  })]), _c('span', [_vm._v("close")])]), _c('button', {
    staticClass: "button is-primary is-outlined",
    on: {
      "click": _vm.close
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-sign-in-alt"
  })]), _c('span', [_vm._v("login")])])])])], 2);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/modalContent/LogoutSuccess.vue?vue&type=template&id=7ad0ead3

// EXTERNAL MODULE: ./src/components/modalContent/ModalTemplate.vue + 4 modules
var ModalTemplate = __webpack_require__("af07");

// EXTERNAL MODULE: ./src/mixins/cassApi.js
var cassApi = __webpack_require__("f3d2");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/LogoutSuccess.vue?vue&type=script&lang=js


/* harmony default export */ var LogoutSuccessvue_type_script_lang_js = ({
  name: 'LogoutSuccessModal',
  mixins: [cassApi["a" /* cassApi */]],
  props: {
    isActive: Boolean
  },
  components: {
    ModalTemplate: ModalTemplate["a" /* default */]
  },
  methods: {
    close: function close() {
      this.$store.commit('app/closeModal');
      if (this.$store.getters['featuresEnabled/apiLoginEnabled']) {
        this.redirectToExternalLogout();
      } else {
        this.goToLogin();
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/modalContent/LogoutSuccess.vue?vue&type=script&lang=js
 /* harmony default export */ var modalContent_LogoutSuccessvue_type_script_lang_js = (LogoutSuccessvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/modalContent/LogoutSuccess.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  modalContent_LogoutSuccessvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var LogoutSuccess = __webpack_exports__["default"] = (component.exports);

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

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"50b602ed-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/ModalTemplate.vue?vue&type=template&id=1c4e04a7
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

/***/ "f3d2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cassApi; });
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("b64b");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("b0c0");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("e9c4");
/* harmony import */ var core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("14d9");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("d3b7");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("ddb0");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_5__);












var cassApi = {
  name: 'cassApi',
  data: function data() {
    return {
      USER_PROFILE_SERVICE: "user/profile",
      USER_CREATE_SERVICE: "user",
      USER_LOGIN_SERVICE: "login",
      USER_LOGOUT_SERVICE: "logout",
      LOGOUT_REDIRECT_URL: window.location.origin + "/cass-editor/#/login"
    };
  },
  methods: {
    parseCredentialsFromProfileResponse: function parseCredentialsFromProfileResponse(profileResponse) {
      var pro = JSON.parse(profileResponse.responseText);
      var credentials = {};
      credentials.username = pro["preferred_username"];
      credentials.password = pro["cass_password"];
      if (pro["email"]) {
        credentials.email = pro["email"];
      } else {
        credentials.email = "n/a";
      }
      if (pro["name"]) {
        credentials.name = pro["name"];
      } else if (pro["given_name"] && pro["family_name"]) {
        credentials.name = pro["given_name"] + " " + pro["family_name"];
      } else {
        credentials.name = pro["preferred_username"];
      }
      return credentials;
    },
    performCreateUser: function performCreateUser(userInfo, responseCallback) {
      var oReq = new XMLHttpRequest();
      oReq.addEventListener("load", function (x) {
        return responseCallback(x.currentTarget);
      });
      oReq.withCredentials = true;
      var serviceEndpoint = this.cassApiLocation + this.USER_CREATE_SERVICE;
      oReq.open("POST", serviceEndpoint);
      oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      oReq.send(JSON.stringify({
        username: userInfo.username,
        password: userInfo.password,
        email: userInfo.email,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName
      }));
    },
    getUserProfile: function getUserProfile(responseCallback) {
      var oReq = new XMLHttpRequest();
      oReq.addEventListener("load", function (x) {
        return responseCallback(x.currentTarget);
      });
      oReq.withCredentials = true;
      var serviceEndpoint = this.cassApiLocation + this.USER_PROFILE_SERVICE;
      oReq.open("GET", serviceEndpoint);
      oReq.send();
    },
    redirectToExternalLogin: function redirectToExternalLogin() {
      appLog("Redirecting to external login...");
      window.location = this.repositorySsoOptions.ssoLogin + "?redirectUrl=" + encodeURIComponent(window.location);
    },
    redirectToExternalLogout: function redirectToExternalLogout() {
      appLog("Redirecting to external logout...");
      window.location = this.repositorySsoOptions.ssoLogout + "?redirectUrl=" + encodeURIComponent(window.location);
    },
    goToLogin: function goToLogin() {
      if (this.apiLoginEnabled) {
        this.$router.push({
          path: '/login'
        });
      } else {
        this.$router.push({
          path: '/legacyLogin'
        });
      }
    },
    checkExternalLogoutStatus: function checkExternalLogoutStatus(logoutResponse) {
      if (logoutResponse.status !== 200) {
        appLog('Logout fired but returned an unexpected response code: ' + logoutResponse.status);
      }
      this.goToLogin();
    },
    performExternalLogout: function performExternalLogout() {
      var _this = this;
      appLog("Performing external logout...");
      var oReq = new XMLHttpRequest();
      oReq.addEventListener("load", function (x) {
        return _this.checkExternalLogoutStatus(x.currentTarget);
      });
      oReq.withCredentials = true;
      var serviceEndpoint = this.cassApiLocation + this.USER_LOGOUT_SERVICE;
      oReq.open("GET", serviceEndpoint);
      oReq.send();
    },
    performApplicationLogout: function performApplicationLogout() {
      appLog("Performing application logout...");
      EcIdentityManager.default.clearContacts();
      EcIdentityManager.default.clearIdentities();
      var clearPerson = {};
      this.$store.commit('user/loggedOnPerson', clearPerson);
      this.$store.commit('app/showModal', {
        component: 'LogoutSuccess'
      });
    },
    performApplicationLogin: function performApplicationLogin() {
      appLog("Performing application login...");
      EcIdentityManager.default.clearContacts();
      EcIdentityManager.default.clearIdentities();
      var clearPerson = {};
      this.$store.commit('user/loggedOnPerson', clearPerson);
      if (this.apiLoginEnabled) this.redirectToExternalLogin();else this.goToLogin();
    },
    addQueryParams: function addQueryParams() {
      var paramObj = this.$store.getters['editor/queryParams'];
      var keys = EcObject.keys(paramObj);
      if (paramObj && keys.length) {
        var toAdd = '?';
        for (var each in keys) {
          if (each !== 0) {
            toAdd += "&";
          }
          var key = keys[each];
          var val = paramObj[key];
          if (EcArray.isArray(val)) {
            for (var i in val) {
              if (i !== 0) {
                toAdd += "&";
              }
              toAdd += key + "=" + val[i];
            }
          } else {
            toAdd += key + "=" + val;
          }
        }
        return toAdd;
      } else {
        return '';
      }
    }
  },
  computed: {
    cassApiLocation: function cassApiLocation() {
      return this.$store.getters['environment/cassApiLocation'];
    },
    repositorySsoOptions: function repositorySsoOptions() {
      return this.$store.getters['user/repositorySsoOptions'];
    },
    apiLoginEnabled: function apiLoginEnabled() {
      return this.$store.getters['featuresEnabled/apiLoginEnabled'];
    }
  }
};

/***/ })

}]);
//# sourceMappingURL=chunk-3c39b703.75b5910e.js.map