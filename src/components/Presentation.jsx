import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './Presentation.module.scss';

const Presentation = ({
  title,
  presenterName,
  presenterRole,
  presenterImage,
  time,
  location,
  abstract,
  className,
  ...props
}) => (
  <article className={`${styles.root} ${className}`} {...props}>
    <div className={styles.presenterImageContainer}>
      <Img resolutions={presenterImage} className={styles.presenterImage} />
    </div>

    <div className={styles.timeAndLocationContainer}>
      <h2 className={styles.time}>{time}</h2>
      <p className={styles.location}>{location}</p>
    </div>

    <div>
      <h2 className={styles.title}>{title}</h2>
      {presenterName != null && (
        <p className={styles.presenterInfo}>
          {presenterName} – {presenterRole}
        </p>
      )}

      <p
        className={styles.abstract}
        /* eslint-disable-next-line react/no-danger */
        dangerouslySetInnerHTML={{ __html: abstract }}
      />
    </div>
  </article>
);

Presentation.propTypes = {
  title: PropTypes.string.isRequired,
  presenterName: PropTypes.string,
  presenterRole: PropTypes.string,
  presenterImage: PropTypes.shape({}).isRequired,
  time: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  abstract: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Presentation.defaultProps = {
  presenterName: null,
  presenterRole: null,
  className: '',
};

export default Presentation;
