import React, { useLayoutEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

const ArticlesByYearBarChart = ({ data }) => {
  useLayoutEffect(() => {
    let chart = am4core.create('articlesByYearChartDiv', am4charts.XYChart);
    chart.data = data.map(item => ({
      year: item.year,
      count: item.count
    }));

    chart.background.fill = am4core.color("#f0f0f0"); // Non-light white color
    chart.background.fillOpacity = 1;

    chart.plotContainer.background.stroke = am4core.color("#000000");
    chart.plotContainer.background.strokeWidth = 2;
    chart.plotContainer.background.strokeOpacity = 1;

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'year';
    categoryAxis.renderer.labels.template.disabled = true; // Hide category axis labels
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = 'Number of Articles';
    valueAxis.renderer.minGridDistance = 20;

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = 'count';
    series.dataFields.categoryX = 'year';
    series.name = 'Articles';
    series.columns.template.tooltipText = "{categoryX}\nCount: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = 0.8;

    let columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;

    // Add cursor for better interaction
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.disabled = true;
    chart.cursor.lineY.disabled = true;

    // Add scrollbar for better navigation
    chart.scrollbarX = new am4core.Scrollbar();

    return () => {
      chart.dispose();
    };
  }, [data]);

  return <div id="articlesByYearChartDiv" style={{ width: '100%', height: '500px' }}></div>;
};

export default ArticlesByYearBarChart;
