import PropTypes from 'prop-types';
import React from 'react';
import styles from './Sponsors.module.scss';

const Sponsors = ({ data }) => (
  <React.Fragment>
    <h1>Támogatók</h1>

    {data.allSponsorsYaml.edges.map(({ node }) => (
      <div key={node.category}>
        <h3 className="text-center">{node.category}</h3>
        <div className={styles.sponsorLogosContainer}>
          {node.organizations.map(organization =>
              organization.logo != null && (
                <img
                  key={organization.name}
                  src={organization.logo.image.publicURL}
                  alt={organization.name}
                  style={{ height: organization.logo.height }}
                />
              ))}
        </div>
      </div>
    ))}
  </React.Fragment>
);

Sponsors.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default Sponsors;

export const query = graphql`
  fragment SponsorsSection on RootQueryType {
    allSponsorsYaml {
      edges {
        node {
          category
          organizations {
            name
            logo {
              image {
                publicURL
              }
              height
            }
          }
        }
      }
    }
  }
`;
