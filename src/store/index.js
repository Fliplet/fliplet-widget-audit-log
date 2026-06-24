import { defaultDateRange } from '../config/dates';
import { readHash } from '../libs/permalink';

const dateRangeParts = defaultDateRange.split(',');

// Filter state encoded in the URL hash, read once at module init.
// Widget data (overlay integration) always takes precedence over the hash.
const _hash = readHash() || {};

// Lazy-loaded widget data from the `data` URL parameter (e.g. when opened as an overlay).
// Fliplet.Widget.getData() may not be ready at module init time, so we defer reading it.
let _widgetData;

function getWidgetData() {
  if (!_widgetData) {
    const data = Fliplet.Widget.getData();

    // Only cache if we got meaningful data; retry on next call otherwise
    if (data && Object.keys(data).length) {
      _widgetData = data;
    }

    return data || {};
  }

  return _widgetData;
}

export const state = {
  ui: {
    isInitialized: false,
    isLoading: true,
    error: null
  },
  dates: {
    startDate: moment().subtract(dateRangeParts[0], dateRangeParts[1]).toISOString(),
    endDate: moment().toISOString()
  },
  dateRange: defaultDateRange,
  filters: {
    typeFilter: null,
    dataFilter: null
  },
  appId: Fliplet.Env.get('appId'),
  appName: Fliplet.Env.get('appName'),
  organizationId: Fliplet.Env.get('organizationId')
};

export function getDates() {
  return state.dates;
}

export function setDates(dates) {
  Object.assign(state.dates, dates);
}

export function getDateRange() {
  return state.dateRange;
}

export function setDateRange(range) {
  state.dateRange = range;
}

export function setUIIsInitialized(isInitialized) {
  state.ui.isInitialized = !!isInitialized;
}

export function getUIIsInitialized() {
  return state.ui.isInitialized;
}

export function setUIIsLoading(isLoading) {
  state.ui.isLoading = !!isLoading;
}

export function getUIIsLoading() {
  return state.ui.isLoading;
}

export function getUIError() {
  return state.ui.error;
}

export function setUIError(error) {
  state.ui.error = error;
}

export function getAppId() {
  return state.appId || getWidgetData().appId;
}

export function getAppName() {
  return state.appName || getWidgetData().appName;
}

export function getOrganizationId() {
  return state.organizationId || getWidgetData().organizationId;
}

export function getTypeFilter() {
  return state.filters.typeFilter || getWidgetData().typeFilter || null;
}

export function getDataFilter() {
  return state.filters.dataFilter || getWidgetData().dataFilter || null;
}

// Seed persistent filters once at init from widget data (overlay) or the URL
// hash. Widget data takes precedence. The hash is only consulted here, never as
// an ongoing fallback — otherwise clearing a filter would silently re-apply it.
export function initFiltersFromWidgetData() {
  const wd = getWidgetData();
  const typeFilter = wd.typeFilter || _hash.type;
  const dataFilter = wd.dataFilter || _hash.data;

  if (typeFilter) {
    state.filters.typeFilter = typeFilter;
  }

  if (dataFilter) {
    state.filters.dataFilter = dataFilter;
  }
}

export function setTypeFilter(value) {
  state.filters.typeFilter = value || null;
}

export function setDataFilter(value) {
  state.filters.dataFilter = value || null;
}

export function getInitialDateRange() {
  return getWidgetData().dateRange || _hash.range || null;
}

export function getInitialDates() {
  const wd = getWidgetData();
  let source = null;

  if (wd.startDate && wd.endDate) {
    source = { startDate: wd.startDate, endDate: wd.endDate };
  } else if (_hash.start && _hash.end) {
    source = { startDate: _hash.start, endDate: _hash.end };
  }

  if (source) {
    const start = moment(source.startDate);
    const end = moment(source.endDate);

    if (!start.isValid() || !end.isValid() || start.isAfter(end)) {
      return null;
    }

    return { startDate: start.toISOString(), endDate: end.toISOString() };
  }

  return null;
}
