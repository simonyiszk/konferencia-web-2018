import { css } from 'emotion';
import PropTypes from 'prop-types';
import React from 'react';

const Highlight = ({
  title, symbol, symbolLabel, text, ...props
}) => (
  <section {...props}>
    <h2
      className={css`
        margin-top: 0;
      `}
    >
      <span role="img" aria-label={symbolLabel}>
        {symbol}
      </span>{' '}
      {title}
    </h2>

    <p
      className={css`
        margin-bottom: 0;
      `}
    >
      {text}
    </p>
  </section>
);

Highlight.propTypes = {
  title: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  symbolLabel: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Highlight;
