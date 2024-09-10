import React, { useEffect, useState } from 'react';
import ChartPage from './ChartPage';
import LongestArticlesBarChart from '../components/charts/LongestArticlesBarChart';
import useFetchData from '../hooks/useFetchData';
import './Css/LongestArticles.css';

const LongestArticles = () => {
  const [mappedData, setMappedData] = useState([]);
  const fetchUrl = '/articles/longest_articles?limit=10';

  const { data, loading, error } = useFetchData(fetchUrl);

  useEffect(() => {
    if (data && data.length > 0) {
		
      const validData = data.map(item => ({
        title: item.title,
        wordCount: item.word_count
      }));
      setMappedData(validData);
    }
  }, [data]);

  return (
    <ChartPage
      title="Top 10 Longest Articles"
      loading={loading}
      error={error}
      ChartComponent={LongestArticlesBarChart}
      data={mappedData}
      showSideNav={false}
    />
  );
};

export default LongestArticles;
