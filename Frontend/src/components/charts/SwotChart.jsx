import { Doughnut } from 'react-chartjs-2';
import { countBy } from '../../utils/aggregations';
import { categoricalPalette, tooltipStyle } from '../../utils/chartTheme';
import Panel from '../ui/Panel';
import { ChartEmpty } from '../ui/ChartState';

export default function SwotChart({ data }) {
  const rows = countBy(data, 'swot', 6);

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
    cutout: '55%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: { boxWidth: 9, boxHeight: 9, font: { size: 10 }, color: '#90a3a2', padding: 10 },
      },
      tooltip: tooltipStyle,
    },
  };

  return (
    <Panel eyebrow="Classification" title="SWOT Breakdown">
      {rows.length === 0 ? (
        <ChartEmpty message="No SWOT field present in the current dataset." />
      ) : (
        <div style={{ height: 260 }}>
          <Doughnut data={chartData} options={options} />
        </div>
      )}
    </Panel>
  );
}
