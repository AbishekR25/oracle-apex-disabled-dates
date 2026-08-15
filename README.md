# Oracle APEX Disabled Dates

A JavaScript-based Oracle APEX solution for dynamically disabling fully booked ticket dates in the APEX Date Picker.

## Overview

This solution is designed for ticket booking applications where each date has a defined ticket capacity.

When the ticket capacity for a particular date is reached, that date is added to a list of fully booked dates. The JavaScript identifies those dates in the APEX Date Picker, marks them as unavailable, and prevents users from selecting them.

The implementation also uses `MutationObserver` to ensure that the disabled dates remain applied when the calendar is refreshed, re-rendered, or when the user navigates between months.

## Features

* Identifies fully booked ticket dates.
* Disables fully booked dates in the APEX Date Picker.
* Prevents users from selecting unavailable dates.
* Adds a custom CSS class to fully booked dates.
* Sets `aria-disabled="true"` for accessibility.
* Removes disabled dates from keyboard navigation using `tabindex="-1"`.
* Automatically reapplies the logic when the calendar DOM changes.
* Supports month-to-month navigation in the APEX Date Picker.

## How It Works

The solution reads a comma-separated list of fully booked dates from an Oracle APEX page item.

Example:

```text
2026-08-15,2026-08-18,2026-08-22
```

The dates must be provided in:

```text
YYYY-MM-DD
```

format.

The JavaScript then:

1. Reads the fully booked dates from the APEX page item.
2. Detects the month and year currently displayed in the Date Picker.
3. Loops through the calendar dates.
4. Creates a date value in `YYYY-MM-DD` format.
5. Compares the calendar date with the fully booked date list.
6. Marks matching dates as disabled.
7. Prevents mouse and click selection.
8. Reapplies the logic whenever the calendar DOM changes.

## APEX Page Item

Create an APEX page item containing the fully booked dates.

Example:

```text
P28_FULL_DATES
```

Value:

```text
2026-08-15,2026-08-18,2026-08-22
```

The value can be populated dynamically from the database based on ticket availability.

## JavaScript

The main JavaScript file is:

```text
apex-disabled-full-dates.js
```

The implementation uses the APEX page item value and the Date Picker calendar element to identify and disable fully booked dates.

## CSS

The JavaScript adds the following CSS class to fully booked dates:

```text
u-date-full
```

You can customize its appearance according to your application's requirements.

Example:

```css
.u-date-full {
    opacity: 0.5;
    cursor: not-allowed;
}
```

## Example

Suppose the ticket capacity for the following dates has been reached:

```text
2026-08-15
2026-08-18
2026-08-22
```

The page item can contain:

```text
2026-08-15,2026-08-18,2026-08-22
```

When the user opens the August 2026 calendar, these dates will be identified as fully booked and cannot be selected.

## Technologies

* Oracle APEX
* JavaScript
* jQuery
* APEX Date Picker
* MutationObserver
* CSS
