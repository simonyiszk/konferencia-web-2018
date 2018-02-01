import { css } from 'emotion';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import Album from '../components/Album';
import PageContentContainer from '../components/PageContentContainer';
import { gap } from '../utils/flexbox';
import { mediaQueries } from '../utils/media-queries';

export const frontmatter = {
  title: 'Galéria',
};

const GalleryPage = ({ data }) => (
  <PageContentContainer>
    <Helmet title={frontmatter.title} />

    <h1>{frontmatter.title}</h1>

    <div
      className={css`
        display: flex;
        flex-wrap: wrap;
        ${gap('1rem')};

        ${mediaQueries.large(css`
          ${gap('1rem 3rem')};
        `)};
      `}
    >
      {data.allAlbumsYaml.edges.map(({ node }) => (
        <Album
          key={node.source}
          title={node.title}
          source={node.source}
          thumbnail={node.thumbnail.childImageSharp.sizes}
          images={node.images.map(image => image.path.childImageSharp.sizes)}
          className={css`
            flex: 100%;

            ${mediaQueries.large(css`
              flex: 50%;
            `)};
          `}
        />
      ))}
    </div>
  </PageContentContainer>
);

GalleryPage.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default GalleryPage;

export const query = graphql`
  query GalleryPageQuery {
    allAlbumsYaml {
      edges {
        node {
          title
          source
          thumbnail {
            childImageSharp {
              sizes(maxWidth: 690, maxHeight: 460, cropFocus: EAST) {
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
`;
