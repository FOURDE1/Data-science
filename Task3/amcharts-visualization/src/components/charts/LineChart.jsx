// src/components/charts/LineChart.jsx
import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

const LineChart = ({ data }) => {
  useLayoutEffect(() => {
    let chart = am4core.create('chartdiv', am4charts.XYChart);
    chart.data = data;

    // Set chart background color
    chart.background.fill = am4core.color("#f0f0f0"); // Non-light white color
    chart.background.fillOpacity = 1;

    // Add border to the chart
    chart.plotContainer.background.stroke = am4core.color("#000000");
    chart.plotContainer.background.strokeWidth = 2;
    chart.plotContainer.background.strokeOpacity = 1;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.dataFields.date = 'date';
    dateAxis.title.text = 'Date';

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = 'Articles Published';

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = 'value';
    series.dataFields.dateX = 'date';
    series.name = 'Count';
    series.tooltipText = '{dateX}: [bold]{valueY}[/]';
    series.strokeWidth = 2;
    series.minBulletDistance = 15;

    // Add a bullet at each data point
    let bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 4;
    bullet.circle.fill = am4core.color("#fff");

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panXY";
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = series;

    // Add scrollbar
    chart.scrollbarX = new am4core.Scrollbar();

    return () => {
      chart.dispose();
    };
  }, [data]);

  return (
    <div
      id="chartdiv"
      style={{
        width: '100%',
        height: '500px',
        border: '2px solid #000000', // Border for the container div
        borderRadius: '8px', // Rounded corners
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for better design
        backgroundColor: '#f0f0f0', // Match the chart background color
        padding: '10px', // Padding around the chart
      }}
    ></div>
  );
};

LineChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default LineChart;
