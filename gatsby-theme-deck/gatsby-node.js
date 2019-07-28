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
    const createMdxFile = (fileContent, fileName) =>
      createFileNodeFromBuffer({
        buffer: Buffer.from(fileContent, 'utf8'),
        store,
        cache,
        createNode,
        createNodeId,
        name: fileName,
        ext: '.mdx',
      });

    const nodeContent = await loadNodeContent(node);
    await createMdxFile(nodeContent, `${node.name}.0`);
    const { content, data } = grayMatter(nodeContent);
    const slides = content.split('\ngatsby-slide\n');
    for (let index = 0; index < slides.length; index++) {
      const slide = slides[index];
      const slideNumber = index + 1;
      const slideContent = grayMatter.stringify(slide, {
        ...data,
        slideNumber,
        lastSlide: slides.length,
      });
      await createMdxFile(slideContent, `${node.name}.${slideNumber}`);
    }
  } else if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode });
    const slideName = path.basename(value);
    const deckSlug = slideName.slice(0, slideName.lastIndexOf('.'));
    const slideNumber = slideName.slice(slideName.lastIndexOf('.') + 1);
    await createNodeField({
      name: 'slug',
      node,
      value: `${deckSlug}/${slideNumber}`,
    });
    await createNodeField({
      name: 'deckSlug',
      node,
      value: deckSlug,
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
