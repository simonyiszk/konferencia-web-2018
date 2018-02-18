import React from 'react';
import Helmet from 'react-helmet';
import PageContentContainer from '../components/PageContentContainer';

const NotFoundPage = () => (
  <PageContentContainer>
    <Helmet title="Hiba" />

    <h1>Az oldal nem található</h1>
    <p className="text-center">
      A kért oldal jelenleg nem elérhető vagy nem létezik.
    </p>
  </PageContentContainer>
);

export default NotFoundPage;
