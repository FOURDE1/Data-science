import React, { useLayoutEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

const BarChart = ({ data }) => {
  useLayoutEffect(() => {
    
    const transformedData = data.flatMap(item => {
      return item._id.split(',').map(keyword => ({
        category: keyword.trim(),
        value: item.count
      }));
    });

    let chart = am4core.create('barchartdiv', am4charts.XYChart);
    chart.data = transformedData;

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'category';
    categoryAxis.title.text = 'Categories';

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = 'Values';

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

  return <div id="barchartdiv" style={{ width: '100%', height: '500px' }}></div>;
};

export default BarChart;
