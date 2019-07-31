const path = require('path');

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.slide'],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: 'decks',
      },
    },
    {
      resolve: 'gatsby-plugin-page-creator',
      options: {
        path: path.join(__dirname, 'src', 'pages'),
      },
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-theme-ui',
  ],
};
