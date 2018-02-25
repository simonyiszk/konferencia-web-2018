import Link, { withPrefix } from 'gatsby-link';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import SimonyiKonferenciaLogoSrc from '../data/logos/simonyi-konferencia.svg';
import styles from './index.module.scss';
import './index.scss';

const IndexLayout = ({ children, data, location }) => {
  const isHomepage = location.pathname === withPrefix('/');

  return (
    <div className={styles.root}>
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
      <header className={styles.header}>
        <Navbar
          brand={() => (
            <Link to="/">
              <img src={SimonyiKonferenciaLogoSrc} alt="Kezdőlap" />
            </Link>
          )}
          allocateSpace={!isHomepage}
        >
          <Link to="/">Kezdőlap</Link>
          <Link to="/retrospective">Visszatekintés</Link>
          <Link to="/expo">Expo</Link>
          <Link to="/pressroom">Sajtószoba</Link>
        </Navbar>
      </header>

      <main className={styles.main}>{children()}</main>

      <Footer
        siteEmailURL={data.site.siteMetadata.siteEmailURL}
        siteFacebookURL={data.site.siteMetadata.siteFacebookURL}
        siteYouTubeURL={data.site.siteMetadata.siteYouTubeURL}
        siteInstagramURL={data.site.siteMetadata.siteInstagramURL}
        className={styles.footer}
      />
    </div>
  );
};

IndexLayout.propTypes = {
  children: PropTypes.func.isRequired,
  data: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
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
