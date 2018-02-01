import { css } from 'emotion';
import PropTypes from 'prop-types';
import React from 'react';
import { mediaQueries } from '../utils/media-queries';

const Hero = ({ children, className }) => (
  <div
    className={css`
      display: flex;
      align-items: center;

      h1 {
        font-size: 1.5em;

        ${mediaQueries.large(css`
          font-size: 2em;
        `)};
      }

      h2 {
        font-size: 1em;
      }

      h3 {
        font-size: 0.67em;
      }

      ${mediaQueries.large(css`
        font-size: 1.5rem;
      `)};

      ${mediaQueries.xLarge(css`
        font-size: 1.75rem;
      `)};

      ${className};
    `}
  >
    {children}
  </div>
);

Hero.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Hero.defaultProps = {
  className: '',
};

export default Hero;
