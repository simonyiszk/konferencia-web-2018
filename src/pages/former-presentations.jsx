import { css } from 'emotion';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import Container from '../components/Container';
import PresentationVideo from '../components/PresentationVideo';
import { gap } from '../utils/flexbox';
import { mediaQueries } from '../utils/media-queries';

export const frontmatter = {
  title: 'Korábbi előadások',
};

const FormerPresentationsPage = ({ data }) => (
  <Container>
    <Helmet title={frontmatter.title} />

    <h1>{frontmatter.title}</h1>

    <div
      className={css`
        ${gap('1rem')};

        ${mediaQueries.large(css`
          ${gap('2rem 1rem')};
        `)};
      `}
    >
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
  </Container>
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
