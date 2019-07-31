---
title: Theme Jam
---
import DeckTitle from 'gatsby-theme-slidedeck/src/components/deckTitle';

<DeckTitle title="gatsby-theme-slidedeck" subtitle="Slide decks w/ mdx + Gatsby" />

gatsby-slide

# What This Is

This presentation is served as a gatsby site using slides generated from Markdown (mdx specifically).

Sites using `gatsby-theme-slidedeck` can add a `.deck.mdx` file to the `decks` directory such as the following, with the string `gatby-slide` on its own line to separate slides:

```md
<!-- decks/my-fancy-presentation.deck.mdx -->
# What I have to say and why I say it

1. acquire cats
2. acquire neckties
3. put neckties on the cats
4. profit

gatsby-slide (or any slide delimeter you configure)

# This is on a new slide

Look at me!
```

gatsby-slide

# Getting Started

Create a new gatsby site using the `gatsby-starter-slidedeck-theme` starter:

```sh
gatsby new my-slidedeck-site https://github.com/FLGMwt/gatsby-starter-slidedeck-theme
cd my-slidedeck-site
npm run develop # or yarn develop
```

## What's Inside?

