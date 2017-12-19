import PropTypes from 'prop-types';
import React from 'react';
import { css } from 'react-emotion';

const AspectRatioBox = ({ aspectRatio, children, ...props }) => (
  <div
    className={css`
      height: 0;
      overflow: hidden;
      padding-top: ${100 / aspectRatio}%;
      position: relative;
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
};

export default AspectRatioBox;
