import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import Album from '../components/Album';
import PageContentContainer from '../components/PageContentContainer';
import PresentationVideo from '../components/PresentationVideo';
import styles from './retrospective.module.scss';

export const frontmatter = {
  title: 'Visszatekintés',
};

const RetrospectivePage = ({ data }) => (
  <PageContentContainer>
    <Helmet title={frontmatter.title} />

    <h1>Korábbi előadások</h1>

    <div className={styles.presentationVideosContainer}>
      {data.allVideosYaml.edges.map(({ node }) => (
        <PresentationVideo
          key={node.source}
          title={node.title}
          source={node.source}
          aspectRatio={node.aspectRatio}
          thumbnail={node.thumbnail}
          abstract={node.abstract}
        />
      ))}
    </div>

    <h1>Galéria</h1>

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

RetrospectivePage.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default RetrospectivePage;

export const query = graphql`
  query RetrospectivePageQuery {
    allVideosYaml {
      edges {
        node {
          title
          source
          aspectRatio
          thumbnail {
            src: publicURL
          }
          abstract
        }
      }
    }

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
