import PropTypes from 'prop-types';
import React from 'react';
import styles from './Highlight.module.scss';

const Highlight = ({
  title, symbol, symbolLabel, text, ...props
}) => (
  <section {...props}>
    <h2 className={styles.title}>
      <span role="img" aria-label={symbolLabel}>
        {symbol}
      </span>{' '}
      {title}
    </h2>

    <p className={styles.text}>{text}</p>
  </section>
);

Highlight.propTypes = {
  title: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  symbolLabel: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Highlight;
