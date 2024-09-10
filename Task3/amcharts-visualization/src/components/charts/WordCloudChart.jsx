import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as am5 from '@amcharts/amcharts5';
import * as am5wc from '@amcharts/amcharts5/wc';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import '../Css/WordCloudChart.css';

const processData = (data) => {
  const processedData = [];
  data.forEach(item => {
    const words = item.text.split(',');
    words.forEach(word => {
      processedData.push({ text: word.trim(), value: item.value });
    });
  });
  return processedData;
};

const WordCloudChart = ({ data }) => {
  useEffect(() => {
    console.log('WordCloudChart data:', data); // Log the data to ensure it's being passed correctly

    // Create root element
    const root = am5.Root.new('chartdiv');

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create series
    const series = root.container.children.push(
      am5wc.WordCloud.new(root, {
        maxCount: 200,
        minWordLength: 2,
        minFontSize: am5.percent(5),
        maxFontSize: am5.percent(30),
        colors: am5.ColorSet.new(root, {
          colors: [
            am5.color(0x095256),
            am5.color(0x087f8c),
            am5.color(0x5aaa95),
            am5.color(0x86a873),
            am5.color(0xbb9f06)
          ]
        })
      })
    );

    // Process data
    const processedData = processData(data);
    console.log('Processed data:', processedData); // Log the processed data

    // Set data
    series.data.setAll(processedData);

    // Add click event to open Google search
    series.labels.template.events.on("click", (ev) => {
      const category = ev.target.dataItem.get("category");
      window.open("https://www.google.com/search?q=" + encodeURIComponent(category));
    });

    // Cleanup function
    return () => {
      root.dispose();
    };
  }, [data]);

  return (
    <div
      id="chartdiv"
      style={{
        width: '100%',
        height: '600px',
        border: '2px solid #000000',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f0f0f0',
        padding: '10px'
      }}
    ></div>
  );
};

WordCloudChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  ).isRequired
};

export default WordCloudChart;
