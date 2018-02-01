import { css } from 'emotion';
import PropTypes from 'prop-types';
import React from 'react';
import Container from '../components/Container';
import SimonyiKonferenciaIconSrc from '../data/icons/simonyi-konferencia.svg';
import { mediaQueries } from '../utils/media-queries';

const IndexPage = ({ data }) => (
  <div>
    <div
      className={css`
        display: flex;
        align-items: center;
        min-height: 100vh;
        padding: 4rem 0;
        background: linear-gradient(227.5deg, #00e676, #009688);
        color: white;
      `}
    >
      <Container
        className={css`
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          text-align: center;

          ${mediaQueries.large(css`
            flex-wrap: nowrap;
            flex-direction: row-reverse;
            text-align: left;
          `)};
        `}
      >
        <div
          className={css`
            flex: 0 0 100%;

            ${mediaQueries.large(css`
              flex-basis: 30%;
            `)};
          `}
        >
          <img
            src={SimonyiKonferenciaIconSrc}
            alt=""
            className={css`
              width: 50%;

              ${mediaQueries.small(css`
                width: 30%;
              `)};

              ${mediaQueries.large(css`
                width: 100%;
              `)};
            `}
          />
        </div>

        <div
          className={css`
            h1 {
              font-size: 1.5em;
            }

            h2 {
              display: inline;
              font-size: 1em;

              ${mediaQueries.large(css`
                display: block;
              `)};
            }

            h3 {
              font-size: 0.67em;
            }

            ${mediaQueries.large(css`
              font-size: 1.5rem;

              h1 {
                font-size: 2em;
              }
            `)};

            ${mediaQueries.xLarge(css`
              font-size: 1.75rem;
            `)};
          `}
        >
          <h1
            className={css`
              ${mediaQueries.large(css`
                word-spacing: 100vw;
              `)};
            `}
          >
            {data.site.siteMetadata.title}
          </h1>

          <h2>{data.site.siteMetadata.eventDate}</h2>

          <h2
            className={css`
              ::before {
                content: ' – ';

                ${mediaQueries.large(css`
                  content: '';
                `)};
              }
            `}
          >
            {data.site.siteMetadata.eventVenue}
          </h2>

          <h3
            className={css`
              display: none;

              ${mediaQueries.large(css`
                display: block;
              `)};
            `}
          >
            {data.site.siteMetadata.siteAddressPretty}
          </h3>
        </div>
      </Container>
    </div>
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
        eventDate(formatString: "LL", locale: "hu")
        eventVenue
        siteAddressPretty
      }
    }
  }
`;
