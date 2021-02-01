(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["login"],{dddf:function(e,t,a){},ede4:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"section is-large",attrs:{id:"login"}},[a("div",{staticClass:"modal",class:[{"is-active":e.loginBusy}]},[a("div",{staticClass:"modal-background"}),e._m(0)]),e.loginBusy?e._e():a("div",{staticClass:"modal is-active"},[a("div",{staticClass:"modal-card"},[e.loginBusy?e._e():a("header",{staticClass:"modal-card-head has-text-centered has-background-primary"},[e.amJustLoggingIn?a("h3",{staticClass:"modal-card-title is-size-2 has-text-centered has-text-white"},[e._v(" Login to CaSS Authoring Tool ")]):e._e(),e.amCreatingAccount?a("h3",{staticClass:"modal-card-title is-size-2 has-text-centered has-text-white"},[e._v(" Create CaSS Authoring Tool User ")]):e._e(),e.amCreatingLinkedPerson?a("h4",{staticClass:"title is-size-2 has-text-centered has-text-white"},[e._v(" Link User Information ")]):e._e()]),a("section",{staticClass:"modal-card-body"},[e.amCreatingAccount||e.amCreatingLinkedPerson?a("div",{staticClass:"section"},[e.amCreatingLinkedPerson?a("p",[e._v(" No matching user record could be found that matched your login information. Please provide the following: ")]):e._e()]):e._e(),e.amJustLoggingIn?a("div",{staticClass:"section"},[a("div",{staticClass:"field"},[a("div",{staticClass:"control"},[a("label",{staticClass:"label"},[e._v("Username")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],staticClass:"input",attrs:{type:"text",placeholder:"username"},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value)}}})])]),a("div",{staticClass:"field"},[a("div",{staticClass:"control"},[a("label",{staticClass:"label"},[e._v("Password")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"input",attrs:{type:"password",placeholder:"password"},domProps:{value:e.password},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.attemptCassLogin(t)},input:function(t){t.target.composing||(e.password=t.target.value)}}})])])]):e._e(),a("div",{staticClass:"section"},[e.amCreatingAccount||e.amCreatingLinkedPerson?a("div",{staticClass:"field"},[a("div",{staticClass:"control"},[a("label",{staticClass:"label"},[e._v("name")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.createLinkPersonName,expression:"createLinkPersonName"}],staticClass:"input",attrs:{type:"text "},domProps:{value:e.createLinkPersonName},on:{input:function(t){t.target.composing||(e.createLinkPersonName=t.target.value)}}})])]):e._e(),e.amCreatingAccount||e.amCreatingLinkedPerson?a("div",{staticClass:"field"},[a("div",{staticClass:"control"},[a("label",{staticClass:"label"},[e._v("email")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.createLinkPersonEmail,expression:"createLinkPersonEmail"}],staticClass:"input",attrs:{type:"text "},domProps:{value:e.createLinkPersonEmail},on:{input:function(t){t.target.composing||(e.createLinkPersonEmail=t.target.value)}}})])]):e._e(),e.amCreatingAccount?a("div",{staticClass:"field"},[a("div",{staticClass:"control"},[a("label",{staticClass:"label"},[e._v("username")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.createAccountUsername,expression:"createAccountUsername"}],staticClass:"input",attrs:{type:"text"},domProps:{value:e.createAccountUsername},on:{input:function(t){t.target.composing||(e.createAccountUsername=t.target.value)}}})])]):e._e(),e.amCreatingAccount?a("div",{staticClass:"field is-grouped"},[a("div",{staticClass:"control is-expanded"},[a("label",{staticClass:"label"},[e._v("password")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.createAccountPassword,expression:"createAccountPassword"}],staticClass:"input",attrs:{type:"password"},domProps:{value:e.createAccountPassword},on:{input:function(t){t.target.composing||(e.createAccountPassword=t.target.value)}}})]),a("div",{staticClass:"control is-expanded"},[a("label",{staticClass:"label"},[e._v("Confirm password")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.createAccountPasswordRetype,expression:"createAccountPasswordRetype"}],staticClass:"input",attrs:{type:"password"},domProps:{value:e.createAccountPasswordRetype},on:{input:function(t){t.target.composing||(e.createAccountPasswordRetype=t.target.value)}}})])]):e._e()]),e.createAccountOrLinkPersonDataInvalid?a("div",{staticClass:"field has-text-danger"},[a("div",{staticClass:"label has-text-danger"},[e._v(" Please correct the following errors: ")]),e.createAccountUsernameInvalid?a("div",{staticClass:"is-size-6"},[e._v(" Username is required ")]):e._e(),e.createAccountPasswordInvalid?a("div",{staticClass:"is-size-6"},[e._v(" Password is required ")]):e._e(),e.createAccountPasswordMismatch?a("div",{staticClass:"is-size-6"},[e._v(" Passwords do not match ")]):e._e(),e.createLinkPersonNameInvalid?a("div",{staticClass:"is-size-6"},[e._v(" Name is required ")]):e._e(),e.createLinkPersonEmailInvalid?a("div",{staticClass:"is-size-6"},[e._v(" Valid email is required ")]):e._e(),e.createLinkPersonEmailExists?a("div",{staticClass:"is-size-6"},[e._v(" That email is already in use ")]):e._e(),e.createAccountUsernameUnavailable?a("div",{staticClass:"is-size-6"},[e._v(" That username is unavailable ")]):e._e()]):e._e(),e.identityFetchFailed||e.configRetrieveFailed||e.loginParamsInvalid?a("div",{staticClass:"section"},[e.identityFetchFailed?a("div",[a("p",[a("b",[e._v("Login failed: "+e._s(e.identityFailMsg))])])]):e._e(),e.configRetrieveFailed?a("div",[a("p",[a("b",[e._v("Could not retrieve configuration from selected server: "+e._s(e.configFailMsg))])])]):e._e(),e.loginParamsInvalid?a("div",[e._m(1)]):e._e()]):e._e()]),a("footer",{staticClass:"modal-card-foot has-background-white"},[a("div",{staticClass:"buttons is-spaced"},[e.amCreatingLinkedPerson||e.amCreatingAccount?a("div",{staticClass:"button is-dark is-outlined",on:{click:function(t){return e.setDataToBaseLogin(!0)}}},[e._m(2),a("span",[e._v("cancel")])]):e._e(),e.amJustLoggingIn?[a("div",{staticClass:"button is-outlined is-dark",on:{click:e.showCreateAccount}},[e._m(3),a("span",[e._v("create account")])]),a("div",{staticClass:"button is-outlined is-primary",on:{click:e.attemptCassLogin}},[e._m(4),a("span",[e._v("login")])])]:e._e(),e.amCreatingAccount?a("div",{staticClass:"button is-expanded is-primary is-outlined",on:{click:e.createNewAccount}},[e._m(5),a("span",[e._v("create")])]):e._e(),e.amCreatingLinkedPerson?a("div",{staticClass:"button is-success is-outlined",on:{click:e.linkPerson}},[e._m(6),a("span",[e._v("update")])]):e._e()],2)])])])])},n=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"modal-content has-text-centered"},[a("span",{staticClass:"icon is-large has-text-center has-text-link"},[a("i",{staticClass:"fas fa-2x fa-spinner is-info fa-pulse"})])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[a("b",[e._v("Login failed: Invalid Username/Password")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("span",{staticClass:"icon"},[a("i",{staticClass:"fa fa-times"})])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("span",{staticClass:"icon"},[a("i",{staticClass:"fa fa-plus"})])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("span",{staticClass:"icon"},[a("i",{staticClass:"fa fa-sign-in-alt"})])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("span",{staticClass:"icon"},[a("i",{staticClass:"fa fa-sign-in-alt"})])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("span",{staticClass:"icon"},[a("i",{staticClass:"fa fa-sign-in-alt"})])}],s=(a("b0c0"),a("ac1f"),a("841c"),a("498a"),a("b85c")),r={name:"Login",data:function(){return{GROUP_SEARCH_SIZE:1e4,PERSON_SEARCH_SIZE:1e4,username:"",password:"",createAccountUsername:"",createAccountPassword:"",createAccountPasswordRetype:"",createLinkPersonName:"",createLinkPersonEmail:"",loginParamsInvalid:!1,identityFetchFailed:!1,configRetrieveFailed:!1,loginBusy:!1,ecRemoteIdentMgr:{},configFailMsg:"",identityFailMsg:"",amJustLoggingIn:!0,amCreatingAccount:!1,amCreatingLinkedPerson:!1,createAccountOrLinkPersonDataInvalid:!1,createAccountUsernameInvalid:!1,createAccountPasswordInvalid:!1,createAccountPasswordMismatch:!1,createLinkPersonNameInvalid:!1,createLinkPersonEmailInvalid:!1,createLinkPersonEmailExists:!1,createAccountUsernameUnavailable:!1,identityToLinkToPerson:{},linkedPerson:{}}},methods:{goToAppHome:function(){this.loginBusy=!1,this.$router.push({path:"/frameworks"})},addGroupIdentity:function(e){try{var t=e.getOrgKeys();appLog("Adding group identities: ("+e.shortId()+") - "+e.getName()+" - ("+t.length+") keys");for(var a=0;a<t.length;a++){var i=t[a],n=new EcIdentity;n.displayName=e.getName()+" - key["+a+"]",n.ppk=i,EcIdentityManager.addIdentityQuietly(n)}}catch(s){}},searchRepositoryForGroupsSuccess:function(e){var t=this.linkedPerson.shortId();if(e&&e.length>0){var a,i=Object(s["a"])(e);try{for(i.s();!(a=i.n()).done;){var n=a.value;if(n.employee&&n.employee.length>0){var r,o=Object(s["a"])(n.employee);try{for(o.s();!(r=o.n()).done;){var c=r.value;if(c.equals(t)){this.addGroupIdentity(n);break}}}catch(l){o.e(l)}finally{o.f()}}}}catch(l){i.e(l)}finally{i.f()}}},searchRepositoryForGroupsFailure:function(e){appLog("Group search failure: "+e),this.goToAppHome()},addGroupIdentities:function(){appLog(" Adding group identities...");var e={};e.size=this.GROUP_SEARCH_SIZE,EcOrganization.search(window.repo,"",this.searchRepositoryForGroupsSuccess,this.searchRepositoryForGroupsFailure,e),this.goToAppHome()},setDataToBaseLogin:function(e){this.username="",this.password="",this.createAccountUsername="",this.createAccountPassword="",this.createAccountPasswordRetype="",this.createLinkPersonName="",this.createLinkPersonEmail="",this.loginParamsInvalid=!1,this.identityFetchFailed=!1,this.configRetrieveFailed=!1,this.configFailMsg="",this.identityFailMsg="",this.amCreatingAccount=!1,this.amCreatingLinkedPerson=!1,this.createAccountOrLinkPersonDataInvalid=!1,this.createAccountUsernameInvalid=!1,this.createAccountPasswordInvalid=!1,this.createAccountPasswordMismatch=!1,this.createLinkPersonNameInvalid=!1,this.createLinkPersonEmailInvalid=!1,this.createLinkPersonEmailExists=!1,this.createAccountUsernameUnavailable=!1,e&&(this.ecRemoteIdentMgr={},EcIdentityManager.clearContacts(),EcIdentityManager.clearIdentities(),this.identityToLinkToPerson={},this.linkedPerson={}),this.amJustLoggingIn=!0,this.loginBusy=!1},showCreateAccount:function(){this.setDataToBaseLogin(!0),this.amJustLoggingIn=!1,this.amCreatingAccount=!0},showCreateLinkedPerson:function(){this.setDataToBaseLogin(!1),this.amJustLoggingIn=!1,this.amCreatingLinkedPerson=!0},setAllNewAccountValidationsChecksToValid:function(){this.createAccountOrLinkPersonDataInvalid=!1,this.createAccountUsernameInvalid=!1,this.createAccountPasswordInvalid=!1,this.createAccountPasswordMismatch=!1,this.createLinkPersonNameInvalid=!1,this.createLinkPersonEmailInvalid=!1,this.createLinkPersonEmailExists=!1,this.createAccountUsernameUnavailable=!1},isValidEmail:function(e){var t=/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gim;return!!t.test(e)},validateNewAccountData:function(){this.createAccountUsername&&!this.createAccountUsername.trim().equals("")||(this.createAccountOrLinkPersonDataInvalid=!0,this.createAccountUsernameInvalid=!0),!this.createAccountPassword||this.createAccountPassword.trim().equals("")||!this.createAccountPasswordRetype||this.createAccountPasswordRetype.trim().equals("")?(this.createAccountOrLinkPersonDataInvalid=!0,this.createAccountPasswordInvalid=!0):this.createAccountPassword.equals(this.createAccountPasswordRetype)||(this.createAccountOrLinkPersonDataInvalid=!0,this.createAccountPasswordMismatch=!0),this.validateLinkPersonData()},handleCreatePersonSuccess:function(){appLog("Person created."),this.amCreatingAccount?this.goToAppHome():this.addGroupIdentities()},createPersonObjectToLinkToIdentity:function(){appLog("Creating person object for identity...");var e=new Person;e.assignId(window.repo.selectedServer,this.identityToLinkToPerson.ppk.toPk().fingerprint()),e.addOwner(this.identityToLinkToPerson.ppk.toPk()),e.name=this.createLinkPersonName,e.email=this.createLinkPersonEmail,appLog(e),this.$store.commit("user/loggedOnPerson",e),this.linkedPerson=e,EcRepository.save(e,this.handleCreatePersonSuccess,this.handleAttemptLoginFetchIdentityFailure)},handleCreateAccountFetchIdentitySuccess:function(){appLog("Creating new account identity object...");var e=new EcIdentity;e.displayName=this.createLinkPersonName,e.ppk=EcPpk.generateKey(),EcIdentityManager.addIdentity(e),EcIdentityManager.saveContacts(),EcIdentityManager.saveIdentities(),this.identityToLinkToPerson=e,this.ecRemoteIdentMgr.commit(this.createPersonObjectToLinkToIdentity,this.handleAttemptLoginFetchIdentityFailure)},handleCreateAccountRemoteIdentityMgrCreateSuccess:function(){appLog("Creating new account manager fetch..."),this.ecRemoteIdentMgr.fetch(this.handleCreateAccountFetchIdentitySuccess,this.handleAttemptLoginFetchIdentityFailure)},handleCreateAccountConfigureFromServerSuccess:function(e){appLog("EcRemoteIdentityManager creating..."),appLog("Creating new account login..."),this.ecRemoteIdentMgr.startLogin(this.createAccountUsername,this.createAccountPassword),this.ecRemoteIdentMgr.create(this.handleCreateAccountRemoteIdentityMgrCreateSuccess,this.handleAttemptLoginFetchIdentityFailure)},createNewAccountIdentityAndPerson:function(){appLog("Creating new account..."),appLog("EcRemoteIdentityManager Configuring from server..."),this.ecRemoteIdentMgr=new EcRemoteIdentityManager,this.ecRemoteIdentMgr.server=window.repo.selectedServer,this.ecRemoteIdentMgr.configureFromServer(this.handleCreateAccountConfigureFromServerSuccess,this.handleAttemptLoginConfigureFromServerFail)},handleCheckUsernameFetchIdentitySuccess:function(e){appLog("handleCheckUsernameFetchIdentitySuccess !!!!"),this.createAccountOrLinkPersonDataInvalid=!0,this.createAccountUsernameUnavailable=!0,this.loginBusy=!1,EcIdentityManager.clearIdentities(),EcIdentityManager.clearContacts()},handleCheckUsernameFetchIdentityFailure:function(e){appLog("handleCheckUsernameFetchIdentityFailure: "+e),e&&e.toLowerCase().trim().equals("user does not exist.")?this.createNewAccountIdentityAndPerson():(this.createAccountOrLinkPersonDataInvalid=!0,this.createAccountUsernameUnavailable=!0,this.loginBusy=!1,EcIdentityManager.clearIdentities(),EcIdentityManager.clearContacts())},handleCheckUsernameConfigureFromServerSuccess:function(e){appLog("Fetching identity for username check..."),this.ecRemoteIdentMgr.startLogin(this.createAccountUsername,this.createAccountPassword),this.ecRemoteIdentMgr.fetch(this.handleCheckUsernameFetchIdentitySuccess,this.handleCheckUsernameFetchIdentityFailure)},handleCheckUsernameConfigureFromServerFail:function(e){this.loginBusy=!1,appLog("New account configure from server for username check failure: "+msg)},checkForExistingUsername:function(){appLog("Check if new account username already exists"),this.ecRemoteIdentMgr=new EcRemoteIdentityManager,this.ecRemoteIdentMgr.server=window.repo.selectedServer,this.ecRemoteIdentMgr.configureFromServer(this.handleCheckUsernameConfigureFromServerSuccess,this.handleCheckUsernameConfigureFromServerFail)},searchPersonsForNewAccountSuccess:function(e){appLog("New account person search success: "),appLog(e);var t,a=!1,i=Object(s["a"])(e);try{for(i.s();!(t=i.n()).done;){var n=t.value,r=new EcPerson;if(r.copyFrom(n),this.createLinkPersonEmail.equalsIgnoreCase(r.email)){a=!0;break}}}catch(o){i.e(o)}finally{i.f()}a?(this.createAccountOrLinkPersonDataInvalid=!0,this.createLinkPersonEmailExists=!0,this.loginBusy=!1):this.checkForExistingUsername()},searchPersonsForNewAccountFailure:function(e){this.checkForExistingUsername()},verifyEmailAddressForNewAccountAndGo:function(){this.loginBusy=!0;var e={};e.size=this.PERSON_SEARCH_SIZE,window.repo.searchWithParams('@type:Person AND email:"'+this.createLinkPersonEmail+'"',e,null,this.searchPersonsForNewAccountSuccess,this.searchPersonsForNewAccountFailure)},createNewAccount:function(){this.setAllNewAccountValidationsChecksToValid(),this.validateNewAccountData(),this.createAccountOrLinkPersonDataInvalid||this.verifyEmailAddressForNewAccountAndGo()},validateLinkPersonData:function(){this.createLinkPersonName&&!this.createLinkPersonName.trim().equals("")||(this.createAccountOrLinkPersonDataInvalid=!0,this.createLinkPersonNameInvalid=!0),this.createLinkPersonEmail&&!this.createLinkPersonEmail.trim().equals("")&&this.isValidEmail(this.createLinkPersonEmail)||(this.createAccountOrLinkPersonDataInvalid=!0,this.createLinkPersonEmailInvalid=!0)},searchPersonsForLinkPersonSuccess:function(e){this.loginBusy=!0;var t,a=!1,i=Object(s["a"])(e);try{for(i.s();!(t=i.n()).done;){var n=t.value,r=new EcPerson;if(r.copyFrom(n),this.createLinkPersonEmail.equalsIgnoreCase(r.email)){a=!0;break}}}catch(o){i.e(o)}finally{i.f()}a?(this.createAccountOrLinkPersonDataInvalid=!0,this.createLinkPersonEmailExists=!0,this.loginBusy=!1):this.createPersonObjectToLinkToIdentity()},verifyEmailAddressForLinkPersonAndGo:function(){appLog("Validating link person email...");var e={};e.size=this.PERSON_SEARCH_SIZE,window.repo.searchWithParams('@type:Person AND email:"'+this.createLinkPersonEmail+'"',e,null,this.searchPersonsForLinkPersonSuccess,this.searchPersonsForNewAccountFailure)},linkPerson:function(){this.setAllNewAccountValidationsChecksToValid(),this.validateLinkPersonData(),this.createAccountOrLinkPersonDataInvalid||this.verifyEmailAddressForLinkPersonAndGo()},areLoginParamsValid:function(){return null!=this.username&&0!==this.username.length&&null!=this.password&&0!==this.password.length||(this.loginParamsInvalid=!0,!1)},findLinkedPersonPersonSearchSuccess:function(e){appLog("Linked person person search success: "),appLog(e),this.identityToLinkToPerson=EcIdentityManager.ids[0];var t,a=!1,i=Object(s["a"])(e);try{for(i.s();!(t=i.n()).done;){var n=t.value,r=new EcPerson;r.copyFrom(n),r.getGuid().equals(this.identityToLinkToPerson.ppk.toPk().fingerprint())&&(a=!0,this.$store.commit("user/loggedOnPerson",r),this.linkedPerson=r,appLog("Matching person record found: "),appLog(r),EcIdentityManager.saveContacts(),EcIdentityManager.saveIdentities())}}catch(o){i.e(o)}finally{i.f()}a?this.addGroupIdentities():(appLog("Matching person record NOT found"),this.showCreateLinkedPerson())},findLinkedPersonPersonSearchFailure:function(e){this.loginBusy=!1,appLog("Linked person person search failure: "+e)},findLinkedPersonForIdentity:function(){appLog("Finding linked person for identity...");var e=EcIdentityManager.ids[0].ppk.toPk().fingerprint(),t={};t.size=this.PERSON_SEARCH_SIZE,window.repo.searchWithParams('@type:Person AND @id:"'+e+'"',t,null,this.findLinkedPersonPersonSearchSuccess,this.findLinkedPersonPersonSearchFailure)},handleAttemptLoginFetchIdentitySuccess:function(e){!EcIdentityManager.ids||EcIdentityManager.ids.length<=0?this.handleAttemptLoginFetchIdentityFailure("Login credentials valid but no identity could be found."):this.findLinkedPersonForIdentity()},handleAttemptLoginFetchIdentityFailure:function(e){this.identityFailMsg=e,this.identityFetchFailed=!0,this.loginBusy=!1},handleAttemptLoginConfigureFromServerSuccess:function(e){appLog("Fetching identity..."),this.ecRemoteIdentMgr.startLogin(this.username,this.password),this.ecRemoteIdentMgr.fetch(this.handleAttemptLoginFetchIdentitySuccess,this.handleAttemptLoginFetchIdentityFailure)},handleAttemptLoginConfigureFromServerFail:function(e){this.configFailMsg=e,this.configRetrieveFailed=!0,this.loginBusy=!1},attemptCassLogin:function(){this.loginParamsInvalid=!1,this.identityFetchFailed=!1,this.configRetrieveFailed=!1,this.areLoginParamsValid()&&(appLog("Attempting CaSS login...."),this.loginBusy=!0,EcIdentityManager.clearContacts(),EcIdentityManager.clearIdentities(),this.ecRemoteIdentMgr=new EcRemoteIdentityManager,this.ecRemoteIdentMgr.server=window.repo.selectedServer,this.ecRemoteIdentMgr.configureFromServer(this.handleAttemptLoginConfigureFromServerSuccess,this.handleAttemptLoginConfigureFromServerFail))}},mounted:function(){this.setDataToBaseLogin(!0)}},o=r,c=(a("f34a"),a("2877")),l=Object(c["a"])(o,i,n,!1,null,"80885736",null);t["default"]=l.exports},f34a:function(e,t,a){"use strict";var i=a("dddf"),n=a.n(i);n.a}}]);
//# sourceMappingURL=login.4e553f56.js.map