import React, { useEffect, useState } from 'react';
import ArticleDetailsTable from '../components/tables/ArticleDetailsTable';
import useFetchData from '../hooks/useFetchData';
import './Css/ArticleDetails.css';

const ArticleDetails = () => {
  const [postid, setPostid] = useState('');
  const [fetchUrl, setFetchUrl] = useState(null);
  const { data, loading, error } = useFetchData(fetchUrl);

  const handleInputChange = (e) => {
    setPostid(e.target.value);
  };

  const handleSearch = () => {
    if (postid.trim()) {
      setFetchUrl(`/articles/article_details/${encodeURIComponent(postid)}`);
    }
  };

  useEffect(() => {
    console.log('Fetched data:', data); // Verify if data is being fetched correctly
  }, [data]);

  return (
    <div>
      <div className="search-container">
        <h1>Article Details</h1>
        <div className="input-container">
          <input
            type="text"
            value={postid}
            onChange={handleInputChange}
            placeholder="Enter post ID"
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && Object.keys(data).length > 0 && <ArticleDetailsTable data={data} />} {/* Ensure data is not empty */}
    </div>
  );
};

export default ArticleDetails;
