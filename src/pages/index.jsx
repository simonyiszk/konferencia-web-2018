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
    <article {...props}>
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
  presenterName: PropTypes.string.isRequired,
  presenterRole: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  aspectRatio: PropTypes.number.isRequired,
  thumbnail: PropTypes.shape({}),
  html: PropTypes.string.isRequired,
};

Presentation.defaultProps = {
  thumbnail: undefined,
};

const PresentationsSection = ({ data }) => (
  <div id="presentations">
    <h1>Korábbi előadások</h1>

    <div
      className={css`
        margin: -1rem;
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
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            padding: 1rem;

            ${mediaQueries.large`
              flex-wrap: nowrap;
              margin: -1rem -3rem;

              & > * {
                flex: 50%;
                padding: 1rem 3rem;
              }

              &:nth-child(odd) {
                flex-direction: row-reverse;
              }
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

const Album = ({
  title, source, thumbnailSizes, ...props
}) => (
  <div {...props}>
    <h2
      className={css`
        text-align: center;
        margin-top: 0;
      `}
    >
      {title}
    </h2>

    <a href={source} target="_blank" rel="noreferrer noopener">
      <Img sizes={thumbnailSizes} />
    </a>
  </div>
);

Album.propTypes = {
  title: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  thumbnailSizes: PropTypes.shape({}).isRequired,
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
        <Album
          key={album.frontmatter.source}
          title={album.frontmatter.title}
          source={album.frontmatter.source}
          thumbnailSizes={album.frontmatter.thumbnail.childImageSharp.sizes}
          className={css`
            flex: 100%;
            padding: 1rem;

            ${mediaQueries.medium`
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

          & h1 {
            font-size: 3em;
          }

          & h2 {
            font-size: 1.5em;
          }

          & h3 {
            font-size: 1em;
          }

          ${mediaQueries.large`
            font-size: 1.25rem;
          `};

          ${mediaQueries.xLarge`
            font-size: 1.5rem;
          `};
        `}
      >
        <div
          className={css`
            margin: 4em 0;

            & > :first-child {
              margin-top: 0;
            }

            & > :last-child {
              margin-bottom: 0;
            }
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

        <div
          className={css`
            flex: 0 0 30%;
            text-align: center;
            display: none;

            ${mediaQueries.medium`
              display: block;
            `};
          `}
        >
          <img
            src={SimonyiLogo}
            alt=""
            className={css`
              filter: brightness(0) invert(1);
              margin-bottom: 1.5em;
            `}
          />

          <a
            href="#todo"
            role="button"
            className={css`
              display: inline-block;
              padding: 0.5em 1em;
              border: 0.25em solid;
              color: inherit;
              font-weight: bold;

              &:hover {
                text-decoration: none;
                background: white;

                & div {
                  background: linear-gradient(227.5deg, #00e676, #009688);
                  -webkit-background-clip: text;
                  background-clip: text;
                  color: transparent;
                }
              }
            `}
          >
            <div>Regisztráció</div>
          </a>
        </div>
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
