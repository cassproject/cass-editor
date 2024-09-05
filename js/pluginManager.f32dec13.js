(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pluginManager","chunk-2d0dab46","chunk-2d0dab46"],{

/***/ "0162":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return pluginUtil; });
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("caad");
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("14d9");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("a434");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("b0c0");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("e9c4");
/* harmony import */ var core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("b64b");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("d3b7");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("ac1f");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_string_ends_with_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("8a79");
/* harmony import */ var core_js_modules_es_string_ends_with_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_ends_with_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("2532");
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("3ca3");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("1276");
/* harmony import */ var core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("ddb0");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_web_url_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("2b3d");
/* harmony import */ var core_js_modules_web_url_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_url_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_web_url_to_json_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("bf19");
/* harmony import */ var core_js_modules_web_url_to_json_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_url_to_json_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_web_url_search_params_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("9861");
/* harmony import */ var core_js_modules_web_url_search_params_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_url_search_params_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_web_url_search_params_delete_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("88a7");
/* harmony import */ var core_js_modules_web_url_search_params_delete_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_url_search_params_delete_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_web_url_search_params_has_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("271a");
/* harmony import */ var core_js_modules_web_url_search_params_has_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_url_search_params_has_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_web_url_search_params_size_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("5494");
/* harmony import */ var core_js_modules_web_url_search_params_size_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_url_search_params_size_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("b85c");







































