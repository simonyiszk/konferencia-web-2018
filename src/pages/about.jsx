import PropTypes from 'prop-types';
import React from 'react';
import { css } from 'react-emotion';
import { mediaQueries } from '../utils/media-queries';
import Container from '../components/Container';

const AboutPage = ({ data }) => (
  <div>
    <Container
      className={css`
        margin-top: 2rem;

        & h1 {
          text-align: center;
        }
      `}
    >
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
    </Container>
  </div>
);

AboutPage.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default AboutPage;

export const query = graphql`
  query AboutPageQuery {
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
  }
`;
