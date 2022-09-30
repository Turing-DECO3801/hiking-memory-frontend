import React from 'react';
import './Logo.scss';
import LogoImage from '../../../images/logo.png';

const Logo = () => {

  return (
    <div className="logo">
        <img src={LogoImage} />
    </div>
  );
};

export default Logo;
