import PropTypes from 'prop-types';
import React from 'react';
import AspectRatioBox from './AspectRatioBox';
import styles from './Video.module.scss';

const transparentPixelSrc =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

const Video = ({
  aspectRatio, poster, className, ...props
}) => (
  <AspectRatioBox aspectRatio={aspectRatio}>
    <div
      className={styles.fillParent}
      style={
        poster && {
          background: `url(${poster}) center / contain no-repeat`,
        }
      }
    >
      <video
        {...poster && { poster: transparentPixelSrc }}
        className={`${styles.fillParent} ${className}`}
        {...props}
      />
    </div>
  </AspectRatioBox>
);

Video.propTypes = {
  aspectRatio: PropTypes.number.isRequired,
  poster: PropTypes.string,
  className: PropTypes.string,
};

Video.defaultProps = {
  poster: '',
  className: '',
};

export default Video;
