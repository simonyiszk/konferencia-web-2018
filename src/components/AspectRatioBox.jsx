import PropTypes from 'prop-types';
import React from 'react';
import styles from './AspectRatioBox.module.scss';

const AspectRatioBox = ({
  aspectRatio,
  children,
  className,
  style,
  ...props
}) => (
  <div
    className={`${styles.root} ${className}`}
    style={{
      paddingTop: `${100 / aspectRatio}%`,
      ...style,
    }}
    {...props}
  >
    <div className={styles.inner}>{children}</div>
  </div>
);

AspectRatioBox.propTypes = {
  aspectRatio: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.shape({}),
};

AspectRatioBox.defaultProps = {
  className: '',
  style: {},
};

export default AspectRatioBox;
