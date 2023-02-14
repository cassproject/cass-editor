(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{451:function(e,t,o){"use strict";o.r(t);var s=o(55),a=Object(s.a)({},(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("h1",{attrs:{id:"overview"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[e._v("#")]),e._v(" Overview")]),e._v(" "),o("p",[e._v("These pages describe the "),o("strong",[e._v("CaSS Repository")]),e._v(", an object repository used to store objects in CaSS. The CaSS repository stores objects as "),o("strong",[e._v("JSON-LD")]),e._v(" compatible with "),o("a",{attrs:{href:"https://schema.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Schema.org"),o("OutboundLink")],1),e._v(" and "),o("a",{attrs:{href:"https://credreg.net/",target:"_blank",rel:"noopener noreferrer"}},[e._v("CTDL"),o("OutboundLink")],1),e._v(". The objects stored in the CaSS repository include, but are not limited to:")]),e._v(" "),o("blockquote",[o("ul",[o("li",[e._v("Competencies and Competency Frameworks")]),e._v(" "),o("li",[e._v("Roll-up rules (relating competence in a target competency/performance level to competence in a set of other competencies/performance levels)")]),e._v(" "),o("li",[e._v("Performance levels (which are separate objects but are tied to specific competencies)")]),e._v(" "),o("li",[e._v("Competency Assertions (stating that individuals hold competencies at particular performance levels)")]),e._v(" "),o("li",[e._v("Alignment objects that associate resources with competencies")])])]),e._v(" "),o("p",[e._v("Future versions may also include an extended set of objects that applications can use to define competency-based goals and learning paths.")]),e._v(" "),o("p",[e._v("The CaSS repository implements and supports a security and authentication framework called "),o("RouterLink",{attrs:{to:"/dev/security/kbac-specification/"}},[e._v("Key-based Access Control (KBAC)")]),e._v(". Use of this framework is optional but is recommended for implementations that require security and and that enforce privacy policies. If objects are stored with security, then the repository enforces security rules around the use of the data.")],1),e._v(" "),o("p",[e._v("Permissions are set by the creator of a piece of data")]),e._v(" "),o("ul",[o("li",[e._v("If the data is created with no owner, then it has no rights and may freely be read, modified or deleted. No security rules are enforced for these objects.")]),e._v(" "),o("li",[e._v("If the data is created with one or more owners, then only the owners may modify or delete the data. Anyone may discover or read the data. This is the typical protection level of public data such as frameworks, competencies, etc.")]),e._v(" "),o("li",[e._v("If the data is encrypted, then only the owners or readers may discover or view the data, and only owners may modify or delete the data. Assertions and other learner data use this permission level heavily.")]),e._v(" "),o("li",[e._v("A server administrator may delete any piece of data.")])]),e._v(" "),o("p",[e._v("Specifically, these pages describe the specific REST web service APIs and business logic required to enable the repository to communicate over the internet.")]),e._v(" "),o("h2",{attrs:{id:"how-to-read-this-document"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#how-to-read-this-document"}},[e._v("#")]),e._v(" How to Read this Document")]),e._v(" "),o("p",[e._v("This document describes the existing CaSS Repository as a series of use cases or recipes and assumes understanding of KBAC, HTTP, JSON, JSON-LD, RSA Cryptography, and any other associated technologies. The steps and associated examples should be used when attempting to accomplish specific coding tasks.")]),e._v(" "),o("h2",{attrs:{id:"definitions"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#definitions"}},[e._v("#")]),e._v(" Definitions")]),e._v(" "),o("ul",[o("li",[o("strong",[e._v("Object:")]),e._v(" A JSON-LD Object")]),e._v(" "),o("li",[o("strong",[e._v("Repository:")]),e._v(" The CaSS Repository")]),e._v(" "),o("li",[o("strong",[e._v("Endpoint:")]),e._v(" The domain name and additional URL path (if exists) to reach the CaSS Repository")])])])}),[],!1,null,null,null);t.default=a.exports}}]);