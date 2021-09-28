[![Build Status](https://travis-ci.org/cassproject/cass-gap-analysis.svg?branch=master)](https://travis-ci.org/cassproject/cass-gap-analysis)
# cass-gap-analysis
Competency and Skills Service -- Gap analysis

View your or another's profile and share assertions with your contacts.

# Features
 * View your profile across all competency frameworks.
 * Navigate your profile and understand what assertions and evidence contribute to it.
 * Share assertions by compiling them into profiles and sharing them with others.
 * Customizable - Change the default behavior of the cass-align via post messages.
 * Unbranded and open source - Carries no branding information, allowing you to use it easily and without concern.

# Try it out
cass-gap-analysis is available for use in default installations as part of the Framework Viewer.

# Integration
Integrate the cass-gap-analysis into your website by nesting it into an iframe on your website.

```html
<iframe id="iframe" width="100%" height="800" frameborder="0"></iframe>
<script>
    document.getElementsByTagName("iframe")[0].setAttribute("src", "cass-gap-analysis/index.html");
</script>
```

# URL Parameters
To ensure the iframe is passing the correct origin, pass the origin into the iframe using a URL parameter, `origin=window.location.origin`.

# Post Messages
CASS can operate using credentials and signals provided by the parent site. These credentials are passed into the iframe via a message, in order to avoid transmitting them over HTTP. Wait for a `{message:"waiting"}` message to be posted from the iframe.
```javascript
$("iframe").ready(function () {
    $(window).on("message", function (event) {
        if (event.originalEvent.data.message == "waiting") {
            //Initialize the server and identity
            //Set framework alignment parameters
        }
    });
});
```
## Setting the server
You must set the server and the identity to be used when accessing the server. 
```javascript
$("iframe")[0].contentWindow.postMessage(JSON.stringify({
    action: "initIdentity",
    serverParm: selectedServer,
    nameParm: loggedInIdentityName,
    pemParm: loggedInPpkPem
}), window.location.origin);
```