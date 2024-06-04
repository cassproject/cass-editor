(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-2d0cbec1"],{

/***/ "4c73":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1efc2bba-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/lode/components/AssertionEditor.vue?vue&type=template&id=3d6d2e13
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "assertions-group"
  }, [_c('div', {
    staticClass: "assertions-buttons"
  }, [_c('div', {
    staticClass: "left-buttons"
  }, [_c('div', {
    staticClass: "button is-text",
    class: {
      'active': _vm.canAssertion
    },
    attrs: {
      "data-id": "positiveAssertionButton",
      "disabled": _vm.loading
    },
    on: {
      "click": _vm.handleCanClick
    }
  }, [_c('i', {
    class: _vm.canButtonIcon
  }), _vm._v(" " + _vm._s(_vm.canButtonText) + " ")]), _c('div', {
    staticClass: "button is-text",
    class: {
      'active': _vm.cannotAssertion
    },
    attrs: {
      "data-id": "negativeAssertionButton",
      "disabled": _vm.loading
    },
    on: {
      "click": _vm.handleCannotClick
    }
  }, [_c('i', {
    class: _vm.cantButtonIcon
  }), _vm._v(" " + _vm._s(_vm.cantButtonText) + " ")])]), _c('div', {
    staticClass: "right-button"
  }, [_vm.canAssertion ? _c('div', {
    staticClass: "button is-text",
    attrs: {
      "data-id": "badgeButton",
      "disabled": _vm.loading
    },
    on: {
      "click": _vm.handleBadgeClick
    }
  }, [_vm.badgeExists ? [_c('span', {
    staticClass: "text-icon"
  }, [_vm._v("-")]), _vm._v(" Remove Badge ")] : [_c('span', {
    staticClass: "text-icon"
  }, [_vm._v("+")]), _vm._v(" Add Badge ")]], 2) : _vm._e(), _vm.badgeExists ? _c('div', {
    staticClass: "button is-text",
    attrs: {
      "data-id": "viewBadgeButton"
    },
    on: {
      "click": _vm.viewBadge
    }
  }, [_vm._v(" View Badge ")]) : _vm._e()])]), _c('div', {
    staticClass: "assertions-input"
  }, [_vm.assertionExists ? _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.assertionText,
      expression: "assertionText"
    }],
    staticClass: "input is-narrow",
    attrs: {
      "disabled": _vm.loading,
      "type": "text",
      "placeholder": _vm.reasonPlaceholder
    },
    domProps: {
      "value": _vm.assertionText
    },
    on: {
      "keyup": function keyup($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
        return _vm.handleEvidenceAssertion.apply(null, arguments);
      },
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.assertionText = $event.target.value;
      }
    }
  }) : _vm._e()]), _vm.evidenceExplanation && _vm.assertionExists ? _c('small', {
    staticClass: "assertions-evidence"
  }, [_c('hr'), _c('ul', _vm._l(_vm.evidenceExplanation, function (evidenceThing, index) {
    return _c('li', {
      key: index,
      attrs: {
        "data-id": "evidenceElement"
      }
    }, [evidenceThing.url ? _c('a', {
      attrs: {
        "href": evidenceThing.url,
        "target": "_blank"
      }
    }, [_vm._v(" " + _vm._s(evidenceThing.text) + " ")]) : _c('span', [_vm._v(_vm._s(evidenceThing.text))]), _c('div', {
      staticClass: "button is-text",
      attrs: {
        "data-id": "removeEvidenceButton"
      },
      on: {
        "click": function click($event) {
          return _vm.handleUnevidenceAssertion(evidenceThing.original);
        }
      }
    }, [_c('i', {
      staticClass: "fas fa-times"
    })])]);
  }), 0)]) : _vm._e(), _vm.assertionsByOthers && _vm.assertionsByOthers.length > 0 ? _c('div', {
    staticClass: "assertions-others"
  }, _vm._l(_vm.assertionsByOthers, function (item) {
    return _c('Assertion', {
      key: _vm.uri + item.id,
      attrs: {
        "uri": item.id,
        "title": "Assertion from elsewhere"
      }
    });
  }), 1) : _vm._e()]);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/lode/components/AssertionEditor.vue?vue&type=template&id=3d6d2e13

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
var createForOfIteratorHelper = __webpack_require__("b85c");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
var regeneratorRuntime = __webpack_require__("c7eb");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__("3ca3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/lode/components/AssertionEditor.vue?vue&type=script&lang=js








/* harmony default export */ var AssertionEditorvue_type_script_lang_js = ({
  name: 'AssertionEditor',
  props: {
    uri: String
  },
  components: {
    Assertion: function Assertion() {
      return __webpack_require__.e(/* import() */ "chunk-2d21eb37").then(__webpack_require__.bind(null, "d74b"));
    }
  },
  data: function data() {
    return {
      loading: false,
      canAssertion: false,
      cannotAssertion: false,
      assertionText: '',
      badge: false,
      badgeLink: null,
      repo: window.repo,
      competentStateEah: null,
      evidence: null,
      evidenceExplanation: null,
      assertionsByOthers: [],
      iconAssertion: true
    };
  },
  created: function created() {},
  mounted: function mounted() {
    this.initAssertions();
  },
  computed: {
    badgeExists: function badgeExists() {
      return this.badge;
    },
    assertionExists: function assertionExists() {
      return this.canAssertion || this.cannotAssertion;
    },
    assertions: function assertions() {
      var _this = this;
      var assertions = this.$store.getters['editor/assertions'].filter(function (a) {
        return a.competency === EcRemoteLinkedData.trimVersionFromUrl(_this.uri);
      });
      return assertions;
    },
    me: function me() {
      return this.$store.getters['editor/getMe'];
    },
    subject: function subject() {
      return this.$store.getters['editor/getSubject'];
    },
    otherClaimsPhrase: function otherClaimsPhrase() {
      return "Others have made claims about " + (this.subject === this.me ? "you" : this.subjectPerson === null ? "them" : this.subjectPerson) + ". Click to expand.";
    },
    reasonPlaceholder: function reasonPlaceholder() {
      if (this.me === this.subject) {
        return 'do this because I...';
      } else {
        return 'do this because they...';
      }
    },
    canButtonText: function canButtonText() {
      if (this.me === this.subject) {
        return 'I can';
      } else {
        return 'They can';
      }
    },
    cantButtonText: function cantButtonText() {
      if (this.me === this.subject) {
        return "I can't";
      } else {
        return "They can't";
      }
    },
    canButtonIcon: function canButtonIcon() {
      if (this.canAssertion) {
        return 'far fa-check-circle';
      } else {
        return 'far fa-circle';
      }
    },
    cantButtonIcon: function cantButtonIcon() {
      if (this.cannotAssertion) {
        return 'far fa-check-square';
      } else {
        return 'far fa-square';
      }
    },
    subjectPerson: function subjectPerson() {
      return this.$store.getters['editor/getSubjectName'];
    }
  },
  methods: {
    initAssertions: function initAssertions() {
      var _this2 = this;
      this.canAssertion = false;
      this.cannotAssertion = false;
      this.assertionText = '';
      this.badge = false;
      this.badgeLink = null;
      this.competentStateEah = null;
      this.evidence = null;
      this.evidenceExplanation = null;
      this.assertionsByOthers = [];
      this.iconAssertion = true;
      if (this.competentStateEah != null) {
        this.competentStateEah.stop();
      }
      this.competentStateEah = new EcAsyncHelper();
      this.competentStateEah.each(this.assertions, function (assertion, callback) {
        if (assertion !== null) {
          assertion.getSubjectAsync(function (subject) {
            if (_this2.subject === subject.toPem()) {
              assertion.getAgentAsync(function (agent) {
                if (_this2.me === agent.toPem()) {
                  var negativeCallback = function negativeCallback() {
                    if (assertion.negative != null) {
                      assertion.getNegativeAsync(function (negative) {
                        if (negative) {
                          _this2.canAssertion = false;
                          _this2.cannotAssertion = true;
                          _this2.badge = false;
                        } else {
                          _this2.badge = assertion.hasReader(_this2.$store.getters['editor/badgePk']);
                          _this2.badgeLink = EcRemote.urlAppend(_this2.repo.selectedServer, "badge/assertion/") + assertion.getGuid();
                          _this2.canAssertion = true;
                          _this2.cannotAssertion = false;
                        }
                        callback();
                      }, callback);
                    } else {
                      _this2.canAssertion = true;
                      _this2.cannotAssertion = false;
                      _this2.badge = assertion.hasReader(_this2.$store.getters['editor/badgePk']);
                      _this2.badgeLink = EcRemote.urlAppend(_this2.repo.selectedServer, "badge/assertion/") + assertion.getGuid();
                      callback();
                    }
                  };
                  if (assertion.evidence != null) {
                    assertion.getEvidencesAsync(function (evidences) {
                      _this2.evidence = evidences;
                      _this2.$store.dispatch('editor/computeBecause', _this2.evidence).then(function (because) {
                        _this2.evidenceExplanation = because;
                      });
                      negativeCallback();
                    }, callback);
                  } else {
                    _this2.evidence = null;
                    _this2.evidenceExplanation = null;
                    negativeCallback();
                  }
                } else {
                  _this2.assertionsByOthers.push(assertion);
                  callback();
                }
              }, callback);
            } else {
              callback();
            }
          }, callback);
        } else {
          callback();
        }
      }, function () {
        // TODO
      });
    },
    handleEvidenceAssertion: function () {
      var _handleEvidenceAssertion = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee() {
        var _this3 = this;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              this.loading = true;
              _context.prev = 1;
              _context.next = 4;
              return this.evidenceAssertion();
            case 4:
              _context.next = 9;
              break;
            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](1);
              appError(_context.t0);
            case 9:
              _context.prev = 9;
              this.$nextTick(function () {
                _this3.loading = false;
              });
              return _context.finish(9);
            case 12:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[1, 6, 9, 12]]);
      }));
      function handleEvidenceAssertion() {
        return _handleEvidenceAssertion.apply(this, arguments);
      }
      return handleEvidenceAssertion;
    }(),
    handleUnevidenceAssertion: function () {
      var _handleUnevidenceAssertion = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee2(url) {
        var _this4 = this;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              this.loading = true;
              _context2.prev = 1;
              _context2.next = 4;
              return this.unevidenceAssertion(url);
            case 4:
              _context2.next = 9;
              break;
            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](1);
              appError(_context2.t0);
            case 9:
              _context2.prev = 9;
              this.$nextTick(function () {
                _this4.loading = false;
              });
              return _context2.finish(9);
            case 12:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[1, 6, 9, 12]]);
      }));
      function handleUnevidenceAssertion(_x) {
        return _handleUnevidenceAssertion.apply(this, arguments);
      }
      return handleUnevidenceAssertion;
    }(),
    handleBadgeClick: function () {
      var _handleBadgeClick = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee3() {
        var _this5 = this;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              this.loading = true;
              _context3.prev = 1;
              if (!this.badge) {
                _context3.next = 7;
                break;
              }
              _context3.next = 5;
              return this.revokeBadge();
            case 5:
              _context3.next = 9;
              break;
            case 7:
              _context3.next = 9;
              return this.generateBadge();
            case 9:
              _context3.next = 14;
              break;
            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3["catch"](1);
              appError(_context3.t0);
            case 14:
              _context3.prev = 14;
              this.$nextTick(function () {
                _this5.loading = false;
              });
              return _context3.finish(14);
            case 17:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[1, 11, 14, 17]]);
      }));
      function handleBadgeClick() {
        return _handleBadgeClick.apply(this, arguments);
      }
      return handleBadgeClick;
    }(),
    handleCanClick: function () {
      var _handleCanClick = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee4() {
        var _this6 = this;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              if (!this.loading) {
                _context4.next = 2;
                break;
              }
              return _context4.abrupt("return");
            case 2:
              this.loading = true;
              _context4.prev = 3;
              if (!this.canAssertion) {
                _context4.next = 11;
                break;
              }
              _context4.next = 7;
              return this.revokeBadge();
            case 7:
              _context4.next = 9;
              return this.revokeCanAssertion();
            case 9:
              _context4.next = 16;
              break;
            case 11:
              if (!this.cannotAssertion) {
                _context4.next = 14;
                break;
              }
              _context4.next = 14;
              return this.revokeCannotAssertion();
            case 14:
              _context4.next = 16;
              return this.generateCanAssertion();
            case 16:
              _context4.next = 21;
              break;
            case 18:
              _context4.prev = 18;
              _context4.t0 = _context4["catch"](3);
              appError(_context4.t0);
            case 21:
              _context4.prev = 21;
              this.$nextTick(function () {
                _this6.loading = false;
              });
              return _context4.finish(21);
            case 24:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[3, 18, 21, 24]]);
      }));
      function handleCanClick() {
        return _handleCanClick.apply(this, arguments);
      }
      return handleCanClick;
    }(),
    handleCannotClick: function () {
      var _handleCannotClick = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee5() {
        var _this7 = this;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              if (!this.loading) {
                _context5.next = 2;
                break;
              }
              return _context5.abrupt("return");
            case 2:
              this.loading = true;
              _context5.prev = 3;
              if (!this.cannotAssertion) {
                _context5.next = 9;
                break;
              }
              _context5.next = 7;
              return this.revokeCannotAssertion();
            case 7:
              _context5.next = 16;
              break;
            case 9:
              if (!this.canAssertion) {
                _context5.next = 14;
                break;
              }
              _context5.next = 12;
              return this.revokeBadge();
            case 12:
              _context5.next = 14;
              return this.revokeCanAssertion();
            case 14:
              _context5.next = 16;
              return this.generateCannotAssertion();
            case 16:
              _context5.next = 21;
              break;
            case 18:
              _context5.prev = 18;
              _context5.t0 = _context5["catch"](3);
              appError(_context5.t0);
            case 21:
              _context5.prev = 21;
              this.$nextTick(function () {
                _this7.loading = false;
              });
              return _context5.finish(21);
            case 24:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this, [[3, 18, 21, 24]]);
      }));
      function handleCannotClick() {
        return _handleCannotClick.apply(this, arguments);
      }
      return handleCannotClick;
    }(),
    generateBadge: function () {
      var _generateBadge = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee8() {
        var _this8 = this;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              return _context8.abrupt("return", new Promise(function (resolve, reject) {
                EcCompetency.get(_this8.uri, function (c) {
                  if (_this8.assertions.length === 0) {
                    return;
                  }
                  var eah = new EcAsyncHelper();
                  eah.each(_this8.assertions, function (assertion, callback) {
                    if (c.isId(assertion.competency)) {
                      assertion.getSubjectAsync(function (subject) {
                        if (_this8.subject === subject.toPem()) {
                          assertion.getAgentAsync( /*#__PURE__*/function () {
                            var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee7(agent) {
                              return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee7$(_context7) {
                                while (1) switch (_context7.prev = _context7.next) {
                                  case 0:
                                    if (!(_this8.me === agent.toPem())) {
                                      _context7.next = 10;
                                      break;
                                    }
                                    if (!(assertion.negative == null)) {
                                      _context7.next = 7;
                                      break;
                                    }
                                    _context7.next = 4;
                                    return assertion.addReader(_this8.$store.getters['editor/badgePk']);
                                  case 4:
                                    EcRepository.save(assertion, function () {
                                      // this.$store.commit('editor/addAssertion', assertion);
                                      _this8.badgeLink = EcRemote.urlAppend(_this8.repo.selectedServer, "badge/assertion/") + assertion.getGuid();
                                      _this8.badge = true;
                                      callback();
                                    }, callback);
                                    _context7.next = 8;
                                    break;
                                  case 7:
                                    assertion.getNegativeAsync( /*#__PURE__*/function () {
                                      var _ref2 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee6(negative) {
                                        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee6$(_context6) {
                                          while (1) switch (_context6.prev = _context6.next) {
                                            case 0:
                                              if (negative) {
                                                _context6.next = 6;
                                                break;
                                              }
                                              _context6.next = 3;
                                              return assertion.addReader(_this8.$store.getters['editor/badgePk']);
                                            case 3:
                                              EcRepository.save(assertion, function () {
                                                // this.$store.commit('editor/addAssertion', assertion);
                                                _this8.badgeLink = EcRemote.urlAppend(_this8.repo.selectedServer, "badge/assertion/") + assertion.getGuid();
                                                _this8.badge = true;
                                                callback();
                                              }, callback);
                                              _context6.next = 7;
                                              break;
                                            case 6:
                                              callback();
                                            case 7:
                                            case "end":
                                              return _context6.stop();
                                          }
                                        }, _callee6);
                                      }));
                                      return function (_x3) {
                                        return _ref2.apply(this, arguments);
                                      };
                                    }(), callback);
                                  case 8:
                                    _context7.next = 11;
                                    break;
                                  case 10:
                                    callback();
                                  case 11:
                                  case "end":
                                    return _context7.stop();
                                }
                              }, _callee7);
                            }));
                            return function (_x2) {
                              return _ref.apply(this, arguments);
                            };
                          }(), callback);
                        } else {
                          callback();
                        }
                      }, callback);
                    } else {
                      callback();
                    }
                  }, function () {
                    resolve();
                  });
                }, reject);
              }));
            case 1:
            case "end":
              return _context8.stop();
          }
        }, _callee8);
      }));
      function generateBadge() {
        return _generateBadge.apply(this, arguments);
      }
      return generateBadge;
    }(),
    viewBadge: function viewBadge() {
      window.open(this.badgeLink, '_blank');
    },
    revokeBadge: function () {
      var _revokeBadge = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee9() {
        var _this9 = this;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              return _context9.abrupt("return", new Promise(function (resolve, reject) {
                EcCompetency.get(_this9.uri, function (c) {
                  if (_this9.assertions.length === 0) {
                    return;
                  }
                  var eah = new EcAsyncHelper();
                  eah.each(_this9.assertions, function (assertion, callback) {
                    if (c.isId(assertion.competency)) {
                      assertion.getSubjectAsync(function (subject) {
                        if (_this9.subject === subject.toPem()) {
                          assertion.getAgentAsync(function (agent) {
                            if (_this9.me === agent.toPem()) {
                              if (assertion.negative == null) {
                                assertion.removeReader(_this9.$store.getters['editor/badgePk']);
                                EcRepository.save(assertion, function () {
                                  // this.$store.commit('editor/addAssertion', assertion);
                                  _this9.badgeLink = null;
                                  _this9.badge = false;
                                  callback();
                                }, callback);
                              } else {
                                assertion.getNegativeAsync(function (negative) {
                                  if (!negative) {
                                    assertion.removeReader(_this9.$store.getters['editor/badgePk']);
                                    EcRepository.save(assertion, function () {
                                      // this.$store.commit('editor/addAssertion', assertion);
                                      _this9.badgeLink = null;
                                      _this9.badge = false;
                                      callback();
                                    }, callback);
                                  } else {
                                    callback();
                                  }
                                }, callback);
                              }
                            } else {
                              callback();
                            }
                          }, callback);
                        } else {
                          callback();
                        }
                      }, callback);
                    } else {
                      callback();
                    }
                  }, function () {
                    resolve();
                  });
                }, reject);
              }));
            case 1:
            case "end":
              return _context9.stop();
          }
        }, _callee9);
      }));
      function revokeBadge() {
        return _revokeBadge.apply(this, arguments);
      }
      return revokeBadge;
    }(),
    revokeCanAssertion: function revokeCanAssertion() {
      var _this10 = this;
      return new Promise(function (resolve, reject) {
        EcCompetency.get(_this10.uri, function (c) {
          if (_this10.assertions.length === 0) {
            return;
          }
          var eah = new EcAsyncHelper();
          eah.each(_this10.assertions, function (assertion, callback) {
            if (c.isId(assertion.competency)) {
              assertion.getSubjectAsync(function (subject) {
                if (_this10.subject === subject.toPem()) {
                  assertion.getAgentAsync(function (agent) {
                    if (_this10.me === agent.toPem()) {
                      if (assertion.negative === null) {
                        EcRepository._delete(assertion, function () {
                          _this10.$store.commit('editor/removeAssertion', assertion);
                          _this10.canAssertion = false;
                          callback();
                        }, callback);
                      } else {
                        assertion.getNegativeAsync(function (negative) {
                          if (!negative) {
                            EcRepository._delete(assertion, function () {
                              _this10.$store.commit('editor/removeAssertion', assertion);
                              _this10.canAssertion = false;
                              callback();
                            }, callback);
                          } else {
                            callback();
                          }
                        }, callback);
                      }
                    } else {
                      callback();
                    }
                  }, callback);
                } else {
                  callback();
                }
              }, callback);
            } else {
              callback();
            }
          }, function () {
            resolve();
          });
        }, reject);
      });
    },
    revokeCannotAssertion: function revokeCannotAssertion() {
      var _this11 = this;
      return new Promise(function (resolve, reject) {
        EcCompetency.get(_this11.uri, function (c) {
          if (_this11.assertions.length === 0) {
            return;
          }
          var eah = new EcAsyncHelper();
          eah.each(_this11.assertions, function (assertion, callback) {
            if (c.isId(assertion.competency)) {
              assertion.getSubjectAsync(function (subject) {
                if (_this11.subject === subject.toPem()) {
                  assertion.getAgentAsync(function (agent) {
                    if (_this11.me === agent.toPem()) {
                      if (assertion.negative != null) {
                        assertion.getNegativeAsync(function (negative) {
                          if (negative) {
                            EcRepository._delete(assertion, function () {
                              _this11.$store.commit('editor/removeAssertion', assertion);
                              _this11.cannotAssertion = false;
                              callback();
                            }, callback);
                          } else {
                            callback();
                          }
                        }, callback);
                      }
                    } else callback();
                  }, callback);
                } else callback();
              }, callback);
            } else {
              callback();
            }
          }, function () {
            resolve();
          });
        }, reject);
      });
    },
    generateCanAssertion: function generateCanAssertion() {
      var _this12 = this;
      return new Promise(function (resolve, reject) {
        var a = new EcAssertion();
        a.generateId(_this12.repo.selectedServer);
        a.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
        if (_this12.repo.adminKeys) {
          var _iterator = Object(createForOfIteratorHelper["a" /* default */])(_this12.repo.adminKeys),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var key = _step.value;
              var adminPk = EcPk.fromPem(key);
              a.addOwner(adminPk);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
        a.setSubjectAsync(EcPk.fromPem(_this12.subject), function () {
          a.setAgentAsync(EcPk.fromPem(_this12.me), function () {
            a.setCompetency(EcRemoteLinkedData.trimVersionFromUrl(_this12.uri));
            a.setAssertionDateAsync(Date.now(), function () {
              a.setExpirationDateAsync(Date.now() + 1000 * 60 * 60 * 24 * 365, function () {
                a.setNegativeAsync(false, function () {
                  a.setConfidence(1.0);
                  var evidences = [];
                  // Go find viewActions on related resources to attach to the assertion.
                  if (_this12.me === _this12.subject) {
                    repo.searchWithParams("@type:CreativeWork AND educationalAlignment.targetUrl:\"" + EcRemoteLinkedData.trimVersionFromUrl(_this12.uri) + "\"", {
                      size: 5000
                    }, null, function (resources) {
                      new EcAsyncHelper().each(resources, function (resource, resourceCallback) {
                        repo.searchWithParams("@type:ChooseAction AND object:\"" + resource.shortId() + "\" AND \\*owner:\"" + _this12.subject + "\"", {
                          size: 5000
                        }, null, function (views) {
                          for (var i = 0; i < views.length; i++) {
                            evidences.push(views[i].shortId());
                          }
                          resourceCallback();
                        }, resourceCallback);
                      }, function (resources) {
                        if (evidences.length > 0) {
                          a.setEvidenceAsync(evidences, function () {
                            EcRepository.save(a, function () {
                              // this.$store.commit('editor/addAssertion', a);
                              _this12.canAssertion = true;
                              resolve();
                            }, reject);
                          }, reject);
                        } else {
                          EcRepository.save(a, function () {
                            // this.$store.commit('editor/addAssertion', a);
                            _this12.canAssertion = true;
                            resolve();
                          }, reject);
                        }
                      });
                    }, reject);
                  } else {
                    EcRepository.save(a, function () {
                      // this.$store.commit('editor/addAssertion', a);
                      _this12.canAssertion = true;
                      resolve();
                    }, reject);
                  }
                }, reject); // This is an assertion that an individual *can* do something, not that they *cannot*.
              }, reject); // UTC Milliseconds, 365 days in the future.
            }, reject); // UTC Milliseconds
          }, reject);
        }, reject);
      });
    },
    generateCannotAssertion: function generateCannotAssertion() {
      var _this13 = this;
      return new Promise(function (resolve, reject) {
        var a = new EcAssertion();
        a.generateId(_this13.repo.selectedServer);
        a.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
        if (_this13.repo.adminKeys) {
          var _iterator2 = Object(createForOfIteratorHelper["a" /* default */])(_this13.repo.adminKeys),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var key = _step2.value;
              var adminPk = EcPk.fromPem(key);
              a.addOwner(adminPk);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
        a.setSubjectAsync(EcPk.fromPem(_this13.subject), function () {
          a.setAgentAsync(EcPk.fromPem(_this13.me), function () {
            a.setCompetency(EcRemoteLinkedData.trimVersionFromUrl(_this13.uri));
            a.setAssertionDateAsync(Date.now(), function () {
              a.setExpirationDateAsync(Date.now() + 1000 * 60 * 60 * 24 * 365, function () {
                a.setNegativeAsync(true, function () {
                  a.setConfidence(1.0);
                  EcRepository.save(a, function () {
                    // this.$store.commit('editor/addAssertion', a);
                    _this13.cannotAssertion = true;
                    resolve();
                  }, reject);
                }, reject); // This is an assertion that an individual *cannot* do something, not that they *can*.
              }, reject); // UTC Milliseconds, 365 days in the future.
            }, reject); // UTC Milliseconds
          }, reject);
        }, reject);
      });
    },
    evidenceAssertion: function () {
      var _evidenceAssertion = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee11() {
        var _this14 = this;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              return _context11.abrupt("return", new Promise(function (resolve, reject) {
                EcCompetency.get(_this14.uri, function (c) {
                  if (_this14.assertions.length === 0) {
                    return;
                  }
                  var eah = new EcAsyncHelper();
                  eah.each(_this14.assertions, function (assertion, callback) {
                    if (c.isId(assertion.competency)) {
                      assertion.getSubjectAsync(function (subject) {
                        if (_this14.subject === subject.toPem()) {
                          assertion.getAgentAsync(function (agent) {
                            if (_this14.me === agent.toPem()) {
                              assertion.getEvidencesAsync( /*#__PURE__*/function () {
                                var _ref3 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee10(evidences) {
                                  return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee10$(_context10) {
                                    while (1) switch (_context10.prev = _context10.next) {
                                      case 0:
                                        EcArray.setAdd(evidences, _this14.assertionText);
                                        _this14.assertionText = "";
                                        _context10.next = 4;
                                        return assertion.setEvidence(evidences);
                                      case 4:
                                        EcRepository.save(assertion, function () {
                                          // this.$store.commit('editor/addAssertion', assertion);
                                          _this14.$store.dispatch('editor/computeBecause', evidences).then(function (because) {
                                            _this14.evidenceExplanation = because;
                                          });
                                          callback();
                                        }, callback);
                                      case 5:
                                      case "end":
                                        return _context10.stop();
                                    }
                                  }, _callee10);
                                }));
                                return function (_x4) {
                                  return _ref3.apply(this, arguments);
                                };
                              }(), callback);
                            } else {
                              callback();
                            }
                          }, callback);
                        } else {
                          callback();
                        }
                      }, callback);
                    } else {
                      callback();
                    }
                  }, function () {
                    resolve();
                  });
                }, reject);
              }));
            case 1:
            case "end":
              return _context11.stop();
          }
        }, _callee11);
      }));
      function evidenceAssertion() {
        return _evidenceAssertion.apply(this, arguments);
      }
      return evidenceAssertion;
    }(),
    unevidenceAssertion: function () {
      var _unevidenceAssertion = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee13(url) {
        var _this15 = this;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              return _context13.abrupt("return", new Promise(function (resolve, reject) {
                EcCompetency.get(_this15.uri, function (c) {
                  if (_this15.assertions.length === 0) {
                    return;
                  }
                  var eah = new EcAsyncHelper();
                  eah.each(_this15.assertions, function (assertion, callback) {
                    if (c.isId(assertion.competency)) {
                      assertion.getSubjectAsync(function (subject) {
                        if (_this15.subject === subject.toPem()) {
                          assertion.getAgentAsync(function (agent) {
                            if (_this15.me === agent.toPem()) {
                              assertion.getEvidencesAsync( /*#__PURE__*/function () {
                                var _ref4 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee12(evidences) {
                                  return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee12$(_context12) {
                                    while (1) switch (_context12.prev = _context12.next) {
                                      case 0:
                                        EcArray.setRemove(evidences, url);
                                        _context12.next = 3;
                                        return assertion.setEvidence(evidences);
                                      case 3:
                                        EcRepository.save(assertion, function () {
                                          // this.$store.commit('editor/addAssertion', assertion);
                                          _this15.$store.dispatch('editor/computeBecause', evidences).then(function (because) {
                                            _this15.evidenceExplanation = because;
                                          });
                                          callback();
                                        }, callback);
                                      case 4:
                                      case "end":
                                        return _context12.stop();
                                    }
                                  }, _callee12);
                                }));
                                return function (_x6) {
                                  return _ref4.apply(this, arguments);
                                };
                              }(), callback);
                            } else {
                              callback();
                            }
                          }, callback);
                        } else {
                          callback();
                        }
                      }, callback);
                    } else {
                      callback();
                    }
                  }, function () {
                    resolve();
                  });
                }, reject);
              }));
            case 1:
            case "end":
              return _context13.stop();
          }
        }, _callee13);
      }));
      function unevidenceAssertion(_x5) {
        return _unevidenceAssertion.apply(this, arguments);
      }
      return unevidenceAssertion;
    }()
  },
  watch: {
    subject: function subject() {
      this.initAssertions();
    }
  }
});
// CONCATENATED MODULE: ./src/lode/components/AssertionEditor.vue?vue&type=script&lang=js
 /* harmony default export */ var components_AssertionEditorvue_type_script_lang_js = (AssertionEditorvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/lode/components/AssertionEditor.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_AssertionEditorvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var AssertionEditor = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=chunk-2d0cbec1.5afd6c17.js.map