import React, { useState, useContext } from 'react';
import "./Account.scss";
import Navbar from '../../components/layout/Navbar/Navbar';
import { FiUser, FiLogOut, FiClipboard, FiShield, FiEdit2, FiChevronLeft, FiMail, FiRefreshCcw } from 'react-icons/fi'
import { AuthContext } from '../../contexts/AuthContext';


const Account = () => {
  
  const { logout, email, name } = useContext(AuthContext);
  const [page, setPage] = useState("default");

  const getAccountPage = () => {
    if (page === "account") {
      return (
        <div className={`account-details ${page === "account" ? "" : "account-page-inactive"}`}>
          <div className="header">
            <div
              className="back-button"
              onClick={() => setPage("default")}
            >
                <FiChevronLeft className="back-icon"/>
                Back
            </div>
            <h2 className="section">Account Details</h2>
          </div>
          <div className="account-options">
            <div className="account-page-option">
              <div className="option-icon-container">
              <FiUser className="account-page-option-icon"/>
              </div>
              <div className="vertical-divider"/>
              <div className="option-container">
                <div className="option-label">
                  Full Name
                </div>
                <div className="option-value">
                  { name }
                </div>
              </div>
            </div>
            <div className="account-page-option">
              <div className="option-icon-container">
                <FiMail className="account-page-option-icon"/>
              </div>
              <div className="vertical-divider"/>
              <div className="option-container">
                <div className="option-label">
                  Email
                </div>
                <div className="option-value">
                  {email}
                </div>
              </div>
            </div>
          </div>
          <div className="update-account-details section delay-2">
            <FiRefreshCcw className="logout-icon"/>
            Update
          </div>
        </div>
      )
    }
  }

  const getDefaultPage = () => {
    if (page === "default") {
      return (
        <div className={`account ${page === "default" ? "" : "default-page-inactive"}`}>
          <div className="profile-image section">
            <div className="edit-image-container">
              <FiEdit2 className="edit-image-icon"/>
            </div>
          </div>
          <h2 className="section">{ name }</h2>
          <h6 className="section username">@memtrail.{name?.toLowerCase().replace(' ', '.')}</h6>
          <div className="section delay-1 user-stats">
            <div className="stats-container">
              <div className="stats-number">54</div>
              <div className="stats-label">hikes</div>
            </div>
            <div className="stats-container">
              <div className="stats-number">100</div>
              <div className="stats-label">memos</div>
            </div>
            <div className="stats-container">
              <div className="stats-number">26</div>
              <div className="stats-label">photos</div>
            </div>
          </div>
          <div className="section delay-2 account-options">
            <div className="account-option" onClick={() => setPage("account")}>
              <FiUser className="account-option-icon" onClick={() => setPage("account")}/>
              <h5>
                Account Details
              </h5>
            </div>
            <div className="account-option">
              <FiShield className="account-option-icon"/>
              <h5>
                Privacy &amp; Accessibility
              </h5>
            </div>
            <div className="account-option">
              <FiClipboard className="account-option-icon"/>
              <h5>
                Terms &amp; Conditions 
              </h5>
            </div>
            <div onClick={logout} className="logout">
              <FiLogOut className="logout-icon"/>
              Log Out
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <>    
     <Navbar />
      {
        getDefaultPage()
      }
      {
        getAccountPage()
      }
    </>
  );

};

export default Account;

