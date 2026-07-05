// All aggregation happens client-side on whatever records the backend
// returns for the current filter selection. This keeps the frontend
// decoupled from how much (or little) aggregation the backend does.

const clean = (v) => (v === undefined || v === null ? '' : String(v).trim());

/** Strips placeholder/bogus values (0, "0", empty) that leak in when
 *  empty strings get cast to Number by Mongoose, then sorts. */
export function cleanOptionList(values) {
  return (values || [])
    .map((v) => clean(v))
    .filter((v) => v && v !== '0' && v.toLowerCase() !== 'null' && v.toLowerCase() !== 'undefined')
    .sort();
}

export function deriveOptions(data, field) {
  const set = new Set();
  data.forEach((row) => {
    const v = clean(row[field]);
    if (v) set.add(v);
  });
  return Array.from(set).sort();
}

export function avg(nums) {
  const valid = nums.filter((n) => typeof n === 'number' && !Number.isNaN(n));
  if (!valid.length) return 0;
  return valid.reduce((a, b) => a + b, 0) / valid.length;
}

export function computeKpis(data) {
  return {
    total: data.length,
    avgIntensity: avg(data.map((d) => d.intensity)),
    avgLikelihood: avg(data.map((d) => d.likelihood)),
    avgRelevance: avg(data.map((d) => d.relevance)),
  };
}

/** Groups by `field`, averaging `valueField`, sorted desc, top N. */
export function groupAvgBy(data, field, valueField, topN = 10) {
  const buckets = new Map();
  data.forEach((row) => {
    const key = clean(row[field]);
    if (!key) return;
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(row[valueField]);
  });
  return Array.from(buckets.entries())
    .map(([label, values]) => ({ label, value: avg(values), count: values.length }))
    .sort((a, b) => b.value - a.value)
    .slice(0, topN);
}

/** Groups by `field`, counting occurrences, sorted desc, top N. */
export function countBy(data, field, topN = 12) {
  const buckets = new Map();
  data.forEach((row) => {
    const key = clean(row[field]);
    if (!key) return;
    buckets.set(key, (buckets.get(key) || 0) + 1);
  });
  return Array.from(buckets.entries())
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, topN);
}

/** Yearly trend of avg intensity / likelihood / relevance, using start_year. */
export function yearlyTrend(data) {
  const buckets = new Map();
  data.forEach((row) => {
    const year = clean(row.start_year) || clean(row.end_year);
    // Many records have "" for start_year/end_year, which Mongoose's
    // Number cast can turn into 0 - treat that as missing, not year zero.
    if (!year || year === '0' || Number.isNaN(Number(year))) return;
    if (!buckets.has(year)) buckets.set(year, { intensity: [], likelihood: [], relevance: [] });
    const b = buckets.get(year);
    b.intensity.push(row.intensity);
    b.likelihood.push(row.likelihood);
    b.relevance.push(row.relevance);
  });
  return Array.from(buckets.entries())
    .map(([year, b]) => ({
      year,
      intensity: avg(b.intensity),
      likelihood: avg(b.likelihood),
      relevance: avg(b.relevance),
    }))
    .sort((a, b) => Number(a.year) - Number(b.year));
}

/** Intensity vs likelihood points, bubble-sized by relevance, capped for readability. */
export function scatterPoints(data, cap = 250) {
  return data
    .filter((d) => typeof d.intensity === 'number' && typeof d.likelihood === 'number')
    .slice(0, cap)
    .map((d) => ({
      x: d.likelihood,
      y: d.intensity,
      r: Math.max(3, (d.relevance || 1) * 1.6),
      label: d.title || d.topic || '',
    }));
}
