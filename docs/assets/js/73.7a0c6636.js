(window.webpackJsonp=window.webpackJsonp||[]).push([[73],{468:function(t,e,v){"use strict";v.r(e);var d=v(55),_=Object(d.a)({},(function(){var t=this,e=t.$createElement,v=t._self._c||e;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h1",{attrs:{id:"kbac-threat-model"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#kbac-threat-model"}},[t._v("#")]),t._v(" KBAC Threat Model")]),t._v(" "),v("h2",{attrs:{id:"server-side-attacks"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#server-side-attacks"}},[t._v("#")]),t._v(" Server-Side Attacks")]),t._v(" "),v("table",[v("thead",[v("tr",[v("th",[t._v("Operation")]),t._v(" "),v("th",[t._v("Threat")]),t._v(" "),v("th",[t._v("Specific Attack")]),t._v(" "),v("th",[t._v("Attack Effort")]),t._v(" "),v("th",[t._v("Damages")]),t._v(" "),v("th",[t._v("KBAC Effective?")]),t._v(" "),v("th",[t._v("Protections in Place")]),t._v(" "),v("th",[t._v("Mitigations")]),t._v(" "),v("th",[t._v("Advice")])])]),t._v(" "),v("tbody",[v("tr",[v("td",[t._v("User logs in using username/password")]),t._v(" "),v("td",[t._v("Network Compromised")]),t._v(" "),v("td",[t._v("Traffic Intercept via MITM")]),t._v(" "),v("td",[t._v("Medium")]),t._v(" "),v("td",[t._v("None")]),t._v(" "),v("td",[t._v("Yes.")]),t._v(" "),v("td",[t._v("HTTPS for transport, username and password can be used to retreive credentials but not decrypt credentials.")]),t._v(" "),v("td"),t._v(" "),v("td")]),t._v(" "),v("tr",[v("td",[t._v("User logs in using username/password")]),t._v(" "),v("td",[t._v("Network Compromised")]),t._v(" "),v("td",[t._v("Traffic Intercept via MITM w/Replay Attack")]),t._v(" "),v("td",[t._v("High")]),t._v(" "),v("td",[t._v("None")]),t._v(" "),v("td",[t._v("Yes.")]),t._v(" "),v("td",[t._v("Randomly salted username/password prevents replay attacks.")]),t._v(" "),v("td"),t._v(" "),v("td")]),t._v(" "),v("tr",[v("td",[t._v("Login server is hacked.")]),t._v(" "),v("td",[t._v("Server Compromised")]),t._v(" "),v("td",[t._v('"owned" server. (many)')]),t._v(" "),v("td",[t._v("High")]),t._v(" "),v("td",[t._v("None")]),t._v(" "),v("td",[t._v("Yes.")]),t._v(" "),v("td",[t._v("Login data at rest is encrypted w/keys not on server.")]),t._v(" "),v("td"),t._v(" "),v("td")]),t._v(" "),v("tr",[v("td",[t._v("User downloads data from server.")]),t._v(" "),v("td",[t._v("Network Compromised")]),t._v(" "),v("td",[t._v("Traffic Intercept via MITM. Data is read.")]),t._v(" "),v("td",[t._v("Medium")]),t._v(" "),v("td",[t._v("None")]),t._v(" "),v("td",[t._v("Yes.")]),t._v(" "),v("td",[t._v("HTTPS for transport, sensitive data is in a (further) encrypted form.")]),t._v(" "),v("td",[t._v("AES keys randomized for each request. RSA-2048 is strong (as of 2016).")]),t._v(" "),v("td",[t._v("Subject to NSA-style long term storage attack.")])]),t._v(" "),v("tr",[v("td",[t._v("User downloads data from server.")]),t._v(" "),v("td",[t._v("Network Compromised")]),t._v(" "),v("td",[t._v("Traffic Intercept via MITM. Request is replayed for additional information.")]),t._v(" "),v("td",[t._v("Medium")]),t._v(" "),v("td",[t._v("None")]),t._v(" "),v("td",[t._v("Yes.")]),t._v(" "),v("td",[t._v("Requests are signed, preventing request being used for any information other than the initially requested information.")]),t._v(" "),v("td"),t._v(" "),v("td")]),t._v(" "),v("tr",[v("td",[t._v("User downloads data from server.")]),t._v(" "),v("td",[t._v("Network Compromised")]),t._v(" "),v("td",[t._v("Traffic Intercept via MITM. Data is manipulated.")]),t._v(" "),v("td",[t._v("Medium")]),t._v(" "),v("td",[t._v("None")]),t._v(" "),v("td",[t._v("Yes.")]),t._v(" "),v("td",[t._v("Requests are signed, preventing request being used for any information other than the initially requested information. Response data is also signed.")]),t._v(" "),v("td"),t._v(" "),v("td")]),t._v(" "),v("tr",[v("td",[t._v("User downloads data from server.")]),t._v(" "),v("td",[t._v("Network Compromised")]),t._v(" "),v("td",[t._v("Traffic Intercept via MITM. Data is omitted or redirected.")]),t._v(" "),v("td",[t._v("Medium")]),t._v(" "),v("td",[t._v("Data is not stored.")]),t._v(" "),v("td",[t._v("Yes.")]),t._v(" "),v("td",[t._v("Data is signed and sensitive data is encrypted.")]),t._v(" "),v("td"),t._v(" "),v("td")]),t._v(" "),v("tr",[v("td",[t._v("User downloads data from server.")]),t._v(" "),v("td",[t._v("Server Compromised")]),t._v(" "),v("td",[t._v("Malicious Server")]),t._v(" "),v("td",[t._v("High")]),t._v(" "),v("td",[t._v("Data may be unavailable.")]),t._v(" "),v("td",[t._v("Yes.")]),t._v(" "),v("td",[t._v("Data is signed and sensitive data is encrypted. User IP/fingerprints can be acquired for correlation attacks.")]),t._v(" "),v("td"),t._v(" "),v("td",[t._v("Subject to NSA-style long term storage attack.")])]),t._v(" "),v("tr",[v("td",[t._v("User uploads data to server.")]),t._v(" "),v("td",[t._v("Network Compromised")]),t._v(" "),v("td",[t._v("Traffic Intercept via MITM. Data is read.")]),t._v(" "),v("td",[t._v("Medium")]),t._v(" "),v("td",[t._v("None")]),t._v(" "),v("td",[t._v("Yes.")]),t._v(" "),v("td",[t._v("HTTPS for transport, sensitive data is in a (further) encrypted form.")]),t._v(" "),v("td",[t._v("AES keys randomized for each request. RSA-2048 is strong (as of 2016).")]),t._v(" "),v("td",[t._v("Subject to NSA-style long term storage attack.")])]),t._v(" "),v("tr",[v("td",[t._v("User uploads data to server.")]),t._v(" "),v("td",[t._v("Network Compromised")]),t._v(" "),v("td",[t._v("Traffic Intercept via MITM. Data is read and HTTPS is skimmed or a certificate attack works.")]),t._v(" "),v("td",[t._v("High")]),t._v(" "),v("td",[t._v("None")]),t._v(" "),v("td",[t._v("Yes.")]),t._v(" "),v("td",[t._v("Sensitive data is in an encrypted form.")]),t._v(" "),v("td",[t._v("AES keys randomized for each request. RSA-2048 is strong (as of 2016).")]),t._v(" "),v("td",[t._v("Subject to NSA-style long term storage attack.")])]),t._v(" "),v("tr",[v("td",[t._v("User uploads data to server.")]),t._v(" "),v("td",[t._v("Network Compromised")]),t._v(" "),v("td",[t._v("Traffic Intercept via MITM. Request is replayed to overwrite changes.")]),t._v(" "),v("td",[t._v("High")]),t._v(" "),v("td",[t._v("None")]),t._v(" "),v("td",[t._v("Yes.")]),t._v(" "),v("td",[t._v("Request signature is timestamped, limiting the viability of this attack to some number of seconds after the initial capture.")]),t._v(" "),v("td"),t._v(" "),v("td")]),t._v(" "),v("tr",[v("td",[t._v("User uploads data to server.")]),t._v(" "),v("td",[t._v("Network Compromised")]),t._v(" "),v("td",[t._v("Traffic Intercept via MITM. Data is manipulated.")]),t._v(" "),v("td",[t._v("High")]),t._v(" "),v("td",[t._v("None")]),t._v(" "),v("td",[t._v("Yes.")]),t._v(" "),v("td",[t._v("Request signature is timestamped, limiting the viability of this attack to some number of seconds after the initial capture.")]),t._v(" "),v("td"),t._v(" "),v("td")]),t._v(" "),v("tr",[v("td",[t._v("User uploads data to server.")]),t._v(" "),v("td",[t._v("Network Compromised")]),t._v(" "),v("td",[t._v("Traffic Intercept via MITM. Data is omitted or redirected.")]),t._v(" "),v("td",[t._v("Medium")]),t._v(" "),v("td",[t._v("Data is not stored.")]),t._v(" "),v("td",[t._v("Yes.")]),t._v(" "),v("td"),t._v(" "),v("td"),t._v(" "),v("td")]),t._v(" "),v("tr",[v("td",[t._v("User deletes data.")]),t._v(" "),v("td",[t._v("Network Compromised")]),t._v(" "),v("td",[t._v("Traffic Intercept via MITM. Data is read.")]),t._v(" "),v("td",[t._v("Medium")]),t._v(" "),v("td",[t._v("None")]),t._v(" "),v("td",[t._v("Yes.")]),t._v(" "),v("td",[t._v("HTTPS for transport, sensitive data is in a (further) encrypted form.")]),t._v(" "),v("td",[t._v("AES keys randomized for each request. RSA-2048 is strong (as of 2016).")]),t._v(" "),v("td")]),t._v(" "),v("tr",[v("td",[t._v("User deletes data.")]),t._v(" "),v("td",[t._v("Network Compromised")]),t._v(" "),v("td",[t._v("Traffic Intercept via MITM. Request is replayed to delete additional material.")]),t._v(" "),v("td",[t._v("High")]),t._v(" "),v("td",[t._v("None")]),t._v(" "),v("td",[t._v("Yes.")]),t._v(" "),v("td",[t._v("Request signature is timestamped, limiting the viability of this attack to some number of seconds after the initial capture. Request signature also denotes the material to be deleted.")]),t._v(" "),v("td"),t._v(" "),v("td")]),t._v(" "),v("tr",[v("td",[t._v("User deletes data.")]),t._v(" "),v("td",[t._v("Network Compromised")]),t._v(" "),v("td",[t._v("Traffic Intercept via MITM. Data is manipulated.")]),t._v(" "),v("td",[t._v("High")]),t._v(" "),v("td",[t._v("None")]),t._v(" "),v("td",[t._v("Yes.")]),t._v(" "),v("td",[t._v("Request signature is timestamped, limiting the viability of this attack to some number of seconds after the initial capture.")]),t._v(" "),v("td"),t._v(" "),v("td")]),t._v(" "),v("tr",[v("td",[t._v("User deletes data.")]),t._v(" "),v("td",[t._v("Network Compromised")]),t._v(" "),v("td",[t._v("Traffic Intercept via MITM. Data is omitted or redirected.")]),t._v(" "),v("td",[t._v("Medium")]),t._v(" "),v("td",[t._v("Can be aborted, retaining data.")]),t._v(" "),v("td",[t._v("Yes.")]),t._v(" "),v("td",[t._v("Data is signed and sensitive data is encrypted.")]),t._v(" "),v("td"),t._v(" "),v("td")]),t._v(" "),v("tr",[v("td",[t._v("User deletes data.")]),t._v(" "),v("td",[t._v("Server Compromised")]),t._v(" "),v("td",[t._v("Malicious Server")]),t._v(" "),v("td",[t._v("High")]),t._v(" "),v("td",[t._v("Can be aborted, retaining data.")]),t._v(" "),v("td",[t._v("Yes.")]),t._v(" "),v("td",[t._v("Data is signed and sensitive data is encrypted.")]),t._v(" "),v("td"),t._v(" "),v("td")])])]),t._v(" "),v("h2",{attrs:{id:"client-side-attacks"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#client-side-attacks"}},[t._v("#")]),t._v(" Client-Side Attacks")]),t._v(" "),v("table",[v("thead",[v("tr",[v("th",[t._v("Operation")]),t._v(" "),v("th",[t._v("Threat")]),t._v(" "),v("th",[t._v("Specific Attack")]),t._v(" "),v("th",[t._v("Attack Effort")]),t._v(" "),v("th",[t._v("Damages")]),t._v(" "),v("th",[t._v("KBAC Effective?")]),t._v(" "),v("th",[t._v("Protections")]),t._v(" "),v("th",[t._v("Mitigations")]),t._v(" "),v("th",[t._v("Advice")])])]),t._v(" "),v("tbody",[v("tr",[v("td",[t._v("User logs in using username/password")]),t._v(" "),v("td",[t._v("Client Compromised")]),t._v(" "),v("td",[t._v("Malicious Browser / Plugin")]),t._v(" "),v("td",[t._v("Low")]),t._v(" "),v("td",[t._v("One Person Compromised, cannot use Private Keys any longer. Public key should be blacklisted.")]),t._v(" "),v("td",[t._v("No.")]),t._v(" "),v("td"),t._v(" "),v("td",[t._v("We encourage servers to require HTTP/S which prevents some damages.")]),t._v(" "),v("td")]),t._v(" "),v("tr",[v("td",[t._v("User logs in using username/password")]),t._v(" "),v("td",[t._v("Client Compromised")]),t._v(" "),v("td",[t._v("Worm / Virus / Keylogger")]),t._v(" "),v("td",[t._v("Low")]),t._v(" "),v("td",[t._v("One Person Compromised, cannot use Private Keys any longer. Public key should be blacklisted.")]),t._v(" "),v("td",[t._v("No.")]),t._v(" "),v("td"),t._v(" "),v("td",[t._v("Automated login prevents keylogger use.")]),t._v(" "),v("td")]),t._v(" "),v("tr",[v("td",[t._v("User logs in using username/password")]),t._v(" "),v("td",[t._v("Website Compromised")]),t._v(" "),v("td",[t._v("Malicious Javascript")]),t._v(" "),v("td",[t._v("High")]),t._v(" "),v("td",[t._v("Every User after server compromised is compromised WRT this system. Usernames and passwords may be sniffed if re-entered. Private Keys may be compromised. Public keys should be blacklisted.")]),t._v(" "),v("td",[t._v("No.")]),t._v(" "),v("td"),t._v(" "),v("td",[t._v("Automated login uses post-hashed credentials, preventing username/password from being reused in other systems.")]),t._v(" "),v("td",[t._v("Client code should be served from a signed third party (Android application, other application)")])]),t._v(" "),v("tr",[v("td",[t._v("User downloads data from server.")]),t._v(" "),v("td",[t._v("Client Compromised")]),t._v(" "),v("td",[t._v("Data altered before viewing on browser. (credentials added, removed, targeted attack)")]),t._v(" "),v("td",[t._v("High")]),t._v(" "),v("td",[t._v("Viewed data for compromised client.")]),t._v(" "),v("td",[t._v("No.")]),t._v(" "),v("td"),t._v(" "),v("td"),t._v(" "),v("td",[t._v("Client code should work in an isolated container, however, this theoretically can still be pierced.")])]),t._v(" "),v("tr",[v("td",[t._v("User downloads data from server.")]),t._v(" "),v("td",[t._v("Website Compromised")]),t._v(" "),v("td",[t._v("Data altered before viewing on browser via malicious Javascript.")]),t._v(" "),v("td",[t._v("High")]),t._v(" "),v("td",[t._v("Viewed data for any clients who downloads the compromised site.")]),t._v(" "),v("td",[t._v("No.")]),t._v(" "),v("td"),t._v(" "),v("td"),t._v(" "),v("td",[t._v("Client code should be served from a signed third party (Android application, other application)")])]),t._v(" "),v("tr",[v("td",[t._v("User uploads data to server.")]),t._v(" "),v("td",[t._v("Client Compromised")]),t._v(" "),v("td",[t._v("Malicious Browser")]),t._v(" "),v("td",[t._v("High")]),t._v(" "),v("td",[t._v("Data can be altered before upload.")]),t._v(" "),v("td",[t._v("No.")]),t._v(" "),v("td"),t._v(" "),v("td"),t._v(" "),v("td")]),t._v(" "),v("tr",[v("td",[t._v("User uploads data to server.")]),t._v(" "),v("td",[t._v("Website Compromised")]),t._v(" "),v("td",[t._v("Malicious Javascript")]),t._v(" "),v("td",[t._v("High")]),t._v(" "),v("td",[t._v("Data can be altered via javascript before upload.")]),t._v(" "),v("td",[t._v("No.")]),t._v(" "),v("td"),t._v(" "),v("td"),t._v(" "),v("td")]),t._v(" "),v("tr",[v("td",[t._v("User deletes data.")]),t._v(" "),v("td",[t._v("Client Compromised")]),t._v(" "),v("td",[t._v("Malicious Browser")]),t._v(" "),v("td",[t._v("High")]),t._v(" "),v("td",[t._v("Can be aborted, retaining data.")]),t._v(" "),v("td",[t._v("Yes.")]),t._v(" "),v("td",[t._v("Data is signed and sensitive data is encrypted.")]),t._v(" "),v("td"),t._v(" "),v("td")]),t._v(" "),v("tr",[v("td",[t._v("User deletes data.")]),t._v(" "),v("td",[t._v("Website Compromised")]),t._v(" "),v("td",[t._v("Malicious Javascript")]),t._v(" "),v("td",[t._v("High")]),t._v(" "),v("td",[t._v("Can be aborted, retaining data.")]),t._v(" "),v("td",[t._v("Yes.")]),t._v(" "),v("td"),t._v(" "),v("td"),t._v(" "),v("td")])])])])}),[],!1,null,null,null);e.default=_.exports}}]);