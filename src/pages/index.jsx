import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React from 'react';
import { css } from 'react-emotion';
import Container from '../components/Container';
import { mediaQueries } from '../utils/media-queries';

const transparentPixelSrc =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

const VideosSection = ({ data }) => (
  <div id="videos">
    <h1>Videók</h1>

    <div
      className={css`
        margin: -1rem 0;

        ${mediaQueries.large`
          margin: -1rem -3rem;
        `};
      `}
    >
      {data.videos.edges.map(({ node: video }) => {
        let thumbnailSrc;
        if (video.frontmatter.thumbnail != null) {
          thumbnailSrc =
            video.frontmatter.thumbnail.childImageSharp != null
              ? video.frontmatter.thumbnail.childImageSharp.sizes.src
              : `/${video.frontmatter.thumbnail.relativePath}`;
        }

        return (
          <article
            key={video.frontmatter.source}
            className={css`
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              margin: 1rem 0;

              ${mediaQueries.large`
                flex-wrap: nowrap;

                & > * {
                  flex-basis: 50%;
                  margin: 1rem 3rem;
                }

                &:nth-child(odd) {
                  flex-direction: row-reverse;
                }
              `};
            `}
          >
            <div>
              <h2>{video.frontmatter.title}</h2>

              <p
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: video.html }}
              />
            </div>

            <div>
              <video
                src={video.frontmatter.source}
                poster={transparentPixelSrc}
                controls
                className={css`
                  width: 100%;
                  background: url(${thumbnailSrc}) center / contain no-repeat;
                `}
              />
            </div>
          </article>
        );
      })}
    </div>
  </div>
);

VideosSection.propTypes = {
  data: PropTypes.shape({}).isRequired,
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
      {data.galleries.edges.map(({ node: album }) => (
        <div
          key={album.frontmatter.source}
          className={css`
            flex: 100%;
            padding: 1rem;

            & * {
              height: 100%;
            }

            ${mediaQueries.small`
              flex: 50%;
            `};
          `}
        >
          <a href={album.frontmatter.source} target="_blank" rel="noreferrer noopener">
            <Img sizes={album.frontmatter.thumbnail.childImageSharp.sizes} />
          </a>
        </div>
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
        height: 100vh;
        display: flex;
        align-items: center;
      `}
    >
      <Container
        className={css`
          & h1 {
            font-size: 3rem;
          }

          & h2 {
            font-size: 2rem;
          }

          & h3 {
            font-size: 1rem;
          }

          ${mediaQueries.small`
            & h1 {
              font-size: 10vmin;
            }

            & h2 {
              font-size: 5vmin;
            }

            & h3 {
              font-size: 3vmin;
            }
          `};
        `}
      >
        <h1
          className={css`
            word-spacing: 100vw;
          `}
        >
          {data.site.siteMetadata.title}
        </h1>
        <h2>2018. április 18.</h2>
        <h2>BME I épület</h2>
        <h3>{data.site.siteMetadata.siteAddressPretty}</h3>
      </Container>
    </div>

    <Container
      className={css`
        & h1 {
          text-align: center;
        }
      `}
    >
      <VideosSection data={data} />
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
            thumbnail {
              relativePath
              childImageSharp {
                sizes(maxWidth: 544) {
                  src
                }
              }
            }
          }
          html
        }
      }
    }
    galleries: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/albums/" } }
      sort: { fields: [fileAbsolutePath], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            source
            thumbnail {
              childImageSharp {
                sizes(maxWidth: 544) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  }
`;
