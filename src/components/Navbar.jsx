import Link from 'gatsby-link';
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

    this.handleNavTogglerClick = this.handleNavTogglerClick.bind(this);
    this.handleNavLinkClick = this.handleNavLinkClick.bind(this);
  }

  handleNavTogglerClick() {
    this.setState(prevState => ({
      isNavCollapsed: !prevState.isNavCollapsed,
    }));
  }

  handleNavLinkClick() {
    this.setState({
      isNavCollapsed: true,
    });
  }

  render() {
    const {
      brandImageSrc,
      children,
      allocateSpace,
      className,
      style,
      ...props
    } = this.props;
    const { isNavCollapsed } = this.state;
    const { background: styleBackground, ...styleWithoutBackground } = style;

    return (
      <div style={allocateSpace ? { marginBottom: '4rem' } : {}}>
        <div
          className={`${styles.root} ${className}`}
          style={{
            ...styleWithoutBackground,
            ...(isNavCollapsed && { background: styleBackground }),
          }}
          {...props}
        >
          <Container className={styles.mainContainer}>
            <div className={styles.brandAndTogglerContainer}>
              <div>
                <Link to="/" onClick={this.handleNavLinkClick}>
                  <img src={brandImageSrc} alt="Kezdőlap" />
                </Link>
              </div>

              <button
                type="button"
                aria-controls="navbar-nav"
                aria-expanded="false"
                aria-label="Navigáció mutatása/elrejtése"
                className={styles.navToggler}
                onClick={this.handleNavTogglerClick}
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
                  <li className={styles.navItem}>
                    {React.cloneElement(navLink, {
                      onClick: this.handleNavLinkClick,
                    })}
                  </li>
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
  brandImageSrc: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  allocateSpace: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.shape({}),
};

Navbar.defaultProps = {
  allocateSpace: true,
  className: '',
};
