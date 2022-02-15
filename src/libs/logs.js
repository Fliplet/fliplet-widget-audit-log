import { userTypes } from '../config/log-table';

/**
 * Parses a search for user types to return the matching user types for query
 * @param {String} value - Search value entered by user
 * @returns {*} Collection of matching user types
 *   - {undefined} No query needed
 *   - {Array} User type query An empty array means the search value doesn't match any user types.
 */
export const getUserTypeQuery = (value = '') => {
  const allowedUserTypes = userTypes.map(type => type.value);

  value = `${value}`.trim().toLowerCase();

  // No search string provided
  if (!value) {
    return;
  }

  if (allowedUserTypes.indexOf(value) === -1) {
    return [];
  }

  return [value];
};

export const clampJSONData = () => {
  $('[data-json]').each((i, el) => {
    const [clamped, full] = el.children;

    el.classList.toggle('is-clamped', full.clientHeight > clamped.clientHeight);
  });
};

export const toggleClamping = (e) => {
  $(e.currentTarget).parents('[data-json]').toggleClass('show-full');

  setTimeout(() => {
    Fliplet.Widget.autosize();
  }, 50);
};

export const inspectData = (e) => {
  var jsonStr = $(e.currentTarget).parents('[data-json]').find('.full').html();

  try {
    var json = JSON.parse(jsonStr);

    Fliplet.Modal.alert({
      title: 'Log data',
      message: `<pre>${JSON.stringify(json, null, 2)}</pre>`
    });
  } catch (error) {
    Fliplet.Modal.alert({
      title: 'Error parsing JSON data',
      message: Fliplet.parseError(error)
    });
  }
};
