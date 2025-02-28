// src/utils/Spacer.js
import React from 'react';

const Spacer = ({ size = '1rem', vertical = true }) => {
  const style = vertical
    ? { marginTop: size, marginBottom: size }
    : { marginLeft: size, marginRight: size };

  return <div style={style} />;
};

export default Spacer;
