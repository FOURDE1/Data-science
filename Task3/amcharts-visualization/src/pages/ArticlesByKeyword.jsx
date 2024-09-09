import React, { useEffect, useState } from 'react';
import {useParams } from 'react-router-dom';
import ChartPage from './ChartPage';
import BubbleChart from '../components/charts/BubbleChart';
import useFetchData from '../hooks/useFetchData';
import './Css/ArticlesByKeyword.css';

const ArticlesByKeyword = () => {
  const { keyword: initialKeyword } = useParams();
  const [keyword, setKeyword] = useState(initialKeyword || '');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [mappedData, setMappedData] = useState([]);
  const [fetchUrl, setFetchUrl] = useState(null);



  const { data, loading, error } = useFetchData(fetchUrl);

  useEffect(() => {
    if (data && data.articles) {
      const mainKeyword = {
        title: searchKeyword,
        wordCount: 1000,
        url: '',
        isMain: true
      };

      const validData = [mainKeyword, ...data.articles.map(item => ({
        title: item.title,
        wordCount: item.word_count,
        url: item.url,
        isMain: false
      }))];

      setMappedData(validData);
    }
  }, [data, searchKeyword]);

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = () => {
    if (keyword.trim()) {
      setSearchKeyword(keyword);
      setFetchUrl(`/articles/articles_by_keyword/${encodeURIComponent(keyword)}`);
    }
  };

  return (
    <div>
      <ChartPage
        title={`Articles by Keyword: ${searchKeyword}`}
        loading={loading}
        error={error}
        ChartComponent={BubbleChart}
        data={mappedData}
        showSideNav={false}
      />
      <div className="search-container">
        <input
          type="text"
          value={keyword}
          onChange={handleInputChange}
          placeholder="Enter keyword"
          className="search-input"
          style={{ padding: '10px', margin: '10px 0', width: '200px' }}
        />
        <button onClick={handleSearch} className="search-button" style={{ padding: '10px' }}>
          Search
        </button>
      </div>
      {data?.total_count > 0 && (
        <div className="info-container">
          <p>Total Articles Found: {data.total_count}</p>
          {data.total_count > 200 && (
            <p className="limit-warning">
              Note: The results are limited to 200 articles, but the total number of articles is {data.total_count}.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ArticlesByKeyword;
