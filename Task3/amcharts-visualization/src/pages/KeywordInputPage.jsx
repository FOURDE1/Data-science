// src/pages/KeywordInputPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputLayout from '../components/layouts/InputLayout';
import './Css/KeywordInputPage.css';

const KeywordInputPage = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleFetchData = () => {
    if (keyword) {
      navigate(`/chart/articles_by_keyword/${keyword}`);
    }
  };

  return (
    <InputLayout
      title="Enter a Keyword"
      onInputChange={handleInputChange}
      onSubmit={handleFetchData}
      inputValue={keyword}
      placeholder="Enter keyword"
    >
      {/* Additional content can go here if needed */}
    </InputLayout>
  );
};

export default KeywordInputPage;
