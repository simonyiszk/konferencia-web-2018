import { css } from 'emotion';
import PropTypes from 'prop-types';
import React from 'react';

const AspectRatioBox = ({
  aspectRatio, children, className, ...props
}) => (
  <div
    className={css`
      position: relative;
      overflow: hidden;
      height: 0;
      padding-top: ${100 / aspectRatio}%;
      ${className};
    `}
    {...props}
  >
    <div
      className={css`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      `}
    >
      {children}
    </div>
  </div>
);

AspectRatioBox.propTypes = {
  aspectRatio: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

AspectRatioBox.defaultProps = {
  className: '',
};

export default AspectRatioBox;
