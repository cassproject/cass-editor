(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-6a6fd63e"],{

/***/ "21fc":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "9418":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("fb6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"18a0cdb9-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/lode/components/Hierarchy.vue?vue&type=template&id=174edffe




var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "lode__hierarchy",
    class: {
      'is-dragging': _vm.dragging
    }
  }, [_c('div', {
    staticClass: "hierarchy-buttons"
  }, [_c('div', {
    staticClass: "columns is-gapless is-paddingless is-mobile is-marginless is-paddingless"
  }, [_c('div', {
    staticClass: "column is-narrow"
  }, [_vm.expanded && _vm.hierarchyEnabled ? _c('div', {
    staticClass: "icon is-vcentered",
    on: {
      "click": function click($event) {
        _vm.expanded = false;
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-caret-down has-text-primary is-size-2"
  })]) : !_vm.expanded && _vm.hierarchyEnabled ? _c('div', {
    staticClass: "icon is-vcentered",
    on: {
      "click": function click($event) {
        _vm.expanded = true;
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-caret-right has-text-primary is-size-2"
  })]) : _c('div', {
    staticClass: "icon is-vcentered"
  }, [_c('i', {
    staticClass: "fa fa-circle is-size-7 has-text-light"
  })]), _vm.selectButtonText ? _c('div', {
    staticClass: "button is-outlined is-primary",
    on: {
      "click": function click($event) {
        return _vm.$emit('select-button-click', _vm.selectedArray);
      }
    }
  }, [_vm._v(" " + _vm._s(_vm.selectButtonText) + " ")]) : _vm._e()]), _c('div', {
    staticClass: "column is-narrow"
  }, [_vm.canEdit && _vm.view !== 'importPreview' && _vm.view !== 'importLight' && _vm.view !== 'crosswalk' && _vm.hierarchyEnabled || _vm.queryParams.select || _vm.view === 'competencySearch' ? _c('div', {
    staticClass: "pl-2 check-radio-all-column"
  }, [_c('div', {
    staticClass: "field"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.selectAll,
      expression: "selectAll"
    }],
    staticClass: "is-checkradio",
    attrs: {
      "id": "selectAllCheckbox",
      "type": "checkbox",
      "name": "selectAllCheckbox"
    },
    domProps: {
      "checked": Array.isArray(_vm.selectAll) ? _vm._i(_vm.selectAll, null) > -1 : _vm.selectAll
    },
    on: {
      "change": function change($event) {
        var $$a = _vm.selectAll,
          $$el = $event.target,
          $$c = $$el.checked ? true : false;
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.selectAll = $$a.concat([$$v]));
          } else {
            $$i > -1 && (_vm.selectAll = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.selectAll = $$c;
        }
      }
    }
  }), _c('label', {
    attrs: {
      "for": "selectAllCheckbox"
    }
  })])]) : _vm._e()]), _vm.view === 'crosswalk' ? _c('div', {
    staticClass: "crosswalk-buttons column is-fullwidth"
  }, [_c('div', {
    staticClass: "buttons is-right"
  }, [_c('div', {
    staticClass: "button is-small is-outlined is-primary",
    class: {
      'is-focused': _vm.filter === 'showAligned'
    },
    attrs: {
      "title": "show aligned only"
    },
    on: {
      "click": function click($event) {
        return _vm.filterHierarchy('showAligned');
      }
    }
  }, [_vm._m(0)]), _c('div', {
    staticClass: "button is-small is-outlined is-primary",
    class: {
      'is-focused': _vm.filter === 'showUnaligned'
    },
    attrs: {
      "title": "show unaligned only"
    },
    on: {
      "click": function click($event) {
        return _vm.filterHierarchy('showUnaligned');
      }
    }
  }, [_vm._m(1)]), _c('div', {
    staticClass: "button is-outlined is-small is-primary",
    class: {
      'is-focused': _vm.filter === 'showAll'
    },
    attrs: {
      "title": "show all"
    },
    on: {
      "click": function click($event) {
        return _vm.filterHierarchy('showAll');
      }
    }
  }, [_vm._m(2)]), _vm.subview === 'crosswalkSource' && _vm.alignmentsToSave.length === 0 ? _c('button', {
    staticClass: "button is-small is-outlined is-dark",
    attrs: {
      "title": "change source"
    },
    on: {
      "click": _vm.changeFrameworkSource
    }
  }, [_vm._m(3)]) : _vm.subview === 'crosswalkTarget' && _vm.alignmentsToSave.length === 0 ? _c('button', {
    staticClass: "button is-small is-outlined is-dark",
    attrs: {
      "title": "change target"
    },
    on: {
      "click": _vm.changeFrameworkTarget
    }
  }, [_vm._m(4)]) : _vm._e()])]) : _vm._e(), _vm.view !== 'crosswalk' && _vm.view !== 'competencySearch' ? _c('div', {
    staticClass: "column is-narrow"
  }, [_c('div', {
    staticClass: "buttons"
  }, [_vm.multipleSelected && _vm.view !== 'import' && _vm.canEdit ? _c('div', {
    staticClass: "button is-outlined is-primary",
    on: {
      "click": function click($event) {
        return _vm.$emit('edit-multiple-event');
      }
    }
  }, [_vm._m(5), _c('span', [_vm._v(" Edit multiple ")])]) : _vm._e(), !_vm.addingNode && _vm.canEdit && !_vm.multipleSelected ? _c('div', {
    staticClass: "button is-outlined is-primary",
    on: {
      "click": function click($event) {
        _vm.addingNode = true;
      }
    }
  }, [_vm._m(6), _c('span', [_vm._v(" " + _vm._s(_vm.addCompetencyOrChildText) + " ")])]) : _vm._e(), !_vm.addingNode && _vm.canEdit && !_vm.multipleSelected && _vm.canCopyOrCut ? _c('div', {
    staticClass: "button is-outlined is-danger",
    on: {
      "click": _vm.deleteSelected
    }
  }, [_vm._m(7), _c('span', [_vm._v(" delete item ")])]) : _vm._e(), _vm.addingNode ? _c('div', {
    staticClass: "button is-outlined is-dark",
    on: {
      "click": function click($event) {
        _vm.addingNode = false;
      }
    }
  }, [_vm._m(8), _c('span', [_vm._v("cancel")])]) : _vm._e(), _vm.addingNode ? _c('div', {
    staticClass: "button is-outlined is-primary",
    class: {
      'is-loading': _vm.loading
    },
    on: {
      "click": _vm.onClickCreateNew
    }
  }, [_vm._m(9), _c('span', [_vm._v(" create new ")])]) : _vm._e(), _vm.addingNode ? _c('div', {
    staticClass: "button is-outlined is-primary",
    on: {
      "click": _vm.clickToSearch
    }
  }, [_vm._m(10), _c('span', [_vm._v("search")])]) : _vm._e(), (_vm.view === 'framework' || _vm.view === 'concept') && _vm.hierarchyEnabled ? _c('div', {
    staticClass: "button is-outlined",
    class: _vm.canCopyOrCut ? 'is-primary' : 'is-disabled',
    attrs: {
      "disabled": !_vm.canCopyOrCut,
      "title": "Copy competency"
    },
    on: {
      "click": _vm.copyClick
    }
  }, [_vm._m(11)]) : _vm._e(), (_vm.view === 'framework' || _vm.view === 'concept') && _vm.hierarchyEnabled ? _c('div', {
    staticClass: "button is-outlined",
    class: _vm.canCopyOrCut ? 'is-primary' : 'is-disabled',
    attrs: {
      "title": "Cut competency",
      "disabled": !_vm.canCopyOrCut
    },
    on: {
      "click": _vm.cutClick
    }
  }, [_vm._m(12)]) : _vm._e(), (_vm.view === 'framework' || _vm.view === 'concept') && _vm.hierarchyEnabled ? _c('div', {
    staticClass: "button is-outlined",
    class: _vm.canPaste ? 'is-primary' : 'is-disabled',
    attrs: {
      "disabled": !_vm.canPaste,
      "title": "Paste competency"
    },
    on: {
      "click": _vm.pasteClick
    }
  }, [_vm._m(13)]) : _vm._e(), (_vm.view === 'framework' || _vm.view === 'concept') && _vm.hierarchyEnabled ? _c('div', {
    staticClass: "button is-outlined",
    class: _vm.clipboardContainsItem ? 'is-danger' : 'is-disabled',
    attrs: {
      "disabled": !_vm.clipboardContainsItem,
      "title": "Clear clipboard"
    },
    on: {
      "click": _vm.clearClipboard
    }
  }, [_vm._m(14)]) : _vm._e()])]) : _vm._e(), _vm.view === 'importPreview' || _vm.view === 'importLight' ? _c('div', {
    staticClass: "column"
  }, [_c('div', {
    staticClass: "buttons is-right"
  }, [_c('div', {
    staticClass: "buttons is-small is-right"
  }, [_c('div', {
    staticClass: "button is-light is-small is-pulled-right is-dark is-outlined",
    on: {
      "click": _vm.cancelImport
    }
  }, [_c('span', [_vm._v(" Cancel ")]), _vm._m(15)]), _vm.view === 'importLight' && (_vm.importType !== 'text' || _vm.importType === 'text' && _vm.importStatus === 'Competency detected') ? _c('div', {
    staticClass: "button is-small is-dark is-outlined is-pulled-right",
    on: {
      "click": function click($event) {
        return _vm.showModal('export');
      }
    }
  }, [_c('span', [_vm._v(" Export ")]), _vm._m(16)]) : _vm._e(), _vm.view === 'importLight' && (_vm.importType !== 'text' || _vm.importType === 'text' && _vm.importStatus === 'Competency detected') ? _c('div', {
    staticClass: "button is-small is-dark is-outlined is-pulled-right",
    on: {
      "click": function click($event) {
        return _vm.$store.dispatch('app/clearImport');
      }
    }
  }, [_c('span', [_vm._v(" import again ")]), _vm._m(17)]) : _vm._e(), _vm.view === 'importLight' && (_vm.importType !== 'text' || _vm.importType === 'text' && _vm.importStatus === 'Competency detected') ? _c('div', {
    staticClass: "button is-small is-dark is-outlined is-pulled-right",
    on: {
      "click": _vm.openFramework
    }
  }, [_c('span', [_vm._v("view in editor")]), _vm._m(18)]) : _vm._e(), _vm.view === 'importPreview' ? _c('div', {
    staticClass: "button is-small is-primary is-outlined is-pulled-right",
    on: {
      "click": function click($event) {
        return _vm.$store.commit('app/importTransition', 'light');
      }
    }
  }, [_c('span', [_vm._v(" done editing ")]), _vm._m(19)]) : _vm._e(), _vm.view === 'importLight' && (_vm.importType !== 'text' || _vm.importType === 'text' && _vm.importStatus === 'Competency detected') ? _c('router-link', {
    staticClass: "button is-small is-primary is-outlined is -pulled-right",
    attrs: {
      "to": {
        path: '/frameworks',
        query: _vm.queryParams
      }
    }
  }, [_c('span', [_vm._v(" Done ")]), _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-home"
  })])]) : _vm._e()], 1)])]) : _vm._e()]), _vm.canEditAssertions && _vm.managingAssertions ? _c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-narrow assertion-subject-select"
  }, [_c('span', [_vm._v("Manage Assertions for: ")]), _vm.selectedSubject ? _c('button', {
    staticClass: "button is-outlined is-primary assertion-subject-select-button",
    on: {
      "click": _vm.openSelectSubjectModal
    }
  }, [_vm._v(" " + _vm._s(_vm.selectedSubject) + " ")]) : _vm._e()])]) : _vm._e()]), _vm.hierarchy ? [_c('draggable', _vm._b({
    staticClass: "lode__hierarchy-ul",
    class: _vm.scrolled ? 'ul-list-scrolled' : '',
    attrs: {
      "tag": "ul",
      "disabled": _vm.canEdit !== true || !_vm.isDraggable || !_vm.hierarchyEnabled,
      "group": {
        name: 'test'
      },
      "handle": ".handle"
    },
    on: {
      "start": _vm.beginDrag,
      "end": _vm.endDrag
    },
    model: {
      value: _vm.hierarchy,
      callback: function callback($$v) {
        _vm.hierarchy = $$v;
      },
      expression: "hierarchy"
    }
  }, 'draggable', _vm.dragOptions, false), _vm._l(_vm.hierarchy, function (item, index) {
    return _c('HierarchyNode', {
      key: item.obj.id,
      staticClass: "lode__hierarchy-li",
      attrs: {
        "depth": 1,
        "view": _vm.view,
        "subview": _vm.subview,
        "obj": item.obj,
        "dragging": _vm.dragging,
        "canEdit": _vm.canEdit,
        "hasChild": item.children,
        "profile": _vm.profile,
        "highlightList": _vm.highlightList,
        "selectAll": _vm.selectAll,
        "newFramework": _vm.newFramework,
        "index": index,
        "parentStructure": _vm.hierarchy,
        "parent": _vm.container,
        "frameworkEditable": _vm.canEdit,
        "filter": _vm.filter,
        "selectedArray": _vm.selectedArray,
        "properties": _vm.properties,
        "expandAll": _vm.expanded == true,
        "shiftKey": _vm.shiftKey,
        "arrowKey": _vm.arrowKey,
        "largeNumberOfItems": _vm.hasLargeNumberOfItems,
        "hierarchyEnabled": _vm.hierarchyEnabled,
        "containerSubType": _vm.container.subType,
        "canEditAssertions": _vm.canEditAssertions,
        "propagateParentChecked": "false"
      },
      on: {
        "create-new-node-event": _vm.onCreateNewNode,
        "mounting-node": _vm.handleMountingNode,
        "begin-drag": _vm.beginDrag,
        "move": _vm.move,
        "select": _vm.select,
        "add": _vm.add,
        "remove-object": _vm.removeObject,
        "draggable-check": _vm.onDraggableCheck
      }
    });
  }), 1)] : _vm._e(), _c('modal-template', {
    attrs: {
      "active": _vm.showSelectSubjectModal
    }
  }, [_c('template', {
    slot: "modal-header"
  }, [_c('p', {
    staticClass: "is-size-3 modal-card-title has-text-white"
  }, [_vm._v(" Select Subject ")])]), _c('template', {
    slot: "modal-body"
  }, [_c('div', {
    staticClass: "field"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.personFilter,
      expression: "personFilter"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": "search for person..."
    },
    domProps: {
      "value": _vm.personFilter
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.personFilter = $event.target.value;
      }
    }
  })]), _vm.filteredAvailablePersons.length === 0 && _vm.personFilter === '' ? _c('div', [_c('i', {
    staticClass: "fa fa-info-circle"
  }), _vm._v(" No users found ")]) : _vm._e(), _vm.filteredAvailablePersons.length > 0 ? _c('div', [_c('h4', {
    staticClass: "header is-size-3"
  }, [_vm._v(" Available users ")]), _c('div', {
    staticClass: "table-container"
  }, [_c('table', {
    staticClass: "table is-hoverable is-fullwidth"
  }, [_c('thead', [_c('tr', [_c('th', {
    attrs: {
      "title": "Add as member"
    }
  }, [_c('i', {
    staticClass: "fa fa-user"
  })]), _c('th', {
    attrs: {
      "title": "Add as manager"
    }
  }, [_c('i', {
    staticClass: "fa fa-user-shield"
  })])])]), _c('tbody', _vm._l(_vm.filteredAvailablePersons, function (prs, index) {
    return _c('tr', {
      key: index,
      staticStyle: {
        "cursor": "pointer"
      },
      on: {
        "click": function click($event) {
          return _vm.setSubject(prs.owner[0]);
        }
      }
    }, [_c('td', [_vm._v(" " + _vm._s(prs.getName()) + " ")]), _c('td', [_vm._v(" " + _vm._s(prs.email) + " ")])]);
  }), 0)])])]) : _vm._e()]), _c('template', {
    slot: "modal-foot"
  }, [_c('div', {
    staticClass: "button is-outlined is-small",
    attrs: {
      "title": "Cancel"
    },
    on: {
      "click": _vm.closeSelectSubjectModal
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-times"
  })]), _c('span', [_vm._v(" cancel ")])])])], 2)], 2);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-link"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-unlink"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-list-alt"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-exchange-alt"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-exchange-alt"
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
    staticClass: "fa fa-plus-circle"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-plus-circle"
  })]);
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
    staticClass: "fa fa-search"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-copy"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fas handle fa-cut"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-paste"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fas fa-clipboard"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-times-circle"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-download"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-redo-alt"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-edit"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-arrow-right"
  })]);
}];

