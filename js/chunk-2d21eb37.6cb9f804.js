(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-2d21eb37"],{

/***/ "d74b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"11cfccab-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/lode/components/Assertion.vue?vue&type=template&id=9b6f9e24
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    directives: [{
      name: "observe-visibility",
      rawName: "v-observe-visibility",
      value: {
        callback: _vm.initialize,
        once: true
      },
      expression: "{callback: initialize,once: true}"
    }],
    staticClass: "assertion"
  }, [_c('span', [_vm.ok ? _c('li', [_c('strong', [_vm._v(_vm._s(_vm.agent))]), _vm.timestamp ? _c('span', [_vm._v(" claimed " + _vm._s(_vm.timeAgo) + ":")]) : _vm._e(), _c('span', {
    staticClass: "statement antitile"
  }, [_vm.negative ? _c('span', [_c('strong', [_vm._v(" " + _vm._s(_vm.subject))]), _vm._v(" can't do this")]) : _c('span', [_c('strong', [_vm._v(" " + _vm._s(_vm.subject))]), _vm._v(" can do this")]), _vm.evidenceText ? _c('span', [_vm._v(" because they "), _vm._l(_vm.evidenceText, function (evidenceThing, index) {
    return _c('span', {
      key: index
    }, [index != 0 ? _c('span', [_vm._v(" and they ")]) : _vm._e(), evidenceThing.url ? _c('a', {
      attrs: {
        "href": evidenceThing.url,
        "target": "_blank"
      }
    }, [_vm._v(" " + _vm._s(evidenceThing.text))]) : _c('span', [_vm._v(" " + _vm._s(evidenceThing.text))])]);
  })], 2) : _vm._e(), _vm.badged ? _c('span', [_vm._v(" and I issued them a "), _c('a', {
    attrs: {
      "href": _vm.badgeUrl
    }
  }, [_vm._v("badge")])]) : _vm._e(), _vm._v(". ")])]) : _vm._e()])]);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/lode/components/Assertion.vue?vue&type=template&id=9b6f9e24

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.search.js
var es_string_search = __webpack_require__("841c");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/lode/components/Assertion.vue?vue&type=script&lang=js




