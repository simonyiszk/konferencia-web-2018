import PropTypes from 'prop-types';
import React from 'react';
import Container from '../components/Container';

const IndexPage = ({ data }) => (
  <div
    css={{
      background: 'linear-gradient(227.5deg, #00e676, #009688)',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <Container
      css={{
        color: 'white',

        '& h1': { fontSize: '3rem' },
        '& h2': { fontSize: '2rem' },
        '& h3': { fontSize: '1rem' },

        '@media (min-width: 576px)': {
          '& h1': { fontSize: '10vmin' },
          '& h2': { fontSize: '5vmin' },
          '& h3': { fontSize: '3vmin' },
        },
      }}
    >
      <h1 css={{ wordSpacing: '100vw' }}>{data.site.siteMetadata.title}</h1>
      <h2>2018. április 18.</h2>
      <h2>BME I épület</h2>
      <h3>Budapest, Magyar tudósok körútja 2, 1117</h3>
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
      }
    }
  }
`;
