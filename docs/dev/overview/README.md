# Overview

The CASS Project encompasses a ground-to-cloud effort to build an open source system for managing and tracking human competence and competencies using Permissible [Open Linked Data](https://www.w3.org/standards/semanticweb/data).

* **Data** - CASS is data driven. There are very few Web Service APIs. Most of the functionality is located in the CASS Javascript Library. CASS data is stored in a repository similar to a [NoSQL](https://hostingdata.co.uk/nosql-database/) database.
* **Linked** - CASS objects use URLs as IDs. References to these objects can be made by using the object’s ID/URL.  Because of the nature of URLs, CASS objects can be uniquely identified across the globe.
* **Open** - By default, all CASS data is public. Firewalls, whitelists, and other means are available to prevent this.
* **Permissible** - CASS objects are permissioned through use of Public Key Infrastructure. Entities (systems, users, apps) are identified by independently verifiable, signed, public keys. Read permission is controlled via the use of encryption.

## Technologies

### Client-Side (Reference Implementation)

* [CaSS Authoring Tool](https://github.com/cassproject/cass-editor)
    * [CaSS Javascript Library](https://github.com/cassproject/CASS/tree/master/src/main/js/cass)
    * [vue.js](https://vuejs.org/)

### Server-Side

* [Node Process, managed by PM2] ([PM2](https://pm2.keymetrics.io/) on port 8080)
    * [CaSS Javascript Library](https://github.com/cassproject/cass-npm)
    * [CaSS Repository] (https://github.com/cassproject/CASS)

## Data Model

The CaSS schema is available [here](http://schema.cassproject.org/).

### CaSS Javascript Library

The [CaSS Javascript Library](https://github.com/cassproject/cass-npm) is the easiest way to work with CaSS. It provides the code necessary to utilize all CaSS objects (not strictly necessary in very simple cases).

### CaSS Repository (SkyRepo)

The CaSS Repository is a [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) based [JSON-LD](https://json-ld.org/) object store with *CRUD*, *Search*, *Permissioning*, and *Basic* Identity Management functionality. It includes an extensible plugin infrastructure.
* SkyRepo attempts to follow RESTful HTTP best practices.
    * The ```GET``` operation is used to perform a **READ**
    * The ```POST``` and ```PUT``` operations will **CREATE** or **UPDATE** an object
    * The ```DELETE``` operation will **DELETE** an object
* Search is available using the ```?q=<search query>``` format and follows ElasticSearch Simple Query Strings guidelines.
* Permissioning is applied for every query. Authentic requests are validated through the verification of “Signature Sheets” (a form of signed nonce+timestamp token sent with the request). OAuth-based permissioning is currently in development.
    * Encrypted objects are not returned without a valid signature sheet from an object owner or reader.
    * Objects, if owned, may not be updated without a valid signature sheet from the current object owner.
    * Objects, if owned, may not be deleted without a valid signature sheet from the current object owner.
    * Encrypted objects may be decrypted through use of the private key of one of the owners or readers.
    * Encrypted objects may be created through the use of a public key of the intended owner.
* Basic Identity Management is a hashed username and hashed password based store for private keys. By default, CaSS Keys are generated client side and encrypted with a combination of the clear text username and password. As a result, the server owner does not have the capability to manage or recover a user’s keys.

::: tip
We encourage people to use a different identity management system.
:::

## Looking Around

For a more hands-on approach to understanding the specifics of CaSS, we should take a look at some data directly through your browser.

::: tip
All data may be accessed by your browser.
:::

1. Navigate [here](https://cassproject.github.io/cass-editor/) in a new tab, open up a framework (like O*NET Expanded) and click the [URL](https://sandbox.cassproject.org/api/custom/data/schema.cassproject.org.0.2.Framework/ce4c0e41-f24c-407d-95af-047bfee429bf) under the description.
2. You will then see the JSON-LD representation of the Competency Framework.
3. Under ‘*competency*’, there are many URL's. Click one to navigate to that competency.
4. Here, you will see fields like '*name*' and '*description*'. These, as you would expect, are properties of the object according to the schema defined at ```@context```.
5. ```*@id```, ```@context```, and ```@type``` are properties of the JSON-LD format.
6. ```@owner```, ```@reader``` (if it exists) and ```@signature``` are properties of the KBAC extension to JSON-LD.
7. Everything that begins with ```@``` can be thought of to be metadata properties, and everything else is data.

If you would like to learn more about how JSON-LD works, you can visit [this tutorial series on Structured Data](http://www.linkeddatatools.com/introduction-json-ld).

Hopefully, it is easy to imagine how a browser, scripting language, or other server would take advantage of this data. But reading data is of secondary importance to being able to find it. For that, we need search.

1. Navigate here in a new tab. This performs a search query with the query being ```*```. Using [ElasticSearch Simple Query Strings](https://logz.io/blog/elasticsearch-queries/), you can query in quite a few ways.
2. First, replace ```*``` with ```Addition```. This performs a full text search for *Addition* in all fields.
3. Next, replace ```Addition``` with ```name:Addition```. This requires the term *Addition* to appear in the *name* field.
4. Next, replace ```name:Addition``` with ```tract```. This should come up with no results. By default, the search matches words, not strings segments. This can be overridden by using wildcards.
5. Try ```*tract*```. This should come up with competencies that include terms such as *subtract* and *contraction*.
6. Now try ```name:*tract* AND description:*tract*```. This will return competencies that have *tract* in both the name and description.

This can be used to construct search queries that filter based on the owner of the object, user search terms, or by type.