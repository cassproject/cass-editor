
# Competency Property Configuration

Competency properties are the values that can be added, edited, and deleted for competency objects. Default competency properties are **id, name, description,** and **type**. Properties added here will be displayed when editing competency level objects in the framework editor.

![Competency Configuration](/competency-configuration.png)

## Property Fields

Certain property fields can be modified directly from the property list:

- **display label** - label to be displayed in form inputs for that property
- **description** - description of this property
- **display category** - category (if any) under which the property is displayed in form inputs
- **required** - property required toggle
- **display priority** - priority in which the property is displayed in form inputs (primary, secondary, or tertiary)

At the competency level the following static rules apply:

- The **id** property is _required_
- The **name** property is _required_ and has a display priority of _primary_

## Custom Competency Properties

Custom properties can be added to a competency by clicking the _add custom competency property_ button.

![Add Custom Competency Property](/add-custom-property.png)

Once clicked, the _New Competency Property_ dialogue window is displayed.

![New Competency Property](/new-competency-property.png)

### Custom Competency Property Fields

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

:::
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

###  Display Priority

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

![One Entry Per Language](/one-entry-per-language.png)

By toggling this field on, custom properties of the _range/type Lang-String_ can be limited so that only a single entry can be made per language chosen.

### Limit Values

::: tip
Only available for range/type Text
:::

When creating a custom property of _range/type Text_, you can limit the values allowed to the property. To do this, toggle the _Limit Values_ field on and click the _add_ button to begin managing the list of allowable values.

![Limit Values](/limit-values-competency.png)

For each entry in the limit values table, a _display label_ and _field value_ must be entered.

- **display label** - the label displayed to the user when selecting the value
- **field value** - the recorded value when the value is selected by the user
  - Only alphanumerics are allowed for field values

![Limit Values Enabled](/limit-values-enabled-competency.png)

## Applying the Custom Competency Property

Once complete, the new property can be applied to the framework by clicking the _apply new property_ in the lower right corner of the dialogue window.

##  Editing/Deleting Custom Competency Properties

Custom properties can be edited and deleted by selecting the appropriate action buttons to the right of the corresponding property entry in the _Competency Properties_ list.

 ![Delete Custom Properties](/competency-properties.png)

## Restrict Competency Types

By default, values for the competency _type_ property are not limited. By toggling this setting, competency types can be restricted to a list of predetermined values.

![Restrict Competency Types](/restrict-competency-types.png)

For each entry in the permitted values table, a _display label_ and _field value_ must be entered.

- **display label** - the label displayed to the user when selecting the type value
- **field value** - the recorded value when the type is selected by the user
  - Only alphanumerics are allowed for field values

![Permitted Values Table](/permitted-values.png)

## Competency Levels

By default, the level property is enabled for competency objects created in the CaSS Authoring Tool. Levels can be disabled by toggling the _allow levels_ switch.

 ![Allow Levels](/allow-levels.png)

## Level Property Fields

Level property fields can be modified from the _allow levels_ section of the competency configuration settings:

- **display label** - label to be displayed in form inputs for levels
- **description** - description of the levels property
- **display category** - category (if any) under which levels are displayed in form inputs
- **level display priority** - priority in which levels are displayed in form inputs (primary, secondary, or tertiary)

## Restrict Competency Levels

By default, levels in CaSS can be created during framework/competency editing. To restrict competencies that allow levels to a limited selection, toggle the _restrict level values_ switch and click the _manage levels_ button.

![Restrict Competency Levels](/restrict-levels.png)

### Manage Competency Levels

Clicking the _manage levels_ button displays the _select enforced levels_ dialogue screen. From here, you can select from all existing levels in CaSS or create more appropriate levels. Any previously selected levels will already be checked and can be removed from the enforced levels list by unchecking the appropriate item.

 ![Enforced Levels](/enforced-levels.png)

### Add Competency Levels

To add a new level to the available level list, click on the _add level_ button in the _select enforced levels_ dialogue window.

 ![Add Levels](/add-levels.png)

Once clicked, the _add new level_ dialogue is open. Enter the new level **name** (and optionally the new level **description** ). Clicking the _save new level_ button on the bottom right corner of the dialogue will create this level in CaSS and return you to the _select enforced levels_ dialogue.

![Add New Level Modal](/add-new-level.png)

### Apply Selected Competency Levels

Upon selecting the desired enforced levels, click the _apply selected_ button at the bottom right of the _select enforced levels_ dialog window to apply the enforced levels to competencies.

 ![Select Enforced Levels](/apply-selected.png)

## Competency Relationships Configuration

Relationships can be added as properties on competencies to define how competencies within a framework relate to each other. Enabled relationships will be available in the property drop down when editing competencies in the framework editor.

![Competnecy Relationship Configuration](/competency-relationships-configuration.png)

### Relationship Display Options

General relationship display options can be configured from the _display options section_. These include:

- **display category** - category (if any) under which relationships are displayed in form inputs
- **relationships display priority** - priority in which relationships are displayed in form inputs (primary, secondary, or tertiary)

![Relationship Display Options](/display-options.png)

### Relationship Type Management

The types of relationships available to competencies using the configuration can be managed under the _relationship types_ section. Relationship types can be enabled, disabled and relabeled.

 By default, the following relationship types are enabled:

- **isEnabledBy**
- **requires**
- **desires**
- **narrows**
- **isRelatedTo**
- **isEquivalentTo**

![Relationship Types Management](/relationship-types.png)

To reduce screen clutter, the _relationship types_ section only displays enabled relationship types. Currently enabled relationships can be disabled using the corresponding _enabled_ switch to the right of the relationship entry.

![Relationship Types Enabled Toggle](/relationship-types-enabled.png)

To add other relationship types to a configuration, click on the _manage relationships_ button on the upper right of the _relationship types_ section.

![Manage Relationships](Manage Relationships.png)

Once clicked, the _manage relationship types_ dialogue window is open. From this screen, all relationships type currently available in CaSS are categorized and displayed.

![Manage Relationship Types](/manage-relationship-types.png)

The available relationship types are as follows:

- **CaSS Default Relationships**
  - isEnabledBy
  - requires
  - desires
  - narrows
  - isRelatedTo
  - isEquivalentTo
  - broadens
  - enables
- **Achievement Standards Network Relationships**
  - majorRelated
  - minorRelated
- **GEMQ**
  - hasChild
  - isChildOf
- **Other**
  - isSimilarTo
  - isPartiallySameAs

To enable or disable a relationship type for the configuration, toggle the _enabled_ switch to the right of the corresponding type and click the _ok_ button.

##  Resource Alignment Configuration

Resource alignment terms are used to map resources such as learning material, courses, and other content to competencies in CAT. If enabled, the alignment type property will show up in the framework editor when aligning competencies to resources.

![Resource Alignemnt Configuration](/resource-alignment-configuration.png)

Currently, the CaSS Authoring Tool supports four types of resource alignments:

- **teaches** - The item being described is intended to help a person learn the competency or learning outcome defined by the referenced term
- **assesses** - The learning resource being described may be used to assess the competency being referenced
- **requires** - The competency being referenced is required in order for effective outcome of the learning resource being described
- **desires** - Knowledge of the learning resource being described is desired by the competency being referenced

Each alignment type can be enabled and disabled by toggling the _enabled_ switch to the right of each corresponding item.
