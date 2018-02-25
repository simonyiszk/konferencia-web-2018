import PropTypes from 'prop-types';
import React from 'react';
import AspectRatioBox from '../components/AspectRatioBox';
import Container from '../components/Container';
import Hero from '../components/Hero';
import Highlight from '../components/Highlight';
import PageContent from '../components/PageContent';
import Presentation from '../components/Presentation';
import PresentationsAssetSrc from '../data/assets/presentations.svg';
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

          <div>
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

          <a
            href={data.site.siteMetadata.siteEventbriteURL}
            target="_blank"
            rel="noopener noreferrer"
            role="button"
            className={styles.registrationButton}
          >
            Regisztráció
          </a>
        </div>
      </Container>
    </Hero>

    <PageContent>
      <Container>
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
      </Container>

      <AspectRatioBox aspectRatio={5}>
        <img
          // TODO: Avoid hacky workarounds
          style={{
            marginTop: '2em',
            marginBottom: '-1em',
            width: '100%',
            height: '100%',
          }}
          src={PresentationsAssetSrc}
          alt=""
        />
      </AspectRatioBox>

      <div style={{ background: '#eee' }}>
        <Container>
          <h1 style={{ marginTop: 0 }}>Előadások</h1>

          <div className={styles.presentationsContainer}>
            {data.allPresentationsYaml.edges.map(({ node }) => (
              <Presentation
                key={node.title}
                title={node.title}
                presenterName={node.presenterName}
                presenterRole={node.presenterRole}
                presenterImage={node.presenterImage.childImageSharp.resolutions}
                abstract={node.abstract}
              />
            ))}
          </div>
        </Container>
      </div>

      <h1>Helyszín</h1>

      <Container>
        <p>
          <span role="img" aria-label="Térkép jelölő">
            📍
          </span>{' '}
          {data.site.siteMetadata.siteAddressPretty}
          <br />
          <span role="img" aria-label="Parkoló jel">
            🅿️
          </span>{' '}
          A helyszínen parkolási lehetőség csak korlátozott mennyiségben érhető
          el.<br />
          Tömegközlekedéssel a legközelebbi villamosmegállók: a 4-6-os villamos
          vonalán: Petőfi híd, budai hídfő 1-es villamos vonalán: Infopark
        </p>
      </Container>

      <iframe
        src={data.site.siteMetadata.siteAddressURL}
        title="Térkép"
        className={styles.mapFrame}
      />

      <Container>
        <h1>Nyereményjáték</h1>
        <p>
          Szokásunkhoz híven a látogatók között idén is kisorsulunk értékes
          nyereményeket. A játékban való részvétel követelménye két – egy a
          Simonyi Károly Szakkollégium tagjai által és egy a rendezvény
          támogatói által biztosított – stand meglátogatása. Az említett standok
          felkeresésekor a telefonos applikáció – vagy az e-mailben kiküldött
          QR-kód – segítségével kerülhet be a nevünk a virtuális kalapba.
        </p>

        <h1>Kapcsolat</h1>
        <div className="text-center" style={{ height: '50vh' }}>
          TODO: Fő kapcsolattartók hozzáadása
        </div>

        <h1>Támogatók</h1>

        {data.allSponsorsYaml.edges.map(({ node }) => (
          <div key={node.category}>
            <h3 className="text-center">{node.category}</h3>
            <div className={styles.sponsorLogosContainer}>
              {node.organizations.map(organization =>
                  organization.logo != null && (
                    <img
                      key={organization.name}
                      src={organization.logo.publicURL}
                      alt={organization.name}
                      style={{ height: node.logosHeight }}
                    />
                  ))}
            </div>
          </div>
        ))}
      </Container>
    </PageContent>
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
        siteAddressURL
        siteAddressPretty
        siteEventbriteURL
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

    allPresentationsYaml {
      edges {
        node {
          title
          presenterName
          presenterRole
          presenterImage {
            childImageSharp {
              resolutions(width: 192, height: 192, cropFocus: CENTER) {
                ...GatsbyImageSharpResolutions
              }
            }
          }
          abstract
        }
      }
    }

    allSponsorsYaml {
      edges {
        node {
          category
          logosHeight
          organizations {
            name
            logo {
              publicURL
            }
          }
        }
      }
    }
  }
`;
