(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["welcome"],{

/***/ "bd89":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/cass-logo-white.eb44ee72.svg";

/***/ }),

/***/ "eec55":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c0ad154e-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Welcome.vue?vue&type=template&id=986108d4
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    attrs: {
      "id": "welcome"
    }
  }, [_c('div', {
    staticClass: "section"
  }, [_c('div', {
    staticClass: "columns is-mobile"
  }, [_c('div', {
    staticClass: "column is-9"
  }, [_c('h1', {
    staticClass: "title is-size-1"
  }, [_vm._v(" Welcome to CaSS ")]), _c('h3', {
    staticClass: "subtitle is-size-3"
  }, [_vm._v(" Competency and Skills System ")]), _c('p', {
    staticClass: "pb-4"
  }, [_vm._v(" CaSS supports authoring frameworks, importing existing frameworks from supported document types, and editing frameworks of competencies, skills, and other capabilities. You can navigate to the "), _c('router-link', {
    staticClass: "custom-link local",
    attrs: {
      "to": {
        path: '/frameworks',
        query: _vm.queryParams
      }
    }
  }, [_vm._v(" frameworks page ")]), _vm._v(" and start creating frameworks right away without following the below steps. ")], 1), _c('div', {
    staticClass: "py-2"
  }, [_c('div', {
    staticClass: "py-2"
  }, [_c('h3', {
    staticClass: "title is-size-2"
  }, [_vm._v(" Getting Started ")]), _c('h4', {
    staticClass: "has-text-weight-semibold is-size-4"
  }, [_vm._v(" 1. Create your user and login ")]), _c('p', {
    staticClass: "is-size-6"
  }, [_vm._v(" Navigate to the "), _vm.$store.getters['featuresEnabled/apiLoginEnabled'] ? _c('router-link', {
    staticClass: "custom-link local",
    attrs: {
      "to": {
        path: '/login',
        query: _vm.queryParams
      }
    }
  }, [_vm._v(" login screen ")]) : _c('router-link', {
    staticClass: "custom-link local",
    attrs: {
      "to": {
        path: '/legacyLogin',
        query: _vm.queryParams
      }
    }
  }, [_vm._v(" login screen ")]), _vm._v(" and select create a new user. Input your details. After creation, login to your account using the username you created. You can now access the user and groups manager as well as create comments on frameworks. ")], 1)]), _c('div', {
    staticClass: "py-2"
  }, [_c('h4', {
    staticClass: "has-text-weight-semibold is-size-4"
  }, [_vm._v(" 2. Create user groups for collaborating ")]), _c('p', {
    staticClass: "is-size-6"
  }, [_vm._v(" If your team members have also created their account, and you are logged in, you can navigate to the "), _c('router-link', {
    staticClass: "custom-link local",
    attrs: {
      "to": {
        path: '/users',
        query: _vm.queryParams
      }
    }
  }, [_vm._v(" user/groups page ")]), _vm._v(" and configure a group with defined readers and authors. ")], 1)]), _c('div', {
    staticClass: "py-2"
  }, [_c('h4', {
    staticClass: "has-text-weight-semibold is-size-4"
  }, [_vm._v(" 3. Create a configuration ")]), _c('p', {
    staticClass: "is-size-6"
  }, [_vm._v(" The "), _c('router-link', {
    staticClass: "custom-link local",
    attrs: {
      "to": {
        path: '/configuration',
        query: _vm.queryParams
      }
    }
  }, [_vm._v(" configuration manager ")]), _vm._v(" allows you to have full control over the properties you can add to frameworks and competencies. This includes relationship types and resource types. Configure the labels you want to use on editable forms for managing these properties. ")], 1)]), _c('div', {
    staticClass: "py-1"
  }, [_c('h4', {
    staticClass: "has-text-weight-semibold is-size-4"
  }, [_vm._v(" 4. Author a framework ")]), _c('p', {
    staticClass: "is-size-6"
  }, [_vm._v(" Navigate to the "), _c('router-link', {
    staticClass: "custom-link local",
    attrs: {
      "to": {
        path: '/frameworks',
        query: _vm.queryParams
      }
    }
  }, [_vm._v(" framework page ")]), _vm._v(" and create a new framework. Give your framework a memorable name and save it. ")], 1)]), _vm._m(0)])]), _c('div', {
    staticClass: "column is-3 px-4 py-4"
  }, [_c('h2', {
    staticClass: "title is-size-3"
  }, [_vm._v(" Helpful links ")]), _c('h2', {
    staticClass: "header has-text-weight-bold is-size-5"
  }, [_vm._v(" Documentation ")]), _vm._m(1), _c('h2', {
    staticClass: "header pt-4 has-text-weight-bold is-size-5"
  }, [_vm._v(" Resources ")]), _vm._m(2), _c('h2', {
    staticClass: "header pt-4 has-text-weight-bold is-size-5"
  }, [_vm._v(" Import Example Frameworks "), _vm.importing ? _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-spinner fa-pulse"
  })]) : _vm._e(), _vm.error ? _c('span', {
    staticClass: "help is-danger"
  }, [_vm._v(" " + _vm._s(_vm.error) + " ")]) : _vm._e()]), _c('ul', [_c('li', [_c('a', {
    staticClass: "custom-link external",
    attrs: {
      "target": "_blank"
    },
    on: {
      "click": _vm.importOnetBasicSkills
    }
  }, [_vm._v("ONET: Basic Skills")])]), _c('li', [_c('a', {
    staticClass: "custom-link external",
    attrs: {
      "target": "_blank"
    },
    on: {
      "click": _vm.importHarvardEmotionalIntelligence
    }
  }, [_vm._v("Harvard: Emotional Intelligence")])]), _c('li', [_c('a', {
    staticClass: "custom-link external",
    attrs: {
      "target": "_blank"
    },
    on: {
      "click": _vm.importACTCollaborativeProblemSolving
    }
  }, [_vm._v("ACT: Collaborative Problem Solving")])])]), _c('h2', {
    staticClass: "header pt-4 has-text-weight-bold is-size-5"
  }, [_vm._v(" Get in touch ")]), _vm._m(3)])])])]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "py-1"
  }, [_c('h4', {
    staticClass: "has-text-weight-semibold is-size-4"
  }, [_vm._v(" 5. Collaborate with your team ")]), _c('p', {
    staticClass: "is-size-6"
  }, [_vm._v(" Members with view access will be able to read and comment on the framework when logged in. Members with admin access will be able to view, edit, manage users, and delete the framework when logged in. Use comments to create dialogues around your authoring process. ")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('ul', [_c('li', [_c('a', {
    staticClass: "custom-link external",
    attrs: {
      "href": "docs/authoring/framework-properties/",
      "target": "_blank"
    }
  }, [_vm._v("Framework properties ")])]), _c('li', [_c('a', {
    staticClass: "custom-link external",
    attrs: {
      "href": "docs/authoring/competency-properties/",
      "target": "_blank"
    }
  }, [_vm._v(" Competency properties")])]), _c('li', [_c('a', {
    staticClass: "custom-link external",
    attrs: {
      "href": "docs/authoring/configuration/",
      "target": "_blank"
    }
  }, [_vm._v(" Configuration")])]), _c('li', [_c('a', {
    staticClass: "custom-link external",
    attrs: {
      "href": "docs/authoring/users-and-groups/",
      "target": "_blank"
    }
  }, [_vm._v(" User groups")])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('ul', [_c('li', [_c('a', {
    staticClass: "custom-link external",
    attrs: {
      "href": "https://adlnet.gov/resources/publications/2020/03/Competency-Framework-Development-Process-Report/",
      "target": "_blank"
    }
  }, [_vm._v("Authoring Report")])]), _c('li', [_c('a', {
    staticClass: "custom-link external",
    attrs: {
      "href": "https://cassproject.org",
      "target": "_blank"
    }
  }, [_vm._v("cassproject.org")])]), _c('li', [_c('a', {
    staticClass: "custom-link external",
    attrs: {
      "href": "http://devs.cassproject.org/",
      "target": "_blank"
    }
  }, [_vm._v("CaSS Developer Guide")])]), _c('li', [_c('a', {
    staticClass: "custom-link external",
    attrs: {
      "href": "http://docs.cassproject.org/",
      "target": "_blank"
    }
  }, [_vm._v("CaSS Official Documentation")])]), _c('li', [_c('a', {
    staticClass: "custom-link external",
    attrs: {
      "href": "https://github.com/cassproject",
      "target": "_blank"
    }
  }, [_vm._v("CaSS on Github")])]), _c('li', [_c('a', {
    staticClass: "custom-link external",
    attrs: {
      "href": "https://adlnet.gov/",
      "target": "_blank"
    }
  }, [_vm._v("Advanced Distributed Learning Initiative")])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('ul', [_c('li', [_c('a', {
    staticClass: "custom-link external",
    attrs: {
      "href": "https://docs.google.com/a/eduworks.com/forms/viewform?bc=transparent&embedded=true&f=Arial%252C%2BVerdana%252C%2Bsans-serif&hl=en&htc=%2523666666&id=1BMaboapV0IaS8iGnCJut2obPZ9y3CWkxXuvy-7krcgE&lc=%2523003965&pli=1&tc=%2523444444&ttl=0",
      "target": "_blank"
    }
  }, [_vm._v("Join the Slack Channel")])]), _c('li', [_c('a', {
    staticClass: "custom-link external",
    attrs: {
      "href": "mailto:cass@eduworks.com",
      "target": "_blank"
    }
  }, [_vm._v("Email us")])])]);
}];

// CONCATENATED MODULE: ./src/views/Welcome.vue?vue&type=template&id=986108d4

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
var regeneratorRuntime = __webpack_require__("c7eb");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("fb6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.json.stringify.js
var es_json_stringify = __webpack_require__("e9c4");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// EXTERNAL MODULE: ./src/assets/cass-logo-white.svg
var cass_logo_white = __webpack_require__("bd89");
var cass_logo_white_default = /*#__PURE__*/__webpack_require__.n(cass_logo_white);

// EXTERNAL MODULE: ./src/mixins/common.js
var common = __webpack_require__("872c");

// CONCATENATED MODULE: ./node_modules/file-loader/dist/cjs.js!./files/Harvard Emotional Intelligence.csv
/* harmony default export */ var Harvard_Emotional_Intelligence = (__webpack_require__.p + "64bbdedfa22f447f7fc68c2e9edfcd82.csv");
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Welcome.vue?vue&type=script&lang=js











/* harmony default export */ var Welcomevue_type_script_lang_js = ({
  name: 'Welcome',
  data: function data() {
    return {
      casslogo: cass_logo_white_default.a,
      importing: false,
      error: null,
      repo: window.repo,
      harvardFile: Harvard_Emotional_Intelligence,
      baseRepoUrl: ""
    };
  },
  mixins: [common["a" /* default */]],
  mounted: function mounted() {
    var index = this.repo.selectedServer.lastIndexOf('api');
    this.baseRepoUrl = this.repo.selectedServer.slice(0, index);
  },
  computed: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["c" /* mapState */])({
    loggedInPerson: function loggedInPerson(state) {
      return state.user.loggedOnPerson;
    },
    queryParams: function queryParams(state) {
      return state.editor.queryParams;
    }
  })), {}, {
    linkToLegacyDemos: function linkToLegacyDemos() {
      return EcIdentityManager.default.ids && EcIdentityManager.default.ids.length > 0;
    }
  }),
  methods: {
    importSuccess: function importSuccess(framework) {
      this.importing = false;
      this.$router.push({
        name: "framework",
        params: {
          frameworkId: framework.shortId()
        }
      });
    },
    importOnetBasicSkills: function importOnetBasicSkills() {
      var url = "https://www.onetcenter.org/ctdlasn/graph/ce-07c25f74-9119-11e8-b852-782bcb5df6ac";
      var me = this;
      this.importing = true;
      this.error = null;
      EcRemote.getExpectingString(url, null, function (result) {
        var graph = result["@graph"];
        if (graph != null) {
          me.importJsonLd(result);
        } else {
          me.error = "Import Error";
          me.importing = false;
        }
      }, function (failure) {
        me.error = "Import Error";
        me.importing = false;
      });
    },
    importJsonLd: function importJsonLd(data) {
      var formData = new FormData();
      if (data != null && data !== undefined) {
        formData.append('data', JSON.stringify(data));
      }
      var identity = EcIdentityManager.default.ids[0];
      if (identity != null) {
        formData.append('owner', identity.ppk.toPk().toPem());
      }
      var me = this;
      me.$store.commit('app/importFramework', null);
      EcRemote.postInner(this.repo.selectedServer, "ctdlasn", formData, null, /*#__PURE__*/function () {
        var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee(data) {
          var data1, data2, framework;
          return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                if (data.indexOf("ctdlasn") !== -1) {
                  data1 = data.substring(0, data.indexOf("ctdlasn"));
                  data2 = data.substring(data.indexOf("ctdlasn") + 7);
                  data = data1 + "data" + data2;
                }
                _context.next = 3;
                return EcFramework.get(data);
              case 3:
                framework = _context.sent;
                me.$store.commit('app/importFramework', framework);
                me.$store.commit('editor/framework', framework);
                me.spitEvent("importFinished", framework.shortId(), "importPage");
                me.importSuccess(framework);
              case 8:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }(), function (failure) {
        me.error = "Import Error";
        me.importing = false;
      });
    },
    importHarvardEmotionalIntelligence: function importHarvardEmotionalIntelligence() {
      this.importing = true;
      this.error = null;
      var ceo = null;
      if (EcIdentityManager.default.ids.length > 0) {
        ceo = EcIdentityManager.default.ids[0];
      }
      var me = this;
      EcRemote.getExpectingString(me.harvardFile, null, function (result) {
        CTDLASNCSVImport.importFrameworksAndCompetencies(me.repo, result, function (frameworks, competencies, relations) {
          if (me.queryParams.ceasnDataFields === true) {
            for (var i = 0; i < frameworks.length; i++) {
              if (frameworks[i]["schema:inLanguage"] == null || frameworks[i]["schema:inLanguage"] === undefined) {
                me.setDefaultLanguage();
                frameworks[i]["schema:inLanguage"] = defaultLanguage;
              }
            }
          }
          var all = frameworks.concat(competencies).concat(relations);
          me.repo.multiput(all, function () {
            for (var i = 0; i < frameworks.length; i++) {
              me.$store.commit('app/importFramework', frameworks[i]);
              me.$store.commit('editor/framework', frameworks[i]);
              me.spitEvent("importFinished", frameworks[i].shortId(), "importPage");
            }
            me.importSuccess(frameworks[0]);
          }, function (failure) {
            me.error = "Import Error";
            me.importing = false;
          });
        }, function () {}, ceo);
      }, function (failure) {
        me.error = "Import Error";
        me.importing = false;
      });
    },
    importACTCollaborativeProblemSolving: function importACTCollaborativeProblemSolving() {
      this.importing = true;
      this.error = null;
      var me = this;
      var serverUrl = "http://opensalt.opened.com/";
      var id = "https://frameworks.act.org/uri/73a4ee28-ceeb-11e7-bfb5-b1077cd4fffe";
      var uuid = "73a4ee28-ceeb-11e7-bfb5-b1077cd4fffe";
      var identity = EcIdentityManager.default.ids[0];
      var formData = new FormData();
      if (identity != null) {
        formData.append('owner', identity.ppk.toPk().toPem());
      }
      EcRemote.postInner(this.repo.selectedServer, "ims/case/harvest?caseEndpoint=" + serverUrl + "&dId=" + uuid, formData, null, function (success) {
        EcFramework.get(id, function (f) {
          me.$store.commit('editor/framework', f);
          me.spitEvent("importFinished", f.shortId(), "importPage");
          me.$store.commit('app/importFramework', f);
          me.importSuccess(f);
        }, function () {
          me.error = "Import Error";
          me.importing = false;
        });
      }, function (failure) {
        me.error = "Import Error";
        me.importing = false;
      });
    }
  }
});
// CONCATENATED MODULE: ./src/views/Welcome.vue?vue&type=script&lang=js
 /* harmony default export */ var views_Welcomevue_type_script_lang_js = (Welcomevue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/views/Welcome.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  views_Welcomevue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Welcome = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=welcome.18ebd282.js.map