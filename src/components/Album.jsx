import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './Album.module.scss';
import Lightbox from './Lightbox';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      isLightboxOpen: false,
    };

    this.closeLightbox = this.closeLightbox.bind(this);
    this.handleClickThumbnail = this.handleClickThumbnail.bind(this);
  }

  closeLightbox() {
    this.setState({
      isLightboxOpen: false,
    });
  }

  handleClickThumbnail(event) {
    event.preventDefault();
    this.setState({
      isLightboxOpen: true,
    });
  }

  render() {
    const {
      title, source, thumbnail, images, ...props
    } = this.props;
    const { isLightboxOpen } = this.state;

    return (
      <div {...props}>
        <h2 className={styles.title}>{title}</h2>

        <a
          href={source}
          target="_blank"
          rel="noopener noreferrer"
          onClick={this.handleClickThumbnail}
        >
          <Img sizes={thumbnail} />
        </a>

        <Lightbox
          images={images}
          isOpen={isLightboxOpen}
          onClose={this.closeLightbox}
        />
      </div>
    );
  }
}

Album.propTypes = {
  title: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  thumbnail: PropTypes.shape({}).isRequired,
  images: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Album;
