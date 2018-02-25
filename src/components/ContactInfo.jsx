import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React from 'react';

const ContactInfo = ({
  name, role, email, telephone, image,
}) => (
  <div>
    <Img resolutions={image} />
    <h2>{name}</h2>
    <h3>{role}</h3>
    <p>{email}</p>
    <p>{telephone}</p>
  </div>
);

ContactInfo.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  telephone: PropTypes.string.isRequired,
  image: PropTypes.shape({}).isRequired,
};

export default ContactInfo;
