// src/pages/ChartPage.jsx
import React from 'react';
import Layout from '../components/layouts/Layout';
import Header from '../components/common/Header';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';

const ChartPage = ({ title, loading, error, ChartComponent, data }) => {
  return (
    <Layout>
      <Header title={title} />
      {loading && <Loading />}
      {error && <Error message={error.message} />}
      {data.length > 0 && <ChartComponent data={data} />}
    </Layout>
  );
};

export default ChartPage;
