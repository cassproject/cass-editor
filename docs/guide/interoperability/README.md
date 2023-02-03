# Interoperability

## Import / Export

CaSS can interoperate with the following formats.

In CaSS, we distinguish between Importing and Registering frameworks and competencies. Importing creates a copy of a resource, changing the URI of the resource and assigning ownership to the importer. Registering acts more like a carbon copy, where all data is preserved (though the schema and format may change), including the URI. Registered objects are not intended to be modified.

| **Schema**   | **Format**                        | **Import**      | **Register**    | **Export**  |
|--------------|-----------------------------------|-----------------|-----------------|-------------|
| CaSS         | JSON-LD (native)                  | Yes             | Yes             | Yes         |
| CaSS         | Turtle, nQuads, RDF/XML           | Coming Soon     | No              | Yes (0.3)   |
| None         | CSV                               | Yes (0.2)       | Yes (0.3)       | Yes (0.2)   |
| ASN          | RDF/XML                           | Prototype (0.2) | Yes (0.3)       | Yes (0.3)   |
| CTDL+ASN     | JSON-LD                           | Yes (0.4)       | Yes (0.4)       | Yes (0.3)   |
| Medbiquitous | XML                               | Prototype (0.2) | Coming Soon     | Coming Soon |
| IMS CASE     | JSON                              | Yes (0.4)       | Prototype (0.3) | Yes (0.4)   |

## Library Integration

CaSS Libraries enable object models from other Open Linked Data providers.

**Credential Transparency Description Language**
* CaSS Libraries include the CTDL data model, and enable its use in CaSS enabled applications.

**Schema.org**
* CaSS Libraries include the Schema.org data model, and enable its use in CaSS enabled applications.

## Adapters Overview

CaSS Adapters are specialized pieces of code that provide interoperability between CaSS and other software. They exist in varying stages of completion, and each feature may be interpreted based on the following legend.
* **Future:** Planned feature.
* **Alpha:** Proven, requires code and additional configuration of CaSS to enable.
* **Beta:** Working with no planned updates. May require code and additional configure to enable.
* **Release (blank):** Working with no planned updates. Available for configuration via Competencies.us configuration.

### Achievement Standards Network
* CaSS can transparently operate using Achievement Standards Network formats, and provides endpoints for writing and reading ASN formatted frameworks.

### Credential Transparency Description Language
* CaSS can register resources stored in your CaSS instance with the Credential Engine Registry. *(Beta)*
* CaSS can import frameworks in the CTDL-ASN format and schema.
* CaSS can represent frameworks natively in the CTDL-ASN format and schema.
* CaSS can import CSV spreadsheets that describe CTDL-ASN frameworks and competencies.

### IMS Competency and Standards Exchange
* CaSS can read and register frameworks stored in a IMS CASE API enabled repository, such as OpenSALT.
* CaSS implements the IMS CASE API with the JSON-LD extension.

### IMS Open Badge
* CaSS can, when populated with profile data (name, email), expose CaSS assertions as Open Badges, and send email to recipients of these badges. *(Beta)*

### Moodle
* CaSS can synchronize competencies to and from a Moodle instance.
* CaSS can read statements of competence from Moodle and convert them into Competency Assertions. *(Future)*

### O*Net
* CaSS can read the O\*NET API and harvest Skills, Knowledge, Abilities, Work Styles, Tasks, Tools, Technologies, Work Activities, and Detailed Work Activities. *(Alpha)*

### xAPI
* CaSS can monitor an xAPI Learning Record Store and automatically create Competency Assertions when a learner passes xAPI enabled learning activities.
