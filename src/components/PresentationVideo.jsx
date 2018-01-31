import { css } from 'emotion';
import PropTypes from 'prop-types';
import React from 'react';
import { gap } from '../utils/flexbox';
import { mediaQueries } from '../utils/media-queries';
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
  <article
    {...props}
    className={css`
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      > * {
        flex: 100%;
      }

      ${mediaQueries.large(css`
        flex-wrap: nowrap;
        ${gap('0 3rem')};

        > * {
          flex: 50%;
        }

        :nth-of-type(odd) {
          flex-direction: row-reverse;
        }
      `)};
    `}
  >
    <div>
      <h2
        className={css`
          margin-top: 0;
        `}
      >
        {title}
      </h2>

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
