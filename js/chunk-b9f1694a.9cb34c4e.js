(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b9f1694a"],{"2f95":function(t,e,s){"use strict";var i=s("fe23"),n=s.n(i);n.a},b709:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("li",{class:[t.isPotentialCrosswalkTarget?t.crosswalkTargetClass:"",t.editingNodeClass],attrs:{id:t.obj.shortId()}},[s("div",{staticClass:"lode__hierarchy-item columns is-paddingless is-gapless is-marginless is-mobile is-multiline",class:[t.subview,{"is-selected-competency-source":t.isSelectedWorkingAlignmentsSource},{"is-selected-competency-target":t.isInWorkingAlignmentsTargets},t.isCrosswalkAligned,{"show-aligned":"showAligned"===t.filter},{"show-unaligned":"showUnaligned"===t.filter},{"show-all":"showAll"===t.filter},{"is-focused":t.isItemFocused},{"is-selected":t.checked},{"is-copied":t.isItemCopied},{"is-cut":t.isItemCut},{"can-paste":t.canPaste},{"target-enabled":"selectTargets"===t.sourceState}]},[s("div",{staticClass:"column is-12",attrs:{id:t.obj.shortId()===t.newCompetency?"scroll-newCompetency":null}},[s("div",{staticClass:"section is-paddingless"},[s("div",{staticClass:"columns is-paddingless is-gapless is-marginless is-mobile is-multiline"},[s("div",{staticClass:"expand-column column is-narrow is-vcentered"},[!t.collapse&&t.hasChild.length>0?s("div",{staticClass:"icon is-vcentered",on:{click:function(e){return t.onExpandEvent()}}},[s("i",{staticClass:"fa fa-caret-down has-text-primary is-size-2",class:{"is-size-4":"crosswalk"===t.view}})]):t.hasChild.length>0?s("div",{staticClass:"icon is-vcentered",on:{click:function(e){return t.onExpandEvent()}}},[s("i",{staticClass:"fa fa-caret-right has-text-primary is-size-2",class:{"is-size-4":"crosswalk"===t.view}})]):s("div",{staticClass:"icon is-vcentered is-transparent"},[s("i",{staticClass:"fa fa-circle has-text-white is-size-7"})])]),s("div",{staticClass:"check-radio-column column is-narrow is-vcentered"},[t.canEdit&&"crosswalk"!==t.view&&"importPreview"!==t.view&&"importLight"!==t.view&&t.hierarchyEnabled||t.queryParams.select||"competencySearch"===t.view?s("div",{staticClass:"field"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.checked,expression:"checked"}],staticClass:"is-checkradio",class:{"is-focused":t.isItemFocused},attrs:{tabindex:"0",id:t.obj.shortId()+"checkbox",type:"checkbox",name:t.obj.shortId()+"checkbox"},domProps:{checked:Array.isArray(t.checked)?t._i(t.checked,null)>-1:t.checked},on:{focus:function(e){return t.focusHierarchyItem()},blur:function(e){return t.unfocusHierarchyItem()},change:function(e){var s=t.checked,i=e.target,n=!!i.checked;if(Array.isArray(s)){var o=null,r=t._i(s,o);i.checked?r<0&&(t.checked=s.concat([o])):r>-1&&(t.checked=s.slice(0,r).concat(s.slice(r+1)))}else t.checked=n}}}),s("label",{attrs:{for:t.obj.shortId()+"checkbox"}})]):t._e()]),s("div",{staticClass:"column full-column constrain-column"},[s(t.dynamicThing,{tag:"component",staticClass:"list-complete-item",class:t.newThingClass,style:{transform:t.indent,width:t.calcWidth},attrs:{filter:t.filter,view:t.view,subview:t.subview,id:"scroll-"+t.obj.shortId().split("/").pop(),obj:t.changedObj?t.changedObj:t.obj,uri:t.obj.shortId(),parentNotEditable:!t.canEdit,profile:t.profile,childrenExpanded:t.childrenExpanded,children:this.hasChild.length,highlightList:t.highlightList,newFramework:t.newFramework,index:t.index,frameworkEditable:t.frameworkEditable,editingNode:t.editingNode,cantMoveUp:t.cantMoveUp,cantMoveDown:t.cantMoveDown,cantMoveRight:t.cantMoveRight,cantMoveLeft:t.cantMoveLeft,properties:t.properties,containerSubType:t.containerSubType,canEditAssertions:t.canEditAssertions},on:{"expand-event":function(e){return t.onExpandEvent()},"edit-node-event":function(e){return t.onEditNode()},"done-editing-node-event":function(e){return t.onDoneEditingNode()},addNode:function(e){return t.onAddNodeEvent()},"move-up":t.moveUp,"move-down":t.moveDown,"move-right":t.moveRight,"move-left":t.moveLeft,select:t.select,"remove-object":t.removeObject}},[s("div",{staticClass:"hierarchy-item__buttons"},["crosswalk"!==t.view&&t.canEditThing?s("div",{staticClass:"edit-button button is-text  is-small has-text-primary",on:{click:function(e){return t.onEditNode()}}},[s("div",{staticClass:"icon "},[s("i",{staticClass:"fa fa-edit "})])]):t._e(),t.canEdit&&"crosswalk"!==t.view&&t.hierarchyEnabled?s("div",{staticClass:"handle-button button is-text  is-small has-text-primary"},[s("span",{staticClass:"icon"},[s("i",{staticClass:"fas handle fa-arrows-alt"}),s("i",{staticClass:"fas handle fa-arrows-alt"})])]):t._e(),t.showAddComments&&"crosswalk"!==t.view&&"search"!==t.view?s("div",{staticClass:" comment-button button is-text  is-small has-text-primary",on:{click:t.handleClickAddComment}},[s("div",{staticClass:"icon"},[s("i",{staticClass:"fa fa-comment-medical"})])]):t._e()])])],1)])])]),"crosswalk"===t.view&&"crosswalkSource"===t.subview&&t.sourceAlignmentCountByType.length>0?s("div",{directives:[{name:"show",rawName:"v-show",value:"ready"===t.sourceState,expression:"sourceState === 'ready'"}],staticClass:"column is-12 crosswalk-tags"},t._l(t.sourceAlignmentCountByType,(function(e,i){return s("span",{key:i,staticClass:"tag is-small is-link crosswalk__align_link",attrs:{title:t.crosswalkOptions[e.alignType].label},on:{click:function(s){return t.setRelationTypeByLinkClick(e.alignType)}}},[s("span",[t._v(t._s(t.crosswalkOptions[e.alignType].label))]),s("span",{staticStyle:{"margin-left":".5rem"}},[t._v(t._s(e.alignCount))])])})),0):t._e(),"crosswalk"===t.view&&"crosswalkSource"===t.subview?s("div",{staticClass:"crosswalk-buttons__source"},[s("div",{staticClass:"button is-outlined is-small is-primary crosswalk-buttons__source__create",attrs:{disabled:"ready"!==t.sourceState},on:{click:t.setWorkingAlignmentsSource}},[t._m(0),s("span",[t._v("add")])]),s("div",{directives:[{name:"show",rawName:"v-show",value:"selectType"===t.sourceState&&t.isSelectedWorkingAlignmentsSource&&""===t.workingAlignmentsType,expression:"sourceState === 'selectType' && isSelectedWorkingAlignmentsSource && workingAlignmentsType ===''"}],staticClass:"field is-grouped has-background-primary crosswalk-select-field"},[s("div",{staticClass:"control"},[s("div",{staticClass:"select is-small is-primary has-text-primary crosswalk-buttons__source__select"},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.workingAlignmentsType,expression:"workingAlignmentsType"}],ref:"alignmentOptions",on:{blur:t.ifNoWorkingAlignmentsTypeRemoveSourceCompetency,change:function(e){var s=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.workingAlignmentsType=e.target.multiple?s:s[0]}}},[s("option",{attrs:{value:""}},[t._v(" relation ")]),t._l(t.crosswalkOptionsArray,(function(e,i){return s("option",{key:i,domProps:{value:e.type}},[t._v(" "+t._s(e.label)+" ")])}))],2)])])]),"selectTargets"===t.sourceState&&t.isSelectedWorkingAlignmentsSource?s("div",{staticClass:"field"},[s("p",{staticClass:"control"},[s("span",{staticClass:"tag is-small is-fullwidth is-link crosswalk-buttons__source__type",attrs:{title:t.crosswalkOptions[t.workingAlignmentsType].label}},[s("span",{staticClass:"has-text-weight-bold"},[t._v(t._s(t.crosswalkOptions[t.workingAlignmentsType].label))]),s("button",{staticClass:"delete is-small",on:{click:t.removeSourceCompetency}})])])]):t._e()]):t._e(),"crosswalk"===t.view&&"crosswalkTarget"===t.subview&&"selectTargets"===t.sourceState?s("div",{staticClass:"crosswalk-buttons__target"},[s("div",{directives:[{name:"show",rawName:"v-show",value:!t.isInWorkingAlignmentsTargets,expression:"!isInWorkingAlignmentsTargets"}],staticClass:"button  is-fullwidth is-small is-text has-text-primary",on:{click:function(e){t.addToWorkingAlignmentsTargets(t.obj.shortId())}}},[t._m(1)]),s("div",{directives:[{name:"show",rawName:"v-show",value:t.isInWorkingAlignmentsTargets,expression:"isInWorkingAlignmentsTargets"}],staticClass:"button is-fullwidth is-small  is-text has-text-link",on:{click:function(e){t.removeFromWorkingAlignmentsTargets(t.obj.shortId())}}},[t._m(2)])]):t._e(),("crosswalk"!==t.view&&t.canEdit,t._e())]),[!t.collapse&&t.hierarchyEnabled?s("draggable",t._b({staticClass:"lode__hierarchy-sub-ul",class:[1==t.dragging?" dragging":"",{"no-child":0===t.hasChild.length}],attrs:{id:t.obj.shortId(),group:{name:"test"},handle:".handle",tag:"ul",disabled:1!=t.canEdit||!t.isDraggable},on:{start:t.beginDrag,end:t.endDrag},model:{value:t.hasChild,callback:function(e){t.hasChild=e},expression:"hasChild"}},"draggable",t.dragOptions,!1),t._l(t.hasChild,(function(e,i){return s("HierarchyNode",{key:e.obj.id,staticClass:"lode__hierarchy-sub-li",attrs:{depth:t.depth+1,view:t.view,filter:t.filter,subview:t.subview,obj:e.obj,hasChild:e.children,dragging:t.dragging,canEdit:t.canEdit,profile:t.profile,highlightList:t.highlightList,selectAll:t.selectAll,newFramework:t.newFramework,index:i,parentStructure:t.hasChild,parent:t.obj,frameworkEditable:t.frameworkEditable,selectedArray:t.selectedArray,properties:t.properties,parentChecked:t.checked,shiftKey:t.shiftKey,arrowKey:t.arrowKey,largeNumberOfItems:t.largeNumberOfItems,expandAll:t.expandAll,containerSubType:t.containerSubType,canEditAssertions:t.canEditAssertions},on:{"create-new-node-event":t.onCreateNewNode,"begin-drag":t.beginDrag,move:t.move,select:t.select,add:t.add,"remove-object":t.removeObject}})})),1):t._e()]],2)},n=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{staticClass:"icon"},[s("i",{staticClass:"fa fa-plus"})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{staticClass:"icon"},[s("i",{staticClass:"fa fa-plus"})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{staticClass:"icon"},[s("i",{staticClass:"fa fa-check"})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"button is-small is-outlined is-primary"},[s("span",{staticClass:"icon"},[s("i",{staticClass:"fa fa-plus-circle"})]),s("span",[t._v(" add item ")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{staticClass:"icon"},[s("i",{staticClass:"fa fa-times"})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{staticClass:"icon"},[s("i",{staticClass:"fa fa-plus"})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{staticClass:"icon"},[s("i",{staticClass:"fa fa-plus"})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{staticClass:"icon"},[s("i",{staticClass:"fa fa-search"})])}],o=(s("caad"),s("a9e3"),s("b64b"),s("d3b7"),s("ac1f"),s("2532"),s("841c"),s("96cf"),s("c964")),r=s("54f8"),a=s("f3f3"),c=s("2f62"),l={name:"HierarchyNode",props:{depth:Number,obj:Object,filter:{type:String,default:"showAll"},hasChild:Array,canEdit:Boolean,dragging:Boolean,profile:Object,highlightList:Array,selectAll:Boolean,newFramework:Boolean,index:Number,parentStructure:Array,parent:Object,frameworkEditable:Boolean,properties:String,expandAll:Boolean,parentChecked:Boolean,view:{type:String,default:"framework"},subview:{type:String,default:""},selectedArray:Array,shiftKey:{type:Boolean,default:!1},arrowKey:String,largeNumberOfItems:Boolean,hierarchyEnabled:{type:Boolean,default:!0},containerSubType:String,canEditAssertions:Boolean},components:{ThingEditing:function(){return Promise.all([s.e("chunk-2d0a4fe9"),s.e("chunk-d5b1fd50"),s.e("chunk-2d0d5fe2"),s.e("chunk-06507814"),s.e("chunk-8e40605e")]).then(s.bind(null,"8051"))},Thing:function(){return s.e("chunk-2d0a4fe9").then(s.bind(null,"098b"))},draggable:function(){return s.e("chunk-4a5f46a6").then(s.t.bind(null,"b76a",7))}},data:function(){return{crosswalkOptions:{},crosswalkOptionsArray:[],dragOptions:{scroll:!0,delay:0,swapThreshold:.25,emptyInsertThreshold:4,invertedSwapThreshold:.25,invertSwap:!0,disabled:!1,animation:0,ghostClass:"ghost-drag",chosenClass:"chosen-drag",dragClass:"drag",scrollSensitivity:30,scrollSpeed:5,forceFallback:!0},isDraggable:!0,addingNode:!1,editingNode:!1,collapse:!0,controlOnStart:!1,checked:!1,childrenExpanded:!1,changedObj:null,crosswalkTargetClass:"",sourceAlignmentCountByType:{},isItemFocused:!1,isItemCut:!1,isItemCopied:!1,canPaste:!1,canEditInCollection:!1}},computed:Object(a["a"])(Object(a["a"])({indent:function(){return"translate(".concat(16*this.depth-16,"px)")},calcWidth:function(){return"calc(100% - ".concat(16*this.depth-16,"px) !important")}},Object(c["c"])({workingAlignmentsSource:function(t){return t.crosswalk.workingAlignmentsMap.source},workingAlignmentsTargets:function(t){return t.crosswalk.workingAlignmentsMap.targets},relevantExistingAlignmentsMap:function(t){return t.crosswalk.relevantExistingAlignmentsMap},relevantExistingAlignmentsMapLastUpdate:function(t){return t.crosswalk.relevantExistingAlignmentsMapLastUpdate},enabledRelationshipTypes:function(t){return t.crosswalk.enabledRelationshipTypes},enabledRelationshipTypesLastUpdate:function(t){return t.crosswalk.enabledRelationshipTypesLastUpdate},alignedCompetenciesList:function(t){return t.crosswalk.alignedCompetenciesList},targetState:function(t){return t.crosswalk.targetState},sourceState:function(t){return t.crosswalk.sourceState},targetNodesToHighlight:function(t){return t.crosswalk.targetNodesToHighlight},cutId:function(t){return t.editor.cutId},copyId:function(t){return t.editor.copyId},paste:function(t){return t.editor.paste},queryParams:function(t){return t.editor.queryParams},newCompetency:function(t){return t.editor.newCompetency},conceptMode:function(t){return t.editor.conceptMode},progressionMode:function(t){return t.editor.progressionMode}})),{},{showAddComments:function(){return"true"!==this.$store.getters["editor/queryParams"].concepts&&!0!==this.$store.getters["editor/conceptMode"]&&!0!==this.$store.getters["editor/progressionMode"]&&this.$store.state.app.canAddComments},workingAlignmentsType:{get:function(){return this.$store.getters["crosswalk/workingAlignmentsType"]},set:function(t){this.$store.commit("crosswalk/workingAlignmentsType",t)}},isPotentialCrosswalkTarget:function(){return"crosswalk"===this.view&&"crosswalkTarget"===this.subview},isSelectedWorkingAlignmentsSource:function(){return this.workingAlignmentsSource===this.obj.shortId()&&"crosswalkSource"===this.subview},isInWorkingAlignmentsTargets:function(){return!!this.workingAlignmentsTargets&&!("crosswalkTarget"!==this.subview||!this.workingAlignmentsTargets.includes(this.obj.shortId()))},isCrosswalkAligned:function(){return"crosswalk"===this.view&&this.alignedCompetenciesList.includes(this.obj.shortId())?"is-crosswalk-aligned":"not-crosswalk-aligned"},dynamicThing:function(){return this.editingNode||"new-thing"===this.newThingClass?"ThingEditing":"Thing"},newThingClass:function(){return this.$store.state.editor&&this.obj.shortId()===this.newCompetency?"new-thing":""},cantMoveUp:function(){return this.index-1<0},cantMoveDown:function(){return this.index+1>=this.parentStructure.length},cantMoveRight:function(){return this.index-1<0},cantMoveLeft:function(){return"Framework"===this.parent.type},editingNodeClass:function(){return this.editingNode?"editing-thing":""},canEditThing:function(){return!1!==this.canEdit&&("Collection"===this.containerSubType?this.canEditInCollection:!this.obj||!this.obj.canEditAny||this.obj.canEditAny(EcIdentityManager.default.getMyPks()))}}),mounted:function(){this.$emit("mounting-node"),appLog("hierarchyNode.vue is mounted"),this.collapse=this.largeNumberOfItems,this.expandAll&&(this.collapse=!1),this.collapse||(this.childrenExpanded=!0),"crosswalk"===this.view&&"crosswalkSource"===this.subview&&(this.buildCrosswalkOptions(),this.calculateSourceAlignmentCountByType()),this.selectAll&&(this.checked=this.selectAll),this.parentChecked&&!this.newCompetency&&(this.checked=this.parentChecked),this.selectedArray&&this.selectedArray.length&&EcArray.has(this.selectedArray,this.obj.shortId())&&(this.checked=!0),"Collection"===this.containerSubType&&this.getCanEditInCollection()},methods:{focusHierarchyItem:function(){appLog("tab"),this.isItemFocused=!0},unfocusHierarchyItem:function(){this.isItemFocused=!1},ifNoWorkingAlignmentsTypeRemoveSourceCompetency:function(){this.workingAlignmentsType||this.removeSourceCompetency()},handleClickAddComment:function(){appLog("object is: ",this.obj.shortId()),this.$store.commit("editor/setAddCommentAboutId",this.obj.shortId()),this.$store.commit("editor/setAddCommentType","new"),this.$store.commit("app/showModal",{component:"AddComment"})},calculateSourceAlignmentCountByType:function(){if(this.relevantExistingAlignmentsMap[this.obj.shortId()]){var t=this.relevantExistingAlignmentsMap[this.obj.shortId()];if(t){for(var e=[],s=Object.keys(t),i=0,n=s;i<n.length;i++){var o=n[i];if(this.crosswalkOptions[o]){var r={};r.alignType=o,r.alignCount=Object.keys(t[o]).length,r.alignCount>0&&e.push(r)}}this.sourceAlignmentCountByType=e}else this.sourceAlignmentCountByType=[]}else this.sourceAlignmentCountByType=[]},removeSourceCompetency:function(){this.$store.commit("crosswalk/sourceState","ready"),this.$store.commit("crosswalk/resetWorkingAlignmentsMap")},removeFromWorkingAlignmentsTargets:function(t){this.$store.commit("crosswalk/removeWorkingAlignmentsTarget",t)},addToWorkingAlignmentsTargets:function(t){this.$store.commit("crosswalk/addWorkingAlignmentsTarget",t)},setWorkingAlignmentsSource:function(){var t=this;"ready"===this.sourceState&&(this.$store.commit("crosswalk/workingAlignmentsSource",this.obj.shortId()),this.$store.commit("crosswalk/sourceState","selectType"),this.$nextTick((function(){t.$refs.alignmentOptions.focus()})))},setRelationTypeByLinkClick:function(t){this.$store.commit("crosswalk/workingAlignmentsSource",this.obj.shortId()),this.$store.commit("crosswalk/workingAlignmentsType",t)},buildCrosswalkOptions:function(){this.crosswalkOptions={},this.crosswalkOptionsArray=[];var t,e=Object(r["a"])(this.enabledRelationshipTypes);try{for(e.s();!(t=e.n()).done;){var s=t.value,i={};i.type=s.relationship,i.label=s.label,this.crosswalkOptions[s.relationship]=i,this.crosswalkOptionsArray.push(i)}}catch(n){e.e(n)}finally{e.f()}},onEditNode:function(){this.editingNode=!0},onDoneEditingNode:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.editingNode=!1,this.obj.shortId()===this.newCompetency&&(-1!==this.view.indexOf("import")?(e={container:"#import",easing:"ease",offset:-150,force:!0,cancelable:!0,onStart:!1,onDone:!1,onCancel:!1,x:!1,y:!0},this.$scrollTo("#scroll-newCompetency",500,e)):this.conceptMode||this.progressionMode?(s={container:"#concept",easing:"ease",offset:-150,force:!0,cancelable:!0,onStart:!1,onDone:!1,onCancel:!1,x:!1,y:!0},this.$scrollTo("#scroll-newCompetency",500,s)):this.$scrollTo("#scroll-newCompetency")),this.$store.state.editor&&(this.$store.commit("editor/newCompetency",null),this.$store.commit("editor/recomputeHierarchy",!0)),t.next=5,EcRepository.get(this.obj.shortId());case 5:this.changedObj=t.sent;case 6:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),onAddNodeEvent:function(){this.add(this.obj.shortId())},onExpandEvent:function(){this.collapseIfPossible(),this.childrenExpanded=!this.childrenExpanded},collapseIfPossible:function(){this.hasChild.length>0&&(this.collapse=!this.collapse)},beginDrag:function(t){void 0!==t&&(this.controlOnStart=t.originalEvent.ctrlKey||t.originalEvent.shiftKey),this.$emit("begin-drag")},endDrag:function(t){if("framework_drag"!==t.to.id){appLog(t.oldIndex,t.newIndex);var e=null,s=0;this.shiftKey&&(this.controlOnStart=!0),t.from.id===t.to.id?t.newIndex+1<this.hasChild.length&&(e=this.hasChild[t.newIndex+1].obj.shortId()):void 0===t.to.children[t.newIndex]?e=t.to.id:""===t.to.id?t.newIndex<t.to.children.length&&(e=t.to.children[t.newIndex].id):t.newIndex+1<t.to.children.length&&(e=t.to.children[t.newIndex+1].id),this.move(t.clone.id,e,t.from.id,t.to.id,!this.controlOnStart,s)}},move:function(t,e,s,i,n,o){this.$emit("move",t,e,s,i,n,o)},moveUp:function(t,e){if(!this.cantMoveUp){var s=t,i=this.parent.shortId(),n=this.parentStructure[e-1].obj.shortId();this.move(s,n,i,i,!0,0)}},moveDown:function(t,e){if(!this.cantMoveDown){var s=null,i=t,n=this.parent.shortId();if(e+2!==this.parentStructure.length)s=this.parentStructure[e+2].obj.shortId();this.move(i,s,n,n,!0,0)}},moveRight:function(t,e){if(!this.cantMoveRight){var s=t,i=null,n=this.parent.shortId(),o=this.parentStructure[e-1].obj.shortId();this.move(s,i,n,o,!0,0)}},moveLeft:function(t,e){if(!this.cantMoveLeft){var s=t,i=this.parent.shortId(),n=null,o=this.$parent.$parent.parent.shortId();(o.includes("Framework")||this.parent["ceasn:isTopChildOf"]&&this.parent["ceasn:isTopChildOf"].includes(o))&&(o="",n=s),this.move(s,n,i,o,!0,0)}},add:function(t){this.$emit("add",t)},select:function(t,e){this.$emit("select",t,e)},removeObject:function(t){this.$emit("remove-object",t)},onCreateNewNode:function(t,e){this.$emit("create-new-node-event",t,e)},clickToSearch:function(){this.$store.commit("lode/competencySearchModalOpen",!0),this.$store.commit("app/showModal",{component:"SearchModal"}),this.$store.commit("lode/searchType","Competency"),this.$store.commit("lode/copyOrLink",!0),this.$store.state.editor&&this.$store.commit("editor/selectedCompetency",this.obj)},getCanEditInCollection:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,EcFramework.search(repo,'competency:"'+t.obj.shortId()+'" AND NOT subType:Collection');case 2:s=e.sent,s&&s.length>0?t.canEditInCollection=!1:t.canEditInCollection=!0;case 4:case"end":return e.stop()}}),e)})))()}},watch:{relevantExistingAlignmentsMapLastUpdate:function(){"crosswalk"===this.view&&"crosswalkSource"===this.subview&&this.calculateSourceAlignmentCountByType()},enabledRelationshipTypesLastUpdate:function(){"crosswalk"===this.view&&"crosswalkSource"===this.subview&&this.buildCrosswalkOptions()},targetNodesToHighlight:function(){"crosswalk"===this.view&&"crosswalkTarget"===this.subview&&this.obj&&this.targetNodesToHighlight.includes(this.obj.shortId())?this.crosswalkTargetClass="has-background-primary":this.crosswalkTargetClass=""},workingAlignmentsType:function(t){""!==t&&this.obj.shortId()===this.workingAlignmentsSource&&(this.$store.commit("crosswalk/sourceState","selectTargets"),this.$store.commit("crosswalk/targetState","ready"),this.$store.commit("crosswalk/populateWorkingAlignmentMap"))},checked:function(){this.$emit("select",this.obj.shortId(),this.checked),this.checked||this.unfocusHierarchyItem()},selectAll:function(){this.checked=this.selectAll},expandAll:function(){!0===this.expandAll?(this.hasChild.length>0&&(this.collapse=!1),this.childrenExpanded=!0):(this.hasChild.length>0&&(this.collapse=!0),this.childrenExpanded=!1)},parentChecked:function(){this.newCompetency||(this.checked=this.parentChecked)},arrowKey:function(){if("crosswalk"!==this.view&&this.checked&&this.selectedArray&&1===this.selectedArray.length){var t=this.obj.shortId(),e=this.index;"ArrowLeft"===this.arrowKey?this.moveLeft(t,e):"ArrowRight"===this.arrowKey?this.moveRight(t,e):"ArrowUp"===this.arrowKey?this.moveUp(t,e):"ArrowDown"===this.arrowKey&&this.moveDown(t,e)}},cutId:function(){this.cutId===this.obj.shortId()?"Competency"===this.obj.type||"Concept"===this.obj.type&&this.canEditThing?(this.isItemCut=!0,this.$store.commit("editor/cutOrCopyContainerId",this.parent.shortId())):this.$store.commit("editor/cutId",null):this.isItemCut=!1},copyId:function(){this.copyId===this.obj.shortId()?"Competency"===this.obj.type||"Concept"===this.obj.type&&this.canEditThing?(this.isItemCopied=!0,this.$store.commit("editor/cutOrCopyContainerId",this.parent.shortId())):this.$store.commit("editor/copyId",null):this.isItemCopied=!1},isItemFocused:function(){this.isItemFocused&&(this.copyId&&this.copyId!==this.obj.shortId()||this.cutId&&this.cutId!==this.obj.shortId())&&("Competency"===this.obj.type||"Concept"===this.obj.type&&this.canEditThing)?(this.canPaste=!0,this.$store.commit("editor/nodeInFocus",this.obj.shortId())):(this.canPaste=!1,this.$store.getters["editor/nodeInFocus"]!==this.obj.shortId()||this.copyId||this.cutId||this.$store.commit("editor/nodeInFocus",null))},paste:function(){var t=this.$store.getters["editor/nodeInFocus"];this.paste&&t===this.obj.shortId()&&("Competency"===this.obj.type||"Concept"===this.obj.type&&this.canEditThing)&&(this.move(this.cutId?this.cutId:this.copyId,null,this.$store.getters["editor/cutOrCopyContainerId"],this.obj.shortId(),null!==this.cutId,0),this.$store.commit("editor/cutId",null),this.$store.commit("editor/copyId",null),this.$store.commit("editor/paste",!1),this.$store.commit("editor/cutOrCopyContainerId",null),this.$store.commit("editor/nodeInFocus",null))},selectedArray:function(){this.selectedArray&&this.selectedArray.length&&EcArray.has(this.selectedArray,this.obj.shortId())?this.checked=!0:this.checked=!1}}},h=l,d=(s("2f95"),s("2877")),u=Object(d["a"])(h,i,n,!1,null,null,null);e["default"]=u.exports},fe23:function(t,e,s){}}]);
//# sourceMappingURL=chunk-b9f1694a.9cb34c4e.js.map