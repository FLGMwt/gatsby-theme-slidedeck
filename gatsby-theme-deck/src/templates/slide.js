import React from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import { Styled, useColorMode, css } from 'theme-ui';
import Layout from '../components/layout';
import useShortcuts from '../utils/useShortcuts';

const ReffableLayout = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <Layout {...props} />
  </div>
));

const Slide = ({ data: { mdx } }) => {
  const { frontmatter, body, fields } = mdx;
  const { title, slideNumber, lastSlide } = frontmatter;
  const { deckSlug } = fields;

  const touchSwipeHandlers = useShortcuts({ deckSlug, slideNumber, lastSlide });
  const [colorMode, setColorMode] = useColorMode();

  return (
    <ReffableLayout {...touchSwipeHandlers}>
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          <Styled.h3 css={{ textAlign: 'right' }}>
            {title} {slideNumber}/{lastSlide}
          </Styled.h3>
          <div css={css({ minHeight: 'slideHeight' })}>
            <MDXRenderer>{body}</MDXRenderer>
          </div>
        </div>
        <button
          onClick={e => {
            setColorMode(colorMode === 'light' ? 'dark' : 'light');
          }}
        >
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </button>
      </div>
    </ReffableLayout>
  );
};

export default Slide;

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
