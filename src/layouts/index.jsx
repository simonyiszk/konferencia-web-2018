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
      position: 'fixed',
      width: '100%',
      color: 'white',
      background: '#009688',
      zIndex: 9,
    }}
  >
    <Container
      css={{
        display: 'flex',
        alignItems: 'center',

        '& a': {
          display: 'block',
          padding: '0.5rem',
          margin: '1rem -0.5rem',
        },

        '& ul': {
          listStyleType: 'none',
          margin: 0,
        },

        '& li': {
          marginLeft: '3rem',
        },
      }}
    >
      <div css={{ flex: 1 }}>
        <Link to="/">Főoldal</Link>
      </div>

      <nav>
        <ul css={{ display: 'flex' }}>
          <li>
            <Link to="#videos">Videók</Link>
          </li>
          <li>
            <Link to="#gallery">Galéria</Link>
          </li>
          <li>
            <Link to="#sponsors">Támogatók</Link>
          </li>
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
        textDecoration: 'none',

        ':hover': {
          textDecoration: 'underline',
        },
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
