(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-31ea397f"],{"08bc":function(e,t,i){"use strict";var r=i("891f"),n=i.n(r);n.a},"25d8":function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"lode__hierarchy"},[i("div",{staticClass:"hierarchy-buttons columns is-gapless is-paddingless is-mobile is-marginless is-paddingless"},["import"!==e.view?i("div",{staticClass:"column is-narrow",attrs:{id:"check-radio-all-column"}},[i("div",{staticClass:"field"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.selectAll,expression:"selectAll"}],staticClass:"is-checkradio",attrs:{id:"selectAllCheckbox",type:"checkbox",name:"selectAllCheckbox"},domProps:{checked:Array.isArray(e.selectAll)?e._i(e.selectAll,null)>-1:e.selectAll},on:{change:function(t){var i=e.selectAll,r=t.target,n=!!r.checked;if(Array.isArray(i)){var o=null,s=e._i(i,o);r.checked?s<0&&(e.selectAll=i.concat([o])):s>-1&&(e.selectAll=i.slice(0,s).concat(i.slice(s+1)))}else e.selectAll=n}}}),i("label",{attrs:{for:"selectAllCheckbox"}})])]):e._e(),i("div",{staticClass:"column is-narrow"},[e.expanded?i("div",{staticClass:"icon is-vcentered",on:{click:function(t){e.expanded=!1}}},[i("i",{staticClass:"fa fa-caret-down has-text-primary is-size-2"})]):e.expanded?i("div",{staticClass:"icon is-vcentered"},[i("i",{staticClass:"fa fa-circle is-size-7 has-text-light"})]):i("div",{staticClass:"icon is-vcentered",on:{click:function(t){e.expanded=!0}}},[i("i",{staticClass:"fa fa-caret-right has-text-primary is-size-2"})]),e.selectButtonText?i("div",{staticClass:"button is-small is-outlined is-primary",on:{click:function(t){return e.$emit("selectButtonClick",e.selectedArray)}}},[e._v(" "+e._s(e.selectButtonText)+" ")]):e._e()]),i("div",{staticClass:"column is-narrow"},[i("div",{staticClass:"buttons"},[e.multipleSelected&&!e.addingNode&&"import"!==e.view&&e.canEdit?i("div",{staticClass:"button is-outlined is-primary",on:{click:function(t){return e.$emit("editMultipleEvent")}}},[e._m(0),i("span",[e._v(" Edit multiple ")])]):e._e(),e.addingNode||!e.canEdit||e.multipleSelected?e._e():i("div",{staticClass:"button is-outlined is-primary",on:{click:function(t){e.addingNode=!0}}},[e._m(1),i("span",[e._v(" Add Concept ")])]),e.addingNode?i("div",{staticClass:"button is-outlined is-dark ",on:{click:function(t){e.addingNode=!1}}},[e._m(2),i("span",[e._v("cancel")])]):e._e(),e.addingNode?i("div",{staticClass:"button is-outlined is-primary ",on:{click:function(t){e.add(e.container.shortId(),null),e.addingNode=!1}}},[e._m(3),i("span",[e._v(" create new ")])]):e._e()])])]),i("hr"),e.hierarchy?[i("draggable",e._b({staticClass:"lode__hierarchy-ul",attrs:{tag:"ul",disabled:!0!==e.canEdit||!e.isDraggable,group:{name:"test"},handle:".handle"},on:{start:e.beginDrag,end:e.endDrag},model:{value:e.hierarchy,callback:function(t){e.hierarchy=t},expression:"hierarchy"}},"draggable",e.dragOptions,!1),e._l(e.hierarchy,(function(t,r){return i("HierarchyNode",{key:t.obj.id,staticClass:"lode__hierarchy-li",attrs:{view:e.view,subview:e.subview,obj:t.obj,dragging:e.dragging,canEdit:e.canEdit,hasChild:t.children,profile:e.profile,exportOptions:e.exportOptions,highlightList:e.highlightList,selectAll:e.selectAll,newFramework:e.newFramework,index:r,frameworkEditable:e.canEdit,selectedArray:e.selectedArray,parentStructure:e.hierarchy,parent:e.container,properties:e.properties,expandAll:1==e.expanded,parentChecked:!1,shiftKey:e.shiftKey,arrowKey:e.arrowKey},on:{createNewNodeEvent:e.onCreateNewNode,mountingNode:e.handleMountingNode,add:e.add,beginDrag:e.beginDrag,move:e.move,deleteObject:e.deleteObject,exportObject:e.exportObject,select:e.select,draggableCheck:e.onDraggableCheck}})})),1)]:e._e()],2)},o=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("span",{staticClass:"icon"},[i("i",{staticClass:"fa fa-cog"})])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("span",{staticClass:"icon"},[i("i",{staticClass:"fa fa-plus-circle"})])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("span",{staticClass:"icon"},[i("i",{staticClass:"fa fa-times"})])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("span",{staticClass:"icon"},[i("i",{staticClass:"fa fa-plus"})])}],s=(i("99af"),i("c975"),i("fb6a"),i("a434"),i("d3b7"),i("872c")),a={name:"ConceptHierarchy",props:{container:Object,containerType:String,repo:Object,profile:Object,exportOptions:Array,highlightList:Array,selectMode:Boolean,selectAll:Boolean,containerTypeGet:String,viewOnly:Boolean,newFramework:Boolean,properties:String,view:{type:String,default:"framework"},subview:{type:String,default:""}},data:function(){return{structure:[],once:!0,dragging:!1,controlOnStart:!1,filter:"showAll",dragIcon:"fa-arrows-alt",dragOptions:{delay:100,disabled:!1,ghostClass:"ghost-drag",chosenClass:"chosen-drag",dragClass:"drag",scrollSensitivity:200,forceFallback:!0},multipleSelected:!1,addingNode:!1,selectedArray:[],selectButtonText:null,expanded:!0,isDraggable:!0,shiftKey:!1,arrowKey:null}},components:{HierarchyNode:function(){return i.e("chunk-6a14e7d0").then(i.bind(null,"8461"))},draggable:function(){return i.e("chunk-4a49d1f9").then(i.t.bind(null,"310e",7))}},mixins:[s["a"]],computed:{queryParams:function(){return this.$store.getters["editor/queryParams"]},hierarchy:function(){var e=this;if(null==this.container)return null;if(!this.once)return this.structure;console.log("Computing hierarchy.");var t=[];return null!=this.container["skos:hasTopConcept"]&&(t=t.concat(this.container["skos:hasTopConcept"])),t.length>0?this.repo.multiget(t,(function(t){e.computeHierarchy()}),console.error,console.log):e.computeHierarchy(),this.structure},canEdit:function(){return!0!==this.viewOnly&&this.container.canEditAny(EcIdentityManager.getMyPks())},recomputeHierarchy:function(){return this.$store.getters["editor/recomputeHierarchy"]}},watch:{container:{handler:function(){this.once=!0},deep:!0},selectedArray:function(){this.selectedArray.length>1?this.multipleSelected=!0:this.multipleSelected=!1,this.$emit("selectedArray",this.selectedArray)},recomputeHierarchy:function(){this.recomputeHierarchy&&(this.once=!0,this.$store.commit("editor/recomputeHierarchy",!1))}},mounted:function(){this.queryParams&&(this.queryParams.singleSelect&&(this.selectButtonText=this.queryParams.singleSelect),this.queryParams.select&&""!==this.queryParams.select&&"select"!==this.queryParams.select&&(this.selectButtonText=this.queryParams.select)),window.addEventListener("keydown",this.keydown),window.addEventListener("keyup",this.keyup)},beforeDestroy:function(){window.removeEventListener("keyup",this.keyup),window.removeEventListener("keydown",this.keydown)},methods:{keydown:function(e){this.canEdit&&(e.shiftKey&&(this.shiftKey=!0),-1!==e.key.indexOf("Arrow")&&e.shiftKey&&(this.arrowKey=e.key),"x"===e.key&&e.ctrlKey&&(this.selectedArray&&1===this.selectedArray.length&&this.$store.commit("editor/cutId",this.selectedArray[0]),this.$store.commit("editor/copyId",null),this.$store.commit("editor/paste",!1)),"c"===e.key&&e.ctrlKey&&(this.selectedArray&&1===this.selectedArray.length&&this.$store.commit("editor/copyId",this.selectedArray[0]),this.$store.commit("editor/cutId",null),this.$store.commit("editor/paste",!1)),"v"===e.key&&e.ctrlKey&&this.$store.commit("editor/paste",!0))},keyup:function(e){e.shiftKey||(this.shiftKey=!1),-1!==e.key.indexOf("Arrow")&&(this.arrowKey=null)},onCreateNewNode:function(e,t){this.add(e,t)},handleMountingNode:function(){this.startTime()},startTime:function(){var e=this;setTimeout((function(){e.$emit("doneLoadingNodes")}),1e3)},computeHierarchy:function(){if(this.structure.splice(0,this.structure.length),null==this.container)return r;if(null!==this.container["skos:hasTopConcept"]&&void 0!==this.container["skos:hasTopConcept"])for(var e=0;e<this.container["skos:hasTopConcept"].length;e++){var t=EcConcept.getBlocking(this.container["skos:hasTopConcept"][e]);t&&(this.structure.push({obj:t,children:[]}),t["skos:narrower"]&&this.addChildren(this.structure,t,e))}this.once=!1},addChildren:function(e,t,i){for(var r=0;r<t["skos:narrower"].length;r++){var n=EcConcept.getBlocking(t["skos:narrower"][r]);e[i].children.push({obj:n,children:[]}),n&&n["skos:narrower"]&&this.addChildren(e[i].children,n,r)}},beginDrag:function(e){this.dragging=!0,void 0!==e&&(this.controlOnStart=e.originalEvent.ctrlKey||e.originalEvent.shiftKey)},endDrag:function(e){console.log(e.oldIndex,e.newIndex);var t=null,i=0;this.shiftKey&&(this.controlOnStart=!0),e.from.id===e.to.id?(e.newIndex<this.hierarchy.length&&(t=this.hierarchy[e.newIndex].obj.shortId()),i=1):void 0===e.to.children[e.newIndex]?t=e.to.id:e.newIndex+1<e.to.children.length&&(t=e.to.children[e.newIndex+1].id),this.move(this.hierarchy[e.oldIndex].obj.shortId(),t,e.from.id,e.to.id,!this.controlOnStart,i)},move:function(e,t,i,r,n,o){this.once=!0;var s=this;if(i===r){var a=EcConcept.getBlocking(r),c="skos:narrower";null===a&&(a=this.container,c="skos:hasTopConcept");var l=a[c]?a[c].slice():null,d=a[c].indexOf(e);if(a[c].splice(d,1),null==t||void 0===t)EcArray.isArray(a[c])||(a[c]=[]),a[c].push(e);else{var h=a[c].indexOf(t);a[c].splice(h,0,e)}s.$store.commit("editor/addEditsToUndo",[{operation:"update",id:a.shortId(),fieldChanged:[c],initialValue:[l]}]),a["schema:dateModified"]=(new Date).toISOString(),!0===this.$store.state.editor.private&&!0!==EcEncryptedValue.encryptOnSaveMap[a.id]&&(a=EcEncryptedValue.toEncryptedValue(a)),this.repo.saveTo(a,(function(){s.computeHierarchy()}),console.error)}else{var u=EcConcept.getBlocking(e),p=EcConcept.getBlocking(i),y="skos:narrower",g="skos:broader",f=EcConcept.getBlocking(r),m="skos:narrower",v="skos:broader";null===p&&(p=this.container,y="skos:hasTopConcept",g="skos:topConceptOf"),null===f&&(f=this.container,m="skos:hasTopConcept",v="skos:topConceptOf");d=p[y].indexOf(e);var k=p[y].slice(),w=u[g]?u[g].slice():null,E=f[m]?f[m].slice():null,C=u[v]?u[v].slice():null;n&&p[y].splice(d,1),i&&u[g]?(n&&EcArray.setRemove(u[g],i),0===u[g].length&&delete u[g]):delete u[g],p["schema:dateModified"]=(new Date).toISOString(),!0===this.$store.state.editor.private&&!0!==EcEncryptedValue.encryptOnSaveMap[p.id]&&(p=EcEncryptedValue.toEncryptedValue(p)),this.repo.saveTo(p,(function(){if(null==t||void 0===t)EcArray.isArray(f[m])||(f[m]=[]),f[m].push(e);else{var i=f[m].indexOf(t);f[m].splice(i,0,e)}EcArray.isArray(u[v])||(u[v]=[]),r?u[v].push(r):u[v].push(s.container.shortId()),s.$store.commit("editor/addEditsToUndo",[{operation:"update",id:p.shortId(),fieldChanged:[y],initialValue:[k]},{operation:"update",id:f.shortId(),fieldChanged:[m],initialValue:[E]},{operation:"update",id:u.shortId(),fieldChanged:[g,v],initialValue:[w,C]}]),f["schema:dateModified"]=(new Date).toISOString(),u["schema:dateModified"]=(new Date).toISOString(),!0===s.$store.state.editor.private&&!0!==EcEncryptedValue.encryptOnSaveMap[f.id]&&(f=EcEncryptedValue.toEncryptedValue(f)),!0===s.$store.state.editor.private&&!0!==EcEncryptedValue.encryptOnSaveMap[u.id]&&(u=EcEncryptedValue.toEncryptedValue(u)),s.repo.saveTo(f,(function(){s.repo.saveTo(u,console.log,console.error),s.computeHierarchy()}),console.log)}),console.error)}this.dragging=!1},add:function(e,t){var i=this,n=new EcConcept;if(this.queryParams.newObjectEndpoint?n.generateShortId(this.queryParams.newObjectEndpoint):n.generateId(this.repo.selectedServer),n["schema:dateCreated"]=(new Date).toISOString(),n["schema:dateModified"]=(new Date).toISOString(),null!=EcIdentityManager.ids&&EcIdentityManager.ids.length>0&&n.addOwner(EcIdentityManager.ids[0].ppk.toPk()),this.container.owner&&this.container.owner.length>0)for(var o=0;o<this.container.owner.length;o++){var s=this.container.owner[o];n.addOwner(EcPk.fromPem(s))}if(this.container.reader&&this.container.reader.length>0)for(o=0;o<this.container.reader.length;o++){var a=this.container.reader[o];r.addReader(EcPk.fromPem(a))}if(this.setDefaultLanguage(),n["skos:prefLabel"]={"@language":this.$store.state.editor.defaultLanguage,"@value":"New Concept"},n["skos:inScheme"]=this.container.shortId(),e===this.container.shortId()){var c=this.container["skos:hasTopConcept"]?this.container["skos:hasTopConcept"].slice():null;if(EcArray.isArray(this.container["skos:hasTopConcept"])||(this.container["skos:hasTopConcept"]=[]),null==t||void 0===t)this.container["skos:hasTopConcept"].unshift(n.shortId());else{var l=this.container["skos:hasTopConcept"].indexOf(t);this.container["skos:hasTopConcept"].splice(l+1,0,n.shortId())}n["skos:topConceptOf"]=this.container.shortId(),i.$store.commit("editor/addEditsToUndo",[{operation:"addNew",id:n.shortId()},{operation:"update",id:this.container.shortId(),fieldChanged:["skos:hasTopConcept"],initialValue:[c]}]),this.container["schema:dateModified"]=(new Date).toISOString(),n["schema:dateModified"]=(new Date).toISOString(),!0===this.$store.state.editor.private&&(n=EcEncryptedValue.toEncryptedValue(n),!0!==EcEncryptedValue.encryptOnSaveMap[i.container.id]&&(i.container=EcEncryptedValue.toEncryptedValue(i.container))),this.repo.saveTo(n,(function(){i.repo.saveTo(i.container,(function(){i.once=!0}),console.error)}),console.error)}else{n["skos:broader"]=[e];var d=EcConcept.getBlocking(e);c=d["skos:narrower"]?d["skos:narrower"].slice():null;if(EcArray.isArray(d["skos:narrower"])||(d["skos:narrower"]=[]),null==t||void 0===t)d["skos:narrower"].unshift(n.shortId());else{l=d["skos:narrower"].indexOf(t);d["skos:narrower"].splice(l+1,0,n.shortId())}i.$store.commit("editor/addEditsToUndo",[{operation:"addNew",id:n.shortId()},{operation:"update",id:d.shortId(),fieldChanged:["skos:narrower"],initialValue:[c]}]),this.container["schema:dateModified"]=(new Date).toISOString(),n["schema:dateModified"]=(new Date).toISOString(),d["schema:dateModified"]=(new Date).toISOString(),!0===this.$store.state.editor.private&&(n=EcEncryptedValue.toEncryptedValue(n),!0!==EcEncryptedValue.encryptOnSaveMap[d.id]&&(d=EcEncryptedValue.toEncryptedValue(d)),!0!==EcEncryptedValue.encryptOnSaveMap[i.container.id]&&(i.container=EcEncryptedValue.toEncryptedValue(i.container))),this.repo.saveTo(n,(function(){i.repo.saveTo(d,(function(){i.repo.saveTo(i.container,(function(){i.once=!0}),console.error)}),console.error)}),console.error)}this.$store.commit("editor/newCompetency",n.shortId()),console.log("Added node: ",JSON.parse(n.toJson()))},select:function(e,t){t?EcArray.setAdd(this.selectedArray,e):EcArray.setRemove(this.selectedArray,e)},deleteObject:function(e){this.$emit("deleteObject",e)},exportObject:function(e,t){this.$emit("exportObject",e,t)},onDraggableCheck:function(e){this.isDraggable=e}}},c=a,l=(i("08bc"),i("2877")),d=Object(l["a"])(c,n,o,!1,null,null,null);t["default"]=d.exports},"891f":function(e,t,i){}}]);
//# sourceMappingURL=chunk-31ea397f.7c8de8f7.js.map