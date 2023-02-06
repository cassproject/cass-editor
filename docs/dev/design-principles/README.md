# Design Principles

:::tip READ FIRST
This page outlines the developer-related design principles in CaSS software. These are an extension of the design principles listed in the high-level guide:

[General Design Principles](/guide/overview/#design-principles)
:::

These design concepts represent positions currently taken by the CaSS Project.

## Open Linked Data

The CaSS data architecture is built upon the concepts of **Open Data** and **Linked Data**.

>**Open Data**
>
>By default, data should be available to anyone who makes a request.

>**Linked Data**
>
>References to data should be done using URLs rather than internal identifiers.

Implementation of these concepts has another effect.  If an application’s data is open, then its schema should also be open.  If schemas are open, then users of the same data should agree on the schema. This need for schema collaboration has resulted in efforts such as schema.org.

Open Data is not incompatible with personal, private, or protected information. Instead of securing all data by default, resulting in huge silos of data that would otherwise be of limited use, it requires the developer or user to understand the implications of protecting their data and to do so deliberately.

Open Linked Data creates the potential for the entire internet to act as a database for all applications, creating an information superhighway not just for documents on the web, as HTTP and HTML have done, but for data on the web, using HTTP, JSON and other formats.

CaSS embraces this concept wholly, with the goal of taking the world’s competency and competence data and increasing its value by making it accessible from anywhere, at any time.

## No Knowledge Repository

**No Knowledge** (previously '*Zero-Knowledge*') is a concept that arose in response to hacks and data breaches that continue to occur on a daily basis. No Knowledge software was invented by [SpiderOak](https://spideroak.com/about/). Adopted by developers of backup software, No Knowledge declares:
1. You shouldn’t have to blindly trust your vendors
2. When you have something worth protecting, privacy is everything
3. Your data is yours, and should always be in your control
4. Encryption should not sacrifice usability

In CaSS, partially-encrypted or wholly-encrypted data can be delivered to multiple sources with a permissioning system that persists across transmissions and ensures that the only parties with access to the data are those identified by the data. This places the burden of security back on the creator of the data and the user of the data, where we believe it belongs.

## Public Key Infrastructure

Individuals have a vested interest in keeping their educational records private, so a traditional identification scheme was not an option in CaSS. Instead, we chose a public key infrastructure to allow individuals and parties to carry multiple keys that unlock different aspects of their lives. Much like the keys on a keyring, these keys can be used to access data stored across many servers, and the keys themselves semi-anonymize the user. Further, PKI is currently in use by nearly all servers with SSL certificates and is a widely supported and understood set of practices.

## URI/URL/URN Nuances

In CaSS, objects are identified by long strings of characters called URLs. URLs (and URNs) are types of URIs.

Examples of these:
* **URL**

    ```https://dev.cassproject.org/api/data/76ffff33-bd15-4bf3-a007-4ce247d2216d```
* **URI**

    ```competencyFramework://76ffff33-bd15-4bf3-a007-4ce247d2216d```
* **URN**

    ```competencyFramework:O*NET```

URIs, URLs, and URNs can all be identifiers for the aforementioned competency frameworks. However, only a URL provides nearly any system the ability to retrieve the data referred to by the URL. This distinction is important for machine-operable data.

CaSS is capable of handling URLs that identify external resources, and the CaSS Library automatically will attempt to retrieve information from appropriate repositories.

## Standards-Based API's

CaSS attempts to adhere as closely as possible to REST and standard practices of search (e.g. ```?q=<query>```). Additionally, we seek to implement existing standards that closely adhere to the purpose of CaSS. By building and maintaining a simple custom API, and implementing several standard APIs, we hope to create a system that transparently introduces interoperability into an ecosystem prone to fragmentation.

## Descriptive, not Prescriptive

While it is generally impossible to avoid prescription in a software project, CaSS is intended to enable the widest range of interoperability for competency-based systems through the ability to describe existing competency frameworks, procedures and processes, and policies in a common fashion. Therefore, while demonstrations of CaSS may exhibit functionality (such as username and password login), that functionality is very commonly not necessary to operate CaSS and may be replaced by more or less complex systems.

This stance greatly improves the range of interoperability at the cost of conformance. The CaSS project endeavors to record and promote best practices, but does not enforce them.