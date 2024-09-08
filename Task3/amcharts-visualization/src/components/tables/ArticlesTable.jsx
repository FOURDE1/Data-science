// src/components/tables/ArticlesTable.jsx
import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import styles from './ArticlesTable.module.css'; // Import CSS modules

const ArticlesTable = ({ data }) => {
  return (
    <div className={`table-responsive mt-4 mb-4 ${styles.tableContainer}`}>
      <Table striped bordered hover responsive="sm" className="shadow-sm rounded">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published Time</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {data.map((article) => (
            <tr key={article.id}>
              <td className="font-weight-bold">{article.title}</td>
              <td>{article.author}</td>
              <td>{new Date(article.publishedTime).toLocaleString()}</td>
              <td>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.textDecorationNone}>
                  Open Link
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

ArticlesTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      publishedTime: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ArticlesTable;
