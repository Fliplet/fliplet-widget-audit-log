/**
 * Get organization logs based on query
 * @param {Object} [data] - Query for JS API
 * @returns {Promise<Object>} Promise is returned with the API response
 */
export const getLogs = (data) => {
  // User type search string returned no valid user types
  if (data && data.userType && !data.userType.length) {
    return Promise.resolve({
      logs: [],
      totalCount: 0
    });
  }

  return Fliplet.Organizations.Logs.get(data);
};
