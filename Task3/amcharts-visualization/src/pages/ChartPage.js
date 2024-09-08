// src/pages/ChartPage.jsx
import React from 'react';
import Header from '../components/common/Header';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';

const ChartPage = ({ title, loading, error, ChartComponent, data }) => {
  return (
    <div style={styles.pageContainer}>
      <Header title={title} />
      {loading && <Loading />}
      {error && <Error message={error.message} />}
      {data.length > 0 && <ChartComponent data={data} />}
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    width: '100%',
    boxSizing: 'border-box',
    overflowX: 'hidden',
    overflowY: 'auto',
  }
};

export default ChartPage;
