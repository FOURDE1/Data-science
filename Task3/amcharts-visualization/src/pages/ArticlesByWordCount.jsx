// src/pages/ArticlesByWordCount.jsx
import React, { useEffect, useState } from 'react';
import ChartPage from './ChartPage';
import HistogramChart from '../components/charts/HistogramChart';
import useFetchData from '../hooks/useFetchData';

const ArticlesByWordCount = () => {
  const { data, loading, error } = useFetchData('/articles/articles_by_word_count');
  const [mappedData, setMappedData] = useState([]);

  useEffect(() => {
    if (data) {
      // Map data to the expected structure for HistogramChart
      const validData = data
        .filter(item => item._id !== undefined && item.count !== undefined)
        .map(item => ({ wordCount: item._id, count: item.count }));
      setMappedData(validData);
    }
  }, [data]);

  return (
    <ChartPage
      title="Articles by Word Count"
      loading={loading}
      error={error}
      ChartComponent={HistogramChart}
      data={mappedData}
    />
  );
};

export default ArticlesByWordCount;
