[![Build Status](https://travis-ci.org/cassproject/cass-vlrc.svg?branch=master)](https://travis-ci.org/cassproject/cass-vlrc)
# cass-vlrc
Competency and Skills Service -- Virtual Learning Resource Center

Claim competence for yourself or others, associate resources with competencies, and learn in a self-directed and competency-based example learning system.

# Features
 * View competency frameworks and see how many resources are associated with each competency.
 * Skills Inventory - Self-assert competencies in a framework for viewing in a profile or learning.
 * Resource Alignment - Associate resources with competencies, rate and view other people's resources.
 * Contacts and Peers - Find peers and make assertions about their competence as well!
 * Customizable - Change the default behavior of the cass-vlrc via URL parameters.
 * Unbranded and open source - Carries no branding information, allowing you to use it easily and without concern.

# Try it out
The (unbranded) cass-vlrc is available for use at https://vlrc.cassproject.org/

# Integration
Integrate the cass-vlrc into your website by nesting it into an iframe on your website.

```html
<iframe id="iframe" width="100%" height="800" frameborder="0"></iframe>
<script>
    document.getElementsByTagName("iframe")[0].setAttribute("src", "https://vlrc.cassproject.org/");
</script>
```

# CSS Inheritance
To import a CSS file using a URL parameter, use `css=<url>`.

# URL Parameters
The cass-vlrc has many modes and options that can be enabled or disabled based on desired functionality. These options are passed as URL parameters.

To ensure the iframe is passing the correct origin, pass the origin into the iframe using a URL parameter, `origin=window.location.origin`.

## Setting the server
By default, the cass-vlrc operates on the dev.cassproject.org CASS instance. This should instead be your server. To do this, use `server=protocol://cass.yourserver.com`.

    ex:
    https://vlrc.cassproject.org/index.html?server=https://sandbox.cassproject.org

## Jump to a specific framework
If you have a specific framework you are directing your users to edit or view, you can force the cass-editor to only show that framework by using `frameworkId=<url identifier of framework>`

    ex:
    https://vlrc.cassproject.org/index.html?frameworkId=https://dev.cassproject.org/api/data/schema.cassproject.org.0.3.Framework/e17ad428-e27e-4265-b2ec-782fe7cd81e1
    
## Generate and manage a local user.
cass-vlrc will, by default, create and manage a local user that owns the assertions and resources the user provides. The user credentials will be stored in HTML5 LocalStorage and unique per individual.
  
  Note: This method is risky, as a user that clears their localstorage will lose access to their frameworks and competencies.
  
# Post Messages
CASS can operate using credentials and signals provided by the parent site. These credentials are passed into the iframe via a message, in order to avoid transmitting them over HTTP. Wait for a `{message:"waiting"}` message to be posted from the iframe.
```javascript
$("iframe").ready(function () {
    $(window).on("message", function (event) {
        if (event.originalEvent.data.message == "waiting") {
            //Initialize identity
        }
    });
});
```
## Operate using a provided set of user credentials.
CASS can operate using credentials provided by the parent site. These credentials are passed into the iframe via a message, in order to avoid transmitting them over HTTP. Use `user=wait`, wait for a `{message:"waiting"}` message, and pass a RSA-OAEP 2048 bit PEM private key in via:

    document.getElementById("iframe").contentWindow.postMessage(
      JSON.stringify({action:"identity",identity:privateKey}),
      window.location.origin
    );
    