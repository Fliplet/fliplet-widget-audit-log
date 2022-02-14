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
 * Escape HTML characters so HTML content can be printed on screen
 * @param {String} unsafe - String to be escaped
 * @returns {String} Escaped string
 */
function escapeHtml(unsafe = '') {
  if (unsafe === null) {
    return '';
  }

  const escape = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };
  const exp = new RegExp(`[${Object.keys(escape).join('')}]`, 'g');

  return unsafe.replace(exp, (char) => {
    return escape[char];
  });
}

export const userTypes = [
  { value: '', label: 'All categories' },
  { value: 'app', label: 'Apps/Integrations' },
  { value: 'appAction', label: 'App Actions' },
  { value: 'studio', label: 'Fliplet Studio/Viewer' }
];

export const columns = [
  {
    name: 'Date',
    prop: 'createdAt',
    type: 'date',
    width: 130
  },
  {
    name: 'Category',
    prop: 'user.type',
    searchable: true,
    width: 130,
    orderable: false
  },
  {
    name: 'Log type',
    prop: 'type',
    format: 'code',
    searchable: true
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
    prop: 'dataString',
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
    targets: filterIndex(columns, { name: 'Category' }),
    render(value) {
      return _.get(_.find(userTypes, { value }), 'label', null);
    }
  },
  {
    targets: filterIndex(columns, col => !col.searchable),
    searchable: false
  },
  {
    targets: filterIndex(columns, { type: 'data' }),
    render(data) {
      var jsonStr = escapeHtml(data);

      if (!jsonStr) {
        return '';
      }

      return `<div data-json>
                <div class="clamped">${jsonStr}</div>
                <div class="full">${jsonStr}</div>
                <div class="toolbar">
                  <span class="toggle">
                    <span class="btn-toggle label label-default show-more" title="Expand"><i class="fa fa-chevron-down"></i></span>
                    <span class="btn-toggle label label-default show-less" title="Collapse"><i class="fa fa-chevron-up"></i></span>
                  </span>
                  <span class="btn-inspect label label-default" title="Inspect"><i class="fa fa-eye"></i></span>
                </div>
              </div>`;
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
