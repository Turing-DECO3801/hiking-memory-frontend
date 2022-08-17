# Styling

## Order of styling
Bootstrap => Template* => _variables => Components
*if used

## How to use
1. First try use Bootstrap's built-in styles and variables.
2. If Bootstrap needs to be globally re-styled, use _global.scss.
3. If it's a common style (shared across components) but not global, use _mixins.scss.
4. If it's limitted to just a component, override bootstrap's styling within the component (ensure it is scoped).
