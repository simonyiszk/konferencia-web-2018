import PropTypes from 'prop-types';
import React from 'react';
import ContactInfo from '../components/ContactInfo';
import Container from '../components/Container';
import Highlight from '../components/Highlight';
import PageContent from '../components/PageContent';
import Presentation from '../components/Presentation';
import VideoStream from '../components/VideoStream';
import GiveawayIllustrationSrc from '../data/illustrations/giveaway.svg';
import PrizesIllustrationSrc from '../data/illustrations/prizes.svg';
import AppStoreBadgeSrc from '../data/logos/app-store-badge.svg';
import GooglePlayBadgeSrc from '../data/logos/google-play-badge.svg';
import ContactSectionSeparatorSrc from '../data/section-separators/contact.svg';
import LocationSectionSeparatorSrc from '../data/section-separators/location.svg';
import SponsorsSectionSeparatorSrc from '../data/section-separators/sponsors.svg';
import Sponsors from '../sections/Sponsors';
import styles from './index.module.scss';

const flatten = array => array.reduce((acc, prev) => acc.concat(prev), []);

const PRESENTATIONS_DATA_REFRESH_INTERVAL = 60000;

class IndexPage extends React.Component {
  constructor(props) {
    super(props);

    const { data } = props;
    const initialPresentations = data.allPresentationsYaml.edges
      .map(edge => edge.node)
      .map(presentation => ({
        ...presentation,
        presenterImageSrc:
          presentation.presenterImage.childImageSharp.resolutions.src,
      }));

    this.state = {
      presentations: initialPresentations,
    };

    this.presentationsDataIntervalID = 0;
  }

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

      this.refreshPresentationsData();

      this.presentationsDataIntervalID = window.setInterval(
        () => this.refreshPresentationsData(),
        PRESENTATIONS_DATA_REFRESH_INTERVAL,
      );
    }
  }

  componentWillUnmount() {
    if (this.presentationsDataIntervalID !== 0) {
      window.clearInterval(this.presentationsDataIntervalID);
    }
  }

  refreshPresentationsData() {
    fetch('https://proxy.kir-dev.sch.bme.hu/weboldal/konferenciapi/timetable.php')
      .then(response => response.json())
      .then(rooms =>
        this.setState({
          presentations: flatten(rooms.map(room =>
            room.programs
              .filter(program => program.break !== '1')
              .map(program => ({
                title: program.title,
                presenterName: program.performer,
                presenterRole: program.titulus,
                presenterImageSrc: program.picture.replace(
                  'http://gyromouse.net/',
                  'https://proxy.kir-dev.sch.bme.hu/',
                ),
                time: program.time.split('-')[0],
                location: room.room,
                abstract: program.text,
              })))).sort((a, b) => {
            const locationDiff = b.location.localeCompare(a.location);
            if (locationDiff !== 0) return locationDiff;

            const timeDiff = a.time.localeCompare(b.time);
            return timeDiff;
          }),
        }));
  }

  render() {
    const { data } = this.props;
    const { presentations } = this.state;

    return (
      <div>
        <div className={styles.hero}>
          <Container className={styles.streamsSection}>
            <h1 className={styles.title}>{data.site.siteMetadata.title}</h1>

            <div className={styles.streamsContainer}>
              <div className={styles.stream}>
                <h2>IB028 (eredeti)</h2>

                <VideoStream
                  src="https://www.youtube.com/embed/EscCbYtogtM?rel=0"
                  title="IB028 (eredeti) stream"
                  allowFullScreen
                />
              </div>

              <div className={styles.stream}>
                <h2>IB028 (szinkronos)</h2>

                <VideoStream
                  src="https://www.youtube.com/embed/KFoza47wFnc?rel=0"
                  title="IB028 (szinkronos) stream"
                  allowFullScreen
                />
              </div>

              <div className={styles.stream}>
                <h2>IB025</h2>

                <VideoStream
                  src="https://www.youtube.com/embed/F_Lmto6Xd-M?rel=0"
                  title="IB025 stream"
                  allowFullScreen
                />
              </div>
            </div>
          </Container>

          <Container>
            <h1 className="text-center">Előadások</h1>

            <div className={styles.presentationsContainer}>
              {presentations.map(presentation => (
                <Presentation
                  key={presentation.title}
                  title={presentation.title}
                  presenterName={presentation.presenterName}
                  presenterRole={presentation.presenterRole}
                  presenterImageSrc={presentation.presenterImageSrc}
                  time={presentation.time}
                  location={presentation.location}
                  abstract={presentation.abstract}
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

          <div className={styles.giveawaySection}>
            <img
              src={GiveawayIllustrationSrc}
              alt=""
              className={styles.giveawayIllustrationImage}
            />

            <Container>
              <h1>Nyereményjáték</h1>

              <p>
                Szokásunkhoz híven a látogatók között idén is kisorsulunk
                értékes nyereményeket. A játékban való részvétel követelménye
                két – egy a Simonyi Károly Szakkollégium tagjai által és egy a
                rendezvény támogatói által biztosított – stand meglátogatása. Az
                említett standok felkeresésekor a telefonos applikáció
                segítségével kerülhet be a nevünk a virtuális kalapba.
              </p>

              <div className="text-center">
                <a
                  href={data.site.siteMetadata.siteAppStoreURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={AppStoreBadgeSrc}
                    alt="Letölthető az App Store-ból"
                    className={styles.appDownloadBadge}
                  />
                </a>

                <a
                  href={data.site.siteMetadata.siteGooglePlayURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={GooglePlayBadgeSrc}
                    alt="Szerezd meg: Google Play"
                    className={styles.appDownloadBadge}
                  />
                </a>
              </div>

              <img
                src={PrizesIllustrationSrc}
                alt="iPad, ultraszéles monitor"
                className={styles.prizesIllustrationImage}
              />
            </Container>
          </div>

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
        siteAppStoreURL
        siteGooglePlayURL
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
              resolutions(
                width: 92
                height: 92
                cropFocus: CENTER
                quality: 92
              ) {
                src
              }
            }
          }
          time: date(formatString: "HH:mm")
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
              resolutions(
                width: 256
                height: 256
                cropFocus: CENTER
                quality: 92
              ) {
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