var pluginUtil = {
  name: 'pluginUtil',
  data: function data() {
    return {
      PLUGIN_NAME_PARTS_DELIMITER: '/',
      DEFAULT_PLUGIN_LAUNCH_LOCATION: 'main',
      DEFAULT_PLUGIN_LAUNCH_CATEGORY: 'Plugins',
      PLUGIN_ENABLED_LS_KEY: 'cassAuthoringToolPluginsEnabled',
      LOCAL_PLUGIN_LIST_KEY: 'cassAuthoringToolLocalPlugins',
      mdPluginUrlList: [],
      mdPluginSuccessCallback: null,
      numPluginManifestsToGet: 0,
      numPluginManifestsGotten: 0,
      mdPluginCurrentUrl: '',
      pluginManifestData: {},
      pluginList: [],
      buildPluginListSuccessCallback: null
    };
  },
  methods: {
    isValidUrl: function isValidUrl(s) {
      try {
        var u = new URL(s);
      } catch (e) {
        return false;
      }
      return true;
    },
    checkManifestDataForPlugin: function checkManifestDataForPlugin() {
      if (this.numPluginManifestsGotten >= this.numPluginManifestsToGet) this.mdPluginSuccessCallback();else this.getManifestDataForPlugin(this.numPluginManifestsGotten);
    },
    concatenateRemainingPluginNameParts: function concatenateRemainingPluginNameParts(nameParts) {
      var s = '';
      for (var i = 2; i < nameParts.length; i++) {
        s += nameParts[i];
        if (i + 1 < nameParts.length) s += this.PLUGIN_NAME_PARTS_DELIMITER;
      }
      return s;
    },
    parsePluginManifestName: function parsePluginManifestName(manifestName) {
      var pmn = {};
      var np = manifestName.split(this.PLUGIN_NAME_PARTS_DELIMITER);
      if (np.length >= 3 && (np[0].toLowerCase().equals('screen') || np[0].toLowerCase().equals('main'))) {
        pmn.launchLocation = np[0];
        pmn.launchCategory = np[1];
        pmn.launchName = this.concatenateRemainingPluginNameParts(np);
      } else {
        pmn.launchLocation = this.DEFAULT_PLUGIN_LAUNCH_LOCATION;
        pmn.launchCategory = this.DEFAULT_PLUGIN_LAUNCH_CATEGORY;
        pmn.launchName = manifestName;
      }
      return pmn;
    },
    buildShortcutsForPlugin: function buildShortcutsForPlugin(manifestDataObject, manifestData) {
      var _iterator = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_19__[/* default */ "a"])(manifestData.shortcuts),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var so = _step.value;
          var sdo = this.parsePluginManifestName(so.name);
          sdo.launchUrl = manifestDataObject.scope + so.url;
          // sdo.launchUrl = sdo.launchUrl.replaceAll('//', '/');
          sdo.queryParams = [];
          if (so['query_params']) {
            var _iterator2 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_19__[/* default */ "a"])(so['query_params']),
              _step2;
            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var qp = _step2.value;
                sdo.queryParams.push(qp);
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          }
          manifestDataObject.shortcuts.push(sdo);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    },
    buildDefaultShortcutForPlugin: function buildDefaultShortcutForPlugin(manifestDataObject) {
      var sdo = this.parsePluginManifestName(manifestDataObject.name);
      sdo.launchUrl = manifestDataObject.scope;
      manifestDataObject.shortcuts.push(sdo);
    },
    parsePluginManifest: function parsePluginManifest(manifestData) {
      var mdo = {};
      mdo.name = manifestData.name;
      mdo.scope = manifestData.scope;
      mdo.shortcuts = [];
      if (manifestData.shortcuts && manifestData.shortcuts.length > 0) {
        this.buildShortcutsForPlugin(mdo, manifestData);
      } else this.buildDefaultShortcutForPlugin(mdo);
      return mdo;
    },
    getManifestDataForPluginSuccess: function getManifestDataForPluginSuccess(responseData) {
      var mdo = {};
      try {
        mdo = this.parsePluginManifest(responseData);
        mdo.loaded = true;
      } catch (e) {
        mdo.loaded = false;
        mdo.error = 'Could not parse manifest';
      }
      mdo.pluginUrl = this.mdPluginCurrentUrl;
      this.pluginManifestData[this.mdPluginCurrentUrl] = mdo;
      this.numPluginManifestsGotten++;
      this.checkManifestDataForPlugin();
    },
    getManifestDataForPluginFailure: function getManifestDataForPluginFailure(err) {
      var mdo = {};
      mdo.pluginUrl = this.mdPluginCurrentUrl;
      mdo.loaded = false;
      mdo.error = err;
      this.pluginManifestData[this.mdPluginCurrentUrl] = mdo;
      this.numPluginManifestsGotten++;
      this.checkManifestDataForPlugin();
    },
    getManifestDataForPlugin: function getManifestDataForPlugin(pluginIdx) {
      var pluginUrl = this.mdPluginUrlList[pluginIdx];
      var manifestUrl = '';
      if (pluginUrl.endsWith("/")) manifestUrl = pluginUrl + "manifest.json";else manifestUrl = pluginUrl + "/manifest.json";
      this.mdPluginCurrentUrl = pluginUrl;
      this.$http.get(manifestUrl).then(function (response) {
        this.getManifestDataForPluginSuccess(response.data);
      }, function (error) {
        this.getManifestDataForPluginFailure(error);
      });
    },
    removeIrrelevantPluginEntriesFromManifestData: function removeIrrelevantPluginEntriesFromManifestData(pluginUrlList) {
      var pluginMdKeys = Object.keys(this.pluginManifestData);
      for (var _i = 0, _pluginMdKeys = pluginMdKeys; _i < _pluginMdKeys.length; _i++) {
        var pk = _pluginMdKeys[_i];
        if (!pluginUrlList.includes(pk)) delete this.pluginManifestData[pk];
      }
    },
    buildManifestDataPluginUrlList: function buildManifestDataPluginUrlList(pluginUrlList) {
      this.mdPluginUrlList = [];
      var pluginMdKeys = Object.keys(this.pluginManifestData);
      var _iterator3 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_19__[/* default */ "a"])(pluginUrlList),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var pu = _step3.value;
          if (!pluginMdKeys.includes(pu)) this.mdPluginUrlList.push(pu);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    },
    prepDataForManifestLoad: function prepDataForManifestLoad(pluginUrlList) {
      // Trying to be smart with this so it doesn't try to load plugin manifest data it already has...
      if (!this.pluginManifestData || Object.keys(this.pluginManifestData).length === 0) {
        this.mdPluginUrlList = pluginUrlList;
        this.pluginManifestData = {};
      } else {
        this.removeIrrelevantPluginEntriesFromManifestData(pluginUrlList);
        this.buildManifestDataPluginUrlList(pluginUrlList);
      }
    },
    loadManifestDataForPluginUrlList: function loadManifestDataForPluginUrlList(pluginUrlList, mdPluginSuccessCallback) {
      if (!pluginUrlList || pluginUrlList.length === 0) mdPluginSuccessCallback();else {
        this.mdPluginSuccessCallback = mdPluginSuccessCallback;
        this.prepDataForManifestLoad(pluginUrlList);
        if (this.mdPluginUrlList.length === 0) mdPluginSuccessCallback();else {
          this.numPluginManifestsToGet = this.mdPluginUrlList.length;
          this.numPluginManifestsGotten = 0;
          this.getManifestDataForPlugin(0);
        }
      }
    },
    getEnabledPluginUrlList: function getEnabledPluginUrlList() {
      if (!this.pluginList || this.pluginList.length === 0) return [];else {
        var pul = [];
        var _iterator4 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_19__[/* default */ "a"])(this.pluginList),
          _step4;
        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var pi = _step4.value;
            if (pi.isEnabled) pul.push(pi.url);
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
        return pul;
      }
    },
    getPluginEnabledMapFromLocalStorage: function getPluginEnabledMapFromLocalStorage() {
      var pluginEnabledMapString = localStorage.getItem(this.PLUGIN_ENABLED_LS_KEY);
      var pluginEnabledMap = null;
      if (!pluginEnabledMapString) pluginEnabledMap = {};else pluginEnabledMap = JSON.parse(pluginEnabledMapString);
      return pluginEnabledMap;
    },
    getIsPluginEnabled: function getIsPluginEnabled(pluginId) {
      var pluginEnabledMap = this.getPluginEnabledMapFromLocalStorage();
      if (pluginEnabledMap[pluginId]) return pluginEnabledMap[pluginId];else return false;
    },
    setPluginAsEnabled: function setPluginAsEnabled(pluginId) {
      var pluginEnabledMap = this.getPluginEnabledMapFromLocalStorage();
      pluginEnabledMap[pluginId] = true;
      localStorage.setItem(this.PLUGIN_ENABLED_LS_KEY, JSON.stringify(pluginEnabledMap));
      // TODO need to do some type of session plugin rebuild
    },
    setPluginAsDisabled: function setPluginAsDisabled(pluginId) {
      var pluginEnabledMap = this.getPluginEnabledMapFromLocalStorage();
      delete pluginEnabledMap[pluginId];
      localStorage.setItem(this.PLUGIN_ENABLED_LS_KEY, JSON.stringify(pluginEnabledMap));
      // TODO need to do some type of session plugin rebuild
    },
    setAllPluginsAsDisabled: function setAllPluginsAsDisabled() {
      localStorage.removeItem(this.PLUGIN_ENABLED_LS_KEY);
      // TODO need to do some type of session plugin rebuild
    },
    getPluginListFromLocalStorage: function getPluginListFromLocalStorage() {
      var localPluginListString = localStorage.getItem(this.LOCAL_PLUGIN_LIST_KEY);
      var localPluginList = [];
      if (!localPluginListString) localPluginList = [];else localPluginList = JSON.parse(localPluginListString);
      return localPluginList;
    },
    addLocalPlugin: function addLocalPlugin(pluginUrl) {
      var localPluginList = this.getPluginListFromLocalStorage();
      if (!localPluginList.includes(pluginUrl)) localPluginList.push(pluginUrl);
      localStorage.setItem(this.LOCAL_PLUGIN_LIST_KEY, JSON.stringify(localPluginList));
    },
    removeLocalPlugin: function removeLocalPlugin(pluginUrl) {
      var localPluginList = this.getPluginListFromLocalStorage();
      if (localPluginList.includes(pluginUrl)) {
        for (var i = 0; i < localPluginList.length; i++) {
          if (localPluginList[i].equals(pluginUrl)) {
            localPluginList.splice(i, 1);
            break;
          }
        }
        localStorage.setItem(this.LOCAL_PLUGIN_LIST_KEY, JSON.stringify(localPluginList));
      }
    },
    getPluginsFromRepoSuccess: function getPluginsFromRepoSuccess(ecRemoteLda) {
      this.buildPluginListSuccessCallback();
    },
    getPluginsFromRepoFailure: function getPluginsFromRepoFailure() {
      appLog("Plugin search failure: " + msg);
      this.buildPluginListSuccessCallback();
    },
    buildPluginListItemFromRepoPlugin: function buildPluginListItemFromRepoPlugin(repoPlug) {
      // TODO
    },
    getPluginsFromRepo: function getPluginsFromRepo() {
      // TODO
      this.getPluginsFromRepoSuccess(null);
    },
    buildPluginListItemFromCuratedPlugin: function buildPluginListItemFromCuratedPlugin(curPlug) {
      var p = {};
      p.id = curPlug.id;
      p.url = curPlug.url;
      p.isCurated = true;
      p.isNew = false;
      p.isOwned = false;
      p.isEnabled = this.getIsPluginEnabled(curPlug.id);
      return p;
    },
    buildPluginListItemFromLocalPlugin: function buildPluginListItemFromLocalPlugin(localPlug) {
      var p = {};
      p.id = localPlug;
      p.url = localPlug;
      p.isCurated = false;
      p.isNew = false;
      p.isOwned = true;
      p.isEnabled = this.getIsPluginEnabled(localPlug);
      return p;
    },
    getPluginsFromCuratedList: function getPluginsFromCuratedList() {
      var _iterator5 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_19__[/* default */ "a"])(this.$store.getters['app/curatedPlugins']),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var p = _step5.value;
          this.pluginList.push(this.buildPluginListItemFromCuratedPlugin(p));
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    },
    getPluginsFromLocalStorage: function getPluginsFromLocalStorage() {
      var _iterator6 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_19__[/* default */ "a"])(this.getPluginListFromLocalStorage()),
        _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var p = _step6.value;
          this.pluginList.push(this.buildPluginListItemFromLocalPlugin(p));
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
    },
    buildPluginList: function buildPluginList(buildPluginListSuccessCallback) {
      this.buildPluginListSuccessCallback = buildPluginListSuccessCallback;
      this.pluginList = [];
      this.getPluginsFromCuratedList();
      this.getPluginsFromLocalStorage();
      this.getPluginsFromRepo();
    }
  },
  computed: {}
};

