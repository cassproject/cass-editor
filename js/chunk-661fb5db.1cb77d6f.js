(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-661fb5db","chunk-25a2af2a","chunk-25a2af2a"],{

/***/ "03d5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"fffa3e18-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/ExportOptionsModal.vue?vue&type=template&id=358b6a2a




var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('modal-template', {
    attrs: {
      "type": "primary",
      "size": "small",
      "active": true
    },
    on: {
      "close": _vm.closeModal
    }
  }, [_c('template', {
    slot: "modal-header"
  }, [_vm._v(" " + _vm._s(_vm.title || 'Export') + " ")]), _c('template', {
    slot: "modal-body"
  }, [_c('section', [_c('div', {
    staticClass: "field"
  }, [_c('div', {
    staticClass: "control"
  }, [_c('div', {
    staticClass: "select is-primary is-fullwidth"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.selectedExportOption,
      expression: "selectedExportOption"
    }],
    on: {
      "change": function change($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.selectedExportOption = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
      }
    }
  }, [_c('option', {
    attrs: {
      "selected": "",
      "value": ""
    }
  }, [_vm._v(" Select an option ")]), _vm._l(_vm.exportOptions, function (option, index) {
    return _c('option', {
      key: index,
      domProps: {
        "value": option.value
      }
    }, [_vm._v(" " + _vm._s(option.name) + " ")]);
  })], 2)])])])])]), _c('template', {
    slot: "modal-foot"
  }, [_c('button', {
    staticClass: "button is-outlined is-dark",
    on: {
      "click": _vm.closeModal
    }
  }, [_c('span', [_vm._v(" Cancel ")]), _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-times-circle"
  })])]), _c('button', {
    staticClass: "export-confirm button is-outlined is-info",
    attrs: {
      "disabled": _vm.working
    },
    on: {
      "click": _vm.confirm
    }
  }, [_c('span', [_vm._v(" Export file ")]), _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-download"
  })])])])], 2);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/modalContent/ExportOptionsModal.vue?vue&type=template&id=358b6a2a

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
var regeneratorRuntime = __webpack_require__("c7eb");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__("5319");

// EXTERNAL MODULE: ./src/components/modalContent/ModalTemplate.vue + 4 modules
var ModalTemplate = __webpack_require__("af07");

// EXTERNAL MODULE: ./node_modules/file-saver/dist/FileSaver.min.js
var FileSaver_min = __webpack_require__("21a6");
var FileSaver_min_default = /*#__PURE__*/__webpack_require__.n(FileSaver_min);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/ExportOptionsModal.vue?vue&type=script&lang=js






