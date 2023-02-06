# Basics

Using the CASS Libraries, you are able to work with a number of different sets of objects, including those from CASS, Schema.org, and the Credential Engine. CASS objects have a number of additional helper methods that aren’t currently available on the objects from the other groups.

This guide assumes you have a [Repository](/dev/fundamentals/repositories/) defined and an [Identity](/dev/fundamentals/identities-and-login/).

## Overview

In general, all CASS objects follow the same inheritance model.  From [EcLinkedData](http://cassproject.github.io/CASS/docs/classes/EcLinkedData.html), additional fields and functionality are aggregated through three additional classes ([EcRemoteLinkedData](http://cassproject.github.io/CASS/docs/classes/EcRemoteLinkedData.html), [Thing](http://cassproject.github.io/CASS/docs/classes/Thing.html), and [CreativeWork](http://cassproject.github.io/CASS/docs/classes/CreativeWork.html)) until a base object class is created.  The base object class defines all fields and operations available for working with the object itself.  Another class is then created from the base object class which defines helper methods and functionality for working with the CASS environment.  This is the final CASS object class and is prefixed with ```EC```.

Example:
```
EcCompetency - (CASS object class) Methods for interacting with CASS services on a server
    -> Competency - (base object class) All fields and methods needed to logically define a competency
    -> CreativeWork - Customized schema.org/CreativeWork
    -> Thing - Customized schema.org/Thing
    -> EcRemoteLinkedData - Data wrapper to represent remotely hosted data including fields for permission controls, signing, identifying and locating the object
    -> EcLinkedData - Represents a JSON-LD linked data object and performs serialization
```

Most CASS objects include helper functions include helper methods for retrieving objects of that type (e.g. ```EcCompetency.get()```).  However, when using the [EcRepository](http://cassproject.github.io/CASS/docs/classes/EcRepository.html) object to retrieve data (through ```.get()``` and ```.multiget()```), all objects are returned as ```EcRemoteLinkedData``` types and must be cast into the proper CASS object.

## Instantiation

In this example, we will be creating and operating on a [schema.org/Person](http://schema.org/Person) object.

```js
var p = new Person();
p.name = "Frank Franklin";
p.email = "frank@franklyfrank.fr";
```

## Internal objects vs Remote objects

An object without an Id can be thought of to be an ‘internal object’, used in intermediate calculations. To convert it to an remotely accessible object, it must be assigned a  URL.

```js
p.generateId("https://dev.cassproject.org/api/");
```

## Permissioning and Ownership

An object without an owner is considered public and can be acted on by any party that knows or can discover its URL. This may be useful for internal repositories where trust is high, but is not advised for repositories with public interfaces. To assign an owner:

```js
// Assigns the Public Key of the first identity of the logged in user as the owner
p.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
```

Adding an owner to an object informs the repository hosting the object that nobody other than the owner can modify or delete the object. Anyone may continue to read the object (though encrypted fields will be omitted for non-reader requests).

## Readers vs Owners

Adding readers to the object allows access to the object’s data, but the repository will not allow a reader to overwrite or delete an object.

To assign a reader:

```js
// Assigns the Public Key of the first contact of the logged in user as a reader
p.addReader(EcIdentityManager.default.contacts[0].pk);
```

An object may have multiple owners and multiple readers.

## Controlling read access

In our security model, no actor should trust the repository. So, revoking read access involves encrypting the object.

```js
var e = await EcEncryptedValue.toEncryptedValue(p);
```

Note that this retains and exposes some information about the person object to the repository owner to enable [Search](/dev/fundamentals/search/): The name of the object and the object type are retained. If you would like to remove those, that’s quite alright, but it removes the ability to search by those fields. If you would like to retain any additional fields, you may copy them from the unencrypted object to the encrypted object. This will enable search by those fields (and expose them to the repository owner).

```js
delete e.name;
delete e.encryptedType;
```

To test the effects of encryption, we need to save the object and temporarily remove our identity to see that the object is no longer accessible. The repository protects encrypted objects from discovery, and the encryption protects the object against the repository owner (or server compromise).

```js
await repo.save(e);
var myIds = EcIdentityManager.default.ids; //Saving our identities elsewhere.
EcIdentityManager.default.ids = []; //Removing them from the expected location.
EcRepository.cache = {}; //Clearing the cache.
await EcRepository.get(e.id); //Not found
EcIdentityManager.default.ids = myIds;
await EcRepository.get(e.id); //Found!
```

Now we can decrypt the object and see it is intact.

```js
var p = new Person(); //Decrypt it and cast it into the appropriate object.
p.copyFrom(await EcEncryptedValue.fromEcnryptedValue(e));
```

## Saving and Retrieving objects

An object with an ID can be saved and retrieved. Saving can be done using ```EcRepository```. It's as easy as:

```js
await EcRepository.save(p);
```

Retrieving an object using EcRepository it is a bit more complex due to issues with casting. All objects returned from EcRepository methods are of the EcRemoteLinkedData type and should be cast into their desired type before use.  This can be done using the following pattern:  First, get the object:

```js
var r = await EcRepository.get(p.id);
```

Alternatively,

```js
var r = await EcRepository.get(p.id);
```

Then, it needs to be “*cast*” into the desired object.

```js
p = new Person();
p.copyFrom(r);
```

All properties of the object are accessible from its *EcRemoteLinkedData* data form ‘r’, however, helper functions that exist in the object won’t be available. This is particularly useful for ```Competency -> EcCompetency```, ```Framework -> EcFramework```, etc.

## Versioning

Upon save, an object’s version number (the last segment of the ```@id```) is set to *the current UTC timestamp in milliseconds*. This can be used as a last-modified indicator as well as a version number. Versions of an object other than the latest are not discoverable unless they are linked from other objects.

Versions of objects exist to allow for immutable referencing of an object. As an example, if a person answers a question, it is relevant that they answered a particular version of a question with a particular version of an answer.

To access the identifier with the version number included:

```js
p.id;
```

To access the identifier that pertains to the latest version of the object:

```js
p.shortId();
```

## Validating an object

You may validate one or more signatures against one or more owners using the following:

```js
p.verify(); // Returns whether the object is valid.
```

## Controller (Coming Soon)

A controller is allowed to modify who can read the object, but not any other information.

## Guidelines

In building any custom implementation, we recommend the following:

* Keep objects as flat as possible, and refer to other objects via their ID. This promotes data reuse.
* All objects should be owned by the person who created the data. There should be a separate owner for each level of organizational hierarchy (*e.g. person, school, school district, state*).
* All objects should be readable by the people to whom the data pertains. If no keys exist for that person, it is acceptable to create keys on their behalf and give them the private portion upon next interaction (or email them).
* Any objects containing personally identifiable information should be read-restricted unless the subject of the data wishes it to be public. This not only follows privacy laws such as FERPA, but it is also a common courtesy.
* To enable research, any non-personally identifiable information should be publicly discoverable and accessible.