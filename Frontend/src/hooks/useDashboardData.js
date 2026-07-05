import { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchData, fetchFilterOptions } from '../api/dashboard';
import { deriveOptions, cleanOptionList } from '../utils/aggregations';

const FIELD_BY_OPTION_KEY = {
  endYears: 'end_year',
  topics: 'topic',
  sectors: 'sector',
  regions: 'region',
  pestles: 'pestle',
  sources: 'source',
  swot: 'swot',
  countries: 'country',
  cities: 'city',
};

const EMPTY_FILTERS = {
  endYear: '',
  topics: [],
  sectors: [],
  regions: [],
  pestles: [],
  sources: [],
  swot: [],
  countries: [],
  cities: [],
};

export function useDashboardData() {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [data, setData] = useState([]);
  const [allDataForOptions, setAllDataForOptions] = useState([]);
  const [remoteOptions, setRemoteOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load filter option lists once (independent of active filters)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const opts = await fetchFilterOptions();
        if (cancelled) return;
        setRemoteOptions(opts);
        // If every remote option came back null, pull the unfiltered
        // dataset once so we can derive dropdown values ourselves.
        if (Object.values(opts).every((v) => v === null)) {
          const fallback = await fetchData({});
          if (!cancelled) setAllDataForOptions(fallback);
        }
      } catch {
        if (!cancelled) {
          const fallback = await fetchData({}).catch(() => []);
          if (!cancelled) setAllDataForOptions(fallback);
        }
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const loadData = useCallback(async (activeFilters) => {
    setLoading(true);
    setError(null);
    try {
      const rows = await fetchData(activeFilters);
      setData(rows);
    } catch (err) {
      setError(err?.message || 'Failed to load data from the backend.');
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(filters);
  }, [filters, loadData]);

  const filterOptions = useMemo(() => {
    const out = {};
    Object.entries(FIELD_BY_OPTION_KEY).forEach(([optKey, field]) => {
      const raw = remoteOptions[optKey] ?? deriveOptions(allDataForOptions, field);
      out[optKey] = cleanOptionList(raw);
    });
    return out;
  }, [remoteOptions, allDataForOptions]);

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => setFilters(EMPTY_FILTERS), []);

  const activeFilterCount = useMemo(
    () =>
      Object.values(filters).reduce(
        (acc, v) => acc + (Array.isArray(v) ? v.length : v ? 1 : 0),
        0
      ),
    [filters]
  );

  return {
    filters,
    updateFilter,
    resetFilters,
    activeFilterCount,
    filterOptions,
    data,
    loading,
    syncing: loading && data.length > 0,
    error,
    refetch: () => loadData(filters),
  };
}
