import React from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import { Styled } from 'theme-ui';
import './global.css';

import useShortcuts from '../utils/useShortcuts';

export default function PageTemplate({ data: { mdx } }) {
  const { frontmatter, body, fields } = mdx;
  const { title, slideNumber, lastSlide } = frontmatter;
  const { deckSlug } = fields;

  const touchSwipeHandlers = useShortcuts({ deckSlug, slideNumber, lastSlide });

  return (
    <div
      {...touchSwipeHandlers}
      style={{
        // allow swipe handlers to capture full screen
        height: '100vh',
        width: '100vw',
      }}
    >
      {/*
        Without this, h1's margin-start nudges the 100vh container and causes a scrollbar
        I don't know CSS too well, probably a better way to do this 😬
      */}
      <div style={{ height: 1 }} />
      <Styled.h1>
        {title} - {slideNumber}
      </Styled.h1>
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