/* harmony default export */ var ExportOptionsModalvue_type_script_lang_js = ({
  name: 'ExportOptionsModal',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  components: {
    ModalTemplate: ModalTemplate["a" /* default */]
  },
  data: function data() {
    return {
      selectedExportOption: '',
      repo: window.repo,
      working: false
    };
  },
  computed: {
    obj: function obj() {
      return this.$store.getters['editor/itemToExport'];
    },
    exportOptions: function exportOptions() {
      if (this.objType.indexOf("conceptscheme") !== -1) {
        return [{
          name: "CASS (JSON-LD)",
          value: "jsonld"
        }, {
          name: "CaSS (RDF Quads)",
          value: "rdfQuads"
        }, {
          name: "CaSS (RDF+XML)",
          value: "rdfXml"
        }, {
          name: "CaSS (Turtle)",
          value: "turtle"
        }, {
          name: "Credential Engine ASN (JSON-LD)",
          value: "ctdlasnJsonld"
        }];
      } else if (this.objType.indexOf("concept") !== -1) {
        return [{
          name: "SKOS (JSON-LD)",
          value: "jsonld"
        }, {
          name: "SKOS (RDF Quads)",
          value: "rdfQuads"
        }, {
          name: "SKOS (RDF+XML)",
          value: "rdfXml"
        }, {
          name: "SKOS (Turtle)",
          value: "turtle"
        }];
      } else if (this.objType.indexOf("framework") !== -1) {
        return [{
          name: "Achievement Standards Network (RDF+XML)",
          value: "asn"
        }, {
          name: "CASS (JSON-LD)",
          value: "jsonld"
        }, {
          name: "CASS (RDF Quads)",
          value: "rdfQuads"
        }, {
          name: "CASS (RDF+XML)",
          value: "rdfXml"
        }, {
          name: "CASS (Turtle)",
          value: "turtle"
        }, {
          name: "Credential Engine ASN (JSON-LD)",
          value: "ctdlasnJsonld"
        }, {
          name: "Credential Engine ASN (CSV)",
          value: "ctdlasnCsv"
        }, {
          name: "Table (CSV)",
          value: "csv"
        }, {
          name: "IMS Global CASE (JSON)",
          value: "case"
        }, {
          name: "Shareable Competency Definitions (JSON)",
          value: "scd"
        }];
      } else if (this.objType.indexOf("competency") !== -1) {
        return [{
          name: "CASS (JSON-LD)",
          value: "jsonld"
        }, {
          name: "CASS (RDF Quads)",
          value: "rdfQuads"
        }, {
          name: "CASS (RDF+XML)",
          value: "rdfXml"
        }, {
          name: "CASS (Turtle)",
          value: "turtle"
        }, {
          name: "Credential Engine ASN (JSON-LD)",
          value: "ctdlasnJsonld"
        }, {
          name: "IMS Global CASE (JSON)",
          value: "case"
        }, {
          name: "Shareable Competency Definitions (JSON)",
          value: "scd"
        }];
      } else {
        return [];
      }
    },
    objType: function objType() {
      return this.obj.type.toLowerCase();
    }
  },
  mounted: function mounted() {},
  methods: {
    confirm: function confirm() {
      var _this = this;
      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee() {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _this.working = true;
              _context.next = 3;
              return _this.exportObject();
            case 3:
              _this.working = false;
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    closeModal: function closeModal() {
      this.$store.commit('app/closeModal');
    },
    exportObject: function () {
      var _exportObject = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee2() {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (!(this.objType.indexOf("conceptscheme") !== -1)) {
                _context2.next = 5;
                break;
              }
              _context2.next = 3;
              return this.exportScheme();
            case 3:
              _context2.next = 18;
              break;
            case 5:
              if (!(this.objType.indexOf("concept") !== -1)) {
                _context2.next = 10;
                break;
              }
              _context2.next = 8;
              return this.exportConcept();
            case 8:
              _context2.next = 18;
              break;
            case 10:
              if (!(this.objType.indexOf("framework") !== -1)) {
                _context2.next = 15;
                break;
              }
              _context2.next = 13;
              return this.exportFramework();
            case 13:
              _context2.next = 18;
              break;
            case 15:
              if (!(this.objType.indexOf("competency") !== -1)) {
                _context2.next = 18;
                break;
              }
              _context2.next = 18;
              return this.exportCompetency();
            case 18:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function exportObject() {
        return _exportObject.apply(this, arguments);
      }
      return exportObject;
    }(),
    exportConcept: function () {
      var _exportConcept = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee3() {
        var exportType, concept, guid, link;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              exportType = this.selectedExportOption;
              concept = this.obj;
              if (EcRepository.shouldTryUrl(concept.id) === false && concept.id.indexOf(this.repo.selectedServer) === -1) {
                guid = EcCrypto.md5(concept.shortId());
              } else {
                guid = concept.getGuid();
              }
              link = this.repo.selectedServer + "data/" + guid;
              if (!(exportType === "jsonld")) {
                _context3.next = 9;
                break;
              }
              _context3.next = 7;
              return this.exportJsonld(link);
            case 7:
              _context3.next = 22;
              break;
            case 9:
              if (!(exportType === "rdfQuads")) {
                _context3.next = 14;
                break;
              }
              _context3.next = 12;
              return this.exportRdfQuads(link);
            case 12:
              _context3.next = 22;
              break;
            case 14:
              if (!(exportType === "rdfXml")) {
                _context3.next = 19;
                break;
              }
              _context3.next = 17;
              return this.exportRdfXml(link);
            case 17:
              _context3.next = 22;
              break;
            case 19:
              if (!(exportType === "turtle")) {
                _context3.next = 22;
                break;
              }
              _context3.next = 22;
              return this.exportTurtle(link);
            case 22:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function exportConcept() {
        return _exportConcept.apply(this, arguments);
      }
      return exportConcept;
    }(),
    exportScheme: function () {
      var _exportScheme = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee4() {
        var schemeExportGuid, schemeExportLink, exportType;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              schemeExportGuid = null;
              if (EcRepository.shouldTryUrl(this.obj.id) === false && this.obj.id.indexOf(this.repo.selectedServer) === -1) {
                schemeExportGuid = EcCrypto.md5(this.obj.shortId());
              } else {
                schemeExportGuid = this.obj.getGuid();
              }
              schemeExportLink = this.repo.selectedServer + "data/" + schemeExportGuid;
              exportType = this.selectedExportOption;
              if (!(exportType === "jsonld")) {
                _context4.next = 9;
                break;
              }
              _context4.next = 7;
              return this.exportJsonld(schemeExportLink);
            case 7:
              _context4.next = 27;
              break;
            case 9:
              if (!(exportType === "rdfQuads")) {
                _context4.next = 14;
                break;
              }
              _context4.next = 12;
              return this.exportRdfQuads(schemeExportLink);
            case 12:
              _context4.next = 27;
              break;
            case 14:
              if (!(exportType === "rdfXml")) {
                _context4.next = 19;
                break;
              }
              _context4.next = 17;
              return this.exportRdfXml(schemeExportLink);
            case 17:
              _context4.next = 27;
              break;
            case 19:
              if (!(exportType === "turtle")) {
                _context4.next = 24;
                break;
              }
              _context4.next = 22;
              return this.exportTurtle(schemeExportLink);
            case 22:
              _context4.next = 27;
              break;
            case 24:
              if (!(exportType === "ctdlasnJsonld")) {
                _context4.next = 27;
                break;
              }
              _context4.next = 27;
              return this.exportCtdlasnJsonld(schemeExportLink);
            case 27:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function exportScheme() {
        return _exportScheme.apply(this, arguments);
      }
      return exportScheme;
    }(),
    exportCompetency: function () {
      var _exportCompetency = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee5() {
        var exportType, selectedCompetency, guid, link;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              exportType = this.selectedExportOption;
              selectedCompetency = this.obj;
              if (EcRepository.shouldTryUrl(selectedCompetency.id) === false && selectedCompetency.id.indexOf(this.repo.selectedServer) === -1) {
                guid = EcCrypto.md5(selectedCompetency.shortId());
              } else {
                guid = selectedCompetency.getGuid();
              }
              link = this.repo.selectedServer + "data/" + guid;
              if (!(exportType === "jsonld")) {
                _context5.next = 9;
                break;
              }
              _context5.next = 7;
              return this.exportJsonld(link);
            case 7:
              _context5.next = 37;
              break;
            case 9:
              if (!(exportType === "rdfQuads")) {
                _context5.next = 14;
                break;
              }
              _context5.next = 12;
              return this.exportRdfQuads(link);
            case 12:
              _context5.next = 37;
              break;
            case 14:
              if (!(exportType === "rdfXml")) {
                _context5.next = 19;
                break;
              }
              _context5.next = 17;
              return this.exportRdfXml(link);
            case 17:
              _context5.next = 37;
              break;
            case 19:
              if (!(exportType === "turtle")) {
                _context5.next = 24;
                break;
              }
              _context5.next = 22;
              return this.exportTurtle(link);
            case 22:
              _context5.next = 37;
              break;
            case 24:
              if (!(exportType === "ctdlasnJsonld")) {
                _context5.next = 29;
                break;
              }
              _context5.next = 27;
              return this.exportCtdlasnJsonld(link);
            case 27:
              _context5.next = 37;
              break;
            case 29:
              if (!(exportType === "case")) {
                _context5.next = 34;
                break;
              }
              _context5.next = 32;
              return this.exportCaseItems(guid);
            case 32:
              _context5.next = 37;
              break;
            case 34:
              if (!(exportType === "scd")) {
                _context5.next = 37;
                break;
              }
              _context5.next = 37;
              return this.exportScd(link);
            case 37:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function exportCompetency() {
        return _exportCompetency.apply(this, arguments);
      }
      return exportCompetency;
    }(),
    exportFramework: function () {
      var _exportFramework = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee6() {
        var exportType, frameworkExportGuid, frameworkExportLink;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              exportType = this.selectedExportOption;
              frameworkExportGuid = null;
              if (EcRepository.shouldTryUrl(this.obj.id) === false && this.obj.id.indexOf(this.repo.selectedServer) === -1) {
                frameworkExportGuid = EcCrypto.md5(this.obj.shortId());
              } else {
                frameworkExportGuid = this.obj.getGuid();
              }
              frameworkExportLink = this.repo.selectedServer + "data/" + frameworkExportGuid;
              if (!(exportType === "asn")) {
                _context6.next = 9;
                break;
              }
              _context6.next = 7;
              return this.exportAsn(frameworkExportLink);
            case 7:
              _context6.next = 52;
              break;
            case 9:
              if (!(exportType === "jsonld")) {
                _context6.next = 14;
                break;
              }
              _context6.next = 12;
              return this.exportJsonld(frameworkExportLink);
            case 12:
              _context6.next = 52;
              break;
            case 14:
              if (!(exportType === "rdfQuads")) {
                _context6.next = 19;
                break;
              }
              _context6.next = 17;
              return this.exportRdfQuads(frameworkExportLink);
            case 17:
              _context6.next = 52;
              break;
            case 19:
              if (!(exportType === "rdfXml")) {
                _context6.next = 24;
                break;
              }
              _context6.next = 22;
              return this.exportRdfXml(frameworkExportLink);
            case 22:
              _context6.next = 52;
              break;
            case 24:
              if (!(exportType === "turtle")) {
                _context6.next = 29;
                break;
              }
              _context6.next = 27;
              return this.exportTurtle(frameworkExportLink);
            case 27:
              _context6.next = 52;
              break;
            case 29:
              if (!(exportType === "ctdlasnJsonld")) {
                _context6.next = 34;
                break;
              }
              _context6.next = 32;
              return this.exportCtdlasnJsonld(frameworkExportLink);
            case 32:
              _context6.next = 52;
              break;
            case 34:
              if (!(exportType === "ctdlasnCsv")) {
                _context6.next = 39;
                break;
              }
              _context6.next = 37;
              return this.exportCtdlasnCsv(frameworkExportLink);
            case 37:
              _context6.next = 52;
              break;
            case 39:
              if (!(exportType === "csv")) {
                _context6.next = 44;
                break;
              }
              _context6.next = 42;
              return this.exportCsv();
            case 42:
              _context6.next = 52;
              break;
            case 44:
              if (!(exportType === "case")) {
                _context6.next = 49;
                break;
              }
              _context6.next = 47;
              return this.exportCasePackages(frameworkExportGuid);
            case 47:
              _context6.next = 52;
              break;
            case 49:
              if (!(exportType === "scd")) {
                _context6.next = 52;
                break;
              }
              _context6.next = 52;
              return this.exportScd(frameworkExportLink);
            case 52:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function exportFramework() {
        return _exportFramework.apply(this, arguments);
      }
      return exportFramework;
    }(),
    exportAsn: function () {
      var _exportAsn = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee7(link) {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              window.open(link.replace("/data/", "/asn/"), '_blank');
            case 1:
            case "end":
              return _context7.stop();
          }
        }, _callee7);
      }));
      function exportAsn(_x) {
        return _exportAsn.apply(this, arguments);
      }
      return exportAsn;
    }(),
    exportJsonld: function () {
      var _exportJsonld = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee8(link) {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              window.open(link, '_blank');
            case 1:
            case "end":
              return _context8.stop();
          }
        }, _callee8);
      }));
      function exportJsonld(_x2) {
        return _exportJsonld.apply(this, arguments);
      }
      return exportJsonld;
    }(),
    exportRdfQuads: function () {
      var _exportRdfQuads = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee9(link) {
        var fileName, success;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              if (this.objType.indexOf("conceptscheme") !== -1) {
                fileName = schema.Thing.getDisplayStringFrom(this.obj["dcterms:title"]);
              } else if (this.objType.indexOf("concept") !== -1) {
                fileName = schema.Thing.getDisplayStringFrom(this.obj["skos:prefLabel"]);
              } else {
                fileName = this.obj.getName();
              }
              _context9.prev = 1;
              _context9.next = 4;
              return this.get(link, null, {
                "Accept": "text/n4"
              });
            case 4:
              success = _context9.sent;
              _context9.next = 7;
              return this.download(fileName + ".n4", success);
            case 7:
              _context9.next = 12;
              break;
            case 9:
              _context9.prev = 9;
              _context9.t0 = _context9["catch"](1);
              appLog(_context9.t0);
            case 12:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this, [[1, 9]]);
      }));
      function exportRdfQuads(_x3) {
        return _exportRdfQuads.apply(this, arguments);
      }
      return exportRdfQuads;
    }(),
    exportRdfXml: function () {
      var _exportRdfXml = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee10(link) {
        var fileName, success;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              if (this.objType.indexOf("conceptscheme") !== -1) {
                fileName = schema.Thing.getDisplayStringFrom(this.obj["dcterms:title"]);
              } else if (this.objType.indexOf("concept") !== -1) {
                fileName = schema.Thing.getDisplayStringFrom(this.obj["skos:prefLabel"]);
              } else {
                fileName = this.obj.getName();
              }
              _context10.prev = 1;
              _context10.next = 4;
              return this.get(link, null, {
                "Accept": "application/rdf+xml"
              });
            case 4:
              success = _context10.sent;
              _context10.next = 7;
              return this.download(fileName + ".rdf.xml", success);
            case 7:
              _context10.next = 12;
              break;
            case 9:
              _context10.prev = 9;
              _context10.t0 = _context10["catch"](1);
              appLog(_context10.t0);
            case 12:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this, [[1, 9]]);
      }));
      function exportRdfXml(_x4) {
        return _exportRdfXml.apply(this, arguments);
      }
      return exportRdfXml;
    }(),
    exportTurtle: function () {
      var _exportTurtle = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee11(link) {
        var fileName, success;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              if (this.objType.indexOf("conceptscheme") !== -1) {
                fileName = schema.Thing.getDisplayStringFrom(this.obj["dcterms:title"]);
              } else if (this.objType.indexOf("concept") !== -1) {
                fileName = schema.Thing.getDisplayStringFrom(this.obj["skos:prefLabel"]);
              } else {
                fileName = this.obj.getName();
              }
              _context11.prev = 1;
              _context11.next = 4;
              return this.get(link, null, {
                "Accept": "text/turtle"
              });
            case 4:
              success = _context11.sent;
              _context11.next = 7;
              return this.download(fileName + ".turtle", success);
            case 7:
              _context11.next = 12;
              break;
            case 9:
              _context11.prev = 9;
              _context11.t0 = _context11["catch"](1);
              appLog(_context11.t0);
            case 12:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this, [[1, 9]]);
      }));
      function exportTurtle(_x5) {
        return _exportTurtle.apply(this, arguments);
      }
      return exportTurtle;
    }(),
    exportCtdlasnJsonld: function exportCtdlasnJsonld(link) {
      window.open(link.replace("/data/", "/ceasn/"), '_blank');
    },
    exportScd: function exportScd(link) {
      window.open(link.replace("/data/", "/scd/"), '_blank');
    },
    exportCtdlasnCsv: function () {
      var _exportCtdlasnCsv = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee12(link) {
        var me, success;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              me = this;
              _context12.prev = 1;
              _context12.next = 4;
              return EcRemote.getExpectingString(link.replace("/data/", "/ceasn/"), null);
            case 4:
              success = _context12.sent;
              CSVExport.exportCTDLASN(success, me.obj.getName());
              _context12.next = 11;
              break;
            case 8:
              _context12.prev = 8;
              _context12.t0 = _context12["catch"](1);
              appLog(_context12.t0);
            case 11:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this, [[1, 8]]);
      }));
      function exportCtdlasnCsv(_x6) {
        return _exportCtdlasnCsv.apply(this, arguments);
      }
      return exportCtdlasnCsv;
    }(),
    exportCsv: function exportCsv() {
      CSVExport.exportFramework(this.obj.id, appLog, appLog);
    },
    exportCasePackages: function exportCasePackages(guid) {
      window.open(this.repo.selectedServer + "ims/case/v1p0/CFPackages/" + guid, '_blank');
    },
    exportCaseItems: function exportCaseItems(guid) {
      window.open(this.repo.selectedServer + "ims/case/v1p0/CFItems/" + guid, '_blank');
    },
    download: function download(fileName, data) {
      var blob = new Blob([data], {
        type: "text/plain;charset=utf-8"
      });
      FileSaver_min_default()(blob, fileName);
    },
    get: function () {
      var _get = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee13(server, service, headers, success, failure) {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              return _context13.abrupt("return", this.$store.dispatch('editor/getThing', {
                server: server,
                service: service,
                headers: headers,
                success: success,
                failure: failure
              }));
            case 1:
            case "end":
              return _context13.stop();
          }
        }, _callee13, this);
      }));
      function get(_x7, _x8, _x9, _x10, _x11) {
        return _get.apply(this, arguments);
      }
      return get;
    }()
  }
});
// CONCATENATED MODULE: ./src/components/modalContent/ExportOptionsModal.vue?vue&type=script&lang=js
 /* harmony default export */ var modalContent_ExportOptionsModalvue_type_script_lang_js = (ExportOptionsModalvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/modalContent/ExportOptionsModal.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  modalContent_ExportOptionsModalvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ExportOptionsModal = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "21a6":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(a,b){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}})(this,function(){"use strict";function b(a,b){return"undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(a,b,c){var d=new XMLHttpRequest;d.open("GET",a),d.responseType="blob",d.onload=function(){g(d.response,b,c)},d.onerror=function(){console.error("could not download file")},d.send()}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send()}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,a=f.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),g=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i)})}}:function(b,d,e,g){if(g=g||open("","_blank"),g&&(g.document.title=g.document.body.innerText="downloading..."),"string"==typeof b)return c(b,d,e);var h="application/octet-stream"===b.type,i=/constructor/i.test(f.HTMLElement)||f.safari,j=/CriOS\/[\d]+/.test(navigator.userAgent);if((j||h&&i||a)&&"undefined"!=typeof FileReader){var k=new FileReader;k.onloadend=function(){var a=k.result;a=j?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),g?g.location.href=a:location=a,g=null},k.readAsDataURL(b)}else{var l=f.URL||f.webkitURL,m=l.createObjectURL(b);g?g.location=m:location.href=m,g=null,setTimeout(function(){l.revokeObjectURL(m)},4E4)}});f.saveAs=g.saveAs=g, true&&(module.exports=g)});

//# sourceMappingURL=FileSaver.min.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "62af":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "8d7e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalTemplate_vue_vue_type_style_index_0_id_1c4e04a7_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("62af");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalTemplate_vue_vue_type_style_index_0_id_1c4e04a7_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalTemplate_vue_vue_type_style_index_0_id_1c4e04a7_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "984b":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "af07":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"fffa3e18-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/ModalTemplate.vue?vue&type=template&id=1c4e04a7
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "modal cass-editor___modal",
    class: [{
      'is-active': _vm.active
    }, 'is-' + _vm.size, 'cass-editor__modal--' + _vm.content],
    attrs: {
      "id": "cass-modal"
    }
  }, [_c('div', {
    staticClass: "modal-background"
  }), _c('div', {
    staticClass: "modal-card",
    class: 'cass-editor__modal-card--' + _vm.size
  }, [_c('header', {
    staticClass: "modal-card-head is-size-4 has-text-weight-bold",
    class: ['has-background-' + _vm.type, 'has-text-' + _vm.fontColor]
  }, [_c('p', {
    staticClass: "modal-card-title"
  }, [_vm._t("modal-header")], 2), _vm.canClose ? _c('button', {
    staticClass: "delete",
    attrs: {
      "aria-label": "close"
    },
    on: {
      "click": function click($event) {
        _vm.$store.commit('app/closeModal');
        _vm.$emit('close');
      }
    }
  }) : _vm._e()]), _c('div', {
    staticClass: "modal-card-body has-text-dark"
  }, [_vm._t("modal-body")], 2), _c('footer', {
    staticClass: "modal-card-foot has-background-white"
  }, [_vm._t("modal-foot")], 2)])]);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/modalContent/ModalTemplate.vue?vue&type=template&id=1c4e04a7

// EXTERNAL MODULE: ./src/scss/modal-template.scss
var modal_template = __webpack_require__("984b");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/ModalTemplate.vue?vue&type=script&lang=js

/* harmony default export */ var ModalTemplatevue_type_script_lang_js = ({
  name: 'ModalTemplate',
  props: {
    canClose: {
      type: Boolean,
      default: true
    },
    active: {
      type: Boolean,
      default: false
    },
    type: {
      default: 'primary',
      type: String
    },
    fontColor: {
      type: String,
      default: 'white'
    },
    size: {
      type: String,
      default: 'medium'
    },
    content: {
      defualt: 'default',
      type: String
    }
  },
  data: function data() {
    return {};
  },
  computed: {}
});
// CONCATENATED MODULE: ./src/components/modalContent/ModalTemplate.vue?vue&type=script&lang=js
 /* harmony default export */ var modalContent_ModalTemplatevue_type_script_lang_js = (ModalTemplatevue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/modalContent/ModalTemplate.vue?vue&type=style&index=0&id=1c4e04a7&prod&lang=scss
var ModalTemplatevue_type_style_index_0_id_1c4e04a7_prod_lang_scss = __webpack_require__("8d7e");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/modalContent/ModalTemplate.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  modalContent_ModalTemplatevue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ModalTemplate = __webpack_exports__["a"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=chunk-661fb5db.1cb77d6f.js.map