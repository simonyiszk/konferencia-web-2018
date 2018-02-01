import { css, injectGlobal } from 'emotion';
import { withPrefix } from 'gatsby-link';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import FaEnvelope from 'react-icons/lib/fa/envelope';
import FaFacebookOfficial from 'react-icons/lib/fa/facebook-official';
import FaInstagram from 'react-icons/lib/fa/instagram';
import FaYouTubePlay from 'react-icons/lib/fa/youtube-play';

// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import normalizeCSS from '!raw-loader!normalize.css';

import Container from '../components/Container';
import SimonyiSzakkollegiumLogoSrc from '../data/logos/simonyi-szakkollegium.svg';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  ${normalizeCSS};

  body {
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
    scroll-behavior: smooth;
    overflow-x: hidden;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  a {
    color: #0288d1;
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }

    header &,
    footer & {
      color: inherit;
    }
  }

  p {
    line-height: 1.5;
  }
`;

const IndexLayout = ({ children, location, data }) => {
  const isHomepage = location.pathname === withPrefix('/');

  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      `}
    >
      <Helmet
        titleTemplate={`%s | ${data.site.siteMetadata.title}`}
        defaultTitle={data.site.siteMetadata.title}
      >
        <html lang="hu" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link
          href="https://fonts.googleapis.com/css?family=Montserrat"
          rel="stylesheet"
        />
      </Helmet>

      {/* TODO: A navigation bar inside a HTML `<header>` element */}

      <main
        className={css`
          flex: 1;

          ${!isHomepage &&
            css`
              h1 {
                text-align: center;
              }
            `};
        `}
      >
        {children()}
      </main>

      <footer
        className={css`
          background: #263238;
          color: white;
          text-align: center;
          font-size: 2rem;
          padding: 0.5em 0;
        `}
      >
        <Container
          className={css`
            a,
            img {
              margin: 0.5em;
            }
          `}
        >
          <img
            src={SimonyiSzakkollegiumLogoSrc}
            alt="Simonyi Károly Szakkollégium"
            className={css`
              max-height: 2em;
              filter: brightness(0) invert(1);
            `}
          />

          <div
            className={css`
              display: flex;
              justify-content: space-between;
              margin: 0 auto;
              max-width: 12em;
            `}
          >
            <a
              href={data.site.siteMetadata.siteFacebookURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookOfficial />
            </a>

            <a
              href={data.site.siteMetadata.siteYouTubeURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYouTubePlay />
            </a>

            <a
              href={data.site.siteMetadata.siteInstagramURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>

            <a href={data.site.siteMetadata.siteEmailURL}>
              <FaEnvelope />
            </a>
          </div>
        </Container>
      </footer>
    </div>
  );
};

IndexLayout.propTypes = {
  children: PropTypes.func.isRequired,
  location: PropTypes.shape({}).isRequired,
  data: PropTypes.shape({}).isRequired,
};

export default IndexLayout;

export const query = graphql`
  query IndexLayoutQuery {
    site {
      siteMetadata {
        title
        siteEmailURL
        siteFacebookURL
        siteYouTubeURL
        siteInstagramURL
      }
    }
  }
`;
