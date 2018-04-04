import PropTypes from 'prop-types';
import React from 'react';
import ContactInfo from '../components/ContactInfo';
import Container from '../components/Container';
import Highlight from '../components/Highlight';
import PageContent from '../components/PageContent';
import Presentation from '../components/Presentation';
import VideoStream from '../components/VideoStream';
import ContactSectionSeparatorSrc from '../data/section-separators/contact.svg';
import LocationSectionSeparatorSrc from '../data/section-separators/location.svg';
import SponsorsSectionSeparatorSrc from '../data/section-separators/sponsors.svg';
import Sponsors from '../sections/Sponsors';
import styles from './index.module.scss';

class IndexPage extends React.PureComponent {
  componentDidMount() {
    const { data } = this.props;

    if (typeof window !== 'undefined') {
      const eventbriteWidgetScript = document.createElement('script');
      eventbriteWidgetScript.type = 'text/javascript';
      eventbriteWidgetScript.src =
        'https://www.eventbrite.com/static/widgets/eb_widgets.js';

      document.head.appendChild(eventbriteWidgetScript);
      eventbriteWidgetScript.onload = () => {
        window.EBWidgets.createWidget({
          widgetType: 'checkout',
          eventId: data.site.siteMetadata.siteEventbriteID,
          modal: true,
          modalTriggerElementId: `eventbrite-widget-modal-trigger-${
            data.site.siteMetadata.siteEventbriteID
          }`,
          onOrderComplete: () => {},
        });
      };
    }
  }

  render() {
    const { data } = this.props;

    return (
      <div>
        <div className={styles.hero}>
          <Container className={styles.streamsSection}>
            <h1 className={styles.title}>{data.site.siteMetadata.title}</h1>

            <div className={styles.streamsContainer}>
              <div className={styles.stream}>
                <h2>IB028 (eredeti)</h2>

                <VideoStream
                  src="https://www.youtube.com/embed/AoDNLGFRNWs"
                  title="IB028 (eredeti) stream"
                  allowFullScreen
                />
              </div>

              <div className={styles.stream}>
                <h2>IB028 (szinkronos)</h2>

                <VideoStream
                  src="https://www.youtube.com/embed/AoDNLGFRNWs"
                  title="IB028 (szinkronos) stream"
                  allowFullScreen
                />
              </div>

              <div className={styles.stream}>
                <h2>IB025</h2>

                <VideoStream
                  src="https://www.youtube.com/embed/5qreqkHn1Vk"
                  title="IB025 stream"
                  allowFullScreen
                />
              </div>
            </div>
          </Container>

          <Container>
            <h1 className="text-center">Előadások</h1>

            <div className={styles.presentationsContainer}>
              {data.allPresentationsYaml.edges.map(({ node }) => (
                <Presentation
                  key={node.title}
                  title={node.title}
                  presenterName={node.presenterName}
                  presenterRole={node.presenterRole}
                  presenterImage={
                    node.presenterImage.childImageSharp.resolutions
                  }
                  time={node.time}
                  location={node.location}
                  abstract={node.abstract}
                />
              ))}
            </div>
          </Container>
        </div>

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

          <div className={styles.locationSection}>
            <img src={LocationSectionSeparatorSrc} alt="" />

            <Container>
              <h1>Helyszín</h1>

              <p className="text-center">
                <span role="img" aria-label="Parkoló jel">
                  🅿️
                </span>{' '}
                <em>
                  A helyszínen parkolási lehetőség csak korlátozott mennyiségben
                  érhető el
                </em>
              </p>

              <iframe
                src={data.site.siteMetadata.siteAddressURL}
                title="Térkép"
                className={styles.mapFrame}
              />
            </Container>
          </div>

          {/*
            <h1>Nyereményjáték</h1>
            <p>
              Szokásunkhoz híven a látogatók között idén is kisorsulunk értékes
              nyereményeket. A játékban való részvétel követelménye két – egy a
              Simonyi Károly Szakkollégium tagjai által és egy a rendezvény
              támogatói által biztosított – stand meglátogatása. Az említett standok
              felkeresésekor a telefonos applikáció – vagy az e-mailben kiküldött
              QR-kód – segítségével kerülhet be a nevünk a virtuális kalapba.
            </p>

            <div className={styles.sweepstakeIconsContainer}>
              <MdTabletMac />
              <MdDesktopWindows />
            </div>
          */}

          <div className={styles.contactSection}>
            <img src={ContactSectionSeparatorSrc} alt="" />

            <Container>
              <h1>Kapcsolat</h1>

              <div className={styles.contactInfosContainer}>
                {data.allContactsYaml.edges.map(({ node }) => (
                  <ContactInfo
                    key={node.name}
                    name={node.name}
                    role={node.role}
                    email={node.email}
                    telephone={node.telephone}
                    image={node.image.childImageSharp.resolutions}
                    className={styles.contactInfo}
                  />
                ))}
              </div>
            </Container>
          </div>

          <div>
            <img src={SponsorsSectionSeparatorSrc} alt="" />

            <Container>
              <Sponsors data={data} />
            </Container>
          </div>
        </PageContent>
      </div>
    );
  }
}

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
        siteEventbriteID
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
              resolutions(width: 92, height: 92, cropFocus: CENTER) {
                ...GatsbyImageSharpResolutions
              }
            }
          }
          time
          location
          abstract
        }
      }
    }

    allContactsYaml {
      edges {
        node {
          name
          role
          email
          telephone
          image {
            childImageSharp {
              resolutions(width: 256, height: 256, cropFocus: CENTER) {
                ...GatsbyImageSharpResolutions
              }
            }
          }
        }
      }
    }

    ...SponsorsSection
  }
`;
