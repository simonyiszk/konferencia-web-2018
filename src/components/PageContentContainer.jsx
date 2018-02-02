import PropTypes from 'prop-types';
import React from 'react';
import Container from './Container';
import styles from './PageContentContainer.module.scss';

const PageContentContainer = ({ children, className, ...props }) => (
  <Container className={`${styles.root} ${className}`} {...props}>
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
