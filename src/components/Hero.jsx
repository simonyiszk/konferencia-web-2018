import PropTypes from 'prop-types';
import React from 'react';
import styles from './Hero.module.scss';

const Hero = ({ children, className, ...props }) => (
  <div className={`${styles.root} ${className}`} {...props}>
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
