
import React from 'react';
import BarChart from '../components/BarChart';
import useFetchData from '../hooks/useFetchData';

const ChartPage = () => {
  const { data, loading, error } = useFetchData('/articles/top_keywords');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Chart Visualization</h1>
      <BarChart data={data} />
    </div>
  );
};

export default ChartPage;
