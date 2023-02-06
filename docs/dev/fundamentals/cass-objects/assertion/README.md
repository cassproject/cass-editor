# Assertion

> An **Assertion** is a declaration by one party that another party can perform a competency at a level with some confidence, made at a point in time, limited to some timespan, and backed up by the attached evidence.

Some examples are:
> * A test taking application asks an individual a question and they get the question right. The question is associated with a competency. The application makes an assertion that the individual can perform the competency associated with the question for one month, and attaches both the question and answer as evidence.
> * A supervisor observes a worker tig welding two pieces of metal together. The supervisor asserts that the worker is competent in TIG welding for six months, and attaches both a picture of the weld and a video of the worker welding as evidence.
> * An individual asserts that they are able to add two two-digit numbers, and attaches a picture of a piece of paper showing the work.

Assertions of competence are sensitive pieces of information, as they record the capabilities of an individual. Under law in the United States, this classifies them in certain cases as Educational Data and subjects them to privacy law. Many of the security and privacy features of CASS were developed to protect this data.

CASS Assertions use the following patterns to facilitate that protection:
* The **Agent** (creator of the assertion) will own the assertion.
* The **Subject** of the assertion will be able to read the assertion.
* All *Personally-Identifiable Information* (PII) will be read restricted to these two parties.
    * Parties may be given read permission by the subject by including the assertion in an Assertion Envelope, which provides security credentials to a third party.
* All non-identifying information will be publicly accessible for use in statistics.

To learn more about frameworks, competencies, and assertions, visit the [CASS Overview](/guide/overview/).

## Creation

:::warning
Because encryption occurs during the creation of the assertion, it is necessary to follow a strict order of operations when creating an Assertion.
:::

```js
var agent = EcIdentityManager.default.ids[0].ppk.toPk();
var subject = EcIdentityManager.default.contacts[0].pk;
// Alternatively, use this if you do not have any contacts in your Identity Manager
var subject = agent;

var a = new EcAssertion();
a.generateId("https://dev.cassproject.org/api/");
a.addOwner(agent);
await a.setSubject(subject);
await a.setAgent(agent);
a.setCompetency("https://sandbox.cassproject.org/api/custom/data/schema.cassproject.org.0.2.Competency/6bcb0d3f-fa6b-4aa2-b111-92ddecb9a2a8");
a.setLevel("https://sandbox.cassproject.org/api/custom/data/schema.cassproject.org.0.2.Level/99efb8ee-e04d-44df-9a33-8da28bb889e9");
a.setConfidence(0.85); // How confident, from 0-1, is the agent in this assertion?
await a.setAssertionDate(Date.now()); // UTC Milliseconds
await a.setExpirationDate(Date.now()+1000*60*60*24*30); // UTC Milliseconds, 30 days in the future.
await a.setDecayFunction("t"); // Decays linearly with time. Could also be t^2 or sqrt(t)
await a.setNegative(false); // This is an assertion that an individual *can* do something, not that they *cannot*.
await a.setEvidence(["I saw them do it."]) // An array of evidence is required. Any string (URLs for instance) will do.
```

It is worthwhile to examine the object to see what fields are protected and what fields are not. The choices were made to protect the subject of the assertion, not the agent of the assertion.

## Examining the security mechanisms

Similar to the Working with Objects section, we will examine the security and privacy mechanisms in place. Run each of these blocks of code independently.

```js
EcRepository.save(a, console.log, console.error);

var myIds = EcIdentityManager.default.ids; // Saving our identities elsewhere.
EcIdentityManager.default.ids = []; // Removing them from the expected location.
EcRepository.cache = {}; // Clearing the cache.
await EcRepository.get(a.id); // Limited Data

EcRepository.cache = {}; // Clearing the cache.
EcIdentityManager.default.ids = myIds; // Restore our identities
await EcRepository.get(a.id); // Full Data
```

What should be apparent is that read restricted data is not returned by the server, even if it is a field in an object, without appropriate identification.

## Reading

Because decryption is a component of reading an assertion, both synchronous and asynchronous versions of each read method exist.

```js
// Synchronous Reading

var a = new EcAssertion();
a.copyFrom(await EcRepository.get(a.id));

console.log(a.competency);
console.log(a.level);
console.log(a.confidence);

console.log(await a.getAgent()); // These getters automatically decrypt the data.
console.log(await a.getAgentName()); // Retrieves the agent’s name from EcIdentityManager, if available.
console.log(await a.getSubject());
console.log(await a.getSubjectName());
console.log(await a.getNegative());

console.log(await a.getAssertionDate());
console.log(await a.getExpirationDate());
console.log(await a.getDecayFunction());

console.log(a.getEvidenceCount());
console.log(await a.getEvidence(0));
```

All asynchronous versions have success and failure callbacks.

```js
// Asynchronous Reading

a.getAgentAsync(function(agent) {}, console.error)); // These getters automatically decrypt the data.
a.getAgentNameAsync(function(agentName) {}, console.error)); // Retrieves the agent’s name from EcIdentityManager, ifavailable.
a.getSubject(function(subject) {}, console.error);
a.getSubjectName(function(subjectName) {}, console.error);
a.getNegative(function(negative) {}, console.error);

a.getAssertionDate(function(assertionDate) {}, console.error);
a.getExpirationDate(function(expirationDate) {}, console.error);
a.getDecayFunction(function(decayFunction) {}, console.error);

a.getEvidenceCount();
a.getEvidence(0, function(evidence) {}, console.error);
```

## Save

EcAssertion has a helper method that validates expected fields before saving.

```js
a.save(function(success) {}, function(error) {});
```

## Get

EcAssertion has a static helper method for retrieving an assertion and casting it to the EcAssertion object.

```js
EcAssertion.get(url, function(competency) {}, function(error) {});
```

## Search

EcAssertion has a static helper method for searching for Competencies.

```js
// Searches for competencies
EcAssertion.search(
    repo,
    null,
    function(arrayOfEcAssertions) {},
    function(error) {}
);
// Searches for up to 5000 competencies that have perfect confidence
EcAssertion.search(
    repo,
    "confidence:1.0",
    function(arrayOfEcAssertions) {},
    function(error) {},
    {size:5000}
);
```