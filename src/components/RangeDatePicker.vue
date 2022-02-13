<template>
  <div class="range-date-picker">
    <DateDropdown :onDropdownChange="onDropdownChange" :customDates="customDates"></DateDropdown>
    <date-range-picker
      ref="picker"
      opens="left"
      :max-date="new Date()"
      :locale-data="localeData"
      :autoApply=true
      :ranges=false
      v-model="dateRange"
      @update="updateValues"
      :linkedCalendars=false>
      <template v-slot:input="picker">
        <i class="glyphicon glyphicon-calendar fa fa-calendar"></i>
        <span>{{ formatDate(picker.startDate) }} - {{ formatDate(picker.endDate) }}</span>
        <b class="caret"></b>
      </template>
    </date-range-picker>
  </div>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker';
import DateDropdown from './DateDropdown';
import bus from '../libs/bus';
import { trackEvent } from '../libs/tracking';
import { setDates, getDateRange } from '../store';
import { dateRanges } from '../config/dates';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';

// Pick an English locale closest to the device/browser setting
const locale = navigator.language.indexOf('en') === 0 ? navigator.language : 'en';

export default {
  data() {
    const localeData = moment.localeData(locale);
    const range = getDateRange();
    const { startDate, endDate } = this.calculateDateRange(range);

    return {
      dateRange: {
        startDate,
        endDate
      },
      localeData: {
        direction: getComputedStyle(document.body).direction,
        separator: ' – ',
        firstDay: localeData.firstDayOfWeek()
      },
      customDates: false
    };
  },
  components: {
    DateDropdown,
    DateRangePicker
  },
  props: {
    onChange: Function
  },
  computed: {
    range() {
      return getDateRange();
    }
  },
  methods: {
    formatDate(date) {
      return TD(date, {
        format: 'll',
        locale
      });
    },
    calculateDateRange(range = '') {
      const [value, unit = ''] = range.split(',');
      const startDate = moment();

      if (!['hour', 'minute', 'second', 'millisecond'].some(u => unit.indexOf(u) > -1)) {
        startDate.startOf('day');
      }

      return {
        startDate: startDate.subtract(value, unit).toISOString(),
        endDate: moment().toISOString()
      };
    },
    updateValues() {
      this.customDates = true;

      // Track event
      trackEvent({
        action: 'timeframe_changed',
        label: _.get(_.find(dateRanges, { value: 'none' }), 'label')
      });

      // Set start date to the start of day
      this.dateRange.startDate = moment(this.dateRange.startDate)
        .startOf('day')
        .toISOString();

      // If the end date is today, use the current time instead of 00:00
      // HACK: Workaround for https://weboo.atlassian.net/browse/ID-1920
      if (moment(this.dateRange.endDate).isSame(moment(), 'day')) {
        this.dateRange.endDate = moment().toISOString();
      } else {
        // Set end date to the end of day
        this.dateRange.endDate = moment(this.dateRange.endDate)
          .add(1, 'day')
          .startOf('day')
          .subtract(1, 'millisecond')
          .toISOString();
      }

      setDates({
        startDate: this.dateRange.startDate,
        endDate: this.dateRange.endDate
      });
      bus.$emit('loadData');
    },
    onDropdownChange(range) {
      // Track event
      trackEvent({
        action: 'timeframe_changed',
        label: _.get(_.find(dateRanges, { value: range }), 'label')
      });

      if (range === 'none') {
        return;
      }

      const { startDate, endDate } = this.calculateDateRange(range);

      this.customDates = false;
      this.dateRange.startDate = startDate;
      this.dateRange.endDate = endDate;

      setDates({
        startDate,
        endDate
      });
      bus.$emit('loadData');
    }
  }
};
</script>
