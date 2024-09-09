
import React, { useEffect, useState } from 'react';
import ChartPage from './ChartPage';
import ArticlesTable from '../components/tables/ArticlesTable';
import useFetchData from '../hooks/useFetchData';

const RecentArticles = () => {
  const { data, loading, error } = useFetchData('/articles/recent_articles');
  const [mappedData, setMappedData] = useState([]);

  useEffect(() => {
    if (data) {

      const validData = data.map(item => ({
        id: item._id,
        title: item.title,
        author: item.author,
        publishedTime: item.published_time,
        url: item.url,
      }));
      setMappedData(validData);
    }
  }, [data]);

  return (
    <ChartPage
      title="Recent Articles"
      loading={loading}
      error={error}
      ChartComponent={ArticlesTable}
      data={mappedData}
    />
  );
};

export default RecentArticles;
