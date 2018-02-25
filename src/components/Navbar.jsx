import PropTypes from 'prop-types';
import React from 'react';
import Container from './Container';
import styles from './Navbar.module.scss';

const Navbar = ({
  brand, children, className, ...props
}) => (
  <div className={`${styles.root} ${className}`} {...props}>
    <Container className={styles.mainContainer}>
      <div className={styles.brandContainer}>{brand()}</div>

      <nav>
        <ul className={styles.navItemsContainer}>
          {React.Children.map(children, navLink => (
            <li className={styles.navItem}>{navLink}</li>
          ))}
        </ul>
      </nav>
    </Container>
  </div>
);

Navbar.propTypes = {
  brand: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Navbar.defaultProps = {
  className: '',
};

export default Navbar;
