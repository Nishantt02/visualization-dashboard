import MultiSelect from './ui/MultiSelect';
import SingleSelect from './ui/SingleSelect';
import { RotateCcw, SlidersHorizontal } from 'lucide-react';

const MULTI_FIELDS = [
  { key: 'topics', label: 'Topic' },
  { key: 'sectors', label: 'Sector' },
  { key: 'regions', label: 'Region' },
  { key: 'pestles', label: 'PEST' },
  { key: 'sources', label: 'Source' },
  { key: 'swot', label: 'SWOT' },
  { key: 'countries', label: 'Country' },
  { key: 'cities', label: 'City' },
];

export default function FilterPanel({ filters, filterOptions, updateFilter, resetFilters, activeFilterCount }) {
  return (
    <aside className="flex h-full flex-col border-r border-hairline bg-panel/60">
      <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={14} className="text-signal" />
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            Control Panel
          </p>
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wide text-muted-2 hover:text-signal"
          >
            <RotateCcw size={11} /> reset ({activeFilterCount})
          </button>
        )}
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        <SingleSelect
          label="End Year"
          options={filterOptions.endYears}
          value={filters.endYear}
          onChange={(v) => updateFilter('endYear', v)}
        />
        {MULTI_FIELDS.map(({ key, label }) => (
          <MultiSelect
            key={key}
            label={label}
            options={filterOptions[key]}
            selected={filters[key]}
            onChange={(v) => updateFilter(key, v)}
          />
        ))}
      </div>

      <div className="border-t border-hairline px-5 py-3">
        <p className="font-mono text-[10px] leading-relaxed text-muted-2">
          Filters compose with AND logic. Empty = no constraint.
        </p>
      </div>
    </aside>
  );
}
