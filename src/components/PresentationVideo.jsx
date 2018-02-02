import PropTypes from 'prop-types';
import React from 'react';
import styles from './PresentationVideo.module.scss';
import Video from './Video';

const PresentationVideo = ({
  title,
  source,
  aspectRatio,
  thumbnail,
  abstract,
  className,
  ...props
}) => (
  <article className={`${styles.root} ${className}`} {...props}>
    <div>
      <h2 className={styles.title}>{title}</h2>

      <p>{abstract}</p>
    </div>

    <div>
      <Video
        src={source}
        aspectRatio={aspectRatio}
        poster={thumbnail.src}
        controls
      />
    </div>
  </article>
);

PresentationVideo.propTypes = {
  title: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  aspectRatio: PropTypes.number.isRequired,
  thumbnail: PropTypes.shape({}).isRequired,
  abstract: PropTypes.string.isRequired,
  className: PropTypes.string,
};

PresentationVideo.defaultProps = {
  className: '',
};

export default PresentationVideo;
