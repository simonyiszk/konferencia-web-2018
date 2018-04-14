import PropTypes from 'prop-types';
import React from 'react';
import FaRefresh from 'react-icons/lib/fa/refresh';
import styles from './LoadingIndicator.module.scss';

const LoadingIndicator = ({ className }) => (
  <FaRefresh className={`${styles.root} ${className}`} />
);

LoadingIndicator.propTypes = {
  className: PropTypes.string,
};

LoadingIndicator.defaultProps = {
  className: '',
};

export default LoadingIndicator;
