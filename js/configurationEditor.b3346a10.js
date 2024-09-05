(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["configurationEditor"],{

/***/ "03d1":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "0405":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "1d9c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ConfigurationDetails_vue_vue_type_style_index_0_id_239cc231_prod_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0405");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ConfigurationDetails_vue_vue_type_style_index_0_id_239cc231_prod_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ConfigurationDetails_vue_vue_type_style_index_0_id_239cc231_prod_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "24ba":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ConfigurationEditor_vue_vue_type_style_index_0_id_df0c5216_prod_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("03d1");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ConfigurationEditor_vue_vue_type_style_index_0_id_df0c5216_prod_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ConfigurationEditor_vue_vue_type_style_index_0_id_df0c5216_prod_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "7bcc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"01d4e028-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ConfigurationEditor.vue?vue&type=template&id=df0c5216&scoped=true

var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "'section",
    attrs: {
      "id": "configuration"
    }
  }, [_c('div', {
    staticClass: "modal",
    class: [{
      'is-active': _vm.configBusy
    }]
  }, [_c('div', {
    staticClass: "modal-background"
  }), _vm._m(0)]), _vm.showConfirmDeleteConfigModal ? _c('delete-configuration-confirm', {
    attrs: {
      "name": _vm.configToDelete.name
    },
    on: {
      "close": _vm.cancelConfigurationDelete,
      "confirm": _vm.deleteConfiguration,
      "cancel": _vm.cancelConfigurationDelete
    }
  }) : _vm._e(), _vm.showMustBeLoggedInModal ? _c('configuration-not-permitted', {
    on: {
      "cancel": function cancel($event) {
        _vm.showMustBeLoggedInModal = false;
      },
      "close": function close($event) {
        _vm.showMustBeLoggedInModal = false;
      }
    }
  }) : _vm._e(), _vm.showBrowserConfigSetModal ? _c('configuration-set-success', {
    attrs: {
      "name": _vm.defaultBrowserConfigName
    },
    on: {
      "ok": function ok($event) {
        _vm.showBrowserConfigSetModal = false;
      },
      "close": function close($event) {
        _vm.showBrowserConfigSetModal = false;
      },
      "cancel": _vm.closeBrowserConfigSetModal
    }
  }) : _vm._e(), !_vm.configBusy ? _c('section', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "section"
  }, [_c('h3', {
    staticClass: "title"
  }, [_vm._v(" Configuration ")]), _vm.configViewMode.equals('list') ? _c('p', [_vm._v(" Configurations control the way your frameworks appear in the editor, as well as what properties, relationships, and in some cases value types of properties and relationships you can add to your framework. If a browser configuration is not set then the system will default to your instance default. If you are the configuration administrator you will be able to manage the property settings and change which instance is the default. Otherwise contact your CAT administrator. ")]) : _vm._e()]), _vm.configViewMode.equals('list') ? _c('configuration-list', {
    attrs: {
      "view": "editor",
      "configList": _vm.configList
    },
    on: {
      "showDetails": function showDetails($event) {
        return _vm.showConfigDetails($event);
      }
    }
  }) : _vm._e(), _vm.configViewMode.equals('list') ? _c('div', {
    staticClass: "button is-outlined is-primary is-pulled-right",
    on: {
      "click": _vm.createNewConfig
    }
  }, [_vm._m(1), _c('span', [_vm._v(" create new configuration ")])]) : _vm._e(), _vm.configViewMode.equals('detail') ? _c('div', [_c('configuration-details', {
    attrs: {
      "config": _vm.currentConfig,
      "configList": _vm.configList,
      "readOnly": _vm.currentConfigIsReadOnly,
      "defaultConfigId": _vm.defaultConfigId,
      "defaultBrowserConfig": _vm.localDefaultBrowserConfigId
    },
    on: {
      "set-browser-default": _vm.setConfigAsBrowserDefault,
      "remove-browser-default-config": _vm.removeConfigAsBrowserDefault,
      "save": _vm.saveCurrentConfig,
      "cancel": _vm.cancelEditCurrentConfig,
      "back": _vm.backFromEditCurrentConfig
    }
  })], 1) : _vm._e()], 1) : _vm._e()], 1);
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
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-plus"
  })]);
}];

