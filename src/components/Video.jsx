import { css } from 'emotion';
import PropTypes from 'prop-types';
import React from 'react';
import AspectRatioBox from './AspectRatioBox';

const transparentPixelSrc =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

const Video = ({
  aspectRatio, poster, className, ...props
}) => (
  <AspectRatioBox aspectRatio={aspectRatio}>
    <div
      className={css`
        width: 100%;
        height: 100%;

        ${poster != null &&
          css`
            background: url(${poster}) center / contain no-repeat;
          `};
      `}
    >
      <video
        {...poster != null && { poster: transparentPixelSrc }}
        className={css`
          width: 100%;
          height: 100%;
          ${className};
        `}
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
  poster: null,
  className: '',
};

export default Video;
