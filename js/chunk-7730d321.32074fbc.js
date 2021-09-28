(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7730d321","chunk-f3b8fe20"],{"26bb":function(e,t,o){"use strict";o.r(t);var a=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("modal-template",{attrs:{type:"danger",size:"small",active:!0},on:{close:e.closeModal}},[o("template",{slot:"modal-header"},[e._v(" Confirm Delete Concept ")]),o("template",{slot:"modal-body"},[o("section",[o("b",[e._v(" Warning! This action is permanent. ")])])]),o("template",{slot:"modal-foot"},[o("button",{staticClass:"is-danger is-outlined button",on:{click:function(t){return e.deleteItem()}}},[e._v(" Delete Concept ")]),o("button",{staticClass:"is-dark button",on:{click:function(t){return e.closeModal()}}},[e._v(" Cancel ")])])],2)},r=[],n=(o("fb6a"),o("a434"),o("96cf"),o("c964")),s=o("af07"),i=o("872c"),c={name:"DeleteConceptConfirm",components:{ModalTemplate:s["a"]},mixins:[i["a"]],computed:{obj:function(){return this.$store.getters["editor/itemToDelete"]},framework:function(){return this.$store.getters["editor/framework"]}},data:function(){return{editsToUndo:[]}},methods:{deleteItem:function(){this.deleteObject(this.obj),this.closeModal()},closeModal:function(){this.$store.commit("app/closeModal"),this.$store.commit("editor/setItemToDelete",{})},deleteObject:function(e){appLog("deleting "+e.id),this.deleteConceptInner(e),this.framework["schema:dateModified"]=(new Date).toISOString(),this.$store.commit("editor/selectedCompetency",null)},deleteConceptInner:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var o,a,r,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(o=this,null!=t["skos:broader"])for(a=0;a<t["skos:broader"].length;a++)EcConcept.get(t["skos:broader"][a],function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(a){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r=a["skos:narrower"].slice(),EcArray.setRemove(a["skos:narrower"],t.shortId()),a["schema:dateModified"]=(new Date).toISOString(),o.editsToUndo.push({operation:"update",id:a.shortId(),fieldChanged:["skos:narrower"],initialValue:[r]}),!0!==o.$store.state.editor.private||!0===EcEncryptedValue.encryptOnSaveMap[a.id]){e.next=8;break}return e.next=7,EcEncryptedValue.toEncryptedValue(a);case 7:a=e.sent;case 8:repo.saveTo(a,(function(){o.$store.commit("editor/framework",o.framework)}),appError);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),appError);if(null!=t["skos:narrower"])for(a=0;a<t["skos:narrower"].length;a++)EcConcept.get(t["skos:narrower"][a],(function(e){o.deleteConceptInner(e)}),appError);if(null==t["skos:topConceptOf"]){e.next=14;break}if(r=this.framework["skos:hasTopConcept"].slice(),EcArray.setRemove(this.framework["skos:hasTopConcept"],t.shortId()),o.editsToUndo.push({operation:"update",id:this.framework.shortId(),fieldChanged:["skos:hasTopConcept"],initialValue:[r]}),s=this.framework,s["schema:dateModified"]=(new Date).toISOString(),!0!==this.$store.state.editor.private||!0===EcEncryptedValue.encryptOnSaveMap[s.id]){e.next=13;break}return e.next=12,EcEncryptedValue.toEncryptedValue(s);case 12:s=e.sent;case 13:repo.saveTo(s,(function(){o.$store.commit("editor/framework",o.framework)}),appError);case 14:this.spitEvent("conceptDeleted",t.shortId(),"editFrameworkPage"),o.editsToUndo.push({operation:"delete",obj:t}),repo.deleteRegistered(t,(function(){o.$store.commit("editor/framework",o.framework),o.$store.commit("editor/addEditsToUndo",JSON.parse(JSON.stringify(o.editsToUndo))),o.editsToUndo.splice(0,o.editsToUndo.length)}),appError);case 17:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()}},d=c,l=o("2877"),p=Object(l["a"])(d,a,r,!1,null,null,null);t["default"]=p.exports},"984b":function(e,t,o){},a907:function(e,t,o){},ad86:function(e,t,o){"use strict";var a=o("a907"),r=o.n(a);r.a},af07:function(e,t,o){"use strict";var a=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"modal cass-editor___modal",class:[{"is-active":e.active},"is-"+e.size,"cass-editor__modal--"+e.content],attrs:{id:"cass-modal"}},[o("div",{staticClass:"modal-background"}),o("div",{staticClass:"modal-card",class:"cass-editor__modal-card--"+e.size},[o("header",{staticClass:"modal-card-head is-size-4 has-text-weight-bold",class:["has-background-"+e.type,"has-text-"+e.fontColor]},[o("p",{staticClass:"modal-card-title"},[e._t("modal-header")],2),e.canClose?o("button",{staticClass:"delete",attrs:{"aria-label":"close"},on:{click:function(t){e.$store.commit("app/closeModal"),e.$emit("close")}}}):e._e()]),o("div",{staticClass:"modal-card-body has-text-dark"},[e._t("modal-body")],2),o("footer",{staticClass:"modal-card-foot has-background-white"},[e._t("modal-foot")],2)])])},r=[],n=(o("984b"),{name:"ModalTemplate",props:{canClose:{type:Boolean,default:!0},active:{type:Boolean,default:!1},type:{default:"primary",type:String},fontColor:{type:String,default:"white"},size:{type:String,default:"medium"},content:{defualt:"default",type:String}},data:function(){return{}},computed:{}}),s=n,i=(o("ad86"),o("2877")),c=Object(i["a"])(s,a,r,!1,null,null,null);t["a"]=c.exports}}]);
//# sourceMappingURL=chunk-7730d321.32074fbc.js.map