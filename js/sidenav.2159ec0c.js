(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["sidenav","chunk-2d0dab46","chunk-2d0dab46"],{"0162":function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));n("caad"),n("a434"),n("b0c0"),n("b64b"),n("d3b7"),n("ac1f"),n("8a79"),n("2532"),n("3ca3"),n("1276"),n("ddb0"),n("2b3d");var a=n("54f8"),i={name:"pluginUtil",data:function(){return{PLUGIN_NAME_PARTS_DELIMITER:"/",DEFAULT_PLUGIN_LAUNCH_LOCATION:"main",DEFAULT_PLUGIN_LAUNCH_CATEGORY:"Plugins",PLUGIN_ENABLED_LS_KEY:"cassAuthoringToolPluginsEnabled",LOCAL_PLUGIN_LIST_KEY:"cassAuthoringToolLocalPlugins",mdPluginUrlList:[],mdPluginSuccessCallback:null,numPluginManifestsToGet:0,numPluginManifestsGotten:0,mdPluginCurrentUrl:"",pluginManifestData:{},pluginList:[],buildPluginListSuccessCallback:null}},methods:{isValidUrl:function(t){try{new URL(t)}catch(e){return!1}return!0},checkManifestDataForPlugin:function(){this.numPluginManifestsGotten>=this.numPluginManifestsToGet?this.mdPluginSuccessCallback():this.getManifestDataForPlugin(this.numPluginManifestsGotten)},concatenateRemainingPluginNameParts:function(t){for(var e="",n=2;n<t.length;n++)e+=t[n],n+1<t.length&&(e+=this.PLUGIN_NAME_PARTS_DELIMITER);return e},parsePluginManifestName:function(t){var e={},n=t.split(this.PLUGIN_NAME_PARTS_DELIMITER);return n.length>=3&&(n[0].toLowerCase().equals("screen")||n[0].toLowerCase().equals("main"))?(e.launchLocation=n[0],e.launchCategory=n[1],e.launchName=this.concatenateRemainingPluginNameParts(n)):(e.launchLocation=this.DEFAULT_PLUGIN_LAUNCH_LOCATION,e.launchCategory=this.DEFAULT_PLUGIN_LAUNCH_CATEGORY,e.launchName=t),e},buildShortcutsForPlugin:function(t,e){var n,i=Object(a["a"])(e.shortcuts);try{for(i.s();!(n=i.n()).done;){var s=n.value,r=this.parsePluginManifestName(s.name);if(r.launchUrl=t.scope+s.url,r.queryParams=[],s["query_params"]){var o,l=Object(a["a"])(s["query_params"]);try{for(l.s();!(o=l.n()).done;){var u=o.value;r.queryParams.push(u)}}catch(c){l.e(c)}finally{l.f()}}t.shortcuts.push(r)}}catch(c){i.e(c)}finally{i.f()}},buildDefaultShortcutForPlugin:function(t){var e=this.parsePluginManifestName(t.name);e.launchUrl=t.scope,t.shortcuts.push(e)},parsePluginManifest:function(t){var e={};return e.name=t.name,e.scope=t.scope,e.shortcuts=[],t.shortcuts&&t.shortcuts.length>0?this.buildShortcutsForPlugin(e,t):this.buildDefaultShortcutForPlugin(e),e},getManifestDataForPluginSuccess:function(t){var e={};try{e=this.parsePluginManifest(t),e.loaded=!0}catch(n){e.loaded=!1,e.error="Could not parse manifest"}e.pluginUrl=this.mdPluginCurrentUrl,this.pluginManifestData[this.mdPluginCurrentUrl]=e,this.numPluginManifestsGotten++,this.checkManifestDataForPlugin()},getManifestDataForPluginFailure:function(t){var e={};e.pluginUrl=this.mdPluginCurrentUrl,e.loaded=!1,e.error=t,this.pluginManifestData[this.mdPluginCurrentUrl]=e,this.numPluginManifestsGotten++,this.checkManifestDataForPlugin()},getManifestDataForPlugin:function(t){var e=this.mdPluginUrlList[t],n="";n=e.endsWith("/")?e+"manifest.json":e+"/manifest.json",this.mdPluginCurrentUrl=e,this.$http.get(n).then((function(t){this.getManifestDataForPluginSuccess(t.data)}),(function(t){this.getManifestDataForPluginFailure(t)}))},removeIrrelevantPluginEntriesFromManifestData:function(t){for(var e=Object.keys(this.pluginManifestData),n=0,a=e;n<a.length;n++){var i=a[n];t.includes(i)||delete this.pluginManifestData[i]}},buildManifestDataPluginUrlList:function(t){this.mdPluginUrlList=[];var e,n=Object.keys(this.pluginManifestData),i=Object(a["a"])(t);try{for(i.s();!(e=i.n()).done;){var s=e.value;n.includes(s)||this.mdPluginUrlList.push(s)}}catch(r){i.e(r)}finally{i.f()}},prepDataForManifestLoad:function(t){this.pluginManifestData&&0!==Object.keys(this.pluginManifestData).length?(this.removeIrrelevantPluginEntriesFromManifestData(t),this.buildManifestDataPluginUrlList(t)):(this.mdPluginUrlList=t,this.pluginManifestData={})},loadManifestDataForPluginUrlList:function(t,e){t&&0!==t.length?(this.mdPluginSuccessCallback=e,this.prepDataForManifestLoad(t),0===this.mdPluginUrlList.length?e():(this.numPluginManifestsToGet=this.mdPluginUrlList.length,this.numPluginManifestsGotten=0,this.getManifestDataForPlugin(0))):e()},getEnabledPluginUrlList:function(){if(this.pluginList&&0!==this.pluginList.length){var t,e=[],n=Object(a["a"])(this.pluginList);try{for(n.s();!(t=n.n()).done;){var i=t.value;i.isEnabled&&e.push(i.url)}}catch(s){n.e(s)}finally{n.f()}return e}return[]},getPluginEnabledMapFromLocalStorage:function(){var t=localStorage.getItem(this.PLUGIN_ENABLED_LS_KEY),e=null;return e=t?JSON.parse(t):{},e},getIsPluginEnabled:function(t){var e=this.getPluginEnabledMapFromLocalStorage();return!!e[t]&&e[t]},setPluginAsEnabled:function(t){var e=this.getPluginEnabledMapFromLocalStorage();e[t]=!0,localStorage.setItem(this.PLUGIN_ENABLED_LS_KEY,JSON.stringify(e))},setPluginAsDisabled:function(t){var e=this.getPluginEnabledMapFromLocalStorage();delete e[t],localStorage.setItem(this.PLUGIN_ENABLED_LS_KEY,JSON.stringify(e))},setAllPluginsAsDisabled:function(){localStorage.removeItem(this.PLUGIN_ENABLED_LS_KEY)},getPluginListFromLocalStorage:function(){var t=localStorage.getItem(this.LOCAL_PLUGIN_LIST_KEY),e=[];return e=t?JSON.parse(t):[],e},addLocalPlugin:function(t){var e=this.getPluginListFromLocalStorage();e.includes(t)||e.push(t),localStorage.setItem(this.LOCAL_PLUGIN_LIST_KEY,JSON.stringify(e))},removeLocalPlugin:function(t){var e=this.getPluginListFromLocalStorage();if(e.includes(t)){for(var n=0;n<e.length;n++)if(e[n].equals(t)){e.splice(n,1);break}localStorage.setItem(this.LOCAL_PLUGIN_LIST_KEY,JSON.stringify(e))}},getPluginsFromRepoSuccess:function(t){this.buildPluginListSuccessCallback()},getPluginsFromRepoFailure:function(){appLog("Plugin search failure: "+msg),this.buildPluginListSuccessCallback()},buildPluginListItemFromRepoPlugin:function(t){},getPluginsFromRepo:function(){this.getPluginsFromRepoSuccess(null)},buildPluginListItemFromCuratedPlugin:function(t){var e={};return e.id=t.id,e.url=t.url,e.isCurated=!0,e.isNew=!1,e.isOwned=!1,e.isEnabled=this.getIsPluginEnabled(t.id),e},buildPluginListItemFromLocalPlugin:function(t){var e={};return e.id=t,e.url=t,e.isCurated=!1,e.isNew=!1,e.isOwned=!0,e.isEnabled=this.getIsPluginEnabled(t),e},getPluginsFromCuratedList:function(){var t,e=Object(a["a"])(this.$store.getters["app/curatedPlugins"]);try{for(e.s();!(t=e.n()).done;){var n=t.value;this.pluginList.push(this.buildPluginListItemFromCuratedPlugin(n))}}catch(i){e.e(i)}finally{e.f()}},getPluginsFromLocalStorage:function(){var t,e=Object(a["a"])(this.getPluginListFromLocalStorage());try{for(e.s();!(t=e.n()).done;){var n=t.value;this.pluginList.push(this.buildPluginListItemFromLocalPlugin(n))}}catch(i){e.e(i)}finally{e.f()}},buildPluginList:function(t){this.buildPluginListSuccessCallback=t,this.pluginList=[],this.getPluginsFromCuratedList(),this.getPluginsFromLocalStorage(),this.getPluginsFromRepo()}},computed:{}}},1322:function(t,e,n){},"17e9":function(t,e,n){t.exports=n.p+"img/cass-logo-square.8ddc73c9.png"},"6d79":function(t,e,n){"use strict";n.d(e,"a",(function(){return s}));n("caad"),n("d3b7"),n("ac1f"),n("25f0"),n("2532"),n("841c");var a=n("54f8"),i=(n("96cf"),n("c964")),s={name:"cassUtil",data:function(){return{}},methods:{getOrganizationByEcPk:function(t,e,n){var s=t.toPem(),r={size:1e4};EcOrganization.search(window.repo,"",function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(i){var r,o,l,u,c,d,g;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:r=Object(a["a"])(i),t.prev=1,r.s();case 3:if((o=r.n()).done){t.next=34;break}return l=o.value,t.prev=5,t.next=8,l.getOrgKeys();case 8:u=t.sent,c=Object(a["a"])(u),t.prev=10,c.s();case 12:if((d=c.n()).done){t.next=19;break}if(g=d.value,!g||!g.toPk().toPem().equals(s)){t.next=17;break}return e(l),t.abrupt("return");case 17:t.next=12;break;case 19:t.next=24;break;case 21:t.prev=21,t.t0=t["catch"](10),c.e(t.t0);case 24:return t.prev=24,c.f(),t.finish(24);case 27:t.next=32;break;case 29:t.prev=29,t.t1=t["catch"](5),n(t.t1.toString());case 32:t.next=3;break;case 34:t.next=39;break;case 36:t.prev=36,t.t2=t["catch"](1),r.e(t.t2);case 39:return t.prev=39,r.f(),t.finish(39);case 42:e(null);case 43:case"end":return t.stop()}}),t,null,[[1,36,39,42],[5,29],[10,21,24,27]])})));return function(e){return t.apply(this,arguments)}}(),(function(t){n(t)}),r)},getOrganizationEcPk:function(t){return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.getCurrentOrgKey();case 3:return e.abrupt("return",e.sent.toPk());case 6:return e.prev=6,e.t0=e["catch"](0),e.abrupt("return",null);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})))()},getPersonEcPk:function(t){var e=this.generateProbablePersonFingerprintFromShortId(t.shortId());if(t.owner){var n,i=Object(a["a"])(t.owner);try{for(i.s();!(n=i.n()).done;){var s=n.value,r=EcPk.fromPem(s);if(e.equals(r.fingerprint()))return r}}catch(o){i.e(o)}finally{i.f()}}return null},addAllOwnersFromObjectToObject:function(t,e){if(t&&t.owner){var n,i=Object(a["a"])(t.owner);try{for(i.s();!(n=i.n()).done;){var s=n.value,r=EcPk.fromPem(s);e.addOwner(r)}}catch(o){i.e(o)}finally{i.f()}}},setDefaultBrowserConfigId:function(t){localStorage.setItem("cassAuthoringToolDefaultBrowserConfigId",t)},removeDefaultBrowserConfig:function(){localStorage.removeItem("cassAuthoringToolDefaultBrowserConfigId")},getDefaultBrowserConfigId:function(){return localStorage.getItem("cassAuthoringToolDefaultBrowserConfigId")},getBooleanValue:function(t){return"boolean"===typeof t?t:"string"===typeof t&&!!t.equalsIgnoreCase("true")},addAllIdentityPksAsOwners:function(t){if(EcIdentityManager&&EcIdentityManager.default.ids&&EcIdentityManager.default.ids.length>0)for(var e=0;e<EcIdentityManager.default.ids.length;e++)t.addOwner(EcIdentityManager.default.ids[e].ppk.toPk())},isObjectOwnerless:function(t){return!t.owner||0===t.owner.length},doesAnyIdentityOwnObject:function(t){if(!EcIdentityManager||!EcIdentityManager.default.ids||EcIdentityManager.default.ids.length<=0)return!1;for(var e=0;e<EcIdentityManager.default.ids.length;e++)if(t.hasOwner(EcIdentityManager.default.ids[e].ppk.toPk()))return!0;return!1},generateProbablePersonFingerprintFromShortId:function(t){return t.substring(t.lastIndexOf("/")+1)},isPersonIdAnObjectOwner:function(t,e){if(!e.owner||0===e.owner.length)return!1;var n,i=this.generateProbablePersonFingerprintFromShortId(t),s=Object(a["a"])(e.owner);try{for(s.s();!(n=s.n()).done;){var r=n.value,o=EcPk.fromPem(r).fingerprint();if(o.equals(i))return!0}}catch(l){s.e(l)}finally{s.f()}return!1},isPersonIdAnObjectReader:function(t,e){if(!e.reader||0===e.reader.length)return!1;var n,i=this.generateProbablePersonFingerprintFromShortId(t),s=Object(a["a"])(e.reader);try{for(s.s();!(n=s.n()).done;){var r=n.value,o=EcPk.fromPem(r).fingerprint();if(o.equals(i))return!0}}catch(l){s.e(l)}finally{s.f()}return!1},areAnyIdentitiesThisPerson:function(t){var e=t.getFingerprint();if(EcIdentityManager&&EcIdentityManager.default.ids&&EcIdentityManager.default.ids.length>0)for(var n=0;n<EcIdentityManager.default.ids.length;n++)if(EcIdentityManager.default.ids[n].ppk.toPk().fingerprint().equals(e))return!0;return!1},isPersonalIdentityAnObjectOwner:function(t){if(!t.owner||0===t.owner.length)return!1;var e=this.getPersonalIdentityPk().toPem();return t.owner.includes(e)},getPersonalIdentityPk:function(){return EcIdentityManager&&EcIdentityManager.default.ids&&EcIdentityManager.default.ids.length>0?EcIdentityManager.default.ids[0].ppk.toPk():null},buildEcAlignmentsFromRemoteLinkedData:function(t){var e,n=[],i=Object(a["a"])(t);try{for(i.s();!(e=i.n()).done;){var s=e.value,r=new EcAlignment;r.copyFrom(s),n.push(r)}}catch(o){i.e(o)}finally{i.f()}return n}},computed:{amLoggedIn:function(){return!!(EcIdentityManager&&EcIdentityManager.default.ids&&EcIdentityManager.default.ids.length>0)}}}},"99b8":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("aside",{staticClass:"menu has-background-primary has-text-white",class:{"is-narrow":!t.showSideNav},attrs:{id:"app-side-nav-bar"}},[n("div",{},["true"!==t.queryParams.ceasnDataFields?n("router-link",{attrs:{to:{path:"/",query:t.queryParams}}},[t.showSideNav?n("img",{staticClass:"cass-logo",attrs:{src:t.casslogo}}):n("img",{staticClass:"cass-logo-square",attrs:{src:t.casslogoSquare}})]):t._e(),t.showSideNav?t._e():n("div",{staticClass:"buttons is-centered",on:{click:function(e){return t.$store.commit("app/showSideNav")}}},[t._m(0)]),t.showSideNav?n("div",{staticClass:"button is-rounded p-0 is-pulled-right",on:{click:function(e){return t.$store.commit("app/closeSideNav")}}},[n("i",{staticClass:"fa fa-chevron-left p-3"})]):t._e()],1),n("div",{staticClass:"menu-label has-text-white is-size-3"},["No user"!==t.displayName?[t.showSideNav?t._e():n("div",{staticClass:"cass-editor__logged-in-user-icon"},[n("span",{attrs:{title:"Signed in as: "+t.displayName}},[t._v(" "+t._s(t.loggedOnPerson.email.slice(0,2))+" ")])]),n("h3",{staticClass:"is-size-3 has-text-weight-semibold"},[t.showSideNav?n("span",[t._v(t._s(t.displayName))]):t._e()]),t.showSideNav?n("p",{staticClass:"is-size-6"},[t._v(" "+t._s(t.loggedOnPerson.email)+" ")]):t._e(),t.showSideNav&&t.$store.getters["user/lastLogin"]?n("p",{staticClass:"is-size-6"},[t._v(" Last Login: "+t._s(new Date(t.$store.getters["user/lastLogin"]).toLocaleString())+" ")]):t._e(),t.showSideNav?n("div",{staticClass:"buttons is-right",attrs:{title:"Log out"}},[n("div",{staticClass:"button is-rounded white",on:{click:t.performApplicationLogout}},[t._m(1),t.showSideNav?n("span",[t._v("logout")]):t._e()])]):n("div",{staticClass:"buttons pt-4 is-centered"},[n("div",{staticClass:"button is-outlined is-white",on:{click:t.performApplicationLogout}},[t._m(2)])])]:t.loginEnabled?[t.showSideNav?n("div",{staticClass:"button  is-large is-outlined is-white",on:{click:t.performApplicationLogin}},[t._m(3),t.showSideNav?n("span",[t._v("login")]):t._e()]):t._e(),t.showSideNav?t._e():n("div",{staticClass:"buttons is-centered"},[n("div",{staticClass:"button is-outlined is-white",on:{click:t.performApplicationLogin}},[t._m(4)])])]:t._e(),t._e()],2),n("hr"),t.showSideNav&&t.showFrameworks?n("div",{staticClass:"menu-label has-text-weight-bold"},[t._v(" Framework ")]):t._e(),t.showFrameworks?n("ul",{staticClass:"menu-list"},[n("li",{staticClass:"has-text-white"},[n("router-link",{attrs:{to:{path:"/frameworks",query:t.queryParams}},nativeOn:{click:function(e){return t.$store.commit("editor/collectionMode",!1)}}},[n("span",{staticClass:"icon"},[n("i",{staticClass:"fa fa-th-list"})]),t.showSideNav?n("span",[t._v(" Frameworks")]):t._e()])],1),"true"===t.queryParams.ceasnDataFields&&t.showSideNav?n("li",{staticClass:"has-text-white"},[n("router-link",{attrs:{to:{path:"/collections",query:t.queryParams}},nativeOn:{click:function(e){return t.$store.commit("editor/collectionMode",!0)}}},[n("span",{staticClass:"icon"},[n("i",{staticClass:"fa fa-th-list"})]),t.showSideNav?n("span",[t._v(" Collections")]):t._e()])],1):t._e(),t.showSideNav?n("li",{staticClass:"has-text-white"},[n("router-link",{attrs:{to:{path:"/import",query:t.queryParams}},nativeOn:{click:function(e){t.$store.commit("editor/conceptMode",!1),t.$store.dispatch("app/clearImport")}}},[n("span",{staticClass:"icon"},[n("i",{staticClass:"fa fa-upload"})]),t.showSideNav?n("span",[t._v(" Import ")]):t._e()])],1):t._e(),t.crosswalkEnabled?n("li",{staticClass:"has-text-white"},[n("router-link",{attrs:{to:{path:"/crosswalk",query:t.queryParams}}},[n("span",{staticClass:"icon"},[n("i",{staticClass:"fa fa-network-wired"})]),t.showSideNav?n("span",[t._v(" Crosswalk Frameworks")]):t._e()])],1):t._e(),t._l(t.pluginLinkMap["Competencies & Frameworks"],(function(e){return n("li",{directives:[{name:"show",rawName:"v-show",value:t.showSideNav&&t.pluginsEnabled,expression:"showSideNav && pluginsEnabled"}],key:e,staticClass:"has-text-white"},[n("a",{on:{click:function(n){return t.setLaunchPluginValues(e)}}},[t._m(5,!0),t.showSideNav?n("span",[t._v(" "+t._s(e.launchName))]):t._e()])])}))],2):t._e(),"true"!==t.queryParams.disableAssertions&&t.isLoggedOn?[t.showSideNav?n("div",{staticClass:"menu-label has-text-weight-bold",attrs:{"data-id":"side-nav-assertions-section"}},[t._v(" Assertion ")]):t._e(),n("ul",{staticClass:"menu-list"},[n("li",{staticClass:"has-text-white"},[n("router-link",{attrs:{to:{path:"/timeline",query:t.queryParams}}},[n("span",{staticClass:"icon"},[n("i",{staticClass:"fa fa-history"})]),t.showSideNav?n("span",[t._v(" Timeline")]):t._e()])],1),n("li",{staticClass:"has-text-white"},[n("a",{attrs:{"data-id":"share-assertions-button"},on:{click:t.shareAssertions}},[t._m(6),t.showSideNav?n("span",[t._v(" Share")]):t._e()])])])]:t._e(),t.showSideNav&&t.showConcepts?n("div",{staticClass:"menu-label has-text-weight-bold"},["true"===t.queryParams.ceasnDataFields?n("span",[t._v("Concept Schemes")]):n("span",[t._v("Taxonomy")])]):t._e(),t.showConcepts?n("ul",{staticClass:"menu-list"},[n("li",{staticClass:"has-text-white"},[n("router-link",{attrs:{to:{path:"/concepts",query:t.queryParams}}},[n("span",{staticClass:"icon"},[n("i",{staticClass:"fa fa-layer-group"})]),t.showSideNav&&"true"===t.queryParams.ceasnDataFields?n("span",[t._v(" Concept Schemes ")]):t.showSideNav?n("span",[t._v(" Taxonomies ")]):t._e()])],1),t.showSideNav?n("li",{staticClass:"has-text-white"},[n("router-link",{attrs:{to:{path:"/import",query:t.queryParams}},nativeOn:{click:function(e){t.$store.commit("editor/conceptMode",!0),t.$store.dispatch("app/clearImport")}}},[n("span",{staticClass:"icon"},[n("i",{staticClass:"fa fa-upload"})]),t._v(" Import ")])],1):t._e(),t._l(t.pluginLinkMap["Taxonomy"],(function(e){return n("li",{directives:[{name:"show",rawName:"v-show",value:t.showSideNav&&t.pluginsEnabled,expression:"showSideNav && pluginsEnabled"}],key:e,staticClass:"has-text-white"},[n("a",{on:{click:function(n){return t.setLaunchPluginValues(e)}}},[t._m(7,!0),t.showSideNav?n("span",[t._v(" "+t._s(e.launchName))]):t._e()])])}))],2):t._e(),t.showSideNav&&(t.configurationsEnabled||t.userManagementEnabled)?n("div",{staticClass:"menu-label has-text-weight-bold"},[t._v(" Configuration ")]):t._e(),n("ul",{staticClass:"menu-list"},[t.configurationsEnabled?n("li",[n("router-link",{attrs:{to:{path:"/configuration",query:t.queryParams}}},[n("span",{staticClass:"icon"},[n("i",{staticClass:"fa fa-cog"})]),t.showSideNav?n("span",[t._v("Configurations")]):t._e()])],1):t._e(),t.pluginsEnabled?n("li",[n("router-link",{attrs:{to:{path:"/pluginManager",query:t.queryParams}}},[n("span",{staticClass:"icon"},[n("i",{staticClass:"fa fa-charging-station"})]),t.showSideNav?n("span",[t._v("Plugins")]):t._e()])],1):t._e(),t.isLoggedOn&&t.userManagementEnabled?n("li",[n("router-link",{attrs:{to:{path:"/users",query:t.queryParams}}},[n("span",{staticClass:"icon"},[n("i",{staticClass:"fa fa-users"})]),t.showSideNav?n("span",[t._v("Groups")]):t._e()])],1):t._e(),t._l(t.pluginLinkMap["Configuration"],(function(e){return n("li",{directives:[{name:"show",rawName:"v-show",value:t.showSideNav&&t.pluginsEnabled,expression:"showSideNav && pluginsEnabled"}],key:e,staticClass:"has-text-white"},[n("a",{on:{click:function(n){return t.setLaunchPluginValues(e)}}},[t._m(8,!0),t.showSideNav?n("span",[t._v(" "+t._s(e.launchName))]):t._e()])])}))],2),t._l(t.getNonStandardNavCategoriesFromPlugins,(function(e){return n("div",{directives:[{name:"show",rawName:"v-show",value:t.pluginsEnabled,expression:"pluginsEnabled"}],key:e,staticClass:"menu-label"},[t.showSideNav?n("div",{staticClass:"menu-label has-text-weight-bold"},[t._v(" "+t._s(e)+" ")]):t._e(),t.showSideNav?n("ul",{staticClass:"menu-list"},t._l(t.pluginLinkMap[e],(function(e){return n("li",{key:e,staticClass:"has-text-white"},[n("a",{on:{click:function(n){return t.setLaunchPluginValues(e)}}},[t._m(9,!0),t.showSideNav?n("span",[t._v(" "+t._s(e.launchName))]):t._e()])])})),0):t._e()])}))],2)},i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("button",{staticClass:"button is-outlined is-rounded p-0"},[n("i",{staticClass:"fa fa-chevron-right px-3"})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"icon"},[n("i",{staticClass:"fa fa-sign-out-alt"})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"icon"},[n("i",{staticClass:"fa fa-sign-out-alt"})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"icon"},[n("i",{staticClass:"fa fa-sign-in-alt"})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"icon"},[n("i",{staticClass:"fa fa-sign-in-alt"})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"icon"},[n("i",{staticClass:"fa fa-plug"})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"icon"},[n("i",{staticClass:"fa fa-share"})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"icon"},[n("i",{staticClass:"fa fa-plug"})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"icon"},[n("i",{staticClass:"fa fa-plug"})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"icon"},[n("i",{staticClass:"fa fa-plug"})])}],s=(n("4de4"),n("caad"),n("b0c0"),n("b64b"),n("2532"),n("f3f3")),r=n("54f8"),o=n("2f62"),l=n("bd89"),u=n.n(l),c=n("17e9"),d=n.n(c),g=n("6d79"),h=n("f3d2"),f=n("0162"),p={mixins:[g["a"],h["a"],f["a"]],name:"SideNav",props:{method:{default:"",type:String},showSideNav:{default:!1,type:Boolean}},components:{},data:function(){return{PLUGIN_CONTAINER_ROUTE:"pluginContainer",STANDARD_NAV_CATEGORIES:["Competencies & Frameworks","Taxonomy","Configuration"],casslogo:u.a,casslogoSquare:d.a,pluginLinkMap:{},addFrameworkOrDirectory:!1,addNewDirectory:!1,directoryName:""}},methods:{handleClickoutsidePopup:function(){this.addFrameworkOrDirectory&&(this.addFrameworkOrDirectory=!1,this.addNewDirectory=!1)},setLaunchPluginValues:function(t){this.$store.commit("app/pluginToLaunch",t),this.$store.commit("app/pluginToLaunchLastUpdate",Date.now()),this.$router.currentRoute.name.equals(this.PLUGIN_CONTAINER_ROUTE)||this.$router.push({path:"/pluginContainer"})},buildPluginLinkMap:function(){this.pluginLinkMap={};for(var t=Object.keys(this.pluginManifestData),e=0,n=t;e<n.length;e++){var a=n[e],i=this.pluginManifestData[a];if(i.shortcuts&&i.shortcuts.length>0){var s,o=Object(r["a"])(i.shortcuts);try{for(o.s();!(s=o.n()).done;){var l=s.value;l.launchLocation.toLowerCase().equals("main")&&(this.pluginLinkMap[l.launchCategory]||(this.pluginLinkMap[l.launchCategory]=[]),this.pluginLinkMap[l.launchCategory].push(l))}}catch(u){o.e(u)}finally{o.f()}}}},buildPluginListComplete:function(){var t=this.getEnabledPluginUrlList();t&&t.length>0?this.loadManifestDataForPluginUrlList(t,this.buildPluginLinkMap):this.pluginLinkMap={}},addNewlinesToId:function(t){t=t.substring(0,26)+"\n"+t.substring(26);var e=t.length,n=27;while(n+64<e)t=t.substring(0,n+64)+"\n"+t.substring(n+64),n+=65,e++;return t=t.substring(0,e-24)+"\n"+t.substring(e-24),t},selectDirectory:function(t){this.$store.commit("app/selectDirectory",t),this.$store.commit("app/rightAsideObject",t),"directory"!==this.$router.currentRoute.name&&this.$router.push({name:"directory"})},saveDirectory:function(){var t=this,e=new EcDirectory;e.name=this.directoryName,e.generateId(window.repo.selectedServer),EcIdentityManager.default.ids.length>0&&e.addOwner(EcIdentityManager.default.ids[0].ppk.toPk()),e["schema:dateCreated"]=(new Date).toISOString(),e["schema:dateModified"]=(new Date).toISOString(),e.save((function(n){appLog("Directory saved: "+e.id),t.directoryName="",t.$store.dispatch("app/refreshDirectories"),t.selectDirectory(e)}),appError,window.repo)},shareAssertions:function(){this.$store.commit("app/showModal",{component:"ShareAssertions"})}},watch:{pluginLastUpdate:function(){this.buildPluginList(this.buildPluginListComplete)}},computed:Object(s["a"])(Object(s["a"])({},Object(o["c"])({crosswalkEnabled:function(t){return t.featuresEnabled.crosswalkEnabled},userManagementEnabled:function(t){return t.featuresEnabled.userManagementEnabled},configurationsEnabled:function(t){return t.featuresEnabled.configurationsEnabled},pluginsEnabled:function(t){return t.featuresEnabled.pluginsEnabled},loginEnabled:function(t){return t.featuresEnabled.loginEnabled},queryParams:function(t){return t.editor.queryParams},pluginLastUpdate:function(t){return t.app.pluginLastUpdate},directoryList:function(t){return t.app.directories.directoryList}})),{},{queryParams:function(){return this.$store.getters["editor/queryParams"]},isLoggedOn:function(){return!(!this.loggedOnPerson||!this.loggedOnPerson.name)},displayName:function(){return this.isLoggedOn?this.loggedOnPerson.name:"No user"},currentRoute:function(){return this.$route.path},supportedFiles:function(){return!0===this.$store.getters["editor/conceptMode"]?this.supportedConceptFileTypes:this.supportedFileTypes},loggedOnPerson:function(){return this.$store.getters["user/loggedOnPerson"]},getNonStandardNavCategoriesFromPlugins:function(){for(var t=[],e=Object.keys(this.pluginLinkMap),n=0,a=e;n<a.length;n++){var i=a[n];this.STANDARD_NAV_CATEGORIES.includes(i)||t.push(i)}return t.sort(),t},myTopLevelDirectories:function(){return this.directoryList.filter((function(t){return!t.parentDirectory}))},showFrameworks:function(){return!this.queryParams||"true"!==this.queryParams.ceasnDataFields||"true"!==this.queryParams.concepts},showConcepts:function(){return!this.queryParams||"true"!==this.queryParams.ceasnDataFields||"true"===this.queryParams.concepts}}),mounted:function(){this.buildPluginList(this.buildPluginListComplete),this.$store.dispatch("app/refreshDirectories")}},m=p,v=(n("fa42"),n("2877")),P=Object(v["a"])(m,a,i,!1,null,null,null);e["default"]=P.exports},bd89:function(t,e,n){t.exports=n.p+"img/cass-logo-white.eb44ee72.svg"},f3d2:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));n("b0c0"),n("d3b7"),n("ddb0");var a={name:"cassApi",data:function(){return{USER_PROFILE_SERVICE:"user/profile",USER_CREATE_SERVICE:"user",USER_LOGIN_SERVICE:"login",USER_LOGOUT_SERVICE:"logout",LOGOUT_REDIRECT_URL:window.location.origin+"/cass-editor/#/login"}},methods:{parseCredentialsFromProfileResponse:function(t){var e=JSON.parse(t.responseText),n={};return n.username=e["preferred_username"],n.password=e["cass_password"],e["email"]?n.email=e["email"]:n.email="n/a",e["name"]?n.name=e["name"]:e["given_name"]&&e["family_name"]?n.name=e["given_name"]+" "+e["family_name"]:n.name=e["preferred_username"],n},performCreateUser:function(t,e){var n=new XMLHttpRequest;n.addEventListener("load",(function(t){return e(t.currentTarget)})),n.withCredentials=!0;var a=this.cassApiLocation+this.USER_CREATE_SERVICE;n.open("POST",a),n.setRequestHeader("Content-Type","application/json;charset=UTF-8"),n.send(JSON.stringify({username:t.username,password:t.password,email:t.email,firstName:t.firstName,lastName:t.lastName}))},getUserProfile:function(t){var e=new XMLHttpRequest;e.addEventListener("load",(function(e){return t(e.currentTarget)})),e.withCredentials=!0;var n=this.cassApiLocation+this.USER_PROFILE_SERVICE;e.open("GET",n),e.send()},redirectToExternalLogin:function(){appLog("Redirecting to external login..."),window.location=this.repositorySsoOptions.ssoLogin+"?redirectUrl="+encodeURIComponent(window.location)},redirectToExternalLogout:function(){appLog("Redirecting to external logout..."),window.location=this.repositorySsoOptions.ssoLogout+"?redirectUrl="+encodeURIComponent(window.location)},goToLogin:function(){this.apiLoginEnabled?this.$router.push({path:"/login"}):this.$router.push({path:"/legacyLogin"})},checkExternalLogoutStatus:function(t){200!==t.status&&appLog("Logout fired but returned an unexpected response code: "+t.status),this.goToLogin()},performExternalLogout:function(){var t=this;appLog("Performing external logout...");var e=new XMLHttpRequest;e.addEventListener("load",(function(e){return t.checkExternalLogoutStatus(e.currentTarget)})),e.withCredentials=!0;var n=this.cassApiLocation+this.USER_LOGOUT_SERVICE;e.open("GET",n),e.send()},performApplicationLogout:function(){appLog("Performing application logout..."),EcIdentityManager.default.clearContacts(),EcIdentityManager.default.clearIdentities();var t={};this.$store.commit("user/loggedOnPerson",t),this.$store.commit("app/showModal",{component:"LogoutSuccess"})},performApplicationLogin:function(){appLog("Performing application login..."),EcIdentityManager.default.clearContacts(),EcIdentityManager.default.clearIdentities();var t={};this.$store.commit("user/loggedOnPerson",t),this.apiLoginEnabled?this.redirectToExternalLogin():this.goToLogin()},addQueryParams:function(){var t=this.$store.getters["editor/queryParams"],e=EcObject.keys(t);if(t&&e.length){var n="?";for(var a in e){0!==a&&(n+="&");var i=e[a],s=t[i];if(EcArray.isArray(s))for(var r in s)0!==r&&(n+="&"),n+=i+"="+s[r];else n+=i+"="+s}return n}return""}},computed:{cassApiLocation:function(){return this.$store.getters["environment/cassApiLocation"]},repositorySsoOptions:function(){return this.$store.getters["user/repositorySsoOptions"]},apiLoginEnabled:function(){return this.$store.getters["featuresEnabled/apiLoginEnabled"]}}}},fa42:function(t,e,n){"use strict";var a=n("1322"),i=n.n(a);i.a}}]);
//# sourceMappingURL=sidenav.2159ec0c.js.map