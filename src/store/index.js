import { defaultDateRange } from '../config/dates';

const dateRangeParts = defaultDateRange.split(',');

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
  return state.appId;
}

export function getAppName() {
  return state.appName;
}

export function getOrganizationId() {
  return state.organizationId;
}
