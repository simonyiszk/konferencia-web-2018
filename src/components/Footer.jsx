import PropTypes from 'prop-types';
import React from 'react';
import FaEnvelope from 'react-icons/lib/fa/envelope';
import FaFacebookOfficial from 'react-icons/lib/fa/facebook-official';
import FaInstagram from 'react-icons/lib/fa/instagram';
import FaYouTubePlay from 'react-icons/lib/fa/youtube-play';
import Container from './Container';
import styles from './Footer.module.scss';

const Footer = ({
  siteEmailURL,
  siteFacebookURL,
  siteYouTubeURL,
  siteInstagramURL,
  className,
  ...props
}) => (
  <footer className={`${styles.root} ${className}`} {...props}>
    <Container>
      <div className={styles.iconsContainer}>
        <a
          href={siteFacebookURL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <FaFacebookOfficial />
        </a>

        <a
          href={siteYouTubeURL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
        >
          <FaYouTubePlay />
        </a>

        <a
          href={siteInstagramURL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>

        <a href={siteEmailURL} aria-label="E-mail">
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
