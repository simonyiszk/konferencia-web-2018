import { css } from 'emotion';
import PropTypes from 'prop-types';
import React from 'react';
import { mediaQueries } from '../utils/media-queries';

const Container = ({ children, className, ...props }) => (
  <div
    className={css`
      width: 100%;
      padding: 0 1rem;
      margin: 0 auto;

      ${mediaQueries.small(css`
        max-width: 540px;
      `)};

      ${mediaQueries.medium(css`
        max-width: 720px;
      `)};

      ${mediaQueries.large(css`
        max-width: 960px;
      `)};

      ${mediaQueries.xLarge(css`
        max-width: 1140px;
      `)};

      ${className};
    `}
    {...props}
  >
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Container.defaultProps = {
  className: '',
};

export default Container;
