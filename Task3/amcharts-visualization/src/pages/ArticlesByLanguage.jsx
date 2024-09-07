// src/pages/ArticlesByLanguage.jsx
import React, { useEffect, useState } from 'react';
import ChartPage from './ChartPage';
import PieChart from '../components/charts/PieChart';
import useFetchData from '../hooks/useFetchData';

const ArticlesByLanguage = () => {
  const { data, loading, error } = useFetchData('/articles/articles_by_language');
  const [mappedData, setMappedData] = useState([]);

  useEffect(() => {
    if (data) {
      // Map data to the expected structure for PieChart
      const validData = data
        .filter(item => item._id && item.count)
        .map(item => ({ language: item._id, count: item.count }));
      setMappedData(validData);
    }
  }, [data]);

  return (
    <ChartPage
      title="Articles by Language"
      loading={loading}
      error={error}
      ChartComponent={PieChart}
      data={mappedData}
    />
  );
};

export default ArticlesByLanguage;
