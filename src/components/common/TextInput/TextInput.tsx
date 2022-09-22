import React from 'react';
import './TextInput.scss';
import { FiUser, FiLock } from 'react-icons/fi/'
        

interface TextInputProps {
  icon?: string
  placeholder?: string
}

const TextInput = ({ icon, placeholder }: TextInputProps) => {

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
      <input placeholder={getByPlaceholderText()} spellCheck="false"/>
    </div>
  );
};

export default TextInput;
