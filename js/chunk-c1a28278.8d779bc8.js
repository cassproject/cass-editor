(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-c1a28278","chunk-74a95bb3"],{

/***/ "25d8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("fb6a");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3fc28fdc-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/conceptScheme/ConceptHierarchy.vue?vue&type=template&id=7d32516f


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
  }, [_vm._m(1), _c('span', [_vm._v(" " + _vm._s(_vm.addConceptOrChildText) + " ")])]) : _vm._e(), !_vm.addingNode && _vm.canEdit && !_vm.multipleSelected && _vm.canCopyOrCut ? _c('div', {
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
      "disabled": !_vm.canCopyOrCut,
      "title": "Copy concept"
    },
    on: {
      "click": _vm.copyClick
    }
  }, [_vm._m(5)]) : _vm._e(), _vm.view === 'framework' || _vm.view === 'concept' ? _c('div', {
    staticClass: "button is-outlined",
    class: _vm.canCopyOrCut ? 'is-primary' : 'is-disabled',
    attrs: {
      "title": "Cut concept",
      "disabled": !_vm.canCopyOrCut
    },
    on: {
      "click": _vm.cutClick
    }
  }, [_vm._m(6)]) : _vm._e(), _vm.view === 'framework' || _vm.view === 'concept' ? _c('div', {
    staticClass: "button is-outlined",
    class: _vm.canPaste ? 'is-primary' : 'is-disabled',
    attrs: {
      "disabled": !_vm.canPaste,
      "title": "Paste concept"
    },
    on: {
      "click": _vm.pasteClick
    }
  }, [_vm._m(7)]) : _vm._e()])]), _vm.view === 'import' ? _c('div', {
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
  }, [_c('span', [_vm._v(" Cancel ")]), _vm._m(8)]), _c('div', {
    staticClass: "button is-dark is-outlined is-pulled-right",
    on: {
      "click": function click($event) {
        return _vm.$store.dispatch('app/clearImport');
      }
    }
  }, [_c('span', [_vm._v(" import again ")]), _vm._m(9)]), _c('div', {
    staticClass: "button is-dark is-outlined is-pulled-right",
    on: {
      "click": _vm.openFramework
    }
  }, [_c('span', [_vm._v("view in editor")]), _vm._m(10)]), _c('router-link', {
    staticClass: "button is-primary is-outlined is -pulled-right",
    attrs: {
      "to": {
        path: '/concepts',
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
        "arrowKey": _vm.arrowKey,
        "largeNumberOfItems": _vm.hasLargeNumberOfItems
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

// CONCATENATED MODULE: ./src/views/conceptScheme/ConceptHierarchy.vue?vue&type=template&id=7d32516f

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
var regeneratorRuntime = __webpack_require__("c7eb");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__("caad");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

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

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.set.js
var es_set = __webpack_require__("6062");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__("2532");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__("3ca3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.search.js
var es_string_search = __webpack_require__("841c");

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

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// EXTERNAL MODULE: ./src/mixins/common.js
var common = __webpack_require__("872c");

// EXTERNAL MODULE: ./src/mixins/competencyEdits.js
var competencyEdits = __webpack_require__("6ffa4");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/conceptScheme/ConceptHierarchy.vue?vue&type=script&lang=js


























var hierarchyTimeout;
/* harmony default export */ var ConceptHierarchyvue_type_script_lang_js = ({
  name: 'ConceptHierarchy',
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
      hasLargeNumberOfItems: false,
      isDraggable: true,
      shiftKey: false,
      arrowKey: null,
      addConceptOrChildText: "Add Concept",
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
        if (this.container["skos:hasTopConcept"] != null) {
          EcConcept.search(this.repo, "skos\\:inScheme:\"" + this.container.shortId() + "\"", function (results) {
            if (results.length > 200) {
              me.hasLargeNumberOfItems = true;
            }
            if (me.hasLargeNumberOfItems) {
              me.expanded = false;
            }
            me.repo.multiget(precache, function (success) {
              me.computeHierarchy();
            }, appError);
          }, null, {
            size: 10000
          });
        } else {
          this.repo.multiget(precache, function (success) {
            me.computeHierarchy();
          }, appError);
        }
      } else {
        me.computeHierarchy();
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
        this.addConceptOrChildText = "Add Child";
      } else {
        this.addConceptOrChildText = "Add Concept";
      }
      this.$emit('selected-array', this.selectedArray);
    },
    // Concepts can't just depend on fields on the container object like frameworks can for reactivity
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
    computeHierarchy: function () {
      var _computeHierarchy = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee() {
        var structure, allChildrenIds, i, c, j, conceptId, topConcept, otherConceptId, otherConcept, broaderRefs;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              structure = [];
              allChildrenIds = new Set(); // Track all nodes that are children
              if (!(this.container == null)) {
                _context.next = 4;
                break;
              }
              return _context.abrupt("return", r);
            case 4:
              if (!(this.container["skos:hasTopConcept"] !== null && this.container["skos:hasTopConcept"] !== undefined)) {
                _context.next = 50;
                break;
              }
              i = 0;
            case 6:
              if (!(i < this.container["skos:hasTopConcept"].length)) {
                _context.next = 14;
                break;
              }
              _context.next = 9;
              return EcConcept.get(this.container["skos:hasTopConcept"][i]);
            case 9:
              c = _context.sent;
              if (c && c["skos:narrower"]) {
                for (j = 0; j < c["skos:narrower"].length; j++) {
                  allChildrenIds.add(c["skos:narrower"][j]);
                }
              }
            case 11:
              i++;
              _context.next = 6;
              break;
            case 14:
              i = 0;
            case 15:
              if (!(i < this.container["skos:hasTopConcept"].length)) {
                _context.next = 36;
                break;
              }
              conceptId = this.container["skos:hasTopConcept"][i];
              _context.next = 19;
              return EcConcept.get(conceptId);
            case 19:
              topConcept = _context.sent;
              if (!this.container["skos:hasTopConcept"]) {
                _context.next = 33;
                break;
              }
              j = 0;
            case 22:
              if (!(j < this.container["skos:hasTopConcept"].length)) {
                _context.next = 33;
                break;
              }
              if (!(i === j)) {
                _context.next = 25;
                break;
              }
              return _context.abrupt("continue", 30);
            case 25:
              // Skip self
              otherConceptId = this.container["skos:hasTopConcept"][j];
              _context.next = 28;
              return EcConcept.get(otherConceptId);
            case 28:
              otherConcept = _context.sent;
              if (otherConcept && otherConcept["skos:broader"]) {
                broaderRefs = Array.isArray(otherConcept["skos:broader"]) ? otherConcept["skos:broader"] : [otherConcept["skos:broader"]];
                if (broaderRefs.includes(conceptId)) {
                  // This concept is broader than otherConcept, so otherConcept is a child
                  allChildrenIds.add(otherConceptId);

                  // Ensure narrower relationship exists in parent concept
                  if (!topConcept["skos:narrower"]) {
                    topConcept["skos:narrower"] = [];
                  }
                  if (!topConcept["skos:narrower"].includes(otherConceptId)) {
                    topConcept["skos:narrower"].push(otherConceptId);
                  }
                }
              }
            case 30:
              j++;
              _context.next = 22;
              break;
            case 33:
              i++;
              _context.next = 15;
              break;
            case 36:
              i = 0;
            case 37:
              if (!(i < this.container["skos:hasTopConcept"].length)) {
                _context.next = 50;
                break;
              }
              _context.next = 40;
              return EcConcept.get(this.container["skos:hasTopConcept"][i]);
            case 40:
              c = _context.sent;
              if (!c) {
                _context.next = 47;
                break;
              }
              if (allChildrenIds.has(this.container["skos:hasTopConcept"][i])) {
                _context.next = 47;
                break;
              }
              structure.push({
                "obj": c,
                "children": []
              });
              if (!c["skos:narrower"]) {
                _context.next = 47;
                break;
              }
              _context.next = 47;
              return this.addChildren(structure, c, structure.length - 1);
            case 47:
              i++;
              _context.next = 37;
              break;
            case 50:
              this.structure = structure;
              this.once = false;
            case 52:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function computeHierarchy() {
        return _computeHierarchy.apply(this, arguments);
      }
      return computeHierarchy;
    }(),
    addChildren: function () {
      var _addChildren = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee2(structure, c, parentIndex) {
        var j, subC, childIndex;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (structure[parentIndex]) {
                _context2.next = 3;
                break;
              }
              appError("Structure at index ".concat(parentIndex, " is undefined"));
              return _context2.abrupt("return");
            case 3:
              if (!structure[parentIndex].children) {
                structure[parentIndex].children = [];
              }
              if (c["skos:narrower"]) {
                _context2.next = 6;
                break;
              }
              return _context2.abrupt("return");
            case 6:
              j = 0;
            case 7:
              if (!(j < c["skos:narrower"].length)) {
                _context2.next = 20;
                break;
              }
              _context2.next = 10;
              return EcConcept.get(c["skos:narrower"][j]);
            case 10:
              subC = _context2.sent;
              if (!subC) {
                _context2.next = 17;
                break;
              }
              // Add this child node regardless of whether it appears elsewhere
              childIndex = structure[parentIndex].children.length;
              structure[parentIndex].children.push({
                "obj": subC,
                "children": []
              });
              if (!subC["skos:narrower"]) {
                _context2.next = 17;
                break;
              }
              _context2.next = 17;
              return this.addChildren(structure[parentIndex].children, subC, childIndex);
            case 17:
              j++;
              _context2.next = 7;
              break;
            case 20:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function addChildren(_x, _x2, _x3) {
        return _addChildren.apply(this, arguments);
      }
      return addChildren;
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
    move: function () {
      var _move = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee3(fromId, toId, fromContainerId, toContainerId, removeOldRelations, toLast) {
        var me, movingConcept, fromContainer, toContainer, isFromConceptScheme, isToConceptScheme, fromProperty, fromInverseProperty, toProperty, toInverseProperty, fromPropInitialValue, toPropInitialValue, conceptFromInverseInitialValue, conceptToInverseInitialValue, objectsToSave, fromIndex, toIndex, i;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              this.once = true;
              me = this; // Debug logging to track the move operation
              appLog("Moving concept", {
                fromId: fromId,
                toId: toId,
                fromContainerId: fromContainerId,
                toContainerId: toContainerId,
                removeOldRelations: removeOldRelations,
                toLast: toLast
              });

              // Get the concept being moved
              _context3.next = 5;
              return EcConcept.get(fromId);
            case 5:
              movingConcept = _context3.sent;
              if (movingConcept) {
                _context3.next = 9;
                break;
              }
              appError("Cannot find concept to move: " + fromId);
              return _context3.abrupt("return");
            case 9:
              if (!fromContainerId) {
                _context3.next = 15;
                break;
              }
              _context3.next = 12;
              return EcRepository.get(fromContainerId);
            case 12:
              _context3.t0 = _context3.sent;
              _context3.next = 16;
              break;
            case 15:
              _context3.t0 = this.container;
            case 16:
              fromContainer = _context3.t0;
              if (!toContainerId) {
                _context3.next = 23;
                break;
              }
              _context3.next = 20;
              return EcRepository.get(toContainerId);
            case 20:
              _context3.t1 = _context3.sent;
              _context3.next = 24;
              break;
            case 23:
              _context3.t1 = this.container;
            case 24:
              toContainer = _context3.t1;
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
                  appLog("Concept is already a top concept, not adding again");
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
            case 43:
              if (!(i < objectsToSave.length)) {
                _context3.next = 52;
                break;
              }
              objectsToSave[i]["schema:dateModified"] = new Date().toISOString();

              // Handle encryption if needed
              if (!(me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[objectsToSave[i].id] !== true)) {
                _context3.next = 49;
                break;
              }
              _context3.next = 48;
              return EcEncryptedValue.toEncryptedValue(objectsToSave[i]);
            case 48:
              objectsToSave[i] = _context3.sent;
            case 49:
              i++;
              _context3.next = 43;
              break;
            case 52:
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
              _context3.prev = 53;
              _context3.next = 56;
              return me.repo.multiput(objectsToSave, function () {
                appLog("Move complete", {
                  concept: movingConcept.shortId(),
                  objectsSaved: objectsToSave.map(function (o) {
                    return o.shortId();
                  })
                });
                me.computeHierarchy();
              }, appError);
            case 56:
              _context3.next = 61;
              break;
            case 58:
              _context3.prev = 58;
              _context3.t2 = _context3["catch"](53);
              appError("Error saving changes:", _context3.t2);
            case 61:
              this.dragging = false;
            case 62:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[53, 58]]);
      }));
      function move(_x4, _x5, _x6, _x7, _x8, _x9) {
        return _move.apply(this, arguments);
      }
      return move;
    }(),
    add: function () {
      var _add = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee4(containerId, previousSibling) {
        var me, c, j, owner, reader, initialValue, index, parent;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              me = this;
              c = new EcConcept();
              if (this.queryParams.newObjectEndpoint) {
                c.generateShortId(this.queryParams.newObjectEndpoint);
              } else {
                c.generateId(this.repo.selectedServer);
              }
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
                "@value": "New Concept"
              };
              c["skos:inScheme"] = this.container.shortId();
              if (!(containerId === this.container.shortId())) {
                _context4.next = 38;
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
                _context4.next = 27;
                break;
              }
              _context4.next = 22;
              return EcEncryptedValue.toEncryptedValue(c);
            case 22:
              c = _context4.sent;
              if (!(EcEncryptedValue.encryptOnSaveMap[me.container.id] !== true)) {
                _context4.next = 27;
                break;
              }
              _context4.next = 26;
              return EcEncryptedValue.toEncryptedValue(me.container);
            case 26:
              me.container = _context4.sent;
            case 27:
              _context4.prev = 27;
              _context4.next = 30;
              return this.repo.multiput([c, me.container]);
            case 30:
              me.once = true;
              _context4.next = 36;
              break;
            case 33:
              _context4.prev = 33;
              _context4.t0 = _context4["catch"](27);
              appError(_context4.t0);
            case 36:
              _context4.next = 70;
              break;
            case 38:
              c["skos:broader"] = [containerId];
              _context4.next = 41;
              return EcConcept.get(containerId);
            case 41:
              parent = _context4.sent;
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
                _context4.next = 61;
                break;
              }
              _context4.next = 52;
              return EcEncryptedValue.toEncryptedValue(c);
            case 52:
              c = _context4.sent;
              if (!(EcEncryptedValue.encryptOnSaveMap[parent.id] !== true)) {
                _context4.next = 57;
                break;
              }
              _context4.next = 56;
              return EcEncryptedValue.toEncryptedValue(parent);
            case 56:
              parent = _context4.sent;
            case 57:
              if (!(EcEncryptedValue.encryptOnSaveMap[me.container.id] !== true)) {
                _context4.next = 61;
                break;
              }
              _context4.next = 60;
              return EcEncryptedValue.toEncryptedValue(me.container);
            case 60:
              me.container = _context4.sent;
            case 61:
              _context4.prev = 61;
              _context4.next = 64;
              return this.repo.multiput([c, parent, me.container]);
            case 64:
              me.once = true;
              _context4.next = 70;
              break;
            case 67:
              _context4.prev = 67;
              _context4.t1 = _context4["catch"](61);
              appError(_context4.t1);
            case 70:
              this.$store.commit("editor/newCompetency", c.shortId());
              appLog("Added node: ", JSON.parse(c.toJson()));
            case 72:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[27, 33], [61, 67]]);
      }));
      function add(_x10, _x11) {
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
      var _openFramework = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee5() {
        var f;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return EcConceptScheme.get(this.container.shortId());
            case 2:
              f = _context5.sent;
              this.$store.commit('editor/framework', f);
              this.$router.push({
                name: "conceptScheme",
                params: {
                  frameworkId: this.container.id
                }
              });
            case 5:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function openFramework() {
        return _openFramework.apply(this, arguments);
      }
      return openFramework;
    }(),
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
              this.deleteConcept(item);
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
    deleteConcept: function deleteConcept(thing) {
      appLog("deleting " + thing.id);
      this.deleteConceptInner(thing);
      this.framework["schema:dateModified"] = new Date().toISOString();
      this.$store.commit('editor/selectedCompetency', null);
    },
    deleteConceptInner: function () {
      var _deleteConceptInner = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee8(c) {
        var me, editsToUndo, i, concept, initialValue, _concept, framework;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              me = this;
              editsToUndo = [];
              if (!(c["skos:broader"] != null)) {
                _context8.next = 28;
                break;
              }
              i = 0;
            case 4:
              if (!(i < c["skos:broader"].length)) {
                _context8.next = 28;
                break;
              }
              _context8.prev = 5;
              _context8.next = 8;
              return EcConcept.get(c["skos:broader"][i]);
            case 8:
              concept = _context8.sent;
              initialValue = concept["skos:narrower"].slice();
              EcArray.setRemove(concept["skos:narrower"], c.shortId());
              concept["schema:dateModified"] = new Date().toISOString();
              editsToUndo.push({
                operation: "update",
                id: concept.shortId(),
                fieldChanged: ["skos:narrower"],
                initialValue: [initialValue]
              });
              if (!(me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[concept.id] !== true)) {
                _context8.next = 17;
                break;
              }
              _context8.next = 16;
              return EcEncryptedValue.toEncryptedValue(concept);
            case 16:
              concept = _context8.sent;
            case 17:
              _context8.next = 19;
              return repo.saveTo(concept);
            case 19:
              me.$store.commit('editor/framework', me.framework);
              _context8.next = 25;
              break;
            case 22:
              _context8.prev = 22;
              _context8.t0 = _context8["catch"](5);
              appError(_context8.t0);
            case 25:
              i++;
              _context8.next = 4;
              break;
            case 28:
              if (!(c["skos:narrower"] != null)) {
                _context8.next = 44;
                break;
              }
              i = 0;
            case 30:
              if (!(i < c["skos:narrower"].length)) {
                _context8.next = 44;
                break;
              }
              _context8.prev = 31;
              _context8.next = 34;
              return EcConcept.get(c["skos:narrower"][i]);
            case 34:
              _concept = _context8.sent;
              me.deleteConceptInner(_concept);
              _context8.next = 41;
              break;
            case 38:
              _context8.prev = 38;
              _context8.t1 = _context8["catch"](31);
              appError(_context8.t1);
            case 41:
              i++;
              _context8.next = 30;
              break;
            case 44:
              if (!(c["skos:topConceptOf"] != null)) {
                _context8.next = 63;
                break;
              }
              _context8.prev = 45;
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
                _context8.next = 55;
                break;
              }
              _context8.next = 54;
              return EcEncryptedValue.toEncryptedValue(framework);
            case 54:
              framework = _context8.sent;
            case 55:
              _context8.next = 57;
              return repo.saveTo(framework);
            case 57:
              me.$store.commit('editor/framework', me.framework);
              _context8.next = 63;
              break;
            case 60:
              _context8.prev = 60;
              _context8.t2 = _context8["catch"](45);
              appError(_context8.t2);
            case 63:
              this.spitEvent("conceptDeleted", c.shortId(), "editFrameworkPage");
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
              return _context8.stop();
          }
        }, _callee8, this, [[5, 22], [31, 38], [45, 60]]);
      }));
      function deleteConceptInner(_x12) {
        return _deleteConceptInner.apply(this, arguments);
      }
      return deleteConceptInner;
    }()
  }
});
// CONCATENATED MODULE: ./src/views/conceptScheme/ConceptHierarchy.vue?vue&type=script&lang=js
 /* harmony default export */ var conceptScheme_ConceptHierarchyvue_type_script_lang_js = (ConceptHierarchyvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/views/conceptScheme/ConceptHierarchy.vue?vue&type=style&index=0&id=7d32516f&prod&lang=scss
var ConceptHierarchyvue_type_style_index_0_id_7d32516f_prod_lang_scss = __webpack_require__("d26e");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/views/conceptScheme/ConceptHierarchy.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  conceptScheme_ConceptHierarchyvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ConceptHierarchy = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "292d":
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

/***/ "d26e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ConceptHierarchy_vue_vue_type_style_index_0_id_7d32516f_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("292d");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ConceptHierarchy_vue_vue_type_style_index_0_id_7d32516f_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ConceptHierarchy_vue_vue_type_style_index_0_id_7d32516f_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ })

}]);
//# sourceMappingURL=chunk-c1a28278.8d779bc8.js.map