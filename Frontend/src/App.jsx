import { useState } from 'react';
import './utils/chartTheme'; // registers Chart.js controllers/scales globally
import { useDashboardData } from './hooks/useDashboardData';
import { computeKpis } from './utils/aggregations';

import Header from './components/Header';
import FilterPanel from './components/FilterPanel';
import ActiveFilterChips from './components/ActiveFilterChips';
import KpiStrip from './components/KpiStrip';
import DataTable from './components/DataTable';
import IntensityByTopicChart from './components/charts/IntensityByTopicChart';
import TrendChart from './components/charts/TrendChart';
import RegionDonut from './components/charts/RegionDonut';
import TopCountriesChart from './components/charts/TopCountriesChart';
import PestleChart from './components/charts/PestleChart';
import SwotChart from './components/charts/SwotChart';
import IntensityLikelihoodScatter from './components/charts/IntensityLikelihoodScatter';

export default function App() {
  const {
    filters,
    updateFilter,
    resetFilters,
    activeFilterCount,
    filterOptions,
    data,
    loading,
    syncing,
    error,
  } = useDashboardData();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const kpis = computeKpis(data);

  return (
    <div className="flex h-screen flex-col font-body">
      <Header
        onToggleSidebar={() => setSidebarOpen((o) => !o)}
        recordCount={kpis.total}
        error={error}
        syncing={syncing}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - static on desktop, drawer on mobile */}
        <div
          className={`fixed inset-y-0 left-0 z-30 w-72 pt-[57px] transition-transform lg:static lg:z-auto lg:w-72 lg:translate-x-0 lg:pt-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <FilterPanel
            filters={filters}
            filterOptions={filterOptions}
            updateFilter={updateFilter}
            resetFilters={resetFilters}
            activeFilterCount={activeFilterCount}
          />
        </div>
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 overflow-y-auto px-5 py-5">
          {loading && data.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="font-mono text-xs text-cyan">reading signal…</p>
            </div>
          ) : error ? (
            <div className="rounded-sm border border-alert/40 bg-alert/10 p-5 font-mono text-sm text-alert">
              Couldn't reach the backend at the configured API URL. Check
              src/api/config.js and confirm your server is running.
              <div className="mt-2 text-xs text-muted-2">{error}</div>
            </div>
          ) : (
            <div className="mx-auto flex max-w-[1400px] flex-col gap-4">
              <ActiveFilterChips filters={filters} updateFilter={updateFilter} />
              <KpiStrip kpis={kpis} />

              <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                <TrendChart data={data} />
                <IntensityByTopicChart data={data} />
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <RegionDonut data={data} />
                <PestleChart data={data} />
                <SwotChart data={data} />
              </div>

              <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                <TopCountriesChart data={data} />
                <IntensityLikelihoodScatter data={data} />
              </div>

              <DataTable data={data} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
