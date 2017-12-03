import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import React from 'react';
import { css } from 'react-emotion';
import Helmet from 'react-helmet';
import FaChevronDown from 'react-icons/lib/fa/chevron-down';
import FaChevronUp from 'react-icons/lib/fa/chevron-up';
import FaFacebookOfficial from 'react-icons/lib/fa/facebook-official';
import FaYouTubePlay from 'react-icons/lib/fa/youtube-play';
import FaInstagram from 'react-icons/lib/fa/instagram';

import 'normalize.css';

import Container from '../components/Container';
import { mediaQueries } from '../utils/media-queries';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      isMenuOpen: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
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
            flexWrap: 'wrap',
            alignItems: 'center',

            '& a': {
              display: 'inline-block',
              padding: '0.5rem',
              margin: '1rem -0.5rem',
            },
          }}
        >
          <div css={{ flex: 1 }}>
            <Link to="/#home" onClick={() => this.setState({ isMenuOpen: false })}>
              Főoldal
            </Link>
          </div>

          <input
            id="menu-checkbox"
            name="isMenuOpen"
            type="checkbox"
            checked={this.state.isMenuOpen}
            onChange={this.handleInputChange}
            css={{
              display: 'none',

              '@media (max-width: 768px)': {
                '&:not(:checked)': {
                  '& + label > svg:nth-child(1)': {
                    display: 'none',
                  },

                  '& ~ nav > ul': {
                    display: 'none',
                  },
                },

                '&:checked': {
                  '& + label > svg:nth-child(2)': {
                    display: 'none',
                  },

                  '& ~ nav > ul': {
                    display: 'block',
                  },
                },
              },
            }}
          />

          {/* eslint-disable jsx-a11y/label-has-for */}
          <label
            htmlFor="menu-checkbox"
            className={css`
              cursor: pointer;
              user-select: none;

              ${mediaQueries.medium`
                display: none;
              `};
            `}
          >
            {/* eslint-enable jsx-a11y/label-has-for */}
            <FaChevronUp />
            <FaChevronDown />
          </label>

          <nav
            css={{
              '@media (max-width: 768px)': {
                width: '100%', // Wrap component onto a new line
              },
            }}
          >
            <ul
              className={css`
                display: flex;
                list-style-type: none;
                padding: 0;
                margin: 0;

                ${mediaQueries.medium`
                  & > li {
                    margin-left: 3rem;
                  }
                `};
              `}
            >
              {[['/#videos', 'Videók'], ['/#gallery', 'Galéria'], ['/#sponsors', 'Támogatók']].map(([to, name]) => (
                <li key={to}>
                  <Link to={to} onClick={() => this.setState({ isMenuOpen: false })}>
                    {name}
                  </Link>
                </li>
                ))}
            </ul>
          </nav>
        </Container>
      </header>
    );
  }
}

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

        '&:hover': {
          textDecoration: 'underline',
        },
      },

      // Fix anchor scroll positioning
      '& [id]:before': {
        display: 'block',
        content: '""',
        marginTop: '-4rem',
        height: '4rem',
        visibility: 'hidden',
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
