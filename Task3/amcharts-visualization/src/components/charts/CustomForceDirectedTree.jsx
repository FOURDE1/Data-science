import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as am5 from '@amcharts/amcharts5';
import * as am5hierarchy from '@amcharts/amcharts5/hierarchy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const CustomForceDirectedTree = ({ data }) => {
  useEffect(() => {
    const root = am5.Root.new('chartdiv');

    root.setThemes([am5themes_Animated.new(root)]);

    // Transforming the input data
    const chartData = {
      name: "Top Keywords",
      children: data.map((item) => ({
        name: item._id,
        value: item.count,
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
        valueField: 'value',
        categoryField: 'name',
        childDataField: 'children',
        idField: 'name',
        minRadius: 20,
        maxRadius: 80,
        manyBodyStrength: -20,
        centerStrength: 0.5,
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
      tooltipText: '{name}: {value}',
      radius: 40,
      fill: am5.color(0x88b04b),
    });

    series.nodes.template.states.create('hover', {
      fill: am5.color(0x6b5b95),
    });

    // Add click event to expand/collapse nodes
    series.nodes.template.events.on('hit', (ev) => {
      const node = ev.target;
      const dataItem = node.dataItem;

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

CustomForceDirectedTree.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CustomForceDirectedTree;
