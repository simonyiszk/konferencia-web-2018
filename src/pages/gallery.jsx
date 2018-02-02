import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import Album from '../components/Album';
import PageContentContainer from '../components/PageContentContainer';
import styles from './gallery.module.scss';

export const frontmatter = {
  title: 'Galéria',
};

const GalleryPage = ({ data }) => (
  <PageContentContainer>
    <Helmet title={frontmatter.title} />

    <h1>{frontmatter.title}</h1>

    <div className={styles.albumsContainer}>
      {data.allAlbumsYaml.edges.map(({ node }) => (
        <Album
          key={node.source}
          title={node.title}
          source={node.source}
          thumbnail={node.thumbnail.childImageSharp.sizes}
          images={node.images.map(image => image.path.childImageSharp.sizes)}
          className={styles.album}
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
