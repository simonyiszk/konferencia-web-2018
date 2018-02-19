import PropTypes from 'prop-types';
import React from 'react';
import styles from './PageContent.module.scss';

const PageContent = ({ children, className, ...props }) => (
  <div className={`${styles.root} ${className}`} {...props}>
    {children}
  </div>
);

PageContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

PageContent.defaultProps = {
  className: '',
};

export default PageContent;
