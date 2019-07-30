import React from 'react';
import { graphql, Link } from 'gatsby';

export default ({ data }) => {
  const {
    allMdx: { distinct },
  } = data;
  return (
    <div>
      <ul>
        {distinct.map(deckSlug => (
          <li key={deckSlug}>
            <Link to={`/${deckSlug}/1`}>{deckSlug}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const pageQuery = graphql`
  query DeckQuery {
    allMdx {
      distinct(field: fields___deckSlug)
    }
  }
`;
