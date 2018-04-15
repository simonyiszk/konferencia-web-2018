import React from 'react';
import Helmet from 'react-helmet';
import 'whatwg-fetch';
import Container from '../components/Container';
import Hero from '../components/Hero';
import LoadingIndicator from '../components/LoadingIndicator';
import PageContent from '../components/PageContent';
import styles from './expo.module.scss';

export const frontmatter = {
  title: 'Expo',
};

export default class ExpoPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isExhibitorDataLoaded: false,
      exhibitors: [],
    };
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      fetch('http://gyromouse.net/weboldal/konferenciapi/stand.php')
        .then(response => response.json())
        .then(exhibitors =>
          this.setState({
            isExhibitorDataLoaded: true,
            exhibitors,
          }));
    }
  }

  render() {
    const { isExhibitorDataLoaded, exhibitors } = this.state;

    return (
      <div>
        <Helmet title={frontmatter.title} />

        <Hero>
          <Container className={styles.heroContentContainer}>
            {isExhibitorDataLoaded ? (
              <div className={styles.mapAndLegendContainer}>
                <div className={styles.mapImageContainer}>
                  <img
                    src="http://gyromouse.net/weboldal/konferenciapi/map.png"
                    alt="Térkép"
                    className={styles.mapImage}
                  />
                </div>

                <table className={styles.legendContainer}>
                  {exhibitors.map(exhibitor => (
                    <tr key={exhibitor.id}>
                      <td className="text-right">{exhibitor.id}</td>
                      <td>{exhibitor.name}</td>
                    </tr>
                  ))}
                </table>
              </div>
            ) : (
              <div className="text-center">
                <LoadingIndicator className={styles.loadingIndicator} />

                <p>Kiállítók adatainak betöltése folyamatban...</p>
              </div>
            )}
          </Container>
        </Hero>

        {isExhibitorDataLoaded && (
          <PageContent>
            <Container>
              <h1>Kiállítók</h1>

              {exhibitors.map(exhibitor => (
                <React.Fragment>
                  <h2 key={exhibitor.id}>{exhibitor.name}</h2>
                  <p>{exhibitor.description}</p>
                </React.Fragment>
              ))}
            </Container>
          </PageContent>
        )}
      </div>
    );
  }
}
