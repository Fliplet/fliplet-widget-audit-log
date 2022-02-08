<template>
  <select
    v-model="selectedRange"
    @change="onDropdownChange(selectedRange)"
    name="dateRange"
    id="dateRange"
    class="date-dropdown form-control">
    <option v-for="(range, index) in dateRanges" :key="index" :value="range.value">{{ range.label }}</option>
  </select>
</template>

<script>
import { getDateRange } from '../store';
import { dateRanges } from '../config/dates';

export default {
  data() {
    return {
      selectedRange: getDateRange(),
      dateRanges
    };
  },
  props: {
    onDropdownChange: Function,
    customDates: Boolean
  },
  watch: {
    customDates(newVal) {
      this.selectedRange = newVal ? 'none' : this.selectedRange;
    }
  }
};
</script>
