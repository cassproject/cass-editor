# Performance

This page outlines performance concerns:
* Bottlenecks
* Optimizations we've implemented
* Features you can use to quicken your application

## Overview

When working with large numbers of CASS Objects, limitations of HTTP can become an issue.  Browsers allowing only 2-8 simultaneous requests to a single server, the overhead of the TCP/HTTP connection, and individual callbacks per request can all have negative performance impacts. Here we discuss some strategies and methods for improving the performance of CASS calls.

## HTTP/2

**HTTP/2** and **SPDY** are *protocols* based on HTTP that create a stream of requests over the same connection. Enabling HTTP/2 is possible on Apache and HTTPD, and is transparent to the user and developer.

:::warning
As of 2017, large volumes of requests going over HTTP/2 from Chrome to certain versions of Apache2 can still create seemingly random errors. Test this capability thoroughly.
:::

## Signatures

Signatures are generated for each request that is sent to the server.  Because this is a cryptographic function, it takes some time on both the client (to generate the signature) and the server (to validate the signature). If it is certain that the objects being retrieved are public, omitting signatures can help reduce a GET request overhead.  This can be accomplished via the following:
```js
EcIdentityManager.clearIdentities(); // Log out
EcRepository.unsigned = true; // Don’t sign any requests. Remember to turn this off.
```

## Caching

The CASS Libraries include a number of simple caches that can be used to store previously retrieved objects.

:::warning
These caches do not check the server to see if the objects or search results have been updated. This can result in outdated information.
:::

*Future: CASS now supports update streaming, which will intelligently invalidate caches in future versions.*

### Crypto Cache

When working with assertions, performance may be gained by enabling a Crypto Cache that caches decrypted data.

So this command:
```js
EcCrypto.caching = true;
```

affects methods with the pattern:
```js
EcAssertion.get*()
EcRsaOaep.decrypt()
EcRsaOaepAsync.decrypt()
EcAesCtr.decrypt()
EcAesCtrAsync.decrypt()
```

### Object Cache

The object cache stores objects by their identifier/shortId. The standard fetch techniques all check this cache.

So this command:
```js
EcRepository.caching = true;
```

affects methods with the pattern:
```js
EcRepository.get()
EcCompetency.get()
EcFramework.get()
// ...
```

### Search Cache

The search cache stores search results. So this command:
```js
EcRepository.cachingSearch = true;
```

affects methods with the pattern:
```js
EcRepository.search*()
```

## Batch Queries

Batch Queries operate faster on both the client and the server, as they require a reduced number of signatures to be generated and verified, and the server can take advantage of multithreading without additional overhead.
```js
var framework = EcRepository.getBlocking(/* ... */);
EcRepository.caching = true;
repo.precache(
    framework.competency.concat(framework.relation),
    function() {
        // Do something
    }
);
```

:::warning
Precache will only fetch resources from the repository they are being invoked on. It is prudent to use caching and to attempt to re-fetch the object before use, in case it was not returned from the precache.
:::

## Multiget

Multiget allows multiple CASS objects to be fetched with a single request.
```js
EcRepository.multiget(
    arrayOfObjectIds,
    function(arrayOfEcRemoteLinkedData) {},
    function(error) {},
    function(arrayOfEcRemoteLinkedData) {/* Cached values */}
);
```

:::warning
The multiget function is capable of returning CASS objects of multiple types with the same request.  Care should be given when working with this function to ensure all objects are of the expected type(s).
:::