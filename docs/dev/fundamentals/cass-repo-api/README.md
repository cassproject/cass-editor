# Overview

These pages describe the **CaSS Repository**, an object repository used to store objects in CaSS. The CaSS repository stores objects as **JSON-LD** compatible with [Schema.org](https://schema.org/) and [CTDL](https://credreg.net/). The objects stored in the CaSS repository include, but are not limited to:

> * Competencies and Competency Frameworks
> * Roll-up rules (relating competence in a target competency/performance level to competence in a set of other competencies/performance levels)
> * Performance levels (which are separate objects but are tied to specific competencies)
> * Competency Assertions (stating that individuals hold competencies at particular performance levels)
> * Alignment objects that associate resources with competencies

Future versions may also include an extended set of objects that applications can use to define competency-based goals and learning paths.

The CaSS repository implements and supports a security and authentication framework called [Key-based Access Control (KBAC)](/dev/security/kbac-specification/). Use of this framework is optional but is recommended for implementations that require security and and that enforce privacy policies. If objects are stored with security, then the repository enforces security rules around the use of the data.

Permissions are set by the creator of a piece of data
* If the data is created with no owner, then it has no rights and may freely be read, modified or deleted. No security rules are enforced for these objects.
* If the data is created with one or more owners, then only the owners may modify or delete the data. Anyone may discover or read the data. This is the typical protection level of public data such as frameworks, competencies, etc.
* If the data is encrypted, then only the owners or readers may discover or view the data, and only owners may modify or delete the data. Assertions and other learner data use this permission level heavily.
* A server administrator may delete any piece of data.

Specifically, these pages describe the specific REST web service APIs and business logic required to enable the repository to communicate over the internet.

## How to Read this Document

This document describes the existing CaSS Repository as a series of use cases or recipes and assumes understanding of KBAC, HTTP, JSON, JSON-LD, RSA Cryptography, and any other associated technologies. The steps and associated examples should be used when attempting to accomplish specific coding tasks.

## Definitions

* **Object:** A JSON-LD Object
* **Repository:** The CaSS Repository
* **Endpoint:** The domain name and additional URL path (if exists) to reach the CaSS Repository