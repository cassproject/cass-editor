(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["sidenav","chunk-2d0dab46","chunk-2d0dab46"],{

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

/***/ "1564":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SideNav_vue_vue_type_style_index_0_id_049eb20a_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4622");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SideNav_vue_vue_type_style_index_0_id_049eb20a_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SideNav_vue_vue_type_style_index_0_id_049eb20a_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "17e9":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/cass-logo-square.8ddc73c9.png";

/***/ }),

/***/ "4622":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

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

/***/ "99b8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("fb6a");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1efc2bba-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SideNav.vue?vue&type=template&id=049eb20a

var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('aside', {
    class: {
      'is-narrow': !_vm.showSideNav,
      'menu': true,
      'has-background-primary': true,
      'has-text-white': true
    },
    attrs: {
      "id": "app-side-nav-bar"
    }
  }, [_c('div', [_c('div', {
    staticClass: "logo-container mx-3 my-2",
    class: {
      'is-narrow': !_vm.showSideNav
    }
  }, [_vm.queryParams.ceasnDataFields !== 'true' ? _c('router-link', {
    attrs: {
      "to": {
        path: '/',
        query: _vm.queryParams
      }
    }
  }, [_vm.showSideNav ? _c('img', {
    staticClass: "cass-logo",
    attrs: {
      "alt": "Cass logo",
      "src": _vm.casslogo
    }
  }) : _vm._e()]) : _vm._e(), _c('button', {
    staticClass: "button is-rounded is-light cass-editor__logged-in-user-icon",
    on: {
      "click": function click($event) {
        _vm.showUserInfo = !_vm.showUserInfo;
      }
    }
  }, [_c('span', {
    attrs: {
      "title": 'Signed in as: ' + _vm.displayName
    }
  }, [_vm._v(" " + _vm._s(_vm.loggedOnPerson.email != null ? _vm.loggedOnPerson.email.slice(0, 2) : _vm.displayName !== 'No user' ? _vm.displayName.slice(0, 2) : "ME") + " ")])])], 1), _vm.showUserInfo && _vm.displayName !== 'No user' ? _c('div', {
    staticClass: "px-3 mb-3 pb-1 cass-editor__logged-in-user-info"
  }, [_vm.availableIdentities.length < 2 ? _c('h3', {
    staticClass: "is-size-3 has-text-weight-semibold"
  }, [_vm.showSideNav ? _c('span', [_vm._v(_vm._s(_vm.displayName))]) : _vm._e()]) : _c('div', {
    staticClass: "select is-fullwidth"
  }, [_c('select', {
    on: {
      "change": function change($event) {
        return _vm.setIdentity($event.target.value);
      }
    }
  }, _vm._l(_vm.availableIdentities, function (ident) {
    return _c('option', {
      key: ident,
      domProps: {
        "value": ident.ppk.toPk().toPem()
      }
    }, [_vm._v(" " + _vm._s(ident.displayName) + " ")]);
  }), 0)]), _vm.showSideNav ? _c('p', {
    staticClass: "is-size-7"
  }, [_vm._v(" " + _vm._s(_vm.loggedOnPerson.email) + " ")]) : _vm._e(), _vm.showSideNav && _vm.$store.getters['user/lastLogin'] ? _c('p', {
    staticClass: "is-size-7"
  }, [_vm._v(" Last Login: " + _vm._s(new Date(_vm.$store.getters['user/lastLogin']).toLocaleString()) + " ")]) : _vm._e(), _vm.showSideNav && !_vm.hideLogoutButton ? _c('div', {
    staticClass: "my-2"
  }, [_c('button', {
    staticClass: "button is-primary is-small is-fullwidth",
    on: {
      "click": _vm.performApplicationLogout
    }
  }, [_vm._m(0), _vm.showSideNav ? _c('span', [_vm._v("logout")]) : _vm._e()])]) : !_vm.hideLogoutButton ? _c('ul', {
    staticClass: "menu-list"
  }, [_c('li', {
    staticClass: "mt-1 has-text-white"
  }, [_c('a', {
    attrs: {
      "title": "Logout"
    },
    on: {
      "click": _vm.performApplicationLogout
    }
  }, [_vm._m(1)])])]) : _vm._e()]) : _vm.loginEnabled && _vm.displayName == 'No user' ? _c('div', {
    staticClass: "mx-3"
  }, [_vm.showSideNav ? _c('button', {
    staticClass: "my-2 button is-outlined is-white is-fullwidth",
    on: {
      "click": _vm.performApplicationLogin
    }
  }, [_vm._m(2), _vm.showSideNav ? _c('span', [_vm._v("login")]) : _vm._e()]) : _vm._e(), !_vm.showSideNav ? _c('div', {
    staticClass: "buttons is-centered"
  }, [_c('button', {
    staticClass: "button is-outlined is-white",
    attrs: {
      "title": "Login"
    },
    on: {
      "click": _vm.performApplicationLogin
    }
  }, [_vm._m(3)])]) : _vm._e()]) : _vm._e()]), _c('div', {
    staticClass: "mx-3"
  }, [_vm.showFrameworks ? _c('div', {
    staticClass: "menu-label"
  }, [_vm._v(" Framework ")]) : _vm._e(), _vm.showFrameworks ? _c('ul', {
    staticClass: "menu-list"
  }, [_c('li', {
    staticClass: "has-text-white"
  }, [_c('router-link', {
    attrs: {
      "to": {
        path: '/frameworks',
        query: _vm.queryParams
      },
      "title": _vm.showSideNav ? '' : 'Frameworks'
    },
    nativeOn: {
      "click": function click($event) {
        return _vm.$store.commit('editor/collectionMode', false);
      }
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-th-list"
  })]), _vm.showSideNav ? _c('span', [_vm._v(" Frameworks")]) : _vm._e()])], 1), _vm.queryParams.ceasnDataFields === 'true' && _vm.showSideNav ? _c('li', {
    staticClass: "has-text-white"
  }, [_c('router-link', {
    attrs: {
      "to": {
        path: '/collections',
        query: _vm.queryParams
      },
      "title": _vm.showSideNav ? '' : 'Collections'
    },
    nativeOn: {
      "click": function click($event) {
        return _vm.$store.commit('editor/collectionMode', true);
      }
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-th-list"
  })]), _vm.showSideNav ? _c('span', [_vm._v(" Collections")]) : _vm._e()])], 1) : _vm._e(), _c('li', {
    staticClass: "has-text-white"
  }, [_c('router-link', {
    attrs: {
      "to": {
        path: '/import',
        query: _vm.queryParams
      },
      "title": _vm.showSideNav ? '' : 'Import Framework'
    },
    nativeOn: {
      "click": function click($event) {
        _vm.$store.commit('editor/conceptMode', false);
        _vm.$store.commit('editor/progressionMode', false);
        _vm.$store.dispatch('app/clearImport');
      }
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-upload"
  })]), _vm.showSideNav ? _c('span', [_vm._v(" Import ")]) : _vm._e()])], 1), _vm.crosswalkEnabled ? _c('li', {
    staticClass: "has-text-white"
  }, [_c('router-link', {
    attrs: {
      "to": {
        path: '/crosswalk',
        query: _vm.queryParams
      },
      "title": _vm.showSideNav ? '' : 'Crosswalk Frameworks'
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-network-wired"
  })]), _vm.showSideNav ? _c('span', [_vm._v(" Crosswalk Frameworks")]) : _vm._e()])], 1) : _vm._e(), _vm._l(_vm.pluginLinkMap['Competencies & Frameworks'], function (navLink) {
    return _c('li', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.showSideNav && _vm.pluginsEnabled,
        expression: "showSideNav && pluginsEnabled"
      }],
      key: navLink,
      staticClass: "has-text-white"
    }, [_c('a', {
      attrs: {
        "title": _vm.showSideNav ? '' : '{{ navLink.launchName }}'
      },
      on: {
        "click": function click($event) {
          return _vm.setLaunchPluginValues(navLink);
        }
      }
    }, [_vm._m(4, true), _vm.showSideNav ? _c('span', [_vm._v(" " + _vm._s(navLink.launchName))]) : _vm._e()])]);
  })], 2) : _vm._e(), _vm.queryParams.disableAssertions !== 'true' && _vm.isLoggedOn ? [_c('div', {
    staticClass: "menu-label",
    attrs: {
      "data-id": "side-nav-assertions-section"
    }
  }, [_vm._v(" Assertion ")]), _c('ul', {
    staticClass: "menu-list"
  }, [_c('li', {
    staticClass: "has-text-white"
  }, [_c('router-link', {
    attrs: {
      "to": {
        path: '/timeline',
        query: _vm.queryParams
      },
      "title": _vm.showSideNav ? '' : 'Timeline'
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-history"
  })]), _vm.showSideNav ? _c('span', [_vm._v(" Timeline")]) : _vm._e()])], 1), _c('li', {
    staticClass: "has-text-white"
  }, [_c('a', {
    attrs: {
      "data-id": "share-assertions-button",
      "title": _vm.showSideNav ? '' : 'Share'
    },
    on: {
      "click": _vm.shareAssertions
    }
  }, [_vm._m(5), _vm.showSideNav ? _c('span', [_vm._v(" Share")]) : _vm._e()])])])] : _vm._e(), _vm.showConcepts ? _c('div', {
    staticClass: "menu-label"
  }, [_vm.queryParams.ceasnDataFields === 'true' ? _c('span', [_vm._v("Concept Schemes")]) : _c('span', [_vm._v("Taxonomy")])]) : _vm._e(), _vm.showConcepts ? _c('ul', {
    staticClass: "menu-list"
  }, [_c('li', {
    staticClass: "has-text-white"
  }, [_c('router-link', {
    attrs: {
      "to": {
        path: '/concepts',
        query: _vm.queryParams
      },
      "title": _vm.showSideNav ? '' : _vm.queryParams.ceasnDataFields === 'true' ? 'Concept Schemes' : 'Taxonomies'
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-layer-group"
  })]), _vm.showSideNav && _vm.queryParams.ceasnDataFields === 'true' ? _c('span', [_vm._v(" Concept Schemes ")]) : _vm.showSideNav ? _c('span', [_vm._v(" Taxonomies ")]) : _vm._e()])], 1), _c('li', {
    staticClass: "has-text-white"
  }, [_c('router-link', {
    attrs: {
      "to": {
        path: '/import',
        query: _vm.queryParams
      },
      "title": _vm.showSideNav ? '' : _vm.queryParams.ceasnDataFields === 'true' ? 'Import Concept Schemes' : 'Import Taxonomies'
    },
    nativeOn: {
      "click": function click($event) {
        _vm.$store.commit('editor/conceptMode', true);
        _vm.$store.commit('editor/progressionMode', false);
        _vm.$store.dispatch('app/clearImport');
      }
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-upload"
  })]), _vm.showSideNav ? _c('span', [_vm._v(" Import")]) : _vm._e()])], 1), _vm._l(_vm.pluginLinkMap['Taxonomy'], function (navLink) {
    return _c('li', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.showSideNav && _vm.pluginsEnabled,
        expression: "showSideNav && pluginsEnabled"
      }],
      key: navLink,
      staticClass: "has-text-white"
    }, [_c('a', {
      attrs: {
        "title": _vm.showSideNav ? '' : '{{ navLink.launchName }}'
      },
      on: {
        "click": function click($event) {
          return _vm.setLaunchPluginValues(navLink);
        }
      }
    }, [_vm._m(6, true), _vm.showSideNav ? _c('span', [_vm._v(" " + _vm._s(navLink.launchName))]) : _vm._e()])]);
  })], 2) : _vm._e(), _vm.queryParams.ceasnDataFields === 'true' && _vm.showConcepts ? _c('div', {
    staticClass: "menu-label"
  }, [_c('span', [_vm._v("Progression Models")])]) : _vm._e(), _vm.queryParams.ceasnDataFields === 'true' && _vm.showConcepts ? _c('ul', {
    staticClass: "menu-list"
  }, [_c('li', {
    staticClass: "has-text-white"
  }, [_c('router-link', {
    attrs: {
      "to": {
        path: '/progressionLevels',
        query: _vm.queryParams
      },
      "title": _vm.showSideNav && _vm.queryParams.ceasnDataFields === 'true' ? '' : 'Progression Models'
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-layer-group"
  })]), _vm.showSideNav && _vm.queryParams.ceasnDataFields === 'true' ? _c('span', [_vm._v(" Progression Models ")]) : _vm._e()])], 1), _vm.showSideNav && _vm.queryParams.ceasnDataFields === 'true' && _vm.showConcepts ? _c('li', {
    staticClass: "has-text-white"
  }, [_c('router-link', {
    attrs: {
      "to": {
        path: '/import',
        query: _vm.queryParams
      },
      "title": _vm.showSideNav ? '' : 'Import'
    },
    nativeOn: {
      "click": function click($event) {
        _vm.$store.commit('editor/progressionMode', true);
        _vm.$store.commit('editor/conceptMode', false);
        _vm.$store.dispatch('app/clearImport');
      }
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-upload"
  })]), _vm._v(" Import ")])], 1) : _vm._e(), _vm._l(_vm.pluginLinkMap['Taxonomy'], function (navLink) {
    return _c('li', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.showSideNav && _vm.pluginsEnabled,
        expression: "showSideNav && pluginsEnabled"
      }],
      key: navLink,
      staticClass: "has-text-white"
    }, [_c('a', {
      attrs: {
        "title": _vm.showSideNav ? '' : '{{ navLink.launchName }}'
      },
      on: {
        "click": function click($event) {
          return _vm.setLaunchPluginValues(navLink);
        }
      }
    }, [_vm._m(7, true), _vm.showSideNav ? _c('span', [_vm._v(" " + _vm._s(navLink.launchName))]) : _vm._e()])]);
  })], 2) : _vm._e(), _vm.configurationsEnabled || _vm.userManagementEnabled ? _c('div', {
    staticClass: "menu-label"
  }, [_vm._v(" Configuration ")]) : _vm._e(), _c('ul', {
    staticClass: "menu-list"
  }, [_vm.configurationsEnabled ? _c('li', [_c('router-link', {
    attrs: {
      "to": {
        path: '/configuration',
        query: _vm.queryParams
      },
      "title": _vm.showSideNav ? '' : 'Configurations'
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-cog"
  })]), _vm.showSideNav ? _c('span', [_vm._v("Configurations")]) : _vm._e()])], 1) : _vm._e(), _vm.pluginsEnabled ? _c('li', [_c('router-link', {
    attrs: {
      "to": {
        path: '/pluginManager',
        query: _vm.queryParams
      },
      "title": _vm.showSideNav ? '' : 'Plugins'
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-charging-station"
  })]), _vm.showSideNav ? _c('span', [_vm._v("Plugins")]) : _vm._e()])], 1) : _vm._e(), _vm.isLoggedOn && _vm.userManagementEnabled ? _c('li', [_c('router-link', {
    attrs: {
      "to": {
        path: '/users',
        query: _vm.queryParams
      },
      "title": _vm.showSideNav ? '' : 'Groups'
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-users"
  })]), _vm.showSideNav ? _c('span', [_vm._v("Groups")]) : _vm._e()])], 1) : _vm._e(), _vm._l(_vm.pluginLinkMap['Configuration'], function (navLink) {
    return _c('li', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.showSideNav && _vm.pluginsEnabled,
        expression: "showSideNav && pluginsEnabled"
      }],
      key: navLink,
      staticClass: "has-text-white"
    }, [_c('a', {
      attrs: {
        "title": _vm.showSideNav ? '' : '{{ navLink.launchName }}'
      },
      on: {
        "click": function click($event) {
          return _vm.setLaunchPluginValues(navLink);
        }
      }
    }, [_vm._m(8, true), _vm.showSideNav ? _c('span', [_vm._v(" " + _vm._s(navLink.launchName))]) : _vm._e()])]);
  })], 2), _vm._l(_vm.getNonStandardNavCategoriesFromPlugins, function (nonStandardNavCat) {
    return _c('div', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.pluginsEnabled,
        expression: "pluginsEnabled"
      }],
      key: nonStandardNavCat,
      staticClass: "menu-label"
    }, [_vm.showSideNav ? _c('div', {
      staticClass: "menu-label"
    }, [_vm._v(" " + _vm._s(nonStandardNavCat) + " ")]) : _vm._e(), _vm.showSideNav ? _c('ul', {
      staticClass: "menu-list"
    }, _vm._l(_vm.pluginLinkMap[nonStandardNavCat], function (navLink) {
      return _c('li', {
        key: navLink,
        staticClass: "has-text-white"
      }, [_c('a', {
        attrs: {
          "title": _vm.showSideNav ? '' : '{{ navLink.launchName }}'
        },
        on: {
          "click": function click($event) {
            return _vm.setLaunchPluginValues(navLink);
          }
        }
      }, [_vm._m(9, true), _vm.showSideNav ? _c('span', [_vm._v(" " + _vm._s(navLink.launchName))]) : _vm._e()])]);
    }), 0) : _vm._e()]);
  })], 2), _c('div', {
    staticClass: "mx-3"
  }, [_c('ul', {
    staticClass: "menu-list"
  }, [_vm.showSideNav ? _c('li', {
    staticClass: "has-text-white"
  }, [_c('a', {
    on: {
      "click": function click($event) {
        return _vm.$store.commit('app/closeSideNav');
      }
    }
  }, [_vm._m(10), _vm.showSideNav ? _c('span', [_vm._v(" Collapse Sidebar")]) : _vm._e()])]) : _c('li', {
    staticClass: "has-text-white"
  }, [_c('a', {
    attrs: {
      "title": "Expand sidebar"
    },
    on: {
      "click": function click($event) {
        return _vm.$store.commit('app/showSideNav');
      }
    }
  }, [_vm._m(11)])])])])]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-sign-out-alt"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-sign-out-alt"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-sign-in-alt"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-sign-in-alt"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-plug"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-share"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-plug"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-plug"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-plug"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-plug"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa-regular fa-square-caret-left"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa-regular fa-square-caret-right"
  })]);
}];

