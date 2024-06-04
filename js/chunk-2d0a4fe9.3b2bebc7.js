(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-2d0a4fe9"],{

/***/ "098b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1efc2bba-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/lode/components/Thing.vue?vue&type=template&id=37f184c6



var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "lode__thing",
    class: [_vm.editingClass, {
      'managing-assertions': _vm.managingAssertions
    }, {
      'highlighted': _vm.highlighted
    }, {
      'show-all': _vm.filter === 'showAll'
    }, {
      'show-aligned': _vm.filter === 'showAligned'
    }, {
      'show-unaligned': _vm.filter === 'showUnaligned'
    }]
  }, [_vm._t("thingIcon"), _c('div', {
    class: _vm.shortType !== 'Framework' && _vm.shortType !== 'Concept' ? 'container' : 'container is-fluid is-paddingless is-marginless'
  }, [_vm.clickToLoad ? _c('span', {
    staticClass: "click-to-load",
    attrs: {
      "title": _vm.name ? _vm.name : _vm.uri
    }
  }, [_c('span', {
    staticClass: "tag is-size-7 is-light",
    class: [{
      'is-link': _vm.competencyAsPropertyIsExternal
    }, {
      'is-primary': !_vm.competencyAsPropertyIsExternal
    }]
  }, [_vm._v(_vm._s(_vm.competencyAsPropertyType))]), _c('span', {
    staticClass: "thing-as-property__text",
    class: _vm.competencyAsPropertyClass
  }, [_vm._v(" " + _vm._s(_vm.name ? _vm.name : _vm.uri) + " ")]), !_vm.competencyAsPropertyIsExternal && _vm.thingAsPropertyModalObject.type !== 'Level' ? _c('div', {
    staticClass: "button is-small is-outlined is-primary",
    on: {
      "click": function click($event) {
        return _vm.goToCompetencyWithinThisFramework();
      }
    }
  }, [_c('span', {
    staticClass: "has-text-weight-bold"
  }, [_vm._v("scroll to")]), _vm._m(0)]) : _vm._e(), _vm.thingAsPropertyModalObject.objectType === 'Competency' || _vm.thingAsPropertyModalObject.objectType === 'Concept' || _vm.thingAsPropertyModalObject.objectType === 'Level' ? _c('button', {
    staticClass: "button is-small is-outlined is-link",
    on: {
      "click": _vm.clickShowDetails
    }
  }, [_c('span', {
    staticClass: "has-text-weight-bold"
  }, [_vm._v("details")]), _vm._m(1)]) : _vm._e()]) : _vm.uriAndNameOnly ? _c('span', {
    staticClass: "thing-as-property__text",
    class: _vm.competencyAsPropertyClass,
    attrs: {
      "title": _vm.name ? _vm.name : _vm.uri
    }
  }, [_vm._v(" " + _vm._s(_vm.name ? _vm.name : _vm.uri) + " ")]) : _vm.expandedThing ? _c('div', {
    class: ['lode__' + _vm.shortType, _vm.hoverClass, {
      'highlighted': _vm.highlighted
    }]
  }, [_vm.shortType === 'ConceptScheme' || _vm.shortType === 'Framework' && _vm.view !== 'crosswalk' ? _c('div', {
    staticClass: "hierarchy-item__buttons"
  }, [_vm.view !== 'crosswalk' && _vm.canEdit ? _c('div', {
    staticClass: "edit-button button is-small is-text has-text-primary",
    on: {
      "click": function click($event) {
        return _vm.editNode();
      }
    }
  }, [_vm._m(2)]) : _vm._e(), _vm.showAddComments && _vm.view === 'framework' ? _c('div', {
    staticClass: "comment-button"
  }, [_c('div', {
    staticClass: "button is-text has-text-primary is-small",
    on: {
      "click": _vm.handleClickAddComment
    }
  }, [_vm._m(3)])]) : _vm._e()]) : _vm._e(), _vm.expandedThing['@id'] ? _c('a', {
    staticClass: "lode__type"
  }, [_vm.shortType ? _c('span', {
    attrs: {
      "title": _vm.type
    }
  }, [_vm._v(" " + _vm._s(_vm.shortType) + " ")]) : _vm._e()]) : _vm.shortType ? _c('span', {
    staticClass: "lode__type",
    attrs: {
      "title": _vm.type
    }
  }, [_vm._v(_vm._s(_vm.shortType))]) : _vm._e(), _vm._t("default"), _c('div', {
    staticClass: "headings-group",
    class: {
      'highlighted': _vm.highlighted
    }
  }, _vm._l(_vm.headings, function (heading) {
    return _c('div', {
      key: heading,
      staticClass: "lode__thing-heading"
    }, [_vm.showAlwaysProperties && _vm.alwaysProperties[heading] ? [_vm._l(_vm.alwaysProperties[heading], function (value, key) {
      return _c('Property', {
        key: key,
        attrs: {
          "expandedThing": _vm.expandedThing,
          "expandedProperty": key,
          "schema": value,
          "editingThing": _vm.editingThing,
          "canEdit": false,
          "profile": _vm.profile
        },
        on: {
          "editing-property-event": function editingPropertyEvent($event) {
            return _vm.handleEditingEvent($event);
          },
          "set-checkbox": function setCheckbox($event) {
            return _vm.$emit('set-checkbox');
          },
          "select": _vm.select
        }
      });
    }), _vm._t("frameworkTags")] : _vm.showPossibleProperties && _vm.possibleProperties[heading] ? _vm._l(_vm.possibleProperties[heading], function (value, key) {
      return _c('Property', {
        key: key,
        attrs: {
          "expandedThing": _vm.expandedThing,
          "expandedProperty": key,
          "schema": value,
          "editingThing": _vm.editingThing,
          "canEdit": _vm.allowPropertyEdits(key),
          "profile": _vm.profile
        },
        on: {
          "editing-property-event": function editingPropertyEvent($event) {
            return _vm.handleEditingEvent($event);
          },
          "set-checkbox": function setCheckbox($event) {
            return _vm.$emit('set-checkbox');
          },
          "select": _vm.select
        }
      });
    }) : _vm.showViewProperties && _vm.viewProperties[heading] ? _vm._l(_vm.viewProperties[heading], function (value, key) {
      return _c('Property', {
        key: key,
        attrs: {
          "expandedThing": _vm.expandedThing,
          "expandedProperty": key,
          "schema": value,
          "editingThing": _vm.editingThing,
          "canEdit": _vm.allowPropertyEdits(key),
          "profile": _vm.profile
        },
        on: {
          "editing-property-event": function editingPropertyEvent($event) {
            return _vm.handleEditingEvent($event);
          },
          "set-checkbox": function setCheckbox($event) {
            return _vm.$emit('set-checkbox');
          },
          "select": _vm.select
        }
      });
    }) : _vm._e()], 2);
  }), 0), _vm.canEditAssertions && _vm.managingAssertions ? _c('AssertionEditor', {
    attrs: {
      "uri": _vm.uri || _vm.obj.id
    }
  }) : _vm._e(), _vm._t("frameworkDetails")], 2) : _vm._e()])], 2);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-external-link-alt"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-info"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-edit is-size-5"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-comment-medical is-size-5"
  })]);
}];

