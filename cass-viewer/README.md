[![Build Status](https://travis-ci.org/cassproject/cass-viewer.svg?branch=master)](https://travis-ci.org/cassproject/cass-viewer)
# cass-viewer
Competency and Skills Service -- Framework Explorer

View competency frameworks and navigate them with an easy to use, non-technical interface.

# Features
 * View a competency framework and see the nested hierarchy in an interactive graphical "bubble" display.
 * Switch to the list view and see more details about the framework.
 * Customizable - Change the default behavior of the cass-viewer via post messages.
 * Unbranded and open source - Carries no branding information, allowing you to use it easily and without concern.

# Try it out
cass-viewer is available for use in default installations as part of the Framework Explorer.

# Integration
Integrate the cass-viewer into your website by nesting it into an iframe on your website.

```html
<iframe id="iframe" width="100%" height="800" frameborder="0"></iframe>
<script>
    document.getElementsByTagName("iframe")[0].setAttribute("src", "cass-viewer/index.html");
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