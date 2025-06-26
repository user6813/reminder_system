import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, style, className = '', ...props }) => {
  return (
    <>
      <button
        {...props}
        className={`custom-btn ${className}`}
        style={style}
      >
        {children}
      </button>
      <style>{`
        .custom-btn {
          padding: 8px 20px;
          border-radius: 4px;
          border: none;
          background: #007bff;
          color: #fff;
          font-weight: 500;
          cursor: pointer;
          font-size: 15px;
          transition: background 0.2s;
        }
        .custom-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
};

export default Button;
