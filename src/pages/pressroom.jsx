import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import Container from '../components/Container';
import PageContent from '../components/PageContent';
import Sponsors from '../sections/Sponsors';

export const frontmatter = {
  title: 'Sajtószoba',
};

const PressroomPage = ({ data }) => (
  <PageContent>
    <Container>
      <Helmet title={frontmatter.title} />

      <h1>{frontmatter.title}</h1>

      <article>
        <h2>
          Ipar 4.0-tól a blockchain-en át a sztratoszférába: Simonyi Konferencia
          már 15. éve
        </h2>

        <blockquote>
          A legújabb villamosmérnöki és informatikai fejlesztésekkel ismerkedhet
          meg az, aki ellátogat a XV. Simonyi Konferenciára április 18-án. A
          mindenki számára könnyen érthető és élvezhető előadásoknak a BME I
          épülete ad otthont. A rendezvény ingyenes.
        </blockquote>

        <p>
          Az évente megrendezésre kerülő Simonyi Konferencia rendszeresen
          ízelítőt ad a világ technológiai fejlesztéseiből. „A rendezvény
          kiemelt célja, hogy a látogatók a száraz előadások helyett érdekes
          élményekkel gazdagodjanak és kedvet kapjanak elmélyülni adott
          szakterületekben.” – mondta Tóth Bence főrendező.
        </p>

        <p>
          Idén a 17 előadást párhuzamosan 2 teremben tartják a szervezők. Az
          érdeklődők olyan előadókat hallhatnak, mint Somlai-Fischer Ádámot, a
          Prezi társalapítóját, aki a kiterjesztett valóság Prezin belüli
          alkalmazási lehetőségeit tárja fel, vagy Dobson Leventét, aki a
          Facebook adatközpontbeli kihívásait részletezi.
        </p>

        <p>
          Ezeken kívül szó lesz még ipar 4.0-ról, IoT-ról, humanoid robotokról,
          botnet hálózatokról, mesterséges intelligenciáról is. Természetesen
          nem maradhatnak ki az önvezető autók és a blockchain technológia sem,
          de bemutatásra kerül a Simple alkalmazás története is.
        </p>

        <p>
          A Simonyi Konferencia Magyarország legnagyobb, kizárólag egyetemi
          hallgatók által rendezett éves szakmai eseménye, melynek szervezője a
          Budapesti Műszaki és Gazdaságtudományi Egyetem Villamosmérnöki és
          Informatikai Karán működő Simonyi Károly Szakkollégium.
        </p>

        <p>
          A konferencián a szakkollégium különböző projektjeit is megismerhetik
          a látogatók, mint például egy magaslégköri ballonplatform
          kifejlesztését, illetve a Schönherz Mátrixot, aminek keretében a
          hallgatók minden évben egy óriási kijelzővé változtatják kollégiumuk
          oldalát.
        </p>

        <p>
          A konferencia része egy expo, ahol a támogató cégek és a Simonyi
          Károly Szakkollégium szakmai körei mutatják be munkájukat. Az
          érdeklődők betekintést nyerhetnek stúdiótechnikába, dizájnba és
          arculattervezésbe, informatikai és elektronikai fejlesztésekbe is.
        </p>

        <p>
          Az előadások részletes leírásai és a pontos program elérhető az
          esemény honlapján, ahol az ingyenes regisztrációra is lehetőség
          nyílik.
        </p>
      </article>

      <Sponsors data={data} />
    </Container>
  </PageContent>
);

PressroomPage.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default PressroomPage;

export const query = graphql`
  query PressroomPageQuery {
    ...SponsorsSection
  }
`;