// CONCATENATED MODULE: ./src/views/ConfigurationEditor.vue?vue&type=template&id=df0c5216&scoped=true

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
var createForOfIteratorHelper = __webpack_require__("b85c");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
var regeneratorRuntime = __webpack_require__("c7eb");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__("a4d3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.description.js
var es_symbol_description = __webpack_require__("e01a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.json.stringify.js
var es_json_stringify = __webpack_require__("e9c4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.trim.js
var es_string_trim = __webpack_require__("498a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("fb6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.search.js
var es_string_search = __webpack_require__("841c");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"01d4e028-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/configuration/ConfigurationDetails.vue?vue&type=template&id=239cc231&scoped=true










var ConfigurationDetailsvue_type_template_id_239cc231_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {}, [_c('modal-template', {
    attrs: {
      "size": "small",
      "type": "dark",
      "canClose": false,
      "header": false,
      "active": _vm.configDetailsBusy
    },
    on: {
      "close": function close($event) {
        _vm.configDetailsBusy = false;
      }
    }
  }, [_c('template', {
    slot: "modal-header"
  }, [_vm._v(" Processing ")]), _c('template', {
    slot: "modal-body"
  }, [_c('div', {
    staticClass: "has-text-centered has-text-link"
  }, [_c('div', {
    staticClass: "icon is-large has-text-centered has-text-link"
  }, [_c('i', {
    staticClass: "fas fa-2x fa-spinner is-info fa-pulse"
  })])])])], 2), _c('modal-template', {
    attrs: {
      "active": _vm.showManageRelationshipsModal
    },
    on: {
      "close": function close($event) {
        _vm.showManageRelationshipsModal = false;
      }
    }
  }, [_c('template', {
    slot: "modal-header"
  }, [_vm._v(" Manage relationship types ")]), _c('template', {
    slot: "modal-body"
  }, [_c('div', {
    staticClass: "section"
  }, [_c('div', {
    staticClass: "columns is-multiline"
  }, [_c('div', {
    staticClass: "column is-12"
  }, [_c('h3', {
    staticClass: "header is-size-4"
  }, [_vm._v(" CaSS Default Relationships ")]), _c('div', {
    staticClass: "table-container"
  }, [_c('table', {
    staticClass: "table is-hoverable is-fullwidth"
  }, [_c('thead', [_c('tr', [_c('th', [_c('abbr', {
    attrs: {
      "title": "unique relationship ID"
    }
  }, [_vm._v(" relationship")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "label displayed in form inputs"
    }
  }, [_vm._v(" display label")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "if enabled shows up in property options"
    }
  }, [_vm._v(" enabled")])])])]), _c('tbody', _vm._l(this.config.relationships, function (relObj, relKey) {
    return _c('RelationshipListItem', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.isCassRelation(relKey),
        expression: "isCassRelation(relKey)"
      }],
      key: relKey + 'managecass',
      attrs: {
        "relationship": relKey,
        "label": relObj.label,
        "enabled": relObj.enabled,
        "readOnly": _vm.readOnly,
        "scope": "managecass"
      },
      on: {
        "change": _vm.updateRelationshipProperty
      }
    });
  }), 1)])])]), _c('div', {
    staticClass: "column is-12"
  }, [_c('h3', {
    staticClass: "header is-size-4"
  }, [_vm._v(" Achievement Standards Network Relationships ")]), _c('div', {
    staticClass: "table-container"
  }, [_c('table', {
    staticClass: "table is-hoverable is-fullwidth"
  }, [_c('thead', [_c('tr', [_c('th', [_c('abbr', {
    attrs: {
      "title": "unique relationship ID"
    }
  }, [_vm._v(" relationship")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "label displayed in form inputs"
    }
  }, [_vm._v(" display label")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "if enabled shows up in property options"
    }
  }, [_vm._v(" enabled")])])])]), _c('tbody', _vm._l(this.config.relationships, function (relObj, relKey) {
    return _c('RelationshipListItem', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.isAsnRelation(relKey),
        expression: "isAsnRelation(relKey)"
      }],
      key: relKey + 'manageasn',
      attrs: {
        "relationship": relKey,
        "label": relObj.label,
        "enabled": relObj.enabled,
        "readOnly": _vm.readOnly,
        "scope": "manageasn"
      },
      on: {
        "change": _vm.updateRelationshipProperty
      }
    });
  }), 1)])])]), _c('div', {
    staticClass: "column is-12"
  }, [_c('h3', {
    staticClass: "header is-size-4"
  }, [_vm._v(" GEMQ ")]), _c('div', {
    staticClass: "table-container"
  }, [_c('table', {
    staticClass: "table is-hoverable is-fullwidth"
  }, [_c('thead', [_c('tr', [_c('th', [_c('abbr', {
    attrs: {
      "title": "unique relationship ID"
    }
  }, [_vm._v(" relationship")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "label displayed on form inputs"
    }
  }, [_vm._v(" display label")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "if enabled shows up in property options"
    }
  }, [_vm._v(" enabled")])])])]), _c('tbody', _vm._l(this.config.relationships, function (relObj, relKey) {
    return _c('RelationshipListItem', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.isGemqRelation(relKey),
        expression: "isGemqRelation(relKey)"
      }],
      key: relKey + 'managegemq',
      attrs: {
        "relationship": relKey,
        "label": relObj.label,
        "enabled": relObj.enabled,
        "readOnly": _vm.readOnly,
        "scope": "managegemq"
      },
      on: {
        "change": _vm.updateRelationshipProperty
      }
    });
  }), 1)])])]), _c('div', {
    staticClass: "column is-12"
  }, [_c('h3', {
    staticClass: "header is-size-4"
  }, [_vm._v(" Other ")]), _c('div', {
    staticClass: "table-container"
  }, [_c('table', {
    staticClass: "table is-hoverable is-fullwidth"
  }, [_c('thead', [_c('tr', [_c('th', [_c('abbr', {
    attrs: {
      "title": "unique relationship ID"
    }
  }, [_vm._v(" relationship")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "label displayed on form inputs"
    }
  }, [_vm._v(" display label")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "if enabled shows up in property options"
    }
  }, [_vm._v(" enabled")])])])]), _c('tbody', _vm._l(this.config.relationships, function (relObj, relKey) {
    return _c('RelationshipListItem', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.isOtherRelation(relKey),
        expression: "isOtherRelation(relKey)"
      }],
      key: relKey + 'manageother',
      attrs: {
        "relationship": relKey,
        "label": relObj.label,
        "enabled": relObj.enabled,
        "readOnly": _vm.readOnly,
        "scope": "manageother"
      },
      on: {
        "change": _vm.updateRelationshipProperty
      }
    });
  }), 1)])])])])])]), _c('template', {
    slot: "modal-foot"
  }, [_c('div', {
    staticClass: "button is-primary is-outlined",
    on: {
      "click": _vm.hideManageRelations
    }
  }, [_vm._v(" ok ")])])], 2), _c('modal-template', {
    attrs: {
      "active": _vm.showSelectPermissionEntitiesModal
    },
    on: {
      "close": function close($event) {
        _vm.showSelectPermissionEntitiesModal = false;
      }
    }
  }, [_c('template', {
    slot: "modal-header"
  }, [_vm._v(" " + _vm._s(_vm.permissionEntitySelectionTitle) + " ")]), _c('template', {
    slot: "modal-body"
  }, [_c('div', {
    staticClass: "field"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.permissionEntitiesFilter,
      expression: "permissionEntitiesFilter"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": "user/group filter"
    },
    domProps: {
      "value": _vm.permissionEntitiesFilter
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.permissionEntitiesFilter = $event.target.value;
      }
    }
  })]), _c('div', {
    staticClass: "table-container"
  }, [_c('table', {
    staticClass: "table is-hoverable is-fullwidth"
  }, [_c('thead', [_c('tr', [_c('th'), _c('th', [_vm._v("name")]), _c('th', [_vm._v("email")]), _c('th', [_vm._v("type")])])]), _c('tbody', _vm._l(_vm.filteredPermissionEntities, function (pe, index) {
    return _c('tr', {
      key: index
    }, [_c('th', [_c('div', {
      staticClass: "checkbox"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.selectedPermissionEntities,
        expression: "selectedPermissionEntities"
      }],
      attrs: {
        "id": pe.pk,
        "name": "pe.name",
        "type": "checkbox"
      },
      domProps: {
        "value": pe.pk,
        "checked": Array.isArray(_vm.selectedPermissionEntities) ? _vm._i(_vm.selectedPermissionEntities, pe.pk) > -1 : _vm.selectedPermissionEntities
      },
      on: {
        "change": function change($event) {
          var $$a = _vm.selectedPermissionEntities,
            $$el = $event.target,
            $$c = $$el.checked ? true : false;
          if (Array.isArray($$a)) {
            var $$v = pe.pk,
              $$i = _vm._i($$a, $$v);
            if ($$el.checked) {
              $$i < 0 && (_vm.selectedPermissionEntities = $$a.concat([$$v]));
            } else {
              $$i > -1 && (_vm.selectedPermissionEntities = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
            }
          } else {
            _vm.selectedPermissionEntities = $$c;
          }
        }
      }
    })])]), _c('td', [_vm._v(_vm._s(pe.name))]), _c('td', [_vm._v(_vm._s(pe.email))]), _c('td', [pe.type.equalsIgnoreCase('person') ? _c('i', {
      staticClass: "fa fa-user",
      attrs: {
        "title": "user"
      }
    }) : _vm._e(), pe.type.equalsIgnoreCase('group') ? _c('i', {
      staticClass: "fa fa-users",
      attrs: {
        "title": "group"
      }
    }) : _vm._e()])]);
  }), 0)])])]), _c('template', {
    slot: "modal-foot"
  }, [!_vm.readOnly ? _c('div', {
    staticClass: "buttons is-spaced"
  }, [_c('button', {
    staticClass: "button is-outlined is-dark",
    on: {
      "click": _vm.closeSelectPermissionEntitiesModal
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-times"
  })]), _c('span', [_vm._v(" cancel ")])]), _c('button', {
    staticClass: "button is-outlined is-primary",
    on: {
      "click": _vm.applySelectPermissionEntities
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-save"
  })]), _c('span', [_vm._v(" apply ")])])]) : _vm._e()])], 2), _c('modal-template', {
    attrs: {
      "active": _vm.showSelectLevelModal
    },
    on: {
      "close": function close($event) {
        _vm.showSelectLevelModal = false;
      }
    }
  }, [_c('template', {
    slot: "modal-header"
  }, [_vm._v(" " + _vm._s(_vm.levelSelectionModalTitle) + " ")]), _c('template', {
    slot: "modal-body"
  }, [_c('div', {
    ref: "levelsModal"
  }, [_c('div', {
    staticClass: "field"
  }, [!_vm.showAddNewLevelSection ? _c('div', {
    staticClass: "control"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v("Available Levels:")]), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.selectedLevelFilter,
      expression: "selectedLevelFilter"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": "level filter"
    },
    domProps: {
      "value": _vm.selectedLevelFilter
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.selectedLevelFilter = $event.target.value;
      }
    }
  })]) : _vm._e()]), _vm.showAddNewLevelSection ? _c('div', [_c('h4', {
    staticClass: "header is-size-3"
  }, [_vm._v(" Add Level ")]), _c('div', {
    staticClass: "field-group"
  }, [_c('div', {
    staticClass: "field"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v("Name:")]), _c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.newLevelName,
      expression: "newLevelName"
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm.newLevelName
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.newLevelName = $event.target.value;
      }
    }
  })])]), _c('div', {
    staticClass: "field"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v("Description: ")]), !_vm.readOnly ? _c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.newLevelDescription,
      expression: "newLevelDescription"
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm.newLevelDescription
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.newLevelDescription = $event.target.value;
      }
    }
  })]) : _vm._e()]), _vm.levelInvalid ? _c('div', {
    staticClass: "field has-text-danger"
  }, [_c('div', {
    staticClass: "label has-text-danger"
  }, [_vm._v(" Please correct the following errors: ")]), _vm.levelNameInvalid ? _c('div', {
    staticClass: "is-size-6"
  }, [_vm._v(" Level name is required ")]) : _vm._e()]) : _vm._e()])]) : _c('div', [_c('div', {
    staticClass: "table-container"
  }, [_c('table', {
    staticClass: "table is-hoverable is-fullwidth"
  }, [_c('thead', [_c('th'), _c('th', [_vm._v(" name ")]), _c('th', [_vm._v(" description ")])]), _c('tbody', _vm._l(_vm.filteredLevels, function (lvl, index) {
    return _c('tr', {
      key: index
    }, [_c('th', [_c('div', {
      staticClass: "checkbox"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.selectedLevels,
        expression: "selectedLevels"
      }],
      attrs: {
        "id": lvl.shortId(),
        "name": "lvl.shortId()",
        "type": "checkbox"
      },
      domProps: {
        "value": lvl.shortId(),
        "checked": Array.isArray(_vm.selectedLevels) ? _vm._i(_vm.selectedLevels, lvl.shortId()) > -1 : _vm.selectedLevels
      },
      on: {
        "change": function change($event) {
          var $$a = _vm.selectedLevels,
            $$el = $event.target,
            $$c = $$el.checked ? true : false;
          if (Array.isArray($$a)) {
            var $$v = lvl.shortId(),
              $$i = _vm._i($$a, $$v);
            if ($$el.checked) {
              $$i < 0 && (_vm.selectedLevels = $$a.concat([$$v]));
            } else {
              $$i > -1 && (_vm.selectedLevels = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
            }
          } else {
            _vm.selectedLevels = $$c;
          }
        }
      }
    })])]), _c('td', [_vm._v(" " + _vm._s(lvl.getName()) + " ")]), _c('td', [_vm._v(" " + _vm._s(lvl.description) + " ")])]);
  }), 0)])])])]), !_vm.showAddNewLevelSection ? _c('template', {
    slot: "modal-foot"
  }, [!_vm.readOnly ? _c('div', {
    staticClass: "buttons is-spaced"
  }, [_c('button', {
    staticClass: "button is-outlined is-dark",
    on: {
      "click": _vm.closeSelectLevelModal
    }
  }, [_vm._v(" cancel ")]), _c('button', {
    staticClass: "button is-outlined is-primary",
    on: {
      "click": _vm.showAddNewLevel
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-plus"
  })]), _c('span', [_vm._v("add level")])]), _c('button', {
    staticClass: "button is-outlined is-primary",
    on: {
      "click": _vm.applySelectLevels
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-save"
  })]), _c('span', [_vm._v(" apply selected ")])])]) : _vm._e()]) : _vm._e(), _vm.showAddNewLevelSection ? _c('template', {
    slot: "modal-foot"
  }, [!_vm.readOnly && !_vm.savingLevelBusy ? _c('div', {
    staticClass: "buttons is-spaced"
  }, [_c('button', {
    staticClass: "button is-outlined",
    on: {
      "click": _vm.cancelAddNewLevel
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-save"
  })]), _c('span', [_vm._v(" cancel ")])]), _c('button', {
    staticClass: "button is-outlined",
    on: {
      "click": _vm.saveAddNewLevel
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-save"
  })]), _c('span', [_vm._v(" save new level ")])])]) : _vm._e()]) : _vm._e()], 2)], 2), _c('modal-template', {
    attrs: {
      "active": _vm.showCustomPropertyDetailsModal
    },
    on: {
      "close": function close($event) {
        _vm.showCustomPropertyDetailsModal = false;
      }
    }
  }, [_c('template', {
    slot: "modal-header"
  }, [_vm._v(" " + _vm._s(_vm.customPropertyModalTitle) + " ")]), _c('template', {
    slot: "modal-body"
  }, [_c('div', {
    staticClass: "title"
  }, [_vm._v(" " + _vm._s(_vm.customPropertyPropertyName) + " ")]), _c('div', {
    staticClass: "subtitle"
  }, [_vm._v(" Control how " + _vm._s(_vm.customPropertyPropertyName) + " is displayed and modified within your CASS instance. ")]), _c('div', {
    staticClass: "field"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v("Context ")]), _c('p', {
    staticClass: "description"
  }, [_vm._v(" If you are unsure, keep the default. ")]), _vm.readOnly || !_vm.customPropertyIsNew ? _c('div', {
    staticClass: "field"
  }, [_vm._v(" " + _vm._s(_vm.customPropertyContext) + " ")]) : _vm._e(), !_vm.readOnly && _vm.customPropertyIsNew ? _c('div', {
    staticClass: "control"
  }, [_c('div', {
    staticClass: "select is-fullwidth"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.customPropertyContext,
      expression: "customPropertyContext"
    }],
    on: {
      "change": function change($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.customPropertyContext = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
      }
    }
  }, [_c('option', {
    attrs: {
      "title": "https://schema.cassproject.org/0.4/ (default)",
      "value": "https://schema.cassproject.org/0.4/"
    }
  }, [_vm._v(" CaSS v4.0 (default) ")]), _c('option', {
    attrs: {
      "title": "https://purl.org/ctdlasn/terms/",
      "value": "https://purl.org/ctdlasn/terms/"
    }
  }, [_vm._v(" CTDL-ASN ")]), _c('option', {
    attrs: {
      "title": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
      "value": "http://www.w3.org/1999/02/22-rdf-syntax-ns#"
    }
  }, [_vm._v(" RDF Semantic Web Standards 1999 ")]), _c('option', {
    attrs: {
      "title": "http://www.w3.org/2000/01/rdf-schema#",
      "value": "http://www.w3.org/2000/01/rdf-schema#"
    }
  }, [_vm._v(" RDF Semantic Web Standards 2000 ")]), _c('option', {
    attrs: {
      "title": "https://schema.cassproject.org/kbac/0.4/",
      "value": "https://schema.cassproject.org/kbac/0.4/"
    }
  }, [_vm._v(" Key Based Authorization and Control ")]), _c('option', {
    attrs: {
      "title": "http://schema.eduworks.com/general/0.3/",
      "value": "http://schema.eduworks.com/general/0.3/"
    }
  }, [_vm._v(" Eduworks v3.0 ")]), _c('option', {
    attrs: {
      "title": "http://schema.org/",
      "value": "http://schema.org/"
    }
  }, [_vm._v(" Schema.org ")]), _c('option', {
    attrs: {
      "title": "http://purl.org/ASN/schema/core/",
      "value": "http://purl.org/ASN/schema/core/"
    }
  }, [_vm._v(" Achievements Standard Network ")]), _c('option', {
    attrs: {
      "title": "http://purl.org/dc/elements/1.1/",
      "value": "http://purl.org/dc/elements/1.1/"
    }
  }, [_vm._v(" DCMI Elements v1.1 ")]), _c('option', {
    attrs: {
      "title": "http://purl.org/gem/qualifiers/",
      "value": "http://purl.org/gem/qualifiers/"
    }
  }, [_vm._v(" Gem v2.0 ")]), _c('option', {
    attrs: {
      "title": "http://www.loc.gov/loc.terms/relators/",
      "value": "http://www.loc.gov/loc.terms/relators/"
    }
  }, [_vm._v(" Relators Scheme ")]), _c('option', {
    attrs: {
      "title": "http://purl.org/dc/terms/",
      "value": "http://purl.org/dc/terms/"
    }
  }, [_vm._v(" DCMI Terms ")]), _c('option', {
    attrs: {
      "title": "http://www.w3.org/2004/02/skos/core#",
      "value": "http://www.w3.org/2004/02/skos/core#"
    }
  }, [_vm._v(" Simple Knowledge Organization System ")])])])]) : _vm._e()]), _c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column"
  }, [_c('div', {
    staticClass: "control"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v("Range/Type: ")]), _c('div', {
    staticClass: "control"
  }, [_vm.readOnly || !_vm.customPropertyIsNew ? _c('div', [_vm._v(" " + _vm._s(_vm.customPropertyRangeReadable) + " ")]) : _vm._e(), !_vm.readOnly && _vm.customPropertyIsNew ? _c('div', {
    staticClass: "select"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.customPropertyRange,
      expression: "customPropertyRange"
    }],
    on: {
      "change": function change($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.customPropertyRange = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
      }
    }
  }, [_c('option', {
    attrs: {
      "value": "http://www.w3.org/2000/01/rdf-schema#langString"
    }
  }, [_vm._v(" Lang-String ")]), _c('option', {
    attrs: {
      "value": "http://schema.org/URL"
    }
  }, [_vm._v(" URL ")]), _c('option', {
    attrs: {
      "value": "http://schema.org/Text"
    }
  }, [_vm._v(" Text ")]), _c('option', {
    attrs: {
      "value": "http://www.w3.org/2001/XMLSchema#dateTime"
    }
  }, [_vm._v(" Date-Time ")]), _c('option', {
    attrs: {
      "value": "http://purl.org/dc/terms/date"
    }
  }, [_vm._v(" Date ")]), _c('option', {
    attrs: {
      "value": "https://schema.cassproject.org/0.4/skos/Concept"
    }
  }, [_vm._v(" SKOS Concept ")]), _c('option', {
    attrs: {
      "value": "https://schema.cassproject.org/0.4/Competency"
    }
  }, [_vm._v(" Competency ")])])]) : _vm._e()])])]), _c('div', {
    staticClass: "column"
  }, [_c('div', {
    staticClass: "control"
  }, [_c('label', {
    staticClass: "label",
    attrs: {
      "title": "priority in which the custom property is displayed in form inputs"
    }
  }, [_vm._v("Display Priority: ")]), _vm.readOnly ? _c('div', [_vm._v(" " + _vm._s(_vm.customPropertyPriority) + " ")]) : _vm._e(), !_vm.readOnly ? _c('div', {
    staticClass: "control"
  }, [_c('div', {
    staticClass: "select"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.customPropertyPriority,
      expression: "customPropertyPriority"
    }],
    on: {
      "change": function change($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.customPropertyPriority = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
      }
    }
  }, [_c('option', {
    attrs: {
      "value": "primary"
    }
  }, [_vm._v(" primary ")]), _c('option', {
    attrs: {
      "value": "secondary"
    }
  }, [_vm._v(" secondary ")]), _c('option', {
    attrs: {
      "value": "tertiary"
    }
  }, [_vm._v(" tertiary ")])])])]) : _vm._e()])]), _c('div', {
    staticClass: "column"
  }, [_c('div', {
    staticClass: "field"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v("Required ")]), _c('div', {
    staticClass: "control is-size-3"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.customPropertyRequired,
      expression: "customPropertyRequired"
    }],
    staticClass: "switch",
    attrs: {
      "disabled": _vm.readOnly || _vm.shouldAllowCustomPropertyPermittedConcepts || _vm.shouldAllowCustomPropertyPermittedTypes,
      "id": "customPropertyRequiredSwitch",
      "type": "checkbox",
      "name": "customPropertyRequiredSwitch",
      "checked": "checked"
    },
    domProps: {
      "checked": Array.isArray(_vm.customPropertyRequired) ? _vm._i(_vm.customPropertyRequired, null) > -1 : _vm.customPropertyRequired
    },
    on: {
      "change": function change($event) {
        var $$a = _vm.customPropertyRequired,
          $$el = $event.target,
          $$c = $$el.checked ? true : false;
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.customPropertyRequired = $$a.concat([$$v]));
          } else {
            $$i > -1 && (_vm.customPropertyRequired = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.customPropertyRequired = $$c;
        }
      }
    }
  }), _c('label', {
    attrs: {
      "for": "customPropertyRequiredSwitch"
    }
  })])])])]), _c('div', {
    staticClass: "field"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" Unique Property Identifier"), _vm.customPropertyIsNew ? _c('span', [_vm._v(" (only alphanumerics permitted)")]) : _vm._e()]), _vm.readOnly || !_vm.customPropertyIsNew ? _c('div', [_vm._v(" " + _vm._s(_vm.customPropertyPropertyName) + " ")]) : _vm._e(), !_vm.readOnly && _vm.customPropertyIsNew ? _c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.customPropertyPropertyName,
      expression: "customPropertyPropertyName"
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm.customPropertyPropertyName
    },
    on: {
      "change": _vm.simplifyCustomPropertyName,
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.customPropertyPropertyName = $event.target.value;
      }
    }
  })]) : _vm._e()]), _c('div', {
    staticClass: "field"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v("Display Label")]), _vm.readOnly ? _c('div', [_vm._v(" " + _vm._s(_vm.customPropertyLabel) + " ")]) : _vm._e(), !_vm.readOnly ? _c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.customPropertyLabel,
      expression: "customPropertyLabel"
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm.customPropertyLabel
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.customPropertyLabel = $event.target.value;
      }
    }
  })]) : _vm._e()]), _c('div', {
    staticClass: "field"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v("Description")]), _vm.readOnly ? _c('div', [_vm._v(" " + _vm._s(_vm.customPropertyDescription) + " ")]) : _vm._e(), !_vm.readOnly ? _c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.customPropertyDescription,
      expression: "customPropertyDescription"
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm.customPropertyDescription
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.customPropertyDescription = $event.target.value;
      }
    }
  })]) : _vm._e()]), _c('div', {
    staticClass: "field"
  }, [_c('label', {
    staticClass: "label",
    attrs: {
      "title": "category (if any) under which the custom property is displayed in form inputs"
    }
  }, [_vm._v(" Display Category ")]), _vm.readOnly ? _c('div', [_vm._v(" " + _vm._s(_vm.customPropertyHeading) + " ")]) : _vm._e(), !_vm.readOnly ? _c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.customPropertyHeading,
      expression: "customPropertyHeading"
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm.customPropertyHeading
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.customPropertyHeading = $event.target.value;
      }
    }
  })]) : _vm._e()]), _c('div', {
    staticClass: "field"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" Allow Multiple Instances of Field ")]), _c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.customPropertyAllowMultiples,
      expression: "customPropertyAllowMultiples"
    }],
    staticClass: "switch",
    attrs: {
      "disabled": _vm.readOnly,
      "id": "customPropertyAllowMultiplesSwitch",
      "type": "checkbox",
      "name": "customPropertyAllowMultiplesSwitch",
      "checked": "checked"
    },
    domProps: {
      "checked": Array.isArray(_vm.customPropertyAllowMultiples) ? _vm._i(_vm.customPropertyAllowMultiples, null) > -1 : _vm.customPropertyAllowMultiples
    },
    on: {
      "change": function change($event) {
        var $$a = _vm.customPropertyAllowMultiples,
          $$el = $event.target,
          $$c = $$el.checked ? true : false;
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.customPropertyAllowMultiples = $$a.concat([$$v]));
          } else {
            $$i > -1 && (_vm.customPropertyAllowMultiples = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.customPropertyAllowMultiples = $$c;
        }
      }
    }
  }), _c('label', {
    attrs: {
      "for": "customPropertyAllowMultiplesSwitch"
    }
  })])]), _vm.shouldAllowOnePerLangChoice ? _c('div', {
    staticClass: "field"
  }, [_vm.shouldAllowOnePerLangChoice ? _c('label', {
    staticClass: "label"
  }, [_vm._v(" One Entry Per Language ")]) : _vm._e(), _vm.shouldAllowOnePerLangChoice ? _c('div', {
    staticClass: "control"
  }, [_vm.shouldAllowOnePerLangChoice ? _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.customPropertyOnePerLanguage,
      expression: "customPropertyOnePerLanguage"
    }],
    staticClass: "switch",
    attrs: {
      "disabled": _vm.readOnly,
      "id": "customPropertyOnePerLanguageSwitch",
      "type": "checkbox",
      "name": "customPropertyOnePerLanguageSwitch",
      "checked": "checked"
    },
    domProps: {
      "checked": Array.isArray(_vm.customPropertyOnePerLanguage) ? _vm._i(_vm.customPropertyOnePerLanguage, null) > -1 : _vm.customPropertyOnePerLanguage
    },
    on: {
      "change": function change($event) {
        var $$a = _vm.customPropertyOnePerLanguage,
          $$el = $event.target,
          $$c = $$el.checked ? true : false;
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.customPropertyOnePerLanguage = $$a.concat([$$v]));
          } else {
            $$i > -1 && (_vm.customPropertyOnePerLanguage = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.customPropertyOnePerLanguage = $$c;
        }
      }
    }
  }) : _vm._e(), _vm.shouldAllowOnePerLangChoice ? _c('label', {
    attrs: {
      "for": "customPropertyOnePerLanguageSwitch"
    }
  }) : _vm._e()]) : _vm._e()]) : _vm._e(), _vm.shouldAllowCustomPropertyPermittedValues ? _c('div', {
    staticClass: "box py-4 px-4"
  }, [_c('div', {
    staticClass: "field"
  }, [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v("Limit values ")])]), _c('div', {
    staticClass: "column is-narrow"
  }, [_c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.customPropertyValuesLimited,
      expression: "customPropertyValuesLimited"
    }],
    staticClass: "switch",
    attrs: {
      "disabled": _vm.readOnly,
      "id": "customPropertyValuesLimited",
      "type": "checkbox",
      "name": "customPropertyValuesLimited",
      "checked": "checked"
    },
    domProps: {
      "checked": Array.isArray(_vm.customPropertyValuesLimited) ? _vm._i(_vm.customPropertyValuesLimited, null) > -1 : _vm.customPropertyValuesLimited
    },
    on: {
      "change": function change($event) {
        var $$a = _vm.customPropertyValuesLimited,
          $$el = $event.target,
          $$c = $$el.checked ? true : false;
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.customPropertyValuesLimited = $$a.concat([$$v]));
          } else {
            $$i > -1 && (_vm.customPropertyValuesLimited = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.customPropertyValuesLimited = $$c;
        }
      }
    }
  }), _c('label', {
    attrs: {
      "for": "customPropertyValuesLimited"
    }
  })])])]), !_vm.customPropertyValuesLimited && !_vm.readOnly ? _c('p', {
    staticClass: "description"
  }, [_vm._v(" Limit values disabled, any values allowed. To limit, turn on limit values. ")]) : _vm._e(), _vm.customPropertyValuesLimited && !_vm.readOnly ? _c('p', {
    staticClass: "description"
  }, [_vm._v(" Values limited to only those listed below. To allow any, turn off limit values. ")]) : _vm._e()]), _vm.customPropertyValuesLimited && _vm.customPropertyPermittedValues && _vm.customPropertyPermittedValues.length > 0 ? _c('div', {
    staticClass: "table-container"
  }, [_c('table', {
    staticClass: "table is-hoverable is-fullwidth"
  }, [_c('thead', [_c('th', [_vm._v("display label")]), _c('th', [_vm._v("field value")]), _c('th')]), _c('tbody', _vm._l(_vm.customPropertyPermittedValues, function (ev, idx) {
    return _c('tr', {
      key: idx
    }, [_c('th', [_vm.readOnly ? _c('p', [_vm._v(" " + _vm._s(ev.display) + " ")]) : _vm._e(), !_vm.readOnly ? _c('div', {
      staticClass: "control"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: ev.display,
        expression: "ev.display"
      }],
      staticClass: "input",
      attrs: {
        "type": "text"
      },
      domProps: {
        "value": ev.display
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) return;
          _vm.$set(ev, "display", $event.target.value);
        }
      }
    })]) : _vm._e()]), _c('td', [_vm.readOnly ? _c('p', [_vm._v(" " + _vm._s(ev.value) + " ")]) : _vm._e(), _c('div', {
      staticClass: "control"
    }, [!_vm.readOnly ? _c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: ev.value,
        expression: "ev.value"
      }],
      staticClass: "input",
      attrs: {
        "type": "text"
      },
      domProps: {
        "value": ev.value
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) return;
          _vm.$set(ev, "value", $event.target.value);
        }
      }
    }) : _vm._e()])]), _c('td', [!_vm.readOnly ? _c('div', {
      staticClass: "button is-outlined is-danger is-outlined",
      on: {
        "click": function click($event) {
          return _vm.deleteCustomPropertyPermittedValue(idx);
        }
      }
    }, [_c('span', {
      staticClass: "icon"
    }, [_c('i', {
      staticClass: "fa fa-trash"
    })])]) : _vm._e()])]);
  }), 0)])]) : _vm.customPropertyValuesLimited ? _c('div', [_vm._v(" No values entered. ")]) : _vm._e(), _c('div', {
    staticClass: "buttons is-right"
  }, [!_vm.readOnly && _vm.customPropertyValuesLimited ? _c('button', {
    staticClass: "button is-outlined is-primary",
    on: {
      "click": _vm.addCustomPropertyPermittedValue
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-plus"
  })]), _c('span', [_vm._v("add")])]) : _vm._e()])]) : _vm._e(), _vm.shouldAllowCustomPropertyPermittedConcepts ? _c('div', {
    staticClass: "box py-4 px-4"
  }, [_c('div', {
    staticClass: "field"
  }, [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v("Limit concepts ")])]), _c('div', {
    staticClass: "column is-narrow"
  }, [_c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.customPropertyConceptsLimited,
      expression: "customPropertyConceptsLimited"
    }],
    staticClass: "switch",
    attrs: {
      "disabled": _vm.readOnly,
      "id": "customPropertyConceptsLimited",
      "type": "checkbox",
      "name": "customPropertyConceptsLimited",
      "checked": "checked"
    },
    domProps: {
      "checked": Array.isArray(_vm.customPropertyConceptsLimited) ? _vm._i(_vm.customPropertyConceptsLimited, null) > -1 : _vm.customPropertyConceptsLimited
    },
    on: {
      "change": function change($event) {
        var $$a = _vm.customPropertyConceptsLimited,
          $$el = $event.target,
          $$c = $$el.checked ? true : false;
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.customPropertyConceptsLimited = $$a.concat([$$v]));
          } else {
            $$i > -1 && (_vm.customPropertyConceptsLimited = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.customPropertyConceptsLimited = $$c;
        }
      }
    }
  }), _c('label', {
    attrs: {
      "for": "customPropertyConceptsLimited"
    }
  })])])]), !_vm.customPropertyConceptsLimited && !_vm.readOnly ? _c('p', {
    staticClass: "description"
  }, [_vm._v(" Limit concepts disabled, any concepts allowed. To limit, turn on limit concepts. ")]) : _vm._e(), _vm.customPropertyConceptsLimited && !_vm.readOnly ? _c('p', {
    staticClass: "description"
  }, [_vm._v(" Concepts limited to only the taxonomies listed below. To allow any, turn off limit concepts. ")]) : _vm._e()]), _vm.customPropertyConceptsLimited && _vm.customPropertyAvailableConcepts && _vm.customPropertyAvailableConcepts.length > 0 ? _c('div', {
    staticClass: "table-container"
  }, [_vm.customPropertyPermittedConcepts && _vm.customPropertyPermittedConcepts.length > 0 ? _c('div', {
    staticClass: "tags are-medium"
  }, _vm._l(_vm.customPropertyPermittedConcepts, function (concept, index) {
    return _c('span', {
      key: index,
      staticClass: "tag is-light"
    }, [_c('span', {
      attrs: {
        "title": concept.value
      }
    }, [_vm._v(_vm._s(concept.display))]), _c('button', {
      staticClass: "delete is-small",
      attrs: {
        "title": "Remove"
      },
      on: {
        "click": function click($event) {
          return _vm.removeConcept(index);
        }
      }
    })]);
  }), 0) : _vm._e(), _c('div', {
    staticClass: "field is-grouped"
  }, [_c('div', {
    staticClass: "control is-expanded share auto-complete__control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.search,
      expression: "search"
    }],
    staticClass: "input share is-fullwidth",
    attrs: {
      "type": "search",
      "placeholder": "search"
    },
    domProps: {
      "value": _vm.search
    },
    on: {
      "blur": _vm.closeAutoComplete,
      "input": [function ($event) {
        if ($event.target.composing) return;
        _vm.search = $event.target.value;
      }, _vm.filterConcepts]
    }
  }), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.isOpenAutocomplete,
      expression: "isOpenAutocomplete"
    }],
    staticClass: "auto"
  }, [_c('ul', _vm._l(_vm.filteredConcepts, function (result, i) {
    return _c('li', {
      key: i,
      on: {
        "mousedown": function mousedown($event) {
          return _vm.selectConcept(result);
        }
      }
    }, [_vm._v(" " + _vm._s(result.display) + " ")]);
  }), 0)])])])]) : _vm._e()]) : _vm._e(), _vm.shouldAllowCustomPropertyPermittedTypes ? _c('div', {
    staticClass: "box py-4 px-4"
  }, [_c('div', {
    staticClass: "field"
  }, [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v("Limit by type ")])]), _c('div', {
    staticClass: "column is-narrow"
  }, [_c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.customPropertyTypesLimited,
      expression: "customPropertyTypesLimited"
    }],
    staticClass: "switch",
    attrs: {
      "disabled": _vm.readOnly,
      "id": "customPropertyTypesLimited",
      "type": "checkbox",
      "name": "customPropertyTypesLimited",
      "checked": "checked"
    },
    domProps: {
      "checked": Array.isArray(_vm.customPropertyTypesLimited) ? _vm._i(_vm.customPropertyTypesLimited, null) > -1 : _vm.customPropertyTypesLimited
    },
    on: {
      "change": function change($event) {
        var $$a = _vm.customPropertyTypesLimited,
          $$el = $event.target,
          $$c = $$el.checked ? true : false;
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.customPropertyTypesLimited = $$a.concat([$$v]));
          } else {
            $$i > -1 && (_vm.customPropertyTypesLimited = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.customPropertyTypesLimited = $$c;
        }
      }
    }
  }), _c('label', {
    attrs: {
      "for": "customPropertyTypesLimited"
    }
  })])])]), !_vm.customPropertyTypesLimited && !_vm.readOnly ? _c('p', {
    staticClass: "description"
  }, [_vm._v(" Limit by type disabled, any type of competency allowed. To limit, turn on limit by type. ")]) : _vm._e(), _vm.customPropertyTypesLimited && !_vm.readOnly ? _c('p', {
    staticClass: "description"
  }, [_vm._v(" Competencies limited to only the types listed below. To allow any, turn off limit by type. ")]) : _vm._e()]), _vm.customPropertyTypesLimited && _vm.customPropertyAvailableTypes && _vm.customPropertyAvailableTypes.length > 0 ? _c('div', {
    staticClass: "table-container"
  }, [_vm.customPropertyPermittedTypes && _vm.customPropertyPermittedTypes.length > 0 ? _c('div', {
    staticClass: "tags are-medium"
  }, _vm._l(_vm.customPropertyPermittedTypes, function (type, index) {
    return _c('span', {
      key: index,
      staticClass: "tag is-light"
    }, [_c('span', {
      attrs: {
        "title": type.value
      }
    }, [_vm._v(_vm._s(type.display))]), _c('button', {
      staticClass: "delete is-small",
      attrs: {
        "title": "Remove"
      },
      on: {
        "click": function click($event) {
          return _vm.removeType(index);
        }
      }
    })]);
  }), 0) : _vm._e(), _c('div', {
    staticClass: "field is-grouped"
  }, [_c('div', {
    staticClass: "control is-expanded share auto-complete__control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.search,
      expression: "search"
    }],
    staticClass: "input share is-fullwidth",
    attrs: {
      "type": "search",
      "placeholder": "search"
    },
    domProps: {
      "value": _vm.search
    },
    on: {
      "blur": _vm.closeAutoComplete,
      "input": [function ($event) {
        if ($event.target.composing) return;
        _vm.search = $event.target.value;
      }, _vm.filterTypes]
    }
  }), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.isOpenAutocomplete,
      expression: "isOpenAutocomplete"
    }],
    staticClass: "auto"
  }, [_c('ul', _vm._l(_vm.filteredTypes, function (result, i) {
    return _c('li', {
      key: i,
      on: {
        "mousedown": function mousedown($event) {
          return _vm.selectType(result);
        }
      }
    }, [_vm._v(" " + _vm._s(result.display) + " ")]);
  }), 0)])])])]) : _vm._e(), _vm.customPropertyTypesLimited && _vm.customPropertyAvailableTypes && _vm.customPropertyAvailableTypes.length <= 0 ? _c('div', [_vm._v(" No types available to choose from. Add restricted competency types in the configuration. ")]) : _vm._e()]) : _vm._e(), _c('br'), _vm.customPropertyInvalid ? _c('div', {
    staticClass: "field has-text-danger"
  }, [_c('div', {
    staticClass: "label has-text-danger"
  }, [_vm._v(" Please correct the following errors: ")]), _vm.customPropertyPropertyNameExists ? _c('div', {
    staticClass: "is-size-6"
  }, [_vm._v(" Property name is already in use ")]) : _vm._e(), _vm.customPropertyPropertyNameInvalid ? _c('div', {
    staticClass: "is-size-6"
  }, [_vm._v(" Property name is required ")]) : _vm._e(), _vm.customPropertyLabelInvalid ? _c('div', {
    staticClass: "is-size-6"
  }, [_vm._v(" Label is required ")]) : _vm._e(), _vm.customPropertyDescriptionInvalid ? _c('div', {
    staticClass: "is-size-6"
  }, [_vm._v(" Description is required ")]) : _vm._e()]) : _vm._e()]), _c('template', {
    slot: "modal-foot"
  }, [!_vm.readOnly ? _c('div', {
    staticClass: "buttons is-spaced"
  }, [_c('button', {
    staticClass: "button is-outlined is-dark",
    on: {
      "click": _vm.closeCustomPropertyModal
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-times"
  })]), _c('span', [_vm._v(" cancel ")])]), _c('button', {
    staticClass: "button is-outlined is-primary",
    on: {
      "click": _vm.applyCustomPropertyEdits
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-save"
  })]), _vm.customPropertyIsNew ? _c('span', [_vm._v(" apply new property ")]) : _vm._e(), !_vm.customPropertyIsNew ? _c('span', [_vm._v(" update property ")]) : _vm._e()])]) : _vm._e()])], 2), _c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-3"
  }, [_c('nav', {
    class: _vm.panelClass
  }, [_c('p', {
    staticClass: "panel-heading"
  }, [_vm._v(" Sections ")]), _c('a', {
    staticClass: "panel-block",
    class: {
      'is-active': _vm.tab === 'general'
    },
    on: {
      "click": function click($event) {
        _vm.tab = 'general';
      }
    }
  }, [_vm._m(0), _vm._v(" General Details ")]), _c('a', {
    staticClass: "panel-block",
    class: {
      'is-active': _vm.tab === 'framework'
    },
    on: {
      "click": function click($event) {
        _vm.tab = 'framework';
      }
    }
  }, [_vm._m(1), _vm._v(" Framework Settings ")]), _vm.tab === 'framework' ? _c('div', {
    staticClass: "sub-list"
  }, [_c('a', {
    staticClass: "panel-block is-active",
    on: {
      "click": function click($event) {
        return _vm.$scrollTo('#framework-properties', '400', _vm.scrollOptions);
      }
    }
  }, [_vm._m(2), _vm._v(" Properties ")])]) : _vm._e(), _c('a', {
    staticClass: "panel-block",
    class: {
      'is-active': _vm.tab === 'competency'
    },
    on: {
      "click": function click($event) {
        _vm.tab = 'competency';
      }
    }
  }, [_vm._m(3), _vm._v(" Competency Settings ")]), _vm.tab === 'competency' ? _c('div', {
    staticClass: "sub-list"
  }, [_c('a', {
    staticClass: "panel-block is-active",
    class: {
      'is-active': _vm.tab === 'framework'
    },
    on: {
      "click": function click($event) {
        return _vm.$scrollTo('#competency-properties', '400', _vm.scrollOptions);
      }
    }
  }, [_vm._m(4), _vm._v(" Properties ")]), _c('a', {
    staticClass: "panel-block is-active",
    class: {
      'is-active': _vm.tab === 'framework'
    },
    on: {
      "click": function click($event) {
        return _vm.$scrollTo('#enforce-competency-types', '400', _vm.scrollOptions);
      }
    }
  }, [_vm._m(5), _vm._v(" Restricted Types ")]), _c('a', {
    staticClass: "panel-block is-active",
    class: {
      'is-active': _vm.tab === 'framework'
    },
    on: {
      "click": function click($event) {
        return _vm.$scrollTo('#allow-levels', '400', _vm.scrollOptions);
      }
    }
  }, [_vm._m(6), _vm._v(" Allow Levels ")])]) : _vm._e(), _c('a', {
    staticClass: "panel-block",
    class: {
      'is-active': _vm.tab === 'relationships'
    },
    on: {
      "click": function click($event) {
        _vm.tab = 'relationships';
      }
    }
  }, [_vm._m(7), _vm._v(" Competency Relationships ")]), _vm.tab === 'relationships' ? _c('div', {
    staticClass: "sub-list"
  }, [_c('a', {
    staticClass: "panel-block is-active",
    on: {
      "click": function click($event) {
        return _vm.$scrollTo('#relationship-display-category', '400', _vm.scrollOptions);
      }
    }
  }, [_vm._m(8), _vm._v(" Category ")]), _c('a', {
    staticClass: "panel-block is-active",
    on: {
      "click": function click($event) {
        return _vm.$scrollTo('#relationship-display-priority', '400', _vm.scrollOptions);
      }
    }
  }, [_vm._m(9), _vm._v(" Display Priority ")]), _c('a', {
    staticClass: "panel-block is-active",
    on: {
      "click": function click($event) {
        return _vm.$scrollTo('#relationship-types', '400', _vm.scrollOptions);
      }
    }
  }, [_vm._m(10), _vm._v(" Relationship Types ")])]) : _vm._e(), _c('a', {
    staticClass: "panel-block",
    class: {
      'is-active': _vm.tab === 'alignments'
    },
    on: {
      "click": function click($event) {
        _vm.tab = 'alignments';
      }
    }
  }, [_vm._m(11), _vm._v(" Resource Alignments ")]), _vm.tab === 'alignments' ? _c('div', {
    staticClass: "sub-list"
  }, [_c('a', {
    staticClass: "panel-block is-active",
    on: {
      "click": function click($event) {
        return _vm.$scrollTo('#alignment-types', '400', _vm.scrollOptions);
      }
    }
  }, [_vm._m(12), _vm._v(" alignment types ")])]) : _vm._e(), _c('a', {
    staticClass: "panel-block",
    class: {
      'is-active': _vm.tab === 'taxonomy'
    },
    on: {
      "click": function click($event) {
        _vm.tab = 'taxonomy';
      }
    }
  }, [_vm._m(13), _vm._v(" Taxonomy Settings ")]), _vm.tab === 'taxonomy' ? _c('div', {
    staticClass: "sub-list"
  }, [_c('a', {
    staticClass: "panel-block is-active",
    on: {
      "click": function click($event) {
        return _vm.$scrollTo('#taxonomy-properties', '400', _vm.scrollOptions);
      }
    }
  }, [_vm._m(14), _vm._v(" Properties ")])]) : _vm._e(), _c('a', {
    staticClass: "panel-block",
    class: {
      'is-active': _vm.tab === 'taxon'
    },
    on: {
      "click": function click($event) {
        _vm.tab = 'taxon';
      }
    }
  }, [_vm._m(15), _vm._v(" Taxon Settings ")]), _vm.tab === 'taxon' ? _c('div', {
    staticClass: "sub-list"
  }, [_c('a', {
    staticClass: "panel-block is-active",
    on: {
      "click": function click($event) {
        return _vm.$scrollTo('#taxonomy-properties', '400', _vm.scrollOptions);
      }
    }
  }, [_vm._m(16), _vm._v(" Properties ")])]) : _vm._e(), _c('a', {
    staticClass: "panel-block",
    class: {
      'is-active': _vm.tab === 'users'
    },
    on: {
      "click": function click($event) {
        _vm.tab = 'users';
      }
    }
  }, [_vm._m(17), _vm._v(" Users ")]), _vm.tab === 'users' ? _c('div', {
    staticClass: "sub-list"
  }, [_c('a', {
    staticClass: "panel-block is-active",
    on: {
      "click": function click($event) {
        return _vm.$scrollTo('#default-owners', '400', _vm.scrollOptions);
      }
    }
  }, [_vm._m(18), _vm._v(" Default owners ")]), _c('a', {
    staticClass: "panel-block is-active",
    on: {
      "click": function click($event) {
        return _vm.$scrollTo('#default-readers', '400', _vm.scrollOptions);
      }
    }
  }, [_vm._m(19), _vm._v(" Default readers ")])]) : _vm._e(), _vm.readOnly ? _c('a', {
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
  }, [_vm._v(" back ")])])]) : _vm._e(), !_vm.readOnly ? _c('div', {
    staticClass: "panel-block"
  }, [_c('div', {
    staticClass: "button is-fullwidth is-outlined is-dark",
    on: {
      "click": function click($event) {
        return _vm.$emit('cancel');
      }
    }
  }, [_vm._m(20), _c('span', [_vm._v("cancel")])])]) : _vm._e(), !_vm.readOnly ? _c('div', {
    staticClass: "panel-block"
  }, [_c('div', {
    staticClass: "button is-fullwidth is-outlined is-primary",
    on: {
      "click": _vm.validateCurrentConfigAndEmitSave
    }
  }, [_vm._m(21), _c('span', [_vm._v("save configuration")])])]) : _vm._e()])]), _c('div', {
    staticClass: "column is-9"
  }, [_vm.tab === 'general' ? _c('div', {
    staticClass: "px-4 mb-6"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "section box py-4 px-4",
    attrs: {
      "id": "configuration-details"
    }
  }, [_c('h3', {
    staticClass: "is-size-3 title"
  }, [_vm._v(" General details ")]), _c('div', {
    staticClass: "field"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v("Name")]), _vm.readOnly ? _c('div', [_vm._v(" " + _vm._s(_vm.config.name) + " ")]) : _vm._e(), !_vm.readOnly ? _c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.config.name,
      expression: "config.name"
    }],
    staticClass: "input",
    attrs: {
      "type": "text "
    },
    domProps: {
      "value": _vm.config.name
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.config, "name", $event.target.value);
      }
    }
  })]) : _vm._e()]), _c('div', {
    staticClass: "field"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v("Description ")]), _vm.readOnly ? _c('div', [_vm._v(" " + _vm._s(_vm.config.description) + " ")]) : _vm._e(), !_vm.readOnly ? _c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.config.description,
      expression: "config.description"
    }],
    staticClass: "input",
    attrs: {
      "type": "text "
    },
    domProps: {
      "value": _vm.config.description
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.config, "description", $event.target.value);
      }
    }
  })]) : _vm._e()]), _c('div', {
    staticClass: "field is-grouped"
  }, [_c('div', {
    staticClass: "control is-ltr is-expanded"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.config.isDefault,
      expression: "config.isDefault"
    }],
    staticClass: "switch is-outlined",
    class: {
      'is-primary': _vm.config.isDefault
    },
    attrs: {
      "disabled": _vm.isSetInstanceDisabled,
      "id": _vm.config.id + 'instanceDefaultSwitch',
      "type": "checkbox",
      "name": _vm.config.id + 'instanceDefaultSwitch'
    },
    domProps: {
      "checked": Array.isArray(_vm.config.isDefault) ? _vm._i(_vm.config.isDefault, null) > -1 : _vm.config.isDefault
    },
    on: {
      "change": function change($event) {
        var $$a = _vm.config.isDefault,
          $$el = $event.target,
          $$c = $$el.checked ? true : false;
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && _vm.$set(_vm.config, "isDefault", $$a.concat([$$v]));
          } else {
            $$i > -1 && _vm.$set(_vm.config, "isDefault", $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.$set(_vm.config, "isDefault", $$c);
        }
      }
    }
  }), _c('label', {
    attrs: {
      "for": _vm.config.id + 'instanceDefaultSwitch'
    }
  }, [_vm._v("Instance default")])]), _c('div', {
    staticClass: "control is-expanded"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.isBrowserDefault,
      expression: "isBrowserDefault"
    }],
    staticClass: "switch is-outlined",
    attrs: {
      "disabled": _vm.config.isNew,
      "id": "browserDefaultSwitch",
      "type": "checkbox",
      "name": "browserDefaultSwitch"
    },
    domProps: {
      "checked": Array.isArray(_vm.isBrowserDefault) ? _vm._i(_vm.isBrowserDefault, null) > -1 : _vm.isBrowserDefault
    },
    on: {
      "change": function change($event) {
        var $$a = _vm.isBrowserDefault,
          $$el = $event.target,
          $$c = $$el.checked ? true : false;
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.isBrowserDefault = $$a.concat([$$v]));
          } else {
            $$i > -1 && (_vm.isBrowserDefault = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.isBrowserDefault = $$c;
        }
      }
    }
  }), _c('label', {
    attrs: {
      "for": "browserDefaultSwitch"
    }
  }, [_vm._v("Browser default")])])])])])]) : _vm._e(), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.tab === 'framework' || _vm.tab === 'general',
      expression: "tab === 'framework' || tab === 'general'"
    }],
    staticClass: "px-4 mb-6",
    attrs: {
      "id": "framework-properties"
    }
  }, [_c('h5', {
    staticClass: "title is-size-3"
  }, [_vm._v(" Framework Configuration ")]), _vm._m(22), _c('div', {
    staticClass: "table-container box py-4 px-4"
  }, [_c('h5', {
    staticClass: "is-size-4 title"
  }, [_vm._v(" Framework properties "), !_vm.readOnly ? _c('div', {
    staticClass: "button is-family-primary is-outlined is-pulled-right is-primary",
    on: {
      "click": _vm.addCustomFrameworkProperty
    }
  }, [_vm._m(23), _c('span', [_vm._v(" add custom framework property ")])]) : _vm._e()]), _c('p', {
    staticClass: "subtitle"
  }, [_vm._v(" Manage framework property settings here. Change how properties are displayed and labeled in the editor. ")]), _c('table', {
    staticClass: "table is-hoverable is-fullwidth"
  }, [_vm._m(24), _c('tbody', [_c('FrameworkCompetencyPropertyListItem', {
    attrs: {
      "propertyParent": "framework",
      "property": "id",
      "label": _vm.config.fwkIdLabel,
      "description": _vm.config.fwkIdDescription,
      "required": true,
      "priority": _vm.config.fwkIdPriorty,
      "heading": _vm.config.fwkIdHeading,
      "custom": false,
      "readOnly": _vm.readOnly,
      "enforceRequired": true,
      "enforceNotRequired": false,
      "enforcePrimary": false
    },
    on: {
      "change": _vm.updateFrameworkCompetencyProperty
    }
  }), _c('FrameworkCompetencyPropertyListItem', {
    attrs: {
      "propertyParent": "framework",
      "property": "name",
      "label": _vm.config.fwkNameLabel,
      "description": _vm.config.fwkNameDescription,
      "required": true,
      "priority": "primary",
      "heading": _vm.config.fwkNameHeading,
      "custom": false,
      "readOnly": _vm.readOnly,
      "enforceRequired": true,
      "enforceNotRequired": false,
      "enforcePrimary": true
    },
    on: {
      "change": _vm.updateFrameworkCompetencyProperty
    }
  }), _c('FrameworkCompetencyPropertyListItem', {
    attrs: {
      "propertyParent": "framework",
      "property": "description",
      "label": _vm.config.fwkDescLabel,
      "description": _vm.config.fwkDescDescription,
      "required": _vm.config.fwkDescRequired,
      "priority": _vm.config.fwkDescPriority,
      "heading": _vm.config.fwkDescHeading,
      "custom": false,
      "readOnly": _vm.readOnly,
      "enforceRequired": false,
      "enforceNotRequired": false,
      "enforcePrimary": false
    },
    on: {
      "change": _vm.updateFrameworkCompetencyProperty
    }
  }), _c('FrameworkCompetencyPropertyListItem', {
    attrs: {
      "propertyParent": "framework",
      "property": "classification",
      "label": _vm.config.fwkClassLabel,
      "description": _vm.config.fwkClassDescription,
      "required": _vm.config.fwkClassRequired,
      "priority": _vm.config.fwkClassPriority,
      "heading": _vm.config.fwkClassHeading,
      "custom": false,
      "readOnly": _vm.readOnly,
      "enforceRequired": false,
      "enforceNotRequired": false,
      "enforcePrimary": false
    },
    on: {
      "change": _vm.updateFrameworkCompetencyProperty
    }
  }), _c('FrameworkCompetencyPropertyListItem', {
    attrs: {
      "propertyParent": "framework",
      "property": "markings",
      "label": _vm.config.fwkMarkingsLabel,
      "description": _vm.config.fwkMarkingsDescription,
      "required": _vm.config.fwkMarkingsRequired,
      "priority": _vm.config.fwkMarkingsPriority,
      "heading": _vm.config.fwkMarkingsHeading,
      "custom": false,
      "readOnly": _vm.readOnly,
      "enforceRequired": false,
      "enforceNotRequired": false,
      "enforcePrimary": false
    },
    on: {
      "change": _vm.updateFrameworkCompetencyProperty
    }
  }), _vm._l(_vm.config.fwkCustomProperties, function (prop, idx) {
    return _c('FrameworkCompetencyPropertyListItem', {
      key: prop.propertyName + '_' + prop.label + '_' + prop.description + '_' + prop.required + '_' + prop.priority + '_' + prop.heading,
      attrs: {
        "propertyParent": "framework",
        "property": prop.propertyName,
        "label": prop.label,
        "description": prop.description,
        "required": prop.required,
        "priority": prop.priority,
        "heading": prop.heading,
        "custom": true,
        "readOnly": _vm.readOnly,
        "enforceRequired": false,
        "enforceNotRequired": _vm.shouldEnforceNotRequired(prop.range),
        "enforcePrimary": false,
        "propertyIndex": idx
      },
      on: {
        "change": _vm.updateFrameworkCompetencyProperty,
        "manage": _vm.manageCustomFrameworkCompetencyProperty,
        "delete": _vm.deleteCustomFrameworkCompetencyProperty
      }
    });
  })], 2)])])]), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.tab === 'competency' || _vm.tab === 'general',
      expression: "tab === 'competency' || tab === 'general'"
    }],
    staticClass: "px-4"
  }, [_c('h5', {
    staticClass: "is-size-3 title"
  }, [_vm._v(" Competency Configuration ")]), _vm._m(25), _c('div', {
    staticClass: "table-container box py-4 px-4",
    attrs: {
      "id": "competency-properties"
    }
  }, [_c('h4', {
    staticClass: "is-size-4 title"
  }, [_vm._v(" Competency Properties "), !_vm.readOnly ? _c('span', {
    staticClass: "button is-family-primary is-outlined is-pulled-right is-primary",
    on: {
      "click": _vm.addCustomCompetencyProperty
    }
  }, [_vm._m(26), _c('span', [_vm._v(" add custom competency property ")])]) : _vm._e()]), _c('p', {
    staticClass: "subtitle"
  }, [_vm._v(" Manage availability and display of competency properties in the editor. ")]), _c('table', {
    staticClass: "table is-hoverable is-fullwidth"
  }, [_vm._m(27), _c('tbody', [_c('FrameworkCompetencyPropertyListItem', {
    attrs: {
      "propertyParent": "competency",
      "property": "id",
      "label": _vm.config.compIdLabel,
      "description": _vm.config.compIdDescription,
      "required": true,
      "priority": _vm.config.compIdPriorty,
      "heading": _vm.config.compIdHeading,
      "custom": false,
      "readOnly": _vm.readOnly,
      "enforceRequired": true,
      "enforceNotRequired": false,
      "enforcePrimary": false
    },
    on: {
      "change": _vm.updateFrameworkCompetencyProperty
    }
  }), _c('FrameworkCompetencyPropertyListItem', {
    attrs: {
      "propertyParent": "competency",
      "property": "name",
      "label": _vm.config.compNameLabel,
      "description": _vm.config.compNameDescription,
      "required": true,
      "priority": "primary",
      "heading": _vm.config.compNameHeading,
      "custom": false,
      "readOnly": _vm.readOnly,
      "enforceRequired": true,
      "enforceNotRequired": false,
      "enforcePrimary": true
    },
    on: {
      "change": _vm.updateFrameworkCompetencyProperty
    }
  }), _c('FrameworkCompetencyPropertyListItem', {
    attrs: {
      "propertyParent": "competency",
      "property": "description",
      "label": _vm.config.compDescLabel,
      "description": _vm.config.compDescDescription,
      "required": _vm.config.compDescRequired,
      "priority": _vm.config.compDescPriority,
      "heading": _vm.config.compDescHeading,
      "custom": false,
      "readOnly": _vm.readOnly,
      "enforceRequired": false,
      "enforceNotRequired": false,
      "enforcePrimary": false
    },
    on: {
      "change": _vm.updateFrameworkCompetencyProperty
    }
  }), _c('FrameworkCompetencyPropertyListItem', {
    attrs: {
      "propertyParent": "competency",
      "property": "type",
      "label": _vm.config.compTypeLabel,
      "description": _vm.config.compTypeDescription,
      "required": _vm.config.compTypeRequired,
      "priority": _vm.config.compTypePriority,
      "heading": _vm.config.compTypeHeading,
      "custom": false,
      "readOnly": _vm.readOnly,
      "enforceRequired": false,
      "enforceNotRequired": false,
      "enforcePrimary": false
    },
    on: {
      "change": _vm.updateFrameworkCompetencyProperty
    }
  }), _c('FrameworkCompetencyPropertyListItem', {
    attrs: {
      "propertyParent": "competency",
      "property": "classification",
      "label": _vm.config.compClassLabel,
      "description": _vm.config.compClassDescription,
      "required": _vm.config.compClassRequired,
      "priority": _vm.config.compClassPriority,
      "heading": _vm.config.compClassHeading,
      "custom": false,
      "readOnly": _vm.readOnly,
      "enforceRequired": false,
      "enforceNotRequired": false,
      "enforcePrimary": false
    },
    on: {
      "change": _vm.updateFrameworkCompetencyProperty
    }
  }), _c('FrameworkCompetencyPropertyListItem', {
    attrs: {
      "propertyParent": "competency",
      "property": "markings",
      "label": _vm.config.compMarkingsLabel,
      "description": _vm.config.compMarkingsDescription,
      "required": _vm.config.compMarkingsRequired,
      "priority": _vm.config.compMarkingsPriority,
      "heading": _vm.config.compMarkingsHeading,
      "custom": false,
      "readOnly": _vm.readOnly,
      "enforceRequired": false,
      "enforceNotRequired": false,
      "enforcePrimary": false
    },
    on: {
      "change": _vm.updateFrameworkCompetencyProperty
    }
  }), _vm._l(_vm.config.compCustomProperties, function (prop, idx) {
    return _c('FrameworkCompetencyPropertyListItem', {
      key: prop.propertyName + '_' + prop.label + '_' + prop.description + '_' + prop.required + '_' + prop.priority + '_' + prop.heading,
      attrs: {
        "propertyParent": "competency",
        "property": prop.propertyName,
        "label": prop.label,
        "description": prop.description,
        "required": prop.required,
        "priority": prop.priority,
        "heading": prop.heading,
        "custom": true,
        "readOnly": _vm.readOnly,
        "enforceRequired": false,
        "enforceNotRequired": _vm.shouldEnforceNotRequired(prop.range),
        "enforcePrimary": false,
        "propertyIndex": idx
      },
      on: {
        "change": _vm.updateFrameworkCompetencyProperty,
        "manage": _vm.manageCustomFrameworkCompetencyProperty,
        "delete": _vm.deleteCustomFrameworkCompetencyProperty
      }
    });
  })], 2)])])]), _vm.tab === 'competency' || _vm.tab === 'general' ? _c('div', {
    staticClass: "px-4 py-4 mb-6"
  }, [_c('div', {
    staticClass: "section box py-4 px-4",
    attrs: {
      "id": "enforce-competency-types"
    }
  }, [_c('div', {
    staticClass: "columns is-multiline is-mobile"
  }, [_vm._m(28), _c('div', {
    staticClass: "column is-narrow"
  }, [_c('div', {
    staticClass: "field"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.config.compEnforceTypes,
      expression: "config.compEnforceTypes"
    }],
    staticClass: "switch is-outlined",
    attrs: {
      "disabled": _vm.readOnly,
      "id": "enforceTypesSwitch",
      "type": "checkbox",
      "name": "enforceTypesSwitch"
    },
    domProps: {
      "checked": Array.isArray(_vm.config.compEnforceTypes) ? _vm._i(_vm.config.compEnforceTypes, null) > -1 : _vm.config.compEnforceTypes
    },
    on: {
      "change": [function ($event) {
        var $$a = _vm.config.compEnforceTypes,
          $$el = $event.target,
          $$c = $$el.checked ? true : false;
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && _vm.$set(_vm.config, "compEnforceTypes", $$a.concat([$$v]));
          } else {
            $$i > -1 && _vm.$set(_vm.config, "compEnforceTypes", $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.$set(_vm.config, "compEnforceTypes", $$c);
        }
      }, _vm.checkEnforceTypesChange]
    }
  }), _c('label', {
    attrs: {
      "for": "enforceTypesSwitch"
    }
  })])]), _c('div', {
    staticClass: "column is-12"
  }, [!_vm.readOnly && _vm.config.compEnforceTypes ? _c('p', {
    staticClass: "description"
  }, [_vm._v(" Competency types limited to the below table presets. If table is left blank, this feature will be turned off on save. ")]) : _vm._e(), !_vm.readOnly && !_vm.config.compEnforceTypes ? _c('p', {
    staticClass: "description"
  }, [_vm._v(" Competency types are not defined, any text field can be entered for competency types. Restrict to limit types. ")]) : _vm._e()])]), _vm.config.compEnforceTypes ? _c('div', {
    staticClass: "table-container"
  }, [_c('h4', {
    staticClass: "is-size-4 title"
  }, [_vm._v(" Permitted values "), _vm.config.compEnforceTypes && !_vm.readOnly ? _c('span', {
    staticClass: "button is-family-primary is-outlined is-pulled-right is-primary",
    on: {
      "click": _vm.addCompetencyEnforcedTypeDataHolder
    }
  }, [_vm._m(29), _c('span', [_vm._v("add type")])]) : _vm._e()]), _c('table', {
    staticClass: "table is-hoverable is-fullwidth"
  }, [_vm._m(30), _c('tbody', _vm._l(_vm.config.compEnforcedTypes, function (et, idx) {
    return _c('tr', {
      key: idx
    }, [_c('th', [_vm.readOnly ? _c('label', {
      staticClass: "label"
    }, [_vm._v(" " + _vm._s(et.display) + " ")]) : _vm._e(), !_vm.readOnly ? _c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: et.display,
        expression: "et.display"
      }],
      staticClass: "input",
      attrs: {
        "type": "text"
      },
      domProps: {
        "value": et.display
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) return;
          _vm.$set(et, "display", $event.target.value);
        }
      }
    }) : _vm._e()]), _c('td', [_vm.readOnly ? _c('p', [_vm._v(" " + _vm._s(et.value) + " ")]) : _vm._e(), !_vm.readOnly ? _c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: et.value,
        expression: "et.value"
      }],
      staticClass: "input",
      attrs: {
        "type": "text"
      },
      domProps: {
        "value": et.value
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) return;
          _vm.$set(et, "value", $event.target.value);
        }
      }
    }) : _vm._e()]), _c('td', [!_vm.readOnly ? _c('div', {
      staticClass: "button is-outlined is-danger",
      on: {
        "click": function click($event) {
          return _vm.deleteCompetencyEnforcedType(idx);
        }
      }
    }, [_vm._m(31, true)]) : _vm._e()])]);
  }), 0)])]) : _vm._e()]), _c('div', {
    staticClass: "section box py-4 px-4",
    attrs: {
      "id": "allow-levels"
    }
  }, [_c('div', {
    staticClass: "columns is-multiline"
  }, [_vm._m(32), _c('div', {
    staticClass: "column is-narrow"
  }, [_c('div', {
    staticClass: "column is-narrow"
  }, [_c('div', {
    staticClass: "field"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.config.compAllowLevels,
      expression: "config.compAllowLevels"
    }],
    staticClass: "switch is-outlined",
    attrs: {
      "disabled": _vm.readOnly,
      "id": "allowLevelsSwitch",
      "type": "checkbox",
      "name": "allowLevelsSwitch"
    },
    domProps: {
      "checked": Array.isArray(_vm.config.compAllowLevels) ? _vm._i(_vm.config.compAllowLevels, null) > -1 : _vm.config.compAllowLevels
    },
    on: {
      "change": function change($event) {
        var $$a = _vm.config.compAllowLevels,
          $$el = $event.target,
          $$c = $$el.checked ? true : false;
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && _vm.$set(_vm.config, "compAllowLevels", $$a.concat([$$v]));
          } else {
            $$i > -1 && _vm.$set(_vm.config, "compAllowLevels", $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.$set(_vm.config, "compAllowLevels", $$c);
        }
      }
    }
  }), _c('label', {
    attrs: {
      "for": "allowLevelsSwitch"
    }
  })])])]), _vm._m(33)]), _vm.config.compAllowLevels ? _c('div', {
    staticClass: "field is-horizontal"
  }, [_vm._m(34), _c('div', {
    staticClass: "field-body"
  }, [_c('div', {
    staticClass: "field is-expanded"
  }, [_vm.readOnly ? _c('div', [_vm._v(" " + _vm._s(_vm.config.levelLabel) + " ")]) : _vm._e(), !_vm.readOnly ? _c('div', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.config.levelLabel,
      expression: "config.levelLabel"
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm.config.levelLabel
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.config, "levelLabel", $event.target.value);
      }
    }
  })]) : _vm._e()])])]) : _vm._e(), _vm.config.compAllowLevels ? _c('div', {
    staticClass: "field is-horizontal"
  }, [_vm._m(35), _c('div', {
    staticClass: "field-body"
  }, [_c('div', {
    staticClass: "field is-expanded"
  }, [_vm.readOnly ? _c('div', [_vm._v(" " + _vm._s(_vm.config.levelDescription) + " ")]) : _vm._e(), !_vm.readOnly ? _c('div', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.config.levelDescription,
      expression: "config.levelDescription"
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm.config.levelDescription
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.config, "levelDescription", $event.target.value);
      }
    }
  })]) : _vm._e()])])]) : _vm._e(), _vm.config.compAllowLevels ? _c('div', {
    staticClass: "field is-horizontal",
    attrs: {
      "id": "relationship-display-category"
    }
  }, [_vm._m(36), _c('div', {
    staticClass: "field-body"
  }, [_c('div', {
    staticClass: "field is-expanded"
  }, [_vm.readOnly ? _c('div', [_vm._v(" " + _vm._s(_vm.config.levelHeading) + " ")]) : _vm._e(), !_vm.readOnly ? _c('div', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.config.levelHeading,
      expression: "config.levelHeading"
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm.config.levelHeading
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.config, "levelHeading", $event.target.value);
      }
    }
  })]) : _vm._e()])])]) : _vm._e(), _vm.config.compAllowLevels ? _c('div', {
    staticClass: "field is-horizontal",
    attrs: {
      "id": "relationship-display-priority"
    }
  }, [_vm._m(37), _c('div', {
    staticClass: "field-body"
  }, [_c('div', {
    staticClass: "field is-expanded"
  }, [_vm.readOnly ? _c('div', [_vm._v(" " + _vm._s(_vm.config.levelPriority) + " ")]) : _vm._e(), !_vm.readOnly ? _c('div', {
    staticClass: "select"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.config.levelPriority,
      expression: "config.levelPriority"
    }],
    on: {
      "change": function change($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.$set(_vm.config, "levelPriority", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
      }
    }
  }, [_c('option', {
    attrs: {
      "value": "primary"
    }
  }, [_vm._v(" primary ")]), _c('option', {
    attrs: {
      "value": "secondary"
    }
  }, [_vm._v(" secondary ")]), _c('option', {
    attrs: {
      "value": "tertiary"
    }
  }, [_vm._v(" tertiary ")])])]) : _vm._e()])])]) : _vm._e(), _vm.config.compAllowLevels && _vm.tab === 'competency' || _vm.tab === 'general' ? _c('div', {
    attrs: {
      "id": "enforce-level-values"
    }
  }, [_c('div', {
    staticClass: "field is-horizontal"
  }, [_vm._m(38), _c('div', {
    staticClass: "field-body"
  }, [_c('div', {
    staticClass: "field is-expanded"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.config.enforceLevelValues,
      expression: "config.enforceLevelValues"
    }],
    staticClass: "switch is-outlined",
    attrs: {
      "disabled": _vm.readOnly,
      "id": "enforceLevelsSwitch",
      "type": "checkbox",
      "name": "enforceLevelsSwitch"
    },
    domProps: {
      "checked": Array.isArray(_vm.config.enforceLevelValues) ? _vm._i(_vm.config.enforceLevelValues, null) > -1 : _vm.config.enforceLevelValues
    },
    on: {
      "change": function change($event) {
        var $$a = _vm.config.enforceLevelValues,
          $$el = $event.target,
          $$c = $$el.checked ? true : false;
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && _vm.$set(_vm.config, "enforceLevelValues", $$a.concat([$$v]));
          } else {
            $$i > -1 && _vm.$set(_vm.config, "enforceLevelValues", $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.$set(_vm.config, "enforceLevelValues", $$c);
        }
      }
    }
  }), _c('label', {
    attrs: {
      "for": "enforceLevelsSwitch"
    }
  }), _vm.config.enforceLevelValues ? _c('p', {
    staticClass: "help"
  }, [_vm._v(" RESTRICTED. Levels property values in the framework editor will be limited to the values in the table below. ")]) : _vm._e(), !_vm.config.enforceLevelValues ? _c('p', {
    staticClass: "help"
  }, [_vm._v(" Not restricted, any text string can be input in the framework editor. ")]) : _vm._e()])])]), _vm.config.enforceLevelValues ? _c('div', {
    staticClass: "table-container box py-4 px-4"
  }, [_c('h4', {
    staticClass: "is-size-4 title"
  }, [_vm._v(" Permitted values "), _vm.config.enforceLevelValues && !_vm.readOnly ? _c('span', {
    staticClass: "button is-outlined is-family-primary is-primary is-pulled-right",
    on: {
      "click": _vm.showSelectLevelsModal
    }
  }, [_vm._m(39), _c('span', [_vm._v("manage levels")])]) : _vm._e()]), _c('table', {
    staticClass: "table is-hoverable is-fullwidth"
  }, [_vm._m(40), _c('tbody', _vm._l(_vm.localEnforcedLevelValues, function (lvlId) {
    return _c('tr', {
      key: lvlId
    }, [_c('th', {
      staticClass: "control"
    }, [_c('p', [_vm._v(_vm._s(_vm.getLevelNameById(lvlId)))])]), _c('td', [_c('p', [_vm._v(_vm._s(_vm.getLevelDescById(lvlId)))])])]);
  }), 0)])]) : _vm._e()]) : _vm._e()])]) : _vm._e(), _vm.tab === 'relationships' || _vm.tab === 'general' ? _c('div', {
    staticClass: "px-4 mb-6",
    attrs: {
      "id": "competency-relationships"
    }
  }, [_c('h5', {
    staticClass: "title is-size-3"
  }, [_vm._v(" Competency Relationships Configuration ")]), _c('p', {
    staticClass: "subtitle"
  }, [_vm._v(" Relationships can be added as properties on competencies to define how competencies within a framework or between two different frameworks relate to each other. Enabled relationships will be available in the property drop down when editing competencies in the framework editor. ")]), _c('div', {
    staticClass: "box py-4 px-4",
    attrs: {
      "id": "relationship-display-category"
    }
  }, [_c('h4', {
    staticClass: "is-size-4 title"
  }, [_vm._v(" Display options ")]), _c('p', {
    staticClass: "subtitle"
  }, [_vm._v(" Change when and how your relationships are displayed in framework view and edit modes. ")]), _c('div', {
    staticClass: "field is-horizontal"
  }, [_vm._m(41), _c('div', {
    staticClass: "field-body"
  }, [_c('div', {
    staticClass: "field is-expanded"
  }, [_vm.readOnly ? _c('div', {
    staticClass: "control is-expanded"
  }, [_vm._v(" " + _vm._s(_vm.config.relationshipsHeading) + " ")]) : _vm._e(), !_vm.readOnly ? _c('div', {
    staticClass: "control is-expanded"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.config.relationshipsHeading,
      expression: "config.relationshipsHeading"
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm.config.relationshipsHeading
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.config, "relationshipsHeading", $event.target.value);
      }
    }
  })]) : _vm._e()])])]), _c('div', {
    staticClass: "field is-horizontal",
    attrs: {
      "id": "relationship-display-category"
    }
  }, [_vm._m(42), _c('div', {
    staticClass: "field-body"
  }, [_c('div', {
    staticClass: "field is-expanded"
  }, [_vm.readOnly ? _c('div', {
    staticClass: "control"
  }, [_vm._v(" " + _vm._s(_vm.config.relationshipsPriority) + " ")]) : _vm._e(), _c('div', {
    staticClass: "control"
  }, [!_vm.readOnly ? _c('div', {
    staticClass: "select"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.config.relationshipsPriority,
      expression: "config.relationshipsPriority"
    }],
    on: {
      "change": function change($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.$set(_vm.config, "relationshipsPriority", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
      }
    }
  }, [_c('option', {
    attrs: {
      "value": "primary"
    }
  }, [_vm._v(" primary ")]), _c('option', {
    attrs: {
      "value": "secondary"
    }
  }, [_vm._v(" secondary ")]), _c('option', {
    attrs: {
      "value": "tertiary"
    }
  }, [_vm._v(" tertiary ")])])]) : _vm._e()])])])])]), _c('div', {
    staticClass: "table-container box py-4",
    attrs: {
      "id": "relationship-types"
    }
  }, [_c('h4', {
    staticClass: "is-size-4 title"
  }, [_vm._v(" Relationship types "), _c('div', {
    staticClass: "button is-family-primary is-pulled-right is-primary is-outlined",
    on: {
      "click": function click($event) {
        return _vm.showManageRelations();
      }
    }
  }, [_vm._m(43), _c('span', [_vm._v("manage relationships")])])]), _c('p', {
    staticClass: "subtitle"
  }, [_vm._v(" Only enabled relationships will display in the table below. Manage configurations to add new relationship options. ")]), _c('table', {
    staticClass: "table is-hoverable is-fullwidth"
  }, [_vm._m(44), _c('tbody', _vm._l(this.config.relationships, function (relObj, relKey) {
    return _c('RelationshipListItem', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: relObj.enabled,
        expression: "relObj.enabled"
      }],
      key: relObj.label + relObj.enabled,
      attrs: {
        "relationship": relKey,
        "label": relObj.label,
        "enabled": relObj.enabled,
        "readOnly": _vm.readOnly,
        "scope": "list"
      },
      on: {
        "change": _vm.updateRelationshipProperty
      }
    });
  }), 1)])])]) : _vm._e(), _vm.tab === 'alignments' || _vm.tab === 'general' ? _c('div', {
    staticClass: "px-4 mb-6",
    attrs: {
      "id": "resource-alignments"
    }
  }, [_c('h5', {
    staticClass: "title is-size-3"
  }, [_vm._v(" Resource Alignment Configuration ")]), _c('p', {
    staticClass: "subtitle"
  }, [_vm._v(" Alignments terms are used to map resources such as learning material, courses, and other content to competencies in CAT. If enabled, the alignment type property will show up in the framework editor when aligning competencies to resources. ")]), _c('div', {
    staticClass: "table-container box py-4 px-4",
    attrs: {
      "id": "alignment-types"
    }
  }, [_c('h4', {
    staticClass: "is-size-4 title"
  }, [_vm._v(" Alignment types ")]), _c('table', {
    staticClass: "table is-hoverable is-fullwidth"
  }, [_vm._m(45), _c('tbody', [_c('tr', [_c('th', [_vm._v(" teaches ")]), _c('td', [_vm._v(" The item being described is intended to help a person learn the competency or learning outcome defined by the referenced term. ")]), _c('td', [_c('div', {
    staticClass: "field"
  }, [_c('div', {
    staticClass: "control is-size-3"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.config.alignments.teaches,
      expression: "config.alignments.teaches"
    }],
    staticClass: "switch is-outlined",
    attrs: {
      "disabled": _vm.readOnly,
      "id": "teachesSwitch",
      "type": "checkbox",
      "name": "teachesSwitch"
    },
    domProps: {
      "checked": Array.isArray(_vm.config.alignments.teaches) ? _vm._i(_vm.config.alignments.teaches, null) > -1 : _vm.config.alignments.teaches
    },
    on: {
      "change": function change($event) {
        var $$a = _vm.config.alignments.teaches,
          $$el = $event.target,
          $$c = $$el.checked ? true : false;
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && _vm.$set(_vm.config.alignments, "teaches", $$a.concat([$$v]));
          } else {
            $$i > -1 && _vm.$set(_vm.config.alignments, "teaches", $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.$set(_vm.config.alignments, "teaches", $$c);
        }
      }
    }
  }), _c('label', {
    attrs: {
      "for": "teachesSwitch"
    }
  })])])])]), _c('tr', [_c('th', [_vm._v(" assesses ")]), _c('td', [_vm._v(" The learning resource being described may be used to assess the competency being referenced. ")]), _c('td', [_c('div', {
    staticClass: "field"
  }, [_c('div', {
    staticClass: "control is-size-3"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.config.alignments.assesses,
      expression: "config.alignments.assesses"
    }],
    staticClass: "switch is-outlined",
    attrs: {
      "disabled": _vm.readOnly,
      "id": "assessesSwitch",
      "type": "checkbox",
      "name": "assessesSwitch"
    },
    domProps: {
      "checked": Array.isArray(_vm.config.alignments.assesses) ? _vm._i(_vm.config.alignments.assesses, null) > -1 : _vm.config.alignments.assesses
    },
    on: {
      "change": function change($event) {
        var $$a = _vm.config.alignments.assesses,
          $$el = $event.target,
          $$c = $$el.checked ? true : false;
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && _vm.$set(_vm.config.alignments, "assesses", $$a.concat([$$v]));
          } else {
            $$i > -1 && _vm.$set(_vm.config.alignments, "assesses", $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.$set(_vm.config.alignments, "assesses", $$c);
        }
      }
    }
  }), _c('label', {
    attrs: {
      "for": "assessesSwitch"
    }
  })])])])]), _c('tr', [_c('th', [_vm._v(" requires ")]), _c('td', [_vm._v(" The competency being referenced is required in order for effective outcome of the learning resource being described. ")]), _c('td', [_c('div', {
    staticClass: "field"
  }, [_c('div', {
    staticClass: "control is-size-3"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.config.alignments.requires,
      expression: "config.alignments.requires"
    }],
    staticClass: "switch is-outlined",
    attrs: {
      "disabled": _vm.readOnly,
      "id": "requiresSwitch",
      "type": "checkbox",
      "name": "requiresSwitch"
    },
    domProps: {
      "checked": Array.isArray(_vm.config.alignments.requires) ? _vm._i(_vm.config.alignments.requires, null) > -1 : _vm.config.alignments.requires
    },
    on: {
      "change": function change($event) {
        var $$a = _vm.config.alignments.requires,
          $$el = $event.target,
          $$c = $$el.checked ? true : false;
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && _vm.$set(_vm.config.alignments, "requires", $$a.concat([$$v]));
          } else {
            $$i > -1 && _vm.$set(_vm.config.alignments, "requires", $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.$set(_vm.config.alignments, "requires", $$c);
        }
      }
    }
  }), _c('label', {
    attrs: {
      "for": "requiresSwitch"
    }
  })])])])]), _c('tr', [_c('th', [_vm._v(" desires ")]), _c('td', [_vm._v(" Knowledge of the learning resource being described is desired by the competency being referenced. ")]), _c('td', [_c('div', {
    staticClass: "field"
  }, [_c('div', {
    staticClass: "control is-size-3"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.config.alignments.desires,
      expression: "config.alignments.desires"
    }],
    staticClass: "switch is-outlined",
    attrs: {
      "disabled": _vm.readOnly,
      "id": "desiresSwitch",
      "type": "checkbox",
      "name": "desiresSwitch"
    },
    domProps: {
      "checked": Array.isArray(_vm.config.alignments.desires) ? _vm._i(_vm.config.alignments.desires, null) > -1 : _vm.config.alignments.desires
    },
    on: {
      "change": function change($event) {
        var $$a = _vm.config.alignments.desires,
          $$el = $event.target,
          $$c = $$el.checked ? true : false;
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && _vm.$set(_vm.config.alignments, "desires", $$a.concat([$$v]));
          } else {
            $$i > -1 && _vm.$set(_vm.config.alignments, "desires", $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.$set(_vm.config.alignments, "desires", $$c);
        }
      }
    }
  }), _c('label', {
    attrs: {
      "for": "desiresSwitch"
    }
  })])])])])])])])]) : _vm._e(), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.tab === 'taxonomy' || _vm.tab === 'general',
      expression: "tab === 'taxonomy' || tab === 'general'"
    }],
    staticClass: "px-4 mb-6",
    attrs: {
      "id": "taxonomy-properties"
    }
  }, [_c('h5', {
    staticClass: "title is-size-3"
  }, [_vm._v(" Taxonomy Configuration ")]), _vm._m(46), _c('div', {
    staticClass: "table-container box py-4 px-4"
  }, [_c('h5', {
    staticClass: "is-size-4 title"
  }, [_vm._v(" Taxonomy properties "), !_vm.readOnly ? _c('div', {
    staticClass: "button is-family-primary is-outlined is-pulled-right is-primary",
    on: {
      "click": _vm.addCustomTaxonomyProperty
    }
  }, [_vm._m(47), _c('span', [_vm._v(" add custom taxonomy property ")])]) : _vm._e()]), _c('p', {
    staticClass: "subtitle"
  }, [_vm._v(" Manage taxonomy property settings here. Change how properties are displayed and labeled in the editor. ")]), _c('table', {
    staticClass: "table is-hoverable is-fullwidth"
  }, [_vm._m(48), _c('tbody', [_c('FrameworkCompetencyPropertyListItem', {
    attrs: {
      "propertyParent": "taxonomy",
      "property": "id",
      "label": _vm.config.taxonomyIdLabel,
      "description": _vm.config.taxonomyIdDescription,
      "required": true,
      "priority": _vm.config.taxonomyIdPriorty,
      "heading": _vm.config.taxonomyIdHeading,
      "custom": false,
      "readOnly": _vm.readOnly,
      "enforceRequired": true,
      "enforceNotRequired": false,
      "enforcePrimary": false
    },
    on: {
      "change": _vm.updateFrameworkCompetencyProperty
    }
  }), _c('FrameworkCompetencyPropertyListItem', {
    attrs: {
      "propertyParent": "taxonomy",
      "property": "name",
      "label": _vm.config.taxonomyNameLabel,
      "description": _vm.config.taxonomyNameDescription,
      "required": true,
      "priority": "primary",
      "heading": _vm.config.taxonomyNameHeading,
      "custom": false,
      "readOnly": _vm.readOnly,
      "enforceRequired": true,
      "enforceNotRequired": false,
      "enforcePrimary": true
    },
    on: {
      "change": _vm.updateFrameworkCompetencyProperty
    }
  }), _c('FrameworkCompetencyPropertyListItem', {
    attrs: {
      "propertyParent": "taxonomy",
      "property": "description",
      "label": _vm.config.taxonomyDescLabel,
      "description": _vm.config.taxonomyDescDescription,
      "required": _vm.config.taxonomyDescRequired,
      "priority": _vm.config.taxonomyDescPriority,
      "heading": _vm.config.taxonomyDescHeading,
      "custom": false,
      "readOnly": _vm.readOnly,
      "enforceRequired": false,
      "enforceNotRequired": false,
      "enforcePrimary": false
    },
    on: {
      "change": _vm.updateFrameworkCompetencyProperty
    }
  }), _c('FrameworkCompetencyPropertyListItem', {
    attrs: {
      "propertyParent": "taxonomy",
      "property": "creator",
      "label": _vm.config.taxonomyCreatorLabel,
      "description": _vm.config.taxonomyCreatorDescription,
      "required": _vm.config.taxonomyCreatorRequired,
      "priority": _vm.config.taxonomyCreatorPriority,
      "heading": _vm.config.taxonomyCreatorHeading,
      "custom": false,
      "readOnly": _vm.readOnly,
      "enforceRequired": false,
      "enforceNotRequired": false,
      "enforcePrimary": false
    },
    on: {
      "change": _vm.updateFrameworkCompetencyProperty
    }
  }), _c('FrameworkCompetencyPropertyListItem', {
    attrs: {
      "propertyParent": "taxonomy",
      "property": "publisher",
      "label": _vm.config.taxonomyPublisherLabel,
      "description": _vm.config.taxonomyPublisherDescription,
      "required": _vm.config.taxonomyPublisherRequired,
      "priority": _vm.config.taxonomyPublisherPriority,
      "heading": _vm.config.taxonomyPublisherHeading,
      "custom": false,
      "readOnly": _vm.readOnly,
      "enforceRequired": false,
      "enforceNotRequired": false,
      "enforcePrimary": false
    },
    on: {
      "change": _vm.updateFrameworkCompetencyProperty
    }
  }), _c('FrameworkCompetencyPropertyListItem', {
    attrs: {
      "propertyParent": "taxonomy",
      "property": "publisherName",
      "label": _vm.config.taxonomyPubNameLabel,
      "description": _vm.config.taxonomyPubNameDescription,
      "required": _vm.config.taxonomyPubNameRequired,
      "priority": _vm.config.taxonomyPubNamePriority,
      "heading": _vm.config.taxonomyPubNameHeading,
      "custom": false,
      "readOnly": _vm.readOnly,
      "enforceRequired": false,
      "enforceNotRequired": false,
      "enforcePrimary": false
    },
    on: {
      "change": _vm.updateFrameworkCompetencyProperty
    }
  }), _c('FrameworkCompetencyPropertyListItem', {
    attrs: {
      "propertyParent": "taxonomy",
      "property": "language",
      "label": _vm.config.taxonomyLangLabel,
      "description": _vm.config.taxonomyLangDescription,
      "required": _vm.config.taxonomyLangRequired,
      "priority": _vm.config.taxonomyLangPriority,
      "heading": _vm.config.taxonomyLangHeading,
      "custom": false,
      "readOnly": _vm.readOnly,
      "enforceRequired": false,
      "enforceNotRequired": false,
      "enforcePrimary": false
    },
    on: {
      "change": _vm.updateFrameworkCompetencyProperty
    }
  }), _c('FrameworkCompetencyPropertyListItem', {
    attrs: {
      "propertyParent": "taxonomy",
      "property": "source",
      "label": _vm.config.taxonomySourceLabel,
      "description": _vm.config.taxonomySourceDescription,
      "required": _vm.config.taxonomySourceRequired,
      "priority": _vm.config.taxonomySourcePriority,
      "heading": _vm.config.taxonomySourceHeading,
      "custom": false,
      "readOnly": _vm.readOnly,
      "enforceRequired": false,
      "enforceNotRequired": false,
      "enforcePrimary": false
    },
    on: {
      "change": _vm.updateFrameworkCompetencyProperty
    }
  }), _vm._l(_vm.config.taxonomyCustomProperties, function (prop, idx) {
    return _c('FrameworkCompetencyPropertyListItem', {
      key: prop.propertyName + '_' + prop.label + '_' + prop.description + '_' + prop.required + '_' + prop.priority + '_' + prop.heading,
      attrs: {
        "propertyParent": "taxonomy",
        "property": prop.propertyName,
        "label": prop.label,
        "description": prop.description,
        "required": prop.required,
        "priority": prop.priority,
        "heading": prop.heading,
        "custom": true,
        "readOnly": _vm.readOnly,
        "enforceRequired": false,
        "enforceNotRequired": _vm.shouldEnforceNotRequired(prop.range),
        "enforcePrimary": false,
        "propertyIndex": idx
      },
      on: {
        "change": _vm.updateFrameworkCompetencyProperty,
        "manage": _vm.manageCustomFrameworkCompetencyProperty,
        "delete": _vm.deleteCustomFrameworkCompetencyProperty
      }
    });
  })], 2)])])]), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.tab === 'taxon' || _vm.tab === 'general',
      expression: "tab === 'taxon' || tab === 'general'"
    }],
    staticClass: "px-4 mb-6",
    attrs: {
      "id": "taxon-properties"
    }
  }, [_c('h5', {
    staticClass: "title is-size-3"
  }, [_vm._v(" Taxon Configuration ")]), _vm._m(49), _c('div', {
    staticClass: "table-container box py-4 px-4"
  }, [_c('h5', {
    staticClass: "is-size-4 title"
  }, [_vm._v(" Taxon properties "), !_vm.readOnly ? _c('div', {
    staticClass: "button is-family-primary is-outlined is-pulled-right is-primary",
    on: {
      "click": _vm.addCustomTaxonProperty
    }
  }, [_vm._m(50), _c('span', [_vm._v(" add custom taxon property ")])]) : _vm._e()]), _c('p', {
    staticClass: "subtitle"
  }, [_vm._v(" Manage taxon property settings here. Change how properties are displayed and labeled in the editor. ")]), _c('table', {
    staticClass: "table is-hoverable is-fullwidth"
  }, [_vm._m(51), _c('tbody', [_c('FrameworkCompetencyPropertyListItem', {
    attrs: {
      "propertyParent": "taxon",
      "property": "id",
      "label": _vm.config.taxonIdLabel,
      "description": _vm.config.taxonIdDescription,
      "required": true,
      "priority": _vm.config.taxonIdPriorty,
      "heading": _vm.config.taxonIdHeading,
      "custom": false,
      "readOnly": _vm.readOnly,
      "enforceRequired": true,
      "enforceNotRequired": false,
      "enforcePrimary": false
    },
    on: {
      "change": _vm.updateFrameworkCompetencyProperty
    }
  }), _c('FrameworkCompetencyPropertyListItem', {
    attrs: {
      "propertyParent": "taxon",
      "property": "prefLabel",
      "label": _vm.config.taxonNameLabel,
      "description": _vm.config.taxonNameDescription,
      "required": true,
      "priority": "primary",
      "heading": _vm.config.taxonNameHeading,
      "custom": false,
      "readOnly": _vm.readOnly,
      "enforceRequired": true,
      "enforceNotRequired": false,
      "enforcePrimary": true
    },
    on: {
      "change": _vm.updateFrameworkCompetencyProperty
    }
  }), _c('FrameworkCompetencyPropertyListItem', {
    attrs: {
      "propertyParent": "taxon",
      "property": "definition",
      "label": _vm.config.taxonDescLabel,
      "description": _vm.config.taxonDescDescription,
      "required": _vm.config.taxonDescRequired,
      "priority": _vm.config.taxonDescPriority,
      "heading": _vm.config.taxonDescHeading,
      "custom": false,
      "readOnly": _vm.readOnly,
      "enforceRequired": false,
      "enforceNotRequired": false,
      "enforcePrimary": false
    },
    on: {
      "change": _vm.updateFrameworkCompetencyProperty
    }
  }), _c('FrameworkCompetencyPropertyListItem', {
    attrs: {
      "propertyParent": "taxon",
      "property": "notation",
      "label": _vm.config.taxonNotationLabel,
      "description": _vm.config.taxonNotationDescription,
      "required": _vm.config.taxonNotationRequired,
      "priority": _vm.config.taxonNotationPriority,
      "heading": _vm.config.taxonNotationHeading,
      "custom": false,
      "readOnly": _vm.readOnly,
      "enforceRequired": false,
      "enforceNotRequired": false,
      "enforcePrimary": false
    },
    on: {
      "change": _vm.updateFrameworkCompetencyProperty
    }
  }), _c('FrameworkCompetencyPropertyListItem', {
    attrs: {
      "propertyParent": "taxon",
      "property": "altLabel",
      "label": _vm.config.taxonAltLabelLabel,
      "description": _vm.config.taxonAltLabelDescription,
      "required": _vm.config.taxonAltLabelRequired,
      "priority": _vm.config.taxonAltLabelPriority,
      "heading": _vm.config.taxonAltLabelHeading,
      "custom": false,
      "readOnly": _vm.readOnly,
      "enforceRequired": false,
      "enforceNotRequired": false,
      "enforcePrimary": false
    },
    on: {
      "change": _vm.updateFrameworkCompetencyProperty
    }
  }), _c('FrameworkCompetencyPropertyListItem', {
    attrs: {
      "propertyParent": "taxon",
      "property": "hiddenLabel",
      "label": _vm.config.taxonHiddenLabelLabel,
      "description": _vm.config.taxonHiddenLabelDescription,
      "required": _vm.config.taxonHiddenLabelRequired,
      "priority": _vm.config.taxonHiddenLabelPriority,
      "heading": _vm.config.taxonHiddenLabelHeading,
      "custom": false,
      "readOnly": _vm.readOnly,
      "enforceRequired": false,
      "enforceNotRequired": false,
      "enforcePrimary": false
    },
    on: {
      "change": _vm.updateFrameworkCompetencyProperty
    }
  }), _c('FrameworkCompetencyPropertyListItem', {
    attrs: {
      "propertyParent": "taxon",
      "property": "note",
      "label": _vm.config.taxonNoteLabel,
      "description": _vm.config.taxonNoteDescription,
      "required": _vm.config.taxonNoteRequired,
      "priority": _vm.config.taxonNotePriority,
      "heading": _vm.config.taxonNoteHeading,
      "custom": false,
      "readOnly": _vm.readOnly,
      "enforceRequired": false,
      "enforceNotRequired": false,
      "enforcePrimary": false
    },
    on: {
      "change": _vm.updateFrameworkCompetencyProperty
    }
  }), _c('FrameworkCompetencyPropertyListItem', {
    attrs: {
      "propertyParent": "taxon",
      "property": "broader",
      "label": _vm.config.taxonBroaderLabel,
      "description": _vm.config.taxonBroaderDescription,
      "required": false,
      "priority": _vm.config.taxonBroaderPriority,
      "heading": _vm.config.taxonBroaderHeading,
      "custom": false,
      "readOnly": _vm.readOnly,
      "enforceRequired": false,
      "enforceNotRequired": true,
      "enforcePrimary": false
    },
    on: {
      "change": _vm.updateFrameworkCompetencyProperty
    }
  }), _c('FrameworkCompetencyPropertyListItem', {
    attrs: {
      "propertyParent": "taxon",
      "property": "narrower",
      "label": _vm.config.taxonNarrowerLabel,
      "description": _vm.config.taxonNarrowerDescription,
      "required": false,
      "priority": _vm.config.taxonNarrowerPriority,
      "heading": _vm.config.taxonNarrowerHeading,
      "custom": false,
      "readOnly": _vm.readOnly,
      "enforceRequired": false,
      "enforceNotRequired": true,
      "enforcePrimary": false
    },
    on: {
      "change": _vm.updateFrameworkCompetencyProperty
    }
  }), _c('FrameworkCompetencyPropertyListItem', {
    attrs: {
      "propertyParent": "taxon",
      "property": "broadMatch",
      "label": _vm.config.taxonBroadMatchLabel,
      "description": _vm.config.taxonBroadMatchDescription,
      "required": false,
      "priority": _vm.config.taxonBroadMatchPriority,
      "heading": _vm.config.taxonBroadMatchHeading,
      "custom": false,
      "readOnly": _vm.readOnly,
      "enforceRequired": false,
      "enforceNotRequired": true,
      "enforcePrimary": false
    },
    on: {
      "change": _vm.updateFrameworkCompetencyProperty
    }
  }), _c('FrameworkCompetencyPropertyListItem', {
    attrs: {
      "propertyParent": "taxon",
      "property": "closeMatch",
      "label": _vm.config.taxonCloseMatchLabel,
      "description": _vm.config.taxonCloseMatchDescription,
      "required": false,
      "priority": _vm.config.taxonCloseMatchPriority,
      "heading": _vm.config.taxonCloseMatchHeading,
      "custom": false,
      "readOnly": _vm.readOnly,
      "enforceRequired": false,
      "enforceNotRequired": true,
      "enforcePrimary": false
    },
    on: {
      "change": _vm.updateFrameworkCompetencyProperty
    }
  }), _c('FrameworkCompetencyPropertyListItem', {
    attrs: {
      "propertyParent": "taxon",
      "property": "exactMatch",
      "label": _vm.config.taxonExactMatchLabel,
      "description": _vm.config.taxonExactMatchDescription,
      "required": false,
      "priority": _vm.config.taxonExactMatchPriority,
      "heading": _vm.config.taxonExactMatchHeading,
      "custom": false,
      "readOnly": _vm.readOnly,
      "enforceRequired": false,
      "enforceNotRequired": true,
      "enforcePrimary": false
    },
    on: {
      "change": _vm.updateFrameworkCompetencyProperty
    }
  }), _c('FrameworkCompetencyPropertyListItem', {
    attrs: {
      "propertyParent": "taxon",
      "property": "narrowMatch",
      "label": _vm.config.taxonNarrowMatchLabel,
      "description": _vm.config.taxonNarrowMatchDescription,
      "required": false,
      "priority": _vm.config.taxonNarrowMatchPriority,
      "heading": _vm.config.taxonNarrowMatchHeading,
      "custom": false,
      "readOnly": _vm.readOnly,
      "enforceRequired": false,
      "enforceNotRequired": true,
      "enforcePrimary": false
    },
    on: {
      "change": _vm.updateFrameworkCompetencyProperty
    }
  }), _c('FrameworkCompetencyPropertyListItem', {
    attrs: {
      "propertyParent": "taxon",
      "property": "related",
      "label": _vm.config.taxonRelatedLabel,
      "description": _vm.config.taxonRelatedDescription,
      "required": false,
      "priority": _vm.config.taxonRelatedPriority,
      "heading": _vm.config.taxonRelatedHeading,
      "custom": false,
      "readOnly": _vm.readOnly,
      "enforceRequired": false,
      "enforceNotRequired": true,
      "enforcePrimary": false
    },
    on: {
      "change": _vm.updateFrameworkCompetencyProperty
    }
  }), _vm._l(_vm.config.taxonCustomProperties, function (prop, idx) {
    return _c('FrameworkCompetencyPropertyListItem', {
      key: prop.propertyName + '_' + prop.label + '_' + prop.description + '_' + prop.required + '_' + prop.priority + '_' + prop.heading,
      attrs: {
        "propertyParent": "taxon",
        "property": prop.propertyName,
        "label": prop.label,
        "description": prop.description,
        "required": prop.required,
        "priority": prop.priority,
        "heading": prop.heading,
        "custom": true,
        "readOnly": _vm.readOnly,
        "enforceRequired": false,
        "enforceNotRequired": _vm.shouldEnforceNotRequired(prop.range),
        "enforcePrimary": false,
        "propertyIndex": idx
      },
      on: {
        "change": _vm.updateFrameworkCompetencyProperty,
        "manage": _vm.manageCustomFrameworkCompetencyProperty,
        "delete": _vm.deleteCustomFrameworkCompetencyProperty
      }
    });
  })], 2)])])]), _vm.tab === 'users' || _vm.tab === 'general' ? _c('div', {
    staticClass: "px-4"
  }, [_c('h3', {
    staticClass: "is-size-3 title"
  }, [_vm._v(" User Configuration ")]), _c('p', {
    staticClass: "subtitle"
  }, [_vm._v(" Manage the default owners, and readers of frameworks you author and import. ")]), _c('div', {
    staticClass: "section box py-4 px-4",
    attrs: {
      "id": "default-owners"
    }
  }, [_c('h5', {
    staticClass: "title is-size-4"
  }, [_vm._v(" Default Owners ")]), _c('p', {
    staticClass: "subtitle"
  }, [_vm._v(" Owners can edit, delete, comment, as well as manage access on frameworks. ")]), _vm.localDefaultOwners.length > 0 ? _c('div', {
    staticClass: "table-container"
  }, [_c('table', {
    staticClass: "table is-hoverable is-fullwidth"
  }, [_vm._m(52), _c('tbody', _vm._l(_vm.localDefaultOwners, function (pk) {
    return _c('tr', {
      key: pk
    }, [_c('th', {
      staticClass: "control"
    }, [_c('p', [_vm._v(_vm._s(_vm.getPermissionEntityName(pk)))])]), _c('td', [_c('p', [_vm._v(_vm._s(_vm.getPermissionEntityEmail(pk)))])]), _c('td', [_vm.getPermissionEntityType(pk).equalsIgnoreCase('person') ? _c('i', {
      staticClass: "fa fa-user",
      attrs: {
        "title": "user"
      }
    }) : _vm._e(), _vm.getPermissionEntityType(pk).equalsIgnoreCase('group') ? _c('i', {
      staticClass: "fa fa-users",
      attrs: {
        "title": "group"
      }
    }) : _vm._e()])]);
  }), 0)])]) : _c('div', {
    staticClass: "has-text-right has-text-small"
  }, [_vm._v(" No default owners added. ")]), _c('div', {
    staticClass: "buttons is-right"
  }, [!_vm.readOnly ? _c('div', {
    staticClass: "button is-outlined is-primary",
    on: {
      "click": function click($event) {
        return _vm.openSelectPermissionEntitiesModal('owner');
      }
    }
  }, [_vm._m(53), _c('span', [_vm._v("manage default owners")])]) : _vm._e()])]), _c('div', {
    staticClass: "section box py-4 px-4",
    attrs: {
      "id": "default-readers"
    }
  }, [_c('div', {
    staticClass: "container"
  }, [_c('h5', {
    staticClass: "title is-size-4"
  }, [_vm._v(" Default Readers ")]), _c('p', {
    staticClass: "subtitle"
  }, [_vm._v(" Readers can read and comment on frameworks. ")]), _vm.localDefaultReaders.length > 0 ? _c('div', {
    staticClass: "table-container"
  }, [_c('table', {
    staticClass: "table is-hoverable is-fullwidth"
  }, [_vm._m(54), _c('tbody', _vm._l(_vm.localDefaultReaders, function (pk) {
    return _c('tr', {
      key: pk
    }, [_c('th', {
      staticClass: "control"
    }, [_c('p', [_vm._v(_vm._s(_vm.getPermissionEntityName(pk)))])]), _c('td', [_c('p', [_vm._v(_vm._s(_vm.getPermissionEntityEmail(pk)))])]), _c('td', [_vm.getPermissionEntityType(pk).equalsIgnoreCase('person') ? _c('i', {
      staticClass: "fa fa-user",
      attrs: {
        "title": "user"
      }
    }) : _vm._e(), _vm.getPermissionEntityType(pk).equalsIgnoreCase('group') ? _c('i', {
      staticClass: "fa fa-users",
      attrs: {
        "title": "group"
      }
    }) : _vm._e()])]);
  }), 0)])]) : _c('div', {
    staticClass: "has-text-right has-text-small"
  }, [_vm._v(" No default readers added. ")]), _c('div', {
    staticClass: "buttons is-right"
  }, [!_vm.readOnly ? _c('div', {
    staticClass: "button is-outlined is-primary",
    on: {
      "click": function click($event) {
        return _vm.openSelectPermissionEntitiesModal('reader');
      }
    }
  }, [_vm._m(55), _c('span', [_vm._v("manage default readers")])]) : _vm._e()])])]), _vm.showDefaultCommenters ? _c('div', {
    staticClass: "section",
    attrs: {
      "id": "default-commenters"
    }
  }, [_c('h5', {
    staticClass: "header is-size-3"
  }, [_vm._v(" Default Commenters ")]), _c('p', {
    staticClass: "description"
  }, [_vm._v(" Commenters can read and comment on frameworks. ")]), _vm.localDefaultCommenters.length > 0 ? _c('div', {
    staticClass: "table-container"
  }, [_c('table', {
    staticClass: "table is-hoverable is-fullwidth"
  }, [_vm._m(56), _c('tbody', _vm._l(_vm.localDefaultCommenters, function (pk) {
    return _c('tr', {
      key: pk
    }, [_c('th', {
      staticClass: "control"
    }, [_c('p', [_vm._v(_vm._s(_vm.getPermissionEntityName(pk)))])]), _c('td', [_c('p', [_vm._v(_vm._s(_vm.getPermissionEntityEmail(pk)))])]), _c('td', [_vm.getPermissionEntityType(pk).equalsIgnoreCase('person') ? _c('i', {
      staticClass: "fa fa-user",
      attrs: {
        "title": "user"
      }
    }) : _vm._e(), _vm.getPermissionEntityType(pk).equalsIgnoreCase('group') ? _c('i', {
      staticClass: "fa fa-users",
      attrs: {
        "title": "group"
      }
    }) : _vm._e()])]);
  }), 0)])]) : _c('div', {
    staticClass: "has-text-right has-text-small"
  }, [_vm._v(" No default commenters added. ")]), _c('div', {
    staticClass: "buttons is-right"
  }, [!_vm.readOnly ? _c('div', {
    staticClass: "button is-outlined is-primary",
    on: {
      "click": function click($event) {
        return _vm.openSelectPermissionEntitiesModal('commenter');
      }
    }
  }, [_vm._m(57), _c('span', [_vm._v("manage default commenters")])]) : _vm._e()])]) : _vm._e()]) : _vm._e(), _c('div', {
    staticClass: "section",
    attrs: {
      "id": "config-invalid"
    }
  }, [_vm.configInvalid ? _c('div', {
    staticClass: "has-text-danger"
  }, [_c('p', [_vm._v(" Configuration is invalid: ")]), _vm.configNameInvalid ? _c('p', [_vm._v(" *Configuration name is required ")]) : _vm._e(), _vm.configDescriptionInvalid ? _c('p', [_vm._v(" *Configuration description is required ")]) : _vm._e(), _vm.configEnforcedTypesInvalid ? _c('p', [_vm._v(" *Enforced types must have a display label and field value ")]) : _vm._e(), _vm.configRelationshipsInvalid ? _c('p', [_vm._v(" *Enabled relationships must have a display label ")]) : _vm._e(), _vm.configFrameworkIdLabelInvalid ? _c('p', [_vm._v(" *Framework ID display label is required ")]) : _vm._e(), _vm.configFrameworkIdDescriptionInvalid ? _c('p', [_vm._v(" *Framework ID description is required ")]) : _vm._e(), _vm.configFrameworkNameLabelInvalid ? _c('p', [_vm._v(" *Framework Name display label is required ")]) : _vm._e(), _vm.configFrameworkNameDescriptionInvalid ? _c('p', [_vm._v(" *Framework Name description is required ")]) : _vm._e(), _vm.configFrameworkDescLabelInvalid ? _c('p', [_vm._v(" *Framework Description display label is required ")]) : _vm._e(), _vm.configFrameworkDescDescriptionInvalid ? _c('p', [_vm._v(" *Framework Description description is required ")]) : _vm._e(), _vm.configCompetencyIdLabelInvalid ? _c('p', [_vm._v(" *Competency ID display label required ")]) : _vm._e(), _vm.configCompetencyIdDescriptionInvalid ? _c('p', [_vm._v(" *Competency ID description is required ")]) : _vm._e(), _vm.configCompetencyNameLabelInvalid ? _c('p', [_vm._v(" *Competency Name display label is required ")]) : _vm._e(), _vm.configCompetencyNameDescriptionInvalid ? _c('p', [_vm._v(" *Competency Name description is required ")]) : _vm._e(), _vm.configCompetencyDescLabelInvalid ? _c('p', [_vm._v(" *Competency Description display label is required ")]) : _vm._e(), _vm.configCompetencyDescDescriptionInvalid ? _c('p', [_vm._v(" *Competency Description description is required ")]) : _vm._e(), _vm.configCompetencyTypeLabelInvalid ? _c('p', [_vm._v(" *Competency Type display label is required ")]) : _vm._e(), _vm.configCompetencyTypeDescriptionInvalid ? _c('p', [_vm._v(" *Competency Type description is required ")]) : _vm._e()]) : _vm._e()])])])], 1);
};
var ConfigurationDetailsvue_type_template_id_239cc231_scoped_true_staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "panel-icon"
  }, [_c('i', {
    staticClass: "fas fa-list-alt",
    attrs: {
      "aria-hidden": "true"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "panel-icon"
  }, [_c('i', {
    staticClass: "fas fa-list-alt",
    attrs: {
      "aria-hidden": "true"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "panel-icon"
  }, [_c('i', {
    staticClass: "fas fa-circle",
    attrs: {
      "aria-hidden": "true"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "panel-icon"
  }, [_c('i', {
    staticClass: "fas fa-list-alt",
    attrs: {
      "aria-hidden": "true"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "panel-icon"
  }, [_c('i', {
    staticClass: "fas fa-circle",
    attrs: {
      "aria-hidden": "true"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "panel-icon"
  }, [_c('i', {
    staticClass: "fas fa-circle",
    attrs: {
      "aria-hidden": "true"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "panel-icon"
  }, [_c('i', {
    staticClass: "fas fa-circle",
    attrs: {
      "aria-hidden": "true"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "panel-icon"
  }, [_c('i', {
    staticClass: "fas fa-network-wired",
    attrs: {
      "aria-hidden": "true"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "panel-icon"
  }, [_c('i', {
    staticClass: "fas fa-circle",
    attrs: {
      "aria-hidden": "true"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "panel-icon"
  }, [_c('i', {
    staticClass: "fas fa-circle",
    attrs: {
      "aria-hidden": "true"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "panel-icon"
  }, [_c('i', {
    staticClass: "fas fa-circle",
    attrs: {
      "aria-hidden": "true"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "panel-icon"
  }, [_c('i', {
    staticClass: "fas fa-book",
    attrs: {
      "aria-hidden": "true"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "panel-icon"
  }, [_c('i', {
    staticClass: "fas fa-circle",
    attrs: {
      "aria-hidden": "true"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "panel-icon"
  }, [_c('i', {
    staticClass: "fas fa-list-alt",
    attrs: {
      "aria-hidden": "true"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "panel-icon"
  }, [_c('i', {
    staticClass: "fas fa-circle",
    attrs: {
      "aria-hidden": "true"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "panel-icon"
  }, [_c('i', {
    staticClass: "fas fa-list-alt",
    attrs: {
      "aria-hidden": "true"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "panel-icon"
  }, [_c('i', {
    staticClass: "fas fa-circle",
    attrs: {
      "aria-hidden": "true"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "panel-icon"
  }, [_c('i', {
    staticClass: "fas fa-users",
    attrs: {
      "aria-hidden": "true"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "panel-icon"
  }, [_c('i', {
    staticClass: "fas fa-list-alt",
    attrs: {
      "aria-hidden": "true"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "panel-icon"
  }, [_c('i', {
    staticClass: "fas fa-list-alt",
    attrs: {
      "aria-hidden": "true"
    }
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
  return _c('p', {
    staticClass: "subtitle"
  }, [_vm._v(" Framework properties are the values that can be added, edited, and deleted for framework objects. Minimum framework properties are "), _c('b', [_vm._v("id")]), _vm._v(", "), _c('b', [_vm._v("name")]), _vm._v(", and "), _c('b', [_vm._v("description")]), _vm._v(". Properties added here will be displayed in the framework object at the top of the framework editor view. ")]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-plus"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('thead', [_c('tr', [_c('th', [_c('abbr', {
    attrs: {
      "title": "unique property ID"
    }
  }, [_vm._v("property")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "label to be displayed in form inputs"
    }
  }, [_vm._v("display label")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "description of this property"
    }
  }, [_vm._v("description")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "category (if any) under which the field is displayed in form inputs"
    }
  }, [_vm._v("display category")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "required"
    }
  }, [_vm._v("required")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "priority in which the field is displayed in form inputs"
    }
  }, [_vm._v("display priority")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "manage"
    }
  }), _c('i', {
    staticClass: "fa fa-cog"
  })]), _c('th', [_c('abbr', {
    attrs: {
      "title": "delete"
    }
  }), _c('i', {
    staticClass: "fa fa-trash"
  })])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('p', {
    staticClass: "subtitle"
  }, [_vm._v(" Competency properties are the values that can be added, edited, and deleted for competency objects. Default competency properties are "), _c('b', [_vm._v("id")]), _vm._v(", "), _c('b', [_vm._v("name")]), _vm._v(", "), _c('b', [_vm._v("description")]), _vm._v(", and "), _c('b', [_vm._v("type")]), _vm._v(". Properties added here will be available when editing competency level objects in the framework editor. ")]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-plus"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('thead', [_c('tr', [_c('th', [_c('abbr', {
    attrs: {
      "title": "unique property ID"
    }
  }, [_vm._v("property")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "label to be displayed in form inputs"
    }
  }, [_vm._v("display label")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "description of the property"
    }
  }, [_vm._v("description")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "category (if any) under which the field is displayed in form inputs"
    }
  }, [_vm._v("display category")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "required"
    }
  }, [_vm._v("required")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "priority in which the field is displayed in form inputs"
    }
  }, [_vm._v("display priority")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "manage"
    }
  }, [_c('i', {
    staticClass: "fa fa-cog"
  })])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "delete"
    }
  }, [_c('i', {
    staticClass: "fa fa-trash"
  })])])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "column"
  }, [_c('h5', {
    staticClass: "is-size-3 title"
  }, [_vm._v(" Restrict competency types ")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-plus"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('thead', [_c('tr', [_c('th', [_vm._v(" display label ")]), _c('th', [_vm._v(" field value ")]), _c('th', [_c('i', {
    staticClass: "fa fa-trash"
  })])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-trash"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "column"
  }, [_c('h5', {
    staticClass: "is-size-3 title"
  }, [_vm._v(" Allow Levels ")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "column is-12"
  }, [_c('p', {
    staticClass: "description"
  }, [_vm._v(" Levels can provide an additional context to define and categorize competencies within frameworks. Levels can include text strings such as \"beginner\", \"intermediate\", \"advanced\", or any other text string. ")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "field-label"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" Display label ")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "field-label"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" Description ")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "field-label"
  }, [_c('label', {
    staticClass: "label",
    attrs: {
      "title": "category (if any) under which levels are displayed in form inputs"
    }
  }, [_vm._v(" Display category ")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "field-label"
  }, [_c('label', {
    staticClass: "label",
    attrs: {
      "title": "priority in which levels are displayed in form inputs"
    }
  }, [_vm._v("level display priority: ")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "field-label"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" Restrict Level Values ")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-cog"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('thead', [_c('tr', [_c('th', [_vm._v(" name ")]), _c('th', [_vm._v(" description ")])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "field-label"
  }, [_c('label', {
    staticClass: "label",
    attrs: {
      "title": "category (if any) under which relationships are displayed in form inputs"
    }
  }, [_vm._v(" Display category ")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "field-label"
  }, [_c('label', {
    staticClass: "label",
    attrs: {
      "title": "priority in which relationships are displayed in form inputs"
    }
  }, [_vm._v(" relationships display priority ")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-cog"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('thead', [_c('tr', [_c('th', [_c('abbr', {
    attrs: {
      "title": "unique relationship ID"
    }
  }, [_vm._v(" relationship")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "label displayed on form inputs"
    }
  }, [_vm._v(" display label")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "if enabled shows up in property options"
    }
  }, [_vm._v(" enabled")])])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('thead', [_c('tr', [_c('th', [_c('abbr', {
    attrs: {
      "title": "unique alignment ID"
    }
  }, [_vm._v(" alignment")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "description of the relationship"
    }
  }, [_vm._v(" description")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "if enabled will appear as an option in the framework editor"
    }
  }, [_vm._v(" enabled")])])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('p', {
    staticClass: "subtitle"
  }, [_vm._v(" Taxonomy properties are the values that can be added, edited, and deleted for taxonomy objects. Minimum taxonomy properties are "), _c('b', [_vm._v("id")]), _vm._v(", "), _c('b', [_vm._v("title")]), _vm._v(", and "), _c('b', [_vm._v("description")]), _vm._v(". Properties added here will be displayed in the taxonomy object at the top of the taxonomy editor view. ")]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-plus"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('thead', [_c('tr', [_c('th', [_c('abbr', {
    attrs: {
      "title": "unique property ID"
    }
  }, [_vm._v("property")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "label to be displayed in form inputs"
    }
  }, [_vm._v("display label")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "description of this property"
    }
  }, [_vm._v("description")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "category (if any) under which the field is displayed in form inputs"
    }
  }, [_vm._v("display category")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "required"
    }
  }, [_vm._v("required")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "priority in which the field is displayed in form inputs"
    }
  }, [_vm._v("display priority")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "manage"
    }
  }), _c('i', {
    staticClass: "fa fa-cog"
  })]), _c('th', [_c('abbr', {
    attrs: {
      "title": "delete"
    }
  }), _c('i', {
    staticClass: "fa fa-trash"
  })])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('p', {
    staticClass: "subtitle"
  }, [_vm._v(" Taxon properties are the values that can be added, edited, and deleted for taxon objects. Minimum taxon properties are "), _c('b', [_vm._v("id")]), _vm._v(", "), _c('b', [_vm._v("preferred label")]), _vm._v(", and "), _c('b', [_vm._v("definition")]), _vm._v(". Properties added here will be displayed in the taxonomy object at the top of the taxonomy editor view. ")]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-plus"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('thead', [_c('tr', [_c('th', [_c('abbr', {
    attrs: {
      "title": "unique property ID"
    }
  }, [_vm._v("property")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "label to be displayed in form inputs"
    }
  }, [_vm._v("display label")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "description of this property"
    }
  }, [_vm._v("description")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "category (if any) under which the field is displayed in form inputs"
    }
  }, [_vm._v("display category")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "required"
    }
  }, [_vm._v("required")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "priority in which the field is displayed in form inputs"
    }
  }, [_vm._v("display priority")])]), _c('th', [_c('abbr', {
    attrs: {
      "title": "manage"
    }
  }), _c('i', {
    staticClass: "fa fa-cog"
  })]), _c('th', [_c('abbr', {
    attrs: {
      "title": "delete"
    }
  }), _c('i', {
    staticClass: "fa fa-trash"
  })])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('thead', [_c('tr', [_c('th', [_vm._v(" name ")]), _c('th', [_vm._v(" email ")]), _c('th', [_vm._v(" type ")])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-cog"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('thead', [_c('tr', [_c('th', [_vm._v(" name ")]), _c('th', [_vm._v(" email ")]), _c('th', [_vm._v(" type ")])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-cog"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('thead', [_c('tr', [_c('th', [_vm._v(" name ")]), _c('th', [_vm._v(" email ")]), _c('th', [_vm._v(" type ")])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-cog"
  })]);
}];

// CONCATENATED MODULE: ./src/components/configuration/ConfigurationDetails.vue?vue&type=template&id=239cc231&scoped=true

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__("2909");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__("caad");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.sort.js
var es_array_sort = __webpack_require__("4e82");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__("a434");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.set.js
var es_set = __webpack_require__("6062");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.ends-with.js
var es_string_ends_with = __webpack_require__("8a79");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__("2532");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__("3ca3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__("5319");

// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.set.difference.v2.js
var esnext_set_difference_v2 = __webpack_require__("88e6");

// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.set.intersection.v2.js
var esnext_set_intersection_v2 = __webpack_require__("70cc");

// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.set.is-disjoint-from.v2.js
var esnext_set_is_disjoint_from_v2 = __webpack_require__("eb03");

// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.set.is-subset-of.v2.js
var esnext_set_is_subset_of_v2 = __webpack_require__("22e5");

// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.set.is-superset-of.v2.js
var esnext_set_is_superset_of_v2 = __webpack_require__("c01e");

// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.set.symmetric-difference.v2.js
var esnext_set_symmetric_difference_v2 = __webpack_require__("fa76");

// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.set.union.v2.js
var esnext_set_union_v2 = __webpack_require__("8306");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("159b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"01d4e028-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/configuration/FrameworkCompetencyPropertyListItem.vue?vue&type=template&id=4f4d7af6





var FrameworkCompetencyPropertyListItemvue_type_template_id_4f4d7af6_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('tr', [_c('th', [_vm._v(" " + _vm._s(_vm.property) + " ")]), _c('td', [_vm.readOnly ? _c('div', [_vm._v(" " + _vm._s(_vm.localLabel) + " ")]) : _vm._e(), !_vm.readOnly ? _c('div', {
    staticClass: "field"
  }, [_c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.localLabel,
      expression: "localLabel"
    }],
    staticClass: "input is-small",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm.localLabel
    },
    on: {
      "change": _vm.changeLabel,
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.localLabel = $event.target.value;
      }
    }
  })])]) : _vm._e()]), _c('td', [_vm.readOnly ? _c('div', [_vm._v(" " + _vm._s(_vm.localDescription) + " ")]) : _vm._e(), !_vm.readOnly ? _c('div', {
    staticClass: "field"
  }, [_c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.localDescription,
      expression: "localDescription"
    }],
    staticClass: "input is-small",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm.localDescription
    },
    on: {
      "change": _vm.changeDescription,
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.localDescription = $event.target.value;
      }
    }
  })])]) : _vm._e()]), _c('td', [_vm.readOnly ? _c('div', [_vm._v(" " + _vm._s(_vm.localHeading) + " ")]) : _vm._e(), !_vm.readOnly ? _c('div', {
    staticClass: "field"
  }, [_c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.localHeading,
      expression: "localHeading"
    }],
    staticClass: "input is-small",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm.localHeading
    },
    on: {
      "change": _vm.changeHeading,
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.localHeading = $event.target.value;
      }
    }
  })])]) : _vm._e()]), _c('td', {
    staticClass: "is-narrow"
  }, [_c('div', {
    staticClass: "field"
  }, [_c('div', {
    staticClass: "control is-size-3"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.localRequired,
      expression: "localRequired"
    }],
    staticClass: "switch is-outlined",
    attrs: {
      "disabled": _vm.readOnly || _vm.enforceRequired || _vm.enforceNotRequired,
      "id": _vm.property + _vm.propertyParent,
      "type": "checkbox",
      "name": _vm.property + _vm.propertyParent
    },
    domProps: {
      "checked": Array.isArray(_vm.localRequired) ? _vm._i(_vm.localRequired, null) > -1 : _vm.localRequired
    },
    on: {
      "change": [function ($event) {
        var $$a = _vm.localRequired,
          $$el = $event.target,
          $$c = $$el.checked ? true : false;
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.localRequired = $$a.concat([$$v]));
          } else {
            $$i > -1 && (_vm.localRequired = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.localRequired = $$c;
        }
      }, _vm.changeRequired]
    }
  }), _c('label', {
    attrs: {
      "for": _vm.property + _vm.propertyParent
    }
  })])])]), _c('td', [_vm.readOnly || _vm.enforcePrimary ? _c('div', [_vm._v(" " + _vm._s(_vm.localPriority) + " ")]) : _vm._e(), !_vm.readOnly && !_vm.enforcePrimary ? _c('div', {
    staticClass: "select is-small"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.localPriority,
      expression: "localPriority"
    }],
    on: {
      "change": [function ($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.localPriority = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
      }, _vm.changePriority]
    }
  }, [_c('option', {
    attrs: {
      "value": "primary"
    }
  }, [_vm._v(" primary ")]), _c('option', {
    attrs: {
      "value": "secondary"
    }
  }, [_vm._v(" secondary ")]), _c('option', {
    attrs: {
      "value": "tertiary"
    }
  }, [_vm._v(" tertiary ")])])]) : _vm._e()]), _c('td', [_vm.custom && _vm.readOnly ? _c('div', [_c('div', {
    staticClass: "button",
    on: {
      "click": function click($event) {
        return _vm.$emit('manage', _vm.propertyParent, _vm.propertyIndex);
      }
    }
  }, [_vm._m(0)])]) : _vm._e(), _vm.custom && !_vm.readOnly ? _c('div', [_c('div', {
    staticClass: "button is-small is-outlined is-primary",
    on: {
      "click": function click($event) {
        return _vm.$emit('manage', _vm.propertyParent, _vm.propertyIndex);
      }
    }
  }, [_vm._m(1)])]) : _vm._e()]), _c('td', [_vm.custom && !_vm.readOnly ? _c('div', [_c('div', {
    staticClass: "button is-small is-outlined is-danger",
    on: {
      "click": function click($event) {
        return _vm.$emit('delete', _vm.propertyParent, _vm.propertyIndex);
      }
    }
  }, [_vm._m(2)])]) : _vm._e()])]);
};
var FrameworkCompetencyPropertyListItemvue_type_template_id_4f4d7af6_staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-cog"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-cog"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-trash"
  })]);
}];

