
# Competency Property Configuration

Competency properties are the values that can be added, edited, and deleted for competency objects. Default competency properties are ***id, name, description,*** and ***type***. Properties added here will be displayed when editing competency level objects in the framework editor.

![Competency Configuration](/authoring/competency-configuration.png)

## Property Fields

Certain property fields can be modified directly from the property list:

- ***display label*** - label to be displayed in form inputs for that property
- ***description*** - description of this property
- ***display category*** - category (if any) under which the property is displayed in form inputs
- ***required*** - property required toggle
- ***display priority*** - priority in which the property is displayed in form inputs
    - *primary, secondary, or tertiary*

At the competency level the following static rules apply:

- The ***id*** property is *required*
- The ***name*** property is *required* and has a display priority of *primary*

## Custom Competency Properties

Custom properties can be added to a competency by clicking the ***add custom competency property*** button.

![Add Custom Competency Property](/authoring/add-custom-property.png)

Once clicked, the ***New Competency Property*** dialogue window is displayed.

![New Competency Property](/authoring/new-competency-property.png)

### Custom Competency Property Fields

Several fields must be completed in order to add the new property. Some field options (such as ***range/type: Text***) allow further customization of the property.

### Context

::: warning
Only editable at the time of property creation.
:::

Custom properties in CaSS are stored as namespaced linked JSON-LD records. Because of this, all new properties must have a context. By default, all custom properties have the **CaSS v4.0** [\[schema\]](https://schema.cassproject.org/0.4/) context. However, it is also possible to modify this field to the following values:

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
This is only editable at the time of property creation.
:::

The ***range/type*** field defines the property type. Certain *range/types* allow for further customization of the property. The following values are available for this field:

- **Lang-String** - An RDF schema lang string as defined by [http://www.w3.org/2000/01/rdf-schema#langString](http://www.w3.org/2000/01/rdf-schema#langString).
  - Selecting this value opens the _One Entry Per Language_ property field
- **URL** - A schema.org URL as defined by [http://schema.org/URL](http://schema.org/URL)
- **Text** - A schema.org Text (plain string) value as defined by [http://schema.org/Text](http://schema.org/Text)
  - Selecting this value opens the _Limit Values_ property field
- **Date-Time** - A w3.org dateTime value as defined by [http://www.w3.org/2001/XMLSchema#dateTime](http://www.w3.org/2001/XMLSchema#dateTime)
- **Date** - A dublin core date value as defined by [http://purl.org/dc/terms/date](http://purl.org/dc/terms/date)
- **SKOS Concept** - A CaSS concept value as defined by [https://schema.cassproject.org/0.4/skos/Concept](https://schema.cassproject.org/0.4/skos/Concept)
- **Competency** - A CaSS competency ID

###  Display Priority

The priority in which the property is displayed in form inputs (*primary, secondary, or tertiary*).

### Required

The property is required toggle.

### Unique Property Identifier

::: warning
This is only editable at the time of property creation.
:::

The alphanumeric name of the property in the data record.

### Display Label

The label to be displayed in form inputs for the property.

### Description

The description of the property.

### Display Category

The category (if any) under which the property is displayed in form inputs.

### One Entry Per Language

::: warning
This is only available for ***range/type=Lang-String***
:::

![One Entry Per Language](/authoring/one-entry-per-language.png)

By toggling this field on, custom properties of the ***range/type Lang-String*** can be limited so that only a single entry can be made per language chosen.

### Limit Values

::: warning
This is only available for ***range/type=Text***
:::

When creating a custom property of ***range/type Text***, you can limit the values allowed to the property. To do this, toggle the ***Limit Values*** field on and click the ***add*** button to begin managing the list of allowable values.

![Limit Values](/authoring/limit-values-competency.png)

For each entry in the limit values table, a ***display label*** and ***field value*** must be entered.

- ***display label*** - the label displayed to the user when selecting the value
- ***field value*** - the recorded value when the value is selected by the user
    - Only alphanumerics are allowed for field values

![Limit Values Enabled](/authoring/limit-values-enabled-competency.png)

### Limit Concepts

::: warning
This is only available for ***range/type=SKOS Concept***
:::

When creating a custom property of ***range/type SKOS Concept***, you can limit the concepts to apply to the property. To do this, toggle the ***Limit Concepts*** field on and begin typing in the search box. A dropdown list will contain existing Concept Schemes or Taxonomies that match your search. Select one or more of the Concept Schemes or Taxonomies. Each selected item will appear above the search box and can be removed again if desired. 

![Limit Concepts](/authoring/limit-concepts.png)

When searching for a value to apply to a property of type SKOS Concept with limited concepts, only concepts defined within the Limit Concepts configuration will be available to select from.

### Limit Types

::: warning
This is only available for ***range/type=Competency***
:::

When creating a custom property of ***range/type Competency***, you can limit the available competencies to apply to the property. To do this, you must first have Competency Types defined in the configuration. [To add Competency Types, please refer to Restrict Competency Types (#restrict-competency-types). Toggle the ***Limit By Type*** field on and begin typing in the search box. A dropdown list will contain existing Competency Types that match your search. Select one or more of the Competency Types. Each selected Competency Type will appear above the search box and can be removed again if desired. 

![Limit By Type](/authoring/limit-by-type.png)

When searching for a value to apply to a property of type Competency, only values with the Competency Type defined in the Limit By Type configuration will be available in the search.

In the example below, "Critical Skill" is a property of type Competency. In the configuration, it is limited by type "Major". The two competencies listed in the search below, "Emergency Response Preparedness" and "Threat Awareness", both have the Competency Type of "Major" applied to them and therefore show up as options to apply to "Critical Skill".
The value of the "Critical Skill" property will be set to the id of the competency selected from the search.

![Competency Limited By Type](/authoring/competency-limited-by-type.png)

## Applying the Custom Competency Property

Once complete, the new property can be applied to the framework by clicking the ***apply new property*** in the lower right corner of the dialogue window.

##  Editing/Deleting Custom Competency Properties

Custom properties can be edited and deleted by selecting the appropriate action buttons to the right of the corresponding property entry in the ***Competency Properties*** list.

 ![Delete Custom Properties](/authoring/competency-properties.png)

## Restrict Competency Types

By default, values for the competency ***type*** property are not limited. By toggling this setting, competency types can be restricted to a list of predetermined values.

![Restrict Competency Types](/authoring/restrict-competency-types.png)

For each entry in the permitted values table, a ***display label*** and ***field value*** must be entered.

- ***display label*** - the label displayed to the user when selecting the type value
- ***field value*** - the recorded value when the type is selected by the user
    - Only alphanumerics are allowed for field values

![Permitted Values Table](/authoring/permitted-values.png)

## Competency Levels

By default, the level property is enabled for competency objects created in the CaSS Authoring Tool. Levels can be disabled by toggling the ***allow levels*** switch.

![Allow Levels](/authoring/allow-levels.png)

## Level Property Fields

Level property fields can be modified from the ***allow levels*** section of the competency configuration settings:

- ***display label*** - label to be displayed in form inputs for levels
- ***description*** - description of the levels property
- ***display category*** - category (if any) under which levels are displayed in form inputs
- ***level display priority*** - priority in which levels are displayed in form inputs (primary, secondary, or tertiary)

## Restrict Competency Levels

By default, levels in CaSS can be created during framework/competency editing. To restrict competencies that allow levels to a limited selection, toggle the ***restrict level values*** switch and click the ***manage levels*** button.

![Restrict Competency Levels](/authoring/restrict-levels.png)

### Manage Competency Levels

Clicking the ***manage levels*** button displays the ***select enforced levels*** dialogue screen. From here, you can select from all existing levels in CaSS or create more appropriate levels. Any previously selected levels will already be checked and can be removed from the enforced levels list by unchecking the appropriate item.

![Enforced Levels](/authoring/enforced-levels.png)

### Add Competency Levels

To add a new level to the available level list, click on the ***add level*** button in the ***select enforced levels*** dialogue window.

![Add Levels](/authoring/add-level.png)

Once clicked, the ***add new level*** dialogue is open. Enter the new level's ***name*** (and optionally the new level's ***description*** ). Clicking the ***save new level*** button on the bottom right corner of the dialogue will create this level in CaSS and return you to the ***select enforced levels*** dialogue.

![Add New Level Modal](/authoring/add-new-level.png)

### Apply Selected Competency Levels

Upon selecting the desired enforced levels, click the ***apply selected*** button at the bottom right of the ***select enforced levels*** dialog window to apply the enforced levels to competencies.

 ![Select Enforced Levels](/authoring/apply-selected.png)

## Competency Relationships Configuration

Relationships can be added as properties on competencies to define how competencies within a framework relate to each other. Enabled relationships will be available in the property drop down when editing competencies in the framework editor.

![Competnecy Relationship Configuration](/authoring/competency-relationships-configuration.png)

### Relationship Display Options

General relationship display options can be configured from the ***display options section***. These include:

- ***display category*** - category (if any) under which relationships are displayed in form inputs
- ***relationships display priority*** - priority in which relationships are displayed in form inputs (*primary, secondary, or tertiary*)

![Relationship Display Options](/authoring/display-options.png)

### Relationship Type Management

The types of relationships available to competencies using the configuration can be managed under the ***relationship types*** section. Relationship types can be *enabled, disabled,* and *relabeled*.

 By default, the following relationship types are enabled:

- ***isEnabledBy***
- ***requires***
- ***desires***
- ***narrows***
- ***isRelatedTo***
- ***isEquivalentTo***

![Relationship Types Management](/authoring/relationship-types.png)

To reduce screen clutter, the ***relationship types*** section only displays *enabled* relationship types. Currently, enabled relationships can be disabled using the corresponding ***enabled*** switch to the right of the relationship entry.

![Relationship Types Enabled Toggle](/authoring/relationship-types-enabled.png)

To add other relationship types to a configuration, click on the ***manage relationships*** button on the upper right of the ***relationship types*** section.

![Manage Relationships](/authoring/manage-relationships.png)

Once clicked, the ***manage relationship types*** dialogue window is open. From this screen, all relationships type currently available in CaSS are categorized and displayed.

![Manage Relationship Types](/authoring/relationship-types.png)

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

To enable or disable a relationship type for the configuration, toggle the ***enabled*** switch to the right of the corresponding type and click the ***ok*** button.

##  Resource Alignment Configuration

Resource alignment terms are used to map resources such as learning material, courses, and other content to competencies in CAT. If enabled, the alignment type property will show up in the framework editor when aligning competencies to resources.

![Resource Alignemnt Configuration](/authoring/resource-alignment-configuration.png)

Currently, the CaSS Authoring Tool supports four types of resource alignments:

- **teaches** - The item being described is intended to help a person learn the competency or learning outcome defined by the referenced term
- **assesses** - The learning resource being described may be used to assess the competency being referenced
- **requires** - The competency being referenced is required in order for effective outcome of the learning resource being described
- **desires** - Knowledge of the learning resource being described is desired by the competency being referenced

Each alignment type can be enabled and disabled by toggling the ***enabled*** switch to the right of each corresponding item.
