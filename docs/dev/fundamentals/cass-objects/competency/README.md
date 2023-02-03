# Competency

> A **Competency** is a discrete unit of competence, and is represented in CASS as an object labelled with a name, description, and other data.

Examples of competencies:
> * Running
> * Adding two numbers with two digits each
> * Repairing a solder joint
> * Installing a CASS Repository on a server

Competencies most commonly exist within a context such as an educational framework, a job role or title, or a knowledge domain. While it is possible to remove a well-described competency from this context, the context helps define the competency. There can be significant information lost when a competency is referenced outside of its framework.

To learn more about frameworks or competencies, visit the [CASS Overview](/guide/overview/).

CASS Competencies are objects distinct of the frameworks in which they exist and the relations that connect them to one another. Each Competency is referred to by a URL which acts both as a unique identifier and a locator for the data that describes the competency.

## Creation

The CASS Libraries include a competency helper object that extends Competency with additional methods.

```js
var c = new EcCompetency();

c.generateId("https://dev.cassproject.org/api/");
c.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
c.name = "Running";
c.description = "The ability of a creature to ambulate with such rapidity that more than half of the limbs involved do not touch the ground at some point in the motion.";
```

## Adding a Competency to a Framework

```js
var c = new EcCompetency();

c.generateId("https://dev.cassproject.org/api/");
c.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
c.name = "Competency 1";

f.addCompetency(c.shortId()); // Add the competency such that it will update automatically
// Alternatively...
f.addCompetency(c.id); // Add this particular version of the competency

// Don’t forget to save the framework and/or competency.
```

## Removing a Competency from a Framework

This method will also remove relations that involve the competency and levels that refer to the competency.

```js
f.removeCompetency(
    c.id, // Can also use c.shortId()
    function() {},     // Success
    function(error) {} // Failure
);
// Don’t forget to save the framework and/or delete the competency.
```

## Save

EcCompetency has a helper method that validates expected fields before saving.

```js
c.save(
    function() {},     // Success
    function(error) {} // Failure
);
```

## Delete

EcCompetency has a helper method that deletes the competency. This does NOT DELETE any objects that reference the competency.

```js
c._delete(
    function() {},     // Success
    function(error) {} // Failure
);
```

## Get

EcCompetency has a static helper method for retrieving a Competency, automatically decrypting it, automatically encrypting it on save, and casting it to the EcCompetency object. The blocking version locks the thread while this occurs.

```js
EcCompetency.get(
    url,
    function(competency) {}, // Success
    function(error) {}       // Failure
);
// Alternatively...
var c = await EcCompetency.get(url);
```

## Search

EcCompetency has a static helper method for searching for Competencies.

```js
// Searches for competencies
EcCompetency.search(
    repo,
    null,
    function(arrayOfEcCompetencies) {}, // Success
    function(error) {}                  // Failure
);
// Searches for up to 5000 competencies that have “Workforce” in the name.
EcCompetency.search(
    repo,
    "name:Workforce", // ElasticSearch Query string
    function(arrayOfEcCompetencies) {}, // Success
    function(error) {},                 // Failure
    {size:5000}
);
```