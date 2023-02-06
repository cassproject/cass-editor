# Framework Crosswalk Tool

The Framework Crosswalk Tool can be used to create relationships across two separate frameworks.

In order to apply any relationships created with the crosswalk tool, at least one of the frameworks initially selected in the tool wizard must be owned and editable by the logged in user.

## Accessing the Framework Crosswalk Tool

The Framework Crosswalk Tool can be accessed at any time by selecting the crosswalk frameworks icon under the ***competencies & frameworks*** category in the navigation menu.

![CAT Competency Framework Management - Crosswalk Frameworks Navigation](/authoring/crosswalk-navigation.png)

## Crosswalk Overview

Framework crosswalking is comprised of four steps:
1. **Select Source**
    - Selection of the source framework
    - The selection for the source framework is limited to frameworks that
    are owned and editable by the current user.
    - The source framework also defines the relationship types available
    for the crosswalk by determining the applied configuration of that
    framework.  If there is no explicit configuration applied to the
    selected framework, the relationships available for the crosswalk
    are determined by the selected browser default configuration or the
    instance default configuration.
3.  **Select Target**
    - Selection of the target framework
3.  **Align Frameworks**
    - Creation of the relationships between the
    competencies of the two frameworks
4.  **Save & Review**
    - Review of created relationships, determination of
    where the relationships will reside (one or both of the chosen
    frameworks), and the saving of the relationships

The current step will be highlighted by the progress bar at the top of the crosswalk tool screen.

![CAT Crosswalk Frameworks - Progress Bar](/authoring/progress-bar.png)

## Aligning Framework Competencies

After selecting the source and target frameworks, the selected frameworks will be displayed in side by side panes. Any existing relationships between the two frameworks will be indicated by orange bubbles underneath the corresponding competency in the source framework pane.

![CAT Crosswalk Frameworks - Main Alignment Screen](/authoring/main-alignment-screen.png)

At the top of each framework pane are four action buttons. Clicking these action buttons will affect only the framework view in the corresponding pane.

- **show aligned only** - show only competencies that have alignments to competencies in the other framework
- **show unaligned only** - show only competencies that do not have alignments to competencies in the other framework
- **show all (*default*)** - show all competencies regardless of existing alignments
- **change framework** - change the source/target framework
    - Selecting this action will remove all unsaved alignments from the current crosswalk session

![CAT Crosswalk Frameworks - Crosswalk Action Buttons](/authoring/action-buttons.png)

### Adding a Crosswalk Relationship/Alignment

To begin adding a relationship between the competencies within the frameworks, hover over the appropriate competency in the source framework pane and click the ***add*** button.

![CAT Crosswalk Frameworks - Relationship Add Button](/authoring/relationship-add-button.png)

Select the desired relationship type from the dropdown.

![CAT Crosswalk Frameworks - Relationship Type Selection](/authoring/relationship-type-selection.png)

Once a relationship type has been selected, click the ***+ button*** to the right of each competency in the target framework pane you wish to apply the relationship. When clicked, the ***+ button*** will transition into a checkmark. Clicking on this checkmark will remove the relationship.

![CAT Crosswalk Frameworks - Target Competency Selection](/authoring/target-competency-selection.png)

After selecting the desired competencies, click the apply alignments button.  Once applied, you will notice a running tally of added and removed alignments under the crosswalk progress bar.  

![CAT Crosswalk Frameworks - Apply Alignments Button.](/authoring/apply-alignments-button.png)

![CAT Crosswalk Frameworks - Alignment Change Tally](/authoring/alignment-change-tally.png)

The alignment tally will keep track of both the addition of new alignments and the removal of alignments created in previous crosswalk sessions.  

Once applied, alignments can be quickly accessed by clicking on the corresponding alignment bubble underneath the source competency.

![CAT Crosswalk Frameworks - Alignment Bubble](/authoring/alignment-bubble.png)

### Removing a Crosswalk Relationship/Alignment

To remove an existing relationship click on the corresponding alignment bubble underneath the source competency.

![CAT Crosswalk Frameworks - Alignment Bubble](/authoring/alignment-bubble.png)

In the target pane, click on the checkmark icon to the right of the competency you wish to remove from the relationship. When clicked, the checkmark icon will transition into a + button.

![CAT Crosswalk Frameworks - Target Competency Removal](/authoring/target-competency-removal.png)

After removing the undesired competencies, click the apply alignments button. Once applied, you will notice a running tally of added and removed alignments under the crosswalk progress bar.  

![CAT Crosswalk Frameworks - Apply Alignments Button.](/authoring/apply-alignment-bubble.png)

![CAT Crosswalk Frameworks - Alignment Change Tally](/authoring/alignment-removing-one.png)

## Crosswalk Review and Save

To save all changes made during the crosswalk session to the repository, click on the ***save & review*** button.

![CAT Crosswalk Frameworks - Save & Review](/authoring/alignment-save-and-review.png)

The summary screen will be displayed detailing the overall alignment changes between the two frameworks and the framework application selector. By default, all owned or editable frameworks used in the crosswalk will be checked. A check mark next the framework means all alignment/relationship changes made will be applied to that framework.

:::tip Note
You may only apply alignment changes to frameworks that you own or can edit.
:::

![CAT Crosswalk Frameworks - Crosswalk Alignment Summary](/authoring/alignment-summary.png)

![CAT Crosswalk Frameworks - Framework Application Selection](/authoring/framework-application-selection.png)

If you wish to make further changes to the alignments, click on the ***continue editing*** button.

![CAT Crosswalk Frameworks - Continue Editing Button](/authoring/continue-editing.png)

When you are satisfied with your changes, click on the ***save alignments*** button.

![CAT Crosswalk Frameworks - Save Alignments Button](/authoring/save-alignments.png)