// CONCATENATED MODULE: ./src/lode/components/Hierarchy.vue?vue&type=template&id=174edffe

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
var regeneratorRuntime = __webpack_require__("c7eb");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__("3ca3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.sort.js
var es_array_sort = __webpack_require__("4e82");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__("a434");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.search.js
var es_string_search = __webpack_require__("841c");

// EXTERNAL MODULE: ./node_modules/lodash/debounce.js
var debounce = __webpack_require__("b047");
var debounce_default = /*#__PURE__*/__webpack_require__.n(debounce);

// EXTERNAL MODULE: ./src/mixins/common.js
var common = __webpack_require__("872c");

// EXTERNAL MODULE: ./src/mixins/competencyEdits.js
var competencyEdits = __webpack_require__("6ffa4");

// EXTERNAL MODULE: ./src/components/modalContent/ModalTemplate.vue + 4 modules
var ModalTemplate = __webpack_require__("af07");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/lode/components/Hierarchy.vue?vue&type=script&lang=js



















/* harmony default export */ var Hierarchyvue_type_script_lang_js = ({
  name: 'Hierarchy',
  mixins: [common["a" /* default */], competencyEdits["a" /* default */]],
  props: {
    scrolled: Boolean,
    container: Object,
    containerType: String,
    containerTypeGet: String,
    containerNodeProperty: String,
    containerEdgeProperty: String,
    nodeType: String,
    edgeType: String,
    edgeRelationProperty: String,
    edgeSourceProperty: String,
    edgeTargetProperty: String,
    edgeRelationLiteral: String,
    viewOnly: Boolean,
    repo: Object,
    profile: Object,
    highlightList: Array,
    newFramework: Boolean,
    properties: String,
    view: {
      type: String,
      default: 'framework'
    },
    subview: {
      type: String,
      default: ''
    },
    canEditAssertions: Boolean
  },
  data: function data() {
    return {
      LARGE_NUMBER_OF_ITEMS: 200,
      filter: 'showAll',
      dragIcon: 'fa-arrows-alt',
      dragOptions: {
        delay: 0,
        scroll: true,
        disabled: false,
        emptyInsertThreshold: 5,
        swapThreshold: 0.25,
        invertSwap: true,
        invertedSwapThreshold: 0.25,
        animation: 0,
        ghostClass: 'ghost-drag',
        chosenClass: 'chosen-drag',
        dragClass: 'drag',
        scrollSensitivity: 30,
        scrollSpeed: 5,
        forceFallback: true
      },
      multipleSelected: false,
      addingNode: false,
      structure: [],
      once: true,
      dragging: false,
      controlOnStart: false,
      selectAll: false,
      selectedArray: [],
      selectButtonText: null,
      expanded: true,
      showAligned: false,
      isDraggable: true,
      shiftKey: false,
      arrowKey: null,
      addCompetencyOrChildText: "Add",
      hierarchy: null,
      selectedSubject: null,
      availablePersons: [],
      personFilter: '',
      loading: false
    };
  },
  components: {
    HierarchyNode: function HierarchyNode() {
      return __webpack_require__.e(/* import() */ "chunk-4cf587c0").then(__webpack_require__.bind(null, "b709"));
    },
    draggable: function draggable() {
      return __webpack_require__.e(/* import() */ "chunk-4a5f46a6").then(__webpack_require__.t.bind(null, "b76a", 7));
    },
    ModalTemplate: ModalTemplate["a" /* default */]
  },
  watch: {
    relations: function relations() {
      this.once = true;
    },
    competencies: function competencies() {
      this.once = true;
    },
    selectedArray: function selectedArray() {
      if (this.selectedArray.length > 1) {
        this.multipleSelected = true;
      } else {
        this.multipleSelected = false;
        this.addingNode = false;
      }
      if (this.selectedArray.length === 1) {
        this.addCompetencyOrChildText = "Add Child";
      } else {
        this.addCompetencyOrChildText = "Add";
      }
      this.$emit('selected-array', this.selectedArray);
    },
    addAnother: function addAnother(val) {
      if (val) {
        this.onClickCreateNew();
        this.$store.commit('editor/addAnother', false);
      }
    },
    once: function once(val) {
      if (val) {
        this.computeHierarchy();
      }
    },
    currentSubject: function currentSubject() {
      this.getSubjectInfo();
    }
  },
  computed: {
    showSelectSubjectModal: function showSelectSubjectModal() {
      return this.$store.getters['app/showModal'] && this.$store.getters['app/dynamicModalContent'] === 'Subject';
    },
    hierarchyEnabled: function hierarchyEnabled() {
      if (this.container.subType === 'Collection') {
        return false;
      } else {
        return true;
      }
    },
    filteredAvailablePersons: function filteredAvailablePersons() {
      var _this = this;
      return this.availablePersons.filter(function (person) {
        return person.getName() && person.getName().toLowerCase().indexOf(_this.personFilter.toLowerCase()) > -1 || person.email && person.email.toLowerCase().indexOf(_this.personFilter.toLowerCase()) > -1;
      });
    },
    relations: function relations() {
      return this.container.relation;
    },
    competencies: function competencies() {
      return this.container.competency;
    },
    canCopyOrCut: function canCopyOrCut() {
      if (this.selectedArray && this.selectedArray.length === 1) {
        return true;
      } else {
        return false;
      }
    },
    clipboardContainsItem: function clipboardContainsItem() {
      if (this.$store.getters['editor/copyId'] !== null || this.$store.getters['editor/cutId'] !== null) {
        return true;
      } else {
        return false;
      }
    },
    canPaste: function canPaste() {
      if ((this.$store.getters['editor/copyId'] !== null || this.$store.getters['editor/cutId'] !== null) && this.$store.getters['editor/nodeInFocus'] !== null) {
        return true;
      } else {
        return false;
      }
    },
    alignmentsToSave: function alignmentsToSave() {
      if (this.$store.getters['crosswalk/alignmentsToSave']) {
        return this.$store.getters['crosswalk/alignmentsToSave'];
      } else {
        return [];
      }
    },
    showAddComments: function showAddComments() {
      if (this.$store.getters['editor/queryParams'].concepts === "true" || this.$store.getters['editor/conceptMode'] === true || this.$store.getters['editor/progressionMode'] === true) {
        return false;
      }
      return this.$store.state.app.canAddComments;
    },
    importType: function importType() {
      return this.$store.getters['app/importType'];
    },
    importStatus: function importStatus() {
      return this.$store.getters['app/importStatus'];
    },
    importTransition: function importTransition() {
      return this.$store.getters['app/importTransition'];
    },
    queryParams: function queryParams() {
      return this.$store.getters['editor/queryParams'];
    },
    addAnother: function addAnother() {
      return this.$store.getters['editor/addAnother'];
    },
    // True if the current client can edit this object.
    canEdit: function canEdit() {
      if (this.viewOnly === true) {
        return false;
      }
      return this.canEditAny(this.container);
    },
    hasLargeNumberOfItems: function hasLargeNumberOfItems() {
      if (this.container == null) {
        return false;
      }
      return this.container.competency && this.container.competency.length >= this.LARGE_NUMBER_OF_ITEMS;
    },
    managingAssertions: function managingAssertions() {
      return this.$store.getters['editor/manageAssertions'];
    },
    currentSubject: function currentSubject() {
      return this.$store.getters['editor/getSubject'];
    },
    editingCompetency: function editingCompetency() {
      return this.$store.getters['editor/selectedCompetency'] != null;
    }
  },
  mounted: function mounted() {
    var me = this;
    var precache = [];
    if (this.container[this.containerNodeProperty] != null) {
      precache = precache.concat(this.container[this.containerNodeProperty]);
    }
    if (this.container[this.containerEdgeProperty] != null) {
      precache = precache.concat(this.container[this.containerEdgeProperty]);
    }
    if (precache.length > 0) {
      this.repo.multiget(precache, function (success) {
        me.computeHierarchy();
      }, appError);
    } else {
      me.computeHierarchy();
    }
    if (this.queryParams) {
      if (this.queryParams.singleSelect) {
        this.selectButtonText = this.queryParams.singleSelect;
      }
      if (this.queryParams.select) {
        if (this.queryParams.select !== "" && this.queryParams.select !== "select") {
          this.selectButtonText = this.queryParams.select;
        }
      }
    }
    if (this.hasLargeNumberOfItems) {
      this.expanded = false;
    }
    window.addEventListener("keydown", this.keydown);
    window.addEventListener("keyup", this.keyup);
    if (this.$store.getters['editor/getSubject']) {
      this.getSubjectInfo();
    }
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('keyup', this.keyup);
    window.removeEventListener('keydown', this.keydown);
  },
  methods: {
    clearClipboard: function clearClipboard() {
      this.$store.commit('editor/copyId', null);
      this.$store.commit('editor/cutId', null);
      this.$store.commit('editor/paste', false);
    },
    cutClick: function cutClick() {
      if (this.selectedArray && this.selectedArray.length === 1) {
        this.$store.commit('editor/cutId', this.selectedArray[0]);
      }
      this.$store.commit('editor/copyId', null);
      this.$store.commit('editor/paste', false);
    },
    copyClick: function copyClick() {
      if (this.selectedArray && this.selectedArray.length === 1) {
        this.$store.commit('editor/copyId', this.selectedArray[0]);
      }
      this.$store.commit('editor/cutId', null);
      this.$store.commit('editor/paste', false);
    },
    pasteClick: function pasteClick() {
      this.$store.commit('editor/paste', true);
    },
    keydown: function keydown(e) {
      if (!this.editingCompetency) {
        if (this.canEdit) {
          if (e.shiftKey) {
            this.shiftKey = true;
          }
          if (e.key.indexOf("Arrow") !== -1 && e.shiftKey) {
            this.arrowKey = e.key;
          }
          if (e.key === "x" && e.ctrlKey) {
            if (this.selectedArray && this.selectedArray.length === 1) {
              this.$store.commit('editor/cutId', this.selectedArray[0]);
            }
            this.$store.commit('editor/copyId', null);
            this.$store.commit('editor/paste', false);
          }
          if (e.key === "c" && e.ctrlKey) {
            if (this.selectedArray && this.selectedArray.length === 1) {
              this.$store.commit('editor/copyId', this.selectedArray[0]);
            }
            this.$store.commit('editor/cutId', null);
            this.$store.commit('editor/paste', false);
          }
          if (e.key === "v" && e.ctrlKey) {
            this.$store.commit('editor/paste', true);
          }
        }
        if (e.key.indexOf("Arrow") !== -1 && !e.shiftKey && !e.ctrlKey) {
          if (e.key === "ArrowLeft") {
            this.expanded = false;
          } else if (e.key === "ArrowRight") {
            this.expanded = true;
          }
        }
      }
    },
    keyup: function keyup(e) {
      if (!e.shiftKey) {
        this.shiftKey = false;
      }
      if (e.key.indexOf("Arrow") !== -1) {
        this.arrowKey = null;
      }
    },
    showModal: function showModal(val, data) {
      if (val === 'export') {
        this.$store.commit('editor/setItemToExport', this.container);
        this.$store.commit('app/showModal', {
          title: 'Export Framework',
          component: 'ExportOptionsModal'
        });
      } else if (val === 'subject') {
        this.$store.commit('app/showModal', 'Subject');
      }
    },
    openFramework: function () {
      var _openFramework = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee() {
        var f;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return EcFramework.get(this.container.shortId());
            case 2:
              f = _context.sent;
              this.$store.commit('editor/framework', f);
              this.$router.push({
                name: "framework",
                params: {
                  frameworkId: this.container.id
                }
              });
            case 5:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function openFramework() {
        return _openFramework.apply(this, arguments);
      }
      return openFramework;
    }(),
    changeFrameworkTarget: function changeFrameworkTarget() {
      this.$store.commit('crosswalk/step', 1);
    },
    changeFrameworkSource: function changeFrameworkSource() {
      this.$store.commit('crosswalk/step', 0);
    },
    filterHierarchy: function filterHierarchy(typeOfFilter) {
      // mightnot need val if I can watch something else for css updates on buttons
      this.filter = typeOfFilter;
    },
    onCreateNewNode: function onCreateNewNode(parentId, previousSiblingId) {
      this.add(parentId, previousSiblingId);
    },
    /*
     * when a child node is mounted it emits an event
     * and a timeout is started
     */
    handleMountingNode: function handleMountingNode() {
      this.startTime();
    },
    /*
     * each mount resets the timeout
     * if the timeout length is met (no new nodes)
     * the done loading event is triggered
     */
    startTime: debounce_default()(function () {
      this.$emit('done-loading-nodes');
    }, 100),
    computeHierarchy: function () {
      var _computeHierarchy = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee2() {
        var me, r, top, i, c, encryptedType, comp, a, keys;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              me = this;
              r = {};
              top = {};
              if (!(this.container == null)) {
                _context2.next = 5;
                break;
              }
              return _context2.abrupt("return", r);
            case 5:
              if (!(this.container[this.containerNodeProperty] !== null && this.container[this.containerNodeProperty] !== undefined)) {
                _context2.next = 28;
                break;
              }
              i = 0;
            case 7:
              if (!(i < this.container[this.containerNodeProperty].length)) {
                _context2.next = 28;
                break;
              }
              _context2.next = 10;
              return window[this.nodeType].get(this.container[this.containerNodeProperty][i]);
            case 10:
              c = _context2.sent;
              if (!(c == null)) {
                _context2.next = 24;
                break;
              }
              _context2.next = 14;
              return EcRepository.get(this.container[this.containerNodeProperty][i]);
            case 14:
              c = _context2.sent;
              if (!(c && c.encryptedType && c.encryptedType.toLowerCase() === this.containerNodeProperty)) {
                _context2.next = 24;
                break;
              }
              encryptedType = "Ec" + c.encryptedType;
              comp = new window[encryptedType]();
              _context2.t0 = comp;
              _context2.next = 21;
              return EcEncryptedValue.fromEncryptedValue(c);
            case 21:
              _context2.t1 = _context2.sent;
              _context2.t0.copyFrom.call(_context2.t0, _context2.t1);
              c = comp;
            case 24:
              if (c !== null) {
                r[this.container[this.containerNodeProperty][i]] = r[c.shortId()] = top[c.shortId()] = c;
              }
            case 25:
              i++;
              _context2.next = 7;
              break;
            case 28:
              if (!(this.container[this.containerEdgeProperty] != null && this.container[this.containerEdgeProperty] !== undefined)) {
                _context2.next = 50;
                break;
              }
              i = 0;
            case 30:
              if (!(i < this.container[this.containerEdgeProperty].length)) {
                _context2.next = 50;
                break;
              }
              a = null;
              _context2.next = 34;
              return window[this.edgeType].get(this.container[this.containerEdgeProperty][i]);
            case 34:
              a = _context2.sent;
              if (!(a != null)) {
                _context2.next = 46;
                break;
              }
              if (!(a[this.edgeRelationProperty] === this.edgeRelationLiteral)) {
                _context2.next = 44;
                break;
              }
              if (!(r[a[this.edgeTargetProperty]] == null)) {
                _context2.next = 39;
                break;
              }
              return _context2.abrupt("continue", 47);
            case 39:
              if (!(r[a[this.edgeSourceProperty]] == null)) {
                _context2.next = 41;
                break;
              }
              return _context2.abrupt("continue", 47);
            case 41:
              if (r[a[this.edgeTargetProperty]]._children == null) {
                r[a[this.edgeTargetProperty]]._children = [];
              }
              r[a[this.edgeTargetProperty]]._children.push(r[a[this.edgeSourceProperty]]);
              delete top[a[this.edgeSourceProperty]];
            case 44:
              _context2.next = 47;
              break;
            case 46:
              appLog("Hierarchy: Could not find edge: " + this.container[this.containerEdgeProperty][i]);
            case 47:
              i++;
              _context2.next = 30;
              break;
            case 50:
              if (!(this.container[this.containerNodeProperty] != null)) {
                _context2.next = 59;
                break;
              }
              i = 0;
            case 52:
              if (!(i < this.container[this.containerNodeProperty].length)) {
                _context2.next = 59;
                break;
              }
              if (!(!r[this.container[this.containerNodeProperty][i]] || r[this.container[this.containerNodeProperty][i]]._children == null)) {
                _context2.next = 55;
                break;
              }
              return _context2.abrupt("continue", 56);
            case 55:
              r[this.container[this.containerNodeProperty][i]]._children.sort(function (a, b) {
                return me.container[me.containerNodeProperty].indexOf(a.shortId()) - me.container[me.containerNodeProperty].indexOf(b.shortId());
              });
            case 56:
              i++;
              _context2.next = 52;
              break;
            case 59:
              this.structure.splice(0, this.structure.length);
              keys = EcObject.keys(top);
              for (i = 0; i < keys.length; i++) {
                this.structure.push(top[keys[i]]);
              }
              this.structure.sort(function (a, b) {
                return me.container[me.containerNodeProperty].indexOf(a.shortId()) - me.container[me.containerNodeProperty].indexOf(b.shortId());
              });
              this.packChildren(this.structure);
              this.deleteUnderscore(this.structure);
              this.once = false;
              this.hierarchy = this.structure;
            case 67:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function computeHierarchy() {
        return _computeHierarchy.apply(this, arguments);
      }
      return computeHierarchy;
    }(),
    packChildren: function packChildren(item) {
      if (item == null) return;
      for (var i = 0; i < item.length; i++) {
        if (!item[i].obj) {
          item[i] = {
            obj: item[i],
            children: item[i]._children === undefined ? [] : item[i]._children
          };
        }
      }
      for (var i = 0; i < item.length; i++) {
        this.packChildren(item[i].children);
      }
    },
    deleteUnderscore: function deleteUnderscore(item) {
      if (item == null) return;
      for (var i = 0; i < item.length; i++) {
        delete item[i].obj._children;
        this.deleteUnderscore(item[i].children);
      }
    },
    // WARNING: The Daemon of OBO lingers in these here drag and move methods. The library moves the objects, and OBO will then come get you!
    beginDrag: function beginDrag(event) {
      this.dragging = true;
      if (event !== undefined) {
        this.controlOnStart = event.originalEvent.ctrlKey || event.originalEvent.shiftKey;
      }
    },
    endDrag: function endDrag(foo) {
      if (foo.to.id === 'framework_drag') {
        this.dragging = false;
        return;
      }
      appLog(foo.oldIndex, foo.newIndex);
      var toId = null;
      var toLast = false;
      if (this.shiftKey) {
        this.controlOnStart = true;
      }
      if (foo.from.id === foo.to.id) {
        if (foo.newIndex + 1 < this.hierarchy.length) {
          toId = this.hierarchy[foo.newIndex + 1].obj.shortId();
        } else if (foo.newIndex === this.hierarchy.length - 1) {
          toLast = true;
        }
      } else {
        if (foo.to.children[foo.newIndex] === undefined) {
          toId = foo.to.id;
        } else {
          if (foo.newIndex + 1 < foo.to.children.length) {
            toId = foo.to.children[foo.newIndex + 1].id;
          }
        }
      }
      this.move(this.structure[foo.oldIndex].obj.shortId(), toId, foo.from.id, foo.to.id, !this.controlOnStart, toLast);
    },
    // fromId is the id of the object you're moving. toId is the id of the object that will be immediately below this object after the move, at the same level of hierarchy.
    move: function () {
      var _move = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee3(fromId, toId, fromContainerId, toContainerId, removeOldRelations, toLast) {
        var last, me, initialCompetencies, initialRelations, addedEdges, fromIndex, toIndex, source, target, i, a, j, owner, reader, stripped, edits;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              this.once = true;
              last = toLast;
              me = this;
              initialCompetencies = me.container[me.containerNodeProperty] ? me.container[me.containerNodeProperty].slice() : null;
              initialRelations = me.container[me.containerEdgeProperty] ? me.container[me.containerEdgeProperty].slice() : null;
              addedEdges = [];
              if (!EcArray.isArray(me.container[me.containerEdgeProperty])) {
                me.container[me.containerEdgeProperty] = [];
              }
              if (fromId !== toId) {
                fromIndex = this.container[this.containerNodeProperty].indexOf(fromId);
                appLog(fromIndex);
                if ((toId == null || toId === undefined) && fromContainerId === toContainerId && fromIndex >= this.container[this.containerNodeProperty].length - 2) {
                  last = true;
                }
                this.container[this.containerNodeProperty].splice(fromIndex, 1);
                toIndex = null;
                if (toId == null || toId === undefined) {
                  toIndex = -1;
                } else {
                  toIndex = this.container[this.containerNodeProperty].indexOf(toId);
                }
                appLog(toIndex);
                if (last) {
                  this.container[this.containerNodeProperty].push(fromId);
                } else {
                  this.container[this.containerNodeProperty].splice(toIndex, 0, fromId);
                }
              }
              if (!(fromContainerId !== toContainerId)) {
                _context3.next = 69;
                break;
              }
              _context3.next = 11;
              return window[this.nodeType].get(fromId);
            case 11:
              source = _context3.sent;
              if (!(toContainerId === this.container.id)) {
                _context3.next = 23;
                break;
              }
              if (!toContainerId) {
                _context3.next = 19;
                break;
              }
              _context3.next = 16;
              return window['EcFramework'].get(toContainerId);
            case 16:
              _context3.t0 = _context3.sent;
              _context3.next = 20;
              break;
            case 19:
              _context3.t0 = null;
            case 20:
              target = _context3.t0;
              _context3.next = 31;
              break;
            case 23:
              if (!toContainerId) {
                _context3.next = 29;
                break;
              }
              _context3.next = 26;
              return window[this.nodeType].get(toContainerId);
            case 26:
              _context3.t1 = _context3.sent;
              _context3.next = 30;
              break;
            case 29:
              _context3.t1 = null;
            case 30:
              target = _context3.t1;
            case 31:
              if (!(removeOldRelations === true && fromId !== toContainerId)) {
                _context3.next = 51;
                break;
              }
              i = 0;
            case 33:
              if (!(i < this.container[this.containerEdgeProperty].length)) {
                _context3.next = 51;
                break;
              }
              _context3.next = 36;
              return window[this.edgeType].get(this.container[this.containerEdgeProperty][i]);
            case 36:
              a = _context3.sent;
              if (!(a == null)) {
                _context3.next = 39;
                break;
              }
              return _context3.abrupt("continue", 48);
            case 39:
              if (!(a[this.edgeRelationProperty] === this.edgeRelationLiteral)) {
                _context3.next = 48;
                break;
              }
              if (!(a[this.edgeTargetProperty] == null)) {
                _context3.next = 42;
                break;
              }
              return _context3.abrupt("continue", 48);
            case 42:
              if (!(a[this.edgeSourceProperty] == null)) {
                _context3.next = 44;
                break;
              }
              return _context3.abrupt("continue", 48);
            case 44:
              if (!(a[this.edgeSourceProperty] !== fromId && (this.$store.getters['editor/cutId'] ? this.$store.getters['editor/cutId'] && a[this.edgeTargetProperty] !== fromId : true))) {
                _context3.next = 46;
                break;
              }
              return _context3.abrupt("continue", 48);
            case 46:
              appLog("Identified edge to remove: ", JSON.parse(a.toJson()));
              this.container[this.containerEdgeProperty].splice(i--, 1);
            case 48:
              i++;
              _context3.next = 33;
              break;
            case 51:
              if (!(toContainerId != null && toContainerId !== "")) {
                _context3.next = 69;
                break;
              }
              a = new window[this.edgeType]();
              if (EcIdentityManager.default.ids != null && EcIdentityManager.default.ids.length > 0) {
                a.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
              }
              if (this.container.owner && this.container.owner.length > 0) {
                for (j = 0; j < this.container.owner.length; j++) {
                  owner = this.container.owner[j];
                  a.addOwner(EcPk.fromPem(owner));
                }
              }
              if (this.container.reader && this.container.reader.length > 0) {
                for (j = 0; j < this.container.reader.length; j++) {
                  reader = this.container.reader[j];
                  a.addReader(EcPk.fromPem(reader));
                }
              }
              if (!(target != null && target !== undefined && source.shortId() !== target.shortId())) {
                _context3.next = 69;
                break;
              }
              if (me.queryParams && me.queryParams.newObjectEndpoint) {
                a.generateShortId(this.queryParams.newObjectEndpoint);
              } else {
                a.assignId(me.repo.selectedServer, EcCrypto.md5(source.shortId()) + "_" + this.edgeRelationLiteral + "_" + EcCrypto.md5(target.shortId()));
              }
              a.source = source.shortId();
              a.target = target.shortId();
              a.relationType = this.edgeRelationLiteral;
              this.container[this.containerEdgeProperty].push(a.shortId());
              addedEdges.push(a.shortId());
              appLog("Added edge: ", JSON.parse(a.toJson()));
              if (!(this.$store.state.editor && this.$store.state.editor.private === true)) {
                _context3.next = 68;
                break;
              }
              _context3.next = 67;
              return EcEncryptedValue.toEncryptedValue(a);
            case 67:
              a = _context3.sent;
            case 68:
              this.repo.saveTo(a, appLog, appError);
            case 69:
              stripped = this.stripEmptyArrays(this.container);
              edits = [];
              for (i = 0; i < addedEdges.length; i++) {
                edits.push({
                  operation: "addNew",
                  id: addedEdges[i]
                });
              }
              edits.push({
                operation: "update",
                id: me.container.shortId(),
                fieldChanged: ["competency", "relation"],
                initialValue: [initialCompetencies, initialRelations],
                changedValue: [this.container.competency, this.container.relation]
              });
              me.$store.commit('editor/addEditsToUndo', edits);
              stripped["schema:dateModified"] = new Date().toISOString();
              if (!(this.$store.state.editor && this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[stripped.id] !== true)) {
                _context3.next = 79;
                break;
              }
              _context3.next = 78;
              return EcEncryptedValue.toEncryptedValue(stripped);
            case 78:
              stripped = _context3.sent;
            case 79:
              this.repo.saveTo(stripped, appLog, appError);
              this.dragging = false;
            case 81:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function move(_x, _x2, _x3, _x4, _x5, _x6) {
        return _move.apply(this, arguments);
      }
      return move;
    }(),
    add: function () {
      var _add = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee4(containerId, previousSibling) {
        var me, c, initialCompetencies, initialRelations, j, owner, reader, nodeType, index, toSave, a;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              me = this;
              c = new window[this.nodeType]();
              initialCompetencies = this.container.competency ? this.container.competency.slice() : null;
              initialRelations = this.container.relation ? this.container.relation.slice() : null;
              if (this.queryParams) {
                if (this.queryParams.newObjectEndpoint != null) {
                  c.generateShortId(this.queryParams.newObjectEndpoint);
                } else {
                  c.generateId(this.repo.selectedServer);
                }
              } else {
                c.generateId(this.repo.selectedServer);
              }
              if (EcIdentityManager.default.ids != null && EcIdentityManager.default.ids.length > 0) {
                c.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
              }
              if (this.container.owner && this.container.owner.length > 0) {
                for (j = 0; j < this.container.owner.length; j++) {
                  owner = this.container.owner[j];
                  c.addOwner(EcPk.fromPem(owner));
                }
              }
              if (this.container.reader && this.container.reader.length > 0) {
                for (j = 0; j < this.container.reader.length; j++) {
                  reader = this.container.reader[j];
                  c.addReader(EcPk.fromPem(reader));
                }
              }
              nodeType = this.nodeType;
              if (this.nodeType.indexOf("Ec") === 0) {
                nodeType = this.nodeType.substring(2);
              }
              if (this.$store.state.editor && this.$store.state.editor.defaultLanguage) {
                c.name = {
                  "@language": this.$store.state.editor.defaultLanguage,
                  "@value": "New " + nodeType
                };
              } else {
                c.name = "New " + nodeType;
              }
              c["schema:dateCreated"] = new Date().toISOString();
              c["schema:dateModified"] = new Date().toISOString();
              this.container["schema:dateModified"] = new Date().toISOString();
              appLog("Added node: ", JSON.parse(c.toJson()));
              if (this.$store.state.editor) {
                this.$store.commit("editor/newCompetency", c.shortId());
              }
              if (!(this.$store.state.editor && this.$store.state.editor.private === true)) {
                _context4.next = 20;
                break;
              }
              _context4.next = 19;
              return EcEncryptedValue.toEncryptedValue(c);
            case 19:
              c = _context4.sent;
            case 20:
              _context4.prev = 20;
              _context4.next = 23;
              return this.repo.saveTo(c);
            case 23:
              if (!EcArray.isArray(me.container[me.containerNodeProperty])) {
                me.container[me.containerNodeProperty] = [];
              }
              if (previousSibling == null || previousSibling === undefined) {
                me.container[me.containerNodeProperty].push(c.shortId());
              } else {
                // Insert immediately after the sibling
                index = me.container[me.containerNodeProperty].indexOf(previousSibling);
                me.container[me.containerNodeProperty].splice(index + 1, 0, c.shortId());
              }
              me.$store.commit('editor/addEditsToUndo', [{
                operation: "addNew",
                id: c.shortId()
              }, {
                operation: "update",
                id: me.container.shortId(),
                fieldChanged: ["competency"],
                initialValue: [initialCompetencies],
                changedValue: [me.container.competency]
              }]);
              if (!(containerId === me.container.shortId())) {
                _context4.next = 38;
                break;
              }
              toSave = me.container;
              toSave["schema:dateModified"] = new Date().toISOString();
              if (!(me.$store.state.editor && me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[me.container.id] !== true)) {
                _context4.next = 33;
                break;
              }
              _context4.next = 32;
              return EcEncryptedValue.toEncryptedValue(me.container);
            case 32:
              toSave = _context4.sent;
            case 33:
              _context4.next = 35;
              return me.repo.saveTo(me.stripEmptyArrays(toSave));
            case 35:
              me.once = true;
              _context4.next = 64;
              break;
            case 38:
              a = new window[me.edgeType]();
              if (EcIdentityManager.default.ids != null && EcIdentityManager.default.ids.length > 0) {
                a.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
              }
              if (me.container.owner && me.container.owner.length > 0) {
                for (j = 0; j < me.container.owner.length; j++) {
                  owner = me.container.owner[j];
                  a.addOwner(EcPk.fromPem(owner));
                }
              }
              if (me.container.reader && me.container.reader.length > 0) {
                for (j = 0; j < me.container.reader.length; j++) {
                  reader = me.container.reader[j];
                  a.addReader(EcPk.fromPem(reader));
                }
              }
              if (me.queryParams && me.queryParams.newObjectEndpoint) {
                a.generateShortId(me.queryParams.newObjectEndpoint);
              } else {
                a.assignId(me.repo.selectedServer, EcCrypto.md5(c.shortId()) + "_" + me.edgeRelationLiteral + "_" + EcCrypto.md5(containerId));
              }
              a.source = c.shortId();
              a.target = containerId;
              if (!(a.source !== a.target)) {
                _context4.next = 64;
                break;
              }
              a.relationType = me.edgeRelationLiteral;
              if (!EcArray.isArray(me.container[me.containerEdgeProperty])) {
                me.container[me.containerEdgeProperty] = [];
              }
              me.container[me.containerEdgeProperty].push(a.shortId());
              appLog("Added edge: ", JSON.parse(a.toJson()));
              me.$store.commit('editor/addEditsToUndo', [{
                operation: "addNew",
                id: c.shortId()
              }, {
                operation: "update",
                id: me.container.shortId(),
                fieldChanged: ["competency", "relation"],
                initialValue: [initialCompetencies, initialRelations],
                changedValue: [me.container.competency, me.container.relation]
              }]);
              toSave = me.container;
              toSave["schema:dateModified"] = new Date().toISOString();
              if (!(me.$store.state.editor && me.$store.state.editor.private === true)) {
                _context4.next = 61;
                break;
              }
              _context4.next = 56;
              return EcEncryptedValue.toEncryptedValue(a);
            case 56:
              a = _context4.sent;
              if (!(EcEncryptedValue.encryptOnSaveMap[me.container.id] !== true)) {
                _context4.next = 61;
                break;
              }
              _context4.next = 60;
              return EcEncryptedValue.toEncryptedValue(me.container);
            case 60:
              toSave = _context4.sent;
            case 61:
              _context4.next = 63;
              return me.repo.multiput([a, me.stripEmptyArrays(toSave)]);
            case 63:
              me.once = true;
            case 64:
              _context4.next = 69;
              break;
            case 66:
              _context4.prev = 66;
              _context4.t0 = _context4["catch"](20);
              appError(_context4.t0);
            case 69:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[20, 66]]);
      }));
      function add(_x7, _x8) {
        return _add.apply(this, arguments);
      }
      return add;
    }(),
    // Supports save() by removing reactify arrays.
    stripEmptyArrays: function stripEmptyArrays(o) {
      // TODO: Investigate use of Vue.$set instead of reactification method.
      if (EcArray.isArray(o)) {
        if (o.length === 0) {
          return null;
        }
        for (var i = 0; i < o.length; i++) {
          o[i] = this.stripEmptyArrays(o[i]);
          if (o[i] == null) {
            o.splice(i--, 1);
          }
        }
      } else if (EcObject.isObject(o)) {
        for (var key in o) {
          var value = this.stripEmptyArrays(o[key]);
          if (value == null) {
            delete o[key];
          }
        }
      }
      return o;
    },
    select: function select(objId, checked) {
      if (checked) {
        EcArray.setAdd(this.selectedArray, objId);
      } else {
        EcArray.setRemove(this.selectedArray, objId);
      }
    },
    removeObject: function removeObject(thing) {
      this.$emit('remove-object', thing);
    },
    onDraggableCheck: function onDraggableCheck(checked) {
      this.isDraggable = checked;
    },
    clickToSearch: function () {
      var _clickToSearch = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee5() {
        var selected, payload;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              selected = null;
              if (!(this.selectedArray && this.selectedArray.length === 1)) {
                _context5.next = 5;
                break;
              }
              _context5.next = 4;
              return EcRepository.get(this.selectedArray[0]);
            case 4:
              selected = _context5.sent;
            case 5:
              this.$store.commit('editor/selectedCompetency', selected);
              payload = {
                selectedCompetency: selected,
                searchType: 'Competency',
                copyOrLink: true,
                component: 'SearchModal'
              };
              this.$emit('search-things', payload);
              this.$store.commit('lode/competencySearchModalOpen', true);
              this.$store.commit('lode/searchType', "Competency");
              this.$store.commit('lode/copyOrLink', true);
              this.$store.commit('lode/includeRelations', this.container.subType !== "Collection");
            case 12:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function clickToSearch() {
        return _clickToSearch.apply(this, arguments);
      }
      return clickToSearch;
    }(),
    cancelImport: function cancelImport() {
      this.deleteObject(this.container);
      this.$store.dispatch('app/clearImport');
    },
    onClickCreateNew: function () {
      var _onClickCreateNew = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee6() {
        var parent;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              parent = this.container.shortId();
              if (this.selectedArray.length === 1) {
                parent = this.selectedArray[0];
              }
              this.loading = true;
              _context6.prev = 3;
              _context6.next = 6;
              return this.add(parent, null);
            case 6:
              _context6.next = 11;
              break;
            case 8:
              _context6.prev = 8;
              _context6.t0 = _context6["catch"](3);
              appError(_context6.t0);
            case 11:
              this.loading = false;
              this.addingNode = false;
            case 13:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this, [[3, 8]]);
      }));
      function onClickCreateNew() {
        return _onClickCreateNew.apply(this, arguments);
      }
      return onClickCreateNew;
    }(),
    deleteSelected: function () {
      var _deleteSelected = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee7() {
        var item;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return EcRepository.get(this.selectedArray[0]);
            case 2:
              item = _context7.sent;
              this.deleteObject(item);
              this.selectedArray.splice(0, this.selectedArray.length);
            case 5:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function deleteSelected() {
        return _deleteSelected.apply(this, arguments);
      }
      return deleteSelected;
    }(),
    setSubject: function setSubject(subject) {
      this.$store.commit('editor/setSubject', subject);
      this.closeSelectSubjectModal();
    },
    openSelectSubjectModal: function () {
      var _openSelectSubjectModal = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee8() {
        var people;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return EcPerson.search(window.repo, '*', null, null, {
                size: 10000
              });
            case 2:
              people = _context8.sent;
              this.availablePersons = people;
              this.showModal('subject');
            case 5:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function openSelectSubjectModal() {
        return _openSelectSubjectModal.apply(this, arguments);
      }
      return openSelectSubjectModal;
    }(),
    closeSelectSubjectModal: function closeSelectSubjectModal() {
      this.$store.commit('app/closeModal');
    },
    getSubjectInfo: function getSubjectInfo() {
      var _this2 = this;
      EcPerson.getByPk(window.repo, EcPk.fromPem(this.$store.getters['editor/getSubject'])).then(function (person) {
        var name = person.name;
        if (EcIdentityManager.default.ids[0].ppk.toPk().toPem() === person.owner[0]) {
          name = 'Myself';
        }
        _this2.selectedSubject = name;
      });
    }
  }
});
// CONCATENATED MODULE: ./src/lode/components/Hierarchy.vue?vue&type=script&lang=js
 /* harmony default export */ var components_Hierarchyvue_type_script_lang_js = (Hierarchyvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/lode/components/Hierarchy.vue?vue&type=style&index=0&id=174edffe&prod&lang=scss
var Hierarchyvue_type_style_index_0_id_174edffe_prod_lang_scss = __webpack_require__("adfe");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/lode/components/Hierarchy.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_Hierarchyvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Hierarchy = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "adfe":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Hierarchy_vue_vue_type_style_index_0_id_174edffe_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("21fc");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Hierarchy_vue_vue_type_style_index_0_id_174edffe_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Hierarchy_vue_vue_type_style_index_0_id_174edffe_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ })

}]);
//# sourceMappingURL=chunk-6a6fd63e.7f7cf366.js.map