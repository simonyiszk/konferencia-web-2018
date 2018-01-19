import PropTypes from 'prop-types';
import React from 'react';
import { css } from 'react-emotion';
import SimonyiKonferenciaIcon from '../../static/assets/icons/simonyi-konferencia.svg';
import Container from '../components/Container';
import { mediaQueries } from '../utils/media-queries';

const IndexPage = ({ data }) => (
  <div>
    <div
      id="home"
      className={css`
        background: linear-gradient(227.5deg, #00e676, #009688);
        color: white;
      `}
    >
      <Container
        className={css`
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <div
          className={css`
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            margin: 3em 0;
            text-align: center;

            & h1 {
              font-size: 1.5em;
            }

            & h2 {
              font-size: 1em;
            }

            & h3 {
              font-size: 0.67em;
            }

            ${mediaQueries.large`
              flex-wrap: nowrap;
              text-align: left;
              font-size: 1.5rem;

              & h1 {
                font-size: 2em;
              }

              & * > :first-child {
                margin-top: 0;
              }
            `};

            ${mediaQueries.xLarge`
              font-size: 1.75rem;
            `};
          `}
        >
          <div
            className={css`
              flex: 0 0 100%;

              ${mediaQueries.large`
                order: 1;
                flex: 0 0 30%;
              `};
            `}
          >
            <img
              src={SimonyiKonferenciaIcon}
              alt=""
              className={css`
                width: 60%;
                filter: brightness(0) invert(1);

                ${mediaQueries.small`
                  width: 30%;
                `};

                ${mediaQueries.large`
                  width: 100%;
                `};
              `}
            />
          </div>

          <div
            className={css`
              & h2 {
                display: inline;
                white-space: pre;

                ${mediaQueries.large`
                  display: block;
                `};
              }
            `}
          >
            <h1
              className={css`
                ${mediaQueries.large`
                  word-spacing: 100vw;
                `};
              `}
            >
              {data.site.siteMetadata.title}
            </h1>

            <div>
              <h2>2018. április 18.</h2>

              <h2
                className={css`
                  margin-bottom: 0;

                  &::before {
                    content: ' – ';

                    ${mediaQueries.large`
                    content: '';
                  `};
                  }
                `}
              >
                BME I épület
              </h2>
            </div>

            <h3
              className={css`
                display: none;
                margin-top: 0.5em;
                margin-bottom: 0;

                ${mediaQueries.large`
                  display: block;
                `};
              `}
            >
              {data.site.siteMetadata.siteAddressPretty}
            </h3>

            <a
              href="https://www.eventbrite.com/e/xv-simonyi-konferencia-tickets-41605153133?aff=web"
              target="_blank"
              rel="noopener noreferrer"
              role="button"
              className={css`
                display: inline-block;
                font-weight: bold;
                padding: 0.5em 1em;
                border: 0.25em solid white;
                color: inherit;
                margin-top: 1.5em;

                &:hover {
                  text-decoration: none;
                  background: white;
                  color: #009688;
                }
              `}
            >
              Regisztráció
            </a>
          </div>
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
        siteAddressPretty
      }
    }
  }
`;
