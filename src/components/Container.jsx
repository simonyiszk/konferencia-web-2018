import PropTypes from 'prop-types';
import React from 'react';

const Container = ({ children, className, ...props }) => (
  <div
    css={[
      {
        width: '100%',
        padding: '0 1rem',
        margin: '0 auto',

        '@media (min-width: 576px)': {
          maxWidth: '540px',
        },

        '@media (min-width: 768px)': {
          maxWidth: '720px',
        },

        '@media (min-width: 992px)': {
          maxWidth: '960px',
        },

        '@media (min-width: 1200px)': {
          maxWidth: '1140px',
        },
      },
      className,
    ]}
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
