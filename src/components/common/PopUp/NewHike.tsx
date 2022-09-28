import React, { useState } from 'react';
import './PopUp.scss';

interface NewHikeProps {
  date: string
}

const NewHike = ({ date }: NewHikeProps) => {

  return (
    <div className="popup-content">
      <h3>New Hike Detected</h3>
      Where did you hike on:
      <div className="colored-text">
        { date }
      </div> 
      <input placeholder="Hike location name..."/>
      <div className="buttons">
        <div className="cancel-button">Cancel</div>
        <div className="action-button">Submit</div>
      </div>
    </div>
  );
};

export default NewHike;
