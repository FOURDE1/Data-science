import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ArticleDetailsTable.css';

const ArticleDetailsTable = ({ data }) => {
  if (!data) {
    return <div>No data available</div>;
  }

  const {
    title, author, published_time, last_updated,
    keywords, description, url, thumbnail,
    video_duration, word_count, lang, classes
  } = data;

  return (
    <div className="article-details-table">
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Field</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Title</th>
            <td>{title || 'N/A'}</td>
          </tr>
          <tr>
            <th>Author</th>
            <td>{author || 'N/A'}</td>
          </tr>
          <tr>
            <th>Published Time</th>
            <td>{published_time ? new Date(published_time).toLocaleString() : 'N/A'}</td>
          </tr>
          <tr>
            <th>Last Updated</th>
            <td>{last_updated ? new Date(last_updated).toLocaleString() : 'N/A'}</td>
          </tr>
          <tr>
            <th>Keywords</th>
            <td>{keywords || 'N/A'}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{description || 'N/A'}</td>
          </tr>
          <tr>
            <th>URL</th>
            <td>
              <a href={url} target="_blank" rel="noopener noreferrer">{url || 'N/A'}</a>
            </td>
          </tr>
          <tr>
            <th>Thumbnail</th>
            <td>
              <img
                src={thumbnail || 'https://via.placeholder.com/150'}
                alt={title || 'Thumbnail'}
                className="thumbnail-image"
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite fallback loop
                  e.target.src = 'https://via.placeholder.com/150'; // Fallback image
                }}
              />
            </td>
          </tr>
          <tr>
            <th>Video Duration</th>
            <td>{video_duration || 'N/A'} minutes</td>
          </tr>
          <tr>
            <th>Word Count</th>
            <td>{word_count || 'N/A'}</td>
          </tr>
          <tr>
            <th>Language</th>
            <td>{lang || 'N/A'}</td>
          </tr>
          <tr>
            <th>Classes</th>
            <td>
              <ul>
                {classes && classes.length > 0 ? (
                  classes.map((cls, index) => (
                    <li key={index}>{cls.mapping}: {cls.value}</li>
                  ))
                ) : 'N/A'}
              </ul>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

ArticleDetailsTable.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    published_time: PropTypes.string,
    last_updated: PropTypes.string,
    keywords: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    thumbnail: PropTypes.string,
    video_duration: PropTypes.string,
    word_count: PropTypes.number,
    lang: PropTypes.string,
    classes: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        mapping: PropTypes.string,
        value: PropTypes.string,
      })
    ),
  }),
};

export default ArticleDetailsTable;
