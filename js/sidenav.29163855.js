(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["sidenav","chunk-2d0dab46","chunk-2d0dab46"],{"0162":function(t,e,a){"use strict";a.d(e,"a",(function(){return i}));a("caad"),a("a434"),a("b0c0"),a("b64b"),a("d3b7"),a("ac1f"),a("8a79"),a("2532"),a("3ca3"),a("1276"),a("ddb0"),a("2b3d");var n=a("54f8"),i={name:"pluginUtil",data:function(){return{PLUGIN_NAME_PARTS_DELIMITER:"/",DEFAULT_PLUGIN_LAUNCH_LOCATION:"main",DEFAULT_PLUGIN_LAUNCH_CATEGORY:"Plugins",PLUGIN_ENABLED_LS_KEY:"cassAuthoringToolPluginsEnabled",LOCAL_PLUGIN_LIST_KEY:"cassAuthoringToolLocalPlugins",mdPluginUrlList:[],mdPluginSuccessCallback:null,numPluginManifestsToGet:0,numPluginManifestsGotten:0,mdPluginCurrentUrl:"",pluginManifestData:{},pluginList:[],buildPluginListSuccessCallback:null}},methods:{isValidUrl:function(t){try{new URL(t)}catch(e){return!1}return!0},checkManifestDataForPlugin:function(){this.numPluginManifestsGotten>=this.numPluginManifestsToGet?this.mdPluginSuccessCallback():this.getManifestDataForPlugin(this.numPluginManifestsGotten)},concatenateRemainingPluginNameParts:function(t){for(var e="",a=2;a<t.length;a++)e+=t[a],a+1<t.length&&(e+=this.PLUGIN_NAME_PARTS_DELIMITER);return e},parsePluginManifestName:function(t){var e={},a=t.split(this.PLUGIN_NAME_PARTS_DELIMITER);return a.length>=3&&(a[0].toLowerCase().equals("screen")||a[0].toLowerCase().equals("main"))?(e.launchLocation=a[0],e.launchCategory=a[1],e.launchName=this.concatenateRemainingPluginNameParts(a)):(e.launchLocation=this.DEFAULT_PLUGIN_LAUNCH_LOCATION,e.launchCategory=this.DEFAULT_PLUGIN_LAUNCH_CATEGORY,e.launchName=t),e},buildShortcutsForPlugin:function(t,e){var a,i=Object(n["a"])(e.shortcuts);try{for(i.s();!(a=i.n()).done;){var s=a.value,r=this.parsePluginManifestName(s.name);if(r.launchUrl=t.scope+s.url,r.queryParams=[],s["query_params"]){var o,l=Object(n["a"])(s["query_params"]);try{for(l.s();!(o=l.n()).done;){var u=o.value;r.queryParams.push(u)}}catch(c){l.e(c)}finally{l.f()}}t.shortcuts.push(r)}}catch(c){i.e(c)}finally{i.f()}},buildDefaultShortcutForPlugin:function(t){var e=this.parsePluginManifestName(t.name);e.launchUrl=t.scope,t.shortcuts.push(e)},parsePluginManifest:function(t){var e={};return e.name=t.name,e.scope=t.scope,e.shortcuts=[],t.shortcuts&&t.shortcuts.length>0?this.buildShortcutsForPlugin(e,t):this.buildDefaultShortcutForPlugin(e),e},getManifestDataForPluginSuccess:function(t){var e={};try{e=this.parsePluginManifest(t),e.loaded=!0}catch(a){e.loaded=!1,e.error="Could not parse manifest"}e.pluginUrl=this.mdPluginCurrentUrl,this.pluginManifestData[this.mdPluginCurrentUrl]=e,this.numPluginManifestsGotten++,this.checkManifestDataForPlugin()},getManifestDataForPluginFailure:function(t){var e={};e.pluginUrl=this.mdPluginCurrentUrl,e.loaded=!1,e.error=t,this.pluginManifestData[this.mdPluginCurrentUrl]=e,this.numPluginManifestsGotten++,this.checkManifestDataForPlugin()},getManifestDataForPlugin:function(t){var e=this.mdPluginUrlList[t],a="";a=e.endsWith("/")?e+"manifest.json":e+"/manifest.json",this.mdPluginCurrentUrl=e,this.$http.get(a).then((function(t){this.getManifestDataForPluginSuccess(t.data)}),(function(t){this.getManifestDataForPluginFailure(t)}))},removeIrrelevantPluginEntriesFromManifestData:function(t){for(var e=Object.keys(this.pluginManifestData),a=0,n=e;a<n.length;a++){var i=n[a];t.includes(i)||delete this.pluginManifestData[i]}},buildManifestDataPluginUrlList:function(t){this.mdPluginUrlList=[];var e,a=Object.keys(this.pluginManifestData),i=Object(n["a"])(t);try{for(i.s();!(e=i.n()).done;){var s=e.value;a.includes(s)||this.mdPluginUrlList.push(s)}}catch(r){i.e(r)}finally{i.f()}},prepDataForManifestLoad:function(t){this.pluginManifestData&&0!==Object.keys(this.pluginManifestData).length?(this.removeIrrelevantPluginEntriesFromManifestData(t),this.buildManifestDataPluginUrlList(t)):(this.mdPluginUrlList=t,this.pluginManifestData={})},loadManifestDataForPluginUrlList:function(t,e){t&&0!==t.length?(this.mdPluginSuccessCallback=e,this.prepDataForManifestLoad(t),0===this.mdPluginUrlList.length?e():(this.numPluginManifestsToGet=this.mdPluginUrlList.length,this.numPluginManifestsGotten=0,this.getManifestDataForPlugin(0))):e()},getEnabledPluginUrlList:function(){if(this.pluginList&&0!==this.pluginList.length){var t,e=[],a=Object(n["a"])(this.pluginList);try{for(a.s();!(t=a.n()).done;){var i=t.value;i.isEnabled&&e.push(i.url)}}catch(s){a.e(s)}finally{a.f()}return e}return[]},getPluginEnabledMapFromLocalStorage:function(){var t=localStorage.getItem(this.PLUGIN_ENABLED_LS_KEY),e=null;return e=t?JSON.parse(t):{},e},getIsPluginEnabled:function(t){var e=this.getPluginEnabledMapFromLocalStorage();return!!e[t]&&e[t]},setPluginAsEnabled:function(t){var e=this.getPluginEnabledMapFromLocalStorage();e[t]=!0,localStorage.setItem(this.PLUGIN_ENABLED_LS_KEY,JSON.stringify(e))},setPluginAsDisabled:function(t){var e=this.getPluginEnabledMapFromLocalStorage();delete e[t],localStorage.setItem(this.PLUGIN_ENABLED_LS_KEY,JSON.stringify(e))},setAllPluginsAsDisabled:function(){localStorage.removeItem(this.PLUGIN_ENABLED_LS_KEY)},getPluginListFromLocalStorage:function(){var t=localStorage.getItem(this.LOCAL_PLUGIN_LIST_KEY),e=[];return e=t?JSON.parse(t):[],e},addLocalPlugin:function(t){var e=this.getPluginListFromLocalStorage();e.includes(t)||e.push(t),localStorage.setItem(this.LOCAL_PLUGIN_LIST_KEY,JSON.stringify(e))},removeLocalPlugin:function(t){var e=this.getPluginListFromLocalStorage();if(e.includes(t)){for(var a=0;a<e.length;a++)if(e[a].equals(t)){e.splice(a,1);break}localStorage.setItem(this.LOCAL_PLUGIN_LIST_KEY,JSON.stringify(e))}},getPluginsFromRepoSuccess:function(t){this.buildPluginListSuccessCallback()},getPluginsFromRepoFailure:function(){appLog("Plugin search failure: "+msg),this.buildPluginListSuccessCallback()},buildPluginListItemFromRepoPlugin:function(t){},getPluginsFromRepo:function(){this.getPluginsFromRepoSuccess(null)},buildPluginListItemFromCuratedPlugin:function(t){var e={};return e.id=t.id,e.url=t.url,e.isCurated=!0,e.isNew=!1,e.isOwned=!1,e.isEnabled=this.getIsPluginEnabled(t.id),e},buildPluginListItemFromLocalPlugin:function(t){var e={};return e.id=t,e.url=t,e.isCurated=!1,e.isNew=!1,e.isOwned=!0,e.isEnabled=this.getIsPluginEnabled(t),e},getPluginsFromCuratedList:function(){var t,e=Object(n["a"])(this.$store.getters["app/curatedPlugins"]);try{for(e.s();!(t=e.n()).done;){var a=t.value;this.pluginList.push(this.buildPluginListItemFromCuratedPlugin(a))}}catch(i){e.e(i)}finally{e.f()}},getPluginsFromLocalStorage:function(){var t,e=Object(n["a"])(this.getPluginListFromLocalStorage());try{for(e.s();!(t=e.n()).done;){var a=t.value;this.pluginList.push(this.buildPluginListItemFromLocalPlugin(a))}}catch(i){e.e(i)}finally{e.f()}},buildPluginList:function(t){this.buildPluginListSuccessCallback=t,this.pluginList=[],this.getPluginsFromCuratedList(),this.getPluginsFromLocalStorage(),this.getPluginsFromRepo()}},computed:{}}},1322:function(t,e,a){},"17e9":function(t,e,a){t.exports=a.p+"img/cass-logo-square.8ddc73c9.png"},"6d79":function(t,e,a){"use strict";a.d(e,"a",(function(){return s}));a("caad"),a("d3b7"),a("ac1f"),a("25f0"),a("2532"),a("841c");var n=a("54f8"),i=(a("96cf"),a("c964")),s={name:"cassUtil",data:function(){return{}},methods:{getOrganizationByEcPk:function(t,e,a){var s=t.toPem(),r={size:1e4};EcOrganization.search(window.repo,"",function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(i){var r,o,l,u,c,d,g;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:r=Object(n["a"])(i),t.prev=1,r.s();case 3:if((o=r.n()).done){t.next=34;break}return l=o.value,t.prev=5,t.next=8,l.getOrgKeys();case 8:u=t.sent,c=Object(n["a"])(u),t.prev=10,c.s();case 12:if((d=c.n()).done){t.next=19;break}if(g=d.value,!g||!g.toPk().toPem().equals(s)){t.next=17;break}return e(l),t.abrupt("return");case 17:t.next=12;break;case 19:t.next=24;break;case 21:t.prev=21,t.t0=t["catch"](10),c.e(t.t0);case 24:return t.prev=24,c.f(),t.finish(24);case 27:t.next=32;break;case 29:t.prev=29,t.t1=t["catch"](5),a(t.t1.toString());case 32:t.next=3;break;case 34:t.next=39;break;case 36:t.prev=36,t.t2=t["catch"](1),r.e(t.t2);case 39:return t.prev=39,r.f(),t.finish(39);case 42:e(null);case 43:case"end":return t.stop()}}),t,null,[[1,36,39,42],[5,29],[10,21,24,27]])})));return function(e){return t.apply(this,arguments)}}(),(function(t){a(t)}),r)},getOrganizationEcPk:function(t){return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.getCurrentOrgKey();case 3:return e.abrupt("return",e.sent.toPk());case 6:return e.prev=6,e.t0=e["catch"](0),e.abrupt("return",null);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})))()},getPersonEcPk:function(t){var e=this.generateProbablePersonFingerprintFromShortId(t.shortId());if(t.owner){var a,i=Object(n["a"])(t.owner);try{for(i.s();!(a=i.n()).done;){var s=a.value,r=EcPk.fromPem(s);if(e.equals(r.fingerprint()))return r}}catch(o){i.e(o)}finally{i.f()}}return null},addAllOwnersFromObjectToObject:function(t,e){if(t&&t.owner){var a,i=Object(n["a"])(t.owner);try{for(i.s();!(a=i.n()).done;){var s=a.value,r=EcPk.fromPem(s);e.addOwner(r)}}catch(o){i.e(o)}finally{i.f()}}},setDefaultBrowserConfigId:function(t){localStorage.setItem("cassAuthoringToolDefaultBrowserConfigId",t)},removeDefaultBrowserConfig:function(){localStorage.removeItem("cassAuthoringToolDefaultBrowserConfigId")},getDefaultBrowserConfigId:function(){return localStorage.getItem("cassAuthoringToolDefaultBrowserConfigId")},getBooleanValue:function(t){return"boolean"===typeof t?t:"string"===typeof t&&!!t.equalsIgnoreCase("true")},addAllIdentityPksAsOwners:function(t){if(EcIdentityManager&&EcIdentityManager.default.ids&&EcIdentityManager.default.ids.length>0)for(var e=0;e<EcIdentityManager.default.ids.length;e++)t.addOwner(EcIdentityManager.default.ids[e].ppk.toPk())},isObjectOwnerless:function(t){return!t.owner||0===t.owner.length},doesAnyIdentityOwnObject:function(t){return!!this.isAdmin()||(null==t.canEditAny||t.canEditAny(EcIdentityManager.default.getMyPks()))},canEditAny:function(t){return!!this.isAdmin()||(null==t.canEditAny||t.canEditAny(EcIdentityManager.default.getMyPks()))},isAdmin:function(){return EcIdentityManager.default.ids.length>0&&null!=window.repo.adminKeys&&window.repo.adminKeys.length>0&&window.repo.adminKeys[0]===EcIdentityManager.default.ids[0].ppk.toPk().toPem()},generateProbablePersonFingerprintFromShortId:function(t){return t.substring(t.lastIndexOf("/")+1)},isPersonIdAnObjectOwner:function(t,e){if(!e.owner||0===e.owner.length)return!1;var a,i=this.generateProbablePersonFingerprintFromShortId(t),s=Object(n["a"])(e.owner);try{for(s.s();!(a=s.n()).done;){var r=a.value,o=EcPk.fromPem(r).fingerprint();if(o.equals(i))return!0}}catch(l){s.e(l)}finally{s.f()}return!1},isPersonIdAnObjectReader:function(t,e){if(!e.reader||0===e.reader.length)return!1;var a,i=this.generateProbablePersonFingerprintFromShortId(t),s=Object(n["a"])(e.reader);try{for(s.s();!(a=s.n()).done;){var r=a.value,o=EcPk.fromPem(r).fingerprint();if(o.equals(i))return!0}}catch(l){s.e(l)}finally{s.f()}return!1},areAnyIdentitiesThisPerson:function(t){var e=t.getFingerprint();if(EcIdentityManager&&EcIdentityManager.default.ids&&EcIdentityManager.default.ids.length>0)for(var a=0;a<EcIdentityManager.default.ids.length;a++)if(EcIdentityManager.default.ids[a].ppk.toPk().fingerprint().equals(e))return!0;return!1},isPersonalIdentityAnObjectOwner:function(t){if(this.isAdmin())return!0;if(!t.owner||0===t.owner.length)return!1;var e=this.getPersonalIdentityPk().toPem();return t.owner.includes(e)},getPersonalIdentityPk:function(){return EcIdentityManager&&EcIdentityManager.default.ids&&EcIdentityManager.default.ids.length>0?EcIdentityManager.default.ids[0].ppk.toPk():null},buildEcAlignmentsFromRemoteLinkedData:function(t){var e,a=[],i=Object(n["a"])(t);try{for(i.s();!(e=i.n()).done;){var s=e.value,r=new EcAlignment;r.copyFrom(s),a.push(r)}}catch(o){i.e(o)}finally{i.f()}return a}},computed:{amLoggedIn:function(){return!!(EcIdentityManager&&EcIdentityManager.default.ids&&EcIdentityManager.default.ids.length>0)}}}},"99b8":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("aside",{class:{"is-narrow":!t.showSideNav,menu:!0,"has-background-primary":!0,"has-text-white":!0},attrs:{id:"app-side-nav-bar"}},[a("div",[a("div",{staticClass:"logo-container mx-3 my-2",class:{"is-narrow":!t.showSideNav}},["true"!==t.queryParams.ceasnDataFields?a("router-link",{attrs:{to:{path:"/",query:t.queryParams}}},[t.showSideNav?a("img",{staticClass:"cass-logo",attrs:{alt:"Cass logo",src:t.casslogo}}):t._e()]):t._e(),a("button",{staticClass:"button is-rounded is-light cass-editor__logged-in-user-icon",on:{click:function(e){t.showUserInfo=!t.showUserInfo}}},[a("span",{attrs:{title:"Signed in as: "+t.displayName}},[t._v(" "+t._s(null!=t.loggedOnPerson.email?t.loggedOnPerson.email.slice(0,2):"No user"!==t.displayName?t.displayName.slice(0,2):"ME")+" ")])])],1),t.showUserInfo&&"No user"!==t.displayName?a("div",{staticClass:"px-3 mb-3 pb-1 cass-editor__logged-in-user-info"},[t.availableIdentities.length<2?a("h3",{staticClass:"is-size-3 has-text-weight-semibold"},[t.showSideNav?a("span",[t._v(t._s(t.displayName))]):t._e()]):a("div",{staticClass:"select is-fullwidth"},[a("select",{on:{change:function(e){return t.setIdentity(e.target.value)}}},t._l(t.availableIdentities,(function(e){return a("option",{key:e,domProps:{value:e.ppk.toPk().toPem()}},[t._v(" "+t._s(e.displayName)+" ")])})),0)]),t.showSideNav?a("p",{staticClass:"is-size-7"},[t._v(" "+t._s(t.loggedOnPerson.email)+" ")]):t._e(),t.showSideNav&&t.$store.getters["user/lastLogin"]?a("p",{staticClass:"is-size-7"},[t._v(" Last Login: "+t._s(new Date(t.$store.getters["user/lastLogin"]).toLocaleString())+" ")]):t._e(),t.showSideNav&&!t.hideLogoutButton?a("div",{staticClass:"my-2"},[a("button",{staticClass:"button is-primary is-small is-fullwidth",on:{click:t.performApplicationLogout}},[t._m(0),t.showSideNav?a("span",[t._v("logout")]):t._e()])]):t.hideLogoutButton?t._e():a("ul",{staticClass:"menu-list"},[a("li",{staticClass:"mt-1 has-text-white"},[a("a",{attrs:{title:"Logout"},on:{click:t.performApplicationLogout}},[t._m(1)])])])]):t.loginEnabled&&"No user"==t.displayName?a("div",{staticClass:"mx-3"},[t.showSideNav?a("button",{staticClass:"my-2 button is-outlined is-white is-fullwidth",on:{click:t.performApplicationLogin}},[t._m(2),t.showSideNav?a("span",[t._v("login")]):t._e()]):t._e(),t.showSideNav?t._e():a("div",{staticClass:"buttons is-centered"},[a("button",{staticClass:"button is-outlined is-white",attrs:{title:"Login"},on:{click:t.performApplicationLogin}},[t._m(3)])])]):t._e()]),a("div",{staticClass:"mx-3"},[t.showFrameworks?a("div",{staticClass:"menu-label"},[t._v(" Framework ")]):t._e(),t.showFrameworks?a("ul",{staticClass:"menu-list"},[a("li",{staticClass:"has-text-white"},[a("router-link",{attrs:{to:{path:"/frameworks",query:t.queryParams},title:t.showSideNav?"":"Frameworks"},nativeOn:{click:function(e){return t.$store.commit("editor/collectionMode",!1)}}},[a("span",{staticClass:"icon"},[a("i",{staticClass:"fa fa-th-list"})]),t.showSideNav?a("span",[t._v(" Frameworks")]):t._e()])],1),"true"===t.queryParams.ceasnDataFields&&t.showSideNav?a("li",{staticClass:"has-text-white"},[a("router-link",{attrs:{to:{path:"/collections",query:t.queryParams},title:t.showSideNav?"":"Collections"},nativeOn:{click:function(e){return t.$store.commit("editor/collectionMode",!0)}}},[a("span",{staticClass:"icon"},[a("i",{staticClass:"fa fa-th-list"})]),t.showSideNav?a("span",[t._v(" Collections")]):t._e()])],1):t._e(),a("li",{staticClass:"has-text-white"},[a("router-link",{attrs:{to:{path:"/import",query:t.queryParams},title:t.showSideNav?"":"Import Framework"},nativeOn:{click:function(e){t.$store.commit("editor/conceptMode",!1),t.$store.commit("editor/progressionMode",!1),t.$store.dispatch("app/clearImport")}}},[a("span",{staticClass:"icon"},[a("i",{staticClass:"fa fa-upload"})]),t.showSideNav?a("span",[t._v(" Import ")]):t._e()])],1),t.crosswalkEnabled?a("li",{staticClass:"has-text-white"},[a("router-link",{attrs:{to:{path:"/crosswalk",query:t.queryParams},title:t.showSideNav?"":"Crosswalk Frameworks"}},[a("span",{staticClass:"icon"},[a("i",{staticClass:"fa fa-network-wired"})]),t.showSideNav?a("span",[t._v(" Crosswalk Frameworks")]):t._e()])],1):t._e(),t._l(t.pluginLinkMap["Competencies & Frameworks"],(function(e){return a("li",{directives:[{name:"show",rawName:"v-show",value:t.showSideNav&&t.pluginsEnabled,expression:"showSideNav && pluginsEnabled"}],key:e,staticClass:"has-text-white"},[a("a",{attrs:{title:t.showSideNav?"":"{{ navLink.launchName }}"},on:{click:function(a){return t.setLaunchPluginValues(e)}}},[t._m(4,!0),t.showSideNav?a("span",[t._v(" "+t._s(e.launchName))]):t._e()])])}))],2):t._e(),"true"!==t.queryParams.disableAssertions&&t.isLoggedOn?[a("div",{staticClass:"menu-label",attrs:{"data-id":"side-nav-assertions-section"}},[t._v(" Assertion ")]),a("ul",{staticClass:"menu-list"},[a("li",{staticClass:"has-text-white"},[a("router-link",{attrs:{to:{path:"/timeline",query:t.queryParams},title:t.showSideNav?"":"Timeline"}},[a("span",{staticClass:"icon"},[a("i",{staticClass:"fa fa-history"})]),t.showSideNav?a("span",[t._v(" Timeline")]):t._e()])],1),a("li",{staticClass:"has-text-white"},[a("a",{attrs:{"data-id":"share-assertions-button",title:t.showSideNav?"":"Share"},on:{click:t.shareAssertions}},[t._m(5),t.showSideNav?a("span",[t._v(" Share")]):t._e()])])])]:t._e(),t.showConcepts?a("div",{staticClass:"menu-label"},["true"===t.queryParams.ceasnDataFields?a("span",[t._v("Concept Schemes")]):a("span",[t._v("Taxonomy")])]):t._e(),t.showConcepts?a("ul",{staticClass:"menu-list"},[a("li",{staticClass:"has-text-white"},[a("router-link",{attrs:{to:{path:"/concepts",query:t.queryParams},title:t.showSideNav?"":"true"===t.queryParams.ceasnDataFields?"Concept Schemes":"Taxonomies"}},[a("span",{staticClass:"icon"},[a("i",{staticClass:"fa fa-layer-group"})]),t.showSideNav&&"true"===t.queryParams.ceasnDataFields?a("span",[t._v(" Concept Schemes ")]):t.showSideNav?a("span",[t._v(" Taxonomies ")]):t._e()])],1),a("li",{staticClass:"has-text-white"},[a("router-link",{attrs:{to:{path:"/import",query:t.queryParams},title:t.showSideNav?"":"true"===t.queryParams.ceasnDataFields?"Import Concept Schemes":"Import Taxonomies"},nativeOn:{click:function(e){t.$store.commit("editor/conceptMode",!0),t.$store.commit("editor/progressionMode",!1),t.$store.dispatch("app/clearImport")}}},[a("span",{staticClass:"icon"},[a("i",{staticClass:"fa fa-upload"})]),t.showSideNav?a("span",[t._v(" Import")]):t._e()])],1),t._l(t.pluginLinkMap["Taxonomy"],(function(e){return a("li",{directives:[{name:"show",rawName:"v-show",value:t.showSideNav&&t.pluginsEnabled,expression:"showSideNav && pluginsEnabled"}],key:e,staticClass:"has-text-white"},[a("a",{attrs:{title:t.showSideNav?"":"{{ navLink.launchName }}"},on:{click:function(a){return t.setLaunchPluginValues(e)}}},[t._m(6,!0),t.showSideNav?a("span",[t._v(" "+t._s(e.launchName))]):t._e()])])}))],2):t._e(),"true"===t.queryParams.ceasnDataFields&&t.showConcepts?a("div",{staticClass:"menu-label"},[a("span",[t._v("Progression Models")])]):t._e(),"true"===t.queryParams.ceasnDataFields&&t.showConcepts?a("ul",{staticClass:"menu-list"},[a("li",{staticClass:"has-text-white"},[a("router-link",{attrs:{to:{path:"/progressionLevels",query:t.queryParams},title:t.showSideNav&&"true"===t.queryParams.ceasnDataFields?"":"Progression Models"}},[a("span",{staticClass:"icon"},[a("i",{staticClass:"fa fa-layer-group"})]),t.showSideNav&&"true"===t.queryParams.ceasnDataFields?a("span",[t._v(" Progression Models ")]):t._e()])],1),t.showSideNav&&"true"===t.queryParams.ceasnDataFields&&t.showConcepts?a("li",{staticClass:"has-text-white"},[a("router-link",{attrs:{to:{path:"/import",query:t.queryParams},title:t.showSideNav?"":"Import"},nativeOn:{click:function(e){t.$store.commit("editor/progressionMode",!0),t.$store.commit("editor/conceptMode",!1),t.$store.dispatch("app/clearImport")}}},[a("span",{staticClass:"icon"},[a("i",{staticClass:"fa fa-upload"})]),t._v(" Import ")])],1):t._e(),t._l(t.pluginLinkMap["Taxonomy"],(function(e){return a("li",{directives:[{name:"show",rawName:"v-show",value:t.showSideNav&&t.pluginsEnabled,expression:"showSideNav && pluginsEnabled"}],key:e,staticClass:"has-text-white"},[a("a",{attrs:{title:t.showSideNav?"":"{{ navLink.launchName }}"},on:{click:function(a){return t.setLaunchPluginValues(e)}}},[t._m(7,!0),t.showSideNav?a("span",[t._v(" "+t._s(e.launchName))]):t._e()])])}))],2):t._e(),t.configurationsEnabled||t.userManagementEnabled?a("div",{staticClass:"menu-label"},[t._v(" Configuration ")]):t._e(),a("ul",{staticClass:"menu-list"},[t.configurationsEnabled?a("li",[a("router-link",{attrs:{to:{path:"/configuration",query:t.queryParams},title:t.showSideNav?"":"Configurations"}},[a("span",{staticClass:"icon"},[a("i",{staticClass:"fa fa-cog"})]),t.showSideNav?a("span",[t._v("Configurations")]):t._e()])],1):t._e(),t.pluginsEnabled?a("li",[a("router-link",{attrs:{to:{path:"/pluginManager",query:t.queryParams},title:t.showSideNav?"":"Plugins"}},[a("span",{staticClass:"icon"},[a("i",{staticClass:"fa fa-charging-station"})]),t.showSideNav?a("span",[t._v("Plugins")]):t._e()])],1):t._e(),t.isLoggedOn&&t.userManagementEnabled?a("li",[a("router-link",{attrs:{to:{path:"/users",query:t.queryParams},title:t.showSideNav?"":"Groups"}},[a("span",{staticClass:"icon"},[a("i",{staticClass:"fa fa-users"})]),t.showSideNav?a("span",[t._v("Groups")]):t._e()])],1):t._e(),t._l(t.pluginLinkMap["Configuration"],(function(e){return a("li",{directives:[{name:"show",rawName:"v-show",value:t.showSideNav&&t.pluginsEnabled,expression:"showSideNav && pluginsEnabled"}],key:e,staticClass:"has-text-white"},[a("a",{attrs:{title:t.showSideNav?"":"{{ navLink.launchName }}"},on:{click:function(a){return t.setLaunchPluginValues(e)}}},[t._m(8,!0),t.showSideNav?a("span",[t._v(" "+t._s(e.launchName))]):t._e()])])}))],2),t._l(t.getNonStandardNavCategoriesFromPlugins,(function(e){return a("div",{directives:[{name:"show",rawName:"v-show",value:t.pluginsEnabled,expression:"pluginsEnabled"}],key:e,staticClass:"menu-label"},[t.showSideNav?a("div",{staticClass:"menu-label"},[t._v(" "+t._s(e)+" ")]):t._e(),t.showSideNav?a("ul",{staticClass:"menu-list"},t._l(t.pluginLinkMap[e],(function(e){return a("li",{key:e,staticClass:"has-text-white"},[a("a",{attrs:{title:t.showSideNav?"":"{{ navLink.launchName }}"},on:{click:function(a){return t.setLaunchPluginValues(e)}}},[t._m(9,!0),t.showSideNav?a("span",[t._v(" "+t._s(e.launchName))]):t._e()])])})),0):t._e()])}))],2),a("div",{staticClass:"mx-3"},[a("ul",{staticClass:"menu-list"},[t.showSideNav?a("li",{staticClass:"has-text-white"},[a("a",{on:{click:function(e){return t.$store.commit("app/closeSideNav")}}},[t._m(10),t.showSideNav?a("span",[t._v(" Collapse Sidebar")]):t._e()])]):a("li",{staticClass:"has-text-white"},[a("a",{attrs:{title:"Expand sidebar"},on:{click:function(e){return t.$store.commit("app/showSideNav")}}},[t._m(11)])])])])])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"icon"},[a("i",{staticClass:"fa fa-sign-out-alt"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"icon"},[a("i",{staticClass:"fa fa-sign-out-alt"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"icon"},[a("i",{staticClass:"fa fa-sign-in-alt"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"icon"},[a("i",{staticClass:"fa fa-sign-in-alt"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"icon"},[a("i",{staticClass:"fa fa-plug"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"icon"},[a("i",{staticClass:"fa fa-share"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"icon"},[a("i",{staticClass:"fa fa-plug"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"icon"},[a("i",{staticClass:"fa fa-plug"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"icon"},[a("i",{staticClass:"fa fa-plug"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"icon"},[a("i",{staticClass:"fa fa-plug"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"icon"},[a("i",{staticClass:"fa-regular fa-square-caret-left"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"icon"},[a("i",{staticClass:"fa-regular fa-square-caret-right"})])}],s=(a("4de4"),a("caad"),a("a434"),a("b0c0"),a("b64b"),a("2532"),a("f3f3")),r=a("54f8"),o=(a("96cf"),a("c964")),l=a("2f62"),u=a("bd89"),c=a.n(u),d=a("17e9"),g=a.n(d),h=a("6d79"),p=a("f3d2"),f=a("0162"),m={mixins:[h["a"],p["a"],f["a"]],name:"SideNav",props:{method:{default:"",type:String},showSideNav:{default:!1,type:Boolean}},components:{},data:function(){return{PLUGIN_CONTAINER_ROUTE:"pluginContainer",STANDARD_NAV_CATEGORIES:["Competencies & Frameworks","Taxonomy","Configuration"],casslogo:c.a,casslogoSquare:g.a,pluginLinkMap:{},addFrameworkOrDirectory:!1,availableIdentities:[],addNewDirectory:!1,directoryName:"",showUserInfo:!1}},methods:{handleClickoutsidePopup:function(){this.addFrameworkOrDirectory&&(this.addFrameworkOrDirectory=!1,this.addNewDirectory=!1)},setIdentity:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(e){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:a=0;case 1:if(!(a<window.EcIdentityManager.default.ids.length)){t.next=8;break}if(window.EcIdentityManager.default.ids[a].ppk.toPk().toPem()!==e){t.next=5;break}return window.EcIdentityManager.default.ids.unshift(window.EcIdentityManager.default.ids.splice(a,1)[0]),t.abrupt("break",8);case 5:a++,t.next=1;break;case 8:return this.identityDropdownActive=!1,t.next=11,window.EcPerson.getByPk(window.repo,window.EcIdentityManager.default.ids[0].ppk.toPk());case 11:n=t.sent,this.$store.commit("user/loggedOnPerson",n),this.availableIdentities=EcIdentityManager.default.ids;case 14:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),setLaunchPluginValues:function(t){this.$store.commit("app/pluginToLaunch",t),this.$store.commit("app/pluginToLaunchLastUpdate",Date.now()),this.$router.currentRoute.name.equals(this.PLUGIN_CONTAINER_ROUTE)||this.$router.push({path:"/pluginContainer"})},buildPluginLinkMap:function(){this.pluginLinkMap={};for(var t=Object.keys(this.pluginManifestData),e=0,a=t;e<a.length;e++){var n=a[e],i=this.pluginManifestData[n];if(i.shortcuts&&i.shortcuts.length>0){var s,o=Object(r["a"])(i.shortcuts);try{for(o.s();!(s=o.n()).done;){var l=s.value;l.launchLocation.toLowerCase().equals("main")&&(this.pluginLinkMap[l.launchCategory]||(this.pluginLinkMap[l.launchCategory]=[]),this.pluginLinkMap[l.launchCategory].push(l))}}catch(u){o.e(u)}finally{o.f()}}}},buildPluginListComplete:function(){var t=this.getEnabledPluginUrlList();t&&t.length>0?this.loadManifestDataForPluginUrlList(t,this.buildPluginLinkMap):this.pluginLinkMap={}},addNewlinesToId:function(t){t=t.substring(0,26)+"\n"+t.substring(26);var e=t.length,a=27;while(a+64<e)t=t.substring(0,a+64)+"\n"+t.substring(a+64),a+=65,e++;return t=t.substring(0,e-24)+"\n"+t.substring(e-24),t},selectDirectory:function(t){this.$store.commit("app/selectDirectory",t),this.$store.commit("app/rightAsideObject",t),"directory"!==this.$router.currentRoute.name&&this.$router.push({name:"directory"})},saveDirectory:function(){var t=this,e=new EcDirectory;e.name=this.directoryName,e.generateId(window.repo.selectedServer),EcIdentityManager.default.ids.length>0&&e.addOwner(EcIdentityManager.default.ids[0].ppk.toPk()),e["schema:dateCreated"]=(new Date).toISOString(),e["schema:dateModified"]=(new Date).toISOString(),e.save((function(a){appLog("Directory saved: "+e.id),t.directoryName="",t.$store.dispatch("app/refreshDirectories"),t.selectDirectory(e)}),appError,window.repo)},shareAssertions:function(){this.$store.commit("app/showModal",{component:"ShareAssertions"})}},watch:{loggedOnPerson:function(){this.availableIdentities=EcIdentityManager.default.ids},pluginLastUpdate:function(){this.buildPluginList(this.buildPluginListComplete)}},computed:Object(s["a"])(Object(s["a"])({},Object(l["c"])({crosswalkEnabled:function(t){return t.featuresEnabled.crosswalkEnabled},userManagementEnabled:function(t){return t.featuresEnabled.userManagementEnabled},configurationsEnabled:function(t){return t.featuresEnabled.configurationsEnabled},pluginsEnabled:function(t){return t.featuresEnabled.pluginsEnabled},loginEnabled:function(t){return t.featuresEnabled.loginEnabled},queryParams:function(t){return t.editor.queryParams},pluginLastUpdate:function(t){return t.app.pluginLastUpdate},directoryList:function(t){return t.app.directories.directoryList}})),{},{hideLogoutButton:function(){var t=this.$store.getters["user/repositorySsoOptions"];return!(!t||!t.ssoPublicKey||t.ssoLogout)},queryParams:function(){return this.$store.getters["editor/queryParams"]},isLoggedOn:function(){return!(!this.loggedOnPerson||!this.loggedOnPerson.name)},displayName:function(){return this.isLoggedOn?this.loggedOnPerson.name:this.availableIdentities.length>0?this.availableIdentities[0].displayName?this.availableIdentities[0].displayName:"Organization":"No user"},currentRoute:function(){return this.$route.path},supportedFiles:function(){return!0===this.$store.getters["editor/conceptMode"]||!0===this.$store.getters["editor/progressionMode"]?this.supportedConceptFileTypes:this.supportedFileTypes},loggedOnPerson:function(){return this.$store.getters["user/loggedOnPerson"]},getNonStandardNavCategoriesFromPlugins:function(){for(var t=[],e=Object.keys(this.pluginLinkMap),a=0,n=e;a<n.length;a++){var i=n[a];this.STANDARD_NAV_CATEGORIES.includes(i)||t.push(i)}return t.sort(),t},myTopLevelDirectories:function(){return this.directoryList.filter((function(t){return!t.parentDirectory}))},showFrameworks:function(){return!this.queryParams||"true"!==this.queryParams.ceasnDataFields||"true"!==this.queryParams.concepts},showConcepts:function(){return!this.queryParams||"true"!==this.queryParams.ceasnDataFields||"true"===this.queryParams.concepts}}),mounted:function(){this.buildPluginList(this.buildPluginListComplete),this.$store.dispatch("app/refreshDirectories"),this.availableIdentities=EcIdentityManager.default.ids}},v=m,P=(a("fa42"),a("2877")),w=Object(P["a"])(v,n,i,!1,null,null,null);e["default"]=w.exports},bd89:function(t,e,a){t.exports=a.p+"img/cass-logo-white.eb44ee72.svg"},f3d2:function(t,e,a){"use strict";a.d(e,"a",(function(){return n}));a("b0c0"),a("d3b7"),a("ddb0");var n={name:"cassApi",data:function(){return{USER_PROFILE_SERVICE:"user/profile",USER_CREATE_SERVICE:"user",USER_LOGIN_SERVICE:"login",USER_LOGOUT_SERVICE:"logout",LOGOUT_REDIRECT_URL:window.location.origin+"/cass-editor/#/login"}},methods:{parseCredentialsFromProfileResponse:function(t){var e=JSON.parse(t.responseText),a={};return a.username=e["preferred_username"],a.password=e["cass_password"],e["email"]?a.email=e["email"]:a.email="n/a",e["name"]?a.name=e["name"]:e["given_name"]&&e["family_name"]?a.name=e["given_name"]+" "+e["family_name"]:a.name=e["preferred_username"],a},performCreateUser:function(t,e){var a=new XMLHttpRequest;a.addEventListener("load",(function(t){return e(t.currentTarget)})),a.withCredentials=!0;var n=this.cassApiLocation+this.USER_CREATE_SERVICE;a.open("POST",n),a.setRequestHeader("Content-Type","application/json;charset=UTF-8"),a.send(JSON.stringify({username:t.username,password:t.password,email:t.email,firstName:t.firstName,lastName:t.lastName}))},getUserProfile:function(t){var e=new XMLHttpRequest;e.addEventListener("load",(function(e){return t(e.currentTarget)})),e.withCredentials=!0;var a=this.cassApiLocation+this.USER_PROFILE_SERVICE;e.open("GET",a),e.send()},redirectToExternalLogin:function(){appLog("Redirecting to external login..."),window.location=this.repositorySsoOptions.ssoLogin+"?redirectUrl="+encodeURIComponent(window.location)},redirectToExternalLogout:function(){appLog("Redirecting to external logout..."),window.location=this.repositorySsoOptions.ssoLogout+"?redirectUrl="+encodeURIComponent(window.location)},goToLogin:function(){this.apiLoginEnabled?this.$router.push({path:"/login"}):this.$router.push({path:"/legacyLogin"})},checkExternalLogoutStatus:function(t){200!==t.status&&appLog("Logout fired but returned an unexpected response code: "+t.status),this.goToLogin()},performExternalLogout:function(){var t=this;appLog("Performing external logout...");var e=new XMLHttpRequest;e.addEventListener("load",(function(e){return t.checkExternalLogoutStatus(e.currentTarget)})),e.withCredentials=!0;var a=this.cassApiLocation+this.USER_LOGOUT_SERVICE;e.open("GET",a),e.send()},performApplicationLogout:function(){appLog("Performing application logout..."),EcIdentityManager.default.clearContacts(),EcIdentityManager.default.clearIdentities();var t={};this.$store.commit("user/loggedOnPerson",t),this.$store.commit("app/showModal",{component:"LogoutSuccess"})},performApplicationLogin:function(){appLog("Performing application login..."),EcIdentityManager.default.clearContacts(),EcIdentityManager.default.clearIdentities();var t={};this.$store.commit("user/loggedOnPerson",t),this.apiLoginEnabled?this.redirectToExternalLogin():this.goToLogin()},addQueryParams:function(){var t=this.$store.getters["editor/queryParams"],e=EcObject.keys(t);if(t&&e.length){var a="?";for(var n in e){0!==n&&(a+="&");var i=e[n],s=t[i];if(EcArray.isArray(s))for(var r in s)0!==r&&(a+="&"),a+=i+"="+s[r];else a+=i+"="+s}return a}return""}},computed:{cassApiLocation:function(){return this.$store.getters["environment/cassApiLocation"]},repositorySsoOptions:function(){return this.$store.getters["user/repositorySsoOptions"]},apiLoginEnabled:function(){return this.$store.getters["featuresEnabled/apiLoginEnabled"]}}}},fa42:function(t,e,a){"use strict";var n=a("1322"),i=a.n(n);i.a}}]);
//# sourceMappingURL=sidenav.29163855.js.map