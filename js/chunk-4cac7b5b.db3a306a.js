(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-4cac7b5b"],{

/***/ "2f85":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Property_vue_vue_type_style_index_0_id_64a51a14_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c585");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Property_vue_vue_type_style_index_0_id_64a51a14_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Property_vue_vue_type_style_index_0_id_64a51a14_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "5e26":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__("caad");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("fb6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__("2532");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"11cfccab-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/lode/components/Property.vue?vue&type=template&id=64a51a14





var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _vm.expandedThing ? _c('div', {
    directives: [{
      name: "observe-visibility",
      rawName: "v-observe-visibility",
      value: _vm.visibilityChanged,
      expression: "visibilityChanged"
    }],
    class: ['lode__Property lode__' + _vm.shortTypeAsClass, _vm.editingPropertyClass, {
      'has-value': _vm.expandedValue
    }]
  }, [_c('modal-template', {
    attrs: {
      "active": _vm.removePropertyConfirmModal
    },
    on: {
      "close": _vm.closeModal
    }
  }, [_c('template', {
    slot: "modal-header"
  }, [_vm._v(" Confirm Remove Property ")]), _c('template', {
    slot: "modal-body"
  }, [_c('section', [_vm._v(" Are you sure you'd like to remove this property? ")])]), _c('template', {
    slot: "modal-foot"
  }, [_c('button', {
    staticClass: "is-danger is-outlined button",
    on: {
      "click": _vm.clickConfirmRemove
    }
  }, [_vm._v(" Confirm Remove Property ")]), _c('button', {
    staticClass: "is-dark button",
    on: {
      "click": _vm.closeModal
    }
  }, [_vm._v(" Cancel ")])])], 2), _vm.expandedValue && _vm.show ? [_vm._l(_vm.expandedValue, function (item, index) {
    return _c('div', {
      key: index,
      staticClass: "property-section"
    }, [_vm.editingProperty ? [index === 0 ? _c('label', {
      staticClass: "label is-medium",
      attrs: {
        "title": _vm.comment
      }
    }, [_vm._v(" " + _vm._s(_vm.displayLabel) + _vm._s(_vm.isRequired ? "*" : "") + " "), _vm.comment ? _c('i', {
      staticClass: "fa fa-info-circle has-text-dark",
      attrs: {
        "title": _vm.comment,
        "aria-hidden": "true"
      }
    }) : _vm._e()]) : _vm._e()] : _vm._e(), !_vm.editingProperty && _vm.isLink(item) && _vm.expandedProperty != '@id' && _vm.expandedProperty != 'registryURL' ? [_c(_vm.dynamicThing, {
      tag: "Component",
      staticClass: "lode__property",
      attrs: {
        "uri": item['@id'] || item['@value'],
        "clickToLoad": true,
        "competencyAsPropertyType": _vm.displayLabel,
        "competencyAsPropertyObjectType": _vm.objectType,
        "parentNotEditable": !_vm.canEdit,
        "profile": _vm.childProfile
      }
    }), _vm.editingProperty ? _c('div', {
      staticClass: "editing-property"
    }, [_c('div', {
      staticClass: "control"
    }, [_vm._m(0, true), _c('div', {
      staticClass: "button is-text has-text-danger",
      on: {
        "click": function click($event) {
          return _vm.showModal('remove', item);
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-times"
    })])])]) : _vm._e()] : !_vm.isText(item) ? _c('div', {
      staticClass: "non-text-field"
    }, [_c(_vm.dynamicThing, {
      tag: "Component",
      attrs: {
        "expandedObj": item,
        "competencyAsPropertyType": _vm.shortType,
        "competencyAsPropertyObjectType": _vm.objectType,
        "parentNotEditable": !_vm.canEdit,
        "profile": _vm.childProfile
      }
    }), _vm.editingProperty ? _c('div', {
      staticClass: "field delete-property-button"
    }, [_c('div', {
      staticClass: "control"
    }, [_vm._m(1, true), _c('div', {
      staticClass: "button is-outlined has-text-danger",
      on: {
        "click": function click($event) {
          return _vm.showModal('remove', item);
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-times"
    })])])]) : _vm._e()], 1) : _vm.profile && _vm.profile[_vm.expandedProperty] && _vm.isLink(item) && (_vm.profile[_vm.expandedProperty]['noTextEditing'] === 'true' || _vm.profile[_vm.expandedProperty]['readOnly'] === 'true' || _vm.profile[_vm.expandedProperty]['noTextEditing'] === true || _vm.profile[_vm.expandedProperty]['readOnly'] === true) ? _c('div', {
      staticClass: "read-only__link"
    }, [_vm.editingThing ? _c('label', [_vm._v(" " + _vm._s(_vm.expandedValueNames[index]) + " ")]) : _vm._e(), _c('div', {
      staticClass: "field is-grouped"
    }, [!_vm.editingProperty ? _c('span', {
      staticClass: "tag is-size-7 is-light"
    }, [_vm._v(_vm._s(_vm.displayLabel))]) : _vm._e(), _c('p', {
      staticClass: "control"
    }, [_c('span', {
      directives: [{
        name: "clipboard",
        rawName: "v-clipboard",
        value: _vm.getURL(item),
        expression: "getURL(item)"
      }, {
        name: "clipboard",
        rawName: "v-clipboard:success",
        value: _vm.clipboardSuccess,
        expression: "clipboardSuccess",
        arg: "success"
      }, {
        name: "clipboard",
        rawName: "v-clipboard:error",
        value: _vm.clipboardError,
        expression: "clipboardError",
        arg: "error"
      }],
      staticClass: "icon",
      attrs: {
        "title": "Copy URL to the clipboard."
      }
    }, [_vm.showClipboardSuccessMessage && _vm.isCopied(item) ? _c('i', {
      staticClass: "fa fa-check has-text-success"
    }) : _c('i', {
      staticClass: "fa fa-copy has-text-primary",
      attrs: {
        "name": "copyURL",
        "expandedProperty": _vm.expandedProperty,
        "expandedValue": _vm.expandedValue
      }
    })])]), _c('a', {
      staticClass: "control is-expanded is-id",
      attrs: {
        "title": item['@id'] || item['@value']
      }
    }, [_vm._v(" " + _vm._s(item['@id'] || item['@value']) + " ")]), _vm.editingProperty ? _c('div', {
      staticClass: "control"
    }, [_c('div', {
      staticClass: "button disabled is-text has-text-danger",
      attrs: {
        "disabled": _vm.shortType === 'id'
      },
      on: {
        "click": function click($event) {
          return _vm.showModal('remove', index);
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-times"
    })])]) : _vm._e()])]) : _vm.editingProperty && typeof item === 'String' && _vm.profile && _vm.profile[_vm.expandedProperty] && (_vm.profile[_vm.expandedProperty]['noTextEditing'] === 'true' || _vm.profile[_vm.expandedProperty]['readOnly'] === 'true' || _vm.profile[_vm.expandedProperty]['noTextEditing'] === true || _vm.profile[_vm.expandedProperty]['readOnly'] === true) ? _c('div', {
      staticClass: "editing-string__read-only"
    }, [_c('div', {
      staticClass: "field"
    }, [_c('div', {
      staticClass: "control"
    }, [_c('div', {
      staticClass: "uneditable"
    }, [_vm._v(" " + _vm._s(item) + " ")])])]), _vm.editingProperty ? _c('div', {
      staticClass: "field delete-property-button"
    }, [_c('div', {
      staticClass: "control"
    }, [_vm._m(2, true), _c('div', {
      staticClass: "button is-text has-text-danger",
      on: {
        "click": function click($event) {
          return _vm.showModal('remove', item);
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-times"
    })])])]) : _vm._e()]) : _vm.editingProperty && _vm.profile && _vm.profile[_vm.expandedProperty] && (_vm.profile[_vm.expandedProperty]['noTextEditing'] === 'true' || _vm.profile[_vm.expandedProperty]['readOnly'] === 'true' || _vm.profile[_vm.expandedProperty]['noTextEditing'] === true || _vm.profile[_vm.expandedProperty]['readOnly'] === true) ? _c('div', {
      staticClass: "editing-non-string__read-only"
    }, [_c('div', {
      staticClass: "field"
    }, [_c('div', {
      staticClass: "control"
    }, [_c('div', {
      staticClass: "uneditable"
    }, [_vm._v(" " + _vm._s(item["@value"]) + " ")])])])]) : _vm.range && _vm.range.length > 0 && _vm.range[0].toLowerCase().indexOf('concept') !== -1 ? _c('div', [_vm.editingProperty && _vm.limitedConcepts.length > 0 ? _c('div', [_c('PropertyString', {
      attrs: {
        "index": index,
        "propertyValue": _vm.expandedThing[_vm.expandedProperty][index],
        "expandedProperty": _vm.expandedProperty,
        "expandedThing": _vm.expandedThing,
        "expandedValue": _vm.expandedValue,
        "langString": _vm.langString,
        "range": _vm.range,
        "view": _vm.view,
        "options": _vm.limitedConcepts,
        "profile": _vm.profile
      },
      on: {
        "removeByValue": function removeByValue($event) {
          return _vm.removeByValue($event);
        },
        "remove": function remove($event) {
          return _vm.remove(item);
        }
      }
    })], 1) : _c('div', [_c('div', {
      staticClass: "field is-grouped"
    }, [!_vm.editingProperty ? _c('span', {
      staticClass: "tag is-size-7 is-light"
    }, [_vm._v(_vm._s(_vm.displayLabel))]) : _vm._e(), _c('p', {
      staticClass: "control"
    }, [_c('span', {
      directives: [{
        name: "clipboard",
        rawName: "v-clipboard",
        value: _vm.getURL(item),
        expression: "getURL(item)"
      }, {
        name: "clipboard",
        rawName: "v-clipboard:success",
        value: _vm.clipboardSuccess,
        expression: "clipboardSuccess",
        arg: "success"
      }, {
        name: "clipboard",
        rawName: "v-clipboard:error",
        value: _vm.clipboardError,
        expression: "clipboardError",
        arg: "error"
      }],
      staticClass: "icon",
      attrs: {
        "title": "Copy URL to the clipboard."
      }
    }, [_vm.showClipboardSuccessMessage && _vm.isCopied(item) ? _c('i', {
      staticClass: "fa fa-check has-text-success"
    }) : _c('i', {
      staticClass: "fa fa-copy has-text-primary",
      attrs: {
        "name": "copyURL",
        "expandedProperty": _vm.expandedProperty,
        "expandedValue": _vm.expandedValue
      }
    })])]), _c('a', {
      staticClass: "control is-expanded is-id",
      attrs: {
        "title": item['@id'] || item['@value']
      }
    }, [_vm._v(" " + _vm._s(item['@id'] || item['@value']) + " ")]), _vm.editingProperty ? _c('div', {
      staticClass: "control"
    }, [_c('div', {
      staticClass: "button disabled is-text has-text-danger",
      attrs: {
        "disabled": _vm.shortType === 'id'
      },
      on: {
        "click": function click($event) {
          return _vm.showModal('remove', index);
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-times"
    })])]) : _vm._e()])])]) : _vm.profile && _vm.profile[_vm.expandedProperty] && _vm.profile[_vm.expandedProperty]['isDirectLink'] && (_vm.profile[_vm.expandedProperty]['isDirectLink'] === 'true' || _vm.profile[_vm.expandedProperty]['isDirectLink'] === true) ? _c('div', [_c('div', {
      staticClass: "field is-grouped"
    }, [!_vm.editingProperty ? _c('span', {
      staticClass: "tag is-size-7 is-light"
    }, [_vm._v(_vm._s(_vm.displayLabel))]) : _vm._e(), _c('p', {
      staticClass: "control"
    }, [_c('span', {
      directives: [{
        name: "clipboard",
        rawName: "v-clipboard",
        value: _vm.getURL(item),
        expression: "getURL(item)"
      }, {
        name: "clipboard",
        rawName: "v-clipboard:success",
        value: _vm.clipboardSuccess,
        expression: "clipboardSuccess",
        arg: "success"
      }, {
        name: "clipboard",
        rawName: "v-clipboard:error",
        value: _vm.clipboardError,
        expression: "clipboardError",
        arg: "error"
      }],
      staticClass: "icon",
      attrs: {
        "title": "Copy URL to the clipboard."
      }
    }, [_vm.showClipboardSuccessMessage && _vm.isCopied(item) ? _c('i', {
      staticClass: "fa fa-check has-text-success"
    }) : _c('i', {
      staticClass: "fa fa-copy has-text-primary",
      attrs: {
        "name": "copyURL",
        "expandedProperty": _vm.expandedProperty,
        "expandedValue": _vm.expandedValue
      }
    })])]), _c('a', {
      staticClass: "control is-expanded is-id",
      attrs: {
        "title": item['@id'] || item['@value']
      }
    }, [_vm._v(" " + _vm._s(item['@id'] || item['@value']) + " ")]), _vm.editingProperty ? _c('div', {
      staticClass: "control"
    }, [_c('div', {
      staticClass: "button disabled is-text has-text-danger",
      attrs: {
        "disabled": _vm.shortType === 'id'
      },
      on: {
        "click": function click($event) {
          return _vm.showModal('remove', index);
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-times"
    })])]) : _vm._e()])]) : _vm.editingProperty && !_vm.checkedOptions && !(_vm.limitedConcepts.length > 0) && !(_vm.limitedTypes.length > 0) ? _c('div', {
      staticClass: "property"
    }, [_c('PropertyString', {
      attrs: {
        "index": index,
        "propertyValue": _vm.expandedThing[_vm.expandedProperty][index],
        "expandedProperty": _vm.expandedProperty,
        "expandedThing": _vm.expandedThing,
        "expandedValue": _vm.expandedValue,
        "langString": _vm.langString,
        "range": _vm.range,
        "view": _vm.view,
        "addSingle": _vm.isNotDeletable(),
        "options": _vm.profile && _vm.profile[_vm.expandedProperty] && _vm.profile[_vm.expandedProperty]['options'] ? _vm.profile[_vm.expandedProperty]['options'] : null,
        "profile": _vm.profile
      },
      on: {
        "removeByValue": function removeByValue($event) {
          return _vm.removeByValue($event);
        },
        "remove": function remove($event) {
          return _vm.remove(item);
        }
      }
    })], 1) : _vm.isObject(_vm.expandedValue[index]) && _vm.expandedValue[index]['@language'] ? _c('div', {
      staticClass: "expanded-view__has-language"
    }, [_vm.expandedProperty !== 'http://schema.org/name' && _vm.expandedProperty !== 'dcterms:title' && _vm.expandedProperty !== 'skos:prefLabel' ? _c('span', {
      staticClass: "tag is-size-7 is-light"
    }, [_vm._v(_vm._s(_vm.displayLabel))]) : _vm._e(), _c('span', {
      staticClass: "language",
      on: {
        "click": function click($event) {
          return _vm.setCheckbox($event);
        }
      }
    }, [_vm._v(" " + _vm._s(_vm.expandedValue[index]["@language"] + ": ") + " ")]), _c('span', {
      staticClass: "value",
      attrs: {
        "title": _vm.expandedValue[index]['@value']
      },
      on: {
        "click": function click($event) {
          return _vm.setCheckbox($event);
        }
      }
    }, [_vm._v(" " + _vm._s(_vm.expandedValue[index]["@value"]) + " ")])]) : _vm.isObject(_vm.expandedValue[index]) ? _c('div', {
      staticClass: "expanded-view-property"
    }, [_c('div', {
      staticClass: "property",
      class: _vm.customDisplay,
      attrs: {
        "title": _vm.expandedValue[index]['@value']
      }
    }, [_vm.type && _vm.type.includes('resource') ? [_c('span', {
      staticClass: "tag is-light is-link"
    }, [_vm._v(_vm._s(_vm.type))]), _c('a', {
      staticClass: "custom-link is-size-6 external",
      attrs: {
        "title": "Open resource in new window",
        "href": _vm.expandedValue[index]['@value'],
        "target": "_blank"
      }
    }, [_vm._v(_vm._s(_vm.expandedValue[index]["@value"]))])] : [_vm.customTitle ? _c('span', {
      staticClass: "tag is-size-7 is-light"
    }, [_vm._v(_vm._s(_vm.displayLabel))]) : _vm._e(), _vm._v(" " + _vm._s(_vm.expandedValue[index]["@value"]) + " ")]], 2)]) : _c('div', {
      staticClass: "unexpanded-property"
    }, [_c('span', {
      staticClass: "tag is-size-7 is-light"
    }, [_vm._v(_vm._s(_vm.displayLabel))]), _c('div', {
      staticClass: "property"
    }, [_vm._v(" " + _vm._s(_vm.expandedValue[index]) + " ")])])], 2);
  }), _vm.editingProperty && _vm.checkedOptions && _vm.show && _vm.profile && _vm.profile[_vm.expandedProperty] && _vm.profile[_vm.expandedProperty]['options'] ? _vm._l(_vm.optionsArray, function (each) {
    return _c('div', {
      key: each,
      staticClass: "field"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.checkedOptions,
        expression: "checkedOptions"
      }],
      staticClass: "is-checkradio",
      attrs: {
        "type": "checkbox",
        "name": each.val,
        "id": each.val
      },
      domProps: {
        "value": each.val,
        "checked": Array.isArray(_vm.checkedOptions) ? _vm._i(_vm.checkedOptions, each.val) > -1 : _vm.checkedOptions
      },
      on: {
        "change": function change($event) {
          var $$a = _vm.checkedOptions,
            $$el = $event.target,
            $$c = $$el.checked ? true : false;
          if (Array.isArray($$a)) {
            var $$v = each.val,
              $$i = _vm._i($$a, $$v);
            if ($$el.checked) {
              $$i < 0 && (_vm.checkedOptions = $$a.concat([$$v]));
            } else {
              $$i > -1 && (_vm.checkedOptions = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
            }
          } else {
            _vm.checkedOptions = $$c;
          }
        }
      }
    }), _c('label', {
      attrs: {
        "for": each.val
      }
    }, [_vm._v(" " + _vm._s(each.name) + " ")])]);
  }) : _vm._e(), _vm.errorValidating ? _c('p', {
    staticClass: "help is-danger"
  }, [_vm._v(" " + _vm._s(_vm.errorValidating) + " ")]) : _vm._e()] : [_c('div', {
    staticClass: "property-value"
  }, [_vm.canEdit ? _c('div', {
    staticClass: "add-property-button"
  }, [_vm.range.length == 0 && _vm.addOrSearch !== 'search' ? _c('button', {
    staticClass: "button is-small is-link has-text-info",
    attrs: {
      "title": 'Add New ' + _vm.displayLabel
    },
    on: {
      "click": function click($event) {
        $event.stopPropagation();
        _vm.add('string');
        _vm.startEditing();
      }
    }
  }, [_vm._m(3), _c('span', [_vm._v(" Add " + _vm._s(_vm.displayLabel) + " ")])]) : _vm.addOrSearch !== 'search' ? _vm._l(_vm.range, function (targetType) {
    return _c('button', {
      key: targetType,
      staticClass: "button is-small is-text has-text-info",
      attrs: {
        "title": 'Add New ' + _vm.displayLabel
      },
      on: {
        "click": function click($event) {
          $event.stopPropagation();
          _vm.add(targetType);
          _vm.startEditing();
        }
      }
    }, [_vm._m(4, true), _c('span', [_vm._v(" Add " + _vm._s(_vm.displayLabel) + " ")])]);
  }) : _vm._e()], 2) : _vm._e()]), _c('p', {
    staticClass: "help is-danger"
  }, [_vm._v(" " + _vm._s(_vm.errorMessage[0]) + " ")])]], 2) : _vm._e();
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('label', [_c('br')]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('label', [_c('br')]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('label', [_c('br')]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-plus has-text-info",
    attrs: {
      "aria-hidden": "true"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon has-text-dark"
  }, [_c('i', {
    staticClass: "fa fa-plus has-text-info",
    attrs: {
      "aria-hidden": "true"
    }
  })]);
}];

