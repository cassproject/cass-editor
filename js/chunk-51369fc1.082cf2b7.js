(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-51369fc1","chunk-74a95bb3"],{"24ea":function(e,t,r){"use strict";var n=r("a348"),i=r.n(n);i.a},"27c7":function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"lode__hierarchy",class:{"is-dragging":e.dragging}},[r("div",{staticClass:"hierarchy-buttons columns is-gapless is-paddingless is-mobile is-marginless is-paddingless"},[e.canEdit&&"import"!==e.view||e.queryParams.select?r("div",{staticClass:"column is-narrow",attrs:{id:"check-radio-all-column"}},[r("div",{staticClass:"field"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.selectAll,expression:"selectAll"}],staticClass:"is-checkradio",attrs:{id:"selectAllCheckbox",type:"checkbox",name:"selectAllCheckbox"},domProps:{checked:Array.isArray(e.selectAll)?e._i(e.selectAll,null)>-1:e.selectAll},on:{change:function(t){var r=e.selectAll,n=t.target,i=!!n.checked;if(Array.isArray(r)){var a=null,s=e._i(r,a);n.checked?s<0&&(e.selectAll=r.concat([a])):s>-1&&(e.selectAll=r.slice(0,s).concat(r.slice(s+1)))}else e.selectAll=i}}}),r("label",{attrs:{for:"selectAllCheckbox"}})])]):e._e(),r("div",{staticClass:"column is-narrow"},[e.expanded?r("div",{staticClass:"icon is-vcentered",on:{click:function(t){e.expanded=!1}}},[r("i",{staticClass:"fa fa-caret-down has-text-primary is-size-2"})]):e.expanded?r("div",{staticClass:"icon is-vcentered"},[r("i",{staticClass:"fa fa-circle is-size-6 has-text-light"})]):r("div",{staticClass:"icon is-vcentered",on:{click:function(t){e.expanded=!0}}},[r("i",{staticClass:"fa fa-caret-right has-text-primary is-size-2"})]),e.selectButtonText?r("div",{staticClass:"button is-outlined is-primary",on:{click:function(t){return e.$emit("select-button-click",e.selectedArray)}}},[e._v(" "+e._s(e.selectButtonText)+" ")]):e._e()]),r("div",{staticClass:"column is-narrow"},[r("div",{staticClass:"buttons"},[e.multipleSelected&&!e.addingNode&&"import"!==e.view&&e.canEdit?r("div",{staticClass:"button is-outlined is-primary",on:{click:function(t){return e.$emit("edit-multiple-event")}}},[e._m(0),r("span",[e._v(" Edit multiple ")])]):e._e(),e.addingNode||!e.canEdit||e.multipleSelected?e._e():r("div",{staticClass:"button is-outlined is-primary",on:{click:function(t){e.addingNode=!0}}},[e._m(1),r("span",[e._v(" "+e._s(e.addProgressionModelOrLevelText)+" ")])]),e.addingNode?r("div",{staticClass:"button is-outlined is-dark ",on:{click:function(t){e.addingNode=!1}}},[e._m(2),r("span",[e._v("cancel")])]):e._e(),e.addingNode?r("div",{staticClass:"button is-outlined is-primary ",on:{click:e.onClickCreateNew}},[e._m(3),r("span",[e._v(" create new ")])]):e._e(),"framework"===e.view||"concept"===e.view?r("div",{staticClass:"button is-outlined",class:e.canCopyOrCut?"is-primary":"is-disabled",attrs:{disabled:!e.canCopyOrCut,title:"Copy competency"},on:{click:e.copyClick}},[e._m(4)]):e._e(),"framework"===e.view||"concept"===e.view?r("div",{staticClass:"button is-outlined",class:e.canCopyOrCut?"is-primary":"is-disabled",attrs:{title:"Cut competency",disabled:!e.canCopyOrCut},on:{click:e.cutClick}},[e._m(5)]):e._e(),"framework"===e.view||"concept"===e.view?r("div",{staticClass:"button is-outlined ",class:e.canPaste?"is-primary":"is-disabled",attrs:{disabled:!e.canPaste,title:"Paste competency"},on:{click:e.pasteClick}},[e._m(6)]):e._e()])]),"import"===e.view?r("div",{staticClass:"column"},[r("div",{staticClass:"buttons is-right"},[r("div",{staticClass:"buttons is-right"},[r("div",{staticClass:" button is-light is-pulled-right is-dark is-outlined",on:{click:e.cancelImport}},[r("span",[e._v(" Cancel ")]),e._m(7)]),r("div",{staticClass:"button is-dark is-outlined is-pulled-right",on:{click:function(t){return e.$store.dispatch("app/clearImport")}}},[r("span",[e._v(" import again ")]),e._m(8)]),r("div",{staticClass:"button is-dark is-outlined is-pulled-right",on:{click:e.openFramework}},[r("span",[e._v("view in editor")]),e._m(9)]),r("router-link",{staticClass:"button is-primary is-outlined is -pulled-right",attrs:{to:{path:"/progressionLevels",query:e.queryParams}}},[r("span",[e._v(" Done ")]),r("span",{staticClass:"icon"},[r("i",{staticClass:"fa fa-home"})])])],1)])]):e._e()]),e.hierarchy?[r("draggable",e._b({staticClass:"lode__hierarchy-ul",attrs:{tag:"ul",disabled:!0!==e.canEdit||!e.isDraggable,group:{name:"test"},handle:".handle"},on:{start:e.beginDrag,end:e.endDrag},model:{value:e.hierarchy,callback:function(t){e.hierarchy=t},expression:"hierarchy"}},"draggable",e.dragOptions,!1),e._l(e.hierarchy,(function(t,n){return r("HierarchyNode",{key:t.obj.id,staticClass:"lode__hierarchy-li",attrs:{depth:1,view:e.view,subview:e.subview,obj:t.obj,dragging:e.dragging,canEdit:e.canEdit,hasChild:t.children,profile:e.profile,highlightList:e.highlightList,selectAll:e.selectAll,newFramework:e.newFramework,index:n,frameworkEditable:e.canEdit,selectedArray:e.selectedArray,parentStructure:e.hierarchy,parent:e.container,properties:e.properties,expandAll:1==e.expanded,parentChecked:!1,shiftKey:e.shiftKey,arrowKey:e.arrowKey},on:{"create-new-node-event":e.onCreateNewNode,"mounting-node":e.handleMountingNode,add:e.add,"begin-drag":e.beginDrag,move:e.move,select:e.select,"draggable-check":e.onDraggableCheck}})})),1)]:e._e()],2)},a=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fa fa-cog"})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fa fa-plus-circle"})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fa fa-times"})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fa fa-plus"})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fa fa-copy"})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fas handle fa-cut"})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fa fa-paste"})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fa fa-times-circle"})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fa fa-redo-alt"})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",{staticClass:"icon"},[r("i",{staticClass:"fa fa-edit"})])}],s=(n("99af"),n("c740"),n("fb6a"),n("a434"),n("d3b7"),n("3ca3"),n("ddb0"),n("96cf"),n("c964")),o=n("872c"),c=n("6ffa4"),d={name:"ProgressionHierarchy",props:{container:Object,containerType:String,repo:Object,profile:Object,highlightList:Array,selectMode:Boolean,selectAll:Boolean,containerTypeGet:String,viewOnly:Boolean,newFramework:Boolean,properties:String,view:{type:String,default:"framework"},subview:{type:String,default:""},doneDragging:{type:Boolean,default:!1}},data:function(){return{structure:[],once:!0,dragging:!1,controlOnStart:!1,filter:"showAll",dragIcon:"fa-arrows-alt",dragOptions:{delay:100,disabled:!1,ghostClass:"ghost-drag",chosenClass:"chosen-drag",dragClass:"drag",scrollSensitivity:200,forceFallback:!0},multipleSelected:!1,addingNode:!1,selectedArray:[],selectButtonText:null,expanded:!0,isDraggable:!0,shiftKey:!1,arrowKey:null,addProgressionModelOrLevelText:"Add Progression"}},components:{HierarchyNode:function(){return n.e("chunk-b9f1694a").then(n.bind(null,"b709"))},draggable:function(){return n.e("chunk-4a5f46a6").then(n.t.bind(null,"b76a",7))}},mixins:[o["a"],c["a"]],computed:{canCopyOrCut:function(){return!(!this.selectedArray||1!==this.selectedArray.length)},canPaste:function(){return(null!==this.$store.getters["editor/copyId"]||null!==this.$store.getters["editor/cutId"])&&null!==this.$store.getters["editor/nodeInFocus"]},queryParams:function(){return this.$store.getters["editor/queryParams"]},addAnother:function(){return this.$store.getters["editor/addAnother"]},hierarchy:function(){var e=this;if(null==this.container)return null;if(!this.once)return this.structure;appLog("Computing hierarchy.");var t=[];return null!=this.container["skos:hasTopConcept"]&&(t=t.concat(this.container["skos:hasTopConcept"])),t.length>0?this.repo.multiget(t,(function(t){e.computeHierarchy()}),appError):e.computeHierarchy(),this.structure},canEdit:function(){return!0!==this.viewOnly&&this.container.canEditAny(EcIdentityManager.default.getMyPks())},recomputeHierarchy:function(){return this.$store.getters["editor/recomputeHierarchy"]}},watch:{container:{handler:function(){this.once=!0},deep:!0},selectedArray:function(){this.selectedArray.length>1?this.multipleSelected=!0:this.multipleSelected=!1,1===this.selectedArray.length?this.addProgressionModelOrLevelText="Add Progression Level":this.addProgressionMaddProgressionModelOrLevelTextodelOrChildText="Add Progression Model",this.$emit("selected-array",this.selectedArray)},recomputeHierarchy:function(){this.recomputeHierarchy&&(this.once=!0,this.$store.commit("editor/recomputeHierarchy",!1))},doneDragging:function(){this.doneDragging&&(this.dragging=!1)},addAnother:function(e){e&&(this.onClickCreateNew(),this.$store.commit("editor/addAnother",!1))}},mounted:function(){this.queryParams&&(this.queryParams.singleSelect&&(this.selectButtonText=this.queryParams.singleSelect),this.queryParams.select&&""!==this.queryParams.select&&"select"!==this.queryParams.select&&(this.selectButtonText=this.queryParams.select)),window.addEventListener("keydown",this.keydown),window.addEventListener("keyup",this.keyup)},beforeDestroy:function(){window.removeEventListener("keyup",this.keyup),window.removeEventListener("keydown",this.keydown)},methods:{cutClick:function(){this.selectedArray&&1===this.selectedArray.length&&this.$store.commit("editor/cutId",this.selectedArray[0]),this.$store.commit("editor/copyId",null),this.$store.commit("editor/paste",!1)},copyClick:function(){this.selectedArray&&1===this.selectedArray.length&&this.$store.commit("editor/copyId",this.selectedArray[0]),this.$store.commit("editor/cutId",null),this.$store.commit("editor/paste",!1)},pasteClick:function(){this.$store.commit("editor/paste",!0)},keydown:function(e){this.canEdit&&(e.shiftKey&&(this.shiftKey=!0),-1!==e.key.indexOf("Arrow")&&e.shiftKey&&(this.arrowKey=e.key),"x"===e.key&&e.ctrlKey&&(this.selectedArray&&1===this.selectedArray.length&&this.$store.commit("editor/cutId",this.selectedArray[0]),this.$store.commit("editor/copyId",null),this.$store.commit("editor/paste",!1)),"c"===e.key&&e.ctrlKey&&(this.selectedArray&&1===this.selectedArray.length&&this.$store.commit("editor/copyId",this.selectedArray[0]),this.$store.commit("editor/cutId",null),this.$store.commit("editor/paste",!1)),"v"===e.key&&e.ctrlKey&&this.$store.commit("editor/paste",!0))},keyup:function(e){e.shiftKey||(this.shiftKey=!1),-1!==e.key.indexOf("Arrow")&&(this.arrowKey=null)},onCreateNewNode:function(e,t){this.add(e,t)},handleMountingNode:function(){this.startTime()},startTime:function(){var e=this;setTimeout((function(){e.$emit("done-loading-nodes")}),1e3)},computeHierarchy:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){var t,n,i,a,s,o=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t=[],null!=this.container){e.next=3;break}return e.abrupt("return",r);case 3:if(null===this.container["skos:hasTopConcept"]||void 0===this.container["skos:hasTopConcept"]){e.next=21;break}n=[],e.t0=regeneratorRuntime.keys(this.container["skos:hasTopConcept"]);case 6:if((e.t1=e.t0()).done){e.next=15;break}return i=e.t1.value,e.t2=n,e.next=11,EcConcept.get(this.container["skos:hasTopConcept"][i]);case 11:e.t3=e.sent,e.t2.push.call(e.t2,e.t3),e.next=6;break;case 15:a=n.findIndex((function(e){return!e["ceasn:precedes"]})),s=regeneratorRuntime.mark((function e(){var r,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if((a<0||a>=n.length)&&(a=n.length-1),r=n[a],i=-1,n.splice(a,1),a=n.findIndex((function(e){return r["ceasn:precededBy"]&&EcRemoteLinkedData.trimVersionFromUrl(e.id)===EcRemoteLinkedData.trimVersionFromUrl(r["ceasn:precededBy"])})),!r){e.next=10;break}if(r["ceasn:precededBy"]&&t.findIndex((function(e){return EcRemoteLinkedData.trimVersionFromUrl(e.obj.id)===EcRemoteLinkedData.trimVersionFromUrl(r["ceasn:precededBy"])}))>=0?(i=t.findIndex((function(e){return EcRemoteLinkedData.trimVersionFromUrl(e.obj.id)===EcRemoteLinkedData.trimVersionFromUrl(r["ceasn:precededBy"])}))+1,t.splice(i,0,{obj:r,children:[]})):r["ceasn:precedes"]&&t.findIndex((function(e){return EcRemoteLinkedData.trimVersionFromUrl(e.obj.id)===EcRemoteLinkedData.trimVersionFromUrl(r["ceasn:precedes"])}))>=0?(i=t.findIndex((function(e){return EcRemoteLinkedData.trimVersionFromUrl(e.obj.id)===EcRemoteLinkedData.trimVersionFromUrl(r["ceasn:precedes"])})),t.splice(i,0,{obj:r,children:[]})):(t.push({obj:r,children:[]}),i=t.length-1),!r["skos:narrower"]){e.next=10;break}return e.next=10,o.addChildren(t,r,i);case 10:case"end":return e.stop()}}),e)}));case 17:if(!(n.length>0)){e.next=21;break}return e.delegateYield(s(),"t4",19);case 19:e.next=17;break;case 21:this.structure=t,this.once=!1;case 23:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),addChildren:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t,r,n){var i=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(a){var s,o,c,d,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:s=[],e.t0=regeneratorRuntime.keys(r["skos:narrower"]);case 2:if((e.t1=e.t0()).done){e.next=11;break}return o=e.t1.value,e.t2=s,e.next=7,EcConcept.get(r["skos:narrower"][o]);case 7:e.t3=e.sent,e.t2.push.call(e.t2,e.t3),e.next=2;break;case 11:c=s.findIndex((function(e){return!e["ceasn:precedes"]}));case 12:if(!(s.length>0)){e.next=25;break}if((c<0||c>=s.length)&&(c=s.length-1),d=s[c],l=-1,s.splice(c,1),c=s.findIndex((function(e){return d["ceasn:precededBy"]&&EcRemoteLinkedData.trimVersionFromUrl(e.id)===EcRemoteLinkedData.trimVersionFromUrl(d["ceasn:precededBy"])})),!d){e.next=23;break}if(d["ceasn:precededBy"]&&t[n].children.findIndex((function(e){return EcRemoteLinkedData.trimVersionFromUrl(e.obj.id)===EcRemoteLinkedData.trimVersionFromUrl(d["ceasn:precededBy"])}))>=0?(l=t[n].children.findIndex((function(e){return EcRemoteLinkedData.trimVersionFromUrl(e.obj.id)===EcRemoteLinkedData.trimVersionFromUrl(d["ceasn:precededBy"])}))+1,t[n].children.splice(l,0,{obj:d,children:[]})):d["ceasn:precedes"]&&t[n].children.findIndex((function(e){return EcRemoteLinkedData.trimVersionFromUrl(e.obj.id)===EcRemoteLinkedData.trimVersionFromUrl(d["ceasn:precedes"])}))>=0?(l=t[n].children.findIndex((function(e){return EcRemoteLinkedData.trimVersionFromUrl(e.obj.id)===EcRemoteLinkedData.trimVersionFromUrl(d["ceasn:precedes"])})),t[n].children.splice(l,0,{obj:d,children:[]})):(t[n].children.push({obj:d,children:[]}),l=t[n].children.length-1),!d["skos:narrower"]){e.next=23;break}return e.next=23,i.addChildren(t[n].children,d,l);case 23:e.next=12;break;case 25:a();case 26:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 1:case"end":return e.stop()}}),e)})));function t(t,r,n){return e.apply(this,arguments)}return t}(),beginDrag:function(e){this.dragging=!0,void 0!==e&&(this.controlOnStart=e.originalEvent.ctrlKey||e.originalEvent.shiftKey)},endDrag:function(e){if("framework_drag"!==e.to.id){appLog(e.oldIndex,e.newIndex);var t=null,r=!1;this.shiftKey&&(this.controlOnStart=!0),e.from.id===e.to.id?e.newIndex+1<this.hierarchy.length?t=this.hierarchy[e.newIndex+1].obj.shortId():e.newIndex===this.hierarchy.length-1&&(r=!0):void 0===e.to.children[e.newIndex]?t=e.to.id:e.newIndex+1<e.to.children.length&&(t=e.to.children[e.newIndex+1].id),this.move(this.hierarchy[e.oldIndex].obj.shortId(),t,e.from.id,e.to.id,!this.controlOnStart,r)}else this.dragging=!1},move:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t,r,n,i,a,o){var c,d,l,u,h,p,m,f,g,y,k,v,w,b,E,C,x;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.once=!0,c=this,n!==i){e.next=26;break}if(!i){e.next=9;break}return e.next=6,EcRepository.get(i);case 6:e.t0=e.sent,e.next=10;break;case 9:e.t0=this.container;case 10:if(d=e.t0,l="skos:narrower","ConceptScheme"===d.type&&(d=this.container,l="skos:hasTopConcept"),u=d[l]?d[l].slice():null,h=d[l].indexOf(t),d[l].splice(h,1),null==r||void 0===r?(EcArray.isArray(d[l])||(d[l]=[]),d[l].push(t)):o?d[l].push(t):(p=d[l].indexOf(r),d[l].splice(p,0,t)),c.$store.commit("editor/addEditsToUndo",[{operation:"update",id:d.shortId(),fieldChanged:[l],initialValue:[u]}]),d["schema:dateModified"]=(new Date).toISOString(),!0!==this.$store.state.editor.private||!0===EcEncryptedValue.encryptOnSaveMap[d.id]){e.next=23;break}return e.next=22,EcEncryptedValue.toEncryptedValue(d);case 22:d=e.sent;case 23:this.repo.saveTo(d,(function(){c.computeHierarchy()}),appError),e.next=64;break;case 26:return e.next=28,EcConcept.get(t);case 28:if(m=e.sent,!n){e.next=35;break}return e.next=32,EcRepository.get(n);case 32:e.t1=e.sent,e.next=36;break;case 35:e.t1=this.container;case 36:if(f=e.t1,g="skos:narrower",y="skos:broader",!i){e.next=45;break}return e.next=42,EcRepository.get(i);case 42:e.t2=e.sent,e.next=46;break;case 45:e.t2=this.container;case 46:if(k=e.t2,v="skos:narrower",w="skos:broader","ConceptScheme"===f.type&&(f=this.container,g="skos:hasTopConcept",y="skos:topConceptOf"),"ConceptScheme"===k.type&&(k=this.container,v="skos:hasTopConcept",w="skos:topConceptOf"),h=f[g].indexOf(t),b=f[g].slice(),E=m[y]?m[y].slice():null,C=k[v]?k[v].slice():null,x=m[w]?m[w].slice():null,a&&f[g].splice(h,1),n&&m[y]?(a&&EcArray.setRemove(m[y],n),0===m[y].length&&delete m[y]):delete m[y],f["schema:dateModified"]=(new Date).toISOString(),!0!==this.$store.state.editor.private||!0===EcEncryptedValue.encryptOnSaveMap[f.id]){e.next=63;break}return e.next=62,EcEncryptedValue.toEncryptedValue(f);case 62:f=e.sent;case 63:this.repo.saveTo(f,Object(s["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(null==r||void 0===r?(EcArray.isArray(k[v])||(k[v]=[]),k[v].push(t)):(n=k[v].indexOf(r),k[v].splice(n,0,t)),"ConceptScheme"===k.type?m[w]=i:(EcArray.isArray(m[w])||(m[w]=[]),i&&m[w].push(i)),c.$store.commit("editor/addEditsToUndo",[{operation:"update",id:f.shortId(),fieldChanged:[g],initialValue:[b]},{operation:"update",id:k.shortId(),fieldChanged:[v],initialValue:[C]},{operation:"update",id:m.shortId(),fieldChanged:[y,w],initialValue:[E,x]}]),k["schema:dateModified"]=(new Date).toISOString(),m["schema:dateModified"]=(new Date).toISOString(),!0!==c.$store.state.editor.private||!0===EcEncryptedValue.encryptOnSaveMap[k.id]){e.next=9;break}return e.next=8,EcEncryptedValue.toEncryptedValue(k);case 8:k=e.sent;case 9:if(!0!==c.$store.state.editor.private||!0===EcEncryptedValue.encryptOnSaveMap[m.id]){e.next=13;break}return e.next=12,EcEncryptedValue.toEncryptedValue(m);case 12:m=e.sent;case 13:c.repo.saveTo(k,(function(){c.repo.saveTo(m,appLog,appError),c.computeHierarchy()}),appLog);case 14:case"end":return e.stop()}}),e)}))),appError);case 64:this.dragging=!1;case 65:case"end":return e.stop()}}),e,this)})));function t(t,r,n,i,a,s){return e.apply(this,arguments)}return t}(),add:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t,n){var i,a,s,o,c,d,l,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(i=this,a=new EcConcept,this.queryParams.newObjectEndpoint?a.generateShortId(this.queryParams.newObjectEndpoint):a.generateId(this.repo.selectedServer),a["subType"]="Progression",a["schema:dateCreated"]=(new Date).toISOString(),a["schema:dateModified"]=(new Date).toISOString(),null!=EcIdentityManager.default.ids&&EcIdentityManager.default.ids.length>0&&a.addOwner(EcIdentityManager.default.ids[0].ppk.toPk()),this.container.owner&&this.container.owner.length>0)for(s=0;s<this.container.owner.length;s++)o=this.container.owner[s],a.addOwner(EcPk.fromPem(o));if(this.container.reader&&this.container.reader.length>0)for(s=0;s<this.container.reader.length;s++)c=this.container.reader[s],r.addReader(EcPk.fromPem(c));if(this.setDefaultLanguage(),a["skos:prefLabel"]={"@language":this.$store.state.editor.defaultLanguage,"@value":"New Progression Level"},a["ceasn:inProgressionModel"]=this.container.shortId(),t!==this.container.shortId()){e.next=31;break}if(d=this.container["skos:hasTopConcept"]?this.container["skos:hasTopConcept"].slice():null,EcArray.isArray(this.container["skos:hasTopConcept"])||(this.container["skos:hasTopConcept"]=[]),null==n||void 0===n?this.container["skos:hasTopConcept"].push(a.shortId()):(l=this.container["skos:hasTopConcept"].indexOf(n),this.container["skos:hasTopConcept"].splice(l+1,0,a.shortId())),a["skos:topConceptOf"]=this.container.shortId(),i.$store.commit("editor/addEditsToUndo",[{operation:"addNew",id:a.shortId()},{operation:"update",id:this.container.shortId(),fieldChanged:["skos:hasTopConcept"],initialValue:[d]}]),this.container["schema:dateModified"]=(new Date).toISOString(),a["schema:dateModified"]=(new Date).toISOString(),!0!==this.$store.state.editor.private){e.next=28;break}return e.next=23,EcEncryptedValue.toEncryptedValue(a);case 23:if(a=e.sent,!0===EcEncryptedValue.encryptOnSaveMap[i.container.id]){e.next=28;break}return e.next=27,EcEncryptedValue.toEncryptedValue(i.container);case 27:i.container=e.sent;case 28:this.repo.saveTo(a,(function(){i.repo.saveTo(i.container,(function(){i.once=!0}),appError)}),appError),e.next=55;break;case 31:return a["skos:broader"]=[t],e.next=34,EcConcept.get(t);case 34:if(u=e.sent,d=u["skos:narrower"]?u["skos:narrower"].slice():null,EcArray.isArray(u["skos:narrower"])||(u["skos:narrower"]=[]),null==n||void 0===n?u["skos:narrower"].push(a.shortId()):(l=u["skos:narrower"].indexOf(n),u["skos:narrower"].splice(l+1,0,a.shortId())),i.$store.commit("editor/addEditsToUndo",[{operation:"addNew",id:a.shortId()},{operation:"update",id:u.shortId(),fieldChanged:["skos:narrower"],initialValue:[d]}]),this.container["schema:dateModified"]=(new Date).toISOString(),a["schema:dateModified"]=(new Date).toISOString(),u["schema:dateModified"]=(new Date).toISOString(),!0!==this.$store.state.editor.private){e.next=54;break}return e.next=45,EcEncryptedValue.toEncryptedValue(a);case 45:if(a=e.sent,!0===EcEncryptedValue.encryptOnSaveMap[u.id]){e.next=50;break}return e.next=49,EcEncryptedValue.toEncryptedValue(u);case 49:u=e.sent;case 50:if(!0===EcEncryptedValue.encryptOnSaveMap[i.container.id]){e.next=54;break}return e.next=53,EcEncryptedValue.toEncryptedValue(i.container);case 53:i.container=e.sent;case 54:this.repo.saveTo(a,(function(){i.repo.saveTo(u,(function(){i.repo.saveTo(i.container,(function(){i.once=!0}),appError)}),appError)}),appError);case 55:this.$store.commit("editor/newCompetency",a.shortId()),appLog("Added node: ",JSON.parse(a.toJson()));case 57:case"end":return e.stop()}}),e,this)})));function t(t,r){return e.apply(this,arguments)}return t}(),select:function(e,t){t?EcArray.setAdd(this.selectedArray,e):EcArray.setRemove(this.selectedArray,e)},onDraggableCheck:function(e){this.isDraggable=e},cancelImport:function(){this.deleteObject(this.container),this.$store.dispatch("app/clearImport")},openFramework:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,EcConceptScheme.get(this.container.shortId());case 2:t=e.sent,this.$store.commit("editor/framework",t),this.$router.push({name:"progressionModel",params:{frameworkId:this.container.id}});case 5:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),onClickCreateNew:function(){var e=this.container.shortId();1===this.selectedArray.length&&(e=this.selectedArray[0]),this.add(e,null),this.addingNode=!1}}},l=d,u=(n("24ea"),n("2877")),h=Object(u["a"])(l,i,a,!1,null,null,null);t["default"]=h.exports},"6ffa4":function(e,t,r){"use strict";r("fb6a"),r("96cf");var n=r("c964"),i=r("872c");t["a"]={mixins:[i["a"]],methods:{removeObject:function(e){appLog("removing "+e.id);var t=this,r=this.$store.getters["editor/framework"],i=r.competency?r.competency.slice():null,a=r.relation?r.relation.slice():null,s=r.level?r.level.slice():null;r["schema:dateModified"]=(new Date).toISOString(),r.removeCompetency(e.shortId(),Object(n["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=t.framework,t.$store.commit("editor/addEditsToUndo",[{operation:"update",id:n.shortId(),fieldChanged:["competency","relation","level"],initialValue:[i,a,s]}]),!0!==t.$store.state.editor.private||!0===EcEncryptedValue.encryptOnSaveMap[f.id]){e.next=6;break}return e.next=5,EcEncryptedValue.toEncryptedValue(n);case 5:n=e.sent;case 6:window.repo.saveTo(n,(function(){t.$store.commit("editor/framework",r)}),appError);case 7:case"end":return e.stop()}}),e)}))),appLog)},deleteObject:function(e){appLog("deleting "+e.id);var t=this,r=this.$store.getters["editor/framework"];if(e.shortId()===r.shortId())window.repo.deleteRegistered(r,(function(e){if(t.spitEvent("frameworkDeleted",r.shortId(),"editFrameworkSection"),null!=r.competency)for(var n=0;n<r.competency.length;n++)t.conditionalDelete(r.competency[n]);if(null!=r.relation)for(n=0;n<r.relation.length;n++)t.conditionalDelete(r.relation[n]);if(null!=r.level)for(n=0;n<r.level.length;n++)t.conditionalDelete(r.level[n]);t.$store.commit("editor/framework",null),t.importType?t.$store.commit("app/importFramework",null):t.$router.push({name:"frameworks"})}),appLog);else{var i=r.competency?r.competency.slice():null,a=r.relation?r.relation.slice():null,s=r.level?r.level.slice():null;this.$store.commit("editor/selectedCompetency",e),r["schema:dateModified"]=(new Date).toISOString(),r.removeCompetency(e.shortId(),Object(n["a"])(regeneratorRuntime.mark((function n(){var o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(r.removeLevel(e.shortId()),t.$store.commit("editor/addEditsToUndo",[{operation:"delete",obj:e},{operation:"update",id:r.shortId(),fieldChanged:["competency","relation","level"],initialValue:[i,a,s],changedValue:[r.competency,r.relation,r.level]}]),t.conditionalDelete(e.shortId()),t.spitEvent("competencyDeleted",e.shortId(),"editFrameworkSection"),t.$store.commit("editor/selectedCompetency",null),o=r,!0!==t.$store.state.editor.private||!0===EcEncryptedValue.encryptOnSaveMap[r.id]){n.next=10;break}return n.next=9,EcEncryptedValue.toEncryptedValue(r);case 9:o=n.sent;case 10:window.repo.saveTo(o,(function(){t.$store.commit("editor/framework",r)}),appError);case 11:case"end":return n.stop()}}),n)}))),appLog)}}}}},a348:function(e,t,r){},c740:function(e,t,r){"use strict";var n=r("23e7"),i=r("b727").findIndex,a=r("44d2"),s="findIndex",o=!0;s in[]&&Array(1)[s]((function(){o=!1})),n({target:"Array",proto:!0,forced:o},{findIndex:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),a(s)}}]);
//# sourceMappingURL=chunk-51369fc1.082cf2b7.js.map