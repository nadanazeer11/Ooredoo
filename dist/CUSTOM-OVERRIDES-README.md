# Custom CSS Overrides

## Overview
This file (`custom-overrides.css`) contains all custom styling overrides for the project. Since the `dist/` folder contains auto-generated files from Astro, this separate CSS file allows you to make custom changes without losing them on rebuild.

## How It Works
- The CSS file is linked in both `index.html` and `ar/index.html` **after** the main stylesheets
- This ensures your overrides take precedence over the generated styles
- The file uses `!important` flags to override existing styles

## Current Overrides
1. **Removed semicircle shapes** - Disables clip-path, border-radius, and pseudo-elements that create semicircle overlaps
2. **Reduced section heights** - Sets padding to 40px and removes min-height constraints
3. **Added padding to section titles** - Pushes titles down from the top of sections

## Adding New Overrides
Simply edit `custom-overrides.css` and add your styles. The file is already linked in the HTML, so changes will take effect immediately after saving.

## Important Notes
- This file is **NOT** auto-generated - your changes will persist
- Keep this file in the `dist/` folder alongside the HTML files
- If you rebuild the project, make sure to keep this file and the link in the HTML files

## File Location
- CSS File: `/dist/custom-overrides.css`
- Linked in: `/dist/index.html` and `/dist/ar/index.html`

