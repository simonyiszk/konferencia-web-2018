module.exports = {
  siteMetadata: {
    title: 'XV. Simonyi Konferencia',
    baseURL: 'https://konferencia.simonyi.bme.hu',
    eventDate: '2018-04-18',
    eventVenue: 'BME I épület',
    siteAddressURL:
      'https://www.google.com/maps/embed/v1/place?q=BME+I+épület&key=AIzaSyAY1JmvJcaJ3j_gKHAsKbOrkSZSp_P8wEg',
    siteAddressPretty: 'Budapest, Magyar tudósok körútja 2, 1117',
    siteEventbriteURL:
      'https://www.eventbrite.com/e/xv-simonyi-konferencia-tickets-41605153133?aff=web',
    siteEventbriteID: '41605153133',
    siteEmailURL: 'mailto:konferencia@simonyi.bme.hu',
    siteFacebookURL: 'https://facebook.com/simonyiszk',
    siteYouTubeURL: 'https://youtube.com/user/SimonyiSzakkoli',
    siteInstagramURL: 'https://instagram.com/simonyikonferencia',
    siteAppStoreURL:
      'https://itunes.apple.com/us/app/konferenciapp/id1213978754',
    siteGooglePlayURL:
      'https://play.google.com/store/apps/details?id=com.simonyi.konferenciapp',
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
    {
      resolve: 'gatsby-plugin-favicon',
      options: {
        logo: './static/favicon.png',
        icons: {},
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-113797893-2',
        anonymize: true,
        respectDNT: true,
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-react-next',
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp',
  ],
};
