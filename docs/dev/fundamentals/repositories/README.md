# Repositories

CASS Repositories are servers running a **JSON-LD** object store called **SkyRepo**. CASS Repositories may also have extensions called **Adapters** that allow the repository to interoperate with other systems, standards, or APIs.

## Background

CASS Repositories are a federated solution to the problem of permissible open data management. As learners across the globe are covered by a large number of variable privacy laws, repositories for this data are needed that can protect against or enable discovery of learner data, depending on the scenario and permissions.

CASS Repositories support **RESTful CRUD** + **Search**. Through Adapters, a repository may also support APIs for individual applications; however, such an API is not presently available.

CASS Repositories support JSON-LD formatted objects. While an incredible number of formats exist, JSON-LD was chosen for its compatibility with nearly all languages, object typing, and RDF compliance.

## Repository API

The CASS Repository API can be found [here](../cass-repo-api/).

## Permissioning

CASS Repository permissioning is *NOT* role based in the traditional sense. Server administrators only have the ability to delete records, and unauthorized tampering or creation of records is protected against by the verification of the record against cryptographic signatures.

By default, record data is public.  However, two security layers have been created to protect against unauthorized viewing:
1. Records are protected by client-side encryption, preventing the server administrator or a compromised server user from viewing the data.
2. Protected data is not returned by the server without authorization in the form of a signature sheet.

CASS Repositories also support the protection of individual fields in a record. The repository scans for any object of type EncryptedValue and omits it from the response if the query did not contain a signature sheet authorization. See [Identities and Login](../identities-and-login/) for further information.

## Code

Creating an interface between your application and a repository is accomplished as follows:

1. Instantiate a Repository object and set up the endpoint.
    ```js
    var repo = new EcRepository();
    repo.selectedServer = "https://dev.cassproject.org/api/";
    ```
2. The repository may also be asked to search for the endpoint. It will automatically search for the endpoint at the location provided and in other typical locations.
    ```js
    repo.selectedServer = "http://dev.cassproject.org";
    repo.autoDetectRepository();
    ```

### Binding a new object to a repository endpoint

Every object’s identifier is the URL from which the object should be retrieved and should be stored (this is not always the case, see Aliases). This identifier may be assigned or generated.

1. Instantiate an object, and assign some properties.
    ```js
    var t = new Thing();
    t.name = "Developer Guide Test Object";
    ```
2. Create an identifier for the object by:
    * Generating it. This will create a random UUID (version 4)
        ```js
        t.generateId(repo.selectedServer);
        ```
    * Assigning it. Note that an ID must have one alpha or symbol character.
        ```js
        t.assignId(repo.selectedServer, "MyId1");
        ```
3. You may then access two forms of the ID:
    * The **Long Form** includes the version number and should be used when you need to refer to an immutable version of the object that is not subject to subsequent updates.
        ```js
        t.id;
        ```
    * The **Short Form** does not include the version number and retrieves the latest version.
        ```js
        t.shortId();
        ```
4. The ID, when subjected to an HTTP GET, should, if it has previously been saved, return the JSON-LD version of the object. (Note: This object has no owner. This means it can be modified or deleted by anyone.)
    ```js
    EcRepository.save(t, function() { window.open(t.id); }, console.log);
    ```