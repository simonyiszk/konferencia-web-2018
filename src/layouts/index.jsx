import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';

import 'normalize.css';

const Header = () => (
  <header
    css={{
      position: 'absolute',
    }}
  >
    <Link to="/">Főoldal</Link>
  </header>
);

const IndexLayout = ({ children, data }) => (
  <div css={{ fontFamily: 'Montserrat, sans-serif' }}>
    <Helmet
      defaultTitle={data.site.siteMetadata.title}
      titleTemplate={`%s | ${data.site.siteMetadata.title}`}
    >
      <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" />

      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>

    <Header />

    <main>{children()}</main>
  </div>
);

IndexLayout.propTypes = {
  children: PropTypes.func.isRequired,
  data: PropTypes.shape({}).isRequired,
};

export default IndexLayout;

export const query = graphql`
  query IndexLayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
