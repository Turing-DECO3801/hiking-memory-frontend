import React, { useState, useContext } from 'react';
import './PopUp.scss';
import { FiEdit } from 'react-icons/fi';
import { AuthContext } from '../../../contexts/AuthContext';
import { HikeContext } from '../../../contexts/HikeContext';
import { updateHikeName } from '../../../api';

interface EditHikeProps {
  close: () => void,
}

const EditHike = ({ close }: EditHikeProps) => {
  
  const { hike, updateHikePath } = useContext(HikeContext);
  const { email, password } = useContext(AuthContext);
  const [hikeName, setHikeName] = useState("");

  const onNameChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setHikeName(event.currentTarget.value);
  }
  
  const updateName = () => {
    updateHikePath(hikeName);
    updateHikeName(hikeName, hike?.id as number, email as string, password as string);
    setHikeName("");
    close();
  }

  return (
    <div className="popup-content">
      <h3>Edit Hike Name<FiEdit className="title-icon"/></h3>
      Path Location:
      <input
        value={hikeName}
        placeholder="Hike location name..."
        onChange={onNameChange}
        spellCheck="false"
      />
      <div className="buttons">
        <div className="cancel-button" onClick={close}>Cancel</div>
        <div className="action-button" onClick={updateName}>Update</div>
      </div>
    </div>
  );
};

export default EditHike;
