import React from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';

import useShortcuts from '../utils/useShortcuts';

export default function PageTemplate({ data: { mdx } }) {
  const { frontmatter, body, fields } = mdx;
  const { title, slideNumber, lastSlide } = frontmatter;
  const { deckSlug } = fields;

  const touchSwipeHandlers = useShortcuts({ deckSlug, slideNumber, lastSlide });

  return (
    <div {...touchSwipeHandlers}>
      <h1>
        {title} - {slideNumber}
      </h1>
      <MDXRenderer>{body}</MDXRenderer>
    </div>
  );
}

export const pageQuery = graphql`
  query SideQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
        slideNumber
        lastSlide
      }
      fields {
        deckSlug
      }
      body
    }
  }
`;
