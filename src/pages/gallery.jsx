import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React from 'react';
import { css } from 'react-emotion';
import Lightbox from 'react-images';
import { mediaQueries } from '../utils/media-queries';
import Container from '../components/Container';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      isLightboxOpen: false,
      currentImage: 0,
    };

    this.closeLightbox = this.closeLightbox.bind(this);
    this.lightboxGoToPrev = this.lightboxGoToPrev.bind(this);
    this.lightboxGoToNext = this.lightboxGoToNext.bind(this);
    this.lightboxGoToIndex = this.lightboxGoToIndex.bind(this);
    this.handleClickThumbnail = this.handleClickThumbnail.bind(this);
    this.handleLightboxClickImage = this.handleLightboxClickImage.bind(this);
  }

  closeLightbox() {
    this.setState({
      currentImage: 0,
      isLightboxOpen: false,
    });
  }

  lightboxGoToPrev() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }

  lightboxGoToNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  lightboxGoToIndex(index) {
    this.setState({
      currentImage: index,
    });
  }

  handleClickThumbnail(event) {
    event.preventDefault();
    this.setState({
      isLightboxOpen: true,
    });
  }

  handleLightboxClickImage() {
    if (this.state.currentImage < this.props.images.length - 1) {
      this.lightboxGoToNext();
    }
  }

  render() {
    const {
      title, source, thumbnail, images, ...props
    } = this.props;
    const { isLightboxOpen } = this.state;

    return (
      <div {...props}>
        <h2
          className={css`
            text-align: center;
            margin-top: 0;
          `}
        >
          {title}
        </h2>

        <a
          href={source}
          target="_blank"
          rel="noreferrer noopener"
          onClick={this.handleClickThumbnail}
        >
          <Img sizes={thumbnail} />
        </a>

        <Lightbox
          images={images.map(({ src, srcSet }) => ({ src, srcSet: srcSet.split(',\n') }))}
          currentImage={this.state.currentImage}
          isOpen={isLightboxOpen}
          backdropClosesModal
          showImageCount={false}
          showThumbnails
          closeButtonTitle="Bezárás (Esc)"
          leftArrowTitle="Előző (Balra nyíl)"
          rightArrowTitle="Következő (Jobbra nyíl)"
          onClose={this.closeLightbox}
          onClickPrev={this.lightboxGoToPrev}
          onClickNext={this.lightboxGoToNext}
          onClickImage={this.handleLightboxClickImage}
          onClickThumbnail={this.lightboxGoToIndex}
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

const GalleryPage = ({ data }) => (
  <div>
    <Container
      className={css`
        margin-top: 2rem;

        & h1 {
          text-align: center;
        }
      `}
    >
      <div id="gallery">
        <h1>Galéria</h1>

        <div
          className={css`
            display: flex;
            flex-wrap: wrap;
            margin: -1rem;
          `}
        >
          {data.albums.edges.map(({ node: album }) => (
            <Album
              key={album.frontmatter.source}
              title={album.frontmatter.title}
              source={album.frontmatter.source}
              thumbnail={album.frontmatter.thumbnail.childImageSharp.sizes}
              images={album.frontmatter.images.map(image => image.path.childImageSharp.sizes)}
              className={css`
                flex: 100%;
                padding: 1rem;

                ${mediaQueries.large`
                  flex: 50%;
                `};
              `}
            />
          ))}
        </div>
      </div>
    </Container>
  </div>
);

GalleryPage.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default GalleryPage;

export const query = graphql`
  query GalleryPageQuery {
    albums: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/albums/" } }
      sort: { fields: [fileAbsolutePath], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            source
            thumbnail {
              childImageSharp {
                sizes(maxWidth: 688) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
            images {
              path {
                childImageSharp {
                  sizes(maxWidth: 1024, jpegProgressive: true) {
                    src
                    srcSet
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
