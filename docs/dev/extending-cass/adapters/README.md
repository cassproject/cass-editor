# Adapters

**Adapters** may also be referred to as **Application APIs**.

If the notion of client-side security makes you queasy, or you simply want to own all the data, but still want to operate with CASS, there are options available.

It is possible, in CASS, to extend the capabilities of the CASS Repository with additional web service endpoints and functionality. These are known in the CASS Ecosystem as adapters, and provide server-side interoperability for other services or endpoints.

Some examples of existing Adapters:
* **ASN Adapter** for converting automatically between Achievement Standards Network Competency Schema and CASS Schema.
* **JSON-LD Adapter** for ingesting Named Graphs of objects and exposing them in a CASS Repository.
* **Moodle Adapter** for synchronizing competencies with the Moodle LMS.
* **xAPI Adapter** for automatically converting Completed or Passed statements into assertions of competence.

Read the attached sub-pages for more depth on each existing adapters.

Adapters run on the CASS Repository, a Node.js server. They may be written in Javascript.

Examples of the above adapters can be found [here](https://github.com/cassproject/CASS/tree/master/src/main/resources/c-adapter).

## Intermediate APIs

If your stack is fundamentally incompatible with CASS, or you wish to centralize security and CASS operations, a common method is to create an intermediate server that invokes CASS operations based on database entries, web services, or other invocation methods.

The CASS Library is compatible with **Node.js**, a Javascript platform capable of serving web services and interoperating with other technology. These intermediate APIs provide a clean separation between CASS and other systems.

### Issues

#### User Management

CASS has anonymous identifiers built into each object that enable federated and permissioned access to objects. One role of an intermediate API is to translate users internal to your system into these identifiers and, perhaps, manage the identities.

### Performance

Depending on the processes involved, performance of the intermediate API can become an issue, as resources may be scattered across the internet.