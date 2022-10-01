import React, { useState } from 'react';
import './PopUp.scss';
import { FiEdit } from 'react-icons/fi';

interface EditHikeProps {
  close: () => void,
}

const EditHike = ({ close }: EditHikeProps) => {

  const [hikeName, setHikeName] = useState("");

  const onNameChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setHikeName(event.currentTarget.value);
  }

  return (
    <div className="popup-content">
      <h3>Edit Hike Name<FiEdit className="title-icon"/></h3>
      Path Location:
      <input placeholder="Hike location name..." onChange={onNameChange}/>
      <div className="buttons">
        <div className="cancel-button" onClick={close}>Cancel</div>
        <div className="action-button">Update</div>
      </div>
    </div>
  );
};

export default EditHike;
