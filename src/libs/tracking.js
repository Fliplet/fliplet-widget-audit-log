import { getAppId } from '../store';

const eventCategory = getAppId ? 'app_audit_log' : 'org_audit_log';

/**
 * Track event through Fliplet Studio
 * @param {Object} data - Data for event tracking
 * @returns {undefined}
 */
export const trackEvent = (data = {}) => {
  Fliplet.Studio.emit('track-event', Object.assign({
    category: eventCategory
  }, data));
};
