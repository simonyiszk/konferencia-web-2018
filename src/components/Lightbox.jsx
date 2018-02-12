import PropTypes from 'prop-types';
import React from 'react';
import LightboxBase from 'react-images';

class Lightbox extends React.Component {
  constructor() {
    super();

    this.state = {
      currentImage: 0,
    };

    this.goToPrev = this.goToPrev.bind(this);
    this.goToNext = this.goToNext.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.handleClickImage = this.handleClickImage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen) {
      this.setState({
        currentImage: 0,
      });
    }
  }

  goToPrev() {
    this.setState(prevState => ({
      currentImage: prevState.currentImage - 1,
    }));
  }

  goToNext() {
    this.setState(prevState => ({
      currentImage: prevState.currentImage + 1,
    }));
  }

  goToIndex(index) {
    this.setState({
      currentImage: index,
    });
  }

  handleClickImage() {
    if (this.state.currentImage < this.props.images.length - 1) {
      this.goToNext();
    }
  }

  render() {
    const { images, ...props } = this.props;
    const { currentImage } = this.state;

    return (
      <LightboxBase
        images={images}
        currentImage={currentImage}
        backdropClosesModal
        showImageCount={false}
        showThumbnails
        closeButtonTitle="Bezárás (Esc)"
        leftArrowTitle="Előző (Balra nyíl)"
        rightArrowTitle="Következő (Jobbra nyíl)"
        onClickPrev={this.goToPrev}
        onClickNext={this.goToNext}
        onClickImage={this.handleClickImage}
        onClickThumbnail={this.goToIndex}
        {...props}
      />
    );
  }
}

Lightbox.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isOpen: PropTypes.bool,
};

Lightbox.defaultProps = {
  isOpen: false,
};

export default Lightbox;
