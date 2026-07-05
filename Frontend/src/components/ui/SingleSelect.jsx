export default function SingleSelect({ label, options, value, onChange }) {
  const isEmpty = !options || options.length === 0;
  return (
    <label
      className={`flex flex-col gap-1 rounded-sm border border-hairline bg-panel-raised px-3 py-2 ${
        isEmpty ? 'opacity-50' : ''
      }`}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-2">
        {label}
      </span>
      <select
        disabled={isEmpty}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full cursor-pointer bg-transparent text-sm text-paper focus:outline-none disabled:cursor-not-allowed"
      >
        <option className="bg-ink" value="">
          {isEmpty ? 'Not in dataset' : 'All'}
        </option>
        {options.map((opt) => (
          <option className="bg-ink" key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}
