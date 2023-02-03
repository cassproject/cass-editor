(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{444:function(t,e,a){"use strict";a.r(e);var s=a(55),n=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"basics"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#basics"}},[t._v("#")]),t._v(" Basics")]),t._v(" "),a("p",[t._v("Using the CASS Libraries, you are able to work with a number of different sets of objects, including those from CASS, Schema.org, and the Credential Engine. CASS objects have a number of additional helper methods that aren’t currently available on the objects from the other groups.")]),t._v(" "),a("p",[t._v("This guide assumes you have a "),a("RouterLink",{attrs:{to:"/dev/fundamentals/repositories/"}},[t._v("Repository")]),t._v(" defined and an "),a("RouterLink",{attrs:{to:"/dev/fundamentals/identities-and-login/"}},[t._v("Identity")]),t._v(".")],1),t._v(" "),a("h2",{attrs:{id:"overview"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[t._v("#")]),t._v(" Overview")]),t._v(" "),a("p",[t._v("In general, all CASS objects follow the same inheritance model.  From "),a("a",{attrs:{href:"http://cassproject.github.io/CASS/docs/classes/EcLinkedData.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("EcLinkedData"),a("OutboundLink")],1),t._v(", additional fields and functionality are aggregated through three additional classes ("),a("a",{attrs:{href:"http://cassproject.github.io/CASS/docs/classes/EcRemoteLinkedData.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("EcRemoteLinkedData"),a("OutboundLink")],1),t._v(", "),a("a",{attrs:{href:"http://cassproject.github.io/CASS/docs/classes/Thing.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Thing"),a("OutboundLink")],1),t._v(", and "),a("a",{attrs:{href:"http://cassproject.github.io/CASS/docs/classes/CreativeWork.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("CreativeWork"),a("OutboundLink")],1),t._v(") until a base object class is created.  The base object class defines all fields and operations available for working with the object itself.  Another class is then created from the base object class which defines helper methods and functionality for working with the CASS environment.  This is the final CASS object class and is prefixed with "),a("code",[t._v("EC")]),t._v(".")]),t._v(" "),a("p",[t._v("Example:")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("EcCompetency - (CASS object class) Methods for interacting with CASS services on a server\n    -> Competency - (base object class) All fields and methods needed to logically define a competency\n    -> CreativeWork - Customized schema.org/CreativeWork\n    -> Thing - Customized schema.org/Thing\n    -> EcRemoteLinkedData - Data wrapper to represent remotely hosted data including fields for permission controls, signing, identifying and locating the object\n    -> EcLinkedData - Represents a JSON-LD linked data object and performs serialization\n")])])]),a("p",[t._v("Most CASS objects include helper functions include helper methods for retrieving objects of that type (e.g. "),a("code",[t._v("EcCompetency.get()")]),t._v(").  However, when using the "),a("a",{attrs:{href:"http://cassproject.github.io/CASS/docs/classes/EcRepository.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("EcRepository"),a("OutboundLink")],1),t._v(" object to retrieve data (through "),a("code",[t._v(".get()")]),t._v(" and "),a("code",[t._v(".multiget()")]),t._v("), all objects are returned as "),a("code",[t._v("EcRemoteLinkedData")]),t._v(" types and must be cast into the proper CASS object.")]),t._v(" "),a("h2",{attrs:{id:"instantiation"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#instantiation"}},[t._v("#")]),t._v(" Instantiation")]),t._v(" "),a("p",[t._v("In this example, we will be creating and operating on a "),a("a",{attrs:{href:"http://schema.org/Person",target:"_blank",rel:"noopener noreferrer"}},[t._v("schema.org/Person"),a("OutboundLink")],1),t._v(" object.")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" p "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Person")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\np"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Frank Franklin"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\np"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("email "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"frank@franklyfrank.fr"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h2",{attrs:{id:"internal-objects-vs-remote-objects"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#internal-objects-vs-remote-objects"}},[t._v("#")]),t._v(" Internal objects vs Remote objects")]),t._v(" "),a("p",[t._v("An object without an Id can be thought of to be an ‘internal object’, used in intermediate calculations. To convert it to an remotely accessible object, it must be assigned a  URL.")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("p"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("generateId")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://dev.cassproject.org/api/"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h2",{attrs:{id:"permissioning-and-ownership"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#permissioning-and-ownership"}},[t._v("#")]),t._v(" Permissioning and Ownership")]),t._v(" "),a("p",[t._v("An object without an owner is considered public and can be acted on by any party that knows or can discover its URL. This may be useful for internal repositories where trust is high, but is not advised for repositories with public interfaces. To assign an owner:")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Assigns the Public Key of the first identity of the logged in user as the owner")]),t._v("\np"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("addOwner")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("EcIdentityManager"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("default"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ids"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ppk"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("toPk")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("Adding an owner to an object informs the repository hosting the object that nobody other than the owner can modify or delete the object. Anyone may continue to read the object (though encrypted fields will be omitted for non-reader requests).")]),t._v(" "),a("h2",{attrs:{id:"readers-vs-owners"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#readers-vs-owners"}},[t._v("#")]),t._v(" Readers vs Owners")]),t._v(" "),a("p",[t._v("Adding readers to the object allows access to the object’s data, but the repository will not allow a reader to overwrite or delete an object.")]),t._v(" "),a("p",[t._v("To assign a reader:")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Assigns the Public Key of the first contact of the logged in user as a reader")]),t._v("\np"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("addReader")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("EcIdentityManager"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("default"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("contacts"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("pk"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("An object may have multiple owners and multiple readers.")]),t._v(" "),a("h2",{attrs:{id:"controlling-read-access"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#controlling-read-access"}},[t._v("#")]),t._v(" Controlling read access")]),t._v(" "),a("p",[t._v("In our security model, no actor should trust the repository. So, revoking read access involves encrypting the object.")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" e "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" EcEncryptedValue"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("toEncryptedValue")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("p"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("Note that this retains and exposes some information about the person object to the repository owner to enable "),a("RouterLink",{attrs:{to:"/dev/fundamentals/search/"}},[t._v("Search")]),t._v(": The name of the object and the object type are retained. If you would like to remove those, that’s quite alright, but it removes the ability to search by those fields. If you would like to retain any additional fields, you may copy them from the unencrypted object to the encrypted object. This will enable search by those fields (and expose them to the repository owner).")],1),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("delete")]),t._v(" e"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("delete")]),t._v(" e"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("encryptedType"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("To test the effects of encryption, we need to save the object and temporarily remove our identity to see that the object is no longer accessible. The repository protects encrypted objects from discovery, and the encryption protects the object against the repository owner (or server compromise).")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" repo"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("save")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("e"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" myIds "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" EcIdentityManager"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("default"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ids"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//Saving our identities elsewhere.")]),t._v("\nEcIdentityManager"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("default"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ids "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//Removing them from the expected location.")]),t._v("\nEcRepository"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("cache "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//Clearing the cache.")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" EcRepository"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("e"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("id"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//Not found")]),t._v("\nEcIdentityManager"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("default"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ids "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" myIds"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" EcRepository"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("e"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("id"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//Found!")]),t._v("\n")])])]),a("p",[t._v("Now we can decrypt the object and see it is intact.")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" p "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Person")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//Decrypt it and cast it into the appropriate object.")]),t._v("\np"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("copyFrom")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" EcEncryptedValue"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("fromEcnryptedValue")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("e"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h2",{attrs:{id:"saving-and-retrieving-objects"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#saving-and-retrieving-objects"}},[t._v("#")]),t._v(" Saving and Retrieving objects")]),t._v(" "),a("p",[t._v("An object with an ID can be saved and retrieved. Saving can be done using "),a("code",[t._v("EcRepository")]),t._v(". It's as easy as:")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" EcRepository"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("save")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("p"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("Retrieving an object using EcRepository it is a bit more complex due to issues with casting. All objects returned from EcRepository methods are of the EcRemoteLinkedData type and should be cast into their desired type before use.  This can be done using the following pattern:  First, get the object:")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" r "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" EcRepository"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("p"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("id"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("Alternatively,")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" r "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" EcRepository"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("p"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("id"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("Then, it needs to be “"),a("em",[t._v("cast")]),t._v("” into the desired object.")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("p "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Person")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\np"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("copyFrom")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("r"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("All properties of the object are accessible from its "),a("em",[t._v("EcRemoteLinkedData")]),t._v(" data form ‘r’, however, helper functions that exist in the object won’t be available. This is particularly useful for "),a("code",[t._v("Competency -> EcCompetency")]),t._v(", "),a("code",[t._v("Framework -> EcFramework")]),t._v(", etc.")]),t._v(" "),a("h2",{attrs:{id:"versioning"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#versioning"}},[t._v("#")]),t._v(" Versioning")]),t._v(" "),a("p",[t._v("Upon save, an object’s version number (the last segment of the "),a("code",[t._v("@id")]),t._v(") is set to "),a("em",[t._v("the current UTC timestamp in milliseconds")]),t._v(". This can be used as a last-modified indicator as well as a version number. Versions of an object other than the latest are not discoverable unless they are linked from other objects.")]),t._v(" "),a("p",[t._v("Versions of objects exist to allow for immutable referencing of an object. As an example, if a person answers a question, it is relevant that they answered a particular version of a question with a particular version of an answer.")]),t._v(" "),a("p",[t._v("To access the identifier with the version number included:")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("p"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("id"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("To access the identifier that pertains to the latest version of the object:")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("p"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("shortId")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h2",{attrs:{id:"validating-an-object"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#validating-an-object"}},[t._v("#")]),t._v(" Validating an object")]),t._v(" "),a("p",[t._v("You may validate one or more signatures against one or more owners using the following:")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("p"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("verify")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Returns whether the object is valid.")]),t._v("\n")])])]),a("h2",{attrs:{id:"controller-coming-soon"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#controller-coming-soon"}},[t._v("#")]),t._v(" Controller (Coming Soon)")]),t._v(" "),a("p",[t._v("A controller is allowed to modify who can read the object, but not any other information.")]),t._v(" "),a("h2",{attrs:{id:"guidelines"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#guidelines"}},[t._v("#")]),t._v(" Guidelines")]),t._v(" "),a("p",[t._v("In building any custom implementation, we recommend the following:")]),t._v(" "),a("ul",[a("li",[t._v("Keep objects as flat as possible, and refer to other objects via their ID. This promotes data reuse.")]),t._v(" "),a("li",[t._v("All objects should be owned by the person who created the data. There should be a separate owner for each level of organizational hierarchy ("),a("em",[t._v("e.g. person, school, school district, state")]),t._v(").")]),t._v(" "),a("li",[t._v("All objects should be readable by the people to whom the data pertains. If no keys exist for that person, it is acceptable to create keys on their behalf and give them the private portion upon next interaction (or email them).")]),t._v(" "),a("li",[t._v("Any objects containing personally identifiable information should be read-restricted unless the subject of the data wishes it to be public. This not only follows privacy laws such as FERPA, but it is also a common courtesy.")]),t._v(" "),a("li",[t._v("To enable research, any non-personally identifiable information should be publicly discoverable and accessible.")])])])}),[],!1,null,null,null);e.default=n.exports}}]);