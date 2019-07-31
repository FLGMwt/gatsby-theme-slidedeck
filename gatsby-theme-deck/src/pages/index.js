import React from 'react';
import { graphql, Link } from 'gatsby';
import { Styled, css } from 'theme-ui';
import Layout from '../components/layout';
import Menu from '../components/menu';

export default ({ data }) => {
  const {
    allMdx: { distinct },
  } = data;
  return (
    <Layout>
      <div
        css={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          css={{
            flex: 1,
          }}
        >
          <Styled.h1 css={css({ fontSize: 8 })}>Decks</Styled.h1>
          <Styled.ul>
            {distinct.map(deckSlug => (
              <Styled.li css={css({ fontSize: 6 })} key={deckSlug}>
                <Styled.a as={Link} to={`/${deckSlug}/1`}>
                  {deckSlug}
                </Styled.a>
              </Styled.li>
            ))}
          </Styled.ul>
        </div>

        <Menu />
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query DeckQuery {
    allMdx {
      distinct(field: fields___deckSlug)
    }
  }
`;
