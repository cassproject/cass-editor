(window.webpackJsonp=window.webpackJsonp||[]).push([[69],{674:function(e,a,s){"use strict";s.r(a);var t=s(68),r=Object(t.a)({},(function(){var e=this,a=e._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"search"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#search"}},[e._v("#")]),e._v(" Search")]),e._v(" "),a("h2",{attrs:{id:"basics"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#basics"}},[e._v("#")]),e._v(" Basics")]),e._v(" "),a("p",[e._v("CASS uses "),a("a",{attrs:{href:"https://logz.io/blog/elasticsearch-queries/",target:"_blank",rel:"noopener noreferrer"}},[e._v("ElasticSearch Simple Query String"),a("OutboundLink")],1),e._v(" with several optional parameters as its search mechanism.")]),e._v(" "),a("p",[e._v("The best way to experience this is via a web browser. Optionally, an HTTP request tool like PostMan or curl would also be sufficient.")]),e._v(" "),a("p",[e._v("The search endpoint is typically at the following URL:")]),e._v(" "),a("p",[a("code",[e._v("http(s?)://<your server endpoint>/api/data")])]),e._v(" "),a("p",[e._v("e.g.")]),e._v(" "),a("p",[a("code",[e._v("https://dev.cassproject.org/api/data")])]),e._v(" "),a("p",[e._v("The search allows two forms of querying and providing data: a URL query string and via an HTTP POST request.")]),e._v(" "),a("ol",[a("li",[a("p",[e._v("The query string basic form is show below (the search is ‘*’, or everything):\n"),a("code",[e._v("https://dev.cassproject.org/api/data?q=*")])]),e._v(" "),a("ul",[a("li",[e._v("Optional parameters include:\n"),a("ul",[a("li",[e._v("Size, the size of the response.\n"),a("code",[e._v("https://dev.cassproject.org/api/data?size=100&q=*")])]),e._v(" "),a("li",[e._v("Start, used for paging.\n"),a("code",[e._v("https://dev.cassproject.org/api/data?start=50&q=*")])])])]),e._v(" "),a("li",[a("em",[e._v("Note: This may be used as part of a GET or POST when including a signature sheet.")])])])]),e._v(" "),a("li",[a("p",[e._v("The POST method requires a multi part post containing a JSON Object named ‘searchParams’. This can be useful to avoid issues with URL query string encoding.")]),e._v(" "),a("ul",[a("li",[e._v("General format:"),a("div",{staticClass:"language-http extra-class"},[a("pre",{pre:!0,attrs:{class:"language-http"}},[a("code",[a("span",{pre:!0,attrs:{class:"token header"}},[a("span",{pre:!0,attrs:{class:"token header-name keyword"}},[e._v("https")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),a("span",{pre:!0,attrs:{class:"token header-value"}},[e._v("//dev.cassproject.org/api/data")])]),e._v('\n{\n    "key": val,\n    ...\n}\n')])])])]),e._v(" "),a("li",[e._v("The query appears in the ‘q’ field of the ‘searchParams’ object."),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"q"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"*"')]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])])])]),e._v(" "),a("li",[e._v("Optional parameters include:\n"),a("ul",[a("li",[e._v("Size, the size of the response.")])]),e._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"q"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"*"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"size"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("100")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])])])]),e._v(" "),a("li",[e._v("Start, used for paging."),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"q"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"*"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"start"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("50")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])])])])])])]),e._v(" "),a("h2",{attrs:{id:"common-queries"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#common-queries"}},[e._v("#")]),e._v(" Common Queries")]),e._v(" "),a("p",[e._v("There are a number of common queries that are useful in the practice of using CASS.")]),e._v(" "),a("h3",{attrs:{id:"search-everything"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#search-everything"}},[e._v("#")]),e._v(" Search everything")]),e._v(" "),a("p",[e._v("This query searches all fields for any distinct word ‘tool’. Note that plural forms will also be returned.")]),e._v(" "),a("p",[a("code",[e._v("https://dev.cassproject.org/api/data?q=tool")])]),e._v(" "),a("h3",{attrs:{id:"search-by-a-field"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#search-by-a-field"}},[e._v("#")]),e._v(" Search by a field.")]),e._v(" "),a("p",[e._v("This query searches for a string inside a field.")]),e._v(" "),a("p",[a("code",[e._v("https://dev.cassproject.org/api/data?q=name:tool")])]),e._v(" "),a("h3",{attrs:{id:"search-by-a-partial-field"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#search-by-a-partial-field"}},[e._v("#")]),e._v(" Search by a partial field.")]),e._v(" "),a("p",[e._v("This query searches for a string inside a field.")]),e._v(" "),a("p",[a("code",[e._v('https://dev.cassproject.org/api/data?q=name:"Workplace Readiness Skills"')])]),e._v(" "),a("h3",{attrs:{id:"search-for-records-of-a-certain-type"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#search-for-records-of-a-certain-type"}},[e._v("#")]),e._v(" Search for records of a certain type.")]),e._v(" "),a("p",[e._v("This query searches for competencies.")]),e._v(" "),a("p",[a("code",[e._v("https://dev.cassproject.org/api/data?q=@type:Competency")])]),e._v(" "),a("p",[e._v("or")]),e._v(" "),a("p",[a("code",[e._v("https://dev.cassproject.org/api/data/schema.cassproject.org.0.2.Competency?q=*")])]),e._v(" "),a("h3",{attrs:{id:"search-for-records-by-owner-identifier"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#search-for-records-by-owner-identifier"}},[e._v("#")]),e._v(" Search for records by owner identifier.")]),e._v(" "),a("p",[e._v("This query searches for records owned by a particular individual.")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('https://dev.cassproject.org/api/data?q=@owner:"-----BEGIN%20PUBLIC%20KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAl5Zsr3KlThU%2BOGbkT%2BLd24j0u2AUMnh7YU7%2B%2FPiKzJaR%2Fzv06RFALl%2Bm2kmNXFgnsIZQeE4OvHWXptJsghIlrL36NbQwrpknXglqQ9dPHIKrdlvnSvvPvWSBcs%2BO2eKJg4A2wSjx5Ls6lJRijRLlIwRC%2FSD8tx%2FUeaakQ5b%2FkyyaDsL3ScyT5yUzICBR0xIp%2B0HRLVkxG9t2BW1%2FGnw78SYUZKZT2a0c01d5rzvXDH9VFfYDANG6oep%2FAmDOhVLI3qG8MYVKnyVKK2%2F3VIl%2BEOIYPxbGasJWp7vredxtCEQfbzQI8D9DfbizYxSRuxmcU%2B%2BmLhGWdyD7YgrOSQvFkwIDAQAB-----END%20PUBLIC%20KEY-----"\n')])])]),a("p",[e._v("Note: This type of query becomes more difficult to perform as URL encoding and particular use of quotes becomes more important. Particularly advanced queries almost necessitate the use of the POST form.")]),e._v(" "),a("h3",{attrs:{id:"combining-search-criteria"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#combining-search-criteria"}},[e._v("#")]),e._v(" Combining Search Criteria")]),e._v(" "),a("p",[e._v("This query searches for frameworks with “Skills” in the name.")]),e._v(" "),a("p",[a("code",[e._v("https://dev.cassproject.org/api/data?q=@type:Framework AND name:Skills")])]),e._v(" "),a("p",[e._v("Also allowed are "),a("strong",[e._v("Parentheses")]),e._v(" and the "),a("strong",[e._v("OR")]),e._v(" keyword.")])])}),[],!1,null,null,null);a.default=r.exports}}]);