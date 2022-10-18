import React, { useContext } from 'react';
import './PopUp.scss';
import { FiTrash2 } from 'react-icons/fi';
import { HikeContext } from '../../../contexts/HikeContext';

interface DeleteHikeProps {
  close: () => void
}

const DeleteHike = ({ close }: DeleteHikeProps) => {

  const { hike } = useContext(HikeContext);

  return (
    <div className="popup-content">
      <h3>Delete Hike<FiTrash2 className="title-icon"/></h3>
      Are you sure you would like to delete:
      <div className="colored-text">
        { hike?.path_name } travelled on 
      </div> 
      <div className="colored-text">
        {`${hike?.date.toLocaleDateString('default', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`}?
      </div> 

      <div className="buttons">
        <div className="cancel-button" onClick={close}>Cancel</div>
        <div className="action-button">Confirm</div>
      </div>
    </div>
  );
};

export default DeleteHike;
