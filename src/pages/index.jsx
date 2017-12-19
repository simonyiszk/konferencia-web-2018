import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React from 'react';
import { css } from 'react-emotion';
import SimonyiLogo from '../../static/assets/logos/simonyi.svg';
import Container from '../components/Container';
import Video from '../components/Video';
import { mediaQueries } from '../utils/media-queries';

const AboutSection = () => (
  <div id="about">
    <h1> A Konferenciáról</h1>

    <div
      className={css`
        display: flex;
        flex-wrap: wrap;
        margin: 1em -2em;

        & section {
          padding: 0 2em;
          flex: 100%;

          ${mediaQueries.medium`
            flex: 50%;
          `};
        }
      `}
    >
      {Array.from({ length: 4 }).map(() => (
        <section>
          <h2>
            <span role="img" aria-label="Grinning Face">
              😀
            </span>{' '}
            Lorem ipsum
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
        </section>
      ))}
    </div>
  </div>
);

const VideosSection = ({ data }) => (
  <div id="videos">
    <h1>Korábbi előadások</h1>

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
                  flex: 50%;
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

            <Video
              src={video.frontmatter.source}
              aspectRatio={video.frontmatter.aspectRatio}
              poster={thumbnailSrc}
              controls
            />
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
          <a
            href={album.frontmatter.source}
            target="_blank"
            rel="noreferrer noopener"
            className={css`
              display: block;
              position: relative;

              &:hover {
                & > div {
                  opacity: 1;
                }
              }
            `}
          >
            <Img
              sizes={album.frontmatter.thumbnail.childImageSharp.sizes}
              className={css`
                transition: filter 0.5s;
                filter: brightness(0.8);

                &:hover {
                  filter: brightness(0.5);
                }

                ${mediaQueries.medium`
                  filter: none;
                `};
              `}
            />

            <div
              className={css`
                position: absolute;
                top: 0;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                pointer-events: none;
                transition: opacity 0.5s;
                font-size: 6em;
                color: white;

                ${mediaQueries.medium`
                  opacity: 0;
                `};
              `}
            >
              {album.frontmatter.title}
            </div>
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
      `}
    >
      <Container
        className={css`
          height: 100vh;
          display: flex;
          align-items: center;

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
        <div
          className={css`
            flex: 1;
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
        </div>

        <img
          src={SimonyiLogo}
          alt=""
          className={css`
            height: 50%;
            filter: brightness(0) invert(1);
            user-select: none;
            display: none;

            ${mediaQueries.large`
              display: block;
            `};
          `}
        />
      </Container>
    </div>

    <Container
      className={css`
        & h1 {
          text-align: center;
        }
      `}
    >
      <AboutSection />
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
            aspectRatio
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
            title
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
