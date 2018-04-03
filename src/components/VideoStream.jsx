import PropTypes from 'prop-types';
import React from 'react';
import AspectRatioBox from './AspectRatioBox';
import styles from './VideoStream.module.scss';

const VideoStream = ({
  src, title, aspectRatio, className, ...props
}) => (
  <AspectRatioBox aspectRatio={aspectRatio}>
    <iframe
      src={src}
      title={title}
      className={`${styles.frame} ${className}`}
      {...props}
    />
  </AspectRatioBox>
);

VideoStream.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  aspectRatio: PropTypes.number,
  className: PropTypes.string,
};

VideoStream.defaultProps = {
  aspectRatio: 16 / 9,
  className: '',
};

export default VideoStream;