/* harmony default export */ var Assertionvue_type_script_lang_js = ({
  name: 'Assertion',
  props: {
    uri: String,
    icon: Boolean
  },
  data: function data() {
    return {
      assertion: null,
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
      evidenceExplanation: null,
      subject: null
    };
  },
  computed: {
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
    statement: function statement() {
      if (this.subject == null) {
        return "Decrypting...";
      }
      if (this.agent == null) {
        return "Decrypting...";
      }
      if (this.competency == null) {
        return "Decrypting...";
      }
      var statement = "";
      if (this.timestamp != null) {
        statement += this.$moment(this.timestamp).fromNow() + ", ";
      }
      statement += this.agent + " claimed " + this.subject;
      if (this.negative === true) {
        statement += " could not ";
      } else {
        statement += " could ";
      }
      statement += "demonstrate \"" + this.competencyText + "\".";
      return statement;
    },
    timeAgo: function timeAgo() {
      if (this.timestamp == null) {
        return null;
      }
      return this.$moment(this.timestamp).fromNow();
    },
    competencyText: function competencyText() {
      if (this.competency == null) {
        return null;
      }
      return this.competency.name;
    },
    evidenceText: function evidenceText() {
      return this.evidenceExplanation;
    },
    fingerprintUrl: function fingerprintUrl() {
      if (this.agentPerson == null) {
        return null;
      }
      if (this.agentPerson.email != null) {
        return "https://www.gravatar.com/avatar/" + EcCrypto.md5(this.agentPerson.email.toLowerCase()) + "?s=22";
      }
      return "http://tinygraphs.com/spaceinvaders/" + this.agentPerson.getGuid() + "?theme=base&numcolors=16&size=22&fmt=svg";
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
          return EcRemote.urlAppend(window.repo.selectedServer, "badge/assertion/") + this.assertion.getGuid();
        }
      }
      return "";
    }
  },
  watch: {
    evidence: function evidence(oldEvidence, newEvidence) {
      var _this = this;
      this.evidenceExplanation = null;
      if (this.evidence != null) {
        if (this.evidence.length > 0) {
          this.$store.dispatch('editor/computeBecause', this.evidence).then(function (because) {
            _this.$nextTick(function () {
              _this.evidenceExplanation = because;
            });
          });
        }
      }
    }
  },
  methods: {
    initialize: function initialize(isVisible, entry) {
      var _this2 = this;
      if (isVisible) {
        EcAssertion.get(this.uri, function (assertion) {
          _this2.assertion = assertion;
          if (assertion.subject == null) {
            _this2.subject = "nobody";
          } else {
            assertion.getSubjectName(window.repo).then(function (name) {
              _this2.subject = name;
            }).catch(appError);
            assertion.getSubjectAsync(function (pk) {
              _this2.subjectPk = pk.toPem();
            }, appError);
          }
          if (assertion.agent == null) {
            _this2.agent = "nobody";
          } else {
            assertion.getAgentName(window.repo).then(function (name) {
              _this2.agent = name;
            }).catch(appError);
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
            _this2.negative = false;
          }
          if (assertion.evidence != null) {
            for (var i = 0; i < assertion.getEvidenceCount(); i++) {
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
          EcCompetency.get(assertion.competency, function (competency) {
            _this2.competency = competency;
          }, appError);
        }, appError);
      }
    },
    gotoCompetency: function gotoCompetency() {
      // TODO
      // EcFramework.search(repo, "competency:\"" + this.assertion.competency + "\"", (frameworks) => {
      //     if (frameworks.length > 0) {
      //         app.selectedFramework = frameworks[0];
      //         app.selectedCompetency = EcCompetency.getBlocking(me.assertion.competency);
      //         app.subject = me.assertion.getSubject().toPem();
      //         $("#rad2").click();
      //         setTimeout(
      //             function () {
      //                 $("[id=\"" + app.selectedCompetency.id + "\"]").each(function () {
      //                     $(this)[0].scrollIntoView();
      //                 })
      //             }, 1000);
      //     }
      // }, appError);
    },
    getAgent: function getAgent() {
      var _this3 = this;
      this.agentPerson = null;
      var me = this;
      EcPerson.search(window.repo, EcPk.fromPem(me.agentPk).fingerprint(), function (persons) {
        if (persons.length === 0) {
          var pk = EcPk.fromPem(me.agentPk);
          var p = new Person();
          p.assignId(window.repo.selectedServer, pk.fingerprint());
          p.addOwner(pk);
          if (_this3.displayName === null) {
            p.name = "Unknown Person.";
          } else {
            p.name = _this3.displayName;
          }
          _this3.agentPerson = p;
        } else {
          _this3.agentPerson = persons[0];
        }
      }, function (failure) {
        var pk = EcPk.fromPem(me.agentPk);
        var p = new Person();
        p.assignId(window.repo.selectedServer, pk.fingerprint());
        p.addOwner(pk);
        if (_this3.displayName === null) {
          p.name = "Unknown Person.";
        } else {
          p.name = _this3.displayName;
        }
        _this3.agentPerson = p;
      });
    },
    getSubject: function getSubject() {
      var _this4 = this;
      this.agentPerson = null;
      var me = this;
      EcPerson.search(window.repo, EcPk.fromPem(me.subjectPk).fingerprint(), function (persons) {
        if (persons.length === 0) {
          var pk = EcPk.fromPem(me.subjectPk);
          var p = new Person();
          p.assignId(window.repo.selectedServer, pk.fingerprint());
          p.addOwner(pk);
          if (_this4.displayName === null) {
            p.name = "Unknown Person.";
          } else {
            p.name = _this4.displayName;
          }
          _this4.subjectPerson = p;
        } else {
          _this4.subjectPerson = persons[0];
        }
      }, function (failure) {
        var pk = EcPk.fromPem(me.subjectPk);
        var p = new Person();
        p.assignId(window.repo.selectedServer, pk.fingerprint());
        p.addOwner(pk);
        if (_this4.displayName === null) {
          p.name = "Unknown Person.";
        } else {
          p.name = _this4.displayName;
        }
        _this4.subjectPerson = p;
      });
    }
  }
});
// CONCATENATED MODULE: ./src/lode/components/Assertion.vue?vue&type=script&lang=js
 /* harmony default export */ var components_Assertionvue_type_script_lang_js = (Assertionvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/lode/components/Assertion.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_Assertionvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Assertion = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=chunk-2d21eb37.6cb9f804.js.map