import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

const BarChartByDate = ({ data }) => {
  useEffect(() => {
    // Create chart instance
    const chart = am4core.create('chartdiv', am4charts.XYChart);

    // Add data
    chart.data = data;

    // Create axes
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.dataFields.date = 'category';
    dateAxis.title.text = 'Date';
    dateAxis.renderer.minGridDistance = 40; // Increase the space between categories

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = 'Articles Published';

    // Create series
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = 'value';
    series.dataFields.dateX = 'category';
    series.name = 'Count';
    series.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/]';
    series.columns.template.fillOpacity = 0.8;

    // Customize columns
    const columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;

    // Customize chart background
    chart.background.fill = am4core.color('#f0f0f0'); // Non-light white color
    chart.background.fillOpacity = 1;
    chart.plotContainer.background.stroke = am4core.color('#000000');
    chart.plotContainer.background.strokeWidth = 2;
    chart.plotContainer.background.strokeOpacity = 1;

    // Cleanup function
    return () => {
      chart.dispose();
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

BarChartByDate.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  ).isRequired
};

export default BarChartByDate;