// CONCATENATED MODULE: ./src/components/configuration/FrameworkCompetencyPropertyListItem.vue?vue&type=template&id=4f4d7af6

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/configuration/FrameworkCompetencyPropertyListItem.vue?vue&type=script&lang=js



/* harmony default export */ var FrameworkCompetencyPropertyListItemvue_type_script_lang_js = ({
  name: 'FrameworkCompetencyPropertyListItem',
  props: {
    propertyParent: {
      type: String,
      default: ''
    },
    property: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    priority: {
      type: String,
      default: ''
    },
    heading: {
      type: String,
      default: ''
    },
    custom: {
      type: Boolean,
      default: false
    },
    readOnly: {
      type: Boolean,
      default: true
    },
    enforceRequired: {
      type: Boolean,
      default: true
    },
    enforceNotRequired: {
      type: Boolean,
      default: false
    },
    enforcePrimary: {
      type: Boolean,
      default: true
    },
    propertyIndex: {
      type: Number
    }
  },
  data: function data() {
    return {
      localLabel: '',
      localDescription: '',
      localRequired: false,
      localPriority: '',
      localHeading: ''
    };
  },
  watch: {
    'propertyParent': function propertyParent() {
      this.init();
    },
    'property': function property() {
      this.init();
    }
  },
  methods: {
    changeLabel: function changeLabel(evt) {
      this.$emit('change', this.propertyParent, this.property, 'label', evt.srcElement.value);
    },
    changeDescription: function changeDescription(evt) {
      this.$emit('change', this.propertyParent, this.property, 'description', evt.srcElement.value);
    },
    changeRequired: function changeRequired(evt) {
      var retVal = evt.target.checked;
      this.$emit('change', this.propertyParent, this.property, 'required', retVal);
    },
    changePriority: function changePriority(evt) {
      this.$emit('change', this.propertyParent, this.property, 'priority', evt.srcElement.value);
    },
    changeHeading: function changeHeading(evt) {
      this.$emit('change', this.propertyParent, this.property, 'heading', evt.srcElement.value);
    },
    init: function init() {
      this.localLabel = this.label;
      this.localDescription = this.description;
      this.localRequired = this.required;
      this.localPriority = this.priority;
      this.localHeading = this.heading;
    }
  },
  mounted: function mounted() {
    this.init();
  }
});
// CONCATENATED MODULE: ./src/components/configuration/FrameworkCompetencyPropertyListItem.vue?vue&type=script&lang=js
 /* harmony default export */ var configuration_FrameworkCompetencyPropertyListItemvue_type_script_lang_js = (FrameworkCompetencyPropertyListItemvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/configuration/FrameworkCompetencyPropertyListItem.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  configuration_FrameworkCompetencyPropertyListItemvue_type_script_lang_js,
  FrameworkCompetencyPropertyListItemvue_type_template_id_4f4d7af6_render,
  FrameworkCompetencyPropertyListItemvue_type_template_id_4f4d7af6_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FrameworkCompetencyPropertyListItem = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"01d4e028-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/configuration/RelationshipListItem.vue?vue&type=template&id=06379fb2&scoped=true


var RelationshipListItemvue_type_template_id_06379fb2_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('tr', [_c('th', [_vm._v(" " + _vm._s(_vm.relationship) + " ")]), _c('td', [_vm.readOnly ? _c('div', [_vm._v(" " + _vm._s(_vm.localLabel) + " ")]) : _vm._e(), !_vm.readOnly ? _c('div', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.localLabel,
      expression: "localLabel"
    }],
    staticClass: "input is-small",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm.localLabel
    },
    on: {
      "change": _vm.changeLabel,
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.localLabel = $event.target.value;
      }
    }
  })]) : _vm._e()]), _c('td', [_c('div', {
    staticClass: "field"
  }, [_c('div', {
    staticClass: "control is-size-3"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.localEnabled,
      expression: "localEnabled"
    }],
    staticClass: "switch is-outlined",
    attrs: {
      "disabled": _vm.readOnly,
      "id": _vm.relationship + _vm.scope,
      "type": "checkbox",
      "name": _vm.relationship + _vm.scope
    },
    domProps: {
      "checked": Array.isArray(_vm.localEnabled) ? _vm._i(_vm.localEnabled, null) > -1 : _vm.localEnabled
    },
    on: {
      "change": [function ($event) {
        var $$a = _vm.localEnabled,
          $$el = $event.target,
          $$c = $$el.checked ? true : false;
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.localEnabled = $$a.concat([$$v]));
          } else {
            $$i > -1 && (_vm.localEnabled = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.localEnabled = $$c;
        }
      }, _vm.changeEnabled]
    }
  }), _c('label', {
    attrs: {
      "for": _vm.relationship + _vm.scope
    }
  })])])])]);
};
var RelationshipListItemvue_type_template_id_06379fb2_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/configuration/RelationshipListItem.vue?vue&type=template&id=06379fb2&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/configuration/RelationshipListItem.vue?vue&type=script&lang=js
/* harmony default export */ var RelationshipListItemvue_type_script_lang_js = ({
  name: 'RelationshipListItem',
  props: {
    relationship: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    scope: {
      type: String,
      default: ''
    },
    enabled: {
      type: Boolean,
      default: true
    },
    readOnly: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      localLabel: this.label,
      localEnabled: this.enabled
    };
  },
  methods: {
    changeLabel: function changeLabel(evt) {
      this.$emit('change', this.relationship, 'label', evt.srcElement.value);
    },
    changeEnabled: function changeEnabled(evt) {
      // let retVal = false;
      // if (evt.srcElement.value.equals('true')) retVal = true;
      var retVal = evt.target.checked;
      appLog("evt", evt);
      this.$emit('change', this.relationship, 'enabled', retVal);
    }
  },
  watch: {
    enabled: function enabled() {
      // If parent component changes this, update it in modal too
      this.localEnabled = this.enabled;
    }
  }
});
// CONCATENATED MODULE: ./src/components/configuration/RelationshipListItem.vue?vue&type=script&lang=js
 /* harmony default export */ var configuration_RelationshipListItemvue_type_script_lang_js = (RelationshipListItemvue_type_script_lang_js); 
