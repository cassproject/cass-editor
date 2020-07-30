
# Configurating Framework Configuration 

Framework properties are the values that can be added, edited, and deleted for framework objects. Minimal framework properties are **id** , **name** , and **description**. Properties added here will be displayed in the framework object at the top of the framework editor view.

![Framework Configuration](/framework-properties.png)

## Property Fields

Certain property fields can be modified directly from the property list:

- **display label** - label to be displayed in form inputs for that property
- **description** - description of this property
- **display category** - category (if any) under which the property is displayed in form inputs
- **required** - property required toggle
- **display priority** - priority in which the property is displayed in form inputs (primary, secondary, or tertiary)

At the framework level the following static rules apply:

- The **id** property is _required_
- The **name** property is _required_ and has a display priority of _primary_

## Custom Framework Properties

Custom properties can be added to a framework by clicking the _add custom framework property_ button.

![Add Custom Framework Property](/add-custom-framework-property.png)

Once clicked, the _New Framework Property_ dialogue window is displayed.

![New Framework Property](/new-framework-property.png)

### Custom Framework Property Fields

Several fields must be completed in order to add the new property. Some field options (such as _range/type: Text_) allow further customization of the property.

### Context

::: warning
Only editable at the time of property creation.
:::

Custom properties in CaSS are stored as namespaced linked JSON-LD records. Because of this, all new properties must have a context. By default, all custom properties have the **CaSS v4.0** (_https://schema.cassproject.org/0.4/_) context. However, it is also possible to modify this field to the following values:

- **CTDL-ASN** - [https://purl.org/ctdlasn/terms/](https://purl.org/ctdlasn/terms/)
- **RDF Semantic Web Standards 1999** - [http://www.w3.org/1999/02/22-rdf-syntax-ns#](http://www.w3.org/1999/02/22-rdf-syntax-ns#)
- **RDF Semantic Web Standards 2000** - [http://www.w3.org/2000/01/rdf-schema#](http://www.w3.org/2000/01/rdf-schema#)
- **Key Based Authorization and Control** - [https://schema.cassproject.org/kbac/0.4/](https://schema.cassproject.org/kbac/0.4/)
- **Eduworks v3.0** - [http://schema.eduworks.com/general/0.3/](http://schema.eduworks.com/general/0.3/)
- **Schema.org** - [http://schema.org/](http://schema.org/)
- **Achievements Standard Network** - [http://purl.org/ASN/schema/core/](http://purl.org/ASN/schema/core/)
- **DCMI Elements v1.1** - [http://purl.org/dc/elements/1.1/](http://purl.org/dc/elements/1.1/)
- **DCMI Terms** - [http://purl.org/dc/terms/](http://purl.org/dc/terms/)
- **Gem v2.0** - [http://purl.org/gem/qualifiers/](http://purl.org/gem/qualifiers/)
- **Relators Scheme** - [http://www.loc.gov/loc.terms/relators/](http://www.loc.gov/loc.terms/relators/)
- **Simple Knowledge Organization System** - [http://www.w3.org/2004/02/skos/core#](http://www.w3.org/2004/02/skos/core#)

It is highly recommended to accept the default for this field unless there is an actionable reason for not doing so.

### Range/Type

::: warning
Only editable at the time of property creation.
:::

The _range/type_ field defines the property type. Certain range/types allow for further customization of the property. The following values are available for this field:

- **Lang-String** - An RDF schema lang string as defined by [http://www.w3.org/2000/01/rdf-schema#langString](http://www.w3.org/2000/01/rdf-schema#langString).
  - Selecting this value opens the _One Entry Per Language_ property field
- **URL** - A schema.org URL as defined by [http://schema.org/URL](http://schema.org/URL)
- **Text** - A schema.org Text (plain string) value as defined by [http://schema.org/Text](http://schema.org/Text)
  - Selecting this value opens the _Limit Values_ property field
- **Date-Time** - A w3.org dateTime value as defined by [http://www.w3.org/2001/XMLSchema#dateTime](http://www.w3.org/2001/XMLSchema#dateTime)
- **Date** - A dublin core date value as defined by [http://purl.org/dc/terms/date](http://purl.org/dc/terms/date)
- **SKOS Concept** - A CaSS concept value as defined by [https://schema.cassproject.org/0.4/skos/Concept](https://schema.cassproject.org/0.4/skos/Concept)

### Display Priority

The priority in which the property is displayed in form inputs (primary, secondary, or tertiary).

### Required

The property is required toggle.

### Unique Property Identifier

::: warning
Only editable at the time of property creation.
:::

The name of the property in the data record. Only alphanumerics are allowed.

### Display Label

The label to be displayed in form inputs for the property.

### Description

The description of the property.

### Display Category

The category (if any) under which the property is displayed in form inputs.

### One Entry Per Language

::: warning 
Only available for range/type Lang-String
:::

![One entry per language](/one-entry-per-language.png)

By toggling this field on, custom properties of the _range/type Lang-String_ can be limited so that only a single entry can be made per language chosen.

### Limit Values

::: warning
Only available for range/type Text
:::

When creating a custom property of _range/type Text_, you can limit the values allowed to the property. To do this, toggle the _Limit Values_ field on and click the _add_ button to begin managing the list of allowable values.

![Limit Values](/limit-values.png)

For each entry in the limit values table, a _display label_ and _field value_ must be entered.

- display label - the label displayed to the user when selecting the value
- field value - the recorded value when the value is selected by the user

![Limit Value Entries](/limit-values-framework.png)

## Applying the Custom Framework Property

Once complete, the new property can be applied to the framework by clicking the _apply new property_ in the lower right corner of the dialogue window.

## Editing/Deleting Custom Framework Properties

Custom properties can be edited and deleted by selecting the appropriate action buttons to the right of the corresponding property entry in the _Framework Properties_ list.

 ![Delete Custom Properties](/framework-configuration.png)
