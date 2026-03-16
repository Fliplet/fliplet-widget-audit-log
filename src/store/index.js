import { defaultDateRange } from '../config/dates';

const dateRangeParts = defaultDateRange.split(',');

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
  return getWidgetData().typeFilter || null;
}

export function getDataFilter() {
  return getWidgetData().dataFilter || null;
}

export function getInitialDateRange() {
  return getWidgetData().dateRange || null;
}

export function getInitialDates() {
  const wd = getWidgetData();

  if (wd.startDate && wd.endDate) {
    const start = moment(wd.startDate);
    const end = moment(wd.endDate);

    if (!start.isValid() || !end.isValid() || start.isAfter(end)) {
      return null;
    }

    return { startDate: start.toISOString(), endDate: end.toISOString() };
  }

  return null;
}
