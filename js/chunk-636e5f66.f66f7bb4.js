(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-636e5f66","chunk-62fb7533","chunk-83807946","chunk-83807946","chunk-74a95bb3"],{"2d77":function(e,t,o){"use strict";o.r(t);var a=function(){var e=this,t=e._self._c;return t("modal-template",{attrs:{type:"primary",size:"small",active:!0},on:{close:e.closeModal}},[t("template",{slot:"modal-header"},[e._v(" Confirm Remove Competency ")]),t("template",{slot:"modal-body"},[t("section",[t("b",[e._v(" Removing a competency safely removes the item from this framework. ")]),e._v(" The competency will still be discoverable via search and will remain in other frameworks it may be a part of. ")])]),t("template",{slot:"modal-foot"},[t("button",{staticClass:"is-danger is-outlined button",on:{click:function(t){return e.removeItem()}}},[e._v(" Remove Competency ")]),t("button",{staticClass:"is-dark button",on:{click:function(t){return e.closeModal()}}},[e._v(" Cancel ")])])],2)},r=[],n=o("af07"),i=o("6ffa4"),l={name:"RemoveCompetencyConfirm",mixins:[i["a"]],components:{ModalTemplate:n["a"]},data:function(){return{}},computed:{obj:function(){return this.$store.getters["editor/itemToRemove"]},framework:function(){return this.$store.getters["editor/framework"]}},mounted:function(){},methods:{removeItem:function(){this.removeObject(this.obj),this.closeModal(),this.$store.commit("editor/setItemToRemove",{})},closeModal:function(){this.$store.commit("app/closeModal"),this.$store.commit("editor/setItemToRemove",{})}}},c=l,s=o("2877"),d=Object(s["a"])(c,a,r,!1,null,null,null);t["default"]=d.exports},"2f8b":function(e,t,o){},"6ffa4":function(e,t,o){"use strict";o("fb6a"),o("14d9");var a=o("c7eb"),r=o("1da1"),n=o("872c");t["a"]={mixins:[n["a"]],methods:{removeObject:function(e){appLog("removing "+e.id);var t=this,o=this.$store.getters["editor/framework"],n=o.competency?o.competency.slice():null,i=o.relation?o.relation.slice():null,l=o.level?o.level.slice():null;o["schema:dateModified"]=(new Date).toISOString(),o.removeCompetency(e.shortId(),Object(r["a"])(Object(a["a"])().mark((function e(){var r;return Object(a["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r=t.framework,t.$store.commit("editor/addEditsToUndo",[{operation:"update",id:r.shortId(),fieldChanged:["competency","relation","level"],initialValue:[n,i,l]}]),!0!==t.$store.state.editor.private||!0===EcEncryptedValue.encryptOnSaveMap[f.id]){e.next=6;break}return e.next=5,EcEncryptedValue.toEncryptedValue(r);case 5:r=e.sent;case 6:window.repo.saveTo(r,(function(){t.$store.commit("editor/framework",o)}),appError);case 7:case"end":return e.stop()}}),e)}))),appLog)},deleteObject:function(e){appLog("deleting "+e.id);var t=this,o=this.$store.getters["editor/framework"];if(e.shortId()===o.shortId())window.repo.deleteRegistered(o,(function(e){if(t.spitEvent("frameworkDeleted",o.shortId(),"editFrameworkSection"),null!=o.competency)for(var a=0;a<o.competency.length;a++)t.conditionalDelete(o.competency[a]);if(null!=o.relation)for(a=0;a<o.relation.length;a++)t.conditionalDelete(o.relation[a]);if(null!=o.level)for(a=0;a<o.level.length;a++)t.conditionalDelete(o.level[a]);t.$store.commit("editor/framework",null),t.importType?t.$store.commit("app/importFramework",null):t.$router.push({name:"frameworks"})}),appLog);else{var n=o.competency?o.competency.slice():null,i=o.relation?o.relation.slice():null,l=o.level?o.level.slice():null;this.$store.commit("editor/selectedCompetency",e),o["schema:dateModified"]=(new Date).toISOString(),o.removeCompetency(e.shortId(),Object(r["a"])(Object(a["a"])().mark((function r(){var c;return Object(a["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(o.removeLevel(e.shortId()),t.$store.commit("editor/addEditsToUndo",[{operation:"delete",obj:e},{operation:"update",id:o.shortId(),fieldChanged:["competency","relation","level"],initialValue:[n,i,l],changedValue:[o.competency,o.relation,o.level]}]),t.conditionalDelete(e.shortId()),t.spitEvent("competencyDeleted",e.shortId(),"editFrameworkSection"),t.$store.commit("editor/selectedCompetency",null),c=o,!0!==t.$store.state.editor.private||!0===EcEncryptedValue.encryptOnSaveMap[o.id]){a.next=10;break}return a.next=9,EcEncryptedValue.toEncryptedValue(o);case 9:c=a.sent;case 10:window.repo.saveTo(c,(function(){t.$store.commit("editor/framework",o)}),appError);case 11:case"end":return a.stop()}}),r)}))),appLog)}}}}},"840c":function(e,t,o){"use strict";o("2f8b")},"984b":function(e,t,o){},af07:function(e,t,o){"use strict";var a=function(){var e=this,t=e._self._c;return t("div",{staticClass:"modal cass-editor___modal",class:[{"is-active":e.active},"is-"+e.size,"cass-editor__modal--"+e.content],attrs:{id:"cass-modal"}},[t("div",{staticClass:"modal-background"}),t("div",{staticClass:"modal-card",class:"cass-editor__modal-card--"+e.size},[t("header",{staticClass:"modal-card-head is-size-4 has-text-weight-bold",class:["has-background-"+e.type,"has-text-"+e.fontColor]},[t("p",{staticClass:"modal-card-title"},[e._t("modal-header")],2),e.canClose?t("button",{staticClass:"delete",attrs:{"aria-label":"close"},on:{click:function(t){e.$store.commit("app/closeModal"),e.$emit("close")}}}):e._e()]),t("div",{staticClass:"modal-card-body has-text-dark"},[e._t("modal-body")],2),t("footer",{staticClass:"modal-card-foot has-background-white"},[e._t("modal-foot")],2)])])},r=[],n=(o("984b"),{name:"ModalTemplate",props:{canClose:{type:Boolean,default:!0},active:{type:Boolean,default:!1},type:{default:"primary",type:String},fontColor:{type:String,default:"white"},size:{type:String,default:"medium"},content:{defualt:"default",type:String}},data:function(){return{}},computed:{}}),i=n,l=(o("840c"),o("2877")),c=Object(l["a"])(i,a,r,!1,null,null,null);t["a"]=c.exports}}]);
//# sourceMappingURL=chunk-636e5f66.f66f7bb4.js.map