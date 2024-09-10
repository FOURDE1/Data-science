import React, { useEffect, useState } from 'react';
import ArticlesWithVideosBarChart from '../components/charts/ArticlesWithVideosBarChart';
import useFetchData from '../hooks/useFetchData';
import ChartPage from './ChartPage';
import './Css/ArticlesWithVideos.css';

const ArticlesWithVideos = () => {
  const [fetchUrl, setFetchUrl] = useState('/articles/articles_with_video');
  const { data, loading, error } = useFetchData(fetchUrl);

  useEffect(() => {
    console.log('Fetched data:', data); // Verify if data is being fetched correctly
  }, [data]);

  return (
    <ChartPage
      title="Articles Containing Videos"
      data={data}
      loading={loading}
      error={error}
      ChartComponent={ArticlesWithVideosBarChart}
    />
  );
};

export default ArticlesWithVideos;