// CONCATENATED MODULE: ./src/lode/components/Property.vue?vue&type=template&id=64a51a14

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
var regeneratorRuntime = __webpack_require__("c7eb");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.join.js
var es_array_join = __webpack_require__("a15b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__("a434");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.json.stringify.js
var es_json_stringify = __webpack_require__("e9c4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__("3ca3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__("5319");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.trim.js
var es_string_trim = __webpack_require__("498a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("159b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// EXTERNAL MODULE: ./src/scss/property.scss
var property = __webpack_require__("61ed");

// EXTERNAL MODULE: ./src/components/modalContent/ModalTemplate.vue + 4 modules
var ModalTemplate = __webpack_require__("af07");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/lode/components/Property.vue?vue&type=script&lang=js



















/* harmony default export */ var Propertyvue_type_script_lang_js = ({
  // Property represents one property of a Thing.
  name: 'Property',
  props: {
    // The expandedThing that we're a property of.
    expandedThing: Object,
    // Our fully qualified property id (relative to this.expandedThing)
    expandedProperty: String,
    // The schema segment that describes us.
    schema: Object,
    // Whether the thing is editable by the current user.
    canEdit: Boolean,
    // Application profile, to pass along to the Thing children we have.
    profile: Object,
    editingThing: Boolean,
    validate: Boolean,
    errorMessage: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    view: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      clickToLoad: true,
      showClipboardSuccessMessage: false,
      // True if we are in edit mode.
      show: true,
      langString: false,
      addOrSearch: null,
      checkedOptions: null,
      initialValue: null,
      expandedValueNames: [],
      optionsArray: [],
      limitedTypes: [],
      limitedConcepts: [],
      errorValidating: null,
      removePropertyConfirmModal: false,
      propertyToRemove: null,
      expandedValue: [],
      copiedItem: null
    };
  },
  components: {
    // Circular references require this trick.
    Thing: function Thing() {
      return Promise.resolve(/* import() */).then(__webpack_require__.bind(null, "098b"));
    },
    ThingEditing: function ThingEditing() {
      return Promise.all(/* import() */[__webpack_require__.e("chunk-6a6fd63e"), __webpack_require__.e("chunk-2d0d5fe2"), __webpack_require__.e("chunk-576b8942"), __webpack_require__.e("chunk-51c69438"), __webpack_require__.e("chunk-6b291276")]).then(__webpack_require__.bind(null, "8051"));
    },
    // Property editing box for String type things. Should be one of these for each value type.
    PropertyString: function PropertyString() {
      return __webpack_require__.e(/* import() */ "chunk-0e6d8a6f").then(__webpack_require__.bind(null, "d17f"));
    },
    ModalTemplate: ModalTemplate["a" /* default */]
  },
  created: function created() {
    var me = this;
    if (this.editingThing) {
      if (this.range.length === 1 && this.range[0].toLowerCase().indexOf("langstring") !== -1) {
        this.getExpandedValue();
        this.langString = true;
        for (var i = 0; i < this.expandedValue.length; i++) {
          if (!this.expandedValue[i]["@language"]) {
            this.$parent.update(this.expandedProperty, i, {
              "@language": this.$store.state.editor.defaultLanguage,
              "@value": this.expandedValue[i]["@value"]
            }, function () {
              me.stopEditing();
            });
          }
        }
      }
      this.$store.commit('lode/incrementNumPropertyComponents', EcRemoteLinkedData.trimVersionFromUrl(this.expandedThing["@id"]));
    }
  },
  mounted: function () {
    var _mounted = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee() {
      var _this = this;
      var i, _i, _i2, item, url, _i3, option, options;
      return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            this.limitedType = [];
            if (this.range && this.range.length > 0 && this.range[0].toLowerCase().indexOf("level") !== -1 && this.profile && this.profile[this.expandedProperty] && this.profile[this.expandedProperty]['options']) {
              this.checkedOptions = [];
              if (this.expandedValue.length > 0) {
                for (i = 0; i < this.expandedValue.length; i++) {
                  this.checkedOptions.push(this.expandedValue[i]["@id"]);
                }
              }
            }
            if (!(this.range && this.range.length > 0 && this.range[0].toLowerCase().indexOf("concept") !== -1 && this.profile && this.profile[this.expandedProperty] && this.profile[this.expandedProperty]['options'])) {
              _context.next = 10;
              break;
            }
            _i = 0;
          case 4:
            if (!(_i < this.profile[this.expandedProperty]['options'].length)) {
              _context.next = 10;
              break;
            }
            _context.next = 7;
            return EcConceptScheme.get(this.profile[this.expandedProperty]['options'][_i].val).then(function (scheme) {
              if (scheme) {
                scheme['skos:hasTopConcept'].forEach(function (conceptUri) {
                  _this.addConceptInner(conceptUri);
                });
              }
            });
          case 7:
            _i++;
            _context.next = 4;
            break;
          case 10:
            if (this.expandedThing[this.expandedProperty]) {
              this.initialValue = JSON.parse(JSON.stringify(this.expandedThing[this.expandedProperty]));
            } else {
              this.initialValue = null;
            }
            // show competency as property names
            if (this.objectType === 'Competency' || this.objectType === "Concept" || this.objectType === "Level") {
              this.expandedValueNames = [];
              for (_i2 = 0; _i2 < this.expandedValue.length; _i2++) {
                item = this.expandedValue[_i2];
                url = this.getURL(item);
                this.resolveNameFromUrl(url);
              }
            }
            if (!(this.profile && this.profile[this.expandedProperty] && this.profile[this.expandedProperty]['options'] && this.checkedOptions)) {
              _context.next = 23;
              break;
            }
            _i3 = 0;
          case 14:
            if (!(_i3 < this.profile[this.expandedProperty]['options'].length)) {
              _context.next = 23;
              break;
            }
            option = this.profile[this.expandedProperty]['options'][_i3];
            _context.next = 18;
            return EcRepository.get(option.val);
          case 18:
            option.name = _context.sent.name;
            this.optionsArray.push(option);
          case 20:
            _i3++;
            _context.next = 14;
            break;
          case 23:
            if (this.profile && this.profile[this.expandedProperty] && this.profile[this.expandedProperty]["isDirectLink"] && (this.profile[this.expandedProperty]["isDirectLink"] === 'true' || this.profile[this.expandedProperty]["isDirectLink"] === true)) {
              if (this.profile[this.expandedProperty]['options']) {
                options = this.profile[this.expandedProperty]['options'];
                options.forEach(function (option) {
                  _this.limitedTypes.push(option);
                });
              }
            }
          case 24:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }));
    function mounted() {
      return _mounted.apply(this, arguments);
    }
    return mounted;
  }(),
  destroyed: function destroyed() {
    if (this.editingThing) {
      this.$store.commit('lode/decrementNumPropertyComponents', EcRemoteLinkedData.trimVersionFromUrl(this.expandedThing["@id"]));
    }
  },
  computed: {
    queryParams: function queryParams() {
      return this.$store.getters['editor/queryParams'];
    },
    customTitle: function customTitle() {
      if (this.profile && this.isCompetency && this.queryParams.ceasnDataFields === 'true') {
        return true;
      }
      return this.expandedProperty !== 'http://schema.org/name' && this.expandedProperty !== 'dcterms:title' && this.expandedProperty !== 'skos:prefLabel';
    },
    customDisplay: function customDisplay() {
      if (this.isCompetency && this.queryParams.ceasnDataFields === 'true') {
        if (this.expandedProperty.includes('name')) {
          return 'has-text-weight-normal';
        }
      }
      return '';
    },
    shortTypeAsClass: function shortTypeAsClass() {
      if (this.objectType === "Level") {
        return this.objectType;
      }
      if (this.expandedProperty === "http://schema.org/name") {
        return "name";
      }
      return this.shortType.replace(/ /g, "_");
    },
    dynamicThing: function dynamicThing() {
      if (this.editingProperty) {
        return 'ThingEditing';
      } else {
        return 'Thing';
      }
    },
    isCompetency: function isCompetency() {
      if (this.expandedThing["@type"][0].includes('Competency')) {
        return true;
      } else {
        return false;
      }
    },
    editingProperty: function editingProperty() {
      return this.editingThing;
    },
    editingPropertyClass: function editingPropertyClass() {
      if (this.editingProperty) {
        return 'editing';
      } else {
        return '';
      }
    },
    childProfile: function childProfile() {
      var isFunction = function isFunction(obj) {
        return !!(obj && obj.constructor && obj.call && obj.apply);
      };
      if (this.schema == null) return null;
      var p = this.schema.profile;
      if (isFunction(p)) {
        p = p();
      }
      return p;
    },
    // Display label for the property.
    displayLabel: function displayLabel() {
      // Look in schema first
      if (this.schema != null && this.schema["http://www.w3.org/2000/01/rdf-schema#label"] != null && !EcArray.isArray(this.schema["http://www.w3.org/2000/01/rdf-schema#label"]) && !EcObject.isObject(this.schema["http://www.w3.org/2000/01/rdf-schema#label"])) {
        return this.schema["http://www.w3.org/2000/01/rdf-schema#label"];
      }
      if (this.schema != null && this.schema["http://www.w3.org/2000/01/rdf-schema#label"] != null && EcArray.isArray(this.schema["http://www.w3.org/2000/01/rdf-schema#label"]) && EcObject.isObject(this.schema["http://www.w3.org/2000/01/rdf-schema#label"][0])) {
        return this.schema["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
      }
      if (this.schema != null && this.schema["http://www.w3.org/2000/01/rdf-schema#label"] != null && EcObject.isObject(this.schema["http://www.w3.org/2000/01/rdf-schema#label"])) {
        return this.schema["http://www.w3.org/2000/01/rdf-schema#label"]["@value"];
      }

      // Make something up from the property name.
      var property = this.expandedProperty.split("/").pop();
      return property.replace(/([A-Z]+)/g, function (m) {
        return " " + m;
      }).toLowerCase().trim().replace(/(^| )(\w)/g, function (x) {
        return x.toUpperCase();
      });
    },
    // Description of the property, for hover or information hovers.
    comment: function comment() {
      if (this.schema == null) return null;
      if (this.schema['http://www.w3.org/2000/01/rdf-schema#comment'] == null) return null;
      if (this.schema['http://www.w3.org/2000/01/rdf-schema#comment'][0] == null) return null;
      return this.schema['http://www.w3.org/2000/01/rdf-schema#comment'][0]['@value'];
    },
    // The fully qualified property id.
    type: function type() {
      if (this.schema == null) {
        if (this.expandedThing == null) {
          return null;
        }
        return this.expandedThing["@type"][0];
      }
      return this.schema["@id"];
    },
    // The shortened (one word) property id.
    shortType: function shortType() {
      if (!this.type) {
        return this.displayLabel;
      }
      var short = this.type.split("/").pop();
      if (short.indexOf("core#") !== -1) {
        short = this.type.split("#").pop();
      }
      return short;
    },
    // The namespace of the property id.
    context: function context() {
      var ary = this.type.split("/");
      ary.pop();
      return ary.join("/");
    },
    // The permitted list of types that can go into this property.
    range: function range() {
      // TODO: Inheritance tree
      if (this.schema == null) return [];
      var results = [];
      var ary = this.schema["http://schema.org/rangeIncludes"];
      if (ary != null || ary !== undefined) {
        for (var i = 0; i < ary.length; i++) {
          results.push(ary[i]["@id"]);
        }
      }
      return results;
    },
    // Checks cardinality of the property and doesn't allow user to add more than one value when max is 1
    canAdd: function canAdd() {
      if (this.profile && this.profile[this.expandedProperty] && this.profile[this.expandedProperty]["max"] === 1) {
        if (this.expandedValue.length === 1) {
          return false;
        }
      }
      if (!this.editingProperty) {
        return false;
      }
      return this.canEdit;
    },
    // Used to remove click event when item should not be edited. Necessary because of event propagation and nested components.
    clickHandler: function clickHandler() {
      if (this.canEdit) {
        return "click";
      } else {
        return null;
      }
    },
    objectType: function objectType() {
      if (this.range && this.range[0] && this.range[0].toLowerCase().indexOf('level') !== -1) {
        return "Level";
      } else if (this.range && this.range[0] && this.range[0].toLowerCase().indexOf('concept') !== -1) {
        return "Concept";
      } else if (this.range && this.range[0] && this.range[0].toLowerCase().indexOf('competency') !== -1) {
        return "Competency";
      } else {
        return "";
      }
    },
    isRequired: function isRequired() {
      if (this.profile && this.profile[this.expandedProperty] && (this.profile[this.expandedProperty]["isRequired"] === 'true' || this.profile[this.expandedProperty]["isRequired"] === true)) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    setCheckbox: function setCheckbox(event) {
      event.preventDefault();
      this.$emit('set-checkbox');
    },
    addConceptInner: function addConceptInner(conceptUri) {
      var _this2 = this;
      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee2() {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              EcConcept.get(conceptUri).then(function (concept) {
                _this2.limitedConcepts.push({
                  display: EcRemoteLinkedData.getDisplayStringFrom(concept['skos:prefLabel']),
                  val: conceptUri
                });
                if (concept['skos:narrower'] != null) {
                  for (var i = 0; i < concept['skos:narrower'].length; i++) {
                    _this2.addConceptInner(concept['skos:narrower'][i]);
                  }
                }
              });
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))();
    },
    resolveNameFromUrl: function resolveNameFromUrl(url) {
      var me = this;
      // Try repo first to use cache if possible
      EcRepository.get(url, function (success) {
        var name = success.name;
        if (!name) {
          name = success["skos:prefLabel"];
        }
        name = schema.Thing.getDisplayStringFrom(name);
        // If still object, display value
        if (EcObject.isObject(name)) {
          var langs = Object.keys(name);
          name = name[langs[0]];
        }
        me.expandedValueNames.push(name);
      }, function (failure) {
        me.get(url, null, null, function (data) {
          var name = null;
          if (data) {
            if (data[0] === "<") {
              return;
            }
            if (data['ceterms:name']) {
              name = data['ceterms:name'];
            } else if (data['ceasn:competencyText']) {
              name = data['ceasn:competencyText'];
            } else if (data['name']) {
              name = data['name'];
            } else if (data['schema:name']) {
              name = data['schema:name'];
            } else if (data['title']) {
              name = data['title'];
            } else if (data['skos:prefLabel']) {
              name = data['skos:prefLabel'];
            } else if (data['title']) {
              name = data['title'];
            } else if (data['@graph'] && data['@graph'][0]) {
              if (data['@graph'][0]['ceterms:name']) {
                name = data['@graph'][0]['ceterms:name'];
              } else if (data['@graph'][0]['name']) {
                name = data['@graph'][0]['name'];
              } else if (data['@graph'][0]['schema:name']) {
                name = data['@graph'][0]['schema:name'];
              } else if (data['@graph'][0]['title']) {
                name = data['@graph'][0]['title'];
              } else if (data['@graph'][0]['skos:prefLabel']) {
                name = data['@graph'][0]['skos:prefLabel'];
              }
            }
            // If it's a langstring
            name = schema.Thing.getDisplayStringFrom(name);
            // If still object, display value
            if (EcObject.isObject(name)) {
              var langs = Object.keys(name);
              name = name[langs[0]];
            }
          }
          me.expandedValueNames.push(name);
        }, function (error) {
          appLog(error);
        });
      });
    },
    get: function get(server, service, headers, success, failure) {
      this.$store.dispatch('editor/getThing', {
        server: server,
        service: service,
        headers: headers,
        success: success,
        failure: failure
      });
    },
    clipboardSuccess: function clipboardSuccess(_ref) {
      var value = _ref.value,
        event = _ref.event;
      this.copiedItem = value;
      var self = this;
      this.showClipboardSuccessMessage = true;
      setTimeout(function () {
        self.showClipboardSuccessMessage = false;
      }, 2000);
    },
    clipboardError: function clipboardError() {
      this.$emit('clipboard-error-event');
    },
    stopEditing: function stopEditing() {
      if (this.isRequired) {
        if (this.expandedValue.length === 0 || this.expandedValue[0]["@value"] != null && this.expandedValue[0]["@value"] !== undefined && this.expandedValue[0]["@value"].trim().length === 0) {
          this.showModal("required");
          return;
        }
      }
      if (this.range.length === 1 && (this.range[0] === "http://schema.org/URL" || this.range[0] === "https://schema.cassproject.org/0.4/skos/Concept")) {
        for (var i = 0; i < this.expandedValue.length; i++) {
          if (this.expandedValue[i]["@value"] && this.expandedValue[i]["@value"].indexOf("http") === -1) {
            return this.showModal("urlOnly");
          } else if (this.expandedValue[i]["@id"] && this.expandedValue[i]["@id"].indexOf("http") === -1) {
            return this.showModal("urlOnly");
          }
        }
      }
      if (this.profile && this.profile[this.expandedProperty] && this.profile[this.expandedProperty]["resource"] === true) {
        for (var i = 0; i < this.expandedValue.length; i++) {
          if (!this.expandedValue[i]["name"] || !this.expandedValue[i]["@value"] || this.expandedValue[i]["@value"].indexOf("http") === -1) {
            return this.showModal("nameAndUrlRequired");
          }
        }
      }
      this.addOrSearch = null;
      if (this.range.length === 1 && this.range[0].toLowerCase().indexOf("langstring") !== -1) {
        for (var i = 0; i < this.expandedValue.length; i++) {
          if (this.expandedValue[i]["@language"] == null || this.expandedValue[i]["@language"] === undefined || this.expandedValue[i]["@language"].trim().length === 0) {
            return this.showModal("langRequired");
          }
        }
        if (this.profile && this.profile[this.expandedProperty] && (this.profile[this.expandedProperty]["onePerLanguage"] === 'true' || this.profile[this.expandedProperty]["onePerLanguage"] === true)) {
          var languagesUsed = [];
          for (var i = 0; i < this.expandedValue.length; i++) {
            if (languagesUsed.includes(this.expandedValue[i]["@language"].toLowerCase())) {
              return this.showModal("onePerLanguage");
            }
            languagesUsed.push(this.expandedValue[i]["@language"].toLowerCase());
          }
        }
      }
      for (var i = this.expandedValue.length - 1; i >= 0; i--) {
        if (this.expandedValue[i] === null || this.expandedValue[i]["@value"] !== null && this.expandedValue[i]["@value"] !== undefined && this.expandedValue[i]["@value"].length === 0 || this.expandedValue[i].length === 0) {
          this.expandedValue.splice(i, 1);
        }
      }
      this.save();
      if (this.validate) {
        this.$emit('validated', true);
      }
    },
    startEditing: function startEditing() {
      if (this.canEdit && !this.editingProperty) {
        this.editingProperty = true;
        this.editingPropertyClass = "editing";
        this.$emit('editing-property-event', true);
      }
      if (this.range.length === 1 && this.range[0].toLowerCase().indexOf("langstring") !== -1) {
        this.langString = true;
        for (var i = 0; i < this.expandedValue.length; i++) {
          if (!this.expandedValue[i]["@language"]) {
            this.update({
              "@language": this.$store.state.editor.defaultLanguage,
              "@value": this.expandedValue[i]["@value"]
            }, i);
          }
        }
      }
    },
    /*
     * initialize modal with params this depends on
     * ./plugins/modalPlugin.js;
     * and ./components/CassModal.vue;
     * can further breakout if we decide to use vuex // plugin is global
     */
    showModal: function showModal(val, item) {
      var params = {};
      if (val === 'remove') {
        if (this.profile && this.profile[this.expandedProperty] && (this.profile[this.expandedProperty]["isRequired"] === 'true' || this.profile[this.expandedProperty]["isRequired"] === true)) {
          if (this.expandedValue.length === 1 || this.expandedValue["@value"] && this.expandedValue["@value"].trim().length === 1) {
            this.showModal("required");
            this.$store.commit('app/showModal', {
              component: 'RequiredPropertyModal'
            });
            return;
          }
        }
        this.removePropertyConfirmModal = true;
        this.propertyToRemove = item;
        return;
      }
      this.$emit('invalid', true);
      if (val === 'required') {
        params = {
          type: val,
          title: "Required property",
          text: this.displayLabel + " is required. Please enter a value."
        };
      }
      if (val === "urlOnly") {
        params = {
          type: val,
          title: "URL Required",
          text: this.displayLabel + " must be a URL. For example: https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/."
        };
      }
      if (val === "nameAndUrlRequired") {
        params = {
          type: val,
          title: "Name and URL Required",
          text: this.displayLabel + " must have a name and a URL."
        };
      }
      if (val === "langRequired") {
        params = {
          type: val,
          title: "Language Required",
          text: this.displayLabel + " must have a language."
        };
      }
      if (val === "onePerLanguage") {
        params = {
          type: val,
          title: "One value per language",
          text: this.displayLabel + " can only have one entry per language."
        };
      }
      this.errorValidating = params.text;
    },
    clickConfirmRemove: function clickConfirmRemove() {
      this.remove(this.propertyToRemove);
      this.propertyToRemove = null;
      this.removePropertyConfirmModal = false;
    },
    closeModal: function closeModal() {
      this.propertyToRemove = null;
      this.removePropertyConfirmModal = false;
    },
    add: function () {
      var _add = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee3(type) {
        var f, shortId, lang, rld;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (!(this.profile && this.profile[this.expandedProperty] && this.profile[this.expandedProperty]["add"])) {
                _context3.next = 13;
                break;
              }
              this.addOrSearch = "add";
              f = this.profile[this.expandedProperty]["add"];
              if (!(f === "checkedOptions")) {
                _context3.next = 7;
                break;
              }
              return _context3.abrupt("return");
            case 7:
              shortId = EcRemoteLinkedData.trimVersionFromUrl(this.expandedThing["@id"]);
              _context3.next = 10;
              return f(shortId);
            case 10:
              this.getExpandedValue();
            case 11:
              _context3.next = 14;
              break;
            case 13:
              if (type.toLowerCase().indexOf("langstring") !== -1) {
                this.addOrSearch = "add";
                lang = "";
                if (this.$store.state.editor) {
                  lang = this.$store.state.editor.defaultLanguage;
                }
                this.$parent.add(this.expandedProperty, {
                  "@language": lang,
                  "@value": ""
                });
                this.langString = true;
              } else if (type.toLowerCase().indexOf("string") !== -1 || type.toLowerCase().indexOf("url") !== -1 || type.toLowerCase().indexOf("text") !== -1 || type.toLowerCase().indexOf("date") !== -1 || type.toLowerCase().indexOf("concept") !== -1) {
                this.addOrSearch = "add";
                this.$parent.add(this.expandedProperty, {
                  "@value": ""
                });
              } else {
                this.addOrSearch = "add";
                rld = new EcRemoteLinkedData();
                rld.context = this.context;
                rld.type = type.split("/").pop();
                this.$parent.add(this.expandedProperty, rld);
              }
            case 14:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function add(_x) {
        return _add.apply(this, arguments);
      }
      return add;
    }(),
    removeByValue: function () {
      var _removeByValue = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee4(value) {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              this.$parent.removeByValue(this.expandedProperty, value);
            case 1:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function removeByValue(_x2) {
        return _removeByValue.apply(this, arguments);
      }
      return removeByValue;
    }(),
    remove: function () {
      var _remove = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee5(index) {
        var f, value;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              if (!(this.profile && this.profile[this.expandedProperty] && this.profile[this.expandedProperty]["remove"])) {
                _context5.next = 8;
                break;
              }
              f = this.profile[this.expandedProperty]["remove"];
              if (EcObject.isObject(index)) {
                value = index["@id"];
              } else {
                value = EcObject.isObject(this.expandedValue[index]) ? this.expandedValue[index]["@id"] : this.expandedValue[index];
              }
              _context5.next = 5;
              return f(EcRemoteLinkedData.trimVersionFromUrl(this.expandedThing["@id"]), value);
            case 5:
              this.getExpandedValue();
              _context5.next = 9;
              break;
            case 8:
              this.$parent.remove(this.expandedProperty, index);
            case 9:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function remove(_x3) {
        return _remove.apply(this, arguments);
      }
      return remove;
    }(),
    updatePropertyString: function updatePropertyString(input, index) {
      this.update(input, index);
    },
    update: function update(input, index) {
      var me = this;
      this.errorValidating = null;
      if (this.profile && this.profile[this.expandedProperty] && this.profile[this.expandedProperty]["resource"] === true) {
        for (var i = 0; i < this.expandedValue.length; i++) {
          if (!input.name || !input["@value"] || input["@value"].indexOf("http") === -1) {
            return this.showModal("nameAndUrlRequired");
          }
        }
      }
      this.$parent.update(this.expandedProperty, index, input, function () {
        me.stopEditing();
      });
    },
    isText: function isText(type) {
      if (type == null || type === undefined) return null;
      if (type["@value"] != null && type["@value"] !== undefined) {
        return true;
      }
      if (type["@type"] !== undefined && type["@type"] !== null) {
        if (type["@type"][0].toLowerCase().indexOf("text") !== -1) {
          return true;
        }
        if (type["@type"][0].toLowerCase().indexOf("url") !== -1) {
          return true;
        }
        if (type["@type"][0].toLowerCase().indexOf("concept") !== -1) {
          return true;
        }
        if (type["@type"][0].toLowerCase().indexOf("string") !== -1) {
          return true;
        }
      }
      if (type["@id"] != null && type["@id"] !== undefined) {
        return true;
      }
      return false;
    },
    isLink: function isLink(type) {
      if (EcObject.keys(type).length === 1) {
        if (type["@id"] != null && type["@id"] !== undefined) {
          return true;
        } else if (type["@value"] && type["@value"].indexOf("http") === 0) {
          return true;
        }
      }
      return false;
    },
    isCopied: function isCopied(item) {
      if (EcObject.keys(item).length === 1) {
        if (item["@value"] && item["@value"] === this.copiedItem) {
          return true;
        }
        if (item["@id"] && item["@id"] === this.copiedItem) {
          return true;
        }
      }
      return false;
    },
    isNotDeletable: function isNotDeletable() {
      // This property is not deletable if it is the last entry of a required field.
      if (this.isRequired && this.expandedValue && this.expandedValue.length <= 1) {
        return true;
      } else {
        return false;
      }
    },
    save: function save() {
      if (this.profile && this.profile[this.expandedProperty] && this.profile[this.expandedProperty]["save"]) {
        var f = this.profile[this.expandedProperty]["save"];
        if (this.checkedOptions) {
          f(this.expandedThing, this.checkedOptions, this.profile[this.expandedProperty]["options"]);
        }
      } else {
        if (this.expandedProperty.indexOf('@') === -1 && !this.validate) {
          var changed = false;
          for (var i = 0; i < this.expandedValue.length; i++) {
            if (this.initialValue) {
              if (this.expandedValue[i]["@id"] !== this.initialValue[i]["@id"] || this.expandedValue[i]["@value"] !== this.initialValue[i]["@value"] || this.expandedValue[i]["@language"] !== this.initialValue[i]["@language"]) {
                changed = true;
                break;
              }
            }
          }
          if (changed) {
            this.$store.commit('editor/addEditsToUndo', {
              operation: "update",
              id: EcRemoteLinkedData.trimVersionFromUrl(this.expandedThing["@id"]),
              fieldChanged: [this.expandedProperty],
              initialValue: this.initialValue,
              changedValue: this.expandedValue,
              expandedProperty: true
            });
            this.$parent.saveThing();
          }
        }
      }
    },
    isObject: function isObject(k) {
      return EcObject.isObject(k);
    },
    getURL: function getURL(item) {
      if (item['@value']) {
        return item['@value'];
      } else if (item['@id']) {
        return item['@id'];
      }
    },
    getExpandedValue: function () {
      var _getExpandedValue = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee6() {
        var expanded, f, shortId;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              expanded = this.expandedThing[this.expandedProperty];
              if (!(this.profile && this.profile[this.expandedProperty] && this.profile[this.expandedProperty]["valuesIndexed"])) {
                _context6.next = 11;
                break;
              }
              expanded = [];
              f = this.profile[this.expandedProperty]["valuesIndexed"];
              f = f();
              shortId = EcRemoteLinkedData.trimVersionFromUrl(this.expandedThing["@id"]);
              if (!(f && f[shortId])) {
                _context6.next = 9;
                break;
              }
              this.expandedValue = f[shortId];
              return _context6.abrupt("return");
            case 9:
              this.expandedValue = [];
              return _context6.abrupt("return");
            case 11:
              if (this.expandedProperty.charAt(0) === '@') {
                if (this.expandedProperty === "@id") {
                  expanded = [{
                    "@value": EcRemoteLinkedData.trimVersionFromUrl(this.expandedThing[this.expandedProperty])
                  }];
                } else {
                  expanded = [{
                    "@value": this.expandedThing[this.expandedProperty]
                  }];
                }
              }
              this.expandedValue = expanded;
            case 13:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function getExpandedValue() {
        return _getExpandedValue.apply(this, arguments);
      }
      return getExpandedValue;
    }(),
    visibilityChanged: function visibilityChanged(isVisible, entry) {
      if (isVisible) {
        this.getExpandedValue();
      }
    }
  },
  watch: {
    canEdit: function canEdit() {
      if (this.canEdit === false) {
        this.editingProperty = false;
      }
    },
    validate: function validate() {
      if (this.validate) {
        this.errorValidating = null;
        this.stopEditing();
      }
    },
    checkedOptions: function checkedOptions() {
      this.save();
    }
  }
});
// CONCATENATED MODULE: ./src/lode/components/Property.vue?vue&type=script&lang=js
 /* harmony default export */ var components_Propertyvue_type_script_lang_js = (Propertyvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/lode/components/Property.vue?vue&type=style&index=0&id=64a51a14&prod&lang=scss
var Propertyvue_type_style_index_0_id_64a51a14_prod_lang_scss = __webpack_require__("2f85");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/lode/components/Property.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_Propertyvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Property = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "61ed":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "c585":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);
//# sourceMappingURL=chunk-4cac7b5b.db3a306a.js.map