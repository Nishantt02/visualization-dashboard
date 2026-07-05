export function ChartEmpty({ message = 'No data for the current filters.' }) {
  return (
    <div className="flex h-[260px] flex-col items-center justify-center gap-2 text-center">
      <div className="h-8 w-8 rounded-full border border-dashed border-hairline" />
      <p className="max-w-[220px] font-mono text-xs text-muted-2">{message}</p>
    </div>
  );
}

export function ChartLoading() {
  return (
    <div className="flex h-[260px] items-center justify-center">
      <div className="flex items-center gap-2 font-mono text-xs text-cyan">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" />
        reading signal…
      </div>
    </div>
  );
}
