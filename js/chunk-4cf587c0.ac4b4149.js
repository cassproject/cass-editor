(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-4cf587c0"],{

/***/ "3fa6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_HierarchyNode_vue_vue_type_style_index_0_id_752e023a_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("40de");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_HierarchyNode_vue_vue_type_style_index_0_id_752e023a_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_HierarchyNode_vue_vue_type_style_index_0_id_752e023a_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "40de":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "b709":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("fb6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"862f505e-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/lode/components/HierarchyNode.vue?vue&type=template&id=752e023a





var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('li', {
    directives: [{
      name: "observe-visibility",
      rawName: "v-observe-visibility",
      value: {
        callback: _vm.visibilityChanged,
        once: true,
        throttle: 300
      },
      expression: "{\n        callback: visibilityChanged,\n        once: true,\n        throttle: 300,\n    }"
    }],
    class: [_vm.isPotentialCrosswalkTarget ? _vm.crosswalkTargetClass : '', _vm.editingNodeClass],
    attrs: {
      "id": _vm.obj.shortId()
    }
  }, [_vm.isVisible ? _c('div', {
    staticClass: "lode__hierarchy-item columns is-paddingless is-gapless is-marginless is-mobile is-multiline",
    class: [_vm.subview, {
      'is-selected-competency-source': _vm.isSelectedWorkingAlignmentsSource
    }, {
      'is-selected-competency-target': _vm.isInWorkingAlignmentsTargets
    }, _vm.isCrosswalkAligned, {
      'show-aligned': _vm.filter === 'showAligned'
    }, {
      'show-unaligned': _vm.filter === 'showUnaligned'
    }, {
      'show-all': _vm.filter === 'showAll'
    }, {
      'is-focused': _vm.isItemFocused
    }, {
      'is-selected': _vm.checked
    }, {
      'is-highlighted': _vm.highlighted
    }, {
      'is-copied': _vm.isItemCopied
    }, {
      'is-cut': _vm.isItemCut
    }, {
      'can-paste': _vm.canPaste
    }, {
      'target-enabled': _vm.sourceState === 'selectTargets'
    }]
  }, [_c('div', {
    staticClass: "column is-12",
    attrs: {
      "id": _vm.obj.shortId() === _vm.newCompetency ? 'scroll-newCompetency' : null
    }
  }, [_c('div', {
    staticClass: "section is-paddingless"
  }, [_c('div', {
    staticClass: "columns is-paddingless is-gapless is-marginless is-mobile is-multiline"
  }, [_c('div', {
    staticClass: "expand-column column is-narrow is-vcentered"
  }, [!_vm.collapse && _vm.hasChild.length > 0 ? _c('div', {
    staticClass: "icon is-vcentered",
    on: {
      "click": function click($event) {
        return _vm.onExpandEvent();
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-caret-down has-text-primary is-size-2",
    class: {
      'is-size-4': _vm.view === 'crosswalk'
    }
  })]) : _vm.hasChild.length > 0 ? _c('div', {
    staticClass: "icon is-vcentered",
    on: {
      "click": function click($event) {
        return _vm.onExpandEvent();
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-caret-right has-text-primary is-size-2",
    class: {
      'is-size-4': _vm.view === 'crosswalk'
    }
  })]) : _c('div', {
    staticClass: "icon is-vcentered is-transparent"
  }, [_c('i', {
    staticClass: "fa fa-circle has-text-white is-size-7"
  })])]), _c('div', {
    staticClass: "check-radio-column column is-narrow is-vcentered"
  }, [_vm.canEdit && _vm.view !== 'crosswalk' && _vm.view !== 'importPreview' && _vm.view !== 'importLight' && _vm.hierarchyEnabled || _vm.queryParams.select || _vm.view === 'competencySearch' ? _c('div', {
    staticClass: "field"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.checked,
      expression: "checked"
    }],
    staticClass: "is-checkradio",
    class: {
      'is-focused': _vm.isItemFocused
    },
    attrs: {
      "tabindex": "0",
      "id": _vm.obj.shortId() + 'checkbox',
      "type": "checkbox",
      "name": _vm.obj.shortId() + 'checkbox'
    },
    domProps: {
      "checked": Array.isArray(_vm.checked) ? _vm._i(_vm.checked, null) > -1 : _vm.checked
    },
    on: {
      "focus": function focus($event) {
        return _vm.focusHierarchyItem();
      },
      "blur": function blur($event) {
        return _vm.unfocusHierarchyItem();
      },
      "input": _vm.checkForDblClick,
      "change": function change($event) {
        var $$a = _vm.checked,
          $$el = $event.target,
          $$c = $$el.checked ? true : false;
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.checked = $$a.concat([$$v]));
          } else {
            $$i > -1 && (_vm.checked = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.checked = $$c;
        }
      }
    }
  }), _c('label', {
    attrs: {
      "for": _vm.obj.shortId() + 'checkbox'
    }
  })]) : _vm._e()]), _c('div', {
    staticClass: "column full-column constrain-column"
  }, [_c(_vm.dynamicThing, {
    tag: "component",
    staticClass: "list-complete-item",
    class: _vm.newThingClass,
    style: {
      transform: _vm.indent,
      width: _vm.calcWidth
    },
    attrs: {
      "filter": _vm.filter,
      "view": _vm.view,
      "subview": _vm.subview,
      "id": 'scroll-' + _vm.obj.shortId().split('/').pop(),
      "obj": _vm.changedObj ? _vm.changedObj : _vm.obj,
      "uri": _vm.obj.shortId(),
      "parentNotEditable": !_vm.canEdit,
      "profile": _vm.profile,
      "childrenExpanded": _vm.childrenExpanded,
      "children": this.hasChild.length,
      "highlightList": _vm.highlightList,
      "newFramework": _vm.newFramework,
      "index": _vm.index,
      "frameworkEditable": _vm.frameworkEditable,
      "editingNode": _vm.editingNode,
      "cantMoveUp": _vm.cantMoveUp,
      "cantMoveDown": _vm.cantMoveDown,
      "cantMoveRight": _vm.cantMoveRight,
      "cantMoveLeft": _vm.cantMoveLeft,
      "properties": _vm.properties,
      "containerSubType": _vm.containerSubType,
      "canEditAssertions": _vm.canEditAssertions
    },
    on: {
      "expand-event": function expandEvent($event) {
        return _vm.onExpandEvent();
      },
      "edit-node-event": function editNodeEvent($event) {
        return _vm.onEditNode();
      },
      "done-editing-node-event": function doneEditingNodeEvent($event) {
        return _vm.onDoneEditingNode();
      },
      "addNode": function addNode($event) {
        return _vm.onAddNodeEvent();
      },
      "move-up": _vm.moveUp,
      "move-down": _vm.moveDown,
      "move-right": _vm.moveRight,
      "move-left": _vm.moveLeft,
      "select": _vm.select,
      "remove-object": _vm.removeObject,
      "set-checkbox": _vm.setCheckbox
    }
  }, [_c('div', {
    staticClass: "hierarchy-item__buttons"
  }, [_vm.view !== 'crosswalk' && _vm.canEditThing ? _c('div', {
    staticClass: "edit-button button is-text is-small has-text-primary",
    on: {
      "click": function click($event) {
        return _vm.onEditNode();
      }
    }
  }, [_c('div', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-edit"
  })])]) : _vm._e(), _vm.canEdit && _vm.view !== 'crosswalk' && _vm.hierarchyEnabled ? _c('div', {
    staticClass: "handle-button button is-text is-small has-text-primary"
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fas handle fa-arrows-alt"
  }), _c('i', {
    staticClass: "fas handle fa-arrows-alt"
  })])]) : _vm._e(), _vm.showAddComments && _vm.view !== 'crosswalk' && _vm.view !== 'search' ? _c('div', {
    staticClass: "comment-button button is-text is-small has-text-primary",
    on: {
      "click": _vm.handleClickAddComment
    }
  }, [_c('div', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-comment-medical"
  })])]) : _vm._e()])])], 1)])])]), _vm.view === 'crosswalk' && _vm.subview === 'crosswalkSource' && _vm.sourceAlignmentCountByType.length > 0 ? _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.sourceState === 'ready',
      expression: "sourceState === 'ready'"
    }],
    staticClass: "column is-12 crosswalk-tags"
  }, _vm._l(_vm.sourceAlignmentCountByType, function (sac, idx) {
    return _c('span', {
      key: idx,
      staticClass: "tag is-small is-link crosswalk__align_link",
      attrs: {
        "title": _vm.crosswalkOptions[sac.alignType].label
      },
      on: {
        "click": function click($event) {
          return _vm.setRelationTypeByLinkClick(sac.alignType);
        }
      }
    }, [_c('span', [_vm._v(_vm._s(_vm.crosswalkOptions[sac.alignType].label))]), _c('span', {
      staticStyle: {
        "margin-left": ".5rem"
      }
    }, [_vm._v(_vm._s(sac.alignCount))])]);
  }), 0) : _vm._e(), _vm.view === 'crosswalk' && _vm.subview === 'crosswalkSource' ? _c('div', {
    staticClass: "crosswalk-buttons__source"
  }, [_c('div', {
    staticClass: "button is-outlined is-small is-primary crosswalk-buttons__source__create",
    attrs: {
      "disabled": _vm.sourceState !== 'ready'
    },
    on: {
      "click": _vm.setWorkingAlignmentsSource
    }
  }, [_vm._m(0), _c('span', [_vm._v("add")])]), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.sourceState === 'selectType' && _vm.isSelectedWorkingAlignmentsSource && _vm.workingAlignmentsType === '',
      expression: "sourceState === 'selectType' && isSelectedWorkingAlignmentsSource && workingAlignmentsType ===''"
    }],
    staticClass: "field is-grouped has-background-primary crosswalk-select-field"
  }, [_c('div', {
    staticClass: "control"
  }, [_c('div', {
    staticClass: "select is-small is-primary has-text-primary crosswalk-buttons__source__select"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.workingAlignmentsType,
      expression: "workingAlignmentsType"
    }],
    ref: "alignmentOptions",
    on: {
      "blur": _vm.ifNoWorkingAlignmentsTypeRemoveSourceCompetency,
      "change": function change($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.workingAlignmentsType = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v(" relation ")]), _vm._l(_vm.crosswalkOptionsArray, function (option, index) {
    return _c('option', {
      key: index,
      domProps: {
        "value": option.type
      }
    }, [_vm._v(" " + _vm._s(option.label) + " ")]);
  })], 2)])])]), _vm.sourceState === 'selectTargets' && _vm.isSelectedWorkingAlignmentsSource ? _c('div', {
    staticClass: "field"
  }, [_c('p', {
    staticClass: "control"
  }, [_c('span', {
    staticClass: "tag is-small is-fullwidth is-link crosswalk-buttons__source__type",
    attrs: {
      "title": _vm.crosswalkOptions[_vm.workingAlignmentsType].label
    }
  }, [_c('span', {
    staticClass: "has-text-weight-bold"
  }, [_vm._v(_vm._s(_vm.crosswalkOptions[_vm.workingAlignmentsType].label))]), _c('button', {
    staticClass: "delete is-small",
    on: {
      "click": _vm.removeSourceCompetency
    }
  })])])]) : _vm._e()]) : _vm._e(), _vm.view === 'crosswalk' && _vm.subview === 'crosswalkTarget' && _vm.sourceState === 'selectTargets' ? _c('div', {
    staticClass: "crosswalk-buttons__target"
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: !_vm.isInWorkingAlignmentsTargets,
      expression: "!isInWorkingAlignmentsTargets"
    }],
    staticClass: "button is-fullwidth is-small is-text has-text-primary",
    on: {
      "click": function click($event) {
        _vm.addToWorkingAlignmentsTargets(_vm.obj.shortId());
      }
    }
  }, [_vm._m(1)]), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.isInWorkingAlignmentsTargets,
      expression: "isInWorkingAlignmentsTargets"
    }],
    staticClass: "button is-fullwidth is-small is-text has-text-link",
    on: {
      "click": function click($event) {
        _vm.removeFromWorkingAlignmentsTargets(_vm.obj.shortId());
      }
    }
  }, [_vm._m(2)])]) : _vm._e(), _vm.view !== 'crosswalk' && _vm.canEdit && false ? _c('div', {
    staticClass: "add-node-section"
  }, [!_vm.addingNode ? _c('div', {
    staticClass: "add-new-node__line",
    attrs: {
      "title": "Add competency"
    },
    on: {
      "click": function click($event) {
        _vm.addingNode = true;
      }
    }
  }, [_c('hr'), _vm._m(3), _c('hr')]) : _c('div', {
    staticClass: "add-node__options"
  }, [_c('div', {
    staticClass: "buttons is-centered"
  }, [_c('div', {
    staticClass: "button is-outlined is-small is-dark",
    on: {
      "click": function click($event) {
        _vm.$store.commit('lode/competencySearchModalOpen', false);
        _vm.addingNode = false;
      }
    }
  }, [_vm._m(4), _c('span', [_vm._v("cancel")])]), !_vm.hasChild.length ? _c('div', {
    staticClass: "button is-outlined is-small is-primary",
    on: {
      "click": function click($event) {
        _vm.$emit('create-new-node-event', _vm.parent.shortId(), _vm.obj.shortId());
        _vm.addingNode = false;
      }
    }
  }, [_vm._m(5), _c('span', [_vm._v(" create new ")])]) : _c('div', {
    staticClass: "button is-outlined is-small is-primary",
    on: {
      "click": function click($event) {
        _vm.$emit('create-new-node-event', _vm.obj.shortId());
        _vm.addingNode = false;
      }
    }
  }, [_vm._m(6), _c('span', [_vm._v(" create new ")])]), _vm.obj && _vm.obj.type !== 'Concept' ? _c('div', {
    staticClass: "button is-outlined is-small is-primary",
    on: {
      "click": _vm.clickToSearch
    }
  }, [_vm._m(7), _c('span', [_vm._v("search")])]) : _vm._e()])])]) : _vm._e()]) : _vm._e(), [!_vm.collapse && _vm.hierarchyEnabled ? _c('draggable', _vm._b({
    staticClass: "lode__hierarchy-sub-ul",
    class: [_vm.dragging == true ? ' dragging' : '', {
      'no-child': _vm.hasChild.length === 0
    }],
    attrs: {
      "id": _vm.obj.shortId(),
      "group": {
        name: 'test'
      },
      "handle": ".handle",
      "tag": "ul",
      "disabled": _vm.canEdit != true || !_vm.isDraggable
    },
    on: {
      "start": _vm.beginDrag,
      "end": _vm.endDrag
    },
    model: {
      value: _vm.hasChild,
      callback: function callback($$v) {
        _vm.hasChild = $$v;
      },
      expression: "hasChild"
    }
  }, 'draggable', _vm.dragOptions, false), _vm._l(_vm.hasChild, function (item, i) {
    return _c('HierarchyNode', {
      key: item.obj.id,
      staticClass: "lode__hierarchy-sub-li",
      attrs: {
        "depth": _vm.depth + 1,
        "view": _vm.view,
        "filter": _vm.filter,
        "subview": _vm.subview,
        "obj": item.obj,
        "hasChild": item.children,
        "dragging": _vm.dragging,
        "canEdit": _vm.canEdit,
        "profile": _vm.profile,
        "highlightList": _vm.highlightList,
        "selectAll": _vm.selectAll,
        "newFramework": _vm.newFramework,
        "index": i,
        "parentStructure": _vm.hasChild,
        "parent": _vm.obj,
        "frameworkEditable": _vm.frameworkEditable,
        "selectedArray": _vm.selectedArray,
        "properties": _vm.properties,
        "parentChecked": _vm.checked,
        "parentHighlighted": _vm.parentHighlighted ? _vm.parentHighlighted : _vm.checked,
        "propagateParentChecked": _vm.propagateChecked === 'parent' ? _vm.propagateParentChecked : _vm.propagateChecked === 'true' ? 'true' : 'false',
        "shiftKey": _vm.shiftKey,
        "arrowKey": _vm.arrowKey,
        "largeNumberOfItems": _vm.largeNumberOfItems,
        "expandAll": _vm.expandAll,
        "containerSubType": _vm.containerSubType,
        "canEditAssertions": _vm.canEditAssertions
      },
      on: {
        "create-new-node-event": _vm.onCreateNewNode,
        "begin-drag": _vm.beginDrag,
        "move": _vm.move,
        "select": _vm.select,
        "add": _vm.add,
        "remove-object": _vm.removeObject
      }
    });
  }), 1) : _vm._e()]], 2);
};
var staticRenderFns = [function () {
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
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-plus"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-check"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "button is-small is-outlined is-primary"
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-plus-circle"
  })]), _c('span', [_vm._v(" add item ")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-times"
  })]);
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
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-plus"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-search"
  })]);
}];

