import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as am5 from '@amcharts/amcharts5';
import * as am5hierarchy from '@amcharts/amcharts5/hierarchy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const BubbleChart = ({ data }) => {
  useEffect(() => {

    const root = am5.Root.new('chartdiv');


    root.setThemes([am5themes_Animated.new(root)]);


     const chartData = {
      value: 0,
      children: data.map(article => ({
        name: article.title,
        value: article.wordCount || 1,
        linkWith: ['Articles'],
        url: article.url,
        children: article.children || [] ,
      }))
    };


    const container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: root.verticalLayout
      })
    );


    const series = container.children.push(
      am5hierarchy.ForceDirected.new(root, {
        singleBranchOnly: false,
        downDepth: 2,
        topDepth: 1,
        initialDepth: 1,
        valueField: 'value',
        categoryField: 'name',
        childDataField: 'children',
        idField: 'name',
        linkWithField: 'linkWith',
        manyBodyStrength: -4,
        centerStrength: 0.9
      })
    );

    // Set colors and links
    series.get('colors').setAll({
      step: 2,
      list: [
        am5.color(0xff6f61), // Coral
        am5.color(0x6b5b95), // Purple
        am5.color(0x88b04b), // Green
        am5.color(0xF7B32B), // Yellow
        am5.color(0xE94F37)  // Red
      ]
    });

    series.links.template.set('strength', 1.5);
    series.links.template.set('strokeWidth', 5);

    series.data.setAll([chartData]);


    const mainNode = series.dataItems.find(item => item.dataContext.name === 'Articles');
    if (mainNode) {
      mainNode.node.set('value', 100);
      mainNode.node.set('fill', am5.color(0x333333));
    }

    // Add click event to open URL in new tab
    series.nodes.template.events.on('hit', (ev) => {
      const dataItem = ev.target.dataItem;
      console.log('Node clicked:', dataItem);
      if (dataItem && dataItem.dataContext && dataItem.dataContext.url) {
        console.log('Opening URL:', dataItem.dataContext.url);
        window.open(dataItem.dataContext.url, '_blank');
      } else {
        console.log('No URL found for this node.');
      }
    });

    series.events.on('maxsizechanged', () => {
      root.svgContainer.events.on('zoomed', () => {
        root.svgContainer.fitToBounds();
      });
    });


    series.appear(1000, 100);


    return () => {
      root.dispose();
    };
  }, [data]);

  return (
    <div
      id="chartdiv"
      style={{
        width: '100%',
        height: '700px',
        border: '2px solid #000000',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f0f0f0',
        padding: '10px'
      }}
    ></div>
  );
};

BubbleChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      wordCount: PropTypes.number,
      url: PropTypes.string.isRequired,
      children: PropTypes.array 
    })
  ).isRequired
};

export default BubbleChart;
