/**
 * Get organization logs based on query
 * @param {Object} [data] - Query for JS API
 * @returns {Promise<Object>} Promise is returned with the API response
 */
export const getLogs = (data) => {
  return Fliplet.Organizations.Logs.get(data);
};
