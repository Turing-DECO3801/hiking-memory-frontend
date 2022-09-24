import React from 'react';
import './Logo.scss';
const LogoImage = require('../../../images/logo.png');

const Logo = () => {

  return (
    <div className="logo">
        <img src={LogoImage} />
    </div>
  );
};

export default Logo;
