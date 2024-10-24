import React, { useState, useEffect } from 'react';
import useFetchData from '../hooks/useFetchData';
import ChartPage from './ChartPage';
import CustomForceDirectedTree from '../components/charts/CustomForceDirectedTree'; // Import the new component

const TopKeywords = () => {
  const { data, loading, error } = useFetchData('/articles/top_keywords');
  const [mappedData, setMappedData] = useState([]);

  useEffect(() => {
    if (data) {
      const keywordCounts = {};

      data.forEach(item => {
        if (item._id) {
          const keywords = item._id.split(',');
          keywords.forEach(keyword => {
            if (keywordCounts[keyword]) {
              keywordCounts[keyword] += item.count;
            } else {
              keywordCounts[keyword] = item.count;
            }
          });
        }
      });

      const validData = Object.keys(keywordCounts).map(keyword => ({
        _id: keyword,
        count: keywordCounts[keyword],
      }));

      setMappedData(validData);
    }
  }, [data]);

  return (
    <ChartPage
      title="Top Keywords"
      loading={loading}
      error={error}
      ChartComponent={CustomForceDirectedTree}
      data={mappedData}
    />
  );
};

export default TopKeywords;
