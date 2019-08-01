# gatsby-theme-deck

`gatsby-theme-slidedeck` generates a slide deck for each `.deck.mdx` file in the project's `deck` directory.

`.deck.mdx` files look like regular .md/.mdx files but can contain slide delimiters to denote multiple slides:

For example, if I had the following content in `decks/my-presentation.deck.mdx`:


```md

# My First Slide

- important point 1
- important point 2

gatsby-slide


# My Second Slide

🎉🎉🎉🎉🎉🎉

```

Then my site would have a slide deck with two slides starting at https://www.example.com/my-presentation/1.

Decks can be navigated through using keyboard shortcuts:

- L / Right Arrow: Next slide
- H / Left Arrow: Previous slide
- R: Reset to the first slide
- Q: Go back to your list of decks

You can also navigate slides by swiping left and right on a touch-enabled device.

## Installing (Starter)

Use the `gatsby-starter-slidedeck-theme`:

```sh
gatsby new my-slidedeck-site https://github.com/FLGMwt/gatsby-starter-slidedeck-theme
cd my-slidedeck-site
npm run develop # or yarn develop
```

## Customization

Since `gatsby-theme-slidedeck` is a [Gatsby Theme](https://www.gatsbyjs.org/docs/themes/what-are-gatsby-themes/), sites that use it have the power to customize almost everything.

For example, if you don't want the slide header to appear, [shadow](https://www.gatsbyjs.org/blog/2019-04-29-component-shadowing/) it by creating a overriding component in your project that renders nothing:

```jsx
// src/gatsby-theme-slidedeck/components/slideHeader.js
export default () => null;
```

## Theme Structure

The project structure of `gatsby-theme-slidedeck` is influenced by the official [`gatsby-theme-blog`](https://github.com/gatsbyjs/gatsby/tree/master/themes/gatsby-theme-blog). `src` includes original files and helpers for the themedeck theme and overrides for the included [`gatsby-plugin-theme-ui`](https://github.com/system-ui/theme-ui/tree/master/packages/gatsby-plugin-theme-ui).

### pages/index.js

Provides a home pages which displays an index of all of your decks. In addition to shadowing, if your project defines it's own `src/pages/index.js`, this index will be overridden.

### templates/slide.js

Primary container for slide pages. It also provides keyboard shortcuts for navigating decks.

### components/layout.js

Layout used by slides and the site root / deck index. The root component sets width and height to their respective viewport values in order to allow the touch events to be captured anywhere on the screen. It also renders a menu for setting the theme and returning to the deck index.

### component/menu.js

Renders a menu toggle which provides options for toggling the theme and returning to the deck index.

### component/button.js

Styled, accessible button which is used by `menu.js`

### component/slideHeader.js

Renders right-aligned header displaying the deck title and progress through deck.

### component/deckTitle.js

Renders large centered title+subtitle text which can be used in .deck.mdx files.

### utils/navigation.js

Helpers for navigating between slides and back to the slide index. Makes assumptions about route structure (`/:deckSlug/:slideNumber).

### utils/useShortcuts/index.js

React hook for setting up navigation keyboard shortcuts and swipe handlers.

### utils/useShortcuts/config.js

Configurable values for each of the navigation operations.

Example shadow disabling the reset shortcut:

```js
// src/gatsby-theme-slidedeck/utils/useShortcuts/config.js
export {
  nextKeyCodes,
  previousKeyCodes,
  resetKeyCodes
} from  'gatsby-theme-slidedeck/src/utils/useShortcuts/config.js';
export const homeKeyCodes = [];
```

### gatsby-plugin-theme-ui/*

Contains theme configuration for `gatsby-plugin-theme-ui`. See [`theme-ui` documentation](https://theme-ui.com/gatsby-plugin) and [`gatsby-theme-blog`'s theme configuration](https://github.com/gatsbyjs/gatsby/tree/master/themes/gatsby-theme-blog/src/gatsby-plugin-theme-ui) for more information.

## Opportunities

This was built in a bit of a rush the weekend before the end of the [Gatsby Theme Jam](https://themejam.gatsbyjs.org/) and aside from trying out the blog theme the same weekend, I hadn't used Gatsby at all. That in mind, I'm probably doing a few things suboptimally 😬. Here's a few things I'd like to improve:

- transitions!
    - I spent most of my last few project hours working on docs, but I would have loved to get some configurable transitions between sides rather than the current abrupt page navs. If we just had click links, this would have been easier, but since our only slide nav is imperative with keyboard/touch handlers, I didn't see any obvious fast solution.
- shortcut reference
    - It should be easy to make a `/config.js`-driven keyboard shortcut menu (CTRL+?).
- GQL over mdx file generation
    - The mdx plugin exclusively pulls from file nodes. Rather than customizing that or making my own mdx plugin, I figured it would be easier to hack file source node creation to split and make additional files for mdx to slurp. This could be improved by having `onCreateNode` listen for deck files, create new deck/slide GQL type & nodes, somehow have mdx process those, then generate pages from them.
- vh/vw (hacks?) for touch events
    - I wanted touch events to be handled anywhere on the screen, not just where content is. I'm not great at CSS, but I got it to "work", but if certain components are shadowed, I think the client will end up with scrollbars. Since we have a min-height now, this might not be an issue anymore and we can remove the vh/vw and a few layout assumptions.
- swipe events in scrollable elements
    - On thin-screened mobile clients, there might be `pre` blocks that need to scroll. I'd love to update the onSwipe handlers to reject events when users are scrolling within these blocks.
- moar configuration
    - there's not a ton of components, but I'd love to split things out more for more configuration
