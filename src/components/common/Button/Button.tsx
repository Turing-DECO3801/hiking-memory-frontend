import React from 'react';
import './Button.scss';

interface ButtonProps {
    onClick: () => (void)
    children: React.ReactNode
}

const Button = ({ onClick, children }: ButtonProps) => {

  return (
    <div className="button" onClick={onClick}>
        { children }
    </div>
  );
};

export default Button;
