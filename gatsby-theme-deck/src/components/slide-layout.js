import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';

const incrementPageNumber = delta => {
  const pathParts = document.location.pathname.split('/');
  const path = pathParts.slice(0, -1);
  const pageNumber = pathParts.slice(-1);
  window.location = [...path, Number(pageNumber) + delta].join('/');
};

export default function PageTemplate({ data: { mdx } }) {
  const { frontmatter, body } = mdx;
  const { title, slideNumber, lastSlide } = frontmatter;
  useEffect(() => {
    document.addEventListener('keydown', e => {
      console.log(e);

      if (
        slideNumber !== lastSlide &&
        ['KeyL', 'ArrowRight', 'ArrowDown'].includes(e.code)
      ) {
        incrementPageNumber(1);
      }
      if (
        slideNumber !== 1 &&
        ['KeyH', 'ArrowLeft', 'ArrowUp'].includes(e.code)
      ) {
        incrementPageNumber(-1);
      }
    });
  }, []);
  return (
    <div>
      <h1>
        {title} - {slideNumber}
      </h1>
      <MDXRenderer>{body}</MDXRenderer>
    </div>
  );
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
        slideNumber
        lastSlide
      }
      body
    }
  }
`;
