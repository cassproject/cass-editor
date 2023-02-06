# JSON-LD, RDF Formats

CaSS uses [JSON-LD](https://json-ld.org/) for data storage. JSON-LD is a simple, light-weight data format that's also parsable as standard JSON. It exists to provide a standard for holding '**Linked Data**' (LD), which you can think of as meaning links to data (usually in place of the data itself) as values inside standard JSON objects.

JSON-LD is a compromise between rich data modeling formats such as *Turtle* and *RDF-JSON* and the much simpler, easier to use JSON. JSON-LD has many layers of complexity that should be unwrapped slowly. This guide will discuss a few of them necessary to use CASS.

## In a Nutshell

A JSON-LD object is a JSON object that also holds
1. A type (```@type```)
2. An identifier (```@id```)

**JSON Object**
```json
{
    "name": "Bob"
}
```

**JSON-LD Object**
```json
{
    "@type":                  "http://schema.org/Person",
    "@id":                    "http://dev.cassproject.org/api/data/Bob",
    "http://schema.org/name": "Bob"
}
```

Keep in mind:
* All references to fields or objects in JSON-LD are URLs, instead of IDs or long pointers.
* A JSON-LD object should be stored and retrievable at the location indicated by its ```@id``` (commonly just ‘*id*’).
* Navigating to any URL should give you enough information to use the object.

## Context

To make life simpler, the ```@context``` field either provides something similar to a namespace or a link to a document that describes a namespace. This has the benefit of providing meaning to things like shortened fields.

```json
{
    "@context": "http://schema.cassproject.org/0.3",
    "@type":    "http://schema.org/Person",
    "@id":      "http://dev.cassproject.org/api/data/Bob",
    "name":     "Bob"
}
```

The field ‘name’ is specified by the namespace to mean ‘[http://schema.org/name](http://schema.org/name)’. These allow JSON-LD documents to be more tractable to developers.

## With Security

CASS includes an extension to JSON-LD called [KBAC](/dev/security/kbac-specification/) that provides additional meta-fields (prefixed with ```@```) that allow objects to be permissioned using Public Key Cryptography.

In short:
* The ```@owner``` field defines key-holders who can modify or delete an object
* The ```@reader``` field defines key-holders who can read an object’s hidden and encrypted fields
* The ```@signature``` field defines signatures that can be used to validate the integrity of the data

These fields can be found in any CASS object, such as [this one](https://dev.cassproject.org/api/custom/data/schema.cassproject.org.0.2.Framework/76ffff33-bd15-4bf3-a007-4ce247d2216d/1495040497868).

## Resources

JSON-LD is aligned with **RDF**, which is an advanced data modeling paradigm and methodology that will not be covered here. Reading the JSON-LD specification is a good start, but the CASS Library attempts to insulate you from RDF as much as possible.

## Other RDF Formats

Other RDF formats may be negotiated through use of the Accept header in an HTTP GET request. Supported formats are:
> text/n4
>
> text/turtle
>
> application/x-turtle
>
> application/rdf+xml
>
> application/rdf+n4