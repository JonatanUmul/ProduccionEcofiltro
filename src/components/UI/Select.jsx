import React from 'react';

const Selects = ({ field, form, ...props }) => {
  return (
    <select {...field} {...props} />
  );
};

export default Selects;