// CONCATENATED MODULE: ./src/components/configuration/RelationshipListItem.vue





/* normalize component */

var RelationshipListItem_component = Object(componentNormalizer["a" /* default */])(
  configuration_RelationshipListItemvue_type_script_lang_js,
  RelationshipListItemvue_type_template_id_06379fb2_scoped_true_render,
  RelationshipListItemvue_type_template_id_06379fb2_scoped_true_staticRenderFns,
  false,
  null,
  "06379fb2",
  null
  
)

/* harmony default export */ var RelationshipListItem = (RelationshipListItem_component.exports);
// EXTERNAL MODULE: ./src/components/modalContent/ModalTemplate.vue + 4 modules
var ModalTemplate = __webpack_require__("af07");

// EXTERNAL MODULE: ./src/mixins/cassUtil.js
var cassUtil = __webpack_require__("6d79");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/configuration/ConfigurationDetails.vue?vue&type=script&lang=js







































/* harmony default export */ var ConfigurationDetailsvue_type_script_lang_js = ({
  mixins: [cassUtil["a" /* cassUtil */]],
  name: 'ConfigurationDetails',
  props: {
    config: {
      type: Object
    },
    readOnly: {
      type: Boolean,
      default: true
    },
    defaultConfigId: {
      type: String,
      default: null
    }
  },
  data: function data() {
    return {
      scrollOptions: {
        container: '#configuration',
        easing: 'linear',
        duration: 300,
        offset: 40
      },
      panelClass: 'panel',
      defaultBrowserConfigId: '',
      showDefaultCommenters: false,
      customPropertyValuesLimited: false,
      customPropertyTypesLimited: false,
      customPropertyConceptsLimited: false,
      showManageRelationshipsModal: false,
      tab: 'general',
      configDetailsBusy: false,
      configInvalid: false,
      configNameInvalid: false,
      configDescriptionInvalid: false,
      configEnforcedTypesInvalid: false,
      configRelationshipsInvalid: false,
      configFrameworkIdLabelInvalid: false,
      configFrameworkIdDescriptionInvalid: false,
      configFrameworkNameLabelInvalid: false,
      configFrameworkNameDescriptionInvalid: false,
      configFrameworkDescLabelInvalid: false,
      configFrameworkDescDescriptionInvalid: false,
      configFrameworkClassLabelInvalid: false,
      configFrameworkClassDescriptionInvalid: false,
      configFrameworkMarkingsLabelInvalid: false,
      configFrameworkMarkingsDescriptionInvalid: false,
      configCompetencyIdLabelInvalid: false,
      configCompetencyIdDescriptionInvalid: false,
      configCompetencyNameLabelInvalid: false,
      configCompetencyNameDescriptionInvalid: false,
      configCompetencyDescLabelInvalid: false,
      configCompetencyDescDescriptionInvalid: false,
      configCompetencyTypeLabelInvalid: false,
      configCompetencyTypeDescriptionInvalid: false,
      configCompetencyClassLabelInvalid: false,
      configCompetencyClassDescriptionInvalid: false,
      configCompetencyMarkingsLabelInvalid: false,
      configCompetencyMarkingsDescriptionInvalid: false,
      showCustomPropertyDetailsModal: false,
      customPropertyModalTitle: '',
      customPropertyParent: '',
      customPropertyIsNew: true,
      customPropertyContext: '',
      customPropertyPropertyName: '',
      customPropertyRange: '',
      customPropertyDescription: '',
      customPropertyLabel: '',
      customPropertyPriority: '',
      customPropertyRequired: false,
      customPropertyHeading: '',
      customPropertyAllowMultiples: false,
      customPropertyOnePerLanguage: true,
      customPropertyPermittedValues: [],
      customPropertyPermittedTypes: [],
      customPropertyPermittedConcepts: [],
      customPropertyInvalid: false,
      customPropertyPropertyNameExists: false,
      customPropertyPropertyNameInvalid: false,
      customPropertyLabelInvalid: false,
      customPropertyDescriptionInvalid: false,
      levelSelectionModalTitle: '',
      showAddNewLevelSection: false,
      newLevelName: '',
      newLevelDescription: '',
      savingLevelBusy: false,
      showSelectLevelModal: false,
      selectedLevelFilter: '',
      selectedLevels: [],
      levelList: [],
      personList: [],
      groupList: [],
      showSelectPermissionEntitiesModal: false,
      permissionEntityList: [],
      selectedPermissionEntities: [],
      permissionEntitiesFilter: '',
      permissionEntitySelectionMode: '',
      permissionEntitySelectionTitle: '',
      levelInvalid: false,
      levelNameInvalid: false,
      localEnforcedLevelValues: this.config.enforcedLevelValues,
      localDefaultOwners: this.config.defaultOwners,
      localDefaultReaders: this.config.defaultReaders,
      localDefaultCommenters: this.config.defaultCommenters,
      cassRelations: ['isEnabledBy', 'narrows', 'broadens', 'requires', 'desires', 'isEquivalentTo', 'isRelatedTo', 'enables'],
      asnRelations: ['majorRelated', 'minorRelated'],
      gemqRelations: ['hasChild', 'isChildOf'],
      filteredConcepts: [],
      filteredTypes: [],
      search: "",
      isOpenAutocomplete: false,
      conceptToAdd: null
    };
  },
  components: {
    FrameworkCompetencyPropertyListItem: FrameworkCompetencyPropertyListItem,
    RelationshipListItem: RelationshipListItem,
    ModalTemplate: ModalTemplate["a" /* default */]
  },
  methods: {
    shouldEnforceNotRequired: function shouldEnforceNotRequired(range) {
      if (range.endsWith('/Competency') || range.endsWith('/skos/Concept')) {
        return true;
      }
      return false;
    },
    showManageRelations: function showManageRelations() {
      this.showManageRelationshipsModal = true;
    },
    hideManageRelations: function hideManageRelations() {
      this.showManageRelationshipsModal = false;
    },
    getPermissionEntityEmail: function getPermissionEntityEmail(pk) {
      var pe = this.getPermissionEntityByPk(pk);
      if (pe) return pe.email;else return 'unknown user/group email';
    },
    getPermissionEntityType: function getPermissionEntityType(pk) {
      var pe = this.getPermissionEntityByPk(pk);
      if (pe) return pe.type;else return 'unknown type';
    },
    getPermissionEntityName: function getPermissionEntityName(pk) {
      var pe = this.getPermissionEntityByPk(pk);
      if (pe) return pe.name;else return 'unknown user/group name';
    },
    getPermissionEntityByPk: function getPermissionEntityByPk(pk) {
      var _iterator = Object(createForOfIteratorHelper["a" /* default */])(this.permissionEntityList),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var pe = _step.value;
          if (pe.pk.equals(pk)) return pe;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    },
    applySelectPermissionEntities: function applySelectPermissionEntities() {
      if (this.permissionEntitySelectionMode.equalsIgnoreCase('owner')) this.localDefaultOwners = this.selectedPermissionEntities;else if (this.permissionEntitySelectionMode.equalsIgnoreCase('reader')) this.localDefaultReaders = this.selectedPermissionEntities;else if (this.permissionEntitySelectionMode.equalsIgnoreCase('commenter')) this.localDefaultCommenters = this.selectedPermissionEntities;
      this.closeSelectPermissionEntitiesModal();
    },
    closeSelectPermissionEntitiesModal: function closeSelectPermissionEntitiesModal() {
      this.permissionEntitySelectionTitle = '';
      this.selectedPermissionEntities = [];
      this.permissionEntitiesFilter = '';
      this.showSelectPermissionEntitiesModal = false;
    },
    openSelectPermissionEntitiesModal: function openSelectPermissionEntitiesModal(pesMode) {
      this.permissionEntitySelectionMode = pesMode;
      if (this.permissionEntitySelectionMode.equalsIgnoreCase('owner')) {
        this.selectedPermissionEntities = this.localDefaultOwners;
        this.permissionEntitySelectionTitle = 'Select Default Owners';
      } else if (this.permissionEntitySelectionMode.equalsIgnoreCase('reader')) {
        this.selectedPermissionEntities = this.localDefaultReaders;
        this.permissionEntitySelectionTitle = 'Select Default Readers';
      } else if (this.permissionEntitySelectionMode.equalsIgnoreCase('commenter')) {
        this.selectedPermissionEntities = this.localDefaultCommenters;
        this.permissionEntitySelectionTitle = 'Select Default Commenters';
      }
      this.showSelectPermissionEntitiesModal = true;
    },
    setAllValidationsChecksToValid: function setAllValidationsChecksToValid() {
      this.levelInvalid = false;
      this.levelNameInvalid = false;
    },
    validateLevelFields: function validateLevelFields() {
      this.setAllValidationsChecksToValid();
      if (!this.newLevelName || this.newLevelName.trim().equals('')) {
        this.levelInvalid = true;
        this.levelNameInvalid = true;
      }
    },
    setDataFieldsFromAddLevelToSelectLevel: function setDataFieldsFromAddLevelToSelectLevel() {
      this.setAllValidationsChecksToValid();
      this.levelSelectionModalTitle = 'Select Enforced Levels';
      this.newLevelName = '';
      this.newLevelDescription = '';
      this.savingLevelBusy = false;
      this.showAddNewLevelSection = false;
    },
    buildLevelListForLevelSaveSuccess: function buildLevelListForLevelSaveSuccess(ecla) {
      if (ecla && ecla.length > 0) {
        this.levelList = ecla;
        this.sortLevelList();
      } else this.levelList = [];
      this.setDataFieldsFromAddLevelToSelectLevel();
    },
    buildLevelListForLevelSaveFailure: function buildLevelListForLevelSaveFailure(msg) {
      appLog("Level search failure: " + msg);
      this.configDetailsBusy = false;
    },
    createAndSaveNewLevelSuccess: function createAndSaveNewLevelSuccess() {
      var paramObj = {};
      paramObj.size = this.LEVEL_SEARCH_SIZE;
      EcLevel.search(window.repo, '', this.buildLevelListForLevelSaveSuccess, this.buildLevelListForLevelSaveFailure, paramObj);
    },
    createAndSaveNewLevelFailure: function createAndSaveNewLevelFailure(msg) {
      appLog('Failed to save new level: ' + msg);
      this.setDataFieldsFromAddLevelToSelectLevel();
    },
    createAndSaveNewLevel: function createAndSaveNewLevel() {
      var ecl = new EcLevel();
      ecl.generateId(window.repo.selectedServer);
      // this.addAllIdentityPksAsOwners(ecl);
      ecl.name = this.newLevelName.trim();
      if (this.newLevelDescription && !this.newLevelDescription.trim().equals('')) ecl.description = this.newLevelDescription.trim();
      EcRepository.save(ecl, this.createAndSaveNewLevelSuccess, this.createAndSaveNewLevelFailure);
    },
    saveAddNewLevel: function saveAddNewLevel() {
      this.validateLevelFields();
      if (!this.levelInvalid) {
        this.savingLevelBusy = true;
        this.selectedLevelFilter = '';
        this.createAndSaveNewLevel();
      }
    },
    cancelAddNewLevel: function cancelAddNewLevel() {
      this.setDataFieldsFromAddLevelToSelectLevel();
    },
    showAddNewLevel: function showAddNewLevel() {
      this.setAllValidationsChecksToValid();
      this.levelSelectionModalTitle = 'Add New Level';
      this.newLevelName = '';
      this.newLevelDescription = '';
      this.savingLevelBusy = false;
      this.showAddNewLevelSection = true;
      this.$refs.levelsModal.scrollTop = 0;
    },
    closeSelectLevelModal: function closeSelectLevelModal() {
      this.levelSelectionModalTitle = '';
      this.selectedLevels = [];
      this.selectedLevelFilter = '';
      this.newLevelName = '';
      this.newLevelDescription = '';
      this.savingLevelBusy = false;
      this.showAddNewLevelSection = false;
      this.showSelectLevelModal = false;
    },
    applySelectLevels: function applySelectLevels() {
      this.localEnforcedLevelValues = this.selectedLevels;
      this.closeSelectLevelModal();
    },
    showSelectLevelsModal: function showSelectLevelsModal() {
      this.selectedLevels = this.localEnforcedLevelValues;
      this.sortLevelList();
      this.levelSelectionModalTitle = 'Select Enforced Levels';
      this.showAddNewLevelSection = false;
      this.showSelectLevelModal = true;
    },
    getLevelNameById: function getLevelNameById(levelId) {
      var lvl = this.getLevelById(levelId);
      if (!lvl) return 'Unknown';else return lvl.getName();
    },
    getLevelDescById: function getLevelDescById(levelId) {
      var lvl = this.getLevelById(levelId);
      if (!lvl) return 'Unknown';else return lvl.getDescription();
    },
    getLevelById: function getLevelById(levelId) {
      var _iterator2 = Object(createForOfIteratorHelper["a" /* default */])(this.levelList),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var lvl = _step2.value;
          if (lvl.shortId().equals(levelId)) {
            return lvl;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return null;
    },
    setAllConfigValidationsChecksToValid: function setAllConfigValidationsChecksToValid() {
      this.configInvalid = false;
      this.configNameInvalid = false;
      this.configDescriptionInvalid = false;
      this.configEnforcedTypesInvalid = false;
      this.configRelationshipsInvalid = false;
      this.configFrameworkIdLabelInvalid = false;
      this.configFrameworkIdDescriptionInvalid = false;
      this.configFrameworkNameLabelInvalid = false;
      this.configFrameworkNameDescriptionInvalid = false;
      this.configFrameworkDescLabelInvalid = false;
      this.configFrameworkDescDescriptionInvalid = false;
      this.configFrameworkClassLabelInvalid = false;
      this.configFrameworkClassDescriptionInvalid = false;
      this.configFrameworkMarkingsLabelInvalid = false;
      this.configFrameworkMarkingsDescriptionInvalid = false;
      this.configCompetencyIdLabelInvalid = false;
      this.configCompetencyIdDescriptionInvalid = false;
      this.configCompetencyNameLabelInvalid = false;
      this.configCompetencyNameDescriptionInvalid = false;
      this.configCompetencyDescLabelInvalid = false;
      this.configCompetencyDescDescriptionInvalid = false;
      this.configCompetencyTypeLabelInvalid = false;
      this.configCompetencyTypeDescriptionInvalid = false;
      this.configCompetencyClassLabelInvalid = false;
      this.configCompetencyClassDescriptionInvalid = false;
      this.configCompetencyMarkingsLabelInvalid = false;
      this.configCompetencyMarkingsDescriptionInvalid = false;
    },
    validateConfigRelationships: function validateConfigRelationships() {
      var configRelationships = Object.keys(this.config.relationships);
      for (var _i = 0, _configRelationships = configRelationships; _i < _configRelationships.length; _i++) {
        var cr = _configRelationships[_i];
        var relObj = this.config.relationships[cr];
        if (relObj.enabled && (!relObj.label || relObj.label.trim().equals(''))) {
          this.configInvalid = true;
          this.configRelationshipsInvalid = true;
          break;
        }
      }
    },
    validateConfigEnforcedTypes: function validateConfigEnforcedTypes() {
      if (this.config.compEnforceTypes) {
        if (!this.config.compEnforcedTypes || this.config.compEnforcedTypes.length <= 0) {
          this.configInvalid = true;
          this.configEnforcedTypesInvalid = true;
          return;
        }
        var _iterator3 = Object(createForOfIteratorHelper["a" /* default */])(this.config.compEnforcedTypes),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var et = _step3.value;
            if (!et.display || et.display.trim().equals('') || !et.value || et.value.trim().equals('')) {
              this.configInvalid = true;
              this.configEnforcedTypesInvalid = true;
              break;
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
    },
    validateStaticPropertyFields: function validateStaticPropertyFields() {
      if (!this.config.fwkIdLabel || this.config.fwkIdLabel.trim().equals('')) {
        this.configInvalid = true;
        this.configFrameworkIdLabelInvalid = true;
      }
      if (!this.config.fwkIdDescription || this.config.fwkIdDescription.trim().equals('')) {
        this.configInvalid = true;
        this.configFrameworkIdDescriptionInvalid = true;
      }
      if (!this.config.fwkNameLabel || this.config.fwkNameLabel.trim().equals('')) {
        this.configInvalid = true;
        this.configFrameworkNameLabelInvalid = true;
      }
      if (!this.config.fwkNameDescription || this.config.fwkNameDescription.trim().equals('')) {
        this.configInvalid = true;
        this.configFrameworkNameDescriptionInvalid = true;
      }
      if (!this.config.fwkDescLabel || this.config.fwkDescLabel.trim().equals('')) {
        this.configInvalid = true;
        this.configFrameworkDescLabelInvalid = true;
      }
      if (!this.config.fwkDescDescription || this.config.fwkDescDescription.trim().equals('')) {
        this.configInvalid = true;
        this.configFrameworkDescDescriptionInvalid = true;
      }
      if (!this.config.fwkClassLabel || this.config.fwkClassLabel.trim().equals('')) {
        this.configInvalid = true;
        this.configFrameworkClassLabelInvalid = true;
      }
      if (!this.config.fwkClassDescription || this.config.fwkClassDescription.trim().equals('')) {
        this.configInvalid = true;
        this.configFrameworkClassDescriptionInvalid = true;
      }
      if (!this.config.fwkMarkingsLabel || this.config.fwkMarkingsLabel.trim().equals('')) {
        this.configInvalid = true;
        this.configFrameworkMarkingsLabelInvalid = true;
      }
      if (!this.config.fwkMarkingsDescription || this.config.fwkMarkingsDescription.trim().equals('')) {
        this.configInvalid = true;
        this.configFrameworkMarkingsDescriptionInvalid = true;
      }
      if (!this.config.compIdLabel || this.config.compIdLabel.trim().equals('')) {
        this.configInvalid = true;
        this.configCompetencyIdLabelInvalid = true;
      }
      if (!this.config.compIdDescription || this.config.compIdDescription.trim().equals('')) {
        this.configInvalid = true;
        this.configCompetencyIdDescriptionInvalid = true;
      }
      if (!this.config.compNameLabel || this.config.compNameLabel.trim().equals('')) {
        this.configInvalid = true;
        this.configCompetencyNameLabelInvalid = true;
      }
      if (!this.config.compNameDescription || this.config.compNameDescription.trim().equals('')) {
        this.configInvalid = true;
        this.configCompetencyNameDescriptionInvalid = true;
      }
      if (!this.config.compDescLabel || this.config.compDescLabel.trim().equals('')) {
        this.configInvalid = true;
        this.configCompetencyDescLabelInvalid = true;
      }
      if (!this.config.compDescDescription || this.config.compDescDescription.trim().equals('')) {
        this.configInvalid = true;
        this.configCompetencyDescDescriptionInvalid = true;
      }
      if (!this.config.compTypeLabel || this.config.compTypeLabel.trim().equals('')) {
        this.configInvalid = true;
        this.configCompetencyTypeLabelInvalid = true;
      }
      if (!this.config.compTypeDescription || this.config.compTypeDescription.trim().equals('')) {
        this.configInvalid = true;
        this.configCompetencyTypeDescriptionInvalid = true;
      }
      if (!this.config.compClassLabel || this.config.compClassLabel.trim().equals('')) {
        this.configInvalid = true;
        this.configCompetencyClassLabelInvalid = true;
      }
      if (!this.config.compClassDescription || this.config.compClassDescription.trim().equals('')) {
        this.configInvalid = true;
        this.configCompetencyClassDescriptionInvalid = true;
      }
      if (!this.config.compMarkingsLabel || this.config.compMarkingsLabel.trim().equals('')) {
        this.configInvalid = true;
        this.configCompetencyMarkingsLabelInvalid = true;
      }
      if (!this.config.compMarkingsDescription || this.config.compMarkingsDescription.trim().equals('')) {
        this.configInvalid = true;
        this.configCompetencyMarkingsDescriptionInvalid = true;
      }
    },
    validateConfigFields: function validateConfigFields() {
      this.setAllConfigValidationsChecksToValid();
      if (!this.config.name || this.config.name.trim().equals('')) {
        this.configInvalid = true;
        this.configNameInvalid = true;
      }
      if (!this.config.description || this.config.description.trim().equals('')) {
        this.configInvalid = true;
        this.configDescriptionInvalid = true;
      }
      this.validateConfigEnforcedTypes();
      this.validateConfigRelationships();
      this.validateStaticPropertyFields();
    },
    validateCurrentConfigAndEmitSave: function validateCurrentConfigAndEmitSave() {
      this.validateConfigFields();
      if (!this.configInvalid) {
        this.$emit('save', this.localEnforcedLevelValues, this.localDefaultOwners, this.localDefaultReaders, this.localDefaultCommenters);
      } else {
        this.$scrollTo('#config-invalid', '400', this.scrollOptions);
      }
    },
    deleteCompetencyEnforcedType: function deleteCompetencyEnforcedType(etIndex) {
      this.config.compEnforcedTypes = this.config.compEnforcedTypes.slice(0, etIndex).concat(this.config.compEnforcedTypes.slice(etIndex + 1, this.config.compEnforcedTypes.length));
    },
    addCompetencyEnforcedTypeDataHolder: function addCompetencyEnforcedTypeDataHolder() {
      var cef = {};
      cef.display = '';
      cef.value = '';
      this.config.compEnforcedTypes.push(cef);
    },
    checkEnforceTypesChange: function checkEnforceTypesChange() {
      if (this.config.compEnforceTypes) {
        if (!this.config.compEnforcedTypes) this.config.compEnforcedTypes = [];
        if (this.config.compEnforcedTypes.length <= 0) this.addCompetencyEnforcedTypeDataHolder();
      }
    },
    getCustomProperty: function getCustomProperty(propertyParent, propertyName) {
      var customProperties = [];
      if (propertyParent.equals('framework')) customProperties = this.config.fwkCustomProperties;else if (propertyParent.equals('taxonomy')) customProperties = this.config.taxonomyCustomProperties;else if (propertyParent.equals('taxon')) customProperties = this.config.taxonCustomProperties;else if (propertyParent.equals('competency')) customProperties = this.config.compCustomProperties;else return null;
      var _iterator4 = Object(createForOfIteratorHelper["a" /* default */])(customProperties),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var prop = _step4.value;
          if (prop.propertyName && prop.propertyName.equals(propertyName)) return prop;
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      return null;
    },
    doesCustomPropertyPropertyNameExist: function doesCustomPropertyPropertyNameExist(propertyParent, propertyNameToCheck) {
      if (propertyNameToCheck.equals('id') || propertyNameToCheck.equals('name') || propertyNameToCheck.equals('description')) return true;else if (propertyParent.equals('competency') && propertyNameToCheck.equals('type')) return true;else {
        var prop = this.getCustomProperty(propertyParent, propertyNameToCheck);
        if (!prop) return false;else return true;
      }
    },
    setAllCustomPropertyValidationsChecksToValid: function setAllCustomPropertyValidationsChecksToValid() {
      this.customPropertyInvalid = false;
      this.customPropertyPropertyNameExists = false;
      this.customPropertyPropertyNameInvalid = false;
      this.customPropertyLabelInvalid = false;
      this.customPropertyDescriptionInvalid = false;
    },
    validateCustomPropertyFields: function validateCustomPropertyFields() {
      this.setAllCustomPropertyValidationsChecksToValid();
      if (!this.customPropertyPropertyName || this.customPropertyPropertyName.trim().equals('')) {
        this.customPropertyInvalid = true;
        this.customPropertyPropertyNameInvalid = true;
      } else if (this.customPropertyIsNew && this.doesCustomPropertyPropertyNameExist(this.customPropertyParent, this.customPropertyPropertyName)) {
        this.customPropertyInvalid = true;
        this.customPropertyPropertyNameExists = true;
      }
      if (!this.customPropertyLabel || this.customPropertyLabel.trim().equals('')) {
        this.customPropertyInvalid = true;
        this.customPropertyLabelInvalid = true;
      }
      if (!this.customPropertyDescription || this.customPropertyDescription.trim().equals('')) {
        this.customPropertyInvalid = true;
        this.customPropertyDescriptionInvalid = true;
      }
    },
    addNewCustomPropertyToConfig: function addNewCustomPropertyToConfig() {
      var newProp = {};
      newProp.context = this.customPropertyContext;
      newProp.propertyName = this.customPropertyPropertyName;
      newProp.range = this.customPropertyRange;
      newProp.description = this.customPropertyDescription;
      newProp.label = this.customPropertyLabel;
      newProp.priority = this.customPropertyPriority;
      newProp.required = this.customPropertyRequired;
      newProp.heading = this.customPropertyHeading;
      newProp.allowMultiples = this.customPropertyAllowMultiples;
      newProp.onePerLanguage = this.customPropertyOnePerLanguage;
      if (this.shouldAllowCustomPropertyPermittedValues && this.customPropertyValuesLimited) {
        newProp.permittedValues = this.customPropertyPermittedValues;
      } else {
        newProp.permittedValues = [];
      }
      if (this.shouldAllowCustomPropertyPermittedTypes && this.customPropertyTypesLimited) {
        newProp.permittedTypes = this.customPropertyPermittedTypes;
        newProp.isDirectLink = true;
      } else {
        newProp.permittedTypes = [];
        newProp.isDirectLink = false;
      }
      if (this.shouldAllowCustomPropertyPermittedConcepts && this.customPropertyConceptsLimited) {
        newProp.permittedConcepts = this.customPropertyPermittedConcepts;
      } else {
        newProp.permittedConcepts = [];
      }
      if (this.customPropertyParent.equals('framework')) this.config.fwkCustomProperties.push(newProp);else if (this.customPropertyParent.equals('taxonomy')) this.config.taxonomyCustomProperties.push(newProp);else if (this.customPropertyParent.equals('taxon')) this.config.taxonCustomProperties.push(newProp);else if (this.customPropertyParent.equals('competency')) this.config.compCustomProperties.push(newProp);
    },
    updateExistingConfigCustomProperty: function updateExistingConfigCustomProperty() {
      var propToUpdate = this.getCustomProperty(this.customPropertyParent, this.customPropertyPropertyName);
      if (!propToUpdate) appLog('!!!!Could not find existing custom property to update');else {
        propToUpdate.description = this.customPropertyDescription;
        propToUpdate.label = this.customPropertyLabel;
        propToUpdate.priority = this.customPropertyPriority;
        propToUpdate.required = this.customPropertyRequired;
        propToUpdate.heading = this.customPropertyHeading;
        propToUpdate.allowMultiples = this.customPropertyAllowMultiples;
        propToUpdate.onePerLanguage = this.customPropertyOnePerLanguage;
        if (this.shouldAllowCustomPropertyPermittedValues && this.customPropertyValuesLimited) {
          propToUpdate.permittedValues = this.customPropertyPermittedValues;
        } else {
          propToUpdate.permittedValues = [];
        }
        if (this.shouldAllowCustomPropertyPermittedTypes && this.customPropertyTypesLimited) {
          propToUpdate.permittedTypes = this.customPropertyPermittedTypes;
          propToUpdate.isDirectLink = true;
        } else {
          propToUpdate.permittedTypes = [];
          propToUpdate.isDirectLink = false;
        }
        if (this.shouldAllowCustomPropertyPermittedConcepts && this.customPropertyConceptsLimited) {
          propToUpdate.permittedConcepts = this.customPropertyPermittedConcepts;
        } else {
          propToUpdate.permittedConcepts = [];
        }
      }
    },
    trimCustomPropertyPermittedValues: function trimCustomPropertyPermittedValues() {
      var trimmedPermittedValues = [];
      var _iterator5 = Object(createForOfIteratorHelper["a" /* default */])(this.customPropertyPermittedValues),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var pv = _step5.value;
          if (pv.display && pv.display.trim().length > 0 && pv.value && pv.value.trim().length > 0) {
            pv.display = pv.display.trim();
            pv.value = pv.value.trim();
            trimmedPermittedValues.push(pv);
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      this.customPropertyPermittedValues = trimmedPermittedValues;
    },
    applyCustomPropertyEdits: function applyCustomPropertyEdits() {
      this.validateCustomPropertyFields();
      if (!this.customPropertyInvalid) {
        this.trimCustomPropertyPermittedValues();
        if (this.customPropertyIsNew) this.addNewCustomPropertyToConfig();else this.updateExistingConfigCustomProperty();
        this.closeCustomPropertyModal();
      }
    },
    deleteCustomPropertyPermittedValue: function deleteCustomPropertyPermittedValue(idx) {
      this.customPropertyPermittedValues = this.customPropertyPermittedValues.slice(0, idx).concat(this.customPropertyPermittedValues.slice(idx + 1, this.customPropertyPermittedValues.length));
    },
    deleteCustomPropertyPermittedType: function deleteCustomPropertyPermittedType(idx) {
      this.customPropertyPermittedTypes = this.customPropertyPermittedTypes.slice(0, idx).concat(this.customPropertyPermittedTypes.slice(idx + 1, this.customPropertyPermittedTypes.length));
    },
    deleteCustomPropertyPermittedConcept: function deleteCustomPropertyPermittedConcept(idx) {
      this.customPropertyPermittedConcepts = this.customPropertyPermittedConcepts.slice(0, idx).concat(this.customPropertyPermittedConcepts.slice(idx + 1, this.customPropertyPermittedConcepts.length));
    },
    addCustomPropertyPermittedValue: function addCustomPropertyPermittedValue() {
      var pv = {};
      pv.display = '';
      pv.value = '';
      this.customPropertyPermittedValues.push(pv);
    },
    addCustomPropertyPermittedType: function addCustomPropertyPermittedType() {
      var pv = {};
      pv.display = '';
      pv.value = '';
      this.customPropertyPermittedTypes.push(pv);
    },
    simplifyCustomPropertyName: function simplifyCustomPropertyName() {
      this.customPropertyPropertyName = this.customPropertyPropertyName.replace(/[^0-9a-z]/gi, '');
    },
    reInitCustomPropertyDataHolders: function reInitCustomPropertyDataHolders() {
      this.customPropertyParent = '';
      this.customPropertyIsNew = true;
      this.customPropertyContext = '';
      this.customPropertyPropertyName = '';
      this.customPropertyRange = '';
      this.customPropertyDescription = '';
      this.customPropertyLabel = '';
      this.customPropertyPriority = '';
      this.customPropertyRequired = false;
      this.customPropertyHeading = '';
      this.customPropertyAllowMultiples = false;
      this.customPropertyOnePerLanguage = true;
      this.customPropertyPermittedValues = [];
      this.customPropertyValuesLimited = false;
      this.customPropertyPermittedTypes = [];
      this.customPropertyTypesLimited = false;
      this.customPropertyPermittedConcepts = [];
      this.customPropertyConceptsLimited = false;
      this.customPropertyInvalid = false;
      this.customPropertyPropertyNameExists = false;
      this.customPropertyPropertyNameInvalid = false;
      this.customPropertyLabelInvalid = false;
      this.customPropertyDescriptionInvalid = false;
    },
    closeCustomPropertyModal: function closeCustomPropertyModal() {
      this.reInitCustomPropertyDataHolders();
      this.customPropertyModalTitle = '';
      this.showCustomPropertyDetailsModal = false;
    },
    initCustomPropertyDataHoldersAsNewProperty: function initCustomPropertyDataHoldersAsNewProperty() {
      this.reInitCustomPropertyDataHolders();
      this.customPropertyIsNew = true;
      this.customPropertyContext = this.DEFAULT_CUSTOM_PROPERTY_CONTEXT;
      this.customPropertyRange = this.DEFAULT_CUSTOM_PROPERTY_RANGE;
      this.customPropertyPriority = 'primary';
    },
    addCustomFrameworkProperty: function addCustomFrameworkProperty() {
      this.initCustomPropertyDataHoldersAsNewProperty();
      this.customPropertyModalTitle = "New Framework Property";
      this.customPropertyParent = "framework";
      this.showCustomPropertyDetailsModal = true;
    },
    addCustomTaxonomyProperty: function addCustomTaxonomyProperty() {
      this.initCustomPropertyDataHoldersAsNewProperty();
      this.customPropertyModalTitle = "New Taxonomy Property";
      this.customPropertyParent = "taxonomy";
      this.showCustomPropertyDetailsModal = true;
    },
    addCustomTaxonProperty: function addCustomTaxonProperty() {
      this.initCustomPropertyDataHoldersAsNewProperty();
      this.customPropertyModalTitle = "New Taxon Property";
      this.customPropertyParent = "taxon";
      this.showCustomPropertyDetailsModal = true;
    },
    addCustomCompetencyProperty: function addCustomCompetencyProperty() {
      this.initCustomPropertyDataHoldersAsNewProperty();
      this.customPropertyModalTitle = "New Competency Property";
      this.customPropertyParent = "competency";
      this.showCustomPropertyDetailsModal = true;
    },
    generateCopyOfCustomPropertyPermittedValues: function generateCopyOfCustomPropertyPermittedValues(prop) {
      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee() {
        var permittedValuesCopy, _iterator6, _step6, pv, cpv;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              permittedValuesCopy = [];
              if (prop.permittedValues && prop.permittedValues.length > 0) {
                _iterator6 = Object(createForOfIteratorHelper["a" /* default */])(prop.permittedValues);
                try {
                  for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                    pv = _step6.value;
                    cpv = {};
                    cpv.display = pv.display;
                    cpv.value = pv.value;
                    permittedValuesCopy.push(cpv);
                  }
                } catch (err) {
                  _iterator6.e(err);
                } finally {
                  _iterator6.f();
                }
              }
              return _context.abrupt("return", permittedValuesCopy);
            case 3:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    generateCopyOfCustomPropertyPermittedTypes: function generateCopyOfCustomPropertyPermittedTypes(prop) {
      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee2() {
        var permittedTypesCopy, _iterator7, _step7, pv, cpv;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              permittedTypesCopy = [];
              if (prop.permittedTypes && prop.permittedTypes.length > 0) {
                _iterator7 = Object(createForOfIteratorHelper["a" /* default */])(prop.permittedTypes);
                try {
                  for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                    pv = _step7.value;
                    cpv = {};
                    cpv.display = pv.display;
                    cpv.value = pv.value;
                    permittedTypesCopy.push(cpv);
                  }
                } catch (err) {
                  _iterator7.e(err);
                } finally {
                  _iterator7.f();
                }
              }
              return _context2.abrupt("return", permittedTypesCopy);
            case 3:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))();
    },
    generateCopyOfCustomPropertyPermittedConcepts: function generateCopyOfCustomPropertyPermittedConcepts(prop) {
      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee3() {
        var permittedConceptsCopy, _iterator8, _step8, pv, cpv;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              permittedConceptsCopy = [];
              if (prop.permittedConcepts && prop.permittedConcepts.length > 0) {
                _iterator8 = Object(createForOfIteratorHelper["a" /* default */])(prop.permittedConcepts);
                try {
                  for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                    pv = _step8.value;
                    cpv = {};
                    cpv.display = pv.display;
                    cpv.value = pv.value;
                    permittedConceptsCopy.push(cpv);
                  }
                } catch (err) {
                  _iterator8.e(err);
                } finally {
                  _iterator8.f();
                }
              }
              return _context3.abrupt("return", permittedConceptsCopy);
            case 3:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }))();
    },
    initCustomPropertyDataHoldersAsExistingProperty: function initCustomPropertyDataHoldersAsExistingProperty(propertyParent, prop) {
      var _this = this;
      this.reInitCustomPropertyDataHolders();
      this.search = '';
      this.customPropertyParent = propertyParent;
      this.customPropertyIsNew = false;
      this.customPropertyContext = prop.context;
      this.customPropertyPropertyName = prop.propertyName;
      this.customPropertyRange = prop.range;
      this.customPropertyDescription = prop.description;
      this.customPropertyLabel = prop.label;
      this.customPropertyPriority = prop.priority;
      this.customPropertyRequired = prop.required;
      this.customPropertyHeading = prop.heading;
      this.customPropertyAllowMultiples = prop.allowMultiples;
      this.customPropertyOnePerLanguage = prop.onePerLanguage;
      this.generateCopyOfCustomPropertyPermittedValues(prop).then(function (values) {
        _this.customPropertyPermittedValues = values;
        if (values && values.length > 0) {
          _this.customPropertyValuesLimited = true;
        } else {
          _this.customPropertyValuesLimited = false;
        }
      });
      this.generateCopyOfCustomPropertyPermittedConcepts(prop).then(function (concepts) {
        _this.customPropertyPermittedConcepts = concepts;
        if (concepts && concepts.length > 0) {
          _this.customPropertyConceptsLimited = true;
        } else {
          _this.customPropertyConceptsLimited = false;
        }
      });
      this.generateCopyOfCustomPropertyPermittedTypes(prop).then(function (types) {
        _this.customPropertyPermittedTypes = types;
        if (types && types.length > 0) {
          _this.customPropertyTypesLimited = true;
        } else {
          _this.customPropertyTypesLimited = false;
        }
      });
    },
    manageCustomFrameworkProperty: function manageCustomFrameworkProperty(propertyIdx) {
      this.initCustomPropertyDataHoldersAsExistingProperty('framework', this.config.fwkCustomProperties[propertyIdx]);
      this.customPropertyModalTitle = "Manage Framework Property";
      this.showCustomPropertyDetailsModal = true;
    },
    manageCustomTaxonomyProperty: function manageCustomTaxonomyProperty(propertyIdx) {
      this.initCustomPropertyDataHoldersAsExistingProperty('taxonomy', this.config.taxonomyCustomProperties[propertyIdx]);
      this.customPropertyModalTitle = "Manage Taxonomy Property";
      this.showCustomPropertyDetailsModal = true;
    },
    manageCustomTaxonProperty: function manageCustomTaxonProperty(propertyIdx) {
      this.initCustomPropertyDataHoldersAsExistingProperty('taxon', this.config.taxonCustomProperties[propertyIdx]);
      this.customPropertyModalTitle = "Manage Taxon Property";
      this.showCustomPropertyDetailsModal = true;
    },
    manageCustomCompetencyProperty: function manageCustomCompetencyProperty(propertyIdx) {
      this.initCustomPropertyDataHoldersAsExistingProperty('competency', this.config.compCustomProperties[propertyIdx]);
      this.customPropertyModalTitle = "Manage Competency Property";
      this.showCustomPropertyDetailsModal = true;
    },
    manageCustomFrameworkCompetencyProperty: function manageCustomFrameworkCompetencyProperty(propertyParent, propertyIdx) {
      if (propertyParent.equals('framework')) this.manageCustomFrameworkProperty(propertyIdx);else if (propertyParent.equals('taxonomy')) this.manageCustomTaxonomyProperty(propertyIdx);else if (propertyParent.equals('taxon')) this.manageCustomTaxonProperty(propertyIdx);else if (propertyParent.equals('competency')) this.manageCustomCompetencyProperty(propertyIdx);
    },
    deleteCustomFrameworkCompetencyProperty: function deleteCustomFrameworkCompetencyProperty(propertyParent, propertyIdx) {
      var customPropertyList;
      if (propertyParent.equals('framework')) customPropertyList = this.config.fwkCustomProperties;else if (propertyParent.equals('taxonomy')) customPropertyList = this.config.taxonomyCustomProperties;else if (propertyParent.equals('taxon')) customPropertyList = this.config.taxonCustomProperties;else if (propertyParent.equals('competency')) customPropertyList = this.config.compCustomProperties;
      customPropertyList = customPropertyList.slice(0, propertyIdx).concat(customPropertyList.slice(propertyIdx + 1, customPropertyList.length));
      if (propertyParent.equals('framework')) this.config.fwkCustomProperties = customPropertyList;else if (propertyParent.equals('taxonomy')) this.config.taxonomyCustomProperties = customPropertyList;else if (propertyParent.equals('taxon')) this.config.taxonCustomProperties = customPropertyList;else if (propertyParent.equals('competency')) this.config.compCustomProperties = customPropertyList;
    },
    updateFrameworkIdProperty: function updateFrameworkIdProperty(field, newValue) {
      if (field.equals("label")) this.config.fwkIdLabel = newValue;else if (field.equals("description")) this.config.fwkIdDescription = newValue;else if (field.equals("priority")) this.config.fwkIdPriorty = newValue;else if (field.equals("heading")) this.config.fwkIdHeading = newValue;
    },
    updateFrameworkNameProperty: function updateFrameworkNameProperty(field, newValue) {
      if (field.equals("label")) this.config.fwkNameLabel = newValue;else if (field.equals("description")) this.config.fwkNameDescription = newValue;else if (field.equals("heading")) this.config.fwkNameHeading = newValue;
    },
    updateFrameworkDescriptionProperty: function updateFrameworkDescriptionProperty(field, newValue) {
      if (field.equals("label")) this.config.fwkDescLabel = newValue;else if (field.equals("description")) this.config.fwkDescDescription = newValue;else if (field.equals("priority")) this.config.fwkDescPriority = newValue;else if (field.equals("required")) this.config.fwkDescRequired = newValue;else if (field.equals("heading")) this.config.fwkDescHeading = newValue;
    },
    updateFrameworkClassificationProperty: function updateFrameworkClassificationProperty(field, newValue) {
      if (field.equals("label")) this.config.fwkClassLabel = newValue;else if (field.equals("description")) this.config.fwkClassDescription = newValue;else if (field.equals("priority")) this.config.fwkClassPriority = newValue;else if (field.equals("required")) this.config.fwkClassRequired = newValue;else if (field.equals("heading")) this.config.fwkClassHeading = newValue;
    },
    updateFrameworkMarkingsProperty: function updateFrameworkMarkingsProperty(field, newValue) {
      if (field.equals("label")) this.config.fwkMarkingsLabel = newValue;else if (field.equals("description")) this.config.fwkMarkingsDescription = newValue;else if (field.equals("priority")) this.config.fwkMarkingsPriority = newValue;else if (field.equals("required")) this.config.fwkMarkingsRequired = newValue;else if (field.equals("heading")) this.config.fwkMarkingsHeading = newValue;
    },
    updateFrameworkCustomProperty: function updateFrameworkCustomProperty(propertyName, field, newValue) {
      var propToUpdate = this.getCustomProperty('framework', propertyName);
      if (field.equals("label")) propToUpdate.label = newValue;else if (field.equals("description")) propToUpdate.description = newValue;else if (field.equals("priority")) propToUpdate.priority = newValue;else if (field.equals("required")) propToUpdate.required = newValue;else if (field.equals("heading")) propToUpdate.heading = newValue;
    },
    updateFrameworkProperty: function updateFrameworkProperty(propertyName, field, newValue) {
      if (propertyName.equals("id")) this.updateFrameworkIdProperty(field, newValue);else if (propertyName.equals("name")) this.updateFrameworkNameProperty(field, newValue);else if (propertyName.equals("description")) this.updateFrameworkDescriptionProperty(field, newValue);else if (propertyName.equals("classification")) this.updateFrameworkClassificationProperty(field, newValue);else if (propertyName.equals("markings")) this.updateFrameworkMarkingsProperty(field, newValue);else this.updateFrameworkCustomProperty(propertyName, field, newValue);
    },
    updateTaxonomyIdProperty: function updateTaxonomyIdProperty(field, newValue) {
      if (field.equals("label")) this.config.taxonomyIdLabel = newValue;else if (field.equals("description")) this.config.taxonomyIdDescription = newValue;else if (field.equals("priority")) this.config.taxonomyIdPriorty = newValue;else if (field.equals("heading")) this.config.taxonomyIdHeading = newValue;
    },
    updateTaxonomyNameProperty: function updateTaxonomyNameProperty(field, newValue) {
      if (field.equals("label")) this.config.taxonomyNameLabel = newValue;else if (field.equals("description")) this.config.taxonomyNameDescription = newValue;else if (field.equals("heading")) this.config.taxonomyNameHeading = newValue;
    },
    updateTaxonomyDescriptionProperty: function updateTaxonomyDescriptionProperty(field, newValue) {
      if (field.equals("label")) this.config.taxonomyDescLabel = newValue;else if (field.equals("description")) this.config.taxonomyDescDescription = newValue;else if (field.equals("priority")) this.config.taxonomyDescPriority = newValue;else if (field.equals("required")) this.config.taxonomyDescRequired = newValue;else if (field.equals("heading")) this.config.taxonomyDescHeading = newValue;
    },
    updateTaxonomyCreatorProperty: function updateTaxonomyCreatorProperty(field, newValue) {
      if (field.equals("label")) this.config.taxonomyCreatorLabel = newValue;else if (field.equals("description")) this.config.taxonomyCreatorDescription = newValue;else if (field.equals("priority")) this.config.taxonomyCreatorPriority = newValue;else if (field.equals("required")) this.config.taxonomyCreatorRequired = newValue;else if (field.equals("heading")) this.config.taxonomyCreatorHeading = newValue;
    },
    updateTaxonomyPublisherProperty: function updateTaxonomyPublisherProperty(field, newValue) {
      if (field.equals("label")) this.config.taxonomyPublisherLabel = newValue;else if (field.equals("description")) this.config.taxonomyPublisherDescription = newValue;else if (field.equals("priority")) this.config.taxonomyPublisherPriority = newValue;else if (field.equals("required")) this.config.taxonomyPublisherRequired = newValue;else if (field.equals("heading")) this.config.taxonomyPublisherHeading = newValue;
    },
    updateTaxonomyPubNameProperty: function updateTaxonomyPubNameProperty(field, newValue) {
      if (field.equals("label")) this.config.taxonomyPubNameLabel = newValue;else if (field.equals("description")) this.config.taxonomyPubNameDescription = newValue;else if (field.equals("priority")) this.config.taxonomyPubNamePriority = newValue;else if (field.equals("required")) this.config.taxonomyPubNameRequired = newValue;else if (field.equals("heading")) this.config.taxonomyPubNameHeading = newValue;
    },
    updateTaxonomyLangProperty: function updateTaxonomyLangProperty(field, newValue) {
      if (field.equals("label")) this.config.taxonomyLangLabel = newValue;else if (field.equals("description")) this.config.taxonomyLangDescription = newValue;else if (field.equals("priority")) this.config.taxonomyLangPriority = newValue;else if (field.equals("required")) this.config.taxonomyLangRequired = newValue;else if (field.equals("heading")) this.config.taxonomyLangHeading = newValue;
    },
    updateTaxonomySourceProperty: function updateTaxonomySourceProperty(field, newValue) {
      if (field.equals("label")) this.config.taxonomySourceLabel = newValue;else if (field.equals("description")) this.config.taxonomySourceDescription = newValue;else if (field.equals("priority")) this.config.taxonomySourcePriority = newValue;else if (field.equals("required")) this.config.taxonomySourceRequired = newValue;else if (field.equals("heading")) this.config.taxonomySourceHeading = newValue;
    },
    updateTaxonomyCustomProperty: function updateTaxonomyCustomProperty(propertyName, field, newValue) {
      var propToUpdate = this.getCustomProperty('taxonomy', propertyName);
      if (field.equals("label")) propToUpdate.label = newValue;else if (field.equals("description")) propToUpdate.description = newValue;else if (field.equals("priority")) propToUpdate.priority = newValue;else if (field.equals("required")) propToUpdate.required = newValue;else if (field.equals("heading")) propToUpdate.heading = newValue;
    },
    updateTaxonomyProperty: function updateTaxonomyProperty(propertyName, field, newValue) {
      if (propertyName.equals("id")) this.updateTaxonomyIdProperty(field, newValue);else if (propertyName.equals("name")) this.updateTaxonomyNameProperty(field, newValue);else if (propertyName.equals("description")) this.updateTaxonomyDescriptionProperty(field, newValue);else if (propertyName.equals("creator")) this.updateTaxonomyCreatorProperty(field, newValue);else if (propertyName.equals("publisher")) this.updateTaxonomyPublisherProperty(field, newValue);else if (propertyName.equals("publisherName")) this.updateTaxonomyPubNameProperty(field, newValue);else if (propertyName.equals("language")) this.updateTaxonomyLangProperty(field, newValue);else if (propertyName.equals("source")) this.updateTaxonomySourceProperty(field, newValue);else this.updateTaxonomyCustomProperty(propertyName, field, newValue);
    },
    updateTaxonIdProperty: function updateTaxonIdProperty(field, newValue) {
      if (field.equals("label")) this.config.taxonIdLabel = newValue;else if (field.equals("description")) this.config.taxonIdDescription = newValue;else if (field.equals("priority")) this.config.taxonIdPriority = newValue;else if (field.equals("required")) this.config.taxonIdRequired = newValue;else if (field.equals("heading")) this.config.taxonIdHeading = newValue;
    },
    updateTaxonNameProperty: function updateTaxonNameProperty(field, newValue) {
      if (field.equals("label")) this.config.taxonNameLabel = newValue;else if (field.equals("description")) this.config.taxonNameDescription = newValue;else if (field.equals("priority")) this.config.taxonNamePriority = newValue;else if (field.equals("required")) this.config.taxonNameRequired = newValue;else if (field.equals("heading")) this.config.taxonNameHeading = newValue;
    },
    updateTaxonDescriptionProperty: function updateTaxonDescriptionProperty(field, newValue) {
      if (field.equals("label")) this.config.taxonDescLabel = newValue;else if (field.equals("description")) this.config.taxonDescDescription = newValue;else if (field.equals("priority")) this.config.taxonDescPriority = newValue;else if (field.equals("required")) this.config.taxonDescRequired = newValue;else if (field.equals("heading")) this.config.taxonDescHeading = newValue;
    },
    updateTaxonNotationProperty: function updateTaxonNotationProperty(field, newValue) {
      if (field.equals("label")) this.config.taxonNotationLabel = newValue;else if (field.equals("description")) this.config.taxonNotationDescription = newValue;else if (field.equals("priority")) this.config.taxonNotationPriority = newValue;else if (field.equals("required")) this.config.taxonNotationRequired = newValue;else if (field.equals("heading")) this.config.taxonNotationHeading = newValue;
    },
    updateTaxonAltLabelProperty: function updateTaxonAltLabelProperty(field, newValue) {
      if (field.equals("label")) this.config.taxonAltLabelLabel = newValue;else if (field.equals("description")) this.config.taxonAltLabelDescription = newValue;else if (field.equals("priority")) this.config.taxonAltLabelPriority = newValue;else if (field.equals("required")) this.config.taxonAltLabelRequired = newValue;else if (field.equals("heading")) this.config.taxonAltLabelHeading = newValue;
    },
    updateTaxonHiddenLabelProperty: function updateTaxonHiddenLabelProperty(field, newValue) {
      if (field.equals("label")) this.config.taxonHiddenLabelLabel = newValue;else if (field.equals("description")) this.config.taxonHiddenLabelDescription = newValue;else if (field.equals("priority")) this.config.taxonHiddenLabelPriority = newValue;else if (field.equals("required")) this.config.taxonHiddenLabelRequired = newValue;else if (field.equals("heading")) this.config.taxonHiddenLabelHeading = newValue;
    },
    updateTaxonNoteProperty: function updateTaxonNoteProperty(field, newValue) {
      if (field.equals("label")) this.config.taxonNoteLabel = newValue;else if (field.equals("description")) this.config.taxonNoteDescription = newValue;else if (field.equals("priority")) this.config.taxonNotePriority = newValue;else if (field.equals("required")) this.config.taxonNoteRequired = newValue;else if (field.equals("heading")) this.config.taxonNoteHeading = newValue;
    },
    updateTaxonBroaderProperty: function updateTaxonBroaderProperty(field, newValue) {
      if (field.equals("label")) this.config.taxonBroaderLabel = newValue;else if (field.equals("description")) this.config.taxonBroaderDescription = newValue;else if (field.equals("priority")) this.config.taxonBroaderPriority = newValue;else if (field.equals("required")) this.config.taxonBroaderRequired = newValue;else if (field.equals("heading")) this.config.taxonBroaderHeading = newValue;
    },
    updateTaxonNarrowerProperty: function updateTaxonNarrowerProperty(field, newValue) {
      if (field.equals("label")) this.config.taxonNarrowerLabel = newValue;else if (field.equals("description")) this.config.taxonNarrowerDescription = newValue;else if (field.equals("priority")) this.config.taxonNarrowerPriority = newValue;else if (field.equals("required")) this.config.taxonNarrowerRequired = newValue;else if (field.equals("heading")) this.config.taxonNarrowerHeading = newValue;
    },
    updateTaxonBroadMatchProperty: function updateTaxonBroadMatchProperty(field, newValue) {
      if (field.equals("label")) this.config.taxonBroadMatchLabel = newValue;else if (field.equals("description")) this.config.taxonBroadMatchDescription = newValue;else if (field.equals("priority")) this.config.taxonBroadMatchPriority = newValue;else if (field.equals("required")) this.config.taxonBroadMatchRequired = newValue;else if (field.equals("heading")) this.config.taxonBroadMatchHeading = newValue;
    },
    updateTaxonCloseMatchProperty: function updateTaxonCloseMatchProperty(field, newValue) {
      if (field.equals("label")) this.config.taxonCloseMatchLabel = newValue;else if (field.equals("description")) this.config.taxonCloseMatchDescription = newValue;else if (field.equals("priority")) this.config.taxonCloseMatchPriority = newValue;else if (field.equals("required")) this.config.taxonCloseMatchRequired = newValue;else if (field.equals("heading")) this.config.taxonCloseMatchHeading = newValue;
    },
    updateTaxonExactMatchProperty: function updateTaxonExactMatchProperty(field, newValue) {
      if (field.equals("label")) this.config.taxonExactMatchLabel = newValue;else if (field.equals("description")) this.config.taxonExactMatchDescription = newValue;else if (field.equals("priority")) this.config.taxonExactMatchPriority = newValue;else if (field.equals("required")) this.config.taxonExactMatchRequired = newValue;else if (field.equals("heading")) this.config.taxonExactMatchHeading = newValue;
    },
    updateTaxonNarrowMatchProperty: function updateTaxonNarrowMatchProperty(field, newValue) {
      if (field.equals("label")) this.config.taxonNarrowMatchLabel = newValue;else if (field.equals("description")) this.config.taxonNarrowMatchDescription = newValue;else if (field.equals("priority")) this.config.taxonNarrowMatchPriority = newValue;else if (field.equals("required")) this.config.taxonNarrowMatchRequired = newValue;else if (field.equals("heading")) this.config.taxonNarrowMatchHeading = newValue;
    },
    updateTaxonRelatedProperty: function updateTaxonRelatedProperty(field, newValue) {
      if (field.equals("label")) this.config.taxonRelatedLabel = newValue;else if (field.equals("description")) this.config.taxonRelatedDescription = newValue;else if (field.equals("priority")) this.config.taxonRelatedPriority = newValue;else if (field.equals("required")) this.config.taxonRelatedRequired = newValue;else if (field.equals("heading")) this.config.taxonRelatedHeading = newValue;
    },
    updateTaxonCustomProperty: function updateTaxonCustomProperty(propertyName, field, newValue) {
      var propToUpdate = this.getCustomProperty('taxon', propertyName);
      if (field.equals("label")) propToUpdate.label = newValue;else if (field.equals("description")) propToUpdate.description = newValue;else if (field.equals("priority")) propToUpdate.priority = newValue;else if (field.equals("required")) propToUpdate.required = newValue;else if (field.equals("heading")) propToUpdate.heading = newValue;
    },
    updateTaxonProperty: function updateTaxonProperty(propertyName, field, newValue) {
      if (propertyName.equals("id")) this.updateTaxonIdProperty(field, newValue);else if (propertyName.equals("prefLabel")) this.updateTaxonNameProperty(field, newValue);else if (propertyName.equals("definition")) this.updateTaxonDescriptionProperty(field, newValue);else if (propertyName.equals("notation")) this.updateTaxonNotationProperty(field, newValue);else if (propertyName.equals("altLabel")) this.updateTaxonAltLabelProperty(field, newValue);else if (propertyName.equals("hiddenLabel")) this.updateTaxonHiddenLabelProperty(field, newValue);else if (propertyName.equals("note")) this.updateTaxonNoteProperty(field, newValue);else if (propertyName.equals("broader")) this.updateTaxonBroaderProperty(field, newValue);else if (propertyName.equals("narrower")) this.updateTaxonNarrowerProperty(field, newValue);else if (propertyName.equals("broadMatch")) this.updateTaxonBroadMatchProperty(field, newValue);else if (propertyName.equals("closeMatch")) this.updateTaxonCloseMatchProperty(field, newValue);else if (propertyName.equals("exactMatch")) this.updateTaxonExactMatchProperty(field, newValue);else if (propertyName.equals("narrowMatch")) this.updateTaxonNarrowMatchProperty(field, newValue);else if (propertyName.equals("related")) this.updateTaxonRelatedProperty(field, newValue);else this.updateTaxonCustomProperty(propertyName, field, newValue);
    },
    updateCompetencyIdProperty: function updateCompetencyIdProperty(field, newValue) {
      if (field.equals("label")) this.config.compIdLabel = newValue;else if (field.equals("description")) this.config.compIdDescription = newValue;else if (field.equals("priority")) this.config.compIdPriorty = newValue;else if (field.equals("heading")) this.config.compIdHeading = newValue;
    },
    updateCompetencyNameProperty: function updateCompetencyNameProperty(field, newValue) {
      if (field.equals("label")) this.config.compNameLabel = newValue;else if (field.equals("description")) this.config.compNameDescription = newValue;else if (field.equals("heading")) this.config.compNameHeading = newValue;
    },
    updateCompetencyDescriptionProperty: function updateCompetencyDescriptionProperty(field, newValue) {
      if (field.equals("label")) this.config.compDescLabel = newValue;else if (field.equals("description")) this.config.compDescDescription = newValue;else if (field.equals("priority")) this.config.compDescPriority = newValue;else if (field.equals("required")) this.config.compDescRequired = newValue;else if (field.equals("heading")) this.config.compDescHeading = newValue;
    },
    updateCompetencyClassificationProperty: function updateCompetencyClassificationProperty(field, newValue) {
      if (field.equals("label")) this.config.compClassLabel = newValue;else if (field.equals("description")) this.config.compClassDescription = newValue;else if (field.equals("priority")) this.config.compClassPriority = newValue;else if (field.equals("required")) this.config.compClassRequired = newValue;else if (field.equals("heading")) this.config.compClassHeading = newValue;
    },
    updateCompetencyMarkingsProperty: function updateCompetencyMarkingsProperty(field, newValue) {
      if (field.equals("label")) this.config.compMarkingsLabel = newValue;else if (field.equals("description")) this.config.compMarkingsDescription = newValue;else if (field.equals("priority")) this.config.compMarkingsPriority = newValue;else if (field.equals("required")) this.config.compMarkingsRequired = newValue;else if (field.equals("heading")) this.config.compMarkingsHeading = newValue;
    },
    updateCompetencyTypeProperty: function updateCompetencyTypeProperty(field, newValue) {
      if (field.equals("label")) this.config.compTypeLabel = newValue;else if (field.equals("description")) this.config.compTypeDescription = newValue;else if (field.equals("priority")) this.config.compTypePriority = newValue;else if (field.equals("required")) this.config.compTypeRequired = newValue;else if (field.equals("heading")) this.config.compTypeHeading = newValue;
    },
    updateCompetencyCustomProperty: function updateCompetencyCustomProperty(propertyName, field, newValue) {
      var propToUpdate = this.getCustomProperty('competency', propertyName);
      if (field.equals("label")) propToUpdate.label = newValue;else if (field.equals("description")) propToUpdate.description = newValue;else if (field.equals("priority")) propToUpdate.priority = newValue;else if (field.equals("required")) propToUpdate.required = newValue;else if (field.equals("heading")) propToUpdate.heading = newValue;
    },
    updateCompetencyProperty: function updateCompetencyProperty(propertyName, field, newValue) {
      if (propertyName.equals("id")) this.updateCompetencyIdProperty(field, newValue);else if (propertyName.equals("name")) this.updateCompetencyNameProperty(field, newValue);else if (propertyName.equals("description")) this.updateCompetencyDescriptionProperty(field, newValue);else if (propertyName.equals("type")) this.updateCompetencyTypeProperty(field, newValue);else if (propertyName.equals("classification")) this.updateCompetencyClassificationProperty(field, newValue);else if (propertyName.equals("markings")) this.updateCompetencyMarkingsProperty(field, newValue);else this.updateCompetencyCustomProperty(propertyName, field, newValue);
    },
    updateFrameworkCompetencyProperty: function updateFrameworkCompetencyProperty(propertyParent, propertyName, field, newValue) {
      if (propertyParent.equals('framework')) this.updateFrameworkProperty(propertyName, field, newValue);else if (propertyParent.equals('taxonomy')) this.updateTaxonomyProperty(propertyName, field, newValue);else if (propertyParent.equals('taxon')) this.updateTaxonProperty(propertyName, field, newValue);else if (propertyParent.equals('competency')) this.updateCompetencyProperty(propertyName, field, newValue);
    },
    updateRelationshipProperty: function updateRelationshipProperty(relationship, field, newValue) {
      this.config.relationships[relationship][field] = newValue;
    },
    sortLevelList: function sortLevelList() {
      var me = this;
      this.levelList.sort(function (l1, l2) {
        var l1Enforced = me.localEnforcedLevelValues.includes(l1.shortId());
        var l2Enforced = me.localEnforcedLevelValues.includes(l2.shortId());
        if (l1Enforced !== l2Enforced) {
          if (l2Enforced) return 1;else return -1;
        } else {
          var l1Owned = me.doesAnyIdentityOwnObject(l1);
          var l2Owned = me.doesAnyIdentityOwnObject(l2);
          if (l1Owned !== l2Owned) {
            if (l2Owned) return 1;else return -1;
          } else {
            if (l1.getName() > l2.getName()) return 1;else if (l2.getName() > l1.getName()) return -1;else return 0;
          }
        }
      });
    },
    addPersonsToPermissionEntityList: function addPersonsToPermissionEntityList() {
      var _iterator9 = Object(createForOfIteratorHelper["a" /* default */])(this.personList),
        _step9;
      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var p = _step9.value;
          var pEcPk = this.getPersonEcPk(p);
          if (pEcPk) {
            var pe = {};
            pe.pk = pEcPk.toPem();
            pe.name = p.getName();
            pe.email = p.email;
            pe.type = 'Person';
            this.permissionEntityList.push(pe);
          }
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }
    },
    addGroupsToPermissionEntityList: function addGroupsToPermissionEntityList() {
      var _this2 = this;
      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee4() {
        var _iterator10, _step10, g, gEcPk, pe;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _iterator10 = Object(createForOfIteratorHelper["a" /* default */])(_this2.groupList);
              _context4.prev = 1;
              _iterator10.s();
            case 3:
              if ((_step10 = _iterator10.n()).done) {
                _context4.next = 11;
                break;
              }
              g = _step10.value;
              _context4.next = 7;
              return _this2.getOrganizationEcPk(g);
            case 7:
              gEcPk = _context4.sent;
              if (gEcPk) {
                pe = {};
                pe.pk = gEcPk.toPem();
                pe.name = g.getName();
                pe.email = 'n/a';
                pe.type = 'Group';
                _this2.permissionEntityList.push(pe);
              }
            case 9:
              _context4.next = 3;
              break;
            case 11:
              _context4.next = 16;
              break;
            case 13:
              _context4.prev = 13;
              _context4.t0 = _context4["catch"](1);
              _iterator10.e(_context4.t0);
            case 16:
              _context4.prev = 16;
              _iterator10.f();
              return _context4.finish(16);
            case 19:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[1, 13, 16, 19]]);
      }))();
    },
    sortPersonList: function sortPersonList() {
      this.personList.sort(function (p1, p2) {
        if (p1.getName() > p2.getName()) return 1;else if (p2.getName() > p1.getName()) return -1;else return 0;
      });
    },
    sortGroupList: function sortGroupList() {
      this.groupList.sort(function (g1, g2) {
        if (g1.getName() > g2.getName()) return 1;else if (g2.getName() > g1.getName()) return -1;else return 0;
      });
    },
    fetchGroupListForPermissionEntitySuccess: function fetchGroupListForPermissionEntitySuccess(ecoa) {
      var _this3 = this;
      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee5() {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _this3.groupList = ecoa;
              _this3.sortGroupList();
              _context5.next = 4;
              return _this3.addGroupsToPermissionEntityList();
            case 4:
              _this3.configDetailsBusy = false;
            case 5:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }))();
    },
    fetchGroupListForPermissionEntityFailure: function fetchGroupListForPermissionEntityFailure(msg) {
      appLog("Group search failure: " + msg);
      this.configDetailsBusy = false;
    },
    fetchPersonListForPermissionEntitySuccess: function fetchPersonListForPermissionEntitySuccess(ecpa) {
      this.personList = ecpa;
      this.sortPersonList();
      this.addPersonsToPermissionEntityList();
      this.configDetailsBusy = true;
      var paramObj = {};
      paramObj.size = this.GROUP_SEARCH_SIZE;
      EcOrganization.search(window.repo, '', this.fetchGroupListForPermissionEntitySuccess, this.fetchGroupListForPermissionEntityFailure, paramObj);
    },
    fetchPersonListForPermissionEntityFailure: function fetchPersonListForPermissionEntityFailure(msg) {
      appLog("Person search failure: " + msg);
      this.configDetailsBusy = false;
    },
    initializePermissionEntityList: function initializePermissionEntityList() {
      this.personList = [];
      this.groupList = [];
      this.permissionEntityList = [];
      this.configDetailsBusy = true;
      var paramObj = {};
      paramObj.size = this.PERSON_SEARCH_SIZE;
      EcPerson.search(window.repo, '', this.fetchPersonListForPermissionEntitySuccess, this.fetchPersonListForPermissionEntityFailure, paramObj);
    },
    initializeLevelListSuccess: function initializeLevelListSuccess(ecla) {
      if (ecla && ecla.length > 0) {
        this.levelList = ecla;
        this.sortLevelList();
      } else this.levelList = [];
      // this.configDetailsBusy = false;
      this.initializePermissionEntityList();
    },
    initializeLevelListFailure: function initializeLevelListFailure(msg) {
      appLog("Level search failure: " + msg);
      this.configDetailsBusy = false;
      // this.initializePermissionEntityList();
    },
    initializeDataLists: function initializeDataLists() {
      this.configDetailsBusy = true;
      var paramObj = {};
      paramObj.size = this.LEVEL_SEARCH_SIZE;
      EcLevel.search(window.repo, '', this.initializeLevelListSuccess, this.initializeLevelListFailure, paramObj);
    },
    isCassRelation: function isCassRelation(relType) {
      return this.cassRelations.includes(relType);
    },
    isAsnRelation: function isAsnRelation(relType) {
      return this.asnRelations.includes(relType);
    },
    isGemqRelation: function isGemqRelation(relType) {
      return this.gemqRelations.includes(relType);
    },
    isOtherRelation: function isOtherRelation(relType) {
      return !(this.cassRelations.includes(relType) || this.asnRelations.includes(relType) || this.gemqRelations.includes(relType));
    },
    filterTypes: function filterTypes() {
      var _this4 = this;
      this.filteredTypes = [];
      this.isOpenAutocomplete = true;
      var types = this.customPropertyAvailableTypes.filter(function (item) {
        return item.display.toLowerCase().indexOf(_this4.search.toLowerCase()) !== -1;
      });
      types.sort(function (a, b) {
        return a.display.localeCompare(b.display);
      });
      this.filteredTypes = Object(toConsumableArray["a" /* default */])(new Set(types));
    },
    selectType: function selectType(type) {
      // Check for duplicates
      if (!this.customPropertyPermittedTypes.some(function (e) {
        return e.value === type.value;
      })) {
        this.customPropertyPermittedTypes.push(type);
      }
      this.search = '';
      this.isOpenAutocomplete = false;
    },
    filterConcepts: function filterConcepts() {
      var _this5 = this;
      this.isOpenAutocomplete = true;
      this.filteredConcepts = this.customPropertyAvailableConcepts.filter(function (item) {
        return item.display.toLowerCase().indexOf(_this5.search.toLowerCase()) !== -1;
      });
    },
    selectConcept: function selectConcept(concept) {
      // Check for duplicates
      if (!this.customPropertyPermittedConcepts.some(function (e) {
        return e.value === concept.value;
      })) {
        this.customPropertyPermittedConcepts.push(concept);
      }
      this.search = '';
      this.isOpenAutocomplete = false;
    },
    removeType: function removeType(index) {
      this.customPropertyPermittedTypes.splice(index, 1);
    },
    removeConcept: function removeConcept(index) {
      this.customPropertyPermittedConcepts.splice(index, 1);
    },
    closeAutoComplete: function closeAutoComplete() {
      this.isOpenAutocomplete = false;
    }
  },
  computed: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["b" /* mapGetters */])({
    LANG_STRING_RANGE: 'configuration/LANG_STRING_RANGE',
    CONFIG_SEARCH_SIZE: 'configuration/CONFIG_SEARCH_SIZE',
    DEFAULT_CONFIGURATION_TYPE: 'configuration/DEFAULT_CONFIGURATION_TYPE',
    DEFAULT_CONFIGURATION_CONTEXT: 'configuration/DEFAULT_CONFIGURATION_CONTEXT',
    LANG_STRING_TYPE: 'configuration/LANG_STRING_TYPE',
    DEFAULT_HEADING: 'configuration/DEFAULT_HEADING',
    LEVEL_SEARCH_SIZE: 'configuration/LEVEL_SEARCH_SIZE',
    GROUP_SEARCH_SIZE: 'configuration/GROUP_SEARCH_SIZE',
    PERSON_SEARCH_SIZE: 'configuration/PERSON_SEARCH_SIZE',
    DEFAULT_CUSTOM_PROPERTY_CONTEXT: 'configuration/DEFAULT_CUSTOM_PROPERTY_CONTEXT',
    DEFAULT_CUSTOM_PROPERTY_RANGE: 'configuration/DEFAULT_CUSTOM_PROPERTY_RANGE'
  })), {}, {
    currentConfig: {
      get: function get() {
        return this.$store.getters['configuration/currentConfig'];
      },
      set: function set(val) {
        this.$store.commit('configuration/setCurrentConfig', val);
      }
    },
    customPropertyAvailableConcepts: {
      get: function get() {
        return this.$store.getters['configuration/availableConcepts'];
      },
      set: function set(val) {
        this.$store.commit('configuration/availableConcepts', val);
      }
    },
    customPropertyAvailableTypes: {
      get: function get() {
        var types = this.$store.getters['configuration/availableTypes'];
        this.currentConfig.compEnforcedTypes.forEach(function (type) {
          types.push(type);
        });
        return types;
      },
      set: function set(val) {
        this.$store.commit('configuration/availableTypes', val);
      }
    },
    isSetInstanceDisabled: function isSetInstanceDisabled() {
      if (!this.defaultConfigId) {
        // if there is no default instance set
        return false;
      } else if (this.defaultConfigId === this.config.id && !this.readOnly) {
        return false;
      } else {
        return true;
      }
    },
    isBrowserDefault: {
      get: function get() {
        if (this.config && this.defaultBrowserConfigId === this.config.id) {
          return true;
        } else {
          return false;
        }
      },
      set: function set(val) {
        appLog("val", val);
        if (val) {
          this.$emit('set-browser-default', this.config.id);
        } else {
          this.$emit('remove-browser-default-config');
        }
      }
    },
    customPropertyRangeReadable: function customPropertyRangeReadable() {
      if (this.customPropertyRange.equals('http://www.w3.org/2000/01/rdf-schema#langString')) return 'Lang-String';else if (this.customPropertyRange.equals('http://schema.org/URL')) return 'URL';else if (this.customPropertyRange.equals('http://schema.org/Text')) return 'Text';else if (this.customPropertyRange.equals('http://www.w3.org/2001/XMLSchema#dateTime')) return 'Date-Time';else if (this.customPropertyRange.equals('http://purl.org/dc/terms/date')) return 'Date';else if (this.customPropertyRange.equals('https://schema.cassproject.org/0.4/skos/Concept')) return 'SKOS Concept';else if (this.customPropertyRange.equals('https://schema.cassproject.org/0.4/Competency')) return 'Competency';else return 'Unknown';
    },
    shouldAllowCustomPropertyPermittedValues: function shouldAllowCustomPropertyPermittedValues() {
      if (this.customPropertyRange.equals('http://schema.org/Text')) return true;else return false;
    },
    shouldAllowCustomPropertyPermittedTypes: function shouldAllowCustomPropertyPermittedTypes() {
      if (this.customPropertyRange.equals('https://schema.cassproject.org/0.4/Competency')) return true;else return false;
    },
    shouldAllowCustomPropertyPermittedConcepts: function shouldAllowCustomPropertyPermittedConcepts() {
      if (this.customPropertyRange.equals('https://schema.cassproject.org/0.4/skos/Concept')) return true;else return false;
    },
    shouldAllowOnePerLangChoice: function shouldAllowOnePerLangChoice() {
      if (this.customPropertyRange.equals(this.LANG_STRING_RANGE)) return true;else return false;
    },
    filteredLevels: function filteredLevels() {
      var _this6 = this;
      if (!this.levelList || this.levelList.length <= 0) return [];else {
        return this.levelList.filter(function (level) {
          return level.getName() && level.getName().toLowerCase().indexOf(_this6.selectedLevelFilter.toLowerCase()) > -1;
        });
      }
    },
    filteredPermissionEntities: function filteredPermissionEntities() {
      var _this7 = this;
      if (!this.permissionEntityList || this.permissionEntityList.length <= 0) return [];else {
        return this.permissionEntityList.filter(function (pe) {
          return pe.name && pe.name.toLowerCase().indexOf(_this7.permissionEntitiesFilter.toLowerCase()) > -1;
        });
      }
    }
  }),
  mounted: function mounted() {
    this.initializeDataLists();
    this.defaultBrowserConfigId = this.getDefaultBrowserConfigId();
  }
});
// CONCATENATED MODULE: ./src/components/configuration/ConfigurationDetails.vue?vue&type=script&lang=js
 /* harmony default export */ var configuration_ConfigurationDetailsvue_type_script_lang_js = (ConfigurationDetailsvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/configuration/ConfigurationDetails.vue?vue&type=style&index=0&id=239cc231&prod&lang=scss&scoped=true
var ConfigurationDetailsvue_type_style_index_0_id_239cc231_prod_lang_scss_scoped_true = __webpack_require__("1d9c");

// CONCATENATED MODULE: ./src/components/configuration/ConfigurationDetails.vue






/* normalize component */

var ConfigurationDetails_component = Object(componentNormalizer["a" /* default */])(
  configuration_ConfigurationDetailsvue_type_script_lang_js,
  ConfigurationDetailsvue_type_template_id_239cc231_scoped_true_render,
  ConfigurationDetailsvue_type_template_id_239cc231_scoped_true_staticRenderFns,
  false,
  null,
  "239cc231",
  null
  
)

/* harmony default export */ var ConfigurationDetails = (ConfigurationDetails_component.exports);
// EXTERNAL MODULE: ./src/mixins/configuration.js
var configuration = __webpack_require__("a861");

// EXTERNAL MODULE: ./src/components/modalContent/DeleteConfigurationConfirm.vue + 4 modules
var DeleteConfigurationConfirm = __webpack_require__("b123");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"01d4e028-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/ConfigurationNotPermitted.vue?vue&type=template&id=8033986a

var ConfigurationNotPermittedvue_type_template_id_8033986a_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('modal-template', {
    attrs: {
      "active": true,
      "size": "small",
      "type": "danger"
    },
    on: {
      "close": function close($event) {
        return _vm.$emit('close');
      }
    }
  }, [_c('template', {
    slot: "modal-header"
  }, [_vm._v(" Not permitted ")]), _c('template', {
    slot: "modal-body"
  }, [_c('h3', {
    staticClass: "title is-size-4 has-text-weight-bold"
  }, [_vm._v(" Log in to access ")]), _c('p', [_vm._v(" This configuration has default owners and readers defined. You must be logged in to apply this configuration. ")])]), _c('template', {
    slot: "modal-foot"
  }, [_c('div', {
    staticClass: "buttons is-spaced"
  }, [_c('button', {
    staticClass: "button is-dark is-outlined",
    on: {
      "click": function click($event) {
        return _vm.$emit('cancel');
      }
    }
  }, [_vm._v(" OK ")]), _c('button', {
    staticClass: "button is-outlined is-danger",
    on: {
      "click": function click($event) {
        return _vm.$router.push({
          name: 'login',
          query: _vm.queryParams
        });
      }
    }
  }, [_vm._v(" Login ")])])])], 2);
};
var ConfigurationNotPermittedvue_type_template_id_8033986a_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/modalContent/ConfigurationNotPermitted.vue?vue&type=template&id=8033986a

