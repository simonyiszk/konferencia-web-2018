import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React from 'react';
import Container from '../components/Container';

const VideosSection = () => (
  <div id="videos">
    <h1>Videók</h1>

    <article
      css={{
        display: 'flex',
        alignItems: 'center',
        margin: '-2rem',

        '& > *': {
          margin: '2rem',
        },
      }}
    >
      <div>
        <h2>Satellite navigation on new waves</h2>
        <p>
          The European satellite navigation infrastructures EGNOS and Galileo are up and running.
          Satellite navigation will facilitate autonomous driving, support to the
          Internet-of-Things, advanced logistics, asset management and traffic management in sectors
          like railways and aviation.
        </p>
      </div>

      <div css={{ flex: '0 0 40%' }}>
        <video
          src="http://coding.sch.bme.hu:8080/bss_vagott_web_16a9_HD/high_quality/simonyikonf2017_IB028_blokk1_verhoef_hq_HD.mp4"
          controls
          css={{
            width: '100%',
          }}
        />
      </div>
    </article>
  </div>
);

const GallerySection = ({ data }) => (
  <div id="#gallery">
    <h1>Galéria</h1>

    <div
      css={{
        display: 'flex',
        flexWrap: 'wrap',
        margin: '-1rem',
      }}
    >
      {data.galleryThumbnails.edges.map(({ node: thumbnail }) => (
        <div
          key={thumbnail.name}
          css={{
            flex: '50%',
            padding: '1rem',
            '& *': { height: '100%' },
          }}
        >
          <Img sizes={thumbnail.childImageSharp.sizes} />
        </div>
      ))}
    </div>
  </div>
);

GallerySection.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

const IndexPage = ({ data }) => (
  <div>
    <div
      css={{
        background: 'linear-gradient(227.5deg, #00e676, #009688)',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container
        css={{
          color: 'white',

          '& h1': { fontSize: '3rem' },
          '& h2': { fontSize: '2rem' },
          '& h3': { fontSize: '1rem' },

          '@media (min-width: 576px)': {
            '& h1': { fontSize: '10vmin' },
            '& h2': { fontSize: '5vmin' },
            '& h3': { fontSize: '3vmin' },
          },
        }}
      >
        <h1 css={{ wordSpacing: '100vw' }}>{data.site.siteMetadata.title}</h1>
        <h2>2018. április 18.</h2>
        <h2>BME I épület</h2>
        <h3>Budapest, Magyar tudósok körútja 2, 1117</h3>
      </Container>
    </div>

    <Container
      css={{
        '& h1': {
          textAlign: 'center',
        },
      }}
    >
      <VideosSection />
      <GallerySection data={data} />
    </Container>
  </div>
);

IndexPage.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default IndexPage;

export const query = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        title
      }
    }
    galleryThumbnails: allFile(
      filter: { id: { regex: "/gallery-thumbnails/" } }
      sort: { fields: [name], order: DESC }
    ) {
      edges {
        node {
          name
          childImageSharp {
            sizes(maxWidth: 500) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`;
