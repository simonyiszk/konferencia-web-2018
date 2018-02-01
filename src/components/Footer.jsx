import { css } from 'emotion';
import PropTypes from 'prop-types';
import React from 'react';
import FaEnvelope from 'react-icons/lib/fa/envelope';
import FaFacebookOfficial from 'react-icons/lib/fa/facebook-official';
import FaInstagram from 'react-icons/lib/fa/instagram';
import FaYouTubePlay from 'react-icons/lib/fa/youtube-play';
import SimonyiSzakkollegiumLogoSrc from '../data/logos/simonyi-szakkollegium.svg';
import Container from './Container';

const Footer = ({
  siteEmailURL,
  siteFacebookURL,
  siteYouTubeURL,
  siteInstagramURL,
  className,
  ...props
}) => (
  <footer
    className={css`
      text-align: center;
      font-size: 2rem;
      padding: 0.5em 0;
      ${className};
    `}
    {...props}
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
        <a href={siteFacebookURL} target="_blank" rel="noopener noreferrer">
          <FaFacebookOfficial />
        </a>

        <a href={siteYouTubeURL} target="_blank" rel="noopener noreferrer">
          <FaYouTubePlay />
        </a>

        <a href={siteInstagramURL} target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>

        <a href={siteEmailURL}>
          <FaEnvelope />
        </a>
      </div>
    </Container>
  </footer>
);

Footer.propTypes = {
  siteEmailURL: PropTypes.string.isRequired,
  siteFacebookURL: PropTypes.string.isRequired,
  siteYouTubeURL: PropTypes.string.isRequired,
  siteInstagramURL: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Footer.defaultProps = {
  className: '',
};

export default Footer;
