# gatsby-theme-deck

`gatsby-theme-slidedeck` generates a slide deck for each `.deck.mdx` file in the project's `deck` directory.

`.deck.mdx` files look like regular .md/.mdx files but can contain slide delimiters to denote multiple slides:

For example, if I had the following content in `decks/my-presentation.deck.mdx`:


```md

# My First Slide

gatsby-slide


# My Second Slide

```

Then my site would have a slide deck with two slides starting at https://www.example.com/my-presentation/1.


Decks can be navigated through using keyboard shortcuts:

TODO

## Installing (starter)

Use the gatsby-starter
