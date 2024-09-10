// src/components/charts/BarChart.jsx
import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

const BarChart = ({ data }) => {
  useLayoutEffect(() => {
    let chart = am4core.create('chartdiv', am4charts.XYChart);
    chart.data = data;


    chart.background.fill = am4core.color("#f0f0f0"); // Non-light white color
    chart.background.fillOpacity = 1;


    chart.plotContainer.background.stroke = am4core.color("#000000");
    chart.plotContainer.background.strokeWidth = 2;
    chart.plotContainer.background.strokeOpacity = 1;

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'category';
    categoryAxis.title.text = 'Authors';
    categoryAxis.renderer.minGridDistance = 40; // Increase the space between categories

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = 'Articles Published';
    valueAxis.logarithmic = true;
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = 'value';
    series.dataFields.categoryX = 'category';
    series.name = 'Count';
    series.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/]';
    series.columns.template.fillOpacity = 0.8;

    let columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;

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
        border: '2px solid #000000',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f0f0f0',
        padding: '10px',
      }}
    ></div>
  );
};

BarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default BarChart;
