import React from 'react';
import Helmet from 'react-helmet';
import Container from '../components/Container';

const NotFoundPage = () => (
  <Container>
    <Helmet title="Hiba" />

    <h1>Az oldal nem található</h1>
    <p>A kért oldal jelenleg nem elérhető vagy nem létezik.</p>
  </Container>
);

export default NotFoundPage;
