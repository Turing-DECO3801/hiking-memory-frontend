import React from 'react';
import './Button.scss';

interface ButtonProps {
    onClick: () => (void)
    children: React.ReactNode
    className: string
}

const Button = ({ onClick, children, className }: ButtonProps) => {

  return (
    <div className={`button ${className}`} onClick={onClick}>
        { children }
    </div>
  );
};

export default Button;
