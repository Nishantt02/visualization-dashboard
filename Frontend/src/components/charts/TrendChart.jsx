import { Line } from 'react-chartjs-2';
import { yearlyTrend } from '../../utils/aggregations';
import { palette, tooltipStyle, baseGrid } from '../../utils/chartTheme';
import Panel from '../ui/Panel';
import { ChartEmpty } from '../ui/ChartState';

export default function TrendChart({ data }) {
  const rows = yearlyTrend(data);

  const chartData = {
    labels: rows.map((r) => r.year),
    datasets: [
      {
        label: 'Intensity',
        data: rows.map((r) => Number(r.intensity.toFixed(2))),
        borderColor: palette.signal,
        backgroundColor: 'rgba(232,163,61,0.12)',
        tension: 0.35,
        fill: true,
        pointRadius: 2,
      },
      {
        label: 'Likelihood',
        data: rows.map((r) => Number(r.likelihood.toFixed(2))),
        borderColor: palette.cyan,
        backgroundColor: 'transparent',
        tension: 0.35,
        pointRadius: 2,
      },
      {
        label: 'Relevance',
        data: rows.map((r) => Number(r.relevance.toFixed(2))),
        borderColor: palette.muted,
        borderDash: [4, 3],
        backgroundColor: 'transparent',
        tension: 0.35,
        pointRadius: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: { boxWidth: 10, boxHeight: 10, font: { size: 11 }, color: palette.muted },
      },
      tooltip: tooltipStyle,
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { family: "'JetBrains Mono', monospace", size: 10 } } },
      y: { grid: baseGrid, ticks: { font: { family: "'JetBrains Mono', monospace", size: 10 } } },
    },
  };

  return (
    <Panel eyebrow="Time Series" title="Metrics Over Year">
      {rows.length === 0 ? (
        <ChartEmpty message="No year data available for current filters." />
      ) : (
        <div style={{ height: 280 }}>
          <Line data={chartData} options={options} />
        </div>
      )}
    </Panel>
  );
}
