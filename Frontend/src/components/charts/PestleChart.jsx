import { PolarArea } from 'react-chartjs-2';
import { countBy } from '../../utils/aggregations';
import { categoricalPalette, tooltipStyle } from '../../utils/chartTheme';
import Panel from '../ui/Panel';
import { ChartEmpty } from '../ui/ChartState';

export default function PestleChart({ data }) {
  const rows = countBy(data, 'pestle', 8);

  const chartData = {
    labels: rows.map((r) => r.label),
    datasets: [
      {
        data: rows.map((r) => r.value),
        backgroundColor: categoricalPalette.map((c) => `${c}b3`),
        borderColor: '#0e1a1c',
        borderWidth: 1.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: { boxWidth: 9, boxHeight: 9, font: { size: 10 }, color: '#90a3a2', padding: 10 },
      },
      tooltip: tooltipStyle,
    },
    scales: {
      r: {
        grid: { color: 'rgba(38,64,63,0.6)' },
        angleLines: { color: 'rgba(38,64,63,0.6)' },
        ticks: { display: false, backdropColor: 'transparent' },
      },
    },
  };

  return (
    <Panel eyebrow="Classification" title="PESTLE Distribution">
      {rows.length === 0 ? (
        <ChartEmpty message="No PEST/PESTLE data available." />
      ) : (
        <div style={{ height: 260 }}>
          <PolarArea data={chartData} options={options} />
        </div>
      )}
    </Panel>
  );
}
