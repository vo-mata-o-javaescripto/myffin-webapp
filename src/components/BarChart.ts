import { defineComponent, h } from 'vue';
import type { PropType } from 'vue';
import { Bar } from 'vue-chartjs';

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

import type { Plugin } from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default defineComponent({
  name: 'BarChart',
  components: {
    Bar,
  },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart',
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: '',
      type: String,
    },
    styles: {
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
    },
    plugins: {
      type: Array as PropType<Plugin<'bar'>[]>,
      default: () => [],
    },
    labels: {
      type: Array as PropType<Array<string>>,
      default: () => [],
    },
    data: {
      type: Array as PropType<Array<number>>,
      default: () => [],
    },
  },
  setup(props) {
    const chartData = {
      labels: props.labels,
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: props.data,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };

    return () =>
      h(Bar, {
        chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins,
      });
  },
});
