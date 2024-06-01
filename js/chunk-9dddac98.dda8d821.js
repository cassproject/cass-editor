(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-9dddac98","chunk-74a95bb3"],{

/***/ "0751":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProgressionHierarchy_vue_vue_type_style_index_0_id_8c6e2d48_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c961");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProgressionHierarchy_vue_vue_type_style_index_0_id_8c6e2d48_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProgressionHierarchy_vue_vue_type_style_index_0_id_8c6e2d48_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "27c7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("fb6a");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"dac8ff4e-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/progressionModel/ProgressionHierarchy.vue?vue&type=template&id=8c6e2d48


var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "lode__hierarchy",
    class: {
      'is-dragging': _vm.dragging
    }
  }, [_c('div', {
    staticClass: "hierarchy-buttons columns is-gapless is-paddingless is-mobile is-marginless is-paddingless"
  }, [_vm.canEdit && _vm.view !== 'import' || _vm.queryParams.select ? _c('div', {
    staticClass: "column is-narrow",
    attrs: {
      "id": "check-radio-all-column"
    }
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
  })])]) : _vm._e(), _c('div', {
    staticClass: "column is-narrow"
  }, [_vm.expanded ? _c('div', {
    staticClass: "icon is-vcentered",
    on: {
      "click": function click($event) {
        _vm.expanded = false;
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-caret-down has-text-primary is-size-2"
  })]) : !_vm.expanded ? _c('div', {
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
    staticClass: "fa fa-circle is-size-6 has-text-light"
  })]), _vm.selectButtonText ? _c('div', {
    staticClass: "button is-outlined is-primary",
    on: {
      "click": function click($event) {
        return _vm.$emit('select-button-click', _vm.selectedArray);
      }
    }
  }, [_vm._v(" " + _vm._s(_vm.selectButtonText) + " ")]) : _vm._e()]), _c('div', {
    staticClass: "column is-narrow"
  }, [_c('div', {
    staticClass: "buttons"
  }, [_vm.multipleSelected && !_vm.addingNode && _vm.view !== 'import' && _vm.canEdit ? _c('div', {
    staticClass: "button is-outlined is-primary",
    on: {
      "click": function click($event) {
        return _vm.$emit('edit-multiple-event');
      }
    }
  }, [_vm._m(0), _c('span', [_vm._v(" Edit multiple ")])]) : _vm._e(), !_vm.addingNode && _vm.canEdit && !_vm.multipleSelected ? _c('div', {
    staticClass: "button is-outlined is-primary",
    on: {
      "click": function click($event) {
        _vm.addingNode = true;
      }
    }
  }, [_vm._m(1), _c('span', [_vm._v(" " + _vm._s(_vm.addProgressionModelOrLevelText) + " ")])]) : _vm._e(), !_vm.addingNode && _vm.canEdit && !_vm.multipleSelected && _vm.canCopyOrCut ? _c('div', {
    staticClass: "button is-outlined is-danger",
    on: {
      "click": _vm.deleteSelected
    }
  }, [_vm._m(2), _c('span', [_vm._v(" delete item ")])]) : _vm._e(), _vm.addingNode ? _c('div', {
    staticClass: "button is-outlined is-dark",
    on: {
      "click": function click($event) {
        _vm.addingNode = false;
      }
    }
  }, [_vm._m(3), _c('span', [_vm._v("cancel")])]) : _vm._e(), _vm.addingNode ? _c('div', {
    staticClass: "button is-outlined is-primary",
    class: {
      'is-loading': _vm.loading
    },
    on: {
      "click": _vm.onClickCreateNew
    }
  }, [_vm._m(4), _c('span', [_vm._v(" create new ")])]) : _vm._e(), _vm.view === 'framework' || _vm.view === 'concept' ? _c('div', {
    staticClass: "button is-outlined",
    class: _vm.canCopyOrCut ? 'is-primary' : 'is-disabled',
    attrs: {
      "title": "Cut progression level",
      "disabled": !_vm.canCopyOrCut
    },
    on: {
      "click": _vm.cutClick
    }
  }, [_vm._m(5)]) : _vm._e(), _vm.view === 'framework' || _vm.view === 'concept' ? _c('div', {
    staticClass: "button is-outlined",
    class: _vm.canPaste ? 'is-primary' : 'is-disabled',
    attrs: {
      "disabled": !_vm.canPaste,
      "title": "Paste progression level"
    },
    on: {
      "click": _vm.pasteClick
    }
  }, [_vm._m(6)]) : _vm._e(), _vm.view === 'concept' ? _c('div', {
    staticClass: "button is-outlined is-primary",
    attrs: {
      "title": "Reorder by Precedence"
    },
    on: {
      "click": function click($event) {
        return _vm.computeHierarchy(true);
      }
    }
  }, [_c('span', [_vm._v(" reorder by precedence ")])]) : _vm._e(), _vm.view === 'concept' ? _c('div', {
    staticClass: "button is-outlined is-primary",
    attrs: {
      "title": "Set Precedence"
    },
    on: {
      "click": _vm.setPrecedence
    }
  }, [_c('span', [_vm._v(" set precedence by order ")])]) : _vm._e()])]), _vm.view === 'import' ? _c('div', {
    staticClass: "column"
  }, [_c('div', {
    staticClass: "buttons is-right"
  }, [_c('div', {
    staticClass: "buttons is-right"
  }, [_c('div', {
    staticClass: "button is-light is-pulled-right is-dark is-outlined",
    on: {
      "click": _vm.cancelImport
    }
  }, [_c('span', [_vm._v(" Cancel ")]), _vm._m(7)]), _c('div', {
    staticClass: "button is-dark is-outlined is-pulled-right",
    on: {
      "click": function click($event) {
        return _vm.$store.dispatch('app/clearImport');
      }
    }
  }, [_c('span', [_vm._v(" import again ")]), _vm._m(8)]), _c('div', {
    staticClass: "button is-dark is-outlined is-pulled-right",
    on: {
      "click": _vm.openFramework
    }
  }, [_c('span', [_vm._v("view in editor")]), _vm._m(9)]), _c('router-link', {
    staticClass: "button is-primary is-outlined is -pulled-right",
    attrs: {
      "to": {
        path: '/progressionLevels',
        query: _vm.queryParams
      }
    }
  }, [_c('span', [_vm._v(" Done ")]), _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-home"
  })])])], 1)])]) : _vm._e()]), _vm.hierarchy ? [_c('draggable', _vm._b({
    staticClass: "lode__hierarchy-ul",
    attrs: {
      "tag": "ul",
      "disabled": _vm.canEdit !== true || !_vm.isDraggable,
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
        "frameworkEditable": _vm.canEdit,
        "selectedArray": _vm.selectedArray,
        "parentStructure": _vm.hierarchy,
        "parent": _vm.container,
        "properties": _vm.properties,
        "expandAll": _vm.expanded == true,
        "propagateParentChecked": "false",
        "shiftKey": _vm.shiftKey,
        "arrowKey": _vm.arrowKey
      },
      on: {
        "create-new-node-event": _vm.onCreateNewNode,
        "mounting-node": _vm.handleMountingNode,
        "add": _vm.add,
        "begin-drag": _vm.beginDrag,
        "move": _vm.move,
        "select": _vm.select,
        "draggable-check": _vm.onDraggableCheck
      }
    });
  }), 1)] : _vm._e()], 2);
};
var staticRenderFns = [function () {
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
    staticClass: "fa fa-times-circle"
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
}];

