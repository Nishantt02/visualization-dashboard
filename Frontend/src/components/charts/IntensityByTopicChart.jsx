import { Bar } from 'react-chartjs-2';
import { groupAvgBy } from '../../utils/aggregations';
import { palette, tooltipStyle, baseGrid } from '../../utils/chartTheme';
import Panel from '../ui/Panel';
import { ChartEmpty } from '../ui/ChartState';

export default function IntensityByTopicChart({ data }) {
  const rows = groupAvgBy(data, 'topic', 'intensity', 8).reverse();

  const chartData = {
    labels: rows.map((r) => r.label),
    datasets: [
      {
        label: 'Avg Intensity',
        data: rows.map((r) => Number(r.value.toFixed(2))),
        backgroundColor: palette.signal,
        borderRadius: 2,
        barThickness: 14,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        ...tooltipStyle,
        callbacks: {
          label: (ctx) => `avg intensity: ${ctx.parsed.x}  ·  n=${rows[ctx.dataIndex].count}`,
        },
      },
    },
    scales: {
      x: { grid: baseGrid, ticks: { font: { family: "'JetBrains Mono', monospace", size: 10 } } },
      y: { grid: { display: false }, ticks: { font: { size: 11 } } },
    },
  };

  return (
    <Panel eyebrow="Signal Strength" title="Intensity by Topic">
      {rows.length === 0 ? (
        <ChartEmpty />
      ) : (
        <div style={{ height: Math.max(220, rows.length * 34) }}>
          <Bar data={chartData} options={options} />
        </div>
      )}
    </Panel>
  );
}
