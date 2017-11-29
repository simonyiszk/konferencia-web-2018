import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import FaFacebookOfficial from 'react-icons/lib/fa/facebook-official';
import FaYouTubePlay from 'react-icons/lib/fa/youtube-play';
import FaInstagram from 'react-icons/lib/fa/instagram';

import 'normalize.css';

import Container from '../components/Container';

const Header = () => (
  <header
    css={{
      position: 'absolute',
      width: '100%',
      color: 'white',
    }}
  >
    <Container>
      <nav
        css={{
          height: '4rem',
          display: 'flex',
          alignItems: 'center',
          margin: '0 -1.5rem',

          '& a': {
            textDecoration: 'none',
            padding: '0.5rem',
            margin: '0 1rem',

            ':hover': {
              textDecoration: 'underline',
            },
          },

          '& ul': {
            padding: 0,
          },
        }}
      >
        <ul css={{ flex: 1 }}>
          <Link to="/">Főoldal</Link>
        </ul>
        <ul>
          <Link to="#videos">Videók</Link>
        </ul>
        <ul>
          <Link to="#gallery">Galéria</Link>
        </ul>
        <ul>
          <Link to="#sponsors">Támogatók</Link>
        </ul>
      </nav>
    </Container>
  </header>
);

const Footer = ({ data }) => (
  <footer
    css={{
      background: '#263238',
      color: 'white',
      textAlign: 'center',
      marginTop: '4rem',

      '& svg': {
        fontSize: '2rem',
        margin: '2rem',
      },
    }}
  >
    <a href={data.site.siteMetadata.siteFacebookURL} target="_blank" rel="noreferrer noopener">
      <FaFacebookOfficial />
    </a>
    <a href={data.site.siteMetadata.siteYouTubeURL} target="_blank" rel="noreferrer noopener">
      <FaYouTubePlay />
    </a>
    <a href={data.site.siteMetadata.siteInstagramURL} target="_blank" rel="noreferrer noopener">
      <FaInstagram />
    </a>
  </footer>
);

Footer.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

const IndexLayout = ({ children, data }) => (
  <div
    css={{
      fontFamily: 'Montserrat, sans-serif',
      boxSizing: 'border-box',

      '& *, & *:before, & *:after': {
        boxSizing: 'inherit',
      },

      '& a': {
        color: 'inherit',
      },
    }}
  >
    <Helmet
      defaultTitle={data.site.siteMetadata.title}
      titleTemplate={`%s | ${data.site.siteMetadata.title}`}
    >
      <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" />

      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>

    <Header />

    <main>{children()}</main>

    <Footer data={data} />
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
        siteFacebookURL
        siteYouTubeURL
        siteInstagramURL
      }
    }
  }
`;
