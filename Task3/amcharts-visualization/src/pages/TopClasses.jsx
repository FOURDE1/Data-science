import React, { useEffect, useState } from 'react';
import ForceDirectedTree from '../components/charts/ForceDirectedTree';
import useFetchData from '../hooks/useFetchData';

const TopClasses = () => {
  const [fetchUrl, setFetchUrl] = useState('/articles/top_classes');
  const { data, loading, error } = useFetchData(fetchUrl);

  return (
    <div>
      <h1>Top 10 Classes</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error loading data.</p>}
      {data && <ForceDirectedTree data={data} />}
    </div>
  );
};

export default TopClasses;
