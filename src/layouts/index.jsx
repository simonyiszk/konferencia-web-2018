import PropTypes from 'prop-types';
import React from 'react';
import { css, injectGlobal } from 'react-emotion';
import Headroom from 'react-headroom';
import Helmet from 'react-helmet';
import FaChevronDown from 'react-icons/lib/fa/chevron-down';
import FaChevronUp from 'react-icons/lib/fa/chevron-up';
import FaEnvelope from 'react-icons/lib/fa/envelope';
import FaFacebookOfficial from 'react-icons/lib/fa/facebook-official';
import FaYouTubePlay from 'react-icons/lib/fa/youtube-play';
import FaInstagram from 'react-icons/lib/fa/instagram';

import 'normalize.css';

import SimonyiLogo from '../../static/assets/logos/simonyi.svg';
import SimonyiKonferenciaLogo from '../../static/assets/logos/simonyi-konferencia.svg';
import Container from '../components/Container';
import { mediaQueries } from '../utils/media-queries';

const SMOOTH_SCROLL_INTERVAL = 1000;

if (typeof window !== 'undefined') {
  // Make scroll behavior of internal links smooth
  // eslint-disable-next-line global-require
  require('smooth-scroll')('a[href*="#"]');
}

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  body {
    box-sizing: border-box;
    font-family: Montserrat, sans-serif;
    scroll-behavior: smooth;
    overflow-x: hidden;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  a {
    color: #03a9f4;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }

    header &, footer & {
      color: inherit;
    }
  }

  p {
    line-height: 1.5;
  }

  /* Fix anchor scroll positioning */
  [id]::before {
    display: block;
    content: '';
    margin-top: -4rem;
    height: 4rem;
  }
`;

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      isNavExpanded: false,
      headroomDownTolerance: 0,
    };

    this.handleInputChange = this.handleInputChange.bind(this);

    if (typeof window !== 'undefined') {
      // Keep headroom pinned during smooth scroll
      window.addEventListener('hashchange', () => {
        // Clear previous timeout
        window.clearTimeout(this.headroomEnableUnpinTimeoutID);

        // Disable headroom unpinning caused by scrolling downwards
        this.setState({ headroomDownTolerance: Number.POSITIVE_INFINITY });
        this.headroom.pin();

        // Re-enable headroom unpinning after smooth scroll
        this.headroomEnableUnpinTimeoutID = window.setTimeout(
          () => this.setState({ headroomDownTolerance: 0 }),
          SMOOTH_SCROLL_INTERVAL,
        );
      });
    }
  }

  handleInputChange(event) {
    const { target } = event;
    const value = target.checked;

    this.setState({
      [target.name]: value,
    });
  }

  render() {
    return (
      <Headroom
        ref={(headroom) => {
          this.headroom = headroom;
        }}
        downTolerance={this.state.headroomDownTolerance}
        className={css`
          position: absolute;
          width: 100%;
          color: white;
        `}
      >
        <nav
          className={css`
            background: #009688;
            transition: all 0.5s;

            .headroom--unfixed & {
              ${!this.state.isNavExpanded
                ? 'background: transparent;'
                : mediaQueries.large`
                  background: transparent;
                `};
            }
          `}
        >
          <Container
            className={css`
              display: flex;
              flex-wrap: wrap;
              align-items: center;

              & a {
                display: inline-block;
                margin: 1rem 0;
              }
            `}
          >
            <div
              className={css`
                flex: 1;
                transition: all 0.5s;

                .headroom--unfixed & {
                  ${!this.state.isNavExpanded &&
                    `
                    opacity: 0;
                    visibility: hidden;
                  `}
              `}
            >
              <a href="/#home" onClick={() => this.setState({ isNavExpanded: false })}>
                <img
                  src={SimonyiKonferenciaLogo}
                  alt="Simonyi Konferencia"
                  className={css`
                    height: 2em;
                    filter: brightness(0) invert(1);
                  `}
                />
              </a>
            </div>

            <input
              id="navbar-toggler"
              name="isNavExpanded"
              type="checkbox"
              role="button"
              checked={this.state.isNavExpanded}
              aria-controls="navbar-collapse"
              aria-expanded={this.state.isNavExpanded}
              onChange={this.handleInputChange}
              className={css`
                display: none;

                & ~ div > ul {
                  display: none;

                  ${mediaQueries.large`
                    display: flex;
                  `};
                }

                &:not(:checked) {
                  & + label > :nth-child(1) {
                    display: none;
                  }
                }

                &:checked {
                  & + label > :nth-child(2) {
                    display: none;
                  }

                  & ~ div > ul {
                    display: block;

                    ${mediaQueries.large`
                      display: flex;
                    `};
                  }
                }
              `}
            />

            <label
              htmlFor="navbar-toggler"
              aria-label="Navigáció mutatása/elrejtése"
              className={css`
                user-select: none;
                padding: 0.5rem;
                margin: -0.5rem;

                ${mediaQueries.large`
                  display: none;
                `};
              `}
            >
              <FaChevronUp />
              <FaChevronDown />
            </label>

            <div
              id="navbar-collapse"
              className={css`
                width: 100%; /* Wrap component onto a new line */

                ${mediaQueries.large`
                  width: auto;
                `};
              `}
            >
              <ul
                className={css`
                  list-style-type: none;
                  padding: 0;
                  margin: 0;

                  && a {
                    padding: 0.5rem;
                    margin: 1rem -0.5rem;
                  }

                  ${mediaQueries.large`
                    & > li {
                      margin-left: 3rem;
                    }
                  `};
                `}
              >
                {[
                  ['/#about', 'A Konferenciáról'],
                  ['/#presentations', 'Előadások'],
                  ['/#gallery', 'Galéria'],
                ].map(([to, name]) => (
                  <li key={to}>
                    <a href={to} onClick={() => this.setState({ isNavExpanded: false })}>
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </nav>
      </Headroom>
    );
  }
}

const IndexLayout = ({ children, data }) => (
  <div
    className={css`
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    `}
  >
    <Helmet
      defaultTitle={data.site.siteMetadata.title}
      titleTemplate={`%s | ${data.site.siteMetadata.title}`}
    >
      <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" />

      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>

    <header>
      <Navbar />
    </header>

    <main
      className={css`
        flex: 1;
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
        margin-top: 4rem;
      `}
    >
      <Container>
        <img
          src={SimonyiLogo}
          alt="Simonyi Károly Szakkollégium"
          className={css`
            margin: 0.5em;
            max-height: 2em;
            filter: brightness(0) invert(1);
          `}
        />

        <div
          className={css`
            display: flex;
            justify-content: space-between;
            margin: 0 auto;
            min-width: 40%;
            max-width: 10em;

            & a {
              margin: 0.5em;
            }
          `}
        >
          <a href={data.site.siteMetadata.siteEmailURL}>
            <FaEnvelope />
          </a>
          <a
            href={data.site.siteMetadata.siteFacebookURL}
            target="_blank"
            rel="noreferrer noopener"
          >
            <FaFacebookOfficial />
          </a>
          <a href={data.site.siteMetadata.siteYouTubeURL} target="_blank" rel="noreferrer noopener">
            <FaYouTubePlay />
          </a>
          <a
            href={data.site.siteMetadata.siteInstagramURL}
            target="_blank"
            rel="noreferrer noopener"
          >
            <FaInstagram />
          </a>
        </div>
      </Container>
    </footer>
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
