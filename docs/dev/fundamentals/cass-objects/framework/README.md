# Framework

> A **Competency Framework** is a structured collection of competencies.

Examples of Competency Frameworks:
* [O*NET Abilities](https://www.onetonline.org/find/descriptor/browse/Abilities/)
* [ASN’s Competency Index for Linked Data](http://asn.desire2learn.com/resources/D2695955)

Frameworks are typically found in PDFs, Word Docs, spreadsheets, and other formats, schemata, etc.  To learn more about frameworks or competencies, visit the [CASS Overview](/guide/overview/).

CASS can represent any competency framework as a CASS Framework.

A CASS Framework is a directed graph of competencies, the relations among them, and the criterion used to judge individual skill level at those competencies. It is easiest to think of a framework as containing competencies as nodes, relations as edges, and additional information in the form of levels and rollup rules.

Additionally, a CASS Framework does not contain objects, it merely contains references to objects. It may contain versioned references or unversioned references. By default, all operations create unversioned references which refer to the latest version.

You will notice that all references to competencies, relations, and other objects are represented as URLs. This allows frameworks to refer to competencies in the same repository, in a different framework, or on a different repository.

When processing (for instance, determining if a person holds a competency), you will use Frameworks to contextualize the process, bounding the problem to a set of competencies and relations. This is done both to make processing operate in a reasonable amount of time, and to prevent abuse by individuals who make bogus frameworks and relations.

## Creation

The CASS Libraries include a framework helper object that extends Framework with additional methods.

```js
var f = new EcFramework();
f.generateId("https://dev.cassproject.org/api/");
f.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
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
// Don’t forget to save the framework and/or competency!
```

## Removing a Competency from a Framework

This method will also remove relations that involve the competency and levels that refer to the competency.

```js
f.removeCompetency(c.id,function(success){},function(failure){}); //Can also use c.shortId()
// Don’t forget to save the framework and/or delete the competency!
```

## Adding a Relation to a Framework

```js
var c1 = new EcCompetency();
c1.generateId("https://dev.cassproject.org/api/");
c1.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
c1.name = "Competency 1";
var c2 = new EcCompetency();
c2.generateId("https://dev.cassproject.org/api/");
c2.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
c2.name = "Competency 2";
var r = new EcAlignment(); // Yes, I know. It’s not EcRelation. Coming soon.
r.generateId("https://dev.cassproject.org/api/");
r.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
r.source = c1.shortId();
r.target = c2.shortId();
r.relationType = Relation.NARROWS;
f.addCompetency(c1.shortId());
f.addCompetency(c2.shortId());
f.addRelation(r.shortId());
//Don’t forget to save these objects!
```

## Removing a Relation from a Framework

```js
f.removeRelation(r.shortId());
// Don’t forget to save!
```

## Adding a Level to a Framework

```js
var c = new EcCompetency();
c.generateId("https://dev.cassproject.org/api/");
c.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
c.name = "Running";
var l = new EcLevel();
l.generateId("https://dev.cassproject.org/api/");
l.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
l.competency = c.shortId();
l.name = "10 mph";
l.description = "The individual can run 10 miles per hour for several seconds.";
l.title = "Runner";
c.addCompetency(c.shortId()); //Add the level such that it will update automatically
f.addLevel(l.shortId()); //Add the level such that it will update automatically
// Don’t forget to save!
```

## Removing a Level from a Framework

```js
f.removeLevel(l.id);
// Don’t forget to save the framework and/or delete the level!
```

## Save

EcFramework has a helper method that validates expected fields before saving.

```js
f.save(function(success){},function(failure){});
```

## Delete

EcFramework has a helper method that deletes the framework. This does **not delete** any objects referenced by the framework.

```js
f._delete(function(success){},function(failure){});
```

## Get

EcFramework has a static helper method for retrieving a Framework, automatically decrypting it, automatically encrypting it on save, and casting it to the EcFramework object. The await version locks the thread while this occurs.

```js
EcFramework.get(url,function(framework){},function(failure){});
```

or

```js
var f = await EcFramework.get(url);
```

## Search

EcFramework has a static helper method for searching for Frameworks.

```js
// Searches for frameworks
EcFramework.search(
    repo,
    null,
    function(arrayOfEcFrameworks) {},
    function(failure) {}
);
// Searches for up to 5000 frameworks that have “Workforce” in the name.
EcFramework.search(
    repo,
    "name:Workforce",
    function(arrayOfEcFrameworks) {},
    function(failure) {},
    {size:5000}
);
```