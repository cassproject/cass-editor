(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-f460016e","chunk-74a95bb3"],{

/***/ "27c7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("fb6a");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2d7716c2-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/progressionModel/ProgressionHierarchy.vue?vue&type=template&id=4351b123


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

// CONCATENATED MODULE: ./src/views/progressionModel/ProgressionHierarchy.vue?vue&type=template&id=4351b123

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regenerator.js + 1 modules
var regenerator = __webpack_require__("c14f");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find-index.js
var es_array_find_index = __webpack_require__("c740");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__("caad");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__("a434");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.iterator.constructor.js
var es_iterator_constructor = __webpack_require__("e9f5");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.iterator.map.js
var es_iterator_map = __webpack_require__("ab43");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.json.stringify.js
var es_json_stringify = __webpack_require__("e9c4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__("25f0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__("2532");

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
      var _removePrecedence = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee2() {
        var _this2 = this;
        return Object(regenerator["a" /* default */])().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              return _context2.a(2, new Promise(/*#__PURE__*/function () {
                var _ref = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee(resolve) {
                  var structure, i, c;
                  return Object(regenerator["a" /* default */])().w(function (_context) {
                    while (1) switch (_context.n) {
                      case 0:
                        structure = [];
                        if (!(_this2.container == null)) {
                          _context.n = 1;
                          break;
                        }
                        return _context.a(2, r);
                      case 1:
                        if (!(_this2.container["skos:hasTopConcept"] !== null && _this2.container["skos:hasTopConcept"] !== undefined)) {
                          _context.n = 7;
                          break;
                        }
                        if (!(_this2.container["ceterms:precedes"] || _this2.container["ceterms:precededBy"])) {
                          _context.n = 2;
                          break;
                        }
                        if (_this2.container["ceterms:precedes"]) delete _this2.container["ceterms:precedes"];
                        if (_this2.container["ceterms:precededBy"]) delete _this2.container["ceterms:precededBy"];
                        _context.n = 2;
                        return _this2.saveObject(_this2.container);
                      case 2:
                        i = 0;
                      case 3:
                        if (!(i < _this2.container["skos:hasTopConcept"].length)) {
                          _context.n = 7;
                          break;
                        }
                        _context.n = 4;
                        return EcConcept.get(_this2.container["skos:hasTopConcept"][i]);
                      case 4:
                        c = _context.v;
                        if (!c) {
                          _context.n = 6;
                          break;
                        }
                        if (!(c["ceterms:precedes"] || c["ceterms:precededBy"])) {
                          _context.n = 5;
                          break;
                        }
                        if (c["ceterms:precedes"]) delete c["ceterms:precedes"];
                        if (c["ceterms:precededBy"]) delete c["ceterms:precededBy"];
                        _context.n = 5;
                        return _this2.saveObject(c);
                      case 5:
                        structure.push({
                          "obj": c,
                          "children": []
                        });
                        if (!c["skos:narrower"]) {
                          _context.n = 6;
                          break;
                        }
                        _context.n = 6;
                        return _this2.addChildren(structure, c, i, true);
                      case 6:
                        i++;
                        _context.n = 3;
                        break;
                      case 7:
                        _this2.structure = structure;
                        resolve();
                      case 8:
                        return _context.a(2);
                    }
                  }, _callee);
                }));
                return function (_x) {
                  return _ref.apply(this, arguments);
                };
              }()));
          }
        }, _callee2);
      }));
      function removePrecedence() {
        return _removePrecedence.apply(this, arguments);
      }
      return removePrecedence;
    }(),
    setPrecedence: function () {
      var _setPrecedence = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee3() {
        var structure;
        return Object(regenerator["a" /* default */])().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _context3.n = 1;
              return this.removePrecedence();
            case 1:
              structure = this.structure;
              _context3.n = 2;
              return this.setPrecedes(structure);
            case 2:
              _context3.n = 3;
              return this.setPrecededBy(structure);
            case 3:
              this.structure = structure;
            case 4:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function setPrecedence() {
        return _setPrecedence.apply(this, arguments);
      }
      return setPrecedence;
    }(),
    computeHierarchy: function () {
      var _computeHierarchy = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee4(setOrder) {
        var structure, i, c;
        return Object(regenerator["a" /* default */])().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              structure = [];
              if (!(this.container == null)) {
                _context4.n = 1;
                break;
              }
              return _context4.a(2, r);
            case 1:
              if (!(this.container["skos:hasTopConcept"] !== null && this.container["skos:hasTopConcept"] !== undefined)) {
                _context4.n = 5;
                break;
              }
              i = 0;
            case 2:
              if (!(i < this.container["skos:hasTopConcept"].length)) {
                _context4.n = 5;
                break;
              }
              _context4.n = 3;
              return EcConcept.get(this.container["skos:hasTopConcept"][i]);
            case 3:
              c = _context4.v;
              if (c) {
                structure.push({
                  "obj": c,
                  "children": []
                });
                // if (c["skos:narrower"]) {
                //     await this.addChildren(structure, c, i, false);
                // }
              }
            case 4:
              i++;
              _context4.n = 2;
              break;
            case 5:
              if (!setOrder) {
                _context4.n = 7;
                break;
              }
              _context4.n = 6;
              return this.reorder(structure, "ceterms:precedes");
            case 6:
              _context4.n = 7;
              return this.reorder(structure, "ceterms:precededBy");
            case 7:
              this.structure = structure;
              this.once = false;
            case 8:
              return _context4.a(2);
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
      var _addChildren = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee6(structure, c, parentIndex, deletePrecedence) {
        var _this3 = this;
        return Object(regenerator["a" /* default */])().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              return _context6.a(2, new Promise(/*#__PURE__*/function () {
                var _ref2 = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee5(resolve) {
                  var j, subC, childIndex;
                  return Object(regenerator["a" /* default */])().w(function (_context5) {
                    while (1) switch (_context5.n) {
                      case 0:
                        if (structure[parentIndex]) {
                          _context5.n = 1;
                          break;
                        }
                        appError("Structure at index ".concat(parentIndex, " is undefined"));
                        resolve();
                        return _context5.a(2);
                      case 1:
                        if (!structure[parentIndex].children) {
                          structure[parentIndex].children = [];
                        }
                        if (c["skos:narrower"]) {
                          _context5.n = 2;
                          break;
                        }
                        resolve();
                        return _context5.a(2);
                      case 2:
                        j = 0;
                      case 3:
                        if (!(j < c["skos:narrower"].length)) {
                          _context5.n = 8;
                          break;
                        }
                        _context5.n = 4;
                        return EcConcept.get(c["skos:narrower"][j]);
                      case 4:
                        subC = _context5.v;
                        if (subC) {
                          _context5.n = 5;
                          break;
                        }
                        appLog("Could not find child concept: ".concat(c["skos:narrower"][j]));
                        return _context5.a(3, 7);
                      case 5:
                        if (!(deletePrecedence && (subC["ceterms:precedes"] || subC["ceterms:precededBy"]))) {
                          _context5.n = 6;
                          break;
                        }
                        if (subC["ceterms:precedes"]) delete subC["ceterms:precedes"];
                        if (subC["ceterms:precededBy"]) delete subC["ceterms:precededBy"];
                        _context5.n = 6;
                        return _this3.saveObject(subC);
                      case 6:
                        // Add this child node to the structure
                        childIndex = structure[parentIndex].children.length;
                        structure[parentIndex].children.push({
                          "obj": subC,
                          "children": []
                        });

                        // Recurse to handle any children of this node
                        if (!subC["skos:narrower"]) {
                          _context5.n = 7;
                          break;
                        }
                        _context5.n = 7;
                        return _this3.addChildren(structure[parentIndex].children, subC, childIndex, deletePrecedence);
                      case 7:
                        j++;
                        _context5.n = 3;
                        break;
                      case 8:
                        resolve();
                      case 9:
                        return _context5.a(2);
                    }
                  }, _callee5);
                }));
                return function (_x7) {
                  return _ref2.apply(this, arguments);
                };
              }()));
          }
        }, _callee6);
      }));
      function addChildren(_x3, _x4, _x5, _x6) {
        return _addChildren.apply(this, arguments);
      }
      return addChildren;
    }(),
    reorder: function () {
      var _reorder = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee8(unorderedStructure, property) {
        var _this4 = this;
        return Object(regenerator["a" /* default */])().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              return _context8.a(2, new Promise(/*#__PURE__*/function () {
                var _ref3 = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee7(resolve) {
                  var changesMade, numChangesMade, i, next, c, c2;
                  return Object(regenerator["a" /* default */])().w(function (_context7) {
                    while (1) switch (_context7.n) {
                      case 0:
                        changesMade = true;
                        numChangesMade = 0; // Prevents endless loop when model properties are inconsistent
                        if (!(unorderedStructure == null)) {
                          _context7.n = 1;
                          break;
                        }
                        return _context7.a(2);
                      case 1:
                        if (!(unorderedStructure !== null && unorderedStructure.length)) {
                          _context7.n = 11;
                          break;
                        }
                      case 2:
                        if (!(changesMade && numChangesMade < 100)) {
                          _context7.n = 11;
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
                      case 3:
                        if (!next) {
                          _context7.n = 10;
                          break;
                        }
                        c = unorderedStructure[i].obj;
                        if (!c) {
                          _context7.n = 9;
                          break;
                        }
                        if (!unorderedStructure[i].children) {
                          _context7.n = 5;
                          break;
                        }
                        _context7.n = 4;
                        return _this4.reorderChildren(unorderedStructure, unorderedStructure[i].children, property);
                      case 4:
                        if (!_context7.v) {
                          _context7.n = 5;
                          break;
                        }
                        numChangesMade++;
                        changesMade = true;
                      case 5:
                        if (!c[property]) {
                          _context7.n = 8;
                          break;
                        }
                        _context7.n = 6;
                        return EcConcept.get(c[property]);
                      case 6:
                        c2 = _context7.v;
                        _context7.n = 7;
                        return _this4.setProrgressionOrder(unorderedStructure, c, c2, property);
                      case 7:
                        if (!_context7.v) {
                          _context7.n = 8;
                          break;
                        }
                        numChangesMade++;
                        changesMade = true;
                      case 8:
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
                      case 9:
                        _context7.n = 3;
                        break;
                      case 10:
                        _context7.n = 2;
                        break;
                      case 11:
                        resolve();
                      case 12:
                        return _context7.a(2);
                    }
                  }, _callee7);
                }));
                return function (_x0) {
                  return _ref3.apply(this, arguments);
                };
              }()));
          }
        }, _callee8);
      }));
      function reorder(_x8, _x9) {
        return _reorder.apply(this, arguments);
      }
      return reorder;
    }(),
    reorderChildren: function () {
      var _reorderChildren = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee0(unorderedStructure, children, property) {
        var _this5 = this;
        return Object(regenerator["a" /* default */])().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              return _context0.a(2, new Promise(/*#__PURE__*/function () {
                var _ref4 = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee9(resolve) {
                  var changesMade, childChangesMade, numChildChangesMade, j, next, subC1, subC2;
                  return Object(regenerator["a" /* default */])().w(function (_context9) {
                    while (1) switch (_context9.n) {
                      case 0:
                        changesMade = false;
                        childChangesMade = true;
                        numChildChangesMade = 0; // Prevents endless loop when model properties are inconsistent
                      case 1:
                        if (!(childChangesMade && numChildChangesMade < 100)) {
                          _context9.n = 9;
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
                      case 2:
                        if (!next) {
                          _context9.n = 8;
                          break;
                        }
                        subC1 = children[j].obj;
                        if (!subC1) {
                          _context9.n = 7;
                          break;
                        }
                        if (!subC1["skos:narrower"]) {
                          _context9.n = 4;
                          break;
                        }
                        _context9.n = 3;
                        return _this5.reorderChildren(unorderedStructure, children[j].children, property);
                      case 3:
                        if (!_context9.v) {
                          _context9.n = 4;
                          break;
                        }
                        changesMade = true;
                        numChildChangesMade++;
                        childChangesMade = true;
                      case 4:
                        if (!subC1[property]) {
                          _context9.n = 7;
                          break;
                        }
                        _context9.n = 5;
                        return EcConcept.get(subC1[property]);
                      case 5:
                        subC2 = _context9.v;
                        _context9.n = 6;
                        return _this5.setProrgressionOrder(unorderedStructure, subC1, subC2, property);
                      case 6:
                        if (!_context9.v) {
                          _context9.n = 7;
                          break;
                        }
                        changesMade = true;
                        numChildChangesMade++;
                        childChangesMade = true;
                      case 7:
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
                        _context9.n = 2;
                        break;
                      case 8:
                        _context9.n = 1;
                        break;
                      case 9:
                        resolve(changesMade);
                      case 10:
                        return _context9.a(2);
                    }
                  }, _callee9);
                }));
                return function (_x12) {
                  return _ref4.apply(this, arguments);
                };
              }()));
          }
        }, _callee0);
      }));
      function reorderChildren(_x1, _x10, _x11) {
        return _reorderChildren.apply(this, arguments);
      }
      return reorderChildren;
    }(),
    setProrgressionOrder: function () {
      var _setProrgressionOrder = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee1(structure, node1, node2, property) {
        var sibling, parentStructure, node1Index, node2Index, _parentStructure, _node1Index, _node2Index, nodeParent;
        return Object(regenerator["a" /* default */])().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              _context1.n = 1;
              return this.findSiblingOfNode(node1, node2);
            case 1:
              sibling = _context1.v;
              if (!(sibling !== null)) {
                _context1.n = 12;
                break;
              }
              _context1.n = 2;
              return this.findSubStructure(structure, node1);
            case 2:
              parentStructure = _context1.v;
              if (parentStructure) {
                _context1.n = 3;
                break;
              }
              // This condition should never be reached.
              appLog('Error: No parent structure found');
              return _context1.a(2, false);
            case 3:
              _context1.n = 4;
              return parentStructure.findIndex(function (item) {
                return EcRemoteLinkedData.trimVersionFromUrl(item.obj ? item.obj.id : item.id) === EcRemoteLinkedData.trimVersionFromUrl(node1.id);
              });
            case 4:
              node1Index = _context1.v;
              _context1.n = 5;
              return parentStructure.findIndex(function (item) {
                return EcRemoteLinkedData.trimVersionFromUrl(item.obj ? item.obj.id : item.id) === EcRemoteLinkedData.trimVersionFromUrl(sibling.id);
              });
            case 5:
              node2Index = _context1.v;
              node2 = {
                "obj": parentStructure[node2Index].obj,
                "children": parentStructure[node2Index].children
              };
              if (!(property === "ceterms:precedes")) {
                _context1.n = 8;
                break;
              }
              if (!(node1Index + 1 === node2Index)) {
                _context1.n = 6;
                break;
              }
              return _context1.a(2, false);
            case 6:
              parentStructure.splice(node2Index, 1);
              _context1.n = 7;
              return parentStructure.findIndex(function (item) {
                return EcRemoteLinkedData.trimVersionFromUrl(item.obj ? item.obj.id : item.id) === EcRemoteLinkedData.trimVersionFromUrl(node1.id);
              });
            case 7:
              node1Index = _context1.v;
              parentStructure.splice(node1Index + 1, 0, node2);
              _context1.n = 11;
              break;
            case 8:
              if (!(node2Index + 1 === node1Index)) {
                _context1.n = 9;
                break;
              }
              return _context1.a(2, false);
            case 9:
              parentStructure.splice(node2Index, 1);
              _context1.n = 10;
              return parentStructure.findIndex(function (item) {
                return EcRemoteLinkedData.trimVersionFromUrl(item.obj ? item.obj.id : item.id) === EcRemoteLinkedData.trimVersionFromUrl(node1.id);
              });
            case 10:
              node1Index = _context1.v;
              parentStructure.splice(node1Index, 0, node2);
            case 11:
              return _context1.a(2, true);
            case 12:
              _context1.n = 13;
              return this.findSiblingOfNode(node2, node1);
            case 13:
              sibling = _context1.v;
              if (!(sibling !== null)) {
                _context1.n = 25;
                break;
              }
              _context1.n = 14;
              return this.findSubStructure(structure, node2);
            case 14:
              _parentStructure = _context1.v;
              if (_parentStructure) {
                _context1.n = 15;
                break;
              }
              // This condition should never be reached.
              appLog('Error: No parent structure found');
              return _context1.a(2, false);
            case 15:
              _context1.n = 16;
              return _parentStructure.findIndex(function (item) {
                return EcRemoteLinkedData.trimVersionFromUrl(item.obj ? item.obj.id : item.id) === EcRemoteLinkedData.trimVersionFromUrl(sibling.id);
              });
            case 16:
              _node1Index = _context1.v;
              _context1.n = 17;
              return _parentStructure.findIndex(function (item) {
                return EcRemoteLinkedData.trimVersionFromUrl(item.obj ? item.obj.id : item.id) === EcRemoteLinkedData.trimVersionFromUrl(node2.id);
              });
            case 17:
              _node2Index = _context1.v;
              if (!(_node1Index < 0 || _node1Index >= _parentStructure.length || _node2Index < 0 || _node2Index >= _parentStructure.length)) {
                _context1.n = 18;
                break;
              }
              appLog('Node index not found');
              return _context1.a(2, false);
            case 18:
              node2 = {
                "obj": _parentStructure[_node2Index].obj,
                "children": _parentStructure[_node2Index].children
              };
              if (!(property === "ceterms:precedes")) {
                _context1.n = 21;
                break;
              }
              if (!(_node1Index + 1 === _node2Index)) {
                _context1.n = 19;
                break;
              }
              return _context1.a(2, false);
            case 19:
              _parentStructure.splice(_node2Index, 1);
              _context1.n = 20;
              return _parentStructure.findIndex(function (item) {
                return EcRemoteLinkedData.trimVersionFromUrl(item.obj ? item.obj.id : item.id) === EcRemoteLinkedData.trimVersionFromUrl(sibling.id);
              });
            case 20:
              _node1Index = _context1.v;
              _parentStructure.splice(_node1Index + 1, 0, node2);
              _context1.n = 24;
              break;
            case 21:
              if (!(_node2Index + 1 === _node1Index)) {
                _context1.n = 22;
                break;
              }
              return _context1.a(2, false);
            case 22:
              _parentStructure.splice(_node2Index, 1);
              _context1.n = 23;
              return _parentStructure.findIndex(function (item) {
                return EcRemoteLinkedData.trimVersionFromUrl(item.obj ? item.obj.id : item.id) === EcRemoteLinkedData.trimVersionFromUrl(sibling.id);
              });
            case 23:
              _node1Index = _context1.v;
              _parentStructure.splice(_node1Index, 0, node2);
            case 24:
              return _context1.a(2, true);
            case 25:
              if (!node1["skos:broader"]) {
                _context1.n = 27;
                break;
              }
              _context1.n = 26;
              return EcConcept.get(EcRemoteLinkedData.trimVersionFromUrl(node1["skos:broader"]).toString());
            case 26:
              nodeParent = _context1.v;
              return _context1.a(2, this.setProrgressionOrder(structure, nodeParent, node2, property));
            case 27:
              // This condition should never be reached.
              appLog('Error: No common ancestry found');
              return _context1.a(2, false);
            case 28:
              return _context1.a(2);
          }
        }, _callee1, this);
      }));
      function setProrgressionOrder(_x13, _x14, _x15, _x16) {
        return _setProrgressionOrder.apply(this, arguments);
      }
      return setProrgressionOrder;
    }(),
    findSiblingOfNode: function () {
      var _findSiblingOfNode = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee11(node, nibling) {
        var _this6 = this;
        return Object(regenerator["a" /* default */])().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              return _context11.a(2, new Promise(/*#__PURE__*/function () {
                var _ref5 = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee10(resolve) {
                  var nodeParent, niblingParent, niblingAncestor, _t;
                  return Object(regenerator["a" /* default */])().w(function (_context10) {
                    while (1) switch (_context10.n) {
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
                          _context10.n = 1;
                          break;
                        }
                        // Nibling is a sibling of node
                        resolve(nibling);
                        _context10.n = 6;
                        break;
                      case 1:
                        if (!(!node["skos:broader"] && !nibling["skos:broader"])) {
                          _context10.n = 2;
                          break;
                        }
                        // Nibling and node are at the top of the hierarchy amd are therefore siblings
                        resolve(nibling);
                        _context10.n = 6;
                        break;
                      case 2:
                        if (nibling["skos:broader"]) {
                          _context10.n = 3;
                          break;
                        }
                        // Nibling is at the top of the hierarchy and is therefore higher up than node
                        resolve(null);
                        _context10.n = 6;
                        break;
                      case 3:
                        _context10.n = 4;
                        return EcConcept.get(niblingParent.toString());
                      case 4:
                        niblingAncestor = _context10.v;
                        _t = resolve;
                        _context10.n = 5;
                        return _this6.findSiblingOfNode(node, niblingAncestor);
                      case 5:
                        _t(_context10.v);
                      case 6:
                        return _context10.a(2);
                    }
                  }, _callee10);
                }));
                return function (_x19) {
                  return _ref5.apply(this, arguments);
                };
              }()));
          }
        }, _callee11);
      }));
      function findSiblingOfNode(_x17, _x18) {
        return _findSiblingOfNode.apply(this, arguments);
      }
      return findSiblingOfNode;
    }(),
    findSubStructure: function () {
      var _findSubStructure = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee13(structure, node) {
        var _this7 = this;
        return Object(regenerator["a" /* default */])().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              return _context13.a(2, new Promise(/*#__PURE__*/function () {
                var _ref6 = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee12(resolve) {
                  var parentId, i, subStructure;
                  return Object(regenerator["a" /* default */])().w(function (_context12) {
                    while (1) switch (_context12.n) {
                      case 0:
                        if (node["skos:broader"]) {
                          _context12.n = 1;
                          break;
                        }
                        // Parent node is at the top of the container
                        resolve(structure);
                        return _context12.a(2);
                      case 1:
                        parentId = null;
                        if (node["skos:broader"].length && node["skos:broader"].length > 0) {
                          parentId = node["skos:broader"][0];
                        } else {
                          parentId = node["skos:broader"];
                        }
                        i = 0;
                      case 2:
                        if (!(i < structure.length)) {
                          _context12.n = 6;
                          break;
                        }
                        if (!structure[i].children) {
                          _context12.n = 5;
                          break;
                        }
                        if (!(EcRemoteLinkedData.trimVersionFromUrl(structure[i].obj.id) === parentId)) {
                          _context12.n = 3;
                          break;
                        }
                        resolve(structure[i].children);
                        return _context12.a(2);
                      case 3:
                        _context12.n = 4;
                        return _this7.findSubStructure(structure[i].children, node);
                      case 4:
                        subStructure = _context12.v;
                        if (!subStructure) {
                          _context12.n = 5;
                          break;
                        }
                        resolve(subStructure);
                        return _context12.a(2);
                      case 5:
                        i++;
                        _context12.n = 2;
                        break;
                      case 6:
                        resolve(null);
                      case 7:
                        return _context12.a(2);
                    }
                  }, _callee12);
                }));
                return function (_x22) {
                  return _ref6.apply(this, arguments);
                };
              }()));
          }
        }, _callee13);
      }));
      function findSubStructure(_x20, _x21) {
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
      var _setPrecedes = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee15(container) {
        var _this8 = this;
        return Object(regenerator["a" /* default */])().w(function (_context15) {
          while (1) switch (_context15.n) {
            case 0:
              return _context15.a(2, new Promise(/*#__PURE__*/function () {
                var _ref7 = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee14(resolve) {
                  var i, precedes, _precedes;
                  return Object(regenerator["a" /* default */])().w(function (_context14) {
                    while (1) switch (_context14.n) {
                      case 0:
                        // container received should be an array - each array element containing and array of children and EcConcept obj.
                        if (container === null || container.length <= 0) {
                          resolve(false);
                        }
                        i = 0;
                      case 1:
                        if (!(i < container.length)) {
                          _context14.n = 12;
                          break;
                        }
                        if (!container[i]) {
                          _context14.n = 11;
                          break;
                        }
                        if (!(container[i].children && container[i].children.length > 0)) {
                          _context14.n = 4;
                          break;
                        }
                        if (!container[i].obj["ceterms:precedes"]) {
                          _context14.n = 2;
                          break;
                        }
                        delete container[i].obj["ceterms:precedes"];
                        _context14.n = 2;
                        return _this8.saveObject(container[i].obj);
                      case 2:
                        _context14.n = 3;
                        return _this8.setChildrenPrecedes(container, container[i].children);
                      case 3:
                        _context14.n = 11;
                        break;
                      case 4:
                        if (!(i === container.length - 1)) {
                          _context14.n = 7;
                          break;
                        }
                        _context14.n = 5;
                        return _this8.findPrecedes(container, EcRemoteLinkedData.trimVersionFromUrl(container[i].obj.id));
                      case 5:
                        precedes = _context14.v;
                        container[i].obj["ceterms:precedes"] = EcRemoteLinkedData.trimVersionFromUrl(precedes);
                        _context14.n = 6;
                        return _this8.saveObject(container[i].obj);
                      case 6:
                        _context14.n = 11;
                        break;
                      case 7:
                        if (!(container[i + 1].children && container[i + 1].children.length > 0)) {
                          _context14.n = 10;
                          break;
                        }
                        _context14.n = 8;
                        return _this8.findChildrenPrecedes(container[i + 1].children, container[i].obj.id, true);
                      case 8:
                        _precedes = _context14.v;
                        if (!(_precedes !== null)) {
                          _context14.n = 9;
                          break;
                        }
                        container[i].obj["ceterms:precedes"] = EcRemoteLinkedData.trimVersionFromUrl(_precedes);
                        _context14.n = 9;
                        return _this8.saveObject(container[i].obj);
                      case 9:
                        _context14.n = 11;
                        break;
                      case 10:
                        container[i].obj["ceterms:precedes"] = EcRemoteLinkedData.trimVersionFromUrl(container[i + 1].obj.id);
                        _context14.n = 11;
                        return _this8.saveObject(container[i].obj);
                      case 11:
                        i++;
                        _context14.n = 1;
                        break;
                      case 12:
                        resolve(true);
                      case 13:
                        return _context14.a(2);
                    }
                  }, _callee14);
                }));
                return function (_x24) {
                  return _ref7.apply(this, arguments);
                };
              }()));
          }
        }, _callee15);
      }));
      function setPrecedes(_x23) {
        return _setPrecedes.apply(this, arguments);
      }
      return setPrecedes;
    }(),
    setChildrenPrecedes: function () {
      var _setChildrenPrecedes = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee17(container, subContainer) {
        var _this9 = this;
        return Object(regenerator["a" /* default */])().w(function (_context17) {
          while (1) switch (_context17.n) {
            case 0:
              return _context17.a(2, new Promise(/*#__PURE__*/function () {
                var _ref8 = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee16(resolve) {
                  var j, precedes, _precedes2;
                  return Object(regenerator["a" /* default */])().w(function (_context16) {
                    while (1) switch (_context16.n) {
                      case 0:
                        j = 0;
                      case 1:
                        if (!(j < subContainer.length)) {
                          _context16.n = 12;
                          break;
                        }
                        if (!subContainer[j]) {
                          _context16.n = 11;
                          break;
                        }
                        if (!(subContainer[j].children && subContainer[j].children.length > 0)) {
                          _context16.n = 4;
                          break;
                        }
                        if (!subContainer[j].obj["ceterms:precedes"]) {
                          _context16.n = 2;
                          break;
                        }
                        delete subContainer[j].obj["ceterms:precedes"];
                        _context16.n = 2;
                        return _this9.saveObject(subContainer[j].obj);
                      case 2:
                        _context16.n = 3;
                        return _this9.setChildrenPrecedes(container, subContainer[j].children);
                      case 3:
                        _context16.n = 11;
                        break;
                      case 4:
                        if (!(j === subContainer.length - 1)) {
                          _context16.n = 7;
                          break;
                        }
                        _context16.n = 5;
                        return _this9.findPrecedes(container, EcRemoteLinkedData.trimVersionFromUrl(subContainer[j].obj.id));
                      case 5:
                        precedes = _context16.v;
                        if (!(precedes !== null)) {
                          _context16.n = 6;
                          break;
                        }
                        subContainer[j].obj["ceterms:precedes"] = EcRemoteLinkedData.trimVersionFromUrl(precedes);
                        _context16.n = 6;
                        return _this9.saveObject(subContainer[j].obj);
                      case 6:
                        _context16.n = 11;
                        break;
                      case 7:
                        if (!(subContainer[j + 1].children && subContainer[j + 1].children.length > 0)) {
                          _context16.n = 10;
                          break;
                        }
                        _context16.n = 8;
                        return _this9.findChildrenPrecedes(subContainer[j + 1].children, subContainer[j].obj.id, true);
                      case 8:
                        _precedes2 = _context16.v;
                        if (!(_precedes2 !== null)) {
                          _context16.n = 9;
                          break;
                        }
                        subContainer[j].obj["ceterms:precedes"] = EcRemoteLinkedData.trimVersionFromUrl(_precedes2);
                        _context16.n = 9;
                        return _this9.saveObject(subContainer[j].obj);
                      case 9:
                        _context16.n = 11;
                        break;
                      case 10:
                        subContainer[j].obj["ceterms:precedes"] = EcRemoteLinkedData.trimVersionFromUrl(subContainer[j + 1].obj.id);
                        _context16.n = 11;
                        return _this9.saveObject(subContainer[j].obj);
                      case 11:
                        j++;
                        _context16.n = 1;
                        break;
                      case 12:
                        resolve();
                      case 13:
                        return _context16.a(2);
                    }
                  }, _callee16);
                }));
                return function (_x27) {
                  return _ref8.apply(this, arguments);
                };
              }()));
          }
        }, _callee17);
      }));
      function setChildrenPrecedes(_x25, _x26) {
        return _setChildrenPrecedes.apply(this, arguments);
      }
      return setChildrenPrecedes;
    }(),
    findPrecedes: function () {
      var _findPrecedes = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee19(container, sourceNodeId) {
        var _this0 = this;
        return Object(regenerator["a" /* default */])().w(function (_context19) {
          while (1) switch (_context19.n) {
            case 0:
              return _context19.a(2, new Promise(/*#__PURE__*/function () {
                var _ref9 = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee18(resolve) {
                  var foundSourceNode, i, precedes;
                  return Object(regenerator["a" /* default */])().w(function (_context18) {
                    while (1) switch (_context18.n) {
                      case 0:
                        // container received should be an array - each array element containing and array of children and EcConcept obj.
                        // Assumes sourceNodeId is a leaf node
                        foundSourceNode = false;
                        if (!(container === null)) {
                          _context18.n = 1;
                          break;
                        }
                        return _context18.a(2, null);
                      case 1:
                        i = 0;
                      case 2:
                        if (!(i < container.length)) {
                          _context18.n = 7;
                          break;
                        }
                        if (!(!foundSourceNode && EcRemoteLinkedData.trimVersionFromUrl(container[i].obj.id) === sourceNodeId)) {
                          _context18.n = 3;
                          break;
                        }
                        foundSourceNode = true;
                        _context18.n = 6;
                        break;
                      case 3:
                        if (!(container[i].children && container[i].children.length > 0)) {
                          _context18.n = 5;
                          break;
                        }
                        _context18.n = 4;
                        return _this0.findChildrenPrecedes(container[i].children, sourceNodeId, foundSourceNode);
                      case 4:
                        precedes = _context18.v;
                        if (precedes) {
                          if (precedes === sourceNodeId) {
                            foundSourceNode = true;
                          } else {
                            resolve(precedes);
                          }
                        }
                        _context18.n = 6;
                        break;
                      case 5:
                        if (foundSourceNode) {
                          // Source node has already been found. That means that this is the closeest leaf node
                          resolve(EcRemoteLinkedData.trimVersionFromUrl(container[i].obj.id));
                        }
                      case 6:
                        i++;
                        _context18.n = 2;
                        break;
                      case 7:
                        resolve(null);
                      case 8:
                        return _context18.a(2);
                    }
                  }, _callee18);
                }));
                return function (_x30) {
                  return _ref9.apply(this, arguments);
                };
              }()));
          }
        }, _callee19);
      }));
      function findPrecedes(_x28, _x29) {
        return _findPrecedes.apply(this, arguments);
      }
      return findPrecedes;
    }(),
    findChildrenPrecedes: function () {
      var _findChildrenPrecedes = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee21(subContainer, sourceNodeId, foundSourceNode) {
        var _this1 = this;
        return Object(regenerator["a" /* default */])().w(function (_context21) {
          while (1) switch (_context21.n) {
            case 0:
              return _context21.a(2, new Promise(/*#__PURE__*/function () {
                var _ref0 = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee20(resolve) {
                  var foundChildSourceNode, j, precedes;
                  return Object(regenerator["a" /* default */])().w(function (_context20) {
                    while (1) switch (_context20.n) {
                      case 0:
                        // subContainer received should be an array - each array element containing and array of children and EcConcept obj.
                        foundChildSourceNode = foundSourceNode;
                        if (!(subContainer === null)) {
                          _context20.n = 1;
                          break;
                        }
                        return _context20.a(2, null);
                      case 1:
                        j = 0;
                      case 2:
                        if (!(j < subContainer.length)) {
                          _context20.n = 7;
                          break;
                        }
                        if (!(!foundChildSourceNode && EcRemoteLinkedData.trimVersionFromUrl(subContainer[j].obj.id) === sourceNodeId)) {
                          _context20.n = 3;
                          break;
                        }
                        foundChildSourceNode = true;
                        _context20.n = 6;
                        break;
                      case 3:
                        if (!(subContainer[j].children && subContainer[j].children.length > 0)) {
                          _context20.n = 5;
                          break;
                        }
                        _context20.n = 4;
                        return _this1.findChildrenPrecedes(subContainer[j].children, sourceNodeId, foundSourceNode);
                      case 4:
                        precedes = _context20.v;
                        if (precedes) {
                          if (precedes === sourceNodeId) {
                            foundChildSourceNode = true;
                          } else {
                            resolve(precedes);
                          }
                        }
                        _context20.n = 6;
                        break;
                      case 5:
                        if (foundChildSourceNode) {
                          // Source node has already been found. That means that this is the closeest leaf node
                          resolve(EcRemoteLinkedData.trimVersionFromUrl(subContainer[j].obj.id));
                        }
                      case 6:
                        j++;
                        _context20.n = 2;
                        break;
                      case 7:
                        if (foundChildSourceNode) {
                          resolve(sourceNodeId);
                        } else {
                          resolve(null);
                        }
                      case 8:
                        return _context20.a(2);
                    }
                  }, _callee20);
                }));
                return function (_x34) {
                  return _ref0.apply(this, arguments);
                };
              }()));
          }
        }, _callee21);
      }));
      function findChildrenPrecedes(_x31, _x32, _x33) {
        return _findChildrenPrecedes.apply(this, arguments);
      }
      return findChildrenPrecedes;
    }(),
    setPrecededBy: function () {
      var _setPrecededBy = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee23(container) {
        var _this10 = this;
        return Object(regenerator["a" /* default */])().w(function (_context23) {
          while (1) switch (_context23.n) {
            case 0:
              return _context23.a(2, new Promise(/*#__PURE__*/function () {
                var _ref1 = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee22(resolve) {
                  var i, precededBy, _precededBy;
                  return Object(regenerator["a" /* default */])().w(function (_context22) {
                    while (1) switch (_context22.n) {
                      case 0:
                        // container received should be an array - each array element containing and array of children and EcConcept obj.
                        if (container === null || container.length <= 0) {
                          resolve(false);
                        }
                        i = container.length - 1;
                      case 1:
                        if (!(i >= 0)) {
                          _context22.n = 12;
                          break;
                        }
                        if (!container[i]) {
                          _context22.n = 11;
                          break;
                        }
                        if (!(container[i].children && container[i].children.length > 0)) {
                          _context22.n = 4;
                          break;
                        }
                        if (!container[i].obj["ceterms:precededBy"]) {
                          _context22.n = 2;
                          break;
                        }
                        delete container[i].obj["ceterms:precededBy"];
                        _context22.n = 2;
                        return _this10.saveObject(container[i].obj);
                      case 2:
                        _context22.n = 3;
                        return _this10.setChildrenPrecededBy(container, container[i].children, i);
                      case 3:
                        _context22.n = 11;
                        break;
                      case 4:
                        if (!(i === 0)) {
                          _context22.n = 7;
                          break;
                        }
                        _context22.n = 5;
                        return _this10.findPrecededBy(container, EcRemoteLinkedData.trimVersionFromUrl(container[i].obj.id));
                      case 5:
                        precededBy = _context22.v;
                        if (!(precededBy !== null)) {
                          _context22.n = 6;
                          break;
                        }
                        container[i].obj["ceterms:precededBy"] = EcRemoteLinkedData.trimVersionFromUrl(precededBy);
                        _context22.n = 6;
                        return _this10.saveObject(container[i].obj);
                      case 6:
                        _context22.n = 11;
                        break;
                      case 7:
                        if (!(container[i - 1].children && container[i - 1].children.length > 0)) {
                          _context22.n = 10;
                          break;
                        }
                        _context22.n = 8;
                        return _this10.findChildrenPrecededBy(container[i - 1].children, container[i].obj.id, true);
                      case 8:
                        _precededBy = _context22.v;
                        if (!(_precededBy !== null)) {
                          _context22.n = 9;
                          break;
                        }
                        container[i].obj["ceterms:precededBy"] = EcRemoteLinkedData.trimVersionFromUrl(_precededBy);
                        _context22.n = 9;
                        return _this10.saveObject(container[i].obj);
                      case 9:
                        _context22.n = 11;
                        break;
                      case 10:
                        container[i].obj["ceterms:precededBy"] = EcRemoteLinkedData.trimVersionFromUrl(container[i - 1].obj.id);
                        _context22.n = 11;
                        return _this10.saveObject(container[i].obj);
                      case 11:
                        i--;
                        _context22.n = 1;
                        break;
                      case 12:
                        resolve(true);
                      case 13:
                        return _context22.a(2);
                    }
                  }, _callee22);
                }));
                return function (_x36) {
                  return _ref1.apply(this, arguments);
                };
              }()));
          }
        }, _callee23);
      }));
      function setPrecededBy(_x35) {
        return _setPrecededBy.apply(this, arguments);
      }
      return setPrecededBy;
    }(),
    setChildrenPrecededBy: function () {
      var _setChildrenPrecededBy = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee25(container, subContainer) {
        var _this11 = this;
        return Object(regenerator["a" /* default */])().w(function (_context25) {
          while (1) switch (_context25.n) {
            case 0:
              return _context25.a(2, new Promise(/*#__PURE__*/function () {
                var _ref10 = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee24(resolve) {
                  var j, precededBy, _precededBy2;
                  return Object(regenerator["a" /* default */])().w(function (_context24) {
                    while (1) switch (_context24.n) {
                      case 0:
                        j = subContainer.length - 1;
                      case 1:
                        if (!(j >= 0)) {
                          _context24.n = 12;
                          break;
                        }
                        if (!subContainer[j]) {
                          _context24.n = 11;
                          break;
                        }
                        if (!(subContainer[j].children && subContainer[j].children.length > 0)) {
                          _context24.n = 4;
                          break;
                        }
                        if (!subContainer[j].obj["ceterms:precededBy"]) {
                          _context24.n = 2;
                          break;
                        }
                        delete subContainer[j].obj["ceterms:precededBy"];
                        _context24.n = 2;
                        return _this11.saveObject(subContainer[j].obj);
                      case 2:
                        _context24.n = 3;
                        return _this11.setChildrenPrecededBy(container, subContainer[j].children);
                      case 3:
                        _context24.n = 11;
                        break;
                      case 4:
                        if (!(j === 0)) {
                          _context24.n = 7;
                          break;
                        }
                        _context24.n = 5;
                        return _this11.findPrecededBy(container, EcRemoteLinkedData.trimVersionFromUrl(subContainer[j].obj.id));
                      case 5:
                        precededBy = _context24.v;
                        if (!(precededBy !== null)) {
                          _context24.n = 6;
                          break;
                        }
                        subContainer[j].obj["ceterms:precededBy"] = EcRemoteLinkedData.trimVersionFromUrl(precededBy);
                        _context24.n = 6;
                        return _this11.saveObject(subContainer[j].obj);
                      case 6:
                        _context24.n = 11;
                        break;
                      case 7:
                        if (!(subContainer[j - 1].children && subContainer[j - 1].children.length > 0)) {
                          _context24.n = 10;
                          break;
                        }
                        _context24.n = 8;
                        return _this11.findChildrenPrecededBy(subContainer[j - 1].children, subContainer[j].obj.id, true);
                      case 8:
                        _precededBy2 = _context24.v;
                        if (!(_precededBy2 !== null)) {
                          _context24.n = 9;
                          break;
                        }
                        subContainer[j].obj["ceterms:precededBy"] = EcRemoteLinkedData.trimVersionFromUrl(_precededBy2);
                        _context24.n = 9;
                        return _this11.saveObject(subContainer[j].obj);
                      case 9:
                        _context24.n = 11;
                        break;
                      case 10:
                        subContainer[j].obj["ceterms:precededBy"] = EcRemoteLinkedData.trimVersionFromUrl(subContainer[j - 1].obj.id);
                        _context24.n = 11;
                        return _this11.saveObject(subContainer[j].obj);
                      case 11:
                        j--;
                        _context24.n = 1;
                        break;
                      case 12:
                        resolve();
                      case 13:
                        return _context24.a(2);
                    }
                  }, _callee24);
                }));
                return function (_x39) {
                  return _ref10.apply(this, arguments);
                };
              }()));
          }
        }, _callee25);
      }));
      function setChildrenPrecededBy(_x37, _x38) {
        return _setChildrenPrecededBy.apply(this, arguments);
      }
      return setChildrenPrecededBy;
    }(),
    findPrecededBy: function () {
      var _findPrecededBy = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee27(container, sourceNodeId) {
        var _this12 = this;
        return Object(regenerator["a" /* default */])().w(function (_context27) {
          while (1) switch (_context27.n) {
            case 0:
              return _context27.a(2, new Promise(/*#__PURE__*/function () {
                var _ref11 = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee26(resolve) {
                  var foundSourceNode, i, precededBy;
                  return Object(regenerator["a" /* default */])().w(function (_context26) {
                    while (1) switch (_context26.n) {
                      case 0:
                        // container received should be an array - each array element containing and array of children and EcConcept obj.
                        // Assumes sourceNodeId is a leaf node
                        foundSourceNode = false;
                        if (!(container === null)) {
                          _context26.n = 1;
                          break;
                        }
                        return _context26.a(2, null);
                      case 1:
                        i = container.length - 1;
                      case 2:
                        if (!(i >= 0)) {
                          _context26.n = 7;
                          break;
                        }
                        if (!(!foundSourceNode && EcRemoteLinkedData.trimVersionFromUrl(container[i].obj.id) === sourceNodeId)) {
                          _context26.n = 3;
                          break;
                        }
                        foundSourceNode = true;
                        _context26.n = 6;
                        break;
                      case 3:
                        if (!(container[i].children && container[i].children.length > 0)) {
                          _context26.n = 5;
                          break;
                        }
                        _context26.n = 4;
                        return _this12.findChildrenPrecededBy(container[i].children, sourceNodeId, foundSourceNode);
                      case 4:
                        precededBy = _context26.v;
                        if (precededBy) {
                          if (precededBy === sourceNodeId) {
                            foundSourceNode = true;
                          } else {
                            resolve(precededBy);
                          }
                        }
                        _context26.n = 6;
                        break;
                      case 5:
                        if (foundSourceNode) {
                          // Source node has already been found. That means that this is the closeest leaf node
                          resolve(EcRemoteLinkedData.trimVersionFromUrl(container[i].obj.id));
                        }
                      case 6:
                        i--;
                        _context26.n = 2;
                        break;
                      case 7:
                        resolve(null);
                      case 8:
                        return _context26.a(2);
                    }
                  }, _callee26);
                }));
                return function (_x42) {
                  return _ref11.apply(this, arguments);
                };
              }()));
          }
        }, _callee27);
      }));
      function findPrecededBy(_x40, _x41) {
        return _findPrecededBy.apply(this, arguments);
      }
      return findPrecededBy;
    }(),
    findChildrenPrecededBy: function () {
      var _findChildrenPrecededBy = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee29(subContainer, sourceNodeId, foundSourceNode) {
        var _this13 = this;
        return Object(regenerator["a" /* default */])().w(function (_context29) {
          while (1) switch (_context29.n) {
            case 0:
              return _context29.a(2, new Promise(/*#__PURE__*/function () {
                var _ref12 = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee28(resolve) {
                  var foundChildSourceNode, j, precededBy;
                  return Object(regenerator["a" /* default */])().w(function (_context28) {
                    while (1) switch (_context28.n) {
                      case 0:
                        // subContainer received should be an array - each array element containing and array of children and EcConcept obj.
                        foundChildSourceNode = foundSourceNode;
                        if (!(subContainer === null)) {
                          _context28.n = 1;
                          break;
                        }
                        return _context28.a(2, null);
                      case 1:
                        j = subContainer.length - 1;
                      case 2:
                        if (!(j >= 0)) {
                          _context28.n = 7;
                          break;
                        }
                        if (!(!foundChildSourceNode && EcRemoteLinkedData.trimVersionFromUrl(subContainer[j].obj.id) === sourceNodeId)) {
                          _context28.n = 3;
                          break;
                        }
                        foundChildSourceNode = true;
                        _context28.n = 6;
                        break;
                      case 3:
                        if (!(subContainer[j].children && subContainer[j].children.length > 0)) {
                          _context28.n = 5;
                          break;
                        }
                        _context28.n = 4;
                        return _this13.findChildrenPrecededBy(subContainer[j].children, sourceNodeId, foundSourceNode);
                      case 4:
                        precededBy = _context28.v;
                        if (precededBy) {
                          if (precededBy === sourceNodeId) {
                            foundChildSourceNode = true;
                          } else {
                            resolve(precededBy);
                          }
                        }
                        _context28.n = 6;
                        break;
                      case 5:
                        if (foundChildSourceNode) {
                          // Source node has already been found. That means that this is the closeest leaf node
                          resolve(EcRemoteLinkedData.trimVersionFromUrl(subContainer[j].obj.id));
                        }
                      case 6:
                        j--;
                        _context28.n = 2;
                        break;
                      case 7:
                        if (foundChildSourceNode) {
                          resolve(sourceNodeId);
                        } else {
                          resolve(null);
                        }
                      case 8:
                        return _context28.a(2);
                    }
                  }, _callee28);
                }));
                return function (_x46) {
                  return _ref12.apply(this, arguments);
                };
              }()));
          }
        }, _callee29);
      }));
      function findChildrenPrecededBy(_x43, _x44, _x45) {
        return _findChildrenPrecededBy.apply(this, arguments);
      }
      return findChildrenPrecededBy;
    }(),
    saveObject: function () {
      var _saveObject = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee31(obj) {
        var _this14 = this;
        return Object(regenerator["a" /* default */])().w(function (_context31) {
          while (1) switch (_context31.n) {
            case 0:
              return _context31.a(2, new Promise(/*#__PURE__*/function () {
                var _ref13 = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee30(resolve) {
                  return Object(regenerator["a" /* default */])().w(function (_context30) {
                    while (1) switch (_context30.n) {
                      case 0:
                        _this14.repo.saveTo(obj, function () {
                          resolve();
                        }, appError);
                      case 1:
                        return _context30.a(2);
                    }
                  }, _callee30);
                }));
                return function (_x48) {
                  return _ref13.apply(this, arguments);
                };
              }()));
          }
        }, _callee31);
      }));
      function saveObject(_x47) {
        return _saveObject.apply(this, arguments);
      }
      return saveObject;
    }(),
    move: function () {
      var _move = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee32(fromId, toId, fromContainerId, toContainerId, removeOldRelations, toLast) {
        var me, movingConcept, fromContainer, toContainer, isFromConceptScheme, isToConceptScheme, fromProperty, fromInverseProperty, toProperty, toInverseProperty, fromPropInitialValue, toPropInitialValue, conceptFromInverseInitialValue, conceptToInverseInitialValue, objectsToSave, fromIndex, toIndex, i, _t2, _t3, _t4;
        return Object(regenerator["a" /* default */])().w(function (_context32) {
          while (1) switch (_context32.p = _context32.n) {
            case 0:
              this.once = true;
              me = this; // Debug logging to track the move operation
              appLog("Moving progression level", {
                fromId: fromId,
                toId: toId,
                fromContainerId: fromContainerId,
                toContainerId: toContainerId,
                removeOldRelations: removeOldRelations,
                toLast: toLast
              });

              // Get the concept being moved
              _context32.n = 1;
              return EcConcept.get(fromId);
            case 1:
              movingConcept = _context32.v;
              if (movingConcept) {
                _context32.n = 2;
                break;
              }
              appError("Cannot find progression level to move: " + fromId);
              return _context32.a(2);
            case 2:
              if (!fromContainerId) {
                _context32.n = 4;
                break;
              }
              _context32.n = 3;
              return EcRepository.get(fromContainerId);
            case 3:
              _t2 = _context32.v;
              _context32.n = 5;
              break;
            case 4:
              _t2 = this.container;
            case 5:
              fromContainer = _t2;
              if (!toContainerId) {
                _context32.n = 7;
                break;
              }
              _context32.n = 6;
              return EcRepository.get(toContainerId);
            case 6:
              _t3 = _context32.v;
              _context32.n = 8;
              break;
            case 7:
              _t3 = this.container;
            case 8:
              toContainer = _t3;
              isFromConceptScheme = fromContainer.type === "ConceptScheme";
              isToConceptScheme = toContainer.type === "ConceptScheme"; // Use the actual concept scheme if needed
              if (isFromConceptScheme) {
                fromContainer = this.container;
              }
              if (isToConceptScheme) {
                toContainer = this.container;
              }

              // Determine property names based on container types
              fromProperty = isFromConceptScheme ? "skos:hasTopConcept" : "skos:narrower";
              fromInverseProperty = isFromConceptScheme ? "skos:topConceptOf" : "skos:broader";
              toProperty = isToConceptScheme ? "skos:hasTopConcept" : "skos:narrower";
              toInverseProperty = isToConceptScheme ? "skos:topConceptOf" : "skos:broader"; // Store initial values for undo
              fromPropInitialValue = fromContainer[fromProperty] ? fromContainer[fromProperty].slice() : null;
              toPropInitialValue = toContainer[toProperty] ? toContainer[toProperty].slice() : null;
              conceptFromInverseInitialValue = null;
              conceptToInverseInitialValue = null;
              if (movingConcept[fromInverseProperty]) {
                conceptFromInverseInitialValue = Array.isArray(movingConcept[fromInverseProperty]) ? movingConcept[fromInverseProperty].slice() : movingConcept[fromInverseProperty];
              }
              if (movingConcept[toInverseProperty]) {
                conceptToInverseInitialValue = Array.isArray(movingConcept[toInverseProperty]) ? movingConcept[toInverseProperty].slice() : movingConcept[toInverseProperty];
              }

              // Create objects to track for saving
              objectsToSave = [movingConcept]; // Remove from old container if needed
              if (removeOldRelations) {
                fromIndex = fromContainer[fromProperty].indexOf(fromId);
                if (fromIndex !== -1) {
                  fromContainer[fromProperty].splice(fromIndex, 1);

                  // Add to objects to save if changed
                  if (!objectsToSave.includes(fromContainer)) {
                    objectsToSave.push(fromContainer);
                  }
                }

                // Update inverse relationship in the concept
                if (isFromConceptScheme) {
                  // If it was a top concept, remove the topConceptOf relationship
                  delete movingConcept[fromInverseProperty];
                } else {
                  // Otherwise handle the broader relationship
                  if (Array.isArray(movingConcept[fromInverseProperty])) {
                    // Remove the specific broader reference
                    EcArray.setRemove(movingConcept[fromInverseProperty], fromContainerId);

                    // If no broader concepts remain and we're moving to the concept scheme,
                    // check if it should be a root-level concept
                    if (movingConcept[fromInverseProperty].length === 0 && isToConceptScheme) {
                      delete movingConcept[fromInverseProperty];
                    }
                  } else if (movingConcept[fromInverseProperty] === fromContainerId) {
                    // If it's a direct reference, remove it
                    delete movingConcept[fromInverseProperty];
                  }
                }
              }

              // When moving to the concept scheme, we need to handle root-level duplication
              if (isToConceptScheme) {
                // If it's already a top concept, don't add it again
                if (toContainer[toProperty] && toContainer[toProperty].includes(fromId)) {
                  // Concept is already at root level, no need to add again
                  appLog("Progression level is already a top concept, not adding again");
                } else {
                  // Add to concept scheme
                  if (!toContainer[toProperty]) {
                    toContainer[toProperty] = [];
                  }
                  if (toId === null || toId === undefined || toLast) {
                    toContainer[toProperty].push(fromId);
                  } else {
                    toIndex = toContainer[toProperty].indexOf(toId);
                    if (toIndex !== -1) {
                      toContainer[toProperty].splice(toIndex, 0, fromId);
                    } else {
                      toContainer[toProperty].push(fromId);
                    }
                  }

                  // Set topConceptOf relationship
                  movingConcept[toInverseProperty] = toContainerId;

                  // Add to objects to save
                  if (!objectsToSave.includes(toContainer)) {
                    objectsToSave.push(toContainer);
                  }
                }
              } else {
                // Moving to another concept
                if (!toContainer[toProperty]) {
                  toContainer[toProperty] = [];
                }

                // Add to the narrower property of the target container
                if (toId === null || toId === undefined || toLast) {
                  if (!toContainer[toProperty].includes(fromId)) {
                    toContainer[toProperty].push(fromId);
                  }
                } else {
                  toIndex = toContainer[toProperty].indexOf(toId);
                  if (toIndex !== -1) {
                    toContainer[toProperty].splice(toIndex, 0, fromId);
                  } else {
                    toContainer[toProperty].push(fromId);
                  }
                }

                // Update broader relationship in the concept
                if (!movingConcept[toInverseProperty]) {
                  movingConcept[toInverseProperty] = [];
                } else if (!Array.isArray(movingConcept[toInverseProperty])) {
                  movingConcept[toInverseProperty] = [movingConcept[toInverseProperty]];
                }
                if (toContainerId && !movingConcept[toInverseProperty].includes(toContainerId)) {
                  movingConcept[toInverseProperty].push(toContainerId);
                }

                // Add to objects to save
                if (!objectsToSave.includes(toContainer)) {
                  objectsToSave.push(toContainer);
                }
              }

              // Update modification timestamps and prepare for saving
              i = 0;
            case 9:
              if (!(i < objectsToSave.length)) {
                _context32.n = 12;
                break;
              }
              objectsToSave[i]["schema:dateModified"] = new Date().toISOString();

              // Handle encryption if needed
              if (!(me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[objectsToSave[i].id] !== true)) {
                _context32.n = 11;
                break;
              }
              _context32.n = 10;
              return EcEncryptedValue.toEncryptedValue(objectsToSave[i]);
            case 10:
              objectsToSave[i] = _context32.v;
            case 11:
              i++;
              _context32.n = 9;
              break;
            case 12:
              // Track changes for undo
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
                id: movingConcept.shortId(),
                fieldChanged: [fromInverseProperty, toInverseProperty],
                initialValue: [conceptFromInverseInitialValue, conceptToInverseInitialValue]
              }]);

              // Save all objects
              _context32.p = 13;
              _context32.n = 14;
              return me.repo.multiput(objectsToSave, function () {
                appLog("Move complete", {
                  concept: movingConcept.shortId(),
                  objectsSaved: objectsToSave.map(function (o) {
                    return o.shortId();
                  })
                });
                me.computeHierarchy(false);
              }, appError);
            case 14:
              _context32.n = 16;
              break;
            case 15:
              _context32.p = 15;
              _t4 = _context32.v;
              appError("Error saving changes:", _t4);
            case 16:
              this.dragging = false;
            case 17:
              return _context32.a(2);
          }
        }, _callee32, this, [[13, 15]]);
      }));
      function move(_x49, _x50, _x51, _x52, _x53, _x54) {
        return _move.apply(this, arguments);
      }
      return move;
    }(),
    add: function () {
      var _add = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee33(containerId, previousSibling) {
        var me, c, j, owner, reader, initialValue, index, parent, _t5, _t6;
        return Object(regenerator["a" /* default */])().w(function (_context33) {
          while (1) switch (_context33.p = _context33.n) {
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
                _context33.n = 7;
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
                _context33.n = 3;
                break;
              }
              _context33.n = 1;
              return EcEncryptedValue.toEncryptedValue(c);
            case 1:
              c = _context33.v;
              if (!(EcEncryptedValue.encryptOnSaveMap[me.container.id] !== true)) {
                _context33.n = 3;
                break;
              }
              _context33.n = 2;
              return EcEncryptedValue.toEncryptedValue(me.container);
            case 2:
              me.container = _context33.v;
            case 3:
              _context33.p = 3;
              _context33.n = 4;
              return this.repo.multiput([c, me.container]);
            case 4:
              me.once = true;
              _context33.n = 6;
              break;
            case 5:
              _context33.p = 5;
              _t5 = _context33.v;
              appError(_t5);
            case 6:
              _context33.n = 16;
              break;
            case 7:
              c["skos:broader"] = [containerId];
              _context33.n = 8;
              return EcConcept.get(containerId);
            case 8:
              parent = _context33.v;
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
                _context33.n = 13;
                break;
              }
              _context33.n = 9;
              return EcEncryptedValue.toEncryptedValue(c);
            case 9:
              c = _context33.v;
              if (!(EcEncryptedValue.encryptOnSaveMap[parent.id] !== true)) {
                _context33.n = 11;
                break;
              }
              _context33.n = 10;
              return EcEncryptedValue.toEncryptedValue(parent);
            case 10:
              parent = _context33.v;
            case 11:
              if (!(EcEncryptedValue.encryptOnSaveMap[me.container.id] !== true)) {
                _context33.n = 13;
                break;
              }
              _context33.n = 12;
              return EcEncryptedValue.toEncryptedValue(me.container);
            case 12:
              me.container = _context33.v;
            case 13:
              _context33.p = 13;
              _context33.n = 14;
              return this.repo.multiput([c, parent, me.container]);
            case 14:
              me.once = true;
              _context33.n = 16;
              break;
            case 15:
              _context33.p = 15;
              _t6 = _context33.v;
              appError(_t6);
            case 16:
              this.$store.commit("editor/newCompetency", c.shortId());
              appLog("Added node: ", JSON.parse(c.toJson()));
            case 17:
              return _context33.a(2);
          }
        }, _callee33, this, [[13, 15], [3, 5]]);
      }));
      function add(_x55, _x56) {
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
      var _openFramework = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee34() {
        var f;
        return Object(regenerator["a" /* default */])().w(function (_context34) {
          while (1) switch (_context34.n) {
            case 0:
              _context34.n = 1;
              return EcConceptScheme.get(this.container.shortId());
            case 1:
              f = _context34.v;
              this.$store.commit('editor/framework', f);
              this.$router.push({
                name: "progressionModel",
                params: {
                  frameworkId: this.container.id
                }
              });
            case 2:
              return _context34.a(2);
          }
        }, _callee34, this);
      }));
      function openFramework() {
        return _openFramework.apply(this, arguments);
      }
      return openFramework;
    }(),
    onClickCreateNew: function () {
      var _onClickCreateNew = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee35() {
        var parent, _t7;
        return Object(regenerator["a" /* default */])().w(function (_context35) {
          while (1) switch (_context35.p = _context35.n) {
            case 0:
              parent = this.container.shortId();
              if (this.selectedArray.length === 1) {
                parent = this.selectedArray[0];
              }
              this.loading = true;
              _context35.p = 1;
              _context35.n = 2;
              return this.add(parent, null);
            case 2:
              _context35.n = 4;
              break;
            case 3:
              _context35.p = 3;
              _t7 = _context35.v;
              appError(_t7);
            case 4:
              this.loading = false;
              this.addingNode = false;
            case 5:
              return _context35.a(2);
          }
        }, _callee35, this, [[1, 3]]);
      }));
      function onClickCreateNew() {
        return _onClickCreateNew.apply(this, arguments);
      }
      return onClickCreateNew;
    }(),
    deleteSelected: function () {
      var _deleteSelected = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee36() {
        var item;
        return Object(regenerator["a" /* default */])().w(function (_context36) {
          while (1) switch (_context36.n) {
            case 0:
              _context36.n = 1;
              return EcRepository.get(this.selectedArray[0]);
            case 1:
              item = _context36.v;
              this.deleteLevel(item);
              this.selectedArray.splice(0, this.selectedArray.length);
            case 2:
              return _context36.a(2);
          }
        }, _callee36, this);
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
      var _deleteLevelInner = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee37(c) {
        var me, editsToUndo, i, level, initialValue, _level, framework, _t8, _t9, _t0;
        return Object(regenerator["a" /* default */])().w(function (_context37) {
          while (1) switch (_context37.p = _context37.n) {
            case 0:
              me = this;
              editsToUndo = [];
              if (!(c["skos:broader"] != null)) {
                _context37.n = 9;
                break;
              }
              i = 0;
            case 1:
              if (!(i < c["skos:broader"].length)) {
                _context37.n = 9;
                break;
              }
              _context37.p = 2;
              _context37.n = 3;
              return EcConcept.get(c["skos:broader"][i]);
            case 3:
              level = _context37.v;
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
                _context37.n = 5;
                break;
              }
              _context37.n = 4;
              return EcEncryptedValue.toEncryptedValue(level);
            case 4:
              level = _context37.v;
            case 5:
              _context37.n = 6;
              return repo.saveTo(level);
            case 6:
              me.$store.commit('editor/framework', me.framework);
              _context37.n = 8;
              break;
            case 7:
              _context37.p = 7;
              _t8 = _context37.v;
              appError(_t8);
            case 8:
              i++;
              _context37.n = 1;
              break;
            case 9:
              if (!(c["skos:narrower"] != null)) {
                _context37.n = 15;
                break;
              }
              i = 0;
            case 10:
              if (!(i < c["skos:narrower"].length)) {
                _context37.n = 15;
                break;
              }
              _context37.p = 11;
              _context37.n = 12;
              return EcConcept.get(c["skos:narrower"][i]);
            case 12:
              _level = _context37.v;
              me.deleteLevelInner(_level);
              _context37.n = 14;
              break;
            case 13:
              _context37.p = 13;
              _t9 = _context37.v;
              appError(_t9);
            case 14:
              i++;
              _context37.n = 10;
              break;
            case 15:
              if (!(c["skos:topConceptOf"] != null)) {
                _context37.n = 21;
                break;
              }
              _context37.p = 16;
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
                _context37.n = 18;
                break;
              }
              _context37.n = 17;
              return EcEncryptedValue.toEncryptedValue(framework);
            case 17:
              framework = _context37.v;
            case 18:
              _context37.n = 19;
              return repo.saveTo(framework);
            case 19:
              me.$store.commit('editor/framework', me.framework);
              _context37.n = 21;
              break;
            case 20:
              _context37.p = 20;
              _t0 = _context37.v;
              appError(_t0);
            case 21:
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
            case 22:
              return _context37.a(2);
          }
        }, _callee37, this, [[16, 20], [11, 13], [2, 7]]);
      }));
      function deleteLevelInner(_x57) {
        return _deleteLevelInner.apply(this, arguments);
      }
      return deleteLevelInner;
    }()
  }
});
// CONCATENATED MODULE: ./src/views/progressionModel/ProgressionHierarchy.vue?vue&type=script&lang=js
 /* harmony default export */ var progressionModel_ProgressionHierarchyvue_type_script_lang_js = (ProgressionHierarchyvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/views/progressionModel/ProgressionHierarchy.vue?vue&type=style&index=0&id=4351b123&prod&lang=scss
var ProgressionHierarchyvue_type_style_index_0_id_4351b123_prod_lang_scss = __webpack_require__("41d1");

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

/***/ "41d1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProgressionHierarchy_vue_vue_type_style_index_0_id_4351b123_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5bbb");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProgressionHierarchy_vue_vue_type_style_index_0_id_4351b123_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProgressionHierarchy_vue_vue_type_style_index_0_id_4351b123_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "5bbb":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "6ffa4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("14d9");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("fb6a");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("c14f");
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
      thisFramework.removeCompetency(thing.shortId(), /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(/*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().m(function _callee() {
        var framework;
        return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              framework = me.framework;
              me.$store.commit('editor/addEditsToUndo', [{
                operation: "update",
                id: framework.shortId(),
                fieldChanged: ["competency", "relation", "level"],
                initialValue: [initialCompetencies, initialRelations, initialLevels]
              }]);
              if (!(me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[f.id] !== true)) {
                _context.n = 2;
                break;
              }
              _context.n = 1;
              return EcEncryptedValue.toEncryptedValue(framework);
            case 1:
              framework = _context.v;
            case 2:
              window.repo.saveTo(framework, function () {
                me.$store.commit('editor/framework', thisFramework);
              }, appError);
            case 3:
              return _context.a(2);
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
        framework.removeCompetency(thing.shortId(), /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(/*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().m(function _callee2() {
          var frameworkToSave;
          return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().w(function (_context2) {
            while (1) switch (_context2.n) {
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
                  _context2.n = 2;
                  break;
                }
                _context2.n = 1;
                return EcEncryptedValue.toEncryptedValue(framework);
              case 1:
                frameworkToSave = _context2.v;
              case 2:
                window.repo.saveTo(frameworkToSave, function () {
                  me.$store.commit('editor/framework', framework);
                }, appError);
              case 3:
                return _context2.a(2);
            }
          }, _callee2);
        })), appLog);
      }
    }
  }
});

/***/ })

}]);
//# sourceMappingURL=chunk-f460016e.664d0e99.js.map