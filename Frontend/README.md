# Signal Room — Blackcoffer Insights Dashboard

React + Vite + Tailwind v4 + Chart.js frontend, wired to your Node/Express + MongoDB backend.

## Root cause of "filters don't do anything" (fixed)

Your `GET /api/data` route (`getAllData`) always returns all 1000 records —
it doesn't read query params at all. The route that actually applies
filters is `GET /api/data/filters` (or the equivalent `/api/filters`),
which calls `filterData`. The frontend now points at `/data/filters`
(see `src/api/config.js`), so changing any filter now sends a real
query and the charts update accordingly.

## Known, expected gaps (not bugs)

Your `jsondata.json` (all 1000 records) has **no `city` or `swot` fields**
at all — this is the standard Blackcoffer dataset, both fields are simply
absent. Your Mongoose schema doesn't declare them either. So:
- The **City** and **SWOT** filters will always show "Not in dataset" and stay disabled.
- The **SWOT chart** will show its empty state permanently.

This is correct behavior given the data, not something to debug further.

`end_year` / `start_year` are empty strings (`""`) for many records. Since
your schema casts them to `Number`, some of these can come back as `0` or
`null` from Mongo. The frontend strips those out of the End Year dropdown
and the yearly trend chart so you don't see a bogus "year 0".

## Running it

**Backend** (from `Backend/`):
```bash
npm install
node seed.js      # one-time: loads jsondata.json into MongoDB
npm run dev       # nodemon index.js -> http://localhost:3000
```

**Frontend** (from `Frontend/`):
```bash
npm install
npm run dev       # http://localhost:5173
```

`src/api/config.js` already points at `http://localhost:3000/api` by
default. Override with a `.env` file (`VITE_API_BASE_URL=...`) if you
deploy the backend elsewhere.

## What's inside

- **Filters**: End Year, Topic, Sector, Region, PEST(LE), Source, SWOT, Country, City — sent as comma-joined query params matching your `normalizeValues()` parsing, all AND-composed via `/data/filters`.
- **Active filter chips**: shows exactly what's applied right now, each removable with one click — makes it visually obvious filters are taking effect.
- **Charts (Chart.js)**: yearly trend line (intensity/likelihood/relevance), intensity-by-topic bar, region donut, PESTLE polar area, SWOT donut, top-countries bar, intensity-vs-likelihood bubble chart.
- **KPI strip**: record count + live averages, recomputed from whatever `/data/filters` returns for the active selection.
- **Data table**: paginated raw records for the current filter selection.
- **Syncing indicator**: a small badge in the header while a filter change is refetching, without blanking out the existing charts.

All chart aggregation happens client-side off the filtered records returned by the backend, so the frontend doesn't care whether the backend pre-aggregates or just returns matching rows.

## If you touch the backend later

If you ever fix `getAllData` to also respect query params, or rename any
route, the only file to update is `src/api/config.js` — everything else
consumes data through `src/api/dashboard.js`.
