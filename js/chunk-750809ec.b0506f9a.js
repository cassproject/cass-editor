(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-750809ec","chunk-2d0dab46","chunk-2d0dab46"],{"3ba8":function(t,e,r){"use strict";var n=r("a89b"),s=r.n(n);s.a},"6d79":function(t,e,r){"use strict";r.d(e,"a",(function(){return a}));r("caad"),r("d3b7"),r("ac1f"),r("25f0"),r("2532"),r("841c");var n=r("54f8"),s=(r("96cf"),r("c964")),a={name:"cassUtil",data:function(){return{}},methods:{getOrganizationByEcPk:function(t,e,r){var a=t.toPem(),i={size:1e4};EcOrganization.search(window.repo,"",function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(s){var i,o,c,d,u,l,h;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:i=Object(n["a"])(s),t.prev=1,i.s();case 3:if((o=i.n()).done){t.next=34;break}return c=o.value,t.prev=5,t.next=8,c.getOrgKeys();case 8:d=t.sent,u=Object(n["a"])(d),t.prev=10,u.s();case 12:if((l=u.n()).done){t.next=19;break}if(h=l.value,!h||!h.toPk().toPem().equals(a)){t.next=17;break}return e(c),t.abrupt("return");case 17:t.next=12;break;case 19:t.next=24;break;case 21:t.prev=21,t.t0=t["catch"](10),u.e(t.t0);case 24:return t.prev=24,u.f(),t.finish(24);case 27:t.next=32;break;case 29:t.prev=29,t.t1=t["catch"](5),r(t.t1.toString());case 32:t.next=3;break;case 34:t.next=39;break;case 36:t.prev=36,t.t2=t["catch"](1),i.e(t.t2);case 39:return t.prev=39,i.f(),t.finish(39);case 42:e(null);case 43:case"end":return t.stop()}}),t,null,[[1,36,39,42],[5,29],[10,21,24,27]])})));return function(e){return t.apply(this,arguments)}}(),(function(t){r(t)}),i)},getOrganizationEcPk:function(t){return Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.getCurrentOrgKey();case 3:return e.abrupt("return",e.sent.toPk());case 6:return e.prev=6,e.t0=e["catch"](0),e.abrupt("return",null);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})))()},getPersonEcPk:function(t){var e=this.generateProbablePersonFingerprintFromShortId(t.shortId());if(t.owner){var r,s=Object(n["a"])(t.owner);try{for(s.s();!(r=s.n()).done;){var a=r.value,i=EcPk.fromPem(a);if(e.equals(i.fingerprint()))return i}}catch(o){s.e(o)}finally{s.f()}}return null},addAllOwnersFromObjectToObject:function(t,e){if(t&&t.owner){var r,s=Object(n["a"])(t.owner);try{for(s.s();!(r=s.n()).done;){var a=r.value,i=EcPk.fromPem(a);e.addOwner(i)}}catch(o){s.e(o)}finally{s.f()}}},setDefaultBrowserConfigId:function(t){localStorage.setItem("cassAuthoringToolDefaultBrowserConfigId",t)},removeDefaultBrowserConfig:function(){localStorage.removeItem("cassAuthoringToolDefaultBrowserConfigId")},getDefaultBrowserConfigId:function(){return localStorage.getItem("cassAuthoringToolDefaultBrowserConfigId")},getBooleanValue:function(t){return"boolean"===typeof t?t:"string"===typeof t&&!!t.equalsIgnoreCase("true")},addAllIdentityPksAsOwners:function(t){if(EcIdentityManager&&EcIdentityManager.default.ids&&EcIdentityManager.default.ids.length>0)for(var e=0;e<EcIdentityManager.default.ids.length;e++)t.addOwner(EcIdentityManager.default.ids[e].ppk.toPk())},isObjectOwnerless:function(t){return!t.owner||0===t.owner.length},doesAnyIdentityOwnObject:function(t){return!!this.isAdmin()||(null==t.canEditAny||t.canEditAny(EcIdentityManager.default.getMyPks()))},isAdmin:function(){return EcIdentityManager.default.ids.length>0&&null!=window.repo.adminKeys&&window.repo.adminKeys.length>0&&window.repo.adminKeys[0]===EcIdentityManager.default.ids[0].ppk.toPk().toPem()},generateProbablePersonFingerprintFromShortId:function(t){return t.substring(t.lastIndexOf("/")+1)},isPersonIdAnObjectOwner:function(t,e){if(!e.owner||0===e.owner.length)return!1;var r,s=this.generateProbablePersonFingerprintFromShortId(t),a=Object(n["a"])(e.owner);try{for(a.s();!(r=a.n()).done;){var i=r.value,o=EcPk.fromPem(i).fingerprint();if(o.equals(s))return!0}}catch(c){a.e(c)}finally{a.f()}return!1},isPersonIdAnObjectReader:function(t,e){if(!e.reader||0===e.reader.length)return!1;var r,s=this.generateProbablePersonFingerprintFromShortId(t),a=Object(n["a"])(e.reader);try{for(a.s();!(r=a.n()).done;){var i=r.value,o=EcPk.fromPem(i).fingerprint();if(o.equals(s))return!0}}catch(c){a.e(c)}finally{a.f()}return!1},areAnyIdentitiesThisPerson:function(t){var e=t.getFingerprint();if(EcIdentityManager&&EcIdentityManager.default.ids&&EcIdentityManager.default.ids.length>0)for(var r=0;r<EcIdentityManager.default.ids.length;r++)if(EcIdentityManager.default.ids[r].ppk.toPk().fingerprint().equals(e))return!0;return!1},isPersonalIdentityAnObjectOwner:function(t){if(this.isAdmin())return!0;if(!t.owner||0===t.owner.length)return!1;var e=this.getPersonalIdentityPk().toPem();return t.owner.includes(e)},getPersonalIdentityPk:function(){return EcIdentityManager&&EcIdentityManager.default.ids&&EcIdentityManager.default.ids.length>0?EcIdentityManager.default.ids[0].ppk.toPk():null},buildEcAlignmentsFromRemoteLinkedData:function(t){var e,r=[],s=Object(n["a"])(t);try{for(s.s();!(e=s.n()).done;){var a=e.value,i=new EcAlignment;i.copyFrom(a),r.push(i)}}catch(o){s.e(o)}finally{s.f()}return r}},computed:{amLoggedIn:function(){return!!(EcIdentityManager&&EcIdentityManager.default.ids&&EcIdentityManager.default.ids.length>0)}}}},a89b:function(t,e,r){},e672:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"framework-editor-toolbar"}},[r("div",{staticClass:"container"},[r("div",{staticClass:"columns is-mobile"},[r("div",{staticClass:"column is-narrow"},[r("div",{staticClass:"buttons"},[r("div",{staticClass:"button is-text has-text-dark ",class:"primary"===t.activeView?"has-text-primary":"has-text-dark",attrs:{title:"View only primary properties"},on:{click:function(e){return t.changeProperties("primary")}}},[t._m(0),r("span",{staticClass:"is-hidden-touch"},[t._v(t._s(t.ceasnDataFields?"Low Detail":"Primary"))]),r("span",{staticClass:"is-hidden-desktop"},[t._v("1st")])]),r("div",{staticClass:"button is-text ",class:"secondary"===t.activeView?"has-text-primary":"has-text-dark",attrs:{title:"View primary and secondary properties"},on:{click:function(e){return t.changeProperties("secondary")}}},["primary"===t.activeView?r("span",{staticClass:"icon"},[r("i",{staticClass:"fas fa-square"})]):r("span",{staticClass:"icon"},[r("i",{staticClass:"fas fa-check-square"})]),r("span",{staticClass:"is-hidden-touch"},[t._v(t._s(t.ceasnDataFields?"Moderate Detail":"Secondary"))]),r("span",{staticClass:"is-hidden-desktop"},[t._v("2nd")])]),r("div",{staticClass:"button is-text ",class:"tertiary"===t.activeView?"has-text-primary":"has-text-dark",attrs:{title:"View all properties"},on:{click:function(e){return t.changeProperties("tertiary")}}},["tertiary"===t.activeView?r("span",{staticClass:"icon"},[r("i",{staticClass:"fas fa-check-square"})]):r("span",{staticClass:"icon"},[r("i",{staticClass:"fas fa-square"})]),r("span",{staticClass:"is-hidden-touch"},[t._v(t._s(t.ceasnDataFields?"High Detail":"Tertiary"))]),r("span",{staticClass:"is-hidden-desktop"},[t._v("3rd")])])])]),t._m(1),t.showAddComments||t.showViewComments?r("div",{staticClass:"column is-narrow"},[r("div",{staticClass:"buttons"},[t.showViewComments?r("div",{staticClass:"button is-text  has-text-dark",attrs:{title:"View all comments"},on:{click:function(e){return t.$store.commit("app/showRightAside","Comments")}}},[t._m(2)]):t._e()])]):t._e(),t.showAddComments||t.showViewComments?r("div",{staticClass:"column is-narrow"},[r("div",{staticClass:"vl"})]):t._e(),t.canEditFramework?r("div",{staticClass:"column is-narrow"},[r("div",{staticClass:"buttons"},[r("div",{staticClass:"button  is-text has-text-dark",attrs:{title:"Undo recent change"},on:{click:t.onClickUndo}},[t._m(3)])])]):t._e(),t.canEditFramework?r("div",{staticClass:"column is-narrow"},[r("div",{staticClass:"vl"})]):t._e(),t.canExport?r("div",{staticClass:"column is-narrow"},[r("div",{staticClass:"button is-text has-text-dark ",class:{"is-disabled":!t.canExport},attrs:{title:"Export framework"},on:{click:function(e){return t.handleExportClick()}}},[t._m(4)])]):r("div",{staticClass:"column is-narrow"},[r("div",{staticClass:"button is-text has-text-dark ",class:{"is-disabled":!t.canExport},attrs:{title:"Export unavailable",disabled:"true"}},[t._m(5)])]),t.showUserManagementIcon?r("div",{staticClass:"column is-narrow"},[t.loggedIn?r("div",{staticClass:"button is-text has-text-dark ",attrs:{title:"Manage users"},on:{click:function(e){t.showManageUsersModal(),t.showShareDropdown=!1}}},[t._m(6)]):t.shareEnabled?r("div",{staticClass:"button is-text has-text-dark ",attrs:{title:"Get shareable link"},on:{click:function(e){t.showManageUsersModal(),t.showShareDropdown=!1}}},[t._m(7)]):t._e()]):t._e(),t.configurationsEnabled&&t.canEditFramework?r("div",{staticClass:"column is-narrow"},[r("div",{staticClass:"vl"})]):t._e(),t.configurationsEnabled?r("div",{staticClass:"column is-narrow"},[!t.canEditFramework||t.conceptMode||t.progressionMode?t._e():r("div",{staticClass:"button  is-text has-text-dark is-pulled-right not-lowercase",attrs:{title:"Framework configuration"},on:{click:function(e){t.showManageConfigurationModal(),t.showShareDropdown=!1}}},[t._m(8),r("span",{staticClass:"is-hidden-touch"},[t._v(t._s(t.getConfigurationName||"No Configuration"))])])]):t._e(),t.directoryId?r("div",{staticClass:"column is-narrow"},[r("div",{staticClass:"vl"})]):t._e(),t.directoryId?r("div",{staticClass:"column is-narrow",on:{click:t.goToDirectory}},[r("div",{staticClass:"button is-text has-text-dark"},[t._v(" Go to directory ")])]):t._e(),t.canManageAssertions?r("div",{staticClass:"column is-narrow"},[r("div",{staticClass:"vl"})]):t._e(),t.canManageAssertions?r("div",{staticClass:"column is-narrow",attrs:{id:"manageAssertionsButton"},on:{click:t.manageAssertions}},[r("div",{staticClass:"button is-text has-text-dark",class:{"is-loading":t.$store.getters["editor/searchingAssertions"]}},[t.managingAssertions?[t._v(" Stop Managing Assertions ")]:[t._v(" Manage Assertions ")]],2)]):t._e(),t.ceasnDataFields||!1===t.ceasnDataFields?r("div",{staticClass:"column is-narrow"},[r("div",{staticClass:"vl"})]):t._e(),t.ceasnDataFields||!1===t.ceasnDataFields?r("div",{staticClass:"column"},[t._m(9)]):t._e()])])])},s=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fas fa-check-square"})])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"column is-narrow"},[r("div",{staticClass:"vl"})])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fas fa-comments"})])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fas fa-undo-alt "})])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fas fa-file-export"})])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fas fa-file-export"})])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fas fa-users"})])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fas fa-share"})])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fas fa-cog"})])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"buttons is-pulled-right"},[r("a",{staticClass:"button is-primary is-outlined",attrs:{href:"docs/competency-and-framework-management/#creating-a-new-competency-framework",target:"_blank",title:"Go to documentation on creating a new competency framework"}},[r("span",{staticClass:"icon"},[r("i",{staticClass:"far fa-question-circle"})]),r("span",[t._v(" Help ")])])])}],a=(r("d81d"),r("b0c0"),r("ac1f"),r("5319"),r("841c"),r("2ca0"),r("54f8")),i=(r("96cf"),r("c964")),o=r("872c"),c=r("6d79"),d={name:"EditorToolbar",mixins:[o["a"],c["a"]],props:{properties:{type:String,default:"primary"}},data:function(){return{showPropertyViewDropDown:!1,showShareDropdown:!1,activeView:"primary",repo:window.repo,editsFinishedCounter:0,totalEditsCounter:0,privateFramework:!1}},methods:{closeViewDropDown:function(){this.showPropertyViewDropDown&&(this.showPropertyViewDropDown=!1)},closeShareDropDown:function(){this.showShareDropdown&&(this.showShareDropdown=!1)},handleExportClick:function(){this.canExport&&(this.$emit("show-export-modal"),this.showShareDropdown=!1)},handleClickAddComment:function(){this.$store.commit("editor/setAddCommentAboutId",this.$store.getters["editor/framework"].shortId()),this.$store.commit("editor/setAddCommentType","new"),this.$store.commit("app/showModal",{component:"AddComment"})},showExportModal:function(){this.$store.commit("app/showModal","Export")},showManageUsersModal:function(){this.$store.commit("app/showModal",{component:"Share"})},showManageConfigurationModal:function(){this.$store.commit("app/showModal",{component:"FrameworkConfiguration"})},changeProperties:function(t){var e=this.properties,r=t;"secondary"===r&&"secondary"===e?r="primary":"tertiary"===r&&"tertiary"===e&&(r="secondary"),this.$emit("change-properties",r),this.showPropertyViewDropDown=!1,this.activeView=r},onClickUndo:function(){var t=this;this.$Progress.start(),this.$store.dispatch("editor/lastEditToUndo").then((function(e){if(e){EcArray.isArray(e)||(e=[e]),t.totalEditsCounter+=e.length;for(var r=0;r<e.length;r++){var n=e[r].operation;"addNew"===n?t.undoAdd(e[r].id):"delete"===n?t.undoDelete(e[r].obj):"update"===n&&t.undoUpdate(e[r])}}t.$store.commit("editor/setLastEditToUndo",null)}))},undoAdd:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var n,s;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return n=e,r.next=3,EcRepository.get(t);case 3:s=r.sent,e.repo.deleteRegistered(s,(function(){n.editsFinishedCounter++}),(function(t){appLog(t),n.editsFinishedCounter++,n.$Progress.fail()}));case 5:case"end":return r.stop()}}),r)})))()},undoDelete:function(t){var e=t,r=this;"Concept"===t.type&&(e=new EcConcept,e.copyFrom(t)),this.repo.saveTo(e,(function(){r.editsFinishedCounter++,r.$Progress.finish()}),(function(t){appLog(t),r.editsFinishedCounter++,r.$Progress.fail()}))},undoUpdate:function(t){var e=this;EcRepository.get(t.id,(function(r){if(t.expandedProperty)return e.undoUpdateWithExpandedProperty(t,r);for(var n=0;n<t.fieldChanged.length;n++)r[t.fieldChanged[n]]=t.initialValue[n];e.repo.saveTo(r,(function(){e.editsFinishedCounter++,e.$Progress.finish()}),(function(){e.editsFinishedCounter++,e.$Progress.fail()})),e.$store.commit("editor/changedObject",r.shortId())}),(function(t){appError(t),e.editsFinishedCounter++,e.$Progress.fail()}))},undoUpdateWithExpandedProperty:function(t,e){var r=this;this.expand(e,(function(e){for(var n=0;n<t.fieldChanged.length;n++)e[t.fieldChanged[n]]=t.initialValue[n],0===e[t.fieldChanged[n]].length&&delete e[t.fieldChanged[n]],r.saveExpanded(e)}))},expand:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e,r){var n,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=JSON.parse(e.toJson()),null!=n["@context"]&&n["@context"].startsWith("http://")&&(n["@context"]=n["@context"].replace("http://","https://")),null!=n["@context"]&&-1!==n["@context"].indexOf("skos")&&(n["@context"]="https://schema.cassproject.org/0.4/skos/"),t.prev=3,t.next=6,jsonld.expand(n);case 6:s=t.sent,r(s[0]),t.next=13;break;case 10:t.prev=10,t.t0=t["catch"](3),r(null);case 13:case"end":return t.stop()}}),t,null,[[3,10]])})));function e(e,r){return t.apply(this,arguments)}return e}(),saveExpanded:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){var r,n,s,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=this,n="https://schema.cassproject.org/0.4",-1!==e["@type"][0].toLowerCase().indexOf("concept")&&(n="https://schema.cassproject.org/0.4/skos"),t.prev=3,t.next=6,jsonld.compact(e,this.$store.state.lode.rawSchemata[n]);case 6:if(s=t.sent,!s){t.next=19;break}if(a=new EcRemoteLinkedData,a.copyFrom(s),a.context=n,delete a["@context"],a=r.turnFieldsBackIntoArrays(a),a["schema:dateModified"]=(new Date).toISOString(),!r.$store.state.editor||!0!==r.$store.state.editor.private||!0===EcEncryptedValue.encryptOnSaveMap[a.id]){t.next=18;break}return t.next=17,EcEncryptedValue.toEncryptedValue(a);case 17:a=t.sent;case 18:r.repo.saveTo(a,(function(){r.editsFinishedCounter++}),(function(t){appError(t),r.editsFinishedCounter++}));case 19:t.next=24;break;case 21:t.prev=21,t.t0=t["catch"](3),appError(t.t0);case 24:case"end":return t.stop()}}),t,this,[[3,21]])})));function e(e){return t.apply(this,arguments)}return e}(),turnFieldsBackIntoArrays:function(t){for(var e=["owner","reader","signature","competency","level","relation","skos:hasTopConcept","skos:narrower","skos:broader","skos:broadMatch","skos:closeMatch","skos:exactMatch","skos:narrowMatch","skos:related"],r=0;r<e.length;r++){var n=e[r];t[n]&&!EcArray.isArray(t[n])&&(t[n]=[t[n]])}return t},goToDirectory:function(){var t=this;EcDirectory.get(this.directoryId,(function(e){t.$store.commit("app/selectDirectory",e),t.$router.push({name:"directory"})}),appError)},checkIsPrivate:function(){var t=this.framework;delete EcRepository.cache[t.shortId()];var e=this;EcRepository.get(t.shortId(),(function(t){"EncryptedValue"===t.type?e.privateFramework=!0:e.privateFramework=!1}),(function(t){appError(t)}))},manageAssertions:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:this.managingAssertions?this.$store.commit("editor/setManageAssertions",!1):(EcPerson.search(window.repo,"*").then((function(t){e.$store.commit("editor/setPeople",t.map((function(t){return{name:t.name,key:t.owner[0]}})))})),this.$store.dispatch("editor/searchForAssertions").then((function(){e.$store.commit("editor/setManageAssertions",!0)})).catch((function(){})));case 1:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},asyncComputed:{getConfigurationName:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var e,r,n,s,i,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!this.$store.getters["editor/framework"].configuration){t.next=11;break}return t.next=3,EcRepository.get(this.$store.getters["editor/framework"].configuration);case 3:if(e=t.sent,!e){t.next=8;break}return t.abrupt("return",e.name);case 8:return t.abrupt("return","No configuration");case 9:t.next=43;break;case 11:if(!localStorage.getItem("cassAuthoringToolDefaultBrowserConfigId")){t.next=22;break}return t.next=14,EcRepository.get(localStorage.getItem("cassAuthoringToolDefaultBrowserConfigId"));case 14:if(r=t.sent,!r){t.next=19;break}return t.abrupt("return",r.name);case 19:return t.abrupt("return","No configuration");case 20:t.next=43;break;case 22:return t.next=24,window.repo.searchWithParams("@type:Configuration",{size:1e4},null);case 24:n=t.sent,s=Object(a["a"])(n),t.prev=26,s.s();case 28:if((i=s.n()).done){t.next=34;break}if(o=i.value,!0!==o.isDefault&&"true"!==o.isDefault){t.next=32;break}return t.abrupt("return",o.name);case 32:t.next=28;break;case 34:t.next=39;break;case 36:t.prev=36,t.t0=t["catch"](26),s.e(t.t0);case 39:return t.prev=39,s.f(),t.finish(39);case 42:return t.abrupt("return","No Configuration");case 43:case"end":return t.stop()}}),t,this,[[26,36,39,42]])})));function e(){return t.apply(this,arguments)}return e}()},computed:{showAddComments:function(){return!0!==this.$store.getters["editor/conceptMode"]&&(!0!==this.$store.getters["editor/progressionMode"]&&this.$store.state.app.canAddComments)},showViewComments:function(){return!0!==this.$store.getters["editor/conceptMode"]&&(!0!==this.$store.getters["editor/progressionMode"]&&this.$store.state.app.canViewComments)},framework:function(){return this.$store.state.editor.framework},queryParams:function(){return this.$store.getters["editor/queryParams"]},ceasnDataFields:function(){return"true"===this.queryParams.ceasnDataFields},canEditFramework:function(){return(!this.queryParams||"true"!==this.queryParams.view)&&!!this.canEditAny(this.framework)},loggedIn:function(){return!!(EcIdentityManager.default.ids&&EcIdentityManager.default.ids.length>0)},loggedInPerson:function(){return this.$store.getters["user/loggedOnPerson"]},configuration:function(){return this.$store.getters["editor/framework"].configuration},conceptMode:function(){return this.$store.getters["editor/conceptMode"]},progressionMode:function(){return this.$store.getters["editor/progressionMode"]},canExport:function(){return!this.$store.state.editor.private&&(!(this.framework.reader&&this.framework.reader.length>0)&&!this.privateFramework)},configurationsEnabled:function(){return this.$store.state.featuresEnabled.configurationsEnabled},shareEnabled:function(){return this.$store.state.featuresEnabled.shareEnabled},userManagementEnabled:function(){return this.$store.state.featuresEnabled.userManagementEnabled},showUserManagementIcon:function(){return!(!this.shareEnabled&&!this.canEditFramework)&&!(!this.shareEnabled&&!this.userManagementEnabled)},directoryId:function(){return this.framework.directory},canManageAssertions:function(){return!("true"===this.queryParams.disableAssertions||!this.loggedInPerson||!this.loggedInPerson.name||this.conceptMode||this.progressionMode)},managingAssertions:function(){return this.$store.getters["editor/manageAssertions"]}},watch:{editsFinishedCounter:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var e,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!this.editsFinishedCounter||this.editsFinishedCounter!==this.totalEditsCounter){t.next=10;break}return this.editsFinishedCounter=0,this.totalEditsCounter=0,e=this.$store.getters["editor/framework"],t.next=6,EcRepository.get(e.shortId());case 6:r=t.sent,this.$store.commit("editor/framework",r),this.$store.commit("editor/recomputeHierarchy",!0),this.$store.commit("editor/refreshAlignments",!0);case 10:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},mounted:function(){this.$store.getters["editor/setPropertyLevel"]&&(this.changeProperties(this.$store.getters["editor/setPropertyLevel"]),this.$store.commit("editor/setPropertyLevel",null)),this.checkIsPrivate()}},u=d,l=(r("3ba8"),r("2877")),h=Object(l["a"])(u,n,s,!1,null,null,null);e["default"]=h.exports}}]);
//# sourceMappingURL=chunk-750809ec.b0506f9a.js.map