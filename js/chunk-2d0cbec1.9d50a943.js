(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-2d0cbec1"],{

/***/ "4c73":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"cb2182ec-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/lode/components/AssertionEditor.vue?vue&type=template&id=3d6d2e13
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

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regenerator.js + 1 modules
var regenerator = __webpack_require__("c14f");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.iterator.constructor.js
var es_iterator_constructor = __webpack_require__("e9f5");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.iterator.filter.js
var es_iterator_filter = __webpack_require__("910d");

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
      var _handleEvidenceAssertion = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee() {
        var _this3 = this;
        var _t;
        return Object(regenerator["a" /* default */])().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              this.loading = true;
              _context.p = 1;
              _context.n = 2;
              return this.evidenceAssertion();
            case 2:
              _context.n = 4;
              break;
            case 3:
              _context.p = 3;
              _t = _context.v;
              appError(_t);
            case 4:
              _context.p = 4;
              this.$nextTick(function () {
                _this3.loading = false;
              });
              return _context.f(4);
            case 5:
              return _context.a(2);
          }
        }, _callee, this, [[1, 3, 4, 5]]);
      }));
      function handleEvidenceAssertion() {
        return _handleEvidenceAssertion.apply(this, arguments);
      }
      return handleEvidenceAssertion;
    }(),
    handleUnevidenceAssertion: function () {
      var _handleUnevidenceAssertion = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee2(url) {
        var _this4 = this;
        var _t2;
        return Object(regenerator["a" /* default */])().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              this.loading = true;
              _context2.p = 1;
              _context2.n = 2;
              return this.unevidenceAssertion(url);
            case 2:
              _context2.n = 4;
              break;
            case 3:
              _context2.p = 3;
              _t2 = _context2.v;
              appError(_t2);
            case 4:
              _context2.p = 4;
              this.$nextTick(function () {
                _this4.loading = false;
              });
              return _context2.f(4);
            case 5:
              return _context2.a(2);
          }
        }, _callee2, this, [[1, 3, 4, 5]]);
      }));
      function handleUnevidenceAssertion(_x) {
        return _handleUnevidenceAssertion.apply(this, arguments);
      }
      return handleUnevidenceAssertion;
    }(),
    handleBadgeClick: function () {
      var _handleBadgeClick = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee3() {
        var _this5 = this;
        var _t3;
        return Object(regenerator["a" /* default */])().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              this.loading = true;
              _context3.p = 1;
              if (!this.badge) {
                _context3.n = 3;
                break;
              }
              _context3.n = 2;
              return this.revokeBadge();
            case 2:
              _context3.n = 4;
              break;
            case 3:
              _context3.n = 4;
              return this.generateBadge();
            case 4:
              _context3.n = 6;
              break;
            case 5:
              _context3.p = 5;
              _t3 = _context3.v;
              appError(_t3);
            case 6:
              _context3.p = 6;
              this.$nextTick(function () {
                _this5.loading = false;
              });
              return _context3.f(6);
            case 7:
              return _context3.a(2);
          }
        }, _callee3, this, [[1, 5, 6, 7]]);
      }));
      function handleBadgeClick() {
        return _handleBadgeClick.apply(this, arguments);
      }
      return handleBadgeClick;
    }(),
    handleCanClick: function () {
      var _handleCanClick = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee4() {
        var _this6 = this;
        var _t4;
        return Object(regenerator["a" /* default */])().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              if (!this.loading) {
                _context4.n = 1;
                break;
              }
              return _context4.a(2);
            case 1:
              this.loading = true;
              _context4.p = 2;
              if (!this.canAssertion) {
                _context4.n = 5;
                break;
              }
              _context4.n = 3;
              return this.revokeBadge();
            case 3:
              _context4.n = 4;
              return this.revokeCanAssertion();
            case 4:
              _context4.n = 7;
              break;
            case 5:
              if (!this.cannotAssertion) {
                _context4.n = 6;
                break;
              }
              _context4.n = 6;
              return this.revokeCannotAssertion();
            case 6:
              _context4.n = 7;
              return this.generateCanAssertion();
            case 7:
              _context4.n = 9;
              break;
            case 8:
              _context4.p = 8;
              _t4 = _context4.v;
              appError(_t4);
            case 9:
              _context4.p = 9;
              this.$nextTick(function () {
                _this6.loading = false;
              });
              return _context4.f(9);
            case 10:
              return _context4.a(2);
          }
        }, _callee4, this, [[2, 8, 9, 10]]);
      }));
      function handleCanClick() {
        return _handleCanClick.apply(this, arguments);
      }
      return handleCanClick;
    }(),
    handleCannotClick: function () {
      var _handleCannotClick = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee5() {
        var _this7 = this;
        var _t5;
        return Object(regenerator["a" /* default */])().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              if (!this.loading) {
                _context5.n = 1;
                break;
              }
              return _context5.a(2);
            case 1:
              this.loading = true;
              _context5.p = 2;
              if (!this.cannotAssertion) {
                _context5.n = 4;
                break;
              }
              _context5.n = 3;
              return this.revokeCannotAssertion();
            case 3:
              _context5.n = 7;
              break;
            case 4:
              if (!this.canAssertion) {
                _context5.n = 6;
                break;
              }
              _context5.n = 5;
              return this.revokeBadge();
            case 5:
              _context5.n = 6;
              return this.revokeCanAssertion();
            case 6:
              _context5.n = 7;
              return this.generateCannotAssertion();
            case 7:
              _context5.n = 9;
              break;
            case 8:
              _context5.p = 8;
              _t5 = _context5.v;
              appError(_t5);
            case 9:
              _context5.p = 9;
              this.$nextTick(function () {
                _this7.loading = false;
              });
              return _context5.f(9);
            case 10:
              return _context5.a(2);
          }
        }, _callee5, this, [[2, 8, 9, 10]]);
      }));
      function handleCannotClick() {
        return _handleCannotClick.apply(this, arguments);
      }
      return handleCannotClick;
    }(),
    generateBadge: function () {
      var _generateBadge = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee8() {
        var _this8 = this;
        return Object(regenerator["a" /* default */])().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              return _context8.a(2, new Promise(function (resolve, reject) {
                EcCompetency.get(_this8.uri, function (c) {
                  if (_this8.assertions.length === 0) {
                    return;
                  }
                  var eah = new EcAsyncHelper();
                  eah.each(_this8.assertions, function (assertion, callback) {
                    if (c.isId(assertion.competency)) {
                      assertion.getSubjectAsync(function (subject) {
                        if (_this8.subject === subject.toPem()) {
                          assertion.getAgentAsync(/*#__PURE__*/function () {
                            var _ref = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee7(agent) {
                              return Object(regenerator["a" /* default */])().w(function (_context7) {
                                while (1) switch (_context7.n) {
                                  case 0:
                                    if (!(_this8.me === agent.toPem())) {
                                      _context7.n = 4;
                                      break;
                                    }
                                    if (!(assertion.negative == null)) {
                                      _context7.n = 2;
                                      break;
                                    }
                                    _context7.n = 1;
                                    return assertion.addReader(_this8.$store.getters['editor/badgePk']);
                                  case 1:
                                    EcRepository.save(assertion, function () {
                                      // this.$store.commit('editor/addAssertion', assertion);
                                      _this8.badgeLink = EcRemote.urlAppend(_this8.repo.selectedServer, "badge/assertion/") + assertion.getGuid();
                                      _this8.badge = true;
                                      callback();
                                    }, callback);
                                    _context7.n = 3;
                                    break;
                                  case 2:
                                    assertion.getNegativeAsync(/*#__PURE__*/function () {
                                      var _ref2 = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee6(negative) {
                                        return Object(regenerator["a" /* default */])().w(function (_context6) {
                                          while (1) switch (_context6.n) {
                                            case 0:
                                              if (negative) {
                                                _context6.n = 2;
                                                break;
                                              }
                                              _context6.n = 1;
                                              return assertion.addReader(_this8.$store.getters['editor/badgePk']);
                                            case 1:
                                              EcRepository.save(assertion, function () {
                                                // this.$store.commit('editor/addAssertion', assertion);
                                                _this8.badgeLink = EcRemote.urlAppend(_this8.repo.selectedServer, "badge/assertion/") + assertion.getGuid();
                                                _this8.badge = true;
                                                callback();
                                              }, callback);
                                              _context6.n = 3;
                                              break;
                                            case 2:
                                              callback();
                                            case 3:
                                              return _context6.a(2);
                                          }
                                        }, _callee6);
                                      }));
                                      return function (_x3) {
                                        return _ref2.apply(this, arguments);
                                      };
                                    }(), callback);
                                  case 3:
                                    _context7.n = 5;
                                    break;
                                  case 4:
                                    callback();
                                  case 5:
                                    return _context7.a(2);
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
      var _revokeBadge = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee9() {
        var _this9 = this;
        return Object(regenerator["a" /* default */])().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              return _context9.a(2, new Promise(function (resolve, reject) {
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
          }
        }, _callee9);
      }));
      function revokeBadge() {
        return _revokeBadge.apply(this, arguments);
      }
      return revokeBadge;
    }(),
    revokeCanAssertion: function revokeCanAssertion() {
      var _this0 = this;
      return new Promise(function (resolve, reject) {
        EcCompetency.get(_this0.uri, function (c) {
          if (_this0.assertions.length === 0) {
            return;
          }
          var eah = new EcAsyncHelper();
          eah.each(_this0.assertions, function (assertion, callback) {
            if (c.isId(assertion.competency)) {
              assertion.getSubjectAsync(function (subject) {
                if (_this0.subject === subject.toPem()) {
                  assertion.getAgentAsync(function (agent) {
                    if (_this0.me === agent.toPem()) {
                      if (assertion.negative === null) {
                        EcRepository._delete(assertion, function () {
                          _this0.$store.commit('editor/removeAssertion', assertion);
                          _this0.canAssertion = false;
                          callback();
                        }, callback);
                      } else {
                        assertion.getNegativeAsync(function (negative) {
                          if (!negative) {
                            EcRepository._delete(assertion, function () {
                              _this0.$store.commit('editor/removeAssertion', assertion);
                              _this0.canAssertion = false;
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
      var _this1 = this;
      return new Promise(function (resolve, reject) {
        EcCompetency.get(_this1.uri, function (c) {
          if (_this1.assertions.length === 0) {
            return;
          }
          var eah = new EcAsyncHelper();
          eah.each(_this1.assertions, function (assertion, callback) {
            if (c.isId(assertion.competency)) {
              assertion.getSubjectAsync(function (subject) {
                if (_this1.subject === subject.toPem()) {
                  assertion.getAgentAsync(function (agent) {
                    if (_this1.me === agent.toPem()) {
                      if (assertion.negative != null) {
                        assertion.getNegativeAsync(function (negative) {
                          if (negative) {
                            EcRepository._delete(assertion, function () {
                              _this1.$store.commit('editor/removeAssertion', assertion);
                              _this1.cannotAssertion = false;
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
      var _this10 = this;
      return new Promise(function (resolve, reject) {
        var a = new EcAssertion();
        a.generateId(_this10.repo.selectedServer);
        a.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
        if (_this10.repo.adminKeys) {
          var _iterator = Object(createForOfIteratorHelper["a" /* default */])(_this10.repo.adminKeys),
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
        a.setSubjectAsync(EcPk.fromPem(_this10.subject), function () {
          a.setAgentAsync(EcPk.fromPem(_this10.me), function () {
            a.setCompetency(EcRemoteLinkedData.trimVersionFromUrl(_this10.uri));
            a.setAssertionDateAsync(Date.now(), function () {
              a.setExpirationDateAsync(Date.now() + 1000 * 60 * 60 * 24 * 365, function () {
                a.setNegativeAsync(false, function () {
                  a.setConfidence(1.0);
                  var evidences = [];
                  // Go find viewActions on related resources to attach to the assertion.
                  if (_this10.me === _this10.subject) {
                    repo.searchWithParams("@type:CreativeWork AND educationalAlignment.targetUrl:\"" + EcRemoteLinkedData.trimVersionFromUrl(_this10.uri) + "\"", {
                      size: 5000
                    }, null, function (resources) {
                      new EcAsyncHelper().each(resources, function (resource, resourceCallback) {
                        repo.searchWithParams("@type:ChooseAction AND object:\"" + resource.shortId() + "\" AND \\*owner:\"" + _this10.subject + "\"", {
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
                              _this10.canAssertion = true;
                              resolve();
                            }, reject);
                          }, reject);
                        } else {
                          EcRepository.save(a, function () {
                            // this.$store.commit('editor/addAssertion', a);
                            _this10.canAssertion = true;
                            resolve();
                          }, reject);
                        }
                      });
                    }, reject);
                  } else {
                    EcRepository.save(a, function () {
                      // this.$store.commit('editor/addAssertion', a);
                      _this10.canAssertion = true;
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
      var _this11 = this;
      return new Promise(function (resolve, reject) {
        var a = new EcAssertion();
        a.generateId(_this11.repo.selectedServer);
        a.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
        if (_this11.repo.adminKeys) {
          var _iterator2 = Object(createForOfIteratorHelper["a" /* default */])(_this11.repo.adminKeys),
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
        a.setSubjectAsync(EcPk.fromPem(_this11.subject), function () {
          a.setAgentAsync(EcPk.fromPem(_this11.me), function () {
            a.setCompetency(EcRemoteLinkedData.trimVersionFromUrl(_this11.uri));
            a.setAssertionDateAsync(Date.now(), function () {
              a.setExpirationDateAsync(Date.now() + 1000 * 60 * 60 * 24 * 365, function () {
                a.setNegativeAsync(true, function () {
                  a.setConfidence(1.0);
                  EcRepository.save(a, function () {
                    // this.$store.commit('editor/addAssertion', a);
                    _this11.cannotAssertion = true;
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
      var _evidenceAssertion = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee1() {
        var _this12 = this;
        return Object(regenerator["a" /* default */])().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              return _context1.a(2, new Promise(function (resolve, reject) {
                EcCompetency.get(_this12.uri, function (c) {
                  if (_this12.assertions.length === 0) {
                    return;
                  }
                  var eah = new EcAsyncHelper();
                  eah.each(_this12.assertions, function (assertion, callback) {
                    if (c.isId(assertion.competency)) {
                      assertion.getSubjectAsync(function (subject) {
                        if (_this12.subject === subject.toPem()) {
                          assertion.getAgentAsync(function (agent) {
                            if (_this12.me === agent.toPem()) {
                              assertion.getEvidencesAsync(/*#__PURE__*/function () {
                                var _ref3 = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee0(evidences) {
                                  return Object(regenerator["a" /* default */])().w(function (_context0) {
                                    while (1) switch (_context0.n) {
                                      case 0:
                                        EcArray.setAdd(evidences, _this12.assertionText);
                                        _this12.assertionText = "";
                                        _context0.n = 1;
                                        return assertion.setEvidence(evidences);
                                      case 1:
                                        EcRepository.save(assertion, function () {
                                          // this.$store.commit('editor/addAssertion', assertion);
                                          _this12.$store.dispatch('editor/computeBecause', evidences).then(function (because) {
                                            _this12.evidenceExplanation = because;
                                          });
                                          callback();
                                        }, callback);
                                      case 2:
                                        return _context0.a(2);
                                    }
                                  }, _callee0);
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
          }
        }, _callee1);
      }));
      function evidenceAssertion() {
        return _evidenceAssertion.apply(this, arguments);
      }
      return evidenceAssertion;
    }(),
    unevidenceAssertion: function () {
      var _unevidenceAssertion = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee11(url) {
        var _this13 = this;
        return Object(regenerator["a" /* default */])().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              return _context11.a(2, new Promise(function (resolve, reject) {
                EcCompetency.get(_this13.uri, function (c) {
                  if (_this13.assertions.length === 0) {
                    return;
                  }
                  var eah = new EcAsyncHelper();
                  eah.each(_this13.assertions, function (assertion, callback) {
                    if (c.isId(assertion.competency)) {
                      assertion.getSubjectAsync(function (subject) {
                        if (_this13.subject === subject.toPem()) {
                          assertion.getAgentAsync(function (agent) {
                            if (_this13.me === agent.toPem()) {
                              assertion.getEvidencesAsync(/*#__PURE__*/function () {
                                var _ref4 = Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/Object(regenerator["a" /* default */])().m(function _callee10(evidences) {
                                  return Object(regenerator["a" /* default */])().w(function (_context10) {
                                    while (1) switch (_context10.n) {
                                      case 0:
                                        EcArray.setRemove(evidences, url);
                                        _context10.n = 1;
                                        return assertion.setEvidence(evidences);
                                      case 1:
                                        EcRepository.save(assertion, function () {
                                          // this.$store.commit('editor/addAssertion', assertion);
                                          _this13.$store.dispatch('editor/computeBecause', evidences).then(function (because) {
                                            _this13.evidenceExplanation = because;
                                          });
                                          callback();
                                        }, callback);
                                      case 2:
                                        return _context10.a(2);
                                    }
                                  }, _callee10);
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
          }
        }, _callee11);
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
//# sourceMappingURL=chunk-2d0cbec1.9d50a943.js.map