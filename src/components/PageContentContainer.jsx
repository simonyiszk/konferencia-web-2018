import { css } from 'emotion';
import PropTypes from 'prop-types';
import React from 'react';
import Container from './Container';

const PageContentContainer = ({ children, className, ...props }) => (
  <Container
    className={css`
      margin-top: 2rem;
      margin-bottom: 3rem;

      h1 {
        text-align: center;
      }

      > :first-child {
        margin-top: 0;
      }

      > :last-child {
        margin-bottom: 0;
      }

      ${className};
    `}
    {...props}
  >
    {children}
  </Container>
);

PageContentContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

PageContentContainer.defaultProps = {
  className: '',
};

export default PageContentContainer;
