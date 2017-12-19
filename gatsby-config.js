const siteEmailPretty = 'konferencia@simonyi.bme.hu';

module.exports = {
  siteMetadata: {
    title: 'XV. Simonyi Konferencia',
    siteAddressURL: 'https://goo.gl/maps/HrUqACf9FNF2',
    siteAddressPretty: 'Budapest, Magyar tudósok körútja 2, 1117',
    siteEmailURL: `mailto:${siteEmailPretty}`,
    siteEmailPretty,
    siteFacebookURL: 'https://facebook.com/simonyiszk',
    siteYouTubeURL: 'https://youtube.com/user/SimonyiSzakkoli',
    siteInstagramURL: 'https://instagram.com/simonyikonferencia',
  },
  plugins: [
    'gatsby-plugin-catch-links',
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'static',
        path: `${__dirname}/static/`,
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
