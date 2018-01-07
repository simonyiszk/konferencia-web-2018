import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React from 'react';
import { css } from 'react-emotion';
import Lightbox from 'react-images';
import SimonyiKonferenciaIcon from '../../static/assets/icons/simonyi-konferencia.svg';
import Container from '../components/Container';
import Video from '../components/Video';
import { mediaQueries } from '../utils/media-queries';

const AboutSection = ({ data }) => (
  <div id="about">
    <h1> A Konferenciáról</h1>

    <div
      className={css`
        display: flex;
        flex-wrap: wrap;

        ${mediaQueries.large`
          margin: -0.5rem -3rem;
        `};
      `}
    >
      {data.highlights.edges.map(({ node: highlight }) => (
        <section
          key={highlight.frontmatter.title}
          className={css`
            ${mediaQueries.large`
              flex: 50%;
              padding: 0.5rem 3rem;
            `};
          `}
        >
          <h2>
            <span role="img">{highlight.frontmatter.symbol}</span> {highlight.frontmatter.title}
          </h2>

          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: highlight.html }}
          />
        </section>
      ))}
    </div>
  </div>
);

AboutSection.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

const Presentation = ({
  title,
  /* eslint-disable no-unused-vars */
  presenterName,
  presenterRole,
  /* eslint-enable no-unused-vars */
  source,
  aspectRatio,
  thumbnail,
  html,
  className,
  ...props
}) => {
  let thumbnailSrc;
  if (thumbnail != null) {
    thumbnailSrc =
      thumbnail.childImageSharp != null
        ? thumbnail.childImageSharp.sizes.src
        : `/${thumbnail.relativePath}`;
  }

  return (
    <article
      {...props}
      className={css`
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        ${mediaQueries.large`
          flex-wrap: nowrap;
          margin: 0 -3rem;

          &:nth-of-type(odd) {
            flex-direction: row-reverse;
          }

          & > * {
            padding: 0 3rem;
            flex: 50%;
          }
        `};

        ${className};
      `}
    >
      <div>
        <h2>{title}</h2>

        <p
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>

      <Video src={source} aspectRatio={aspectRatio} poster={thumbnailSrc} controls />
    </article>
  );
};

Presentation.propTypes = {
  title: PropTypes.string.isRequired,
  presenterName: PropTypes.string,
  presenterRole: PropTypes.string,
  source: PropTypes.string.isRequired,
  aspectRatio: PropTypes.number.isRequired,
  thumbnail: PropTypes.shape({}),
  html: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Presentation.defaultProps = {
  presenterName: undefined,
  presenterRole: undefined,
  thumbnail: undefined,
  className: undefined,
};

const PresentationsSection = ({ data }) => (
  <div id="presentations">
    <h1>Korábbi előadások</h1>

    <div
      className={css`
        margin: -1rem;

        ${mediaQueries.large`
          margin: -2rem -1rem;
        `};
      `}
    >
      {data.videos.edges.map(({ node: video }) => (
        <Presentation
          key={video.frontmatter.source}
          title={video.frontmatter.title}
          presenterName={video.frontmatter.presenterName}
          presenterRole={video.frontmatter.presenterRole}
          source={video.frontmatter.source}
          aspectRatio={video.frontmatter.aspectRatio}
          thumbnail={video.frontmatter.thumbnail}
          html={video.html}
          className={css`
            padding: 1rem;

            ${mediaQueries.large`
              padding: 2rem 1rem;
            `};
          `}
        />
      ))}
    </div>
  </div>
);

PresentationsSection.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

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

const GallerySection = ({ data }) => (
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
);

GallerySection.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

const IndexPage = ({ data }) => (
  <div>
    <div
      id="home"
      className={css`
        background: linear-gradient(227.5deg, #00e676, #009688);
        color: white;
      `}
    >
      <Container
        className={css`
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <div
          className={css`
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            margin: 3em 0;
            text-align: center;

            & h1 {
              font-size: 1.5em;
            }

            & h2 {
              font-size: 1em;
            }

            & h3 {
              font-size: 0.67em;
            }

            ${mediaQueries.large`
              flex-wrap: nowrap;
              text-align: left;
              font-size: 1.5rem;

              & h1 {
                font-size: 2em;
              }

              & * > :first-child {
                margin-top: 0;
              }
            `};

            ${mediaQueries.xLarge`
              font-size: 1.75rem;
            `};
          `}
        >
          <div
            className={css`
              flex: 0 0 100%;

              ${mediaQueries.large`
                order: 1;
                flex: 0 0 30%;
              `};
            `}
          >
            <img
              src={SimonyiKonferenciaIcon}
              alt=""
              className={css`
                width: 60%;
                filter: brightness(0) invert(1);

                ${mediaQueries.small`
                  width: 30%;
                `};

                ${mediaQueries.large`
                  width: 100%;
                `};
              `}
            />
          </div>

          <div
            className={css`
              & h2 {
                display: inline;
                white-space: pre;

                ${mediaQueries.large`
                  display: block;
                `};
              }
            `}
          >
            <h1
              className={css`
                ${mediaQueries.large`
                  word-spacing: 100vw;
                `};
              `}
            >
              {data.site.siteMetadata.title}
            </h1>

            <div>
              <h2>2018. április 18.</h2>

              <h2
                className={css`
                  margin-bottom: 0;

                  &::before {
                    content: ' – ';

                    ${mediaQueries.large`
                    content: '';
                  `};
                  }
                `}
              >
                BME I épület
              </h2>
            </div>

            <h3
              className={css`
                display: none;
                margin-top: 0.5em;
                margin-bottom: 0;

                ${mediaQueries.large`
                  display: block;
                `};
              `}
            >
              {data.site.siteMetadata.siteAddressPretty}
            </h3>

            <a
              href="https://www.eventbrite.com/e/xv-simonyi-konferencia-tickets-41605153133?aff=web"
              target="_blank"
              rel="noopener noreferrer"
              role="button"
              className={css`
                display: inline-block;
                font-weight: bold;
                padding: 0.5em 1em;
                border: 0.25em solid white;
                color: inherit;
                margin-top: 1.5em;

                &:hover {
                  text-decoration: none;
                  background: white;
                  color: #009688;
                }
              `}
            >
              Regisztráció
            </a>
          </div>
        </div>
      </Container>
    </div>

    <Container
      className={css`
        margin-top: 2rem;

        & h1 {
          text-align: center;
        }
      `}
    >
      <AboutSection data={data} />
      <PresentationsSection data={data} />
      <GallerySection data={data} />
    </Container>
  </div>
);

IndexPage.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default IndexPage;

export const query = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        title
        siteAddressPretty
      }
    }
    highlights: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/highlights/" } }
      sort: { fields: [fileAbsolutePath] }
    ) {
      edges {
        node {
          frontmatter {
            title
            symbol
          }
          html
        }
      }
    }
    videos: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/videos/" } }
      sort: { fields: [fileAbsolutePath], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            presenterName
            presenterRole
            source
            aspectRatio
            thumbnail {
              relativePath
              childImageSharp {
                sizes(maxWidth: 688) {
                  src
                }
              }
            }
          }
          html
        }
      }
    }
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
