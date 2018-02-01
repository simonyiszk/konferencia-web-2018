import { css, injectGlobal } from 'emotion';
import Link, { withPrefix } from 'gatsby-link';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';

// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import normalizeCSS from '!raw-loader!normalize.css';

import Footer from '../components/Footer';

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

      {/* TODO: A proper navigation bar */}
      <header
        className={css`
          position: absolute;
        `}
      >
        <nav>
          <ul>
            <li>
              <Link to="/">Kezdőlap</Link>
            </li>
            <li>
              <Link to="/former-presentations">Korábbi előadások</Link>
            </li>
            <li>
              <Link to="/gallery">Galéria</Link>
            </li>
          </ul>
        </nav>
      </header>

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

      <Footer
        siteEmailURL={data.site.siteMetadata.siteEmailURL}
        siteFacebookURL={data.site.siteMetadata.siteFacebookURL}
        siteYouTubeURL={data.site.siteMetadata.siteYouTubeURL}
        siteInstagramURL={data.site.siteMetadata.siteInstagramURL}
        className={css`
          background: #263238;
          color: white;

          img {
            filter: brightness(0) invert(1);
          }
        `}
      />
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
