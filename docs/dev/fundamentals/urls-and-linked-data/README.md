# URL's, Linked Data

Here, we'll talk about URL principles and how to use them along with linked data.

The construction of URLs for linked data is an important communicator of:
* Security (*e.g. https vs http*)
* Provenance (*e.g. hostname*)
* Categorical Information (*e.g. type*)
* Canonical Identifiers, if any

## CaSS URL Anatomy

First, let’s break down the anatomy of an automatically generated URL of a framework.

**URL**
```
https://dev.cassproject.org/api/custom/data/schema.cassproject.org.0.2.Framework/76ffff33-bd15-4bf3-a007-4ce247d2216d/1495040497868
```

**Anatomy**
|                | **Text**                              |
|:--------------:|---------------------------------------|
|  **Protocol**  | https://                              |
|  **Hostname**  | dev.cassproject.org                   |
|  **Endpoint**  | /api/custom                           |
|   **Request**  | /data                                 |
| **Type**       | /schema.cassproject.org.0.2.Framework |
| **Identifier** | /76ffff33-bd15-4bf3-a007-4ce247d2216d |
| **Version**    | /1495040497868                        |

### Protocol

* **Required**
* Denotes the protocol used to get the resource
* Indicates to the user whether the resource is being securely transmitted
    * Notionally prevents Man in the Middle Attacks (may or may not be true)

### Hostname

* **Required**
* Denotes the owner of the endpoint that is holding the resource
* Denotes the authority of the endpoint that is holding the resource

### Endpoint

* **Required**
* Indicates an endpoint to request data from that can provide other services
* May be shortened to ```/api``` with no repercussions (*version 0.3+*)

### Request

* **Required**
* Indicates the service desired
    * In this case, ‘give me the data for’
* Alternatives include adapters that transform the data to another format and schema
    * Options include:
        * ```/asn``` - *Converts the framework to an Achievement Standards Network, or ASN format*

### Type

* Indicates the type of the object
* Accelerates lookup
* Nice-to-have in situations where you want the URL to distinguish between types of objects

### Identifier

* **Required**
* Requires at least one non-numeric character (to distinguish from the version)
* Unique
* May be canonical (*e.g. onet:1.1, my_competency*)
* URN's work well here

### Version

* **Required for saving**, not required for lookup
* If specified, retrieves specific version of the object
* If not specified, retrieves latest version of the object
* If object is deleted and specified, will retrieve specific version of the object


## Important Notes

* The holder of the data (indicated by the hostname) may not be the owner of the data. Many organizations and individuals rely on third parties to store data.
* Many web browsers and tools require situationally require data to be available via secure (HTTPS) protocols. Providers such as LetsEncrypt provide cheap and easy methods of getting certificates to enable this capability.

## Shortening

When creating persistent URLs for display or use, shorter is often better. Omitting the Type & Version, and shortening the Endpoint, can reduce a URL from

```
https://dev.cassproject.org/api/data/schema.cassproject.org.0.3.Framework/dbbdc47e-a2d8-414f-8cd9-09052843bb6f/1504206795716
```

to

```https://dev.cassproject.org/api/data/dbbdc47e-a2d8-414f-8cd9-09052843bb6f```

without any degradation in behavior.

## Data Registration

Situations arise that data held elsewhere and owned by others be discoverable.

CaSS supports Data Registration, where JSON-LD data from other servers is POSTed to a CASS repository without the modification of its ```@id``` url. This data will be discoverable via search, but the registered data is not considered to be homed on the repository.

* This feature facilitates the aggregation of remote data onto servers for discovery purposes.
* Harvesting and maintenance features are not yet available.
* This feature is experimental.
* CaSS Libraries will attempt to retrieve registered data from a CaSS repository if it is not available from the source.
    * This is particularly useful when URL's are being used as URI's but do not home the data.