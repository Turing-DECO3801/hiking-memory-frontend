import React, { useState } from 'react';
import './PopUp.scss';
import { FiTrash2 } from 'react-icons/fi';

interface DeleteHikeProps {
  hikeName: string
  date: string
}

const DeleteHike = ({ hikeName, date }: DeleteHikeProps) => {

  return (
    <div className="popup-content">
      <h3>Delete Hike<FiTrash2 className="title-icon"/></h3>
      Are you sure you would like to delete:
      <div className="colored-text">
        { hikeName } { date }
      </div> 
      <div className="buttons">
        <div className="cancel-button">Cancel</div>
        <div className="action-button">Update</div>
      </div>
    </div>
  );
};

export default DeleteHike;
