import React from 'react';
import { css } from 'react-emotion';
import Container from '../components/Container';
import PreLabeledInput from '../components/PreLabeledInput';

const ContactPage = () => (
  <Container
    className={css`
      label > :first-child {
        display: block;
      }
    `}
  >
    <h1>Kapcsolat</h1>

    {/* TODO: Add actual sending functionality */}
    <form
      className={css`
        margin: -0.5rem auto;
        max-width: 30em;

        * {
          width: 100%;
        }

        > * {
          padding: 0.5rem;
        }
      `}
    >
      <div>
        <PreLabeledInput id="contact__name" name="name" label="Név" />
      </div>

      <div>
        <PreLabeledInput id="contact__email" name="email" label="E-mail cím" type="email" />
      </div>

      <div>
        <label htmlFor="contact__textarea">
          Üzenet
          <textarea id="contact__textarea" name="message" />
        </label>
      </div>

      <div
        className={css`
          padding-top: 0;
        `}
      >
        <button
          className={css`
            font-weight: bold;
            padding: 0.5em 1em;
            border: 0.25em solid #263238;
            color: inherit;
            background: white
            margin-top: 1.5em;

            :hover {
              color: white;
              background: #263238;
            }
          `}
        >
          Küldés
        </button>
      </div>
    </form>
  </Container>
);

export default ContactPage;
