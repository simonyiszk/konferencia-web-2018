module.exports = {
  siteMetadata: {
    title: 'XV. Simonyi Konferencia',
  },
  plugins: [
    'gatsby-plugin-catch-links',
    'gatsby-plugin-glamor',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: ['gatsby-remark-smartypants'],
      },
    },
    'gatsby-transformer-sharp',
  ],
};
