<template>
  <div class="audit-log">
    <div :class="{ 'is-loading': isLoading }" v-show="isInitialized">
      <div class="alert alert-info">
        <p>
          <strong>This feature is currently in beta</strong><br>We are actively refining the functionality and collecting feedback. If you have any questions, please
          <a href='#' @click.prevent="openChatOverlay">contact us</a>.
        </p>
        <p>
          <strong>View detailed Studio and app usage details</strong><br>See exactly what has been happening within your app and immediately assess queries, such as the examples listed below.
          <br>1. <a href="https://help.fliplet.com/audit-log/#1">Which emails have been sent and what's their status?</a>
          <br>2. <a href="https://help.fliplet.com/audit-log/#2">Which push notifications have been sent and what's their status?</a>
          <br>3. <a href="https://help.fliplet.com/audit-log/#3">Who has recently logged in?</a>
          <br>4. <a href="https://help.fliplet.com/audit-log/#4">Who has added/removed 2-factor authentication from their account?</a>
          <br>5. <a href="https://help.fliplet.com/audit-log/#5">What files have been uploaded, moved, or deleted?</a>
          <br>6. <a href="https://help.fliplet.com/audit-log/#6">What apps have been recently published and by who?</a>
          <br>Our support site also contains <a href="https://help.fliplet.com/audit-log/">a full explanation of the feature</a> and <a href="https://help.fliplet.com/audit-log-dictionary/">an explanation of different log types</a>.
          <br>If you'd like to monitor audit logs and configure alerts with your own software, please <a href="https://developers.fliplet.com/API/core/organizations.html#audit-logs">review our technical documentation</a>.
        </p>
      </div>
      <RangeDatePicker></RangeDatePicker>
    </div>
    <div v-if="isLoading" class="overlay-loading">
      <div class="spinner-holder animated">
        <div class="spinner-overlay"></div>
        <p>Loading...</p>
      </div>
    </div>
    <div v-else-if="hasError">
      <div class="alert alert-danger">{{ errorMessage }}</div>
    </div>
    <LogTable class="component" :class="{ 'is-loading': isLoading }" v-if="isInitialized || isLoading"></LogTable>
  </div>
</template>

<script>
import LogTable from './components/LogTable';
import RangeDatePicker from './components/RangeDatePicker';
import { state, getUIIsLoading, getUIIsInitialized, getUIError } from './store';

export default {
  data() {
    return {
      state
    };
  },
  computed: {
    isInitialized() {
      return getUIIsInitialized();
    },
    isLoading() {
      return getUIIsLoading();
    },
    hasError() {
      return !!getUIError();
    },
    errorMessage() {
      const error = getUIError();

      return error && Fliplet.parseError(error);
    }
  },
  components: {
    LogTable,
    RangeDatePicker
  },
  methods: {
    init() {
      if (Fliplet.Env.get('development')) {
        document.body.classList.add('development');
      }

      Fliplet.Studio.onMessage(function(event) {
        if (event.data && event.data.event === 'overlay-close') {
          setTimeout(() => {
            Fliplet.Widget.autosize();
          }, 500);
        }
      });
    },
    openChatOverlay() {
      Fliplet.Studio.emit('open-live-chat');
    }
  },
  mounted() {
    this.init();

    $(window).on('resize', () => {
      Fliplet.Widget.autosize();
    });

    Fliplet.Widget.autosize();
  },
  updated() {
    Fliplet.Widget.autosize();
  }
};
</script>
