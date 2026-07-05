export default function Panel({ eyebrow, title, action, children, className = '' }) {
  return (
    <div
      className={`relative rounded-sm border border-hairline bg-panel/80 backdrop-blur-sm ${className}`}
    >
      <div className="absolute left-0 top-0 h-full w-[3px] bg-signal/70" />
      <div className="flex items-start justify-between gap-3 border-b border-hairline px-5 py-4">
        <div>
          {eyebrow && (
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan">
              {eyebrow}
            </p>
          )}
          <h3 className="mt-1 font-display text-[17px] font-medium leading-none text-paper">
            {title}
          </h3>
        </div>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