// EXTERNAL MODULE: ./src/mixins/common.js
var common = __webpack_require__("872c");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/ConfigurationNotPermitted.vue?vue&type=script&lang=js



/* harmony default export */ var ConfigurationNotPermittedvue_type_script_lang_js = ({
  mixins: [cassUtil["a" /* cassUtil */], common["a" /* default */]],
  name: 'ConfigurationNotPermitted',
  components: {
    ModalTemplate: ModalTemplate["a" /* default */]
  },
  data: function data() {
    return {};
  },
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  methods: {},
  computed: {
    queryParams: function queryParams() {
      return this.$store.getters['editor/queryParams'];
    }
  }
});
// CONCATENATED MODULE: ./src/components/modalContent/ConfigurationNotPermitted.vue?vue&type=script&lang=js
 /* harmony default export */ var modalContent_ConfigurationNotPermittedvue_type_script_lang_js = (ConfigurationNotPermittedvue_type_script_lang_js); 
// CONCATENATED MODULE: ./src/components/modalContent/ConfigurationNotPermitted.vue





/* normalize component */

var ConfigurationNotPermitted_component = Object(componentNormalizer["a" /* default */])(
  modalContent_ConfigurationNotPermittedvue_type_script_lang_js,
  ConfigurationNotPermittedvue_type_template_id_8033986a_render,
  ConfigurationNotPermittedvue_type_template_id_8033986a_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ConfigurationNotPermitted = (ConfigurationNotPermitted_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"01d4e028-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/ConfigurationSetSuccess.vue?vue&type=template&id=62b452cc

var ConfigurationSetSuccessvue_type_template_id_62b452cc_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('modal-template', {
    attrs: {
      "size": "small",
      "active": true,
      "type": "success"
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
  }, [_vm._v(" Configuration set as browser default ")])]), _c('template', {
    slot: "modal-body"
  }, [_c('h3', {
    staticClass: "title is-size-4"
  }, [_c('span', {}, [_vm._v("Success")])]), _c('p', [_vm._v(" " + _vm._s(_vm.name) + " has been set as your browser's default CaSS Authoring Tool configuration. ")])]), _c('template', {
    slot: "modal-foot"
  }, [_c('div', {
    staticClass: "buttons is-spaced"
  }, [_c('button', {
    staticClass: "button is-dark is-outlined",
    on: {
      "click": function click($event) {
        return _vm.$emit('ok');
      }
    }
  }, [_vm._v(" Ok ")])])])], 2);
};
var ConfigurationSetSuccessvue_type_template_id_62b452cc_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/modalContent/ConfigurationSetSuccess.vue?vue&type=template&id=62b452cc

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/ConfigurationSetSuccess.vue?vue&type=script&lang=js



