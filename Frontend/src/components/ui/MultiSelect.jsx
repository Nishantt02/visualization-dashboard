import { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';

export default function MultiSelect({ label, options, selected, onChange }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef(null);
  const isEmpty = !options || options.length === 0;

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const filtered = useMemo(
    () => options.filter((o) => o.toLowerCase().includes(query.toLowerCase())),
    [options, query]
  );

  const toggle = (opt) => {
    if (selected.includes(opt)) onChange(selected.filter((s) => s !== opt));
    else onChange([...selected, opt]);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        disabled={isEmpty}
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center justify-between gap-2 rounded-sm border border-hairline bg-panel-raised px-3 py-2 text-left transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-signal ${
          isEmpty ? 'cursor-not-allowed opacity-50' : 'hover:border-cyan-dim'
        }`}
      >
        <span className="flex flex-col">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-2">
            {label}
          </span>
          <span className="text-sm text-paper">
            {isEmpty
              ? 'Not in dataset'
              : selected.length === 0
              ? 'All'
              : selected.length === 1
              ? selected[0]
              : `${selected.length} selected`}
          </span>
        </span>
        <ChevronDown size={14} className="shrink-0 text-muted-2" />
      </button>

      {open && !isEmpty && (
        <div className="absolute z-20 mt-1 w-64 max-w-[80vw] rounded-sm border border-hairline bg-ink shadow-xl shadow-black/40">
          <div className="flex items-center gap-2 border-b border-hairline px-2.5 py-2">
            <Search size={13} className="text-muted-2" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="search…"
              className="w-full bg-transparent text-sm text-paper placeholder:text-muted-2 focus:outline-none"
            />
            {selected.length > 0 && (
              <button
                onClick={() => onChange([])}
                className="text-muted-2 hover:text-alert"
                title="Clear"
              >
                <X size={13} />
              </button>
            )}
          </div>
          <div className="max-h-56 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <p className="px-3 py-2 font-mono text-xs text-muted-2">no matches</p>
            )}
            {filtered.map((opt) => {
              const checked = selected.includes(opt);
              return (
                <label
                  key={opt}
                  className="flex cursor-pointer items-center gap-2.5 px-3 py-1.5 text-sm hover:bg-panel-raised"
                >
                  <span
                    className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[2px] border ${
                      checked ? 'border-signal bg-signal' : 'border-hairline'
                    }`}
                  >
                    {checked && <span className="h-1.5 w-1.5 rounded-[1px] bg-ink" />}
                  </span>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={checked}
                    onChange={() => toggle(opt)}
                  />
                  <span className="truncate text-paper/90">{opt}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
