import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChartPage from './ChartPage';
import BarChartByDate from '../components/charts/BarChartByData';
import useFetchData from '../hooks/useFetchData';
import './Css/ArticlesByKeyword.css';

const ArticlesByAuthor = () => {
  const { author: initialAuthor } = useParams();
  const [author, setAuthor] = useState(initialAuthor || '');
  const [searchAuthor, setSearchAuthor] = useState('');
  const [aggregatedData, setAggregatedData] = useState([]);
  const [fetchUrl, setFetchUrl] = useState(null);

  const { data, loading, error } = useFetchData(fetchUrl);

  useEffect(() => {
    if (data && Array.isArray(data.articles)) {
      // Aggregate data by publication time
      const dateCounts = data.articles.reduce((acc, article) => {
        const date = new Date(article.published_time).toISOString().split('T')[0]; // Format date as YYYY-MM-DD
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      // Prepare data for the chart
      const chartData = Object.keys(dateCounts).map(date => ({
        category: date,
        value: dateCounts[date]
      }));

      setAggregatedData(chartData);
    }
  }, [data]);

  const handleInputChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleSearch = () => {
    if (author.trim()) {
      setSearchAuthor(author);
      setFetchUrl(`/articles/articles_by_author/${encodeURIComponent(author)}`);
    }
  };

  return (
    <div>
      <ChartPage
        title={`Articles by Author: ${searchAuthor}`}
        loading={loading}
        error={error}
        ChartComponent={BarChartByDate}
        data={aggregatedData}
        showSideNav={false}
      />
      <div className="search-container">
        <input
          type="text"
          value={author}
          onChange={handleInputChange}
          placeholder="Enter author name"
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

export default ArticlesByAuthor;
