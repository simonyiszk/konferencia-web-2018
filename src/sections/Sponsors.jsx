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
          {node.organizations.map((organization) => {
            if (organization.logo == null) return null;

            const logoImage = (
              <img
                src={organization.logo.image.publicURL}
                alt={organization.name}
                style={{ height: organization.logo.height }}
              />
            );

            return organization.website != null ? (
              <a
                key={organization.name}
                href={organization.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {logoImage}
              </a>
            ) : (
              React.cloneElement(logoImage, {
                key: organization.name,
              })
            );
          })}
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
            website
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
