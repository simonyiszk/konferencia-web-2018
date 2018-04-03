import Link, { withPrefix } from 'gatsby-link';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import SimonyiKonferenciaLogoSrc from '../data/logos/simonyi-konferencia.svg';
import { navbarBackgroundRGB } from '../utils/colors';
import styles from './index.module.scss';
import './index.scss';

const NavLink = ({ ...props }) => (
  <Link
    exact
    activeClassName={styles.navLinkActive}
    className={styles.navLink}
    {...props}
  />
);

export default class IndexLayout extends React.Component {
  constructor() {
    super();

    this.state = {
      windowScrollY: 0,
      windowInnerHeight: 1,
    };
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.state = {
        windowScrollY: window.scrollY,
        windowInnerHeight: window.innerHeight,
      };

      window.addEventListener('scroll', () => {
        this.setState({ windowScrollY: window.scrollY });
      });

      window.addEventListener('resize', () => {
        this.setState({ windowInnerHeight: window.innerHeight });
      });
    }
  }

  render() {
    const { children, data, location } = this.props;
    const { windowScrollY, windowInnerHeight } = this.state;
    const isHomepage = location.pathname === withPrefix('/');

    return (
      <React.StrictMode>
        <div className={styles.root}>
          <Helmet
            titleTemplate={`%s | ${data.site.siteMetadata.title}`}
            defaultTitle={data.site.siteMetadata.title}
          >
            <html lang="hu" />

            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta
              property="og:image"
              content="https://konferencia.simonyi.bme.hu/favicon.png"
            />

            <link
              href="https://fonts.googleapis.com/css?family=Montserrat"
              rel="stylesheet"
            />
          </Helmet>

          {/* TODO: A proper navigation bar */}
          <header className={styles.header}>
            <Navbar
              brandImageSrc={SimonyiKonferenciaLogoSrc}
              allocateSpace={!isHomepage}
              style={
                isHomepage
                  ? {
                      background: `rgba(${navbarBackgroundRGB}, ${Math.min(
                        windowScrollY / (windowInnerHeight / 2),
                        1,
                      )})`,
                    }
                  : {}
              }
              className={!isHomepage ? styles.navbarBackground : ''}
            >
              <NavLink to="/">Kezdőlap</NavLink>
              <NavLink to="/retrospective">Visszatekintés</NavLink>
              <NavLink to="/sponsors">Támogatók</NavLink>
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
      </React.StrictMode>
    );
  }
}

IndexLayout.propTypes = {
  children: PropTypes.func.isRequired,
  data: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

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
