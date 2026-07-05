/**
 * ============================================================
 *  BACKEND CONNECTION CONFIG
 * ============================================================
 *  This is the ONLY file you should need to touch to point this
 *  dashboard at your real backend. Everything else (hooks,
 *  charts, filters) consumes data through src/api/dashboard.js,
 *  which calls the endpoints defined below.
 *
 *  1. Set your API base URL (or create a .env file with
 *     VITE_API_BASE_URL=http://localhost:5000/api)
 *
 *  2. If your route names differ from the assumed defaults,
 *     just change the strings below - nothing else needs to change.
 * ============================================================
 */

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://visualization-dashboard-2-14y0.onrender.com/api';

// Matches your real backend (routes/dataRoutes.js + controllers/dataControllers.js):
// { end_year, intensity, sector, topic, insight, url, region, start_year,
//   impact, added, published, country, relevance, pestle, source, title,
//   likelihood }  -- note: your dataset has NO city or swot fields at all,
// so those two filters/charts will legitimately always be empty.
export const ENDPOINTS = {
  // IMPORTANT: GET /api/data (getAllData) ignores query params entirely
  // on your backend - it always returns all 1000 records. The route that
  // actually applies filters is /data/filters (filterData controller).
  data: '/data/filters',

  // Single combined call - matches your getFilterOptions controller,
  // which returns { topics, sectors, regions, countries, pestles,
  // sources, swot, endYears } in one response. Cheaper than 9 requests.
  options: '/options',

  // Per-field fallback (getFilterFieldOptions), used for anything the
  // combined /options response doesn't include (currently: cities),
  // and as a backup if /options ever fails.
  filters: {
    endYears: '/filters/end-year',
    topics: '/filters/topics',
    sectors: '/filters/sectors',
    regions: '/filters/regions',
    pestles: '/filters/pestles',
    sources: '/filters/sources',
    swot: '/filters/swot',
    countries: '/filters/countries',
    cities: '/filters/cities',
  },
};

// Maps our internal filter state keys -> the query param name your
// backend expects. Adjust the right-hand side if your API uses
// different param names (e.g. "end_year" instead of "endYear").
export const QUERY_PARAM_MAP = {
  endYear: 'endYear',
  topics: 'topic',
  sectors: 'sector',
  regions: 'region',
  pestles: 'pestle',
  sources: 'source',
  swot: 'swot',
  countries: 'country',
  cities: 'city',
};
