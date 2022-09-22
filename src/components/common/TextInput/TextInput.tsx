import React from 'react';
import './TextInput.scss';
import { FiUser, FiLock } from 'react-icons/fi/'
        

interface TextInputProps {
  icon?: string
  placeholder?: string
  type?: string
}

const TextInput = ({ icon, placeholder, type }: TextInputProps) => {

  const getIcon = () => {
    if (icon === "user") {
      return <FiUser className="icon"/>
    } else if  (icon === "lock") {
      return <FiLock className="icon"/>
    }
  }

  const getByPlaceholderText = () => {
    if (placeholder) {
      return placeholder;
    }
    return ""
  }

  
  
  return (
    <div className="input-border">
      {getIcon()}
      <input placeholder={getByPlaceholderText()} spellCheck="false" type={type ? type : ""}/>
    </div>
  );
};

export default TextInput;
