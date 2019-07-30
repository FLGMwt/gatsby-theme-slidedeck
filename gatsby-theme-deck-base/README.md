# Gatsby Theme: Deck

`gatsby-theme-deck` generates a slide deck for each `.deck` file in the project's `deck` directory.

These `.deck` files are split into multiple mdx pages using `gatsby-slide` as a delimiter and the `.deck` file name is used as a path prefix.

For `this-theme-is-silly.deck`, pages will be created at:

- this-theme-is-silly/1
- this-theme-is-silly/2
- this-theme-is-silly/3
- ... etc

Arrow key shortcuts are provided to navigate between pages.

## How does it work?

`gatsby-theme-deck` transforms `*.deck.mdx` files found in `decks` into multiple pages for each slide.

At a high level, this happens in three steps within `gatsby-node`:

1. `onCreateNode` looks for `.deck.mdx` file nodes as they are loaded by `gatsby-source-filesystem`. The content of each `.deck.mdx` file is split into slides by a configurable `slideDelimiter` (default: `gatsby-slide`). A new file is created for each slide of the form `${deckSlug}.${slideNumber}.slide` with the slide content, as well as the original deck frontmatter enhanced with the slide's number and total deck size.

2. `onCreateNode` also looks for `Mdx` type nodes as they are loaded. At this point, the slide `Mdx` nodes are enhanced with `slug` and `deckSlug` fields. Of note, `gatsby-theme-deck`s usage of `gatsby-plugin-mdx` is configured to load `.slide` files to distinguish from the local site's potential use of `.mdx`.

3. `createPages` queries for `Mdx` nodes and creates a page for each one, using the slug provided in step #2.

`gatsby-theme-deck` also provides a default site root (`src/pages/index.js`) which provides an index of all available decks.

When viewing a deck, the following keyboard shortcuts can be used to navigate:

- `Right Arrow`, `Down Arrow`, and `L` will navigate to the next slide
- `Left Arrow`, `Up Arrow`, and `H` will navigate to the next slide
- `R` will navigate to the first slide
- `Q` will return to the deck index

## What can I override?

Shortcut keys can be overridden by adding the following file to a project using `gatsby-theme-deck`:

```js
// src/gatsby-theme-deck/src/utils/useShortcuts/config.js

// use `event.code` value for desired key: https://keycode.info/

export const nextKeyCodes = ['KeyL', 'ArrowRight', 'ArrowDown'];
export const previousKeyCodes = ['KeyH', 'ArrowLeft', 'ArrowUp'];
export const resetKeyCodes = ['KeyR'];
export const homeKeyCodes = ['KeyQ'];
```

## How does this compare to [reveal.js](https://revealjs.com/)?

This has way less features, customizability, animations, prettyness, etc. You should probably use reveal.js
