import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import Footer from '../components/Footer';
import styles from './index.module.scss';
import './index.scss';

const IndexLayout = ({ children, data }) => (
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
      <nav>
        <ul>
          <li>
            <Link to="/">Kezdőlap</Link>
          </li>
          <li>
            <Link to="/retrospective">Visszatekintés</Link>
          </li>
          <li>
            <Link to="/expo">Expo</Link>
          </li>
          <li>
            <Link to="/pressroom">Sajtószoba</Link>
          </li>
        </ul>
      </nav>
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
        siteEmailURL
        siteFacebookURL
        siteYouTubeURL
        siteInstagramURL
      }
    }
  }
`;
