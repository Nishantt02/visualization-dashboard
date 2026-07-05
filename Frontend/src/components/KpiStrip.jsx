const GAUGES = [
  { key: 'total', label: 'Records In View', suffix: '', decimals: 0, max: null },
  { key: 'avgIntensity', label: 'Avg Intensity', suffix: '/ 10', decimals: 1, max: 10 },
  { key: 'avgLikelihood', label: 'Avg Likelihood', suffix: '/ 5', decimals: 1, max: 5 },
  { key: 'avgRelevance', label: 'Avg Relevance', suffix: '/ 5', decimals: 1, max: 5 },
];

export default function KpiStrip({ kpis }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {GAUGES.map(({ key, label, suffix, decimals, max }) => {
        const value = kpis[key] ?? 0;
        const pct = max ? Math.min(100, (value / max) * 100) : null;
        return (
          <div
            key={key}
            className="relative overflow-hidden rounded-sm border border-hairline bg-panel/80 px-4 py-3"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan">
              {label}
            </p>
            <p className="dial-number mt-1 text-[26px] font-semibold text-paper">
              {value.toFixed(decimals)}
              <span className="ml-1 text-xs font-normal text-muted-2">{suffix}</span>
            </p>
            {pct !== null && (
              <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-hairline">
                <div
                  className="sweep-in h-full rounded-full bg-signal"
                  style={{ width: `${pct}%` }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
