(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-2d0daac9"],{

/***/ "6d38":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3c28eb14-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/lode/components/TimelineElement.vue?vue&type=template&id=0adfc940
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    directives: [{
      name: "observe-visibility",
      rawName: "v-observe-visibility",
      value: {
        callback: _vm.initialize
      },
      expression: "{callback: initialize}"
    }],
    staticClass: "timelineElement"
  }, [_vm.ok ? _c('span', [_vm.negative ? _c('div', {
    staticClass: "assertionTimelineIcon negative"
  }, [_c('i', {
    staticClass: "fa fa-times"
  })]) : _vm.badged ? _c('div', {
    staticClass: "assertionTimelineIcon badged"
  }, [_c('i', {
    staticClass: "fa fa-shield-alt"
  })]) : _c('div', {
    staticClass: "assertionTimelineIcon positive"
  }, [_c('i', {
    staticClass: "fa fa-check"
  })]), _c('div', {
    staticClass: "content"
  }, [_c('div', {
    staticClass: "timelineElementTextContainer"
  }, [_c('div', [_c('strong', {
    staticClass: "agentName"
  }, [_vm._v(_vm._s(_vm.agent))]), _vm._v(" claimed "), _c('strong', {
    staticClass: "subjectName"
  }, [_vm._v(_vm._s(_vm.subject) + " ")]), _vm.negative ? _c('span', {
    staticClass: "negativeClaim"
  }, [_vm._v("could not")]) : _c('span', {
    staticClass: "positiveClaim"
  }, [_vm._v("could")]), _vm._v(" demonstrate "), _c('a', {
    staticClass: "competencyLink",
    attrs: {
      "href": "#",
      "title": _vm.assertion.competency
    },
    on: {
      "click": _vm.gotoCompetency
    }
  }, [_vm._v(" " + _vm._s(_vm.competencyName) + " "), _vm.frameworkName ? _c('span', [_vm._v(" in the subject area " + _vm._s(_vm.frameworkName))]) : _vm._e()]), _vm.evidenceText ? _c('span', {
    staticClass: "evidenceText"
  }, [_vm._v(" because they "), _vm._l(_vm.evidenceText, function (evidenceThing, index) {
    return _c('span', {
      key: index
    }, [index != 0 ? _c('span', [_vm._v(" and they ")]) : _vm._e(), evidenceThing.url ? _c('a', {
      attrs: {
        "href": evidenceThing.url,
        "target": "_blank"
      }
    }, [_vm._v(" " + _vm._s(evidenceThing.text))]) : _c('span', [_vm._v(" " + _vm._s(evidenceThing.text))])]);
  })], 2) : _vm._e(), _vm.badged ? _c('span', {
    staticClass: "badge"
  }, [_vm._v(" and has issued a "), _c('a', {
    attrs: {
      "target": "_blank",
      "href": _vm.badgeUrl
    }
  }, [_vm._v(" badge")])]) : _vm._e(), _vm._v(". ")]), _c('div', [_c('div', {
    staticClass: "button is-text",
    style: _vm.invisible,
    attrs: {
      "title": "Delete this claim."
    },
    on: {
      "click": _vm.deleteMe
    }
  }, [_c('i', {
    staticClass: "fas fa-times"
  })])])]), _c('div', [_c('small', [_vm._v(_vm._s(_vm.competencyDescription))]), _vm.timestamp ? _c('div', {
    staticClass: "time"
  }, [_c('strong', [_vm._v(_vm._s(_vm.timeAgo))])]) : _vm._e()])])]) : _c('div', {
    staticClass: "time"
  }, [_c('i', {
    staticClass: "mdi mdi-spin mdi-loading"
  })])]);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/lode/components/TimelineElement.vue?vue&type=template&id=0adfc940

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
var regeneratorRuntime = __webpack_require__("c7eb");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.search.js
var es_string_search = __webpack_require__("841c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./src/mixins/common.js
var common = __webpack_require__("872c");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/lode/components/TimelineElement.vue?vue&type=script&lang=js







/* harmony default export */ var TimelineElementvue_type_script_lang_js = ({
  name: 'TimelineElement',
  mixins: [common["a" /* default */]],
  props: {
    uri: String
  },
  data: function data() {
    return {
      assertion: null,
      subject: null,
      subjectPk: null,
      agentPk: null,
      agent: null,
      timestamp: null,
      expiry: null,
      competency: null,
      negative: null,
      agentPerson: null,
      subjectPerson: null,
      evidence: null,
      evidenceExplanation: null
    };
  },
  computed: {
    timeAgo: function timeAgo() {
      if (this.timestamp === null) {
        return null;
      }
      return this.$moment(this.timestamp).fromNow();
    },
    assertions: function assertions() {
      return this.$store.getters['editor/assertions'];
    },
    ok: function ok() {
      if (this.subject == null) {
        return false;
      }
      if (this.agent == null) {
        return false;
      }
      if (this.competency == null) {
        return false;
      }
      return true;
    },
    competencyName: function competencyName() {
      if (this.competency == null) {
        return null;
      }
      return this.competency.getName();
    },
    frameworkName: function frameworkName() {
      if (this.framework == null) {
        return null;
      }
      return this.framework.getName();
    },
    competencyDescription: function competencyDescription() {
      if (this.competency == null) {
        return null;
      }
      return this.competency.getDescription();
    },
    fingerprintUrlAgent: function fingerprintUrlAgent() {
      if (this.agentPerson == null) {
        return null;
      }
      if (this.agentPerson.email != null) {
        return "https://www.gravatar.com/avatar/" + EcCrypto.md5(this.agentPerson.email.toLowerCase()) + "?s=44";
      }
      return null;
    },
    fingerprintUrlSubject: function fingerprintUrlSubject() {
      if (this.subjectPerson == null) {
        return null;
      }
      if (this.subjectPerson.email != null) {
        return "https://www.gravatar.com/avatar/" + EcCrypto.md5(this.subjectPerson.email.toLowerCase()) + "?s=44";
      }
      return null;
    },
    fingerprintAgent: function fingerprintAgent() {
      if (this.agentPerson == null) {
        return null;
      }
      // TODO
      // setTimeout(() => {
      //     jdenticon()
      // }, 100);
      return this.agentPerson.getGuid();
    },
    fingerprintSubject: function fingerprintSubject() {
      if (this.subjectPerson == null) {
        return null;
      }
      // TODO
      // setTimeout(() => {
      //     jdenticon()
      // }, 100);
      return this.subjectPerson.getGuid();
    },
    mine: function mine() {
      if (this.uri == null) {
        return null;
      }
      var assertion = this.assertion;
      if (assertion !== null) {
        if (assertion.owner === null || assertion.owner.length === 0) {
          return true;
        }
        return assertion.hasOwner(EcIdentityManager.default.ids[0].ppk.toPk());
      } else {
        return null;
      }
    },
    evidenceText: function evidenceText() {
      return this.evidenceExplanation;
    },
    badged: function badged() {
      if (this.assertion == null) {
        return false;
      }
      return this.assertion.hasReader(this.$store.getters['editor/badgePk']);
    },
    badgeUrl: function badgeUrl() {
      if (this.assertion != null) {
        if (this.assertion.hasReader(this.$store.getters['editor/badgePk'])) {
          return EcRemote.urlAppend(repo.selectedServer, "badge/assertion/") + this.assertion.getGuid();
        }
      }
      return "";
    },
    invisible: function invisible() {
      if (this.mine) {
        return {
          'visibility': 'visible'
        };
      } else {
        return {
          'visibility': 'hidden'
        };
      }
    }
  },
  destroyed: function destroyed() {
    clearInterval(this.invl);
  },
  watch: {
    evidence: function evidence(oldEvidence, newEvidence) {
      var _this = this;
      this.evidenceExplanation = null;
      if (this.evidence != null) {
        if (this.evidence.length > 0) {
          var count = this.evidence.length;
          this.$store.dispatch('editor/computeBecause', this.evidence).then(function (because) {
            _this.$nextTick(function () {
              if (count === _this.evidence.length) {
                _this.evidenceExplanation = because;
              }
            });
          });
        }
      }
    }
  },
  methods: {
    initialize: function initialize(isVisible, entry) {
      this.isVisible = isVisible;
      if (isVisible) {
        if (this.once) {
          return;
        }
        this.once = true;
        this.getAssertion(isVisible, entry);
      }
    },
    getAssertion: function () {
      var _getAssertion = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee(isVisible, entry) {
        var _this2 = this;
        var assertion, i;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!isVisible) {
                _context.next = 14;
                break;
              }
              _context.next = 3;
              return EcAssertion.get(this.uri);
            case 3:
              assertion = _context.sent;
              this.assertion = assertion;
              if (assertion.subject === null) {
                this.subject = "nobody";
              } else {
                assertion.getSubjectName(window.repo).then(function (name) {
                  _this2.subject = name;
                });
                assertion.getSubjectAsync(function (pk) {
                  _this2.subjectPk = pk.toPem();
                  _this2.getSubject();
                }, appError);
              }
              if (assertion.agent === null) {
                this.agent = "nobody";
              } else {
                assertion.getAgentName(window.repo).then(function (name) {
                  _this2.agent = name;
                });
              }
              assertion.getAgentAsync(function (pk) {
                _this2.agentPk = pk.toPem();
                _this2.getAgent();
              }, appError);
              if (assertion.assertionDate != null) {
                assertion.getAssertionDateAsync(function (assertionDate) {
                  _this2.timestamp = assertionDate;
                }, appError);
              }
              if (assertion.expirationDate != null) {
                assertion.getExpirationDateAsync(function (expirationDate) {
                  _this2.expiry = expirationDate;
                }, appError);
              }
              if (assertion.negative != null) {
                assertion.getNegativeAsync(function (negative) {
                  _this2.negative = negative;
                }, appError);
              } else {
                this.negative = false;
              }
              if (assertion.evidence != null) {
                for (i = 0; i < assertion.getEvidenceCount(); i++) {
                  (function (i) {
                    assertion.getEvidenceAsync(i, function (evidence) {
                      if (_this2.evidence == null) {
                        _this2.evidence = [];
                      }
                      _this2.evidence.push(evidence);
                      _this2.evidenceExplanation = null;
                    }, appError);
                  })(i);
                }
              }
              if (assertion.framework != null) {
                EcFramework.get(assertion.framework, function (framework) {
                  _this2.framework = framework;
                }, appError);
              }
              EcCompetency.get(assertion.competency, function (competency) {
                _this2.competency = competency;
              }, function () {
                for (var i = 0; i < _this2.assertions.length; i++) {
                  while (_this2.assertions[i].id === assertion.id) {
                    _this2.$store.commit('editor/removeAssertionAtIndex', i);
                  }
                }
              });
            case 14:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function getAssertion(_x, _x2) {
        return _getAssertion.apply(this, arguments);
      }
      return getAssertion;
    }(),
    gotoCompetency: function gotoCompetency() {
      var _this3 = this;
      EcFramework.search(window.repo, "competency:\"" + this.assertion.competency + "\"").then(function (success) {
        if (success.length > 0) {
          _this3.$store.commit('editor/framework', success[0]);
          _this3.$store.commit('editor/clearFrameworkCommentData');
          _this3.$store.commit('app/setCanViewComments', _this3.canViewCommentsCurrentFramework());
          _this3.$store.commit('app/setCanAddComments', _this3.canAddCommentsCurrentFramework());
          _this3.$router.push({
            name: "framework",
            params: {
              frameworkId: success[0].id
            }
          });
        }
      }).catch(appError);
    },
    getAgent: function getAgent() {
      var _this4 = this;
      this.agentPerson = null;
      var me = this;
      EcPerson.search(window.repo, EcPk.fromPem(me.agentPk).fingerprint(), function (persons) {
        if (persons.length === 0) {
          var pk = EcPk.fromPem(me.agentPk);
          var p = new EcPerson();
          p.assignId(window.repo.selectedServer, pk.fingerprint());
          p.addOwner(pk);
          if (_this4.displayName === null) {
            p.name = "Unknown Person.";
          } else {
            p.name = _this4.displayName;
          }
          _this4.agentPerson = p;
        } else {
          _this4.agentPerson = persons[0];
        }
      }, function (failure) {
        var pk = EcPk.fromPem(me.agentPk);
        var p = new EcPerson();
        p.assignId(window.repo.selectedServer, pk.fingerprint());
        p.addOwner(pk);
        if (_this4.displayName === null) {
          p.name = "Unknown Person.";
        } else {
          p.name = _this4.displayName;
        }
        _this4.agentPerson = p;
      });
    },
    getSubject: function getSubject() {
      var _this5 = this;
      this.agentPerson = null;
      var me = this;
      EcPerson.search(window.repo, EcPk.fromPem(me.subjectPk).fingerprint(), function (persons) {
        if (persons.length === 0) {
          var pk = EcPk.fromPem(me.subjectPk);
          var p = new EcPerson();
          p.assignId(window.repo.selectedServer, pk.fingerprint());
          p.addOwner(pk);
          if (_this5.displayName === null) {
            p.name = "Unknown Person.";
          } else {
            p.name = _this5.displayName;
          }
          _this5.subjectPerson = p;
        } else {
          _this5.subjectPerson = persons[0];
        }
      }, function (failure) {
        var pk = EcPk.fromPem(me.subjectPk);
        var p = new EcPerson();
        p.assignId(window.repo.selectedServer, pk.fingerprint());
        p.addOwner(pk);
        if (_this5.displayName === null) {
          p.name = "Unknown Person.";
        } else {
          p.name = _this5.displayName;
        }
        _this5.subjectPerson = p;
      });
    },
    deleteMe: function deleteMe() {
      var _this6 = this;
      if (window.confirm('Are you sure you want to delete this assertion?')) {
        EcRepository.get(this.uri, function (resource) {
          EcRepository._delete(resource, function () {
            _this6.$store.commit('editor/removeAssertion', resource);
          }, appError);
        });
      }
    }
  }
});
// CONCATENATED MODULE: ./src/lode/components/TimelineElement.vue?vue&type=script&lang=js
 /* harmony default export */ var components_TimelineElementvue_type_script_lang_js = (TimelineElementvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/lode/components/TimelineElement.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_TimelineElementvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var TimelineElement = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=chunk-2d0daac9.94296e66.js.map