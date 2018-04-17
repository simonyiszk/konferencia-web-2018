import PropTypes from 'prop-types';
import React from 'react';
import FaChevronDown from 'react-icons/lib/fa/chevron-down';
import FaChevronUp from 'react-icons/lib/fa/chevron-up';
import styles from './Presentation.module.scss';

export default class Presentation extends React.Component {
  constructor() {
    super();

    this.state = {
      isAbstractCollapsed: true,
    };

    this.handleAbstractTogglerClick = this.handleAbstractTogglerClick.bind(this);
  }

  handleAbstractTogglerClick() {
    this.setState(prevState => ({
      isAbstractCollapsed: !prevState.isAbstractCollapsed,
    }));
  }

  render() {
    const {
      title,
      presenterName,
      presenterRole,
      presenterImageSrc,
      time,
      location,
      abstract,
      className,
      ...props
    } = this.props;
    const { isAbstractCollapsed } = this.state;

    return (
      <button
        type="button"
        aria-expanded="false"
        aria-label="Absztrakt mutatása/elrejtése"
        className={`${styles.root} ${className}`}
        onClick={this.handleAbstractTogglerClick}
        {...props}
      >
        <article className={styles.article}>
          <div className={styles.presenterImageContainer}>
            <img
              src={presenterImageSrc}
              alt=""
              className={styles.presenterImage}
            />
          </div>

          <div className={styles.timeAndLocationContainer}>
            <h2 className={styles.time}>{time}</h2>
            <p className={styles.location}>{location}</p>
          </div>

          <div className={styles.presentationDetailsContainer}>
            <h2 className={styles.title}>{title}</h2>
            {presenterName != null && (
              <p
                /* eslint-disable-next-line react/no-danger */
                dangerouslySetInnerHTML={{
                  __html: `${presenterName}${presenterRole != null &&
                    presenterRole !== '' &&
                    ` – ${presenterRole}`}`,
                }}
                className={styles.presenterInfo}
              />
            )}

            <p
              /* eslint-disable-next-line react/no-danger */
              dangerouslySetInnerHTML={{ __html: abstract }}
              className={styles.abstract}
              style={isAbstractCollapsed ? { display: 'none' } : {}}
            />
          </div>

          <h2>{isAbstractCollapsed ? <FaChevronDown /> : <FaChevronUp />}</h2>
        </article>
      </button>
    );
  }
}

Presentation.propTypes = {
  title: PropTypes.string.isRequired,
  presenterName: PropTypes.string,
  presenterRole: PropTypes.string,
  presenterImageSrc: PropTypes.string.isRequired,
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
