import PropTypes from 'prop-types';
import React from 'react';
import { css } from 'react-emotion';
import AspectRatioBox from './AspectRatioBox';

const transparentPixelSrc =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

const Video = ({
  aspectRatio, poster, className, ...props
}) => (
  <AspectRatioBox aspectRatio={aspectRatio}>
    <div
      className={css`
        background: url(${poster}) center / contain no-repeat;
      `}
    >
      <video
        className={css`
          width: 100%;
          height: 100%;
          ${className};
        `}
        {...props}
        poster={transparentPixelSrc}
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
  poster: undefined,
  className: undefined,
};

export default Video;