// CONCATENATED MODULE: ./src/components/SideNav.vue?vue&type=template&id=049eb20a

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
var createForOfIteratorHelper = __webpack_require__("b85c");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
var regeneratorRuntime = __webpack_require__("c7eb");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__("caad");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.sort.js
var es_array_sort = __webpack_require__("4e82");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__("a434");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__("2532");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// EXTERNAL MODULE: ./src/assets/cass-logo-white.svg
var cass_logo_white = __webpack_require__("bd89");
var cass_logo_white_default = /*#__PURE__*/__webpack_require__.n(cass_logo_white);

// EXTERNAL MODULE: ./src/assets/cass-logo-square.png
var cass_logo_square = __webpack_require__("17e9");
var cass_logo_square_default = /*#__PURE__*/__webpack_require__.n(cass_logo_square);

// EXTERNAL MODULE: ./src/mixins/cassUtil.js
var cassUtil = __webpack_require__("6d79");

// EXTERNAL MODULE: ./src/mixins/cassApi.js
var cassApi = __webpack_require__("f3d2");

// EXTERNAL MODULE: ./src/mixins/pluginUtil.js
var pluginUtil = __webpack_require__("0162");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SideNav.vue?vue&type=script&lang=js



















/* harmony default export */ var SideNavvue_type_script_lang_js = ({
  mixins: [cassUtil["a" /* cassUtil */], cassApi["a" /* cassApi */], pluginUtil["a" /* pluginUtil */]],
  name: 'SideNav',
  props: {
    method: {
      default: '',
      type: String
    },
    showSideNav: {
      default: false,
      type: Boolean
    }
  },
  components: {},
  data: function data() {
    return {
      PLUGIN_CONTAINER_ROUTE: 'pluginContainer',
      STANDARD_NAV_CATEGORIES: ['Competencies & Frameworks', 'Taxonomy', 'Configuration'],
      casslogo: cass_logo_white_default.a,
      casslogoSquare: cass_logo_square_default.a,
      pluginLinkMap: {},
      addFrameworkOrDirectory: false,
      availableIdentities: [],
      addNewDirectory: false,
      directoryName: "",
      showUserInfo: false
    };
  },
  methods: {
    handleClickoutsidePopup: function handleClickoutsidePopup() {
      if (this.addFrameworkOrDirectory) {
        this.addFrameworkOrDirectory = false;
        this.addNewDirectory = false;
      }
    },
    setIdentity: function () {
      var _setIdentity = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee(identity) {
        var i, person;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              i = 0;
            case 1:
              if (!(i < window.EcIdentityManager.default.ids.length)) {
                _context.next = 8;
                break;
              }
              if (!(window.EcIdentityManager.default.ids[i].ppk.toPk().toPem() === identity)) {
                _context.next = 5;
                break;
              }
              window.EcIdentityManager.default.ids.unshift(window.EcIdentityManager.default.ids.splice(i, 1)[0]);
              return _context.abrupt("break", 8);
            case 5:
              i++;
              _context.next = 1;
              break;
            case 8:
              this.identityDropdownActive = false;
              _context.next = 11;
              return window.EcPerson.getByPk(window.repo, window.EcIdentityManager.default.ids[0].ppk.toPk());
            case 11:
              person = _context.sent;
              this.$store.commit('user/loggedOnPerson', person);
              this.availableIdentities = window.EcIdentityManager.default.ids;
            case 14:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function setIdentity(_x) {
        return _setIdentity.apply(this, arguments);
      }
      return setIdentity;
    }(),
    setLaunchPluginValues: function setLaunchPluginValues(pluginShortcut) {
      this.$store.commit('app/pluginToLaunch', pluginShortcut);
      this.$store.commit('app/pluginToLaunchLastUpdate', Date.now());
      if (!this.$router.currentRoute.name.equals(this.PLUGIN_CONTAINER_ROUTE)) this.$router.push({
        path: '/pluginContainer'
      });
    },
    buildPluginLinkMap: function buildPluginLinkMap() {
      // TODO handle screen type plugins at some point...this would be the place to do it...stash them on the VUEX store
      this.pluginLinkMap = {};
      var pluginKeys = Object.keys(this.pluginManifestData);
      for (var _i = 0, _pluginKeys = pluginKeys; _i < _pluginKeys.length; _i++) {
        var pk = _pluginKeys[_i];
        var pm = this.pluginManifestData[pk];
        if (pm.shortcuts && pm.shortcuts.length > 0) {
          var _iterator = Object(createForOfIteratorHelper["a" /* default */])(pm.shortcuts),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var pmsc = _step.value;
              if (pmsc.launchLocation.toLowerCase().equals('main')) {
                if (!this.pluginLinkMap[pmsc.launchCategory]) this.pluginLinkMap[pmsc.launchCategory] = [];
                this.pluginLinkMap[pmsc.launchCategory].push(pmsc);
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      }
    },
    buildPluginListComplete: function buildPluginListComplete() {
      var enabledPluginUrlList = this.getEnabledPluginUrlList();
      if (enabledPluginUrlList && enabledPluginUrlList.length > 0) {
        this.loadManifestDataForPluginUrlList(enabledPluginUrlList, this.buildPluginLinkMap);
      } else this.pluginLinkMap = {};
    },
    addNewlinesToId: function addNewlinesToId(pem) {
      // Begin public key line
      pem = pem.substring(0, 26) + "\n" + pem.substring(26);
      var length = pem.length;
      var start = 27;
      while (start + 64 < length) {
        pem = pem.substring(0, start + 64) + "\n" + pem.substring(start + 64);
        start += 65;
        length++;
      }
      // End public key line
      pem = pem.substring(0, length - 24) + "\n" + pem.substring(length - 24);
      return pem;
    },
    selectDirectory: function selectDirectory(directory) {
      this.$store.commit('app/selectDirectory', directory);
      this.$store.commit('app/rightAsideObject', directory);
      if (this.$router.currentRoute.name !== "directory") {
        this.$router.push({
          name: "directory"
        });
      }
    },
    saveDirectory: function saveDirectory() {
      var me = this;
      var dir = new EcDirectory();
      dir.name = this.directoryName;
      // dir.description = "Test Description";
      dir.generateId(window.repo.selectedServer);
      if (window.EcIdentityManager.default.ids.length > 0) {
        dir.addOwner(window.EcIdentityManager.default.ids[0].ppk.toPk());
      }
      dir["schema:dateCreated"] = new Date().toISOString();
      dir["schema:dateModified"] = new Date().toISOString();
      // To do: Add other owners and readers
      dir.save(function (success) {
        appLog("Directory saved: " + dir.id);
        me.directoryName = '';
        me.$store.dispatch('app/refreshDirectories');
        me.selectDirectory(dir);
      }, appError, window.repo);
    },
    shareAssertions: function shareAssertions() {
      this.$store.commit('app/showModal', {
        component: 'ShareAssertions'
      });
    }
  },
  watch: {
    loggedOnPerson: function loggedOnPerson() {
      this.availableIdentities = window.EcIdentityManager.default.ids;
    },
    pluginLastUpdate: function pluginLastUpdate() {
      this.buildPluginList(this.buildPluginListComplete);
    }
  },
  computed: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["c" /* mapState */])({
    crosswalkEnabled: function crosswalkEnabled(state) {
      return state.featuresEnabled.crosswalkEnabled;
    },
    userManagementEnabled: function userManagementEnabled(state) {
      return state.featuresEnabled.userManagementEnabled;
    },
    configurationsEnabled: function configurationsEnabled(state) {
      return state.featuresEnabled.configurationsEnabled;
    },
    pluginsEnabled: function pluginsEnabled(state) {
      return state.featuresEnabled.pluginsEnabled;
    },
    loginEnabled: function loginEnabled(state) {
      return state.featuresEnabled.loginEnabled;
    },
    queryParams: function queryParams(state) {
      return state.editor.queryParams;
    },
    pluginLastUpdate: function pluginLastUpdate(state) {
      return state.app.pluginLastUpdate;
    },
    directoryList: function directoryList(state) {
      return state.app.directories.directoryList;
    }
  })), {}, {
    hideLogoutButton: function hideLogoutButton() {
      var loginInfo = this.$store.getters['user/repositorySsoOptions'];
      if (loginInfo) {
        if (loginInfo.ssoPublicKey && !loginInfo.ssoLogout) {
          return true;
        }
      }
      return false;
    },
    queryParams: function queryParams() {
      return this.$store.getters['editor/queryParams'];
    },
    isLoggedOn: function isLoggedOn() {
      if (this.loggedOnPerson && this.loggedOnPerson.name) {
        return true;
      } else {
        return false;
      }
    },
    displayName: function displayName() {
      if (this.isLoggedOn) {
        return this.loggedOnPerson.name;
      } else if (this.availableIdentities.length > 0) {
        return this.availableIdentities[0].displayName ? this.availableIdentities[0].displayName : 'Organization';
      } else {
        return 'No user';
      }
    },
    currentRoute: function currentRoute() {
      return this.$route.path;
    },
    supportedFiles: function supportedFiles() {
      return this.$store.getters['editor/conceptMode'] === true || this.$store.getters['editor/progressionMode'] === true ? this.supportedConceptFileTypes : this.supportedFileTypes;
    },
    loggedOnPerson: function loggedOnPerson() {
      return this.$store.getters['user/loggedOnPerson'];
    },
    getNonStandardNavCategoriesFromPlugins: function getNonStandardNavCategoriesFromPlugins() {
      var nonStandardNavCats = [];
      var pluginNavCats = Object.keys(this.pluginLinkMap);
      for (var _i2 = 0, _pluginNavCats = pluginNavCats; _i2 < _pluginNavCats.length; _i2++) {
        var pnc = _pluginNavCats[_i2];
        if (!this.STANDARD_NAV_CATEGORIES.includes(pnc)) nonStandardNavCats.push(pnc);
      }
      nonStandardNavCats.sort();
      return nonStandardNavCats;
    },
    myTopLevelDirectories: function myTopLevelDirectories() {
      return this.directoryList.filter(function (directory) {
        return !directory.parentDirectory;
      });
    },
    showFrameworks: function showFrameworks() {
      // temporarily hide frameworks when in concept mode on CE instance & vice versa
      if (this.queryParams && this.queryParams.ceasnDataFields === 'true' && this.queryParams.concepts === 'true') {
        return false;
      }
      return true;
    },
    showConcepts: function showConcepts() {
      if (this.queryParams && this.queryParams.ceasnDataFields === 'true' && this.queryParams.concepts !== 'true') {
        return false;
      }
      return true;
    }
  }),
  mounted: function mounted() {
    this.buildPluginList(this.buildPluginListComplete);
    this.$store.dispatch('app/refreshDirectories');
    this.availableIdentities = window.EcIdentityManager.default.ids;
  }
});
// CONCATENATED MODULE: ./src/components/SideNav.vue?vue&type=script&lang=js
 /* harmony default export */ var components_SideNavvue_type_script_lang_js = (SideNavvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/SideNav.vue?vue&type=style&index=0&id=049eb20a&prod&lang=scss
var SideNavvue_type_style_index_0_id_049eb20a_prod_lang_scss = __webpack_require__("1564");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/SideNav.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_SideNavvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SideNav = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "bd89":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/cass-logo-white.eb44ee72.svg";

/***/ }),

/***/ "f3d2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cassApi; });
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("14d9");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("b0c0");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("e9c4");
/* harmony import */ var core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("b64b");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_3__);
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
//# sourceMappingURL=sidenav.f58ac870.js.map