import React from 'react';
import './TextInput.scss';
import { FiUser, FiLock } from 'react-icons/fi/'

interface TextInputProps {
  icon?: string
  placeholder?: string
  type?: string,
  onChange?: (event:React.ChangeEvent<HTMLInputElement>) => void
}

const TextInput = ({ icon, placeholder, type, onChange }: TextInputProps) => {

  /**
   * Returns the icon of the text input depending on the type
   * 
   * @returns The Icon for the Text Input
   */
  const getIcon = () => {
    if (icon === "user") {
      return <FiUser className="icon"/>
    } else if  (icon === "lock") {
      return <FiLock className="icon"/>
    }
  }

  /**
   * Checks if the text input should have a placeholder
   * 
   * @returns Placeholder Text if exists
   */
  const getByPlaceholderText = () => {
    if (placeholder) {
      return placeholder;
    }
    return ""
  }

  return (
    <div className="input-border">
      {getIcon()}
      <input
        placeholder={getByPlaceholderText()} 
        spellCheck="false"
        type={type ? type : ""}
        onChange={onChange} 
      />
    </div>
  );
};

export default TextInput;