// CONCATENATED MODULE: ./src/lode/components/Thing.vue?vue&type=template&id=37f184c6

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
var regeneratorRuntime = __webpack_require__("c7eb");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
var createForOfIteratorHelper = __webpack_require__("b85c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.join.js
var es_array_join = __webpack_require__("a15b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__("a434");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.ends-with.js
var es_string_ends_with = __webpack_require__("8a79");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__("3ca3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__("5319");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.starts-with.js
var es_string_starts_with = __webpack_require__("2ca0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// EXTERNAL MODULE: ./src/mixins/common.js
var common = __webpack_require__("872c");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/lode/components/Thing.vue?vue&type=script&lang=js


















/* harmony default export */ var Thingvue_type_script_lang_js = ({
  // Thing represents a JSON-LD object. Does not have to be based on http://schema.org/Thing.
  name: 'Thing',
  mixins: [common["a" /* default */]],
  props: {
    expandInModal: {
      type: Boolean,
      default: false
    },
    competencyAsPropertyType: {
      type: String,
      default: ''
    },
    // Level vs Competency
    competencyAsPropertyObjectType: {
      type: String,
      default: ''
    },
    // (Optional) Object that will be turned into the Thing during initialization.
    obj: Object,
    // (Optional) Expanded Object (if any) that will be turned into the ExpandedThing during initialization.
    children: Number,
    expandedObj: Object,
    // (Optional) URI/URL to an object to go fetch, in lieu of the above two.
    uri: String,
    // If the uri is specified, whether we should delay loading. (prevents infinite loops)
    clickToLoad: Boolean,
    // True if the parent isn't editable, this shouldn't be either. Overrides canEdit.
    parentNotEditable: Boolean,
    // Application profile used to constrain and respecify properties that are to be made editable.
    profile: Object,
    highlightList: Array,
    childrenExpanded: {
      type: Boolean,
      default: true
    },
    newFramework: Boolean,
    index: Number,
    cantMoveUp: Boolean,
    cantMoveDown: Boolean,
    cantMoveRight: Boolean,
    cantMoveLeft: Boolean,
    properties: String,
    editingNode: Boolean,
    containerType: String,
    view: {
      type: String,
      default: 'framework'
    },
    subview: {
      type: String,
      default: ''
    },
    filter: {
      type: String,
      default: 'showAll'
    },
    canEditAssertions: Boolean
  },
  components: {
    Property: function Property() {
      return Promise.all(/* import() */[__webpack_require__.e("chunk-4cac7b5b"), __webpack_require__.e("chunk-25a2af2a")]).then(__webpack_require__.bind(null, "5e26"));
    },
    AssertionEditor: function AssertionEditor() {
      return __webpack_require__.e(/* import() */ "chunk-2d0cbec1").then(__webpack_require__.bind(null, "4c73"));
    }
  },
  data: function data() {
    return {
      editingThing: false,
      editingClass: '',
      hoverClass: '',
      // After initialization and expansion, this will hold the fully expanded thing we're displaying/CRUDing.
      expandedThing: null,
      originalThing: null,
      // True if we are in the compacted (alwaysProperties) property display mode. In the middle of this and showPossible is all properties that we can view.
      showAlways: true,
      // True if we are in the fully expanded (possibleProperties) property display mode. Only relevant if we can edit the object.
      showPossible: false,
      uriAndNameOnly: false,
      name: null,
      skipConfigProperties: ["alwaysProperties", "headings", "primaryProperties", "secondaryProperties", "tertiaryProperties", "relationshipsHeading", "relationshipsPriority"]
    };
  },
  created: function created() {
    if (this.clickToLoad === false) {
      this.load();
    }
  },
  mounted: function mounted() {
    this.load();
    if (this.uri && this.$store.state.editor) {
      this.resolveNameFromUrl(this.uri);
    }
    if (this.properties === "secondary") {
      this.showAlways = false;
      this.showPossible = null;
    } else if (this.properties === "tertiary") {
      this.showAlways = false;
      this.showPossible = true;
    }
  },
  computed: {
    thingAsPropertyModalObject: function thingAsPropertyModalObject() {
      var name = this.$parent.$parent.obj.name;
      if (!name) {
        name = this.$parent.$parent.obj["skos:prefLabel"];
      }
      var object = {
        component: 'Single',
        uri: this.uri,
        type: this.competencyAsPropertyType,
        objectType: this.competencyAsPropertyObjectType,
        parentName: name,
        canEdit: this.canEdit
      };
      return object;
    },
    framework: function framework() {
      return this.$store.getters['editor/framework'];
    },
    thingAsPropertyIcon: function thingAsPropertyIcon() {
      var type;
      if (this.competencyAsPropertyObjectType === "Level") {
        type = 'level';
      } else if (this.competencyAsPropertyType !== '') {
        type = this.competencyAsPropertyType;
      } else {
        type = this.shortType;
      }
      var icon;
      if (type === 'narrows') {
        icon = 'fa fa-less-than';
      } else if (type === 'is enabled by') {
        icon = 'fa fa-toggle-on';
      } else if (type === 'broadens') {
        icon = 'fa fa-less-than';
      } else if (type === 'is equivalent to') {
        icon = 'fa fa-equals';
      } else if (type === 'desires') {
        icon = 'fa fa-crosshairs';
      } else if (type === 'requires') {
        icon = 'fa fa-asterisk';
      } else if (type === 'Level' || type === 'level' || this.objectType === "Level" || this.objectType === 'level') {
        icon = 'fa fa-layer-group';
      } else if (type === 'is related to') {
        icon = 'fa fa-sync';
      } else if (type === 'similar to') {
        icon = 'fa fa-tilde';
      } else {
        icon = "fa fa-link";
      }
      return icon;
    },
    showAddComments: function showAddComments() {
      if (this.$store.getters['editor/queryParams'].concepts === "true" || this.$store.getters['editor/conceptMode'] === true || this.$store.getters['editor/progressionMode'] === true) {
        return false;
      }
      return this.$store.state.app.canAddComments;
    },
    competencyAsPropertyClass: function competencyAsPropertyClass() {
      if (this.competencyAsPropertyIsExternal) {
        return 'competency-as-property';
      } else {
        return '';
      }
    },
    showAlwaysProperties: function showAlwaysProperties() {
      if (this.showAlways === true && this.expandedThing !== null && this.expandedThing !== undefined) {
        return true;
      } else {
        return false;
      }
    },
    showPossibleProperties: function showPossibleProperties() {
      if (this.showPossible === true && this.expandedThing != null && this.expandedThing !== undefined) {
        return true;
      } else {
        return false;
      }
    },
    showViewProperties: function showViewProperties() {
      if (this.showAlways === false && this.showPossible === null && this.expandedThing !== null && this.expandedThing !== undefined) {
        return true;
      } else {
        return false;
      }
    },
    /*
         * TO DO: Make headings only returns one that have properties filled in
         * and are showing.
         * Currently I can get a blank list section for keys heading section
         */
    headings: function headings() {
      if (this.profile && this.profile["headings"] && this.profile["headings"].length !== 0) {
        return this.profile["headings"];
      } else {
        return [""];
      }
    },
    minimizeButtonClass: function minimizeButtonClass() {
      if (this.showAlways === true && this.showPossible === false) {
        return 'is-text has-text-info ';
      } else {
        return 'is-text has-text-dark';
      }
    },
    allPropertiesButtonClass: function allPropertiesButtonClass() {
      if (this.showAlways === false && this.showPossible === null) {
        return 'is-info has-text-white ';
      } else {
        return 'is-text has-text-dark';
      }
    },
    globalButtonClass: function globalButtonClass() {
      if (this.showAlways === false && this.showPossible === true) {
        return 'is-info has-text-white ';
      } else {
        return 'is-text has-text-dark';
      }
    },
    // Get the fully qualified type of the thing. eg: http://schema.org/Person
    type: function type() {
      if (this.expandedThing == null) {
        return null;
      }
      return this.expandedThing["@type"][0];
    },
    /*
        Check to see if the current thing as property is in the framework object
        This included relations, levels, and maybe schemas later?
    */
    competencyAsPropertyIsExternal: function competencyAsPropertyIsExternal() {
      var external = true;
      if (this.framework) {
        if (this.objectType === 'Level' && this.framework.level) {
          for (var i = 0; i < this.framework.level.length; i++) {
            if (this.framework.level[i] === this.uri) {
              external = false;
              return external;
            }
          }
        } else if (this.framework.competency) {
          for (var _i = 0; _i < this.framework.competency.length; _i++) {
            if (this.framework.competency[_i] === this.uri) {
              external = false;
              return external;
            }
          }
        }
      }
      return external;
    },
    // Get the short (one word) type of the thing. eg: Person
    shortType: function shortType() {
      if (this.expandedThing == null) {
        return null;
      }
      return this.expandedThing["@type"][0].split("/").pop();
    },
    // Get the canonical namespace/context prefix of the type. eg: http://schema.org/ -- WARNING: This is not the @context as specified by the Thing.
    context: function context() {
      // TODO: Rename 'namespace' -- context is confusing.
      var ary = this.type.split("/");
      ary.pop();
      return ary.join("/");
    },
    // True if the current client can edit this object.
    canEdit: function canEdit() {
      if (this.parentNotEditable === true) {
        return false;
      }
      if (this.originalThing) {
        return this.canEditAny(this.originalThing);
      }
      return true;
    },
    // Fetches a map of fully qualified property identifiers to the full @graph property specifications.
    schema: function schema() {
      var schema = this.$store.state.lode.schemata[this.type];
      if (schema == null) {
        schema = this.$store.state.lode.schemata[this.context];
      }
      var result = {};
      if (schema !== null && schema !== undefined) {
        for (var i = 0; i < schema.length; i++) {
          var r = schema[i];
          result[r["@id"]] = r;
        }
      }
      return result;
    },
    // Map of fully qualified property ids to schema items that should always be shown (if available) at the top for any object.
    alwaysProperties: function alwaysProperties() {
      var result = {};
      if (this.profile && this.profile["alwaysProperties"]) {
        return this.getPropertiesFromProfile(result, "alwaysProperties");
      } else if (this.profile && this.profile["primaryProperties"]) {
        return this.getPropertiesFromProfile(result, "primaryProperties");
      }
      var props = ["http://schema.org/name", "http://schema.org/description", "http://purl.org/dc/terms/title", "http://purl.org/dc/terms/description", "http://www.w3.org/2004/02/skos/core#prefLabel", "http://www.w3.org/2004/02/skos/core#definition"];
      for (var i = 0; i < props.length; i++) {
        var prop = props[i];
        if (this.profile == null || this.profile != null && this.profile[prop] !== undefined) {
          if (this.schema[prop] != null) {
            if (this.expandedThing[prop] != null && this.expandedThing[prop].length === 0) {
              if (prop === "http://schema.org/name" || prop === "http://purl.org/dc/terms/title" || prop === "http://www.w3.org/2004/02/skos/core#prefLabel") {
                this.setUnknownName(prop);
              }
            }
            if (this.expandedThing[prop] != null && this.expandedThing[prop].length !== 0) {
              var heading = "";
              if (this.profile != null) {
                if (this.profile[prop]["heading"]) {
                  heading = this.profile[prop]["heading"];
                }
                if (result[heading] == null || result[heading] === undefined) {
                  result[heading] = {};
                }
                result[heading][prop] = this.profile[prop];
              } else {
                if (result[heading] == null || result[heading] === undefined) {
                  result[heading] = {};
                }
                result[heading][prop] = this.schema[prop];
              }
            }
          }
        }
      }
      return result;
    },
    // Map of fully qualified property ids to schema items, limited to properties that have data in them, shown in the first level of breakout. Configurable via the profile property.
    viewProperties: function viewProperties() {
      var result = {};
      for (var key in this.alwaysProperties) {
        result[key] = {};
        for (var key2 in this.alwaysProperties[key]) {
          result[key][key2] = this.alwaysProperties[key][key2];
        }
      }
      if (this.profile && this.profile["secondaryProperties"]) {
        return this.getPropertiesFromProfile(result, "secondaryProperties");
      }
      for (var key in this.expandedThing) {
        if (key === "constructor") continue;
        if (key === "@id") continue;
        if (key === "@type") continue;
        if (key === "@context") continue;
        if (key.endsWith("owner")) continue;
        if (key.endsWith("reader")) continue;
        if (key.endsWith("signature")) continue;
        // If it doesn't exist in the profile, don't show it.
        if (this.profile != null && this.profile[key] === undefined) {
          continue;
        }
        // If it doesn't exist in the data, don't show it.
        if (this.expandedThing[key] == null || this.expandedThing[key].length === 0) {
          continue;
        }
        // If it does exist in the profile, use the schema from the profile.
        if (this.profile != null) {
          var heading = "";
          if (this.profile[key]["heading"]) {
            heading = this.profile[key]["heading"];
          }
          if (result[heading] == null || result[heading] === undefined) {
            result[heading] = {};
          }
          result[heading][key] = this.profile[key];
          continue;
        }
        // If there is no profile, use the schema from the schema.
        if (this.schema[key] != null && this.schema[key] !== undefined) {
          if (result[""] == null || result[""] === undefined) {
            result[""] = {};
          }
          result[""][key] = this.schema[key];
          continue;
        }
        // If it doesn't exist in the schema, use the 'schemaFallback'.
        if (result[""] == null || result[""] === undefined) {
          result[""] = {};
        }
        result[""][key] = this.$store.state.lode.schemaFallback[key];
      }
      if (this.profile) {
        for (var key in this.profile) {
          var heading = "";
          if (this.profile[key]["heading"]) {
            heading = this.profile[key]["heading"];
          }
          if (result[heading] == null && result[heading] === undefined) {
            result[heading] = {};
          }
          if (this.profile[key]["valuesIndexed"]) {
            var f = this.profile[key]["valuesIndexed"];
            f = f();
            if (f && f[this.obj.shortId()]) {
              result[heading][key] = this.profile[key];
            }
          } else if (this.expandedThing[key] != null && this.expandedThing[key].length !== 0) {
            result[heading][key] = this.profile[key];
          }
        }
      }
      return result;
    },
    // Map of fully qualified property ids to schema items, unlimited, shown in the second level of breakout. Configurable via the profile property.
    possibleProperties: function possibleProperties() {
      var result = {};
      for (var key in this.viewProperties) {
        result[key] = {};
        for (var key2 in this.viewProperties[key]) {
          result[key][key2] = this.viewProperties[key][key2];
        }
      }
      if (this.profile && this.profile["tertiaryProperties"]) {
        return this.getPropertiesFromProfile(result, "tertiaryProperties");
      }
      if (this.profile != null) {
        for (var key in this.profile) {
          if (!EcArray.has(this.skipConfigProperties, key)) {
            if (this.profile["headings"] && this.profile["headings"].length !== 0) {
              var heading = this.profile[key]["heading"];
              if (result[heading] == null || result[heading] === undefined) {
                result[heading] = {};
              }
              result[heading][key] = this.profile[key];
            } else {
              if (result[""] == null || result[""] === undefined) {
                result[""] = {};
              }
              result[""][key] = this.profile[key];
            }
          }
        }
      } else {
        for (var key in this.schema) {
          if (key === "constructor") continue;
          if (key === "@id") continue;
          if (key === "@type") continue;
          if (key === "@context") continue;
          if (key.endsWith("owner")) continue;
          if (key.endsWith("reader")) continue;
          if (key.endsWith("signature")) continue;
          if (this.profile != null && this.profile[key] === undefined) {
            continue;
          }
          if (this.schema[key]["@type"] === undefined && this.schema[key]["http://schema.org/domainIncludes"] === undefined) {
            continue;
          }
          if (this.schema[key]["@type"] != null && this.schema[key]["@type"][0].indexOf("Property") === -1) {
            continue;
          }
          // If there is no profile, use the schema from the schema.
          if (this.schema[key] != null && this.schema[key] !== undefined) {
            if (result[""] == null || result[""] === undefined) {
              result[""] = {};
            }
            result[""][key] = this.schema[key];
            continue;
          }
          // If it doesn't exist in the schema, use the 'schemaFallback'.
          if (result[""] == null || result[""] === undefined) {
            result[""] = {};
          }
          result[""][key] = this.$store.state.lode.schemaFallback[key];
        }
      }
      return result;
    },
    // Attempt to get icons for types. Failed pretty miserably.
    iconClass: function iconClass() {
      return "fas fa-" + this.shortType.toLowerCase();
    },
    highlighted: function highlighted() {
      if (this.highlightList) {
        for (var i = 0; i < this.highlightList.length; i++) {
          if (this.obj.shortId() === this.highlightList[i] || this.obj.id === this.highlightList[i]) {
            return true;
          }
        }
      }
      return false;
    },
    changedObject: function changedObject() {
      if (this.$store.state.editor) {
        return this.$store.state.editor.changedObject;
      }
      return null;
    },
    managingAssertions: function managingAssertions() {
      return this.$store.getters['editor/manageAssertions'] && this.shortType === 'Competency' && this.$route.name === 'framework';
    }
  },
  methods: {
    clickShowDetails: function clickShowDetails() {
      this.$store.commit('app/showModal', this.thingAsPropertyModalObject);
    },
    goToCompetencyWithinThisFramework: function goToCompetencyWithinThisFramework() {
      // Scroll to competency
      this.$scrollTo("#scroll-" + this.uri.split('/').pop());
    },
    handleClickAddComment: function handleClickAddComment() {
      this.$store.commit('editor/setAddCommentAboutId', EcRemoteLinkedData.trimVersionFromUrl(this.expandedThing["@id"]));
      this.$store.commit('editor/setAddCommentType', 'new');
      this.$store.commit('app/showModal', {
        component: 'AddComment'
      });
    },
    editNode: function editNode() {
      this.$emit('edit-node-event', true);
    },
    handleEditingEvent: function handleEditingEvent(e) {
      if (e) {
        /*
             * hide all edit options
             * could probably make uneditable entirely
             * but this helps remove the options
             * should only be able to edit one thing at a time
             * without an intended use case for editing multiple things
             * at a time
             */
        this.editingClass = 'editing-competency';
        this.editingThing = true;
        this.$emit('editing-thing', true);
      } else {
        this.editingClass = '';
        this.editingThing = false;
        this.$emit('editing-thing', false);
      }
    },
    /*
         * Show just the properties that
         * have values for this competency
         */
    showEnteredProperties: function showEnteredProperties() {
      this.showAlways = false;
      this.showPossible = null;
    },
    /*
         * Show all available properties
         * even empty
         */
    showGlobal: function showGlobal() {
      this.showAlways = false;
      this.showPossible = true;
    },
    emitExpandEvent: function emitExpandEvent(e) {
      this.$emit('expand-event');
    },
    load: function load() {
      var me = this;
      if (this.uri != null) {
        // If we have a uri, go get the data from the uri and continue loading.
        EcRepository.get(this.uri, function (t) {
          me.originalThing = t;
          if (!EcObject.isObject(t)) {
            me.resolveNameFromUrl(me.uri);
            me.uriAndNameOnly = true;
          } else {
            var allTypes = me.getAllTypes(t);
            if (t.context != null && t.context !== undefined) {
              allTypes.push(t.context);
            }
            new EcAsyncHelper().each(allTypes, function (type, callback) {
              me.loadSchema(callback, type);
            }, function () {
              me.expand(t, function () {});
            });
          }
        }, function () {
          me.resolveNameFromUrl(me.uri);
          me.uriAndNameOnly = true;
        });
      } else {
        if (this.expandedObj != null && this.expandedObj !== undefined) {
          // If we don't have an expandedObj provided, expand whatever is in obj and continue loading.
          this.loadSchema(function () {
            me.expandedThing = me.expandedObj;
          }, this.expandedObj["@type"][0]);
        } else if (this.obj) {
          me.originalThing = this.obj;
          var allTypes = me.getAllTypes(this.obj);
          if (this.obj.context != null && this.obj.context !== undefined) {
            allTypes.push(this.obj.context);
          }
          new EcAsyncHelper().each(allTypes, function (type, callback) {
            // delay enough for the schema to load from App so not every Thing component has to do this
            setTimeout(function () {
              me.loadSchema(callback, type);
            }, 100);
          }, function () {
            me.expand(me.obj, function () {});
          });
        }
      }
    },
    // Fleshes out the Thing object with empty containers for any possible field that can be edited, according to the schema. Permits reactivity of currently unused fields.
    reactify: function reactify(o) {
      for (var key in o) {
        if (EcArray.isArray(o[key])) {
          var _iterator = Object(createForOfIteratorHelper["a" /* default */])(o[key]),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var item = _step.value;
              if (EcObject.isObject(item)) {
                if (item["@type"] != null) {
                  this.reactify(item);
                }
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      }
      var objectModel = null;
      var fullType = o["@type"];
      if (EcArray.isArray(fullType) && fullType.length > 0) fullType = fullType[0];
      var objectModel = this.$store.state.lode.objectModel[fullType];
      if (objectModel != null) {
        for (var _key in objectModel) {
          if (o[_key] == null) {
            o[_key] = [];
          }
        }
      }
      if (this.profile) {
        for (var _key2 in this.profile) {
          if (o[_key2] == null && !this.profile[_key2]["valuesIndexed"] && !EcArray.has(this.skipConfigProperties, _key2)) {
            o[_key2] = [];
          }
        }
      }
      return o;
    },
    // Performs a JSON-LD Processor 'expand' operation that disambiguates and attaches a namespace for each property. Places result in expandedThing. Does not use the schema, uses the @context of the thing.
    expand: function () {
      var _expand = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee(o, after) {
        var me, toExpand, expanded;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              me = this;
              toExpand = JSON.parse(o.toJson());
              if (toExpand["@context"] != null && toExpand["@context"].startsWith("http://")) {
                toExpand["@context"] = toExpand["@context"].replace("http://", "https://");
              }
              if (toExpand["@context"] != null && toExpand["@context"].indexOf("skos") !== -1) {
                toExpand["@context"] = "https://schema.cassproject.org/0.4/skos/";
              }
              _context.prev = 4;
              _context.next = 7;
              return jsonld.expand(toExpand);
            case 7:
              expanded = _context.sent;
              me.expandedThing = me.reactify(expanded[0]);
              _context.next = 14;
              break;
            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](4);
              appError(_context.t0);
            case 14:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[4, 11]]);
      }));
      function expand(_x, _x2) {
        return _expand.apply(this, arguments);
      }
      return expand;
    }(),
    // Loads the schema (not the context!) for this object, if available and if it is where it should be (at the url of the fully qualified @type).
    loadSchema: function loadSchema(after, type) {
      var me = this;
      if (type == null) type = this.type;
      if (type.startsWith("http://schema.org/")) {
        if (after != null) after();
        return;
      } else if (type.indexOf("ConceptScheme") !== -1) {
        type = "https://schema.cassproject.org/0.4/skos/ConceptScheme";
      } else if (type.indexOf("Concept") !== -1) {
        type = "https://schema.cassproject.org/0.4/skos/Concept";
      } else if (type.indexOf("skos") !== -1) {
        type = "https://schema.cassproject.org/0.4/skos";
      }
      if (this.$store.state.lode.schemata[type] === undefined && type.indexOf("EncryptedValue") === -1) {
        var augmentedType = type;
        augmentedType += type.indexOf("schema.org") !== -1 ? ".jsonld" : "";
        EcRemote.getExpectingObject("", augmentedType, /*#__PURE__*/function () {
          var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee2(context) {
            var expanded;
            return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  me.$store.commit('lode/rawSchemata', {
                    id: type,
                    obj: context
                  });
                  _context2.prev = 1;
                  _context2.next = 4;
                  return jsonld.expand(context);
                case 4:
                  expanded = _context2.sent;
                  me.$store.dispatch('lode/schemata', {
                    id: type,
                    obj: expanded
                  });
                  if (after != null) after();
                  _context2.next = 12;
                  break;
                case 9:
                  _context2.prev = 9;
                  _context2.t0 = _context2["catch"](1);
                  after();
                case 12:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, null, [[1, 9]]);
          }));
          return function (_x3) {
            return _ref.apply(this, arguments);
          };
        }(), after);
      } else {
        if (after != null) after();
      }
    },
    // Add a piece of new data to a property. Invoked by child components, in order to add data (for reactivity reasons).
    add: function add(property, value) {
      var me = this;
      new EcAsyncHelper().each(me.getAllTypes(value), function (type, callback) {
        me.loadSchema(callback, type);
      }, /*#__PURE__*/Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee3() {
        var expanded;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (me.expandedThing[property] === undefined || me.expandedThing[property] == null) {
                me.expandedThing[property] = [];
              }
              if (!EcArray.isArray(me.expandedThing[property])) {
                me.expandedThing[property] = [me.expandedThing[property]];
              }
              if (!(value["@value"] == null)) {
                _context3.next = 15;
                break;
              }
              _context3.prev = 3;
              _context3.next = 6;
              return jsonld.expand(JSON.parse(value.toJson()));
            case 6:
              expanded = _context3.sent;
              me.expandedThing[property].push(me.reactify(expanded[0]));
              _context3.next = 13;
              break;
            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](3);
              appError(_context3.t0);
            case 13:
              _context3.next = 16;
              break;
            case 15:
              me.expandedThing[property].push(value);
            case 16:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[3, 10]]);
      })));
    },
    // Removes a piece of data from a property. Invoked by child components, in order to remove data (for reactivity reasons).
    remove: function remove(property, index) {
      if (!EcArray.isArray(this.expandedThing[property])) {
        this.expandedThing[property] = [this.expandedThing[property]];
      }
      this.expandedThing[property].splice(index, 1);
      this.save();
    },
    // Changes a piece of data. Invoked by child components, in order to change a piece of data to something else (for reactivity reasons).
    update: function update(property, index, value) {
      if (index == null) {
        this.expandedThing[property] = value;
      } else {
        this.expandedThing[property][index] = value;
      }
    },
    // Saves this thing to the location specified by its @id.
    save: function () {
      var _save = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee4() {
        var saver, me, compacted, rld;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              // TODO: If repo isn't defined, save to its @id location.
              saver = this;
              me = this;
            case 2:
              if (!(saver.expandedThing["@id"] == null || saver.expandedThing["@id"] === undefined)) {
                _context4.next = 8;
                break;
              }
              saver = saver.$parent.$parent;
              if (!(saver.expandedThing == null)) {
                _context4.next = 6;
                break;
              }
              return _context4.abrupt("return", "Could not save.");
            case 6:
              _context4.next = 2;
              break;
            case 8:
              _context4.prev = 8;
              _context4.next = 11;
              return jsonld.compact(this.stripEmptyArrays(this.expandedThing), this.$store.state.lode.rawSchemata[this.context]);
            case 11:
              compacted = _context4.sent;
              if (!compacted) {
                _context4.next = 24;
                break;
              }
              rld = new EcRemoteLinkedData();
              rld.copyFrom(compacted);
              rld.context = me.context;
              if (rld.signature && !EcArray.isArray(rld.signature)) {
                rld.signature = [rld.signature];
              }
              delete rld["@context"];
              if (rld.owner && !EcArray.isArray(rld.owner)) {
                rld.owner = [rld.owner];
              }
              if (!(me.$store.state.editor && me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[rld.id] !== true)) {
                _context4.next = 23;
                break;
              }
              _context4.next = 22;
              return EcEncryptedValue.toEncryptedValue(rld);
            case 22:
              rld = _context4.sent;
            case 23:
              repo.saveTo(rld, appLog, appError);
            case 24:
              _context4.next = 29;
              break;
            case 26:
              _context4.prev = 26;
              _context4.t0 = _context4["catch"](8);
              appError(_context4.t0);
            case 29:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[8, 26]]);
      }));
      function save() {
        return _save.apply(this, arguments);
      }
      return save;
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
    // Gets all the fully qualfied type names (qualified by the @context) of all the objects in this Thing.
    getAllTypes: function getAllTypes(o, context) {
      // TODO: Use canonical type identifiers from expandedThing, so that we don't rely on @context.
      var types = [];
      if (o != null && o.context != null) {
        context = o.context;
      }
      if (EcArray.isArray(o)) {
        for (var i = 0; i < o.length; i++) {
          types = types.concat(this.getAllTypes(o[i], context));
        }
      } else if (EcObject.isObject(o)) {
        if (o.type != null) {
          if (o.context == null) o.context = context;
          types.push(o.context + (o.context.endsWith("/") ? "" : "/") + o.type);
        }
        if (o["@type"] != null) {
          if (o["@context"] == null) o["@context"] = context;
          // Avoid problem with CASE imports that have nested objected. Probably a better way to do this.
          if (o["@type"].indexOf("schema:") === -1) {
            types.push(o["@context"] + (o["@context"].endsWith("/") ? "" : "/") + o["@type"]);
          }
        }
        for (var key in o) {
          types = types.concat(this.getAllTypes(o[key], context));
        }
      }
      return types;
    },
    removeObject: function removeObject() {
      this.$emit('remove-object', this.originalThing);
    },
    resolveNameFromUrlNotInCass: function resolveNameFromUrlNotInCass(url) {
      var me = this;
      // If not in repo, do an XML HTTP Request
      me.get(url, null, null, function (data) {
        var name = null;
        if (data && data[0] !== "<") {
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
        me.name = name;
      }, function (error) {
        appLog(error);
      });
    },
    resolveNameFromUrl: function resolveNameFromUrl(url) {
      var me = this;
      // Try repo first to use cache if possible
      EcRepository.get(url, function (success) {
        if (!success) {
          return me.resolveNameFromUrlNotInCass(url);
        }
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
        me.name = name;
      }, function (failure) {
        me.resolveNameFromUrlNotInCass(url);
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
    allowPropertyEdits: function allowPropertyEdits(key) {
      if (key === "@id" || key === "ctid" || key === "registryURL") {
        return false;
      }
      if (this.profile && this.profile[key] && this.profile[key]["readOnly"] === true) {
        return false;
      }
      return this.canEdit;
    },
    moveUp: function moveUp() {
      this.$emit('move-up', this.originalThing.shortId(), this.index);
    },
    moveDown: function moveDown() {
      this.$emit('move-down', this.originalThing.shortId(), this.index);
    },
    moveRight: function moveRight() {
      this.$emit('move-right', this.originalThing.shortId(), this.index);
    },
    moveLeft: function moveLeft() {
      this.$emit('move-left', this.originalThing.shortId(), this.index);
    },
    displayHeading: function displayHeading(heading) {
      if (this.showAlways === true && this.showPossible === false) {
        if (this.alwaysProperties[heading] && EcObject.keys(this.alwaysProperties[heading]).length > 0) {
          return heading;
        }
      } else if (this.showAlways === false && this.showPossible == null) {
        if (this.viewProperties[heading] && EcObject.keys(this.viewProperties[heading]).length > 0) {
          return heading;
        }
      } else if (this.showPossible === true && EcObject.keys(this.possibleProperties[heading]).length > 0) {
        return heading;
      }
      return null;
    },
    select: function select(key, checked) {
      this.$emit('select', key, checked);
    },
    getPropertiesFromProfile: function getPropertiesFromProfile(result, type) {
      if (this.profile[type] == null) return null;
      for (var i = 0; i < this.profile[type].length; i++) {
        var prop = this.profile[type][i];
        var heading = "";
        if (this.profile[prop] && this.profile[prop]["heading"]) {
          heading = this.profile[prop]["heading"];
        }
        if (result[heading] == null && result[heading] === undefined) {
          result[heading] = {};
        }
        if ((this.$store.getters['editor/conceptMode'] || this.$store.getters['editor/progressionMode']) && (prop === "http://www.w3.org/2004/02/skos/core#broader" || prop === "http://www.w3.org/2004/02/skos/core#narrower")) {
          continue;
        }
        if (this.profile[prop] && this.profile[prop]["valuesIndexed"]) {
          if (this.$store.state.editor.queryParams.ceasnDataFields === "true" && (prop === "hasChild" || prop === "isChildOf")) {
            continue;
          } else if (this.$store.state.editor.queryParams.ceasnDataFields !== "true" && (prop === "narrows" || prop === "broadens")) {
            continue;
          }
          var f = this.profile[prop]["valuesIndexed"];
          f = f();
          if (f && f[this.obj.shortId()]) {
            result[heading][prop] = this.profile[prop];
          }
        } else if (this.expandedThing[prop] != null && this.expandedThing[prop].length !== 0) {
          result[heading][prop] = this.profile[prop];
        }
      }
      return result;
    },
    setUnknownName: function setUnknownName(prop) {
      this.expandedThing[prop] = [{
        "@value": "Unknown name"
      }];
    }
  },
  watch: {
    canEdit: function canEdit() {
      this.showAlways = true;
      this.showPossible = false;
    },
    changedObject: function () {
      var _changedObject = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee5() {
        var type, encryptedType, encryptedThing, returnObject, thing;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              if (!(this.changedObject && this.view === "importLight")) {
                _context5.next = 5;
                break;
              }
              this.load();
              this.$store.commit('editor/changedObject', null);
              _context5.next = 33;
              break;
            case 5:
              if (!(this.changedObject && (this.changedObject === this.uri || this.originalThing && this.changedObject === this.originalThing.shortId()))) {
                _context5.next = 33;
                break;
              }
              if (this.uri) {
                this.resolveNameFromUrl(this.uri);
              }
              type = "Ec" + (this.obj ? this.obj.type : this.shortType);
              if (!(type === "EcEncryptedValue")) {
                _context5.next = 23;
                break;
              }
              encryptedType = "Ec" + this.obj.encryptedType;
              _context5.next = 12;
              return EcRepository.get(this.changedObject);
            case 12:
              encryptedThing = _context5.sent;
              returnObject = new window[encryptedType]();
              _context5.t0 = returnObject;
              _context5.next = 17;
              return EcEncryptedValue.fromEncryptedValue(encryptedThing);
            case 17:
              _context5.t1 = _context5.sent;
              _context5.t0.copyFrom.call(_context5.t0, _context5.t1);
              this.obj = returnObject;
              this.load();
              _context5.next = 32;
              break;
            case 23:
              if (!(type && window[type] && window[type].get)) {
                _context5.next = 31;
                break;
              }
              _context5.next = 26;
              return window[type].get(this.changedObject);
            case 26:
              thing = _context5.sent;
              this.obj = thing;
              this.load();
              _context5.next = 32;
              break;
            case 31:
              if (type && window[type]) {
                appLog("Can't get type: " + type);
              }
            case 32:
              this.$store.commit('editor/changedObject', null);
            case 33:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function changedObject() {
        return _changedObject.apply(this, arguments);
      }
      return changedObject;
    }(),
    properties: function properties() {
      if (this.properties === "primary") {
        this.showAlways = true;
        this.showPossible = false;
      } else if (this.properties === "secondary") {
        this.showAlways = false;
        this.showPossible = null;
      } else if (this.properties === "tertiary") {
        this.showAlways = false;
        this.showPossible = true;
      }
    },
    uri: function uri() {
      this.load();
    },
    obj: function obj() {
      if (this.obj && this.originalThing && this.obj.shortId() !== this.originalThing.shortId()) {
        this.load();
      }
    }
  }
});
// CONCATENATED MODULE: ./src/lode/components/Thing.vue?vue&type=script&lang=js
 /* harmony default export */ var components_Thingvue_type_script_lang_js = (Thingvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/lode/components/Thing.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_Thingvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Thing = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=chunk-2d0a4fe9.3b2bebc7.js.map