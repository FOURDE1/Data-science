import React, { useEffect, useState } from 'react';
import ChartPage from './ChartPage';
import ArticlesByYearBarChart from '../components/charts/ArticlesByYearBarChart';
import useFetchData from '../hooks/useFetchData';
import './Css/ArticlesByYear.css';

const ArticlesByYear = () => {
  const [year, setYear] = useState('');
  const [searchYear, setSearchYear] = useState('');
  const [mappedData, setMappedData] = useState([]);
  const [fetchUrl, setFetchUrl] = useState(null);

  const { data, loading, error } = useFetchData(fetchUrl);

  useEffect(() => {
    if (data && data.length > 0) {
      const validData = data.map(item => ({
        year: item._id,
        count: item.count
      }));
      setMappedData(validData);
    }
  }, [data]);

  const handleInputChange = (e) => {
    setYear(e.target.value);
  };

  const handleSearch = () => {
    if (year.trim()) {
      setSearchYear(year);
      setFetchUrl(`/articles/articles_by_year/${encodeURIComponent(year)}`);
    }
  };

  return (
    <div>
      <ChartPage
        title={`Articles by Publication Year: ${searchYear}`}
        loading={loading}
        error={error}
        ChartComponent={ArticlesByYearBarChart}
        data={mappedData}
        showSideNav={false}
      />
      <div className="search-container">
        <input
          type="text"
          value={year}
          onChange={handleInputChange}
          placeholder="Enter year"
          className="search-input"
          style={{ padding: '10px', margin: '10px 0', width: '200px' }}
        />
        <button onClick={handleSearch} className="search-button" style={{ padding: '10px' }}>
          Search
        </button>
      </div>
    </div>
  );
};

export default ArticlesByYear;