// CONCATENATED MODULE: ./src/views/progressionModel/ProgressionHierarchy.vue?vue&type=template&id=8c6e2d48

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
var regeneratorRuntime = __webpack_require__("c7eb");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find-index.js
var es_array_find_index = __webpack_require__("c740");

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

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__("25f0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__("3ca3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// EXTERNAL MODULE: ./src/mixins/common.js
var common = __webpack_require__("872c");

// EXTERNAL MODULE: ./src/mixins/competencyEdits.js
var competencyEdits = __webpack_require__("6ffa4");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/progressionModel/ProgressionHierarchy.vue?vue&type=script&lang=js















var hierarchyTimeout;
/* harmony default export */ var ProgressionHierarchyvue_type_script_lang_js = ({
  name: 'ProgressionHierarchy',
  props: {
    container: Object,
    containerType: String,
    repo: Object,
    profile: Object,
    highlightList: Array,
    selectMode: Boolean,
    selectAll: Boolean,
    containerTypeGet: String,
    viewOnly: Boolean,
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
    doneDragging: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      structure: [],
      once: true,
      dragging: false,
      controlOnStart: false,
      filter: 'showAll',
      dragIcon: 'fa-arrows-alt',
      dragOptions: {
        delay: 100,
        disabled: false,
        ghostClass: 'ghost-drag',
        chosenClass: 'chosen-drag',
        dragClass: 'drag',
        scrollSensitivity: 200,
        forceFallback: true
      },
      multipleSelected: false,
      addingNode: false,
      selectedArray: [],
      selectButtonText: null,
      expanded: true,
      isDraggable: true,
      shiftKey: false,
      arrowKey: null,
      addProgressionModelOrLevelText: "Add Level",
      loading: false
    };
  },
  components: {
    HierarchyNode: function HierarchyNode() {
      return __webpack_require__.e(/* import() */ "chunk-4cf587c0").then(__webpack_require__.bind(null, "b709"));
    },
    draggable: function draggable() {
      return __webpack_require__.e(/* import() */ "chunk-4a5f46a6").then(__webpack_require__.t.bind(null, "b76a", 7));
    }
  },
  mixins: [common["a" /* default */], competencyEdits["a" /* default */]],
  computed: {
    canCopyOrCut: function canCopyOrCut() {
      if (this.selectedArray && this.selectedArray.length === 1) {
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
    queryParams: function queryParams() {
      return this.$store.getters['editor/queryParams'];
    },
    addAnother: function addAnother() {
      return this.$store.getters['editor/addAnother'];
    },
    hierarchy: function hierarchy() {
      var me = this;
      if (this.container == null) return null;
      if (!this.once) return this.structure;
      appLog("Computing hierarchy.");
      var precache = [];
      if (this.container["skos:hasTopConcept"] != null) {
        precache = precache.concat(this.container["skos:hasTopConcept"]);
      }
      if (precache.length > 0) {
        this.repo.multiget(precache, function (success) {
          me.computeHierarchy(false);
        }, appError);
      } else {
        me.computeHierarchy(false);
      }
      return this.structure;
    },
    // True if the current client can edit this object.
    canEdit: function canEdit() {
      if (this.viewOnly === true) {
        return false;
      }
      return this.canEditAny(this.container);
    },
    recomputeHierarchy: function recomputeHierarchy() {
      return this.$store.getters['editor/recomputeHierarchy'];
    },
    framework: function framework() {
      return this.$store.getters['editor/framework'];
    }
  },
  watch: {
    container: {
      handler: function handler() {
        this.once = true;
      },
      deep: true
    },
    selectedArray: function selectedArray() {
      if (this.selectedArray.length > 1) {
        this.multipleSelected = true;
      } else {
        this.multipleSelected = false;
      }
      if (this.selectedArray.length === 1) {
        this.addProgressionModelOrLevelText = "Add Level";
      } else {
        this.addProgressionMaddProgressionModelOrLevelTextodelOrChildText = "Add Progression Model";
      }
      this.$emit('selected-array', this.selectedArray);
    },
    recomputeHierarchy: function recomputeHierarchy() {
      if (this.recomputeHierarchy) {
        this.once = true;
        this.$store.commit('editor/recomputeHierarchy', false);
      }
    },
    doneDragging: function doneDragging() {
      if (this.doneDragging) {
        this.dragging = false;
      }
    },
    addAnother: function addAnother(val) {
      if (val) {
        this.onClickCreateNew();
        this.$store.commit('editor/addAnother', false);
      }
    }
  },
  mounted: function mounted() {
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
    window.addEventListener("keydown", this.keydown);
    window.addEventListener("keyup", this.keyup);
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('keyup', this.keyup);
    window.removeEventListener('keydown', this.keydown);
  },
  methods: {
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
    },
    keyup: function keyup(e) {
      if (!e.shiftKey) {
        this.shiftKey = false;
      }
      if (e.key.indexOf("Arrow") !== -1) {
        this.arrowKey = null;
      }
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
    startTime: function startTime() {
      var _this = this;
      hierarchyTimeout = setTimeout(function () {
        _this.$emit('done-loading-nodes');
      }, 1000);
    },
    removePrecedence: function () {
      var _removePrecedence = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee2() {
        var _this2 = this;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee(resolve) {
                  var structure, i, c;
                  return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        structure = [];
                        if (!(_this2.container == null)) {
                          _context.next = 3;
                          break;
                        }
                        return _context.abrupt("return", r);
                      case 3:
                        if (!(_this2.container["skos:hasTopConcept"] !== null && _this2.container["skos:hasTopConcept"] !== undefined)) {
                          _context.next = 27;
                          break;
                        }
                        if (!(_this2.container["ceterms:precedes"] || _this2.container["ceterms:precededBy"])) {
                          _context.next = 9;
                          break;
                        }
                        if (_this2.container["ceterms:precedes"]) delete _this2.container["ceterms:precedes"];
                        if (_this2.container["ceterms:precededBy"]) delete _this2.container["ceterms:precededBy"];
                        _context.next = 9;
                        return _this2.saveObject(_this2.container);
                      case 9:
                        i = 0;
                      case 10:
                        if (!(i < _this2.container["skos:hasTopConcept"].length)) {
                          _context.next = 27;
                          break;
                        }
                        _context.next = 13;
                        return EcConcept.get(_this2.container["skos:hasTopConcept"][i]);
                      case 13:
                        c = _context.sent;
                        if (!c) {
                          _context.next = 24;
                          break;
                        }
                        if (!(c["ceterms:precedes"] || c["ceterms:precededBy"])) {
                          _context.next = 20;
                          break;
                        }
                        if (c["ceterms:precedes"]) delete c["ceterms:precedes"];
                        if (c["ceterms:precededBy"]) delete c["ceterms:precededBy"];
                        _context.next = 20;
                        return _this2.saveObject(c);
                      case 20:
                        structure.push({
                          "obj": c,
                          "children": []
                        });
                        if (!c["skos:narrower"]) {
                          _context.next = 24;
                          break;
                        }
                        _context.next = 24;
                        return _this2.addChildren(structure, c, i, true);
                      case 24:
                        i++;
                        _context.next = 10;
                        break;
                      case 27:
                        _this2.structure = structure;
                        resolve();
                      case 29:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                }));
                return function (_x) {
                  return _ref.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function removePrecedence() {
        return _removePrecedence.apply(this, arguments);
      }
      return removePrecedence;
    }(),
    setPrecedence: function () {
      var _setPrecedence = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee3() {
        var structure;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.removePrecedence();
            case 2:
              structure = this.structure;
              _context3.next = 5;
              return this.setPrecedes(structure);
            case 5:
              _context3.next = 7;
              return this.setPrecededBy(structure);
            case 7:
              this.structure = structure;
            case 8:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function setPrecedence() {
        return _setPrecedence.apply(this, arguments);
      }
      return setPrecedence;
    }(),
    computeHierarchy: function () {
      var _computeHierarchy = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee4(setOrder) {
        var structure, i, c;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              structure = [];
              if (!(this.container == null)) {
                _context4.next = 3;
                break;
              }
              return _context4.abrupt("return", r);
            case 3:
              if (!(this.container["skos:hasTopConcept"] !== null && this.container["skos:hasTopConcept"] !== undefined)) {
                _context4.next = 17;
                break;
              }
              i = 0;
            case 5:
              if (!(i < this.container["skos:hasTopConcept"].length)) {
                _context4.next = 17;
                break;
              }
              _context4.next = 8;
              return EcConcept.get(this.container["skos:hasTopConcept"][i]);
            case 8:
              c = _context4.sent;
              if (!c) {
                _context4.next = 14;
                break;
              }
              structure.push({
                "obj": c,
                "children": []
              });
              if (!c["skos:narrower"]) {
                _context4.next = 14;
                break;
              }
              _context4.next = 14;
              return this.addChildren(structure, c, i, false);
            case 14:
              i++;
              _context4.next = 5;
              break;
            case 17:
              if (!setOrder) {
                _context4.next = 22;
                break;
              }
              _context4.next = 20;
              return this.reorder(structure, "ceterms:precedes");
            case 20:
              _context4.next = 22;
              return this.reorder(structure, "ceterms:precededBy");
            case 22:
              this.structure = structure;
              this.once = false;
            case 24:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function computeHierarchy(_x2) {
        return _computeHierarchy.apply(this, arguments);
      }
      return computeHierarchy;
    }(),
    printPrettyStructure: function printPrettyStructure(structure) {
      var output = "[";
      for (var i = 0; i < structure.length; i++) {
        if (structure[i].obj) {
          output += structure[i].obj["skos:prefLabel"]["@value"] + (i === structure.length - 1 && !(structure[i].children && structure[i].children.length > 0) ? "" : ", ");
        }
        if (structure[i].children.length > 0) {
          for (var j = 0; j < structure[i].children.length; j++) {
            if (structure[i].children[j]) {
              var children = structure[i].children;
              output += (j === 0 ? "(" : "") + children[j].obj["skos:prefLabel"]["@value"] + (j === structure[i].children.length - 1 ? ")" : ", ");
              output += j === structure[i].children.length - 1 ? i === structure.length - 1 ? "]" : ", " : "";
              if (children[j].children.length > 0) {
                for (var k = 0; k < children[j].children.length; k++) {
                  if (children[j].children[k]) {
                    output += (k === 0 ? "(" : "") + children[j].children[k].obj["skos:prefLabel"]["@value"] + (k === children[j].children.length - 1 ? ")" : ", ");
                    output += k === children[j].children.length - 1 ? j === children.length - 1 ? "]" : ", " : "";
                  }
                }
              }
            }
          }
        } else {
          output += i === structure.length - 1 ? "]" : "";
        }
      }
      return output;
    },
    addChildren: function () {
      var _addChildren = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee6(structure, c, i, deletePrecedence) {
        var _this3 = this;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref2 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee5(resolve) {
                  var j, subC;
                  return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee5$(_context5) {
                    while (1) switch (_context5.prev = _context5.next) {
                      case 0:
                        j = 0;
                      case 1:
                        if (!(j < c["skos:narrower"].length)) {
                          _context5.next = 17;
                          break;
                        }
                        _context5.next = 4;
                        return EcConcept.get(c["skos:narrower"][j]);
                      case 4:
                        subC = _context5.sent;
                        if (!(deletePrecedence && (subC["ceterms:precedes"] || subC["ceterms:precededBy"]))) {
                          _context5.next = 10;
                          break;
                        }
                        if (subC["ceterms:precedes"]) delete subC["ceterms:precedes"];
                        if (subC["ceterms:precededBy"]) delete subC["ceterms:precededBy"];
                        _context5.next = 10;
                        return _this3.saveObject(subC);
                      case 10:
                        structure[i].children.push({
                          "obj": subC,
                          "children": []
                        });
                        if (!(subC && subC["skos:narrower"])) {
                          _context5.next = 14;
                          break;
                        }
                        _context5.next = 14;
                        return _this3.addChildren(structure[i].children, subC, j, deletePrecedence);
                      case 14:
                        j++;
                        _context5.next = 1;
                        break;
                      case 17:
                        resolve();
                      case 18:
                      case "end":
                        return _context5.stop();
                    }
                  }, _callee5);
                }));
                return function (_x7) {
                  return _ref2.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      function addChildren(_x3, _x4, _x5, _x6) {
        return _addChildren.apply(this, arguments);
      }
      return addChildren;
    }(),
    reorder: function () {
      var _reorder = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee8(unorderedStructure, property) {
        var _this4 = this;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              return _context8.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref3 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee7(resolve) {
                  var changesMade, numChangesMade, i, next, c, c2;
                  return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee7$(_context7) {
                    while (1) switch (_context7.prev = _context7.next) {
                      case 0:
                        changesMade = true;
                        numChangesMade = 0; // Prevents endless loop when model properties are inconsistent
                        if (!(unorderedStructure == null)) {
                          _context7.next = 4;
                          break;
                        }
                        return _context7.abrupt("return");
                      case 4:
                        if (!(unorderedStructure !== null && unorderedStructure.length)) {
                          _context7.next = 33;
                          break;
                        }
                      case 5:
                        if (!(changesMade && numChangesMade < 100)) {
                          _context7.next = 33;
                          break;
                        }
                        changesMade = false;
                        i = void 0;
                        if (property === "ceterms:precedes") {
                          i = 0;
                        } else {
                          i = unorderedStructure.length - 1;
                        }
                        next = unorderedStructure[i];
                      case 10:
                        if (!next) {
                          _context7.next = 31;
                          break;
                        }
                        c = unorderedStructure[i].obj;
                        if (!c) {
                          _context7.next = 29;
                          break;
                        }
                        if (!unorderedStructure[i].children) {
                          _context7.next = 19;
                          break;
                        }
                        _context7.next = 16;
                        return _this4.reorderChildren(unorderedStructure, unorderedStructure[i].children, property);
                      case 16:
                        if (!_context7.sent) {
                          _context7.next = 19;
                          break;
                        }
                        numChangesMade++;
                        changesMade = true;
                      case 19:
                        if (!c[property]) {
                          _context7.next = 28;
                          break;
                        }
                        _context7.next = 22;
                        return EcConcept.get(c[property]);
                      case 22:
                        c2 = _context7.sent;
                        _context7.next = 25;
                        return _this4.setProrgressionOrder(unorderedStructure, c, c2, property);
                      case 25:
                        if (!_context7.sent) {
                          _context7.next = 28;
                          break;
                        }
                        numChangesMade++;
                        changesMade = true;
                      case 28:
                        if (property === "ceterms:precedes") {
                          if (i < unorderedStructure.length - 1) {
                            i++;
                            next = unorderedStructure[i];
                          } else {
                            next = undefined;
                          }
                        } else {
                          if (i > 0) {
                            i--;
                            next = unorderedStructure[i];
                          } else {
                            next = undefined;
                          }
                        }
                      case 29:
                        _context7.next = 10;
                        break;
                      case 31:
                        _context7.next = 5;
                        break;
                      case 33:
                        resolve();
                      case 34:
                      case "end":
                        return _context7.stop();
                    }
                  }, _callee7);
                }));
                return function (_x10) {
                  return _ref3.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context8.stop();
          }
        }, _callee8);
      }));
      function reorder(_x8, _x9) {
        return _reorder.apply(this, arguments);
      }
      return reorder;
    }(),
    reorderChildren: function () {
      var _reorderChildren = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee10(unorderedStructure, children, property) {
        var _this5 = this;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              return _context10.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref4 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee9(resolve) {
                  var changesMade, childChangesMade, numChildChangesMade, j, next, subC1, subC2;
                  return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee9$(_context9) {
                    while (1) switch (_context9.prev = _context9.next) {
                      case 0:
                        changesMade = false;
                        childChangesMade = true;
                        numChildChangesMade = 0; // Prevents endless loop when model properties are inconsistent
                      case 3:
                        if (!(childChangesMade && numChildChangesMade < 100)) {
                          _context9.next = 33;
                          break;
                        }
                        childChangesMade = false;
                        j = void 0;
                        if (property === "ceterms:precedes") {
                          j = 0;
                        } else {
                          j = children.length - 1;
                        }
                        next = children[j];
                      case 8:
                        if (!next) {
                          _context9.next = 31;
                          break;
                        }
                        subC1 = children[j].obj;
                        if (!subC1) {
                          _context9.next = 28;
                          break;
                        }
                        if (!subC1["skos:narrower"]) {
                          _context9.next = 18;
                          break;
                        }
                        _context9.next = 14;
                        return _this5.reorderChildren(unorderedStructure, children[j].children, property);
                      case 14:
                        if (!_context9.sent) {
                          _context9.next = 18;
                          break;
                        }
                        changesMade = true;
                        numChildChangesMade++;
                        childChangesMade = true;
                      case 18:
                        if (!subC1[property]) {
                          _context9.next = 28;
                          break;
                        }
                        _context9.next = 21;
                        return EcConcept.get(subC1[property]);
                      case 21:
                        subC2 = _context9.sent;
                        _context9.next = 24;
                        return _this5.setProrgressionOrder(unorderedStructure, subC1, subC2, property);
                      case 24:
                        if (!_context9.sent) {
                          _context9.next = 28;
                          break;
                        }
                        changesMade = true;
                        numChildChangesMade++;
                        childChangesMade = true;
                      case 28:
                        if (property === "ceterms:precedes") {
                          if (j < children.length - 1) {
                            j++;
                            next = children[j];
                          } else {
                            next = undefined;
                          }
                        } else {
                          if (j > 0) {
                            j--;
                            next = children[j];
                          } else {
                            next = undefined;
                          }
                        }
                        _context9.next = 8;
                        break;
                      case 31:
                        _context9.next = 3;
                        break;
                      case 33:
                        resolve(changesMade);
                      case 34:
                      case "end":
                        return _context9.stop();
                    }
                  }, _callee9);
                }));
                return function (_x14) {
                  return _ref4.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context10.stop();
          }
        }, _callee10);
      }));
      function reorderChildren(_x11, _x12, _x13) {
        return _reorderChildren.apply(this, arguments);
      }
      return reorderChildren;
    }(),
    setProrgressionOrder: function () {
      var _setProrgressionOrder = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee11(structure, node1, node2, property) {
        var sibling, parentStructure, node1Index, node2Index, _parentStructure, _node1Index, _node2Index, nodeParent;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return this.findSiblingOfNode(node1, node2);
            case 2:
              sibling = _context11.sent;
              if (!(sibling !== null)) {
                _context11.next = 37;
                break;
              }
              _context11.next = 6;
              return this.findSubStructure(structure, node1);
            case 6:
              parentStructure = _context11.sent;
              if (parentStructure) {
                _context11.next = 10;
                break;
              }
              // This condition should never be reached.
              appLog('Error: No parent structure found');
              return _context11.abrupt("return", false);
            case 10:
              _context11.next = 12;
              return parentStructure.findIndex(function (item) {
                return EcRemoteLinkedData.trimVersionFromUrl(item.obj ? item.obj.id : item.id) === EcRemoteLinkedData.trimVersionFromUrl(node1.id);
              });
            case 12:
              node1Index = _context11.sent;
              _context11.next = 15;
              return parentStructure.findIndex(function (item) {
                return EcRemoteLinkedData.trimVersionFromUrl(item.obj ? item.obj.id : item.id) === EcRemoteLinkedData.trimVersionFromUrl(sibling.id);
              });
            case 15:
              node2Index = _context11.sent;
              node2 = {
                "obj": parentStructure[node2Index].obj,
                "children": parentStructure[node2Index].children
              };
              if (!(property === "ceterms:precedes")) {
                _context11.next = 27;
                break;
              }
              if (!(node1Index + 1 === node2Index)) {
                _context11.next = 20;
                break;
              }
              return _context11.abrupt("return", false);
            case 20:
              parentStructure.splice(node2Index, 1);
              _context11.next = 23;
              return parentStructure.findIndex(function (item) {
                return EcRemoteLinkedData.trimVersionFromUrl(item.obj ? item.obj.id : item.id) === EcRemoteLinkedData.trimVersionFromUrl(node1.id);
              });
            case 23:
              node1Index = _context11.sent;
              parentStructure.splice(node1Index + 1, 0, node2);
              _context11.next = 34;
              break;
            case 27:
              if (!(node2Index + 1 === node1Index)) {
                _context11.next = 29;
                break;
              }
              return _context11.abrupt("return", false);
            case 29:
              parentStructure.splice(node2Index, 1);
              _context11.next = 32;
              return parentStructure.findIndex(function (item) {
                return EcRemoteLinkedData.trimVersionFromUrl(item.obj ? item.obj.id : item.id) === EcRemoteLinkedData.trimVersionFromUrl(node1.id);
              });
            case 32:
              node1Index = _context11.sent;
              parentStructure.splice(node1Index, 0, node2);
            case 34:
              return _context11.abrupt("return", true);
            case 37:
              _context11.next = 39;
              return this.findSiblingOfNode(node2, node1);
            case 39:
              sibling = _context11.sent;
              if (!(sibling !== null)) {
                _context11.next = 77;
                break;
              }
              _context11.next = 43;
              return this.findSubStructure(structure, node2);
            case 43:
              _parentStructure = _context11.sent;
              if (_parentStructure) {
                _context11.next = 47;
                break;
              }
              // This condition should never be reached.
              appLog('Error: No parent structure found');
              return _context11.abrupt("return", false);
            case 47:
              _context11.next = 49;
              return _parentStructure.findIndex(function (item) {
                return EcRemoteLinkedData.trimVersionFromUrl(item.obj ? item.obj.id : item.id) === EcRemoteLinkedData.trimVersionFromUrl(sibling.id);
              });
            case 49:
              _node1Index = _context11.sent;
              _context11.next = 52;
              return _parentStructure.findIndex(function (item) {
                return EcRemoteLinkedData.trimVersionFromUrl(item.obj ? item.obj.id : item.id) === EcRemoteLinkedData.trimVersionFromUrl(node2.id);
              });
            case 52:
              _node2Index = _context11.sent;
              if (!(_node1Index < 0 || _node1Index >= _parentStructure.length || _node2Index < 0 || _node2Index >= _parentStructure.length)) {
                _context11.next = 56;
                break;
              }
              appLog('Node index not found');
              return _context11.abrupt("return", false);
            case 56:
              node2 = {
                "obj": _parentStructure[_node2Index].obj,
                "children": _parentStructure[_node2Index].children
              };
              if (!(property === "ceterms:precedes")) {
                _context11.next = 67;
                break;
              }
              if (!(_node1Index + 1 === _node2Index)) {
                _context11.next = 60;
                break;
              }
              return _context11.abrupt("return", false);
            case 60:
              _parentStructure.splice(_node2Index, 1);
              _context11.next = 63;
              return _parentStructure.findIndex(function (item) {
                return EcRemoteLinkedData.trimVersionFromUrl(item.obj ? item.obj.id : item.id) === EcRemoteLinkedData.trimVersionFromUrl(sibling.id);
              });
            case 63:
              _node1Index = _context11.sent;
              _parentStructure.splice(_node1Index + 1, 0, node2);
              _context11.next = 74;
              break;
            case 67:
              if (!(_node2Index + 1 === _node1Index)) {
                _context11.next = 69;
                break;
              }
              return _context11.abrupt("return", false);
            case 69:
              _parentStructure.splice(_node2Index, 1);
              _context11.next = 72;
              return _parentStructure.findIndex(function (item) {
                return EcRemoteLinkedData.trimVersionFromUrl(item.obj ? item.obj.id : item.id) === EcRemoteLinkedData.trimVersionFromUrl(sibling.id);
              });
            case 72:
              _node1Index = _context11.sent;
              _parentStructure.splice(_node1Index, 0, node2);
            case 74:
              return _context11.abrupt("return", true);
            case 77:
              if (!node1["skos:broader"]) {
                _context11.next = 84;
                break;
              }
              _context11.next = 80;
              return EcConcept.get(EcRemoteLinkedData.trimVersionFromUrl(node1["skos:broader"]).toString());
            case 80:
              nodeParent = _context11.sent;
              return _context11.abrupt("return", this.setProrgressionOrder(structure, nodeParent, node2, property));
            case 84:
              // This condition should never be reached.
              appLog('Error: No common ancestry found');
              return _context11.abrupt("return", false);
            case 86:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this);
      }));
      function setProrgressionOrder(_x15, _x16, _x17, _x18) {
        return _setProrgressionOrder.apply(this, arguments);
      }
      return setProrgressionOrder;
    }(),
    findSiblingOfNode: function () {
      var _findSiblingOfNode = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee13(node, nibling) {
        var _this6 = this;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              return _context13.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref5 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee12(resolve) {
                  var nodeParent, niblingParent, niblingAncestor;
                  return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee12$(_context12) {
                    while (1) switch (_context12.prev = _context12.next) {
                      case 0:
                        nodeParent = null;
                        niblingParent = null;
                        if (node["skos:broader"]) {
                          nodeParent = EcRemoteLinkedData.trimVersionFromUrl(node["skos:broader"]);
                        }
                        if (nibling["skos:broader"]) {
                          niblingParent = EcRemoteLinkedData.trimVersionFromUrl(nibling["skos:broader"]);
                        }
                        if (!(niblingParent && nodeParent && niblingParent.toString() === nodeParent.toString())) {
                          _context12.next = 8;
                          break;
                        }
                        // Nibling is a sibling of node
                        resolve(nibling);
                        _context12.next = 24;
                        break;
                      case 8:
                        if (!(!node["skos:broader"] && !nibling["skos:broader"])) {
                          _context12.next = 12;
                          break;
                        }
                        // Nibling and node are at the top of the hierarchy amd are therefore siblings
                        resolve(nibling);
                        _context12.next = 24;
                        break;
                      case 12:
                        if (nibling["skos:broader"]) {
                          _context12.next = 16;
                          break;
                        }
                        // Nibling is at the top of the hierarchy and is therefore higher up than node
                        resolve(null);
                        _context12.next = 24;
                        break;
                      case 16:
                        _context12.next = 18;
                        return EcConcept.get(niblingParent.toString());
                      case 18:
                        niblingAncestor = _context12.sent;
                        _context12.t0 = resolve;
                        _context12.next = 22;
                        return _this6.findSiblingOfNode(node, niblingAncestor);
                      case 22:
                        _context12.t1 = _context12.sent;
                        (0, _context12.t0)(_context12.t1);
                      case 24:
                      case "end":
                        return _context12.stop();
                    }
                  }, _callee12);
                }));
                return function (_x21) {
                  return _ref5.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context13.stop();
          }
        }, _callee13);
      }));
      function findSiblingOfNode(_x19, _x20) {
        return _findSiblingOfNode.apply(this, arguments);
      }
      return findSiblingOfNode;
    }(),
    findSubStructure: function () {
      var _findSubStructure = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee15(structure, node) {
        var _this7 = this;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              return _context15.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref6 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee14(resolve) {
                  var parentId, i, subStructure;
                  return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee14$(_context14) {
                    while (1) switch (_context14.prev = _context14.next) {
                      case 0:
                        if (node["skos:broader"]) {
                          _context14.next = 3;
                          break;
                        }
                        // Parent node is at the top of the container
                        resolve(structure);
                        return _context14.abrupt("return");
                      case 3:
                        parentId = null;
                        if (node["skos:broader"].length && node["skos:broader"].length > 0) {
                          parentId = node["skos:broader"][0];
                        } else {
                          parentId = node["skos:broader"];
                        }
                        i = 0;
                      case 6:
                        if (!(i < structure.length)) {
                          _context14.next = 22;
                          break;
                        }
                        if (!structure[i].children) {
                          _context14.next = 19;
                          break;
                        }
                        if (!(EcRemoteLinkedData.trimVersionFromUrl(structure[i].obj.id) === parentId)) {
                          _context14.next = 13;
                          break;
                        }
                        resolve(structure[i].children);
                        return _context14.abrupt("return");
                      case 13:
                        _context14.next = 15;
                        return _this7.findSubStructure(structure[i].children, node);
                      case 15:
                        subStructure = _context14.sent;
                        if (!subStructure) {
                          _context14.next = 19;
                          break;
                        }
                        resolve(subStructure);
                        return _context14.abrupt("return");
                      case 19:
                        i++;
                        _context14.next = 6;
                        break;
                      case 22:
                        resolve(null);
                      case 23:
                      case "end":
                        return _context14.stop();
                    }
                  }, _callee14);
                }));
                return function (_x24) {
                  return _ref6.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context15.stop();
          }
        }, _callee15);
      }));
      function findSubStructure(_x22, _x23) {
        return _findSubStructure.apply(this, arguments);
      }
      return findSubStructure;
    }(),
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
      this.move(this.hierarchy[foo.oldIndex].obj.shortId(), toId, foo.from.id, foo.to.id, !this.controlOnStart, toLast);
    },
    setPrecedes: function () {
      var _setPrecedes = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee17(container) {
        var _this8 = this;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee17$(_context17) {
          while (1) switch (_context17.prev = _context17.next) {
            case 0:
              return _context17.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref7 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee16(resolve) {
                  var i, precedes, _precedes;
                  return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee16$(_context16) {
                    while (1) switch (_context16.prev = _context16.next) {
                      case 0:
                        // container received should be an array - each array element containing and array of children and EcConcept obj.
                        if (container === null || container.length <= 0) {
                          resolve(false);
                        }
                        i = 0;
                      case 2:
                        if (!(i < container.length)) {
                          _context16.next = 38;
                          break;
                        }
                        if (!container[i]) {
                          _context16.next = 35;
                          break;
                        }
                        if (!(container[i].children && container[i].children.length > 0)) {
                          _context16.next = 13;
                          break;
                        }
                        if (!container[i].obj["ceterms:precedes"]) {
                          _context16.next = 9;
                          break;
                        }
                        delete container[i].obj["ceterms:precedes"];
                        _context16.next = 9;
                        return _this8.saveObject(container[i].obj);
                      case 9:
                        _context16.next = 11;
                        return _this8.setChildrenPrecedes(container, container[i].children);
                      case 11:
                        _context16.next = 35;
                        break;
                      case 13:
                        if (!(i === container.length - 1)) {
                          _context16.next = 22;
                          break;
                        }
                        _context16.next = 16;
                        return _this8.findPrecedes(container, EcRemoteLinkedData.trimVersionFromUrl(container[i].obj.id));
                      case 16:
                        precedes = _context16.sent;
                        container[i].obj["ceterms:precedes"] = EcRemoteLinkedData.trimVersionFromUrl(precedes);
                        _context16.next = 20;
                        return _this8.saveObject(container[i].obj);
                      case 20:
                        _context16.next = 35;
                        break;
                      case 22:
                        if (!(container[i + 1].children && container[i + 1].children.length > 0)) {
                          _context16.next = 32;
                          break;
                        }
                        _context16.next = 25;
                        return _this8.findChildrenPrecedes(container[i + 1].children, container[i].obj.id, true);
                      case 25:
                        _precedes = _context16.sent;
                        if (!(_precedes !== null)) {
                          _context16.next = 30;
                          break;
                        }
                        container[i].obj["ceterms:precedes"] = EcRemoteLinkedData.trimVersionFromUrl(_precedes);
                        _context16.next = 30;
                        return _this8.saveObject(container[i].obj);
                      case 30:
                        _context16.next = 35;
                        break;
                      case 32:
                        container[i].obj["ceterms:precedes"] = EcRemoteLinkedData.trimVersionFromUrl(container[i + 1].obj.id);
                        _context16.next = 35;
                        return _this8.saveObject(container[i].obj);
                      case 35:
                        i++;
                        _context16.next = 2;
                        break;
                      case 38:
                        resolve(true);
                      case 39:
                      case "end":
                        return _context16.stop();
                    }
                  }, _callee16);
                }));
                return function (_x26) {
                  return _ref7.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context17.stop();
          }
        }, _callee17);
      }));
      function setPrecedes(_x25) {
        return _setPrecedes.apply(this, arguments);
      }
      return setPrecedes;
    }(),
    setChildrenPrecedes: function () {
      var _setChildrenPrecedes = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee19(container, subContainer) {
        var _this9 = this;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee19$(_context19) {
          while (1) switch (_context19.prev = _context19.next) {
            case 0:
              return _context19.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref8 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee18(resolve) {
                  var j, precedes, _precedes2;
                  return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee18$(_context18) {
                    while (1) switch (_context18.prev = _context18.next) {
                      case 0:
                        j = 0;
                      case 1:
                        if (!(j < subContainer.length)) {
                          _context18.next = 38;
                          break;
                        }
                        if (!subContainer[j]) {
                          _context18.next = 35;
                          break;
                        }
                        if (!(subContainer[j].children && subContainer[j].children.length > 0)) {
                          _context18.next = 12;
                          break;
                        }
                        if (!subContainer[j].obj["ceterms:precedes"]) {
                          _context18.next = 8;
                          break;
                        }
                        delete subContainer[j].obj["ceterms:precedes"];
                        _context18.next = 8;
                        return _this9.saveObject(subContainer[j].obj);
                      case 8:
                        _context18.next = 10;
                        return _this9.setChildrenPrecedes(container, subContainer[j].children);
                      case 10:
                        _context18.next = 35;
                        break;
                      case 12:
                        if (!(j === subContainer.length - 1)) {
                          _context18.next = 22;
                          break;
                        }
                        _context18.next = 15;
                        return _this9.findPrecedes(container, EcRemoteLinkedData.trimVersionFromUrl(subContainer[j].obj.id));
                      case 15:
                        precedes = _context18.sent;
                        if (!(precedes !== null)) {
                          _context18.next = 20;
                          break;
                        }
                        subContainer[j].obj["ceterms:precedes"] = EcRemoteLinkedData.trimVersionFromUrl(precedes);
                        _context18.next = 20;
                        return _this9.saveObject(subContainer[j].obj);
                      case 20:
                        _context18.next = 35;
                        break;
                      case 22:
                        if (!(subContainer[j + 1].children && subContainer[j + 1].children.length > 0)) {
                          _context18.next = 32;
                          break;
                        }
                        _context18.next = 25;
                        return _this9.findChildrenPrecedes(subContainer[j + 1].children, subContainer[j].obj.id, true);
                      case 25:
                        _precedes2 = _context18.sent;
                        if (!(_precedes2 !== null)) {
                          _context18.next = 30;
                          break;
                        }
                        subContainer[j].obj["ceterms:precedes"] = EcRemoteLinkedData.trimVersionFromUrl(_precedes2);
                        _context18.next = 30;
                        return _this9.saveObject(subContainer[j].obj);
                      case 30:
                        _context18.next = 35;
                        break;
                      case 32:
                        subContainer[j].obj["ceterms:precedes"] = EcRemoteLinkedData.trimVersionFromUrl(subContainer[j + 1].obj.id);
                        _context18.next = 35;
                        return _this9.saveObject(subContainer[j].obj);
                      case 35:
                        j++;
                        _context18.next = 1;
                        break;
                      case 38:
                        resolve();
                      case 39:
                      case "end":
                        return _context18.stop();
                    }
                  }, _callee18);
                }));
                return function (_x29) {
                  return _ref8.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context19.stop();
          }
        }, _callee19);
      }));
      function setChildrenPrecedes(_x27, _x28) {
        return _setChildrenPrecedes.apply(this, arguments);
      }
      return setChildrenPrecedes;
    }(),
    findPrecedes: function () {
      var _findPrecedes = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee21(container, sourceNodeId) {
        var _this10 = this;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee21$(_context21) {
          while (1) switch (_context21.prev = _context21.next) {
            case 0:
              return _context21.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref9 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee20(resolve) {
                  var foundSourceNode, i, precedes;
                  return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee20$(_context20) {
                    while (1) switch (_context20.prev = _context20.next) {
                      case 0:
                        // container received should be an array - each array element containing and array of children and EcConcept obj.
                        // Assumes sourceNodeId is a leaf node
                        foundSourceNode = false;
                        if (!(container === null)) {
                          _context20.next = 3;
                          break;
                        }
                        return _context20.abrupt("return", null);
                      case 3:
                        i = 0;
                      case 4:
                        if (!(i < container.length)) {
                          _context20.next = 20;
                          break;
                        }
                        if (!(!foundSourceNode && EcRemoteLinkedData.trimVersionFromUrl(container[i].obj.id) === sourceNodeId)) {
                          _context20.next = 9;
                          break;
                        }
                        foundSourceNode = true;
                        _context20.next = 17;
                        break;
                      case 9:
                        if (!(container[i].children && container[i].children.length > 0)) {
                          _context20.next = 16;
                          break;
                        }
                        _context20.next = 12;
                        return _this10.findChildrenPrecedes(container[i].children, sourceNodeId, foundSourceNode);
                      case 12:
                        precedes = _context20.sent;
                        if (precedes) {
                          if (precedes === sourceNodeId) {
                            foundSourceNode = true;
                          } else {
                            resolve(precedes);
                          }
                        }
                        _context20.next = 17;
                        break;
                      case 16:
                        if (foundSourceNode) {
                          // Source node has already been found. That means that this is the closeest leaf node
                          resolve(EcRemoteLinkedData.trimVersionFromUrl(container[i].obj.id));
                        }
                      case 17:
                        i++;
                        _context20.next = 4;
                        break;
                      case 20:
                        resolve(null);
                      case 21:
                      case "end":
                        return _context20.stop();
                    }
                  }, _callee20);
                }));
                return function (_x32) {
                  return _ref9.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context21.stop();
          }
        }, _callee21);
      }));
      function findPrecedes(_x30, _x31) {
        return _findPrecedes.apply(this, arguments);
      }
      return findPrecedes;
    }(),
    findChildrenPrecedes: function () {
      var _findChildrenPrecedes = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee23(subContainer, sourceNodeId, foundSourceNode) {
        var _this11 = this;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee23$(_context23) {
          while (1) switch (_context23.prev = _context23.next) {
            case 0:
              return _context23.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref10 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee22(resolve) {
                  var foundChildSourceNode, j, precedes;
                  return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee22$(_context22) {
                    while (1) switch (_context22.prev = _context22.next) {
                      case 0:
                        // subContainer received should be an array - each array element containing and array of children and EcConcept obj.
                        foundChildSourceNode = foundSourceNode;
                        if (!(subContainer === null)) {
                          _context22.next = 3;
                          break;
                        }
                        return _context22.abrupt("return", null);
                      case 3:
                        j = 0;
                      case 4:
                        if (!(j < subContainer.length)) {
                          _context22.next = 20;
                          break;
                        }
                        if (!(!foundChildSourceNode && EcRemoteLinkedData.trimVersionFromUrl(subContainer[j].obj.id) === sourceNodeId)) {
                          _context22.next = 9;
                          break;
                        }
                        foundChildSourceNode = true;
                        _context22.next = 17;
                        break;
                      case 9:
                        if (!(subContainer[j].children && subContainer[j].children.length > 0)) {
                          _context22.next = 16;
                          break;
                        }
                        _context22.next = 12;
                        return _this11.findChildrenPrecedes(subContainer[j].children, sourceNodeId, foundSourceNode);
                      case 12:
                        precedes = _context22.sent;
                        if (precedes) {
                          if (precedes === sourceNodeId) {
                            foundChildSourceNode = true;
                          } else {
                            resolve(precedes);
                          }
                        }
                        _context22.next = 17;
                        break;
                      case 16:
                        if (foundChildSourceNode) {
                          // Source node has already been found. That means that this is the closeest leaf node
                          resolve(EcRemoteLinkedData.trimVersionFromUrl(subContainer[j].obj.id));
                        }
                      case 17:
                        j++;
                        _context22.next = 4;
                        break;
                      case 20:
                        if (foundChildSourceNode) {
                          resolve(sourceNodeId);
                        } else {
                          resolve(null);
                        }
                      case 21:
                      case "end":
                        return _context22.stop();
                    }
                  }, _callee22);
                }));
                return function (_x36) {
                  return _ref10.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context23.stop();
          }
        }, _callee23);
      }));
      function findChildrenPrecedes(_x33, _x34, _x35) {
        return _findChildrenPrecedes.apply(this, arguments);
      }
      return findChildrenPrecedes;
    }(),
    setPrecededBy: function () {
      var _setPrecededBy = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee25(container) {
        var _this12 = this;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee25$(_context25) {
          while (1) switch (_context25.prev = _context25.next) {
            case 0:
              return _context25.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref11 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee24(resolve) {
                  var i, precededBy, _precededBy;
                  return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee24$(_context24) {
                    while (1) switch (_context24.prev = _context24.next) {
                      case 0:
                        // container received should be an array - each array element containing and array of children and EcConcept obj.
                        if (container === null || container.length <= 0) {
                          resolve(false);
                        }
                        i = container.length - 1;
                      case 2:
                        if (!(i >= 0)) {
                          _context24.next = 39;
                          break;
                        }
                        if (!container[i]) {
                          _context24.next = 36;
                          break;
                        }
                        if (!(container[i].children && container[i].children.length > 0)) {
                          _context24.next = 13;
                          break;
                        }
                        if (!container[i].obj["ceterms:precededBy"]) {
                          _context24.next = 9;
                          break;
                        }
                        delete container[i].obj["ceterms:precededBy"];
                        _context24.next = 9;
                        return _this12.saveObject(container[i].obj);
                      case 9:
                        _context24.next = 11;
                        return _this12.setChildrenPrecededBy(container, container[i].children, i);
                      case 11:
                        _context24.next = 36;
                        break;
                      case 13:
                        if (!(i === 0)) {
                          _context24.next = 23;
                          break;
                        }
                        _context24.next = 16;
                        return _this12.findPrecededBy(container, EcRemoteLinkedData.trimVersionFromUrl(container[i].obj.id));
                      case 16:
                        precededBy = _context24.sent;
                        if (!(precededBy !== null)) {
                          _context24.next = 21;
                          break;
                        }
                        container[i].obj["ceterms:precededBy"] = EcRemoteLinkedData.trimVersionFromUrl(precededBy);
                        _context24.next = 21;
                        return _this12.saveObject(container[i].obj);
                      case 21:
                        _context24.next = 36;
                        break;
                      case 23:
                        if (!(container[i - 1].children && container[i - 1].children.length > 0)) {
                          _context24.next = 33;
                          break;
                        }
                        _context24.next = 26;
                        return _this12.findChildrenPrecededBy(container[i - 1].children, container[i].obj.id, true);
                      case 26:
                        _precededBy = _context24.sent;
                        if (!(_precededBy !== null)) {
                          _context24.next = 31;
                          break;
                        }
                        container[i].obj["ceterms:precededBy"] = EcRemoteLinkedData.trimVersionFromUrl(_precededBy);
                        _context24.next = 31;
                        return _this12.saveObject(container[i].obj);
                      case 31:
                        _context24.next = 36;
                        break;
                      case 33:
                        container[i].obj["ceterms:precededBy"] = EcRemoteLinkedData.trimVersionFromUrl(container[i - 1].obj.id);
                        _context24.next = 36;
                        return _this12.saveObject(container[i].obj);
                      case 36:
                        i--;
                        _context24.next = 2;
                        break;
                      case 39:
                        resolve(true);
                      case 40:
                      case "end":
                        return _context24.stop();
                    }
                  }, _callee24);
                }));
                return function (_x38) {
                  return _ref11.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context25.stop();
          }
        }, _callee25);
      }));
      function setPrecededBy(_x37) {
        return _setPrecededBy.apply(this, arguments);
      }
      return setPrecededBy;
    }(),
    setChildrenPrecededBy: function () {
      var _setChildrenPrecededBy = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee27(container, subContainer) {
        var _this13 = this;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee27$(_context27) {
          while (1) switch (_context27.prev = _context27.next) {
            case 0:
              return _context27.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref12 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee26(resolve) {
                  var j, precededBy, _precededBy2;
                  return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee26$(_context26) {
                    while (1) switch (_context26.prev = _context26.next) {
                      case 0:
                        j = subContainer.length - 1;
                      case 1:
                        if (!(j >= 0)) {
                          _context26.next = 38;
                          break;
                        }
                        if (!subContainer[j]) {
                          _context26.next = 35;
                          break;
                        }
                        if (!(subContainer[j].children && subContainer[j].children.length > 0)) {
                          _context26.next = 12;
                          break;
                        }
                        if (!subContainer[j].obj["ceterms:precededBy"]) {
                          _context26.next = 8;
                          break;
                        }
                        delete subContainer[j].obj["ceterms:precededBy"];
                        _context26.next = 8;
                        return _this13.saveObject(subContainer[j].obj);
                      case 8:
                        _context26.next = 10;
                        return _this13.setChildrenPrecededBy(container, subContainer[j].children);
                      case 10:
                        _context26.next = 35;
                        break;
                      case 12:
                        if (!(j === 0)) {
                          _context26.next = 22;
                          break;
                        }
                        _context26.next = 15;
                        return _this13.findPrecededBy(container, EcRemoteLinkedData.trimVersionFromUrl(subContainer[j].obj.id));
                      case 15:
                        precededBy = _context26.sent;
                        if (!(precededBy !== null)) {
                          _context26.next = 20;
                          break;
                        }
                        subContainer[j].obj["ceterms:precededBy"] = EcRemoteLinkedData.trimVersionFromUrl(precededBy);
                        _context26.next = 20;
                        return _this13.saveObject(subContainer[j].obj);
                      case 20:
                        _context26.next = 35;
                        break;
                      case 22:
                        if (!(subContainer[j - 1].children && subContainer[j - 1].children.length > 0)) {
                          _context26.next = 32;
                          break;
                        }
                        _context26.next = 25;
                        return _this13.findChildrenPrecededBy(subContainer[j - 1].children, subContainer[j].obj.id, true);
                      case 25:
                        _precededBy2 = _context26.sent;
                        if (!(_precededBy2 !== null)) {
                          _context26.next = 30;
                          break;
                        }
                        subContainer[j].obj["ceterms:precededBy"] = EcRemoteLinkedData.trimVersionFromUrl(_precededBy2);
                        _context26.next = 30;
                        return _this13.saveObject(subContainer[j].obj);
                      case 30:
                        _context26.next = 35;
                        break;
                      case 32:
                        subContainer[j].obj["ceterms:precededBy"] = EcRemoteLinkedData.trimVersionFromUrl(subContainer[j - 1].obj.id);
                        _context26.next = 35;
                        return _this13.saveObject(subContainer[j].obj);
                      case 35:
                        j--;
                        _context26.next = 1;
                        break;
                      case 38:
                        resolve();
                      case 39:
                      case "end":
                        return _context26.stop();
                    }
                  }, _callee26);
                }));
                return function (_x41) {
                  return _ref12.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context27.stop();
          }
        }, _callee27);
      }));
      function setChildrenPrecededBy(_x39, _x40) {
        return _setChildrenPrecededBy.apply(this, arguments);
      }
      return setChildrenPrecededBy;
    }(),
    findPrecededBy: function () {
      var _findPrecededBy = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee29(container, sourceNodeId) {
        var _this14 = this;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee29$(_context29) {
          while (1) switch (_context29.prev = _context29.next) {
            case 0:
              return _context29.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref13 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee28(resolve) {
                  var foundSourceNode, i, precededBy;
                  return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee28$(_context28) {
                    while (1) switch (_context28.prev = _context28.next) {
                      case 0:
                        // container received should be an array - each array element containing and array of children and EcConcept obj.
                        // Assumes sourceNodeId is a leaf node
                        foundSourceNode = false;
                        if (!(container === null)) {
                          _context28.next = 3;
                          break;
                        }
                        return _context28.abrupt("return", null);
                      case 3:
                        i = container.length - 1;
                      case 4:
                        if (!(i >= 0)) {
                          _context28.next = 20;
                          break;
                        }
                        if (!(!foundSourceNode && EcRemoteLinkedData.trimVersionFromUrl(container[i].obj.id) === sourceNodeId)) {
                          _context28.next = 9;
                          break;
                        }
                        foundSourceNode = true;
                        _context28.next = 17;
                        break;
                      case 9:
                        if (!(container[i].children && container[i].children.length > 0)) {
                          _context28.next = 16;
                          break;
                        }
                        _context28.next = 12;
                        return _this14.findChildrenPrecededBy(container[i].children, sourceNodeId, foundSourceNode);
                      case 12:
                        precededBy = _context28.sent;
                        if (precededBy) {
                          if (precededBy === sourceNodeId) {
                            foundSourceNode = true;
                          } else {
                            resolve(precededBy);
                          }
                        }
                        _context28.next = 17;
                        break;
                      case 16:
                        if (foundSourceNode) {
                          // Source node has already been found. That means that this is the closeest leaf node
                          resolve(EcRemoteLinkedData.trimVersionFromUrl(container[i].obj.id));
                        }
                      case 17:
                        i--;
                        _context28.next = 4;
                        break;
                      case 20:
                        resolve(null);
                      case 21:
                      case "end":
                        return _context28.stop();
                    }
                  }, _callee28);
                }));
                return function (_x44) {
                  return _ref13.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context29.stop();
          }
        }, _callee29);
      }));
      function findPrecededBy(_x42, _x43) {
        return _findPrecededBy.apply(this, arguments);
      }
      return findPrecededBy;
    }(),
    findChildrenPrecededBy: function () {
      var _findChildrenPrecededBy = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee31(subContainer, sourceNodeId, foundSourceNode) {
        var _this15 = this;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee31$(_context31) {
          while (1) switch (_context31.prev = _context31.next) {
            case 0:
              return _context31.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref14 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee30(resolve) {
                  var foundChildSourceNode, j, precededBy;
                  return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee30$(_context30) {
                    while (1) switch (_context30.prev = _context30.next) {
                      case 0:
                        // subContainer received should be an array - each array element containing and array of children and EcConcept obj.
                        foundChildSourceNode = foundSourceNode;
                        if (!(subContainer === null)) {
                          _context30.next = 3;
                          break;
                        }
                        return _context30.abrupt("return", null);
                      case 3:
                        j = subContainer.length - 1;
                      case 4:
                        if (!(j >= 0)) {
                          _context30.next = 20;
                          break;
                        }
                        if (!(!foundChildSourceNode && EcRemoteLinkedData.trimVersionFromUrl(subContainer[j].obj.id) === sourceNodeId)) {
                          _context30.next = 9;
                          break;
                        }
                        foundChildSourceNode = true;
                        _context30.next = 17;
                        break;
                      case 9:
                        if (!(subContainer[j].children && subContainer[j].children.length > 0)) {
                          _context30.next = 16;
                          break;
                        }
                        _context30.next = 12;
                        return _this15.findChildrenPrecededBy(subContainer[j].children, sourceNodeId, foundSourceNode);
                      case 12:
                        precededBy = _context30.sent;
                        if (precededBy) {
                          if (precededBy === sourceNodeId) {
                            foundChildSourceNode = true;
                          } else {
                            resolve(precededBy);
                          }
                        }
                        _context30.next = 17;
                        break;
                      case 16:
                        if (foundChildSourceNode) {
                          // Source node has already been found. That means that this is the closeest leaf node
                          resolve(EcRemoteLinkedData.trimVersionFromUrl(subContainer[j].obj.id));
                        }
                      case 17:
                        j--;
                        _context30.next = 4;
                        break;
                      case 20:
                        if (foundChildSourceNode) {
                          resolve(sourceNodeId);
                        } else {
                          resolve(null);
                        }
                      case 21:
                      case "end":
                        return _context30.stop();
                    }
                  }, _callee30);
                }));
                return function (_x48) {
                  return _ref14.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context31.stop();
          }
        }, _callee31);
      }));
      function findChildrenPrecededBy(_x45, _x46, _x47) {
        return _findChildrenPrecededBy.apply(this, arguments);
      }
      return findChildrenPrecededBy;
    }(),
    saveObject: function () {
      var _saveObject = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee33(obj) {
        var _this16 = this;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee33$(_context33) {
          while (1) switch (_context33.prev = _context33.next) {
            case 0:
              return _context33.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref15 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee32(resolve) {
                  return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee32$(_context32) {
                    while (1) switch (_context32.prev = _context32.next) {
                      case 0:
                        _this16.repo.saveTo(obj, function () {
                          resolve();
                        }, appError);
                      case 1:
                      case "end":
                        return _context32.stop();
                    }
                  }, _callee32);
                }));
                return function (_x50) {
                  return _ref15.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context33.stop();
          }
        }, _callee33);
      }));
      function saveObject(_x49) {
        return _saveObject.apply(this, arguments);
      }
      return saveObject;
    }(),
    move: function () {
      var _move = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee35(fromId, toId, fromContainerId, toContainerId, removeOldRelations, toLast) {
        var me, container, property, initialValue, fromIndex, toIndex, moveComp, fromContainer, fromProperty, fromProperty2, toContainer, toProperty, toProperty2, fromPropInitialValue, fromProp2InitialValue, toPropInitialValue, toProp2InitialValue;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee35$(_context35) {
          while (1) switch (_context35.prev = _context35.next) {
            case 0:
              this.once = true;
              me = this;
              if (!(fromContainerId === toContainerId)) {
                _context35.next = 26;
                break;
              }
              if (!toContainerId) {
                _context35.next = 9;
                break;
              }
              _context35.next = 6;
              return EcRepository.get(toContainerId);
            case 6:
              _context35.t0 = _context35.sent;
              _context35.next = 10;
              break;
            case 9:
              _context35.t0 = this.container;
            case 10:
              container = _context35.t0;
              property = "skos:narrower";
              if (container.type === "ConceptScheme") {
                container = this.container;
                property = "skos:hasTopConcept";
              }
              initialValue = container[property] ? container[property].slice() : null;
              fromIndex = container[property].indexOf(fromId);
              container[property].splice(fromIndex, 1);
              if (toId == null || toId === undefined) {
                if (!EcArray.isArray(container[property])) {
                  container[property] = [];
                }
                container[property].push(fromId);
              } else {
                if (toLast) {
                  container[property].push(fromId);
                } else {
                  toIndex = container[property].indexOf(toId);
                  container[property].splice(toIndex, 0, fromId);
                }
              }
              me.$store.commit('editor/addEditsToUndo', [{
                operation: "update",
                id: container.shortId(),
                fieldChanged: [property],
                initialValue: [initialValue]
              }]);
              container["schema:dateModified"] = new Date().toISOString();
              if (!(this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[container.id] !== true)) {
                _context35.next = 23;
                break;
              }
              _context35.next = 22;
              return EcEncryptedValue.toEncryptedValue(container);
            case 22:
              container = _context35.sent;
            case 23:
              this.repo.saveTo(container, function () {
                me.computeHierarchy(false);
              }, appError);
              _context35.next = 64;
              break;
            case 26:
              _context35.next = 28;
              return EcConcept.get(fromId);
            case 28:
              moveComp = _context35.sent;
              if (!fromContainerId) {
                _context35.next = 35;
                break;
              }
              _context35.next = 32;
              return EcRepository.get(fromContainerId);
            case 32:
              _context35.t1 = _context35.sent;
              _context35.next = 36;
              break;
            case 35:
              _context35.t1 = this.container;
            case 36:
              fromContainer = _context35.t1;
              fromProperty = "skos:narrower";
              fromProperty2 = "skos:broader";
              if (!toContainerId) {
                _context35.next = 45;
                break;
              }
              _context35.next = 42;
              return EcRepository.get(toContainerId);
            case 42:
              _context35.t2 = _context35.sent;
              _context35.next = 46;
              break;
            case 45:
              _context35.t2 = this.container;
            case 46:
              toContainer = _context35.t2;
              toProperty = "skos:narrower";
              toProperty2 = "skos:broader";
              if (fromContainer.type === "ConceptScheme") {
                fromContainer = this.container;
                fromProperty = "skos:hasTopConcept";
                fromProperty2 = "skos:topConceptOf";
              }
              if (toContainer.type === "ConceptScheme") {
                toContainer = this.container;
                toProperty = "skos:hasTopConcept";
                toProperty2 = "skos:topConceptOf";
              }
              fromIndex = fromContainer[fromProperty].indexOf(fromId);
              fromPropInitialValue = fromContainer[fromProperty].slice();
              fromProp2InitialValue = moveComp[fromProperty2] ? moveComp[fromProperty2].slice() : null;
              toPropInitialValue = toContainer[toProperty] ? toContainer[toProperty].slice() : null;
              toProp2InitialValue = moveComp[toProperty2] ? moveComp[toProperty2].slice() : null;
              if (removeOldRelations) {
                fromContainer[fromProperty].splice(fromIndex, 1);
              }
              if (fromContainerId && moveComp[fromProperty2]) {
                if (removeOldRelations) {
                  EcArray.setRemove(moveComp[fromProperty2], fromContainerId);
                }
                if (moveComp[fromProperty2].length === 0) {
                  delete moveComp[fromProperty2];
                }
              } else {
                delete moveComp[fromProperty2];
              }
              fromContainer["schema:dateModified"] = new Date().toISOString();
              if (!(this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[fromContainer.id] !== true)) {
                _context35.next = 63;
                break;
              }
              _context35.next = 62;
              return EcEncryptedValue.toEncryptedValue(fromContainer);
            case 62:
              fromContainer = _context35.sent;
            case 63:
              this.repo.saveTo(fromContainer, /*#__PURE__*/Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee34() {
                var toIndex;
                return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee34$(_context34) {
                  while (1) switch (_context34.prev = _context34.next) {
                    case 0:
                      if (toId == null || toId === undefined) {
                        if (!EcArray.isArray(toContainer[toProperty])) {
                          toContainer[toProperty] = [];
                        }
                        toContainer[toProperty].push(fromId);
                      } else {
                        toIndex = toContainer[toProperty].indexOf(toId);
                        toContainer[toProperty].splice(toIndex, 0, fromId);
                      }
                      if (toContainer.type === "ConceptScheme") {
                        moveComp[toProperty2] = toContainerId;
                      } else {
                        if (!EcArray.isArray(moveComp[toProperty2])) {
                          moveComp[toProperty2] = [];
                        }
                        if (toContainerId) {
                          moveComp[toProperty2].push(toContainerId);
                        }
                      }
                      me.$store.commit('editor/addEditsToUndo', [{
                        operation: "update",
                        id: fromContainer.shortId(),
                        fieldChanged: [fromProperty],
                        initialValue: [fromPropInitialValue]
                      }, {
                        operation: "update",
                        id: toContainer.shortId(),
                        fieldChanged: [toProperty],
                        initialValue: [toPropInitialValue]
                      }, {
                        operation: "update",
                        id: moveComp.shortId(),
                        fieldChanged: [fromProperty2, toProperty2],
                        initialValue: [fromProp2InitialValue, toProp2InitialValue]
                      }]);
                      toContainer["schema:dateModified"] = new Date().toISOString();
                      moveComp["schema:dateModified"] = new Date().toISOString();
                      if (!(me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[toContainer.id] !== true)) {
                        _context34.next = 9;
                        break;
                      }
                      _context34.next = 8;
                      return EcEncryptedValue.toEncryptedValue(toContainer);
                    case 8:
                      toContainer = _context34.sent;
                    case 9:
                      if (!(me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[moveComp.id] !== true)) {
                        _context34.next = 13;
                        break;
                      }
                      _context34.next = 12;
                      return EcEncryptedValue.toEncryptedValue(moveComp);
                    case 12:
                      moveComp = _context34.sent;
                    case 13:
                      me.repo.saveTo(toContainer, function () {
                        me.repo.saveTo(moveComp, appLog, appError);
                        me.computeHierarchy(false);
                      }, appLog);
                    case 14:
                    case "end":
                      return _context34.stop();
                  }
                }, _callee34);
              })), appError);
            case 64:
              this.dragging = false;
            case 65:
            case "end":
              return _context35.stop();
          }
        }, _callee35, this);
      }));
      function move(_x51, _x52, _x53, _x54, _x55, _x56) {
        return _move.apply(this, arguments);
      }
      return move;
    }(),
    add: function () {
      var _add = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee36(containerId, previousSibling) {
        var me, c, j, owner, reader, initialValue, index, parent;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee36$(_context36) {
          while (1) switch (_context36.prev = _context36.next) {
            case 0:
              me = this;
              c = new EcConcept();
              if (this.queryParams.newObjectEndpoint) {
                c.generateShortId(this.queryParams.newObjectEndpoint);
              } else {
                c.generateId(this.repo.selectedServer);
              }
              c["subType"] = 'Progression';
              c["schema:dateCreated"] = new Date().toISOString();
              c["schema:dateModified"] = new Date().toISOString();
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
                  r.addReader(EcPk.fromPem(reader));
                }
              }
              this.setDefaultLanguage();
              c["skos:prefLabel"] = {
                "@language": this.$store.state.editor.defaultLanguage,
                "@value": "New Progression Level"
              };
              c["ceasn:inProgressionModel"] = this.container.shortId();
              if (!(containerId === this.container.shortId())) {
                _context36.next = 39;
                break;
              }
              initialValue = this.container["skos:hasTopConcept"] ? this.container["skos:hasTopConcept"].slice() : null;
              if (!EcArray.isArray(this.container["skos:hasTopConcept"])) {
                this.container["skos:hasTopConcept"] = [];
              }
              if (previousSibling == null || previousSibling === undefined) {
                this.container["skos:hasTopConcept"].push(c.shortId());
              } else {
                // Insert immediately after the sibling
                index = this.container["skos:hasTopConcept"].indexOf(previousSibling);
                this.container["skos:hasTopConcept"].splice(index + 1, 0, c.shortId());
              }
              c["skos:topConceptOf"] = this.container.shortId();
              me.$store.commit('editor/addEditsToUndo', [{
                operation: "addNew",
                id: c.shortId()
              }, {
                operation: "update",
                id: this.container.shortId(),
                fieldChanged: ["skos:hasTopConcept"],
                initialValue: [initialValue]
              }]);
              this.container["schema:dateModified"] = new Date().toISOString();
              c["schema:dateModified"] = new Date().toISOString();
              if (!(this.$store.state.editor.private === true)) {
                _context36.next = 28;
                break;
              }
              _context36.next = 23;
              return EcEncryptedValue.toEncryptedValue(c);
            case 23:
              c = _context36.sent;
              if (!(EcEncryptedValue.encryptOnSaveMap[me.container.id] !== true)) {
                _context36.next = 28;
                break;
              }
              _context36.next = 27;
              return EcEncryptedValue.toEncryptedValue(me.container);
            case 27:
              me.container = _context36.sent;
            case 28:
              _context36.prev = 28;
              _context36.next = 31;
              return this.repo.multiput([c, me.container]);
            case 31:
              me.once = true;
              _context36.next = 37;
              break;
            case 34:
              _context36.prev = 34;
              _context36.t0 = _context36["catch"](28);
              appError(_context36.t0);
            case 37:
              _context36.next = 71;
              break;
            case 39:
              c["skos:broader"] = [containerId];
              _context36.next = 42;
              return EcConcept.get(containerId);
            case 42:
              parent = _context36.sent;
              initialValue = parent["skos:narrower"] ? parent["skos:narrower"].slice() : null;
              if (!EcArray.isArray(parent["skos:narrower"])) {
                parent["skos:narrower"] = [];
              }
              if (previousSibling == null || previousSibling === undefined) {
                parent["skos:narrower"].push(c.shortId());
              } else {
                // Insert immediately after the sibling
                index = parent["skos:narrower"].indexOf(previousSibling);
                parent["skos:narrower"].splice(index + 1, 0, c.shortId());
              }
              me.$store.commit('editor/addEditsToUndo', [{
                operation: "addNew",
                id: c.shortId()
              }, {
                operation: "update",
                id: parent.shortId(),
                fieldChanged: ["skos:narrower"],
                initialValue: [initialValue]
              }]);
              this.container["schema:dateModified"] = new Date().toISOString();
              c["schema:dateModified"] = new Date().toISOString();
              parent["schema:dateModified"] = new Date().toISOString();
              if (!(this.$store.state.editor.private === true)) {
                _context36.next = 62;
                break;
              }
              _context36.next = 53;
              return EcEncryptedValue.toEncryptedValue(c);
            case 53:
              c = _context36.sent;
              if (!(EcEncryptedValue.encryptOnSaveMap[parent.id] !== true)) {
                _context36.next = 58;
                break;
              }
              _context36.next = 57;
              return EcEncryptedValue.toEncryptedValue(parent);
            case 57:
              parent = _context36.sent;
            case 58:
              if (!(EcEncryptedValue.encryptOnSaveMap[me.container.id] !== true)) {
                _context36.next = 62;
                break;
              }
              _context36.next = 61;
              return EcEncryptedValue.toEncryptedValue(me.container);
            case 61:
              me.container = _context36.sent;
            case 62:
              _context36.prev = 62;
              _context36.next = 65;
              return this.repo.multiput([c, parent, me.container]);
            case 65:
              me.once = true;
              _context36.next = 71;
              break;
            case 68:
              _context36.prev = 68;
              _context36.t1 = _context36["catch"](62);
              appError(_context36.t1);
            case 71:
              this.$store.commit("editor/newCompetency", c.shortId());
              appLog("Added node: ", JSON.parse(c.toJson()));
            case 73:
            case "end":
              return _context36.stop();
          }
        }, _callee36, this, [[28, 34], [62, 68]]);
      }));
      function add(_x57, _x58) {
        return _add.apply(this, arguments);
      }
      return add;
    }(),
    select: function select(objId, checked) {
      if (checked) {
        EcArray.setAdd(this.selectedArray, objId);
      } else {
        EcArray.setRemove(this.selectedArray, objId);
      }
    },
    onDraggableCheck: function onDraggableCheck(checked) {
      this.isDraggable = checked;
    },
    cancelImport: function cancelImport() {
      this.deleteObject(this.container);
      this.$store.dispatch('app/clearImport');
    },
    openFramework: function () {
      var _openFramework = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee37() {
        var f;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee37$(_context37) {
          while (1) switch (_context37.prev = _context37.next) {
            case 0:
              _context37.next = 2;
              return EcConceptScheme.get(this.container.shortId());
            case 2:
              f = _context37.sent;
              this.$store.commit('editor/framework', f);
              this.$router.push({
                name: "progressionModel",
                params: {
                  frameworkId: this.container.id
                }
              });
            case 5:
            case "end":
              return _context37.stop();
          }
        }, _callee37, this);
      }));
      function openFramework() {
        return _openFramework.apply(this, arguments);
      }
      return openFramework;
    }(),
    onClickCreateNew: function () {
      var _onClickCreateNew = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee38() {
        var parent;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee38$(_context38) {
          while (1) switch (_context38.prev = _context38.next) {
            case 0:
              parent = this.container.shortId();
              if (this.selectedArray.length === 1) {
                parent = this.selectedArray[0];
              }
              this.loading = true;
              _context38.prev = 3;
              _context38.next = 6;
              return this.add(parent, null);
            case 6:
              _context38.next = 11;
              break;
            case 8:
              _context38.prev = 8;
              _context38.t0 = _context38["catch"](3);
              appError(_context38.t0);
            case 11:
              this.loading = false;
              this.addingNode = false;
            case 13:
            case "end":
              return _context38.stop();
          }
        }, _callee38, this, [[3, 8]]);
      }));
      function onClickCreateNew() {
        return _onClickCreateNew.apply(this, arguments);
      }
      return onClickCreateNew;
    }(),
    deleteSelected: function () {
      var _deleteSelected = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee39() {
        var item;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee39$(_context39) {
          while (1) switch (_context39.prev = _context39.next) {
            case 0:
              _context39.next = 2;
              return EcRepository.get(this.selectedArray[0]);
            case 2:
              item = _context39.sent;
              this.deleteLevel(item);
              this.selectedArray.splice(0, this.selectedArray.length);
            case 5:
            case "end":
              return _context39.stop();
          }
        }, _callee39, this);
      }));
      function deleteSelected() {
        return _deleteSelected.apply(this, arguments);
      }
      return deleteSelected;
    }(),
    deleteLevel: function deleteLevel(thing) {
      appLog("deleting " + thing.id);
      this.deleteLevelInner(thing);
      this.framework["schema:dateModified"] = new Date().toISOString();
      this.$store.commit('editor/selectedCompetency', null);
    },
    deleteLevelInner: function () {
      var _deleteLevelInner = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee40(c) {
        var me, editsToUndo, i, level, initialValue, _level, framework;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee40$(_context40) {
          while (1) switch (_context40.prev = _context40.next) {
            case 0:
              me = this;
              editsToUndo = [];
              if (!(c["skos:broader"] != null)) {
                _context40.next = 28;
                break;
              }
              i = 0;
            case 4:
              if (!(i < c["skos:broader"].length)) {
                _context40.next = 28;
                break;
              }
              _context40.prev = 5;
              _context40.next = 8;
              return EcConcept.get(c["skos:broader"][i]);
            case 8:
              level = _context40.sent;
              initialValue = level["skos:narrower"].slice();
              EcArray.setRemove(level["skos:narrower"], c.shortId());
              level["schema:dateModified"] = new Date().toISOString();
              editsToUndo.push({
                operation: "update",
                id: level.shortId(),
                fieldChanged: ["skos:narrower"],
                initialValue: [initialValue]
              });
              if (!(me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[level.id] !== true)) {
                _context40.next = 17;
                break;
              }
              _context40.next = 16;
              return EcEncryptedValue.toEncryptedValue(level);
            case 16:
              level = _context40.sent;
            case 17:
              _context40.next = 19;
              return repo.saveTo(level);
            case 19:
              me.$store.commit('editor/framework', me.framework);
              _context40.next = 25;
              break;
            case 22:
              _context40.prev = 22;
              _context40.t0 = _context40["catch"](5);
              appError(_context40.t0);
            case 25:
              i++;
              _context40.next = 4;
              break;
            case 28:
              if (!(c["skos:narrower"] != null)) {
                _context40.next = 44;
                break;
              }
              i = 0;
            case 30:
              if (!(i < c["skos:narrower"].length)) {
                _context40.next = 44;
                break;
              }
              _context40.prev = 31;
              _context40.next = 34;
              return EcConcept.get(c["skos:narrower"][i]);
            case 34:
              _level = _context40.sent;
              me.deleteLevelInner(_level);
              _context40.next = 41;
              break;
            case 38:
              _context40.prev = 38;
              _context40.t1 = _context40["catch"](31);
              appError(_context40.t1);
            case 41:
              i++;
              _context40.next = 30;
              break;
            case 44:
              if (!(c["skos:topConceptOf"] != null)) {
                _context40.next = 63;
                break;
              }
              _context40.prev = 45;
              initialValue = this.framework["skos:hasTopConcept"].slice();
              EcArray.setRemove(this.framework["skos:hasTopConcept"], c.shortId());
              editsToUndo.push({
                operation: "update",
                id: this.framework.shortId(),
                fieldChanged: ["skos:hasTopConcept"],
                initialValue: [initialValue]
              });
              framework = this.framework;
              framework["schema:dateModified"] = new Date().toISOString();
              if (!(this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true)) {
                _context40.next = 55;
                break;
              }
              _context40.next = 54;
              return EcEncryptedValue.toEncryptedValue(framework);
            case 54:
              framework = _context40.sent;
            case 55:
              _context40.next = 57;
              return repo.saveTo(framework);
            case 57:
              me.$store.commit('editor/framework', me.framework);
              _context40.next = 63;
              break;
            case 60:
              _context40.prev = 60;
              _context40.t2 = _context40["catch"](45);
              appError(_context40.t2);
            case 63:
              this.spitEvent("levelDeleted", c.shortId(), "editFrameworkPage");
              editsToUndo.push({
                operation: "delete",
                obj: c
              });
              repo.deleteRegistered(c, function () {
                me.$store.commit('editor/framework', me.framework);
                me.$store.commit('editor/addEditsToUndo', JSON.parse(JSON.stringify(editsToUndo)));
                editsToUndo.splice(0, editsToUndo.length);
              }, appError);
            case 66:
            case "end":
              return _context40.stop();
          }
        }, _callee40, this, [[5, 22], [31, 38], [45, 60]]);
      }));
      function deleteLevelInner(_x59) {
        return _deleteLevelInner.apply(this, arguments);
      }
      return deleteLevelInner;
    }()
  }
});
// CONCATENATED MODULE: ./src/views/progressionModel/ProgressionHierarchy.vue?vue&type=script&lang=js
 /* harmony default export */ var progressionModel_ProgressionHierarchyvue_type_script_lang_js = (ProgressionHierarchyvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/views/progressionModel/ProgressionHierarchy.vue?vue&type=style&index=0&id=8c6e2d48&prod&lang=scss
var ProgressionHierarchyvue_type_style_index_0_id_8c6e2d48_prod_lang_scss = __webpack_require__("0751");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/views/progressionModel/ProgressionHierarchy.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  progressionModel_ProgressionHierarchyvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ProgressionHierarchy = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "6ffa4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("14d9");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("fb6a");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("c7eb");
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("1da1");
/* harmony import */ var _mixins_common_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("872c");







/* harmony default export */ __webpack_exports__["a"] = ({
  mixins: [_mixins_common_js__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]],
  methods: {
    removeObject: function removeObject(thing) {
      // Remove from container but don't delete
      appLog("removing " + thing.id);
      var me = this;
      var thisFramework = this.$store.getters['editor/framework'];
      var initialCompetencies = thisFramework.competency ? thisFramework.competency.slice() : null;
      var initialRelations = thisFramework.relation ? thisFramework.relation.slice() : null;
      var initialLevels = thisFramework.level ? thisFramework.level.slice() : null;
      thisFramework["schema:dateModified"] = new Date().toISOString();
      thisFramework.removeCompetency(thing.shortId(), /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().mark(function _callee() {
        var framework;
        return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              framework = me.framework;
              me.$store.commit('editor/addEditsToUndo', [{
                operation: "update",
                id: framework.shortId(),
                fieldChanged: ["competency", "relation", "level"],
                initialValue: [initialCompetencies, initialRelations, initialLevels]
              }]);
              if (!(me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[f.id] !== true)) {
                _context.next = 6;
                break;
              }
              _context.next = 5;
              return EcEncryptedValue.toEncryptedValue(framework);
            case 5:
              framework = _context.sent;
            case 6:
              window.repo.saveTo(framework, function () {
                me.$store.commit('editor/framework', thisFramework);
              }, appError);
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee);
      })), appLog);
    },
    deleteObject: function deleteObject(thing) {
      appLog("deleting " + thing.id);
      var me = this;
      var framework = this.$store.getters['editor/framework'];
      if (thing.shortId() === framework.shortId()) {
        // delete framework
        window.repo.deleteRegistered(framework, function (success) {
          me.spitEvent("frameworkDeleted", framework.shortId(), "editFrameworkSection");
          // Delete the framework, delete all non-used stuff.
          if (framework.competency != null) {
            for (var i = 0; i < framework.competency.length; i++) {
              me.conditionalDelete(framework.competency[i]);
            }
          }
          if (framework.relation != null) {
            for (var i = 0; i < framework.relation.length; i++) {
              me.conditionalDelete(framework.relation[i]);
            }
          }
          if (framework.level != null) {
            for (var i = 0; i < framework.level.length; i++) {
              me.conditionalDelete(framework.level[i]);
            }
          }
          me.$store.commit('editor/framework', null);
          if (me.importType) {
            // Calling function from import page
            me.$store.commit('app/importFramework', null);
          } else {
            me.$router.push({
              name: "frameworks"
            });
          }
        }, appLog);
      } else {
        // Delete competency and relations
        var initialCompetencies = framework.competency ? framework.competency.slice() : null;
        var initialRelations = framework.relation ? framework.relation.slice() : null;
        var initialLevels = framework.level ? framework.level.slice() : null;
        this.$store.commit('editor/selectedCompetency', thing);
        framework["schema:dateModified"] = new Date().toISOString();
        framework.removeCompetency(thing.shortId(), /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().mark(function _callee2() {
          var frameworkToSave;
          return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                framework.removeLevel(thing.shortId());
                me.$store.commit('editor/addEditsToUndo', [{
                  operation: "delete",
                  obj: thing
                }, {
                  operation: "update",
                  id: framework.shortId(),
                  fieldChanged: ["competency", "relation", "level"],
                  initialValue: [initialCompetencies, initialRelations, initialLevels],
                  changedValue: [framework.competency, framework.relation, framework.level]
                }]);
                me.conditionalDelete(thing.shortId());
                me.spitEvent("competencyDeleted", thing.shortId(), "editFrameworkSection");
                me.$store.commit('editor/selectedCompetency', null);
                frameworkToSave = framework;
                if (!(me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true)) {
                  _context2.next = 10;
                  break;
                }
                _context2.next = 9;
                return EcEncryptedValue.toEncryptedValue(framework);
              case 9:
                frameworkToSave = _context2.sent;
              case 10:
                window.repo.saveTo(frameworkToSave, function () {
                  me.$store.commit('editor/framework', framework);
                }, appError);
              case 11:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        })), appLog);
      }
    }
  }
});

/***/ }),

/***/ "c961":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);
//# sourceMappingURL=chunk-9dddac98.dda8d821.js.map