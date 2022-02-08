/**
 * Filter a data collection based on a predicate, returning the matching indices
 * @param {Array} collection - Data collection for processing
 * @param {Function|Object} predicate - Predicate used to assess if each data point matches the condition
 * @returns {Array} List of indices where the data point matches the condition
 */
function filterIndex(collection = [], predicate) {
  return collection.map((object, index) => {
    // Predicate is a function
    if (typeof predicate === 'function' && !predicate(object)) {
      return;
    }

    // Predicate is an object
    if (typeof predicate === 'object' && !_.isMatch(object, predicate)) {
      return;
    }

    return index;
  }).filter(index => typeof index === 'number');
}

/**
 * Stringify JSON objects and add spaces as necessary to match the DB literal search conditions
 * @param {Object} json - JSON data to be formatted
 * @returns {String} JSON string
 */
function formatJSON(json) {
  // Render undefined or null data
  if (typeof json === 'undefined' || json === null) {
    return '—';
  }

  return JSON.stringify(json, null, '\b')
    .split('\b')
    .map(str =>
      (str.slice(-1) === ',' ? `${str} ` : str)
        .replace(/,\n$/, ', ')
        .replace(/\{\n/, '{')
        .replace(/\n\}/, '}')
        .replace(/\[\n/, '[')
        .replace(/\n\]/, ']')
        .replace(/\n$/, '')
    ).join('');
}

export const columns = [
  {
    name: 'Date & time',
    prop: 'createdAt',
    type: 'date',
    width: 130
  },
  {
    name: 'Category',
    prop: 'user.type',
    format: 'code',
    searchable: true,
    width: 100
  },
  {
    name: 'Log type',
    prop: 'type',
    format: 'code',
    searchable: true,
    width: 250
  },
  {
    name: 'App',
    prop: 'app.name',
    sortProp: 'app.name',
    searchable: true
  },
  {
    name: 'User',
    prop: 'user.email',
    sortProp: 'user.email',
    searchable: true
  },
  {
    name: 'Data',
    prop: 'data',
    type: 'data',
    format: 'code',
    searchable: true
  }
];

export const columnDefs = [
  {
    targets: filterIndex(columns, { type: 'date' }),
    render(data) {
      return TD(data, { format: 'll LTS' });
    }
  },
  {
    targets: filterIndex(columns, col => !col.searchable),
    searchable: false
  },
  {
    targets: filterIndex(columns, { type: 'data' }),
    render(data) {
      return formatJSON(data);
    }
  },
  {
    targets: filterIndex(columns, { format: 'code' }),
    className: 'code'
  },
  {
    targets: filterIndex(columns, { nowrap: true }),
    className: 'nowrap'
  }
];
