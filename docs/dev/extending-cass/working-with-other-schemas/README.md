# Other Schemas

This page discusses how to work with other outside schemas.

CaSS Libraries includes [schemata for schema.org](http://cassproject.github.io/CASS/docs/modules/org.schema.html) and [schemata for the Credential Engine (CTDL)](http://cassproject.github.io/CASS/docs/modules/org.credentialengine.html).  These expose large numbers of objects that are not related to competencies and frameworks and are included for convenience and to encourage interoperability.

Additionally, CaSS schemas may be extended with additional information. These same principles apply.

## Concerns

While working with these other objects, several additional concerns must be taken into account:
* CaSS objects (usually prefixed with ```Ec``` such as ```EcAssertion```) have helper functions and security/privacy expectations built into them. Though they may reference personally identifiable and sensitive information these mechanisms may not be built into objects belonging to another schema. It is extremely important to safeguard the security and privacy of the data contained within these objects, as by default, all information stored in CaSS is publicly discoverable and accessible.
* When performing operations that generate data that is accessible to the internet, it is worthwhile to scan for other uses of the objects you have chosen and determine its compatibility with other others. Guidelines can be found at [Google](https://developers.google.com/search/docs/data-types/articles), and in so-called “Profiles” such as this one from [IBM](https://www.ibm.com/developerworks/rational/library/basic-profile-linked-data/index.html). Profiles can vary widely in scope and application but have been described as patterns of behavior around the population and use of common data objects for interoperability purposes. Profiles can also be found associated with [other efforts](http://datainteroperability.org/research-activity-xapi-data-interoperability/xapi-profiles/).

## Advantages

Using the patterns of application development that CaSS enables the sharing of permissioned objects, cooperative data interaction, and rapid application development.

## Future

We expect that at some point in the future, the CaSS methodology will be generalized into its own set of frameworks with its own name.