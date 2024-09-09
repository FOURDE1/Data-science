
import React, { useEffect, useState } from 'react';
import ChartPage from './ChartPage';
import LineChart from '../components/charts/LineChart';
import useFetchData from '../hooks/useFetchData';

const ArticlesByDate = () => {
  const { data, loading, error } = useFetchData('/articles/articles_by_date');
  const [mappedData, setMappedData] = useState([]);

  useEffect(() => {
    if (data) {

      const validData = data
        .filter(item => item._id && item.count)
        .map(item => ({ date: new Date(item._id), value: item.count }));
      setMappedData(validData);
    }
  }, [data]);

  return (
    <ChartPage
      title="Articles by Date"
      loading={loading}
      error={error}
      ChartComponent={LineChart}
      data={mappedData}
    />
  );
};

export default ArticlesByDate;
