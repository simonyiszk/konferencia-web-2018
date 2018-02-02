import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import PageContentContainer from '../components/PageContentContainer';
import PresentationVideo from '../components/PresentationVideo';
import styles from './former-presentations.module.scss';

export const frontmatter = {
  title: 'Korábbi előadások',
};

const FormerPresentationsPage = ({ data }) => (
  <PageContentContainer>
    <Helmet title={frontmatter.title} />

    <h1>{frontmatter.title}</h1>

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
  </PageContentContainer>
);

FormerPresentationsPage.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default FormerPresentationsPage;

export const query = graphql`
  query FormerPresentationsPageQuery {
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
  }
`;
