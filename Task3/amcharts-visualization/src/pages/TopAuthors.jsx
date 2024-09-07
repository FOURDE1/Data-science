// src/pages/TopAuthors.jsx
import React, { useEffect, useState } from 'react';
import ChartPage from './ChartPage';
import BarChart from '../components/charts/BarChart';
import useFetchData from '../hooks/useFetchData';

const TopAuthors = () => {
  const { data, loading, error } = useFetchData('/articles/top_authors');
  const [mappedData, setMappedData] = useState([]);

  useEffect(() => {
    if (data) {
      // Map data to the expected structure for BarChart
      const validData = data
        .filter(item => item._id && item.count)
        .map(item => ({ category: item._id, value: item.count }));
      setMappedData(validData);
    }
  }, [data]);

  return (
    <ChartPage
      title="Top Authors"
      loading={loading}
      error={error}
      ChartComponent={BarChart}
      data={mappedData}
    />
  );
};

export default TopAuthors;
