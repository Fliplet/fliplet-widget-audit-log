/**
 * Read/write audit log filter state to the URL hash so a filtered view can be
 * bookmarked or shared. All operations are defensive — malformed input falls
 * back to null/defaults and never throws into the page.
 *
 * Scope (v1): only fields that restore cleanly through the existing store
 * getters / DataTables seeding — date range and the Log type / Data filters.
 * Category and Session are intentionally not persisted yet (see PR notes).
 */

const KEYS = ['start', 'end', 'range', 'type', 'data'];

export function readHash() {
  try {
    const hash = (window.location.hash || '').replace(/^#/, '');

    if (!hash) {
      return null;
    }

    const params = {};

    hash.split('&').forEach((part) => {
      const idx = part.indexOf('=');

      if (idx < 0) {
        return;
      }

      const key = decodeURIComponent(part.slice(0, idx));
      const value = decodeURIComponent(part.slice(idx + 1));

      if (KEYS.includes(key) && value) {
        params[key] = value;
      }
    });

    return Object.keys(params).length ? params : null;
  } catch (err) {
    console.warn('[audit-log] Failed to parse URL hash', err);

    return null;
  }
}

export function writeHash(next) {
  try {
    const merged = Object.assign({}, readHash() || {}, next);
    const parts = [];

    KEYS.forEach((key) => {
      const value = merged[key];

      if (value !== null && value !== undefined && value !== '') {
        parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      }
    });

    const hash = parts.length ? `#${parts.join('&')}` : '';

    if (hash !== window.location.hash) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${hash}`);
    }
  } catch (err) {
    console.warn('[audit-log] Failed to write URL hash', err);
  }
}