// CONCATENATED MODULE: ./src/lode/components/HierarchyNode.vue?vue&type=template&id=752e023a

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
var regeneratorRuntime = __webpack_require__("c7eb");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
var createForOfIteratorHelper = __webpack_require__("b85c");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__("3ca3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__("caad");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__("2532");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.search.js
var es_string_search = __webpack_require__("841c");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// EXTERNAL MODULE: ./src/mixins/common.js
var common = __webpack_require__("872c");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/lode/components/HierarchyNode.vue?vue&type=script&lang=js
















/* harmony default export */ var HierarchyNodevue_type_script_lang_js = ({
  name: "HierarchyNode",
  mixins: [common["a" /* default */]],
  props: {
    depth: Number,
    obj: Object,
    filter: {
      type: String,
      default: 'showAll'
    },
    hasChild: Array,
    canEdit: Boolean,
    dragging: Boolean,
    profile: Object,
    highlightList: Array,
    selectAll: Boolean,
    newFramework: Boolean,
    index: Number,
    parentStructure: Array,
    parent: Object,
    frameworkEditable: Boolean,
    properties: String,
    expandAll: Boolean,
    parentChecked: Boolean,
    parentHighlighted: Boolean,
    propagateParentChecked: {
      type: String
    },
    view: {
      type: String,
      default: 'framework'
    },
    subview: {
      type: String,
      default: ''
    },
    selectedArray: Array,
    shiftKey: {
      type: Boolean,
      default: false
    },
    arrowKey: String,
    largeNumberOfItems: Boolean,
    hierarchyEnabled: {
      type: Boolean,
      default: true
    },
    containerSubType: String,
    canEditAssertions: Boolean
  },
  components: {
    ThingEditing: function ThingEditing() {
      return Promise.all(/* import() */[__webpack_require__.e("chunk-2d0a4fe9"), __webpack_require__.e("chunk-6a6fd63e"), __webpack_require__.e("chunk-2d0d5fe2"), __webpack_require__.e("chunk-576b8942"), __webpack_require__.e("chunk-777ee162")]).then(__webpack_require__.bind(null, "8051"));
    },
    Thing: function Thing() {
      return __webpack_require__.e(/* import() */ "chunk-2d0a4fe9").then(__webpack_require__.bind(null, "098b"));
    },
    draggable: function draggable() {
      return __webpack_require__.e(/* import() */ "chunk-4a5f46a6").then(__webpack_require__.t.bind(null, "b76a", 7));
    }
  },
  data: function data() {
    return {
      crosswalkOptions: {},
      crosswalkOptionsArray: [],
      dragOptions: {
        scroll: true,
        delay: 0,
        swapThreshold: 0.25,
        emptyInsertThreshold: 4,
        invertedSwapThreshold: 0.25,
        invertSwap: true,
        disabled: false,
        animation: 0,
        ghostClass: 'ghost-drag',
        chosenClass: 'chosen-drag',
        dragClass: 'drag',
        scrollSensitivity: 30,
        scrollSpeed: 5,
        forceFallback: true
      },
      isDraggable: true,
      isVisible: false,
      addingNode: false,
      editingNode: false,
      collapse: true,
      controlOnStart: false,
      checked: false,
      childrenExpanded: false,
      // Needed to update the obj prop passed to the dynamic Thing/ThingEditing component on change to the object
      changedObj: null,
      crosswalkTargetClass: '',
      sourceAlignmentCountByType: {},
      isItemFocused: false,
      isItemCut: false,
      isItemCopied: false,
      canPaste: false,
      // needs trigger that something has been copied or cut
      canEditInCollection: false,
      checkBoxDblClick: 0,
      propagateChecked: 'parent'
    };
  },
  computed: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({
    indent: function indent() {
      return "translate(".concat(this.depth * 16 - 16, "px)");
    },
    calcWidth: function calcWidth() {
      return "calc(100% - ".concat(this.depth * 16 - 16, "px) !important");
    }
  }, Object(vuex_esm["c" /* mapState */])({
    workingAlignmentsSource: function workingAlignmentsSource(state) {
      return state.crosswalk.workingAlignmentsMap.source;
    },
    workingAlignmentsTargets: function workingAlignmentsTargets(state) {
      return state.crosswalk.workingAlignmentsMap.targets;
    },
    relevantExistingAlignmentsMap: function relevantExistingAlignmentsMap(state) {
      return state.crosswalk.relevantExistingAlignmentsMap;
    },
    relevantExistingAlignmentsMapLastUpdate: function relevantExistingAlignmentsMapLastUpdate(state) {
      return state.crosswalk.relevantExistingAlignmentsMapLastUpdate;
    },
    enabledRelationshipTypes: function enabledRelationshipTypes(state) {
      return state.crosswalk.enabledRelationshipTypes;
    },
    enabledRelationshipTypesLastUpdate: function enabledRelationshipTypesLastUpdate(state) {
      return state.crosswalk.enabledRelationshipTypesLastUpdate;
    },
    alignedCompetenciesList: function alignedCompetenciesList(state) {
      return state.crosswalk.alignedCompetenciesList;
    },
    targetState: function targetState(state) {
      return state.crosswalk.targetState;
    },
    sourceState: function sourceState(state) {
      return state.crosswalk.sourceState;
    },
    targetNodesToHighlight: function targetNodesToHighlight(state) {
      return state.crosswalk.targetNodesToHighlight;
    },
    cutId: function cutId(state) {
      return state.editor.cutId;
    },
    copyId: function copyId(state) {
      return state.editor.copyId;
    },
    paste: function paste(state) {
      return state.editor.paste;
    },
    queryParams: function queryParams(state) {
      return state.editor.queryParams;
    },
    newCompetency: function newCompetency(state) {
      return state.editor.newCompetency;
    },
    conceptMode: function conceptMode(state) {
      return state.editor.conceptMode;
    },
    progressionMode: function progressionMode(state) {
      return state.editor.progressionMode;
    }
  })), {}, {
    showAddComments: function showAddComments() {
      if (this.$store.getters['editor/queryParams'].concepts === "true" || this.$store.getters['editor/conceptMode'] === true || this.$store.getters['editor/progressionMode'] === true) {
        return false;
      }
      return this.$store.state.app.canAddComments;
    },
    workingAlignmentsType: {
      get: function get() {
        return this.$store.getters['crosswalk/workingAlignmentsType'];
      },
      set: function set(value) {
        this.$store.commit('crosswalk/workingAlignmentsType', value);
      }
    },
    isPotentialCrosswalkTarget: function isPotentialCrosswalkTarget() {
      return this.view === 'crosswalk' && this.subview === 'crosswalkTarget';
    },
    isSelectedWorkingAlignmentsSource: function isSelectedWorkingAlignmentsSource() {
      if (this.workingAlignmentsSource === this.obj.shortId() && this.subview === 'crosswalkSource') return true;else return false;
    },
    isInWorkingAlignmentsTargets: function isInWorkingAlignmentsTargets() {
      if (!this.workingAlignmentsTargets) return false;
      if (this.subview === 'crosswalkTarget' && this.workingAlignmentsTargets.includes(this.obj.shortId())) return true;else return false;
    },
    isCrosswalkAligned: function isCrosswalkAligned() {
      if (this.view === 'crosswalk') {
        if (this.alignedCompetenciesList.includes(this.obj.shortId())) {
          return 'is-crosswalk-aligned';
        } else {
          return 'not-crosswalk-aligned';
        }
      } else {
        return 'not-crosswalk-aligned';
      }
    },
    /*
     * Dynamic thing is a computed value that <component>
     * observes in order to decide which thing structure to load
     * if editingNode is set to true
     * we should load the ThingEditing vue template
     * otherwise viewing,  we can add to this later
     */
    dynamicThing: function dynamicThing() {
      if (this.editingNode || this.newThingClass === 'new-thing') {
        return 'ThingEditing';
      } else {
        return 'Thing';
      }
    },
    newThingClass: function newThingClass() {
      if (this.$store.state.editor) {
        if (this.obj.shortId() === this.newCompetency) {
          return 'new-thing';
        }
      }
      return '';
    },
    cantMoveUp: function cantMoveUp() {
      if (this.index - 1 < 0) {
        return true;
      }
      return false;
    },
    cantMoveDown: function cantMoveDown() {
      if (this.index + 1 >= this.parentStructure.length) {
        return true;
      }
      return false;
    },
    cantMoveRight: function cantMoveRight() {
      if (this.index - 1 < 0) {
        return true;
      }
      return false;
    },
    cantMoveLeft: function cantMoveLeft() {
      if (this.parent.type === "Framework") {
        return true;
      }
      return false;
    },
    editingNodeClass: function editingNodeClass() {
      if (this.editingNode) {
        return 'editing-thing';
      } else {
        return '';
      }
    },
    canEditThing: function canEditThing() {
      if (this.canEdit === false) {
        return false;
      }
      if (this.containerSubType === 'Collection') {
        return this.canEditInCollection;
      }
      if (this.obj) {
        return this.canEditAny(this.obj);
      }
      return true;
    },
    highlighted: function highlighted() {
      // Removing this functionality for now. Going to replace with a fade.
      // if (this.parentHighlighted) {
      //     return true;
      // } else {
      //     return this.checked;
      // }
      return false;
    }
  }),
  // used to help the parent know when nodes stop rendering
  mounted: function mounted() {
    this.$emit('mounting-node');
    appLog("hierarchyNode.vue is mounted");
    this.collapse = this.largeNumberOfItems;
    if (this.expandAll) {
      this.collapse = false;
    }
    if (!this.collapse) {
      this.childrenExpanded = true;
    }
    if (this.view === 'crosswalk' && this.subview === 'crosswalkSource') {
      this.buildCrosswalkOptions();
      this.calculateSourceAlignmentCountByType();
    }
    if (this.selectAll) {
      this.checked = this.selectAll;
    }
    if (this.propagateParentChecked === 'parent' && !this.newCompetency) {
      this.checked = this.parentChecked;
    }
    if (this.selectedArray && this.selectedArray.length) {
      if (EcArray.has(this.selectedArray, this.obj.shortId())) {
        this.checked = true;
      }
    }
  },
  methods: {
    setCheckbox: function setCheckbox() {
      if (this.view === 'framework' || this.view === 'concept') {
        this.checked = !this.checked;
        this.propagateChecked = 'false';
      }
    },
    checkForDblClick: function checkForDblClick() {
      var _this = this;
      if (this.view === 'framework' || this.view === 'concept') {
        // Select all children on double click. PropagateChecked exists on each node and can be set to true, false, or parent.
        // It is set to parent by default, indicating that the node should take on the value of the parentPropagateChecked.
        // If this node's checkbox is changed, then propagateChecked takes on the value of false to select only itself and
        // true to select itself and all children. The behavior is the same for checking and unchecking the box.
        // A watch exists on PropagateCheck to return the value back to parent.
        this.checkBoxDblClick++;
        setTimeout(function () {
          if (_this.checkBoxDblClick > 1) {
            _this.checkBoxDblClick = 0;
            _this.checked = !_this.checked;
            _this.propagateChecked = 'true';
          } else if (_this.checkBoxDblClick === 1) {
            _this.checkBoxDblClick = 0;
            _this.propagateChecked = 'false';
          } else {
            _this.propagateChecked = 'parent';
          }
        }, 500);
      }
    },
    focusHierarchyItem: function focusHierarchyItem() {
      appLog("tab");
      this.isItemFocused = true;
    },
    unfocusHierarchyItem: function unfocusHierarchyItem() {
      this.isItemFocused = false;
    },
    ifNoWorkingAlignmentsTypeRemoveSourceCompetency: function ifNoWorkingAlignmentsTypeRemoveSourceCompetency() {
      if (!this.workingAlignmentsType) {
        this.removeSourceCompetency();
      }
    },
    handleClickAddComment: function handleClickAddComment() {
      appLog("object is: ", this.obj.shortId());
      this.$store.commit('editor/setAddCommentAboutId', this.obj.shortId());
      this.$store.commit('editor/setAddCommentType', 'new');
      this.$store.commit('app/showModal', {
        component: 'AddComment'
      });
    },
    calculateSourceAlignmentCountByType: function calculateSourceAlignmentCountByType() {
      if (!this.relevantExistingAlignmentsMap[this.obj.shortId()]) this.sourceAlignmentCountByType = [];else {
        var sourceAlignments = this.relevantExistingAlignmentsMap[this.obj.shortId()];
        if (!sourceAlignments) this.sourceAlignmentCountByType = [];else {
          var sacbt = [];
          var alignTypes = Object.keys(sourceAlignments);
          for (var _i = 0, _alignTypes = alignTypes; _i < _alignTypes.length; _i++) {
            var at = _alignTypes[_i];
            if (this.crosswalkOptions[at]) {
              var sa = {};
              sa.alignType = at;
              sa.alignCount = Object.keys(sourceAlignments[at]).length;
              if (sa.alignCount > 0) sacbt.push(sa);
            }
          }
          this.sourceAlignmentCountByType = sacbt;
        }
      }
    },
    removeSourceCompetency: function removeSourceCompetency() {
      this.$store.commit('crosswalk/sourceState', 'ready');
      this.$store.commit('crosswalk/resetWorkingAlignmentsMap');
    },
    removeFromWorkingAlignmentsTargets: function removeFromWorkingAlignmentsTargets(id) {
      this.$store.commit('crosswalk/removeWorkingAlignmentsTarget', id);
    },
    addToWorkingAlignmentsTargets: function addToWorkingAlignmentsTargets(id) {
      this.$store.commit('crosswalk/addWorkingAlignmentsTarget', id);
    },
    setWorkingAlignmentsSource: function setWorkingAlignmentsSource() {
      var _this2 = this;
      if (this.sourceState === 'ready') {
        this.$store.commit('crosswalk/workingAlignmentsSource', this.obj.shortId());
        this.$store.commit('crosswalk/sourceState', 'selectType');
        // keep me, auto focuses on select so clicking off without interaction
        // follows the $blur rule and removes the selection
        this.$nextTick(function () {
          _this2.$refs.alignmentOptions.focus();
        });
      }
    },
    setRelationTypeByLinkClick: function setRelationTypeByLinkClick(type) {
      this.$store.commit('crosswalk/workingAlignmentsSource', this.obj.shortId());
      this.$store.commit('crosswalk/workingAlignmentsType', type);
      // this.$store.commit('crosswalk/sourceState', 'selectTargets');
    },
    buildCrosswalkOptions: function buildCrosswalkOptions() {
      this.crosswalkOptions = {};
      this.crosswalkOptionsArray = [];
      var _iterator = Object(createForOfIteratorHelper["a" /* default */])(this.enabledRelationshipTypes),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var er = _step.value;
          var co = {};
          co.type = er.relationship;
          co.label = er.label;
          this.crosswalkOptions[er.relationship] = co;
          this.crosswalkOptionsArray.push(co);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    },
    onEditNode: function onEditNode() {
      this.editingNode = true;
    },
    onDoneEditingNode: function () {
      var _onDoneEditingNode = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee() {
        var options, _options;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              this.editingNode = false;
              if (this.obj.shortId() === this.newCompetency) {
                if (this.view.indexOf('import') !== -1) {
                  options = {
                    container: "#import",
                    easing: "ease",
                    offset: -150,
                    force: true,
                    cancelable: true,
                    onStart: false,
                    onDone: false,
                    onCancel: false,
                    x: false,
                    y: true
                  };
                  this.$scrollTo("#scroll-newCompetency", 500, options);
                } else if (this.conceptMode || this.progressionMode) {
                  _options = {
                    container: "#concept",
                    easing: "ease",
                    offset: -150,
                    force: true,
                    cancelable: true,
                    onStart: false,
                    onDone: false,
                    onCancel: false,
                    x: false,
                    y: true
                  };
                  this.$scrollTo("#scroll-newCompetency", 500, _options);
                } else {
                  this.$scrollTo("#scroll-newCompetency");
                }
              }
              if (this.$store.state.editor) {
                this.$store.commit('editor/newCompetency', null);
                this.$store.commit('editor/recomputeHierarchy', true);
              }
              // Update the obj prop passed to Thing/ThingEditing so edits are reflected
              _context.next = 5;
              return EcRepository.get(this.obj.shortId());
            case 5:
              this.changedObj = _context.sent;
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function onDoneEditingNode() {
        return _onDoneEditingNode.apply(this, arguments);
      }
      return onDoneEditingNode;
    }(),
    onAddNodeEvent: function onAddNodeEvent() {
      this.add(this.obj.shortId());
    },
    onExpandEvent: function onExpandEvent() {
      this.collapseIfPossible();
      this.childrenExpanded = !this.childrenExpanded;
    },
    collapseIfPossible: function collapseIfPossible() {
      if (this.hasChild.length > 0) {
        this.collapse = !this.collapse;
      }
    },
    // WARNING: The Daemon of OBO lingers in these here drag and move methods. The library moves the objects, and OBO will then come get you!
    beginDrag: function beginDrag(event) {
      if (event !== undefined) {
        this.controlOnStart = event.originalEvent.ctrlKey || event.originalEvent.shiftKey;
      }
      this.$emit('begin-drag');
    },
    endDrag: function endDrag(foo) {
      if (foo.to.id === 'framework_drag') {
        return;
      }
      appLog(foo.oldIndex, foo.newIndex);
      var toId = null;
      var plusup = 0;
      if (this.shiftKey) {
        this.controlOnStart = true;
      }
      if (foo.from.id === foo.to.id) {
        if (foo.newIndex + 1 < this.hasChild.length) {
          toId = this.hasChild[foo.newIndex + 1].obj.shortId();
        }
      } else {
        if (foo.to.children[foo.newIndex] === undefined) {
          toId = foo.to.id;
        } else {
          if (foo.to.id === "") {
            if (foo.newIndex < foo.to.children.length) {
              toId = foo.to.children[foo.newIndex].id;
            }
          } else {
            if (foo.newIndex + 1 < foo.to.children.length) {
              toId = foo.to.children[foo.newIndex + 1].id;
            }
          }
        }
      }
      this.move(foo.clone.id, toId, foo.from.id, foo.to.id, !this.controlOnStart, plusup);
    },
    move: function move(fromId, toId, fromContainerId, toContainerId, removeOldRelations, plusup) {
      this.$emit('move', fromId, toId, fromContainerId, toContainerId, removeOldRelations, plusup);
    },
    moveUp: function moveUp(thingId, index) {
      if (this.cantMoveUp) {
        return;
      }
      var fromId = thingId;
      var parent = this.parent.shortId();
      var toId = this.parentStructure[index - 1].obj.shortId();
      this.move(fromId, toId, parent, parent, true, 0);
    },
    moveDown: function moveDown(thingId, index) {
      if (this.cantMoveDown) {
        return;
      }
      var toId = null;
      var fromId = thingId;
      var parent = this.parent.shortId();
      if (index + 2 !== this.parentStructure.length) {
        var toId = this.parentStructure[index + 2].obj.shortId();
      }
      this.move(fromId, toId, parent, parent, true, 0);
    },
    moveRight: function moveRight(thingId, index) {
      if (this.cantMoveRight) {
        return;
      }
      var fromId = thingId;
      var toId = null;
      var fromContainerId = this.parent.shortId();
      var toContainerId = this.parentStructure[index - 1].obj.shortId();
      this.move(fromId, toId, fromContainerId, toContainerId, true, 0);
    },
    moveLeft: function moveLeft(thingId, index) {
      if (this.cantMoveLeft) {
        return;
      }
      var fromId = thingId;
      var fromContainerId = this.parent.shortId();
      var toId = null;
      var toContainerId = this.$parent.$parent.parent.shortId();
      // If attempting to move this to top level, then set toContainerId to null and toId equal to fromId to indicate top level
      if (toContainerId.includes('Framework') || this.parent["ceasn:isTopChildOf"] && this.parent["ceasn:isTopChildOf"].includes(toContainerId)) {
        toContainerId = '';
        toId = fromId;
      }
      this.move(fromId, toId, fromContainerId, toContainerId, true, 0);
    },
    add: function add(containerId) {
      this.$emit('add', containerId);
    },
    select: function select(objId, checked) {
      this.$emit('select', objId, checked);
    },
    removeObject: function removeObject(thing) {
      this.$emit('remove-object', thing);
    },
    onCreateNewNode: function onCreateNewNode(parentId, previousSiblingId) {
      this.$emit('create-new-node-event', parentId, previousSiblingId);
    },
    clickToSearch: function clickToSearch() {
      this.$store.commit('lode/competencySearchModalOpen', true);
      this.$store.commit('app/showModal', {
        component: 'SearchModal'
      });
      this.$store.commit('lode/searchType', "Competency");
      this.$store.commit('lode/copyOrLink', true);
      if (this.$store.state.editor) {
        this.$store.commit('editor/selectedCompetency', this.obj);
      }
    },
    getCanEditInCollection: function getCanEditInCollection() {
      var _this3 = this;
      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee2() {
        var frameworks;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return EcFramework.search(repo, 'competency:"' + _this3.obj.shortId() + '" AND NOT subType:Collection');
            case 2:
              frameworks = _context2.sent;
              if (frameworks && frameworks.length > 0) {
                _this3.canEditInCollection = false;
              } else {
                _this3.canEditInCollection = true;
              }
            case 4:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))();
    },
    selectChild: function selectChild(obj, selected) {
      if (obj.obj) {
        this.$emit('select', obj.obj.shortId(), selected);
        if (obj.children) {
          var _iterator2 = Object(createForOfIteratorHelper["a" /* default */])(obj.children),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var child = _step2.value;
              this.selectChild(child, selected);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      }
    },
    visibilityChanged: function visibilityChanged(isVisible, entry) {
      if (isVisible) {
        this.isVisible = true;
        if (this.containerSubType === 'Collection') {
          this.getCanEditInCollection();
        }
        appLog("node is visible");
      }
    }
  },
  watch: {
    propagateChecked: function propagateChecked() {
      var _this4 = this;
      setTimeout(function () {
        _this4.propagateChecked = 'parent';
      }, 1000);
    },
    relevantExistingAlignmentsMapLastUpdate: function relevantExistingAlignmentsMapLastUpdate() {
      // this is bobo but it works...screw you vue!!!
      if (this.view === 'crosswalk' && this.subview === 'crosswalkSource') {
        this.calculateSourceAlignmentCountByType();
      }
    },
    enabledRelationshipTypesLastUpdate: function enabledRelationshipTypesLastUpdate() {
      // this is bobo but it works...screw you vue!!!
      if (this.view === 'crosswalk' && this.subview === 'crosswalkSource') {
        this.buildCrosswalkOptions();
      }
    },
    // this doesn't work...nor does a regular watcher on relevantExistingAlignmentsMap..wtf vue???
    // relevantExistingAlignmentsMap: {
    //     handler(val) {
    //         appLog("WATCH relevantExistingAlignmentsMap !!!!!!");
    //         if (this.view === 'crosswalk' && this.subview === 'crosswalkSource') {
    //             this.calculateSourceAlignmentCountByType();
    //         }
    //     },
    //     deep: true
    // },
    targetNodesToHighlight: function targetNodesToHighlight() {
      if (this.view === 'crosswalk' && this.subview === 'crosswalkTarget') {
        if (this.obj && this.targetNodesToHighlight.includes(this.obj.shortId())) {
          this.crosswalkTargetClass = 'has-background-primary';
        } else this.crosswalkTargetClass = '';
      } else this.crosswalkTargetClass = '';
    },
    workingAlignmentsType: function workingAlignmentsType(val) {
      // This was getting spammed a lot...added extra check
      if (val !== '' && this.obj.shortId() === this.workingAlignmentsSource) {
        this.$store.commit('crosswalk/sourceState', 'selectTargets');
        this.$store.commit('crosswalk/targetState', 'ready');
        this.$store.commit('crosswalk/populateWorkingAlignmentMap');
      }
    },
    checked: function checked() {
      // Select event propagates up multiple components.
      this.$emit('select', this.obj.shortId(), this.checked);
      // If this node has hidden children (not expanded), then emit a selet signal for those as well
      if (!this.childrenExpanded) {
        var _iterator3 = Object(createForOfIteratorHelper["a" /* default */])(this.hasChild),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var child = _step3.value;
            this.selectChild(child, this.checked);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
      if (!this.checked) {
        this.unfocusHierarchyItem();
      }
    },
    selectAll: function selectAll() {
      this.checked = this.selectAll;
    },
    expandAll: function expandAll() {
      if (this.expandAll === true) {
        if (this.hasChild.length > 0) {
          this.collapse = false;
        }
        this.childrenExpanded = true;
      } else {
        // Otherwise collapse all
        if (this.hasChild.length > 0) {
          this.collapse = true;
        }
        this.childrenExpanded = false;
      }
    },
    parentChecked: function parentChecked() {
      if (!this.newCompetency) {
        if (this.view === 'framework' || this.view === 'concept') {
          if (this.propagateParentChecked === 'true') {
            this.checked = this.parentChecked;
          }
        } else {
          this.checked = this.parentChecked;
        }
      }
    },
    arrowKey: function arrowKey() {
      // If this is the only node selected and the arrow key changes, move item.
      if (this.view !== "crosswalk" && this.checked && this.selectedArray && this.selectedArray.length === 1) {
        var thingId = this.obj.shortId();
        var index = this.index;
        if (this.arrowKey === "ArrowLeft") {
          this.moveLeft(thingId, index);
        } else if (this.arrowKey === "ArrowRight") {
          this.moveRight(thingId, index);
        } else if (this.arrowKey === "ArrowUp") {
          this.moveUp(thingId, index);
        } else if (this.arrowKey === "ArrowDown") {
          this.moveDown(thingId, index);
        }
      }
    },
    cutId: function cutId() {
      if (this.cutId === this.obj.shortId()) {
        // operation is permitted
        if (this.obj.type === "Competency" || this.obj.type === "Concept" && this.canEditThing) {
          this.isItemCut = true;
          this.$store.commit('editor/cutOrCopyContainerId', this.parent.shortId());
        } else {
          this.$store.commit('editor/cutId', null);
        }
      } else {
        this.isItemCut = false;
      }
    },
    copyId: function copyId() {
      if (this.copyId === this.obj.shortId()) {
        if (this.obj.type === "Competency" || this.obj.type === "Concept" && this.canEditThing) {
          this.isItemCopied = true;
          this.$store.commit('editor/cutOrCopyContainerId', this.parent.shortId());
        } else {
          this.$store.commit('editor/copyId', null);
        }
      } else {
        this.isItemCopied = false;
      }
    },
    isItemFocused: function isItemFocused() {
      if (this.isItemFocused && (this.copyId && this.copyId !== this.obj.shortId() || this.cutId && this.cutId !== this.obj.shortId()) && (this.obj.type === "Competency" || this.obj.type === "Concept" && this.canEditThing)) {
        this.canPaste = true;
        this.$store.commit('editor/nodeInFocus', this.obj.shortId());
      } else {
        this.canPaste = false;
        if (this.$store.getters['editor/nodeInFocus'] === this.obj.shortId() && !this.copyId && !this.cutId) {
          this.$store.commit('editor/nodeInFocus', null);
        }
      }
    },
    paste: function paste() {
      var nodeToPasteUnder = this.$store.getters['editor/nodeInFocus'];
      if (this.paste && nodeToPasteUnder === this.obj.shortId() && (this.obj.type === "Competency" || this.obj.type === "Concept" && this.canEditThing)) {
        this.move(this.cutId ? this.cutId : this.copyId, null, this.$store.getters['editor/cutOrCopyContainerId'], this.obj.shortId(), this.cutId !== null, 0);
        this.$store.commit('editor/cutId', null);
        this.$store.commit('editor/copyId', null);
        this.$store.commit('editor/paste', false);
        this.$store.commit('editor/cutOrCopyContainerId', null);
        this.$store.commit('editor/nodeInFocus', null);
      }
    },
    selectedArray: function selectedArray() {
      if (this.selectedArray && this.selectedArray.length) {
        if (EcArray.has(this.selectedArray, this.obj.shortId())) {
          this.checked = true;
        } else {
          this.checked = false;
        }
      } else {
        this.checked = false;
      }
    }
  }
});
// CONCATENATED MODULE: ./src/lode/components/HierarchyNode.vue?vue&type=script&lang=js
 /* harmony default export */ var components_HierarchyNodevue_type_script_lang_js = (HierarchyNodevue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/lode/components/HierarchyNode.vue?vue&type=style&index=0&id=752e023a&prod&lang=scss
var HierarchyNodevue_type_style_index_0_id_752e023a_prod_lang_scss = __webpack_require__("3fa6");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/lode/components/HierarchyNode.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_HierarchyNodevue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var HierarchyNode = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=chunk-4cf587c0.ac4b4149.js.map