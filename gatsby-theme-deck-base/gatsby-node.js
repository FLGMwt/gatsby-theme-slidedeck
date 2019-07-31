const path = require('path');
const {
  createFilePath,
  createFileNodeFromBuffer,
} = require('gatsby-source-filesystem');
const grayMatter = require('gray-matter');

const SlideTemplate = require.resolve(`./src/templates/slideTemplate`);

const deckExtensionPrefix = '.deck';
const defaultSlideDelimiter = 'gatsby-slide';

/**
 * Extracts  deckSlug and slideNumber from file path, e.g. ../myDeck.4.slide
 *
 * @param {string} filePath Absolute file path
 */
const getSlideInfoFromFilePath = filePath => {
  const slideName = path.basename(filePath);
  const deckSlug = slideName.slice(0, slideName.lastIndexOf('.'));
  const slideNumber = slideName.slice(slideName.lastIndexOf('.') + 1);
  return { deckSlug, slideNumber };
};

exports.onCreateNode = async (
  { node, loadNodeContent, actions, getNode, createNodeId, store, cache },
  { slideDelimiter = defaultSlideDelimiter }
) => {
  const { createNodeField, createNode } = actions;
  if (
    node.internal.type === 'File' &&
    ['.mdx', '.md'].includes(node.ext) &&
    node.name.includes(deckExtensionPrefix)
  ) {
    // For all deck files (deck/my-deck.deck.mdx), do the following:
    // - Create my-deck.raw.mdx file as a copy of my-deck.deck.mdx
    // - Split my-deck's md/mdx content by $slideDelimiter
    //   - for each slide, create `my-deck

    const createSlideFile = (fileContent, fileName) =>
      createFileNodeFromBuffer({
        buffer: Buffer.from(fileContent, 'utf8'),
        store,
        cache,
        createNode,
        createNodeId,
        name: fileName,
        ext: '.slide',
      });

    // "/foo/bar/important presentation.deck.mdx => "important-presentation"
    const deckSlug = path
      .basename(node.name, deckExtensionPrefix)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const nodeContent = await loadNodeContent(node);

    // create a "secret" /raw route for viewing full deck rendered
    await createSlideFile(nodeContent, `${deckSlug}.raw`);

    const { content, data: originalFrontmatter } = grayMatter(nodeContent);

    // .deck content is split into slides
    const slides = content.split(`\n${slideDelimiter}\n`);

    for (let index = 0; index < slides.length; index++) {
      const slide = slides[index];
      const slideNumber = index + 1;
      const slideFrontmatter = {
        ...originalFrontmatter,
        slideNumber,
        lastSlide: slides.length,
      };
      const slideContent = grayMatter.stringify(slide, slideFrontmatter);

      await createSlideFile(slideContent, `${deckSlug}.${slideNumber}`);
    }
  } else if (node.internal.type === 'Mdx') {
    const filePath = createFilePath({ node, getNode });
    const { deckSlug, slideNumber } = getSlideInfoFromFilePath(filePath);
    createNodeField({
      name: 'slug',
      node,
      value: `${deckSlug}/${slideNumber}`,
    });
    // used by slides to determine their base slug
    createNodeField({
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
        component: SlideTemplate,
        context: { id: node.id },
      });
    });
  } catch (error) {
    if (error.errors) {
      console.error(result.errors);
    }
  }
};
