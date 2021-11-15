[![Build Status](https://travis-ci.org/cassproject/cass-align.svg?branch=master)](https://travis-ci.org/cassproject/cass-align)
# cass-align
Competency and Skills Service -- Alignment Tool

Align CASS competencies with other competencies.

# Features
 * View two competency frameworks and see alignments between the frameworks.
 * Merge the two frameworks and equivalent competencies, seeing a new potential merged framework.
 * Competency Alignment - Create new alignments between frameworks.
 * Customizable - Change the default behavior of the cass-align via post messages.
 * Unbranded and open source - Carries no branding information, allowing you to use it easily and without concern.

# Try it out
cass-align is available for use in default installations as part of the Framework Explorer.

# Integration
Integrate the cass-align into your website by nesting it into an iframe on your website.

```html
<iframe id="iframe" width="100%" height="800" frameborder="0"></iframe>
<script>
    document.getElementsByTagName("iframe")[0].setAttribute("src", "cass-align/index.html");
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
## Jump to a specific framework
If you have a specific framework you are directing your users to edit or view, you can force the cass-editor to only show that framework by using `frameworkId=<url identifier of framework>`
```javascript
$("iframe")[0].contentWindow.postMessage(JSON.stringify({
    action: "setFwkAlignParams",
    fw1Id: <framework1Id>,
    fw2Id: <framework2Id>
}), window.location.origin);
```