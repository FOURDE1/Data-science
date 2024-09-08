// src/components/layouts/InputLayout.jsx
import React from 'react';
import '../Css/InputLayout.css';

const InputLayout = ({ children, title, onInputChange, onSubmit, inputValue, placeholder }) => {
  return (
    <div className="input-layout">
      <div className="main-content">
        <div className="input-form">
          <h1>{title}</h1>
          <input
            type="text"
            value={inputValue}
            onChange={onInputChange}
            placeholder={placeholder}
          />
          <button onClick={onSubmit}>Submit</button>
        </div>
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default InputLayout;
