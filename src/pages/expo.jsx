import React from 'react';
import Helmet from 'react-helmet';
import 'whatwg-fetch';
import Container from '../components/Container';
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
    fetch('http://gyromouse.net/weboldal/konferenciapi/stand.php')
      .then(response => response.json())
      .then(exhibitors =>
        this.setState({
          isExhibitorDataLoaded: true,
          exhibitors,
        }));
  }

  render() {
    const { isExhibitorDataLoaded, exhibitors } = this.state;

    return (
      <PageContent>
        <Container>
          <Helmet title={frontmatter.title} />

          <h1>{frontmatter.title}</h1>

          <img
            src="http://gyromouse.net/weboldal/konferenciapi/map.png"
            alt="Térkép"
            className={styles.mapImage}
          />

          {isExhibitorDataLoaded ? (
            exhibitors.map(exhibitor => (
              <React.Fragment>
                <h2 key={exhibitor.id}>
                  {exhibitor.id} {exhibitor.name}
                </h2>

                <p>{exhibitor.description}</p>
              </React.Fragment>
            ))
          ) : (
            <p>Kiállítók adatainak betöltése folyamatban...</p>
          )}
        </Container>
      </PageContent>
    );
  }
}
