import { RadioTower, Menu } from 'lucide-react';

export default function Header({ onToggleSidebar, recordCount, error, syncing }) {
  const now = new Date();
  return (
    <header className="flex items-center justify-between gap-4 border-b border-hairline bg-panel/80 px-5 py-3">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="rounded-sm border border-hairline p-1.5 text-muted hover:border-signal hover:text-signal lg:hidden"
        >
          <Menu size={16} />
        </button>
        <RadioTower size={18} className="text-signal" />
        <div>
          <h1 className="font-display text-lg font-medium leading-none text-paper">
            Signal Room
          </h1>
          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-2">
            Global Insights Briefing
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {error && (
          <span className="rounded-sm border border-alert/40 bg-alert/10 px-2.5 py-1 font-mono text-[10px] text-alert">
            backend unreachable
          </span>
        )}
        {!error && syncing && (
          <span className="flex items-center gap-1.5 rounded-sm border border-cyan-dim/60 bg-cyan-dim/10 px-2.5 py-1 font-mono text-[10px] text-cyan">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" />
            syncing…
          </span>
        )}
        <div className="hidden text-right sm:block">
          <p className="font-mono text-[10px] uppercase tracking-wide text-muted-2">
            {now.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
          </p>
          <p className="dial-number text-sm text-cyan">{recordCount} records</p>
        </div>
      </div>
    </header>
  );
}
