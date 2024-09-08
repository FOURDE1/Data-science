import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as am5 from '@amcharts/amcharts5';
import * as am5hierarchy from '@amcharts/amcharts5/hierarchy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const BubbleChart = ({ data }) => {
  useEffect(() => {
    // Create root element
    const root = am5.Root.new('chartdiv');

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Prepare data
     // Prepare data
     const chartData = {
      value: 0,
      children: data.map(article => ({
        name: article.title,
        value: article.wordCount || 1, // Ensure each node has a value, default to 1 if wordCount is 0 or undefined
        linkWith: ['Articles'], // Provide URL for linking
        url: article.url,
        children: article.children || [] ,// Add children if any
      }))
    };

    // Create wrapper container
    const container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: root.verticalLayout
      })
    );

    // Create series for force-directed tree
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
    // Add data
    series.data.setAll([chartData]);

    // Ensure main node is properly set
    const mainNode = series.dataItems.find(item => item.dataContext.name === 'Articles');
    if (mainNode) {
      mainNode.node.set('value', 100); // Make the main node bigger
      mainNode.node.set('fill', am5.color(0x333333)); // Color of the main bubble
    }

    // Add click event to open URL in new tab
    series.nodes.template.events.on('hit', (ev) => {
      const dataItem = ev.target.dataItem;
      console.log('Node clicked:', dataItem); // Log the dataItem to see its structure
      if (dataItem && dataItem.dataContext && dataItem.dataContext.url) {
        console.log('Opening URL:', dataItem.dataContext.url); // Log the URL before opening
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

    // Animate on load
    series.appear(1000, 100);

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
        height: '700px', // Increased height
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
      wordCount: PropTypes.number, // Optional: can be undefined or 0
      url: PropTypes.string.isRequired,
      children: PropTypes.array // Optional: can be undefined
    })
  ).isRequired
};

export default BubbleChart;
