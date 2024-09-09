
import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

const PieChart = ({ data }) => {
  useLayoutEffect(() => {
    let chart = am4core.create('chartdiv', am4charts.PieChart);

    if (chart) {
      chart.data = data;


      if (chart.background) {
        chart.background.fill = am4core.color("#f0f0f0");
        chart.background.fillOpacity = 1;
      }


      if (chart.plotContainer && chart.plotContainer.background) {
        chart.plotContainer.background.stroke = am4core.color("#000000");
        chart.plotContainer.background.strokeWidth = 2;
        chart.plotContainer.background.strokeOpacity = 1;
      }

      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = 'count';
      pieSeries.dataFields.category = 'language';
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;

      pieSeries.slices.template.tooltipText = "{category}: [bold]{value}[/]";


      chart.legend = new am4charts.Legend();
    }

    return () => {
      if (chart) {
        chart.dispose();
      }
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

PieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      language: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default PieChart;
