import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Panel from './ui/Panel';
import { ChartEmpty } from './ui/ChartState';

const COLUMNS = [
  { key: 'title', label: 'Title' },
  { key: 'topic', label: 'Topic' },
  { key: 'sector', label: 'Sector' },
  { key: 'region', label: 'Region' },
  { key: 'country', label: 'Country' },
  { key: 'intensity', label: 'Intensity' },
  { key: 'likelihood', label: 'Likelihood' },
  { key: 'relevance', label: 'Relevance' },
  { key: 'start_year', label: 'Year' },
];

const PAGE_SIZE = 12;

export default function DataTable({ data }) {
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(data.length / PAGE_SIZE));
  const rows = useMemo(
    () => data.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE),
    [data, page]
  );

  return (
    <Panel
      eyebrow="Raw Feed"
      title="Filtered Records"
      action={
        <div className="flex items-center gap-2 font-mono text-[10px] text-muted-2">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="rounded-sm border border-hairline p-1 disabled:opacity-30 hover:border-signal"
          >
            <ChevronLeft size={12} />
          </button>
          <span>
            {page + 1} / {pageCount}
          </span>
          <button
            disabled={page >= pageCount - 1}
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            className="rounded-sm border border-hairline p-1 disabled:opacity-30 hover:border-signal"
          >
            <ChevronRight size={12} />
          </button>
        </div>
      }
    >
      {data.length === 0 ? (
        <ChartEmpty />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-hairline font-mono uppercase tracking-wide text-muted-2">
                {COLUMNS.map((c) => (
                  <th key={c.key} className="px-2 py-2 font-medium">
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-hairline/50 hover:bg-panel-raised/60">
                  {COLUMNS.map((c) => (
                    <td key={c.key} className="max-w-[220px] truncate px-2 py-2 text-paper/85">
                      {row[c.key] ?? '—'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Panel>
  );
}
