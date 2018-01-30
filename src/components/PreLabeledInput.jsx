import PropTypes from 'prop-types';
import React from 'react';

const PreLabeledInput = ({ id, label, ...props }) => (
  <label htmlFor={id}>
    {label}
    <input id={id} {...props} />
  </label>
);

PreLabeledInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
};

PreLabeledInput.defaultProps = {
  id: null,
};

export default PreLabeledInput;
