# User Group Management

In the CaSS authoring environment, user groups allow for multiple users to assume a single shared &#39;identity&#39;. Members of a group are granted access to any CaSS object that the group has been explicitly assigned.

Subgroups can be created within Groups to further organize and define access to CaSS objects for multiple users.  

## Accessing the CAT User Group Manager

**Important: To access the CAT user group manager, you must be logged into the CAT application.**

The CAT user group manager can be accessed at any time by selecting the _users and groups_ icon on the lower left corner of the navigation menu.

![Users and groups](/docs/users-and-groups.png)

**CAT User Group Manager - Navigation Menu - Users and Groups**

The "My User Groups" list contains options for creating a new group, viewing group members, and accessing existing groups.

![Users groups](/docs/users-groups.png)

To view a list of all group members, click on "Member List" under My User Groups. This only lists users who are already within a group. 

## Creating a New User Group

To create a new group, click on the "create new group" button under My User Groups.

![Create new group](/docs/create-new-group.png)

A new group is created with a default name and description.

::: tip
There may be noticeable processing time when creating a new group. CAT user groups are assigned identity keys that must be generated at creation time. This process may take several seconds.
:::

## Creating a New Sub-Group

To add a sub-group to a currently open group, click on the add "sub-group" button under "Group actions".
Sub-groups can be created within Groups to further organize and define access to CaSS objects for multiple users.  

![Create new sub-group](/docs/groups-add-subgroup.png)

A new sub-group is created with a default name and description. The path of the group and the listing under "My User Groups" indicate the parent of the sub-group.

![Sub-group Indicators](/docs/groups-subgroup-indicators.png)

The actions for managing users and editing groups apply to sub-groups as well.

## Managing a User Group

To access existing groups in the current CAT instance, click on the group name under My User Groups to the left of the Group Details. 

Group Details show the name, description, and a list of members within the group. 

![User Group Details](/docs/user-group-details.png)

Click on the edit icon next to the **name** and **description** to edit either of these properties. When you are done editing, click "done editing" to save changes.

![Edit Group Details](/docs/groups-edit-details.png)

### Group Managers

Group managers can add and remove members and other managers to the group. Managers also share the owner and reader privileges assigned to the group.

::: tip
You cannot remove yourself as a manager from the current group
:::

![Managers](/docs/managers.png)

#### Add Managers

To add managers to a group, click on the add "member" button under "Group actions" in the top right corner.  

 ![Available Managers](/docs/add-managers.png)

In the "Add members" dialogue, select the desired permissions next to the name of the member or members you would like to add to the group. The member icon with a shield, as shown above the check box outlined in red below, represents a manager for this group. When you are finished selecting member permissions click "apply".

![Available Managers](/docs/available-managers.png)

#### Remove Managers

Group managers can be removed from the group by clicking on the remove icon.

![Remove Managers](/docs/remove-managers.png)

::: tip
You cannot remove yourself as a manager from the current group
:::

#### Reassign Manager

Managers can be reassigned as a group member by clicking "change role" button.

When a role is changed from manager to member, the list is re-sorted to place the member beneath existing managers in the list.

![Reassign as member](/docs/reassign-as-member.png)

### Group Members

Group members share the owner and reader privileges assigned to the group.

![Members](/docs/members.png)

#### Add Members

To add members to a group, click on the add "member" button under "Group actions" in the top right corner.  

 ![Available Managers](/docs/add-members.png)

In the "Add members" dialogue, select the desired permissions next to the name of the member or members you would like to add to the group. The member icon without a shield, as shown above the check box outlined in red below, represents a member for this group. When you are finished selecting member permissions click "apply".

![Available Managers](/docs/available-members.png)

#### Remove Members

Group members can be removed from the group by clicking on the remove icon.

![Remove Members](/docs/remove.png)

#### Reassign Member

Members can be reassigned as a group manager by clicking "change role" button.

When a role is changed from member to manager, the list is re-sorted to place the new manager above existing members in the list.

![Reassign as manager](/docs/reassign-as-manager.png)

### Saving the Group

Changes to Groups can be saved by clicking on the save button under "Group actions" in the top right corner.  

![Save User Group](/docs/save-user-group.png)
