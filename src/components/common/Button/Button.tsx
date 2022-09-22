import React from 'react';
import './Button.scss';

interface ButtonProps {
    onClick: () => (void)
    children: React.ReactNode
}

const Button = ({ onClick, children }: ButtonProps) => {

  return (
    <button onClick={onClick}>
        { children }
    </button>
  );
};

export default Button;
