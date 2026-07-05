import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  PointElement,
  LineElement,
  LineController,
  ArcElement,
  DoughnutController,
  PolarAreaController,
  BubbleController,
  RadialLinearScale,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  PointElement,
  LineElement,
  LineController,
  ArcElement,
  DoughnutController,
  PolarAreaController,
  BubbleController,
  RadialLinearScale,
  Tooltip,
  Legend,
  Filler
);

export const palette = {
  signal: '#e8a33d',
  signalDim: 'rgba(232, 163, 61, 0.35)',
  cyan: '#4fb0a5',
  cyanDim: 'rgba(79, 176, 165, 0.35)',
  alert: '#c1554d',
  paper: '#edeae3',
  muted: '#90a3a2',
  hairline: 'rgba(38, 64, 63, 0.6)',
  panelRaised: '#1a2f30',
};

export const categoricalPalette = [
  '#e8a33d', '#4fb0a5', '#c1554d', '#8a9a9a',
  '#d9c27a', '#6f9a92', '#a86a54', '#5f7574',
];

ChartJS.defaults.font.family = "'Inter', system-ui, sans-serif";
ChartJS.defaults.color = palette.muted;
ChartJS.defaults.borderColor = palette.hairline;

export const baseGrid = {
  color: palette.hairline,
  drawTicks: false,
};

export const tooltipStyle = {
  backgroundColor: '#0e1a1c',
  titleColor: palette.paper,
  bodyColor: palette.muted,
  borderColor: palette.hairline,
  borderWidth: 1,
  padding: 10,
  titleFont: { family: "'JetBrains Mono', monospace", size: 12 },
  bodyFont: { family: "'Inter', system-ui, sans-serif", size: 12 },
  displayColors: true,
  boxPadding: 4,
};
