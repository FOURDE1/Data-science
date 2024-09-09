
import React, { useEffect, useState } from 'react';
import ChartPage from './ChartPage';
import StackedBarChart from '../components/charts/StackedBarChart';
import useFetchData from '../hooks/useFetchData';

const ArticlesByCategory = () => {
  const { data, loading, error } = useFetchData('/articles/articles_by_classes');
  const [mappedData, setMappedData] = useState([]);

  useEffect(() => {
    if (data) {

      const validData = data
        .filter(item => item._id && item.count)
        .map(item => ({ category: item._id, count: item.count }));
      setMappedData(validData);
    }
  }, [data]);

  return (
    <ChartPage
      title="Articles by Category"
      loading={loading}
      error={error}
      ChartComponent={StackedBarChart}
      data={mappedData}
    />
  );
};

export default ArticlesByCategory;
