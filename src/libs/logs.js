/**
 * Parses a search for user types to return the matching user types for query
 * @param {String} value - Search value entered by user
 * @returns {*} Collection of matching user types
 *   - {undefined} No query needed
 *   - {Array} User type query An empty array means the search value doesn't match any user types.
 */
export const getUserTypeQuery = (value = '') => {
  const allowedUserTypes = ['integration', 'studio', 'app', 'appAction'];

  value = `${value}`.trim().toLowerCase();

  // No search string provided
  if (!value) {
    return;
  }

  const userTypes = allowedUserTypes.filter(type => type.indexOf(value) !== -1);

  return userTypes;
};
