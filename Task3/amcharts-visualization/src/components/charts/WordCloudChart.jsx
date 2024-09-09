
import React from 'react';
import WordCloud from 'react-d3-cloud';
import PropTypes from 'prop-types';
import '../Css/WordCloudChart.css';


const formatData = (data) => {
  return data.map(item => ({
    text: item.text || item._id,
    value: item.value || item.count
  }));
};


const fontSizeMapper = word => Math.log2(word.value) * 10 + 10;


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
