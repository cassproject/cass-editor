# Configurations

::: tip
Note: This section is not applicable to Credential Engine instances of CAT.
:::

Configurations control the way frameworks and competencies appear in the editor, as well as what properties,
relationships, and in some cases value types of properties and relationships that can be added to frameworks and competencies.

Configurations are set at the framework object. If a framework does not have a configuration assigned,
then the following priority is made to determine the correct configuration to apply to the display of the framework:

1. Browser default configuration
2. Instance default configuration
3. CaSS nomenclature fallback

::: tip
Only a single configuration can be set to the instance default at any given time. In order to change the instance default, the owner of the current instance default must toggle the default switch off. At that point, another configuration can be set as the instance default.
:::

## Accessing the CAT Configuration Manager

The CAT configuration manager can be accessed at any time by selecting the _configurations_ icon on the
lower left corner of the navigation menu.


![Configurations Navigation Menu](/docs/configurations.png)

Upon entering the configuration manager, a list of all existing configurations in the current CAT instance
are displayed. Public configurations or configurations owned by the current logged in user can be
managed or deleted by selecting one of the actions icons to the right of the configuration item. Unowned configurations can be viewed by selecting the appropriate action icon.

![Configuration Action Browser Default](/docs/browser-default.png)

It is also possible for users to set their browser default configuration from this screen

![Browser Default](/docs/view-manage-delete.png)


## Creating a New Configuration

Configurations can be created by clicking the _create new configuration_ button at the bottom right corner of the configuration management list screen. By default all required fields are pre populated with default CaSS terminology and settings.

![Create new Configuration](/docs/create-new-configuration.png)

## Managing a Configuration

After creating a new configuration or selecting the _manage_ action on an existing configuration, the configuration details screen is displayed. This screen is divided into several sections.

### Configuration General Details

![General Details](/docs/general-details.png)

The general details configuration settings provide fields for editing the **name** and **description** of the configuration. From this section you can also toggle the _instance default_ switch and set your browser default.

::: tip
Only a single configuration can be set to the instance default at any given time. In order to change the instance default, the owner of the current instance default must toggle the default switch off. At that point, another configuration can be set as the instance default.
:::

### Saving the Configuration

Configurations can be saved by clicking on the _save configuration_ button on the left side of the _configuration details_ screen.

![Save Configuration](/docs/save-configuration.png)



