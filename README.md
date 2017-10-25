[![Build Status](https://travis-ci.org/cassproject/cass-editor.svg?branch=master)](https://travis-ci.org/cassproject/cass-editor)
# CASS
Competency and Skills Service -- Competency Framework Editor

Create, edit, modify frameworks using an easy to use, embeddable iframe.

# Try it out
The cass-editor is available for use at https://cassproject.github.io/cass-editor/

# Integration
Integrate the cass-editor into your website by nesting it into an iframe on your website.

```html
<iframe id="iframe" width="100%" height="800" frameborder="0"></iframe>
<script>
    document.getElementsByTagName("iframe")[0].setAttribute("src", "https://cassproject.github.io/cass-editor/index.html");
</script>
```

# CSS Inheritance
The cass-editor attempts to read the stylesheets of the parent page and import them into the website. It may not be able to do this without your help.

```
An error message when headers are not set:
    ...Styles/Webfonts/Gibson/Gibson-Regular-webfont.woff2' from origin 'https://cassproject.github.io' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'https://cassproject.github.io' is therefore not allowed access. The response had HTTP status code 404.
```

To remedy this, your web server needs to allow cross-origin requests to the cassproject github.io site.

```
Access-Control-Allow-Origin: https://cassproject.github.io
```

# URL Parameters
The cass-editor has many modes and options that can be enabled or disabled based on desired functionality. These options are passed as URL parameters.

## Setting the server
By default, the cass-editor operates on the dev.cassproject.org CASS instance. This should instead be your server. To do this, use `server=protocol://cass.yourserver.com`.

    ex:
    https://cassproject.github.io/cass-editor/index.html?server=https://sandbox.cassproject.org
    
## Add new framework
By default, the cass-editor provides a framework browser to select and edit frameworks. To start with a workflow of creating a framework, use `action=add`. This will expose the framework creation and import pages.

    ex:
    https://cassproject.github.io/cass-editor/index.html?action=add
    
## Edit a specific framework
If you have a specific framework you are directing your users to edit, you can force the cass-editor to only show that framework by using `frameworkId=<url identifier of framework>`

    ex:
    https://cassproject.github.io/cass-editor/index.html?frameworkId=https://dev.cassproject.org/api/data/schema.cassproject.org.0.3.Framework/fd9dbdae-6b10-46da-8256-1458b448bfab
    
## Expose URL links
If your users need the URLs for each framework or resource they are editing, you can enable link-showing by using `link=true`

    ex:
    https://cassproject.github.io/cass-editor/index.html?frameworkId=https://dev.cassproject.org/api/data/schema.cassproject.org.0.3.Framework/fd9dbdae-6b10-46da-8256-1458b448bfab&link=true
    
## Filtering frameworks by an additional search query.
If you are limiting users to seeing only a set of frameworks that can be described by a search query, you can add an additional search query to the initial framework search by using `filter=<search query>`.

    ex:
    https://cassproject.github.io/cass-editor/index.html?filter=@id:case.georgiastandards.org

## TBD: Generate and manage a local user.
CASS can create and manage a local user that owns the frameworks and competencies they create. The user credentials will be stored in HTML5 LocalStorage and unique per individual and per server. To enable this functionality, use `user=self`.
  
  Note: This method is risky, as a user that clears their localstorage will lose access to their frameworks and competencies.
  
## TBD: Operate using a provided set of user credentials.
CASS can operate using credentials provided by the parent site. These credentials are passed into the iframe via a message, in order to avoid transmitting them over HTTP. Details are TBD.
  
## TBD: Only show frameworks that individual owns.
Along with user credentials, the cass-editor can be configured to not show others' frameworks. This functionality can be enabled by the URL parameter `show=mine`.
