import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!endpoint) return;

      setLoading(true);
      try {
        const apiUrl = process.env.REACT_APP_API_BASE_URL;
        const response = await axios.get(`${apiUrl}${endpoint}`);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

export default useFetchData;
