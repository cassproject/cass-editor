[![Build Status](https://travis-ci.org/cassproject/cass-editor.svg?branch=master)](https://travis-ci.org/cassproject/cass-editor)
# CASS
Competency and Skills Service -- Competency Framework Editor

Create, edit, modify CASS frameworks and competencies using an easy to use, embeddable iframe.

# Features
 * View and edit public or permissioned competency frameworks on a CASS instance.
 * Concurrent editing - Changes are shown on multiple people's screens concurrently.
 * Import - Import frameworks of competencies from several formats.
 * Embeddable - Put the cass-editor in your website with a few lines of HTML.
 * Customizable - Change the default behavior of the cass-editor via URL parameters.
 * Inherits your style - If it can, uses the CSS from the embedding website to style the internals.
 * Unbranded and open source - Carries no branding information, allowing you to use it easily and without concern.

# Try it out
The (unbranded) cass-editor is available for use at https://cassproject.github.io/cass-editor/

# Integration
Integrate the cass-editor into your website by nesting it into an iframe on your website.

```html
<iframe id="iframe" width="100%" height="800" frameborder="0"></iframe>
<script>
    document.getElementsByTagName("iframe")[0].setAttribute("src", "https://cassproject.github.io/cass-editor/index.html");
</script>
```

# CSS Inheritance
The cass-editor attempts to read the stylesheets of the parent page and import them into the website if they have `inherit="true"` as an attribute. It may not be able to do this without your help.

```
An error message when headers are not set:
    ...Styles/Webfonts/Gibson/Gibson-Regular-webfont.woff2' from origin 'https://cassproject.github.io' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'https://cassproject.github.io' is therefore not allowed access. The response had HTTP status code 404.
```

To remedy this, your web server needs to allow cross-origin requests to the cassproject github.io site, or you can clone this repository and host it locally.

```
Access-Control-Allow-Origin: https://cassproject.github.io
```

Finally, to import a CSS file using a URL parameter, use `css=<url>`.

# URL Parameters
The cass-editor has many modes and options that can be enabled or disabled based on desired functionality. These options are passed as URL parameters.

## Setting the server
By default, the cass-editor operates on the dev.cassproject.org CASS instance. This should instead be your server. To do this, use `server=protocol://cass.yourserver.com`.

    ex:
    https://cassproject.github.io/cass-editor/index.html?server=https://sandbox.cassproject.org
    
## View mode
By default, the cass-editor provides a framework browser to select and edit frameworks. To instead be restricted to only viewing frameworks, use `view=true`.

    ex:
    https://cassproject.github.io/cass-editor/index.html?view=true
      
## Concept mode
By default, the cass-editor edits competency frameworks. To instead edit concept schemes, use `concepts=true`.

    ex:
    https://cassproject.github.io/cass-editor/index.html?concepts=true
    
## Select competencies in frameworks
If your app needs the ability to select competencies from a framework, use `select=label` where 'label' is the tag you want the select button to have. ex: Add, Select, Import. Best used with `view=true`.

    ex:
    https://cassproject.github.io/cass-editor/index.html?select=Add

## Select verbose
If your app needs to have the entire competency or relation returned as part of the selection, or the framework that the competencies were selected from use `selectVerbose=true`.

    ex:
    https://cassproject.github.io/cass-editor/index.html?select=Add&selectVerbose=true

## Select single competencies in frameworks
If your app needs the ability to select a single competency from a framework, use `singleSelect=label` where 'label' is the tag you want the select button to have. ex: Add, Select, Import. Best used with `view=true`.

    ex:
    https://cassproject.github.io/cass-editor/index.html?singleSelect=Select

## Select relations and competencies in frameworks
If your app needs the ability to select a single competency and the relations associated, use `selectRelations=true` along with `select`.

    ex:
    https://cassproject.github.io/cass-editor/index.html?select=Add&selectRelation=true

## Trigger select functionality from the parent frame
If your app needs the ability trigger the select action from outside of the cass-editor iframe, send the iframe the postMessage `{"message":"select"}`. Additionally, if you wish to hide the select button and use one on your page instead, use `select=` without a value.
    
    ex:
    https://cassproject.github.io/cass-editor/index.html?select=

## Add new framework
By default, the cass-editor provides a framework browser to select and edit frameworks. To start with a workflow of creating a framework, use `action=add`. This will expose the framework creation and import pages.

    ex:
    https://cassproject.github.io/cass-editor/index.html?action=add
    
## Import new framework
To jump directly to the import option of the above add menu, use `action=import`. This will expose the import page.

    ex:
    https://cassproject.github.io/cass-editor/index.html?action=import
    
## Edit a specific framework
If you have a specific framework you are directing your users to edit or view, you can force the cass-editor to only show that framework by using `frameworkId=<url identifier of framework>`

    ex:
    https://cassproject.github.io/cass-editor/index.html?frameworkId=https://dev.cassproject.org/api/data/schema.cassproject.org.0.3.Framework/e17ad428-e27e-4265-b2ec-782fe7cd81e1
    
## Select a specific competency
If you have a specific competency you are directing your users to edit or view, you can force the cass-editor to select that competency using `competencyId=<url identifier of competency>`. Must be used in conjunction with `frameworkId=<url identifier of framework>`

    ex:
    https://cassproject.github.io/cass-editor/index.html?frameworkId=https://dev.cassproject.org/api/custom/data/schema.cassproject.org.0.2.Framework/76ffff33-bd15-4bf3-a007-4ce247d2216d&competencyId=https://dev.cassproject.org/api/custom/data/schema.cassproject.org.0.2.Competency/onet:1.A.1.a.1
    
## Highlighting one or more specific competencies
If you wish to highlight one or more competencies, you can force the cass-editor to highlight that competency using a postMessage. It is suggested this be used in conjunction with `frameworkId=<url identifier of framework>`

	document.getElementById("iframe").contentWindow.postMessage({
		"message": "highlightedCompetencies",
		"competencies": ["@id of competency", "@id of competency", "@id of competency"]
	}, window.location.origin);
	
	or ex:
	https://cassproject.github.io/cass-editor/index.html?frameworkId=https://sandbox.credentialengineregistry.org/resources/ce-b454a3b4-ae5f-4e41-9ce1-f4b4f1776a79&highlightCompetency=https://army.mil/task/081-833-0197&highlightCompetency=https://army.mil/task/081-835-3010
			
## Expose URL links
If your users need the URLs for each framework or resource they are editing, you can enable link-showing by using `link=true`

    ex:
    https://cassproject.github.io/cass-editor/index.html?frameworkId=https://dev.cassproject.org/api/data/schema.cassproject.org.0.3.Framework/fd9dbdae-6b10-46da-8256-1458b448bfab&link=true
    
## Filtering frameworks by an additional search query.
If you are limiting users to seeing only a set of frameworks that can be described by a search query, you can add an additional search query to the initial framework search by using `filter=<search query>`.

    ex:
    https://cassproject.github.io/cass-editor/index.html?filter=@id:case.georgiastandards.org

## Generate and manage a local user.
CASS can create and manage a local user that owns the frameworks and competencies they create. The user credentials will be stored in HTML5 LocalStorage and unique per individual. To enable this functionality, use `user=self`.
  
  Note: This method is risky, as a user that clears their localstorage will lose access to their frameworks and competencies.
  
## Operate using a provided set of user credentials.
CASS can operate using credentials provided by the parent site. These credentials are passed into the iframe via a message, in order to avoid transmitting them over HTTP. Use `user=wait`, and pass a RSA-OAEP 2048 bit PEM private key in via:

    document.getElementById("iframe").contentWindow.postMessage(
      JSON.stringify({action:"identity",identity:privateKey}),
      window.location.origin
    );
    
## Provide templates for frameworks and competencies.
The cass-editor can be populated with templates that set initial properties of new competencies and frameworks. These templates are passed into the iframe via a message. To specify:

    document.getElementById("iframe").contentWindow.postMessage(
      JSON.stringify({
        action: "template",
        competency: {
            "http://bogus/property": "woo"
        },
        framework: {
            "http://bogus/property": "woo"
        }
      }),
      window.location.origin
    );
  
## Only show frameworks that individual owns.
Along with user credentials, the cass-editor can be configured to not show others' frameworks. This functionality can be enabled by the URL parameter `show=mine`.

## Only show concept schemes that individual owns.
When linking a concept to a competency, the cass-editor can be configured to not show others' concept schemes. This functionality can be enabled by the URL parameter `conceptShow=mine`.

## Use canonical identifiers.
CASS supports the storage of objects where the @id parameter does not refer to the object in CASS.

cass-editor can be configured via the `newObjectEndpoint` to create and edit objects with `@id` URIs or objects located outside of CASS.

As an example, if `newObjectEndpoint=http://not.here/` and a new framework is created, the `@id` of the framework will be `http://not.here/<generated UUID>`.

Additionally:
-  This disables access to versioned objects, as versions will not be exposed (though versions are being stored).
-  This option operates across imports where canonical @ids are not defined, CSV imports, etc.

# Alternate Schema
The cass-editor can orient towards either a basic CASS schema or a Credential Engine CTDL-ASN schema.

-  `ceasnDataFields=true` enables and renames fields to accompany the CTDL-ASN fields. Many of these fields map to schema.org properties, but some map only to CTDL-ASN properties.

# Overrides
The cass-editor can be overridden to assist in cross domain, iframe, and web socket connection issues.

-  `editorRoot=<relative or absolute path>` helps any recursive iframes locate the root of the cass-editor. Examples include '/cass-editor/' or 'https://cassproject.github.io/cass-editor/'
-  `webSocketOverride` helps the cass-editor connect to the websocket of CASS in case a reverse proxy is misbehaving when handling websockets (Looking at you, IIS.)

# Events
The cass-editor can send events when various operations occur.

To bind the cass-editor from the parent page, use the following code:

    window.addEventListener('message', iframeMessage, false);

	function iframeMessage(event) {
		//check the origin, to make sure it comes from a trusted source.
		if (false && event.origin !== window.location.origin)
			return;
		alert("I got " + event.data.selected.length + " selected items from the iframe");
	}

To ensure the iframe is passing the correct origin, pass the origin into the iframe using a URL parameter, `origin=originUrl`.

### On Selected (`select=Add`):

    event.data.message == "selected"
    event.data.selected == [uri,uri,uri]
    or, if selectVerbose is on, event.data.selected == [{Competency},{Competency},{Competency}] and event.data.selectedFramework == {Framework}

### On Clicked, On Changed, View Changes:

    Changes when frameworks or competencies are clicked, changed, or the internal editor view changes are passed to the parent page. The mesasge types are `viewChanged`, `frameworkChanged`, `frameworkClicked`, `competencyChanged`, `competencyClicked`. See the console for additional fields that are passed.

### Export:
To export, send the iframe a message to export using a particular format.
```javascript
$("iframe")[0].contentWindow.postMessage({action:"export",schema:"ceasn"},window.location.origin);
```
You will receive in the parent page an event:
```javascript
message.data ~= {
    action: "response",
    message: "export",
    schema: "<schema>",
    format: "<format mimetype>",
    data: "<data in JSON if JSON-compatible, string if not JSON compatible."
}
```
Acceptable schemas are: "cass","cassn4","cass","cassrdfjson","cassrdfxml","cassturtle","ctdlasn","asn","case".

### Set Data Helper:
To set some data in an object:
```javascript
$("iframe")[0].contentWindow.postMessage(
  {
   action:"set", 
   id:"https://id of the object to set",
   key1:value1,
   key2:value2
  }
,window.location.origin);
```
A response event will be sent: "setOk","setFail" after the save is attempted.

# Validation
Most fields are not validated beyond the input type assigned to them. URLs, drop downs, datetimes and selectors all have inbuilt validation. The datetime format being used is ISO 8601. The user is prevented from saving invalid date. To change the behavior to warn the user if they are saving invalid data, set `allowValidationBypass=true`.

# Keyboard Shortcuts
&uarr; & &darr; - Navigate up and down the list of frameworks and competencies.  
&larr; & &rarr; - Expand and contract nested competencies.  
Enter - Select the current element.  
Shift + Enter - Select all.  
Backspace - Go back.  
Tab - Switch focus between the buttons and text fields on the page.  
Escape - Return to list navigation.  
Shift + X - Drag competency  
Shift + C - Drag and copy competency  
Shift + V - Drop competency  
Shift + U - Unlink competency  
Shift + &uarr; & Shift + &darr; - Move competency up and down in the list.
