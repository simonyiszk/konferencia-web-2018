import PropTypes from 'prop-types';
import React from 'react';
import FaChevronDown from 'react-icons/lib/fa/chevron-down';
import FaChevronUp from 'react-icons/lib/fa/chevron-up';
import Container from './Container';
import styles from './Navbar.module.scss';

export default class Navbar extends React.Component {
  constructor() {
    super();

    this.state = {
      isNavCollapsed: true,
    };
  }

  render() {
    const {
      brand, children, allocateSpace, className, ...props
    } = this.props;
    const { isNavCollapsed } = this.state;

    return (
      <div style={allocateSpace ? { marginBottom: '4rem' } : {}}>
        <div className={`${styles.root} ${className}`} {...props}>
          <Container className={styles.mainContainer}>
            <div className={styles.brandAndTogglerContainer}>
              <div>{brand()}</div>

              <button
                type="button"
                aria-controls="navbar-nav"
                aria-expanded="false"
                aria-label="Navigáció mutatása/elrejtése"
                className={styles.navToggler}
                onClick={() =>
                  this.setState(prevState => ({
                    isNavCollapsed: !prevState.isNavCollapsed,
                  }))
                }
              >
                {isNavCollapsed ? <FaChevronDown /> : <FaChevronUp />}
              </button>
            </div>

            <nav
              id="navbar-nav"
              className={isNavCollapsed && styles.navCollapsed}
            >
              <ul className={styles.navItemsContainer}>
                {React.Children.map(children, navLink => (
                  <li className={styles.navItem}>{navLink}</li>
                ))}
              </ul>
            </nav>
          </Container>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  brand: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  allocateSpace: PropTypes.bool,
  className: PropTypes.string,
};

Navbar.defaultProps = {
  allocateSpace: true,
  className: '',
};
