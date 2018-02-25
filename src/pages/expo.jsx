import React from 'react';
import Helmet from 'react-helmet';
import Container from '../components/Container';
import PageContent from '../components/PageContent';

export const frontmatter = {
  title: 'Expo',
};

const ExpoPage = () => (
  <PageContent>
    <Container>
      <Helmet title={frontmatter.title} />

      <h1>{frontmatter.title}</h1>

      <p>
        Az immár 15. alkalommal megrendezésre kerülő konferencián nem csak az
        előadások szolgálhatnak kellemes időtöltéssel, ugyanis az épület
        aulájában a látogatók egy kiállításon is részt vehetnek. A helyszín több
        – az esemény támogatói illetve a szakkollégiumunk által biztosított –
        szakmai témájú standnak is otthont ad, melyeken nem mindennapi
        projekteket tekinthetünk meg és modern számítástechnikai eszközöket is
        kipróbálhatunk. Az érdeklődni vágyóknak természetesen lehetősége van
        beszélgetésbe elegyedni a standolókkal, legyenek azok
        mérnöki/informatikai cégek alkalmazottai, vagy szakkollégiumunk tagjai,
        diákjai.
      </p>
    </Container>
  </PageContent>
);

export default ExpoPage;
