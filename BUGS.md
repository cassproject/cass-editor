# Known Bugs

## Import - URL Source "Done Editing" button not clickable
- **Page:** Import → URL Source
- **Steps to reproduce:**
  1. Go to Import page
  2. Select "URL Source" tab
  3. Click one of the default O*NET framework links (e.g., Basic Skills)
  4. Click "Import framework"
  5. Wait for framework to load and render in preview
  6. Try to click "done editing" button
- **Expected:** Clicking "done editing" should finalize the import
- **Actual:** "done editing" button is not clickable. Console errors present during this flow.
- **Notes:** There is also a global `TypeError: Cannot read properties of null (reading 'parentNode')` error at `<RouterView>` → `<App>` level that occurs on every page load due to Vue 3 / Vue Router 4 handling of multiple simultaneous `<router-view>` outlets with async components. This may or may not be related.

## Crosswalk Frameworks - "Add +" button not enabled on hover
- **Page:** Crosswalk Frameworks
- **Steps to reproduce:**
  1. Go to Crosswalk Frameworks
  2. Hover over a competency item
  3. Observe the "add +" button that appears
- **Expected:** The "add +" button should be clickable
- **Actual:** The button is not enabled / not clickable
- **Notes:** Likely the same `<span>` or `<div>` with `:disabled` pattern — needs conversion to a native `<button>` element.

## Assertions - "I can" / "I can't" buttons not enabled
- **Page:** Assertions management
- **Steps to reproduce:**
  1. Navigate to managing assertions for a competency
  2. Try to click "I can" or "I can't" buttons
- **Expected:** Buttons should be clickable to set assertion state
- **Actual:** Buttons are not enabled / not clickable
- **Notes:** Likely the same `<span>` or `<div>` with `:disabled` pattern — needs conversion to a native `<button>` element.

## "Set as framework default" button not enabled
- **Page:** Framework editing (likely language/configuration settings)
- **Steps to reproduce:**
  1. Open a framework
  2. Locate the "set as framework default" button
- **Expected:** Button should be clickable
- **Actual:** Button is not enabled / not clickable
- **Notes:** Likely the same `<span>` or `<div>` with `:disabled` pattern — needs conversion to a native `<button>` element.
