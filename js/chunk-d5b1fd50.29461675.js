(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d5b1fd50"],{4513:function(e,t,r){},"4a16":function(e,t,r){"use strict";var i=r("4513"),n=r.n(i);n.a},9418:function(e,t,r){"use strict";r.r(t);var i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"lode__hierarchy",class:{"is-dragging":e.dragging}},[r("div",{staticClass:"hierarchy-buttons"},[r("div",{staticClass:"columns is-gapless is-paddingless is-mobile is-marginless is-paddingless"},[r("div",{staticClass:"column is-narrow"},[e.expanded&&e.hierarchyEnabled?r("div",{staticClass:"icon is-vcentered",on:{click:function(t){e.expanded=!1}}},[r("i",{staticClass:"fa fa-caret-down has-text-primary is-size-2"})]):!e.expanded&&e.hierarchyEnabled?r("div",{staticClass:"icon is-vcentered",on:{click:function(t){e.expanded=!0}}},[r("i",{staticClass:"fa fa-caret-right has-text-primary is-size-2"})]):r("div",{staticClass:"icon is-vcentered"},[r("i",{staticClass:"fa fa-circle is-size-7 has-text-light"})]),e.selectButtonText?r("div",{staticClass:"button is-outlined is-primary",on:{click:function(t){return e.$emit("select-button-click",e.selectedArray)}}},[e._v(" "+e._s(e.selectButtonText)+" ")]):e._e()]),r("div",{staticClass:"column is-narrow"},[e.canEdit&&"importPreview"!==e.view&&"importLight"!==e.view&&"crosswalk"!==e.view&&e.hierarchyEnabled||e.queryParams.select||"competencySearch"===e.view?r("div",{staticClass:"pl-2 check-radio-all-column"},[r("div",{staticClass:"field"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.selectAll,expression:"selectAll"}],staticClass:"is-checkradio",attrs:{id:"selectAllCheckbox",type:"checkbox",name:"selectAllCheckbox"},domProps:{checked:Array.isArray(e.selectAll)?e._i(e.selectAll,null)>-1:e.selectAll},on:{change:function(t){var r=e.selectAll,i=t.target,n=!!i.checked;if(Array.isArray(r)){var s=null,a=e._i(r,s);i.checked?a<0&&(e.selectAll=r.concat([s])):a>-1&&(e.selectAll=r.slice(0,a).concat(r.slice(a+1)))}else e.selectAll=n}}}),r("label",{attrs:{for:"selectAllCheckbox"}})])]):e._e()]),"crosswalk"===e.view?r("div",{staticClass:"crosswalk-buttons column is-fullwidth"},[r("div",{staticClass:"buttons is-right"},[r("div",{staticClass:"button is-small is-outlined is-primary",class:{"is-focused":"showAligned"===e.filter},attrs:{title:"show aligned only"},on:{click:function(t){return e.filterHierarchy("showAligned")}}},[e._m(0)]),r("div",{staticClass:"button is-small is-outlined is-primary",class:{"is-focused":"showUnaligned"===e.filter},attrs:{title:"show unaligned only"},on:{click:function(t){return e.filterHierarchy("showUnaligned")}}},[e._m(1)]),r("div",{staticClass:"button is-outlined is-small is-primary",class:{"is-focused":"showAll"===e.filter},attrs:{title:"show all"},on:{click:function(t){return e.filterHierarchy("showAll")}}},[e._m(2)]),"crosswalkSource"===e.subview&&0===e.alignmentsToSave.length?r("button",{staticClass:"button is-small is-outlined is-dark",attrs:{title:"change source"},on:{click:e.changeFrameworkSource}},[e._m(3)]):"crosswalkTarget"===e.subview&&0===e.alignmentsToSave.length?r("button",{staticClass:"button is-small is-outlined is-dark",attrs:{title:"change target"},on:{click:e.changeFrameworkTarget}},[e._m(4)]):e._e()])]):e._e(),"crosswalk"!==e.view&&"competencySearch"!==e.view?r("div",{staticClass:"column is-narrow"},[r("div",{staticClass:"buttons"},[e.multipleSelected&&"import"!==e.view&&e.canEdit?r("div",{staticClass:"button is-outlined is-primary",on:{click:function(t){return e.$emit("edit-multiple-event")}}},[e._m(5),r("span",[e._v(" Edit multiple ")])]):e._e(),e.addingNode||!e.canEdit||e.multipleSelected?e._e():r("div",{staticClass:"button is-outlined is-primary",on:{click:function(t){e.addingNode=!0}}},[e._m(6),r("span",[e._v(" "+e._s(e.addCompetencyOrChildText)+" ")])]),!e.addingNode&&e.canEdit&&!e.multipleSelected&&e.canCopyOrCut?r("div",{staticClass:"button is-outlined is-danger",on:{click:e.deleteSelected}},[e._m(7),r("span",[e._v(" delete item ")])]):e._e(),e.addingNode?r("div",{staticClass:"button is-outlined is-dark ",on:{click:function(t){e.addingNode=!1}}},[e._m(8),r("span",[e._v("cancel")])]):e._e(),e.addingNode?r("div",{staticClass:"button is-outlined is-primary ",on:{click:e.onClickCreateNew}},[e._m(9),r("span",[e._v(" create new ")])]):e._e(),e.addingNode?r("div",{staticClass:"button is-outlined is-primary ",on:{click:e.clickToSearch}},[e._m(10),r("span",[e._v("search")])]):e._e(),"framework"!==e.view&&"concept"!==e.view||!e.hierarchyEnabled?e._e():r("div",{staticClass:"button is-outlined",class:e.canCopyOrCut?"is-primary":"is-disabled",attrs:{disabled:!e.canCopyOrCut,title:"Copy competency"},on:{click:e.copyClick}},[e._m(11)]),"framework"!==e.view&&"concept"!==e.view||!e.hierarchyEnabled?e._e():r("div",{staticClass:"button is-outlined",class:e.canCopyOrCut?"is-primary":"is-disabled",attrs:{title:"Cut competency",disabled:!e.canCopyOrCut},on:{click:e.cutClick}},[e._m(12)]),"framework"!==e.view&&"concept"!==e.view||!e.hierarchyEnabled?e._e():r("div",{staticClass:"button is-outlined ",class:e.canPaste?"is-primary":"is-disabled",attrs:{disabled:!e.canPaste,title:"Paste competency"},on:{click:e.pasteClick}},[e._m(13)]),"framework"!==e.view&&"concept"!==e.view||!e.hierarchyEnabled?e._e():r("div",{staticClass:"button is-outlined ",class:e.clipboardContainsItem?"is-danger":"is-disabled",attrs:{disabled:!e.clipboardContainsItem,title:"Clear clipboard"},on:{click:e.clearClipboard}},[e._m(14)])])]):e._e(),"importPreview"===e.view||"importLight"===e.view?r("div",{staticClass:"column"},[r("div",{staticClass:"buttons is-right"},[r("div",{staticClass:"buttons is-small is-right"},[r("div",{staticClass:" button is-light is-small is-pulled-right is-dark is-outlined",on:{click:e.cancelImport}},[r("span",[e._v(" Cancel ")]),e._m(15)]),"importLight"===e.view&&("text"!==e.importType||"text"===e.importType&&"Competency detected"===e.importStatus)?r("div",{staticClass:"button is-small is-dark is-outlined is-pulled-right",on:{click:function(t){return e.showModal("export")}}},[r("span",[e._v(" Export ")]),e._m(16)]):e._e(),"importLight"===e.view&&("text"!==e.importType||"text"===e.importType&&"Competency detected"===e.importStatus)?r("div",{staticClass:"button is-small is-dark is-outlined is-pulled-right",on:{click:function(t){return e.$store.dispatch("app/clearImport")}}},[r("span",[e._v(" import again ")]),e._m(17)]):e._e(),"importLight"===e.view&&("text"!==e.importType||"text"===e.importType&&"Competency detected"===e.importStatus)?r("div",{staticClass:"button is-small is-dark is-outlined is-pulled-right",on:{click:e.openFramework}},[r("span",[e._v("view in editor")]),e._m(18)]):e._e(),"importPreview"===e.view?r("div",{staticClass:"button  is-small is-primary is-outlined is-pulled-right",on:{click:function(t){return e.$store.commit("app/importTransition","light")}}},[r("span",[e._v(" done editing ")]),e._m(19)]):e._e(),"importLight"===e.view&&("text"!==e.importType||"text"===e.importType&&"Competency detected"===e.importStatus)?r("router-link",{staticClass:"button is-small is-primary is-outlined is -pulled-right",attrs:{to:{path:"/frameworks",query:e.queryParams}}},[r("span",[e._v(" Done ")]),r("span",{staticClass:"icon"},[r("i",{staticClass:"fa fa-home"})])]):e._e()],1)])]):e._e()]),e.canEditAssertions&&e.managingAssertions?r("div",{staticClass:"columns"},[r("div",{staticClass:"column is-narrow assertion-subject-select"},[r("span",[e._v("Manage Assertions for: ")]),e.selectedSubject?r("button",{staticClass:"button is-outlined is-primary assertion-subject-select-button",on:{click:e.openSelectSubjectModal}},[e._v(" "+e._s(e.selectedSubject)+" ")]):e._e()])]):e._e()]),e.hierarchy?[r("draggable",e._b({staticClass:"lode__hierarchy-ul",class:e.scrolled?"ul-list-scrolled":"",attrs:{tag:"ul",disabled:!0!==e.canEdit||!e.isDraggable||!e.hierarchyEnabled,group:{name:"test"},handle:".handle"},on:{start:e.beginDrag,end:e.endDrag},model:{value:e.hierarchy,callback:function(t){e.hierarchy=t},expression:"hierarchy"}},"draggable",e.dragOptions,!1),e._l(e.hierarchy,(function(t,i){return r("HierarchyNode",{key:t.obj.id,staticClass:"lode__hierarchy-li",attrs:{depth:1,view:e.view,subview:e.subview,obj:t.obj,dragging:e.dragging,canEdit:e.canEdit,hasChild:t.children,profile:e.profile,highlightList:e.highlightList,selectAll:e.selectAll,newFramework:e.newFramework,index:i,parentStructure:e.hierarchy,parent:e.container,frameworkEditable:e.canEdit,filter:e.filter,selectedArray:e.selectedArray,properties:e.properties,expandAll:1==e.expanded,parentChecked:!1,shiftKey:e.shiftKey,arrowKey:e.arrowKey,largeNumberOfItems:e.hasLargeNumberOfItems,hierarchyEnabled:e.hierarchyEnabled,containerSubType:e.container.subType,canEditAssertions:e.canEditAssertions},on:{"create-new-node-event":e.onCreateNewNode,"mounting-node":e.handleMountingNode,"begin-drag":e.beginDrag,move:e.move,select:e.select,add:e.add,"remove-object":e.removeObject,"draggable-check":e.onDraggableCheck}})})),1)]:e._e(),r("modal-template",{attrs:{active:e.showSelectSubjectModal}},[r("template",{slot:"modal-header"},[r("p",{staticClass:"is-size-3 modal-card-title has-text-white"},[e._v(" Select Subject ")])]),r("template",{slot:"modal-body"},[r("div",{staticClass:"field"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.personFilter,expression:"personFilter"}],staticClass:"input",attrs:{type:"text",placeholder:"search for person..."},domProps:{value:e.personFilter},on:{input:function(t){t.target.composing||(e.personFilter=t.target.value)}}})]),0===e.filteredAvailablePersons.length&&""===e.personFilter?r("div",[r("i",{staticClass:"fa fa-info-circle"}),e._v(" No users found ")]):e._e(),e.filteredAvailablePersons.length>0?r("div",[r("h4",{staticClass:"header is-size-3"},[e._v(" Available users ")]),r("div",{staticClass:"table-container"},[r("table",{staticClass:"table is-hoverable is-fullwidth"},[r("thead",[r("tr",[r("th",{attrs:{title:"Add as member"}},[r("i",{staticClass:"fa fa-user"})]),r("th",{attrs:{title:"Add as manager"}},[r("i",{staticClass:"fa fa-user-shield"})])])]),r("tbody",e._l(e.filteredAvailablePersons,(function(t,i){return r("tr",{key:i,staticStyle:{cursor:"pointer"},on:{click:function(r){return e.setSubject(t.owner[0])}}},[r("td",[e._v(" "+e._s(t.getName())+" ")]),r("td",[e._v(" "+e._s(t.email)+" ")])])})),0)])])]):e._e()]),r("template",{slot:"modal-foot"},[r("div",{staticClass:"button is-outlined is-small",attrs:{title:"Cancel"},on:{click:e.closeSelectSubjectModal}},[r("span",{staticClass:"icon"},[r("i",{staticClass:"fa fa-times"})]),r("span",[e._v(" cancel ")])])])],2)],2)},n=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fa fa-link"})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fa fa-unlink"})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fa fa-list-alt"})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fa fa-exchange-alt"})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fa fa-exchange-alt"})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fa fa-cog"})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fa fa-plus-circle"})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fa fa-plus-circle"})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fa fa-times"})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fa fa-plus"})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fa fa-search"})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fa fa-copy"})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fas handle fa-cut"})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fa fa-paste"})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fas fa-clipboard"})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fa fa-times-circle"})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fa fa-download"})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fa fa-redo-alt"})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fa fa-edit"})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fa fa-arrow-right"})])}],s=(r("99af"),r("4de4"),r("fb6a"),r("a434"),r("b0c0"),r("d3b7"),r("ac1f"),r("841c"),r("ddb0"),r("96cf"),r("c964")),a=r("872c"),o=r("6ffa4"),c=r("af07"),l={name:"Hierarchy",mixins:[a["a"],o["a"]],props:{scrolled:Boolean,container:Object,containerType:String,containerTypeGet:String,containerNodeProperty:String,containerEdgeProperty:String,nodeType:String,edgeType:String,edgeRelationProperty:String,edgeSourceProperty:String,edgeTargetProperty:String,edgeRelationLiteral:String,viewOnly:Boolean,repo:Object,profile:Object,highlightList:Array,newFramework:Boolean,properties:String,view:{type:String,default:"framework"},subview:{type:String,default:""},canEditAssertions:Boolean},data:function(){return{LARGE_NUMBER_OF_ITEMS:200,filter:"showAll",dragIcon:"fa-arrows-alt",dragOptions:{delay:0,scroll:!0,disabled:!1,emptyInsertThreshold:5,swapThreshold:.25,invertSwap:!0,invertedSwapThreshold:.25,animation:0,ghostClass:"ghost-drag",chosenClass:"chosen-drag",dragClass:"drag",scrollSensitivity:30,scrollSpeed:5,forceFallback:!0},multipleSelected:!1,addingNode:!1,structure:[],once:!0,dragging:!1,controlOnStart:!1,selectAll:!1,selectedArray:[],selectButtonText:null,expanded:!0,showAligned:!1,isDraggable:!0,shiftKey:!1,arrowKey:null,addCompetencyOrChildText:"Add",hierarchy:null,selectedSubject:null,availablePersons:[],personFilter:""}},components:{HierarchyNode:function(){return r.e("chunk-b9f1694a").then(r.bind(null,"b709"))},draggable:function(){return r.e("chunk-4a5f46a6").then(r.t.bind(null,"b76a",7))},ModalTemplate:c["a"]},watch:{relations:function(){this.once=!0},competencies:function(){this.once=!0},selectedArray:function(){this.selectedArray.length>1?this.multipleSelected=!0:(this.multipleSelected=!1,this.addingNode=!1),1===this.selectedArray.length?this.addCompetencyOrChildText="Add Child":this.addCompetencyOrChildText="Add",this.$emit("selected-array",this.selectedArray)},addAnother:function(e){e&&(this.onClickCreateNew(),this.$store.commit("editor/addAnother",!1))},once:function(e){e&&this.computeHierarchy()},currentSubject:function(){this.getSubjectInfo()}},computed:{showSelectSubjectModal:function(){return this.$store.getters["app/showModal"]&&"Subject"===this.$store.getters["app/dynamicModalContent"]},hierarchyEnabled:function(){return"Collection"!==this.container.subType},filteredAvailablePersons:function(){var e=this;return this.availablePersons.filter((function(t){return t.getName()&&t.getName().toLowerCase().indexOf(e.personFilter.toLowerCase())>-1||t.email&&t.email.toLowerCase().indexOf(e.personFilter.toLowerCase())>-1}))},relations:function(){return this.container.relation},competencies:function(){return this.container.competency},canCopyOrCut:function(){return!(!this.selectedArray||1!==this.selectedArray.length)},clipboardContainsItem:function(){return null!==this.$store.getters["editor/copyId"]||null!==this.$store.getters["editor/cutId"]},canPaste:function(){return(null!==this.$store.getters["editor/copyId"]||null!==this.$store.getters["editor/cutId"])&&null!==this.$store.getters["editor/nodeInFocus"]},alignmentsToSave:function(){return this.$store.getters["crosswalk/alignmentsToSave"]?this.$store.getters["crosswalk/alignmentsToSave"]:[]},showAddComments:function(){return"true"!==this.$store.getters["editor/queryParams"].concepts&&!0!==this.$store.getters["editor/conceptMode"]&&!0!==this.$store.getters["editor/progressionMode"]&&this.$store.state.app.canAddComments},importType:function(){return this.$store.getters["app/importType"]},importStatus:function(){return this.$store.getters["app/importStatus"]},importTransition:function(){return this.$store.getters["app/importTransition"]},queryParams:function(){return this.$store.getters["editor/queryParams"]},addAnother:function(){return this.$store.getters["editor/addAnother"]},canEdit:function(){return!0!==this.viewOnly&&this.container.canEditAny(EcIdentityManager.default.getMyPks())},hasLargeNumberOfItems:function(){return null!=this.container&&(this.container.competency&&this.container.competency.length>=this.LARGE_NUMBER_OF_ITEMS)},managingAssertions:function(){return this.$store.getters["editor/manageAssertions"]},currentSubject:function(){return this.$store.getters["editor/getSubject"]},editingCompetency:function(){return null!=this.$store.getters["editor/selectedCompetency"]}},mounted:function(){var e=this,t=[];null!=this.container[this.containerNodeProperty]&&(t=t.concat(this.container[this.containerNodeProperty])),null!=this.container[this.containerEdgeProperty]&&(t=t.concat(this.container[this.containerEdgeProperty])),t.length>0?this.repo.multiget(t,(function(t){e.computeHierarchy()}),appError):e.computeHierarchy(),this.queryParams&&(this.queryParams.singleSelect&&(this.selectButtonText=this.queryParams.singleSelect),this.queryParams.select&&""!==this.queryParams.select&&"select"!==this.queryParams.select&&(this.selectButtonText=this.queryParams.select)),this.hasLargeNumberOfItems&&(this.expanded=!1),window.addEventListener("keydown",this.keydown),window.addEventListener("keyup",this.keyup),this.$store.getters["editor/getSubject"]&&this.getSubjectInfo()},beforeDestroy:function(){window.removeEventListener("keyup",this.keyup),window.removeEventListener("keydown",this.keydown)},methods:{clearClipboard:function(){this.$store.commit("editor/copyId",null),this.$store.commit("editor/cutId",null),this.$store.commit("editor/paste",!1)},cutClick:function(){this.selectedArray&&1===this.selectedArray.length&&this.$store.commit("editor/cutId",this.selectedArray[0]),this.$store.commit("editor/copyId",null),this.$store.commit("editor/paste",!1)},copyClick:function(){this.selectedArray&&1===this.selectedArray.length&&this.$store.commit("editor/copyId",this.selectedArray[0]),this.$store.commit("editor/cutId",null),this.$store.commit("editor/paste",!1)},pasteClick:function(){this.$store.commit("editor/paste",!0)},keydown:function(e){this.editingCompetency||(this.canEdit&&(e.shiftKey&&(this.shiftKey=!0),-1!==e.key.indexOf("Arrow")&&e.shiftKey&&(this.arrowKey=e.key),"x"===e.key&&e.ctrlKey&&(this.selectedArray&&1===this.selectedArray.length&&this.$store.commit("editor/cutId",this.selectedArray[0]),this.$store.commit("editor/copyId",null),this.$store.commit("editor/paste",!1)),"c"===e.key&&e.ctrlKey&&(this.selectedArray&&1===this.selectedArray.length&&this.$store.commit("editor/copyId",this.selectedArray[0]),this.$store.commit("editor/cutId",null),this.$store.commit("editor/paste",!1)),"v"===e.key&&e.ctrlKey&&this.$store.commit("editor/paste",!0)),-1===e.key.indexOf("Arrow")||e.shiftKey||e.ctrlKey||("ArrowLeft"===e.key?this.expanded=!1:"ArrowRight"===e.key&&(this.expanded=!0)))},keyup:function(e){e.shiftKey||(this.shiftKey=!1),-1!==e.key.indexOf("Arrow")&&(this.arrowKey=null)},showModal:function(e,t){"export"===e?(this.$store.commit("editor/setItemToExport",this.container),this.$store.commit("app/showModal",{title:"Export Framework",component:"ExportOptionsModal"})):"subject"===e&&this.$store.commit("app/showModal","Subject")},openFramework:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,EcFramework.get(this.container.shortId());case 2:t=e.sent,this.$store.commit("editor/framework",t),this.$router.push({name:"framework",params:{frameworkId:this.container.id}});case 5:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),changeFrameworkTarget:function(){this.$store.commit("crosswalk/step",1)},changeFrameworkSource:function(){this.$store.commit("crosswalk/step",0)},filterHierarchy:function(e){this.filter=e},onCreateNewNode:function(e,t){this.add(e,t)},handleMountingNode:function(){this.startTime()},startTime:function(){var e=this;setTimeout((function(){e.$emit("done-loading-nodes")}),1e3)},computeHierarchy:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){var t,r,i,n,s,a,o,c,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t=this,r={},i={},null!=this.container){e.next=5;break}return e.abrupt("return",r);case 5:if(null===this.container[this.containerNodeProperty]||void 0===this.container[this.containerNodeProperty]){e.next=28;break}n=0;case 7:if(!(n<this.container[this.containerNodeProperty].length)){e.next=28;break}return e.next=10,window[this.nodeType].get(this.container[this.containerNodeProperty][n]);case 10:if(s=e.sent,null!=s){e.next=24;break}return e.next=14,EcRepository.get(this.container[this.containerNodeProperty][n]);case 14:if(s=e.sent,!s||!s.encryptedType||s.encryptedType.toLowerCase()!==this.containerNodeProperty){e.next=24;break}return a="Ec"+s.encryptedType,o=new window[a],e.t0=o,e.next=21,EcEncryptedValue.fromEncryptedValue(s);case 21:e.t1=e.sent,e.t0.copyFrom.call(e.t0,e.t1),s=o;case 24:null!==s&&(r[this.container[this.containerNodeProperty][n]]=r[s.shortId()]=i[s.shortId()]=s);case 25:n++,e.next=7;break;case 28:if(null==this.container[this.containerEdgeProperty]||void 0===this.container[this.containerEdgeProperty]){e.next=50;break}n=0;case 30:if(!(n<this.container[this.containerEdgeProperty].length)){e.next=50;break}return c=null,e.next=34,window[this.edgeType].get(this.container[this.containerEdgeProperty][n]);case 34:if(c=e.sent,null==c){e.next=46;break}if(c[this.edgeRelationProperty]!==this.edgeRelationLiteral){e.next=44;break}if(null!=r[c[this.edgeTargetProperty]]){e.next=39;break}return e.abrupt("continue",47);case 39:if(null!=r[c[this.edgeSourceProperty]]){e.next=41;break}return e.abrupt("continue",47);case 41:null==r[c[this.edgeTargetProperty]]._children&&(r[c[this.edgeTargetProperty]]._children=[]),r[c[this.edgeTargetProperty]]._children.push(r[c[this.edgeSourceProperty]]),delete i[c[this.edgeSourceProperty]];case 44:e.next=47;break;case 46:appLog("Hierarchy: Could not find edge: "+this.container[this.containerEdgeProperty][n]);case 47:n++,e.next=30;break;case 50:if(null==this.container[this.containerNodeProperty]){e.next=59;break}n=0;case 52:if(!(n<this.container[this.containerNodeProperty].length)){e.next=59;break}if(r[this.container[this.containerNodeProperty][n]]&&null!=r[this.container[this.containerNodeProperty][n]]._children){e.next=55;break}return e.abrupt("continue",56);case 55:r[this.container[this.containerNodeProperty][n]]._children.sort((function(e,r){return t.container[t.containerNodeProperty].indexOf(e.shortId())-t.container[t.containerNodeProperty].indexOf(r.shortId())}));case 56:n++,e.next=52;break;case 59:for(this.structure.splice(0,this.structure.length),l=EcObject.keys(i),n=0;n<l.length;n++)this.structure.push(i[l[n]]);this.structure.sort((function(e,r){return t.container[t.containerNodeProperty].indexOf(e.shortId())-t.container[t.containerNodeProperty].indexOf(r.shortId())})),this.packChildren(this.structure),this.deleteUnderscore(this.structure),this.once=!1,this.hierarchy=this.structure;case 67:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),packChildren:function(e){if(null!=e){for(var t=0;t<e.length;t++)e[t].obj||(e[t]={obj:e[t],children:void 0===e[t]._children?[]:e[t]._children});for(t=0;t<e.length;t++)this.packChildren(e[t].children)}},deleteUnderscore:function(e){if(null!=e)for(var t=0;t<e.length;t++)delete e[t].obj._children,this.deleteUnderscore(e[t].children)},beginDrag:function(e){this.dragging=!0,void 0!==e&&(this.controlOnStart=e.originalEvent.ctrlKey||e.originalEvent.shiftKey)},endDrag:function(e){if("framework_drag"!==e.to.id){appLog(e.oldIndex,e.newIndex);var t=null,r=!1;this.shiftKey&&(this.controlOnStart=!0),e.from.id===e.to.id?e.newIndex+1<this.hierarchy.length?t=this.hierarchy[e.newIndex+1].obj.shortId():e.newIndex===this.hierarchy.length-1&&(r=!0):void 0===e.to.children[e.newIndex]?t=e.to.id:e.newIndex+1<e.to.children.length&&(t=e.to.children[e.newIndex+1].id),this.move(this.structure[e.oldIndex].obj.shortId(),t,e.from.id,e.to.id,!this.controlOnStart,r)}else this.dragging=!1},move:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t,r,i,n,s,a){var o,c,l,d,h,u,p,m,y,f,g,w,b,v,k;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.once=!0,o=this,c=o.container[o.containerNodeProperty]?o.container[o.containerNodeProperty].slice():null,l=o.container[o.containerEdgeProperty]?o.container[o.containerEdgeProperty].slice():null,d=[],EcArray.isArray(o.container[o.containerEdgeProperty])||(o.container[o.containerEdgeProperty]=[]),t!==r&&(h=this.container[this.containerNodeProperty].indexOf(t),appLog(h),this.container[this.containerNodeProperty].splice(h,1),u=null,u=null==r||void 0===r?-1:this.container[this.containerNodeProperty].indexOf(r),appLog(u),a?this.container[this.containerNodeProperty].push(t):this.container[this.containerNodeProperty].splice(u,0,t)),i===n){e.next=57;break}return e.next=10,window[this.nodeType].get(t);case 10:if(p=e.sent,!n){e.next=17;break}return e.next=14,window[this.nodeType].get(n);case 14:e.t0=e.sent,e.next=18;break;case 17:e.t0=null;case 18:if(m=e.t0,!0!==s||t===n){e.next=39;break}y=0;case 21:if(!(y<this.container[this.containerEdgeProperty].length)){e.next=39;break}return e.next=24,window[this.edgeType].get(this.container[this.containerEdgeProperty][y]);case 24:if(f=e.sent,null!=f){e.next=27;break}return e.abrupt("continue",36);case 27:if(f[this.edgeRelationProperty]!==this.edgeRelationLiteral){e.next=36;break}if(null!=f[this.edgeTargetProperty]){e.next=30;break}return e.abrupt("continue",36);case 30:if(null!=f[this.edgeSourceProperty]){e.next=32;break}return e.abrupt("continue",36);case 32:if(f[this.edgeSourceProperty]===t||this.$store.getters["editor/cutId"]&&(!this.$store.getters["editor/cutId"]||f[this.edgeTargetProperty]===t)){e.next=34;break}return e.abrupt("continue",36);case 34:appLog("Identified edge to remove: ",JSON.parse(f.toJson())),this.container[this.containerEdgeProperty].splice(y--,1);case 36:y++,e.next=21;break;case 39:if(null==n||""===n){e.next=57;break}if(f=new window[this.edgeType],null!=EcIdentityManager.default.ids&&EcIdentityManager.default.ids.length>0&&f.addOwner(EcIdentityManager.default.ids[0].ppk.toPk()),this.container.owner&&this.container.owner.length>0)for(g=0;g<this.container.owner.length;g++)w=this.container.owner[g],f.addOwner(EcPk.fromPem(w));if(this.container.reader&&this.container.reader.length>0)for(g=0;g<this.container.reader.length;g++)b=this.container.reader[g],f.addReader(EcPk.fromPem(b));if(null==m||void 0===m||p.shortId()===m.shortId()){e.next=57;break}if(o.queryParams&&o.queryParams.newObjectEndpoint?f.generateShortId(this.queryParams.newObjectEndpoint):f.assignId(o.repo.selectedServer,EcCrypto.md5(p.shortId())+"_"+this.edgeRelationLiteral+"_"+EcCrypto.md5(m.shortId())),f.source=p.shortId(),f.target=m.shortId(),f.relationType=this.edgeRelationLiteral,this.container[this.containerEdgeProperty].push(f.shortId()),d.push(f.shortId()),appLog("Added edge: ",JSON.parse(f.toJson())),!this.$store.state.editor||!0!==this.$store.state.editor.private){e.next=56;break}return e.next=55,EcEncryptedValue.toEncryptedValue(f);case 55:f=e.sent;case 56:this.repo.saveTo(f,appLog,appError);case 57:for(v=this.stripEmptyArrays(this.container),k=[],y=0;y<d.length;y++)k.push({operation:"addNew",id:d[y]});if(k.push({operation:"update",id:o.container.shortId(),fieldChanged:["competency","relation"],initialValue:[c,l],changedValue:[this.container.competency,this.container.relation]}),o.$store.commit("editor/addEditsToUndo",k),v["schema:dateModified"]=(new Date).toISOString(),!this.$store.state.editor||!0!==this.$store.state.editor.private||!0===EcEncryptedValue.encryptOnSaveMap[v.id]){e.next=67;break}return e.next=66,EcEncryptedValue.toEncryptedValue(v);case 66:v=e.sent;case 67:this.repo.saveTo(v,appLog,appError),this.dragging=!1;case 69:case"end":return e.stop()}}),e,this)})));function t(t,r,i,n,s,a){return e.apply(this,arguments)}return t}(),add:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t,r){var i,n,a,o,c,l,d,h;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(i=this,n=new window[this.nodeType],a=this.container.competency?this.container.competency.slice():null,o=this.container.relation?this.container.relation.slice():null,this.queryParams&&null!=this.queryParams.newObjectEndpoint?n.generateShortId(this.queryParams.newObjectEndpoint):n.generateId(this.repo.selectedServer),null!=EcIdentityManager.default.ids&&EcIdentityManager.default.ids.length>0&&n.addOwner(EcIdentityManager.default.ids[0].ppk.toPk()),this.container.owner&&this.container.owner.length>0)for(c=0;c<this.container.owner.length;c++)l=this.container.owner[c],n.addOwner(EcPk.fromPem(l));if(this.container.reader&&this.container.reader.length>0)for(c=0;c<this.container.reader.length;c++)d=this.container.reader[c],n.addReader(EcPk.fromPem(d));if(h=this.nodeType,0===this.nodeType.indexOf("Ec")&&(h=this.nodeType.substring(2)),this.$store.state.editor&&this.$store.state.editor.defaultLanguage?n.name={"@language":this.$store.state.editor.defaultLanguage,"@value":"New "+h}:n.name="New "+h,n["schema:dateCreated"]=(new Date).toISOString(),n["schema:dateModified"]=(new Date).toISOString(),this.container["schema:dateModified"]=(new Date).toISOString(),appLog("Added node: ",JSON.parse(n.toJson())),this.$store.state.editor&&this.$store.commit("editor/newCompetency",n.shortId()),!this.$store.state.editor||!0!==this.$store.state.editor.private){e.next=20;break}return e.next=19,EcEncryptedValue.toEncryptedValue(n);case 19:n=e.sent;case 20:this.repo.saveTo(n,Object(s["a"])(regeneratorRuntime.mark((function e(){var s,c,l,d,h,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(EcArray.isArray(i.container[i.containerNodeProperty])||(i.container[i.containerNodeProperty]=[]),null==r||void 0===r?i.container[i.containerNodeProperty].push(n.shortId()):(s=i.container[i.containerNodeProperty].indexOf(r),i.container[i.containerNodeProperty].splice(s+1,0,n.shortId())),i.$store.commit("editor/addEditsToUndo",[{operation:"addNew",id:n.shortId()},{operation:"update",id:i.container.shortId(),fieldChanged:["competency"],initialValue:[a],changedValue:[i.container.competency]}]),t!==i.container.shortId()){e.next=13;break}if(c=i.container,c["schema:dateModified"]=(new Date).toISOString(),!i.$store.state.editor||!0!==i.$store.state.editor.private||!0===EcEncryptedValue.encryptOnSaveMap[i.container.id]){e.next=10;break}return e.next=9,EcEncryptedValue.toEncryptedValue(i.container);case 9:c=e.sent;case 10:i.repo.saveTo(i.stripEmptyArrays(c),(function(){i.once=!0}),appError),e.next=37;break;case 13:if(l=new window[i.edgeType],null!=EcIdentityManager.default.ids&&EcIdentityManager.default.ids.length>0&&l.addOwner(EcIdentityManager.default.ids[0].ppk.toPk()),i.container.owner&&i.container.owner.length>0)for(d=0;d<i.container.owner.length;d++)h=i.container.owner[d],l.addOwner(EcPk.fromPem(h));if(i.container.reader&&i.container.reader.length>0)for(d=0;d<i.container.reader.length;d++)u=i.container.reader[d],l.addReader(EcPk.fromPem(u));if(i.queryParams&&i.queryParams.newObjectEndpoint?l.generateShortId(i.queryParams.newObjectEndpoint):l.assignId(i.repo.selectedServer,EcCrypto.md5(n.shortId())+"_"+i.edgeRelationLiteral+"_"+EcCrypto.md5(t)),l.source=n.shortId(),l.target=t,l.source===l.target){e.next=37;break}if(l.relationType=i.edgeRelationLiteral,EcArray.isArray(i.container[i.containerEdgeProperty])||(i.container[i.containerEdgeProperty]=[]),i.container[i.containerEdgeProperty].push(l.shortId()),appLog("Added edge: ",JSON.parse(l.toJson())),i.$store.commit("editor/addEditsToUndo",[{operation:"addNew",id:n.shortId()},{operation:"update",id:i.container.shortId(),fieldChanged:["competency","relation"],initialValue:[a,o],changedValue:[i.container.competency,i.container.relation]}]),c=i.container,c["schema:dateModified"]=(new Date).toISOString(),!i.$store.state.editor||!0!==i.$store.state.editor.private){e.next=36;break}return e.next=31,EcEncryptedValue.toEncryptedValue(l);case 31:if(l=e.sent,!0===EcEncryptedValue.encryptOnSaveMap[i.container.id]){e.next=36;break}return e.next=35,EcEncryptedValue.toEncryptedValue(i.container);case 35:c=e.sent;case 36:i.repo.saveTo(l,(function(){i.repo.saveTo(i.stripEmptyArrays(c),(function(){i.once=!0}),appError)}),appError);case 37:case"end":return e.stop()}}),e)}))),appError);case 21:case"end":return e.stop()}}),e,this)})));function t(t,r){return e.apply(this,arguments)}return t}(),stripEmptyArrays:function(e){if(EcArray.isArray(e)){if(0===e.length)return null;for(var t=0;t<e.length;t++)e[t]=this.stripEmptyArrays(e[t]),null==e[t]&&e.splice(t--,1)}else if(EcObject.isObject(e))for(var r in e){var i=this.stripEmptyArrays(e[r]);null==i&&delete e[r]}return e},select:function(e,t){t?EcArray.setAdd(this.selectedArray,e):EcArray.setRemove(this.selectedArray,e)},removeObject:function(e){this.$emit("remove-object",e)},onDraggableCheck:function(e){this.isDraggable=e},clickToSearch:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){var t,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t=null,!this.selectedArray||1!==this.selectedArray.length){e.next=5;break}return e.next=4,EcRepository.get(this.selectedArray[0]);case 4:t=e.sent;case 5:this.$store.commit("editor/selectedCompetency",t),r={selectedCompetency:t,searchType:"Competency",copyOrLink:!0,component:"SearchModal"},this.$emit("search-things",r),this.$store.commit("lode/competencySearchModalOpen",!0),this.$store.commit("lode/searchType","Competency"),this.$store.commit("lode/copyOrLink",!0),this.$store.commit("lode/includeRelations","Collection"!==this.container.subType);case 12:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),cancelImport:function(){this.deleteObject(this.container),this.$store.dispatch("app/clearImport")},onClickCreateNew:function(){var e=this.container.shortId();1===this.selectedArray.length&&(e=this.selectedArray[0]),this.add(e,null),this.addingNode=!1},deleteSelected:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,EcRepository.get(this.selectedArray[0]);case 2:t=e.sent,this.deleteObject(t),this.selectedArray.splice(0,this.selectedArray.length);case 5:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),setSubject:function(e){this.$store.commit("editor/setSubject",e),this.closeSelectSubjectModal()},openSelectSubjectModal:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,EcPerson.search(window.repo,"*",null,null,{size:1e4});case 2:t=e.sent,this.availablePersons=t,this.showModal("subject");case 5:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),closeSelectSubjectModal:function(){this.$store.commit("app/closeModal")},getSubjectInfo:function(){var e=this;EcPerson.getByPk(window.repo,EcPk.fromPem(this.$store.getters["editor/getSubject"])).then((function(t){var r=t.name;EcIdentityManager.default.ids[0].ppk.toPk().toPem()===t.owner[0]&&(r="Myself"),e.selectedSubject=r}))}}},d=l,h=(r("4a16"),r("2877")),u=Object(h["a"])(d,i,n,!1,null,null,null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-d5b1fd50.29461675.js.map