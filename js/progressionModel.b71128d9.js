(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["progressionModel"],{"00fd":function(e,t,r){var n=r("9e69d"),o=Object.prototype,i=o.hasOwnProperty,a=o.toString,s=n?n.toStringTag:void 0;function c(e){var t=i.call(e,s),r=e[s];try{e[s]=void 0;var n=!0}catch(c){}var o=a.call(e);return n&&(t?e[s]=r:delete e[s]),o}e.exports=c},1310:function(e,t){function r(e){return null!=e&&"object"==typeof e}e.exports=r},"1a8c":function(e,t){function r(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}e.exports=r},"29f3":function(e,t){var r=Object.prototype,n=r.toString;function o(e){return n.call(e)}e.exports=o},"2b3e":function(e,t,r){var n=r("585a"),o="object"==typeof self&&self&&self.Object===Object&&self,i=n||o||Function("return this")();e.exports=i},3729:function(e,t,r){var n=r("9e69d"),o=r("00fd"),i=r("29f3"),a="[object Null]",s="[object Undefined]",c=n?n.toStringTag:void 0;function u(e){return null==e?void 0===e?s:a:c&&c in Object(e)?o(e):i(e)}e.exports=u},"387e":function(e,t,r){"use strict";var n=r("b6dc"),o=r.n(n);o.a},"408c":function(e,t,r){var n=r("2b3e"),o=function(){return n.Date.now()};e.exports=o},"4cef":function(e,t){var r=/\s/;function n(e){var t=e.length;while(t--&&r.test(e.charAt(t)));return t}e.exports=n},"585a":function(e,t,r){(function(t){var r="object"==typeof t&&t&&t.Object===Object&&t;e.exports=r}).call(this,r("c8ba"))},"8d74":function(e,t,r){var n=r("4cef"),o=/^\s+/;function i(e){return e?e.slice(0,n(e)+1).replace(o,""):e}e.exports=i},"9e69d":function(e,t,r){var n=r("2b3e"),o=n.Symbol;e.exports=o},b047:function(e,t,r){var n=r("1a8c"),o=r("408c"),i=r("b4b0"),a="Expected a function",s=Math.max,c=Math.min;function u(e,t,r){var u,l,d,f,h,p,m=0,g=!1,w=!1,k=!0;if("function"!=typeof e)throw new TypeError(a);function v(t){var r=u,n=l;return u=l=void 0,m=t,f=e.apply(n,r),f}function b(e){return m=e,h=setTimeout(E,t),g?v(e):f}function y(e){var r=e-p,n=e-m,o=t-r;return w?c(o,d-n):o}function C(e){var r=e-p,n=e-m;return void 0===p||r>=t||r<0||w&&n>=d}function E(){var e=o();if(C(e))return x(e);h=setTimeout(E,y(e))}function x(e){return h=void 0,k&&u?v(e):(u=l=void 0,f)}function T(){void 0!==h&&clearTimeout(h),m=0,u=p=l=h=void 0}function M(){return void 0===h?f:x(o())}function P(){var e=o(),r=C(e);if(u=arguments,l=this,p=e,r){if(void 0===h)return b(p);if(w)return clearTimeout(h),h=setTimeout(E,t),v(p)}return void 0===h&&(h=setTimeout(E,t)),f}return t=i(t)||0,n(r)&&(g=!!r.leading,w="maxWait"in r,d=w?s(i(r.maxWait)||0,t):d,k="trailing"in r?!!r.trailing:k),P.cancel=T,P.flush=M,P}e.exports=u},b4b0:function(e,t,r){var n=r("8d74"),o=r("1a8c"),i=r("ffd6"),a=NaN,s=/^[-+]0x[0-9a-f]+$/i,c=/^0b[01]+$/i,u=/^0o[0-7]+$/i,l=parseInt;function d(e){if("number"==typeof e)return e;if(i(e))return a;if(o(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=o(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=n(e);var r=c.test(e);return r||u.test(e)?l(e.slice(2),r?2:8):s.test(e)?a:+e}e.exports=d},b6dc:function(e,t,r){},e3ce:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"concept"}},[e.showRightAside?r("RightAside"):e._e(),r("div",{staticClass:"framework-content"},[r("FrameworkEditorToolbar",{attrs:{properties:e.properties},on:{"change-properties":e.changeProperties,"show-export-modal":e.onOpenExportModal}}),r("div",{staticClass:"framework-wrapper"},[r("draggable",e._b({attrs:{tag:"ul",id:"framework_drag",disabled:!0!==e.canEdit,group:{name:"test"},handle:".handle"},model:{value:e.frameworkDrag,callback:function(t){e.frameworkDrag=t},expression:"frameworkDrag"}},"draggable",e.dragOptions,!1),[r(e.dynamicThingComponent,{tag:"Component",class:"Thing"===e.dynamicThingComponent?e.parentObjectClass:"",attrs:{id:"scroll-"+e.framework.shortId().split("/").pop(),obj:e.framework,repo:e.repo,view:"concept",newFramework:e.newFramework,parentNotEditable:"true"===e.queryParams.view,profile:e.progressionModelProfile,properties:e.properties},on:{"edit-node-event":function(t){return e.onEditNode()},"done-editing-node-event":function(t){return e.onDoneEditingNode()}}},[r("div",{staticClass:"lode__framework__info-bar"},[e.timestamp?r("span",{staticClass:"tag is-medium-grey has-text-dark",attrs:{title:new Date(e.timestamp)}},[e._v(" Last modified "+e._s(e.lastModified)+" ")]):e._e(),e.framework["schema:dateCreated"]?r("span",{staticClass:"tag is-medium-grey has-text-dark",attrs:{title:new Date(e.framework["schema:dateCreated"])}},[e._v(" Created "+e._s(e.$moment(e.framework["schema:dateCreated"]).format("MMM D YYYY"))+" ")]):e._e(),e.framework["Approved"]?r("span",{staticClass:"tag is-medium-grey has-text-dark",attrs:{title:e.framework["Approved"]}},[e._v(" Approved ")]):e._e(),e.framework["Published"]?r("span",{staticClass:"tag is-medium-grey has-text-dark",attrs:{title:e.framework["Published"]}},[e._v(" Published ")]):e._e()])])],1),r("ProgressionHierarchy",{attrs:{container:e.framework,containerType:"ConceptScheme",containerTypeGet:"EcConceptScheme",viewOnly:"true"===e.queryParams.view,repo:e.repo,view:"concept",highlightList:e.highlightCompetency,profile:e.progressionLevelProfile,properties:e.properties,doneDragging:e.doneDragging},on:{"edit-multiple-event":e.onEditMultiple,"search-things":function(t){return e.handleSearch(t)},"select-button-click":e.onSelectButtonClick,"selected-array":e.selectedArrayEvent}})],1)],1),e.scrolled?r("div",{staticClass:"extra-space-for-scroll"}):e._e()],1)},o=[],i=(r("a434"),r("d3b7"),r("96cf"),r("c964")),a=r("b047"),s=r.n(a),c=r("872c"),u=r("f188"),l={name:"ProgressionModel",mixins:[c["a"],u["a"]],data:function(){return{scrolled:!1,parentObjectClass:"parent-object",showVersionHistory:!1,showEditMultiple:!1,showClipboardSuccessModal:!1,repo:window.repo,highlightCompetency:null,editingFramework:!1,properties:"primary",config:null,selectedArray:[],editsToUndo:[],dragOptions:{scroll:!0,swapThreshold:.75,disabled:!1,emptyInsertThreshold:36,animation:0,ghostClass:"ghost-drag",chosenClass:"chosen-drag",dragClass:"drag",scrollSensitivity:30,scrollSpeed:5,forceFallback:!0},frameworkDrag:[],doneDragging:!1}},computed:{newFramework:function(){return this.$store.getters["editor/newFramework"]===this.framework.shortId()},showRightAside:function(){return this.$store.getters["app/showRightAside"]},dynamicThingComponent:function(){return this.editingFramework||this.$store.getters["editor/newFramework"]===this.framework.shortId()?"ThingEditing":"Thing"},framework:function(){return this.$store.getters["editor/framework"]},queryParams:function(){return this.$store.getters["editor/queryParams"]},timestamp:function(){return this.framework.getTimestamp()?this.framework.getTimestamp():this.framework["schema:dateModified"]?this.framework["schema:dateModified"]:null},lastModified:function(){return null==this.framework?"Unknown.":this.timestamp?this.$moment(this.timestamp).format("MMM D YYYY"):null},shortId:function(){return this.framework?this.framework.shortId():null},loggedIn:function(){return!!(EcIdentityManager.default.ids&&EcIdentityManager.default.ids.length>0)},progressionModelProfile:function(){return this.ctdlAsnProgressionModelProfile},progressionLevelProfile:function(){return this.ctdlAsnProgressionLevelProfile},canEdit:function(){return"true"!==this.queryParams.view&&this.framework.canEditAny(EcIdentityManager.default.getMyPks())}},components:{Thing:function(){return r.e("chunk-2d0a4fe9").then(r.bind(null,"098b"))},ThingEditing:function(){return Promise.all([r.e("chunk-2d0a4fe9"),r.e("chunk-d5b1fd50"),r.e("chunk-2d0d5fe2"),r.e("chunk-06507814"),r.e("chunk-53fe8327")]).then(r.bind(null,"8051"))},FrameworkEditorToolbar:function(){return r.e("chunk-750809ec").then(r.bind(null,"e672"))},RightAside:function(){return Promise.all([r.e("chunk-d3a5e010"),r.e("chunk-2d21ecda"),r.e("chunk-2d0dab46")]).then(r.bind(null,"dd98"))},ProgressionHierarchy:function(){return r.e("chunk-51369fc1").then(r.bind(null,"27c7"))},draggable:function(){return r.e("chunk-4a5f46a6").then(r.t.bind(null,"b76a",7))}},created:function(){null!==this.framework&&(this.refreshPage(),this.spitEvent("viewChanged"))},mounted:function(){this.framework||this.$router.push({name:"frameworks"});var e=document.getElementById("concept");e.addEventListener("scroll",s()(this.scrollFunction,20,{immediate:!0})),"true"===this.queryParams.ceasnDataFields&&(this.getConceptCtids(),this.getConceptRegistryUrls())},beforeDestroy:function(){},watch:{shortId:function(){this.refreshPage()},frameworkDrag:function(){if(this.frameworkDrag.length>0){var e=EcRemoteLinkedData.trimVersionFromUrl(this.frameworkDrag[0].obj.id);this.moveToTopLevel(e),this.frameworkDrag=[],this.doneDragging=!0}}},methods:{scrollFunction:function(e){document.getElementsByClassName("parent-object");var t=e.target.scrollTop;t>0?(this.parentObjectClass="parent-object scrolled",this.scrolled=!0):(this.parentObjectClass="parent-object",this.scrolled=!1)},handleSearch:function(e){this.$store.commit("app/showModal",e)},onCancelEditMultiple:function(){this.showEditMultiple=!1},onEditMultiple:function(){this.showEditMultiple=!0;var e={profile:this.progressionLevelProfile,selectedCompetencies:this.selectedArray,component:"MultiEdit"};this.$store.commit("app/showModal",e)},onEditNode:function(){this.editingFramework=!0},onDoneEditingNode:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.t0=this.$store,e.next=3,EcRepository.get(this.framework.shortId());case 3:e.t1=e.sent,e.t0.commit.call(e.t0,"editor/framework",e.t1),this.$store.commit("editor/newFramework",null),this.editingFramework=!1;case 7:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),selectedArrayEvent:function(e){this.selectedArray=e},refreshPage:function(){this.framework?(this.setDefaultLanguage(),this.highlightCompetency=[],this.queryParams.highlightCompetency&&(EcArray.isArray(highlightCompetency)?this.highlightCompetency=this.queryParams.highlightCompetency:this.highlightCompetency=[this.queryParams.highlightCompetency])):appLog("no framework to refresh")},getDisplayStringFrom:function(e){return null!=e&&EcArray.isArray(e)&&e.length>0&&(e=e[0]),null!=e&&EcObject.isObject(e)&&e["@value"]?e["@value"]:e},onOpenExportModal:function(){this.$store.commit("editor/setItemToExport",this.framework),this.$store.commit("app/showModal",{component:"ExportOptionsModal",title:"Export Concept Scheme"})},changeProperties:function(e){this.properties=e},onSelectButtonClick:function(e){this.selectButton(e)},moveToTopLevel:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){var r,n,o,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=this,e.next=3,EcConcept.get(t);case 3:if(n=e.sent,!n["skos:broader"]){e.next=13;break}return EcArray.isArray(n["skos:broader"])||(n["skos:broader"]=[n["skos:broader"]]),e.next=8,EcConcept.get(n["skos:broader"][0]);case 8:o=e.sent,i=o["skos:narrower"].indexOf(t),o["skos:narrower"].splice(i,1),repo.saveTo(o,(function(){}),(function(){})),delete n["skos:broader"];case 13:this.framework["skos:hasTopConcept"].push(t),n["skos:topConceptOf"]=this.framework.shortId(),repo.saveTo(n,(function(){repo.saveTo(r.framework,(function(){r.refreshPage()}),(function(){}))}),(function(){}));case 16:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()}},d=l,f=(r("387e"),r("2877")),h=Object(f["a"])(d,n,o,!1,null,null,null);t["default"]=h.exports},ffd6:function(e,t,r){var n=r("3729"),o=r("1310"),i="[object Symbol]";function a(e){return"symbol"==typeof e||o(e)&&n(e)==i}e.exports=a}}]);
//# sourceMappingURL=progressionModel.b71128d9.js.map