/***/ }),

/***/ "1279":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "3fbe":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "4826":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "55c5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.json.stringify.js
var es_json_stringify = __webpack_require__("e9c4");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"01d4e028-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/plugins/PluginManager.vue?vue&type=template&id=bbfcdff6&scoped=true

var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    attrs: {
      "id": "plugin-manager"
    }
  }, [_c('div', {
    staticClass: "modal",
    class: [{
      'is-active': _vm.pluginManagerBusy
    }]
  }, [_c('div', {
    staticClass: "modal-background"
  }), _vm._m(0)]), _c('div', {
    staticClass: "modal",
    class: [{
      'is-active': _vm.showConfirmDeletePluginModal
    }]
  }, [_c('div', {
    staticClass: "modal-background"
  }), _c('div', {
    staticClass: "modal-card"
  }, [_c('header', {
    staticClass: "modal-card-head has-background-primary"
  }, [_vm._m(1), _c('button', {
    staticClass: "delete",
    attrs: {
      "aria-label": "close"
    },
    on: {
      "click": _vm.cancelPluginDelete
    }
  })]), _c('section', {
    staticClass: "modal-card-body"
  }, [_vm._v(" Are you sure you wish to remove the plugin "), _c('b', [_vm._v("'" + _vm._s(_vm.pluginToDelete.url) + "'")]), _vm._v("? ")]), _c('footer', {
    staticClass: "modal-card-foot"
  }, [_c('div', {
    staticClass: "buttons is-spaced"
  }, [_c('button', {
    staticClass: "button is-dark is-outlined",
    on: {
      "click": _vm.cancelPluginDelete
    }
  }, [_vm._v(" Cancel ")]), _c('button', {
    staticClass: "button is-outlined is-primary",
    on: {
      "click": _vm.deletePlugin
    }
  }, [_vm._v(" Remove ")])])])])]), !_vm.pluginManagerBusy ? _c('div', {
    staticClass: "container"
  }, [_vm._m(2), _vm.pluginManagerViewMode.equals('list') ? _c('div', {
    staticClass: "section"
  }, [_c('h4', {
    staticClass: "header is-size-3"
  }, [_vm._v(" Plugins ")]), _vm.pluginList.length === 0 ? _c('div', [_c('p', [_vm._v("No plugins are available.")])]) : _vm._e(), _vm.pluginList.length > 0 ? _c('div', {
    staticClass: "table-container"
  }, [_c('table', {
    staticClass: "table is-hoverable is-fullwidth"
  }, [_vm._m(3), _c('tbody', _vm._l(_vm.pluginList, function (pi) {
    return _c('plugin-list-item', {
      key: JSON.stringify(pi),
      attrs: {
        "id": pi.id,
        "url": pi.url,
        "is-curated": pi.isCurated,
        "is-owned": pi.isOwned
      },
      on: {
        "enable-plugin": _vm.enablePlugin,
        "disable-plugin": _vm.disablePlugin,
        "show-delete": _vm.showPluginDelete,
        "show-details": _vm.showPluginDetails
      }
    });
  }), 1)])]) : _vm._e(), _c('div', {
    staticClass: "buttons is-right"
  }, [_c('div', {
    staticClass: "button is-outlined is-primary",
    attrs: {
      "title": "Add New Plugin"
    },
    on: {
      "click": _vm.addNewPlugin
    }
  }, [_vm._m(4), _c('span', [_vm._v(" add new plugin ")])])])]) : _vm._e(), _vm.pluginManagerViewMode.equals('detail') ? _c('div', [_c('plugin-details', {
    attrs: {
      "plugin": _vm.currentPlugin,
      "readOnly": _vm.currentPluginIsReadOnly
    },
    on: {
      "save": _vm.saveCurrentPlugin,
      "cancel": _vm.cancelEditCurrentPlugin,
      "back": _vm.backFromEditCurrentPlugin
    }
  })], 1) : _vm._e()]) : _vm._e()]);
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
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('p', {
    staticClass: "modal-card-title"
  }, [_c('span', {
    staticClass: "title has-text-white"
  }, [_vm._v(" Remove Plugin? ")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "section"
  }, [_c('h3', {
    staticClass: "title is-size-1"
  }, [_vm._v(" Plugin Management ")]), _c('p', {
    staticClass: "description"
  }, [_vm._v(" Plugins provide the capability to add additional CaSS related tools in order to customize your UI. ")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('thead', [_c('tr', [_c('th', [_vm._v(" location ")]), _c('th', {
    attrs: {
      "title": "Curated/Managed by the CaSS Project"
    }
  }, [_vm._v(" curated? ")]), _c('th', [_vm._v(" enabled ")]), _c('th')])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-plus"
  })]);
}];

// CONCATENATED MODULE: ./src/views/plugins/PluginManager.vue?vue&type=template&id=bbfcdff6&scoped=true

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
var createForOfIteratorHelper = __webpack_require__("b85c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("fb6a");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"01d4e028-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/plugins/PluginListItem.vue?vue&type=template&id=3c4bcd9f&scoped=true


var PluginListItemvue_type_template_id_3c4bcd9f_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('tr', [_c('th', [_c('b', [_vm._v(_vm._s(_vm.url))])]), _c('td', [_vm.isCurated ? _c('span', {
    staticClass: "icon has-text-primary"
  }, [_c('i', {
    staticClass: "fa fa-check"
  })]) : _vm._e()]), _c('td', [_c('div', {
    staticClass: "field"
  }, [_c('div', {
    staticClass: "control is-size-3"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.isPluginEnabled,
      expression: "isPluginEnabled"
    }],
    staticClass: "switch is-outlined",
    attrs: {
      "id": _vm.id + 'pluginEnabledSwitch',
      "type": "checkbox",
      "name": _vm.id + 'pluginEnabledSwitch'
    },
    domProps: {
      "checked": Array.isArray(_vm.isPluginEnabled) ? _vm._i(_vm.isPluginEnabled, null) > -1 : _vm.isPluginEnabled
    },
    on: {
      "change": function change($event) {
        var $$a = _vm.isPluginEnabled,
          $$el = $event.target,
          $$c = $$el.checked ? true : false;
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.isPluginEnabled = $$a.concat([$$v]));
          } else {
            $$i > -1 && (_vm.isPluginEnabled = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.isPluginEnabled = $$c;
        }
      }
    }
  }), _c('label', {
    attrs: {
      "for": _vm.id + 'pluginEnabledSwitch'
    }
  })])])]), _c('td', [_vm.isOwned ? _c('div', {
    staticClass: "button is-outlined is-small is-primary",
    attrs: {
      "title": "Manage plugin"
    },
    on: {
      "click": function click($event) {
        return _vm.$emit('show-details', _vm.id);
      }
    }
  }, [_vm._m(0)]) : _vm._e(), _vm.isOwned ? _c('div', {
    staticClass: "button is-outlined is-small is-danger delete-btn",
    attrs: {
      "title": "Delete plugin"
    },
    on: {
      "click": function click($event) {
        return _vm.$emit('show-delete', _vm.id);
      }
    }
  }, [_vm._m(1)]) : _vm._e(), !_vm.isOwned ? _c('div', {
    staticClass: "button is-outlined is-small is-primary",
    attrs: {
      "title": "View plugin"
    },
    on: {
      "click": function click($event) {
        return _vm.$emit('show-details', _vm.id);
      }
    }
  }, [_vm._m(2)]) : _vm._e()])]);
};
var PluginListItemvue_type_template_id_3c4bcd9f_scoped_true_staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fas fa-cog"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fas fa-trash"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fas fa-eye"
  })]);
}];

