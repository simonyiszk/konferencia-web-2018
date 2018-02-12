import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './Presentation.module.scss';

const Presentation = ({
  title,
  presenterName,
  presenterRole,
  presenterImage,
  abstract,
  className,
  ...props
}) => (
  <article className={`${styles.root} ${className}`} {...props}>
    <div className={styles.presenterImageContainer}>
      <Img resolutions={presenterImage} className={styles.presenterImage} />
    </div>

    <div>
      <h2 className={styles.title}>{title}</h2>
      <p>
        {presenterName} – {presenterRole}
      </p>

      <p className={styles.abstract}>{abstract}</p>
    </div>
  </article>
);

Presentation.propTypes = {
  title: PropTypes.string.isRequired,
  presenterName: PropTypes.string.isRequired,
  presenterRole: PropTypes.string.isRequired,
  presenterImage: PropTypes.shape({}).isRequired,
  abstract: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Presentation.defaultProps = {
  className: '',
};

export default Presentation;
