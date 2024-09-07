// src/components/charts/WordCloudChart.jsx
import React from 'react';
import WordCloud from 'react-d3-cloud';
import PropTypes from 'prop-types';
import '../Css/WordCloudChart.css'; // Add custom CSS for additional styling

// Function to format the data to match the expected input for the WordCloud component
const formatData = (data) => {
  return data.map(item => ({
    text: item.text || item._id, // Use text or _id if text is missing
    value: item.value || item.count // Use value or count if value is missing
  }));
};

// Function to determine font size based on word frequency
const fontSizeMapper = word => Math.log2(word.value) * 10 + 10;

// Function to rotate words to avoid overlap
const rotate = () => Math.floor(Math.random() * 90) * (Math.random() > 0.5 ? 1 : -1); // Random rotation

const WordCloudChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const formattedData = formatData(data);

  return (
    <div className="wordcloud-container">
      <WordCloud
        data={formattedData}
        fontSizeMapper={fontSizeMapper}
        rotate={rotate}
        padding={5}
        onWordClick={word => alert(`Clicked on word: ${word.text}`)}
        style={{ width: '100%', height: '500px' }}
      />
    </div>
  );
};

WordCloudChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.number,
    })
  ).isRequired,
};

export default WordCloudChart;
