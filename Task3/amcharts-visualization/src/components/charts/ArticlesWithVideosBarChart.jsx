import React, { useLayoutEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

const ArticlesWithVideosBarChart = ({ data }) => {
  useLayoutEffect(() => {
    let chart = am4core.create('articlesWithVideosChartDiv', am4charts.XYChart);
    chart.data = data.map(article => ({
      category: article.title,
      duration: article.video_duration // Assuming videoDuration is the field for video duration
    }));

    chart.background.fill = am4core.color("#f0f0f0"); // Non-light white color
    chart.background.fillOpacity = 1;

    chart.plotContainer.background.stroke = am4core.color("#000000");
    chart.plotContainer.background.strokeWidth = 2;
    chart.plotContainer.background.strokeOpacity = 1;

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'category';
    categoryAxis.renderer.labels.template.disabled = true; // Hide category axis labels
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = 'Video Duration (minutes)';
    valueAxis.renderer.minGridDistance = 20;
    // add the logarthmic
    valueAxis.logarithmic = true;

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = 'duration';
    series.dataFields.categoryX = 'category';
    series.name = 'Articles';
    series.columns.template.tooltipText = "{categoryX}\nDuration: [bold]{valueY}[/] minutes";
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

  return <div id="articlesWithVideosChartDiv" style={{ width: '100%', height: '500px' }}></div>;
};

export default ArticlesWithVideosBarChart;
