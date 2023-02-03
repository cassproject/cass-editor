# Assertion Processing

> Assertion processing is the process of answering questions about an individual based on a chosen algorithm using some amount of data.

:::tip READ ME FIRST
Be sure to read the [High-Level guide's Assertion Processing Section](/guide/assertion-processing/) for more information on this topic beforehand.
:::

This page will discuss how to process collections of CaSS Assertions, which will be attached to some CaSS Competencies as well as Identitites.

## Types of Processors

There are currently two types of assertion processors and three co-processors.

:::tip Built-in Processors
1. *OptimisticQuadnaryAssertionProcessor*
2. *PessimisticQuadnaryAssertionProcessor*
:::

The **OptimisticQuadnaryAssertionProcessor** object answers the question

> “Does Learner L have Competency C based on an optimistic view of competence?”

The optimistic view states that if the following framework exists

> **Basic Arithmetic**
> * Addition *(narrowing Basic Arithmetic via a relation)*
> * Subtraction *(narrowing Basic Arithmetic via a relation)*
> * Multiplication *(narrowing Basic Arithmetic via a relation)*
> * Division *(narrowing Basic Arithmetic via a relation)*

and someone has assertions for *Addition, Subtraction, Multiplication,* and *Division*, that they have Basic Arithmetic.

The pessimistic view taken by the **PessimisticQuadnaryAssertionProcessor** object does not make this assumption, instead believing that Basic Arithmetic could have additional competence that has not been modeled in CaSS.

Both processors are Quadnary Processors.

:::tip Quadnary Processor
Can return four answers:
1. Yes
2. No
3. Indeterminate *(conflicting evidence)*
4. Unknown *(not enough information)*
:::

Assertion Processors interpret knowledge encoded in relationships to make additional inferences about frameworks. As an example, if someone has an assertion for Basic Arithmetic, it is assumed they have Addition. Additionally, if they have a negative assertion stating they do not have Addition, that they do not have Basic Arithmetic.

Similarly, if Subtraction requires Addition, and there is a negative assertion about Addition, they cannot have Subtraction. If there is a positive assertion about Subtraction, then it is presumed they have Addition.

**Equivalence** is also observed.

## Identity, Scope, and Access

The type of assertion processor determines the assumptions that are made in computing some assertion, but scope, identity and access also have factors in making these decisions.

When launching an assertion processor, you should provide all known identities for the individual, all frameworks that your institution observes, and all servers that the individual has records on. Finally, if you do not have access to the necessary records, you may receive results that do not align with reality. The individual, with all their identities, has the best visibility into their competence.

## Running an Assertion Processor

The below code runs the assertion processor with one identity, targeting one competency in one framework,

```js
var ep = new PessimisticQuadnaryAssertionProcessor();

ep.logFunction = function(data) {
    console.log(data);
};
ep.repositories.push(repo);
var subject = new Array();
subject.push(target);
var additionalSignatures = null;
ep.has(
    subject,
    competency,
    level,
    framework,
    additionalSignatures,
    function (success) { console.log(success); },
    function (ask)     { console.log(ask);     },
    function (failure) { console.log(failure); }
);
```

## Co-Processors

A Co-Processor is a processor that can be tacked onto an assertion processor to augment its processing capabilities.

One example of this is a co-processor that generates assertions of competence based on certificates that the person has. Another may query a third party system for learner data that is then converted into competency assertions.

Extending the class ```AssertionCoprocessor``` can expose this capability.