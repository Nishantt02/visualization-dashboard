import { X } from 'lucide-react';

const LABELS = {
  endYear: 'End Year',
  topics: 'Topic',
  sectors: 'Sector',
  regions: 'Region',
  pestles: 'PEST',
  sources: 'Source',
  swot: 'SWOT',
  countries: 'Country',
  cities: 'City',
};

export default function ActiveFilterChips({ filters, updateFilter }) {
  const chips = [];
  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) =>
        chips.push({ key, value: v, onRemove: () => updateFilter(key, value.filter((x) => x !== v)) })
      );
    } else if (value) {
      chips.push({ key, value, onRemove: () => updateFilter(key, '') });
    }
  });

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-2">
        Active:
      </span>
      {chips.map((chip, i) => (
        <button
          key={`${chip.key}-${chip.value}-${i}`}
          onClick={chip.onRemove}
          className="flex items-center gap-1.5 rounded-full border border-signal/40 bg-signal/10 px-2.5 py-1 font-mono text-[11px] text-signal transition-colors hover:bg-signal/20"
        >
          <span className="text-muted-2">{LABELS[chip.key]}:</span>
          {chip.value}
          <X size={11} />
        </button>
      ))}
    </div>
  );
}
