module.exports = {
  siteMetadata: {
    title: 'XV. Simonyi Konferencia',
    eventDate: '2018-04-18',
    eventVenue: 'BME I épület',
    siteAddressURL: 'https://goo.gl/maps/HrUqACf9FNF2',
    siteAddressPretty: 'Budapest, Magyar tudósok körútja 2, 1117',
    siteEmailURL: 'mailto:konferencia@simonyi.bme.hu',
    siteFacebookURL: 'https://facebook.com/simonyiszk',
    siteYouTubeURL: 'https://youtube.com/user/SimonyiSzakkoli',
    siteInstagramURL: 'https://instagram.com/simonyikonferencia',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/src/data/`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-transformer-yaml',
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
  ],
};
