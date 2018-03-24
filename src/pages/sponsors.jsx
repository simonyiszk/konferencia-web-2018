import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import Container from '../components/Container';
import PageContent from '../components/PageContent';
import Sponsors from '../sections/Sponsors';

export const frontmatter = {
  title: 'Támogatók',
};

const SponsorsPage = ({ data }) => (
  <PageContent>
    <Container>
      <Helmet title={frontmatter.title} />

      <Sponsors data={data} />
    </Container>
  </PageContent>
);

SponsorsPage.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default SponsorsPage;

export const query = graphql`
  query SponsorsPageQuery {
    ...SponsorsSection
  }
`;
