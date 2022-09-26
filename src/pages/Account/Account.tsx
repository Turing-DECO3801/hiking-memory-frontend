import React from 'react';
import "./Account.scss";
import Navbar from '../../components/layout/Navbar/Navbar';

const Account = () => {


  return (
    <div className="account">
      <div className="profile-image"></div>
      <h2>Ella Smith</h2>
      <div className="account-options">
        <div className="account-option">
          Privacy &amp; Accessibility
        </div>
        <div className="divider" />
        <div className="account-option">
          Terms &amp; Conditions 
        </div>
        <div className="divider" />
        <div className="account-option">
          Help &amp; Documentation 
        </div>
        <div className="divider" />
        <a href="/login" className="logout">
          Log Out
        </a>
      </div>
      <Navbar />
    </div>
  );

};

export default Account;

