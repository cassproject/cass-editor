(window.webpackJsonp=window.webpackJsonp||[]).push([[66],{461:function(t,e,s){"use strict";s.r(e);var a=s(55),n=Object(a.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"repositories"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#repositories"}},[t._v("#")]),t._v(" Repositories")]),t._v(" "),s("p",[t._v("CASS Repositories are servers running a "),s("strong",[t._v("JSON-LD")]),t._v(" object store called "),s("strong",[t._v("SkyRepo")]),t._v(". CASS Repositories may also have extensions called "),s("strong",[t._v("Adapters")]),t._v(" that allow the repository to interoperate with other systems, standards, or APIs.")]),t._v(" "),s("h2",{attrs:{id:"background"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#background"}},[t._v("#")]),t._v(" Background")]),t._v(" "),s("p",[t._v("CASS Repositories are a federated solution to the problem of permissible open data management. As learners across the globe are covered by a large number of variable privacy laws, repositories for this data are needed that can protect against or enable discovery of learner data, depending on the scenario and permissions.")]),t._v(" "),s("p",[t._v("CASS Repositories support "),s("strong",[t._v("RESTful CRUD")]),t._v(" + "),s("strong",[t._v("Search")]),t._v(". Through Adapters, a repository may also support APIs for individual applications; however, such an API is not presently available.")]),t._v(" "),s("p",[t._v("CASS Repositories support JSON-LD formatted objects. While an incredible number of formats exist, JSON-LD was chosen for its compatibility with nearly all languages, object typing, and RDF compliance.")]),t._v(" "),s("h2",{attrs:{id:"repository-api"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#repository-api"}},[t._v("#")]),t._v(" Repository API")]),t._v(" "),s("p",[t._v("The CASS Repository API can be found "),s("RouterLink",{attrs:{to:"/dev/fundamentals/cass-repo-api/"}},[t._v("here")]),t._v(".")],1),t._v(" "),s("h2",{attrs:{id:"permissioning"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#permissioning"}},[t._v("#")]),t._v(" Permissioning")]),t._v(" "),s("p",[t._v("CASS Repository permissioning is "),s("em",[t._v("NOT")]),t._v(" role based in the traditional sense. Server administrators only have the ability to delete records, and unauthorized tampering or creation of records is protected against by the verification of the record against cryptographic signatures.")]),t._v(" "),s("p",[t._v("By default, record data is public.  However, two security layers have been created to protect against unauthorized viewing:")]),t._v(" "),s("ol",[s("li",[t._v("Records are protected by client-side encryption, preventing the server administrator or a compromised server user from viewing the data.")]),t._v(" "),s("li",[t._v("Protected data is not returned by the server without authorization in the form of a signature sheet.")])]),t._v(" "),s("p",[t._v("CASS Repositories also support the protection of individual fields in a record. The repository scans for any object of type EncryptedValue and omits it from the response if the query did not contain a signature sheet authorization. See "),s("RouterLink",{attrs:{to:"/dev/fundamentals/identities-and-login/"}},[t._v("Identities and Login")]),t._v(" for further information.")],1),t._v(" "),s("h2",{attrs:{id:"code"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#code"}},[t._v("#")]),t._v(" Code")]),t._v(" "),s("p",[t._v("Creating an interface between your application and a repository is accomplished as follows:")]),t._v(" "),s("ol",[s("li",[t._v("Instantiate a Repository object and set up the endpoint."),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" repo "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("EcRepository")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nrepo"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("selectedServer "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://dev.cassproject.org/api/"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])]),t._v(" "),s("li",[t._v("The repository may also be asked to search for the endpoint. It will automatically search for the endpoint at the location provided and in other typical locations."),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("repo"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("selectedServer "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"http://dev.cassproject.org"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nrepo"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("autoDetectRepository")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])]),t._v(" "),s("h3",{attrs:{id:"binding-a-new-object-to-a-repository-endpoint"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#binding-a-new-object-to-a-repository-endpoint"}},[t._v("#")]),t._v(" Binding a new object to a repository endpoint")]),t._v(" "),s("p",[t._v("Every object’s identifier is the URL from which the object should be retrieved and should be stored (this is not always the case, see Aliases). This identifier may be assigned or generated.")]),t._v(" "),s("ol",[s("li",[t._v("Instantiate an object, and assign some properties."),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" t "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Thing")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nt"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Developer Guide Test Object"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])]),t._v(" "),s("li",[t._v("Create an identifier for the object by:\n"),s("ul",[s("li",[t._v("Generating it. This will create a random UUID (version 4)"),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("generateId")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("repo"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("selectedServer"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])]),t._v(" "),s("li",[t._v("Assigning it. Note that an ID must have one alpha or symbol character."),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("assignId")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("repo"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("selectedServer"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"MyId1"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])])]),t._v(" "),s("li",[t._v("You may then access two forms of the ID:\n"),s("ul",[s("li",[t._v("The "),s("strong",[t._v("Long Form")]),t._v(" includes the version number and should be used when you need to refer to an immutable version of the object that is not subject to subsequent updates."),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("id"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])]),t._v(" "),s("li",[t._v("The "),s("strong",[t._v("Short Form")]),t._v(" does not include the version number and retrieves the latest version."),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("shortId")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])])]),t._v(" "),s("li",[t._v("The ID, when subjected to an HTTP GET, should, if it has previously been saved, return the JSON-LD version of the object. (Note: This object has no owner. This means it can be modified or deleted by anyone.)"),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("EcRepository"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("save")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" window"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("open")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("id"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("log"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])])])}),[],!1,null,null,null);e.default=n.exports}}]);