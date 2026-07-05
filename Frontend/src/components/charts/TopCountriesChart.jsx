import { Bar } from 'react-chartjs-2';
import { countBy } from '../../utils/aggregations';
import { palette, tooltipStyle, baseGrid } from '../../utils/chartTheme';
import Panel from '../ui/Panel';
import { ChartEmpty } from '../ui/ChartState';

export default function TopCountriesChart({ data }) {
  const rows = countBy(data, 'country', 10);

  const chartData = {
    labels: rows.map((r) => r.label),
    datasets: [
      {
        label: 'Records',
        data: rows.map((r) => r.value),
        backgroundColor: palette.cyan,
        borderRadius: 2,
        barThickness: 16,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: tooltipStyle,
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 10 }, maxRotation: 45, minRotation: 45 } },
      y: { grid: baseGrid, ticks: { font: { family: "'JetBrains Mono', monospace", size: 10 } } },
    },
  };

  return (
    <Panel eyebrow="Geography" title="Top Countries by Volume">
      {rows.length === 0 ? (
        <ChartEmpty />
      ) : (
        <div style={{ height: 280 }}>
          <Bar data={chartData} options={options} />
        </div>
      )}
    </Panel>
  );
}
