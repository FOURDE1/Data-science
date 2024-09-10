import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as am5 from '@amcharts/amcharts5';
import * as am5hierarchy from '@amcharts/amcharts5/hierarchy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const ForceDirectedTree = ({ data }) => {
  useEffect(() => {
    const root = am5.Root.new('chartdiv');

    root.setThemes([am5themes_Animated.new(root)]);

    // Transforming the input data
    const chartData = {
      value: 0,
      children: data.map((item) => ({
        name: item._id,
        value: item.count,
        children: item.authors.map((author) => ({
          name: author,
          value: 1,
        })),
      })),
    };

    const container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: root.verticalLayout,
      })
    );

    const series = container.children.push(
      am5hierarchy.ForceDirected.new(root, {
        singleBranchOnly: true, // Ensures only one branch expands at a time
        downDepth: 1, // Controls initial depth of expanded nodes
        initialDepth: 1, // Only main nodes are visible initially
        valueField: 'value',
        categoryField: 'name',
        childDataField: 'children',
        idField: 'name',
        minRadius: 40, // Minimum radius for bubbles
        maxRadius: 100, // Maximum radius for bubbles
        manyBodyStrength: -15, // Force strength for pushing nodes apart
        centerStrength: 2, // Force strength for pulling nodes to the center
        linkWithField: 'linkWith',
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
        am5.color(0xE94F37), // Red
      ],
    });

    series.links.template.set('strength', 1.5);
    series.links.template.set('strokeWidth', 2);

    series.data.setAll([chartData]);

    // Customize node appearance
    series.nodes.template.setAll({
      tooltipText: '{name}',
      radius: 40, // Adjusted radius for better visibility
      fill: am5.color(0x88b04b),
    });

    series.nodes.template.states.create('hover', {
      fill: am5.color(0x6b5b95),
    });

    // Add click event to open URL in new tab or expand/collapse nodes
    series.nodes.template.events.on('hit', (ev) => {
      const node = ev.target;
      const dataItem = node.dataItem;

      // Expand/collapse functionality
      if (dataItem && dataItem.children) {
        if (dataItem.isExpanded) {
          dataItem.collapse();
          dataItem.isExpanded = false;
        } else {
          dataItem.expand();
          dataItem.isExpanded = true;
        }
      }
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
        height: '850px',
        border: '2px solid #000000',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f0f0f0',
        padding: '10px',
      }}
    ></div>
  );
};

ForceDirectedTree.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
      authors: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};

export default ForceDirectedTree;