// CONCATENATED MODULE: ./src/components/plugins/PluginListItem.vue?vue&type=template&id=3c4bcd9f&scoped=true

// EXTERNAL MODULE: ./src/mixins/pluginUtil.js
var pluginUtil = __webpack_require__("0162");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/plugins/PluginListItem.vue?vue&type=script&lang=js

/* harmony default export */ var PluginListItemvue_type_script_lang_js = ({
  name: 'PluginListItem',
  mixins: [pluginUtil["a" /* pluginUtil */]],
  props: {
    id: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    isCurated: {
      type: Boolean,
      default: false
    },
    isOwned: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isPluginEnabled: {
      get: function get() {
        return this.getIsPluginEnabled(this.id);
      },
      set: function set(val) {
        if (val) {
          this.$emit('enable-plugin', this.id);
        } else {
          this.$emit('disable-plugin', this.id);
        }
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/plugins/PluginListItem.vue?vue&type=script&lang=js
 /* harmony default export */ var plugins_PluginListItemvue_type_script_lang_js = (PluginListItemvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/plugins/PluginListItem.vue?vue&type=style&index=0&id=3c4bcd9f&prod&lang=scss&scoped=true
var PluginListItemvue_type_style_index_0_id_3c4bcd9f_prod_lang_scss_scoped_true = __webpack_require__("d226");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/plugins/PluginListItem.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  plugins_PluginListItemvue_type_script_lang_js,
  PluginListItemvue_type_template_id_3c4bcd9f_scoped_true_render,
  PluginListItemvue_type_template_id_3c4bcd9f_scoped_true_staticRenderFns,
  false,
  null,
  "3c4bcd9f",
  null
  
)

/* harmony default export */ var PluginListItem = (component.exports);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"01d4e028-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/plugins/PluginDetails.vue?vue&type=template&id=645e5b53&scoped=true

var PluginDetailsvue_type_template_id_645e5b53_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-3"
  }, [_c('nav', {
    class: _vm.panelClass
  }, [_c('p', {
    staticClass: "panel-heading"
  }, [_vm._v(" Actions ")]), _vm.readOnly ? _c('div', {
    staticClass: "panel-block"
  }, [_c('div', {
    staticClass: "buttons is-fullwidth is-right"
  }, [_c('div', {
    staticClass: "button is-outlined is-primary",
    on: {
      "click": function click($event) {
        return _vm.$emit('back');
      }
    }
  }, [_vm._m(0), _c('span', [_vm._v("back")])])])]) : _vm._e(), !_vm.readOnly ? _c('div', {
    staticClass: "panel-block"
  }, [_c('div', {
    staticClass: "button is-fullwidth is-outlined is-dark",
    on: {
      "click": function click($event) {
        return _vm.$emit('cancel');
      }
    }
  }, [_vm._m(1), _c('span', [_vm._v("cancel")])])]) : _vm._e(), !_vm.readOnly ? _c('div', {
    staticClass: "panel-block"
  }, [_c('div', {
    staticClass: "button is-fullwidth is-outlined is-primary",
    on: {
      "click": _vm.validateCurrentPluginAndEmitSave
    }
  }, [_vm._m(2), _c('span', [_vm._v("save plugin")])])]) : _vm._e()])]), _c('div', {
    staticClass: "column is-9"
  }, [_c('div', {
    staticClass: "section box px-4 py-4"
  }, [_c('h3', {
    staticClass: "is-size-3 title"
  }, [_vm._v(" Plugin details ")]), _c('div', {
    staticClass: "field"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v("Location: ")]), _vm.readOnly ? _c('div', [_vm._v(" " + _vm._s(_vm.plugin.url) + " ")]) : _vm._e(), !_vm.readOnly ? _c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.plugin.url,
      expression: "plugin.url"
    }],
    staticClass: "input",
    attrs: {
      "type": "url"
    },
    domProps: {
      "value": _vm.plugin.url
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.plugin, "url", $event.target.value);
      }
    }
  })]) : _vm._e()]), _vm.pluginInvalid ? _c('div', {
    staticClass: "errorColor"
  }, [_c('p', [_vm._v("Plugin is invalid:")]), _vm.pluginUrlInvalid ? _c('p', [_vm._v(" *A valid URL is required for a plugin ")]) : _vm._e()]) : _vm._e()]), _c('div', {
    staticClass: "section box px-4 py-4"
  }, [_c('h3', {
    staticClass: "is-size-3 title"
  }, [_vm._v(" Manifest information ")]), _c('div', {
    staticClass: "field"
  }, [_vm.manifestRequestBusy ? _c('div', [_vm._m(3)]) : _vm._e(), !_vm.manifestRequestBusy ? _c('div', [!_vm.manifestLoaded ? _c('div', {
    staticClass: "manifestNotLoaded"
  }, [_vm._m(4), _c('br'), _c('div', {
    staticClass: "buttons is-fullwidth is-left"
  }, [_c('div', {
    staticClass: "button is-outlined is-primary",
    on: {
      "click": _vm.loadManifestData
    }
  }, [_vm._m(5), _c('span', [_vm._v("load manifest data")])])])]) : _vm._e(), _vm.manifestLoaded ? _c('div', [_vm.manifestError ? _c('div', [_c('p', {
    staticClass: "errorColor"
  }, [_c('i', {
    staticClass: "fa fa-exclamation-triangle is-primary"
  }), _vm._v(" Manifest load error: " + _vm._s(_vm.manifestData.error) + " ")]), _c('br'), _c('div', {
    staticClass: "buttons is-fullwidth is-left"
  }, [_c('div', {
    staticClass: "button is-outlined is-primary",
    on: {
      "click": _vm.loadManifestData
    }
  }, [_vm._m(6), _c('span', [_vm._v("retry")])])])]) : _vm._e(), !_vm.manifestError ? _c('div', {
    staticClass: "columns is-centered is-multiline"
  }, [_c('div', {
    staticClass: "column is-4"
  }, [_c('div', {
    staticClass: "field"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v("Name: ")]), _c('div', [_vm._v(" " + _vm._s(_vm.manifestData.name) + " ")])])]), _c('div', {
    staticClass: "column is-8"
  }, [_c('div', {
    staticClass: "field"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v("Scope: ")]), _c('div', [_vm._v(" " + _vm._s(_vm.manifestData.scope) + " ")])])]), _c('div', {
    staticClass: "column is-12"
  }, [_c('div', {
    staticClass: "field"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v("Shortcuts: ")]), _c('div', [_c('table', {
    staticClass: "table is-hoverable is-fullwidth"
  }, [_vm._m(7), _c('tbody', _vm._l(_vm.manifestData.shortcuts, function (mds, idx) {
    return _c('tr', {
      key: idx
    }, [_c('td', [_c('b', [_vm._v(_vm._s(mds.launchName))])]), _c('td', [_vm._v(" " + _vm._s(mds.launchLocation) + " ")]), _c('td', [_vm._v(" " + _vm._s(mds.launchCategory) + " ")]), _c('td', [_vm._v(" " + _vm._s(mds.launchUrl) + " ")]), _c('td', [_c('ul', _vm._l(mds.queryParams, function (qp) {
      return _c('li', {
        key: qp
      }, [_vm._v(" " + _vm._s(qp.name) + "=" + _vm._s(qp.value) + " ")]);
    }), 0)])]);
  }), 0)])])])])]) : _vm._e()]) : _vm._e()]) : _vm._e()])])])])]);
};
var PluginDetailsvue_type_template_id_645e5b53_scoped_true_staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-arrow-left"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-arrow-left"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-save"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon is-large has-text-center has-text-link"
  }, [_c('i', {
    staticClass: "fas fa-2x fa-spinner is-info fa-pulse"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('p', [_c('i', {
    staticClass: "fa fa-exclamation-triangle is-primary"
  }), _vm._v(" Manifest data not loaded")]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-sync-alt"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-sync-alt"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('thead', [_c('tr', [_c('th', [_vm._v(" name ")]), _c('th', [_vm._v(" location ")]), _c('th', [_vm._v(" category/screen ")]), _c('th', [_vm._v(" url ")]), _c('th', [_vm._v(" query params ")]), _c('th')])]);
}];

// CONCATENATED MODULE: ./src/components/plugins/PluginDetails.vue?vue&type=template&id=645e5b53&scoped=true

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/plugins/PluginDetails.vue?vue&type=script&lang=js


/* harmony default export */ var PluginDetailsvue_type_script_lang_js = ({
  mixins: [pluginUtil["a" /* pluginUtil */]],
  name: 'PluginDetails',
  props: {
    plugin: {
      type: Object
    },
    readOnly: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      panelClass: 'panel',
      manifestLoaded: false,
      manifestError: false,
      manifestRequestBusy: false,
      manifestData: {},
      pluginInvalid: false,
      pluginUrlInvalid: false
    };
  },
  methods: {
    loadManifestDataComplete: function loadManifestDataComplete() {
      this.manifestData = this.pluginManifestData[this.plugin.url];
      if (!this.manifestData.loaded) this.manifestError = true;
      this.manifestLoaded = true;
      this.manifestRequestBusy = false;
    },
    loadManifestData: function loadManifestData() {
      if (this.isValidUrl(this.plugin.url)) {
        this.manifestRequestBusy = true;
        var pluginUrls = [];
        pluginUrls.push(this.plugin.url);
        this.loadManifestDataForPluginUrlList(pluginUrls, this.loadManifestDataComplete);
      } else {
        appLog('invalid URL');
      }
    },
    validatePluginFields: function validatePluginFields() {
      if (!this.isValidUrl(this.plugin.url)) {
        this.pluginInvalid = true;
        this.pluginUrlInvalid = true;
      }
    },
    validateCurrentPluginAndEmitSave: function validateCurrentPluginAndEmitSave() {
      this.pluginInvalid = false;
      this.pluginUrlInvalid = false;
      this.validatePluginFields();
      if (!this.pluginInvalid) {
        this.$emit('save');
      }
    }
  },
  computed: {},
  mounted: function mounted() {}
});
// CONCATENATED MODULE: ./src/components/plugins/PluginDetails.vue?vue&type=script&lang=js
 /* harmony default export */ var plugins_PluginDetailsvue_type_script_lang_js = (PluginDetailsvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/plugins/PluginDetails.vue?vue&type=style&index=0&id=645e5b53&prod&lang=scss&scoped=true
var PluginDetailsvue_type_style_index_0_id_645e5b53_prod_lang_scss_scoped_true = __webpack_require__("b369");

// CONCATENATED MODULE: ./src/components/plugins/PluginDetails.vue






/* normalize component */

var PluginDetails_component = Object(componentNormalizer["a" /* default */])(
  plugins_PluginDetailsvue_type_script_lang_js,
  PluginDetailsvue_type_template_id_645e5b53_scoped_true_render,
  PluginDetailsvue_type_template_id_645e5b53_scoped_true_staticRenderFns,
  false,
  null,
  "645e5b53",
  null
  
)

/* harmony default export */ var PluginDetails = (PluginDetails_component.exports);
// EXTERNAL MODULE: ./src/mixins/cassUtil.js
var cassUtil = __webpack_require__("6d79");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/plugins/PluginManager.vue?vue&type=script&lang=js

// @ is an alias to /src




/* harmony default export */ var PluginManagervue_type_script_lang_js = ({
  mixins: [cassUtil["a" /* cassUtil */], pluginUtil["a" /* pluginUtil */]],
  props: {
    view: {
      default: '',
      type: String
    }
  },
  name: 'PluginManager',
  components: {
    PluginListItem: PluginListItem,
    PluginDetails: PluginDetails
  },
  data: function data() {
    return {
      pluginManagerBusy: false,
      pluginManagerViewMode: 'list',
      currentPlugin: {},
      showConfirmDeletePluginModal: false,
      pluginToDelete: {}
    };
  },
  computed: {
    currentPluginIsReadOnly: function currentPluginIsReadOnly() {
      if (!this.currentPlugin || !this.currentPlugin.isOwned) return true;else if (this.currentPlugin.isOwned) return false;else return true;
    },
    curatedPlugins: function curatedPlugins() {
      return this.$store.getters['app/curatedPlugins'];
    }
  },
  methods: {
    showListView: function showListView() {
      this.pluginManagerViewMode = "list";
    },
    showDetailView: function showDetailView() {
      this.pluginManagerViewMode = "detail";
    },
    backFromEditCurrentPlugin: function backFromEditCurrentPlugin() {
      this.showListView();
    },
    cancelEditCurrentPlugin: function cancelEditCurrentPlugin() {
      this.buildManagerPluginList();
      this.showListView();
    },
    saveCurrentPlugin: function saveCurrentPlugin() {
      this.pluginManagerBusy = true;
      this.addLocalPlugin(this.currentPlugin.url);
      this.setPluginAsEnabled(this.currentPlugin.url);
      this.currentPlugin = {};
      this.buildManagerPluginList();
      this.showListView();
      this.$store.commit('app/pluginLastUpdate', Date.now());
    },
    deletePlugin: function deletePlugin() {
      this.pluginManagerBusy = true;
      this.setPluginAsDisabled(this.pluginToDelete.url);
      this.removeLocalPlugin(this.pluginToDelete.url);
      this.pluginToDelete = {};
      this.showConfirmDeletePluginModal = false;
      this.buildManagerPluginList();
      this.$store.commit('app/pluginLastUpdate', Date.now());
    },
    cancelPluginDelete: function cancelPluginDelete() {
      this.pluginToDelete = {};
      this.showConfirmDeletePluginModal = false;
    },
    setPluginToDelete: function setPluginToDelete(pluginId) {
      this.pluginToDelete = this.getPluginById(pluginId);
    },
    showPluginDelete: function showPluginDelete(pluginId) {
      this.setPluginToDelete(pluginId);
      this.showConfirmDeletePluginModal = true;
    },
    enablePlugin: function enablePlugin(pluginId) {
      this.setPluginAsEnabled(pluginId);
      this.$store.commit('app/pluginLastUpdate', Date.now());
    },
    disablePlugin: function disablePlugin(pluginId) {
      this.setPluginAsDisabled(pluginId);
      this.$store.commit('app/pluginLastUpdate', Date.now());
    },
    disableAllPlugins: function disableAllPlugins() {
      this.setAllPluginsAsDisabled();
      this.buildManagerPluginList();
      this.$store.commit('app/pluginLastUpdate', Date.now());
    },
    getPluginById: function getPluginById(pluginId) {
      var _iterator = Object(createForOfIteratorHelper["a" /* default */])(this.pluginList),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var p = _step.value;
          if (p.id.equals(pluginId)) {
            return p;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return null;
    },
    setCurrentPlugin: function setCurrentPlugin(pluginId) {
      this.currentPlugin = this.getPluginById(pluginId);
    },
    showPluginDetails: function showPluginDetails(pluginId) {
      this.setCurrentPlugin(pluginId);
      this.showDetailView();
    },
    generateNewPluginObject: function generateNewPluginObject() {
      var p = {};
      p.id = 'newPluginId';
      p.url = '';
      p.isCurated = false;
      p.isOwned = true;
      return p;
    },
    addNewPlugin: function addNewPlugin() {
      this.currentPlugin = this.generateNewPluginObject();
      this.showDetailView();
    },
    buildPluginListFinished: function buildPluginListFinished() {
      this.pluginManagerBusy = false;
    },
    buildManagerPluginList: function buildManagerPluginList() {
      this.pluginManagerBusy = true;
      this.buildPluginList(this.buildPluginListFinished);
    }
  },
  updated: function updated() {},
  mounted: function mounted() {
    this.buildManagerPluginList();
  },
  watch: {
    curatedPlugins: function curatedPlugins() {
      this.buildManagerPluginList();
    }
  }
});
// CONCATENATED MODULE: ./src/views/plugins/PluginManager.vue?vue&type=script&lang=js
 /* harmony default export */ var plugins_PluginManagervue_type_script_lang_js = (PluginManagervue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/views/plugins/PluginManager.vue?vue&type=style&index=0&id=bbfcdff6&prod&lang=scss&scoped=true
var PluginManagervue_type_style_index_0_id_bbfcdff6_prod_lang_scss_scoped_true = __webpack_require__("9df9");

// CONCATENATED MODULE: ./src/views/plugins/PluginManager.vue






/* normalize component */

var PluginManager_component = Object(componentNormalizer["a" /* default */])(
  plugins_PluginManagervue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  "bbfcdff6",
  null
  
)

/* harmony default export */ var PluginManager = __webpack_exports__["default"] = (PluginManager_component.exports);

/***/ }),

/***/ "6d79":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cassUtil; });
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("caad");
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("14d9");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("d3b7");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("ac1f");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("25f0");
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("2532");
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("841c");
/* harmony import */ var core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("c7eb");
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("b85c");
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("1da1");

















