# Gatsby Theme: Deck

`gatsby-theme-deck` generates a slide deck for each `.deck` file in the project's `deck` directory.

These `.deck` files are split into multiple mdx pages using `gatsby-slide` as a delimiter and the `.deck` file name is used as a path prefix.

For `this-theme-is-silly.deck`, pages will be created at:

- this-theme-is-silly/1
- this-theme-is-silly/2
- this-theme-is-silly/3
- ... etc

Arrow key shortcuts are provided to navigate between pages.

## What can I override?

TODO: break out layout, make it nice, document overrides.

## How does this compare to [reveal.js](https://revealjs.com/)?

This has way less features, customizability, animations, prettyness, etc. You should probably use reveal.js
