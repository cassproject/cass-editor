# Configurations

::: tip Note
This section is not applicable to Credential Engine instances of CAT.
:::

Configurations control the way frameworks and competencies appear in the editor, as well as what properties,
relationships, and in some cases value types of properties and relationships that can be added to frameworks and competencies.

Configurations are set at the framework object. If a framework does not have a configuration assigned,
then the following priority is made to determine the correct configuration to apply to the display of the framework:
1. Browser default configuration
2. Instance default configuration
3. CaSS nomenclature fallback

::: tip Note
Only a single configuration can be set to the instance default at any given time. In order to change the instance default, the owner of the current instance default must toggle the default switch off. At that point, another configuration can be set as the instance default.
:::

## Accessing the CAT Configuration Manager

The CAT configuration manager can be accessed at any time by selecting the ***configurations*** icon on the
lower left corner of the navigation menu.

![Configurations Navigation Menu](/v1.5/authoring/configurations.png)

Upon entering the configuration manager, a list of all existing configurations in the current CAT instance are displayed. Public configurations or configurations owned by the current logged in user can be managed or deleted by selecting one of the actions icons to the right of the configuration item. Unowned configurations can be viewed by selecting the appropriate action icon.

![Configuration Action Browser Default](/v1.5/authoring/browser-default.png)

It is also possible for users to set their browser default configuration from this screen

![Browser Default](/v1.5/authoring/view-manage-delete.png)


## Creating a New Configuration

Configurations can be created by clicking the ***create new configuration*** button at the bottom right corner of the configuration management list screen. By default, all required fields are pre-populated with default CaSS terminology and settings.

![Create new Configuration](/v1.5/authoring/create-new-configuration.png)

## Managing a Configuration

After creating a new configuration or selecting the ***manage*** action on an existing configuration, the configuration details screen is displayed. This screen is divided into the following sections:

### Configuration General Details

![General Details](/v1.5/authoring/general-details.png)

The general details configuration settings provide fields for editing the ***name*** and ***description*** of the configuration. From this section you can also toggle the ***instance default*** switch and set your browser default.

::: tip Note
Only a single configuration can be set to the instance default at any given time. In order to change the instance default, the owner of the current instance default must toggle the default switch off. At that point, another configuration can be set as the instance default.
:::

### Saving the Configuration

Configurations can be saved by clicking on the ***save configuration*** button on the left side of the ***configuration details*** screen.

![Save Configuration](/v1.5/authoring/save-configuration.png)