/* harmony default export */ var ConfigurationSetSuccessvue_type_script_lang_js = ({
  mixins: [cassUtil["a" /* cassUtil */], common["a" /* default */]],
  name: 'ConfigurationSetSuccess',
  components: {
    ModalTemplate: ModalTemplate["a" /* default */]
  },
  props: {
    name: {
      type: String,
      default: ''
    }
  }
});
// CONCATENATED MODULE: ./src/components/modalContent/ConfigurationSetSuccess.vue?vue&type=script&lang=js
 /* harmony default export */ var modalContent_ConfigurationSetSuccessvue_type_script_lang_js = (ConfigurationSetSuccessvue_type_script_lang_js); 
// CONCATENATED MODULE: ./src/components/modalContent/ConfigurationSetSuccess.vue





/* normalize component */

var ConfigurationSetSuccess_component = Object(componentNormalizer["a" /* default */])(
  modalContent_ConfigurationSetSuccessvue_type_script_lang_js,
  ConfigurationSetSuccessvue_type_template_id_62b452cc_render,
  ConfigurationSetSuccessvue_type_template_id_62b452cc_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ConfigurationSetSuccess = (ConfigurationSetSuccess_component.exports);
// EXTERNAL MODULE: ./src/components/configuration/ConfigurationList.vue + 9 modules
var ConfigurationList = __webpack_require__("2c3a");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ConfigurationEditor.vue?vue&type=script&lang=js








// @ is an alias to /src







/* harmony default export */ var ConfigurationEditorvue_type_script_lang_js = ({
  name: 'ConfigurationEditor',
  mixins: [cassUtil["a" /* cassUtil */], configuration["a" /* configuration */]],
  computed: {
    configViewMode: function configViewMode() {
      return this.$store.getters['configuration/configView'];
    },
    defaultBrowserConfigName: {
      get: function get() {
        return this.$store.getters['configuration/defaultBrowserConfigName'];
      },
      set: function set(val) {
        this.$store.commit('configuration/setDefaultBrowserConfigName', val);
      }
    },
    showConfirmDeleteConfigModal: {
      get: function get() {
        return this.$store.getters['configuration/showConfirmDeleteConfigModal'];
      },
      set: function set(val) {
        this.$store.commit('configuration/setShowConfirmDeleteConfigModal', val);
      }
    },
    showBrowserConfigSetModal: {
      get: function get() {
        return this.$store.getters['configuration/showBrowserConfigSetModal'];
      },
      set: function set(val) {
        this.$store.commit('configuration/setShowBrowserConfigSetModal', val);
      }
    },
    showMustBeLoggedInModal: {
      get: function get() {
        return this.$store.getters['configuration/showMustBeLoggedInModal'];
      },
      set: function set(val) {
        this.$store.commit('configuration/setShowMustBeLoggedInModal', val);
      }
    },
    configToDelete: {
      get: function get() {
        return this.$store.getters['configuration/configToDelete'];
      },
      set: function set(val) {
        this.$store.commit('configuration/setConfigToDelete', val);
      }
    },
    localDefaultBrowserConfigId: function localDefaultBrowserConfigId() {
      return this.$store.getters['configuration/localDefaultBrowserConfig'];
    },
    currentConfigIsReadOnly: function currentConfigIsReadOnly() {
      if (!this.currentConfig || !this.currentConfig.isOwned) return true;else if (this.currentConfig.isOwned) return false;else return true;
    }
  },
  data: function data() {
    return {
      configBusy: false,
      configList: [],
      complexConfigObject: {},
      defaultConfigId: null,
      frameworkConfigId: '',
      enforceHeadings: false
    };
  },
  components: {
    ConfigurationDetails: ConfigurationDetails,
    DeleteConfigurationConfirm: DeleteConfigurationConfirm["default"],
    ConfigurationNotPermitted: ConfigurationNotPermitted,
    ConfigurationSetSuccess: ConfigurationSetSuccess,
    ConfigurationList: ConfigurationList["a" /* default */]
  },
  methods: {
    handleDeleteConfigurationSuccess: function handleDeleteConfigurationSuccess() {
      appLog("Config delete success");
      this.configToDelete = {};
      this.buildConfigList();
      this.configBusy = false;
      this.showListView();
    },
    handleDeleteConfigurationFailure: function handleDeleteConfigurationFailure(msg) {
      appError("failed to delete configuration: " + msg);
      this.configToDelete = {};
      this.configBusy = false;
    },
    deleteConfiguration: function deleteConfiguration() {
      var _this = this;
      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee() {
        var configObj, repo;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _this.showConfirmDeleteConfigModal = false;
              _this.configBusy = true;
              _context.next = 4;
              return EcRepository.get(_this.configToDelete.id);
            case 4:
              configObj = _context.sent;
              if (configObj) {
                repo = window.repo;
                repo.deleteRegistered(configObj, _this.handleDeleteConfigurationSuccess, _this.handleDeleteConfigurationFailure);
              }
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    cancelConfigurationDelete: function cancelConfigurationDelete() {
      this.configToDelete = {};
      this.showConfirmDeleteConfigModal = false;
    },
    backFromEditCurrentConfig: function backFromEditCurrentConfig() {
      this.showListView();
      this.$store.commit('configuration/setCurrentConfig', {});
    },
    generateCustomPropertyNameId: function generateCustomPropertyNameId(customProp) {
      return customProp.context + customProp.propertyName;
    },
    determineHeadingStatusForCustomProperties: function determineHeadingStatusForCustomProperties(customProperties, headingsTracking) {
      if (customProperties != null) {
        var _iterator = Object(createForOfIteratorHelper["a" /* default */])(customProperties),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var prop = _step.value;
            if (prop.heading && !prop.heading.trim().equals('')) headingsTracking.anyHeadingsPopulated = true;else headingsTracking.anyHeadingsBlank = true;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    },
    determineHeadingStatus: function determineHeadingStatus(headingField, headingsTracking) {
      if (headingField && !headingField.trim().equals('')) headingsTracking.anyHeadingsPopulated = true;else headingsTracking.anyHeadingsBlank = true;
    },
    determineIfHeadingsShouldBeEnforced: function determineIfHeadingsShouldBeEnforced() {
      this.enforceHeadings = false;
      var headingsTracking = {};
      headingsTracking.anyHeadingsPopulated = false;
      headingsTracking.anyHeadingsBlank = false;
      this.determineHeadingStatus(this.currentConfig.compIdHeading, headingsTracking);
      this.determineHeadingStatus(this.currentConfig.compNameHeading, headingsTracking);
      this.determineHeadingStatus(this.currentConfig.compDescHeading, headingsTracking);
      this.determineHeadingStatus(this.currentConfig.compTypeHeading, headingsTracking);
      this.determineHeadingStatus(this.currentConfig.compClassHeading, headingsTracking);
      this.determineHeadingStatus(this.currentConfig.compMarkingsHeading, headingsTracking);
      this.determineHeadingStatus(this.currentConfig.levelHeading, headingsTracking);
      this.determineHeadingStatus(this.currentConfig.relationshipsHeading, headingsTracking);
      this.determineHeadingStatus(this.currentConfig.fwkIdHeading, headingsTracking);
      this.determineHeadingStatus(this.currentConfig.fwkNameHeading, headingsTracking);
      this.determineHeadingStatus(this.currentConfig.fwkDescHeading, headingsTracking);
      this.determineHeadingStatus(this.currentConfig.fwkClassHeading, headingsTracking);
      this.determineHeadingStatus(this.currentConfig.fwkMarkingsHeading, headingsTracking);
      this.determineHeadingStatusForCustomProperties(this.currentConfig.compCustomProperties, headingsTracking);
      this.determineHeadingStatusForCustomProperties(this.currentConfig.fwkCustomProperties, headingsTracking);
      if (headingsTracking.anyHeadingsPopulated && headingsTracking.anyHeadingsBlank) this.enforceHeadings = true;
    },
    generateComplexConfigObjectFromCurrentConfig: function generateComplexConfigObjectFromCurrentConfig() {
      var cco = new schema.Thing();
      cco.context = this.DEFAULT_CONFIGURATION_CONTEXT;
      cco.type = this.DEFAULT_CONFIGURATION_TYPE;
      this.addAllIdentityPksAsOwners(cco);
      if (this.currentConfig.isNew) cco.generateId(window.repo.selectedServer);else cco.id = this.currentConfig.id;
      cco.setName(this.currentConfig.name.trim());
      cco.setDescription(this.currentConfig.description.trim());
      cco.isDefault = this.currentConfig.isDefault;
      this.determineIfHeadingsShouldBeEnforced();
      this.addFrameworkConfigToObject(cco);
      this.addTaxonomyConfigToObject(cco);
      this.addTaxonConfigToObject(cco);
      this.addCompetencyConfigToObject(cco);
      this.addRelationsConfigToObject(cco);
      this.addLevelsConfigToObject(cco);
      this.addAlignmentConfigToObject(cco);
      this.addDefaultPermissionConfigToObject(cco);
      this.complexConfigObject = cco;
    },
    saveCurrentConfig: function saveCurrentConfig(enforcedLevels, defaultOwners, defaultReaders, defaultCommenters) {
      appLog("saveCurrentConfig: ");
      if (enforcedLevels && enforcedLevels.length > 0) {
        this.currentConfig.enforceLevelValues = true;
        this.currentConfig.enforcedLevelValues = enforcedLevels;
      } else this.currentConfig.enforceLevelValues = false;
      this.currentConfig.defaultOwners = defaultOwners;
      this.currentConfig.defaultReaders = defaultReaders;
      this.currentConfig.defaultCommenters = defaultCommenters;
      this.generateComplexConfigObjectFromCurrentConfig();
      appLog("complexConfigObject: ");
      appLog(JSON.stringify(this.complexConfigObject));
      this.configBusy = true;
      window.repo.saveTo(this.complexConfigObject, this.saveConfigToRepositorySuccess, this.saveConfigToRepositoryFailure);
    },
    saveConfigToRepositorySuccess: function saveConfigToRepositorySuccess(msg) {
      appLog("Config save success");
      this.buildConfigList();
      this.configBusy = false;
      this.showListView();
    },
    saveConfigToRepositoryFailure: function saveConfigToRepositoryFailure(msg) {
      appLog("Config save failure: " + msg);
      this.configBusy = false;
      this.showListView();
    },
    cancelEditCurrentConfig: function cancelEditCurrentConfig() {
      this.buildConfigList();
      this.showListView();
      this.currentConfig = {};
    },
    createNewConfig: function createNewConfig() {
      this.currentConfig = this.generateNewConfigObject();
      this.showDetailView();
    },
    closeBrowserConfigSetModal: function closeBrowserConfigSetModal() {
      this.$store.commit('configuration/setShowConfirmDeleteConfigModal', false);
    }
  }
});
// CONCATENATED MODULE: ./src/views/ConfigurationEditor.vue?vue&type=script&lang=js
 /* harmony default export */ var views_ConfigurationEditorvue_type_script_lang_js = (ConfigurationEditorvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/views/ConfigurationEditor.vue?vue&type=style&index=0&id=df0c5216&prod&lang=scss&scoped=true
var ConfigurationEditorvue_type_style_index_0_id_df0c5216_prod_lang_scss_scoped_true = __webpack_require__("24ba");

// CONCATENATED MODULE: ./src/views/ConfigurationEditor.vue






/* normalize component */

var ConfigurationEditor_component = Object(componentNormalizer["a" /* default */])(
  views_ConfigurationEditorvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  "df0c5216",
  null
  
)

/* harmony default export */ var ConfigurationEditor = __webpack_exports__["default"] = (ConfigurationEditor_component.exports);

/***/ }),

/***/ "b123":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"01d4e028-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/DeleteConfigurationConfirm.vue?vue&type=template&id=a46b56e4
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('modal-template', {
    attrs: {
      "active": true,
      "size": "small",
      "content": "delete-configuration",
      "type": "danger"
    },
    on: {
      "close": function close($event) {
        return _vm.$store.commit('app/closeModal');
      }
    }
  }, [_c('template', {
    slot: "modal-header"
  }, [_vm._v(" Delete Configuration ")]), _c('template', {
    slot: "modal-body"
  }, [_c('h3', {
    staticClass: "title is-size-4 has-text-weight-semibold"
  }, [_vm._v(" This action is permanent. ")]), _c('p', [_vm._v(" You are about to delete the above configuration. "), _c('b', [_vm._v("This action is unreversable.")]), _vm._v(" Once the configuration is deleted it will no longer be selectable to set as a browser or application default. ")])]), _c('template', {
    slot: "modal-foot"
  }, [_c('div', {
    staticClass: "buttons is-spaced"
  }, [_c('button', {
    staticClass: "button is-outlined is-danger",
    on: {
      "click": function click($event) {
        return _vm.$emit('confirm');
      }
    }
  }, [_vm._v(" Yes, Delete Configuration ")]), _c('button', {
    staticClass: "button is-dark",
    on: {
      "click": function click($event) {
        return _vm.$emit('cancel');
      }
    }
  }, [_vm._v(" Cancel ")])])])], 2);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/modalContent/DeleteConfigurationConfirm.vue?vue&type=template&id=a46b56e4

// EXTERNAL MODULE: ./src/components/modalContent/ModalTemplate.vue + 4 modules
var ModalTemplate = __webpack_require__("af07");

// EXTERNAL MODULE: ./src/mixins/cassUtil.js
var cassUtil = __webpack_require__("6d79");

// EXTERNAL MODULE: ./src/mixins/common.js
var common = __webpack_require__("872c");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/DeleteConfigurationConfirm.vue?vue&type=script&lang=js



/* harmony default export */ var DeleteConfigurationConfirmvue_type_script_lang_js = ({
  mixins: [cassUtil["a" /* cassUtil */], common["a" /* default */]],
  name: 'DeleteConfigurationConfirm',
  components: {
    ModalTemplate: ModalTemplate["a" /* default */]
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
  methods: {}
});
// CONCATENATED MODULE: ./src/components/modalContent/DeleteConfigurationConfirm.vue?vue&type=script&lang=js
 /* harmony default export */ var modalContent_DeleteConfigurationConfirmvue_type_script_lang_js = (DeleteConfigurationConfirmvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/modalContent/DeleteConfigurationConfirm.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  modalContent_DeleteConfigurationConfirmvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var DeleteConfigurationConfirm = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=configurationEditor.b3346a10.js.map