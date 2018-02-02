import PropTypes from 'prop-types';
import React from 'react';
import Container from '../components/Container';
import Hero from '../components/Hero';
import Highlight from '../components/Highlight';
import PageContentContainer from '../components/PageContentContainer';
import SimonyiKonferenciaIconSrc from '../data/icons/simonyi-konferencia.svg';
import styles from './index.module.scss';

const IndexPage = ({ data }) => (
  <div>
    <Hero className={styles.hero}>
      <Container className={styles.heroContentContainer}>
        <div className={styles.iconContainer}>
          <img src={SimonyiKonferenciaIconSrc} alt="" className={styles.icon} />
        </div>

        <div>
          <h1 className={styles.title}>{data.site.siteMetadata.title}</h1>

          <h2 className={styles.eventDate}>
            {data.site.siteMetadata.eventDate}
          </h2>

          <h2 className={styles.eventVenue}>
            {data.site.siteMetadata.eventVenue}
          </h2>

          <h3 className={styles.eventAddress}>
            {data.site.siteMetadata.siteAddressPretty}
          </h3>
        </div>
      </Container>
    </Hero>

    <PageContentContainer>
      <h1>A Konferenciáról</h1>

      <div className={styles.highlightsContainer}>
        {data.allHighlightsYaml.edges.map(({ node }) => (
          <Highlight
            key={node.title}
            title={node.title}
            symbol={node.symbol}
            symbolLabel={node.symbolLabel}
            text={node.text}
            className={styles.highlight}
          />
        ))}
      </div>
    </PageContentContainer>
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
        eventDate(formatString: "LL", locale: "hu")
        eventVenue
        siteAddressPretty
      }
    }

    allHighlightsYaml {
      edges {
        node {
          title
          symbol
          symbolLabel
          text
        }
      }
    }
  }
`;
