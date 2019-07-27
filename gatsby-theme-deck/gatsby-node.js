const path = require('path');
const {
  createFilePath,
  createFileNodeFromBuffer,
} = require('gatsby-source-filesystem');
const grayMatter = require('gray-matter');

const SlideLayout = require.resolve(`./src/components/slide-layout`);

exports.onCreateNode = async ({
  node,
  loadNodeContent,
  actions,
  getNode,
  createNodeId,
  store,
  cache,
}) => {
  const { createNodeField, createNode } = actions;
  if (node.internal.type === 'File' && node.ext === '.deck') {
    const nodeContent = await loadNodeContent(node);
    const { content, data } = grayMatter(nodeContent);
    const slides = content.split('\n%%%%\n');
    for (let index = 0; index < slides.length; index++) {
      const slide = slides[index];
      const slideNumber = index + 1;
      const slideContent = grayMatter.stringify(slide, {
        ...data,
        slideNumber,
        lastSlide: slides.length,
      });
      const foo = await createFileNodeFromBuffer({
        buffer: Buffer.from(slideContent, 'utf8'),
        store,
        cache,
        createNode,
        createNodeId,
        name: `${node.name}.${slideNumber}`,
        ext: '.mdx',
      });
    }
  } else if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode });
    const slideName = path.basename(value);
    const deckName = slideName.slice(0, slideName.lastIndexOf('.'));
    const slideNumber = slideName.slice(slideName.lastIndexOf('.') + 1);
    createNodeField({
      name: 'slug',
      node,
      value: `${deckName}/${slideNumber}`,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  try {
    const result = await graphql(
      `
        {
          allMdx {
            edges {
              node {
                id
                fields {
                  slug
                }
              }
            }
          }
        }
      `
    );

    result.data.allMdx.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: SlideLayout,
        context: { id: node.id },
      });
    });
  } catch (error) {
    if (error.errors) {
      console.error(result.errors);
    }
  }
};
