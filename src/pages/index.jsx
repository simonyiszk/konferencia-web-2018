import PropTypes from 'prop-types';
import React from 'react';

const IndexPage = ({ data }) => (
  <div>
    <h1>{data.site.siteMetadata.title}</h1>
    <h2>2018. április 18.</h2>
    <h2>BME I épület</h2>
    <h3>Budapest, Magyar tudósok körútja 2, 1117</h3>
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
      }
    }
  }
`;