var cassUtil = {
  name: 'cassUtil',
  data: function data() {
    return {};
  },
  methods: {
    getOrganizationByEcPk: function getOrganizationByEcPk(ecPk, successCallback, failureCallback) {
      var ecPkPem = ecPk.toPem();
      var paramObj = {};
      paramObj.size = 10000;
      EcOrganization.search(window.repo, '', /*#__PURE__*/function () {
        var _ref = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])().mark(function _callee(ecoa) {
          var _iterator, _step, o, groupPpkSet, _iterator2, _step2, gPpk;
          return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _iterator = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(ecoa);
                _context.prev = 1;
                _iterator.s();
              case 3:
                if ((_step = _iterator.n()).done) {
                  _context.next = 34;
                  break;
                }
                o = _step.value;
                _context.prev = 5;
                _context.next = 8;
                return o.getOrgKeys();
              case 8:
                groupPpkSet = _context.sent;
                _iterator2 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(groupPpkSet);
                _context.prev = 10;
                _iterator2.s();
              case 12:
                if ((_step2 = _iterator2.n()).done) {
                  _context.next = 19;
                  break;
                }
                gPpk = _step2.value;
                if (!(gPpk && gPpk.toPk().toPem().equals(ecPkPem))) {
                  _context.next = 17;
                  break;
                }
                successCallback(o);
                return _context.abrupt("return");
              case 17:
                _context.next = 12;
                break;
              case 19:
                _context.next = 24;
                break;
              case 21:
                _context.prev = 21;
                _context.t0 = _context["catch"](10);
                _iterator2.e(_context.t0);
              case 24:
                _context.prev = 24;
                _iterator2.f();
                return _context.finish(24);
              case 27:
                _context.next = 32;
                break;
              case 29:
                _context.prev = 29;
                _context.t1 = _context["catch"](5);
                // TODO Problem with EcOrganization update and creating encrypted value when only a reader...
                // Anticipated workaround....login as group owner and save it.
                // console.error("TODO...fix this...needs FRITZ input!!!!: " + e.toString());
                failureCallback(_context.t1.toString());
              case 32:
                _context.next = 3;
                break;
              case 34:
                _context.next = 39;
                break;
              case 36:
                _context.prev = 36;
                _context.t2 = _context["catch"](1);
                _iterator.e(_context.t2);
              case 39:
                _context.prev = 39;
                _iterator.f();
                return _context.finish(39);
              case 42:
                successCallback(null);
              case 43:
              case "end":
                return _context.stop();
            }
          }, _callee, null, [[1, 36, 39, 42], [5, 29], [10, 21, 24, 27]]);
        }));
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }(), function (err) {
        failureCallback(err);
      }, paramObj);
    },
    getOrganizationEcPk: function getOrganizationEcPk(orgObj) {
      return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])().mark(function _callee2() {
        return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return orgObj.getCurrentOrgKey();
            case 3:
              return _context2.abrupt("return", _context2.sent.toPk());
            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", null);
            case 9:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 6]]);
      }))();
    },
    getPersonEcPk: function getPersonEcPk(personObj) {
      var personFingerprint = this.generateProbablePersonFingerprintFromShortId(personObj.shortId());
      if (personObj.owner) {
        var _iterator3 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(personObj.owner),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var pkPem = _step3.value;
            var ecPk = EcPk.fromPem(pkPem);
            if (personFingerprint.equals(ecPk.fingerprint())) return ecPk;
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
      return null;
    },
    addAllOwnersFromObjectToObject: function addAllOwnersFromObjectToObject(fromObj, toObj) {
      if (fromObj && fromObj.owner) {
        var _iterator4 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(fromObj.owner),
          _step4;
        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var pkPem = _step4.value;
            var ecPk = EcPk.fromPem(pkPem);
            toObj.addOwner(ecPk);
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      }
    },
    setDefaultBrowserConfigId: function setDefaultBrowserConfigId(configId) {
      localStorage.setItem("cassAuthoringToolDefaultBrowserConfigId", configId);
    },
    removeDefaultBrowserConfig: function removeDefaultBrowserConfig() {
      localStorage.removeItem("cassAuthoringToolDefaultBrowserConfigId");
    },
    getDefaultBrowserConfigId: function getDefaultBrowserConfigId() {
      return localStorage.getItem("cassAuthoringToolDefaultBrowserConfigId");
    },
    getBooleanValue: function getBooleanValue(val) {
      if (typeof val === 'boolean') return val;else if (typeof val === 'string') {
        if (val.equalsIgnoreCase('true')) return true;else return false;
      } else return false;
    },
    addAllIdentityPksAsOwners: function addAllIdentityPksAsOwners(obj) {
      // let isEcrld = (obj instanceOf EcRemoteLinkedData);
      if (EcIdentityManager && EcIdentityManager.default.ids && EcIdentityManager.default.ids.length > 0) {
        for (var i = 0; i < EcIdentityManager.default.ids.length; i++) {
          obj.addOwner(EcIdentityManager.default.ids[i].ppk.toPk());
        }
      }
    },
    isObjectOwnerless: function isObjectOwnerless(obj) {
      if (!obj.owner || obj.owner.length === 0) return true;else return false;
    },
    doesAnyIdentityOwnObject: function doesAnyIdentityOwnObject(obj) {
      if (this.isAdmin()) return true;
      if (obj.canEditAny == null) return true;
      return obj.canEditAny(EcIdentityManager.default.getMyPks());
    },
    canEditAny: function canEditAny(item) {
      if (this.isAdmin()) return true;
      if (item.canEditAny == null) return true;
      return item.canEditAny(EcIdentityManager.default.getMyPks());
    },
    isAdmin: function isAdmin() {
      var adminKeys = window.repo.adminKeys;
      var userIds = EcIdentityManager.default.ids;
      if (!Array.isArray(adminKeys)) return false;
      if (!Array.isArray(userIds)) return false;
      var _iterator5 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(userIds),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var userId = _step5.value;
          var userKey = userId.ppk.toPk().toPem();
          var _iterator6 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(adminKeys),
            _step6;
          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var adminKey = _step6.value;
              if (userKey === adminKey) {
                return true;
              }
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      return false;
    },
    generateProbablePersonFingerprintFromShortId: function generateProbablePersonFingerprintFromShortId(personShortId) {
      return personShortId.substring(personShortId.lastIndexOf("/") + 1);
    },
    isPersonIdAnObjectOwner: function isPersonIdAnObjectOwner(personShortId, obj) {
      if (!obj.owner || obj.owner.length === 0) return false;
      var personFingerprint = this.generateProbablePersonFingerprintFromShortId(personShortId);
      var _iterator7 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(obj.owner),
        _step7;
      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var ownerPkPem = _step7.value;
          var ownerFingerprint = EcPk.fromPem(ownerPkPem).fingerprint();
          if (ownerFingerprint.equals(personFingerprint)) return true;
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
      return false;
    },
    isPersonIdAnObjectReader: function isPersonIdAnObjectReader(personShortId, obj) {
      if (!obj.reader || obj.reader.length === 0) return false;
      var personFingerprint = this.generateProbablePersonFingerprintFromShortId(personShortId);
      var _iterator8 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(obj.reader),
        _step8;
      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var readerPkPem = _step8.value;
          var readerFingerprint = EcPk.fromPem(readerPkPem).fingerprint();
          if (readerFingerprint.equals(personFingerprint)) return true;
        }
        // return obj.hasReader(EcPk.fromPem(pkPem));
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
      return false;
    },
    areAnyIdentitiesThisPerson: function areAnyIdentitiesThisPerson(personObj) {
      var personFingerprint = personObj.getFingerprint();
      if (EcIdentityManager && EcIdentityManager.default.ids && EcIdentityManager.default.ids.length > 0) {
        for (var i = 0; i < EcIdentityManager.default.ids.length; i++) {
          if (EcIdentityManager.default.ids[i].ppk.toPk().fingerprint().equals(personFingerprint)) return true;
        }
      }
      return false;
    },
    isPersonalIdentityAnObjectOwner: function isPersonalIdentityAnObjectOwner(obj) {
      if (this.isAdmin()) return true;
      if (!obj.owner || obj.owner.length === 0) return false;
      var personalIdentPkPem = this.getPersonalIdentityPk().toPem();
      return obj.owner.includes(personalIdentPkPem);
    },
    getPersonalIdentityPk: function getPersonalIdentityPk() {
      // assuming that the first identity is the user's personal identity
      if (EcIdentityManager && EcIdentityManager.default.ids && EcIdentityManager.default.ids.length > 0) {
        return EcIdentityManager.default.ids[0].ppk.toPk();
      } else return null;
    },
    buildEcAlignmentsFromRemoteLinkedData: function buildEcAlignmentsFromRemoteLinkedData(ecrlda) {
      var ecaa = [];
      var _iterator9 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(ecrlda),
        _step9;
      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var ecrld = _step9.value;
          var eca = new EcAlignment();
          eca.copyFrom(ecrld);
          ecaa.push(eca);
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }
      return ecaa;
    }
  },
  computed: {
    amLoggedIn: function amLoggedIn() {
      if (EcIdentityManager && EcIdentityManager.default.ids && EcIdentityManager.default.ids.length > 0) return true;else return false;
    }
  }
};

/***/ }),

/***/ "9df9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PluginManager_vue_vue_type_style_index_0_id_bbfcdff6_prod_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("3fbe");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PluginManager_vue_vue_type_style_index_0_id_bbfcdff6_prod_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PluginManager_vue_vue_type_style_index_0_id_bbfcdff6_prod_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "b369":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PluginDetails_vue_vue_type_style_index_0_id_645e5b53_prod_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4826");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PluginDetails_vue_vue_type_style_index_0_id_645e5b53_prod_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PluginDetails_vue_vue_type_style_index_0_id_645e5b53_prod_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "d226":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PluginListItem_vue_vue_type_style_index_0_id_3c4bcd9f_prod_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1279");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PluginListItem_vue_vue_type_style_index_0_id_3c4bcd9f_prod_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PluginListItem_vue_vue_type_style_index_0_id_3c4bcd9f_prod_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ })

}]);
//# sourceMappingURL=pluginManager.f32dec13.js.map