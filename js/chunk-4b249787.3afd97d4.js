(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4b249787"],{"5e26":function(e,t,i){"use strict";i.r(t);i("caad"),i("2532"),i("99af"),i("fb6a"),i("b0c0");var a=function(){var e=this,t=e._self._c;return e.expandedThing?t("div",{directives:[{name:"observe-visibility",rawName:"v-observe-visibility",value:e.visibilityChanged,expression:"visibilityChanged"}],class:["lode__Property lode__"+e.shortTypeAsClass,e.editingPropertyClass,{"has-value":e.expandedValue}]},[t("modal-template",{attrs:{active:e.removePropertyConfirmModal},on:{close:e.closeModal}},[t("template",{slot:"modal-header"},[e._v(" Confirm Remove Property ")]),t("template",{slot:"modal-body"},[t("section",[e._v(" Are you sure you'd like to remove this property? ")])]),t("template",{slot:"modal-foot"},[t("button",{staticClass:"is-danger is-outlined button",on:{click:e.clickConfirmRemove}},[e._v(" Confirm Remove Property ")]),t("button",{staticClass:"is-dark button",on:{click:e.closeModal}},[e._v(" Cancel ")])])],2),e.expandedValue&&e.show?[e._l(e.expandedValue,(function(i,a){return t("div",{key:a,staticClass:"property-section"},[e.editingProperty?[0===a?t("label",{staticClass:"label is-medium",attrs:{title:e.comment}},[e._v(" "+e._s(e.displayLabel)+e._s(e.isRequired?"*":"")+" "),e.comment?t("i",{staticClass:"fa fa-info-circle has-text-dark",attrs:{title:e.comment,"aria-hidden":"true"}}):e._e()]):e._e()]:e._e(),!e.editingProperty&&e.isLink(i)&&"@id"!=e.expandedProperty&&"registryURL"!=e.expandedProperty?[t(e.dynamicThing,{tag:"Component",staticClass:"lode__property",attrs:{uri:i["@id"]||i["@value"],clickToLoad:!0,competencyAsPropertyType:e.displayLabel,competencyAsPropertyObjectType:e.objectType,parentNotEditable:!e.canEdit,profile:e.childProfile}}),e.editingProperty?t("div",{staticClass:"editing-property"},[t("div",{staticClass:"control"},[e._m(0,!0),t("div",{staticClass:"button is-text has-text-danger",on:{click:function(t){return e.showModal("remove",i)}}},[t("i",{staticClass:"fa fa-times"})])])]):e._e()]:e.isText(i)?e.profile&&e.profile[e.expandedProperty]&&e.isLink(i)&&("true"===e.profile[e.expandedProperty]["noTextEditing"]||"true"===e.profile[e.expandedProperty]["readOnly"]||!0===e.profile[e.expandedProperty]["noTextEditing"]||!0===e.profile[e.expandedProperty]["readOnly"])?t("div",{staticClass:"read-only__link"},[e.editingThing?t("label",[e._v(" "+e._s(e.expandedValueNames[a])+" ")]):e._e(),t("div",{staticClass:"field is-grouped"},[e.editingProperty?e._e():t("span",{staticClass:"tag is-size-7 is-light"},[e._v(e._s(e.displayLabel))]),t("p",{staticClass:"control"},[t("span",{directives:[{name:"clipboard",rawName:"v-clipboard",value:e.getURL(i),expression:"getURL(item)"},{name:"clipboard",rawName:"v-clipboard:success",value:e.clipboardSuccess,expression:"clipboardSuccess",arg:"success"},{name:"clipboard",rawName:"v-clipboard:error",value:e.clipboardError,expression:"clipboardError",arg:"error"}],staticClass:"icon",attrs:{title:"Copy URL to the clipboard."}},[e.showClipboardSuccessMessage&&e.isCopied(i)?t("i",{staticClass:"fa fa-check has-text-success"}):t("i",{staticClass:"fa fa-copy has-text-primary",attrs:{name:"copyURL",expandedProperty:e.expandedProperty,expandedValue:e.expandedValue}})])]),t("a",{staticClass:"control is-expanded is-id",attrs:{title:i["@id"]||i["@value"]}},[e._v(" "+e._s(i["@id"]||i["@value"])+" ")]),e.editingProperty?t("div",{staticClass:"control"},[t("div",{staticClass:"button disabled is-text has-text-danger",attrs:{disabled:"id"===e.shortType},on:{click:function(t){return e.showModal("remove",a)}}},[t("i",{staticClass:"fa fa-times"})])]):e._e()])]):e.editingProperty&&"String"===typeof i&&e.profile&&e.profile[e.expandedProperty]&&("true"===e.profile[e.expandedProperty]["noTextEditing"]||"true"===e.profile[e.expandedProperty]["readOnly"]||!0===e.profile[e.expandedProperty]["noTextEditing"]||!0===e.profile[e.expandedProperty]["readOnly"])?t("div",{staticClass:"editing-string__read-only"},[t("div",{staticClass:"field"},[t("div",{staticClass:"control"},[t("div",{staticClass:"uneditable"},[e._v(" "+e._s(i)+" ")])])]),e.editingProperty?t("div",{staticClass:"field delete-property-button"},[t("div",{staticClass:"control"},[e._m(2,!0),t("div",{staticClass:"button is-text has-text-danger",on:{click:function(t){return e.showModal("remove",i)}}},[t("i",{staticClass:"fa fa-times"})])])]):e._e()]):e.editingProperty&&e.profile&&e.profile[e.expandedProperty]&&("true"===e.profile[e.expandedProperty]["noTextEditing"]||"true"===e.profile[e.expandedProperty]["readOnly"]||!0===e.profile[e.expandedProperty]["noTextEditing"]||!0===e.profile[e.expandedProperty]["readOnly"])?t("div",{staticClass:"editing-non-string__read-only"},[t("div",{staticClass:"field"},[t("div",{staticClass:"control"},[t("div",{staticClass:"uneditable"},[e._v(" "+e._s(i["@value"])+" ")])])])]):e.range&&e.range.length>0&&-1!==e.range[0].toLowerCase().indexOf("concept")?t("div",[e.editingProperty&&e.limitedConcepts.length>0?t("div",[t("PropertyString",{attrs:{index:a,propertyValue:e.expandedThing[e.expandedProperty][a],expandedProperty:e.expandedProperty,expandedThing:e.expandedThing,expandedValue:e.expandedValue,langString:e.langString,range:e.range,view:e.view,options:e.limitedConcepts,profile:e.profile},on:{removeByValue:function(t){return e.removeByValue(t)},remove:function(t){return e.remove(i)}}})],1):t("div",[t("div",{staticClass:"field is-grouped"},[e.editingProperty?e._e():t("span",{staticClass:"tag is-size-7 is-light"},[e._v(e._s(e.displayLabel))]),t("p",{staticClass:"control"},[t("span",{directives:[{name:"clipboard",rawName:"v-clipboard",value:e.getURL(i),expression:"getURL(item)"},{name:"clipboard",rawName:"v-clipboard:success",value:e.clipboardSuccess,expression:"clipboardSuccess",arg:"success"},{name:"clipboard",rawName:"v-clipboard:error",value:e.clipboardError,expression:"clipboardError",arg:"error"}],staticClass:"icon",attrs:{title:"Copy URL to the clipboard."}},[e.showClipboardSuccessMessage&&e.isCopied(i)?t("i",{staticClass:"fa fa-check has-text-success"}):t("i",{staticClass:"fa fa-copy has-text-primary",attrs:{name:"copyURL",expandedProperty:e.expandedProperty,expandedValue:e.expandedValue}})])]),t("a",{staticClass:"control is-expanded is-id",attrs:{title:i["@id"]||i["@value"]}},[e._v(" "+e._s(i["@id"]||i["@value"])+" ")]),e.editingProperty?t("div",{staticClass:"control"},[t("div",{staticClass:"button disabled is-text has-text-danger",attrs:{disabled:"id"===e.shortType},on:{click:function(t){return e.showModal("remove",a)}}},[t("i",{staticClass:"fa fa-times"})])]):e._e()])])]):e.profile&&e.profile[e.expandedProperty]&&e.profile[e.expandedProperty]["isDirectLink"]&&("true"===e.profile[e.expandedProperty]["isDirectLink"]||!0===e.profile[e.expandedProperty]["isDirectLink"])?t("div",[t("div",{staticClass:"field is-grouped"},[e.editingProperty?e._e():t("span",{staticClass:"tag is-size-7 is-light"},[e._v(e._s(e.displayLabel))]),t("p",{staticClass:"control"},[t("span",{directives:[{name:"clipboard",rawName:"v-clipboard",value:e.getURL(i),expression:"getURL(item)"},{name:"clipboard",rawName:"v-clipboard:success",value:e.clipboardSuccess,expression:"clipboardSuccess",arg:"success"},{name:"clipboard",rawName:"v-clipboard:error",value:e.clipboardError,expression:"clipboardError",arg:"error"}],staticClass:"icon",attrs:{title:"Copy URL to the clipboard."}},[e.showClipboardSuccessMessage&&e.isCopied(i)?t("i",{staticClass:"fa fa-check has-text-success"}):t("i",{staticClass:"fa fa-copy has-text-primary",attrs:{name:"copyURL",expandedProperty:e.expandedProperty,expandedValue:e.expandedValue}})])]),t("a",{staticClass:"control is-expanded is-id",attrs:{title:i["@id"]||i["@value"]}},[e._v(" "+e._s(i["@id"]||i["@value"])+" ")]),e.editingProperty?t("div",{staticClass:"control"},[t("div",{staticClass:"button disabled is-text has-text-danger",attrs:{disabled:"id"===e.shortType},on:{click:function(t){return e.showModal("remove",a)}}},[t("i",{staticClass:"fa fa-times"})])]):e._e()])]):!e.editingProperty||e.checkedOptions||e.limitedConcepts.length>0||e.limitedTypes.length>0?e.isObject(e.expandedValue[a])&&e.expandedValue[a]["@language"]?t("div",{staticClass:"expanded-view__has-language"},["http://schema.org/name"!==e.expandedProperty&&"dcterms:title"!==e.expandedProperty&&"skos:prefLabel"!==e.expandedProperty?t("span",{staticClass:"tag is-size-7 is-light"},[e._v(e._s(e.displayLabel))]):e._e(),t("span",{staticClass:"language",on:{click:function(t){return e.setCheckbox(t)}}},[e._v(" "+e._s(e.expandedValue[a]["@language"]+": ")+" ")]),t("span",{staticClass:"value",attrs:{title:e.expandedValue[a]["@value"]},on:{click:function(t){return e.setCheckbox(t)}}},[e._v(" "+e._s(e.expandedValue[a]["@value"])+" ")])]):e.isObject(e.expandedValue[a])?t("div",{staticClass:"expanded-view-property"},[t("div",{staticClass:"property",class:e.customDisplay,attrs:{title:e.expandedValue[a]["@value"]}},[e.type&&e.type.includes("resource")?[t("span",{staticClass:"tag is-light is-link"},[e._v(e._s(e.type))]),t("a",{staticClass:"custom-link is-size-6 external",attrs:{title:"Open resource in new window",href:e.expandedValue[a]["@value"],target:"_blank"}},[e._v(e._s(e.expandedValue[a]["@value"]))])]:[e.customTitle?t("span",{staticClass:"tag is-size-7 is-light"},[e._v(e._s(e.displayLabel))]):e._e(),e._v(" "+e._s(e.expandedValue[a]["@value"])+" ")]],2)]):t("div",{staticClass:"unexpanded-property"},[t("span",{staticClass:"tag is-size-7 is-light"},[e._v(e._s(e.displayLabel))]),t("div",{staticClass:"property"},[e._v(" "+e._s(e.expandedValue[a])+" ")])]):t("div",{staticClass:"property"},[t("PropertyString",{attrs:{index:a,propertyValue:e.expandedThing[e.expandedProperty][a],expandedProperty:e.expandedProperty,expandedThing:e.expandedThing,expandedValue:e.expandedValue,langString:e.langString,range:e.range,view:e.view,addSingle:e.isNotDeletable(),options:e.profile&&e.profile[e.expandedProperty]&&e.profile[e.expandedProperty]["options"]?e.profile[e.expandedProperty]["options"]:null,profile:e.profile},on:{removeByValue:function(t){return e.removeByValue(t)},remove:function(t){return e.remove(i)}}})],1):t("div",{staticClass:"non-text-field"},[t(e.dynamicThing,{tag:"Component",attrs:{expandedObj:i,competencyAsPropertyType:e.shortType,competencyAsPropertyObjectType:e.objectType,parentNotEditable:!e.canEdit,profile:e.childProfile}}),e.editingProperty?t("div",{staticClass:"field delete-property-button"},[t("div",{staticClass:"control"},[e._m(1,!0),t("div",{staticClass:"button is-outlined has-text-danger",on:{click:function(t){return e.showModal("remove",i)}}},[t("i",{staticClass:"fa fa-times"})])])]):e._e()],1)],2)})),e.editingProperty&&e.checkedOptions&&e.show&&e.profile&&e.profile[e.expandedProperty]&&e.profile[e.expandedProperty]["options"]?e._l(e.optionsArray,(function(i){return t("div",{key:i,staticClass:"field"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.checkedOptions,expression:"checkedOptions"}],staticClass:"is-checkradio",attrs:{type:"checkbox",name:i.val,id:i.val},domProps:{value:i.val,checked:Array.isArray(e.checkedOptions)?e._i(e.checkedOptions,i.val)>-1:e.checkedOptions},on:{change:function(t){var a=e.checkedOptions,r=t.target,s=!!r.checked;if(Array.isArray(a)){var n=i.val,o=e._i(a,n);r.checked?o<0&&(e.checkedOptions=a.concat([n])):o>-1&&(e.checkedOptions=a.slice(0,o).concat(a.slice(o+1)))}else e.checkedOptions=s}}}),t("label",{attrs:{for:i.val}},[e._v(" "+e._s(i.name)+" ")])])})):e._e(),e.errorValidating?t("p",{staticClass:"help is-danger"},[e._v(" "+e._s(e.errorValidating)+" ")]):e._e()]:[t("div",{staticClass:"property-value"},[e.canEdit?t("div",{staticClass:"add-property-button"},[0==e.range.length&&"search"!==e.addOrSearch?t("button",{staticClass:"button is-small is-link has-text-info",attrs:{title:"Add New "+e.displayLabel},on:{click:function(t){t.stopPropagation(),e.add("string"),e.startEditing()}}},[e._m(3),t("span",[e._v(" Add "+e._s(e.displayLabel)+" ")])]):"search"!==e.addOrSearch?e._l(e.range,(function(i){return t("button",{key:i,staticClass:"button is-small is-text has-text-info",attrs:{title:"Add New "+e.displayLabel},on:{click:function(t){t.stopPropagation(),e.add(i),e.startEditing()}}},[e._m(4,!0),t("span",[e._v(" Add "+e._s(e.displayLabel)+" ")])])})):e._e()],2):e._e()]),t("p",{staticClass:"help is-danger"},[e._v(" "+e._s(e.errorMessage[0])+" ")])]],2):e._e()},r=[function(){var e=this,t=e._self._c;return t("label",[t("br")])},function(){var e=this,t=e._self._c;return t("label",[t("br")])},function(){var e=this,t=e._self._c;return t("label",[t("br")])},function(){var e=this,t=e._self._c;return t("span",{staticClass:"icon"},[t("i",{staticClass:"fa fa-plus has-text-info",attrs:{"aria-hidden":"true"}})])},function(){var e=this,t=e._self._c;return t("span",{staticClass:"icon has-text-dark"},[t("i",{staticClass:"fa fa-plus has-text-info",attrs:{"aria-hidden":"true"}})])}],s=i("c7eb"),n=i("1da1"),o=(i("d3b7"),i("3ca3"),i("ddb0"),i("14d9"),i("159b"),i("b64b"),i("e9c4"),i("ac1f"),i("5319"),i("498a"),i("a15b"),i("a434"),i("61ed"),i("af07")),d={name:"Property",props:{expandedThing:Object,expandedProperty:String,schema:Object,canEdit:Boolean,profile:Object,editingThing:Boolean,validate:Boolean,errorMessage:{type:Array,default:function(){return[]}},view:{type:String,default:""}},data:function(){return{clickToLoad:!0,showClipboardSuccessMessage:!1,show:!0,langString:!1,addOrSearch:null,checkedOptions:null,initialValue:null,expandedValueNames:[],optionsArray:[],limitedTypes:[],limitedConcepts:[],errorValidating:null,removePropertyConfirmModal:!1,propertyToRemove:null,expandedValue:[],copiedItem:null}},components:{Thing:function(){return Promise.resolve().then(i.bind(null,"098b"))},ThingEditing:function(){return Promise.all([i.e("chunk-701cdf0d"),i.e("chunk-2d0d5fe2"),i.e("chunk-1b29bed6"),i.e("chunk-8a12ee02"),i.e("chunk-6b291276")]).then(i.bind(null,"8051"))},PropertyString:function(){return i.e("chunk-9fafba20").then(i.bind(null,"d17f"))},ModalTemplate:o["a"]},created:function(){var e=this;if(this.editingThing){if(1===this.range.length&&-1!==this.range[0].toLowerCase().indexOf("langstring")){this.getExpandedValue(),this.langString=!0;for(var t=0;t<this.expandedValue.length;t++)this.expandedValue[t]["@language"]||this.$parent.update(this.expandedProperty,t,{"@language":this.$store.state.editor.defaultLanguage,"@value":this.expandedValue[t]["@value"]},(function(){e.stopEditing()}))}this.$store.commit("lode/incrementNumPropertyComponents",EcRemoteLinkedData.trimVersionFromUrl(this.expandedThing["@id"]))}},mounted:function(){var e=Object(n["a"])(Object(s["a"])().mark((function e(){var t,i,a,r,n,o,d,l,p=this;return Object(s["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.limitedType=[],this.range&&this.range.length>0&&-1!==this.range[0].toLowerCase().indexOf("level")&&this.profile&&this.profile[this.expandedProperty]&&this.profile[this.expandedProperty]["options"]&&(this.checkedOptions=[],this.expandedValue.length>0))for(t=0;t<this.expandedValue.length;t++)this.checkedOptions.push(this.expandedValue[t]["@id"]);if(!(this.range&&this.range.length>0&&-1!==this.range[0].toLowerCase().indexOf("concept")&&this.profile&&this.profile[this.expandedProperty]&&this.profile[this.expandedProperty]["options"])){e.next=10;break}i=0;case 4:if(!(i<this.profile[this.expandedProperty]["options"].length)){e.next=10;break}return e.next=7,EcConceptScheme.get(this.profile[this.expandedProperty]["options"][i].val).then((function(e){e&&e["skos:hasTopConcept"].forEach((function(e){p.addConceptInner(e)}))}));case 7:i++,e.next=4;break;case 10:if(this.expandedThing[this.expandedProperty]?this.initialValue=JSON.parse(JSON.stringify(this.expandedThing[this.expandedProperty])):this.initialValue=null,"Competency"===this.objectType||"Concept"===this.objectType||"Level"===this.objectType)for(this.expandedValueNames=[],a=0;a<this.expandedValue.length;a++)r=this.expandedValue[a],n=this.getURL(r),this.resolveNameFromUrl(n);if(!(this.profile&&this.profile[this.expandedProperty]&&this.profile[this.expandedProperty]["options"]&&this.checkedOptions)){e.next=23;break}o=0;case 14:if(!(o<this.profile[this.expandedProperty]["options"].length)){e.next=23;break}return d=this.profile[this.expandedProperty]["options"][o],e.next=18,EcRepository.get(d.val);case 18:d.name=e.sent.name,this.optionsArray.push(d);case 20:o++,e.next=14;break;case 23:this.profile&&this.profile[this.expandedProperty]&&this.profile[this.expandedProperty]["isDirectLink"]&&("true"===this.profile[this.expandedProperty]["isDirectLink"]||!0===this.profile[this.expandedProperty]["isDirectLink"])&&this.profile[this.expandedProperty]["options"]&&(l=this.profile[this.expandedProperty]["options"],l.forEach((function(e){p.limitedTypes.push(e)})));case 24:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),destroyed:function(){this.editingThing&&this.$store.commit("lode/decrementNumPropertyComponents",EcRemoteLinkedData.trimVersionFromUrl(this.expandedThing["@id"]))},computed:{queryParams:function(){return this.$store.getters["editor/queryParams"]},customTitle:function(){return!(!this.profile||!this.isCompetency||"true"!==this.queryParams.ceasnDataFields)||"http://schema.org/name"!==this.expandedProperty&&"dcterms:title"!==this.expandedProperty&&"skos:prefLabel"!==this.expandedProperty},customDisplay:function(){return this.isCompetency&&"true"===this.queryParams.ceasnDataFields&&this.expandedProperty.includes("name")?"has-text-weight-normal":""},shortTypeAsClass:function(){return"Level"===this.objectType?this.objectType:"http://schema.org/name"===this.expandedProperty?"name":this.shortType.replace(/ /g,"_")},dynamicThing:function(){return this.editingProperty?"ThingEditing":"Thing"},isCompetency:function(){return!!this.expandedThing["@type"][0].includes("Competency")},editingProperty:function(){return this.editingThing},editingPropertyClass:function(){return this.editingProperty?"editing":""},childProfile:function(){var e=function(e){return!!(e&&e.constructor&&e.call&&e.apply)};if(null==this.schema)return null;var t=this.schema.profile;return e(t)&&(t=t()),t},displayLabel:function(){if(null!=this.schema&&null!=this.schema["http://www.w3.org/2000/01/rdf-schema#label"]&&!EcArray.isArray(this.schema["http://www.w3.org/2000/01/rdf-schema#label"])&&!EcObject.isObject(this.schema["http://www.w3.org/2000/01/rdf-schema#label"]))return this.schema["http://www.w3.org/2000/01/rdf-schema#label"];if(null!=this.schema&&null!=this.schema["http://www.w3.org/2000/01/rdf-schema#label"]&&EcArray.isArray(this.schema["http://www.w3.org/2000/01/rdf-schema#label"])&&EcObject.isObject(this.schema["http://www.w3.org/2000/01/rdf-schema#label"][0]))return this.schema["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];if(null!=this.schema&&null!=this.schema["http://www.w3.org/2000/01/rdf-schema#label"]&&EcObject.isObject(this.schema["http://www.w3.org/2000/01/rdf-schema#label"]))return this.schema["http://www.w3.org/2000/01/rdf-schema#label"]["@value"];var e=this.expandedProperty.split("/").pop();return e.replace(/([A-Z]+)/g,(function(e){return" "+e})).toLowerCase().trim().replace(/(^| )(\w)/g,(function(e){return e.toUpperCase()}))},comment:function(){return null==this.schema||null==this.schema["http://www.w3.org/2000/01/rdf-schema#comment"]||null==this.schema["http://www.w3.org/2000/01/rdf-schema#comment"][0]?null:this.schema["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"]},type:function(){return null==this.schema?null==this.expandedThing?null:this.expandedThing["@type"][0]:this.schema["@id"]},shortType:function(){if(!this.type)return this.displayLabel;var e=this.type.split("/").pop();return-1!==e.indexOf("core#")&&(e=this.type.split("#").pop()),e},context:function(){var e=this.type.split("/");return e.pop(),e.join("/")},range:function(){if(null==this.schema)return[];var e=[],t=this.schema["http://schema.org/rangeIncludes"];if(null!=t||void 0!==t)for(var i=0;i<t.length;i++)e.push(t[i]["@id"]);return e},canAdd:function(){return(!this.profile||!this.profile[this.expandedProperty]||1!==this.profile[this.expandedProperty]["max"]||1!==this.expandedValue.length)&&(!!this.editingProperty&&this.canEdit)},clickHandler:function(){return this.canEdit?"click":null},objectType:function(){return this.range&&this.range[0]&&-1!==this.range[0].toLowerCase().indexOf("level")?"Level":this.range&&this.range[0]&&-1!==this.range[0].toLowerCase().indexOf("concept")?"Concept":this.range&&this.range[0]&&-1!==this.range[0].toLowerCase().indexOf("competency")?"Competency":""},isRequired:function(){return!(!this.profile||!this.profile[this.expandedProperty]||"true"!==this.profile[this.expandedProperty]["isRequired"]&&!0!==this.profile[this.expandedProperty]["isRequired"])}},methods:{setCheckbox:function(e){e.preventDefault(),this.$emit("set-checkbox")},addConceptInner:function(e){var t=this;return Object(n["a"])(Object(s["a"])().mark((function i(){return Object(s["a"])().wrap((function(i){while(1)switch(i.prev=i.next){case 0:EcConcept.get(e).then((function(i){if(t.limitedConcepts.push({display:EcRemoteLinkedData.getDisplayStringFrom(i["skos:prefLabel"]),val:e}),null!=i["skos:narrower"])for(var a=0;a<i["skos:narrower"].length;a++)t.addConceptInner(i["skos:narrower"][a])}));case 1:case"end":return i.stop()}}),i)})))()},resolveNameFromUrl:function(e){var t=this;EcRepository.get(e,(function(e){var i=e.name;if(i||(i=e["skos:prefLabel"]),i=schema.Thing.getDisplayStringFrom(i),EcObject.isObject(i)){var a=Object.keys(i);i=i[a[0]]}t.expandedValueNames.push(i)}),(function(i){t.get(e,null,null,(function(e){var i=null;if(e){if("<"===e[0])return;if(e["ceterms:name"]?i=e["ceterms:name"]:e["ceasn:competencyText"]?i=e["ceasn:competencyText"]:e["name"]?i=e["name"]:e["schema:name"]?i=e["schema:name"]:e["title"]?i=e["title"]:e["skos:prefLabel"]?i=e["skos:prefLabel"]:e["title"]?i=e["title"]:e["@graph"]&&e["@graph"][0]&&(e["@graph"][0]["ceterms:name"]?i=e["@graph"][0]["ceterms:name"]:e["@graph"][0]["name"]?i=e["@graph"][0]["name"]:e["@graph"][0]["schema:name"]?i=e["@graph"][0]["schema:name"]:e["@graph"][0]["title"]?i=e["@graph"][0]["title"]:e["@graph"][0]["skos:prefLabel"]&&(i=e["@graph"][0]["skos:prefLabel"])),i=schema.Thing.getDisplayStringFrom(i),EcObject.isObject(i)){var a=Object.keys(i);i=i[a[0]]}}t.expandedValueNames.push(i)}),(function(e){appLog(e)}))}))},get:function(e,t,i,a,r){this.$store.dispatch("editor/getThing",{server:e,service:t,headers:i,success:a,failure:r})},clipboardSuccess:function(e){var t=e.value;e.event;this.copiedItem=t;var i=this;this.showClipboardSuccessMessage=!0,setTimeout((function(){i.showClipboardSuccessMessage=!1}),2e3)},clipboardError:function(){this.$emit("clipboard-error-event")},stopEditing:function(){if(this.isRequired&&(0===this.expandedValue.length||null!=this.expandedValue[0]["@value"]&&void 0!==this.expandedValue[0]["@value"]&&0===this.expandedValue[0]["@value"].trim().length))this.showModal("required");else{if(1===this.range.length&&("http://schema.org/URL"===this.range[0]||"https://schema.cassproject.org/0.4/skos/Concept"===this.range[0]))for(var e=0;e<this.expandedValue.length;e++){if(this.expandedValue[e]["@value"]&&-1===this.expandedValue[e]["@value"].indexOf("http"))return this.showModal("urlOnly");if(this.expandedValue[e]["@id"]&&-1===this.expandedValue[e]["@id"].indexOf("http"))return this.showModal("urlOnly")}if(this.profile&&this.profile[this.expandedProperty]&&!0===this.profile[this.expandedProperty]["resource"])for(e=0;e<this.expandedValue.length;e++)if(!this.expandedValue[e]["name"]||!this.expandedValue[e]["@value"]||-1===this.expandedValue[e]["@value"].indexOf("http"))return this.showModal("nameAndUrlRequired");if(this.addOrSearch=null,1===this.range.length&&-1!==this.range[0].toLowerCase().indexOf("langstring")){for(e=0;e<this.expandedValue.length;e++)if(null==this.expandedValue[e]["@language"]||void 0===this.expandedValue[e]["@language"]||0===this.expandedValue[e]["@language"].trim().length)return this.showModal("langRequired");if(this.profile&&this.profile[this.expandedProperty]&&("true"===this.profile[this.expandedProperty]["onePerLanguage"]||!0===this.profile[this.expandedProperty]["onePerLanguage"])){var t=[];for(e=0;e<this.expandedValue.length;e++){if(t.includes(this.expandedValue[e]["@language"].toLowerCase()))return this.showModal("onePerLanguage");t.push(this.expandedValue[e]["@language"].toLowerCase())}}}for(e=this.expandedValue.length-1;e>=0;e--)(null===this.expandedValue[e]||null!==this.expandedValue[e]["@value"]&&void 0!==this.expandedValue[e]["@value"]&&0===this.expandedValue[e]["@value"].length||0===this.expandedValue[e].length)&&this.expandedValue.splice(e,1);this.save(),this.validate&&this.$emit("validated",!0)}},startEditing:function(){if(this.canEdit&&!this.editingProperty&&(this.editingProperty=!0,this.editingPropertyClass="editing",this.$emit("editing-property-event",!0)),1===this.range.length&&-1!==this.range[0].toLowerCase().indexOf("langstring")){this.langString=!0;for(var e=0;e<this.expandedValue.length;e++)this.expandedValue[e]["@language"]||this.update({"@language":this.$store.state.editor.defaultLanguage,"@value":this.expandedValue[e]["@value"]},e)}},showModal:function(e,t){var i={};if("remove"===e)return this.profile&&this.profile[this.expandedProperty]&&("true"===this.profile[this.expandedProperty]["isRequired"]||!0===this.profile[this.expandedProperty]["isRequired"])&&(1===this.expandedValue.length||this.expandedValue["@value"]&&1===this.expandedValue["@value"].trim().length)?(this.showModal("required"),void this.$store.commit("app/showModal",{component:"RequiredPropertyModal"})):(this.removePropertyConfirmModal=!0,void(this.propertyToRemove=t));this.$emit("invalid",!0),"required"===e&&(i={type:e,title:"Required property",text:this.displayLabel+" is required. Please enter a value."}),"urlOnly"===e&&(i={type:e,title:"URL Required",text:this.displayLabel+" must be a URL. For example: https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/."}),"nameAndUrlRequired"===e&&(i={type:e,title:"Name and URL Required",text:this.displayLabel+" must have a name and a URL."}),"langRequired"===e&&(i={type:e,title:"Language Required",text:this.displayLabel+" must have a language."}),"onePerLanguage"===e&&(i={type:e,title:"One value per language",text:this.displayLabel+" can only have one entry per language."}),this.errorValidating=i.text},clickConfirmRemove:function(){this.remove(this.propertyToRemove),this.propertyToRemove=null,this.removePropertyConfirmModal=!1},closeModal:function(){this.propertyToRemove=null,this.removePropertyConfirmModal=!1},add:function(){var e=Object(n["a"])(Object(s["a"])().mark((function e(t){var i,a,r,n;return Object(s["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(this.profile&&this.profile[this.expandedProperty]&&this.profile[this.expandedProperty]["add"])){e.next=13;break}if(this.addOrSearch="add",i=this.profile[this.expandedProperty]["add"],"checkedOptions"!==i){e.next=7;break}return e.abrupt("return");case 7:return a=EcRemoteLinkedData.trimVersionFromUrl(this.expandedThing["@id"]),e.next=10,i(a);case 10:this.getExpandedValue();case 11:e.next=14;break;case 13:-1!==t.toLowerCase().indexOf("langstring")?(this.addOrSearch="add",r="",this.$store.state.editor&&(r=this.$store.state.editor.defaultLanguage),this.$parent.add(this.expandedProperty,{"@language":r,"@value":""}),this.langString=!0):-1!==t.toLowerCase().indexOf("string")||-1!==t.toLowerCase().indexOf("url")||-1!==t.toLowerCase().indexOf("text")||-1!==t.toLowerCase().indexOf("date")||-1!==t.toLowerCase().indexOf("concept")?(this.addOrSearch="add",this.$parent.add(this.expandedProperty,{"@value":""})):(this.addOrSearch="add",n=new EcRemoteLinkedData,n.context=this.context,n.type=t.split("/").pop(),this.$parent.add(this.expandedProperty,n));case 14:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),removeByValue:function(){var e=Object(n["a"])(Object(s["a"])().mark((function e(t){return Object(s["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.$parent.removeByValue(this.expandedProperty,t);case 1:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),remove:function(){var e=Object(n["a"])(Object(s["a"])().mark((function e(t){var i,a;return Object(s["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(this.profile&&this.profile[this.expandedProperty]&&this.profile[this.expandedProperty]["remove"])){e.next=8;break}return i=this.profile[this.expandedProperty]["remove"],a=EcObject.isObject(t)?t["@id"]:EcObject.isObject(this.expandedValue[t])?this.expandedValue[t]["@id"]:this.expandedValue[t],e.next=5,i(EcRemoteLinkedData.trimVersionFromUrl(this.expandedThing["@id"]),a);case 5:this.getExpandedValue(),e.next=9;break;case 8:this.$parent.remove(this.expandedProperty,t);case 9:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),updatePropertyString:function(e,t){this.update(e,t)},update:function(e,t){var i=this;if(this.errorValidating=null,this.profile&&this.profile[this.expandedProperty]&&!0===this.profile[this.expandedProperty]["resource"])for(var a=0;a<this.expandedValue.length;a++)if(!e.name||!e["@value"]||-1===e["@value"].indexOf("http"))return this.showModal("nameAndUrlRequired");this.$parent.update(this.expandedProperty,t,e,(function(){i.stopEditing()}))},isText:function(e){if(null==e||void 0===e)return null;if(null!=e["@value"]&&void 0!==e["@value"])return!0;if(void 0!==e["@type"]&&null!==e["@type"]){if(-1!==e["@type"][0].toLowerCase().indexOf("text"))return!0;if(-1!==e["@type"][0].toLowerCase().indexOf("url"))return!0;if(-1!==e["@type"][0].toLowerCase().indexOf("concept"))return!0;if(-1!==e["@type"][0].toLowerCase().indexOf("string"))return!0}return null!=e["@id"]&&void 0!==e["@id"]},isLink:function(e){if(1===EcObject.keys(e).length){if(null!=e["@id"]&&void 0!==e["@id"])return!0;if(e["@value"]&&0===e["@value"].indexOf("http"))return!0}return!1},isCopied:function(e){if(1===EcObject.keys(e).length){if(e["@value"]&&e["@value"]===this.copiedItem)return!0;if(e["@id"]&&e["@id"]===this.copiedItem)return!0}return!1},isNotDeletable:function(){return!!(this.isRequired&&this.expandedValue&&this.expandedValue.length<=1)},save:function(){if(this.profile&&this.profile[this.expandedProperty]&&this.profile[this.expandedProperty]["save"]){var e=this.profile[this.expandedProperty]["save"];this.checkedOptions&&e(this.expandedThing,this.checkedOptions,this.profile[this.expandedProperty]["options"])}else if(-1===this.expandedProperty.indexOf("@")&&!this.validate){for(var t=!1,i=0;i<this.expandedValue.length;i++)if(this.initialValue&&(this.expandedValue[i]["@id"]!==this.initialValue[i]["@id"]||this.expandedValue[i]["@value"]!==this.initialValue[i]["@value"]||this.expandedValue[i]["@language"]!==this.initialValue[i]["@language"])){t=!0;break}t&&(this.$store.commit("editor/addEditsToUndo",{operation:"update",id:EcRemoteLinkedData.trimVersionFromUrl(this.expandedThing["@id"]),fieldChanged:[this.expandedProperty],initialValue:this.initialValue,changedValue:this.expandedValue,expandedProperty:!0}),this.$parent.saveThing())}},isObject:function(e){return EcObject.isObject(e)},getURL:function(e){return e["@value"]?e["@value"]:e["@id"]?e["@id"]:void 0},getExpandedValue:function(){var e=Object(n["a"])(Object(s["a"])().mark((function e(){var t,i,a;return Object(s["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t=this.expandedThing[this.expandedProperty],!(this.profile&&this.profile[this.expandedProperty]&&this.profile[this.expandedProperty]["valuesIndexed"])){e.next=11;break}if(t=[],i=this.profile[this.expandedProperty]["valuesIndexed"],i=i(),a=EcRemoteLinkedData.trimVersionFromUrl(this.expandedThing["@id"]),!i||!i[a]){e.next=9;break}return this.expandedValue=i[a],e.abrupt("return");case 9:return this.expandedValue=[],e.abrupt("return");case 11:"@"===this.expandedProperty.charAt(0)&&(t="@id"===this.expandedProperty?[{"@value":EcRemoteLinkedData.trimVersionFromUrl(this.expandedThing[this.expandedProperty])}]:[{"@value":this.expandedThing[this.expandedProperty]}]),this.expandedValue=t;case 13:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),visibilityChanged:function(e,t){e&&this.getExpandedValue()}},watch:{canEdit:function(){!1===this.canEdit&&(this.editingProperty=!1)},validate:function(){this.validate&&(this.errorValidating=null,this.stopEditing())},checkedOptions:function(){this.save()}}},l=d,p=(i("6ac3"),i("2877")),c=Object(p["a"])(l,a,r,!1,null,null,null);t["default"]=c.exports},"61ed":function(e,t,i){},"6ac3":function(e,t,i){"use strict";i("bce5")},bce5:function(e,t,i){}}]);
//# sourceMappingURL=chunk-4b249787.3afd97d4.js.map