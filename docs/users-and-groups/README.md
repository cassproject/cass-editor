# User Group Management

In the CaSS authoring environment, user groups provide the capability to assign multiple users the ability to assume a single shared &#39;identity&#39;. Members of a group are granted access to any CaSS object that the group has been explicitly assigned.


## Accessing the CAT User Group Manager

**Important: To access the CAT user group manager, you must be logged into the CAT application.**

The CAT user group manager can be accessed at any time by selecting the _users and groups_ icon on the lower left corner of the navigation menu.

![Users and groups](/docs/users-and-groups.png)

**CAT User Group Manager - Navigation Menu - Users and Groups**

Upon entering the user group manager, a list of all existing user groups in the current CAT instance are displayed. User groups managed by the current logged in user can be managed by clicking the _manage_ button to the right of the group entry.

![Users groups](/docs/users-groups.png)

## Creating a New User Group

User groups can be created by clicking the _create new group_ button at the bottom right corner of the configuration management list screen.

![Craete new group](/docs/create-new-group.png)

::: tip
There may be noticeable processing time when creating a new group. CAT user groups are assigned identity keys that must be generated at creation time. This process may take several seconds.
:::

## Managing a User Group

After creating a new user group or clicking the _manage_ button on an existing user group, the user group details screen is displayed. This screen is divided into several sections.

### General Details

![User Group Details](/docs/user-group-details.png)

The general details configuration settings provide fields for editing the **name** and **description** of the user group.

### Group Managers

Group managers can add and remove members and other managers to the group. Managers also share the owner and reader privileges assigned to the group.

::: tip
You cannot remove yourself as a manager from the current group
:::

![Managers](/docs/managers.png)

#### Add Managers

The group manager list can be managed by clicking the _add managers_ button on the right side of the _managers_ section

 ![Available Managers](/docs/add-managers.png)

Once clicked, the _add managers_ dialogue window is displayed. Select the desired managers and click the _apply_ button in the bottom right of the dialogue window.

![Available Managers](/docs/available-managers.png)

#### Remove Managers

Group managers can be removed from the group by clicking the _remove_ button.

![Remove Managers](/docs/remove-managers.png)

::: tip
You cannot remove yourself as a manager from the current group
:::

#### Reassign Manager

Managers can be reassigned as a group member by clicking the _reassign as member_ button.

![Reassign as member](/docs/reassign-as-member.png)

### Group Members

Group members share the owner and reader privileges assigned to the group.

![Members](/docs/members.png)

#### Add Members

The group member list can be managed by clicking the _add members_ button on the right side of the _members_ section

 ![Add Members](/docs/add-members.png)

Once clicked, the _add members_ dialogue window is displayed. Select the desired group members and click the _apply_ button in the bottom right of the dialogue window.

![Manage Members](/docs/available-members.png)

#### Remove Members

Group members can be removed from the group by clicking the _remove_ button.

![Remove Members](/docs/remove.png)

#### Reassign Member

Members can be reassigned as a group manager by clicking the _reassign as manager_ button.

![Reassign as manager](/docs/reassign-as-manager.png)

### Saving the User Group

User Groups can be saved by clicking on the _save user group_ button on the left side of the _user group details_ screen.

![Save User Group](/docs/save-user-group.png)
