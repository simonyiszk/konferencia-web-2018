import React from 'react';
import Helmet from 'react-helmet';
import Container from '../components/Container';
import PageContent from '../components/PageContent';

const NotFoundPage = () => (
  <PageContent>
    <Container>
      <Helmet title="Hiba" />

      <h1>Az oldal nem található</h1>
      <p className="text-center">
        A kért oldal jelenleg nem elérhető vagy nem létezik.
      </p>
    </Container>
  </PageContent>
);

export default NotFoundPage;
