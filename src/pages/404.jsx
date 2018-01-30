import React from 'react';
import { css } from 'react-emotion';
import Helmet from 'react-helmet';
import Container from '../components/Container';

const NotFoundPage = () => (
  <Container
    className={css`
      h1 {
        text-align: left;
      }
    `}
  >
    <Helmet title="Hiba" />

    <h1>Az oldal nem található</h1>
    <p>A kért oldal jelenleg nem elérhető vagy nem létezik.</p>
  </Container>
);

export default NotFoundPage;
