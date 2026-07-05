import { Bubble } from 'react-chartjs-2';
import { scatterPoints } from '../../utils/aggregations';
import { palette, tooltipStyle } from '../../utils/chartTheme';
import Panel from '../ui/Panel';
import { ChartEmpty } from '../ui/ChartState';

export default function IntensityLikelihoodScatter({ data }) {
  const points = scatterPoints(data);

  const chartData = {
    datasets: [
      {
        label: 'Records',
        data: points,
        backgroundColor: 'rgba(232, 163, 61, 0.45)',
        borderColor: palette.signal,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        ...tooltipStyle,
        callbacks: {
          label: (ctx) => {
            const p = points[ctx.dataIndex];
            return [
              p.label ? p.label.slice(0, 48) : undefined,
              `likelihood ${p.x}  ·  intensity ${p.y}`,
            ].filter(Boolean);
          },
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: 'Likelihood', color: palette.muted, font: { size: 11 } },
        grid: { color: palette.hairline },
        ticks: { font: { family: "'JetBrains Mono', monospace", size: 10 } },
      },
      y: {
        title: { display: true, text: 'Intensity', color: palette.muted, font: { size: 11 } },
        grid: { color: palette.hairline },
        ticks: { font: { family: "'JetBrains Mono', monospace", size: 10 } },
      },
    },
  };

  return (
    <Panel eyebrow="Correlation" title="Intensity vs Likelihood">
      {points.length === 0 ? (
        <ChartEmpty />
      ) : (
        <div style={{ height: 280 }}>
          <Bubble data={chartData} options={options} />
        </div>
      )}
    </Panel>
  );
}
