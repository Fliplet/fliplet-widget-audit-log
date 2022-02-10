<template>
  <div class="dataTable">
    <span v-if="this.tableData.data.length" class="btn btn-csv-export" @click="getCSV()">Export to CSV</span>
    <!-- Inline width helps structure the column widths correctly -->
    <table ref="table" class="data-table table-responsive d-print-inline" style="width:100%">
      <thead>
        <tr>
          <th v-for="(col, colIndex) in columns" :key="colIndex">
            {{ col.name }}
            <select
              class="filter"
              v-if="col.name === 'Category'"
              @change="onChange($event, colIndex)">
              <option v-for="type in userTypes" :key="type.value" :value="type.value">{{ type.label }}</option>
            </select>
            <input
              v-else-if="col.searchable"
              @click.stop
              @input="onChange($event, colIndex)"
              @keydown="onKeydown($event)"
              type="text"
              class="filter" />
          </th>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
import { getDates, setUIIsInitialized, setUIIsLoading,
  setUIError, getAppId, getAppName, getOrganizationId } from '../store';
import { getLogs } from '../services/logs';
import bus from '../libs/bus';
import { trackEvent } from '../libs/tracking';
import sampleData from '../config/sample-data';
import { columns, columnDefs, userTypes } from '../config/log-table';
import { getUserTypeQuery, clampJSONData, toggleClamping } from '../libs/logs';

export default {
  data() {
    const { startDate, endDate } = getDates();

    return {
      table: null,
      debouncedFilter: null,
      tableData: {
        data: [],
        count: 0
      },
      userTypes,
      columns,
      limits: [25, 50, 100, 500],
      query: {
        startDate,
        endDate,
        appId: getAppId(),
        sort: '',
        limit: 25,
        offset: 0,
        includePagination: true,
        where: null,
        userType: []
      }
    };
  },
  methods: {
    initTable() {
      if (this.table) {
        return;
      }

      this.table = $(this.$refs.table).DataTable({
        scrollX: true,
        dom: 'lrtip',
        language: {
          emptyTable: 'No logs found'
        },
        lengthMenu: this.limits,
        pageLength: this.query.limit,
        columns: this.columns,
        columnDefs,
        order: [[0, 'desc']],
        serverSide: true,
        ajax: (data, callback, settings) => {
          const { startDate, endDate } = getDates();

          this.query.startDate = startDate;
          this.query.endDate = endDate;

          const where = {};

          data.columns.forEach((col) => {
            if (!col.searchable) {
              return;
            }

            var value = col.search.value;

            if (col.name === 'Category') {
              // Assign userType query regardless of value
              this.$set(this.query, 'userType', getUserTypeQuery(value));
            }

            // No need to assign where queries if value is empty
            if (!value || !value.trim()) {
              return;
            }

            switch (col.name) {
              case 'Log type':
                where.type = { $iLike: `%${value}%` };
                break;
              case 'App':
                where.app = { name: { $iLike: `%${value}%` } };
                break;
              case 'User':
                where.$or = [
                  { user: { type: null, email: { $iLike: `%${value}%` } } },
                  { data: { _userEmail: { $iLike: `%${value}%` } } }
                ];
                break;
              case 'Data':
                where.data = { $iLike: `%${value}%` };
                break;
              default:
                break;
            }
          });

          this.query.where = _.isEmpty(where) ? undefined : where;

          data.order.forEach(order => {
            const col = settings.aoColumns[order.column];

            this.query.sort = col.sortProp || col.prop;
            this.query.order = order.dir.toUpperCase();
          });

          this.query.limit = data.length;
          this.query.offset = data.start;

          this.getData().then((response) => {
            this.prepareTableData(response);

            setUIIsInitialized(true);
            callback(this.tableData);
          }).catch((error) => {
            setUIIsInitialized(true);
            setUIIsLoading(false);
            setUIError(error);
          });
        }
      });
      this.table.on('draw', () => {
        // Resize the overlay based on table size
        setTimeout(() => {
          clampJSONData();
          setUIIsLoading(false);
          Fliplet.Widget.autosize();
        }, 50);
      });
      this.debouncedFilter = _.debounce((event, colIndex) => {
        this.table.columns(colIndex)
          .search(event.target.value)
          .draw();
      }, 500);
    },
    getData() {
      setUIIsLoading(true);
      setUIError();

      if (Fliplet.Env.get('development')) {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(sampleData);
          }, 300);
        });
      }

      return getLogs(this.query);
    },
    getCSV() {
      let orgName;

      setUIIsLoading(true);
      setUIError();

      // Track event
      trackEvent({
        action: 'export_csv'
      });

      return Fliplet.Organizations.get().then((organizations) => {
        const organization = _.find(organizations, { id: getOrganizationId() });

        orgName = organization && organization.name;

        return getLogs(Object.assign({}, this.query, {
          format: 'csv',
          limit: 100000,
          offset: 0
        }));
      }).then(data => {
        const startDate = moment(this.query.startDate).format('YYYY-MM-DD');
        const endDate = moment(this.query.endDate).format('YYYY-MM-DD');
        const fileName = getAppId()
          ? `audit-log-${_.kebabCase(getAppName().trim())}-${startDate}-${endDate}.csv`
          : `audit-log-${_.kebabCase(orgName.trim())}-${startDate}-${endDate}.csv`;

        setUIIsLoading(false);

        return Fliplet.Media.Files.Storage.saveAs({
          data,
          fileName,
          mimeType: 'text/csv'
        });
      }).catch(error => {
        setUIIsLoading(false);
        setUIError(error);
      });
    },
    prepareTableData(response) {
      this.tableData.data = response.logs.map((log) => {
        // Use null as fallback to prevent error from DataTables
        return this.columns.map(col => {
          if (col.data) {
            return col.data(log);
          }

          return _.get(log, col.prop, null);
        });
      });
      this.tableData.count = response.logs.length;
      this.tableData.recordsFiltered = response.totalCount;
      this.tableData.recordsTotal = response.totalCount;
    },
    loadData() {
      if (!this.table) {
        this.initTable();

        return;
      }

      this.table.ajax.reload();
    },
    onChange(event, colIndex) {
      this.debouncedFilter(event, colIndex);
    },
    onKeydown(event) {
      // Ctrl + A isn't supported by default
      if (event.which === 65 && (event.ctrlKey || event.metaKey)) {
        this.selectAll(event.currentTarget);
      }
    },
    selectAll(input) {
      input.select();
    },
    attachObservers() {
      const debouncedClamp = _.debounce(clampJSONData, 300);

      $(window).on('resize', debouncedClamp);
      $(document).on('click', '[data-json] .toggle .btn-toggle', toggleClamping);
    }
  },
  created() {
    bus.$on('loadData', this.loadData);

    this.attachObservers();
  },
  mounted() {
    this.initTable();
  }
};
</script>
