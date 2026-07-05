import { Doughnut } from 'react-chartjs-2';
import { countBy } from '../../utils/aggregations';
import { categoricalPalette, tooltipStyle } from '../../utils/chartTheme';
import Panel from '../ui/Panel';
import { ChartEmpty } from '../ui/ChartState';

export default function RegionDonut({ data }) {
  const rows = countBy(data, 'region', 8);
  const total = rows.reduce((a, r) => a + r.value, 0);

  const chartData = {
    labels: rows.map((r) => r.label),
    datasets: [
      {
        data: rows.map((r) => r.value),
        backgroundColor: categoricalPalette,
        borderColor: '#0e1a1c',
        borderWidth: 2,
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '68%',
    plugins: {
      legend: {
        position: 'right',
        labels: { boxWidth: 9, boxHeight: 9, font: { size: 10 }, color: '#90a3a2', padding: 10 },
      },
      tooltip: {
        ...tooltipStyle,
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.parsed} (${((ctx.parsed / total) * 100).toFixed(0)}%)`,
        },
      },
    },
  };

  return (
    <Panel eyebrow="Geography" title="Records by Region">
      {rows.length === 0 ? (
        <ChartEmpty />
      ) : (
        <div style={{ height: 260 }}>
          <Doughnut data={chartData} options={options} />
        </div>
      )}
    </Panel>
  );
}
