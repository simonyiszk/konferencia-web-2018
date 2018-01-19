import PropTypes from 'prop-types';
import React from 'react';
import { css } from 'react-emotion';
import Video from '../components/Video';
import { mediaQueries } from '../utils/media-queries';
import Container from '../components/Container';

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

const PresentationsPage = ({ data }) => (
  <div>
    <Container
      className={css`
        margin-top: 5rem;

        & h1 {
          text-align: center;
        }
      `}
    >
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
    </Container>
  </div>
);

PresentationsPage.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default PresentationsPage;

export const query = graphql`
  query PresentationsPageQuery {
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
  }
`;
