(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pluginContainer"],{7717:function(e,a,n){"use strict";var t=n("b5d2"),i=n.n(t);i.a},b5d2:function(e,a,n){},bd3b:function(e,a,n){"use strict";n.r(a);var t=function(){var e=this,a=e.$createElement,n=e._self._c||a;return n("div",{class:[{"modal-card":"dynamic-modal"===e.view},{section:"dynamic-modal"!==e.view}]},[n("section",{class:[{container:"dynamic-modal"!==e.view},{"modal-card-body":"dynamic-modal"===e.view}]},[n("div",{staticClass:"section"},[[n("h3",{staticClass:"title"},[n("i",{staticClass:"fa fa-plug"}),e._v(" "+e._s(e.pluginName)+" ")])]],2),n("div",{staticClass:"modal",class:[{"is-active":e.pluginBusy}]},[n("div",{staticClass:"modal-background"}),e._m(0)]),n("div",{class:[{"is-active":!e.pluginBusy}]},[n("iframe",{attrs:{id:"pluginFrame",src:e.iFrameSource},on:{load:e.handlePluginFrameLoaded}})])])])},i=[function(){var e=this,a=e.$createElement,n=e._self._c||a;return n("div",{staticClass:"modal-content has-text-centered"},[n("span",{staticClass:"icon is-large has-text-center has-text-link"},[n("i",{staticClass:"fas fa-2x fa-spinner is-info fa-pulse"})])])}],s=(n("b0c0"),n("2ca0"),n("b85c")),r={props:{view:{default:"",type:String}},name:"PluginContainer",components:{},data:function(){return{WAITING_MESSAGE:"waiting",INIT_IDENTITY_ACTION:"initIdentity",pluginName:"",iFrameSource:"",pluginBusy:!0}},methods:{getQueryParameterValue:function(e){return e.equalsIgnoreCase(":origin")?window.location.origin:null},getQueryStringForParameter:function(e){if(e.name&&e.value){var a=null;return a=e.value.startsWith(":")?this.getQueryParameterValue(e.value):e.value,a?e.name+"="+a:null}return null},buildQueryParameterString:function(e){var a="";if(e&&e.length>0){var n,t=0,i=Object(s["a"])(e);try{for(i.s();!(n=i.n()).done;){var r=n.value,u=this.getQueryStringForParameter(r);u&&(a.equals("")&&(a+="?"),t>0&&(a+="&"),a+=u),t++}}catch(l){i.e(l)}finally{i.f()}}return a},setIFrameSource:function(){this.pluginToLaunch?(this.pluginBusy=!0,this.pluginName=this.pluginToLaunch.launchName,this.iFrameSource=this.pluginToLaunch.launchUrl+this.buildQueryParameterString(this.pluginToLaunch.queryParams)):appLog("Cannot determine launch plugin")},sendIdentityToPlugin:function(e){appLog('Sending "'+this.INIT_IDENTITY_ACTION+'" message to plugin');var a={action:this.INIT_IDENTITY_ACTION,serverParm:window.repo.selectedServer,nameParm:EcIdentityManager.ids[0].displayName,pemParm:EcIdentityManager.ids[0].ppk.toPem()};document.getElementsByTagName("iframe")[0].contentWindow.postMessage(JSON.stringify(a),e)},handlePluginFrameMessage:function(e){e&&e.data&&e.data.message&&e.data.message.equals(this.WAITING_MESSAGE)&&this.sendIdentityToPlugin(e.origin)},handlePluginFrameLoaded:function(){this.pluginBusy=!1,window.addEventListener("message",this.handlePluginFrameMessage)}},computed:{pluginToLaunch:function(){return this.$store.getters["app/pluginToLaunch"]},pluginToLaunchLastUpdate:function(){return this.$store.getters["app/pluginToLaunchLastUpdate"]}},watch:{pluginToLaunchLastUpdate:function(){this.setIFrameSource()}},mounted:function(){this.setIFrameSource()},beforeDestroy:function(){window.removeEventListener("message",this.handlePluginFrameMessage)}},u=r,l=(n("7717"),n("2877")),o=Object(l["a"])(u,t,i,!1,null,null,null);a["default"]=o.exports}}]);
//# sourceMappingURL=pluginContainer.6633d255.js.map