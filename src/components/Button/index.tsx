import React from 'react';
import './Button.scss';

interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
    isSelected?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className, isSelected }) => {
    const buttonClass = `button ${isSelected ? 'button--selected' : ''} ${className || ''}`;

    return (
        <button className={buttonClass} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
