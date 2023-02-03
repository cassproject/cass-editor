# Level

> A **Level** is defined as a “a position on a real or imaginary scale of amount, quantity, extent, or quality.” In education, levels also have multiple meanings:
> * A level can represent a group of assumed knowledge, understanding, and ability to apply. For the subject area of carpentry, a beginner carpenter knows some set of skills, an intermediate carpenter knows more, and a master carpenter knows more. Because this level includes the acquisition of, and relationships to additional skills, this is typically represented by a separate competency.
> * A level can also represent a degree of performance. As the breadth of knowledge for an carpenter grows, so does their speed, quality, and understanding in a skill, knowledge, or ability. This can be thought of as a performance level, and is the type of level we typically identify in CASS.

Levels in CASS are used to make competencies measurable. Where a competency in walking may imply the ability to move, the performance levels that a shrimp and gazelle can demonstrate distinguish their capabilities greatly. Likewise, Bloom’s levels differentiate performance in skills and capability to apply knowledge.

Levels may be strongly coupled to the competencies that they measure, as in the speed an individual can run, but may also be generally applied, as in Bloom’s levels.

## Creation

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
f.addCompetency(c.shortId());
f.addLevel(l.shortId()); // Add the level such that it will update automatically
// Don’t forget to save!
```

## Removing a Level from a Framework

```js
f.removeLevel(l.id);
// Don’t forget to save the framework and/or delete the level!
```

## Save

EcLevel has a helper method that validates expected fields before saving.

```js
l.save(function() {}, function(error) {});
```

## Delete

EcLevel has a helper method that deletes the level. This does NOT DELETE any objects referenced by the level.

```js
l._delete(function() {}, function(error) {});
```

## Get

EcLevel has a static helper method for retrieving a level, automatically decrypting it, automatically encrypting it on save, and casting it to the EcLevel object. The blocking version locks the thread while this occurs.

```js
EcLevel.get(
    url,
    function(level) {},
    function(error) {}
);
// Alternatively...
var l = await EcLevel.get(url);
```

## Search

EcLevel has a static helper method for searching for Frameworks.

```js
// Searches for levels
EcLevel.search(
    repo,
    null,
    function(arrayOfEcLevels) {},
    function(error) {}
);
// Searches for up to 5000 levels related to a competency
EcLevel.search(
    repo,
    `competency:"${c.shortId()}"`,
    function(arrayOfEcLevels) {},
    function(error) {},
    {size:5000}
);
```