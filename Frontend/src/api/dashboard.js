import client from './client';
import { ENDPOINTS, QUERY_PARAM_MAP } from './config';

/**
 * Builds query params from the dashboard's active filter state.
 * Array values (multi-select filters) are sent as comma-separated
 * strings, e.g. ?topic=oil,gas,coal - this matches your backend's
 * normalizeValues() which splits on commas.
 */
function buildParams(filters = {}) {
  const params = {};
  Object.entries(filters).forEach(([key, value]) => {
    const paramName = QUERY_PARAM_MAP[key] || key;
    if (Array.isArray(value)) {
      if (value.length) params[paramName] = value.join(',');
    } else if (value !== undefined && value !== null && value !== '') {
      params[paramName] = value;
    }
  });
  return params;
}

/** Fetches the (filtered) raw dataset from /data/filters. */
export async function fetchData(filters = {}) {
  const { data } = await client.get(ENDPOINTS.data, { params: buildParams(filters) });
  // Tolerate either a bare array or a { data: [...] } wrapper
  return Array.isArray(data) ? data : data?.data ?? [];
}

const OPTIONS_KEY_MAP = {
  endYears: 'endYear',
  topics: 'topics',
  sectors: 'sectors',
  regions: 'regions',
  pestles: 'pestles',
  sources: 'sources',
  swot: 'swot',
  countries: 'countries',
  // cities intentionally excluded: your /options endpoint doesn't return it
};

/**
 * Fetches filter dropdown options. Tries the combined /options endpoint
 * first (one request, matches your getFilterOptions controller), then
 * fetches /filters/cities separately since /options omits it. Falls back
 * to per-field /filters/:field calls for anything /options fails to
 * provide, and finally to client-side derivation if everything fails.
 */
export async function fetchFilterOptions() {
  const options = {};

  try {
    const { data: combined } = await client.get(ENDPOINTS.options);
    Object.entries(OPTIONS_KEY_MAP).forEach(([internalKey, apiKey]) => {
      options[internalKey] = Array.isArray(combined?.[apiKey]) ? combined[apiKey] : null;
    });
  } catch {
    // /options unavailable - leave everything null, per-field fallback below will try each one
    Object.keys(OPTIONS_KEY_MAP).forEach((key) => { options[key] = null; });
  }

  // cities is never in /options - always fetch it separately
  const missingKeys = Object.keys(ENDPOINTS.filters).filter(
    (key) => key === 'cities' || options[key] == null
  );

  if (missingKeys.length) {
    const results = await Promise.allSettled(
      missingKeys.map((key) => client.get(ENDPOINTS.filters[key]))
    );
    results.forEach((result, i) => {
      const key = missingKeys[i];
      if (result.status === 'fulfilled') {
        const payload = result.value.data;
        options[key] = Array.isArray(payload) ? payload : payload?.data ?? [];
      } else {
        options[key] = options[key] ?? null; // still null -> derive client-side
      }
    });
  }

  return options;
}
