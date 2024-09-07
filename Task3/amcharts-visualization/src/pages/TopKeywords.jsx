// src/pages/TopKeywords.jsx
import React, { useEffect, useState } from 'react';
import ChartPage from './ChartPage';
import WordCloudChart from '../components/charts/WordCloudChart';
import useFetchData from '../hooks/useFetchData';

const TopKeywords = () => {
  const { data, loading, error } = useFetchData('/articles/top_keywords');
  const [mappedData, setMappedData] = useState([]);

  useEffect(() => {
    if (data) {
      // Map data to the expected structure for WordCloudChart
      const validData = data
        .filter(item => item._id && item.count)
        .map(item => ({ text: item._id, value: item.count }));
      setMappedData(validData);
    }
  }, [data]);

  return (
    <ChartPage
      title="Top Keywords"
      loading={loading}
      error={error}
      ChartComponent={WordCloudChart}
      data={mappedData}
    />
  );
};

export default TopKeywords;
