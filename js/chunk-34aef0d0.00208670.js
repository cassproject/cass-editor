(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-34aef0d0","chunk-2d0dab46","chunk-f3b8fe20","chunk-f3b8fe20","chunk-2d0dab46"],{"2c3a":function(e,t,i){"use strict";var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"table-container"},[i("table",{staticClass:"table is-fullwidth"},[i("thead",[i("tr",[e._m(0),"modal"!==e.view?i("th",[i("abbr",{attrs:{title:"Description"}},[e._v("description")])]):e._e(),"modal"!==e.view?i("th",[i("abbr",{attrs:{title:"Instance Default"}},[e._v("instance default")])]):e._e(),"modal"!==e.view?i("th",[i("abbr",{attrs:{title:"Browser Default"}}),e._v("browser default ")]):i("th",[i("abbr",{attrs:{title:"Framework Default"}},[e._v("framework default")])]),"modal"!==e.view?i("th",[i("abbr",{attrs:{title:""}}),e._v("view/manage/delete ")]):e._e()])]),i("tbody",e._l(e.configList,(function(t){return i("configuration-list-item",{key:t,attrs:{id:t.id,view:e.view,name:t.name,isDefault:t.isDefault,description:t.description,isOwned:t.isOwned,defaultBrowserConfigId:e.localDefaultBrowserConfigId,defaultFrameworkConfigId:e.frameworkConfigId},on:{"set-browser-default":e.setConfigAsBrowserDefault,"remove-browser-default-config":e.removeConfigAsBrowserDefault,"set-framework-default":e.setConfigAsFrameworkDefault,"show-details":e.showConfigDetails,"show-delete":e.showDeleteConfirm}})})),1),i("br")])])},a=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("th",[i("abbr",{attrs:{title:"Name"}},[e._v("name")])])}],n=(i("99af"),i("96cf"),i("c964")),o=i("f3f3"),s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("tr",[i("th",[i("b",[e._v(e._s(e.name))])]),"modal"!==e.view?i("td",[e._v(" "+e._s(e.description)+" ")]):e._e(),"modal"!==e.view?i("td",[e.isDefault?i("span",{staticClass:"icon has-text-primary"},[i("i",{staticClass:"fa fa-check"})]):e._e()]):e._e(),"modal"!==e.view?i("td",[i("div",{staticClass:"field"},[i("div",{staticClass:"control is-size-3"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.isBrowserDefault,expression:"isBrowserDefault"}],staticClass:"switch is-outlined",attrs:{id:e.id+"browserDefaultSwitch",type:"checkbox",name:e.id+"browserDefaultSwitch"},domProps:{checked:Array.isArray(e.isBrowserDefault)?e._i(e.isBrowserDefault,null)>-1:e.isBrowserDefault},on:{change:function(t){var i=e.isBrowserDefault,r=t.target,a=!!r.checked;if(Array.isArray(i)){var n=null,o=e._i(i,n);r.checked?o<0&&(e.isBrowserDefault=i.concat([n])):o>-1&&(e.isBrowserDefault=i.slice(0,o).concat(i.slice(o+1)))}else e.isBrowserDefault=a}}}),i("label",{attrs:{for:e.id+"browserDefaultSwitch"}})])])]):i("td",[i("div",{staticClass:"button is-outlined is-primary is-small",attrs:{disabled:null!==e.defaultFrameworkConfigId&&void 0!==e.defaultFrameworkConfigId&&e.defaultFrameworkConfigId.equals(e.id)},on:{click:function(t){return e.$emit("set-framework-default",e.id)}}},[e._v(" set as framework default ")])]),"modal"!==e.view?i("td",[e.isOwned?i("div",{staticClass:"button is-outlined is-small is-primary",attrs:{title:"Manage configuration"},on:{click:function(t){return e.$emit("show-details",e.id)}}},[e._m(0)]):e._e(),e.isOwned&&!e.isDefault?i("div",{staticClass:"button is-outlined is-small is-danger delete-btn",attrs:{title:"Delete configuration"},on:{click:function(t){return e.$emit("show-delete",e.id)}}},[e._m(1)]):e._e(),e.isOwned?e._e():i("div",{staticClass:"button is-outlined is-small is-primary",attrs:{title:"View configuration"},on:{click:function(t){return e.$emit("show-details",e.id)}}},[e._m(2)])]):e._e()])},c=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("span",{staticClass:"icon"},[i("i",{staticClass:"fas fa-cog"})])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("span",{staticClass:"icon"},[i("i",{staticClass:"fas fa-trash"})])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("span",{staticClass:"icon"},[i("i",{staticClass:"fas fa-eye"})])}],l={name:"ConfigurationListItem",props:{id:{type:String,default:""},view:{type:String,default:""},name:{type:String,default:""},description:{type:String,default:""},isOwned:{type:Boolean,default:!1},isDefault:{type:Boolean,default:!1},defaultBrowserConfigId:{type:String,default:""},defaultFrameworkConfigId:{type:String,default:""}},computed:{isBrowserDefault:{get:function(){return this.defaultBrowserConfigId===this.id},set:function(e){appLog("val",e),e?this.$emit("set-browser-default",this.id):this.$emit("remove-browser-default-config")}}}},u=l,f=(i("9ae8"),i("2877")),d=Object(f["a"])(u,s,c,!1,null,"bb9ea86c",null),g=d.exports,m=i("6d79"),p=i("a861"),h=i("2f62"),w={name:"ConfigurationList",components:{ConfigurationListItem:g},props:{view:{type:String,defau:"page"}},computed:Object(o["a"])(Object(o["a"])({},Object(h["b"])({CONFIG_SEARCH_SIZE:"configuration/CONFIG_SEARCH_SIZE",DEFAULT_CONFIGURATION_TYPE:"configuration/DEFAULT_CONFIGURATION_TYPE",DEFAULT_CONFIGURATION_CONTEXT:"configuration/DEFAULT_CONFIGURATION_CONTEXT",LANG_STRING_TYPE:"configuration/LANG_STRING_TYPE",DEFAULT_HEADING:"configuration/DEFAULT_HEADING"})),{},{defaultBrowserConfigName:{get:function(){return this.$store.getters["configuration/defaultBrowserConfigName"]},set:function(e){this.$store.commit("configuration/setDefaultBrowserConfigName",e)}},showConfirmDeleteConfigModal:{get:function(){return this.$store.getters["configuration/showConfirmDeleteConfigModal"]},set:function(e){this.$store.commit("configuration/setShowConfirmDeleteConfigModal",e)}},showBrowserConfigSetModal:{get:function(){return this.$store.getters["configuration/showBrowserConfigSetModal"]},set:function(e){this.$store.commit("configuration/setShowBrowserConfigSetModal",e)}},showMustBeLoggedInModal:{get:function(){return this.$store.getters["configuration/showMustBeLoggedInModal"]},set:function(e){this.$store.commit("configuration/setShowMustBeLoggedInModal",e)}},configToDelete:{get:function(){return this.$store.getters["configuration/configToDelete"]},set:function(e){this.$store.commit("configuration/setConfigToDelete",e)}},configViewMode:function(){return this.$store.getters["configuration/configView"]},localDefaultBrowserConfigId:function(){return this.$store.getters["configuration/localDefaultBrowserConfig"]},currentConfig:function(){return this.$store.getters["configuration/currentConfig"]}}),data:function(){return{configBusy:!1,configList:[],complexConfigObject:{},defaultConfigId:null,frameworkConfigId:"",enforceHeadings:!1}},mixins:[m["a"],p["a"]],methods:{showDeleteConfirm:function(e){this.setConfigToDelete(e),this.showConfirmDeleteConfigModal=!0},setConfigToDelete:function(e){this.$store.commit("configuration/setConfigToDelete",this.getConfigById(e))},setConfigAsFrameworkDefault:function(e){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function i(){var r,a,o;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(r=t,a=t.$store.getters["editor/framework"],o=a.configuration,a.configuration=e,o){i.next=8;break}return i.next=7,t.setOwnersAndReaders(a);case 7:a=i.sent;case 8:a&&(t.frameworkConfigId=e,window.repo.saveTo(a,Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.t0=r.$store,e.next=3,EcRepository.get(a.shortId());case 3:e.t1=e.sent,e.t0.commit.call(e.t0,"editor/framework",e.t1);case 5:case"end":return e.stop()}}),e)}))),(function(){})));case 9:case"end":return i.stop()}}),i)})))()},setOwnersAndReaders:function(e){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function i(){var r,a,o,s,c,l,u;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return r=null,EcIdentityManager.default.ids.length>0&&(r=EcIdentityManager.default.ids[0].ppk.toPk()),i.next=4,EcRepository.get(e.configuration);case 4:if(a=i.sent,o=a.defaultObjectOwners,s=a.defaultObjectReaders,!(o.length>0||s.length>0)){i.next=14;break}if(!r){i.next=12;break}e.addOwner(r),i.next=14;break;case 12:return t.$store.commit("configuration/setShowMustBeLoggedInModal",!0),i.abrupt("return",!1);case 14:for(c=0;c<o.length;c++)e.addOwner(EcPk.fromPem(o[c]));if(l=e.competency?e.competency:[],e.relation&&(l=l.concat(e.relation)),(new EcAsyncHelper).each(l,(function(e,t){EcRepository.get(e,function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(i){var a,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:for((o.length>0||s.length>0)&&r&&i.addOwner(r),a=0;a<o.length;a++)i.addOwner(EcPk.fromPem(o[a]));if(!(s.length>0)){e.next=7;break}for(n=0;n<s.length;n++)i.addReader(EcPk.fromPem(s[n]));return e.next=6,EcEncryptedValue.toEncryptedValue(i);case 6:i=e.sent;case 7:window.repo.saveTo(i,t,t);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),t)}),(function(e){})),!(s.length>0)){i.next=23;break}for(u=0;u<s.length;u++)e.addReader(EcPk.fromPem(s[u]));return i.next=22,EcEncryptedValue.toEncryptedValue(e);case 22:e=i.sent;case 23:return i.abrupt("return",e);case 24:case"end":return i.stop()}}),i)})))()}}},b=w,v=Object(f["a"])(b,r,a,!1,null,null,null);t["a"]=v.exports},"4dec":function(e,t,i){},"6d79":function(e,t,i){"use strict";i.d(t,"a",(function(){return n}));i("caad"),i("d3b7"),i("ac1f"),i("25f0"),i("2532"),i("841c");var r=i("54f8"),a=(i("96cf"),i("c964")),n={name:"cassUtil",data:function(){return{}},methods:{getOrganizationByEcPk:function(e,t,i){var n=e.toPem(),o={size:1e4};EcOrganization.search(window.repo,"",function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(a){var o,s,c,l,u,f,d;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:o=Object(r["a"])(a),e.prev=1,o.s();case 3:if((s=o.n()).done){e.next=34;break}return c=s.value,e.prev=5,e.next=8,c.getOrgKeys();case 8:l=e.sent,u=Object(r["a"])(l),e.prev=10,u.s();case 12:if((f=u.n()).done){e.next=19;break}if(d=f.value,!d||!d.toPk().toPem().equals(n)){e.next=17;break}return t(c),e.abrupt("return");case 17:e.next=12;break;case 19:e.next=24;break;case 21:e.prev=21,e.t0=e["catch"](10),u.e(e.t0);case 24:return e.prev=24,u.f(),e.finish(24);case 27:e.next=32;break;case 29:e.prev=29,e.t1=e["catch"](5),i(e.t1.toString());case 32:e.next=3;break;case 34:e.next=39;break;case 36:e.prev=36,e.t2=e["catch"](1),o.e(e.t2);case 39:return e.prev=39,o.f(),e.finish(39);case 42:t(null);case 43:case"end":return e.stop()}}),e,null,[[1,36,39,42],[5,29],[10,21,24,27]])})));return function(t){return e.apply(this,arguments)}}(),(function(e){i(e)}),o)},getOrganizationEcPk:function(e){return Object(a["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.getCurrentOrgKey();case 3:return t.abrupt("return",t.sent.toPk());case 6:return t.prev=6,t.t0=t["catch"](0),t.abrupt("return",null);case 9:case"end":return t.stop()}}),t,null,[[0,6]])})))()},getPersonEcPk:function(e){var t=this.generateProbablePersonFingerprintFromShortId(e.shortId());if(e.owner){var i,a=Object(r["a"])(e.owner);try{for(a.s();!(i=a.n()).done;){var n=i.value,o=EcPk.fromPem(n);if(t.equals(o.fingerprint()))return o}}catch(s){a.e(s)}finally{a.f()}}return null},addAllOwnersFromObjectToObject:function(e,t){if(e&&e.owner){var i,a=Object(r["a"])(e.owner);try{for(a.s();!(i=a.n()).done;){var n=i.value,o=EcPk.fromPem(n);t.addOwner(o)}}catch(s){a.e(s)}finally{a.f()}}},setDefaultBrowserConfigId:function(e){localStorage.setItem("cassAuthoringToolDefaultBrowserConfigId",e)},removeDefaultBrowserConfig:function(){localStorage.removeItem("cassAuthoringToolDefaultBrowserConfigId")},getDefaultBrowserConfigId:function(){return localStorage.getItem("cassAuthoringToolDefaultBrowserConfigId")},getBooleanValue:function(e){return"boolean"===typeof e?e:"string"===typeof e&&!!e.equalsIgnoreCase("true")},addAllIdentityPksAsOwners:function(e){if(EcIdentityManager&&EcIdentityManager.default.ids&&EcIdentityManager.default.ids.length>0)for(var t=0;t<EcIdentityManager.default.ids.length;t++)e.addOwner(EcIdentityManager.default.ids[t].ppk.toPk())},isObjectOwnerless:function(e){return!e.owner||0===e.owner.length},doesAnyIdentityOwnObject:function(e){return!!this.isAdmin()||(null==e.canEditAny||e.canEditAny(EcIdentityManager.default.getMyPks()))},isAdmin:function(){return EcIdentityManager.default.ids.length>0&&null!=window.repo.adminKeys&&window.repo.adminKeys.length>0&&window.repo.adminKeys[0]===EcIdentityManager.default.ids[0].ppk.toPk().toPem()},generateProbablePersonFingerprintFromShortId:function(e){return e.substring(e.lastIndexOf("/")+1)},isPersonIdAnObjectOwner:function(e,t){if(!t.owner||0===t.owner.length)return!1;var i,a=this.generateProbablePersonFingerprintFromShortId(e),n=Object(r["a"])(t.owner);try{for(n.s();!(i=n.n()).done;){var o=i.value,s=EcPk.fromPem(o).fingerprint();if(s.equals(a))return!0}}catch(c){n.e(c)}finally{n.f()}return!1},isPersonIdAnObjectReader:function(e,t){if(!t.reader||0===t.reader.length)return!1;var i,a=this.generateProbablePersonFingerprintFromShortId(e),n=Object(r["a"])(t.reader);try{for(n.s();!(i=n.n()).done;){var o=i.value,s=EcPk.fromPem(o).fingerprint();if(s.equals(a))return!0}}catch(c){n.e(c)}finally{n.f()}return!1},areAnyIdentitiesThisPerson:function(e){var t=e.getFingerprint();if(EcIdentityManager&&EcIdentityManager.default.ids&&EcIdentityManager.default.ids.length>0)for(var i=0;i<EcIdentityManager.default.ids.length;i++)if(EcIdentityManager.default.ids[i].ppk.toPk().fingerprint().equals(t))return!0;return!1},isPersonalIdentityAnObjectOwner:function(e){if(this.isAdmin())return!0;if(!e.owner||0===e.owner.length)return!1;var t=this.getPersonalIdentityPk().toPem();return e.owner.includes(t)},getPersonalIdentityPk:function(){return EcIdentityManager&&EcIdentityManager.default.ids&&EcIdentityManager.default.ids.length>0?EcIdentityManager.default.ids[0].ppk.toPk():null},buildEcAlignmentsFromRemoteLinkedData:function(e){var t,i=[],a=Object(r["a"])(e);try{for(a.s();!(t=a.n()).done;){var n=t.value,o=new EcAlignment;o.copyFrom(n),i.push(o)}}catch(s){a.e(s)}finally{a.f()}return i}},computed:{amLoggedIn:function(){return!!(EcIdentityManager&&EcIdentityManager.default.ids&&EcIdentityManager.default.ids.length>0)}}}},"984b":function(e,t,i){},"9ae8":function(e,t,i){"use strict";var r=i("4dec"),a=i.n(r);a.a},a861:function(e,t,i){"use strict";i.d(t,"a",(function(){return n}));i("caad"),i("b0c0"),i("b64b"),i("2532"),i("498a"),i("159b");var r=i("d0ff"),a=i("54f8"),n={name:"configuration",methods:{closeModal:function(){this.$store.commit("app/closeModal")},showListView:function(){this.$store.commit("configuration/setConfigView","list")},showDetailView:function(){this.$store.commit("configuration/setConfigView","detail")},showConfigDetails:function(e){this.setCurrentConfig(e),this.showDetailView()},generateCustomPropertyContextAndNameFromId:function(e){var t={};return t.context=e.substr(0,e.lastIndexOf("/")+1),t.name=e.substr(e.lastIndexOf("/")+1),t},getConfigById:function(e){var t,i=Object(a["a"])(this.configList);try{for(i.s();!(t=i.n()).done;){var r=t.value;if(r.id.equals(e))return r}}catch(n){i.e(n)}finally{i.f()}return null},setCurrentConfig:function(e){var t=this.getConfigById(e);this.$store.commit("configuration/setCurrentConfig",t)},sortConfigList:function(){this.configList.sort((function(e,t){return e.isOwned!==t.isOwned?t.isOwned?1:-1:e.name>t.name?1:t.name>e.name?-1:0}))},isCustomPropertyKey:function(e,t){return!t.equals("headings")&&(!t.equals("primaryProperties")&&(!t.equals("secondaryProperties")&&(!t.equals("tertiaryProperties")&&(!t.equals("@id")&&(!t.equals("http://schema.org/name")&&(!t.equals("http://schema.org/description")&&(!t.equals("https://schema.cassproject.org/0.4/classification")&&(!t.equals("https://schema.cassproject.org/0.4/markings")&&((!e.equalsIgnoreCase("competency")||!t.equals("http://purl.org/dc/terms/type"))&&((!e.equalsIgnoreCase("competency")||!t.equals("relationshipsHeading"))&&(!e.equalsIgnoreCase("competency")||!t.equals("relationshipsPriority"))))))))))))},generateSimpleCustomPropertyObject:function(e){var t={},i=this.generateCustomPropertyContextAndNameFromId(e["@id"]);if(t.context=i.context,t.propertyName=i.name,t.range=e["http://schema.org/rangeIncludes"][0]["@id"],t.description=e["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"],t.label=e["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"],t.priority=e["priority"],e["isDirectLink"]&&(t.isDirectLink=e["isDirectLink"]),e["heading"]?t.heading=e["heading"]:t.heading="",!e["max"]||1!==e["max"]&&"1"!==e["max"]?t.allowMultiples=!0:t.allowMultiple=!1,!e["onePerLanguage"]||"true"!==e["onePerLanguage"]&&!0!==e["max"]?t.onePerLanguage=!1:t.onePerLanguage=!0,t.required=this.getBooleanValue(e["isRequired"]),t.permittedValues=[],t.permittedTypes=[],t.permittedConcepts=[],t.range.equalsIgnoreCase("https://schema.cassproject.org/0.4/Competency")){if(e.options&&e.options.length>0){var r,n=Object(a["a"])(e.options);try{for(n.s();!(r=n.n()).done;){var o=r.value,s={};s.display=o.display,s.value=o.val,t.permittedTypes.push(s)}}catch(h){n.e(h)}finally{n.f()}}}else if(t.range.equalsIgnoreCase("https://schema.cassproject.org/0.4/skos/Concept")){if(e.options&&e.options.length>0){var c,l=Object(a["a"])(e.options);try{for(l.s();!(c=l.n()).done;){var u=c.value,f={};f.display=u.display,f.value=u.val,t.permittedConcepts.push(f)}}catch(h){l.e(h)}finally{l.f()}}}else if(e.options&&e.options.length>0){var d,g=Object(a["a"])(e.options);try{for(g.s();!(d=g.n()).done;){var m=d.value,p={};p.display=m.display,p.value=m.val,t.permittedValues.push(p)}}catch(h){g.e(h)}finally{g.f()}}return t},buildSimpleConfigObjectFrameworkData:function(e,t){var i=t["frameworkConfig"];e.fwkIdLabel=i["@id"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"],e.fwkIdDescription=i["@id"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"],e.fwkIdPriorty=i["@id"]["priority"];var r=i["@id"]["heading"];e.fwkIdHeading=r?r.trim():"",e.fwkNameLabel=i["http://schema.org/name"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"],e.fwkNameDescription=i["http://schema.org/name"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];var a=i["http://schema.org/name"]["heading"];e.fwkNameHeading=a?a.trim():"",e.fwkDescLabel=i["http://schema.org/description"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"],e.fwkDescDescription=i["http://schema.org/description"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"],e.fwkDescPriority=i["http://schema.org/description"]["priority"],e.fwkDescRequired=this.getBooleanValue(i["http://schema.org/description"]["isRequired"]);var n=i["http://schema.org/description"]["heading"];if(e.fwkDescHeading=n?n.trim():"",null!=i["https://schema.cassproject.org/0.4/classification"]){e.fwkClassLabel=i["https://schema.cassproject.org/0.4/classification"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"],e.fwkClassDescription=i["https://schema.cassproject.org/0.4/classification"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"],e.fwkClassPriority=i["https://schema.cassproject.org/0.4/classification"]["priority"],e.fwkClassRequired=this.getBooleanValue(i["https://schema.cassproject.org/0.4/classification"]["isRequired"]);var o=i["https://schema.cassproject.org/0.4/classification"]["heading"];e.fwkClassHeading=o?o.trim():""}if(null!=i["https://schema.cassproject.org/0.4/markings"]){e.fwkMarkingsLabel=i["https://schema.cassproject.org/0.4/markings"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"],e.fwkMarkingsDescription=i["https://schema.cassproject.org/0.4/markings"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"],e.fwkMarkingsPriority=i["https://schema.cassproject.org/0.4/markings"]["priority"],e.fwkMarkingsRequired=this.getBooleanValue(i["https://schema.cassproject.org/0.4/markings"]["isRequired"]);var s=i["https://schema.cassproject.org/0.4/markings"]["heading"];e.fwkMarkingsHeading=s?s.trim():""}e.fwkCustomProperties=[];for(var c=Object.keys(i),l=0,u=c;l<u.length;l++){var f=u[l];this.isCustomPropertyKey("framework",f)&&e.fwkCustomProperties.push(this.generateSimpleCustomPropertyObject(i[f]))}},buildSimpleConfigObjectCompetencyData:function(e,t){var i=t["competencyConfig"],r=i["relationshipsHeading"];e.relationshipsHeading=r?r.trim():"";var n=i["relationshipsPriority"];e.relationshipsPriority=n||"tertiary",e.compIdLabel=i["@id"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"],e.compIdDescription=i["@id"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"],e.compIdPriorty=i["@id"]["priority"];var o=i["@id"]["heading"];e.compIdHeading=o?o.trim():"",e.compNameLabel=i["http://schema.org/name"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"],e.compNameDescription=i["http://schema.org/name"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];var s=i["http://schema.org/name"]["heading"];e.compNameHeading=s?s.trim():"",e.compDescLabel=i["http://schema.org/description"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"],e.compDescDescription=i["http://schema.org/description"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"],e.compDescPriority=i["http://schema.org/description"]["priority"],e.compDescRequired=this.getBooleanValue(i["http://schema.org/description"]["isRequired"]);var c=i["http://schema.org/description"]["heading"];e.compDescHeading=c?c.trim():"";var l=i["http://purl.org/dc/terms/type"];if(e.compTypeLabel=l["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"],e.compTypeDescription=l["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"],e.compTypePriority=l["priority"],l["heading"]?e.compTypeHeading=l["heading"]:e.compTypeHeading="",e.compTypeRequired=this.getBooleanValue(l["isRequired"]),e.compEnforceTypes=!1,e.compEnforcedTypes=[],l.options&&l.options.length>0){e.compEnforceTypes=!0;var u,f=Object(a["a"])(l.options);try{for(f.s();!(u=f.n()).done;){var d=u.value,g={};g.display=d.display,g.value=d.val,e.compEnforcedTypes.push(g)}}catch(y){f.e(y)}finally{f.f()}}if(null!=i["https://schema.cassproject.org/0.4/classification"]){e.compClassLabel=i["https://schema.cassproject.org/0.4/classification"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"],e.compClassDescription=i["https://schema.cassproject.org/0.4/classification"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"],e.compClassPriority=i["https://schema.cassproject.org/0.4/classification"]["priority"],e.compClassRequired=this.getBooleanValue(i["https://schema.cassproject.org/0.4/classification"]["isRequired"]);var m=i["https://schema.cassproject.org/0.4/classification"]["heading"];e.compClassHeading=m?m.trim():""}if(null!=i["https://schema.cassproject.org/0.4/markings"]){e.compMarkingsLabel=i["https://schema.cassproject.org/0.4/markings"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"],e.compMarkingsDescription=i["https://schema.cassproject.org/0.4/markings"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"],e.compMarkingsPriority=i["https://schema.cassproject.org/0.4/markings"]["priority"],e.compMarkingsRequired=this.getBooleanValue(i["https://schema.cassproject.org/0.4/markings"]["isRequired"]);var p=i["https://schema.cassproject.org/0.4/markings"]["heading"];e.compMarkingsHeading=p?p.trim():""}e.compCustomProperties=[];for(var h=Object.keys(i),w=0,b=h;w<b.length;w++){var v=b[w];this.isCustomPropertyKey("competency",v)&&e.compCustomProperties.push(this.generateSimpleCustomPropertyObject(i[v]))}},buildSimpleConfigObjectLevelData:function(e,t){if(e.compAllowLevels=!1,e.levelLabel="",e.levelDescription="",e.enforceLevelValues=!1,e.enforcedLevelValues=[],e.levelPriority="secondary",e.levelHeading="",t["levelsConfig"]&&t["levelsConfig"]["https://schema.cassproject.org/0.4/Level"]){var i=t["levelsConfig"]["https://schema.cassproject.org/0.4/Level"];if(e.compAllowLevels=!0,i["priority"]?e.levelPriority=i["priority"]:e.levelPriority="secondary",i["heading"]?e.levelHeading=i["heading"]:e.levelHeading="",e.levelLabel=i["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"],e.levelDescription=i["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"],t["levelsConfig"]["https://schema.cassproject.org/0.4/Level"]["options"]){var r=t["levelsConfig"]["https://schema.cassproject.org/0.4/Level"]["options"];if(r.length>0){e.enforceLevelValues=!0;var n,o=Object(a["a"])(r);try{for(o.s();!(n=o.n()).done;){var s=n.value;e.enforcedLevelValues.push(s["val"])}}catch(c){o.e(c)}finally{o.f()}}}}},buildSimpleRelationshipConfigObject:function(e,t,i,r){e.relationships[i]={},t[i]?(e.relationships[i].label=t[i]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"],e.relationships[i].enabled=!0):(e.relationships[i].label=r,e.relationships[i].enabled=!1)},buildSimpleConfigObjectRelationshipData:function(e,t){var i=t["relationshipConfig"];e.relationships={},this.buildSimpleRelationshipConfigObject(e,i,"isEnabledBy","is enabled by"),this.buildSimpleRelationshipConfigObject(e,i,"requires","requires"),this.buildSimpleRelationshipConfigObject(e,i,"desires","desires"),this.buildSimpleRelationshipConfigObject(e,i,"narrows","narrows"),this.buildSimpleRelationshipConfigObject(e,i,"isRelatedTo","is related to"),this.buildSimpleRelationshipConfigObject(e,i,"isEquivalentTo","is equivalent to"),this.buildSimpleRelationshipConfigObject(e,i,"broadens","broadens"),this.buildSimpleRelationshipConfigObject(e,i,"majorRelated","is majorly related to"),this.buildSimpleRelationshipConfigObject(e,i,"minorRelated","is minorly related to"),this.buildSimpleRelationshipConfigObject(e,i,"isSimilarTo","is similar to"),this.buildSimpleRelationshipConfigObject(e,i,"isPartiallySameAs","is partially the same as"),this.buildSimpleRelationshipConfigObject(e,i,"enables","enables"),this.buildSimpleRelationshipConfigObject(e,i,"hasChild","has child"),this.buildSimpleRelationshipConfigObject(e,i,"isChildOf","is child of")},buildSimpleConfigObjectAlignmentData:function(e,t){var i=t["alignConfig"];e.alignments={},e.alignments.teaches=i.includes("teaches"),e.alignments.assesses=i.includes("assesses"),e.alignments.requires=i.includes("requires"),e.alignments.desires=i.includes("desires")},buildSimpleConfigDefaultPermissionData:function(e,t){t["defaultObjectOwners"]?e.defaultOwners=t["defaultObjectOwners"]:e.defaultOwners=[],t["defaultObjectReaders"]?e.defaultReaders=t["defaultObjectReaders"]:e.defaultReaders=[],t["defaultCommenters"]?e.defaultCommenters=t["defaultCommenters"]:e.defaultCommenters=[]},generateSimpleConfigObject:function(e){var t={};return t.id=e.shortId(),this.isObjectOwnerless(e)||this.doesAnyIdentityOwnObject(e)?t.isOwned=!0:t.isOwned=!1,t.isNew=!1,t.name=e.getName(),t.description=e.getDescription(),t.isDefault=this.getBooleanValue(e.isDefault),t.isDefault&&(this.defaultConfigId=t.id),this.buildSimpleConfigObjectFrameworkData(t,e),this.buildSimpleConfigObjectCompetencyData(t,e),this.buildSimpleConfigObjectLevelData(t,e),this.buildSimpleConfigObjectRelationshipData(t,e),this.buildSimpleConfigObjectAlignmentData(t,e),this.buildSimpleConfigDefaultPermissionData(t,e),t},generateCustomPropertyAvailableConcepts:function(){var e=this;repo.searchWithParams("@type:ConceptScheme",{size:1e4},null,null,null,null).then((function(t){for(var i=[],r=0;r<t.length;r++)i.push({display:EcRemoteLinkedData.getDisplayStringFrom(t[r]["dcterms:title"]),value:t[r].id});e.$store.commit("configuration/setAvailableConcepts",i)})).catch((function(e){appLog("failed to retrieve concepts: "+e)}))},generateCustomPropertyAvailableTypes:function(){var e=[];this.configList.forEach((function(t){t.compEnforceTypes&&e.push.apply(e,Object(r["a"])(t.compEnforcedTypes))})),this.$store.commit("configuration/setAvailableTypes",e)},searchRepositoryForConfigsSuccess:function(e){appLog("Config search success: "),appLog(e),this.configList=[];var t,i=Object(a["a"])(e);try{for(i.s();!(t=i.n()).done;){var r=t.value,n=new schema.Thing;n.copyFrom(r),this.configList.push(this.generateSimpleConfigObject(n))}}catch(o){i.e(o)}finally{i.f()}this.sortConfigList(),this.generateCustomPropertyAvailableConcepts(),this.generateCustomPropertyAvailableTypes(),this.configBusy=!1},searchRepositoryForConfigsFailure:function(e){appLog("Config search failure: "+e),this.configBusy=!1},buildConfigListFromRepository:function(){var e={};e.size=this.buildConfigListFromRepository_SIZE,window.repo.searchWithParams("@type:Configuration",e,null,this.searchRepositoryForConfigsSuccess,this.searchRepositoryForConfigsFailure)},buildConfigList:function(){this.configBusy=!0,this.complexConfigObject={},this.buildConfigListFromRepository()},setConfigAsBrowserDefault:function(e){var t=this.getConfigById(e);this.setDefaultBrowserConfigId(e),this.defaultBrowserConfigName=t.name,this.$store.commit("configuration/setLocalDefaultBrowserConfig",e),this.$store.commit("configuration/setShowBrowserConfigSetModal",!0)},removeConfigAsBrowserDefault:function(e){this.removeDefaultBrowserConfig(),this.$store.commit("configuration/setDefaultBrowserConfigName",""),this.$store.commit("configuration/setLocalDefaultBrowserConfig",""),this.$store.commit("configuration/setShowBrowserConfigSetModal",!1)}},updated:function(){this.$store.commit("configuration/setLocalDefaultBrowserConfig",this.getDefaultBrowserConfigId())},mounted:function(){this.buildConfigList(),this.$store.commit("configuration/setLocalDefaultBrowserConfig",this.getDefaultBrowserConfigId()),this.$store.getters["editor/framework"]&&this.$store.getters["editor/framework"].configuration&&(this.frameworkConfigId=this.$store.getters["editor/framework"].configuration)}}},a907:function(e,t,i){},ad86:function(e,t,i){"use strict";var r=i("a907"),a=i.n(r);a.a},af07:function(e,t,i){"use strict";var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"modal cass-editor___modal",class:[{"is-active":e.active},"is-"+e.size,"cass-editor__modal--"+e.content],attrs:{id:"cass-modal"}},[i("div",{staticClass:"modal-background"}),i("div",{staticClass:"modal-card",class:"cass-editor__modal-card--"+e.size},[i("header",{staticClass:"modal-card-head is-size-4 has-text-weight-bold",class:["has-background-"+e.type,"has-text-"+e.fontColor]},[i("p",{staticClass:"modal-card-title"},[e._t("modal-header")],2),e.canClose?i("button",{staticClass:"delete",attrs:{"aria-label":"close"},on:{click:function(t){e.$store.commit("app/closeModal"),e.$emit("close")}}}):e._e()]),i("div",{staticClass:"modal-card-body has-text-dark"},[e._t("modal-body")],2),i("footer",{staticClass:"modal-card-foot has-background-white"},[e._t("modal-foot")],2)])])},a=[],n=(i("984b"),{name:"ModalTemplate",props:{canClose:{type:Boolean,default:!0},active:{type:Boolean,default:!1},type:{default:"primary",type:String},fontColor:{type:String,default:"white"},size:{type:String,default:"medium"},content:{defualt:"default",type:String}},data:function(){return{}},computed:{}}),o=n,s=(i("ad86"),i("2877")),c=Object(s["a"])(o,r,a,!1,null,null,null);t["a"]=c.exports}}]);
//# sourceMappingURL=chunk-34aef0d0.00208670.js.map